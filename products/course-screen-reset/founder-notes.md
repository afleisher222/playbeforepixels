# 30 Days of Back-and-Forth: founder notes (optional)

The workbook, the KDP paperback, the cover and the sales page no longer print any placeholder (ops/TESTS/print-fixes.md, 2026-09-28). This file keeps the slots you can fill later, and where each one goes. Write in your own words: your writing is the human-authored part of the program (brand/BRAND.md, "Human authorship"), and git keeps every version.

For every note: no children's names, no employer, no legal matters, no health, speech or development results, and nothing that suggests clinical credentials.

All text slots live in `build/content.js`, in the `FOUNDER` object. After editing, run `sh build/make.sh` (or `sh build/make.sh --final` before anything goes live).

## 1. Welcome note (workbook p3, paperback p4)

- **Prints:** on the "Your month at a glance" page, above the map, in all four workbook PDFs (`downloads/2`–`5`), `course-screen-reset.pdf` and the KDP interior. While it is empty, the page prints only the map and its kicker reads "Before you start".
- **Type it in:** `FOUNDER.welcomeNote`, 60–120 words.
- **Also used by:** the welcome email (`emails/`), which still shows a "FOUNDER WRITES THIS" box until this is filled. `make.sh --final` refuses to finish while that box remains, so the emails cannot go out with it.
- Prompts: Why did you make this program? What does an ordinary good day of play and talk look like? What do you want a parent to know on day 1?

```
_______________________________________________
_______________________________________________
_______________________________________________
```

## 2. Day 30 goodbye (email only)

- `FOUNDER.day30Note`, 40–80 words. It prints only in the Day 30 email; the email gate above applies.

## 3. Sales page note (optional)

- **Prints:** a "A note from us" section on `sales-page.html`. Nothing prints while it is empty (or set to `'skip'`).
- **Type it in:** `FOUNDER.salesNote`, 40–80 words. No reviews here until after the founding beta, with written permission, and never about speech, development or behavior results.

## 4. Email sign-off

- `FOUNDER.signoff`. Empty means "The Play Before Pixels team".

## 5. Paperback ISBN (copyright page)

- **Prints:** p2 of `paperback/course-screen-reset-kdp-interior.pdf`, as a plain line "ISBN 978-…". Nothing prints while it is empty.
- **Type it in:** `build/workbook.js`, `const ISBN_PAPERBACK = '';` near the top.
- The line is optional on KDP (UNVERIFIED). Settle the ISBN route first (owned vs KDP free; see ops/PRE-MORTEM.md).

## 6. Barcode area (back cover)

- `paperback/course-screen-reset-kdp-cover.pdf` keeps a plain white 2 × 1.2 in area at the lower right of the back cover, with no label or outline. KDP prints its own barcode there (UNVERIFIED: check the position against KDP's cover template before upload).
