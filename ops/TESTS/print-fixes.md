# Print and customer-file fixes

**Run:** 2026-09-28, 04:55–05:40 (container clock). **Lane:** print and customer-file fixes from `ops/TESTS/print-preflight.md` and the test critic. **Nothing was published or uploaded;** `ops/PAUSE` stays. The logo files (`brand/logo/`) were not touched. Nothing was committed by this lane (the harness auto-saved in-progress work as `e998d07` and `e5d0680`; the lead commits the rest).

Platform rules below come from memory, because web search was not available. They are marked **UNVERIFIED**.

## Result

| # | Fix | Status |
|---|---|---|
| 1 | KDP running footers at least 0.4 in from the bottom trim; course p60 collision and overflow | **Done.** Guide footer text is now ≥ 0.449 in from the bottom trim (was 0.290); course ≥ 0.459 in (was 0.296). Pages with text inside 0.40 in: 0 of 86 and 0 of 92 (were 80 and 87). No page has body content touching its footer. |
| 2 | A4 store editions of *First Phone Plan* and *Play-First Family Kit* | **Done.** Footer text ≥ 0.49 in from the right edge (was 0.013 in) and ≥ 0.507 in from the bottom edge on every A4 page. |
| 3 | © line on the free "7 Days of Play First" starter | **Done** (Letter and A4, page 3). |
| 4 | Placeholders in customer files | **Done.** 0 hits in 135 customer-facing PDFs (see "Placeholder grep"). Each removed slot has a template in `products/<slug>/founder-notes.md`. |
| 5 | ISBN/barcode labels and outlines | **Done.** Back covers keep a plain white 2 × 1.2 in area with no label or outline; blank ISBN lines are gone from copyright pages and print only once a real ISBN is entered. |
| 6 | Arrow glyphs in *The Day the Tablet Slept* | **Done.** `check_fonts.js picture-tablet-slept`: 0 problems (was 4). |

## What changed, by product

Only these 9 products were edited and rebuilt, each with its own build command. There was no catalogue-wide rebuild.

### 100 Screen-Free Plays (`guide-100-plays`)
- `build/book.js`
  - **Footer:** the running footer (`.folio`) sits `--fb` above the bottom bleed. It is 0.40 in on the two paperback variants (KDP and the brand-kit file) and stays at 0.24 in on the home-print editions. The paperback live area now ends 0.64 in above trim (was 0.55), so body text clears the footer.
  - **p5 "How to use this book":** 0.14 in tighter spacing on the paperback only, so the last box clears the footer.
  - **p84:** the logo and © line had no gap between them; they now have a 0.3 in gap.
  - **ISBN:** the "ISBN: [founder adds the ISBN before upload]" dashed box is removed. `const ISBN_PAPERBACK = ''` prints "ISBN …" as plain text once it is filled.
- `build/extras.js`: the cover-wrap barcode area is now plain white, with no label or dashed outline.
- **Unchanged:** 86 pages, and the cover wrap is still 16.4437 in.

### 30 Days of Back-and-Forth (`course-screen-reset`)
- `build/workbook.js`
  - **Footer:** paperback footer at `bleed + 0.42 in` (was `bleed + 0.28`). The home-print workbook footer is unchanged.
  - **Overflow:** the week-opener, screen-spot and safety pages overflowed their padding. In the paperback only:
    - The week-opener scene is 2.45 × 2.22 in (was 2.9 × 2.65 in), and the gaps are tighter. This fixes p60 "On a sick or travel day" (the collision the critic found), p12, p28 and p44.
    - The screen-spot page (p8) has tighter gaps.
    - The pediatrician box on the safety page (p6) moves to the right-hand column.
    - The certificate (p83) has 0.18 in more bottom padding.
    - The old p87 card overflow was already fixed by the 03:11 rebuild. The check below finds no overflow on any page.
  - **Welcome note:** the "FOUNDER WRITES THIS" box is removed (workbook p3, paperback p4). The page prints only the month map until `FOUNDER.welcomeNote` is filled, and its kicker reads "Before you start".
  - **Copyright page:** the "ISBN / barcode · Founder adds the ISBN here (Bowker)" box is removed. `const ISBN_PAPERBACK = ''` prints the ISBN as plain text once it is filled.
  - **Arrows:** the two → on the "Start here" page are drawn as SVG. They fell back to Liberation Sans (preflight Tier 2).
- `build/extras.js`
  - The cover-wrap barcode area is plain.
  - The sales page's optional founder note prints nothing while `FOUNDER.salesNote` is empty (the "FOUNDER WRITES THIS (optional)" box is removed).
  - "Choose the bundle →" uses an SVG arrow.
  - **Free starter:** page 3 now carries "© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC. Free to print for use in your own home. Parent education, not medical advice." The tracker's ○ and ☆ are drawn as SVG (they fell back to DejaVu Sans and Liberation Sans).
- **Unchanged:**
  - 92 pages, and the cover wrap is still 16.4572 in.
  - The welcome and Day 30 **emails** still show their "FOUNDER WRITES THIS" boxes. `make.sh --final` still refuses to finish while they remain, so those emails cannot go out.

### First Phone Agreement Kit and Play-First Family Kit
- `build/build.js` in both products:
  - **Footer:**
    - The long © segment now wraps instead of running off the page.
    - "Personal & family use." stays together on one line.
    - The footer sits 0.25 in above the bottom edge (was 0.19; its text is now ≥ 0.29 in from the edge, where it was 0.23–0.24).
    - A4 pages get `padding-bottom: .87in` and a footer 0.5 in above the bottom edge. A4 is 0.69 in taller than Letter, so the content area is still larger than Letter's.
  - **Founder's note:** the "FOUNDER'S NOTE · PLACEHOLDER" box on p4 is removed. `FOUNDER_NOTE` in `build/content.js` prints a card headed "A note from us" once it is filled.
- **Checks:** page counts are unchanged (38/27 and 53/35), and each kit's own `check.js` overflow gate passed.
- **Instruction wording vs what was measured:** the task said "give every A4 page at least 0.5 in bottom margin". The measured defect was at the **right** edge (0.013 in), where the nowrap footer ran past the page. Both edges now clear 0.5 in on A4.

### 52 Play & Talk Cards and Family Talk-Along Cards (`play-talk-cards`)
- `build/build.js`: the dashed "FOUNDER'S NOTE · TO BE WRITTEN…" box on p3 of both decks is removed. `FOUNDER_NOTE = { A: '', B: '' }` prints a soft "A note from us" box once it is filled.
- `build/pod.js`: the tuck-box art no longer has the dashed "Barcode / UPC" box.
- **Rebuild:** `render-all.js` and `pod.js`. `listings.js` was not run.

### The Day the Tablet Slept (`picture-tablet-slept`)
- `build.js`
  - **Arrows:**
    - p14: "↑ this way up ↑" is now Caveat "this way up" with two drawn SVG arrows.
    - p29: "(“Splash!” → “Big splash!”)" becomes "(“Splash!” becomes “Big splash!”)", as `ops/TESTS/cloud-rehearsal.md` finding 2 proposed.
  - **p2:** the ISBN/barcode box is removed. ISBNs print as text once `## isbn-paperback` or `## isbn-hardcover` is filled in `WORDS.md`.
  - **p3:** the dedication slot is removed; the page is art only until `## dedication` is written.
  - **p31:** the "FOUNDER WRITES THIS PAGE" slot is removed. The page shows "This book belongs to" with a write-on line until `## note` is written, and then shows "A note from the author".
  - **Covers:** the KDP and IngramSpark covers keep a plain white 2 × 1.2 in barcode area, with no label or dashed outline.
- **Unchanged:** 32 pages; the covers are still 17.3251 × 8.75 and 19.13 × 10.0 in.

### Laps Not Apps (`picture-laps-not-apps`)
- `build.js`
  - **p1 byline:** the "Founder: your byline (optional)" slot is removed. The byline is "A Play Before Pixels read-aloud" until `## author` is filled.
  - **p2:** "ISBN — to be supplied" and "Printer / manufacturing lines — to be supplied" are removed. An optional `## isbn` section in `WORDS.md` prints as text if it is ever added.
  - **p32:** the "A note from the author" kicker and the slot print only once `## author note` is written.
  - **Covers:** the back-cover barcode area is plain.
- **Unchanged:** the human-authorship gate for **real orders** still requires `## author note` and no `(draft)` sections.

### Talk Tower kit and "More Talk, Less Tap" (`picture-more-talk-less-tap`)
- **Kit (`build/kit.js`):**
  - The "FOUNDER: A note from the maker" box on p2 is removed; the note prints once `## founder-note` is filled.
  - The "ISBN / barcode · Not needed for this PDF" box on the licence page (p24) is removed.
- **Story (`story-bonus/build/build.js`):**
  - The title-page byline is "Play Before Pixels" until `## story-author` is filled.
  - The dedication prints only once it is written.
  - The ISBN boxes are removed from the copyright page and the back cover. This is a digital-only PDF, so there is no barcode area.

### Up! Go! More! (`board-up-go-more`)
- `build/build.js`
  - **Byline:** "Play Before Pixels" until `author_credit` is set (was "Words by [FOUNDER: your name or pen name]").
  - **Printer lines:** the "ISBN [ … ] · Printed in [country] · Batch [tracking no.]" slots are removed. Each prints only from an optional `print_lines` object in `manuscript.json`. Every build prints a NOTE while "Printed in" or the batch number is missing, because an offset children's-book run needs a tracking label (CPSIA; UNVERIFIED).
  - **Note page:** the "Founder: rewrite this page…" label and dashed frame are removed.
  - **Covers:** the board back cover and the paperback wrap keep a plain barcode area.
- **Unchanged:** `PRINT_READY=1` still refuses to build until every word, the note and `author_credit` are founder-approved.
- **Not in this lane:** the board-book safe-zone breaches (5 pages) and CMYK.

## Verification

**Rebuilt with each product's own command:**
- `guide-100-plays/build/make.sh`
- `course-screen-reset/build/make.sh`
- `first-phone-plan/build/make-all.sh`
- `play-first-family-kit/build/make-all.sh`
- `play-talk-cards`: `node build/render-all.js && node build/pod.js`
- `picture-tablet-slept` and `picture-laps-not-apps`: `listing.json` → `files.build_notes`
- `picture-more-talk-less-tap/build/build-all.js`
- `board-up-go-more/build/render-all.sh`

All exited 0. No `listing.json` changed.

**Footer and overflow check (DOM):** each page's lowest body element was compared with its footer's box, in the same Chromium that renders the PDFs.

| Source | Pages | Footer bottom above page edge | Collisions |
|---|---|---|---|
| guide KDP / brand-kit | 86 / 86 | 0.525 in (0.40 above trim) | 0 (was 1 after the move, p5; fixed) |
| course KDP | 92 | 0.545 in (0.42 above trim) | 0 (was 5 before: p6, p12, p28, p44, p60) |
| course workbooks (4) | 89 each | 0.28 in (unchanged) | 0 |
| both kits, 8 editions each | 38/27, 53/35 | 0.25 in Letter, 0.50 in A4 | 0 |

**PDF text-to-trim (PyMuPDF font boxes; glyph ink sits higher than the font box):**

| File | Minimum text distance to bottom trim | Pages with text under 0.40 in |
|---|---|---|
| `guide-100-plays-kdp-interior.pdf` | 0.449 in (was 0.290) | 0 (was 80) |
| `guide-100-plays.pdf` | 0.449 in (was 0.290) | 0 (was 80) |
| `course-screen-reset-kdp-interior.pdf` | 0.459 in (was 0.296, on p60's collision) | 0 (was 87) |

**Kit edges (all 20 PDFs, including both START HERE files):**
- right edge ≥ 0.496 in: font box, against a footer box at 0.50 in;
- bottom edge: ≥ 0.507 in on A4, ≥ 0.293 in on Letter;
- 0 text spans within 0.25 in of the right or bottom edge (was up to 44 pages at 0.013 in).
- Starter: every text span is ≥ 0.30 in from every edge.

**Looked at (rendered, then opened):**
- course: KDP p2, p4, p6, p8, p60, p83, the cover wrap, workbook p2, and starter p1 and p3;
- guide: KDP p2, p5, p24, p40, p70, p84 and the cover wrap;
- tablet: p2, p14, p31 and the KDP cover;
- laps: p2, p3, p33 and p34 of the sample (interior p1–2 and p32, plus the back);
- first-phone-plan: A4 p4, p10 and p20, plus the A4 and Letter footers at 150 dpi;
- family kit: A4 p4, p10 and p30;
- cards: p3 of both decks and tuck box p2;
- Talk Tower: kit p2 and p24, story p3, p4 and p32;
- board: paperback p1–3, board p25–26 and the paperback wrap.

Nothing is clipped or overlapping. One cosmetic point: on the board paperback title page, the new byline "Play Before Pixels" sits just above the logo lockup, so the name appears twice.

**`node ops/TESTS/check_fonts.js` (before → after):**

| Product | Before | After | Remaining (all present before this lane, and not in its list) |
|---|---|---|---|
| picture-tablet-slept | 4 | **0** | — |
| course-screen-reset | 1534 | 1506 | Its 9 print and page sources are **0** (the starter, the workbooks, KDP, the Etsy edition and the sales page were FAIL before). The rest are the HTML emails in `emails/` and `funnel/`, which use email-safe system fonts by design. |
| guide-100-plays | 58 | 58 | Liberation Serif in hidden SVG `<text>` icon labels ("note-sq", "rattle", …) |
| play-talk-cards | 14 | 14 | ♡ in DejaVu Sans on 8 files; guide-only text on the POD proof and tuck-box guide pages |
| picture-more-talk-less-tap | 24 | 24 | ✂ and one other glyph in DejaVu Sans on the cut-out pages |
| first-phone-plan, play-first-family-kit, picture-laps-not-apps, board-up-go-more | 0 | 0 | — |

**Placeholder grep (PyMuPDF, full text of every page):**
- **Files:** all 135 customer-facing PDFs under `products/`, which means every `downloads/`, `etsy-upload/`, main edition, KDP, Lulu and IngramSpark interior and cover, and POD file. Excluded: `build/`, `tmp/`, `template-variables.pdf` (tokens by design), `merch-core/merch-core.pdf` (production book) and the laps sample `picture-laps-not-apps.pdf`. The laps sample was checked separately and also has 0 hits.
- **Pattern** (case-insensitive): `FOUNDER|PLACEHOLDER|pen name|your byline|your author line|your dedication|to be supplied|to be written|REWRITE THIS|ISBN|barcode|UPC|keep clear|Leave white|[country]|tracking no|Printed in [|Batch [|[paperback|[board-book`.
- **Result: 0 hits in 0 files.** The first scan found 157 hits. Two lines were false positives of that looser pattern: "Code just your name." (a bored-cards play) and "Move your name here after your turn." (a Talk Tower game step).

## For the lead

1. **Fonts changed mid-run.** At 05:07 the fonts lane replaced `brand/fonts/fonts.css` with static instances (committed in `e5d0680`). Every PDF rebuilt here uses TrueType fonts, with 0 Type 3 fonts, except the 4 family-kit low-ink files. Each of those still contains one unnamed Type 3 font; that is for the fonts lane. The footer and overflow checks above were re-run after the switch.
2. **BRAND.md conflicts with fix 5.** Line 41 and line 73 still ask for a "clearly labelled white box … 'ISBN / barcode'". The covers now follow this task instead: plain area, no label. BRAND.md is outside this lane, so please update both lines.
3. **Stale text outside this lane:**
   - `listing.json` `human_todo` and `compliance_notes` still tell the founder to "replace the placeholder box". This affects course, first-phone-plan, family kit, Talk Tower, tablet and both card decks, plus `play-talk-cards/build/listings.js` lines 24 and 161. They should now point to `founder-notes.md`.
   - `picture-more-talk-less-tap/WORDS.md` says an empty `## story-author` prints a dashed box; it now prints "Play Before Pixels".
4. **Gates are unchanged.** The course emails still need `make.sh --final`. Real Laps orders still need `## author note`. The board book's `PRINT_READY` still needs every founder approval, including `author_credit`; set it to "Play Before Pixels" to approve the brand byline.
5. **ISBN route.** Every builder now takes an optional ISBN. Decide first between KDP free and owned ISBNs (the conflict is in ops/PRE-MORTEM.md), then fill `ISBN_PAPERBACK` (guide, course), `WORDS.md` (tablet) or `print_lines` (board).
6. **Not done here** (other lanes or later): Type 3/CMYK/PDF-X (G1–G3); gradient write-on lines; the placeholder hardcover and Lulu cover sizes; board-book safe-zone breaches; small type; card-sheet © lines at 0.09–0.18 in; the remaining DejaVu and Liberation glyphs listed above.

## Needs a live check (UNVERIFIED)

1. KDP's minimum outside and bottom margin for interiors with bleed (0.375 in assumed). The footers now clear 0.44 in.
2. KDP's barcode: its size (2 × 1.2 in), its exact position on the back cover, and whether a plain white box there is fine or should be left as background.
3. Whether KDP needs the ISBN on the copyright page when it assigns a free ISBN (treated as optional).
4. IngramSpark: where its Cover Template Generator puts the barcode for the tablet hardcover.
5. Lulu: whether a personalized book with no ISBN needs a barcode area or any printer line.
6. Whether a children's board book needs a CPSIA tracking label ("Printed in …", batch), and its wording.
7. Home printers' unprintable margin (about 0.125–0.25 in). Kit footers are now ≥ 0.29 in (Letter) and ≥ 0.5 in (A4).

## Snapshot of printer files after this run (first 12 characters of SHA-1)

| File | Pages | Size (in) | SHA-1 |
|---|---|---|---|
| `guide-100-plays/guide-100-plays-kdp-interior.pdf` | 86 | 8.1250 × 10.2500 | 897c5fcc3fab |
| `guide-100-plays/guide-100-plays.pdf` | 86 | 8.2500 × 10.2500 | d82706a92ecf |
| `guide-100-plays/guide-100-plays-cover-wrap.pdf` | 1 | 16.4437 × 10.2500 | 578f71c76c3c |
| `course-screen-reset/paperback/course-screen-reset-kdp-interior.pdf` | 92 | 8.1250 × 10.2500 | c67201d7f243 |
| `course-screen-reset/paperback/course-screen-reset-kdp-cover.pdf` | 1 | 16.4572 × 10.2500 | 5490cb8c886a |
| `picture-tablet-slept/picture-tablet-slept.pdf` | 32 | 8.6250 × 8.7500 | e8e0ecd9243d |
| `picture-tablet-slept/cover-kdp-paperback.pdf` | 1 | 17.3251 × 8.7500 | 3d100fc17056 |
| `picture-tablet-slept/cover-ingramspark-hardcover.pdf` | 1 | 19.1300 × 10.0000 | 6e50f02b04e5 |
| `picture-laps-not-apps/picture-laps-not-apps-interior.pdf` | 32 | 8.7500 × 8.7500 | d561f084c0b0 |
| `picture-laps-not-apps/cover-wrap-softcover-sample.pdf` | 1 | 17.3333 × 8.7500 | a0d419858406 |
| `picture-laps-not-apps/cover-wrap-hardcover-sample.pdf` | 1 | 19.0000 × 10.2500 | 3655f30ec3e2 |
| `board-up-go-more/board-up-go-more.pdf` | 26 | 6.2500 × 6.2500 | 027916f653bc |
| `board-up-go-more/paperback/up-go-more-talk-along-interior.pdf` | 32 | 8.6250 × 8.7500 | 182c2286e366 |
| `board-up-go-more/paperback/up-go-more-talk-along-cover.pdf` | 1 | 17.3251 × 8.7500 | 9e4ac2f0984a |
| `play-talk-cards/pod-later/POD-LATER_play-talk-deck_tuck-box.pdf` | 2 | 7.3767 × 6.5267 | 96d919974748 |
| `play-talk-cards/pod-later/POD-LATER_talk-along-deck_tuck-box.pdf` | 2 | 7.3767 × 6.5267 | a525b40c1992 |

PDFs carry a new `CreationDate` and `/ID` on every render, so re-rendering changes these hashes even when the pixels do not change. Run `python3 ops/TESTS/unchanged_renders.py --restore` before committing, to put back renders whose pixels did not change.
