# 2. Product line, roadmap by wave, pricing and channels

*Play Before Pixels, a trade name of AlphaPlay LLC (Maryland). Section of the expansion business plan. Prepared September 28, 2026.*

> **Decisions made after this plan (September 28, 2026; business/DECISIONS.md). Where this plan disagrees, these win:** the logo is the Maker's Seal only; KDP editions use Amazon's free ISBN; the *30 Days of Back-and-Forth* course is kept, fully self-running, with nothing needed from the founder; launch spending is capped at **$500 with no ads at launch** (business/LAUNCH-BUDGET-500.md). The launch order and prices live in ops/QUEUE.md "LAUNCH FIRST".

**How to read this section.** Every price, count and date comes from the repository files named in brackets. Anything this section adds is marked **Assumption** (a planning choice that can be changed) or **[VERIFY]** (an outside fact that must be checked live before money is spent). No web search was available for this draft, so every platform fee below is carried over from `commerce/storefront-setup-guide.md` and `legal/international-plan.md`, where it is also unverified.

**Binding limits that shape every choice below** (`brand/BRAND.md`, `CLAUDE.md`):
- products only: no coaching, calls, live events or founder appearances; the brand is faceless;
- no inventory held by the founder: digital, print-on-demand (POD), or stock held by a fulfillment warehouse (3PL) or Amazon FBA;
- every offer sells and delivers automatically, run by the Claude Code routines (`ops/ROUTINE.md`);
- no health claims, no autism keywords in any product or listing, never name or criticize a school or company;
- school- and group-facing products stay built but unpublished until the founder's employment counsel answers (`marketing/BLIND-SPOTS.md` #1).

---

## 2.1 Where the line stands today

As of this revision (September 28, 2026), `products/` holds twelve product folders. Eleven have a `listing.json`, the store-ready record, and the routine cards also have a starter-tier record. Only the toddler busy book has no record yet. Other sessions are still adding records, so the routine should regenerate this table from the files before acting on it.

| Product | Folder | Built so far | Demand call (`DEMAND-CHECK.md`) | Everyday price | Wave |
|---|---|---|---|---|---|
| 200+ Visual Routine Cards | `visual-routine-cards` | source, listing.json, starter-tier listing | Keep (strongest evidence: a 2,189-sale shop, several Bestseller badges) | $6.50; $4.50 starter tier | 1 |
| "I'm Bored" Play Cards (150) | `bored-play-cards` | source, Letter/A4, editable and duplex builds, listing.json | Keep (a 10.4k-sale shop) | $6.50 | 1 |
| Play-First Family Kit | `play-first-family-kit` | source, listing.json | Keep | $11 | 1 |
| Toddler busy book printable | `toddler-busy-book` | build folder only | Keep | $11.99 | 1 (or January if the schedule slips) |
| 100 Screen-Free Plays, ages 0–5 | `guide-100-plays` | paperback interior, digital edition, listing.json | Keep (699-rating and 423-rating comparables) | $16.99 paperback; $9.99 PDF | 1 |
| 52 Play & Talk Cards, ages 0–5 | `play-talk-cards` | print PDF, listing.json | Keep, printable first | $6.99 printable; $22 POD deck later | 1 (bundle part), deck when the printable sells |
| *Up! Go! More!* talk-along first words | `board-up-go-more` | listing.json, PDF, cover, mockup | Keep; the offset board book is gated (section 3.10 rule 4) | $11.99 paperback now; $12.99 board book; $29.99 3-pack | 1 (paperback); board book gated |
| *The Day the Tablet Slept* | `picture-tablet-slept` | listing.json, KDP and IngramSpark covers | Reposition (sell as a bedtime and play-day story, mainly inside a bundle) | $11.99 paperback; $19.99 hardcover only after the paperback sells | 1 |
| *Whose Lap Today?* | `picture-laps-not-apps` | listing.json, hardcover and softcover covers, order-to-print notes | Reposition as a personalized keepsake | $34.99 hardcover; $24.99 softcover (personalized, printed per order; no Amazon route) | 3 (personalized), only if the workflow runs with no manual step |
| *More Talk, Less Tap* | `picture-more-talk-less-tap` | listing.json, PDF | **Cut** as a book; the content becomes the Talk Tower game kit | $6.99 kit; $12.99 site license | School-facing wave (G2) |
| 30 Days of Back-and-Forth | `course-screen-reset` | source, emails, funnel, paperback files, listing.json | Keep (written, faceless course) | $27; $49 bundle | 2 |
| Adult tee and tote | `merch-core` | listing.json (2 items) | Tees: 2–3 cleared designs only | $27 tee; $22 tote | 3, after trademark clearance |

Not yet started but scheduled: the holiday gift bundle and gift-reveal card, the Car Ride & Waiting Pack, first-words flash cards and the ALPHAPLAY Spelling Games printable (`ops/QUEUE.md`).

**Record gaps to fix before any upload.** Each of these breaks a binding rule in `BRAND.md` or `ops/COMPLIANCE-GATE.md`. The list is regenerated from the current files.
1. **`amazon_route` missing** on three records: `guide-100-plays`, `play-talk-cards` and `visual-routine-cards` (and its starter-tier file).
2. **`price_floor` missing on all eleven records, and `ai_disclosure` missing on ten.** Only `play-first-family-kit` has an `ai_disclosure`. Both fields are needed to pass gate lines 17 and 18.
3. **Anchor-and-discount price notes that break "Honest pricing"** (16 CFR 233.1):
   - `visual-routine-cards` ("List at $9.50 and run a standing 30–40% sale"; its `price_usd` is still 9.5);
   - `play-talk-cards` ("List at $10.75 and run the usual 35% Etsy sale", and a bundle at "$11.99 (list $17.99)");
   - `guide-100-plays` (PDF "list at $14.99 … about 33% off").

   Each becomes one everyday price: $6.50, $6.99 and $9.99.
4. **`play-first-family-kit`** still points to a "holiday gift bundle ($39 digital + deck)". The 2026 bundle is digital-only at about $29 (2.5).
5. `commerce/storefront-setup-guide.md` still includes a coaching booking tool (Part C §5), coaching in the Shopify catalog and the Amazon Influencer storefront. The first two break the no-live-services rule and the third breaks the faceless rule. This channel plan leaves all three out, and the guide should be corrected to match.

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

**Goal:** real sales and email sign-ups in the 2026 holiday season, with no physical stock and no school-facing work. The listings are built to the October–November dates below, but no listing takes money until **Gate A** is met: a business bank account, employment counsel's go-ahead, general-liability insurance, and the publish safeguards in section 5.6. The financial model assumes first sales in **December 2026**, and each month of slip moves everything back a month (section 3.9).

**Blockers to clear first** (nothing can be paid out without them):
- **Bank account.** AlphaPlay LLC's Chase business checking account is closed (`finance/BANKING.md`), so no platform can pay out until a new no-fee business account exists. This is the first step on the critical path.
- **Legal and email setup.** A USPS PO Box, the privacy policy and the business email domain must exist before any marketing email goes out (`MARKETING-PLAYBOOK.md`).
- **Human authorship and AI disclosure.** The founder's rewrite and an honest AI-content answer are needed before any KDP upload (`BRAND.md`; each book's `human_todo`).
- **ISBNs.** KDP editions use Amazon KDP's free ISBN (founder's decision, business/DECISIONS.md, September 28, 2026; saves about $295). Any later IngramSpark edition needs its own ISBN. Keep KDP Expanded Distribution off.

| Product | Gate | Channel | Price | Target date (Assumption unless cited) |
|---|---|---|---|---|
| 1. Visual routine cards (0–5 first) | G0 | Etsy + own site | $6.50; $4.50 starter | Built by Oct 18; live at Gate A |
| 2. "I'm bored" play cards (0–5 bands first) | G0 | Etsy + own site | $6.50 | Built by Oct 18; live at Gate A |
| 3. Play-First Family Kit | G0 (2–5 pages); 5–12 pages G1 | Etsy + own site | $11 | Built by Oct 31; live at Gate A |
| 4. Toddler busy book printable, 120–150 pages | G0 | Etsy + own site | $11.99 | Built by Nov 13; live at Gate A |
| 5. *100 Screen-Free Plays*: paperback + PDF | G0 | KDP; PDF on Etsy + own site | $16.99 paperback ($7.89 net a copy); $9.99 PDF | PDF by Oct 31. Paperback ready by Nov 13 at the earliest, since KDP metadata work is scheduled for Oct 12–18 (playbook week 3) and holiday print cutoffs apply [VERIFY KDP holiday timing] |
| *Up! Go! More!* paperback and *The Day the Tablet Slept* paperback | G0 | KDP (+ own-site link) | $11.99 each ($3.95 net a copy) | After the proofs pass; both files are built |
| Holiday gift bundle + printable gift-reveal card | G0 | Own site + Etsy | See 2.5 (the 2026 version is digital only) | By Oct 31 (`ops/QUEUE.md` #2; BLIND-SPOTS #6) |
| Talk-First Welcome printable gift set | G0 | Own site + Etsy | $14; $4.99 shower insert + bookplate | By Nov 15 (Assumption) |
| Play Recipes for Grandparents | G0 | Own site + Etsy | $12 | November lead campaign (`CAMPAIGN-BIBLE.md` calendar) |
| First alternates: Car Ride & Waiting Pack; first-words flash cards | G0 | Etsy + own site | $6; $6.99 | Only if 1–5 are ready by Nov 13; otherwise March |
| Free "3 plays for your child's age" monthly printable | G0 | Own site (email capture) | Free | Live with the first listing (`ops/QUEUE.md` #3) |

**Also in Wave 1:**
- 30 Days of Back-and-Forth founding beta moves to **January 2027**. In the autumn the email list will be far too small to fill 15–30 places: the model's Expected list holds about 50 subscribers at the end of December and about 110 at the end of January. Run the beta inside the January public launch as a genuine, dated founding-member offer (BLIND-SPOTS #13), or drop it.
- Seasonal switch: once printer shipping cutoffs pass in December, the home page switches to instant digital gifts (playbook week 11).

**Holiday cutoffs.** Physical gift items need live listings at least 8 weeks before the moment (`CAMPAIGN-BIBLE.md` seasonal rules). For Christmas, that means by about October 30. This is why the only physical items in Wave 1 are KDP paperbacks, which Amazon prints and ships.

**Capacity warning.** Two of the five have not been started (the Family Kit and the busy book). Two more are source files without a listing. If the schedule slips, protect them in this order: routine cards, bored cards, Family Kit, the 100-plays PDF and paperback, then the busy book. The busy book is the one to move into January if needed; winter indoor season still suits it.

### Wave 2: January 2027, the New Year Back-and-Forth and ALPHAPLAY

**Goal:** turn the holiday buyers and the email list into buyers of *30 Days of Back-and-Forth*, and put a real ALPHAPLAY product on sale in time for the trademark deadline.

| Product | Gate | Channel | Price | Date |
|---|---|---|---|---|
| **30 Days of Back-and-Forth** (written daily plan by automated email; no video, no calls) | G0 framing for ages 0–5; 5–12 track when G1 clears | Own site checkout + email platform | $27; $49 bundle; money-back guarantee | Listed in December if Gate A is met (DEMAND-CHECK rule 7); public launch late December or January (playbook weeks 12–13) |
| Screen Reset paperback edition | G0 | KDP | Price from the KDP calculator [VERIFY] | After the email version has buyers |
| **ALPHAPLAY Spelling Games printable**, "from Play Before Pixels", ages 5–8 | G1, plus counsel question 7 | Own site, with the ALPHAPLAY name next to the buy button | Assumption: $6–$7, inside the entry band in 2.4 (the model counts no revenue from it) | **Genuinely on sale by mid-January 2027**; dated sales log and screenshots by the internal deadline of Feb 1 (BLIND-SPOTS #9) |
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

### Wave 3: February to June 2027, spring products and Screen-Free Week (the board book is gated)

**Goal:** spring and summer printables, the POD deck once its printable sells, and cleared tees. **The offset board book is no longer scheduled for spring 2027.** The financial model finds the pre-sale brings in 2–26 copies against a go line of about 920 in every scenario (section 3.9). A 1,000-copy run also lands at about $5.00 a copy, 38% of retail, which fails the own-site cost rule. The programme below runs only when the board-book gate in section 3.10 rule 4 is met:
- (a) six months of positive trailing-12-month results;
- (b) retained cash covers the run;
- (c) the print-on-demand paperback sells at least 40 a month for 3 months;
- (d) quotes meet the channel cost rule;
- (e) product-safety counsel has said who certifies.

Until then, *Up! Go! More!* sells as the $11.99 print-on-demand paperback.

**Board-book programme, when the gate is met** (`BLIND-SPOTS.md` #11, #16, #17; `board-up-go-more/listing.json`):
1. **Quotes (January 2027, information only).** Get 2–3 offset quotes for a 6×6 in board book at 500, 1,000, 2,500 and 5,000 copies. Include shipping, duties and 3PL receiving and storage. Ask each printer to confirm, in writing, whether the book counts as a paper-only "ordinary book" under CPSIA. The planning figure is roughly $1.80–$4.00 a copy at 1,000–3,000 copies [VERIFY with quotes]. A 1,000-copy run sits near the $4.00 end.
2. **Cost test by channel** (section 3.8): landed cost at or below 35% of retail for the own site and FBA ($4.55), 25% for Faire and wholesale ($3.25), and 20% for chain retail ($2.60). At the quote table's planning figures, a 1,000-copy run fails all three, a 2,500-copy run passes the first two, and only a 5,000-copy run passes the chain rule.
3. **Illustration.** Hire a human illustrator for the print-run books, at about $1,500–$5,000 per board book, under the one freelancer contract.
4. **Pre-sale (only after the gate; ideally around spring break).**
   - **Funding goal (go line):** printing + shipping + duties + about 8–10% fees + delivery to buyers + a 15% buffer. Below the go line, refund in full and keep the paperback.
   - **Tiers:** 1 book; the 3-book set plus a printable; 10 copies donated to a library or child-care center; bulk 25/100/500. The donation and bulk tiers are group-facing, so they need G2.
   - **Where:** Shopify pre-orders. Kickstarter only if counsel accepts that it shows the creator's verified name [VERIFY].
   - **FTC mail-order rule:** ship by the promised date, or tell buyers and offer a refund.
5. **Order size.** Order what sold plus 30–50%, delivered to the 3PL.
6. **Series.**
   - Books 2 and 3: "Woof! Moo! Beep!" (sounds and animals) and "Yum! Splash! Yawn!" (routines). Both are working titles that need an originality and trademark check first.
   - The Talk-Along Firsts 3-pack at $29.99 exists only once all three books do.
   - Books 2 and 3 and their runs are priced as gated items ($17,350–$32,000, section 3.4). They are not in the base plan.

**Other Wave 3 products:**

| Product | Gate | Channel | Price | Condition |
|---|---|---|---|---|
| 0–5 Play & Talk POD card deck (52 cards, poker size, tuck box) | G0 + CPSIA gate | Own site via POD, Etsy | $22 | Only after the $6.99 printable has sold (DEMAND-CHECK #7) and the POD partner supplies a CPC if the deck is marketed to children [VERIFY] |
| First-words POD flash-card deck | G0 + CPSIA gate | Own site via POD, Etsy | $19.99 | After the $6.99 printable sells |
| Personalized *Whose Lap Today?* keepsake | G0 | Etsy order → name-stamped PDF → Gelato or Lulu | $34.99 hardcover; $24.99 softcover | Only if the variable-data workflow runs with no manual step [VERIFY] |
| Tablet Tuck-In pouch (tablet and phone sizes) | G0 ritual; G1 Keeper insert | Own site via POD | $24 tablet; $16 phone; $32 Book + Pouch | May lead campaign. Zip only, no drawstring; sold as grown-up storage, not a toy |
| 2–3 cleared adult tees | G0 | Amazon Merch on Demand, own site via POD | $27 (not in the model's revenue until cleared) | Only designs that pass a trademark and originality check. "Pencils before pixels" is held; "Childhood can't wait. Screens can." and "Paper first" must be cleared first (`legal/DECISION-MEMO.json`) |
| Spanish starter set, La Charla Cuenta (Spanish Play-First Family Kit, study cards, 5-email course) | G0 parent pieces | Own site, Etsy | $12 PDF | **Gated on the break-even line** (section 3.10 rule 3; about $4,700–$5,800). Not before two months at or above the line. Every translation gets a reviewed second pass (`ops/ROUTINE.md` 3b) |
| 5–12 family products: Guild Passport, Daylight Deck, Operation Cake, Code Name Crayon, Back-and-Forth Lab, Turn-Taker Badge | G1 | KDP (low-content passport), Etsy, own site | $8.99 passport; $9 deck printable; $14 party kit; $24/$29 Crayon season; $7 lab; $7 badge kit | Only once G1 clears; the calendar names a G0 fallback for every slot |

### Wave 4: July to December 2027, subscription, community editions and languages

**Goal:** recurring revenue and wider reach from content that already exists.

1. **Monthly stage-based printable play kit subscription** (`ops/QUEUE.md`, ideas under research).
   - **What it is:** each month, a kit of plays, a talk-along mini-book and a short "why it matters" guide for grown-ups, matched to the child's age in months. It is fully digital and delivered automatically.
   - **Conditions:**
     - (a) The monthly free "3 plays" email has run long enough to show open and click rates by age band. Assumption: at least 6 months of data.
     - (b) Subscription-law compliance: clear terms before purchase, easy online cancellation, and renewal reminders where state law requires them [VERIFY].
     - (c) The billing tool is the store or the merchant of record, not a new platform, unless the channel rule in 2.8 is met.
   - **Price:** none of the source files sets one. Assumption for testing: $9–$12 a month, set with the $9–$14 single printables in mind. Set it after the Wave 1–3 order data is in.
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
   - **Spanish** starts with La Charla Cuenta once the break-even line has held for two months, not on a fixed date.
   - **French** (with a Quebec review pass) **and German** follow only if Spanish meets the targets set at the quarterly review. Brazilian Portuguese follows, digital only.
   - **Cost:** about $5,000 per language for AI drafting plus a professional post-edit, and $500–$1,500 of legal review per market (estimates). All of this is priced as gated items in section 3.4.
   - **Rules:** physical goods abroad sell only through marketplaces that print locally. Board books and the card deck stay US-only until the toy-safety questions are answered.
4. **Retail-readiness work toward Target and other chains.** This is gated by units sold, not by the calendar. See 2.9 and section 4.9.

### School-facing wave: conditional on employment counsel (G2)

**Status.** Everything here is built or buildable now and stays unpublished until counsel answers the listed questions: `legal/FOR-EMPLOYMENT-COUNSEL.md` Q1–Q3, Q4–Q6, Q10 and Q11 (`MARKETING-PLAYBOOK.md` gate 1). No base figure in the financial model depends on it. It appears only as an overlay, which adds about $1,900 to the Expected year-3 operating result if counsel clears it in writing (section 3.9). Host kits are modelled at near-zero volume, because the demand check found no sales counts for kits and a free leader program competes with them.

**Two limits apply even after counsel clears it:**
- Nothing the founder made for or used in her own teaching may be sold.
- Nothing is offered or sent to anyone on the outreach exclusion list in `CLAUDE.md`.

**Launch window if cleared.** Next school window: TPT listings published by Dec 15 for January (playbook week 11), then the August 2027 back-to-school season (`CAMPAIGN-BIBLE.md`).

| Product | Price (`DEMAND-CHECK.md`, `CAMPAIGN-BIBLE.md`) |
|---|---|
| Talk brain breaks (60 cards + slide file) | $5; $4 seasonal packs; $18–$24 bundle |
| SEL talk cards (100, with K–1 picture version) | $5 |
| No-materials indoor recess kit | $6; $4 add-ons |
| Classroom Talk & Play growth bundle | $22–$26 (one everyday price) |
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
| Entry | $5–$7 | Routine-cards starter $5.00 (D2; $5 is the single-printable floor); shower insert + bookplate $5.00; Car Ride & Waiting Pack $6; spring challenge pack $6; bored cards $6.50; flash cards $6.99; Play & Talk printable $7; Lab kit $7; Turn-Taker kit $7. (Routine cards moved to $9.50 under D1, ops/QUEUE.md.) |
| Core printables | $9–$14 | 52 Weeks of Play $9; 100-plays PDF $9.99; Summer Play Kit $10; Family Kit $11; busy book $11.99; Play Recipes $12; Spanish Reset Pack $12; Talk-First gift set $14; party kit $14 |
| Books | $8.99–$19.99 | Guild Passport $8.99; *Up! Go! More!* and *Tablet Slept* paperbacks $11.99; *100 Screen-Free Plays* paperback $16.99; board book $12.99 and hardcover $19.99 (both gated) |
| Programs and bundles | $24–$59 | Play Day bundle $24.99; 100-plays bundle $24.99; Reset $27; 3-pack $29.99; Book + Pouch $32; personalized keepsake $34.99; holiday bundle $39 or $59 with a tee (2027); Reset bundle $49 |
| POD physical | $16–$27 | Phone pouch $16; first-words deck $19.99; Play & Talk deck $22; tablet pouch $24; adult tee $27 |
| Recurring (Wave 4) | Assumption: $9–$12 a month | Stage-based printable kit subscription |
| Group licenses (G2) | $5–$249 | See the school-facing table |

**Pricing rules** (DEMAND-CHECK §4 as amended by `BRAND.md`; binding for the routine):
- Put the count in the title ("150 Screen-Free Play Cards").
- **One everyday price per product.** No anchor "list" price, no "was" or compare-at price, and no standing sale. `BRAND.md` "Honest pricing" overrides DEMAND-CHECK rule 2 (16 CFR 233.1). Only genuine, dated promotions that truly end are allowed, such as a launch week or Black Friday.
- Never list a single page under $5.
- Bundles are priced 10–25% below the sum of their parts.
- Physical landed cost stays within the channel cost rule: 35% of retail for the own site and FBA, 25% for Faire and wholesale, and 20% for chain retail (section 3.8).
- The TpT floor is $5.
- No competitor keywords that break rule 1.

**Two conflicts in the sources, and how this plan resolves them:**
- The playbook suggests a $4 "Restaurant & Waiting Room Plays" Etsy entry product. That breaks the under-$5 rule, and the demand check folds that content into the $6 Car Ride & Waiting Pack. **Follow the demand check.**
- The $4.50 routine-cards starter is allowed. It is a smaller tier of the strongest product, not a weak single page.

**Price parity:**
- **Same everyday price on the own site and Etsy.** Bundles and the monthly subscription may be site-only.
- **Local prices abroad.** On each KDP marketplace, set round local prices by hand; never leave them auto-converted (`international-plan.md` §4.2).

**What a sale is worth, by channel.** This is arithmetic on the unverified fee figures in `storefront-setup-guide.md`; recheck them on sign-up day. The workbook's Unit Economics tab is the single margin sheet, and the figures below match it (section 3.3).

| Example | Channel | Fees per sale | Net to AlphaPlay |
|---|---|---|---|
| $11 Family Kit | Own site, Shopify Payments (2.9% + $0.30) | $0.62 (plus the $39/mo plan, spread across all sales) | $10.38 |
| $11 Family Kit | Etsy ($0.20 listing + 6.5% + 3% + $0.25) | $1.50 ($3.15 if the sale came through Offsite Ads at 15%) | $9.50 ($7.85) |
| $11 Family Kit | Gumroad as merchant of record (10% + $0.50) | $1.60 | $9.40 |
| $6.50 bored cards | Etsy | $1.07 | $5.43 |
| $5 TpT single (G2) | TpT Basic (55% − $0.30) vs Premium (80%) | — | $2.45 vs $4.00 |
| $16.99 *100 Screen-Free Plays* paperback | KDP (60% royalty − KDP's flat $2.30 B/W print) | — | $7.89 [VERIFY in KDP calculator] |
| $11.99 colour paperback | KDP (60% royalty − about $3.24 print) | — | about $3.95 [VERIFY in KDP calculator] |
| $12.99 board book (gated), 1,000-copy run landed at $5.00 | Own site, shipped by the 3PL ($3.50 pick and pack + about $2 postage absorbed) | $0.68 card fees and refunds | $1.55 |
| $12.99 board book (gated), 1,000-copy run | Amazon FBA (15% referral, $1.80 closing fee, $3.50 FBA, $0.40 storage allowance) [VERIFY] | — | $0.34 |
| $12.99 board book (gated), 1,000-copy run | Faire wholesale at 50% ($6.50): 15% commission, 3% processing, 5% deductions, $1.00 3PL handling | — | **−$1.00** (Faire Direct at 0% commission: about −$0.03) |
| $12.99 board book (gated), 2,500-copy run landed at $2.75 | Own site / FBA / Faire | — | $3.80 / $2.59 / $1.25 |

**Two points follow from the table.**
- On a $10 digital product, the difference between the own site and a marketplace is about $1. That is small, so the own site's real advantage is the customer email, not the fee.
- **Wholesale loses money on a single $12.99 book at current costs.** The first draft of this table left out Faire's 3% processing fee, the deductions reserve and the $1.00 3PL handling charge, and so showed a small profit. With them included, Faire loses about $1.00 a unit at a 1,000-copy landed cost. Faire opens only when landed cost is at or below 25% of retail (about $3.25), which in practice means a 2,500-copy run or larger. Even then it is budgeted as a capped proof expense, not a profit centre (section 4.2).

---

## 2.5 Bundles

**Rules** (DEMAND-CHECK §4):
- Weak single products (chore chart, media plan, bucket list, tracker, restaurant mats) appear only inside bundles.
- Bundles cost 10–25% less than the sum of their parts.
- New seasonal packs are added to the relevant bundle automatically.

| Bundle | Contents | Price | Wave | Note |
|---|---|---|---|---|
| **Holiday gift bundle, 2026 (digital)** | Family Kit ($11) + bored cards ($6.50) + Play & Talk printable ($6.99) + busy book ($11.99) + free gift-reveal card | Assumption: $29 (parts $36.48; about 20% off) | 1 | See the note below this table |
| Holiday gift bundle, 2027 (physical) | Gift-reveal card + Family Kit + POD play deck + busy book; + adult tee for the upper tier | $39; $59 with tee (DEMAND-CHECK #8) | 4 | With the busy book, $39 is 13% below parts ($11 + $22 + $11.99 = $44.99), inside the 10–25% rule |
| Play Day bundle | *The Day the Tablet Slept* + *100 Screen-Free Plays* | $24.99 | 1, once both paperbacks are live | The POD partner must be able to ship both titles in one order [VERIFY] |
| 100-plays bundle | Paperback + PDF | $24.99 | 1 | — |
| Talk-along starter (registry) | Built from existing items | $25–$50 (BLIND-SPOTS #6) | 1 digital; physical only after the board-book gate | Add a physical starter set only after the 3PL and CPSIA work is done |
| Talk-First gift set | Talk Map, certificate, insert and bookplate | $14; $24 with board book | 1; board-book version gated | — |
| 30 Days of Back-and-Forth bundle | Reset + Family Kit + 100-plays PDF + bored cards (`course-screen-reset/listing.json`) | $49 ($54.49 separately; 10% off) | 2 | — |
| Talk-Along Firsts 3-pack | Board books 1–3 | $29.99; show the saving as the real difference from the three single prices | Gated | Only when all three exist. A target.com, Amazon and Q4 gift item, not a chain-shelf item (section 4.6) |
| Book + Pouch | *Tablet Slept* + tablet pouch | $32 | 3 | — |
| Big Sib bundle | Turn-Taker kit + board book | $26 | Gated | G1, and the board-book gate |
| Lab + Family Plan | Back-and-Forth Lab + 5–12 plan | $14 | 3 | G1 |
| Classroom Talk & Play growth bundle | Brain breaks, stems, SEL cards, recess, family letters | $22–$26 | School wave | G2 |

**Why the 2026 holiday bundle is digital only.** The version in `DEMAND-CHECK.md` #8 ($39) uses the POD play deck. But rule 8 allows the POD deck only after the printable sells, so no deck will exist by October 31. That $39 version is also priced above its parts (Family Kit $11 + deck $22 = $33). So the 2026 bundle is digital and can be delivered as an instant last-minute gift, and the physical version waits for 2027.

---

## 2.6 Repeat-purchase design

Marketplaces (Etsy, KDP, IngramSpark) do not let the business contact buyers. So the product itself has to carry the buyer back to the email list. These parts are binding under `BRAND.md` ("Every product leads to the next").

**In every own-site and book edition** (not in Etsy or TpT editions):
- **QR code and short link.** Own-site files and KDP/IngramSpark books carry a QR code and short link to `playbeforepixels.com/bonus/<slug>`. The bonus page delivers a free companion printable and asks for an email, with the child's birth month and year only (no child names; `CAMPAIGN-BIBLE.md` [COPPA]). **Etsy and TpT editions carry no URL or QR code** (`BRAND.md` customer-voice rule 2; `MARKETING-PLAYBOOK` "Don't send buyers off Etsy"; section 5.3, G2-09). Any Etsy-to-list route is limited to what Etsy's own rules allow [VERIFY]. The financial model therefore counts no list sign-ups from Etsy buyers.

**In every product, on every channel:**
- **Closing page.** A "More from Play Before Pixels" last page shows the next products for the child's age.
- **Something to share.** A certificate, badge or fridge sheet, designed to be photographed and posted.

**In every listing.json:**
- `next_products`: 2–3 slugs, covering the next age stage, the matching series item and the best bundle.
- `bonus_url`.
- `amazon_route`.

Today every record has `next_products` and `bonus_url`. Three still lack `amazon_route` (see 2.1).

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
- email sign-ups per sale by channel (the own-site, KDP and IngramSpark QR scan rate; Etsy editions carry no QR code);
- average order value;
- share of revenue from bundles.

The source files set no targets for these. **Assumption:** set targets after 8 weeks of Wave 1 data, not before.

---

## 2.7 Channel plan by wave

| Channel | What sells there | Opens in | Prerequisites | Fees (unverified; source) | Sales tax handled by |
|---|---|---|---|---|---|
| **Own site** (Cloudflare Pages site + Shopify at a shop subdomain) | All printables, bundles, the Reset, links to book retailers; POD items later | Wave 1 | New bank account; Maryland sales-tax registration updated for digital goods (6%); privacy policy; PO Box; Shopify Markets limited to the US until a merchant of record is live | Basic $39/mo; 2.9% + $0.30 per sale (`storefront-setup-guide.md` §1) | AlphaPlay (Maryland return; filing can be automated, `TAX-AUTOPILOT.md`) |
| **Etsy** | Printables; POD items with the production partner listed; personalized keepsake (Wave 3) | Wave 1 | AI-assisted art disclosed; production partner listed for POD | $0.20 listing, 6.5% + 3% + $0.25; Offsite Ads 15% (optional under $10k), 12% mandatory above | Etsy |
| **Amazon KDP** | Paperbacks; Kindle optional; later a KDP activity-book edition of each printable that sells (`amazon_route`) | Wave 1 (US); Wave 2 (UK, CA, AU and other KDP marketplaces) | KDP's free ISBN (business/DECISIONS.md); Expanded Distribution off; honest AI disclosure; proofs | 60% royalty at $9.99+ minus print cost; 50% below $9.99 | Amazon (you receive royalties) |
| **IngramSpark** | HELD for counsel (ops/QUEUE.md "Cut"). Paperbacks under their own ISBNs (KDP editions use the free KDP ISBN) to bookstores and libraries, at a 40% base discount (section 3.3). The *Tablet Slept* hardcover only after the paperback sells. Passive catalog availability (bookstores, libraries, and any target.com or walmart.com listing fed by wholesalers [VERIFY]) is in the base plan. Active library or school marketing, and a 55% discount aimed at school and library jobbers, are G2 and wait for counsel | Wave 2 (Assumption, following BLIND-SPOTS: Wave 1 is own site, KDP and Etsy only) | Own ISBNs (KDP's free ISBN can't be reused here); GPSR contact fields for EU distribution [VERIFY]; HELD for counsel (ops/QUEUE.md) | Setup fees removed in 2023; wholesale discount set per title | Retailers |
| **Merchant of record for digital sales abroad** (Gumroad, per `storefront-setup-guide.md` §13 and `international-plan.md` §5.2) | Printables, the Reset, digital kits to buyers outside the US | Wave 2, with the English-market step in `ops/INTERNATIONAL.md` | Accountant confirms the setup; one digital checkout only (not Gumroad and Payhip) | 10% + $0.50 | Gumroad (US sales tax and EU/UK VAT) |
| Bookshop.org affiliate; Amazon Associates | Affiliate links to our own books | Wave 2 (once titles are in the Ingram catalog; once the site has traffic) | Affiliate disclosure; Associates needs 3 sales in 180 days | About 10% and about 4.5% commission | n/a |
| Google Merchant Center free listings; Pinterest catalog | Physical books (ISBN as GTIN); catalog pins | Wave 2 | Checkout stays on Shopify, so no new payouts | $0 | Through the own site |
| **Amazon Merch on Demand** | 2–3 cleared adult tees | Apply in Wave 2 (approval takes weeks to months); sell in Wave 3 | Cleared designs; separate upload | Royalty about 13–37% of list | Amazon |
| **Amazon Seller Central / FBA via 3PL** | Board book, 3-pack, POD-proof decks as stock | Only when the board-book gate is met (section 3.10 rule 4); not in the 36-month base plan | Offset stock at a 3PL or FBA; CPSIA documents; GS1 barcodes; Brand Registry after the PLAY BEFORE PIXELS filing [VERIFY pending-application acceptance] | Professional $39.99/mo; referral about 15%; FBA fees [VERIFY] | Amazon |
| **Social shops** (Meta shop sync; TikTok Shop US) | Physical items only: pouch, tees, decks. TikTok likely bars digital goods [VERIFY] and restricts children's categories | Wave 3 at the earliest (BLIND-SPOTS lists both as "not now" for Wave 1) | Physical catalog exists; kids' category approval where needed | Meta: no selling fee with checkout on our site; TikTok referral 6% or 8% [VERIFY] | Shopify (Meta); TikTok |
| **Faire** | Board books, 3-pack, decks | Only after the retail gate (section 3.10 rule 5): three physical SKUs and landed cost at or below 25% of retail. US only for anything aimed at ages 0–3. Run as a capped proof expense (section 4.2) | Stock at a 3PL; retailers' resale certificates; CPC on request | 15% commission (0% on Faire Direct); processing 1.9–3.5% or about 3% (conflicting) | Exempt with resale certificate |
| **Walmart Marketplace** | Books and stocked items | After the retail gate; not in the 36-month base plan | EIN (held); US bank; an e-commerce track record; approval not guaranteed | No monthly fee; referral 6–15%, books about 15% | Walmart |
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

**1. Proof comes from units sold, not months elapsed.** A retail buyer or distributor is shown:
- 12 months of *stocked* sales history (printables and POD are not shelf proof);
- velocity and sell-through, reported as units per store per week where stores stock the line, with point-of-sale data where the channel reports it [VERIFY];
- review counts (all FTC-compliant);
- a line a buyer can place on a shelf.

Section 4.9 sets each retail gate as a unit volume.

**2. The shelf line is physical and stocked.** The only in-store candidate is the three-book **Talk-Along Firsts** board-book series, sold through a distributor. The 3-pack is a target.com, Amazon and Q4 gift item. The 0–5 Play & Talk card deck is a conditional candidate once its POD version sells. The first-words flash cards and *100 Screen-Free Plays* stay online and in independent stores (section 4.6). Printables and POD items cannot go on a store shelf.

**3. Readiness list before any pitch** (costed in section 3.8, scheduled by gate in section 4.9):
- GS1 barcodes owned by AlphaPlay LLC for non-book items;
- retail-ready packaging and a separate retail edition;
- product liability insurance at the retailer's limits;
- CPSIA testing and certificates, and state chemical rules for children's products;
- EDI through a 3PL;
- a distributor (books) or a rep or vendor of record (non-book items). AlphaPlay LLC is never the direct vendor of record to a chain.

**4. The near-term Target touchpoint is passive.** Once the IngramSpark paperbacks are live, they may appear on target.com and walmart.com through wholesaler feeds without any pitch [VERIFY]. From then on, the monthly routine checks both sites, and the Target baby registry, for our ISBNs. Target Plus (online) is invitation-only [VERIFY].

**Timing.** Gates, not dates. On the financial model's Expected numbers, the board book, the first shelf-ready product, does not meet its gate within the 36-month horizon (section 3.10 rule 4). So a chain pitch is conditional on one title selling well above Expected, and realistically comes no earlier than 2030 (section 4.9).

---

## 2.10 Decisions this section needs from the founder

1. **Open the new business bank account.** Every channel's payouts depend on it (`finance/BANKING.md`).
2. **Ask counsel for the G1 answer first,** separately from the school questions. It decides the 5–12 halves of the launch-first five, the Reset's school-age track and ALPHAPLAY Spelling Games. It needs to arrive by about mid-December for a mid-January ALPHAPLAY sale.
3. **Pick one name** for the Play-First Family Kit. Other files call the same idea the "Play-First Family Kit" (BLIND-SPOTS) and the "Play-First Family Kit (ages 5–12)" (playbook).
4. **Referral program:** give $5 / get $5 (recommended) or the playbook's bonus-and-15% version.
5. **Merchant of record:** Gumroad (the current recommendation), or Payhip if it confirms in writing that it is the legal seller for EU/UK VAT. The accountant confirms.
6. **Approve the record fixes in 2.1:**
   - `amazon_route` on the three records that lack it;
   - `price_floor` and `ai_disclosure` on every record;
   - one everyday price in the routine-cards, play-talk-cards and 100-plays PDF price notes, with no list or sale pairs;
   - the Family Kit's holiday-bundle note;
   - retire the *More Talk, Less Tap* book channels;
   - remove coaching and the Influencer storefront from the storefront guide.
7. **Board book:** adopt the board-book gate (section 3.10 rule 4) in place of the spring 2027 pre-sale. Approve information-only printer quotes at 500, 1,000, 2,500 and 5,000 copies in January 2027.
