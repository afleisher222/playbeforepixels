# Quality pass: The Day the Tablet Slept (picture book; held)

**September 28, 2026. Internal file.** This pass measured the book against the generic craft qualities of premium read-aloud picture books and talk-along books. They are a benchmark only; nothing was copied.

**Pages checked:** I rendered and looked at all 32 interior pages, the KDP paperback wrap and the front cover, before and after the changes.

## Scores (1–10)

| Craft quality | Before | After | Page-level problems found, and what changed |
|---|---|---|---|
| One clear focal image per page, white space | 8 | 8 | Each page has one clear scene, with the words in open sky or wall space. |
| Large, legible type, consistent typography | 8 | 8 | Story text is Fredoka, with colored refrain and sound words. **p12:** the handwritten "tip tip" footprints were tomato on green, so hard to read. They are now white and slightly larger. |
| Clean, consistent illustration | 7 | 7 | Ada, Papa, Tater and the tablet are consistent throughout. **p10:** the rainbow arc is fine as scenery (the ban applies to marks only). The art is code-drawn, so the ceiling is limited (see below). |
| Durable-looking, warm cover | 8 | 8 | A bold title, the box-rocket hero and the sleeping-tablet joke. The back cover now adds the publisher line under "Picture book · Ages 3–7". |
| Short grown-up tip on every spread | 4 | 8 | Before, tips appeared only on the "Talk about it" page (p29). **Added:** one short tip per spread (12 in all) in a separate white "Grown-up tip" band, never in the story text (customer-voice rule 16). Each tip is practical and specific: pause before "CRASH!", say what you see, offer a choice, count down slowly, whisper the last lines. Where a tip would cover the art, it sits in open space instead: bottom-left on p10, top-right on p14, beside the shelf on p22, and on the right page for the last spread (p27). The tips live in `WORDS.md` (`## s1 tip` … `## s12 tip`) so the founder can rewrite them. |
| Read-aloud rhythm (repetition, pauses) | 9 | 9 | The refrain "Shhh… the tablet is sleeping. So what shall we do?" repeats, and there are shoutable sounds (CRASH!, WOOF!) and a fill-in pause. |
| Inclusive, varied families | 7 | 7 | Papa is the everyday grown-up, and Ms. Rosa wears glasses. Still to do (founder's list): a child who signs or uses a talker, in the next book. |
| Strong "how to use this book" page | 7 | 8 | "Talk about it" (p29) and "Plan your own Play Day" (p30) were already there. The per-spread tips now show grown-ups how to read it, page by page. |
| Satisfying ending | 9 | 9 | Everyone sleeps, then there is a morning callback and "The End". |
| Premium finishing details | 6 | 8 | **p3** printed as a blank art-only page until the founder writes a dedication. It now prints a short brand dedication ("For every grown-up who has ever said, 'Okay. One more story.'"), which her own words replace. **p31** "This book belongs to" now has an "A gift from" line too. The p32 pattern page works as a back endpaper. |
| Consistent series look | 7 | 7 | The logo is bottom-left on the front, the same corner as the other books. A larger logo was tried, but it collided with the rocket smoke, so the size stays. |
| **Average** | **7.3** | **7.9** | |

**Originality fix:** ORIGINALITY B5's change from "a dog in boots" to "a dog in a raincoat" had not been applied. It is now in `WORDS.md` (s10), and the spread stays under 40 words.

## Retail-shelf readiness

| Check | Status |
|---|---|
| Standard trim | 8.5 × 8.5 in, a standard square picture-book trim. |
| Spine readable from 6 ft | **Not possible.** 32 pages give a 0.0751 in paperback spine, and KDP allows no spine text under 79 pages [VERIFY]. The held IngramSpark case-laminate hardcover would allow a spine title (UNVERIFIED). |
| Back cover | Promise (the refrain as a headline), a short description, "Picture book · Ages 3–7", the publisher line "Play Before Pixels / AlphaPlay LLC" and a blank 2 × 1.2 in barcode area. |
| BISAC and age range in `listing.json` | `bisac` was already present (4 codes). Added `age_range` (3–7, Preschool–2). |
| Series trade dress | Logo in the same corner; same palette and cast system as the line. |

**What a big-box retailer would still require that we cannot do now** (see `business/sections/04-retail-target-walmart.md` sections 4.1–4.6):
- **Owned ISBNs.** The free KDP ISBN can only be used on Amazon (UNVERIFIED). The hardcover needs its own ISBN.
- **Ingram or distributor distribution.** The IngramSpark hardcover is HELD.
- **A price that supports a wholesale discount.** At $11.99 and about $3.24 print cost (KDP estimate in `listing.json`), a 55% trade discount leaves about $2.16 (UNVERIFIED).
- **Sell-through history.** None; the book is held under the age hold.

## What cannot reach premium level without outside spending

- **Human illustration.** Retail picture books compete on art. Code-drawn flat SVG caps expression, texture and composition.
- **A hardcover with printed endpapers.** That needs IngramSpark setup, an owned ISBN and proofs (UNVERIFIED whether printed endsheets are offered).
- **A paid editor or read-aloud review** of the story and the 12 new tips. The customer panel in `panel.md` is simulated.
- **Printed proofs** to check the dark space and night spreads and the white tip bands on print-on-demand paper.

## Rebuilt and checked

- `listing.json` → `files.build_notes` (node build.js, pages, PDF, both cover PDFs, `fix-pdf-size.py`, `cover.png`, `mockup.png`, back and wrap previews).
- 32 interior pages at 8.625 × 8.75 in. The KDP wrap is 17.3251 × 8.75 in (unchanged).
- `node ops/TESTS/check_fonts.js picture-tablet-slept`: 7 files, 0 problems.
- PyMuPDF scan: 0 Type 3 fonts and 0 placeholder strings.
- `python3 ops/TESTS/check_listings.py`: 0 FAIL, 0 WARN.
- Founder drafts to rewrite: the default dedication and the 12 tips (`founder-notes.md`, `WORDS.md`).
