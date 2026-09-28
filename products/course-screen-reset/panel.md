# 30 Days of Back-and-Forth: customer panel

**September 28, 2026.** This panel is simulated. The 13 reviewers saw the cover, the mockup, all 8 listing images, `listing.json`, the sales page, the Day 6 email and every page of the Letter color workbook. The grandparent, the librarian and the child-care director also saw the black-and-white KDP paperback interior (92 pages). Their comments are in their own voices below, and the fixes follow.

**Result: 7 would buy, 6 would not.** Of the six no's, the new parent and the child said it is for a different age. The preschool teacher, the child-care director and the PTA leader want a group license, which didn't exist in the FAQ. The speech-language pathologist doesn't buy parent programs but would recommend it. All six would recommend it or pass it on.

**No-guilt scores (CUSTOMER-VOICE rule 12; 1 = not at all, 5 = very).** "Judged" averaged 1.2 and "preachy" 1.2. The highest single score was 2, from the worried parent, for the Day 2 study line ("toddlers with more screen time heard fewer words"). Both averages are under the limit of 2.

## What the panel said

**New parent, baby 4 months (would not buy yet).** "The cover says 1 to 12, so I didn't feel tricked. I just wanted to know what to get instead. Nothing on the page told me, and I had to guess whether 'after nap, two shows' even applies to a baby."

**Worried parent, 2-year-old (would buy; judged 2, preachy 1).** "'If screens end in tears at your house, you are not alone' is the first line that didn't make me feel like a failure. The study on Day 2 stung for a second, but 'a link, not proof' right after it helped. My son melts down at the end of shows. I'd like one more thing to try besides saying the words, because he doesn't always hear me."

**Grandparent gift-buyer (would buy the paperback as a gift).** "Big type, calm pages, and a grandma in the car picture. But her face is hidden behind a black circle on a stick, and I honestly thought it was a magnifying glass. I'm giving the book as a gift, so I want a line to write who it's from. And if I buy the online one, how does it get to my daughter?"

**Parent of a 10-year-old and a 4-year-old (would buy, mainly for the 4-year-old).** "The big-kid boxes are real, and 'listen first' on Day 25 is exactly right. My 10-year-old's screen fights are about games, though, not episodes, and you can't stop a match in the middle. One line about ending at the end of a round would make this mine too. For phones, point me somewhere."

**Child, age 11 (would not buy; "tuck in the tablet is for little kids").** "I like that screens aren't taken away when you're bad. That's fair. And the family plan says everyone signs, so grown-ups have to keep the phone spot too. I'd do paper game night and be the referee. The magnifying-glass grandma in the car looked like she wasn't watching the road."

**Preschool teacher (would recommend; would not buy for class yet).** "The talk moves are clear, and 'the pause is an invitation, not a quiz' is going on my wall. But the FAQ only says 'anyone in your household', and nothing tells me how a classroom could use it. Also, the play-basket page lists a scarf, and the Day 4 lesson took scarves out. Which is it?"

**Child-care director (would not buy for the center; would recommend to families).** "The Safety page is solid: the tube test, balloons, cords, water, chargers. But the snack plays (Day 2, Day 5, the family restaurant) never say to check for allergies, and in a center that's the first question. 'Wake with a roar and a tickle' would need a consent line too. I'd also need a site license."

**PTA leader (would not buy for the PTA; would put it on a family-night flyer).** "It's a month-long plan for families, which is great for a screen-free week handout. But there's no way for a group to buy it. One FAQ line would do. Neutral wording, no school named, nothing preachy. That's easy for a PTA to share."

**Speech-language pathologist (would recommend to families).** "Plain words, no program names, no therapy claims, and a sign or a device tap counts. Good. But 'Say what you see' is supposed to be comments, not questions, and three of its talk lines end in questions: 'What do you see?' on Day 24, 'Is that the sun?' on Day 28, and 'Next?' on Day 10. Parents copy those lines word for word."

**Occupational therapist (would buy for a friend).** "The Veggie wash station safety line is excellent. Two things. Some toddlers hate wet hands, so give them an out, like a scrub brush. And 'a cushion to jump on' on a hard floor slides out from under a toddler. 'Climb over' is safer."

**Autistic adult self-advocate (would buy as a gift; judged 1, preachy 1).** "'A tap on a talking device counts' and 'answer any look, point or sound' are both here. Thank you. The ending warning is only spoken, and many kids do better with a warning they can see. After a meltdown, the book goes straight to a hug, but some kids need space first. And a surprise roar plus a tickle can be a lot. Say 'only if your child enjoys it'."

**Spanish-speaking parent (would buy).** "'Talk, sing and read in the language you know best' is on the first pages, which made me feel welcome. But every example is in English: 'Twinkle, twinkle', the song basket. Tell me the songs can be ours. And tell me honestly if a Spanish version is coming."

**Children's librarian (would buy the paperback once it has an ISBN).** "It's organized: a contents page, color-coded weeks, a sources page with real citations, and 'a link, not proof'. But the paperback's scripts bank says 'cut out the ones you need'. Cutting a library book, or a book with printing on the back, isn't an option. The cover says '30 plain-word scripts' and listing image 2 says 38. Both are true, but say why."

## What I changed (product lead)

Everything below was edited in the build sources, rebuilt with `sh build/make.sh`, and re-rendered. Page counts are unchanged: 89 pages in each workbook PDF and 92 in the paperback. Every lesson is still under 300 words (the longest is 244). `ops/TESTS/check_listings.py` still shows 0 failures and 0 warnings for this product. I checked the new PNGs by eye: workbook pages 8, 22, 37–48 and 87, paperback pages 1 and 85, and listing images 02 and 07.

| # | Raised by | Problem | Fix | Where |
|---|---|---|---|---|
| 1 | Teacher, director, OT | The play-basket page still listed "a scarf" (hard rule 4: no cords or strings long enough to wrap a neck). The lesson had already dropped it | Now "a soft ball, a cushion to climb over" | `workbook.js` play-basket page (p8, KDP too) |
| 2 | OT | "A cushion to jump on" slides on hard floors | Day 4 lesson now says "a cushion to climb over" | `content.js` Day 4 |
| 3 | Child-care director | Food plays had no allergy check | "Check for food allergies first" added to Day 2 (Narrate the snack), Day 5 (Tell me three things) and Day 26 (Family restaurant) | `content.js` |
| 4 | Self-advocate, director | Sleeping lion: a surprise roar and a tickle, with no consent line | Safety line now reads: "Keep the roar soft, tickle only if your child enjoys it, and stop the moment your child says or shows stop." | `content.js` Day 14 |
| 5 | Self-advocate, worried parent | The ending warning was only spoken | Day 6 adds: "Some children do better with a warning they can see, like a sand timer or two fingers held up." | `content.js` Day 6 (lesson, email, workbook, paperback) |
| 6 | Parent of a 9–12 | Endings only mentioned episodes, not games | Day 6 "clear ending" now says "the end of an episode or a game round" | `content.js` Day 6 |
| 7 | Self-advocate | After a meltdown the lesson went straight to a hug | Day 13 now says: "Some children need quiet and a little space first; stay nearby. When the storm settles, reconnect: a hug if they want one…" | `content.js` Day 13 |
| 8 | SLP | Three "Say what you see" talk lines were questions | Day 10: "…Now it's clean. Next one!" Day 24: "I see a cloud like a… dog! A big fluffy dog. (wait)" Day 28: "You drew a big circle. A big round sun. A cozy sun!" | `content.js` |
| 9 | OT | No option for toddlers who dislike wet hands | Veggie wash "easier" adds: "If wet hands bother your child, a scrub brush is fine." | `content.js` Day 10 |
| 10 | Spanish-speaking parent | Song examples were English-only | Day 15: "The pause works in songs too, in any language". Day 20's song basket: "in whatever language your family sings". New FAQ answer: no Spanish edition yet, and every talk line and script can be said in your own words and language | `content.js` Days 15, 20, FAQ |
| 11 | Teacher, director, PTA | No route to a group or site license | New FAQ: "Can a teacher, child-care center or PTA use it?" It points to the written quote form. There is no phone or call option | `content.js` FAQ (workbook p87, sales page) |
| 12 | Grandparent | No gift route for the online program | New FAQ: "Can I give it as a gift?" (the paperback is the easiest gift; for the online program, enter the family's email at checkout) | `content.js` FAQ |
| 13 | Grandparent | No place to write a gift inscription | The paperback title page now has "A gift for ___ / With love from ___" lines. The scene is slightly smaller, so the logo stays 1 in from the bottom edge | `workbook.js` title page (KDP p1) |
| 14 | New parent, parent of a 9–12 | Nothing pointed to a better fit for babies or first phones | The FAQ age answer adds: "For a baby under 1, our 100 Screen-Free Plays book starts from birth. If your 9- to 12-year-old's big question is a first phone, our First Phone Agreement Kit fits better." | `content.js` FAQ |
| 15 | Librarian | The paperback scripts bank said "cut out the ones you need" | Paperback: "Copy the ones you need onto a card or sticky note and keep them where the tricky moment happens." The PDF workbook keeps "cut out" | `workbook.js` scripts bank (KDP p85) |
| 16 | Grandparent, child | In the Week 4 car scene, the steering wheel was drawn over the grandparent's face and read as a magnifying glass | The wheel is now a small side-on wheel in front of her chest, and her face shows | `chars.js` car-back symbol (listing image 07, Week 4 page) |
| 17 | Librarian | Cover says 30 scripts, listing image 02 says 38 | Image 02 now explains: "One for each day, plus 8 extras…" | `extras.js` listing image 02 |
| 18 | (found during the rebuild) | `make.sh` ran `node workbook.js && node emails.js` in one chain. Under `set -e`, a crash in that chain didn't stop the build, so it reused old sources and reported "done" | The generator steps now run on separate lines, so a crash stops the build | `build/make.sh` |

`listing.json`: `compliance_notes` records these fixes, and `human_todo` gains three items (set license prices on the quote form, confirm the checkout's gift or delivery-email option, and a Spanish edition by a native speaker). The version stays "Version 1.0 · September 2026" because nothing has been sold yet.

## Checked and left alone

- **"Many families…" in Days 1, 5 and 10.** These lines describe common situations ("the hour before dinner is the time many families lean on screens most"). They don't claim anyone has used the program, so they aren't the pre-launch social proof removed in QA. "Most children love two or three plays" on Day 29 is required wording (CUSTOMER-VOICE rule 14).
- **The Day 2 study line.** The worried parent scored it 2. It is an allowed citation (Brushe 2024), stated as "a link, not proof", and sits inside the no-guilt limit.
- **The cover pill "30 plain-word scripts".** It is true: one script a day. The 8 extras are now explained where the 38 appears.
- **The paperback ISBN box and the "FOUNDER WRITES THIS" box.** Both are labelled placeholders BRAND.md allows for things only the founder can supply. `make.sh --final` still refuses to ship with the founder box.
- **"Tuck in the tablet" for older kids.** The 11-year-old found it young. The play already gives big kids the "keeper" role, and the program's core is ages 1–8 with big-kid versions. Phone questions are sent to `first-phone-plan`.
- **No autism or diagnosis wording** was added. The self-advocate's comments were handled as general respect for sensory and communication differences.
- **Logo.** This rebuild picked up the current `brand/logo/` files (the v2 kit from task #21), so the covers, footers and listing images now show that mark. That comes from the brand kit, not from this panel.

## Roadmap for the founder

1. **Group and site licenses:** set prices and add this program to the quote form (teachers, centers and PTAs all asked).
2. **Gift delivery:** confirm how the merchant of record sends the program to someone else's email, and adjust the FAQ if needed.
3. **Spanish edition:** written by a native speaker, with Spanish songs and scripts.
4. **Edition 2 idea:** a short big-kid track (ages 9–12) covering games, group chats and homework devices. It should link to the First Phone Agreement Kit, not repeat it.


## Color-blind check (COMPLIANCE-GATE 20), September 28, 2026

Method: Claude simulated protanopia, deuteranopia and tritanopia (Machado et al. 2009 matrices, full severity) on the pre-filled 30-day tracker (`preview/p09.png`) and looked at each result. This is a simulation, not a test with color-blind readers.

Result: Pass. The week colors on the tracker merge in pairs, but they only group the days: every square has its day number and play name in words, and the "played / spot kept / again!" boxes are labelled. No lesson, script or chart depends on color alone.
