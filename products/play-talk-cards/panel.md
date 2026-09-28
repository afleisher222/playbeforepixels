# Customer panel: 52 Play & Talk Cards (0–5) and 52 Family Talk-Along Cards (5–12)

September 28, 2026. This panel is simulated, so none of these people are real customers. Use the comments as a checklist, not as reviews, and never quote them in marketing.

**What the panel saw.** For the play deck: `cover.png`, `mockup.png`, pages 2, 3, 4, 7–9, 11–13, 15, 20 and 21, low-ink page 2, and listing images 01, 07 and 08. For the talk deck: `talk-along/cover.png`, pages 2, 6, 8 and 15, low-ink page 2, and listing image 07. They also read both `listing.json` files.

## What the panel said

**New parent (baby, 4 months):** Buy. "Nothing to get right" and the 2-minute versions were written for my week. Only a few cards start from birth, but the start ages tell me which ones to try first. The no-cut pages mean I'll actually use it tonight. I didn't know whether my mum, who watches the baby on Tuesdays, is allowed to use our printed copy.

**Worried parent (quiet 2½-year-old):** Buy. "A look, a sound or a point is a turn" and "ages are a guide, never a deadline" took the pressure off. But the fridge sheet asks for "our child's newest word or phrase", which is a blank line I'd dread filling in. Also, the no-cut pages are the pages I'd use, and they don't carry the card safety notes (the water, the tissue-box film, the chairs).

**Grandparent gift-buyer:** Maybe. It's cheerful, and $7 is easy. But it's a download: how do I give it? The license says "your own family only", so is printing it for my daughter's family allowed? Is there a boxed deck I could wrap?

**Parent of a 10-year-old:** Buy the talk deck. The car cards and the grown-up tips are good, and "Listen, don't fix" is the one I need. My son showers alone and would roll his eyes at "What would a fish say about our bathtub?" The guide should say it's fine to skip the young ones. On the last page I'd rather see the phone kit than routine cards.

**Child, age 11 (read the talk deck):** "Some of these are for little kids. I don't have a bath with my mum." "The car one about the playground is good." "There's nothing about stuff I actually like, like my games. Can there be one that isn't about how screens are bad?"

**Preschool teacher (3s and 4s):** Would use the 3–5 cards in small groups. The talk moves are exactly what I coach new assistants on. But the license is "your own family only", so I can't use it at school at all, and there's no classroom option.

**Child-care director:** Maybe. The under-3 size rule, the no-cords rule and "Grown-up keeps the pieces" are what my licensing inspector looks for. I need a site license for five rooms, and my staff would use the no-cut pages, so the card safety notes have to be on those pages too.

**PTA leader:** Maybe. I'd put the talk deck in a family-night goodie bag, but I can't tell what a PTA is allowed to buy or hand out. There's no group or school price.

**Speech-language pathologist:** Would recommend it to families as everyday play (it isn't clinical, and it doesn't pretend to be). Pause and wait, repeat and add one, and offer a choice are plain and right. Two lines slip into asking for eye contact: "wait for baby to look at you first" and "blow again when baby looks at you". A reach, a kick or a sound is just as real a turn.

**Occupational therapist:** Buy. Jumbo egg crayons, big soft balls and a pillow mountain on the floor are good choices. Some children hate tickles, messy hands or loud banging, and the guide should say plainly that it's fine to skip those. On Tickle Countdown, add "stop if baby turns away".

**Autistic adult self-advocate:** Mostly yes. "A sign, a point or a device tap counts", "side by side feels easier than face-to-face" and "pass" are right. The same two eye-contact lines bother me: a baby who looks away is still in the game. The fridge sheet's "newest word" only counts speech. The tickle card needs a way out for the baby. One smaller thing: "Sock Puppet" is a phrase this brand already keeps out of its marks, so why use it on a card that will end up in pins?

**Spanish-speaking parent:** Buy the play deck anyway. "Talk, sing and read in the language you know best" made me feel welcome, and the plays work in Spanish. But nothing in the listing says the cards are English only, and I'd want to know that before I pay.

**Children's librarian:** Would use both decks at baby and toddler storytime and send the no-cut pages home. The personal license rules that out, and the listing doesn't answer the library question. It also needs an honest line saying the text is English only.

**Panel scores (customer-voice rule 12):** "made me feel judged" 1/5 (fridge-sheet line before the fix) and "preachy" 1/5. The limit is 2 or lower.

## What changed (product lead)

Every change stays inside BRAND.md: no health or clinical words, no named products or brands, no new citations, no machine translation, and no pricing tricks.

| Issue | Raised by | Fix | Where |
|---|---|---|---|
| No-cut pages dropped the card-specific safety notes (water, tissue-box film, chairs, crayons, mirror and so on) | Worried parent, director | Every no-cut row whose card has its own safety note now prints it under the talk line, with the shield. The header now says the notes are "on each card and in the rows below". | `build/build.js` noCutA; play deck pp. 4–11 |
| Eye-contact demands: "wait for baby to look at you first" and "blow again when baby looks at you" | SLP, self-advocate | Roll It Back: "wait for a look, a sound or a reach." Bubble Watch: "Blow again when baby reaches, kicks or looks." Rock and Stop: "wiggles, coos or looks up." | `build/content.js` cards 05–07 |
| Tickles with no way out | OT, self-advocate | Tickle Countdown's card note is now "Gentle tickles only. If baby turns away, stop: that's a turn too." | `content.js` card 11 |
| No permission to skip plays that don't suit a child | OT | The guide's "Most children love 2–3 of these" box now adds "skip any your child doesn't enjoy." The FAQ names tickles, mess and noise. | play deck p. 2; `listing.json` faq |
| Fridge sheet counted only spoken words | Worried parent, self-advocate | "Our child's newest word or phrase" is now "A new word, sign or sound we noticed". | play deck p. 20 |
| "Sock Puppet Chat" (a phrase BRAND.md keeps out of marks) | Self-advocate | Renamed **Sock Friend Chat**, with the play, talk tip and easier/harder text to match. | `content.js` card 33; all sheets, tracker, no-cut page |
| Grandparents and sitters seemed shut out by "your own family only", even though page 3 says "hand a card to grandparents or the sitter" | New parent, grandparent | The page 3 license now says "(grandparents and sitters who care for your child count as family)". | both decks p. 3 |
| No classroom, center or library license | Teacher, director, PTA, librarian | Added `license_tiers`: personal $7, single-classroom $12 and site $29, the last two on our site only [founder to confirm prices; counsel to confirm terms]. Page 3 and START HERE now tell class, center and library users they need one (the Etsy edition points to shop policies, with no URL). Setup is added to `human_todo`. | `build/listings.js`; both decks p. 3 and START HERE |
| Questions a buyer would otherwise email: gifts, PTA, library storytime, Spanish, printed deck, refunds, device users, professional advice | Grandparent, PTA, librarian, Spanish parent, worried parent | Added a `faq` with 16 entries for the play deck and 17 for the talk deck. Answers that depend on counsel or the platform are marked. | both `listing.json` (generated by `build/listings.js`) |
| The listing never said the text is English only | Spanish parent, librarian | New `language` field, "English text." in `format`, and a Spanish FAQ answer. A human-translated edition goes to `human_todo`, tied to La Charla Cuenta. | both `listing.json` |
| Talk deck felt young for 9–12s, and bath cards assume a shared bath | Parent of a 10-year-old, child | The guide's "Ages 8–12" line now reads "Skip any that feel too young; bath cards suit tooth-brushing too." The FAQ has "Will my 11-year-old find it babyish?" | talk deck p. 2; faq |
| No card about the child's own interests in games and shows | Child | The car card "If animals could talk…", which duplicated the dinner animal card, is replaced with "What's a game, show or video you like right now? What's the best part?" and the tip "Be curious, not a critic. Ask them to explain it to you." It adds talk and takes nothing away (rule 12). | `content.js` car card 23 |
| The talk deck's "what's next" didn't lead to the 9–12 product | Parent of a 10-year-old | Visual Routine Cards is replaced by the **First Phone Agreement Kit (ages 9–12)** on page 15 and in `next_products` (that kit already links back here). | `build/build.js` nextPage; `listings.js` |
| `human_todo` said `brand/ORIGINALITY.md` does not exist; it does | Product lead | Now says ORIGINALITY.md keeps both names (row A14 and section 2), but the ratings are provisional and unsearched, so the knockout search (task #18) is still due. | both `listing.json` |
| Longer guide text pushed the low-ink Letter page 2 into the footer (both decks) | Product lead check | Trimmed the copy and tightened low-ink spacing. A page-by-page footer-collision check over all 18 generated editions now passes. | `build/build.js` |

**Not changed, and why:**
- **A boxed deck for gifting.** POD stays "later, after the printable sells" (DEMAND-CHECK), and the FAQ says so honestly.
- **More from-birth plays.** 13 plays per band is fixed by the deck, and "play any card that fits your child" already covers it.
- **Spanish text.** Only a human translator may make it.
- **Still open, as the QA noted:** the founder's note placeholder, human rewriting of the card text, and name clearance.

**Rebuilt:** `node build/check-cards.js` (all 108 cards fit, color and low-ink), `render-all.js`, `pod.js`, `market.js` and `listings.js`. All PDFs, previews, covers, mockups, listing images, the Etsy editions and both `listing.json` files are regenerated. Nothing is committed.
