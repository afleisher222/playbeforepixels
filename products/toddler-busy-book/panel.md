# Toddler Busy Book: customer panel review

September 28, 2026 · Version 1.0 files. Simulated panel (these are not real customers or real reviews; they are a structured way to test the product from 13 points of view).

**What the panel looked at:** `cover.png`, `mockup.png`, all 10 listing images, and these pages in color (US Letter): 2, 3, 4, 5, 6, 7, 8, 10, 11, 13, 19, 20, 29, 65, 66, 67, 70, 72, 84, 85, 86, 92, 97, 98, 108, 109, 110, 111, 113, 116, 119, 120, 121, 124, 128, 129, 130, 131 and 132. After the fixes, pages 4, 7, 65, 66, 92, 109, 110, 111 and 130 were checked again in color, pages 4, 7 and 130 in A4, and pages 65, 86 and 109 in low-ink.

## The panel

**New parent:** "Yes, I'd buy it. Page 3 tells me exactly where to start, and '0 minutes prep for 49 pages' is the line that sells me. I got stuck on the rhyme pieces: the spoon is a stacking-ring toy and the 'dish' is a sandwich. My baby won't care, but I did."

**Worried parent:** "The toilet-paper-tube test, 'grown-up keeps the pieces' and no velcro under 3 put me at ease. What's missing is the grown-up stuff: scissors, a hot laminator, and plastic zip pouches and sheet protectors lying around a toddler. Say where those go. And the 'sad' face on the feelings page looks angry."

**Grandparent gift-buyer:** "Lovely and bright, and I'd buy it for my grandson's family. Can I give it as a gift, and how? The book doesn't say. The small print on the activity pages is a bit small for my eyes, but the big words are easy."

**Preschool teacher:** "Solid, age-sorted and honest about prep. On the garden counting page the talk line counts four bees, and there are no bees in the picture, only ladybugs. A child would spot that at once. 'Calm' and 'sleepy' on the feelings cards look almost the same: both have closed eyes and a small smile."

**K–5 teacher:** "Not for my classroom, but I'd send it home to families with younger siblings. My students love being the helper. Tell families the big kids can read the talk line or run the café, so the whole family plays."

**Child-care center director:** "I'd need a license, and the book points to one. The safety rules are the best I've seen in a printable. I'd add a line on keeping plastic pouches and laminating scraps away from the children, since that's what our licensing inspector checks. Libraries and story times need a license too."

**PTA leader:** "Would I buy it? Yes, as a raffle or new-baby gift for our families. A 'make a busy book night' kit with a group license would be a real fundraiser product; that's a separate item, not a fix to this book."

**Speech-language pathologist:** "Good use of pausing and waiting, and 'a point, a look or a device tap counts' is exactly right. One line undercuts that: Spot 4 differences says 'make it harder: tell what's different in words, *without pointing*.' Don't take the point away; add the words on top of it. And a sad face with angry brows teaches the wrong feeling word."

**Occupational therapist:** "Big pieces, straight cuts, finger-tracing before crayons: well graded. Pieces 2 in and up are easy to grip. I'd like scissor practice for the 4–5s one day, but keep cutting a grown-up job in this book. That belongs in a later product."

**Child aged 7 (older sibling):** "The mazes are fun, but the bird one is too easy for me. That's not a spoon, it's a baby stacking toy! And the counting page says bees but I only see ladybugs. Can I be the café person?"

**Autistic adult self-advocate:** "I like 'a look counts' and 'no right answer'. Nothing forces eye contact, which matters. Still, the guide should say plainly that lining pieces up, repeating the same page, moving around and playing side by side all count, and that eye contact is never needed. The feelings page relies only on reading faces, and some kids find faces hard to read. Tell grown-ups to read the word on the card too."

**Spanish-speaking parent:** "The guide says to talk in the language I know best, which I love. But the listing doesn't say the printed words are in English, and the rhyme page only works in English. Tell me I can make my own words on the blank pages. 'Mama, Dada' on the example page isn't how every family talks, even though there's a blank version."

**Children's librarian:** "Clear, calm and well organized, like a good board book. The rhyme pictures have to say the word: 'dish' drawn as a sandwich breaks the rhyme. The group-use answer mentions child-care and classrooms but not libraries, and we'd want to use it at story time."

## What the product lead changed

All changes were made in the source under `build/`, then everything was rebuilt with `bash build/make-all.sh`. QA passed on all 8 editions and 4 START HERE files: 0 problems, no banned words, every piece still 2 in or bigger, 95 type-in fields in each main PDF, and `listing.json` passes its own length checks (long description 244 words).

| # | Issue (who raised it) | Fix | Where |
|---|---|---|---|
| 1 | The "spoon" picture was a stacking-ring toy, on the rhyme pieces (p.109) and the kitchen pieces (p.111). Raised by the new parent, child and librarian | Drew a real spoon (`b-spoon`) and used it on both sheets | `art.js`, `acts-old.js` |
| 2 | "dish" was drawn as a sandwich on a plate, which breaks fish–dish (p.109). Librarian, new parent | Drew an empty blue dish (`b-dish`) | `art.js`, `acts-old.js` |
| 3 | Garden counting (p.86): the talk line counted "four bees" and there are no bees; the "harder" line also listed bees. Preschool teacher, child | Now reads "Let's count the ladybugs. One, two, three, four… five ladybugs!" (matching the answer key) and "Count everything with wings: birds and ladybugs!" | `acts-old.js` |
| 4 | The "sad" face had brows that dip in the middle, so it read as angry (p.65, p.66). SLP, worried parent | Brows now lift in the middle and a small tear was added | `boards.js` |
| 5 | "Calm" and "sleepy" looked nearly the same (p.65, p.66). Preschool teacher | Replaced "calm" with a clear "mad" face (brows down, tight mouth) on the board and the pieces | `boards.js`, `acts-young.js` |
| 6 | Feelings relied only on reading faces. Autistic self-advocate | "Make it easier" now says: "Read the word on the card as you point: faces can be hard to read." | `acts-young.js` |
| 7 | "Tell what's different in words, **without pointing**" contradicts customer-voice rule 15, which says a point counts. SLP | Now: "Tell what's different in words, then point to check." | `acts-old.js` |
| 8 | No word on grown-up tools or plastic. Worried parent, center director | New safety card on p.7: scissors, trimmer and a hot laminator are for grown-ups; plastic zip pouches, sheet protectors and laminating scraps stay out of reach | `extra-pages.js` (also in START HERE) |
| 9 | The guide didn't say that every way of playing counts, and didn't mention eye contact. Autistic self-advocate, SLP | New card on p.4, "Every way of playing counts": lining up, repeating, moving, humming and side-by-side play all count, eye contact is never needed, and if your child walks away you stop and try another day | `extra-pages.js` (also in START HERE) |
| 10 | No role for older siblings. K–5 teacher, child | New card on p.4, "Big kids can help": about 6 and up, they read the talk line, run the café or deliver the mail, with a grown-up right there who keeps the pieces | `extra-pages.js` |
| 11 | The book never said the printed words are in English. Spanish-speaking parent | New quick answer "Is it only in English?" says to say words and rhymes in any language, and points to the make-your-own pages (p.120–121). The listing now says "Printed words are in English." | `extra-pages.js`, `listing.js` |
| 12 | The "My people" example assumed Mama and Dada. Spanish-speaking parent | The example now says: "Every family is different: type your own names on the next page." | `extra-pages.js` |
| 13 | No gift answer. Grandparent | New quick answer "Can I give it as a gift?": print it, put it in a binder and give it ready to play, and give the printed book, not the files | `extra-pages.js` |
| 14 | Libraries were missing from group use. Librarian, center director | "Child-care, classroom and library licenses" on the license page and in the quick answers (website version links /licenses; the Etsy version says to message the shop) | `extra-pages.js` |
| 15 | "12 straight cuts or fewer" was wrong: the rule is 12 **pieces** or fewer, and a 12-piece grid needs more than 12 cuts. Found by the product lead | Fixed on p.3, the quick answers, START HERE, listing images 5 and 9, a bullet and the long description | `extra-pages.js`, `marketing.js`, `listing.js` |
| 16 | The example planner (p.124) said "three or four pages" but listed six. Found by the product lead | Now: "one page a day, with a favorite on repeat" | `extra-pages.js` |
| 17 | The pajamas piece was pale blue on a near-white card, so it was hard to see (p.92, p.111) | Pajamas are now sky blue | `art.js` |
| 18 | The white fridge disappeared on the cream kitchen panel (p.110) | The fridge is now sky blue with white handles | `art.js` |
| 19 | Listing image 3: the 2–3 years page and its count sat higher than the other two columns | The blurb now has a fixed height, so all three columns line up | `marketing.js` |
| 20 | Listing images 6 and 7 had large empty areas | Image 6: larger page fan. Image 7: larger sample page and a sixth tile, "Grown-up guide" | `marketing.js` |

## Heard but not changed (and why)

- **Small print on activity pages (grandparent):** the info row is sized to fit the fixed page system on both Letter and A4. The child-facing words and talk lines are already large. Revisit in a version 1.1 layout pass.
- **Scissor practice for 4–5s (OT):** cutting stays a grown-up job in this book, in line with the safety rules. It's a good idea for a future 4–6 product.
- **Group "busy book night" kit (PTA leader):** this is a new product (a host-it-yourself kit with a group license), not a fix. It has been passed on as a product idea.
- **Harder mazes (child):** there are 8 mazes from easy to tricky, and maze 8 is the hardest. The 3–5 band is meant to stop at age 5.

## Worth knowing

- **Logo:** the renders use whatever is in `brand/logo/` at build time. That folder now holds the **v2 "Maker's Seal" draft**, which is not adopted yet, so the covers and page footers show it. If the founder keeps or changes the logo, run `bash products/toddler-busy-book/build/make-all.sh` again. No product code needs to change.
- **Same spoon mistake in another product:** the 100 Plays guide's own `a-spoon` icon (`products/guide-100-plays/build/icons.js`) is also a stacking-ring toy. This product no longer uses it; the guide should be fixed separately.
- **Two new license lines need the founder's approval:** the gift answer and the library license. Both are added to `human_todo` in `listing.json`, along with the open question of saying "velcro" versus "hook-and-loop dots".
- Nothing has been committed. The edited source is in `build/`, and the rebuilt PDFs, `etsy-upload/`, `preview/`, `listing.json`, `cover.png`, `mockup.png`, `png-templates/` and the PNG zip are in this folder.


## Color-blind check (COMPLIANCE-GATE 20), September 28, 2026

Method: Claude simulated protanopia, deuteranopia and tritanopia (Machado et al. 2009 matrices, full severity) on `preview/listing-images/listing-03.png` (the three age bands) and page 1 of the Color file and looked at each result. This is a simulation, not a test with color-blind readers.

Result: Pass. Under protanopia and deuteranopia the 1–2 (grass) and 3–5 (tomato) bands turn a similar olive, but every band pill carries its words ("1–2 years", "2–3 years", "3–5 years") and every page repeats the band in words and a starting age in months. No page depends on color alone. The color-sort activities name each color in words on the page ("red", "blue"), so a color-blind grown-up can still run them.
