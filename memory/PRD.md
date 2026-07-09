# PRD — Paper & Brush Pictures

## Original problem statement
Create a website for "Paper & Brush Pictures" — a film studio. Add a showreel with every
film embedded from Vimeo and YouTube. Minimalistic, clean, poetic text, with the brand logo.
User asked to reuse content/structure from a prior site (banditfilms.co.in), rebranded with
new poetic copy and the new Paper & Brush logo.

## Architecture
- Frontend: React (CRA + Craco), Tailwind, shadcn/ui, framer-motion. Single-page site.
- Backend: FastAPI + MongoDB (motor). Routes under /api.
- Films served from backend seed (33 Vimeo + 1 featured YouTube WmtGrkCIS-M).
- Contact "send a brief" form persists to Mongo `contact_submissions`.

## Design
- Light editorial "paper" theme: cream #F7F5F0, charcoal #1C1B1A, terracotta accent #C75D3B.
- Fonts: Cormorant Garamond (headings), Outfit (body). Grain overlay, client marquee.

## Personas
- Prospective client / brand marketer browsing the reel and sending a brief.
- Filmmaker/collaborator viewing the studio's work.

## What's implemented (2025-12)
- Hero with poetic headline + full logo illustration + client marquee.
- Featured film (YouTube lightbox), Showreel grid (33 Vimeo films) with category filters + Vimeo lightbox.
- About (poetic studio statement + disciplines), Contact (details + working form), Footer watermark.
- Backend: GET /api/films, POST/GET /api/contact. Tested 100% backend + frontend (iteration_1).

## Backlog / Next
- P1: Wire contact form to email delivery (Resend) so briefs reach inbox.
- P1: Replace placeholder email (hello@paperandbrush.pictures) / verify phone & address.
- P2: Admin view for submitted briefs; move films to editable CMS/DB collection.
- P2: Per-film detail pages / credits, SEO/OG meta + favicon with logo.
