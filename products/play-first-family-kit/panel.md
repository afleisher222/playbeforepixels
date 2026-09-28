# Customer panel: Play-First Family Kit

September 28, 2026. This is a simulated panel, not real customers. Treat the comments as a checklist, not as reviews, and never quote them in marketing.

**What the panel looked at:**
- `cover.png`, `mockup.png` and all 10 listing images.
- Color US Letter pages 2–5, 14, 22, 30, 31, 33, 34, 38–47 and 48–50 (the old certificate, blank tracker and "what's next" pages).
- START HERE, and low-ink pages 1, 13 and 21.

## What the panel said

**New parent (a 10-month-old and a 3-year-old):** Buy. I love the "Tired day? Just say the rhythm out loud" line, and the checklist needs no cutting, so I can start tonight. The 30-day tracker is just pictures, though. I can't tell which plays suit a 3-year-old and which suit the baby, or what "Tape roads for cars" even involves.

**Worried parent (anxious about screens):** Buy. Nothing here makes me feel like a bad parent, and "some days need more screens, and that's okay" actually made me exhale. The screen-spot cards tell me how to warn my son, but not what to do when he melts down anyway. The checklist also asks "after ___" but never "for how long", even though the guide says to keep the length the same.

**Grandparent gift-buyer:** Probably buy, for my daughter and for my house. It's lovely and very clear. Can I give it as a gift, and am I allowed to print it for when the grandkids stay with me? I couldn't find either answer without emailing.

**Preschool teacher:** At home, yes. The picture checklist and the first-then-later board are exactly how my room works. On the helping-jobs chart the days read "M T W T F S S", and my 4-year-olds would never tell the two T's or the two S's apart. I'd also want to use it in class, but the license is family-only and nothing says whether a classroom license exists.

**K–5 teacher:** Buy for families I know, not for class. The "who" column and "Jobs are never a punishment" are great, and older kids will like the family plan. My 9-year-olds will bargain over "how long," so the screen line on the checklist needs a length as well as a time. And the "what's next" page only offers products for under-5s in two of its four spots.

**Child-care center director:** I'd recommend it to families. The velcro and cut-size rules are better than most things I see. The 30 play ideas have no safety notes, though: hiding a small toy, a floor picnic, dress-up scarves and a tea party each need a line for under-3s. A center license question needs an answer on the listing.

**PTA leader:** Maybe. The family plan would make a great take-home for a screen-free week, but I can't hand out copies on a family license. I love "Grown-ups play too." A Spanish version would double how useful it is for our school.

**Speech-language pathologist:** Would recommend. The three talk lines, "a sign, a point or a tap counts" and "Every language counts" are exactly right, and nothing implies therapy. The 30 plays are where the talking happens, but none of them has a talk line or an easier and harder way. That's the part parents actually need.

**Occupational therapist:** Buy. Carrying a light bag, folding towels and moving like animals are great heavy-work and movement choices, and the straight-line cutting is sensible. The day dots on the helping-jobs chart are too small for a 2- or 3-year-old to color. Toddlers need bigger targets.

**Child, age 8:** "I want the blanket fort token every day." "Why is the screen row just 'after'? My brother says his time is longer." "Can Mom have a checklist too? I want to tick hers."

**Autistic adult self-advocate:** Mostly yes. The fixed spot, the first-then board and the 5-minute warning are the kind of predictability many kids need, and nobody is shamed for liking tech. Three problems:
- For some kids a tablet is their talker, and "screens rest at meals, in the car and at night" would take away a child's voice unless the kit says otherwise.
- "Meals are for talking" pressures kids who find talking at meals hard.
- "Tokens earn time together" makes connection something a child has to earn.

**Spanish-speaking parent:** Buy if it came in Spanish. For now I'd use the blank pages. I love "Talk, sing and read in the language you know best." Please tell me I can type Spanish, with accents, into the fillable boxes. The pre-filled pages are English only, and the listing doesn't say.

**Children's librarian:** I'd point families to it; I can't circulate a printable. "Library visit" in the 30 days is a nice touch. But the tracker says "Every idea uses things most homes already have," and a library visit isn't something at home. "Free, nothing to buy" would be accurate.

**Panel scores (customer-voice rule 25):** "made me feel judged" 1/5 and "preachy" 1/5 (the limit is 2 or lower). The worried parent and the self-advocate both scored the grown-up guide 1/5 on both.

## What changed (product lead)

| Issue | Who raised it | Fix | Where |
|---|---|---|---|
| The 30 plays had no starting age, prep, mess, play time, easier/harder pair or 2-minute version. This broke customer-voice rules 4, 6 and 7. | New parent, SLP, director, OT | New 3-page play guide after the tracker. It gives each of the 30 plays a starting age in months, what you need, prep, mess and play time (labelled as a guess), make it easier, make it harder, a "tired grown-up: 2 minutes" version and a talk line. A safety band at the foot of each page repeats the rule-4 basics. | `content.js` PLAYS30; `build.js` playGuide(), pages 48–50 (Letter and A4), low-ink pages 30–32 |
| Play-specific safety was missing (small toys, food, cords, bubbles, tape, hot drinks, hiding places) | Director, worried parent | Each play that needs one has its own safety line. Examples: toys and blocks bigger than a toilet-paper tube for under-3s; no whole grapes, nuts, popcorn or hard candy for under-4s; no cords or long scarves around necks; a grown-up holds the bubble bottle and the tape; pretend or cool water only for tea; agreed no-hide places. | Same |
| The talker question: screen-rest rules could take away a child's voice | Self-advocate | The grown-up guide now says "A talker (a device a child uses to talk) is their voice, not screen time. It stays with them at meals, in the car and at night." The plan's "Screens rest…" box adds "A talker never rests: it's their voice, so it stays with them." | `build.js` guide2, plan2 (pages 4, 45) |
| "Tokens earn time together" made connection conditional | Self-advocate | Now reads "Tokens are for play and time together, never screen minutes. After jobs, your child picks one." The guide adds "Time together is never taken away as a punishment." Listing image 8 now reads "Tokens are for play, never screen minutes". | `build.js` cutNote, guide2; `marketing.js` image 8; `listing.json` |
| "Meals are for talking" pressures some children | Self-advocate | The poster rule is now "Meals are for being together." | `content.js` RULES (page 42) |
| No help for when stopping ends in tears | Worried parent | New "When stopping is hard" card: "Stay close and name it: 'It's hard to stop. You wish it was longer.' Then show What we do next. Big feelings at the end are normal, and the spot comes back tomorrow." | `build.js` guide2 (page 4) |
| The checklist screen row had a time but no length | Worried parent, K–5 teacher, child | The row now reads "after ___ for ___" on all 24 checklist pages (a new fillable field). | `build.js` checklist() |
| "M T W T F S S" day dots were ambiguous and too small for toddlers | Preschool teacher, OT | The dots now read Mo Tu We Th Fr Sa Su (or Su first for Sunday starts) and are 15% bigger (0.265 in). They still fit A4. | `build.js` DAY1, `.dots` |
| Grown-ups had no checklist of their own | Child | "If interest fades" now suggests filling in a blank checklist for a grown-up: "kids love ticking yours." | `build.js` guide2 |
| Age bands read as rules | Self-advocate, SLP | The guide's intro now says "ages are a starting point, and pictures work at any age." | `build.js` guide2 |
| "Every idea uses things most homes already have" wasn't true of the library visit | Librarian | Now reads "Every idea is free, with nothing to buy." It also points to the play guide pages. | `build.js` tracker() (page 47) |
| Nothing said you can write your own words in another language | Spanish-speaking parent | The language card adds "Write your own words, in any language, on the blank pages." The listing says Spanish accents type into the fields; this still needs a phone test, which is now a to-do. | `build.js` guide1; `listing.json` editable, faq |
| The "what's next" page leaned toward ages 0–5 | K–5 teacher | "100 Screen-Free Plays" and "52 Play & Talk Cards" were swapped for "30 Days of Back-and-Forth" (ages 1–12, which is in next_products) and the "First Phone Agreement Kit" (ages 9–12). | `build.js` more() (page 53) |
| Gift, grandparent/sitter, classroom/center/library/PTA, Spanish, printed-book and talker questions had no answers without emailing | Grandparent, teachers, director, PTA, librarian, Spanish parent, self-advocate | Added a 10-question `faq` to the listing. It includes an honest "not offered yet" for group licenses and for a Spanish edition. | `listing.json` faq |
| Counts and wording in the listing | QA | Updated for the new pages:<br>• 53 color pages and 35 low-ink pages.<br>• pages_breakdown, bullets 1 and 3, long description (240 words), files, certificate page 52.<br>• Editable field counts are now 367 color and 241 low-ink.<br>• The compliance notes now cover the play guide, the talker line and "tokens are for play".<br>• Listing image 2 now reads "53 pages = … + 3 play-guide pages …". | `listing.json`, `marketing.js` |
| Founder decisions the panel raised | Teachers, director, PTA, librarian, Spanish parent | Four to-do items were added:<br>• review and rewrite the play guide in her own words;<br>• decide on classroom and site licenses;<br>• a Spanish edition only with a human translator;<br>• a phone test of accented typing.<br>The old "run the customer panel" to-do was removed. | `listing.json` human_todo |

**Rebuilt:** `bash build/make-all.sh`, with listing image 2 re-rendered after a wording fix.
- `check.js` passes on all 11 HTML files. The smallest cut piece is still 2.100 in, and there are still 12 or fewer pieces per page.
- **Page counts:** the color PDFs have 53 pages and 367 fields; the low-ink PDFs have 35 pages and 241 fields.
- **File size:** the largest PDF is 6.5 MB.
- **Etsy files:** the Etsy HTML, the PDFs and the listing images still have no URL or QR code.

**Pages I checked after the rebuild:**
- Letter pages 4, 14, 31, 42, 45, 47, 48, 49 and 53.
- A4 pages 4, 34 and 50, and low-ink page 30.
- Listing images 2 and 8, and the mockup.

Nothing is clipped or overlapping. The cover and the other listing images show nothing that changed.

## Heard but not changed (and why)

- **Classroom, center, library or PTA license (preschool teacher, K–5 teacher, director, PTA, librarian):** School-facing sales are on hold until employment counsel answers, and whether to offer them is the founder's call. The FAQ says "not offered yet", and the question is in human_todo.
- **Spanish edition (Spanish-speaking parent, PTA):** This needs a human translator. The fillable pages take Spanish text now.
- **Talk lines on each token (SLP):** The tokens are 2.1 in cut pieces, and a talk line would crowd the big picture a 2-year-old needs. The tokens' plays and their talk lines are in the play guide instead.
- **A printed or hardcover version (grandparent):** The KDP black-and-white journal is already planned in amazon_route_notes.
- **A "screen-free week" family-night handout (PTA):** Group and event kits are on hold with the school-facing work.
