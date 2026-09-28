# Rebuild note: merch-core (2026-09-28)

**Status:** all three records are `ready-pending-accounts`. Each has status_notes:
- **Logo tee:** waits for the print-partner account and quote.
- **"More talk, less tap" tee:** also waits for its slogan search.
- **Tote:** sold only as a bundle add-on, after its slogan search.

## What changed
- **Logo.** Every output was rebuilt with the Maker's Seal using build/render.sh. That covers the tee and tote print files, 28 neck labels, the hang tag, cover.png, mockup.png, the mockups, 16 listing images and the production book.
- **Old logo story removed.** The hang tag, listing image 3 and the logo-tee listing still described the retired "Return" mark ("Our mark is the P of Play. A ball comes back…"). They now describe the Maker's Seal: "Play comes first. Our logo is a maker's seal, like the stamp on a good wooden toy…".
  - The subtitle, short description, bullets, alt text and SEO text were updated to match.
  - On the hang tag front, the stacked lockup overlapped the text. It was resized.
- **Type 3 fonts: 0.** They were on every page of hang-tag.pdf and merch-core.pdf, from the old render. After the rebuild with the static fonts there are none. The production book's code labels used a monospace fallback and now use Nunito Sans.
- **School and group sales removed.** The FAQ used to offer schools, centers, libraries and parent groups a quote and invoice for group orders. It now says "Not yet: group orders, quotes and invoices are not available yet."
- **Notes removed.**
  - The "[VERIFY with the chosen partner]" note (gift) and the "[founder to confirm …]" note are gone from the FAQ.
  - The tote FAQ's "[FILL IN …]" size note became plain words.
  - In the internal production book, [VERIFY] became "(UNVERIFIED)" and "Founder's choice/slot" became "Owner's choice (optional)".
- **Held products removed.** The gift image, listing text and next_products no longer point to The Day the Tablet Slept (held). They now point to 100 Screen-Free Plays and the 76-card "I'm Bored" Play Cards.
- **Search words.** The tote keyword "library book tote" became "book bag for parents" (GROWTH-ENGINE §7).
- **Nets.** net_per_unit_by_channel was all null. It now holds ESTIMATES (UNVERIFIED), explained in net_notes.
  - Assumed partner cost: $12.95 per printed tee plus $4.75 shipping paid by the buyer. That gives $9.23 on Etsy and $11.48 on the site, against a $8.10 floor.
  - Tote: assumed $12.50, which gives $7.46 against a $6.60 floor.
  - Etsy Offsite Ads must stay off: an ad-driven sale nets about $4.47, under the floor.
  - Replace these figures with the partner's real quote.
- **Still boxed on purpose.** The neck labels print a tomato "FILL IN: fiber % · country of origin" box until the blank's spec sheet exists. This is a legal label fact, so the labels cannot be uploaded by mistake.

## Tests (all clean)
- check_listings.py: 0 FAIL and 0 WARN on all 3 records.
- check_fonts.js merch-core: 30 files, 0 problems.
- PyMuPDF scan: 0 Type 3 fonts and no placeholders in hang-tag.pdf or merch-core.pdf.
- unchanged_renders.py --restore was run.
