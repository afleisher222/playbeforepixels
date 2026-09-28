# Rebuild: picture-tablet-slept (The Day the Tablet Slept), 2026-09-28

**Status:** `held`. It is held from KDP under the age hold: it needs a 4+ grade or CPSC guidance (GROWTH-ENGINE §8a). The files are rebuilt and ready.

**Rebuilt with the adopted logo.** The build notes were followed (`node build.js`, render, `fix-pdf-size.py`) to rebuild:
- the interior
- the KDP paperback cover and the IngramSpark hardcover cover
- `cover.png`, `mockup.png`, the back-cover and wrap previews and the page previews

The committed renders still had the earlier tilted-top seal. They now show the adopted upright top with the tomato band.

**Licenses.**
- The printed book never offered one.
- In the FAQ, "Can we order copies for a class, library or group?" now says not yet.
- "Paperback or hardcover?" no longer promises the held IngramSpark hardcover.
- IngramSpark, bulk orders and library readiness are marked HELD in `channels` and `human_todo`.

**Bracketed notes.** None in the FAQ. The Returns answer no longer points to the website.

**ISBN.** Amazon's free KDP ISBN when the hold lifts. The to-do to buy Bowker ISBNs was replaced.

**Fonts.** No Type 3 fonts. `check_fonts.js`: 0 problems.

**listing.json**
- `status: held`, `status_notes` and a `kdp` block added.
- The FAQ, `channels` and `human_todo` were updated.
- Price $11.99, `price_floor` 3.60, net per unit and `ai_disclosure` unchanged.

**Tests.** `check_listings.py` 0 FAIL / 0 WARN; PyMuPDF scan clean; `unchanged_renders.py --restore` run.
