# Play Before Pixels logo: notes

Final kit: `brand/logo/`. Rules for using it: `logo-guidelines.pdf` (its source is `logo-guidelines.html`). Every file is rebuilt from `src/build.py` and `src/guide.py`, and the PNGs from `src/raster.js`.

## The idea (for the About page)

Our mark is the P of Play: its square-cut stem curves into an open bowl, and a ball comes back to close it, like the serve and return of talk and play, where a grown-up says something and a child answers. The small gap before the ball is the pause that gives the child a turn, and the same ball dots the i in Pixels, because play comes first.

## Why this concept won

Judges' totals were: Concept 2 "Rounding Out" 22, Concept 1 "The Return" 21.5, Concept 3 17, Concept 4 15 and Concept 5 13.5.

The founder's own instruction was "make sure we have a unique logo" and "not copying anyone else's". That instruction outranks the scoring script, so I chose Concept 1. The two leaders were only 0.5 apart. Concept 1 had the highest uniqueness score (7 of 10). Concept 2 scored 5 on uniqueness for three reasons:

- A circle with one square corner is the standard chat-bubble shape used across Google's messaging icons.
- The brand name already pairs two Google product words ("Play" and "Pixel").
- At 16 px, Concept 2's small cut loses its shine and becomes a plain bubble.

## What was grafted in from the judges and other concepts

- **Wider gaps.** The ball is 80 units instead of 84, so both gaps are about 49 of 660 units (1.9 mm when the mark is 1 in tall). This leaves more room around the ball and embroiders more safely.
- **A new small cut.** `mark-small*.svg` has a heavier stem and bowl and 60-unit gaps, for 16–31 px and for embroidery 16–25 mm tall. The concept's favicon cut had narrower gaps than the master mark.
- **Dark-tab favicon.** `favicon.svg` turns the P white in dark mode. The PNG and ICO fallbacks sit on a sun-tint tile, so the P never disappears in a dark browser tab.
- **"P Play" fix.** The horizontal lockup now sets the mark as tall as two lines of the name, so it reads as a symbol rather than a letter in front of "Play". The one-line wordmark sets the mark's P into "Play" itself. The guidelines ban placing the mark in front of the one-line wordmark.
- **The gap has a meaning.** From Concept 3: the gap is "the pause that gives the child a turn".
- **The ball is the brand device.** It serves as bullets, page numbers, stickers, and the period in the tagline on the link-preview image.
- **Sticker version.** From Concept 4: `mark-sticker.svg`, a white die-cut version for photos, busy grounds and merch.
- **Binding rules against lookalikes.**
  - Keep the ball small and inside the letter, never a big circle beside the stem (Patreon).
  - Never put a white P in a tomato circle (Product Hunt).
  - Never use a two-P or big-P/little-p monogram (Planned Parenthood).
  - Never swap the ball for a pixel, heart or icon.
  - Avatar: ink mark on sun tint.
- **Small-size QA.** From Concept 5: every cut was checked at 16 px for misreadings, and in dark-mode tabs.

## Residual similarity risk (honest)

**Overall: moderate-low.** The judges and designers found no kids, parenting or education brand using this construction: an open P with a round terminal, a ball on the bowl's centre line closing the letter, and the same ball dotting the i. The building blocks, though, are common, so what can be protected is the combination, not any single idea.

1. **Patreon (nearest well-known neighbour; verify).** Patreon's circle-and-bar mark, as remembered by the judges, used a coral circle with a navy bar. Our mark also has an ink vertical stroke and a tomato circle. The P bowl dominates, and the ball stays small and inside the letter, which is now a rule. This could not be checked against Patreon's current mark in this session: the web-search budget was used up and the proxy blocked the logo sites. Do a side-by-side check before filing.
2. **Single-letter P marks are a crowded field.** Product Hunt, Pinterest, PBS, Poki and many others use one. At 16 px our icon is "a P with a dot", so protection for the bare icon is narrow. File the mark together with the wordmark.
3. **"Letter P + ball" stock templates** exist, mostly pickleball logos on Adobe Stock and Vecteezy. They share the general idea, not this drawing.
4. **A ball as the dot on the i** is a common wordmark device. It faintly echoes Pixar's lamp-for-i ("Pix-"). The risk is low because ours is a plain tomato dot with no stripe or star.
5. **Wordmark font.** The letters are outlines of Bricolage Grotesque 800, an open-source font under the SIL Open Font License, which allows use in logos. Other brands can use the same typeface. What makes the wordmark ours is the custom P and the ball.
6. **Outside the logo: tagline and copy.** Osmo (Tangible Play) uses "Play Beyond The Screen". Keep our copy clearly different from that phrase. "Talk, touch and play come first." was not searched in this session.
7. **Checks not done yet:** a reverse-image search (Google Lens, TinEye), a USPTO design-code search (letters and circles: 27.03 and 26.01, in classes 9, 16, 25, 28, 35 and 41), a WIPO Global Brand Database image search, and an attorney knockout search. None of these have been done. This note is a design-risk screen, not trademark clearance.

## Founder authorship (binding, see BRAND.md)

AI-generated drawings get weak copyright protection. Trademark rights come from use, not from who drew the mark. Before filing, the founder should make and date her own edits to the numbers at the top of `src/build.py` (for example ball size `rb`, terminal angle `end` or stroke weights), rebuild, and keep every version in git. Also record the change in `legal/protection/creation-records-log.md`.
