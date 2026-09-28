# Customer panel: "Talk, touch and play come first" mug (11 oz and 15 oz)

September 28, 2026. This panel is simulated, so none of these people are real customers. Use the comments as a checklist, not as reviews, and never quote them in marketing.

**What the panel saw:** `cover.png`, `mockup.png`, listing images `listing-01…04`, the four side mockups, production sheet pages 1–4 (`merch-mug.pdf`) and `listing.json`.

## What the panel said

**New parent (baby, 5 months):** Would buy the 15 oz. "Printed when you order" explains the wait. I want to know that it goes in the dishwasher, and the listing says it follows the partner's rating. That is honest, but I'll want the actual words before I buy.

**Worried parent (quiet 2½-year-old):** Maybe. "Talk, touch and play come first" feels warm, not bossy. "A small reminder for the person holding it" helped. My son mostly points, so I'd like the line to count that as talk.

**Grandparent gift-buyer:** Would buy it as a gift. It's clear that it can ship straight to my daughter. Is it safe for hot coffee? The FAQ answers that, and I'm glad it doesn't make big claims.

**Parent of a 10-year-old:** Maybe. It's a nice mug, and the seal side is the one I'd face out at work.

**Preschool teacher:** Would buy it for home. The seal side is fine at work too, since it names nothing and criticizes nothing.

**Speech-language pathologist:** Fine. It's plain words with no program names or clinical claims. Adding that a sign, a point or a talking-device tap counts as talk would match the brand's own rule.

**Occupational therapist:** "Touch" is a lovely word for play. I'd leave it.

**Autistic adult self-advocate:** No problem with the line itself. The FAQ saying it is not a comment on anyone else's family is the right call. Include device taps as talk, as on the tee.

**Spanish-speaking parent:** The seal side has no English besides the name, and the listing says the slogan is English. That is fine.

**Panel scores (customer-voice rule 12):** "made me feel judged" 1/5; "preachy" 1/5. The limit is 2 or lower.

## What changed (product lead)

| Issue | Raised by | Fix | Where |
|---|---|---|---|
| Talk should include a point, a sign and a device tap (BRAND rule 15) | Worried parent, SLP, self-advocate | The "What does the line mean?" FAQ now says talk can be a word, a sign, a point or a tap on a talking device. | `listing.json` FAQ |
| Care words must be the partner's own | New parent | Already a `[VERIFY]` in the FAQ, plus a human_todo and a note on listing image 4; kept. | `listing.json` |

**Not changed, and why:** the slogan's words are cleared exactly as ORIGINALITY.md C1 keeps them. There is no kids' cup (CPSIA hold). There are no color variants: sublimation needs a white blank.

## Color-blind check (COMPLIANCE-GATE 20)
No information depends on color. The tomato ball is decoration only, used as a period, and the navy seal on white is about 14:1. The listing images use word labels on every size and chip. Checked on the renders in deuteranopia view by eye (simulated): the seal's sky top and tomato band stay distinct by lightness.

## Checks
- `python3 ops/TESTS/check_listings.py`: merch-mug has 0 FAIL and 0 WARN.
- `node ops/TESTS/check_fonts.js merch-mug`: see the commit log.
- Every mockup and listing image was rendered and looked at. Nothing clips, the handles fit the frame, and the wrap reads correctly on both sides.

## Sample gate record (QUALITY-STANDARD.md)
| Date | Partner | Blank | Safety documents on file | Result |
|---|---|---|---|---|
| — | not chosen | — | no | **Not run yet: no listing may go live.** |
