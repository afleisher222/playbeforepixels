# Trust checklist: every legitimacy signal, in priority order

**For:** AlphaPlay LLC, doing business as Play Before Pixels
**Prepared:** September 27, 2026

**About the facts in this file:**
- The verified-findings input for this pass was empty. So every fee, price, settings path and eligibility rule here is **UNVERIFIED**. Figures come from other repo documents (which are also marked UNVERIFIED) or are marked `[VERIFY]`. Check each one at the source on the day you act on it.
- The steps themselves (what to do and why) are ordinary good practice. They don't depend on those figures.

**The principle:** we look legitimate by *being* legitimate and showing it plainly. Every signal on this page is real and checkable. The "Never" list at the end matters as much as the rest. One fake badge or invented review can undo all the real ones, and some fakes are illegal (FTC 16 CFR Part 465; see `legal/LEGAL-LAUNCH-CHECKLIST.md` row 16).

**Binding decisions that shape this list** (from `legal/ENTITY.md`, `brand/BRAND.md` and `finance/BANKING.md`):
- **Public address:** the business mailing address is a **USPS PO Box**, written everywhere as `[BUSINESS MAILING ADDRESS]`.
  - The old 11140 Rockville Pike mailbox is **no longer used**.
  - The founder's home address never appears publicly.
- **No phone number and no live chat.** The business works by email and contact form only, and we turn that into a strength: "every answer in writing."
- **Faceless:** no founder photo or name is required. The About page still has to be real and specific.
- **No coaching or live services.** Take any coaching page, booking link or "Coaching & Workshop Terms" wording off the site before launch. Workshops are sold only as host-it-yourself kits.
- **Banking:** the Chase checking account is closed. Every payout-related signal waits for the new business checking account.

Priority key:
- **P0:** before the site goes public.
- **P1:** before the first sale.
- **P2:** within 90 days.
- **P3:** as the business grows.

---

## P0: Before the site is public (legal identity and the basics)

| # | Signal | Why buyers, schools and platforms care | How | Cost (UNVERIFIED) | Where |
|---|---|---|---|---|---|
| 1 | **AlphaPlay LLC is in good standing** | School vendor portals, banks and payment processors check it. A forfeited LLC can't open accounts. | Look up the LLC on SDAT Business Entity Search. File any overdue Annual Report. Save a PDF of the good-standing status. | $0 to check. Annual report about $300/yr | dat.maryland.gov; egov.maryland.gov/BusinessExpress |
| 2 | **"Play Before Pixels" trade name registered to AlphaPlay LLC** | It lets the bank accept payments made out to the brand name, and it makes "AlphaPlay LLC d/b/a Play Before Pixels" true on paper. | File the trade name through Maryland Business Express. Keep the approval PDF in the legal records. | About $25; renew every 5 yrs | Maryland Business Express |
| 3 | **Business bank account in the LLC's name, with the DBA added** | Payout names match invoices, it avoids commingling, and checks made out to either name can be deposited. | Open a no-fee, no-minimum business checking account (`finance/BANKING.md`). Add a "Tax reserve" sub-account. | Target $0/mo | Bank of choice `[VERIFY fees]` |
| 4 | **One legal identity, written the same way everywhere** | Mismatched names are the #1 thing that makes a small shop look shady. | Write **"AlphaPlay LLC, d/b/a Play Before Pixels"** in: the site footer, every policy, invoices, quotes, receipts, the vendor packet, marketplace "legal name" fields and the CAN-SPAM footer. Use the copyright line from `legal/ENTITY.md`. | $0 | Everywhere |
| 5 | **Domain registered to AlphaPlay LLC** | Proves ownership. Losing the domain is the most common way a small brand gets hijacked. | Register at Cloudflare in an LLC-owned account with a role email. Turn on auto-renew, registrar lock and 2FA. Registrant contact = PO Box, never home. | About $10.50/yr for .com | `legal/domain-portfolio.md` |
| 6 | **Email on our own domain** | Mail from a free Gmail address looks like a hobby and gets trusted less by school spam filters. | Create role addresses: `hello@`, `orders@`, `wholesale@`, `fundraising@`, `privacy@`. Use a real mailbox provider for sending (Google Workspace or Zoho Mail; compare `[VERIFY price]`). Cloudflare Email Routing can forward, but it doesn't send. | About $0–$8 per user/mo `[VERIFY]`. Role addresses can be aliases of one mailbox | Cloudflare DNS + mailbox provider |
| 7 | **Email authentication: SPF, DKIM and DMARC** | Without them, receipts and school replies land in spam, and anyone can spoof our domain. | 1) SPF: one TXT record listing only the services that send for us (mailbox provider, email platform, store). 2) DKIM: turn it on at each sending service and paste its DNS records. 3) DMARC: start at `p=none` with a report address, then move to `p=quarantine` after 2–4 clean weeks. 4) Authenticate the domain in the email platform (MailerLite/Kit) and in Shopify's sender settings. | $0 | Cloudflare DNS; each sender's "domain authentication" page `[VERIFY paths]` |
| 8 | **Real postal address shown** | CAN-SPAM requires it in marketing email. Schools need a remit-to address. Buyers look for one. | Rent the USPS PO Box. Enter it once in `legal/ENTITY.md`, then fill `[BUSINESS MAILING ADDRESS]` everywhere. | PO Box fee `[VERIFY at usps.com]` | Footer, Contact, policies, emails, invoices |
| 9 | **Policy pages published and linked in every footer and at checkout** | Google Merchant Center, payment processors and careful buyers all look for them. | After attorney review, publish: Terms, Privacy, Shipping/Returns/Refunds, Medical & Educational Disclaimer, Accessibility, Affiliate Disclosure and the Digital Product License. **Rewrite or remove the Coaching & Workshop Terms** (no live services). Show a "Last updated" date on each. | Attorney review about $500–$2,000 (estimate) | `legal/` |
| 10 | **Contact page that answers in writing** | "Can I reach a human?" is the core trust question. | Show: the contact form, `hello@` and `orders@`, the promise "We reply within 2 business days", the legal name and the PO Box. Explain the email-only policy warmly ("so every answer is in writing and easy to find again"). No phone number, no chat widget. | $0 | /contact |
| 11 | **An About page that's faceless but specific** | Anonymous shops feel risky. Specific facts replace a face. | Cover: who we are (a small Maryland company, AlphaPlay LLC); what we make and for whom; what we are **not** (not medical, not therapy, not speech-language services); how products are made (printed on demand by established book and merch printers, shipped directly to you); our research standard (primary sources only, "associated with", never "causes"). Say plainly how illustrations are made; AI-assisted art is never described as hand-drawn (`ops/COMPLIANCE-GATE.md` line 8). Use the logo, not a stock "founder" photo. | $0 | /about |
| 12 | **Research page with full citations** | For parents and educators, the evidence page *is* the credibility. | List only the allowed citations in `brand/BRAND.md` rule 5, with journal, volume, pages and a DOI or link. Use association language. Show a "How we use research" note and a "Report an error" email. | $0 | /research |
| 13 | **HTTPS everywhere, with no mixed content** | Browser warnings kill trust instantly. | Cloudflare Pages serves HTTPS automatically. Turn on "Always Use HTTPS" and HSTS once stable. Put the shop on a subdomain (`shop.`) with its own certificate. | $0 | Cloudflare dashboard `[VERIFY setting names]` |
| 14 | **Consistent brand assets** | A matching logo, favicon and preview image across site, shop, marketplaces and social reads as one real company. | Use the finished kit in `brand/logo/`: favicon, apple-touch icon, `og-image-1200x630.png`, social avatar. | $0 | `brand/logo/` |
| 15 | **Correct ™ / © marks** | Wrong ® use is illegal and looks amateur to anyone who checks. | Use "Play Before Pixels™" and "ALPHAPLAY™" (never ® until registered). Copyright line on every page and product. | $0 | `ops/COMPLIANCE-GATE.md` line 9 |

## P1: Before the first sale (checkout, delivery, paperwork)

| # | Signal | Why | How | Cost (UNVERIFIED) | Where |
|---|---|---|---|---|---|
| 16 | **Recognized checkout** | Buyers trust Shopify or merchant-of-record checkout pages more than an unknown form. | Checkout runs on Shopify (hub) and one merchant of record for worldwide digital sales (`commerce/PAYMENTS.md`). The shop header and footer match the main site. | Shopify about $29–$39/mo; MoR per-sale fee | `commerce/storefront-setup-guide.md` |
| 17 | **Clear card-statement descriptor** | "I don't recognize this charge" disputes are the most common chargeback for small shops. | Shopify Payments → statement descriptor: `PLAYBEFOREPIXELS` (or the closest allowed; length limits apply) plus a short descriptor such as `PBP ORDER`. Put the descriptor in the order-confirmation email. | $0 | Shopify Settings → Payments `[VERIFY path and limits]` |
| 18 | **Payment icons only for methods that are live** | A false icon is a small lie that shows at checkout. | The site build reads the enabled-methods list (`commerce/PAYMENTS.md`, "Site display"). | $0 | Site build |
| 19 | **Branded transactional emails** | The receipt is the most-read email we send. | Edit the Shopify and MoR notification templates: logo, legal name, order number, download link or delivery estimate, "Reply to this email for help" (reply-to `hello@`), the refund-policy link and the PO Box. Test every template with a real $1 order, then refund it. | $0 | Shopify Settings → Notifications; MoR email settings |
| 20 | **Complete product pages** | Vague listings look like dropshipping. | Each page shows: preview pages (watermarked), page count, trim size or paper size (Letter + A4), file format, license type, ages, "what's inside", processing and shipping time, the refund summary and the research note if relevant. No outcome claims. | $0 | Every listing (`products/<slug>/listing.json`) |
| 21 | **Delivery-time promises we can keep** | FTC mail-order rules and buyer trust both hinge on this. | State POD processing and transit ranges at checkout and on the Shipping page (fill the `[X–Y]` blanks in the policy from the printer's current published times). Tell buyers promptly about any delay. | $0 | `legal/SHIPPING-RETURNS-REFUNDS.md` |
| 22 | **W-9 ready to send privately** | Schools, districts and some PTAs can't pay a new vendor without it. | The accountant first confirms which TIN goes on it (the LLC's EIN, or the owner's for a single-member LLC). Keep a signed PDF. Send it only on request, through the requester's portal or as a password-protected PDF (`SOPs/school-orders.md`). | $0 | IRS Form W-9 |
| 23 | **Vendor information sheet** | Lets a purchasing office set us up without a phone call. | Fill the placeholders in `operations/school-vendor-packet.md`. Publish a PDF version on /schools once counsel clears school-facing sales. | $0 | This folder |
| 24 | **Business insurance and a certificate of insurance (COI) on request** | PTAs, libraries and districts often ask for one. Having one ready signals a real business. | Get quotes for general liability plus products/completed operations. Coaching E&O is no longer needed, because there are no live services. | About $400–$900/yr (estimate) | Broker quotes |
| 25 | **Search engines verified and structured data added** | It confirms ownership and helps the brand name, logo and policies show up correctly. | Verify the site in Google Search Console and Bing Webmaster Tools and submit the sitemap. Add `Organization` JSON-LD with `legalName` "AlphaPlay LLC", `name` "Play Before Pixels", `url`, `logo`, `email`, `address` (PO Box) and `sameAs` (every official profile). Use Product JSON-LD on product pages. | $0 | Site `<head>` |
| 26 | **Official profiles that link both ways** | Look-alike accounts are common. Two-way links show which ones are real. | Every social and marketplace bio links to the site. The site footer links to every official profile (from `commerce/links.js`). Use the same handle and avatar everywhere. Claim the handle on every platform, even unused ones. | $0 | `commerce/links.js` |
| 27 | **Complete marketplace storefronts** | Buyers on Etsy, TpT and Amazon judge the whole shop page. | Fill in shop About, policies, banner, logo, FAQ and the production partner (Etsy requires it for POD). Add the Amazon Author Central page. On TpT, give the store a description, license notes and a clear policy on extra licenses. | $0 | Each platform |
| 28 | **Accessibility statement and accessible PDFs** | Schools buy against accessibility requirements, and it's the right thing to do. | Publish `legal/ACCESSIBILITY-STATEMENT.md`. Offer tagged, accessible PDFs on request (a macro exists). Give images alt text and meet contrast on the site. | $0–$300 audit tool | /accessibility |
| 29 | **Privacy-light site** | "No trackers, no ad pixels" is a trust feature for parents and schools. | Cookieless analytics. No ad pixels. Audit cookies once the shop and embeds are live. Say what we don't collect in plain words ("We never ask for children's information"). | $0 | `legal/PRIVACY-POLICY.md` (remove coaching references before publishing) |
| 30 | **Uptime monitor** | A broken checkout discovered by a customer is a trust failure. | Set up a free uptime monitor for home, shop, one product and checkout, with alerts to `hello@`. | $0 | `ops/MONITORING.md` |
| 31 | **security.txt** | A small signal of a well-run site. It tells researchers where to report problems. | Publish `/.well-known/security.txt` with `Contact: mailto:security@[BUSINESS DOMAIN]` (alias to `hello@`) and an `Expires` date one year out. Renew it yearly. | $0 | Site root |

## P2: Within 90 days (proof from other people, and formal identifiers)

| # | Signal | Why | How | Cost (UNVERIFIED) | Where |
|---|---|---|---|---|---|
| 32 | **Real reviews, collected systematically** | This is the strongest trust signal for a new shop, and the easiest to fake, so we never do. | Send an automatic review request after download (day 7) and after delivery (day 10 after shipping). Rely on marketplace-native reviews. **Show every review, including negative ones.** Never make an incentive depend on a positive review. Never write, buy or AI-generate reviews. | $0–$15/mo for a review app `[VERIFY]` | Shopify review app; marketplaces |
| 33 | **Testimonials with written permission** | Endorsements must be real, typical and consented to (FTC). | Collect them through a form with a release checkbox. Attribute by role only ("Preschool teacher", "Parent of a 3-year-old"). Never name a school, district or employer. Never use a testimonial that implies a health or developmental outcome. | $0 | `ops/COMPLIANCE-GATE.md` line 10 |
| 34 | **Your own ISBNs, with AlphaPlay LLC as publisher** | Libraries, bookstores and schools see a real publisher imprint instead of "Independently published". | Buy a block of 10 from Bowker. Put AlphaPlay LLC on the copyright page. | About $295 for 10 | myidentifiers.com |
| 35 | **Library of Congress PCN (Preassigned Control Number)** | Librarians use it for cataloging, and it signals a serious publisher. | Apply before publication, through the Library of Congress PrePub Book Link program. Eligibility for small and self-publishers is `[VERIFY]`. | Believed free `[VERIFY]` | loc.gov |
| 36 | **Copyright registrations** | Enables statutory damages and adds credibility in takedowns. | Register each book, the guide and the card-deck art within 3 months of publication. | About $65 per work | copyright.gov |
| 37 | **Trademark: PLAY BEFORE PIXELS application, and the ALPHAPLAY deadline kept** | A filed mark deters look-alike shops and makes marketplace takedowns easier. | Attorney clearance search, then filing. The ALPHAPLAY Statement of Use or Extension is due **March 8, 2027**. | $350+ per class, plus attorney | `legal/ENTITY.md` |
| 38 | **Marketplace brand protection** | Marketplaces enforce IP faster for enrolled brands. | Amazon Brand Registry and similar programs generally need a pending or registered mark `[VERIFY each program's current rule]`. Enroll when eligible. | $0 | Each marketplace |
| 39 | **Government-buyer identifiers** | Some district vendor portals ask for a UEI, D-U-N-S number or NAICS codes. | Register at **SAM.gov only if a buyer asks**. SAM.gov registration is free, so ignore paid "registration services". Get a D-U-N-S number only if a portal requires one (free option `[VERIFY]`). Choose NAICS codes with the accountant. | $0 | sam.gov; dnb.com |
| 40 | **Press page (real coverage only)** | Real mentions help. Fake "as seen in" logos destroy trust. | Create the page only when real coverage exists. Link to the original article and never use the outlet's logo without permission. | $0 | /press |
| 41 | **Spanish versions of policies and FAQ** | Spanish-speaking parents should be able to read the terms they're buying under. | Translate when the Spanish site launches (`ops/INTERNATIONAL.md`), with human review. | Review cost | Site |

## P3: As the business grows

| # | Signal | Why | How | Cost (UNVERIFIED) | Where |
|---|---|---|---|---|---|
| 42 | **Google Business Profile** | **Skip for now.** An online-only business with no storefront and no phone is generally not eligible `[VERIFY Google's guidelines]`, and the profile would expose an address. | Revisit only if eligibility changes. | — | — |
| 43 | **BBB profile or accreditation** | Some parents check it. It's optional. | Show a BBB seal **only** if accredited. Answer any complaint posted there in writing, using the macros. | Accreditation fee `[VERIFY]` | bbb.org |
| 44 | **Certifications (for example woman-owned or small business)** | Some districts track diverse-vendor spend. | Claim a certification only after it's granted. Until then, the vendor packet says "none at this time". | Varies | Certifying bodies |
| 45 | **A Data Privacy Agreement answer for districts** | Districts increasingly ask vendors to sign student-data agreements. | Our position: we collect **no student data**, so print and PDF products need no DPA. Have counsel prepare a short "no student data" letter. Never sign a district's DPA without counsel. | Attorney time | `SOPs/school-orders.md` |
| 46 | **EU/UK product-safety responsible person** | Required before selling physical goods to the EU (GPSR). | Appoint one before EU direct sales of physical goods, or ship to the EU only through distributors. | EU rep service fee | `legal/LEGAL-LAUNCH-CHECKLIST.md` row 21 |
| 47 | **Published "state of the shop" transparency** | Optional. A yearly note on what we made and what we fixed builds long-term trust. | One page updated each January (see `SOPs/yearly.md`). No revenue figures needed. | $0 | /about |

---

## Never (these look legitimate only until someone checks)

- **No fake or bought reviews.** No AI-written reviews, no reviews from friends or insiders without disclosure, no hiding negative reviews, no buying followers or views (FTC 16 CFR Part 465).
- **No invented numbers.** No "10,000 families", "#1 bestseller" or "award-winning" unless true and documented, and no fake countdowns or "only 3 left" on digital goods.
- **No unearned badges or seals:** BBB, "secure checkout", "verified", awards, "teacher-approved", "PTA-approved", "as seen in".
- **No borrowed authority.** Citing WHO, AAP or UNESCO is fine; using their logos or implying endorsement is not. Never imply clinical, SLP or medical credentials.
- **No fake people.** Don't invent staff names, stock-photo "founders" or persona bios. Customer service signs as "The Play Before Pixels team".
- **No naming schools, districts or employers** as customers, and no criticizing any school, company or product.
- **No health or outcome claims**, in any signal, testimonial or FAQ.
- **No old or home address.** Never the retired Rockville Pike mailbox, never the founder's home.
- **No phone number,** not even a "temporary" one, unless the founder changes the no-direct-contact rule in writing.

## Quick self-audit (run it before launch and then quarterly in `SOPs/quarterly.md`)
- [ ] Buy one digital item and one physical item as a stranger would. Did every email show the legal name, a way to reply and the policy link?
- [ ] Search the brand name in a private window. Is every result ours, or clearly someone else?
- [ ] Is the legal name the same on the footer, invoice, receipt, card descriptor and every marketplace?
- [ ] Do the SPF/DKIM/DMARC records pass? (Send a test to a Gmail address and look for "mailed-by / signed-by" our domain.)
- [ ] Is every policy link live, with a current "Last updated" date?
- [ ] Is there any badge, count or claim we can't document? Remove it.
