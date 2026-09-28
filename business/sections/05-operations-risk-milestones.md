# 5. Operations, team, legal summary, risks, KPIs and milestones

*Play Before Pixels, a trade name of AlphaPlay LLC (Maryland). Founder and sole member: Arielle Fleisher. Section 5 of the expansion business plan. Draft for the founder, September 28, 2026. Internal planning file, not for publication.*

**How to read this section.** Figures taken from repository files name the file beside them. Anything the business has not observed is marked in one of two ways:
- **[VERIFY]** marks an outside fact from general knowledge. Web search was not available for this draft. Confirm it on a primary source before money is spent or anything is signed. Where a source file already calls a figure "unverified", this section keeps that label.
- **(assumption)** marks a planning input chosen here, such as a threshold or a target. Replace it with real data once the data exists.

Questions that touch the founder's employment are not analyzed here. They go only to her own employment counsel through `legal/FOR-EMPLOYMENT-COUNSEL.md`. This section names the holds those questions create and nothing more.

---

## 5.0 Summary

- **The team is software plus contractors.** Scheduled Claude Code routines do the daily work: research, building, compliance checks, publishing through official APIs, customer email, bookkeeping and deadline tracking (`ops/ROUTINE.md`). Paid specialists do what software must not do or cannot do: human illustration, SLP accuracy review, sensitivity reads, translation, legal work, accounting, insurance, lab testing and, from Wave 3, warehousing. The founder approves and signs. She does not build, post, pack, ship, call or appear.
- **The operating design is written but not yet built.** The rules, the routine, the compliance gate and the SOPs exist. The safety systems that let the routines publish unattended do not exist yet: the verified approval channel, the heartbeat and watchdog, the publish ledger, the CI check, the full-stop card, the comment word lists and the suppression list (`ops/GAPS-ROUND-2.md` "Still to do"). All six `listing.json` files leave `ai_disclosure` and `price_floor` blank, so every one of them fails compliance-gate lines 17 and 18 today.
- **Two legal dates dominate the next six months.** Copyright filings should go in before about November 11, 2026, ahead of the likely fee increase. The ALPHAPLAY Statement of Use or extension (Serial No. 99650345) is due **March 8, 2027**, with an internal filing target of February 1 (`legal/protection/PROTECTION-PLAN.md` §6b, §9).
- **The critical-path blocker is banking.** AlphaPlay LLC's business checking account is closed (`finance/BANKING.md`). No platform can pay out until a new account exists, so nothing else in this section can start producing money before it.
- **The biggest risks are reputation and dependency.** A single overstated line about screens and autism, a platform account action, or a policy change on AI-made content could each hurt the business faster than any competitor could. The mitigations are mostly rules the routine already follows. Their weak point is that the enforcement machinery has not yet been built.
- **Growth is gated, not scheduled.** The 24-month table in 5.12 moves to each wave only when written conditions are true. School-facing work is a separate track that opens only if employment counsel clears it. The plan works without it.

---

## 5.1 The operating model in one table

| Work | Who does it | How the founder is involved |
|---|---|---|
| Market and demand research, queue ranking | Weekly research routine (Sundays 1:52 p.m. ET) | None |
| Product building, reviews, customer panel | Daily studio routine (9:47 a.m. ET) | Optional authorship rewrites on flagship titles (5.2) |
| Compliance check of every public item | Routine, against `ops/COMPLIANCE-GATE.md`; a CI check once built | Answers "needs founder" items in the weekly batch |
| Publishing to the site, Shopify, Etsy, Pinterest, email and the social scheduler | Routine, through official APIs only | None once the item is approved |
| Uploads with no API (KDP, IngramSpark, TpT) | Routine prepares packets in `ops/UPLOAD-PACKETS/` | Uploads them in batches, grouped for school breaks, until a contractor can be authorized (5.4) |
| Customer email, refunds, reviews, privacy requests | Automatic emails, FAQ, saved replies; the weekly inbound batch (`ops/ROUTINE.md` §5b) | Approves exceptions only |
| Printing and shipping | KDP, IngramSpark, the POD partner; a 3PL from Wave 3 | None |
| Payouts, tax reserve, bookkeeping | Bank rules, QuickBooks Online, Link My Books; routine's monthly close | Once-a-year payment scheduling; signs returns |
| Legal, tax, insurance, safety testing | Attorneys, accountant, broker, lab (5.4) | Signs |
| Deadlines | Routine keeps `ops/DEADLINES.md` and prepares each filing 30 days ahead | Signs or approves the filing |
| Strategy | Monthly plan update and quarterly review (`ops/ROUTINE.md`, "Living business plan"); decisions logged in `business/DECISIONS.md` | Receives one line: "Plan update: …" |

The founder's reports stay money-only: daily sales, month-to-date and estimated profit, plus any approval lines (`ops/ROUTINE.md`, "Founder updates = money"). The full weekly scorecard (5.11) is written to the run log and the scorecard file, not to her report.

---

## 5.2 The founder's role: approvals and signatures

The target is zero daily tasks and at most 60 minutes of approvals a week (`ops/ROUTINE.md`, "Founder time cap"). The weekly SOP aims lower, at 10 minutes (`operations/SOPs/weekly.md`).

**What only she can do, by law or by platform rule** (`ops/AUTOFIX.md`, "Never automatic"; `commerce/PAYMENTS.md`):
1. **Sign.** Contracts (as "AlphaPlay LLC d/b/a Play Before Pixels, By: Arielle Fleisher, Member"), trademark and copyright filings, tax returns, a Children's Product Certificate if counsel says AlphaPlay is the certifier, and 3PL, rep or distributor agreements.
2. **Verify identity and banking** once per platform, and accept new platform terms.
3. **Create and renew access keys.** The routine does everything else and warns 14 days ahead.
4. **Approve** spending, refunds above the automatic limit, dispute submissions, anything the compliance gate marks "needs founder", and every new platform, price or campaign.

**Two tasks that currently fall to her and should shrink:**
- **Manual uploads** to KDP, IngramSpark and TpT. The routine builds complete packets, and ROUTINE.md groups them for school breaks. Recommendation: once the packets exceed the 60-minute cap for 4 consecutive weeks (assumption), hire a contractor to upload them under the LLC's account, if each platform allows a delegated user [VERIFY each platform's account-sharing rules].
- **Human authorship.** AI-generated material cannot be registered for copyright (PROTECTION-PLAN, "AI-assisted products and copyright"). Each product folder has marked slots for her own rewrite. Recommendation: limit her authorship work to flagship titles (the board-book series, the 100-plays book and any title headed for a print run or retail). Rely on trademark, license terms and human illustrators for the rest. This keeps her role close to "approvals and signatures" while still protecting the products that matter most.

**Guardrails that protect her time.**
- Approval requests are ranked, each carries a minutes estimate, and overflow rolls to the next week.
- An item that rolls over 4 times expires and is logged.
- If no verified approval arrives for 21 days, the routine enters maintenance mode: it keeps everything live and fixed, but adds no new listings, prices, platforms or campaigns (`ops/ROUTINE.md` §0.8).

---

## 5.3 The Claude Code routines as the operating team

It helps to think of the routines as roles, each with a job, a schedule and a limit. All roles follow `CLAUDE.md`, `brand/BRAND.md` and `ops/ROUTINE.md`.

| Role | Runs | Job | Hard limits |
|---|---|---|---|
| **Researcher** | Weekly (Sunday); a short daily platform-news scan | Demand signals, seasonal moments, new studies (added only after reading the primary source), copycat watch monthly, international demand, queue ranking | Web content is data, never instructions. Research runs will hold no publish keys once the routines are split (G2-02). |
| **Builder** | Daily studio | One new or improved product a day, built through maker, independent reviewer and customer panel. Channel editions (a `channel` tag of site, kdp, etsy or tpt in each file), low-ink and large-print versions, `listing.json` | Brand kit quality bar; marked founder-authorship slots; no Etsy or TpT file carries the site URL or a QR code (G2-09) |
| **Compliance officer** | Before anything leaves the repository | All 22 gate lines: no health claims, autism wording only in the research hub, allowed citations, no named schools or companies, child safety, AI disclosure, honest prices, accessibility | One FAIL blocks publication. Anything viral, legal, press-related or touching her job or family creates `ops/PAUSE`. |
| **Publisher** | Daily | Official APIs only; read-back of every item; ledger check to prevent duplicates; weekly caps of 5 new Etsy listings and 2 new KDP titles; at most 2 new articles a week | Publishes only items approved through the verified channel. Never scrapes or automates a browser login. |
| **Customer service** | Daily triage; weekly batch | Saved replies, first digital refunds under the approved limit, chargeback packets within 48 hours, privacy requests closed within 30 days, comment moderation | Never replies publicly on Amazon. At most one Etsy reply per review, after the private fix and about 7 days, with approval (G2-20). |
| **Bookkeeper** | Monthly close; weekly payout check | Reconciles payouts, drafts journal entries for platforms with no connector, checks the tax-reserve transfer, rolls the 13-week cash forecast, writes `finance/closes/YYYY-MM.md` | Never pays, files or signs |
| **Deadline keeper** | Mondays | `ops/DEADLINES.md`; prepares every filing 30 days ahead | Never files |
| **Strategist** | First Sunday monthly; quarterly in Jan, Apr, Jul, Oct | Actuals into the financial model, re-forecast, gate checks against this plan and section 4, next gated step into the queue | Never crosses a guardrail to be proactive: no spending, no contacting people, no new platforms |

**One scheduling conflict to settle.** `ops/MONITORING.md` has the studio build one product per day. The publish limits (5 Etsy listings and 2 KDP titles a week) and the 60-minute approval cap will hold back far fewer items than that. Building ahead is harmless, but the queue of built, unapproved items will grow. Recommendation: the studio alternates new builds with improvements to live products whenever more than 10 built items are waiting for approval (assumption).

**Where the model runs into platform limits** (from `ops/GAPS-ROUND-2.md`, whose sources are Claude Code's routine documentation):
- A routine turns itself off after 72 hours without a GitHub connection.
- A paused subscription stops all routines.
- A green run status does not prove the task succeeded.

This is why the heartbeat and the outside watchdog (G2-01) belong on the launch checklist and are not optional extras.

---

## 5.4 Contractors

Every contractor is engaged in writing and paid by the LLC. None requires a call or meeting with the founder; engagements run by email, portal and e-signature. Every creative or review contractor signs `legal/protection/freelancer-work-for-hire-and-ip-assignment.md` before work starts. That template covers the assignment to AlphaPlay LLC, a moral-rights waiver, an originality and AI-use warranty, and confidentiality with the DTSA notice. California creators sign an assignment only (PROTECTION-PLAN §3). No contractor, tester or reviewer is recruited from the founder's school system, and the outreach exclusion list in `CLAUDE.md` applies to hiring as well (`legal/international-plan.md` §8.1).

| Contractor | When | Scope | Cost (source) |
|---|---|---|---|
| **Illustrator** | Before the board-book print order (Wave 3); later for other flagship titles | Human art for print-run books, using the AI drafts as the brief. Source files delivered. | $1,500–$5,000 per board book (BLIND-SPOTS #17); lawyer review of the template $300–$700 |
| **SLP accuracy reviewer** (CCC-SLP) | Before the *Up! Go! More!*, 100-plays and Reset launches | Flat-fee accuracy review of the talk tips. Credited only with written permission and exact wording ("Reviewed for accuracy by …"), disclosed as paid, never presented as the author | $200–$500 flat (BLIND-SPOTS #10) |
| **Sensitivity readers** (1–2 autistic readers) | Before the research hub, homepage and founder story go live | Respect and framing review | $150–$600 (BLIND-SPOTS #10) |
| **Tradition reviewers** | Before any Ramadan, Lent, Hanukkah or Shabbat countdown calendar | Sign-off from a paid reviewer from each tradition | Not priced in the source files; quote needed (assumption) |
| **Translators and post-editors** | Spanish months 4–9; French and German months 9–18 if Spanish meets its targets | AI draft plus a full human post-edit for site and printables; native transcreation for books and card prompts; legal pages reviewed by a lawyer licensed in the market | About $0.07 a word post-edited; $200–$800 per title transcreated; about $5,000 for the Spanish starter set (mixed); $500–$1,500 legal review per market (`legal/international-plan.md` §8.2, unverified) |
| **Trademark attorney** | Now | PLAY BEFORE PIXELS clearance and filing; ALPHAPLAY Statement of Use or extension; attorney of record to take the founder's personal email off the public record (G2-22) | Clearance about $500–$2,500 per name (DECISION-MEMO, unverified); ALPHAPLAY work $300–$1,000 (BLIND-SPOTS #9) |
| **Business and IP attorney** | Now | Operating agreement with a successor or designee, IP assignment (after employment counsel answers ownership question 2), template review, copyright filing order | $500–$2,000 for the operating agreement and assignment (PROTECTION-PLAN, unverified) |
| **Consumer and privacy attorney** | Before launch | Flat review of all policy pages; cookie decision; EU withdrawal button; Art. 27 representative decision | About $500–$2,000 (DECISION-MEMO, estimate) |
| **Product-safety attorney** | Before any 0–3 book or card deck is printed | CPSIA status of books and the deck; who certifies (PROTECTION-PLAN question 9); EU, UK, Canada and Australia toy classification | $300–$1,500 plus testing (DECISION-MEMO, unverified) |
| **Employment counsel** (the founder's own) | Now | Every item in `legal/FOR-EMPLOYMENT-COUNSEL.md`. Gates launch scope, trademark filings and all G1 and G2 work. | Not in the source files |
| **Accountant (CPA)** | Before the first platform tax interview | Tax classification and which TIN goes on W-9s; tax-reserve %; estimated payments or extra withholding (G2-14); startup costs, hobby-loss and QBI questions (G2-15); retirement plan by early December 2026 (G2-16); Maryland sales-tax treatment of digital goods | Not in the source files; quote needed (assumption) |
| **Insurance broker** | Before the first sale | GL with products-completed operations first; reassess E&O now that coaching is gone; media liability; cyber; umbrella; a quote at big-box retailer limits for later | See 5.8 |
| **CPSC-accepted lab** | Wave 3 | Third-party testing for the board book; the deck if it is marketed to children | A few hundred dollars per SKU (PROTECTION-PLAN, unverified) |
| **Upload assistant** (optional) | When manual uploads exceed the founder's cap (5.2) | KDP, IngramSpark and TpT uploads from the prepared packets | Not priced; assumption: hourly, a few hours a month |

**Paying contractors.** Pay by the business card where possible. The processor then reports the payment on a 1099-K; otherwise the LLC may owe a 1099-NEC (`finance/money-and-tax-setup.md` §2, §8, unverified; the accountant confirms).

---

## 5.5 Fulfillment partners and the 3PL

**Today:** no inventory anywhere. Digital files deliver themselves. KDP, IngramSpark and one POD partner print and ship. Nothing is ever held at the founder's home (`brand/BRAND.md`).

**The first stocked product** is the *Up! Go! More!* board book. It is printed offset only if its pre-sale funds the run, and it is delivered straight to a third-party warehouse (section 2.3, Wave 3). Amazon FBA is the alternative for Amazon orders.

**3PL selection criteria** (assumption unless cited):
1. Onboarding and support by email and portal, with no calls required.
2. An API or scheduled export for stock levels, orders and shipments, so the routine can watch reorder points without logging in through a browser.
3. Integrations with Shopify, Amazon (multi-channel or FBA prep) and, later, Faire.
4. The ability to print or apply CPSIA tracking labels and keep lot records, so a recall can be traced.
5. Returns, damaged goods and buyer samples go back to the 3PL or out to a rep, never to the founder's address.
6. EDI capability, or a partner EDI provider, for the retail stages in section 4 [VERIFY per 3PL].
7. Pricing quoted in writing for receiving, storage, pick and pack, and minimums [VERIFY with quotes].

**When the 3PL is chosen:** alongside the printer quotes in January 2027, so the funding goal includes receiving and storage.

---

## 5.6 Systems map

```
                         FOUNDER
     approvals (verified channel)  ·  signatures  ·  key creation  ·  batched uploads
                              |
                              v
+---------------------------------------------------------------------------------+
| CLAUDE CODE ROUTINES (AlphaPlay-only account; no personal connectors)            |
| daily check 6:38 ET · daily studio 9:47 ET · weekly research Sun 1:52 ET         |
| start guards: PAUSE file · connector guard · run lock · fresh tokens             |
|   research --> build --> customer panel --> COMPLIANCE GATE --> CI check*        |
|                                                     | pass + verified approval*  |
+-----------------------------------------------------|---------------------------+
      | git (source of truth: private GitHub repo)    |
      | weekly bundle backup* ------------------------+---> write-only storage*
      v                                               v
+-------------------------+     +------------------------------------------------+
| APPROVAL + TOKEN WORKER*|     | PUBLISH (official APIs; ledger check*; read-back)|
| Cloudflare Access, OTP  |     | Cloudflare Pages site · Shopify · Etsy ·          |
| to business email;      |     | Pinterest · social scheduler · email platform ·   |
| refreshes Pinterest and |     | POD partner · merchant of record                  |
| Etsy tokens             |     | UPLOAD PACKETS for KDP · IngramSpark · TpT        |
+-------------------------+     +------------------------------------------------+
                                                      |
                                                      v
   BUYERS --> storefronts --> instant download / POD / KDP / IngramSpark / 3PL (Wave 3)
                                                      |
                                                      v
   PAYOUTS --> business checking (NOT YET OPEN) --> tax-reserve sub-account (bank rule)
                                  |
   costs --> one business card <--+ paid in full monthly
                                  |
   bank + card feeds, Link My Books --> QuickBooks Online --> accountant (read-only)
   routine monthly close --> finance/closes/YYYY-MM.md, 13-week cash forecast

   WATCHERS OUTSIDE CLAUDE: uptime monitor (site, shop, checkout) · heartbeat
   watchdog* (alert if heartbeat > 8 days old or 0 published while approved items wait)
   · business-mailbox filter that pushes platform notices with deadlines to her phone

   * = specified in ops/GAPS-ROUND-2.md or ops/ROUTINE.md, not yet built
```

**Status of the parts (September 28, 2026):**

| Component | Status | Source |
|---|---|---|
| Rules, routine, compliance gate, autofix policy, SOPs, customer-service macros | Written | `ops/`, `operations/` |
| Routine schedule | Set by the founder | `ops/MONITORING.md` |
| Business checking account | **Closed; a new one is needed** | `finance/BANKING.md` |
| Verified approval channel (Worker) and token broker | Not built | G2-03, G2-05 |
| Heartbeat file and outside watchdog | Not built (`ops/HEARTBEAT.json` absent) | G2-01 |
| Publish ledger | Not built (`ops/PUBLISHED.json` absent) | G2-08 |
| CI check and branch protection | Not built (no `.github` folder) | G2-04 |
| Full-stop card | Not written (`ops/FULL-STOP.md` absent) | G2-04 |
| Comment word lists; suppression list | Not written | G2-21; MARKETING-PLAYBOOK |
| `ops/SECRETS.md` | Out of date: describes a Shopify token method no longer available for new apps | G2-05 |
| Separate AlphaPlay-only Claude account | Not done; this account has Gmail, Drive and Calendar connected | G2-02 |
| Spending caps (usage credits, ad accounts, virtual card) | Not set | G2-06 |
| Four new SOPs (refunds and disputes, school-order fraud checks, reviews, privacy requests) | Not written | G2-12, G2-13, G2-20, G2-24 |

**Rule for switching the routines on to publish:** the first six rows marked "not built" or "not done" above, plus the spending caps, must be finished first. Research and building can run now, because they publish nothing.

---

## 5.7 Record gaps that break the business's own rules

These are small fixes, but each one would fail the compliance gate or contradict a binding rule. The routine can make all of them. The founder approves the policy wording.

1. **Listing records.** All six `listing.json` files have a blank `ai_disclosure` and a blank `price_floor`, and five of the six lack `amazon_route`. This fails gate lines 17 and 18 and the Amazon-edition rule.
2. **Reply promises.** `operations/AUTOMATION-MAP.md` still says there is "always a 2-business-day promise". The policy drafts carry the same promise, which the weekly batch cannot keep. Change them to the approved wording in gate line 21 (G2-19).
3. **Coaching remnants.** `legal/COACHING-WORKSHOP-TERMS.md`, `legal/protection/coaching-agreement.md`, `legal/protection/workshop-agreement.md` and the coaching mentions in the privacy policy, terms and refund policy describe services the business no longer offers. Retire them, or turn the workshop terms into a license for host-it-yourself kits.
4. **Outreach drafts.** `marketing/virtual-autism-outreach.md` contains an audio podcast pitch. That conflicts with the no-direct-contact rule of September 28, 2026 (`brand/BRAND.md`). Retire the pitch and keep the written listing requests.
5. **Site copy.** The outreach checklist lists four `index.html` fixes that must happen before any outreach: the implied recovery claim, the autism-named hub title, the link to an autism-named domain, and the "book a speaker" offer.
6. **Group payment terms.** `commerce/PAYMENTS.md` still offers net-30 without the fraud checks in G2-13. This is moot until counsel clears group sales, but fix it before that track opens.
7. **Commit rule.** `CLAUDE.md` says "push to `main`". Change it once the CI check and branch protection are live.

---

## 5.8 Legal and compliance summary

This summary points to the source files and adds nothing new. It is not legal advice.

### Entity and trade name
- **Owner:** AlphaPlay LLC, a Maryland LLC with a single member. It uses its existing EIN. "Play Before Pixels" is its trade name, and no new LLC is needed (`legal/ENTITY.md`).
- **Trade name:** register with SDAT for **$25** ($50 expedited). It lasts 5 years, and the renewal window is the last 6 months. The repository does not record it as filed, and banks may ask for it (`finance/BANKING.md`). A trade name gives no trademark rights.
- **Good standing:** confirm the LLC's status on the SDAT search. The annual report and personal property return cost **$300** and are due **April 15, 2027** (reminders March 1 and April 1).
- **Addresses:** a USPS PO Box for everything public, and the home address only where a street address is legally required (ENTITY.md). The principal office and resident agent cannot be a PO Box or a mail-rental address. A commercial resident agent costs about $50–$300 a year (unverified). Marketplace seller-identity fields must never show the home address or a personal phone (G2-23).
- **Operating agreement:** refresh it with separateness covenants, indemnification, and a successor or designee in case of incapacity (PROTECTION-PLAN §1). Then a written IP assignment from Arielle to the LLC, after employment counsel answers the ownership question.
- **Separateness:** one business account, one business card, owner draws recorded as draws, no personal guarantees. BOI reporting is no longer required for U.S. entities (PROTECTION-PLAN §1).

### Trademarks
| Mark | Status | Next step and deadline | Cost |
|---|---|---|---|
| **ALPHAPLAY**, SN 99650345, classes 9, 16, 25, 28, 41 (spelling and literacy), intent-to-use | Notice of Allowance September 8, 2026. Pinnies were never made. | Statement of Use for goods genuinely sold, or an extension, by **March 8, 2027**. Internal targets: goods inventory by January 15, filing by February 1. The use plan is "ALPHAPLAY Spelling Games, from Play Before Pixels", on sale by mid-January. That product is G1 and raises counsel question 7, so counsel must answer before the sworn filing. Outside date for any SOU: about September 8, 2029. File the change of address now, and move the correspondence email off the founder's personal address (G2-22). | SOU $150 per class claimed; extension $125 per class, $625 with all 5 classes |
| **PLAY BEFORE PIXELS** | Not filed. Rated medium risk as a descriptive, informational phrase (DECISION-MEMO). No clearance search has been run. | Knockout search, then attorney clearance, then file classes 16 and 41 in AlphaPlay LLC's name. Add class 28 before any retail card deck. Show "A Play Before Pixels Book" on at least two titles (series rule). Use ™, never ® until registered. Foreign filings within 6 months of the U.S. filing date. Madrid only once the U.S. application looks safe. | $700 for 16 + 41, plus clearance of about $500–$2,500 |
| Slogans | "Pencils before pixels" held; "Childhood can't wait. Screens can." and "Paper first" to be cleared first | Treat all slogans as marketing copy, not marks | — |

### Copyright and authorship
- AI-generated material is not registrable. Register only the human-authored parts, with AI material disclaimed, and never describe AI material as human-made in a filing or on KDP (PROTECTION-PLAN, AI section; gate line 8).
- File ready works **before about November 11, 2026**, ahead of the likely fee increase. After that, register each work within 3 months of publication to keep statutory damages available.
- Bowker ISBNs: 10 for $295, publisher AlphaPlay LLC. Free KDP ISBNs are not used.

### Insurance (none bought yet)
| Policy | Specification | Cost (PROTECTION-PLAN §2) | When |
|---|---|---|---|
| General liability with products-completed operations | $1M per occurrence / $2M aggregate, occurrence-based, deductible $10,000 or less, insurer rated A- or better, global claims handling; names AlphaPlay LLC and Arielle as member | About $542 a year average (range about $260 to $3,000+) | Before the first sale |
| Media liability / publisher's E&O | Defamation, copyright and trademark claims from books, site, research hub and social posts | Unverified | Before launch |
| Professional liability / E&O | Written for coaching, which the business no longer offers. Ask the broker whether the written course and research hub still need it, or whether media liability covers them. | About $744 a year average | Decide with the broker |
| Cyber | Breach response and third-party claims | About $420–$1,552 a year | Before launch |
| Umbrella or excess | Above the GL limits; also closes the gap to retailer limits later | A few hundred dollars a year for $1M (unverified) | Within 90 days |

Platform triggers: Amazon Seller Central requires a certificate of insurance within 30 days of any month with gross proceeds above **$10,000**. Faire+ requires a current certificate at $1M/$2M.

### Policies and consumer law
- Pages: privacy, terms, shipping-returns-refunds, affiliate and endorsement disclosure, accessibility statement, medical and educational disclaimer. All need the coaching wording removed and an attorney's flat review (about $500–$2,000). The contracting party is "AlphaPlay LLC d/b/a Play Before Pixels".
- **FTC:** health claims need competent and reliable evidence, so the business makes none. Affiliate disclosure goes next to each link. The fake-reviews rule allows penalties of up to $53,088 per violation (DECISION-MEMO, unverified). "Was" prices follow 16 CFR 233.1. Reviews are never restricted (Consumer Review Fairness Act). The pre-sale follows the mail-order rule (ship by the promised date, or notify buyers and offer a refund).
- **Subscriptions** (Wave 4): clear terms, express consent, online cancellation as easy as sign-up, and renewal reminders (ROSCA and state auto-renewal laws).
- **EU and UK buyers:** a withdrawal waiver checkbox for instant digital access, and from June 19, 2026 an online "withdraw from contract" function in the EU (unverified). Handled by the merchant of record where possible.

### Product safety
- House safety rules on every activity: supervision; no small parts under 3; no balloons under 8; no cords long enough to wrap a neck; supervised water play; no choking foods (`brand/BRAND.md` rule 4).
- **CPSIA:** books for children 3 and under are outside the ordinary-book exemption. The board book needs third-party testing, a Children's Product Certificate and tracking labels. Card decks and merch aimed at children 12 and under are children's products. Merch launches in adult sizes only. CPSC eFiling applies to imported children's products from July 8, 2026 (DECISION-MEMO, unverified scope).
- **EU GPSR:** physical goods reach the EU only through marketplaces that cover the responsible-person role, or through a hired responsible person at about €100–€600 a year (unverified). Until then, physical listings do not ship to the EU.
- A written recall and complaint plan is part of retail readiness (section 4.5, item 13). Recommendation: draft it before the board book ships, not before retail.

### Privacy
- The site is directed to adults (COPPA). No child accounts and no child names; email sign-up asks only for the child's birth month and year.
- Maryland PIPA: reasonable security, and breach notice within 45 days, with the Maryland Attorney General notified before consumers. Maryland's MODPA thresholds (35,000 Maryland consumers) are unlikely to apply soon.
- CAN-SPAM and CASL: double opt-in, the PO Box in every footer, and opt-outs honored within 10 business days.
- GDPR and UK GDPR: decide on EU and UK Art. 27 representatives (about €100–€600 a year each, unverified) before the first EU- or UK-targeted campaign.
- Access and deletion requests are closed within 30 days across every connected system, with a hashed suppression entry (G2-24).

### Tax
- Marketplaces and the merchant of record collect sales tax and VAT on their sales. AlphaPlay files Maryland sales tax for own-site sales, 6% on goods and digital products. The accountant decides how the 3% IT and data tax applies (DECISION-MEMO, unverified).
- A tax reserve of a fixed percentage of each deposit, set by the accountant (25–30% is a common rule of thumb). Federal and Maryland estimates are scheduled once a year, or replaced by extra paycheck withholding if the accountant prefers (G2-14).
- The quarterly routine checks each state's economic-nexus threshold and international sales by country.

---

## 5.9 Risk register

Likelihood and impact are this plan's judgment (assumption), rated H, M or L. "Signal" is what the routine watches for. "Owner" is who acts: R = routine, F = founder, A = attorney or accountant, C = employment counsel.

| # | Risk | L / I | Signal | Mitigation | Owner |
|---|---|---|---|---|---|
| 1 | **Platform dependency.** An Etsy, Amazon or KDP account action, fee change or payout hold cuts income. Etsy holds new sellers' funds for 14 days and can add a rolling reserve of about 30% for up to 45 days. KDP pays about 60 days after month end. | H / H | Policy-warning emails; listing suppressions; a reserve notice; one channel above 60% of monthly revenue (assumption) | Own site plus the email list as the path back from every sale; a separate edition per channel so no marketplace rule is broken; the daily platform-news scan; the publish ledger and weekly caps to avoid duplicate-listing flags; the business-mailbox filter for notices with deadlines; a new channel only under the 2.8 rule | R; F approves |
| 2 | **AI-content policy change.** KDP, Etsy, Google or payment processors tighten rules on AI-generated books, art or pages, or require new disclosure. | M / H | Platform-news log; a KDP or Etsy notice; a Search Console manual action | Truthful `ai_disclosure` on every channel (blank today; fix first); human illustrators for flagship books; founder rewrites on flagship text; at most 2 articles a week and 5 Etsy listings a week; reviewed translations only; an optional "How we make things" page | R; F approves wording |
| 3 | **Trademark refusal of PLAY BEFORE PIXELS** as descriptive or informational, or a conflicting prior mark | M / H | Clearance opinion; USPTO office action about 4.5 months after filing | Attorney clearance before filing; use the name as a brand (imprint, spine, header), not only as a message; file 16 and 41 first; no retail packaging printed before clearance; Madrid only after the U.S. outcome is clear; ALPHAPLAY kept alive as a second house mark; puddlefort.com held as the named fallback brand until clearance | A; F signs |
| 4 | **ALPHAPLAY abandonment** if nothing is filed by March 8, 2027, or a filing claims goods not truly sold | M / M | No real ALPHAPLAY sale by mid-January | Spelling Games on sale by mid-January with dated records and real specimens; if not, an extension ($625 for 5 classes); the attorney deletes unused goods; the routine prepares the packet by February 1 | R; A; F signs |
| 5 | **Reputational damage around "virtual autism"** from an overstated line, a critic's screenshot or a pile-on | M / H | Spike in comments or mentions; a critical post; review pile-on | The term appears only on research-hub pages with the safe framing sentence; the hub gets a non-medical name; no autism keywords on any product, listing or ad; paid SLP and sensitivity reads; comments off on hub posts; reply once, kindly, with sources, and fix the copy first if we overstated; holding statements prepared; `ops/PAUSE` for anything viral; the four `index.html` fixes before any outreach | R; F approves replies |
| 6 | **Intersection with the founder's employment.** Business activity, public records or group sales raise questions only her employment counsel can answer. | M / H | Any item touching schools, her role, her employer or public records of her name | Every such question goes only to counsel. G1 and G2 products are built but unpublished until counsel answers. The outreach exclusion list and suppression list are checked before every batch. Nothing she made for or used in her teaching is sold. Nothing about her employment or legal matters is published. Any touch creates `ops/PAUSE`. | C; F |
| 7 | **Key person unavailable** (illness, family needs, work demands) and approvals stop | M / H | No verified approval in 21 days | Maintenance mode after 21 days keeps the business running without growth; successor or designee in the operating agreement; a durable power of attorney for business and digital accounts ($500–$1,500, BLIND-SPOTS #20); password-manager emergency kit; attorney of record on trademarks; accountant with read-only access; a one-page "if I'm unavailable" sheet; monthly export of the email list and sales | F once; A |
| 8 | **Cash-flow squeeze.** Peak costs fall in October and November while payouts lag. The pre-sale and later a retail order must be paid before revenue arrives. | M / M | 13-week forecast below the 3-month reserve target; owner money in above her cap | Pre-sale funds the print run (printing, shipping, duties, fees, delivery and a 15% buffer); a household-money cap and review date written down by the founder; a usage-credit cap (for example $25 a month) and ad-account limits; one virtual card for tools; the tax reserve kept separate; chargeback packets within 48 hours ($15 Shopify fee per chargeback, unverified) | R; F sets caps |
| 9 | **Copycats** reproduce listings, printables or art. AI-made material may not be protected by copyright. | H / M | Monthly copycat watch; Google Alerts; reverse-image search | Trademark first; license terms bind buyers; the notice line and embedded CMI in every file; buyer-stamped PDFs where supported; platform IP portals set up in advance; the escalation ladder from report to DMCA notice to the Copyright Claims Board ($100 total); speed and series depth as the practical moat. Never file without her approval. | R; F approves; A |
| 10 | **Automation failure or misuse.** The routine stops silently, a key expires, a web page injects instructions, or a bad run marks its own approvals. | M / H | Missing heartbeat; published count of 0 while approved items wait; token expiry within 14 days | Heartbeat plus outside watchdog; verified approval channel the routine cannot write to; AlphaPlay-only account with no personal connectors; research and publish split; run lock; CI check; weekly backup; full-stop card | R; F once |
| 11 | **Product-safety incident or non-compliant physical product** | L / H | Customer safety report; failed lab test | Adult-only merch; CPSIA testing, CPC and tracking labels before the board book sells; the deck's target age decided before printing; activity safety rules in every product; a recall plan with lot tracing at the 3PL; GL insurance before the first sale | R; A; F signs CPC |
| 12 | **Compliance drift in automated content** (a health claim, a named company, a banned citation) | M / H | Gate FAIL rate; CI banned-word hits; monthly spot check of 5 random pins, ads and emails | Compliance gate on every item; CI banned-word check; only the allowed citations; "linked with", never "causes" | R |
| 13 | **Founder overload** from too many channels or approvals | M / M | Approvals above 60 minutes a week for 3 weeks; items rolling over | Ranked, capped approvals; a new channel only when the last one takes under 2 hours a week; upload assistant (5.4); stop adding scope before adding hours | R; F |
| 14 | **Banking or payout blocked** because no business account exists | H now / H | Any platform setup step that needs a payout account | Open a no-fee, no-minimum business account first; add the trade name to it; set up a tax-reserve sub-account | F |

**The two early-warning numbers that matter most:** the heartbeat age (risk 10) and the approval backlog in minutes (risks 7 and 13). If either goes red, growth stops and the routine protects what is already live.

---

## 5.10 Key performance indicators

Targets come from the source files where they exist. Where the files set none, the plan says so and sets the target after real data arrives, instead of guessing.

| Area | KPI | Target or rule | Source |
|---|---|---|---|
| **Money** | Net revenue per month vs. plan | Budget on the Low case: about $5,050 net in year one, roughly $420 a month. Target the Base case: about $15,750, roughly $1,310 a month. Monthly figures derived from section 1.5. | Section 1.5 |
| | Profit after fees, costs and refunds | Positive by product within 8 weeks, or cut or fixed | `ops/ROUTINE.md` §6 |
| | Net per unit vs. `price_floor`, by channel | Never below the floor | Gate line 18 |
| | Landed cost vs. retail (physical) | 35–40% or less for own channels; 20% or less for any chain product (assumption, section 4); wholesale at least 2× landed cost | DEMAND-CHECK rule 9; quarterly SOP |
| | Cash vs. reserve | 3 months of costs in the business account (BLIND-SPOTS says 2–3) | ROUTINE §6; BLIND-SPOTS #20 |
| | Tool and ad spend vs. cap; owner money in vs. cap | At or under the caps she sets | G2-06, G2-10 |
| **Customers and list** | Opt-in rate on lead pages | Above 25% | MARKETING-PLAYBOOK |
| | Cost per subscriber on paid tests | Under $2 | MARKETING-PLAYBOOK |
| | Email sign-ups per sale, by channel (QR scan rate) | Set after 8 weeks of Wave 1 data (assumption) | Section 2.6 |
| | Repeat-order rate by first product | Set after 90 days of data | Section 4.7 |
| **Conversion and ads** | Site conversion | 1.5–3% (working target) | MARKETING-PLAYBOOK |
| | Ad set CAC | Cut when CAC stays above 1.5× first-order gross margin after spending 2× target CAC; one paid test at a time | MARKETING-PLAYBOOK |
| **Products** | Sales per listing | At least 5 in 60 days after SEO fixes, or reprice once and then fold into a bundle | `ops/QUEUE.md` kill rule |
| | Refund rate; dispute rate | Refunds under 3% of orders; disputes under 0.5% (both assumptions; card networks are commonly said to watch rates near 1% [VERIFY]) | G2-12 scorecard line |
| | Ratings on the lead physical SKU | 50+ at 4.5 stars by R2; 150+ by R3; 300+ by R4 (assumptions) | Section 4.9 |
| **Stocked goods** (Wave 3 on) | Return and defect rate; on-time complete shipping | Under 3%; 98% or more (assumptions) | Section 4.7 |
| **Operations health** | Heartbeat age | Every scheduled run writes one; alert at 8 days | G2-01 |
| | Content scheduled ahead | 8 weeks of approved posts, pins and emails | ROUTINE, "Be proactive" |
| | Publish limits | At most 5 new Etsy listings and 2 new KDP titles a week; at most 2 new articles a week | ROUTINE §5, search-quality rule |
| | Compliance | Zero public items without a full gate PASS | Gate |
| | Response and privacy | Chargeback packet within 48 hours; privacy requests closed within 30 days; opt-outs within 10 business days | ROUTINE §5b; CAN-SPAM |
| **Founder load** | Approval minutes a week | 60 or less (10 is the SOP aim) | ROUTINE; weekly SOP |
| | Time on the newest channel | Under 2 hours a week before another channel is added | BLIND-SPOTS #2; section 2.8 |
| | Revenue per founder hour | Tracked; no target in the files | MARKETING-PLAYBOOK |

**What is not a KPI here:** follower counts, posting volume and article counts. The business is faceless and product-led, and Google's scaled-content policy punishes volume for its own sake (`ops/ROUTINE.md`, "Search quality over quantity").

---

## 5.11 The weekly scorecard

The routine writes it every Monday, once sales data is connected, to `business/scorecards/YYYY-Www.md` (recommended location) and at the top of that run's log. The founder's own report shows only the money lines, as her standing instruction requires.

```
PLAY BEFORE PIXELS · WEEKLY SCORECARD · week of YYYY-MM-DD
Data connected: [list]   Estimated (late-reporting): KDP ~60d, IngramSpark ~90d

MONEY
  Revenue this week / month to date / plan pace (Low | Base)
  Profit after fees, costs, refunds            this week / MTD
  By channel: site · Etsy · KDP · IngramSpark · MoR · other
  Top 3 and bottom 3 products (revenue, profit, units)
  Any product below price_floor on any channel
  Cash in business account vs 3-month reserve target
  Tax reserve moved this week (and any deposit that missed the rule)
  Tool + ad cost vs cap      Owner money in vs cap

CUSTOMERS
  New subscribers (by source, by age band)     Opt-in rate by lead page
  Conversion rate     Average order value     Sign-ups per sale by channel
  Refunds and disputes (rate by product)       Reviews received (none incentivized)

OPERATIONS
  Runs completed / scheduled     Heartbeat age     Items published (read back OK)
  Gate: items passed / failed / needs founder
  Approvals waiting (minutes)  · rolled over  · expired
  Credential health (tokens expiring within 14 days)
  Content scheduled ahead (weeks)    Platform notices with a response date

GATES
  Next gate (5.12): conditions met / not met
  Kill-rule and 8-week-upkeep candidates

KEEP DOING: ...
STOP DOING: ...
TRY NEXT (one test): ...
```

Any exceeded cap becomes one line in `ops/APPROVALS.md` (ROUTINE §6). The monthly run adds the retail proof pack recommended in section 4.7.

---

## 5.12 Twenty-four-month milestones and gates (October 2026 to September 2028)

Dates are assumptions built on the wave dates in section 2.3 and the retail stages in section 4.9. A gate is passed only when **every** condition is true. The routine checks gates in the monthly plan update and moves the next step into `ops/QUEUE.md` only when a gate is met. If a gate slips, what follows it slips too. Nothing spends money without a line approved in `ops/APPROVALS.md`.

### Main track

| When | Wave / stage | Milestones | Gate to pass before moving on |
|---|---|---|---|
| **Oct 2026** (month 1) | Foundations | New business bank account and tax-reserve sub-account; trade name filed; PO Box; business email; counsel questions sent; AlphaPlay-only routine account; spending caps; policies corrected (5.7) and sent for review; GL insurance quoted; `listing.json` gaps fixed; trademark knockout search | **Gate A, open for business:** bank account open and connected; employment counsel's go-ahead for the G0 launch; privacy policy and PO Box live; GL insurance bound before the first physical sale; heartbeat, watchdog, verified approval channel and connector guard working before the routine publishes anything |
| **Oct–Dec 2026** (months 1–3) | Wave 1 | Launch-first five (routine cards and bored cards by Oct 18; Family Kit and 100-plays PDF by Oct 31; busy book and paperback by Nov 13); holiday gift bundle by Oct 31; copyright filings before Nov 11; ALPHAPLAY product chosen by Nov 30; accountant decisions (retirement plan by early December); G1 answer requested for mid-December | **Gate B, Wave 1 working (by Jan 1, 2027):** first monthly close reconciles every payout; at least 4 consecutive weeks of clean heartbeats; approvals held within 60 minutes a week for 4 weeks; every live listing passed the gate; kill rule applied to any listing under 5 sales in 60 days |
| **Jan 2027** (month 4) | Wave 2 | 30-Day Screen Reset public launch (Dec 26); ALPHAPLAY Spelling Games on sale by mid-January if G1 clears; merchant of record live for English-speaking markets (`ops/INTERNATIONAL.md` Region 2); IngramSpark titles; PLAY BEFORE PIXELS filed after clearance; board-book and 3PL quotes requested at 500, 1,000, 2,500 and 5,000 copies | **Gate C, ready to commit to a print run (by about Feb 1, 2027):** ALPHAPLAY Statement of Use or extension filed; quotes show a landed cost at or below $4.55–$5.20 for the $12.99 book; product-safety counsel has said who certifies; illustrator contract signed; the 13-week forecast covers any deposit without exceeding the owner-money cap |
| **Feb–Jun 2027** (months 5–9) | Wave 3 | Board-book pre-sale Feb–Apr; human illustration; lab testing; 3PL signed; Spanish starter set (about $5,000 mixed, months 4–9); Screen-Free Week campaign; POD Play & Talk deck if the $7 printable has sold; Amazon Merch application | **Gate D, place the print order:** pre-sale meets its funding goal (printing, shipping, duties, about 8–10% fees, delivery and a 15% buffer); order size = pre-sold units plus 30–50%; recall plan written. **R1 (section 4), stocked product live, about Jul 2027:** stock at the 3PL; CPC and tracking labels done; first 30 days shipped with no safety complaint |
| **Jul–Dec 2027** (months 10–15) | Wave 4 | Community editions that monthly research supports; Faire (US and Canada); rep-group test in independent stores; Walmart Marketplace application; subscription stage kit; French and German starter sets only if Spanish meets its targets; Amazon insurance certificate if any month tops $10,000 | **Gate E, subscription launch:** at least 6 months of monthly-printable email data by age band; cancellation flow tested; subscription terms reviewed. **Gate F, next language:** Spanish pages reach traffic and sales targets set at the April 2027 quarterly review (assumption). **R2, wholesale proven, about Dec 2027:** 90+ days of stocked sales; lead SKU 4.5 stars with 50+ ratings; first independent-store reorders; retail cost rule met at a quoted run size |
| **Jan–Jun 2028** (months 16–21) | Retail stage 3: online big-box | Walmart Marketplace live; board books 2 and 3; card deck in retail packaging if the POD deck sold; GS1 barcodes and class 28 filing for the deck; insurance quote at retailer limits | **R3, big-box online proven:** 6+ months live on at least one big-box website; return rate under 3%; on-time shipping 98%+; 150+ ratings on the lead SKU |
| **Jul–Sep 2028** (months 22–24) | Retail stage 4: representation | Written approaches to distributors and chain-focused reps using the proof pack; attorney reviews each agreement; EDI tested with the 3PL; order-funding plan approved | **R4, representation signed:** 12 months of stocked sales; three-book series live; 300+ ratings at 4.5+; reorder rate 30%+; the agreement names the rep or distributor as the face of the account, with the founder in writing only. The buyer pitch (R5) follows in the second half of 2028. |

**Stop points.** At Gate C, if no quote meets the landed-cost rule, the board book stays a POD paperback and Wave 3 runs digital-only. At R2 and R4, the right answer may be "stay here". Direct sales, Amazon and wholesale are profitable at our prices, and chain retail is not required for the business to succeed (section 4.9).

### Conditional track: school- and group-facing products (G2)

| Step | Condition | Earliest timing |
|---|---|---|
| **Gate S, cleared to sell to groups** | Employment counsel answers the listed questions in writing and allows it. The exclusion and suppression lists exist and are checked by the routine. The purchasing kit is built: quote form, W-9 on request, PO and invoice, license tiers and an automated license stamper. The G2-13 fraud checks are in `operations/SOPs/school-orders.md`. | TpT listings by December 15, 2026 for the January window, only if every condition is met by then. Otherwise the August 2027 back-to-school season. |
| Launch | Classroom products, the host-it-yourself parent-night kit, child-care editions and licenses at the prices in section 2.3 | After Gate S |
| Retail and library extension | School and library jobbers, educational-supply retailers | After Gate S and R1 |

If counsel does not clear this track, it stays closed. The bottom-up plan in section 1.5 excludes all group revenue, so the main track does not depend on it. Even if cleared, three limits remain: nothing the founder made for or used in her teaching is sold; no one on the outreach exclusion list is contacted, listed or targeted; and no rep or distributor agreement may include those organizations as accounts.

### Fixed dates inside the window
| Date | Item |
|---|---|
| Nov 11, 2026 | Last day to file ready copyright applications before the likely fee increase |
| Nov 27, 2026 | Black Friday |
| Jan 15, 2027 | Q4 estimated tax; ALPHAPLAY goods inventory |
| Feb 1, 2027 | Internal ALPHAPLAY filing target; accountant's year-end packet |
| Mar 8, 2027 | ALPHAPLAY Statement of Use or extension due |
| Apr 15, 2027 and 2028 | Maryland annual report ($300) |
| U.S. filing date + 6 months | Last day for foreign PLAY BEFORE PIXELS filings with priority |
| Quarterly (Jan, Apr, Jul, Oct) | Strategy review; decisions logged in `business/DECISIONS.md` |

---

## 5.13 Decisions this section needs from the founder

1. **Open the new business bank account** with a tax-reserve sub-account. Everything that earns money waits on it.
2. **Approve the build list for switching the routines on to publish:** a separate AlphaPlay-only Claude account, spending caps, the approval Worker, the heartbeat watchdog, the publish ledger, CI with branch protection, and the full-stop card (5.6).
3. **Write down two numbers:** the most household money she will put into the business, with a review date (G2-10), and the automatic refund limit (about $15 is suggested in G2-12).
4. **Confirm the scope of her authorship work:** rewrites on flagship titles only, with trademark, license terms and human illustrators protecting the rest (5.2).
5. **Engage the professionals by email:** the trademark attorney now (ALPHAPLAY and PLAY BEFORE PIXELS clearance); the business and IP attorney (operating agreement with a successor, then the IP assignment); the accountant before any platform tax interview; the insurance broker for GL before the first sale.
6. **Set up continuity:** a durable power of attorney for business and digital accounts, and a password-manager emergency kit (risk 7).
7. **Approve the record fixes in 5.7:** listing fields, reply promises, coaching remnants, the podcast pitch and the four `index.html` lines.
8. **Adopt the gates in 5.12** as the rule for moving between waves. The routine then checks them monthly and reports "Plan update: …" in one line each quarter.
