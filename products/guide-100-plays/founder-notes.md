# 100 Screen-Free Plays: founder notes (optional)

The customer files no longer print any placeholder (ops/TESTS/print-fixes.md, 2026-09-28). This file keeps the slots you can fill later, and where each one goes. Write in your own words: your writing is the human-authored part of the book (brand/BRAND.md, "Human authorship"), and git keeps every version as proof.

For every note: no children's names, no employer, no legal matters, no health or outcome claims, and nothing that suggests clinical credentials.

## 1. Paperback ISBN (copyright page)

- **Prints:** copyright page (p2) of `guide-100-plays-kdp-interior.pdf` and `guide-100-plays.pdf`, as a plain line "ISBN 978-…". Nothing prints while it is empty.
- **Type it in:** `build/book.js`, `const ISBN_PAPERBACK = '';` near the top. Then run `sh build/make.sh`.
- **When:** after KDP assigns its free ISBN, or after you buy one (Bowker). The line is optional on KDP (UNVERIFIED; check at upload). Decide first which ISBN route the business uses: `commerce/storefront-setup-guide.md` Part C says owned ISBNs only, while `listing.json` says "free KDP ISBN or your own" (ops/PRE-MORTEM.md flags the conflict).

## 2. Barcode area (back cover)

- The back cover of `guide-100-plays-cover-wrap.pdf` keeps a plain white 2 × 1.2 in area at the lower right, 0.5 in from the spine and the bottom trim, with no label or outline.
- KDP prints its own barcode there when you use KDP's barcode (UNVERIFIED: check the position against KDP's cover template before upload). With your own ISBN, place the real barcode in that area.

## 3. "A note before you start" (p4 of every edition)

- This page already prints a short draft note signed "Play Before Pixels" (it is marked `data-founder="rewrite"` in `build/book.js`, `notePage()`).
- **Optional:** replace the draft with your own words, 80–140 words, in `notePage()`. Keep the signature "Play Before Pixels" unless counsel's answer to REVENUE-PLAN Q9 says otherwise.
- Prompts (answer in your own voice; do not copy): What kind of day is this book for? What do you want a tired grown-up to feel after reading this page? What is the one thing you hope they try first?

```
A note before you start
_______________________________________________
_______________________________________________
_______________________________________________
Play Before Pixels
```

## Quality pass drafts (September 28, 2026)

Three new lines are drafts for you to rewrite in your own words (they carry `data-founder="rewrite"` in `build/book.js`): the dedication at the top of the copyright page (p2), the closing page text ("That's a play day.", last page) and the notes-page prompts. See `QUALITY-PASS.md`.
