# 2. Product line, roadmap by wave, pricing and channels

*Play Before Pixels, a trade name of AlphaPlay LLC (Maryland). Section of the expansion business plan. Prepared September 28, 2026.*

**How to read this section.** Every price, count and date comes from the repository files named in brackets. Anything this section adds is marked **Assumption** (a planning choice that can be changed) or **[VERIFY]** (an outside fact that must be checked live before money is spent). No web search was available for this draft, so every platform fee below is carried over from `commerce/storefront-setup-guide.md` and `legal/international-plan.md`, where it is also unverified.

**Binding limits that shape every choice below** (`brand/BRAND.md`, `CLAUDE.md`):
- products only: no coaching, calls, live events or founder appearances; the brand is faceless;
- no inventory held by the founder: digital, print-on-demand (POD), or stock held by a fulfillment warehouse (3PL) or Amazon FBA;
- every offer sells and delivers automatically, run by the Claude Code routines (`ops/ROUTINE.md`);
- no health claims, no autism keywords in any product or listing, never name or criticize a school or company;
- school- and group-facing products stay built but unpublished until the founder's employment counsel answers (`marketing/BLIND-SPOTS.md` #1).

---

## 2.1 Where the line stands today

Eight product folders exist in `products/`. Four have a `listing.json` (the store-ready record); four are source files only.

| Product | Folder | Built so far | Demand call (`DEMAND-CHECK.md`) | Price | Wave |
|---|---|---|---|---|---|
| 200+ Visual Routine Cards | `visual-routine-cards` | source.html only | Keep (strongest evidence: a 2,189-sale shop, several Bestseller badges) | $9.50 list, run at about $6.50; $4.50 starter tier | 1 |
| "I'm Bored" Play Cards (150) | `bored-play-cards` | source, Letter/A4, editable and duplex builds | Keep (a 10.4k-sale shop) | $6.50 | 1 |
| 100 Screen-Free Plays, ages 0–5 | `guide-100-plays` | paperback interior and digital edition sources | Keep (699-rating and 423-rating comparables) | $16.99 paperback; $9.99 PDF | 1 |
| 52 Play & Talk Cards, ages 0–5 | `play-talk-cards` | print PDF built | Keep, printable first | $7 printable; $22 POD deck later | 1 (bundle part), deck in 3 |
| *Up! Go! More!* talk-along first words | `board-up-go-more` | listing.json, PDF, cover, mockup | Keep; board book is Wave 3 | $11.99 paperback now; $12.99 board book; $29.99 3-pack | 1 (paperback), 3 (board) |
| *The Day the Tablet Slept* | `picture-tablet-slept` | listing.json, KDP and IngramSpark covers | Reposition (sell as a bedtime and play-day story, mainly inside a bundle) | $11.99 paperback; $19.99 hardcover; $24.99 Play Day bundle | 1 |
| *Laps Not Apps* | `picture-laps-not-apps` | listing.json, hardcover PDF | Reposition as a personalized keepsake | listing says $19.99; demand check says $34.99 personalized hardcover, $24.99 softcover | 3 (personalized) |
| *More Talk, Less Tap* | `picture-more-talk-less-tap` | listing.json, PDF | **Cut** as a book; the content becomes the Talk Tower game kit | $6.99 kit; $12.99 site license | School-facing wave |

Not yet started but scheduled: the Play-First Family Kit, the toddler busy book printable, the holiday gift bundle and gift-reveal card, the Car Ride & Waiting Pack, first-words flash cards, the 30-Day Screen Reset, and the ALPHAPLAY Spelling Games printable (`ops/QUEUE.md`).

**Record gaps to fix before any upload** (these break binding rules in `BRAND.md`):
1. None of the four `listing.json` files has the required `amazon_route` field.
2. *Laps Not Apps* and *More Talk, Less Tap* have no `next_products`; only *Up! Go! More!* and *The Day the Tablet Slept* have a `bonus_url`.
3. *Laps Not Apps* still carries the pre-demand-check $19.99 generic price. *More Talk, Less Tap* still lists channels for a book the demand check cut.
4. `commerce/storefront-setup-guide.md` still includes a coaching booking tool (Part C §5), coaching in the Shopify catalog, and the Amazon Influencer storefront. The first two break the no-live-services rule and the third breaks the faceless rule. This channel plan leaves out all three, and the guide should be corrected to match.

---

## 2.2 Principles that set the order

1. **Evidence first.** A product gets its own listing only when `DEMAND-CHECK.md` shows category demand. Weak items live only inside bundles.
2. **Digital first, physical second** (DEMAND-CHECK pricing rule 8). A deck, pouch or book edition is made only after its printable version sells.
3. **One content engine.** The plays library feeds the 100-plays book, the bored cards, the play-and-talk cards, the busy book and the monthly email printable, so each new product costs little to make.
4. **Organized by age stage.** Every product has an age band and names the next product for the child's age, following the Lovevery benchmark in `BRAND.md` without copying any of its names or designs.
5. **Gates, not guesses.** Each product has a gate code (`CAMPAIGN-BIBLE.md` standing rules):
   - **G0:** parent products for ages 0–5. Publish now.
   - **G1:** parent products for ages 5–12. Build now; publish when counsel's answer allows it.
   - **G2:** school, child-care, library, PTA or group-facing. Built but unpublished until counsel clears it.
6. **Kill rule.** Fewer than 5 sales in 60 days after the listing and SEO are fixed: reprice once, then fold the product into a bundle (`ops/QUEUE.md`).
7. **Double-down order.** When a product sells well, the routine builds, in this order: its bundle, its next-age or next-series edition, its Amazon paperback edition, then its translations (`ops/ROUTINE.md`).

**A gate conflict to resolve in Wave 1.** Two of the launch-first five cover ages 5–12: the routine cards include a 5–12 set, and the bored cards include 5–8 and 8–12 bands. Under the gate codes, that part is G1. **Recommendation:** launch the 0–5 content under G0 now. Add the 5–12 set and bands to the same listings as a free update once counsel's answer allows G1. The listing keeps its reviews, and nothing is held back that matters for the holiday season. Two more items sit behind this same answer: ALPHAPLAY Spelling Games (ages 5–8) and the school-age half of the Family Kit. Ask counsel for the G1 answer first and separately (see 2.3, Wave 2).

---

## 2.3 Roadmap by wave

### Wave 1: October to December 2026, the launch-first five and the holidays

**Goal:** real sales and email sign-ups before Black Friday (November 27, 2026), with no physical stock and no school-facing work.

**Blockers to clear first** (nothing can be paid out without them):
- **Bank account.** AlphaPlay LLC's Chase business checking account is closed (`finance/BANKING.md`), so no platform can pay out until a new no-fee business account exists. This is the first step on the critical path.
- **Legal and email setup.** A USPS PO Box, the privacy policy and the business email domain must exist before any marketing email goes out (`MARKETING-PLAYBOOK.md`).
- **Human authorship and AI disclosure.** The founder's rewrite and an honest AI-content answer are needed before any KDP upload (`BRAND.md`; each book's `human_todo`).
- **ISBNs.** Buy your own Bowker ISBNs ($295 for 10, per the playbook) so KDP and a later IngramSpark listing can share one ISBN per format. Keep KDP Expanded Distribution off.

| Product | Gate | Channel | Price | Target date (Assumption unless cited) |
|---|---|---|---|---|
| 1. Visual routine cards (0–5 first) | G0 | Etsy + own site | $9.50 list, about $6.50 on sale; $4.50 starter | Listed by Oct 18 |
| 2. "I'm bored" play cards (0–5 bands first) | G0 | Etsy + own site | $6.50 | Listed by Oct 18 |
| 3. Play-First Family Kit | G0 (2–5 pages); 5–12 pages G1 | Etsy + own site | $11 (list $15.99) | Listed by Oct 31 |
| 4. Toddler busy book printable, 120–150 pages | G0 | Etsy + own site | $15.99 list, about $11–12 on sale | Listed by Nov 13 |
| 5. *100 Screen-Free Plays*: paperback + PDF | G0 | KDP; PDF on Etsy + own site | $16.99 paperback; $9.99 PDF | PDF by Oct 31. Paperback live by Nov 13, since KDP metadata work is scheduled for Oct 12–18 (playbook week 3) and holiday print cutoffs apply [VERIFY KDP holiday timing] |
| *Up! Go! More!* paperback and *The Day the Tablet Slept* paperback | G0 | KDP (+ own-site link) | $11.99 each | After the proofs pass; both files are built |
| Holiday gift bundle + printable gift-reveal card | G0 | Own site + Etsy | See 2.5 (the 2026 version is digital only) | By Oct 31 (`ops/QUEUE.md` #2; BLIND-SPOTS #6) |
| Talk-First Welcome printable gift set | G0 | Own site + Etsy | $14; $4.99 shower insert + bookplate | By Nov 15 (Assumption) |
| Play Recipes for Grandparents | G0 | Own site + Etsy | $12 | November lead campaign (`CAMPAIGN-BIBLE.md` calendar) |
| First alternates: Car Ride & Waiting Pack; first-words flash cards | G0 | Etsy + own site | $6 (list $9.99, run at about $6.49); $6.99 | Only if 1–5 are live by Nov 13; otherwise March |
| Free "3 plays for your child's age" monthly printable | G0 | Own site (email capture) | Free | Live with the first listing (`ops/QUEUE.md` #3) |

**Also in Wave 1:**
- The 30-Day Screen Reset founding beta: 15–30 families, by email only, at $27–$49, from Oct 26 to Nov 22 if the course is ready; otherwise in early January (BLIND-SPOTS #13).
- Seasonal switch: once printer shipping cutoffs pass in December, the home page switches to instant digital gifts (playbook week 11).

**Holiday cutoffs.** Physical gift items need live listings at least 8 weeks before the moment (`CAMPAIGN-BIBLE.md` seasonal rules). For Christmas, that means by about October 30. This is why the only physical items in Wave 1 are KDP paperbacks, which Amazon prints and ships.

**Capacity warning.** Two of the five have not been started (the Family Kit and the busy book). Two more are source files without a listing. If the schedule slips, protect them in this order: routine cards, bored cards, Family Kit, the 100-plays PDF and paperback, then the busy book. The busy book is the one to move into January if needed; winter indoor season still suits it.

### Wave 2: January 2027, the New Year reset and ALPHAPLAY

**Goal:** turn the holiday buyers and the email list into buyers of the 30-Day Screen Reset, and put a real ALPHAPLAY product on sale in time for the trademark deadline.

| Product | Gate | Channel | Price | Date |
|---|---|---|---|---|
| **30-Day Screen Reset** (written daily plan by automated email; no video, no calls) | G0 framing for ages 0–5; 5–12 track when G1 clears | Own site checkout + email platform | $27; $49 bundle; money-back guarantee | Listed in December (DEMAND-CHECK rule 7); public launch Dec 26 (playbook weeks 12–13) |
| Screen Reset paperback edition | G0 | KDP | Price from the KDP calculator [VERIFY] | After the email version has buyers |
| **ALPHAPLAY Spelling Games printable**, "from Play Before Pixels", ages 5–8 | G1, plus counsel question 7 | Own site, with the ALPHAPLAY name next to the buy button | Assumption: $6.50–$9.50, inside the entry band in 2.4 | **Genuinely on sale by mid-January 2027**; dated sales log and screenshots by the internal deadline of Feb 1 (BLIND-SPOTS #9) |
| Talk-First Welcome Bundle (lead campaign) | G0 | Own site + Etsy | $14 printable set | February lead campaign |
| Undated "52 Weeks of Play" calendar | G0 | Etsy + own site | $9 | After the first five are live (DEMAND-CHECK) |
| Car Ride & Waiting Pack (if not in Wave 1) | G0 | Etsy + own site | $6 | Listed by early March for spring travel |
| Spring screen-free week family challenge pack | G0 | Etsy + own site | $6 family ($15 classroom version held) | Listed in March, before National Day of Unplugging (Mar 5–6, 2027) and Screen-Free Week (early May 2027 [VERIFY]). Never use an event's name as a product name |
| Summer Play Kit | G0 | Etsy + own site | $10 | Listed in March 2027 (DEMAND-CHECK #6) |

**The ALPHAPLAY deadline.**
- The Statement of Use or an extension is due **March 8, 2027** for application Serial No. 99650345 (`legal/protection/PROTECTION-PLAN.md` §6b).
- The filing can claim only goods genuinely sold under the ALPHAPLAY name. Token sales and mockups do not count.
- The printable is for ages 5–8, so it sits in G1. It also raises counsel question 7 (any classroom connection). Counsel must answer both before the sworn filing is signed.
- **Fallback if the product is not on sale in time:** file an extension instead, at $125 per class. With all 5 classes still on the application that is $625, and up to five 6-month extensions are allowed (PROTECTION-PLAN §6b).
- The demand check gathered no sales evidence for this product. Its job is to protect the mark, not to drive revenue.

### Wave 3: February to June 2027, the board-book pre-order and Screen-Free Week

**Goal:** the brand's first stocked product, paid for by customers before it is printed and held by a 3PL, never at the founder's home.

**Board-book programme** (`BLIND-SPOTS.md` #11, #16, #17; `board-up-go-more/listing.json`):
1. **Quotes (January).** Get 2–3 offset quotes for a 6×6 in board book at 500, 1,000 and 2,500 copies. Include shipping, duties and 3PL receiving and storage. Ask each printer to confirm, in writing, whether the book counts as a paper-only "ordinary book" under CPSIA. The planning figure is roughly $1.80–$4.00 a copy at 1,000–3,000 copies [VERIFY with quotes].
2. **Price test.** Sell at $12.99 only if the landed unit cost is at or below 35–40% of retail, which means $4.55–$5.20 (DEMAND-CHECK rule 9).
3. **Illustration.** Hire a human illustrator for the print-run books, at about $1,500–$5,000 per board book, under the one freelancer contract.
4. **Pre-sale (February to April, ideally around spring break).**
   - **Funding goal:** printing + shipping + duties + about 8–10% fees + delivery to buyers + a 15% buffer.
   - **Tiers:** 1 book; the 3-book set plus a printable; 10 copies donated to a library or child-care center; bulk 25/100/500. The donation and bulk tiers are group-facing, so they need G2.
   - **Where:** Shopify pre-orders. Kickstarter only if counsel accepts that it shows the creator's verified name [VERIFY].
   - **FTC mail-order rule:** ship by the promised date, or tell buyers and offer a refund.
5. **Order size.** Order what sold plus 30–50%, delivered to the 3PL.
6. **Series.**
   - Books 2 and 3: "Woof! Moo! Beep!" (sounds and animals) and "Yum! Splash! Yawn!" (routines). Both are working titles that need an originality and trademark check first.
   - The Talk-Along Firsts 3-pack at $29.99 exists only once all three books do.
   - If only book 1 is ready in spring, the pre-sale covers book 1 and the 3-pack moves to Wave 4.

**Other Wave 3 products:**

| Product | Gate | Channel | Price | Condition |
|---|---|---|---|---|
| 0–5 Play & Talk POD card deck (52 cards, poker size, tuck box) | G0 + CPSIA gate | Own site via POD, Etsy | $22 | Only after the $7 printable has sold (DEMAND-CHECK #7) and the POD partner supplies a CPC if the deck is marketed to children [VERIFY] |
| First-words POD flash-card deck | G0 + CPSIA gate | Own site via POD, Etsy | $19.99 | After the $6.99 printable sells |
| Personalized *Laps Not Apps* keepsake | G0 | Etsy order → name-stamped PDF → Gelato or Lulu | $34.99 hardcover; $24.99 softcover | Only if the variable-data workflow runs with no manual step [VERIFY] |
| Tablet Tuck-In pouch (tablet and phone sizes) | G0 ritual; G1 Keeper insert | Own site via POD | $24 tablet; $16 phone; $32 Book + Pouch | May lead campaign. Zip only, no drawstring; sold as grown-up storage, not a toy |
| 2–3 cleared adult tees | G0 | Amazon Merch on Demand, own site via POD | $27 | Only designs that pass a trademark and originality check. "Pencils before pixels" is held; "Childhood can't wait. Screens can." and "Paper first" must be cleared first (`legal/DECISION-MEMO.json`) |
| Spanish starter set, La Charla Cuenta (Spanish Screen Reset Pack, study cards, 5-email course) | G0 parent pieces | Own site, Etsy | $12 PDF | March 2027 calendar slot. Every translation gets a reviewed second pass (`ops/ROUTINE.md` 3b) |
| 5–12 family products: Guild Passport, Daylight Deck, Operation Cake, Code Name Crayon, Back-and-Forth Lab, Turn-Taker Badge | G1 | KDP (low-content passport), Etsy, own site | $8.99 passport; $9 deck printable; $14 party kit; $24/$29 Crayon season; $7 lab; $7 badge kit | Only once G1 clears; the calendar names a G0 fallback for every slot |

### Wave 4: July to December 2027, subscription, community editions and languages

**Goal:** recurring revenue and wider reach from content that already exists.

1. **Monthly stage-based printable play kit subscription** (`ops/QUEUE.md`, ideas under research).
   - **What it is:** each month, a kit of plays, a talk-along mini-book and a short "why it matters" guide for grown-ups, matched to the child's age in months. It is fully digital and delivered automatically.
   - **Conditions:**
     - (a) The monthly free "3 plays" email has run long enough to show open and click rates by age band. Assumption: at least 6 months of data.
     - (b) Subscription-law compliance: clear terms before purchase, easy online cancellation, and renewal reminders where state law requires them [VERIFY].
     - (c) The billing tool is the store or the merchant of record, not a new platform, unless the channel rule in 2.8 is met.
   - **Price:** none of the source files sets one. Assumption for testing: $9–$12 a month, anchored against the $9–$15 single printables. Set it after the Wave 1–3 order data is in.
   - The cut Real-World Quest Board idea (`CAMPAIGN-BIBLE.md` §6) shows the risk: subscriptions add support work. Keep the kit strictly digital and self-serve.
2. **Community editions.** Versions of existing content for the adults around a child.
   - Grandparent's play kit, which extends Play Recipes for Grandparents.
   - A screen-free babysitter play kit.
   - A first-phone agreement and phone-free challenges for ages 9–12, bought by parents. It is framed around fun and independence, with no mental-health claims, and the demand check suggests testing it at $5.
   - An adult phone-free evenings planner and a family unplugged weekend kit.
   - All of these are "under research" in `ops/QUEUE.md` and are built only after the monthly demand research supports them.
   - **Gates:** editions sold to parents are G0 or G1. Editions sold to organizations are G2: library, child-care, faith-group and moms'-group licenses, and the "Family Night in a Box" kit.
3. **International languages** (`legal/international-plan.md`; `ops/INTERNATIONAL.md`).
   - **English markets.** The UK, Canada, Australia, New Zealand and Ireland need no translation, so they start in Wave 2: KDP marketplace pricing and merchant-of-record digital sales.
   - **Spanish** starts in Wave 3 with La Charla Cuenta and runs months 4–9.
   - **Wave 4 adds French** (with a Quebec review pass) **and German**, in months 9–18. Brazilian Portuguese follows, digital only.
   - **Cost:** about $5,000 per language for AI drafting plus a professional post-edit (estimate).
   - **Rules:** physical goods abroad sell only through marketplaces that print locally. Board books and the card deck stay US-only until the toy-safety questions are answered.
4. **Retail-readiness work toward Target and other chains.** See 2.9.

### School-facing wave: conditional on employment counsel (G2)

**Status.** Everything here is built or buildable now and stays unpublished until counsel answers the listed questions: `legal/FOR-EMPLOYMENT-COUNSEL.md` Q1–Q3, Q4–Q6, Q10 and Q11 (`MARKETING-PLAYBOOK.md` gate 1).

**Two limits apply even after counsel clears it:**
- Nothing the founder made for or used in her own teaching may be sold.
- Nothing is offered or sent to anyone on the outreach exclusion list in `CLAUDE.md`.

**Launch window if cleared.** Next school window: TPT listings published by Dec 15 for January (playbook week 11), then the August 2027 back-to-school season (`CAMPAIGN-BIBLE.md`).

| Product | Price (`DEMAND-CHECK.md`, `CAMPAIGN-BIBLE.md`) |
|---|---|
| Talk brain breaks (60 cards + slide file) | $5; $4 seasonal packs; $18–$24 bundle |
| SEL talk cards (100, with K–1 picture version) | $5 |
| No-materials indoor recess kit | $6; $4 add-ons |
| Classroom Talk & Play growth bundle | $22–$26 (list $28–$30) |
| Free TPT sampler (10 brain breaks + 1 stem strip) | Free |
| Talk Tower classroom game kit (replaces the cut book) | $6.99; $12.99 site license |
| Host-it-yourself parent-night kit ("What We Know, What We Don't") | $129 single site; $249 multi-site; $39 teacher edition |
| Back-and-Forth Tally, child-care center edition | $39 single site; $129 multi-site |
| Tablet Tuck-In Week kit | $19 classroom; $59 child-care; $129 school |
| 100 Plays Passport, school edition | $19 classroom set; $149 school annual license |
| Education-student and new-teacher starter set | Under research |

**Infrastructure to build first, then publish** (MARKETING-PLAYBOOK move 6):
- a quote form;
- a W-9 sent privately on request;
- PO and net-30 invoices;
- license tiers (personal, classroom, site);
- an automated license stamper;
- a suppression list checked before every batch.

**Channel.** TpT Premium: $59.95 a year, 80% payout (playbook, confirmed by the reviewers). The Basic tier keeps 55% minus $0.30, which is why no TpT single is priced under $5.

---

## 2.4 Pricing ladder

The ladder takes a buyer from a free printable to a $10–$16 core product to a $25–$50 bundle or program. Group licenses stay a separate ladder behind the counsel gate.

| Rung | Price band | Products (sources as above) |
|---|---|---|
| Free (lead magnets) | $0 | "3 plays for your child's age" monthly printable; 30-day tracker; Back-and-Forth Tally home sheet; Waiting Room Wallet; research brief; "Five 5-Minute Screen-Free Plays"; bonus page for every product |
| Entry | $4.50–$7 | Routine-cards starter $4.50; shower insert + bookplate $4.99; Car Ride & Waiting Pack $6; spring challenge pack $6; bored cards $6.50; flash cards $6.99; Play & Talk printable $7; Lab kit $7; Turn-Taker kit $7 |
| Core printables | $9–$16 | 52 Weeks of Play $9; routine cards $9.50 (about $6.50 on sale); 100-plays PDF $9.99; Summer Play Kit $10; Family Kit $11; Play Recipes $12; Spanish Reset Pack $12; Talk-First gift set $14; party kit $14; busy book $15.99 (about $11–12 on sale) |
| Books | $8.99–$19.99 | Guild Passport $8.99; *Up! Go! More!* and *Tablet Slept* paperbacks $11.99; board book $12.99; *100 Screen-Free Plays* paperback $16.99; hardcover $19.99 |
| Programs and bundles | $24–$59 | Play Day bundle $24.99; 100-plays bundle $24.99; Reset $27; 3-pack $29.99; Book + Pouch $32; personalized keepsake $34.99; holiday bundle $39 or $59 with a tee (2027); Reset bundle $49 |
| POD physical | $16–$27 | Phone pouch $16; first-words deck $19.99; Play & Talk deck $22; tablet pouch $24; adult tee $27 |
| Recurring (Wave 4) | Assumption: $9–$12 a month | Stage-based printable kit subscription |
| Group licenses (G2) | $5–$249 | See the school-facing table |

**Pricing rules** (DEMAND-CHECK §4, binding for the routine):
- Put the count in the title ("150 Screen-Free Play Cards").
- Set an anchor list price and sell at 30–40% off on Etsy.
- Never list a single page under $5.
- Bundles are priced 10–25% below the sum of their parts.
- Physical landed cost stays at or below 35–40% of retail.
- The TpT floor is $5.
- No competitor keywords that break rule 1.

**Two conflicts in the sources, and how this plan resolves them:**
- The playbook suggests a $4 "Restaurant & Waiting Room Plays" Etsy entry product. That breaks the under-$5 rule, and the demand check folds that content into the $6 Car Ride & Waiting Pack. **Follow the demand check.**
- The $4.50 routine-cards starter is allowed. It is a smaller tier of the strongest product, not a weak single page.

**Price parity:**
- **Same list price on the own site and Etsy.** Bundles and the monthly subscription may be site-only.
- **Local prices abroad.** On each KDP marketplace, set round local prices by hand; never leave them auto-converted (`international-plan.md` §4.2).

**What a sale is worth, by channel.** This is arithmetic on the unverified fee figures in `storefront-setup-guide.md`; recheck them on sign-up day.

| Example | Channel | Fees per sale | Net to AlphaPlay |
|---|---|---|---|
| $11 Family Kit | Own site, Shopify Payments (2.9% + $0.30) | $0.62 (plus the $39/mo plan, spread across all sales) | $10.38 |
| $11 Family Kit | Etsy ($0.20 listing + 6.5% + 3% + $0.25) | $1.50 ($3.15 if the sale came through Offsite Ads at 15%) | $9.50 ($7.85) |
| $11 Family Kit | Gumroad as merchant of record (10% + $0.50) | $1.60 | $9.40 |
| $6.50 bored cards | Etsy | $1.07 | $5.43 |
| $5 TpT single (G2) | TpT Basic (55% − $0.30) vs Premium (80%) | — | $2.45 vs $4.00 |
| $11.99 paperback | KDP (60% royalty − about $3.24 print) | — | about $3.95 [VERIFY in KDP calculator] |
| $12.99 board book, landed at $4.55–$5.20 | Own site, shipped by the 3PL | $0.68 card fee + 3PL pick, pack and ship [VERIFY quote] | $7.11–$7.76 before 3PL fees |
| $12.99 board book, landed at $4.55–$5.20 | Faire wholesale at about 50% ($6.50), 15% commission on orders Faire finds | $0.98 | $0.32–$0.97; 0% commission on Faire Direct gives $1.30–$1.95 |

**Two points follow from the table.**
- On a $10 digital product, the difference between the own site and a marketplace is about $1. That is small, so the own site's real advantage is the customer email, not the fee.
- The Faire row shows that wholesale does not work for a single $12.99 board book at the 35–40% landed-cost cap. **Assumption:** go to Faire only when landed cost is at or below 25% of retail (about $3.25). The lower half of the $1.80–$4.00 planning range would reach that.

---

## 2.5 Bundles

**Rules** (DEMAND-CHECK §4):
- Weak single products (chore chart, media plan, bucket list, tracker, restaurant mats) appear only inside bundles.
- Bundles cost 10–25% less than the sum of their parts.
- New seasonal packs are added to the relevant bundle automatically.

| Bundle | Contents | Price | Wave | Note |
|---|---|---|---|---|
| **Holiday gift bundle, 2026 (digital)** | Family Kit ($11) + bored cards ($6.50) + Play & Talk printable ($7) + busy book (about $11–12 on sale) + free gift-reveal card | Assumption: $29 (parts about $36; 20% off) | 1 | See the note below this table |
| Holiday gift bundle, 2027 (physical) | Gift-reveal card + Family Kit + POD play deck; + adult tee for the upper tier | $39; $59 with tee (DEMAND-CHECK #8) | 4 | Add the busy book so $39 is 20% below parts ($11 + $22 + $15.99 = $48.99) |
| Play Day bundle | *The Day the Tablet Slept* + *100 Screen-Free Plays* | $24.99 | 1, once both paperbacks are live | The POD partner must be able to ship both titles in one order [VERIFY] |
| 100-plays bundle | Paperback + PDF | $24.99 | 1 | — |
| Talk-along starter (registry) | Built from existing items | $25–$50 (BLIND-SPOTS #6) | 1 digital; 3 with board book | Add a physical starter set only after the 3PL and CPSIA work is done |
| Talk-First gift set | Talk Map, certificate, insert and bookplate | $14; $24 with board book | 1; 3 | — |
| 30-Day Screen Reset bundle | Reset + Family Kit (Assumption on contents) | $49 | 2 | — |
| Talk-Along Firsts 3-pack | Board books 1–3 | $29.99, marked "save" | 3–4 | Only when all three exist |
| Book + Pouch | *Tablet Slept* + tablet pouch | $32 | 3 | — |
| Big Sib bundle | Turn-Taker kit + board book | $26 | 3 | G1 |
| Lab + Family Plan | Back-and-Forth Lab + 5–12 plan | $14 | 3 | G1 |
| Classroom Talk & Play growth bundle | Brain breaks, stems, SEL cards, recess, family letters | $22–$26 | School wave | G2 |

**Why the 2026 holiday bundle is digital only.** The version in `DEMAND-CHECK.md` #8 ($39) uses the POD play deck. But rule 8 allows the POD deck only after the printable sells, so no deck will exist by October 31. That $39 version is also priced above its parts (Family Kit $11 + deck $22 = $33). So the 2026 bundle is digital and can be delivered as an instant last-minute gift, and the physical version waits for 2027.

---

## 2.6 Repeat-purchase design

Marketplaces (Etsy, KDP, IngramSpark) do not let the business contact buyers. So the product itself has to carry the buyer back to the email list. These parts are binding under `BRAND.md` ("Every product leads to the next").

**In every product:**
- **QR code and short link.** Each product carries a QR code and short link to `playbeforepixels.com/bonus/<slug>`. The bonus page delivers a free companion printable and asks for an email, with the child's birth month and year only (no child names; `CAMPAIGN-BIBLE.md` [COPPA]).
- **Closing page.** A "More from Play Before Pixels" last page shows the next products for the child's age.
- **Something to share.** A certificate, badge or fridge sheet, designed to be photographed and posted.

**In every listing.json:**
- `next_products`: 2–3 slugs, covering the next age stage, the matching series item and the best bundle.
- `bonus_url`.
- `amazon_route`.

Today two of four records are missing `next_products` and all four are missing `amazon_route` (see 2.1).

**Stage map** (BLIND-SPOTS #12): these are the moments the email list is timed to.

| Child's age | What the list offers next |
|---|---|
| 0–12 months | Talk-First Welcome set, *Up! Go! More!*, Play & Talk cards |
| 12–36 months | Board-book series, busy book, routine cards, 100 plays |
| 3–5 years | *The Day the Tablet Slept*, bored cards, Family Kit, Car Ride pack |
| 5–8 years | ALPHAPLAY Spelling Games, Guild Passport, Daylight Deck (G1) |
| 8–12 years | Code Name Crayon, Back-and-Forth Lab, first-phone agreement (G1) |

**Email sequences** (written once, then run by the email platform):
- **"3 plays for your child's age" every month**, drafted from the 100-plays guide for months 0–12 first, then the school-age track.
- **After purchase:**
  - day 0, quickstart;
  - day 3, a first-play tip;
  - day 10, a "just reply" check-in;
  - day 14, one neutral review request (never tied to a reward);
  - day 30, the next product.
- **Birthday month:** an email with the next stage's products.

**Series and editions** give buyers a reason to collect:
- the three-book Talk-Along Firsts, with matching spines;
- seasonal editions of the bored cards (summer, rainy day) and of the Play-First checklist (a summer edition each April);
- Daylight Deck expansions (18 cards, $6 printable / $12.99 POD);
- the 100-plays book growing to 150 plays, then 365, in later editions.

**Referral program: one decision needed.**
- `BRAND.md` and `ops/QUEUE.md` specify give $5 / get $5 through the store platform.
- The playbook specifies a bonus printable at 1 friend and 15% off at 3.
- **Recommendation:** give $5 / get $5, because it is the binding brand rule. Add the bonus printable as a no-cost thank-you.
- **Limits either way:** never tie a reward to a review, and never run the referral program with the excluded organizations' staff.

**Subscription.** Wave 4's stage kit (2.3) is the end point of this design: the same stage map, delivered monthly without the parent having to come back and buy.

**What to measure** (from the weekly scorecard in `ops/ROUTINE.md`):
- repeat-order rate by first product;
- email sign-ups per sale by channel (the Etsy and KDP QR scan rate);
- average order value;
- share of revenue from bundles.

The source files set no targets for these. **Assumption:** set targets after 8 weeks of Wave 1 data, not before.

---

## 2.7 Channel plan by wave

| Channel | What sells there | Opens in | Prerequisites | Fees (unverified; source) | Sales tax handled by |
|---|---|---|---|---|---|
| **Own site** (Cloudflare Pages site + Shopify at a shop subdomain) | All printables, bundles, the Reset, links to book retailers; POD items later | Wave 1 | New bank account; Maryland sales-tax registration updated for digital goods (6%); privacy policy; PO Box; Shopify Markets limited to the US until a merchant of record is live | Basic $39/mo; 2.9% + $0.30 per sale (`storefront-setup-guide.md` §1) | AlphaPlay (Maryland return; filing can be automated, `TAX-AUTOPILOT.md`) |
| **Etsy** | Printables; POD items with the production partner listed; personalized keepsake (Wave 3) | Wave 1 | AI-assisted art disclosed; production partner listed for POD | $0.20 listing, 6.5% + 3% + $0.25; Offsite Ads 15% (optional under $10k), 12% mandatory above | Etsy |
| **Amazon KDP** | Paperbacks; Kindle optional; later a KDP activity-book edition of each printable that sells (`amazon_route`) | Wave 1 (US); Wave 2 (UK, CA, AU and other KDP marketplaces) | Own ISBNs; Expanded Distribution off; honest AI disclosure; proofs | 60% royalty at $9.99+ minus print cost; 50% below $9.99 | Amazon (you receive royalties) |
| **IngramSpark** | Same-ISBN paperbacks to bookstores and libraries (55% trade discount reaches Follett Titlewave and Mackin); 32-page hardcovers KDP cannot print | Wave 2 (Assumption, following BLIND-SPOTS: Wave 1 is own site, KDP and Etsy only) | Own ISBNs; GPSR contact fields for EU distribution [VERIFY] | Setup fees removed in 2023; wholesale discount set per title | Retailers |
| **Merchant of record for digital sales abroad** (Gumroad, per `storefront-setup-guide.md` §13 and `international-plan.md` §5.2) | Printables, the Reset, digital kits to buyers outside the US | Wave 2, with the English-market step in `ops/INTERNATIONAL.md` | Accountant confirms the setup; one digital checkout only (not Gumroad and Payhip) | 10% + $0.50 | Gumroad (US sales tax and EU/UK VAT) |
| Bookshop.org affiliate; Amazon Associates | Affiliate links to our own books | Wave 2 (once titles are in the Ingram catalog; once the site has traffic) | Affiliate disclosure; Associates needs 3 sales in 180 days | About 10% and about 4.5% commission | n/a |
| Google Merchant Center free listings; Pinterest catalog | Physical books (ISBN as GTIN); catalog pins | Wave 2 | Checkout stays on Shopify, so no new payouts | $0 | Through the own site |
| **Amazon Merch on Demand** | 2–3 cleared adult tees | Apply in Wave 2 (approval takes weeks to months); sell in Wave 3 | Cleared designs; separate upload | Royalty about 13–37% of list | Amazon |
| **Amazon Seller Central / FBA via 3PL** | Board book, 3-pack, POD-proof decks as stock | Wave 3 | Offset stock at a 3PL or FBA; CPSIA documents; GS1 barcodes; Brand Registry after the PLAY BEFORE PIXELS filing [VERIFY pending-application acceptance] | Professional $39.99/mo; referral about 15%; FBA fees [VERIFY] | Amazon |
| **Social shops** (Meta shop sync; TikTok Shop US) | Physical items only: pouch, tees, decks. TikTok likely bars digital goods [VERIFY] and restricts children's categories | Wave 3 at the earliest (BLIND-SPOTS lists both as "not now" for Wave 1) | Physical catalog exists; kids' category approval where needed | Meta: no selling fee with checkout on our site; TikTok referral 6% or 8% [VERIFY] | Shopify (Meta); TikTok |
| **Faire** | Board books, 3-pack, decks | Late Wave 3 or Wave 4, when offset stock sits at a 3PL | Stock at a 3PL; retailers' resale certificates; CPC on request | 15% commission (0% on Faire Direct); processing 1.9–3.5% or about 3% (conflicting) | Exempt with resale certificate |
| **Walmart Marketplace** | Books and stocked items | Wave 4 application | EIN (held); US bank; an e-commerce track record; approval not guaranteed | No monthly fee; referral 6–15%, books about 15% | Walmart |
| **Teachers Pay Teachers** | Classroom resources | School-facing wave only, after counsel clears it | Counsel answers; suppression list | Premium $59.95/yr, 80% payout | TpT |
| Ebook stores (Apple, Kobo, Google Play; B&N Press for NOOK ebooks only) | Fixed-layout picture-book ebooks | Wave 4, optional | — | About 70% royalty (Kobo about 45% below $2.99) | Store |

**Not used, with the reason:**

| Channel | Reason |
|---|---|
| Booking tools (Calendly, Acuity) | Coaching is banned |
| Amazon Influencer storefront | The faceless rule bars influencer programs |
| Amazon Handmade | POD items don't qualify |
| eBay | Poor fit |
| ACX audiobooks | Wrong format for picture books |
| Stan Store | Duplicates Shopify |
| A second POD partner | Doubles cost-of-goods reconciliation |
| Both Gumroad and Payhip | Two digital checkouts to reconcile |
| B&N Press for print | Duplicates IngramSpark |
| Kids' apparel | Only with CPSIA documents (`storefront-setup-guide.md` Part E) |
| A separate course platform for the Reset | It is delivered by email, and a platform would add another 1099 and monthly export (Assumption) |

**Wave 1 international buyers.** Until the merchant of record is live, buyers outside the US reach digital products through Etsy only. The own-site checkout stays US-only, because EU and UK VAT on digital sales applies from the first sale (`international-plan.md` §1).

---

## 2.8 The rule for adding a channel

Each channel adds a 1099, a monthly export to reconcile and a set of rules to follow (`storefront-setup-guide.md` A6). The routines may not open a platform without the founder's written approval (`ops/ROUTINE.md`, "Never cross a guardrail"). A new channel opens only when **all** of these are true.

1. **Capacity.** The last channel added takes under 2 hours a week of founder time (BLIND-SPOTS #2). **Assumption:** measured over 4 consecutive weekly scorecards.
2. **Product fit.** A product that already passed the compliance gate exists in a form this channel accepts, fulfilled with no founder inventory (digital, POD, or stock at a 3PL or FBA).
3. **Automation.** The routine can list and update through an official API, or through a complete upload packet in `ops/UPLOAD-PACKETS/`. No browser-login automation and no scraping.
4. **Money path.** Payouts go to AlphaPlay LLC's business account. Sales tax is handled by the channel or already covered by our filing. The monthly close can reconcile it through a connector or a single export (`TAX-AUTOPILOT.md` §3).
5. **Rules check.**
   - The channel's rules on AI disclosure, children's products and outside links are logged.
   - The product passes CPSIA or toy-safety checks where they apply.
   - Nothing on the channel needs the founder's face, voice or a follower count.
6. **Gates.**
   - School- or group-facing channels (TpT, school or library quotes) open only after counsel clears them.
   - International channels open only after the region's checklist in `ops/INTERNATIONAL.md` is complete.
7. **Approval.** A one-line yes/no in `ops/APPROVALS.md`, signed off by the founder.
8. **Exit test.** Any channel or product that earns less than its upkeep for 8 weeks is cut or fixed (`ops/ROUTINE.md` weekly scorecard). **Assumption:** upkeep is the fees plus the founder's time valued at the scorecard's money-per-hour figure.

---

## 2.9 What the line must look like before a Target conversation

`marketing/AMAZON-AND-RETAIL-ROADMAP.md` treats big-box retail as a set of milestones, not a promise. For the product line and channels, that means:

**1. Proof comes from Waves 1–3.** A retail buyer is shown:
- 12 months of sales history;
- review counts (all FTC-compliant);
- a strong Amazon presence;
- sell-through data on a line a buyer can place on a shelf.

**2. The shelf line is physical and stocked.** Candidates:
- the three-book Talk-Along Firsts series and its boxed 3-pack;
- the Play & Talk card deck;
- possibly a gift set.

Printables and POD items cannot go on a store shelf.

**3. Readiness list before any pitch:**
- GS1 barcodes owned by AlphaPlay LLC;
- retail-ready packaging;
- product liability insurance at the retailer's limits;
- CPSIA testing and certificates;
- EDI through a 3PL;
- a distributor or sales rep.

**4. Books reach big-box stores through distributors and wholesalers,** usually not by direct vendor setup [VERIFY]. Target Plus (online) is invitation-only [VERIFY]. Walmart Marketplace (Wave 4) is the realistic online big-box step.

**Assumption on timing:** the earliest proof-backed approach to Target is after Wave 4, meaning 2028. That is 12 months after the first stocked product sells, not 12 months after launch, since printables alone are not shelf proof. The plan's retail section should take this as its starting constraint.

---

## 2.10 Decisions this section needs from the founder

1. **Open the new business bank account.** Every channel's payouts depend on it (`finance/BANKING.md`).
2. **Ask counsel for the G1 answer first,** separately from the school questions. It decides the 5–12 halves of the launch-first five, the Reset's school-age track and ALPHAPLAY Spelling Games. It needs to arrive by about mid-December for a mid-January ALPHAPLAY sale.
3. **Pick one name** for the Play-First Family Kit. Other files call the same idea the "Screen Reset Pack" (BLIND-SPOTS) and the "Screen-Smart Family Plan" (playbook).
4. **Referral program:** give $5 / get $5 (recommended) or the playbook's bonus-and-15% version.
5. **Merchant of record:** Gumroad (the current recommendation), or Payhip if it confirms in writing that it is the legal seller for EU/UK VAT. The accountant confirms.
6. **Approve the record fixes in 2.1:**
   - `amazon_route` on every listing;
   - `next_products` on *Laps Not Apps* and *More Talk, Less Tap*;
   - reprice or withdraw the generic *Laps Not Apps*;
   - retire the *More Talk, Less Tap* book channels;
   - remove coaching and the Influencer storefront from the storefront guide.
7. **Board book:** approve the quote request in January, and the pre-sale funding formula before February.
