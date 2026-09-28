# Listing QA: marketplace reviewer + compliance officer pass

Generated 2026-09-28 by `ops/TESTS/check_listings.py`. Re-run: `python3 ops/TESTS/check_listings.py --report ops/TESTS/listing-qa.md`.
The script only reads product files. Proposed replacement lines are suggestions for the product owner to apply; nothing here was edited in `products/`.

> **Snapshot note (added by the verifier):** this report describes the listing files as committed in `c2c0d5c` (2026-09-28 02:16 UTC). By 03:20 UTC, 11 of the 15 files had changed, and `merch-core` held a third record. Every hand correction in sections 1–5 is marked *(verifier)*. See **6. Verification** at the end for what was re-checked, what changed, and the state of the files at 03:20. A plain re-run of the script overwrites these corrections unless the script gets the same fixes.

Legend: **PASS** · **FAIL** (blocks publishing that item, per ROUTINE.md) · **WARN** (a person decides) · **–** (does not apply to this listing's channels).

## 1. Limits and rules used

Platform numbers come from memory; web search was not available in this session, so **every platform limit is UNVERIFIED** and listed again under *Needs a live check*.

| Channel | Field | Limit used | Where it should be confirmed | Status |
|---|---|---|---|---|
| Etsy | Listing title length | 140 | Etsy listing form / Open API v3 `title` | **UNVERIFIED** |
| Etsy | Title: each of % : & + at most once | 1 | Etsy Open API v3 `title` rules | **UNVERIFIED** |
| Etsy | Title: no content word repeated (stuffing) | 1 | Etsy seller-handbook title guidance | **UNVERIFIED** |
| Etsy | Tags per listing (we require exactly 13) | 13 | Etsy listing form | **UNVERIFIED** |
| Etsy | Characters per tag | 20 | Etsy listing form | **UNVERIFIED** |
| Amazon KDP | Title + subtitle combined | 200 | KDP title field help | **UNVERIFIED** |
| Amazon KDP | Keyword boxes | 7 | KDP keywords help | **UNVERIFIED** |
| Amazon KDP | Characters per keyword box | 50 | KDP keywords help | **UNVERIFIED** |
| Amazon KDP | Description length (HTML counts) | 4000 | KDP description help | **UNVERIFIED** |
| Shopify (own site) | SEO page title | 70 | Shopify admin search-engine listing | **UNVERIFIED** |
| Shopify (own site) | Meta description (display target; admin may allow 320) | 160 | Shopify admin / Google snippet length | **UNVERIFIED** |
| Teachers Pay Teachers | Resource title | 80 | TpT product-upload form | **UNVERIFIED** |
| Amazon Merch on Demand | Product title | 60 | Merch on Demand upload form | **UNVERIFIED** |
| Amazon Merch on Demand | Each of 2 feature bullets | 256 | Merch on Demand upload form | **UNVERIFIED** |
| Amazon Merch on Demand | Product description | 2000 | Merch on Demand upload form | **UNVERIFIED** |
| Etsy / site / TpT / merchant of record | Fees used for the estimated nets (listing $0.20; 6.5% transaction; 3% + $0.25 processing; 15% Offsite Ads; Shopify 2.9% + $0.30; MoR 5% + $0.50 *(verifier: the low end of the range. The commerce plan's merchant of record is Gumroad at 10% + $0.50, per commerce/storefront-setup-guide.md §13 and business/BUSINESS-PLAN.md `mor_pct`)*; TpT basic 55% − $0.30; 5% refund allowance) | – | each platform's fee page | **UNVERIFIED** |
| BRAND.md schema | short_description | 160 | brand/BRAND.md 'Deliverables per product' | repo rule (binding) |
| BRAND.md schema | seo_title | 60 | brand/BRAND.md | repo rule (binding) |
| BRAND.md schema | seo_description | 155 | brand/BRAND.md | repo rule (binding) |
| BRAND.md schema | long_description words (min) | 120 | brand/BRAND.md | repo rule (binding) |
| BRAND.md schema | long_description words (max) | 250 | brand/BRAND.md | repo rule (binding) |
| BRAND.md schema | bullets | 5 | brand/BRAND.md | repo rule (binding) |
| BRAND.md schema | keywords | 7 | brand/BRAND.md | repo rule (binding) |
| Pricing | Net per digital sale (floor, USD) | 3.0 | commerce/PRICING.md s.2; COMPLIANCE-GATE 18 | repo rule (binding) |
| Pricing | Lowest price for a single printable (USD) | 5.0 | commerce/PRICING.md s.1 | repo rule (binding) |
| Pricing | KDP paperback list price (USD, unless print cost prevents) | 9.99 | commerce/PRICING.md s.2; COMPLIANCE-GATE 16b | repo rule (binding) |
| Pricing | POD margin floor | 0.3 | commerce/PRICING.md s.2 | repo rule (binding) |
| Readability | Flesch-Kincaid grade of long_description (FAIL above 7.5; 7.1-7.5 = WARN because the syllable heuristic runs 0.5-1 grade high) | 7.0 | task target | task rule |
| Search snippet | First N chars must say what + age + format | 160 | task rule | task rule |

Content rules come from `brand/BRAND.md` (hard rules 1–7, *Autism searches*, *Honest pricing*, *Self-running*, *Customer-voice* 9, 12, 18) and `ops/COMPLIANCE-GATE.md` lines 1, 2, 4, 8, 10, 11, 15–18, 21. Public fields scanned: `title`, `subtitle`, `etsy_title`, `amazon_title`, `marketplace_title`, `tpt_title`, `series`, `short_description`, `long_description`, `bullets`, `keywords`, `etsy_tags`, `seo_title`, `seo_description`, `alt_text`, `alt_text_picker`, `faq`, `editable`, `activities`, `prep_time`, `bonus_offer`, `sizes`, `colors`, `bundle.name`, `bundle.pitch`. The address and owner-line checks scan every field. The autism check also counts internal notes (WARN).

## 2. Summary

16 listing records in 15 files. **16 of 16 have at least one FAIL** (70 failing checks in total; the script printed 71, and the verifier moved the tote's first-160 result to WARN).

*(verifier)* How to read the FAIL counts:
- **Etsy title (9):** all nine come from the repeated-word rule alone. No title is over 140 characters, and none repeats % : & +. Etsy would accept every one of these titles. The repeated-word rule is Etsy guidance (UNVERIFIED), not a form limit, so treat these as a house rule, not a platform rejection.
- **Owner line (3):** a record-keeping gap only. bored-play-cards, play-first-family-kit and toddler-busy-book do not store the line in `listing.json`, but their build files print the AlphaPlay LLC copyright line (checked in `build/` at `c2c0d5c`). Gate 8 is met in the product itself.
- Every listing still has at least one FAIL on a binding repo rule (gate 18 price floor and net), so the headline stands.

Skipped as archived: `products/picture-more-talk-less-tap/story-bonus/ARCHIVED-book-listing.json`.

| Listing | Etsy title | Etsy tags | KDP title | KDP kw | KDP desc | Shopify SEO | TpT | MoD | Schema | Health | Names | Autism | Pricing | AI discl. | Floor/net | Owner | Address | Reply time | Coaching | Mkt links | FK≤7 | First 160 | FAIL | WARN |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [`board-up-go-more`](#l-board-up-go-more) | – | – | PASS | PASS | PASS | PASS | – | – | PASS | PASS | PASS | PASS | PASS | FAIL | FAIL | PASS | PASS | PASS | PASS | – | PASS | FAIL | 3 | 0 |
| [`bored-play-cards`](#l-bored-play-cards) | FAIL | PASS | PASS | PASS | PASS | PASS | – | – | PASS | PASS | PASS | WARN | PASS | FAIL | FAIL | FAIL | PASS | PASS | PASS | PASS | FAIL | FAIL | 6 | 1 |
| [`course-screen-reset`](#l-course-screen-reset) | – | – | PASS | PASS | PASS | PASS | – | – | PASS | WARN | PASS | WARN | WARN | FAIL | FAIL | PASS | PASS | PASS | PASS | – | FAIL | PASS | 3 | 3 |
| [`first-phone-plan`](#l-first-phone-plan) | FAIL | PASS | PASS | PASS | PASS | PASS | – | – | PASS | PASS | PASS | WARN | PASS | FAIL | FAIL | PASS | PASS | PASS | PASS | PASS | PASS | FAIL | 4 | 1 |
| [`guide-100-plays`](#l-guide-100-plays) | FAIL | FAIL | PASS | PASS | PASS | PASS | – | – | FAIL | PASS | PASS | PASS | FAIL | FAIL | FAIL | PASS | PASS | PASS | PASS | PASS | FAIL | FAIL | 8 | 0 |
| [`merch-core-logo-tee`](#l-merch-core-logo-tee-0) | FAIL | PASS | – | – | – | PASS | – | PASS | PASS | PASS | PASS | PASS | PASS | FAIL | FAIL | PASS | PASS | PASS | PASS | PASS | PASS | PASS | 3 | 0 |
| [`merch-core-tote`](#l-merch-core-tote-1) | – | – | – | – | – | PASS | – | – | PASS | PASS | PASS | PASS | PASS | FAIL | FAIL | PASS | PASS | PASS | PASS | – | PASS | WARN | 2 | 1 |
| [`picture-laps-not-apps`](#l-picture-laps-not-apps) | PASS | PASS | – | – | – | PASS | – | – | PASS | PASS | WARN | PASS | PASS | FAIL | FAIL | PASS | PASS | WARN | PASS | PASS | FAIL | FAIL | 4 | 2 |
| [`picture-more-talk-less-tap`](#l-picture-more-talk-less-tap) | PASS | FAIL | – | – | – | PASS | PASS | – | PASS | WARN | PASS | PASS | PASS | FAIL | FAIL | PASS | PASS | PASS | PASS | PASS | FAIL | FAIL | 5 | 1 |
| [`picture-tablet-slept`](#l-picture-tablet-slept) | – | – | PASS | PASS | PASS | PASS | – | – | PASS | PASS | PASS | PASS | WARN | FAIL | FAIL | PASS | PASS | PASS | PASS | – | PASS | FAIL | 3 | 1 |
| [`play-first-family-kit`](#l-play-first-family-kit) | FAIL | PASS | WARN | PASS | PASS | PASS | – | – | PASS | PASS | PASS | WARN | PASS | WARN | FAIL | FAIL | PASS | PASS | PASS | PASS | FAIL | FAIL | 5 | 3 |
| [`play-talk-cards`](#l-play-talk-cards) | FAIL | PASS | – | – | – | PASS | – | – | PASS | PASS | WARN | PASS | PASS | WARN | FAIL | PASS | PASS | PASS | PASS | PASS | PASS | FAIL | 3 | 2 |
| [`family-talk-along-cards`](#l-family-talk-along-cards) | FAIL | PASS | WARN | PASS | PASS | PASS | – | – | PASS | PASS | PASS | PASS | PASS | WARN | FAIL | PASS | PASS | PASS | PASS | PASS | PASS | FAIL | 3 | 2 |
| [`toddler-busy-book`](#l-toddler-busy-book) | FAIL | PASS | WARN | PASS | PASS | PASS | – | – | PASS | PASS | PASS | WARN | PASS | FAIL | FAIL | FAIL | PASS | PASS | PASS | PASS | FAIL | FAIL | 6 | 2 |
| [`visual-routine-cards-starter`](#l-visual-routine-cards-starter) | FAIL | PASS | – | – | – | PASS | – | – | FAIL | PASS | PASS | WARN | FAIL | FAIL | FAIL | PASS | PASS | PASS | PASS | PASS | WARN | FAIL | 6 | 2 |
| [`visual-routine-cards`](#l-visual-routine-cards) | PASS | PASS | – | – | – | PASS | – | – | FAIL | WARN | PASS | WARN | FAIL | FAIL | FAIL | PASS | PASS | PASS | PASS | PASS | FAIL | FAIL | 6 | 2 |

**Clean on every listing:** KDP keywords: 7 boxes, each ≤50; KDP description ≤4000; Shopify SEO title ≤70, meta ≤160; TpT title ≤80; Merch on Demand title ≤60, bullets ≤256, description ≤2000; No home address, phone number or personal email; No coaching / calls / podcast / live service; Etsy/TpT copy: no URL, QR or other-store pointer (gate 16). *(verifier: the gate 16 check does not scan `faq`. The merch-core-logo-tee FAQ names playbeforepixels.com, and the picture-more-talk-less-tap FAQ says "Full terms: playbeforepixels.com/license". Both listings have Etsy or TpT channels. See 6. Verification.)*

**Failures by check (most common first):** price_floor + net_per_unit_by_channel present and met: 16; First 160 chars say what it is, the age range and the format: 13 *(verifier: 14 in the script output; the adult tote is now WARN)*; ai_disclosure filled for every channel; no 'human-made' claim: 13; Etsy title: ≤140, no repeated words, % : & + once: 9; Readability: FK grade ≤7: 8; AlphaPlay LLC owner line: 3; BRAND.md listing.json schema and limits: 3; Honest pricing (16 CFR 233.1) + PRICING.md rules: 3; Etsy tags: exactly 13, each ≤20: 2.

## 3. Per listing

### board-up-go-more
<a id="l-board-up-go-more"></a>

File: `products/board-up-go-more/listing.json` · Price: $11.99 · Channels tested: kdp (now), ingramspark (now), site (now), amazon_seller (later), faire (later), social (now)

| Check | Result | What was found |
|---|---|---|
| Etsy title: ≤140, no repeated words, % : & + once | **–** | not listed on Etsy |
| Etsy tags: exactly 13, each ≤20 | **–** | not listed on Etsy |
| KDP title + subtitle ≤200 | **PASS** | 86 chars (title + subtitle) |
| KDP keywords: 7 boxes, each ≤50 | **PASS** | 7 boxes, longest 36 chars |
| KDP description ≤4000 | **PASS** | 1298 chars |
| Shopify SEO title ≤70, meta ≤160 | **PASS** | title 54 / meta 141 chars |
| TpT title ≤80 | **–** | not on TpT |
| Merch on Demand title ≤60, bullets ≤256, description ≤2000 | **–** | not on Merch on Demand |
| BRAND.md listing.json schema and limits | **PASS** | 0 required field(s) missing; long_description 240 words |
| No health / developmental-outcome / safety / fear claims | **PASS** | 0 hit(s) in public fields |
| No named school, district, company, show, creator, device or EdTech | **PASS** | 0 fail hit(s) |
| No autism / diagnosis terms or targeting | **PASS** | 0 public hit(s) |
| Honest pricing (16 CFR 233.1) + PRICING.md rules | **PASS** | price $11.99 |
| ai_disclosure filled for every channel; no 'human-made' claim | **FAIL** | channels: kdp(now), ingramspark(now), site(now), social(now) |
| price_floor + net_per_unit_by_channel present and met | **FAIL** | no floor |
| AlphaPlay LLC owner line | **PASS** | found in compliance_notes |
| No home address, phone number or personal email | **PASS** | 0 hit(s) in all fields |
| No reply-time promise | **PASS** | 0 hit(s) |
| No coaching / calls / podcast / live service | **PASS** | 0 hit(s) |
| Etsy/TpT copy: no URL, QR or other-store pointer (gate 16) | **–** | no Etsy/TpT channel |
| Readability: FK grade ≤7 | **PASS** | long_description FK 4.5; all parent-facing text FK 5.2 |
| First 160 chars say what it is, the age range and the format | **FAIL** | missing age, format; short_description lacks one or more |

**Failures and warnings, with the exact text and a proposed replacement**

- **FAIL · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure` · blank for every channel (gate 17; G2-08)

  Offending text:

  > (missing)

  Proposed replacement:

  > "ai_disclosure": {"kdp_ai_text": "AI-generated", "kdp_ai_images": "AI-generated", "kdp_ai_translation": "none", "ingramspark": "AI-generated images and draft text disclosed on the title setup", "site": "product page line: 'Illustrations and text are made with AI assistance.' (say 'edited by the founder' only after she has)", "social_ai_label": "apply each platform's AI label to posts that use these images"}  (Answers must match what really happened: set etsy_ai_flag from Etsy's current form [UNVERIFIED wording]; add 'edited by the founder' to any answer only after she has rewritten that part.)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `price_floor` · no price_floor (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "price_floor": 3.60  (30% POD margin on the $11.99 paperback, commerce/PRICING.md)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `net_per_unit_by_channel` · no per-channel net (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "net_per_unit_by_channel": {"kdp": 3.95, "ingramspark": null}  (KDP from price_notes: 60% of $11.99 minus about $3.24 premium-color print [VERIFY in KDP calculator]; IngramSpark after its print cost and wholesale discount. Keep KDP Expanded Distribution off: at 40% it would net about $1.56, under the floor.)

- **FAIL · First 160 chars say what it is, the age range and the format** · field `long_description[:160]` · missing: age, format

  Offending text:

  > Up! Go! More! is a bright, uncluttered first-words book for babies and toddlers, built for laps and back-and-forth. Each of its 22 pages shows one everyday word

  Proposed replacement:

  > Up! Go! More! is a 32-page talk-along picture book for ages 0–3, in paperback. It has 22 first words, one per page, each with a sound, sign or move to copy.


### bored-play-cards
<a id="l-bored-play-cards"></a>

File: `products/bored-play-cards/listing.json` · Price: $6.50 · Channels tested: etsy (now), site (now), kdp (later), social (now)

| Check | Result | What was found |
|---|---|---|
| Etsy title: ≤140, no repeated words, % : & + once | **FAIL** | 132 chars, 22 words |
| Etsy tags: exactly 13, each ≤20 | **PASS** | 13 tags, longest 20 chars |
| KDP title + subtitle ≤200 | **PASS** | 126 chars (amazon_title) |
| KDP keywords: 7 boxes, each ≤50 | **PASS** | 7 boxes, longest 20 chars |
| KDP description ≤4000 | **PASS** | 1205 chars |
| Shopify SEO title ≤70, meta ≤160 | **PASS** | title 59 / meta 150 chars |
| TpT title ≤80 | **–** | not on TpT |
| Merch on Demand title ≤60, bullets ≤256, description ≤2000 | **–** | not on Merch on Demand |
| BRAND.md listing.json schema and limits | **PASS** | 0 required field(s) missing; long_description 220 words |
| No health / developmental-outcome / safety / fear claims | **PASS** | 0 hit(s) in public fields |
| No named school, district, company, show, creator, device or EdTech | **PASS** | 0 fail hit(s) |
| No autism / diagnosis terms or targeting | **WARN** | 0 public hit(s) |
| Honest pricing (16 CFR 233.1) + PRICING.md rules | **PASS** | price $6.50 |
| ai_disclosure filled for every channel; no 'human-made' claim | **FAIL** | channels: etsy(now), site(now), kdp(later), social(now) |
| price_floor + net_per_unit_by_channel present and met | **FAIL** | no floor; est. etsy ≈ $5.11, etsy_offsite_ad_sale ≈ $4.13, site ≈ $5.69 |
| AlphaPlay LLC owner line | **FAIL** | not found |
| No home address, phone number or personal email | **PASS** | 0 hit(s) in all fields |
| No reply-time promise | **PASS** | 0 hit(s) |
| No coaching / calls / podcast / live service | **PASS** | 0 hit(s) |
| Etsy/TpT copy: no URL, QR or other-store pointer (gate 16) | **PASS** | 0 hit(s) in shared marketplace fields |
| Readability: FK grade ≤7 | **FAIL** | long_description FK 9.2; all parent-facing text FK 9.3 |
| First 160 chars say what it is, the age range and the format | **FAIL** | missing age; short_description lacks one or more |

**Failures and warnings, with the exact text and a proposed replacement**

- **FAIL · Etsy title: ≤140, no repeated words, % : & + once** · field `etsy_title` · repeated words (title stuffing): cards ×2

  Offending text:

  > 150 I'm Bored Jar Cards, Screen-Free Activity Cards for Kids 1-12 by Age, Printable Boredom Buster, Summer + Rainy Day, Editable PDF

  Proposed replacement:

  > 150 I'm Bored Jar Cards for Kids 1-12, Screen-Free Activity Ideas by Age, Printable Boredom Buster, Summer and Rainy Day, Editable PDF

- **WARN · No autism / diagnosis terms or targeting** · field `compliance_notes` · 2 mention(s) in internal notes; a whole-file CI banned-word check (G2-04) would trip

  Offending text:

  > ADHD, autism

  Proposed replacement:

  > Say 'diagnosis or condition wording' in compliance notes instead of naming the condition.

- **FAIL · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure` · blank for every channel (gate 17; G2-08)

  Offending text:

  > (missing)

  Proposed replacement:

  > "ai_disclosure": {"etsy_attribution": "Designed by Play Before Pixels", "etsy_ai_flag": true, "kdp_ai_text": "AI-generated", "kdp_ai_images": "AI-generated", "kdp_ai_translation": "none", "site": "product page line: 'Illustrations and text are made with AI assistance.' (say 'edited by the founder' only after she has)", "social_ai_label": "apply each platform's AI label to posts that use these images"}  (Answers must match what really happened: set etsy_ai_flag from Etsy's current form [UNVERIFIED wording]; add 'edited by the founder' to any answer only after she has rewritten that part.)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `price_floor` · no price_floor (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "price_floor": 3.00

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `net_per_unit_by_channel` · no per-channel net (gate 18; G2-11); estimate: etsy ≈ $5.11, etsy_offsite_ad_sale ≈ $4.13, site ≈ $5.69

  Offending text:

  > (missing)

  Proposed replacement:

  > "net_per_unit_by_channel": {"etsy": 5.11, "etsy_offsite_ad_sale": 4.13, "site": 5.69}  (estimates, UNVERIFIED fees; replace with calculator figures)

- **FAIL · AlphaPlay LLC owner line** · field `(record)` · no AlphaPlay LLC owner line anywhere in the record

  Offending text:

  > (missing)

  Proposed replacement:

  > "owner_line": "© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC."

- **FAIL · Readability: FK grade ≤7** · field `long_description` · sentence grade 26.8, 61 words (whole description grade 9.2)

  Offending text:

  > You also get 36 bonus cards (18 summer, 18 rainy-day), 30 blank “your idea” cards, card backs in six colors, 18 box dividers, jar labels in four colorways (including calm, medium and wiggly jars), a velcro-ready Play Menu choice board, a weekly play planner with Monday and Sunday starts, a Play Jar Star certificate, a card index and a quick-answers page.

  Proposed replacement:

  > You also get 36 bonus cards: 18 for summer and 18 for rainy days. There are 30 blank cards for your own ideas and card backs in six colors. Add 18 box dividers, jar labels, a Play Menu board and a weekly planner. A certificate, a card index and a quick-answers page finish the set.

- **FAIL · Readability: FK grade ≤7** · field `long_description` · sentence grade 13.8, 30 words (whole description grade 9.2)

  Offending text:

  > The download includes US Letter and A4 files, a fillable editable PDF for typing your own cards, a double-sided cards file, and a PNG template set for design apps.

  Proposed replacement:

  > You get US Letter and A4 files. A fillable PDF lets you type your own cards. There is also a double-sided cards file and a PNG set for design apps.

- **FAIL · First 160 chars say what it is, the age range and the format** · field `long_description[:160]` · missing: age

  Offending text:

  > “I’m bored!” is where play begins. These 150 printable play cards turn that moment into something to do together, using things you already have: pots, socks, bo

  Proposed replacement:

  > 150 printable play cards for ages 1–12, sorted by age and energy, in a PDF you print at home. “I’m bored!” is where play begins.


### course-screen-reset
<a id="l-course-screen-reset"></a>

File: `products/course-screen-reset/listing.json` · Price: $27.00 · Channels tested: site (now), kdp (now), social (now) · Excluded by the listing: etsy, tpt

| Check | Result | What was found |
|---|---|---|
| Etsy title: ≤140, no repeated words, % : & + once | **–** | not listed on Etsy |
| Etsy tags: exactly 13, each ≤20 | **–** | not listed on Etsy |
| KDP title + subtitle ≤200 | **PASS** | 123 chars (title + subtitle) |
| KDP keywords: 7 boxes, each ≤50 | **PASS** | 7 boxes, longest 31 chars |
| KDP description ≤4000 | **PASS** | 1177 chars |
| Shopify SEO title ≤70, meta ≤160 | **PASS** | title 55 / meta 152 chars |
| TpT title ≤80 | **–** | not on TpT (explicitly excluded) |
| Merch on Demand title ≤60, bullets ≤256, description ≤2000 | **–** | not on Merch on Demand |
| BRAND.md listing.json schema and limits | **PASS** | 0 required field(s) missing; long_description 212 words |
| No health / developmental-outcome / safety / fear claims | **WARN** | 1 hit(s) in public fields |
| No named school, district, company, show, creator, device or EdTech | **PASS** | 0 fail hit(s); neutral tool/channel names (allowed): Acrobat Reader, Adobe |
| No autism / diagnosis terms or targeting | **WARN** | 0 public hit(s) |
| Honest pricing (16 CFR 233.1) + PRICING.md rules | **WARN** | price $27.00 |
| ai_disclosure filled for every channel; no 'human-made' claim | **FAIL** | channels: site(now), kdp(now), social(now) |
| price_floor + net_per_unit_by_channel present and met | **FAIL** | no floor; est. site_mor ≈ $23.80 at 5% + $0.50 *(verifier: ≈ $22.45 at the plan's Gumroad rate of 10% + $0.50)* |
| AlphaPlay LLC owner line | **PASS** | found in compliance_notes |
| No home address, phone number or personal email | **PASS** | 0 hit(s) in all fields |
| No reply-time promise | **PASS** | 0 hit(s) |
| No coaching / calls / podcast / live service | **PASS** | 0 hit(s); 2 negated mention(s) OK (e.g. "No videos or calls.") |
| Etsy/TpT copy: no URL, QR or other-store pointer (gate 16) | **–** | no Etsy/TpT channel |
| Readability: FK grade ≤7 | **FAIL** | long_description FK 8.8; all parent-facing text FK 9.5 |
| First 160 chars say what it is, the age range and the format | **PASS** | has what, age, format; short_description lacks one or more |

**Failures and warnings, with the exact text and a proposed replacement**

- **WARN · No health / developmental-outcome / safety / fear claims** · field `long_description` · 'Fewer screen battles': soft behavior-outcome promise

  Offending text:

  > Fewer screen battles, more play and talk.

  Proposed replacement:

  > More play and talk, with screens in a steady spot.

- **WARN · No autism / diagnosis terms or targeting** · field `compliance_notes` · 1 mention(s) in internal notes; a whole-file CI banned-word check (G2-04) would trip

  Offending text:

  > autism

  Proposed replacement:

  > Say 'diagnosis or condition wording' in compliance notes instead of naming the condition.

- **WARN · Honest pricing (16 CFR 233.1) + PRICING.md rules** · field `bundle.compare_parts_usd` · sum-of-parts comparison: allowed only as '$X, or $Y bought separately' and only while each part really sells at that price; no display rule. A field named compare_at* may be mapped to Shopify's compare-at price, which shows a strikethrough.

  Offending text:

  > bundle.compare_parts_usd = 54.49 vs bundle price 49.0

  Proposed replacement:

  > Rename to "separately_usd": 54.49 and add "price_display_rule": "Show as '$49, or $54.49 bought separately'. Never a crossed-out or 'was' price. Re-check the sum whenever a part's price changes."

- **FAIL · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure` · blank for every channel (gate 17; G2-08)

  Offending text:

  > (missing)

  Proposed replacement:

  > "ai_disclosure": {"kdp_ai_text": "AI-generated", "kdp_ai_images": "AI-generated", "kdp_ai_translation": "none", "site": "product page line: 'Illustrations and text are made with AI assistance.' (say 'edited by the founder' only after she has)", "social_ai_label": "apply each platform's AI label to posts that use these images"}  (Answers must match what really happened: set etsy_ai_flag from Etsy's current form [UNVERIFIED wording]; add 'edited by the founder' to any answer only after she has rewritten that part.)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `price_floor` · no price_floor (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "price_floor": 3.00

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `net_per_unit_by_channel` · no per-channel net (gate 18; G2-11); estimate: site_mor ≈ $23.80 *(verifier: ≈ $22.45 at Gumroad's 10% + $0.50)*

  Offending text:

  > (missing)

  Proposed replacement:

  > "net_per_unit_by_channel": {"site_mor": 23.80, "kdp_paperback": 6.10}  (MoR estimate at 5% + $0.50 and a 5% refund allowance, UNVERIFIED; KDP from price_notes: 60% of $14.99 minus $2.30–$2.90 print [VERIFY]). Bundle: also record the bundle net after the 10% discount.

  *(verifier)* The commerce plan uses Gumroad at 10% + $0.50 (commerce/storefront-setup-guide.md §13; BUSINESS-PLAN `mor_pct` 0.10). At that rate, `site_mor` ≈ **22.45** and the $49 bundle ≈ **41.15**, not 23.80 and 43.60. Use 22.45 unless a 5% + $0.50 provider is chosen. Both figures clear the $3.00 floor, so the result does not change.

- **FAIL · Readability: FK grade ≤7** · field `long_description` · sentence grade 21.8, 56 words (whole description grade 8.8)

  Offending text:

  > Every morning for 30 days you get one short email: a lesson you can read in about three minutes, one easy play made from things you already have, and plain words for one tricky moment, like the show that won't end, 'I'm bored', the hour before dinner, waiting rooms, car rides or 'everyone else gets to'.

  Proposed replacement:

  > For 30 days, one short email comes each morning. It has a lesson you can read in about three minutes and one easy play. It also gives you plain words for one tricky moment, like a show that won't end, 'I'm bored' or a long car ride.

- **FAIL · Readability: FK grade ≤7** · field `long_description` · sentence grade 19.5, 45 words (whole description grade 8.8)

  Offending text:

  > Your 89-page workbook comes in Color and Low-ink, in US Letter and A4, with type-in pages that work in free Adobe Acrobat Reader: planning pages, pre-filled and blank trackers, weekly check-ins, a scripts bank, a family plan and a certificate for Day 30.

  Proposed replacement:

  > Your 89-page workbook comes in Color and Low-ink, in US Letter and A4. You can type in it with free Adobe Acrobat Reader. Inside are plans, trackers, weekly check-ins, a bank of scripts, a family plan and a Day 30 certificate.


### first-phone-plan
<a id="l-first-phone-plan"></a>

File: `products/first-phone-plan/listing.json` · Price: $6.50 · Channels tested: etsy (now), site (now), kdp (later), social (now) · Excluded by the listing: tpt

| Check | Result | What was found |
|---|---|---|
| Etsy title: ≤140, no repeated words, % : & + once | **FAIL** | 129 chars, 17 words |
| Etsy tags: exactly 13, each ≤20 | **PASS** | 13 tags, longest 20 chars |
| KDP title + subtitle ≤200 | **PASS** | 100 chars (amazon_title) |
| KDP keywords: 7 boxes, each ≤50 | **PASS** | 7 boxes, longest 25 chars |
| KDP description ≤4000 | **PASS** | 1407 chars |
| Shopify SEO title ≤70, meta ≤160 | **PASS** | title 57 / meta 152 chars |
| TpT title ≤80 | **–** | not on TpT (explicitly excluded) |
| Merch on Demand title ≤60, bullets ≤256, description ≤2000 | **–** | not on Merch on Demand |
| BRAND.md listing.json schema and limits | **PASS** | 0 required field(s) missing; long_description 247 words |
| No health / developmental-outcome / safety / fear claims | **PASS** | 0 hit(s) in public fields |
| No named school, district, company, show, creator, device or EdTech | **PASS** | 0 fail hit(s) |
| No autism / diagnosis terms or targeting | **WARN** | 0 public hit(s) |
| Honest pricing (16 CFR 233.1) + PRICING.md rules | **PASS** | price $6.50 |
| ai_disclosure filled for every channel; no 'human-made' claim | **FAIL** | channels: etsy(now), site(now), kdp(later), social(now) |
| price_floor + net_per_unit_by_channel present and met | **FAIL** | no floor; est. etsy ≈ $5.11, etsy_offsite_ad_sale ≈ $4.13, site ≈ $5.69 |
| AlphaPlay LLC owner line | **PASS** | found in compliance_notes |
| No home address, phone number or personal email | **PASS** | 0 hit(s) in all fields |
| No reply-time promise | **PASS** | 0 hit(s) |
| No coaching / calls / podcast / live service | **PASS** | 0 hit(s) |
| Etsy/TpT copy: no URL, QR or other-store pointer (gate 16) | **PASS** | 0 hit(s) in shared marketplace fields |
| Readability: FK grade ≤7 | **PASS** | long_description FK 7.0; all parent-facing text FK 7.5 |
| First 160 chars say what it is, the age range and the format | **FAIL** | missing age; short_description has all three |

**Failures and warnings, with the exact text and a proposed replacement**

- **FAIL · Etsy title: ≤140, no repeated words, % : & + once** · field `etsy_title` · repeated words (title stuffing): phone ×3

  Offending text:

  > First Phone Agreement Kids 9-12, 30 Day Phone-Free Afternoons Challenge, Editable Phone Rules, Readiness Checklist, Printable PDF

  Proposed replacement:

  > First Phone Agreement for Kids 9-12, Editable Tween Tech Rules, Readiness Checklist, 30 Day Unplugged Afternoons Challenge, Printable PDF

- **WARN · No autism / diagnosis terms or targeting** · field `compliance_notes` · 3 mention(s) in internal notes; a whole-file CI banned-word check (G2-04) would trip

  Offending text:

  > ADHD, Autism, autism

  Proposed replacement:

  > Say 'diagnosis or condition wording' in compliance notes instead of naming the condition.

- **FAIL · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure` · blank for every channel (gate 17; G2-08)

  Offending text:

  > (missing)

  Proposed replacement:

  > "ai_disclosure": {"etsy_attribution": "Designed by Play Before Pixels", "etsy_ai_flag": true, "kdp_ai_text": "AI-generated", "kdp_ai_images": "AI-generated", "kdp_ai_translation": "none", "site": "product page line: 'Illustrations and text are made with AI assistance.' (say 'edited by the founder' only after she has)", "social_ai_label": "apply each platform's AI label to posts that use these images"}  (Answers must match what really happened: set etsy_ai_flag from Etsy's current form [UNVERIFIED wording]; add 'edited by the founder' to any answer only after she has rewritten that part.)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `price_floor` · no price_floor (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "price_floor": 3.00

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `net_per_unit_by_channel` · no per-channel net (gate 18; G2-11); estimate: etsy ≈ $5.11, etsy_offsite_ad_sale ≈ $4.13, site ≈ $5.69

  Offending text:

  > (missing)

  Proposed replacement:

  > "net_per_unit_by_channel": {"etsy": 5.11, "etsy_offsite_ad_sale": 4.13, "site": 5.69}  (estimates, UNVERIFIED fees; replace with calculator figures)

- **FAIL · First 160 chars say what it is, the age range and the format** · field `long_description[:160]` · missing: age

  Offending text:

  > A first phone is a big step toward independence. This printable kit helps you take it together, calmly, with plenty of play along the way. Start with “Are we re

  Proposed replacement:

  > A printable first phone kit for kids aged 9–12, in fillable PDFs. Write a warm agreement together. Then use the readiness checklist and 30 phone-free afternoons.


### guide-100-plays
<a id="l-guide-100-plays"></a>

File: `products/guide-100-plays/listing.json` · Price: $16.99 · Channels tested: kdp (now), etsy (now), site (now), ingramspark (later), social (now)

| Check | Result | What was found |
|---|---|---|
| Etsy title: ≤140, no repeated words, % : & + once | **FAIL** | 125 chars, 22 words |
| Etsy tags: exactly 13, each ≤20 | **FAIL** | no etsy_tags |
| KDP title + subtitle ≤200 | **PASS** | 123 chars (amazon_title) |
| KDP keywords: 7 boxes, each ≤50 | **PASS** | 7 boxes, longest 35 chars |
| KDP description ≤4000 | **PASS** | 1354 chars |
| Shopify SEO title ≤70, meta ≤160 | **PASS** | title 55 / meta 145 chars |
| TpT title ≤80 | **–** | not on TpT |
| Merch on Demand title ≤60, bullets ≤256, description ≤2000 | **–** | not on Merch on Demand |
| BRAND.md listing.json schema and limits | **FAIL** | 1 required field(s) missing; long_description 252 words *(verifier: 246 by a normal word count; the script splits "0–1", "100-play" and "A4" in two)* |
| No health / developmental-outcome / safety / fear claims | **PASS** | 0 hit(s) in public fields |
| No named school, district, company, show, creator, device or EdTech | **PASS** | 0 fail hit(s) |
| No autism / diagnosis terms or targeting | **PASS** | 0 public hit(s) |
| Honest pricing (16 CFR 233.1) + PRICING.md rules | **FAIL** | price $16.99 |
| ai_disclosure filled for every channel; no 'human-made' claim | **FAIL** | channels: kdp(now), etsy(now), site(now), ingramspark(later), social(now) |
| price_floor + net_per_unit_by_channel present and met | **FAIL** | no floor; est. etsy ≈ $8.09, etsy_offsite_ad_sale ≈ $6.59, site ≈ $8.90 |
| AlphaPlay LLC owner line | **PASS** | found in compliance_notes |
| No home address, phone number or personal email | **PASS** | 0 hit(s) in all fields |
| No reply-time promise | **PASS** | 0 hit(s) |
| No coaching / calls / podcast / live service | **PASS** | 0 hit(s) |
| Etsy/TpT copy: no URL, QR or other-store pointer (gate 16) | **PASS** | 0 hit(s) in shared marketplace fields |
| Readability: FK grade ≤7 | **FAIL** | long_description FK 8.5; all parent-facing text FK 8.8 |
| First 160 chars say what it is, the age range and the format | **FAIL** | missing age, format; short_description lacks one or more |

**Failures and warnings, with the exact text and a proposed replacement**

- **FAIL · Etsy title: ≤140, no repeated words, % : & + once** · field `etsy_title` · repeated words (title stuffing): play/plays ×2, age/ages ×2

  Offending text:

  > 100 Screen-Free Plays for Ages 0-5, Printable Toddler Activity Book PDF, Baby and Preschool Play Ideas by Age, US Letter + A4

  Proposed replacement:

  > 100 Screen-Free Plays for Ages 0-5, Printable Toddler Activity Book PDF, Baby and Preschool Ideas Sorted by Stage, US Letter + A4

- **FAIL · Etsy tags: exactly 13, each ≤20** · field `etsy_tags` · Etsy listing has no etsy_tags; `keywords` holds 7 long Amazon-style phrases

  Offending text:

  > (missing)

  Proposed replacement:

  > "etsy_tags": ["screen free play", "toddler activities", "baby play ideas", "preschool at home", "toddler activity pdf", "one year old play", "play ideas by age", "rainy day activities", "indoor toddler play", "parent child play", "baby activity book", "low prep activities", "toddler printable"]

- **FAIL · BRAND.md listing.json schema and limits** · field `(record)` · required by BRAND.md (deliverables, repeat-purchase and Amazon-edition rules)

  Offending text:

  > amazon_route

  Proposed replacement:

  > "amazon_route": "kdp-paperback"

- **~~WARN~~ withdrawn by the verifier · BRAND.md listing.json schema and limits** · field `long_description` · BRAND.md asks for 120–250 words. A normal word count (words split at spaces) gives 246, within the limit. The 252 comes from the script counting "0–1, 1–2, 2–3, 3–5", "100-play" and "A4" as two words each. No change needed.

  Offending text:

  > (252 words)

  Proposed replacement:

  > Cut repeated inventory lists (the bullets already carry them).

- **FAIL · Honest pricing (16 CFR 233.1) + PRICING.md rules** · field `price_notes` · pricing plan uses a standing/usual sale off a list price: a permanent anchor (16 CFR 233.1; BRAND 'Honest pricing'; G2-11)

  Offending text:

  > PDF: list at $14.99 and run the usual Etsy sale at about 33% off so it sells at $9.99 (DEMAND-CHECK section 4, rule 2); on our own site sell at $9.99 flat.

  Proposed replacement:

  > PDF: $9.99 everyday price on Etsy and on our own site, shown plainly. No list price and no standing sale. Use only a real, time-limited promotion (for example launch week), with its start and end dates recorded in listing.json.

- **FAIL · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure` · blank for every channel (gate 17; G2-08)

  Offending text:

  > (missing)

  Proposed replacement:

  > "ai_disclosure": {"etsy_attribution": "Designed by Play Before Pixels", "etsy_ai_flag": true, "kdp_ai_text": "AI-generated", "kdp_ai_images": "AI-generated", "kdp_ai_translation": "none", "ingramspark": "AI-generated images and draft text disclosed on the title setup", "site": "product page line: 'Illustrations and text are made with AI assistance.' (say 'edited by the founder' only after she has)", "social_ai_label": "apply each platform's AI label to posts that use these images"}  (Answers must match what really happened: set etsy_ai_flag from Etsy's current form [UNVERIFIED wording]; add 'edited by the founder' to any answer only after she has rewritten that part.)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `price_floor` · no price_floor (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "price_floor": 3.00  (digital; the KDP paperback must also keep 30% margin, about $5.10 on $16.99)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `net_per_unit_by_channel` · no per-channel net (gate 18; G2-11); estimate: etsy ≈ $8.09, etsy_offsite_ad_sale ≈ $6.59, site ≈ $8.90

  Offending text:

  > (missing)

  Proposed replacement:

  > "net_per_unit_by_channel": {"kdp": 7.89, "etsy_pdf": 8.09, "etsy_pdf_offsite_ad_sale": 6.59, "site_pdf": 8.90}  (KDP from price_notes [VERIFY]; PDF figures are estimates at $9.99 with UNVERIFIED fees and a 5% refund allowance)

- **FAIL · Readability: FK grade ≤7** · field `long_description` · sentence grade 17.1, 40 words (whole description grade 8.5)

  Offending text:

  > You'll also find a Safety first page, a Quick finder for bath time, rainy days, kitchen time, car rides and wind-down, a sample screen-free day, low-energy plays for tired grown-ups, and friendly, guilt-free ideas for when screens are on anyway.

  Proposed replacement:

  > You'll also find a Safety first page and a Quick finder for bath time, rainy days, kitchen time and car rides. There is a sample screen-free day and low-energy plays for tired grown-ups. And there are guilt-free ideas for when screens are on anyway.

- **FAIL · Readability: FK grade ≤7** · field `long_description` · sentence grade 13.5, 37 words (whole description grade 8.5)

  Offending text:

  > Every play has the same easy parts: what you need, prep and mess icons, where it works best, simple steps, a "Grow it" idea for next time, a "talk while you play" line and a safety note.

  Proposed replacement:

  > Every play has the same easy parts. You see what you need, prep and mess icons, and simple steps. Each play also has a "Grow it" idea, a "talk while you play" line and a safety note.

- **FAIL · First 160 chars say what it is, the age range and the format** · field `long_description[:160]` · missing: age, format

  Offending text:

  > A cup, a box, a sock, or nothing at all. 100 Screen-Free Plays gives you a quick play for every age and every moment of an ordinary day, from first smiles to "a

  Proposed replacement:

  > 100 Screen-Free Plays is a play book for ages 0–5, in paperback or as a printable PDF. A cup, a box, a sock, or nothing at all: each play uses what you have.


### merch-core-logo-tee
<a id="l-merch-core-logo-tee-0"></a>

File: `products/merch-core/listing.json` (item 0) · Status: `ready-to-set-up (design 1 of max 3; slogan slots 2 and 3 blocked until brand/ORIGINALITY.md clears a slogan)` · Price: $27.00 · Channels tested: site (now), etsy (now), mod (now), social (now)

| Check | Result | What was found |
|---|---|---|
| Etsy title: ≤140, no repeated words, % : & + once | **FAIL** | 124 chars, 22 words |
| Etsy tags: exactly 13, each ≤20 | **PASS** | 13 tags, longest 19 chars |
| KDP title + subtitle ≤200 | **–** | no KDP edition |
| KDP keywords: 7 boxes, each ≤50 | **–** | no KDP edition |
| KDP description ≤4000 | **–** | no KDP edition |
| Shopify SEO title ≤70, meta ≤160 | **PASS** | title 50 / meta 148 chars |
| TpT title ≤80 | **–** | not on TpT |
| Merch on Demand title ≤60, bullets ≤256, description ≤2000 | **PASS** | title 27, description 1027 chars; MoD uses only 2 bullets |
| BRAND.md listing.json schema and limits | **PASS** | 0 required field(s) missing; long_description 198 words |
| No health / developmental-outcome / safety / fear claims | **PASS** | 0 hit(s) in public fields |
| No named school, district, company, show, creator, device or EdTech | **PASS** | 0 fail hit(s); neutral tool/channel names (allowed): Amazon |
| No autism / diagnosis terms or targeting | **PASS** | 0 public hit(s) |
| Honest pricing (16 CFR 233.1) + PRICING.md rules | **PASS** | price $27.00 |
| ai_disclosure filled for every channel; no 'human-made' claim | **FAIL** | channels: site(now), etsy(now), mod(now), social(now) |
| price_floor + net_per_unit_by_channel present and met | **FAIL** | no floor |
| AlphaPlay LLC owner line | **PASS** | found in compliance_notes |
| No home address, phone number or personal email | **PASS** | 0 hit(s) in all fields |
| No reply-time promise | **PASS** | 0 hit(s) |
| No coaching / calls / podcast / live service | **PASS** | 0 hit(s) |
| Etsy/TpT copy: no URL, QR or other-store pointer (gate 16) | **PASS** | 0 hit(s) in shared marketplace fields |
| Readability: FK grade ≤7 | **PASS** | long_description FK 4.5; all parent-facing text FK 4.9 |
| First 160 chars say what it is, the age range and the format | **PASS** | has what, age, format; short_description has all three |

**Failures and warnings, with the exact text and a proposed replacement**

- **FAIL · Etsy title: ≤140, no repeated words, % : & + once** · field `etsy_title` · repeated words (title stuffing): shirt ×2

  Offending text:

  > Play Before Pixels Logo Tee, Adult Unisex T-Shirt in 4 Colors, Minimalist Parent Shirt, Gift for Mom or Dad, Print on Demand

  Proposed replacement:

  > Play Before Pixels Logo T-Shirt, Adult Unisex Tee in 4 Colors, Minimalist Parent Gift for Mom or Dad, Print on Demand

- **FAIL · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure` · blank for every channel (gate 17; G2-08)

  Offending text:

  > (missing)

  Proposed replacement:

  > "ai_disclosure": {"etsy_attribution": "Designed by Play Before Pixels", "etsy_ai_flag": true, "merch_on_demand": "logo artwork: answer Amazon's AI question truthfully", "site": "product page line: 'Illustrations and text are made with AI assistance.' (say 'edited by the founder' only after she has)", "social_ai_label": "apply each platform's AI label to posts that use these images"}  (Answers must match what really happened: set etsy_ai_flag from Etsy's current form [UNVERIFIED wording]; add 'edited by the founder' to any answer only after she has rewritten that part.)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `price_floor` · no price_floor (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "price_floor": 8.10  (30% POD margin on $27; price_notes already says raise the price if a tee keeps under about $8)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `net_per_unit_by_channel` · no per-channel net (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "net_per_unit_by_channel": {"site": null, "etsy": null, "merch_on_demand": null}  (fill with price minus the print partner's blank + print + inside label + shipping, minus platform fees; Merch on Demand pays a set royalty per sale [VERIFY])


### merch-core-tote
<a id="l-merch-core-tote-1"></a>

File: `products/merch-core/listing.json` (item 1) · Status: `bundle-add-on-only (never listed on its own, per DEMAND-CHECK.md)` · Price: $22.00 · Channels tested: site (now), social (now) · Excluded by the listing: etsy, kdp

| Check | Result | What was found |
|---|---|---|
| Etsy title: ≤140, no repeated words, % : & + once | **–** | not listed on Etsy |
| Etsy tags: exactly 13, each ≤20 | **–** | not listed on Etsy |
| KDP title + subtitle ≤200 | **–** | no KDP edition |
| KDP keywords: 7 boxes, each ≤50 | **–** | no KDP edition |
| KDP description ≤4000 | **–** | no KDP edition |
| Shopify SEO title ≤70, meta ≤160 | **PASS** | title 49 / meta 146 chars |
| TpT title ≤80 | **–** | not on TpT |
| Merch on Demand title ≤60, bullets ≤256, description ≤2000 | **–** | not on Merch on Demand |
| BRAND.md listing.json schema and limits | **PASS** | 0 required field(s) missing; long_description 146 words |
| No health / developmental-outcome / safety / fear claims | **PASS** | 0 hit(s) in public fields |
| No named school, district, company, show, creator, device or EdTech | **PASS** | 0 fail hit(s) |
| No autism / diagnosis terms or targeting | **PASS** | 0 public hit(s) |
| Honest pricing (16 CFR 233.1) + PRICING.md rules | **PASS** | price $22.00 |
| ai_disclosure filled for every channel; no 'human-made' claim | **FAIL** | channels: site(now), social(now) |
| price_floor + net_per_unit_by_channel present and met | **FAIL** | no floor |
| AlphaPlay LLC owner line | **PASS** | found in compliance_notes |
| No home address, phone number or personal email | **PASS** | 0 hit(s) in all fields |
| No reply-time promise | **PASS** | 0 hit(s) |
| No coaching / calls / podcast / live service | **PASS** | 0 hit(s) |
| Etsy/TpT copy: no URL, QR or other-store pointer (gate 16) | **–** | no Etsy/TpT channel |
| Readability: FK grade ≤7 | **PASS** | long_description FK 6.0; all parent-facing text FK 5.6 |
| First 160 chars say what it is, the age range and the format | **WARN** | missing age; short_description lacks one or more *(verifier: FAIL→WARN. An adult canvas tote has no child age range, and it is sold only inside bundles.)* |

**Failures and warnings, with the exact text and a proposed replacement**

- **FAIL · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure` · blank for every channel (gate 17; G2-08)

  Offending text:

  > (missing)

  Proposed replacement:

  > "ai_disclosure": {"site": "product page line: 'Illustrations and text are made with AI assistance.' (say 'edited by the founder' only after she has)", "social_ai_label": "apply each platform's AI label to posts that use these images"}  (Answers must match what really happened: set etsy_ai_flag from Etsy's current form [UNVERIFIED wording]; add 'edited by the founder' to any answer only after she has rewritten that part.)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `price_floor` · no price_floor (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "price_floor": 6.60  (30% POD margin on the $22 add-on value)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `net_per_unit_by_channel` · no per-channel net (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "net_per_unit_by_channel": {"site_bundle": null}  (fill with the tote's share of the bundle price minus partner cost and payment fees)

- **WARN · First 160 chars say what it is, the age range and the format** · field `long_description[:160]` · missing: age *(verifier: FAIL→WARN. The age-range rule does not fit an adult accessory; the logo tee passed only because its copy says "grown-ups". Adding "for grown-ups" is still a good edit.)*

  Offending text:

  > Carry the books, the snacks and the crayons in a tote that says where your priorities are. The Play Before Pixels logo tote carries our stacked logo: the P of P

  Proposed replacement:

  > The Play Before Pixels logo tote is a canvas bag for grown-ups, printed to order and sold only inside our gift bundles. Carry the books, the snacks and the crayons.


### picture-laps-not-apps
<a id="l-picture-laps-not-apps"></a>

File: `products/picture-laps-not-apps/listing.json` · Price: $34.99 · Channels tested: site (now), etsy (now), social (now) · Excluded by the listing: ingramspark, kdp

| Check | Result | What was found |
|---|---|---|
| Etsy title: ≤140, no repeated words, % : & + once | **PASS** | 109 chars, 18 words (no etsy_title; tested `marketplace_title`) |
| Etsy tags: exactly 13, each ≤20 | **PASS** | 13 tags, longest 19 chars |
| KDP title + subtitle ≤200 | **–** | no KDP edition |
| KDP keywords: 7 boxes, each ≤50 | **–** | no KDP edition |
| KDP description ≤4000 | **–** | no KDP edition |
| Shopify SEO title ≤70, meta ≤160 | **PASS** | title 55 / meta 142 chars |
| TpT title ≤80 | **–** | not on TpT |
| Merch on Demand title ≤60, bullets ≤256, description ≤2000 | **–** | not on Merch on Demand |
| BRAND.md listing.json schema and limits | **PASS** | 0 required field(s) missing; long_description 245 words |
| No health / developmental-outcome / safety / fear claims | **PASS** | 0 hit(s) in public fields |
| No named school, district, company, show, creator, device or EdTech | **WARN** | 0 fail hit(s); neutral tool/channel names (allowed): Etsy |
| No autism / diagnosis terms or targeting | **PASS** | 0 public hit(s) |
| Honest pricing (16 CFR 233.1) + PRICING.md rules | **PASS** | price $34.99 |
| ai_disclosure filled for every channel; no 'human-made' claim | **FAIL** | channels: site(now), etsy(now), social(now) |
| price_floor + net_per_unit_by_channel present and met | **FAIL** | no floor |
| AlphaPlay LLC owner line | **PASS** | found in compliance_notes |
| No home address, phone number or personal email | **PASS** | 0 hit(s) in all fields |
| No reply-time promise | **WARN** | 1 hit(s) |
| No coaching / calls / podcast / live service | **PASS** | 0 hit(s) |
| Etsy/TpT copy: no URL, QR or other-store pointer (gate 16) | **PASS** | 0 hit(s) in shared marketplace fields |
| Readability: FK grade ≤7 | **FAIL** | long_description FK 8.6; all parent-facing text FK 6.3 |
| First 160 chars say what it is, the age range and the format | **FAIL** | missing age, format; short_description lacks one or more |

**Failures and warnings, with the exact text and a proposed replacement**

- **WARN · No named school, district, company, show, creator, device or EdTech** · field `compliance_notes` · 'Rockville': excluded organization / local angle (internal field)

  Offending text:

  > No street address is printed: the old Rockville Pike mailbox is retired and the founder’s home address must never appear (legal/ENTITY.md).

  Proposed replacement:

  > Drop the place name from internal notes (for example 'the old commercial mailbox is retired'), so a whole-file CI word check stays clean and no local angle leaks into a published field.

- **FAIL · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure` · blank for every channel (gate 17; G2-08)

  Offending text:

  > (missing)

  Proposed replacement:

  > "ai_disclosure": {"etsy_attribution": "Designed by Play Before Pixels", "etsy_ai_flag": true, "site": "product page line: 'Illustrations and text are made with AI assistance.' (say 'edited by the founder' only after she has)", "social_ai_label": "apply each platform's AI label to posts that use these images"}  (Answers must match what really happened: set etsy_ai_flag from Etsy's current form [UNVERIFIED wording]; add 'edited by the founder' to any answer only after she has rewritten that part.)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `price_floor` · no price_floor (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "price_floor": 10.50  (30% margin on the $34.99 hardcover; $7.50 on the $24.99 softcover)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `net_per_unit_by_channel` · no per-channel net (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "net_per_unit_by_channel": {"site_hardcover": null, "site_softcover": null, "etsy_hardcover": null, "etsy_softcover": null}  (price minus the printer's unit + shipping cost minus Shopify or Etsy fees; fill from the printer quote before listing)

- **WARN · No reply-time promise** · field `faq[6].a` · 'email a correction within 2 hours': action window that needs a person to read email fast (weekly batch)

  Offending text:

  > Your name prints exactly as typed, so check the spelling; you can email a correction within 2 hours of ordering.

  Proposed replacement:

  > Your name prints exactly as typed, so check the spelling on the preview before you pay. Books go to print automatically, so we can't promise changes after checkout.  (Also drop the '2-hour window for spelling fixes' from faq[4].a unless a self-serve edit link exists: a 2-hour window needs someone reading email within 2 hours, and the business runs a weekly batch.)

- **FAIL · Readability: FK grade ≤7** · field `long_description` · sentence grade 14.6, 42 words (whole description grade 8.6)

  Offending text:

  > Their name is woven into six of the rhymes: Dad calls them up to the armchair, Grandma saves them a seat, a big brother gives them a turn to sing “QUACK!”, and a sleepy “Goodnight” comes at the end of the day.

  Proposed replacement:

  > Their name is in six of the rhymes. Dad calls them up to the armchair, and Grandma saves them a seat. A big brother gives them a turn to sing “QUACK!” At the end of the day comes a sleepy “Goodnight.”

- **FAIL · Readability: FK grade ≤7** · field `long_description` · sentence grade 13.1, 32 words (whole description grade 8.6)

  Offending text:

  > At the back you will find 5 simple lap games with safety notes, a “Books before screens” family reading pledge to sign together, and a keepsake page for your child’s favorite laps.

  Proposed replacement:

  > At the back are 5 simple lap games with safety notes. There is a “Books before screens” pledge to sign together and a keepsake page for your child’s favorite laps.

- **FAIL · First 160 chars say what it is, the age range and the format** · field `long_description[:160]` · missing: age, format

  Offending text:

  > Laps Not Apps is a warm, rhyming read-aloud about the best seats in town, made for one child. Their name is woven into six of the rhymes: Dad calls them up to t

  Proposed replacement:

  > Laps Not Apps is a personalized picture book for ages 0–5, printed to order in hardcover or softcover. It is a warm, rhyming read-aloud made for one child.


### picture-more-talk-less-tap
<a id="l-picture-more-talk-less-tap"></a>

File: `products/picture-more-talk-less-tap/listing.json` · Status: `held-pending-counsel` · Price: $6.99 · Channels tested: direct_b2b (now), site (now), etsy (now), tpt (now), social (now)

| Check | Result | What was found |
|---|---|---|
| Etsy title: ≤140, no repeated words, % : & + once | **PASS** | 29 chars, 5 words (no etsy_title; tested `title`) |
| Etsy tags: exactly 13, each ≤20 | **FAIL** | no etsy_tags |
| KDP title + subtitle ≤200 | **–** | no KDP edition |
| KDP keywords: 7 boxes, each ≤50 | **–** | no KDP edition |
| KDP description ≤4000 | **–** | no KDP edition |
| Shopify SEO title ≤70, meta ≤160 | **PASS** | title 56 / meta 149 chars |
| TpT title ≤80 | **PASS** | 29 chars |
| Merch on Demand title ≤60, bullets ≤256, description ≤2000 | **–** | not on Merch on Demand |
| BRAND.md listing.json schema and limits | **PASS** | 0 required field(s) missing; long_description 234 words |
| No health / developmental-outcome / safety / fear claims | **WARN** | 1 hit(s) in public fields |
| No named school, district, company, show, creator, device or EdTech | **PASS** | 0 fail hit(s); neutral tool/channel names (allowed): Amazon, Etsy, Teachers Pay Teachers |
| No autism / diagnosis terms or targeting | **PASS** | 0 public hit(s) |
| Honest pricing (16 CFR 233.1) + PRICING.md rules | **PASS** | price $6.99 |
| ai_disclosure filled for every channel; no 'human-made' claim | **FAIL** | channels: site(now), etsy(now), tpt(now), social(now) |
| price_floor + net_per_unit_by_channel present and met | **FAIL** | no floor; est. etsy ≈ $5.53, etsy_offsite_ad_sale ≈ $4.48, site ≈ $6.14, tpt ≈ $3.20 |
| AlphaPlay LLC owner line | **PASS** | found in compliance_notes |
| No home address, phone number or personal email | **PASS** | 0 hit(s) in all fields |
| No reply-time promise | **PASS** | 0 hit(s) |
| No coaching / calls / podcast / live service | **PASS** | 0 hit(s) |
| Etsy/TpT copy: no URL, QR or other-store pointer (gate 16) | **PASS** | 0 hit(s) in shared marketplace fields |
| Readability: FK grade ≤7 | **FAIL** | long_description FK 9.2; all parent-facing text FK 7.3 |
| First 160 chars say what it is, the age range and the format | **FAIL** | missing age, format; short_description lacks one or more |

**Failures and warnings, with the exact text and a proposed replacement**

- **FAIL · Etsy tags: exactly 13, each ≤20** · field `etsy_tags` · Etsy listing has no etsy_tags; `keywords` holds 7 long Amazon-style phrases

  Offending text:

  > (missing)

  Proposed replacement:

  > "etsy_tags": ["circle time game", "turn taking game", "preschool talk game", "morning meeting", "pre-k printable", "kindergarten game", "conversation cards", "listening game", "oral language", "classroom game pdf", "speaking activities", "prek circle time", "screen free class"]

- **WARN · No health / developmental-outcome / safety / fear claims** · field `faq[8].a` · 'treats': 'treat' used in another sense: reword so the listing never carries a treatment keyword

  Offending text:

  > The kit treats a talking device as a child's voice, not screen time.

  Proposed replacement:

  > The kit counts a talking device as a child's voice, not screen time.

- **FAIL · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure` · blank for every channel (gate 17; G2-08)

  Offending text:

  > (missing)

  Proposed replacement:

  > "ai_disclosure": {"etsy_attribution": "Designed by Play Before Pixels", "etsy_ai_flag": true, "tpt": "AI-assisted design and illustrations; answer TpT's AI question truthfully", "site": "product page line: 'Illustrations and text are made with AI assistance.' (say 'edited by the founder' only after she has)", "social_ai_label": "apply each platform's AI label to posts that use these images"}  (Answers must match what really happened: set etsy_ai_flag from Etsy's current form [UNVERIFIED wording]; add 'edited by the founder' to any answer only after she has rewritten that part.)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `price_floor` · no price_floor (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "price_floor": 3.00

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `net_per_unit_by_channel` · no per-channel net (gate 18; G2-11); estimate: etsy ≈ $5.53, etsy_offsite_ad_sale ≈ $4.48, site ≈ $6.14, tpt ≈ $3.20

  Offending text:

  > (missing)

  Proposed replacement:

  > "net_per_unit_by_channel": {"site_single": 6.14, "site_site_license": 11.97, "etsy_single": 5.53, "tpt_single": 3.20}  (estimates with UNVERIFIED fees and a 5% refund allowance; TpT at $6.99 is only $0.20 over the floor, so a TpT price test below $6.99 would break it)

- **FAIL · Readability: FK grade ≤7** · field `long_description` · sentence grade 15.7, 32 words (whole description grade 9.2)

  Offending text:

  > A one-page, word-for-word teacher script walks you through your first round, and six more variations follow, each with a starting age, a 2-minute no-setup version, and a make-it-easier and make-it-harder option.

  Proposed replacement:

  > A one-page teacher script walks you through your first round, word for word. Six more versions follow. Each has a starting age, a 2-minute no-setup version, and ways to make it easier or harder.

- **FAIL · Readability: FK grade ≤7** · field `long_description` · sentence grade 13.3, 34 words (whole description grade 9.2)

  Offending text:

  > You get US Letter and A4 PDFs in full color and ink-saver, a 20-slide deck to project, a START HERE page, and a bonus 32-page read-aloud story, More Talk, Less Tap.

  Proposed replacement:

  > You get US Letter and A4 PDFs in full color and ink-saver. There is a 20-slide deck to project and a START HERE page. A bonus 32-page story, More Talk, Less Tap, is ready to read aloud.

- **FAIL · First 160 chars say what it is, the age range and the format** · field `long_description[:160]` · missing: age, format

  Offending text:

  > Seven circle-time talk games, built around one class tower. In Talk Tower, each time a child asks a question, says something back, adds one more idea or shows t

  Proposed replacement:

  > Talk Tower is a printable circle-time game kit for ages 3–7 (preschool to grade 2), with PDFs and slides. Every question, comment and idea adds a block to the class tower.


### picture-tablet-slept
<a id="l-picture-tablet-slept"></a>

File: `products/picture-tablet-slept/listing.json` · Price: $11.99 · Channels tested: kdp (now), ingramspark (now), site (now), direct_b2b (now), social (now)

| Check | Result | What was found |
|---|---|---|
| Etsy title: ≤140, no repeated words, % : & + once | **–** | not listed on Etsy |
| Etsy tags: exactly 13, each ≤20 | **–** | not listed on Etsy |
| KDP title + subtitle ≤200 | **PASS** | 119 chars (title + subtitle) |
| KDP keywords: 7 boxes, each ≤50 | **PASS** | 7 boxes, longest 34 chars |
| KDP description ≤4000 | **PASS** | 1132 chars |
| Shopify SEO title ≤70, meta ≤160 | **PASS** | title 50 / meta 150 chars |
| TpT title ≤80 | **–** | not on TpT |
| Merch on Demand title ≤60, bullets ≤256, description ≤2000 | **–** | not on Merch on Demand |
| BRAND.md listing.json schema and limits | **PASS** | 0 required field(s) missing; long_description 210 words |
| No health / developmental-outcome / safety / fear claims | **PASS** | 0 hit(s) in public fields |
| No named school, district, company, show, creator, device or EdTech | **PASS** | 0 fail hit(s); neutral tool/channel names (allowed): Amazon, IngramSpark, KDP |
| No autism / diagnosis terms or targeting | **PASS** | 0 public hit(s) |
| Honest pricing (16 CFR 233.1) + PRICING.md rules | **WARN** | price $11.99 |
| ai_disclosure filled for every channel; no 'human-made' claim | **FAIL** | channels: kdp(now), ingramspark(now), site(now), social(now) |
| price_floor + net_per_unit_by_channel present and met | **FAIL** | no floor |
| AlphaPlay LLC owner line | **PASS** | found in compliance_notes |
| No home address, phone number or personal email | **PASS** | 0 hit(s) in all fields |
| No reply-time promise | **PASS** | 0 hit(s) |
| No coaching / calls / podcast / live service | **PASS** | 0 hit(s) |
| Etsy/TpT copy: no URL, QR or other-store pointer (gate 16) | **–** | no Etsy/TpT channel |
| Readability: FK grade ≤7 | **PASS** | long_description FK 5.8; all parent-facing text FK 5.9 |
| First 160 chars say what it is, the age range and the format | **FAIL** | missing what, age, format; short_description lacks one or more |

**Failures and warnings, with the exact text and a proposed replacement**

- **WARN · Honest pricing (16 CFR 233.1) + PRICING.md rules** · field `bundle.compare_at_usd` · sum-of-parts comparison: allowed only as '$X, or $Y bought separately' and only while each part really sells at that price; display rule present. A field named compare_at* may be mapped to Shopify's compare-at price, which shows a strikethrough.

  Offending text:

  > bundle.compare_at_usd = 28.98 vs bundle price 24.99

  Proposed replacement:

  > Rename "compare_at_usd" to "separately_usd" (28.98). The display rule is already right; the field name is the risk, because a store sync may map compare_at_* to Shopify's compare-at price, which shows a strikethrough.

- **FAIL · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure` · blank for every channel (gate 17; G2-08)

  Offending text:

  > (missing)

  Proposed replacement:

  > "ai_disclosure": {"kdp_ai_text": "AI-generated", "kdp_ai_images": "AI-generated", "kdp_ai_translation": "none", "ingramspark": "AI-generated images and draft text disclosed on the title setup", "site": "product page line: 'Illustrations and text are made with AI assistance.' (say 'edited by the founder' only after she has)", "social_ai_label": "apply each platform's AI label to posts that use these images"}  (Answers must match what really happened: set etsy_ai_flag from Etsy's current form [UNVERIFIED wording]; add 'edited by the founder' to any answer only after she has rewritten that part.)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `price_floor` · no price_floor (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "price_floor": 3.60  (30% POD margin on the $11.99 paperback)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `net_per_unit_by_channel` · no per-channel net (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "net_per_unit_by_channel": {"kdp": 3.95, "ingramspark_hardcover": null, "site_pod": null}  (KDP from price_notes [VERIFY]; keep Expanded Distribution off at $11.99; hardcover after the IngramSpark calculator)

- **FAIL · First 160 chars say what it is, the age range and the format** · field `long_description[:160]` · missing: what, age, format

  Offending text:

  > Shhh… the tablet is sleeping. So what shall we do? On Saturday morning, Ada zooms downstairs to find the family tablet snoring a teeny-tiny zzz-bip under a purp

  Proposed replacement:

  > The Day the Tablet Slept is a funny 32-page picture book for ages 3–7, in paperback. Shhh… the tablet is sleeping. So what shall we do?


### play-first-family-kit
<a id="l-play-first-family-kit"></a>

File: `products/play-first-family-kit/listing.json` · Price: $11.00 · Channels tested: etsy (now), site (now), kdp (later), social (now) · Excluded by the listing: tpt

| Check | Result | What was found |
|---|---|---|
| Etsy title: ≤140, no repeated words, % : & + once | **FAIL** | 139 chars, 21 words |
| Etsy tags: exactly 13, each ≤20 | **PASS** | 13 tags, longest 20 chars |
| KDP title + subtitle ≤200 | **WARN** | 220 chars (title + subtitle) |
| KDP keywords: 7 boxes, each ≤50 | **PASS** | 7 boxes, longest 26 chars |
| KDP description ≤4000 | **PASS** | 1314 chars |
| Shopify SEO title ≤70, meta ≤160 | **PASS** | title 57 / meta 154 chars |
| TpT title ≤80 | **–** | not on TpT (explicitly excluded) |
| Merch on Demand title ≤60, bullets ≤256, description ≤2000 | **–** | not on Merch on Demand |
| BRAND.md listing.json schema and limits | **PASS** | 0 required field(s) missing; long_description 232 words |
| No health / developmental-outcome / safety / fear claims | **PASS** | 0 hit(s) in public fields |
| No named school, district, company, show, creator, device or EdTech | **PASS** | 0 fail hit(s); neutral tool/channel names (allowed): Acrobat Reader, Adobe, Canva |
| No autism / diagnosis terms or targeting | **WARN** | 0 public hit(s) |
| Honest pricing (16 CFR 233.1) + PRICING.md rules | **PASS** | price $11.00 |
| ai_disclosure filled for every channel; no 'human-made' claim | **WARN** | channels: etsy(now), site(now), kdp(later), social(now) |
| price_floor + net_per_unit_by_channel present and met | **FAIL** | floor 3.0; est. etsy ≈ $8.96, etsy_offsite_ad_sale ≈ $7.30, site ≈ $9.83 |
| AlphaPlay LLC owner line | **FAIL** | not found |
| No home address, phone number or personal email | **PASS** | 0 hit(s) in all fields |
| No reply-time promise | **PASS** | 0 hit(s) |
| No coaching / calls / podcast / live service | **PASS** | 0 hit(s) |
| Etsy/TpT copy: no URL, QR or other-store pointer (gate 16) | **PASS** | 0 hit(s) in shared marketplace fields |
| Readability: FK grade ≤7 | **FAIL** | long_description FK 9.2; all parent-facing text FK 10.4 |
| First 160 chars say what it is, the age range and the format | **FAIL** | missing what, age, format; short_description lacks one or more |

**Failures and warnings, with the exact text and a proposed replacement**

- **FAIL · Etsy title: ≤140, no repeated words, % : & + once** · field `etsy_title` · repeated words (title stuffing): family ×2

  Offending text:

  > Play First Then Screens Family Kit, 10 Printable Tools, Editable Kids Checklist, Chore Chart, Together Tokens, Family Rules, 30 Day Tracker

  Proposed replacement:

  > Play First Then Screens Family Kit, 10 Printable Tools, Editable Kids Checklist, Chore Chart, Together Tokens, House Rules, 30 Day Tracker

- **WARN · KDP title + subtitle ≤200** · field `title + subtitle` · 220 chars > 200; no amazon_title; tested title + ': ' + subtitle (channel planned for later, so WARN)

  Offending text:

  > Play-First Family Kit: 10 Printable Tools for Ages 2–12: Play First, Then Screens: checklists, together tokens, helping jobs, a chore chart, a family play & screen plan and a 30-day tracker. Fillable PDF, US Letter + A4.

  Proposed replacement:

  > "amazon_title": "Play First, Then Screens: A 52-Week Family Checklist Journal for Ages 2–12 (Black-and-White Interior)"  (the edition described in amazon_route_notes)

- **WARN · No autism / diagnosis terms or targeting** · field `compliance_notes` · 3 mention(s) in internal notes; a whole-file CI banned-word check (G2-04) would trip

  Offending text:

  > ADHD, Autism, autism

  Proposed replacement:

  > Say 'diagnosis or condition wording' in compliance notes instead of naming the condition.

- **WARN · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure` · no entry for channel 'site' (now)

  Offending text:

  > {"etsy": "Answer Etsy's creation questions truthfully: designed by Play Before Pixels with AI assistance (layouts, illustrations and draft text generated with C…

  Proposed replacement:

  > "ai_disclosure": {"site": "product page line: 'Illustrations and text are made with AI assistance.' (say 'edited by the founder' only after she has)"}  (Answers must match what really happened: set etsy_ai_flag from Etsy's current form [UNVERIFIED wording]; add 'edited by the founder' to any answer only after she has rewritten that part.)

- **WARN · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure.kdp` · KDP asks separately about AI text, images and translation; translation is not answered (G2-08 names kdp_ai_text / kdp_ai_images / kdp_ai_translation)

  Offending text:

  > If the KDP activity edition is published: disclose AI-generated text and images in KDP's AI questions truthfully.

  Proposed replacement:

  > "kdp_ai_text": "AI-generated, then edited by the founder", "kdp_ai_images": "AI-generated", "kdp_ai_translation": "none"

- **WARN · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure.etsy` · free text instead of the machine-checkable etsy_attribution + etsy_ai_flag fields (G2-08)

  Offending text:

  > Answer Etsy's creation questions truthfully: designed by Play Before Pixels with AI assistance (layouts, illustrations and draft text generated with Claude Code from the brand's own symbol library), t

  Proposed replacement:

  > "etsy_attribution": "Designed by Play Before Pixels", "etsy_ai_flag": true

- **WARN · price_floor + net_per_unit_by_channel present and met** · field `price_floor_usd` · field is named price_floor_usd; G2-11 and ROUTINE.md name it price_floor, so a CI check keyed on price_floor will miss it

  Offending text:

  > price_floor_usd = 3.0

  Proposed replacement:

  > "price_floor": 3.0

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `net_per_unit_by_channel` · no per-channel net (gate 18; G2-11); estimate: etsy ≈ $8.96, etsy_offsite_ad_sale ≈ $7.30, site ≈ $9.83

  Offending text:

  > (missing)

  Proposed replacement:

  > "net_per_unit_by_channel": {"etsy": 8.96, "etsy_offsite_ad_sale": 7.3, "site": 9.83}  (estimates, UNVERIFIED fees; replace with calculator figures)

- **FAIL · AlphaPlay LLC owner line** · field `(record)` · no AlphaPlay LLC owner line anywhere in the record

  Offending text:

  > (missing)

  Proposed replacement:

  > "owner_line": "© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC."

- **FAIL · Readability: FK grade ≤7** · field `long_description` · sentence grade 24.0, 53 words (whole description grade 9.2)

  Offending text:

  > For the whole family, there are 24 together tokens (12 ready-made, 12 make-your-own), six screen-spot cards (5 more minutes, screens go to sleep, what we do next), a family rules poster, a warm three-page Family Play & Screen Plan, a 30-day play tracker with 30 no-buy play ideas, and a certificate to celebrate.

  Proposed replacement:

  > The whole family gets 24 together tokens and six screen-spot cards. There is a rules poster and a warm three-page family plan. A 30-day tracker holds 30 play ideas that need nothing to buy. A certificate marks the end.

- **FAIL · Readability: FK grade ≤7** · field `long_description` · sentence grade 13.6, 35 words (whole description grade 9.2)

  Offending text:

  > The Play First, Then Screens checklist comes as a picture version for ages 2–5, a word version for ages 5–12, and a fillable blank, each in 4 colorways with Monday or Sunday starts.

  Proposed replacement:

  > The Play First, Then Screens checklist comes in three versions: pictures for ages 2–5, words for ages 5–12, and a fillable blank. Each has 4 colorways and a Monday or Sunday start.

- **FAIL · First 160 chars say what it is, the age range and the format** · field `long_description[:160]` · missing: what, age, format

  Offending text:

  > Give your day a simple, kind shape: jobs first, then play and time together, then screens at their usual spot. Nothing is taken away; there's just more play to 

  Proposed replacement:

  > The Play-First Family Kit has 10 printable tools for ages 2–12, in a PDF you can type in: checklists, tokens, a chore chart and a family plan. Jobs first, then play, then screens.


### play-talk-cards
<a id="l-play-talk-cards"></a>

File: `products/play-talk-cards/listing.json` · Price: $7.00 · Channels tested: etsy (now), site (now), social (now)

| Check | Result | What was found |
|---|---|---|
| Etsy title: ≤140, no repeated words, % : & + once | **FAIL** | 137 chars, 23 words |
| Etsy tags: exactly 13, each ≤20 | **PASS** | 13 tags, longest 20 chars |
| KDP title + subtitle ≤200 | **–** | no KDP edition |
| KDP keywords: 7 boxes, each ≤50 | **–** | no KDP edition |
| KDP description ≤4000 | **–** | no KDP edition |
| Shopify SEO title ≤70, meta ≤160 | **PASS** | title 53 / meta 147 chars |
| TpT title ≤80 | **–** | not on TpT |
| Merch on Demand title ≤60, bullets ≤256, description ≤2000 | **–** | not on Merch on Demand |
| BRAND.md listing.json schema and limits | **PASS** | 0 required field(s) missing; long_description 214 words |
| No health / developmental-outcome / safety / fear claims | **PASS** | 0 hit(s) in public fields |
| No named school, district, company, show, creator, device or EdTech | **WARN** | 0 fail hit(s); neutral tool/channel names (allowed): Acrobat Reader, Adobe |
| No autism / diagnosis terms or targeting | **PASS** | 0 public hit(s) |
| Honest pricing (16 CFR 233.1) + PRICING.md rules | **PASS** | price $7.00 |
| ai_disclosure filled for every channel; no 'human-made' claim | **WARN** | channels: etsy(now), site(now), social(now) |
| price_floor + net_per_unit_by_channel present and met | **FAIL** | no floor; est. etsy ≈ $5.54, etsy_offsite_ad_sale ≈ $4.49, site ≈ $6.15 |
| AlphaPlay LLC owner line | **PASS** | found in compliance_notes |
| No home address, phone number or personal email | **PASS** | 0 hit(s) in all fields |
| No reply-time promise | **PASS** | 0 hit(s) |
| No coaching / calls / podcast / live service | **PASS** | 0 hit(s) |
| Etsy/TpT copy: no URL, QR or other-store pointer (gate 16) | **PASS** | 0 hit(s) in shared marketplace fields |
| Readability: FK grade ≤7 | **PASS** | long_description FK 6.6; all parent-facing text FK 6.5 |
| First 160 chars say what it is, the age range and the format | **FAIL** | missing age, format; short_description has all three |

**Failures and warnings, with the exact text and a proposed replacement**

- **FAIL · Etsy title: ≤140, no repeated words, % : & + once** · field `etsy_title` · repeated words (title stuffing): play ×3, talk ×2, cards ×2

  Offending text:

  > 52 Play & Talk Cards for Ages 0-5, Printable Toddler Activity Cards, Baby Play Ideas, Screen-Free Play with Talk Tips, Play Before Pixels

  Proposed replacement:

  > 52 Play and Talk Cards for Ages 0-5, Printable Toddler and Baby Activities, Screen-Free Ideas with Tips, Play Before Pixels

- **WARN · No named school, district, company, show, creator, device or EdTech** · field `etsy_tags[10]` · 'busy toddler' reads as a creator, show or brand name in a search field

  Offending text:

  > busy toddler ideas

  Proposed replacement:

  > toddler play ideas

- **WARN · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure.etsy` · free text instead of the machine-checkable etsy_attribution + etsy_ai_flag fields (G2-08)

  Offending text:

  > Answer Etsy’s creation questions truthfully: designed by Play Before Pixels with AI assistance (layout, illustrations and draft text generated with Claude Code from the brand’s own symbol library), th

  Proposed replacement:

  > "etsy_attribution": "Designed by Play Before Pixels", "etsy_ai_flag": true

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `price_floor` · no price_floor (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "price_floor": 3.00

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `net_per_unit_by_channel` · no per-channel net (gate 18; G2-11); estimate: etsy ≈ $5.54, etsy_offsite_ad_sale ≈ $4.49, site ≈ $6.15

  Offending text:

  > (missing)

  Proposed replacement:

  > "net_per_unit_by_channel": {"etsy": 5.54, "etsy_offsite_ad_sale": 4.49, "site": 6.15}  (estimates, UNVERIFIED fees; replace with calculator figures)

- **FAIL · First 160 chars say what it is, the age range and the format** · field `long_description[:160]` · missing: age, format

  Offending text:

  > 52 simple plays for babies, toddlers and preschoolers, each on its own card with one talk tip in plain words, like “pause and wait,” “say what you see” or “offe

  Proposed replacement:

  > 52 printable play cards for ages 0–5, in US Letter and A4 PDFs. Each card has one simple play and one talk tip in plain words, like “pause and wait.”


### family-talk-along-cards
<a id="l-family-talk-along-cards"></a>

File: `products/play-talk-cards/talk-along/listing.json` · Price: $7.00 · Channels tested: etsy (now), site (now), kdp (later), social (now)

| Check | Result | What was found |
|---|---|---|
| Etsy title: ≤140, no repeated words, % : & + once | **FAIL** | 137 chars, 20 words |
| Etsy tags: exactly 13, each ≤20 | **PASS** | 13 tags, longest 20 chars |
| KDP title + subtitle ≤200 | **WARN** | 141 chars (title + subtitle) |
| KDP keywords: 7 boxes, each ≤50 | **PASS** | 7 boxes, longest 27 chars |
| KDP description ≤4000 | **PASS** | 1081 chars |
| Shopify SEO title ≤70, meta ≤160 | **PASS** | title 49 / meta 141 chars |
| TpT title ≤80 | **–** | not on TpT |
| Merch on Demand title ≤60, bullets ≤256, description ≤2000 | **–** | not on Merch on Demand |
| BRAND.md listing.json schema and limits | **PASS** | 0 required field(s) missing; long_description 196 words |
| No health / developmental-outcome / safety / fear claims | **PASS** | 0 hit(s) in public fields |
| No named school, district, company, show, creator, device or EdTech | **PASS** | 0 fail hit(s); neutral tool/channel names (allowed): Acrobat Reader, Adobe |
| No autism / diagnosis terms or targeting | **PASS** | 0 public hit(s) |
| Honest pricing (16 CFR 233.1) + PRICING.md rules | **PASS** | price $7.00 |
| ai_disclosure filled for every channel; no 'human-made' claim | **WARN** | channels: etsy(now), site(now), kdp(later), social(now) |
| price_floor + net_per_unit_by_channel present and met | **FAIL** | no floor; est. etsy ≈ $5.54, etsy_offsite_ad_sale ≈ $4.49, site ≈ $6.15 |
| AlphaPlay LLC owner line | **PASS** | found in compliance_notes |
| No home address, phone number or personal email | **PASS** | 0 hit(s) in all fields |
| No reply-time promise | **PASS** | 0 hit(s) |
| No coaching / calls / podcast / live service | **PASS** | 0 hit(s) |
| Etsy/TpT copy: no URL, QR or other-store pointer (gate 16) | **PASS** | 0 hit(s) in shared marketplace fields |
| Readability: FK grade ≤7 | **PASS** | long_description FK 5.9; all parent-facing text FK 6.2 |
| First 160 chars say what it is, the age range and the format | **FAIL** | missing format; short_description has all three |

**Failures and warnings, with the exact text and a proposed replacement**

- **FAIL · Etsy title: ≤140, no repeated words, % : & + once** · field `etsy_title` · repeated words (title stuffing): cards ×2

  Offending text:

  > 52 Family Talk-Along Cards, Ages 5-12, Printable Conversation Cards for Dinner, Car, Bath and Bedtime, Kids Questions, Play Before Pixels

  Proposed replacement:

  > 52 Family Talk-Along Cards, Ages 5-12, Printable Conversation Starters for Dinner, Car, Bath and Bedtime, Kids Questions, Play Before Pixels

- **WARN · KDP title + subtitle ≤200** · field `title + subtitle` · planned KDP activity edition has no amazon_title; the printable's title/subtitle was tested as a stand-in

  Offending text:

  > 52 Family Talk-Along Cards for Ages 5–12: Conversation cards for dinner, the car, bath time and bedtime, with a one-line grown-up tip on each

  Proposed replacement:

  > "amazon_title": "Family Talk-Along Journal, Ages 5–12: 52 Questions for Dinner, the Car, Bath Time and Bedtime (Black-and-White Interior)"

- **WARN · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure` · no entry for channel 'kdp' (later) - planned channel, so WARN until it goes live

  Offending text:

  > {"etsy": "Answer Etsy’s creation questions truthfully: designed by Play Before Pixels with AI assistance (layout, illustrations and draft text generated with Cl…

  Proposed replacement:

  > "ai_disclosure": {"kdp_ai_text": "AI-generated", "kdp_ai_images": "AI-generated", "kdp_ai_translation": "none"}  (Answers must match what really happened: set etsy_ai_flag from Etsy's current form [UNVERIFIED wording]; add 'edited by the founder' to any answer only after she has rewritten that part.)

- **WARN · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure.etsy` · free text instead of the machine-checkable etsy_attribution + etsy_ai_flag fields (G2-08)

  Offending text:

  > Answer Etsy’s creation questions truthfully: designed by Play Before Pixels with AI assistance (layout, illustrations and draft text generated with Claude Code from the brand’s own symbol library), th

  Proposed replacement:

  > "etsy_attribution": "Designed by Play Before Pixels", "etsy_ai_flag": true

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `price_floor` · no price_floor (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "price_floor": 3.00

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `net_per_unit_by_channel` · no per-channel net (gate 18; G2-11); estimate: etsy ≈ $5.54, etsy_offsite_ad_sale ≈ $4.49, site ≈ $6.15

  Offending text:

  > (missing)

  Proposed replacement:

  > "net_per_unit_by_channel": {"etsy": 5.54, "etsy_offsite_ad_sale": 4.49, "site": 6.15}  (estimates, UNVERIFIED fees; replace with calculator figures)

- **FAIL · First 160 chars say what it is, the age range and the format** · field `long_description[:160]` · missing: format

  Offending text:

  > 52 conversation cards for ages 5–12, sorted by the moments when families actually talk: passing the peas, waiting at a red light, rinsing shampoo, turning off t

  Proposed replacement:

  > 52 printable talk cards for ages 5–12, in US Letter and A4 PDFs. They are sorted by the times when families talk: dinner, the car, bath and bed.


### toddler-busy-book
<a id="l-toddler-busy-book"></a>

File: `products/toddler-busy-book/listing.json` · Price: $11.99 · Channels tested: etsy (now), site (now), kdp (later), social (now)

| Check | Result | What was found |
|---|---|---|
| Etsy title: ≤140, no repeated words, % : & + once | **FAIL** | 138 chars, 21 words |
| Etsy tags: exactly 13, each ≤20 | **PASS** | 13 tags, longest 19 chars |
| KDP title + subtitle ≤200 | **WARN** | 180 chars (title + subtitle) |
| KDP keywords: 7 boxes, each ≤50 | **PASS** | 7 boxes, longest 22 chars |
| KDP description ≤4000 | **PASS** | 1312 chars |
| Shopify SEO title ≤70, meta ≤160 | **PASS** | title 52 / meta 141 chars |
| TpT title ≤80 | **–** | not on TpT |
| Merch on Demand title ≤60, bullets ≤256, description ≤2000 | **–** | not on Merch on Demand |
| BRAND.md listing.json schema and limits | **PASS** | 0 required field(s) missing; long_description 228 words |
| No health / developmental-outcome / safety / fear claims | **PASS** | 0 hit(s) in public fields |
| No named school, district, company, show, creator, device or EdTech | **PASS** | 0 fail hit(s); neutral tool/channel names (allowed): Etsy |
| No autism / diagnosis terms or targeting | **WARN** | 0 public hit(s) |
| Honest pricing (16 CFR 233.1) + PRICING.md rules | **PASS** | price $11.99 |
| ai_disclosure filled for every channel; no 'human-made' claim | **FAIL** | channels: etsy(now), site(now), kdp(later), social(now) |
| price_floor + net_per_unit_by_channel present and met | **FAIL** | no floor; est. etsy ≈ $9.80, etsy_offsite_ad_sale ≈ $8.00, site ≈ $10.74 |
| AlphaPlay LLC owner line | **FAIL** | not found |
| No home address, phone number or personal email | **PASS** | 0 hit(s) in all fields |
| No reply-time promise | **PASS** | 0 hit(s) |
| No coaching / calls / podcast / live service | **PASS** | 0 hit(s) |
| Etsy/TpT copy: no URL, QR or other-store pointer (gate 16) | **PASS** | 0 hit(s) in shared marketplace fields |
| Readability: FK grade ≤7 | **FAIL** | long_description FK 10.1; all parent-facing text FK 9.5 |
| First 160 chars say what it is, the age range and the format | **FAIL** | missing age; short_description lacks one or more |

**Failures and warnings, with the exact text and a proposed replacement**

- **FAIL · Etsy title: ≤140, no repeated words, % : & + once** · field `etsy_title` · repeated words (title stuffing): busy ×2

  Offending text:

  > 74 Toddler Busy Book Printable Activities, Ages 1-5 Busy Binder, Screen-Free Matching, Colors, Shapes, Pretend Play, Mazes, US Letter + A4

  Proposed replacement:

  > 74 Toddler Busy Book Printable Activities, Ages 1-5 Learning Binder, Screen-Free Matching, Colors, Shapes, Pretend Play, Mazes, Letter + A4

- **WARN · KDP title + subtitle ≤200** · field `title + subtitle` · planned KDP activity edition has no amazon_title; the printable's title/subtitle was tested as a stand-in

  Offending text:

  > 74 Toddler Busy Book Activities for Ages 1–5: Matching, sorting, colors, shapes, pretend play, first words and mazes, sorted by age, with a “talk while you play” line on every page

  Proposed replacement:

  > "amazon_title": "Toddler Busy Book for Ages 1–5: 49 No-Cut Activities to Point, Name and Play, with a Talk Line on Every Page"

- **WARN · No autism / diagnosis terms or targeting** · field `compliance_notes` · 3 mention(s) in internal notes; a whole-file CI banned-word check (G2-04) would trip

  Offending text:

  > ADHD, autism

  Proposed replacement:

  > Say 'diagnosis or condition wording' in compliance notes instead of naming the condition.

- **FAIL · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure` · blank for every channel (gate 17; G2-08)

  Offending text:

  > (missing)

  Proposed replacement:

  > "ai_disclosure": {"etsy_attribution": "Designed by Play Before Pixels", "etsy_ai_flag": true, "kdp_ai_text": "AI-generated", "kdp_ai_images": "AI-generated", "kdp_ai_translation": "none", "site": "product page line: 'Illustrations and text are made with AI assistance.' (say 'edited by the founder' only after she has)", "social_ai_label": "apply each platform's AI label to posts that use these images"}  (Answers must match what really happened: set etsy_ai_flag from Etsy's current form [UNVERIFIED wording]; add 'edited by the founder' to any answer only after she has rewritten that part.)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `price_floor` · no price_floor (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "price_floor": 3.00

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `net_per_unit_by_channel` · no per-channel net (gate 18; G2-11); estimate: etsy ≈ $9.80, etsy_offsite_ad_sale ≈ $8.00, site ≈ $10.74

  Offending text:

  > (missing)

  Proposed replacement:

  > "net_per_unit_by_channel": {"etsy": 9.8, "etsy_offsite_ad_sale": 8.0, "site": 10.74}  (estimates, UNVERIFIED fees; replace with calculator figures)

- **FAIL · AlphaPlay LLC owner line** · field `(record)` · no AlphaPlay LLC owner line anywhere in the record

  Offending text:

  > (missing)

  Proposed replacement:

  > "owner_line": "© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC."

- **FAIL · Readability: FK grade ≤7** · field `long_description` · sentence grade 24.4, 59 words (whole description grade 10.1)

  Offending text:

  > These 74 printable activities are sorted into three age bands (1–2, 2–3 and 3–5 years): first words with art from our talk-along board book, animal sounds, matching, color and shape sorting, shadow match, pretend play (pizza shop, café, post office, dress for the weather), counting, patterns, first-next-last stories, rhymes and eight mazes from easy to tricky.

  Proposed replacement:

  > These 74 printable activities come in three age bands: 1–2, 2–3 and 3–5 years. There are first words, animal sounds, matching, and color and shape sorting. Kids can play pizza shop or post office, count, find patterns and try eight mazes.

- **FAIL · Readability: FK grade ≤7** · field `long_description` · sentence grade 19.1, 41 words (whole description grade 10.1)

  Offending text:

  > You also get binder covers in four colors, spine and pouch labels, an assembly guide (binder, laminated or velcro for ages 3–5), laminating tips, a weekly planner with Monday and Sunday starts, make-your-own pages, a certificate and an answer key.

  Proposed replacement:

  > You also get binder covers in four colors, plus spine and pouch labels. An assembly guide shows three ways to put it together. A weekly planner, make-your-own pages, a certificate and an answer key are inside too.

- **FAIL · First 160 chars say what it is, the age range and the format** · field `long_description[:160]` · missing: age

  Offending text:

  > A busy book that gives you something to talk about, not just something to keep little hands busy. These 74 printable activities are sorted into three age bands 

  Proposed replacement:

  > 74 printable busy book activities for ages 1–5, in three age bands, as US Letter and A4 PDFs. Every activity gives you something to talk about.

  *(verifier: the proposal said "74 … pages". The product has 74 activities on 132 pages, and CUSTOMER-VOICE rule 19 says to lead with the number of activities, not pages.)*


### visual-routine-cards-starter
<a id="l-visual-routine-cards-starter"></a>

File: `products/visual-routine-cards/listing-starter.json` · Price: $4.50 · Channels tested: etsy (now), site (now), social (now)

| Check | Result | What was found |
|---|---|---|
| Etsy title: ≤140, no repeated words, % : & + once | **FAIL** | 117 chars, 18 words (no etsy_title; tested `title`) |
| Etsy tags: exactly 13, each ≤20 | **PASS** | 13 tags, longest 20 chars |
| KDP title + subtitle ≤200 | **–** | no KDP edition |
| KDP keywords: 7 boxes, each ≤50 | **–** | no KDP edition |
| KDP description ≤4000 | **–** | no KDP edition |
| Shopify SEO title ≤70, meta ≤160 | **PASS** | title 57 / meta 153 chars |
| TpT title ≤80 | **–** | not on TpT |
| Merch on Demand title ≤60, bullets ≤256, description ≤2000 | **–** | not on Merch on Demand |
| BRAND.md listing.json schema and limits | **FAIL** | 1 required field(s) missing; long_description 198 words |
| No health / developmental-outcome / safety / fear claims | **PASS** | 0 hit(s) in public fields |
| No named school, district, company, show, creator, device or EdTech | **PASS** | 0 fail hit(s); neutral tool/channel names (allowed): Canva |
| No autism / diagnosis terms or targeting | **WARN** | 0 public hit(s) |
| Honest pricing (16 CFR 233.1) + PRICING.md rules | **FAIL** | price $4.50 |
| ai_disclosure filled for every channel; no 'human-made' claim | **FAIL** | channels: etsy(now), site(now), social(now) |
| price_floor + net_per_unit_by_channel present and met | **FAIL** | no floor; est. etsy ≈ $3.40, etsy_offsite_ad_sale ≈ $2.72, site ≈ $3.84 |
| AlphaPlay LLC owner line | **PASS** | found in compliance_notes |
| No home address, phone number or personal email | **PASS** | 0 hit(s) in all fields |
| No reply-time promise | **PASS** | 0 hit(s) |
| No coaching / calls / podcast / live service | **PASS** | 0 hit(s) |
| Etsy/TpT copy: no URL, QR or other-store pointer (gate 16) | **PASS** | 0 hit(s) in shared marketplace fields |
| Readability: FK grade ≤7 | **WARN** | long_description FK 7.1; all parent-facing text FK 6.6 |
| First 160 chars say what it is, the age range and the format | **FAIL** | missing age; short_description has all three |

**Failures and warnings, with the exact text and a proposed replacement**

- **FAIL · Etsy title: ≤140, no repeated words, % : & + once** · field `title` · repeated words (title stuffing): routine ×2

  Offending text:

  > 60 Visual Routine Cards for Toddlers, Morning & Bedtime Routine Chart, First Then Board, Daily Schedule Printable PDF

  Proposed replacement:

  > 60 Visual Routine Cards for Toddlers, Morning and Bedtime Picture Chart, Daily Schedule Printable PDF  (also drops the 'First Then Board' search term flagged below)

- **FAIL · BRAND.md listing.json schema and limits** · field `(record)` · required by BRAND.md (deliverables, repeat-purchase and Amazon-edition rules)

  Offending text:

  > amazon_route

  Proposed replacement:

  > "amazon_route": "none-with-reason: cut-and-velcro picture cards do not work as a bound KDP book"

- **WARN · No autism / diagnosis terms or targeting** · field `title` · 'First Then Board' is an autism/therapy-adjacent search term in a search field; founder decides if it targets diagnosis searches

  Offending text:

  > 60 Visual Routine Cards for Toddlers, Morning & Bedtime Routine Chart, First Then Board, Daily Schedule Printable PDF

  Proposed replacement:

  > 60 Visual Routine Cards for Toddlers, Morning and Bedtime Picture Chart, Daily Schedule Printable PDF

- **WARN · No autism / diagnosis terms or targeting** · field `keywords[2]` · 'first then board' is an autism/therapy-adjacent search term in a search field; founder decides if it targets diagnosis searches

  Offending text:

  > first then board

  Proposed replacement:

  > toddler picture schedule  (founder decides, as above)

- **WARN · No autism / diagnosis terms or targeting** · field `etsy_tags[2]` · 'first then board' is an autism/therapy-adjacent search term in a search field; founder decides if it targets diagnosis searches

  Offending text:

  > first then board

  Proposed replacement:

  > toddler picture chart  (or keep 'first then board' if the founder decides it is a general toddler term; record the decision in compliance_notes)

- **WARN · No autism / diagnosis terms or targeting** · field `etsy_tags[10]` · 'visual schedule' is an autism/therapy-adjacent search term in a search field; founder decides if it targets diagnosis searches

  Offending text:

  > visual schedule

  Proposed replacement:

  > kids daily routine

- **WARN · No autism / diagnosis terms or targeting** · field `seo_description` · 'first–then board' is an autism/therapy-adjacent search term in a search field; founder decides if it targets diagnosis searches

  Offending text:

  > 60 printable routine cards for toddlers and preschoolers plus a first–then board and morning chart. Letter and A4. Helps little ones see what comes next.

  Proposed replacement:

  > 60 printable routine cards for toddlers and preschoolers plus a two-step picture board and morning chart. Letter and A4. Helps little ones see what comes next.  (only if the founder drops 'first–then board')

- **WARN · No autism / diagnosis terms or targeting** · field `short_description` · 'first–then board' is an autism/therapy-adjacent search term in a search field; founder decides if it targets diagnosis searches

  Offending text:

  > 60 printable picture cards for ages 0–5, plus a strip, a first–then board and a morning chart. Letter + A4. Helps little ones see what comes next.

  Proposed replacement:

  > 60 printable picture cards for ages 0–5, plus a strip, a two-step picture board and a morning chart. Letter + A4. Helps little ones see what comes next.  (only if the founder drops 'first–then board')

- **WARN · No autism / diagnosis terms or targeting** · field `compliance_notes` · 2 mention(s) in internal notes; a whole-file CI banned-word check (G2-04) would trip

  Offending text:

  > ADHD, autism

  Proposed replacement:

  > Say 'diagnosis or condition wording' in compliance notes instead of naming the condition.

- **FAIL · Honest pricing (16 CFR 233.1) + PRICING.md rules** · field `price_notes` · pricing plan uses a standing/usual sale off a list price: a permanent anchor (16 CFR 233.1; BRAND 'Honest pricing'; G2-11)

  Offending text:

  > Keep it undiscounted or run the same sale as the Complete Set; the listing and the PDF both point buyers to the $9.50 Complete Set.

  Proposed replacement:

  > Everyday price $5.00, shown plainly, with no sale borrowed from the Complete Set. The listing and the PDF both point buyers to the Complete Set.

- **FAIL · Honest pricing (16 CFR 233.1) + PRICING.md rules** · field `price_usd` · single printable under $5.00 (commerce/PRICING.md s.1; DEMAND-CHECK rule 3)

  Offending text:

  > 4.5

  Proposed replacement:

  > "price_usd": 5.00  (estimated Etsy net about $3.83, or $3.08 on an Offsite Ads sale, both over the $3.00 floor; at $4.50 an ad-attributed sale nets about $2.72). Or make the Starter the free email printable instead.

- **FAIL · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure` · blank for every channel (gate 17; G2-08)

  Offending text:

  > (missing)

  Proposed replacement:

  > "ai_disclosure": {"etsy_attribution": "Designed by Play Before Pixels", "etsy_ai_flag": true, "site": "product page line: 'Illustrations and text are made with AI assistance.' (say 'edited by the founder' only after she has)", "social_ai_label": "apply each platform's AI label to posts that use these images"}  (Answers must match what really happened: set etsy_ai_flag from Etsy's current form [UNVERIFIED wording]; add 'edited by the founder' to any answer only after she has rewritten that part.)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `price_floor` · no price_floor (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "price_floor": 3.00

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `net_per_unit_by_channel` · no per-channel net (gate 18; G2-11); estimate: etsy ≈ $3.40, etsy_offsite_ad_sale ≈ $2.72, site ≈ $3.84

  Offending text:

  > (missing)

  Proposed replacement:

  > "net_per_unit_by_channel": {"etsy": 3.4, "etsy_offsite_ad_sale": 2.72, "site": 3.84}  (estimates, UNVERIFIED fees; replace with calculator figures)

- **WARN · price_floor + net_per_unit_by_channel present and met** · field `(estimate)` · estimated net below the $3.00 digital floor (UNVERIFIED fee model)

  Offending text:

  > etsy_offsite_ad_sale ≈ $2.72

  Proposed replacement:

  > Lowest price that still clears $3.00 on this kind of sale: about $4.89 (UNVERIFIED fees). Or opt out of Etsy Offsite Ads if the shop is still allowed to [VERIFY].

- **WARN · Readability: FK grade ≤7** · field `long_description` · sentence grade 17.1, 40 words (whole description grade 7.1; borderline, the heuristic runs about 0.5-1 grade high)

  Offending text:

  > These 60 printable picture cards cover the moments that fill a little one's day: waking up, potty, getting dressed, meals, play, outside time, reading together, bath, bedtime, helping jobs, a feelings check-in and plan words like First, Then and Wait.

  Proposed replacement:

  > These 60 printable picture cards cover a little one's day. There are cards for waking up, potty, getting dressed, meals and play. Others show outside time, reading, bath, bedtime, helping jobs and feelings, plus plan words like First, Then and Wait.

- **WARN · Readability: FK grade ≤7** · field `long_description` · sentence grade 12.3, 20 words (whole description grade 7.1; borderline, the heuristic runs about 0.5-1 grade high)

  Offending text:

  > The Complete Set has 228 cards for ages 0–12, 6 chart layouts, 4 colorways, editable files and Canva-ready PNGs.

  Proposed replacement:

  > The Complete Set has 228 cards for ages 0–12. It adds 6 charts, 4 color looks, files you can edit and PNGs for Canva.

- **FAIL · First 160 chars say what it is, the age range and the format** · field `long_description[:160]` · missing: age

  Offending text:

  > A simple place to start. These 60 printable picture cards cover the moments that fill a little one's day: waking up, potty, getting dressed, meals, play, outsid

  Proposed replacement:

  > 60 printable picture routine cards for ages 0–5, with three charts, in US Letter and A4 PDFs. A simple place to start.


### visual-routine-cards
<a id="l-visual-routine-cards"></a>

File: `products/visual-routine-cards/listing.json` · Price: $9.50 · Channels tested: etsy (now), site (now), social (now) · Excluded by the listing: tpt

| Check | Result | What was found |
|---|---|---|
| Etsy title: ≤140, no repeated words, % : & + once | **PASS** | 125 chars, 19 words (no etsy_title; tested `title`) |
| Etsy tags: exactly 13, each ≤20 | **PASS** | 13 tags, longest 20 chars |
| KDP title + subtitle ≤200 | **–** | no KDP edition |
| KDP keywords: 7 boxes, each ≤50 | **–** | no KDP edition |
| KDP description ≤4000 | **–** | no KDP edition |
| Shopify SEO title ≤70, meta ≤160 | **PASS** | title 60 / meta 147 chars |
| TpT title ≤80 | **–** | not on TpT (explicitly excluded) |
| Merch on Demand title ≤60, bullets ≤256, description ≤2000 | **–** | not on Merch on Demand |
| BRAND.md listing.json schema and limits | **FAIL** | 1 required field(s) missing; long_description 211 words |
| No health / developmental-outcome / safety / fear claims | **WARN** | 1 hit(s) in public fields |
| No named school, district, company, show, creator, device or EdTech | **PASS** | 0 fail hit(s); neutral tool/channel names (allowed): Acrobat Reader, Adobe, Canva |
| No autism / diagnosis terms or targeting | **WARN** | 0 public hit(s) |
| Honest pricing (16 CFR 233.1) + PRICING.md rules | **FAIL** | price $9.50 |
| ai_disclosure filled for every channel; no 'human-made' claim | **FAIL** | channels: etsy(now), site(now), social(now) |
| price_floor + net_per_unit_by_channel present and met | **FAIL** | no floor; est. etsy ≈ $7.67, etsy_offsite_ad_sale ≈ $6.25, site ≈ $8.45 |
| AlphaPlay LLC owner line | **PASS** | found in compliance_notes |
| No home address, phone number or personal email | **PASS** | 0 hit(s) in all fields |
| No reply-time promise | **PASS** | 0 hit(s) |
| No coaching / calls / podcast / live service | **PASS** | 0 hit(s) |
| Etsy/TpT copy: no URL, QR or other-store pointer (gate 16) | **PASS** | 0 hit(s) in shared marketplace fields |
| Readability: FK grade ≤7 | **FAIL** | long_description FK 8.6; all parent-facing text FK 8.9 |
| First 160 chars say what it is, the age range and the format | **FAIL** | missing age; short_description has all three |

**Failures and warnings, with the exact text and a proposed replacement**

- **FAIL · BRAND.md listing.json schema and limits** · field `(record)` · required by BRAND.md (deliverables, repeat-purchase and Amazon-edition rules)

  Offending text:

  > amazon_route

  Proposed replacement:

  > "amazon_route": "none-with-reason: cut-and-velcro picture cards do not work as a bound KDP book"

- **WARN · No health / developmental-outcome / safety / fear claims** · field `long_description` · 'go more smoothly': soft behavior-outcome promise

  Offending text:

  > Mornings, meals, bath and bedtime go more smoothly when little ones can see what comes next.

  Proposed replacement:

  > Big, friendly picture cards show little ones what comes next at mornings, meals, bath and bedtime.

- **WARN · No autism / diagnosis terms or targeting** · field `title` · 'First Then Board' is an autism/therapy-adjacent search term in a search field; founder decides if it targets diagnosis searches

  Offending text:

  > 200+ Visual Routine Cards for Kids, Editable Morning & Bedtime Chart, Toddler Daily Schedule, First Then Board, Printable PDF

  Proposed replacement:

  > 200+ Visual Routine Cards for Kids, Editable Morning and Bedtime Chart, Toddler Daily Schedule, Picture Board, Printable PDF

- **WARN · No autism / diagnosis terms or targeting** · field `keywords[5]` · 'first then board' is an autism/therapy-adjacent search term in a search field; founder decides if it targets diagnosis searches

  Offending text:

  > first then board

  Proposed replacement:

  > picture routine cards  (founder decides, as above)

- **WARN · No autism / diagnosis terms or targeting** · field `etsy_tags[5]` · 'first then board' is an autism/therapy-adjacent search term in a search field; founder decides if it targets diagnosis searches

  Offending text:

  > first then board

  Proposed replacement:

  > picture cards kids  (or keep, if the founder decides it is a general toddler term)

- **WARN · No autism / diagnosis terms or targeting** · field `etsy_tags[6]` · 'visual schedule' is an autism/therapy-adjacent search term in a search field; founder decides if it targets diagnosis searches

  Offending text:

  > visual schedule

  Proposed replacement:

  > big kid checklist

- **WARN · No autism / diagnosis terms or targeting** · field `compliance_notes` · 2 mention(s) in internal notes; a whole-file CI banned-word check (G2-04) would trip

  Offending text:

  > ADHD, autism

  Proposed replacement:

  > Say 'diagnosis or condition wording' in compliance notes instead of naming the condition.

- **FAIL · Honest pricing (16 CFR 233.1) + PRICING.md rules** · field `price_notes` · pricing plan uses a standing/usual sale off a list price: a permanent anchor (16 CFR 233.1; BRAND 'Honest pricing'; G2-11)

  Offending text:

  > List at $9.50 and run a standing 30–40% sale (sells at about $5.70–$6.65; launch sale about $6.50) per marketing/DEMAND-CHECK.md sections 1, 3 and 4.

  Proposed replacement:

  > Set one everyday price where buyers actually pay (about $6.50–$6.99 per DEMAND-CHECK), shown plainly. No list price and no standing 30–40% sale. A launch-week price is allowed only with start and end dates recorded in listing.json.

- **FAIL · ai_disclosure filled for every channel; no 'human-made' claim** · field `ai_disclosure` · blank for every channel (gate 17; G2-08)

  Offending text:

  > (missing)

  Proposed replacement:

  > "ai_disclosure": {"etsy_attribution": "Designed by Play Before Pixels", "etsy_ai_flag": true, "site": "product page line: 'Illustrations and text are made with AI assistance.' (say 'edited by the founder' only after she has)", "social_ai_label": "apply each platform's AI label to posts that use these images"}  (Answers must match what really happened: set etsy_ai_flag from Etsy's current form [UNVERIFIED wording]; add 'edited by the founder' to any answer only after she has rewritten that part.)

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `price_floor` · no price_floor (gate 18; G2-11)

  Offending text:

  > (missing)

  Proposed replacement:

  > "price_floor": 3.00

- **FAIL · price_floor + net_per_unit_by_channel present and met** · field `net_per_unit_by_channel` · no per-channel net (gate 18; G2-11); estimate: etsy ≈ $7.67, etsy_offsite_ad_sale ≈ $6.25, site ≈ $8.45

  Offending text:

  > (missing)

  Proposed replacement:

  > "net_per_unit_by_channel": {"etsy": 7.67, "etsy_offsite_ad_sale": 6.25, "site": 8.45}  (estimates, UNVERIFIED fees; replace with calculator figures)

- **FAIL · Readability: FK grade ≤7** · field `long_description` · sentence grade 20.1, 44 words (whole description grade 8.6)

  Offending text:

  > Inside are 228 picture cards: 170 for ages 0–5 (morning, meals, play, outside, reading together, bath, bedtime, helping jobs, out and about, plan words and a feelings check-in) and 58 big-kid cards for ages 5–12 (mornings, after school, evenings and family jobs).

  Proposed replacement:

  > There are 228 picture cards inside. 170 are for ages 0–5, from mornings and meals to bath, bed and feelings. 58 big-kid cards for ages 5–12 cover mornings, after school, evenings and jobs.

- **FAIL · Readability: FK grade ≤7** · field `long_description` · sentence grade 11.3, 26 words (whole description grade 8.6)

  Offending text:

  > Choose from 6 chart layouts: vertical and horizontal strips, a first–then board, morning and bedtime charts, and a Today board with Monday or Sunday start.

  Proposed replacement:

  > Choose from 6 chart layouts. There are two strips, a first–then board, morning and bedtime charts, and a Today board with a Monday or Sunday start.

- **FAIL · First 160 chars say what it is, the age range and the format** · field `long_description[:160]` · missing: age

  Offending text:

  > Mornings, meals, bath and bedtime go more smoothly when little ones can see what comes next. This printable set turns your family's everyday rhythm into big, fr

  Proposed replacement:

  > 228 printable routine picture cards for ages 0–12, with 6 charts, in US Letter and A4 PDFs. Big, friendly pictures show little ones what comes next.


## 4. Cross-listing checks

- `visual-routine-cards-starter` and `visual-routine-cards` share 10 of 13 Etsy tags (bedtime routine, daily schedule kids, first then board, morning routine, preschool printable, routine chart, toddler printable, toddler routine, visual routine cards, visual schedule); they will compete for the same searches. Give the cheaper tier different long-tail tags. WARN.

## 5. Needs a live check

Every item below came from memory and was used as a test threshold or in an estimate. Confirm each on the platform's own page, then edit `PLATFORM_LIMITS` / `FEES` at the top of the script and re-run.

- [ ] **Etsy: Listing title length = 140** (Etsy listing form / Open API v3 `title`). UNVERIFIED.
- [ ] **Etsy: Title: each of % : & + at most once = 1** (Etsy Open API v3 `title` rules). UNVERIFIED.
- [ ] **Etsy: Title: no content word repeated (stuffing) = 1** (Etsy seller-handbook title guidance). UNVERIFIED.
- [ ] **Etsy: Tags per listing (we require exactly 13) = 13** (Etsy listing form). UNVERIFIED.
- [ ] **Etsy: Characters per tag = 20** (Etsy listing form). UNVERIFIED.
- [ ] **Amazon KDP: Title + subtitle combined = 200** (KDP title field help). UNVERIFIED.
- [ ] **Amazon KDP: Keyword boxes = 7** (KDP keywords help). UNVERIFIED.
- [ ] **Amazon KDP: Characters per keyword box = 50** (KDP keywords help). UNVERIFIED.
- [ ] **Amazon KDP: Description length (HTML counts) = 4000** (KDP description help). UNVERIFIED.
- [ ] **Shopify (own site): SEO page title = 70** (Shopify admin search-engine listing). UNVERIFIED.
- [ ] **Shopify (own site): Meta description (display target; admin may allow 320) = 160** (Shopify admin / Google snippet length). UNVERIFIED.
- [ ] **Teachers Pay Teachers: Resource title = 80** (TpT product-upload form). UNVERIFIED.
- [ ] **Amazon Merch on Demand: Product title = 60** (Merch on Demand upload form). UNVERIFIED.
- [ ] **Amazon Merch on Demand: Each of 2 feature bullets = 256** (Merch on Demand upload form). UNVERIFIED.
- [ ] **Amazon Merch on Demand: Product description = 2000** (Merch on Demand upload form). UNVERIFIED.
- [ ] **Etsy fees** used for the net estimates: $0.20 listing, 6.5% transaction, 3% + $0.25 payment processing (US), 15% Offsite Ads on ad-attributed sales. UNVERIFIED.
- [ ] **Shopify Payments** 2.9% + $0.30 (Basic plan, US card) and whether a digital-delivery app adds a fee. UNVERIFIED.
- [ ] **Merchant of record** 5% + $0.50 for the course. UNVERIFIED (depends on the provider chosen). *(verifier: the repo's own plan is Gumroad at 10% + $0.50 (storefront-setup-guide §13); Lemon Squeezy and Paddle are about 5% + $0.50 (legal/international-plan.md). RESEARCH-BACKLOG RB-18 already tracks this conflict.)*
- [ ] **TpT basic seller** payout 55% and $0.30 transaction fee. UNVERIFIED.
- [ ] **Shopify meta description**: whether the admin counter is 160 or 320 characters (the 160 used here is Google's usual display length). UNVERIFIED.
- [ ] **Etsy tag characters**: which punctuation Etsy accepts in tags (the check allows letters, numbers, spaces, apostrophes, & and -). UNVERIFIED.
- [ ] **KDP keyword rules**: the ban on sales/ranking words ('bestseller', 'free', 'new', 'Kindle Unlimited') and quotation marks. UNVERIFIED.
- [ ] **Etsy AI disclosure form**: current wording of the creation questions and whether there is a separate AI flag (the family kit's own note also says [VERIFY]). UNVERIFIED.
- [ ] **KDP AI questions**: that KDP still asks separately about AI text, images and translation (G2-08 says it does; not re-checked here). UNVERIFIED.
- [ ] **Etsy snippet**: that Etsy/Google show roughly the first 160 characters of the description as the search snippet (the reason for the first-160 rule). UNVERIFIED.
- [ ] **Duplicate listings**: whether Etsy treats a starter tier and a complete set with 6+ shared tags as near-duplicates. UNVERIFIED.
- [ ] **KDP royalty tiers** used in the book proposals: 60% at a list price of $9.99+ (lower below it), 40% for Expanded Distribution. The figures quoted come from each listing's own price_notes [VERIFY]. UNVERIFIED.
- [ ] **KDP premium-color print cost** ($1.00 + $0.07 per page, about $3.24 for 32 pages) quoted from price_notes. UNVERIFIED.
- [ ] **Etsy Offsite Ads opt-out**: whether a shop under the sales threshold can still opt out (the proposals offer this as an alternative to a higher price). UNVERIFIED.
- [ ] **Poison Control number** is treated as an allowed public safety line (it appears in guide-100-plays notes); confirm the number printed in the product is current. UNVERIFIED.
- [ ] *(verifier)* **Etsy repeated words**: whether Etsy rejects a title that repeats a word, or only ranks it lower. From memory, it is title guidance, not a form limit. This decides whether the 9 Etsy-title FAILs block anything. UNVERIFIED.
- [ ] *(verifier)* **Etsy listing FAQ**: whether an Etsy listing has its own FAQ field or only a shop-level FAQ. From memory, only the shop has one. This decides whether a listing's `faq` (which names playbeforepixels.com and Amazon in several files) can ever reach Etsy. UNVERIFIED.

## 6. Verification

An adversarial re-check on 2026-09-28. I wrote an independent checker from scratch (scratchpad only, no code imported from `check_listings.py`) and ran it against the listing files **as committed in `c2c0d5c` at 02:16 UTC**. That commit also holds this report, and the report is unchanged since then, so these are the files the report actually tested. I then ran the same checks on a copy of the files taken at 03:20 UTC.

### Re-checked against the files the report tested (02:16)

| # | Check | Report says | Re-computed | Verdict |
|---|---|---|---|---|
| 1 | Records scanned | 16 records in 15 files, 1 archived file skipped | 16 / 15 / 1 | Confirmed |
| 2 | Etsy title | 9 FAIL | 9 FAIL, every one from a repeated word only (cards, phone, play/age, shirt, family, play/talk/cards, cards, busy, routine). None is over 140 characters or repeats % : & + | Confirmed; the severity is **overstated** (see 2. Summary) |
| 3 | Etsy tags | 2 FAIL (guide-100-plays and picture-more-talk-less-tap have no `etsy_tags`) | Same. All the others have exactly 13 tags of 20 characters or fewer. The two proposed tag sets have 13 each, all 20 or fewer | Confirmed |
| 4 | Tag overlap | The two routine-card tiers share 10 of 13 tags | 10 of 13, the same 10 tags | Confirmed |
| 5 | BRAND.md schema | 3 FAIL (`amazon_route` missing in guide-100-plays and both routine-card files) | Key absent in all 3. Every other length limit passes: short ≤160, seo_title ≤60, seo_description ≤155, 5 bullets, 7 keywords | Confirmed; the 252-word WARN is **withdrawn** (246 words) |
| 6 | ai_disclosure | 13 FAIL (field absent), 3 WARN (free text instead of G2-08 keys) | 13 absent. play-first-family-kit, play-talk-cards and family-talk-along-cards use free-text `etsy`/`kdp`/`site`/`social` keys | Confirmed |
| 7 | Price floor and net | 16 FAIL; 11 estimated nets | No record had `net_per_unit_by_channel`. All 11 estimates re-derived to the cent from the stated fee model (e.g. $6.50 → Etsy $5.11, $4.13 with Offsite Ads, site $5.69; $4.50 → Offsite Ads $2.72, under the floor; lowest clearing price $4.89) | Confirmed, except the course: **corrected** to about $22.45 at the plan's 10% + $0.50 merchant-of-record fee |
| 8 | Owner line | 3 FAIL | No "AlphaPlay" string anywhere in those 3 records | Confirmed as a record check; **overstated** as a gate 8 breach, because the build files print the line |
| 9 | Readability (FK) | 8 FAIL | With a different syllable heuristic, the same 8 are above 7.5. My grades run 0.3–0.5 lower. visual-routine-cards-starter scores 6.7 (report: WARN at 7.1) | Confirmed; the starter's WARN is within the heuristic's noise |
| 10 | First 160 characters | 14 FAIL | 14 by the rule as written. The tote cannot state a child age range: it is an adult bag sold only in bundles | **Corrected** to 13 FAIL + 1 WARN. board-up-go-more and play-talk-cards do name age groups ("babies and toddlers") but still lack a format word, so they stay FAIL |
| 11 | Honest pricing | 3 FAIL | guide-100-plays: "the usual Etsy sale at about 33% off". visual-routine-cards: "standing 30–40% sale". Starter: $4.50 is under the $5 rule. Bundle sums check out ($27 + $11 + $9.99 + $6.50 = $54.49, 10.1% off; $11.99 + $16.99 = $28.98, 13.8% off, both within 10–25%) | Confirmed |
| 12 | KDP and Shopify lengths | All PASS; figures listed | Every SEO title and meta length matches to the character (e.g. 54/141, 59/150, 57/154). play-first-family-kit's title plus subtitle is 220 characters, which is WARN because the channel is "later" | Confirmed |
| 13 | Address, phone, email; health words | PASS | No personal contact details, only the Poison Control line. The only banned-word hits are benign (shipping "damage", "money-back guarantee", "treats a talking device as") | Confirmed |
| 14 | Proposed replacements | – | All proposed Etsy titles are 140 characters or fewer with no repeats. Every proposed first-160 line includes what, age and format | One wrong: the toddler-busy-book line said "74 … pages". **Corrected** to activities |

### Changed in this file
1. Tote first-160: FAIL → WARN. The totals change to 70 FAILs (was 71), and first-160 to 13 FAILs (was 14).
2. The guide-100-plays 252-word WARN is withdrawn.
3. Course net: about $22.45 at the plan's merchant-of-record fee, and $41.15 for the bundle. The fee row in section 1 and the *Needs a live check* line are annotated to match.
4. The toddler-busy-book proposed lead now says activities, not pages.
5. The summary notes that the Etsy-title and owner-line FAILs are overstated, and names the `faq` gap.
6. Added the snapshot note at the top and two *Needs a live check* items.

### Missed or understated by the report
- **The gate 16 check skips `faq`.** At 02:16, the merch-core-logo-tee FAQ named playbeforepixels.com (Etsy channel), and the picture-more-talk-less-tap FAQ said "Full terms: playbeforepixels.com/license" (Etsy and TpT channels; the item is held). At 03:20, 11 Etsy/TpT listings name "our site", Amazon or playbeforepixels.com in their FAQ. BRAND.md makes the FAQ a site product-page feature, so this matters only if an Etsy or TpT description is ever built from `faq`. Keep a separate marketplace FAQ, or make sure the publisher never copies `faq`.
- **Two binding files name the net field differently.** commerce/PRICING.md §2 asks for `net_after_fees` and `margin_pct` on each channel. Gate 18 and G2-11 ask for `price_floor` and `net_per_unit_by_channel`. The routine-card files now follow PRICING.md (`price_floor_usd` plus `channel_net.*.net_after_fees`/`margin_pct`) and still fail the checker. Pick one name and fix the other file through APPROVALS.
- **A founder-location trace.** `products/picture-laps-not-apps/listing.json` `compliance_notes` still names the "old Rockville Pike mailbox". The report lists this as WARN (internal field), but BRAND.md bans any local angle, so remove it through the build path.
- **The merchant-of-record estimate spread into a product file.** `products/course-screen-reset/listing.json` now stores `site_mor` 23.8 and `bundle_site_mor` 43.6 from this report's 5% model (see Changed item 3).

### State of the files at 03:20 UTC (not merged into sections 2–4)
A re-run of the current script on the 03:20 copy (JSON output in scratchpad only) finds 17 records. **15 of 17 have at least one FAIL**, 62 FAILs in total. My independent checker agrees on the items below.
- **Now clean:** bored-play-cards and course-screen-reset (0 FAIL). guide-100-plays and visual-routine-cards gained `amazon_route` and dropped the standing-sale wording.
- **New record:** `merch-core-more-talk-tee` (4 FAIL). Its Etsy tags share 7 of 13 with the logo tee.
- **New problems:**
  - visual-routine-cards and the starter no longer contain the AlphaPlay owner line in `listing.json`.
  - The guide-100-plays `etsy_title` now uses "+" twice ("Color + Low-Ink, Letter + A4"). That breaks the once-only special-character rule (UNVERIFIED), a harder failure than word repetition.
  - The visual-routine-cards Etsy title now repeats "routine".
  - That set now has 235 cards, so the proposed lead above ("228") is out of date.
- **Unchanged:** the starter is still $4.50. At that price an Offsite Ads sale nets about $2.72, under the $3.00 floor.
