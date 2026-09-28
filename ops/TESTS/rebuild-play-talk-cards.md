# Rebuild note: play-talk-cards (2026-09-28)

**Status:** listing.json (52 Play & Talk Cards, ages 0–5, $7.00) is `ready-pending-accounts`. talk-along/listing.json (52 Family Talk-Along Cards, ages 5–12, $7.00) is `held-until-g1`: it is built and ready, and waits for counsel's G1 answer (ops/QUEUE.md).

## What changed
- **Logo.** Every output was rebuilt with the Maker's Seal from brand/logo/ using build/render-all.js, market.js, pod.js and listings.js. That covers both decks' store and Etsy PDFs, START HERE, covers, mockups, the 8 listing images each, previews and the POD-later files.
- **Held licenses removed.** Page 3 and START HERE used to send classes, centers and libraries to a classroom or site license. They now say those licenses are "not available yet".
  - license_tiers is now personal only, and a license_notes field was added. The draft prices are kept there, marked "not for sale".
  - The FAQ lost its PTA, library, child-care and teacher license answers. One "Not yet" answer replaces them.
- **FAQ notes removed.** The "[VERIFY …]" note (gift), the "[link …]" note (refunds) and the "[counsel …]" and "[founder …]" notes are gone.
- **Type 3 fonts: 0.** The ♡ on the 52-week checklist fell back to DejaVu. It is now an inline SVG heart outline that can still be colored in.
- **Other fixes.**
  - The POD-later guide text used the generic sans-serif font and a [VERIFY] note. It now uses Nunito Sans, and the note is plain words.
  - Search words: "preschool activities" became "kids play ideas", "preschool activity cards" became "play cards for kids 3 to 5", and the subtitle no longer says "preschoolers" (GROWTH-ENGINE §7).
- **Next products (0–5 deck).** It no longer points to the held 5–12 deck. The last page, next_products and listing image 8 ("Grows with your child") now point to 76 "I'm Bored" Play Cards (1–5), the Toddler Busy Book and 100 Screen-Free Plays.
- **Founder's note.** It is optional only (founder-notes.md). Nothing prints while it is empty.

## Tests (all clean)
- check_listings.py: 0 FAIL and 0 WARN on both records.
- check_fonts.js play-talk-cards: 50 files, 0 problems.
- PyMuPDF scan of 20 PDFs:
  - 0 Type 3 fonts;
  - no FOUNDER, PLACEHOLDER, [VERIFY], TODO or lorem;
  - no URL in the Etsy files;
  - no license offer.
- unchanged_renders.py --restore was run (12 files restored).
