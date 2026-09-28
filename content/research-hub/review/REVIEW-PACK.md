---
title: "Research hub review pack (internal)"
slug: "internal/research-hub/review-pack"
last_reviewed: "2026-09-28"
publish: false
page_type: "internal-plan"
---

# Research hub launch-readiness pack

**Internal. Never published.** Prepared September 28, 2026. Every fee, hour estimate, site name and platform rule below is **UNVERIFIED**: web search was used up and outside sites were blocked when this was written. Nothing here has been posted and no one has been contacted.

## What this pack is for

The research hub is how Play Before Pixels answers a parent who types "virtual autism" into a search box late at night: plain, honest pages that say what the research shows and doesn't show, that it is not a diagnosis, that autism is not the parent's fault, and that the next step is the pediatrician and a free evaluation. Those pages can only earn trust, and rank, if they are checked. **No hub page publishes until four gates are passed:**

1. **Primary sources read.** Every cited source is checked against the original (abstract at minimum), or the claim is deleted. Done by the scheduled routine once the network allowlist is live.
2. **Autistic sensitivity read** (Role A, paid).
3. **Clinician review** of the practical guidance (Role B, paid): a developmental-behavioral pediatrician or a pediatric speech-language pathologist.
4. **Claims and legal review** (Role C, paid): health claims, FTC, defamation, privacy, policy promises.

**The founder approves once:** one line in `ops/APPROVALS.md` (posting the three briefs, with a $4,900 budget cap). The routine does everything else, except the few account clicks that only an account holder can make (listed in "Steps only a person can do").

**What is in this folder**

| File | What it is |
|---|---|
| `REVIEW-PACK.md` | This pack. The routine follows the order of work below. The sign-off forms and comment table near the end are also printed into the bundle. |
| `build-bundle.js` | Assembler. Joins the six pages into one HTML file with block IDs and scope tags, writes the manifest, and with `--pdf` renders through `brand/render.js`. |
| `hub-review-bundle.html` / `.pdf` | The review bundle: index, FAQ, glossary, pediatrician questions, early intervention, editorial policy, plus the comment table and sign-off forms. Brand fonts. |
| `bundle-manifest.json` | Version ID, per-page SHA-256, word counts. Sign-offs and credits are tied to the version ID. |

Rebuild: `node content/research-hub/review/build-bundle.js --pdf` (draft) or `--stage review --pdf` (after verification). The version ID changes whenever any of the six pages changes.

**Current bundle (September 28, 2026):** version `421c24531536`, pre-verification draft, 11,773 words, 4,798 words in clinician scope, 180 `[VERIFY]` marks still open (rebuilt after the simulated reader panel; see `marketing/AWARENESS-ENGINE.md` §13). This build is for scoping and quotes only. Reviewers work on the review version.

---

## 1. Order of work (the routine follows this)

Primary-source verification comes first. Paying people to review text that will change after the sources are read wastes their time and our money, and their sign-off would not cover the final wording.

| Step | Who | Starts when | Done when |
|---|---|---|---|
| **0a. Network allowlist live** | Founder, once (`ops/CLOUD-RUNBOOK.md` setup step 4) | Now | The "Play Before Pixels" environment uses `ops/cloud/allowed-domains.txt`, and a test fetch of `https://pubmed.ncbi.nlm.nih.gov/` does not return `403 host_not_allowed` |
| **0b. One approval** | Founder, once | Now | The line in `ops/APPROVALS.md` reads APPROVED (through the verified approval channel in `ops/ROUTINE.md` §5) |
| **1. Primary-source verification** | Routine | Step 0a | Items H1–H7 at the top of `ops/RESEARCH-BACKLOG.md` are ticked, and the six pages have **zero** `[VERIFY]` marks: each claim is confirmed or deleted (`verification-queue.md`, "How to clear an item") |
| **2. Post the claims and legal brief** | Founder pastes; routine prepares | Step 0b (does not wait for step 1) | Brief C is posted, or brief C is sent to the consumer and privacy attorney already planned in `business/BUSINESS-PLAN.md` §5.4 |
| **3. Legal reviewer hired; contract approved** | Routine recommends; founder clicks hire | Proposals in | Role C has approved the reviewer contract (freelancer template plus the rider in section 6) for Roles A and B. This is Role C's first, short deliverable |
| **4. Freeze the review version** | Routine | Step 1 done | `python3 ops/TESTS/check_hub_firewall.py --strict` passes on the six pages; `node content/research-hub/review/build-bundle.js --stage review --pdf` has run; the version ID is recorded in "Gate status" below |
| **5. Post briefs A and B; hire** | Founder pastes and clicks; routine screens | Step 3 done and step 1 at least H1–H4 ticked | One reviewer hired per role (plus a named backup) under the approved contract |
| **6. Sensitivity read and clinician review** | Roles A and B, in parallel | Step 4 and step 5 | Each has delivered a comment table and a signed sign-off form for the frozen version |
| **7. Make the changes; re-check** | Routine, then Roles A and B | Step 6 | Every must-fix item is resolved and logged in `review/CHANGELOG.md` (block ID, comment number, change). Roles A and B confirm on the re-check form. Rebuild the bundle (new version ID) |
| **8. Claims and legal review of the final text** | Role C | Step 7 | Role C's clearance form says "cleared" or "cleared after listed changes", and those changes are made and confirmed |
| **9. Publish gate** | Routine | Step 8 | All four gates are recorded in "Gate status"; `ops/COMPLIANCE-GATE.md` passes; `check_hub_firewall.py --strict` passes; credit blocks match the signed forms exactly. Then one yes/no line goes to `ops/APPROVALS.md` to switch `publish: true` (unless the founder has already said the routine may publish on four sign-offs) |
| **10. Keep it true** | Routine | After publishing | Re-review triggers in section 7; the six-month re-review in `editorial-policy.md`; credits removed at once when a change touches a reviewer's scope |

**Rough timing once step 0a is done (UNVERIFIED):** verification in about a week; the reviews, changes and re-checks in five to seven weeks. The hub pages would be ready about eight weeks after the allowlist is live. That is later than the November 2026 slot in `seo/SEO-PLAN.md`; the SEO calendar should move rather than the gates.

### How the routine works step 1

- Items **H1–H7** sit at the top of `ops/RESEARCH-BACKLOG.md`, under "Research hub verification". While the allowlist is not live they are skipped without counting toward the run's backlog items, so the automation items keep moving. Once it is live, the daily studio takes **one** H-item as its first backlog item and the weekly research run takes up to **three**.
- Batches, in this order (the 55 studies the six pages cite, plus the non-study facts):
  - **H1: allowed-list sources and the AAP 2026 statements.** harle-2019, heffler-2020, kushima-2022, takahashi-i-2023, brushe-2024, madigan-2019, who-2019-under-5-guidelines, aap-2016-media-and-young-minds, aap-2026-digital-ecosystems (policy statement and technical report).
  - **H2: the balancing evidence the pages lean on.** ophir-2023-meta-analysis, melchior-2022-elfe, takahashi-n-2023-genetics, lin-2025-lsac, cai-2025-mendelian-randomization, zhang-2023-shared-genetic-risk, montes-2016, yamamoto-2023-jecs.
  - **H3: critiques and autistic voices.** krijnen-2026-autism, van-asselt-2026, autismus-deutschland-statement, detroja-bhatia-2024, dhungel-2026, smc-2020-expert-reaction, alper-2020-letter, psihologia-ro-critique, psychologiescientifique-critique.
  - **H4: where the term came from.** zamfir-2018, marcelli-2018-epee, ecrans-et-autisme-2017-handout, heffler-oestreicher-2016, waldman-2008, dunckley-electronic-screen-syndrome, pouretemad-2022-pdnas, ozyazici-2026, sadeghi-2021-parent-child-interaction.
  - **H5: screening and case studies.** sundarimaa-2025-singapore, chonchaiya-2011, tunisia-2025-screen-patterns, hill-2024, hill-2020, heffler-2022-case-report, apims-2023-pakistan, hermawati-2018, yuan-jadd-systematic-review.
  - **H6: reviews and context.** liu-2025-meta-analysis, sarfraz-2023-systematic-review, slobodin-2019-review, madigan-2020-language-meta-analysis, mallawaarachchi-2024-contexts, lin-yh-2022-screen-timing-letter, georgia-2025-bmc-pediatrics, rangaraj-2026, chen-2020-mediation.
  - **H7: the last two studies and every non-study fact.** spitzer-2023, authorea-2025-preprint; then "Non-study facts on the hub that need an official source" in `verification-queue.md` (IDEA Part C and Part B from `www.ecfr.gov` and `sites.ed.gov`; CDC and ECTA directories; the AAP screening schedule; UK, Canada and Australia pointers; the ICD/DSM statements; the instrument descriptions in the glossary; the reply-time wording).
- For each source: read the PubMed record (or Europe PMC, Crossref or OpenAlex when the publisher page is blocked), fix the study page, set `what_we_read`, remove only the `[VERIFY]` marks the reading settles, log it in `ops/RESEARCH-LOG.md`, and update `_data/library.json` and `library.md`. **A claim that cannot be confirmed is deleted, not kept.** Also answer the matching lines under "Specific open questions" and "Questions added by the editor pass".
- If a source changes the picture (for example AAP 2026 replaces the 2016 advice, or Ophir's corrected estimate differs), rewrite the affected sentences on all six pages in the same run. A change to BRAND.md rule 5 is the founder's decision: add one line to `ops/APPROVALS.md`, don't edit BRAND.md.
- A host that answers `403 host_not_allowed` is written under the item as "blocked: <host>". These hosts were **not** in `ops/cloud/allowed-domains.txt` on September 28, 2026 and are needed for H7 and for checking reviewer credentials: `www.parentcenterhub.org`, `www.ndis.gov.au`, `caringforkids.cps.ca`, `icd.who.int`, `www.psychiatry.org`, `www.asha.org`, `www.abp.org`, `www.docinfo.org`. Whoever maintains the allowlist should add them (one line each, no wildcards), and the founder re-pastes the list once. Until then, those facts stay `[VERIFY]` and the page wording must not depend on them.

### Gate status (the routine updates this table)

| Gate | Status | Version ID | Date | Record |
|---|---|---|---|---|
| 1. Primary sources read (H1–H7; zero `[VERIFY]` on the six pages) | Not started: allowlist not live | — | — | `ops/RESEARCH-LOG.md` |
| Review version frozen | Not started | — | — | `bundle-manifest.json` |
| 2. Autistic sensitivity read (A) | Not started: needs APPROVED line | — | — | Sign-off form A (minute book); code SR-1 |
| 3. Clinician review (B) | Not started: needs APPROVED line | — | — | Sign-off form B (minute book); code CL-1 |
| 4. Claims and legal review (C) | Not started: needs APPROVED line | — | — | Clearance form C (minute book); code LG-1 |
| Compliance gate and firewall | Not started | — | — | `ops/COMPLIANCE-GATE.md`; `check_hub_firewall.py --strict` |

---

## 2. Steps only a person can do (and why)

The routine cannot create accounts, log in to websites, sign contracts or move money: routine rules forbid browser logins (`ops/ROUTINE.md` §5), and hiring and paying need the account holder. The founder never speaks with anyone: every step is in writing, and no call or video meeting is ever offered or accepted.

| When | Step | Minutes (est.) |
|---|---|---|
| Once | Mark the one line in `ops/APPROVALS.md` APPROVED or NO | 5–10 |
| Once | Open one client account in AlphaPlay LLC's name on the chosen marketplace, paying only with the LLC's business card (`finance/BANKING.md`). Display name "Play Before Pixels"; no personal photo | 15 |
| Step 2 and step 5 | Paste the brief text from section 4 (routine prepares a ready-to-paste file each time) | 5 per brief |
| While proposals come in | Once a week, copy new proposals into the routine's intake file, **without names or contact details** (see section 8) | 10 per week, about 2 weeks |
| Per hire | Click "hire" on the routine's recommended candidate and fund the fixed fee; e-sign the contract the legal reviewer approved | 10 per reviewer |
| Per delivery | Release payment when the routine confirms the comment table and signed form arrived | 2 per reviewer |

About **90 minutes in total over six to eight weeks**, inside the weekly approval time cap in `ops/ROUTINE.md`. If even that is too much, the optional "upload assistant" in `business/BUSINESS-PLAN.md` §5.4 can do the pasting and copying under the same rules.

---

## 3. Budget (UNVERIFIED estimates)

| Role | Work | Hours (est.) | Fee range (UNVERIFIED) | Cap |
|---|---|---|---|---|
| **A. Autistic sensitivity reader** | Full read of 11,773 words, comment table, sign-off, one re-check | 7–11 | $300–900. Basis: sensitivity-read snapshots of $0.013–0.04 a word (`marketing/BRAND-RESPECT-PLAN.md` §3) and $35–75 an hour | **$900** |
| **B. Clinician** | 4,798 words in scope (skim the rest for context), comment table, sign-off, one re-check | 4–7 | Pediatric SLP about $50–120 an hour ($250–850); developmental-behavioral pediatrician about $150–300 an hour ($600–2,100) | **$1,500** |
| **C. Claims and legal** | All six pages (11,773 words), the reviewer contract rider, memo, clearance form, one follow-up | 4–8 | $250–500 an hour ($1,000–4,000), or a flat fee; less as an add-on to the consumer and privacy attorney's policy review | **$2,500** |
| **Total** | | 15–26 | $1,550–5,000 | **$4,900** |

- Caps are hard: a candidate above the cap is passed over, not negotiated past it. Marketplace fees count inside each cap.
- The fee is the same whatever the reviewer concludes. "Does not pass" is a paid, valid result.
- Paid by AlphaPlay LLC only, after delivery, through the marketplace's escrow or an invoice. Ask the CPA whether the marketplace issues the year-end tax form (UNVERIFIED).
- Lowest safe version: an SLP instead of a pediatrician, and Role C added to the consumer and privacy attorney's planned flat review. That is about $1,550–2,500.
- **Not in this budget (founder decision, see section 9):** an optional human fact-checker for the sources, $500–1,500 (UNVERIFIED), if the editorial policy keeps its promise that "a person" checks each source.

---

## 4. The three roles

### Role A: Autistic sensitivity reader

**Scope: all six pages.** A full read of 11,773 words. The sections tagged "Sensitivity focus" in the bundle (3,566 words) matter most:
- IDX: opening boxes; "A note to autistic readers and their families"; "What critics say"; "What parents can do".
- FAQ: "About the term" (especially Q4, "Is one particular show or video channel the problem?", and Q5, "Did I do this?"); Q10 (children who "got better"); Q22 ("My autistic child loves their tablet"); "For autistic readers".
- GLO: "Words about the debate"; "Words about autism and development" (the editorial definitions of "Autistic traits", "'Severity' scores" and "'Risk' and 'likelihood'").
- PED: "About us as a family". EIV: "Common worries". POL: "Respectful language".

**What to check**
- Autism is never framed as damage, illness, tragedy or an outcome to prevent, reduce or reverse, and an autistic child is never a worse outcome.
- No sentence implies that parents cause autism, including the "family under strain" example in "Why a link is not proof of cause" and the "digital nannying" label.
- Clinical words ("symptoms", "severity", "risk", "disorder") appear only in quotation marks, attributed to a study, and explained.
- Identity-first language as the default, with respect for other preferences.
- Autistic authors and autistic-led viewpoints are described fairly and with the same care as clinical studies.
- AAC is treated as communication, not screen time.
- "What parents can do" and the free-printable link never read as a way to make a child less autistic, or as help for autism.
- The tone toward parents of autistic children and toward autistic parents.
- Anything an autistic reader would expect to find and doesn't.

**Not in scope:** research accuracy, medical accuracy, legal wording, any product.

**Deliverable:** the comment table (block ID, level, issue, suggested wording, reason), a short summary (one page at most), sign-off form A, and one re-check of the changes (under two hours) within 30 days.

**Where such reviewers are usually found** (options only; nothing has been contacted; every name UNVERIFIED):
- Curated freelance marketplaces for publishing professionals that list sensitivity readers, such as Reedsy.
- General freelance marketplaces with escrow and company client accounts, such as Upwork.
- Sensitivity-reader directories and agencies, such as Writing Diversely (a directory) or Salt & Sage Books (an agency with a roster that has included neurodivergent readers). An agency that matches the reader and takes payment means no direct contact at all.
- The Editorial Freelancers Association member directory.
- **Not:** autism organizations or autistic community spaces, forums or groups (`marketing/virtual-autism-outreach.md` section E; no community posting), and not LinkedIn or Facebook, which would need the founder's personal profile.

**Brief A: posting text** (paste as is after the APPROVED line)

```
Paid sensitivity read by an autistic reader: plain-language research pages for parents (about 12,000 words)

Play Before Pixels (AlphaPlay LLC) is a small US business that makes play books and printables for families. We are preparing a free, ad-free set of six research pages for parents who search for "virtual autism" and screen time. "Virtual autism" is a term some clinicians use; it is not a medical diagnosis, and the studies show associations, not proof that screens cause autism. The pages say exactly that, point worried parents to their pediatrician and to free early intervention, and include a note to autistic readers and their families. The pages carry no product links.

We are looking for an autistic reader (self-identification is enough; we never ask for medical records) to read all six pages and tell us, in writing, where the language, framing or tone is disrespectful, blaming, deficit-based or missing something.

- About 12,000 words across six pages. A marked-up PDF with numbered paragraphs is provided after the contract is signed.
- Deliverable: a comment table and a one-page summary, a short sign-off form, and one re-check of our changes (under 2 hours) within 30 days.
- Time: 10 business days from receiving the files.
- Fixed fee: $450-$900 depending on experience, paid in full whatever you conclude. "This does not pass" is an acceptable result.
- Credit is your choice: your name, an unnamed credit, or none. We never state that you are autistic unless you ask us to in writing. Your name would appear only on the pages you reviewed, never with any product or in any advertising.
- All communication is in writing on this platform. No calls or video meetings.
- A confidentiality and work agreement is signed before you receive the pages.

In your proposal, please tell us:
1. Your experience with sensitivity reads or plain-language health writing (links or redacted samples welcome).
2. In under 100 words: what you would check first in this sentence: "'Virtual autism' is a term some clinicians use for autism-like behaviors seen in some young children with heavy early screen exposure. It is not a medical diagnosis."
3. Your answers to the independence questions below.

Independence questions (answering yes is not automatically disqualifying):
a. In the last 3 years, have you had paid work or other financial ties with a device maker; an app, game, video or streaming service for children; a children's content creator; an EdTech company; or a screen-time-reduction product, program or clinic?
b. Have you written, reviewed or publicly commented on research or claims about screens and autism, or about "virtual autism"? Links, please.
c. Do you currently work for, or hold an office in, a school district, an education union or an early-intervention program? If so, which one?
d. Are you affiliated with an autism organization in a way that could make your review look like that organization's endorsement?
e. Do you sell, or plan to sell, products, courses or services for parents about screens, play or early development?
f. Which country (and state or province) are you based in?
g. Is there anything else a careful reader would want to know about your independence?
```

### Role B: Clinician (developmental-behavioral pediatrician or pediatric speech-language pathologist)

**Who qualifies:** a board-certified developmental-behavioral pediatrician, or a pediatric speech-language pathologist holding the ASHA Certificate of Clinical Competence and a current US state license, with at least five years' work with children aged 0 to 5 and experience of developmental or autism screening or early intervention. Comfortable with neurodiversity-affirming language. US-licensed, because the early-intervention page describes US programs.

**Scope: 4,798 words**, tagged "Clinician scope" with a blue margin bar in the bundle:
- IDX: the opening boxes; "What we still don't know"; "What parents can do" (all six parts, including the WHO and AAP guideline paragraph).
- FAQ: the opening boxes; "If you're worried" (Q12–Q17); "Everyday life with screens" (Q18–Q23).
- GLO: "Words about autism and development"; "Tests and checklists"; "Help and services".
- PED: the whole printable. EIV: the whole page.

**What to check**
- Would anything, as written, delay or discourage a family from seeking an evaluation? This is the most important question.
- Is the practical guidance accurate and appropriate for a general US parent audience, and never framed as therapy or treatment? This covers "don't wait", "change screen habits and ask for an evaluation at the same time", and the six talk-and-play habits.
- Screening vs. diagnosis, and the plain descriptions of M-CHAT-R/F, ADOS, CARS, SCQ and ASQ-3.
- How the early-intervention and school-evaluation steps are described, compared with how families actually experience them: self-referral, free evaluation, timelines, IFSP, the move at age 3. The routine will already have checked the law and official program pages; the clinician checks the practice.
- The AAP screening-schedule statement, and the guideline statements as presented.
- The pediatrician-questions printable: is anything missing that clinicians wish parents would ask? For example, should the pages say plainly that **any loss of words or skills, at any age, is a reason to call the doctor promptly**?
- FAQ Q12 ("How would a doctor tell autism from difficulties related to heavy screen use?"): is the answer appropriate?
- The UK, Canada and Australia pointers: flag anything clearly wrong (full checking is not required).

**Not in scope:** how the studies are described, legal wording, any product.

**Deliverable:** the comment table, a summary of at most one page, sign-off form B, and one re-check (under two hours) within 30 days.

**Where such reviewers are usually found** (options only; nothing contacted; UNVERIFIED):
- Marketplaces for freelance scientists and medical experts that support confidentiality agreements, such as Kolabtree.
- General freelance marketplaces (for example Upwork), searching for pediatric medical reviewers or pediatric SLP content reviewers.
- Directories such as ASHA ProFind and the Society for Developmental and Behavioral Pediatrics member directory. Use them **to verify credentials**, not for cold contact: a direct message from a directory counts as contact, and the APPROVED line covers posting on marketplaces only.
- Verify credentials before hiring: ASHA certification verification and the state license lookup for an SLP; American Board of Pediatrics certification verification and the state medical board (or DocInfo) for a pediatrician.
- National marketplaces are preferred to local job boards (see the screening rules in section 5).

**Brief B: posting text**

```
Paid clinician review: practical guidance for parents on plain-language research pages (about 4,800 words in scope)

Play Before Pixels (AlphaPlay LLC) is a small US business that makes play books and printables for families. We are preparing a free, ad-free set of research pages for parents who search for "virtual autism" and screen time. "Virtual autism" is a term some clinicians use; it is not a medical diagnosis, and the studies show associations, not proof that screens cause autism. The pages carry no product links. We are not clinicians, and we will never present your review as clinical endorsement of anything.

We are looking for a board-certified developmental-behavioral pediatrician, or a pediatric speech-language pathologist (ASHA CCC-SLP, current US state license), with 5+ years' work with children aged 0-5 and experience with developmental or autism screening or early intervention.

Your job: check the practical sections for accuracy and safety. Would anything delay or discourage a family from seeking an evaluation? Are screening, evaluation and US early-intervention steps described accurately for a general parent audience? Is a printable list of questions for the pediatrician complete and sensible?

- About 4,800 words in scope (clearly marked in a numbered PDF provided after the contract is signed), across a guide, an FAQ, a glossary, an early-intervention how-to and a one-page printable.
- Deliverable: a comment table, a summary of at most one page, a short sign-off form, and one re-check of our changes (under 2 hours) within 30 days.
- Time: 10 business days from receiving the files.
- Fixed fee: $600-$1,500 depending on credentials, paid in full whatever you conclude.
- This is editorial review. It creates no clinician-patient relationship, and you will not review or endorse any product.
- Credit is your choice (named, unnamed or none), only on the pages you reviewed, never in advertising.
- All communication is in writing on this platform. No calls or video meetings.
- A confidentiality and work agreement is signed first.

In your proposal, please include: your credential and license state and number (we verify them through the official lookups); your relevant experience; in under 100 words, one thing you would want every worried parent of a toddler to be told; and your answers to the independence questions below.

Independence questions (answering yes is not automatically disqualifying):
a. In the last 3 years, have you had paid work or other financial ties with a device maker; an app, game, video or streaming service for children; a children's content creator; an EdTech company; or a screen-time-reduction product, program or clinic?
b. Have you written, reviewed or publicly commented on research or claims about screens and autism, or about "virtual autism"? Links, please.
c. Do you currently work for, contract with, or hold an office in a school district, an education union or an early-intervention program? If so, which one?
d. Do you provide or market services built around screen reduction or "virtual autism"?
e. Are you affiliated with an autism organization in a way that could make your review look like that organization's endorsement?
f. Do you sell, or plan to sell, products, courses or services for parents about screens, play or early development?
g. Where are you based, and in which states are you licensed?
h. Is there anything else a careful reader would want to know about your independence?
```

### Role C: Claims and legal reviewer

**Who qualifies:** a US attorney in good standing, experienced in advertising and health claims (FTC Act §5, the FTC's health-products substantiation guidance, the Endorsement Guides at 16 CFR Part 255), with publisher or media-law (defamation) experience and consumer-privacy basics. **Preferred route:** add this scope to the consumer and privacy attorney's planned flat review of the policy pages (`business/BUSINESS-PLAN.md` §5.4; `legal/LEGAL-LAUNCH-CHECKLIST.md` row 7): one engagement, one conflict check. This is a business matter for the company's own consumer and privacy attorney.

**Scope: all six pages (11,773 words), plus the reviewer contract.**

**What to check**
- **Health claims:** no express or implied claim that anything treats, prevents, reduces or reverses autism or any condition. Pay particular attention to the case-report wording, "What parents can do", and the one link to the free play printable and email list (it must read as play and family time only, `brand/BRAND.md` "Autism searches"). No implied claim by placement next to anything sold.
- **Causation language and disclaimers:** "associated with", never "causes"; the "not medical advice" boxes are placed and worded adequately; early-intervention and school-rights content is not legal advice.
- **Promises the business must keep** (`editorial-policy.md`, FAQ Q26–Q27): "no money, sponsorship or free products from device makers, app makers, EdTech companies or research authors"; no ads or affiliate links; "a person reviews everything else within [5] business days"; and **"Every page is checked by a person against the sources"**. The last one is not how verification is planned (section 9, issue 1): the wording or the process must change before publishing.
- **Named people and organizations:** researchers, clinicians, authors and organizations named in the history and critique sections are described accurately, fairly and with attribution, with no defamation or false-light risk. No claim about any individual's business or conflict of interest until it is confirmed. Nothing criticizes a school, district, company, show, creator, app or EdTech product (BRAND.md rule 2).
- **Intellectual property:** short quotations; study titles; screening-instrument names (M-CHAT-R/F, ADOS, CARS, SCQ, ASQ-3) used descriptively.
- **Privacy:** the printable's optional birth month and year; nothing collects children's data; contact-form statements.
- **Reviewer credits:** the credit wording in section 7 complies with the Endorsement Guides (payment disclosed; no implied product endorsement).
- **Hiring:** that seeking an autistic reader is worded lawfully in brief A, and that the rider in section 6 works with `legal/protection/freelancer-work-for-hire-and-ip-assignment.md`.

**Deliverable:** first, within five business days of hire, the approved reviewer contract (template plus rider) for Roles A and B. Last (step 8), a memo, the marked-up text, and clearance form C, with one follow-up on the changes.

**Where such reviewers are usually found** (options only; nothing contacted; UNVERIFIED):
- The consumer and privacy attorney the business plan already budgets for (preferred).
- Attorney marketplaces that take flat-fee bids, such as ContractsCounsel or UpCounsel.
- The lawyer referral service of the state bar where AlphaPlay LLC is organized, where written intake is offered.
- Confirm good standing on the state bar's public lookup before hiring.

**Brief C: posting text**

```
Flat-fee legal review: health-claims, FTC and publisher review of six plain-language research pages for parents (about 12,000 words), plus a short contractor rider

Play Before Pixels (AlphaPlay LLC) is a small US business that makes play books and printables for families. Before publishing a free, ad-free set of six research pages for parents about screen time and the term "virtual autism" (a term some clinicians use; not a medical diagnosis), we need a US attorney to review them for:
- express or implied health claims, and FTC Act Section 5 risk, including any implied link between the research pages and products we sell;
- disclaimers and "not medical or legal advice" wording;
- accuracy and fairness of how named researchers and organizations are described (defamation and false light);
- public promises in an editorial policy that the business must be able to keep;
- reviewer-credit wording under the FTC Endorsement Guides (16 CFR Part 255);
- privacy statements on a printable and a contact form.

First task (short): approve a one-page rider to our contractor agreement for two paid reviewers (a sensitivity reader and a clinician): confidentiality, IP assignment, credit or no credit, independence and no product endorsement.

- Deliverables: the approved rider; a memo; marked-up text; a short clearance form; one follow-up on our changes.
- Flat fee up to $2,500, or tell us your hourly rate and a not-to-exceed estimate.
- All communication in writing (this platform or email). No calls or video meetings.
- Please include your bar admission, state and number, your advertising and health-claims experience, and whether you can run a conflict check on AlphaPlay LLC. (We give shortlisted attorneys the LLC's state of organization in writing.)
```

---

## 5. Conflict of interest and screening

**The questions** are in each brief (a–h). Answers are part of the contract: the reviewer warrants they are true and must tell us in writing if anything changes before the page publishes.

**Private screening rules (this file only; never state these reasons outside it):**
- **Exclude** anyone employed by, contracted to, or holding office in an organization on the CLAUDE.md outreach exclusion list (checked against answers c and f or g), and anyone the founder knows through work (`marketing/BRAND-RESPECT-PLAN.md` §3; `business/BUSINESS-PLAN.md` §5.4). After the contract names the company's signer, ask once in writing: "Do you know the signer personally or professionally?"
- **Exclude** anyone with current financial ties to a company that makes children's screen products, a screen-reduction program or clinic, or a service built around "virtual autism" (answers a and d; `marketing/virtual-autism-outreach.md` section F).
- **Extra check, not automatic exclusion:** a candidate in the founder's home state gets a second look at answer c before shortlisting. Prefer national marketplaces to local boards.
- **Disclose rather than exclude:** an author of a study cited on the pages may review, but must not be the only reviewer of the paragraph that describes their own work. That paragraph gets a second opinion from another role, and the conflict is noted on the sign-off form. Someone who has taken a public position (answer b) is fine; the balance of the pages is the check.
- **Organization affiliation** (answer e): allowed, but any credit says the review was in a personal capacity, and the organization is never named in the credit.
- **Rejections** use one neutral saved reply: "Thank you for applying. We've chosen another reviewer for this project." No reasons are given.

**Scoring** (routine, 1–5 each): relevant experience; clarity of the written answers; independence; availability within the timeline; fee within the cap. The top score is recommended to the founder, with the second as backup.

---

## 6. Contract terms

**Roles A and B** sign `legal/protection/freelancer-work-for-hire-and-ip-assignment.md` with role "Expert Reviewer", **Option B (assignment only)** in section 2, plus the rider below. Record the signed copy in `legal/protection/creation-records-log.md`, with the signed PDF kept in the company minute book, outside git. The template is marked DRAFT: Role C approves it and the rider before first use (step 3).

**Role C** works under their own engagement letter. It must include written-only communication, confidentiality, the fee cap, the scope in section 4, and no public credit unless the attorney asks for one in writing.

**Research-hub reviewer rider (attach to the freelancer agreement for Roles A and B):**

- **R1. Scope and version.** The Reviewer reviews only the pages and sections listed in their brief, in the bundle version whose ID is on their sign-off form, plus one re-check of changes within 30 days.
- **R2. Independence.** The fee is fixed and does not depend on the result. The Reviewer may withhold sign-off, and "does not pass" is paid in full. The Company decides what it publishes, but it may not say or imply that the Reviewer passed any text the Reviewer did not pass.
- **R3. No endorsement.** This replaces template section 6.2 for reviewers. The Company will not use the Reviewer's name, likeness, credentials or bio in any advertising, product, listing, package, email, social post, press material or seal, and will not say or imply that the Reviewer endorses or reviewed any product. The Reviewer is not shown, and does not review, any product.
- **R4. Credit or no credit.** Credit follows section 7 and the choice ticked on the sign-off form. It is limited to the pages and version reviewed, and the Reviewer may withdraw it at any time by written notice (removed within 7 days). If a later change touches the Reviewer's scope, the credit comes off in the same update and returns only after a re-check.
- **R5. Confidentiality.** Template section 7 applies, including the DTSA notice. In addition: no uploading the pages to AI tools or public services; the Reviewer's memo stays confidential, and the Company won't publish or quote it without written consent. The Reviewer will not publicly identify or discuss the Company's owners. The Company keeps the Reviewer's personal information confidential, including any disability or identity information, which it will never state publicly without written consent.
- **R6. No professional relationship.** Template section 6.3 applies. The review is editorial feedback to the Company, not medical, therapeutic or legal advice to any reader, and creates no clinician-patient relationship. The Company is responsible for what it publishes.
- **R7. Writing only.** All communication is in writing, through the marketplace or email. No calls, video meetings or in-person meetings are required or offered.
- **R8. Conflict answers.** The Reviewer's answers to the independence questions are true and complete, and the Reviewer will update them in writing if anything changes before publication.
- **R9. AI use.** The Reviewer's comments are their own work; they don't use generative-AI tools to produce them (template section 4(b)). The Company tells the Reviewer that the pages were drafted with AI assistance.
- **R10. Payment.** Paid through the marketplace's escrow (or on invoice) on delivery of the comment table and signed form, whatever the result.
- **R11. Liability.** Template section 9 applies. Role C decides whether to add a Company indemnity for claims arising from published content (except the Reviewer's own gross negligence or willful misconduct). That would help attract clinicians.
- **R12. Venue.** Role C chooses the governing-law and venue clause (template section 10) so that documents sent to outside reviewers carry no local link beyond the LLC's state.

---

## 7. Credits: how "Reviewed by" may appear

**Only with written consent, only on the pages the person reviewed, only for the version they reviewed, and never in a way that suggests they endorse a product.**

- **Where:** in a "How this page was reviewed" line directly under the page's "Last reviewed" date. Nowhere else: never on product pages, listings, covers, emails, ads, social posts, the homepage, the About page, press material, marketplace or KDP fields, badges or seals. Social posts that link to the hub never name reviewers.
- **Never** "approved", "endorsed", "certified", "expert-approved" or "clinician-approved". Never present a reviewer as an author.
- **Wording** (exactly as ticked on the form; the dates are the reviewed version's):
  - Clinician, named: *"Practical guidance on this page reviewed by [Full name], [credential], on [Month D, YYYY]. [Name] was paid for this review, did not write this page, and does not endorse any product."*
  - Sensitivity reader, unnamed (the default): *"Reviewed for respectful language by a paid autistic sensitivity reader on [Month D, YYYY]."*
  - Sensitivity reader, named: *"Reviewed for respectful language by [Name], a paid sensitivity reader, on [Month D, YYYY]. [Name] did not write this page and does not endorse any product."* Add "autistic" only if the reader ticked that box.
  - Legal reviewer: **no name by default.** The editorial policy may say generally that pages get a claims and legal review before publishing.
- **Clinician credits** go only on IDX, FAQ, GLO, PED and EIV (the clinician does not review POL), and they name the scope ("practical guidance").
- **Structured data** (`reviewedBy`) only if the form's box for it is ticked. Never `MedicalWebPage` (`check_hub_firewall.py` bans it).
- **When a page changes:** a typo, formatting or broken-link fix leaves the credit in place (noted in `review/CHANGELOG.md`). Any change to a claim, number, recommendation, framing sentence or tone inside a reviewer's scope removes that reviewer's credit in the same commit, until they re-check it.
- **Before every hub publish,** the routine searches the whole repository for each credited reviewer's name. It may appear only in the credit lines of the pages that reviewer passed, and in nothing that is sold.

---

## 8. Records and privacy

- The repository was **public** on September 28, 2026 (`ops/CLOUD-RUNBOOK.md` step 1; task #22). Even after it is private, **no reviewer's or applicant's name, contact details, license number, conflict answers or disability or identity information goes into git.**
- In git: pseudonymous codes (SR-1, CL-1, LG-1; applicants SR-A, SR-B …), scores, the version ID reviewed, results, dates and the credit choice. A named credit's text enters git only in the published page itself, with consent.
- Proposals are copied into `review/intake.md` without names or contact details. The originals stay on the marketplace. Signed forms and contracts go to the company minute book (template preparer note).
- `review/CHANGELOG.md` (the routine creates it at step 7): block ID, reviewer code, comment number, what changed, and the new version ID.

---

## 9. Issues found while preparing this pack

1. **The editorial policy promises something the plan doesn't do.** `editorial-policy.md` says "Every page is checked by a person against the sources", and review step 1 says "A person reads each cited source". The plan has the routine (AI) read the sources. Either pay a human fact-checker ($500–1,500, UNVERIFIED, not in the cap) or change the wording to match reality. Role C must resolve this; the page cannot publish as written.
2. **Template section 6.2 conflicts with "no endorsement".** The freelancer template lets the Company use a contractor's name, likeness and bio "to credit and promote the work". For reviewers, rider R3 must replace it.
3. **Template section 10** names a county court as the venue; see rider R12.
4. **Allowlist gaps:** eight hosts needed for H7 and for credential checks are missing (list in section 1). Until they are added, the facts that depend on them stay `[VERIFY]`.
5. **Fixed the same day by the reader-panel pass (re-run: 0 FAIL on the six pages).** **Firewall findings on the six pages (September 28 run of `ops/TESTS/check_hub_firewall.py`).** FAIL HF-02: the free-printable link on IDX and FAQ points to `/free/five-5-minute-plays/`, but the hub may link only to the product-free twin `/research/play-printable/`. WARN HF-06: IDX has 206 words before its first section (the 30-second answer should fit in 150), and GLO lacks the closing "Worried?" line. Fix all three before freezing the review version, so reviewers see the final text.
6. **"No money from device makers, app makers, EdTech companies or research authors"** (`editorial-policy.md`) is marked `[VERIFY: confirm with the owner]`. Only the founder can confirm it.
7. **AAP 2026** may replace AAP 2016, which is on the BRAND.md rule 5 allowed list. If H1 confirms it, updating rule 5 is a founder decision.
8. **Timing:** the SEO calendar's November 2026 slot for the "virtual autism" page comes before the gates can realistically be passed. Move the slot, not the gates.
9. **A second "virtual autism" page could have skipped every gate.** `seo/articles/08-what-is-virtual-autism.md` uses the same URL as the hub pillar page (`/research/virtual-autism/`) and said `publish_gate: none`, and the site build publishes any article whose gate is `none`. On September 28 its gate was changed to `research-hub-review`, so it stays unbuilt until the four gates pass. Only one of the two pages may ever publish; the reviewed hub page is the default, and the SEO calendar should point to it. The firewall also flags the article for the word "cure" and the `/free/` link.
10. **`seo/articles/09-screen-time-and-toddler-talk.md`** (`/research/screen-time-and-toddler-talk/`) is a research page that gives practical advice, and its gate is still `none`. `editorial-policy.md` says every research page gets these reviews. Adding it to Roles B and C would take about 1,000–1,500 more words (UNVERIFIED), inside the caps. That is a founder decision; the firewall already fails it on two links.

---

## 10. Sign-off forms and comment table (printed at the back of the bundle)

<!-- bundle:appendix:start -->
### Comment table

Use one row per comment. Put the block ID from the left margin in the first column. Levels: must-fix, should-fix, suggestion. Add rows as needed, or use the same columns in a spreadsheet.

| # | Block ID | Level | What the problem is | Suggested wording | Why |
|---|---|---|---|---|---|
| 1 |  |  |  |  |  |
| 2 |  |  |  |  |  |
| 3 |  |  |  |  |  |
| 4 |  |  |  |  |  |
| 5 |  |  |  |  |  |
| 6 |  |  |  |  |  |
| 7 |  |  |  |  |  |
| 8 |  |  |  |  |  |
| 9 |  |  |  |  |  |
| 10 |  |  |  |  |  |
| 11 |  |  |  |  |  |
| 12 |  |  |  |  |  |
| 13 |  |  |  |  |  |
| 14 |  |  |  |  |  |
| 15 |  |  |  |  |  |
| 16 |  |  |  |  |  |
| 17 |  |  |  |  |  |
| 18 |  |  |  |  |  |
| 19 |  |  |  |  |  |
| 20 |  |  |  |  |  |

### Sign-off form A: autistic sensitivity read

**Bundle version ID:** ____________  **Pages reviewed:** IDX, FAQ, GLO, PED, EIV, POL  **Reviewer code:** SR-____

1. I read the pages listed above in full, in the bundle version shown.
2. My comments are in the attached comment table: ____ must-fix, ____ should-fix, ____ suggestions.
3. Result (tick one):

- [ ] **Passes** as written.
- [ ] **Passes after changes:** it will pass once every must-fix item is resolved to my satisfaction in the re-check.
- [ ] **Does not pass.** Main reason: ______________________________________________

4. I reviewed wording, framing and respect only. I did not check medical, legal or research accuracy. I was not asked to review, and have not reviewed, any product.
5. My fee does not depend on my result. My answers to the independence questions are complete and true today. Conflicts to note: ______________________
6. Credit (tick one):

- [ ] No credit.
- [ ] Unnamed credit: "Reviewed for respectful language by a paid autistic sensitivity reader on [date]."
- [ ] Named credit, exactly as written here: ______________________________________________

7. Only if I choose (tick any):

- [ ] You may say in the named credit that I am autistic.
- [ ] You may add my name to the page's structured data (reviewedBy).

8. I understand that my credit appears only on the pages I reviewed, only for this version, never with any product or in advertising, and that I can withdraw it at any time in writing.

Signature: ______________________  Date: ____________

**Re-check (within 30 days):** version ID ____________
- [ ] All my must-fix items are resolved.
- [ ] Not resolved: ______________________________________________

Signature: ______________________  Date: ____________

### Sign-off form B: clinician review

**Bundle version ID:** ____________  **Reviewer code:** CL-____  **Credential:** ____________  **License state and number (kept off the website):** ____________

**Scope reviewed:** IDX opening boxes, "What we still don't know" and "What parents can do"; FAQ opening boxes and Q12–Q23; GLO "Words about autism and development", "Tests and checklists" and "Help and services"; PED whole page; EIV whole page.

1. I reviewed the sections listed above in the bundle version shown.
2. My comments are in the attached comment table: ____ must-fix, ____ should-fix, ____ suggestions.
3. Result (tick one):

- [ ] **Passes:** the practical guidance in these sections is accurate and appropriate for a general parent audience, and nothing in them would, in my professional opinion, delay or discourage a family from seeking an evaluation.
- [ ] **Passes after changes:** as above, once every must-fix item is resolved to my satisfaction in the re-check.
- [ ] **Does not pass.** Main reason: ______________________________________________

4. This is editorial review for the publisher. It is not medical advice to any reader and creates no clinician-patient relationship. I did not review how the studies are described, legal wording, or any product.
5. My fee does not depend on my result. My answers to the independence questions are complete and true today. Conflicts to note (including any study on these pages that I wrote): ______________________
6. Credit (tick one):

- [ ] No credit.
- [ ] Named credit on the pages I reviewed (not POL): "Practical guidance on this page reviewed by [Full name], [credential], on [date]. [Name] was paid for this review, did not write this page, and does not endorse any product." Name and credential exactly as they should appear: ______________________
- [ ] Unnamed credit: "Practical guidance on this page reviewed by a paid [pediatric speech-language pathologist / developmental-behavioral pediatrician] on [date]."

7. Only if I choose:

- [ ] You may add my name to the page's structured data (reviewedBy).

8. I understand that my credit appears only on the pages and sections I reviewed, only for this version, never with any product or in advertising, and that I can withdraw it at any time in writing.

Signature: ______________________  Date: ____________

**Re-check (within 30 days):** version ID ____________
- [ ] All my must-fix items are resolved.
- [ ] Not resolved: ______________________________________________

Signature: ______________________  Date: ____________

### Clearance form C: claims and legal review

**Bundle version ID:** ____________  **Reviewer code:** LG-____  **Engagement letter dated:** ____________

**Pages reviewed:** IDX, FAQ, GLO, PED, EIV, POL, and the reviewer contract rider.

Checked (tick each one reviewed):

- [ ] Express and implied health claims, including the link to the free play printable and any implied product claim
- [ ] Causation language, disclaimers, and "not medical or legal advice" wording
- [ ] Public promises in the editorial policy and FAQ (conflict of interest, reply times, who checks sources)
- [ ] Descriptions of named researchers, clinicians and organizations (defamation and false light)
- [ ] Quotations, study titles and screening-instrument names
- [ ] Privacy statements (printable, contact form)
- [ ] Reviewer credit wording (FTC Endorsement Guides)
- [ ] Reviewer contract rider and the freelancer template, for Roles A and B

Result (tick one):

- [ ] **Cleared** for publication as written.
- [ ] **Cleared after the changes listed in my memo** (to be confirmed in one follow-up).
- [ ] **Not cleared.** Main reason: ______________________________________________

This is legal advice to AlphaPlay LLC only. It is not a public endorsement, and it may not be quoted or described publicly without my written consent.

Credit (default none):
- [ ] No credit.
- [ ] Other, exactly as written here: ______________________________________________

Signature: ______________________  Date: ____________

**Follow-up:** version ID ____________
- [ ] The listed changes are made as advised.

Signature: ______________________  Date: ____________
<!-- bundle:appendix:end -->

---

© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC. Internal document.
