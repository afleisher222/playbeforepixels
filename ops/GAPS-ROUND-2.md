# Round 2: gaps the plan still misses (September 28, 2026)

This file lists only gaps that no other file covers yet. Items that are already covered are listed at the end, with the file that covers each one.

- **Status tags:** **[confirmed]** means the primary source was read this pass. **[via search]** means the fact came from search results or a secondary source, not the page itself. **[VERIFY]** means the fact is unconfirmed and must be checked before anyone relies on it.
- **Numbering:** each gap has an ID (G2-01 to G2-25). The same IDs appear next to the new bullets in `ops/ROUTINE.md` and `ops/COMPLIANCE-GATE.md`.
- **Dates:** Black Friday is Nov 27, 2026. The Q4 estimated tax is due Jan 15, 2027. The accountant's year-end packet is due Feb 1, 2027. The ALPHAPLAY filing is due Mar 8, 2027.

## Summary

| ID | Gap | Who | When |
|---|---|---|---|
| G2-01 | No alert if the routines stop, publish nothing, or publish posts that stay hidden | Claude | Before launch |
| G2-02 | The routine gets the founder's personal connectors by default, and research runs in the same session as the publish keys | Founder, once | Before launch |
| G2-03 | The routine can write its own approvals | Claude | Before launch |
| G2-04 | Everything goes straight to main: no CI, no run lock, no off-GitHub backup, no platform-side stop | Claude | Before launch |
| G2-05 | Platform keys expire, and SECRETS.md describes a Shopify method that no longer exists | Claude | Before launch |
| G2-06 | No hard cap on automated spending | Founder, once | Before launch |
| G2-07 | No fast path for platform notices that have deadlines, no rule for when approvals stop, no cap on her time | Founder, once (+ 2 Claude rules) | Before launch |
| G2-08 | Duplicate listings, and no machine-checked AI disclosure for each channel | Claude | Before first sale |
| G2-09 | The QR code and site link inside Etsy and TpT files break marketplace rules | Claude | Before first sale |
| G2-10 | No total budget, break-even point, household-money cap or 13-week cash forecast | Claude | Before launch |
| G2-11 | No price floor, and the standing "30–40% off" anchor price conflicts with the FTC's former-price rule | Claude | Before launch |
| G2-12 | No plan for chargebacks, refund abuse or card testing on digital downloads | Claude | Before first sale |
| G2-13 | Net-30 school and organization orders have no fraud checks | Claude | Before the first group order (after counsel clears group sales) |
| G2-14 | Extra W-2 withholding is never considered as an alternative to estimated payments | Accountant | Before Jan 15, 2027 |
| G2-15 | Startup costs, a year-1 loss, the hobby-loss test and the QBI deduction are unplanned | Accountant | Before Feb 1, 2027 |
| G2-16 | No retirement-plan decision, and no warning about the shared deferral limit | Accountant | Decide by early December 2026 |
| G2-17 | No file-size, low-ink or print-permission standard for downloads | Claude | Before first sale |
| G2-18 | Printables tell things apart by color alone, some accent text is too pale, and large print needs a person | Claude | Before launch |
| G2-19 | The policy drafts promise replies within 2 business days and still describe coaching | Claude | Before launch (before the attorney review) |
| G2-20 | No procedure for public review replies (an Etsy reply locks the review permanently) | Claude | Before first sale |
| G2-21 | Nobody moderates comments on the brand's social posts | Founder, once | Before the first post |
| G2-22 | The founder's personal Gmail is public on the trademark record | Attorney | Before launch |
| G2-23 | Marketplace seller-identity rules could publish a home address or phone number | Attorney | Before first sale |
| G2-24 | No process for carrying out access and deletion requests across every system | Claude | Before first sale |
| G2-25 | Two neutral questions that the counsel list does not yet ask | Employment counsel | Before launch |

---

## 1. Claude can do (no founder time beyond reading one line)

### Before launch

**G2-01. Know when the routine stops working.**
- **Why:** A routine turns itself off after 72 hours without a GitHub connection. A paused subscription puts routines on hold. There is a daily cap on runs. A green run status "does not mean the task in your prompt succeeded." A run that never starts sends no message at all. TikTok keeps API posts from unaudited apps private (SELF_ONLY). [confirmed: routines docs; via search: TikTok developer docs]
- **Fix:**
  - At the end of every run, write `ops/HEARTBEAT.json` with the date, each step's result, items published, approved items still waiting, the Search Console manual-action status and credential health (G2-05).
  - Build an outside check that does not depend on Claude: a GitHub Actions scheduled workflow or a free Cloudflare Worker cron job. It sends one alert to the **business** address if the heartbeat is more than 8 days old, or if a run published 0 items while approved items were waiting. GitHub's own notices go to the account's email, which may be personal, so route this alert elsewhere.
  - After publishing, read back every post and listing the run created. A private or draft result counts as a failure.
  - This extends `ops/MONITORING.md`, which today only checks that the site is up.

**G2-03. Approvals the routine cannot fake.**
- **Why:** `ops/APPROVALS.md` is a file the routine can write, and "commits and pull requests carry your GitHub user." A fired prompt "can't act as approval or consent." One bad run could mark a held item APPROVED, and git history would show the founder as the author. [confirmed: routines docs]
- **Fix:**
  - An approval counts only if it comes through a channel the routine cannot write to.
  - **Preferred:** a small approval page on a Cloudflare Worker behind Cloudflare Access, which sends a one-time code to the business email. It records APPROVED or NO in the Worker's own store. The publish step asks the Worker, and the routine's Cloudflare token is scoped to Pages only, so it can't change the Worker or its store.
  - **Alternative:** a commit signed with a key that exists only on her device, checked by fingerprint. Do not rely on GitHub's "Verified" badge alone, because commits created through GitHub's API can also show as Verified. [VERIFY]
  - The routine never edits the APPROVED/NO column.
  - Until the channel exists, only APPROVED lines the founder commits through the GitHub web editor count, and never a commit made during a routine run.

**G2-04. A review step, a stop button that reaches the platforms, and a backup.**
- **Why:**
  - CLAUDE.md says "push to main." Measured today, the repo has one branch and no `.github` folder.
  - A push to main is refused only if main is protected. [confirmed: routines docs]
  - The gate is judged by the same model that wrote the item.
  - `ops/PAUSE` works only if a run starts and reads it, while scheduler queues, email sequences and ads keep running on their own.
  - GitHub holds the only copy of the business.
- **Fix:**
  1. Each run works on a `claude/run-YYYY-MM-DD` branch.
  2. A GitHub Actions check must pass before merging. It checks listing.json fields, banned words (therapy, cure, autism outside the research hub, school and district names), prices within their floor and ceiling, links, the copyright line, and G2-08 and G2-09.
  3. Protect main: the check is required, and force-push and deletion are blocked.
  4. Each run writes its own log (`ops/runs/YYYY-MM-DD.md`) and takes a lock file (`ops/LOCK`), so only one run proceeds at a time.
  5. A weekly `git bundle` backup goes to storage the routine can write to but not delete from.
  6. `ops/FULL-STOP.md` lists everything `ops/PAUSE` cannot reach: turn off the routine at claude.ai/code/routines, roll back the Cloudflare Pages deploy, clear the scheduler queue, pause email automations and ads, and put Etsy in vacation mode. Where a platform has an API, creating `ops/PAUSE` triggers that step automatically. The founder does the rest by hand from the card.
  - When steps 2–3 are live, change the "push to `main`" line in CLAUDE.md to match.

**G2-05. Keys that expire, and a token store that survives between runs.**
- **Why:**
  - Shopify no longer allows new legacy custom apps (since Jan 1, 2026). New apps come from the Dev Dashboard, and their tokens expire every 24 hours, so the SHOPIFY_ADMIN_TOKEN step in `ops/SECRETS.md` is out of date. [via search: Shopify changelog]
  - Pinterest access tokens last 30 days, and its only refresh token is a 60-day continuous one that must be refreshed and stored. [via search: Pinterest developer docs]
  - Etsy refresh tokens are reported to last about 90 days. [VERIFY]
  - Without somewhere to keep the new tokens, Pinterest and Etsy would quietly fall back to manual upload-packet mode within 2–3 months.
- **Fix:**
  - Rewrite `ops/SECRETS.md`. For Shopify, store the Dev Dashboard client ID and secret, and each run exchanges them for a fresh 24-hour token.
  - Pinterest and Etsy refresh tokens live in a token-broker Worker (the same Worker as G2-03). It refreshes them daily and hands the routine short-lived tokens.
  - Add a credential-health line to the heartbeat. The founder is alerted only when a token needs re-authorizing within 14 days.
  - AUTOFIX's switch to upload-packet mode stays as the fallback.

**G2-10. Budget, break-even and a cash forecast.**
- **Why:** money-and-tax-setup.md prices each fee on its own, but nothing adds them up or sets a stopping point.
  - Peak costs (proofs, ads, software) fall in Oct–Nov, while KDP pays about 60 days after month end.
  - Etsy holds new sellers' funds for 14 days and can add a rolling reserve (reported at about 30%) for up to 45 days. [via search: Etsy Help]
- **Fix:**
  - Add a "Budget & Break-even" tab to the bookkeeping workbook: one-time costs, Wave 1 monthly fixed costs, and contribution margin per product, giving break-even units and months.
  - Add a 13-week cash forecast that uses each channel's payout lag, set against the card's due dates.
  - The founder writes down one number: the most household money she will put in (owner contribution, account 3000), and a review date such as June 30, 2027.
  - New scorecard line: owner money in vs. that cap.

**G2-11. Price floor, and honest "was" prices.**
- **Why:** DEMAND-CHECK rule 2 and CAMPAIGN-BIBLE set a permanent anchor price with a standing 30–40% discount. Under 16 CFR 233.1, a former price is deceptive unless the item was openly offered at that price for a reasonably substantial period. Gate line 10 checks fake scarcity but not former prices. On a $6.50 printable, Etsy's fees plus a $5 referral credit leave little or nothing. [confirmed: eCFR]
- **Fix:**
  - Add `price_floor` and `net_per_unit_by_channel` to listing.json and the workbook. The net is price minus platform fees, processing, POD cost, a 3–5% refund allowance and any promotion, and it must stay above the floor.
  - Referral credits apply only above a set order total and never stack with bundle discounts.
  - Show a "was" price only if the item really sold at that price for a real period, with the dates recorded. Otherwise use a plain price or a genuinely time-limited sale.
  - Change the pricing wording in QUEUE.md, DEMAND-CHECK rule 2 and CAMPAIGN-BIBLE to match.

**G2-18. Printables that work for color-blind readers, and large print that ships automatically.**
- **Why:**
  - Computed this pass (Machado 2009 model): under deuteranopia, sky #3D86D8 and plum #8A5CC7 differ by about ΔE 5.5, against 37 for normal vision. Under protanopia, tomato and grass differ by about 18.
  - Contrast on white: tomato 3.4:1, grass 3.2:1, sky 3.75:1 and sun 1.8:1, all below the 4.5:1 WCAG AA needs for small text. Plum is 4.7:1 on white but 4.4:1 on wash.
  - BLIND-SPOTS #3 fixes the homepage only. The Accessibility Statement offers large print only "on request," which needs a person.
- **Fix:**
  - Every age band or category gets a word label and an icon as well as its color.
  - Small text uses ink or a darkened accent at 4.5:1 or better. Sun is used only for fills.
  - Build an 18 pt+ large-print edition of every text-heavy product and deliver it with the standard file.
  - Export tagged PDFs.
  - Run a color-blind simulation of the preview images and record it in panel.md.
  - Rules added as gate line 20.

**G2-19. Make the policy drafts match how the business really runs, before paying the attorney to review them.**
- **Why:** The weekly batch cannot keep a written promise to reply within 2 business days. That promise appears in SHIPPING-RETURNS-REFUNDS §7, ACCESSIBILITY-STATEMENT, TRUST-CHECKLIST #10 (contact page) and the Spanish macro ("2 días hábiles"). The policies also still collect "coaching information" (6 mentions in PRIVACY-POLICY, plus mentions in TERMS-OF-USE and Refunds §5), which BRAND.md bans. Etsy Star Seller requires replies to 95% of first messages within 24 hours, and auto-replies count. [via search: Etsy Help]
- **Fix:**
  - Change every reply promise to wording like: "an instant automatic reply with links that answer most questions; a person reviews everything else within [5] business days." The attorney confirms this meets any legal deadline.
  - Turn on auto-replies on every inbox and Etsy saved replies.
  - Decide on purpose whether to aim for Star Seller.
  - Remove the coaching rows and sections from PRIVACY-POLICY, Refunds §5 and TERMS-OF-USE.

### Before first sale

**G2-08. No duplicate listings, and AI disclosure recorded for every channel.**
- **Why:** A run that times out after creating a listing and then retries will make a duplicate. KDP asks separately about AI-generated text, images and translations, and the international plan machine-drafts translations. Etsy asks sellers to disclose AI use and to use "Designed by." Storefront-guide covers disclosure in general, but nothing makes the automation record or check it. [via search: Authors Guild / KDP guides; Etsy seller handbook] KDP's reported limit of 10 new titles per format per week is [VERIFY].
- **Fix:**
  - Add `ops/PUBLISHED.json`, a ledger of product × platform × external ID × content hash. Every publish checks it first and updates the existing item instead of creating a new one.
  - Weekly limits: at most 5 new Etsy listings and 2 new KDP titles, and no size-only or color-only variants listed separately.
  - Add `ai_disclosure` fields to listing.json: `etsy_attribution`, `etsy_ai_flag`, `kdp_ai_text`, `kdp_ai_images`, `kdp_ai_translation`, `social_ai_label`. A blank field for any channel the product goes to fails the gate and CI.
  - Optional: a short "How we make things" page (people write or edit the text; illustrations are AI-assisted; approved sources; a corrections link).

**G2-09. Marketplace editions carry no outside link.**
- **Why:** BRAND.md puts a QR code and bonus link to playbeforepixels.com in every product.
  - TpT: "resources should not link to other online retailers or e-commerce sites." [via search: TpT Help Center]
  - Etsy's fees policy bans pointing buyers to another place that sells the same items. [via search: Etsy fees policy]
  - Etsy is a Wave 1 channel, and the routine would add the QR code to every file automatically.
- **Fix:**
  - Build one edition per channel from the same source, with `channel=site|kdp|etsy|tpt` written into each file.
  - Site and KDP editions keep the QR code and bonus link. Etsy and TpT editions say "Find more in this shop" instead.
  - The site link goes on Etsy's About page only if Etsy's rules allow it. [VERIFY]
  - CI fails any Etsy or TpT file that contains the domain or a QR code.
  - Add this exception to BRAND.md's "Every product leads to the next" section. That section already says "never break a marketplace rule to promote," which this follows.

**G2-12. Refunds, chargebacks and card testing on $6–$16 downloads.**
- **Why:** Shopify Payments charges $15 for each chargeback. Shopify Protect does not cover the "friendly fraud" and "not received" disputes that digital goods usually get. On a $6–$11 item, one dispute costs more than the sale. [via search: secondary sources; VERIFY on Shopify's Protect page]
- **Fix:** Write `operations/SOPs/refunds-and-disputes.md`:
  1. First refund request on a digital order under a founder-approved amount (about $15) is refunded automatically, and the license ends with the refund.
  2. One refund per customer. Repeat requests go to the weekly batch.
  3. Checkout requires a checkbox accepting the license and instant delivery. This also covers the EU/UK withdrawal waiver.
  4. Use a download app or merchant of record that logs download time, IP address and count. Turn on Shopify's bot protection and cancel orders it rates high-risk.
  5. For each chargeback, the routine builds the evidence packet within 48 hours, so the founder only presses submit.
  6. The scorecard shows refund and dispute rate by product.

**G2-17. Downloads that open and print on the first try.**
- **Why:** The 120–150-page busy book and 200+ routine cards are large files. With support answered weekly, a buyer who can't open or print a file stays stuck for days, which leads to refunds and bad reviews. Solid color blocks also use a lot of home ink.
- **Fix:**
  - Separate PDFs of about 20 MB or less each, with plain file names. A ZIP is offered only as an extra "everything at once" link.
  - A 1-page "Start here" PDF.
  - A low-ink or black-and-white version of every color printable.
  - A "Print permission" page that names the license holder and order number, for print shops.
  - A "parent on a phone, no printer" tester on the customer panel.
  - Upload limits of email and download apps, and how often print shops refuse professional-looking art, are [VERIFY].

**G2-20. When and how to reply to public reviews.**
- **Why:** On Etsy, once the seller responds, the buyer can never edit the review, even if the response is deleted. The seller gets one reply and has 100 days to post it. A routine that replies fast would lock in 1-star reviews that a fix could have turned around. [via search: Etsy Help]
- **Fix:** Write `operations/SOPs/reviews.md`:
  - On Etsy, fix the problem privately first (resend, printing help or refund), wait about 7 days, then post at most one short reply the founder has approved. Sign it "The Play Before Pixels team."
  - On Amazon, don't reply publicly, and report only genuine guideline breaks.
  - Pre-draft replies for "AI art," "too much ink," "file won't open" and "not a real board book."
  - For a pile-on, check the reviews against order records, report them to the platform, never reply in bulk, and create `ops/PAUSE`.
  - The terms must never restrict negative reviews (Consumer Review Fairness Act).

**G2-24. Carry out privacy requests across every system.**
- **Why:**
  - Since March 23, 2026, Shopify processes erasure requests after 10 days instead of 180, and merchants must handle data held in other apps themselves. [via search: Shopify dev changelog]
  - GDPR allows one month, and many US state laws allow 45 days.
  - Deleting someone from the email platform can also delete their unsubscribe record, which risks emailing them again (CAN-SPAM).
- **Fix:** Write `operations/SOPs/privacy-requests.md`:
  - One intake point (privacy@ and a web form) with an auto-reply that gives the deadline.
  - Verify the person by matching their order or subscriber email. No ID documents.
  - Delete through each API (Shopify `customerRequestDataErasure`, email platform, merchant of record, POD partner, review app) and list any manual steps.
  - Keep a private log, and close each request within 30 days.
  - Keep a hashed-email suppression entry so a deleted person is never re-imported.
  - Marketplace buyers are sent to that marketplace's own process.
  - The attorney confirms the deadlines during the policy review already planned.

### Before the first group or school order (only after counsel clears group sales, BLIND-SPOTS #19)

**G2-13. Fraud checks for purchase orders and net-30 invoices.**
- **Why:** The FBI describes a scam in which criminals pose as schools and universities, using look-alike domains and forged letterhead, and ask for net-30 shipments to homes or storage units. PAYMENTS.md offers net-30 with no verification steps. [confirmed: FBI]
- **Fix:** Add these steps to `operations/SOPs/school-orders.md`:
  - Verify each new organization through contact details found independently (its official domain from a public directory).
  - No net terms on a first physical order.
  - Ship only to the organization's published address.
  - Release licensed PDFs only after payment or a verified PO.
  - Cap open invoices at $500.
  - The routine flags look-alike domains.

---

## 2. Founder, once (about 2 hours in total)

**G2-02. A separate, locked-down account for the routine (about 45 minutes, before launch).**
- **Why:** "All of your currently connected connectors are included by default," and Claude "can use every tool from an included connector, including writes, without asking." Environment variables are "visible to anyone who uses the environment." [confirmed: routines docs] This account has Gmail, Google Drive and Google Calendar connected, and BLIND-SPOTS #4 says personal email must never be reachable by automation. ROUTINE step 1 also reads untrusted web pages in the same session that holds the publish keys.
- **Fix:**
  - **Best:** create the routine under a claude.ai account used only for AlphaPlay LLC.
  - **At minimum:** remove every connector the business doesn't need when creating the routine.
  - Store platform keys as "API credentials," not plain environment variables.
  - Later, split the work into two routines: (a) research and build, with no publish keys, committing only to a branch; (b) publish, which reads only gate-passed files on main and whose network allowlist covers only the platform APIs.
  - Claude has added a start-of-run guard that refuses to publish if a personal connector is attached.

**G2-06. Hard spending caps (about 30 minutes, before launch).**
- **Why:** Usage credits can be set to unlimited, and routines then keep running on metered overage past the daily cap. Ad accounts spend until someone stops them. App and sample charges are automatic. [confirmed: routines docs; Claude Help Center]
- **Fix:**
  1. In claude.ai Settings > Usage, turn usage credits off, or set a fixed monthly limit such as $25.
  2. Set an account spending limit on each ad account before the first paid test.
  3. Put every software, app, ad and sample charge on one virtual card with a low monthly limit.
  4. Create API keys that cannot start paid plans or place orders.
  - Claude adds a "tool and ad costs vs. cap" line to the scorecard (done in ROUTINE.md).

**G2-07. A fast path for platform notices, plus two routine rules (about 20 minutes, before launch).**
- **Why:** Suspensions, Etsy cases, chargebacks and identity checks arrive as emails with deadlines, but the routine must not read her inbox, and she checks weekly or less. BLIND-SPOTS #20 covers the case where she can't work at all, not weeks with no answers. BLIND-SPOTS #2 measures her hours after the fact but doesn't limit what's sent to her.
- **Fix:**
  - **Founder:** in the **business** mailbox only, set a filter that pushes to her phone only mail from platform domains containing words like suspend, deactivat, action required, dispute, chargeback, copyright, infring, verify or "respond by."
  - **Claude:** adds two rules to ROUTINE.md (done):
    - (a) Maintenance mode after 21 days with no verified approval, counted from the day the approval channel (G2-03) goes live.
    - (b) A weekly cap of 60 minutes on approval requests, ranked by importance, with overflow rolling to the next week.

**G2-21. Comment filters on every social account (about 30 minutes, before the first post).**
- **Why:** The routine posts to 9+ platforms but has no inbound moderation. A screen-time brand will draw autism arguments and personal details about children. Current filter limits on each platform are [VERIFY].
- **Fix:**
  - Load the word lists from `ops/moderation-words.md` into Instagram/Facebook Hidden Words, TikTok comment filters and YouTube blocked words.
  - Rule: hide spam, abuse and children's personal details, but never good-faith criticism.
  - Turn comments off on research-hub posts.
  - Each week the routine exports held comments into the batch and reports impersonator accounts (added to ROUTINE.md).

---

## 3. Attorney (add to the policy and trademark reviews already planned)

**G2-22. Remove the personal Gmail from the public trademark record (before launch).**
- **Why:** For owners with no attorney, the USPTO says "unrepresented owner email addresses will still be viewable in the correspondence email address field." ENTITY.md keeps the founder's personal Gmail as the correspondence email for Serial No. 99650345. [via search: USPTO]
- **Fix:**
  - On the planned TEAS Change Address or Representation filing, either make the trademark attorney attorney of record, or change the correspondence email to a business address such as legal@[domain].
  - Ask who signs the Statement of Use and whether that name becomes public.
  - Keep a quarterly list in legal/ of what each public record shows.
  - Also set the PayPal statement name to PLAYBEFOREPIXELS. (The Shopify descriptor is already covered in TRUST-CHECKLIST #17.)

**G2-23. Marketplace seller-identity fields (before opening Etsy).**
- **Why:** Once a seller makes $20,000+ a year on one marketplace, the marketplace must show buyers the seller's name, physical address and contact details. It may withhold a residential address that is the seller's only address, or a personal phone that is the only phone, but it must then show an email. [via search: FTC INFORM guidance] ENTITY.md picks addresses for filings and public pages, but not for these fields.
- **Fix:**
  - Fill each marketplace's seller or Legal & Tax page with AlphaPlay LLC, the business mailing address and the business email. Never enter the home address or a personal cell.
  - Ask the attorney:
    - whether a PO Box meets INFORM's "physical address" requirement;
    - whether to use the residential-address and personal-phone certifications;
    - what Etsy's EU trader page will display.
  - Record each answer in ENTITY.md.

---

## 4. Accountant (add to finance/money-and-tax-setup.md §13)

**G2-14. Extra paycheck withholding instead of quarterly estimates (before Jan 15, 2027; ask now so Q4 paychecks can change).**
- **Why:** Income-tax withholding is treated as paid evenly through the year, so extra withholding late in the year can make up an earlier underpayment, such as the missed Sep 15, 2026 quarter. The current plan looks only at estimated payments. [confirmed: IRS Pub. 505] Maryland's treatment is [VERIFY].
- **Question:** "Instead of Form 1040-ES and Maryland Form PV for 2026–2027, can I raise my federal W-4 and Maryland MW507 withholding by an amount you set? Would a Q4 2026 increase cover the missed Q3 estimate?" If yes, replace the quarterly steps in the workbook and TAX-AUTOPILOT with a yearly withholding check each October.

**G2-15. Year-1 loss, startup costs, hobby-loss test and QBI (before Feb 1, 2027).**
- **Why:** Year 1 will probably show a loss, and the existing 11 questions don't cover §195, §183 or QBI. OBBBA made the 20% QBI deduction permanent and adds a $400 minimum from 2026 for owners with at least $1,000 of QBI from a business they materially participate in. A business built to run itself may not meet that test. [via search: Foster Garvey, Tax Foundation]
- **Questions:**
  - (a) What is the business start date for §195, and should I elect to deduct up to $5,000 of startup costs, spreading the rest over 180 months?
  - (b) Does a year-1 Schedule C loss offset my wages, and what records support a profit motive under §183?
  - (c) Do I materially participate for the QBI deduction and the $400 minimum?
  - Claude keeps a "businesslike conduct" folder (this plan, scorecards, pricing and kill-rule decisions) as evidence.

**G2-16. Retirement plan for business profit (decide by early December 2026).**
- **Why:** For 2026, Solo 401(k) deferrals share one $24,500 §402(g) limit with any 403(b) deferrals, while a governmental 457(b) has its own separate limit. Over-deferring creates an excess that must be corrected. No finance file mentions this. [via search: IRS limits summaries]
- **Question:** "Should AlphaPlay adopt a SEP-IRA or Solo 401(k)? How do its limits interact with my 403(b)/457(b) deferrals, and what are the setup and funding deadlines for 2026 and 2027?" Once the accountant decides, add a retirement-contribution line (an owner draw) to the workbook.

---

## 5. For employment counsel only (add to legal/FOR-EMPLOYMENT-COUNSEL.md exactly as written, with no business analysis)

**G2-25. Two neutral questions (before launch).**
1. "The business will be run by scheduled software under my personal accounts, and each automated action is logged with a timestamp. Is there anything about when those runs are scheduled, or which account they run under, that I should know before setting them up?"
2. "Public records (USPTO trademark filings, Maryland SDAT records, and marketplace seller-identity disclosures) may connect my name to AlphaPlay LLC and Play Before Pixels. Does that matter for my employment, and should anything about how those records are filed or signed be handled differently?"
- Hold any step that depends on the answers until counsel responds.

---

## Already covered (dropped this round)

| Candidate gap | Why dropped / where covered |
|---|---|
| Google scaled-content-abuse risk from automated articles and translations | At 1–2 articles a week it's speculative. ROUTINE 3b and MARKETING-PLAYBOOK forbid unreviewed machine translations, and DECISION-MEMO sets canonical URLs. The Search Console manual-action check was folded into G2-01. |
| Repo filling up with binaries | Measured: the largest PDF is 2.0 MB, far below GitHub's limits. The off-GitHub backup was merged into G2-04. |
| Health coverage through a spouse; self-employed health deduction | Nothing in the repo mentions a spouse, and an employer plan likely rules out the deduction. |
| Household income-based programs (student loans, FAFSA, state credits) | Assumes facts not in the files. |
| What a spouse must sign or know | Assumes a spouse. No personal guarantees: PROTECTION-PLAN row 1. Home office: money-and-tax §13 Q9. Successor: BLIND-SPOTS #20. |
| Making the business sellable | Speculative before launch. Owned ISBNs are already in storefront-setup-guide.md. |
| Standalone founder time cap | Merged into G2-07. The "add a store only under 2 hours a week" rule is BLIND-SPOTS #2. |
| Separate cash-flow calendar | Merged into G2-10. Payout timing: money-and-tax §3. Cushion: BLIND-SPOTS #20 and ROUTINE. Etsy reserve figures corrected to about 30% rolling for up to 45 days. |
| Second chargeback gap | Merged into G2-12. |
| Etsy AI disclosure in general | storefront-setup-guide.md ("AI-assisted artwork must be disclosed"). The per-channel fields were merged into G2-08. |
| YouTube "made for kids" | storefront-setup-guide.md, Google/YouTube section. |
| /press page | Conflicts with "press waits for counsel" (MARKETING-PLAYBOOK, BLIND-SPOTS #15, gate line 14). Holding statements: BLIND-SPOTS #7. |
| Etsy Offsite Ads becoming mandatory above $10k | Already in the money-and-tax §3 fees table. |
| Etsy API rate limits | Not a constraint at a few listings a week. |
| Commercial resident agent, WHOIS privacy | PROTECTION-PLAN rows 2 and §5; legal/domain-portfolio.md. |
| Shopify card-statement descriptor | TRUST-CHECKLIST #17. Only PayPal is added, in G2-22. |
| Resend-my-download page, phone and tablet download help, printing tips | BRAND.md "Answers already included" and customer-service macros. G2-17 keeps only file size, low-ink, print permission and the phone tester. |
| One calm public reply, founder approves it, never ask for a review change | customer-service macros #36. G2-20 keeps only Etsy timing and lock, Amazon, pile-ons and the CRFA. |

## Changes made in this pass
- `ops/ROUTINE.md`:
  - start-of-run guard, lock, branch, credentials and maintenance mode (§0);
  - web content treated as data (§1);
  - channel editions and large print (§2);
  - panel additions;
  - verified approvals, publish ledger, read-back and comment rules (§5);
  - new §5b weekly inbound batch (refunds and chargebacks, reviews, privacy, comments, group-order checks);
  - heartbeat, run log, backup and new scorecard lines (§6);
  - 13-week cash forecast in the monthly close;
  - founder time cap and price-floor tests;
  - two new Never lines.
- `ops/COMPLIANCE-GATE.md`: new lines 16–22 (channel editions, AI-disclosure fields, prices, delivery and printing, accessible printables, written promises, reviews).

## Still to do (one-time edits not made here)
- Rewrite `ops/SECRETS.md` (G2-05).
- Add the BRAND.md channel exception (G2-09).
- Update the CLAUDE.md commit line once CI is live (G2-04).
- Build the Worker, the CI check and `ops/FULL-STOP.md` (G2-01, G2-03, G2-04).
- Add the workbook tabs (G2-10, G2-11).
- Write the four SOPs (G2-12, G2-13, G2-20, G2-24).
- Edit the policies (G2-19).
- Change the pricing wording in QUEUE, DEMAND-CHECK and CAMPAIGN-BIBLE (G2-11).
- Add the accountant questions to money-and-tax §13 (G2-14 to G2-16).
- Add the counsel questions to FOR-EMPLOYMENT-COUNSEL.md (G2-25).
- Write `ops/moderation-words.md` (G2-21).

## Sources
- Claude Code routines docs: https://code.claude.com/docs/en/routines
- Claude usage credits: https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans
- Shopify legacy custom apps: https://changelog.shopify.com/posts/legacy-custom-apps-can-t-be-created-after-january-1-2026
- Pinterest OAuth: https://developers.pinterest.com/docs/api/v5/oauth-token/
- TikTok Content Posting API: https://developers.tiktok.com/docs/en/content-sharing-guidelines
- Etsy review replies: https://help.etsy.com/hc/en-us/articles/115015808588-What-to-Do-if-You-Receive-a-Negative-Review
- Etsy Star Seller: https://help.etsy.com/hc/en-us/articles/4403058372503-What-is-the-Star-Seller-Badge
- Etsy Payment Account Reserve: https://help.etsy.com/hc/en-us/articles/360058722214-What-is-a-Payment-Account-Reserve
- Etsy fees policy: https://www.etsy.com/legal/fees/
- Etsy AI and "Designed by": https://www.etsy.com/seller-handbook/article/1275449912004
- TpT content guidelines: https://help.teacherspayteachers.com/hc/en-us/articles/360042626931-TPT-Content-Guidelines
- KDP AI disclosure: https://authorsguild.org/news/amazons-new-disclosure-policy-for-ai-generated-book-content-is-a-welcome-first-step/
- Former-price rule: https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-233
- Shopify chargebacks (secondary): https://chargebacks911.com/chargeback-types/shopify-chargebacks/shopify-chargeback-fee/
- FBI purchase-order scam: https://www.fbi.gov/news/stories/purchase-order-scam-leaves-a-trail-of-victims
- Shopify erasure change: https://shopify.dev/changelog/updated-handling-of-customer-data-erasure-requests-with-recent-orders
- INFORM Act: https://www.ftc.gov/business-guidance/resources/INFORMAct
- USPTO email masking: https://www.uspto.gov/subscription-center/2020/owner-email-address-field-now-masked-teas-and-teasi-documents-tsdr
- IRS Pub. 505: https://www.irs.gov/publications/p505
- QBI under OBBBA: https://www.foster.com/larry-s-tax-law/one-big-beautiful-bill-act-part-4-qualified-business-income-deduction-code-section-199a
- 2026 deferral limits: https://www.plantemoran.com/explore-our-thinking/insight/2025/11/2026-retirement-plans-limitations-summary
- WCAG use of color: https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html
