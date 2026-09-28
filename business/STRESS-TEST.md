# Financial stress test

*Play Before Pixels, a trade name of AlphaPlay LLC. Internal planning file, not for publication. Written September 28, 2026. Every figure below is a planning estimate, not a forecast of income or a promise of results. Script: `business/stress_test.py`. Re-run it with `python3 business/stress_test.py`; section 9 explains how to feed it real sales data.*

## Summary

Play Before Pixels is a sound business on a small scale, but it will not be a fast one. Its products keep most of each sale: 80–93% of the price of a printable, and about $4–$8 of each paperback. On the lean-path costs it needs about **65 orders a month, roughly two a day**, to cover every fixed cost. It starts with no reviews and no traffic, though, and it cannot take money until Gate A is met (bank account, counsel's go-ahead, insurance). I ran 10,000 simulated futures for October 2026 to September 2027, all with no ad budget. In the middle outcome (the median, P50), the business sells about **$6,300** in that year and makes an **operating loss of about $3,300**. After the one-time legal and IP setup costs, the loss is about **$10,000**. One future in ten sells more than $19,800 and makes more than $6,300 of operating profit. One in ten sells less than about $2,000. The plan's Expected case sits at about the 74th percentile: roughly one future in four does better. Calendar 2026 is a setup year. Its median sales are under $100, and its 90th percentile (P90) is about $570. **Reaching $1,000,000 by December 31 would take about 86,600 orders, about 1,400 a day from November 1. That is roughly 1,700 times the P90**, so it is not a realistic goal for 2026. That is no judgement on the products. Every successful shop in the demand check took years to build its sales. Realistic 2026–27 goals are these: the first sale, the first 100 orders (median: April 2027) and the two-orders-a-day break-even pace (median: June 2027). The things that raise the median most are in the founder's hands. The biggest is holding every cost to the lowest written quote, which also keeps the cash hole under the $12,000 placeholder cap in almost every future (without it, 41% of futures pass the cap). The others are cutting about $100 a month of fixed cost, lifting traffic and conversion with steady publishing and better listings, and meeting Gate A early enough to sell in November. At the ad prices assumed here, paid ads lose money on every launch product.

**Labels used throughout.** **SOURCE (file)** = the number comes from that repository file. **ASSUMPTION** = a planning input chosen for this test. **UNVERIFIED** = a platform rule or price that nobody has checked on the live page. The proxy blocked web search in this session, so every UNVERIFIED item is listed in "Needs a live check" at the end.

### Key numbers at a glance

| Measure | Value | Label |
|---|---|---|
| Fixed costs per month, lean path, annual bills spread over 12 | $567 | SOURCE `PlayBeforePixels_Financial_Model.xlsx` (Monthly Operating Costs) |
| Contribution per order, blended, at month 12 | $8.73 | Derived from the workbook's Unit Economics and mix weights |
| Break-even pace, lean path | 65 orders a month (2.1 a day) | Derived |
| Break-even pace, mid-point costs | 122 orders a month (4.0 a day) | Derived |
| Median (P50) 12-month sales / operating profit, Oct 2026 – Sep 2027 | $6,284 / ($3,311) | Monte Carlo |
| P10 – P90 12-month sales | $2,037 – $19,778 | Monte Carlo |
| P50 / P90 sales, calendar 2026 | $90 / $574 | Monte Carlo |
| Chance that sales beat the plan's Expected ($11,195) | 26% | Monte Carlo |
| Chance that operating profit for the 12 months is above $0 | 27% | Monte Carlo |
| Chance that September 2027 alone is profitable | 66% | Monte Carlo |
| P50 deepest cumulative loss (a proxy for founder capital) | $11,268 at the simulated costs; $7,631 if every cost holds at the lean quote | Monte Carlo |
| Orders needed for $1,000,000 by Dec 31, 2026 | 86,605 at $11.55 an order | Derived |

---

## 1. Unit economics per launch product per channel

**Formula:** net per unit = price × (1 − platform % − payment % − refund allowance) − fixed fees − print cost. This is the workbook's own formula (SOURCE `PlayBeforePixels_Financial_Model.xlsx`, Unit Economics tab). Prices come from the same tab.

**Fee stacks used (the plan's own, from the workbook's Assumptions tab):**

| Channel | Fees used | Source | Status |
|---|---|---|---|
| Own site (Shopify Basic) | 2.9% + $0.30 per order. Plan $39 a month | SOURCE workbook `shop_pct`, `shop_fix`, from `commerce/storefront-setup-guide.md` §1 | **UNVERIFIED** |
| Etsy | 6.5% transaction + 3% + $0.25 processing + $0.20 listing fee. Offsite Ads 15% on the 10% of sales it drives (adds 1.5%) | SOURCE workbook, from storefront guide §10 | **UNVERIFIED**. The 10% Offsite Ads share is an ASSUMPTION |
| Gumroad (merchant of record, buyers outside the US) | Workbook: 10% + $0.50. `REVENUE-PLAN.md` adds card processing of 2.9% + $0.30 | SOURCE workbook; SOURCE `business/REVENUE-PLAN.md` rank 1 | REVENUE-PLAN marks this VERIFIED from Gumroad's published source code. Still check it live |
| Amazon KDP paperback | 60% royalty at a list price of $9.99 or more, minus print. Print is $2.30 flat (B/W, 24–108 pages) and $1.00 + $0.07 a page (premium colour) | SOURCE workbook, storefront guide §6, `products/*/listing.json` | **UNVERIFIED**. 8 × 10 in and 8.5 × 8.5 in are probably "large trim", which costs $2.84 flat and $1.00 + $0.08 a page (SOURCE `REVENUE-PLAN.md` ranks 4 and 6 and the critic; UNVERIFIED) |
| IngramSpark | 40% wholesale discount. Print cost uses the KDP figures as a proxy | SOURCE workbook `ing_disc`, `ing_pb_print` | ASSUMPTION / **UNVERIFIED**. `REVENUE-PLAN.md` adds a 1.875% market-access fee and colour print of about $3.50–$4.50 |
| Refunds | 2% of digital sales; 5% of course sales | SOURCE workbook `refund`, `refund_course`; `ops/GAPS-ROUND-2.md` G2-12 | ASSUMPTION |

**Printables (Wave 1, the launch-first five).** Net per unit after fees and refunds:

| Product | Price | Own site | Etsy | Gumroad, workbook fees | Gumroad, with card fee |
|---|---|---|---|---|---|
| Visual routine cards | $6.50 | $5.88 (90%) | $5.21 (80%) | $5.22 (80%) | $4.73 |
| "I'm bored" play cards | $6.50 | $5.88 (90%) | $5.21 (80%) | $5.22 (80%) | $4.73 |
| Play-First Family Kit | $11.00 | $10.16 (92%) | $9.12 (83%) | $9.18 (83%) | $8.56 |
| Toddler busy book printable | $11.99 | $11.10 (93%) | $9.98 (83%) | $10.05 (84%) | $9.40 |
| 100 Screen-Free Plays PDF | $9.99 | $9.20 (92%) | $8.24 (82%) | $8.29 (83%) | $7.70 |
| *Routine cards at the $9.50 in their listing.json* | $9.50 | $8.73 (92%) | $7.82 (82%) | n/a | n/a |

**Books and course:**

| Product | Channel | Price | Net, workbook | Net, corrected | What differs |
|---|---|---|---|---|---|
| *100 Screen-Free Plays* paperback (82 pp., B/W, 8 × 10) | KDP | $16.99 | $7.89 (46%) | $7.35 | Large-trim print $2.84, not $2.30 (UNVERIFIED) |
| *The Day the Tablet Slept* paperback (32 pp., colour) | KDP | $11.99 | $3.95 (33%) | $3.63 | Large-trim colour print $3.56, not $3.24 (UNVERIFIED) |
| *Up! Go! More!* paperback (32 pp., colour) | KDP | $11.99 | $3.95 (33%) | $3.63 | Same |
| *100 Screen-Free Plays* paperback | IngramSpark, 40% | $16.99 | $7.89 | $7.04 | Access fee plus large-trim print (UNVERIFIED) |
| *Up! Go! More!* paperback | IngramSpark, 40% | $11.99 | $3.95 | $2.97 | Colour print about $4.00 plus access fee (UNVERIFIED) |
| 30-Day Screen Reset | Workbook: Shopify. listing.json: merchant of record | $27.00 | $24.57 (91%) | $21.37 | The course is sold through the merchant of record (SOURCE `products/course-screen-reset/listing.json`; `operations/AUTOMATION-MAP.md` 3G), which costs 12.9% + $0.80 |
| 30-Day Screen Reset bundle | Same | $49.00 | $44.83 (91%) | $39.43 | Same |

**What this shows:**
- **Digital products carry the business.** They keep $5–$11 of a $6.50–$12 sale. A colour paperback keeps about $3.60–$3.95.
- **Etsy keeps about 10 points less of the price than the own site.** It also supplies most of the traffic, so channel mix matters more than a fee change: a 20% rise in every fee moves 12-month profit by only about $400 (section 2).
- **A $6.50 card set on Etsy nets $5.21.** It takes about 109 of them a month to cover the fixed costs (section 5).

**Record conflicts to fix.** Each one changes a number the plan relies on.
1. **Routine-card price.** The workbook uses $6.50; `products/visual-routine-cards/listing.json` says $9.50. One of them is wrong. At $9.50 the Etsy net is $7.82 rather than $5.21, if buyers still convert.
2. **Course channel.** The workbook sells the Reset on Shopify ($24.57 net). Its listing.json routes it through the merchant of record ($21.37 net).
3. **Gumroad card fee.** The workbook leaves out the 2.9% + $0.30 card-processing fee, which lowers each international sale by $0.49–$0.65.
4. **KDP trim size.** The 8 × 10 and 8.5 × 8.5 books are probably large trim, which lowers the royalty by $0.32–$0.54 a copy (UNVERIFIED).
5. **IngramSpark colour print cost.** The KDP proxy ($3.24) is below `REVENUE-PLAN.md`'s $3.50–$4.50.
6. **Email platform.** The workbook costs it at $0 for all of year 1. On Expected, the list passes 250 subscribers around April 2027. That is the free-tier limit the repo gives for Klaviyo and, per `marketing/MARKETING-PLAYBOOK.md`, now for MailerLite as well (UNVERIFIED). Budget about $20 a month from then.
7. **Ads in the Expected case.** The workbook's Expected case carries $150 a month of ads and gives them no sales credit. This test removes them, as the task requires, which adds $1,350 to year-1 operating profit.

Together, fixes 2–5 cut the base-case 12-month profit by about $145 ("fee set" in section 2). They are small, but they should be fixed in the workbook (`business/build_financial_model.py`).

---

## 2. Sensitivity: what moves 12-month revenue and profit

**Base case.** It uses the workbook's Expected demand, first sales in December 2026, the lean-path costs and no ads. The test's own funnel is visitors × conversion × order value, plus repeat buyers, calibrated to the workbook. It reproduces the workbook's Expected year-1 gross sales within 1% ($11,306 against $11,195; the gap is a small repeat-purchase stream the workbook does not model) and its operating costs exactly ($5,812).

| Oct 2026 – Sep 2027 | Base |
|---|---|
| Gross sales | $11,306 (982 orders; 48,007 visitors) |
| Net contribution | $8,493 |
| Operating costs | $5,812 |
| **Operating profit (before one-time costs)** | **$2,681** |
| One-time startup costs | $4,941 (SOURCE workbook, Startup Costs, lean) |
| Profit after one-time costs | ($2,260) |

**What visitors means here.** Visitors are Etsy listing visits, own-site sessions, Gumroad page views and Amazon book-page views, added together. Base values per live listing per month at full ramp:
- Etsy: 350, which is the workbook's 7 orders per product divided by 2.0% conversion (ASSUMPTION);
- own site: 267, which is 4 orders divided by the workbook's 1.5%;
- Gumroad: 80, which is 1.2 orders divided by 1.5% (ASSUMPTION);
- Amazon: 100 page views per title, which is 5 units divided by 5% (ASSUMPTION).

By September 2027 this adds up to about 7,500 visitors a month. The base case is Expected, so this is the traffic the plan quietly assumes, and it is the first number to check against the shop's real statistics.

**The tornado.** Each input is moved on its own; the table is ranked by the swing in 12-month operating profit.

| Rank | Input | Low / high tested | Revenue, low → high | Profit, low → high | Profit swing |
|---|---|---|---|---|---|
| 1 | **Monthly visitors** | −50% / +50% | $5,653 → $16,959 | ($1,565) → $6,928 | **$8,493** |
| 2 | **Fixed-cost position** | mid-point / lean | $11,306 → $11,306 | ($2,720) → $2,681 | **$5,402** |
| 3 | **Conversion rate, all channels** | −30% / +30% | $7,969 → $14,646 | $154 → $5,211 | **$5,057** |
| 4 | First-sale month | Feb 2027 / Nov 2026 | $7,262 → $13,655 | $19 → $4,264 | $4,245 |
| 5 | Months to full visibility (review ramp) | 10 / 4 | $8,369 → $12,596 | $477 → $3,646 | $3,169 |
| 6 | New products per month | 0.4 / 1.0 | $9,497 → $12,598 | $1,137 → $3,784 | $2,647 |
| 7 | Average order value, digital | −15% / +15% | $10,018 → $12,594 | $1,524 → $3,839 | $2,315 |
| 8 | Paid ads: Amazon Ads, $0.75 a click, 7% of clicks buy | $300 a month / $0 | $14,958 → $11,306 | $1,474 → $2,681 | $1,207 |
| 9 | Platform fees | +20% / −20% | no change | $2,269 → $3,093 | $824 |
| 10 | Refund rate | 6% / 1% | no change | $2,338 → $2,767 | $429 |
| 11 | Repeat-purchase rate within 12 months | 3% / 25% | $11,193 → $11,571 | $2,583 → $2,912 | $329 |
| 12 | Fee set (the section 1 fixes) | corrected / workbook | no change | $2,537 → $2,681 | $145 |

**Elasticities.** This is the % change in 12-month operating profit for a 1% change in each input:

| Input | Profit elasticity | Revenue elasticity |
|---|---|---|
| Monthly visitors | +3.17 | +1.00 |
| Conversion rate | +3.14 | +0.98 |
| Average order value | +2.88 | +0.76 |
| Platform fees | −0.77 | 0 |
| Refund rate | −0.06 | 0 |
| Repeat-purchase rate | +0.05 | +0.01 |

**Visitors × conversion.** Each cell is 12-month operating profit, with all other inputs at the base:

| | 0.5× conversion | 0.75× | 1.0× | 1.25× | 1.5× |
|---|---|---|---|---|---|
| 0.25× visitors | ($4,741) | ($4,215) | ($3,689) | ($3,162) | ($2,634) |
| 0.5× visitors | ($3,671) | ($2,619) | ($1,565) | ($512) | $543 |
| **1.0× visitors (Expected)** | ($1,530) | $575 | **$2,681** | $4,789 | $6,898 |
| 1.5× visitors | $612 | $3,769 | $6,928 | $10,090 | $13,254 |
| 2.0× visitors | $2,753 | $6,962 | $11,175 | $15,390 | $19,609 |

**Paid ads.** This is the highest cost per click at which the first sale still breaks even:

| Product | Contribution per order | Share of clicks that buy (ASSUMPTION) | Break-even cost per click |
|---|---|---|---|
| Routine cards on Etsy ($6.50) | $5.21 | 2.0% | $0.10 |
| Busy book on Etsy ($11.99) | $9.98 | 2.0% | $0.20 |
| Blended own-site order | $10.11 | 1.5% | $0.15 |
| Starter Kit bundle, own site ($29) | $27.28 | 1.5% | $0.41 |
| *100 Screen-Free Plays* paperback, Amazon Ads | $7.89 | 7.0% | $0.55 |
| 32-page colour paperback, Amazon Ads | $3.95 | 7.0% | $0.28 |

**What this means:**
- **Traffic and conversion decide almost everything.** A 1% change in either moves profit by about 3%. Fixed costs take most of the first year's contribution, so small changes in sales swing profit a lot.
- **Cost position is the second-largest input, and the founder chooses it.** Mid-point costs erase the whole base-case profit.
- **Each month of launch slip costs about $1,300–$1,600 of year-1 profit.** A later start gives up the November–January peak.
- **Fees, refunds and repeat rate matter little in year 1.** The repeat rate matters later, once there is a customer base to come back.
- **Paid ads lose money at these assumptions.** At a $0.75 click (ASSUMPTION, UNVERIFIED), no launch product earns back its click cost on the first sale. $300 a month of Amazon Ads adds about $3,650 of sales and removes about $1,200 of profit.
- **The playbook's ad rule is looser than break-even.** It allows a cost per customer of up to 1.5× first-order gross margin (`marketing/MARKETING-PLAYBOOK.md`). At this repeat rate, a customer does not come back often enough to repay that. Hold ads until the break-even line is met, as section 3.10 of the plan already says, and cut any ad set whose cost per sale is above the contribution per order.

---

## 3. Monte Carlo: 10,000 futures for a new faceless shop with no ad budget

**What varies, and how** (all ranges are ASSUMPTIONS unless a SOURCE is named):

| Input | Distribution | Why |
|---|---|---|
| First-sale month | Oct 5%, Nov 25%, Dec 40%, Jan 20%, Feb 10% | As of Sep 28, none of Gate A is done: no bank account, counsel's go-ahead or insurance (SOURCE `business/sections/05-operations-risk-milestones.md`; `ops/LAUNCH-NOW.md`). The plan's own month is December |
| Traction: traffic relative to the workbook's Expected | Lognormal, median 0.60×, σ 0.8 (P10 about 0.22×, P90 about 1.67×) | A zero-review shop starts behind incumbents with 2,000–11,000 reviews (SOURCE `marketing/DEMAND-CHECK.md`, "One honest warning"). The median is set near the plan's Low / Conservative case (SOURCE `business/sections/01-vision-market.md` §1.5) |
| Channel-specific traffic noise | Lognormal, σ 0.35, mean 1 | Etsy, the own site, Gumroad and Amazon do not move in lockstep |
| Conversion by channel | Lognormal around the base (Etsy 2.0%, own site 1.5%, Gumroad 1.5%, Amazon 5%), σ 0.3 | Base rates: see section 2 |
| Order value | Lognormal around the workbook's order values, σ 0.12 | Bundle uptake is unknown |
| Repeat purchases within 12 months | Triangular 3% / 10% / 25%; Etsy at half the rate | Etsy buyers cannot be emailed (SOURCE `business/sections/02-products-channels.md` §2.6) |
| Refunds | Triangular 1% / 2% / 6% | Base from the workbook |
| Platform-fee multiplier | Triangular 0.95 / 1.00 / 1.20 | Fees rise more often than they fall |
| Fee set | Corrected (section 1) in every run | More likely to be right than the workbook figures |
| Months to full visibility | Triangular 4 / 6 / 10 | Workbook uses 6 |
| New products per month; catalog cap | Triangular 0.4 / 0.75 / 1.0; triangular 10 / 15 / 20 | Workbook Conservative-to-Strong range |
| Cost position inside each quoted range | Triangular 0 / 0.1 / 0.5 | Lean-path figures are the low end of ranges, and no written quotes exist yet |
| Paid ads | $0 | Per the task |

**Results:**

| Measure | P10 | **P50** | P90 | Mean |
|---|---|---|---|---|
| Gross sales, Oct 2026 – Sep 2027 | $2,037 | **$6,284** | $19,778 | $9,341 |
| Operating profit, Oct 2026 – Sep 2027 | ($6,768) | **($3,311)** | $6,331 | ($1,210) |
| Profit after one-time costs, Oct 2026 – Sep 2027 | ($14,843) | **($10,009)** | ($365) | ($8,302) |
| Orders, Oct 2026 – Sep 2027 | 178 | **543** | 1,702 | 808 |
| Gross sales, calendar 2026 | $0 | **$90** | $574 | $232 |
| Operating profit, calendar 2026 | ($2,110) | **($1,232)** | ($956) | ($1,375) |
| Profit after one-time costs, calendar 2026 | ($8,279) | **($6,473)** | ($5,292) | ($6,644) |
| Orders, calendar 2026 | 0 | **8** | 50 | 20 |
| Visitors in Sep 2027 | 1,459 | **4,218** | 12,575 | 6,043 |
| Orders in Sep 2027 | 31 | **91** | 276 | 132 |
| Operating profit in Sep 2027 alone | ($282) | **$227** | $1,817 | $577 |
| Deepest cumulative loss through Dec 2027 (a proxy for founder capital, before payout delays) | $7,716 | **$11,268** | $15,951 | $11,589 |
| Digital units per product per month at full ramp (plan anchors: floor 2.5, Low 10, Expected 15, Strong 30) | 3.0 | **8.9** | 27.1 | 12.9 |

Median 12-month sales by channel: Etsy $2,493, own site $1,525, KDP $1,271, Gumroad $386, IngramSpark $103, course $53.

| How likely | Share of runs |
|---|---|
| 12-month operating profit above $0 | 26.6% |
| 12-month profit after one-time costs above $0 | 9.4% |
| September 2027 orders at or above the break-even line (65 a month) | 65.1% |
| September 2027 operating profit above $0 | 65.9% |
| **Deepest cumulative loss above the $12,000 household-money cap placeholder** | **41.2%** |
| Sales above the workbook's Expected ($11,195) | 25.9% |
| Sales above the workbook's Strong ($27,228) | 5.1% |
| Digital units per product below the kill-rule floor | 6.8% |
| Any sale in calendar 2026 | 70.0% |
| Calendar-2026 sales of $1,000,000 or more | 0.0% |

| Milestone | Faster futures (P25) | **Median** | Slower futures (P75) | Not reached by Dec 2027 |
|---|---|---|---|---|
| Cumulative orders pass 100 | Mar 2027 | **Apr 2027** | May 2027 | 0% |
| Monthly orders first reach the break-even pace (65) | Mar 2027 | **Jun 2027** | Nov 2027 | 13% |

| First sale | Share of runs | Calendar-2026 sales, P50 / P90 | 12-month sales, P50 | 12-month operating profit, P50 |
|---|---|---|---|---|
| Oct 2026 | 5% | $717 / $2,165 | $9,715 | ($1,579) |
| Nov 2026 | 26% | $324 / $1,006 | $7,829 | ($2,525) |
| Dec 2026 | 40% | $99 / $300 | $6,556 | ($3,204) |
| Jan 2027 | 20% | $0 / $0 | $5,077 | ($3,845) |
| Feb 2027 | 10% | $0 / $0 | $3,902 | ($4,473) |

**What drives the spread?** Each figure is the rank correlation between an uncertain input and 12-month operating profit. The ranking partly reflects how wide each range was set, and traffic got the widest range because it is the least known.

| Uncertain input | Rank correlation |
|---|---|
| Traffic (common traction factor) | +0.85 |
| Fixed-cost position | −0.29 |
| Etsy traffic (channel-specific) | +0.16 |
| First-sale month (later is worse) | −0.15 |
| Etsy conversion | +0.15 |
| Order value | +0.12 |
| Own-site traffic / conversion | +0.12 / +0.11 |
| Everything else (ramp, catalog pace, Amazon conversion, fees, growth, repeat rate, refunds) | 0.08 or less |

**What this means:**
- **Year 1 loses money in about three futures out of four.** By month 12, though, two futures in three are selling at the break-even pace, and September 2027 on its own is profitable. The loss comes from the ramp, and the business improves month by month.
- **The plan's Expected case is an upside case.** It sits at about the 74th percentile. The plan already budgets cash on Conservative, which is close to this median ($6,284 here against Conservative's $5,849). That choice is right.
- **The funding need is the real risk.** The workbook's Expected founder capital, on the lean path, is $7,715. At the cost drift simulated here, the median cash hole is about $11,300, and 41% of futures pass the $12,000 placeholder cap. With every cost held at the lean quote, the median hole falls to about $7,600 and almost no future passes the cap (section 6). The founder should set the real cap before any money is spent (`business/sections/03-financial-model.md` §3.12, decision 1).
- **This may still be optimistic.** It assumes the listings are built, pass the compliance gate and stay live. It also assumes no account suspension, no copycat price war and no seasonal miss. *UNVERIFIED base rate:* as far as I recall from Etsy's public filings, the average Etsy seller sells roughly $1,500–$2,000 a year, and the median seller much less. The median Etsy figure here ($2,493 in year 1) is above that average.

---

## 4. The $1,000,000-by-end-of-2026 goal

**The arithmetic:** revenue = visitors × conversion × average order value. $1,000,000 ÷ (2.06% × $11.55) ≈ **4.2 million visitors**, or **86,605 orders**. $11.55 is the plan's blended order value in its first month; 2.06% is the blended visitor-to-order rate at month 12 in the base case.

| Window | Order value | Orders needed | Orders a day | Orders a week | Visitors needed | Visitors a day |
|---|---|---|---|---|---|---|
| From today, Sep 28 (95 days). Not possible: no bank account, counsel's go-ahead or insurance yet | $11.55 | 86,605 | 912 | 6,381 | 4.2 million | 44,212 |
| | $29 (every order a Starter Kit) | 34,483 | 363 | 2,541 | 1.67 million | 17,603 |
| | $49 (every order a Reset bundle) | 20,408 | 215 | 1,504 | 0.99 million | 10,418 |
| **First sale Nov 1 (the hoped-for launch; 61 days)** | $11.55 | 86,605 | **1,420** | 9,938 | 4.2 million | **68,854** |
| | $29 | 34,483 | 565 | 3,957 | 1.67 million | 27,415 |
| | $49 | 20,408 | 335 | 2,342 | 0.99 million | 16,225 |
| First sale Dec 1 (the plan's month; 31 days) | $11.55 | 86,605 | 2,794 | 19,556 | 4.2 million | 135,488 |
| | $49 | 20,408 | 658 | 4,608 | 0.99 million | 31,927 |
| *For comparison: the whole year, Oct 2026 – Sep 2027* | $11.55 | 86,605 | 237 | 1,661 | 4.2 million | 11,507 |

**How that compares with the realistic range:**
- **The P90 for calendar 2026** (the result that only one future in ten beats) is **$574 of sales from about 50 orders and 2,400 visitors**. $1,000,000 is **about 1,740 times** that.
- **The best future out of 10,000** made $11,181 in calendar 2026.
- **Futures whose first sale comes in November** have a calendar-2026 P90 of about $1,006, so the goal is still about 1,000 times higher. Even the rare October launches reach only $2,165 at P90.
- **Over the full 12 months to September 2027**, the P90 is $19,778, and $1,000,000 is still about 50 times higher.
- **The goal needs about 69,000 visitors a day from November 1.** The median future reaches about 140 visitors a day after a full year of building.
- **Against the strongest shops in the demand check:** 86,605 orders is about 40 times the *lifetime* sales of the strongest routine-card shop (2,189) and about 8 times the bored-jar shop (10.4k). Those figures come from `marketing/DEMAND-CHECK.md`, which counts sales at the shop level and marks them [VERIFY].
- **The traffic cannot be bought profitably either.** At even $0.50 a click (ASSUMPTION), 4.2 million visits would cost about $2.1 million, twice the revenue.

**Said plainly and kindly.** $1,000,000 in 2026 is not reachable by this business on any plausible path. That is not because the products are weak. Every new shop starts at zero reviews, and the calendar leaves at most nine selling weeks. Chasing that number would push spending toward ads and costs that the numbers above show lose money. The goals that are worth having, and that the median future reaches, are these:
- a first sale in November or December;
- the first 100 orders by about April 2027;
- about two orders a day, the break-even pace, by about June 2027;
- a September 2027 that pays for itself.

$1,000,000 a year is a multi-year question. It would need about 8.5 times the plan's own Strong case in year 3 ($118,153). That kind of growth comes only from a breakout product or the gated retail path in section 4 of the plan, and neither is in any base case.

---

## 5. Break-even

**Fixed monthly costs** at steady state (year 2, annual bills spread over 12). SOURCE: workbook, Monthly Operating Costs tab. Nearly every price there is marked [VERIFY].

| Fixed cost | Lean path | Mid-point | Label |
|---|---|---|---|
| Shopify Basic | $39.00 | $39.00 | SOURCE storefront guide §1; UNVERIFIED |
| Domains (MUST $61 a year + SHOULD $118 a year) | $14.92 | $14.92 | SOURCE `legal/domain-portfolio.md`; UNVERIFIED |
| Email platform | $20.00 | $29.50 | SOURCE `marketing/MARKETING-PLAYBOOK.md`; UNVERIFIED |
| Insurance (GL $45.17, media $50, cyber $35, umbrella $25; E&O off) | $155.17 | $304.59 | SOURCE `legal/protection/PROTECTION-PLAN.md`; broker quotes needed |
| USPS PO Box ($100–$300 a year) | $8.33 | $16.67 | ASSUMPTION in the workbook; UNVERIFIED |
| Accounting (QuickBooks $38, Link My Books $21, accountant $500 a year) | $100.67 | $178.83 | SOURCE `finance/money-and-tax-setup.md`; accountant fee ASSUMPTION |
| **Subtotal: the six costs named in the task** | **$338.09** | **$583.50** | |
| Everything else. The Claude plan ($100, ASSUMPTION) is most of it; also business email, resident agent, SDAT report, GDPR representatives, Etsy renewals, copyright filings | $177.67 | $381.08 | SOURCE workbook |
| 10% contingency | $51.58 | $96.46 | SOURCE workbook `contin` |
| **All fixed costs** | **$567.33** | **$1,061.04** | |

**Orders needed each month.** The blended contribution is $8.73 an order, from the month-12 order mix: 47% Etsy, 27% own site, 8% Gumroad, 16% KDP, 2% IngramSpark and course.

| Costs to cover | Per month | Orders a month | Orders a day |
|---|---|---|---|
| The six named costs, lean | $338 | 39 | 1.3 |
| **All fixed costs, lean** | **$567** | **65** | **2.1** |
| All fixed costs, lean, plus $150 a month of ads | $717 | 82 | 2.7 |
| The six named costs, mid-point | $584 | 67 | 2.2 |
| All fixed costs, mid-point | $1,061 | 122 | 4.0 |

**Units needed if only one product sold** (all fixed costs, lean path):

| Product | Net per unit | Units a month | Per day |
|---|---|---|---|
| 30-Day Screen Reset ($27; Shopify fees) | $24.57 | 23 | 0.8 |
| Play-First Family Kit, own site ($11) | $10.16 | 56 | 1.8 |
| Toddler busy book, Etsy ($11.99) | $9.98 | 57 | 1.9 |
| Play-First Family Kit, Etsy ($11) | $9.12 | 62 | 2.0 |
| *100 Screen-Free Plays* paperback, KDP ($16.99) | $7.89 | 72 | 2.4 |
| Visual routine cards, Etsy ($6.50) | $5.21 | 109 | 3.6 |
| 32-page colour paperback, KDP ($11.99) | $3.95 | 144 | 4.7 |

This agrees with the plan's scorecard line of about 65 orders a month (`business/sections/03-financial-model.md` §3.7). The plan reaches it from $398 a month plus $150 of ads. This test reaches it from the full $567 a month with annual bills spread over the year and no ads. **The line is reachable:** the median future crosses it in June 2027. **At mid-point costs it almost doubles**, to 122 orders a month, and the median future does not sustain that within the first year.

---

## 6. The five levers that most raise median profit

Each lever was applied to the same 10,000 random futures. The effect sizes are ASSUMPTIONS: modest, plausible improvements, not promises. The baseline median is 12-month operating profit of ($3,311), a deepest cumulative loss of $11,268, and 41% of futures past the $12,000 cap.

| Rank | Lever | Change in median profit | Median deepest loss | Futures past $12k cap | Where to act |
|---|---|---|---|---|---|
| **1** | **Hold every cost at the lean-path written quote.** Approve nothing above the lowest quote without a written decision | **+$2,006** | **$7,631** | **0%** | `business/build_financial_model.py` (Monthly Operating Costs and Startup Costs, cost position `pos` = 0); the approval rule in `business/sections/03-financial-model.md` §3.10 rule 3 and §3.12 decision 3; insurance quotes per `legal/protection/PROTECTION-PLAN.md` |
| **2** | **Cut about $100 a month from the lean fixed costs.** Candidates: ask the broker whether one package policy costs less than four separate ones; pay for Shopify yearly ($29 against $39, UNVERIFIED); defer Link My Books until order volume needs it ($21); confirm the lowest Claude tier the routines can run on ($100 is an ASSUMPTION). Insurance cover itself is not to be dropped without the broker's advice | **+$1,200** | $10,301 | 30% | `finance/money-and-tax-setup.md` (bookkeeping stack); `commerce/storefront-setup-guide.md` §1 (Shopify billing); `legal/protection/PROTECTION-PLAN.md` (insurance); Claude plan row in `business/build_financial_model.py` |
| **3** | **Raise traffic 20%:** steady Pinterest pins, Etsy search titles and tags, UK-spelling variants, and backlinks from library and nonprofit resource pages | **+$881** | $10,811 | 36% | `marketing/MARKETING-PLAYBOOK.md` (organic tactics); `seo/SEO-PLAN.md`; publish cadence in `ops/ROUTINE.md` |
| **4** | **Raise conversion 20%:** strong first thumbnails and mockups, "What's inside" previews, the Start Here page, clear price and licence, and a rule-following review engine for the first 10–25 reviews | **+$877** | $10,814 | 36% | `products/<slug>/listing.json`, `mockup.png` and preview PNGs (edited by the product workflows); review engine, tactic 4 in `marketing/MARKETING-PLAYBOOK.md`; `marketing/CUSTOMER-VOICE.md` |
| **5** | **Be selling by November 1:** open the bank account, send the counsel questions today, get the insurance quote, and build the publish safeguards in October | **+$787** (and +$1,619 of median sales) | $10,693 | 37% | Wave 0 in `ops/LAUNCH-NOW.md`; Gate A in `business/sections/05-operations-risk-milestones.md`; `finance/BANKING.md`; `legal/FOR-EMPLOYMENT-COUNSEL.md` |

**Next in line:**

| Lever | Change in median profit | Where to act |
|---|---|---|
| One new product a month (cap 20) instead of 0.4–1.0 | +$674 | `ops/QUEUE.md`; kill rule in `marketing/DEMAND-CHECK.md` §3 |
| Digital order value +15%: Starter Kit, Holiday Play Gift, one order bump, and routine cards at their listing.json price of $9.50 | +$613 | `commerce/PRICING.md` §3; `business/REVENUE-PLAN.md` rank 2 |
| Twice the repeat-purchase rate: post-purchase emails and "next for your child's age" | +$116 in year 1 (worth more in years 2–3) | `business/sections/02-products-channels.md` §2.6; `business/REVENUE-PLAN.md` rank 3 |
| Keep Etsy Offsite Ads off while the shop is under $10k a year (UNVERIFIED threshold) | +$44 | Etsy shop settings; `commerce/storefront-setup-guide.md` §10 |
| **$150 a month of Amazon Ads** (the plan's Expected budget) | **−$684**, although median sales rise $1,829 | `marketing/MARKETING-PLAYBOOK.md`; workbook `ads1` |

**How to read this.** Levers 1 and 2 are certain in size: every dollar not spent is a dollar kept, whatever sales do. Lever 1 matters most for safety, because it is what keeps the funding need inside the household cap. Levers 3–5 depend on execution. They are roughly equal, and they multiply: a shop with 20% more traffic *and* 20% better conversion gets about 44% more orders. None of the five needs paid advertising, and none touches the gated waves (board book, retail, schools).

---

## 7. What the test does not cover

- **Cash timing.** Etsy pays about one month late, KDP about two months and IngramSpark about three (SOURCE workbook, Assumptions §4). The deepest-loss figure is therefore slightly *better* than the real founder-capital need. The workbook's Cash Flow tab handles this.
- **Income tax and the tax reserve.** All figures are before tax.
- **Anything gated.** The board book, retail, school and PTA licences, the subscription and Spanish editions are all left out, as in the plan's base.
- **A halo from ads on organic rank.** Amazon Ads may lift organic ranking. That is not modelled, and it would need to show up in real ACoS data before it counts.
- **Account risk.** Etsy reserves, a suspension, a copycat or a platform fee change beyond ±20% are not modelled.

## 8. Assumptions register

| Input | Value in the base case | Label |
|---|---|---|
| First-sale month | Dec 2026 (model month 3) | SOURCE workbook `first_sale` (itself an assumption) |
| Review ramp | 6 months | SOURCE workbook `ramp` (assumption) |
| Seasonality by calendar month | Jan 1.25 … Nov 1.30, Dec 1.35; normalised to average 1.00 | SOURCE workbook §5 (assumption) |
| Digital products live | 5 at launch, +0.75 a month, cap 15; sales per product grow 0.5% a month | SOURCE workbook §6a–6b, Expected |
| KDP titles | 3 at launch, +0.33 a month, cap 10 | SOURCE workbook |
| IngramSpark titles | 2 from launch + 2 months, +0.15 a month, cap 5; 1 unit per title per month | SOURCE workbook |
| Etsy visits per listing | 350 a month at full ramp (7 orders ÷ 2.0%) | Orders SOURCE workbook `ETSY_cvr`; 2.0% ASSUMPTION |
| Own-site sessions per listing | 267 a month (4 orders ÷ 1.5%) | SOURCE workbook `SITE_cvr`, `site_cvr`; `marketing/MARKETING-PLAYBOOK.md` target of 1.5–3% |
| Gumroad views per listing | 80 a month (1.2 orders ÷ 1.5%) | Orders SOURCE workbook `MOR_cvr`; 1.5% ASSUMPTION |
| Amazon page views per title | 100 a month (5 units ÷ 5%) | Units SOURCE workbook `KDP_cvr`; 5% ASSUMPTION |
| Items per order | Own site 1.25, Etsy 1.2, Gumroad 1.2 | SOURCE workbook (assumption) |
| Prices and mix weights | See section 1 | SOURCE workbook, Unit Economics tab |
| Repeat purchases | 10% of buyers within 12 months; Etsy at half the rate | ASSUMPTION; Etsy half-rate reasoning from SOURCE `sections/02` §2.6 |
| Email list and course | 3% of site sessions sign up; 15% of non-Etsy buyers opt in; 1.5% unsubscribe; 15% reached a month; 1.5% buy the course | SOURCE workbook |
| Fees | See section 1 | SOURCE workbook, UNVERIFIED; corrections SOURCE `REVENUE-PLAN.md`, course listing.json |
| Operating and one-time costs | Lean path (cost position 0) | SOURCE workbook, Monthly Operating Costs and Startup Costs |
| Operating costs tied to the first sale (insurance, Link My Books, Etsy renewals, PDF stamping and similar) | Start in the first-sale month; umbrella 2 months later; GDPR representatives 1 month later | ASSUMPTION (the workbook fixes them to Dec 2026) |
| Amazon Ads | $0.75 a click; 7% of clicks buy | ASSUMPTION, UNVERIFIED |
| Monte Carlo ranges | See section 3 | ASSUMPTION |
| Competitor sales used as yardsticks | 2,189 and 10.4k lifetime shop sales | SOURCE `marketing/DEMAND-CHECK.md` ([VERIFY], snippet evidence) |

## 9. Re-running with real data

After 60–90 days of sales, collect these numbers, put them in a JSON file and run `python3 business/stress_test.py --inputs actuals.json`. The script's docstring shows the format.

| Number | Where to find it | Key |
|---|---|---|
| First-sale month | Calendar | `launch` |
| Visits per live listing per month | Etsy Stats, visits ÷ listings live | `vpp_etsy` |
| Etsy conversion | Etsy Stats, orders ÷ visits | `cvr_etsy` |
| Sessions per live product per month | Shopify Analytics, sessions ÷ products live | `vpp_site` |
| Own-site conversion | Shopify Analytics | `cvr_site` |
| KDP units per title per month | KDP Reports | set `pvpt_kdp` = units ÷ `cvr_kdp` |
| Items per order | Shopify and Etsy order exports | `items_site`, `items_etsy` |
| Repeat buyers within 12 months | Shopify customer report | `repeat12` |
| Refunds ÷ gross sales | Shopify, Etsy and Gumroad payouts | `refund` |
| Actual quotes | Broker, attorney and tool invoices | edit the workbook Low column, then `cost_pos` |

Once the base holds real rates, set `"MC": {"traction_median": 1.0}` and narrow `traction_sigma`. The Monte Carlo then spreads around what the shop actually does. The plan's Conservative trigger still applies: if May 2027 orders run below 43 a month, cut every cost to its lowest tier and re-forecast (`business/sections/03-financial-model.md` §3.10 rule 6).

## Needs a live check

Each item below comes from the repo's unverified figures or from my own knowledge. Web search was not available in this session.

1. **Etsy fees (UNVERIFIED):**
   - $0.20 listing fee, charged again on each sale;
   - 6.5% transaction fee;
   - US payment processing of 3% + $0.25, and whether it is charged on the tax-inclusive total;
   - Offsite Ads at 15%, or 12% and mandatory above $10,000 of sales in 12 months, and whether it can be turned off below that;
   - the one-time shop-opening fee (about $15).
2. **Shopify (UNVERIFIED):** Basic at $39 a month or $29 billed yearly; Shopify Payments at 2.9% + $0.30 online on Basic; whether the digital-download app is free.
3. **Gumroad (UNVERIFIED):** 10% + $0.50 per sale *plus* 2.9% + $0.30 card processing; 30% on Discover-marketplace sales; that it is merchant of record for US sales tax and EU/UK VAT.
4. **KDP:**
   - the 60% royalty at list prices of $9.99 and up, and 50% below (since June 10, 2025);
   - whether 8 × 10 in and 8.5 × 8.5 in count as large trim;
   - print cost for the 82-page B/W book ($2.30 or $2.84);
   - print cost for the 32-page premium-colour books ($3.24, $3.56 or a flat rate).
   Check all four in KDP's pricing calculator.
5. **IngramSpark:** whether a 40% short discount is allowed; print cost for the 32-page colour paperback; the 1.875% market-access fee; about 90-day payment.
6. **Amazon Ads:** typical cost per click and click-to-sale rate for children's picture books and parent activity books (this test assumes $0.75 and 7%).
7. **Conversion benchmarks:** Etsy listing-visit conversion (assumed 2%) and new-store Shopify conversion (assumed 1.5%). The shop's own data replaces both within 90 days.
8. **Email platform free tiers:** Klaviyo (250 profiles), MailerLite, Kit (whether sequences are still in the free plan) and Sender (2,500). This sets whether the email cost starts around April 2027.
9. **Insurance:** broker quotes for GL with products-completed operations, media liability, cyber and umbrella, and whether one package policy is cheaper. Also whether E&O is still needed with no coaching.
10. **Claude plan:** the monthly price of the tier that can run the scheduled routines (assumed $100).
11. **Small fixed costs:** USPS PO Box fee; QuickBooks Simple Start price; Link My Books price; accountant's year-end fee.
12. **Etsy seller base rate:** average and median yearly sales per active Etsy seller from Etsy's latest annual report (recalled here as roughly $1,500–$2,000 on average).
13. **Competitor yardsticks:** the 2,189-sale and 10.4k-sale shop counts in `marketing/DEMAND-CHECK.md` (shop-level snippet evidence).
