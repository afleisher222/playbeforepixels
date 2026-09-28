# Automation map: from order to accountant

**For:** AlphaPlay LLC, doing business as Play Before Pixels
**Prepared:** September 27, 2026

**About the facts in this file:** the verified-findings input for this pass was empty. Tool names, fees and settings paths come from `commerce/` and `finance/`, which are themselves UNVERIFIED, or are marked `[VERIFY]`. Confirm each setting in the live dashboard when you configure it.

**Related files:** `commerce/PAYMENTS.md`, `commerce/storefront-setup-guide.md`, `finance/money-and-tax-setup.md`, `finance/TAX-AUTOPILOT.md`, `ops/ROUTINE.md`, `ops/SECRETS.md`.

**The goal:** every order sells, delivers, reports and books itself. The founder touches only:
- identity and bank verification (once);
- the few manual uploads with no API (KDP, IngramSpark, TpT);
- mobile-depositing a school check (rare);
- written approvals in `ops/APPROVALS.md`.

**Out of scope:** coaching and every live service (founder's instruction, `brand/BRAND.md`). Nothing below routes a booking, call or session.

---

## 1. The whole flow on one page

```
 BUYER
   |
   v
+------------------------------------------------------------------------------------+
| STOREFRONTS (where the order happens)                                              |
|  Site (Cloudflare Pages) --links--> Shopify shop (shop.[DOMAIN])                   |
|                           --links--> Merchant of record (digital, worldwide)       |
|                           --links--> Amazon / Bookshop.org / Etsy / TpT / TikTok   |
|  Schools & groups -> quote form -> orders@ -> draft-order invoice / PO             |
+------------------------------------------------------------------------------------+
   |                         |                          |                     |
   | digital                 | print-on-demand          | license             | wholesale
   v                         v                          v                     v
 instant download      POD partner / KDP /        stamped PDF license     Faire (2027) or
 (Shopify digital app  IngramSpark prints and      certificate + links    direct PO -> POD
  or MoR; marketplace  ships from its own site     emailed automatically  ships to retailer
  delivers its own)    (no inventory, ever)
   |                         |                          |                     |
   +-------------+-----------+--------------------------+---------------------+
                 |
                 v
 CUSTOMER EMAILS (automatic): receipt · download / license · shipped + tracking ·
 review request (day 7-10) · email-list tag (only if the buyer opted in)
                 |
                 v
 PAYOUTS (on each platform's schedule) --------------------> 1000 BUSINESS CHECKING
   Shopify Payments · MoR · Etsy · TpT · TikTok · KDP (~60d) ·   (AlphaPlay LLC d/b/a
   IngramSpark (~90d) · Faire · Associates · checks/ACH           Play Before Pixels)
                                                                        |
                        bank rule: fixed % of each deposit              |
                        + 100% of MD sales tax collected  ------> 1010 TAX RESERVE
                                                                        |
 COSTS: POD, printing, ISBNs, software, ads --> 2000 BUSINESS CARD <----+ paid in full monthly
                 |
                 v
 BOOKKEEPING
   bank + card feeds ----------------------------------> QuickBooks Online (ledger)
   Link My Books: Shopify, Etsy, TikTok settlements ----> (one entry per payout)
   Claude monthly close: KDP, IngramSpark, TpT, Faire,
     MoR -> journal entries + workbook + finance/closes/YYYY-MM.md
                 |
                 v
 ACCOUNTANT (read-only / Accountant user): monthly folder · quarterly estimates ·
   Maryland sales-tax return (or filing service) · year-end packet
```

---

## 2. Channel-by-channel summary

| Channel | What sells there | Who is the seller / who collects sales tax | Delivery | Payout | Into the books |
|---|---|---|---|---|---|
| **Shopify (own shop)** | Printables (US buyers), POD merch, physical card deck, classroom single licenses, school/group invoices (draft orders) | **AlphaPlay LLC.** Shopify Tax calculates MD tax; we file | Digital-download app; POD app; license email | Shopify Payments → checking | Link My Books → QBO |
| **Merchant of record** (Lemon Squeezy, Gumroad or Payhip; pick ONE) | Printables, bundles, 30 Days of Back-and-Forth course (written), workshop kits, research briefs, for **worldwide** buyers | **The MoR** (it collects VAT/GST and US sales tax) | MoR emails the download or course access | MoR → checking | Monthly journal entry (gross vs. net: accountant decides) |
| **Etsy** | Printables, POD merch, card deck | Etsy (marketplace facilitator) | Etsy digital delivery; POD partner linked as production partner | Etsy Payments → checking | Link My Books → QBO |
| **Teachers Pay Teachers** | Classroom pack, printables (TpT license framework) | TpT | TpT delivers | TpT (historically via PayPal) → checking | Monthly journal entry; PayPal→checking recorded as a transfer |
| **TikTok Shop** | Physical only (merch, card deck, books). No digital goods | TikTok | POD partner integration | TikTok → checking | Link My Books → QBO |
| **Amazon KDP** | Paperback, hardcover, Kindle | Amazon | Amazon prints and ships | EFT about 60 days after month end | Monthly journal entry (royalty receivable) |
| **IngramSpark** | Hardcover and paperback to bookstores, libraries, Bookshop.org | Retailer | Ingram prints and ships | About 90 days after month end | Monthly journal entry |
| **Schools and organizations** | Site, grade-band and district licenses; Family Night kits; classroom sets | AlphaPlay LLC (tax-exempt certificate kept on file) | License certificate email; books ordered from the printer shipped to the school | Card/Shop Pay on the invoice, ACH, or check to the PO Box | Shopify draft order → Link My Books; ACH/check → manual match |
| **Fundraiser groups** | Group storefront link (printables, card deck, books) | AlphaPlay LLC (on our own shop) | As above | Shopify Payments; group's share paid by ACH | Group payout coded as the accountant directs (`SOPs/monthly.md`) |
| **Wholesale** | Card deck, books, kits | Buyer resells (resale certificate on file) | POD ships to retailer | Faire payout, or invoice | Faire journal entry / Shopify draft order |
| **Affiliates** (Amazon Associates, Bookshop.org) | Links only | n/a | n/a | Deposit | Bank rule → 4700 Affiliate income |

---

## 3. Flows by product type

### 3A. Printable bundles and PDFs (Play-First Family Kit (ages 0–5); 5–12 Play-First Family Kit (ages 5–12); *100 Plays* PDF; card-deck printable)
```
Buyer clicks "Buy" on site
 ├─ US buyer ──> Shopify checkout ──> digital-download app emails link (limit e.g. 5 downloads / 30 days)
 └─ non-US   ──> MoR checkout ──────> MoR emails link + receipt (VAT handled)
      │
      ├─ order tagged "digital" + product slug ──> email platform (only if opt-in box ticked)
      ├─ day 7: review request email
      └─ payout ──> checking ──> tax-reserve rule ──> QBO (Link My Books / MoR journal entry)
```
**Settings:**
- **Shopify:** install one digital-download app. Set the download limit and link expiry (for example 5 downloads and 30 days). Turn on PDF stamping with the buyer's name and order number if the app supports it `[VERIFY app features]`.
- **Shopify, digital-only products:** Settings → Checkout → customer contact method = email. Mark products as not requiring shipping.
- **Shopify, EU/UK buyers:** add a checkout checkbox where the buyer agrees to immediate delivery and acknowledges losing the right to cancel (see the refund policy). Better: send non-US buyers to the MoR.
- **MoR:** turn on the same PDF stamping or license keys where offered, set the refund policy link and a custom receipt footer (legal name, `hello@`, PO Box), and connect the payout bank.
- **Files:** every PDF carries the license short notice (`legal/protection/digital-product-license.md`, Part A) and the copyright line in its metadata.

### 3B. Same products on Etsy and TpT
Upload packets are built by the routine (`ops/UPLOAD-PACKETS/`). Etsy listings can be created through the API once `ETSY_*` keys exist. TpT has no API, so the founder uploads.
```
Marketplace order ──> marketplace delivers the file + sends its receipt ──> marketplace collects tax
                  ──> payout on its schedule ──> checking ──> Link My Books (Etsy) / journal entry (TpT)
```
**Settings:**
- **Etsy:** Payment settings → deposit schedule weekly. Add the POD partner under production partners. Shop policies should match our refund policy.
- **TpT:** use TpT's license options (single / additional licenses at a discount).

### 3C. Play & Talk Classroom Pack (PreK–5): licenses
| License | How it's bought | Delivery |
|---|---|---|
| Single classroom | Self-serve: Shopify, MoR or TpT | Instant download. The PDF footer shows "Single-Classroom License" |
| Grade-band / site | Self-serve on Shopify (variant = license type + site name field), **or** by quote/PO | Automatic email with a **stamped license certificate PDF** (license no. `LIC-YYYY-###`, site name, grades, date, terms link) plus download links |
| District / multi-site | Quote only (`SOPs/school-orders.md`) | Same certificate listing every site |

```
Self-serve site license ─> Shopify order with line-item property "Site name"
   └─> order webhook / weekly routine ─> render certificate (node brand/render.js pdf) ─> email from orders@
Quote/PO ─> SOPs/school-orders.md ─> paid or PO accepted ─> certificate + links emailed
```
**Gaps to build:**
- a license-certificate HTML template in `products/` (the routine renders it with `brand/render.js`);
- a license register tab in the bookkeeping workbook, or `operations/license-register.csv`, holding license no., buyer, site, grades, dates, and order or invoice no.

Until the webhook automation exists, the daily routine sends certificates for new site-license orders using the approved macro.

### 3D. Host-it-yourself workshop kits and research briefs (for groups)
- **Per event, annual or network license:** sold self-serve (Shopify for US buyers, MoR elsewhere) or by quote.
- **Delivered as** a ZIP or folder link with the facilitator script, slides, handouts and Spanish family handouts, plus a license certificate naming the organization.
- **Presented by the group's own member.** The license says so. We never supply a presenter.

### 3E. Print books (talk-along board books and picture books; *100 Plays* paperback)
```
Site "Buy" buttons ──> Amazon (geo-routed) / Bookshop.org / library vendors (Ingram)
   └─ the retailer sells, prints, ships, collects tax
KDP royalty (≈60d) & IngramSpark compensation (≈90d) ──> checking ──> monthly journal entries
School/group bulk order ──> quote ──> paid ──> founder (or routine packet) orders author/printer copies
                                               shipped DIRECT to the school's address (never home)
```
- **Board books:** KDP doesn't print them. Until the offset run plus 3PL decision (`ops/QUEUE.md` item 0), sell the square paperback edition. No inventory is ever held at home.
- **Bulk-order printing cost:** coded to COGS. It is not inventory, because the books ship straight from the printer to the buyer.

### 3F. Physical card deck and POD merch
```
Shopify / Etsy / TikTok order ──> POD app auto-submits the order (auto-confirm ON) ──> printer ships
   ──> tracking syncs back ──> "shipped" email ──> POD charges the business card (COGS)
```
**POD partner settings:**
- auto-confirm orders ON;
- the business card on file;
- the return address = the POD partner's own returns address or the PO Box (never home);
- branded packing slip with `hello@` and legal name;
- resale certificate uploaded.

**Scope:** adult sizes only until the CPSIA documents are in hand (`legal/LEGAL-LAUNCH-CHECKLIST.md` rows 29–30).

### 3G. 30 Days of Back-and-Forth (written course)
- Sold and delivered by the MoR's course or membership feature, or by one course platform, whichever the storefront guide settles on.
- **Access emailed automatically.** Daily lessons are drip emails or unlocks. There are no videos of the founder.
- **Refund rule:** follows `legal/SHIPPING-RETURNS-REFUNDS.md` §4. The platform's refund window must be set to match.

### 3H. Fundraiser program (PTAs, parent groups)
- The group signs up on the form. The routine creates a **group collection link** plus a **discount or referral code** in Shopify so group sales can be reported.
- After the window closes, the routine totals the group's sales and drafts the payout for approval in `ops/APPROVALS.md`.
- The founder approves, and the bank sends the ACH.
- Record the group's signed agreement, W-9 (if the accountant requires it) and payout.
- **Gate:** counsel approves the agreement and the commercial co-venturer question before launch (`marketing/templates/fundraiser-program-one-pager.md`).

### 3I. Wholesale
See `SOPs/wholesale-orders.md`. The Faire payout gets a journal entry. Direct orders go through a Shopify draft order at wholesale price, with the resale certificate attached to the customer record and the customer marked tax-exempt.

---

## 4. Tools and the settings that make them hands-off

| Tool | Job | Key settings (paths UNVERIFIED) |
|---|---|---|
| **Cloudflare** (Registrar, DNS, Pages, Email Routing) | Site, domain, mail forwarding | Registrar lock + auto-renew. 2FA with two admins. SPF/DKIM/DMARC records. Pages deploy from the repo with `CLOUDFLARE_API_TOKEN`. Email Routing forwards role addresses to the mailbox |
| **Mailbox** (Google Workspace or Zoho) | Sends and receives `hello@`, `orders@`, `wholesale@`, `fundraising@` | One mailbox with aliases. Labels and filters per alias. Saved replies loaded from `customer-service/macros.md`. Vacation auto-reply OFF (there is always a 2-business-day promise) |
| **Shopify** | Hub checkout | Payments (statement descriptor); Taxes (Shopify Tax, MD registration number); Notifications (branded, reply-to `hello@`); Checkout (email marketing opt-in box, **unchecked by default**); customer accounts; draft orders for invoices; Markets only as regions clear `ops/INTERNATIONAL.md`; staff account for the accountant (reports only) |
| **Merchant of record** | Worldwide digital and the course | Payout bank, refund policy link, receipt footer, PDF stamping or license keys, tax-inclusive pricing for EU/UK |
| **POD partner** (one of Printful, Printify, Gelato) | Merch and physical deck | Auto-confirm; billing card; packing slip; resale certificate; return address |
| **Email platform** (MailerLite or Kit) | List and receipts-to-list | Double opt-in; domain authenticated; buyers added **only** with opt-in; PO Box in the footer; unsubscribe honored automatically |
| **QuickBooks Online** | Ledger | Bank and card feeds; bank rules (`finance/money-and-tax-setup.md` §5A); accountant invited as the Accountant user |
| **Link My Books** | Settlement posting | Connect Shopify, Etsy, TikTok; tax mapped to 2200 (MD) and marketplace tax kept out of income |
| **Bank** | Deposits and tax reserve | Rule: fixed % of each deposit to the Tax-reserve sub-account (the accountant sets the %). Alerts on any withdrawal over $X and on any change to linked accounts |
| **Sales-tax filing** (the accountant, or a filing service) | MD returns | Zero returns filed too (`finance/TAX-AUTOPILOT.md` §1) |
| **Uptime monitor** | Checkout watch | Alerts to `hello@` (`ops/MONITORING.md`) |
| **Claude routines** | Daily check, weekly studio, monthly close | `ops/ROUTINE.md`; keys in `ops/SECRETS.md` |

### Keys still missing for full automation (add to `ops/SECRETS.md`)
- `SUPPORT_MAILBOX_*`: API or OAuth access to the support mailbox, so the daily routine can triage and send **approved** macros. Without it, the routine drafts replies into `ops/APPROVALS.md`.
- `MOR_API_KEY`: the chosen merchant of record, if not Gumroad.
- `QBO_*`: read-only, for the close. Optional, because the workbook plus the accountant's own access also works.
- Bank read-only data connection, if the new bank offers one (`finance/BANKING.md`).

---

## 5. Who does what, and when

| Step | Automatic | Claude routine | Founder | Accountant |
|---|---|---|---|---|
| Checkout, delivery, receipts, shipping | Always | — | — | — |
| Customer email triage | — | Daily (macros) | Approves anything off-script (weekly batch) | — |
| School quotes, POs, license certificates | Quote form → `orders@` | Drafts the quote, invoice and certificate | Approves unusual terms; signs W-9 once | Confirms TIN |
| Check deposits | — | Reminds | Mobile deposit (rare) | — |
| Payout matching and journal entries | Feeds + Link My Books | Monthly close | — | Reviews |
| Sales-tax return | Filing service (optional) | Prepares the numbers | Authorizes | Files or reviews |
| Estimated taxes | EFTPS scheduled | Reminds | Schedules once a year | Sets amounts |
| Year-end packet | — | Assembles in January | Forwards 1099s | Prepares returns |
