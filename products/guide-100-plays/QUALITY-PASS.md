# Quality pass: 100 Screen-Free Plays for Ages 0–5

**September 28, 2026. Internal file.** This pass measured the book against the generic craft qualities that premium talk-along and play books for young children share. Those books are a benchmark only. Nothing was copied from any other book or brand: no layouts, characters, phrases, trade dress, series structure or page designs.

**Editions checked:** I rendered and looked at all 86 pages of the KDP black-and-white interior and the full cover wrap. I also checked the last page of the Letter color PDF (90 pages), `cover.png`, `mockup.png`, and an overflow scan of 5 source editions.

## Scores (1–10)

| Craft quality | Before | After | Page-level problems found, and what changed |
|---|---|---|---|
| One clear focal image per page, white space | 6 | 7 | Play pages hold two plays each, which is right for a guide but dense. The notes pages (p12, p26, p86) had empty top halves with lines starting mid-page. **Fixed:** the notes pages now have prompts and ruled lines from the top. The play pages are unchanged. |
| Large, legible type, consistent typography | 7 | 7 | **p5:** the "Every child is different" box ran into the running footer (an 11 px spill in the paperback). **Fixed:** I tightened the copy, and the overflow scan is now clean on the KDP, Letter, A4, low-ink and Etsy sources. Body type on play pages is about 9 pt. That suits a reference guide, but it is smaller than the premium benchmark. It is left alone, because larger type would add about 20 pages and change the spine. |
| Clean, consistent illustration | 6 | 7 | **Cover:** the grown-up's kneel pose made the shins read as two yellow blobs beside the knee. It is now a cross-legged sit, the same pose the cast uses elsewhere. **3–5 opener (p59):** four-point sparkles (the shape BRAND/ORIGINALITY D6 steers away from) are now round dots. **p43:** the white-haired grown-up is faint in grayscale on the sun circle. Left alone: fine in color. |
| Durable-looking, warm cover | 7 | 8 | **Front:** the top-right quarter was empty pink. A round sun badge ("89 plays need nothing to buy") now fills it. It echoes the round badge on *Up! Go! More!*, so the covers read as one line. **Back:** it now has a category line, an "Ages 0–5" pill, the one-line promise, and the publisher line "Play Before Pixels / AlphaPlay LLC". **Spine:** now carries text (see retail below). |
| Short grown-up tip on every spread | 8 | 9 | Every play has a talk line, easier/harder ideas and a safety note. Three "Say what you see" talk lines were still questions, against the book's own rule. **Fixed:** #2 "There's a baby! That's you!", #43 "Too big! … This one fits. Yes!", #98 "You found a circle! A red circle." |
| Read-aloud rhythm (repetition, pauses) | 7 | 7 | The "(wait)" pauses in the talk lines work well. This is a guide, so there is no read-aloud text to tune. |
| Inclusive, varied families | 8 | 8 | The cast varies in skin tone, hair and age, and includes a white-haired grown-up. The chair, bed and wheelchair line is on How to use. No change needed. |
| Strong "how to use this book" page | 7 | 8 | The content was good but the page collided with its footer. It is now tighter and clean. |
| Satisfying ending | 3 | 8 | The paperback ended on a blank "Favorites and funny moments" page. **New closing page** (last page of every edition): "That's a play day." with a short line, a new story-time illustration (a grown-up reading to two children under the moon), "Tomorrow, pick one more play." and the brand line "Play first. The pixels will keep." The page count is unchanged: the closing page replaces the final notes page. |
| Premium finishing details | 4 | 7 | The title page had gift lines only. **Added:** a dedication at the top of the copyright page (p2), which is a draft for the founder to rewrite; prompted keepsake notes pages; and the closing page. KDP paperbacks cannot have endpapers. |
| Consistent series look | 6 | 7 | The logo sits in the same bottom-left navy band as the board book, and the round cover badge now matches the board book's. The format is different (8 × 10 guide), which is right for the product. |
| **Average** | **6.3** | **7.5** | |

## Retail-shelf readiness

| Check | Status |
|---|---|
| Standard trim | 8 × 10 in, a standard KDP trim. |
| Spine readable from 6 ft | **Not possible at this page count.** 86 pages × 0.002252 in = 0.1937 in spine. KDP allows spine text from 79 pages up [VERIFY], so the spine now carries "100 SCREEN-FREE PLAYS · AGES 0–5 · PLAY BEFORE PIXELS" in 5.5 pt caps, with about 0.07 in clear on each side of the glyphs [VERIFY in the KDP previewer]. A spine readable from 6 ft needs roughly 0.5 in, or about 220 pages (UNVERIFIED rule of thumb). |
| Back cover | One-line promise ("Play more. Talk more. No special toys needed."), age band pill, short description, a blank 2 × 1.2 in barcode area, and the publisher line "Play Before Pixels / AlphaPlay LLC". |
| BISAC and age range in `listing.json` | Added `bisac` (FAM025000, FAM034000, FAM003000, all [VERIFY]) and `age_range` (a parenting book for grown-ups; plays for ages 0–5). |
| Series trade dress | Bottom-left logo band and round badge, shared with *Up! Go! More!* |

**What a big-box retailer would still require that we cannot do now** (see `business/sections/04-retail-target-walmart.md` sections 4.1–4.5 for the full plan; not repeated here):
- **Owned ISBNs.** The free KDP ISBN can only be used on Amazon (UNVERIFIED). A retail edition needs its own ISBN, from Bowker (10 for about $295, per section 4.1).
- **Wholesaler distribution** through Ingram or a full-service distributor. IngramSpark is HELD for this title.
- **A retail price that survives a wholesale discount.** At $16.99 and a 55% trade discount, the publisher gets about $7.65 before print cost (UNVERIFIED discount level; print cost to be checked in IngramSpark's calculator).
- **Sell-through history.** None yet; the book is not on sale.
- Retail-standard barcode with a price add-on, printed by the distributor or from an owned ISBN (UNVERIFIED).

## What cannot reach premium level without outside spending

- **Human illustration.** The art is flat SVG drawn by code. It is consistent, but the poses are stiff and the faces are simple. A human illustrator would lift the cover and chapter openers most. Section 4.1 plans $1,500–$5,000 per book.
- **Color interior in print.** The paperback is black-and-white to keep the price. A premium color interior raises print cost well above the current margin (UNVERIFIED).
- **A paid early-childhood or copy-edit review.** No reviewer has read the 100 plays. The customer panel in `panel.md` is simulated. A paid educator review and a copy editor would catch what a simulated panel cannot. Neither implies clinical authorship.
- **Printed proofs.** Each edition needs a paid printed proof to check the grayscale contrast, the 5.5 pt spine text and the trim.

## Rebuilt and checked

- `sh build/make.sh`, then a wrap-only re-render after the spine-text size change.
- `node ops/TESTS/check_fonts.js guide-100-plays`: 25 files, 0 problems.
- PyMuPDF scan of every PDF: 0 Type 3 fonts, and no placeholder strings (lorem, TODO, [VERIFY, {{, "founder adds").
- KDP interior: 86 pages (even), 8.125 × 10.25 in. Text is at least 0.421 in from every trim edge. The cover wrap is 16.4437 × 10.25 in, which matches 0.25 + 16 + 86 × 0.002252. The page count is unchanged, so the wrap width is unchanged.
- `python3 ops/TESTS/check_listings.py`: 0 FAIL, 0 WARN.
- `ops/UPLOAD-PACKETS` KDP packet note updated: it now says the spine carries text.
- Founder drafts to rewrite: the dedication, the closing-page text and the notes prompts (`founder-notes.md`).
