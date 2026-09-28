# Customer panel: First Phone Agreement Kit (ages 9–12)

September 28, 2026. This panel is simulated, so none of these people are real customers. Use the comments as a checklist, not as reviews, and never quote them in marketing.

**What the panel saw:** `cover.png`, `mockup.png`, all 38 color pages (`preview/p01–p38.png`), low-ink pages 11, 20 and 22, both START HERE files, listing images 01–10 and `listing.json`.

## What the panel said

**New parent (baby, 5 months):** "It's not for us yet, and the cover says so clearly, which I like. I'd bookmark it for later. The grown-up promises page, 'I'll follow our phone-free zones and times too', is something I could start doing now. Nothing here made me feel behind."

**Worried parent (10-year-old, first phone at Christmas):** "Buy. 'You won't be in trouble for telling' is the line I needed. But the quick answers never say what to do *on the night* my kid shows me something upsetting. I'd want two calm sentences for that. Also, page 4 prints `(page ${P.checkin})` in the middle of a sentence, which made me wonder what else was unfinished."

**Grandparent gift-buyer:** "Maybe. The 'first phone gift' angle is lovely, but I can't tell how you give a download, or whether the family can use my copy. The certificate has a big empty gap under the picture. It looks unfinished, and there's no line for a grown-up to sign."

**Parent of an 11-year-old:** "Buy. The fridge-door plan and 'screens have a spot in the day' are exactly our arguments, solved. What's missing is the thing we actually negotiate: *which* apps and games are OK. Without naming anything, give me a blank 'yes-list' on the agreement. And the heading 'My grown-ups promise' reads like a typo."

**Child, age 11:** "The certificate is cool, and so are the signs. 'Grown-up handles knives' on Cook a snack is babyish: I make toast and cut apples. The three badges all say the exact same thing. And the agreement is all stuff I promise; where does it say what I *get* to use the phone for?"

**Preschool teacher (4s):** "Not for my class, and it doesn't pretend to be. I liked that the little-sibling safety lines are there: no marbles for under-3s, no whole grapes for toddlers. I'd recommend it to parents of my students' older siblings. No changes from me."

**Child-care director (before- and after-school program, ages 5–12):** "I'd love the 30 afternoons and the 'phone-free afternoon in progress' sign for my school-age room. But the license is one family, and the listing doesn't say whether a program can buy one. Tell me plainly, even if the answer is no."

**PTA leader:** "I'd run a 'first phone' parent night around this. Can the PTA buy one and copy the agreement for every family? The listing doesn't answer that. The Explorer/Adventurer/Champion badge row is also misaligned on page 19."

**Speech-language pathologist:** "Would recommend it to families as everyday conversation, and it isn't clinical. 'Ask, then wait. Count to five in your head' is exactly right. 'Numbers by heart' is a memory task some kids find hard; say that a written copy in their bag is fine too. Knowing where to find the numbers is the real skill."

**Occupational therapist:** "Buy. Movement, building and outdoor ideas each have a 2-minute version, which suits kids who tire or get overwhelmed. 'Stop a game when the timer rings, 5 days in a row' sets up a streak that one hard day wipes out. Make it 5 days, any 5."

**Autistic adult self-advocate:** "Mostly yes. 'A thumbs-up or a quick message counts as talking' is right, and nothing here is about fixing a child. But 'I look up when I'm … talking to someone' is an eye-contact rule dressed as a phone rule. Put the phone away, fine; where my eyes go is my business. 'Call a relative and chat for 5 minutes' also sets a timer on a hard thing."

**Spanish-speaking parent:** "Buy, if I know what I'm getting. Nothing in the listing says the kit is English only. And can I type our promises in Spanish in the fillable boxes? If I can, say so. That would sell it to me."

**Children's librarian:** "I'd put a copy on our tween display and use the 30 afternoons at a program, but the license doesn't say whether a library can. The 'Pick your colors' page is mostly empty and doesn't tell you which pages hold Sky and Plum. 'Library trip' and 'Snail mail' are my favorite ideas."

**Panel scores (customer-voice rule 12):** "made me feel judged" 1/5 and "preachy" 2/5 ("Eyes up, life first" and "Friends in the room come first" read a little preachy to the 11-year-old). Both are at or under the limit of 2.

## What changed (product lead)

Every change stays inside BRAND.md: no health or clinical words, no named apps, companies or services, no new citations, no machine translation, no pricing tricks, and no school-, PTA- or center-facing offer while those stay on hold.

| Issue | Raised by | Fix | Where |
|---|---|---|---|
| The guide printed `(page ${P.checkin})` instead of a page number (and showed it in listing image 3) | Worried parent | Fixed the template string. It now reads "(page 25)", or the right page in each edition. No `${` is left in any output. | `build/build.js` guide2; p. 4; listing-03 |
| No calm "what do I do if my child shows me something" answer | Worried parent | New quick answer: "Thank them for telling and stay calm. Don't reply or delete anything yet; save a copy so you can look at it together, then talk it through. If someone may be at risk right now, call your local emergency number." To make room, the phone and tablet/console answers are merged into one. The Etsy START HERE "Questions?" card mentions it. | `content.js` FAQ; p. 6; START HERE (Etsy) |
| Eye-contact demand: "I look up when I'm … talking to someone" | Self-advocate | Now "I put my phone away when I'm walking, crossing streets or talking with someone." | `content.js`; pp. 10, 28, 33 |
| Streak pressure: "5 days in a row" | OT | Now "on 5 different days." | `content.js` mission 9; p. 8 |
| A timed phone call ("chat for 5 minutes") | Self-advocate | Now "chat for a few minutes." | `content.js` mission 10 |
| Memorizing numbers is the only route | SLP | "Learn two grown-ups' phone numbers. Say them at dinner, and keep a copy on a card in your bag." | `content.js` mission 2 |
| "Grown-up handles knives" is babyish at 9–12 | Child | Cook a snack and Picnic now say "Knives (and the stove) only with a grown-up right there." Craft knives stay grown-up only. The challenge page's safety card and the printing/safety page match. | `content.js`; `build.js` tips and challenge; pp. 5, 19, 22, 23 |
| No place to write what the phone is *for*, or which apps and games are OK | Parent of 11, child | "Our phone basics" gains **My phone is for** and **Our yes-list** fields: "the apps, games and groups you've agreed on. Add to it together at each check-in." Nothing is named. "Next steps" drops to one line to make room. | `build.js` agree2; pp. 11, 29, 34 |
| "My grown-ups promise" reads like a typo | Parent of 11 | Now "What my grown-ups promise" (agreement page 2 and the write-your-own page). | `build.js`; pp. 11, 12, 29, 34 |
| The three badges said the same thing, and "Afternoon Adventurer" wrapped out of line | Child, PTA leader | Each badge now has its own celebration: Day 10 "you pick the family game tonight", Day 20 "plan a walk or ride somewhere new", Day 30 "certificate, plus a together treat you choose". None of them is screen time (rule 13). Titles set to 10 pt on one line. | `build.js` challenge; p. 19 |
| Certificate had an empty band and no grown-up signature | Grandparent, child | Added "For 30 afternoons of building, riding, cooking, inventing and exploring, and for planning your own time" and a fillable "Signed by a proud grown-up" line. | `build.js` certificate; pp. 26, 32, 37 |
| Colorways page mostly empty, and it didn't say where Sky and Plum are | Librarian | Each swatch now lists its pages: Tomato pp. 10–11, 18, 20, 26; Sky pp. 28–32; Plum pp. 33–37. | `build.js` colorsIntro; p. 27 |
| The listing never said English only, or that the fields take any language | Spanish-speaking parent, librarian | New `language` field; "English text." added to `format`; a Spanish FAQ answer: "Every fillable field accepts Spanish or any language … A Spanish edition would be made by a human translator, never by machine." | `listing.json` |
| No answers for gifts, grandparents, a boxed version, groups or refunds | Grandparent, PTA, director, librarian | Added `faq` with 14 answers. Gifting is marked [VERIFY]. | `listing.json` faq |
| Unclear whether a PTA, library or program may use it | PTA, director, librarian | Added `license_tiers`: the personal tier (one family's homes, grandparents and sitters included), plus a group/program row marked "Not offered": those licenses stay on hold until employment counsel answers in writing. The FAQ says so plainly, and each family can buy its own copy. | `listing.json` |
| Field counts and `human_todo` out of date | Product lead | `format` now says 595 fillable fields (color) and 369 (low-ink). Todos added: confirm the gift answer, have counsel read the "something worrying" answer, the post-counsel license decision, and a human Spanish edition. The old "run the panel" todo now asks for real testers. | `listing.json` |

**Not changed, and why:**
- **A group, library or PTA license.** All school-, PTA- and center-facing work is on hold until employment counsel answers (BRAND-RESPECT-PLAN.md). The listing says so honestly instead of selling one.
- **A Spanish edition.** Only a human translator may make it. It's listed in `human_todo`.
- **"Eyes up, life first" and "Friends in the room come first."** The preachy score is 2, within the limit. These are pick-if-it-fits promises the family ticks, and the founder may rewrite them in `content.js`.
- **A boxed or printed kit.** That's the KDP workbook in `amazon_route`, still not built.
- **Still open:** the founder's note placeholder on page 4, human rewriting of all text, and knockout name searches.

**Rebuilt:** `bash build/make-all.sh`. The layout check (`check.js`) passes on all 8 kit editions and both START HERE files. The color files are 38 pages with 595 fields and the low-ink files 27 pages with 369 fields. Each PDF is about 4.5–4.8 MB (limit 15 MB). The previews, `cover.png`, `mockup.png`, all 10 listing images, `downloads/` and `etsy-upload/` are regenerated. `source.html` is also regenerated.
