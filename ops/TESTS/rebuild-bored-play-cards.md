# Rebuild note: bored-play-cards (2026-09-28)

**Status:** listing-g0.json is `ready-pending-accounts`. listing.json (ages 1–12 with the seasonal sets) is `held-until-g1`, to go into the same listing as a free update.

## What changed
- **Logo.** Every output was rebuilt with the Maker's Seal via build/make-all.sh. That covers own-store and Etsy PDFs, START HERE, cover, mockup, listing images, previews and png-templates.
- **New G0 edition (TIER `g0` in build/build.js), $6.50.** It has 76 cards: 38 for ages 1–3 and 38 for ages 3–5. 70 of the 76 need nothing to buy. It adds 14 blanks, 20 dividers, 2 card backs and 36 pages. The color files have 275 fillable fields.
  - Own-store files: `bored-play-cards-ages-1-5*.pdf` and `START-HERE-ages-1-5.pdf`.
  - Etsy files: `etsy-upload-ages-1-5/` (5 files).
  - 8 listing images: `preview/listing-images/ages-1-5/`.
  - Held back until G1: the 5–8 and 8–12 bands and the summer and rainy-day sets, because the seasonal cards run to age 12.
  - The G0 ages page gained a "Between two bands" tip and a "Big brothers and sisters" tip so it isn't half empty.
  - cover.png and mockup.png now show the 1–5 edition.
- **Held licenses removed.** The PDF FAQ, last page and START HERE used to tell classrooms, centers and libraries to buy a classroom or site license. They now say those licenses are "not available yet".
  - In listing.json, license_tiers is now personal only, and a license_notes field was added.
  - The FAQ lost its PTA and library license answers and the "[founder to confirm]" and "[counsel to confirm]" notes.
- **FAQ notes removed.** "[VERIFY]" (gift), "[link]" (refunds) and "(see amazon_route)" are gone from the FAQ.
- **Tags.** "preschool activities" became "kids play ideas".
- **Type 3 fonts: 0.** Low-ink SVG text is now filled instead of outlined, using the same `:is(text, #id)` fix.
- **Build scripts.** make-all.sh, finish.js and verify.py now build and QA both editions.

## Tests (all clean)
- check_listings.py: 0 FAIL and 0 WARN on both records.
- check_fonts.js: 26 files, 0 problems.
- PyMuPDF scan: 0 Type 3 fonts, no placeholders, no URL in Etsy files, no license offers.
- build/verify.py: ALL CHECKS PASSED.
- unchanged_renders.py --restore was run.
