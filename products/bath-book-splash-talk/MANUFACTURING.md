# Duck! Bubbles! All Done! — manufacturing notes (DESIGN ONLY, HELD FROM SALE)

*Play Before Pixels, a trade name of AlphaPlay LLC. Written September 28, 2026. This is a design file and a plan, not legal advice. Every size, test and rule marked UNVERIFIED must be confirmed by the chosen factory, a CPSC-accepted lab and a product-safety attorney before any money is spent.*

## Status in one line

The art and print files are finished so the founder can see and approve the book. **Nothing is for sale, nothing is listed, and no pre-order is taken.** The listing record says `"status": "design-only-held"`.

## Why it is held

### 1. It is a children's product for under-3s, so it needs third-party testing before sale

A bath book is made for babies and toddlers (ages 0–2) and is meant to be handled, chewed and splashed. That makes it a children's product under the CPSIA, and very likely a toy under the mandatory toy standard (ASTM F963), rather than an ordinary paper book (UNVERIFIED: the lab and attorney decide the category). Before a single copy is sold it needs:

- **Third-party testing at a CPSC-accepted lab**, covering at least (UNVERIFIED, the lab sets the final list):
  - lead in paint and surface coatings (16 CFR 1303) and total lead content in the substrate;
  - phthalates in plasticized materials (16 CFR 1307), which matters for any vinyl;
  - small parts (16 CFR 1501) — the design has none, but the finished book still has to pass, including after use-and-abuse tests;
  - the ASTM F963 tests that apply to a bath toy for under-3s (for example sharp points and edges, 16 CFR 1500.48/49, and any seal-strength or water-fill tests the lab requires).
- **A Children's Product Certificate (CPC)** issued by AlphaPlay LLC as the importer, based on those passing results, and filed electronically with CPSC at import where required (CPSC eFiling; the start date is recorded elsewhere in this repo as UNVERIFIED).
- **Permanent tracking labels** on the product and its packaging: manufacturer, place and date of production, and a batch or run number (CPSIA section 103). The back cover reserves a boxed area the factory prints into; the art never fakes this information.
- **Age grading and warnings** exactly as the lab and attorney word them. This book has no small parts, so no choking-hazard warning is expected, but that is the lab's call.
- **For any EU sale:** the EU Toy Safety rules (Directive 2009/48/EC, being replaced by the new Toy Safety Regulation; dates UNVERIFIED), EN 71-1/-2/-3 testing, CE marking, an EU technical file, an EU-based responsible person, and the General Product Safety Regulation (EU) 2023/988 (GPSR) duties: traceability, contact details on the product, and incident handling. **For UK sale:** UKCA and the UK toy regulations (UNVERIFIED). Until those exist, no EU or UK sale and no shipping there.

### 2. There is no print on demand for bath books

KDP, IngramSpark, Lulu and the POD merch printers do not make sealed vinyl or EVA bath books (UNVERIFIED as of September 2026; re-check once a year). A bath book is a **factory run**: a minimum order quantity, typically in the low thousands of units (UNVERIFIED; get written quotes), paid up front, shipped by sea or air, cleared through customs, and stored and shipped by a **fulfillment warehouse (3PL)**.

That conflicts with two binding rules:

- **No inventory, ever** (brand/BRAND.md). A bulk run is allowed only if a 3PL holds and ships it, never the founder's home.
- **The $500 launch budget** (business/LAUNCH-BUDGET-500.md). A run, the lab tests, the certificate, a customs broker and a 3PL together cost many times that.

So this book follows the **same pre-sale path as the board book** (ops/QUEUE.md "Next to build" item 0; business/REVENUE-PLAN.md §18; business/sections/03-financial-model.md §3.10 rule 4):

1. **Gate first, in writing, before any spending:** all five board-book gate conditions (§3.10 rule 4): a positive trailing 12 months for 6 months; retained cash covering the pre-sale costs, the full run and a 3-month reserve; the POD paperback *Up! Go! More!* selling at least 40 a month for 3 months; written quotes that meet the channel cost rule; and a product-safety attorney's written answer on who certifies under CPSIA.
2. **Quotes:** 2–3 written factory quotes for this exact spec (below), plus lab, customs broker, duty and 3PL quotes.
3. **Pre-sale on the brand's own store only**, with a stated ship date, delay notices and a full-refund option (FTC mail-order rule), and a go line calculated from the real quotes. Below the go line, every order is refunded in full.
4. **Print, test, certify, then ship.** The run goes straight from the factory to the 3PL. Nothing ships until the lab reports pass and the CPC exists.

It is more likely to go as a bundle add-on to a board-book run than as a run of its own. The founder decides.

## Print and build spec (for the factory quote; every number UNVERIFIED)

| Item | Design value | Note |
|---|---|---|
| Format | Sealed bath book, 8 printed panels: front cover, 6 word pages, back cover | Factories often count "8 pages" this way; some count 6 or 10. Match their template. |
| Trim | 5.5 × 5.5 in (about 140 mm) | A common bath-book size; the factory template wins. |
| Bleed | 0.125 in on every edge (5.75 × 5.75 in panels) | `bath-book-splash-talk.pdf` is exported at 5.75 in. |
| Die line | Rounded corners, radius 0.375 in (about 10 mm) at trim | Shown in `bath-book-splash-talk-dieline.pdf` (magenta). |
| Safe zone | 0.5 in inside trim for all text and faces | Wider than the brand's 0.375 in to clear the heat-seal edge (cyan, dashed). |
| Pages | EVA foam core in a heat-sealed, phthalate-free film (PEVA, EVA or phthalate-free PVC; the lab tests whichever is used) | Ask for **non-PVC first**. No air-filled pages, no rattles, no squeakers, no water inside. |
| Binding | Heat-sealed or stitched spine; no rings, no ribbon, no cords | |
| Ink | Printed on the inner face of the film or sealed under it, so ink never touches the mouth | The factory states how; the lab tests the finished book. |
| Colour | Files are RGB from Chromium. Convert to the factory's CMYK profile and order a wet proof. | Watch the ink-navy and sky pages for banding. |
| Barcode | White 2 × 1.2 in box on the back cover | Needs an ISBN or UPC before print. |
| Tracking label | Boxed area on the back cover; the factory prints batch, date and place | CPSIA section 103. |

## Safety design rules applied

- **No detachable parts:** no buttons, beads, eyes, squeakers, rattles, loops, ribbons or toys attached. Every page is one sealed piece.
- **No cords or strings** of any length.
- **Nothing small enough to fit through a toilet-paper tube** (brand rule 4) — the book has no separate pieces at all.
- **Rounded corners** on the die line (0.375 in radius), no sharp points.
- **Water safety on the book itself:** "Bath safety: stay within arm's reach every second. This book is for talk and play, not a float or a seat."
- **Care and check line on the book:** squeeze out water, wipe dry, stand open to dry, check every page before each bath and stop using it if anything splits or peels.
- **Talk and play language only.** No health, development or learning-outcome claims anywhere on the book, the listing or the ads.

## Files

- `source.html` — all 8 panels (built by `build/build.js`; rebuild everything with `bash build/render-all.sh`)
- `bath-book-splash-talk.pdf` — print file, 8 pages at 5.75 × 5.75 in with bleed
- `bath-book-splash-talk-dieline.pdf` — the same pages with bleed, die line and safe zone marked (proof only; never print it)
- `preview/` — page PNGs; `build/dieline-preview/` — marked PNGs
- `cover.png` (1600 × 1600, trimmed with die-cut corners), `mockup.png` (1600 × 1200, labelled "design preview · not for sale yet")
- `build/cast.js` — the Talk-Along cast and symbols, copied from `products/board-up-go-more/build/build.js` so every book looks the same
