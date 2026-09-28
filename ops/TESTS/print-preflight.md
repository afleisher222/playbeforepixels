# Print preflight: every product PDF

**Run:** 2026-09-28, 01:55–02:35 (container clock). **Tools:** PyMuPDF 1.28.2 with Python for the automated checks, fontTools for the font test, and a visual pass over rendered pages (sample pages drawn at 72–144 dpi with the trim line in magenta and the safe zone in cyan, then opened and looked at).
**Scope:** 194 PDFs under `products/` at the time of the run:
- 21 print-on-demand or printer files: book interiors, cover wraps, card decks, the tuck box and the hang tag. These have their own table below.
- 112 home-print printables and digital files: Appendix A.
- 61 internal files that nobody uploads: 58 under `build/`, plus `picture-laps-not-apps/picture-laps-not-apps.pdf` (sample), `template-variables.pdf` and `merch-core/merch-core.pdf` (production book). These were checked but not graded.

**Files changed during the run.** Other workflows were rebuilding files while this ran. These changed mid-run: `guide-100-plays/*` (82 → 86 pages, then 90 for the Letter/A4 editions; the rebuild fixed the cover width and the KDP page width), `play-talk-cards/*` (rebuilt 02:12–02:16) and `visual-routine-cards/*` (restructured). The results below are from the last pass (02:20–02:28), plus the covers and the guide's START-HERE file re-checked at 02:31. Appendix C lists a hash for every printer file checked. **If a file's hash no longer matches, run the check again on that file.**

Platform numbers marked **UNVERIFIED** come from memory, because web access was not available in this session. They are all listed under "Needs a live check" at the end.

---

## Verdict

**None of the book files is ready to upload yet.** The geometry is right: every page size matches its listing, every KDP cover-wrap width matches its interior's page count to 0.0001 in, every page count is even and at least 24, and every raster image is 300 dpi. Five kinds of problem remain, listed in the order a printer would hit them:

1. **Every PDF uses Type 3 fonts, because the brand fonts are variable fonts.** Chromium (Skia) turns variable fonts into Type 3 glyphs. IngramSpark and offset printers commonly reject Type 3 fonts (UNVERIFIED). The glyphs are sharp vector outlines, so this affects acceptance, not how the print looks. A fix is tested and proven below (G1).
2. **Running footers and page numbers sit inside KDP's margin zone** in both black-and-white KDP interiors: 0.29 in and 0.31 in from the bottom trim, against KDP's 0.375 in minimum outside margin for books with bleed (UNVERIFIED). This affects 80 of 86 pages in *100 Screen-Free Plays* and 87 of 90 pages in *30-Day Screen Reset*.
3. **Cover files that are placeholders by design**: both hardcovers and the Lulu softcover. They will be rejected unless they are rebuilt from the printer's own template numbers.
4. **Placeholder text that would print**:
   - "ISBN / barcode · KDP places the barcode here" labels with dashed outlines on every back cover.
   - "FOUNDER WRITES THIS" boxes and "[FOUNDER: your name]" bylines inside interiors.
   - "ISBN: ____ / to be supplied" lines on copyright pages.
5. **No CMYK or PDF/X, and live transparency.** KDP accepts this. IngramSpark prefers otherwise, and an offset board-book printer will not accept it (UNVERIFIED).

**Home-print printables:** 58 FAIL, 43 WARN, 11 PASS. Nearly every FAIL is one of these:
- a founder placeholder ("FOUNDER'S NOTE · PLACEHOLDER", "FOUNDER: A note from the maker…") visible in files that are already in `etsy-upload/` or `downloads/`;
- the A4 store editions of *First Phone Plan* and *Play-First Family Kit*, whose footer runs to 0.013 in from the page edge, so home printers will cut it off;
- the free "7 Days of Play First" starter, which has no © line.

---

## Summary table 1: printer files (worst first)

The problems every printer file shares are named once and referred to as G1–G3: **G1** Type 3 fonts, **G2** RGB only with no output intent (not PDF/X), **G3** live transparency (page transparency groups and alpha, plus soft masks in some files).

| File | Printer | Status | Issues (file-specific, plus G1–G3) |
|---|---|---|---|
| `picture-tablet-slept/cover-ingramspark-hardcover.pdf` | IngramSpark case-laminate hardcover | **FAIL** | 19.13 × 10.0 in and a 0.25 in spine are placeholders; the size must come from IngramSpark's cover template generator. The ISBN box has a "keep clear" label and a dashed outline, and its position must match the template's barcode spot. G1–G3. |
| `picture-laps-not-apps/cover-wrap-hardcover-sample.pdf` | Lulu casewrap | **FAIL** (sample by design) | 19 × 10.25 in is a placeholder; real sizes come from the Lulu API per order. The spine text "Laps Not Apps · made for Maya" sits on a placeholder spine. G1–G3. |
| `picture-laps-not-apps/cover-wrap-softcover-sample.pdf` | Lulu perfect-bound | **FAIL** (sample by design) | Spine 0.0833 in is a placeholder, giving 17.3333 in overall; Lulu's API gives the real value. The ISBN box has a label. G1–G3. |
| `board-up-go-more/board-up-go-more.pdf` | Offset board-book printer (Wave 3, not chosen) | **FAIL** | RGB only; offset printing needs CMYK or PDF/X (UNVERIFIED). Text is 0.26–0.35 in from trim on 16 of 26 pages (brand minimum 0.375), e.g. "night-night" p24 at 0.26 in and "peekaboo" p4 at 0.27 in. Placeholders on p25: "[FOUNDER: your name or pen name]", "ISBN [board-book ISBN]", "Printed in [country]", "Batch [tracking no.]". Type goes down to 5.9 pt. The ISBN box on p26 is labelled. G1, G3. |
| `course-screen-reset/paperback/course-screen-reset-kdp-interior.pdf` | KDP paperback, black and white, white paper | **FAIL** | Page numbers 0.308 in from the bottom trim on 87 of 90 pages (below 0.375). p4 prints a "FOUNDER WRITES THIS" box. The p2 copyright page has an "ISBN / barcode · Founder adds the ISBN here (Bowker)" box. Write-on lines are drawn as 128 gradient shadings that render unreliably. One fallback font (LiberationSans-Bold) supplies a glyph. G1–G3 (64 soft masks). |
| `guide-100-plays/guide-100-plays-kdp-interior.pdf` | KDP paperback, black and white, white paper | **FAIL** | Running footer "100 Screen-Free Plays · Version…" 0.29 in from the bottom trim on 80 of 86 pages. p2 prints "ISBN (paperback): ____" and "founder adds the ISBN here before upload". Write-on lines are 26 gradient shadings. G1–G3. Fixed during the run: page width was 8.1267 in and is now exactly 8.125 in. |
| `guide-100-plays/guide-100-plays.pdf` | None named: brand-kit size 8.25 × 10.25 in with bleed on all four edges (Lulu style) | **FAIL** | Same footer and placeholder problems as the KDP file. **Do not upload it to KDP**: its width fits a bleed-on-all-four-edges printer, not KDP's convention. G1–G3. |
| `board-up-go-more/paperback/up-go-more-talk-along-interior.pdf` | KDP premium colour + IngramSpark paperback | **FAIL** | Geometry passes: 8.625 × 8.75 in, 32 pages, all text at least 0.375 in inside trim. Placeholders print: "[FOUNDER: your name or pen name]" on p1–2, "ISBN [paperback ISBN]" on p2, and "FOUNDER: REWRITE THIS PAGE IN YOUR OWN WORDS BEFORE PUBLISHING" on p3. G1–G3. |
| `picture-tablet-slept/picture-tablet-slept.pdf` | KDP premium colour + IngramSpark hardcover | **FAIL** | Geometry passes: 8.625 × 8.75 in, 32 pages, safe zone clean, 7 images at 300 dpi. Placeholders print: "FOUNDER WRITES THIS PAGE" on p3 and p31, and an "ISBN / BARCODE" box on the p2 copyright page. The ↑ on p14 and → on p29 come from the fallback font Liberation Sans. G1–G3. |
| `picture-laps-not-apps/picture-laps-not-apps-interior.pdf` | Lulu Print API | **FAIL** | Geometry passes: 8.75 × 8.75 in, 32 pages. Placeholders print: "Founder: your byline (optional)" on p1; "ISBN — to be supplied" and "Printer / manufacturing lines — to be supplied" on p2; "Founder writes this" on p32. "one" on p21 is 0.348 in from trim. G1, G3. |
| `picture-tablet-slept/cover-kdp-paperback.pdf` | KDP paperback cover | **FAIL** (small fix) | Width 17.3251 in = 32 pages × 0.002347 (premium colour) + 17.25, which matches. The ISBN box prints "ISBN / BARCODE · 2 × 1.2 in · keep clear" inside a dashed black outline. G1, G3. |
| `board-up-go-more/paperback/up-go-more-talk-along-cover.pdf` | KDP paperback cover | **FAIL** (small fix) | Width 17.3251 in matches 32 pages of premium colour. The ISBN box prints "ISBN / BARCODE · Leave white. Printer or ISBN agency supplies this." inside a grey frame. The back panel (light blue) and front (yellow) change colour at a 0.075 in spine. IngramSpark would need its own cover file with a different spine. G1–G3. |
| `course-screen-reset/paperback/course-screen-reset-kdp-cover.pdf` | KDP paperback cover | **FAIL** (small fix) | Width 16.4527 in = 90 pages × 0.002252 (white) + 16.25, which matches. The ISBN box prints "ISBN / barcode · KDP places the barcode here" inside a dashed outline. The 0.2027 in spine is a solid orange band with hard edges. G1–G3. |
| `guide-100-plays/guide-100-plays-cover-wrap.pdf` | KDP paperback cover | **FAIL** (small fix) | Width 16.4437 in = 86 pages × 0.002252 + 16.25, which matches after the 02:20 rebuild (it was 16.43 in when the interior had 82 pages). The ISBN box has a label and dashed outline. Front text "a talk line · a safety note" is 0.338 in from trim. The spine is a solid orange band with hard edges. G1–G3. |
| `play-talk-cards/pod-later/POD-LATER_play-talk-deck_tuck-box.pdf` | Card printer's tuck box (not chosen) | **FAIL** (not uploadable yet) | Page 1 is a guide only: magenta die lines and "GUIDE ONLY" text. Page 2 (the art) still prints a "Barcode / UPC — only if the seller channel requires one" box with a dashed outline. 7.3767 × 6.5267 in is not any printer's template. Type goes down to 4.9 pt, and a Liberation Sans fallback appears. G1–G3. |
| `play-talk-cards/pod-later/POD-LATER_talk-along-deck_tuck-box.pdf` | Same | **FAIL** (not uploadable yet) | Same as above. |
| `play-talk-cards/pod-later/POD-LATER_play-talk-deck_54-fronts.pdf` | Card printer (not chosen) | WARN | 2.75 × 3.75 in (2.5 × 3.5 in trim plus 0.125 in bleed), 54 pages. Text is 0.156 in from trim at its closest, which meets the file's own 0.16 in spec. The brand's 0.375 in cannot work on a 2.5 in card, so BRAND.md needs a card exception. Meta text ("From 4 mo · Prep 0 min · No mess · ~5 min", "NEEDS", "TALK TIP") is 5.1–5.6 pt on every card. No © on the cards themselves; it is on the tuck box. G1–G3. |
| `play-talk-cards/pod-later/POD-LATER_talk-along-deck_54-fronts.pdf` | Same | WARN | Same as above; the small type is 5.1–5.6 pt. |
| `play-talk-cards/pod-later/POD-LATER_play-talk-deck_back.pdf` | Same | WARN | Geometry passes. The back pattern is not symmetric when the card is turned upside down, so a player can tell a card's orientation from its back. G1–G3. |
| `play-talk-cards/pod-later/POD-LATER_talk-along-deck_back.pdf` | Same | WARN | Same as above. |
| `merch-core/hang-tag.pdf` | Print partner insert or hang tag (not chosen) | WARN | 2.25 × 3.75 in (2 × 3.5 in plus bleed). Type goes down to 5.4 pt (the copyright and care lines). A dashed punch-hole circle at the top will print. G1–G3. |

**Size, pages and file size (all pass):**
- Every page size matches the size the listing or build files state.
- Every interior has an even page count of at least 24 (32, 32, 86, 90, 32; the board book has 26).
- The largest interior is 4.3 MB and the largest cover 0.33 MB, far under KDP's 650 MB and 40 MB limits (UNVERIFIED).
- No file is encrypted. No printer file has annotations, form fields or layers.

---

## Details and exact fixes, in the order a printer would reject the file

### Tier 1: would be rejected, or is very likely to be flagged, at upload

**G1. Type 3 fonts in all 194 PDFs.**
- **Cause:** every `brand/fonts/*.woff2` is a variable font (each has an `fvar` table; fonts.css declares `font-weight: 400 800`). Chromium's Skia PDF backend writes variable fonts as Type 3.
- **Effect:** the glyphs are vector paths, so print sharpness is unaffected. But IngramSpark and most offset preflights reject or flag Type 3 fonts (UNVERIFIED), and some RIPs handle them badly.
- **Fix, tested in this session:**
  1. Make static instances with fontTools: `instancer.instantiateVariableFont(font, {"wght": 600})`. Nunito Sans also has an `opsz` axis; pin it to its default.
  2. Load those TTFs through a print-only stylesheet with a fixed `font-weight` for each file.
  3. Result: a test page rendered with `brand/render.js` embedded the static Fredoka 600 and Nunito Sans 400 as Type 0/TrueType subsets (`ttf`). The variable woff2 in the same page still came out as Type 3.

  Exact steps:
  1. For each family and weight actually used (Fredoka 500/600/700, Nunito Sans 400/600/700/800, Bricolage Grotesque 700/800, Caveat 700), instantiate **every** unicode-range subset file, not only the Latin one. Otherwise accented names such as "Sofía Ñúñez" fall back to another font.
  2. Save them as `brand/fonts/static/<family>-<weight>-<subset>.ttf`.
  3. Write `brand/fonts/print-static.css`: the same `@font-face` blocks and `unicode-range` lines, one fixed weight each.
  4. Link it from every print source in place of `fonts.css`, re-render, and re-run this preflight. The expected result is 0 Type 3 fonts.

  Adding the missing glyphs at the same time removes the fallback fonts (see Tier 2).

**Margin breach 1: footer in `guide-100-plays-kdp-interior.pdf` and `guide-100-plays.pdf`.**
- The ink of the footer text is 0.29 in above the bottom trim on 80 of 86 pages. KDP's minimum outside margin with bleed is 0.375 in (UNVERIFIED).
- The listing's own claim, "Text kept at least 0.5 in from the trim", is not true for the footer.
- **Fix:** in `products/guide-100-plays/build/book.js` line 60, change `.folio { … bottom: calc(var(--bb) + .24in) …}` to `bottom: calc(var(--bb) + .40in)`. That puts the ink about 0.45 in above trim. Check that the page body's bottom padding still clears the footer, rebuild with `build/make.sh`, and re-run the preflight.

**Margin breach 2: page numbers in `course-screen-reset-kdp-interior.pdf`.**
- The ink of the page numbers is 0.308 in above the bottom trim on 87 of 90 pages.
- **Fix:** in `products/course-screen-reset/build/workbook.js` line 48, the footer style is `bottom:${(V.book ? V.bleed : 0) + .28}in`. Change it to `bottom:${V.book ? V.bleed + .42 : .28}in` so the book gets about 0.45 in and the home-print workbook stays the same. Raise the book's bottom content padding by 0.14 in to match, then rebuild with `sh build/make.sh`.

**Placeholder covers (hardcovers and the Lulu softcover).**
- Do not upload `cover-ingramspark-hardcover.pdf`, `cover-wrap-hardcover-sample.pdf` or `cover-wrap-softcover-sample.pdf` as they are.
- **IngramSpark hardcover:**
  1. Buy the hardcover ISBN.
  2. Run IngramSpark's Cover Template Generator for 8.5 × 8.5 in, case laminate, 32 pages, and the chosen paper.
  3. Rebuild with `HC_SPINE_IN=<value> node build.js`, and change the fixed 19.13 × 10.0 in, board, hinge and wrap numbers in `picture-tablet-slept/build.js` to the template's numbers.
  4. Place the ISBN box exactly where the template puts the barcode.
- **Lulu:** the order job must pass `--cover-w --cover-h --spine` from Lulu's cover-dimensions API (already planned in `ORDER-TO-PRINT.md`).
- **Both:** test once in the printer's sandbox or validator before the first order.

**Placeholder text inside the ISBN/barcode box on every back cover.**
Box sizes are all 2.0 × 1.198 in, which matches BRAND.md's 2 × 1.2 in.

| Cover | Box distance from spine / bottom trim | What prints |
|---|---|---|
| board-up paperback | 0.254 / 0.254 in (plus a grey frame 2.03 × 1.23 in) | "ISBN / BARCODE · Leave white. Printer or ISBN agency supplies this." |
| course KDP | 0.604 / 0.50 in, dashed outline | "ISBN / barcode · KDP places the barcode here" |
| guide KDP | 0.50 / 0.50 in, dashed outline | same |
| tablet KDP and IngramSpark | 0.375 / 0.385 in, dashed black outline | "ISBN / BARCODE · 2 × 1.2 in · keep clear" |
| laps soft/hard (Lulu) | 0.427 / 0.427 in (navy frame) | "ISBN / barcode" |
| board book p26 | lower right | "ISBN / BARCODE · Leave white…" |

- **The problem:** KDP puts its own barcode in a fixed spot at the lower right of the back cover (UNVERIFIED position). The four KDP boxes sit at three different offsets, so KDP's barcode will not cover the label text or the dashed outline, and both will print. KDP also flags text in the barcode area (UNVERIFIED).
- **Fix, one of two ways:**
  - **(a) Let KDP place the barcode:** in each cover builder's final upload build, remove the label text, dashed outline and frame, and leave only a plain white 2 × 1.2 in rectangle at the offset KDP uses.
  - **(b) Own ISBN:** place the real barcode (EAN-13 with price add-on) in the box and remove the label.
- **Builders to change:** `board-up-go-more/paperback/cover-wrap.html`, `course-screen-reset/build/extras.js`, `guide-100-plays/build/`, `picture-tablet-slept/build.js`, `picture-laps-not-apps/build.js`. A `--final` flag that drops every placeholder label would cover all of them at once.

**Founder and ISBN placeholders inside interiors.** KDP's content review may reject placeholder or incomplete text (UNVERIFIED). Even if it passes, the text prints in the book.

| File | Page | Text that would print |
|---|---|---|
| up-go-more interior | p1–2 | "[FOUNDER: your name or pen name]" |
| | p2 | "ISBN [paperback ISBN]" |
| | p3 | "FOUNDER: REWRITE THIS PAGE…" |
| course KDP interior | p2 | ISBN box "Founder adds the ISBN here (Bowker)" |
| | p4 | "FOUNDER WRITES THIS" box |
| guide KDP interior (and brand-kit file) | p2 | "ISBN (paperback): ____", "founder adds the ISBN here before upload" |
| tablet interior | p2 | "ISBN / BARCODE" box |
| | p3, p31 | "FOUNDER WRITES THIS PAGE" |
| laps interior | p1, p2, p32 | byline, ISBN and manufacturing-line placeholders |
| board book | p25 | byline, ISBN, "Printed in [country]", "Batch [tracking no.]" |

- **Fix:** the founder writes each text in WORDS.md or content.js and replaces each ISBN line with the real ISBN as plain text. On interiors, delete the barcode box from the copyright page, because a barcode belongs only on the cover.
- **Build gate:** course has `make.sh --final`, which refuses to build while placeholders remain. Add the same gate to the other builders, and make the upload checklist require a `--final` build.

**Board book (offset, Wave 3).** Before quoting printers:
- convert to CMYK PDF/X (see G2 and G3);
- move "peekaboo", "night-night", "all done", "uh-oh" and the others at least 0.375 in inside the trim, and more if the printer's rounded-corner die needs it (UNVERIFIED);
- replace the page 25 placeholders; "Batch [tracking no.]" is the tracking label a children's product needs, so it must hold a real value;
- confirm the board count and page-count rules with the printer.

**G2 and G3: RGB only, no output intent, live transparency.**
- Every file uses DeviceRGB colour only: 0 CMYK operators and no ICC or output intent.
- Chromium adds page transparency groups (for example 157 in the board-up interior), and some files carry soft masks (64 in the course interior, 14 in the tablet interior).
- **KDP:** accepts RGB and converts it (UNVERIFIED). No change needed for KDP.
- **IngramSpark, and required for offset:** convert a copy to PDF/X-1a (flattened) or PDF/X-4 in the CMYK profile the printer names. Options: Acrobat Pro Preflight "Convert to PDF/X-4", or Ghostscript `pdfwrite` with `-dPDFX -sColorConversionStrategy=CMYK` and the printer's ICC profile. Ghostscript is not installed in this container. Keep the RGB master for KDP and Lulu.
- Bright RGB brand colours (#3D86D8, #2FA36B, #EE5A36, #F5B820) fall outside the CMYK range and will print duller. Judge them on a physical proof.
- `board-up-go-more` lists IngramSpark as a paperback channel, but only a KDP cover exists. IngramSpark needs its own cover from its template, because its spine and barcode rules differ (UNVERIFIED).

### Tier 2: the printer accepts the file, but the print looks wrong

- **Write-on lines drawn as gradient shadings** (CSS `repeating-linear-gradient`): 128 in the course KDP interior, 26 in the guide KDP interior, plus the course, guide and family-kit printables.
  - Skia writes these as Type 1 function shadings driven by a PostScript calculator (Type 4) function.
  - In this session's renderer they came out as soft grey bars about 3 pt thick (guide p24, course p9). They were invisible on course workbook p29 (Color Letter) and showed as thick bars in the Low-ink A4 edition.
  - What a printer's software produces is unpredictable.
  - **Fix:** replace each ruled area with real vector lines, for example stacked `<div style="border-bottom:.75pt solid #9a9a9a;height:.3in">` rows or an inline SVG of `<line>` elements. Search `build/book.js` (guide) and `build/workbook.js` (course) for `repeating-linear-gradient`.
- **Solid colour spines with hard edges:** course (orange, 0.2027 in), guide (orange, 0.1937 in) and board-up (blue/yellow break at a 0.075 in spine). Printer spine placement varies by about ±0.0625 in (UNVERIFIED), so a colour edge at the fold shows on the front or back.
  - **Fix:** carry the front's background colour across the spine and about 0.0625 in onto the back panel, or use one continuous background as *The Day the Tablet Slept* does.
- **Fallback fonts**, where a glyph is missing from the brand fonts:
  - Liberation Sans: ↑ and → in the tablet interior; a bold glyph in the course interior; the tuck boxes; the toddler book; visual routine cards.
  - DejaVu Sans: *Talk Tower* kit and the starter funnel PDF.
  - They print fine but off-brand. **Fix:** draw the arrows or ticks as inline SVG, or include them in the static font subsets.
- **Grey body text in the black-and-white interiors** (#636363 and #555555 as RGB greys) prints as a halftone screen, which is slightly soft at 6.6–8 pt. This is acceptable. For the crispest 7–8 pt type, use a solid tint of black or 100% black.
- **Small type on printer files:**
  - card fronts: 5.1–5.6 pt;
  - hang tag: 5.4 pt;
  - tuck box: 4.9 pt;
  - board book: 5.9 pt.
  **Fix:** raise every piece of text a reader needs to at least 6 pt, and 7 pt on cards.
- **Tuck box:** upload only the art (page 2), placed on the chosen printer's own tuck-box template. Remove the "Barcode / UPC" box unless a retailer needs a UPC.
- **Hang tag:** remove the dashed punch-hole circle, or keep it only if the partner punches holes. Otherwise it prints as a dashed ring.
- **Card decks, before any upload:** many card printers take one 300 dpi image per card rather than a PDF (UNVERIFIED). Export with `page.get_pixmap(dpi=300)` → 825 × 1125 px PNGs. Update BRAND.md: a 0.375 in safe zone is impossible on a 2.5 in card; the decks use 0.16 in.
- **BRAND.md vs KDP bleed:** BRAND.md says picture books are 8.75 × 8.75 in with bleed on every edge. KDP and IngramSpark interiors have no bleed at the gutter, giving 8.625 × 8.75 in (UNVERIFIED). The KDP files correctly use 8.625. Only Lulu (`picture-laps-not-apps`) uses 8.75. BRAND.md should say "per the printer's template".

### Tier 3: home-print printables (these do not go to a printer, but customers receive them)

- **Founder placeholders visible in files ready to sell.** This is the biggest problem.
  - `first-phone-plan` p4 "FOUNDER'S NOTE · PLACEHOLDER": all 9 main, downloads and Etsy PDFs.
  - `play-first-family-kit` p4, same wording: 8 PDFs.
  - `play-talk-cards` and `talk-along` p3 "FOUNDER'S NOTE · TO BE WRITTEN BY THE FOUNDER…": 16 PDFs.
  - `picture-more-talk-less-tap` kit p2 and p12 "FOUNDER: 'A note from the maker'…": 8 PDFs. The read-aloud story p3–4 has "FOUNDER: your author line / your dedication": 2 PDFs.
  - `course-screen-reset` workbook p3 "FOUNDER WRITES THIS": 5 PDFs.
  - `guide-100-plays` p2 ISBN placeholder lines: all 8 Letter/A4/low-ink/Etsy editions.

  **Fix:** the founder writes each note. Rebuild each product with a gate that fails the build while any `FOUNDER` or `PLACEHOLDER` string remains. Do not upload `etsy-upload/` files until this preflight shows 0 placeholders.
- **Footer running off the A4 page:** `first-phone-plan-a4.pdf`, `first-phone-plan-low-ink-a4.pdf`, `play-first-family-kit-a4.pdf` and `play-first-family-kit-low-ink-a4.pdf` (the store/own-site editions).
  - "Version 1.0 · September 2026 · [page]" ends 0.013 in from the right edge on 17–41 pages, and 0.065 in on the rest. Home printers will cut it off.
  - The Etsy A4 editions are fine because their footer is shorter (no URL). The Letter editions are fine.
  - **Fix:** in the A4 footer, shorten the text or allow it to wrap, keeping at least 0.5 in from the right edge. Re-render the A4 store editions.
- **Copyright line within 0.1–0.25 in of the page edge.** Most home printers cannot print within about 0.125–0.25 in of the edge (UNVERIFIED), so the © line may be cut off.
  - `play-talk-cards.pdf`, `-low-ink.pdf` and `family-talk-along-cards*.pdf` (Letter): footer "playbeforepixels.com · © 2026…" 0.094 in above the bottom edge on the card-sheet pages.
  - A4 talk cards: 0.18 in.
  - `bored-play-cards`: sideways © text 0.15–0.22 in from the side edge on card sheets.
  - Visual routine cards and START-HERE files: 0.17–0.18 in.

  **Fix:** keep every line of text at least 0.25 in from the paper edge. On card sheets, where margins are tight by design, move the © line into the gap between card rows.
- **No © line:** `course-screen-reset/funnel/starter/7 Days of Play First - US Letter.pdf` and `- A4.pdf`. **Fix:** add "© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC." to the page 3 footer.
- **Tiny type under 5 pt:**
  - visual routine cards, down to 3.1 pt (chart chips);
  - first phone plan, down to 3.95 pt (a "z" glyph and "draw it" labels);
  - toddler busy book, down to 3.9 pt ("TALK WHILE YOU PLAY", "MAKE IT EASIER");
  - family kit, down to 3.7 pt ("draw it");
  - talk cards, down to 4.7 pt.

  **Fix:** at least 6 pt for anything a parent needs to read.
- **72 dpi rasters in the family kit:** 4–9 ruled "write here" strips per file are 72 dpi images, which Chromium rasterised from gradients. **Fix:** the same one as for ruled lines above.
- **Double-sided card sheets** (`bored-play-cards-double-sided-*`): the card backs are coloured right up to each card edge. A duplex printer's front-to-back shift will show white slivers. Suggest a 0.09 in white border on the backs, as the fronts already have.

---

## Checks requested, with results

**Page count and parity**

| Interior | Pages | ≥ 24 for KDP (UNVERIFIED) | Even for IngramSpark (UNVERIFIED) |
|---|---|---|---|
| up-go-more paperback | 32 | yes | yes |
| picture-tablet-slept | 32 | yes | yes |
| guide KDP | 86 | yes | yes |
| course KDP | 90 | yes | yes |
| laps (Lulu) | 32 | yes | yes |
| board book (offset) | 26 | n/a | yes |

**Cover-wrap width = 2 × 0.125 bleed + 2 × trim width + spine, with spine = pages × paper thickness.** The paper thicknesses used are UNVERIFIED: white 0.002252 in per page for the B/W books, premium colour 0.002347 for the colour books. Cream (0.0025) was not used, because no book specifies cream. If cream is chosen at upload, the 90-page course spine becomes 0.225 in and its cover must be rebuilt.

| Cover | Interior pages | Spine expected | Spine in file | Width expected | Width in file | Height | Match |
|---|---|---|---|---|---|---|---|
| up-go-more KDP | 32 | 0.0751 | 0.0751 | 17.3251 | 17.3251 | 8.75 | ✓ |
| tablet KDP | 32 | 0.0751 | 0.0751 | 17.3251 | 17.3251 | 8.75 | ✓ |
| course KDP | 90 | 0.2027 | 0.2027 | 16.4527 | 16.4527 | 10.25 | ✓ |
| guide KDP | 86 | 0.1937 | 0.1937 | 16.4437 | 16.4437 | 10.25 | ✓ (was 16.43 in for 82 pages until 02:20) |
| laps softcover (Lulu) | 32 | from the Lulu API | 0.0833 (placeholder) | from the Lulu API | 17.3333 | 8.75 | cannot verify |
| tablet hardcover (IngramSpark) | 32 | from the template generator | 0.25 (placeholder) | from the template | 19.13 × 10.0 | — | cannot verify |
| laps hardcover (Lulu) | 32 | from the Lulu API | placeholder | from the Lulu API | 19.0 × 10.25 | — | cannot verify |

No cover has spine text. That is correct for the 32-page books, because KDP allows spine text only above about 79 pages (UNVERIFIED). It is optional for the 86- and 90-page books, which have spines of about 0.19–0.20 in.

**Fonts:**
- No non-Type 3 font is missing from any file.
- Every file uses Type 3 glyphs for the brand fonts (G1).
- Fallback fonts appear as listed in Tier 2.

**Raster images at placed size:**
- Books: `picture-tablet-slept.pdf` has 7 images, all 300 dpi. The other book files have no raster images.
- Printables: 300–780 dpi, except the 72 dpi ruled strips in the family kit and 5 images at 72–279 dpi in the internal `merch-core.pdf`.
- A first pass reported many "72 dpi images" in the guide and course interiors. Those were MuPDF's samples of the gradient shadings, not real images; the check was corrected to count only real image objects.

**Safe zone, measured on every page:**
- The glyph edges of every text span were measured against the trim (brand minimum 0.375 in; 0.16 in for cards; 0.125 in for the hang tag; 0.25 in to the paper edge for printables).
- Five pages per printer file were rendered and inspected:
  - up-go-more p1, 2, 5, 17, 32; board book p1, 4, 13, 25, 26; course KDP p1, 2, 4, 45, 90; tablet p1, 2, 3, 16, 31; laps p1, 2, 12, 21, 32;
  - card fronts p1, 2, 20/30, 53, 54; the backs; the tuck box p1–2; the hang tag p1–3;
  - every cover.
- For every printable family, five pages each of the Letter, A4, low-ink and START-HERE editions were inspected as contact sheets.
- Nothing is clipped or overlapping except the items already listed.

**Copyright line "© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.":**
- Present on the copyright page of every book interior: up-go-more p2, course p2, guide p2 (and p84), tablet p2, laps p2, board book p25.
- Also on the guide back cover, the hang tag and the tuck boxes.
- Missing from the card fronts and backs; acceptable, since it is on the tuck box.
- Missing from both "7 Days of Play First" PDFs; this must be fixed.
- `bored-play-cards-double-sided-*` has it only in ALL CAPS styling; acceptable.

**File size vs limits (UNVERIFIED limits):**
- KDP interiors: 1.6–4.3 MB against 650 MB.
- KDP covers: 0.22–0.33 MB against 40 MB.
- Etsy files: the largest is 14.6 MB (`visual-routine-cards` complete Letter) against 20 MB per file.
- All pass.

---

## Needs a live check (every UNVERIFIED item above)

1. **KDP interior with bleed:** page size = trim + 0.125 in wide and + 0.25 in tall. Minimum outside margin 0.375 in with bleed. Gutter 0.375 in for 24–150 pages. Does KDP's reviewer flag footer text at 0.29–0.31 in?
2. **KDP paper thickness per page:** white 0.002252, cream 0.0025, premium colour 0.002347, standard colour 0.002252. Confirm the cover calculator's numbers for 32, 86 and 90 pages (17.3251, 16.4437 and 16.4527 in expected).
3. **KDP spine:** text is allowed only above 79 (or 80) pages. Spine placement varies by ±0.0625 in.
4. **KDP barcode:** exact placement and size (2 × 1.2 in, lower right of the back cover, and at what offsets). Is text or a border inside that area flagged?
5. **KDP limits and minimums:** file sizes (650 MB interior, 40 MB cover); minimum 24 pages; what happens to an odd page count; whether 8.5 × 8.5 in is offered in premium colour.
6. **KDP file handling:** does it accept Type 3 fonts, RGB, and live transparency without flattening? What is its policy on placeholder or incomplete text?
7. **IngramSpark files:** the interior bleed convention (top, bottom and outside only?); whether PDF/X-1a or PDF/X-4 and CMYK are required or preferred; whether Type 3 fonts are rejected; the total ink limit; the even page-count rule.
8. **IngramSpark products and cover:** minimum pages for an 8.5 × 8.5 in case laminate and paperback; the Cover Template Generator values for the tablet hardcover; whether IngramSpark requires its own barcode.
9. **Lulu:** 8.75 × 8.75 in interior with bleed on every edge; cover dimensions from the API; minimum page counts for casewrap and perfect-bound; whether RGB and transparency are accepted.
10. **Card printer:** file size for poker cards with bleed (2.75 × 3.75 in / 825 × 1125 px); the safe margin; PDF or one image per card; tuck-box template; minimum type size.
11. **Etsy digital downloads:** 5 files per listing, 20 MB each.
12. **Home printers:** typical unprintable margin of 0.125–0.25 in.
13. **Board-book offset printer:** CMYK/PDF-X, the safe zone with a rounded-corner die, board or page count rules, and the tracking-label requirement.

---

## Appendix A: home-print printables (112 files; the internal `merch-core.pdf` production book is excluded)

Status rules:
- **FAIL:** a founder placeholder prints, text touches the page edge (under 0.02 in), there is no © line, the page is not Letter or A4, or a file is over 20 MB.
- **WARN:** text 0.02–0.24 in from the paper edge, type under 6 pt, fallback glyphs, rasters under 300 dpi, or ruled lines drawn as gradient shadings.
- Landscape Letter/A4 pages, such as the visual routine charts, count as Letter/A4.

| File | Printer / use | Status | Issues | Pages | Paper | MB |
|---|---|---|---|---|---|---|
| `bored-play-cards/bored-play-cards-A4.pdf` | Own store / Etsy digital, home print | WARN | text 0.16 in from edge on 30 pp; type down to 5.25 pt | 50 | A4 | 6.6 |
| `bored-play-cards/bored-play-cards-EDITABLE-A4.pdf` | Own store / Etsy digital, home print | WARN | text 0.15 in from edge on 6 pp; type down to 5.25 pt | 11 | A4 | 1.8 |
| `bored-play-cards/bored-play-cards-EDITABLE-Letter.pdf` | Own store / Etsy digital, home print | WARN | text 0.22 in from edge on 6 pp; type down to 5.25 pt | 11 | Letter | 1.8 |
| `bored-play-cards/bored-play-cards-double-sided-cards-A4.pdf` | Own store / Etsy digital, home print | WARN | © line set in ALL CAPS; text 0.15 in from edge on 48 pp; type down to 5.25 pt | 48 | A4 | 5.9 |
| `bored-play-cards/bored-play-cards-double-sided-cards-Letter.pdf` | Own store / Etsy digital, home print | WARN | © line set in ALL CAPS; text 0.22 in from edge on 48 pp; type down to 5.25 pt | 48 | Letter | 5.9 |
| `bored-play-cards/bored-play-cards.pdf` | Own store / Etsy digital, home print | WARN | text 0.22 in from edge on 30 pp; type down to 5.25 pt | 50 | Letter | 6.6 |
| `bored-play-cards/etsy-upload/1-Im-Bored-Play-Cards-US-Letter.pdf` | Etsy digital, home print | WARN | text 0.22 in from edge on 30 pp; type down to 5.25 pt | 50 | Letter | 6.6 |
| `bored-play-cards/etsy-upload/2-Im-Bored-Play-Cards-A4.pdf` | Etsy digital, home print | WARN | text 0.16 in from edge on 30 pp; type down to 5.25 pt | 50 | A4 | 6.6 |
| `course-screen-reset/course-screen-reset.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p3; fallback glyphs (LiberationSans); ruled lines drawn as 128 gradient shadings | 89 | Letter | 4.8 |
| `course-screen-reset/downloads/2. Workbook - Color - US Letter.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p3; fallback glyphs (LiberationSans); ruled lines drawn as 128 gradient shadings | 89 | Letter | 4.8 |
| `course-screen-reset/downloads/3. Workbook - Low-ink - US Letter.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p3; fallback glyphs (LiberationSans); ruled lines drawn as 128 gradient shadings | 89 | Letter | 4.8 |
| `course-screen-reset/downloads/4. Workbook - Color - A4.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p3; fallback glyphs (LiberationSans); ruled lines drawn as 128 gradient shadings | 89 | A4 | 4.8 |
| `course-screen-reset/downloads/5. Workbook - Low-ink - A4.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p3; fallback glyphs (LiberationSans); ruled lines drawn as 128 gradient shadings | 89 | A4 | 4.9 |
| `course-screen-reset/funnel/starter/7 Days of Play First - A4.pdf` | Own store / Etsy digital, home print | FAIL | no "© 2026 AlphaPlay LLC" line; fallback glyphs (DejaVuSans/LiberationSans) | 3 | A4 | 0.5 |
| `course-screen-reset/funnel/starter/7 Days of Play First - US Letter.pdf` | Own store / Etsy digital, home print | FAIL | no "© 2026 AlphaPlay LLC" line; fallback glyphs (DejaVuSans/LiberationSans) | 3 | Letter | 0.5 |
| `course-screen-reset/downloads/1. START HERE.pdf` | Own store / Etsy digital, home print | PASS | — | 1 | Letter | 0.2 |
| `first-phone-plan/downloads/first-phone-plan-a4.pdf` | Own store / Etsy digital, home print | FAIL | text touching page edge on 28 pp (p10 'Version 1.0 · September 20', 0.013 in); founder placeholder printed on p4; text 0.07 in from edge on 8 pp; type down to 3.95 pt | 37 | A4 | 4.5 |
| `first-phone-plan/downloads/first-phone-plan-low-ink-a4.pdf` | Own store / Etsy digital, home print | FAIL | text touching page edge on 17 pp (p10 'Version 1.0 · September 20', 0.013 in); founder placeholder printed on p4; text 0.07 in from edge on 8 pp; type down to 3.95 pt | 26 | A4 | 4.3 |
| `first-phone-plan/downloads/first-phone-plan-low-ink.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p4; type down to 3.95 pt | 26 | Letter | 4.3 |
| `first-phone-plan/downloads/first-phone-plan.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p4; type down to 3.95 pt | 37 | Letter | 4.5 |
| `first-phone-plan/etsy-upload/2-Color-US-Letter.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p4; type down to 3.95 pt | 37 | Letter | 4.5 |
| `first-phone-plan/etsy-upload/3-Color-A4.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p4; type down to 3.95 pt | 37 | A4 | 4.5 |
| `first-phone-plan/etsy-upload/4-Low-Ink-US-Letter.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p4; type down to 3.95 pt | 26 | Letter | 4.3 |
| `first-phone-plan/etsy-upload/5-Low-Ink-A4.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p4; type down to 3.95 pt | 26 | A4 | 4.3 |
| `first-phone-plan/first-phone-plan.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p4; type down to 3.95 pt | 37 | Letter | 4.5 |
| `first-phone-plan/downloads/START HERE.pdf` | Own store / Etsy digital, home print | PASS | — | 1 | Letter | 0.2 |
| `first-phone-plan/etsy-upload/START HERE.pdf` | Etsy digital, home print | PASS | — | 1 | Letter | 0.2 |
| `guide-100-plays/etsy-upload/2-Color-US-Letter.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p2; ruled lines drawn as 26 gradient shadings | 90 | Letter | 3.5 |
| `guide-100-plays/etsy-upload/3-Color-A4.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p2; ruled lines drawn as 26 gradient shadings | 90 | A4 | 3.5 |
| `guide-100-plays/etsy-upload/4-Low-Ink-US-Letter.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p2; ruled lines drawn as 20 gradient shadings | 90 | Letter | 4.9 |
| `guide-100-plays/etsy-upload/5-Low-Ink-A4.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p2; ruled lines drawn as 20 gradient shadings | 90 | A4 | 4.8 |
| `guide-100-plays/guide-100-plays-a4.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p2; ruled lines drawn as 26 gradient shadings | 90 | A4 | 3.5 |
| `guide-100-plays/guide-100-plays-letter.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p2; ruled lines drawn as 26 gradient shadings | 90 | Letter | 3.5 |
| `guide-100-plays/guide-100-plays-low-ink-a4.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p2; ruled lines drawn as 20 gradient shadings | 90 | A4 | 4.8 |
| `guide-100-plays/guide-100-plays-low-ink-letter.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p2; ruled lines drawn as 20 gradient shadings | 90 | Letter | 4.9 |
| `guide-100-plays/START-HERE.pdf` | Own store / Etsy digital, home print | PASS | — | 1 | Letter | 0.2 |
| `guide-100-plays/etsy-upload/1-START-HERE.pdf` | Etsy digital, home print | PASS | — | 1 | Letter | 0.2 |
| `picture-more-talk-less-tap/downloads/Talk-Tower-Classroom-Game-Kit-A4-Ink-Saver.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p2,12; fallback glyphs (DejaVuSans) | 25 | A4 | 3.0 |
| `picture-more-talk-less-tap/downloads/Talk-Tower-Classroom-Game-Kit-A4.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p2,12; fallback glyphs (DejaVuSans) | 25 | A4 | 3.0 |
| `picture-more-talk-less-tap/downloads/Talk-Tower-Classroom-Game-Kit-US-Letter-Ink-Saver.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p2,12; fallback glyphs (DejaVuSans) | 25 | Letter | 3.0 |
| `picture-more-talk-less-tap/downloads/Talk-Tower-Classroom-Game-Kit-US-Letter.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p2,12; fallback glyphs (DejaVuSans) | 25 | Letter | 3.0 |
| `picture-more-talk-less-tap/downloads/Talk-Tower-Story-Read-Aloud.pdf` | Digital bonus, home print | FAIL | founder placeholder printed on p3,4 | 32 | 8.75 x 8.75 in | 1.8 |
| `picture-more-talk-less-tap/picture-more-talk-less-tap-A4.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p2,12; fallback glyphs (DejaVuSans) | 25 | A4 | 3.0 |
| `picture-more-talk-less-tap/picture-more-talk-less-tap-ink-saver-A4.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p2,12; fallback glyphs (DejaVuSans) | 25 | A4 | 3.0 |
| `picture-more-talk-less-tap/picture-more-talk-less-tap-ink-saver.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p2,12; fallback glyphs (DejaVuSans) | 25 | Letter | 3.0 |
| `picture-more-talk-less-tap/picture-more-talk-less-tap.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p2,12; fallback glyphs (DejaVuSans) | 25 | Letter | 3.0 |
| `picture-more-talk-less-tap/story-bonus/more-talk-less-tap-read-aloud.pdf` | Digital bonus, home print | FAIL | founder placeholder printed on p3,4 | 32 | 8.75 x 8.75 in | 1.8 |
| `picture-more-talk-less-tap/downloads/START HERE.pdf` | Own store / Etsy digital, home print | PASS | — | 1 | Letter | 0.2 |
| `picture-more-talk-less-tap/downloads/Talk-Tower-Slides-16x9.pdf` | Projected (digital) | PASS | — | 20 | 13.3333 x 7.5 in | 0.7 |
| `picture-more-talk-less-tap/picture-more-talk-less-tap-slides.pdf` | Projected (digital) | PASS | — | 20 | 13.3333 x 7.5 in | 0.7 |
| `picture-more-talk-less-tap/start-here.pdf` | Own store / Etsy digital, home print | PASS | — | 1 | Letter | 0.2 |
| `play-first-family-kit/etsy-upload/2-Color-US-Letter.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p4; type down to 3.75 pt; 6 raster(s) at 72.0 dpi; ruled lines drawn as 10 gradient shadings | 50 | Letter | 6.0 |
| `play-first-family-kit/etsy-upload/3-Color-A4.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p4; type down to 4.09 pt; 4 raster(s) at 72.0 dpi; ruled lines drawn as 14 gradient shadings | 50 | A4 | 6.0 |
| `play-first-family-kit/etsy-upload/4-Low-Ink-US-Letter.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p4; type down to 3.74 pt; 9 raster(s) at 72.0 dpi; ruled lines drawn as 4 gradient shadings | 32 | Letter | 4.9 |
| `play-first-family-kit/etsy-upload/5-Low-Ink-A4.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p4; type down to 4.09 pt; 8 raster(s) at 72.0 dpi; ruled lines drawn as 10 gradient shadings | 32 | A4 | 4.9 |
| `play-first-family-kit/play-first-family-kit-a4.pdf` | Own store / Etsy digital, home print | FAIL | text touching page edge on 41 pp (p10 'Version 1.0 · September 20', 0.013 in); founder placeholder printed on p4; text 0.07 in from edge on 8 pp; type down to 4.09 pt; 4 raster(s) at 72.0 dpi; ruled lines drawn as 14 gradient shadings | 50 | A4 | 6.1 |
| `play-first-family-kit/play-first-family-kit-low-ink-a4.pdf` | Own store / Etsy digital, home print | FAIL | text touching page edge on 23 pp (p10 'Version 1.0 · September 20', 0.013 in); founder placeholder printed on p4; text 0.07 in from edge on 8 pp; type down to 4.09 pt; 8 raster(s) at 72.0 dpi; ruled lines drawn as 10 gradient shadings | 32 | A4 | 5.0 |
| `play-first-family-kit/play-first-family-kit-low-ink.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p4; type down to 3.74 pt; 9 raster(s) at 72.0 dpi; ruled lines drawn as 4 gradient shadings | 32 | Letter | 4.9 |
| `play-first-family-kit/play-first-family-kit.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p4; type down to 3.75 pt; 6 raster(s) at 72.0 dpi; ruled lines drawn as 10 gradient shadings | 50 | Letter | 6.0 |
| `play-first-family-kit/START-HERE.pdf` | Own store / Etsy digital, home print | PASS | — | 1 | Letter | 0.2 |
| `play-first-family-kit/etsy-upload/1-START-HERE.pdf` | Etsy digital, home print | PASS | — | 1 | Letter | 0.3 |
| `play-talk-cards/etsy-upload/2-Color-US-Letter.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p3; text 0.09 in from edge on 20 pp; type down to 4.7 pt | 21 | Letter | 2.3 |
| `play-talk-cards/etsy-upload/3-Color-A4.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p3; text 0.18 in from edge on 20 pp; type down to 4.7 pt | 21 | A4 | 2.3 |
| `play-talk-cards/etsy-upload/4-Low-Ink-US-Letter.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p3; text 0.09 in from edge on 20 pp; type down to 4.7 pt | 21 | Letter | 2.4 |
| `play-talk-cards/etsy-upload/5-Low-Ink-A4.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p3; text 0.18 in from edge on 20 pp; type down to 4.7 pt | 21 | A4 | 2.4 |
| `play-talk-cards/play-talk-cards-A4.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p3; text 0.18 in from edge on 20 pp; type down to 4.7 pt | 21 | A4 | 2.3 |
| `play-talk-cards/play-talk-cards-low-ink-A4.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p3; text 0.18 in from edge on 20 pp; type down to 4.7 pt | 21 | A4 | 2.4 |
| `play-talk-cards/play-talk-cards-low-ink.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p3; text 0.09 in from edge on 20 pp; type down to 4.7 pt | 21 | Letter | 2.4 |
| `play-talk-cards/play-talk-cards.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p3; text 0.09 in from edge on 20 pp; type down to 4.7 pt | 21 | Letter | 2.3 |
| `play-talk-cards/talk-along/etsy-upload/2-Color-US-Letter.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p3; text 0.09 in from edge on 14 pp; type down to 4.83 pt | 15 | Letter | 1.8 |
| `play-talk-cards/talk-along/etsy-upload/3-Color-A4.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p3; text 0.18 in from edge on 14 pp; type down to 4.83 pt | 15 | A4 | 1.8 |
| `play-talk-cards/talk-along/etsy-upload/4-Low-Ink-US-Letter.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p3; text 0.09 in from edge on 14 pp; type down to 4.83 pt | 15 | Letter | 1.7 |
| `play-talk-cards/talk-along/etsy-upload/5-Low-Ink-A4.pdf` | Etsy digital, home print | FAIL | founder placeholder printed on p3; text 0.18 in from edge on 14 pp; type down to 4.83 pt | 15 | A4 | 1.7 |
| `play-talk-cards/talk-along/family-talk-along-cards-A4.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p3; text 0.18 in from edge on 14 pp; type down to 4.83 pt | 15 | A4 | 1.8 |
| `play-talk-cards/talk-along/family-talk-along-cards-low-ink-A4.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p3; text 0.18 in from edge on 14 pp; type down to 4.83 pt | 15 | A4 | 1.7 |
| `play-talk-cards/talk-along/family-talk-along-cards-low-ink.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p3; text 0.09 in from edge on 14 pp; type down to 4.83 pt | 15 | Letter | 1.7 |
| `play-talk-cards/talk-along/family-talk-along-cards.pdf` | Own store / Etsy digital, home print | FAIL | founder placeholder printed on p3; text 0.09 in from edge on 14 pp; type down to 4.83 pt | 15 | Letter | 1.8 |
| `play-talk-cards/START-HERE.pdf` | Own store / Etsy digital, home print | WARN | text 0.17 in from edge on 1 pp; type down to 5.7 pt | 1 | Letter | 0.3 |
| `play-talk-cards/etsy-upload/1-START-HERE.pdf` | Etsy digital, home print | WARN | text 0.17 in from edge on 1 pp; type down to 5.7 pt | 1 | Letter | 0.2 |
| `play-talk-cards/talk-along/START-HERE.pdf` | Own store / Etsy digital, home print | WARN | text 0.17 in from edge on 1 pp; type down to 5.7 pt | 1 | Letter | 0.3 |
| `play-talk-cards/talk-along/etsy-upload/1-START-HERE.pdf` | Etsy digital, home print | WARN | text 0.17 in from edge on 1 pp; type down to 5.7 pt | 1 | Letter | 0.2 |
| `toddler-busy-book/etsy-upload/1-START-HERE.pdf` | Etsy digital, home print | WARN | fallback glyphs (LiberationSans) | 8 | Letter | 0.6 |
| `toddler-busy-book/etsy-upload/2-Toddler-Busy-Book-Color-US-Letter.pdf` | Etsy digital, home print | WARN | type down to 3.97 pt; fallback glyphs (LiberationSans) | 132 | Letter | 6.1 |
| `toddler-busy-book/etsy-upload/3-Toddler-Busy-Book-Color-A4.pdf` | Etsy digital, home print | WARN | type down to 3.91 pt; fallback glyphs (LiberationSans) | 132 | A4 | 6.1 |
| `toddler-busy-book/etsy-upload/4-Toddler-Busy-Book-Low-ink-US-Letter.pdf` | Etsy digital, home print | WARN | type down to 3.97 pt; fallback glyphs (LiberationSans) | 132 | Letter | 8.3 |
| `toddler-busy-book/etsy-upload/5-Toddler-Busy-Book-Low-ink-A4.pdf` | Etsy digital, home print | WARN | type down to 3.91 pt; fallback glyphs (LiberationSans) | 132 | A4 | 8.2 |
| `toddler-busy-book/toddler-busy-book-A4.pdf` | Own store / Etsy digital, home print | WARN | type down to 3.91 pt; fallback glyphs (LiberationSans) | 132 | A4 | 6.1 |
| `toddler-busy-book/toddler-busy-book-START-HERE-A4.pdf` | Own store / Etsy digital, home print | WARN | fallback glyphs (LiberationSans) | 8 | A4 | 0.6 |
| `toddler-busy-book/toddler-busy-book-START-HERE.pdf` | Own store / Etsy digital, home print | WARN | fallback glyphs (LiberationSans) | 8 | Letter | 0.6 |
| `toddler-busy-book/toddler-busy-book-low-ink-A4.pdf` | Own store / Etsy digital, home print | WARN | type down to 3.91 pt; fallback glyphs (LiberationSans) | 132 | A4 | 8.3 |
| `toddler-busy-book/toddler-busy-book-low-ink-Letter.pdf` | Own store / Etsy digital, home print | WARN | type down to 3.97 pt; fallback glyphs (LiberationSans) | 132 | Letter | 8.3 |
| `toddler-busy-book/toddler-busy-book.pdf` | Own store / Etsy digital, home print | WARN | type down to 3.97 pt; fallback glyphs (LiberationSans) | 132 | Letter | 6.1 |
| `visual-routine-cards/START-HERE-starter.pdf` | Own store / Etsy digital, home print | WARN | text 0.18 in from edge on 1 pp; type down to 5.4 pt | 1 | Letter | 0.2 |
| `visual-routine-cards/START-HERE.pdf` | Own store / Etsy digital, home print | WARN | text 0.18 in from edge on 1 pp; type down to 5.4 pt | 1 | Letter | 0.2 |
| `visual-routine-cards/etsy-upload/complete/1-START-HERE.pdf` | Etsy digital, home print | WARN | text 0.18 in from edge on 1 pp; type down to 5.4 pt | 1 | Letter | 0.2 |
| `visual-routine-cards/etsy-upload/complete/2-Color-US-Letter.pdf` | Etsy digital, home print | WARN | text 0.18 in from edge on 160 pp; type down to 3.14 pt; fallback glyphs (LiberationSans) | 160 | Letter/Letter (landscape pp) | 14.6 |
| `visual-routine-cards/etsy-upload/complete/3-Color-A4.pdf` | Etsy digital, home print | WARN | text 0.17 in from edge on 160 pp; type down to 3.14 pt; fallback glyphs (LiberationSans) | 160 | A4/A4 (landscape pp) | 14.5 |
| `visual-routine-cards/etsy-upload/complete/4-Low-Ink-US-Letter.pdf` | Etsy digital, home print | WARN | text 0.18 in from edge on 74 pp; type down to 3.14 pt; fallback glyphs (LiberationSans) | 74 | Letter/Letter (landscape pp) | 10.0 |
| `visual-routine-cards/etsy-upload/complete/5-Low-Ink-A4.pdf` | Etsy digital, home print | WARN | text 0.17 in from edge on 74 pp; type down to 3.14 pt; fallback glyphs (LiberationSans) | 74 | A4/A4 (landscape pp) | 10.0 |
| `visual-routine-cards/etsy-upload/starter/1-START-HERE.pdf` | Etsy digital, home print | WARN | text 0.18 in from edge on 1 pp; type down to 5.4 pt | 1 | Letter | 0.2 |
| `visual-routine-cards/etsy-upload/starter/2-Color-US-Letter.pdf` | Etsy digital, home print | WARN | text 0.18 in from edge on 24 pp; type down to 4.95 pt; fallback glyphs (LiberationSans) | 24 | Letter/Letter (landscape pp) | 2.5 |
| `visual-routine-cards/etsy-upload/starter/3-Color-A4.pdf` | Etsy digital, home print | WARN | text 0.17 in from edge on 24 pp; type down to 4.95 pt; fallback glyphs (LiberationSans) | 24 | A4/A4 (landscape pp) | 2.5 |
| `visual-routine-cards/etsy-upload/starter/4-Low-Ink-US-Letter.pdf` | Etsy digital, home print | WARN | text 0.18 in from edge on 24 pp; type down to 4.95 pt; fallback glyphs (LiberationSans) | 24 | Letter/Letter (landscape pp) | 3.2 |
| `visual-routine-cards/etsy-upload/starter/5-Low-Ink-A4.pdf` | Etsy digital, home print | WARN | text 0.17 in from edge on 24 pp; type down to 4.95 pt; fallback glyphs (LiberationSans) | 24 | A4/A4 (landscape pp) | 3.2 |
| `visual-routine-cards/visual-routine-cards-a4.pdf` | Own store / Etsy digital, home print | WARN | text 0.17 in from edge on 160 pp; type down to 3.14 pt; fallback glyphs (LiberationSans) | 160 | A4/A4 (landscape pp) | 14.6 |
| `visual-routine-cards/visual-routine-cards-low-ink-a4.pdf` | Own store / Etsy digital, home print | WARN | text 0.17 in from edge on 74 pp; type down to 3.14 pt; fallback glyphs (LiberationSans) | 74 | A4/A4 (landscape pp) | 10.0 |
| `visual-routine-cards/visual-routine-cards-low-ink.pdf` | Own store / Etsy digital, home print | WARN | text 0.18 in from edge on 74 pp; type down to 3.14 pt; fallback glyphs (LiberationSans) | 74 | Letter/Letter (landscape pp) | 10.0 |
| `visual-routine-cards/visual-routine-cards-starter-a4.pdf` | Own store / Etsy digital, home print | WARN | text 0.17 in from edge on 24 pp; type down to 4.95 pt; fallback glyphs (LiberationSans) | 24 | A4/A4 (landscape pp) | 2.5 |
| `visual-routine-cards/visual-routine-cards-starter-letter.pdf` | Own store / Etsy digital, home print | WARN | text 0.18 in from edge on 24 pp; type down to 4.95 pt; fallback glyphs (LiberationSans) | 24 | Letter/Letter (landscape pp) | 2.5 |
| `visual-routine-cards/visual-routine-cards-starter-low-ink-a4.pdf` | Own store / Etsy digital, home print | WARN | text 0.17 in from edge on 24 pp; type down to 4.95 pt; fallback glyphs (LiberationSans) | 24 | A4/A4 (landscape pp) | 3.2 |
| `visual-routine-cards/visual-routine-cards-starter-low-ink-letter.pdf` | Own store / Etsy digital, home print | WARN | text 0.18 in from edge on 24 pp; type down to 4.95 pt; fallback glyphs (LiberationSans) | 24 | Letter/Letter (landscape pp) | 3.2 |
| `visual-routine-cards/visual-routine-cards.pdf` | Own store / Etsy digital, home print | WARN | text 0.18 in from edge on 160 pp; type down to 3.14 pt; fallback glyphs (LiberationSans) | 160 | Letter/Letter (landscape pp) | 14.6 |

## Appendix B: internal files (checked, not graded)

- 58 files under `*/build/` (`tmp/`, `gen/`, `etsy/`): intermediate renders of the deliverables, with the same findings as their finished versions.
- `picture-laps-not-apps/picture-laps-not-apps.pdf`: the sample, with cover and back cover added. It has the same placeholders as the interior.
- `picture-laps-not-apps/template-variables.pdf`: shows the `{{TOKENS}}` on purpose.
- `merch-core/merch-core.pdf`: production book. It has founder slots and `[VERIFY]` notes by design, and 72 dpi mockups.

None of these should go into an upload folder. Consider adding `build/tmp/` and `build/gen/` to `.gitignore`.

## Appendix C: snapshot of printer files checked (modified time, first 12 characters of SHA-1)

| File | Modified | SHA-1 | Pages | MB |
|---|---|---|---|---|
| `board-up-go-more/board-up-go-more.pdf` | 01:31 | 385a59abbb54 | 26 | 1.39 |
| `board-up-go-more/paperback/up-go-more-talk-along-cover.pdf` | 01:31 | 63a42e786a20 | 1 | 0.33 |
| `board-up-go-more/paperback/up-go-more-talk-along-interior.pdf` | 01:31 | 58340b8d3c54 | 32 | 1.69 |
| `course-screen-reset/paperback/course-screen-reset-kdp-cover.pdf` | 01:40 | ad51cd09407e | 1 | 0.22 |
| `course-screen-reset/paperback/course-screen-reset-kdp-interior.pdf` | 01:40 | 8f610b2dc7f7 | 90 | 4.33 |
| `guide-100-plays/guide-100-plays-cover-wrap.pdf` | 02:20 | 671d750ff208 | 1 | 0.25 |
| `guide-100-plays/guide-100-plays-kdp-interior.pdf` | 02:20 | 835bfe32fa12 | 86 | 3.24 |
| `guide-100-plays/guide-100-plays.pdf` | 02:20 | 5c2104f4dd8d | 86 | 3.24 |
| `merch-core/hang-tag.pdf` | 01:30 | e19ebd985305 | 3 | 0.11 |
| `picture-laps-not-apps/cover-wrap-hardcover-sample.pdf` | 01:35 | 9c072cbef355 | 1 | 0.25 |
| `picture-laps-not-apps/cover-wrap-softcover-sample.pdf` | 01:35 | d91ce4ff7c3c | 1 | 0.23 |
| `picture-laps-not-apps/picture-laps-not-apps-interior.pdf` | 01:35 | d9f712dc504e | 32 | 2.21 |
| `picture-tablet-slept/cover-ingramspark-hardcover.pdf` | 01:23 | 33609778b479 | 1 | 0.23 |
| `picture-tablet-slept/cover-kdp-paperback.pdf` | 01:23 | a6aa43143f72 | 1 | 0.23 |
| `picture-tablet-slept/picture-tablet-slept.pdf` | 01:23 | bc2f75c1c04b | 32 | 1.58 |
| `play-talk-cards/pod-later/POD-LATER_play-talk-deck_54-fronts.pdf` | 02:16 | 694f612ba052 | 54 | 0.98 |
| `play-talk-cards/pod-later/POD-LATER_play-talk-deck_back.pdf` | 02:16 | 58c716bf608a | 1 | 0.03 |
| `play-talk-cards/pod-later/POD-LATER_play-talk-deck_tuck-box.pdf` | 02:16 | baeebd410159 | 2 | 0.21 |
| `play-talk-cards/pod-later/POD-LATER_talk-along-deck_54-fronts.pdf` | 02:16 | a1b079b99d54 | 54 | 0.83 |
| `play-talk-cards/pod-later/POD-LATER_talk-along-deck_back.pdf` | 02:16 | 5a3163ed2a17 | 1 | 0.03 |
| `play-talk-cards/pod-later/POD-LATER_talk-along-deck_tuck-box.pdf` | 02:16 | aca0f5a64b23 | 2 | 0.21 |
