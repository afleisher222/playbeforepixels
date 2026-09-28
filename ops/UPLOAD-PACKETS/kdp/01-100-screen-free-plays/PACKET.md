# KDP packet: 100 Screen-Free Plays for Ages 0–5 (paperback)

**Upload:** draft + proof order in the founder's account sitting (Oct 5–11); publish only after the printed proof passes (BRAND customer-voice rule 21). KDP ≤2 titles a week. · **Record:** `products/guide-100-plays/listing.json`

## Files
| What | File | Check |
|---|---|---|
| Interior (black-and-white, bleed) | `products/guide-100-plays/guide-100-plays-kdp-interior.pdf` | 86 pages, 8.125 x 10.25 in, no Type 3 fonts |
| Cover (full wrap, one PDF) | `products/guide-100-plays/guide-100-plays-cover-wrap.pdf` | 16.4437 x 10.25 in; spine 0.1937 in; spine text in 5.5 pt caps (title, ages, brand), about 0.07 in clear each side [VERIFY in the KDP previewer]; blank barcode block lower right of the back |

## Page 1: Paperback details
| Field | Enter |
|---|---|
| Language | English |
| Book title | 100 Screen-Free Plays for Ages 0–5 |
| Subtitle | Easy, Low-Prep Play and Talk Ideas for Babies, Toddlers and Preschoolers, Sorted by Age |
| Series | none |
| Edition number | leave blank (first edition) |
| Author | Play Before Pixels (the brand as the author name; counsel question Q9 open — if counsel says no, use a pen name, never the founder's legal name) |
| Contributors | none |
| Description | paste `description.html` (this folder) into the description box (KDP accepts a small HTML set: b, i, u, br, p, h4–h6, ol, ul, li; UNVERIFIED) |
| Publishing rights | I own the copyright and I hold the necessary publishing rights |
| Primary audience: sexually explicit content | No |
| Primary audience: reading age | **Leave both boxes empty.** This is an adult-directed book for parents (the reading-age field is for children's books; filling it with 0–5 would make it a children's product; see the CPSIA hold in ops/QUEUE.md) |
| Marketplace | Amazon.com (primary) |

## 7 keyword boxes (one per box)
```
screen free activities for toddlers
toddler activity book
baby play ideas book
activities for toddlers at home
screen free play ideas
activities for 1 year old
parent child play book
```
Rules followed: no other authors, titles, brands, shows or creators; no 'free', 'bestseller' or 'new'; nothing from the §7 banned list (UNVERIFIED KDP wording).

## 3 categories (parenting only; never special needs, health, education or teaching)
1. Parenting & Relationships › Family Activities
2. Parenting & Relationships › Parenting › General (or the closest general parenting category)
3. Parenting & Relationships › Parenting › Early Childhood, if the picker lists it; otherwise a second general parenting category (never crafts, education, health or special needs)
_Category names are from memory (UNVERIFIED): KDP's category picker changes; choose the closest parenting categories._

## Page 2: Paperback content
| Field | Enter |
|---|---|
| Print ISBN | **Get a free KDP ISBN** (business/DECISIONS.md 2026-09-28). Imprint: 'Independently published' is set by KDP. The interior prints no ISBN; KDP places the barcode |
| Publication date | leave blank (set on publish) |
| Print options | Black & white interior · White paper · Trim 8 x 10 in (20.32 x 25.4 cm) · Bleed: Yes · Cover finish: Matte (recommended for a calm look; Glossy is fine) |
| Manuscript | upload the interior PDF |
| Cover | 'Upload a cover you already have' → the cover-wrap PDF |
| AI-generated content | **Yes.** Text: AI-generated (Claude). Images: AI-generated (vector art made in code by Claude). Translation: none. (ai_disclosure; answer truthfully even if the founder edits later — only passages she writes herself are hers) |
| Book preview | open the previewer; fix anything flagged (gutter, bleed, text in the safe zone). Measured nearest text 0.42 in from trim |

## Page 3: Rights and pricing
| Field | Enter |
|---|---|
| Territories | All territories (worldwide rights) |
| Primary marketplace | Amazon.com |
| Royalty plan | 60% (list price ≥ $9.99) |
| Amazon.com | **$16.99** (GROWTH-ENGINE §5a; record net about $6.99 after print cost, UNVERIFIED) |
| Amazon.co.uk / .ca / .com.au | **See the price decision below before entering.** |
| Other marketplaces (.de, .fr, .es, .it, .nl, .pl, .se, .co.jp) | 'Based on Amazon.com price' (KDP converts) |
| Expanded Distribution | **Off** (it reaches libraries, which are HELD) |
| Proof | Request printed proof copies before publishing (see below) |

### Price decision: UK, Canada, Australia
GROWTH-ENGINE §2c sets hand-set prices of £7.99, CA$12.99 and AU$14.99 (from MARKETING-PLAYBOOK seg. 5, which was written for $9.99 paperbacks). For this 86-page 8 x 10 book those prices would net roughly £3, CA$5 and AU$5.5 after print cost, about US$3.60–4.10, **below this book's KDP price floor of $5.1** (record `price_floor_by_channel`; COMPLIANCE-GATE 18). All figures UNVERIFIED (print costs and exchange rates could not be checked).
**Recommended (enter these unless the founder decides otherwise):** £13.99, CA$22.99, AU$26.99, close to the $16.99 US price. Before saving, KDP's royalty column must show at least the equivalent of $5.10 in each marketplace; if a price shows less, raise it to the first .99 that clears it.

## Proof-order steps (Oct 5–11)
1. Save the title as a draft through page 3 (do not press Publish).
2. Bookshelf › the title's '…' menu › Request printed proofs › quantity 1 › ship to the business PO Box (never a home address).
3. Proofs print with a 'Not for resale' band; allow printing plus shipping time (UNVERIFIED, about 1–2 weeks in the US).
4. On arrival check: cover colours and the seal logo, spine alignment (no text on the spine), gutter margins, gray tones of the icons, page order, the 2 in square sizes, and that nothing sits within 0.375 in of the trim. Founder proofs the cover and page 1 (rule 21, 15–30 min).
5. Pass → Publish (KDP review up to about 72 hours, UNVERIFIED). Fail → fix in `products/guide-100-plays/build/`, rebuild with `sh products/guide-100-plays/build/make.sh`, re-upload, order a new proof.
6. After it goes live: record ASIN/ISBN and URL in ops/PUBLISHED.json and `price_history` in the record. Never cut the paperback price for sale events (§5a).

## AI-content answers (full text)
- Text: AI-generated (Claude). Answer yes. As best known (UNVERIFIED), KDP counts text an AI tool wrote as AI-generated even after heavy editing; only passages the founder writes herself are her own.
- Images: AI-generated (Claude; vector art made in code). Answer yes.
- Translation: None: English only, no machine translation.
- What AI did: Claude (an AI model made by Anthropic), working in Claude Code, wrote the draft text (the 100 plays, talk lines, guide pages, safety notes and this listing), made the illustrations and icons as flat vector art in code from the brand's own symbol library, and built the paperback interior, the cover and the PDF files with scripts.

