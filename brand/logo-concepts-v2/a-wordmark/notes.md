# Concept A: "play before pixels." (the name is the logo)

Design draft, September 28, 2026. Everything here is rebuilt from `build.py` (SVGs) and `render.js` (PNGs).

## The idea, for a parent

Our logo is simply our name, written in plain lowercase letters. The dot on the i is a ball held up in the air, and the full stop is one small square pixel, so in our name the ball always comes before the pixel.

The symbol for the browser tab and the social avatar takes those same two dots and puts the ball in front of the pixel: "before" in both senses, first in the sentence and in front of the screen.

## Construction

- **Letters.** Bricolage Grotesque, the brand's own SIL-OFL font. It is instanced from `brand/fonts/bricolage-a24454f0.woff2` at weight 760 and optical size 36 with fontTools, shaped with HarfBuzz and written out as outlines. There are no `<text>` elements, no system fonts and no images inside any SVG. Everything is lowercase: letter spacing is +14/1000, the word space is 196 (the font's own is 214) and ten pairs are spaced by hand (`KERN` in `build.py`).
- **The ball.** The i uses the font's dotless i. Its dot is replaced by a tomato ball with a radius of 102 units; the font's own dot is about 84. The ball sits 80 units above the stem, against the font's usual 48, so it looks tossed up rather than printed on. That extra air is the pause a grown-up leaves for a child's turn.
- **The pixel.** The full stop is a single ink square, 138 units on a side (the stems are 150), set 52 units after the s on the baseline.
- **Stacked version.** `play / before / pixels.`, ranged left, with 980 units from baseline to baseline. The ball lands in the space between "before" and "pixels".
- **Small cut** (`*-small*.svg`). This uses Bricolage's own small optical size (14) with more air: tracking 30, word space 226, ball gap 104 and pixel gap 88. Use it on book spines, labels and anything under about 1 in (25 mm) wide, so the gaps don't fill in with ink.
- **Symbol.** It uses the same two dots at the same size ratio: the square is 0.68 of the ball's diameter, as in the wordmark. The ball sits lower left and in front, and the pixel sits upper right and behind. A ring of air (4.7% of the symbol's width) is cut into the pixel so the two shapes stay separate in one colour. The ring is a true arc, so the file is clean paths with no masks.
- **Favicon.** This is a separate cut drawn on the 16 px grid. The pixel is 8 × 8 on whole pixels, so its edges stay crisp. The ball is 11 px, and the ring is 0.9 px. The pixel is drawn a little larger than in the symbol so it still reads as a square at 16 px. It is ink in light tabs and white in dark tabs, switched by `prefers-color-scheme` inside the SVG.
- **Colours.** Ink #1D2940 and tomato #EE5A36. The avatar uses sun tint #FEF4D8. One colour means all black or all white, and reversed means white letters with a tomato ball on ink. The colours are flat, with no gradients or shadows.

### Files

| File | Use |
|---|---|
| `primary-logo.svg` | Site header and default use (one line, ink and tomato) |
| `primary-logo-black.svg` / `-white.svg` | One colour |
| `primary-logo-reverse.svg` | On ink (the file includes its ink ground) |
| `logo-stacked*.svg` | Square-ish spaces: tote, cover corner, stickers, the footer |
| `*-small*.svg` | Under about 1 in (25 mm) wide: book spines, labels, fine print |
| `symbol.svg`, `-black`, `-reverse` | Stickers and pattern use |
| `symbol-avatar.svg` | 1080 px social avatar (square file, safe inside a round crop) |
| `favicon.svg` | Browser tab (light and dark aware) |

### Minimum sizes

- The one-line logo should be at least 160 px wide on screen or 1.5 in (38 mm) in print. Below that, switch to the small cut, which holds down to 1 in (25 mm).
- The stacked logo should be at least 0.5 in (13 mm) tall, using the small cut.
- The symbol works from 16 px; use `favicon.svg` below 48 px.
- **Embroidery.** At 110 mm wide, the stacked logo's smallest gap (the full stop) is 1.8 mm and the ball's gap is 2.8 mm, both above the usual 1.5 mm limit. Keep the embroidered symbol at least 40 mm wide so its ring stays about 1.9 mm.

## Why it cannot be misread

1. **The primary logo is the whole name in plain lowercase.** Every letter is the font's own shape. None is opened, merged, joined or replaced, so there is nothing to mistake for another letter. The only two changes are to the punctuation marks: the dot of the i is still a round dot, just bigger and higher, and the full stop is still a full stop, just square. I checked the logo at 1600 px, 300 px and 160 px, at 0.5 in on a spine, and in black, white and reversed, and it reads "play before pixels." every time.
2. **The symbol has no letters in it.** A circle and a square can't be read as a P, an r, or any other letter.
3. **Why not initials:** each option fails for a different reason.
   - "PB" reads as PBS (on our list of neighbours to avoid), as "peanut butter" (a nut-allergy word in classrooms), and as Pb, the symbol for lead.
   - "PP" is banned by our own rules (the Planned Parenthood neighbour).
   - "BP" means an oil company or blood pressure.
   - "pbp" is built from b and p, the exact mirror-image pair that early readers mix up.
4. **Why not the ball alone:**
   - At 16 px, a lone red-orange dot looks like Chrome's own "this tab is recording" dot.
   - On its own it also comes close to Headspace's orange-dot logo.
   - The square is what makes our dot a symbol rather than a status light.

## What the blind-test renders show (my own read)

- **`test-large.png`:** an orange ball in front of a navy square, with nothing letter-like about it. The most likely description is "a ball and a box". It could also be read as abstract "shapes", or at a stretch as "a sun in front of a building".
- **`test-small.png`:** at a true 16 px the ball is 11 px and the square is 8 px, and both survive in light and dark tabs; the ring between them is about one pixel. At 32 px it is crisp. At true size it reads as "orange dot with a dark (or white) square behind it". It is recognisable, but it is two small shapes rather than one bold one (see risks).
- **`test-logo.png`:** clean and even. The y's hook, the notched f and the ball are the details you notice. The square full stop reads as a full stop.
- **`preview-sheet.png`:** the stacked version is the strongest lockup. The ball sitting between "before" and "pixels" is the moment people will remember. The small cut at 0.5 in on the spines is still readable.

## Risks, honestly

1. **The symbol is simple geometry.** Circle-and-square compositions are common, and on their own they are hard to protect. The symbol is only distinctive together with the wordmark and through consistent use. It could be read as "a ball and a block", which sits close to the toy-block look our rules steer away from. It is one flat square with no studs, so I rate that risk low to moderate.
2. **At 16 px the favicon is two shapes, not one bold silhouette.** It is recognisable, but less punchy in a crowded tab bar than a heavy single mark.
3. **The letters are an open font that anyone can use.** Protection rests on the whole design: this lowercase setting, the lifted tomato ball and the square full stop. File the wordmark as a design mark, never the symbol alone.
4. **A coloured dot on an i is a familiar device.** It also faintly echoes Pixar's lamp-as-i, though ours is a plain ball. The square full stop is what makes the pair ours, but below about 24 px tall it reads as an ordinary full stop.
5. **The full stop turns the name into a statement.** Some will call a brand with a full stop "trendy". In running text the name is always written "Play Before Pixels", without the full stop.
6. **Bricolage's y is cup-shaped with a short hook.** At very small sizes "play" could flicker toward "plau". That is why the small cut and the minimum sizes above exist; at every size I rendered, it read as "play".
7. **The palette sits near Patreon's.** Patreon paired a coral circle with a navy bar; we pair a tomato circle with a navy square. The shapes and layout differ, so the risk is low, but check side by side before filing.
8. **Checks not done yet:**
   - a reverse-image search (Google Lens or TinEye);
   - a USPTO design-code search (circles 26.01, squares 26.09) in classes 9, 16, 25, 28, 35 and 41;
   - a WIPO Global Brand Database search;
   - an attorney knockout search.

   This note screens for design risk. It is not trademark clearance.

## Founder authorship (please read)

These drawings were made with AI help, so on their own they get thin copyright protection. Before anything is filed or printed, make your own dated changes to the numbers at the top of `build.py`. Good candidates are:

- the ball's size (`BALL_R`) or how high it floats (`BALL_GAP`);
- the pixel's size (`PIXEL_S`);
- the weight (`FONT_WGHT`);
- the symbol's layout (`SYM_*`).

Rebuild with `python3 build.py && node render.js`. Write one line per change in `EDIT_LOG` and keep every version in git, so your choices are on record.
