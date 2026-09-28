# Quarterly SOP

**Runs:** the first weekly run of January, April, July and October. It sits on top of that month's close.

**Owners:** R = Claude routine · F = founder · A = accountant.

**Quarterly tax dates** (federal estimates; UNVERIFIED, see the `finance/money-and-tax-setup.md` §7 calendar):
- **Around April 15, June 15, September 15 and January 15.** Adjust for weekends.
- **Maryland sales-tax returns for quarterly filers** are due on the 20th of the month after each quarter.

## 1. Taxes (about 2 weeks before each estimate is due)
- [ ] R: Run the quarter's Profit & Loss and Balance Sheet from the workbook (and from QBO once connected). Fill in the Quarterly Estimates tab.
- [ ] R: Send A the package and ask for the federal and Maryland estimated amounts.
- [ ] F: Confirm the payments are scheduled in EFTPS and the Maryland portal. Once all four are scheduled each January, this is just a check.
- [ ] R: Record the payment confirmations on the tab.
- [ ] R: **Nexus check:** direct-site sales by US state against each state's economic-nexus threshold. Flag any state at 50% or more of its threshold to A.
- [ ] R: **International check:** direct (non-MoR) sales by country. If any, confirm that the `ops/INTERNATIONAL.md` checklist covers them.

## 2. Trust audit (`TRUST-CHECKLIST.md`, "Quick self-audit")
- [ ] R: Do a stranger's-eye purchase of one digital and one physical item. Check that every email shows the legal name, `hello@` and the policy links.
- [ ] R: Is the legal name, address and descriptor consistent across the site, receipts, invoices, the vendor packet and every marketplace?
- [ ] R: Search the brand name in a private window. List any results that aren't ours.
- [ ] R: Check that SPF, DKIM and DMARC pass (send a test to a Gmail address). Move DMARC to `quarantine` once reports are clean.
- [ ] R: Are all badges, counts and claims still true and documented? Remove anything that isn't.
- [ ] R: Are the review and testimonial files current, and does every testimonial have a release?

## 3. Policies, prices and macros
- [ ] R: Re-read every macro and FAQ answer against the current policies, prices and delivery times. Fix any mismatch; F approves the wording.
- [ ] R: Check POD base costs and shipping against list prices, and confirm every SKU still meets the margin floor (2× landed cost, `marketing/templates/wholesale-line-sheet.md`).
- [ ] R: Check whether any platform changed its fees, policies or tax handling (Shopify, the MoR, Etsy, TpT, KDP, IngramSpark, the POD partner). Log changes and update `commerce/` and `finance/`.
- [ ] R: If any policy changed, update its "Last updated" date. Any policy change that matters needs F's approval, and the attorney's where noted.

## 4. Security (`account-security.md` §5)
- [ ] R: Produce the account inventory (§2): owner email, 2FA method, last login where visible, who else has access.
- [ ] F: Confirm that 2FA is still on for email, the registrar, Cloudflare, the bank, Shopify, PayPal and the MoR. Confirm the recovery codes are where the security SOP says. About 10 minutes.
- [ ] R: Rotate any API key older than 12 months, or any that was shared anywhere by mistake.
- [ ] R: Remove access for any contractor who has finished work.

## 5. Business review
- [ ] R: Quarter scorecard: revenue and profit by product and channel, and the refund rate. Cut or fix any product or channel that has earned less than its upkeep for 8 weeks (ROUTINE.md §6).
- [ ] R: School and organization pipeline: quotes sent, won and lost (with reasons), and the average days to payment.
- [ ] R: Wholesale accounts: reorders, and accounts that haven't reordered in 2 quarters.
