# Laps Not Apps (personalized): founder notes

The sample interior and cover wraps no longer print the byline, ISBN, "printer / manufacturing lines" or "Founder writes this" placeholders, or the "ISBN / barcode" label (ops/TESTS/print-fixes.md, 2026-09-28). This file keeps the slots you can fill later, and where each one goes. Write in your own words: your writing is the human-authored part of the book (brand/BRAND.md, "Human authorship"), and git keeps every version.

Every text slot below is a section of `WORDS.md`. Type under the heading, then rebuild with the commands in `listing.json` → `files.build_notes`.

For every note: no children's names (other than the order's own personalization), no employer, no legal matters, no health claims.

## 1. Byline (`## author`, optional)

- **Prints:** title page (interior p1), e.g. "Words by …". Empty prints "A Play Before Pixels read-aloud", the brand byline to keep until counsel answers REVENUE-PLAN Q9.

## 2. A note from the author (`## author note`) — needed before real orders

- **Prints:** interior p32, above "More from Play Before Pixels", under the kicker "A note from the author". While it is empty, the sample prints no note and p32 starts with "More from Play Before Pixels".
- **Gate (unchanged):** `node build.js --order …` still refuses to build a real customer's book while this section is empty or any section is marked `(draft)` (the HUMAN-AUTHORSHIP GATE in `build.js`).
- **Length:** 40–80 words, about reading, laps and family time.
- Prompts: Why did you make this book? What moment on a lap do you hope a family has with it?

```
A note from the author
_______________________________________________
_______________________________________________
```

## 3. ISBN (optional `## isbn` section)

- A one-reader personalized edition normally carries no ISBN (UNVERIFIED for Lulu). If you ever need one, add a `## isbn` section to `WORDS.md`; it prints as a plain line on the copyright page (p2).

## 4. Printer / manufacturing lines

- The draft line "Printer / manufacturing lines — to be supplied" is gone. If Lulu or a children's-product rule needs a "Printed in …" or batch/tracking line in the book, add it to the copyright page in `build.js` (the `// I2 Copyright page` block) once the printer confirms the wording (UNVERIFIED).

## 5. Barcode area (cover wraps)

- The back cover keeps a plain white 2 × 1.2 in area, 0.55 in from the right and bottom edges, with no label or outline. Match it to Lulu's cover template once the cover-dimensions API gives the real size (`ORDER-TO-PRINT.md`); without an ISBN, check whether Lulu needs the area at all (UNVERIFIED).
