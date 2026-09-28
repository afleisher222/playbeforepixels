# Rebuild: picture-more-talk-less-tap (Talk Tower Classroom Game Kit + bonus story), 2026-09-28

**Status:** `held-pending-counsel`, unchanged. This is a school-facing product, so the whole kit stays unsold until employment counsel answers.

**Rebuilt with the adopted logo.** `node products/picture-more-talk-less-tap/build/build-all.js` rebuilt:
- the kit in Letter and A4, colour and ink-saver
- the slides and START HERE
- the bonus story, the previews, `cover.png`, `mockup.png` and `downloads/`

**Licenses removed.**
- Kit page 24 had a two-column single/site license table, a PTA line and a purchase-order and quote-form box. It is now single-classroom terms only, plus "School, library or group licenses? They are not available yet."
- START HERE, the page footers and slides ("one classroom or one site" became "one classroom") and the story's copyright page were changed to match.
- The "More from" page teased a whole-school "Talk Tower Class Cup". It now shows *100 Screen-Free Plays*.

**For the lead.** The kit's own base license is single-classroom, and ops/QUEUE.md holds single-classroom licenses too. That is why the product as a whole stays held. Selling it at all needs counsel's answer or a home/family edition.

**Bracketed notes removed from the FAQ.** `[VERIFY…]` (gift), `[counsel to confirm]` (PTA and library, both answered "not available yet") and `[link the policy page…]` (refunds). The FAQ no longer links to /license. The listing no longer offers the site tier (`price_site_license_usd` and the site net removed; `license_tiers` marks it HELD).

**Fonts.** No Type 3 fonts. The ✂ on the cut pages fell back to DejaVu Sans, so it is now an inline SVG scissors icon. `check_fonts.js`: 0 problems in 10 files, and the PDFs embed brand fonts only.

**listing.json**
- The FAQ, `long_description`, `channels` (the TpT hold is noted), `license_tiers`, `human_todo` and `status_notes` were updated.
- Price $6.99, `price_floor` 3.00, net per unit (site-license row removed) and `ai_disclosure` unchanged.

**Tests.** `check_listings.py` 0 FAIL / 0 WARN; PyMuPDF scan clean (the only license text left is the kit's own single-classroom terms and "not available yet"); `unchanged_renders.py --restore` run.
