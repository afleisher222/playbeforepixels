# Tax autopilot — what runs by itself, and the few things only you or your accountant can do

This builds on finance/money-and-tax-setup.md. Nothing here is tax advice; your accountant confirms the setup once.

## 1. Sales tax and VAT collect themselves (no filing by you)
- **Marketplaces collect and remit for you:** Etsy, Amazon, TikTok Shop, Teachers Pay Teachers (marketplace facilitators). Amazon KDP, IngramSpark and Bookshop.org are the retailers of your books, so they handle the customer's tax.
- **Worldwide digital sales go through one merchant of record** (Gumroad, Lemon Squeezy or Paddle — pick one). It is the legal seller, so it collects and pays VAT/GST and US sales tax for those sales.
- **Your own Shopify store:** Shopify Tax calculates Maryland tax at checkout. Filing the Maryland return can be automated with a sales-tax filing service that connects to Shopify and files and pays on schedule (examples: TaxJar AutoFile, Avalara Returns, Numeral — compare current prices; [VERIFY]). At low volume your accountant may prefer to file it; either way Claude prepares the numbers.

## 2. Income tax money is set aside automatically
- **Tax reserve on autopilot:** set a bank rule (or a service like the bank's "rules" / "buckets" feature) that moves a fixed percentage of every deposit (your accountant picks it; 25–30% is common for self-employment income) into a separate "tax reserve" account. You never spend it by accident.
- **Quarterly estimated taxes on autopilot:** once a year, schedule all four federal estimated payments in **EFTPS** (the IRS's Electronic Federal Tax Payment System lets you schedule payments ahead) and Maryland's estimated payments through the Comptroller's online payment system, using the amounts your accountant sets. Due dates are in finance/money-and-tax-setup.md.

## 3. Bookkeeping runs itself (mostly)
- **Bank and card feeds** flow into the accounting software automatically.
- **Settlement connectors** (e.g., Link My Books or A2X) post Shopify, Etsy and TikTok Shop payouts with fees and tax split out.
- **Claude's monthly close (first weekly run of each month):** pulls reports from every platform with a connected key, updates `finance/PlayBeforePixels_Bookkeeping_2026.xlsx` (Sales Log, Payouts Reconciliation, Channel Summary, Sales Tax, Quarterly Estimates), drafts the month's journal entries for platforms without connectors, flags anything that doesn't match, and writes `finance/closes/YYYY-MM.md` for the accountant.
- **The one gap:** Amazon KDP, IngramSpark and Teachers Pay Teachers have no reporting keys. Instead of downloading reports yourself, **give your accountant (or a bookkeeping service) read-only access** where the platform allows it, or accept a 10-minute monthly download that the routine will remind you about.

## 4. Year-end
- 1099-K / 1099-MISC forms arrive from the platforms; the accountant packet tab in the workbook lists what to send.
- Claude assembles the year-end packet (sales by channel, expenses by category, mileage/events log, inventory: none) in January.

## 5. What only you (or your accountant) can do — by law
- Sign returns (federal Schedule C with your personal return, Maryland returns) — your accountant files them.
- Authorize payment accounts (EFTPS enrollment, Comptroller account, bank rules).
- Answer any IRS or Comptroller letter (Claude drafts; you or your accountant send).
