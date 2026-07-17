from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Paper & Brush Pictures")
api_router = APIRouter(prefix="/api")


# ----------------------------- Models -----------------------------
class Film(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    title: str
    category: str
    year: str
    provider: str  # "vimeo" or "youtube"
    video_id: str
    order: int = 0

    @property
    def thumbnail(self) -> str:
        if self.provider == "youtube":
            return f"https://img.youtube.com/vi/{self.video_id}/maxresdefault.jpg"
        return f"https://vumbnail.com/{self.video_id}.jpg"


class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    subject: Optional[str] = Field(default="", max_length=200)
    message: str = Field(..., min_length=1, max_length=4000)


class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str = ""
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ----------------------------- Seed data -----------------------------
FEATURED = {
    "id": "featured-ai-short",
    "title": "Where Do The Strays Go — An AI Short",
    "category": "Featured Film",
    "year": "2024",
    "provider": "youtube",
    "video_id": "WmtGrkCIS-M",
}

FILMS_SEED = [
    ("Freecharge UPI — Million Reddy", "Commercial", "2022", "734812627"),
    ("Plum Goodness — Vitamin C Serum", "Brand Film", "2022", "685968911"),
    ("Yamaha Ray ZR", "Commercial", "2021", "615885896"),
    ("Freecharge PayLater — Million Reddy", "Commercial", "2021", "615882895"),
    ("RE Meteor 350 — Handle Everything", "Commercial", "2021", "579718032"),
    ("RE Meteor 350 — Glide Effortlessly", "Commercial", "2021", "579717941"),
    ("TVS Apache RTR 200 4V", "Commercial", "2020", "475515956"),
    ("Yera Glassware", "Brand Film", "2020", "450522184"),
    ("Yardley Essentials — Onam", "Commercial", "2020", "450518515"),
    ("Nivea Handcream — Diwali", "Commercial", "2019", "376508291"),
    ("Hero Xpulse 200 — Adventure Series", "Commercial", "2019", "367463418"),
    ("Hero Xpulse 200T — Find Your Pack", "Commercial", "2019", "367463396"),
    ("Hero Xpulse 200T — Destination", "Commercial", "2019", "367463379"),
    ("Nivea Handcream — Pujo", "Commercial", "2019", "365858254"),
    ("Hero Xpulse 200 — Adventure", "Commercial", "2019", "365856771"),
    ("Hero Xpulse 200T — Social Network", "Commercial", "2019", "365856735"),
    ("Hero Xpulse 200T — Long Road", "Commercial", "2019", "365856651"),
    ("Nivea Soft — Berry Blossom · Chilled Mint · Tropical Fruits", "Commercial", "2019", "352507369"),
    ("Joy Princess", "Commercial", "2018", "294836393"),
    ("Oreo Lemon Twist", "Commercial", "2018", "283080685"),
    ("Shell Helix — Mechanicure", "Brand Film", "2017", "225870299"),
    ("Shell Advance — The Ride", "Brand Film", "2017", "223901975"),
    ("Pro Kabaddi League — The Battle Is On", "Commercial", "2017", "198356521"),
    ("TATA AIA — Rohin Sherdilwala", "Commercial", "2017", "198328208"),
    ("Star Plus Nayi Soch — Viraat", "Commercial", "2017", "198327224"),
    ("Standard Chartered Mumbai Marathon", "Brand Film", "2017", "198326906"),
    ("Star Plus Nayi Soch — MSD", "Commercial", "2017", "198326258"),
    ("Joy — Bharti Singh", "Commercial", "2017", "198325848"),
    ("TATA AIA — Harjeet Sethi", "Commercial", "2016", "135859644"),
    ("TATA AIA — Anahita", "Commercial", "2016", "135853909"),
    ("Ananthaal", "Documentary", "2015", "121367646"),
    ("Right to Education — Anthem", "Documentary", "2014", "105737183"),
    ("Finding a Voice", "Documentary", "2014", "105218882"),
]


def build_films() -> List[dict]:
    films = []
    for idx, (title, category, year, vid) in enumerate(FILMS_SEED):
        films.append({
            "id": f"film-{vid}",
            "title": title,
            "category": category,
            "year": year,
            "provider": "vimeo",
            "video_id": vid,
            "order": idx,
        })
    return films


def with_thumbnail(doc: dict) -> dict:
    provider = doc.get("provider", "vimeo")
    vid = doc.get("video_id", "")
    if provider == "youtube":
        thumb = f"https://img.youtube.com/vi/{vid}/maxresdefault.jpg"
    else:
        thumb = f"https://vumbnail.com/{vid}.jpg"
    return {**doc, "thumbnail": thumb}


# ----------------------------- Routes -----------------------------
@api_router.get("/")
async def root():
    return {"message": "Paper & Brush Pictures API"}


@api_router.get("/films")
async def get_films():
    films = build_films()
    return {
        "featured": with_thumbnail(FEATURED),
        "films": [with_thumbnail(f) for f in films],
    }


@api_router.post("/contact", response_model=ContactSubmission)
async def create_contact(payload: ContactSubmissionCreate):
    submission = ContactSubmission(
        name=payload.name.strip(),
        email=payload.email,
        subject=(payload.subject or "").strip(),
        message=payload.message.strip(),
    )
    await db.contact_submissions.insert_one(submission.model_dump())
    return submission


@api_router.get("/contact", response_model=List[ContactSubmission])
async def list_contacts():
    docs = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://paperbrushrev-a9y9rj5mo-paper-brush.vercel.app",
        "https://paperbrushrev.vercel.app"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
