# DRAFT — have a licensed attorney review before use

# Creation Records Log: dated proof of authorship

*AlphaPlay LLC d/b/a Play Before Pixels*

**Why this matters.** If a copycat claims they created something first, or someone accuses Play Before Pixels of copying, dated source files prove **independent creation** and the timeline. The **strongest** dated evidence is a U.S. Copyright Office registration certificate, so this log supports registration and does not replace it (see `PROTECTION-PLAN.md` §6c; https://www.copyright.gov/help/faq/faq-register.html). Keeping this log is a practical habit, not a legal requirement.

---

## The rules

1. **Business accounts and devices only.** Create and store all business work in a dedicated **business** cloud folder with version history (for example, a folder owned by the business email account). **Never use employer-issued devices, accounts, email, networks or storage** for any business file. Whether earlier materials raise any ownership question is a neutral question for her employment counsel (`../FOR-EMPLOYMENT-COUNSEL.md`, section B).
2. **Keep every stage.** Keep dated notes, sketches, manuscript drafts, layered source files (PSD/AI/Procreate/Affinity/InDesign, Canva exports with the design link), reference and inspiration lists, and every email with contractors. Do not overwrite; use "Save as" with a version number.
3. **File-naming convention:** `YYYY-MM-DD_product-slug_stage_vNN.ext`
   Example: `2026-09-27_toddler-play-cards_sketch_v03.procreate`
4. **Monthly independent snapshot** (first business day of each month):
   - Zip the whole business creation folder: `YYYY-MM_snapshot.zip`.
   - **Email it** (or a link to it) to the business email address, and **store a copy in a second, separate cloud** service. That gives two independent third-party timestamps.
   - *Optional:* record the file's SHA-256 fingerprint in the log below, so you can later show the archive has not changed. On Mac or Linux run `shasum -a 256 file.zip`; on Windows run `certutil -hashfile file.zip SHA256`.
5. **Record every outside input.** For any freelancer, stock asset, font, AI tool or research source used, record what it was, its license, and where the signed agreement or license is stored. Undisclosed AI or stock material is the most common way a "clean" work becomes a problem.
6. **Register on schedule** (unpublished works before release using GRUW; published works within 3 months of publication), then add the registration number to the log.
7. **Keep everything for as long as the product is sold, plus [attorney to set: e.g., at least 3 years after].**

---

## A. Master works register (one row per product or work)

| Work ID | Title / product | Type (text, art, PDF, video) | Author(s) | Created by Arielle alone? | Freelancer agreement on file? | First draft date | Publication date | Registration deadline (pub + 3 mo) | Copyright application type | Case / Reg. no. | Owner of record (Arielle → assigned to LLC on ____) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| W-001 | | | | Y/N | Y/N/NA | | | | Single / Standard / GRUW / GRTX | | |
| W-002 | | | | | | | | | | | |
| W-LOGO-02 | Play Before Pixels logo v2, "The Maker's Seal" (`brand/logo/`) | Art (logo) | AI-generated baseline (Claude, 2026-09-28); founder's own edits to be logged in section B | N (AI-assisted; see section D) | NA | 2026-09-28 | Not published | | | | |

## B. Version log (one row per saved milestone)

| Date | Work ID | File name | Stage (idea, sketch, draft, final, published) | Where stored (folder path) | Created on (business device name) | Notes |
|---|---|---|---|---|---|---|
| 2026-09-28 | W-LOGO-02 | `brand/logo/src/build.py` and every file it generates | Draft (AI-generated baseline, before any founder edit) | `brand/logo/` in the business repository | Cloud session (AI) | Built from concept C with the review panel's fixes 3-6. Rejected options on record: `brand/logo/process/2026-09-28_rejected-options.png`. Band colour (`BAND`) and lean (`TILT`) left for the founder. |
| | W-LOGO-02 | | Founder edit: `BAND` (from sun to ...) | | | What you chose and why |
| | W-LOGO-02 | | Founder edit: `TILT` (from 8 to ...) | | | What you chose and why |
| | W-LOGO-02 | | Founder's own choice (e.g. `SEAL['cap']`, `TOP['w']`, `WORD['ball_r']`) | | | What you chose and why |

## C. Monthly snapshot log

| Month | Snapshot file | Emailed to (address, date/time) | Second cloud location | SHA-256 (optional) |
|---|---|---|---|---|
| 2026-10 | 2026-10_snapshot.zip | | | |

## D. Third-party inputs and licenses

| Work ID | Input (freelancer, stock image, font, AI tool, study figure) | Source / vendor | License or agreement | Commercial use allowed? | Where the signed copy or license is stored |
|---|---|---|---|---|---|
| W-LOGO-02 | AI tool: Claude generated the build scripts and the baseline drawing (seal, top, lockups, favicon). Disclose it and claim only the founder's own edits in any copyright filing. | Anthropic | Anthropic's terms for the account used [founder/attorney to confirm and file a copy] | [attorney to confirm] | |
| W-LOGO-02 | Font: Bricolage Grotesque (outlines of the letters in the wordmark and the ring) | Google Fonts / its designers | SIL Open Font License 1.1 (allows use in logos) | Yes | `brand/fonts/` [add OFL.txt if missing] |

## E. Research-hub sources (supports fair use and claim substantiation)

| Hub article | Study cited (full citation, DOI) | Date reviewed | Quoted text length (keep it short) | Figure reused? (only with permission or CC license, attributed) | Claims file entry |
|---|---|---|---|---|---|
| | | | | | |

---

**Quarterly check (15 minutes):**
- [ ] Every product in section A has a draft date and a storage path.
- [ ] Every freelancer has a signed agreement on file.
- [ ] Registrations are filed within 3 months of publication.
- [ ] The last three monthly snapshots exist in both locations.
