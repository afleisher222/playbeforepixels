# Legitimacy and legal-gate check

_AlphaPlay LLC, trading as Play Before Pixels. Internal file, not for publication. Written September 28, 2026 as a final check of the whole business against what a real, legitimate small business would have in place before its first sale. It reads the repository only. It is not legal or tax advice. Web search and government sites were not reachable, so **every outside rule, fee, threshold and date below that is not in a repository file is from memory and marked UNVERIFIED.** Facts the repository already sources keep that file's own label. Nothing here changes `ops/PAUSE`: nothing is published._

**Status labels**
- **DONE**: in place in the repository, or decided and recorded. Some DONE items still need the named person to confirm them before launch.
- **FOUNDER**: a step only the owner can take (an account, a signature, a filing, a payment).
- **COUNSEL**: a question for an attorney (the founder's own counsel for Gate A; a business or IP attorney for the rest).
- **ACCOUNTANT**: a question for the accountant.
- **CLAUDE**: a fix a build session makes in the repository. No outside person is needed.

Items that need a new founder answer are also in `ops/APPROVALS.md` as PENDING one-liners (marked "→ APPROVALS" below).

---

## The verdict in five lines

1. **The design is legitimate.** One legal seller (AlphaPlay LLC), one trade name, EIN-only accounts, a PO Box as the only public address, no health claims, honest single prices, opt-in email only, adult-directed products, a compliance gate on every public item, and a pause switch that holds everything until the gate passes.
2. **The business is not yet legitimate to operate**, because the paperwork does not exist yet. There is no bank account, no insurance, no trade-name filing, no confirmed good standing, no sales-tax registration for retail and digital sales, no attorney-reviewed policies, and no written counsel go-ahead. All of these are already Gate A items or founder steps.
3. **The biggest live exposure is the public repository.** It holds internal plans and personal-context files. Making it private is a 5-minute founder step (`ops/APPROVALS.md`, URGENT).
4. **New gaps this check found** (not previously tracked anywhere): a Maryland trader's license question, the home-address-on-SDAT fix, the operating agreement and IP assignment, the accountant engagement, EU trader details that Etsy may display, child birth-month data under newer state privacy laws, the FTC Mail Order Rule for later direct shipping, and font licence files. Each is below.
5. **Hard deadlines:** copyright filings before **Nov 11, 2026**; ALPHAPLAY Statement of Use or extension by **March 8, 2027** (the file `legal/ENTITY.md` records this from the USPTO Notice of Allowance); Maryland annual report **April 15, 2027**.

---

## 1. Entity and trade name

| # | Item | Status | Covered in |
|---|---|---|---|
| 1.1 | AlphaPlay LLC is the only seller, contracting party, copyright owner and trademark applicant. "Play Before Pixels" is its trade name. No new LLC. | DONE | `legal/ENTITY.md`; `ops/COMPLIANCE-GATE.md` line 8 |
| 1.2 | Confirm the LLC is in good standing with Maryland SDAT, and that the 2026 annual report and personal property return were filed (the repo does not know). | FOUNDER | `legal/LEGAL-LAUNCH-CHECKLIST.md` row 2; `legal/protection/PROTECTION-PLAN.md` §1; `ops/PRE-MORTEM.md` risk 27 |
| 1.3 | Register the trade name "Play Before Pixels" with SDAT (about $25; renew every 5 years; fee UNVERIFIED). | FOUNDER | checklist row 3; `ops/DEADLINES.md` |
| 1.4 | Resident agent and principal office: SDAT records are public, and a mailbox or PO Box cannot be the principal office or agent address (repo source: PROTECTION-PLAN §1). To keep the home address off public records, use a commercial Maryland resident agent (about $50–$300 a year, UNVERIFIED) and ask whether its address can serve as principal office. → APPROVALS | FOUNDER + COUNSEL | `legal/protection/PROTECTION-PLAN.md` §1 "Resident agent and principal office"; `ops/PRE-MORTEM.md` risk 6 |
| 1.5 | Written single-member operating agreement, and a signed IP assignment from the founder to the LLC (a copyright transfer must be in writing). → APPROVALS | COUNSEL | PROTECTION-PLAN §1 and table row 5 |
| 1.6 | Corporate-records file (formation date, annual-report status, standing check date, tax account, agreement and assignment signed yes/no, with no numbers or addresses). | CLAUDE | `ops/PRE-MORTEM.md` risk 27 fix 3 (`legal/CORPORATE-RECORDS.md` does not exist yet) |
| 1.7 | Contracts signed as "AlphaPlay LLC d/b/a Play Before Pixels, By: [name], Member"; no personal guarantees. | DONE (rule) | PROTECTION-PLAN table row 1 |
| 1.8 | **New:** Maryland trader's license. From memory (UNVERIFIED), Maryland requires a trader's license, issued through the circuit court clerk of the county where the business is located, for anyone who sells goods at retail or wholesale. Whether an online-only seller of downloads and print-on-demand books needs one is unclear. Nothing in the repository mentions it. → APPROVALS | ACCOUNTANT (or COUNSEL) | none yet; add the answer to `finance/money-and-tax-setup.md` §13 |
| 1.9 | **New:** local home-occupation rules. Some Maryland counties require a home-occupation registration even for a home office with no customers (UNVERIFIED). Ask the same person as 1.8. | ACCOUNTANT (or COUNSEL) | none yet |
| 1.10 | Federal beneficial-ownership (BOI) report. From memory, FinCEN's March 2025 interim rule exempted U.S.-formed companies from reporting (UNVERIFIED). Confirm nothing is owed. | ACCOUNTANT | `legal/protection/PROTECTION-PLAN.md` (mentions FinCEN); `operations/SOPs/yearly.md` |
| 1.11 | The core asset (this repository) and the tools sit in personal accounts. Move the repository to an LLC-owned GitHub organization and bill tools to the LLC card, after the repository is private. | FOUNDER (later) | `ops/PRE-MORTEM.md` risk 27 fix 4 |

## 2. Tax registration

| # | Item | Status | Covered in |
|---|---|---|---|
| 2.1 | Use the LLC's existing EIN on every account and W-9 / tax interview; never an SSN. | DONE (rule); FOUNDER at each signup | `legal/ENTITY.md`; `ops/ACCOUNT-SETUP-CHECKLIST.html` |
| 2.2 | Add retail sales and digital products to the LLC's Maryland sales and use tax registration. Maryland taxes digital products at 6% (repo: UNVERIFIED). | FOUNDER | checklist row 5; `finance/money-and-tax-setup.md` §9 |
| 2.3 | Who collects tax on which channel: Etsy as marketplace facilitator; KDP (Amazon is the retailer); Gumroad as merchant of record; direct own-site sales are the LLC's to collect. Confirm each before the first filing. | ACCOUNTANT | checklist row 6; `finance/money-and-tax-setup.md` §9; `finance/TAX-AUTOPILOT.md` §1 |
| 2.4 | Maryland 3% tax on certain IT and software-publishing services (from July 1, 2025; repo: UNVERIFIED): does the email-delivered course fall under it? | ACCOUNTANT | checklist row 5 |
| 2.5 | Other states' economic-nexus thresholds (commonly $100,000; repo: UNVERIFIED). Far above the modeled sales; watch only. | ACCOUNTANT (watch) | checklist row 6 |
| 2.6 | EU, UK, Canada, Australia VAT/GST on digital sales: sold only through Etsy and a merchant of record, so the platform collects (repo: UNVERIFIED per platform). | DONE (design); ACCOUNTANT to confirm | checklist rows 19, 33; `legal/international-plan.md` |
| 2.7 | Income tax: tax-reserve sub-account, quarterly estimated payments, 1099-K and 1099-NEC handling, year-end packet. | DONE (plan); FOUNDER sets up the sub-account; ACCOUNTANT | `finance/money-and-tax-setup.md` §7–8, §12; `finance/TAX-AUTOPILOT.md`; `ops/DEADLINES.md` |
| 2.8 | **New as a tracked step:** engage an accountant. `finance/money-and-tax-setup.md` §13 already lists the questions, and the model budgets $500 a year, but no step says "hire one". → APPROVALS | FOUNDER | `finance/money-and-tax-setup.md` §13; `business/STRESS-TEST.md` §5 |

## 3. Bank and money controls

| # | Item | Status | Covered in |
|---|---|---|---|
| 3.1 | New no-fee business checking under the EIN with the DBA, plus a tax sub-account. The old checking account is closed. | FOUNDER (Gate A item 2) | `finance/BANKING.md`; `ops/ACCOUNT-SETUP-CHECKLIST.html` §1 |
| 3.2 | One virtual card with a monthly limit for platform and tool spending. | FOUNDER | `business/GROWTH-ENGINE.md` §2a step 6 (G2-06) |
| 3.3 | Household-money cap and review date written down (placeholder $12,000). | FOUNDER (Gate A item 4) | GROWTH-ENGINE §2a step 5; `business/STRESS-TEST.md` §6 |
| 3.4 | No commingling: every business cost paid from a personal source gets an owner-contribution entry within 30 days. | DONE (rule) | `finance/money-and-tax-setup.md` (accounts 3000/3100); PRE-MORTEM risk 27 fix 5 |
| 3.5 | Bookkeeping workbook and monthly close. | DONE | `finance/PlayBeforePixels_Bookkeeping_2026.xlsx`; `finance/money-and-tax-setup.md` §10 |

## 4. Insurance

| # | Item | Status | Covered in |
|---|---|---|---|
| 4.1 | General liability with products-completed operations, naming the LLC and the founder, **bound** (not only quoted) before the first sale. | FOUNDER (Gate A item 3) | PROTECTION-PLAN §2; checklist row 14; GROWTH-ENGINE §2b |
| 4.2 | Ask the broker in writing: are injuries from following a download's play instructions covered, and is media liability needed for the research pages? | FOUNDER | PRE-MORTEM risk 26 fix 4 |
| 4.3 | Checklist row 14 still asks for E&O "for coaching and workshops", which were retired. Reword to the current product-only business. | CLAUDE | `legal/LEGAL-LAUNCH-CHECKLIST.md` row 14; PRE-MORTEM risk 26 |
| 4.4 | Insurance record file (carrier, limits, renewal date; no policy numbers in a public repo). | CLAUDE | PRE-MORTEM risk 26 fix 2 (`legal/INSURANCE.json` does not exist yet) |

## 5. Policies

| # | Item | Status | Covered in |
|---|---|---|---|
| 5.1 | Drafts exist: Terms, Privacy, Medical & Educational Disclaimer, Affiliate & Endorsement Disclosure, Shipping/Returns/Refunds, Accessibility Statement, digital licence. | DONE (drafts) | `legal/*.md`; `legal/protection/digital-product-license.md` |
| 5.2 | Attorney review, then publish and link from every footer, email form and checkout. | COUNSEL (Gate A item 7) | checklist row 7; GROWTH-ENGINE §2b |
| 5.3 | The drafts still describe retired offerings: the Privacy Policy covers coaching sessions, coaching notes and workshops; the Terms cite coaching, workshops and the Coaching & Workshop Terms; Privacy and Refunds name Teachers Pay Teachers and Faire. A policy that describes things the business does not do is itself a deception risk. Remove them before the attorney review, so the attorney reviews what is true. | CLAUDE | `legal/PRIVACY-POLICY.md` lines 7, 19, 23, 29, 35, 52, 62; `legal/TERMS-OF-USE.md` lines 15, 21; `legal/SHIPPING-RETURNS-REFUNDS.md` line 7; `ops/LAUNCH-NOW.md` (a) 6 |
| 5.4 | Fill the placeholders ([DATE], [DOMAIN], [BUSINESS MAILING ADDRESS], contact email) once the domain, email and PO Box exist. | CLAUDE after FOUNDER steps | `ops/LAUNCH-NOW.md` (a) 6 |
| 5.5 | Refund window for the course (14 or 30 days) matches everywhere. | DONE (14 days everywhere); FOUNDER decision PENDING | `ops/APPROVALS.md`; `legal/SHIPPING-RETURNS-REFUNDS.md` Part B §4 |
| 5.6 | Licence terms (personal/family use) on every download page and inside every PDF. | DONE (rule) | checklist row 18; COMPLIANCE-GATE |

## 6. Product safety

| # | Item | Status | Covered in |
|---|---|---|---|
| 6.1 | Launch products are printables and one adult-directed paperback. Ordinary paper books are exempt from CPSIA lead testing (repo: UNVERIFIED). | DONE (design) | checklist row 9 and CPSIA notes |
| 6.2 | Books designed for children 3 and under are **not** covered by the ordinary-book exemption (repo source: PROTECTION-PLAN correction 2). The under-3 board and picture books stay HELD until counsel or the CPSC answers. | COUNSEL | PROTECTION-PLAN table row 9; PRE-MORTEM "Next in line" (CPSIA hold) |
| 6.3 | Printables for toddlers: the busy book carries a grown-up-right-there rule, the toilet-paper-tube test for under-3s, "keep paper and pieces away from mouths" and no loose hook-and-loop dots for under-3s (checked in the PDF text today). The bonus pieces for ages 1–2 are still to be resized to 2.5 in. | DONE (warnings); CLAUDE (resize) | `products/toddler-busy-book/`; `ops/LAUNCH-NOW.md` (a) 7 |
| 6.4 | Confirm with a product-safety attorney that a downloadable printable the parent prints at home is not a "children's product" the LLC certifies (UNVERIFIED). | COUNSEL | `ops/LAUNCH-NOW.md` (d) "Tax and safety" |
| 6.5 | Merch in adult sizes only; children's apparel, the card deck as a toy, and anything with non-paper parts are held until testing is arranged. | DONE (rule) | checklist rows 29–30 |
| 6.6 | EU GPSR: physical listings do not ship to the EU until a responsible person is appointed; digital stays worldwide. Confirm what KDP asks for EU paperback sales (UNVERIFIED). | DONE (rule); COUNSEL for KDP | checklist row 21; `legal/international-plan.md` §6.1 |

## 7. FTC: claims, pricing, endorsements, reviews

| # | Item | Status | Covered in |
|---|---|---|---|
| 7.1 | **Claims.** No health, development, therapy or speech claims anywhere; research pages descriptive with citations; research sign-ups kept out of product email. | DONE (rules and gate); FOUNDER decision D10 PENDING; COUNSEL on the research hub's overall impression | `brand/BRAND.md` rule 1; COMPLIANCE-GATE; checklist row 8; PRE-MORTEM risk 28 |
| 7.2 | **Pricing.** One honest everyday price per product; no invented "was" prices; a bundle shows a "separately" figure only when every part is on sale at that price in the same place (16 CFR 233, UNVERIFIED); price floors enforced. | DONE (rules and `check_listings.py`) | `commerce/PRICING.md`; COMPLIANCE-GATE line 18; GROWTH-ENGINE §2c |
| 7.3 | **"Free" offers.** The Black Friday bonus follows the "free" rules (16 CFR 251, UNVERIFIED): price held 30 days before, condition and end date stated, no "$X value". The Gift Bundle's "+ free play coupons" headline should read "+ play coupons included". | DONE (rule); CLAUDE (headline) | GROWTH-ENGINE §2c week 5; `ops/LAUNCH-NOW.md` (a) 2 |
| 7.4 | **Endorsements and affiliates.** Disclosure next to every affiliate link; the Amazon Associates sentence if enrolled (not enrolled). 16 CFR 255 (repo: UNVERIFIED). | DONE (draft) | `legal/AFFILIATE-ENDORSEMENT-DISCLOSURE.md`; checklist row 15 |
| 7.5 | **Reviews.** No fake, AI-written, bought or sentiment-conditioned reviews; no suppression; relatives and work contacts never review; free review copies disclosed (16 CFR 465, repo: UNVERIFIED). A testimonial log and check do not exist yet. | DONE (rules); CLAUDE (log and check) | checklist row 16; `marketing/BRAND-RESPECT-PLAN.md`; PRE-MORTEM risk 47 fixes 1–4 |
| 7.6 | **Subscriptions.** None at launch (Play Club deferred). Before any: clear terms, express consent, easy online cancel, reminders (ROSCA; state auto-renewal laws; repo: UNVERIFIED). | DONE (deferred); gate line to add | checklist row 17; PRE-MORTEM risk 47 fix 3 |
| 7.7 | **AI disclosure.** Etsy "Designed by" and AI flag, KDP AI questions answered truthfully, social AI labels; AI art never called human-made. | DONE (gate line 17 and 8) | COMPLIANCE-GATE lines 8 and 17 |
| 7.8 | **New:** FTC Mail Order Rule (16 CFR 435, UNVERIFIED): when the LLC itself sells physical goods for shipping (own-site merch through Printful), it must ship within the stated time, or within 30 days, or offer a refund. Not relevant at launch (Etsy digital, KDP and Gumroad digital only). Add as a gate line before any own-site physical sale. | CLAUDE (later gate line) | `legal/SHIPPING-RETURNS-REFUNDS.md` (shipping times); not in the checklist yet |

## 8. Privacy: COPPA, GDPR, CAN-SPAM, Maryland

| # | Item | Status | Covered in |
|---|---|---|---|
| 8.1 | **COPPA.** Site and emails addressed to adults; "I am the parent or guardian and 18+" tick; no child accounts, photos or data; the home tally game keeps everything on paper. | DONE (design) | checklist row 11; GROWTH-ENGINE §2c weeks 2 and 4 |
| 8.2 | **CAN-SPAM and CASL.** Double opt-in, PO Box footer, working unsubscribe, suppression list, no Etsy buyers on the list. | DONE (rules); FOUNDER (PO Box) | checklist row 10; GROWTH-ENGINE §5 email rules |
| 8.3 | **GDPR / UK GDPR.** Privacy policy covers legal bases and transfers; data-processing terms with the email platform accepted at signup; whether an Art. 27 EU/UK representative is needed (the model budgets one). | DONE (draft); FOUNDER (accept DPA at signup); COUNSEL (Art. 27) | `legal/PRIVACY-POLICY.md` §3, §7; checklist row 32 |
| 8.4 | **Cookies.** Cookieless analytics and no ad pixels, but a banner may still be needed in the EU/UK; audit the live site first. | COUNSEL after CLAUDE audit | checklist row 12; Privacy Policy §4 |
| 8.5 | **Maryland Online Data Privacy Act.** Applies at 35,000 Maryland consumers (repo: UNVERIFIED); far above the plan. It bans selling minors' data and targeted ads to under-18s; the business does neither. | DONE (not triggered; rules comply) | checklist row 31 |
| 8.6 | **New:** the sign-up form asks (optionally) for a child's birth month and year. That is data about a known child, even though it comes from the parent. Some newer state laws treat a known child's data as sensitive and apply at any size (the repo flags Connecticut from July 1, 2026, UNVERIFIED). Ask whether to keep the field, make it an age band ("0–1, 1–2 …") instead, or add consent wording. → APPROVALS | COUNSEL | GROWTH-ENGINE §2c week 2 and §4 "Mechanism"; checklist row 31 |
| 8.7 | Maryland Age-Appropriate Design Code (2024). From memory it applies only to larger businesses (revenue or data-volume thresholds; UNVERIFIED), and the site is not directed to children. Confirm in the same counsel note as 8.6. | COUNSEL | none yet |
| 8.8 | Privacy policy still lists coaching data (see 5.3). | CLAUDE | `legal/PRIVACY-POLICY.md` |

## 9. Intellectual property

| # | Item | Status | Covered in |
|---|---|---|---|
| 9.1 | **ALPHAPLAY (SN 99650345): Statement of Use or extension due March 8, 2027** (repo source: USPTO Notice of Allowance of Sept 8, 2026). Claim only goods genuinely sold; the attorney files. Packet by Feb 1. | FOUNDER + COUNSEL | `legal/ENTITY.md`; `ops/DEADLINES.md` row 1; PROTECTION-PLAN §6b |
| 9.2 | Free USPTO change-of-address form so notices reach the business; correspondence email moved to a business address. Target Oct 31, 2026. | FOUNDER | `ops/DEADLINES.md` row 2; PRE-MORTEM risk 46 fix 3 |
| 9.3 | Standing instruction: if no genuine ALPHAPLAY sales exist by Feb 1, 2027, the attorney files an extension (about $125 per class, UNVERIFIED). | FOUNDER decision | PRE-MORTEM risk 46 fix 2 |
| 9.4 | PLAY BEFORE PIXELS: attorney clearance search, then file (classes 16 and 41 first; $350 per class, repo source). Use ™ now. Not filed. | COUNSEL | PROTECTION-PLAN table row 7; `legal/DECISION-MEMO.json` |
| 9.5 | Logo (Maker's Seal): attorney clearance before filing; founder's dated edits before adoption. | COUNSEL; FOUNDER | `business/DECISIONS.md`; `brand/logo/logo-notes.md` |
| 9.6 | **Copyright filings before Nov 11, 2026** (fee rise expected after; repo source). Register only human-authored material and disclaim AI-generated material; the founder's own rewrites come first. | FOUNDER + COUNSEL | PROTECTION-PLAN §6c and "AI-assisted products and copyright"; `brand/BRAND.md` "Human authorship" |
| 9.7 | Dated creation records for each product. | DONE (log and git history) | `legal/protection/creation-records-log.md` |
| 9.8 | ISBNs: free KDP ISBN for KDP editions. | DONE (decision) | `business/DECISIONS.md` |
| 9.9 | Copycat response: takedown notice template and marketplace IP-report checklist. | DONE (templates) | `legal/protection/dmca-takedown-notice.md`; `legal/protection/marketplace-ip-report-checklist.md` |
| 9.10 | **New:** font licences. The brand fonts (Bricolage Grotesque, Nunito Sans, Fredoka, Caveat) are, from memory, Google Fonts under the SIL Open Font License (UNVERIFIED). Embedding them in sold PDFs is allowed under that licence, but the font files in this repository should carry their licence text. Add `brand/fonts/LICENSES.md` with each font's licence. | CLAUDE | `brand/fonts/` |
| 9.11 | Commercial rights in AI output: confirm the Claude plan's terms give the business the rights it sells (UNVERIFIED). | COUNSEL (one line in the IP review) | PROTECTION-PLAN "AI-assisted products" |

## 10. Marketplace rules

| # | Item | Status | Covered in |
|---|---|---|---|
| 10.1 | Etsy: business seller in the LLC's name; AI and "Designed by" disclosure; 13 tags and title limits; Offsite Ads off; Etsy buyers never marketed to; at most 5 new listings a week. All platform limits UNVERIFIED until the live check. | DONE (packets and rules); live check pending | `ops/UPLOAD-PACKETS/etsy/`; `ops/LAUNCH-NOW.md` (d) |
| 10.2 | **New:** EU trader information. From memory (UNVERIFIED), under the EU Digital Services Act, Etsy shows a business seller's name, address, email and phone to buyers in the EU. Confirm at signup which address and phone Etsy will display, and that the PO Box and business email are accepted. LAUNCH-NOW asks whether a PO Box is accepted, but not about the phone number or the public display. → APPROVALS | FOUNDER (at signup) + COUNSEL if a home address or personal phone would show | `ops/LAUNCH-NOW.md` (d) "Etsy" |
| 10.3 | KDP: tax interview as the LLC; AI questions answered truthfully; author line is the brand or a pen name only if counsel's Q9 allows; Expanded Distribution off; proof before publish. | DONE (packet); COUNSEL (Q9) | `ops/UPLOAD-PACKETS/kdp/`; GROWTH-ENGINE §2a step 1 |
| 10.4 | Gumroad as merchant of record; fees and VAT handling to confirm live. | DONE (packets); live check pending | `ops/UPLOAD-PACKETS/gumroad/`; `ops/LAUNCH-NOW.md` (d) |
| 10.5 | Pinterest: business account, warm-up ramp, API access approval. | DONE (plan); CLAUDE (ramp check) | PRE-MORTEM risk 13; top fix 10 |
| 10.6 | Meta real-identity rules for a faceless page admin. | COUNSEL (in the counsel packet) | PRE-MORTEM risk 18 and top fix 8 |

## 11. Accessibility

| # | Item | Status | Covered in |
|---|---|---|---|
| 11.1 | Website built to WCAG 2.1 AA; statement drafted. | DONE (draft); CLAUDE (automated audit before go-live) | `legal/ACCESSIBILITY-STATEMENT.md`; `site/qa/`; checklist row 22 |
| 11.2 | Alt text on every listing image. The Gift Bundle's 5 images have none. | CLAUDE | `ops/LAUNCH-NOW.md` (a) 2 |
| 11.3 | Tagged PDFs with a language set (gate line 20). The KDP interior has neither; fix or record the founder's written exception. | CLAUDE; FOUNDER (exception) | COMPLIANCE-GATE line 20; `ops/LAUNCH-NOW.md` (a) 4 |
| 11.4 | EU Accessibility Act: microenterprises are exempt for services (repo: UNVERIFIED); ask whether downloadable PDFs sold to EU consumers count as e-books. | COUNSEL | checklist row 22 |

## 12. Gate A (counsel's written go-ahead)

| # | Item | Status | Covered in |
|---|---|---|---|
| 12.1 | Written yes/no before anything is sold or marketed, with the five questions in GROWTH-ENGINE §2a step 1. Target answer: Fri Oct 16. | COUNSEL (FOUNDER sends) | `legal/FOR-EMPLOYMENT-COUNSEL.md`; GROWTH-ENGINE §2a–2b |
| 12.2 | The Gate A evidence file, so PAUSE is removed only on evidence. | CLAUDE | PRE-MORTEM top fix 6 (`ops/GATE-A.md` does not exist yet) |

## 13. Exposure (public repository)

| # | Item | Status | Covered in |
|---|---|---|---|
| 13.1 | Make the repository private. | FOUNDER (URGENT) | `ops/APPROVALS.md`; `ops/CLOUD-RUNBOOK.md` setup steps 1–2 |
| 13.2 | Several tracked files still carry personal context that the runbook says to trim to the business fact. This check did not edit them (other workflows own some of them). Ask counsel whether anything already exposed needs more than making the repository private. | CLAUDE (trim) + COUNSEL | `ops/CLOUD-RUNBOOK.md` open risk 1; PRE-MORTEM risk 1 |

---

## Added to ops/APPROVALS.md (PENDING)

1. Maryland trader's license and home-occupation question (1.8, 1.9).
2. Commercial resident agent so the home address leaves SDAT's public record (1.4).
3. Operating agreement and IP assignment (1.5).
4. Engage an accountant (2.8).
5. Child birth-month field on the sign-up form (8.6, 8.7).
6. What Etsy will show EU buyers (10.2).

## Claude's list from this check (no founder time)

Policy clean-up of retired offerings (5.3, 8.8) · checklist row 14 wording (4.3) · `legal/CORPORATE-RECORDS.md` (1.6) · `legal/INSURANCE.json` (4.4) · `ops/GATE-A.md` (12.2) · testimonial log and check (7.5) · Gift Bundle headline and alt text (7.3, 11.2) · busy-book piece resize (6.3) · PDF tagging (11.3) · font licence file (9.10) · Mail Order Rule gate line before any own-site physical sale (7.8) · cookie audit at site go-live (8.4) · trim personal context from tracked files (13.2).
