# 52 Play & Talk Cards and Family Talk-Along Cards: founder notes (optional)

Neither deck prints the dashed "FOUNDER'S NOTE · TO BE WRITTEN…" box any more (ops/TESTS/print-fixes.md, 2026-09-28). This file keeps the slots so you can fill them later. Write in your own words: your writing is the human-authored part of the decks (brand/BRAND.md, "Human authorship"), and git keeps every version.

## Founder's note (page 3, "Print, cut and keep")

- **Prints:** on page 3 of every edition, under "Safety basics", as a soft box headed "A note from us". Nothing prints while it is empty.
  - `A`: 52 Play & Talk Cards (`play-talk-cards*.pdf`, `etsy-upload/*`)
  - `B`: Family Talk-Along Cards (`talk-along/*`)
- **Type it in:** `build/build.js`, `const FOUNDER_NOTE = { A: '', B: '' };` (just above `printPage`). Then run `node build/render-all.js`.
- **Length:** 60–90 words each.
- **Rules:** no children's names, no employer, no legal matters, no health or outcome claims.
- Prompts (answer in your own voice; do not copy): Why do these cards exist? How does a family you know use them (no names)? Which is your favorite play (A) or question (B), and why?

```
A (Play & Talk Cards)
_______________________________________________
_______________________________________________

B (Family Talk-Along Cards)
_______________________________________________
_______________________________________________
```

## Tuck box (print-on-demand, later)

- `pod-later/POD-LATER_*_tuck-box.pdf` no longer prints the dashed "Barcode / UPC" box. Add a UPC only if a seller channel requires one, in the spot the chosen card printer's tuck-box template gives.
