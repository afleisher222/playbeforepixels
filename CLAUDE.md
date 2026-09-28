# Play Before Pixels — operating manual for Claude Code

This private repository IS the business. Every Claude Code session and scheduled routine works from here.

## What it is
"Play Before Pixels" is a trade name of **AlphaPlay LLC** (business mailing address: see `legal/ENTITY.md`). A faceless, self-running, product-only business for parents of 0–5s, parents and educators of 5–12s, and parent/teacher groups worldwide: talk-along board books and picture books (print-on-demand), printables, a classroom pack with site licenses, a card deck, host-it-yourself workshop kits, research briefs, POD merch, a written course. No coaching or live services. No inventory.

## Binding rules — read before any work
- `brand/BRAND.md` — hard rules (no health claims; never name/criticize a school, district, company or EdTech product; child safety; allowed citations; faceless; self-running; no inventory), palette, fonts, illustration style, print specs, deliverables.
- `legal/ENTITY.md` — legal owner, copyright line, ALPHAPLAY trademark deadline (Statement of Use or extension due **March 8, 2027**).
- Outreach exclusions (never contact, never list as targets): Montgomery County Public Schools and its staff; MCEA and its affiliates MSEA and NEA; Montgomery County DHHS and its Infants and Toddlers Program. Questions touching the founder's employment go only to `legal/FOR-EMPLOYMENT-COUNSEL.md`.
- Never publish anything about the founder's legal matters, her children's details, or her employer. The founder story is anonymous (`content/founder-story.md`) and needs counsel review before publication.

## Map
- `index.html` — current site preview (to be replaced by the multi-page site in `site/`).
- `brand/` — BRAND.md, fonts/, render.js (HTML → PDF/PNG via Playwright Chromium), logo/ (final kit), logo-concepts/.
- `products/<slug>/` — source.html, print PDF, preview PNGs, cover.png, mockup.png, listing.json.
- `legal/`, `commerce/` (links.js + storefront setup), `finance/` (bookkeeping workbook + money/tax setup), `marketing/`, `seo/`, `operations/` (SOPs, customer-service macros), `content/`.

## Rendering
`node brand/render.js pdf <in.html> <out.pdf>` · `node brand/render.js pages <in.html> <outdir> .page 1` · `node brand/render.js png <in.html> <out.png> <w> <h> <scale>`

## Commits
Run `bash ops/cloud/bootstrap.sh` at the start of every session. The working branch is **`claude/live`**: commit finished work in small logical commits and push to `claude/live` (scheduled routines are only allowed to push to `claude/` branches). Interactive sessions also push the same commits to `main` as a mirror. Never commit secrets or API tokens — those live in the environment's API credentials. Operating plan for the cloud: `ops/CLOUD-RUNBOOK.md`.
