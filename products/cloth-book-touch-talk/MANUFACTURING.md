# Soft! Bumpy! Crinkle! — manufacturing notes (DESIGN ONLY, HELD FROM SALE)

*Play Before Pixels, a trade name of AlphaPlay LLC. Written September 28, 2026. This is a design file and a plan, not legal advice. Every size, test and rule marked UNVERIFIED must be confirmed by the chosen factory, a CPSC-accepted lab and a product-safety attorney before any money is spent.*

## Status in one line

The art, print panels and maker spec are finished so the founder can see and approve the book. **Nothing is for sale, nothing is listed, and no pre-order is taken.** The listing record says `"status": "design-only-held"`.

## Why it is held

### 1. It is a children's product for under-3s, so it needs third-party testing before sale

A cloth book for ages 0–1 is a soft toy that babies mouth, pull and chew. Under U.S. law it is a children's product and a toy under the mandatory toy standard (ASTM F963), not an ordinary book (UNVERIFIED: the lab and attorney confirm). Before a single copy is sold it needs:

- **Third-party testing at a CPSC-accepted lab**, likely including (UNVERIFIED, the lab sets the final list):
  - lead in paint and surface coatings (16 CFR 1303) and total lead content, including the mirror film, ribbons, thread and label;
  - phthalates in any plasticized part (16 CFR 1307), for example the crinkle film and mirror film;
  - small parts (16 CFR 1501), **after** the use-and-abuse tests (torque, tension, seam strength, drop), so nothing can come loose;
  - sharp points and sharp edges (16 CFR 1500.48 and 1500.49), especially at the mirror;
  - flammability as it applies to a fabric toy (for example ASTM F963's flammability test or 16 CFR 1500.44; which one applies is UNVERIFIED);
  - the ASTM F963 cord, strap and loop requirements for toys for children under 18 months, which is what limits the ribbon tabs;
  - stuffing-material rules for the batting (ASTM F963 and some state stuffed-toy laws; UNVERIFIED).
- **A Children's Product Certificate (CPC)** issued by AlphaPlay LLC as the importer, based on those passing results, and filed with CPSC at import where required (CPSC eFiling; start date UNVERIFIED).
- **Permanent tracking labels** on the product and the packaging: manufacturer, place and date of production, batch or run number (CPSIA section 103). On a cloth book this is a **sewn-in fabric label** in the spine seam, marked on page 8 of the maker spec. The printed art never fakes it.
- **Care and fibre-content labelling** as the lab and attorney word it (textile labelling rules; UNVERIFIED).
- **Age grading and warnings** exactly as the lab words them.
- **For any EU sale:** the EU Toy Safety rules (Directive 2009/48/EC, being replaced by the new Toy Safety Regulation; dates UNVERIFIED), EN 71-1/-2/-3 testing (EN 71-2 covers flammability), CE marking, a technical file, an EU-based responsible person, and the General Product Safety Regulation (EU) 2023/988 (GPSR) duties: traceability, contact details on the product, and incident handling. **For UK sale:** UKCA and the UK toy regulations (UNVERIFIED). Until those exist, no EU or UK sale and no shipping there.

### 2. There is no print on demand for cloth books

No print-on-demand service makes sewn, multi-layer cloth books with crinkle film, a mirror and ribbon tabs (UNVERIFIED as of September 2026; re-check once a year). A cloth book is a **factory run** with a minimum order quantity (often several hundred to a few thousand units; UNVERIFIED, get written quotes), paid up front, shipped, cleared through customs, and stored and shipped by a **fulfillment warehouse (3PL)**.

That conflicts with two binding rules:

- **No inventory, ever** (brand/BRAND.md). A bulk run is allowed only if a 3PL holds and ships it, never the founder's home.
- **The $500 launch budget** (business/LAUNCH-BUDGET-500.md). The run, lab tests, certificate, customs broker and 3PL together cost many times that.

So this book follows the **same pre-sale path as the board book** (ops/QUEUE.md "Next to build" item 0; business/REVENUE-PLAN.md §18; business/sections/03-financial-model.md §3.10 rule 4):

1. **Gate first, in writing, before any spending:** all five board-book gate conditions (§3.10 rule 4): a positive trailing 12 months for 6 months; retained cash covering the pre-sale costs, the full run and a 3-month reserve; the POD paperback *Up! Go! More!* selling at least 40 a month for 3 months; written quotes that meet the channel cost rule; and a product-safety attorney's written answer on who certifies under CPSIA.
2. **Quotes:** 2–3 written factory quotes for this exact spec (below), plus lab, customs broker, duty and 3PL quotes.
3. **Pre-sale on the brand's own store only**, with a stated ship date, delay notices and a full-refund option (FTC mail-order rule), and a go line calculated from the real quotes. Below the go line, every order is refunded in full.
4. **Sew, test, certify, then ship.** The run goes straight from the factory to the 3PL. Nothing ships until the lab reports pass and the CPC exists.

## Build spec (for the factory quote; every number UNVERIFIED)

| Item | Design value | Note |
|---|---|---|
| Format | 4 sewn leaves = 8 printed panels: front cover, 6 word pages, back cover | Leaf 1 = p1/p2, leaf 2 = p3/p4, leaf 3 = p5/p6, leaf 4 = p7/p8. |
| Finished page | 6 × 6 in (about 152 mm), corners rounded r 0.5 in | A common cloth-book size; the factory template wins. |
| Seam allowance | 0.375 in on every edge (6.75 × 6.75 in printed panel) | `cloth-book-touch-talk.pdf` is exported at 6.75 in. |
| Safe zone | 0.375 in inside the finished edge for all text and faces | Cyan dashed line in the maker spec. |
| Fabric | Printed polyester or cotton face fabric; the lab tests the printed fabric | Ask the factory which print method (dye-sublimation or reactive) passes lead and colourfastness-to-saliva tests (UNVERIFIED). |
| Filling | Thin polyester batting, fully enclosed in every leaf | New material only; stuffing-law labels as required. |
| Seams | Double lockstitch on every edge and on the spine seam | Seam strength is tested after use-and-abuse. |
| Colour | Files are RGB from Chromium. Convert to the factory's profile and approve a printed fabric strike-off. | Pages 1–3 must stay true ink and white. |
| Label | Sewn-in tracking and care label in the spine seam of the back leaf | Marked on maker-spec page 8. |
| Barcode | On the swing tag or header card, never on the fabric | Needs a UPC or ISBN before production. |

### Sensory elements (marked in `cloth-book-touch-talk-maker-spec.pdf`)

| Page | Element | How it is made safe |
|---|---|---|
| p1–p3 | High-contrast art (ink #1D2940 and white only) | Printed; no parts. |
| p3 | **Mirror panel** | **Safety mirror film only:** a flexible reflective film, no glass and no rigid acrylic sheet. About 2.2 in round, edges fully enclosed by a stitched fabric frame, double lockstitch. |
| p4 (back of the mirror leaf) | **Crinkle page** | Crinkle film fills the whole leaf between the fabric layers, fully enclosed and stitched on all four edges, so it cannot be reached or torn out. |
| p5 | **Soft fabric** patch on the cat | Plush or minky appliqué, satin-stitched edge, short pile that does not shed (lab to confirm). |
| p6 | **Bumpy** patch on the turtle shell | Quilted or ribbed (corduroy) appliqué, stitched through. No beads, buttons or loose fill. |
| p3/p4, p5/p6, p7/p8 | **Ribbon tabs**, one per leaf, on the fore-edge | See the ribbon rules below. No tab on the cover leaf. |

## Safety design rules applied

- **No detachable parts:** no buttons, snaps, beads, plastic eyes, bells, squeakers, rattles, teethers, rings or hook-and-loop. Every element is sewn flat or enclosed.
- **Ribbon length limits:** each tab is a **closed loop** of woven ribbon at least 0.6 in (15 mm) wide, both cut ends heat-sealed and caught inside the seam with a backstitch, sticking out **1 in (25 mm) or less** from the finished edge, so no loose ribbon end and no loop a finger or neck could pass through. Far inside the ASTM F963 cord and loop limits for under-18-month toys as we understand them (UNVERIFIED: the lab confirms the exact limits and measures the tabs after tension tests).
- **Stitched securely:** double lockstitch on every seam and around every appliqué; the maker spec marks the seam line on every panel. Seam strength and appliqué pull are tested after use-and-abuse.
- **No buttons,** and no cords or strings of any kind (brand rule 4).
- **Mirror is safety mirror film,** never glass or rigid acrylic, with enclosed edges.
- **Nothing small enough to fit through a toilet-paper tube** (brand rule 4), before or after testing.
- **Check line on the book:** "Before each play: check the seams, ribbon tabs and mirror. Stop using the book if anything is loose, torn or worn. Play together with a grown-up close by."
- **Talk and play language only.** No health, development, vision or learning-outcome claims on the book, the listing or the ads. The high-contrast pages are described as bold pictures to look at together, nothing more.

## Files

- `source.html` — all 8 panels, no marks (built by `build/build.js`; rebuild everything with `bash build/render-all.sh`)
- `cloth-book-touch-talk.pdf` — print panels, 8 pages at 6.75 × 6.75 in (6 in finished + 0.375 in seam allowance)
- `cloth-book-touch-talk-maker-spec.pdf` — the same panels with the finished edge, seam line, safe zone, mirror, crinkle, soft and bumpy patches, ribbon tabs, spine side and sewn-in label marked for the maker (never print it on fabric)
- `preview/` — page PNGs; `build/maker-preview/` — marked PNGs
- `cover.png` (1600 × 1600, finished edge with rounded corners), `mockup.png` (1600 × 1200, labelled "design preview · not for sale yet")
- Cast and symbols come from `../bath-book-splash-talk/build/cast.js` (copied from *Up! Go! More!*)
