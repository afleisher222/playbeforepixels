# Autism content audit: protection check of everything that touches "autism" or "virtual autism"

September 28, 2026. Scope: the whole repository except `products/*/preview*`, `node_modules/`, generated `build/tmp/` files and binaries (1,127 text files). The three spreadsheets in `marketing/` and `business/` were read separately.

**Search terms:** autism, autistic, "virtual autism", ASD, autisme, autismo, neurodivergent, diagnosis, cure, treat, prevent, reverse, recover, "screens cause", "caused by screens", "The Virtual Autism Project", "Research Library", and a list of children's shows, creators, apps, device brands and companies.

**Checks run:** `ops/TESTS/check_listings.py` (listing QA, including `autism_terms`) and `ops/TESTS/check_hub_firewall.py`, both on their own and with `--site site-concepts/winner`.

**Binding rules applied:** BRAND.md "Autism searches", hard rules 1–3 and the no-direct-contact rule; CLAUDE.md exclusions; `content/research-hub/editorial-policy.md`.

> **This repository is public on GitHub** (see Exposure 1). So this file names no creator, show or person, and no detail about the founder or her family. Findings point to a file and line instead.
>
> **Nothing about "virtual autism" is live today.** All hub pages are `publish: false`, and the site is not deployed. The one live exposure is the public repository.
>
> Web search was exhausted and journal sites were blocked. Anything marked **UNVERIFIED** comes from memory.

---

## 1. Summary

| Area | Files scanned | Files with autism terms | Verdict | What happened |
|---|---|---|---|---|
| `content/research-hub/` (75 study pages and 11 hub pages) | 88 | 88 | **Fine, with 4 firewall FAILs and 1 framing question** | Honest framing throughout: "a term some clinicians use", "not a medical diagnosis", associations only, pediatrician and free early intervention on every page. Causal verbs appear only inside quotations or negations, or as glossary definitions. The remaining FAILs are on reviewer-bundle pages owned by the hub-review workflow, so they are on the fix-later list (H1–H7). |
| `products/` (sources, listings, emails) | 206 | 10 | **No binding violation; 5 fix-later items** | No autism word in any public listing field, keyword, tag, hashtag, book, printable or product email. The only hits are banned-word lists, internal `compliance_notes`, and simulated customer-panel notes (each marked "simulated, never quote"). Two search terms associated with autism searches ("first then board", "visual schedule") need a founder decision (P1–P2). |
| `products/` (build and generated files) | 357 | 6 | Fine | Banned-word lists in build checks only. |
| `index.html` (current site preview) | 1 | 1 (8 hits) | **Fixed now** | It had a "virtual autism" section on a page that sells products, an implied recovery claim, the retired hub name, a named documentary linked to a third-party autism-named domain, and play framed next to autism-like symptoms. All of it is removed (log item C1). It now has 0 autism terms. |
| `site-concepts/` (read-only for this audit) | 90 | 30 | **Violations; fix later (W1–W11)** | The retired hub name and the term sit in the site-wide mega menu on every shop and product page (HF-15 FAIL). The autism-term research page carries shop menus with prices, product cards and the cart. |
| `content/founder-story.md` | 1 | 1 (26 hits) | **Fixed now; counsel review still required** | All three versions use "virtual autism" and "autistic", and gave the child's sex. Under BRAND rule 3 plus the editorial policy, they cannot be published anywhere. A SITE-SAFE CUT was added as the default, and the child is now "my child" (C2). |
| `marketing/` | 27 | 12 | **Mostly fine; fixed now** | The retired name remained in CAMPAIGN-BIBLE and AWARENESS-ENGINE. The outreach plan held a podcast pitch that breaks the no-direct-contact rule. The founder's first name sat next to "virtual autism" in SOCIAL-HANDLES. The paid/free deck bundle was not firewalled. All fixed (C3–C6). |
| `seo/` | 13 | 3 | **Fixed now** | Hub name aligned. The two hub-bound articles lost their `/free/` and `/learn/` links and the word "cure" (C7–C8). |
| `business/` | 12 | 6 | **Fine; names aligned** | The red team already caught most issues. Hub name and done-status updated (C9). The email-funnel conflict it raised goes to the founder (D3). |
| `legal/` | 22 | 5 | **Fine; one line fixed** | The domain decision is sound: no "virtual autism" domain, no hub name with "autism". The addendum still said "only if the hub keeps the name" and mentioned "a hoped-for partnership" with a DO-NOT-CONTACT site. Fixed (C10). |
| `ops/` | 34 | 10 | **Fixed now** | ROUTINE.md let the unattended routine do outreach with no APPROVED line. Both checkers missed Turkish, Polish and non-Latin autism words. Fixed (C11–C12). Founder decisions were added to APPROVALS.md (C13). |
| `operations/` | 13 | 3 | **One fix** | Macro 31 answered a developmental worry with a play link that could lead to a product page. It is now pinned to the product-free hub edition (C14). |
| `brand/`, `commerce/`, `finance/`, `CLAUDE.md` | 249 | 2 | Fine | Rules and records only. |
| Spreadsheets (events calendar, groups directory, financial model) | 3 | — | Fine | Autism and acceptance observances are excluded on purpose, autism-themed summits are refused, and the excluded organizations are marked on every relevant row. |

**Named shows, creators and apps:** the children's video in the founder's own story is never named anywhere in the repository. Public-facing files name only neutral sales channels (Etsy, KDP, TikTok and so on), which BRAND allows. Internal planning files name outlets and creators only as do-not-contact or listen-only rows; five characterizations of named people or outlets in the outreach plan were neutralized (C5). One product tag reads like a creator's brand (P5).

**Checker status after this audit:** `check_hub_firewall.py` shows 4 FAIL and 4 WARN (down from 8 FAIL). All 4 remaining FAILs are hub-workflow items H1, H2, H4 and H5; none is on a `publish: true` page. `check_listings.py` gives the same results as before this audit's edits. Its only autism findings are WARNs (P1–P3), and its exit code of 1 comes from non-autism listing FAILs owned by the product workflow.

---

## 2. The specific checks

| Check | Result |
|---|---|
| "The Virtual Autism Project" remnants outside products | **Fixed** in index.html, CAMPAIGN-BIBLE (4 places), AWARENESS-ENGINE, SEO-PLAN, BUSINESS-PLAN and its section 01, REVENUE-PLAN, and domain-portfolio. **Still open** in `site-concepts/` (about 60 lines across the winner and the three other concepts; W1–W11). Records that document the rename (`brand/ORIGINALITY.md`, `legal/DECISION-MEMO.json`, `legal/ENTITY.md`) are correct as they are. |
| Any product, listing, hashtag or email with an autism keyword | **None in public fields**, in any language. Internal `compliance_notes` in 5 listing files name the condition (P3). Upload packets must never copy `compliance_notes` to a marketplace; `ops/UPLOAD-PACKETS/` is empty today. Hashtag bank: clean. Product emails (30-day course, funnel): clean, with a standard "not medical advice; talk with your pediatrician" footer. |
| Causal wording | After the index.html fix, **none outside negations**. Hub pages quote authors' causal words only with attribution, and say so. The glossary flags "screen-induced" as assuming a cause. |
| Implied clinical authority | Products and hub say "parent education" and "we are not clinicians". Remaining soft spots: the founder story's "I have training, and I know how to read research" and every "educator" byline, including the site concept's colophon. Both wait on counsel's answer to REVENUE-PLAN Q9. The hub's paid clinician reviewer may be credited only with written permission. |
| Founder story | Anonymous byline, no named show or creator, counsel review required (all correct). **Problem found:** every version used "virtual autism" and "autistic", which is not allowed outside hub material, and the hub carries no founder story. It also paired the child, by sex, with an autism question. Fixed (C2); the founder must approve the cut (D2). |
| Social handles | No autism handle is recommended or claimed; only `playbeforepixels` everywhere. The bio has no claims. Correct. |
| Domains | No "virtual autism" domain; the hub lives at `/research/`. Correct. The stale conditional was fixed (C10). |
| Outreach and contact | No APPROVED outreach line exists yet. All autism organizations and communities are DO NOT CONTACT. The podcast pitch is retired, and the routine can no longer send outreach on its own (C5, C11). |
| Excluded organizations | Nothing in the autism material contacts or targets the excluded school system, unions or county agency. The hub's early-intervention wording stays national. CAMPAIGN-BIBLE topic 10 was switched to national directories only, because a state program link can route readers to the excluded county program (C4). |

---

## 3. Changes made now (log)

| # | File | Change | Why |
|---|---|---|---|
| C1 | `index.html` | Nav "The Project" → "Research". The "What is virtual autism?" section became a neutral "Play Before Pixels Research Notes" teaser: no term, and no recovery claim ("behaviors ease when screens are removed"). "Consistent link … weaker language and social development" became association-only wording. The three autism-term study cards were dropped (including "daily parent-child play was linked to fewer [autism-like symptoms]" on a page that sells play products). The film feature and its link to the autism-named third-party domain were replaced by a Research Notes card, and the film was taken out of the footer's non-affiliation line. | BRAND rule 3 and "Autism searches" (the term is not allowed on a shop page); rule 1 (implied recovery claim); rule 2 and outreach row 49 (DO NOT CONTACT, implied affiliation); the outreach checklist's gating items. |
| C2 | `content/founder-story.md` | Added a binding-conflict banner. "My daughter" became "my child" and "her" became "their"/"my child" in all versions. Added confirm-items on expertise claims and the "educator" byline. Added a **SITE-SAFE CUT** (removes lines only) as the default public version, with deletion instructions for longer versions. | BRAND rule 3 plus editorial policy; CLAUDE.md (no children's details); anonymity. |
| C3 | `marketing/CAMPAIGN-BIBLE.md` | "Virtual Autism Education Series" and "The Virtual Autism Project" (lines 5, 289, 334, 361, 363) became the Research Notes names. P19 gained a firewall: the Autism-Term deck lives only under `/research/`, with no listing.json, price, cart or end-screen upsell, never bundled with or linked to the $5 deck. Topic 10 now uses national directories only. | Rename decision; BRAND "Autism searches"; AWARENESS-ENGINE open item 5. |
| C4 | `marketing/AWARENESS-ENGINE.md` | Row 69 and the line 194 attribution use "Research Notes". Open items 3 and 4 marked resolved. Founder decision 1 marked decided. | Rename decision; checker fix. |
| C5 | `marketing/virtual-autism-outreach.md` | Podcast pitch (row 4, Draft 1) retired. Summary counts updated. Every message now needs an APPROVED line. The bio defaults to the cut version, and the child became "my child". Five characterizations of named people or outlets were neutralized to "topic proximity". Three index.html checklist items marked done. | No-direct-contact rule; BRAND rule 3; never criticize a named creator (the repository is public). |
| C6 | `marketing/SOCIAL-HANDLES.md` | The founder's first name → "the founder" (lines 3 and 21), next to "virtual autism". | Anonymity in a public repository. |
| C7 | `seo/SEO-PLAN.md` | Hub name decided ("Research Notes"); row 37 title aligned. | Rename decision. |
| C8 | `seo/articles/08-what-is-virtual-autism.md`, `09-screen-time-and-toddler-talk.md` | Printable links go to the product-free twin `/research/play-printable/`. The `/learn/` link came out of 09. "Promises 'recovery' or a cure" became "promises 'recovery' from cutting screens". The "not a treatment or therapy" sentence next to the printable became "It's simply play for family time." The publish gate set by the hub-review workflow is unchanged. | HF-02, HF-04 and HF-10 FAILs. |
| C9 | `business/BUSINESS-PLAN.md`, `business/sections/01-vision-market.md`, `business/REVENUE-PLAN.md` | Hub name → "Play Before Pixels Research Notes". Completed index.html items marked done. | Rename decision. |
| C10 | `legal/domain-portfolio.md` | Decided name recorded. The "only if the hub keeps the name" purchase is marked moot. "A hoped-for partnership" became "no partnership: DO NOT CONTACT". | Consistency with DECISION-MEMO and the outreach plan. |
| C11 | `ops/ROUTINE.md` | The routine may only draft outreach into APPROVALS.md as PENDING and never sends without a verified APPROVED line. Podcasts, interviews and calls are never allowed. Hub social posts follow HF-14. | No direct contact or community posting without an APPROVED line. |
| C12 | `ops/TESTS/check_listings.py`, `ops/TESTS/check_hub_firewall.py` | Added otizm/otistik (Turkish), autyzm/autyst (Polish) and non-Latin-script autism words (Cyrillic, Greek, Hebrew, Arabic, Persian, Chinese, Japanese, Korean, Hindi) to the autism, hashtag and framing patterns. FOUNDER_RX now also catches "videos my child lov…". Both scripts were re-run: listing results are unchanged, and the hub shows no new findings. | AWARENESS-ENGINE open item 4. The translations are UNVERIFIED; each translator confirms the local word. |
| C13 | `ops/APPROVALS.md` | Four PENDING items added: make the repository private (urgent), the founder-story public version, the hub email route, and the "first then board" search words. | Founder decisions. |
| C14 | `operations/customer-service/macros.md` | Macro 31: `{link}` must be the product-free `/research/play-printable/`, never `/free/`, a shop page or a discount. If that page doesn't exist yet, the sentence is left out. | BRAND "Autism searches" (a developmental worry must not become a sales lead). |

Nothing was committed. Nothing in `products/`, `site-concepts/` or `brand/logo*` was edited.

---

## 4. Fix-later list (files other workflows own)

### Site concept (owner: site workflow). Source files first; then rebuild and run `python3 ops/TESTS/check_hub_firewall.py --site site-concepts/winner --strict`, which must show 0 HF-15.

| # | File:line | Current text | Replacement |
|---|---|---|---|
| W1 | `site-concepts/winner/_tools/build.js:89` | `<h2>The Virtual Autism Project</h2>` | `<h2>Research Notes</h2>` |
| W2 | `site-concepts/winner/_tools/build.js:90` | `A calm reading room on young children, screens and talk. “Virtual autism” is a term some clinicians use. It is not a medical diagnosis.` | `A calm reading room on young children, screens and talk: what the studies found, and what they can’t show.` (this mega menu renders on shop and product pages, so the term must leave it) |
| W3 | `site-concepts/winner/_tools/build.js:162` | `<a href="research.html">The Virtual Autism Project</a></li><li><a href="research.html#term">What the term means</a>` | `<a href="research.html">Research Notes</a>`. Drop the `#term` item from the site-wide menu: no non-hub page links to the term page (AWARENESS-ENGINE line 103). |
| W4 | `site-concepts/winner/_tools/build.js` (page chrome, lines 34–86 and the cart button at about 141) | `research.html` is built with the shop, books and teacher mega menus (product cards; prices $11.99, $24.99, $129.00) and the cart | Give research pages a product-free hub chrome: Home, Research Notes pages and policy links only. No shop menus, cart, prices or product images (BRAND "Autism searches"; HF-02). |
| W5 | `site-concepts/winner/_src/index.html:162`, `:164` | `The Virtual Autism Project` / `“Virtual autism” is a term some clinicians use. It is not a medical diagnosis, and the studies describe associations, not causes.` | `Research Notes` / `The studies describe associations, not causes, and they describe groups, not any one child.` (the homepage sells products) |
| W6 | `site-concepts/winner/_src/research.html:2`, `:11`, `:16`, `:43` | Title, breadcrumb, H1 and share-mail subject say `The Virtual Autism Project` | `Research Notes · Play Before Pixels` / `Research Notes` / `Research Notes` / `Research%20Notes%20reading%20room` |
| W7 | `site-concepts/winner/_src/research.html:51` | `The phrase was put forward in a 2019 hypothesis paper…` | Use the reviewed hub pillar's origin wording. The pillar credits an earlier 2018 source; see H6 (UNVERIFIED which is right). |
| W8 | `site-concepts/winner/catalog.js:157` | `title: 'The Virtual Autism Project'` | `title: 'Research Notes'` (line 158, the term entry, may stay: site search sends people to the hub) |
| W9 | `site-concepts/winner/*.html` (built) | Every page repeats W1–W3 | Rebuild after W1–W8 |
| W10 | `site-concepts/DESIGN-SYSTEM.md:421`, `:567` | `config.hubName` default "The Virtual Autism Project"; "please choose" | Default "Play Before Pixels Research Notes"; decided September 28, 2026 (`legal/ENTITY.md`) |
| W11 | `site-concepts/A-*`, `B-*`, `C-*` | 64 lines carry the old name or the term in their nav, home and research pages | Archive as non-launch concepts, or apply W1–W8. Never deploy them. |

### Research hub (owner: hub-review workflow). Editing these pages changes the reviewer bundle's version ID, so do it before the version is frozen for paid reviewers.

| # | File:line | Current text | Replacement |
|---|---|---|---|
| H1 | `content/research-hub/index.md:327` | `[Five 5-Minute Plays](/free/five-5-minute-plays/)` | `[Five 5-Minute Plays](/research/play-printable/)` (HF-02; REVIEW-PACK item 5) |
| H2 | `content/research-hub/faq.md:129` | link to `/free/five-5-minute-plays/` | `/research/play-printable/` |
| H3 | `content/research-hub/index.md:241` with `:327` | "Daily parent-child play went with lower scores" (Heffler 2020, autism-checklist scores) on the same page as the free **play** printable | Net-impression risk: together they read as "our play printable lowers autism scores". Recommended: move the printable invitation off the pillar and keep it only in FAQ Q23 (numbered Q22 when this audit was written), which doesn't report that finding. At minimum, the claims and legal reviewer rules on it explicitly. |
| H4 | `content/research-hub/studies/dunckley-electronic-screen-syndrome.md` | no "not a medical diagnosis" sentence (HF-06 FAIL) | Add the short safe sentence from CAMPAIGN-BIBLE §4 |
| H5 | `content/research-hub/studies/zhang-2023-shared-genetic-risk.md` (front matter) | `meta_description` is 161 characters (HF-07 FAIL) | Trim to 155 or fewer |
| H6 | `content/research-hub/index.md:189` vs `seo/articles/08…md` ("Where the term comes from") and W7 | The pillar credits a 2018 source with coining the term; the article and the site concept credit the 2019 hypothesis paper | Settle against primary sources [VERIFY] and use one wording everywhere. Critics will check this first. |
| H7 | `content/research-hub/glossary.md`; `seo/articles/08…md` | closing "Worried?" line missing (WARN) | Add the closing line (08 is a retired duplicate; the pillar stays canonical) |

**Status update (same day, reader-panel pass):** H1, H2, H3, H4, H5 and H7 (glossary) are done; `check_hub_firewall.py` shows 0 FAIL on the hub pages. H6 (who coined the term, and when) stays open until the primary sources are read.

### Products (owner: product workflow; read-only here). Edit the build source, then regenerate `listing.json`.

| # | File:line | Current text | Replacement |
|---|---|---|---|
| P1 | `products/visual-routine-cards/listing.json:4`, `:24`, `:38`, `:47`, `:48`; source `build/listing.js:35`, `:54`, `:55` | Title "…Routine Chart, First Then Board, Kids Checklist PDF"; long description "a first–then board"; keywords/tags "first then board", "visual schedule" | **Founder decision D4.** If REPLACE: title "…Routine Chart, Two-Step Picture Board, Kids Checklist PDF"; description "a two-step picture board"; keyword → "picture routine cards"; tags → "picture cards kids", "big kid checklist" (the checker's proposals). Record the decision in `compliance_notes`. |
| P2 | `products/visual-routine-cards/listing-starter.json:4`, `:7`, `:23`, `:24`, `:28`, `:35`, `:44`, `:52`, `:57`; source `build/listing.js:89`, `:108`, `:109` | Same terms in the starter listing (title, trim note, short, long and SEO descriptions, keywords, tags) | Same decision. If REPLACE: "two-step picture board"; keyword → "toddler picture schedule"; tags → "toddler picture chart", "kids daily routine" |
| P3 | `products/first-phone-plan/listing.json:85`; `products/play-first-family-kit/listing.json:105`; `products/toddler-busy-book/listing.json:87` (source `build/listing.js:66`); `products/visual-routine-cards/listing.json:119` and `listing-starter.json:105` (source `build/listing.js:30`) | `compliance_notes` names "autism" and "ADHD" | "diagnosis or condition wording". Also make sure no upload packet ever copies `compliance_notes` to a marketplace. |
| P4 | `products/picture-more-talk-less-tap/listing.json:149` (`faq[8].a`) | "The kit treats a talking device as a child's voice, not screen time." | "The kit counts a talking device as a child's voice, not screen time." |
| P5 | `products/play-talk-cards/listing.json:41`; source `build/listings.js:49` | tag "busy toddler ideas" | "toddler play ideas" (reads as a creator's brand name; BRAND rule 2) |

### Outside this audit's topic, but seen: `index.html` still offers coaching, "Book a consult", "book a speaker" and in-person events, names a book, its author and its publisher, and uses the retired four-square logo. It is due to be replaced by the site workflow. Do not deploy it as it is.

---

## 5. Founder decisions (also in `ops/APPROVALS.md`)

- **D1 (urgent).** Make the GitHub repository private today.
- **D2.** Approve the SITE-SAFE CUT as the only public founder story (counsel review still required).
- **D3.** Choose the hub email route. **A (recommended):** a product-free delivery email, plus a separate unticked opt-in to the newsletter that says it includes products. **B:** join the general newsletter with a suppression-only tag. This settles the conflict between AWARENESS-ENGINE HF-17 and the REVENUE-PLAN red team.
- **D4.** KEEP or REPLACE "first then board" and "visual schedule" in the visual-routine-cards listings. The audit recommends REPLACE.

---

## 6. The three biggest remaining legal and reputational exposures on this topic

**1. The repository is public, so the "anonymous founder" protection does not hold today.**
- **What it is.** GitHub's public API reported the repository as public on September 28, 2026 at about 02:50 UTC (0 forks, 0 stars, created the same day). The repository name ties it to the founder's account. Anyone can read the founder story, the internal notes and the counsel-facing files. That combination is a privacy risk for the founder's family and a reputational risk for the brand. It also puts internal notes about named outlets and people on public view.
- **Protective step.** The founder makes the repository private now (2 minutes; steps in `ops/CLOUD-RUNBOOK.md`; APPROVALS D1). Counsel is then asked whether anything already exposed needs more than that. Keep using only the SITE-SAFE CUT of the founder story in public, so that even if the family is ever identified, nothing public pairs the child with autism.

**2. An implied health claim through placement: the brand looks as if it sells to autism worries even though no product says "autism".**
- **What it is.** Regulators and critics judge the net impression, not single words. Four places create it:
  - the winning site concept puts the term and the old hub name in the site-wide menu on every shop and product page, and puts prices, product cards and the cart on the autism-term research page;
  - people who sign up on hub pages flow into the same list that gets the $7 tripwire and product promotions;
  - the hub pillar reports "daily parent-child play went with lower autism-checklist scores" on the same page that offers a free play printable;
  - "first then board" and "visual schedule" are search terms associated with autism.
- **Why it matters.** This is the FTC "net impression" risk for health claims (UNVERIFIED legal characterization; counsel confirms), and it breaks BRAND's "Autism searches" rule in spirit even where the words pass.
- **Protective step.** Before launch:
  - build the research section as its own product-free template (W1–W4);
  - pick hub email route A (D3);
  - move the printable invitation off pages that report play–autism associations (H3);
  - replace the two adjacent search terms (D4);
  - make `check_hub_firewall.py --strict --site <built site>` and `check_listings.py` required checks that block any deploy.

**3. Accuracy and backlash on a contested term, published by a business.**
- **What it is.** Critics already call "virtual autism" unscientific and parent-blaming, and a business explaining it will be read hostilely. Today every hub source is "secondary-only", the reviewer bundle carries 172 [VERIFY] marks, and the repository disagrees with itself on basic facts (who coined the term, and when: H6). There are two pages for one URL (the pillar and `seo/articles/08`). One wrong fact, one screenshot of a product next to the term, or one post that reads as parent-blaming could define the brand.
- **Protective step.** Publish nothing about the term until all four hub gates pass: primary sources read, a paid autistic sensitivity read, a clinician reviewer, and a claims and legal review (the reviewer briefs are PENDING in APPROVALS.md). Settle H6 against primary sources, keep `seo/articles/08` retired, and keep term posts comment-off, never boosted, on a steady weekly cadence and never tied to awareness months. Run the public corrections log from day one.

**What "proactive" looks like inside the binding rules:** approve the three reviewer briefs, build the product-free `/research/play-printable/` twin and the hub template, fix H1–H7, and then publish the pillar and FAQ. Those two pages are how the brand becomes the calm, honest answer for people searching "virtual autism", while every product stays about play and family time.

---

## 7. How to re-run

```
python3 ops/TESTS/check_listings.py                                  # autism_terms is column 12
python3 ops/TESTS/check_hub_firewall.py --strict                     # hub pages, before any publish
python3 ops/TESTS/check_hub_firewall.py --site site-concepts/winner  # HF-15: shop pages must not mention autism
grep -rniE "virtual autism project|autis" --include=*.html --include=*.js site-concepts/winner | grep -v research.html
```
