# Awareness Engine: the most trusted answer to "virtual autism"

Play Before Pixels, a trade name of AlphaPlay LLC. Internal working file, not for publication. Written September 28, 2026.

**What this covers:** owned channels only (the research hub, search, Pinterest, Instagram). Outreach is planned in `marketing/virtual-autism-outreach.md` and is not repeated here.
**Binding:** `brand/BRAND.md` ("Autism searches", hard rules 1–3 and 5), `ops/COMPLIANCE-GATE.md`, `content/research-hub/editorial-policy.md`, `content/research-hub/translation-plan.md`.
**Status:** every hub page is `publish: false`. Nothing here goes live until its sources have been read (abstract at minimum) and the paid human reviews have signed off. Anything written from memory is marked UNVERIFIED. Web search was unavailable for this plan.

---

## 0. The strategy in five lines

1. **Be the best answer, not the loudest.** One honest pillar page per language that answers the question within 30 seconds. After that, the useful next steps.
2. **The hub is judged by one thing:** whether a worried parent reaches their pediatrician and a free evaluation. Sales never count (§9).
3. **A wall between the hub and the shop,** written as rules that a script checks on every run (§10, `ops/TESTS/check_hub_firewall.py`).
4. **Honest beats fast.** Primary sources, paid reviewers, visible "Last reviewed" dates, and a public corrections log. For a publisher who is not a clinician, this is the trust signal search engines and parents can actually check.
5. **This is also the business case.** Trust compounds. A hub that sold to frightened parents would be penalized by search engines, criticized in public, and a health-claim risk. A hub that plainly doesn't sell earns links, citations and a brand people remember.

---

## 1. The searches we answer, and never sell to

| Language | Term(s) | Where it came from | Page that answers it | When |
|---|---|---|---|---|
| English | "virtual autism", "what is virtual autism", "is virtual autism real", "screen time and autism", "do screens cause autism" | Research lane (Harlé 2019, Heffler 2020 and others). Search demand is UNVERIFIED | Pillar (the term); FAQ (the questions) | Launch |
| English (related labels) | "digital autism", "electronic screen syndrome", "EPEE", "post-digital nannying autism syndrome", "screen-related developmental delay" | Research lane (glossary; several [VERIFY]) | Glossary anchors | Launch |
| Spanish | "autismo virtual" | Glossary. No Spanish-language source read yet | `/es/investigacion/autismo-virtual/` | Wave 1 |
| French | "autisme virtuel"; "EPEE (exposition précoce et excessive aux écrans)" | Research lane (Marcelli 2018, Harlé 2019) | `/fr/recherche/autisme-virtuel/` | Wave 2 |
| Portuguese | "autismo virtual" | Glossary. Brazilian demand UNVERIFIED | `/pt/pesquisa/autismo-virtual/` | Wave 3 |
| German | "virtueller Autismus" | Research lane (Spitzer 2023; autismus Deutschland) | `/de/forschung/virtueller-autismus/` | Wave 4 |
| Romanian | "autism virtual", "autismul virtual" | Research lane (Zamfir 2018; psihologia.ro) | `/ro/cercetare/autismul-virtual/` | Wave 5 |
| Turkish | "sanal otizm" | Research lane (Başaran review) | `/tr/arastirma/sanal-otizm/` | Candidate (founder decision) |
| Watch list, all **UNVERIFIED** (from memory) | Italian "autismo virtuale" · Polish "autyzm wirtualny" · Dutch "virtueel autisme" · Russian "виртуальный аутизм" · Arabic "التوحد الافتراضي" · Persian "اوتیسم مجازی" · Indonesian "autisme virtual" · Vietnamese "tự kỷ ảo" · Korean "유사자폐" (means "pseudo-autism", a broader term) | Not found by the research lane | None | Only when Search Console shows impressions from that language **and** a reviewed translation is budgeted |

- **Before a translation exists,** the English pillar's "Other labels" section lists each term, marked with its language (`<span lang="fr">autisme virtuel</span>`). That honestly helps someone who searched in another language. **No thin pages built only to catch a term** (Google's scaled-content and doorway policies; ROUTINE.md "Search quality").
- **Never targeted, in any language:** any of these terms on a product, listing, ad, keyword, hashtag or email (BRAND "Autism searches").
- **Show, channel and creator names are never targeted either,** even though parents search "[show] autism" (BRAND rule 2). The FAQ answers that question in general terms (§2).

---

## 2. The worried-parent journey

This is designed for the person the founder once was: a parent on a phone, late at night, who has just typed a frightening question.

| # | What the parent needs | What they get | Where |
|---|---|---|---|
| 1 | A search result that doesn't frighten them | A title and meta description that lead with the answer ("not a diagnosis"), never a scary question | Search results |
| 2 | An honest answer in 30 seconds | The H1, then the **short safe sentence** as the first paragraph, then a three-line box: "Worried? 1. Talk with your pediatrician. 2. Ask for a free evaluation. 3. Bring these questions." **At most 150 words before the first section.** Nothing above it: no pop-up, banner, cookie wall or sign-up | Top of the pillar |
| 3 | What we know and what we don't | "The short version" bullets, "What we still don't know", and an evidence label beside every study | Pillar |
| 4 | Questions for the pediatrician | A printable with no email required: Letter, A4 and large print, plus an HTML version | `/research/pediatrician-questions/` |
| 5 | A free early-intervention evaluation, in general terms | In the US, under 3: the IDEA Part C program; you can usually refer your own child, and the evaluation is free [VERIFY]. Age 3 and up: the local public school district [VERIFY]. Outside the US: a doctor, nurse or health visitor. **Links go only to national directories, never to a state or county program** | `/research/early-intervention/` |
| 6 | Everyday talk-and-play ideas | The six plain-words moves (pause and wait, say what you see, repeat and add one word, offer a choice, follow their lead, sing and gesture), described as "not a treatment, not a test" | Pillar, "What parents can do" |
| 7 | An optional free play printable | **One** link, framed as play and family time. It leads to a product-free twin page, `/research/play-printable/` (noindex), which gives a **hub edition** of the PDF (`channel=hub`: the brand URL in the footer, but no "More from" page and no QR code to the bonus page or shop) and a product-free delivery email. After that, readers get the same general newsletter as everyone else. There is **no hub-specific email sequence**. **The sign-up form says plainly, before anyone signs up, that the newsletter includes our products**, and FAQ Q26 says the same (final wording follows the hub email route, `ops/APPROVALS.md` D3) | FAQ Q23 only. **Not on the pillar** (reader panel and autism content audit H3: the pillar reports that daily parent-child play went with lower autism-checklist scores, so a play printable beside it could read as a claim) |

The journey ends at the pediatrician, not at the shop. There is no exit-intent pop-up, no retargeting and no "you may also like".

**Two gaps to close before launch (both closed September 28, 2026, by the simulated reader panel, §13):**
- `content/research-hub/index.md` had 206 words before its first section. "How we wrote this" now sits below "The short version", and the three-step "Worried?" box is the second block (150 words before the first section).
- FAQ question on particular shows, now **FAQ Q4**, right after "Do screens cause autism?" (draft, needs every review; the old questions 4–26 are now 5–27): **"Is one particular show or video channel the problem?"** Suggested answer: "The studies we have found measured how much time children spent with screens, and sometimes how they used them (alone or together, background TV), not particular shows. We don't comment on particular shows or channels. If you're worried about your child, talk with your pediatrician." This answers the founder's own late-night question without naming anyone.

---

## 3. Page structure and on-page SEO

### 3.1 One page per search intent, so hub pages never compete with each other

| URL (source) | What it answers | Title (≤60) | Meta description (≤155) | Schema | Reviewed |
|---|---|---|---|---|---|
| `/research/` (**to build**) | "research library"; navigation | Research Notes: Screens, Play and Early Talk (SEO-PLAN row 37) | SEO-PLAN row 37 | CollectionPage, BreadcrumbList | Every 6 months |
| `/research/virtual-autism/` (`index.md`) | The term: "what is", "is it real", "is it a diagnosis" | What Is "Virtual Autism"? What the Research Says (48) | Existing (146) | Article + WebPage `lastReviewed`, BreadcrumbList | January and July, plus whenever the evidence changes (§4) |
| `/research/virtual-autism/faq/` (`faq.md`) | Question searches: "do screens cause autism", "did I cause this", "how much screen time" | Do Screens Cause Autism? Careful Answers for Parents (52) | No study has shown that screens cause autism. Plain answers about "virtual autism", screen time, blame, and how to ask for a free evaluation. (141) | FAQPage, with the visible Q&A copied word for word; BreadcrumbList | January and July |
| `/research/glossary/` (`glossary.md`) | Related labels (EPEE, ESS, "digital autism", PDNAS) and research words | Research Words About Screens and Autism, Explained (50) | Plain meanings of the words on our research pages: "virtual autism", EPEE, association vs. cause, screening vs. diagnosis, early intervention. (142) | DefinedTermSet, with one DefinedTerm per entry and an `#anchor` for each | January and July |
| `/research/library/` | "studies on screen time and autism" | Existing | Existing | CollectionPage + ItemList | New studies added monthly |
| `/research/studies/{slug}/` | Searches for a named study | {Author} {Year}: {finding} | Existing | Article; `citation` → ScholarlyArticle with a verified DOI | When the study or our reading of it changes; **noindex until verified** (already set) |
| `/research/pediatrician-questions/` | "questions to ask the pediatrician about development" | Questions to Ask Your Pediatrician About Development (52) | Existing | WebPage + DigitalDocument (the PDF) | January and July |
| `/research/early-intervention/` | "free early intervention evaluation" | How to Ask for a Free Early Intervention Evaluation (51) | Existing | Article (no HowTo markup) | January and July; every program fact re-checked on its official page each time |
| `/research/facts/` (**to build**, §6) | Journalists and researchers | For Journalists and Researchers: Facts and Data (47) | Who publishes this research library, a definition you may quote, our evidence table to download, how to cite us, and how to report an error. (140) | WebPage + Dataset | Monthly, with the library |
| `/research/play-printable/` (**to build**) | Nothing (noindex) | — | — | None | With the printable |
| `/research/editorial-policy/` | Trust | Existing | Existing | WebPage; the Organization's `publishingPrinciples` points here for the hub | Every 12 months |

**Duplicate to resolve:** `seo/articles/08-what-is-virtual-autism.md` and `content/research-hub/index.md` both claim `/research/virtual-autism/`. `index.md` is the canonical version. Retire 08 and keep it in git. A9 (`/research/screen-time-and-toddler-talk/`) stays in the hub and follows the firewall, so its `/learn/` link goes.

### 3.2 On-page rules
- **Answer first.** The first paragraph under the H1 is the short safe sentence, word for word, so it can be quoted in a search snippet or an AI answer. The full sentence sits in the callout box.
- **H2s are the questions people ask** ("Is it a diagnosis?", "Do screens cause autism?", "What should I do if I'm worried?"). The first sentence under each H2 answers it.
- **Dates.** Under the H1: "Last reviewed {date} · Next review by {date}". A dated "What changed" note at the bottom for every substantive update. `dateModified` changes only when the content really changes, and `last_reviewed` changes only when a person re-reviews the page.
- **An evidence label beside every study mention:** Association · Meta-analysis · Guideline · Hypothesis · Case report · Commentary (BRAND-RESPECT-PLAN §2).
- **Every term links to the glossary** on first use. Abbreviations (M-CHAT, ADOS, IDEA) are spelled out.
- **Canonical tags point to the page itself.** hreflang is used only between reviewed translations, with `x-default` set to English.

### 3.3 Schema: what to use and what never to use
- **Use:** Article; WebPage with `lastReviewed`; FAQPage; DefinedTermSet and DefinedTerm; CollectionPage and ItemList; ScholarlyArticle citations with verified DOIs; Dataset (on the facts page); BreadcrumbList; and the Organization by `@id`, with the author given as "Play Before Pixels editorial team".
- **`reviewedBy` only for a real reviewer** who is paid, named, has agreed to be named, and has a credit line that discloses payment (FTC 16 CFR 255; BRAND-RESPECT-PLAN §3).
- **Never use on hub pages:** Product, Offer, AggregateRating, Review, MedicalWebPage, MedicalCondition, Physician, MedicalOrganization, HowTo, a named Person as author, or `founder`. The medical types would claim a clinical authority we don't have (HF-12).
- **FAQ markup is for structure,** for Bing and for AI answers. Since 2023, Google has shown FAQ rich results mainly for government and health authorities (SEO-PLAN §5.8, UNVERIFIED).

### 3.4 Internal links
- **Inside the hub:**
  - The pillar links to the FAQ, the glossary, the library, every cited study, the pediatrician questions, the early-intervention page and the editorial policy.
  - Each FAQ answer links to its study page and to the matching section of the pillar.
  - Each study page links to the library, to the pillar, and to at least one study with the **opposite or a null stance** (the balance rule, which can be checked from the `stance` field).
  - Every hub page ends with the "Worried?" line.
- **Into the hub:** the footer's "Research library" and the "Research" menu item link to `/research/`. `/learn/` articles may link to `/research/` or to talk and guideline study pages. **No page showing a product, price or cart links to `/research/virtual-autism/*`**, and anchor text on non-hub pages never uses the word "autism" (HF-15).
- **Out of the hub:** links go only to other hub pages, the policy pages and the printable twin (HF-02), and to sources, never to shops (HF-03).
- **Hub page template:**
  - The logo links to `/research/`.
  - The header reads: "Research library · Questions parents ask · Glossary · Worried? Start here". There is **no "Shop" item in the hub header.**
  - The footer is the standard legal footer plus "About", which says that we sell play materials.

### 3.5 Honest E-E-A-T for a publisher who is not a clinician
- **Every page says who we are,** in one line with a link: "Published by Play Before Pixels (AlphaPlay LLC), which sells play materials. We are not clinicians. How we work →"
- **We show our work:** "What we read" for each study, evidence labels, full citations with DOIs, and critical and null studies listed first in the library.
- **Real reviewers only.** No "medically reviewed" badge unless a named clinician reviewed that exact version.
- **Nothing invented or borrowed.** No invented author, founder story, testimonials, "as seen in", awards or star ratings on hub pages. The experience we claim is careful reading, not clinical practice.
- **A public corrections log** and dated "What changed" notes.
- **Fast pages.** No third-party scripts on hub pages (HF-13), which also helps Core Web Vitals.

---

## 4. Research updates, driven by the weekly routine

**Every week (the Sunday research run, which publishes nothing):**
1. **Run the saved search** through official APIs whose hosts are already in `ops/cloud/allowed-domains.txt`:
   - PubMed E-utilities `esearch` with `reldate=7`.
   - Europe PMC, which also catches preprints; label them as preprints.
   - Crossref, to catch corrections and retractions for every DOI in `_data/library.json`.
   - The query:
     `("virtual autism" OR "autisme virtuel" OR "virtueller Autismus" OR "sanal otizm" OR "autismo virtual" OR "autismul virtual" OR "early and excessive screen exposure") OR (("screen time" OR "screen exposure" OR "screen use" OR television OR "digital media") AND (autism OR autistic OR "autism spectrum") AND (infant OR toddler OR preschool OR "early childhood"))`
2. **Log every hit** in `ops/RESEARCH-LOG.md` as NEW, INCLUDED or EXCLUDED, with the reason. Include a study **whatever it finds**. Exclude it only if it is off-topic, not scholarly or retracted.
3. **For each included study:** read the abstract at minimum. Draft its study page with `publish: false`, a stance, an evidence label and a "What it does NOT show" section. Add its row to `library.json`.
4. **Add the hub metrics lines** to `ops/RUNLOG.md` (§9).

**First Sunday of each month:** bundle the drafts into **one line in `ops/APPROVALS.md`**, for the paid research checker and the founder's go: "Publish N study pages and the library update (~X min)."

**When the pillar changes:** only when the weight of evidence moves. That means:
- a new meta-analysis;
- a randomized trial;
- a sibling, genetic or other causal-design study;
- a change in a guideline (the AAP 2026 statement must be read before FAQ questions 18–19 are published);
- a retraction of anything the short version relies on.

Each such change needs a draft, a "What changed" note and the full review (a new sensitivity read if the framing changes). Translations are marked "update pending" within 2 weekly cycles (translation-plan rule 8).

**Every 6 months (January and July):** re-review the pillar, FAQ, glossary, early-intervention page (re-checking every program fact) and the pediatrician questions, and re-date them. These fixed months stay away from April's autism observances. SEO-PLAN §8's March review of A8 moves to this schedule.

**A cited paper is retracted or corrected:** flag its page within 7 days, and put the fix first in that week's approvals.

**The topic is suddenly in the news:** no reactive posts or pages. Check that the pillar still answers the question. A new study behind the news goes through the normal cycle. Anything viral follows COMPLIANCE-GATE line 14.

**Launch order: verify these first.** Step zero is a Crossref DOI lookup for every 2025–2026 source on the six review pages (the team has not yet confirmed that several of them exist): a DOI that does not resolve, or resolves to a different paper, means the claim is deleted, not kept. Then these, the sources the short version depends on: Zamfir 2018, Harlé 2019, Heffler 2020, Kushima 2022, Melchior 2022, Ophir 2023, Takahashi N 2023, Lin 2025, Cai 2025, Ozyazici 2026, Krijnen 2026, the autismus Deutschland statement, Detroja and Bhatia 2024, WHO 2019, AAP 2016 and AAP 2026. If one cannot be confirmed, **rewrite the short version without it rather than wait.** Verify the rest of the library after that, critical and null studies first.

---

## 5. Educational carousels (Pinterest and Instagram)

**Series** (formats already defined in CAMPAIGN-BIBLE §4; none of them is a product):
- "Not a diagnosis": the term, explained in five frames.
- "Link or cause?": the difference between an association and a cause, with a neutral everyday example.
- Study Snapshots: the four boxes, one study per carousel. The three autism-term studies wait for the paid sensitivity read.
- "Worried? Three steps".
- "Words researchers use".
- "Solid, Shaky, or Not Shown": the autism-term deck, with no score.

**Format:**
- Instagram: 1080×1350, 5–8 frames. Pinterest: 1000×1500.
- **Frame 1 states the fact.** Never open with a fear question such as "Are screens giving your child autism?"
- **The last frame** carries the short safe sentence, "playbeforepixels.com/research" and "Not medical advice". Because comments are off, the caption also says how to send a correction ("Spotted a mistake? Tell us through the contact form at playbeforepixels.com/research"), so critics, including autistic readers, have a way to reply.

**Rules (checked by HF-14):**
- **Links go only to a hub page.**
  - On Pinterest, that is the pin's destination URL.
  - On Instagram, type the plain URL in the caption. **Never say "link in bio"**, because the bio page lists products, and never add Instagram product tags.
  - UTM tags are fine (`utm_source=pinterest|instagram&utm_medium=social&utm_campaign=hub`).
- **Nothing commercial or targeted:**
  - No product, price, mascot, shop call to action or discount. The brand mark stays small, in a corner.
  - **No hashtag containing "autism" in any language.** No tagging of people or organizations.
  - No posting in groups or communities.
  - **Never boosted or promoted. Comments off.** Replies happen only as in `virtual-autism-outreach.md` §4, with approval.
- **On Pinterest,** hub pins live on one board, "Research in plain words". The board's name and description don't mention autism. Only term-explainer pins may use the term, and their description opens with the short safe sentence.
- **Visuals:** calm brand illustrations only. Never:
  - puzzle pieces, infinity symbols, sirens or alarm-red;
  - crying children, crossed-out screens or brain images;
  - real devices, or characters that look like a real show's.
- **Accessibility:** alt text on every frame, text at least 28 px on a 1080-px frame, ink on light grounds (BRAND-RESPECT-PLAN §6), and the caption repeats the key text.
- **Cadence:** **at most one hub carousel a week** across both platforms, through the weekly approval queue, at the same pace all year. **Nothing is ever timed to an awareness month.** A carousel may only point to a page that is already published.

**Resolving a conflict:** BRAND's "Everything promotes the brand" asks every post to link to a product or the free printable. For hub posts, the more specific "Autism searches" rule wins: they link to the hub page, which carries the one printable link.

---

## 6. A passive facts page for press and researchers (`/research/facts/`), with no pitching

1. **Who publishes this:** Play Before Pixels, a trade name of AlphaPlay LLC. We sell play materials; this conflict of interest is stated here. We are not clinicians. We use AI assistance and a person checks everything. The hub carries no sponsorship, ads or affiliate links.
2. **A definition you may quote:** the full safe sentence. Attribution: "Play Before Pixels Research Notes, 'What is virtual autism?', last reviewed {date}, {URL}."
3. **Ten key facts,** one sentence each, with an evidence label and a link to the study page. **Verified sources only.**
4. **The evidence table to download,** as CSV and JSON built from `_data/library.json`. Columns: study, year, design, stance, one-line finding, citation, DOI, what we read, last reviewed. The licence is a founder decision (§12). Marked up with Dataset schema so Google Dataset Search can find it.
5. **How we choose and weigh studies** (link to the editorial policy), and the corrections log.
6. **What we don't do:** interviews, calls or podcasts; comments on any child; comments on shows, creators, companies, clinicians or other publishers; embargoes; paid placements. Questions come in through the contact form's "Press or research" category. They are answered in the weekly batch, only from facts already on this page, and only after the founder approves (COMPLIANCE-GATE line 14).
7. **For researchers:** tell us if we described your study wrongly, or if we missed one, including null results. We fix it and log the change.

**No outbound contact on this topic.** No press releases, no replies to journalist-request services (HARO, Qwoted or Featured), and no emails to journalists or researchers (`virtual-autism-outreach.md` sections A and D). The page is indexed so that people who look for it can find it.

---

## 7. Accessibility and plain-language standard (hub)

- **Visual design:**
  - **WCAG 2.2 AA.** Body text in ink on white or wash, at 4.5:1 or better. 18 px body text on phones. Lines of 60–75 characters.
  - **Dark mode** through `prefers-color-scheme`, for reading late at night.
  - No meaning carried by colour alone. Evidence labels are words.
  - No text only in images.
- **Nothing gets in the way:** no pop-ups, banners over content, sticky sign-up bars, autoplay, exit-intent prompts or cookie walls. A cookie wall isn't needed with cookieless analytics; confirm this in the privacy policy.
- **Plain language:**
  - The answer comes first.
  - Sentences average 20 words or fewer. Paragraphs have at most 4 sentences.
  - The top box, FAQ answers and "What parents can do" are written at a US grade 6–8 reading level. Study sections may run higher, but every term is linked to the glossary.
  - Reading level is checked at each review.
- **Structure:** tables have header rows, links describe where they go, and a skip link jumps to "The short version".
- **PDFs** (the pediatrician questions and the printable): tagged, in Letter and A4, with a large-print edition at 18 pt and an HTML twin.
- **Respectful language,** as in the editorial policy:
  - Identity-first by default.
  - AAC is communication, not screen time.
  - No fear or blame words (HF-10).
- **Languages:**
  - Foreign terms carry `lang` attributes.
  - Offer a "¿Prefieres leer en español?" link **only once the reviewed Spanish page exists**. Never link to a machine translation or to a page that isn't live, and never redirect by browser language.

---

## 8. Translations (human-reviewed only)

- **Rules:** `content/research-hub/translation-plan.md` is binding.
  - Nothing is translated until the English page has passed review.
  - Each page needs a native human translator, a second bilingual reviewer, and a paid autistic sensitivity reader in that language.
  - The locked sentences are translated once and then reused word for word.
  - Each country's early-support section is rewritten from that country's official sources. US law is never copied.
- **Order:**
  1. Spanish (US families can use IDEA Part C; the Spanish safe sentence in CAMPAIGN-BIBLE §4 is still marked VERIFY).
  2. French.
  3. Portuguese (Brazil).
  4. German.
  5. Romanian.
  6. **Turkish is a candidate**, because the research lane found a Turkish review that uses "sanal otizm".
  - Watch-list languages are added only once they show demand (§1).
- **Each language launches as a set:** the pillar, the local early-support page and the pediatrician questions, then the FAQ. **Never publish a translated pillar without a local "where to get help" page.**
- **Working titles** (the translator writes the final wording; not reviewed):
  - Spanish: ¿Qué es el "autismo virtual"? Lo que dice la investigación
  - French: « Autisme virtuel » : ce que dit la recherche
  - Portuguese: O que é "autismo virtual"? O que diz a pesquisa
  - German: „Virtueller Autismus“: Was die Forschung sagt
  - Romanian: Ce este „autismul virtual”? Ce spune cercetarea
  - Turkish: "Sanal otizm" nedir? Araştırmalar ne diyor?
- **A review record on every translated page.** Its front matter carries `lang` and a `translation_review` record: translator, bilingual reviewer, sensitivity reader, the English version and date it came from, and the review date. A missing record, or a record showing that machine translation was published, is a FAIL (HF-16).
- **The firewall is identical in every language.**

---

## 9. Measurement

| Metric | Why | Source | How often |
|---|---|---|---|
| Search impressions, clicks, position and CTR for every term in §1, by country and language | Are we the answer? | Search Console API (`searchanalytics.query`, broken down by query, page and country); Bing Webmaster Tools | Weekly |
| **Next-step rate:** clicks from the pillar or FAQ to the pediatrician questions or the early-intervention page, per 100 visits | Did we help? This is the headline metric | Cookieless analytics events. Fallback: views of those pages that came from the pillar | Weekly |
| Time on page for the pillar and FAQ | Did they read? Read it together with the next-step rate: a 30-second visit that goes on to the early-intervention page is a success | Cookieless analytics [UNVERIFIED which tools report this] | Weekly |
| Pediatrician-questions downloads | Did they take something to the doctor? | Per-path request count from Cloudflare analytics [UNVERIFIED plan support]. Fallback: a first-party counter that stores a daily total only | Weekly |
| Play-printable sign-ups from the hub form | Did the one invitation work, without pressure? | Email platform count for the `hub-play` form (total only) | Weekly |
| Corrections received and fixed, and median days to fix | Are we trustworthy? | Corrections log | Monthly |
| Freshness: share of hub pages reviewed in the last 183 days | Are we current? | `check_hub_firewall.py` (HF-08) | Weekly |
| Firewall FAILs on published pages | Are we protected? The target is 0 | `check_hub_firewall.py` | Every run |
| Links and citations earned | Are others citing us? | Search Console Links report | Monthly |

- **Never measured or optimized for the hub:** revenue, product clicks, order value, or anything that links a hub reader to a purchase. **No conversion testing on hub pages.** Title and meta rewrites for click-through rate are allowed (SEO-PLAN §7). The locked sentences never change.
- **Privacy:** only cookieless, aggregate analytics on hub pages. No user-level data. Analytics are never joined to email or customer records.
- **Reporting:** three lines go into the weekly scorecard in `ops/RUNLOG.md`: impressions for the term group, the next-step rate, and hub sign-ups. **They stay out of Arielle's money-only report.**
- **Goal, not a forecast:** a top-3 position for "virtual autism" and "what is virtual autism" in the US, UK, Canada and Australia within 12 months of publishing. We measure it; we never game it.
- **Network:** the Search Console API needs `searchconsole.googleapis.com` and `oauth2.googleapis.com` added to `ops/cloud/allowed-domains.txt`.

---

## 10. The firewall between the hub and the shop (automatic checks)

- **Scope:** every page under the hub URL prefixes (`/research/`, and in future `/es/investigacion/`, `/fr/recherche/`, `/pt/pesquisa/`, `/de/forschung/`, `/ro/cercetare/`, `/tr/arastirma/`), the printable twin page, the hub PDF edition and its delivery email, and every hub social post.
- **Checker:** `python3 ops/TESTS/check_hub_firewall.py` is read-only.
  - It scans `content/research-hub/`, every `seo/articles/` page whose URL is in the hub, and `content/queue/`.
  - Add `--site <build folder>` once the site is built. That also checks trackers, JSON-LD and the reverse direction.
  - The daily studio runs it at ROUTINE §4 for any hub or social change, and runs `--strict` before any hub publish.
  - Exit 1 means a FAIL on a page that is being published, and that page does not go out.

| ID | Rule | Checked by | Level |
|---|---|---|---|
| HF-01 | The hub is judged only by the §9 mission metrics. Nothing on the hub is A/B-tested for sign-ups or sales. | Manual (weekly scorecard) | — |
| HF-02 | Internal links go only to hub pages, the policy pages (`/editorial-policy/`, `/disclaimer/`, `/privacy/`, `/terms/`, `/accessibility/`, `/contact/`, `/about/`) and `/research/play-printable/`. No `/shop/`, `/bonus/`, `/free/` or `/learn/` links, and no "Shop" link in the hub template. | Script (markdown and built HTML) | FAIL |
| HF-03 | External links point to sources, never to shops: no marketplace, store or print-on-demand domain, no affiliate parameter, and no link to virtualautism.org or .com. A social-media link raises a WARN. | Script | FAIL |
| HF-04 | At most one printable link per page, and only on the pillar, the FAQ or an explainer article (never on study, library, glossary, early-intervention, pediatrician or facts pages). The sentence around it has no "autism", "help", "support", "therapy", "treat", "improve", "prevent", "delay" or "symptom" wording. | Script | FAIL |
| HF-05 | No prices, currency amounts, "buy now", "shop now", "add to cart", discounts, coupons, "% off" or sales. No product names or slugs (read from `products/*/listing.json`). | Script | FAIL |
| HF-06 | Required blocks: the safe sentence ("not a medical diagnosis") on the pillar, FAQ, glossary and every term or screens-and-autism study page; "not medical advice" on the pillar, FAQ, early-intervention and printable pages; a pediatrician or doctor next step wherever autism is mentioned; the "Worried?" closing line (WARN); no more than 150 words before the pillar's first section (WARN). | Script | FAIL / WARN |
| HF-07 | Front matter is complete. Meta description is 155 characters or fewer. A title over 60 characters raises a WARN and needs a separate `seo_title`. | Script | FAIL / WARN |
| HF-08 | Freshness: a page last reviewed more than 183 days ago raises a WARN and goes into the review queue. More than 365 days is a FAIL. | Script | WARN / FAIL |
| HF-09 | A page with `publish: true` must have no [VERIFY] or UNVERIFIED marks and must not rest on `what_we_read: secondary-only`. | Script | FAIL |
| HF-10 | No fear or blame words (epidemic, fighting autism, suffers from, cure, recover from autism, toxic, addiction, zombie, rewiring, "before it's too late") outside quotations and citations. Causal wording such as "screens cause autism" without a negation goes to a human reviewer. | Script | FAIL / WARN |
| HF-11 | No excluded organizations or local angle (Montgomery County, MCPS, MCEA, MSEA, NEA, Infants and Toddlers Program, and their domains). No founder-story wording. Early-support links go to national directories only. | Script (words and domains); manual (national-only) | FAIL |
| HF-12 | Hub JSON-LD never uses Product, Offer, AggregateRating, Review or any Medical* or Physician type. `reviewedBy` appears only with a signed reviewer record. | Script (`--site`) | FAIL |
| HF-13 | No ad or tracking scripts on hub pages (Meta, Pinterest, TikTok, Google Ads or GA, LinkedIn, Bing UET, Hotjar, Clarity). Only the approved cookieless analytics. No ad audience is ever built from hub visitors. | Script (`--site`) | FAIL |
| HF-14 | Hub social posts: links go only to hub pages; no autism hashtag in any language; no product, price or discount; the short safe sentence is included; comments are off; never boosted. | Script (`content/queue/`) | FAIL |
| HF-15 | The reverse direction: no product, listing, shop page or non-hub post mentions autism or links to `/research/virtual-autism/*`. Listings are already covered by `check_listings.py` (`autism_terms`). | Script (`--site`, queue) | FAIL |
| HF-16 | Translated hub pages carry a `translation_review` record, and machine translation is never the published text. | Script | FAIL |
| HF-17 | Email and ads: no segment, tag, automation or ad audience references the hub form or hub pages, or uses autism words. Hub sign-ups get the general newsletter. Nothing is ever paid for, boosted or bid on for any hub URL or any §1 term. | Manual weekly check until the email and ad APIs are connected | FAIL |
| HF-18 | No show, channel, creator, company or EdTech name anywhere in the hub (COMPLIANCE-GATE line 4). | Manual at review | FAIL |

**Proposed COMPLIANCE-GATE line 23:** "Research hub firewall: `python3 ops/TESTS/check_hub_firewall.py --strict` passes for every hub page, printable twin and hub social post being published, and the manual rules HF-01, HF-11 (national-only links), HF-17 and HF-18 in marketing/AWARENESS-ENGINE.md §10 are ticked."

**First run (September 28, 2026):** 86 hub sources checked. There are 8 FAILs and 4 WARNs. None is blocking, because nothing is published. Three kinds of fix are needed:
- **Printable links:** 4 pages link to `/free/five-5-minute-plays/` instead of the twin: `index.md`, `faq.md`, and `seo/articles/08` and `09`.
- **Links out of the hub:** A9 links to `/learn/`.
- **Individual pages:**
  - The Dunckley study page is missing the safe sentence.
  - The Zhang 2023 meta description is 161 characters.
  - Sadeghi 2023 has a 66-character title.
  - Article 08 uses "cure".
  - The glossary has no closing line.
  - The pillar is too long before its first section.

---

## 11. Fixes needed in existing files (found while writing this)

1. **Printable links** in `content/research-hub/index.md` and `faq.md`, and in `seo/articles/08` and `09`, should point to `/research/play-printable/`. Build that page and the `channel=hub` PDF edition. **Done September 28, 2026** for the hub pages: the pillar's link was removed (§2 row 7) and the FAQ's now points to the twin (the articles were done by the autism content audit). The twin page and the hub PDF edition are still to build.
2. **`seo/articles/08`** duplicates the pillar. Retire it. SEO-PLAN row 40 (title "A Careful Look at the Term") should follow the hub's title.
3. **The hub has three names:** "The Virtual Autism Project" (CAMPAIGN-BIBLE §4 and the Study Snapshots label), "Research Library" (SEO-PLAN) and "Research Notes" (SOCIAL-HANDLES). DECISION-MEMO says rename. Use one name (§12). **Resolved September 28, 2026:** the founder chose "Play Before Pixels Research Notes" (`legal/ENTITY.md`); marketing/, seo/, business/, legal/ and index.html were aligned by the autism content audit (`ops/TESTS/autism-content-audit.md`). site-concepts/ is still open (fix-later list there). The sub-page `/research/library/` keeps its descriptive title.
4. **`check_listings.py` `AUTISM_RX`** misses Turkish "otizm" and terms in other scripts (autyzm, аутизм, التوحد, 自闭症, 자폐). Add them before any non-English listing goes live. **Done September 28, 2026** in `check_listings.py` and `check_hub_firewall.py` (autism content audit).
5. **CAMPAIGN-BIBLE §4, topic 10,** links to "state early intervention program[s]". Change this to national directories only: a state directory can route readers to the excluded county program.
6. **Ad pixels.** `legal/PRIVACY-POLICY.md` promises "no retargeting pixels", while MARKETING-PLAYBOOK plans Meta and Pinterest ads for later. If pixels are ever added, they are kept off hub pages (HF-13) and the policy is updated first.
7. **Review month.** SEO-PLAN §8's March review of A8 moves to January and July (§4).
8. **The printable's "More from" page.** The hub PDF edition drops the "More from Play Before Pixels" page that BRAND requires in every product. Record this in BRAND.md as an exception approved by the founder.

---

## 12. Founder decisions

1. **The hub's name.** **Decided:** "Play Before Pixels Research Notes" at `/research/` (`legal/ENTITY.md`, founder's choice). Drop "The Virtual Autism Project" everywhere.
2. **A budget for paid reviewers:** a research checker for source checks, an autistic sensitivity reader, and a clinician for "What parents can do". Estimates are in BRAND-RESPECT-PLAN §3–4. Without these reviewers, no hub page can be published.
3. **Analytics tool.** Choose between:
   - a cookieless tool that reports time on page and downloads (for example Plausible, from about $9 a month, UNVERIFIED);
   - free Cloudflare Web Analytics, which is mainly page views (UNVERIFIED).
4. **AI crawlers on `/research/`.** Allowing answer-engine crawlers is recommended, so that AI answers quote the safe sentence and cite us. Crawlers that collect training data are a separate choice. Crawler names are UNVERIFIED; confirm them on each company's page.
5. **Licence for the evidence table and glossary.** CC BY 4.0 is recommended, so others can reuse them with credit.
6. **Languages.** Confirm the order in §8 and whether to add Turkish.
7. **The tighter rule 3** (BRAND-RESPECT-PLAN §4, "explain it once"). This plan already fits it: only the pillar uses the term in its title.
8. **Question for counsel:** could browsing hub pages count as "consumer health data" under state laws such as Washington's My Health My Data Act (UNVERIFIED)? HF-13 is designed so the answer is "we collect none".
