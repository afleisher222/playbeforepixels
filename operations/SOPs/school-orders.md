# School and organization orders SOP (quotes, POs, W-9, invoicing, site-license delivery)

**Applies to:** schools, child-care centers, libraries, PTAs and PTOs, nonprofits and other organizations buying licenses, kits, classroom sets or books in bulk.

**Gates, checked before any school-facing work:**
- Employment counsel has cleared school-facing sales (`legal/FOR-EMPLOYMENT-COUNSEL.md`). Until then, this SOP is ready but not in use.
- **Never quote to, accept a PO from, or reply to an organization on the outreach-exclusion list in `CLAUDE.md`,** or its staff. Log the message in `ops/APPROVALS.md` and do nothing else.
- Hard rules apply to every document: no health claims, no naming or criticizing any school or district, no local angle.

**Owners:** R = Claude routine · F = founder · A = accountant.
**Channel:** email and web forms only (`orders@[BUSINESS DOMAIN]`). No calls or meetings. If a buyer asks for a call, use macro 29 or 23.

---

## 1. Numbering and registers

**Numbering:**
- Quote: `Q-YYYY-###`
- Invoice: `INV-YYYY-###`
- License: `LIC-YYYY-###`
- The customer's PO number is always shown on our invoice.

**Registers** (spreadsheet tabs in the bookkeeping workbook, or `operations/registers/*.csv`, with **no personal data beyond the organization's name and a role contact**):
- **Quote register:** quote no., organization, date, items, total, status (sent / won / lost / expired), expiry date.
- **Receivables register:** invoice no., PO no., amount, due date, paid date, payment method.
- **License register:** license no., organization, site(s), grades, license type, start date, invoice or order no.
- **Certificate file:** tax-exemption certificates, by organization and expiry date.

## 2. Quote

1. **The request arrives** via the quote form or `orders@`. R checks it against the exclusion list first.
2. **R prepares the quote** on AlphaPlay LLC letterhead from the published price table (`marketing/templates/school-purchasing-info-sheet.md`). The quote includes:
   - legal name "AlphaPlay LLC, d/b/a Play Before Pixels", `[BUSINESS MAILING ADDRESS]`, `orders@`;
   - quote no., date, **valid for 60 days**;
   - items, license type and **the site(s) and grades covered**, quantity, unit price and total;
   - shipping (for printed items) and sales tax (or "tax-exempt on receipt of certificate");
   - payment terms: **net 30 on an approved PO**, or prepay by card or ACH;
   - delivery: digital licenses by email after the PO or payment is processed; printed books shipped direct from the printer, [X–Y] business days;
   - the license summary line and a link to the full license;
   - "Educational materials; not medical, therapy or speech-language services. No student data collected."
3. **R renders the quote PDF** (`node brand/render.js pdf`) and sends it with macro 20. The vendor packet PDF is attached.
4. **Approval:** list-price quotes go out automatically. **F approves** any discount off list, any district or multi-site quote, any custom terms, and anything above $[2,000] `[founder sets]`.
5. **Sole-source letters:** only for items sold exclusively through our direct channel (site and district licenses, host kits). Never for books or anything also on TpT or other marketplaces. **Never write "no bid needed."**

## 3. Purchase order

1. **The PO arrives** at `orders@`. R checks:
   - it is made out to **AlphaPlay LLC** (or AlphaPlay LLC d/b/a Play Before Pixels);
   - it matches the quote (items, prices, sites);
   - it comes from the organization's **real domain**. Verify the domain independently (the organization's public website), not from links in the email;
   - the ship-to address is the organization's own address, not a freight forwarder or a residence.
2. **Any red flag goes to `ops/APPROVALS.md` as SECURITY, and nothing ships.** Red flags: a free-mail address for a "district", a lookalike domain, a rush to ship large quantities of physical goods before payment, a request to buy from a third-party supplier, a ship-to that is a forwarder.
3. **Acknowledge the PO** at the next weekly batch (macro 21), with the invoice attached.
4. **Digital licenses** are delivered on a PO from a verified organization. **Printed goods** go to print on a verified PO for orders up to $[1,000] `[founder sets]`. Larger print orders are prepaid, or deposit-funded as F decides.

## 4. W-9 and vendor registration

- **W-9:** A confirms once which name and TIN go on it (the LLC's EIN, or the owner's SSN if A says a single-member disregarded LLC must). F signs it. Keep the signed PDF outside the repository.
- **How to send it:**
  - **Preferred:** upload it to the organization's vendor portal.
  - **Otherwise:** email it as a **password-protected PDF**, with the password in a separate email (macro 22).
  - Never paste the TIN into an email body, never send it to an unverified domain, and never publish it.
- **Vendor registration forms:** R fills them from `operations/school-vendor-packet.md`. F signs anything that needs a signature or certification. These go to approval:
  - insurance (COI);
  - DPAs (counsel);
  - diversity or other certifications (claim none we don't hold);
  - banking forms. ACH details go only on the organization's portal or form, never in reply to an unsolicited request.
- **Data privacy agreements:** our standard answer is the "no student data" statement (macro 26). Signing any DPA needs counsel.

## 5. Invoicing

**System: one only.** Primary is a **Shopify draft order** with "send invoice", which keeps card payments in Shopify Payments and posts through Link My Books (`commerce/storefront-setup-guide.md`, Shopify). Alternatively use QBO invoices, if A prefers. Don't use both.

**The invoice shows:**
- invoice no., date, **PO no.**, quote no.;
- bill-to and ship-to;
- items with license scope (sites and grades);
- tax (or "exempt, certificate on file");
- total, due date (**net 30**);
- the remit-to block:
  - **Card or ACH:** the secure invoice link.
  - **Check:** payable to **AlphaPlay LLC**, mailed to `[BUSINESS MAILING ADDRESS]`, with the invoice no. in the memo.
  - **ACH by bank transfer:** details supplied on the organization's vendor form or portal. If a customer asks by email, F confirms it first.
- a footer with the legal name, `orders@`, and "Thank you for supporting play-first learning."

**Payment terms for draft orders:** Shopify's draft-order payment terms (net 30) availability depends on the plan `[VERIFY]`. If they aren't available, send the invoice with the due date stated and mark the order paid manually when the ACH or check lands.

**Tax-exempt buyers:** attach the certificate to the customer record, set the customer as tax-exempt in Shopify, and keep the certificate in the certificate file.

## 6. Delivering site licenses

Delivery happens after payment, or after a verified PO for digital items (§3.4). R:
1. Assigns a license no. and writes the license-register row.
2. Renders the **license certificate PDF**:
   - license no., organization, site name(s) and address(es);
   - grades or classrooms covered, license type, start date, "perpetual for the covered site" or term `[per license terms]`;
   - "Licensed to [organization] under the Play Before Pixels Digital Product License, [URL]";
   - the copyright line.
3. **Stamps the product PDFs** with the footer "Site License LIC-YYYY-### · [Organization] · [Site]" (per `legal/protection/digital-product-license.md`, Part A).
4. **Emails the files** from `orders@`, with the certificate, the download link (expiry 30 days; re-sent on request) and a short "how to share inside your site" note: a password-protected staff drive or LMS is fine; public posting is not.
5. **For Family Night kits:** includes the host script, slides, handouts and Spanish family handouts, and the reminder that the organization's own member presents.
6. **Printed components or books:** orders them from the printer and has them shipped direct to the ship-to address. The printer's tracking is sent to the contact.

## 7. Collecting payment

- **Day 0:** the invoice is sent.
- **Due date +1 day:** friendly reminder (macro 25), with a copy of the invoice.
- **+15 days:** second reminder, asking whether any form is missing (W-9, vendor registration).
- **+30 days:** R flags it to F. F decides: another reminder, a note to the accounts-payable contact, or a pause on further orders.
- **+60 days:** F and A decide on a write-off. **Never threaten.** Licenses are not revoked for late payment without F's written decision.
- **Checks:** F mobile-deposits them the week they arrive. R matches each deposit to its invoice in the receivables register and the bank feed.

## 8. After the sale

- **Receipts:** a "paid in full" receipt is emailed on request, or automatically for card and ACH.
- **Renewal:** licenses don't expire unless the license terms say so. For annual kits, R sends one renewal reminder 30 days before the anniversary.
- **Follow-up:** 60 days after delivery, R sends one short, optional feedback request. Testimonials are used only with a signed release and attributed by role only (`TRUST-CHECKLIST.md` #33).
- **Records:** keep the quote, PO, invoice, certificate, proof of payment and tax certificate for the retention period A sets.
