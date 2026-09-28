# Play Before Pixels logo: notes (v2, "The Maker's Seal")

**Status (September 28, 2026): ADOPTED** (business/DECISIONS.md; `ADOPTED = True` in `src/build.py`). On the founder's instruction the review panel's two fixes were applied: the top's band is tomato `#EE5A36` and the top stands upright (`TILT = 0`). Two items remain open and do not block use: the founder may still make and log her own dated edits (see "Founder authorship" below), and the parent blind check (below) and an attorney's clearance come before any filing.

Rules for using the logo are in `logo-guidelines.pdf` (its source is `logo-guidelines.html`). Every file here is rebuilt from the numbers at the top of `src/build.py` with one command: `bash brand/logo/src/rebuild.sh`. The previous kit, "The Return", is archived intact in `brand/logo-archive/v1-the-return/`. The founder rejected it on September 28, 2026 because it read as the letter r.

## The idea (for the About page)

Our logo is a maker's seal, like the stamp pressed into the bottom of a good wooden toy, with our name around the edge and a spinning top in the middle. A top is one of the oldest toys there is and needs nothing but a child's hand, which is the whole idea: play comes first.

## What is in the kit

| Files | What it is |
|---|---|
| `mark.svg` (+ `-reverse`, `-black`, `-white`) | **The seal.** An ink disc, the name in paper capitals around the ring, two tomato balls, and a sky-blue top with a painted band. Use it from 80 px or 16 mm up. |
| `mark-small.svg` (+ 3 versions) | **The small seal.** The disc and the top, with no words. Use it below 80 px or 16 mm, and in the lockups. |
| `mark-sticker.svg` | The seal with a white die-cut border, for photos and busy grounds. |
| `lockup-horizontal*.svg` | **The default.** The small seal plus the one-line name. |
| `lockup-stacked*.svg` | The small seal above "Play / Before / Pixels", for square spaces. |
| `wordmark*.svg`, `wordmark-small*.svg` | The name alone. The small cut is for anything under 25 mm wide. |
| `favicon.svg`, `favicon.ico`, `png/favicon-16/32/48.png`, `png/apple-touch-icon-180.png` | The top alone, upright, drawn on a 16-pixel grid. |
| `png/`, `social-avatar-1080.png`, `og-image-1200x630.png` | The same PNG set as v1, re-rendered. |
| `blind-test/` | `test-small.png` (tab view), `test-large.png`, `test-logo.png`, and `tab.html`: open it in a browser and the real tab shows the icon under a neutral title. |
| `process/` | Dated sheets of the options that were considered, for the authorship record. `src/snapshot.py` adds one after each edit and never overwrites an old one. |

## Why it cannot be misread

1. **The name is part of the mark.** Wherever the seal is used (80 px or 16 mm and up), the full name is spelled out in plain capitals, so there is nothing to decode. Below that size, the small seal always sits next to the name in a lockup, or the account name sits beside it in a profile.
2. **No letter works as a symbol.** v1 failed because its symbol was a letter, a P that read as r. Nothing in v2 is built from a letter. The device is a toy, and the only letters anywhere are the words of the name.
3. **What the blind tests found.** The review panel's blind reads of concept C's test renders (`test-large`, `test-logo`, `test-small` in `brand/logo-concepts-v2/c-badge/`) turned up only object readings, and each one has a fix:

   | Reading reported | Fix in this kit |
   |---|---|
   | Ukraine and Sweden flags; IKEA and Walmart (blue top with a yellow band) | Band changed to tomato. **Done (September 28, 2026).** |
   | "Wobbling", "toppling", "crashing UFO", "lopsided, melting" (the 8° lean) | Lean set to 0. **Done (September 28, 2026).** |
   | Pin, gem, cone, radish, "soft ice-cream" | Rounder, taller shoulder; firmer cone; longer peg. Done. |
   | A grey smudge at 16 px (the rounded peg sat on a half pixel) | Square peg on whole pixels. Done. |
   | Dreidel risk | Rules added: round shoulders, no flat faces, never faceted or four-sided, nothing drawn on the body. |

   **None of the readings reported to this build named a letter.** UNVERIFIED: the panel's full transcripts are not in the repository, so this relies on the panel's summary. Those reads were also made by AI reviewers, not people. The human check (below) has not been done yet.
4. **The wordmark was checked letter by letter.** Bricolage's own y reads as a u ("Plau"), so it was redrawn as a straight-tailed y built from the font's own v. The i keeps a round tomato ball instead of the font's square dot, so it cannot read as an l.
5. **The small device is not a letter.** At 16 px it is a peg, a band and a point (`blind-test/test-small.png`). No Latin letter has that silhouette.
6. **The guidelines lock this in.** Never open up or separate the ring lettering, never use initials (PB, BP, PP, pbp), never put a letter on the top, and never set the seal beside the wordmark.

**Blind check before adoption (required).**
- Show `blind-test/test-small.png`, or `blind-test/tab.html` open in a real browser, to 5–10 parents who have never seen the brand. Ask "what is this?"
- Adopt only if most say "spinning top" or "toy" and **nobody names a letter**.
- Run it after the founder's edits, so the parents see the final drawing.
- Write down each answer word for word, with the date.

## What changed from concept C

Changes made in this build (AI-made, logged in `EDIT_LOG`):
- **Favicon.** Square tomato peg (`M437.5 312.5V62.5H562.5V312.5Z`), 2 px wide, top on row 1. The colours are fixed: tomato is 3.4:1 on a white tab and 4.7:1 on a dark (#202124) tab, and sky is 3.8:1 and 4.3:1. There is no light/dark switch, because one static file never disappears and every browser sees the same drawing. Favicon shape: dome 187.5 (3 whole px), bulge 6. The band still lands on rows 6–9, and the build checks this on every run. The 16/32/48/180 PNGs and a 16/32/48 `.ico` are new.
- **Seal top.** Dome 165 → 200, neck 86 → 70, bulge 22 → 10, peg 210 → 240.
- **Ring spacing.** Two ring pairs opened slightly (L–A +80, X–E +32 font units). On the curve, L's foot touched A's foot and X touched E. Every letter gap is now at least 9.4 units, which is 0.15 mm at 16 mm.
- **Seal minimum.** Raised to 80 px / 16 mm (1.54 mm capitals). Anything smaller uses the small seal.
- **Grafted from the other concepts:**
  - From A: the small-cut wordmark (optical size 14, tracking +30, word space 226) and the "no initials" rule.
  - From D: the gap report after every rebuild, a dated sheet of rejected options, and the stacked layout (without D's ball-for-o).
  - Kept from C: the straight-tailed y and the one-colour files as single even-odd paths with a stencil band.
  - From B: its "Floor Time" scene (a grown-up and a child with a ball) belongs in the illustration system (About page, workshop kits, "why" sections), never as a mark. It is not part of this kit.

The panel's fixes 1 and 2 are applied: `BAND` is tomato and `TILT` is 0 (EDIT_LOG, September 28, 2026). The kit, the guidelines and every PNG show the fixed drawing.

## Residual similarity risk (honest)

**Overall: moderate-low** now that the band is tomato and the top is upright. No search tool could reach the USPTO or image-search services in this session, so every item below is a design-risk screen, not clearance.

1. **The badge format is common.** A ring of text around an icon is a stock badge layout, so what can be protected is this drawing with its words, not the format. Stock logo shops sell spinning-top logos aimed at daycares, kindergartens and toy shops: BrandCrowd's "Colorful Spinning Top" and "Fast Spinning Top", and Branition's "Spinning Top". Their listings turned up in a web search. UNVERIFIED: I did not view the images, so any resemblance is unchecked. Compare them side by side before filing.
2. **Tops in toy trademarks.** A top is close to descriptive for class 28 toys, so never file the bare top. UNVERIFIED: no USPTO search was run. Design category 21 covers games, toys and sporting articles, but the exact section code for tops could not be confirmed, because the USPTO design-code site is blocked here.
3. **Blue, yellow and red; flags; stores.** While the band is sun yellow, the top is blue over yellow (the Ukraine and Sweden flags, IKEA, Walmart's colours) and, with the tomato balls, forms the blue/yellow/red "Google triad" that ORIGINALITY.md D1 warns about. The tomato band (applied September 28, 2026) removes this.
4. **Award-medal confusion.** A round seal on a book cover can pass for an award medal, which is a consumer-protection problem as well as a misreading. Rules: never gold, foil or sun yellow; no laurels; spine or back cover only; never upper right on a front cover.
5. **Dreidel.** A top with a peg is related to the dreidel, a four-sided top with Hebrew letters that is tied to Hanukkah. The round, faceless, letter-free body keeps it clearly a generic toy top. The rules forbid faceted or four-sided drawing and anything drawn on the body.
6. **Colour contrast inside the top.** Tomato and sky have almost the same lightness (1.1:1), so a tomato band separates from the body by hue alone. In greyscale printing the band disappears, so use the one-colour files, which cut the band as a stencil. UNVERIFIED: this has not been checked in a colour-blindness simulator. Do that after the band edit.
7. **The font is shared.** The lettering is Bricolage Grotesque (SIL Open Font License, which allows logo use), and anyone can use it. Only the redrawn y, the i-ball and the drawing are ours.
8. **Checks still to do before filing or printing in bulk:**
   - a reverse-image search (Google Lens, TinEye) of `mark.svg`, `mark-small.svg` and `favicon.svg`;
   - a USPTO design-code search (toys and tops; circles with lettering, 26.01) in classes 9, 16, 25, 28, 35 and 41;
   - an attorney's knockout search.

## Founder authorship and protection (binding; see BRAND.md, "Human authorship")

The drawing was generated with AI help (Claude). In the U.S., AI-generated material is not protected by copyright, so the founder's own recorded choices are what make the final drawing hers. Trademark rights come from use and filing, not from who drew the mark. Both matter.

- **The two panel edits are done** (`BAND` tomato, `TILT` 0), applied on your instruction on September 28, 2026 and logged in `EDIT_LOG`. To change either, edit the value in `src/build.py`, run `bash brand/logo/src/rebuild.sh`, look at `blind-test/test-small.png` and the guidelines, then run `python3 brand/logo/src/snapshot.py`.
- **Optionally, make at least one choice of your own**, for example `SEAL['cap']` (ring lettering size), `TOP['w']` (how wide the top is) or `WORD['ball_r']` (the ball on the i). Rebuild and check the gap report the build prints, so nothing touches.
- **Log every change the same day, in two places:**
  - a dated line in `EDIT_LOG` at the top of `src/build.py` (what changed, from → to, and why);
  - the same line in `legal/protection/creation-records-log.md`, section B (work ID W-LOGO-02, already registered in sections A and D).

  Commit each version on its own, with the dated snapshot sheet. Make the edits on a business device and account, never an employer's.
- **Filing** (only after the blind check and an attorney's clearance):
  - applicant: AlphaPlay LLC (per `legal/ENTITY.md`), with an attorney as correspondent;
  - file the seal with its words as a composite mark, plus "Play Before Pixels" as a standard-character wordmark;
  - never file the bare top.
- **Privacy.** No personal name appears in any SVG `<title>`, aria-label or metadata, or in the PNGs or PDF; the only words are the brand name. Keep it that way: the build writes only "Play Before Pixels" into files. Nothing here has been published. Everything is a private file in this repository.
