# 3. Financial model

*Play Before Pixels, a trade name of AlphaPlay LLC (Maryland). Owner: the founder. Section 3 of the expansion business plan. Revised draft for the founder, September 28, 2026. Internal planning file, not for publication.*

> **Decisions made after this plan (September 28, 2026; business/DECISIONS.md). Where this plan disagrees, these win:** the logo is the Maker's Seal only; KDP editions use Amazon's free ISBN; the *30 Days of Back-and-Forth* course is kept, fully self-running, with nothing needed from the founder; launch spending is capped at **$500 with no ads at launch** (business/LAUNCH-BUDGET-500.md). The launch order and prices live in ops/QUEUE.md "LAUNCH FIRST".

**The workbook:** `business/PlayBeforePixels_Financial_Model.xlsx`: 9 tabs and about 18,600 live formulas. A full LibreOffice recalculation returns no errors. The generator script is `business/build_financial_model.py`, and it accepts input overrides for sensitivity runs.

**How to read this section.** Every figure either comes from a repository file or is produced by the workbook, and the source is named. **[VERIFY]** marks an outside fact that is not in the repository. Web search was not available for this draft, so each of these must be checked on the live page or in a written quote before money is spent. **(assumption)** marks a planning input chosen for the model. Most platform fees in the repository are themselves marked UNVERIFIED (`commerce/storefront-setup-guide.md`). The model uses them as given, and its Status column flags them.

**What this model is not.** It is not a forecast of income, and it promises nothing. The business has no sales history, so the sales rates are informed guesses tied to the anchors in section 1.5. The model has three jobs: to show which inputs matter most, to size the cash the founder must put in, and to set the decision rules that stop a slow start from turning into a large loss.

**What changed in this revision.** The review found that the first model counted revenue the plan does not allow, launched sales before the business could take money, and left the funding need without a source. This version fixes those problems:
- the school wave, the board-book print run and retail are **off in every base scenario**;
- sales start in **December 2026**, the first month Gate A can realistically be met;
- the demand drivers are tied to units per product and units per title;
- the base plan uses the **lean path** (low-end quotes, with optional one-time items gated);
- a **sources-and-uses table** names the funding: founder capital, up to a cap, with a hard stop.

---

## 3.0 Summary

| Result (planning estimate, lean path) | Conservative | **Expected** | Strong (outlier) |
|---|---|---|---|
| Gross sales, year 1 (Oct 2026 – Sep 2027) | $5,849 | **$11,195** | $27,228 |
| Gross sales, year 3 (Oct 2028 – Sep 2029) | $16,913 | **$38,325** | $118,153 |
| Net operating result, year 1 | ($1,342) | **$1,238** | $12,048 |
| Net operating result, year 3 | $4,164 | **$17,573** | $76,295 |
| Break-even: trailing-12-month operating result stays ≥ 0 from | Dec 2027 | **Aug 2027** | Apr 2027 |
| First month with a positive operating result | May 2027 | **Mar 2027** | Mar 2027 |
| Founder capital needed (all of it Oct 2026 – Apr 2027) | $7,787 | **$7,715** | $6,238 |
| Self-funding from (no founder capital after) | May 2027 | **May 2027** | Apr 2027 |
| Cumulative result after one-time costs, month 36 | $1,733 | **$29,294** | $143,474 |
| Total cash at month 36 (operating + tax reserve) | $8,903 | **$35,614** | $145,732 |

"Net operating result" leaves out one-time costs. "Founder capital needed" is the cash the founder must put in so the operating account never goes below zero, including payout delays.

**The same results at mid-point costs.** These use the middle of every quoted range (cost position 0.5), which is what the first draft assumed.

| At mid-point costs | Conservative | Expected | Strong |
|---|---|---|---|
| Net operating result, year 1 | ($6,744) | ($4,164) | $6,646 |
| Net operating result, year 3 | ($1,761) | $11,648 | $70,371 |
| Break-even (trailing 12 months) | Not within 36 months | Dec 2027 | Jul 2027 |
| Founder capital needed | $21,892 | $16,819 | $15,314 |

**How the plan uses the scenarios.** The plan **budgets cash on the Conservative case**, which matches section 1's Low case, and **measures progress against the Expected case**. Strong is shown as an outlier: it needs a breakout listing and is not a planning case.

Six findings matter more than any single number:

1. **Fixed costs decide the first year, and they are mostly choices.** Digital products keep 80–93% of the price. On the lean path the business carries about **$398 a month** in operating costs, including a 10% contingency; at mid-point that rises to **$736**. Insurance is about 43% of the lean base. Adding the Expected ad test budget ($150 a month), covering fixed costs at month 12 takes about **63 orders a month** on the lean path, or about 101 at mid-point.
2. **The funding need is small, early and bounded, but only on the lean path.** On the lean path, every scenario needs about $6,200–$7,800 of founder capital, all of it between October 2026 and April 2027. At mid-point costs that rises to $15,300–$21,900, and any overrun passes the placeholder household-money cap ($12,000) by February 2027. That is why mid-point spending is a gated option in this plan, not the base.
3. **The board book fails its own go / no-go test in every scenario.** A customer-funded offset run needs about **920 pre-sale copies** (1,000 copies at $5.00 landed, plus print-month costs and a 15% buffer). The pre-sale brings in 2–26 copies, whether it runs in spring 2027 or spring 2028. At a 1,000-copy run the landed cost is 38% of retail, which fails the own-site cost rule. So *Up! Go! More!* stays a print-on-demand paperback, and the offset board book waits for the gate in 3.10 rule 4.
4. **Wholesale loses money on a single $12.99 book at current costs.** At a 1,000-copy landed cost, a Faire sale nets **−$1.00** a unit and a Walmart Marketplace sale about **−$0.11** [VERIFY fees]. Retail pays only with a larger run (2,500+ copies), more physical SKUs and a lower landed cost (3.8).
5. **The school wave is small and stays out of the base.** If counsel clears it in writing, the overlay adds about $1,900 to Expected's year-3 operating result. The plan does not depend on it.
6. **Sales rates and the cost position are the swing inputs.** A 25% miss on every sales rate moves Expected break-even from August to November 2027. Mid-point costs move it to December 2027. Both together, plus a two-month launch slip, move it to June 2028 and raise the funding need to about $20,350 (3.9).

---

## 3.1 What the workbook contains

| Tab | What it does |
|---|---|
| **Dashboard** | Three-scenario results, scenario anchors, three charts (monthly gross sales, cumulative founder capital, net operating result by year) and how-to-use notes. |
| **Assumptions** | Every driver and fee, each with its source file and a status: Repo, Assumption, [VERIFY] or Founder to enter. Blue cells are inputs; yellow cells are the key levers. It also holds the offset quote table (run size → cost per copy), the first-sale month, the household-money cap and the business-card balance. |
| **Unit Economics** | 40 product-and-channel rows showing price, fees, refunds, print or landed cost, fulfilment, net per unit, margin and sales-tax handling. Gated products carry a mix weight of 0. A channel blend feeds the forecast. **This tab is the plan's single margin sheet**; sections 2, 4 and 5 cite it. |
| **Startup Costs** | 21 included one-time items and 13 **GATED** items (Include = 0), each with its trigger and month, so nothing the plan mentions is left unpriced. |
| **Monthly Operating Costs** | 29 recurring items with an Include switch (E&O and the upload assistant are off pending a decision), laid out over 36 months, plus a 10% contingency. |
| **36-Month Forecast** | Three stacked scenario blocks. The digital catalog size drives the own site, Etsy and the merchant of record; titles live drive KDP and IngramSpark; the email list drives the course. The board book, school and retail blocks stay in the workbook but are switched off. Then come the totals, the trailing-12-month result, one-time costs and held inventory with a reorder point. |
| **Cash Flow** | Payouts lagged by channel, all costs, the tax reserve (held against cumulative profit), **founder capital in**, **cumulative founder capital**, account balances and the 3-month reserve target. |
| **Break-even** | Headline trailing-12-month break-even, the strict every-month test, funding need, self-funding month, the month the cap would be passed, orders needed per month, a single-product view and the retail self-funding check. |
| **Retail Readiness Costs** | Board-book pre-sale costs (A0), print-month costs (A), big-box readiness (B), ongoing retail costs (C), the first run, and the landed-cost test against each channel's cost rule. |

Every calculated cell is a formula. Change a blue cell on Assumptions, or a Low/High on the cost tabs, and every tab updates. Conventions: blue text for inputs, black for formulas, green for links to other tabs, yellow fill for key levers, navy (#1D2940) headers and frozen panes on every tab.

---

## 3.2 How the model works

### Demand drivers, tied to the section 1 anchors

The first draft drove every channel by visits × conversion. The review pointed out that the visit counts had no evidence behind them, and that KDP and IngramSpark do not report page views to publishers. The model now uses drivers the business can observe in its own sales reports:

| Channel group | Driver | Conservative | Expected | Strong |
|---|---|---|---|---|
| Own site, Etsy, merchant of record (digital) | Digital products live: 5 at launch, then added each month up to a cap | +0.5 a month, cap 12 | +0.75 a month, cap 15 | +1 a month, cap 20 |
| | **Digital units per product per month at full ramp**, all three channels together | **9.8** | **14.8** | **30.3** |
| | …of which Etsy / own site / international (orders per product × items per order) | 5 / 3 / 0.8 orders | 7 / 4 / 1.2 orders | 13 / 8 / 2 orders |
| | Growth in sales per product, years 1 / 2 / 3 | 0 / 0 / 0 | 0.5% / 0.5% / 0 a month | 1% / 1% / 0.5% a month |
| KDP paperbacks | Titles live: 3 at launch, then added each month up to a cap | +0.25 a month, cap 8 | +0.33 a month, cap 10 | +0.5 a month, cap 12 |
| | **Units per title per month at full ramp** | **2.5** (the kill-rule floor) | **5** | **10** |
| IngramSpark paperbacks (from Feb 2027) | Titles: 2, then added up to a cap; units per title per month | cap 4; 0.5 | cap 5; 1 | cap 6; 2 |
| 30 Days of Back-and-Forth (from Jan 2027) | Share of the email list reached each month × conversion | 10% × 1.0% | 15% × 1.5% | 20% × 2.0% |

**The anchors.** Section 1.5 sets the per-listing rates as: floor 2.5, Low 10, Base 30, breakout 75 units per product per month. Conservative is set at the Low case (9.8). Strong is set at section 1's Base (30.3). Expected sits between them (14.8). No scenario uses the breakout rate.

**Review ramp.** Every new channel reaches its full rate over 6 months (assumption). A new faceless shop starts with no reviews against incumbents holding 2,000–11,000 (`marketing/DEMAND-CHECK.md`).

**Seasonality.** The consumer index peaks in November–January and dips in late summer, following the repository calendar (`marketing/BLIND-SPOTS.md` #2 and #6). The levels are assumptions. The forecast divides the index by its 12-month average, so it cannot inflate annual volume. The first draft's index averaged 1.033 and overstated every year by about 3%.

**First-sale month (Gate A).** Costs start in October 2026. No channel can take money before the **first-sale month, set to December 2026 (month 3)**. As of September 28, 2026 there is no business bank account, no employment-counsel go-ahead, no general-liability policy, and none of the publish safeguards in section 5.6. The model assumes all of these are in place by the end of November. Each month of slip moves every channel back a month (3.9).

### Channels and waves in the base plan

| # | Channel | Starts (all scenarios) | Status in the base plan |
|---|---|---|---|
| 1 | Own site: printables and PDFs (Shopify) | Dec 2026 | On |
| 2 | Etsy: printables | Dec 2026 | On |
| 3 | Amazon KDP paperbacks (*100 Screen-Free Plays*, *Up! Go! More!*, *The Day the Tablet Slept*) | Dec 2026 | On |
| 4 | IngramSpark same-ISBN paperbacks to bookstores and libraries (passive catalog availability only) | Feb 2027 | On |
| 5 | International digital sales through a merchant of record (Gumroad) | Jan 2027 | On |
| 6 | 30 Days of Back-and-Forth (written course) | Jan 2027 | On |
| 7 | Board book: pre-sale, then 3PL and Amazon FBA | — | **Off.** A gated option; the go / no-go logic is built in (3.10 rule 4) |
| 8 | School and group licenses + TPT | — | **Off.** Overlay only if employment counsel clears it in writing (3.9) |
| 9 | Retail and wholesale (Faire, Walmart Marketplace) | — | **Off.** Target Plus has a mix weight of 0 until an invitation arrives |

The **month-1 product mix** holds only G0 content. The routine cards and the Family Kit launch as 0–5 editions, and the 5–12 sets are added free when counsel's G1 answer arrives. ALPHAPLAY Spelling Games (G1, trademark-use product) and the adult tee (after trademark clearance) carry a mix weight of 0, so they earn no forecast revenue.

**The email list.** New subscribers come from 3% of implied own-site sessions (the free "3 plays for your child's age" offer, `BLIND-SPOTS` #5), plus 15% of own-site, KDP, IngramSpark and international buyers through the bonus QR code, less 1.5% unsubscribes a month (Expected; all assumptions). **Etsy buyers are excluded.** Etsy and TpT editions carry no URL or QR code (`brand/BRAND.md`, customer-voice rule 2), and the playbook says not to send buyers off Etsy. Any Etsy-to-list route is limited to what Etsy's own rules allow [VERIFY]. The list reaches about 690 subscribers by September 2027 and about 3,500 by month 36 (Expected).

### Money timing

- **Payout delays** (Assumptions §4): Shopify and Gumroad pay in the month of the sale. **Etsy pays one month later**, because new sellers face a 14-day hold and a possible rolling reserve of about 30% for up to 45 days (section 5, risk 1). **KDP pays about 60 days after month end; IngramSpark about 90 days** (`storefront-setup-guide.md` A6).
- **Sales tax and VAT are pass-through** and never counted as revenue. Own-site sales add Maryland's 6% at checkout. Etsy, Amazon and TPT remit as marketplace facilitators. Gumroad remits US sales tax and EU/UK VAT as merchant of record.
- **Tax reserve.** 25% of *cumulative* profit after one-time costs is held in a separate account, and nothing is held while cumulative results are negative. A single-member LLC's losses pass through to the founder's own return, so reserving against early monthly surpluses would overstate the cash drag. This is money set aside, not a tax estimate. The accountant sets the real rate and the §195 startup-cost treatment (`finance/TAX-AUTOPILOT.md` §2; `ops/GAPS-ROUND-2.md`).
- **Opening cash is $0**, because the Chase checking account is closed (`finance/BANKING.md`). The Chase business card is still open, and any balance on it is an LLC liability. The model has an input for it (founder to enter) and pays it off in month 1.

---

## 3.3 Unit economics

Everyday prices follow `BRAND.md` "Honest pricing", which overrides the anchor-and-discount rule in `DEMAND-CHECK`. Each product has one price. There are no "list" or "was" prices and no standing sales.

| Product | Channel | Price | Net per unit | Margin | What drives it |
|---|---|---|---|---|---|
| Visual routine cards | Etsy | $6.50 | $5.21 | 80% | 6.5% transaction + 3% + $0.25 processing + $0.20 listing + Offsite Ads on 10% of sales + 2% refunds |
| Visual routine cards | Own site | $6.50 | $5.88 | 90% | Shopify 2.9% + $0.30, 2% refunds |
| Play-First Family Kit | Own site / Etsy / Gumroad | $11.00 | $10.16 / $9.12 / $9.18 | 92% / 83% / 83% | Fee stack by channel; Gumroad 10% + $0.50 covers VAT |
| Toddler busy book printable | Etsy | $11.99 | $9.98 | 83% | Etsy fee stack |
| *100 Screen-Free Plays* paperback (82 pp. B/W) | KDP | $16.99 | **$7.89** | 46% | 60% royalty minus KDP's flat $2.30 print cost for 24–108 B/W pages (`guide-100-plays/listing.json`) [VERIFY; check whether 8 × 10 in counts as large trim] |
| *Up! Go! More!* / *The Day the Tablet Slept* paperbacks (32 pp. colour) | KDP | $11.99 | **$3.95** | 33% | 60% royalty minus $3.24 premium-colour print ($1.00 + $0.07 × 32) [VERIFY: KDP may price short colour books at a flat rate] |
| Same paperbacks | IngramSpark at a 40% discount | $16.99 / $11.99 | $7.89 / $3.95 | 46% / 33% | 60% of list minus print (proxy: the KDP figures) [VERIFY in the IngramSpark calculator] |
| *The Day the Tablet Slept* hardcover (gated) | IngramSpark | $19.99 | $3.49 at 40%; about $0.50 at 55% | 17% | $8.50 print [VERIFY]. Mix weight 0 until the paperback sells |
| 30 Days of Back-and-Forth | Own site | $27.00 | $24.57 | 91% | Shopify fees, 5% money-back allowance |

**One figure for each book.** Sections 1, 2 and 3 now all use **$7.89** for *100 Screen-Free Plays* and **$3.95** for the 32-page colour paperbacks. Section 1's earlier $5 a copy and the first model's $8.21 are withdrawn.

**IngramSpark.** The base discount is **40%**. At the 55% library-jobber discount, the hardcover nets about $0.50 a copy, and `ops/ROUTINE.md`'s 8-week upkeep rule would cut it. *Whose Lap Today?* is no longer in this channel: it is now a personalized keepsake printed per order (`amazon_route` "none-with-reason"). Passive catalog availability to bookstores and libraries is in the base plan. Active library or school marketing is G2 and stays held.

**Board book, gated option.** Net per unit depends on the print run, because the quote table sets the print cost by run size.

| Run size (quote table, all [VERIFY]) | Print / landed per copy | Landed % of $12.99 | Own site via 3PL | Amazon FBA | Faire wholesale | Walmart Marketplace |
|---|---|---|---|---|---|---|
| 1,000 (repo high end, `BLIND-SPOTS` #11) | $4.00 / $5.00 | 38% | $1.55 | $0.34 | **−$1.00** | **−$0.11** |
| 2,500 (assumption) | $2.20 / $2.75 | 21% | $3.80 | $2.59 | $1.25 | $2.14 |
| 5,000 (assumption) | $1.60 / $2.00 | 15% | $4.55 | $3.34 | $2.00 | $2.89 |

The rows are built as follows:
- **Own site:** 3PL pick and pack ($3.50) plus about $2 of postage the business absorbs, because free shipping is the norm (assumption).
- **FBA:** 15% referral, the books closing fee (about $1.80), the FBA fee ($3.50) and a $0.40 storage and placement allowance [VERIFY all].
- **Faire:** half of retail, 15% commission, 3% processing, 5% deductions and $1.00 handling.
- **Walmart:** 15% referral, 5% deductions, 3PL pick and pack plus postage [VERIFY].

The first draft used the $2.90 mid-point of a range that runs from 1,000 to 3,000 copies. A 1,000-copy run sits at the high end of that range, and at that cost only direct sales make money.

**Digital products carry the business.** Over 36 months of the Expected case, 87% of net contribution comes from printables and the course and 13% from print-on-demand books. Own-site sales keep 9–10 more points of the price than Etsy, but Etsy supplies the search traffic a new brand lacks.

---

## 3.4 Costs

### Startup (one-time)

**Base plan (lean path): $4,941** across 21 included items. The same items cost $10,336 at mid-point and $15,731 at the high end (Startup Costs tab). $3,691 falls in October–December 2026 and $1,250 in January–March 2027.

| Largest included items (lean / high) | Source |
|---|---|
| USPTO filing, PLAY BEFORE PIXELS, classes 16 + 41: $700 / $700 | `legal/protection/PROTECTION-PLAN.md` #7 |
| Trademark clearance search + attorney opinion: $500 / $2,500 | `legal/DECISION-MEMO.json` |
| Attorney: Terms of Sale and site legal pages: $500 / $2,500 | `PROTECTION-PLAN` |
| Attorney: IP assignment + operating agreement: $500 / $2,000 | `PROTECTION-PLAN` #5 |
| Attorney: successor + durable power of attorney: $500 / $1,500 | `BLIND-SPOTS` #20 |
| Copyright filings before November 11, 2026: $360 / $680 | `PROTECTION-PLAN` |
| ALPHAPLAY attorney + Statement of Use or extension: $450 / $1,625 | `BLIND-SPOTS` #9; `PROTECTION-PLAN` #6 |
| ISBNs: $0 (KDP's free ISBN, business/DECISIONS.md; was Bowker 10 for $295) | `PROTECTION-PLAN` |
| Accountant setup review: $300 / $1,000 | assumption [VERIFY] |

**Gated one-time items, not in the base plan** (Include = 0; each switches on only when its trigger is met). They total about $46,100 at the low end and $76,450 at the high end.

| Gated item | Low – high | Trigger |
|---|---|---|
| Spanish starter localization | $4,700 – $5,800 | Break-even line met; no Spanish revenue line exists yet, so it is out of the base |
| Library credibility (cataloging, one paid review, award entries) | $800 – $1,100 | Break-even line met |
| French and German starter sets + legal review per market | $10,000 – $14,000 | Spanish meets its targets |
| Madrid international trademark | $2,500 – $4,500 | US application looks safe (`DECISION-MEMO`) |
| USPTO class 28 filing | $350 | A card deck is planned for retail |
| Books 2 and 3: illustration, CPSIA testing, 2,500-copy runs | $17,350 – $32,000 | Board book printed and selling (3.10 rule 4) |
| Offset card-deck run (5,000 decks) | $10,000 – $17,500 | POD deck sells, then a retail case exists |
| Tradition reviewers (4 traditions) | $400 – $1,200 | Seasonal countdown calendars are built |

The board-book pre-sale costs (illustrator, product-safety attorney, pre-sale terms review, pre-order app: $2,100–$7,260) and print-month costs ($450–$2,300) sit on Retail Readiness Costs. They are spent only if the board book is switched on.

### Monthly operating costs

**Lean path: about $398 a month** at steady state, including the 10% contingency ($5,812 in year 1 and $6,808 in each of years 2 and 3). **Mid-point: about $736 a month** ($11,214 in year 1; $12,733 a year after that). Annual items come on top in the month they fall due: accountant, SDAT report, domains, PO Box, resident agent and GDPR representatives.

| Group (lean path, per month) | Amount | Source |
|---|---|---|
| Insurance: GL with products-completed operations, media liability, cyber, umbrella | about $155 | `PROTECTION-PLAN` averages and low ends; bound before the first sale (month 3) |
| Claude plan for the routines (usage-credit cap $0 on the lean path) | $100 | assumption, $100–$200 [VERIFY]; cap from `ops/GAPS-ROUND-2.md` G2-06 |
| QuickBooks Online + Link My Books | $59 | `finance/money-and-tax-setup.md` |
| Shopify Basic | $39 | storefront guide §1 |
| Business email, Etsy renewals; scheduler, review app, PDF stamping and filing service at $0 on the lean path | about $9 | `BLIND-SPOTS` #4; assumption |
| GDPR Art. 27 representatives, EU and UK (annual, from January 2027) | $220 – $1,300 a year | section 5.8 (unverified) |

**Insurance timing and E&O.** One rule applies throughout: general liability is bound **before the first sale** (`PROTECTION-PLAN`; section 5.8), which is month 3 in the model. Professional liability / E&O ($62–$125 a month) was written for coaching, which the business no longer offers. It is modelled as a switch, **off until the broker advises**. Turning it on costs about $820 a year of operating result (3.9). A broker quote for a digital-first micro-business remains the largest single saving available [VERIFY].

**Paid advertising: optional tests with no revenue credit.** Traffic in this model is organic. Ads are a capped test budget: nothing in Conservative's year 1; $150 a month in Expected (the Amazon Ads floor of $5 a day on live titles), $250 in year 2 and $350 in year 3; twice that in Strong. The model gives ads no extra sales, so they show only as a cost. The playbook's Pinterest and Meta tests ($300–$600 each) run only after the break-even line is met, one test at a time, and each is cut when CAC misses target (`marketing/MARKETING-PLAYBOOK.md`). Removing ads entirely adds about $4,200 to Expected's year-3 result (3.9).

**Wave fixed costs** apply only if a gated wave is switched on: 3PL minimum ($150 a month [VERIFY with quotes]) plus Seller Central ($39.99) from the board-book print month, and $154–$563 a month for retail EDI, the insurance uplift and GS1 renewal once retail is live.

---

## 3.5 The three scenarios

The scenarios differ only in demand inputs (3.2) and the ad test budget. Costs, prices and gates are the same in all three.

**Conservative (the budget case; matches section 1's Low case).** Year 1 sells about 550 orders for $5,849. That is close to section 1's Low estimate of 600 units and $5,520 from five listings. The business is operating-positive from May 2027, and the trailing-12-month result stays positive from December 2027. Year 3 reaches about $16,900 in sales and $4,164 of operating result. At mid-point costs, Conservative does not break even within 36 months and needs about $21,900 of founder capital. The plan's cash cap is therefore sized to Conservative on the lean path.

**Expected (the target the scorecard reports against).** Year 1 sells about 970 orders for $11,195, and year 3 about 3,170 orders for $38,325. Operating profit first appears in March 2027. The trailing-12-month result holds from August 2027, and the business needs no founder capital after April 2027. Two comparisons keep this in proportion:
- **Etsy.** Expected's year-3 Etsy volume is about 1,400 orders. That is about 64% of the *lifetime* sales of the strongest routine-card shop in the demand check (2,189). Reaching it means the shop becomes one of the stronger printable shops in its niche within three years. That is a stretch, not a certainty.
- **Month 36.** Monthly orders reach about 220, across roughly 15 digital products and 10 KDP titles.

**Strong (outlier, not a planning case).** Strong uses section 1's Base rate of 30 units per product per month. Year 3 reaches about 9,000 orders ($118,000), including about 3,970 Etsy orders. That is almost twice the strongest routine-card shop's lifetime total in a single year, and it would need a breakout listing. The first draft compared Strong's *monthly* order count with incumbents' *lifetime* totals and concluded it was "below the category leaders". That comparison was wrong and has been withdrawn.

---

## 3.6 Cash flow and funding: sources and uses

**Uses, October 2026 – April 2027 (Expected, lean path):**

| Month | One-time startup | Operating costs | Ad tests | Payouts received | **Founder capital in** | Cumulative |
|---|---|---|---|---|---|---|
| Oct 2026 | $1,651 | $434 | — | — | **$2,086** | $2,086 |
| Nov 2026 | $1,090 | $202 | — | — | **$1,292** | $3,378 |
| Dec 2026 | $950 | $370 | — | $44 | **$1,276** | $4,654 |
| Jan 2027 | $300 | $612 | $150 | $173 | **$889** | $5,543 |
| Feb 2027 | $450 | $528 | $150 | $299 | **$829** | $6,372 |
| Mar 2027 | $500 | $398 | $150 | $449 | **$599** | $6,971 |
| Apr 2027 | — | $1,278 (annual items) | $150 | $684 | **$744** | **$7,715** |
| May 2027 on | — | — | — | — | $0 | $7,715 |

**Sources:**

| Source | Amount | Status |
|---|---|---|
| Founder capital, recorded as owner contributions to AlphaPlay LLC | Lean path: about $7,700 (Expected) to $7,800 (Conservative), paid in monthly as the table shows | Founder decides |
| **Household-money cap** (the most founder capital the business may take) | **Placeholder $12,000.** Not yet set by the founder (`ops/GAPS-ROUND-2.md` G2-10; section 5.13 item 3) | Founder to set, with a review date |
| Existing Chase business-card balance | Not in the repo; an LLC liability paid in month 1, added on top of the table above | Founder to enter on Assumptions |
| Debt, investors, personal guarantees | None. `PROTECTION-PLAN` rules out personal guarantees | — |

**Hard stop.** When cumulative founder capital reaches the cap, all spending that is not deadline-driven stops: gated items, ad tests and new channels. The routine re-forecasts from real data, and the founder decides in writing whether to raise the cap or cut costs. On the lean path, no scenario reaches the $12,000 placeholder. At mid-point costs, every scenario passes it in February 2027, so spending above the lowest written quote needs its own approval under the cap.

**Other cash points:**
- **Payout delays** hold back about one month of Etsy revenue and two to three months of book royalties. In Expected, total payouts reach about $1,280 a month by September 2027.
- **The tax reserve** starts filling in December 2027 in Expected, when cumulative results turn positive. It holds about $7,300 at month 36.
- **The 3-month reserve target** (`ops/ROUTINE.md`) is met from late 2027 in Expected and from early 2028 in Conservative, except in the months when annual bills fall due.
- **No inventory is bought in the base plan.** If the board book is switched on and passes its go line, the first run is paid in the print month and reordered at a reorder point with a 3-month lead time (assumption). A pre-sale that misses the go line is refunded in full. The model then counts no revenue, and about $100 of card fees is lost.

---

## 3.7 Break-even

**Headline measure: the trailing-12-month operating result.** It must stay at or above zero from a given month through month 36. The first draft required every single month to stay positive. Annual bills in October and April then pushed its break-even date back by up to a year for shortfalls as small as $9. The strict test is still reported alongside.

| Measure | Conservative | **Expected** | Strong |
|---|---|---|---|
| Trailing-12-month result ≥ 0 from | Dec 2027 | **Aug 2027** | Apr 2027 |
| First month with a positive operating result | May 2027 | **Mar 2027** | Mar 2027 |
| Strict test: every later month ≥ 0 | May 2029 | May 2027 | Mar 2027 |
| Cumulative orders by the headline month | about 930 | **about 820** | about 560 |
| Fixed costs at month 12 (operating costs + ad tests) | $398 | **$548** | $698 |
| Net contribution per order at month 12 | $8.14 | **$8.75** | $9.47 |
| **Orders a month needed at month 12** | **49** | **63** | **74** |
| Orders the scenario forecasts at month 12 | 81 | 151 | 362 |
| Orders needed at month 12, mid-point costs | 90 | 101 | 109 |

**The break-even line for the scorecard: about 65 orders a month (2 a day) on the lean path, or about 100 (3–4 a day) at mid-point costs.** This is the figure section 5.10 uses.

**Single-product view.** Expected month-12 fixed costs ($548) equal any one of these each month:

| If only this sold | Units a month | Per day |
|---|---|---|
| 30 Days of Back-and-Forth | 22 | 0.7 |
| Play-First Family Kit on the own site | 54 | 1.8 |
| Toddler busy book on Etsy | 55 | 1.8 |
| Play-First Family Kit on Etsy | 60 | 2.0 |
| *100 Screen-Free Plays* paperback on KDP | 69 | 2.3 |
| Visual routine cards on Etsy | 105 | 3.5 |
| Board book on the own site (1,000-copy run) | 353 | 11.8 |

---

## 3.8 Retail readiness: what the path to Target costs

**One cost rule for each channel.** This replaces the four different thresholds in the first draft. It is the rule sections 2, 4 and 5 now cite.

| Channel | Landed cost at or below | For the $12.99 board book | 1,000-copy run ($5.00) | 2,500-copy run ($2.75) | 5,000-copy run ($2.00) |
|---|---|---|---|---|---|
| Own site and Amazon FBA | 35% of retail (`DEMAND-CHECK` rule 9, lower bound) | $4.55 | fails | passes | passes |
| Faire and other wholesale | 25% of retail (assumption) | $3.25 | fails | passes | passes |
| Chain retail through a distributor or rep | 20% of retail (assumption; section 4.4) | $2.60 | fails | fails | passes |

Section 4.4 tests the chain rule with 25% and 35% returns reserves. Gate C in section 5.12 applies the rule for the channel a given run is meant for.

**Readiness costs** (Retail Readiness Costs tab; lean – high; nearly all [VERIFY]):

| Block | Cost | When |
|---|---|---|
| A0. Before a board-book pre-sale: human illustrator, product-safety attorney, pre-sale terms review, pre-order app | $2,100 – $7,260 | Month before the pre-sale, spent whether or not it reaches the go line |
| A. Print month: CPSIA lab test for ages 0–3, proofs, 3PL setup, FBA prep | $450 – $2,300 | Only if the pre-sale reaches the go line |
| First offset run | $5,000 (1,000 copies) · $6,875 (2,500) · $10,000 (5,000) | Print month |
| B. Big-box readiness: GS1 prefix for non-book SKUs, CPSIA for two more SKUs, retail packaging, agreement review, sell sheet and samples, Faire allowance, broker binder at chain limits | $2,150 – $8,650 | Three months before retail opens |
| C. Ongoing retail: 3PL EDI, insurance uplift at chain limits (its own line), GS1 renewal | $154 – $563 a month | While retail is live |
| Retailer-directed marketing budget for each retail launch (retailer-site ads, pins pointing to the retail listing) | $300 – $600 per launch (assumption) | Stated in the proof pack (section 4.7) |
| Not priced: distributor fee (about 20–30% of net receipts) or rep commission (15–20% of wholesale), co-op and placement | — | In the margin walk (4.4) |

**Self-funding check.** At a 1,000-copy landed cost, the retail blend (60% Faire, 40% Walmart Marketplace; Target Plus at 0) nets **−$0.64 a unit**, so no volume covers retail's monthly costs. At a 2,500-copy landed cost, the same blend nets about $1.61 a unit and needs roughly 100 retail units a month to cover the lean monthly costs, plus about 1,340 units to repay the lean readiness spend. **Stage 2 wholesale is therefore budgeted as a capped proof expense, not a profit centre** (section 4.2).

**Why in-store placement is not in the forecast.** It depends on a buyer's decision that no sales-rate input can represent. For the Target goal, the model's job is narrower: to show the volume, the line depth and the landed cost that must exist first, and what the readiness steps cost.

---

## 3.9 Key sensitivities

Each row changes one thing (or one stated set of things) and recalculates the whole workbook in LibreOffice. Unless marked, figures are for Expected on the lean path.

| Change | Year-3 operating result | Founder capital needed | Break-even (trailing 12 months) | Result after one-time costs, month 36 |
|---|---|---|---|---|
| **Base (lean path)** | $17,573 | $7,715 | Aug 2027 | $29,294 |
| Mid-point costs (cost position 0.5) | $11,648 | $16,819 | Dec 2027 | $6,648 |
| High-end costs (1.0) | $5,723 | $27,301 | Apr 2028 | ($15,998) |
| Every sales rate 25% lower | $9,992 | $8,131 | Nov 2027 | $13,066 |
| Every sales rate 25% higher | $25,444 | $7,297 | Jun 2027 | $45,973 |
| First sale slips to January 2027 (Gate A late) | $17,367 | $8,396 | Oct 2027 | $26,854 |
| First sale slips to February 2027 | $17,142 | $8,962 | Nov 2027 | $24,376 |
| Mid-point costs + sales 25% lower | $4,067 | $18,111 | Apr 2028 | ($9,580) |
| **Downside: mid-point costs + sales 25% lower + February start** | $3,783 | $20,350 | Jun 2028 | ($13,177) |
| Spanish localization and library-credibility spend switched on | $17,573 | $9,905 | Aug 2027 | $23,794 |
| E&O insurance bought | $16,754 | $8,056 | Sep 2027 | $26,975 |
| No ad tests at all | $21,773 | $7,115 | Jul 2027 | $37,844 |
| IngramSpark discount 55% instead of 40% | $17,442 | $7,715 | Aug 2027 | $29,031 |
| **School overlay (only if counsel clears in writing)** | $19,485 | $7,715 | Aug 2027 | $31,431 |
| Board book switched on, pre-sale Feb–Apr 2028 | $17,573 | $7,715 | Aug 2027 | $27,094 (pre-sale 9 copies vs a go line of 920: no-go, refund) |
| Board book switched on, pre-sale Feb–Apr 2027 | $17,573 | $9,815 | Aug 2027 | $27,094 (pre-sale 10 copies vs 920: no-go, refund) |

**Conservative under the same stresses.** Base: $4,164 year-3 result, $7,787 founder capital, break-even Dec 2027. Mid-point costs: ($1,761), $21,892, not within 36 months, and the $12,000 cap is passed in February 2027. Downside set: ($5,075), $30,356, not within 36 months.

What this means in plain terms:
- **The cost position is the lever the founder controls, and it matters most.** Moving from lean to mid-point costs roughly doubles the funding need and moves break-even back four months. Most of the gap is attorney fees, insurance and the Claude plan tier, and all of them can be quoted. That is why the base plan requires the lowest written quote for each item, with anything higher approved under the cap.
- **Demand is the largest unknown.** A 25% miss moves break-even back three months on the lean path. It barely changes the funding need, because nearly all of that need falls before sales matter. It does cut the year-3 result by about 43%.
- **A late Gate A costs little by itself.** Each month of slip moves break-even by about a month and adds about $600 of founder capital. Stacked with mid-point costs and weak demand, the Expected funding need reaches about $20,000 and Conservative's about $30,000. That downside is what the cap and the hard stop are for.
- **The school wave is worth about $1,900 a year by year 3.** It is useful but not needed, and it stays off until counsel answers in writing.
- **The board book cannot be customer-funded inside 36 months.** Its pre-sale reaches about 1% of the go line in every scenario, and switching it on costs about $2,200 of preparation for nothing. The route to it is 3.10 rule 4.

---

## 3.10 Decision rules the numbers support

These turn the model into operating rules for the routines. Each applies a rule already in the repository to a number from the model.

1. **Break-even line: about 65 orders a month by month 12 on the lean path** (about 100 at mid-point costs). Track it on the Friday scorecard (`ops/ROUTINE.md`). Section 5.10 uses the same number.
2. **Kill rule as written.** A listing with fewer than 5 sales in 60 days after SEO fixes is repriced once, then folded into a bundle (`DEMAND-CHECK` §3). Any product or channel that earns less than its upkeep for 8 weeks is cut or fixed (`ops/ROUTINE.md`).
3. **Spend gate for one-time items.** Every GATED item on Startup Costs stays off until its trigger is met. The Spanish localization and the library-credibility spend need two consecutive months at or above the break-even line *and* room under the cap. Legal and IP items with deadlines are never deferred: copyright before November 11, 2026; ALPHAPLAY by March 8, 2027; the PLAY BEFORE PIXELS filing.
4. **Board-book gate: all five conditions, in writing, before any pre-sale spending.**
   - (a) The trailing-12-month result has been positive for 6 months.
   - (b) Retained cash covers the A0 and A costs, the full run and the 3-month reserve, so the run is not customer-funded.
   - (c) The print-on-demand *Up! Go! More!* paperback has sold at least **40 units a month for 3 months**. The assumption is that a board book sells about 2.5 times the paperback, so a 2,500-copy run is about two years of stock.
   - (d) Written quotes show landed cost within the cost rule for the intended channel (3.8).
   - (e) The product-safety attorney has said who certifies under CPSIA.

   The pre-sale's go line, recalculated from real quotes, still applies after that. Below it, the pre-sale is refunded in full (FTC mail-order rule, `BLIND-SPOTS` #16). On Expected velocity (about 5 paperback units a month), condition (c) is not met within 36 months.
5. **Retail gate.** Open Faire or Walmart Marketplace only when all of these hold:
   - the line has at least three physical SKUs;
   - landed cost is quoted and within the channel rule;
   - the Break-even tab shows retail paying its own monthly costs at forecast volume.

   Target Plus is not a task: it opens only by invitation.
6. **Conservative trigger.** If month-6 orders (May 2027) run below Conservative's 43 a month, stop all ad tests, move every tool to its lowest tier and pause every item that is not deadline-driven. Then re-forecast.
7. **Cap rule.** Founder capital never exceeds the household-money cap without a new written decision (3.6).

---

## 3.11 Limits of the model and what to replace first

1. **Sales per product and units per title** are guesses tied to section 1's anchors. Replace them with 90 days of Shopify, Etsy and KDP sales reports (units by product and title), which the business can observe directly.
2. **Every fee marked [VERIFY] or UNVERIFIED.** Above all: the KDP print costs (including the large-trim and short-colour questions), the IngramSpark print costs, the Shopify and Etsy fee stacks, the Claude plan price and the FBA fee stack.
3. **Insurance premiums.** Replace the averages with broker quotes, including one at chain limits.
4. **Board-book quotes** at 500, 1,000, 2,500 and 5,000 copies (`BLIND-SPOTS` #11 plus section 4), with freight, duties, 3PL receiving and storage.
5. **Simplifications:**
   - Fixed per-order fees are charged per item, which slightly understates net on multi-item orders.
   - Channel mix weights are fixed over time.
   - The Etsy payout lag is one month throughout.
   - The tax reserve is a cash rule, not a tax calculation.
   - Pre-sale cash is shown as received in the month collected. Under rule 4 it is a liability until the print decision.
6. **Material exclusions, priced as gated items (3.4) and not in any base figure:**
   - books 2 and 3: $17,350–$32,000;
   - the offset deck run: $10,000–$17,500;
   - French and German: $10,000–$14,000;
   - Madrid: $2,500–$4,500;
   - class 28: $350;
   - tradition reviewers: $400–$1,200;
   - the upload assistant: up to $200 a month;
   - distributor and rep fees.

   **Not modelled at all:**
   - subscription kits and professional licenses (still under research in `ops/QUEUE.md`);
   - any live service (banned by `BRAND.md`);
   - employment-counsel fees (the founder's personal matter);
   - income tax actually payable.

---

## 3.12 Decisions this section needs from the founder

1. **Set the household-money cap and its review date.** The lean path needs about $7,800 between October 2026 and April 2027. The $12,000 placeholder leaves about $4,200 for price surprises. Enter the real figure on Assumptions.
2. **Enter the Chase business-card balance**, so the model and the accountant treat it as an LLC liability.
3. **Approve the lean path as the base plan.** Take the lowest written quote for each cost. Any higher quote, and every GATED item, needs its own approval under the cap.
4. **Get broker quotes** for GL, media liability, cyber and umbrella, and ask whether E&O is still needed now that no coaching is offered.
5. **Adopt the board-book gate (rule 4) and the cost rule by channel (3.8).** The spring 2027 pre-sale is withdrawn.
6. **Ask the accountant** for the tax-reserve rate, the §195 startup-cost election and the treatment of pre-sale cash.
