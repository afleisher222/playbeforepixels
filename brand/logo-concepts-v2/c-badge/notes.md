# Concept C: The Maker's Seal (`c-badge`)

## The idea, for a parent

It's a round maker's stamp, like the one pressed into the bottom of a good wooden toy: our full name runs around the edge, and a spinning top stands in the middle. The top is one of the oldest toys there is and needs nothing but a child's hand, so the stamp says what we make (things for real play) and that play comes first.

## What's in the folder

| File | Use |
|---|---|
| `symbol.svg` | The seal: ink disc, the name in white capitals, two tomato balls, a sky-blue top with a sun band. Use it for avatars, stickers, book spines and back covers, and merch. |
| `symbol-reverse.svg`, `symbol-black.svg`, `symbol-white.svg` | The seal on ink (paper disc), in one-colour black, and in one-colour white. |
| `symbol-small*.svg` | The small seal: the disc and the top, no words. Use it below 64 px, below 12 mm in print, below 50 mm in embroidery, and in the header lockup. |
| `primary-logo.svg` | Header lockup: the small seal plus the one-line wordmark. |
| `primary-logo-reverse.svg`, `primary-logo-black.svg`, `primary-logo-white.svg` | The header lockup on ink, in black, and in white. |
| `favicon.svg` | The simplified device: the top alone, standing upright, drawn on a 16-px grid. |
| `build.py` | Generates every SVG. Every shaping number is at the top of the file. |
| `tests/` | `make_tests.py` and `raster.js` produce the four PNGs. |
| `test-large.png`, `test-logo.png`, `test-small.png`, `preview-sheet.png` | Blind-test renders and the presentation board. |

Rebuild everything with `python3 build.py && python3 tests/make_tests.py && node tests/raster.js`.

## Construction

- **Seal.** The radius is 500 units.
  - **Lettering.** Bricolage Grotesque 800 at optical size 24, whose capitals are more open and sturdy at small sizes. The cap height is 96. "PLAY BEFORE" stands on a circle of radius 348 and reads clockwise over the top, spanning 149°. "PIXELS" hangs upright from a circle of radius 444 across the bottom, spanning 77°. Letters are spaced at mid-cap radius, so they look even on the curve, and each letter is centred on its own ink. Harfbuzz handles kerning, with +50 units of tracking.
  - **Balls.** The two tomato balls (radius 29) sit in the middle of the two gaps, 108° either side of 12 o'clock.
  - **Clear space.** The lettering is 56 units from the edge and 40 units from the top.
- **Top.** The drawing uses straight lines and a few curves, with no clip art.
  - The painted rim band has vertical sides (w 430, height 104).
  - A cubic shoulder rises to a round-ended peg.
  - Two gently bulging sides (bulge 22) meet in a softened point 450 below the rim.
  - It leans 8°, fills 82% of the free middle, and is centred halfway between its bounding box and its centre of weight.
- **Colour.** Palette only: ink disc, paper lettering, sky top, sun band, paper peg, tomato balls. On ink grounds the disc turns paper and the lettering and peg turn ink.
- **One-colour files.** Each is a single even-odd compound path. Letters, balls and the top are true knockouts, and the band is cut as a stencil stripe that stops short of each edge, so the top never falls into two pieces. They are ready for embroidery digitising, vinyl, rubber stamps and foil.
- **Clean files.** No file contains `<text>`, raster images, transforms, masks or clip paths.
- **Favicon.** The top stands upright on a 16-px grid (1 px = 62.5 units):
  - rim 3 px, from row 6 to row 9, so the sun band lands on whole pixels at 16 and 32 px;
  - peg 2 px wide;
  - body 14 px wide.
  The peg is ink in light tabs and turns white in dark tabs (`prefers-color-scheme`). The favicon is upright while the seal leans, because a tilted band blurs across pixel rows at 16 px. A top at full spin stands straight.
- **Wordmark.** Bricolage Grotesque 800 at optical size 48, tracking −6, with two hand changes:
  - **A straight-tailed y.** Bricolage's own y looks like a u with a hook ("Plau"). The new y is built from Bricolage's v: the right stroke carries on below the baseline at the same slope and is cut level with the p's descender.
  - **A round i-dot.** Bricolage's square i-dot, literally a pixel, becomes a round tomato ball. It is play before pixels in miniature, and it ties the lockup to the tomato ball that already runs through the brand.
- **Minimum sizes.**
  - Seal with words: 64 px on screen, 12.7 mm (0.5 in) in print, where the cap height is 1.2 mm. That is the limit, so test-print a spine before a full run.
  - Embroidered seal: 50 mm or larger (4.8 mm caps).
  - Anything smaller: the small seal.
  - The header lockup works down to about 160 px wide, where the small seal is about 20 px across.

## Why it can't be misread

1. **The words are part of the mark.** Wherever the seal is used at 64 px or more, it carries the full name in plain capitals. There is nothing to decode.
2. **No letter works as a symbol.** The device is a toy, not an initial. The only letters anywhere are the words of the name.
3. **The small device isn't a letter.** At 16 px it is a peg, a band and a cone (see `test-small.png`, light and dark tabs). No Latin letter has that silhouette.
4. **The wordmark was checked letter by letter.** The one ambiguous glyph, Bricolage's u-like y, was redrawn. The i keeps a round dot, so it can't read as an l.
5. **One-colour versions keep the band.** The stencil stripe stops the solid silhouette from reading as a heart, a spade or a shield.

## Risks I see (honest)

1. **Object misreads at 16 px.** Without context, a few people may read the tiny top as a push-pin, a gem or a funnel. It is not a letter, but it is also not a guaranteed "top" at a glance. Test it on five parents with the tab open.
2. **The format is familiar.** A circle of text around an icon is a common badge format, and cheap versions look templated. What is ownable is this particular top, the colour set and the lettering craft, not the format. Protection is narrow, so file the seal as a composite mark with its words, not the top alone.
3. **It could look like an award seal.** A round seal on a picture-book cover can be mistaken for an award medal, which is a consumer-protection issue as well as a misread.
   - Never print the seal in gold or sun yellow, with foil, or with laurels.
   - Keep it on the spine or back cover, in the same place every time, like a publisher's imprint.
   - Never put it where award stickers go: the front cover, upper right.
4. **Primary colours.** The blue top, yellow band and red balls form a primary-toy palette. Ink dominates and the layout is nothing like Google's, but never set the three accents side by side as equal dots or squares (see ORIGINALITY.md D1).
5. **Spinning tops are a common toy-shop icon.** No live search was possible in this session. Before filing, run a reverse-image search, a USPTO design-code search (toys, category 21, and circles with lettering, 26.01; codes to verify), and an attorney knockout search in classes 16, 25, 28 and 41. The top must never gain a face, motion lines or a swoosh.
6. **The seal and the wordmark can't sit side by side.** The name would appear twice. The header therefore uses the small seal (no words), and that rule has to be kept.
7. **Dark-tab favicon.** It relies on `prefers-color-scheme`. Browsers that ignore it show an ink peg on a dark tab, where it nearly disappears, though the banded body still reads as a top. PNG and ICO fallbacks are not made yet.
8. **The font is open to everyone.** The wordmark is Bricolage Grotesque (SIL OFL, which allows logo use), and other brands can use it too. Only the y and the i-ball are ours.

## Founder authorship and protection

- **Make your own edits.** The drawing was generated with AI help. Before any filing, change some of the numbers at the top of `build.py` yourself, rebuild, and commit each version with the date. Good ones to try are `TOP['tilt']`, `TOP['w']`, the band colour in `SCHEMES`, `SEAL['cap']` and `WORD['ball_r']`. Log it in `legal/protection/creation-records-log.md`. Your recorded choices are what make the final drawing provably yours.
- **Nothing has been published.** Everything here is a local, private file. None of the files contains personal information.
