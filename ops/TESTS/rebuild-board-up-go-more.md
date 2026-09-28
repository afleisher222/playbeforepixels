# Rebuild: board-up-go-more (Up! Go! More!), 2026-09-28

**Status:** `held`. It is held from KDP under the CPSIA 0–3 hold (GROWTH-ENGINE §8a). The files are rebuilt and ready.

**Rebuilt with the adopted logo.** `bash products/board-up-go-more/build/render-all.sh` rebuilt:
- the board-book PDF
- the paperback interior and cover wrap
- the previews, `cover.png` and `mockup.png`

The reverse lockup sits on the navy bands and the full-colour lockup on the title page.

**Licenses.** The printed book never offered one. In the FAQ, "Can we order copies for a class, child-care center, library…" now says they are not available yet. The IngramSpark and library channels and to-dos are marked HELD.

**Bracketed notes.** No customer-facing answer had any. The Returns answer no longer sends readers to the website.

**Byline.** `manuscript.json` → `author_credit` is now "Play Before Pixels", matching what already printed.

**ISBN.** The to-dos now say to use Amazon's free KDP ISBN when the hold lifts. The back-cover barcode area stays blank.

**Fonts.** No Type 3 fonts. `check_fonts.js`: 0 problems.

**listing.json**
- `status: held`, `status_notes` and a `kdp` block added.
- The FAQ, `channels` and `human_todo` were updated.
- Price $11.99, `price_floor` 3.60, net per unit and `ai_disclosure` unchanged.

**Tests.** `check_listings.py` 0 FAIL / 0 WARN; PyMuPDF scan clean; `unchanged_renders.py --restore` run.
