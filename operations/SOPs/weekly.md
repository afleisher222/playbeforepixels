# Weekly SOP

**Runs:** every Monday, as part of the weekly studio routine (`ops/ROUTINE.md`). The daily check covers the time-sensitive items in between.

**Owners:**
- **R** = Claude routine
- **F** = founder (only what legally or practically needs her)
- **A** = accountant

**Founder time target:** 10 minutes or less. That means approving the lines in `ops/APPROVALS.md`, and nothing else.

## Daily (weekdays), for reference; handled by the daily check
- [ ] R: Is the site, shop and checkout up? (uptime monitor status, `ops/MONITORING.md`)
- [ ] R: Triage every inbox and marketplace message center it can reach. Send approved macros within the limits in `customer-service/response-standards.md` §4. Draft everything else into `ops/APPROVALS.md`.
- [ ] R: Send license certificates for new site-license orders and POs.
- [ ] R: Check for any safety report, legal threat, press inquiry or suspicious payment request. If found, escalate per response-standards §5.
- [ ] R: Send the founder's one-line money report (ROUTINE.md "Founder updates = money").

## Monday: orders and customers
- [ ] R: **Stuck orders.** List every POD, book and wholesale order that is unshipped past the promised processing time. Send the delay macro and open a ticket with the printer.
- [ ] R: **Failed deliveries.** Find digital orders with no download recorded after 3 days, and send macro 1 once.
- [ ] R: **Open quotes and POs** (`SOPs/school-orders.md` register). Send reminders for quotes 30 days old and invoices 1 day past due (macro 25). Flag invoices 30+ days past due to F.
- [ ] R: **Refunds and disputes.** List refunds issued (with reason codes) and any open chargeback with its deadline. The chargeback evidence packet goes to `ops/APPROVALS.md`.
- [ ] R: **Customer-question trends.** Note the top 3 question types. Any question asked more than twice gets an FAQ or product-page fix queued.
- [ ] R: **Reviews.** Collect new marketplace and site reviews. Draft replies to any 1–3 star review for approval. Never ask for changes.

## Money and records
- [ ] R: Match the week's payouts to bank deposits (if bank data is connected). Otherwise list the expected payouts so the monthly close can match them.
- [ ] R: Confirm the tax-reserve transfer rule fired for each deposit (or list deposits that missed it).
- [ ] R: Check the business card for unfamiliar charges or new subscriptions. Flag any to F.
- [ ] R: Update the weekly scorecard at the top of the report: revenue and profit by product and channel, refunds, and subscribers (ROUTINE.md §6).

## Site, listings and trust
- [ ] R: Crawl the site for broken links, especially checkout, policy and "Buy" links (`commerce/links.js`).
- [ ] R: Spot-check 3 product pages for price, image, delivery time and license text consistent with `listing.json`.
- [ ] R: Check that the marketplace listings match (price and title) and that none has been suppressed or flagged.
- [ ] R: Look for look-alike accounts or listings using our name. Log them in `ops/COPYCAT-LOG.md`; the full watch runs monthly.
- [ ] R: Run everything new through the compliance gate before it publishes.

## Founder (only if there are lines in `ops/APPROVALS.md`)
- [ ] F: Mark each line APPROVED or NO.
- [ ] F: Mobile-deposit any school check that arrived at the PO Box. Picking up PO Box mail once a week is the only recurring physical task; skip it in weeks when no checks are expected.
- [ ] F: Do any upload packet waiting in `ops/UPLOAD-PACKETS/` (KDP, IngramSpark, TpT).

## Output
- R appends the week to `ops/RUNLOG.md`.
- R sends F the weekly money report.
