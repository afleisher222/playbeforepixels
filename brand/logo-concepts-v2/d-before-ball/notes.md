# Concept D: the ball in "before"

This is a design draft from September 28, 2026. `build.py` writes every SVG, test page and PNG in this folder. To rebuild, run `python3 build.py`.

## The idea, for a parent

Our name is written out in full: play, before, pixels. In "before", the o is a real ball, so the toy sits inside the name, right in the middle, before the pixels.

## What you get

| File | Use |
|---|---|
| `primary-logo.svg` | **The logo.** Stacked `play / before / pixels`, ink and tomato, for white and light grounds. |
| `primary-logo-reverse.svg` | For ink grounds. The file includes its own ink background. White letters, tomato ball. |
| `primary-logo-black.svg`, `primary-logo-white.svg` | One colour. The seam is cut out, so any ground shows through it. |
| `primary-logo-small*.svg` | The small cut: letters spaced wider and a thicker seam. Use it for site headers under 64 px tall, book spines, labels and embroidery. |
| `primary-logo-oneline*.svg` | Secondary. For long, thin spaces such as email footers or a ribbon banner. |
| `symbol.svg`, `symbol-black.svg`, `symbol-reverse.svg` | The ball on its own, for stickers, patterns and thin spines. |
| `symbol-avatar.svg` | 1080 px social avatar: the ball on sun tint, safe inside a round crop. |
| `favicon.svg` | Browser tab. The seam is painted white, so the icon looks the same in light and dark tabs. |
| `test-large.png`, `test-logo.png`, `test-small.png`, `preview-sheet.png` | Blind-test renders and the presentation board. |
| `tests/favicon-options.png` | The favicon options I rejected, rendered the same way as the chosen one. |

## Construction

- **Letters.** The name is set in Bricolage Grotesque, the brand's own SIL-OFL font. `build.py` instances it from `brand/fonts/bricolage-a24454f0.woff2` at weight 760 and optical size 96, shapes it with HarfBuzz and writes it as outlines.
  - There are no `<text>` elements, no system fonts and no images inside any SVG.
  - I tried 800, 740 and 680. At 760 the letters stay bold and friendly but sit a shade lighter than the ball, so the ball reads as a solid object in the word rather than a heavy letter.
- **Stacked, ranged left.** The baselines are 960 units apart, and the tracking is −4.
  - The stems of p, b and p line up down the left edge.
  - The ball sits near the optical centre of the block.
  - Reading top to bottom gives the order the name promises: play comes first and pixels last.
- **The ball.**
  - **Size.** It is a true circle 1.06 times the height of the font's o, and it sits 10 units low so it rests its weight on the baseline. That makes it slightly bigger than a letter, the way an object is.
  - **Spacing.** It is solved optically rather than guessed. The script measures the real outlines and places the ball so its clear distance to the f is the font's own f–o gap plus 16 units, and its distance to the r is the font's o–r gap minus 6. That comes to 47 and 50 units.
- **The seam.** One curved band is cut out of the ball.
  - It is built from exact circular arcs, with no masks, so the file is clean for printing, die-cutting and embroidery.
  - The seam circle's centre sits 1.2 ball radii away at 210°, and its radius is 1.15 ball radii, so the seam passes close to the middle of the ball.
  - Its width is 0.125 of the radius in the logo, 0.17 in the small cut and 0.21 in the favicon.
  - One seam says "ball". Two start to say tennis ball, and four say basketball.
- **The square dot.** The dot of the i in "pixels" is redrawn as a true square, one pixel: 1.06 × the stem width, lifted 16 units.
  - So a round ball sits in "before" and a square pixel in "pixels", and the name tells its order twice. It is a quiet second read, and nobody needs to notice it.
  - To go back to the font's own dot, set `PIXEL_DOT['on'] = False`.
- **Colours.**
  - Full colour: ink #1D2940 letters and a tomato #EE5A36 ball.
  - Reversed: paper letters and a tomato ball on ink.
  - One colour: all black or all white.
  - The avatar ground is sun tint #FEF4D8. All fills are flat.

### Stacked or one line?

I set both, plus an all-caps `PLAY / BEFORE / PIXELS`, and **chose stacked lowercase**.

- **Stacked lowercase** makes a compact, nearly square block (1.07 : 1).
  - The ball lands in the centre instead of trailing in a sentence.
  - The same file works in a header (56 px tall, shown on the board), on an avatar, a tote and a book spine.
- **The one-line version** reads well, and in a very short bar (under about 48 px tall) it gives bigger letters than the stack, so use it there. As a mark, though, it is a long, thin strip with the ball lost in the middle of a sentence.
- **Caps** looked like a poster headline. That is colder than a parents' brand should be, and the capital O made the ball so big it started to compete with the words.

### The favicon, and why

The favicon is **the seamed ball on its own**, filling the tab square, with a white seam 1.6 px wide at 16 px (`tests/favicon-options.png`). The other options failed:

- **The stacked name shrunk to 16 px** turns into three grey bars with an orange dot. That reads as a "menu with a notification badge", which is a misread. The ink letters also vanish in dark tabs.
- **A plain ball** is a red-orange status dot. Chrome's own "this tab is recording" dot looks like that.
- **The seam** is the one detail that turns a dot into a ball. At 16 px it still shows as a white curve, in both light and dark tabs, and it is not a letter.

### Sizes

- **Stacked logo.** Use the master cut from 64 px tall or 1.25 in (32 mm) wide. Below that, use the small cut, which holds down to 0.5 in (12.7 mm) tall.
  - At 0.5 in tall the block is 14 mm wide and its x-height is 2.4 mm.
  - The seam is 0.23 mm and the f–ball gap is 0.30 mm. Both hold in POD and offset print.
  - A board-book spine needs to be at least 0.75 in wide to carry it.
  - Thinner spines (picture books) take the ball alone, as shown on the board.
- **Embroidery.** Use the small cut at **100 mm (4 in) wide or more**. At that size the seam is 1.64 mm, the f–ball gap is 2.13 mm and the ball is 19 mm. Below about 90 mm the seam falls under the usual 1.5 mm limit.
- **Symbol.** Works from 16 px. Below 48 px, use `favicon.svg`, which has the thicker seam.

## Why it cannot be misread

1. **Every letter is still the font's own letter.** Nothing is opened, merged or cut into another shape. The only changes are two:
   - The o is a filled circle, which is still the shape of an o.
   - The i's dot is square, which is still a dot. It is a little wider than the stem and set higher than the font's dot, so it never reads as a broken stem or an l.
2. **The ball can only be an o.**
   - It is as tall as the lowercase letters and sits on the baseline, so it is not a full stop, which is a third of its size.
   - It is not a zero, because it is round, not oval, and too short to be a figure.
   - It is not a bullet, which is small and floats at mid-height.
   - It sits in the one place where "bef_re" can only be completed as "before".
3. **The seam makes it a ball, not a dot.** At every size where the seam is visible, the shape reads as a ball. Where it is too small to see (a 10 px header ball), it still reads as the o.
4. **No monogram, no initials.** The logo is the whole name, so there is no single letter to mistake for r, P, b or anything else.
5. **The symbol has no letter in it.** A circle with one curved seam has no letter-like opening, stem or bowl.

## What the blind-test renders show (my own read)

- **`test-large.png`.** A red-orange ball with one white seam. The likeliest description is "a ball" (someone might say tennis ball or playground ball). At a stretch it could be read as a planet or a moon. I see no letter.
- **`test-logo.png`.** It reads "play before pixels" at a glance. The ball registers as the o first and as a ball a beat later, which is the intended order. The square i-dot is visible but quiet.
- **`test-small.png`.** At a true 16 px it is a tomato disc with a clear white curve, in light and dark tabs alike. At 32 px it is crisp. At 1:1 it is small but distinct, and it looks like no letter and no status dot.
- **`preview-sheet.png`.**
  - The 56 px header logo is readable.
  - Reversed and black hold up.
  - The 24 px avatar is still a ball.
  - The spine logo is legible at 0.5 in.
  - The tote shows the reversed small cut.

## Risks (honest)

- **The symbol alone is a generic idea.** "A ball with a seam" is common icon vocabulary, so the symbol by itself is weak as a trademark. The wordmark carries the ownership, and the ball gets its meaning by always appearing as the o. Don't use the ball as the only brand mark for the first year.
- **Sports reading.** It might read as a tennis ball or basketball, especially in one colour, where the seam could suggest a basketball line.
  - Keep the ball tomato and the seam single.
  - Nearest neighbours to watch: Dribbble (a pink basketball with several seams) and any sports-ball icon set. I know of no children's brand with this exact construction, but that is **UNVERIFIED**: no live trademark search was run.
- **Traffic sign.** A red disc with a white *straight* bar is a no-entry sign. The seam must stay clearly curved and off-axis, so don't flatten `curve` above about 1.6.
- **Ball on sky.** Tomato on sky blue (the blue spine) is lower in contrast than tomato on white or ink. Prefer paper, sun tint or ink grounds for the full-colour logo.
- **Trend.** A heavy lowercase grotesque stacked in three lines is a current look. The Bricolage details (the y, the ink traps), the ball and the square dot are what keep it from looking templated, so don't swap the font.
- **Tight spots.**
  - The f's crossbar comes nearest the ball (47 units). At tiny sizes in the master cut they can visually kiss, which is why the small cut exists.
  - The square dot's top sits about 33 units above the top of the font's own dot (it is lifted 16 and slightly bigger), so it is the highest point of the line. Don't lift it further.
- **Seam direction in motion.** If the ball is ever animated (rolling), rotate the seam. Never add a second one.

## Editing

All the dials are at the top of `build.py`: weight, tracking, leading, ball size and position, the seam, the square dot, and the favicon and avatar sizes. Change a number, run `python3 build.py`, look at the four PNGs, and add a dated line to `EDIT_LOG`. The build prints the smallest gaps (f–ball, ball–r, line to line), so an edit that makes shapes touch shows up at once.
