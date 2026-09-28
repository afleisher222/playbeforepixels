# Customer panel: Core merch (logo tee, "More talk, less tap" tee, "Laps not apps" tote)

September 28, 2026. This panel is simulated, so none of these people are real customers. Use the comments as a checklist, not as reviews, and never quote them in marketing.

**What the panel saw:** `cover.png`, `mockup.png`, listing images `listing-01…07`, `slogan-01…07` and `tote-01…02`, the tee and tote mockups, the hang tag (all 3 pages), production book pages 1, 2, 8, 9, 11 and 12 (`merch-core.pdf`, 12 pages), and all three entries in `listing.json`.

## What the panel said

**New parent (baby, 5 months):** Buy the natural logo tee. It's quiet enough to wear to baby group, and "printed when you order" tells me why it takes longer. I'd want the tote as a diaper-bag spillover, but the listing only gives the print size, not the size of the bag.

**Worried parent (quiet 2½-year-old):** Maybe the slogan tee. "Not a rule and not a judgment" and "a question in the car, a song at the sink" helped, because some days the tablet is how I get dinner made. The tips card says "Let them take a turn," and my son's turns are mostly pointing. I'd like to see that a point counts.

**Grandparent gift-buyer:** Buy the logo tee for my son-in-law. But I can't tell whether it can ship straight to him with a gift note, or whether the price shows on the slip. I don't know his size either. I wanted the tote for my daughter, but I can only get it in a bundle I couldn't find.

**Parent of a 10-year-old:** Maybe. The slogan tee is fine on me, but all three talk tips are for toddlers ("Big bubbles!", "Big truck!"). At ten, the question that works is "tell me about your game." The book's last page jumps from ages 0–5 to 1–12 and never mentions the first-phone kit, which is the one I'd buy next.

**Child, age 11 (from the first-phone-plan family):** "Is that shirt about me? You're on your phone more than I am." "The ball as the period is cool." "If it said 'tell me about your game' I'd actually tell you."

**Preschool teacher:** Buy the logo tee for school. I'd hesitate on "less tap" at work, because our center uses tablets for sign-in and I don't want it read as a dig at the director. Could our staff order together?

**Child-care director:** Maybe. Staff tees for 14 people would be nice for our family night, but there's no group ordering, no single invoice, and I'd need to know whether you'd add our center's name (I'd rather you didn't; it keeps it simple). The note about keeping tote handles away from babies is right for my building.

**PTA leader:** Maybe. I'd put the tote in a raffle basket, but it's bundle-only. I'd order logo tees for volunteers if there were a written quote and one invoice. I can't tell whether a PTA can do that.

**Speech-language pathologist:** Would wear the logo tee. "The pause that gives the child a turn" is exactly right, and the slogan tee's tips are plain words, not a program. But BRAND's own rule says a device tap counts as communicating, and a shirt that says "less tap" needs one line making clear it doesn't mean the children who talk with a device. The talk tips also need the language line.

**Occupational therapist:** Buy. A printed neck label instead of a sewn tag is the first thing sensory-sensitive grown-ups look for, but the listing doesn't say whether the blank's own tag is removed, so I can't recommend it on that yet. The tote note about handles is good.

**Autistic adult self-advocate:** Hesitant on the slogan. "More talk, less tap" can read as "stop tapping" to someone whose voice is a tablet. The logo idea (serve, pause, return, and "a child answers") is fine, because an answer can be a sign. "Laps not apps" has the same problem, since some children's voices are apps. Say it once, plainly, on the listing and the idea image.

**Spanish-speaking parent:** Buy the logo tee; it has no English words besides the name. The slogan tee is English only and the listing doesn't say so. I'd like to know whether a Spanish line is coming, and I'd want it written by a person, not translated by a machine. The tips should also say to talk in the language I know best.

**Children's librarian:** I'd wear the logo tee at storytime and the "Laps not apps" tote is perfect for library runs, but I can't buy it on its own. Same concern as the teacher about wearing "less tap" at work next to our digital catalog. It needs a line saying it's a reminder for the wearer, not a comment on anyone.

**Panel scores (customer-voice rule 12):** "made me feel judged" 2/5 before the fixes (worried parent and self-advocate on "less tap") and 1/5 after. "Preachy" 1/5. The limit is 2 or lower.

## What changed (product lead)

Every change stays inside BRAND.md: no health or clinical words, no named products, schools or brands, no new citations, no machine translation, no pricing tricks, and the two slogans are unchanged because ORIGINALITY.md C3 and C4 keep them.

| Issue | Raised by | Fix | Where |
|---|---|---|---|
| "Less tap" and "Laps not apps" could read as a knock on children who talk with a device (BRAND rule 15: a device tap counts) | SLP, self-advocate | Image 3 now says "A tap on a talking device is talk too." The slogan tee's long description adds the same line. The "What does less tap mean?" FAQ says a talking-device tap is someone's voice. The tote's long description says it isn't about the talking apps some children use, and there is a new tote FAQ for it. | `build/pages.py` slogan-03; `listing.json` (tee and tote) |
| Tips card missing the language line (rule 15) | Spanish parent, SLP | Image 3 adds "Talk, sing and read in the language you know best." | slogan-03 |
| "Let them take a turn" counted only spoken turns | Worried parent, self-advocate | Pause and wait: "Count to five. A look, a sign or a point is a turn too." | slogan-03 |
| All three tips were for toddlers | Parent of a 10-year-old, child | "Add one word" is replaced by **Follow their lead**: "Tell me about your game." Then listen. The intro now says "Three easy ways to start, for any age." Plain-word strategy only (rule 6). | slogan-03 |
| Slogan seen as aimed at kids, schools or devices | Child, teacher, librarian | New FAQ "Is it about my child's screen time?": a reminder for the grown-up wearing it (our own phones included), not a comment on anyone's child, school, app or device. | `listing.json` slogan tee |
| No gift answer (ship to someone else, gift note, price on slip, unknown size) | Grandparent | New gift FAQ on both tees. Gift note and price-free slip are marked [VERIFY] until the partner is chosen, and a human_todo covers it. | `listing.json` |
| No group ordering for staff, volunteers or families | Teacher, director, PTA | New group FAQ on both tees: any mix of sizes and colors, and a written quote and one invoice for 10+ through the contact form (no calls, per BRAND). No school, team or event names are printed. The group price is left for the founder to decide (human_todo). | `listing.json` |
| Listings didn't say the text is English only | Spanish parent | New `language` field on all three entries, plus a Spanish FAQ. A Spanish line goes to human_todo: written by a person, run through the originality check, and timed with La Charla Cuenta. | `listing.json` |
| No bag size for the tote | New parent | The "How big is the print?" FAQ is replaced by "How big is the bag?" (bag size [FILL IN from the chosen blank], print about 9 in). A human_todo is added. | `listing.json` tote |
| "Next" page skipped the 9–12 audience | Parent of a 10-year-old | Book page 12 now shows four products sorted by the child's age: 100 Screen-Free Plays (0–5), The Day the Tablet Slept (3–7), 150 "I'm bored!" Play Cards (1–12) and First Phone Agreement Kit (9–12). | `build/book.py`; `merch-core.pdf` p12 |
| Sensory-friendly labeling not stated | OT | Not claimed yet. A human_todo says to add "no scratchy sewn tag" only if the chosen blank's sample confirms a tear-away or tagless neck. | `listing.json` logo tee human_todo |

**Not changed, and why:**
- **The tote on its own.** DEMAND-CHECK makes it bundle-only. The missing `bundle-holiday-gift` product is already a human_todo.
- **Center, school or PTA names on shirts.** Custom printing is a service and a naming risk (hard rule 2), so the FAQ says we don't add them.
- **Kids' sizes (asked about by the child).** These stay cut (CPSIA; DEMAND-CHECK).
- **A Spanish tee now.** Only a person may write it, and it has to go through the originality check first.
- **The slogans themselves.** ORIGINALITY.md C3 and C4 keep them. The panel's worry is answered in the copy, and the judged score is now 1/5.

**Checks after the fixes:** a banned-word scan is clean. `listing.json` is valid, and all three entries stay within limits: short descriptions 124–141 characters; long descriptions 197, 204 and 166 words; 5 bullets and 7 keywords each; SEO titles 44–52 characters; SEO descriptions 145–148 characters. The FAQs now have 10, 11 and 5 entries.

**Rebuilt:** `bash build/render.sh` (print files, labels, mockups, 16 listing images, hang tag, `source.html` and the 12-page `merch-core.pdf` with previews). I checked `slogan-03.png` and `preview/p12.png` by eye: nothing clips or overlaps, and the logo strip is clear. Nothing is committed (this folder is not a git checkout).
