# Quality pass: Up! Go! More! (board book and square paperback; held)

**September 28, 2026. Internal file.** This pass measured the book against the generic craft qualities that premium talk-along books for babies and toddlers share. Those books are a benchmark only. Nothing was copied: no layouts, characters, phrases, trade dress, series structure or page designs. The page system (one big word, one picture, a cue pill and a grown-up tip card) is the genre convention already cleared in ORIGINALITY D6.

**Pages checked:** I rendered and looked at all 26 board-book pages, all 32 paperback pages and the paperback cover wrap, before and after the changes.

## Scores (1–10)

| Craft quality | Before | After | Page-level problems found, and what changed |
|---|---|---|---|
| One clear focal image per page, white space | 9 | 9 | Every word page has one word, one scene on a circle and one card. No change. |
| Large, legible type, consistent typography | 8 | 9 | The words are huge and clear. The grown-up tip was 12.5 px on the 600 px page grid (about 9 pt on the 6 in board page), with a 9 px label. Both are now larger (13.4 px and 9.6 px), and every card still fits on all 22 pages. |
| Clean, consistent illustration | 7 | 8 | **"uh-oh" (board p13, paperback p15):** the blue triangle block was tilted so it read as a video play button, the wrong icon for this brand. It is now almost upright and reads as a triangle. The cast (glasses, hearing aid, varied skin and hair) stays consistent across pages. |
| Durable-looking, warm cover | 8 | 8 | The front is strong: sun-yellow, a big title, the count "22", the tip badge and the 0–3 age circle. The back cover changes are counted under finishing. |
| Short grown-up tip on every spread | 9 | 9 | There is a tip on every page. They are specific ("Count to five in your head"), under 24 words and never judgmental. No change. |
| Read-aloud rhythm (repetition, pauses) | 8 | 8 | The say/sign/act cues and the waits ("Ready, set… go!") carry the turn-taking. |
| Inclusive, varied families | 8 | 8 | Five child looks and five grown-up looks, including a grandparent with glasses and a toddler with a hearing aid. Still to do (founder's list): a child who signs or uses a talker as a main character in Books 2–3. |
| Strong "how to use this book" page | 8 | 8 | Four steps, with the device and sign line and the home-language line. It is dense, but readable. |
| Satisfying ending | 8 | 8 | The board book ends on night-night; the paperback ends on "The end. Night-night, book. Read it again tomorrow?" |
| Premium finishing details | 5 | 7 | **Added:** a dedication at the top of the paperback copyright page (a draft for the founder), and "A gift for / With love from" lines on the paperback title page. The back cover now has an "Ages 0–3" pill with "Read together · 22 words · a tip on every page", and the publisher line "Published by Play Before Pixels / AlphaPlay LLC". KDP paperbacks cannot have endpapers. |
| Consistent series look | 8 | 8 | The Talk-Along Firsts pill, the numbered mini covers and the navy logo band are consistent. The round badge now also appears on the 100 Plays cover. |
| **Average** | **7.8** | **8.2** | |

## Retail-shelf readiness

| Check | Status |
|---|---|
| Standard trim | Board book 6 × 6 in; paperback 8.5 × 8.5 in. Both are standard sizes. |
| Spine readable from 6 ft | **Not possible.** The 32-page paperback spine is about 0.07 in, and KDP allows no spine text under 79 pages [VERIFY]. A board book's spine depends on the board caliper of an offset run. |
| Back cover | Promise ("Made for laps and back-and-forth."), an "Ages 0–3" pill, a short description, the series strip, a blank 2 × 1.2 in barcode area and the publisher line. |
| BISAC and age range in `listing.json` | `bisac` was already present (3 codes, [VERIFY]). Added `age_range` (0–3, Preschool; paper edition read together). |
| Series trade dress | The Talk-Along Firsts pill, numbered mini covers and navy logo band, on all three planned books. |

**What a big-box retailer would still require that we cannot do now** (full plan in `business/sections/04-retail-target-walmart.md`, sections 4.1, 4.4, 4.5 and 4.6; not repeated here):
- **A real board book.** That means an offset print run with third-party CPSIA testing and a Children's Product Certificate, held by a 3PL, never the founder. This is the in-store candidate in section 4.6, and it is gated on paperback demand.
- **Owned ISBNs.** The free KDP ISBN can only be used on Amazon (UNVERIFIED). A retail edition needs its own ISBN.
- **Distribution** through a full-service book distributor or wholesaler, such as Ingram.
- **A retail price that survives the discount.** At a 1,000-copy run, section 4.4 shows wholesale losing money on a $12.99 book, so the chain line needs a separate retail edition.
- **Sell-through history.** None yet; the book is held.

## What cannot reach premium level without outside spending

- **Human illustration**, which buyers expect on a shelf board book. Section 4.1 plans $1,500–$5,000 per board book.
- **The board-book print run itself**: offset printing, safety testing, a CPC and 3PL storage. The paperback is only a demand test.
- **A handshape check by a fluent signer.** The sign descriptions are still [VERIFY] in `human_todo`, and drawn handshapes need a paid reviewer.
- **A printed proof** of the navy night-night and end pages, to check the ink on print-on-demand paper.

## Rebuilt and checked

- `bash build/render-all.sh`: the board PDF (26 pages), the paperback interior (32 pages, 8.625 × 8.75 in) and the cover wrap (17.3251 × 8.75 in, unchanged), plus the previews, `cover.png` and `mockup.png`.
- `node ops/TESTS/check_fonts.js board-up-go-more`: 7 files, 0 problems.
- PyMuPDF scan: 0 Type 3 fonts and 0 placeholder strings.
- `python3 ops/TESTS/check_listings.py`: 0 FAIL, 0 WARN.
- Founder draft to rewrite: the paperback dedication (`founder-notes.md`).
