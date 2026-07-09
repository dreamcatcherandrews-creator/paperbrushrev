"""Backend API tests for Paper & Brush Pictures."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # fallback: read frontend/.env
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip().rstrip("/")


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------------- Films endpoint ----------------
class TestFilms:
    def test_get_films(self, api):
        r = api.get(f"{BASE_URL}/api/films", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert "featured" in data and "films" in data

        feat = data["featured"]
        assert feat["provider"] == "youtube"
        assert feat["video_id"] == "WmtGrkCIS-M"
        assert "thumbnail" in feat and feat["thumbnail"].startswith("https://img.youtube.com/")

        films = data["films"]
        assert isinstance(films, list)
        assert len(films) == 33
        for f in films:
            assert set(["id", "title", "category", "year", "provider", "video_id", "thumbnail"]).issubset(f.keys())
            assert f["provider"] == "vimeo"
            assert f["thumbnail"] == f"https://vumbnail.com/{f['video_id']}.jpg"


# ---------------- Contact endpoint ----------------
class TestContact:
    created_id = None

    def test_create_contact_valid(self, api):
        payload = {
            "name": "TEST_User",
            "email": "test_user@example.com",
            "subject": "TEST subject",
            "message": "Hello from pytest",
        }
        r = api.post(f"{BASE_URL}/api/contact", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == "TEST_User"
        assert data["email"] == "test_user@example.com"
        assert data["subject"] == "TEST subject"
        assert data["message"] == "Hello from pytest"
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "created_at" in data
        TestContact.created_id = data["id"]

    def test_create_contact_invalid_email(self, api):
        r = api.post(
            f"{BASE_URL}/api/contact",
            json={"name": "X", "email": "not-an-email", "message": "hi"},
            timeout=15,
        )
        assert r.status_code == 422

    def test_create_contact_missing_fields(self, api):
        r = api.post(f"{BASE_URL}/api/contact", json={"email": "a@b.com"}, timeout=15)
        assert r.status_code == 422

    def test_list_contacts_contains_created(self, api):
        r = api.get(f"{BASE_URL}/api/contact", timeout=15)
        assert r.status_code == 200
        arr = r.json()
        assert isinstance(arr, list)
        assert TestContact.created_id is not None
        ids = [x["id"] for x in arr]
        assert TestContact.created_id in ids
        # ensure no mongo _id leaks
        for x in arr:
            assert "_id" not in x
