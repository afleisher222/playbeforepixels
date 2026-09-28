# Customer panel: Visual Routine Cards (Complete Set and Starter Set)

September 28, 2026. This is a simulated panel, not real customers. Treat the comments as a checklist, not as reviews, and never quote them in marketing.

**What the panel looked at:** `cover.png`, `mockup.png`, all 10 Complete Set listing images and the 5 Starter Set listing images, both START HERE pages (shop and Etsy editions), and these Color file pages: 4, 5, 6, 8, 22, 25, 94, 95, 96, 97, 98, 112, 159 and 160. It also looked at Low-ink pages 20 and 22.

## What the panel said

**New parent (a 10-month-old):** I'd buy the Starter Set first. The "One card, one moment" idea for babies is exactly my level, and I like that the grown-up holds the card. But 160 pages froze me. I want START HERE to tell me which two pages to print tonight.

**Worried parent (anxious about screens):** Buy. "Screens get their own steady spot... it never becomes the prize" is the first screen line that hasn't made me feel guilty. Two things undercut it, though:
- The first–then board footer suggests "Play first" then "Screens later", which is the classic earn-your-screen setup.
- The big-kid "Screens later" card has a green check mark on it, so it looks like you get the tablet for finishing your list.

**Grandparent gift-buyer:** Probably buy for my daughter's family. The cover says "200+" but the listing says 230, so which is it? And the terms say "don't print them for others", but printing and laminating a set for my grandson is the whole gift.

**Preschool teacher:** I love the 2.2 in cards, the feelings check-in and the word-free set. The license is one family only, though, and I'd want circle time, line up and recess cards for class. The step numbers on the morning chart also vanish once a card is on them.

**K–5 teacher:** The big-kid checklists are good, with no points and no prizes, and the screen line on the checklist says "list or no list", which I like. My second graders will read "Devices sleep outside" as "put the tablet outside in the rain." I'd need a classroom license.

**Child-care center director:** Diaper change, Nap and Wash hands are all there, and the safety page is written the way my staff talk. I'd buy for six rooms if there were a center license. Right now there isn't, and the listing doesn't say so.

**PTA leader:** I'd hand the Starter Set out at a family night. Is there a group price? The FAQ should answer that without anyone having to email.

**Speech-language pathologist:** I'd recommend it to families. There's one big picture and one word per card, it makes no claims, and the talk tips are plain words. The line "a point is a real answer" is right. It's missing core words families actually need at routines: More, Stop, My turn and a Break card. And "Help, please" makes a child add a politeness word before they can get help. Plain "Help" is better.

**Occupational therapist:** Buy. I like the rounded, sealed laminated edges, no dots under 3, the page-protector route and "away from blind cords". Two things are missing:
- A Break card, and a "quiet ears" choice for noisy moments.
- On the 3×3 morning chart, the number badge sits where the card goes, so a placed card covers step 1, 2, 3 and so on.

**Child, age 7:** "I like the dog one and the checklist circles are big enough to color." "Devices sleep OUTSIDE? In the rain?" "The tablet has a check mark. So I get it if I finish?"

**Autistic adult self-advocate:** Mostly yes. There's no diagnosis marketing, and "Change of plan", "Wait" and the feelings cards are useful. Some things need fixing:
- A first–then board with Screens as the "then" is a reward contingency.
- Children need a Stop and a Break card so they can say no and ask for space, not just be scheduled.
- Requiring "please" to ask for help is a compliance habit. Say plainly that a "no" counts as communicating.
- "Try a bite" is fine as an option but shouldn't be framed as a step.

**Spanish-speaking parent:** Buy. "Talk, sing and read in the language you know best" and the "Bloques" example made me feel welcome. Typing 230 labels in Spanish is a lot, though. Do accents work when I type? The FAQ should say whether a Spanish edition exists.

**Children's librarian:** I'd recommend it on our parenting shelf. There's a real library card and a "Library bag" card, and the WHO line is cited properly. Some things to fix:
- The listing alt text says "200+" while the images say 230.
- There's no alt text for the individual listing images.
- The "Simple, low-ink" sample on the colorway image and in the print guide shows full-color art, which isn't what the Low-ink file prints.
- Libraries would need a license too.

**Panel scores (customer-voice rule 12):** "made me feel judged" 1/5 and "preachy" 1/5. The limit is 2 or lower.

## What changed (product lead)

Every file was rebuilt with `bash build/make-all.sh` after the edits below.

| Issue | Who raised it | Fix | Where |
|---|---|---|---|
| "200+" on the cover, START HERE, PDF titles, listing image 1 and alt text, but the real count differs | Grandparent, librarian | Every title now uses the live card count (235). The PDF metadata title is derived from the manifest. | `build/build.js` coverPage, startHerePage, buildDoc; `build/marketing.js` image 1; `build/make-pdfs.sh`; `build/listing.js` alt_text |
| No core words for routines | SLP, OT, self-advocate | Four new Plan-word cards: **More**, **Stop** (octagon with an open hand, distinct from Wait), **My turn** and **Break** (a child resting in an armchair). New calm-down card: **Quiet ears** (child in ear defenders). The deck is now 235 cards: 177 for ages 0–5 and all ages, 58 for ages 5–12. Page counts are unchanged (Color 160, Low-ink 74, Starter 24). | `build/cards.js`, `build/art.js` |
| "Help, please" makes please a condition for help | SLP, self-advocate | The card now reads **Help**. | `build/cards.js` |
| "Devices sleep outside" reads as outdoors | K–5 teacher, child | Now **Devices sleep outside my room**, on the card and on the big-kid evening checklist. Two-line card labels now wrap evenly (`text-wrap: balance`). | `build/cards.js`, `build/build.js` CL_TASKS, `build/card.js` |
| The big-kid "Screens later" card had a check mark, so the tablet looked earned | Worried parent, child | Check mark removed. The card shows the sleeping tablet and a clock only. | `build/art.js` screensLaterBig |
| The first–then board suggested "Play first" then "Screens later" (screens as the "then" reward) | Worried parent, self-advocate | The footer now suggests "First shoes, then park", which matches the ages page. Rule 13: screens are never the prize. | `build/build.js` chartFirstThen |
| Step numbers were covered once a card was placed on the morning, bedtime and strip charts | Preschool teacher, OT | Numbers now sit outside the card footprint: in a tab above each slot on the 3×3 charts, and beside each slot on the vertical strip. Checked in the mockup with cards placed. | `build/build.js` `.slot .n.tab` / `.n.side`, chartRoutine, chartStrip |
| 160 pages with no "print this first" | New parent | START HERE and the Print guide now have "Start tonight: print just 2 pages", with real page numbers for each file: Color pages 15 and 95, Low-ink pages 15 and 51, Starter pages 9 and 19. They also name four cards from that page. Page numbers are computed at build time. | `build/build.js` assemble (quick), tocPage, startHerePage |
| The "Simple / Low-ink" sample showed full-color art | Librarian | The Print guide sample and listing image 8 now render true line art, from a second, line-art copy of the symbol library. | `build/card.js` DEFS_LO, lowPreview; `build/build.js` tocPage; `build/marketing.js` image 8 |
| Page chip said "Ages 0–5" on pages that mix 0–5 and all-ages groups | Preschool teacher (QA) | Mixed pages now say "Ages 0–5 · All ages". | `build/build.js` cardPages |
| Starter listing image said "Talk tip on every chart", but the horizontal strip had none | QA | The horizontal strip now has its talk tip ("Pause and wait"). The image now reads "Talk tips on the charts". | `build/build.js` chartHoriz; `build/marketing.js` |
| The terms said "don't print them for others", which blocks a gift | Grandparent | Terms (thank-you page and START HERE) now say one family's personal use, including grandparents and sitters. For a gift, pass the files on or print one set for that family. This matches play-talk-cards. It's in human_todo for founder confirmation. | `build/build.js` bonusPage, startHerePage |
| A "no" and a card aren't named as communicating | Self-advocate | Guide page 2 adds "A card is an invitation, never a test." The language tile now says "A sign, a point, a tap on a card, even a "no": it all counts as communicating." | `build/build.js` talkPage |
| Do typed accents work? | Spanish-speaking parent | The Print guide's "What you can type" says accents work (á, ñ, ü) and to write other alphabets by hand. The listing says the same. The Acrobat test in human_todo now includes typing "Sueño, baño". | `build/build.js` tocPage; `build/listing.js` |
| Questions a buyer would otherwise email | Grandparent, teachers, director, PTA, librarian, Spanish parent, self-advocate | `listing.json` gets a 14-question `faq`. It covers prep, delivery, which file, what can be typed, who it's for, gifts, classroom/center/library/PTA ("not yet"), Spanish edition ("not yet"), signing and talkers, ages, safety, professional advice, refunds and Amazon. The Starter Set has its own ages and talker answers. A `language` field is added too. | `build/listing.js` |
| No alt text for individual listing images | Librarian | `listing_images_alt` added to both listings (10 + 5 descriptions). | `build/listing.js` |
| Long description and bullets didn't mention the new cards | QA | Both now name More, Stop, My turn, Break (and Quiet ears in the bullet). The listing notes that typed labels work in any language with accents, and that you can start with just 2 pages. The description is 227 words (limit 120–250). | `build/listing.js` |

**Checks after the rebuild:**
- `node build/check.js` is clean on all 20 HTML sources: no overflow, no clipped labels, nothing in the footer zone, smallest cut piece 1.62 in, and no URL or QR code in any Etsy file.
- `listing.js` length and banned-word checks pass.
- File sizes: Color Letter 14.8 MB (under the 15 MB rule; there is still little room), Low-ink 10.2 MB, Starter 2.5 MB.
- I re-viewed Color pages 5, 22, 95, 96 and 98, Low-ink page 22, START HERE (shop edition), the mockup, and listing images 1, 8 and Starter 4.

## Heard but not changed (and why)

- **Classroom, child-care center, library and PTA licenses** (preschool teacher, K–5 teacher, director, PTA leader, librarian): teacher, school, PTA and child-care products are on hold until employment counsel answers (marketing/CUSTOMER-VOICE.md; marketing/BLIND-SPOTS.md). The FAQ now answers "not yet", and human_todo holds the decision for after counsel.
- **Classroom cards** such as circle time, line up and recess (preschool teacher): they're school-facing, so they're on the same hold. They would belong in a separate classroom pack, not in this family set.
- **Spanish edition** (Spanish-speaking parent): BLIND-SPOTS lists translations as "not now". Word-free cards plus typed labels (accents confirmed in the guide) cover it for now. A Spanish edition would come only after sales, with a human translator. It's in human_todo.
- **"Try a bite" card** (self-advocate): kept. It is one optional card among 235, and the guide already says there's nothing to get right. The new line "A card is an invitation, never a test" covers the concern without removing a card many families ask for.
- **Tip bar on the vertical strip:** the 4-slot strip fills the page height, and a tip would force smaller slots. The strip's talk tip lives in the guide instead.

## Note on the logo

A separate session was rebuilding the brand logo kit (`brand/logo/`, logo v2) while this panel ran. The build takes the logo from `brand/logo/` every time it runs, so the product always uses the supplied files. After the kit settles, run `bash build/make-all.sh` once more so that every PDF, the cover, the mockup and the listing images carry the same logo. BRAND.md's Logo section should be updated by that session to match.
