# 30 Days of Back-and-Forth: optional founder notes

**Nothing in this file is required.** The program is finished and self-running without it (business/DECISIONS.md, Sept 28, 2026: "keep the course, as long as I don't have to do anything"). Every email, the workbook, the paperback and the sales page already carry finished text written as the brand ("we"), from `NOTES` in `build/content.js`. The build never prints a placeholder, and `sh build/make.sh --final` stops if one ever appears.

These slots exist only in case you ever want to add something personal. If you do, write in your own words; your writing becomes the human-authored part of the program (brand/BRAND.md, "Human authorship"), and git keeps every version.

For every note: no children's names, no employer, no legal matters, no health, speech or development results, and nothing that suggests clinical credentials.

## How to use a slot
Replace the matching `NOTES` text in `build/content.js` with your own, then run `sh build/make.sh --final`. To go back, restore the brand text from git.

## Slot 1. Welcome note (optional)
- **Replaces:** `NOTES.welcome` (60–120 words).
- **Prints:** the welcome email (`emails/day-00-welcome.*`) and the "A note before you start" page of the workbook and paperback.
- **Current brand text** starts: "We made this program for ordinary days…"
- Prompts: Why does this program exist? What does an ordinary good day of play and talk look like? What should a parent know on day 1?

```
_______________________________________________
_______________________________________________
```

## Slot 2. Day 30 goodbye (optional)
- **Replaces:** `NOTES.day30` (40–80 words). Prints only in the Day 30 email.
- **Current brand text** starts: "Thirty days ago you started by noticing one ordinary day…"

```
_______________________________________________
```

## Slot 3. Sales page note (optional)
- **Replaces:** `NOTES.sales`, now `'skip'` (no section prints). 40–80 words if you ever add one.

## Slot 4. Email sign-off (optional)
- **Replaces:** `NOTES.signoff`, now "The Play Before Pixels team".

## Not needed from you
- **Paperback ISBN:** KDP editions use Amazon's free KDP ISBN (business/DECISIONS.md). KDP assigns it; nothing to type in. An ISBN line on the copyright page is optional (`ISBN_PAPERBACK` in `build/workbook.js`, left empty).
- **Barcode area:** the back cover keeps a plain white 2 × 1.2 in area at the lower right; KDP prints its own barcode there (UNVERIFIED: check the position against KDP's cover template before upload).
- **Beta or outreach:** none. There is no founding beta and no direct outreach to families; the program sells only through its listing, the free starter's email sequence and the site.
