# Rebuild note: first-phone-plan (2026-09-28)

**Status:** `held-until-g1`. The kit is for ages 9–12, so it stays HELD until counsel's G1 answer. It is rebuilt and ready; when G1 clears, change status to `ready-pending-accounts`.

## What changed
- **Logo.** Every output was rebuilt with the Maker's Seal using build/make-all.sh. That covers all four store PDFs, the 5 Etsy files, both START HERE files, cover.png, mockup.png, the 10 listing images and the previews.
- **Held licenses removed.** license_tiers is now personal only; the "group, classroom, library or program: not offered" row was replaced by a license_notes field. The FAQ answer now reads "Can a classroom, child-care center, library or PTA use it? Not yet…". The PDFs never offered a license.
- **FAQ notes removed.** The "[VERIFY …]" note (gift) and the "[link the policy page at launch]" note (refunds) are gone.
- **Listing.** A status and a status_notes field were added. Price ($6.50), price_floor, net_per_unit_by_channel and ai_disclosure were already present and are unchanged.
- **Type 3 fonts:** none before or after.

## Tests (all clean)
- check_listings.py: 0 FAIL and 0 WARN.
- check_fonts.js first-phone-plan: 14 files, 0 problems.
- PyMuPDF scan of 10 PDFs:
  - 0 Type 3 fonts;
  - no placeholders;
  - no URL in the Etsy files;
  - no license offer.
- unchanged_renders.py --restore was run.
