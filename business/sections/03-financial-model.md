# 3. Financial model

*Play Before Pixels, a trade name of AlphaPlay LLC (Maryland). Founder and owner: Arielle Fleisher. Section 3 of the expansion business plan. Draft for the founder, September 28, 2026. Internal planning file, not for publication.*

**The workbook:** `business/PlayBeforePixels_Financial_Model.xlsx` (9 tabs, about 17,400 live formulas, no errors on recalculation).

**How to read this section.** Every figure comes from a repository file or from the workbook, and the source is named. **[VERIFY]** marks an outside fact that is not in the repository. Web search was not available for this draft, so check each one on the live page or in a written quote before money is spent. **(assumption)** marks a planning input chosen for the model. Most platform fees in the repository are themselves marked UNVERIFIED (`commerce/storefront-setup-guide.md`). The model uses them as given, and the workbook's Status column flags them.

**What this model is not.** It is not a forecast of income, and it promises nothing. The business has no sales history yet, so traffic and conversion are informed guesses. The model is a tool for three jobs: seeing which inputs matter most, sizing the cash the plan needs, and setting the decision rules that keep a slow start from turning into a large loss.

---

## 3.0 Summary

| Result (planning estimate) | Conservative | Expected | Strong |
|---|---|---|---|
| Gross sales, year 1 (Oct 2026 – Sep 2027) | $3,162 | $14,257 | $29,359 |
| Gross sales, year 3 | $9,425 | $70,542 | $188,343 |
| Net operating result, year 1 | ($11,106) | ($6,497) | $972 |
| Net operating result, year 3 | ($12,367) | $17,919 | $81,613 |
| Sustained operating break-even | Not within 36 months | May 2028 (month 20) | May 2027 (month 8) |
| Peak funding need | $61,016 and still rising at month 36 | $33,736 (July 2028) | $29,089 (May 2027) |
| Cash payback | Not within 36 months | Not within 36 months | October 2028 |
| Cumulative result after one-time costs, month 36 | ($57,522) | ($7,372) | $94,099 |

All figures use the mid-point of every cost range (cost position 0.5) and no owner contribution. "Net operating result" excludes one-time costs and inventory. "Peak funding need" is the lowest balance the operating account reaches, so it is the cash the founder would need to put in, or not spend.

Five findings matter more than any single number:

1. **Fixed costs, not product margins, decide the first year.** Digital products keep 80–93% of the price. But the business carries about **$814 a month** in fixed costs before a single sale, and about half of that is insurance. At the Expected month-12 mix, covering those costs takes about **148 orders a month**.
2. **Most of the funding need is one-time spending, and most of it can be timed.** Startup items total **$19,786** at mid-point, with a range of **$11,941 to $27,631**. Moving every cost to the low end of its range and deferring three optional items cuts the Expected peak funding need from $33,736 to **$11,001**.
3. **The board-book pre-sale is premature in spring 2027 in every scenario.** The model's pre-sale brings in 3–21 copies, against the **718 copies** needed to fund a 1,000-copy run plus launch costs. The talk-along paperback (print-on-demand) should carry *Up! Go! More!* until the email list can support a pre-sale.
4. **Wholesale at half of a $12.99 retail price barely pays.** A board book sold through Faire nets about **$0.38**. Walmart Marketplace or Target Plus nets about **$3.27** [VERIFY fees]. Retail readiness only pays for itself with a larger line (series, 3-pack, boxed set) and a lower landed cost.
5. **Conversion and traffic are the swing inputs.** A 25% miss on either pushes Expected break-even from May 2028 to May 2029 and deepens the funding need by about $6,000. A 25% beat brings break-even forward to November 2027.

---

## 3.1 What the workbook contains

| Tab | What it does |
|---|---|
| **Dashboard** | Three-scenario results table, three charts (monthly gross sales, operating account balance, net operating result by year) and how-to-use notes. |
| **Assumptions** | Every driver and fee, each with its source file and a status: Repo, Assumption or [VERIFY]. Blue cells are inputs. Yellow cells are the key levers. |
| **Unit Economics** | 41 product-and-channel rows: price, platform fee, payment fee, refund allowance, print/POD/landed cost, fulfilment, net per unit, margin and sales-tax handling. A channel blend feeds the forecast. |
| **Startup Costs** | 27 one-time items with Low, High, Model, month incurred and an Include switch. |
| **Monthly Operating Costs** | 25 recurring items (monthly or annual) laid out month by month for 36 months, plus a 10% contingency. |
| **36-Month Forecast** | Three stacked scenario blocks. For each of 9 channels: active flag, traffic trend, seasonal traffic, conversion, orders, items, average order value, gross sales and net contribution. Then the email list, totals, operating result, one-time costs and held inventory. |
| **Cash Flow** | Payouts lagged by channel, inventory purchases, all costs, the tax-reserve transfer, account balances and the 3-month reserve target. |
| **Break-even** | Break-even months, cumulative orders and units at break-even, orders needed each month, a single-product view and a retail self-funding check. |
| **Retail Readiness Costs** | Wave 3 board-book launch costs, big-box readiness costs, ongoing retail costs and the first offset run. All marked [VERIFY]. |

Every calculated cell is a formula. Change a blue cell on Assumptions (or a Low/High on the three cost tabs) and every tab updates. Colour conventions: blue text for inputs, black for formulas, green for links to another tab, yellow fill for key levers. Headers use the brand navy (#1D2940). Panes are frozen on every tab.

---

## 3.2 How the model works

### The driver chain

For each channel and month:

**traffic → conversion → orders → items per order → average order value → gross sales → net contribution**

- **Traffic** starts at a launch-month level. It then grows by a monthly rate set separately for years 1, 2 and 3, and is multiplied by a seasonality index. The consumer index peaks in November–January (holiday gifts, then the January Reset). The school index follows the school year. Both shapes follow the repository calendar (`marketing/BLIND-SPOTS.md` #2 and #6; `marketing/DEMAND-CHECK.md` rule 7); their levels are assumptions.
- **Conversion** ramps from zero to its full rate over 6 months (assumption). A new faceless shop starts with no reviews against incumbents holding 2,000–11,000 (`DEMAND-CHECK`, "One honest warning").
- **Average order value** is the channel's blended price times items per order. The blended price and blended net per item come from the Unit Economics mix weights.
- **Net contribution** is items sold times blended net per item. That is what AlphaPlay LLC keeps after platform fees, payment fees, refunds, print or POD cost and fulfilment.

### Channels and waves

| # | Channel | Traffic measure | Launch month (Expected) | Wave, source |
|---|---|---|---|---|
| 1 | Own site: printables, PDFs, POD tee (Shopify) | Site sessions | Oct 2026 | Wave 1; launch-first five (`ops/QUEUE.md`) |
| 2 | Etsy: printables | Listing visits | Oct 2026 | Wave 1 |
| 3 | Amazon KDP paperbacks | Detail-page views | Nov 2026 | Wave 1 |
| 4 | IngramSpark hardcovers and bookstore/library | Retailer and library listing views (estimate) | Dec 2026 | Wave 1 |
| 5 | International digital via merchant of record (Gumroad) | Site sessions from outside the US | Jan 2027 | Region 2 (`ops/INTERNATIONAL.md`) |
| 6 | 30-Day Screen Reset (written course) | Email subscribers reached | Jan 2027 | Wave 2 |
| 7 | Board book: pre-sale, then 3PL and Amazon FBA | Product-page sessions | Feb 2027 pre-sale | Wave 3 |
| 8 | School and group licenses + TPT | Schools/orgs page + TPT views | Oct 2027 (Strong: Jul 2027); **off in Conservative** | Held for employment counsel |
| 9 | Retail and wholesale: Faire, Walmart Marketplace, Target Plus | Retailer and marketplace views | Oct 2028 (Strong: Jul 2028); **off in Conservative** | After a 12-month record (`AMAZON-AND-RETAIL-ROADMAP.md` B1, B5) |

The **email list** is modelled because it drives the course. New subscribers come from 3% of site visitors (the free "3 plays for your child's age" offer, `BLIND-SPOTS` #5) plus 15% of buyers through the bonus QR code in every product file, minus 1.5% unsubscribes a month (Expected; all assumptions). Each month, 15% of the list sees the course offer.

### Money timing

- **Payout delays** (Assumptions §4): Shopify, Etsy, Gumroad and the board book pay in the month of sale; TPT, school invoices (net-30) and retail pay one month later; **KDP about 60 days after month end (2 months)**; **IngramSpark about 90 days after month end (3 months)** (`commerce/storefront-setup-guide.md` A6).
- **Inventory:** the board book is the only held stock. It sits at a 3PL or Amazon, never with the founder (`brand/BRAND.md`). The first run is sized as the larger of 1,000 copies or pre-sale orders plus 40% (`BLIND-SPOTS` #11 and #16), and is paid in the print month. A reorder of the same size is triggered each time cumulative sales pass a multiple of the run. The operating result charges the landed cost of each copy sold. Cash Flow instead pays for whole runs up front.
- **Sales tax and VAT are pass-through** and never counted as revenue. Own-site sales add Maryland's 6% at checkout. Etsy, Amazon and TPT remit as marketplaces. Gumroad remits US sales tax and EU/UK VAT as merchant of record. KDP and IngramSpark pay royalties, so there is no sales tax on AlphaPlay's side (`finance/TAX-AUTOPILOT.md` §1).
- **Tax reserve:** 25% of every positive month's net cash moves to a separate reserve account (`TAX-AUTOPILOT` §2: the accountant picks the rate, 25–30% is common). This is money set aside, not a tax estimate.
- **Opening cash is $0**, because the Chase checking account is closed and a new account opens empty (`finance/BANKING.md`). Owner contribution is an input, left at $0 so the funding need stays visible.

### Deliberately left out

Employment-counsel fees (the founder's personal matter); the Chase card's existing balance; any coaching or live-service revenue (banned by `BRAND.md`); the stage-based subscription kit and professional licenses (still under research in `ops/QUEUE.md`); in-store Target or Walmart vendor revenue (not forecastable; see 3.8); and income tax actually payable.

---

## 3.3 Unit economics

Everyday prices follow `BRAND.md` "Honest pricing", which overrides the anchor-and-discount rule in `DEMAND-CHECK`. The routine cards are priced at $6.50 and the busy book at $11.99, the levels buyers see on the market, with no permanent "was" price.

| Product | Channel | Price | Net per unit | Margin | What drives it |
|---|---|---|---|---|---|
| Visual routine cards | Etsy | $6.50 | $5.21 | 80% | 6.5% transaction + 3% + $0.25 processing + $0.20 listing + Offsite Ads on 10% of sales + 2% refunds |
| Play-First Family Kit | Own site | $11.00 | $10.16 | 92% | Shopify 2.9% + $0.30, 2% refunds |
| Play-First Family Kit | Etsy | $11.00 | $9.12 | 83% | Etsy fee stack |
| Play-First Family Kit | Gumroad (international) | $11.00 | $9.18 | 83% | 10% + $0.50, VAT handled by the merchant of record |
| *100 Screen-Free Plays* paperback | KDP | $16.99 | $8.21 | 48% | 60% royalty minus about $1.98 print (82 pages B/W [VERIFY rate]) |
| *The Day the Tablet Slept* paperback | KDP | $11.99 | $3.95 | 33% | 60% royalty minus $3.24 premium-colour print (`listing.json`) |
| *Laps Not Apps* hardcover | IngramSpark | $19.99 | **$0.50** | 2% | 55% wholesale discount minus about $8.50 print [VERIFY] |
| 30-Day Screen Reset | Own site | $27.00 | $24.57 | 91% | Shopify fees, 5% money-back allowance |
| *Up! Go! More!* board book | Own site via 3PL | $12.99 | $4.93 | 38% | $3.63 landed cost + $3.50 pick/pack [VERIFY] |
| *Up! Go! More!* board book | Amazon FBA | $12.99 | $3.92 | 30% | 15% referral + $3.50 FBA fee [VERIFY] |
| *Up! Go! More!* board book | Faire wholesale | $6.50 | **$0.38** | 6% | Half of retail, 15% commission, 3% processing, 5% deductions [VERIFY], landed cost, handling |
| *Up! Go! More!* board book | Walmart Marketplace / Target Plus | $12.99 | $3.27 | 25% | 15% referral [VERIFY], 5% deductions [VERIFY], landed cost, 3PL |
| TPT single resource (held) | TPT | $5.00 | $2.45 | 49% | 55% payout minus $0.30 |
| Parent-night host kit (held) | Direct invoice | $129.00 | $124.96 | 97% | Shopify fees only |

What the table says:

- **Digital products carry the business.** Across 36 months of the Expected case, 56% of net contribution comes from printables and the course, 30% from print-on-demand books, 10% from the school wave (if counsel clears it), 3% from the board book and under 1% from retail.
- **Own-site sales keep 9–10 more points than Etsy.** Etsy still supplies the search traffic a new brand lacks. The email list and the bonus QR code are how buyers move from Etsy to our own site over time.
- **IngramSpark hardcovers do not pay at a 55% discount** if the print cost is near $8.50 [VERIFY]. The listing files already ask that each copy clear $2–$3. Once the IngramSpark calculator gives a real print cost, test a 40% discount or a higher list price. Libraries buy through distributors at the deeper discount, so this is a real trade-off (`MARKETING-PLAYBOOK`).
- **The board book's landed cost is 28% of retail** at the mid-point print cost of $2.90 a copy plus 25% for freight and duties (assumption). That sits inside the `DEMAND-CHECK` rule 9 target of 35–40%. Direct sales work. Wholesale does not, at this price and fee stack.

---

## 3.4 Costs

### Startup (one-time)

Mid-point **$19,786** across 26 included items; low end $11,941, high end $27,631 (Startup Costs tab). About $7,650 falls in October–December 2026 and $12,140 in January–September 2027. The largest items:

| Item | Model | Range | Source |
|---|---|---|---|
| Spanish "starter" localization (AI + professional post-edit) | $5,250 | $4,700–$5,800 | `legal/international-plan.md` |
| Human illustrator for the board book | $3,250 | $1,500–$5,000 | `BLIND-SPOTS` #17 |
| Trademark clearance search + attorney opinion | $1,500 | $500–$2,500 | `legal/DECISION-MEMO.json` |
| Attorney: Terms of Sale and website legal pages | $1,500 | $500–$2,500 | `legal/protection/PROTECTION-PLAN.md` |
| Attorney: IP assignment + operating-agreement refresh | $1,250 | $500–$2,000 | `PROTECTION-PLAN` #5 |
| Attorney: successor + durable power of attorney | $1,000 | $500–$1,500 | `BLIND-SPOTS` #20 |
| USPTO filing, PLAY BEFORE PIXELS, classes 16 + 41 | $700 | fixed | `PROTECTION-PLAN` #7 |
| Accountant setup review | $650 | $300–$1,000 | assumption [VERIFY] |
| Trademark attorney for ALPHAPLAY; Statement of Use or extension | $650 + $388 | $300–$1,000; $150–$625 | `BLIND-SPOTS` #9; `PROTECTION-PLAN` #6 |

Also included: ISBNs ($295), copyright filings before November 11, 2026 ($360–$680), trade-name filing ($25–$50), proofs, the SLP accuracy review and sensitivity read, review copies and library-credibility items. The Madrid international trademark ($2,500–$4,500) is listed but switched off. `DECISION-MEMO` says to file it only once the US application looks safe.

### Monthly operating costs

The steady baseline is about **$740 a month at mid-point, $814 with the 10% contingency**. The range runs from about $420 to $1,060 a month before contingency, and annual items (accountant, SDAT report, domains, PO box, resident agent) come on top. Year 1 totals **$12,089**; years 2 and 3 total **$12,834** each.

| Group | Mid-point per month | Source |
|---|---|---|
| Insurance: GL, E&O, media, cyber, umbrella | about $398 | `PROTECTION-PLAN` averages and ranges |
| Claude plan for the routines + usage-credit cap | about $163 | Plan price is an assumption, $100–$200 [VERIFY]; cap from `ops/GAPS-ROUND-2.md` G2-06 |
| QuickBooks Online + Link My Books connector | about $96 | `finance/money-and-tax-setup.md` |
| Shopify Basic | $39 | storefront guide §1 |
| Business email, email platform, PDF stamping, sales-tax filing service, Etsy renewals | about $45 | `BLIND-SPOTS` #4; `MARKETING-PLAYBOOK` |

Insurance is half of the fixed base. `PROTECTION-PLAN` requires general liability before the first sale and the other three policies before launch. A broker quote for a digital-first micro-business, and a check on whether E&O is still needed now that coaching is banned, is the single largest cost saving available [VERIFY with a broker].

**Wave-specific costs** start only when that wave is live: $100 a month for the 3PL minimum [VERIFY] plus $39.99 for Seller Central once the board book is printed; $358.50 a month for retail EDI, the insurance uplift to retailer limits and GS1 renewal once retail is live [VERIFY]; and $179 one-time to open the school wave.

**Paid advertising** follows `MARKETING-PLAYBOOK`: Amazon Ads at $5–10 a day on live titles, then a Pinterest test, then Google Search once site conversion reaches 1.5%. Expected spends $150 a month in year 1, $300 in year 2 and $450 in year 3. Conservative spends nothing in year 1; Strong spends twice the Expected amount. The model assumes this spend is part of what produces each scenario's traffic. It does not credit ads with extra traffic.

---

## 3.5 The three scenarios

The scenarios differ only in demand inputs and in which conditional waves open. Costs and prices are the same in all three.

| Driver (per month unless stated) | Conservative | Expected | Strong |
|---|---|---|---|
| Site sessions in launch month; growth in years 1 / 2 / 3 | 300; 8% / 4% / 2% | 600; 12% / 6% / 3% | 1,000; 12% / 7% / 4% |
| Site conversion at full ramp | 1.0% | 1.5% | 2.0% |
| Etsy visits in launch month; conversion | 400; 1.0% | 800; 2.0% | 1,200; 2.5% |
| KDP detail-page views in launch month; conversion | 300; 3% | 600; 5% | 900; 6% |
| Email sign-up rate of site visitors | 2% | 3% | 4% |
| School and group wave | Off | From Oct 2027 | From Jul 2027 |
| Retail and wholesale wave | Off | From Oct 2028 | From Jul 2028 |
| Ad spend, year 1 / 2 / 3 | $0 / $150 / $250 | $150 / $300 / $450 | $300 / $600 / $900 |

`MARKETING-PLAYBOOK` gives 1.5–3% as the working site-conversion target. Everything else in this table is an assumption to be replaced by the first 90 days of real data from the Friday scorecard.

**Conservative: the launch works but stays small, and nothing changes.** Year 3 sales reach about $9,400, fewer than 60 orders a month. Contribution never covers the fixed base, so the business loses about $1,000 a month indefinitely. This case exists to show why the kill rules matter (3.10). A founder would cut costs long before month 36. The model does not do that for her.

**Expected: steady growth from search, Etsy and Amazon, with the school wave opening in year 2.** Operating profit first appears in September 2027 and holds from May 2028. The Expected case still ends month 36 about $7,400 behind after one-time costs, and the operating account does not recover within 36 months. The business is viable in this case, but slow, and it needs about $34,000 of founder cash at the mid-point cost level, or about $11,000 on the lean path (3.9).

**Strong: the product-market fit that DEMAND-CHECK's category evidence suggests is possible.** Year 3 sales reach about $188,000, and the business is self-funding from spring 2027. The peak funding need is similar to Expected ($29,089), because the one-time costs fall in the first eight months either way. Even this case sells about 950 orders a month in month 36, which is below the volume of the category leaders `DEMAND-CHECK` cites (for example a 10.4k-sale Etsy shop).

---

## 3.6 Cash flow

- **Year 1 is cash-negative in Conservative and Expected** because one-time costs ($19,786 of startup, plus $1,875 of Wave 3 launch costs in May 2027) fall before contribution can cover the fixed base.
- **Payout delays cost about one month of book revenue in working capital.** KDP royalties arrive two months late and IngramSpark three months late. In the Expected case, the KDP royalty earned in November 2026 ($42) arrives in January 2027.
- **The first print run ($3,625 for 1,000 copies at mid-point) is small next to the startup costs.** It is still cash tied up. In the Conservative case about 885 copies are still at the 3PL at month 36.
- **The 3-month reserve target** (`ops/ROUTINE.md`) is about $2,400–$6,700, depending on the month and scenario. Only the Strong case reaches it inside 36 months.

---

## 3.7 Break-even

| Measure (Expected) | Result |
|---|---|
| First month with operating result ≥ 0 | September 2027 (month 12) |
| Sustained operating break-even (stays ≥ 0 through month 36) | May 2028 (month 20) |
| Cumulative orders by then | about 3,090 orders (3,500 items) |
| Orders in the break-even month | about 259 |
| Fixed costs in month 12 (operating + ads) | $1,104 |
| Net contribution per order in month 12 | $7.47 |
| **Orders a month needed to cover fixed costs, month 12** | **about 148** (the forecast has 158) |
| Orders a month needed, month 36 (fixed costs rise to $1,784 with retail and 3PL costs) | about 186 |

**Single-product view.** The month-12 Expected fixed costs ($1,104) equal any one of these each month:

| If only this sold | Units a month | Per day |
|---|---|---|
| Play-First Family Kit on our own site | 109 | 3.6 |
| Toddler busy book on Etsy | 111 | 3.7 |
| Play-First Family Kit on Etsy | 121 | 4.0 |
| *100 Screen-Free Plays* paperback on KDP | 135 | 4.5 |
| Visual routine cards on Etsy | 212 | 7.1 |
| 30-Day Screen Reset | 45 | 1.5 |
| Board book on our own site | 224 | 7.5 |

This is the most useful target for the weekly scorecard. **Break-even is roughly four to five sales a day across the line.**

The Conservative case does not reach break-even. The Strong case reaches sustained break-even in May 2027 and cash payback in October 2028.

---

## 3.8 Retail readiness: what the path to Target costs

The **Retail Readiness Costs** tab prices the checklist in `AMAZON-AND-RETAIL-ROADMAP.md` B5. Nearly every line is [VERIFY], because no quotes exist yet.

| Block | Mid-point | Timing in the model |
|---|---|---|
| A. Wave 3 board-book launch: CPSIA lab test for ages 0–3, proofs and quotes, 3PL setup, FBA prep, attorney check of pre-sale terms | $1,875 | Print month |
| First offset run, 1,000 copies at $3.63 landed | $3,625 | Print month (the run is sized from pre-sales) |
| B. Big-box readiness: GS1 company prefix for non-book SKUs (books use ISBN barcodes), CPSIA testing for two more children's SKUs, retail-ready packaging, vendor-agreement review, sell sheet and samples, Faire sample allowance | $5,100 | Three months before retail launch |
| C. Ongoing while retail is live: 3PL EDI, insurance uplift to retailer limits, GS1 renewal | $358.50 a month | From retail launch |

**Self-funding check (Break-even tab).** At the model's retail mix (half Faire, a quarter each Walmart Marketplace and Target Plus), a retail unit nets about $1.82. Retail must therefore sell about **197 units a month** to cover its own monthly costs, plus about **2,800 more units** to repay the readiness spend. In the Expected case, retail adds under 1% of contribution and switching it off *improves* the 36-month result by about $8,800. The reason is structural, not a lack of demand. Wholesale at half of a $12.99 price leaves $0.38 after Faire's commission, the landed cost and handling.

What changes the answer, in order:

1. **A line, not a book.** Books 2 and 3 and the $29.99 3-pack raise the order value per retailer and per shelf (`DEMAND-CHECK` §2 #9).
2. **A lower landed cost.** A larger run moves the per-copy cost toward the $1.80 end of the `BLIND-SPOTS` #11 range. At $1.80 plus 25% freight, the Faire unit nets about $1.75 instead of $0.38. Only commit to that run once sell-through data supports it.
3. **Faire Direct** (0% commission on retailers we bring ourselves, storefront guide §19), where that is possible without direct contact.
4. **A distributor or a publishing deal for books.** Books usually reach big-box shelves through book distributors (`ROADMAP` B6) [VERIFY]. That route changes the economics completely and cannot be modelled from repository data. Section 4 covers it.

In-store Target or Walmart placement is not in the forecast. It depends on a buyer decision that no traffic or conversion input can represent. The model's job for the Target goal is narrower: to show what online proof, sell-through and line depth must exist first, and what the readiness steps cost.

---

## 3.9 Key sensitivities

Each row changes one thing from the Expected case and recalculates the whole workbook.

| Change (Expected case) | Year 3 net operating result | Peak funding need | Sustained break-even | Result after one-time costs, month 36 |
|---|---|---|---|---|
| **Base case** | $17,919 | $33,736 | May 2028 | ($7,372) |
| Conversion rates 25% lower | $7,259 | $39,879 | May 2029 | ($26,640) |
| Launch traffic 25% lower | $7,385 | $39,839 | May 2029 | ($26,456) |
| Year-1 traffic growth 4 points lower | $6,330 | $40,278 | May 2029 | ($28,177) |
| Conversion rates 25% higher | $28,664 | $31,373 | Nov 2027 | $12,019 |
| Every cost at the low end of its range | $26,671 | $17,548 | Nov 2027 | $24,584 |
| Every cost at the high end of its range | $9,167 | $56,561 | May 2029 | ($39,327) |
| Defer Spanish localization, the illustrator and library-credibility spend | $17,919 | $24,286 | May 2028 | $2,078 |
| **Lean path: low-end costs + those three deferrals** | $26,671 | **$11,001** | Nov 2027 | $31,584 |
| School wave stays closed (counsel says no) | $12,778 | $34,712 | May 2029 | ($14,925) |
| No board book in 36 months | $18,185 | $28,100 | May 2028 | ($4,112) |
| No retail wave | $21,651 | $33,403 | May 2028 | $1,460 |
| IngramSpark discount 40% instead of 55% | $18,460 | $33,399 | May 2028 | ($6,266) |

On the lean path the Conservative peak falls from $61,016 to $27,416, and the Strong peak from $29,089 to $8,731.

What this means in plain terms:

- **Demand inputs (conversion, traffic, early growth) are the largest source of uncertainty.** None of them can be known before launch. A 25% miss costs about a year of break-even. That is why the first 90 days of scorecard data should replace these inputs before any spending beyond Wave 1.
- **The cost position is the largest lever the founder controls.** Moving from mid-point to low-end costs halves the funding need. Most of the gap is insurance, attorney fees and the Claude plan tier, all of which can be quoted.
- **Timing of one-time spending matters more than its size.** The three deferrals change no operating result, but they cut peak funding by about $9,500, because they no longer land before revenue.
- **The school wave is worth about $5,000 a year of operating result by year 3 in the Expected case.** It is useful, but the plan does not depend on it, and it stays off until counsel answers.
- **The board book and retail are strategic, not financial, within 36 months.** They cost more than they return inside the horizon. They are there because the Target goal needs them later.

---

## 3.10 Decision rules the numbers support

These turn the model into operating rules for the weekly routine. None of them is new policy; each applies a rule already in the repository to a number from the model.

1. **Break-even line: about 150 orders a month by month 12** (4–5 a day across the line). Track it on the Friday scorecard (`ops/ROUTINE.md`).
2. **Kill rule stays as written:** a listing with fewer than 5 sales in 60 days after SEO fixes is repriced once, then folded into a bundle (`DEMAND-CHECK` §3). The routine also cuts any product or channel that earns less than its upkeep for 8 weeks (`ops/ROUTINE.md`).
3. **Spend gate for one-time items:** book the Spanish localization, the board-book illustrator and the library-credibility spend only after the business has two consecutive months at or above the break-even line. Legal and IP items with deadlines (copyright before November 11, 2026; ALPHAPLAY by March 8, 2027; the PLAY BEFORE PIXELS filing) are not deferred.
4. **Pre-sale go / no-go:** print the board book only when pre-sale orders reach the model's funding line (718 copies at a 1,000-copy minimum run, recalculated from real quotes). Below that line, keep selling the talk-along paperback through print-on-demand and refund or fulfil the pre-sale as promised (FTC mail-order rule, `BLIND-SPOTS` #16).
5. **Retail gate:** open Faire, Walmart Marketplace or Target Plus only when the line has at least three physical SKUs, the landed cost is quoted, and the Break-even tab's retail self-funding check shows retail paying its own monthly costs at forecast volume.
6. **Conservative trigger:** if month-6 orders are running below the Conservative line (about 22 a month), stop all paid ads, move insurance and tools to the lowest quoted tier, and pause every one-time item that is not deadline-driven. Then re-forecast.

---

## 3.11 Limits of the model and what to replace first

1. **Traffic and conversion** are guesses. Replace them with 90 days of Shopify, Etsy and KDP data (sessions, conversion, units) from the scorecard.
2. **Every fee marked [VERIFY] or UNVERIFIED**, above all the KDP B/W print rate, the IngramSpark hardcover print cost, the Shopify and Etsy fee stacks and the Claude plan price. The planned fresh-session verification pass should update the blue cells directly.
3. **Insurance premiums:** replace the averages with broker quotes. This is the largest fixed cost.
4. **Board-book quotes** at 500, 1,000 and 2,500 copies (`BLIND-SPOTS` #11), plus 3PL and FBA fees.
5. **Model simplifications:** fixed per-order fees are charged per item (slightly conservative on multi-item orders); board-book postage is assumed paid by the buyer; pre-sale revenue is counted when collected, not when the book ships; a reorder is placed when cumulative sales pass each run size, not ahead of a stock-out; the tax reserve is a cash transfer, not a tax calculation. The accountant sets the real reserve rate and the startup-cost treatment (§195 election, `ops/GAPS-ROUND-2.md`).
6. **What the model does not include:** subscription kits, professional licenses, translations beyond Spanish, and any live service. Add a channel block only when its demand has been researched.

---

## 3.12 Decisions this section needs from the founder

1. **How much cash can go in, and when?** Enter it as the owner contribution on Assumptions. The lean path needs about $11,000 in the Expected case; the mid-point path about $34,000.
2. **Approve the lean path:** low-end quotes first, and the three optional one-time items gated on the break-even line (rule 3 above).
3. **Get broker quotes for the four insurance policies**, and decide with the broker whether E&O is still needed now that no coaching is offered.
4. **Confirm the board-book go / no-go rule.** The spring 2027 pre-sale is unlikely to fund a run in any scenario, so plan it for when the email list can carry it.
5. **Ask the accountant** for the tax-reserve rate, the §195 startup-cost election and the right treatment of pre-sale revenue.
