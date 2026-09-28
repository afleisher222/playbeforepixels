# Customer panel: 150 "I'm Bored" Play Cards (ages 1–12)

September 28, 2026. This panel is simulated, so none of these people are real customers. Use the comments as a checklist, not as reviews, and never quote them in marketing.

**What the panel saw:**
- **Images:** `cover.png`, `mockup.png` and listing images 01–10.
- **Store color Letter pages:** 2 (start here), 5 (how to read a card), 6 (play at every age), 7 (safety), 8 (print and page guide), 9 and 10 (ages 1–3 card sheets), 40 (card index), 53 (Play Menu), 58 (quick answers) and 59 (bonus and license).
- **Other files:** the Etsy START HERE file and `listing.json`.

## What the panel said

**New parent (toddler, 14 months):** Buy. The "from 12 mo" start age on each card and the 2-minute tired-grown-up line are exactly what I need at 5 p.m. It's 59 pages, which scared me until page 2 said to print one sheet or just read titles from the index. I'd like to know my mum can use our printed cards when she babysits.

**Worried parent (cautious about safety):** Buy. It has the toilet-paper-tube test, a safety line on every card and "Grown-up keeps the pieces", and there are no balloons. Three things bothered me:
- In listing images 5 and 6 the second row of cards covers the safety lines of the first row, so the one line I look for is hidden.
- The rain gauge says "a clear jar" without saying plastic.
- "Deliver some to a neighbor" doesn't say a grown-up goes too.

**Grandparent gift-buyer:** Maybe. $6.50 is easy, but it's a download: how do I give it? The license says "your own household", so am I even allowed to print it for my grandchildren? I'd also like bigger print on the cards.

**Preschool teacher (3s and 4s):** I'd use the 3–5 cards at circle time and in small groups tomorrow, and the talk lines are good modelling for assistants. But every page says "For use in your own home." The only classroom answer is "ask through the contact form", with no price and no product. As it stands I can't legally use it.

**K–5 teacher:** The 5–8 and 8–12 cards are great for indoor recess and early finishers: Paper Bridge, Secret Code, Home Escape Room. The license shuts me out, like it does the preschool teacher. I'd also like one line saying how many children a card works for, since I never have just one.

**Child-care center director:** Maybe. The under-3 rules, "check allergies" on the food cards and "no cords" match what our licensing inspector looks for. My staff would play from the no-cut card index, and the index doesn't carry the safety lines. I need a site license for four rooms.

**PTA leader:** Maybe. A printed set in a jar would make a lovely family-night raffle prize or take-home. I can't tell what a PTA is allowed to buy or print, and there's no group price.

**Speech-language pathologist:** I'd recommend it to families as everyday play. It isn't clinical and doesn't pretend to be, and "count to five in your head" is right. But three toddler talk lines put a child on the spot:
- "More bubbles? Say 'more'!"
- "Again? Say 'again'!"
- "What does the duck say?", which is a test question.

It's better to model the word and let a sign, sound or reach count, which is what your own guide says.

**Occupational therapist:** Buy. Big pots, pillow mountains, a sheet tunnel and heavy-work helping cards are all good choices, and the mess icon helps. Some children hate messy hands or the noise of a pot band. The guide should say plainly that it's fine to skip those or to use a spoon, a towel on the pot or watching first.

**Child, age 8 (read the 5–8 and 8–12 cards):** "Egg Drop and Home Escape Room are the best ones. I want to do Stargazing." "When I read Cook from a Recipe it says 'your child reads the recipe'. I'm the child! It should just say 'read the recipe'." "Can I make my own card?" The blank cards answer that one.

**Autistic adult self-advocate:** Mostly yes:
- "A sign, a point or a device tap counts" is right.
- "Every child may pass" is in the spirit of the guide.
- There are no diagnosis words anywhere, including the listing.

Two things bother me:
- "Mirror Faces: sit face to face" makes face-to-face the only way to play. Side by side at a mirror works as well.
- "Sock Puppet" is a phrase this brand already keeps out of its marks, so why is it a card title that will end up in pins?

**Spanish-speaking parent:** Buy anyway. "Talk, sing and read in the language you know best" made me feel welcome, and most plays work in Spanish. But nothing in the listing says the cards are English only, and I'd want to know that before paying. The "how to read a card" page could say the talk line works in any language.

**Children's librarian:** I'd use the rainy-day and Words & Stories cards at family programs and send the index pages home. The personal license rules that out, and the listing doesn't answer the library question. I like that Origami and Magic Trick send kids to "a library book".

**Panel scores (customer-voice rule 12):** "made me feel judged" 1/5 and "preachy" 1/5. The limit is 2 or lower.

## What changed (product lead)

Every change keeps to BRAND.md:
- no health, clinical or diagnosis words
- no named products or brands
- no new citations
- no URL, link or QR code in the Etsy files
- no machine translation
- no pricing tricks

| Issue | Raised by | Fix | Where |
|---|---|---|---|
| Listing images 5 and 6 hid the flags and safety lines of the top-row cards under the second row | Worried parent | Both images now show six whole cards in a 3 × 2 grid with no overlap. Every "With a grown-up" flag and safety line is visible. | `build/build.js` listingPages; `preview/listing-images/listing-05.png`, `listing-06.png` |
| Toddler talk lines asked the child to say a word, or tested them ("What does the duck say?") | SLP, self-advocate | The lines now model the word: "More bubbles? More!", "Again? Again!" and "Quack, quack! Your turn, duck." The companion's harder lines already accept "say or sign". | `build/cards.js` Bubble Chase, Knee Bounce Ride, Animal Parade |
| Mirror Faces could only be played face to face | Self-advocate | Now reads "Sit face to face, or side by side at a mirror… Copy each other." The easier line adds "Side by side is fine." | `cards.js`, `companion.js` |
| "Sock Puppet Hello" uses a phrase BRAND.md keeps out of marks | Self-advocate | Renamed **Sock Friend Hello**, with the text, talk line ("Sock friend is hungry! Yum, yum!") and companion lines to match | `cards.js`, `companion.js`; ages 1–3 sheet 2, card index |
| Cards a child reads said "your child" (Restaurant Night, Dance Party DJ, Lunch Makers, Cook from a Recipe, Clue Trail) | Child | These now speak to the player: "Read the recipe, gather everything and cook it with a grown-up…" and so on | `cards.js` |
| Rain Gauge said "a clear jar" | Worried parent | Now "A clear plastic jar or bottle", with the safety line "Plastic, not glass. No trips outside in thunder or lightning." | `cards.js` |
| Bake and Share sent the child to a neighbor with no grown-up | Worried parent | Safety line now reads "Grown-up at the oven and on deliveries. Check allergies." | `cards.js` |
| A companion line for ages 1–3 said "only hard things", which could mean small items | Product lead check | Fill and Dump harder: "Fill it with only socks, then only big blocks." | `companion.js` |
| The no-cut card index had no safety lines | Director | The index header now says "Each card's safety line applies to all its versions." The full card, with its line, stays on the uncut sheet. | `build.js` index header; pp. 40–46 |
| License covered only "your own household", which left out grandparents and sitters | New parent, grandparent | The quick answers, page 59 and START HERE now say grandparents and sitters who care for your child count as your household | pp. 58, 59, START HERE (both editions) |
| No classroom, center, library or PTA route | Preschool teacher, K–5 teacher, director, PTA, librarian | Added `license_tiers`: personal $6.50, single-classroom $12, site $29. The last two are sold on our site only, and the founder confirms prices while counsel confirms terms. Page 58 has a new "Can a teacher, center or library use it?" answer that includes "Most cards work with 2–6 children at a time". Page 59 and START HERE say classrooms, centers and libraries need a separate license (the Etsy files say "message us through the shop", with no URL). Setting up the licenses is added to `human_todo`. | `build.js` faqPage, bonusPage, startHereDoc; `listing.json` |
| No answer on gifting | Grandparent | New quick answer "Can I give it as a gift?" (print, jar, label, and the license passes to that family), plus a listing FAQ | p. 58; `listing.json` faq |
| Nothing said it's fine to skip messy or noisy plays | OT | New quick answer: "Skip those cards, or use the easier version: a spoon instead of hands, a towel on the pot, watching first and joining later. Every child may pass." | p. 58; faq |
| The listing never said English only | Spanish-speaking parent, librarian | "English text." added to `format`, a new `language` field, and "Is there a Spanish version?" in the FAQ. Page 58 adds "Is it in other languages?". Page 5's talk line now reads "…while you play, in any language." A human-translated edition goes to `human_todo`. | `listing.json`; pp. 5, 58 |
| Questions a buyer would otherwise email | All | Added a 16-entry `faq` covering what's inside, prep, delivery, which file, licenses, gifts, teachers and centers, PTA, library, Spanish, mess and noise, signing and devices, toddler safety, professional advice, refunds and a printed edition. Answers that depend on counsel or the platform are marked. | `listing.json` |
| On page 5, the markers "2" and "4" sat in the gap right beside legend items 1 and 3 and read as part of the list | Product lead check | The markers now sit on the card's right edge, and the gap to the legend is wider | `build.js` anatomy CSS; p. 5 |
| The long description needed the language and license lines within the 250-word limit | Product lead check | The closing lines now read "Digital file in English; nothing is shipped. Personal license for one household; classroom and site licenses are separate." (241 words) | `listing.json` |

**Not changed, and why:**
- **Bigger print on the cards (grandparent).** A poker-size card holds this much text only at this size. The same plays are in the card index, and the Letter and A4 pages print at 100%. A large-print index could come in a later version.
- **Group sizes on every card (K–5 teacher).** There's no room on the card. The quick answer and FAQ say most cards work with 2–6 children.
- **The "For use in your own home" footer.** It's correct for the personal edition. Licensed classroom and site copies would be stamped by the store's automated license email (`human_todo`).
- **Spanish text.** Only a human translator may make it (`human_todo`).
- **A printed deck to wrap.** Print-on-demand stays "later, after the printable sells". The FAQ says so honestly.
- **Plays under 12 months.** 52 Play & Talk Cards (ages 0–5) covers them and is on page 59.

## Rebuilt and re-checked

- **Build:** `bash build/make-all.sh` exits 0. Text fits on every card and page in all 10 generated editions (8 main files and 2 START HERE files), and `build/verify.py` prints "ALL CHECKS PASSED". That covers sizes, page counts, version and copyright lines, no URL in the Etsy files, banned words, and the form-fill test on all 575 fields.
- **Listing:** `ops/TESTS/check_listings.py --only bored-play-cards` shows 0 FAIL and 0 WARN.
- **Regenerated:** all 5 store PDFs, the 5 Etsy PDFs, `source.html`, the previews, `cover.png`, `mockup.png`, the 10 listing images and `png-templates/`.
- **Checked by eye:** pages 5, 10, 40, 58 and 59, the Etsy START HERE file, and listing images 5 and 6.
- **Logo note:** another session replaced the logo kit in `brand/logo/` while this panel was running (files dated 03:15, 03:19 and 03:22). The final build picked up the kit as it stood at 03:22, so page headers and listing images now show the new mark. If the kit changes again, run `make-all.sh` once more.
- **Not done:** nothing was committed, and nothing was printed on paper.

**Still for the founder:**
- Everything in `human_todo`.
- Set up the classroom and site licenses before the PDFs point people to them.
- Rewrite the changed cards in your own words along with the rest.


## Color-blind check (COMPLIANCE-GATE 20), September 28, 2026

Method: Claude simulated protanopia, deuteranopia and tritanopia (Machado et al. 2009 matrices, full severity) on `preview/listing-images/ages-1-5/listing-02.png` and a card sheet and looked at each result. This is a simulation, not a test with color-blind readers.

Result: Pass. Age bands differ by words ("Ages 1–3", "Ages 3–5", "from 15 mo") on every card, and energy levels are words ("Calm", "Medium", "Wiggly") with an icon. Color is a second cue only.
