# Launch now: the fastest safe path to worldwide sales

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
- **Every day from September 28, 2026: the daily studio routine (2:47 a.m. ET, overnight so it does not use Arielle's daytime Claude allowance).** It builds or improves one product and keeps social posts queued.
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
