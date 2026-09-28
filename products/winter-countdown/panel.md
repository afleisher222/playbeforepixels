# 24 Days of Play: Winter Countdown: panel notes

The simulated 19-seat customer panel and the color-blind check are below.

## Color-blind check (COMPLIANCE-GATE 20), September 28, 2026

Method: Claude simulated protanopia, deuteranopia and tritanopia (Machado et al. 2009 matrices, full severity) on `preview/listing-images/listing-02.png` (every page type: guide, safety rules, countdown board, play cards, number tags, certificate) and looked at each result. This is a simulation, not a test with color-blind readers.

Result: Pass. The number-tag and card-header colors merge in pairs under all three simulations, but each day is identified by its number, its play name and an icon; nothing depends on color.

## Customer panel (19 seats), September 28, 2026

This is a simulated panel, not real customers. Treat the comments as a checklist, never as reviews, and never quote them in marketing (`ops/TESTIMONIAL-LOG.md` rule 1). Seats: the usual 13 plus the six required seats from `marketing/CUSTOMER-VOICE.md` ("Simulated panel: required seats"). Every seat scored "made me feel judged" (J) and "preachy" (P) out of 5; the limit is 2 or lower (CUSTOMER-VOICE rule 12).

**What the panel looked at:** `cover.png`, `mockup.png`, the listing images, the rebuilt Color US Letter pages 1–25 (grown-up guide pages 2–3, safety page, countdown board, all 24 play cards, number tags, certificate), START HERE, low-ink pages 2, 6 and 8, and `listing.json` (description and FAQ).

| Seat | Buy? | What they said | J | P |
|---|---|---|---|---|
| New parent | Buy | One card a day with a 2-minute version is exactly my speed. Start any day, no streak: good. | 1 | 1 |
| Worried parent | Buy | "The screens in your home keep their usual spot" reads as reassurance, not a lecture. | 1 | 1 |
| Grandparent gift-buyer | Buy | Easy to send. I'd like to know it works if the grandkids visit me for part of it. | 1 | 1 |
| Preschool teacher | At home | Good home-connection idea; a class license is not offered yet and the listing says so honestly. | 1 | 1 |
| K–5 teacher | For younger siblings | Ages 2–5 is clear on every card, so no one buys it for the wrong child. | 1 | 1 |
| Child-care center director | Recommend | Safety lines on ice, flashlights and cocoa are specific. Button batteries line is right. | 1 | 1 |
| PTA leader | Share | Secular and holiday-free: I can share it with every family in our group. | 1 | 1 |
| Speech-language pathologist | Recommend | Three plain talk moves; "a sign, a point or a tap counts"; no therapy language anywhere. | 1 | 1 |
| Occupational therapist | Recommend | Good movement mix (penguin waddle, freeze). Snowball toss uses crumpled paper, not small parts. | 1 | 1 |
| Child, age 4 (read aloud) | "Again!" | "I want the bear cave day now." | — | — |
| Autistic adult self-advocate | Yes | "Pick and choose" and "there to help, not to boss you around" respect a child who needs a different order. | 1 | 1 |
| Spanish-speaking parent | Buy | "Talk, sign, sing and read in the language you know best" works for us; the cards are English only and the FAQ says so. | 1 | 1 |
| Children's librarian | Point families to it | Cozy Book Nest and the list page are nice; I can't circulate a printable. | 1 | 1 |
| **Dad who is the main parent** | Buy | Nothing says "Mom". The certificate says "Our family". Fine as is. | 1 | 1 |
| **Two-mom or two-dad family** | Buy | Family wording is neutral everywhere; the certificate has room for any names. | 1 | 1 |
| **Wheelchair-using or chronically ill parent** | Buy, after the fix | Before: Winter Walk Hunt and Penguin Waddle assumed I'd walk or get on the floor. Now guide page 2 says every play works from a chair, a bed or a wheelchair, and the hunt already has a window version. | 1 | 1 |
| **Deaf parent who signs** | Buy, after the fix | "Sign" is now named in the language line. Winter Storm Band is a sound play; its easier line now adds "a hand on the pot feels the thunder", and Freeze Like an Icicle already uses a big arm signal. | 1 | 1 |
| **Military family** | Buy | "Count down to a break, a trip, a birthday or nothing at all" works for counting down to a homecoming, and nothing assumes two parents at home. | 1 | 1 |
| **Rural, low-income family, budget printer, no yard** | Buy | Board-only and list-page options mean I can print 3 pages. $6.50 for 24 plays is fair. Before the fix the hunt assumed snow and a walkable street. | 1 | 1 |
| *Rotating: person of faith* | Buy | Truly secular; no holiday words. It does not compete with our own traditions. | 1 | 1 |

**Scores:** every seat scored J 1/5 and P 1/5 (limit 2). Pass.

### Issues raised and what changed

| Issue | Seat | Fix | Where |
|---|---|---|---|
| Assumes snow and cold | Rural family, grandparent | Hunt card's easier line is now a warm-weather list (a leaf, a bird, a cloud, a shadow and something white); guide page 2 has a "No snow?" box; new FAQ "What if we have no snow?" | `build/content.js` (Winter Walk Hunt), `build/build.js` guide2, `build/listing.py` faq |
| Plays assume a standing, walking parent | Wheelchair-using parent | "Sitting down today?" box on guide page 2: every play works from a chair, a bed or a wheelchair | `build/build.js` guide2 |
| Sound plays assume hearing | Deaf parent | Same box: any sound play can be a see-it or feel-it play; Storm Band easier line adds a feel-it version | `build/build.js`, `build/content.js` |
| Home-language line leaves out signed languages; shy or tired grown-ups | Deaf parent, self-advocate | "Talk, sign, sing and read…" plus "Reading the talk line word for word, or playing quietly side by side, counts too." The lede now says "Say it your way, or read it straight off the card." | `build/build.js` guide2 |
| Wants to know it covers the grandparents' house | Grandparent | Answered in writing: the license covers grandparents and sitters who care for the child (listing license_tiers). A second-home wording is a founder decision (DEMOGRAPHIC-AUDIT T1). | — |
