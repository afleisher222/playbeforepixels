# The Day the Tablet Slept: founder notes (optional)

The interior and covers no longer print "FOUNDER WRITES THIS PAGE" boxes or ISBN/barcode labels (ops/TESTS/print-fixes.md, 2026-09-28). This file keeps the slots you can fill later, and where each one goes. Write in your own words: your writing is the human-authored part of the book (brand/BRAND.md, "Human authorship"), and git keeps every version.

Every text slot below is a section of `WORDS.md`. Type under the heading, then rebuild with the commands in `listing.json` → `files.build_notes`.

For every note: no children's names, no employer, no legal matters, no health claims, and nothing that suggests clinical credentials.

## 1. Byline (`## author`, optional)

- **Prints:** title page (p1) and the front cover, e.g. "Words by …". Empty prints only "A Play Before Pixels read-aloud", which is the brand byline to keep until counsel answers REVENUE-PLAN Q9.

## 2. Dedication (`## dedication`)

- **Prints:** p3, centered above the rocket art. While it is empty, p3 prints a short brand dedication (“For every grown-up who has ever said, ‘Okay. One more story.’”, set in `build.js`), so the page is never blank. Anything you write replaces it.
- **Grown-up tips:** each spread now has a one-line tip in a white band (`## s1 tip` … `## s12 tip` in `WORDS.md`, added by the quality pass). They are drafts; rewrite or delete any of them.
- **Length:** 1–3 short lines.
- Prompt: Who is this book for? (A group or a feeling works as well as a person: "For every grown-up who…".)

```
_______________________________________________
```

## 3. A note from the author (`## note`)

- **Prints:** p31, under the heading "A note from the author". While it is empty, p31 prints "This book belongs to" with a write-on line instead.
- **Length:** 60–120 words. Keep it about play, reading and family time.
- Prompts: Why did you write this story? What do you hope a family does after the last page?

```
A note from the author
_______________________________________________
_______________________________________________
_______________________________________________
```

## 4. ISBNs (`## isbn-paperback`, `## isbn-hardcover`)

- **Prints:** p2 (copyright page) as plain text lines. Nothing prints while both are empty.

## 5. Barcode area (covers)

- `cover-kdp-paperback.pdf` and `cover-ingramspark-hardcover.pdf` keep a plain white 2 × 1.2 in area on the back cover, with no label or outline.
- KDP prints its own barcode there (UNVERIFIED: check the spot against KDP's cover template). IngramSpark: move the area to where its Cover Template Generator puts the barcode, and place the real barcode for your own ISBN (ops/TESTS/print-preflight.md, "Placeholder covers").
