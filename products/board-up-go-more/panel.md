# Customer panel: Up! Go! More!

September 28, 2026. This is a simulated panel, not real customers. Use the comments as a checklist, never as reviews, and never quote them in marketing.

**What the panel saw:**
- `cover.png` and `mockup.png`
- the full paperback cover wrap
- board-book pages 2–26 (the how-to-read page, all 22 word pages, "Keep the words going" with the copyright block, and the back cover)
- paperback pages 1–4 and 25–32 (title, copyright, note for grown-ups, how to read, hug, night-night, routines, word list, add your own words, bonus QR, series and the end)

## What the panel said

**New parent (first baby, 7 months):** Probably yes. It's calm and bright, and "you don't need to read every tip" takes the pressure off. I wasn't sure what to do with a baby who can't copy anything yet. The FAQ should tell me babies just look and listen at first.

**Worried parent (worried about screens and talking):** Buy. "Every child talks on their own timeline" and "a look counts as a turn" calmed me down. "Made for laps, not screens" on the back stung a little, as if I'd done something wrong. "Just you, your voice" also assumes everyone talks with their voice.

**Grandparent gift-buyer:** Buy the paperback. The mockup shows a board book next to it, but I can't find one anywhere. Don't show me something I can't buy. I love that one of the grown-ups is a grandparent.

**Preschool teacher (2s room):** Buy for circle time. The huge words and the say/sign/act cues work well with a group. The signs are only described in words, though, and I'd like pictures of the handshapes. I also need to know whether I may read it aloud at storytime.

**K–5 teacher:** Not for my classroom, since the ages are 0–3. I'd suggest it to families with a baby at home, and it would suit older-buddy reading. The tips are clear enough for a 9-year-old to follow.

**Child-care director (infant and toddler rooms):** Maybe. A paperback in an infant room won't last, so I'll wait for the board book. The "Keep the words going" page makes a great wall sheet for the staff. I need a way to order 12 copies without phoning anyone.

**PTA leader:** Maybe, as a welcome gift for families with new siblings. It's affordable. I need bulk ordering on a quote form, and a clear note that it's printed on demand.

**Speech-language pathologist:** I'd recommend it to families. Pause and wait, add one word, offer a choice and follow the lead are all in plain words, and nothing promises a result. Two problems. The book never says that a tap on a talking device counts as communicating. And "all done" is usually taught as a twist of open hands, not a side-to-side shake.

**Occupational therapist:** Buy. Stomping, clapping, reaching and crouching are good whole-body moves, and the book never demands a perfect sign. On the "help" page the child isn't reaching for the duck. His hand is on his cheek, even though the tip says a reach is asking. Paper pages are hard for small fingers, so I'd point families to the board book once it exists.

**Child, age 5 (listening):** "Peekaboo! Why does she have a box on her face?" "The duck is up high. Get it, baby!" "The tablet is sleeping!" "The end. Night-night, book!" (Again, please.)

**Autistic adult self-advocate:** Mostly yes. Nothing forces eye contact, and "a look, wave or sound counts" is respectful. Please say that signing and a talker (AAC) count too. "Just you, your voice" leaves out signing families. The hug page assumes every child likes a squeeze, so offer another way. Everyone in the cast looks typical. Add glasses or a hearing aid in passing.

**Spanish-speaking parent:** Buy, and I'll read it in Spanish. I'm glad about "the language you know best". I'd like it to say that every language counts. The word list and "Add your own words" pages should invite our home-language words too. I'd buy a bilingual edition.

**Children's librarian:** I'd wait for a sturdier format. Library paperbacks for 0–3 don't last long, and I'd want BISAC subjects and ideally an LCCN. The design is excellent for lapsit storytime: big words, one picture per page and a clear rhythm. I need to know whether online storytime readings are allowed.

**Panel scores (customer-voice rule 25):** "made me feel judged" 2/5 before the fixes and 1/5 after; "preachy" 1/5 (the limit is 2 or lower).

## What changed (product lead)

| Issue | Who raised it | Fix | Where |
|---|---|---|---|
| Nothing says a sign or a device tap counts (customer-voice rule 28) | SLP, self-advocate | How-to step 2 now reads "A look, a point, a sign, a sound or a tap on a talking device is your child's turn." The listing adds the same line. | `build/build.js` howTo; `listing.json` long_description and bullet 3 |
| Home-language line was incomplete (rule 28) | Spanish-speaking parent | The note now ends "Talk, sing and read in the language you know best. Every language counts." (both editions) | `build/build.js` howTo |
| Word list and own-words pages assumed spoken English | Spanish-speaking parent, self-advocate | The word list now says "Tick a word the first time your child says, signs or taps it, in any language". The own-words page adds "words in your home language". | `build/build.js` keepsakePage, ownWordsPage (paperback p28, p29) |
| "Just you, your voice" leaves out signing families | Self-advocate, worried parent | Now "No screen needed. Just the two of you, and a little time to wait." | `build/build.js` routinesPage (board p25, paperback p27) |
| "Made for laps, not screens" reads as blame (rule 25: add, don't take away) | Worried parent | The back cover now says "Made for laps and back-and-forth." The listing says "built for laps and back-and-forth". | `build/build.js` back; `listing.json` |
| The peekaboo child seemed to have "a box on her face" | Child, new parent | The cloth is gone. Both hands now cover her eyes, with the fingers showing against her hair and her smile peeking out below. | `build/build.js` scenes.peekaboo (board p04, paperback p06) |
| On the "help" page the child's hand sat on his cheek instead of reaching | OT, child | The child now stands under the shelf and reaches up toward the duck. The grown-up waits with an open hand instead of pointing. | `build/build.js` scenes.help (board p14, paperback p16) |
| The cast didn't include glasses, hearing aids or signing (rule 35) | Self-advocate | The grandparent (stop, clap, book) now wears glasses. The curly-haired toddler (down, ball, wow, cup, hug) now wears a hearing aid. These are shared symbols, so they look the same on every page. | `build/build.js` glasses symbol, kid() `aid`, ADULTS.G4, KIDS.C |
| The hug page assumed every child likes a squeeze | Self-advocate | The tip now reads "Put “hug” in any tune you know and squeeze on the last one. Not a hugger? A high five works too." (22 words, under the 24-word cap) | `build/manuscript.json` hug |
| "All done" sign wording | SLP | Now reads "Open hands up, twist back and forth". The ASL check stays in human_todo [VERIFY]. | `build/manuscript.json` all done |
| Care line wording didn't match rule 22 | QA against CUSTOMER-VOICE fix list | The paperback copyright page now reads "Paper pages: read together and keep away from mouths." | `build/build.js` copyrightPage (paperback p2) |
| The mockup showed a board book that can't be bought | Grandparent, child-care director | The caption now reads "board book · coming later". | `build/mockup.html` → `mockup.png` |
| Questions buyers would otherwise email | Everyone | Added an 11-question `faq`: ages (babies look and listen; paper pages are for sharing), what's inside, board book (not yet), delivery, gifts, whether the signs are a course, talking devices, home languages and Spanish (not yet), storytime and online read-alouds, bulk orders by quote form, returns. | `listing.json` faq |
| No BISAC subjects | Librarian | Added `bisac`: Concepts / General (fiction and nonfiction) and Sign Language, all marked [VERIFY]. None names a condition. | `listing.json` bisac |
| Things only the founder can do | Librarian, teachers, SLP, Spanish-speaking parent | Six human_todo items added: the 0–3 vs "18 months and up" label decision, PCN/LCCN, a saved reply for read-aloud permission, handshape drawings on the bonus fridge sheet, a signing or AAC child and a later bilingual edition (human translator) for books 2–3, and a proof check of the navy pages. | `listing.json` human_todo |

**How it was rebuilt and checked**
- Rebuilt with `bash build/render-all.sh`, which re-rendered `source.html`, `board-up-go-more.pdf` (26 pages), `preview/`, the paperback interior (32 pages, 621 × 630 pt) and cover wrap (1247.4072 × 630 pt, 17.3251 × 8.75 in), `paperback/preview/`, `cover.png` and `mockup.png`.
- Re-checked pages:
  - Board: p02, p04, p06, p08, p12, p14, p15, p18, p22, p23 and p25.
  - Paperback: p02, p04, p28 and p29.
  - The cover wrap and the mockup.
- Results: nothing is clipped or overlapping, the text stays inside the safe zone, the how-to page still fits above "This book belongs to", and the glasses and hearing aid show clearly at page size.
- Listing limits still pass: long description 240 words, short description 121 characters, SEO title 54, SEO description 141, 5 bullets, 7 keywords, no diagnosis terms.
- Nothing has shipped, so the files stay at Version 1.0 (rule 3 applies once the book is on sale).

## Heard but not changed (and why)

- **Board book now (grandparent, director, librarian, OT):** A board book needs an offset print run held by a fulfillment warehouse (Wave 3; no inventory rule). The mockup and FAQ now say it isn't available yet.
- **Handshape pictures in the book (preschool teacher):** Drawing five signs well needs its own page, and the 32-page plan is full. They go on the free bonus fridge sheet instead (human_todo).
- **Ages 0–3 on a paper book (librarian, director):** This is the founder's call, as item 2 in the CUSTOMER-VOICE fix list. It's in human_todo. The FAQ already says a paperback is for sharing, not for a baby to chew.
- **Spanish or bilingual edition (Spanish-speaking parent):** It needs a human translator and its own ISBN, and it comes after sales. The FAQ says "not yet" honestly.
- **Material for grades K–5 (K–5 teacher):** Out of scope. The book stays ages 0–3.
- **The "up" child's hands are at head height rather than high overhead:** The big arrow carries the meaning, and longer arms would break the cast's proportions. Left as is.
- **Large navy pages (night-night, the end) on print-on-demand paper:** They are kept for the bedtime mood. The printed proof must be checked for even ink (human_todo).
