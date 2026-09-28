# 4. The Target and Walmart readiness playbook

*Play Before Pixels, a trade name of AlphaPlay LLC (Maryland). Owner: the founder. Section 4 of the expansion business plan. Revised draft for the founder, September 28, 2026. Internal planning file, not for publication.*

> **Decisions made after this plan (September 28, 2026; business/DECISIONS.md). Where this plan disagrees, these win:** the logo is the Maker's Seal only; KDP editions use Amazon's free ISBN; the *30 Days of Back-and-Forth* course is kept, fully self-running, with nothing needed from the founder; launch spending is capped at **$500 with no ads at launch** (business/LAUNCH-BUDGET-500.md). The launch order and prices live in ops/QUEUE.md "LAUNCH FIRST".

**How to read this section.** Figures taken from repository files name the file beside them. Anything the business has not observed is marked in one of two ways:
- **[VERIFY]** marks a fact about how retailers, distributors, programs or regulators work. It comes from general knowledge, since web search was not available for this draft. Confirm it on a primary source, or in writing from the company concerned, before money is spent or a contract is signed. Most of this section is general knowledge, so most of it carries the tag.
- **(assumption)** marks a planning input chosen for this plan, such as a discount rate, a reserve or a gate threshold. Assumptions are not observations and they are not forecasts. Replace each one with a quote or real data when it arrives.

Retailers and channel companies are named here only as routes to research. None is rated or criticized, and none of these names may appear in public copy unless it passes `ops/COMPLIANCE-GATE.md` (`brand/BRAND.md` hard rule 2).

---

## 4.0 Summary

- **Where we start.** No product is on a store shelf, and the business holds no physical stock. The whole line today is digital or print-on-demand (POD), and a big-box store cannot shelve either. The first product that could go on a shelf is the *Up! Go! More!* board book, printed offset and held by a fulfillment warehouse (3PL).
- **The spring 2027 pre-sale is withdrawn.** Section 3 tests it in every scenario. The pre-sale brings in 2–26 copies against a go line of about 920. A 1,000-copy run lands at about $5.00 a copy, 38% of retail, which fails even the own-site cost rule. The board book is now a gated option (section 3.10 rule 4). It goes ahead only when the POD paperback proves demand (40+ units a month for 3 months) and retained earnings, not customers, pay for a run large enough to meet the cost rule.
- **The route.** Emerging brands usually reach big-box shelves in five stages [VERIFY]:
  1. proof online;
  2. wholesale to independent stores;
  3. the big-box retailers' websites;
  4. a distributor (for books) or a rep or vendor of record (for non-book items);
  5. only then, a buyer's line review.

  Each stage produces the evidence the next one asks for. **AlphaPlay LLC is never the direct vendor of record to a chain** (4.8).
- **The hard numbers** (the workbook's Unit Economics tab is the single margin sheet):
  - Selling the board book ourselves keeps about 50% of retail before product cost on our own site and about 41% through Amazon FBA. A book distributor into a chain leaves about 26%, or 23% with a 25% returns reserve (4.4).
  - Wholesale loses money on a single $12.99 book at a 1,000-copy landed cost: **−$1.00 a unit on Faire**.
  - The cost rule by channel is landed cost at or below 35% of retail for our own channels, 25% for wholesale and 20% for chains. At our planning quotes, only a 5,000-copy run meets the chain rule.
  - The mass book aisle also prices 6 × 6 board books below $12.99 [VERIFY]. A chain line therefore needs its own **retail edition**, printed only against a distributor's or retailer's purchase order.
- **The timing, stated plainly.** The retail gates are unit volumes, not dates (4.9). On the Expected numbers, the board-book gate is not met within the 36-month horizon. The chain pitch is therefore conditional on one title selling well above Expected, and realistically comes **no earlier than 2030**, with a shelf after that.
- **What can happen sooner is passive.** The IngramSpark paperbacks may appear on target.com and walmart.com through wholesaler feeds without any pitch [VERIFY]. The routine checks for them monthly, and for Target baby-registry eligibility.
- **The rules hold.** A 3PL, a distributor, and a rep or vendor of record do every physical and spoken part of retail. The founder writes, approves and signs. She never stores, ships, calls, meets or presents. Any retail route that requires her in person or on camera is declined (4.8).

---

## 4.1 Where the business stands against a retail buyer's checklist today

| What a big-box buyer expects [VERIFY] | Where we are (September 28, 2026) | Source |
|---|---|---|
| A physical, shelf-ready product line | None. Printables, KDP paperbacks and IngramSpark hardcovers only. The POD card-deck files exist (`products/play-talk-cards/pod-later/`: 54 fronts, back and tuck box for two decks) but have not been printed. | `products/`; section 2.1 |
| Sales history on the product being pitched | None yet. Wave 1 listings are built for the holiday season; they take money once Gate A is met (the model assumes December 2026). | `ops/QUEUE.md`; section 3.2 |
| Reviews and ratings | None yet | — |
| A registered or pending trademark | PLAY BEFORE PIXELS is not yet cleared or filed. The name is rated medium risk as a descriptive mark. Filing in classes 16 and 41 is planned at $700. ALPHAPLAY (SN 99650345) needs its Statement of Use or an extension by March 8, 2027. | `legal/DECISION-MEMO.json`; `legal/protection/PROTECTION-PLAN.md` §6b, §10 |
| Product liability insurance | Not bought. The plan specifies $1M per occurrence / $2M aggregate CGL with products-completed operations, at about $542 a year on average, bound before the first sale. Chain limits are quoted separately (4.5 item 4). | PROTECTION-PLAN §2 |
| Children's product safety documents | None. Board books for ages 0–3 likely need third-party testing and a Children's Product Certificate (CPC). Tracking and batch slots are already boxed in the board-book files. | PROTECTION-PLAN §4; `products/board-up-go-more/listing.json` |
| Barcodes | KDP editions use KDP's free ISBN (business/DECISIONS.md); retail or IngramSpark editions would need their own ISBNs (Bowker, 10 for $295). No GS1 company prefix. | Section 2.3; storefront guide Part A |
| A place that can hold stock and exchange EDI with a retailer | None. No 3PL chosen. | — |
| A bank account to receive payment | **None.** The Chase business checking account is closed. | `finance/BANKING.md` |
| Human-made art on print-run books | Planned: $1,500–$5,000 per board book | BLIND-SPOTS #17 |

This table is not a reason for concern. It shows why the retail plan starts with the online waves already scheduled, and why nothing in this section spends money before the board-book gate is met.

---

## 4.2 How emerging brands actually reach big-box shelves

Everything in this subsection is general industry knowledge and carries [VERIFY] as a whole. The stages overlap, but each one produces the evidence the next one needs. Each stage opens on a **unit gate** (4.9), not a date.

### Stage 1: Proof online (from the first-sale month, December 2026 in the model)
Buyers and reps look first for proof that strangers buy the product again and again at full price: velocity, ratings, direct-to-consumer sales, list size and repeat purchase. For us that means the launch-first five, the KDP paperbacks, and above all the **print-on-demand *Up! Go! More!* paperback, which serves as the demand test for the board book**. Printable sales prove the *content* (the plays library, the routine cards). They do not prove a shelf product, so the retail clock starts when the first *stocked* product sells (section 2.9).

### Stage 2: Wholesale to independent stores (after the retail gate, section 3.10 rule 5)
Independent toy, gift and book stores buy small quantities, reorder what sells, and let a brand learn case packs, wholesale pricing, retail packaging and on-time shipping at low stakes. At current costs this stage **loses money on every unit** (4.4). It is therefore run as a **capped proof expense**, with a stated maximum loss approved in `ops/APPROVALS.md`, and not as a profit centre. Assumption: no more than 25 stores and no more than $1,500 of net loss in the test, including samples and handling. Our routes:
- **Faire.** Brand application; about 15% commission on retailers Faire brings and 0% through our own Faire Direct links; payment processing about 3% (tiered 1.9–3.5% is also reported); retailers get net-60 terms (`commerce/storefront-setup-guide.md`, `legal/international-plan.md`, all unverified there). A current certificate of insurance at $1M/$2M naming Faire is required for Faire+ status (PROTECTION-PLAN §2). Stage 2 is **US only for any product aimed at ages 0–3** until the Canadian and other toy-safety questions are answered (section 2.3).
- **Independent bookstores** order through Ingram. Our IngramSpark titles become orderable when they go live. That does not apply to offset-printed board books, because IngramSpark is print-on-demand [VERIFY whether Ingram offers distribution for publisher-held stock at our volume].
- **A commission-only rep group for a regional test.** These reps carry several brands to independent gift and toy stores and at regional markets, typically for 15–20% of wholesale [VERIFY]. A rep staffing a booth keeps the founder out of it (`marketing/EDUCATION-GROUPS.md`: "booths staffed by a hired rep").

This stage produces **sell-through**, measured as **units per store per week** from the stores' reorders and a written store survey. Reorder flags alone are a weak substitute.

### Stage 3: Online big-box marketplaces and wholesaler-fed listings
- **Target.com and Walmart.com book listings through wholesalers.** Books in wholesaler catalogs often appear on big-box websites automatically, sold by the retailer [VERIFY for each site]. This is the **nearest Target touchpoint in the plan**, and it could come in 2027 with the IngramSpark paperbacks. It costs nothing and needs no pitch. Once any ISBN is live on target.com or walmart.com, the monthly routine checks it, checks whether it can be added to **Target's baby registry** [VERIFY], and tracks registry-driven sales where the data is visible. *Up! Go! More!* and the Talk-First Welcome set are natural registry items.
- **Walmart Marketplace.** Open to apply, but approval is not guaranteed. It needs an EIN (AlphaPlay LLC has one), a US address and bank account, and an e-commerce track record. There is no monthly fee. Referral fees run about 6–15%, and about 15% for books (storefront guide, UNVERIFIED). Stock ships from our 3PL or through Walmart's own fulfillment service [VERIFY eligibility and fees]. It opens only after the retail gate.
- **Target Plus** is Target's third-party marketplace on target.com. It is invitation-only [VERIFY]. We cannot apply; we can only become the kind of brand that gets invited: strong ratings elsewhere, clean compliance, a trademark and a product line. The financial model gives it no revenue until an invitation arrives.
- **Amazon Seller Central / FBA** for the board book is not big-box, but buyers read its ratings and rank more than anything else, so it runs alongside this stage. The $1M CGL requirement applies within 30 days of passing $10,000 in gross proceeds in a month (PROTECTION-PLAN §2).

### Stage 4: A distributor for books; a rep or vendor of record for everything else
Chains rarely buy from a one-person brand with no retail history. They buy through intermediaries they already trust [VERIFY]:
- **For books,** mass merchandisers stock most of their book aisles through a small number of wholesalers that specialize in mass retail. Those wholesalers mostly source from publishers' distributors, not from individual self-publishers [VERIFY which wholesalers supply Target and Walmart books today]. A self-published title usually gets there by signing with a **full-service book distributor**. The distributor warehouses stock, sells the list to wholesalers and chains, invoices, collects and handles returns, and keeps a fee of roughly 20–30% of net receipts [VERIFY]. Distributors are selective. They usually want offset print runs, a marketing plan and a list of several titles, and they sell *frontlist* through seasonal catalogs **6–9 months or more before publication** [VERIFY]. **So the order matters.** Send the written distributor submission when book 1 has about 6 months of stocked sales data and books 2 and 3 are still in illustration. Then set books 2 and 3's publication dates to the distributor's selling season, on **separate retail-edition ISBNs**, rather than offering them later as backlist with no trade launch.
- **For card decks and gift sets** (non-book items), brands usually reach chain buyers through **independent manufacturer's reps** who already call on those buyers, commonly for 5–15% of wholesale [VERIFY]. Alternatively they go through a **consolidator or vendor of record**, an established vendor that holds the retailer relationship and the vendor setup for smaller brands in exchange for a margin [VERIFY for Target and Walmart in toys, games and gift]. For us this is the default, not an option. Being a direct chain vendor usually needs a named supplier contact for quality assurance, cost negotiation, audits, recalls and line reviews [VERIFY], and that conflicts with the no-calls, faceless rule.
- **A licensing or co-edition route for the board-book series.** Here a publisher that already sells to chains licenses the series, and the retail work and most of the margin move to the publisher (`AMAZON-AND-RETAIL-ROADMAP.md` §B.6). Go / no-go criteria (assumptions for the attorney to refine):
  - an advance, or a guaranteed minimum royalty, of at least the cost of books 2 and 3 ($17,350 at the low end, section 3.4);
  - a royalty on net receipts in writing;
  - rights limited to named formats and territories, with the DTC, POD and translation rights kept;
  - an out-of-print reversion clause;
  - written-only communication with the founder.

### Stage 5: The buyer's line review
The distributor or rep presents the line at the retailer's category review. The buyer looks at velocity elsewhere, margin, packaging, compliance and the supplier's ability to ship complete and on time [VERIFY]. A first chain order is often a test in a subset of stores or online only, with continued placement depending on sell-through [VERIFY]. Chains plan category resets many months ahead [VERIFY each retailer's line-review calendar], so a successful review usually means a shelf date the following year.

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
| **Walmart Marketplace** | Current application criteria, children's-product compliance documents, book referral fee, whether our 3PL or Walmart's fulfillment service handles orders | Good. It opens only after the retail gate (section 3.10 rule 5). |
| **Supplier onboarding** (Walmart's supplier onboarding portal and its retail data system) | Insurance limits, the on-time-in-full (OTIF) program and its fines, EDI and item setup, payment terms, whether a small vendor can start online-only | Good through a rep and the 3PL. Walmart's OTIF program fines suppliers a percentage of cost of goods on late or incomplete cases [VERIFY current rate]. That is a direct risk to a small brand. |
| **Book distributors to Walmart** | Same question as for Target: which wholesaler supplies the book aisle, and through which distributors | Good. |
| **Walmart's annual open call for US-made products** | Whether it still runs, whether products must be made, grown or assembled in the US, and whether the pitch is a live meeting | **Likely excluded.** It is built around a live pitch by the supplier, and our planned offset quotes may come from printers abroad. Revisit only if the pitch can be written and the printer is in the US. |

---

## 4.4 The margin walk: why price must survive 50–70% off retail

In chain retail, every party between the printer and the shopper takes a share. Across the chain, the brand typically receives only 25–50% of the shelf price, before its own product cost [VERIFY]. The own-channel figures below are taken from the workbook's **Unit Economics** tab, which is the single margin sheet for sections 2–5. **Every chain rate is an assumption**, drawn from commonly reported ranges, until a distributor, rep or retailer quotes in writing.

**Assumptions for the chain rows:**
- mass-retail discount off list for books: 55%;
- distributor fee: 25% of net receipts;
- returns and damages reserve: **15% base, with 25% and 35% tested**;
- big-box retailer margin on a card deck: 50% of retail;
- rep commission: 15% of wholesale;
- retailer deductions (chargebacks, markdown money, co-op, damages): 8% of wholesale;
- freight: $0.30 a book shipped in bulk to a distributor, and $1.00 a unit for 3PL, EDI and freight on decks.

**Landed cost by run size** (Assumptions quote table; all [VERIFY]): 1,000 copies about $5.00 (38% of $12.99); 2,500 copies about $2.75 (21%); 5,000 copies about $2.00 (15%).

| Board book at $12.99, by route | Brand receives before product cost | Share of retail | Net at 1,000-copy run ($5.00) | Net at 2,500 ($2.75) | Net at 5,000 ($2.00) |
|---|---|---|---|---|---|
| Own site, shipped by the 3PL (Unit Economics) | $6.55 | 50% | $1.55 | $3.80 | $4.55 |
| Amazon FBA (Unit Economics; closing fee and storage included) | $5.34 | 41% | $0.34 | $2.59 | $3.34 |
| Walmart Marketplace (Unit Economics) | $4.89 | 38% | −$0.11 | $2.14 | $2.89 |
| Faire to an independent store (Unit Economics) | $4.00 | 31% | **−$1.00** | $1.25 | $2.00 |
| Book distributor into a chain, 15% returns | $3.43 | 26% | **−$1.57** | $0.68 | $1.43 |
| …with 25% returns | $2.99 | 23% | −$2.01 | $0.24 | $0.99 |
| …with 35% returns | $2.55 | 20% | −$2.45 | −$0.20 | $0.55 |

**How the distributor row is built:** $12.99 × 45% = $5.85, less the 25% distributor fee = $4.38, less the returns reserve (15%: $3.73), less $0.30 freight = $3.43.

**Other products through a chain:**

| Product and route | Retail price | Brand receives | Landed cost (planning range) | Contribution per unit |
|---|---|---|---|---|
| Talk-Along Firsts 3-pack, distributor into a chain | $29.99 | $8.00 | $6.00–$12.60 (three books plus a $0.60 slipcase, assumption) | $2.00 to **−$4.60** |
| 0–5 Play & Talk card deck, through a rep or vendor of record | $19.99 (assumption) | $6.70 | $2.00–$3.50 (assumption; no offset deck quote exists [VERIFY]) | $4.70 to $3.20 |

**What the tables mean:**
1. **One cost rule for each channel** (section 3.8): landed cost at or below 35% of retail for our own site and FBA, 25% for Faire and wholesale, and 20% for chain retail. A product is planned for a chain only if it shows positive contribution **with a 25% returns reserve**.
2. **The $12.99 price does not survive the book aisle.** Street prices for comparable board books start at $7.27 (DEMAND-CHECK), and the mass book aisle commonly prices 6 × 6 board books around $5.99–$9.99 [VERIFY Target and Walmart price bands]. At $7.99, the 20% rule allows about $1.60 landed. Even then the distributor route leaves only about $0.12 a copy with a 25% returns reserve. So a chain line needs its **own retail edition**. Ask printers to quote the current 26-page extent (13 boards) against a 14–18-page extent and a smaller trim, at 5,000 and 10,000 copies. Then set the retail price from verified aisle price bands, not from our own-site price.
3. **The margin needs volume, and only a chain or distributor order justifies that volume.** A chain-sized run is **printed only against a distributor's or retailer's purchase order, never on speculation**. That order must also fit the funded ceiling in 4.5 item 9.
4. **The boxed set works only at scale.** At current planning costs the 3-pack loses money through a distributor unless the print cost is at the lowest end. It is a target.com, Amazon and Q4 gift item, not a chain-shelf item.
5. **Card decks keep more margin than books** because they are not sold at book discounts. But the deck is only a conditional candidate (4.6).
6. **Do not solve the margin by raising prices past the market.** Lower the cost through run size, extent and packaging design.
7. **Honest pricing still applies in retail.** No invented "was" prices on packaging or retailer listings (`BRAND.md` "Honest pricing"; 16 CFR 233.1). The retailer sets its own shelf price, and our suggested retail price is only a suggestion [VERIFY resale-price rules with counsel].

---

## 4.5 The retail readiness checklist

Every item has to be in place before a rep or distributor presents the line. The last column says who does the work, so that nothing falls to the founder except decisions and signatures.

| # | Item | What "ready" means | Cost (source) | Done by |
|---|---|---|---|---|
| 1 | **Trademark** | PLAY BEFORE PIXELS cleared by an attorney and filed (classes 16 and 41 planned). Add class 28 (games and playing cards) before a card deck goes to retail [VERIFY class]. No packaging is printed before clearance, because reprinting retail packaging after a dispute is the costliest fix in the plan. **Before R4, the application must have passed its first examination without a substantive refusal (or be published), with the ALPHAPLAY or fallback-brand plan ready.** Amazon Brand Registry follows the filing. | $700 for classes 16 + 41 (PROTECTION-PLAN §10); clearance about $500–$2,500 (DECISION-MEMO, unverified); class 28 about $350 (assumption from the per-class fee) | Trademark attorney; founder signs |
| 2 | **Barcodes** | Books use their ISBN as the GTIN (KDP editions: KDP's free ISBN; any retail or IngramSpark edition needs its own, Bowker 10 for $295). Non-book items (decks, gift sets) need GS1 US GTINs licensed to AlphaPlay LLC. Big-box retailers are generally understood to reject resold barcodes [VERIFY]. Case cartons need their own GTIN-14 and a GS1-128 shipping label, which the 3PL prints [VERIFY]. | ISBNs $295 (section 2.3); GS1 prefix license with an initial and an annual fee scaled to the number of items [VERIFY current GS1 US prices] | Founder buys once; routine keeps the product data sheet |
| 3 | **Retail-ready packaging** | Board books: shrink-wrapped or unwrapped per the retailer's spec, with the barcode on the back cover (the 2 × 1.2 in box already exists in the files). Decks: a rigid two-piece or sturdy tuck box instead of the POD tuck box, with shelf or peg display. Case pack and inner pack counts, carton markings and pallet rules per the retailer's routing guide [VERIFY]. Packaging copy passes BRAND.md: no health claims, no "therapy" or SLP implication, no autism wording, allowed citations only, age grading and safety text. | Built into the printer quote (assumption) | Printer and 3PL; the routine drafts copy and dielines through the compliance gate |
| 4 | **Product liability insurance at retailer limits** | CGL with products-completed operations naming AlphaPlay LLC and the owner, occurrence-based, rated A- or better, with global claims handling (PROTECTION-PLAN §2). Chains often ask for limits above $1M/$2M and for the retailer as additional insured by endorsement [VERIFY each retailer's minimum]. Premiums for products for children under 3 usually scale with sales [VERIFY]. An umbrella or excess layer usually closes the gap. | Direct-sales CGL about $542 a year on average. **Chain limits are their own line in section 3.8**: a broker binder at $100–$500 one-time plus a $50–$250 monthly uplift, to be replaced by a sales-scaled quote | Insurance broker by email; founder signs |
| 5 | **CPSIA testing and certificates** | Board books for ages 0–3 are outside the ordinary-book exemption, so they need third-party testing at a CPSC-accepted lab and a CPC (PROTECTION-PLAN §4). Permanent tracking label (printer, date, batch); the board-book files already box the "Printed in" and batch slots. Card decks: decide the target age before printing, because a deck marketed to children may be treated as a toy (DECISION-MEMO; also ASTM F963 for toys [VERIFY]). CPSC eFiling of certificate data applies to imported children's products from July 8, 2026 (DECISION-MEMO [VERIFY scope]). Chains may add their own lab protocols on top [VERIFY]. | Lab testing a few hundred dollars per SKU (PROTECTION-PLAN, unverified); CPC $0 to prepare | Printer and a CPSC-accepted lab; customs broker for eFiling; routine keeps the certificate file |
| 6 | **Who is the manufacturer** | Counsel answers PROTECTION-PLAN question 9: is the printer or AlphaPlay LLC the manufacturer or importer that must certify? The answer decides who signs the CPC. | Inside attorney time | Attorney |
| 7 | **3PL with EDI** | A 3PL that receives offset stock, stores it, ships DTC and marketplace orders, ships retail cases to DCs to routing-guide rules, and exchanges the standard retail EDI documents (purchase order, advance ship notice, invoice) directly or through an EDI provider [VERIFY which documents each retailer requires]. Onboarding must be possible by email and portal, with no calls required. | 3PL receiving, storage and pick fees, plus an EDI connection fee per retailer [VERIFY both with quotes] | 3PL and EDI provider; the routine reads portal data only through official APIs |
| 8 | **Fill rate, on-time shipping and chargebacks** | Retailers score vendors on shipping complete and on time, and deduct money for late, short or mislabeled shipments and bad advance ship notices [VERIFY each retailer's schedule]. Ready means: safety stock at the 3PL, a reorder point set from real velocity, and a deduction reserve (8% of wholesale in 4.4, assumption). The routine builds a dispute packet for every deduction, as it already does for chargebacks (`ops/ROUTINE.md` §5b). | The reserve, plus 3PL safety-stock storage | 3PL; routine drafts disputes; founder approves submission |
| 9 | **Cash to fund an order, within a funded ceiling** | Chains pay on terms, often 30–90 days after receipt [VERIFY]. Printers usually want a deposit and payment before shipping [VERIFY]. A first chain order therefore has to be funded months before it pays. **Funded ceiling (assumption):** no chain order larger than retained cash minus the 3-month reserve, and never more than one print run at the chosen retail edition. Sources to test that need no personal guarantee: (a) distributor-funded printing, (b) the retailer's own terms or a deposit, (c) a publisher licence or co-edition (4.2). Purchase-order financing and factoring for a thinly capitalised new LLC commonly ask for a personal guarantee [VERIFY], which `PROTECTION-PLAN` rules out, so they are not used. | Example (assumption): 5,000 decks × $2.75 landed = $13,750 out before a dollar comes back | Founder decides; accountant advises |
| 10 | **A distributor or rep, in writing** | A signed agreement that names who presents, who is the vendor of record, the commission or fee, exclusivity (limit it by product and channel, never "all formats worldwide"), the returns terms, the term and how to exit. The agreement must state that the founder takes part in writing only. | Commission or fee per 4.4 | Attorney reviews; founder signs by e-signature |
| 11 | **A 12-month stocked sales record and the proof pack** | See 4.7 | $0 | Routine |
| 12 | **Human-made art on print-run books** | The illustrator contract assigns rights to AlphaPlay LLC and discloses any AI use (BLIND-SPOTS #17). Retail packaging and books then carry art the business can protect. | $1,500–$5,000 per board book; lawyer review of the template $300–$700 (BLIND-SPOTS #17) | Illustrator; founder approves |
| 13 | **Recall and complaint plan** | A written plan for a safety complaint or recall: lot tracing from the tracking label, notice text, and who contacts retailers (the rep or distributor, in writing). | $0 to draft | Routine drafts; attorney reviews |
| 14 | **State chemical rules for children's products** | California Proposition 65 warnings where they apply, and state chemical-reporting or chemical-limit laws for children's products (for example PFAS and chemicals-of-concern rules) [VERIFY the current state list]. The printer certifies ink, board and coating content in writing. | Inside the printer's documentation and attorney time | Printer; product-safety attorney |
| 15 | **Retailer-approved lab** | Many chains require testing at a lab on their own approved list, on top of CPSIA [VERIFY each retailer]. Book the CPSIA test at a lab that is both CPSC-accepted and on the target retailer's list, so the product is not tested twice. | Within the CPSIA test cost | Lab; routine keeps the file |
| 16 | **Country of origin and tariff decision** | Decide between a US printer and an overseas printer before the retail edition is quoted. Record the tariff treatment of imported printed books and board books [VERIFY current treatment], and note that the Walmart US-made route needs US printing (4.3). | Part of the quote comparison | Founder decides from quotes; customs broker |
| 17 | **Barcode price add-on** | Book barcodes may need the EAN-5 price add-on for some retail channels [VERIFY]. The printer places it on the retail-edition ISBN. | $0 | Printer; routine keeps the product data sheet |

---

## 4.6 Which products are retail candidates

The rule from section 2.9 still holds: printables, POD items and personalized books cannot go on a store shelf. The honest short list is shorter than in the first draft. **The only in-store candidate is the three-book Talk-Along Firsts series, sold through a distributor.** Everything else is an online, independent-store or conditional item.

| Candidate | Evidence (`DEMAND-CHECK.md`) | Retail role | Conditions |
|---|---|---|---|
| **Talk-Along Firsts board-book series:** *Up! Go! More!* plus books 2 and 3 | Strong category. The Learn-to-Talk series has 1,448 ratings. A self-published imitation book has 196 ratings and a #1 sub-category badge. *My Words Book* shows BSR #580 in Books. *First 100 Words* has sold 8M+ copies. The top sellers lead with SLP authorship, which we cannot claim. | **The in-store candidate**, through a distributor or a publisher licence (4.2). Department: books (baby and board books) [VERIFY how each chain assigns it]. | The board-book gate (section 3.10 rule 4); offset run at a 3PL; CPSIA testing and CPC; human illustration; books 2 and 3 cleared; a separate retail edition that meets the chain cost rule with a 25% returns reserve (4.4) |
| **Talk-Along Firsts 3-pack boxed set** | The 6-book Learn-to-Talk series; "3-book bundle, save $8" listings; box sets sold as separate listings | **A target.com, Amazon and Q4 gift item**, plus independent stores; not a chain-shelf item | Only after all three books exist. It fails the chain margin test at current planning costs (4.4). |
| **0–5 Play & Talk card deck** (52–54 cards) | DEMAND-CHECK rates the 0–5 deck "unclear as a deck; strong as content". *Little Talk Deck* (1,418 ratings, about $27) is the comparable for the 5–12 family deck, not the 0–5 deck. A 0–5 card brand is sold at Target. The $19.99 retail price and the $2.00–$3.50 landed cost are assumptions. | **Conditional candidate only** | The $6.99 printable sells, then the $22 POD deck sells with its own sell-through data (DEMAND-CHECK rule 8). Decide the intended user now: a deck the grown-up reads may avoid toy classification [VERIFY with counsel]. Name the department first (toys and games, baby, or books), because it sets the buyer, the margin, whether toy-safety rules (ASTM F963) apply, and the rep type that covers it. Then GS1 GTIN and the class 28 trademark. |
| **First-words flash-card deck** | Bestseller badges on first-words flash-card *printables*; a traditional title's 8M+ copies | **Online and independent stores only.** A low-price category led by large publishers [VERIFY typical mass price]. | POD first; reuses the board-book art |
| **Activity books:** *100 Screen-Free Plays* (later 150 and 365 plays) and KDP activity editions | *Play & Learn Toddler Activities* has 699 ratings; *150+ Screen-Free Activities* 423 Goodreads ratings; *Toddler's Busy Book* about 811 ratings | **Online and independent stores only.** A parenting trade paperback has little space in mass stores. | Stays print-on-demand through KDP and IngramSpark |
| **Family talk-along deck, ages 5–12** | Moderate: 6+ brands with more than one product each | Later line extension | G1: waits for counsel's answer on school-age products (section 2.2) |
| **Book + pouch gift set** (*The Day the Tablet Slept* + Tablet Tuck-In pouch) | The book's demand is weak; the pouch is untested | Not a candidate until the pouch sells direct | Revisit after the May 2027 campaign |

**Not retail candidates:** printables and every digital product; POD merch and tees; the personalized *Whose Lap Today?* keepsake (made to order); site licenses and host-it-yourself kits; *30 Days of Back-and-Forth*.

### The school-facing retail wave (conditional)
Classroom products, library editions and the education channel (school and library book jobbers such as Follett Titlewave and Mackin, and educational-supply and teacher-store retailers [VERIFY]) are **G2**. They stay built but unpublished until the founder's employment counsel answers (`legal/FOR-EMPLOYMENT-COUNSEL.md`; section 2.3). If counsel clears them, they form a separate, later wave with its own gates. Three limits apply even then:
- Nothing the founder made for or used in her own teaching is sold.
- Every name on the outreach exclusion list in `CLAUDE.md` is never contacted, listed or targeted, and the Montgomery County buffer in `marketing/MARKETING-PLAYBOOK.md` applies.
- No retail-rep or distributor agreement may include those organizations as accounts.

---

## 4.7 The numbers a buyer asks for, and how the routine will produce them

Book buyers and distributors judge mainly on **point-of-sale data**, such as Circana BookScan, and on **units per store per week** [VERIFY]. Amazon ratings and our own-site data are supporting evidence, not the main case. Own-site sales and third-party FBA sales of the board book may not register in point-of-sale data at all [VERIFY]. The plan therefore adds sales channels that point-of-sale data can see:
- Ingram-supplied retail for the paperbacks;
- once there is stocked product, Amazon selling as the retailer through a distributor.

It also collects independent-store sell-through as units per store per week, not only reorder flags.

The routine can assemble the proof pack automatically each month from connected sales data, so it is current whenever a gate is reached. Recommendation: add a monthly **"retail proof pack"** step to `ops/ROUTINE.md`, written to `business/retail-proof/YYYY-MM.md`.

| Metric | What it shows | Our source | Gate use (section 4.9; targets are assumptions) |
|---|---|---|---|
| **Point-of-sale units** where visible | What a book buyer checks first | Distributor or wholesaler reports; point-of-sale data through the distributor [VERIFY access] | R4 onward |
| **Units per week by SKU and channel (velocity)** | Demand without discounting | Shopify, KDP, Amazon Seller Central, Faire and Walmart reports | Every gate is set in units (4.9) |
| **Units per store per week** at independent stores | Stock sells off real shelves | Store reorders plus a written store survey | R2: a measured rate from at least 10 stores over 120 days |
| **Ratings and reviews** | Social proof buyers can check themselves | Amazon, Etsy and the own-site review app (FTC-compliant; no incentive beyond a disclosed free copy, BLIND-SPOTS #14) | Set from *our* volume, not the category leaders': 25 ratings at 4.5+ by R2, 100 by R4. At an assumed 1–2% of buyers leaving a rating [VERIFY], that is about 1,250–2,500 and 5,000–10,000 units of the lead SKU |
| **Amazon Best Sellers Rank history** | Relative position in the category | Seller Central | Supporting evidence only |
| **Repeat purchase rate** | The brand, not a one-off gift | Shopify customer data | Tracked from Wave 1; target set after 90 days of data |
| **Return and defect rate** | Product quality and packaging | Marketplaces and 3PL | Under 3% |
| **On-time, complete shipping rate** | Operational reliability | 3PL | 98% or more |
| **Email list by age band** | An owned audience to send to the retailer's page | Email platform | Tracked (Expected model: about 3,500 by month 36) |
| **Margin sheet per SKU** | The buyer's margin and ours | The Unit Economics tab, with real quotes, and the 4.4 walk | Meets the channel cost rule with a 25% returns reserve |
| **Marketing support plan** | How we send shoppers to the retailer | Pins, SEO, email, and ads pointing to the retailer's listing | **A committed budget of $300–$600 per retail launch** (assumption; section 3.8), written, faceless and approved by the founder |

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
0. **"The retailer wants a named supplier contact."** AlphaPlay LLC is never the direct vendor of record to a chain. For books, the distributor or wholesaler is the supplier. For non-book items, a rep's vendor-of-record partner or a consolidator is. A publisher licence (4.2) is the other route. Direct vendor status normally brings QA calls, cost negotiations, audits, recall coordination and line reviews [VERIFY], none of which fits the no-contact rule.
1. **"The buyer wants to meet the founder."** The rep or distributor is the face of the account, and the agreement says so. If a retailer requires the owner in person, on video or on a call, that route is declined. The same applies to accelerator programs with live cohorts, open-call pitch days and trade-show booths the founder would staff.
2. **"The retailer wants a factory or vendor audit."** The audit is of the printer's facility and the 3PL. Neither involves the founder's home, and her home address never appears on vendor forms (PROTECTION-PLAN §1: principal office is not the home address).
3. **"The retailer's founder-story marketing wants a face."** The brand story stays anonymous and illustrated (`content/founder-story.md`, counsel review before publication). No photo, no video.
4. **Self-running.** Retail is the least automatic channel in the plan. Purchase orders need acknowledgment, stock needs reordering, and deductions need disputing. The 3PL and EDI provider automate the routine parts. Exceptions go into the weekly approval batch under the founder's 60-minute cap (`ops/ROUTINE.md`, "Founder time cap"). **A retail account that regularly pushes approvals past the cap is a signal to hand more of the work to the distributor, not to take on daily tasks.**
5. **No inventory with the founder, ever.** Samples for buyers ship from the 3PL to the rep. Returned and damaged goods go back to the 3PL or distributor, never to the founder's address.
6. **Content rules on packaging.** Retail packaging in this category often promises language outcomes. Ours never does (BRAND.md rules 1 and 3; the autism-search rule). The value line on packaging is what the product *is*: one word per page, a grown-up tip on every page, a play and a talk line on every card.

---

## 4.9 Gates by units sold, with two dated scenarios

The first draft dated every gate on the calendar and set rating targets from the category leaders. The plan's own demand model cannot support those dates. For example, the first draft had the board book reaching 300 ratings by July 2028, while the Expected model sold about 60 board books in year 1. The gates are now **unit volumes**. The dates follow from the velocity the business actually achieves.

**How many units a rating target implies.** Assumption: 1–2% of buyers leave a rating [VERIFY against our own review-request data]. On that basis:
- 25 ratings needs about 1,250–2,500 units of the lead SKU;
- 100 ratings needs about 5,000–10,000 units;
- 300 ratings needs about 15,000–30,000 units.

### The gates

| Gate | Stage | Every condition must be true | Work unlocked (founder approves each spend in `ops/APPROVALS.md`) |
|---|---|---|---|
| **R0, foundations** | 1 | Gate A (section 5.12): business bank account open; counsel's go-ahead for the G0 launch; **GL insurance bound before the first sale**; publish safeguards built; trademark clearance started | Wave 1 listings take money; retail proof pack starts collecting data |
| **Passive Target touchpoint** | 3 (no pitch) | IngramSpark paperbacks live | Monthly check of target.com and walmart.com for our ISBNs, and of Target baby-registry eligibility [VERIFY]; registry-driven sales tracked where visible |
| **B0, board-book gate** (section 3.10 rule 4) | 1 → 2 | (a) Trailing-12-month result positive for 6 months. (b) Retained cash covers the A0 and A costs, a 2,500-copy run (about $6,875 landed) and the 3-month reserve: about $11,000 on the lean path. (c) The POD *Up! Go! More!* paperback sells **40+ units a month for 3 months**. (d) Written quotes within the channel cost rule. (e) Product-safety counsel has said who certifies. | Illustrator, CPSIA test, then the pre-sale; its go line (about 920 copies at 1,000; recalculated from real quotes) decides the print. Below it, refund and stop |
| **R1, stocked product live** | 2 | Stock at the 3PL; CPC and tracking labels; ISBN barcodes; first 30 days shipped with no safety complaint | Amazon FBA; own-site sales |
| **R2, wholesale proven** | 2 | 12 months of stocked sales; **lead SKU at 1,250–2,500 units** and at least 25 ratings at 4.5+; measured sell-through (units per store per week) from at least 10 independent stores over 120 days; Stage 2 held within its capped loss; the channel cost rule met at a quoted run | Retail gate (section 3.10 rule 5); Walmart Marketplace application; offset deck quote only if the POD deck sold |
| **R3, big-box online proven** | 3 | 6+ months live on at least one big-box website (Walmart Marketplace or wholesaler-fed listings); return rate under 3%; on-time shipping 98%+ | Written distributor submission once book 1 has about 6 months of stocked data and books 2 and 3 are in illustration (4.2) |
| **R4, representation signed** | 4 | **Lead SKU at 5,000–10,000 units** (about 100 ratings at 4.5+); velocity of at least **400 units a month for 6 months** (assumption); the three-book series scheduled into the distributor's selling season on retail-edition ISBNs; the PLAY BEFORE PIXELS application past its first examination without a substantive refusal (4.5 item 1); EDI tested; insurance quoted at chain limits; an order-funding plan within the ceiling (4.5 item 9); the agreement names the distributor or rep as the face of the account | Line review through the distributor or rep; founder answers in writing only |
| **R5, a purchase order** | 5 | Terms pass the 4.4 margin walk with real numbers and a 25% returns reserve; the order fits the funded ceiling; no personal guarantee (PROTECTION-PLAN §1) | Retail-edition run printed against the PO, never on speculation |

### What the dates look like on the plan's own numbers

| Gate | Expected (model) | Conservative (model) |
|---|---|---|
| R0, first sales | Dec 2026 (assumed; each month of slip moves everything) | Dec 2026 |
| Passive target.com check | From about Feb 2027, once the IngramSpark paperbacks are live [VERIFY that listings appear] | Same |
| B0 finance conditions (a) and (b) | Met around mid-2028 (positive trailing-12-month result from Aug 2027; total cash passes about $11,000 in mid-2028) | Not met within 36 months (total cash about $8,900 at month 36) |
| B0 demand condition (c) | **Not met within 36 months.** The model's paperback rate is about 5 units a month, one-eighth of the gate | Not met (about 2.5 a month) |
| R1 | Late 2028 at the very earliest, and only if the paperback outsells Expected about eight times over | After 2029 |
| R2 to R5 | Set by board-book velocity after R1 (below) | Not in view |

| Board-book velocity after R1 | R2 (1,250–2,500 units) | R4 (5,000–10,000 units, 400+ a month) | Earliest line review, then shelf |
|---|---|---|---|
| 40 a month (paperback-like) | 3–5 years after R1 | Not realistic | None |
| 100 a month (what gate B0 assumes) | 12–25 months after R1: 2030–2031 | 4–8 years after R1: 2033 or later | Not realistic this decade |
| 400 a month (a breakout title) | 3–6 months after R1: 2029 | 12–25 months after R1: 2030–2031 | Line review 2030–2031; shelf the following year |

**The honest reading.** A Target shelf is a real long-range goal, but on the plan's own Expected numbers it is **not reachable within the 36-month horizon**. It is realistically **no earlier than 2030**, and only if the talk-along line becomes a breakout title. The plan keeps the goal because it shapes good early choices: the series design, the retail-ready files, the trademark, the safety paperwork and the proof pack. It spends nothing on retail until units justify it. The nearest real Target presence is the passive target.com listing of our print-on-demand paperbacks, which could come in 2027 without any pitch [VERIFY].

**Decision points where the right answer may be "stop here":**
- **At B0:** if the paperback does not reach its demand line, the board book stays a print-on-demand paperback. Nothing is printed, and the retail track waits.
- **At R2:** if independent stores do not sell through, the product is not ready for chains. Stay with direct sales and Amazon, and improve the product.
- **At R4:** if no distributor or rep will take the line on written-only terms, stay in stages 1–3. **Direct sales and Amazon are profitable at our prices. Wholesale of a single $12.99 book is not, at current costs** (4.4), and chain retail is not required for the business to succeed.
- **At R5:** if the order's funding need or its deduction terms would put the LLC at risk, decline or shrink the order. A chain order that fails through late shipping or unsold returns does more harm than no order.

---

## 4.10 What not to do

- Do not approach Target or Walmart buyers before R4, and never directly: only through the distributor or rep. A first impression without data is hard to undo [VERIFY].
- Do not pay a consultant or "placement" service that promises shelf space for a fee.
- Do not offer the KDP POD paperback as a retail product. It cannot meet retail margins or returns terms.
- Do not print retail packaging before the trademark is cleared and filed.
- Do not sign an exclusive distribution deal covering all formats, all channels or all countries. Keep IngramSpark POD editions and DTC outside any exclusivity, and give the offset retail editions their own ISBNs.
- Do not accept consignment or sale-or-return terms on non-book products without a returns reserve in the margin walk.
- Do not copy the category leaders' packaging claims or keywords ("speech therapy", "SLP", "autism"), even though retail competitors use them (DEMAND-CHECK pricing rule 12).
- Do not describe the brand as "sold at" a retailer in public copy unless it is true that day and the wording passes `ops/COMPLIANCE-GATE.md`.

---

## 4.11 Decisions this section needs from the founder

1. **Adopt the cost rule by channel** (landed cost at or below 35% of retail for own channels, 25% for wholesale and 20% for chains, with positive chain contribution at a 25% returns reserve). Add it to the board-book `price_notes`.
2. **Withdraw the spring 2027 pre-sale and adopt gate B0** (section 3.10 rule 4) as the only route to an offset board book.
3. **Approve information-only printer quotes in January 2027** at 500, 1,000, 2,500 and 5,000 copies. Include a retail-edition spec: the current 26-page extent against 14–18 pages and a smaller trim, at 5,000 and 10,000 copies.
4. **Confirm that AlphaPlay LLC is never the direct vendor of record to a chain.** Every distributor, rep, vendor-of-record and 3PL agreement names the partner as the face of the account, with the founder in writing only.
5. **Approve a monthly retail proof pack** in `ops/ROUTINE.md`, starting with Wave 1 data, plus the monthly target.com, walmart.com and registry check.
6. **Add class 28 to the trademark plan** before any card deck is made for retail, and ask the attorney whether class 28 or 16 fits a talk-along card deck.
7. **Ask the insurance broker** for a quote at typical chain limits, with the sales-scaled premium for products for children under 3, so the step-up cost is known early.
8. **Ask counsel three retail questions:** PROTECTION-PLAN question 9 (who certifies under CPSIA); whether suggesting a retail price to resellers raises any issue [VERIFY]; and whether a card deck the grown-up reads avoids toy classification.

---

*Sources in this repository: `brand/BRAND.md`, `CLAUDE.md`, `marketing/AMAZON-AND-RETAIL-ROADMAP.md`, `marketing/DEMAND-CHECK.md`, `marketing/BLIND-SPOTS.md`, `marketing/MARKETING-PLAYBOOK.md`, `marketing/CAMPAIGN-BIBLE.md`, `marketing/EDUCATION-GROUPS.md`, `commerce/storefront-setup-guide.md`, `finance/BANKING.md`, `legal/DECISION-MEMO.json`, `legal/protection/PROTECTION-PLAN.md`, `legal/international-plan.md`, `ops/ROUTINE.md`, `ops/QUEUE.md`, `products/board-up-go-more/listing.json`, and sections 1 and 2 of this plan. Everything marked [VERIFY] is general knowledge that must be confirmed on a primary source before any money is spent or any agreement is signed.*
