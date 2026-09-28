# DRAFT: International sales and discoverability plan

**Business:** AlphaPlay LLC, doing business as Play Before Pixels (see `legal/ENTITY.md`)
**Prepared:** September 27, 2026
**Goal (the owner's words):** "make sure all international markets can find our website to buy our products."
**Status:** planning draft. The tax items need a cross-border accountant. The product-safety, consumer-law and privacy items need an attorney, or a compliance service in the destination region. Nothing here is legal or tax advice.

**Adversarial review, September 28, 2026 (still a DRAFT):** a second pass tried to disprove every fee, threshold, rule status and platform claim here. Web search was still used up, and every official site tried was blocked: eur-lex.europa.eu, consilium.europa.eu, gov.uk, legislation.gov.uk, canada.ca, laws-lois.justice.gc.ca, ato.gov.au, legislation.gov.au, ird.govt.nz, gesetze-im-internet.de, legifrance.gouv.fr, lucid.verpackungsregister.org, cbp.gov, esafety.gov.au, kdp.amazon.com, etsy.com, stripe.com, gumroad.com, payhip.com and lemonsqueezy.com. **No UNVERIFIED item could be upgraded to verified.** The GitHub-hosted sources were re-read. Corrections are marked **(corrected 2026-09-28)**:
- The Astro sitemap does **not** generate `x-default` (section 3.2).
- The Cloudflare Web Analytics page says nothing about cookies (section 6.6).
- The e-book VAT rates were misleading (section 5.1).
- **Coaching and live workshops were removed**, because `brand/BRAND.md` rule 19 and `CLAUDE.md` forbid them.
- The merchant-of-record choice now matches `commerce/storefront-setup-guide.md` (section 5.2).

---

## 0. Read this first: how reliable this plan is

- **What was checked live this session.** The web-search budget for this session was used up by earlier lanes. The network proxy blocked almost every official source (Google Search Central, EUR-Lex, GOV.UK, the European Commission, Amazon KDP, Stripe, Printful, Lemon Squeezy, Paddle, StatCounter, Wikipedia). Only documentation hosted on GitHub could be fetched. Claims marked **[verified 2026-09-27]** were read today from these sources:
  - Cloudflare's own docs (source files on GitHub)
  - Astro's docs (source files on GitHub)
  - MDN (source files on GitHub)
  - the open-source EU VAT-rate dataset `ibericode/vat-rates`
- **Everything else is marked UNVERIFIED.** Those items come from general knowledge current to about mid-2026. Each one has the official URL where you or your adviser can confirm it. Fees, thresholds and marketplace coverage change often, so **re-check every UNVERIFIED number before you rely on it.**
- **Dollar figures are budget estimates** unless a source is cited.

---

## 1. The strategy in one page

International buyers will not find a small new US brand by typing its name. They find it in three ways:

1. They search in their own language for the problem ("tiempo de pantalla niños", "activités sans écran").
2. They browse the marketplace they already trust in their country (Amazon.co.uk, Amazon.de, Etsy, Bookshop.org UK).
3. A teacher, parent group or librarian passes along a link.

So the plan is **one global website with three "doors" to buy**:

| Door | What sells through it | Countries | Why |
|---|---|---|---|
| **A. Own site, digital products** (printables, the digital play guide, workshop kits, "30 Days of Back-and-Forth" written course; the classroom pack **only after employment counsel clears it**, section 9) | Checkout run by a **merchant of record** (MoR), which collects and pays VAT/GST worldwide | Every country the MoR supports | EU and UK tax digital sales to consumers **from the first sale**, with no threshold, when the seller is outside those regions (see section 4). An MoR removes that burden. |
| **B. Marketplaces that print or stock locally** (paperback and hardcover books, later board books, merch) | Amazon (KDP), IngramSpark to retailers worldwide, Bookshop.org, Etsy, Faire wholesale, marketplace-seller print-on-demand (POD) | UK, CA, AU, EU, JP and others | Local printing avoids import duties, slow delivery and surprise fees. The marketplace is usually the seller of record, so it handles VAT and much of the product-safety and packaging paperwork (UNVERIFIED per marketplace; see section 5). |
| **C. Own site, physical direct-to-consumer (DTC)** | Books, card deck and merch shipped by you or your POD partner | **US only at launch.** Add CA, UK and AU only after section 5's checklist is done | Direct shipping into the EU from a US seller triggers the EU responsible-person rule, packaging take-back (EPR) registrations and import VAT. It is not worth it at low volume. |

The website ties the three doors together with a **"Buy in your country" page and button** on every product. It detects the visitor's country (Cloudflare supplies this; see section 7) and shows the right local links: Amazon.co.uk for a UK visitor, Amazon.de and Bookshop.org for Germany and Spain, and so on. The visitor can always change the country.

---

## 2. Market prioritization

### 2.1 How the markets were scored

Each market was scored on four things:

- **Screen-time concern.** Is there active public or government attention to young children and screens? This is a demand signal only. It is never used as a health claim in marketing.
- **Purchasing power.**
- **Marketplace presence.** Can AlphaPlay reach buyers there through KDP, IngramSpark, Etsy, Faire or Bookshop.org without a local company?
- **Cost to enter.** Translation, tax and product-safety work.

The screen-time-concern signals below are UNVERIFIED in this session. Confirm each at the linked official source before quoting it anywhere. **Never** use them in product copy as proof that the products improve health or development (see BRAND.md rule 1).

### 2.2 Tiers

| Tier | Market | Screen-time concern signal (UNVERIFIED; confirm at source) | Purchasing power | Marketplace presence | Language work | Launch window |
|---|---|---|---|---|---|---|
| **1** | United States (home) | Audience B already reads *The Digital Delusion* ([publisher page](https://www.penguinrandomhouse.com/books/838437/the-digital-delusion-by-jared-cooney-horvath-phd-med/)) | High | Every channel | None | Launch |
| **1** | United Kingdom | England's Department for Education issued guidance in Feb 2024 on stopping phone use in schools ([gov.uk](https://www.gov.uk/government/publications/mobile-phones-in-schools), UNVERIFIED). A large parent-led "smartphone-free childhood" movement exists. | High | Amazon.co.uk (KDP prints locally, UNVERIFIED), uk.bookshop.org, Etsy, Faire UK, POD made in the UK | UK spelling on key pages (colour, mum, nursery/Reception) | Launch (digital); physical within 90 days via marketplaces |
| **1** | Canada | Several provinces restricted phones in classrooms from 2024 (UNVERIFIED; check provincial ministry sites) | High | Amazon.ca (KDP paperback, UNVERIFIED), IngramSpark, Etsy, Faire | English at launch; **French is legally needed for Quebec consumers** (section 5.5) | Launch (English digital) |
| **1** | Australia | Australia legislated a minimum age of 16 for social-media accounts, in effect from December 2025 ([eSafety Commissioner](https://www.esafety.gov.au/about-us/industry-regulation/social-media-age-restrictions), UNVERIFIED) | High | Amazon.com.au (KDP paperback, UNVERIFIED), IngramSpark Australia print (UNVERIFIED), Etsy, Faire | AU spelling on key pages; Early Years Learning Framework vocabulary for educators | Launch (digital); physical via marketplaces |
| **2** | Ireland | Irish national attention to children and smartphones (UNVERIFIED) | High | Amazon.co.uk and Amazon.ie (UNVERIFIED), Etsy, Bookshop UK ships to IE (UNVERIFIED) | English. **Ireland is in the EU**, so EU VAT and GPSR apply. | 90 days |
| **2** | New Zealand | National "phones away" school policy from 2024 ([education.govt.nz](https://www.education.govt.nz/), UNVERIFIED) | Medium-high | Amazon.com.au serves many NZ buyers (UNVERIFIED), Etsy | English | 90 days |
| **3** | US Hispanic families and dual-language classrooms | About 65 million Hispanic US residents ([Census Bureau](https://www.census.gov/), UNVERIFIED figure); strong demand for bilingual children's books (UNVERIFIED) | Medium-high (US dollars, no import issues) | Amazon.com, TpT (Spanish resources), Bookshop.org US | **Bilingual English/Spanish editions** plus a `/es/` site | Phase 2 (months 4–9). **This is the best first non-English move**: same country, same tax rules, same shipping. |
| **3** | Spain | Government expert committee report (Dec 2024) recommended limiting screens for the youngest children (UNVERIFIED; [Spanish government](https://www.lamoncloa.gob.es/)) | Medium-high | Amazon.es (KDP prints in the EU, UNVERIFIED), Bookshop.org Spain (UNVERIFIED), Etsy | `es` site plus es-ES word adjustments | Phase 2 |
| **3** | Mexico and Latin America | Growing concern (UNVERIFIED) | Lower average purchasing power; strong digital-product potential | Amazon.com.mx: eBooks yes, KDP paperback probably not (UNVERIFIED). Physical book channels are weak. | Neutral Latin American Spanish (`es-419`) | Phase 2, **digital first** |
| **4** | France | Presidential expert commission report *Enfants et écrans* (April 2024) recommended no screens before age 3 ([Élysée](https://www.elysee.fr/), UNVERIFIED) | High | Amazon.fr (KDP, UNVERIFIED), Etsy | Full French. **France's fixed book-price law and a minimum shipping charge on books** apply (section 5.8). French is legally required for consumer terms and product information. | Phase 3 (months 9–18) |
| **4** | Quebec (French Canada) | Same as Canada | High | Amazon.ca, Canadian bookstores via IngramSpark (UNVERIFIED) | `fr-CA` vocabulary (courriel, magasiner) | Phase 3, **together with France** (one French translation plus a Quebec review pass) |
| **4** | Germany, Austria, German-speaking Switzerland | Federal health-education guidance advises against screen media for under-3s (UNVERIFIED; [BIÖG, formerly BZgA](https://www.bioeg.de/)) | High; Germany is Europe's largest book market (UNVERIFIED) | Amazon.de (KDP, UNVERIFIED), Etsy, Faire EU | Full German. German fixed book prices, the **Impressum** legal-notice page, packaging registration (LUCID) and double opt-in email (section 5) | Phase 3 |
| **4** | Brazil | Federal law restricting student phone use in schools, 2025 ([Lei 15.100/2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15100.htm), UNVERIFIED) | Medium | Amazon.com.br: eBooks yes, KDP paperback probably not (UNVERIFIED). Brazilian tax on physical imports is complex. | `pt-BR` | Phase 4, **digital and eBook only** |
| **Later / opportunistic** | Nordics, Netherlands, Singapore, UAE, South Africa, India, Japan | Several have strong screen-time policy attention (UNVERIFIED) | Varies | English-language eBooks and digital products reach these buyers through the MoR and Amazon without translation | None (English) | They buy from the English site. No extra work, apart from checking that the MoR supports the country. |

### 2.3 Why this order

- **English markets first.** No translation cost, the same products, and KDP, Etsy, Bookshop.org and POD already print locally in the UK, Canada and Australia (UNVERIFIED per channel). The only new work is **tax on digital sales**, which the MoR handles, and small spelling and vocabulary edits.
- **Spanish second, starting with US Hispanic families.** It is the largest non-English audience AlphaPlay can serve under **US law, US tax and US shipping**. A bilingual book serves families, dual-language classrooms and libraries (audience C) at the same time. Spain and Latin America then reuse the same translation.
- **French and German third.** Both are large, high-income markets that care about the issue. They cost the most to enter because of full translation, fixed book prices, packaging EPR and consumer-language laws. Enter them through Amazon and Etsy first, where the marketplace carries most of the compliance.
- **Portuguese (Brazil) fourth, digital only.** The audience is large, but physical cross-border sales are costly and slow.

---

## 3. International SEO: how search engines send each country to the site

### 3.1 URL structure decision: **subfolders on the one .com**

| Option | Example | Decision | Reason |
|---|---|---|---|
| **Subfolders** | `playbeforepixels.com/es/`, `/fr/`, `/de/`, `/pt-br/` | **Use this** | One domain collects all the search authority. It is the cheapest to run on Cloudflare Pages, which is one project and one certificate. Astro and similar static builders support it natively ([Astro i18n routing](https://raw.githubusercontent.com/withastro/docs/main/src/content/docs/en/guides/internationalization.mdx), **[verified 2026-09-27]**: non-default locales get a prefix such as `/fr/about/`). Google's multi-regional-site guidance lists subdirectories on a generic top-level domain as a supported structure ([Google Search Central](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites), UNVERIFIED this session because the page was blocked). |
| Country-code domains (ccTLDs) | `playbeforepixels.co.uk`, `.de` | **Redirect only** | Each would be a separate site that has to build its own authority, with its own content and its own renewals. `legal/domain-portfolio.md` already says to buy the UK domains **only to 301-redirect** them to the .com. Keep that plan. |
| Subdomains | `es.playbeforepixels.com` | Do not use | They split authority like ccTLDs without the local-trust benefit. |
| URL parameters | `?lang=es` | Do not use | Google advises against it (UNVERIFIED; same Google page as above). |

**Language, not country, drives the folders.** Use `/es/` (one neutral Spanish for the US, Mexico, Latin America and Spain), `/fr/` (France, Belgium and Switzerland, with Quebec wording where it matters), `/de/` and `/pt-br/`. English stays at the root (`/`). Do **not** create `/en-gb/` or `/en-au/` copies unless prices or content really differ. Near-duplicate English pages add little.

### 3.2 hreflang (tells Google which language version to show)

- Every page lists **every** language version of itself, **including itself**, plus an `x-default`. The tags must be **reciprocal**: if `/es/juego/` points to `/juego/`, then `/juego/` must point back. Codes are BCP 47 language tags, optionally with a region ([MDN, hreflang](https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/html/reference/elements/link/index.md), **[verified 2026-09-27]**: "Values should be valid BCP 47 language tags"). Google's reciprocal-link and `x-default` rules come from [Google's localized-versions guide](https://developers.google.com/search/docs/specialty/international/localized-versions) (UNVERIFIED this session; page blocked).
- **Use the sitemap method, not hand-typed tags.** It is the least error-prone. The `@astrojs/sitemap` integration's `i18n` option generates `xhtml:link rel="alternate" hreflang` entries automatically ([Astro sitemap docs](https://raw.githubusercontent.com/withastro/docs/main/src/content/docs/en/guides/integrations-guide/sitemap.mdx), **[verified 2026-09-27; re-read 2026-09-28]**).
- **(corrected 2026-09-28)** Astro's sitemap docs and its i18n routing docs do **not** mention `x-default`, so the integration should not be assumed to add it. Add the `x-default` entry yourself, either with the sitemap's `serialize` hook or with a `<link rel="alternate" hreflang="x-default">` tag in the page head. After the first build, open `sitemap-0.xml` and check that every page lists itself, its translations and `x-default`. The site is not built in Astro yet (there is no `site/` folder), so this also depends on the web lane actually choosing Astro.
- Example head tags for the play-guide page, if you prefer HTML tags:

```html
<html lang="en">
<link rel="alternate" hreflang="en" href="https://playbeforepixels.com/play-guide/">
<link rel="alternate" hreflang="es" href="https://playbeforepixels.com/es/guia-de-juego/">
<link rel="alternate" hreflang="fr" href="https://playbeforepixels.com/fr/guide-de-jeu/">
<link rel="alternate" hreflang="de" href="https://playbeforepixels.com/de/spielbuch/">
<link rel="alternate" hreflang="pt-BR" href="https://playbeforepixels.com/pt-br/guia-de-brincadeiras/">
<link rel="alternate" hreflang="x-default" href="https://playbeforepixels.com/play-guide/">
```

- Only list a language version once it exists and is a **real translation**. Never point to an English page that says "coming soon."
- **Fix found today:** the current `index.html` has no `<html lang="en">` attribute (checked 2026-09-27). **(corrected 2026-09-28)** More precisely, the file has no `<html>` element or doctype at all: it starts at `<title>`. If it is a fragment that a host wraps at publish time, set the language in that wrapper. Otherwise add `<!doctype html><html lang="en">`. Put the right `lang` on every page (`lang="es"` and so on for translations).
- **Never auto-redirect by IP.** Googlebot crawls mostly from the US and would never see `/es/` (UNVERIFIED Google guidance). Show a dismissible banner instead: "Hola, ¿prefieres leer en español? → /es/". It is driven by the visitor's browser language or Cloudflare's country header (section 7). Cloudflare Pages `_redirects` **cannot** redirect by country anyway: "Redirect by country or language" is listed as unsupported ([Cloudflare Pages redirects](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/pages/configuration/redirects.mdx), **[verified 2026-09-27]**).
- Translate the **URL slugs** too (`/es/guia-de-juego/`). Also translate the title, meta description, image alt text and structured data.

### 3.3 Localized keywords: starting list (search volumes UNVERIFIED)

Check real volumes per country in Google Keyword Planner and in Search Console's *Queries by country* report after launch. Write for the phrases people actually type, and never for medical terms. Wording such as "delay", "therapy" or "autism treatment" stays banned in every language.

| Language / market | Starting keyword themes |
|---|---|
| English, US | screen-free activities for toddlers; talk-along board books; how much screen time for a 2 year old (**editorial answer pages only, no health claims**); screen-free classroom ideas; play ideas without screens |
| English, UK/IE | screen-free activities for toddlers UK; nursery / Reception activities without screens; **colouring** printables (UK spelling); **mum** tips |
| English, AU/NZ | screen-free activities for kids Australia; kindy activities; Early Years Learning Framework play ideas (the educator pack must not claim alignment until checked) |
| Spanish (`es`) | tiempo de pantalla niños; niños sin pantallas; juegos sin pantallas para niños; actividades para niños sin pantallas; libros para bebés; cuentos bilingües inglés español; crianza sin pantallas. **In Spain:** móvil / pantallas. **In Latin America and US Hispanic:** celular / pantallas. |
| French (`fr`) | temps d'écran enfants; enfants et écrans; activités sans écran; jeux sans écran enfant; livre bébé à lire ensemble; idées d'activités maternelle. **Quebec:** activités sans écran pour tout-petits; garderie |
| German (`de`) | Bildschirmzeit Kinder; Medienzeit Kinder; bildschirmfrei; Spielideen ohne Bildschirm; Beschäftigung Kleinkind ohne Handy; Pappbilderbuch |
| Portuguese (`pt-BR`) | tempo de tela crianças; brincadeiras sem tela; atividades sem tela para crianças; livro infantil para bebês; desconectar as crianças |

Merch slogans ("Laps not apps", "More talk, less tap") **stay in English** on products sold abroad. Wordplay rarely translates. If a localized slogan is wanted later, get it **transcreated** (rewritten by a native writer, not translated word for word) and run a trademark knock-out search in that market first (trademark lane).

### 3.4 Search engines and webmaster tools

| Engine | Action | Reason / source |
|---|---|---|
| **Google** | Add a **Domain property** in Search Console. Submit the sitemap, which carries the hreflang entries. Watch *Performance → Countries* and *Queries*. | The old *International Targeting* report (country targeting) was retired in 2022 (UNVERIFIED; [Search Console Help](https://support.google.com/webmasters/)). A .com with language subfolders relies on hreflang and content, not a country setting. |
| **Bing** | Add the site to **Bing Webmaster Tools** (it can import from Search Console). Turn on Cloudflare **Crawler Hints**. | Bing also feeds other search and answer engines (UNVERIFIED). Crawler Hints uses **IndexNow** to tell search engines when content changes, and it is available on **all Cloudflare plans, including Free** ([Cloudflare Crawler Hints](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/cache/advanced-configuration/crawler-hints.mdx), **[verified 2026-09-27]**). |
| **AI answer engines** (ChatGPT search, Perplexity, Gemini, Claude) | In Cloudflare **Security Settings → Configure AI bot policies**, keep **Search = Allow** and set **Agent = Allow**. Decide Training separately (you may block it to protect book text). | Cloudflare's docs say that on **Sept 15, 2026**, new domains got defaults where "bots classified as Training or as Agent will be blocked on pages that display ads, and Search will remain allowed." They also say "Mixed-purpose crawlers that combine Search and Training will also be blocked by all configurations to block AI training" ([Cloudflare block-AI-bots doc](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/bots/additional-configurations/block-ai-bots.mdx), **[verified 2026-09-27]**). The site has no ads, so the new default should not block it. But choosing "Block (on all pages)" for training could also block mixed-purpose crawlers that parents use to ask "where can I buy screen-free board books in Australia?" **Check this setting the day the domain is added.** |
| **Baidu** (China) | **Skip** | Serving mainland China needs a Chinese ICP licence and local hosting, and the marketplaces above do not reach China (UNVERIFIED). Not worth it at this stage. |
| **Yandex** (Russia) | **Skip** | Sanctions and payment restrictions (UNVERIFIED). No channel in the plan reaches Russia. |
| **Naver** (South Korea) | **Skip until a Korean edition exists** | Only relevant for Korean-language content (UNVERIFIED). English buyers in Korea find the site through Google. |
| **Seznam** (Czech Republic) | Skip | Small market; no Czech content planned. |

### 3.5 Structured data and shopping listings (make products appear in rich results in each country)

- Add schema.org `Product` / `Offer` markup to every product page, with `priceCurrency` and `price` **per country version** if prices differ. Add `Book` markup with `isbn`, `inLanguage`, `bookFormat` and `workTranslation` to link the English and Spanish editions ([schema.org Book](https://schema.org/Book), UNVERIFIED this session).
- **Google Merchant Center free listings.** A free product feed makes products eligible to appear in Google Shopping in many countries at no cost (UNVERIFIED; [Merchant Center Help](https://support.google.com/merchants/)). List only products you can actually sell to that country: digital products everywhere, physical products only where door C ships.
- Put **playbeforepixels.com** in every marketplace author bio, the back matter of every book ("Free printables at playbeforepixels.com"), POD swing-tags or neck labels where offered, TpT and Etsy shop "About" sections, and every downloadable PDF footer. Marketplace buyers are the biggest source of international traffic to the site.

---

## 4. Channels by country

### 4.1 Channel-by-market matrix (all UNVERIFIED except where marked; confirm in each dashboard)

| Channel | US | UK | CA | AU | NZ | IE | ES | MX / LatAm | FR | DE | BR |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Own site, digital (MoR checkout) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Own site, physical DTC | ✔ | later | later | later | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ |
| Amazon via **KDP paperback** | ✔ | ✔ | ✔ | ✔ | via .com.au (?) | via .co.uk / .ie (?) | ✔ | eBook only (?) | ✔ | ✔ | eBook only (?) |
| Amazon via **KDP hardcover** | ✔ | ✔ | ✔ (?) | ✘ (?) | ✘ | via .co.uk | ✔ | ✘ | ✔ | ✔ | ✘ |
| Amazon via **KDP eBook** | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| **IngramSpark** (bookstores, libraries, Bookshop.org, other online retailers) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | partial (?) | ✘ (?) | partial (?) | partial (?) | ✘ (?) |
| **Bookshop.org** | ✔ | ✔ (uk.bookshop.org) | ✘ | ✘ | ✘ | UK site ships (?) | ✔ (?) | ✘ | ✘ | ✘ | ✘ |
| **Etsy** (printables, merch, card deck) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| **Teachers Pay Teachers** (classroom pack, printables) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ (Spanish resources) | ✔ | ✔ | ✔ | ✔ |
| **Faire wholesale** (to gift shops, bookshops, toy stores) | ✔ | ✔ | ✔ | ✔ | ✘ (?) | ✔ | ✔ | ✘ | ✔ | ✔ | ✘ |
| **POD merch with local production** | ✔ | ✔ | ✔ | ✔ | via AU | via EU | ✔ | MX (Printful) | via EU | via EU | ✔ (?) |

(?) means especially uncertain. Confirm in the KDP, IngramSpark, Faire and Printful dashboards before promising anything to buyers.

### 4.2 Channel notes

**Amazon via KDP**
- One KDP upload lists a paperback in the Amazon stores where KDP print is offered: US, UK, DE, FR, ES, IT, NL, PL, SE, JP, CA and AU (UNVERIFIED). Books are printed in or near those regions (UNVERIFIED). Confirm on [KDP Help: marketplaces](https://kdp.amazon.com/en_US/help/topic/G200735500) (blocked this session).
- **Set a list price in every marketplace yourself.** Don't leave it auto-converted from USD, or you get odd prices such as £8.37. Use round local prices (section 7).
- **Board books:** KDP and IngramSpark are generally understood **not** to print true board books, because board books need offset printing (UNVERIFIED). International board-book sales would need:
  - an offset print run,
  - stock placed in each Amazon region through a Seller Central / FBA account, and
  - toy-style safety review for the EU (section 5.2).

  **Recommendation:** sell the talk-along titles internationally as **paperback picture books** first. Keep board books US-only until volume justifies an offset run.
- **Library binding** matters mainly to US and Canadian libraries. It is not an international priority.
- **Amazon Merch on Demand** (invitation-based): Amazon prints and sells the merch and pays a royalty. Amazon is the seller, so it carries the VAT and product-compliance work in the countries it covers, which include the US, UK, DE, FR, IT, ES and JP (UNVERIFIED; [merch.amazon.com](https://merch.amazon.com/)). Apply early. It is the lowest-effort way to get the slogans in front of international buyers.

**IngramSpark**
- IngramSpark feeds a global network of retailers and libraries, and prints in the US, UK and Australia plus partner printers in other countries through its "Global Connect" program (UNVERIFIED; [ingramspark.com](https://www.ingramspark.com/)).
- **Common setup (UNVERIFIED; confirm with the book-distribution lane):** KDP handles Amazon; IngramSpark handles everyone else, with KDP Expanded Distribution **off**. Use the **same ISBN** on both only if the specs match exactly. Your own ISBNs (Bowker in the US) make AlphaPlay the publisher of record worldwide.
- IngramSpark availability is how the books reach **uk.bookshop.org** and UK bookshops. UK bookshops order from UK wholesalers that IngramSpark feeds (UNVERIFIED). It is also how they reach Australian bookshops and libraries.
- The EU product-safety fields ("GPSR contact") that IngramSpark added for EU distribution must be filled in (UNVERIFIED; section 5.1).

**Bookshop.org**
- There are US and UK shops ([uk.bookshop.org](https://uk.bookshop.org/), UNVERIFIED), and reportedly more European countries since then, including Spain (UNVERIFIED).
- Authors don't upload to Bookshop.org. Titles appear because they are in the wholesaler catalog (Ingram in the US; UK wholesalers in the UK) (UNVERIFIED).
- **Join the Bookshop.org affiliate program in each country** where one exists (UNVERIFIED commission of about 10%). Point the "Buy in your country" page to it for UK and Spanish buyers who prefer independent bookshops. Disclose affiliate links (see `legal/AFFILIATE-ENDORSEMENT-DISCLOSURE.md`).

**Etsy**
- A US shop can sell to buyers worldwide. Etsy shows buyers prices in their own currency and **collects and pays VAT/GST as the marketplace** on many international orders. This covers digital items to EU and UK buyers and low-value physical goods to the EU, UK, Australia, NZ and Norway (UNVERIFIED; [Etsy Help](https://help.etsy.com/)).
- Fees to confirm: $0.20 listing fee, 6.5% transaction fee, about 3% + $0.25 payment processing in the US, **2.5% currency conversion** if the listing currency differs from your bank's currency, and Offsite Ads 12–15% when triggered (all UNVERIFIED).
- **Etsy asks for EU GPSR information** on physical listings shipped to the EU (UNVERIFIED). Until section 5.1 is done, set physical listings to **not ship to the EU**. Keep **digital listings worldwide**.
- Upload both **US Letter and A4** PDFs. BRAND.md already plans this. Mention "A4 included" in the listing title and tags for UK, EU and AU buyers.

**Teachers Pay Teachers (TpT)**
- The buyer base is mostly US, but teachers in the UK, CA and AU also buy there, and TpT sells globally in USD (UNVERIFIED; [TpT Help](https://help.teacherspayteachers.com/)).
- Seller payout is about 55% on a Basic account and 80% on a Pro account (about $59.95 per year) (UNVERIFIED). Whether TpT collects EU/UK VAT as the marketplace is **UNVERIFIED**, so confirm before listing.
- Add "UK/AU spelling version" and "A4" variants. List Spanish classroom resources in TpT's Spanish category once they exist, to reach US dual-language teachers.
- Flag: the **classroom resource pack** is covered by the employment-counsel flag in section 9. Do not list it anywhere until counsel clears it. **(added 2026-09-28) Conflict:** `commerce/storefront-setup-guide.md` §13 says to list "the teacher pack" first on Gumroad for buyers outside the US. That contradicts this hold. Reconcile it before any listing goes live, and keep the hold until counsel answers.
- UK teachers also use UK-based teacher-resource marketplaces (UNVERIFIED). Evaluate after TpT is running.

**Faire (wholesale)**
- Faire lets independent retailers in the US, Canada, the UK, many EU countries and Australia order from brands, with net-60 terms for retailers (UNVERIFIED; [faire.com](https://www.faire.com/)).
- Commission is about 15% on orders from retailers found through Faire, with a first-order fee, and 0% through your own "Faire Direct" link (UNVERIFIED).
- International orders: check how Faire handles shipping, duties and EU GPSR for US brands before switching on international wholesale (UNVERIFIED). **Recommendation:** enable US and Canada first. Add UK, EU and AU only after the EU responsible person (section 5.1) and toy classification of the card deck (section 5.2) are settled. Books and printed guides are simpler than the card deck.

**POD merch with local production**
- Printful has its own facilities in the US, Mexico, Canada, the UK, Latvia, Spain and Australia, plus partners (UNVERIFIED; [Printful](https://www.printful.com/)). Printify routes to independent print providers in the US, UK, EU, Canada, Australia and elsewhere (UNVERIFIED). Gelato reports a partner network in about 30 countries (UNVERIFIED).
- **Route each order to the facility inside the buyer's region.** Then there is no customs, delivery is fast and nothing is taxed twice. Make sure **US orders are made in the US**: the US ended its duty-free de minimis entry for most low-value imports in August 2025 (UNVERIFIED; [CBP](https://www.cbp.gov/)).
- When **you** are the seller (own site or Etsy) and a POD partner ships inside the EU, **you** are still the seller for VAT, GPSR and packaging-EPR purposes (UNVERIFIED; confirm with the POD partner and your accountant).
- **Easiest international merch route: marketplace-seller POD** (Amazon Merch on Demand; POD marketplaces where the platform is the seller). You upload designs, the platform sells, prints locally and handles VAT and compliance, and you earn a royalty (UNVERIFIED per platform; read each platform's terms on who the "seller of record" is).

### 4.3 The "Buy in your country" router (website feature)

- A small **Cloudflare Pages Function** at `/api/where` returns the visitor's country. `request.cf.country` gives "the two-letter country code … the same value as that provided in the `CF-IPCountry` header", and `request.cf.isEUCountry` returns `"1"` for EU visitors ([Cloudflare Workers Request docs](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/workers/runtime-apis/request.mdx), **[verified 2026-09-27]**). Pages Functions run on the Workers runtime ([Pages Functions docs](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/pages/functions/index.mdx), **[verified 2026-09-27]**). The IP Geolocation header is available on the **Free** plan ([Cloudflare IP geolocation](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/network/ip-geolocation.mdx), **[verified 2026-09-27]**).
- The page's JavaScript calls `/api/where` and **then** chooses which buttons to show. The HTML itself stays the same for everyone, so search engines see the same page and the cache is not split by country.
- Keep a simple table in the site repo, `data/where-to-buy.json`, mapping country → product → link. Example: `GB → play-guide → Amazon.co.uk ASIN link, uk.bookshop.org link, Etsy (A4 digital)`. Always show a "Change country" dropdown and a "Buy digital here (any country)" button.
- **Affiliate links:** Amazon Associates runs a separate program per country (UNVERIFIED). Join the UK, CA and DE programs before linking with tags. Keep the disclosure line on the router page.

---

## 5. Taxes on international sales

> **For the accountant.** This section is a map of the issues, not advice. AlphaPlay LLC is a US seller with no foreign establishment.

### 5.1 The key point: digital sales to consumers abroad

Most countries tax digital products sold to their consumers where the **buyer** lives.

| Jurisdiction | Rule for a non-resident seller of e-books, printables and online courses to consumers | Threshold before you must register | Rate (standard) | Source |
|---|---|---|---|---|
| **EU (27 countries)** | VAT at the **buyer's country rate**. One registration through the **non-Union One-Stop Shop (OSS)** in any single EU country covers all 27. | **None for non-EU sellers** (the €10,000 threshold is only for EU-established sellers) (UNVERIFIED) | For example DE 19%, FR 20%, ES 21%, IE 23%, NL 21%, IT 22%, SE 25%, PL 23% ([ibericode/vat-rates](https://raw.githubusercontent.com/ibericode/vat-rates/master/vat-rates.json), **[verified 2026-09-27]**) | [EU VAT e-commerce](https://taxation-customs.ec.europa.eu/vat-e-commerce_en) (UNVERIFIED) |
| EU **e-books** | Member states may apply reduced rates to electronic publications (Directive 2018/1713) (UNVERIFIED). Whether *printables* and *courses* count as e-books varies by country, and they usually do not (UNVERIFIED). | same | **(corrected 2026-09-28)** The dataset lists these reduced rates: DE 7%; FR 2.1%, 5.5% and 10%; ES 4% and 10%; IT 4%, 5% and 10%; IE 4.8%, 9% and 13.5%; SE 6% and 12% (**[re-read 2026-09-28]**). It does **not** say which goods each rate covers. The draft's "ES 10%, IE 9%" as e-book rates was misleading. Spain and Italy are generally reported to apply their **4%** rate to books and e-books, and Ireland has been reported to zero-rate e-books since 2023 (all UNVERIFIED). Let the MoR apply the correct rate per product. | accountant |
| EU live-streamed events | Since Jan 1, 2025, live virtual events (education, entertainment) sold to consumers are taxed where the **consumer** lives (Directive 2022/542) (UNVERIFIED). **(corrected 2026-09-28)** This does not apply here: BRAND.md bans live services, and workshops are sold only as host-it-yourself kits. | none | as above | accountant |
| **UK** | VAT registration as a non-established taxable person. **E-publications are zero-rated** (0%). Online courses and most other digital services are 20%. | **None for non-UK sellers** (UNVERIFIED) | 20% / 0% for e-books | [GOV.UK digital services VAT](https://www.gov.uk/guidance/the-vat-rules-if-you-supply-digital-services-to-private-consumers) (UNVERIFIED) |
| **Australia** | GST on imported digital products and on low-value goods of A$1,000 or less | **A$75,000** of Australian sales per year (UNVERIFIED) | 10% | [ATO](https://www.ato.gov.au/) (UNVERIFIED) |
| **Canada** | Simplified GST/HST registration for non-residents; Quebec QST separately; BC, SK and MB have their own rules | **C$30,000** of taxable sales to Canadian consumers in 12 months (UNVERIFIED) | 5–15% | [CRA](https://www.canada.ca/en/revenue-agency.html) (UNVERIFIED) |
| **New Zealand** | GST on remote services | **NZ$60,000** per year (UNVERIFIED) | 15% | [IRD](https://www.ird.govt.nz/) (UNVERIFIED) |
| Norway | VOEC | NOK 50,000 (UNVERIFIED) | 25% | Skatteetaten (UNVERIFIED) |
| Switzerland | VAT on e-services | CHF 100,000 of worldwide turnover (UNVERIFIED) | 8.1% | ESTV (UNVERIFIED) |
| Mexico | VAT on foreign digital services; register with SAT | Generally none (UNVERIFIED) | 16% | SAT (UNVERIFIED) |
| Japan | Consumption tax on cross-border digital services | about ¥10 million of taxable sales (UNVERIFIED) | 10% | NTA (UNVERIFIED) |

**What this means:** **the EU and the UK are the only big markets where a small US seller owes VAT from the very first digital sale.** Australia, Canada and New Zealand have thresholds that AlphaPlay is unlikely to reach at first, but track sales per country anyway. A **merchant of record** removes the EU/UK VAT problem for sales through its checkout. **(corrected 2026-09-28)** An earlier draft asked about VAT on coaching. BRAND.md rule 19 bans coaching and live services, so that question is dropped. Ask the accountant instead how VAT applies to **workshop kits** sold to UK or EU groups and organizations that are business customers (B2B) rather than consumers.

**Thresholds, all UNVERIFIED** (the sites were blocked on both review passes):
- Australia: A$75,000
- Canada: C$30,000 over 12 months
- New Zealand: NZ$60,000
- Norway: NOK 50,000
- Switzerland: CHF 100,000 of worldwide turnover

These match general knowledge and `legal/LEGAL-LAUNCH-CHECKLIST.md` row 33. Confirm each at the ATO, CRA or IRD before relying on it.

### 5.2 Merchant of record vs "your own checkout plus a tax calculator"

A **merchant of record** is legally the seller to the customer. It charges and pays the VAT/GST, handles chargebacks and issues invoices, then pays you the net amount. A **tax calculator** (Stripe Tax, Shopify Tax) only **calculates** tax. **You** still register, file and pay in every country.

| Option | Role | Fees (all UNVERIFIED; check pricing pages) | Sells physical goods? | Fit for Play Before Pixels |
|---|---|---|---|---|
| **Lemon Squeezy** (owned by Stripe since 2024, UNVERIFIED) | MoR | About 5% + $0.50 per transaction, with extra percentages reported for non-US buyers and PayPal ([pricing](https://www.lemonsqueezy.com/pricing)) | No (digital only) | Works for printables, eBooks and the course, and its hosted checkout and overlay run on a static Cloudflare Pages site. **(corrected 2026-09-28)** `commerce/storefront-setup-guide.md` Part E rejects it because its future after the Stripe acquisition is uncertain (UNVERIFIED). Treat it as a fallback only. |
| **Paddle** | MoR | About 5% + $0.50 ([pricing](https://www.paddle.com/pricing)) | No | **Probably not eligible.** Paddle focuses on software and SaaS and has historically declined e-books, courses and coaching (UNVERIFIED). Ask before applying. |
| **Gumroad** | MoR for all sales since Jan 1, 2025 (UNVERIFIED) | About 10% + $0.50 on direct sales; more on sales through Gumroad's Discover marketplace ([gumroad.com/pricing](https://gumroad.com/pricing)) | Limited | The simplest setup but the highest fee. Fine as a fallback. |
| **Payhip** | Handles EU and UK VAT on digital products for you (UNVERIFIED how, formally) | Free plan 5% per sale; about $29/mo for 2%; about $99/mo for 0%; plus Stripe/PayPal processing ([payhip.com/pricing](https://payhip.com/pricing)) | Yes (VAT handling covers digital only) | Sells digital products, courses and memberships in one place. **(corrected 2026-09-28)** The coaching-bookings mention was removed (BRAND.md bans coaching). The commerce lane says Payhip is **not** the merchant of record for US sales tax. **Confirm in writing whether Payhip is the legal seller for EU/UK VAT** or only calculates and pays it on your behalf. The commerce plan says to choose Gumroad **or** Payhip, not both. |
| **Shopify + Shopify Markets** | You are the seller | Basic plan about $39/mo (less if paid yearly). Shopify Payments about 2.9% + $0.30 per US online sale, plus extra for international cards and currency conversion. Shopify Tax is free up to $100k of US sales, then about 0.35%. **Shopify Managed Markets** (Shopify acting as MoR for international **physical** goods) is about 6.5% extra and US merchants only ([shopify.com/pricing](https://www.shopify.com/pricing)) | Yes | Best if you later run a real physical-goods store. **For digital sales to the EU and UK you would still register for VAT yourself** unless you use an MoR app. |
| **Stripe + Stripe Tax** | You are the seller | Stripe about 2.9% + $0.30 (US cards), about +1.5% for international cards, about +1% for currency conversion. Stripe Tax about 0.5% per transaction where you are registered ([stripe.com/pricing](https://stripe.com/pricing)). Stripe has also been piloting its own MoR option (UNVERIFIED). | Yes | Only if you want to register for EU OSS and UK VAT yourself. Not recommended at launch. |
| Course platforms (Teachable, Thinkific, Podia and similar) | Some act as MoR for EU/UK VAT on their own payment option (UNVERIFIED per platform) | Monthly plan plus fees | No | Consider if the course needs features an MoR store lacks: drip lessons, quizzes, community. |

**Recommendation (for the accountant to confirm):**
1. **(corrected 2026-09-28) At launch, sell international digital products through one MoR, and make it the same one the commerce lane uses.** `commerce/storefront-setup-guide.md` §13 picks **Gumroad**, reported to be merchant of record for all sales since Jan 1, 2025, at about 10% + $0.50 (UNVERIFIED). That costs about 5 points more than the alternatives but is one account and one 1099. Use Payhip instead only if it confirms in writing that it handles EU/UK VAT as the seller. Do not run two digital checkouts. Link or embed the checkout from the Cloudflare Pages site.
2. **Sell physical goods to the US** through a simple US store (Shopify Starter or Basic, or the MoR's physical-goods option), with Maryland and other US state sales tax handled by the US-tax lane.
3. **Physical goods abroad go through marketplaces**, which collect the VAT as the marketplace in most of these countries.
4. Revisit Shopify Markets or Managed Markets only once international physical sales pass roughly $1,000 a month.

### 5.3 Physical goods shipped into other countries (for later, door C)

- **EU:** import VAT is charged on every parcel. The **Import One-Stop Shop (IOSS)** lets a seller charge EU VAT at checkout on parcels worth €150 or less, so the buyer pays no fees at the door. A non-EU seller normally needs an **EU intermediary** for IOSS (UNVERIFIED). The EU has agreed to **remove the €150 customs-duty exemption** and reportedly began charging a flat **€3** customs duty from **July 1, 2026**, as a stopgap until the planned EU customs data hub. It is reported to apply per item category in the parcel, not per parcel (UNVERIFIED on both review passes; the Council and Commission sites were blocked; [EU Taxation and Customs Union](https://taxation-customs.ec.europa.eu/)). Printed books usually carry 0% duty; apparel carries duty (UNVERIFIED).
- **UK:** for parcels worth £135 or less, the **seller** must charge UK VAT at checkout and must therefore be VAT-registered, unless an online marketplace is the seller (UNVERIFIED; [GOV.UK](https://www.gov.uk/)). Printed books are zero-rated (UNVERIFIED).
- **Canada / Australia:** duties and taxes on low-value parcels, collected from the buyer at the door or by the carrier unless the seller registers (UNVERIFIED).
- **This is why door C stays US-only at launch.**

---

## 6. Product safety and consumer law abroad

### 6.1 EU General Product Safety Regulation (GPSR): Regulation (EU) 2023/988

- **Applies from Dec 13, 2024** to **all non-food consumer products** placed on the EU market unless a more specific EU law covers that aspect. That **includes books, printed guides, card decks and apparel** (UNVERIFIED; [Regulation 2023/988 on EUR-Lex](https://eur-lex.europa.eu/eli/reg/2023/988/oj/eng), blocked this session).
- **Online sales count** when the offer is **aimed at EU consumers**: shipping to the EU, EU-language pages or prices in euros (UNVERIFIED; GPSR Art. 4 read with the Market Surveillance Regulation).
- **EU responsible person.** A product may be placed on the EU market only if an **economic operator established in the EU** is responsible for it. That can be the manufacturer, the importer, an **authorised representative** or a **fulfilment service provider** (UNVERIFIED; GPSR Art. 16). A US seller shipping directly **must appoint one**. Its name, postal address and email must appear **on the product or packaging** and **in the online listing**.
- **Online listing must show** (UNVERIFIED; GPSR Art. 19):
  - the manufacturer's name, postal address and electronic address,
  - the EU responsible person,
  - product identification (for example ISBN or SKU) with a picture,
  - warnings and safety information in the buyer's language.
- **Marketplaces enforce this.** Amazon, Etsy and IngramSpark ask for GPSR fields for EU sales (UNVERIFIED per marketplace). When **Amazon or another retailer is the seller** of a KDP or IngramSpark book, it generally takes the importer or distributor role. **You still supply the publisher contact details.**
- **Cost:** EU authorised-representative / GPSR responsible-person services run roughly **€100–€600 per year** for a small catalog (UNVERIFIED estimate). Get quotes from two services.
- **Action:** Before **any** physical listing ships to the EU, including Etsy, Faire EU and own-site DTC, either:
  - (a) appoint an EU responsible person and add its details to labels, listings and IngramSpark/KDP fields, or
  - (b) block EU shipping for that listing.

  Northern Ireland follows EU GPSR rules under the Windsor Framework (UNVERIFIED).

### 6.2 EU toy safety: the card deck and possibly the board books

- The EU **Toy Safety Directive 2009/48/EC** covers products "designed or intended, whether or not exclusively, for use in play by children under 14 years of age" (UNVERIFIED). A **new Toy Safety Regulation** was adopted in late 2025 (reportedly Regulation (EU) 2025/2509). It adds a digital product passport and tighter chemical rules. It reportedly applies only after a transition of about 4.5 years, so the **Directive still governs sales in 2026** (UNVERIFIED; [EU toy safety](https://single-market-economy.ec.europa.eu/sectors/toys/toy-safety_en)).
- **Card deck.** If children use it to play, it is probably a **toy** in the EU. That means CE marking, EN 71-1/2/3 testing, technical documentation, a Declaration of Conformity, an EU importer or authorised representative and warnings in each language (UNVERIFIED). Testing typically costs **several hundred to over $1,000 per product** (UNVERIFIED estimate).
  - **Option 1:** do not ship the card deck into the EU or UK until tested.
  - **Option 2:** design and market it as an **adult-facing conversation-prompt deck** ("for parents and educators to use with children"). Even then, toy status depends on the product as a whole, not just the label, so get a compliance opinion (UNVERIFIED).
- **Paper and board books.** Ordinary books are generally not treated as toys. Board books made for babies, and books with play features (flaps, textures, cut-outs), can be borderline (UNVERIFIED). Get a toy-classification opinion before EU sales of any board book.
- **US counterpart (cross-reference only):** the US children's-product rules (CPSIA) for the card deck belong in the US-legal lane.

### 6.3 United Kingdom

- **Great Britain** did not adopt the EU GPSR. The **General Product Safety Regulations 2005** still apply. The **Product Regulation and Metrology Act 2025** allows new rules, including duties for online marketplaces (UNVERIFIED; [legislation.gov.uk](https://www.legislation.gov.uk/)).
- **Toys** sold into GB fall under the **Toys (Safety) Regulations 2011**, with a **UK importer** or authorised-representative address and UKCA or CE marking (UNVERIFIED). This is the same card-deck decision as 6.2.
- **Consumer Contracts Regulations 2013:** a 14-day cancellation right with a digital-content waiver, mirroring the EU (6.7).
- **Digital Markets, Competition and Consumers Act 2024:** bans "drip pricing", so mandatory fees must be included in the headline price (UNVERIFIED in force from April 2025). New **subscription-contract rules** are being phased in (UNVERIFIED timing). They matter if the course or any membership renews automatically.
- **UK advertising rules** (the CAP Code, enforced by the ASA): no misleading claims, and affiliate or paid content must be labelled, for example "#ad" (UNVERIFIED; [asa.org.uk](https://www.asa.org.uk/)). This reinforces the no-health-claims rule.

### 6.4 Canada

- **Canada Consumer Product Safety Act (CCPSA)** covers consumer products. The **Toys Regulations** cover products for children's play (UNVERIFIED; [Health Canada](https://www.canada.ca/en/health-canada/services/consumer-product-safety.html)). This is the same card-deck question.
- **Textile Labelling Act.** Consumer textile articles, such as T-shirts and hoodies, need a **fibre-content label in English and French** and a **dealer identity**: the dealer's name and postal address, or a **CA identification number** (UNVERIFIED; [Competition Bureau](https://competition-bureau.canada.ca/)). Before selling merch to Canada, confirm the POD partner's labels meet this. Printful and similar partners offer labels for Canada (UNVERIFIED), or you can register a free CA number.
- **Consumer Packaging and Labelling Act:** bilingual labelling for prepackaged consumer goods (UNVERIFIED).
- **Quebec Charter of the French Language** (as amended by Bill 96; stricter rules from June 1, 2025): products, packaging, and **commercial websites and contracts aimed at Quebec consumers** must be available in French, with French at least as prominent (UNVERIFIED; [OQLF](https://www.oqlf.gouv.qc.ca/)). **Practical rule:** until a French version exists, do not target Quebec with ads or French-language marketing. English digital sales to Canadians who find the site themselves are lower risk, but ask counsel.
- **CASL (anti-spam law)** needs express opt-in consent for commercial emails to Canadians. It is stricter than US CAN-SPAM (UNVERIFIED; [fightspam.gc.ca](https://crtc.gc.ca/eng/internet/anti.htm)).

### 6.5 Australia and New Zealand

- The **Australian Consumer Law** gives consumer guarantees that **overseas sellers cannot exclude**, including a remedy for faulty goods and digital products. A blanket "no refunds" line is prohibited (UNVERIFIED; [ACCC](https://www.accc.gov.au/)). The digital-refund wording in `legal/SHIPPING-RETURNS-REFUNDS.md` already says local rights apply. Keep that sentence.
- **Mandatory safety standards** (for example toys for children up to 36 months and small parts) apply to anything toy-like (UNVERIFIED; [productsafety.gov.au](https://www.productsafety.gov.au/)).
- **Spam Act 2003:** consent plus identification plus an unsubscribe link (UNVERIFIED).
- **New Zealand:** Consumer Guarantees Act and Fair Trading Act, with similar principles (UNVERIFIED).

### 6.6 Privacy: GDPR, UK GDPR and others, for the email list and customers

- The **GDPR applies to a non-EU business** that offers goods or services to people in the EU, for example with EU shipping, euro prices or EU-language pages (Art. 3(2)) (UNVERIFIED; [EDPB](https://www.edpb.europa.eu/)). The UK GDPR has the same rule for the UK.
- **Art. 27 representative.** A non-EU controller subject to the GDPR must appoint an **EU representative**, and similarly a **UK representative**, unless the processing is *occasional* and low-risk (UNVERIFIED). A continuously running email list is arguably not "occasional". Cost is roughly **€100–€600 per year each** (UNVERIFIED). `legal/PRIVACY-POLICY.md` §7 already flags this for the attorney. **Decide before the first EU/UK-targeted campaign.**
- **Email consent:** use **double opt-in** for everyone, which is standard practice in Germany and good evidence of consent everywhere. Leave the marketing box unticked. Under the UK's PECR marketing-email rules, a "soft opt-in" for existing customers allows marketing of *similar* products only (UNVERIFIED).
- **Cookies:** keep analytics cookieless. Cloudflare Web Analytics "does not collect or use your visitors' personal data" ([Cloudflare Web Analytics](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/web-analytics/about.mdx), **[verified 2026-09-27; re-read 2026-09-28]**). **(corrected 2026-09-28)** Neither that page nor the [Web Analytics FAQ](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/web-analytics/faq.mdx) says anything about cookies or local storage. That the tool is cookieless is UNVERIFIED. "No consent banner needed" is also a legal conclusion under the ePrivacy rules and UK PECR, so the attorney must confirm it. Check in the browser's developer tools that nothing is stored on the device. If you add any ad pixel or third-party embed later, use a consent tool first. Cloudflare Zaraz includes a consent-management modal that controls when third-party tools load ([Zaraz consent](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/zaraz/consent-management/index.mdx), **[verified 2026-09-27]**; pricing not stated there).
- **US data transfers:** choose email, checkout and course providers certified under the **EU-US Data Privacy Framework** (and the UK Extension), or providers that offer standard contractual clauses (UNVERIFIED; [dataprivacyframework.gov](https://www.dataprivacyframework.gov/)).
- **Children's data:** the site is for adults. The UK Information Commissioner's **Children's Code** applies to online services "likely to be accessed by children" (UNVERIFIED; [ico.org.uk](https://ico.org.uk/)). Keep the site adult-directed, never invite children to sign up, and keep the existing privacy-policy wording.

### 6.7 EU/UK 14-day right of withdrawal for digital content and courses, and how to get the waiver

- **The rule.** EU consumers have **14 days** to withdraw from distance contracts (Consumer Rights Directive 2011/83/EU, Art. 9). For **digital content not on a physical medium** (downloads, a pre-recorded course), the right is **lost** only if **all three** of these are true (UNVERIFIED; Art. 16(m), as amended by Directive (EU) 2019/2161):
  1. delivery began **with the consumer's prior express consent**;
  2. the consumer **acknowledged** losing the right; **and**
  3. the trader sent a **confirmation** of the contract, including that consent and acknowledgment, **on a durable medium**, such as the order-confirmation email.

  The UK equivalent is the Consumer Contracts Regulations 2013, reg. 37 (UNVERIFIED).
- **Checkout wording.** The box must be **unticked by default** and required for immediate access:

  > ☐ I want immediate access to my download/course. I understand that once delivery begins I lose my 14-day right to cancel.

  Repeat that sentence in the **order-confirmation email**.
- **If the waiver is missing**, the buyer can cancel within 14 days and owes nothing for digital content already used (UNVERIFIED).
- **(corrected 2026-09-28) Services:** none are sold. BRAND.md rule 19 bans coaching and live services, so the earlier advice on a coaching checkbox is removed. A downloadable **workshop kit** is digital content and follows the waiver rule above.
- **Physical POD items:** the "made to the consumer's specifications" exception probably does **not** cover standard sizes and designs (UNVERIFIED). `SHIPPING-RETURNS-REFUNDS.md` already flags this. For EU/UK buyers, allow 14-day returns on merch, or sell merch there only through marketplace-seller POD.
- **New EU "withdrawal button":** Directive (EU) 2023/2673 added a requirement for an **easy online withdrawal function** for distance contracts concluded through a website, **applicable from June 19, 2026** (UNVERIFIED). If the site sells to EU consumers directly, ask the MoR whether its checkout provides this. If not, add a clearly labelled "Withdraw from contract here" link or form.
- **An MoR does not remove this.** The MoR is the seller, so it usually runs the withdrawal flow and the waiver. **Confirm the MoR's checkout shows the waiver checkbox** and sends the durable-medium confirmation.

### 6.8 Country-specific traps for books and packaging

- **France, fixed book price (Loi Lang, 1981):** every seller must sell a new book to French buyers at the price the publisher sets. Discounts are capped at 5%, and online sellers may not ship books for free. A **minimum shipping charge (€3 on orders under €35)** applies under the 2021 "Darcos" law and its 2023 decree (UNVERIFIED; [Légifrance](https://www.legifrance.gouv.fr/)). AlphaPlay is the publisher, so **set one French price for each French-market book and never run French book "sales."**
- **Germany, fixed book price (Buchpreisbindungsgesetz):** similar rules for books sold to end buyers in Germany. Applicability to imported English-language editions is **UNVERIFIED**, so ask counsel before the German phase.
- **Germany, Impressum:** websites aimed at German users need a legal-notice page ("Impressum") with company name, address, email and register details. The rule is now in §5 of the Digital Services Act implementing law (DDG), which replaced the old Telemediengesetz (TMG) in May 2024 (UNVERIFIED). Add `/de/impressum/` when `/de/` launches. It is low effort.
- **Packaging, paper and textile take-back laws (EPR):**
  - **Germany's Packaging Act (VerpackG)** requires **LUCID registration** and a paid packaging-take-back contract for any company that first puts packaged goods into German households, **including foreign online sellers** (UNVERIFIED; [LUCID](https://lucid.verpackungsregister.org/)).
  - **France** has EPR for packaging, **graphic paper (books)** and **textiles**, with unique ID numbers (UNVERIFIED).
  - The EU's new **Packaging and Packaging Waste Regulation (EU) 2025/40** applies from **August 12, 2026** and requires non-EU producers to appoint an authorised representative for EPR (UNVERIFIED).
  - Amazon requires sellers to supply EPR numbers for DE and FR (UNVERIFIED). **When a marketplace or KDP/IngramSpark retailer is the seller, it is normally the "producer"** (UNVERIFIED). This is the strongest reason to keep EU physical sales on marketplaces.
- **EU price-reduction rule:** any "was €X, now €Y" claim must use the **lowest price in the previous 30 days** as the "was" price (Price Indication Directive, Art. 6a) (UNVERIFIED).
- **European Accessibility Act:** applies from June 28, 2025 to e-books and e-commerce. **Microenterprises** (fewer than 10 staff and turnover of €2 million or less) providing services are exempt (UNVERIFIED). Still, make EPUBs accessible (alt text, reading order). It costs little, helps libraries (audience C) and supports `legal/ACCESSIBILITY-STATEMENT.md`.

### 6.9 Can each product be sold directly into each region now?

| Product | US | UK | CA | AU/NZ | EU |
|---|---|---|---|---|---|
| Printables, digital guide, eBook | ✔ | ✔ via MoR | ✔ | ✔ | ✔ via MoR |
| Online course | ✔ | ✔ via MoR plus waiver | ✔ | ✔ | ✔ via MoR plus waiver |
| Workshop kits (host-it-yourself, digital) (corrected 2026-09-28; coaching and live workshops removed per BRAND.md rule 19) | ✔ | ✔ via MoR plus waiver | ✔ | ✔ | ✔ via MoR plus waiver |
| Paperback / hardcover books | ✔ | via Amazon, Bookshop UK and IngramSpark | via Amazon and IngramSpark | via Amazon and IngramSpark | **via marketplaces only** (GPSR contact fields filled in) |
| Board books | ✔ (US-lane compliance) | later (toy check) | later | later | later (toy classification plus GPSR) |
| Card deck | ✔ (US-lane children's-product check) | **hold** (toy question) | **hold** (toy question) | **hold** | **hold** (toy question plus GPSR plus EPR) |
| Apparel / merch | ✔ | via marketplace-seller POD, or POD made in the UK | POD made in Canada with a CA-compliant label | POD made in Australia | via marketplace-seller POD only, until the responsible person and EPR are handled |
| Classroom resource pack | **blocked until employment counsel clears it** (section 9) | same | same | same | same |

---

## 7. Currency display and shipping expectations

### 7.1 Currency

- **Show local currency** for USD, GBP, EUR, CAD, AUD and NZD. Show everything else in USD with an "approximately" conversion.
- **Include tax in displayed prices** in the UK, EU, Australia and New Zealand, where consumers expect and the law requires final prices including VAT/GST (UNVERIFIED). Show prices **before tax** in the US and Canada, where tax is added at checkout.
- MoRs (Lemon Squeezy, Payhip, Gumroad) and Etsy convert and show local prices at checkout (UNVERIFIED per provider). Set **round, hand-picked prices** where the provider allows it, rather than raw exchange-rate conversions.

| Example product | US | UK (incl. VAT) | EU (incl. VAT) | CA | AU (incl. GST) |
|---|---|---|---|---|---|
| Printable bundle | $12 | £10 | €12 | C$16 | A$18 |
| 100-activity play guide (digital) | $19 | £16 | €19 | C$26 | A$29 |
| "30 Days of Back-and-Forth" course | $79 | £69 | €79 | C$109 | A$119 |

These prices are illustrative, not researched. Set real prices in the pricing lane.

- On the static site, the currency label comes from the `/api/where` Pages Function (section 4.3). The HTML stays the same for everyone, and the price widget updates in the browser. The final charged amount always comes from the MoR checkout, so a wrong guess costs nothing.
- **Payouts:** have international MoR, Etsy and KDP royalties paid into the LLC's US bank account in USD at first. Consider a multi-currency business account only once foreign revenue is meaningful. Watch the conversion fees (for example Etsy's 2.5%, UNVERIFIED).

### 7.2 Shipping expectations

- UK, EU and Australian shoppers are used to delivery in **1–5 days** from domestic marketplaces (UNVERIFIED; this is general market expectation). US-to-overseas parcel post commonly takes **1–3 weeks**, and parcels of books can cost **about $15–$35** in postage (UNVERIFIED; check the [USPS international calculator](https://ircalc.usps.com/)). That price and delay loses the sale. **Local printing through the marketplace or POD is the answer.**
- On every product page, show the **delivery estimate and who ships** ("Printed in the UK and shipped by Amazon"). Also state **"No customs fees"** when an item is made in the buyer's region.
- For any future DTC shipping abroad, prefer **Delivered Duty Paid** (seller pays duties, no fees at the door), or the IOSS route for the EU and the £135 route for the UK. Surprise courier and handling fees are the top reason for refused parcels and bad reviews (UNVERIFIED). `SHIPPING-RETURNS-REFUNDS.md` already has the DDP/DAP choice. Choose **DDP** or "marketplace only."
- Printables and eBooks have **no shipping**. Lead every international ad and every language landing page with the **digital product** and let the physical product follow.

---

## 8. Translation plan and costs

### 8.1 Principles

1. **Translate what earns first.** Start with the pages and products that get search traffic and sell digitally worldwide: site pages, the play guide and printables. Books and the course come next.
2. **Children's books and slogans need transcreation, not translation.** Rhythm, rhyme and "talk-along" prompts must work aloud. Hire a native children's-book translator for books and card prompts. Machine output is acceptable only as a first draft.
3. **AI plus professional review** is fine for the website, printables instructions, emails and course transcripts. Budget a full human **post-edit** (a reviewer corrects the machine draft line by line), not a skim.
4. **Legal pages** (terms, privacy, refunds, the withdrawal waiver) must be **translated and then checked by a lawyer licensed in that market**. French and Quebec law require French for consumer terms (UNVERIFIED).
5. **Every translator and reviewer gets the BRAND.md "do-not-say" list, translated.** That means no health or medical claims, no "therapy" words, no naming or criticizing any school, district, company or EdTech product, and no implication that the founder is a speech-language pathologist. Terms like "retraso" (delay), "thérapie" (therapy) and "Förderung" (support/therapy) need a native reviewer's eye for implied clinical meaning. The "Play Before Pixels Research Notes" research hub should **not be translated** until a native reviewer confirms the title and summaries make no clinical claim in that language.
6. **Do not recruit translators or reviewers from the founder's school system** (see section 9). Use independent professionals found through translator associations or vetted freelance platforms.
7. **Language variants:**
   - one Spanish (`es`, neutral Latin American base) with a short Spain review pass;
   - one French (`fr`) with a Quebec review pass;
   - one German (`de`) that works for Germany, Austria and Switzerland;
   - Brazilian Portuguese (`pt-BR`).

### 8.2 Cost estimates per language (all UNVERIFIED estimates)

Assumed rates:

- **human translation:** about **$0.12–$0.20 per word** (use $0.15);
- **AI draft plus professional post-edit:** about **$0.05–$0.09 per word** (use $0.07);
- **children's-book transcreation:** a **flat $200–$800 per title**;
- **legal review:** about **$500–$1,500 per market**.

Confirm rates with two or three quotes, for example through the American Translators Association directory ([atanet.org](https://www.atanet.org/), UNVERIFIED) or national translator associations. Machine-translation tools (such as DeepL Pro) cost a small monthly fee (UNVERIFIED).

| Item | Est. words | Human ($0.15) | AI + post-edit ($0.07) | Notes |
|---|---|---|---|---|
| Website core (home, product pages, about, FAQ, "Buy in your country") | 6,000 | $900 | $420 | Plus translated slugs and alt text |
| Legal pages (terms, privacy, refunds, kit licence, disclaimer) | 8,000 | $1,200 | not recommended | Plus local legal review of $500–$1,500 |
| 100-activity play guide | 20,000 | $3,000 | $1,400 | Plus about $300–$600 to re-typeset each language |
| Printable bundle(s) | 5,000 | $750 | $350 | US Letter and A4 versions |
| Email welcome sequence and product emails | 5,000 | $750 | $350 | |
| Card deck (about 100 cards) | 2,500 | $375 | transcreate | Only after the toy question is settled |
| Two talk-along picture books | about 1,400 | $400–$1,600 flat | transcreate | Bilingual English/Spanish edition recommended |
| Two board books | about 300 | $300–$800 flat | transcreate | US bilingual edition only at first |
| "30 Days of Back-and-Forth" course (text plus video transcripts) | 24,000 | $3,600 | $1,700 | Subtitles first; AI voice dubbing later, reviewed by a native speaker |
| Classroom resource pack | 10,000 | $1,500 | $700 | **Blocked pending employment counsel (section 9)** |

**Phase budgets per language (rough):**
- **Phase 2, Spanish "starter"** (site core, legal pages plus review, play guide, printables, emails, one bilingual picture book): human about **$7,900–$9,000**; AI plus post-edit where allowed about **$4,700–$5,800**.
- **Full catalog per language, excluding the classroom pack:** about **$13,000** human or **$8,000** mixed.
- **Recommendation:** Spanish mixed (about $5,000) in months 4–9. French (with the Quebec pass) and German at "starter" level in months 9–18, and only if Spanish pages reach traffic and sales targets. Portuguese digital-only (site plus printables plus play guide, about $2,500 mixed) after that.
- **English localization** for the UK and AU (spelling, "mum", "nursery", "kindy", A4 files): about **2–4 hours of in-house editing**. No translator needed.

---

## 9. Flag for the founder's employment counsel only

The founder is a Maryland public-school employee. Several parts of this plan may touch **outside-employment** and **ownership of teaching-materials** questions. These are **flagged for her own employment counsel to decide**. They were **not researched against her employer's records**, and **no school-system employee should be contacted** about them:

- the **classroom resource pack** and any **translated or localized versions** of it (sections 4.2 and 8), including listing it on TpT or selling it internationally;
- **educator-facing workshop kits** marketed to international teacher audiences (coaching and live workshops are banned outright by BRAND.md rule 19);
- recruiting any translator, reviewer or tester from **her school system** (don't; see section 8.1);
- any wording in foreign-language marketing that refers to her teaching role.

Until counsel answers, the international plan goes ahead with the **parent-facing products only** (books, play guide, printables, course, merch).

---

## 10. Action checklist

| # | Action | When | Est. cost | Owner |
|---|---|---|---|---|
| 1 | Add `lang` attributes; build the English site with a subfolder-ready structure (Astro i18n, `prefixDefaultLocale: false`) and the sitemap `i18n` option | Before launch | $0 | Web |
| 2 | Cloudflare: turn on IP Geolocation and Crawler Hints; in AI bot policies keep Search and Agent **allowed** | Before launch | $0 | Web |
| 3 | Google Search Console Domain property plus sitemap; Bing Webmaster Tools import | Before launch | $0 | Founder |
| 4 | (corrected 2026-09-28) Use the commerce lane's single MoR for digital products (Gumroad; Payhip only if it confirms it handles EU/UK VAT as the seller); get written confirmation of EU/UK VAT handling, the waiver checkbox, the confirmation email and the withdrawal function | Before the first sale | about 5% of sales plus processing (UNVERIFIED) | Founder plus accountant |
| 5 | "Buy in your country" router page with `where-to-buy.json` and a country selector | Before launch | $0 | Web |
| 6 | Set hand-picked local list prices in KDP (every marketplace), Etsy and the MoR | Before the first sale | $0 | Founder |
| 7 | Etsy and TpT: digital listings worldwide (Letter plus A4); physical listings **not shipped to the EU** until item 9 is done | Before the first sale | Etsy and TpT fees | Founder |
| 8 | IngramSpark setup for non-Amazon retail plus Bookshop.org affiliate accounts (US, UK) | Within 90 days | IngramSpark fees (UNVERIFIED) | Book lane |
| 9 | Appoint an EU GPSR responsible person; add details to IngramSpark/KDP/Etsy fields and labels | Within 90 days (before any EU physical sale) | about €100–€600/yr (UNVERIFIED) | Founder plus attorney |
| 10 | Card-deck toy-classification opinion (EU, UK, CA, AU) before any non-US sale | Within 90 days | $300–$1,500 plus testing if needed (UNVERIFIED) | Compliance consultant |
| 11 | Decide on GDPR Art. 27 EU and UK representatives; double opt-in email; DPF-certified providers | Before the first EU/UK-targeted campaign | about €100–€600/yr each (UNVERIFIED) | Attorney |
| 12 | Apply for Amazon Merch on Demand; set POD routing so each region is served locally, with US orders made in the US | Within 90 days | $0 | Merch lane |
| 13 | Canada merch: bilingual fibre labels plus a CA dealer number | Before the first Canadian merch sale | $0–low (UNVERIFIED) | Merch lane |
| 14 | Google Merchant Center free listings, starting with digital products | Within 90 days | $0 | Web |
| 15 | Spanish phase: `/es/` site core, legal pages plus review, play guide, printables, emails, bilingual picture book | Months 4–9 | about $5,000 mixed | Founder plus translators |
| 16 | Track sales by country monthly against the AU A$75k, CA C$30k and NZ NZ$60k thresholds | Monthly | $0 | Bookkeeper |
| 17 | French (plus Quebec) and German starter phases; `/de/impressum/`; fixed-book-price rules; packaging/EPR review if any direct shipping | Months 9–18 | about $5,000 each mixed plus legal review | Founder plus attorney |
| 18 | Brazilian Portuguese, digital only | Months 18+ | about $2,500 mixed | Founder |
| 19 | Employment-counsel sign-off before the classroom pack or educator products go anywhere (section 9) | Before listing | counsel fee | Founder's own counsel |

---

## 11. Sources

**Read live on 2026-09-27 (verified):**
- Cloudflare IP geolocation (`CF-IPCountry`, Free plan): https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/network/ip-geolocation.mdx
- Cloudflare visitor-location managed transform: https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/rules/transform/managed-transforms/reference.mdx
- Cloudflare Workers `request.cf.country` / `isEUCountry`: https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/workers/runtime-apis/request.mdx
- Cloudflare Pages Functions: https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/pages/functions/index.mdx
- Cloudflare Pages `_redirects` (no country redirects; 2,000 static + 100 dynamic limit): https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/pages/configuration/redirects.mdx
- Cloudflare Crawler Hints / IndexNow (all plans): https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/cache/advanced-configuration/crawler-hints.mdx
- Cloudflare AI bot blocking and the Sept 15, 2026 defaults: https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/bots/additional-configurations/block-ai-bots.mdx
- Cloudflare Web Analytics privacy: https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/web-analytics/about.mdx
- Cloudflare Zaraz consent management: https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/zaraz/consent-management/index.mdx
- Cloudflare Registrar at-cost pricing: https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/registrar/about.mdx
- Astro i18n routing: https://raw.githubusercontent.com/withastro/docs/main/src/content/docs/en/guides/internationalization.mdx
- Astro sitemap i18n (hreflang in sitemap): https://raw.githubusercontent.com/withastro/docs/main/src/content/docs/en/guides/integrations-guide/sitemap.mdx
- MDN `<link hreflang>`: https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/html/reference/elements/link/index.md
- EU VAT rates dataset: https://raw.githubusercontent.com/ibericode/vat-rates/master/vat-rates.json
- (re-read 2026-09-28) Cloudflare Web Analytics FAQ (no statement on cookies): https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/web-analytics/faq.mdx
- (re-read 2026-09-28) Astro i18n routing (no automatic language redirect; no x-default): https://raw.githubusercontent.com/withastro/docs/main/src/content/docs/en/guides/internationalization.mdx

**To confirm (UNVERIFIED this session; blocked or not searchable):**
- Google: [multi-regional sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites), [localized versions / hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions), [Search Console Help](https://support.google.com/webmasters/), [Merchant Center Help](https://support.google.com/merchants/)
- Marketplaces: [KDP marketplaces](https://kdp.amazon.com/en_US/help/topic/G200735500), [IngramSpark](https://www.ingramspark.com/), [uk.bookshop.org](https://uk.bookshop.org/), [Etsy Help](https://help.etsy.com/), [TpT Help](https://help.teacherspayteachers.com/), [Faire](https://www.faire.com/), [Printful](https://www.printful.com/), [Amazon Merch on Demand](https://merch.amazon.com/)
- Payments and MoR: [Lemon Squeezy pricing](https://www.lemonsqueezy.com/pricing), [Paddle pricing](https://www.paddle.com/pricing), [Gumroad pricing](https://gumroad.com/pricing), [Payhip pricing](https://payhip.com/pricing), [Shopify pricing](https://www.shopify.com/pricing), [Stripe pricing](https://stripe.com/pricing)
- Tax: [EU VAT e-commerce](https://taxation-customs.ec.europa.eu/vat-e-commerce_en), [GOV.UK digital services VAT](https://www.gov.uk/guidance/the-vat-rules-if-you-supply-digital-services-to-private-consumers), [ATO](https://www.ato.gov.au/), [CRA](https://www.canada.ca/en/revenue-agency.html), [IRD NZ](https://www.ird.govt.nz/)
- Product safety and consumer law: [GPSR 2023/988](https://eur-lex.europa.eu/eli/reg/2023/988/oj/eng), [EU toy safety](https://single-market-economy.ec.europa.eu/sectors/toys/toy-safety_en), [legislation.gov.uk](https://www.legislation.gov.uk/), [Health Canada consumer product safety](https://www.canada.ca/en/health-canada/services/consumer-product-safety.html), [Competition Bureau textile labelling](https://competition-bureau.canada.ca/), [OQLF](https://www.oqlf.gouv.qc.ca/), [ACCC](https://www.accc.gov.au/), [productsafety.gov.au](https://www.productsafety.gov.au/), [Légifrance](https://www.legifrance.gouv.fr/), [LUCID packaging register](https://lucid.verpackungsregister.org/), [ASA](https://www.asa.org.uk/)
- Privacy: [EDPB](https://www.edpb.europa.eu/), [ICO](https://ico.org.uk/), [Data Privacy Framework](https://www.dataprivacyframework.gov/), [CASL](https://crtc.gc.ca/eng/internet/anti.htm)
- Market signals: [UK DfE phones guidance](https://www.gov.uk/government/publications/mobile-phones-in-schools), [eSafety AU](https://www.esafety.gov.au/about-us/industry-regulation/social-media-age-restrictions), [Élysée](https://www.elysee.fr/), [La Moncloa](https://www.lamoncloa.gob.es/), [Brazil Lei 15.100/2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15100.htm), [education.govt.nz](https://www.education.govt.nz/), [BIÖG](https://www.bioeg.de/), [US Census](https://www.census.gov/), [CBP](https://www.cbp.gov/), [USPS international calculator](https://ircalc.usps.com/)
