# Money and tax setup: Play Before Pixels

**For:** AlphaPlay LLC, doing business as Play Before Pixels (Maryland)
**Prepared:** September 27, 2026
**Workbook that goes with this guide:** `PlayBeforePixels_Bookkeeping_2026.xlsx` (same folder)

**The goal:** every shop pays into one bank account, every cost goes on one card, and one ledger holds it all. At tax time your accountant gets one tidy folder, not a pile of logins.

---

## Read this first

1. **Nothing in this guide was confirmed against an official source on September 27, 2026.** The research environment could not reach irs.gov, marylandtaxes.gov, stripe.com, etsy.com, kdp.amazon.com, quickbooks.intuit.com or help.linkmybooks.com, and the web-search budget was used up. So every fee, rate, threshold, payout time and eligibility rule below is **UNVERIFIED**. Each one has a link to the page to check (the [S#] tags; the full list is at the end). Check that page on the day you sign up, or ask your accountant. The weekdays of due dates were worked out by calendar arithmetic. The deadlines themselves still count as UNVERIFIED.
2. **You open every account yourself** (identity, bank and tax details). This guide does not create accounts or enter credentials. No platform, bank or card issuer is guaranteed to approve you.
3. **Open every account in the LLC's legal name, AlphaPlay LLC, with its existing EIN.** Use "Play Before Pixels" as the store or display name (see `legal/ENTITY.md`).
4. **See your accountant before any tax interview.** Many platforms ask you to fill in a W-9 "tax interview" (KDP, Etsy, Amazon Associates and others). Before you do, the accountant should confirm (a) how AlphaPlay LLC is taxed (Schedule C on your personal return, or an S-corp election) and (b) which tax number to enter: the LLC's EIN or your own. For a single-member LLC, some interviews ask for the owner's details.

---

## 1. The money map

```
  SHOPS AND PAYERS (money in)                        COSTS (money out)
  KDP · IngramSpark · Etsy · TpT · TikTok Shop       Printful · author copies · ISBNs
  Shopify Payments · Stripe · PayPal · Faire         ads · software · contractors
  Merchant of record · Amazon Associates             attorney · accountant · filing fees
  Bookshop.org · invoices (coaching, workshops, B2B)
             |                                                 |
             | every payout                                    | every charge
             v                                                 v
  +----------------------------------+            +---------------------------+
  | 1000  BUSINESS CHECKING          |--pays in-->| 2000  BUSINESS CARD       |
  | AlphaPlay LLC d/b/a              |   full,    | (one card, all spending)  |
  | Play Before Pixels               |  monthly   +---------------------------+
  +----------------------------------+
             |
             | set-aside % of profit + 100% of Maryland sales tax collected
             v
  +----------------------------------+
  | 1010  TAX RESERVE SAVINGS        |--> IRS estimated tax · Maryland estimated tax
  +----------------------------------+    · Maryland sales & use tax

  Bank feed + card feed ---------> QUICKBOOKS ONLINE <--- Link My Books
                                   (the official books)    (Etsy, TikTok Shop, Shopify)
                                          ^
             one journal entry a month ---+  (KDP, IngramSpark, TpT, Faire,
                                              merchant of record, Stripe)
                                          |
                                          v
                                   YOUR ACCOUNTANT
                  (monthly folder · quarterly estimates · year-end packet)
```

The account numbers (1000, 1010, 2000 …) match the **Chart of Accounts** tab in the workbook.

---

## 2. Account architecture: two bank accounts, one card

| Account | What it does | Rules | Check at |
|---|---|---|---|
| **1000 Business checking** (AlphaPlay LLC, with the Play Before Pixels trade name added) | The hub. Every shop, royalty payer and invoice pays in here. It pays off the card, funds the tax reserve and pays taxes. | Business money only. It is not linked to your website. | [S1] |
| **1010 Tax-reserve savings** (same bank, same LLC) | Holds tax money so it can't be spent by mistake. | Move a fixed % of each month's profit into it. 25–30% is a common rule of thumb, not an official figure; **your accountant sets the %**. Also move **100% of any Maryland sales tax you collected**, because that money was never yours. Record these moves as transfers, not expenses. | [S1] |
| **2000 Business credit card** (in the LLC's name) | Pays every business cost: Printful, author copies, ISBNs, ads, software, attorney, trademark fees. One card means one feed to reconcile. | Pay it in full from checking. Contractors paid by card are reported by the card processor on a 1099-K, not by you on a 1099-NEC (UNVERIFIED; accountant confirms). | [S1] |

**What the bank will probably ask for** (the exact list varies by bank; UNVERIFIED) [S1]: articles of organization, the EIN confirmation letter (CP 575 or 147C), the operating agreement, the trade-name (DBA) filing for "Play Before Pixels" and your ID. Register the trade name to AlphaPlay LLC with Maryland SDAT first. A fee of $25 for 5 years is commonly cited (UNVERIFIED; check with SDAT at https://dat.maryland.gov, which was not fetched).

**Four rules that make tax time easy:**
1. **Never mix personal money in.** Mixing weakens the LLC's liability protection and makes year-end harder [S1].
2. **If you pay a business cost personally by mistake,** it is an *owner contribution* (3000). Pay yourself back with a transfer, not an expense.
3. **Money you take out for yourself is an owner draw (3100), never an expense.** For a single-member LLC taxed by default, federal and Maryland estimated tax payments are also owner draws (3110 and 3120), not business expenses (accountant confirms) [S24].
4. **Author copies and stock you buy for resale are inventory (1200).** They become cost of goods sold only when they sell. Printful orders are cost of goods sold (5100) straight away.

Fees: many online business checking accounts have no monthly fee (UNVERIFIED; not compared). The bank sends Form 1099-INT if it pays you $10 or more of interest (UNVERIFIED) [S23].

---

## 3. Every shop: who pays you, how and when

"All the shops linked" means each one below pays into **1000 Business checking**, and each has a known route into the books (section 5). All timings and tax-form notes are UNVERIFIED.

| Shop or payer | What you sell there | How and when it pays you | Who collects sales tax | Tax form you may get | Check at |
|---|---|---|---|---|---|
| **Amazon KDP** (your Amazon books) | Paperback and hardcover picture books, ebooks | EFT about 60 days after the end of the month of sale, separately for each Amazon marketplace | Amazon is the seller, so these sales are not on your Maryland return | 1099-MISC (royalties; $10 threshold) | [S12] |
| **IngramSpark** | Hardcover and paperback for bookstores, libraries and schools | About 90 days after the end of the month of sale | The retailer. Your own print orders are costs | 1099-MISC possible | [S13] |
| **Etsy** (Etsy Payments) | Printables, card deck, Printful merch, signed books | Deposits on the schedule you choose in Payment settings: daily, weekly, every two weeks or monthly | **Etsy** (marketplace facilitator; Maryland's law since Oct 1, 2019). Etsy also collects EU/UK VAT on downloads | 1099-K | [S14] |
| **Teachers Pay Teachers** | Teacher resource pack, classroom printables | Monthly; historically through PayPal | **TpT** | 1099-K possible | [S15] |
| **TikTok Shop** | Merch, card deck, books you ship. **No digital goods allowed**, so no printables or course | Settles a few days after the buyer confirms delivery | **TikTok** | 1099-K | [S16] |
| **Shopify Payments** (only if your website store runs on Shopify) | Books sold direct, Printful merch, card deck, digital downloads for US buyers | Payouts to checking | **You**, on Maryland orders. Watch other states' thresholds too | 1099-K | [S10] |
| **Stripe** (website checkout, Payment Links, invoices) | Coaching and workshop deposits and invoices, B2B and school orders. Possibly the course and downloads, **US buyers only** | Usually 2 business days on a rolling basis once established; the first payout is delayed | **You**, where the sale is taxable | 1099-K | [S9] |
| **PayPal Business** | Invoices for buyers who prefer PayPal; some platform payouts | The money stays in PayPal until you transfer it to checking | **You**, on your own sales | 1099-K | [S11] |
| **Meta shop** (Facebook and Instagram) | The same catalog as your website | Believed to have **no separate payout** since 2025: checkout finishes on your website, so the money comes through Shopify Payments or Stripe | Whoever runs the checkout (you) | None if checkout is on your site | [S17] |
| **Faire** (wholesale) | Books, card deck and merch at wholesale to shops | Reported to pay shortly after you ship | Faire collects retailers' resale certificates. Save Faire's order reports as proof of exempt wholesale sales | 1099-K possible | [S18] |
| **Merchant of record** (Lemon Squeezy, Gumroad, or a course platform's own checkout) | Printables, the online course and workshop kits sold to buyers **worldwide** | Payout statements | **The merchant of record**: EU/UK VAT and, for most, US state sales tax | Not known | [S21] |
| **Amazon Associates** | Affiliate links | About 60 days after month end | Not applicable | 1099-MISC (form and box not confirmed) | [S20] |
| **Bookshop.org** | Affiliate shop lists | Payout method not confirmed | Not applicable | Not confirmed | [S20] |
| **Direct** (check, ACH, cash at events) | School, PTA and group orders; event sales | Deposit straight to checking | **You**, on taxable Maryland sales | None (still income) | [S25] |

**What "every shop" means for a few of the shops you named**

- **"Amazon storefront."** The page at `amazon.com/shop/<name>` belongs to the Amazon Influencer Program, which requires an eligible social-media account (UNVERIFIED) [S20]. The brand kit's faceless rule says to skip programs that need an influencer presence (`brand/BRAND.md`). Your Amazon presence is therefore:
  - your **Author Central page** (`amazon.com/author/<name>`) and each book's page, paid through **KDP**;
  - **Associates links**, paid through **Amazon Associates**.
- **Meta shop.** Meta is a place people find you, not a payment channel (UNVERIFIED). There is nothing extra to connect for money; log those sales under Shopify or Stripe.
- **TikTok Shop and Etsy.** Both pay you directly and both collect the sales tax, so neither goes on your Maryland return.

**Product-format flags that affect money** (UNVERIFIED; confirm before you spend on print)

- Board books are **not** a KDP format. KDP offers paperback, hardcover and ebook [S12].
- IngramSpark board books and true library binding are doubtful [S13]. Board-book editions need a different printer or an offset print run, and that run is inventory (1200).
- TikTok Shop does not allow digital goods [S16].
- Paddle has historically refused e-books, courses and info products, so use Lemon Squeezy, Gumroad or a course platform's own checkout instead [S21].
- Onesies and other children's merch may need CPSIA Children's Product Certificates, so ask Printful for its certificates [S19]. TikTok may also need category approval for them [S16].

**Fees at a glance** (every figure UNVERIFIED; check the source the day you sign up)

| Channel | Reported fees | Check at |
|---|---|---|
| KDP | No listing fee. Print royalty is commonly cited as 60% of list price minus printing. Ebooks earn 35% or 70% | [S12] |
| IngramSpark | No title setup fee since 2023. Revisions free for a short window, then about $25. You pay print and shipping on your own orders. A small annual per-title fee may exist | [S13] |
| Etsy | $0.20 per listing. 6.5% transaction fee on item price plus shipping. Payment processing 3% + $0.25. Offsite Ads 15% of attributed sales (12% for shops over $10,000 a year). A one-time shop-opening fee of about $15 may apply | [S14] |
| TpT | Basic sellers keep 55%, plus a $0.30 fee on items under $3. Premium membership is about $59.95 a year: keep 80%, plus a $0.15 fee on items under $3 | [S15] |
| TikTok Shop | Referral fee reported at about 8% for most categories, with a reduced rate for new sellers. Check current category rates in Seller Center | [S16] |
| Shopify | Basic $39/month ($29 if billed yearly), card rate 2.9% + $0.30. Grow $105/month ($79 yearly), 2.7% + $0.30. An extra 2% on Basic if you use a different payment processor. Shopify Tax may charge above a free threshold | [S10] |
| Stripe | 2.9% + $0.30 for US cards. International cards add about 1.5%, currency conversion about 1%. Invoicing and Stripe Tax cost extra | [S9] |
| PayPal | Checkout and invoicing 3.49% + $0.49. Card processing about 2.99% + $0.49. Extra fees for international payments | [S11] |
| Faire | About 15% commission on orders from retailers Faire brings you (possibly plus a first-order fee). 0% on retailers you bring through Faire Direct links. About 3% payment processing | [S18] |
| Merchant of record | Lemon Squeezy 5% + $0.50 per sale, plus surcharges for international and PayPal payments. Gumroad 10% + $0.50 on direct sales, more on its Discover marketplace | [S21] |
| Printful | Base price per item, plus shipping, plus any sales tax Printful charges | [S19] |
| Amazon Associates, Bookshop.org | No fees | [S20] |

---

## 4. Accounting software and connector

### Ledger: QuickBooks Online (confirm with your accountant first)

**Why QuickBooks Online (QBO):**
- All three settlement connectors (Link My Books, A2X and Synder) post into it [S6][S7][S8].
- Most US small-business accountants already work in it [S2].
- Because the chart of accounts gives each revenue stream its own income account, **Simple Start or Essentials** is enough. Class tracking (a Plus feature, UNVERIFIED) is not needed [S2].

**Before you buy:**
- Ask your accountant first. Many can add you through QuickBooks Online Accountant at a wholesale or ProAdvisor discount (UNVERIFIED).
- Invite the accountant with the **"Accountant" user type**. Accountant users have historically not counted toward your plan's user limit (UNVERIFIED) [S2].

**Price: UNVERIFIED.**
- The last list prices known from Intuit (mid-2025) were Simple Start $38, Essentials $75 and Plus $115 a month.
- A third-party site claims Essentials $85 and Plus $140 from August 1, 2026. Intuit could not confirm this.
- Check https://quickbooks.intuit.com/pricing/ on the day you buy [S2].

**Alternatives:**
- **Xero:** an equal choice, but only if your accountant prefers it. Pick one ledger, not both. The Early plan has historically been capped at 20 invoices and 5 bills a month, so Growing is the realistic plan. Prices are UNVERIFIED [S3].
- **Wave: not recommended.** The free plan has no automatic bank import, and no known connector supports Wave for Etsy, TikTok Shop or Amazon, so you would split every fee and tax amount by hand [S4].
- **FreshBooks: not recommended as the main books.** It is built for invoicing, and the marketplace connectors don't post to it [S5].

### Connector: Link My Books, once two or more shops are live

**What it does:**
- It reads each Etsy, TikTok Shop and Shopify settlement and posts **one summary entry per payout** into QBO.
- Sales, fees, refunds and marketplace-collected tax go on separate lines, so each entry equals the bank deposit exactly [S6].
- It also covers Amazon Seller Central, eBay, Walmart, WooCommerce and Square.

**What it does not cover:** KDP (a royalty program, not Seller Central), IngramSpark, TpT, Faire or a merchant of record. Those need the monthly journal entry in section 5.

**Price: UNVERIFIED.** A prior search reported plans from $21 a month (200 orders, 1 channel) up to $176 a month, about $13 a month per extra channel, a 14-day free trial, and prices that changed July 1, 2026 [S6].

**Alternatives:**
- **A2X:** priced per channel, so each channel is usually a separate plan. Reported from $29 a month each [S7].
- **Synder:** only worth it later, if Stripe and PayPal volume grows or you want Faire and TikTok synced. Reported from $65 a month [S8].

**Summary:**

| Decide | Recommendation | When |
|---|---|---|
| Ledger | QuickBooks Online, Simple Start or Essentials (or Xero, if the accountant prefers it) | At launch |
| Connector | Link My Books for Etsy, TikTok Shop and Shopify | Once 2 or more of those shops are live (within 90 days) |
| Manual entries | One journal entry a month each for KDP, IngramSpark, TpT, Faire, the merchant of record and Stripe | From the first sale |
| Workbook | `PlayBeforePixels_Bookkeeping_2026.xlsx` for those manual channels, payout matching, Maryland sales tax, estimate placeholders, mileage and the packet checklist | From the first sale |

---

## 5. How each channel is connected (the wiring)

**A. Bank and card feeds.** In QBO, connect business checking (1000), tax reserve (1010) and the business card (2000). Then add **bank rules** so repeat charges sort themselves:

| Charges from | Go to |
|---|---|
| Printful | 5100 COGS: POD fulfillment, and 5200 Shipping |
| Canva, QBO, Link My Books, Shopify plan | 6200 Software |
| Ad platforms | 6100 Advertising |
| Bowker | 6300 Publishing costs |

**B. Link My Books (Etsy, TikTok Shop, Shopify).**
1. Connect each shop.
2. Map sales to the income accounts (4100–4300, 4800), fees to 6000-Etsy, 6000-TikTok or 6050, refunds to 4900, and tax you collected to **2200 Sales tax payable – MD**.
3. Keep marketplace-collected tax away from income altogether.
4. Each settlement lands in 1040 Marketplace clearing and is matched to its deposit [S6].

**C. Stripe and PayPal.**
- **Stripe:** at launch volume, match each payout in the bank feed. Once a month, book gross sales and Stripe fees from Stripe's **Payout Reconciliation report** [S9].
- **PayPal:** connect it in QBO as a bank-type account (method UNVERIFIED) [S11]. A platform payout that arrives through PayPal (for example TpT) is **not income twice**. The platform's report is the income record, and the move from PayPal to checking is a transfer.

**D. One journal entry a month for channels no connector covers.** Save each report as a PDF in that month's folder.

```
KDP (from the Royalty report, for the month the royalty was EARNED)
  Dr 1100 KDP receivable ........................ royalty
      Cr 4000 Book royalties - KDP .................. royalty
When the EFT lands about 60 days later: match the deposit to 1100.

IngramSpark (from the compensation report)
  Dr 1110 IngramSpark receivable / Cr 4010 Book compensation - IngramSpark

TpT (from the sales report)
  Dr 1120 Other receivables (net)   Dr 6000-TpT (fees)
      Cr 4150 Teacher resource pack / 4100 Digital downloads (gross)

Faire (from the payout report)
  Dr 1120 (net)   Dr 6000-Faire (commission + processing)   Cr 4600 Wholesale (gross)

Merchant of record (from the payout statement; your accountant decides gross vs net)
  Dr 1120 (net)   Dr 6000-MoR (fees)   Cr 4100 / 4400 / 4520 (gross, VAT and sales tax excluded)
```

**E. Affiliates.** Code Amazon Associates and Bookshop.org deposits in the bank feed to **4700 Affiliate income** [S20].

**F. Printful** (a supplier, not a shop).
- Its charges arrive through the card feed.
- Upload a Maryland resale certificate so Printful does not charge sales tax on fulfillment. This matters even for Etsy orders (UNVERIFIED) [S19].

**G. Invoices for coaching, workshops and B2B.**
- Send them through Stripe Invoicing or QBO invoices.
- Put deposits for workshops not yet delivered in 2300 Customer deposits, if your accountant uses that method.

**H. In the workbook, each month:**
- one Sales Log row per marketplace per month, and one per order for direct sales;
- every payout ticked off on Payouts Reconciliation until it reads **MATCHED**.

---

## 6. What your accountant receives

The **Accountant Packet** tab in the workbook is the checklist, with a Status drop-down.

**Monthly** (by the 15th of the following month):
- Bank statement PDFs (checking and tax reserve) and the card statement PDF.
- Each platform's monthly report: KDP, IngramSpark, Etsy, TikTok, Shopify, Stripe, PayPal, TpT, Faire, the merchant of record, Associates, Bookshop.org. Also Printful's billing history.
- QBO with every receipt attached and nothing uncategorized. Anything you're unsure of goes in "Ask My Accountant" with a note.
- The Payouts Reconciliation tab with every payout MATCHED.
- The Maryland sales-tax return confirmation, if you file monthly.

**Quarterly** (about two weeks before each estimate is due):
- Quarterly Profit & Loss and Balance Sheet.
- The Quarterly Estimates tab. The accountant tells you what to pay, and you save the payment confirmations.
- The Maryland sales-tax return confirmation, if you file quarterly.
- A check of direct website sales by state against other states' economic-nexus thresholds.

**Annually:** the year-end packet (section 12), plus every 1099 form as it arrives.

---

## 7. Tax calendar, October 2026 to December 2027

Weekdays were worked out by calendar arithmetic. The deadlines are UNVERIFIED this session: federal dates [S24] [S22] [S23], Maryland dates [S25].

| Date | What's due | Notes |
|---|---|---|
| *Passed:* Apr 15 (Wed), Jun 15 (Mon), Sep 15 (Tue), 2026 | 2026 federal estimated tax, Q1–Q3 | **Sep 15 has passed.** If the business made a 2026 profit, ask the accountant about a catch-up payment now. June 15 is correct; one secondary source's "June 16" is wrong. |
| **Tue Oct 20, 2026** | Maryland sales & use tax: September (monthly filers) or Q3 (quarterly filers) | Only once your registration covers these sales. Zero returns are still required. |
| **Fri Nov 20, 2026** | MD sales tax: October (monthly) | |
| **Sun Dec 20, 2026** | MD sales tax: November (monthly) | Falls on a weekend. File by **Fri Dec 18** to be safe. |
| **Fri Jan 15, 2027** | Federal estimated tax, Q4 2026 (Form 1040-ES) | You may skip it if you file the 2026 return by **Feb 1, 2027** and pay in full. Maryland's Q4 estimate is usually on the same date (UNVERIFIED). |
| **Wed Jan 20, 2027** | MD sales tax: December (monthly), Q4 (quarterly) or 2026 (annual) | |
| **Mon Feb 1, 2027** | 1099-K and 1099-MISC forms should reach you. **Your 1099-NECs are due to contractors and the IRS.** Year-end packet to the accountant | January 31, 2027 is a Sunday, so these deadlines move to Monday. |
| **Sat Feb 20, 2027** | MD sales tax: January (monthly) | File by **Fri Feb 19**. |
| **Mon Mar 8, 2027** | *Not a tax date, but a paid filing:* ALPHAPLAY trademark Statement of Use or Extension Request (from `legal/ENTITY.md`) | Your trademark attorney files it. Code the fees to 6450 or 6400. |
| **Sat Mar 20, 2027** | MD sales tax: February (monthly) | File by **Fri Mar 19**. |
| **Thu Apr 15, 2027** | Your 2026 Form 1040 with Schedule C and Schedule SE (standard deadline). Federal Q1 2027 estimate. Maryland 2026 return and Q1 estimate (UNVERIFIED). **SDAT Annual Report for AlphaPlay LLC** (fee reported as $300, UNVERIFIED) | The annual report is filed with SDAT (https://dat.maryland.gov, not fetched). |
| **Tue Apr 20, 2027** | MD sales tax: March (monthly) or Q1 (quarterly) | |
| **Thu May 20, 2027** | MD sales tax: April (monthly) | |
| **Tue Jun 15, 2027** | Federal Q2 2027 estimate | |
| **Sun Jun 20, 2027** | MD sales tax: May (monthly) | File by **Fri Jun 18**. |
| **Tue Jul 20, 2027** | MD sales tax: June (monthly) or Q2 (quarterly) | |
| **Fri Aug 20, 2027** | MD sales tax: July (monthly) | |
| **Wed Sep 15, 2027** | Federal Q3 2027 estimate | |
| **Mon Sep 20, 2027** | MD sales tax: August (monthly) | |
| **Wed Oct 20, 2027** | MD sales tax: September (monthly) or Q3 (quarterly) | |
| **Sat Nov 20, 2027** | MD sales tax: October (monthly) | File by **Fri Nov 19**. |
| **Mon Dec 20, 2027** | MD sales tax: November (monthly) | |
| January 2028 | Federal Q4 2027 estimate | January 15, 2028 is a Saturday. Use the date printed on the 2027 Form 1040-ES. |

**Filing frequency.** The Comptroller assigns your Maryland sales-tax filing frequency. Returns are due on the 20th of the month after the period [S25]. Use only the rows for your assigned frequency.

**How to pay.**
- Federal estimates: IRS Direct Pay, EFTPS or your IRS Online Account [S24].
- Maryland: the Comptroller's online portal. Business sales-tax filing may have moved to the newer **Maryland Tax Connect** portal (UNVERIFIED) [S25].
- Pay everything from the tax-reserve account and keep every confirmation number.

**Maryland estimated tax.** Maryland individual estimated tax (Form PV / 502D) is generally required if the Maryland tax not withheld is expected to be more than $500 (UNVERIFIED) [S25].

**Underpayment penalties.**
- Safe harbor: pay at least 90% of your 2026 tax, or 100% of your 2025 tax (110% if 2025 AGI was over $150,000) (UNVERIFIED) [S24].
- The penalty works like interest: the federal short-term rate plus 3 points, figured on Form 2210 (UNVERIFIED) [S24].

---

## 8. 1099 forms: what you'll receive and what you must send

### Forms you'll receive

**Form 1099-K (payment platforms and marketplaces)** [S22]
- **Federal threshold:** more than $20,000 **and** more than 200 transactions per platform, for 2025 and later. The One Big Beautiful Bill Act (P.L. 119-21, July 4, 2025) restored this threshold (UNVERIFIED this session).
- **Maryland threshold:** Maryland is commonly listed with a **$600** state threshold. Stripe, PayPal, Etsy, Shopify, TikTok Shop or TpT may therefore send you a 1099-K in year one, well below $20,000 (UNVERIFIED; check each platform's state-threshold help page).
- **The amount is GROSS,** before fees and refunds. Your accountant matches it to that platform's gross sales in the books; the Channel Summary tab's Gross block is your cross-check.
- **Due to you:** Feb 1, 2027.

**Form 1099-MISC (royalties and affiliate commissions)** [S23]
- **KDP** royalties are reported at **$10**, under a different rule from the $2,000 change below (UNVERIFIED) [S12].
- **IngramSpark** may send one [S13].
- **Amazon Associates** reportedly uses 1099-MISC (form and box UNVERIFIED) [S20].
- **Bookshop.org:** form not confirmed.

**Form 1099-INT** from the bank, if it paid you $10 or more of interest [S23].

**All income is taxable whether or not a form arrives.**

### Forms you may have to send (1099-NEC)

**Who counts** [S23] [S20]:
- You may owe a 1099-NEC to a contractor you pay by **check, ACH or bank transfer**, for example an illustrator, reviewer or translator.
- The threshold is **$2,000 per contractor** for payments made after December 31, 2025, up from $600, with inflation adjustments after 2026. This comes from the One Big Beautiful Bill Act (secondary source; UNVERIFIED).
- **Card and PayPal payments don't count here.** The processor reports those on a 1099-K (long-standing IRS instruction; UNVERIFIED).
- Corporations are generally exempt, **except attorneys**.

**How to handle it:**
- **Collect a W-9 before the first payment.** The Expenses tab's **1099-NEC watch** column flags payments that count.
- File for free through the IRS **IRIS** portal (UNVERIFIED). A paid e-file service is optional. E-filing is required once you file 10 or more information returns in total.
- **Due:** Feb 1, 2027, to both the contractor and the IRS.
- Maryland's own 1099 rules are UNVERIFIED; ask the accountant.

---

## 9. Maryland sales & use tax: which sales are yours to file

According to `legal/ENTITY.md`, add the new activities (retail books and merch, digital products) to AlphaPlay LLC's **existing** Maryland sales-and-use-tax registration. Everything in this section is UNVERIFIED, because marylandtaxes.gov was unreachable. Your accountant confirms each point [S25].

- **Rate:** 6% general rate.
- **On your return:** what you sell directly to Maryland buyers.
  - Goods (books, the card deck, merch), including goods sold at workshops and events.
  - **Digital products,** which have been taxable at 6% since 2021: printables, and possibly the pre-recorded course and the host-it-yourself **workshop kits** when sold on your own site.
- **Usually not taxable:** live coaching and workshop fees. A 3% tax on certain data and IT services started July 1, 2025, and is not expected to cover coaching.
- **Not on your return** (keep their reports):
  - Etsy, TikTok Shop and TpT, which are marketplace facilitators.
  - KDP, where Amazon is the seller.
  - Sales made through a merchant of record.
  - Probably Faire wholesale, which is resale backed by certificates.
- **Filing:**
  - The Comptroller assigns your frequency. Returns are due on the 20th of the month after the period.
  - **File zero returns too.**
  - Filing on time earns a vendor collection credit, reported as 1.2% of the first $6,000 of tax and 0.9% after that, capped per return.
- **Other states:** direct website sales into other states can create a duty to collect there once you pass their thresholds (often $100,000 of sales, some also 200 transactions). Check once a quarter.
- **Workbook:** the **Sales Tax** tab adds up Maryland taxable sales and the tax you collected for each month, quarter and year, and keeps marketplace-collected sales in separate "excluded" columns. The Sales Log columns *Tax collected by marketplace? (Y/N)*, *Buyer state* and *Taxable in MD? (Y/N)* drive it.

---

## 10. The monthly 30-minute close (first week of each month)

| Minutes | Step |
|---|---|
| 0–5 | Download last month's statements into the shared folder `YYYY-MM`: checking, tax reserve, card, and each platform report (KDP, IngramSpark, Etsy, TikTok, Shopify, Stripe, PayPal, TpT, Faire, merchant of record, Associates, Bookshop.org, Printful). |
| 5–12 | In QBO, categorize every bank and card transaction and attach any missing receipts. If you're unsure, use **7000 Ask My Accountant** with a note. |
| 12–17 | In Link My Books, confirm each Etsy, TikTok Shop and Shopify settlement posted and matched its deposit. |
| 17–22 | Post the monthly journal entries: KDP, IngramSpark, TpT, Faire, merchant of record and Stripe. In the workbook, add the matching **Sales Log** rows. |
| 22–25 | **Payouts Reconciliation** tab: every payout should read MATCHED. When a KDP or IngramSpark deposit lands, clear its receivable. Chase anything marked CHECK. |
| 25–28 | **Sales Tax** tab: check the month's row, then file the Maryland return (zero returns too) and note the confirmation. Move **the set-aside % of profit** plus **100% of Maryland sales tax collected** to the tax reserve. |
| 28–30 | **Accountant Packet** tab: mark the month's items Done and send the folder link. |

**During the month:**
- Photograph receipts as they happen (the QBO app or email forwarding).
- Log each business trip in the **Mileage & Event Log** the same day.
- Keep receipts for everything. The "$75 receipt" figure you may hear about is a travel-and-meals documentation convention, not a reason to throw receipts away.

---

## 11. Quarterly add-on (about 30 more minutes)

1. Run the quarter's Profit & Loss and Balance Sheet in QBO.
2. Review the **Quarterly Estimates** tab, which shows profit by IRS period, a self-employment-tax placeholder and a suggested set-aside. Send it to the accountant **two weeks before** the due date and ask for the federal and Maryland payment amounts.
3. Pay from the tax reserve and enter the payment date and confirmation number on the tab.
4. If you file quarterly, file the Maryland sales-tax return.
5. Check direct website sales by state against other states' thresholds.

---

## 12. Year-end packet checklist (tax year 2026)

Close the books and send the packet by **Mon Feb 1, 2027**. Forward any 1099 that arrives later as soon as it comes.

- [ ] All 12 months of statements for checking, tax reserve and the card
- [ ] QBO year-end **Profit & Loss, Balance Sheet and General Ledger**, with the tax-line mapping on each account
- [ ] **Every Form 1099-K received**, federal and state-threshold (Maryland), each reconciled to that platform's **gross** sales in the books
- [ ] Forms 1099-MISC (KDP, IngramSpark, Amazon Associates, others) and 1099-INT
- [ ] An annual summary from every channel: sales, fees, refunds, and tax collected by the platform
- [ ] All Maryland sales & use tax returns and payment confirmations
- [ ] Federal and Maryland estimated-tax payment confirmations
- [ ] Contractor list: W-9s and total paid to each, split by method (bank or check vs card or PayPal)
- [ ] 1099-NECs filed through IRIS, with confirmations (due Feb 1, 2027)
- [ ] Inventory count and cost at December 31: author copies, card decks, event stock
- [ ] Mileage & Event Log
- [ ] Home office: square feet of the dedicated space and of the whole home. The accountant picks the method; the simplified method is $5 per sq ft up to 300 sq ft (UNVERIFIED)
- [ ] Equipment bought during the year (date, item, cost)
- [ ] Summary of owner contributions and owner draws
- [ ] "Ask My Accountant" emptied, or each item explained
- [ ] `PlayBeforePixels_Bookkeeping_2026.xlsx`

---

## 13. Questions to bring to the first accountant meeting

1. How is AlphaPlay LLC taxed: disregarded (Schedule C) or an S-corp election? **Which TIN do I enter on platform W-9s** (KDP, Etsy, Associates, Stripe and the rest)?
2. QBO or Xero? Can you add me through your accountant subscription at a discount?
3. What % should I set aside from each month's profit?
4. Do I need a catch-up estimated payment now for Q3 2026? For Q4, do I pay on Jan 15, 2027, or file by Feb 1, 2027?
5. Maryland sales tax:
   - What filing frequency was I assigned?
   - Are printables, the pre-recorded course, workshop kits and shipping charges taxable?
   - Are Faire orders exempt?
   - Should I give Printful a resale certificate?
6. Merchant-of-record sales: do I book them gross or net?
7. Inventory: how should I track author copies, card decks and any offset board-book print run?
8. 1099-NEC through IRIS: does Maryland also need copies?
9. Home office method, the mileage rate for 2026 (enter it in the workbook's Mileage tab, cell B3), and vehicle records.
10. Do I need Maryland estimated payments (Form PV)?
11. Cash or accrual? Do workshop deposits go to 2300 Customer deposits?

---

## 14. Using the workbook

`PlayBeforePixels_Bookkeeping_2026.xlsx` has these tabs:

| Tab | What it's for |
|---|---|
| README | How to use the workbook |
| Chart of Accounts | The accounts to set up in QBO, plus a **Channel map** showing how every shop's money reaches the books. The channel map feeds every Channel drop-down |
| Sales Log | Sales. Net payout is a formula |
| Expenses | Costs. The category drop-down comes from the chart, and a column flags 1099-NEC payments |
| Payouts Reconciliation | Each payout matched to a bank deposit: MATCHED, CHECK or WAITING |
| Channel Summary | Totals by channel and month (SUMIFS), plus a month-at-a-glance view |
| Sales Tax | Maryland sales and tax, monthly, quarterly and annual |
| Quarterly Estimates | Profit by period, placeholders, and payment records |
| Mileage & Event Log | Trips and events. Excel doesn't allow "/" in tab names, hence the "&" |
| Accountant Packet | The checklist, with a Status drop-down |

**Color key:**
- Dark-ink headers.
- Light-yellow cells with blue text are for you to fill in.
- Grey italic rows marked **EXAMPLE** are made-up amounts; every total ignores them. Delete them when you start.
- Light grey-blue cells are formulas; don't type over them.

**Rates in yellow cells are placeholders marked UNVERIFIED** (Maryland 6%, the self-employment-tax factors, the 25% set-aside). Your accountant confirms or replaces them.

---

## Sources to check

**None of these pages could be reached from the research environment on September 27, 2026.** They are the pages to check, not confirmations.

- **[S1]** SBA, open a business bank account: https://www.sba.gov/business-guide/launch-your-business/open-business-bank-account
- **[S2]** QuickBooks Online pricing: https://quickbooks.intuit.com/pricing/
- **[S3]** Xero US pricing: https://www.xero.com/us/pricing-plans/
- **[S4]** Wave pricing: https://www.waveapps.com/pricing
- **[S5]** FreshBooks pricing: https://www.freshbooks.com/pricing
- **[S6]** Link My Books, 2026 price changes: https://help.linkmybooks.com/en/articles/11093698-2026-price-changes
- **[S7]** A2X pricing: https://www.a2xaccounting.com/pricing
- **[S8]** Synder pricing: https://synder.com/pricing/
- **[S9]** Stripe pricing: https://stripe.com/pricing
- **[S10]** Shopify pricing: https://www.shopify.com/pricing
- **[S11]** PayPal business fees: https://www.paypal.com/us/business/paypal-business-fees
- **[S12]** Amazon KDP help: https://kdp.amazon.com/en_US/help/topic/G200641050
- **[S13]** IngramSpark: https://www.ingramspark.com/
- **[S14]** Etsy fees: https://www.etsy.com/legal/fees/
- **[S15]** Teachers Pay Teachers: https://www.teacherspayteachers.com/
- **[S16]** TikTok Shop Seller Center (US): https://seller-us.tiktok.com/
- **[S17]** Meta Business Help Center: https://www.facebook.com/business/help
- **[S18]** Faire: https://www.faire.com/
- **[S19]** Printful: https://www.printful.com/
- **[S20]** OBBBA 1099 threshold increase (secondary source): https://www.landmarkcpas.com/obbba-increases-1099-filing-threshold/
- **[S21]** EU VAT for e-commerce (merchant of record / non-Union OSS): https://taxation-customs.ec.europa.eu/taxation/vat/vat-e-commerce_en
- **[S22]** IRS, Understanding your Form 1099-K: https://www.irs.gov/businesses/understanding-your-form-1099-k
- **[S23]** IRS instructions for Forms 1099-MISC and 1099-NEC: https://www.irs.gov/instructions/i1099mec
- **[S24]** IRS Form 1040-ES: https://www.irs.gov/pub/irs-pdf/f1040es.pdf
- **[S25]** Comptroller of Maryland, sales & use tax: https://www.marylandtaxes.gov/business/sales-use/index.php
- Maryland SDAT (trade name, annual report): https://dat.maryland.gov (not in the verified findings; UNVERIFIED)

[S1]: https://www.sba.gov/business-guide/launch-your-business/open-business-bank-account
[S2]: https://quickbooks.intuit.com/pricing/
[S3]: https://www.xero.com/us/pricing-plans/
[S4]: https://www.waveapps.com/pricing
[S5]: https://www.freshbooks.com/pricing
[S6]: https://help.linkmybooks.com/en/articles/11093698-2026-price-changes
[S7]: https://www.a2xaccounting.com/pricing
[S8]: https://synder.com/pricing/
[S9]: https://stripe.com/pricing
[S10]: https://www.shopify.com/pricing
[S11]: https://www.paypal.com/us/business/paypal-business-fees
[S12]: https://kdp.amazon.com/en_US/help/topic/G200641050
[S13]: https://www.ingramspark.com/
[S14]: https://www.etsy.com/legal/fees/
[S15]: https://www.teacherspayteachers.com/
[S16]: https://seller-us.tiktok.com/
[S17]: https://www.facebook.com/business/help
[S18]: https://www.faire.com/
[S19]: https://www.printful.com/
[S20]: https://www.landmarkcpas.com/obbba-increases-1099-filing-threshold/
[S21]: https://taxation-customs.ec.europa.eu/taxation/vat/vat-e-commerce_en
[S22]: https://www.irs.gov/businesses/understanding-your-form-1099-k
[S23]: https://www.irs.gov/instructions/i1099mec
[S24]: https://www.irs.gov/pub/irs-pdf/f1040es.pdf
[S25]: https://www.marylandtaxes.gov/business/sales-use/index.php

*This guide organizes records for your accountant. It is not tax or legal advice.*
