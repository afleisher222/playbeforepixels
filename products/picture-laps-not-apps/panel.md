# Laps Not Apps (personalized): customer panel

**September 28, 2026.** This panel is simulated. The reviewers opened the cover, the mockup, the picker and all 34 preview pages (sample order: Maya, Look 1, she/her, from Aunt Lily). They also saw test orders for an Etsy customer with a long name and a Spanish-speaking family (Sofía Ñúñez, "Abuela"). Their comments are written in their own voices below. The fixes come after the comments.

**Result: 9 would buy, 4 would not.** The four no's are the K–5 teacher, the child-care director, the PTA leader and the children's librarian. Each said the reason is the format, not the quality: the book is personalized for one child, and they need a class, group or library copy. That idea is logged in the roadmap.

## What the panel said

**New parent (would buy, softcover).** "I teared up at 'Hop up here, Maya—it's the best seat in town,' and the Lap talk tips are short enough that I'd actually use them. It's sold as a baby-shower gift, but the back said ages 2–6, so I wasn't sure it was for my baby. Also, how long does it take to arrive? I need it before the shower."

**Worried parent (would buy).** "Dad's phone face-down on the side table is exactly the right tone: no lecture, no shame. But on the blanket-fort page the big brother is holding up what looks like a glowing phone. In a book called *Laps Not Apps* that jumped out at me."

**Grandparent gift-buyer (would buy, hardcover, if…).** "I'm the one buying this, and my grandkids call me Nana, not Grandma. Let me pick the name. I also want it shipped straight to my daughter's house, and I want to know the family in the book won't match everyone's family. I'd rather know that up front than be surprised."

**Preschool teacher (would buy as a gift).** "The 'stop before QUACK!' page is textbook turn-taking, and kids will shout it. The last page advertises 'Bring a Book shower inserts', but I couldn't find them anywhere, so don't advertise something parents can't buy. I'd love a class version for circle time."

**K–5 teacher (would not buy for class).** "It's lovely, but it's a toddler and preschool book, not one for my second graders. The 'a park full of laps' page shows one mom on a blanket and a pond. That's one lap, not a park full, and my kids would call that out."

**Child-care director (would not buy for the center; would recommend to families).** "The safety box is better than most: car seats, safe sleep, the small-parts test, stop when they say no. At $25–35 a copy it's a family gift, not something I can buy for 60 children. If there were a group order I'd look again."

**PTA leader (would not buy now).** "The 'Books before screens' pledge is the part I'd use at a family literacy night, and the hashtag line is gentle, not pushy. A personalized book doesn't work as a fundraiser without a group-order option."

**Speech-language pathologist (would recommend to families as a parent read-aloud).** "The Lap talk ideas are plain-words versions of what we actually coach: pause and wait, say what you see and add one word, offer a choice, the fill-in-the-blank song. The one thing parents always cut short is the wait, so tell them how long: 'count to five in your head.' And nothing here claims to be therapy, which is right."

**Occupational therapist (would buy for a niece).** "The lap games have the right safety lines: never pull or lift by the arms, gentle bounces only, cover your face and not theirs. Not every child wants to be on a lap, though. Some kids need their own space to stay regulated, and the book should say sitting beside you counts."

**Child aged 4–7, listening to it read aloud.** "The cat stole the seat! QUACK! Again! …Where's the cat on the 'one cat' page? I can't find it. And where are all the laps at the park? I only see one."

**Autistic adult self-advocate (would buy as a gift).** "I like that pointing, sounds and 'if they pull away, that's a no' are treated as real communication. But the grown-up page leaves out AAC: a tap on a talking device is talking too. The pledge says 'take a turn to talk', which quietly makes speech the goal. And yes to 'beside counts': being told a lap is the only way to connect is hard for a kid who doesn't like being held."

**Spanish-speaking parent (would buy if Abuela can be Abuela).** "'Talk, sing and read in the language you know best' made me feel welcome. Will my daughter's name print with the accent, Sofía? Can Grandma be Abuela? A full Spanish edition would be a must-buy for my family."

**Children's librarian (would not buy for the collection; would recommend it as a gift).** "The disability representation is natural. Grandma's wheelchair is part of the fun ('the very best wheels'), not the point of the story. A one-name personalized book has no ISBN edition for my shelves. For the text: 'a mouse-sized small whisper' feels padded, and I'd tighten it."

## What I changed (product lead)

Everything below has been edited, rebuilt, re-rendered and checked again. I checked the new preview pages 8, 20, 22, 24, 31, 32, 33 and 34 plus the mockup. I also checked the rendered test orders (sample, the Etsy long name, and Sofía/Abuela): all three build and fit (exit 0), and a real order is still stopped by the authorship gate (exit 3).

| # | Raised by | Problem | Fix | Where |
|---|---|---|---|---|
| 1 | Grandparent, Spanish-speaking parent | The grandmother's name was fixed as "Grandma" | New optional **Grandma name** drop-down with 14 names: Grandma, Granny, Grammy, Nana, Nanna, Gigi, Mimi, Mamaw, Oma, Nonna, Abuela, Bubbe, Lola, Yaya. The buyer picks from a list rather than typing freely, so every rhyme still scans and there's nothing to moderate. The name appears in 4 rhymes and 1 tip. A name that isn't on the list, or that matches the child's name (for example a child named Lola), goes to the review queue. | `WORDS.md` ({{GRANDMA}}), `personalize.js`, `personalization.json`, `ORDER-TO-PRINT.md` (Shopify field, Etsy box line, test step), new `orders/examples/order-abuela.json` |
| 2 | Autistic self-advocate, OT | Customer-voice rule 15 was only partly met: AAC was missing, and the book assumed every child sits on a lap | The How to use page now says: "A point, a sign, a sound or a tap on a talking device counts too. Some children would rather sit beside you than on your lap; beside counts just as much." | `WORDS.md` grown-up note → page 32 |
| 3 | Autistic self-advocate | The pledge made speech the goal | "pause and wait, so she can take a turn—any way counts" | `WORDS.md` pledge promises → page 31 |
| 4 | SLP | Wait time wasn't specific | The spread 2 tip now says "pause and count to five in your head" | `WORDS.md` s2 tip → page 8 |
| 5 | Worried parent | The brother's fort light read as a phone | Redrawn as a plain flashlight (handle and wide head) | `build.js` spread 10 → page 24 |
| 6 | K–5 teacher, child | "A park full of laps" showed one lap | Added Mama Bea and the baby on a second blanket, further back on the grass. The right page now shows two laps, and three counting Dad on the facing page. | `build.js` spread 8 → page 20 |
| 7 | Child | The cat on the "one cat" page was hidden behind the child | The cat now lies across Grandma's knees in full view, and the label and pointer were moved to it | `build.js` spread 9 → page 22 |
| 8 | New parent, K–5 teacher | The age label (2–6) didn't match the baby-shower positioning or the lap games, which start in the early months | Changed to **Ages 0–5** on the back cover, both cover wraps, the mockup, `listing.json` (`ages`, `seo_title`) and the FAQ | `build.js`, `listing.json` |
| 9 | Preschool teacher | The last page advertised a product that doesn't exist yet (Bring a Book inserts) | The tiles now show three products on sale today, youngest first: Up! Go! More! (0–3), 100 Screen-Free Plays (0–5), The Day the Tablet Slept (3–7). `next_products` matches. This clears the founder's open launch item. | `build.js` NEXT, `listing.json` |
| 10 | Grandparent, new parent | The family cast wasn't disclosed, and delivery, gift shipping and returns weren't answered | The long description now names the fixed family (Dad, Grandma who uses a wheelchair, big brother), the Grandma choice, English text and support for accented names. There's a new `faq` block with 9 questions: what's inside, ages, family match, Spanish, delivery time, ship-to-family, preview, returns and group orders. Anything that depends on the printer is marked [VERIFY]. | `listing.json` |
| 11 | Layout check after #2 | The longer How to use note pushed the keepsake box into the row of four laps at the bottom | Tightened the keepsake box spacing so it clears the art again | `build.js` CSS → page 32 |

**Re-rendered:** `preview/p01–p34.png`, `picture-laps-not-apps.pdf` (34 pages), `picture-laps-not-apps-interior.pdf` (32 pages, 8.75 in), `template-variables.pdf` (now shows {{GRANDMA}}), both cover-wrap samples, `cover.png`, `picker.png`, `mockup.png`.

**Version line:** it stays at "Version 1.0 · September 2026". No copy has been sold, so this is still the first edition. Change it in `build.js` `VERSION` with the first change made after launch.

## Checked and left alone

- **No autism or diagnosis wording** and no therapy claims anywhere in the book, listing or keywords. The SLP confirmed the tips are presented as parent education.
- **The Dad and big-brother art stays the same** for every look. Letting the family match the child is a bigger art job, so I didn't do it here. It's disclosed in the listing and on the picker ("the family in the story stays the same") and logged in the roadmap.
- **No change to the story rhymes.** They're the founder's to rewrite for authorship. The librarian's note on "a mouse-sized small whisper" is passed to her in `human_todo`.

## Roadmap for the founder (logged in `listing.json` `human_todo`)

1. A **family look** option so Dad, Grandma and the brother can match the child.
2. A **Spanish edition**, with the rhymes rewritten rather than translated, by the founder or a native-speaking writer she hires, so the words stay hers.
3. A **classroom/library edition** that isn't personalized ("made for our class"), with an ISBN. This answers the preschool teacher, K–5 teacher, librarian, child-care director and PTA leader.
4. Put the **Bring a Book shower inserts** back on the last page once they're on sale.
