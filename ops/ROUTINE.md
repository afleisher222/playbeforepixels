# The Play Before Pixels studio — how the scheduled routines run the business

Every scheduled run follows this file. It is the operating procedure; CLAUDE.md and brand/BRAND.md are the rules.

## 0. Start
1. Attach and clone the repo (`afleisher222/playbeforepixels`, push access) if the session does not have it; `git pull`.
2. Read CLAUDE.md, brand/BRAND.md, legal/ENTITY.md, ops/COMPLIANCE-GATE.md, ops/QUEUE.md, and the last 3 entries of ops/RUNLOG.md.
3. **If the file `ops/PAUSE` exists: do research and building only. Publish, post, list, send and upload NOTHING.** Record "paused" in the run log.

## 1. Research (every run)
- Scan for what is selling now in our categories: Etsy and Teachers Pay Teachers best-seller signals, Amazon best-seller ranks in toddler/board/picture books and parenting, Pinterest trends, seasonal moments in the next 8 weeks, new peer-reviewed research on early screen exposure (only add a study to the allowed citations after reading the primary source; log it in ops/RESEARCH-LOG.md).
- **Copycat watch (first run of each month):** search Etsy, Amazon, Teachers Pay Teachers, Google Images/Lens results and social platforms for our product titles, distinctive phrases, cover art and listing images. Log matches in ops/COPYCAT-LOG.md with links and dates. For a likely copy of human-authored or licensed material, prepare the platform's IP report and/or a DMCA notice from legal/protection/ templates and add it to ops/APPROVALS.md — never file without the founder's APPROVED line. For AI-generated material that may not be copyrightable, rely on trademark, license terms and platform policies instead (legal/protection/PROTECTION-PLAN.md). Stay ahead by shipping: note any competitor move worth answering in ops/QUEUE.md.
- Update ops/QUEUE.md: rank product ideas by evidence of demand × margin × fit × effort. Cut ideas with weak evidence.

## 2. Build (every run)
- Take the top item in ops/QUEUE.md "Next to build" and build it to the brand kit's quality bar (maker → independent reviewer → customer-panel check), in products/<slug>/, with listing.json.
- Improve one existing product using customer reviews, sales data or new research.
- Leave clearly marked places for the founder's own creative contribution (human authorship — see BRAND.md).

## Customer panel (every product, every run)
Before release, every product is reviewed by a simulated panel, each member judging from their own point of view; every issue raised is fixed or answered in writing in the product folder (panel.md):
new parent · worried parent · grandparent gift-buyer · preschool teacher · K–5 teacher · child-care center director · school principal/district administrator (credibility, PO-friendly, no criticism of schools) · PTA leader/advocate (would they share it?) · speech-language pathologist and occupational therapist (accurate language, no therapy claims, would they give it to a family?) · education/child-development student (clarity, sourcing) · a child aged 6–10 for school-age products (is it fun?) · an autistic adult self-advocate (respect) · a Spanish-speaking parent (cultural fit; translation quality when localized) · a children's librarian (durability, cataloging details, read-aloud quality).

## 3. Spread the word (every run)
- Write or refresh 1–2 research-hub or SEO articles (seo/articles/), including translations (Spanish first, then French, Portuguese, German) as the international plan directs.
- Draft that week's faceless social posts and pins from the campaign bible (marketing/CAMPAIGN-BIBLE.md) into content/queue/.
- Virtual-autism education uses only the safe framing sentence in BRAND.md: a term some clinicians use; not a diagnosis; associations, not causation; talk to your pediatrician; free early intervention. Respectful toward autistic people. Outreach goes only to places marked OUTREACH in marketing/virtual-autism-outreach.md — never to mainstream autism organizations, never repeated messages, never where self-promotion is banned.


## 3b. Worldwide expansion (every run, one step at a time)
Follow legal/international-plan.md. Each run advances the next unchecked step in ops/INTERNATIONAL.md, and never launches in a region until its legal checklist there is complete:
- **Currencies:** local-currency pricing through the store's multi-currency markets; digital products sold through a merchant of record that collects VAT/GST where the plan says so; marketplaces (Amazon, Etsy, POD partners) already price locally.
- **Languages:** add the next language version of the site and top products (order: English → Spanish → French → Portuguese → German → Italian → Dutch → Japanese → others by demand). Machine-draft, then a second-pass review for natural phrasing and for the hard rules in that language; hreflang tags; localized keywords; local examples. Never publish an unreviewed machine translation.
- **Amazon worldwide:** KDP print and ebook distribution to every Amazon marketplace KDP supports; Author Central pages in each marketplace that offers one; site "Buy on Amazon" buttons use a geo-routing link so each visitor lands on their own country's store; affiliate links use the Associates program's international routing where available.
- **Legal per region (before selling there):** EU/UK product-safety responsible person for physical goods, VAT/GST registration or merchant-of-record coverage, GDPR/UK GDPR consent and privacy notice, consumer withdrawal-right wording for digital goods, local product-safety labelling (e.g., Canada textile labelling for apparel), and translated policies. Anything uncertain goes to ops/APPROVALS.md for the founder's attorney.

## 4. Compliance gate (before anything leaves the repository)
Run every new or changed public item through ops/COMPLIANCE-GATE.md. Anything that fails, or anything the gate marks "needs founder", goes to ops/APPROVALS.md and is NOT published.

## 5. Publish (only what is connected, only what passed)
- Publish only through official APIs whose credentials exist as environment secrets (e.g., SHOPIFY_*, PRINTFUL_*, PINTEREST_*, ETSY_*, CLOUDFLARE_API_TOKEN). Never scrape, never automate a browser login, never store secrets in the repo.
- Platforms without an automation API (Amazon KDP, IngramSpark, Teachers Pay Teachers, some marketplaces) get an upload packet in ops/UPLOAD-PACKETS/<platform>/<slug>/ with every file and field ready, listed in the report.
- Site: rebuild and deploy through the connected Cloudflare Pages project.
- **Social media, all platforms:** post the week's approved, gate-passed faceless posts and pins through the connected scheduler or each platform's official posting API (Pinterest, Instagram and Facebook via Meta, TikTok, YouTube Shorts, LinkedIn, Threads, X, and regional platforms as the international plan adds them), in each live language. Links use tracking tags so the report can show which platform sells. Never post in groups or communities, never DM, never comment as the brand without approval.


## 6. Commit and report
- Commit in small logical commits and push.
- Append to ops/RUNLOG.md: date, what was researched, built, improved, published, queued for approval, and any problems.
- **Weekly scorecard (top of every report, when data is connected):** revenue and profit by product and by channel; best and worst seller; email subscribers gained and sign-up rate; conversion rate and average order value; refunds and complaints; ad spend vs. return (if any); cash in the business account vs. the 3-month reserve target. Then one line each: **keep doing**, **stop doing**, **try next** — and cut or fix any product or channel that has earned less than its upkeep for 8 weeks.
- The final message of the run is a short plain-language report for the founder: what's new, what sold (if sales data is connected), what needs her (approvals, uploads), and nothing else.

## Never
- No direct contact: never offer or schedule a call, meeting, interview, podcast or live event for the founder; never publish a phone number. Written channels only.
- Never contact, list, target or mention Montgomery County Public Schools or its staff; MCEA, MSEA or NEA; Montgomery County DHHS or its Infants and Toddlers Program.
- Never write about the founder's legal matters, her employer, or her children; never publish the founder story without her confirmation that counsel reviewed it.
- Never make or imply a health claim; never name or criticize a school, district, company, show, creator, app or EdTech product.
- Never send email to people, post in communities, or buy anything without the founder's approval in ops/APPROVALS.md.
- Never delete files the founder created.
