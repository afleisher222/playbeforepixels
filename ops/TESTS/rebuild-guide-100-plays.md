# Rebuild: guide-100-plays (100 Screen-Free Plays for Ages 0–5), 2026-09-28

**Status:** `ready-pending-accounts`. Nothing is published (ops/PAUSE).

**Rebuilt with the adopted logo.** `sh products/guide-100-plays/build/make.sh` rebuilt every output with the Maker's Seal files in `brand/logo/`:
- the KDP interior and the brand-size interior, the cover wrap, `cover.png` and `mockup.png`
- the 9 listing images and START HERE (own shop and Etsy)
- the 4 own-shop PDFs, the 5 Etsy files and the previews

The grayscale interior uses `lockup-horizontal-black.svg`.

**Licenses removed.**
- The copyright page offered classroom and site licenses through the quote form or an Etsy message. The paperback now says nothing about licenses, and the PDFs say "This copy is for one household."
- START HERE (own shop and Etsy) no longer offers them.
- The FAQ now says classroom, school, library, child-care and group licenses are "not available yet".
- The IngramSpark channel is marked HELD.

**Bracketed notes.** Removed `[VERIFY current gift options…]` from the gift FAQ answer. No URL appears in any Etsy file.

**Fonts.**
- No Type 3 fonts in any PDF.
- `check_fonts.js`: 0 problems. The internal art index `build/artsheet.html` fell back to Liberation Serif, so `artsheet.js` now loads the brand fonts.

**KDP paperback: proof-ready.**
- Interior: `guide-100-plays-kdp-interior.pdf`, 86 pages, 8.125 × 10.25 in (8 × 10 trim with bleed on the top, bottom and outside edge), grayscale.
- Cover: `guide-100-plays-cover-wrap.pdf`, 16.4437 × 10.25 in. The spine is 0.1937 in (86 × 0.002252, recomputed from the current page map) and carries no spine text.
- ISBN: Amazon's free KDP ISBN. No ISBN is printed inside. The back cover keeps a blank 2 × 1.2 in white barcode area.
- Author/byline: "Play Before Pixels". Recorded in `listing.json` → `kdp`. The front cover and title page carry the lockup.
- Safe zone, measured on the PDFs:
  - Interior: text is at least 0.421 in from every trim edge, and no art element sits inside 0.375 in (full-bleed fills excluded). The running footer sits 0.40 in above the bottom trim.
  - Cover: the front footer sat 0.318 in from the bottom trim (its line box), so it was lifted (`.ffoot` bottom padding raised from 0.1 in to 0.3 in). It now sits 0.42 in from the trim.
- UNVERIFIED, to check against KDP's own calculator and previewer: the spine rate, the print cost and the barcode position.

**listing.json**
- `status`, `status_notes` and a new `kdp` block added.
- The FAQ was fixed. `channels`, `trim`, `compliance_notes` and `human_todo` were updated for the free ISBN and the license hold.
- Price $16.99 paperback / $9.99 PDF, `price_floor` 3.00, net per unit and `ai_disclosure` unchanged (already filled).

**Tests.**
- `check_listings.py`: 0 FAIL / 0 WARN.
- `check_fonts.js guide-100-plays`: 0 problems.
- PyMuPDF scan: 0 Type 3 fonts, 0 placeholder strings, 0 license offers.
- `unchanged_renders.py --restore` was run.
