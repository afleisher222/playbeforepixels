# Launch now: the fastest safe path to worldwide sales

## Launch readiness: September 28, 2026, 06:50 UTC

This section lists what still stands between today and the first sale of the five Wave 1 products on Etsy and the *100 Screen-Free Plays* paperback on KDP. It was written after the four fix lanes (print fonts, print files, listings, promises) and their verifiers.
- **Where things stand:** `ops/TESTS/check_listings.py` shows 0 FAIL on all 17 records. The 2 warnings left are D9. The 100 Plays files have no placeholders and no Type 3 fonts, and the KDP footer sits at least 0.4 in above the trim.
- **Still in place:** `ops/PAUSE` stays, and the target G-day is Fri Oct 16 (`business/GROWTH-ENGINE.md` §2).
- **Platform rules** below come from memory and are UNVERIFIED.

**(a) Blockers Claude can still fix in the repo**
1. **Build the ages 0–5 (G0) editions.** Until counsel answers G1, only G0 editions may go on Etsy. Three products are built only as all-ages sets: the routine cards (0–12), the "I'm Bored" cards (1–12, four bands) and the Family Kit (2–12). The busy book (1–5) and 100 Plays (0–5) already fit.
   - Also reconcile the launch list. `ops/QUEUE.md` puts the $29 Ages 1–5 Gift Bundle on G-day and moves the Family Kit to week 2. Wave 1 below still lists the Family Kit.
2. **Remove the held classroom, site and library licenses from the launch files and listings.** A printed book can never be recalled, so the paperback text matters most. The offers are still in:
   - the 100 Plays KDP interior p2 and every edition's p2 and START HERE (`build/book.js` line 202, `build/extras.js` line 281);
   - busy book p130 and START HERE p8;
   - bored cards p58, plus the bored-cards long description and 4 FAQ answers;
   - the 100 Plays FAQ answer, which also names playbeforepixels.com (gate 16).
3. **Clean the launch listings.**
   - Remove the 9 bracketed notes from the FAQs ("[VERIFY …]", "[counsel to confirm]", "[link the policy page at launch]"…).
   - Make `check_listings.py` scan `faq` for brackets, URLs and license offers.
   - Apply the GROWTH-ENGINE §7 banned-word list, which the checker does not test. "Preschool" appears 8 times in titles, tags and keywords across the five, including the KDP subtitle. Replace it, or have the lead record in writing that the age word is allowed.
4. **Fix the AI line in the routine-card PDFs.** They say "edited by Play Before Pixels", but no person has edited them (gates 8 and 17). Fix it in the G0 rebuild.
   - In the same G0 rebuilds, stop each product's low-ink rule from outlining SVG text, for example `.low .art text{stroke:none!important}`. Outlined text comes out as Type 3. The Family Kit low-ink Etsy files already contain it.
5. **Finish the 100 Plays paperback before the proof:**
   - replace the 26 gradient write-on lines with vector rules (preflight Tier 2);
   - ease the 4.3 pt body-to-footer gap on 9 pages;
   - move the front-cover tagline, which sits about 0.33 in from the trim (the brand minimum is 0.375 in);
   - correct `listing.json` "trim": it says 0.5 in, but the footer is at about 0.42–0.45 in;
   - rebuild and re-run the preflight.
6. **Gate 20 is not met on the launch files.** The busy-book and 100 Plays PDFs are untagged and have no language set. No launch product has a color-blind check recorded in `panel.md`.
7. **Record the gate and write the packets.**
   - Run the 22-line `ops/COMPLIANCE-GATE.md` on each launch item and record the result; no record exists yet.
   - Write the upload packets; `ops/UPLOAD-PACKETS/` is empty. That means 5 Etsy packets, plus the KDP packet: 7 keyword boxes, categories, £/CA$/AU$ prices, AI answers, and Expanded Distribution off.
8. **Complete the counsel packet.** `legal/FOR-EMPLOYMENT-COUNSEL.md` still lacks:
   - the five questions in GROWTH-ENGINE §2a: the Gate A yes/no, G1, ads that cannot exclude Montgomery County, pages before Gate A, and the KDP author line;
   - G2-25 and the PRE-MORTEM fix 8 questions.
9. **Build the Gate A machinery.** None of these exists yet: the approval channel (G2-03), `ops/GATE-A.md` with its evidence files, the file gates (`check_files.py`, `check_print.py`) and the exposure guard (PRE-MORTEM fixes 2, 5 and 6).
   - The watchdog and the token broker are needed before routines publish on their own. They are not needed for a first sale uploaded by hand.
10. **Stand up the pages the paperback prints** before the book ships:
    - playbeforepixels.com, its contact form and `/bonus/guide-100-plays` (also a QR code);
    - a `/licenses` page that says only the family license is sold;
    - the policy drafts, finished (G2-19) so counsel reviews final text.

**(b) Founder decisions**
1. **The logo.** Every launch file and listing image carries the current kit, which is not final. Once you choose, Claude rebuilds only the launch products.
2. **D9, the routine-card search words.** REPLACE is recommended.
3. **Reply-time wording (gate 21).** The FAQ and policies cannot be published until you choose one:
   - amend the gate to the new line ("every question gets a reply" is safer than "every message");
   - or restore "an instant automatic reply; a person reviews everything else within [5] business days" in about 10 places.
4. **Print fonts: A, B or C** (`ops/TESTS/fonts-static.md`). A is recommended: keep the static fonts, and accept small text 2–10% narrower. The G0 rebuilds will use your choice.
5. **The paperback ISBN.** Either use the free KDP ISBN (the adopted plan), or buy your own from Bowker: about $295 for 10, with AlphaPlay LLC as the imprint (`commerce/storefront-setup-guide.md` Part C).
6. **Large print.** Gate 20 asks for an 18 pt edition of text-heavy products, but the queue builds the 100 Plays large-print edition after launch. Approve that exception in writing, or Claude builds it now.
7. **Confirm D1–D3:** routine cards at $9.50, the Starter at $5.00, and Etsy Offsite Ads off. The listings already use these answers. The other PENDING lines in `ops/APPROVALS.md` do not block these six items.

**(c) Founder one-time steps** (in this order; about 4½ hours in all, per GROWTH-ENGINE §2a)
1. **Make the GitHub repository private today.** GitHub's API still showed it as public at 06:46 UTC.
2. Send counsel the completed packet, and ask for a written Gate A answer by Fri Oct 16.
3. Open a no-fee business checking account under the EIN.
4. Get written quotes for general liability plus products cover. Bind the lowest on the day counsel says yes.
5. Set up the business basics and write down your household-money cap:
   - buy playbeforepixels.com and set up the business email;
   - rent the USPS PO Box;
   - file the $25 trade name;
   - confirm good standing;
   - add digital products to the Maryland sales-and-use tax registration.
6. Open the accounts in one sitting:
   - Etsy, with payouts to the new bank and the shop not yet opened;
   - KDP, with the LLC tax interview;
   - the Etsy API request;
   - a capped virtual card;
   - the keys, entered in the environment settings;
   - personal connectors removed (G2-02);
   - a usage cap (G2-06) and the platform-notice filter (G2-07).
7. Have an attorney review the privacy policy, terms, refund policy and disclaimer (Gate A item 7). Include two questions: the seller address (G2-23) and the personal Gmail on the trademark record (G2-22).
8. Upload the KDP draft and order one proof to the PO Box. Check the proof, then click Publish. Until Etsy approves the API app, upload each Etsy packet by hand (about 10 minutes each).
9. Type "go".

**(d) Needs a live web check** (all UNVERIFIED)
- **Etsy:**
  - fees, and whether Offsite Ads can be turned off below $10,000 a year;
  - listing limits: 5 files of up to 20 MB each, 140-character titles, and 13 tags of up to 20 characters;
  - the "Designed by" and AI-disclosure wording;
  - whether a PO Box is accepted, and what EU and UK buyers are shown about the seller;
  - whether a download can go straight to a gift recipient.
- **KDP:**
  - the minimum margin with bleed (0.375 in assumed);
  - the barcode's size and position;
  - the spine for 86 pages on white paper (the wrap is 16.4437 in);
  - the large-trim print cost and the 60% royalty at $16.99;
  - the AI-generated vs. AI-assisted definitions, and the rules on author and pen names;
  - whether the copyright page needs a free ISBN printed on it;
  - GPSR data for the EU marketplaces;
  - whether TrueType fonts, RGB and live transparency are accepted.
- **Tax and safety:**
  - Maryland's 6% tax on digital products, and what Etsy and Amazon collect as marketplace facilitators;
  - CPSIA for paper printables aimed at ages 0–5.

---

_Written September 28, 2026, after Arielle asked to "launch everything as soon as possible worldwide" and to have Claude run the social media and marketplaces automatically. The detailed setup steps for each platform are in `commerce/storefront-setup-guide.md`. This file sets the order and says who does each step._

## The honest picture

Claude can build and run nearly everything. A small number of steps legally have to be done by the owner:
- opening accounts in AlphaPlay LLC's name, which needs identity checks, phone codes, the LLC's tax ID and a bank account;
- a few legal sign-offs.

**Those steps are all that stand between today and the first sale.** Wave 1 can go live in the same week that the Wave 0 accounts exist and the launch products pass the gate.

Launching worldwide on day one is possible for **digital products**, through Etsy and a merchant of record (Gumroad): both sell to buyers everywhere, and they handle the sales tax and VAT on digital goods in the regions they cover (confirm each at signup [VERIFY]). Printed books reach most countries in Wave 2, through Amazon's own marketplaces.

## Wave 0: Arielle, once (about 3–4 hours in total, spread over a week)

Protection comes first, so do these in this order.

1. **Employment counsel's OK before anything is sold or marketed.** Send `legal/FOR-EMPLOYMENT-COUNSEL.md` to your employment attorney (`legal/LEGAL-LAUNCH-CHECKLIST.md` row 1). This is the only step that can hold everything else up, so start it today.
2. **Put the LLC in order:** confirm AlphaPlay LLC is in good standing, and register the trade name "Play Before Pixels" (about $25, Maryland Business Express). Checklist rows 2–3.
3. **Open a no-fee business checking account** under the LLC's EIN, never your Social Security number (`finance/BANKING.md`).
4. **Rent a USPS PO Box.** It is the only address that ever appears in public; your home address goes on government filings only (`legal/ENTITY.md`).
5. **Buy the domain `playbeforepixels.com`** plus the core set, about $72–75 in total (`legal/domain-portfolio.md`), at Cloudflare.
6. **Open the accounts in one sitting (about 90 minutes).** Use a business email and an authenticator app. Claim the handles at the same time (`marketing/SOCIAL-HANDLES.md`).
   - To sell: Etsy, Gumroad, Shopify, Printful and Amazon KDP. Check the existing "AlphaPlay" Shopify store first, because it may be reusable.
   - To be found: Pinterest, Instagram with a Facebook Page, TikTok and YouTube.
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

- **Amazon KDP paperbacks.** Titles: *100 Screen-Free Plays*, *The Day the Tablet Slept*, and *Up! Go! More!* as a square paperback. They reach buyers through Amazon's own marketplaces (US, UK, Germany, France, Spain, Italy, Netherlands, Poland, Sweden, Japan, Canada, Australia and others [VERIFY list]).
  - Order **one printed proof of each book and look at it before release**. This is quality control, and it protects the brand.
- **IngramSpark** for bookstores and libraries worldwide.
- **Printful merch**, adult sizes only, sold through Shopify and Etsy. Orders print and ship automatically.

## Wave 3: channels that sync from Shopify (weeks 4–8)

- **Automatic catalog sync:** Facebook and Instagram Shops, Google free listings and YouTube Shopping, Pinterest catalog, TikTok Shop (physical products only), and Faire wholesale.
- **Retail steps after that:** Walmart Marketplace, Amazon seller, and then the Target and Walmart buyer path (`business/sections/04-retail-target-walmart.md`).

## What Claude runs automatically, platform by platform

Each platform needs its account and key from Wave 0 first. Where a platform has no posting or listing API, Claude builds a complete upload packet (files, text, prices and keywords) in `ops/UPLOAD-PACKETS/`, and uploading it takes about 10 minutes.

| Platform | Claude runs it automatically | Needed once from Arielle | Limits (UNVERIFIED until re-checked; task #18) |
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
- **Monday–Saturday, once the founder's setup steps are done (paused on September 28, 2026): the daily studio routine (2:47 a.m. ET, overnight so it does not use Arielle's daytime Claude allowance).** It builds or improves one product and keeps social posts queued.
- **Every Sunday: the weekly market-research routine (Sunday 3:52 a.m. ET).** It re-ranks what to build next and re-checks facts marked UNVERIFIED.
  - **Not switched on yet.** On September 28, 2026 the session's permission system blocked Claude from switching it on. Arielle can switch it on herself in the Routines list at claude.ai/code ("Play Before Pixels weekly market research").
- **Both routines run in build-only mode for now (`ops/PAUSE`).** They build and research every day but publish nothing until the accounts exist, the launch gate passes and Arielle says go. Claude then deletes `ops/PAUSE` and switches on the daily check (6:38 a.m. ET), which watches the stores and sends her the money updates.

## How Arielle is protected through all of this

- **The seller is AlphaPlay LLC,** never her personally. Every account, receipt and contract is in the LLC's name and uses its EIN.
- **Her home address is never public:** only the PO Box appears.
- **Nothing is said or sold that could draw a claim:** no health claims, no naming or criticizing anyone, and one honest price per product. The policies are reviewed by an attorney before they go live.
- **Employment counsel signs off first,** and insurance is in place before the first sale.
- **Her personal Gmail and Drive are never connected to the automation.** Routines carry no connectors.
- **Keys live only in the environment settings,** where she can switch any of them off at any time. Creating `ops/PAUSE` stops all publishing at once.
