# Up! Go! More!: founder notes

The board book and the talk-along paperback no longer print "[FOUNDER: your name or pen name]", "ISBN [ … ]", "Printed in [country]", "Batch [tracking no.]", the "Founder: rewrite this page…" label or the "ISBN / BARCODE · Leave white…" label (ops/TESTS/print-fixes.md, 2026-09-28). This file keeps the slots, and where each one goes. Every value lives in `build/manuscript.json`; rebuild with `bash build/render-all.sh`. Write in your own words (brand/BRAND.md, "Human authorship"); git keeps every version.

## 1. Byline (`author_credit`)

- **Prints:** paperback title page, copyright page, the signature under the note to grown-ups, and the board book's p25 legal line.
- Empty prints **"Play Before Pixels"**, the brand byline to keep until counsel answers REVENUE-PLAN Q9 (ops/PRE-MORTEM.md risk 6).
- **Gate (unchanged):** `PRINT_READY=1 node build/build.js` still refuses to run while `author_credit` is empty. To approve the brand byline, set `"author_credit": "Play Before Pixels"`.

## 2. Note for grown-ups (`note_to_grownups`)

- **Prints:** paperback p3. The current text is a draft; the page no longer carries a "rewrite this" label or dashed frame.
- **Gate (unchanged):** a print-ready build refuses to run until `note_to_grownups.founder_rewritten` is `true`, and likewise for every word entry.
- Prompts (answer in your own voice; do not copy): What is this book for? What should a grown-up not worry about? What is the one thing to try on every page?

```
A note for grown-ups
_______________________________________________
_______________________________________________
_______________________________________________
```

## 3. Printer lines (`print_lines`, new optional object)

Add this object to `manuscript.json` when the values exist. Each key prints only when it is filled:

```json
"print_lines": { "isbn_board": "", "isbn_paperback": "", "printed_in": "", "batch": "" }
```

- `isbn_board`, `printed_in`, `batch`: the board book's p25 legal line ("ISBN … · Printed in … · Batch …").
- `isbn_paperback`: the paperback copyright page (p2).
- **Needed before any offset board-book run:** "Printed in …" and a batch/tracking number. A children's product needs a tracking label (CPSIA; UNVERIFIED — confirm with the printer and counsel). The build prints a NOTE on every run until both are filled.

## 4. Barcode areas

- The board book's back cover (p26) and the paperback cover wrap keep a plain white 2 × 1.2 in area, with no label or outline.
- KDP prints its own barcode on the paperback (UNVERIFIED: the builder places the area 0.25 in from the spine and bottom trim; check KDP's cover template). The offset board-book printer or your own ISBN supplies the board book's barcode.
