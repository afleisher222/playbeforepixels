# 100 Screen-Free Plays for Ages 0–5: customer panel

**September 28, 2026.** This panel is simulated. The 13 reviewers saw the cover, the mockup, all 9 listing images, `listing.json`, START HERE (own-shop and Etsy) and every page of the Letter color PDF. The grandparent, the librarian and the child-care director also saw the black-and-white KDP paperback interior. Their comments are in their own voices below, and the fixes follow.

**Result: 8 would buy, 5 would not.** Of the five no's, the parent of a 9–12-year-old, the child and the PTA leader said the book is for a younger age than theirs. The child-care director and the children's librarian said the format or license didn't fit their use. Two of the no's would still recommend or gift it.

**No-guilt scores (CUSTOMER-VOICE rule 12; 1 = not at all, 5 = very).** "Judged" averaged 1.2 and "preachy" 1.3. The highest single score was 2, from the worried parent, for the words "screen-free day". Both averages are under the limit of 2.

## What the panel said

**New parent, baby 7 weeks (would buy the PDF).** "'Tell the diaper change' is something I'm already doing ten times a day, so it felt doable, and the tired-grown-up page made me feel seen. But the 0–1 chapter jumps to 6 months fast. I had to hunt for the handful of plays that work for a newborn."

**Worried parent (would buy; judged 2, preachy 2).** "'When screens are on anyway' is the first screen page that didn't make me feel like a failure. The 'sample screen-free day', though, reads like a test I'd fail. Our real day has a show while I shower. Tell me that's allowed on that page, not just four pages later."

**Grandparent gift-buyer (would buy the paperback as a gift).** "I like the grandma with white hair on the 2–3 page, and the type on the play pages is big enough for my glasses. It's a gift, so I want somewhere to write who it's from. In the paperback, the lines on the planner page are so faint I could barely see them, and the web address on the last page breaks in the middle of a word."

**Parent of a 10-year-old (would not buy for my child; would gift it to my sister).** "The cover says 0–5 loud and clear, so I wasn't misled. My daughter babysits her little cousin, and I'd hand her this if it said big kids can lead a play with an adult nearby. As it is, it reads as grown-ups only."

**Child, age 11, first-phone age (would not buy; "it's a baby book").** "The sleeping tablet is funny, not mean. I'd do Robot grown-up with my cousin. But 'Flying high' says hold the baby under the arms and lift, and I'd totally try that. It should say only grown-ups lift."

**Preschool teacher (would buy the PDF if she could use it in class).** "Freeze dance, Simon says and Red light, green light are circle-time gold, and the talk lines are better than most curricula. But the copyright page says 'own household', and nothing tells me how to get a classroom license. Small thing: the 'Repeat and add one' tip says 'Big ball!' and the example under it says 'Red ball!'"

**Child-care director (would not buy for the center yet; would recommend to families).** "The Safety first page is better than most: the tube test, button batteries, cords, safe sleep and the poison line. In a center, every food activity needs an allergy check. Play 78 has one, but 'Snack choice', 'Salad helper' and the café play don't. I'd also need a site license."

**PTA leader (would not buy for the PTA; would put it on a family-night flyer).** "We're K–5, so for us it's a book for families with little ones at home, maybe a raffle prize during screen-free week. The listing never says whether a group can buy it. It needs one line about group orders."

**Speech-language pathologist (would recommend to families).** "The six moves are in plain words, the wait is 'count to five in your head', and nothing claims to be therapy. That's right. But the book tells parents 'Say what you see: no questions needed', and then several of the 'Say what you see' lines are questions: 'Whose shirt is it?', 'Is the shadow big or small now?', 'What's under here?'. Parents already over-question, so make those lines comments."

**Occupational therapist (would buy for a niece).** "'Hold under the arms, never by the hands or wrists' is exactly right. Two things. Play 20's talk line says 'and spin!' with a baby in arms, and I'd say 'turn'. And the messy plays (oats, soapy water, puddles) should tell parents it's fine if a child hates the feel. A spoon, gloves or watching first still count."

**Autistic adult self-advocate (would buy as a gift; judged 1, preachy 1).** "'A tap on a talking device counts' and 'turning away can mean a break, please' are both here. Thank you. 'Stomp and tiptoe' says 'switch without warning and see who notices'. Surprise switches can be really distressing, so make the switch a signal the child can see coming. The book should also say somewhere that it's fine to skip a play because of a texture or a sound."

**Spanish-speaking parent (would buy the PDF).** "'Talk, sing and read in the language you know best' made me feel welcome. But every talk line and every song is English: 'Row, Row, Row Your Boat', 'Pat-a-cake', 'Twinkle, twinkle'. Tell me I can say the lines my way and sing 'Los pollitos' instead. A real Spanish edition would be a must-buy."

**Children's librarian (would not buy the PDF for the collection; would buy the paperback once it has an ISBN).** "It's well organized: contents, color-coded bands, a quick finder, and sources limited to real citations. But the PDF's copyright page shows an empty 'ISBN / barcode (founder to add)' box and the note 'the founder adds the ISBN here before upload'. That's a production note in a finished product. The 'Swap it' page also leaves play numbers stranded on their own line."

## What I changed (product lead)

Everything below was edited, rebuilt with `sh build/make.sh`, and re-rendered. An overflow check (every element inside the live area of every page) passes on all 10 source editions. Page counts are unchanged: 86 for the paperback and 90 for each PDF. I checked the new PNGs by eye: preview pages 5, 14 and 80, KDP pages 1, 2, 5, 79, 83 and 85, and both START HERE files. The Etsy sources and Etsy START HERE still contain no web address.

| # | Raised by | Problem | Fix | Where |
|---|---|---|---|---|
| 1 | Child 9–12 | Play 36 didn't say who may lift | Safety note now says: "A grown-up does the lifting, never a big brother or sister." | `plays.js` #36 |
| 2 | Child-care director | Food plays had no allergy check | "Check for food allergies first" added to plays 37, 58 and 81, and to the food rule on Safety first | `plays.js`, `book.js` safetyPage (p7) |
| 3 | OT | "Sway, sway… and spin!" with a baby in arms | Now "…and turn!" | `plays.js` #20 |
| 4 | Autistic self-advocate | Play 61 used a surprise switch | "Take turns calling out the switch: 'Elephant!' … 'Mouse!'" | `plays.js` #61 |
| 5 | OT, autistic self-advocate, parent of a 9–12 | No permission to skip a play because of the senses, and nothing about big siblings | New note on How to use: "Every child is different. If a texture, sound or touch bothers your child, change the play or skip it… Big brothers and sisters can lead plays too, with a grown-up right there." Play 32's easier line adds "a spoon is fine" | `book.js` howPage (p5), `more.js` #32 |
| 6 | SLP | Six "Say what you see" lines were questions | Rewritten as comments: 17 "You're crawling… through… and OUT!", 25 "…it's gone! The sun dried it.", 34 "Shirt! A big blue shirt. In it goes.", 83 "The shadow moved! Now it's long and thin.", 89 "Dig, dig… a worm! A wiggly worm.", 96 "Bananas! You found the bananas. Tick!" | `plays.js` |
| 7 | Preschool teacher | Tip and example didn't match | Example now "Child: 'Ball.' You: 'Big ball!'" | `book.js` movesPage (p6) |
| 8 | Spanish-speaking parent | Talk lines and songs were English-only | Talk-moves page adds: "Say the talk lines in your own words and your own language, and swap any song for one your family knows." Play 16 adds "or any rocking song your family knows". The FAQ answers the Spanish question honestly (not yet) | `book.js` (p6), `plays.js` #16, `listing.json` faq |
| 9 | New parent | Newborn plays were hard to find | New box on the 0–1 "at a glance" page lists the six "From birth" plays plus Chest chat and This little piggy, with the page number | `book.js` glancePage (p14) |
| 10 | Worried parent | The sample day implied a day with no screens at all | The sample-day introduction adds: "If a show is part of your day, give it one fixed spot (page 81)." This follows rule 13 | `book.js` sampleDay (p79) |
| 11 | Librarian | The PDF copyright page showed an empty ISBN/barcode box and a production note | PDFs: no ISBN block. Paperback: one boxed line, "ISBN: [founder adds the ISBN before upload]". The interior barcode box is removed because KDP prints the barcode on the back cover | `book.js` copyrightPage (p2) |
| 12 | Teacher, director, PTA | No route to a classroom or site license | Copyright page, both START HERE files and the FAQ now say classroom and site licenses are sold through the quote form (Etsy: send a message) | `book.js`, `extras.js`, `listing.json` |
| 13 | Librarian | "Swap it" page left numbers stranded on their own line | Each play name and its number now stay together, in white pills that show up on tinted cards | `book.js` swapDay (p80) |
| 14 | Grandparent | The bonus web address broke mid-word in the paperback | The address now breaks only after "/bonus/" | `book.js` bonusPage (KDP p85) |
| 15 | Grandparent | Faint planner lines and gray day names in the black-and-white paperback | In the black-and-white editions, write-in lines are darker (#7A7A7A) and day names are in ink | `book.js` CSS (KDP p83) |
| 16 | Grandparent | Nowhere to write a gift inscription | "A gift for ___ / With love from ___" lines on the paperback title page | `book.js` titlePage (KDP p1) |
| 17 | Grandparent, PTA, teacher | The listing had no FAQ, which BRAND.md requires | New 10-question `faq` covering what's inside, ages, formats, download, printing, classroom and site licenses, Spanish, gifting, refunds (matches `legal/SHIPPING-RETURNS-REFUNDS.md`) and the Amazon version | `listing.json` |
| 18 | New parent, grandparent | START HERE promised the download link works "for at least a year", which isn't verified | Now: "If the link ever stops working, the resend-my-download page below sends you a fresh one." | `extras.js` START HERE |

Spacing had to be tightened so the new How to use note fits the paperback page: slightly less padding between list rows, and the sample-day timeline moved inward so its times sit inside the live area.

**Re-rendered:** all 10 source editions, `guide-100-plays-kdp-interior.pdf`, `guide-100-plays.pdf`, `guide-100-plays-cover-wrap.pdf`, the 4 own-shop PDFs, `START-HERE.pdf`, the 5 files in `etsy-upload/`, `preview/p01–p90.png`, `cover.png`, `mockup.png` and `preview/listing-images/01–09`. `listing.json` `compliance_notes`, `human_todo` and `edition_2_plan` are updated. The version stays "Version 1.0 · September 2026" because nothing has been sold yet.

## Checked and left alone

- **No outcome promises.** The worried parent asked "how do I know it's working?". The book doesn't promise results (hard rule 1 and customer-voice rule 19), so the answer stays "the back-and-forth is the point".
- **Safety page tone.** "Swallowing one is an emergency" stays. It is a plain safety fact, not a fear word.
- **Only 6 plays start from birth, and the 3–5 band isn't split.** These are real gaps, but they need new plays, not edits. They're logged in `edition_2_plan`.
- **The story and the plays stay the founder's to rewrite.** My talk-line edits are drafts in the same files she already has on her rewrite list (`human_todo`).
- **No autism or diagnosis wording** appears anywhere. The self-advocate's comments were handled as general sensory and communication respect, not as a condition.

## Roadmap for the founder (logged in `listing.json`)

1. **Classroom and site licenses:** fill in the license prices and make sure the quote form offers them for this book. The book now points there (new `human_todo` item).
2. **Edition 2:** more plays for 0–3 months, a 3–4 / 4–5 split, and a classroom/child-care edition with group versions of the plays.
3. **A Spanish edition** written by a native speaker, not translated, with Spanish songs.
4. **For older siblings and the 9–12 audience:** the First Phone Agreement Kit (`products/first-phone-plan`) is the right product. This book stays 0–5.


## Color-blind check (COMPLIANCE-GATE 20), September 28, 2026

Method: Claude simulated protanopia, deuteranopia and tritanopia (Machado et al. 2009 matrices, full severity) on `preview/listing-images/03-four-age-bands.png` and the chapter openers and looked at each result. This is a simulation, not a test with color-blind readers.

Result: Pass. The 1–2 and 3–5 chapter colors look alike under protanopia and deuteranopia, but each chapter opener, age pill and play header prints the band in words and numbers ("1–2", "1 to 2 years", "From 12 mo"). The KDP interior is black-and-white and uses the same words.
