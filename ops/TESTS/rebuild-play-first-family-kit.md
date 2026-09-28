# Rebuild note: play-first-family-kit (2026-09-28)

**Status:** listing-g0.json is `ready-pending-accounts`. listing.json (ages 2–12) is `held-until-g1`, to go into the same listing as a free update.

## What changed
- **Logo.** Every output was rebuilt with the Maker's Seal via build/make-all.sh. That covers PDFs, START HERE, cover, mockup, listing images, previews and canva-png/.
- **New G0 edition (`ctx.g0`, variants `kit-g0-*`), $11.** It has 9 tools. The Color file has 41 pages and 259 fields; the Low-ink file has 29 pages and 157 fields.
  - Own-store files: `play-first-family-kit-ages-2-5*.pdf` and `START-HERE-ages-2-5.pdf`.
  - Etsy files: `etsy-upload-ages-2-5/` (5 files).
  - 9 listing images: `preview/listing-images/ages-2-5/`.
  - Held back until G1: the ages 5–12 word checklist, the 5–12 family jobs chart and the 5–8 and 8–12 age tiles.
  - Section letters were renumbered (E became D). "After school or nap" became "After nap".
  - The "More from" page lists only launch products.
  - All 30 plays start at 36 months or younger, so every play stays in.
  - cover.png now shows the 2–5 edition.
- **FAQ.** Removed "[VERIFY]" from the gift answer. The license answer now reads "Not yet … not available yet", and a Refunds answer was added. No license is offered in any file.
- **Type 3 fonts: 0.** Low-ink SVG text (the "30" on the cover and tiles) is now filled instead of outlined.
- **human_todo.** Removed the stale founder-note placeholder item: FOUNDER_NOTE is empty, so no box prints and nothing needs replacing.

## Tests (all clean)
- check_listings.py: 0 FAIL and 0 WARN on both records.
- check_fonts.js: 26 files, 0 problems.
- PyMuPDF scan: 0 Type 3 fonts, no placeholders, no URL in Etsy files.
- check.js: the smallest cut piece is 2.1 in.
- unchanged_renders.py --restore was run.
