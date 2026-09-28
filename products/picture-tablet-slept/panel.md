# Customer panel: The Day the Tablet Slept

September 28, 2026. This is a simulated panel, not real customers, so treat the comments as a checklist and not as reviews, and never quote them in marketing. The panel looked at the front cover, `mockup.png`, the back cover and pages 1–4, 6–7, 9–11, 13, 15, 17–32 (the `preview/` PNGs).

## What the panel said

**New parent (a 1-year-old and a 4-year-old):** Buy. The refrain and "zzz-bip" are exactly what my 4-year-old will shout, and the book doesn't make me feel bad about the tablet. I wanted to spot her slippers on the wrong feet on the first page, but they looked normal.

**Worried parent (anxious about screens):** Buy. I like that the tablet isn't a villain; it just naps, and nobody lectures my kid. With a preschooler cracking a raw egg, I'd like one line about washing hands and who handles the stove.

**Grandparent gift-buyer:** Probably buy, but I'd rather give a hardcover, and it isn't available yet. I love the dedication page. I need to know it can go straight to my grandson with a gift note.

**Preschool teacher:** Buy for circle time. The call-and-response refrain and the WOOF! are great for a group. Please tell me plainly whether I can read it aloud at storytime, and whether we can record it for families.

**K–5 teacher:** Buy for K–1, and as a buddy-reading book for older kids. I love the open "Talk about it" prompts because none of them is a quiz. It's too young for grades 3–5, and the listing's "ages 3–7" is honest about that.

**Child-care director:** Would buy 10 copies if bulk ordering is easy. The safety note on the copyright page is good. I need a bulk or quote answer in the FAQ without having to email.

**PTA leader:** Maybe. It would anchor a "Play Day" family night, but there's no event kit for it yet. The free planner makes a good take-home.

**Speech-language pathologist:** Would recommend it to families. The refrain, the "say what you see / repeat and add one word" tips and the no-wrong-answer prompts are exactly right. It's missing an explicit fill-in pause ("So what shall we ___?") and any word that signing, pointing or a speech device counts.

**Occupational therapist:** Buy. Blocks, puddle jumping, stirring and box-building are lovely sensory and motor play. I'd add one movement prompt, a calm one, since this is a bedtime book.

**Child, age 5 (listening):** "Again! The socks planet! WOOF!" "What is the tablet dreaming about?" "Where are her wrong-feet slippers?"

**Autistic adult self-advocate:** Mostly yes. I'm glad the tablet is friendly and nobody shames kids who like tech. But for some kids a tablet is their voice, so the grown-up page must say a talker never "takes a day off." Also, "Let them shout" should allow whispering, signing or pointing, because not every kid can shout.

**Spanish-speaking parent:** Buy. I'll read it in Spanish as I go, and the sounds work in any language. I love the "every language counts" line. I'd buy a bilingual edition in a heartbeat, and the FAQ should say whether one exists.

**Children's librarian:** Would buy the hardcover for the collection, but not the paperback. I winced at a librarian shushing a child ("Books like it quiet"): libraries aren't like that anymore, and it's a tired stereotype. I also need BISAC subjects and ideally an LCCN, and I'd like to know how you handle online storytime.

**Panel scores (customer-voice rule 25):** "made me feel judged" 1/5 and "preachy" 1/5 (the limit is 2 or lower).

## What changed (product lead)

| Issue | Who raised it | Fix | Where |
|---|---|---|---|
| The librarian shushes a child, a stereotype | Librarian | The text now reads "“Welcome!” said Ms. Rosa the librarian. “Sleepy stories live here.”" In the picture she waves hello instead of shushing. The spread is still 40 words. | `WORDS.md` s10 right; `build.js` spreads.s10 |
| The cast is not varied enough (rule 35) | SLP, self-advocate | Ms. Rosa now wears glasses. | `build.js` rosa-head symbol |
| No word that a sign, a point or a talker counts (rule 28) | SLP, self-advocate | The grown-up tip now says "A sign, a point or a tap on a talker (a device a child uses to talk) counts too, and a talker never takes a day off." | `build.js` p29 |
| "Let them shout" leaves some children out | Self-advocate | Now reads "Shout, whisper, sign or point along to the “Shhh…” and the “WOOF!”" | p29 |
| No fill-in pause (rule 30) | SLP | Tip now says "pause before “do?” and let your child fill it in." | p29 |
| No movement prompt | OT, child | Prompt 6 is now "Blast off slowly: crouch for “Ten, nine…”, then stretch up tall on “ONE!”" It replaces the plan prompt, which page 30 already covers. The list was tightened so it all fits. | p29 |
| No egg hygiene or stove line | Worried parent, child-care director | The copyright page adds "Grown-ups handle the stove, and everyone washes hands after cracking eggs." | p2 |
| The wrong-feet slippers can't be seen | New parent, child | Ada's slippers now point inward on the first spread. | `build.js` person() `wrongFeet`, spreads.s1 |
| "What is the tablet dreaming about?" | Child | The tablet now has a dream bubble with a sock from the socks planet, which replaces its zzz. | `build.js` spreads.s12 (p26) |
| The Afternoon icon was a rocket, but the rocket is a Morning choice | Child, preschool teacher | The icon is now a pancake. Bedtime gets a third choice, "Make one up", so every row has three. | p30 |
| The listing said "all over Papa's shoes", but the story says "all over Papa" | QA | Fixed, and "a quiet trip to the library" now reads "a trip to the library's sleepy-story corner". | `listing.json` long_description |
| "Inclusive cast" was an overclaim | Self-advocate | The bullet now says "a warm, varied cast (Papa is the everyday grown-up; Ms. Rosa the librarian wears glasses)". The last bullet names the sign, point and talker line. | `listing.json` bullets |
| No BISAC subjects | Librarian | Added `bisac`: Humorous Stories, Imagination & Play, Animals / Dogs, Books & Libraries [VERIFY], with no condition codes. | `listing.json` |
| Questions a buyer would otherwise email | Grandparent, teachers, director, Spanish parent, self-advocate | Five FAQ entries added: talker fit, gift orders, storytime and online read-alouds, bulk orders by quote form, and Spanish edition (not yet). | `listing.json` faq |
| Things only the founder can do | Librarian, teachers, Spanish parent, SLP | Four human_todo items added: LCCN/PCN (and considering the hardcover sooner for libraries), a saved answer for read-aloud permission, adding a child who signs or uses a talker in the next book's cast, and a bilingual edition only after sales, with a human translator. | `listing.json` human_todo |

Rebuilt with `node build.js` and re-rendered all 32 preview pages and `picture-tablet-slept.pdf` (32 pages, 8.625 × 8.75 in, reset with `fix-pdf-size.py`). I re-checked pages 2, 4, 22, 23, 26, 29 and 30: nothing is clipped or overlapping, and the text stays inside the safe zone. Every spread is 36–40 words. The covers, back cover and mockup don't show anything that changed, so they are unchanged.

## Heard but not changed (and why)

- **Hardcover now (grandparent, librarian):** DEMAND-CHECK.md says to turn it on after the paperback sells. That call belongs to the founder, and it's now in human_todo alongside the library point.
- **Play Day family-night kit (PTA):** Group kits are on hold until counsel answers (customer-voice section 5). Noted as a future product.
- **Content for grades 3–5 (K–5 teacher):** Out of scope. The book stays ages 3–7.
- **A child who signs or uses a talker in this story:** Adding a character would change the founder's story and art in a big way. It's queued for the next book's cast instead.
- **Spanish or bilingual edition:** Needs a human translator and its own ISBN. It's in human_todo, and the FAQ answers "Not yet" honestly.
