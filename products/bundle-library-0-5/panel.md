# Birth-to-5 Printable Library: panel notes

The simulated 19-seat customer panel and the color-blind check are below.

## Color-blind check (COMPLIANCE-GATE 20), September 28, 2026

Method: Claude simulated protanopia, deuteranopia and tritanopia (Machado et al. 2009 matrices, full severity) on the what's-inside and gift pages (same template as the Gift Bundle, `preview/listing-images/listing-02.png`) and looked at each result. This is a simulation, not a test with color-blind readers.

Result: Pass for the same reason as the Gift Bundle: every set row is named in words with an icon and an age range. Each set has its own check in its own panel.md.

## Customer panel (19 seats), September 28, 2026

This is a simulated panel, not real customers. Treat the comments as a checklist, never as reviews, and never quote them in marketing (`ops/TESTIMONIAL-LOG.md` rule 1). Seats: the usual 13 plus the six required seats from `marketing/CUSTOMER-VOICE.md` ("Simulated panel: required seats"). Every seat scored "made me feel judged" (J) and "preachy" (P) out of 5; the limit is 2 or lower (CUSTOMER-VOICE rule 12).

**What the panel looked at:** `cover.png`, `mockup.png`, the 5 listing images, the Library's own pages (cover, what's inside, fold card, reveal cards, last page), both START HERE pages, `listing.json` and `zip-manifest.json`, plus the six rebuilt parts as panelled in their own `panel.md` files.

| Seat | Buy? | What they said | J | P |
|---|---|---|---|---|
| New parent | Buy | "Start with the set for your child's age today; the rest waits" is the line that sells it. | 1 | 1 |
| Worried parent | Buy | Calm, no fear words, no "fix your child". | 1 | 1 |
| Grandparent gift-buyer | Buy | $45 for six sets feels like a real present; the gift pages make it feel wrapped. | 1 | 1 |
| Preschool teacher | At home only | Honest family license. | 1 | 1 |
| K–5 teacher | For younger siblings | Birth to 5 is clear. | 1 | 1 |
| Child-care center director | Recommend to families | 181 routine cards is a lot; the routine set's START HERE says start with one routine. | 1 | 1 |
| PTA leader | Not for a group yet | No group license yet, stated honestly. | 1 | 1 |
| Speech-language pathologist | Recommend | Consistent talk moves across all six sets. | 1 | 1 |
| Occupational therapist | Recommend | Hook-and-loop only for ages 3+ with "check dots before each play" in every set that uses it. | 1 | 1 |
| Child, age 4 (read aloud) | — | "The bear… no, the busy book!" | — | — |
| Autistic adult self-advocate | Yes | Routine cards include Break, Stop and Quiet ears; nobody is told to make eye contact. | 1 | 1 |
| Spanish-speaking parent | Buy | English only, stated. Fillable fields take accents. | 1 | 1 |
| Children's librarian | Point families to it | Only on the website (ZIPs are over Etsy's limit); the FAQ explains why. | 1 | 1 |
| **Dad who is the main parent** | Buy | "Daddy" now appears in the busy book; nothing assumes a mom. | 1 | 1 |
| **Two-mom or two-dad family** | Buy | Blank and photo-frame routine cards take any names. | 1 | 1 |
| **Wheelchair-using or chronically ill parent** | Buy, after the fix | Every part's guide and the Library START HERE now say every play works from a chair, a bed or a wheelchair; 100 Plays' "Follow me" play now says "crawl, scoot or roll… or wave from your chair". | 1 | 1 |
| **Deaf parent who signs** | Buy | "Talk, sign, sing and read" in every guide; Kitchen band now adds a feel-the-beat line. | 1 | 1 |
| **Military family** | Buy, after the fix | The routine cards now include Video call, Other home, Grown-up at work and Count the sleeps in the base set. | 1 | 1 |
| **Rural, low-income family, budget printer, no yard** | Buy, carefully | Big download and a lot of ink if printed all at once; low-ink files and "start with one set" help. Nothing requires a yard now ("Anywhere Picnic"). | 1 | 1 |
| *Rotating: foster or kinship carer* | Buy | "Photos of people we love" and "Other home" fit our family. | 1 | 1 |

**Scores:** every seat J 1/5 and P 1/5 (limit 2). Pass.

### Issues raised and what changed

| Issue | Seat | Fix | Where |
|---|---|---|---|
| No cards for people who aren't in the room | Military family, foster carer | Four new routine cards in Out & about: Video call, Other home, Grown-up at work, Count the sleeps (Visual Routine Cards 0–5 now 181 cards) | `visual-routine-cards/build/cards.js`, `art.js`; `build/zip-config.json` count |
| START HERE didn't say plays work seated | Wheelchair-using parent | Safety box line (shared with the Gift Bundle) | `bundle-gift-1-5/build/shared/bundle.js` |
| Inherited part fixes | Several | Fixed and rebuilt in each part | each part's `build/` |
| Download size and ink | Rural family | Answered in writing: download one ZIP at a time; low-ink files in every set; START HERE lists the first pages to print. | — |
