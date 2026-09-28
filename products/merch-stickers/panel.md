# Customer panel: Play Before Pixels sticker sheet

September 28, 2026. This panel is simulated, so none of these people are real customers. Use the comments as a checklist, not as reviews, and never quote them in marketing.

**What the panel saw:** `cover.png`, `mockup.png`, listing images `listing-01…04`, `print/sticker-sheet.png`, production sheet pages 1–4 (`merch-stickers.pdf`) and `listing.json`.

## What the panel said

**New parent (baby, 5 months):** Would add it to a tee order. The seal would go on my laptop. "Not a toy" is right: my baby eats everything.

**Worried parent (quiet 2½-year-old):** Would buy. My son will want the ball sticker. The sheet itself tells me to keep it away from him, which helps me say no.

**Grandparent gift-buyer:** Would buy it as a stocking filler, but I couldn't tell if it can ship straight to my daughter.

**Parent of a 10-year-old:** Maybe. My daughter will ask for the blocks. The listing says grown-ups only, which is fine; at ten she can have mine.

**Preschool teacher:** I'd put the seal on my own water bottle. I'm glad it doesn't pitch these as classroom reward stickers.

**Occupational therapist:** Matte is good; glare bothers some people. The safety line is honest.

**Autistic adult self-advocate:** No slogan and no condition words. Nothing to object to.

**Spanish-speaking parent:** The only words are the brand name and the safety line, so it works in any language.

**Panel scores (customer-voice rule 12):** "made me feel judged" 1/5; "preachy" 1/5. The limit is 2 or lower.

## What changed (product lead)

| Issue | Raised by | Fix | Where |
|---|---|---|---|
| No gift answer | Grandparent | New "Can I send it as a gift?" FAQ: ships flat in a rigid mailer; a gift note only if the partner offers one. | `listing.json` FAQ |
| First draft of the ball read as a pie chart | Product lead's render check | Redrawn as a playground ball: tomato with a sun band and white seams. | `build/build.py` |

**Not changed, and why:**
- **Kids' versions or reward stickers.** These would be a children's product (CPSIA) and stay held.
- **A slogan sticker.** Only lines brand/ORIGINALITY.md keeps may be printed, and a plain picture sheet is the calmer choice.

## Color-blind check (COMPLIANCE-GATE 20)
No information depends on color. Each sticker is a distinct shape: a circle seal, a striped ball, a block tower with circle, triangle and square marks, a book and a word label. The safety line is ink on a sky tint at about 12:1.

## Checks
- `python3 ops/TESTS/check_listings.py`: merch-stickers has 0 FAIL and 0 WARN.
- `build/build.py` asserts that every sticker sits inside the 0.2 in margin and at least 0.1 in from its neighbors.
- Every mockup and listing image was rendered and looked at. The first laptop mockups had stickers overlapping and spilling off the lid; they were rescaled and checked again.

## Sample gate record (QUALITY-STANDARD.md)
| Date | Partner | Product and finish | Soak test | Result |
|---|---|---|---|---|
| — | not chosen | — | — | **Not run yet: no listing may go live.** |
