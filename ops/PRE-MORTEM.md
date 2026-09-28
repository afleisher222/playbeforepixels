# Pre-mortem: how Play Before Pixels could stumble by late 2027, and what protects it

_Written September 28, 2026 from four review lenses: platforms and automation, demand and economics, reputation and community, and legal and the founder. Duplicate risks across lenses are merged. Every "Protection today" reference was checked against the repository on September 28, 2026 at about 04:00 UTC. A file or section is cited only if it exists. Anything that comes from general knowledge and not from a file read today is marked UNVERIFIED and listed under "Needs a live check" at the end._

## How to read this

- **What a pre-mortem is.** We imagine it is late 2027 and the business has struggled, then ask what most likely caused it. None of this has happened. It is a list of things to close off early, while doing so is cheap.
- **The overall picture is good.** The plan already names almost every risk below somewhere. The common weakness is that most protections are rules the model is asked to follow, not checks a machine runs. Most of the fixes turn a rule into a check, and Claude can build them.
- **Scores** are likelihood (1 = rare, 5 = expected unless something changes) × impact (1 = small, 5 = threatens the business or you personally). The highest possible is 25. Where lenses were merged, the higher rating is kept.
  - 20–25: act this week.
  - 12–16: before launch or the first sale.
  - 10 or less: keep on the list.
- **Owners:** Claude routine (a scheduled run does it every time) · Claude now (a build session makes the change once) · founder once (a setting or decision only you can make) · counsel · accountant. "Owner workflow" marks changes to `products/`, `brand/`, `content/` or `site-concepts/`. Other workflows own those folders, so the change goes to them as a request.
- **Signals** have IDs (A1, X1, D1 …). They are defined once, in "Signals for ops/MONITORING.md".

## The short version

1. **The repository is still public.** It was rechecked at 04:02 UTC on September 28, 2026: public, 0 forks, 0 stars, default branch `main`. Making it private is a 5-minute click that only you can do (Top fix 1). Everything else on this list is easier once it is done.
2. **The business cannot yet see itself.** Your report is money-only by design, so $0 on a quiet day looks the same as $0 from broken automation, a shop no one can find, a held payout or a storm of criticism. Several fixes add a few fixed, calm lines to the report for exactly those cases.
3. **Platform keys will expire.** There is no token broker yet, so connected platforms would slowly slide back to manual "upload packets".
4. **Nothing checks the files themselves** (PDFs, print files) before they reach buyers or printers.
5. **Four pending decisions carry a lot of risk,** and together they take about 20 minutes of your time: how far the brand goes with "virtual autism" in year one, the routine-card search words, how research-hub sign-ups are emailed, and the reviewer budget. (`ops/APPROVALS.md` estimates three of them at 10, 5 and 3 minutes; the "virtual autism" line is new.) A fifth pending line, approving the SITE-SAFE CUT of the founder story (about 5 minutes), belongs in the same sitting.
6. **Only 1 of the 5 Wave 1 launch products passes the listing check today.** `ops/TESTS/check_listings.py`, re-run at 04:20 UTC, FAILs 15 of 17 listing records; of the `ops/LAUNCH-NOW.md` Wave 1 five, only "I'm Bored" Play Cards passes (risks 10, 11, 30).

Your part of the Top 10 is about 25 minutes plus sending one packet to counsel. Everything else is Claude's work.

## Ranked list

| # | Risk | L | I | Score | Merged from |
|---|---|---|---|---|---|
| 1 | The public repository exposes the founder and gives the products away | 5 | 5 | **25** | legal, reputation |
| 2 | The routines stop, or run "green" while doing nothing, and nobody notices | 4 | 5 | **20** | platforms |
| 3 | The Etsy shop stays invisible, and nothing can see that it is invisible | 4 | 5 | **20** | demand |
| 4 | The "virtual autism" hub becomes the brand's public identity | 4 | 5 | **20** | reputation (2) |
| 5 | Platform keys expire and each platform slides back to upload packets nobody uploads | 5 | 4 | **20** | platforms |
| 6 | Your name and address are one public-records step from every product | 4 | 4 | 16 | legal |
| 7 | A routine uploads a broken or unfinished download | 4 | 4 | 16 | platforms |
| 8 | Early low reviews and unanswered buyer messages are seen too late | 4 | 4 | 16 | reputation (2) |
| 9 | No reputation early warning, while 8 weeks of scheduled posts keep going out | 4 | 4 | 16 | reputation |
| 10 | AI-made books and art trigger an "AI slop" and hypocrisy backlash | 4 | 4 | 16 | reputation |
| 11 | The holiday window is missed | 4 | 4 | 16 | demand |
| 12 | Too many products and no hero | 4 | 4 | 16 | demand |
| 13 | Pinterest, the main traffic channel, is suspended or never gets going | 4 | 4 | 16 | platforms, demand |
| 14 | Print books bounce at KDP or IngramSpark, a rights check is missed, or print quality disappoints | 4 | 4 | 16 | platforms (2) |
| 15 | The business goes live, or school-facing, before employment counsel clears it | 3 | 5 | 15 | legal |
| 16 | Etsy holds or suspends the shop, and the routine makes it worse | 3 | 5 | 15 | platforms |
| 17 | Payout holds and verification freezes go unseen | 3 | 4 | 12 | platforms |
| 18 | Meta's real-identity rules collide with the faceless setup | 3 | 4 | 12 | platforms |
| 19 | An automated post breaks a hard rule | 3 | 4 | 12 | platforms |
| 20 | The personalized-book print job quietly stops | 3 | 4 | 12 | platforms |
| 21 | The heroes lose the side-by-side comparison in Etsy search results | 3 | 4 | 12 | demand |
| 22 | Visual Routine Cards sit on autism-adjacent search terms | 3 | 4 | 12 | demand, reputation |
| 23 | The screen-free message reads as shaming, privileged or ableist | 3 | 4 | 12 | reputation (2) |
| 24 | Moderation silences critics | 3 | 4 | 12 | reputation |
| 25 | Children's product-safety paperwork is missing (CPSIA, EU GPSR) | 3 | 4 | 12 | legal |
| 26 | No insurance bound, or the wrong insurance, when a claim arrives | 3 | 4 | 12 | legal |
| 27 | The LLC shield weakens | 3 | 4 | 12 | legal |
| 28 | The research hub feeds the sales funnel, and the overall impression is a health claim | 3 | 4 | 12 | legal, reputation |
| 29 | PLAY BEFORE PIXELS is refused, opposed or squatted | 3 | 4 | 12 | legal |
| 30 | A wrong or non-compliant price goes live, and prices drift across channels | 4 | 3 | 12 | platforms |
| 31 | The plan rests on unconfirmed rules, and nothing notices when rules change | 4 | 3 | 12 | platforms, legal |
| 32 | Copycats clone the best sellers, and thin copyright leaves little recourse | 4 | 3 | 12 | demand, legal |
| 33 | SEO never contributes | 4 | 3 | 12 | demand |
| 34 | Every sale is rented: Etsy buyers never reach the email list | 4 | 3 | 12 | demand |
| 35 | Teachers, SLPs and OTs doubt a faceless, uncredentialed brand | 4 | 3 | 12 | reputation |
| 36 | Personal material leaks into the business through skills or connectors | 2 | 5 | 10 | legal |
| 37 | A usage limit cuts a run off mid-publish in Q4 | 3 | 3 | 9 | platforms |
| 38 | Low prices and creeping fees eat the margin | 3 | 3 | 9 | demand |
| 39 | The privacy policy and other public promises don't match what the business does | 3 | 3 | 9 | legal, reputation |
| 40 | Tax and VAT exposure from sales abroad and missed filings | 3 | 3 | 9 | legal |
| 41 | Card testing, disputes, and a refund rule that contradicts the policy | 2 | 4 | 8 | demand |
| 42 | The KDP paperback flops quietly | 4 | 2 | 8 | demand |
| 43 | API access is stuck at a trial tier, so "posted" content stays private | 4 | 2 | 8 | platforms |
| 44 | The "never run out" rule swaps a discontinued merch blank for a wrong one | 2 | 3 | 6 | platforms |
| 45 | Free content cannibalizes the paid collections | 2 | 3 | 6 | demand |
| 46 | The ALPHAPLAY application is abandoned on March 8, 2027, or a rushed filing is void | 2 | 3 | 6 | legal |
| 47 | Reviews, testimonials or subscriptions break FTC rules | 2 | 3 | 6 | legal |

---

## The risks in detail

### 1. The public repository exposes the founder and gives the products away · 25 (5 × 5)
- **Story:** The repository stays public, and sometime in 2027 a critic, a copycat or someone from your working life reads who you are, the internal plans and every sellable file. The "anonymous founder" premise ends in a day.
- **Early warning:** the GitHub API says the repository is public, or someone outside has forked or starred it (X1–X2); a personal detail shows up in a tracked file (X3); an internal page is reachable on the live site (X4). Rechecked 2026-09-28 04:02 UTC: public, 0 forks, 0 stars.
- **Protection today:**
  - `ops/APPROVALS.md`: the "PENDING · URGENT" line to make the repository private.
  - `ops/CLOUD-RUNBOOK.md`: one-time setup steps 1–2, open risk #1 (files that describe you) and open risk #14 (the Pages output folder).
  - `CLAUDE.md`: never publish anything about your legal matters, your children or your employer.
- **Gap:**
  - The fix is one manual click, with no deadline and no alarm, and no run checks visibility.
  - Git history, any clones and search caches keep what was exposed.
  - `ops/LAUNCH-NOW.md` Wave 0 has no "repository private" step.
  - The outreach-exclusion names are in plain text in 29 tracked text files, not only the two test scripts: `CLAUDE.md`, `ops/ROUTINE.md` "Never", `brand/BRAND.md` hard rule 2, `ops/QUEUE.md`, `ops/EXPERIMENTS.md`, the growth and revenue plans, `legal/protection/` agreements and 9 files in `marketing/templates/` (recounted 04:25 UTC). `check_listings.py` also lists nearby place names in its local-angle pattern.
  - `legal/ENTITY.md` (the USPTO section) records the street address of the retired mailbox.
  - Internal files are written as though nobody outside will ever read them.
- **Fix:**
  1. [founder once] Confirm the Claude GitHub App has access, then make the repository private (`ops/CLOUD-RUNBOOK.md` setup steps 1–2). About 5 minutes.
  2. [Claude now] Add `ops/TESTS/check_exposure.py` (X1–X4). It runs at a new `ops/ROUTINE.md` step 0.9 and in CI, and writes an `exposure` field to `ops/HEARTBEAT.json`. A red result creates `ops/PAUSE` and becomes the first line of your report. That is an explicit exception to "Founder updates = money".
  3. [Claude now] Add "repository is private" as `ops/LAUNCH-NOW.md` Wave 0 step 0 and as a row in `legal/LEGAL-LAUNCH-CHECKLIST.md`.
  4. [Claude now] Add a `CLAUDE.md` rule: no history rewrite, force-push or deletion of branches or files until employment counsel answers the records-preservation question. Counsel then decides on any history clean-up.
  5. [Claude now] Move the exclusion names out of the two scripts into an environment secret that the scripts read. That alone does not help much, because 27 other tracked files carry the same names (see Gap). Making the repository private (fix 1) is the real protection. After it, keep the names only in `CLAUDE.md`, the gate and the scripts' secret, and have the other files point to "the outreach exclusions in `CLAUDE.md`" without repeating them (owner-workflow request for `brand/`).
  6. [founder once] Decide whether `legal/FOR-EMPLOYMENT-COUNSEL.md` moves to counsel-only storage, leaving a one-line pointer.
  7. [Claude now] Write internal files as if they will be screenshotted (new `ops/LEAK-READINESS.md`):
     - give `marketing/AWARENESS-ENGINE.md` a mission-first title;
     - drop the "Critical (inferred)" labels on organizations in `marketing/virtual-autism-outreach.md`;
     - call simulated panels "QA checklists", never "reviews".
  8. [founder once, later] Move the repository to a neutrally named GitHub organization owned by AlphaPlay LLC, with routines committing as a bot.
  9. [counsel] Ask whether the period the repository was public calls for anything beyond making it private.

### 2. The routines stop, or run "green" while doing nothing, and nobody notices · 20 (4 × 5)
- **Story:** The GitHub connection lapses for 72 hours, or the shared Max allowance runs out, and the routines stop. Because your report is money-only, a stopped automation reads exactly like a quiet shop.
- **Early warning:** no heartbeat for 30 hours, repeated `limit`, `locked` or `failed` results, missing studio logs, no commits, nothing published while approvals wait (A1–A7).
- **Protection today:**
  - `ops/CLOUD-RUNBOOK.md`: "Max-plan facts this plan is built on" (the 72-hour rule; green status is not success), "Guardrails that keep it running without anyone watching", and open risks #5, #10 and #11.
  - `ops/ROUTINE.md`: step 0.1 (the limit path) and §6 (heartbeat).
  - The `ops/HEARTBEAT.json` template.
  - `business/sections/05-operations-risk-milestones.md` §5.9, risk 10.
- **Gap:**
  - Only the daily check reads the heartbeat, and the daily check is itself a routine that is currently off.
  - The outside check (G2-01) is not built: there is no `.github/` folder and no Worker.
  - A GitHub Actions watchdog would run only from the default branch, which is still `main`, while heartbeats land on `claude/live`.
  - Uptime alerts go to the business inbox, which no run can read (no `SUPPORT_MAILBOX_*` key).
  - *Added in verification:* the repository is growing fast enough to slow or break the nightly clone. GitHub's API reported a size of 2,486,102 KB (about 2.4 GB) at 04:26 UTC, against 1.09 GB measured in `ops/CLOUD-RUNBOOK.md` open risk #9 earlier the same night; the local pack is 2.14 GiB. Open risk #9's fixes (untrack ignored files, `unchanged_renders.py --restore`, partial clones) are not all in place yet. GitHub's size guidance is UNVERIFIED.
- **Fix:**
  1. [Claude now] Add `ops/watchdog/worker.js` and `wrangler.toml`: an hourly Cloudflare Worker cron.
     - It reads the raw `ops/HEARTBEAT.json` from `claude/live` with a read-only, fine-grained token.
     - It alerts the business address when A1–A5 cross a threshold, at most once per condition per day.
  2. [founder once] Set the default branch to `claude/live`. `ops/CLOUD-RUNBOOK.md` setup step 3 becomes required.
  3. [Claude now] Add one fixed line to every report under `ops/ROUTINE.md` "Founder updates = money": "Automation: OK", or "Automation: NOT OK since <date> (<reason>)". Then a $0 day can never hide a breakage.
  4. [Claude now] `ops/ROUTINE.md` step 0: read the last heartbeat and report if it is older than 30 hours (proposed in CLOUD-RUNBOOK open risk #5, not yet in ROUTINE).
  5. [Claude now] Finish CLOUD-RUNBOOK open risk #9 before the studio is switched back on, and add signal A12 (repository size).

### 3. The Etsy shop stays invisible, and nothing can see that it is invisible · 20 (4 × 5)
- **Story:**
  - The five launch products enter the most crowded printable searches with zero reviews.
  - They draw about 30 views per listing a month instead of the roughly 130 the experiments assume, so the experiments never reach a readout.
  - By March 31 the shop has fewer than 30 orders, while your report simply shows $0.
- **Early warning:** views per listing per day, 14 days with no orders, favorites per view, conversion per 100 visits (D1–D4).
- **Protection today:**
  - `marketing/DEMAND-CHECK.md` ("One honest warning").
  - `ops/EXPERIMENTS.md`: EXP-02, EXP-03 and §3 (daily snapshots).
  - `business/GROWTH-ENGINE.md` §3 Loop 2.
  - `ops/ROUTINE.md`:
    - "Growth engine loop jobs": a listing with views but no orders after 14 days gets one change;
    - the §6 scorecard growth-engine lines.
  - `business/STRESS-TEST.md` §9.
- **Gap:**
  - The measurement layer does not exist yet: there is no `ops/experiments/` folder and no `ops/TESTS/experiment_stats.py`.
  - `ops/SECRETS.md` grants Etsy "list and update" only, Pinterest "publish pins" only, and Shopify no analytics scope, so views and traffic cannot be read.
  - Nothing raises a zero-traffic alarm.
- **Fix:**
  1. [Claude now] Add read scopes to `ops/SECRETS.md` (exact scope names UNVERIFIED):
     - Etsy: listings, transactions and feedback read;
     - Pinterest: pins and user accounts read;
     - Shopify: reports or analytics read;
     - Cloudflare: analytics read.
  2. [Claude now] Build `ops/experiments/` and `ops/TESTS/experiment_stats.py` before launch day (G-day). `ops/EXPERIMENTS.md` §4 already requires them.
  3. [Claude now] Add `ops/DEMAND-ALARMS.md` (thresholds) and `ops/TESTS/demand_alarms.py`. The daily check runs the script and writes a `demand` block to the heartbeat.
  4. [Claude now] Add a rule to `ops/ROUTINE.md` §2. While any demand alarm is red:
     - the studio run is a "fix the hero" run: one EXP-02 or EXP-03 change;
     - your report carries one money-framed line: "Etsy: N views a day, 0 orders in 14 days; a fix is under way."

### 4. The "virtual autism" hub becomes the brand's public identity · 20 (4 × 5)
- **Story:**
  - A company called Play Before Pixels publishes a multilingual hub and weekly carousels about "virtual autism", and autistic self-advocates and clinicians read the publisher's name as the claim.
  - Comments being off reads as silencing.
  - Sites promising autism "recovery" link to the pages.
  - Professionals stop recommending the brand.
- **Early warning:** autism queries become a large share of search impressions, or any "recovery" query appears (R9); a hub post is shared unusually often (R2); error reports mentioning autism (R4); links from cure or recovery sites (R10).
- **Protection today:**
  - `brand/BRAND.md`: hard rule 3 and "Autism searches (binding)".
  - `ops/COMPLIANCE-GATE.md` lines 2, 13 and 15.
  - `marketing/AWARENESS-ENGINE.md` §5 and §10 (HF-01 to HF-18, enforced by `ops/TESTS/check_hub_firewall.py`).
  - `marketing/virtual-autism-outreach.md` §3–§4.
  - `ops/TESTS/autism-content-audit.md` §4 and §6.
  - `marketing/BRAND-RESPECT-PLAN.md` §4, "explain it once, then don't use it".
- **Gap:**
  - The wording on each page is well controlled, but the strategy is not settled. BRAND-RESPECT §4 (one explainer, then stop) contradicts AWARENESS-ENGINE, which builds a search and social engine on the term, and no decision line for this is in `ops/APPROVALS.md`.
  - The paid sensitivity reader is still pending.
  - The chosen site design still titles the hub "The Virtual Autism Project" and builds it inside the shop menus. This is wider than the research page: the retired name appears 21 times across 9 files of `site-concepts/winner/` (including the site-wide mega menu in `_tools/build.js`, which renders on every shop and product page, `_src/index.html`, and the built `index`, `shop`, `product`, `info` and `research` pages). `python3 ops/TESTS/check_hub_firewall.py --site site-concepts/winner --strict`, re-run at 04:22 UTC, returns an HF-15 FAIL. Audit items W1–W11 (not W1–W6) are open.
  - Nothing measures how the pages are received.
  - (Corrected in verification: audit items H1–H3 are no longer open. The hub pillar has no printable link, and the FAQ points to `/research/play-printable/`; commit 787f594, 03:22 UTC. The fix-later table in `ops/TESTS/autism-content-audit.md` §4 is stale.)
- **Fix:**
  1. [founder once] One decision line in `ops/APPROVALS.md`: adopt BRAND-RESPECT §4 for year one.
     - One public explainer.
     - The 75 study pages stay unpublished, or go out noindex, until a paid autistic reviewer and a clinician sign off.
     - The term carousels pause for year one.
     - The hub is shown as "Research Notes", with the brand mark in the footer only.
  2. [Claude now] Add HF-19 to `check_hub_firewall.py`: at most 3 published pages use the term, and no queue post mentions it unless a sign-off file names a real reviewer and a date.
  3. [Claude now] Add HF-20: a weekly Search Console read. Any impressions from "recovery" queries trigger a title or meta rewrite and a log entry, and the autism share of impressions alerts at 30% (R9).
  4. [owner workflow] Hub, site and content changes:
     - fold standalone pages on fringe terms into noindex glossary entries;
     - add a "What this page does not support" box that rejects cure and recovery claims;
     - apply W1–W11 in `site-concepts/`, then re-run the `--site --strict` check to 0 HF-15.
  5. [Claude now] Add a monthly backlink review against a denylist to `operations/SOPs/monthly.md` (R10).

### 5. Platform keys expire and each platform slides back to upload packets nobody uploads · 20 (5 × 4)
- **Story:**
  - With no token broker, the Etsy, Pinterest, TikTok, Google and Shopify tokens lapse, and AUTOFIX switches each platform to "upload packet" mode.
  - The key-renewal line rolls over four times and expires.
  - By spring 2027 two main channels are manual, and the money line is simply smaller.
- **Early warning:** a platform with no successful call in 24 hours, expiring tokens, a platform in fallback for more than 7 days, an old renewal line, 401 errors (K1–K5).
- **Protection today:**
  - `ops/ROUTINE.md` step 0.7 (fresh tokens each run; 14-day warning).
  - `ops/HEARTBEAT.json`: the `credentials` and `tokens_expiring` fields.
  - `ops/AUTOFIX.md`: "Fix automatically" (an expired key moves the platform to upload packets) and "Pause, fix what's safe" (renewal goes on your list).
  - `ops/CLOUD-RUNBOOK.md`: "API credentials" (the broker row says not built) and open risk #13.
  - `ops/GAPS-ROUND-2.md` G2-05.
- **Gap:**
  - There is no broker, and `ops/SECRETS.md` still lists `SHOPIFY_ADMIN_TOKEN`.
  - The fallback has no time limit and no status you can see.
  - Key renewals are not in the "always rank first" class of the founder time cap, so they can expire unread.
  - The yearly password rotation in `operations/SOPs/account-security.md` §5 could invalidate Meta Page tokens if it reaches the Meta admin login (UNVERIFIED).
- **Fix:**
  1. [Claude now] Build `ops/broker/`: a Cloudflare Worker with KV storage that holds the refresh tokens. It is the same Worker as the watchdog and the G2-03 approval channel. "Broker live" becomes a condition before any platform with expiring tokens is connected.
  2. [Claude now] `ops/ROUTINE.md` "Founder time cap": credential renewals rank with platform notices, and never roll over or expire.
  3. [Claude now] `ops/AUTOFIX.md`: after 14 days in fallback, your daily report adds "Etsy automation OFF since <date>" (or the platform concerned).
  4. [Claude now] Rewrite the Shopify row in `ops/SECRETS.md` (G2-05).
  5. [Claude now] `operations/SOPs/account-security.md`: after any password change, run the Meta token check (K6).

### 6. Your name and address are one public-records step from every product · 16 (4 × 4)
- **Story:** Even after the repository is private, several public records let a copycat you reported, or a critic, connect "a parent and educator" to your name and your job:
  - the LLC's state record;
  - the ALPHAPLAY trademark record;
  - DMCA notices signed in your name;
  - copyright registrations;
  - book bylines.
- **Early warning:** the monthly public-records sweep finds a new appearance of personal details (X5); a personal name in an outgoing template or byline (X3).
- **Protection today:**
  - `legal/ENTITY.md` (a PO Box for everything public).
  - `legal/protection/PROTECTION-PLAN.md`: §1 (a commercial resident agent) and §5 (privacy; people-search removals).
  - `ops/GAPS-ROUND-2.md` G2-22, G2-23 and G2-25.
  - `legal/protection/dmca-takedown-notice.md` pre-send checklist.
  - `CLAUDE.md` (the founder story stays anonymous).
- **Gap:**
  - The DMCA template still names you as the signer and has a phone field.
  - There is no byline rule for KDP, IngramSpark, Lulu, awards or copyright filings.
  - The principal-office choice is open. `legal/ENTITY.md` defaults it to your home address "unless a commercial resident agent's office is used instead", while PROTECTION-PLAN §1 recommends a commercial agent and asks whether the agent's office can also serve as the principal office. Neither records a decision.
  - The per-record list that G2-22 asks for was never made.
  - The trademark change of address has no date.
- **Fix:**
  1. [Claude now] Create `legal/PUBLIC-RECORDS.md` with columns: record, what it shows, who can see it, fix, last checked. Add a monthly sweep to `ops/ROUTINE.md` §1, next to the copycat watch.
  2. [Claude now] Change `legal/protection/dmca-takedown-notice.md` so the signer is "Authorized agent for AlphaPlay LLC" (the IP attorney or a paid DMCA agent), with a business email and no phone.
  3. [owner workflow, founder approval] Byline rule in `brand/BRAND.md`:
     - the public author credit everywhere is "Play Before Pixels";
     - your legal name appears only where the law requires it;
     - copyright filings use a pseudonymous-author registration if the attorney approves (UNVERIFIED).
  4. [counsel] Settle the principal-office address in favor of a commercial agent's office, if that qualifies.
  5. [Claude now] Put the trademark change of address in `ops/DEADLINES.md` with a hard date of 2026-10-31.
  6. Keep Kickstarter off the plan unless counsel approves it.

### 7. A routine uploads a broken or unfinished download · 16 (4 × 4)
- **Story:**
  - The studio "improves one existing product" on every run and re-uploads its files.
  - A file with "FOUNDER'S NOTE · PLACEHOLDER" in it, or an Etsy edition carrying a URL, goes live.
  - Buyers are stuck for a week, because complaints wait for the weekly batch.
- **Early warning:** the pre-upload file check fails (G1); the file on the platform differs from the ledger (P1); a digital order is unfulfilled after 1 hour (O1); refund or review text mentions "blank", "can't open" or "placeholder" (O9–O10).
- **Protection today:**
  - `ops/TESTS/print-preflight.md` (a manual, one-off report: 58 FAIL home-print files at first, 50 FAIL, 53 WARN and 11 PASS of 114 files in its 03:40 re-check).
  - `ops/COMPLIANCE-GATE.md` lines 16 (channel edition) and 19 (delivery and printing).
  - `ops/AUTOFIX.md` ("A product file a customer reports as broken").
  - `ops/PUBLISHED.json` (content hash).
  - `ops/GAPS-ROUND-2.md` G2-17.
- **Gap:**
  - No step checks the files themselves: `check_listings.py` reads only `listing.json`, and the §5 read-back only confirms that a listing is public.
  - The routine cannot read the support inbox (no `SUPPORT_MAILBOX_*` key).
- **Fix:**
  1. [Claude now] Add `ops/TESTS/check_files.py`, using PyMuPDF with the rules in G1.
  2. [Claude now] Run it in `ops/ROUTINE.md` §1 next to `check_listings.py`. A PASS stamp (file hash and date) is required before §5 publishing and before any upload packet is offered.
  3. [Claude routine] The daily check flags any digital order still unfulfilled after 1 hour (O1).
  4. [owner workflow] Fix the files that failed preflight in `etsy-upload/` and `downloads/`.

### 8. Early low reviews and unanswered buyer messages are seen too late · 16 (4 × 4)
- **Story:**
  - A buyer who can't open a PDF on a phone messages the shop and waits six days against a published "2 business days".
  - They leave one star and open a case.
  - The first ten reviews set the shop's conversion for months.
- **Early warning:** any new review at 3 stars or below, any Etsy case (R3); reply time against the published promise (R11); refund reasons (O10).
- **Protection today:**
  - `ops/ROUTINE.md` §5b "Reviews" (no public reply until the private fix is done and about 7 days have passed; a pile-on creates PAUSE).
  - `ops/COMPLIANCE-GATE.md` lines 21 (no promise faster than the weekly batch) and 22.
  - `operations/customer-service/macros.md`.
  - `ops/GAPS-ROUND-2.md` G2-19 and G2-20.
- **Gap:**
  - `operations/SOPs/reviews.md` and `operations/REVIEWS-AND-CRITICISM.md` do not exist.
  - `operations/customer-service/FAQ.md` lines 13 and 30, and macro 37 ("2 días hábiles"), still make the promise gate line 21 forbids.
  - Reviews are collected weekly, Etsy messages have no automated path, and a first 1-star review never reaches your report.
- **Fix:**
  1. [Claude now] Write `operations/SOPs/reviews.md`, combining G2-20 and BRAND-RESPECT §7.
  2. [Claude now] Change FAQ lines 13 and 30 and macro 37 to the gate-21 wording.
  3. [Claude routine] A daily "reputation pulse": pull new reviews from every connected channel. For any at 3 stars or below, draft the private fix the same day and add one line to your report.
  4. [founder once] Turn on an Etsy auto-reply that links START HERE and printing help (the feature is UNVERIFIED).
  5. [Claude now] Stage Etsy in `ops/LAUNCH-NOW.md` Wave 1: the two lowest-support products first, the rest after 2 weeks with no file-access complaints.

### 9. No reputation early warning, while 8 weeks of scheduled posts keep going out · 16 (4 × 4)
- **Story:**
  - A critique runs for three days on Threads, TikTok and Reddit, while the scheduler keeps publishing cheerful pins and a merch post into it.
  - You hear about it from someone else, while your report says "Nothing needs you."
- **Early warning:** this risk is the missing detector. See R1–R8.
- **Protection today:**
  - `ops/COMPLIANCE-GATE.md` line 14 (anything viral creates PAUSE).
  - `marketing/BLIND-SPOTS.md` #7 (pause switch, holding statements, alerts "later").
  - `ops/FULL-STOP.md` (API steps to unschedule queues).
  - `business/sections/05-operations-risk-milestones.md` §5.9, risk 5.
  - `marketing/AWARENESS-ENGINE.md` §4 (no reactive hub posts).
- **Gap:**
  - No file defines the reputation signals, thresholds or sources, and `ops/MONITORING.md` covers uptime only.
  - The three holding statements were never written.
  - Your report has no slot for a reputation alert.
  - "No reactive posts" covers hub posts, not the ordinary 8-week queue.
- **Fix:**
  1. [Claude now] Add `ops/REPUTATION-WATCH.md` (the R1–R8 thresholds), run by the daily check.
  2. [Claude now] Add `operations/customer-service/holding-statements.md`: three statements for you to approve, covering criticism of the term, AI art, and shame or privilege.
  3. [Claude now] `ops/ROUTINE.md` "Founder updates = money" allows one line: "Reputation alert: <one line>".
  4. [Claude now] Add a "quiet mode" rule to `ops/ROUTINE.md` §5. While an alert is open, queued posts are unscheduled through the `ops/FULL-STOP.md` API steps, and content already published stays up.
  5. [Claude now] Add the read-only monitoring hosts to `ops/cloud/allowed-domains.txt` (whether they can be reached is UNVERIFIED).

### 10. AI-made books and art trigger an "AI slop" and hypocrisy backlash · 16 (4 × 4)
- **Story:**
  - Picture books with AI-drawn art reach KDP within weeks, and a librarian or illustrator notices.
  - Reviews say "AI-generated, not disclosed".
  - "Play Before Pixels is made by pixels" sticks with exactly the audience the brand serves.
- **Early warning:** the AI word list hits in reviews, comments or refund reasons (R5); a platform notice mentions AI (R8).
- **Protection today:**
  - `brand/BRAND.md` "Human authorship (copyright) — binding".
  - `ops/COMPLIANCE-GATE.md` lines 8 and 17 (a blank `ai_disclosure` is a FAIL).
  - `operations/TRUST-CHECKLIST.md` #11.
  - `marketing/BLIND-SPOTS.md` #8 and #17.
  - `marketing/BRAND-RESPECT-PLAN.md` §12.
  - `ops/GAPS-ROUND-2.md` G2-20.
- **Gap:**
  - `ai_disclosure` is still missing in 7 of the 13 non-merch `listing.json` files (14 files in all; rechecked today: toddler-busy-book, guide-100-plays, board-up-go-more, picture-tablet-slept, picture-laps-not-apps, picture-more-talk-less-tap, first-phone-plan) and in all 3 merch-core entries. `check_listings.py` FAILs all 10 of these records. Two of them, the busy book and the 100 Plays PDF, are Wave 1 launch products.
  - What buyers see is undecided: `operations/customer-service/FAQ.md` line 27 still has the placeholder "[State honestly how illustrations are made …]".
  - A human illustrator is planned only for the later board-book print run.
  - There is no "Is this AI?" macro.
- **Fix:**
  1. [Claude now] Extend `ops/COMPLIANCE-GATE.md` line 17: a buyer-visible line on the product page and the book's copyright page, not just the platform flags.
  2. [Claude now] Publish a "How we make things" page before the first sale, and fill FAQ line 27.
  3. [founder once] Split the launch. Printables go in Wave 1. Picture and board books wait for your rewritten text and a decision on a human illustrator for the flagship titles.
  4. [Claude now] Add an honest, non-defensive "Is this made with AI?" macro to `operations/customer-service/macros.md`.
  5. [owner workflow] Fill every `ai_disclosure` field.

### 11. The holiday window is missed · 16 (4 × 4)
- **Story:**
  - Gate A items are still open on November 13, so Black Friday drops.
  - Maintenance mode then freezes the Winter Countdown and the December 26 course launch.
  - The first real selling season becomes November 2027. `business/STRESS-TEST.md` §2 puts each month of slip at about $1,300–$1,600 of year-1 profit.
- **Early warning:** open Gate A items against the days left; days since your last verified approval while a seasonal launch is close; seasonal products waiting for a proof (L1–L2).
- **Protection today:**
  - `business/GROWTH-ENGINE.md` §2a–§2d (critical path; the seven Gate A items; the slip rule; holiday deadlines).
  - `marketing/EVENTS-CAMPAIGN-PLAN.md`.
  - `ops/ROUTINE.md` "Be proactive" (deadlines 30 days early; seasonal products 6 weeks ahead).
  - `business/STRESS-TEST.md` §6.
- **Gap:**
  - `ops/DEADLINES.md`, the file the deadline check reads, lists only legal and tax dates. G-day, Oct 25, Nov 13, Dec 15 and Dec 26 are not there.
  - No tracker for Gate A is read by the routine.
  - Before launch, your money-only report cannot say "the holiday window closes in N days".
  - Maintenance mode (`ops/ROUTINE.md` step 0.8) has no carve-out for seasonal items you have already approved.
  - *Added in verification:* Gate A item 6 needs every launch item to pass the gate, and 4 of the 5 Wave 1 products fail `check_listings.py` today: Visual Routine Cards 5 FAIL (plus 5 on the Starter), Play-First Family Kit 5, Toddler Busy Book 6, 100 Screen-Free Plays 6. Only "I'm Bored" Play Cards passes. The FAILs: Etsy title, floor or per-channel net, and the first 160 characters on all four; readability on all but the Starter; no AlphaPlay LLC owner line (COMPLIANCE-GATE line 8) on the Family Kit, busy book, routine cards and Starter; a missing AI disclosure on the busy book and 100 Plays; Etsy tags on 100 Plays; and the Starter's $4.50 price (risk 30).
  - The two launch lists disagree: `ops/LAUNCH-NOW.md` Wave 1 includes the Play-First Family Kit, while `ops/QUEUE.md` "G-day week" lists the $29 Instant Gift Bundle and moves the Family Kit to week 2.
- **Fix:**
  1. [Claude now] Copy the GROWTH-ENGINE §2d dates into `ops/DEADLINES.md`, each with its "prepared by Claude" steps.
  2. [Claude now] Add `ops/GATE-A.md`: the seven items with status, owner, target date and evidence file, read by the Monday deadline check.
  3. [Claude now] Allow one money-framed line: "Holiday sales at risk: about $X (model); N setup steps open; last day for Black Friday: Nov 13."
  4. [Claude now] Add a one-time "season pass" line to `ops/APPROVALS.md`, listing every Q4 product, price and date. Once APPROVED, it counts as verified approval for those items through January 31.
  5. [founder once] Do all Q4 proofs in one sitting by October 25.
  6. [owner workflow] Clear the `check_listings.py` FAILs on the Wave 1 five first, before any new build, and settle one launch list in `ops/QUEUE.md` and `ops/LAUNCH-NOW.md`.

### 12. Too many products and no hero · 16 (4 × 4)
- **Story:**
  - The studio builds about 26 products a month into a shop that sells a few, so traffic and your proofing minutes are spread thin.
  - Approvals expire.
  - By March there are 40–60 listings and none has 50 reviews.
- **Early warning:** sales concentration and the share of zero-sale listings (D5); approval minutes over the cap, items expiring (D6).
- **Protection today:**
  - `ops/ROUTINE.md`:
    - §5 (weekly caps: 5 new Etsy listings, 2 KDP titles);
    - "Be proactive" (fix or fold);
    - "Growth engine loop jobs": double down, the kill rule, and one change after 14 days (copied in from GROWTH-ENGINE §8b, whose heading now says ADOPTED).
  - `business/GROWTH-ENGINE.md` §3 Loops 1–2 and §8c (EXP-16).
  - `business/sections/05-operations-risk-milestones.md` §5.9, risk 13.
- **Gap:**
  - The build step has no limit on work in progress and no hero list, and a new category needs no evidence of demand.
  - The 30-idea pipeline floor pushes volume.
  - Customer-voice rule 21 has no exemption for editions of already-proofed products (decision D7 is still optional).
  - The loop-job heading in ROUTINE still says "binding once adopted", which leaves room to treat it as optional.
- **Fix:**
  1. [Claude now] Add `ops/HEROES.md`: the top 3 listings by 30-day net, rewritten every Monday.
  2. [Claude now] `ops/ROUTINE.md` §2:
     - a new-category build is allowed only when at least 60% of live listings sold in the last 30 days and the proofing backlog is under 60 minutes;
     - otherwise the run improves a hero (photo, title, count upgrade or bundle);
     - build 3 editions of proven sellers for each new category.
  3. [Claude now] Lower the pipeline floor from 30 to 10 for the first 90 days after G-day ("Never run out of products").
  4. [Claude now] Change the loop-job heading to "binding".
  5. [founder once] Decide D7 (an exemption to rule 21 for editions) as one APPROVALS line.

### 13. Pinterest, the main traffic channel, is suspended or never gets going · 16 (4 × 4)
- **Story:** Either of two things happens:
  - The brand-new account starts API posting at 3–5 AI-labelled pins a day to a domain with no history, and is suspended as spam.
  - It never gets Standard API access, falls back to daily upload packets nobody posts, and sits near 10 clicks a week in January.
- **Early warning:** posting volume against the ramp (P7); account errors and pins nobody sees (P8); connection and click milestones (D7); token health (K1).
- **Protection today:**
  - `marketing/MARKETING-PLAYBOOK.md` Segment 3, tactic 1 (wait 3–7 days before re-saving).
  - `ops/EXPERIMENTS.md` EXP-08 compliance note.
  - `business/GROWTH-ENGINE.md` §3 Loop 3.
  - `ops/ROUTINE.md` "Growth engine loop jobs" (own boards only, no group boards, banned words) and the §5 read-back.
- **Gap:**
  - There is no warm-up ramp for a new account, no daily cap per URL and no duplicate-image check.
  - The read-back confirms a pin exists, not that anyone sees it.
  - API approval has no tracked date, and the only fallback costs daily founder time.
  - `ops/SECRETS.md` has "publish pins" only, so analytics cannot be read.
  - There is no pivot rule if Loop 3 misses its January 31 target.
- **Fix:**
  1. [Claude now] Add `ops/PLATFORM-LIMITS.json`. These are cautious house limits, not Pinterest's rules:
     - 1 pin a day in weeks 1–2, 2 a day in weeks 3–6, then at most 5;
     - at most 1 new pin per URL per day;
     - no image reused within 30 days.
  2. [Claude now] Add `ops/TESTS/check_social_queue.py` to enforce those limits before any post.
  3. [founder once] About 10 minutes of saving pins by hand in week 1, before API posting starts.
  4. [Claude routine] On the zero-impression signal, pause Pinterest posting and add one APPROVALS line.
  5. [Claude now] Add "Pinterest Standard access requested / granted" to `ops/DEADLINES.md`, and draft the application text as one APPROVALS line.
  6. [Claude now] Replace daily packets with one monthly bulk packet in `ops/UPLOAD-PACKETS/pinterest/` (about 10 minutes a month).
  7. [Claude now] Add pins-read and account-read scopes to `ops/SECRETS.md`.
  8. [Claude now] Pre-register a Loop 3 pivot in `ops/EXPERIMENTS.md`: under 50 outbound clicks a week at January 31 moves pin effort to free-printable pins that feed the list, and studio time to Etsy hero fixes.

### 14. Print books bounce at KDP or IngramSpark, a rights check is missed, or print quality disappoints · 16 (4 × 4)
- **Story:**
  - Every book file currently fails preflight, and packets reach you with no machine gate, so uploads bounce.
  - A KDP rights-check email with a short deadline sits in an inbox nobody reads.
  - Titles that do go live print muddy in black and white.
- **Early warning:** the print check fails (G2); an upload-packet line waits more than 7 days, or a title is not live 5 days after upload (P11); KDP or IngramSpark mail caught by the filter (L10); returns (O15).
- **Protection today:**
  - `ops/TESTS/print-preflight.md` ("Verdict", "Tier 1").
  - `brand/BRAND.md` "Print conventions" and customer-voice rules 20–21.
  - `ops/ROUTINE.md` §5 (upload packets; at most 2 new KDP titles a week) and §1 (`check_fonts.js`).
  - `ops/COMPLIANCE-GATE.md` lines 8 and 17.
  - `ops/LAUNCH-NOW.md` Wave 2 (one printed proof of each book).
  - `commerce/storefront-setup-guide.md` Part C (own ISBNs).
  - `marketing/BLIND-SPOTS.md` #8 and #11.
  - `ops/GAPS-ROUND-2.md` G2-07.
- **Gap:**
  - The preflight is a report, not a script, and a PASS is not required before a packet is offered.
  - There is no grayscale test, and no proof field that blocks a packet.
  - No title has a rights-evidence pack, and the G2-07 filter words do not cover KDP rights checks.
  - `products/guide-100-plays/listing.json` ("free KDP ISBN or your own") conflicts with the owned-ISBN rule in the storefront guide.
  - KDP returns are not tracked.
- **Fix:**
  1. [Claude now] Add `ops/TESTS/check_print.py` (the G2 rules, including grayscale contrast and gradients). A PASS is required before a packet enters `ops/UPLOAD-PACKETS/`.
  2. [Claude now] Add a `RIGHTS.md` to every packet: the source's git log, its creation-records row, the AI-disclosure answers, and our own URLs where the same content appears. Then a KDP rights email can be answered in minutes.
  3. [Claude now] Add "rights", "documentation", "blocked", "content review" and "action required" to the G2-07 filter.
  4. [owner workflow] Add to each `listing.json`:
     - the ISBN rule: owned ISBNs only, and Expanded Distribution off for titles also on IngramSpark;
     - a `proof` block: printer, ordered, approved by the founder, date.
  5. [Claude routine] Add KDP returns per title to the monthly close. Above 3%, fix or unpublish.

### 15. The business goes live, or school-facing, before employment counsel clears it · 15 (3 × 5)
- **Story:**
  - Counsel is slow, and you say "go" in a session.
  - The PAUSE removal test, which does not mention counsel, is met.
  - Educator-facing wording that no script checks goes live.
- **Early warning:** days since the counsel packet was sent (L3); the counsel-hold check fails on a publish candidate (G4); a commit deletes `ops/PAUSE` while Gate A has open items (G9).
- **Protection today:**
  - `ops/LAUNCH-NOW.md` Wave 0 step 1.
  - `legal/LEGAL-LAUNCH-CHECKLIST.md` row 1.
  - `business/GROWTH-ENGINE.md` §2b, Gate A item 1 (counsel says yes before "go").
  - `ops/PAUSE` (its "Why" paragraph).
  - `publish_gate` fields in `seo/articles/` (article 06 is held for counsel).
  - `ops/QUEUE.md` (ALPHAPLAY Spelling Games is HELD).
  - `ops/ROUTINE.md` "Never cross a guardrail to be proactive".
  - `ops/COMPLIANCE-GATE.md` line 14.
- **Gap:**
  - Counsel status is prose spread across about a dozen files, not one switch.
  - The removal test written in `ops/PAUSE` (accounts, "the launch gate passes", your go) does not name counsel or insurance and does not match Gate A. Counsel is covered only indirectly: the "Why" paragraph names it, and "the launch gate" (task #12, not yet built) presumably includes `legal/LEGAL-LAUNCH-CHECKLIST.md` row 1. The `ops/PAUSE` text is also stale: it says `ops/FULL-STOP.md` is still to be written, and that file now exists.
  - `check_listings.py` has no counsel-hold check.
  - Educator wording is present in:
    - the bored-play-cards license tiers ("single-classroom");
    - `seo/articles/09`, which lists educators in its audience with `publish_gate: none`;
    - the root `index.html` ("Coaching", "Work with me", "For teachers");
    - `legal/COACHING-WORKSHOP-TERMS.md`, which still exists for an offering that was retired.
  - Five questions have not yet reached `legal/FOR-EMPLOYMENT-COUNSEL.md`: two from GAPS-ROUND-2 §5 and three from BLIND-SPOTS #1.
- **Fix:**
  1. [Claude now] Add `legal/COUNSEL-STATUS.json`, changed only through the verified approval channel. It records `packet_sent_on`, `answered_on` and these scopes:
     - `sell_parent_products`: pending;
     - `school_facing`: held;
     - `educator_byline`: held;
     - `founder_name_on_public_records`: held;
     - `trademark_filings`: held;
     - `alphaplay_sworn_filing`: held.
  2. [Claude now] Rewrite the removal test in `ops/PAUSE` as "all seven Gate A items hold" (`ops/GATE-A.md`), including `sell_parent_products = cleared`.
  3. [Claude now] Add a counsel-hold check (`c_counsel_hold`) to `ops/TESTS/check_listings.py` and to the article and site builds.
  4. [Claude now] Add the five missing questions to `legal/FOR-EMPLOYMENT-COUNSEL.md`, word for word, with no business analysis.
  5. [owner workflow] Until counsel clears it:
     - remove classroom and site-license wording from listings that are not held;
     - gate the educator framing in article 09;
     - retire the root `index.html`.

### 16. Etsy holds or suspends the shop, and the routine makes it worse · 15 (3 × 5)
- **Story:**
  - Etsy, about 40% of median year-1 sales (`business/STRESS-TEST.md` §3), takes a listing down after an IP report.
  - The "every live product stays live" rule puts it back up, and the repeat violation closes the shop.
  - Late personalized orders hurt the shop's standing along the way.
- **Early warning:** a live listing turns inactive and we did not cause it (P3); vacation mode switches on unexpectedly (P9); paid orders ship late (O3); reserve or hold entries (O5); Etsy becomes too large a share of revenue (O7).
- **Protection today:**
  - `ops/AUTOFIX.md` "Pause, fix what's safe" (listing removals and suspensions create PAUSE and an APPROVALS line).
  - `ops/ROUTINE.md` §5 "No duplicates" and the weekly caps.
  - `business/sections/05-operations-risk-milestones.md` §5.9, risk 1.
  - `ops/GAPS-ROUND-2.md` G2-09 and G2-10.
- **Gap:**
  - `ops/ROUTINE.md` "Every live product stays live" cannot tell an expired listing from one Etsy removed, and it conflicts with AUTOFIX.
  - The limit of one re-publish every 7 days is only proposed (CLOUD-RUNBOOK open risk #7).
  - Nothing detects a reserve or hold when it happens. Only the monthly close considers them, when it rolls the 13-week cash forecast forward ("Etsy holds and reserves", `ops/ROUTINE.md` §5).
  - The cash model leaves suspension out (`business/STRESS-TEST.md` §7).
- **Fix:**
  1. [Claude now] Rewrite "Every live product stays live":
     - re-publish only when the platform state is "expired" and the ledger shows no platform action;
     - any other unexpected state pauses that platform and adds one APPROVALS line;
     - never re-list after a removal without a verified APPROVED line.
  2. [Claude now] Add `ops/TESTS/check_live_listings.py`, which compares `ops/PUBLISHED.json` with the API.
  3. [Claude now] Add an "Etsy suspended in month 4" scenario to `business/stress_test.py`.

### 17. Payout holds and verification freezes go unseen · 12 (3 × 4)
- **Story:**
  - A new payment account holds funds, or asks for verification with a deadline, by email or admin banner.
  - Your report counts sales, not deposits, so a held balance looks like success.
- **Early warning:** late or held payouts (O4); reserve entries (O5); Merchant Center status (O6).
- **Protection today:**
  - `ops/ROUTINE.md` §5 monthly close (payouts reconciled to deposits; the 13-week cash forecast).
  - `business/sections/05-operations-risk-milestones.md` §5.9, risks 1, 8 and 14.
  - `seo/SEO-PLAN.md` §4.3 and §4.5.
  - `operations/TRUST-CHECKLIST.md`.
  - `ops/GAPS-ROUND-2.md` G2-07, G2-10 and G2-23.
- **Gap:**
  - Payouts are reconciled monthly only, and nothing reads payout status daily.
  - Your report never shows held cash.
- **Fix:**
  1. [Claude routine] Work out the cash in transit for each payment account every day.
  2. [Claude now] Change the daily line in "Founder updates = money" to: "Yesterday: $X in sales · Paid out this month: $P (held: $H)".
  3. [Claude now] Any hold over $50, or a missing payout, becomes the top APPROVALS line.
  4. [Claude routine] Read the Merchant Center status once it is connected.

### 18. Meta's real-identity rules collide with the faceless setup · 12 (3 × 4)
- **Story:** The Facebook Page is created from an invented admin login, Meta disables it, and the Page, the linked Instagram account and the posting token are lost together (current Meta rule UNVERIFIED).
- **Early warning:** Meta token or Page errors (K6).
- **Protection today:**
  - `marketing/SOCIAL-HANDLES.md` "Setup rules".
  - `operations/SOPs/account-security.md` §2.
  - `ops/CLOUD-RUNBOOK.md` "API credentials" (the Meta row: system-user or Page token [VERIFY]).
  - `ops/GAPS-ROUND-2.md` G2-25.
- **Gap:**
  - Nobody has decided whose real profile administers Meta and LinkedIn.
  - There is no plan for a Business portfolio with a system-user token.
  - The faceless rule and the platform rule conflict, and nothing flags it.
- **Fix:**
  1. [counsel, then founder once] One APPROVALS line: your own private profile, never shown publicly, as the only human admin inside a Meta Business portfolio, plus a backup admin and a system-user token for the API.
  2. [Claude now] Add a table to `marketing/SOCIAL-HANDLES.md` recording which real identity sits behind each account. Never create synthetic profiles.
  3. [Claude routine] Check the Meta token daily.

### 19. An automated post breaks a hard rule · 12 (3 × 4)
- **Story:**
  - A post, pin text, image text or email, possibly in Spanish or French, carries an overstated screen-time or autism line.
  - It is screenshotted and reported.
  - The comments fill with children's details.
- **Early warning:** the pre-post queue check fails (G3); comment spikes (R2); platform warnings (R8).
- **Protection today:**
  - `ops/COMPLIANCE-GATE.md` lines 1–4 and 13–15.
  - `ops/TESTS/check_hub_firewall.py` (hub pages and hub posts only).
  - `ops/TESTS/check_listings.py` pattern lists (listings only).
  - `ops/ROUTINE.md` §3 (HF-14) and §5 "Comments".
  - `business/sections/05-operations-risk-milestones.md` §5.9, risk 12.
  - `marketing/BLIND-SPOTS.md` #7.
- **Gap:**
  - No machine check covers ordinary posts, captions, alt text, hashtags or emails.
  - The same model writes each item and judges it (G2-04).
  - The `content/queue/` folder and its format do not exist yet.
  - `ops/moderation-words.md` does not exist.
- **Fix:**
  1. [owner workflow] Define the queue file format.
  2. [Claude now] Add `ops/TESTS/check_queue.py` (G3). It reuses the `check_listings.py` patterns in every language, and adds:
     - a hashtag denylist and the forbidden motifs;
     - a check on text inside images;
     - the social AI label;
     - a rule that every link points to an item that is live in `ops/PUBLISHED.json`;
     - the fear-and-shame word list (risk 23).
  3. [Claude now] Post only items with a PASS stamp.
  4. [Claude routine] A separate reviewer agent, with a different prompt, signs off each batch.
  5. [Claude now] Write `ops/moderation-words.md` (risk 24).

### 20. The personalized-book print job quietly stops · 12 (3 × 4)
- **Story:**
  - The GitHub Actions poller in `ORDER-TO-PRINT.md` runs every 15 minutes, about 2,900 times a month. Once the repository is private (Top fix 1), it uses up the free Actions minutes around day 20. Public repositories are believed not to be billed for minutes; both the allowance and the per-run rounding are UNVERIFIED.
  - Or it never fires, because scheduled workflows run only from the default branch.
  - Either way, $25–$35 personalized orders sit unprinted for a week.
- **Early warning:** the poller has not succeeded in 2 hours, or Actions minutes are running out (A10); a paid personalized order is unshipped after 24 hours (O2).
- **Protection today:**
  - `products/picture-laps-not-apps/ORDER-TO-PRINT.md` §1 and §5 (checks before the first order).
  - `ops/CLOUD-RUNBOOK.md` setup step 3 (default branch, currently optional).
- **Gap:**
  - Nothing covers the minutes budget, the branch the job runs from, or how long a paid order may wait.
  - Failures go to a weekly queue.
- **Fix:**
  1. [owner workflow] Poll hourly, or move the poller onto the watchdog Worker's cron.
  2. [founder once] Set the default branch to `claude/live`.
  3. [Claude routine] A stuck-order check (O2): the order becomes the top APPROVALS line, with a pre-approved "your book is being prepared" message.
  4. [founder once] Set an Actions spending limit. The watchdog tracks the minutes.

### 21. The heroes lose the side-by-side comparison in Etsy search results · 12 (3 × 4)
- **Story:**
  - Next to "129 activities" and "400+ pages" with 30–60% sale badges, our flat "$11.99, 74 activities, about $0.16 each" gets clicked, compared and left.
  - Conversion near 0.8% instead of 2% turns year-1 profit negative (`business/STRESS-TEST.md` §2). The §2 grid already shows a loss of $1,530 at half the base conversion, with every other input at the base; profit crosses zero at roughly 0.7× conversion.
- **Early warning:** conversion per 100 visits (D4); competitor snapshots (D13).
- **Protection today:**
  - `marketing/DEMAND-CHECK.md` §4 and the §3 busy-book spec (row 4: 120–150 pages).
  - `commerce/PRICING.md` §1.
  - `ops/EXPERIMENTS.md` EXP-04a and EXP-04b.
  - `brand/BRAND.md` "Honest pricing (binding)".
- **Gap:**
  - PRICING §1 compares price ranges, not the price and count shown next to ours.
  - The spec is in pages, and the busy book meets it (132 pages in its `listing.json`). But the title leads with its activity count, 74, next to competitors' "129 activities" and "400+ pages", and no rule says which count a title should lead with. (Corrected in verification: the earlier "74 activities, below the 120–150 spec" compared activities with pages.) The "30–60% sale badges" come from the demand lens, not from a file (UNVERIFIED).
  - EXP-04b only fires at 4 or more sales a week, so a hero that does not convert never gets a price test.
- **Fix:**
  1. [Claude now] Add a "search-grid parity" rule to `commerce/PRICING.md` §1, enforced by a `grid_parity` check in `check_listings.py` against `ops/market/grid-<slug>.json` (the top 20 displayed prices, counts and cost per unit). If our count is below the median and our cost per unit above it, the listing does not lead with the count. It ships as a count-raising bundle, or leads with a differentiator.
  2. [Claude now, via `ops/QUEUE.md`] Ask the product workflow to lead the busy-book title with its page count (132 pages) or a differentiator, not "74", and to consider a count-raising edition before November.
  3. [Claude now] Add a conversion trigger to EXP-04b: under 1% at 300 or more visits allows one lower everyday-price test, above `price_floor` and with no "was" price.

### 22. Visual Routine Cards sit on autism-adjacent search terms · 12 (3 × 4)
- **Story:** Both choices carry a cost:
  - Keep "visual schedule" and "first then board": autistic families buy, find a "virtual autism" hub from the same brand, and leave 1 star on the best seller.
  - Drop them: the cards compete only in saturated chore-chart searches and get folded by the kill rule.
- **Early warning:** the share of routine-card impressions from autism-adjacent queries (R9); autism words in routine-card reviews (R5); routine-card views lagging the other launch listings (D11).
- **Protection today:**
  - `brand/BRAND.md` "Autism searches (binding)".
  - `ops/TESTS/check_listings.py` (autism-terms WARN).
  - `ops/TESTS/autism-content-audit.md` §4 and §6.
  - `ops/TESTS/listing-qa.md`.
  - `ops/APPROVALS.md` (the pending KEEP or REPLACE line).
- **Gap:**
  - The decision is framed as compliance only, with no estimate of lost demand and no replacement path.
  - After REPLACE, marketplace recommendations will still send the same buyers.
  - No rule keeps a product whose natural buyers include autistic families from linking toward the research pages.
  - The kill rule treats this hero like any other listing.
- **Fix:**
  1. [founder once] Answer REPLACE before Wave 1.
  2. [Claude now] Register EXP-17 in `ops/EXPERIMENTS.md`:
     - two compliant, situation-led title and tag sets (morning routine, bedtime routine, picture routine cards, sitter cards);
     - alternated ABAB, judged on views, with the EXP-03 thresholds;
     - the cards are exempt from the kill-rule fold until it decides.
  3. [owner workflow, founder approval] Add to `brand/BRAND.md` "Autism searches":
     - products whose core buyers include disabled or autistic children never link to the research pages from the product page, order emails or START HERE;
     - their grown-up guide says picture routines help many children and are not a sign of anything.
  4. [Claude now] Add a 20% query-share guardrail to `ops/EXPERIMENTS.md`.
  5. Include this listing in the paid autistic reader's brief.

### 23. The screen-free message reads as shaming, privileged or ableist · 12 (3 × 4)
- **Story:** A few things turn the brand into the emblem of the screen-shaming it says it rejects:
  - "Laps not apps" totes;
  - a sleepy-tablet mascot that looks like an AAC device;
  - family rules that seem to ban captions, or video calls with a deaf grandparent.
- **Early warning:** shame and AAC or ableism words in comments and reviews (R5); "felt judged" answers and unsubscribe reasons (R7); merch refund reasons.
- **Protection today:**
  - `brand/BRAND.md` customer-voice rules 11–13 and 15–16.
  - `marketing/CAMPAIGN-BIBLE.md` §1.
  - `brand/ORIGINALITY.md` rows C2 and C8.
  - `marketing/BRAND-RESPECT-PLAN.md` §1 (the no-guilt test) and §5 (representation).
  - `marketing/CUSTOMER-VOICE.md` title tests.
  - The product FAQs ("a talker is your child's voice") in play-first-family-kit and picture-tablet-slept.
  - The fear-word FAIL in `ops/TESTS/check_listings.py`.
- **Gap:**
  - "Judged" and "preachy" scores come only from the simulated panel, judged by the model that wrote the item, and nothing measures shame after launch.
  - The queue check covers hub posts only.
  - The talker exception lives in product FAQs, not in a brand-level definition that travels with the mascot, merch and posts, and it covers talkers only.
  - The cast rule (BRAND-RESPECT §5) is still a proposal.
  - "Screen Reset", retired in `brand/ORIGINALITY.md` rows A4–A9 (originality and "consult" reasons, and the "reset/detox" framing), is still in use far beyond the three marketing files named earlier. It appears in 47 files. Buyer-facing ones include `operations/customer-service/FAQ.md` line 74 and macro 18, `seo/articles/01`, `10` and `11` (as a product to buy), `site-concepts/winner/shop.html` and `catalog.js`, and the root `index.html` ("Screen Reset Consult"). Marketing: `marketing/CAMPAIGN-BIBLE.md` (12 times), `marketing/MARKETING-PLAYBOOK.md`, `marketing/templates/press-release-launch.md`. Products mention it only as a retired name.
  - No real parent, AAC user or disabled parent has read anything.
- **Fix:**
  1. [Claude now] Add EXP-18 "No-guilt check" to `ops/EXPERIMENTS.md`:
     - for the first 90 days, one post-purchase question ("Did anything from us make you feel judged? yes/no") plus an unsubscribe reason;
     - 3% "yes" on any product, slogan or campaign pulls it.
  2. [owner workflow, founder approval] A brand-level definition in `brand/BRAND.md`, published at `/what-we-mean-by-screens`: "Talkers, captions, video calls with family, and any device a child needs to communicate, learn or take part are never 'screen time' here." A short form or a link goes on page 1 of screen-free products and in the caption template.
  3. [owner workflow] The mascot is always a screen playing a show, never a blank tablet.
  4. [founder once] Approve the cast rule. Pay one AAC-user or AAC-parent reader and one disabled-parent reader before the mascot goes on merch. Have five real parents read the slogans before merch goes live, including a single parent, a shift worker and a parent of a disabled child.
  5. [Claude now] Replace "Screen Reset" with the approved names (*30 Days of Back-and-Forth*, "New Year Back-and-Forth") in `marketing/`, `seo/articles/`, `operations/customer-service/`, `business/` and `commerce/`. [owner workflow] Do the same in `site-concepts/winner/`. Add the retired names to a `check_listings.py` and `check_queue.py` WARN list.
  6. [Claude now] `check_queue.py` runs the fear-and-shame list on every post (risk 19).

### 24. Moderation silences critics · 12 (3 × 4)
- **Story:**
  - To hide children's diagnoses, the filters get loaded with words like "autistic".
  - A self-advocate's polite critique is hidden automatically.
  - "Play Before Pixels auto-hides the word autistic" becomes the story.
- **Early warning:** a hidden comment that contains a never-hide word and no abuse (R6).
- **Protection today:**
  - `ops/ROUTINE.md` §5 "Comments" (never hide good-faith criticism) and §5b "Comments" (weekly export).
  - `ops/GAPS-ROUND-2.md` G2-21.
  - `marketing/AWARENESS-ENGINE.md` §5 (a correction route in captions).
  - `marketing/virtual-autism-outreach.md` §4.
- **Gap:**
  - `ops/moderation-words.md` does not exist, and no rule says which words must never be hidden.
  - Review is weekly.
  - Comments being off on hub posts has no public explanation.
- **Fix:**
  1. [Claude now] Write `ops/moderation-words.md` with two lists:
     - HIDE: slurs, spam, links, phone and email patterns, and child-name-plus-school patterns;
     - NEVER-HIDE: autistic, autism, AAC, disabled, ableist, privilege, shame, AI.
     A comment that discloses a diagnosis is held for review by a phrase pattern, not hidden.
  2. [Claude now] `ops/ROUTINE.md` §5b: held comments that contain never-hide words are reviewed in the daily check.
  3. [Claude now] Pin one line on the research board and each hub post explaining that comments are off to keep children's details private, with a link to corrections.

### 25. Children's product-safety paperwork is missing (CPSIA, EU GPSR) · 12 (3 × 4)
- **Story:**
  - The ages 0–3 *Up! Go! More!* paperback and the personalized *Whose Lap Today?* ship through print-on-demand on the belief that paper books are "ordinary books". Books for children 3 and under may fall outside that exemption (UNVERIFIED).
  - EU orders would make AlphaPlay the "manufacturer", with no EU responsible person.
- **Early warning:** the CPSIA or GPSR check fails on a publish candidate (G4); inbox terms such as "Children's Product Certificate" or "GPSR" (L10).
- **Protection today:**
  - `legal/protection/PROTECTION-PLAN.md` §4 (books for ages 0–3 likely need testing and a Children's Product Certificate).
  - `legal/LEGAL-LAUNCH-CHECKLIST.md` CPSIA rows and notes.
  - `brand/BRAND.md` hard rule 4 and customer-voice rules 8 and 20.
  - `products/board-up-go-more/listing.json` compliance notes.
  - `legal/DECISION-MEMO.json` `legal_before_first_sale` (EU GPSR).
  - `ops/INTERNATIONAL.md`.
  - `ops/ROUTINE.md` "Growth engine loop jobs" (never a 0–3 activity book before CPSC guidance).
- **Gap:**
  - The checklist's CPSIA notes still call paperboard books "generally ordinary books", which contradicts PROTECTION-PLAN §4.
  - The board-book note covers a future edition only, not the paperback that sells now.
  - There is no `cpsia` or `gpsr` field and no check.
  - Physical shipping profiles have no EU restriction.
- **Fix:**
  1. [Claude now] Add `cpsia` and `gpsr` blocks to the `listing.json` schema, and `c_cpsia` and `c_gpsr` checks to `check_listings.py`.
  2. [Claude now] Correct the CPSIA notes in `legal/LEGAL-LAUNCH-CHECKLIST.md`.
  3. [counsel] The product-safety attorney, or the CPSC Small Business Ombudsman, answers in writing who certifies a print-on-demand book for under-3s. Both books wait until then.
  4. [founder once] Set physical shipping to US only (Etsy, Shopify, Printful) until an EU/UK responsible person is under contract.

### 26. No insurance bound, or the wrong insurance, when a claim arrives · 12 (3 × 4)
- **Story:** The first claim is declined because of one of these:
  - the policy was only quoted, never bound;
  - it was bound on a description of coaching and workshops the business no longer offers;
  - the description left out AI content, activity instructions for ages 0–3 and the research hub.
- **Early warning:** a live product with no bound policy, or a policy close to expiry (L8); a request for a certificate of insurance (L10).
- **Protection today:**
  - `legal/protection/PROTECTION-PLAN.md` §2 (policy table; name both the LLC and you).
  - `legal/LEGAL-LAUNCH-CHECKLIST.md` row 14.
  - `legal/DECISION-MEMO.json` `legal_before_first_sale`.
  - `business/GROWTH-ENGINE.md` §2b, Gate A item 3 ("Insurance is bound").
  - `ops/DEADLINES.md` (insurance renewal).
- **Gap:**
  - `ops/LAUNCH-NOW.md` Wave 0 step 8 says "get a quote", and the removal test in `ops/PAUSE` leaves insurance out, so Gate A's "bound" is not enforced. The same file's "How the founder is protected" section says "insurance is in place before the first sale", which contradicts its own step 8.
  - `legal/LEGAL-LAUNCH-CHECKLIST.md` row 14 still asks for quotes that include "professional liability/E&O for coaching and workshops", an offering that has been retired.
  - The broker disclosures are out of date, and there is no record file.
  - The key question has not been asked: does products-completed operations coverage include an injury from following a download's instructions?
- **Fix:**
  1. [Claude now] Reword LAUNCH-NOW step 8 to "Bind general liability with products-completed operations, with you as a named insured, before the first sale". It becomes part of the Gate A switch.
  2. [Claude now] Add `legal/INSURANCE.json` and signal L8.
  3. [Claude now] Rewrite the PROTECTION-PLAN §2 disclosure list.
  4. [founder once] Ask the broker two questions in writing: coverage for injuries from following instructions, and media liability for the hub.

### 27. The LLC shield weakens · 12 (3 × 4)
- **Story:** After a dispute, a plaintiff argues that the LLC and you are the same person, pointing to:
  - an unknown 2026 annual-report status;
  - a closed LLC bank account, so costs are paid personally;
  - no operating agreement and no IP assignment;
  - the core asset (the repository) sitting in a personal account.
- **Early warning:** the LLC's state standing (L7); business payments from personal funds without a matching entry (O14); sales tax collected but not paid (O13).
- **Protection today:**
  - `legal/protection/PROTECTION-PLAN.md` §1 "Keep the LLC shield strong".
  - `finance/BANKING.md`.
  - `finance/money-and-tax-setup.md` (accounts 3000 and 3100).
  - `ops/LAUNCH-NOW.md` Wave 0 steps 2–3.
  - `ops/DEADLINES.md` (the 2027-04-15 annual report).
  - `operations/SOPs/yearly.md`.
  - GROWTH-ENGINE Gate A item 2 (the bank account is open).
- **Gap:**
  - The 2026 filing status is unknown, and nothing checks the LLC's standing automatically.
  - There is no corporate-records file.
  - *Added in verification:* four launch listing records (Family Kit, busy book, routine cards and the Starter) carry no "© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC." line, which COMPLIANCE-GATE line 8 requires (`check_listings.py` owner-line FAIL). Products sold without the LLC named as owner weaken both the shield and the copyright chain (risk 32).
  - GitHub, the Claude plan and the tools are personal accounts.
  - The IP assignment has no date.
- **Fix:**
  1. [Claude now] Add a fact box to `legal/ENTITY.md`, with no numbers or addresses:
     - formed on;
     - 2026 annual report filed (yes or no);
     - standing checked on;
     - Maryland sales-and-use account (yes or no) and its filing frequency;
     - operating agreement signed;
     - IP assignment signed.
  2. [Claude routine] Fetch the state status in the monthly close and write `llc_standing` to the heartbeat.
  3. [Claude now] Add `legal/CORPORATE-RECORDS.md`.
  4. [founder once] Move the repository to an LLC-owned GitHub organization, and bill tools to the LLC's card once the account is open.
  5. [Claude routine] Monthly-close rule: every business payment from a personal source gets an owner-contribution (3000) entry within 30 days.

### 28. The research hub feeds the sales funnel, and the overall impression is a health claim · 12 (3 × 4)
- **Story:**
  - Each page passes on its own.
  - But a parent who arrived worried about autism gets the welcome sales series.
  - The research pillar page offers the free play printable right next to a finding about play and autism checklist scores.
  - The homepage says "backed by research".
  - A complaint then reads the whole path as "buy this to reduce autism-like signs".
- **Early warning:** the firewall check, extended to emails and the built site, fails (G7); email automations send products to hub sign-ups (V2); banned phrases in product copy (G4).
- **Protection today:**
  - `brand/BRAND.md` hard rules 1 and 3 and "Autism searches".
  - `ops/COMPLIANCE-GATE.md` lines 1–3 and 15.
  - `ops/TESTS/check_hub_firewall.py`.
  - `marketing/AWARENESS-ENGINE.md` §10 (HF-14, HF-17, and the proposed gate line).
  - `content/research-hub/review/REVIEW-PACK.md`.
  - The `seo/articles/08` publish gate.
  - The pending A/B sign-up line in `ops/APPROVALS.md`.
  - The SITE-SAFE CUT in `content/founder-story.md`.
- **Gap:**
  - The proposed hub-firewall gate line was never added: the gate ends at line 22 and has two lines numbered 16.
  - The sign-up decision is still open.
  - `check_hub_firewall.py` does not scan email sequences, and scans the site only when run with `--site`. Run that way on the winner concept, it FAILs HF-15 today (risk 4).
  - "Backed by research" (in the root `index.html`) and "research-based" are not banned. `check_listings.py` already FAILs "evidence-based", "proven", "science-backed" and "support… development" in listings, but it does not read site pages.
  - (Corrected in verification: audit items H1–H3 were fixed at 03:22 UTC, commit 787f594. The pillar page carries no printable link, and the FAQ's single printable invitation points to `/research/play-printable/`.)
- **Fix:**
  1. [founder once] Choose route A: a hub sign-up gets a product-free delivery email only.
  2. [Claude now] Renumber the second line 16 as 23, and add the hub-firewall line as 24, using the text in AWARENESS-ENGINE §10.
  3. [Claude now] Extend `check_hub_firewall.py` to the email and funnel folders and to the site build output.
  4. [Claude now] Add "backed by research" and "research-based" to the `check_listings.py` proof-claim FAIL ("evidence-based" and "supports development" are already caught), and run the same pattern over the site build.
  5. [owner workflow] Keep H1–H3 fixed (update the audit's §4 table to say so), retire the root `index.html`, and use only the SITE-SAFE CUT of the founder story.

### 29. PLAY BEFORE PIXELS is refused, opposed or squatted · 12 (3 × 4)
- **Story:**
  - No clearance search or application exists, and the repository tells anyone that the .com and the mark are unclaimed.
  - Someone files first, or the USPTO refuses the name as descriptive.
  - A late rebrand follows, after the logo and books are built.
- **Early warning:** the monthly USPTO watch (L5); the domain's registration status (L6).
- **Protection today:**
  - `legal/DECISION-MEMO.json` (`name_decision`, `name_risks`, `trademark_plan`).
  - `brand/ORIGINALITY.md` row A1 (buy the domain; the fallback name).
  - `legal/protection/PROTECTION-PLAN.md` §6b and §7a (a monthly USPTO watch).
  - `legal/LEGAL-LAUNCH-CHECKLIST.md` row 24.
  - `ops/LAUNCH-NOW.md` Wave 0 step 5 (buy the domain).
- **Gap:**
  - The §7a watch never reached `ops/ROUTINE.md` §1, whose copycat watch searches marketplaces only.
  - The filing has no date.
  - The clearance question does not mention the large existing PLAY and PIXEL trademark families (UNVERIFIED).
- **Fix:**
  1. [Claude now] Add a "USPTO watch" to `ops/ROUTINE.md` §1, run on the first of each month and logged to `ops/COPYCAT-LOG.md`.
  2. [counsel] An early OK on quiet, defensive steps: buying the domain in the LLC's name, and an intent-to-use filing in classes 16 and 41 with the attorney as correspondent. Claude then puts dates for both in `ops/DEADLINES.md`.
  3. [Claude now] Add the PLAY and PIXEL mark families, and existing "before pixels" users, to `legal/DECISION-MEMO.json` `needs_a_lawyer`.
  4. No Madrid (international) filing until the US application has been examined.

### 30. A wrong or non-compliant price goes live, and prices drift across channels · 12 (4 × 3)
- **Story:** Routine Cards are $9.50 in `listing.json` and $6.50 in the financial workbook (`business/STRESS-TEST.md` §1 note 1), and `business/REVENUE-PLAN.md` still says "$9.50 (sale $6.50)". The Routine Cards Starter is $4.50 in its `listing.json` and in REVENUE-PLAN but $5.00 in `ops/QUEUE.md`, and $4.50 breaks the $5 single-printable minimum (the second gate line 16; `check_listings.py` honest-pricing FAIL). Any of these can then happen, and nobody compares the live prices:
  - a run sets a permanent "compare-at" price;
  - AUTOFIX reverts a live price test;
  - a Printful cost rise drops merch under the margin floor.
- **Early warning:** live prices differ from `listing.json` (P5); the price-floor check fails (G4).
- **Protection today:**
  - `brand/BRAND.md` "Honest pricing (binding)".
  - `commerce/PRICING.md` §2 and §5.
  - `ops/COMPLIANCE-GATE.md` line 18 and the second line 16.
  - `ops/TESTS/check_listings.py` honest-pricing and price-floor checks (`listing.json` only).
  - `ops/AUTOFIX.md` ("wrong prices vs listing.json").
- **Gap:**
  - The checks stop at the repository; nothing reads prices back from the platforms.
  - `ops/QUEUE.md` still carries "$9.50 / ~$6.50" list/sale pairs on the community routine-card editions (items 1, 2, 20 and 21) and other queued items, and the G2-11 wording fixes are not done.
  - The floor check FAILs on 4 of the 5 launch listings. The busy book and 100 Plays have no floor at all. Visual Routine Cards (and its Starter) and the Family Kit have a $3.00 floor stored as `price_floor_usd`, a key that COMPLIANCE-GATE line 18 and `ops/ROUTINE.md` §2 do not name. None of the four has `net_per_unit_by_channel`.
  - AUTOFIX's price rule does not know about running experiments.
- **Fix:**
  1. [owner workflow] Make `listing.json` the only price source, with `price_history` and a dated `promo`. Rename `price_floor_usd` to `price_floor`, and set the Starter at $5.00 (or bundle-only) to match QUEUE and the $5 minimum.
  2. [Claude now] Add `ops/TESTS/check_live_prices.py` to the daily check.
  3. [Claude now] Extend the `ops/ROUTINE.md` §5 read-back to compare price, currency, compare-at price, title and file hash.
  4. [Claude now] Apply the G2-11 wording fixes to `ops/QUEUE.md`. AUTOFIX leaves alone any price that matches an active `ops/EXPERIMENTS.md` arm.
  5. [Claude now] Renumber the gate lines (see risk 28).

### 31. The plan rests on unconfirmed rules, and nothing notices when rules change · 12 (4 × 3)
- **Story:**
  - About 540 UNVERIFIED or [VERIFY] marks sit in `legal/`, `finance/` and `commerce/` (counted September 28).
  - The daily stay-current scan has never run: the daily check is off, and the Default network blocks policy sites.
  - A wrong assumption surfaces only when a platform or regulator enforces it.
- **Early warning:** the policy scan is blocked or stale (A8); a watched policy page changes (A9); the count of unconfirmed facts stops falling (L9).
- **Protection today:**
  - `ops/ROUTINE.md` "Daily stay-current scan" and §1 "Research backlog first".
  - `ops/RESEARCH-BACKLOG.md`.
  - `ops/cloud/allowed-domains.txt`.
  - `ops/TESTS/network-hosts.md`.
  - `ops/CLOUD-RUNBOOK.md` setup step 4.
  - `business/sections/05-operations-risk-milestones.md` §5.9, risk 2.
  - Task #18 (re-verify every unconfirmed fact).
- **Gap:**
  - No running routine includes the scan, `ops/PLATFORM-NEWS.md` is empty, and nothing detects page changes.
  - No register ties each binding legal fact to a source and a date, so the launch gate cannot tell which steps rest on guesses.
- **Fix:**
  1. [Claude now] Run the scan in the studio until the daily check is on.
  2. [Claude now] Add `ops/platform-watch.json` and a small fetch-and-hash script that passes only the changed pages to the model.
  3. [Claude now] Add a heartbeat field `policy_scan: ok | blocked(n)`.
  4. [Claude now] Add `legal/VERIFIED-FACTS.json` (fact, file and line, source URL, verified on, verifier). The launch gate fails on any row that is still unverified.
  5. [Claude now] Copy the "Needs a live check" items below into `ops/RESEARCH-BACKLOG.md`.
  6. [founder once] Create the business environment (CLOUD-RUNBOOK setup step 4) so research sites can be reached.

### 32. Copycats clone the best sellers, and thin copyright leaves little recourse · 12 (4 × 3)
- **Story:**
  - Within weeks of a hero selling, clone shops list it at $1.48–$3.
  - The monthly copycat watch cannot actually run.
  - A DMCA claim over AI-only material invites a counter-notice or a misrepresentation claim.
- **Early warning:** the weekly copycat scan finds matches, or a copy appears within 60 days of a launch (D12); the authorship check (G4).
- **Protection today:**
  - `ops/ROUTINE.md` §1 copycat watch (for AI-made material: trademark, license and platform policy).
  - `legal/protection/PROTECTION-PLAN.md` §6c, §7 and the added note on AI-assisted products and copyright.
  - `brand/BRAND.md` "Human authorship".
  - `legal/protection/creation-records-log.md`.
  - `ops/COMPLIANCE-GATE.md` line 8.
  - `ops/COPYCAT-LOG.md`.
  - `business/sections/05-operations-risk-milestones.md` §5.9, risk 9.
- **Gap:**
  - The watch needs a person with a browser (`ops/RESEARCH-BACKLOG.md`), no image-search site is allowed, and `ops/COPYCAT-LOG.md` is empty.
  - Authorship lives in prose, not in a field a check reads, and the creation log has one row.
  - Your authorship time is not budgeted.
  - No rule prevents a price war.
  - The public repository leaks the files (risk 1).
- **Fix:**
  1. [Claude now] Add `ops/TESTS/copycat_scan.py`, run weekly. It uses the Etsy API listing search with 3–5 distinctive phrases per product plus one hidden canary phrase (endpoint and terms UNVERIFIED).
  2. [Claude now] Add a "no price war" rule to `commerce/PRICING.md`: answer a clone with a count or edition refresh, or a bundle, and file IP reports only where human-written text was copied.
  3. [owner workflow] Add an `authorship` block to `listing.json`: text, art, evidence commits, registrable parts.
  4. [Claude now] Add a `c_authorship` check. The copycat step drafts a copyright notice only when "registrable parts" is not empty.
  5. [Claude now] Add `legal/protection/build_creation_log.py`, which fills the creation log from git history at each monthly close.
  6. [founder once] Spend your authorship time on the top 3 sellers first.

### 33. SEO never contributes · 12 (4 × 3)
- **Story:**
  - Twelve articles exist, but no site is live.
  - The cornerstone articles target child-health searches held by medical publishers, with an anonymous byline and no named reviewer.
  - Organic traffic is still a few hundred visits a month in September 2027.
- **Early warning:** Search Console impressions and clicks against thresholds, and the site go-live date slipping (D8).
- **Protection today:**
  - `seo/SEO-PLAN.md` §7 (re-rank at week 8; prune) and §4.5 (legitimacy checklist).
  - `ops/ROUTINE.md` "Search quality over quantity".
  - `ops/APPROVALS.md` (the reviewer-briefs line).
- **Gap:**
  - `ops/DEADLINES.md` has no site go-live date, and `site/` does not exist.
  - SEO has no revenue test and no pivot rule.
  - The heartbeat records only the manual-action status.
- **Fix:**
  1. [Claude now] Ship a small static Cloudflare Pages site with a date in `ops/DEADLINES.md` (for example November 15):
     - home, 5 product pages linking to Etsy and Gumroad, 6 articles, and `/free`;
     - the output folder is the site build only (CLOUD-RUNBOOK open risk #14).
  2. [Claude now] Add a rule to SEO-PLAN §7. At week 16, if organic visits are under 500 a month and revenue is under $10 per 1,000 visits, write at most 2 new articles a month and move the effort to printable-intent pages.
  3. [Claude now] Add Search Console impressions and clicks by page to the heartbeat.
  4. [founder once] Fund a named reviewer only for health-adjacent pages that already show impressions.

### 34. Every sale is rented: Etsy buyers never reach the email list · 12 (4 × 3)
- **Story:**
  - Nearly half the orders come from Etsy, whose files carry no link. KDP gives no buyer data, and Shopify is deferred.
  - The list reaches about 110 people by January 31, and the January course sells a handful. (About 110 by January 31 is the model path itself, in the `ops/ROUTINE.md` §6 scorecard lines. So even the plan's list is small for a January course launch, and any shortfall makes it smaller.)
  - Every sale has to be won again from search.
- **Early warning:** subscribers against the model path, sign-up rates and repeat buyers (D9).
- **Protection today:**
  - `business/GROWTH-ENGINE.md` §3 Loop 4 and §5b (an Etsy thank-you coupon, marked unverified).
  - `brand/BRAND.md` "Every product leads to the next".
  - `ops/EXPERIMENTS.md` EXP-06 and EXP-07.
- **Gap:**
  - `ops/COMPLIANCE-GATE.md` line 16 (no links in Etsy files) is the constraint that causes this risk, not a protection (moved here in verification).
  - No routine job uses Etsy's own repeat-purchase tools.
  - The course has no Etsy edition.
  - Nothing fires when the list trails the model.
- **Fix:**
  1. [Claude now] Add an "Etsy repeat levers" job to `ops/ROUTINE.md` §5, set up once and checked monthly:
     - a genuine, dated thank-you coupon;
     - offers for favorited items and abandoned carts;
     - a last page that names the next listing in the same shop, with no link.
  2. [Claude now, via `ops/QUEUE.md`] A printable workbook edition of *30 Days of Back-and-Forth* on Etsy by December 15.
  3. [Claude now] A list alarm in `ops/DEMAND-ALARMS.md`: under 60% of the model path for 4 weeks moves effort to free-printable pins and a bonus offer in each KDP title.

### 35. Teachers, SLPs and OTs doubt a faceless, uncredentialed brand · 12 (4 × 3)
- **Story:**
  - The talk-along books and talk tips resemble speech-therapy strategies, and nobody named has reviewed them.
  - Speech-language pathologists call it "a non-SLP brand selling speech strategies".
  - Professional recommendations never come.
- **Early warning:** credential questions in reviews and messages (R5); talk-product conversion below half that of printables (D14).
- **Protection today:**
  - `marketing/BRAND-RESPECT-PLAN.md` §2 and §3 (a paid review panel, with license checks and credit lines).
  - `marketing/BLIND-SPOTS.md` #10 and #14.
  - `operations/TRUST-CHECKLIST.md` #11–12.
  - `content/research-hub/editorial-policy.md` (not yet published).
  - `ops/APPROVALS.md` (the reviewer-briefs line).
- **Gap:**
  - None of this has happened yet.
  - `ops/LAUNCH-NOW.md` Waves 1–2 do not require a real reviewer before talk-focused products ship.
- **Fix:**
  1. [Claude now] New gate line 25: a product with talk tips cannot be listed until `products/<slug>/review-record.md` exists. It records a license-checked speech-language pathologist, the file version reviewed, the date, the changes made and the approved credit wording.
  2. [Claude now] Reorder LAUNCH-NOW so talk-focused titles follow that review. Printables without talk tips go first.
  3. [Claude now] Publish the editorial policy and a "Who reviews our work" page at launch.
  4. [founder once] Approve the reviewer briefs this week.

### 36. Personal material leaks into the business through skills or connectors · 10 (2 × 5)
- **Story:** A build or routine session loads a personal skill or reaches your mail while drafting an About page or press kit, and commits personal facts to the repository.
- **Early warning:** a personal connector or a non-business skill is present when a run starts (A11); the deny-list check fails on a commit (X3).
- **Protection today:**
  - `CLAUDE.md` (open Gmail, Drive or Calendar only when you ask; only the business fact goes into the repository).
  - `ops/ROUTINE.md` step 0.4 (connector guard).
  - `ops/CLOUD-RUNBOOK.md` open risk #6 and "Max-plan facts" (all three routines had no connectors on September 28).
  - `ops/GAPS-ROUND-2.md` G2-02.
- **Gap:**
  - Step 0.4 stops publishing, not committing.
  - `CLAUDE.md` has no rule on skills or `.mcp.json`.
  - Build sessions and routines run under the same claude.ai account that has personal skills and connectors enabled. This build session can see a personal, non-business skill and the Gmail, Drive and Calendar tools.
- **Fix:**
  1. [Claude now] Change step 0.4 to "end the run and commit nothing".
  2. [Claude now] Add to `CLAUDE.md`: never load a skill that is not about the business, and never commit `.mcp.json` or MCP settings.
  3. [Claude now] Make the deny-list scan a required CI check once `main` is protected (G2-04).
  4. [founder once] The "Best" option in G2-02: a claude.ai account used only for AlphaPlay LLC owns the routines and build sessions.

### 37. A usage limit cuts a run off mid-publish in Q4 · 9 (3 × 3)
- **Story:**
  - At peak season, a run hits the shared limit after creating an Etsy listing but before recording it.
  - The next run creates a duplicate.
  - A stale lock makes the morning check skip.
- **Early warning:** a `limit` result (A2); orphan or duplicate items on a platform (P2); an old lock (A6).
- **Protection today:**
  - `ops/ROUTINE.md` step 0.1 (the limit path), step 0.5 (the lock) and §5 "No duplicates".
  - `ops/CLOUD-RUNBOOK.md` "When a limit is reached" and open risk #7 (a 3-hour stop, proposed).
  - `ops/GAPS-ROUND-2.md` G2-06 and G2-08.
- **Gap:**
  - Nothing protects the moment between creating an item and recording it.
  - Nothing adopts orphans.
  - There is no plan for the Q4 workload.
- **Fix:**
  1. [Claude now] `ops/ROUTINE.md` §5: before each create call, write and push a "pending" ledger entry with a generated SKU.
  2. [Claude now] Step 0 matches platform items to the ledger by SKU and adopts orphans.
  3. [Claude now] From November 1 to December 31, publishing moves to the short daily check, and the studio is capped at 3 agents.
  4. [Claude now] Deploy the site only as whole Pages deployments.
  5. [Claude now] Stop starting new work 3 hours after the lock time.

### 38. Low prices and creeping fees eat the margin · 9 (3 × 3)
- **Story:**
  - $5–$6.50 items net $3.46–$4.73 on Gumroad, and a Gumroad Discover sale may cost about 30% (UNVERIFIED).
  - Etsy Offsite Ads may become mandatory at 12% (UNVERIFIED).
  - Lean fixed costs ($567 a month) are above the Monte Carlo median's average monthly sales (P50 of about $6,300 a year, or about $525 a month), though below the Expected case (about $940 a month) (`business/STRESS-TEST.md` §3 and summary).
- **Early warning:** actual fee rates, contribution per order, and fixed costs against contribution (O12).
- **Protection today:**
  - `commerce/PRICING.md` §1–§2 (floors).
  - `ops/COMPLIANCE-GATE.md` line 18.
  - `ops/TESTS/check_listings.py` (price floor).
  - `business/STRESS-TEST.md` §6.
  - `business/GROWTH-ENGINE.md` §5d.
  - The `ops/ROUTINE.md` §6 scorecard (net per unit below the floor).
- **Gap:**
  - Actual fees are not checked against the floor after launch.
  - The fee table in `check_listings.py` already estimates an Etsy Offsite Ads sale (at 15%, stricter than the 12% case), but it has no Gumroad row at all, so the Discover case is missing.
  - The floor check FAILs on 4 of the 5 launch listings (two have no floor; two store it as `price_floor_usd`; see risk 30).
- **Fix:**
  1. [Claude routine] A "fee drift" step in the monthly close (`finance/TAX-AUTOPILOT.md` §3 → `finance/closes/YYYY-MM.md`). A product whose actual net stays under its floor for a month becomes bundle-only on that channel.
  2. [Claude now] Add a Gumroad row with a Discover case to the fee table (the Offsite Ads case is already there).
  3. [Claude now] On Gumroad, sell $5 items only as add-ons or inside bundles, and opt out of Discover if that is allowed (UNVERIFIED).
  4. [owner workflow] Fill `price_floor` and `net_per_unit_by_channel`.

### 39. The privacy policy and other public promises don't match what the business does · 9 (3 × 3)
- **Story:**
  - The policy says "we do not collect information from children", and that printers get "name and shipping address only".
  - The personalized book collects a child's first name, pronouns and family words, and the list asks for a birth month.
  - A writer tests the promises and publishes "says X, does Y".
- **Early warning:** undeclared data fields, hub-topic tags, logs holding personalization, or an old privacy request (V1–V4); the promise check (G5); reply times (R11).
- **Protection today:**
  - `products/picture-laps-not-apps/listing.json` compliance notes.
  - `legal/LEGAL-LAUNCH-CHECKLIST.md` privacy rows.
  - (Moved to the gap in verification: `legal/PRIVACY-POLICY.md` §1–§2 and the `marketing/CAMPAIGN-BIBLE.md` [COPPA] rule are the promises under test here, not protections. Both say no child data is collected.)
  - `ops/ROUTINE.md` §5b privacy requests.
  - `ops/COMPLIANCE-GATE.md` lines 11 and 21.
  - `legal/protection/PROTECTION-PLAN.md` §5.
  - `ops/GAPS-ROUND-2.md` G2-19 and G2-24.
- **Gap:**
  - The policy and the campaign rules contradict the personalized book's data flow.
  - There is no data map and no check.
  - The health-data question (Washington's My Health My Data Act) sits in a marketing file, not in the attorney list.
  - The policy still describes coaching.
  - The editorial policy's "a person checks every page" is true only once the verified approval channel exists.
- **Fix:**
  1. [Claude now] Add `legal/DATA-MAP.json` and `ops/TESTS/check_data_map.py`, run in CI.
  2. [Claude now] Add `ops/TESTS/check_promises.py`, which compares the promise phrases in public copy with the sources of truth. A mismatch blocks publishing.
  3. [Claude now] Draft the PRIVACY-POLICY §1, §2 and §4 rewrite for the attorney review:
     - a child's first name and the other personalization details are shared with the printer only to print the book, and deleted a set number of days after delivery;
     - the child's birth month and year are used for age-matched emails.
     Also correct `marketing/CAMPAIGN-BIBLE.md` line 67.
  4. [Claude now] Move the Washington, Nevada and EU representative questions into `legal/DECISION-MEMO.json` `needs_a_lawyer`.
  5. [Claude now] Every bonus page reached by a QR code gets a "For grown-ups" header, an 18+ tick and no child-directed visuals. The order job never logs order details.

### 40. Tax and VAT exposure from sales abroad and missed filings · 9 (3 × 3)
- **Story:**
  - The site's Buy buttons check out on Shopify instead of the merchant of record, so EU and UK digital sales owe VAT from the first sale (UNVERIFIED).
  - Own-site merch printed at EU or UK facilities triggers registration there.
  - Small Maryland and federal items compound.
- **Early warning:** the four monthly-close tax checks (O13).
- **Protection today:**
  - `finance/TAX-AUTOPILOT.md` §1.
  - `commerce/storefront-setup-guide.md` (international digital sales go through Gumroad).
  - `legal/LEGAL-LAUNCH-CHECKLIST.md` tax rows.
  - `legal/DECISION-MEMO.json` `legal_before_first_sale`.
  - The `finance/money-and-tax-setup.md` calendar.
  - `ops/GAPS-ROUND-2.md` G2-14 to G2-16.
  - `ops/INTERNATIONAL.md`.
- **Gap:**
  - The routing is advice, not configuration.
  - VAT on own-site orders printed in the EU or UK appears in no file.
  - Nobody knows whether a Maryland sales-and-use account exists.
  - `ops/GAPS-ROUND-2.md` G2-14 calls the September 15, 2026 estimated-tax quarter "missed". Whether anything was due, with no business revenue yet, is a question for the accountant.
  - The accountant questions are not yet in `finance/money-and-tax-setup.md` §13.
- **Fix:**
  1. [Claude now] Add `commerce/MARKETS.md` as the binding configuration:
     - Shopify sells digital products in the US only;
     - non-US visitors go to the merchant of record;
     - own-site physical orders ship from US facilities only, until the accountant has registered AlphaPlay LLC for UK or EU VAT.
  2. [Claude now] Add the four monthly-close alerts to `finance/TAX-AUTOPILOT.md` §3.
  3. [accountant] G2-14 to G2-16, plus VAT on own-site orders printed in the EU or UK, recorded in §13.
  4. [Claude now] Add a Maryland account line to the `legal/ENTITY.md` fact box (risk 27).

### 41. Card testing, disputes, and a refund rule that contradicts the policy · 8 (2 × 4)
- **Story:**
  - A burst of stolen-card $5 orders turns into disputes weeks later, at about $15 each (UNVERIFIED), and a high dispute rate freezes December payouts.
  - Separately, the routine's automatic first refund contradicts the published "non-refundable once opened" policy.
- **Early warning:** order velocity (O8); dispute and refund rates (O9); refunds requested late in the course (O11).
- **Protection today:**
  - `ops/ROUTINE.md` §5b "Refunds and chargebacks".
  - `ops/GAPS-ROUND-2.md` G2-12.
  - `operations/SOPs/weekly.md`.
  - The `ops/EXPERIMENTS.md` refund guardrail.
  - `business/STRESS-TEST.md` §2.
- **Gap:**
  - The fraud control relies on Shopify, which is deferred.
  - `operations/SOPs/refunds-and-disputes.md` was never written.
  - The automatic refund contradicts `legal/SHIPPING-RETURNS-REFUNDS.md` Part B.
  - There is no velocity alarm.
  - The course guarantee draft (14 days, at most 30% of lessons) does not fit a 30-day drip.
- **Fix:**
  1. [Claude now] Write `operations/SOPs/refunds-and-disputes.md` for Gumroad and Etsy.
  2. [Claude now] One refund rule, reconciled with the policy for the attorney review: fix or refund for defects, and a first goodwill refund only on the own checkout.
  3. [Claude now] $5 items become add-on or bundle-only on Gumroad.
  4. [Claude routine] When O8 or O9 fires, unpublish only the affected Gumroad product and add an APPROVALS line. No global PAUSE.
  5. [Claude now] The course guarantee runs 14 days from purchase, and only lessons 1–7 are delivered in that window.

### 42. The KDP paperback flops quietly · 8 (4 × 2)
- **Story:**
  - *100 Screen-Free Plays* launches with zero reviews against incumbents with 700–800 ratings.
  - Ads wait on a counsel question, and KDP has no API.
  - The flop becomes visible only after the holiday window.
- **Early warning:** units and reviews per title (O15).
- **Protection today:**
  - `ops/EXPERIMENTS.md` EXP-10a and EXP-10b.
  - `marketing/DEMAND-CHECK.md` 100-plays row (a planned 150-play second edition).
  - `marketing/MARKETING-PLAYBOOK.md` Segment 3, tactics 3–4.
- **Gap:**
  - There is no timely sales signal and no pre-registered pivot.
  - The advance-copy plan depends on you and is not scheduled.
- **Fix:**
  1. [founder once a month, 2 minutes] Drop the KDP report file into a fixed folder.
  2. [Claude now] Add a dated 45-day readout to EXP-10a. Under 10 units triggers the 150-play second edition, retitled with the larger count.
  3. [Claude now] Send the ad-geography question to counsel now (GROWTH-ENGINE §2a), so EXP-10b can run before December 15.

### 43. API access is stuck at a trial tier, so "posted" content stays private · 8 (4 × 2)
- **Story:** New apps are held back on several platforms (all UNVERIFIED), so the studio makes months of content nobody can see:
  - TikTok keeps posts from unaudited apps private;
  - YouTube uploads from unaudited projects are private;
  - Pinterest trial apps may post only to a sandbox.
- **Early warning:** read-back shows content that is not public (P4); Etsy app approval is slow (P10).
- **Protection today:**
  - `ops/ROUTINE.md` §5 read-back ("A private, draft or missing result is a failure").
  - `ops/LAUNCH-NOW.md` platform table.
  - `ops/RESEARCH-BACKLOG.md` items 3, 4, 7 and 11.
- **Gap:**
  - No rule stops the studio making content for a channel that cannot post publicly.
  - Nothing records each platform's access level.
- **Fix:**
  1. [Claude now] Add `ops/PLATFORM-STATUS.json`: access tier, audited, public posting OK, since.
  2. [Claude now] The studio builds content only for platforms where public posting is confirmed.
  3. [Claude routine] One weekly APPROVALS line for each other platform: "post by hand or drop".

### 44. The "never run out" rule swaps a discontinued merch blank for a wrong one · 6 (2 × 3)
- **Story:** Printful discontinues a blank and the daily check swaps in the "closest match". With auto-confirm on, the next order prints on a blank that does one of these:
  - costs more;
  - breaks the logo colors;
  - is a youth size, which brings children's-product duties.
- **Early warning:** a discontinued variant or an out-of-rule swap (P6).
- **Protection today:**
  - `commerce/storefront-setup-guide.md` Part C (adult sizes first).
  - `commerce/PRICING.md` §2 (the 30% print-on-demand floor).
  - `operations/AUTOMATION-MAP.md` 3F.
- **Gap:**
  - The risk itself comes from `ops/ROUTINE.md` "Never run out of products" (moved from "Protection today" in verification: it is the cause, not a protection).
  - The swap bypasses the gate, the price floor and the adult-sizes rule.
- **Fix:**
  1. [Claude now] Swap only within the same product type, in adult sizes and approved colors, and only if the net stays at or above the floor. Otherwise deactivate the variant and add one APPROVALS line.
  2. [Claude now] Add these checks to `check_live_prices.py`.

### 45. Free content cannibalizes the paid collections · 6 (2 × 3)
- **Story:**
  - Several free offers together give a parent about a third of the paid PDF: monthly free plays, bonus printables, samplers, a pay-what-you-can edition and free seasonal calendars.
  - The list grows while revenue per subscriber stays near zero.
- **Early warning:** subscriber purchase rates and free downloads per paid order (D10).
- **Protection today:**
  - `ops/EXPERIMENTS.md` EXP-06 and EXP-07.
  - `marketing/DEMAND-CHECK.md` §4 rule 11.
  - `business/GROWTH-ENGINE.md` §3 Loop 4.
- **Gap:**
  - No limit on how much of a paid product may be given away.
  - Free items need not name a paid product.
  - The pay-what-you-can edition competes with the $9.99 PDF.
- **Fix:**
  1. [Claude now] Add a "free budget" rule to `commerce/PRICING.md` §3:
     - each free item is at most 10% of the paid product it samples, and names it;
     - the monthly free plays come from a separate free-only pool;
     - the pay-what-you-can edition gets a $5 minimum and waits until the list passes 1,000.
  2. [Claude routine] Track revenue per subscriber by sign-up source. Cut the free cadence to quarterly if the 90-day purchase rate stays under 2% for 2 months.

### 46. The ALPHAPLAY application is abandoned on March 8, 2027, or a rushed filing is void · 6 (2 × 3)
- **Story:**
  - The only use plan is held for counsel.
  - USPTO mail goes to inboxes the automation never reads, and the correspondence domain may lapse before the deadline.
  - Either nobody files the extension, or a Statement of Use based on a token sale claims all five classes.
- **Early warning:** the weekly trademark status poll and the domain and mail checks (L4).
- **Protection today:**
  - `ops/DEADLINES.md` rows 1–2.
  - `legal/ENTITY.md` "ALPHAPLAY use plan" and "Existing accounts".
  - `legal/protection/PROTECTION-PLAN.md` §6b.
  - `marketing/BLIND-SPOTS.md` #9 (no token sales, no mockups).
  - `ops/ROUTINE.md` "Deadlines, 30 days early" and the founder time cap (legal deadlines rank first).
  - `business/sections/05-operations-risk-milestones.md` §5.9, risk 4.
- **Gap:**
  - There is no automated status poll.
  - There is no standing decision if the product is still held on February 1.
  - The change of address has no date.
  - Nothing ties the mailbox's lifespan to the deadline.
- **Fix:**
  1. [Claude now] A daily legal-status poll that writes `trademarks` to the heartbeat.
  2. [founder once] A standing instruction in `ops/DEADLINES.md`: if no genuine ALPHAPLAY sales exist by 2027-02-01, the attorney files a first extension for all classes (about $125 per class, UNVERIFIED), and deletes classes only on the attorney's advice.
  3. [Claude now] Change of address by 2026-10-31.
  4. [Claude now] Record in `legal/ENTITY.md`: alphaplaygames.com auto-renew on, and Workspace kept until the trademark correspondence moves.

### 47. Reviews, testimonials or subscriptions break FTC rules · 6 (2 × 3)
- **Story:** Routine testing and marketing drift across a line:
  - a bundle claims a "$60 value" from prices never charged;
  - a simulated panel line is reused as a testimonial;
  - relatives review without disclosure;
  - the Play Club renews without a compliant reminder or online cancel.
- **Early warning:** the testimonial, panel-similarity, value-claim and subscription checks (G6).
- **Protection today:**
  - `brand/BRAND.md` "Honest pricing" and the "Everything stays honest" rule.
  - `ops/COMPLIANCE-GATE.md` lines 10, 18 and 22.
  - `ops/TESTS/check_listings.py` pricing check.
  - `marketing/BRAND-RESPECT-PLAN.md` (the 16 CFR 465 section).
  - `marketing/BLIND-SPOTS.md` #14.
  - `legal/LEGAL-LAUNCH-CHECKLIST.md` rows 15–17.
  - `business/REVENUE-PLAN.md` auto-renewal notes.
- **Gap:**
  - The testimonial log is a recommendation, not a file or a check.
  - Nothing keeps simulated panel text out of marketing.
  - Bundle value claims are not checked.
  - The review-team rule does not exclude relatives.
  - Auto-renewal duties are not a gate line.
- **Fix:**
  1. [Claude now] Add `marketing/TESTIMONIALS.json` and a testimonials check.
  2. [Claude now] Add a CI similarity check between public copy and the `panel.md` files.
  3. [Claude now] New gate lines:
     - 26: subscriptions have clear terms, express consent, online cancel, and a renewal reminder where the law requires it;
     - 27: bundle savings are computed from current prices only.
  4. [Claude now] Add to BLIND-SPOTS #14: no relatives, no work contacts, and every review discloses the free copy.
  5. [Claude now] Remove the list/sale price pairs from `business/REVENUE-PLAN.md`.

---

## Top 10 fixes

These ten close the most risk for the least effort. Your part is fixes 1 and 7 (about 25 minutes) and sending the packet in fix 8.

1. **Make the repository private, and set the default branch to `claude/live`.** · *founder once* (about 5 minutes)
   - File: `ops/CLOUD-RUNBOOK.md` one-time setup steps 1–3. Confirm the Claude GitHub App has access first, then make it private, then change the default branch. Mark the `ops/APPROVALS.md` line DONE.
   - Protects against risks 1, 2, 6, 15, 20 and 36.
2. **Exposure guard.** · *Claude now*
   - Files: `ops/TESTS/check_exposure.py`; a new `ops/ROUTINE.md` step 0.9; an `exposure` field in `ops/HEARTBEAT.json`; the signer change in `legal/protection/dmca-takedown-notice.md`.
   - It checks visibility, scans for personal details using a deny-list held in a secret, and probes the live site for internal pages. A red result creates `ops/PAUSE` and becomes the first line of your report.
   - Risks 1, 6 and 36.
3. **Outside watchdog, plus an "Automation: OK / NOT OK" line in every report.** · *Claude now*
   - Files: `ops/watchdog/worker.js` and `wrangler.toml`; `ops/ROUTINE.md` "Founder updates = money".
   - Risks 2, 20 and 37.
4. **Token broker, on the same Worker, and key renewals that never expire unread.** · *Claude now*
   - Files: `ops/broker/`; `ops/ROUTINE.md` "Founder time cap"; `ops/AUTOFIX.md`; `ops/SECRETS.md`.
   - Risks 5 and 18.
5. **Machine gates on the files themselves.** · *Claude now*
   - Files: `ops/TESTS/check_files.py` and `ops/TESTS/check_print.py`. A PASS stamp is required by `ops/ROUTINE.md` §1 and §5 before anything is published or offered as an upload packet.
   - Risks 7 and 14.
6. **Gate A becomes the one switch that removes PAUSE.** · *Claude now*
   - Files: `ops/GATE-A.md` (the seven items, each with an evidence file: `legal/COUNSEL-STATUS.json`, `legal/INSURANCE.json` and so on); the removal test in `ops/PAUSE`; "bind" instead of "quote" in `ops/LAUNCH-NOW.md` step 8; the holiday dates in `ops/DEADLINES.md`; a "season pass" line in `ops/APPROVALS.md`.
   - Risks 11, 15 and 26.
7. **Four decisions in one sitting.** · *founder once* (about 20 minutes)
   - File: `ops/APPROVALS.md`:
     - "virtual autism" in year one: BRAND-RESPECT §4 (explain once, then stop);
     - routine-card search words: REPLACE;
     - research-hub sign-ups: route A;
     - approve the reviewer briefs.
   - The founder-story SITE-SAFE CUT line, also pending, fits in the same sitting (about 5 more minutes).
   - Claude then adds HF-19 and HF-20 to `ops/TESTS/check_hub_firewall.py`.
   - Risks 4, 22, 28 and 35.
8. **Complete the counsel packet and send it.** · *counsel*
   - Files: add the five missing questions to `legal/FOR-EMPLOYMENT-COUNSEL.md`; answers are recorded, scope by scope, in `legal/COUNSEL-STATUS.json`. Claude prepares both. Counsel's answers unlock the rest.
   - The packet also asks: records preservation, whether the period of public exposure needs any action, public records that link your name, and the Meta admin identity.
   - Risks 15, 1, 6, 18 and 36.
9. **The daily watch: demand, reputation and cash.** · *Claude now*, then run by *Claude routine*
   - Files: `ops/DEMAND-ALARMS.md` and `ops/REPUTATION-WATCH.md` (thresholds); `ops/TESTS/demand_alarms.py` (the script, which also covers reputation and cash); read scopes in `ops/SECRETS.md`.
   - Four fixed exception lines in `ops/ROUTINE.md` "Founder updates = money":
     - Automation;
     - Reputation alert;
     - Paid out / held;
     - Holiday sales at risk.
   - Risks 3, 8, 9, 17 and 12, and the detection side of 4, 10, 23 and 24.
10. **Platform-safety rules that keep the routine from harming its own accounts.** · *Claude now*
    - Files: `ops/ROUTINE.md` "Never run out of products" (rewrite "stays live" and the blank-swap rule); `ops/PLATFORM-LIMITS.json` with `ops/TESTS/check_social_queue.py` (the Pinterest warm-up ramp); `ops/TESTS/check_live_listings.py`; the pending-ledger step in `ops/ROUTINE.md` §5.
    - Risks 16, 13, 37 and 44.

**Next in line** (not in the ten, but cheap):
- Clear the `check_listings.py` FAILs on the Wave 1 five (floor key and net, AI disclosure, owner line, the Starter's $4.50 price) and settle one launch list (risks 11 and 30) · owner workflow.
- `operations/SOPs/reviews.md`, and the FAQ reply-time fix (risk 8) · Claude now.
- The CPSIA hold on the two under-3 books until counsel answers (risk 25) · counsel.
- The accountant questions G2-14 to G2-16, plus VAT on own-site orders printed in the EU or UK, added to `finance/money-and-tax-setup.md` §13 (risk 40) · accountant.
- The trademark change of address by 2026-10-31 (risks 6 and 46) · founder once.

---

## Signals for ops/MONITORING.md

_Every signal below can be checked by a routine or the outside watchdog without a person. "Needs" names what must exist first. For the lead to merge into `ops/MONITORING.md`; this report does not edit that file. Unless a row says otherwise:_
- _a RED result adds one line to your report and one line to `ops/APPROVALS.md`;_
- _an amber result goes to `ops/RUNLOG.md` and the weekly scorecard only._

### A. Automation health (the hourly watchdog outside Claude, plus the daily check)
| ID | Signal | Threshold | Action | Needs |
|---|---|---|---|---|
| A1 | `ops/HEARTBEAT.json` `last_run` on `origin/claude/live` | older than 30 h | Watchdog alert to the business address | Watchdog Worker |
| A2 | Heartbeat `result` | `limit`, `locked` or `failed` on 2 runs in a row | Alert | Watchdog |
| A3 | `ops/runs/*-studio.md` files | fewer than 6 in the last 7 days | Alert | Watchdog |
| A4 | Commits on `origin/claude/live` | none in 36 h | Alert | Watchdog |
| A5 | `items_published` | empty for 7 days while `ops/PAUSE` is absent and `approvals_waiting` is above 0 | Alert | Watchdog |
| A6 | Age of `ops/LOCK` when a run starts | older than 3 h | Log; the run takes over under the 6-hour rule | — |
| A7 | GitHub default branch | not `claude/live` | Amber | GitHub API |
| A8 | Policy scan result; newest `ops/PLATFORM-NEWS.md` entry | more than half the policy hosts return 403; or no entry for 14 days | Heartbeat `policy_scan: blocked(n)`; amber | Business environment |
| A9 | Normalized-text hash of each watched policy page (`ops/platform-watch.json`) | changed | The changed page goes to the model; a finding is logged | platform-watch script |
| A10 | Order-to-print workflow | no successful run in 2 h; Actions minutes above 70% of the monthly allowance | RED | GitHub API with Actions read |
| A11 | Connectors and skills loaded at session start | any personal connector or non-business skill | End the run, commit nothing, RED | — |
| A12 | GitHub API `size` of the repository; clone time in the run log | above 3 GB, or up more than 0.5 GB in a week; clone over 5 minutes | Amber; the studio re-commits no unchanged renders until it is back under | — |

### X. Exposure and identity
| ID | Signal | Threshold | Action | Needs |
|---|---|---|---|---|
| X1 | Unauthenticated GitHub API `GET /repos/<owner>/playbeforepixels` | HTTP 200 with `private: false` (after the fix it must return 404) | RED; create `ops/PAUSE`; first line of your report | — |
| X2 | `forks_count`, `stargazers_count`; traffic views and clones | any fork or star; unique visitors other than the routine's own clones | Amber | Traffic endpoints need a token (UNVERIFIED) |
| X3 | Deny-list scan (secret `EXPOSURE_DENYLIST`) of tracked files, every commit, outgoing templates and bylines | any hit | RED; the push fails in CI | The secret; CI |
| X4 | Live site `GET /ops/ROUTINE.md` | anything other than 404 | RED | Site live |
| X5 | Monthly public-records sweep: trademark owner and correspondence fields, the state entity page (principal office, resident agent), domain RDAP, a Lumen search for the LLC name | any new personal detail | Amber; logged in `legal/PUBLIC-RECORDS.md` | — |

### K. Keys and accounts
| ID | Signal | Threshold | Action | Needs |
|---|---|---|---|---|
| K1 | Heartbeat `credentials[].last_ok` for each connected platform | older than 24 h | RED | — |
| K2 | `tokens_expiring` | not empty | Renewal line, ranked first, never expires | — |
| K3 | Platform in upload-packet fallback | more than 7 days (amber); more than 14 days (a line in your report) | As stated | — |
| K4 | Key-renewal line in `ops/APPROVALS.md` | older than 7 days | RED | — |
| K5 | `401` or `invalid_token` in `ops/RUNLOG.md` | any | RED | — |
| K6 | Meta `debug_token`; Graph error 190 or checkpoint codes; `/me/accounts` returns no Page; Instagram read-back fails | any | RED; pause Meta posting | Meta connected |

### P. Publishing integrity
| ID | Signal | Threshold | Action | Needs |
|---|---|---|---|---|
| P1 | sha256 of each file on the platform compared with `content_hash` in `ops/PUBLISHED.json` | differs | RED; re-check the file | Platform file APIs |
| P2 | Platform items against the ledger, by SKU or handle | an item not in the ledger (orphan), or two items for one product on one platform | Adopt the orphan; never create again | SKU field |
| P3 | A listing marked live in `ops/PUBLISHED.json` compared with its API state | inactive or removed, and the ledger shows no action of ours | Pause that platform; never re-list without a verified APPROVED line | `check_live_listings.py` |
| P4 | Read-back visibility: TikTok `privacy_level`, YouTube `privacyStatus`, the Pinterest host | `SELF_ONLY`, `private`, or the sandbox host | Update `ops/PLATFORM-STATUS.json`; stop building for that channel | — |
| P5 | Live price, currency, compare-at price and title (Shopify, Etsy, Gumroad, site JSON-LD) compared with `listing.json` (price, floor, dated promo) | any mismatch; any compare-at price without a dated former-price record | RED; fix, unless it matches an active experiment arm | `check_live_prices.py` |
| P6 | Printful catalog variants | discontinued; a swap would go below the floor, has youth, kids, toddler or baby in its name, or uses an unapproved color | Deactivate the variant; one APPROVALS line | Printful API |
| P7 | Pinterest queue against `ops/PLATFORM-LIMITS.json` | over the daily ramp; more than 1 new pin per URL per day; an image reused within 30 days | Block the post | `check_social_queue.py` |
| P8 | Pinterest account health | 401 or 403 with an account-status error; pin read-back 404; 10 or more new pins in a row with 0 impressions at 7 days | Pause Pinterest posting; one APPROVALS line | Pins-read scope |
| P9 | Etsy vacation flag | on while `ops/PAUSE` is absent | RED | Etsy API |
| P10 | Etsy app approval | pending more than 14 days | Amber | — |
| P11 | Upload-packet line in APPROVALS; KDP title status recorded in `ops/PUBLISHED.json` | older than 7 days; not live 5 days after upload | Amber | — |

### O. Orders and money
| ID | Signal | Threshold | Action | Needs |
|---|---|---|---|---|
| O1 | Digital order fulfillment (Shopify, Gumroad) | not fulfilled within 1 h | RED | Order-read scope |
| O2 | Personalized-book orders: paid but unshipped; Lulu jobs compared with paid orders | older than 24 h; fewer jobs than orders | Top APPROVALS line with the pre-approved "being prepared" message | Store and Lulu APIs |
| O3 | Etsy receipts paid but unshipped | older than the listing's processing time | RED | Etsy transactions-read |
| O4 | Each payment account: payouts compared with sales | no payout within the expected lag plus 3 days; a payout failed or held; a balance growing with no payout; any hold over $50 | Top APPROVALS line; your daily line shows "held: $H" | Payout APIs |
| O5 | Etsy payment-account ledger | entries of type reserve or hold | Amber, and into the cash forecast | UNVERIFIED endpoint |
| O6 | Merchant Center account status | suspended or misrepresentation | RED | Merchant Center connected |
| O7 | Etsy share of monthly revenue | above 60% | Amber | — |
| O8 | Orders per hour on any item at $6.50 or less | above 5× its 14-day average | Unpublish that Gumroad product only; one APPROVALS line (no global PAUSE) | Order-read |
| O9 | Disputes and refunds | disputes above 0.5% of orders on a channel; refunds above 3% for any product (5% is the hard guardrail) or above 5% over 14 days | RED | — |
| O10 | Refund reasons, reviews, Etsy conversations | "open", "download", "blank", "print" or "placeholder" | Same-day file check | Readable text sources |
| O11 | Course refunds | requested after lesson 10 | Amber; review the guarantee terms | Email platform |
| O12 | Monthly: actual fees ÷ gross; Gumroad Discover share; contribution per order; any product's net under its floor; fixed costs ÷ contribution | above 20% (Gumroad) or 15% (Etsy); contribution under $8.73; under the floor for a month; fixed costs above contribution for 3 months | That product becomes bundle-only on that channel; amber | Payout exports |
| O13 | Monthly tax: own-site order with a non-US billing country outside the merchant of record; own-site print order made outside the US; a Maryland return due with no filed confirmation; a 1099-K whose tax ID is not the LLC's EIN; sales tax collected compared with remitted | any | RED | — |
| O14 | Monthly: a business payment from a personal source with no owner-contribution (3000) entry | older than 30 days | Amber | — |
| O15 | Monthly (from your KDP file drop): returns per title; units per title; reviews | returns above 3%; under 5 units a month for 2 months; no reviews 60 days after publishing; under 10 units at the 45-day readout | Fix or unpublish; start the pre-registered pivot | Monthly KDP file |

### D. Demand
| ID | Signal | Threshold | Action | Needs |
|---|---|---|---|---|
| D1 | 7-day average Etsy views per listing per day | under 3 on day 21 after listing | Demand alarm; the next studio run is "fix the hero" | Etsy listings-read (views field UNVERIFIED) |
| D2 | Shop orders | 0 for 14 days while 5 or more listings are live | Demand alarm plus one money-framed line | — |
| D3 | Favorites per 100 views; favorites per order | under 2; more than 15 | Amber | — |
| D4 | Orders per 100 visits, per listing | under 1.0 once visits reach 300 | Triggers one EXP-04b price test | — |
| D5 | Top 3 listings' share of 30-day net; share of live listings with 0 sales in 30 days; builds per week compared with listings that have a sale | under 50%; over 40%; builds above listings with a sale | New-category builds stop; hero mode | — |
| D6 | Founder minutes requested; APPROVALS items expiring | above 60 for 3 weeks; any expiry after 4 rollovers | Amber | — |
| D7 | Pinterest | not connected 14 days after G-day; under 15 pins a week; outbound clicks under 25 a week at week 6 or under 100 a week at Jan 31; under 1 save per pin after 30 days; 0 clicks for 7 days with 20 or more pins live | Amber; the Jan 31 pivot rule | Pins-read |
| D8 | Search Console | under 50 impressions a week per article at week 12; under 10 clicks per 1,000 impressions; under 2 product clicks per 100 visits on non-hub articles | The SEO-PLAN §7 re-rank and pivot rule | Search Console API |
| D9 | Subscribers compared with the model path; sign-ups per 100 KDP and Gumroad orders; Etsy repeat-buyer share; January course sales | under 60% of the path for 4 weeks; under 15; under 5%; under 10 in January | List alarm; move effort to free-printable pins | Email platform |
| D10 | Share of non-hub subscribers buying within 90 days; free downloads per paid order | under 2%; rising month over month | Cut the free cadence to quarterly | — |
| D11 | Routine-card views per day compared with the median of the other launch listings | below the median for 3 weeks | EXP-17 readout | — |
| D12 | Weekly copycat scan: distinctive phrases and the canary phrase; median displayed price for our main search terms | any match (amber if within 60 days of a launch); median price down more than 25% in 4 weeks | Log to `ops/COPYCAT-LOG.md`; the no-price-war rule applies | Etsy search API (UNVERIFIED) |
| D13 | Grid-parity snapshot `ops/market/grid-<slug>.json` | our count below the median and our cost per unit above it | Block a count-first title | Competitor data (UNVERIFIED) |
| D14 | Conversion of talk-focused products compared with printables | under half | Amber; check the reviewer status | — |

### R. Reputation
| ID | Signal | Threshold | Action | Needs |
|---|---|---|---|---|
| R1 | Brand-name mentions per day (Reddit search JSON, Bluesky public search, Google Alerts RSS) | above 3× the 14-day median | `ops/PAUSE`, quiet mode, "Reputation alert" line | Hosts on the allowlist (reachability UNVERIFIED) |
| R2 | Comments per post; shares compared with saves; hub carousel shares and saves | above 3× the 30-day median (or 5× within 24 h); shares above 5× saves; hub items above 3× the median | As R1 | Social read APIs |
| R3 | New reviews across channels; the first 10 reviews per channel; Etsy cases | any at 3 stars or below (a line the same day); 2 or more in 7 days; an average under 4.6; any case | Private fix drafted the same day; 2 or more in 7 days → as R1 | Review read scopes |
| R4 | Contact forms by category; press or research contacts; "Report an error" messages that mention autism | 2 or more complaints in 7 days; any press contact; 2 or more such reports in a week | As R1 | Form export |
| R5 | Keyword scans across reviews, comments, refund reasons and forms. Lists: AI (AI, generated, slop, soulless …); shame (judg*, smug, privileg*, preachy …); access (AAC, talker, captions, deaf, ableis* …); credentials (SLP, qualified, who made …); autism words on routine-card items | AI: 1 in a week. Access: 2 in 7 days. Credentials: 2 in a month. Shame: above the per-post baseline. Autism on routine cards: any | One line; holding statement ready | Text sources |
| R6 | Hidden or held comments containing a NEVER-HIDE word and no abuse or personal-data pattern | any | Restore the same day | Moderation export |
| R7 | Unsubscribe reason "felt judged or preachy"; post-purchase "felt judged: yes" | 1% of sends or more; 3% or more for any product, slogan or campaign | Pull that creative | Email platform; survey |
| R8 | Platform warnings and content notices; unfollows | any warning; an unfollow spike | As R1 | Platform APIs |
| R9 | Search Console query share: autism queries across all impressions; recovery, cure or reverse queries with autism; autism-adjacent queries on routine-card pages | above 30%; any; above 20% | Rewrite the title or meta; log it; review the hub scope | Search Console query data (UNVERIFIED for these credentials) |
| R10 | Monthly referrers and backlinks | any linking domain that combines cure, recover, heal or detox with autism | Log it; review the linked page | Search Console links |
| R11 | Median first-reply time on buyer messages compared with the published promise | any breach | RED; fix the wording or the process | Message timestamps |

### L. Legal standing, gates and deadlines
| ID | Signal | Threshold | Action | Needs |
|---|---|---|---|---|
| L1 | Open items in `ops/GATE-A.md` compared with the days left to Nov 13 | any item still open with less than 30 days to go | "Holiday sales at risk" line | `ops/GATE-A.md` |
| L2 | Days since the last verified approval; seasonal products waiting for a proof | 14 or more while a seasonal launch is within 21 days; within 14 days of the list-by date | One line | — |
| L3 | Days since the counsel packet was sent, with no answer in `legal/COUNSEL-STATUS.json` | over 30 (amber), over 60 (RED) | As stated | The status file |
| L4 | Weekly trademark status poll for the ALPHAPLAY serial; alphaplaygames.com RDAP and MX records | 60, 30 and 14 days before 2027-03-08; the owner address still the retired mailbox; the domain expires before 2027-03-08 without auto-renew; MX not resolving | Line ranked first | — |
| L5 | Monthly USPTO search: marks containing BEFORE PIXELS, PLAY BEFORE, PLAY B4 or PIXELS in classes 9, 16, 25, 28 and 41, filed or published in the last 35 days; after filing, weekly office actions | any new match; any office action | Log to `ops/COPYCAT-LOG.md`; attorney line | — |
| L6 | RDAP status of playbeforepixels.com and .org | not registered to the LLC | Daily until owned | — |
| L7 | Monthly state entity status for AlphaPlay LLC; `bank_account_open` | not active and in good standing; any platform connected while it is false | RED | — |
| L8 | `legal/INSURANCE.json` compared with `ops/PUBLISHED.json` | a live product with no general-liability and products policy bound; you not a named insured; any policy expiring within 45 days | RED | Record file |
| L9 | Count of UNVERIFIED and [VERIFY] marks in `legal/`, `finance/` and `commerce/`; research-backlog items marked "blocked"; launch-gate rows that rest on unverified facts | not falling week over week once the allowlist is live; blocked more than 2 weeks; any | Amber; RED for a gate row | `legal/VERIFIED-FACTS.json` |
| L10 | Business-mailbox filter (G2-07). Terms: rights, documentation, blocked, content review, action required, Children's Product Certificate, GPSR, product safety, compliance documents, certificate of insurance | any hit | Line ranked first | A mailbox read key (none exists today) |

### V. Privacy and data
| ID | Signal | Threshold | Action | Needs |
|---|---|---|---|---|
| V1 | Every personalization field in `listing.json`, and every custom field in the store and email platform, compared with `legal/DATA-MAP.json` and the privacy policy | any undeclared field | RED in CI | Data map |
| V2 | Email-platform tags, segments and automations | a name that refers to a hub topic; any automation sending product content to contacts whose source is a hub form | RED | Email platform API |
| V3 | Order-to-print logs and artifacts | contain personalization values | RED; purge | Actions logs API |
| V4 | Open privacy requests | older than 30 days | Amber | — |

### G. Pre-publish checks (a FAIL blocks that item)
| ID | Check | FAIL when |
|---|---|---|
| G1 | `ops/TESTS/check_files.py` | FOUNDER, PLACEHOLDER, [VERIFY], lorem, ____ or "to be supplied" appears; an Etsy or TpT file contains a URL, playbeforepixels.com or a QR image; the page size does not match the trim; a file is over 15 MB, or an Etsy edition has more than 5 files; START HERE is missing; the version footer is missing; footer ink is closer than 0.25 in to the page edge |
| G2 | `ops/TESTS/check_print.py` | Type 3 fonts; footer or margin distance under the minimum for the trim; placeholder text; fewer than 24 pages, or an odd count; the cover width does not match page count and paper; text contrast under 4.5:1 in grayscale, or any gradient, on a black-and-white interior; the proof record is missing |
| G3 | `ops/TESTS/check_queue.py` | health, autism, named-company or marketplace-link patterns in any language; a denylisted hashtag; a forbidden motif; text inside an image fails the same rules; the social AI label is missing; a link points to an item that is not live; a fear or shame word |
| G4 | `ops/TESTS/check_listings.py` additions | authorship text is "ai" on a live product; a CPSIA or GPSR block is missing where required; a counsel-held scope; a grid-parity breach; "backed by research" or "research-based" ("evidence-based" and "supports development" already FAIL); net under the floor with the Gumroad Discover fee case (the Etsy Offsite Ads case is already estimated); a floor stored under any key other than `price_floor` |
| G5 | `ops/TESTS/check_promises.py` | a public promise ("within N business days", "we never ask", "checked by a person", "no child data") contradicts its source of truth |
| G6 | Testimonials, panels, value claims, subscriptions | a quoted testimonial with no ID in `marketing/TESTIMONIALS.json`; public copy that closely matches any `products/*/panel.md`; a "value", "worth" or "save" figure not computed from current prices; a subscription without renewal-reminder and online-cancel settings |
| G7 | `ops/TESTS/check_hub_firewall.py` with HF-19 and HF-20, extended to email funnels and the built site | more than 3 published pages use the term; the term in a queue post without a signed reviewer file; recovery-query impressions; a printable link on a page that reports an autism-score association |
| G8 | `ops/TESTS/check_data_map.py` | same as V1 |
| G9 | CI on `ops/PAUSE` | a commit deletes `ops/PAUSE` while `ops/GATE-A.md` has an open item |

---

## Corrections found while checking the lens inputs

- `business/GROWTH-ENGINE.md` §8 is now headed "Proposed changes (ADOPTED September 28, 2026 …)", and `ops/ROUTINE.md` already carries the loop jobs, the paid-acceleration rules and the scorecard lines. The demand lens's "not applied" is out of date. ROUTINE's own heading still says "binding once adopted" (risk 12, fix 4).
- Gate A has **seven** items, not five, and it already includes "counsel has said yes" and "insurance is bound". The real gap is that the removal test written in `ops/PAUSE`, and `ops/LAUNCH-NOW.md` step 8 ("quote"), don't match it (risks 15 and 26).
- `ops/FULL-STOP.md` now exists, although the "Still to do" list in `ops/GAPS-ROUND-2.md` still names it.
- The experiment numbers EXP-14 to EXP-16 are already used by the GROWTH-ENGINE §8c proposals. The new experiments here are therefore **EXP-17** (routine-card search copy) and **EXP-18** (the no-guilt check).
- Several lenses each proposed a "COMPLIANCE-GATE line 23". One consistent numbering:
  - 23: the second line currently numbered 16 (pricing);
  - 24: the hub firewall (text from AWARENESS-ENGINE §10);
  - 25: talk-tips reviewer record;
  - 26: subscriptions;
  - 27: bundle savings from current prices only.
- The yearly password change in `operations/SOPs/account-security.md` §5 is for the email account. It affects Meta tokens only if it reaches the Meta admin login.
- Rechecked today:
  - `ai_disclosure` is missing in 7 of the 13 non-merch `listing.json` files (14 in all), and in the 3 merch-core entries;
  - the floor check FAILs on 4 of the 5 launch listings: toddler-busy-book and guide-100-plays have no floor; visual-routine-cards and play-first-family-kit have one under the wrong key, `price_floor_usd`; bored-play-cards passes (corrected in verification);
  - the repository is public, and the default branch is `main`.

---

## Needs a live check

_Everything here is UNVERIFIED: it comes from the lens reports or general knowledge, not from a primary source read today. Each item should become a `ops/RESEARCH-BACKLOG.md` entry (risk 31, fix 5). Verified live in this session: the GitHub API reported the repository as public, with 0 forks and 0 stars and default branch `main`, on 2026-09-28 at 04:02 UTC, and again at 04:19 UTC (verification pass)._

**Added in verification**
- GitHub's current size guidance for repositories (recommended and hard limits) and how it applies to a 2.4 GB repository cloned every night.
- Whether the competitor "30–60% sale badges" in risk 21 are still shown in Etsy search results.

**Claude routines, GitHub and Cloudflare**
- The daily routine-run cap, and what happens at the weekly usage limit.
- Whether a run can push to `claude/live`.
- GitHub Actions minutes on the Free plan for private repositories, and how each run is rounded.
- Whether scheduled workflows run only from the default branch.
- What persists after a public repository goes private: forks, cached views, GH Archive, Software Heritage.
- Whether the routine's token can read the traffic endpoints.
- The Cloudflare Workers free-tier cron and KV limits.
- A fine-grained, read-only GitHub token reading a private repository from a Worker.

**Shopify**
- Dev Dashboard 24-hour tokens, and whether the credential form's OAuth 2.0 client-credentials type can mint them.
- How `compareAtPrice` behaves.
- The Payments payout API fields, and holds on new stores.
- The limits of the digital-download app.
- The default international settings in Markets for digital products.

**Etsy**
- Token lifetimes.
- Per-file size and file-count limits.
- New-seller holds and reserves.
- The API state of a listing Etsy deactivated.
- How late dispatch is enforced.
- Whether digital listings accept a SKU.
- Sale and compare-at rules.
- Whether Open API v3 exposes listing views and traffic sources, the exact scope names, and search-term data.
- Review and conversation endpoints.
- A message auto-reply feature.
- How early reviews weigh in search.
- Coupon features: thank-you, abandoned cart, favorited item.
- Whether a download's message to buyers may name other listings in the shop.
- The listing-search endpoint and its data-use terms.
- How sale badges show in search results, and whether competitors' current sale prices are readable.
- Offsite Ads thresholds and rates.
- Case rules for digital items.
- App approval time.
- How long new listings take to be indexed.
- Vacation mode through the API.

**Pinterest**
- Trial compared with Standard API access (sandbox only?).
- Token lifetime.
- Spam thresholds, and how domain blocks work.
- AI labels, and any "see fewer AI pins" control.
- Bulk pin creation and scheduling.
- Unscheduling pins through the API.

**Meta, TikTok, YouTube**
- Meta: the identity rules for Page admins; system-user token lifetime; whether a password change invalidates tokens; Instagram publishing limits; how Hidden Words works, its list limits, and whether a comment's author still sees a hidden comment.
- TikTok: token lifetime (about 24 hours); audit requirements and private-only posting; comment filters.
- YouTube: the audit, and private uploads from unaudited projects; blocked words.

**KDP and IngramSpark**
- KDP: margin minimums (0.375 in reported); rights-verification practice and deadlines; limits on new titles; the AI-disclosure questions and whether buyers see the answers; how gradients print in black and white; color variance between print sites; how returns are reported; delegated read-only reporting; review time (about 72 hours).
- IngramSpark: rules on Type 3 fonts and RGB images; revision fees; duplicate-ISBN rules.

**Gumroad and payments**
- The Discover fee (about 30%) and whether sellers can opt out.
- Payout timing.
- The dispute fee (about $15), fraud tools and dispute-rate limits.
- Merchant-of-record status, and whether Gumroad provides the EU withdrawal function (Directive 2023/2673).
- Stamping the buyer's name into files.

**Google**
- Merchant Center "misrepresentation" criteria.
- Search Console API query-level data for the routine's credentials.
- How long a new domain takes to rank.
- How Google treats child-development topics.

**Monitoring sources**
- Whether Google Alerts RSS, Reddit's search JSON and Bluesky's public search can be reached from the routine environment without logging in, and their terms.
- How Printful's API marks a discontinued variant.

**Legal, tax and regulatory**
- CPSC: whether books designed or intended for children 3 and under fall outside the ordinary-book exemption, and who certifies a print-on-demand book.
- EU GPSR: the "manufacturer" definition and the responsible-person duties for print-on-demand books and merch; what KDP, IngramSpark and Etsy require.
- VAT: UK registration from £0 for non-established sellers of goods located in the UK; EU VAT or OSS when print-on-demand is fulfilled inside the EU; how far marketplace deemed-supplier rules reach.
- US privacy laws: the scope of Washington's My Health My Data Act for inferred data and out-of-state sellers; Nevada SB 370; the Maryland Online Data Privacy Act's thresholds and its rules on minors and sensitive data; Connecticut's July 1, 2026 amendment.
- COPPA: the amended rule's compliance date and its child-directed factors.
- FTC rules: the current 16 CFR 465 penalty amount (about $53,000 per violation reported); 16 CFR 233.1; ROSCA and state auto-renewal laws (Maryland HB 107, California).
- Copyright Office: the fee-change date (about November 12, 2026); pseudonymous-author registration; AI-disclaimer rules.
- USPTO: whether the correspondence email is visible; Statement of Use and extension fees (about $125 per class); domicile rules; Trademark Center identity checks.
- Maryland: whether AlphaPlay LLC's 2026 annual report was filed; what forfeiture means for members; personal liability for sales tax collected but not paid; the scope of the 3% IT and data services tax.
- The INFORM Act's $20,000 threshold, and what Etsy's EU trader page displays.
- Whether Google and Etsy pass a DMCA complainant's identity on (Lumen).
- Whether general-liability products-completed operations coverage includes injuries from following printable instructions, and whether media liability covers the hub.
- Whether Kickstarter displays a verified name.
- Google's PLAY and PIXEL registrations in classes 9, 16, 28 and 41.
- Who owns and uses alphaplaykids.com.
- The registration status of playbeforepixels.com and .org.
- The 2025–26 US federal announcements on autism causes, and how autistic advocacy groups responded.
- The AI rules of each target award.

---

## Verification

_An adversarial re-check on September 28, 2026, 04:19–04:35 UTC. Every check below was recomputed from the source files, not from this report. Tools that were re-run: the GitHub API (unauthenticated), `python3 ops/TESTS/check_listings.py --json` (output to a scratch folder, not the repository), `python3 ops/TESTS/check_hub_firewall.py --site site-concepts/winner --strict`, and grep counts across tracked files. No file outside this report was edited._

**Confirmed as written**
1. The repository is public, with 0 forks, 0 stars and default branch `main` (API at 04:19 UTC; branches `claude/live` and `main`; `has_pages: false`). The "PENDING · URGENT" line is in `ops/APPROVALS.md`.
2. The cited `ops/CLOUD-RUNBOOK.md` passages exist and say what the report says: setup steps 1–4; open risks #1, #5 (30-hour heartbeat check proposed, not in ROUTINE), #6, #7, #9, #10, #11, #13 and #14; and the "Max-plan facts" (72-hour rule, green is not success, connectors).
3. The `ops/ROUTINE.md` citations hold: step 0.1 (limit path), 0.4 (stops publishing, not committing), 0.5 (lock), 0.7 (14-day token warning), 0.8 (no seasonal carve-out); §5 caps of 5 Etsy and 2 KDP a week; §5b reviews and refunds; "Every live product stays live"; the "binding once adopted" heading; the founder time cap, where key renewals are not in the rank-first class; and "Founder updates = money".
4. The following do not exist: `.github/`, `ops/experiments/`, `ops/TESTS/experiment_stats.py`, `ops/moderation-words.md`, `operations/SOPs/reviews.md`, `operations/SOPs/refunds-and-disputes.md`, `operations/REVIEWS-AND-CRITICISM.md` and `site/`. Every file the report cites as an existing protection does exist.
5. `ops/SECRETS.md` scopes are as stated: Etsy "list and update", Pinterest "publish pins", and Shopify with no analytics scope. `SHOPIFY_ADMIN_TOKEN` is still listed, and there is no `SUPPORT_MAILBOX_*` key.
6. `ops/COMPLIANCE-GATE.md` runs 1–22 and then has a second line 16 (pricing).
7. `operations/customer-service/FAQ.md` lines 13 and 30 promise "2 business days", line 27 is the illustration placeholder, and macro 37 says "2 días hábiles".
8. `ops/DEADLINES.md` holds only legal, tax and renewal dates. `ops/MONITORING.md` covers uptime only. `ops/PLATFORM-NEWS.md` and `ops/COPYCAT-LOG.md` have no rows.
9. Gate A has seven items. `ops/LAUNCH-NOW.md` Wave 0 step 8 says "Get an insurance quote", and Wave 0 has no "make the repository private" step.
10. The G2-25 questions and the records-preservation question are not in `legal/FOR-EMPLOYMENT-COUNSEL.md`, which was last changed September 27. They were checked by keyword only.
11. Counts:
    - UNVERIFIED and [VERIFY] marks in `legal/`, `finance/` and `commerce/`: 537 case-insensitive (479 case-sensitive), which matches "about 540";
    - HF-01 to HF-18 are in `check_hub_firewall.py`, and EXP-14 to EXP-16 are used, so EXP-17 and EXP-18 are the right next numbers;
    - the creation log has one filled work (the logo);
    - the order-to-print poller runs every 15 minutes, which is about 2,880 runs a month.
12. Figures in `business/STRESS-TEST.md`:
    - each month of slip costs $1,300–$1,600 (§2);
    - Etsy is $2,493 of $5,831 in median year-1 sales, about 43% (§3);
    - account risk is out of scope (§7);
    - lean fixed costs are $567 a month.
13. The CPSIA contradiction is real: the `legal/LEGAL-LAUNCH-CHECKLIST.md` notes say paperboard books are "generally treated as ordinary books", while `legal/protection/PROTECTION-PLAN.md` §4 excludes books for children 3 and under.
14. The educator wording is where the report says: "Single-classroom" in bored-play-cards; `seo/articles/09` with an educator audience and `publish_gate: none`; "coaching", "Work with me" and "For teachers" in the root `index.html`; and `legal/COACHING-WORKSHOP-TERMS.md` still exists.
15. The ranked table checks out: all 47 L × I products match their scores, the order never rises, and every detail header matches its table row.

**Corrected in place (overstated, understated or wrong)**
- **Risks 4 and 28:**
  - Audit items H1–H3 were already fixed at 03:22 UTC (commit 787f594), so they were removed as open gaps.
  - The site-concept problem was understated. The retired hub name appears 21 times across 9 winner files, including the site-wide mega menu, and the firewall check returns an HF-15 FAIL. The audit items are W1–W11, not W1–W6.
- **Risk 1:** the exclusion names were understated. They are in 29 tracked text files, not two, and `legal/ENTITY.md` records a street address. Fix 5 was reframed to match.
- **Risks 30 and 38, and the rechecked list:**
  - "`price_floor` empty on 4 of 5" was overstated. Two launch listings have no floor, and two have one under the key `price_floor_usd`. All four lack a per-channel net.
  - Missed: the Starter's $4.50 price breaks the $5 minimum and differs from the $5.00 in QUEUE.
  - The routine-card "$9.50 / ~$6.50" pairs in QUEUE belong to the community editions. The base-card pair is in `business/REVENUE-PLAN.md`.
- **Risk 38:**
  - The fee table already has an Etsy Offsite Ads case. Only Gumroad's Discover case is missing.
  - "$567 is above average monthly sales" holds for the Monte Carlo median (about $525 a month), not for the Expected case (about $940 a month).
- **Risk 28 and G4:**
  - `check_listings.py` already FAILs "evidence-based" and "supports development". Only "backed by research" and "research-based" are uncaught.
  - The check does not read the site.
- **Risk 21:** the busy book has 132 pages, which meets the DEMAND-CHECK §3 page spec (120–150). The "below spec" claim compared activities with pages. The spec's section reference was also corrected from §2 to §3.
- **Risk 23:** "Screen Reset" is in 47 files, including buyer-facing FAQ and macro text, three SEO articles and the winner site. It had been reported in three marketing files.
- **Risk 7:** the preflight's current count is 50 FAIL home-print files, not 58 (from its own 03:40 re-check).
- **Risk 6:** ENTITY.md and PROTECTION-PLAN §1 do not strictly disagree, because ENTITY.md allows a commercial agent's office. The decision is simply not made.
- **Risk 15:** the `ops/PAUSE` removal test covers counsel indirectly, through "the launch gate". It still does not name counsel or insurance, and its text about `ops/FULL-STOP.md` is stale.
- **Risk 16:** the monthly close's 13-week forecast does consider Etsy holds and reserves. The gap is that nothing detects them when they happen.
- **Risk 20:** the Actions-minutes problem starts once the repository is private.
- **Risk 26:**
  - Added: LAUNCH-NOW's own "insurance is in place before the first sale" contradicts its step 8.
  - Added: checklist row 14 still quotes coaching E&O.
- **Risk 34:** about 110 subscribers by January 31 is the model path itself, not a shortfall.
- **Risk 40:** whether the September 15 estimate was owed is now framed as an accountant question.
- **Protections downgraded to gaps, because they cause the risk or are the promise under test:**
  - COMPLIANCE-GATE line 16 (risk 34);
  - ROUTINE "Never run out of products" (risk 44);
  - `legal/PRIVACY-POLICY.md` §1–§2 and the CAMPAIGN-BIBLE [COPPA] rule (risk 39).
- **Time estimates:** the four decisions take about 20 minutes, not 15, by `ops/APPROVALS.md`'s own estimates (10 + 5 + 3, plus the new line). The pending founder-story SITE-SAFE CUT line is now named with them. Your part of the Top 10 is still about 25 minutes (fix 1 plus the four decisions); the SITE-SAFE CUT line adds about 5.

**Missed by the synthesis (added)**
- `check_listings.py` FAILs 15 of 17 listing records, and 4 of the 5 Wave 1 launch products. Gate A item 6 cannot pass until these are fixed (risk 11, short version item 6, and "Next in line").
- The AlphaPlay LLC owner line is missing on four launch listing records (risk 27).
- The launch lists disagree: `ops/LAUNCH-NOW.md` Wave 1 and `ops/QUEUE.md` "G-day week" name different products (risk 11).
- The repository is growing fast: about 2.4 GB on GitHub at 04:26 UTC, against 1.09 GB earlier the same night. Added to risk 2, with signal A12.
- Not added to the ranked list, but worth a line: "key person unavailable" (`business/sections/05-operations-risk-milestones.md` §5.9 risk 7; `marketing/BLIND-SPOTS.md` #20) has no entry here. Maintenance mode (step 0.8) covers only the approvals side. If it is ranked later, it fits near risk 27 (the LLC shield) as a continuity plan: who can reach the accounts and the LLC if you cannot.

**Not re-checked:** the Signals tables' thresholds (they are proposals), and every item under "Needs a live check" (the web is not reachable from this session).
