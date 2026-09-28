# Monthly SOP

**Runs:** the first weekly run of each month (`ops/ROUTINE.md` §5, "Monthly close").
**Detailed accounting steps:** `finance/money-and-tax-setup.md` §10 and `finance/TAX-AUTOPILOT.md` §3.

**Owners:** R = Claude routine · F = founder · A = accountant.

## 1. Monthly close (by the 10th)
- [ ] R: Pull last month's reports from every connected platform: Shopify, the merchant of record, Etsy, TikTok and the email platform.
- [ ] R: Remind F (one line) to download the reports from platforms with no API (KDP, IngramSpark, TpT), unless A has read-only access.
- [ ] R: Update `finance/PlayBeforePixels_Bookkeeping_2026.xlsx`:
  - Sales Log;
  - Payouts Reconciliation (each payout MATCHED, CHECK or WAITING);
  - Channel Summary;
  - Sales Tax.
- [ ] R: Draft the journal entries for KDP, IngramSpark, TpT, Faire and the merchant of record (formats in `finance/money-and-tax-setup.md` §5D).
- [ ] R: Check that the Link My Books settlements posted and matched the deposits (once connected).
- [ ] R: Check that the tax-reserve balance = the set-aside % of profit + 100% of Maryland sales tax collected. Flag any shortfall.
- [ ] R: Record fundraiser-group payouts owed for any windows that closed, and draft the ACH list for F's approval.
- [ ] R: Write `finance/closes/YYYY-MM.md`: totals, what's unmatched, questions for A.
- [ ] F: Approve and send the folder link to A. Nothing else.
- [ ] A: Review. File or approve the Maryland sales-tax return (monthly filers; due the 20th, zero returns included).

## 2. Customers and quality
- [ ] R: **Refund rate by product.** Anything above [5]% gets a fix in `ops/QUEUE.md`.
- [ ] R: Review every chargeback and complaint from the month. Look for patterns such as the descriptor, delivery time or a confusing listing.
- [ ] R: Update `customer-service/FAQ.md` and the macros if a question recurred. Changes to wording that customers see need F's approval.
- [ ] R: Test buy one digital product end to end: checkout, email, download and file opens. Refund the test.

## 3. Trust and security
- [ ] R: **Copycat watch** (ROUTINE.md §1): our titles, phrases and cover art on marketplaces and image search. Log findings. Takedown drafts go to APPROVALS.
- [ ] R: **Email deliverability.** Check that the DMARC aggregate reports show only our own senders. Check the email platform's bounce and complaint rates.
- [ ] R: **Access review.** List every API key in `ops/SECRETS.md`, its platform and when it was last used. Suggest revoking any unused key.
- [ ] R: Confirm no domain expires within 60 days, and that auto-renew is on and the payment card is valid.
- [ ] R: Look over the `security.txt` expiry date and the policy "Last updated" dates for anything stale.

## 4. School and organization pipeline
- [ ] R: Review the quote register. Quotes older than 60 days expire; send one "quote expired, happy to refresh" note.
- [ ] R: Review the accounts receivable aging (0–30, 31–60, 61–90, 90+ days). F decides on anything over 60 days.
- [ ] R: Check that every license issued last month has a certificate, a row in the license register and a matching payment or PO.

## 5. Report
- [ ] R: Send F the monthly money report (ROUTINE.md format): revenue, profit, the change from last month, year to date, and the one change that would most raise next month's earnings.
