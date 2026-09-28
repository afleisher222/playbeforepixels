# Research backlog (ranked; answered from primary sources by the routines)

_Rebuilt September 28, 2026 from a full scan of the repository (Appendix A) plus the research that would most change decisions but had not been done. The daily studio takes the top 2 open items and the weekly research takes the top 10 (ops/ROUTINE.md §1), in the order of the ranking table below. The build session that wrote this file had no web access, so nothing here has been checked on a live page: every "current belief" line is model knowledge, marked UNVERIFIED, and repeated under "Needs a live check" at the end._

_To pick work, the H-items, the ranking table and the item texts are enough. Appendix A at the end is an index of every mark in the repository; open it only when an item points to a Q-number._

_Network: until the "Play Before Pixels" cloud environment exists (ops/CLOUD-RUNBOOK.md, setup step 4), runs use the Default "Trusted" network, which blocks almost every host named here. A run that is blocked writes "blocked: <host>" under the item, and the item stays open._

## Research hub verification (runs first once the allowlist is live)

_Added September 28, 2026 by the hub launch-readiness pack (`content/research-hub/review/REVIEW-PACK.md`, section 1, step 1). **Gate:** at the start of the backlog step, fetch `https://pubmed.ncbi.nlm.nih.gov/` once. If it answers `403 host_not_allowed`, skip H1–H7 (they do not count toward the run's top 2 or top 10), write "H-items waiting for the allowlist" in the run log, and carry on with the ranked RB items below. Once it answers: the daily studio takes **one** H-item as its first backlog item and then the top-ranked open RB item; the weekly research run takes up to **three** H-items, then ranked RB items up to its 10. For every source, follow "How to clear an item" in `content/research-hub/verification-queue.md` (PubMed, Europe PMC, Crossref or OpenAlex when the publisher page is blocked). Confirm or delete each claim on the six review pages (index, faq, glossary, pediatrician-questions, early-intervention, editorial-policy), log each source in ops/RESEARCH-LOG.md, answer the matching open questions in the queue, and write "blocked: <host>" for any host that refuses. When H1–H7 are all ticked, do step 4 of the pack (freeze the review version)._

- [ ] H1. **Allowed-list sources and AAP 2026.** harle-2019, heffler-2020, kushima-2022, takahashi-i-2023, brushe-2024, madigan-2019, who-2019-under-5-guidelines, aap-2016-media-and-young-minds, aap-2026-digital-ecosystems (policy statement and technical report). If AAP 2026 replaces the 2016 advice, rewrite index.md and faq.md Q17–Q18 and add one line to ops/APPROVALS.md about BRAND.md rule 5 (do not edit BRAND.md).
- [ ] H2. **Balancing evidence.** ophir-2023-meta-analysis, melchior-2022-elfe, takahashi-n-2023-genetics, lin-2025-lsac, cai-2025-mendelian-randomization, zhang-2023-shared-genetic-risk, montes-2016, yamamoto-2023-jecs.
- [ ] H3. **Critiques and autistic voices.** krijnen-2026-autism, van-asselt-2026, autismus-deutschland-statement, detroja-bhatia-2024, dhungel-2026, smc-2020-expert-reaction, alper-2020-letter, psihologia-ro-critique, psychologiescientifique-critique.
- [ ] H4. **Where the term came from.** zamfir-2018, marcelli-2018-epee, ecrans-et-autisme-2017-handout, heffler-oestreicher-2016, waldman-2008, dunckley-electronic-screen-syndrome, pouretemad-2022-pdnas, ozyazici-2026, sadeghi-2021-parent-child-interaction.
- [ ] H5. **Screening and case studies.** sundarimaa-2025-singapore, chonchaiya-2011, tunisia-2025-screen-patterns, hill-2024, hill-2020, heffler-2022-case-report, apims-2023-pakistan, hermawati-2018, yuan-jadd-systematic-review.
- [ ] H6. **Reviews and context.** liu-2025-meta-analysis, sarfraz-2023-systematic-review, slobodin-2019-review, madigan-2020-language-meta-analysis, mallawaarachchi-2024-contexts, lin-yh-2022-screen-timing-letter, georgia-2025-bmc-pediatrics, rangaraj-2026, chen-2020-mediation.
- [ ] H7. **Last studies and the non-study facts.** spitzer-2023, authorea-2025-preprint; then every line under "Non-study facts on the hub that need an official source" in verification-queue.md (IDEA Part C and Part B from www.ecfr.gov and sites.ed.gov; CDC and ECTA directories; AAP screening schedule; UK, Canada and Australia pointers; ICD/DSM statements; glossary instrument descriptions; reply-time wording).

## How to work an item

1. H1–H7 above follow their own gate and order. For everything else, take the highest-ranked open RB item whose gate is open. If its gate is closed (a founder OK, a login, a later wave), write one line under the item saying why, add one line to ops/APPROVALS.md only if the item says to, and take the next item. The number of items worked stays 2 (daily studio) or 10 (weekly research).
2. Answer the question from the primary source named in the item: the platform's own help, fee, policy or developer page, the government or registry page, or the paper itself. A blog, forum or search snippet is never enough to clear a mark.
3. Update every file the item names, remove only the UNVERIFIED and [VERIFY] marks the answer settles, and add a dated source line where the file keeps sources. Files under products/, brand/, content/ and site-concepts/ are changed through the normal build path (ops/ROUTINE.md §2); a changed number in a listing re-runs `python3 ops/TESTS/check_listings.py`. A binding rules file (brand/BRAND.md, legal/ENTITY.md, CLAUDE.md) is never edited on a routine's own judgment: put the proposed change in ops/APPROVALS.md.
4. Tick the item: `- [x] RB-nn · 2026-10-04 · <one-line answer> (source: <url>)`, and move it to "Done". If a platform rule changed since the file was written, also log it in ops/PLATFORM-NEWS.md.
5. A site the routine cannot reach gets `blocked: <host>` under the item, and the item stays open. Hosts this backlog needs that are not yet on ops/cloud/allowed-domains.txt are listed near the end of this file.
6. Never copy a "current belief" line into another file as fact. It is there to tell the routine what to look for and what would change if it is wrong.
7. Line numbers come from the scan of September 28, 2026. Product and brand files were being edited that day, so if a line has moved, search for the quoted text.
8. Research is reading. Never bulk-fetch search-result pages, never automate a logged-in session, and never call an undocumented endpoint (for example Amazon's autocomplete service): treat all of that as the scraping ops/ROUTINE.md §5 forbids. Use official APIs once their keys exist, or read a handful of public pages the way a person would.

## How items are ranked

Score = (decision impact × risk if wrong) ÷ effort, each on a 1–5 scale.

- **Impact (I):** 5 = decides whether, where or at what price a launch product sells, or blocks launch; 4 = changes a Wave 1 setting, listing or printed copy; 3 = changes a Wave 2 book, a channel choice or a cost line; 2 = a later wave; 1 = record-keeping.
- **Risk if wrong (R):** 5 = account suspension, a legal or safety problem, or a lost trademark or domain; 4 = listings removed, refunds or a tax bill; 3 = lost sales or weeks of wasted work; 2 = a small cost; 1 = negligible.
- **Effort (E):** 1 = one official page, under 30 minutes; 2 = a few pages or one calculator; 3 = several platforms or sources; 4 = a full research lane; 5 = several runs, founder logins or outside quotes.
- Ties go to the lower effort, then the lower ID. IDs never change: RB-01 to RB-13 are the old items 1–13 that ops/SECRETS.md, ops/CLOUD-RUNBOOK.md and ops/FULL-STOP.md refer to.

## Ranking (work down this list)

| Rank | ID | Question in brief | I×R÷E | Score | Gate |
|---|---|---|---|---|---|
| 1 | RB-43 | Is playbeforepixels.com still unregistered? | 5×5÷1 | 25 | none |
| 2 | RB-01 | Can a routine push to `claude/live`? | 5×4÷1 | 20 | first scheduled run |
| 3 | RB-23 | ALPHAPLAY SN 99650345: live status, deadline, fees, specimens | 4×5÷1 | 20 | none |
| 4 | RB-09 | Does Etsy collect VAT/GST on our digital downloads abroad? | 4×4÷1 | 16 | none |
| 5 | RB-16 | AI disclosure rules on Etsy and KDP (and Gumroad, IngramSpark) | 5×5÷2 | 12.5 | none |
| 6 | RB-22 | Trademark knockout: PLAY BEFORE PIXELS and Play-First Family Kit | 5×5÷2 | 12.5 | founder OK (see item) |
| 7 | RB-08 | Gumroad: API reach, merchant-of-record coverage, payouts | 5×4÷2 | 10 | none |
| 8 | RB-18 | Current fees on the launch channels (Etsy, Shopify, Gumroad) | 5×4÷2 | 10 | none |
| 9 | RB-29 | Allowed citations printed in launch products, and the two missing from the hub queue | 4×5÷2 | 10 | none |
| 10 | RB-30 | Are the safety and health facts printed in launch products right? | 4×5÷2 | 10 | none |
| 11 | RB-07 | TikTok and YouTube uploads from unaudited apps | 3×3÷1 | 9 | none |
| 12 | RB-10 | KDP marketplaces and board-book options | 3×3÷1 | 9 | none |
| 13 | RB-34 | Copyright Office fee change and AI registration rules | 3×3÷1 | 9 | none |
| 14 | RB-21 | New-shop risks: holds, reserves, verification, review, spam flags | 5×5÷3 | 8.3 | none |
| 15 | RB-31 | Maryland sales tax on digital products; marketplace facilitators | 4×4÷2 | 8 | none |
| 16 | RB-32 | Etsy rules for digital listings, links, reviews and duplicates | 4×4÷2 | 8 | none |
| 17 | RB-03 | Etsy Open API v3 access, tokens and listing endpoints | 5×3÷2 | 7.5 | none |
| 18 | RB-14 | Search demand for each launch product (English) | 5×3÷2 | 7.5 | parts need founder logins |
| 19 | RB-28 | Holiday 2026 demand timing and cutoffs | 5×3÷2 | 7.5 | none |
| 20 | RB-33 | CPSIA status of the 0–3 paperback and the decks | 3×5÷2 | 7.5 | none |
| 21 | RB-38 | ISBN prices and Library of Congress PCN eligibility | 3×2÷1 | 6 | none |
| 22 | RB-02 | Shopify app tokens | 4×3÷2 | 6 | none |
| 23 | RB-04 | Pinterest API v5 access and tokens | 4×3÷2 | 6 | none |
| 24 | RB-06 | GitHub commit authorship | 3×4÷2 | 6 | none |
| 25 | RB-12 | Listing field limits in the checker | 4×3÷2 | 6 | none |
| 26 | RB-20 | KDP print cost, royalty and file checks for the Wave 2 books | 4×3÷2 | 6 | none |
| 27 | RB-24 | Logo side-by-side against lookalikes | 3×4÷2 | 6 | after the v2 logo is chosen |
| 28 | RB-27 | EU GPSR responsible person for printed books | 3×4÷2 | 6 | none |
| 29 | RB-35 | Own-site digital delivery and EU/UK buyers on Shopify | 4×4÷3 | 5.3 | none |
| 30 | RB-25 | Competitor price and review scan for each launch product | 5×3÷3 | 5 | none |
| 31 | RB-17 | AI rules on TpT, Pinterest, Meta, TikTok, YouTube, Merch, Google | 3×3÷2 | 4.5 | none |
| 32 | RB-26 | Social posting API access for a brand-new small business | 4×3÷3 | 4 | none |
| 33 | RB-36 | Email platform: free tier, automations, API | 3×2÷2 | 3 | none |
| 34 | RB-37 | Print-on-demand partner costs and specs (merch, decks) | 3×2÷2 | 3 | none |
| 35 | RB-39 | BISAC codes and ASL signs in the books | 2×3÷2 | 3 | none |
| 36 | RB-40 | US tax calendar, information-return thresholds, BOI | 2×3÷2 | 3 | none |
| 37 | RB-42 | Printed neck labels (FTC textile and care rules) | 2×3÷2 | 3 | none |
| 38 | RB-05 | Stop controls for ops/FULL-STOP.md | 3×3÷3 | 3 | none |
| 39 | RB-41 | Privacy duties at site launch | 3×3÷3 | 3 | none |
| 40 | RB-46 | Maryland entity fees; how platforms show seller addresses | 1×2÷1 | 2 | none |
| 41 | RB-47 | URL patterns and handle rules | 2×1÷1 | 2 | accounts exist |
| 42 | RB-48 | Affiliate programs | 1×2÷1 | 2 | none |
| 43 | RB-49 | Accessibility law dates | 1×2÷1 | 2 | none |
| 44 | RB-11 | Multi-network posting service | 2×2÷2 | 2 | none |
| 45 | RB-44 | Other event dates in the next 8 weeks | 2×2÷2 | 2 | none |
| 46 | RB-45 | Google Search and Merchant Center guidance | 2×2÷2 | 2 | none |
| 47 | RB-15 | Search demand for the Spanish editions | 3×2÷3 | 2 | after English launch files are final |
| 48 | RB-19 | Fees on every other channel | 3×2÷3 | 2 | none |
| 49 | RB-50 | International tax and consumer law, region by region | 2×3÷4 | 1.5 | ops/INTERNATIONAL.md step |
| 50 | RB-51 | Live checks listed in ops/EXPERIMENTS.md | 3×2÷4 | 1.5 | none |
| 51 | RB-52 | Demand for the next queue items (community editions) | 3×2÷4 | 1.5 | none |
| 52 | RB-53 | Paid-ads cost per click | 2×2÷3 | 1.3 | none |
| 53 | RB-54 | Personalized keepsake workflow | 2×2÷3 | 1.3 | Wave 3 |
| 54 | RB-55 | Insurance, attorney and accountant quotes | 3×2÷5 | 1.2 | founder |
| 55 | RB-58 | Market-size figures | 1×1÷1 | 1 | none |
| 56 | RB-59 | Outreach list facts | 1×3÷3 | 1 | before an approved message |
| 57 | RB-60 | Translator and sensitivity-reader rates | 2×1÷3 | 0.7 | none |
| 58 | RB-56 | Other business-tool prices | 1×1÷2 | 0.5 | none |
| 59 | RB-57 | Awards, conferences and marketing placements | 1×1÷2 | 0.5 | none |
| 60 | RB-61 | Retail, wholesale, FBA, 3PL and offset printing | 1×2÷5 | 0.4 | retail gate (units sold) |

Held until employment counsel answers: every school- and group-facing question (Appendix A, Q49; the TpT classroom line; PTA and fundraiser rules; standards alignment; SAM.gov). They are not ranked.

---

## Do next (the top 10)

- [ ] **RB-43 · Is `playbeforepixels.com` still unregistered?** · score 25 (5×5÷1)
  - **Question:** Is the brand's .com still free today? If it is, add one line to ops/APPROVALS.md: "Buy playbeforepixels.com (Wave 0 step 5)". If someone other than AlphaPlay LLC has registered it, put that finding first in ops/APPROVALS.md, because the name decision in legal/DECISION-MEMO.json rests on owning it.
  - **Why it matters:** Every file, logo lockup, QR code, listing and the trade-name filing assumes this domain. It was unregistered on September 28, 2026, and anyone can take it. After a check that finds it still free, write "still free on <date>" under the item; the item then does not count toward a run's top 2 or top 10 for 7 days. Re-check weekly until RDAP shows AlphaPlay LLC's registration, then tick the item.
  - **Primary source:** the Verisign RDAP record, `https://rdap.verisign.com/com/v1/domain/playbeforepixels.com` (host not yet allowed; see the hosts list). A DNS lookup is only weak evidence: no answer can also mean registered but parked without DNS.
  - **Update:** legal/domain-portfolio.md (row 1 status), ops/LAUNCH-NOW.md:23, commerce/links.schema.md:15, ops/APPROVALS.md. brand/ORIGINALITY.md:260 through the normal path.
  - **Settles:** part of Q33.
  - **Observed in this session:** a DNS lookup on September 28, 2026 returned no address for playbeforepixels.com.

- [ ] **RB-01 · Claude Code cloud: can a routine push to `claude/live`?** · score 20 (5×4÷1)
  - **Question:** The docs say the GitHub proxy lets `git push` reach "only the session's current working branch." Confirm from the first scheduled run that `origin/claude/live` moved. If the push is refused, write down the exact error.
  - **Why it matters:** If runs cannot push, nothing any routine does is saved, including the answers to every other item here.
  - **Primary source:** the run's own push result; code.claude.com/docs/en/cloud-environments (GitHub proxy) and /routines.
  - **Update:** ops/CLOUD-RUNBOOK.md, ops/ROUTINE.md step 0.1, ops/TESTS/routine-dry-run.md:37.
  - **Settles:** no marks (process check).

- [ ] **RB-23 · ALPHAPLAY, Serial No. 99650345: live status, the March 8, 2027 deadline, current fees and specimen rules** · score 20 (4×5÷1)
  - **Question:** What does TSDR show today: status, Notice of Allowance date (expected September 8, 2026), the Statement of Use or extension deadline (expected March 8, 2027), the classes and goods, and whether the owner and correspondence address is still the old one? What does the USPTO charge now, per class, for a Statement of Use and for each six-month extension? What specimen does the USPTO accept for downloadable printable course materials (class 9), printed instruction sheets (class 16) and games (class 28)?
  - **Why it matters:** Missing the deadline abandons the mark. The application has 5 classes, so the per-class fee decides how much keeping or deleting classes costs. The specimen rule decides what the ALPHAPLAY Spelling Games product page must show, and that product must be on sale by mid-January (ops/QUEUE.md:15).
  - **Primary source:** `https://tsdr.uspto.gov/#caseNumber=99650345&caseType=SERIAL_NO&searchType=statusSearch` (or `https://tsdr.uspto.gov/statusview/sn99650345`); the USPTO fee schedule, `https://www.uspto.gov/learning-and-resources/fees-and-payment/uspto-fee-schedule`; TMEP chapters 900 (use and specimens) and 1100 (intent-to-use, extensions) at tmep.uspto.gov.
  - **Update:** legal/ENTITY.md:37 (fee [VERIFY]; propose through ops/APPROVALS.md, since it is a binding file), ops/DEADLINES.md:5, legal/DECISION-MEMO.json:59 (trademark_plan step 0), marketing/BLIND-SPOTS.md:114, business/REVENUE-PLAN.md:141, ops/QUEUE.md:15. If TSDR still shows the old address, one line in ops/APPROVALS.md: "File the free TEAS change-of-address form for SN 99650345."
  - **Settles:** part of Q21.
  - **Current belief (UNVERIFIED):** the repo uses $150 per class for a Statement of Use and $125 per class per extension. The USPTO fee rule that took effect in January 2025 changed several intent-to-use fees, and the extension fee may now be higher (possibly $250 per class). Up to five extensions are allowed, and the first needs no showing of good cause.
  - **Note:** TSDR shows the owner's address. Never copy a street address into this repository (legal/ENTITY.md).

- [ ] **RB-09 · Does Etsy collect and remit VAT/GST on digital downloads sold to buyers outside the US?** · score 16 (4×4÷1)
  - **Question:** For which countries (EU, UK, Norway, Switzerland, Australia, New Zealand, Canada and others) does Etsy act as the seller for VAT/GST on digital items, and does anything remain the shop's job (registration, invoices, showing tax-inclusive prices)?
  - **Why it matters:** ops/LAUNCH-NOW.md sells digital products worldwide on day one through Etsy. If Etsy does not cover a country, AlphaPlay LLC may owe that country's tax from the first sale (legal/international-plan.md §5), and the listing must exclude it or go through the merchant of record instead.
  - **Primary source:** help.etsy.com VAT and GST articles for sellers, and `https://www.etsy.com/legal/fees`.
  - **Update:** ops/LAUNCH-NOW.md:13 ("The honest picture"), legal/international-plan.md:207-209, legal/LEGAL-LAUNCH-CHECKLIST.md:38 (row 19), finance/money-and-tax-setup.md (payout and tax table).
  - **Settles:** part of Q16.
  - **Current belief (UNVERIFIED):** Etsy collects VAT on digital items sold to EU, UK, Norwegian and Swiss buyers, and GST for Australia and New Zealand, as the marketplace. Canadian GST/HST coverage for digital items is less certain.

- [ ] **RB-16 · AI disclosure on the launch channels: Etsy and KDP (plus Gumroad and IngramSpark)** · score 12.5 (5×5÷2)
  - **Question:** For each channel: are items whose illustrations, layouts and draft text were made with AI help allowed; is disclosure mandatory; where does it go (a listing-form attribute, a creation question, the description, the KDP publishing form); what are the exact current words and choices; how does the platform define "AI-generated" versus "AI-assisted"; and is there any limit on how many AI-assisted titles or listings a new account can publish?
  - **Why it matters:** Every launch listing carries an `ai_disclosure` block, and ops/COMPLIANCE-GATE.md:21 (#17) fails any blank or wrong field. A wrong answer risks listing removal or account suspension on the two channels that Wave 1 and Wave 2 depend on. Our illustrations are vector drawings generated with Claude Code from the brand's symbol library, so whether that counts as "AI-generated images" under KDP's definition matters.
  - **Primary source:** Etsy Creativity Standards and the listing-form help (help.etsy.com, www.etsy.com/legal); KDP Content Guidelines, AI section (kdp.amazon.com/en_US/help/topic/G200672390) and the publishing form; gumroad.com/help (content policy); www.ingramspark.com (content and AI policy).
  - **Update:** the `ai_disclosure` block in every launch listing (products/visual-routine-cards/listing.json and listing-starter.json, bored-play-cards, play-first-family-kit, toddler-busy-book, guide-100-plays) and in the Wave 2 books (picture-tablet-slept, board-up-go-more, course-screen-reset, play-talk-cards), through the build path; ops/COMPLIANCE-GATE.md:21; ops/TESTS/check_listings.py:1127, 1613-1614; ops/TESTS/listing-qa.md:1974-1975; ops/GAPS-ROUND-2.md:132 (G2-08); marketing/BLIND-SPOTS.md:94; content/research-hub/editorial-policy.md:25; legal/protection/PROTECTION-PLAN.md (AI section). brand/BRAND.md "Human authorship" only through ops/APPROVALS.md.
  - **Settles:** Q01 (with RB-17).
  - **Current belief (UNVERIFIED):** Etsy's 2024 Creativity Standards allow items made with AI tools under "Designed by" the seller and expect the seller to disclose AI use; whether this is a form attribute or description text is unclear. Since September 2023 KDP asks, when a title is published or republished, whether its text, images or translations are AI-generated; content the author created and only edited or refined with AI ("AI-assisted") need not be disclosed; the answers are not shown to buyers. KDP also limits how many new titles an account can create per day.

- [ ] **RB-22 · Trademark knockout screen: PLAY BEFORE PIXELS, and the launch name Play-First Family Kit** · score 12.5 (5×5÷2)
  - **Question:** In USPTO Trademark Search, are there live applications or registrations for PLAY BEFORE PIXELS or close variants (PLAY B4 PIXELS, *BEFORE PIXELS, PLAY BEFORE SCREENS, PLAY FIRST) in classes 9, 16, 25, 28, 35 and 41? Same screen for "Play-First Family Kit", "Play First, Then Screens" and "Together tokens" (launch product #3), and "Talk-Along Firsts". Record owner, serial, status and goods for each hit. This is a screen, not clearance: the attorney still clears and files.
  - **Why it matters:** The brand name and launch product #3 go on every listing. A blocking mark found after listings collect reviews means a rename that throws away that history. legal/DECISION-MEMO.json:5 already rates PLAY BEFORE PIXELS as weak (possible failure-to-function refusal, TMEP 1202.04), and the class 28 question is open (business/BUSINESS-PLAN.md:2200, A81).
  - **Gate:** legal/DECISION-MEMO.json:59 says every trademark step waits for employment counsel's go-ahead. A read-only search files nothing, but it is still a step on that list. If ops/APPROVALS.md has no founder OK for "read-only trademark search before counsel answers", add that one line and skip to the next item.
  - **Primary source:** tmsearch.uspto.gov (word marks, and each class); TMEP 1202.04 at tmep.uspto.gov; WIPO Global Brand Database (branddb.wipo.int) and TMview (tmdn.org) for other countries (hosts not yet allowed).
  - **Update:** brand/ORIGINALITY.md A1 and A15 (lines 29, 43) and §4a-4b (lines 206-245), legal/DECISION-MEMO.json:59, the trademark `human_todo` line in products/play-first-family-kit/listing.json ("[VERIFY with the trademark search routine]"), business/BUSINESS-PLAN.md:2200.
  - **Settles:** part of Q21.
  - **Current belief (UNVERIFIED):** class 9 covers downloadable printables and e-books, 16 printed matter, 25 clothing, 28 games and playing cards, 35 retail store services and 41 education and entertainment services.

- [ ] **RB-08 · Gumroad: what the API can do, where it is the merchant of record, and how it pays a new creator** · score 10 (5×4÷2)
  - **Question:** Can the API create products and upload files, or only read sales and edit products? Which countries' VAT and GST does Gumroad collect as merchant of record, and does its checkout give EU/UK buyers the immediate-access waiver for digital content? What does it charge on direct sales and through Discover, and does it hold a new creator's first payouts?
  - **Why it matters:** Gumroad is the worldwide digital channel and the answer to foreign tax in ops/LAUNCH-NOW.md. If it cannot create products by API, every new product needs an upload packet; if it does not cover a country's tax, that country moves elsewhere.
  - **Primary source:** gumroad.com/pricing, gumroad.com/help, and the API documentation on gumroad.com.
  - **Update:** ops/LAUNCH-NOW.md:67 (Wave 1 and platform table), legal/LEGAL-LAUNCH-CHECKLIST.md:38 (row 19), commerce/storefront-setup-guide.md:191-195, legal/international-plan.md:280 and 287, ops/SECRETS.md, ops/CLOUD-RUNBOOK.md (Gumroad row). Also answer the Gumroad questions in ops/EXPERIMENTS.md (sale fields, product views, ratings, receipts).
  - **Settles:** part of Q08 and Q16.
  - **Current belief (UNVERIFIED):** Gumroad has been merchant of record for all sales since January 1, 2025, collecting US sales tax and EU/UK VAT; it charges 10% + $0.50 on direct sales and about 30% on Discover sales.

- [ ] **RB-18 · Current fees on the launch channels: Etsy, Shopify (plan and Payments) and Gumroad** · score 10 (5×4÷2)
  - **Question:** What are today's Etsy listing, transaction, payment-processing, Offsite Ads and shop-setup fees; the Shopify Basic plan price and the Shopify Payments online card rate and chargeback fee; and Gumroad's fee? Then fix the fee model everywhere it is used.
  - **Why it matters:** Prices, price floors and every `net_per_unit_by_channel` figure come from these numbers. The scan found a live conflict: ops/TESTS/check_listings.py:81 models the merchant of record at 5% + $0.50, while business/BUSINESS-PLAN.md:2254-2255 and commerce/storefront-setup-guide.md:192 use Gumroad at 10% + $0.50, so the checker overstates the course's net.
  - **Primary source:** `https://www.etsy.com/legal/fees` and the help.etsy.com Offsite Ads and setup-fee articles; `https://www.shopify.com/pricing` and help.shopify.com (Payments rates, chargeback fee); gumroad.com/pricing.
  - **Update:** ops/TESTS/check_listings.py FEES (lines 78-83) and its "Needs a live check" lines 1606-1608; ops/TESTS/listing-qa.md:29 and 1967-1969; commerce/storefront-setup-guide.md:97 and 168; commerce/PRICING.md:11 and 15; finance/money-and-tax-setup.md:117; business/build_financial_model.py inputs (shop_pct, shop_fix, etsy_tx, etsy_pay, etsy_payfix, etsy_list, etsy_oa, mor_pct, mor_fix) and business/BUSINESS-PLAN.md:2241-2255 (then rebuild the workbook); `price_notes` and `net_per_unit_by_channel` in each launch listing.json (through the build path).
  - **Settles:** Q02, most of Q03, part of Q08.
  - **Current belief (UNVERIFIED):** Etsy: $0.20 per listing (renews every 4 months or on sale), 6.5% transaction fee, US processing 3% + $0.25, Offsite Ads 15% (12% and mandatory above $10,000 in 12 months), a possible one-time $15 setup fee, 2.5% currency conversion. Shopify Basic: $39 a month ($29 billed yearly), Payments 2.9% + 30¢ online, $15 per chargeback. Gumroad: 10% + $0.50.

- [ ] **RB-29 · Allowed citations: the research numbers printed in launch products, and the two allowed sources missing from the hub queue** · score 10 (4×5÷2)
  - **Question:** (a) UNESCO GEM Report 2023 and Delgado et al. 2018 are on the allowed list in brand/BRAND.md:11 but are not in content/research-hub/verification-queue.md, so H1 will never read them: read both and confirm every figure we quote (Delgado: "54 studies, 171,000+ readers, paper advantage"). (b) Check the research figures printed in the launch products against their papers: *100 Screen-Free Plays* cites WHO 2019, AAP 2016 and Brushe 2024 (products/guide-100-plays/listing.json `compliance_notes`), and the campaign bible quotes Brushe's 1,139 adult words, 843 child vocalizations and 194 turns a day. If H1 has already read WHO, AAP and Brushe, use its findings instead of re-reading.
  - **Why it matters:** brand/BRAND.md:11 calls the allowed list "(all verified)", but the hub queue says every Priority 1 source is still unread. H1 cannot run until PubMed is on the allowlist, while the guide is a launch product. A wrong number in a health-adjacent line printed in a product is the brand's biggest credibility risk.
  - **Primary source:** unesdoc.unesco.org (GEM Report 2023, "Technology in education"); the Delgado et al. article, Educational Research Review 2018;25:23-38 (doi.org, www.sciencedirect.com); the WHO guideline (who.int, ISBN 9789241550536); publications.aap.org (Pediatrics 2016;138(5)); the Brushe et al. JAMA Pediatrics 2024 abstract (jamanetwork.com, pubmed.ncbi.nlm.nih.gov).
  - **Update:** content/research-hub/verification-queue.md (add UNESCO GEM 2023 and Delgado 2018 to Priority 1), their study pages and _data/library.json; ops/RESEARCH-LOG.md; marketing/CAMPAIGN-BIBLE.md:70 and 412-414; products/guide-100-plays (listing and source files, only if a quoted number changes); brand/BRAND.md:11 through ops/APPROVALS.md (the "(all verified)" wording and any corrected figure).
  - **Settles:** Q38; the UNESCO and Delgado part of Q41.
  - **Current belief (UNVERIFIED):** Delgado et al. 2018 is "Don't throw away your printed books: A meta-analysis on the effects of reading media on reading comprehension", DOI 10.1016/j.edurev.2018.09.003.

- [ ] **RB-30 · Are the safety and health facts printed in the launch products right?** · score 10 (4×5÷2)
  - **Question:** Check each against its official source: (a) the early-intervention sentence in *100 Screen-Free Plays* ("In the US, every state runs a free early intervention program for babies and toddlers"), against IDEA Part C; (b) the Poison Control number printed in the guide; (c) the small-parts rule behind "every cut piece is larger than a toilet-paper tube"; (d) the choking-food list on the snack and play cards; (e) the balloon, cord and water rules in brand/BRAND.md rule 4 as they appear in the products; (f) the "free early intervention" line in the virtual-autism safe framing.
  - **Why it matters:** These lines are printed in products a parent follows with a young child. A wrong phone number or an over-broad "free" promise is a safety and trust problem that no disclaimer fixes, and printed books cannot be recalled from buyers.
  - **Primary source:** IDEA Part C regulations at ecfr.gov (34 CFR Part 303, including the system-of-payments rule) and sites.ed.gov/idea; CDC "Learn the Signs. Act Early." (cdc.gov); the national Poison Help line page (HRSA, poisonhelp.hrsa.gov, not yet allowed); CPSC small-parts rule, 16 CFR Part 1501 (ecfr.gov) and cpsc.gov guidance; AAP choking-prevention guidance (healthychildren.org, aap.org).
  - **Update:** products/guide-100-plays/source*.html and build/book.js (early-intervention sentence), products/bored-play-cards and products/toddler-busy-book (safety notes, through the build path); ops/TESTS/listing-qa.md:1981 and ops/TESTS/check_listings.py:1620; marketing/CAMPAIGN-BIBLE.md:377 and 420; marketing/AWARENESS-ENGINE.md:51 and 238; brand/BRAND.md:105 through ops/APPROVALS.md if the framing words change. The hub's own page (content/research-hub/early-intervention.md) is H7; share the answer with it.
  - **Settles:** the product and marketing part of Q42; the safety part of Q37.
  - **Current belief (UNVERIFIED):** under Part C, evaluation, assessment and service coordination are free to families, but some states charge sliding-scale fees for some ongoing services, so "free early intervention evaluation" (the campaign bible's wording) is safer than "a free early intervention program". The Poison Help number is 1-800-222-1222. The CPSC small-parts test cylinder is 1.25 in wide, and a toilet-paper tube (about 1.6-1.75 in) is a stricter home proxy.

---

## Queue (ranked, continued)

- [ ] **RB-07 · TikTok and YouTube uploads from unaudited apps** · score 9 (3×3÷1)
  - **Question:** Are TikTok Content Posting API posts from unaudited apps private (SELF_ONLY), and how long does the audit take? Do YouTube Data API uploads from unverified projects stay private until an audit?
  - **Why it matters:** The launch plan says Claude posts to TikTok and YouTube automatically. If posts stay private, that is false until the audits pass.
  - **Primary source:** developers.tiktok.com (Content Posting API, audit); developers.google.com/youtube (videos.insert, API audit).
  - **Update:** ops/LAUNCH-NOW.md:70-71, ops/CLOUD-RUNBOOK.md (TikTok and YouTube rows), ops/SECRETS.md.
  - **Current belief (UNVERIFIED):** unaudited TikTok clients can post only as SELF_ONLY; YouTube uploads from unverified API projects created after July 28, 2020 are locked private.

- [ ] **RB-10 · Amazon KDP: marketplaces and board-book options** · score 9 (3×3÷1)
  - **Question:** Which marketplaces carry KDP paperbacks now? Is there any print-on-demand board-book option? What is the KDP hardcover minimum page count?
  - **Why it matters:** Wave 2 books and the board-book decision (ops/QUEUE.md "Next to build" item 0) depend on it.
  - **Primary source:** kdp.amazon.com help pages (marketplaces, formats, hardcover specs).
  - **Update:** ops/LAUNCH-NOW.md:48 (Wave 2), ops/QUEUE.md:13, commerce/storefront-setup-guide.md:137 and 250, legal/international-plan.md:184-186, legal/LEGAL-LAUNCH-CHECKLIST.md:39 (row 20), marketing/BLIND-SPOTS.md:127-129.
  - **Settles:** most of Q05.
  - **Current belief (UNVERIFIED):** KDP paperbacks reach Amazon US, UK, DE, FR, ES, IT, NL, PL, SE, JP, CA and AU; KDP prints no board books; KDP hardcovers need 75 or more pages.

- [ ] **RB-34 · Copyright Office: the fee change and the rules for registering AI-assisted work** · score 9 (3×3÷1)
  - **Question:** Do new Copyright Office fees start around November 12, 2026, and at what amounts? What must a registration claim or exclude when illustrations or text were generated with AI (human selection, arrangement and rewriting versus AI material to disclaim)?
  - **Why it matters:** If fees rise in six weeks, registering the finished launch works first saves money. Filing the wrong claim can make a registration invalid.
  - **Primary source:** copyright.gov/about/fees.html; the fee rule in the Federal Register (federalregister.gov); copyright.gov/ai (registration guidance and the Part 2 report on copyrightability).
  - **Update:** legal/protection/PROTECTION-PLAN.md:260, legal/DECISION-MEMO.json:91, marketing/BLIND-SPOTS.md:94, legal/protection/creation-records-log.md; brand/BRAND.md "Human authorship" only through ops/APPROVALS.md.
  - **Settles:** most of Q22.
  - **Current belief (UNVERIFIED):** the repo says a new fee schedule went to Congress on July 14, 2026 and could apply from about November 12, 2026, with the Standard Application proposed at $85. The Office's guidance is that AI-generated material must be identified and excluded from the claim.

- [ ] **RB-21 · New-shop risks on every launch platform** · score 8.3 (5×5÷3)
  - **Question:** For a brand-new seller, what does each platform do that can delay money or stop the shop? Etsy: identity checks, the setup fee, holds on first payouts, the Payment Account Reserve, and suspension triggers for new digital-only shops (for example many listings on day one). KDP: account and tax verification, how long title review takes, proof-of-rights requests when a book's content is also available online (our PDF previews are on Etsy and the site), and daily or weekly new-title limits. Gumroad: payout holds and risk reviews for new creators. Shopify Payments: first-payout timing and reserves. Pinterest: spam flags on a new account that pins many links to one domain, especially through the API. Also: what address each platform shows publicly, and whether a PO Box is accepted.
  - **Why it matters:** These decide the cash forecast (Etsy pays about a month late in the model), how fast the routines may list (ops/ROUTINE.md §5 allows 5 new Etsy listings and 2 KDP titles a week), and whether the founder's home address could appear on a storefront (legal/protection/PROTECTION-PLAN.md:183 says this is unverified).
  - **Primary source:** help.etsy.com (Payment Account Reserve: `https://help.etsy.com/hc/en-us/articles/360058722214`; payout schedule; setup fee; shop suspensions; seller address display); kdp.amazon.com help (publishing process, content guidelines, rights verification); gumroad.com/help (payouts); help.shopify.com (Shopify Payments payouts and reserves); policy.pinterest.com (spam) and developers.pinterest.com (rate limits).
  - **Update:** ops/GAPS-ROUND-2.md:93 and 132; ops/ROUTINE.md §5 weekly limits (only if a platform's own limit is lower); business/BUSINESS-PLAN.md:998, 1944 and 2447 (lag_ETSY) and business/sections/03-financial-model.md:122, then the workbook; business/sections/05-operations-risk-milestones.md:295; finance/money-and-tax-setup.md (payout timing); ops/LAUNCH-NOW.md (Wave 1 cadence); legal/protection/PROTECTION-PLAN.md:183.
  - **Settles:** part of Q05; the payout-timing lines in Q15 and Q32.
  - **Current belief (UNVERIFIED):** Etsy holds a new seller's funds for about 14 days and may add a rolling reserve of about 30% for up to 45 days; these figures came from search (ops/GAPS-ROUND-2.md:93). KDP review usually takes up to 72 hours. KDP may ask for proof of rights when it finds the same content online. KDP limits new titles per day (the repo says 10 per format per week; model knowledge says 3 per day).

- [ ] **RB-31 · Maryland sales tax on digital products, and which marketplaces collect it** · score 8 (4×4÷2)
  - **Question:** Does Maryland tax digital products (printables, e-books, a written course) at 6%? Does the 3% tax on certain data and IT services apply to anything we sell? Which marketplaces (Etsy, Gumroad, TpT, Amazon, TikTok Shop) are marketplace facilitators that collect Maryland tax for us? What must be registered before the own-site checkout goes live?
  - **Why it matters:** The own-site checkout must charge the right tax from the first sale, and the registration is a Wave 0 step. The accountant still confirms, but the official text shortens that conversation.
  - **Primary source:** marylandtaxes.gov (sales and use tax on digital products; the data and IT services tax; marketplace facilitators); mgaleg.maryland.gov (Tax-General Article).
  - **Update:** commerce/storefront-setup-guide.md:27-36 (A3), finance/money-and-tax-setup.md:348 onward, finance/TAX-AUTOPILOT.md:8, legal/DECISION-MEMO.json:64, business/REVENUE-PLAN.md:28, 453 and 478, business/BUSINESS-PLAN.md:2240 (mdtax).
  - **Settles:** the sales-tax part of Q15.
  - **Current belief (UNVERIFIED):** Maryland has taxed digital products at 6% since 2021, and a 3% tax on certain data and IT services took effect on July 1, 2025.

- [ ] **RB-32 · Etsy's rules for digital listings, outside links, duplicates, Offsite Ads, reviews and production partners** · score 8 (4×4÷2)
  - **Question:** How many files, and how large, may a digital listing carry? May the shop's About page link to playbeforepixels.com? When are two listings "duplicates" (for example a 60-card starter and the 230-card set sharing tags)? Can a shop under the Offsite Ads threshold opt out? How do review replies work (one reply, and does it lock the review)? What are the Star Seller message rules? What must be declared for print-on-demand production partners? What GPSR details do physical listings shipped to the EU need?
  - **Why it matters:** These rules decide how every Etsy listing is built and whether the routines' listing plan can get the shop flagged.
  - **Primary source:** Etsy Seller Policy and Fees & Payments Policy (www.etsy.com/legal), help.etsy.com (digital items, Offsite Ads, reviews, Star Seller, production partners, GPSR), the Etsy Seller Handbook (www.etsy.com/seller-handbook).
  - **Update:** ops/GAPS-ROUND-2.md:147 (About-page link); business/BUSINESS-PLAN.md:2149 (A30); ops/TESTS/check_listings.py:1200, 1615-1616 and 1619; ops/TESTS/listing-qa.md:1976-1977 and 1980; the Etsy upload steps in each launch listing.json ("Etsy allows 5 files per digital listing [VERIFY current limits]"); commerce/storefront-setup-guide.md:105 and 170; operations/customer-service/response-standards.md:38; marketing/BRAND-RESPECT-PLAN.md:198; ops/ROUTINE.md §5b (review replies); products/picture-laps-not-apps/ORDER-TO-PRINT.md:53.
  - **Settles:** Q13.
  - **Current belief (UNVERIFIED):** 5 files of up to 20 MB each; shops under $10,000 in yearly sales may opt out of Offsite Ads; a seller may post one public reply per review, after which the buyer can no longer edit it; Star Seller needs replies to 95% of first messages within 24 hours.

- [ ] **RB-03 · Etsy Open API v3: access, tokens, listings, vacation mode and public search** · score 7.5 (5×3÷2)
  - **Question:** Check app approval (personal versus commercial access), OAuth access and refresh token lifetimes, listing creation with digital files, and vacation mode by API. Also: does the public listing search (for example `findAllListingsActive` by keyword) return titles, prices and tags, so that RB-14 and RB-25 can use the API instead of reading search pages?
  - **Why it matters:** Etsy is the Wave 1 channel. The API is the only allowed way to automate it, and a public search endpoint is the rule-safe way to gather competitor and tag data.
  - **Primary source:** developers.etsy.com.
  - **Update:** ops/SECRETS.md, ops/LAUNCH-NOW.md, ops/FULL-STOP.md:30, ops/CLOUD-RUNBOOK.md (Etsy row), ops/GAPS-ROUND-2.md:82 (G2-05). While on developers.etsy.com, also answer the Etsy API questions in ops/EXPERIMENTS.md "Needs a live check" (listing views, receipts, reviews scope, ledger, image order, data-storage terms).
  - **Current belief (UNVERIFIED):** personal access covers the developer's own shop; access tokens last 1 hour and refresh tokens about 90 days; listing search returns price and tags.

- [ ] **RB-14 · Search demand for each launch product, in English** · score 7.5 (5×3÷2)
  - **Question:** For each launch product (Visual Routine Cards; "I'm Bored" Play Cards; Play-First Family Kit; Toddler Busy Book; *100 Screen-Free Plays* PDF and paperback), which head terms and long-tail phrases do buyers use, how do they compare in relative volume and seasonality, and do our `etsy_title` and 13 `etsy_tags` use the strongest of them? Check the 10 SEO article target keywords too.
  - **Why it matters:** Titles and tags are the only discovery a new shop has. The demand check (marketing/DEMAND-CHECK.md) came from search snippets, and seo/SEO-PLAN.md:11 says no keyword volume was ever verified. It also gives numbers to a founder decision now in ops/APPROVALS.md: keep or replace "first then board" and "visual schedule" in the routine-card listings. Measure both against the proposed replacements ("toddler picture schedule", "kids daily routine"), write the comparison under this item, and add one new line to ops/APPROVALS.md pointing to it. Never edit the existing approval line or its APPROVED/NO column, and do not decide it.
  - **Primary source:** Google Trends (trends.google.com: US, past 5 years, each candidate compared with one fixed anchor term); Etsy's own search suggestions and result counts (www.etsy.com, a few pages read by hand) or the Etsy API once RB-03 is answered; Pinterest Trends (trends.pinterest.com; needs a business login, so write "needs founder account" if blocked); Amazon's search box for the paperback only, typed by a person. eRank and Google Keyword Planner need paid or logged-in accounts: list them under the item as founder options, never as a routine step.
  - **Update:** marketing/DEMAND-CHECK.md §3 and §4 rule 1; `etsy_title`, `etsy_tags` and `keywords` in the five launch listing.json files (through the build path, then re-run the checker); seo/SEO-PLAN.md:21-34 (demand column) and the `target_keyword` line in seo/articles/01-10; ops/QUEUE.md.
  - **Output:** one table per product: term, Trends index against the anchor, Etsy result count, suggested by Etsy (yes/no), Pinterest trend (yes/no/unknown), used in our title or tags (yes/no).
  - **Settles:** Q25 (keyword part), Q45, part of Q24.

- [ ] **RB-28 · Holiday 2026: when demand rises and when each channel's last safe date falls** · score 7.5 (5×3÷2)
  - **Question:** When does search interest for each launch product's head term start rising and peak before December 25 (Google Trends, weekly, last 5 years)? What are the 2026 holiday cutoffs for USPS, Printful and the other print partners, and how long do a KDP title review and an author proof take, so the *100 Screen-Free Plays* paperback can be delivered for the holidays? When do gift guides stop taking pitches?
  - **Why it matters:** The launch five must be live before Black Friday (Friday, November 27, 2026). This sets the last day to list each printable, the last realistic day for the paperback, and when the "instant digital gift" push takes over.
  - **Primary source:** trends.google.com; www.usps.com (holiday shipping deadlines); www.printful.com and help.printful.com (holiday deadlines and any surcharge); kdp.amazon.com (publishing time, proof copies); the Etsy Seller Handbook holiday pages.
  - **Update:** marketing/EVENTS-CAMPAIGN-PLAN.md (October to December rows, the October 13 deadline pull at line 180, and the "Dates to re-verify" table at lines 741-747); marketing/Events_and_Holidays_Calendar_2026-2027.xlsx (Status and Confirmed columns); ops/QUEUE.md (list-by dates); ops/LAUNCH-NOW.md (Wave 1 and 2 timing); business/BUSINESS-PLAN.md:2136 (A17, KDP holiday timing); marketing/templates/media-pitch-gift-guide.md:6.
  - **Settles:** the holiday part of Q26.
  - **Calendar facts (worked out, not researched):** Thanksgiving is Thursday, November 26, 2026; Black Friday November 27; Cyber Monday November 30; Christmas Day is a Friday. **Current belief (UNVERIFIED):** Hanukkah 2026 begins on the evening of December 4.

- [ ] **RB-33 · CPSIA: is the 0–3 talk-along paperback a children's product that needs testing, and who certifies a print-on-demand book?** · score 7.5 (3×5÷2)
  - **Question:** Is a paper-only square paperback marketed to ages 0–3 (*Up! Go! More!*, Wave 2) an "ordinary book" exempt from third-party testing, or does being designed for children 3 and under remove the exemption? For a KDP print-on-demand book, who is the manufacturer that issues a Children's Product Certificate? Does CPSC eFiling (reported from July 8, 2026) apply? Is a card deck "the grown-up reads" a toy?
  - **Why it matters:** It decides whether the Wave 2 book can be published as planned, and whether a POD deck needs lab testing. Counsel still decides; this item gathers the CPSC text so the question to counsel is short.
  - **Primary source:** cpsc.gov business guidance on children's books and ordinary books, and on eFiling; 16 CFR 1500.91 and Part 1109 at ecfr.gov.
  - **Update:** legal/protection/PROTECTION-PLAN.md:26 and 165; legal/LEGAL-LAUNCH-CHECKLIST.md:65 (CPSIA notes); commerce/storefront-setup-guide.md:93; business/REVENUE-PLAN.md:113, 260, 266 and 317; legal/DECISION-MEMO.json:72 and 85; ops/QUEUE.md:13; the CPSIA lines in `compliance_notes` of products/board-up-go-more, picture-tablet-slept and play-talk-cards (through the build path).
  - **Settles:** Q20.
  - **Current belief (UNVERIFIED):** books designed for children 3 and under fall outside the ordinary-book testing exemption (the repo's own reading, legal/protection/PROTECTION-PLAN.md:26).

- [ ] **RB-38 · ISBNs and the Library of Congress PCN** · score 6 (3×2÷1)
  - **Question:** What do Bowker ISBNs cost now (1, 10, 100)? Can AlphaPlay LLC get a Preassigned Control Number, and how long before publication must it apply? When is KDP's free ISBN enough?
  - **Why it matters:** Wave 2 books need the decision before upload, and a PCN cannot be added after publication.
  - **Primary source:** myidentifiers.com (Bowker); loc.gov PrePub Book Link (both not yet allowed); kdp.amazon.com ISBN help.
  - **Update:** legal/protection/PROTECTION-PLAN.md:276-280, legal/DECISION-MEMO.json:80, business/BUSINESS-PLAN.md:2284 (A.3 ISBN row), operations/TRUST-CHECKLIST.md:77, marketing/BLIND-SPOTS.md:154, business/REVENUE-PLAN.md:73 and 107.
  - **Settles:** Q48; the PCN part of Q22.
  - **Current belief (UNVERIFIED):** 1 ISBN $125, 10 for $295; a PCN must be requested before publication.

- [ ] **RB-02 · Shopify app tokens** · score 6 (4×3÷2)
  - **Question:** What are the current rules for a store's own automation app (Dev Dashboard apps, 24-hour tokens, client-credentials exchange)? Can any of them work with an environment API credential, which adds a header but never shows Claude the key, so Claude cannot send a client secret in a request body?
  - **Why it matters:** It decides whether the own-site store can be automated without a token broker.
  - **Primary source:** shopify.dev.
  - **Update:** ops/SECRETS.md:21, ops/CLOUD-RUNBOOK.md (API credentials table), ops/GAPS-ROUND-2.md G2-05.

- [ ] **RB-04 · Pinterest API v5** · score 6 (4×3÷2)
  - **Question:** Check Standard access approval (what it needs and how long it takes), whether trial access can publish to the live site or only to the sandbox, token lifetimes (reported as a 30-day access token and a 60-day continuous refresh), and scheduling or unscheduling pins.
  - **Why it matters:** Pinterest is the main free traffic plan, and the routine pins daily.
  - **Primary source:** developers.pinterest.com.
  - **Update:** ops/SECRETS.md, ops/FULL-STOP.md:25, ops/CLOUD-RUNBOOK.md (Pinterest row), ops/GAPS-ROUND-2.md G2-05. Also answer the Pinterest questions in ops/EXPERIMENTS.md (analytics metrics and scopes, repetitive-pinning rules).
  - **Current belief (UNVERIFIED):** apps on trial access may be limited to `api-sandbox.pinterest.com`.

- [ ] **RB-06 · GitHub commit authorship** · score 6 (3×4÷2)
  - **Question:** Can a commit made through the GitHub REST API with the founder's token look the same as a GitHub web-editor commit (author, committer "GitHub", "Verified")?
  - **Why it matters:** It decides whether the interim approval rule in ops/ROUTINE.md §5 can tell a founder's APPROVED line from a run's.
  - **Primary source:** docs.github.com.
  - **Update:** ops/GAPS-ROUND-2.md:58 (G2-03).

- [ ] **RB-12 · Listing field limits in ops/TESTS/check_listings.py** · score 6 (4×3÷2)
  - **Question:** Confirm every number in `PLATFORM_LIMITS` (ops/TESTS/check_listings.py:41-55): Etsy title length and special-character rule, tag count and tag length, the characters Etsy accepts in tags; KDP title-plus-subtitle, keyword boxes, keyword length, description length and banned keyword words; Shopify SEO title and meta description; TpT title; Merch on Demand title, bullets and description. Then update the status column and re-run the checker.
  - **Why it matters:** Every listing passes through this checker. A wrong limit either rejects good listings or lets bad ones through.
  - **Primary source:** each platform's help pages and listing forms (help.etsy.com, kdp.amazon.com, help.shopify.com, help.teacherspayteachers.com, merch.amazon.com); the Etsy API listing schema on developers.etsy.com.
  - **Update:** ops/TESTS/check_listings.py:22, 41-55, 807, 844, 848 and 1597-1620; ops/TESTS/listing-qa.md:10-29 and 1952-1977 (regenerated by the checker). Also answer the Etsy title, tag and duplicate questions and the KDP keyword, title-change and re-index questions in ops/EXPERIMENTS.md.
  - **Settles:** Q11.

- [ ] **RB-20 · KDP print cost, royalty and file checks for the Wave 2 books** · score 6 (4×3÷2)
  - **Question:** In KDP's own calculators: the print cost and royalty for *100 Screen-Free Plays* (8 × 10 in, 82 pp, black and white), the 32-page 8.5 × 8.5 in premium-colour books, the course paperback and any busy-book activity edition; whether 8 × 10 and 8.5 × 8.5 count as large trim; paper thickness per page for the cover calculator; the minimum outside margin with bleed; the spine-text page minimum; the barcode area. Then upload one interior to KDP's Print Previewer (founder account) as the final test.
  - **Why it matters:** The repo holds three different answers for the guide: print $2.30 and $7.89 net (business/BUSINESS-PLAN.md:2251 and 2158, and the low end of `price_notes` in products/guide-100-plays/listing.json), $2.84 large-trim flat and $7.35 net (the high end of the same `price_notes`), and $3.72 and $6.47 net (business/REVENUE-PLAN.md:488). The 32-page colour books show $3.24 (business/BUSINESS-PLAN.md:2249-2250) or $3.56 (business/REVENUE-PLAN.md:105). ops/TESTS/print-preflight.md:92 found footers at 0.29 in, inside what it believes is KDP's 0.375 in margin, on 80 of 86 pages.
  - **Primary source:** kdp.amazon.com help: paperback printing cost (G201834340), royalties (G201834330), trim size, bleed and margins, cover calculator, barcode guidelines; KDP Print Previewer.
  - **Update (through the build path):** `price_notes` and the cover notes in products/guide-100-plays/listing.json and build/extras.js; products/board-up-go-more/listing.json, build/build.js (cover calculator notes) and paperback/cover-wrap.html; products/picture-tablet-slept/listing.json and build.js; products/course-screen-reset/build/cover-wrap.json and build/extras.js (spine and paper thickness); the `amazon_route` note in products/toddler-busy-book/listing.json. Then: ops/TESTS/print-preflight.md:282-289 ("Needs a live check" 1-6); ops/TESTS/listing-qa.md:1978-1979; commerce/PRICING.md:13; commerce/storefront-setup-guide.md:138; business/BUSINESS-PLAN.md:2130, 2144-2145, 2158-2159 and 2248-2251, business/build_financial_model.py inputs (kdp_roy, kdp_base, kdp_color, kdp_bw_flat) and the workbook; business/REVENUE-PLAN.md:71, 105 and 488.
  - **Settles:** Q04; the KDP part of Q12.
  - **Current belief (UNVERIFIED):** royalty 60% of list price at $9.99 or more (since June 10, 2025) and 50% below, 40% through Expanded Distribution; large trim means wider than 6.12 in or taller than 9 in; black-and-white print for 24-108 pages is a flat $2.30 at regular trim and $2.84 at large trim; premium colour is $1.00 plus $0.07 a page (regular) or $0.08 a page (large); standard colour needs 72 or more pages.

- [ ] **RB-24 · Logo side-by-side against lookalikes** · score 6 (3×4÷2)
  - **Question:** Put the chosen logo and symbol next to each known neighbour at 16 px, 64 px and full size, and search for others. Neighbours already named: for "The Return" (the kit now in brand/logo/), Patreon (current and former marks), Product Hunt, Pexels, pixiv, Pinterest, PBS, Poki and Planned Parenthood; for v2 concept A (ball and square pixel), Headspace's orange dot and the browser "recording" dot; for concept B (two figures and a ball), Fisher-Price Little People and parent-and-child charity marks; for concept D (seamed ball), the recording dot and sports-ball marks; for concept C (a seal with a spinning top), maker's-seal and toy-top marks. Record each comparison and a verdict.
  - **Why it matters:** The founder asked for a unique logo that copies no one. A lookalike found after merch, covers and listings are printed is expensive to undo, and the mark can only be filed once it is clear.
  - **Gate:** the logo is being redesigned (brand/logo-concepts-v2/, concepts A to D). Run this on the concept that ends up in brand/logo/; until one is chosen, run it only on the concepts still in the running.
  - **Primary source:** Simple Icons SVGs on GitHub (raw.githubusercontent.com/simple-icons); USPTO design-code search in tmsearch.uspto.gov (the repo names 26.01 for circles and 27.03 for letters; take the codes for balls, tops and human figures from the USPTO Design Search Code Manual); WIPO Global Brand Database image search (branddb.wipo.int, not yet allowed). Reverse-image search (Google Lens, TinEye) needs a person with a browser: list it as a founder option.
  - **Update:** brand/logo/logo-notes.md (residual risk section) and brand/ORIGINALITY.md §3 and §4a item 2 (lines 176-219), through the normal path; the chosen concept's notes.md; legal/protection/creation-records-log.md (log the check).

- [ ] **RB-27 · EU GPSR: who is the responsible person for our printed books on each route into the EU?** · score 6 (3×4÷2)
  - **Question:** For each route (KDP books sold by Amazon in the EU; IngramSpark's EU distribution; Lulu or Gelato for the keepsake; Etsy physical listings; Printful's EU facilities for merch): who is the EU economic operator, which GPSR fields must we fill, what must be printed on the book or shown on the listing, and do we need a paid EU responsible-person service? If so, what do two such services publish as their prices?
  - **Why it matters:** Until this is settled, the plan blocks EU shipping of anything physical from the own site and Etsy. KDP and IngramSpark may already cover it, which would open the EU for books at no cost.
  - **Primary source:** Regulation (EU) 2023/988 (eur-lex.europa.eu) and the Commission's GPSR guidance (single-market-economy.ec.europa.eu; commission.europa.eu, not yet allowed); kdp.amazon.com GPSR help; www.ingramspark.com GPSR help; help.etsy.com GPSR; help.printful.com GPSR; lulu.com (not yet allowed).
  - **Update:** legal/international-plan.md:199, 209, 227, 305-319 and 510; legal/LEGAL-LAUNCH-CHECKLIST.md:40 (row 21); legal/DECISION-MEMO.json:79; legal/protection/PROTECTION-PLAN.md:352; ops/INTERNATIONAL.md; the EU shipping settings in listing.json files (through the build path).
  - **Settles:** the GPSR part of Q17; part of Q06.
  - **Current belief (UNVERIFIED):** when Amazon or another retailer is the seller of a KDP or IngramSpark book, the retailer generally takes on the GPSR duties; responsible-person services cost roughly €100-600 a year (the repo's estimate).

- [ ] **RB-35 · Own-site digital delivery, and what happens when an EU or UK buyer uses the own-site checkout** · score 5.3 (4×4÷3)
  - **Question:** Which Shopify download app fits (file size and count limits, download limits, buyer-name PDF stamping, any per-order fee, gift delivery to another inbox)? Can Shopify sell digital products only to US buyers and send other countries to the merchant of record? If EU or UK consumers do buy on the own site, how is the immediate-access waiver captured, and does the EU "withdrawal button" duty (reported from June 19, 2026) apply to a US site?
  - **Why it matters:** By the repo's own reading (legal/international-plan.md §5), selling a download to an EU consumer from the own site makes AlphaPlay LLC the VAT seller from the first sale and brings EU consumer-law duties. The download app also decides whether the launch files (some near 20 MB) can be delivered at all.
  - **Primary source:** help.shopify.com (digital downloads, Markets, checkout customization); apps.shopify.com listings of the candidate apps (not yet allowed); Directive (EU) 2023/2673 and Directive 2011/83/EU on eur-lex.europa.eu.
  - **Update:** operations/AUTOMATION-MAP.md:102; legal/SHIPPING-RETURNS-REFUNDS.md:57; legal/LEGAL-LAUNCH-CHECKLIST.md:42 (row 21a); legal/international-plan.md:364-378; legal/DECISION-MEMO.json:78; ops/GAPS-ROUND-2.md G2-12 and G2-17; the stamping note and the gift-delivery FAQ in products/picture-more-talk-less-tap/listing.json.
  - **Settles:** the app part of Q03 and Q32; the withdrawal part of Q18.

- [ ] **RB-25 · Competitor price and review scan for each launch product** · score 5 (5×3÷3)
  - **Question:** For each launch product, using the head term from RB-14: the top 10-15 Etsy listings (title, everyday price, whether a sale price is shown, shop sales, listing reviews where visible, Bestseller or "Popular now" badge, card or page count, formats such as Letter/A4 and editable, age range), and the main complaints in the 1-3 star reviews of the top three. Add TpT for the routine cards (home schedules) and Amazon for the *100 Screen-Free Plays* paperback (price, ratings, sales rank, page count).
  - **Why it matters:** Prices and specs were set from search snippets captured on September 27-28, 2026 (marketing/DEMAND-CHECK.md:5). The live pages decide whether $9.50, $6.50, $11, the busy-book price and $16.99 sit where buyers expect, and the complaints show what to fix before launch.
  - **Primary source:** the live listing pages on www.etsy.com (or the Etsy API once RB-03 is answered), www.teacherspayteachers.com and www.amazon.com, each recorded with its URL and date.
  - **Update:** marketing/DEMAND-CHECK.md (§1 rows and the §3 launch table: replace snippet figures, remove [VERIFY] and "est."), commerce/PRICING.md, `price_notes` in the launch listing.json files (through the build path; the Etsy steps in products/visual-routine-cards/listing.json ask for this recheck), marketing/CUSTOMER-VOICE.md (new complaints), ops/QUEUE.md, business/BUSINESS-PLAN.md:2131 (A12) and 2144-2145.
  - **Rules:** never copy a competitor's title, images or wording (brand/BRAND.md rule 7), and never name a competitor in public copy.
  - **Settles:** most of Q24 for the launch five.

- [ ] **RB-17 · AI rules on the other channels: TpT, Pinterest, Meta (Instagram and Facebook), TikTok, YouTube, Merch on Demand and Google Merchant Center** · score 4.5 (3×3÷2)
  - **Question:** Is AI-assisted illustration allowed on each; must posts or listings be labelled, and how (a toggle, a field in the posting API, image metadata, or automatic detection); and must the routine set the label on each post?
  - **Why it matters:** The routines post faceless images on all of these. A missing label can get posts removed or an account restricted. TpT matters later (held for counsel).
  - **Primary source:** help.teacherspayteachers.com (AI guidelines); policy.pinterest.com and help.pinterest.com (AI labels); transparency.meta.com and www.facebook.com/help ("AI info" labels); TikTok's community guidelines on AI-generated content (www.tiktok.com; support.tiktok.com, not yet allowed) and the Content Posting API reference (developers.tiktok.com); support.google.com/youtube (altered or synthetic content); merch.amazon.com (content policy); support.google.com/merchants (AI-generated images).
  - **Update:** `social_ai_label`, `tpt` and `merch_on_demand` in the listing.json files (through the build path); marketing/CAMPAIGN-BIBLE.md (posting rules); ops/ROUTINE.md §5 (social posting) if a label must be set per post; ops/COMPLIANCE-GATE.md:21.
  - **Settles:** the rest of Q01; part of Q07.
  - **Current belief (UNVERIFIED):** Pinterest shows an "AI modified" label on pins it detects; Meta labels "AI info" from metadata and asks for disclosure of photorealistic video and audio; TikTok requires labels on realistic AI content and reads C2PA credentials; YouTube requires disclosure only for realistic altered or synthetic content; Google Merchant Center expects AI-generated product images to keep their metadata.

- [ ] **RB-26 · Social posting APIs for a brand-new small business: access, approval time and what works before approval** · score 4 (4×3÷3)
  - **Question:** For Meta (posting to a Facebook Page and publishing to an Instagram professional account), Threads, X, LinkedIn (Company Page) and Bluesky: which access tier or app review is needed, whether business verification is needed, how long approval usually takes, what an app can do before approval (are posts public?), and posting limits. Then write one table that also carries the answers from RB-03, RB-04 and RB-07.
  - **Why it matters:** ops/LAUNCH-NOW.md promises that Claude runs social media automatically. This table shows which networks can really be automated in month one, and which need a scheduler (RB-11) or wait.
  - **Primary source:** developers.facebook.com (Pages API, Instagram content publishing, Threads API, app review, business verification); X developer documentation (developer.x.com / docs.x.com, not yet allowed); LinkedIn API documentation (learn.microsoft.com/linkedin, not yet allowed); Bluesky documentation (docs.bsky.app, not yet allowed).
  - **Update:** ops/LAUNCH-NOW.md:62-76 (platform table), ops/SECRETS.md, ops/CLOUD-RUNBOOK.md (API table), marketing/SOCIAL-HANDLES.md, ops/GAPS-ROUND-2.md G2-05.
  - **Settles:** the Meta, X, LinkedIn, Threads and Bluesky part of Q14; part of Q40.
  - **Current belief (UNVERIFIED):** posts made by a Meta app in development mode may be visible only to people with a role on the app; Instagram limits API-published posts per 24 hours; LinkedIn's Community Management API needs an application and approval; X's free API tier allows only a small number of posts a month; Bluesky needs no approval.

- [ ] **RB-36 · Email platform: free-tier limits, automations, API and double opt-in** · score 3 (3×2÷2)
  - **Question:** For MailerLite and Kit (and one alternative): the free-tier subscriber cap, whether automations or sequences run on the free tier, API access and the endpoints to pause automations, double opt-in, and hosted sign-up forms.
  - **Why it matters:** The free sampler and welcome sequence are the launch's list-building engine. The repo disagrees with itself: marketing/MARKETING-PLAYBOOK.md:133 says Kit's free plan no longer runs sequences and MailerLite's free plan is down to 250; marketing/BLIND-SPOTS.md:66 says MailerLite is free to about 1,000; business/REVENUE-PLAN.md:54 says Kit is free to 10,000.
  - **Primary source:** www.mailerlite.com/pricing and developers.mailerlite.com; help.kit.com and developers.kit.com (kit.com/pricing not yet allowed).
  - **Update:** marketing/MARKETING-PLAYBOOK.md:133, marketing/BLIND-SPOTS.md:66, business/REVENUE-PLAN.md:54, business/BUSINESS-PLAN.md A.3 email rows, ops/SECRETS.md (EMAIL_PLATFORM_API_KEY), ops/FULL-STOP.md:28, commerce/links.schema.md:31. Also answer the email-platform questions in ops/EXPERIMENTS.md (form and sequence statistics through the API).

- [ ] **RB-37 · Print-on-demand partners: costs, label and print-area specs, pouch sizes, card decks** · score 3 (3×2÷2)
  - **Question:** Printful base cost for the adult tee and tote (and any tariff surcharge), inside-label template and size, tote print area, pouch sizes against common tablet sizes; which POD service prints and ships a single 52-card deck with a tuck box, at what cost, with what file specs.
  - **Why it matters:** Merch is Wave 2 and the POD deck follows the printable. Margins sit near the 30% POD floor (commerce/PRICING.md).
  - **Primary source:** www.printful.com and help.printful.com; the chosen deck printer's own spec and price pages (for example thegamecrafter.com, not yet allowed).
  - **Update (through the build path):** the rates, Merch on Demand terms, label and print-area notes in products/merch-core/listing.json, build/book.py and source.html; `price_notes` and the tuck-box template note in products/play-talk-cards/listing.json and build/pod.js; marketing/CAMPAIGN-BIBLE.md:161 and 479; marketing/CUSTOMER-VOICE.md:340; business/REVENUE-PLAN.md:173 and 207; business/build_financial_model.py (tee_pod).
  - **Settles:** Q09; the POD part of Q10 and Q12.

- [ ] **RB-39 · BISAC codes and ASL signs in the books** · score 3 (2×3÷2)
  - **Question:** Are the BISAC codes in the book listings current and correct? Does each hand sign described in *Up! Go! More!* (more, all done, eat, help, book) match a reputable ASL dictionary?
  - **Why it matters:** A wrong sign in a talk-along book for babies earns bad reviews and disrespects Deaf readers; BISAC codes drive library and store shelving.
  - **Primary source:** BISG's BISAC subject list (bisg.org, not yet allowed); a reputable ASL dictionary (for example lifeprint.com or handspeak.com, not yet allowed).
  - **Update (through the build path):** `bisac` and the ASL sign-check line in products/board-up-go-more/listing.json, its panel.md and build/manuscript.json; `bisac` in products/picture-tablet-slept/listing.json and panel.md.
  - **Settles:** Q50.

- [ ] **RB-40 · US tax calendar, information-return thresholds and BOI** · score 3 (2×3÷2)
  - **Question:** Confirm the 2026-2027 federal and Maryland estimated-tax dates, the Form 1099-K threshold ($20,000 and 200 transactions?), Maryland's own 1099-K threshold, the 1099-NEC threshold for 2026 payments, and whether a US-formed LLC must file a beneficial-ownership report.
  - **Why it matters:** The Q4 estimate is due in January, and the monthly close relies on these dates.
  - **Primary source:** irs.gov (Form 1040-ES, Form 1099-K and 1099-NEC pages); marylandtaxes.gov; fincen.gov (BOI, not yet allowed).
  - **Update:** finance/money-and-tax-setup.md:267-342, commerce/storefront-setup-guide.md:44, operations/SOPs/yearly.md:5 and 35, operations/SOPs/quarterly.md:7, ops/DEADLINES.md.
  - **Settles:** the non-sales-tax part of Q15.

- [ ] **RB-42 · Printed neck labels: what the FTC textile and care rules require** · score 3 (2×3÷2)
  - **Question:** What must an inside-neck print on an adult tee show (fiber content, country of origin, RN or company name, care instructions), and what size and template does the print partner require?
  - **Why it matters:** 16 label files are ready; a missing required line means a reprint.
  - **Primary source:** 16 CFR Part 303 and Part 423 (ecfr.gov) and ftc.gov business guidance; help.printful.com (inside labels).
  - **Update (through the build path):** products/merch-core/labels/*.svg (the `<desc>` of each of 16 files), products/merch-core/build/build.py (label template note), the label notes in products/merch-core/listing.json.
  - **Settles:** Q31.

- [ ] **RB-05 · Stop controls for ops/FULL-STOP.md** · score 3 (3×3÷3)
  - **Question:** Can the Meta scheduled-posts API, the MailerLite or Kit automation API, and the ad-platform APIs pause or unschedule?
  - **Why it matters:** ops/PAUSE is only as good as the stop steps behind it.
  - **Primary source:** developers.facebook.com, developers.mailerlite.com, developers.kit.com, and each ad platform's developer docs.
  - **Update:** ops/FULL-STOP.md:25-30.

- [ ] **RB-41 · Privacy duties at site launch** · score 3 (3×3÷3)
  - **Question:** With Shopify, embeds and an email form on the site: is a cookie banner needed for EU/UK visitors? When does a non-EU business need a GDPR Art. 27 representative (and a UK one)? Do Maryland's Online Data Privacy Act thresholds or Connecticut's 2026 amendment reach us? What does the amended COPPA rule (the repo says compliance from April 22, 2026) mean for an adult-facing site?
  - **Why it matters:** The privacy policy must match what the site really does before the attorney reviews it.
  - **Primary source:** ftc.gov (COPPA rule and FAQ); mgaleg.maryland.gov (Online Data Privacy Act); edpb.europa.eu (Art. 27 guidance); ico.org.uk (UK representative, cookies and PECR); crtc.gc.ca (CASL).
  - **Update:** legal/PRIVACY-POLICY.md, legal/international-plan.md:355-360, legal/DECISION-MEMO.json:68-71, legal/LEGAL-LAUNCH-CHECKLIST.md:61 (row 31), business/BUSINESS-PLAN.md:1089 and the A.3 GDPR-representative row.
  - **Settles:** Q19.

- [ ] **RB-46 · Maryland entity fees, the PO Box, and the address each platform shows** · score 2 (1×2÷1)
  - **Question:** Confirm the trade-name fee and term, the annual-report fee and date, and PO Box pricing. (How each marketplace displays a seller's address is part of RB-21.)
  - **Primary source:** dat.maryland.gov and egov.maryland.gov; www.usps.com.
  - **Update:** legal/protection/PROTECTION-PLAN.md:53-60, legal/DECISION-MEMO.json:62-63, ops/DEADLINES.md, finance/money-and-tax-setup.md:281.
  - **Settles:** Q30.

- [ ] **RB-47 · URL patterns and handle rules** · score 2 (2×1÷1) · gate: the accounts exist
  - **Question:** Confirm each link pattern and menu path in commerce/links.schema.md from the live accounts, and the handle rules (for example X's 15-character limit behind @playb4pixels).
  - **Primary source:** each platform's own share links and help pages; help.x.com (username rules, not yet allowed).
  - **Update:** commerce/links.schema.md, commerce/links.js:15 and 62, marketing/SOCIAL-HANDLES.md, legal/DECISION-MEMO.json:11.
  - **Settles:** the URL part of Q33.

- [ ] **RB-48 · Affiliate programs** · score 2 (1×2÷1)
  - **Question:** Amazon Associates commission rates for books and toys, the 3-sales-in-180-days rule and the required disclosure; Bookshop.org's affiliate rate and eligibility.
  - **Primary source:** affiliate-program.amazon.com and bookshop.org/info/affiliates (both not yet allowed).
  - **Update:** commerce/storefront-setup-guide.md:159-163 and 183-187, legal/AFFILIATE-ENDORSEMENT-DISCLOSURE.md:10, legal/international-plan.md:204 and 235, business/REVENUE-PLAN.md:88-90.
  - **Settles:** Q34.

- [ ] **RB-49 · Accessibility law dates** · score 2 (1×2÷1)
  - **Question:** The current compliance dates of the DOJ 2024 ADA Title II rule (reported as possibly extended), and the European Accessibility Act microenterprise exemption for e-books and e-commerce.
  - **Primary source:** ada.gov (not yet allowed) and federalregister.gov; eur-lex.europa.eu (Directive 2019/882).
  - **Update:** marketing/BRAND-RESPECT-PLAN.md:170, legal/international-plan.md:392, business/REVENUE-PLAN.md:232 and 504, legal/DECISION-MEMO.json:88.
  - **Settles:** Q36.

- [ ] **RB-11 · Multi-network posting service** · score 2 (2×2÷2)
  - **Question:** For an API-first posting service (for example Ayrshare): price, terms, and posting to X, LinkedIn, Threads and Bluesky.
  - **Primary source:** the service's own pricing and terms pages (for Ayrshare, www.ayrshare.com, not yet allowed).
  - **Update:** ops/LAUNCH-NOW.md:72, ops/SECRETS.md (SOCIAL_SCHEDULER_TOKEN), business/BUSINESS-PLAN.md A.3 social-scheduler row.

- [ ] **RB-44 · Other event dates in the next 8 weeks** · score 2 (2×2÷2)
  - **Question:** Confirm on its official page every row of marketing/Events_and_Holidays_Calendar_2026-2027.xlsx with Confirmed = N whose prep start falls in the next 8 weeks (the holiday rows are RB-28).
  - **Primary source:** the organizer's page named in each row.
  - **Update:** the calendar workbook and marketing/EVENTS-CAMPAIGN-PLAN.md.
  - **Settles:** the non-holiday part of Q26.

- [ ] **RB-45 · Google Search and Merchant Center guidance** · score 2 (2×2÷2)
  - **Question:** hreflang and language-redirect guidance, which rich-result types still show (Course info was reported as retired), whether Merchant Center free listings accept digital downloads, and whether an online-only business with no public address can have a Business Profile.
  - **Primary source:** developers.google.com/search; support.google.com/merchants; support.google.com/business.
  - **Update:** seo/SEO-PLAN.md:175, 248, 253 and 440; legal/international-plan.md:99, 122 and 145-156; commerce/storefront-setup-guide.md:121-123; operations/TRUST-CHECKLIST.md:89.
  - **Settles:** the Google-guidance part of Q25.

- [ ] **RB-15 · Search demand for the Spanish editions** · score 2 (3×2÷3) · gate: after the English launch files are final
  - **Question:** The RB-14 method in Spanish, for US Hispanic buyers (Google Trends, region US) and for Mexico and Spain: for example "tarjetas de rutina", "rutina visual niños", "actividades sin pantallas", "juegos sin pantallas para niños", "libro de actividades para niños pequeños", "frasco estoy aburrido", "tabla de tiempo de pantalla".
  - **Why it matters:** The Spanish routine cards and Kit Familiar are the top community editions (ops/QUEUE.md community items 1 and 6), and their demand is marked VERIFY.
  - **Primary source:** as RB-14, with Spanish-language Etsy searches.
  - **Update:** marketing/COMMUNITY-PRODUCTS.md:109, 120 and 132; legal/international-plan.md:125-133; content/research-hub/translation-plan.md:23-27 and 66; seo/SEO-PLAN.md (Spanish column); ops/QUEUE.md.
  - **Settles:** the Spanish part of Q25 and Q45.

- [ ] **RB-19 · Fees on every other channel** · score 2 (3×2÷3)
  - **Question:** IngramSpark (setup, revisions, the reported market-access fee, print costs, payout timing), TpT (Basic fee: $29 one-time or free, payout and per-resource fee; Premium), Amazon Merch on Demand royalties, Faire, Walmart Marketplace, Amazon Seller Central and FBA, Lulu, Payhip, Lemon Squeezy, Stripe, Bookshop.org, TikTok Shop's referral fee, and ACX. Work in wave order: IngramSpark first.
  - **Primary source:** each platform's own pricing or fee page (www.ingramspark.com, help.teacherspayteachers.com, merch.amazon.com, www.faire.com, seller-us.tiktok.com allowed; marketplace.walmart.com, sell.amazon.com, lulu.com, payhip.com, lemonsqueezy.com, stripe.com, bookshop.org, acx.com not yet allowed).
  - **Update:** commerce/storefront-setup-guide.md:146, 176, 207, 223 and 239-242; finance/money-and-tax-setup.md:117; legal/international-plan.md:208, 214, 221 and 276-284; business/build_financial_model.py and business/BUSINESS-PLAN.md A.2 and A.3; business/REVENUE-PLAN.md.
  - **Settles:** Q06, Q07, Q10, Q40 and Q46 fee lines.

- [ ] **RB-50 · International tax and consumer law, region by region** · score 1.5 (2×3÷4) · gate: when ops/INTERNATIONAL.md reaches that region
  - **Question:** For the next region only: VAT/GST thresholds and rates, EU/UK consumer-law duties, EPR and packaging registration, toy rules for the deck, and fixed book prices (France, Germany).
  - **Primary source:** the official pages listed in legal/international-plan.md:544-551.
  - **Update:** legal/international-plan.md, ops/INTERNATIONAL.md, legal/LEGAL-LAUNCH-CHECKLIST.md rows 19-21a.
  - **Settles:** the rest of Q16, Q17 and Q18.

- [ ] **RB-51 · Live checks listed in ops/EXPERIMENTS.md** · score 1.5 (3×2÷4)
  - **Question:** Settle the platform data, benchmark and law questions under "Needs a live check" at the end of ops/EXPERIMENTS.md (Etsy, Shopify, Pinterest, Gumroad, the email platform, Cloudflare, review apps, Amazon, law and regulation, other).
  - **Why it matters:** The post-launch experiments (price, first photo, title, bundle tests) depend on which numbers each platform's API really reports and on the pricing and review laws they must respect.
  - **How:** answer each platform's questions while its own item is being worked (Etsy with RB-03, RB-12 and RB-32; Pinterest with RB-04 and RB-17; Gumroad with RB-08; the email platform with RB-36; KDP with RB-12 and RB-21; Shopify with RB-02 and RB-35), and tick them in ops/EXPERIMENTS.md. This item covers what is left: the law list (16 CFR Parts 233, 251, 255 and 465 at ecfr.gov; EU directives at eur-lex.europa.eu; UK DMCC Act at legislation.gov.uk; California Bus. & Prof. Code §17501) and the benchmarks, which usually have no primary source and should be replaced by our own data once it exists.
  - **Update:** ops/EXPERIMENTS.md, and ops/SECRETS.md for any read scope the experiments need.
  - **Settles:** Q51.

- [ ] **RB-52 · Demand for the next queue items (community editions)** · score 1.5 (3×2÷4)
  - **Question:** Run the RB-14 and RB-25 method on the next 10 items in ops/QUEUE.md "Next to build" and the community editions, and cut ideas with weak evidence (ops/ROUTINE.md §1).
  - **Primary source:** as RB-14 and RB-25.
  - **Update:** marketing/COMMUNITY-PRODUCTS.md (the "VERIFY in monthly research" lines), ops/QUEUE.md:30, 48 and 69.
  - **Settles:** the community part of Q24.

- [ ] **RB-53 · Paid-ads cost per click** · score 1.3 (2×2÷3)
  - **Question:** What do Etsy Ads, Pinterest Ads and Amazon Ads cost per click in our categories? Platforms publish minimums, not averages, so this may only be answered by a small approved test.
  - **Primary source:** each platform's ads help pages.
  - **Update:** business/STRESS-TEST.md:161 and 386, marketing/MARKETING-PLAYBOOK.md:332.
  - **Settles:** Q47.

- [ ] **RB-54 · Personalized keepsake workflow** · score 1.3 (2×2÷3) · gate: Wave 3
  - **Question:** Can an Etsy or Shopify order be rendered and sent to Lulu's Print API with no manual step; what are Lulu's costs, product options, packing-slip and data-retention terms; and what do Etsy's personalization and production-partner rules require?
  - **Primary source:** Lulu's developer documentation and pricing (not yet allowed); help.etsy.com.
  - **Update:** products/picture-laps-not-apps/ORDER-TO-PRINT.md, listing.json and personalization.json:174.
  - **Settles:** Q39.

- [ ] **RB-55 · Insurance, attorney and accountant quotes** · score 1.2 (3×2÷5) · gate: founder
  - **Question:** The broker quote for general liability with products-completed operations, and the attorney and accountant fees. These come from quotes, not web pages: the routine prepares the request lists and the founder sends them.
  - **Update:** legal/protection/PROTECTION-PLAN.md, legal/LEGAL-LAUNCH-CHECKLIST.md:33 (row 14), business/BUSINESS-PLAN.md A.3 insurance and adviser rows and the workbook.
  - **Settles:** Q28 and Q29.

- [ ] **RB-58 · Market-size figures** · score 1 (1×1÷1)
  - **Question:** US births per year, children aged 0-5 and 5-12, and US Hispanic residents.
  - **Primary source:** cdc.gov (NCHS births); census.gov (not yet allowed).
  - **Update:** business/BUSINESS-PLAN.md:258-261 (A3-A6), legal/international-plan.md:72.
  - **Settles:** Q23.

- [ ] **RB-59 · Outreach list facts** · score 1 (1×3÷3) · gate: before an approved message
  - **Question:** For any row marked OUTREACH in marketing/virtual-autism-outreach.md, confirm the current host, editor and contact route before a founder-approved message is drafted.
  - **Update:** marketing/virtual-autism-outreach.md.
  - **Settles:** Q44.

- [ ] **RB-60 · Translator and sensitivity-reader rates** · score 0.7 (2×1÷3)
  - **Primary source:** atanet.org and national translator associations (not yet allowed).
  - **Update:** legal/international-plan.md:453-462, marketing/BRAND-RESPECT-PLAN.md:150, business/REVENUE-PLAN.md:326-328.
  - **Settles:** the translation part of Q37.

- [ ] **RB-56 · Other business-tool prices** · score 0.5 (1×1÷2)
  - **Question:** QuickBooks Online plans, Link My Books, a password manager and the business bank's fees.
  - **Update:** finance/money-and-tax-setup.md:68-168, operations/SOPs/account-security.md:8, business/BUSINESS-PLAN.md A.3 operating rows.
  - **Settles:** the rest of Q32.

- [ ] **RB-57 · Awards, conferences and marketing placements** · score 0.5 (1×1÷2)
  - **Question:** Entry fees and dates for the awards and cooperative displays on the plan, and whether each still runs (Parents' Choice was reported to have ended in 2022).
  - **Update:** marketing/BRAND-RESPECT-PLAN.md:295-309, marketing/EVENTS-CAMPAIGN-PLAN.md:652-663, marketing/MARKETING-PLAYBOOK.md:88-108.
  - **Settles:** Q35.

- [ ] **RB-61 · Retail, wholesale, FBA, 3PL and offset printing** · score 0.4 (1×2÷5) · gate: the retail gate in business/BUSINESS-PLAN.md §3.10 (units sold)
  - **Question:** Everything in business/BUSINESS-PLAN.md §4 and Appendix A rows A1-A113 marked [VERIFY] (distributors, rep groups, Target and Walmart routes, FBA and 3PL fees, GS1, offset quotes). Do not start before the gate; quotes come from the founder.
  - **Update:** business/BUSINESS-PLAN.md §4 and Appendix A, business/sections/04-retail-target-walmart.md, business/build_financial_model.py, marketing/AMAZON-AND-RETAIL-ROADMAP.md.
  - **Settles:** Q27.

## Done

- [x] RB-13 · 2026-09-28 · "Sweep the remaining UNVERIFIED and [VERIFY] marks" is replaced by the per-question items above and the index in Appendix A (no outside source needed).

---

## Conflicts the scan found inside the repository

These are disagreements between files, not outside facts. The item named settles each one.

1. **Merchant-of-record fee:** ops/TESTS/check_listings.py:81 uses 5% + $0.50; business/BUSINESS-PLAN.md:2254-2255 and commerce/storefront-setup-guide.md:192 use Gumroad at 10% + $0.50 (RB-18).
2. **KDP print cost for the 8 × 10 in guide:** $2.30 (business/BUSINESS-PLAN.md:2251), $2.30-$2.84 (products/guide-100-plays/listing.json `price_notes`), $3.72 (business/REVENUE-PLAN.md:488); nets $7.89, $7.35-$7.89 and $6.47 (RB-20).
3. **KDP print cost for the 32-page colour books:** $3.24 (business/BUSINESS-PLAN.md:2249-2250) versus $3.56 (business/REVENUE-PLAN.md:105) (RB-20).
4. **KDP new-title limit:** "10 new titles per format per week" (ops/GAPS-ROUND-2.md:132) versus a model recollection of 3 per day (RB-16, RB-21).
5. **TpT Basic:** a $29 one-time fee versus free (commerce/storefront-setup-guide.md:176; business/REVENUE-PLAN.md:504) (RB-19).
6. **Email free tiers:** marketing/MARKETING-PLAYBOOK.md:133 versus marketing/BLIND-SPOTS.md:66 versus business/REVENUE-PLAN.md:54 (RB-36).
7. **Allowed citations:** brand/BRAND.md:11 says "(all verified)"; content/research-hub/verification-queue.md says all Priority 1 sources are unread, and UNESCO GEM 2023 and Delgado 2018 are missing from the queue (RB-29).
8. **Early intervention:** the guide says "every state runs a free early intervention program"; marketing/CAMPAIGN-BIBLE.md:377 says "free early intervention evaluations" (RB-30).
9. **ALPHAPLAY extension fee:** legal/ENTITY.md:37 and marketing/BLIND-SPOTS.md:114 use $125 per class, which may predate the 2025 fee rule (RB-23).
10. **Not research, for the lead:** ops/QUEUE.md:5-8 and marketing/COMMUNITY-PRODUCTS.md still show "list / sale" price pairs (for example "$9.50 list / ~$6.50 sale"), which brand/BRAND.md "Honest pricing" and each launch listing's `price_notes` forbid as a standing discount.

## Needs a live check (every UNVERIFIED statement in this file)

Each line below is model knowledge or a repository figure that no one has checked on a live page. The item in brackets settles it.

1. Etsy fees: $0.20 per listing for 4 months, 6.5% transaction fee, US processing 3% + $0.25, Offsite Ads 15% (12% and mandatory above $10,000 in 12 months), a possible $15 setup fee, 2.5% currency conversion. [RB-18]
2. Shopify Basic $39 a month ($29 billed yearly); Shopify Payments 2.9% + 30¢ online; $15 per chargeback. [RB-18]
3. Gumroad 10% + $0.50 on direct sales, about 30% on Discover; merchant of record for all sales since January 1, 2025. [RB-08, RB-18]
4. Etsy collects VAT on digital items for EU, UK, Norwegian and Swiss buyers and GST for Australia and New Zealand; Canada less certain. [RB-09]
5. Etsy's 2024 Creativity Standards place AI-made items under "Designed by" and expect AI use to be disclosed; the form field is unclear. [RB-16]
6. KDP asks since September 2023 whether text, images or translations are AI-generated; "AI-assisted" content need not be disclosed; the answers are not shown to buyers. [RB-16]
7. KDP limits new titles per account per day (model recollection: 3 per day per format; the repo says 10 per week). [RB-16, RB-21]
8. KDP title review usually takes up to 72 hours; KDP may ask for proof of rights when the same content is found online. [RB-21]
9. Etsy holds a new seller's funds for about 14 days and may add a rolling reserve of about 30% for up to 45 days (repo figure from search). [RB-21]
10. KDP royalty: 60% of list at $9.99 or more since June 10, 2025, 50% below, 40% through Expanded Distribution. [RB-20]
11. KDP large trim means wider than 6.12 in or taller than 9 in. [RB-20]
12. KDP print: black and white, 24-108 pages, flat $2.30 regular and $2.84 large trim; premium colour $1.00 plus $0.07 a page regular or $0.08 large; standard colour needs 72 or more pages. [RB-20]
13. KDP paperbacks reach Amazon US, UK, DE, FR, ES, IT, NL, PL, SE, JP, CA and AU; KDP prints no board books; KDP hardcovers need 75 or more pages. [RB-10]
14. Etsy digital listings take 5 files of up to 20 MB; shops under $10,000 a year can opt out of Offsite Ads; one public reply per review, which locks the review; Star Seller needs 95% of first messages answered within 24 hours. [RB-32]
15. Etsy API: personal access covers the developer's own shop; access tokens last 1 hour, refresh tokens about 90 days; listing search returns price and tags. [RB-03]
16. TikTok: unaudited Content Posting API clients post only as SELF_ONLY. YouTube: uploads from unverified API projects created after July 28, 2020 are locked private. [RB-07]
17. Pinterest: apps on trial access may be limited to the sandbox; access tokens about 30 days, refresh about 60 days. [RB-04]
18. Meta: posts from an app in development mode may be visible only to people with a role on the app; Instagram caps API-published posts per 24 hours. LinkedIn's Community Management API needs approval; X's free tier allows few posts a month; Bluesky needs no approval. [RB-26]
19. Pinterest shows "AI modified" labels; Meta labels "AI info" and asks for disclosure of photorealistic video and audio; TikTok requires labels on realistic AI content and reads C2PA credentials; YouTube requires disclosure for realistic altered or synthetic content; Google Merchant Center expects AI-generated product images to keep their metadata. [RB-17]
20. USPTO: Statement of Use $150 per class and extension $125 per class (repo figures); the extension fee may have risen with the January 2025 fee rule (possibly $250 per class); up to five extensions, the first without good cause. [RB-23]
21. Nice classes: 9 downloadable printables and e-books, 16 printed matter, 25 clothing, 28 games and playing cards, 35 retail store services, 41 education and entertainment. [RB-22]
22. Maryland taxes digital products at 6% (since 2021); a 3% tax on certain data and IT services took effect July 1, 2025. [RB-31]
23. IDEA Part C: evaluation, assessment and service coordination are free to families; some states charge sliding-scale fees for some services. [RB-30]
24. The Poison Help line is 1-800-222-1222. [RB-30]
25. The CPSC small-parts test cylinder is 1.25 in wide; a toilet-paper tube is about 1.6-1.75 in. [RB-30]
26. Books designed for children 3 and under fall outside the CPSIA ordinary-book testing exemption (repo reading); CPSC eFiling applies from July 8, 2026 (repo figure). [RB-33]
27. Copyright Office: a new fee schedule may apply from about November 12, 2026, with the Standard Application at $85 (repo figures); AI-generated material must be identified and excluded from a claim. [RB-34]
28. Delgado et al. 2018: "Don't throw away your printed books", DOI 10.1016/j.edurev.2018.09.003. [RB-29]
29. GPSR: when Amazon or another retailer is the seller of a KDP or IngramSpark book, the retailer generally takes on the GPSR duties; responsible-person services cost about €100-600 a year (repo estimate). [RB-27]
30. Bowker: 1 ISBN $125, 10 for $295; a PCN must be requested before publication. [RB-38]
31. Hanukkah 2026 begins on the evening of December 4. [RB-28]

## Hosts this backlog needs that are not on ops/cloud/allowed-domains.txt

Add them (one per line) only when the item that needs them comes up, so the list stays least-privilege. Never add a login, search-result or autocomplete endpoint.

| Host | For |
|---|---|
| rdap.verisign.com | RB-43 (domain status) |
| branddb.wipo.int, www.tmdn.org | RB-22, RB-24 |
| poisonhelp.hrsa.gov | RB-30 |
| commission.europa.eu, www.lulu.com | RB-27 (and RB-54, RB-19 for Lulu) |
| apps.shopify.com | RB-35 |
| developer.x.com, docs.x.com, learn.microsoft.com, docs.bsky.app, help.x.com | RB-26, RB-47 |
| support.tiktok.com | RB-17 |
| www.myidentifiers.com, www.loc.gov | RB-38 |
| www.bisg.org, www.lifeprint.com, www.handspeak.com | RB-39 |
| www.fincen.gov | RB-40 |
| www.ayrshare.com | RB-11 |
| www.thegamecrafter.com | RB-37 |
| affiliate-program.amazon.com, bookshop.org | RB-48, RB-19 |
| marketplace.walmart.com, sell.amazon.com, payhip.com, www.lemonsqueezy.com, stripe.com, www.acx.com | RB-19 |
| www.ada.gov | RB-49 |
| www.census.gov | RB-58 |
| www.atanet.org | RB-60 |
| kit.com | RB-36 |

Already allowed and used above: tsdr.uspto.gov, tmsearch.uspto.gov, tmep.uspto.gov, www.uspto.gov, www.copyright.gov, www.federalregister.gov, www.ecfr.gov, www.cpsc.gov, www.ftc.gov, www.irs.gov, www.marylandtaxes.gov, mgaleg.maryland.gov, dat.maryland.gov, egov.maryland.gov, trends.google.com, trends.pinterest.com, www.etsy.com, help.etsy.com, developers.etsy.com, kdp.amazon.com, merch.amazon.com, www.amazon.com, www.ingramspark.com, help.teacherspayteachers.com, www.teacherspayteachers.com, www.shopify.com, help.shopify.com, shopify.dev, gumroad.com, developers.pinterest.com, policy.pinterest.com, help.pinterest.com, developers.facebook.com, transparency.meta.com, www.facebook.com, developers.tiktok.com, www.tiktok.com, seller-us.tiktok.com, support.google.com, developers.google.com, www.printful.com, help.printful.com, www.mailerlite.com, developers.mailerlite.com, help.kit.com, developers.kit.com, www.faire.com, www.usps.com, sites.ed.gov, www.cdc.gov, www.healthychildren.org, www.aap.org, publications.aap.org, www.who.int, unesdoc.unesco.org, the PubMed and DOI hosts, eur-lex.europa.eu, single-market-economy.ec.europa.eu, www.edpb.europa.eu, ico.org.uk, crtc.gc.ca, docs.github.com.

---

## Appendix A. Every mark in the repository, grouped by the question that settles it

**How the scan was done (September 28, 2026, re-run just before this file was written).** `grep -rnI -E 'UNVERIFIED|\[VERIFY\]|VERIFY|[Uu]nverified|[Nn]ot checked'` over the whole repository, excluding `.git`, `products/*/preview/`, binary files and vendored `node_modules` (third-party pdf-lib code). It matched **2,958 lines in 225 files**: content 966 (almost all the research hub), business 749, ops 306, legal 280, marketing 239, products 188, commerce 124, finance 38, operations 31, seo 27, brand 10. By form: "[VERIFY]" 1,627, other "VERIFY" forms such as "[VERIFY in KDP calculator]" 840, "UNVERIFIED" 879, "unverified" 272, "not checked" 2 (neither is a research question: ops/TESTS/network-hosts.md:131 and a checkbox on legal/protection/model-release-minor.md:38).

**How lines were grouped.** Each mark was assigned by the words in the text around it (about 240 characters before and 120 after). Research-hub, label, outreach and SEO-article files were grouped by folder. A line that states several facts appears under each question it needs, so the counts below add up to more than 2,792. The grouping is a keyword index, not a reading of every line: when an item is worked, open the file and settle everything the line says. Line numbers are as of the scan; files under products/ and brand/ were being edited that day.

### Q01. What does each platform require us to disclose about AI-made text and illustrations, and in what exact words or fields?
Settled by: RB-16, RB-17. Marks: 38 lines in 15 files.

- `marketing/BLIND-SPOTS.md`: 94
- `ops/GAPS-ROUND-2.md`: 132
- `ops/TESTS/check_listings.py`: 1619-1620
- `ops/TESTS/listing-qa.md`: 116, 209, 342, 445, 568, 671, 734, 817, 940, 1043, 1146, 1382, 1495, 1708, 1891, 1974-1975
- `products/bored-play-cards/listing.json`: 82, 126
- `products/merch-core/listing.json`: 354
- `products/picture-more-talk-less-tap/listing.json`: 92
- `products/picture-tablet-slept/listing.json`: 81
- `products/play-first-family-kit/listing.json`: 101
- `products/play-talk-cards/build/listings.js`: 12, 165
- `products/play-talk-cards/listing.json`: 142, 153
- `products/play-talk-cards/talk-along/listing.json`: 146, 157
- `products/visual-routine-cards/build/listing.js`: 43, 110
- `products/visual-routine-cards/listing-starter.json`: 167
- `products/visual-routine-cards/listing.json`: 186, 197

### Q02. What are Etsy's current fees (listing, transaction, processing, Offsite Ads, setup) and what does a sale net?
Settled by: RB-18. Marks: 63 lines in 19 files.

- `business/BUSINESS-PLAN.md`: 662, 2243-2247, 2283
- `business/REVENUE-PLAN.md`: 20, 22, 139, 275, 326, 504
- `business/STRESS-TEST.md`: 39, 350, 413
- `business/build_financial_model.py`: 192-196, 623
- `business/sections/02-products-channels.md`: 257
- `business/stress_test.py`: 341
- `commerce/PRICING.md`: 11
- `commerce/storefront-setup-guide.md`: 168
- `legal/international-plan.md`: 208
- `ops/TESTS/check_listings.py`: 179, 217, 1139, 1180, 1190, 1195, 1205-1206, 1504, 1612, 1625
- `ops/TESTS/listing-qa.md`: 29, 229, 465, 588, 960, 1186, 1309, 1412, 1515, 1728, 1730, 1738, 1911, 1967, 1980
- `products/bored-play-cards/listing.json`: 21, 126
- `products/merch-core/build/book.py`: 201
- `products/merch-core/listing.json`: 50, 236
- `products/merch-core/source.html`: 152
- `products/play-first-family-kit/listing.json`: 13
- `products/play-talk-cards/build/listings.js`: 38
- `products/play-talk-cards/listing.json`: 11
- `products/visual-routine-cards/build/listing.js`: 10

### Q03. What do the Shopify plan, Shopify Payments and chargebacks cost, and what do the needed apps cost?
Settled by: RB-18, RB-35. Marks: 67 lines in 17 files.

- `business/BUSINESS-PLAN.md`: 1482, 1951, 1984, 2206, 2232, 2241-2242, 2266, 2301, 2400, 2416
- `business/REVENUE-PLAN.md`: 20, 22, 37, 39, 122, 139, 156, 190, 275, 326
- `business/STRESS-TEST.md`: 38, 294, 419-420
- `business/build_financial_model.py`: 190-191, 220, 712
- `business/sections/04-retail-target-walmart.md`: 173
- `business/sections/05-operations-risk-milestones.md`: 302, 335
- `business/stress_test.py`: 336
- `commerce/links.schema.md`: 28-29
- `commerce/storefront-setup-guide.md`: 97, 100, 114
- `operations/AUTOMATION-MAP.md`: 102
- `operations/SOPs/school-orders.md`: 86
- `operations/TRUST-CHECKLIST.md`: 54
- `ops/GAPS-ROUND-2.md`: 152
- `ops/TESTS/check_listings.py`: 179, 217, 1139, 1180, 1190, 1195, 1205, 1504, 1613
- `ops/TESTS/listing-qa.md`: 29, 229, 465, 588, 960, 1186, 1309, 1412, 1515, 1728, 1730, 1738, 1911, 1968
- `products/bored-play-cards/listing.json`: 21
- `seo/SEO-PLAN.md`: 175

### Q04. What are KDP's current royalty rates and print costs for each of our trims and page counts?
Settled by: RB-20. Marks: 83 lines in 28 files.

- `business/BUSINESS-PLAN.md`: 293, 514, 671-672, 1015-1017, 1272, 2130, 2137, 2144-2145, 2158-2160, 2171, 2248-2251, 2253, 2435
- `business/REVENUE-PLAN.md`: 71, 105, 224, 258, 447, 460, 540
- `business/STRESS-TEST.md`: 77
- `business/build_financial_model.py`: 198-200, 202, 206, 494, 500
- `business/sections/01-vision-market.md`: 163
- `business/sections/02-products-channels.md`: 109, 266-267
- `business/sections/03-financial-model.md`: 139-141, 396
- `commerce/PRICING.md`: 13
- `finance/money-and-tax-setup.md`: 321
- `legal/international-plan.md`: 426
- `marketing/COMMUNITY-PRODUCTS.md`: 220
- `ops/TESTS/check_listings.py`: 137, 157, 179, 225, 1623-1624
- `ops/TESTS/listing-qa.md`: 136, 362, 588, 1063, 1978-1979
- `products/board-up-go-more/build/build.js`: 834-835
- `products/board-up-go-more/listing.json`: 11, 77
- `products/bored-play-cards/listing.json`: 78
- `products/course-screen-reset/build/cover-wrap.json`: 9
- `products/course-screen-reset/build/extras.js`: 45, 81
- `products/course-screen-reset/listing.json`: 21, 105
- `products/first-phone-plan/listing.json`: 69
- `products/guide-100-plays/build/extras.js`: 22
- `products/guide-100-plays/listing.json`: 14, 89
- `products/picture-tablet-slept/build.js`: 699
- `products/picture-tablet-slept/listing.json`: 9, 19, 77
- `products/play-talk-cards/build/listings.js`: 101
- `products/play-talk-cards/talk-along/listing.json`: 56
- `products/toddler-busy-book/build/listing.js`: 50
- `products/toddler-busy-book/listing.json`: 67

### Q05. Which formats and marketplaces does KDP offer, and which KDP process rules (review, title limits, AI questions, Expanded Distribution) apply?
Settled by: RB-10, RB-21. Marks: 48 lines in 20 files.

- `business/BUSINESS-PLAN.md`: 491, 2136
- `business/REVENUE-PLAN.md`: 73, 79, 109, 447, 488
- `business/sections/02-products-channels.md`: 86
- `commerce/links.schema.md`: 40
- `commerce/storefront-setup-guide.md`: 137, 145, 159, 250, 253, 270
- `legal/DECISION-MEMO.json`: 80
- `legal/LEGAL-LAUNCH-CHECKLIST.md`: 39
- `legal/international-plan.md`: 67-70, 73-76, 78, 184, 186
- `marketing/BLIND-SPOTS.md`: 94, 127, 129
- `marketing/BRAND-RESPECT-PLAN.md`: 212
- `marketing/CAMPAIGN-BIBLE.md`: 446
- `marketing/DEMAND-CHECK.md`: 23
- `ops/GAPS-ROUND-2.md`: 132
- `ops/LAUNCH-NOW.md`: 48
- `ops/QUEUE.md`: 13
- `ops/TESTS/check_listings.py`: 137, 225, 1620, 1623
- `ops/TESTS/listing-qa.md`: 136, 1063, 1975, 1978
- `products/picture-more-talk-less-tap/listing.json`: 92
- `products/picture-more-talk-less-tap/story-bonus/ARCHIVED-book-listing.json`: 35
- `products/picture-tablet-slept/listing.json`: 81

### Q06. What does IngramSpark charge, print and distribute (and what does Bookshop.org pay)?
Settled by: RB-19, RB-27. Marks: 116 lines in 32 files.

- `business/BUSINESS-PLAN.md`: 98, 148, 853, 1017-1018, 1272, 1340, 1374, 1380, 1585, 1598, 1705, 2120, 2154, 2160-2161, 2171, 2175, 2178, 2180, 2222-2223, 2229, 2252-2253, 2407, 2435
- `business/ONE-PAGE-SUMMARY.md`: 23
- `business/REVENUE-PLAN.md`: 73, 88, 105, 109, 447, 460, 540
- `business/STRESS-TEST.md`: 42, 63-64
- `business/build_financial_model.py`: 205-206, 274
- `business/sections/01-vision-market.md`: 18
- `business/sections/02-products-channels.md`: 448
- `business/sections/03-financial-model.md`: 141-142, 396
- `business/sections/04-retail-target-walmart.md`: 31, 65, 71, 276, 289
- `business/sections/05-operations-risk-milestones.md`: 56
- `business/stress_test.py`: 286, 364
- `commerce/links.schema.md`: 42, 53-54, 59
- `commerce/storefront-setup-guide.md`: 50, 137, 146, 159, 163, 241, 250, 253-254, 270
- `legal/DECISION-MEMO.json`: 64, 80
- `legal/LEGAL-LAUNCH-CHECKLIST.md`: 39
- `legal/international-plan.md`: 67-70, 72-73, 76, 83, 186, 196-199, 202-204, 313, 390, 509-510
- `legal/protection/PROTECTION-PLAN.md`: 45, 101, 280
- `legal/protection/marketplace-ip-report-checklist.md`: 78
- `marketing/AMAZON-AND-RETAIL-ROADMAP.md`: 19
- `marketing/BLIND-SPOTS.md`: 129
- `marketing/COMMUNITY-PRODUCTS.md`: 518
- `marketing/MARKETING-PLAYBOOK.md`: 108
- `ops/TESTS/check_listings.py`: 137, 225
- `ops/TESTS/listing-qa.md`: 136, 1063
- `ops/TESTS/network-hosts.md`: 131
- `products/board-up-go-more/build/build.js`: 834
- `products/board-up-go-more/listing.json`: 11, 77
- `products/guide-100-plays/listing.json`: 89
- `products/picture-laps-not-apps/listing.json`: 67
- `products/picture-more-talk-less-tap/story-bonus/ARCHIVED-book-listing.json`: 40
- `products/picture-tablet-slept/build.js`: 702
- `products/picture-tablet-slept/listing.json`: 10, 19, 77, 81, 155

### Q07. What are Teachers Pay Teachers' current seller tiers, payouts and rules? (channel held for counsel)
Settled by: RB-19, RB-17 (channel held for counsel). Marks: 52 lines in 21 files.

- `business/BUSINESS-PLAN.md`: 715, 994, 1705, 2229, 2256-2257, 2407
- `business/REVENUE-PLAN.md`: 275, 474, 504
- `business/build_financial_model.py`: 209-210, 456
- `business/sections/02-products-channels.md`: 310
- `business/sections/03-financial-model.md`: 118
- `business/sections/05-operations-risk-milestones.md`: 56
- `commerce/PRICING.md`: 12
- `commerce/links.schema.md`: 70
- `commerce/storefront-setup-guide.md`: 25, 29, 54, 175-176, 179
- `finance/money-and-tax-setup.md`: 204, 316
- `legal/DECISION-MEMO.json`: 64
- `legal/international-plan.md`: 72, 213-214, 217
- `legal/protection/PROTECTION-PLAN.md`: 101
- `marketing/DEMAND-CHECK.md`: 5, 129, 135
- `marketing/MARKETING-PLAYBOOK.md`: 149
- `operations/customer-service/response-standards.md`: 16
- `ops/RESEARCH-BACKLOG.md`: 34
- `ops/TESTS/check_listings.py`: 52, 217, 1209, 1504, 1615
- `ops/TESTS/listing-qa.md`: 25, 29, 960, 1963, 1970
- `ops/TESTS/network-hosts.md`: 131
- `products/picture-more-talk-less-tap/listing.json`: 34, 77, 92

### Q08. Is Gumroad (or another merchant of record) the seller for tax, what does it charge, and what can its API do?
Settled by: RB-08, RB-18. Marks: 61 lines in 19 files.

- `business/BUSINESS-PLAN.md`: 1916, 1932, 2254-2255
- `business/REVENUE-PLAN.md`: 20, 24, 28, 41, 122, 126, 453, 478, 493
- `business/STRESS-TEST.md`: 420
- `business/build_financial_model.py`: 207-208, 276
- `business/sections/05-operations-risk-milestones.md`: 267, 283
- `commerce/PRICING.md`: 15
- `commerce/links.schema.md`: 82-83
- `commerce/storefront-setup-guide.md`: 56, 58, 191-192, 230, 242, 265
- `legal/DECISION-MEMO.json`: 77-78, 96
- `legal/LEGAL-LAUNCH-CHECKLIST.md`: 38, 42
- `legal/SHIPPING-RETURNS-REFUNDS.md`: 57
- `legal/international-plan.md`: 79, 83, 250, 276, 278-281, 283-284, 287, 378, 415, 426
- `ops/CLOUD-RUNBOOK.md`: 110
- `ops/LAUNCH-NOW.md`: 13, 67
- `ops/TESTS/check_listings.py`: 157, 1504, 1614
- `ops/TESTS/listing-qa.md`: 29, 362, 1969
- `ops/TESTS/network-hosts.md`: 120
- `products/bored-play-cards/listing.json`: 21
- `products/course-screen-reset/listing.json`: 105

### Q09. What do the print-on-demand partners (Printful, Printify, Gelato, Lulu, The Game Crafter) cost, and what file, label and size specs do they require?
Settled by: RB-37. Marks: 86 lines in 27 files.

- `business/BUSINESS-PLAN.md`: 559, 561, 695, 785, 1503, 2141-2142, 2147, 2152, 2267, 2300, 2534
- `business/REVENUE-PLAN.md`: 37, 173, 207, 211, 241, 532, 560
- `business/build_financial_model.py`: 221, 653
- `business/sections/02-products-channels.md`: 154, 156, 290, 380
- `business/sections/04-retail-target-walmart.md`: 194
- `commerce/storefront-setup-guide.md`: 36, 105-106, 209, 224, 262
- `finance/money-and-tax-setup.md`: 232
- `legal/DECISION-MEMO.json`: 86
- `legal/LEGAL-LAUNCH-CHECKLIST.md`: 59
- `legal/international-plan.md`: 225, 227, 341
- `marketing/CAMPAIGN-BIBLE.md`: 68, 161-162, 283, 455, 479
- `marketing/COMMUNITY-PRODUCTS.md`: 125, 150, 198, 358, 392, 402, 427, 441
- `marketing/CUSTOMER-VOICE.md`: 340
- `marketing/DEMAND-CHECK.md`: 25, 86
- `operations/SOPs/wholesale-orders.md`: 45
- `ops/CLOUD-RUNBOOK.md`: 111-113
- `ops/TESTS/check_listings.py`: 185
- `ops/TESTS/listing-qa.md`: 691
- `ops/TESTS/network-hosts.md`: 3, 121
- `products/merch-core/build/book.py`: 102, 129, 140
- `products/merch-core/build/build.py`: 149
- `products/merch-core/listing.json`: 143, 172, 183, 335
- `products/merch-core/source.html`: 75, 96, 103
- `products/picture-laps-not-apps/listing.json`: 76, 136
- `products/play-talk-cards/build/listings.js`: 25, 38, 83, 169
- `products/play-talk-cards/listing.json`: 11, 146, 157
- `products/play-talk-cards/talk-along/listing.json`: 11, 150, 161

### Q10. What are Amazon Merch on Demand's current terms, royalties and upload limits?
Settled by: RB-19, RB-37. Marks: 20 lines in 9 files.

- `commerce/links.schema.md`: 44
- `commerce/storefront-setup-guide.md`: 52
- `legal/international-plan.md`: 228
- `marketing/AMAZON-AND-RETAIL-ROADMAP.md`: 10
- `ops/TESTS/check_listings.py`: 53-55, 185
- `ops/TESTS/listing-qa.md`: 26-28, 691, 1964-1966
- `products/merch-core/build/book.py`: 183
- `products/merch-core/listing.json`: 114, 177, 298
- `products/merch-core/source.html`: 137

### Q11. What are the current listing field limits and keyword rules on Etsy, KDP, Shopify, TpT and Merch on Demand?
Settled by: RB-12. Marks: 77 lines in 12 files.

- `business/BUSINESS-PLAN.md`: 318, 2131
- `business/REVENUE-PLAN.md`: 18, 26, 77, 241, 512, 516, 544, 556
- `business/STRESS-TEST.md`: 388
- `business/sections/01-vision-market.md`: 188
- `marketing/BRAND-RESPECT-PLAN.md`: 5
- `marketing/DEMAND-CHECK.md`: 5, 135
- `ops/RESEARCH-BACKLOG.md`: 34
- `ops/TESTS/check_listings.py`: 41-55, 813, 850, 854, 1498, 1616-1618, 1621-1622
- `ops/TESTS/listing-qa.md`: 10, 14, 16-28, 1952, 1954-1966, 1971-1973, 1976-1977
- `products/bored-play-cards/listing.json`: 126
- `products/visual-routine-cards/build/listing.js`: 110
- `products/visual-routine-cards/listing.json`: 197

### Q12. What file specifications do KDP, IngramSpark, card printers, offset printers and home printers accept?
Settled by: RB-20, RB-37. Marks: 119 lines in 39 files.

- `brand/ORIGINALITY.md`: 85
- `business/BUSINESS-PLAN.md`: 293, 559, 784, 1015, 1272, 1476-1477, 1491, 2130, 2141, 2151, 2158, 2171, 2201-2202, 2211, 2251, 2331, 2333, 2399
- `business/REVENUE-PLAN.md`: 71, 79, 105, 266, 488, 568
- `business/STRESS-TEST.md`: 41, 60-61, 63, 77
- `business/build_financial_model.py`: 202, 807, 809
- `business/sections/01-vision-market.md`: 163
- `business/sections/02-products-channels.md`: 154, 379
- `business/sections/03-financial-model.md`: 139, 396
- `business/sections/04-retail-target-walmart.md`: 167-168, 182
- `business/stress_test.py`: 356
- `commerce/storefront-setup-guide.md`: 137
- `legal/protection/PROTECTION-PLAN.md`: 280
- `marketing/CAMPAIGN-BIBLE.md`: 157, 162, 283
- `ops/TESTS/deps-and-paths.md`: 133
- `ops/TESTS/network-hosts.md`: 69
- `ops/TESTS/print-preflight.md`: 11, 19-20, 26, 44, 66, 77, 92, 122, 128, 148, 155, 158, 167, 182-183, 200, 225, 234, 246, 274, 282, 427
- `products/board-up-go-more/build/build.js`: 834, 841
- `products/board-up-go-more/listing.json`: 68, 76-77
- `products/board-up-go-more/paperback/cover-wrap.html`: 142
- `products/course-screen-reset/build/cover-wrap.json`: 9
- `products/course-screen-reset/build/extras.js`: 45, 81
- `products/course-screen-reset/listing.json`: 21
- `products/guide-100-plays/build/extras.js`: 22
- `products/guide-100-plays/listing.json`: 14, 89
- `products/merch-core/build/book.py`: 140, 147
- `products/merch-core/build/build.py`: 149
- `products/merch-core/source.html`: 103, 107
- `products/picture-laps-not-apps/listing.json`: 27, 76, 83
- `products/picture-more-talk-less-tap/story-bonus/ARCHIVED-book-listing.json`: 34, 40, 43, 45
- `products/picture-tablet-slept/build.js`: 699
- `products/picture-tablet-slept/listing.json`: 9-10, 77, 84
- `products/play-talk-cards/build/gen/pod-A-proof.html`: 134
- `products/play-talk-cards/build/gen/pod-A-tuck.html`: 98
- `products/play-talk-cards/build/gen/pod-B-proof.html`: 134
- `products/play-talk-cards/build/gen/pod-B-tuck.html`: 98
- `products/play-talk-cards/build/listings.js`: 25, 71, 169
- `products/play-talk-cards/build/pod.js`: 94, 145
- `products/play-talk-cards/listing.json`: 146, 157, 208
- `products/play-talk-cards/talk-along/listing.json`: 150, 161, 212

### Q13. What do Etsy's seller policies allow (outside links, file limits, duplicates, Offsite Ads opt-out, review replies, production partners, GPSR fields)?
Settled by: RB-32. Marks: 23 lines in 16 files.

- `business/BUSINESS-PLAN.md`: 715, 994, 2149
- `business/sections/02-products-channels.md`: 310
- `business/sections/03-financial-model.md`: 118
- `commerce/storefront-setup-guide.md`: 170
- `legal/international-plan.md`: 209, 227, 313
- `marketing/BRAND-RESPECT-PLAN.md`: 198
- `operations/customer-service/response-standards.md`: 38
- `ops/GAPS-ROUND-2.md`: 147
- `ops/TESTS/check_listings.py`: 42, 1625
- `ops/TESTS/listing-qa.md`: 15, 1953, 1980
- `products/merch-core/listing.json`: 354
- `products/picture-laps-not-apps/listing.json`: 63
- `products/picture-more-talk-less-tap/listing.json`: 92
- `products/play-talk-cards/build/listings.js`: 165
- `products/play-talk-cards/listing.json`: 153
- `products/play-talk-cards/talk-along/listing.json`: 157

### Q14. What can each platform API do for a brand-new seller (access tiers, token lifetimes, private-only posting, unscheduling)?
Settled by: RB-02 to RB-07, RB-11, RB-26. Marks: 71 lines in 22 files.

- `business/BUSINESS-PLAN.md`: 1481, 1501, 2308, 2537
- `business/REVENUE-PLAN.md`: 79
- `business/build_financial_model.py`: 722, 1411
- `business/sections/04-retail-target-walmart.md`: 172, 192
- `legal/international-plan.md`: 73
- `legal/protection/PROTECTION-PLAN.md`: 20
- `marketing/CAMPAIGN-BIBLE.md`: 162, 446
- `operations/customer-service/response-standards.md`: 16
- `ops/CLOUD-RUNBOOK.md`: 103-113, 115-118
- `ops/FULL-STOP.md`: 25-26, 28, 30, 36
- `ops/GAPS-ROUND-2.md`: 58, 82, 237
- `ops/LAUNCH-NOW.md`: 67, 70-72
- `ops/RESEARCH-BACKLOG.md`: 29
- `ops/SECRETS.md`: 21-23
- `ops/TESTS/check_listings.py`: 41-42
- `ops/TESTS/deps-and-paths.md`: 133
- `ops/TESTS/listing-qa.md`: 14-15, 1952-1953
- `ops/TESTS/network-hosts.md`: 66-67, 112-114, 116-121, 129-130
- `products/picture-laps-not-apps/build.js`: 816
- `products/picture-laps-not-apps/listing.json`: 21, 62, 76
- `products/play-first-family-kit/listing.json`: 116
- `seo/SEO-PLAN.md`: 175

### Q15. What do Maryland and federal tax rules require (sales tax on digital goods, registration, marketplace facilitators, 1099s, estimated tax, BOI)?
Settled by: RB-31, RB-40. Marks: 90 lines in 19 files.

- `business/BUSINESS-PLAN.md`: 940, 1762, 1932, 2156, 2240, 2254, 2291, 2371, 2532
- `business/REVENUE-PLAN.md`: 28, 130, 198, 453, 478, 493-494, 541
- `business/build_financial_model.py`: 207, 635
- `business/sections/03-financial-model.md`: 64
- `business/sections/05-operations-risk-milestones.md`: 113, 283
- `commerce/links.schema.md`: 29
- `commerce/storefront-setup-guide.md`: 9, 19, 27, 29, 32-33, 36, 44, 48-50, 52, 54-60, 62, 96, 100, 141, 149, 163, 179, 187, 191, 195, 210, 218, 226, 230, 241-242, 263, 278
- `finance/TAX-AUTOPILOT.md`: 8
- `finance/money-and-tax-setup.md`: 66, 76, 232, 267, 275, 281, 299, 302, 305-306, 315-316, 323, 335, 340, 342, 348, 464
- `legal/DECISION-MEMO.json`: 64, 90
- `legal/LEGAL-LAUNCH-CHECKLIST.md`: 39
- `legal/international-plan.md`: 287
- `legal/protection/PROTECTION-PLAN.md`: 172
- `marketing/BLIND-SPOTS.md`: 198
- `marketing/BRAND-RESPECT-PLAN.md`: 241
- `operations/SOPs/quarterly.md`: 7
- `operations/SOPs/yearly.md`: 35
- `ops/GAPS-ROUND-2.md`: 271
- `ops/LAUNCH-NOW.md`: 13

### Q16. Who owes VAT/GST on our digital and physical sales abroad, at what thresholds and rates?
Settled by: RB-09, RB-08, RB-50. Marks: 58 lines in 12 files.

- `business/BUSINESS-PLAN.md`: 541, 1932, 2139, 2254, 2272, 2442
- `business/REVENUE-PLAN.md`: 211, 232
- `business/build_financial_model.py`: 207, 246
- `business/sections/02-products-channels.md`: 136
- `business/sections/05-operations-risk-milestones.md`: 283
- `commerce/storefront-setup-guide.md`: 56, 191, 195, 230
- `legal/DECISION-MEMO.json`: 59, 77, 88, 93
- `legal/LEGAL-LAUNCH-CHECKLIST.md`: 38-39
- `legal/international-plan.md`: 42, 70, 193, 207, 214, 222, 226-228, 249-259, 263, 279, 281, 283-284, 294-296, 332, 392, 414, 432, 505
- `legal/protection/PROTECTION-PLAN.md`: 352
- `operations/TRUST-CHECKLIST.md`: 45
- `ops/LAUNCH-NOW.md`: 13

### Q17. What do EU GPSR, EU/UK/CA/AU toy rules, EPR and labelling laws require for books, decks and merch?
Settled by: RB-27, RB-50. Marks: 43 lines in 9 files.

- `business/BUSINESS-PLAN.md`: 779, 1477, 1921, 2202, 2399
- `business/sections/02-products-channels.md`: 374
- `business/sections/04-retail-target-walmart.md`: 168
- `business/sections/05-operations-risk-milestones.md`: 272
- `legal/DECISION-MEMO.json`: 79, 85-86, 93, 130
- `legal/LEGAL-LAUNCH-CHECKLIST.md`: 40
- `legal/international-plan.md`: 70, 199, 209, 222, 227, 305-308, 313-314, 319, 323-324, 327, 332-333, 340-342, 387-390, 510-511, 514
- `legal/protection/PROTECTION-PLAN.md`: 352
- `products/picture-laps-not-apps/listing.json`: 76

### Q18. Which consumer-protection rules apply (EU/UK withdrawal right and button, subscriptions, price-reduction rules, fixed book prices, Quebec)?
Settled by: RB-35, RB-50. Marks: 45 lines in 12 files.

- `business/BUSINESS-PLAN.md`: 575, 1916, 2143
- `business/REVENUE-PLAN.md`: 45, 164, 232, 300, 420, 451, 504
- `business/sections/02-products-channels.md`: 170
- `business/sections/05-operations-risk-milestones.md`: 267
- `legal/DECISION-MEMO.json`: 78, 82-83, 86-88, 96, 113
- `legal/LEGAL-LAUNCH-CHECKLIST.md`: 42
- `legal/SHIPPING-RETURNS-REFUNDS.md`: 57
- `legal/international-plan.md`: 68, 76-77, 254, 335-336, 343, 348, 351, 364, 375, 377-378, 384-385, 391-392, 444, 505
- `marketing/BLIND-SPOTS.md`: 198
- `marketing/BRAND-RESPECT-PLAN.md`: 241
- `marketing/COMMUNITY-PRODUCTS.md`: 548
- `products/merch-core/listing.json`: 236

### Q19. Which privacy rules apply to the site and email list (GDPR Art. 27, cookies, COPPA, state laws, CASL)?
Settled by: RB-41. Marks: 38 lines in 14 files.

- `business/BUSINESS-PLAN.md`: 715, 1089, 1928, 2315
- `business/REVENUE-PLAN.md`: 62
- `business/build_financial_model.py`: 731
- `business/sections/02-products-channels.md`: 310
- `business/sections/03-financial-model.md`: 213
- `business/sections/05-operations-risk-milestones.md`: 279
- `legal/DECISION-MEMO.json`: 68-71
- `legal/LEGAL-LAUNCH-CHECKLIST.md`: 61
- `legal/international-plan.md`: 307, 314, 324, 333, 344, 350, 355-360, 389, 444, 512
- `legal/protection/PROTECTION-PLAN.md`: 91, 182
- `marketing/AWARENESS-ENGINE.md`: 264, 343
- `marketing/MARKETING-PLAYBOOK.md`: 23-24, 133
- `operations/TRUST-CHECKLIST.md`: 38
- `products/picture-laps-not-apps/listing.json`: 76

### Q20. Which of our physical products are children's products under CPSIA, and who tests and certifies them?
Settled by: RB-33. Marks: 87 lines in 24 files.

- `business/BUSINESS-PLAN.md`: 541, 559, 784-785, 1479, 1488-1489, 1501, 1642, 1755, 1759, 1920, 2139, 2141, 2151-2152, 2204, 2208-2209, 2227, 2298, 2323, 2326, 2332
- `business/REVENUE-PLAN.md`: 113, 247, 260, 264, 266, 317, 603
- `business/build_financial_model.py`: 651, 794, 799, 808
- `business/sections/02-products-channels.md`: 136, 154, 379-380
- `business/sections/04-retail-target-walmart.md`: 170, 179-180, 192, 333
- `business/sections/05-operations-risk-milestones.md`: 106, 110, 271
- `business/stress_test.py`: 254
- `commerce/storefront-setup-guide.md`: 93, 105, 116, 154, 170, 209, 240
- `legal/DECISION-MEMO.json`: 72, 85, 130
- `legal/LEGAL-LAUNCH-CHECKLIST.md`: 59, 65
- `legal/international-plan.md`: 323, 349
- `legal/protection/PROTECTION-PLAN.md`: 26, 89, 165, 392
- `marketing/AMAZON-AND-RETAIL-ROADMAP.md`: 11
- `marketing/CAMPAIGN-BIBLE.md`: 68, 206, 228, 455, 588
- `marketing/COMMUNITY-PRODUCTS.md`: 512
- `products/board-up-go-more/listing.json`: 68
- `products/picture-laps-not-apps/listing.json`: 76
- `products/picture-more-talk-less-tap/story-bonus/ARCHIVED-book-listing.json`: 40, 48
- `products/picture-tablet-slept/listing.json`: 77, 88
- `products/play-talk-cards/build/listings.js`: 25, 169
- `products/play-talk-cards/listing.json`: 146, 157
- `products/play-talk-cards/talk-along/listing.json`: 150, 161
- `products/toddler-busy-book/build/listing.js`: 66
- `products/toddler-busy-book/listing.json`: 87

### Q21. What does the USPTO record show, what do filings cost, and are our names and slogans clear?
Settled by: RB-22, RB-23. Marks: 81 lines in 27 files.

- `brand/ORIGINALITY.md`: 32, 43, 97, 148
- `brand/logo-concepts-v2/d-before-ball/notes.md`: 109
- `business/BUSINESS-PLAN.md`: 784, 1475, 1752, 1905, 2137-2138, 2151, 2200, 2267, 2285, 2296, 2321, 2398
- `business/REVENUE-PLAN.md`: 141, 175, 396, 466, 504
- `business/STRESS-TEST.md`: 9, 38-39, 41-42, 290, 294-296, 383, 388
- `business/build_financial_model.py`: 221, 625, 648, 737
- `business/sections/02-products-channels.md`: 379
- `business/sections/04-retail-target-walmart.md`: 166
- `business/sections/05-operations-risk-milestones.md`: 103, 256
- `commerce/links.schema.md`: 45
- `finance/money-and-tax-setup.md`: 66
- `legal/DECISION-MEMO.json`: 2, 5-6, 9-10, 12, 52, 59, 91, 127
- `legal/ENTITY.md`: 37
- `legal/protection/PROTECTION-PLAN.md`: 19, 27, 53, 238, 295, 315, 321
- `legal/protection/marketplace-ip-report-checklist.md`: 30-31, 61, 70, 75
- `marketing/BLIND-SPOTS.md`: 114
- `marketing/BRAND-RESPECT-PLAN.md`: 71
- `marketing/COMMUNITY-PRODUCTS.md`: 253, 269, 280
- `operations/TRUST-CHECKLIST.md`: 80
- `products/board-up-go-more/listing.json`: 74
- `products/merch-core/listing.json`: 298
- `products/play-first-family-kit/listing.json`: 116
- `products/play-talk-cards/build/listings.js`: 166
- `products/play-talk-cards/listing.json`: 154
- `products/play-talk-cards/talk-along/listing.json`: 158
- `products/toddler-busy-book/build/listing.js`: 66
- `products/toddler-busy-book/listing.json`: 87

### Q22. What do Copyright Office registrations and DMCA steps cost and require, including for AI-assisted work?
Settled by: RB-34, RB-38. Marks: 35 lines in 16 files.

- `business/BUSINESS-PLAN.md`: 1753, 1905
- `business/REVENUE-PLAN.md`: 73, 79, 107
- `business/sections/05-operations-risk-milestones.md`: 104, 256
- `legal/DECISION-MEMO.json`: 72, 91, 93, 134
- `legal/protection/PROTECTION-PLAN.md`: 21-22, 260, 315, 321-322
- `legal/protection/digital-product-license.md`: 10
- `legal/protection/marketplace-ip-report-checklist.md`: 31, 61, 70, 75-76
- `marketing/BLIND-SPOTS.md`: 94, 154
- `marketing/CAMPAIGN-BIBLE.md`: 157, 435
- `marketing/COMMUNITY-PRODUCTS.md`: 203
- `operations/TRUST-CHECKLIST.md`: 77
- `products/board-up-go-more/listing.json`: 84
- `products/merch-core/listing.json`: 166
- `products/picture-more-talk-less-tap/listing.json`: 92
- `products/picture-more-talk-less-tap/story-bonus/ARCHIVED-book-listing.json`: 49
- `products/picture-tablet-slept/listing.json`: 81, 91

### Q23. How big are the markets (US population figures, international screen-time signals)?
Settled by: RB-58. Marks: 48 lines in 5 files.

- `business/BUSINESS-PLAN.md`: 249, 258-263, 269-270, 402, 2121-2129, 2135, 2352-2354
- `business/sections/01-vision-market.md`: 119, 128-133, 139-140, 272
- `legal/international-plan.md`: 60, 64, 68-75, 77-79
- `marketing/BRAND-RESPECT-PLAN.md`: 170
- `marketing/CUSTOMER-VOICE.md`: 128

### Q24. What do buyers pay competitors, how many reviews and sales do they show, and is there demand for each planned product?
Settled by: RB-25, RB-14, RB-52. Marks: 300 lines in 49 files.

- `brand/ORIGINALITY.md`: 85
- `business/BUSINESS-PLAN.md`: 269, 318, 328, 410, 559, 1016, 1338, 1374, 1382, 1388, 1460, 1465, 1491, 1503-1504, 1521, 1534, 1561, 1610, 1642, 1885, 1914, 2128, 2131, 2133, 2141, 2159, 2174, 2178, 2183, 2189, 2195-2199, 2211, 2214, 2219-2220, 2225, 2227, 2240, 2248, 2250, 2256, 2293, 2304, 2308-2310, 2353, 2395, 2397, 2433, 2536-2538, 2540
- `business/REVENUE-PLAN.md`: 18, 20, 26, 62, 77, 122, 241, 247, 264, 309, 447, 512, 524, 528, 552, 556, 566, 572-573
- `business/STRESS-TEST.md`: 9, 39, 41, 249, 275, 290, 388
- `business/build_financial_model.py`: 167, 185, 198, 200, 209, 643, 717, 722-723, 725
- `business/sections/01-vision-market.md`: 139, 188, 198
- `business/sections/02-products-channels.md`: 5, 154
- `business/sections/03-financial-model.md`: 140
- `business/sections/04-retail-target-walmart.md`: 29, 65, 73, 79, 151, 156, 182, 194-195, 212, 225, 252, 301, 333
- `business/sections/05-operations-risk-milestones.md`: 236, 265
- `business/stress_test.py`: 341
- `commerce/PRICING.md`: 3, 11-13
- `commerce/links.schema.md`: 44, 54
- `commerce/storefront-setup-guide.md`: 52, 106, 138, 145, 168, 223, 250
- `legal/DECISION-MEMO.json`: 50, 82
- `legal/international-plan.md`: 42, 72, 75, 193, 208, 228, 335, 383-384, 391, 430, 432
- `legal/protection/PROTECTION-PLAN.md`: 8, 89
- `legal/protection/digital-product-license.md`: 10
- `marketing/AMAZON-AND-RETAIL-ROADMAP.md`: 10-11
- `marketing/AWARENESS-ENGINE.md`: 7, 25, 29
- `marketing/BLIND-SPOTS.md`: 3, 127
- `marketing/BRAND-RESPECT-PLAN.md`: 28, 268, 328
- `marketing/CAMPAIGN-BIBLE.md`: 68, 129, 161, 228
- `marketing/COMMUNITY-PRODUCTS.md`: 7, 42, 102, 109, 113, 120, 125, 132, 138, 145, 150, 156-157, 162, 167, 174, 182, 186, 191, 198, 208, 213, 220, 225, 230, 236, 244, 249, 256, 265, 271, 276, 284, 291, 304, 317, 327, 332, 338, 345, 358, 365, 370, 376-377, 383, 387, 392, 397, 402, 415, 423, 427, 434, 441, 447, 452, 462, 468, 475, 485, 488, 498, 504, 509, 518
- `marketing/DEMAND-CHECK.md`: 23, 129, 135
- `marketing/EVENTS-CAMPAIGN-PLAN.md`: 154, 523
- `operations/TRUST-CHECKLIST.md`: 74
- `ops/LAUNCH-NOW.md`: 72
- `ops/QUEUE.md`: 13, 30, 48, 69
- `ops/TESTS/check_listings.py`: 53-55, 185, 217, 854, 1205, 1209, 1612, 1623
- `ops/TESTS/listing-qa.md`: 26-28, 691, 960, 1738, 1964-1967, 1978
- `products/board-up-go-more/listing.json`: 11
- `products/bored-play-cards/listing.json`: 21
- `products/first-phone-plan/listing.json`: 12
- `products/merch-core/build/book.py`: 183, 201
- `products/merch-core/listing.json`: 50, 114, 177, 236, 298, 451
- `products/merch-core/panel.md`: 48
- `products/merch-core/source.html`: 137, 152
- `products/picture-laps-not-apps/listing.json`: 38, 76
- `products/picture-more-talk-less-tap/listing.json`: 34
- `products/picture-more-talk-less-tap/story-bonus/ARCHIVED-book-listing.json`: 10, 35
- `products/picture-tablet-slept/listing.json`: 19, 35, 87
- `products/play-first-family-kit/listing.json`: 13
- `products/play-talk-cards/build/listings.js`: 38, 83, 165
- `products/play-talk-cards/listing.json`: 11, 153
- `products/play-talk-cards/talk-along/listing.json`: 11, 157
- `products/visual-routine-cards/build/listing.js`: 10, 60, 110
- `products/visual-routine-cards/listing.json`: 12, 197
- `seo/SEO-PLAN.md`: 11, 21, 248, 539

### Q25. What do people search for (keyword volumes) and what does Google's own guidance say (hreflang, rich results, Merchant Center, Business Profile)?
Settled by: RB-14, RB-15, RB-45. Marks: 56 lines in 15 files.

- `brand/ORIGINALITY.md`: 68
- `business/REVENUE-PLAN.md`: 79, 232
- `commerce/links.schema.md`: 71, 74
- `commerce/storefront-setup-guide.md`: 121-123, 206
- `legal/DECISION-MEMO.json`: 93
- `legal/international-plan.md`: 99, 105, 122, 125, 145-146, 148-150, 155-156
- `legal/protection/digital-product-license.md`: 10
- `marketing/AWARENESS-ENGINE.md`: 29, 33, 95
- `marketing/COMMUNITY-PRODUCTS.md`: 230, 253, 280
- `operations/TRUST-CHECKLIST.md`: 89
- `ops/RESEARCH-BACKLOG.md`: 34
- `ops/TESTS/check_listings.py`: 47-48, 850, 854, 1618
- `ops/TESTS/listing-qa.md`: 20-21, 1958-1959, 1973
- `ops/TESTS/network-hosts.md`: 129
- `seo/SEO-PLAN.md`: 11, 21, 25-34, 248, 253, 440

### Q26. On what dates do holidays, awareness days, sales events and shipping cutoffs fall?
Settled by: RB-28, RB-44. Marks: 49 lines in 18 files.

- `business/BUSINESS-PLAN.md`: 491, 519, 2136, 2138, 2140, 2142
- `business/REVENUE-PLAN.md`: 283, 420, 560, 566
- `business/sections/02-products-channels.md`: 86, 114
- `legal/international-plan.md`: 296
- `legal/protection/PROTECTION-PLAN.md`: 102
- `marketing/BLIND-SPOTS.md`: 10, 70
- `marketing/BRAND-RESPECT-PLAN.md`: 301
- `marketing/CAMPAIGN-BIBLE.md`: 354
- `marketing/COMMUNITY-PRODUCTS.md`: 206, 293, 536
- `marketing/EVENTS-CAMPAIGN-PLAN.md`: 6, 148, 154, 268, 313-314, 351, 355, 437, 474, 482-484, 486, 519, 523, 578, 655-656
- `marketing/MARKETING-PLAYBOOK.md`: 32, 175
- `marketing/templates/media-pitch-gift-guide.md`: 6
- `products/merch-core/build/book.py`: 206
- `products/merch-core/listing.json`: 123
- `products/merch-core/source.html`: 157
- `products/play-first-family-kit/listing.json`: 13
- `products/play-talk-cards/build/listings.js`: 38
- `products/play-talk-cards/listing.json`: 11

### Q27. How do retail, wholesale, FBA, 3PL and offset printing really work and cost? (gated by units sold)
Settled by: RB-61. Marks: 330 lines in 25 files.

- `business/BUSINESS-PLAN.md`: 98, 148, 541, 547, 674, 779, 784, 837, 853, 929, 940, 1027, 1035, 1037, 1095, 1191, 1315, 1326, 1338, 1340, 1347, 1366, 1373-1375, 1380-1382, 1386-1388, 1397, 1406, 1415, 1418, 1426, 1437, 1456, 1460, 1476-1477, 1481-1483, 1490-1491, 1501, 1512, 1521, 1531, 1561, 1575, 1585, 1610, 1622, 1778-1779, 1951, 2120, 2139-2140, 2146, 2150-2151, 2153-2156, 2162-2164, 2169-2170, 2172-2173, 2175-2194, 2196-2198, 2201-2202, 2205-2207, 2210-2211, 2215-2218, 2220-2222, 2225-2226, 2230-2231, 2258-2266, 2268-2277, 2279, 2292, 2297, 2299-2300, 2325, 2327-2331, 2334-2340, 2367, 2371, 2395, 2397, 2399-2401, 2405, 2436-2437, 2439-2442, 2444, 2448, 2533-2534, 2544
- `business/ONE-PAGE-SUMMARY.md`: 23
- `business/REVENUE-PLAN.md`: 35, 173, 309, 377, 420, 460
- `business/build_financial_model.py`: 211-217, 219-220, 229-232, 246, 252-255, 261, 284, 460, 513, 531-532, 642, 650, 652-653, 786, 796, 801-804, 807, 810-813, 816-818, 866
- `business/sections/01-vision-market.md`: 18
- `business/sections/02-products-channels.md`: 136, 142, 269, 374, 379, 432, 448
- `business/sections/03-financial-model.md`: 53, 64, 151, 159, 161, 219, 315
- `business/sections/04-retail-target-walmart.md`: 6, 17, 29, 31, 38, 57, 64-66, 71-73, 77-79, 88, 97, 106, 109, 117, 128, 147, 151, 167-168, 172-174, 181-182, 192, 203, 212, 222, 252, 266, 276, 301, 313
- `business/sections/05-operations-risk-milestones.md`: 129-130, 302
- `commerce/links.js`: 62
- `commerce/links.schema.md`: 23, 45, 75-76
- `commerce/storefront-setup-guide.md`: 20, 29, 59-60, 145, 239-240, 250, 262-263, 266
- `legal/DECISION-MEMO.json`: 5, 64, 79, 130, 134
- `legal/LEGAL-LAUNCH-CHECKLIST.md`: 40
- `legal/international-plan.md`: 67-69, 77, 145, 163, 186, 198, 203, 220-222
- `legal/protection/PROTECTION-PLAN.md`: 99, 322
- `legal/protection/marketplace-ip-report-checklist.md`: 76
- `marketing/AMAZON-AND-RETAIL-ROADMAP.md`: 11, 19-20, 23
- `marketing/BLIND-SPOTS.md`: 73, 131, 172, 174
- `marketing/DEMAND-CHECK.md`: 23
- `operations/SOPs/wholesale-orders.md`: 17
- `operations/TRUST-CHECKLIST.md`: 35
- `products/board-up-go-more/listing.json`: 11
- `products/picture-more-talk-less-tap/story-bonus/ARCHIVED-book-listing.json`: 10
- `seo/SEO-PLAN.md`: 248

### Q28. What will insurance cost, and what limits do platforms and retailers require?
Settled by: RB-55. Marks: 54 lines in 13 files.

- `business/BUSINESS-PLAN.md`: 1091, 1373, 1478-1479, 1905, 1908, 2168, 2203, 2316-2320, 2337, 2339
- `business/REVENUE-PLAN.md`: 309, 317, 460
- `business/STRESS-TEST.md`: 338
- `business/build_financial_model.py`: 732-736, 813, 817
- `business/sections/03-financial-model.md`: 215
- `business/sections/04-retail-target-walmart.md`: 64, 169-170
- `business/sections/05-operations-risk-milestones.md`: 256, 259
- `legal/LEGAL-LAUNCH-CHECKLIST.md`: 5
- `legal/protection/PROTECTION-PLAN.md`: 18, 20, 26, 93, 99, 101-102, 116, 391
- `legal/protection/marketplace-ip-report-checklist.md`: 33
- `ops/CLOUD-RUNBOOK.md`: 104-106, 108-109, 118
- `ops/SECRETS.md`: 22-23
- `ops/TESTS/network-hosts.md`: 116-118

### Q29. What will the attorney, accountant and other advisers cost, and what must they confirm?
Settled by: RB-55. Marks: 121 lines in 22 files.

- `business/BUSINESS-PLAN.md`: 547, 779, 1061, 1465, 1475, 1503, 1512, 1642, 1751-1753, 1755, 1885, 2140, 2165, 2199-2200, 2215, 2227, 2285-2291, 2295, 2314, 2322-2324, 2334, 2380, 2398, 2532, 2542
- `business/REVENUE-PLAN.md`: 141, 466, 541
- `business/build_financial_model.py`: 625, 630-635, 647, 729, 738, 794-795, 810
- `business/sections/02-products-channels.md`: 142, 374
- `business/sections/03-financial-model.md`: 185
- `business/sections/04-retail-target-walmart.md`: 156, 166, 194, 203, 333
- `business/sections/05-operations-risk-milestones.md`: 102-104, 106, 236
- `finance/money-and-tax-setup.md`: 66, 146-147
- `legal/DECISION-MEMO.json`: 2-3, 14, 52, 59, 69-70, 72, 93, 127, 130, 134
- `legal/ENTITY.md`: 37
- `legal/LEGAL-LAUNCH-CHECKLIST.md`: 5, 42, 61, 65
- `legal/international-plan.md`: 356, 358, 384, 444, 510, 512
- `legal/protection/PROTECTION-PLAN.md`: 21-22, 60, 75, 114-115, 119, 132, 150, 360, 381
- `legal/protection/marketplace-ip-report-checklist.md`: 31
- `marketing/AWARENESS-ENGINE.md`: 349
- `marketing/BLIND-SPOTS.md`: 3, 114, 174
- `marketing/COMMUNITY-PRODUCTS.md`: 186, 236, 249, 452
- `marketing/MARKETING-PLAYBOOK.md`: 23, 136, 175
- `products/picture-laps-not-apps/listing.json`: 76
- `products/play-talk-cards/build/listings.js`: 25, 169
- `products/play-talk-cards/listing.json`: 146, 157
- `products/play-talk-cards/talk-along/listing.json`: 150, 161

### Q30. What do Maryland entity filings, the trade name, the PO Box and seller-profile addresses cost and require?
Settled by: RB-46. Marks: 27 lines in 15 files.

- `brand/ORIGINALITY.md`: 90
- `business/BUSINESS-PLAN.md`: 1885, 2313, 2541
- `business/REVENUE-PLAN.md`: 79, 495
- `business/STRESS-TEST.md`: 298
- `business/build_financial_model.py`: 728
- `business/sections/05-operations-risk-milestones.md`: 236
- `finance/money-and-tax-setup.md`: 68, 281, 497
- `legal/DECISION-MEMO.json`: 62-63
- `legal/LEGAL-LAUNCH-CHECKLIST.md`: 7
- `legal/protection/PROTECTION-PLAN.md`: 8, 18-19, 53, 56, 183
- `marketing/MARKETING-PLAYBOOK.md`: 23-24
- `operations/TRUST-CHECKLIST.md`: 40
- `products/board-up-go-more/listing.json`: 68
- `products/merch-core/listing.json`: 354
- `products/picture-laps-not-apps/listing.json`: 76

### Q31. What must a printed neck label say (FTC textile and care rules), and what template does the print partner use?
Settled by: RB-42. Marks: 21 lines in 18 files.

- `legal/DECISION-MEMO.json`: 9, 11
- `ops/TESTS/check_listings.py`: 185
- `ops/TESTS/listing-qa.md`: 691
- `products/merch-core/labels/neck-label_2XL_dark.svg`: 1
- `products/merch-core/labels/neck-label_2XL_light.svg`: 1
- `products/merch-core/labels/neck-label_3XL_dark.svg`: 1
- `products/merch-core/labels/neck-label_3XL_light.svg`: 1
- `products/merch-core/labels/neck-label_L_dark.svg`: 1
- `products/merch-core/labels/neck-label_L_light.svg`: 1
- `products/merch-core/labels/neck-label_M_dark.svg`: 1
- `products/merch-core/labels/neck-label_M_light.svg`: 1
- `products/merch-core/labels/neck-label_S_dark.svg`: 1
- `products/merch-core/labels/neck-label_S_light.svg`: 1
- `products/merch-core/labels/neck-label_XL_dark.svg`: 1
- `products/merch-core/labels/neck-label_XL_light.svg`: 1
- `products/merch-core/labels/neck-label_XS_dark.svg`: 1
- `products/merch-core/labels/neck-label_XS_light.svg`: 1
- `products/merch-core/listing.json`: 50, 166, 451

### Q32. What do the business tools cost and allow (email platform, download app, bookkeeping, bank, password manager, schedulers)?
Settled by: RB-36, RB-35, RB-56. Marks: 116 lines in 36 files.

- `brand/ORIGINALITY.md`: 43
- `business/BUSINESS-PLAN.md`: 1085, 1534, 1951, 2166, 2219, 2302-2307, 2309, 2381, 2536, 2538
- `business/REVENUE-PLAN.md`: 18, 35, 54, 126, 156, 190, 275, 420, 453, 478, 494, 504, 552
- `business/STRESS-TEST.md`: 79, 296, 338
- `business/build_financial_model.py`: 715-717, 719-721, 723
- `business/sections/03-financial-model.md`: 209
- `business/sections/04-retail-target-walmart.md`: 225
- `business/sections/05-operations-risk-milestones.md`: 302
- `commerce/links.schema.md`: 29
- `commerce/storefront-setup-guide.md`: 25, 54, 57-58, 100, 129-130, 179, 230-231, 242, 265
- `finance/BANKING.md`: 13
- `finance/money-and-tax-setup.md`: 68, 76, 106, 143, 146-147, 155, 204, 316, 335
- `legal/international-plan.md`: 278, 281, 283-284
- `legal/protection/PROTECTION-PLAN.md`: 45, 48, 182, 328
- `legal/protection/digital-product-license.md`: 10
- `marketing/BLIND-SPOTS.md`: 66
- `marketing/CAMPAIGN-BIBLE.md`: 184, 228, 459
- `marketing/COMMUNITY-PRODUCTS.md`: 102, 113, 138, 198, 265, 269, 276, 536, 548
- `marketing/MARKETING-PLAYBOOK.md`: 24, 133
- `operations/AUTOMATION-MAP.md`: 102
- `operations/SOPs/account-security.md`: 8
- `operations/SOPs/school-orders.md`: 86
- `operations/TRUST-CHECKLIST.md`: 35, 39, 74, 90
- `ops/CLOUD-RUNBOOK.md`: 115, 117
- `ops/FULL-STOP.md`: 28
- `ops/GAPS-ROUND-2.md`: 169
- `ops/TESTS/network-hosts.md`: 3, 114
- `products/picture-more-talk-less-tap/listing.json`: 96, 137
- `products/picture-more-talk-less-tap/panel.md`: 99
- `products/play-first-family-kit/listing.json`: 13, 116
- `products/play-talk-cards/build/listings.js`: 129
- `products/play-talk-cards/listing.json`: 98
- `products/play-talk-cards/talk-along/listing.json`: 98
- `products/visual-routine-cards/build/listing.js`: 28, 60
- `products/visual-routine-cards/listing-starter.json`: 127
- `products/visual-routine-cards/listing.json`: 12, 146

### Q33. Which domains, handles and URL patterns are available and correct?
Settled by: RB-43, RB-47. Marks: 125 lines in 37 files.

- `brand/ORIGINALITY.md`: 68
- `business/BUSINESS-PLAN.md`: 774, 1373, 1387, 2185, 2263, 2274, 2311-2312
- `business/REVENUE-PLAN.md`: 24
- `business/STRESS-TEST.md`: 295
- `business/build_financial_model.py`: 216, 253, 726-727
- `business/sections/02-products-channels.md`: 369
- `business/sections/04-retail-target-walmart.md`: 64, 78
- `commerce/links.js`: 62
- `commerce/links.schema.md`: 7, 15, 22-23, 28, 30-31, 37, 60-62, 69, 71-72, 74, 76, 87, 97
- `commerce/storefront-setup-guide.md`: 101, 230, 241
- `legal/DECISION-MEMO.json`: 2, 11-12, 14, 20, 25-26, 30, 35, 40, 45, 50-53, 59
- `legal/LEGAL-LAUNCH-CHECKLIST.md`: 39
- `legal/SHIPPING-RETURNS-REFUNDS.md`: 57
- `legal/domain-portfolio.md`: 1, 12, 19, 24, 32-33, 47, 49, 61, 68, 70, 83, 88-93, 101, 105, 112, 127, 138, 152
- `legal/international-plan.md`: 42, 67, 69-71, 83, 96, 145-146, 197, 221-222, 228, 278, 505
- `legal/protection/PROTECTION-PLAN.md`: 116, 182
- `marketing/AWARENESS-ENGINE.md`: 265, 344
- `marketing/BRAND-RESPECT-PLAN.md`: 5
- `marketing/CAMPAIGN-BIBLE.md`: 157, 195, 435
- `marketing/COMMUNITY-PRODUCTS.md`: 203
- `marketing/CUSTOMER-VOICE.md`: 11
- `marketing/MARKETING-PLAYBOOK.md`: 23
- `marketing/SOCIAL-HANDLES.md`: 16
- `operations/SOPs/account-security.md`: 3
- `operations/SOPs/school-orders.md`: 62
- `operations/SOPs/wholesale-orders.md`: 17
- `operations/TRUST-CHECKLIST.md`: 38-39, 45
- `ops/CLOUD-RUNBOOK.md`: 104
- `ops/LAUNCH-NOW.md`: 13
- `ops/ROUTINE.md`: 33
- `ops/TESTS/cloud-rehearsal.md`: 165
- `ops/TESTS/deps-and-paths.md`: 23
- `ops/TESTS/network-hosts.md`: 119
- `products/merch-core/listing.json`: 451
- `products/play-talk-cards/build/listings.js`: 163
- `products/play-talk-cards/listing.json`: 151
- `products/play-talk-cards/talk-along/listing.json`: 155

### Q34. What do the affiliate programs (Amazon Associates, Bookshop.org) pay and require?
Settled by: RB-48. Marks: 35 lines in 13 files.

- `business/BUSINESS-PLAN.md`: 1375, 1914, 2179, 2263
- `business/REVENUE-PLAN.md`: 62, 88, 90, 96, 474
- `business/build_financial_model.py`: 216
- `business/sections/04-retail-target-walmart.md`: 66
- `business/sections/05-operations-risk-milestones.md`: 265
- `commerce/links.schema.md`: 7, 47, 53-54
- `commerce/storefront-setup-guide.md`: 9, 159-160, 183, 207, 218, 284
- `finance/money-and-tax-setup.md`: 103, 323
- `legal/AFFILIATE-ENDORSEMENT-DISCLOSURE.md`: 10
- `legal/DECISION-MEMO.json`: 81-82
- `legal/international-plan.md`: 75, 204, 235, 336, 509
- `legal/protection/PROTECTION-PLAN.md`: 45
- `marketing/BRAND-RESPECT-PLAN.md`: 339

### Q35. What do awards, conferences, newsletters and library/education marketing placements cost, and are they still running?
Settled by: RB-57. Marks: 39 lines in 10 files.

- `business/BUSINESS-PLAN.md`: 1512, 2215, 2294
- `business/build_financial_model.py`: 644
- `business/sections/04-retail-target-walmart.md`: 203
- `marketing/AMAZON-AND-RETAIL-ROADMAP.md`: 19
- `marketing/BLIND-SPOTS.md`: 195
- `marketing/BRAND-RESPECT-PLAN.md`: 28, 71, 105, 295, 301, 309, 339
- `marketing/COMMUNITY-PRODUCTS.md`: 244, 253
- `marketing/EDUCATION-GROUPS.md`: 35
- `marketing/EVENTS-CAMPAIGN-PLAN.md`: 6, 437, 489, 652-658, 662-663, 691
- `marketing/MARKETING-PLAYBOOK.md`: 88, 94-96, 108, 119, 138, 149, 236

### Q36. Which accessibility laws apply, from when?
Settled by: RB-49. Marks: 5 lines in 4 files.

- `business/REVENUE-PLAN.md`: 283, 504
- `legal/DECISION-MEMO.json`: 88
- `legal/international-plan.md`: 392
- `marketing/BRAND-RESPECT-PLAN.md`: 170

### Q37. Is the safety, health and access wording we print correct, and what do translators and sensitivity readers cost?
Settled by: RB-30, RB-60. Marks: 25 lines in 9 files.

- `business/REVENUE-PLAN.md`: 326, 328, 392
- `legal/international-plan.md`: 76, 83, 155, 462
- `marketing/BRAND-RESPECT-PLAN.md`: 150
- `marketing/CAMPAIGN-BIBLE.md`: 184, 267, 272, 294, 377, 379, 389, 420
- `marketing/COMMUNITY-PRODUCTS.md`: 120
- `ops/APPROVALS.md`: 5
- `ops/TESTS/check_hub_firewall.py`: 78
- `ops/TESTS/check_listings.py`: 623, 1620, 1626
- `ops/TESTS/listing-qa.md`: 1382, 1975, 1981

### Q38. Do research claims used in marketing match the primary papers?
Settled by: RB-29. Marks: 26 lines in 8 files.

- `brand/BRAND.md`: 11
- `business/BUSINESS-PLAN.md`: 379, 2134
- `business/REVENUE-PLAN.md`: 130, 300
- `business/sections/01-vision-market.md`: 249
- `marketing/AWARENESS-ENGINE.md`: 25
- `marketing/BRAND-RESPECT-PLAN.md`: 71, 123, 129, 139
- `marketing/CAMPAIGN-BIBLE.md`: 55, 70, 183-184, 206, 247, 267, 294, 326, 379, 412-414, 552
- `marketing/COMMUNITY-PRODUCTS.md`: 107

### Q39. Can the personalized keepsake book run from order to printer with no manual step, and on what terms?
Settled by: RB-54. Marks: 41 lines in 13 files.

- `business/BUSINESS-PLAN.md`: 327, 561, 2132, 2142
- `business/REVENUE-PLAN.md`: 241, 536, 540
- `business/sections/01-vision-market.md`: 197
- `business/sections/02-products-channels.md`: 156
- `marketing/BLIND-SPOTS.md`: 129
- `marketing/COMMUNITY-PRODUCTS.md`: 402
- `marketing/DEMAND-CHECK.md`: 25, 86
- `products/guide-100-plays/listing.json`: 89
- `products/picture-laps-not-apps/ORDER-TO-PRINT.md`: 3, 29-33, 35, 37, 43, 45, 53, 58, 63, 71-72, 74
- `products/picture-laps-not-apps/listing.json`: 21, 38, 62-63, 67, 76, 132, 144
- `products/picture-laps-not-apps/panel.md`: 50
- `products/picture-laps-not-apps/personalization.json`: 174
- `products/picture-more-talk-less-tap/story-bonus/ARCHIVED-book-listing.json`: 40

### Q40. What do the social-commerce shops (Meta, TikTok Shop, Pinterest catalog, YouTube Shopping) require and charge?
Settled by: RB-19, RB-26. Marks: 19 lines in 5 files.

- `business/BUSINESS-PLAN.md`: 785, 2152
- `business/sections/02-products-channels.md`: 380
- `commerce/links.schema.md`: 71, 75
- `commerce/storefront-setup-guide.md`: 20, 29, 55, 113-114, 116, 199-200, 206-207, 209-210
- `finance/money-and-tax-setup.md`: 106, 316

### Q41. Research hub: does each study page match its primary source (authors, DOI/PMID, numbers, design, stance)?
Settled by: H1-H7 (plus RB-29 for UNESCO GEM 2023 and Delgado 2018). Marks: 924 lines in 84 files.

- `content/research-hub/_data/library.json`: 33, 49, 65, 81, 97, 113, 129, 145, 161, 177, 193, 209, 225, 241, 257, 273, 289, 321, 337, 353, 369, 385, 401, 417, 433, 449, 465, 481, 497, 513, 529, 545, 561, 593, 609, 625, 634, 641, 673, 689, 705, 721, 737, 753, 769, 785, 801, 810, 817, 833, 849, 865, 881, 897, 913, 921, 929, 945, 961, 977, 985-986, 991, 993, 1008, 1024, 1057, 1073, 1105, 1137, 1153, 1167, 1169, 1185, 1201, 1217
- `content/research-hub/faq.md`: 15, 19, 31, 35, 41-43, 49, 53, 57, 63, 67, 71, 87, 91, 95, 99, 109, 113, 117, 121, 125, 135, 139, 153
- `content/research-hub/glossary.md`: 11, 25, 29, 31, 33, 35, 37, 39, 43, 53, 55, 63, 65, 71, 73, 75, 77, 79, 83, 85, 87, 93, 97, 99, 111, 119, 123, 129, 135, 141, 143, 145, 147, 151, 159, 161, 163, 165, 167, 171
- `content/research-hub/index.md`: 46, 50, 54, 58, 62, 66, 70, 74, 78, 82, 86, 90, 94, 98, 102, 106, 110, 114, 118, 122, 126, 130, 134, 138, 142, 146, 150, 154, 158, 162, 166, 173, 185, 189-193, 201-202, 213, 215, 217, 219, 227, 233, 235, 241, 243-245, 249-250, 254-255, 263, 271-275, 284, 293, 298, 304, 312, 330, 343
- `content/research-hub/library.md`: 29, 36-41, 47-56, 62, 64-70, 76-84, 86-89, 91-107, 113-116, 122-123, 125-126, 128, 130-135, 144, 152
- `content/research-hub/review/REVIEW-PACK.md`: 11, 35, 47, 58, 71, 73, 79, 105, 107, 116, 118, 147, 210, 268, 365, 368, 370, 374
- `content/research-hub/review/build-bundle.js`: 58, 195, 207, 344, 362, 405
- `content/research-hub/review/hub-review-bundle.html`: 117, 135, 164, 166, 169, 172-175, 179, 182-183, 186, 188, 190, 193, 197, 201, 204, 206, 208, 211, 216, 221-222, 236, 238, 241, 244, 246, 248, 251, 253, 255, 263, 265, 267, 269, 274, 276, 278, 280, 282, 287, 289, 296-297, 310, 312-317, 319, 324-325, 329-330, 333-337, 339-341, 344, 346-347, 353, 357, 359, 362, 365, 368-371, 373, 377-381, 383, 387, 425, 432, 435, 440-441, 444, 451-452, 455, 458, 460, 462, 464, 472-473, 486, 489, 491, 501
- `content/research-hub/studies/aap-2016-media-and-young-minds.md`: 19-20, 22, 41, 49, 62, 64, 70
- `content/research-hub/studies/aap-2026-digital-ecosystems.md`: 16, 19-20, 28, 49, 54, 62, 64
- `content/research-hub/studies/aap-2026-technical-report.md`: 16, 19, 28, 61
- `content/research-hub/studies/al-moussawi-2024-lebanon.md`: 16, 28, 84
- `content/research-hub/studies/alper-2020-letter.md`: 16, 20, 28, 52, 67, 83
- `content/research-hub/studies/alrahili-2021.md`: 16, 19, 28, 47, 65, 83
- `content/research-hub/studies/apims-2023-pakistan.md`: 16, 19, 28, 69, 91
- `content/research-hub/studies/authorea-2025-preprint.md`: 16, 19, 28, 64, 82
- `content/research-hub/studies/autismus-deutschland-statement.md`: 16, 19, 28, 66, 84
- `content/research-hub/studies/basaran-sanal-otizm.md`: 14, 16, 19-20, 28, 36, 64, 66, 82
- `content/research-hub/studies/brushe-2024.md`: 19-20, 41, 45, 49, 54-55, 66, 68
- `content/research-hub/studies/cai-2025-mendelian-randomization.md`: 16, 19-20, 28, 67, 69, 85
- `content/research-hub/studies/chen-2020-mediation.md`: 16, 28, 43, 47, 51, 82
- `content/research-hub/studies/chen-2021-longhua.md`: 16, 19-20, 28, 51, 66, 68, 84
- `content/research-hub/studies/chonchaiya-2011.md`: 16, 28, 59, 89
- `content/research-hub/studies/detroja-bhatia-2024.md`: 16, 19, 28, 65, 87
- `content/research-hub/studies/devenir-2020-epee.md`: 16, 19, 28, 65, 83
- `content/research-hub/studies/dhungel-2026.md`: 16, 19, 28, 64, 82
- `content/research-hub/studies/dong-2021.md`: 16, 19, 28, 67, 85
- `content/research-hub/studies/dunckley-electronic-screen-syndrome.md`: 16, 19-20, 28, 63, 65
- `content/research-hub/studies/ecrans-et-autisme-2017-handout.md`: 16, 19, 28, 47, 56, 65, 83
- `content/research-hub/studies/ejcm-2025-case-control.md`: 16, 19, 28, 64, 82
- `content/research-hub/studies/garg-2024.md`: 16, 28, 83
- `content/research-hub/studies/georgia-2025-bmc-pediatrics.md`: 16, 19, 28, 67, 85
- `content/research-hub/studies/georgia-2026-cross-sectional.md`: 16, 19, 28, 53, 60, 68, 86
- `content/research-hub/studies/harle-2019.md`: 43, 47, 51, 91
- `content/research-hub/studies/heffler-2020.md`: 19-20, 43, 59, 71, 73, 93
- `content/research-hub/studies/heffler-2022-case-report.md`: 16, 19, 28, 68, 86
- `content/research-hub/studies/heffler-2024-sensory.md`: 16, 28, 41, 49
- `content/research-hub/studies/heffler-oestreicher-2016.md`: 16, 19-20, 28, 66, 68, 88
- `content/research-hub/studies/hermawati-2018.md`: 16, 19-20, 28, 47, 68, 70, 86
- `content/research-hub/studies/hill-2020.md`: 16, 19-20, 28, 68, 70, 86
- `content/research-hub/studies/hill-2024.md`: 16, 19, 28, 67, 89
- `content/research-hub/studies/krijnen-2026-autism.md`: 16, 19-20, 28, 65, 67, 87
- `content/research-hub/studies/kushima-2022.md`: 20, 47, 57, 74, 94
- `content/research-hub/studies/lin-2025-lsac.md`: 16, 28, 47, 91
- `content/research-hub/studies/lin-yh-2022-screen-timing-letter.md`: 16, 19, 28, 63, 81
- `content/research-hub/studies/liu-2025-meta-analysis.md`: 16, 28, 51-52, 58, 84
- `content/research-hub/studies/lsac-2026-trajectories.md`: 16, 19, 28, 47, 65, 83
- `content/research-hub/studies/madigan-2019.md`: 19-20, 22, 41, 45, 49, 64, 66, 72
- `content/research-hub/studies/madigan-2020-language-meta-analysis.md`: 16, 28, 45, 49
- `content/research-hub/studies/mallawaarachchi-2024-contexts.md`: 16, 19, 28, 45, 64
- `content/research-hub/studies/marcelli-2018-epee.md`: 16, 19, 28, 58, 67, 85
- `content/research-hub/studies/melchior-2022-elfe.md`: 16, 19, 28, 52, 67, 85
- `content/research-hub/studies/mohamed-2023-digital-detox.md`: 16, 28
- `content/research-hub/studies/moktan-2022-nepal.md`: 16, 19, 28, 65, 83
- `content/research-hub/studies/montes-2016.md`: 16, 19, 28, 65, 83
- `content/research-hub/studies/ophir-2023-meta-analysis.md`: 16, 19-20, 28, 54, 62, 72, 74, 90
- `content/research-hub/studies/ozyazici-2026.md`: 16, 19, 28, 66, 88
- `content/research-hub/studies/pliska-2025-parents.md`: 15-16, 19, 28, 35, 47, 64, 82
- `content/research-hub/studies/pouretemad-2022-pdnas.md`: 16, 19-20, 28, 51, 67, 69, 85
- `content/research-hub/studies/psihologia-ro-critique.md`: 16, 19, 28, 64, 82
- `content/research-hub/studies/psychologiescientifique-critique.md`: 16, 19, 28, 64, 82
- `content/research-hub/studies/rangaraj-2026.md`: 16, 19, 28, 65, 87
- `content/research-hub/studies/sadeghi-2021-parent-child-interaction.md`: 10, 16, 19, 28, 34, 47, 51, 57, 66, 84
- `content/research-hub/studies/sadeghi-2023-severity.md`: 16, 28, 51, 84
- `content/research-hub/studies/sarfraz-2023-systematic-review.md`: 16, 28, 43, 47, 51, 83
- `content/research-hub/studies/screen-use-language-5-to-7.md`: 10, 14-16, 19, 28, 32-34, 62
- `content/research-hub/studies/slobodin-2019-review.md`: 16, 19, 28, 67, 85
- `content/research-hub/studies/smc-2020-expert-reaction.md`: 16, 19, 28, 43, 51, 66, 84
- `content/research-hub/studies/spitzer-2023.md`: 16, 28, 84
- `content/research-hub/studies/sundarimaa-2025-singapore.md`: 16, 19-20, 28, 52, 59, 67, 69, 85
- `content/research-hub/studies/takahashi-i-2023.md`: 19-20, 50-51, 57, 67, 69
- `content/research-hub/studies/takahashi-i-2024-genetic-risk-letter.md`: 16, 19-20, 28, 49, 61, 63
- `content/research-hub/studies/takahashi-n-2023-genetics.md`: 16, 19, 28, 51, 67, 89
- `content/research-hub/studies/tunisia-2025-screen-patterns.md`: 16, 19-20, 28, 67, 69, 89
- `content/research-hub/studies/van-asselt-2026.md`: 16, 19, 28, 64, 82
- `content/research-hub/studies/vanderloo-2025-disabilities.md`: 16, 19, 28, 61
- `content/research-hub/studies/waldman-2008.md`: 16, 19-20, 28, 57, 65, 67, 83
- `content/research-hub/studies/who-2019-under-5-guidelines.md`: 19-20, 41, 56, 65, 67
- `content/research-hub/studies/yamamoto-2023-jecs.md`: 16, 19, 28, 65
- `content/research-hub/studies/yuan-jadd-systematic-review.md`: 10, 16, 19, 28, 34, 56, 66, 84
- `content/research-hub/studies/zamfir-2018-romanian-essays.md`: 16, 19, 28, 47, 51, 68, 86
- `content/research-hub/studies/zamfir-2018.md`: 16, 19, 28, 43, 47, 60, 72, 94
- `content/research-hub/studies/zhang-2023-shared-genetic-risk.md`: 16, 19, 28, 41, 49, 63
- `content/research-hub/verification-queue.md`: 16, 18, 24, 28, 30, 32, 34, 36, 41, 45, 47, 49, 51, 55, 59, 61, 63, 65, 67, 69, 71, 73, 75, 79, 81, 90, 92, 94, 96, 100, 102, 104, 106, 108, 110, 112, 116, 118, 120, 124, 126, 128, 130, 132, 134, 138, 140, 142, 144, 146, 148, 150, 152, 158, 160, 164, 166, 168, 170, 172, 174, 176, 215

### Q42. Research hub: are the early-intervention program facts right for the US, UK, Canada and Australia?
Settled by: H7 (the hub page), RB-30 (products and marketing copy). Marks: 28 lines in 2 files.

- `content/research-hub/early-intervention.md`: 6, 10, 12, 14, 16, 18, 20, 22, 28, 35, 45, 47, 58, 79, 82-84, 91, 99, 103-105, 110-111, 115-116, 132
- `content/research-hub/pediatrician-questions.md`: 12

### Q43. Research hub: translation demand and editorial cadence.
Settled by: H1-H7. Marks: 14 lines in 2 files.

- `content/research-hub/editorial-policy.md`: 25, 35, 41-42, 82
- `content/research-hub/translation-plan.md`: 10, 19, 23, 25, 27-28, 50, 52, 66

### Q44. Outreach list: are the names, roles, contact routes and stances of the listed people and organizations current?
Settled by: RB-59. Marks: 19 lines in 1 files.

- `marketing/virtual-autism-outreach.md`: 36-39, 41, 43, 87, 100-101, 103-104, 106-109, 111, 154, 176, 198

### Q45. Is there search demand for each SEO article's target keyword?
Settled by: RB-14, RB-15. Marks: 10 lines in 10 files.

- `seo/articles/01-screen-time-by-age.md`: 8
- `seo/articles/02-screen-free-activities-by-age.md`: 8
- `seo/articles/03-what-to-do-instead-of-screens-toddlers.md`: 8
- `seo/articles/04-family-media-plan.md`: 8
- `seo/articles/05-reading-on-paper-vs-screens.md`: 8
- `seo/articles/06-screen-free-brain-breaks.md`: 8
- `seo/articles/07-reading-with-babies-and-toddlers.md`: 8
- `seo/articles/08-what-is-virtual-autism.md`: 8
- `seo/articles/09-screen-time-and-toddler-talk.md`: 8
- `seo/articles/10-turning-off-screens-without-meltdowns.md`: 8

### Q46. What do ACX and other audiobook routes pay and require?
Settled by: RB-19. Marks: 5 lines in 2 files.

- `business/REVENUE-PLAN.md`: 343, 345, 347, 504
- `commerce/links.schema.md`: 63

### Q47. What do paid ads cost per click in our categories?
Settled by: RB-53. Marks: 25 lines in 14 files.

- `business/BUSINESS-PLAN.md`: 559, 1479, 1501, 2141, 2312
- `business/REVENUE-PLAN.md`: 260, 266
- `business/STRESS-TEST.md`: 161, 386
- `business/build_financial_model.py`: 727
- `business/sections/02-products-channels.md`: 154
- `business/sections/04-retail-target-walmart.md`: 170, 192
- `business/stress_test.py`: 254
- `commerce/storefront-setup-guide.md`: 105, 209, 240
- `legal/DECISION-MEMO.json`: 51
- `legal/LEGAL-LAUNCH-CHECKLIST.md`: 59
- `legal/protection/PROTECTION-PLAN.md`: 26, 165
- `marketing/AMAZON-AND-RETAIL-ROADMAP.md`: 11
- `marketing/CAMPAIGN-BIBLE.md`: 455
- `marketing/MARKETING-PLAYBOOK.md`: 32, 138

### Q48. What do ISBNs cost, and can AlphaPlay LLC get a Library of Congress PCN?
Settled by: RB-38. Marks: 41 lines in 16 files.

- `business/BUSINESS-PLAN.md`: 779, 853, 1380, 1476, 1491, 1585, 2154, 2181, 2201, 2211, 2222, 2284, 2331
- `business/REVENUE-PLAN.md`: 73, 107, 260, 328
- `business/build_financial_model.py`: 624, 807
- `business/sections/02-products-channels.md`: 374, 448
- `business/sections/04-retail-target-walmart.md`: 71, 167, 182, 276
- `commerce/links.schema.md`: 54, 59
- `commerce/storefront-setup-guide.md`: 137, 145, 270
- `finance/money-and-tax-setup.md`: 66
- `legal/DECISION-MEMO.json`: 80
- `legal/LEGAL-LAUNCH-CHECKLIST.md`: 5
- `legal/protection/PROTECTION-PLAN.md`: 276, 280, 387
- `marketing/CAMPAIGN-BIBLE.md`: 446
- `marketing/MARKETING-PLAYBOOK.md`: 88
- `products/board-up-go-more/listing.json`: 76
- `products/picture-laps-not-apps/listing.json`: 83
- `seo/SEO-PLAN.md`: 248

### Q49. School- and group-facing details (standards, SAM.gov, fundraisers). Held for employment counsel.
Settled by: Held for employment counsel. Marks: 12 lines in 7 files.

- `business/REVENUE-PLAN.md`: 56, 358, 366, 398, 577, 579
- `legal/international-plan.md`: 349
- `marketing/BRAND-RESPECT-PLAN.md`: 5
- `marketing/MARKETING-PLAYBOOK.md`: 136
- `operations/TRUST-CHECKLIST.md`: 81
- `products/picture-more-talk-less-tap/listing.json`: 110
- `products/picture-more-talk-less-tap/panel.md`: 97

### Q50. Are the BISAC subject codes and the ASL signs in the books correct?
Settled by: RB-39. Marks: 12 lines in 7 files.

- `legal/DECISION-MEMO.json`: 71
- `legal/international-plan.md`: 344
- `marketing/MARKETING-PLAYBOOK.md`: 95
- `products/board-up-go-more/listing.json`: 73, 84, 92-94
- `products/board-up-go-more/panel.md`: 54, 58
- `products/picture-tablet-slept/listing.json`: 155
- `products/picture-tablet-slept/panel.md`: 51

### Q51. ops/EXPERIMENTS.md "Needs a live check": the platform data, benchmarks and law the experiments rely on.
Settled by: RB-51, and the platform items it names. Marks: 77 lines in 1 files.

- `ops/EXPERIMENTS.md`: 12, 129-139, 141-142, 157, 181, 200-201, 214, 219, 221, 223, 279, 282, 296, 302, 339, 342, 344, 385, 393, 412, 421, 424, 452, 459, 462, 470, 492, 500, 508, 510, 514, 544, 574, 577, 591, 600, 604, 614, 623, 626-627, 634, 639, 649, 668, 683, 697, 703, 711, 716, 719, 747, 749, 766, 782-783, 815, 826-828, 830-831, 834, 836, 902

### Q00. File-level status notes ("web search was not available", "every figure is UNVERIFIED"). Remove each note when the file's own items are settled; code that tests for the marks stays.
Settled by: housekeeping. Marks: 134 lines in 34 files.

- `brand/ORIGINALITY.md`: 18, 148
- `business/BUSINESS-PLAN.md`: 72, 136, 410, 883, 940, 1646, 1655, 2114, 2116, 2156, 2228, 2234, 2236, 2279, 2371
- `business/REVENUE-PLAN.md`: 3, 486
- `business/STRESS-TEST.md`: 77, 411
- `business/build_financial_model.py`: 4, 115-116
- `business/sections/01-vision-market.md`: 6
- `business/sections/02-products-channels.md`: 5
- `business/sections/03-financial-model.md`: 7, 64
- `business/sections/04-retail-target-walmart.md`: 337
- `business/sections/05-operations-risk-milestones.md`: 6
- `business/stress_test.py`: 55, 284, 286
- `commerce/PRICING.md`: 3
- `commerce/links.js`: 15
- `commerce/storefront-setup-guide.md`: 29, 32, 36, 100, 106, 123, 129, 137, 153, 160, 184, 200, 218, 224, 284
- `finance/money-and-tax-setup.md`: 15, 82, 109, 117, 146, 149, 168, 334-335, 413, 497
- `legal/DECISION-MEMO.json`: 50
- `legal/LEGAL-LAUNCH-CHECKLIST.md`: 72
- `legal/international-plan.md`: 8, 24, 125, 202-203, 208, 221, 225, 294-296, 319, 326, 342, 350-351, 357, 369, 375, 388-389, 391, 426, 444, 453, 462, 544
- `legal/protection/PROTECTION-PLAN.md`: 8
- `legal/protection/marketplace-ip-report-checklist.md`: 5
- `legal/protection/model-release-minor.md`: 38
- `marketing/AMAZON-AND-RETAIL-ROADMAP.md`: 3
- `marketing/AWARENESS-ENGINE.md`: 95, 344
- `marketing/DEMAND-CHECK.md`: 5
- `marketing/SOCIAL-HANDLES.md`: 16
- `operations/AUTOMATION-MAP.md`: 6, 185
- `operations/SOPs/yearly.md`: 5
- `operations/TRUST-CHECKLIST.md`: 7, 31, 51, 72, 87
- `ops/GAPS-ROUND-2.md`: 5
- `ops/LAUNCH-NOW.md`: 62, 91
- `ops/RESEARCH-BACKLOG.md`: 3, 35
- `ops/TESTS/check_hub_firewall.py`: 246-247
- `ops/TESTS/check_listings.py`: 22, 77, 1133, 1498, 1603
- `ops/TESTS/listing-qa.md`: 10, 116, 209, 342, 445, 568, 671, 734, 817, 940, 1043, 1146, 1382, 1495, 1708, 1891

### Q99. One-off statements not tied to a platform rule (settle during the file's next edit).
Settled by: none. Marks: 13 lines in 8 files.

- `business/REVENUE-PLAN.md`: 292
- `legal/DECISION-MEMO.json`: 66
- `marketing/AWARENESS-ENGINE.md`: 26, 51, 238, 299, 345
- `marketing/BRAND-RESPECT-PLAN.md`: 36
- `marketing/MARKETING-PLAYBOOK.md`: 8
- `ops/CLOUD-RUNBOOK.md`: 99
- `ops/TESTS/network-hosts.md`: 85, 134
- `products/guide-100-plays/listing.json`: 161

---

## Still to test

_Added September 28, 2026 by the completeness critic. It read ops/TESTS/print-preflight.md, ops/TESTS/listing-qa.md, business/STRESS-TEST.md, ops/EXPERIMENTS.md, ops/PRE-MORTEM.md and this file, and skimmed ops/, marketing/, business/, legal/ and operations/. Each item below is a test or check that nothing in the repository runs yet, or that a plan asks for but nobody has done. Items are scored the same way as the ranked items above (I×R÷E). "Fits after" names the row of the Ranking table the item belongs after. The lead merges these rows into that table. Until then, a run takes an item here once every open item above its "Fits after" row is done or gated._

_**When:** **Now** means a build session with no web access can do it; the container has Python with PyMuPDF, Pillow, numpy, OpenCV and fontTools, plus Playwright and Chromium. **Web** means the session's network must reach the named host. **Person** means it needs a human, or a device the container does not have. **Launch** means it needs real orders or traffic. "Measured today" figures come from read-only probes run on September 28, 2026 at about 05:00 UTC, while other workflows were still editing products/. Re-run a probe before acting on its number._

_**Rules:** a test writes only its own result file. Anything it finds in products/, brand/, content/ or site-concepts/ goes to the owner workflow as a request (ops/ROUTINE.md §2). Result files never quote personal data: they give counts, paths and line numbers only._

| Rank here | ID | Test in brief | I×R÷E | Score | When | Fits after |
|---|---|---|---|---|---|---|
| 1 | RB-62 | Scan the whole git history for exposure | 3×5÷1 | 15 | Now (part b needs the deny-list secret) | RB-09 |
| 2 | RB-63 | Check printed promises against the policies | 4×3÷1 | 12 | Now | RB-22 |
| 3 | RB-64 | Walk fake orders through the order-to-money path (tabletop) | 5×4÷2 | 10 | Now; repeat at Launch | RB-30 |
| 4 | RB-65 | Check every printed URL and QR code against the site and the domain | 5×4÷2 | 10 | Now; live check at Launch | RB-64 |
| 5 | RB-66 | Colour-blind and greyscale legibility, product by product | 3×3÷1 | 9 | Now | RB-34 |
| 6 | RB-67 | Customer-support load and macro coverage | 4×4÷2 | 8 | Now; part (c) Web; calibrate at Launch | RB-32 |
| 7 | RB-68 | Channel-loss and cost-shock scenarios in the stress test | 4×4÷2 | 8 | Now | RB-67 |
| 8 | RB-69 | Activity-by-activity hazard audit, then a qualified human review | 4×5÷3 | 6.7 | Now (first pass); Person | RB-33 |
| 9 | RB-70 | Disaster-recovery drill: repository, accounts, founder away | 4×5÷3 | 6.7 | Now (parts a and b); Person | RB-69 |
| 10 | RB-71 | Home-printer test on Letter and A4 | 4×3÷2 | 6 | Now (simulated); Person (physical) | RB-27 |
| 11 | RB-72 | Founder-time audit against the 60-minute weekly cap | 4×3÷2 | 6 | Now | RB-71 |
| 12 | RB-73 | Delivery and device test of the files buyers receive | 4×3÷2 | 6 | Now (viewers); Person or Web (phones, Etsy app) | RB-72 |
| 13 | RB-74 | Regression fixtures for the gate checkers | 4×3÷2 | 6 | Now | RB-73 |
| 14 | RB-75 | Translation quality before any Spanish text ships | 3×4÷2 | 6 | Now (back-translation); Person (native review) | RB-74 |
| 15 | RB-76 | PDF accessibility: tags, reading order, alt text, screen reader | 3×3÷2 | 4.5 | Now; Person (screen-reader pass) | RB-17 |
| 16 | RB-77 | Site accessibility (WCAG 2.1 AA) of the winning site concept | 3×3÷2 | 4.5 | Now (partial); Web (axe-core) | RB-76 |
| 17 | RB-78 | Print colour soft-proof and a proof-copy checklist | 3×3÷2 | 4.5 | Web (ICC profile); Person (proofs) | RB-77 |
| 18 | RB-79 | Font and asset licence register | 2×2÷1 | 4 | Now | RB-78 (before RB-26) |
| 19 | RB-80 | Real-parent use test (adults only, no child data) | 5×3÷4 | 3.8 | Web, then founder OK and budget | RB-26 |
| 20 | RB-81 | Reading level and length by age band | 3×2÷2 | 3 | Now (genre norms: Web) | RB-42 |

- [ ] **RB-62 · Scan the whole git history for exposure** · score 15 (3×5÷1) · gate: none for part (a); part (b) needs the deny-list secret from ops/PRE-MORTEM.md fix 2
  - **Question:** The repository has been public, so what does its history hold, not only today's files? (a) Credentials: token and key patterns in every text diff. (b) Personal details: run the deny-list over every commit's text diffs, the text and metadata of every committed PDF, and the PNG text chunks. Commit author names and emails are covered by RB-06.
  - **Why it matters:** The repository was still public at 04:19 UTC (ops/PRE-MORTEM.md risk 1). Making it private hides it from now on, but it does not undo what could already be read. Counsel decides on any history clean-up (risk 1, fix 4) and needs to know what the history actually holds. The exposure guard (fix 2) scans current files only.
  - **Measured today:** part (a) only. `git log --all -G` over every .md, .json, .js, .py, .sh, .html, .txt, .toml and .yml diff in 157 commits, searching for GitHub, Anthropic, AWS, Slack, Shopify and Meta token shapes and private-key headers, found **no match**. Part (b) was not run: the deny-list is not in this session, and it must never be written into the repository.
  - **When:** Now. Part (b) runs in a session where the deny-list secret is set.
  - **File:** ops/TESTS/exposure-history-scan.md (counts, commit IDs and paths only, never the matched text); the lead adds a one-line pointer in legal/FOR-EMPLOYMENT-COUNSEL.md.

- [ ] **RB-63 · Check printed promises against the policies** · score 12 (4×3÷1) · gate: none
  - **Question:** Does every promise a buyer can read match the policy files and what ops/ROUTINE.md §5b actually does? Scan product files, listings, emails and the site for refunds and guarantees, reply times, licence scope, updates and delivery. Compare with legal/SHIPPING-RETURNS-REFUNDS.md, legal/TERMS-OF-USE.md and legal/protection/digital-product-license.md.
  - **Why it matters:** Printed and sold files cannot be recalled. A promise the shop does not keep turns into Etsy cases, chargebacks and a consumer-law problem. PRE-MORTEM risk 41 found that the routine's automatic refund contradicts the policy, but nobody has scanned the product files themselves.
  - **Measured today:** the course says "Email us within 30 days of purchase for a full refund. No questions asked." It appears in 18 files under products/course-screen-reset/ (the low-ink sources, listing.json, the day-0 welcome email and the funnel) and in 1 of its PDFs. Meanwhile, legal/SHIPPING-RETURNS-REFUNDS.md §3 drafts a "[14]-day guarantee … no more than [30%] of the lessons" and calls digital downloads generally non-refundable once accessed, and PRE-MORTEM risk 41 fix 5 proposes 14 days. Across product sources, build scripts, listings and emails, "guarantee" appears in 11 files and "refund" in 20.
  - **When:** Now (a text scan). The lead picks one rule, and counsel reviews it.
  - **File:** ops/TESTS/printed-promises.md; the scan becomes ops/TESTS/check_promises.py so the gate can run it on every build.

- [ ] **RB-64 · Walk fake orders through the order-to-money path (tabletop)** · score 10 (5×4÷2) · gate: none
  - **Question:** Walk eight fake events through the written process step by step, as the routines would: (1) an Etsy digital order from the US; (2) a Gumroad order from Germany; (3) a KDP royalty line; (4) "I can't open the file on my phone"; (5) a first refund request; (6) a chargeback notice; (7) a privacy deletion request; (8) a one-star review. For each event, record five things:
    - which routine step handles it, and which file and credential that step needs;
    - what lands in finance/PlayBeforePixels_Bookkeeping_2026.xlsx and in the monthly close;
    - what the "Founder updates = money" report says;
    - how long the buyer waits;
    - where the path breaks.
  - **Why it matters:** The routine dry run (ops/TESTS/routine-dry-run.md) tested building only. It found that no routine prompt runs the §5b weekly inbound batch (line 138). `operations/SOPs/refunds-and-disputes.md` and `operations/SOPs/reviews.md` do not exist (PRE-MORTEM risks 8 and 41). As things stand, the first real order would be the first time any of this runs, and the first ten reviews set conversion for months.
  - **When:** Now, with fixture files (no web; nothing is sent). Repeat it with the first real order and with the monthly test buy in operations/SOPs/monthly.md:28.
  - **File:** ops/TESTS/order-tabletop.md; fixtures in ops/TESTS/fixtures/orders/.

- [ ] **RB-65 · Check every printed URL and QR code against the site and the domain** · score 10 (5×4÷2) · gate: none (the live check waits for the site)
  - **Question:** List every web address printed in the products and decode every QR code. Check each against three things: (a) the routes the site will serve, or a permanent redirect; (b) the domain's registration (RB-43); (c) what the page behind it does. That page must be adult-directed, set no tracking before consent, and put no sign-up wall in front of a child-facing product.
  - **Why it matters:** Every printed book and sold PDF keeps these addresses for good. If the domain is lost or a path returns 404, every copy sends buyers to a dead page or a squatter.
  - **Measured today:**
    - 26 distinct paths on playbeforepixels.com are printed across products/, among them `/help` (189 mentions), `/bonus/<slug>` for 14 products, `/shop/<slug>` for 4, `/30-days` and `/contact`.
    - Both `/license` (48 mentions) and `/licenses` (24) are printed.
    - OpenCV scanned the 47 pages that mention "bonus" or "scan" in the customer-facing and KDP files. Every QR code it decoded points to `https://playbeforepixels.com/bonus/<slug>` (the course, First Phone Plan, the guide and the More Talk kit).
    - No `site/` directory exists yet, and the domain was unregistered on September 28 (RB-43).
    - Whether a page reachable by QR code from a child-facing product counts as "directed to children" under COPPA is UNVERIFIED (RB-41, Q19).
  - **When:** Now for the inventory, the QR decoding and the two licence paths. At Launch, an HTTP 200 check of every path on the live site, then weekly as a MONITORING signal.
  - **File:** ops/TESTS/printed-urls.md and ops/TESTS/check_printed_urls.py. The lead passes the route list the site must serve to the site build.

- [ ] **RB-66 · Colour-blind and greyscale legibility, product by product** · score 9 (3×3÷1) · gate: none
  - **Question:** For every product's pages and preview images, simulate deuteranopia, protanopia and tritanopia (Machado 2009), and plain greyscale. Flag any meaning carried by colour alone (age-band chips, routine-card categories, card-back colours) and any text below 4.5:1 contrast.
  - **Why it matters:** ops/COMPLIANCE-GATE.md line 20 and ops/ROUTINE.md:64 require this check in each panel.md, but **none of the 13 panel.md files records one**. G2-18 computed sky #3D86D8 against plum #8A5CC7 at about ΔE 5.5 under deuteranopia, against 37 with normal colour vision. marketing/BRAND-RESPECT-PLAN.md:158 puts tomato and grass at 1.07:1 lightness, and sun is 1.8:1 on white. About 1 in 12 men has a red-green colour-vision difference (UNVERIFIED), and many parents print in black and white.
  - **When:** Now; Pillow and numpy are installed.
  - **File:** ops/TESTS/colour-legibility.md; the owner workflow adds one line per product to products/<slug>/panel.md.

- [ ] **RB-67 · Customer-support load and macro coverage** · score 8 (4×4÷2) · gate: none
  - **Question:**
    - (a) How many buyer messages will arrive, and how many founder minutes a week will they take? Estimate it at the stress test's P50, at break-even (65 orders a month) and at P90. Use a contact rate of 5–10% of digital orders and a time per message (both ASSUMPTIONS).
    - (b) Run about 40 realistic buyer messages through operations/customer-service/FAQ.md and macros.md. Examples: the file won't open on a phone; wrong paper size; A4 abroad; a classroom licence; a refund; "is this for autism?"; a message in Spanish; a chargeback notice; a deletion request; a school purchase order; "where is my paperback?". Score each one: a macro answers it fully, it needs a person, or the macro is wrong or breaks a rule.
    - (c) Can Claude read and answer Etsy messages at all?
  - **Why it matters:**
    - The routines answer weekly (§5b), but Etsy's Star Seller measure is 24 hours (UNVERIFIED; main list #14).
    - FAQ lines 13 and 30 and macro 37 still promise "2 business days" (PRE-MORTEM risk 8), and Etsy messages have no automated path.
    - If the answer to (c) is no, Etsy messages become a daily task for the founder, and the "self-running" plan does not count that time.
  - **When:** (a) and (b): Now. (c): Web, at developers.etsy.com. The current belief, UNVERIFIED, is that Open API v3 has no endpoints for buyer conversations. Recalibrate (a) with the first 60 days of launch data.
  - **File:** ops/TESTS/support-load.md; the message set goes in ops/TESTS/fixtures/messages.json.

- [ ] **RB-68 · Channel-loss and cost-shock scenarios in the stress test** · score 8 (4×4÷2) · gate: none
  - **Question:** Re-run `business/stress_test.py` with the risks it leaves out today (STRESS-TEST §7: "Account risk … not modelled"):
    - Etsy holds funds for 60 days from month 3;
    - the Etsy shop is lost for good in month 6;
    - Gumroad charges 10% + $0.50 plus a card fee on every non-US order;
    - insurance comes in at its mid-point;
    - Offsite Ads become mandatory;
    - KDP charges large-trim print prices.

    For each scenario, report the median 12-month profit, the P50 deepest loss and the share of futures that go past the $12,000 cap.
  - **Why it matters:** Etsy carries 47% of orders in the month-12 mix (STRESS-TEST §5), and the headline numbers assume no hold and no suspension. PRE-MORTEM rates Etsy holds and suspensions at 15 (risk 16) and unseen payout freezes at 12 (risk 17). These scenarios move the founder's cash cap.
  - **When:** Now.
  - **File:** a new section 10, "Channel-loss scenarios", in business/STRESS-TEST.md, and a `--scenario` option in business/stress_test.py. The lead or the stress-test owner makes both edits.

- [ ] **RB-69 · Activity-by-activity hazard audit, then a qualified human review** · score 6.7 (4×5÷3) · gate: the qualified review needs one approval line
  - **Question:** Check every activity in the launch products (100 Screen-Free Plays, Toddler Busy Book, "I'm Bored" Play Cards, Play-First Family Kit, Visual Routine Cards) against one hazard list:
    - small parts and choking;
    - cords and strangulation;
    - suffocation (bags, balloons);
    - water;
    - heat and burns;
    - sharp tools;
    - magnets and button batteries;
    - falls and tip-overs;
    - food allergens;
    - craft materials that are unsafe to eat;
    - the age each activity is labelled for.

    Then one qualified person, for example an early-childhood educator with health-and-safety training or a paediatric OT, reviews the flagged list.
  - **Why it matters:** Parents follow these activities with babies and toddlers, and printed books cannot be recalled. RB-30 checks six printed facts, not the activities. So far the only safety review is the simulated customer panel (products/*/panel.md). The paid reviewer briefs in ops/APPROVALS.md cover the research hub, not the products. An insurer may also ask how activities are reviewed (RB-55).
  - **Measured today:** hazard words appear widely in product sources and build scripts: "balloon" in 40 files, cord/string/ribbon/yarn in 70, oven/stove/hot glue/boiling in 26, dough in 19, scissors/knife in 27, button battery/coin cell/magnet in 22. Many of these are the safety warnings themselves; the audit sorts them out.
  - **When:** The first pass (a play-by-play table) can be done Now. The qualified review needs a Person: one line in ops/APPROVALS.md with the brief and a budget.
  - **File:** ops/TESTS/activity-safety-audit.md.

- [ ] **RB-70 · Disaster-recovery drill: repository, accounts, founder away** · score 6.7 (4×5÷3) · gate: the write-only storage needs the founder
  - **Question:**
    - (a) Make the weekly `git bundle` (ops/ROUTINE.md §6, G2-04). Restore it into an empty directory, rebuild two products and compare them with the committed files. Record the size and the time taken.
    - (b) Run a tabletop for each account in operations/SOPs/account-security.md: what happens if it is locked, suspended or lost, and what is the way back? The key cases:
      - Etsy: where buyers re-download, and which products move to Gumroad;
      - the domain email: it controls every password reset;
      - GitHub: it holds the only full copy of the source files and is where the routines live;
      - the registrar: it controls the domain and so every printed QR code.
    - (c) The founder is unavailable for 21 days. Does maintenance mode work (business/sections/05-operations-risk-milestones.md risk 7), and who holds the emergency kit?
  - **Why it matters:** ROUTINE.md calls for the backup, but no routine prompt runs it, and the write-only storage does not exist yet (ops/TESTS/routine-dry-run.md:138). The repository is the business (CLAUDE.md), and it is growing fast. A backup that has never been restored is not a backup.
  - **Measured today:** the local `.git` is 2.5 GB (pack 2.14 GiB) after 157 commits. Every row of the account-security inventory still has "Backup codes stored?" unticked; most of the accounts do not exist yet.
  - **When:** (a) Now, locally; there is about 23 GB of free disk. The write-only storage needs the founder. (b) Now. (c) Person.
  - **File:** ops/TESTS/disaster-recovery.md.

- [ ] **RB-71 · Home-printer test on Letter and A4** · score 6 (4×3÷2) · gate: none for the simulated part
  - **Question:**
    - **Simulated:** render each customer-facing file three ways: at actual size on its own paper; with "Fit to page" on the other paper size (Letter onto A4 prints at 97.3%, A4 onto Letter at 94.1%); and in greyscale. Check that nothing falls inside a 0.25 in edge band, that no text drops below 6 pt after scaling, that cut lines stay visible, and that colour-coded items stay distinguishable in grey.
    - **Physical:** print the launch five once on an inkjet and once on a laser printer, on Letter (and on A4 if a printer takes it). Print the cards on cardstock, and print the low-ink editions too. Cut, fold and photograph the results.
  - **Why it matters:** "It didn't print right" is the likeliest first complaint about a printable (PRE-MORTEM risk 8, signal O10). print-preflight measured the files only on screen. It found A4 store footers 0.013 in from the edge, © lines 0.094–0.22 in from the edge, type as small as 3.1 pt, and card backs coloured right up to the edge. Home printers cannot print within about 0.125–0.25 in of the edge (UNVERIFIED).
  - **When:** Now for the simulated part. The physical part needs a Person: about an hour and a few dollars of paper and ink.
  - **File:** ops/TESTS/home-print-test.md, with photos in ops/TESTS/home-print-photos/.

- [ ] **RB-72 · Founder-time audit against the 60-minute weekly cap** · score 6 (4×3÷2) · gate: none
  - **Question:** List every step that needs the founder: LAUNCH-NOW Waves 0–3, each upload packet for a platform with no publishing API, identity and phone checks, proof copies, approvals, the monthly test buy, Etsy messages (RB-67 c) and key renewals (PRE-MORTEM risk 5). Then estimate her minutes a week in the launch month, in month 3 and at steady state.
  - **Why it matters:** The plan promises "zero daily tasks and at most 60 minutes of approvals a week" (business/sections/05-operations-risk-milestones.md:47), and the weekly SOP aims for 10. Nobody has added up whether the plan fits inside that. If it does not, the likely failure is PRE-MORTEM risk 5: platforms slide back to upload packets that nobody uploads.
  - **When:** Now.
  - **File:** ops/TESTS/founder-time-audit.md.

- [ ] **RB-73 · Delivery and device test of the files buyers receive** · score 6 (4×3÷2) · gate: none
  - **Question:** Open every file a buyer receives in the viewers available here (Chromium's built-in PDF viewer through Playwright, and MuPDF), time the first page and compare the renders. Then repeat on real phones (iPhone Files and Books, and an Android phone's default viewer) and from the Etsy app's purchase page.
  - **Why it matters:** Most buyers first open a download on a phone (UNVERIFIED). Every product PDF uses Type 3 fonts (print-preflight G1), which some viewers draw slowly or blurred (UNVERIFIED), and the largest Etsy file is 14.6 MB. If the Etsy app cannot download digital files (UNVERIFIED), the delivery message and the START-HERE page must say so.
  - **When:** Now for the viewers. The phones need a Person or a device cloud (Web). The Etsy app question needs Web (help.etsy.com).
  - **File:** ops/TESTS/delivery-device-test.md.

- [ ] **RB-74 · Regression fixtures for the gate checkers** · score 6 (4×3÷2) · gate: none
  - **Question:** Build known-good and known-bad fixture listings, one for each rule. Add a test showing that `check_listings.py` and `check_hub_firewall.py` still catch every bad fixture after each edit.
  - **Why it matters:** These scripts decide what may be published (ops/ROUTINE.md §4). The listing-QA verifier found three problems (ops/TESTS/listing-qa.md §6):
    - the gate-16 check skips `faq`;
    - two binding files give the net field different names: PRICING.md uses `net_after_fees`, and gate 18 uses `net_per_unit_by_channel`;
    - a plain re-run overwrites hand corrections.

    A checker that quietly stops catching something is worse than no checker.
  - **When:** Now.
  - **File:** fixtures in ops/TESTS/fixtures/listings/, the test in ops/TESTS/test_checkers.py and results in ops/TESTS/checker-regression.md.

- [ ] **RB-75 · Translation quality before any Spanish text ships** · score 6 (3×4÷2) · gate: native review needs a person; demand is gated by RB-15 and EXP-12
  - **Question:** Back-translate every Spanish string now in the repository. That means the 5 Spanish lines in operations/customer-service/macros.md, including the "2 días hábiles" in macro 37. Then set the rule for the first Spanish product: a native speaker reviews every safety, legal and price line before anything is published, and the edition picks a region (US Latin American Spanish or Spain).
  - **Why it matters:** Under ops/ROUTINE.md:77, Claude machine-drafts a translation and then reviews its own work; no human check is required. A wrong choking or water-safety line in translation is a safety problem, and a wrong refund line is a consumer-law one.
  - **When:** Now for the back-translation and the inventory. The native reviewer needs a Person (rates are RB-60).
  - **File:** ops/TESTS/translation-qa.md.

- [ ] **RB-76 · PDF accessibility: tags, reading order, alt text, screen reader** · score 4.5 (3×3÷2) · gate: none
  - **Question:** For every file a buyer receives: is it tagged, does it declare a language, is the reading order right on sample pages, do figures have alt text or a decoration mark, and does a screen reader read a sample page sensibly?
  - **Why it matters:** legal/ACCESSIBILITY-STATEMENT.md promises tagged PDFs "where practical", schools buy against accessibility requirements, and marketing/BRAND-RESPECT-PLAN.md asks for tagged PDFs by default. The European Accessibility Act covers e-books sold to EU consumers from June 28, 2025 (legal/international-plan.md:392; its exemptions are UNVERIFIED).
  - **Measured today:**
    - 51 of the 138 product PDFs outside build/ have a structure tree and a /Lang entry, as do 30 of the 62 files in etsy-upload/ and downloads/.
    - Every guide-100-plays file (13), toddler-busy-book file (11), play-talk-cards file (26) and course-screen-reset file (10) is untagged, as are all the picture-book files.
    - bored-play-cards, first-phone-plan, play-first-family-kit and visual-routine-cards are fully tagged with the same toolchain, so the other products can be tagged too.
  - **When:** Now for structure, language and reading order. The screen-reader pass (NVDA or VoiceOver) needs a Person.
  - **File:** ops/TESTS/pdf-accessibility.md.

- [ ] **RB-77 · Site accessibility (WCAG 2.1 AA) of the winning site concept** · score 4.5 (3×3÷2) · gate: none
  - **Question:** Audit site-concepts/winner, and index.html while it is still live, against WCAG 2.1 AA: text contrast with the brand accents, keyboard order and visible focus, 200% zoom and 320 px reflow, reduced motion, form labels, and headings and landmarks.
  - **Why it matters:** legal/LEGAL-LAUNCH-CHECKLIST.md row 22 warns that US courts often treat inaccessible retail sites as an ADA Title III risk. G2-18 measured tomato at 3.4:1, grass at 3.2:1, sky at 3.75:1 and sun at 1.8:1 on white, all below 4.5:1 for small text.
  - **Measured today:** every `<img>` on the five winner pages has alt text, and each page declares a language. The current root index.html has no `lang` attribute.
  - **When:** Now for contrast, headings, keyboard and zoom (Playwright and Chromium are installed). An automated rule pass needs Web, to install axe-core.
  - **File:** ops/TESTS/site-accessibility.md.

- [ ] **RB-78 · Print colour soft-proof and a proof-copy checklist** · score 4.5 (3×3÷2) · gate: none
  - **Question:** How far do the brand's RGB colours shift when a printer converts them to CMYK? Soft-proof them with the printer's own profile. Then write the checklist for inspecting a proof copy: colour, trim, gutter, footer, barcode and paper.
  - **Why it matters:** Every book file is RGB with no output intent (print-preflight G2), so the printer does the conversion. A shifted sky or plum can break the colour coding. The first proof copy is the first time anyone will see real ink (ops/LAUNCH-NOW.md Wave 2).
  - **When:** Web, to download the printer's CMYK ICC profile; the container has none, and ghostscript is not installed. Inspecting the proofs needs a Person.
  - **File:** ops/TESTS/print-colour-proof.md.

- [ ] **RB-79 · Font and asset licence register** · score 4 (2×2÷1) · gate: none
  - **Question:** Make one table of every font, code library and asset that ends up in a sold file or on the site, with its licence and what that licence requires.
  - **Why it matters:** The four brand fonts are embedded in every sold PDF and will be served as web fonts. Their name tables all point to the SIL Open Font License (checked with fontTools today: Bricolage, Caveat, Fredoka, Nunito). That licence is believed to allow embedding and commercial use, but to require the licence text to travel with any redistributed font file (UNVERIFIED). brand/fonts/ holds no licence file. The QR-code library in products/*/build/node_modules is also part of the builds.
  - **When:** Now.
  - **File:** legal/protection/asset-licence-register.md.

- [ ] **RB-80 · Real-parent use test (adults only, no child data)** · score 3.8 (5×3÷4) · gate: founder approval and budget
  - **Question:** Can 5–8 real parents download one launch product, print it at home and use it within a week, and what confuses them? Participants are adults only: no child data, photos or names. Recruit them through a paid unmoderated test panel, so there is no direct contact (ops/EXPERIMENTS.md §6 rules). Also ask whether they read the art as AI-made, and whether that changes what they would pay.
  - **Why it matters:** So far every product review has come from simulated personas. The stress test's conversion inputs (Etsy 2%, own site 1.5%) and PRE-MORTEM risk 10 (an "AI slop" backlash) both rest on how buyers will see the products, which nobody has tested. The first ten reviews set conversion for months.
  - **When:** Web first: the panel platforms' terms and prices, and whether a faceless brand can run a test. Then one approval line for the founder, with a budget. Run it before the Wave 1 listings go live if possible, otherwise within the first 30 days.
  - **File:** ops/TESTS/real-user-test.md; the lead adds the plan to ops/EXPERIMENTS.md as RES-3.

- [ ] **RB-81 · Reading level and length by age band** · score 3 (3×2÷2) · gate: none
  - **Question:** For text a child reads alone (the 5–12 card decks and the child pages of First Phone Plan) and for the read-aloud books, measure:
    - the reading grade of each card or page, against the product's age band;
    - the words per spread;
    - the read-aloud length, against genre norms taken from a primary source.
  - **Why it matters:** Listing QA graded only the listing descriptions. A card a 6-year-old cannot read turns a "5–12" deck into one a parent has to read aloud, and invites "too hard" reviews.
  - **Measured today** (rough: Flesch-Kincaid on text extracted from the PDFs, which misreads layouts): parent-facing text sits at about grade 5–7 (guide ≈6.2, busy book ≈5.5, course ≈5.1), which is fine. *The Day the Tablet Slept* extracts to about 1,055 words, including front and back matter. Child-only text was not separated out.
  - **When:** Now. The genre norms need Web.
  - **File:** ops/TESTS/reading-level.md.

### Needs a live check (every UNVERIFIED statement in "Still to test")

1. Etsy's Open API v3 has no endpoints to read or send buyer conversations. [RB-67]
2. Etsy's Star Seller measure asks for 95% of first messages answered within 24 hours (also main list #14). [RB-67]
3. Some phone PDF viewers draw Type 3 fonts slowly or blurred. [RB-73]
4. The Etsy mobile app may not let a buyer download a digital file, so a browser may be needed. [RB-73]
5. Most buyers first open a digital download on a phone. [RB-73]
6. Home printers cannot print within about 0.125–0.25 in of the paper edge (also print-preflight live check 12). [RB-71]
7. About 1 in 12 men (about 8%) has a red-green colour-vision difference. [RB-66]
8. A page reachable by QR code from a child-facing product may count as "directed to children" under COPPA. [RB-65]
9. The European Accessibility Act covers e-books sold to EU consumers from June 28, 2025, with an exemption for microenterprises that provide services (repo figure, legal/international-plan.md:392). [RB-76]
10. The SIL Open Font License allows embedding in sold PDFs and commercial use, and requires the licence text to travel with any redistributed font file, including web fonts. [RB-79]
11. KDP and the other printers convert RGB files to CMYK themselves, and saturated RGB colours can shift. [RB-78]
12. Unmoderated test panels can recruit parents with no direct contact, at a cost that fits a small budget. [RB-80]
13. Genre norms for picture-book and board-book word counts. [RB-81]

New hosts, to add only when the item comes up: registry.npmjs.org (axe-core, RB-77); the ICC profile source for RB-78 (the printer's own help page, or www.color.org); the test-panel platform chosen in RB-80. developers.etsy.com and help.etsy.com are already allowed (RB-67, RB-73).
