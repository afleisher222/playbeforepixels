# Quality pass: Whose Lap Today? (personalized; held from sale)

**September 28, 2026. Internal file.** This pass measured the book against the generic craft qualities of premium read-aloud and talk-along books. They are a benchmark only; nothing was copied. The folder slug stays `picture-laps-not-apps`, but the book title is *Whose Lap Today?* (ORIGINALITY B7).

**Pages checked:** I rendered and looked at all 34 sample pages (the front cover, 32 interior pages and the back cover). I also built all three example orders (the sample, a long name, and Abuela). All exit 0, and the long-name closing page fits.

## Scores (1–10)

| Craft quality | Before | After | Page-level problems found, and what changed |
|---|---|---|---|
| One clear focal image per page, white space | 8 | 8 | Each rhyme has one clear lap scene. **p20** ("a park full of laps") still shows small, distant figures. That is a composition limit of the art and is left alone. |
| Large, legible type, consistent typography | 7 | 7 | The rhymes are large and centered. The "Lap talk" tips are 11.5 pt, which is fine. The lap-games and safety pages (p29–p30) are dense but readable. |
| Clean, consistent illustration | 7 | 7 | The family (Dad, Grandma with her wheelchair, big brother) and the child look are consistent. The art is code-drawn. |
| Durable-looking, warm cover | 8 | 8 | Sun-yellow, the child's name on the cover, Grandma's lap. The back cover changes are counted under finishing. |
| Short grown-up tip on every spread | 8 | 8 | There is a "Lap talk" tip on every spread, and they are specific: count to five, offer a choice, the fill-in song. |
| Read-aloud rhythm (repetition, pauses) | 8 | 8 | Rhyming quatrains, the child's name as a refrain and the "stop before QUACK!" pause. |
| Inclusive, varied families | 9 | 9 | Grandma uses a wheelchair as part of the fun. There are 14 grandma names to choose from, accented names print, and the beside-not-on-a-lap line is included. |
| Strong "how to use this book" page | 8 | 8 | "A lap is a small place with a big job" (p32) plus the favorite-laps keepsake. |
| Satisfying ending | 7 | 8 | The story ending ("the best lap of all… my Maya") is strong, but the book then closed on a half-empty catalog page (p33). **Added:** a closing block on p33, "Before you close the book / Whose lap tomorrow, {name}?", which calls back to the title and invites a re-read. It shows whenever the founder's author note is empty. |
| Premium finishing details | 8 | 9 | The dedication page, reading pledge and keepsake page were already strong. **Back cover:** added an "Ages 0–5" pill with "Personalized picture book · read-aloud", and the publisher line "Published by Play Before Pixels / AlphaPlay LLC". |
| Consistent series look | 7 | 7 | The logo sits top-center on this front cover. That differs from the bottom-left corner used on the other three books. It was not moved because the title block and the name ribbon fill the top, and a move needs a cover re-layout and a founder proof. It is logged below. |
| **Average** | **7.7** | **7.9** | |

## Retail-shelf readiness

A one-name personalized book is not a shelf product. These checks apply to a future non-personalized classroom or library edition, which is already on the founder's roadmap.

| Check | Status |
|---|---|
| Standard trim | 8.5 × 8.5 in square. |
| Spine readable from 6 ft | **Not possible** at 32 pages (placeholder spine 0.08 in). |
| Back cover | Promise ("A lap is the best seat in town."), the age pill, a short description, the "Collect the books" strip, a blank barcode area and the publisher line. |
| BISAC and age range in `listing.json` | Added `bisac` (JUV013000, JUV013050, JUV070000, all [VERIFY]), `bisac_notes`, and `age_range` (0–5). |
| Series trade dress | Same palette and type as the line. The logo corner is not yet matched (see above). |

**What a big-box retailer would still require that we cannot do now** (see `business/sections/04-retail-target-walmart.md`):
- **A non-personalized edition with an owned ISBN.** Personalized copies carry no ISBN.
- **Distribution** through Ingram or a distributor, which needs that edition.
- **A price that survives a wholesale discount.** At $24.99–$34.99 with $8–$14 print cost (`listing.json`, UNVERIFIED), a 55% discount leaves little or nothing.
- **Sell-through history.** None; the book is held from sale.

## What cannot reach premium level without outside spending

- **Human illustration**, including a "family look" option so Dad, Grandma and the brother can match the child. That is a larger art job.
- **A printer account and paid proofs** for the personalized print-on-demand partner.
- **A paid editor** for the rhymes, which are still drafts (42 WORDS.md sections are marked draft). The founder rewrite is also on her list.

## Rebuilt and checked

- `listing.json` → `files.build_notes` (sample book, interior-only, both cover-wrap samples, `template-variables.pdf`, `cover.png`, `picker.png`, `mockup.png`, previews p01–p34).
- The example orders (sample, long name, Abuela) all build (exit 0).
- `node ops/TESTS/check_fonts.js picture-laps-not-apps`: 8 files, 0 problems.
- PyMuPDF scan: 0 Type 3 fonts and 0 placeholder strings. `template-variables.pdf` is excluded, because it shows `{{TOKENS}}` on purpose.
- `python3 ops/TESTS/check_listings.py`: 0 FAIL, 0 WARN.
- Founder follow-up: decide whether the front-cover logo moves to the shared bottom-left corner at the next cover re-layout.
