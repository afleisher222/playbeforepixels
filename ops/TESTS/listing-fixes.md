# Listing fixes: listing data and honest pricing

September 28, 2026. Lane: `products/*/listing*.json` and the listing generator scripts only. Nothing was published; `ops/PAUSE` stays. Nothing was committed (the lead commits). `brand/logo/` was not touched and no product PDFs were rebuilt: no build script reads `listing.json` (checked with grep), so the only rebuilds needed were the three listing generators.

## Result

`python3 ops/TESTS/check_listings.py` now exits 0: **0 FAIL on all 17 listing records** (15 files). **2 WARN remain, both on purpose:** the two routine-card listings still carry "first then board" and "visual schedule". That is founder decision D9, still PENDING in `ops/APPROVALS.md`, so the words were left as they are.

Baselines:
- `ops/TESTS/listing-qa.md` (snapshot at `c2c0d5c`): 16 records, 70 FAIL checks, every record with at least one FAIL.
- Start of this pass (files as found, 05:30 UTC): 17 records, **62 FAIL checks and 21 WARN checks; 15 of 17 records had a FAIL** (bored-play-cards and course-screen-reset were already clean).
- After: **0 FAIL, 2 WARN; 0 of 17 records with a FAIL.**

`ops/TESTS/listing-qa.md` is now out of date. Regenerate it with `python3 ops/TESTS/check_listings.py --report ops/TESTS/listing-qa.md`. A plain re-run overwrites the verifier's hand notes in that file.

## Before and after, by check

| Check | FAIL before | FAIL after | WARN before | WARN after |
|---|---|---|---|---|
| Etsy title: ≤140, no repeated words, % : & + once | 10 | 0 | 0 | 0 |
| Etsy tags: exactly 13, each ≤20 | 2 | 0 | 0 | 0 |
| KDP title + subtitle ≤200 | 0 | 0 | 3 | 0 |
| BRAND.md listing.json schema and limits | 0 | 0 | 2 | 0 |
| No health / developmental-outcome / safety / fear claims | 0 | 0 | 1 | 0 |
| No named school, district, company, show, creator, device or EdTech | 0 | 0 | 2 | 0 |
| No autism / diagnosis terms or targeting | 0 | 0 | 5 | 2 |
| Honest pricing (16 CFR 233.1) + PRICING.md rules | 1 | 0 | 1 | 0 |
| ai_disclosure filled for every channel; no 'human-made' claim | 10 | 0 | 5 | 0 |
| price_floor + net_per_unit_by_channel present and met | 15 | 0 | 0 | 0 |
| AlphaPlay LLC owner line | 4 | 0 | 0 | 0 |
| No reply-time promise | 0 | 0 | 1 | 0 |
| Readability: FK grade ≤7 | 6 | 0 | 1 | 0 |
| First 160 chars say what it is, the age range and the format | 14 | 0 | 0 | 0 |
| **Total** | **62** | **0** | **21** | **2** |

## Before and after, by listing

FK is the checker's Flesch-Kincaid grade for `long_description` (target 7 or lower). course-screen-reset moved from 5.8 to 6.3 because another lane rewrote its guarantee sentence during this pass. picture-tablet-slept moved from 5.8 to 6.2 because of its new opening sentence. Both are still under 7.

| Listing | File | FAIL before → after | WARN before → after | FK grade before → after |
|---|---|---|---|---|
| board-up-go-more | `products/board-up-go-more/listing.json` | 3 → 0 | 0 → 0 | 4.5 → 4.4 |
| bored-play-cards | `products/bored-play-cards/listing.json` | 0 → 0 | 0 → 0 | 5.1 → 5.1 |
| course-screen-reset | `products/course-screen-reset/listing.json` | 0 → 0 | 0 → 0 | 5.8 → 6.3 |
| first-phone-plan | `products/first-phone-plan/listing.json` | 4 → 0 | 3 → 0 | 7.2 → 5.9 |
| guide-100-plays | `products/guide-100-plays/listing.json` | 6 → 0 | 0 → 0 | 9.3 → 6.8 |
| merch-core-logo-tee | `products/merch-core/listing.json` | 3 → 0 | 0 → 0 | 4.5 → 4.5 |
| merch-core-more-talk-tee | `products/merch-core/listing.json` | 4 → 0 | 0 → 0 | 4.8 → 4.7 |
| merch-core-tote | `products/merch-core/listing.json` | 3 → 0 | 0 → 0 | 6.3 → 6.3 |
| picture-laps-not-apps | `products/picture-laps-not-apps/listing.json` | 4 → 0 | 2 → 0 | 8.6 → 5.5 |
| picture-more-talk-less-tap | `products/picture-more-talk-less-tap/listing.json` | 5 → 0 | 1 → 0 | 9.2 → 6.2 |
| picture-tablet-slept | `products/picture-tablet-slept/listing.json` | 3 → 0 | 1 → 0 | 5.8 → 6.2 |
| play-first-family-kit | `products/play-first-family-kit/listing.json` | 5 → 0 | 3 → 0 | 9.5 → 6.5 |
| play-talk-cards | `products/play-talk-cards/listing.json` | 3 → 0 | 2 → 0 | 6.6 → 5.1 |
| family-talk-along-cards | `products/play-talk-cards/talk-along/listing.json` | 3 → 0 | 2 → 0 | 5.9 → 5.6 |
| toddler-busy-book | `products/toddler-busy-book/listing.json` | 6 → 0 | 3 → 0 | 9.6 → 6.4 |
| visual-routine-cards-starter | `products/visual-routine-cards/listing-starter.json` | 5 → 0 | 2 → 1 | 6.6 → 4.6 |
| visual-routine-cards | `products/visual-routine-cards/listing.json` | 5 → 0 | 2 → 1 | 8.0 → 5.5 |

## Field coverage (17 records)

| Field or test | Before | After |
|---|---|---|
| `price_floor` (named as gate 18 names it) | 2 (+3 stored as `price_floor_usd`) | 17 |
| `net_per_unit_by_channel` | 2 | 17 |
| `margin_pct_by_channel` (PRICING.md §2 asks for margin) | 0 | 17 |
| `ai_disclosure` present | 7 (5 of them free text or missing channels) | 17, each with `ai_helped_with` and `humans_did` |
| `owner` line field | 1 | 17 |
| Etsy listings with exactly 13 tags of ≤20 characters | 11 of 13 | 13 of 13 |
| Etsy titles with a repeated word or a repeated % : & + | 10 of 13 | 0 |
| `long_description` opens (first 160 characters) with what it is, the age range and the format | 3 of 17 | 17 of 17 |
| `short_description` has what it is, the age range and the format | 9 | 17 |
| `long_description` over BRAND.md's 250 words | 2 | 0 |
| `amazon_route` | 17 | 17 (busy book route now notes the 0–3 KDP hold) |
| `amazon_title` for a planned KDP edition | 3 | 6 (busy book, Family Kit journal, Family Talk-Along journal added) |

## Prices: one everyday price each

Every launch product now has one everyday price, the same on Etsy and on our own checkout, as in `business/GROWTH-ENGINE.md` §8a (adopted into `ops/QUEUE.md`). Each `price_notes` states it plainly: no list price, no "was", compare-at or crossed-out price, no standing sale, and a real, time-limited promotion only with its dates in `price_history` first (16 CFR 233.1; BRAND.md "Honest pricing").

| Product | Everyday price | Change |
|---|---|---|
| Visual Routine Cards (full set) | $9.50 | none |
| Routine Cards Starter (60) | **$5.00** | was $4.50, below PRICING.md's $5 minimum; the generator now fails any single printable under $5 |
| Toddler Busy Book | $11.99 | "$15.99 list" reference and the "$19.99 mega bundle" removed |
| "I'm Bored" Play Cards | $6.50 | none |
| Play-First Family Kit | $11 | "$15.99 list price" reference and the retired "$39 digital + deck" gift removed |
| 100 Screen-Free Plays PDF | $9.99 (paperback $16.99) | "$24.99 digital bundle" removed; the compliance note no longer restates the old "$14.99 list, on sale" plan |
| 52 Play & Talk Cards | $7 | the "$12 for both" pair removed (not in the plan) |
| Bundles | $29 Ages 1–5 Instant Gift Bundle; $45 Birth-to-5 Printable Library | each part's `price_notes` names the bundle it belongs to |

No "list at $X and run a sale" or "standing % sale" plan is left in any listing. A regex scan of all 17 records finds such phrases only inside negations ("no standing sale"). Other prices were not changed: first phone $6.50, Talk-Along $7, course $27 ($49 bundle), tees $27 (2XL $29, 3XL $31 because of the partner's cost), tote $22 add-on value, Laps Not Apps $34.99 / $24.99, Talk Tower $6.99 / $12.99, picture books $11.99. picture-tablet-slept's `bundle.compare_at_usd` was renamed `separately_usd`, so a store sync cannot map it to a crossed-out price.

## Price floors and nets

| Listing | Everyday price | price_floor | net_per_unit_by_channel (USD, UNVERIFIED fees) |
|---|---|---|---|
| board-up-go-more | $11.99 | 3.60 | kdp_paperback 3.76, ingramspark_paperback null |
| bored-play-cards | $6.50 | 3.00 | etsy 5.11, etsy_offsite_ad_sale 4.13, site_gumroad 4.54, site_gumroad_discover_sale 3.74, kdp_activity_edition_later null |
| course-screen-reset | $27.00 | 3.00 (kdp_paperback 4.50) | site_gumroad 21.37, site_gumroad_discover_sale 16.47, bundle_site_gumroad 39.43, kdp_paperback 5.85 |
| first-phone-plan | $6.50 | 3.00 | etsy 5.11, etsy_offsite_ad_sale 4.13, site_gumroad 4.54, site_gumroad_discover_sale 3.74, kdp_activity_edition_later null |
| guide-100-plays | $16.99 (PDF $9.99) | 3.00 (kdp_paperback 5.10) | kdp_paperback 6.99, etsy_pdf 8.09, etsy_pdf_offsite_ad_sale 6.59, site_pdf_gumroad 7.40, site_pdf_gumroad_discover_sale 5.90, ingramspark_paperback_later null |
| merch-core-logo-tee | $27.00 | 8.10 | etsy null, etsy_offsite_ad_sale null, site null, merch_on_demand null |
| merch-core-more-talk-tee | $27.00 | 8.10 | etsy null, etsy_offsite_ad_sale null, site null, merch_on_demand null |
| merch-core-tote | $22.00 | 6.60 | site_bundle_share null |
| picture-laps-not-apps | $34.99 | 10.50 (hardcover 10.50, softcover 7.50) | site_hardcover null, site_softcover null, etsy_hardcover null, etsy_softcover null, etsy_hardcover_offsite_ad_sale null, etsy_softcover_offsite_ad_sale null |
| picture-more-talk-less-tap | $6.99 | 3.00 | site_single_gumroad 4.94, site_single_gumroad_discover_sale 4.04, site_license_gumroad 9.86, etsy_single 5.53, etsy_single_offsite_ad_sale 4.48, tpt_single 3.20 |
| picture-tablet-slept | $11.99 | 3.60 | kdp_paperback 3.76, ingramspark_hardcover_later null, site_pod null, site_bundle_play_day null |
| play-first-family-kit | $11.00 | 3.00 | etsy 8.96, etsy_offsite_ad_sale 7.31, site_gumroad 8.23, site_gumroad_discover_sale 6.53, kdp_activity_edition_later null |
| play-talk-cards | $7.00 | 3.00 | etsy 5.54, etsy_offsite_ad_sale 4.49, site_gumroad 4.95, site_gumroad_discover_sale 4.05 |
| toddler-busy-book | $11.99 | 3.00 | etsy 9.80, etsy_offsite_ad_sale 8.00, site_gumroad 9.04, site_gumroad_discover_sale 7.15, kdp_activity_edition_later null |
| visual-routine-cards-starter | $5.00 | 3.00 | etsy 3.83, etsy_offsite_ad_sale 3.08, site_gumroad 3.31 |
| visual-routine-cards | $9.50 | 3.00 | etsy 7.67, etsy_offsite_ad_sale 6.25, site_gumroad 7.00, site_gumroad_discover_sale 5.60 |
| family-talk-along-cards | $7.00 | 3.00 | etsy 5.54, etsy_offsite_ad_sale 4.49, site_gumroad 4.95, site_gumroad_discover_sale 4.05, kdp_activity_edition_later null |

The fee model comes from `commerce/PRICING.md` §2, which points to `commerce/storefront-setup-guide.md`. **Every fee is UNVERIFIED** (no live check was possible), and each listing repeats this in its `net_notes` field. Where sources disagree, the more cautious figure is used:
- **Etsy digital:** $0.20 listing + 6.5% transaction + 3% + $0.25 processing. An Offsite Ads sale adds 15% (12% once the shop passes $10,000 in 12 months).
- **Own checkout at launch:** Gumroad as merchant of record, 10% + $0.50, plus 2.9% + $0.30 card processing. The storefront guide says processing is included; `business/STRESS-TEST.md` counts it, so it is counted here. A Gumroad Discover sale costs about 30% instead.
- **KDP paperback:** 60% royalty at $9.99 or more, minus print cost, less 5% for returns. Expanded Distribution stays off.
- **TpT basic:** 55% payout minus $0.30.
- **Refund allowance:** 5% on everything (G2-11).
- **Floors:** $3.00 per digital sale; 30% of price for print-on-demand items.

These figures match the Gumroad nets in `business/GROWTH-ENGINE.md` §5a for the course ($21.37 and $39.43). They replace the course's old 5% + $0.50 merchant-of-record figures and bored-play-cards' Shopify-based "site" figure.

Points to watch:
- **Routine Cards Starter at $5.00:** an Etsy Offsite Ads sale clears the floor by only about $0.08. A Gumroad Discover sale would net about $2.81, under the floor, so Discover is left out of that listing. `net_notes` says to sell it on Gumroad as a direct sale or add-on with Discover off (PRE-MORTEM #38; whether Discover can be turned off per product is UNVERIFIED).
- **Talk Tower on TpT:** $6.99 nets $3.20. A TpT price under $6.60 would break the floor.
- **Printed-to-order items (tees, tote, Laps Not Apps, the tablet book's site print-on-demand):** the partner has not quoted yet, so these nets are `null` and gate 18 cannot truly pass until the quotes are in. Each listing now carries `max_partner_cost_usd_by_channel`, the most the partner may charge for the sale to keep the 30% floor:
  - Tees: $14.53 on Etsy, only $10.48 on an Offsite Ads sale, $16.46 on the site.
  - Tablet book through the site's print-on-demand: $3.54, which a 32-page color book is unlikely to meet. The note says to link the site to the KDP listing instead.

## AI disclosure

Every record has one `ai_disclosure` block. It says what happened as of September 28, 2026:
- **`ai_helped_with`:** Claude, working in Claude Code, wrote the draft text, made the vector illustrations in code and built the layouts and files.
- **`humans_did`:** the founder directs the line, set the rules and gives the go-ahead. No person has yet rewritten the text or redrawn the art, and the panel in `panel.md` was simulated.

Per-channel keys:
- **Etsy:** `etsy_attribution` "Designed by Play Before Pixels", `etsy_ai_flag` true, `etsy_who_made`, and `etsy_description_line` to add at the end of the description. The Creativity Standards categories (Made by / Designed by / Handpicked by / Sourced by) and the form wording are from memory and marked UNVERIFIED.
- **KDP:** `kdp_ai_text` and `kdp_ai_images` are "AI-generated"; `kdp_ai_translation` is none.
- **Others:** `ingramspark`, `tpt`, `merch_on_demand`, `site` and `social_ai_label` where the listing uses that channel.

"Edited by the founder" may be added only after she has rewritten the text. No listing calls anything hand-drawn, handmade or human-written.

## Other listing fixes

- **Etsy titles:** word stuffing removed from 10 titles. 100 Screen-Free Plays also had "+" twice. No title is over 140 characters.
- **Etsy tags:** 13 tags added to guide-100-plays and picture-more-talk-less-tap. play-talk-cards' "busy toddler ideas" (which reads as a creator's name) became "toddler play ideas". No tag contains a diagnosis or autism word, and the launch listings carry no classroom, teacher, daycare or library tags.
- **Readability:** long descriptions were split into shorter sentences (checker grades now 4.4 to 6.8), with facts and counts kept. first-phone-plan and the busy book were also brought back under 250 words.
- **FAQ:** answers kept. The one reply-time problem was removed from picture-laps-not-apps: the "email a correction within 2 hours" promise, in two answers. picture-more-talk-less-tap's "treats a talking device" became "counts". No other reply-time promise was found in any listing.
- **Internal notes:** condition names were removed from 5 records' `compliance_notes` (first-phone-plan, Family Kit, busy book, both routine-card records). The retired local place name was removed from picture-laps-not-apps.

## Files changed

- **Hand-maintained:** `products/board-up-go-more/listing.json`, `products/bored-play-cards/listing.json`, `products/course-screen-reset/listing.json`, `products/first-phone-plan/listing.json`, `products/guide-100-plays/listing.json`, `products/merch-core/listing.json`, `products/picture-laps-not-apps/listing.json`, `products/picture-more-talk-less-tap/listing.json`, `products/picture-tablet-slept/listing.json`, `products/play-first-family-kit/listing.json`. Each file keeps its own indent and end-of-file style.
- **Generator scripts, edited and then re-run (each run passed its own checks):**
  - `products/play-talk-cards/build/listings.js` writes `play-talk-cards/listing.json` and `play-talk-cards/talk-along/listing.json`.
  - `products/toddler-busy-book/build/listing.js` writes `toddler-busy-book/listing.json`.
  - `products/visual-routine-cards/build/listing.js` writes `visual-routine-cards/listing.json` and `listing-starter.json`.
  - Each generator now carries the same fee model, `pricing()` and a floor check, so a later re-run keeps the fixes.
- The course listing was also edited by another lane during this pass (guarantee and referral wording, already in the auto-save commit `ad30680`). My changes sit on top of theirs.

## Not changed here (outside this lane): follow-ups

1. **D9 (founder):** keep or replace "first then board" and "visual schedule" in the routine-card titles, tags and keywords. These are the 2 remaining WARNs.
2. **Routine-card PDFs:** the last page says "created with AI assistance and edited by Play Before Pixels". Until the founder edits the text, "edited by" overstates the human part (product build lane).
3. **The Day the Tablet Slept:** brand/ORIGINALITY.md B4 renames the dog Biscuit to Tater "everywhere", but the book source still says Biscuit. The listing still names Biscuit in its long description and subtitle, and should change together with the book. The short description now says "her dog".
4. **Laps Not Apps:** `ORDER-TO-PRINT.md` §6 still tells the product page and order email to offer a 2-hour email spelling fix. Either add a self-serve edit link or drop the promise there too.
5. **FAQs kept as asked:** several still offer classroom and site licenses, or quote forms, that `ops/QUEUE.md` holds until counsel answers (bored cards, play-talk, talk-along, 100 Plays, picture books). Some FAQs also name playbeforepixels.com. The checker does not scan `faq` for gate 16, so strip URLs from any FAQ text that goes into an Etsy or TpT listing.
6. **`ops/TESTS/check_listings.py`** (not this lane) still estimates the course at 5% + $0.50 and the site at Shopify rates, and it has no Gumroad or Discover row (PRE-MORTEM #38 fix 2). The listings now use the Gumroad model.
7. **`price_history`** is still empty on the launch products. It needs the go-live date once each listing is live (GROWTH-ENGINE §8a request).
8. **Channel holds:** 5–12 listings (first-phone-plan, Family Talk-Along) are not in LAUNCH FIRST, and Talk Tower is held. Up! Go! More! and Tablet Slept on KDP, and IngramSpark, are held (QUEUE §8a). The holds are noted in `price_notes` and `net_notes`, but the `channels` lines were not rewritten.
9. **Merch:** the $59 holiday gift bundle with a tee is not in the adopted plan. It is marked as an idea in `price_notes`.
10. **`shareable_piece`** is still missing on guide-100-plays, board-up-go-more, picture-tablet-slept and picture-more-talk-less-tap (QUEUE request, not in this task).

## Needs a live check (all UNVERIFIED, from memory)

- **Etsy:** listing, transaction, processing and Offsite Ads fees, and whether Offsite Ads can be turned off below $10,000. Also the title length (140) and the "no repeated words" guidance, 13 tags of up to 20 characters, the Creativity Standards categories, the "Who made it?" wording, and how Etsy wants AI use disclosed.
- **Gumroad:** 10% + $0.50, whether card processing is extra, the Discover fee (about 30%), and whether Discover can be turned off for one product.
- **KDP:** royalty bands (60% at $9.99 or more), print costs ($3.24 for the 32-page premium-color books; $2.30–$2.84 for the black-and-white books), and the AI-generated versus AI-assisted definitions.
- **IngramSpark, TpT and Merch on Demand:** whether each asks about AI, and TpT's Basic payout and fee.
- **Shopify Payments:** 2.9% + $0.30.
