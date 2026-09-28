# Printed URLs and QR targets: every path the site must serve

**Run:** 2026-09-28, 05:55–06:00 UTC (container clock), after the course rebuild in `ops/TESTS/promise-fixes.md`. **Lane:** promises must match reality. Nothing was published or uploaded, and `ops/PAUSE` stays.

**Why this exists:** a URL printed on a page or encoded in a QR code can never be taken back once a file is sold or a book is printed. The site build must answer every one of them, or a paying customer lands on a 404. Before this run, the license page was printed two ways (`/license` and `/licenses`).

## Decision: `/licenses` is canonical

- **Canonical page:** `playbeforepixels.com/licenses`. This matches `seo/SEO-PLAN.md` row 57 (`/licenses/`), the winner site concept's `info.html#licenses` anchor, and the 6 toddler-busy-book files that already print it.
- **Redirect:** `/license` → `/licenses` as a permanent (301) redirect. It is printed in 22 files (below) and must keep working for as long as any of them has been sold.
- **Trailing slash:** the SEO plan uses trailing slashes and the printed forms have none. Serve both, with one canonical and a 301 from the other, for every path in this file.
- **Product lanes:** at each product's next rebuild, change its builder to print `/licenses` (play-talk-cards `build/build.js`, `build/listings.js` and `build/render-all.js`; picture-more-talk-less-tap `build/kit.js`, `build/start.js` and `story-bonus/build/build.js`). The redirect covers copies already sold, so this is tidiness, not a launch blocker. This lane did not touch those products.

## How the list was made

- **Scope:** every PDF under `products/`, except the scratch folders `build/tmp/` and `build/dbg/`. That is 139 files and 5,791 pages, including the Etsy upload folders, KDP interiors and covers, START HERE files, the free starter and the merch hang tag.
- **Printed text:** PyMuPDF text extraction on every page, joining a URL only where a line break falls right after a `/` or `-`. There are no clickable link annotations in any file.
- **QR codes:** every page with heavy vector drawing or an image was rendered at 200 dpi and decoded with OpenCV's two QR detectors. Every decoded code points to a path that is also printed as text next to it, except where noted. One page mentions "scan" without its own code: the course KDP interior p3, which points to the code on p90.
- **Sources cross-check:** a grep of the product builders and `listing.json` files finds no printable path that the PDFs don't already show, apart from the email and web links in the last section.
- The script was run from scratch space and is not in the repository. Re-run the same check after any product rebuild that changes a printed URL.

## Routes the site build must create (printed or QR)

| Path | Printed in | Kind | Site must |
|---|---|---|---|
| `/` (bare `playbeforepixels.com`) | 88 files, in footers, covers and copyright pages | text | Homepage |
| `/help` | 39 files: START HERE and "Questions" pages of the course, bored cards, first-phone plan, family kit, play-talk cards (both decks), busy book and routine cards | text, plus a **QR** on `bored-play-cards/START-HERE.pdf` p1 | Serve the help center. **Not in `seo/SEO-PLAN.md`**, which has `/faq/` (row 50). Either make `/help` the help-center page or 301 it to `/faq/` |
| `/contact` | 8 files: `play-talk-cards` p21 and `talk-along` p15 (4 editions each) | text | Contact form page (SEO row 49 `/contact/`) |
| `/licenses` | 6 files: `toddler-busy-book` p2 and p130 (4 editions), START HERE p8 (Letter and A4) | text | **Canonical** license terms page (SEO row 57) |
| `/license` | 22 files: `play-talk-cards` p3 and p21 (4 editions) and START HERE p1; `talk-along` p3 and p15 (4 editions) and START HERE p1; `picture-more-talk-less-tap` p24 (4 kit editions and 4 `downloads/` kit editions), `start-here.pdf` and `downloads/START HERE.pdf` p1, read-aloud p4 (2 files) | text | **301 → `/licenses`** |
| `/30-days` | 2 files: free starter "7 Days of Play First" p3 (Letter and A4) | text | Course sales page (`products/course-screen-reset/sales-page.md`). **Not in the SEO plan**, which still lists the retired `/shop/30-day-screen-reset/` |

### `/bonus/<slug>` companion pages (SEO row 46; `noindex`, disallowed in robots.txt)

Every one is printed as text and encoded as a QR code on the same page unless noted.

| Path | Files and pages |
|---|---|
| `/bonus/board-up-go-more` | `board-up-go-more.pdf` p26; KDP cover p1; KDP interior p30 |
| `/bonus/bored-play-cards` | 4 deck editions p59; START HERE p1 (QR; the text wraps mid-word, see findings) |
| `/bonus/course-screen-reset` | 4 workbook editions and `course-screen-reset.pdf` p89; KDP interior p2 (text) and p90; KDP cover p1 (text only) |
| `/bonus/family-talk-along-cards` | 4 deck editions p15; START HERE p1 |
| `/bonus/first-phone-plan` | `first-phone-plan.pdf` and 2 `downloads/` editions p38; 2 low-ink editions p27; START HERE p1 |
| `/bonus/guide-100-plays` | 4 printable editions p85; KDP interior and `guide-100-plays.pdf` p2 and p85; START HERE p1 |
| `/bonus/merch-core` | `merch-core.pdf` p12 (text and QR) and p7 (QR only); `hang-tag.pdf` p2 (text only) |
| `/bonus/picture-laps-not-apps` | interior p32; `picture-laps-not-apps.pdf` and `template-variables.pdf` p33 |
| `/bonus/picture-more-talk-less-tap` | 8 kit editions p20 and p25; 2 START HERE files p1; 2 read-aloud files (text p4, QR p32) |
| `/bonus/picture-tablet-slept` | `picture-tablet-slept.pdf` p30 (text and QR), p2 and p32 (text) |
| `/bonus/play-first-family-kit` | 2 Letter/A4 editions p53; 2 low-ink editions p35; START HERE p1 |
| `/bonus/play-talk-cards` | 4 deck editions p21; START HERE p1 |
| `/bonus/toddler-busy-book` | 4 book editions p132 |
| `/bonus/visual-routine-cards` | complete set p160 (2) and p74 (2 low-ink); starter p24 (4); 2 START HERE files p1 |

**Etsy editions:** 0 URLs and 0 QR codes in all 45 files under the `etsy-upload/` folders (COMPLIANCE-GATE 16 passes for those files). The parked course Etsy edition (`course-screen-reset/build/etsy/workbook-etsy-color-letter.pdf`, not listed anywhere) prints the bare domain on p87, in the FAQ answer about group licenses. See the findings below.

## Link targets used in emails and web copy (not printed, but they must exist)

These come from the files this lane owns (`products/course-screen-reset/` emails, funnel and sales page, `operations/customer-service/`, `legal/`).

| Path | Used by | Site must |
|---|---|---|
| `/30-days/start` | Free starter sign-up (funnel trigger in `funnel/sequence.json`), and the reward-free "Share the free printable" line in all 42 course and funnel emails | Sign-up page for the free starter (email and birth month/year only; double opt-in) |
| `/shipping-returns/` | Course guarantee "terms" links in the welcome and funnel emails, the sales page guarantee and footer | Refund policy page (SEO row 51). There is no `/refunds` route; nothing links to it any more |
| `/shop/bored-play-cards`, `/shop/guide-100-plays`, `/shop/picture-tablet-slept`, `/shop/play-first-family-kit` | "Next for your family" in course emails | Product pages |
| `/bonus/course-screen-reset` | Day-31 course email | Same page as the QR |
| `/help` | Every course email footer; refund policy §7 | As above |
| `/faq` | `operations/customer-service/FAQ.md` is written "for /faq" (SEO row 50) | FAQ page, or merge with `/help` |
| `/licenses` | FAQ "Full terms" link | Canonical license page |
| `/privacy` | Sales page footer | Privacy policy |

## Findings for other lanes (not changed here)

1. **Mid-word wrap in a printed URL.** `bored-play-cards/START-HERE.pdf` p1 prints `playbeforepixels.com/bonus/bore` on one line and `d-play-cards` on the next. A buyer typing it will land on `/bonus/bore`. Fix the layout (a non-breaking URL or a shorter line) at the product's next rebuild. The QR on the same page decodes correctly.
2. **A retired word in a printed URL.** The course prints `/bonus/course-screen-reset` in the workbook, the KDP interior and the KDP cover. `listing.json` says "reset" is kept out of every URL (`brand/ORIGINALITY.md` A4). Decide the course bonus slug before the KDP upload. If it changes (for example to `/bonus/30-days`), change `BONUS` in `products/course-screen-reset/build/parts.js` and the day-31 email together, and keep a 301 from the old path.
3. **Printed license promises for licenses that are HELD.** `toddler-busy-book` prints "Child-care, classroom and library licenses: playbeforepixels.com/licenses". `play-talk-cards` tells buyers a classroom or site license is what they need. The course FAQ says groups "can ask for a group or site license through the written quote form". Classroom and site licenses are HELD until employment counsel clears school sales (`business/GROWTH-ENGINE.md` §4). Until then, the `/licenses` page must say plainly that only the Personal/Family license is sold today.
4. **`/help` and `/30-days` are missing from `seo/SEO-PLAN.md`,** and the SEO plan still carries the retired `/shop/30-day-screen-reset/`.
