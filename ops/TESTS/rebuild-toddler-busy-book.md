# Rebuild note: toddler-busy-book (2026-09-28)

**Status:** listing.json is `ready-pending-accounts` at $11.99. The whole book is already ages 1–5 (G0), so no separate edition was needed and nothing is held back.

## What changed
- **Logo.** Every output was rebuilt with the Maker's Seal via build/make-all.sh. That covers the website and Etsy PDFs, both START HERE files, cover, mockup, 10 listing images, previews and png-templates.
- **Held licenses removed.** The website edition's license box pointed to child-care, classroom and library licenses at /licenses, and the Etsy edition said to message the shop for one. The FAQ now reads "Not yet … not available yet" in both editions.
- **Search words.** "preschool activities" became "toddler activity pages" and "preschool printable" became "toddler learning". listing.js now fails the build on preschool, classroom, teacher, daycare and library words.
- **Channels and human_todo.** KDP is marked HELD (no 0–3 activity books before CPSC guidance). The /licenses item was replaced by a HELD note.
- **Type 3 fonts: 0.** Before this rebuild almost every page had them, from the old variable fonts.
- **Arrows.** "→" appeared in three answer keys and one guide line and fell back to a system font. It is replaced with plain words.

## Tests (all clean)
- check_listings.py: 0 FAIL and 0 WARN.
- check_fonts.js: 17 files, 0 problems.
- PyMuPDF scan: 0 Type 3 fonts, no placeholders, no URL in Etsy files, no license offers.
- build/check.js: QA passed on 8 editions and 4 START HERE files.
- unchanged_renders.py --restore was run.

## Note
- toddler-busy-book-PNG-templates.zip (the website bonus) still exists. CUSTOMER-VOICE rule 1 says printables never ship as a zip; the founder should decide whether it goes to the bonus page as loose PNGs.
