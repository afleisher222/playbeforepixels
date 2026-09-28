# 4. The Target and Walmart readiness playbook

*Play Before Pixels, a trade name of AlphaPlay LLC (Maryland). Founder and owner: Arielle Fleisher. Section 4 of the expansion business plan. Draft for the founder, September 28, 2026. Internal planning file, not for publication.*

**How to read this section.** Figures taken from repository files name the file beside them. Anything the business has not observed is marked in one of two ways:
- **[VERIFY]** marks a fact about how retailers, distributors, programs or regulators work. It comes from general knowledge, since web search was not available for this draft. Confirm it on a primary source, or in writing from the company concerned, before money is spent or a contract is signed. Most of this section is general knowledge, so most of it carries the tag.
- **(assumption)** marks a planning input chosen for this plan, such as a discount rate, a reserve or a gate threshold. Assumptions are not observations and they are not forecasts. Replace each one with a quote or real data when it arrives.

Retailers and channel companies are named here only as routes to research. None is rated or criticized, and none of these names may appear in public copy unless it passes `ops/COMPLIANCE-GATE.md` (`brand/BRAND.md` hard rule 2).

---

## 4.0 Summary

- **Where we start.** No product is on a store shelf yet, and the business holds no physical stock. The whole line today is digital or print-on-demand (POD), and a big-box store cannot shelve either one. The first product that could go on a shelf is the *Up! Go! More!* board book, printed offset and held by a fulfillment warehouse (3PL). Its pre-sale is planned for February to April 2027 (`business/sections/02-products-channels.md` Wave 3; `marketing/BLIND-SPOTS.md` #16).
- **The route.** Emerging brands usually reach big-box shelves in five stages: proof online, then wholesale to independent stores, then the big-box retailers' online marketplaces, then a distributor or sales rep, and only then a pitch to a buyer. Skipping stages rarely works, because each stage produces the evidence the next one asks for [VERIFY].
- **The hard number.** Selling the board book ourselves through Amazon FBA leaves the brand about 56% of the retail price before product cost. A chain leaves much less: about 26% of retail through a book distributor, and about 34% when we sell direct to a big-box retailer through a commissioned rep (4.4, all rates assumptions). The current pricing rule (landed cost at or below 35–40% of retail, `marketing/DEMAND-CHECK.md` rule 9) is right for our own channels and loses money in chain retail. Any product planned for a chain needs landed cost at or below **20% of retail** (assumption). For the $12.99 board book, that is $2.60 a copy, which the planning quote range ($1.80–$4.00 at 1,000–3,000 copies, BLIND-SPOTS #11) reaches only at the larger runs.
- **The timing.** Earliest proof-backed approach to a buyer: the second half of 2028, after 12 months of *stocked* sales (section 2.9). Earliest realistic store shelf: 2029 (assumption, because chains plan category resets many months ahead [VERIFY]). Big-box websites can come sooner. Walmart Marketplace is a realistic 2027–2028 step, and our IngramSpark books may appear on target.com and walmart.com through wholesaler feeds without any pitch at all [VERIFY].
- **The rules hold.** A 3PL, a sales rep or rep group, and later a distributor do every physical and spoken part of retail. The founder writes, approves and signs, and never stores, ships, calls, meets or presents. Any retail route that requires the founder in person or on camera is declined (4.8).

---

## 4.1 Where the business stands against a retail buyer's checklist today

| What a big-box buyer expects [VERIFY] | Where we are (September 28, 2026) | Source |
|---|---|---|
| A physical, shelf-ready product line | None. Printables, KDP paperbacks and IngramSpark hardcovers only. The POD card-deck files exist (`products/play-talk-cards/pod-later/`: 54 fronts, back and tuck box for two decks) but have not been printed. | `products/`; section 2.1 |
| Sales history on the product being pitched | None yet. Wave 1 launches before Black Friday, November 27, 2026. | `ops/QUEUE.md` |
| Reviews and ratings | None yet | — |
| A registered or pending trademark | PLAY BEFORE PIXELS is not yet cleared or filed. The name is rated medium risk as a descriptive mark. Filing in classes 16 and 41 is planned at $700. ALPHAPLAY (SN 99650345) needs its Statement of Use or an extension by March 8, 2027. | `legal/DECISION-MEMO.json`; `legal/protection/PROTECTION-PLAN.md` §6b, §10 |
| Product liability insurance | Not bought. The plan specifies $1M per occurrence / $2M aggregate CGL with products-completed operations, at about $542 a year on average. | PROTECTION-PLAN §2 |
| Children's product safety documents | None. Board books for ages 0–3 likely need third-party testing and a Children's Product Certificate (CPC). Tracking and batch slots are already boxed in the board-book files. | PROTECTION-PLAN §4; `products/board-up-go-more/listing.json` |
| Barcodes | Bowker ISBNs planned (10 for $295). No GS1 company prefix. | Section 2.3; storefront guide Part A |
| A place that can hold stock and exchange EDI with a retailer | None. No 3PL chosen. | — |
| A bank account to receive payment | **None.** The Chase business checking account is closed. | `finance/BANKING.md` |
| Human-made art on print-run books | Planned: $1,500–$5,000 per board book | BLIND-SPOTS #17 |

This table is not a reason for concern. It shows why the retail plan starts with the online waves already scheduled, and why nothing in this section spends money before Wave 3.

---

## 4.2 How emerging brands actually reach big-box shelves

Everything in this subsection is general industry knowledge and carries [VERIFY] as a whole. The stages overlap, but each one produces the evidence the next one needs.

### Stage 1: Proof online (our Waves 1–3, October 2026 to mid-2027)
Buyers and reps look first for proof that strangers buy the product again and again at full price: Amazon ratings and rank, direct-to-consumer (DTC) sales, email list size and repeat purchase. For us that means the launch-first five, the KDP paperbacks, and then the board-book pre-sale. Printable sales prove the *content* (the plays library, the routine cards). They do not prove a shelf product, so the retail clock starts when the first stocked product sells (section 2.9).

### Stage 2: Wholesale to independent stores (second half of 2027)
Independent toy, gift and book stores buy small quantities, reorder what sells and let a brand learn case packs, wholesale pricing, retail packaging and on-time shipping at low stakes. Our routes:
- **Faire.** Brand application; about 15% commission on retailers Faire brings and 0% through our own Faire Direct links; payment processing about 3% (tiered 1.9–3.5% is also reported); retailers get net-60 terms (`commerce/storefront-setup-guide.md`, `legal/international-plan.md`, all unverified there). A current certificate of insurance at $1M/$2M naming Faire is required for Faire+ status (PROTECTION-PLAN §2). Physical stock only, so this waits for the 3PL (MARKETING-PLAYBOOK "Not now" list).
- **Independent bookstores** order through Ingram. Our IngramSpark titles become orderable when they go live. For offset-printed board books this does not apply, because IngramSpark is print-on-demand [VERIFY whether Ingram offers distribution for publisher-held stock at our volume].
- **Sales-rep groups for gift and toy stores** are commission-only reps who carry several brands to independent stores and at regional gift markets [VERIFY typical commission of 15–20% of wholesale]. A rep staffing a booth keeps the founder out of it (`marketing/EDUCATION-GROUPS.md`: "booths staffed by a hired rep").

The evidence this stage produces is the **reorder rate**. A store that reorders has sold through what it bought, and chain buyers ask for that.

### Stage 3: Online big-box marketplaces (2027–2028)
- **Walmart Marketplace.** Open to apply but approval is not guaranteed. It needs an EIN (AlphaPlay LLC has one), a US address and bank account, and an e-commerce track record. There is no monthly fee. Referral fees run about 6–15%, and about 15% for books (storefront guide, UNVERIFIED). Stock can ship from our 3PL, or through Walmart's own fulfillment service [VERIFY eligibility and fees]. This is the realistic first big-box step, and section 2.3 already places it in Wave 4.
- **Target Plus** is Target's third-party marketplace on target.com. It is invitation-only [VERIFY]. We cannot apply, only become the kind of brand that gets invited: strong ratings elsewhere, clean compliance, a trademark and a product line. Plan it as an outcome, not a task.
- **Target.com and Walmart.com book listings through wholesalers.** Books in wholesaler catalogs often appear on big-box websites automatically, sold by the retailer [VERIFY for each site]. After the IngramSpark titles go live, the routine should check both sites for our ISBNs. This costs nothing and needs no pitch.
- **Amazon Seller Central / FBA** for the board book is not big-box, but buyers read its ratings and rank more than anything else, so it runs alongside this stage. The $1M CGL requirement applies within 30 days of passing $10,000 in gross proceeds in a month (PROTECTION-PLAN §2).

### Stage 4: A distributor or a sales rep (first half of 2028)
Chains rarely buy from a one-person brand with no retail history. They buy through intermediaries they already trust [VERIFY]:
- **For books,** mass merchandisers stock most of their book aisles through a small number of wholesalers that specialize in mass retail. Those wholesalers mostly source from publishers' distributors, not from individual self-publishers [VERIFY which wholesalers supply Target and Walmart books today]. A self-published title usually gets there by signing with a **full-service book distributor**. The distributor warehouses stock, sells the list to wholesalers and chains, invoices, collects and handles returns, and keeps a fee of roughly 20–30% of net receipts [VERIFY]. Distributors are selective and usually want offset print runs, a marketing plan and a list of several titles [VERIFY]. A 3-book board-book series is the minimum credible list. Section 2.3 names books 2 and 3 as working titles ("Woof! Moo! Beep!" and "Yum! Splash! Yawn!"), which still need an originality and trademark check.
- **For card decks and gift sets** (non-book products), brands usually reach chain buyers through **independent manufacturer's reps** who already call on those buyers. They work on commission, commonly 5–15% of wholesale [VERIFY]. Some brands instead sell through a **consolidator or "vendor of record"**, an established vendor that holds the retailer relationship and the vendor setup for smaller brands in exchange for a margin [VERIFY for Target and Walmart in toys, games and gift].
- A traditional or hybrid publishing deal for a proven title is a third route (`AMAZON-AND-RETAIL-ROADMAP.md` §B.6). It moves the retail work to the publisher in exchange for most of the margin. Keep it open as an option to weigh if a title sells strongly.

### Stage 5: The buyer pitch (second half of 2028 at the earliest)
The rep or distributor presents the line at the retailer's category review. The buyer looks at velocity elsewhere, margin, packaging, compliance and the supplier's ability to ship complete and on time [VERIFY]. A first chain order is often a test in a subset of stores or online only, with continued placement depending on sell-through [VERIFY]. Chains plan category resets many months ahead [VERIFY each retailer's line-review calendar], so a successful pitch in late 2028 means a shelf date in 2029.

---

## 4.3 Target-specific and Walmart-specific routes to research

The monthly research run (`ops/ROUTINE.md` §1) should confirm each item in writing from the retailer's own supplier pages and log it in `ops/RESEARCH-LOG.md`. No application is made without the founder's approval in `ops/APPROVALS.md`.

### Target
| Route | What to find out [VERIFY all] | Fit with our rules |
|---|---|---|
| **Target Plus** (marketplace, by invitation) | Whether invitations come from Target's sourcing team, from partner platforms or from a brand-interest form; category restrictions for children's products; fulfillment and insurance terms | Good once invited. The 3PL ships and no stock sits with the founder. |
| **Target's published supplier requirements** (the supplier portal and partner guides, the vendor code of conduct, product safety and quality assurance, packaging and labeling, routing and compliance, the chargeback schedule) | Minimum insurance limits and additional-insured wording; whether national-brand vendors must pass factory social-compliance audits; the retailer's own lab testing protocols on top of CPSIA; EDI documents required; payment terms | Must be met through the printer, the 3PL and the broker. Anything that requires the owner on site or on a call is a stop sign (4.8). |
| **Accelerator and partner programs for emerging brands.** Target has run programs under names such as Target Takeoff and Target Accelerators. | Whether any still runs; the categories; eligibility; and above all whether participation means live cohort sessions, pitch days or filmed founder stories | Likely incompatible with the no-contact and faceless rules if participation is live. Apply only to a program that accepts written participation or a rep in the founder's place. |
| **Book-category supply** | Which wholesalers or distributors supply Target's book and baby book aisles today, and what they require from a publisher (list size, print run, marketing spend, returns terms) | Good. The distributor holds stock and handles returns. |
| **Card and game category** | Whether small card-game and flash-card brands reach Target direct, through reps or through a consolidator | Good through a rep or consolidator. The demand check notes that a 0–5 card brand is already sold at Target (`DEMAND-CHECK.md`, row "0-5 play-prompt deck"), so the format has a home in the store. |

### Walmart
| Route | What to find out [VERIFY all] | Fit with our rules |
|---|---|---|
| **Walmart Marketplace** | Current application criteria, children's-product compliance documents, book referral fee, whether our 3PL or Walmart's fulfillment service handles orders | Good. This is the first big-box step (Wave 4). |
| **Supplier onboarding** (Walmart's supplier onboarding portal and its retail data system) | Insurance limits, the on-time-in-full (OTIF) program and its fines, EDI and item setup, payment terms, whether a small vendor can start online-only | Good through a rep and the 3PL. Walmart's OTIF program fines suppliers a percentage of cost of goods on late or incomplete cases [VERIFY current rate]. That is a direct risk to a small brand. |
| **Book distributors to Walmart** | Same question as for Target: which wholesaler supplies the book aisle, and through which distributors | Good. |
| **Walmart's annual open call for US-made products** | Whether it still runs, whether products must be made, grown or assembled in the US, and whether the pitch is a live meeting | **Likely excluded.** It is built around a live pitch by the supplier, and our planned offset quotes may come from printers abroad. Revisit only if the pitch can be written and the printer is in the US. |

---

## 4.4 The margin walk: why price must survive 50–70% off retail

In chain retail, every party between the printer and the shopper takes a share. Across the chain the brand typically receives only 30–50% of the shelf price, before its own product cost [VERIFY]. The table below uses our own prices from the demand check and the section 2 pricing ladder. **Every rate in it is an assumption**, chosen from commonly reported ranges, until a distributor, rep or retailer quotes in writing.

**Assumptions used in the table:**
- Book mass-retail discount off list: 55%
- Book distributor fee: 25% of net receipts
- Book returns and damages reserve: 15% of net
- Big-box retailer margin on a card deck: 50% of retail
- Rep commission: 15% of wholesale
- Retailer deductions (chargebacks, markdown money, co-op, damages): 8% of wholesale
- 3PL, EDI and freight to the retailer's distribution center (DC): $1.00 a unit for decks; $0.30 a book ($0.60 for the boxed set) shipped in bulk to a distributor
- Faire: 50% wholesale, 15% commission plus 3% processing, $1.00 a unit to pick, pack and ship a small order
- Amazon FBA: 15% referral fee, $3.50 FBA fee, $0.30 inbound freight

| Product and route | Retail price | Brand receives before product cost | Share of retail | Landed cost (planning range) | Contribution per unit |
|---|---|---|---|---|---|
| Board book, own site or Amazon FBA | $12.99 | $7.24 (FBA) | 56% | $1.80–$4.00 (BLIND-SPOTS #11 [VERIFY quotes]) | $5.44 to $3.24 |
| Board book, Faire to an independent store | $12.99 | $4.33 | 33% | $1.80–$4.00 | $2.53 to $0.33 |
| Board book, book distributor into a chain | $12.99 | $3.43 | 26% | $1.80–$4.00 | $1.63 to **−$0.57** |
| Talk-Along Firsts 3-pack boxed set, distributor into a chain | $29.99 | $8.00 | 27% | $6.00–$12.60 (three books plus a $0.60 slipcase, assumption) | $2.00 to **−$4.60** |
| 0–5 Play & Talk card deck, direct to a chain through a rep | $19.99 (assumption: the $22 own-site price in section 2 is above typical chain price points [VERIFY]) | $6.70 | 34% | $2.00–$3.50 (assumption; no offset deck quote exists [VERIFY]) | $4.70 to $3.20 |

**How the chain rows are built:**
- **Board book through a distributor:** $12.99 × 45% = $5.85, less the 25% distributor fee = $4.38, less the 15% returns reserve = $3.73, less $0.30 freight = $3.43.
- **Card deck through a rep:** $19.99 × 50% = $10.00 wholesale, less 15% commission = $8.50, less 8% deductions = $7.70, less $1.00 3PL, EDI and freight = $6.70.

**What the table means:**
1. **Two cost rules, not one.** Keep DEMAND-CHECK rule 9 (landed cost at or below 35–40% of retail) for our own site, Amazon and POD. Add a **retail cost rule**: a product planned for a chain needs landed cost at or below **20% of retail** (assumption), with positive contribution after the returns and deductions reserve. For the board book at $12.99, that is at or below $2.60.
2. **Retail is a volume commitment.** $2.60 is reachable only at the low end of the planning range, meaning larger runs (the range bottoms out at about $1.80 at 3,000 copies, BLIND-SPOTS #11). Ask the January 2027 quotes for 5,000 copies as well as 500, 1,000 and 2,500, so the retail edition can be costed from the start.
3. **The boxed set only works at scale.** At current planning costs the 3-pack loses money through a distributor, except at the lowest print cost. Treat it as a DTC, Amazon and independent-store product until quotes show a landed cost near $6.00.
4. **Card decks carry the best retail margin in the line,** because they are not sold at book discounts. They also need children's-product and possibly toy-safety work (4.5).
5. **Do not solve the margin by raising prices past the market.** Comparable board books sell at $7.27–$15.99 street (DEMAND-CHECK). Lower the cost through run size and packaging design, not the customer's price.
6. **Honest pricing still applies in retail.** No invented "was" prices on packaging or retailer listings (BRAND.md "Honest pricing"; 16 CFR 233.1). The retailer sets its own shelf price. Our suggested retail price is only a suggestion [VERIFY resale-price rules with counsel].

---

## 4.5 The retail readiness checklist

Every item has to be in place before a rep or distributor presents the line. The last column says who does the work, so that nothing falls to the founder except decisions and signatures.

| # | Item | What "ready" means | Cost (source) | Done by |
|---|---|---|---|---|
| 1 | **Trademark** | PLAY BEFORE PIXELS cleared by an attorney and filed (classes 16 and 41 planned). Add class 28 (games and playing cards) before a card deck goes to retail [VERIFY class]. No packaging is printed before clearance, because reprinting retail packaging after a dispute is the costliest fix in the plan. Amazon Brand Registry follows the filing. | $700 for classes 16 + 41 (PROTECTION-PLAN §10); clearance about $500–$2,500 (DECISION-MEMO, unverified); class 28 about $350 (assumption from the per-class fee) | Trademark attorney; founder signs |
| 2 | **Barcodes** | Books use their ISBN as the GTIN (Bowker, 10 for $295). Non-book items (decks, gift sets) need GS1 US GTINs licensed to AlphaPlay LLC. Big-box retailers are generally understood to reject resold barcodes [VERIFY]. Case cartons need their own GTIN-14 and a GS1-128 shipping label, which the 3PL prints [VERIFY]. | ISBNs $295 (section 2.3); GS1 prefix license with an initial and an annual fee scaled to the number of items [VERIFY current GS1 US prices] | Founder buys once; routine keeps the product data sheet |
| 3 | **Retail-ready packaging** | Board books: shrink-wrapped or unwrapped per the retailer's spec, with the barcode on the back cover (the 2 × 1.2 in box already exists in the files). Decks: a rigid two-piece or sturdy tuck box instead of the POD tuck box, with shelf or peg display. Case pack and inner pack counts, carton markings and pallet rules per the retailer's routing guide [VERIFY]. Packaging copy passes BRAND.md: no health claims, no "therapy" or SLP implication, no autism wording, allowed citations only, age grading and safety text. | Built into the printer quote (assumption) | Printer and 3PL; the routine drafts copy and dielines through the compliance gate |
| 4 | **Product liability insurance at retailer limits** | CGL with products-completed operations naming AlphaPlay LLC and Arielle Fleisher, occurrence-based, rated A- or better, with global claims handling (PROTECTION-PLAN §2). Chains often ask for limits above $1M/$2M, and for the retailer as additional insured by endorsement [VERIFY each retailer's minimum]. An umbrella or excess layer usually closes the gap. | CGL about $542 a year on average; umbrella a few hundred dollars a year for $1M (unverified); children's products may price higher (PROTECTION-PLAN) | Insurance broker by email; founder signs |
| 5 | **CPSIA testing and certificates** | Board books for ages 0–3 are outside the ordinary-book exemption, so they need third-party testing at a CPSC-accepted lab and a CPC (PROTECTION-PLAN §4). Permanent tracking label (printer, date, batch); the board-book files already box the "Printed in" and batch slots. Card decks: decide the target age before printing, because a deck marketed to children may be treated as a toy (DECISION-MEMO; also ASTM F963 for toys [VERIFY]). CPSC eFiling of certificate data applies to imported children's products from July 8, 2026 (DECISION-MEMO [VERIFY scope]). Chains may add their own lab protocols on top [VERIFY]. | Lab testing a few hundred dollars per SKU (PROTECTION-PLAN, unverified); CPC $0 to prepare | Printer and a CPSC-accepted lab; customs broker for eFiling; routine keeps the certificate file |
| 6 | **Who is the manufacturer** | Counsel answers PROTECTION-PLAN question 9: is the printer or AlphaPlay LLC the manufacturer or importer that must certify? The answer decides who signs the CPC. | Inside attorney time | Attorney |
| 7 | **3PL with EDI** | A 3PL that receives offset stock, stores it, ships DTC and marketplace orders, ships retail cases to DCs to routing-guide rules, and exchanges the standard retail EDI documents (purchase order, advance ship notice, invoice) directly or through an EDI provider [VERIFY which documents each retailer requires]. Onboarding must be possible by email and portal, with no calls required. | 3PL receiving, storage and pick fees, plus an EDI connection fee per retailer [VERIFY both with quotes] | 3PL and EDI provider; the routine reads portal data only through official APIs |
| 8 | **Fill rate, on-time shipping and chargebacks** | Retailers score vendors on shipping complete and on time, and deduct money for late, short or mislabeled shipments and bad advance ship notices [VERIFY each retailer's schedule]. Ready means: safety stock at the 3PL, a reorder point set from real velocity, and a deduction reserve (8% of wholesale in 4.4, assumption). The routine builds a dispute packet for every deduction, as it already does for chargebacks (`ops/ROUTINE.md` §5b). | The reserve, plus 3PL safety-stock storage | 3PL; routine drafts disputes; founder approves submission |
| 9 | **Cash to fund an order** | Chains pay on terms, often 30–90 days after receipt [VERIFY]. Printers usually want a deposit and payment before shipping [VERIFY]. A first chain order therefore has to be funded months before it pays. Example (assumption): 5,000 decks × $2.75 landed = $13,750 out, before a dollar comes back. Options: pre-sale proceeds, retained profit, or purchase-order financing or factoring at a cost [VERIFY rates]. Each option needs the founder's written approval. | See example | Founder decides; accountant advises |
| 10 | **A distributor or rep, in writing** | A signed agreement that names who presents, who is the vendor of record, the commission or fee, exclusivity (limit it by product and channel, never "all formats worldwide"), the returns terms, the term and how to exit. The agreement must state that the founder takes part in writing only. | Commission or fee per 4.4 | Attorney reviews; founder signs by e-signature |
| 11 | **A 12-month stocked sales record and the proof pack** | See 4.7 | $0 | Routine |
| 12 | **Human-made art on print-run books** | The illustrator contract assigns rights to AlphaPlay LLC and discloses any AI use (BLIND-SPOTS #17). Retail packaging and books then carry art the business can protect. | $1,500–$5,000 per board book; lawyer review of the template $300–$700 (BLIND-SPOTS #17) | Illustrator; founder approves |
| 13 | **Recall and complaint plan** | A written plan for a safety complaint or recall: lot tracing from the tracking label, notice text, and who contacts retailers (the rep or distributor, in writing). | $0 to draft | Routine drafts; attorney reviews |

---

## 4.6 Which products are retail candidates

The rule from section 2.9 still holds: printables, POD items and personalized books cannot go on a store shelf. The candidates are the physical, repeatable formats that the demand check already supports.

| Candidate | Evidence (`DEMAND-CHECK.md`) | Retail role | Conditions |
|---|---|---|---|
| **Talk-Along Firsts board-book series:** *Up! Go! More!* plus books 2 and 3 | Strong category. The Learn-to-Talk series has 1,448 ratings. A self-published imitation book has 196 ratings and a #1 sub-category badge. *My Words Book* shows BSR #580 in Books. *First 100 Words* has sold 8M+ copies. The top sellers lead with SLP authorship, which we cannot claim. | **Lead line.** A series of three with matching spines is what a buyer can shelve. | Offset run at a 3PL; CPSIA testing and CPC; human illustration; books 2 and 3 cleared; retail cost rule met ($2.60 at $12.99) |
| **Talk-Along Firsts 3-pack boxed set** | The 6-book Learn-to-Talk series; "3-book bundle, save $8" listings; box sets sold as separate listings | Gift and holiday item for online big-box and independent stores | Only after all three books exist. It fails the chain margin test at current planning costs (4.4). |
| **0–5 Play & Talk card deck** (52–54 cards) | *Little Talk Deck* has 1,418 ratings at about $27. A 0–5 card brand is already sold at Target. The same content sells strongly as printables (a 10.4k-sale bored-jar shop). | **Second line,** and the best retail margin (4.4) | The $7 printable sells, then the $22 POD deck sells (DEMAND-CHECK rule 8), then an offset deck with retail packaging. Target-age and toy decision; GS1 GTIN; class 28 trademark. |
| **First-words flash-card deck** | Bestseller badges on first-words flash-card printables; *First 100 Words* 8M+ copies | Companion to the board-book series on the same shelf | Same path as the play deck. It reuses the board-book art. |
| **Activity books:** *100 Screen-Free Plays* (later the 150- and 365-play editions) and KDP activity editions of the printables | *Play & Learn Toddler Activities* has 699 ratings. *150+ Screen-Free Activities* has 423 Goodreads ratings. *Toddler's Busy Book* has about 811 ratings and #308 in Family Activity. | Book-aisle title through a distributor, in the parenting section | The retail edition needs an offset run for margin and returnability. The KDP POD paperback is not a retail product. |
| **Family talk-along deck, ages 5–12** | Moderate: 6+ brands with more than one product each | Later line extension | G1: waits for counsel's answer on school-age products (section 2.2) |
| **Book + pouch gift set** (*The Day the Tablet Slept* + Tablet Tuck-In pouch) | The book's demand is weak; the pouch is untested | Not a candidate until the pouch sells DTC | Revisit after the May 2027 campaign |

**Not retail candidates:** printables and every digital product; POD merch and tees; the personalized *Laps Not Apps* keepsake (made to order); site licenses and host-it-yourself kits; the 30-Day Screen Reset.

### The school-facing retail wave (conditional)
Classroom products, library editions and the education channel (school and library book jobbers such as Follett Titlewave and Mackin, and educational-supply and teacher-store retailers [VERIFY]) are **G2**. They stay built but unpublished until the founder's employment counsel answers (`legal/FOR-EMPLOYMENT-COUNSEL.md`; section 2.3). If counsel clears them, they form a separate, later wave with its own gates. Three limits apply even then:
- Nothing the founder made for or used in her own teaching is sold.
- Every name on the outreach exclusion list in `CLAUDE.md` is never contacted, listed or targeted, and the Montgomery County buffer in `marketing/MARKETING-PLAYBOOK.md` applies.
- No retail-rep or distributor agreement may include those organizations as accounts.

---

## 4.7 The numbers a buyer asks for, and how the routine will produce them

Reps, distributors and buyers ask for roughly the same pack [VERIFY]. The routine can assemble it automatically each month from connected sales data, so it is always current when a gate is reached. Recommendation: add a monthly **"retail proof pack"** step to `ops/ROUTINE.md`, written to `business/retail-proof/YYYY-MM.md`.

| Metric | What it shows | Our source | Gate target (assumption) |
|---|---|---|---|
| **Units per week by SKU and channel (velocity)** | Demand without discounting | Shopify, Amazon Seller Central, Faire, Walmart reports | Steady or rising for 6 straight months on the lead SKU |
| **Sell-through at independent stores** | Stock sells off real shelves | Faire reorder data as a proxy; a store survey by email | 30% or more of stocking stores reorder within 120 days |
| **Ratings and reviews** | Social proof buyers can check themselves | Amazon, Etsy, own-site review app (FTC-compliant, no incentives beyond a disclosed free copy, BLIND-SPOTS #14) | Lead SKU at 4.5 stars or above with 300+ ratings. Benchmarks: 196 ratings earned a #1 sub-category badge; category leaders sit at 1,400+. |
| **Amazon Best Sellers Rank history** | Relative position in the category | Seller Central | Held in the top of its sub-category for the gate period |
| **Repeat purchase rate** | The brand, not a one-off gift | Shopify customer data | Tracked from Wave 1; the target is set after 90 days of data |
| **Return and defect rate** | Product quality and packaging | Marketplaces and 3PL | Under 3% |
| **On-time, complete shipping rate** | Operational reliability | 3PL | 98% or more of orders shipped complete and on time |
| **Email list by age band** | An owned audience to send to the retailer's page | Email platform | Tracked; no target set in the source files |
| **Margin sheet per SKU** | The buyer's margin and ours | Section 4.4 table with real quotes | Meets the retail cost rule |
| **Marketing support plan** | How we send shoppers to the retailer | Pins, SEO, email, Amazon Ads first (MARKETING-PLAYBOOK row 10) | Written, faceless, with a budget the founder approved |

No metric may be inflated, estimated without a label, or built on incentivized reviews. A retail deck that overstates sell-through is both a contract risk and an FTC risk.

---

## 4.8 How the faceless, no-inventory and self-running rules are preserved

| Retail function | Who does it | What the founder does | What the routine does |
|---|---|---|---|
| Printing, including retail packaging | Offset printer, under a written quote and PO | Approves the quote and deposit in `ops/APPROVALS.md` | Prepares files, dielines and compliance copy; tracks proofs |
| Children's-product testing and certificates | CPSC-accepted lab; printer; customs broker | Signs the CPC if counsel says AlphaPlay is the certifier | Keeps the certificate file and tracking-label records |
| Storage, picking, retail case shipping, labels | 3PL | Signs the 3PL agreement | Watches stock and reorder points; drafts reorder POs for approval |
| EDI with retailers | 3PL or EDI provider | Signs the service agreement | Reads order and ASN status through official APIs only; flags exceptions |
| Calls, meetings, line reviews, trade shows, buyer questions | Sales rep, rep group or distributor | Never appears. Communicates with the rep in writing only. | Drafts line sheets, sell sheets, the proof pack and written answers |
| Warehousing and returns for books | Distributor | Signs the distribution agreement | Reconciles distributor statements in the monthly close |
| Deductions and chargebacks | 3PL data; rep for context | Approves each dispute submission | Builds the dispute packet within 48 hours, as for card chargebacks |
| Insurance, contracts, trademark | Broker and attorney, by email | Signs | Calendars renewals 30 days ahead (`ops/DEADLINES.md`) |

**Where retail tests the rules, and the answer in each case:**
1. **"The buyer wants to meet the founder."** The rep or distributor is the face of the account, and the agreement says so. If a retailer requires the owner in person, on video or on a call, that route is declined. The same applies to accelerator programs with live cohorts, open-call pitch days and trade-show booths the founder would staff.
2. **"The retailer wants a factory or vendor audit."** The audit is of the printer's facility and the 3PL. Neither involves the founder's home, and her home address never appears on vendor forms (PROTECTION-PLAN §1: principal office is not the home address).
3. **"The retailer's founder-story marketing wants a face."** The brand story stays anonymous and illustrated (`content/founder-story.md`, counsel review before publication). No photo, no video.
4. **Self-running.** Retail is the least automatic channel in the plan. Purchase orders need acknowledgment, stock needs reordering, and deductions need disputing. The 3PL and EDI provider automate the routine parts. Exceptions go into the weekly approval batch under the founder's 60-minute cap (`ops/ROUTINE.md`, "Founder time cap"). **A retail account that regularly pushes approvals past the cap is a signal to hand more of the work to the distributor, not to take on daily tasks.**
5. **No inventory with the founder, ever.** Samples for buyers ship from the 3PL to the rep. Returned and damaged goods go back to the 3PL or distributor, never to the founder's address.
6. **Content rules on packaging.** Retail packaging in this category often promises language outcomes. Ours never does (BRAND.md rules 1 and 3; the autism-search rule). The value line on packaging is what the product *is*: one word per page, a grown-up tip on every page, a play and a talk line on every card.

---

## 4.9 Timeline with gates

Dates are assumptions built on the wave dates in section 2.3. A gate is passed only when every condition is met. If a gate slips, everything after it slips too. Nothing in this table spends money before the founder approves it in `ops/APPROVALS.md`.

| When | Stage | Work | Gate to pass before moving on |
|---|---|---|---|
| **Oct–Dec 2026** | Stage 1: proof online (Wave 1) | Launch-first five; KDP paperbacks; IngramSpark titles live; retail proof pack starts collecting data | **R0, foundations:** business bank account open (`finance/BANKING.md`); counsel's go-ahead for launch; trademark clearance started; CGL insurance in force before the first physical sale |
| **Jan 2027** | Stage 1 | Offset quotes for the board book at 500, 1,000, 2,500 **and 5,000** copies, with 3PL receiving and storage; each printer confirms CPSIA status in writing; illustrator contract sent | Quotes in hand; a retail landed cost calculated for each quantity |
| **Feb–Apr 2027** | Stage 1 (Wave 3 pre-sale) | Board-book pre-sale; CPSIA testing booked; human illustration; PLAY BEFORE PIXELS filed | Pre-sale meets its funding goal (printing + shipping + duties + about 8–10% fees + delivery + 15% buffer, BLIND-SPOTS #16) |
| **May–Jul 2027** | Stage 1 → 2 | Offset run delivered to the 3PL; CPC issued; Amazon Seller Central/FBA listing; own-site sales | **R1, stocked product live:** stock at a 3PL, CPC and tracking labels done, ISBN barcodes printed, first 30 days shipped without a safety complaint |
| **Aug–Dec 2027** | Stage 2: wholesale | Faire (US and Canada first, per the international plan); rep-group test in independent stores; POD card deck sells, then an offset deck quote; Walmart Marketplace application (Wave 4) | **R2, wholesale proven (around Dec 2027):** 90+ days of stocked sales; lead SKU at 4.5+ stars with 50+ ratings (assumption); first independent-store reorders; retail cost rule met at a quoted run size |
| **Jan–Jun 2028** | Stage 3: online big-box | Walmart Marketplace live; target.com and walmart.com checked for Ingram-fed listings; books 2 and 3 published; card deck in retail packaging if the POD deck sold; GS1 GTINs and class 28 filed for the deck | **R3, big-box online proven:** 6+ months live on at least one big-box website; return rate under 3%; on-time shipping 98%+; 150+ ratings on the lead SKU (assumption) |
| **Mid-2028** | Stage 4: distributor or rep | Written approaches to book distributors and to chain-focused reps, using the proof pack; attorney reviews the agreements | **R4, representation signed (around Jul 2028):** 12 months of stocked sales; three-book series live; 300+ ratings at 4.5+ on the lead SKU (assumption); reorder rate of 30%+; EDI tested with the 3PL; insurance quoted at retailer limits; order funding plan approved |
| **Jul–Dec 2028** | Stage 5: buyer pitch | The rep or distributor presents at the relevant line reviews; the founder answers written questions only | **R5, a purchase order**, on terms that pass the 4.4 margin walk with real numbers, funded without personal guarantees (PROTECTION-PLAN §1) |
| **2029** | On shelf | Test in a subset of stores or online first [VERIFY typical first-order shape]; the routine tracks velocity by week | Continued placement depends on sell-through; plan the reorder and the next reset |

**Decision points where the right answer may be "stop here":**
- **At R2:** if independent stores do not reorder, the product is not ready for chains. Stay DTC, Amazon and Faire, and improve the product.
- **At R4:** if no distributor or rep will take the line on written-only terms, stay in stages 2–3. Those channels are profitable at our prices, and chain retail is not required for the business to succeed.
- **At R5:** if the order's funding need or its deduction terms would put the LLC at risk, decline or shrink the order. A chain order that fails through late shipping or unsold returns does more harm than no order.

---

## 4.10 What not to do

- Do not approach Target or Walmart buyers before R4. A first impression without data is hard to undo [VERIFY].
- Do not pay a consultant or "placement" service that promises shelf space for a fee.
- Do not offer the KDP POD paperback as a retail product. It cannot meet retail margins or returns terms.
- Do not print retail packaging before the trademark is cleared and filed.
- Do not sign an exclusive distribution deal covering all formats, all channels or all countries. Keep IngramSpark POD editions and DTC outside any exclusivity, and give the offset retail editions their own ISBNs.
- Do not accept consignment or sale-or-return terms on non-book products without a returns reserve in the margin walk.
- Do not copy the category leaders' packaging claims or keywords ("speech therapy", "SLP", "autism"), even though retail competitors use them (DEMAND-CHECK pricing rule 12).
- Do not describe the brand as "sold at" a retailer in public copy unless it is true that day and the wording passes `ops/COMPLIANCE-GATE.md`.

---

## 4.11 Decisions this section needs from the founder

1. **Adopt the retail cost rule** (landed cost at or below 20% of retail for any product planned for a chain) next to DEMAND-CHECK rule 9, and add it to the board-book `price_notes`.
2. **Approve the January 2027 quote request at four quantities** (500, 1,000, 2,500 and 5,000), so the retail edition is costed from the first quote.
3. **Approve a monthly retail proof pack** in `ops/ROUTINE.md`, starting with Wave 1 data.
4. **Confirm the written-only rule for retail partners:** every rep, distributor and 3PL agreement names the partner as the face of the account.
5. **Add class 28 to the trademark plan** before any card deck is made for retail, and ask the attorney whether class 28 or 16 fits a talk-along card deck.
6. **Ask the insurance broker** for a quote at typical big-box limits alongside the $1M/$2M CGL, so the step-up cost is known early.
7. **Ask counsel two retail questions:** PROTECTION-PLAN question 9 (who certifies under CPSIA), and whether suggesting a retail price to resellers raises any issue [VERIFY].

---

*Sources in this repository: `brand/BRAND.md`, `CLAUDE.md`, `marketing/AMAZON-AND-RETAIL-ROADMAP.md`, `marketing/DEMAND-CHECK.md`, `marketing/BLIND-SPOTS.md`, `marketing/MARKETING-PLAYBOOK.md`, `marketing/CAMPAIGN-BIBLE.md`, `marketing/EDUCATION-GROUPS.md`, `commerce/storefront-setup-guide.md`, `finance/BANKING.md`, `legal/DECISION-MEMO.json`, `legal/protection/PROTECTION-PLAN.md`, `legal/international-plan.md`, `ops/ROUTINE.md`, `ops/QUEUE.md`, `products/board-up-go-more/listing.json`, and sections 1 and 2 of this plan. Everything marked [VERIFY] is general knowledge that must be confirmed on a primary source before any money is spent or any agreement is signed.*
