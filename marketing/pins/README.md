# Pinterest launch set: 12 boards, 60 pins

Built September 28, 2026 for the launch plan in `business/GROWTH-ENGINE.md` (Loop 3 and §2c week 2). **Nothing is pinned yet:** `ops/PAUSE` stays, and no Pinterest account exists. Pinterest limits, CSV columns and label names below are from memory and UNVERIFIED (web search was unavailable).

## What is here

| Path | What |
|---|---|
| `png/<pin-id>.jpg` | 60 pins, 1000 x 1500 px (2:3), JPEG. Brand style: brand palette, Bricolage Grotesque and Nunito Sans (static instances), the adopted Maker's Seal horizontal lockup from `brand/logo/lockup-horizontal.svg`, and playbeforepixels.com on every pin |
| `boards.csv` | the 12 board names and descriptions, with the number of pins each gets |
| `pins.csv` | Pinterest bulk-create file: Title, Media URL, Pinterest board, Thumbnail, Description, Link, Publish date (UTC), Keywords |
| `pins-master.csv` | the same 60 rows plus local time, alt text, destination, earliest date and stop date (the routine's working copy) |
| `pins.json` | everything above in one file, for the API routine |
| `build/pins-data.js`, `build/boards.js` | every word on the pins and boards |
| `build/build.js`, `build/make.sh`, `build/check-layout.js` | rebuild, render and check: `bash marketing/pins/build/make.sh` |
| `src/pins.html` | the rendered source (one `.pin` per pin) |

## The rules these pins follow

- **Destinations.** 48 product pins link to that product's **Etsy listing** (`{{ETSY_LISTING_URL:<slug>}}` placeholders, replaced when each listing goes live). 12 free-printable pins link to the **email landing page** `https://playbeforepixels.com/free/?src=pin` and say "free with email sign-up, grown-ups only". No pin links to the research hub, and no pin links anywhere else.
- **Only live products are pinned.** Each row has an earliest date: G-day products from Oct 16; the week-2 listings (Family Kit, Play & Talk, Starter) from Oct 22; the Winter Countdown from Oct 26 and never after Nov 30 (the listing is deactivated Dec 5; archive or re-link those 5 pins then). A pin whose placeholder is still unreplaced is held, not posted.
- **Pace.** 3 pins a day (08:15, 13:15, 20:15 America/New_York; best times UNVERIFIED), Oct 16 to Nov 3, then the Winter pins one a day to Nov 7. No two pins for the same product on the same day, so each product's pins spread over 2–3 weeks. Each pin is its own image (Pinterest's duplicate-pin guidance, UNVERIFIED).
- **Words.** Every board name, title, description, image line and alt text passes the GROWTH-ENGINE §7 banned-word list (checked by `build.js`): no autism, therapy, delay, milestone, "brain", "learning", classroom, teacher, preschool, daycare or library words, no brand or show names, no "first then" or "visual schedule" (D9). No prices on pins, no fear words, no health or outcome claims.
- **Facts.** Every count (74, 181, 100, 76, 52, 24, 60) and every play name in a list pin is checked against the products' own content modules on every build; a mismatch stops the build. Starting ages are the products' own.
- **Faceless.** Illustrations and product pages only. No people photos, no children, no founder.
- **AI label.** Turn on Pinterest's AI-generated/modified label for every pin where Pinterest asks for it (COMPLIANCE-GATE 17; the setting's name is UNVERIFIED).
- **Own boards only.** No group boards, no Tailwind Communities, no comments, no repins into other people's boards.

## The 12 boards

See `boards.csv`. Order to create them: Free Printables for Parents of Little Kids · Screen-Free Play Ideas for Toddlers · Toddler Busy Book Ideas · Toddler Routine & Picture Schedule · Morning & Bedtime Routines for Little Kids · Baby Play Ideas (0–12 Months) · Talk While You Play · Rainy Day & Indoor Activities for Kids · I'm Bored Ideas for Kids 1–5 · Family Screen Time Plan & Play-First Ideas · Toddler Gift Ideas: Printable & Instant · Winter Activities for Toddlers.

## To post (after `ops/PAUSE` is gone and an APPROVED line exists)

1. Create the 12 boards with the names and descriptions in `boards.csv`.
2. Host the 60 JPEGs where Pinterest can fetch them, and replace `{{PIN_MEDIA_BASE_URL}}` (or upload each image by hand / through the API).
3. As each Etsy listing goes live, replace its `{{ETSY_LISTING_URL:<slug>}}` in `pins.csv`, `pins-master.csv` and `pins.json` (the Etsy packet checklist has this step).
4. Upload `pins.csv` through Pinterest's bulk-create tool, or let the routine post from `pins.json` through the API. Rows whose link still holds a placeholder are skipped.
5. Add the alt text from `pins-master.csv` to each pin.
