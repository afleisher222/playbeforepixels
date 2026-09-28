# Launch now: the fastest safe path to worldwide sales

## Status note: September 28, 2026, 19:30 UTC (demographic-audit pass)

**Nothing is published, and `ops/PAUSE` stays.** This pass applied the six no-decision changes from `marketing/DEMOGRAPHIC-AUDIT.md` §3 and rebuilt every affected product, listing image, Etsy file and packet:
- **Site:** the *Laps Not Apps* spreads now pair p07+p08 (Grandma, who uses a wheelchair, is visible on the home band and the product page) and p13+p14, with new alt text.
- **Every launch guide** (busy book, routine cards, bored cards, family kit, Play & Talk, 100 Plays, winter, course, both bundle START HEREs) now says "Talk, sign, sing and read…", that reading the talk line word for word or playing quietly side by side counts too, and that every play works from a chair, a bed or a wheelchair. Sound plays have a see-it or feel-it version.
- **Wording:** Family Kit "Screens sleep in their spot", "Video calls … are talk time", "Look at photos of people we love"; Play & Talk "On the way"; bored cards "Anywhere Picnic" (and "Games Day", "Camp Night"); winter no-snow hunt list and FAQ; busy book "Mama, Daddy, Mommy, Papa…"; "hook-and-loop dots" replaces "velcro" in all customer-facing text.
- **Routine cards:** four new cards (Video call, Other home, Grown-up at work, Count the sleeps), so the 0–5 edition is now **181 cards** (Complete Set 239); titles, pins, the family kit's last page and the Library manifest are updated.
- **Panels:** 19-seat simulated panels (13 + the six required seats) recorded for Winter Countdown and both bundles; all "judged" and "preachy" scores 1/5. The six seats are in the `ops/ROUTINE.md` template.
- **Tests:** `check_listings.py` 0 FAIL, 0 WARN · `build_packets.py` 504 checks, 0 FAIL, 3 WARN (the same founder decisions) and no "differs from record" lines · `stage.py --all` OK · `check_fonts.js` 0 problems on every changed product's print and page sources (the 42 course HTML emails use email-safe fonts by design, as before) · PyMuPDF scan of 171 customer-facing PDFs: no Type 3 fonts, no placeholders, no URL in any Etsy file · `node site/build.js` + `site/qa/run.js`: 4194 passed, 0 failed · `unchanged_renders.py --restore` run before commit.

## Launch readiness: September 28, 2026, 15:45 UTC

This replaces the 06:50 UTC version. It was written after the upload packets were built and after a final critic spot-checked Etsy packets 02, 03 and 05 and the KDP packet against their `listing.json` records and `site/config.json`. **Nothing is published.** `ops/PAUSE` stays, no platform account exists yet, and every platform rule below is from memory and UNVERIFIED (web search was unavailable).

**Where things stand**
- `ops/UPLOAD-PACKETS/` holds every packet, generated from the product records. `build_packets.py` runs 503 checks: 0 FAIL and 3 WARN, all of them founder decisions. `stage.py --all` dry run: OK. `ops/TESTS/check_listings.py`: 0 FAIL, 0 WARN.
- **Spot-check (critic, 15:45 UTC).** In all ten Etsy packets the title, 13 tags and price match the record exactly. The only exception is 100 Plays, which is changed on purpose (see Claude item 3). Every image and file path exists. Site prices match: $11.99, $9.50, $9.99 PDF / $16.99 paperback, $6.50, $11, $7, and bundles $29 and $45 on /shop/bundles/.
- **PDF scan.** The critic scanned all 43 PDFs in the ready Etsy packets and the KDP packet with PyMuPDF. None has Type 3 fonts, and none has FOUNDER, PLACEHOLDER, [VERIFY], TODO or lorem. No Etsy PDF has a web address. The only "classroom" and "teacher" words are the honest line "licenses … are not available yet" and one "you don't need to be a teacher".
- **KDP files:** the interior is 86 pages at 8.125 × 10.25 in, and the cover wrap is 16.4437 × 10.25 in. Both match the packet.

**Ready the day the accounts open** (after Gate A and "go")

| Where | What | Packet |
|---|---|---|
| Etsy, G-day (target Fri Oct 16) | Toddler Busy Book $11.99 · Ages 1–5 Gift Bundle $29 (no "separately" figure yet) · 181 Visual Routine Cards 0–5 $9.50 · 100 Screen-Free Plays PDF $9.99 · 76 "I'm Bored" Cards 1–5 $6.50 | `ops/UPLOAD-PACKETS/etsy/01`–`05` |
| Etsy, week 2 (by Oct 25) | Play-First Family Kit 2–5 $11 · 52 Play & Talk Cards $7 · Routine Cards Starter $5 · Winter Countdown $6.50 | `etsy/06`–`09` |
| Gumroad (unlisted before G-day, public on G-day) | the same products, plus the Birth-to-5 Library at $45, which is Gumroad only because its ZIPs are over Etsy's 20 MB limit | `gumroad/01`–`10` |
| KDP (draft plus 1 proof, Oct 5–11) | *100 Screen-Free Plays for Ages 0–5* paperback, $16.99 | `kdp/01-100-screen-free-plays/` |
| Gumroad, Dec 15 | the course, $27, with the $49 bundle and the free starter; all 42 drip emails written | `gumroad/11-course-30-days/` |
| Profiles and Pinterest | social kit images and bios; 12 boards and 60 pins | `marketing/social-kit/`, `marketing/pins/` |

**(a) What Claude still has to do before G-day**

> **Update, September 28, 2026 (evening):** items 1, 2, 3 and 4 are done.
> - Item 3 (19:30 UTC): the 100 Plays Etsy title, tag and KDP keyword ("preschool" → "toddler") and the PDF-only Etsy description and bullets now live in `guide-100-plays/listing.json` (`etsy_long_description`, `etsy_bullets`); `build_packets.py` has no overrides left and shows no "differs from record" lines. The folded title read "Toddler" twice, which check_listings flags as stuffing, so it now says "Easy Baby Ideas by Stage".
> - 100 Plays hero now shows the printable PDF pages (no paperback), with new alt text.
> - Gift Bundle: all 5 images have alt text; the headline now reads "+ play coupons included" and no copy calls the coupons "free" (bundle, Library and site). Five more Etsy packets (01, 05, 06, 07, 09) also had empty alt text; all now filled.
> - Gate records for all 12 launch items are in `ops/COMPLIANCE-RECORDS/` (0 FAIL; the NEEDS FOUNDER lines are listed at the end of each record).
> - Fixed along the way: tagged PDFs with a language (brand/render.js) for busy book, 100 Plays (incl. KDP), Play & Talk Cards and the course; channel tags (`channel_tag.py`, stamped by `stage.py` and the KDP build); one-page START HERE for the busy book; print-shop permission on every START HERE; color-blind checks in each panel.md; Biscuit renamed Tater in *The Day the Tablet Slept*; "Grown-up corner" retired on the site; the old four-square preview `index.html` replaced by a pointer to `site/dist/`; launch-name desk review (brand/ORIGINALITY.md §F).
1. **Fix the 100 Plays Etsy hero image** (`products/guide-100-plays/preview/listing-images/01-hero.png`, a G-day listing). It shows "Paperback 8 × 10 in, black-and-white interior" as a format, but the Etsy listing sells only the PDF, and the paperback will not be live on G-day. Make an Etsy-only hero, then rewrite its alt text.
2. **Fill in the Gift Bundle's image alt text.** All 5 images in `etsy/02` have empty alt text. Also check the "+ free play coupons" headline on image 1 against 16 CFR 251 ("free" inside a paid bundle; UNVERIFIED). "+ play coupons included" is the safe wording.
3. ~~**Fold the packet-only changes back into the product records**: the 100 Plays Etsy title, one Etsy tag and one KDP keyword ("preschool" became "toddler"), and the PDF-only description (`guide-100-plays/listing.json`). Then re-run `build_packets.py` until it shows no "differs from record" lines.~~ **Done** (see the update above).
4. **Record the 22-line `ops/COMPLIANCE-GATE.md` result** for each G-day item. There is still no per-item gate record. Gate 20 is still not met: for example, the KDP interior has no language set and no tags. Either fix this in the G0 rebuilds or record the founder's written exception.
5. **Build the Gate A file** (`ops/GATE-A.md`, with its evidence list), and add the five GROWTH-ENGINE §2a questions to the counsel packet.
6. **Get the site ready to go live before the paperback ships.** The printed book names playbeforepixels.com, its contact form and `/bonus/guide-100-plays` on pages 1, 2 and 85 and on the cover. Those pages must be live before KDP Publish. Before launch, also:
   - fill in the contact email (`PBP_CONTACT_EMAIL`) and the PO Box;
   - remove Teachers Pay Teachers, Faire and the "classroom resource pack" from the legal drafts;
   - get the lead's decision on hiding *Laps Not Apps* (personalized, not self-running, and not on the G0 list).
7. **Fix these side issues** (none of them blocks G-day):
   - Point merch `next_products` at a product that exists; `bundle-holiday-gift` does not exist.
   - Fix the course emails that say "paperback" in case KDP is not live by Dec 26.
   - Resize the busy-book bonus PNG pieces for ages 1–2 to 2.5 in.
   - The Laps back cover promotes two held books; fix it before Laps is sold.
   - *More Talk, Less Tap* stays held; it prints a classroom license.
8. **On each upload day:** run `stage.py`, then record the listing in `ops/PUBLISHED.json` and swap its `{{ETSY_LISTING_URL:…}}` placeholder in `marketing/pins/pins.csv`.

**(b) Founder decisions still open** (each one takes minutes; details in `ops/APPROVALS.md` and `ops/UPLOAD-PACKETS/README.md`)
1. **D9:** KEEP or REPLACE the "first then" and "visual schedule" search words. REPLACE is recommended. It affects the Family Kit title, which is week 2. The routine-card titles are already clean, but "First–Then board" still names a chart layout in the 0–5 and Starter descriptions and in one image's alt text.
2. **KDP UK, Canada and Australia prices.** The plan's £7.99, CA$12.99 and AU$14.99 net below the $5.10 floor. The recommended prices are £13.99, CA$22.99 and AU$26.99.
3. **"Preschoolers" in the KDP subtitle and cover.** Keep it as an age word, or change both. Also say whether the "preschool" ban covers image text and body copy, or only titles, tags and keywords.
4. **Keep the name "Birth-to-5 Printable Library"**, which is on Gumroad only, or rename it.
5. **Course refund window:** 14 days (the current draft) or 30.
6. Still pending from earlier:
   - reply-time wording (gate 21);
   - large-print exception (gate 20);
   - confirm D1–D3 (the listings already use these answers).

**(c) Founder one-time steps** (in order; about 4½ hours in all, per GROWTH-ENGINE §2a)
1. **Today:** make the GitHub repository private (`ops/APPROVALS.md`, URGENT).
2. Send counsel the packet and ask for a written Gate A answer by Fri Oct 16.
3. Open the business bank account, rent the PO Box, buy the domain, set up the business email, and file the trade name and tax registration.
4. Get insurance quotes, and bind one when counsel says yes.
5. **One account sitting, Oct 5–9:**
   - Etsy (shop not opened), KDP, Gumroad, the email platform, and a Pinterest business account;
   - the API requests, a capped card, and the keys in the environment settings;
   - use only `marketing/social-kit/` images and `BIOS.md` text.
6. Save the KDP draft from `kdp/01`, and order one proof to the PO Box.
7. Have an attorney review the policies. Then write an APPROVED line for each listing and type "go".
8. On proof arrival:
   - check the cover and page 1 (15–30 minutes);
   - then click Publish, but only once the site pages the book prints are live.

**(d) Live checks needed** (all UNVERIFIED)
- **Etsy:**
  - 5 files of up to 20 MB each, 140-character titles, and 13 tags of up to 20 characters;
  - category paths and the AI-disclosure and "Designed by" wording;
  - whether Offsite Ads can be turned off;
  - whether a PO Box is accepted, and what EU and UK buyers are shown about the seller.
- **KDP:**
  - the spine (0.1937 in for 86 pages) and the barcode spot, checked with KDP's cover calculator;
  - the print cost and royalty at $16.99, and the UK, CA and AU royalty amounts;
  - the category names, the AI-content definitions, and the brand-as-author rule;
  - the free ISBN and imprint text.
- **Gumroad:**
  - the fee;
  - the effect of the Discover setting on the $5 Starter's net;
  - handling of VAT as merchant of record.
- **Pinterest:** the bulk-upload CSV columns, and where pin images are hosted (`{{PIN_MEDIA_BASE_URL}}`).
- **Tax and safety:** Maryland digital-goods tax and marketplace-facilitator rules; CPSIA for paper printables for ages 0–5.

---

> **Read with the $500 budget.** Everything below this line was written before the founder capped launch spending at $500 with no ads (business/LAUNCH-BUDGET-500.md, business/DECISIONS.md). Where it disagrees, the budget and ops/QUEUE.md win: one domain; Etsy, Gumroad, KDP and Pinterest only at launch; Shopify, Printful, IngramSpark, merch and the other social platforms wait (GROWTH-ENGINE §2a); *The Day the Tablet Slept* and *Up! Go! More!* stay HELD.

_Written September 28, 2026, after the founder asked to "launch everything as soon as possible worldwide" and to have Claude run the social media and marketplaces automatically. The detailed setup steps for each platform are in `commerce/storefront-setup-guide.md`. This file sets the order and says who does each step._

## The honest picture

Claude can build and run nearly everything. A small number of steps legally have to be done by the owner:
- opening accounts in AlphaPlay LLC's name, which needs identity checks, phone codes, the LLC's tax ID and a bank account;
- a few legal sign-offs.

**Those steps are all that stand between today and the first sale.** Wave 1 can go live in the same week that the Wave 0 accounts exist and the launch products pass the gate.

Launching worldwide on day one is possible for **digital products**, through Etsy and a merchant of record (Gumroad): both sell to buyers everywhere, and they handle the sales tax and VAT on digital goods in the regions they cover (confirm each at signup [VERIFY]). Printed books reach most countries in Wave 2, through Amazon's own marketplaces.

## Wave 0: the founder, once (about 3–4 hours in total, spread over a week)

Protection comes first, so do these in this order.

1. **Employment counsel's OK before anything is sold or marketed.** Send `legal/FOR-EMPLOYMENT-COUNSEL.md` to your employment attorney (`legal/LEGAL-LAUNCH-CHECKLIST.md` row 1). This is the only step that can hold everything else up, so start it today.
2. **Put the LLC in order:** confirm AlphaPlay LLC is in good standing, and register the trade name "Play Before Pixels" (about $25, Maryland Business Express). Checklist rows 2–3.
3. **Open a no-fee business checking account** under the LLC's EIN, never your Social Security number (`finance/BANKING.md`).
4. **Rent a USPS PO Box.** It is the only address that ever appears in public; your home address goes on government filings only (`legal/ENTITY.md`).
5. **Buy the domain `playbeforepixels.com`** only (about $10–12 at Cloudflare; the other domains in `legal/domain-portfolio.md` are skipped under the $500 budget).
6. **Open the accounts in one sitting (about 90 minutes).** Use a business email and an authenticator app. Claim the handles at the same time (`marketing/SOCIAL-HANDLES.md`).
   - To sell: Etsy, Gumroad and Amazon KDP. (Shopify and Printful wait until sales pay for them; check the existing "AlphaPlay" Shopify store then.)
   - To be found: Pinterest only. Instagram, Facebook, TikTok and YouTube wait until February (GROWTH-ENGINE §2a).
7. **Put the API keys in the cloud environment settings** (the environment menu → Edit), never in chat. The names are listed in `ops/SECRETS.md`. This is the step that lets Claude run everything.
8. **Get an insurance quote** for general liability plus products coverage (checklist row 14).

## Wave 1: digital products, worldwide (the week the accounts exist)

- **Five launch products, now being built:**
  1. Visual Routine Cards
  2. "I'm Bored" Play Cards
  3. Play-First Family Kit
  4. Toddler Busy Book
  5. 100 Screen-Free Plays PDF

  Each comes in US Letter and A4 sizes (`ops/QUEUE.md`).
- **Where they sell:**
  - Etsy, to buyers worldwide;
  - Gumroad, as merchant of record, for buyers worldwide;
  - the site's Buy buttons.
- **Claude handles:** the listings, photos and mockups, search-optimized titles, one honest everyday price per product (`commerce/PRICING.md`), the free sampler that builds the email list, and the first Pinterest pins.

## Wave 2: books and print products (weeks 2–4)

- **Amazon KDP paperback.** *100 Screen-Free Plays for Ages 0–5* only, with KDP's free ISBN. (*The Day the Tablet Slept* and *Up! Go! More!* are HELD: ops/QUEUE.md "Cut".) They reach buyers through Amazon's own marketplaces (US, UK, Germany, France, Spain, Italy, Netherlands, Poland, Sweden, Japan, Canada, Australia and others [VERIFY list]).
  - Order **one printed proof of each book and look at it before release**. This is quality control, and it protects the brand.
- **IngramSpark** for bookstores and libraries: HELD for employment counsel.
- **Printful merch**, adult sizes only: waits until sales pay for samples and Shopify.

## Wave 3: channels that sync from Shopify (weeks 4–8)

- **Automatic catalog sync:** Facebook and Instagram Shops, Google free listings and YouTube Shopping, Pinterest catalog, TikTok Shop (physical products only), and Faire wholesale.
- **Retail steps after that:** Walmart Marketplace, Amazon seller, and then the Target and Walmart buyer path (`business/sections/04-retail-target-walmart.md`).

## What Claude runs automatically, platform by platform

Each platform needs its account and key from Wave 0 first. Where a platform has no posting or listing API, Claude builds a complete upload packet (files, text, prices and keywords) in `ops/UPLOAD-PACKETS/`, and uploading it takes about 10 minutes.

| Platform | Claude runs it automatically | Needed once from the founder | Limits (UNVERIFIED until re-checked; task #18) |
|---|---|---|---|
| Website | Builds, deploys, fixes, SEO pages and a daily health check | Cloudflare API token | |
| Shopify | Products, prices, collections, bundles, discounts and channel sync. Orders deliver themselves | Custom-app client ID and secret | |
| Etsy | Creates and updates listings and answers FAQ-type messages with saved replies | Etsy app key and one approval click | Etsy must approve the app |
| Gumroad | Sales reports; product updates where the API allows | API token | Creating new products may need an upload packet [VERIFY] |
| Pinterest | Pins every day on 10–15 keyword boards | App access and token | Standard API access needs Pinterest's approval |
| Instagram and Facebook | Posts, carousels and Reels through Meta's official API | Meta app and token (Business account linked to the Page) | |
| TikTok | Posts through the official posting API | App and token | Until TikTok audits the app, API posts may be private only [VERIFY] |
| YouTube Shorts | Uploads through the official API | Google API project | Unaudited projects upload as private [VERIFY] |
| X, LinkedIn, Threads, Bluesky | Posting through one posting-service key that reaches every network (an API-first service such as Ayrshare [VERIFY price and terms]) | One key | This is also the simplest route for every network above |
| Printful | Fulfils Shopify and Etsy orders on its own (auto-confirm on) | Card on file | |
| Email list | Welcome series, age-by-age play emails and launch emails | Email-platform API key | Buyers are added only if they opt in |
| Amazon KDP, IngramSpark, Teachers Pay Teachers | Upload packets, prices, keywords and A+ content text | The upload click | No public API |
| Bookkeeping | Monthly close, tax reserve and the accountant's packet | Read-only feeds | |

**Rules that stay on while everything is automated:**
- Claude never sends email to individuals, posts in groups or communities, sends DMs or buys anything without an APPROVED line in `ops/APPROVALS.md`.
- Every public item passes `ops/COMPLIANCE-GATE.md` first.

## What Claude is doing now, and every day

- **In this session:**
  - the new logo, because the old mark read as the letter "r";
  - the five launch products;
  - the multi-page site;
  - the cleanup sweep: renames, honest prices and the AlphaPlay LLC copyright line;
  - the legal gate.
- **Monday–Saturday, once the founder's setup steps are done (paused on September 28, 2026): the daily studio routine (2:47 a.m. ET, overnight so it does not use the founder's daytime Claude allowance).** It builds or improves one product and keeps social posts queued.
- **Every Sunday: the weekly market-research routine (Sunday 3:52 a.m. ET).** It re-ranks what to build next and re-checks facts marked UNVERIFIED.
  - **Not switched on yet.** On September 28, 2026 the session's permission system blocked Claude from switching it on. The founder can switch it on herself in the Routines list at claude.ai/code ("Play Before Pixels weekly market research").
- **Both routines run in build-only mode for now (`ops/PAUSE`).** They build and research every day but publish nothing until the accounts exist, the launch gate passes and the founder says go. Claude then deletes `ops/PAUSE` and switches on the daily check (6:38 a.m. ET), which watches the stores and sends her the money updates.

## How the founder is protected through all of this

- **The seller is AlphaPlay LLC,** never her personally. Every account, receipt and contract is in the LLC's name and uses its EIN.
- **Her home address is never public:** only the PO Box appears.
- **Nothing is said or sold that could draw a claim:** no health claims, no naming or criticizing anyone, and one honest price per product. The policies are reviewed by an attorney before they go live.
- **Employment counsel signs off first,** and insurance is in place before the first sale.
- **Her personal Gmail and Drive are never connected to the automation.** Routines carry no connectors.
- **Keys live only in the environment settings,** where she can switch any of them off at any time. Creating `ops/PAUSE` stops all publishing at once.
