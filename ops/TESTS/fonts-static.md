# Print-safe fonts: static instances of the brand fonts

**Run:** 2026-09-28, about 04:55–05:40 (container clock). **Tools:** fontTools 4.66.0 (`varLib.instancer`, overlaps removed with skia-pathops), Playwright 1.56.1 with Chromium 141.0.7390.37 through `brand/render.js`, and PyMuPDF 1.28.2.
**Scope (this lane):** `brand/fonts/`, this report and the test page `ops/TESTS/fonts-static-test.html`. No product file, no logo file and no commit. Product checks were rendered into a scratch copy.
**Fixes:** print-preflight.md **G1** (Type 3 fonts). G2 (RGB, no output intent) and G3 (live transparency) are untouched.

---

## Verdict

1. **Type 3 is gone.**
   - The brand fonts now come from 81 static TrueType instances, and every PDF rendered through `brand/fonts/fonts.css` embeds them as Type 0 / TrueType subsets.
   - Test page: 294 Type 0 font objects and 0 Type 3. The same page with the old variable fonts has 315 Type 3.
   - *The Day the Tablet Slept*: 0 Type 3 in the interior and both covers. Before: 93 Type 3 in the interior and 17 in each cover.
   - Family names are unchanged, so no product CSS needs editing.
2. **"Looks identical" holds only in part.** The variable fonts were never drawn at one fixed optical size.
   - The builds never set `opsz`. Chromium's default `font-optical-sizing: auto` then sets **opsz = font size in CSS px** for each piece of text. Measured below; this was true of the renders the catalogue shipped with.
   - A static file has one opsz, and CSS cannot choose a font file by text size. So text can only be identical where its size lands on the pin.
   - **Identical:**
     - Fredoka and Caveat at every size (no opsz axis);
     - Nunito Sans at 12px (9pt) and up;
     - Bricolage Grotesque at 96px (72pt) and up.
   - **Changed:** everything smaller gets **narrower and tighter**. Nunito loses 2% at 11px and 10% at 7px; Bricolage loses 2% at 84px and 10% at 14px.
3. **Why pin at the top of each axis.** Nunito opsz 12 and Bricolage opsz 96 are also the fonts' default instances. That end of the axis is the only pin at which text can never get wider than before, so no box can newly overflow and no ink can move toward the trim. The cost is tighter small print and tighter sub-display headings.
4. **picture-tablet-slept, rebuilt:**
   - Both covers and 26 of 32 interior pages are unchanged.
   - Six pages change, each in exactly one Bricolage heading (38–84px), which is 1.8–7.8% narrower.
   - No line breaks move, and no fallback fonts appear.
5. **Across the catalogue** (glyph survey of 368 pages):
   - 37% of brand-font glyphs render identically.
   - 57% are Nunito below 12px (card meta text, footers, captions), which gets 0–12% narrower.
   - 6% are Bricolage below 96px.
   - In the 92-page course KDP interior (scratch render): the page count stays 92 (so the spine width holds), 10 pages reflow, and most of those are headings whose one-word second line now fits on the first line.
6. **It is already live.** Other lanes rebuilt seven products between 05:09 and 05:15 using the new `fonts.css`, and those PDFs are already Type 3-free (list below). **Decision for the lead or founder:** accept the tighter small text, or pick option B or C below. Reverting is one command.

---

## Why the optical size cannot be matched exactly

**Chromium applies `opsz` = px size.** Measured in both PDF output and PNG screenshots:

| Text | Variable font | Static opsz 96 | Static opsz = px size |
|---|---|---|---|
| Bricolage 800, 24px | reference | mean pixel diff 12.3 (different) | 0.13 (anti-aliasing only) |
| Bricolage 800, 48px | reference | 33.6 (different) | 0.29 (anti-aliasing only) |
| Nunito 400, 10px | reference | opsz 12: 2.65 (different) | 0.10 (anti-aliasing only) |
| Bricolage 800, 32px, text width | 447.5px | 410.6px | opsz 32: 447.4px |

No product, brand, content or site-concept page sets `font-optical-sizing` or `font-variation-settings`. The survey found `font-optical-sizing: auto; font-variation-settings: normal` on all 5,640,217 brand glyphs. So "Bricolage's opsz as the builds use it" means every px size from 12 to 96. Bricolage 800 alone is drawn at 136 different sizes (5–285px) and Bricolage 700 at 25 sizes (13–64px).

**Width against pin** (whole-string advance, static at the pin vs variable at the size shown):

| Bricolage 700/800 at | 12px | 16px | 20px | 24px | 32px | 40px | 48px | 64px | 96px+ |
|---|---|---|---|---|---|---|---|---|---|
| static opsz 96 is narrower by | 10.3–10.5% | 9.9% | 9.4% | 9.0% | 8.1% | 7.1% | 6.2% | 4.2% | 0 |

| Nunito Sans (any weight) at | 6px | 7px | 8px | 9px | 10px | 11px | 12px+ |
|---|---|---|---|---|---|---|---|
| static opsz 12 is narrower by | 10.5–11.7% | 8.8–9.9% | 7.2–8.1% | 5.5–6.2% | 3.8–4.2% | 1.9–2.2% | 0 |

- **Vertical metrics do not change with opsz.** MVAR varies only x-height, strikeout and underline. So line heights and box heights are unaffected; only widths and letterforms change.
- **Never wider, checked glyph by glyph.** At the pins, every glyph is at most as wide as at any smaller opsz, except five rare marks in Bricolage (‹ › ¨ ˚ ¸) and one Catalan-only middle dot in Nunito.
- **Other pins are worse.** A mid pin such as Bricolage 32 would make every larger heading wider: +8.8% at 96px, which is a cover-overflow and safe-zone risk. A lower Nunito pin would widen all 12px+ body text.

---

## What was made

| File | What it is |
|---|---|
| `brand/fonts/static/*.woff2` (81 files, 1,037,768 bytes) | The static instances. |
| `brand/fonts/static/instances.json` | Records, for every file: source file and its SHA-256, axis location, PostScript name, subset, unicode-range, glyph count and size. |
| `brand/fonts/fonts.css` | **Rewritten.** 81 `@font-face` blocks. Each has one fixed `font-weight` and the original `font-style`, `font-stretch`, `font-display` and `unicode-range`, and points at `static/…`. Family names are unchanged. |
| `brand/fonts/fonts-variable.css` | The previous `fonts.css`, unchanged: the variable faces. **To revert:** `cp brand/fonts/fonts-variable.css brand/fonts/fonts.css`. |
| `brand/fonts/*.woff2` (20 files) | The variable originals, kept and unchanged. `products/merch-core/build/textpath.py` and the logo scripts read them by name. |
| `brand/fonts/make_static.py` | Regenerates the instances, `fonts.css` and `instances.json` in about 20 s. The faces and opsz pins are set at the top. |
| `brand/fonts/survey_usage.js` | Walks every HTML page in `products/`, `brand/`, `content/` and `site-concepts/` in Chromium. It records the family, style, weight and px size of every brand glyph, including `::before`/`::after`. **Exit 1 if a page asks for a weight that has no static face;** otherwise Chromium would silently snap to the nearest weight. Current result: exit 0, 19 of 19 faces covered. |
| `brand/fonts/render_variable.js` | Renders a page exactly as `brand/render.js pdf` does, but serves `fonts-variable.css` in place of `fonts.css`, to make "before" files. Nothing on disk changes. |
| `brand/fonts/compare_pdfs.py` | Before/after checker: font types, per-page pixel diff, ink-box shift, width change and reflow. |
| `ops/TESTS/fonts-static-test.html` | Test page: 116 samples, one per PDF page. |

### Build settings

- **Instancing:** every axis pinned, with `overlap=REMOVE`, so contours are merged, as in Google's static fonts. Tables left: GDEF, GPOS, GSUB, OS/2, cmap, gasp, glyf, head, hhea, hmtx, loca, maxp, name, post and prep. There is no fvar, gvar, HVAR, MVAR, avar or STAT.
- **Names:**
  - IDs 1, 2, 4, 6, 16 and 17 are set explicitly: family "Nunito Sans SemiBold", subfamily "Italic", full name "Nunito Sans SemiBold Italic", PostScript "NunitoSans-SemiBoldItalic", typographic "Nunito Sans" / "SemiBold Italic".
  - ID 3 records the build, for example `Version 3.101;PBP-static;NunitoSans-SemiBoldItalic;opsz=12 wght=600`.
  - The PDFs now name the fonts correctly (for example `Fredoka-SemiBold`), not "FredokaLight-Regular".
  - Copyright and licence records (IDs 0, 13 and 14) are kept.
- **OS/2 and head:** `usWeightClass`, `fsSelection` and `head.macStyle` are set to match.
- **Coverage:** every instance's cmap is identical to its variable source (81 of 81 checked). Glyph coverage and fallback behaviour are exactly as before.

### Exact instances

opsz is pinned at the axis maximum: 12 for Nunito Sans and 96 for Bricolage Grotesque. File names are `static/<family>-<weight>[-italic][-opszN]-<subset>.woff2`, for example `static/nunito-sans-600-italic-opsz12-latin.woff2`.

| Face (CSS family, weight, style) | Axis location | PostScript name | Subset files (one per unicode-range) | Use found by the survey |
|---|---|---|---|---|
| Bricolage Grotesque 700 | wght 700, opsz 96 | `BricolageGrotesque-Bold` | vietnamese, latin-ext, latin | 62,737 glyphs, 111 pages, 13–64px |
| Bricolage Grotesque 800 | wght 800, opsz 96 | `BricolageGrotesque-ExtraBold` | vietnamese, latin-ext, latin | 270,018 glyphs, 258 pages, 5–285px; also receives 900 requests (clamped to 800 before too) and italic requests (synthetic oblique, as before: 11 glyphs, 1 page) |
| Nunito Sans 400 italic | wght 400, opsz 12 | `NunitoSans-Italic` | cyrillic-ext, cyrillic, vietnamese, latin-ext, latin | 22,916 / 40 pages |
| Nunito Sans 500 italic | wght 500, opsz 12 | `NunitoSans-MediumItalic` | same 5 | 1 / 1 |
| Nunito Sans 600 italic | wght 600, opsz 12 | `NunitoSans-SemiBoldItalic` | same 5 | 245 / 7 |
| Nunito Sans 700 italic | wght 700, opsz 12 | `NunitoSans-BoldItalic` | same 5 | 124 / 7 |
| Nunito Sans 800 italic | wght 800, opsz 12 | `NunitoSans-ExtraBoldItalic` | same 5 | 14 / 2 |
| Nunito Sans 400 | wght 400, opsz 12 | `NunitoSans-Regular` | same 5 | 2,385,584 / 236 |
| Nunito Sans 500 | wght 500, opsz 12 | `NunitoSans-Medium` | same 5 | 2,520 / 9 |
| Nunito Sans 600 | wght 600, opsz 12 | `NunitoSans-SemiBold` | same 5 | 684,416 / 135 |
| Nunito Sans 700 | wght 700, opsz 12 | `NunitoSans-Bold` | same 5 | 898,212 / 265 |
| Nunito Sans 800 | wght 800, opsz 12 | `NunitoSans-ExtraBold` | same 5 | 1,008,493 / 283 |
| Nunito Sans 900 | wght 900, opsz 12 | `NunitoSans-Black` | same 5 | 14,059 / 65 |
| Fredoka 400 | wght 400 | `Fredoka-Regular` | hebrew, latin-ext, latin | 28,804 / 7 |
| Fredoka 500 | wght 500 | `Fredoka-Medium` | same 3 | 25,688 / 19 |
| Fredoka 600 | wght 600 | `Fredoka-SemiBold` | same 3 | 217,773 / 149 |
| Fredoka 700 | wght 700 | `Fredoka-Bold` | same 3 | 6,681 / 30; also receives 800 requests (clamped to 700 before too) |
| Caveat 500 | wght 500 | `Caveat-Medium` | cyrillic-ext, cyrillic, latin-ext, latin | none: kept because the old `fonts.css` declared it on its own, so a 400/500 request still lands on 500 |
| Caveat 700 | wght 700 | `Caveat-Bold` | same 4 | 11,921 / 96 |

How the faces were chosen: the Chromium survey (computed styles, 368 pages, 0 failures), cross-checked with a grep of the CSS rules that pair a brand family with a `font-weight`. The grep found no family/weight pair the survey missed. The survey also caught weights that come only from `<em>`, `<b>` or `bolder`. Weights not listed, such as Nunito 300 or Bricolage 400–600, are used nowhere. If a future page uses one, `survey_usage.js` exits 1; add the weight to `FACES` in `make_static.py` and re-run it.

---

## Test page: every family and weight

**Method:**
- Renders:
  - Static: `node brand/render.js pdf ops/TESTS/fonts-static-test.html static.pdf`.
  - Variable: `node brand/fonts/render_variable.js …` (same page, variable CSS).
  - Compare: `python3 brand/fonts/compare_pdfs.py variable.pdf static.pdf --ignore-top 34`, at 150 dpi and again at 300 dpi.
- Each page is labelled:
  - `[exact]`: the size is at or above the pin, or the family has no opsz axis, so the page must be SAME.
  - `[opsz]`: the size is below the pin, so a change is expected and measured.
- One `[exact]` page per face carries a glyph from every subset file, for example "Sofía Ñúñez · Łódź · Tiếng Việt · Привет · Ѣѣ Ҍҍ" for Nunito, and Hebrew for Fredoka.
- `node ops/TESTS/check_fonts.js ops/TESTS/fonts-static-test.html` reports 0 fallback glyphs and 0 load errors.

**SAME** means all of the following:
- at most 0.5% of ink pixels are more than 64/255 outside the other render's 3×3 neighbourhood (checked both ways, so missing or extra ink counts);
- every edge of the ink box is within 1 device pixel;
- the text rows are identical.

The neighbourhood allowance is needed because static fonts store whole-unit advance widths, while Chromium applies the variable fonts' HVAR deltas unrounded. Glyphs therefore sit up to about 0.1 pt apart. At 600 dpi that shows as one-pixel fringes, not as shape changes. The raw per-pixel figure is reported alongside.

| | Result |
|---|---|
| Font types | Static: 294 Type 0, **0 Type 3**; 19 fonts, one per face (list in "Exact instances"). Variable: 315 Type 3. |
| 77 `[exact]` pages | **77 SAME** at 150 and 300 dpi. Max 0.000% of ink outside the neighbourhood; raw diff at most 3.5% (sub-pixel fringes); ink-box edges within 1px; width change at most 0.17%; text rows identical on 77 of 77. Covers every face, every subset file, Bricolage 900→800, Fredoka 800→700 and synthetic Bricolage italic. |
| 39 `[opsz]` pages | **39 CHANGED**, as predicted: 17.7–38% of ink outside the neighbourhood, and no reflow. Bricolage 14px −9.7 to −10.0%, 24px −9.0 to −9.4%, 48px −6.2 to −6.5%. Nunito (all 11 faces) 7px −9.0 to −10.0%, 9px −5.7 to −6.4%, 11px −1.9 to −2.2%. |

---

## One product rebuilt: *The Day the Tablet Slept*

**Method:**
- The product folder was copied to a scratch tree with `brand/` symlinked, so nothing in `products/` was written.
- `node build.js` regenerated HTML byte-identical to the working tree for all seven files: source, both covers, cover, back, mockup and spreads.
- Then every `build_notes` step from `listing.json` was run: interior PDF, KDP cover, IngramSpark cover, `fix-pdf-size.py`, 32 preview pages and 5 PNGs.
- **Baseline:** the same three PDFs rendered with `render_variable.js`.
- **Baseline cross-check:** a separate copy in which `brand/fonts/fonts.css` really was the variable file, rendered with `brand/render.js` and no interception, matched this baseline on 32 of 32 pages.

| File | Fonts, variable → static | Pages SAME | Changed |
|---|---|---|---|
| `picture-tablet-slept.pdf` (32 pp) | 93 Type 3 → 76 Type 0, **0 Type 3** | 26 | 6 (below) |
| `cover-kdp-paperback.pdf` | 17 Type 3 → 10 Type 0, **0 Type 3** | 1 | none. The title is at 96px+ and the other text is Nunito ≥12px, Fredoka and Caveat. |
| `cover-ingramspark-hardcover.pdf` | 17 Type 3 → 10 Type 0, **0 Type 3** | 1 | none |

Static fonts embedded: BricolageGrotesque-ExtraBold, Caveat-Bold, Fredoka-Bold / -Medium / -SemiBold, and NunitoSans-Bold / -ExtraBold / -Italic / -Medium / -Regular / -SemiBold.

**The six changed pages.** Each change is one Bricolage 800 heading below 96px. It gets narrower and keeps its line breaks; left-aligned headings lose width on the right, and centred ones pull in from both sides. All other text on these pages is SAME.

| Page | Heading | Size | Width |
|---|---|---|---|
| p1 | "The Day the / Tablet Slept" | 84px (63 pt) | −1.8% (hard to see) |
| p16 | "WHOOOOSH!" | 64px | −4.3% |
| p29 | "Talk about it" | 56px | −5.8% |
| p30 | "Plan your own Play Day" | 56px | −5.7% |
| p31 | "This book belongs to" | 50px | −6.0% |
| p32 | "More from Play Before Pixels" | 38px | −7.8% (visibly tighter) |

**Other checks:**
- `node ops/TESTS/check_fonts.js picture-tablet-slept`: 7 files, 0 problems.
- The preflight's Liberation Sans ↑/→ fallbacks are not in the current source.
- **Not a clean "no visual change":** the six headings above differ. Nothing overflows, nothing moves toward the trim, and the page count and geometry are unchanged.

## Pagination check: course KDP interior

This was rendered twice from `products/course-screen-reset/paperback/source-kdp.html`: variable and static, into scratch only. The source was unchanged during both renders.

- **92 pages in both.** The spine width (0.2072 in, from the page count) holds.
- 89 of 92 pages differ visually, mostly footers and captions in Nunito below 12px, plus Bricolage headings.
- **Reflow on 10 pages** (5, 9, 10, 15, 17, 35, 39, 55, 73, 83). A word moves up to the line above because the text is narrower:
  - headings "Why talk and play come first" (p15), "Give screens a steady spot" (p17), "Mornings without the scramble" (p35) and "Big feelings when screens end" (p39) now fit on one line instead of leaving a one-word second line;
  - on the other six pages one word moves up in body text, for example "…(say what you / see)" on p5.
- No page gains a line, and text only moves up, so nothing can overflow. Whoever next re-checks that product should still look at those 10 pages.

## Catalogue-wide effect (survey of 368 pages, 5,640,217 brand glyphs)

| Band | Share of glyphs | Change with the static fonts |
|---|---|---|
| Identical: Fredoka, Caveat, Nunito ≥12px, Bricolage ≥96px | 37.2% | none |
| Nunito 11–12px | 17.7% | 0 to −2% |
| Nunito 9–11px | 17.9% | −2 to −6% |
| Nunito 7–9px | 17.9% | −6 to −10% |
| Nunito below 7px | 3.4% | −10 to −12% (this text is already flagged as too small in print-preflight Tier 2) |
| Bricolage below 32px | 4.8% | −8 to −11% |
| Bricolage 32–64px | 1.0% | −4 to −8% |
| Bricolage 64–96px | 0.1% | 0 to −4% |

The smallest print loses the most. The low optical sizes gave very small text wider spacing, so 5–7 pt meta text on cards, the hang tag and the tuck box gets tighter. Raising that text to the preflight's 6 pt / 7 pt minimum (Tier 2) also shrinks the difference.

## Already picked up by other lanes

These PDFs were re-rendered by other workflows between 05:09 and 05:15, after `fonts.css` switched, and now embed **only** Type 0 fonts. HEAD's copies still have Type 3. Each carries the optical-size change above.

- board-up-go-more: board book, talk-along interior and cover
- course-screen-reset: course PDF, Etsy colour letter, KDP interior and KDP cover
- first-phone-plan: all downloads and Etsy files
- guide-100-plays: KDP interior, cover wrap, letter, A4, low-ink and Etsy files
- picture-laps-not-apps: interior, sample wraps and template-variables
- picture-more-talk-less-tap: Talk Tower downloads
- picture-tablet-slept: interior, both covers and PNGs. They match this lane's static rebuild page for page and PNG for PNG (34 PDF pages, 37 PNGs).

If the lead reverts `fonts.css`, those files go back to Type 3 on their next render. They do not change by themselves.

---

## Options for the lead or founder

| | What | Type 3 | Looks like the old renders | Cost |
|---|---|---|---|---|
| **A. Keep as is (recommended)** | Static fonts pinned at opsz 12/96 (current state). | None | Where noted above: small text and sub-96px headings are narrower. | Re-QA products as they are rebuilt anyway, especially the 10 reflowed course pages and small-type cards. Nothing to change in code. |
| B. Exact optical sizes for print | A `brand/render.js` pre-PDF step: read each element's computed family, weight, style and px size; make (and cache) a static instance at opsz = px; point the element at it. **Not built: `render.js` is outside this lane.** | None | Yes, within anti-aliasing | 276 distinct face+opsz instances across the catalogue (169 if Nunito is rounded to 0.25px and Bricolage to 1px), each × its subset files, generated on first use. Moderate complexity, and it only helps renders that go through `render.js`. The guide's `book.js` renders on its own. |
| C. Revert | `cp brand/fonts/fonts-variable.css brand/fonts/fonts.css` | Back in every PDF | Yes | IngramSpark and offset files would again carry Type 3 (rejection risk, UNVERIFIED). Re-render anything built since 05:09 if the old look matters. |

The website also uses `fonts.css`: the `site-concepts/` pages load it. With A, the site uses the static files: more font files per page and no optical sizing on screen. A site build that prefers the variable fonts for screen can link `brand/fonts/fonts-variable.css`; the variable fonts never go into a PDF.

## Other findings (not changed here)

- **Fredoka's latin-ext file has only 22 glyphs** (Ł ł Š š Ž ž Ÿ Á Â ƒ and some marks). It has no ź, ę, ć, ń or ő, so a child's name such as "Łódź" or "Zoë Nováková" in Fredoka falls back to a system font. This was already true of the variable file (the cmaps are identical).
- The fallbacks already listed in print-preflight Tier 2 (arrows and ♡ in DejaVu Sans / Liberation Sans) are unchanged. Those glyphs are in no brand subset. One Liberation Sans glyph still appears in the course KDP interior.
- **Weights outside BRAND.md's ranges:** Fredoka 400 is used on 7 pages (BRAND.md says 500–700) and Nunito Sans 900 on 65 pages (BRAND.md says 400–800). Both are covered by a static face; flagged for whoever owns BRAND.md.
- **Licence:** the fonts are OFL 1.1 with no Reserved Font Names (ORIGINALITY.md D10). The static files are derivatives that keep their copyright and licence name records. `brand/fonts/OFL.txt` is still missing (D10). It was not written here, because the licence text should be copied from the upstream font repositories, not typed from memory.
- **Printer acceptance of Type 0 / TrueType embedding** (what every file now has): standard and expected to pass IngramSpark, KDP, Lulu and offset preflight. **UNVERIFIED:** there was no web access in this session. This removes only G1. G2 (PDF/X, CMYK) and G3 (transparency) still apply to IngramSpark and offset files.

## How to re-run

```
python3 brand/fonts/make_static.py                         # regenerate instances + fonts.css
node brand/fonts/survey_usage.js                           # exit 0 = every used weight has a static face
node brand/render.js pdf ops/TESTS/fonts-static-test.html /tmp/static.pdf
node brand/fonts/render_variable.js ops/TESTS/fonts-static-test.html /tmp/variable.pdf
python3 brand/fonts/compare_pdfs.py /tmp/variable.pdf /tmp/static.pdf --ignore-top 34 --diff-dir /tmp/diff
node ops/TESTS/check_fonts.js ops/TESTS/fonts-static-test.html
```

For a product, render its HTML both ways and run `compare_pdfs.py` without `--ignore-top`. `--diff-dir` writes a PNG per changed page: red means only in the variable render, blue only in the static render.
