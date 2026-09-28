# Sticker quality standard (same bar as products/merch-core: "good quality like Primary")

The benchmark is the *feel* of a premium sticker: thick vinyl, a soft matte surface, true color, clean white borders and a kiss-cut that lifts easily. We don't copy anyone's designs. Nothing here goes on sale until a sample passes this standard.

Everything marked UNVERIFIED comes from memory, with no partner quote or document on file yet. Check each item on setup day.

## What we can and can't match
- **Can match:** waterproof vinyl, a matte finish, a kiss-cut sheet with a clean white border on every sticker, true brand color, and flat packing (a rigid mailer, so the sheet arrives unbent). All of this runs through print on demand, with no inventory.
- **Can't match yet:** children's stickers. Stickers sold to or for children are a children's product under CPSIA and need third-party testing and a Children's Product Certificate. Kids' items and toys stay **held** (legal/LEGAL-LAUNCH-CHECKLIST.md row 9). This sheet is for adults only.

## Material requirements (choose the specific product at the print partner)
| Item | Minimum standard | Reject |
|---|---|---|
| Sticker sheet | **Waterproof vinyl** (not paper), about 3–4 mil thick, with a permanent adhesive that removes cleanly from a laptop. About A5 (5.83 × 8.27 in, UNVERIFIED). | Paper stickers, "water-resistant" coated paper, or a sheet under about 5 × 7 in (the seal would get too small). |
| Finish | **Matte** first: a soft look, no glare in photos, and it fits the calm brand look. Gloss is the fallback only if the partner has no matte; its colors pop more but show fingerprints and glare. Choose one finish; never mix finishes on the sheet. | Holographic, glitter or mirror finishes. |
| Cut | **Kiss-cut:** the vinyl is cut, the backing is not, and every sticker keeps a white border of at least 0.08 in. If the partner cuts from our file, use print/sticker-sheet_cutlines.svg. | Stickers that tear or lift their neighbors when peeled. |

## Print requirements
- Full-color print on white vinyl, colors from the brand palette only. Check tomato, sky and plum against the sample, because screens lie.
- Nothing prints within 0.2 in of the sheet edge (build/build.py checks this), and stickers stay at least 0.1 in apart.
- The sheet margin keeps the line "Not a toy. Keep away from young children." at a readable size (about 11 pt or larger).

## Safety (UNVERIFIED legal reading; confirm with a product-safety attorney)
- **Not a toy.** Stickers peel into small, thin pieces a young child could put in the mouth: a choking and small-parts risk. The sheet margin, the listing, the FAQ and listing image 4 all say "Not a toy. Keep away from young children."
- **Sold to adults only.** Only laptops, bottles, planners and notebooks appear in photos. Never show children or children's hands, and never use "kids", "toddler", "party favor" or "reward stickers" in any words, tags or ads. No classroom or nursery settings, and no children's gift guides.
- **No health or condition wording** on the stickers, the sheet or the listing.
- If the product could be read as a children's product (toy pictures plus how it is sold), stop selling until counsel answers.

## Sample gate (required before any listing goes live)
1. Order one sheet in matte from the launch buffer (about $10 with shipping, UNVERIFIED).
2. Check it by hand:
   - the colors match the palette;
   - every white border is even;
   - every kiss-cut lifts cleanly without lifting its neighbor;
   - the margin safety line is readable;
   - the sheet arrives flat and unbent.
3. Run the durability test:
   - stick one sticker on a water bottle and one on a laptop lid;
   - soak the bottle for 24 hours in water, then hand-wash it 10 times;
   - rub the laptop sticker 20 times with a damp cloth;
   - peel the laptop sticker after a week: it must leave no residue.
   No lifting, fading, smearing or peeling corners is allowed. If the soak test fails, **remove "waterproof"** from the listing and from listing image 1, and try the next product.
4. Photograph the sample on a laptop, a bottle and a notebook, faceless: no people and no children.
5. Record PASS or FAIL in products/merch-stickers/panel.md, with the date, the partner and the product. **No PASS, no listing.**

## When
Merch starts after the printables are selling (February 2027 or later, per business/GROWTH-ENGINE.md). Lead with the sheet as an own-site add-on beside a tee or mug. marketing/DEMAND-CHECK.md rates stickers "bundle-only", so the standalone Etsy listing is optional.
