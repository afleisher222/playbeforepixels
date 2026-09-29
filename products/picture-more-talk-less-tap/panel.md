# Customer panel: The Add-One Chain Classroom Game Kit (with the bonus story *More Talk, Less Tap*)

*Renamed September 29, 2026 (brand/ORIGINALITY.md A12, D9). This panel reviewed the first edition, which used the retired name and stacked paper "blocks"; the kit now uses paper-chain links, so "block" and "tower" in the quotes below mean today's links and chain.*

September 28, 2026. This panel is simulated, so none of these people are real customers. Use the comments as a checklist, not as reviews, and never quote them in marketing. The product is still `held-pending-counsel`.

The panel looked at `cover.png` and `mockup.png`, and at kit pages 1–6 and 10–25 (`preview/`). They also saw ink-saver pages 6 and 20, START HERE, slides 3 and 20, and story pages 6, 20, 22, 28, 30 and 32.

## What the panel said

**New parent (child aged 2½):** Maybe. The family pages are what I'd use at home, and "pass is always OK" is lovely. But everything says "teacher" and "class", so I couldn't tell whether I'm even allowed to buy it for home.

**Worried parent (quiet 4-year-old):** Buy, or ask the teacher to. No winners, no blocks taken away and "no child is made to talk" all put my mind at rest. What worries me is a sheet with my child's name and every turn they took. I'd hate to see it taped to the classroom wall.

**Grandparent gift-buyer:** Buy it for my granddaughter's pre-K teacher. It looks cheerful and finished, and $6.99 is an easy gift. I need to know how to send it to her, and whether the license is then hers.

**Preschool teacher:** Buy. The one-page script is exactly what I need on a Monday. Some things don't add up, though:
- There are 8 blocks of each color. My 18 kids will use up the green ones in one round of Add-One Story Tower.
- The script runs about 10 minutes and uses all four blocks, but page 3 says to start 3-year-olds on two blocks and 3–5 minutes.
- The blocks go "above the poster". Three-year-olds can't reach that high, and tape is hard for them to handle.
- The cover says 6 games, but the listing says 7.

**K–5 teacher:** Buy for K–2 only; it's too young for grades 3–5, and the "ages 3–7" label is honest about that. The make-it-harder options help my first graders. I'd like to see which speaking-and-listening standards it supports, and I'd like the prep time for each game at a glance.

**Child-care director:** Buy the site license; $12.99 for the whole center is a gift. I'd need two things:
- The family page footer only lets "teachers" copy it, and my floaters and assistant directors aren't teachers.
- Individual turn tracking has to stay private, because it counts as a child record here.

**PTA leader:** Maybe. I'd gladly buy the site license for our school as a thank-you, but the license only mentions staff. Can a PTA buy it? And can our volunteers use it at family night?

**Speech-language pathologist:** Would recommend it to teachers. The talk tips are plain and right (pause and wait, repeat and add one word, follow their lead), and "every way of talking counts" is the best part. One thing is backwards: it starts 3-year-olds on ASK and LISTEN. Saying something back comes before asking a friend a question, so start with COMMENT and LISTEN.

**Occupational therapist:** Buy. The rolled ball, the soft star and the big blocks are good choices. Circle time needs room for bodies that have to move, though; a child who stands or rocks can still be listening. A paper star is hard to hold, and a craft-stick handle would help. Pre-rolled tape loops would let children stick their own blocks up.

**Child, age 5 (listening):** "Can I put the star on the top? It's on the top on the front!" "Why is it called Less *Tap*? Is it the fish?" "What if the blocks run out?"

**Autistic adult self-advocate:** Mostly yes. "Show you are listening, your way", counting a device tap as a turn, and "pass" earning a listen block are all what I'd want. Several lines still assume speech and stillness:
- "Whoever holds the star talks."
- "We built that with our words and our ears."
- "Everyone claps", which is hard for kids who find noise painful.
- The story's "listens with their eyes, their ears and their whole body", which is the eye-contact rule dressed up.
- The family letter says "you need no screens" and then counts device taps. It should say plainly that a talker is a child's voice, not screen time.

I'd also like to see a child in the pictures who signs or uses a talker.

**Spanish-speaking parent:** Buy, if the teacher sends home a Spanish letter. "Talk, sing and read in the language you know best" and "children may take their turn in the language they know best" mean a lot to me. The family pages are English only, and the listing should say so honestly.

**Children's librarian:** Buy the site license; "library site" is named, which almost nobody does. The family page says "teachers may copy", and I'd want to hand it out at storytime. I also need a clear answer about online storytime.

**Panel scores (customer-voice rule 12):** "made me feel judged" 1/5 and "preachy" 1/5. The limit is 2 or lower.

## What changed (product lead)

Every change stays inside BRAND.md. There are no health or clinical words, no named schools or products, no machine translation and no new citations.

| Issue | Raised by | Fix | Where |
|---|---|---|---|
| The cover said "6 circle-time games"; the listing says 7 | Preschool teacher | The cover stat now reads **7** circle-time games, and the mockup picks it up | `build/kit.js` cover |
| 8 blocks of each color run out with a whole class | Preschool teacher, director, child | Each block page now says "8 per page: for more than 16 children, print it twice", and Quick start and START HERE say the same. Variations 2 and 5 name the page to print twice. The script has "The blocks run out: Reuse them each round, or add tally marks on the board." | kit p2, p4, p6–9, p18–19; `build/start.js` |
| The script (10 min, four blocks) contradicted the 3–4 guidance on page 3 | Preschool teacher | The script header now reads "About 10 minutes (3–5 for ages 3–4, page 3)" | kit p4 |
| 3-year-olds started on ASK, but commenting comes first | SLP | Ages 3–4 now start with COMMENT and LISTEN only. "Why it works" adds "For the youngest, saying something back comes before asking a friend a question, so start there." The FAQ matches. | kit p3; `listing.json` faq |
| Blocks go above the poster, out of small children's reach | Preschool teacher, OT | Quick start step 2 now says "Put up the poster low… pre-roll tape loops so children can stick their own, and you add the high ones." | kit p2 |
| "Whoever holds the star talks" assumes speech | Self-advocate | Now "takes a turn" in the script, on the star page and in slides 3 and 17. The script adds "Everyone else listens, their own way." | kit p4, p13; `build/slides.js` |
| "We built that with our words and our ears" | Self-advocate | Now "We built that together, one turn at a time." Step 1 now says "build something by taking turns to talk", and slide 1 says "Let's build a tower, one turn at a time!" | kit p4; slides |
| No room for children who need to move | OT | New script item "A child needs to move: Let them stand or rock nearby. A moving body can still listen." | kit p4 |
| The star is hard for small hands | OT | The star page now suggests a craft-stick handle, in both color and ink-saver | kit p13 |
| "Can I put the star on top?" | Child | Script step 5 now says "The last child puts the Talking Star on top." | kit p4 |
| "Everyone claps" | Self-advocate | Now "Everyone cheers their way: clap, wave or a silent cheer." | kit p18 |
| The bonus page's "Invite everyone to shout" | Self-advocate | Now "join in on 'CLACK!' and 'Up it goes!', loud or whisper-quiet" | kit p23 |
| Story: "listens with their eyes, their ears and their whole body" | Self-advocate | Ms. Poppy now says "Whoever holds the star gets a turn. Everybody else listens, in their own way." | `story-bonus/build/build.js` p22 |
| Story games: "shares an idea out loud", "A good follow-up question" | Self-advocate, QA (judging word) | Now "…shares an idea, they add a block. Words, signs and pointing all count." and "A follow-up question counts too!" The back-cover blurb drops "out loud". | story p30, p32 |
| "Why is it called Less *Tap*?", and "tap" could read as knocking device users | Child, self-advocate | The bonus page adds "the 'tap' in the title? It is the rain on the window and Bubbles the fish. A tap on a talking device is talk, and it always earns a block." | kit p23 |
| "You need no screens", yet device taps count | Self-advocate | The family tip adds "A talking device is a child's voice, not screen time." The FAQ says the same. | kit p20; `listing.json` faq |
| The certificate's "tower of words" and "said kind things back" | Self-advocate | Now "Our class built a Add-One Chain!" and "…listened to our friends, every way we talk." (The title uses NAME, so a rename carries through.) | kit p22 |
| Individual tracker on the wall | Worried parent, director | The tracker now says "Keep it in your folder, not on the wall." | kit p12 |
| Family page footer said only teachers may copy it | Librarian, director, PTA | The footer now says "Licensed buyers may copy this page for the families they serve." The sign-off reads "(teacher or group leader)". | kit p20–21 |
| Can a parent or homeschooler buy it? | New parent | The license table now says "One teacher (or one homeschooling family)", and START HERE matches. Flagged for counsel. | kit p24; `build/start.js` |
| Can a PTA buy it? | PTA leader | The license page adds "A PTA or parent group may buy the site license for its school." Flagged for counsel. | kit p24 |
| No prep time for each game (customer-voice rule 4) | K–5 teacher, director | Each variation now shows its prep: none for games 1, 2, 3 and 5, "find a soft ball" for 4, and "1 min to fill the bag" for 6. The intro says the games need nothing to buy and make no mess. | kit p18–19 |
| START HERE's safety line was ambiguous ("nothing smaller than a toilet-paper tube opening") | QA | Now "nothing small enough to fit through a toilet-paper tube" | `build/start.js` |
| The "Every way of talking counts" slide used the LISTEN ear | Child, QA | It now uses a plain speech-bubble icon | slide 3 |
| Questions a buyer would otherwise email | Grandparent, PTA, librarian, Spanish parent, new parent | Added a `faq` with 13 entries covering what's inside, formats, prep, delivery, license, gifts, PTA, library storytime, signs and devices, Spanish, ages, refunds, and Amazon and other stores. Answers that depend on counsel or the platform are marked. | `listing.json` |

I rebuilt everything with `node build/build-all.js`. Then I re-checked these pages, and nothing is clipped or overlapping:
- Letter pages 1, 2, 3, 4, 13, 18, 19, 20, 22, 23 and 24
- A4 pages 3, 4 and 19
- ink-saver page 20
- slide 3 and START HERE
- story pages 22, 30 and 32

Pages 3 and 4 overflowed on the first pass. I tightened the wording and they now fit on both Letter and A4.

There are still 7 downloads, all under 15 MB (the largest is 2.98 MB). The page counts haven't changed: 1, 25, 25, 25, 25, 20 and 32. `compliance_notes` records the panel changes, and three items were added to `human_todo`.

## Heard but not changed (and why)

- **Spanish family pages (Spanish parent):** BRAND and `human_todo` require a fluent human translator, and nothing may be machine-translated for sale. The FAQ now says honestly "Not yet".
- **A child who signs or uses a talker in the art (self-advocate):** A new character is a cast decision for the founder's own creative contribution, and it has to match across the kit and the story. Added to `human_todo`.
- **Standards alignment (K–5 teacher):** The exact standard wording needs checking first [VERIFY]. Added to `human_todo`.
- **PTA family-night use and library online storytime (PTA, librarian):** These are license terms, so they go to counsel. The FAQ answers are marked "[counsel to confirm]" and are in `human_todo` with the homeschool and PTA license lines.
- **Gift delivery to a teacher's inbox (grandparent):** This depends on the store platform. The FAQ says to forward the download email and carries a [VERIFY].
- **Family-night event kit (PTA):** Group and event kits are held until employment counsel answers. Noted as a future product.
- **Under-3 version (new parent):** The kit is for ages 3–7. The family page's safety line covers younger siblings, and page 25 points to 52 Play & Talk Cards for 0–5.
- **Story dialogue "We built all that with our words!" / "And our ears," said Sam (self-advocate):** I kept this line because it's a character's line in the story, not an instruction to children. The story's turning point already celebrates listening as a way to take part, and the kit's own script line was changed.
