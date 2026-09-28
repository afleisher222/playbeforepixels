# Concept v2-B: "Floor Time"

*Play Before Pixels, a trade name of AlphaPlay LLC. Logo concept drafted September 28, 2026. This is a design draft, not trademark clearance.*

## The idea (for a parent)

A grown-up and a little one sit on the floor, face to face, with a ball between them. That's the whole brand: put the screen down, get down on the floor, and play together.

## What's in the folder

| File | What it is |
|---|---|
| `primary-logo.svg` | Symbol + one-line name, for the site header (full colour) |
| `primary-logo-black.svg` | One colour, black |
| `primary-logo-reverse.svg` | Full colour on an ink ground (the grown-up turns white) |
| `primary-logo-white.svg` | One colour, white, transparent ground (extra) |
| `symbol.svg` (+ `-black`, `-white`, `-reverse`) | The picture alone: avatars, stickers, spines |
| `symbol-small.svg` | Small cut with bigger heads, wider gaps and no eyes. Use it below 12 mm tall and for embroidery under 25 mm. |
| `favicon.svg` | Drawn on the 16 px grid. The grown-up turns white in dark browser tabs. |
| `src/stacked-logo*.svg`, `src/avatar-1080.svg`, `src/apple-touch-180.svg` | Extras: stacked logo (tote, square formats), avatar and app tile |
| `test-large.png`, `test-logo.png`, `test-small.png`, `preview-sheet.png` | Blind-test renders and the presentation board |
| `build.py`, `render.js`, `jobs.json`, `tests/` | Source. Run `python3 build.py && node render.js jobs.json` to rebuild everything. |

## Construction

- **Only circles and quarter circles.** Each figure is a round head over a quarter-circle body. The rounded back faces outward and the flat front faces the other person. The ball is a plain circle sitting on the shared floor line, in the gap between the two flat fronts.
- **Numbers.** Units run from the floor (y = 0) up.
  - Grown-up: body radius 344, head radius 122.
  - Child: body radius 216 (5/8 of the grown-up's), head radius 100. A toddler's head is big for its body, so the heads differ much less than the bodies.
  - Ball: radius 74, about 3/4 of the child's head.
  - Gap between the fronts: 212. That leaves 32 units of air on each side of the ball.
  - Neck gaps: 24 (grown-up) and 22 (child).
- **How the heads lean.** Each head sits on a circle drawn around its own body's centre. It is pushed slightly toward the gap (`A_BACK`, `C_BACK`), so both figures lean in over the ball.
- **One eye each.** The figures are in profile, and each eye sits on the side facing the other person, so they look at each other across the ball. The eyes are true holes in the heads, so they work on any ground, in one colour and in embroidery.
- **Soft corners.** Only the shoulder corner (top front of each body) is rounded (radius 18). Everything that touches the floor stays square.
- **Wordmark.** "Play Before Pixels" is set in Bricolage Grotesque at weight 740 and optical size 30. It is instanced from the brand's own woff2 and converted to outlines. The outlines are hand-modified in `build.py`:
  1. Every letter corner is softened with a radius of 18, the same idea as the figures' shoulders.
  2. Corners that stand on the baseline stay square, so the letters sit flat on the same floor as the people.
  3. The y of "Play" keeps 80% of its descender, so the name sits tight on its baseline.
  4. The spacing is hand-tuned: tracking −6, word spaces −40, and pair kerns for Pl, ay, Be and Pi.
- **Lockup.** The symbol is 1.85 cap heights tall. Its floor sits exactly on the text baseline, so the people and the letters share one floor. The gap between symbol and name is 0.5 cap height.
- **Clear space and size.**
  - Clear space is one ball diameter on every side.
  - Minimum size: 24 px tall on screen and 10 mm tall in print for the primary logo. Below that, use the symbol or the small cut.
- **Favicon.** The favicon is not a scaled-down master. It is redrawn on the 16 × 16 pixel grid (`FAVICON` in `build.py`) so that every straight edge and every circle lands on whole pixels:
  - grown-up body 7 px, child body 4 px
  - heads 5 px and 4 px
  - ball 3 px, with 1 px of air on each side

  It stays crisp at 16 px, and at 32 px on retina screens.
- **Colours.** Grown-up in ink, child in sky, ball in tomato; the avatar ground is sun tint. The reverse makes the grown-up paper-white. There are no gradients, shadows, `<text>` or raster images anywhere.

## Why it can't be misread

- **No letter at all.** No part is a letterform. The founder's objection to the old mark ("looks like the letter r") can't come back.
- **Instant for a toddler.** A small child reads it at a glance: "big person, little person, ball". Faces and balls are among the first things children recognise.
- **Survives 16 px.** At 16 px the three parts stay separate: a 5 px head, a 4 px head and a 3 px tomato ball, with whole-pixel gaps. The dark-tab version keeps the grown-up visible by turning it white (see `test-small.png`).
- **No other image lives in the shapes.** The ball touches nothing and sits on the floor, so it reads as a ball, not a sun. The heads are clearly apart from the bodies, and the bodies face each other. That rules out a face (two dots over a mouth), a letter m or u, bowling pins and the chess-pawn look.
- **Positive imagery only.** There are no screens, no crossed-out devices, no hands, no puzzle pieces, no rainbow, and none of the motifs BRAND.md bans (blocks, pinwheels, tin cans and the rest).

## Risks I see (honest)

1. **The "people" genre is crowded.**
   - Any figure pictogram sits near UI "group" icons and nonprofit or family-service marks.
   - Big Brothers Big Sisters used a purple "Big and Little" pair of stick figures until its 2019 rebrand. It now uses a green "B" ([Brand New](https://www.underconsideration.com/brandnew/archives/new_logo_and_identity_for_big_brothers_big_sisters_by_barkley.php), [NPQ](https://nonprofitquarterly.org/a-big-rebrand-at-big-brothers-big-sisters-takes-on-an-old-cultural-image/)).
   - What is ownable here is the specific drawing: quarter-circle bodies facing each other, profile eyes, and the ball in the gap. That is a combination, not the idea "adult + child".
2. **No image search was done.**
   - I ran two text web searches and found no adult-child-ball kids brand. Text search can't find look-alike pictures.
   - Before any filing or print run, an attorney should run a USPTO design-code search and a knockout search: human figures, balls and geometric shapes, in classes 9, 16, 25, 28, 35 and 41.
   - Also run a reverse-image search (Google Lens, TinEye).
   - Near neighbours to check side by side: Fisher-Price Little People (round head on a peg body; ours has no pegs) and pediatric or charity "parent and child" marks.
3. **Warm, but not a jolt.** The mark is calm, which suits the Lovevery benchmark, but it is less startling than a clever letter mark. Some judges may call it "illustrative" rather than "iconic".
4. **The eyes vanish below about 40 px.** They are a large-size detail. The favicon and small cut drop them on purpose, so the smallest versions read as "two figures and a ball", not "two faces".
5. **Embroidery.** The eye holes are about 3.3 mm (grown-up) and 2.5 mm (child) when the symbol is 2.5 in wide. Ask the embroiderer to confirm them, or use `symbol-small.svg` (no eyes) under 25 mm.
6. **Weak contrast between sky and sun.** The full-colour symbol on a sun (yellow) ground has low contrast between the sky child and the ground. On sun or sky grounds, use the white or ink one-colour symbol, as the spine mock does.
7. **The wordmark font is open source.** Bricolage Grotesque (SIL OFL) is free for anyone to use; the OFL allows logo use. Only our modifications are ours: soft corners, square floor corners, the short y and the spacing. Don't distribute the instanced `src/*.ttf` outside the business.
8. **No human blind test yet.** The blind-test PNGs are ready. Show `test-large.png` and `test-small.png` to 10 parents who have never seen the brand, and ask "What do you see?" before any decision.

## Protecting the founder (authorship and ownership)

- **Make your own dated edits.** AI-drafted artwork gets weak copyright protection. Before adopting this concept, the founder should make her own edits to the numbers at the top of `build.py` and record each one in `EDIT_LOG`, with the date, what changed and why. Keep every version in git.
  - Numbers worth changing: head sizes, how far the heads lean, ball size, softening radius, wordmark weight.
  - Also note each change in `legal/protection/creation-records-log.md`.
- **Trademark rights come from use.** File the mark together with the name, not the bare symbol, after clearance.
- **Nothing personal is in the logo or these notes.** The figures carry no gender, skin tone or likeness of any real person; they stay ink, sky and white. The logo, file metadata and notes contain no personal details.
