# Rebuild note: visual-routine-cards (2026-09-28)

**Status:** listing-g0.json and listing-starter.json are `ready-pending-accounts`. listing.json (the 0–12 Complete Set) is `held-until-g1`: when counsel allows, it goes into the same listing as a free update, not as a new listing.

## What changed
- **Logo.** Every output was rebuilt with build/make-all.sh and now uses the Maker's Seal files from brand/logo/. That covers all PDFs (own-store and Etsy), START HERE, cover.png, mockup.png, listing images, previews and canva-png/.
- **New G0 edition (tier `g0` in build/build.js), $9.50.** It has 177 cards for ages 0–5 and all ages, 6 chart layouts (7 ready-made and 6 blank per colorway), 4 colorways, 116 Color pages and 56 Low-ink pages.
  - Own-store files: `visual-routine-cards-0-5*.pdf` and `START-HERE-0-5.pdf`.
  - Etsy files: `etsy-upload/ages-0-5/` (5 files).
  - 9 listing images: `preview/listing-images/ages-0-5/`.
  - Held back until G1: the 58 big-kid cards, the 8 weekly checklists, the 5–12 age tiles and the canva-png offer.
  - cover.png and mockup.png now show the 0–5 edition.
- **Starter (60 cards), $5.00.** Its "Want more?" tile, bonus page, listing and FAQ now point to the 0–5 edition, not the 0–12 set.
- **Search words.** The recommended D9 REPLACE is applied in all three records: no "first then board", "visual schedule" or "preschool" in titles, tags, keywords, short or SEO text. build/listing.js now fails the build on these words. If the founder answers KEEP, restore them in build/listing.js.
- **FAQ.** Removed "[VERIFY …]" from the gift answer and "[link …]" from the refund answer. The license FAQ says "Not yet" and no license is offered anywhere.
- **Type 3 fonts: 0.** Low-ink SVG text is now filled, not outlined. The fix uses an `:is(text, #id)` rule so it outranks the line-art rules. "≈ 1.25 in" became "about 1.25 in" because the brand fonts have no ≈.
- **Last-page AI line.** It said "…edited by Play Before Pixels". It now reads "How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels", which matches ai_disclosure.
- **Listing image 9.** The typed-label demo now uses Nunito Sans and says that typed words show in a plain standard font. It used to use Helvetica, which fell back to a system font.

## Tests (all clean)
- check_listings.py: 0 FAIL and 0 WARN on all 3 records.
- check_fonts.js visual-routine-cards: 36 files, 0 problems.
- PyMuPDF scan of every PDF: 0 Type 3 fonts; no FOUNDER, PLACEHOLDER, [VERIFY], TODO or lorem; no URL in Etsy files; no license offer.
- build/check.js: no overflow; the smallest cut piece is 1.62 in.
- unchanged_renders.py --restore was run.

## Founder decisions
- D9 (KEEP or REPLACE) is still open. REPLACE is applied.
