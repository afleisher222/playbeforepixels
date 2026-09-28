# SEO plan: Play Before Pixels

Prepared September 28, 2026 for AlphaPlay LLC, doing business as Play Before Pixels. The domain is assumed to be `playbeforepixels.com`, which is not yet registered (see `legal/domain-portfolio.md`). The site is a static multi-page build on Cloudflare Pages, with a hosted checkout (Shopify or a merchant of record) and marketplace links from `commerce/links.js`.

Binding rules: `brand/BRAND.md` (hard rules, autism-search rules, faceless, self-running, calm website), `legal/ENTITY.md` (name and address) and the employment-counsel gate in `marketing/MARKETING-PLAYBOOK.md`.

---

## 0. Read first: what this plan does and does not rest on

1. **No keyword or SERP data was verified for this plan.** The workflow passed an empty `VERIFIED` block. Web search had hit its session limit, and the proxy blocked PubMed, CDC and the search-result pages. So **every keyword target below is a hypothesis.** It comes from the product line, from the Spanish keyword list in `legal/international-plan.md` §4, and from the category signals in `marketing/DEMAND-CHECK.md`. Nothing here is a measured volume. The column that would normally show volume says `UNVERIFIED`. The fix is in §7: confirm demand from Search Console impressions after 6–8 weeks, then re-rank.
2. **Research facts come only from the 10 allowed citations** in `brand/BRAND.md` rule 5. No new source was added, because none could be checked against its primary text this session. Two non-research facts in the articles, the US early-intervention program and the location of the AAP family media plan tool, are listed under `verify_before_publish` in each article's front matter. The publish gate (§3.9) blocks those articles until a person opens the official page and ticks the item.
3. **Changes from the computed brief, made to follow the binding repo rules:**
   - **Coaching is left out.** `brand/BRAND.md` says "No coaching and no live services of any kind", so the site has no coaching page, booking link or Service schema. The `booking` field in `commerce/links.js` should stay empty.
   - **The Rockville Pike address is not used.** `legal/ENTITY.md` (updated September 28, 2026) says the founder no longer uses that mailbox. Every template uses `[BUSINESS MAILING ADDRESS]`, which is the USPS PO Box once it is rented.
   - **School- and group-facing pages and articles carry `publish_gate: employment-counsel`.** They stay built but unpublished until counsel answers `legal/FOR-EMPLOYMENT-COUNSEL.md`. That covers `/schools/*`, `/groups/*` and the brain-breaks article. The teacher section of the paper-vs-screens article is gated too, unless it is published parent-only.
   - **Research hub name.** `marketing/virtual-autism-outreach.md` recommends renaming "The Virtual Autism Project" to a name without "autism", for example "Play Before Pixels Research Library". This plan uses the neutral name and the URL `/research/`. The term "virtual autism" appears only on the one hub page that explains it, which is what BRAND rule 3 requires.

---

## 1. Keyword clusters (hypotheses; UNVERIFIED demand)

| Cluster | Head term (en) | Close variants to test | Spanish twin | Page that owns it | Demand |
|---|---|---|---|---|---|
| C1 Screen time by age | screen time by age | how much screen time for a 2 year old; screen time for toddlers; screen time guidelines under 5 | tiempo de pantalla por edad | /learn/screen-time-by-age/ | UNVERIFIED (est. high) |
| C2 Screen-free activities | screen-free activities by age | screen free activities for kids; activities for 5 year olds without screens | actividades sin pantallas para niños | /learn/screen-free-activities-by-age/ | UNVERIFIED (est. high) |
| C3 Instead of screens (toddlers) | what to do instead of screens toddler | toddler activities at home no tv; how to entertain a toddler without screens | qué hacer en vez de pantallas; juegos sin pantallas | /learn/what-to-do-instead-of-screens-toddlers/ | UNVERIFIED (est. medium–high) |
| C4 Family media plan | family media plan | family screen time rules; family screen time agreement template | plan familiar de uso de pantallas | /learn/family-media-plan/ | UNVERIFIED (est. medium) |
| C5 Paper vs screens | reading on paper vs screen | print vs digital reading comprehension; are paper books better for kids | leer en papel o en pantalla | /learn/reading-on-paper-vs-screens/ | UNVERIFIED (est. medium) |
| C6 Classroom brain breaks | screen-free brain breaks | brain breaks without video; movement breaks for classroom | pausas activas en el aula | /learn/screen-free-brain-breaks/ | UNVERIFIED (est. medium; seasonal Aug–Sep, Jan) |
| C7 Talk-along reading | how to read to a toddler | reading to babies tips; interactive reading toddlers | cómo leerle a un bebé | /learn/reading-with-babies-and-toddlers/ | UNVERIFIED (est. medium) |
| C8 Virtual autism (hub only) | virtual autism | what is virtual autism; screen time and autism | autismo virtual (calendar, month 9) | /research/virtual-autism/ | UNVERIFIED. **Hub only: no product, ad, listing or email ever targets it** (BRAND "Autism searches") |
| C9 Screens and talk | screen time and language development | does screen time affect toddler talking; background tv toddlers | pantallas y lenguaje en niños pequeños | /research/screen-time-and-toddler-talk/ | UNVERIFIED (est. medium) |
| C10 Turning screens off | toddler meltdown when screen turned off | how to turn off tablet without tantrum; screen time transitions | berrinche al quitar la tablet | /learn/turning-off-screens-without-meltdowns/ | UNVERIFIED (est. medium–high) |
| C11 Product and brand | talk-along board book; screen reset printable; screen-free classroom pack | play before pixels | — | product pages | Branded: grows with launch |

**Never target:** autism or any diagnosis on any product, listing, ad, hashtag or email, in any language; "speech therapy", "SLP", "therapy", "delay" as product keywords; names of apps, device brands, schools, districts, EdTech products or other companies.

---

## 2. Site architecture

**Top navigation (5 items, BRAND "calm website"):** Shop · By age · Learn · Research · Schools & groups. About, Contact, FAQ, Free printables and policies go in the footer. The one primary button in the header is **Free play printable**.

**URL rules:** lowercase, hyphens, trailing slash, no dates in URLs, English at the root, Spanish under `/es/` with translated slugs, and one canonical URL per page. Lengths below were checked by script: titles ≤60 characters, meta descriptions ≤155.

Legend for the gate column: **G** = held by the employment-counsel gate; **N** = `noindex`.

### 2.1 Core, stage and shop pages

| # | URL | Cluster | Title | Meta description | H1 | Internal links out | Gate |
|---|---|---|---|---|---|---|---|
| 1 | / | Brand | Play Before Pixels: Talk, Play and Read Before Screens | Talk-along books, printables and play guides for babies to age 12, sorted by age. Fewer screens, more back-and-forth. Free play printable inside. | Talk, touch and play come first. | /ages/, /shop/, /free/five-5-minute-plays/, /learn/, /research/ | |
| 2 | /ages/ | Stage hub | Play Ideas, Books and Printables by Age, 0 to 12 | Find play ideas, books and printables for your child's stage, from newborn to age 12. Every item explains the why in plain words. | What fits your child right now? | the 4 stage pages, /learn/screen-free-activities-by-age/ | |
| 3 | /ages/babies/ | C7, C3 | Baby Play and Talk Ideas Without Screens (0–12 Months) | Simple ways to talk, sing and play with your baby in the first year, plus the board book and printables made for this stage. | Babies: 0 to 12 months | /shop/up-go-more/, /learn/reading-with-babies-and-toddlers/, /learn/screen-time-by-age/ | |
| 4 | /ages/toddlers/ | C3, C10 | Toddler Play Without Screens (1–2 Years) | Easy, safe play ideas for 1- and 2-year-olds, what the guidelines say about screens, and the books and cards built for this age. | Toddlers: 1 to 2 years | /learn/what-to-do-instead-of-screens-toddlers/, /shop/screen-reset-pack-0-5/, /shop/up-go-more/ | |
| 5 | /ages/preschool/ | C2, C1 | Preschool Play and Talk Ideas for Ages 3 to 5 | Pretend play, picture books and simple routines for 3- to 5-year-olds, with a free printable of five 5-minute plays. | Preschoolers: 3 to 5 years | /shop/laps-not-apps/, /shop/the-day-the-tablet-slept/, /shop/100-plays-before-pixels/ | |
| 6 | /ages/school-age/ | C4, C10 | Screen-Smart Family Ideas for Ages 5 to 12 | Family media plans, screen-free activities and calm ways to switch screens off for school-age kids, with a free family agreement. | School-age: 5 to 12 years | /learn/family-media-plan/, /shop/screen-smart-family-plan/, /shop/30-day-screen-reset/ | |
| 7 | /shop/ | C11 | Shop Talk-Along Books, Printables and Play Cards | Board books, picture books, printables, card decks and a written course for families, sorted by age. Instant downloads; books printed to order. | Shop | 5 category pages, /ages/ | |
| 8 | /shop/books/ | C11 | Talk-Along Board Books and Picture Books | Board books and picture books with a grown-up tip on every page, made for reading together and talking back and forth. | Books to read together | book product pages, /learn/reading-with-babies-and-toddlers/ | |
| 9 | /shop/printables/ | C11 | Screen-Free Printables for Families | Printable screen reset packs, family plans and play cards in US Letter and A4. Download instantly and print at home. | Printables | printable product pages, /free/ | |
| 10 | /shop/cards/ | C11 | Play and Talk Card Decks for Kids | Card decks full of quick play and talk ideas, printed to order or downloaded to print at home. | Card decks | card product pages | |
| 11 | /shop/merch/ | C11 | Play Before Pixels Tees, Totes and Gifts | Printed-to-order tees, totes and gifts with a play-first message. Made when you order, shipped by our print partner. | Tees, totes and gifts | /shop/bundles/ | |
| 12 | /shop/bundles/ | C11 | Bundles: Books, Cards and Printables Together | Save on sets built for each age: a book, a card deck and a printable that work together. | Bundles | stage pages, product pages | |
| 13 | /shop/up-go-more/ | C7, C11 | Up! Go! More! Talk-Along Board Book (Ages 0–3) | A sturdy first-words board book with one clear word per page and a grown-up talk tip on every spread. For ages 0 to 3. | Up! Go! More! | /learn/reading-with-babies-and-toddlers/, /ages/babies/, next products | |
| 14 | /shop/laps-not-apps/ | C5, C11 | Laps Not Apps: A Read-Together Picture Book | A warm picture book about the best seat in the house: a grown-up's lap. Made for reading aloud with ages 2 to 6. | Laps Not Apps | /learn/reading-on-paper-vs-screens/, /ages/preschool/ | |
| 15 | /shop/more-talk-less-tap/ | C9, C11 | More Talk, Less Tap: Picture Book for Ages 3–7 | A picture book that turns everyday moments into conversations, with talk prompts for grown-ups. For ages 3 to 7. | More Talk, Less Tap | /research/screen-time-and-toddler-talk/, /ages/preschool/ | |
| 16 | /shop/the-day-the-tablet-slept/ | C10, C11 | The Day the Tablet Slept: Picture Book (Ages 3–7) | When the tablet takes a nap, a family finds a whole day of play. A gentle picture book for ages 3 to 7. | The Day the Tablet Slept | /learn/turning-off-screens-without-meltdowns/ | |
| 17 | /shop/100-plays-before-pixels/ | C2, C3 | 100 Plays Before Pixels: Screen-Free Play Guide | 100 screen-free play ideas sorted by age, each with a talk tip and a safety note. In print and as a printable. | 100 Plays Before Pixels | /learn/screen-free-activities-by-age/, /learn/what-to-do-instead-of-screens-toddlers/ | |
| 18 | /shop/screen-reset-pack-0-5/ | C1, C3 | Screen Reset Pack for Ages 0–5 (Printable) | A printable kit for families of little ones: play-first routine charts, a 30-day tracker and simple play swaps. US Letter and A4. | Screen Reset Pack (0–5) | /learn/screen-time-by-age/, /learn/what-to-do-instead-of-screens-toddlers/ | |
| 19 | /shop/screen-smart-family-plan/ | C4 | Screen-Smart Family Plan for Ages 5–12 (Printable) | An editable family media plan, screen agreement, rules poster and tracker for families with kids aged 5 to 12. | Screen-Smart Family Plan (5–12) | /learn/family-media-plan/, /shop/30-day-screen-reset/ | |
| 20 | /shop/im-bored-play-cards/ | C2 | "I'm Bored" Play Cards: Screen-Free Ideas to Print | Printable play cards for the moment kids say they're bored. Pick a card and play, no screen needed. US Letter and A4. | "I'm Bored" Play Cards | /learn/screen-free-activities-by-age/ | |
| 21 | /shop/play-and-talk-cards/ | C7, C2 | Play and Talk Card Deck for Families | A printed deck of quick games with a talk prompt on every card. Great for waiting rooms, car rides and after dinner. | Play and Talk Cards | /learn/what-to-do-instead-of-screens-toddlers/ | |
| 22 | /shop/visual-routine-cards/ | C10 | Visual Routine Cards for Mornings and Bedtime | Picture cards and charts that help little ones see what comes next, with play and read-together cards built in. | Visual Routine Cards | /learn/turning-off-screens-without-meltdowns/ | |
| 23 | /shop/30-day-screen-reset/ | C4, C10 | 30-Day Screen Reset: A Written Course for Families | A self-paced written course: one short lesson a day for 30 days to rebuild family routines around play, talk and paper. | The 30-Day Screen Reset | /learn/family-media-plan/, /learn/turning-off-screens-without-meltdowns/ | |

### 2.2 Schools and groups (all held by the counsel gate)

| # | URL | Cluster | Title | Meta description | H1 | Internal links out | Gate |
|---|---|---|---|---|---|---|---|
| 24 | /schools/ | C6, C5 | Screen-Free Classroom Resources for PreK–5 | Printable classroom packs, brain breaks and paper-first reading ideas for PreK–5, with site licenses and purchase orders. | For classrooms | /schools/classroom-pack/, /learn/screen-free-brain-breaks/ | G |
| 25 | /schools/classroom-pack/ | C6 | PreK–5 Screen-Free Classroom Pack + Site License | Brain breaks, talk cards and paper-first activities for PreK–5 classrooms. Single-teacher and whole-school licenses. | PreK–5 Screen-Free Classroom Pack | /schools/site-licenses/, /schools/quote/ | G |
| 26 | /schools/site-licenses/ | C11 | Site Licenses for Schools, Libraries and Centers | How our site licenses work: who may print, how many rooms, how long, and how to get a stamped license PDF by email. | Site licenses | /licenses/, /schools/quote/ | G |
| 27 | /schools/quote/ | C11 | Request a Written Quote or Pay by Purchase Order | Get a written quote, W-9 and invoice by email for classroom packs, site licenses and group kits. No calls needed. | Request a quote | /schools/site-licenses/, /contact/ | G |
| 28 | /groups/ | C11 | Family Night Kits for PTAs, Libraries and Groups | Host-it-yourself family night kits, research briefs and a fundraiser program for parent groups, libraries and centers. | For parent groups and libraries | 3 group pages | G |
| 29 | /groups/workshop-kits/ | C11 | Host-It-Yourself Family Workshop Kits | Slides, a word-for-word speaker script and handouts so your own member can host a family night about play, talk and screens. | Host-it-yourself workshop kits | /groups/research-briefs/, /schools/quote/ | G |
| 30 | /groups/research-briefs/ | C8, C9 | Research Briefs on Screens, Play and Reading | Short, sourced briefs on early screen use, play and reading on paper, written for parent groups and educators. | Research briefs | /research/, /editorial-policy/ | G |
| 31 | /groups/fundraiser/ | C11 | Screen-Free Fundraiser for PTAs and Parent Groups | A book and printable fundraiser your group runs itself, with a share of sales back to your group. Terms and set-up steps. | Fundraiser program | /groups/, /schools/quote/ | G |

### 2.3 Learn, research and free pages

| # | URL | Cluster | Title | Meta description | H1 | Internal links out | Gate |
|---|---|---|---|---|---|---|---|
| 32 | /learn/ | all | Play, Talk and Screen-Time Guides for Families | Plain-language guides on screen time by age, screen-free play, reading together and family media plans. Sourced and shame-free. | Learn | 4 category pages, newest articles | |
| 33 | /learn/screen-time/ | C1, C4, C10 | Screen Time Guides for Families | Guidelines by age, family media plans and calm ways to turn screens off, in plain words. | Screen time | C1, C4, C10 articles | |
| 34 | /learn/play/ | C2, C3 | Screen-Free Play Ideas by Age | Play ideas for babies to 12-year-olds that need little more than you, your voice and things you already own. | Play | C2, C3 articles | |
| 35 | /learn/reading/ | C5, C7 | Reading Together: Tips for Every Age | How to read with babies, toddlers and big kids, and what research says about paper and screens. | Reading together | C5, C7 articles | |
| 36 | /learn/classroom/ | C6 | Screen-Free Ideas for PreK–5 Classrooms | Brain breaks, talk routines and paper-first reading ideas for PreK–5 teachers. | For the classroom | C6 article, /schools/ | G |
| 37 | /research/ | C8, C9 | Research Library: Screens, Play and Early Talk | Plain summaries of peer-reviewed studies and official guidelines on young children, screens, talk and reading. Not medical advice. | Research library | /research/studies/, /research/virtual-autism/, /editorial-policy/ | |
| 38 | /research/studies/ | C8, C9 | Study Summaries: Screens and Young Children | One-page summaries of each study we cite: who took part, what was measured, what it found and what it cannot tell us. | Study summaries | 10 study pages | |
| 39 | /research/studies/{author-year}/ | C8, C9 | {Author} {Year}: {Plain-English finding} | Pattern: who, what was measured, main association, limits; ≤155 characters. | {Author} ({Year}): {short title} | /research/, related article | |
| 40 | /research/virtual-autism/ | C8 | What Is "Virtual Autism"? A Careful Look at the Term | "Virtual autism" is a term some clinicians use. It is not a diagnosis. What the research shows, what it doesn't, and who to talk to. | What is "virtual autism"? | /research/studies/, /free/five-5-minute-plays/ (play framing only) | |
| 41 | /research/screen-time-and-toddler-talk/ | C9 | Screen Time and Toddler Talk: What Studies Found | What large studies found about screen time and back-and-forth talk in the first years, what it doesn't prove, and easy ways to add talk. | Screen time and toddler talk | /learn/reading-with-babies-and-toddlers/, /free/five-5-minute-plays/ | |
| 42 | /free/ | lead | Free Play Printables for Families | Free printables: five 5-minute plays for little ones, a family screen agreement for ages 5–12 and a 7-day screen-free challenge. | Free printables | the 3 free pages | |
| 43 | /free/five-5-minute-plays/ | lead, C3 | Free Printable: Five 5-Minute Plays (Ages 0–5) | Five quick, screen-free games for babies to preschoolers, with a talk tip on each. Free download; we ask only your child's birth month. | Five 5-Minute Plays | /shop/screen-reset-pack-0-5/ | |
| 44 | /free/family-screen-agreement/ | lead, C4 | Free Family Screen Agreement Template (Ages 5–12) | A free printable screen agreement your family fills in together: when, where, what, and what happens when time is up. | Family Screen Agreement | /learn/family-media-plan/, /shop/screen-smart-family-plan/ | |
| 45 | /free/7-day-screen-free-challenge/ | lead, C10 | Free 7-Day Screen-Free Challenge for Families | Seven days, seven simple plays. A free printable challenge that fits real family life. | 7-Day Screen-Free Challenge | /shop/30-day-screen-reset/ | |
| 46 | /bonus/{product-slug}/ | lead | {Product} Bonus | Companion page reached by the QR code in each product. | {Product}: your bonus | the product's next_products | N |

The `/learn/` article rows are in §2.5.

### 2.4 Trust, policy and utility pages (these make the business look legitimate: build all of them before launch)

| # | URL | Title | Meta description | H1 | Gate |
|---|---|---|---|---|---|
| 47 | /about/ | About Play Before Pixels | Play Before Pixels makes books, printables and play guides for families and classrooms. A trade name of AlphaPlay LLC. | About us | |
| 48 | /editorial-policy/ | Editorial Policy: How We Source and Check Research | How we choose sources, describe studies, avoid medical claims, use tools, and correct mistakes. | Editorial policy | |
| 49 | /contact/ | Contact Play Before Pixels | Email us with order, license or research questions. We reply by email within 2 business days. | Contact us | |
| 50 | /faq/ | Questions About Orders, Downloads and Licenses | Answers about downloads, printing, shipping, returns, site licenses, purchase orders and our research. | Frequently asked questions | |
| 51 | /shipping-returns/ | Shipping, Returns and Refunds | Printed-to-order shipping times, 30-day returns on physical items, and how digital downloads and the course are handled. | Shipping, returns and refunds | |
| 52 | /privacy/ | Privacy Policy | How AlphaPlay LLC (Play Before Pixels) collects, uses and protects personal information. We never ask for a child's name. | Privacy policy | |
| 53 | /terms/ | Terms of Use | The terms for using the Play Before Pixels website, downloads and course. | Terms of use | |
| 54 | /disclaimer/ | Medical and Educational Disclaimer | Our content is general education about play, talk and screens. It is not medical, therapy or developmental advice. | Medical and educational disclaimer | |
| 55 | /accessibility/ | Accessibility Statement | Our accessibility goal, what we have tested, known limits, and how to ask for an accessible format. | Accessibility | |
| 56 | /disclosures/ | Affiliate and Endorsement Disclosures | When we earn from links, and how we handle reviews and gifts. We never pay for or filter reviews. | Disclosures | |
| 57 | /licenses/ | Digital Product and Site License Terms | What you may and may not do with our printables, classroom packs and site licenses. | License terms | |
| 58 | /thank-you/ | Thank you | — | Thank you | N |
| 59 | /404.html | Page not found | — | We can't find that page | N |

### 2.5 Articles (full text in `seo/articles/`)

| # | URL | Cluster | Title | Meta description | H1 | Related product | Gate |
|---|---|---|---|---|---|---|---|
| A1 | /learn/screen-time-by-age/ | C1 | Screen Time by Age (0–5): What the Guidelines Say | What WHO and the American Academy of Pediatrics recommend for screen time from birth to age 5, in one table, plus what to do instead. | Screen time by age, from birth to 5 | Screen Reset Pack (0–5) | |
| A2 | /learn/screen-free-activities-by-age/ | C2 | Screen-Free Activities by Age: Babies to 12 | Screen-free activities sorted by age, from newborns to 12-year-olds, with a talk tip and a safety note for each stage. | Screen-free activities for every age | 100 Plays Before Pixels | |
| A3 | /learn/what-to-do-instead-of-screens-toddlers/ | C3 | What to Do Instead of Screens: 25 Toddler Ideas | 25 easy things to do with a toddler instead of a screen, sorted by the moments screens usually fill: cooking, errands, waiting, winding down. | What to do instead of screens with a toddler | Play and Talk Cards | |
| A4 | /learn/family-media-plan/ | C4 | How to Make a Family Media Plan (Free Template) | A step-by-step guide to a family media plan for kids 5 to 12: when, where, what, and what happens when time's up. Free template. | How to make a family media plan that sticks | Screen-Smart Family Plan | |
| A5 | /learn/reading-on-paper-vs-screens/ | C5 | Reading on Paper vs Screens: What Research Shows | A large research review found an advantage for reading on paper, especially for informational text. What it means at home and in class. | Reading on paper vs screens: what the research shows | Laps Not Apps; Classroom Pack | teacher section G |
| A6 | /learn/screen-free-brain-breaks/ | C6 | 30 Screen-Free Brain Breaks for PreK–5 Classrooms | Thirty 1- to 3-minute brain breaks for PreK–5 that need no video, no device and no prep. Seated versions included. | Screen-free brain breaks for the classroom | PreK–5 Classroom Pack | G |
| A7 | /learn/reading-with-babies-and-toddlers/ | C7 | Talk-Along Reading: Tips for Babies and Toddlers | How to read with a baby or toddler so they get more turns to talk: pause, point, add a word, follow their lead. Tips by age. | Talk-along reading with babies and toddlers | Up! Go! More! | |
| A8 | /research/virtual-autism/ | C8 | What Is "Virtual Autism"? A Careful Look at the Term | "Virtual autism" is a term some clinicians use. It is not a diagnosis. What the research shows, what it doesn't, and who to talk to. | What is "virtual autism"? | none (free printable only, as play) | |
| A9 | /research/screen-time-and-toddler-talk/ | C9 | Screen Time and Toddler Talk: What Studies Found | What large studies found about screen time and back-and-forth talk in the first years, what it doesn't prove, and easy ways to add talk. | Screen time and toddler talk: what studies found | free printable only | |
| A10 | /learn/turning-off-screens-without-meltdowns/ | C10 | How to Turn Off Screens Without a Meltdown | Why switching off a screen is hard for kids, and 10 calm, tested-at-home steps for ages 2 to 12. With a free printable. | How to turn off screens without a meltdown | 30-Day Screen Reset; Visual Routine Cards | |
| A11 | /es/aprender/tiempo-de-pantalla-por-edad/ | C1 (es) | Tiempo de pantalla por edad (0 a 5 años): guía | Lo que recomiendan la OMS y la Academia Americana de Pediatría sobre pantallas de 0 a 5 años, en una tabla, y qué hacer en su lugar. | Tiempo de pantalla por edad, de 0 a 5 años | Screen Reset Pack (es, when ready) | |
| A12 | /es/aprender/que-hacer-en-vez-de-pantallas/ | C3 (es) | Qué hacer en vez de pantallas: 25 ideas para niños | 25 juegos sencillos sin pantallas para niños de 1 a 5 años, para los momentos del día en que más usamos el celular o la tablet. | Qué hacer en vez de pantallas con niños pequeños | Play and Talk Cards (es, when ready) | |

**hreflang pairs:** A1 ↔ A11 and A3 ↔ A12, each with `x-default` pointing to the English page. A11 and A12 are adaptations of A1 and A3 with the same facts and structure, so the pairing is valid. Spanish hub pages `/es/`, `/es/aprender/` and `/es/gratis/cinco-juegos-de-5-minutos/` pair with `/`, `/learn/` and `/free/five-5-minute-plays/`. Spanish product pages are published only when a Spanish product exists; until then, the Spanish articles link to the English product page and say "(en inglés)".

### 2.6 Internal-linking rules

- Every article links **up** to its category and stage page, **across** to 2–3 sibling articles, and **down** to one product and one free printable. There is only one product call to action per article.
- Every product page links to its matching article ("Why we made this") and to `next_products` (BRAND "Every product leads to the next").
- The research hub pages A8 and A9 **never link to a product page.** They link only to the free play printable, framed as play and family time, and to study summaries. Product pages never link to A8.
- Breadcrumbs appear on every page below the home page, for example Home › Learn › Screen time › Screen time by age, and match the BreadcrumbList JSON-LD.
- Anchor text describes the target ("screen time guidelines by age"), never "click here".

---

## 3. Technical checklist for the developer

### 3.1 Build and hosting (Cloudflare Pages)
- [ ] Static HTML at build time, with every word of content in the HTML and not injected by JavaScript. Astro is the working assumption from `legal/international-plan.md` §3.
- [ ] One canonical host: `https://playbeforepixels.com`. 301 `www` → apex and `http` → `https`. Always use trailing slashes, and 301 the non-slash version.
- [ ] `<link rel="canonical">` on every page, self-referencing and absolute.
- [ ] `_redirects` for renamed URLs. Never delete a live URL without a 301.
- [ ] `_headers`: `Strict-Transport-Security: max-age=31536000; includeSubDomains` (add `preload` only after every subdomain is on HTTPS), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, and a Content-Security-Policy that allows only the checkout and email-form domains actually used. Test the checkout after adding the CSP.
- [ ] Long cache (`immutable`) for hashed assets; short cache for HTML.
- [ ] A custom `404.html` with search, links to /learn/ and /shop/, and `noindex`.
- [ ] Preview deployments (`*.pages.dev`) are `noindex` through `X-Robots-Tag` on non-production branches, so they never compete with the real site.

### 3.2 Crawl and index
- [ ] `robots.txt`: allow all; disallow `/bonus/`, `/thank-you/`, `/cart`, `/checkout`; `Sitemap: https://playbeforepixels.com/sitemap-index.xml`.
- [ ] XML sitemap of indexable, canonical, 200-status pages only, with `lastmod` taken from the real content change date. Include hreflang `xhtml:link` entries and add `x-default` by hand (Astro's sitemap does not; see international-plan §3.2).
- [ ] `noindex` on `/bonus/*`, `/thank-you/`, `/404.html`, internal search results and preview hosts.
- [ ] **One indexable page per product.** If the Shopify Online Store theme is public, its product pages duplicate ours. Either keep checkout-only (Buy Button or Storefront API) and password the theme, or 301 or noindex the theme's product URLs. [VERIFY which of these the chosen Shopify plan supports.]
- [ ] Marketplace listings (Amazon, Etsy, TPT) use their own copy and do not paste whole site articles, to avoid duplicate content.
- [ ] Held pages (gate G) are not built into production. Don't just hide them: they must not appear in the sitemap, in navigation, or as reachable URLs.

### 3.3 Page template
- [ ] `<html lang="en">` and `lang="es"` on Spanish pages; set the language on mixed-language spans.
- [ ] One `<h1>` per page, matching the H1 in §2. Logical H2/H3 order.
- [ ] Unique `<title>` and meta description from §2. A build step fails if a title is over 60 characters or a description over 155.
- [ ] Open Graph and Twitter card tags, with a 1200×630 social image per page (a flat illustration in brand style, no faces required).
- [ ] Visible breadcrumbs plus BreadcrumbList JSON-LD.
- [ ] Article pages show "Updated {date}", "Written and checked by the Play Before Pixels editorial team" with a link to /editorial-policy/, a sources list, and the disclaimer line linked to /disclaimer/.
- [ ] Footer on every page: "© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.", `[BUSINESS MAILING ADDRESS]`, contact email, and links to every policy page. No phone number (BRAND "No direct contact").

### 3.4 Performance (targets at the 75th percentile, mobile)
- [ ] LCP under 2.5 s, INP under 200 ms, CLS under 0.1. Check in PageSpeed Insights and the Search Console Core Web Vitals report.
- [ ] Images in AVIF or WebP with `width` and `height`, responsive `srcset`, `loading="lazy"` below the fold, and `fetchpriority="high"` on the hero image only.
- [ ] Fonts: self-host the brand fonts as WOFF2, subset to Latin plus Latin Extended (Spanish characters: á é í ó ú ñ ü ¿ ¡), `font-display: swap`, and preload only the display face.
- [ ] Keep JavaScript minimal. Load the checkout script only on product and cart pages. No auto-playing video (BRAND).

### 3.5 Accessibility (WCAG 2.2 AA)
- [ ] Contrast of at least 4.5:1 for body text. Check tomato `#EE5A36` on white before using it for text; use `#1D2940` ink for body copy.
- [ ] Descriptive alt text for every product image (from `listing.json` `alt_text`); `alt=""` for decorative art.
- [ ] Visible focus states, a skip link, labelled form fields, and no content that is only reachable by hover.
- [ ] Printable previews come with a text description of what is inside.

### 3.6 Structured data
- [ ] JSON-LD from §5, generated from the same data file that renders the page, so prices and availability can't drift.
- [ ] **No `aggregateRating` or `review` markup until real, verified customer reviews exist on the page.** Never seed, write, buy or filter reviews (FTC rule on consumer reviews; see `legal/AFFILIATE-ENDORSEMENT-DISCLOSURE.md`).
- [ ] Validate every template in the Rich Results Test and the Schema Markup Validator before launch and after every template change.

### 3.7 Forms, email and trust
- [ ] Contact form and quote form only, with spam protection (Cloudflare Turnstile) and no phone field.
- [ ] Email on the domain (`hello@`, `orders@`, `privacy@`, `corrections@`) with SPF, DKIM and DMARC set up (start with `p=none`, move to `quarantine`). This matters for delivering download emails and for trust.
- [ ] The email sign-up asks only for an email address and the child's **birth month and year**. It never asks for a child's name (BRAND). Double opt-in.
- [ ] The CAN-SPAM footer in every email shows `[BUSINESS MAILING ADDRESS]` (the PO Box).
- [ ] Privacy-friendly analytics without cookies (the Privacy Policy names this; confirm the configuration before stating it).
- [ ] Every outbound affiliate link has `rel="sponsored"` and a disclosure near the link.

### 3.8 International
- [ ] Spanish under `/es/` with translated slugs, titles, descriptions, alt text and JSON-LD `inLanguage: "es"`.
- [ ] Reciprocal hreflang, including self-reference and `x-default` (§2.5).
- [ ] Never redirect by IP or browser language. Offer a dismissible "¿Prefieres leer en español?" link instead.
- [ ] Prices display in USD. Any currency conversion happens in checkout only.

### 3.9 Publish gate (every article, every time)
An article ships only when all of these are ticked in its front matter:
- [ ] Every research statement matches one of the 10 allowed citations, or a new source recorded in `ops/RESEARCH-LOG.md` with its primary-source check.
- [ ] Every `verify_before_publish` item has been checked on the live official page, and the date is recorded.
- [ ] Hard-rule scan: no treat, cure, prevent, reverse, heal, therapy, clinically proven, SLP. No named school, district, company, app, device or EdTech product. No local angle. For A8 and A9, no product link.
- [ ] Child-safety scan (BRAND rule 4) on every activity.
- [ ] Title and description lengths pass; internal links resolve; `publish_gate` is cleared.

---

## 4. Google and Bing surfaces: setup steps

### 4.1 Google Search Console
1. Add a **Domain property** for `playbeforepixels.com` and verify it with the DNS TXT record in Cloudflare DNS.
2. Submit `https://playbeforepixels.com/sitemap-index.xml`.
3. Use URL Inspection to request indexing for the home page, /learn/, /research/, /shop/ and the first 12 articles.
4. Add the founder as owner. Add a delegated user for the routine's API access only if it's needed (Search Console API, read-only).
5. Every week, the routine exports Performance data (queries, pages, countries) to `ops/` and flags any page with impressions but a CTR under 1% for a title rewrite.
6. Watch the Page indexing, Core Web Vitals, HTTPS, Merchant listings and Enhancements reports.

### 4.2 Bing Webmaster Tools
1. Sign in and choose **Import from Google Search Console**, which brings in the site and sitemap.
2. Turn on IndexNow: Cloudflare Crawler Hints, or a key file plus a ping on deploy.
3. Check the SEO Reports and Site Scan monthly.

### 4.3 Google Merchant Center (free listings first, ads later if ever)
1. Create the account in the legal name **AlphaPlay LLC**, with **Play Before Pixels** as the store name, and verify and claim the website.
2. Business info: `[BUSINESS MAILING ADDRESS]`, customer-service email, and the return policy (30 days on physical items; digital per policy) and shipping settings, all matching `/shipping-returns/` word for word.
3. The site must visibly show contact information, the return and refund policy, secure checkout and accurate prices. Mismatches cause "misrepresentation" suspensions, the most common failure for new stores.
4. Product source: the Shopify Google channel feed, or a feed generated from the same data file as the site. Start with **physical print-on-demand books, card decks and merch**. [VERIFY Merchant Center's current rules on digital downloads and courses before adding printables.] Add GTIN or ISBN once assigned; use `identifier_exists=false` only for merch without a GTIN.
5. Complete identity and business verification when asked, and link Search Console.
6. Products must never mention autism or any condition (BRAND).

### 4.4 Google Business Profile: **not eligible; do not create one**
- Google Business Profile is for businesses that meet customers in person, either at a staffed location or by traveling to them. Play Before Pixels is online-only and, by the founder's instruction, has no in-person contact. Google's guidelines do not accept P.O. boxes, mailboxes or virtual offices as a location. [VERIFY against the current Google Business Profile guidelines when setting up.]
- Making a profile with a mailbox address risks suspension and looks less legitimate, not more.
- **What to do instead:** keep the Organization schema (§5.1) correct, keep the name, address and email identical everywhere (site footer, policies, Merchant Center, marketplaces, email footer), and fill `sameAs` only with profiles that are live. That is how Google connects the brand into a knowledge panel.

### 4.5 Legitimacy checklist (trust signals that also affect rankings and Merchant Center)
- [ ] Legal name, trade name, mailing address and email are identical on the site, invoices, Shopify, Merchant Center, Etsy, TPT, Amazon, KDP and IngramSpark.
- [ ] The Maryland trade name "Play Before Pixels" is registered to AlphaPlay LLC before the site goes live (`legal/ENTITY.md`).
- [ ] Every policy page is live and linked in the footer before the first sale.
- [ ] No invented author personas, credentials, "as seen in" badges, testimonials, star ratings or sales counts. Show only real customer reviews, and only after they exist.
- [ ] The About page says plainly who we are, what we make, that we are not clinicians, and how we source research.
- [ ] Every study summary links to its original source.
- [ ] The Editorial Policy (§6) is live and linked from every article.

---

## 5. JSON-LD templates

Replace `{…}` values from the page's data file. Leave out any property whose value is unknown rather than guessing. Put the `@graph` in one `<script type="application/ld+json">` per page.

### 5.1 Organization (site-wide, in the home page and referenced by `@id` everywhere else)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://playbeforepixels.com/#org",
  "name": "Play Before Pixels",
  "legalName": "AlphaPlay LLC",
  "alternateName": "AlphaPlay LLC d/b/a Play Before Pixels",
  "url": "https://playbeforepixels.com/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://playbeforepixels.com/brand/logo-512.png",
    "width": 512,
    "height": 512
  },
  "brand": {
    "@type": "Brand",
    "@id": "https://playbeforepixels.com/#brand",
    "name": "Play Before Pixels",
    "logo": "https://playbeforepixels.com/brand/logo-512.png"
  },
  "email": "hello@playbeforepixels.com",
  "address": {
    "@type": "PostalAddress",
    "postOfficeBoxNumber": "{PO BOX NUMBER}",
    "addressLocality": "{CITY}",
    "addressRegion": "MD",
    "postalCode": "{ZIP}",
    "addressCountry": "US"
  },
  "contactPoint": [{
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "hello@playbeforepixels.com",
    "url": "https://playbeforepixels.com/contact/",
    "availableLanguage": ["English", "Spanish"]
  }],
  "publishingPrinciples": "https://playbeforepixels.com/editorial-policy/",
  "hasMerchantReturnPolicy": { "@id": "https://playbeforepixels.com/shipping-returns/#physical" },
  "sameAs": ["{ONLY live public profile URLs from commerce/links.js}"]
}
```
There is no `telephone` (no phone, by founder instruction) and no `founder` (the brand is faceless). Remove `sameAs` entirely until at least one profile is live.

### 5.2 WebSite (home page only)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://playbeforepixels.com/#website",
  "url": "https://playbeforepixels.com/",
  "name": "Play Before Pixels",
  "publisher": { "@id": "https://playbeforepixels.com/#org" },
  "inLanguage": ["en", "es"]
}
```

### 5.3 Product with Offer: printed item (card deck, merch, the print play guide)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://playbeforepixels.com/shop/{slug}/#product",
  "name": "{Product name}",
  "description": "{short_description from listing.json}",
  "image": ["https://playbeforepixels.com/img/{slug}/cover-1600.png", "https://playbeforepixels.com/img/{slug}/mockup-1600.png"],
  "sku": "{SKU}",
  "gtin13": "{GTIN if assigned; otherwise omit}",
  "brand": { "@id": "https://playbeforepixels.com/#brand" },
  "audience": { "@type": "PeopleAudience", "suggestedMinAge": {min}, "suggestedMaxAge": {max} },
  "offers": {
    "@type": "Offer",
    "url": "https://playbeforepixels.com/shop/{slug}/",
    "price": "{19.99}",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": { "@id": "https://playbeforepixels.com/#org" },
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": { "@type": "MonetaryAmount", "value": "{rate}", "currency": "USD" },
      "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "US" },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": { "@type": "QuantitativeValue", "minValue": {X}, "maxValue": {Y}, "unitCode": "DAY" },
        "transitTime": { "@type": "QuantitativeValue", "minValue": {X}, "maxValue": {Y}, "unitCode": "DAY" }
      }
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "@id": "https://playbeforepixels.com/shipping-returns/#physical",
      "applicableCountry": "US",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 30,
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": "https://schema.org/ReturnShippingFees",
      "merchantReturnLink": "https://playbeforepixels.com/shipping-returns/"
    }
  }
}
```
`returnFees` must match the final policy text; the policy file still has open brackets. `InStock` is correct for print-on-demand items that are orderable now.

**Digital printable variant:** the same Product, but remove `shippingDetails` and `itemCondition`, and set `"hasMerchantReturnPolicy": {"@type":"MerchantReturnPolicy","applicableCountry":"US","returnPolicyCategory":"https://schema.org/MerchantReturnNotPermitted","merchantReturnLink":"https://playbeforepixels.com/shipping-returns/"}` so it matches policy §3 (digital files are non-refundable once accessed). Change it if the policy changes. For site licenses, add `"additionalProperty":[{"@type":"PropertyValue","name":"License","value":"{Single classroom | Whole school}"}]` and one Offer per tier inside `"offers": [ … ]`.

### 5.4 Book (board books and picture books; combine with Product so the Offer is valid)
```json
{
  "@context": "https://schema.org",
  "@type": ["Book", "Product"],
  "@id": "https://playbeforepixels.com/shop/{slug}/#book",
  "name": "{Title}",
  "description": "{short_description}",
  "image": "https://playbeforepixels.com/img/{slug}/cover-1600.png",
  "author": { "@type": "{Person|Organization}", "name": "{EXACT byline printed on the cover}" },
  "illustrator": { "@type": "{Person|Organization}", "name": "{EXACT illustrator credit, if printed}" },
  "publisher": { "@type": "Organization", "name": "AlphaPlay LLC", "brand": { "@id": "https://playbeforepixels.com/#brand" } },
  "brand": { "@id": "https://playbeforepixels.com/#brand" },
  "inLanguage": "en",
  "bookFormat": "https://schema.org/{Hardcover|Paperback|EBook}",
  "isbn": "{ISBN-13 once assigned; omit until then}",
  "numberOfPages": {32},
  "typicalAgeRange": "{2-6}",
  "copyrightHolder": { "@type": "Organization", "name": "AlphaPlay LLC" },
  "copyrightYear": 2026,
  "offers": {
    "@type": "Offer",
    "url": "https://playbeforepixels.com/shop/{slug}/",
    "price": "{19.99}",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": { "@id": "https://playbeforepixels.com/#org" },
    "hasMerchantReturnPolicy": { "@id": "https://playbeforepixels.com/shipping-returns/#physical" }
  }
}
```
If there are several editions (hardcover and paperback), add `"workExample": [{"@type":"Book","bookFormat":…,"isbn":…}]`. The byline must match the printed book and the copyright filing exactly (BRAND "Human authorship"). Never invent a person.

### 5.5 Course (30-Day Screen Reset)
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://playbeforepixels.com/shop/30-day-screen-reset/#course",
  "name": "The 30-Day Screen Reset",
  "description": "A self-paced written course for families: one short lesson a day for 30 days to rebuild routines around play, talk and paper.",
  "provider": { "@type": "Organization", "name": "Play Before Pixels", "sameAs": "https://playbeforepixels.com/" },
  "inLanguage": "en",
  "educationalLevel": "Beginner",
  "audience": { "@type": "EducationalAudience", "educationalRole": "parent" },
  "isAccessibleForFree": false,
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "Online",
    "courseSchedule": { "@type": "Schedule", "repeatCount": 30, "repeatFrequency": "Daily" },
    "courseWorkload": "PT10M"
  },
  "offers": {
    "@type": "Offer",
    "category": "Paid",
    "price": "{29.00}",
    "priceCurrency": "USD",
    "url": "https://playbeforepixels.com/shop/30-day-screen-reset/",
    "availability": "https://schema.org/InStock"
  }
}
```
Google announced in 2025 that it was phasing out several rich-result types, reportedly including Course info. [VERIFY on Google Search Central.] The markup is still valid schema.org and costs nothing to keep.

### 5.6 BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://playbeforepixels.com/" },
    { "@type": "ListItem", "position": 2, "name": "Learn", "item": "https://playbeforepixels.com/learn/" },
    { "@type": "ListItem", "position": 3, "name": "Screen time", "item": "https://playbeforepixels.com/learn/screen-time/" },
    { "@type": "ListItem", "position": 4, "name": "Screen time by age" }
  ]
}
```

### 5.7 Article (every `/learn/`, `/research/` and `/es/aprender/` page)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://playbeforepixels.com/learn/{slug}/#article",
  "headline": "{title from front matter, ≤110 chars}",
  "description": "{meta_description}",
  "image": ["https://playbeforepixels.com/img/learn/{slug}-1200x630.png"],
  "datePublished": "{YYYY-MM-DD}",
  "dateModified": "{YYYY-MM-DD, only on a real content change}",
  "inLanguage": "{en|es}",
  "author": { "@type": "Organization", "name": "Play Before Pixels editorial team", "url": "https://playbeforepixels.com/editorial-policy/" },
  "publisher": { "@id": "https://playbeforepixels.com/#org" },
  "mainEntityOfPage": "https://playbeforepixels.com/learn/{slug}/",
  "isAccessibleForFree": true,
  "citation": [
    {
      "@type": "ScholarlyArticle",
      "name": "{Study title}",
      "author": "{First author} et al.",
      "datePublished": "{YYYY}",
      "isPartOf": { "@type": "Periodical", "name": "JAMA Pediatrics" },
      "url": "{DOI link, verified}"
    }
  ]
}
```
Use Organization as author. Do not create a named persona. Add `reviewedBy` only if a real, named, qualified reviewer actually reviews the page and agrees to be named.

### 5.8 FAQPage (only where the Q&A is visible on the page)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{Question exactly as shown on the page}",
      "acceptedAnswer": { "@type": "Answer", "text": "{Answer exactly as shown on the page}" }
    }
  ]
}
```
Since 2023, Google shows FAQ rich results mainly for well-known government and health sites. So treat this as structure for Bing and AI answer engines, not as a way to get a rich result. Never use FAQ markup for product ads.

---

## 6. Editorial policy (page text for `/editorial-policy/`)

> **Editorial policy**
> *Last updated: {date}*
>
> Play Before Pixels is a trade name of AlphaPlay LLC. We make books, printables and play guides, and we publish free articles about play, talk, reading and family screen habits. This page explains how we write those articles and how we check them.
>
> **Who writes our articles.** Articles are written and checked by the Play Before Pixels editorial team. We use software tools, including AI writing tools, to help draft and check articles. A person reviews every article against this policy before it is published, and a person is responsible for what we publish. We are parents and educators. We are not doctors, psychologists or speech-language pathologists, and we never write as if we were.
>
> **How we choose sources.**
> - We cite peer-reviewed studies, official guidelines from bodies such as the World Health Organization and the American Academy of Pediatrics, and major international reports.
> - We read the original source ourselves before we cite it. We do not cite a study based on a news story or a social media post about it.
> - Every article lists its sources in full at the end, with links where they are available.
> - We keep an internal log of each new source and when it was checked.
>
> **How we describe research.**
> - We say what kind of study it is, who took part, what was measured and how big the effect was, in plain words.
> - Most research on young children and screens finds **associations**. It shows that two things tend to go together, not that one causes the other. We say so every time.
> - Studies describe groups, not your child. We say that too.
> - We never exaggerate a finding to sell a product. Our articles may mention our products, but products never shape what a study is said to show.
>
> **No medical advice.** Our content is general education. It is not medical, developmental, speech-language or therapy advice, and nothing we make is meant to diagnose, treat, cure or prevent any condition. If you have any concern about your child's development, hearing, speech, behavior or health, please talk to your child's doctor or another qualified professional. See our [Medical and Educational Disclaimer](/disclaimer/).
>
> **What we never do.** We don't name or criticize schools, districts, companies, apps or products. We don't use fear or shame. We don't publish paid or sponsored articles. We don't invent reviews, testimonials, experts or credentials.
>
> **Keeping articles current.** We review every article at least once a year and when important new guidance is published. The "Updated" date on each article changes only when we change its content.
>
> **Corrections.** If you think something we published is wrong, out of date or unclear, email **corrections@playbeforepixels.com** with the page link and what you think should change. We reply within 5 business days. When we fix a factual error, we correct the article and add a dated note at the end saying what changed. We don't quietly rewrite mistakes. Small fixes to spelling or wording are made without a note.
>
> **Money and independence.** We earn money by selling our own books, printables and course, and sometimes through clearly labelled affiliate links (see [Disclosures](/disclosures/)). No one pays us to cover a topic or a study. The researchers and organizations we cite have not reviewed or endorsed us unless we say so.

The founder must confirm the AI-disclosure sentence and the 5-day correction window before publishing. Both are recommended, because an honest statement of how content is made is a trust signal, and it is also the accurate description of how this business runs.

---

## 7. Measurement and re-ranking (because demand is unverified)
- **Weeks 0–8:** publish A1–A5, A7, A8, A9, A10, A11 and A12 (A6 and the gated sections wait for counsel). Log impressions per query per page in `ops/` every week.
- **Week 8:** rank clusters by actual impressions. Rewrite any title with impressions over 200 and CTR under 1%. Add H2 sections for queries that show impressions but have no matching section.
- **Quarterly:** prune or merge pages with zero impressions after 6 months. Refresh the top 5 pages.
- **Conversions:** track free-printable sign-ups per article, and product clicks per article (not A8 or A9). Measure revenue per landing page from checkout UTM parameters.

---

## 8. Twelve-month content calendar (October 2026 – September 2027)

Each month has one new cornerstone or support article, one refresh or Spanish piece, and one study summary page when a new article cites it. The seasonal hooks follow `marketing/CAMPAIGN-BIBLE.md`. **Autism content is never tied to awareness months or campaigns.** A8 is refreshed on a fixed yearly date (March), not for an awareness event.

| Month | Publish (new) | Refresh / Spanish / hub | Seasonal hook and product link |
|---|---|---|---|
| **Oct 2026** | A1 Screen time by age; A3 Instead of screens (toddlers); A7 Talk-along reading; A2 Screen-free activities by age | A11 and A12 (Spanish); study summaries for WHO 2019, AAP 2016, Brushe 2024 | Launch. Free "Five 5-Minute Plays". Board book and Screen Reset Pack |
| **Nov 2026** | A4 Family media plan; A10 Turning off screens; A5 Reading on paper vs screens (parent version) | A8 What is "virtual autism"?; A9 Screen time and toddler talk; study summaries for Madigan, Heffler, Kushima, Takahashi, Harlé, Delgado | Holiday gifting: "Screen-free gifts for toddlers by age" (our products plus generic toy types; no brands) |
| **Dec 2026** | "Screen-free winter break: a 14-day play calendar (ages 2–12)" | es: "Regalos sin pantallas para niños pequeños" | Winter break. 100 Plays guide, "I'm Bored" cards |
| **Jan 2027** | "The 7-day screen-free challenge: a family guide" | Refresh A4; es: "Plan familiar de uso de pantallas" (pair with A4) | New Year reset. 30-Day Screen Reset course, Family Plan |
| **Feb 2027** | "Screen-free morning routine for toddlers and preschoolers" | Refresh A7; es: "Cómo leerle a tu bebé: consejos para conversar" (pair with A7) | Cold-weather indoor play. Visual Routine Cards |
| **Mar 2027** | "Waiting-room and restaurant games with no phone (ages 1–8)" | Yearly review of A8 and A9 (fixed date, not tied to any event) | Check-up season. Play and Talk Cards, travel pack |
| **Apr 2027** | "Screen-free activities for 5- to 8-year-olds after school" | Refresh A2; es: "Actividades sin pantallas por edad" (pair with A2) | Spring break. "I'm Bored" cards |
| **May 2027** | "Planning a screen-free week at home: day-by-day ideas" | *If counsel has cleared:* A6 Brain breaks, the teacher section of A5, and /schools/ | A spring screen-free week many families and schools observe (described generically). Classroom Pack |
| **Jun 2027** | "Summer screen-time rules for kids 5–12 that actually hold" | Refresh A1 and A11; es: "Vacaciones de verano sin pantallas" | Summer. Family Plan, 30-Day Reset |
| **Jul 2027** | "Road-trip games with no screens (ages 2–12)" | Refresh A3 and A12 | Travel season. Travel pack, card deck |
| **Aug 2027** | "Back-to-school routines: bedtime, mornings and screens (5–12)" | *If cleared:* "Paper-first reading routines for PreK–5 teachers"; refresh A6 | Back to school. Classroom Pack, site licenses, workshop kits |
| **Sep 2027** | "Homework on paper: helping kids 5–12 focus at home" | Refresh A5 and A10; es: "Autismo virtual: qué significa el término" (hub only, same framing and gate as A8) | Fall. Family Plan; group kits if cleared |

Rules for every calendar piece: allowed citations only (or new sources verified and logged first); a "When to talk to your pediatrician" or "What this does not mean" box wherever development is mentioned; BRAND rule 4 on every activity; one soft product link (none on hub pages A8 and A9, or on the Spanish virtual-autism page); the free printable link; and the publish gate in §3.9.
