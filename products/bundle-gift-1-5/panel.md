# Ages 1–5 Instant Gift Bundle: panel notes

The simulated 19-seat customer panel and the color-blind check are below.

## Color-blind check (COMPLIANCE-GATE 20), September 28, 2026

Method: Claude simulated protanopia, deuteranopia and tritanopia (Machado et al. 2009 matrices, full severity) on `preview/listing-images/listing-02.png` (the what's-inside page, whose rows are color-coded by set) and looked at each result. This is a simulation, not a test with color-blind readers.

Result: Pass. The row colors merge in pairs, but every row names its set in words with its own icon, age range and "Start with" note. Each set inside the bundle has its own color-blind check in its own panel.md.

## Customer panel (19 seats), September 28, 2026

This is a simulated panel, not real customers. Treat the comments as a checklist, never as reviews, and never quote them in marketing (`ops/TESTIMONIAL-LOG.md` rule 1). Seats: the usual 13 plus the six required seats from `marketing/CUSTOMER-VOICE.md` ("Simulated panel: required seats"). Every seat scored "made me feel judged" (J) and "preachy" (P) out of 5; the limit is 2 or lower (CUSTOMER-VOICE rule 12).

**What the panel looked at:** `cover.png`, `mockup.png`, the 5 listing images, the bundle's own pages (cover, what's inside, fold card, reveal cards, last page), both START HERE pages (store and Etsy), `listing.json`, and the rebuilt parts it contains (busy book, family kit, bored cards, Play & Talk cards) as panelled in their own `panel.md` files.

| Seat | Buy? | What they said | J | P |
|---|---|---|---|---|
| New parent | Buy | START HERE tells me which ZIP to open first; I don't have to read four guides tonight. | 1 | 1 |
| Worried parent | Buy | Nothing in the gift pages talks about screens as a danger. | 1 | 1 |
| Grandparent gift-buyer | Buy | The fold card and "the license passes to the family who receives it" answer my gift question. | 1 | 1 |
| Preschool teacher | At home only | Honest that it's a family license. | 1 | 1 |
| K–5 teacher | For younger siblings | Ages 1–5 is on every tile. | 1 | 1 |
| Child-care center director | Recommend to families | Each set keeps its own safety page; the bundle doesn't water that down. | 1 | 1 |
| PTA leader | Maybe as a raffle prize | Would need a group license, which is not offered yet (the listing says so). | 1 | 1 |
| Speech-language pathologist | Recommend | Talk lines everywhere, no therapy words. | 1 | 1 |
| Occupational therapist | Recommend | Cutting is spread across sets; a family can start with the no-cut pages. | 1 | 1 |
| Child, age 4 (read aloud) | — | "Is the present for me?" | — | — |
| Autistic adult self-advocate | Yes | Every way of playing counts, in every set. | 1 | 1 |
| Spanish-speaking parent | Buy | English only, stated plainly; "sign, sing and read in the language you know best" is in each guide. | 1 | 1 |
| Children's librarian | Point families to it | Clear which file is which. | 1 | 1 |
| **Dad who is the main parent** | Buy | The busy book's My people page now says "Mama, Daddy, Mommy, Papa…"; the cover grown-up is neutral. | 1 | 1 |
| **Two-mom or two-dad family** | Buy | Two same-role names side by side on the busy book page; the gift card has no "Mom and Dad" line. | 1 | 1 |
| **Wheelchair-using or chronically ill parent** | Buy, after the fix | START HERE's Safety box and every part's guide now say every play works from a chair, a bed or a wheelchair. | 1 | 1 |
| **Deaf parent who signs** | Buy | "Sign" is named in each part's language line; sound plays now have see-it or feel-it versions. | 1 | 1 |
| **Military family** | Buy | The family kit now says video calls with people you love are talk time, not screen time. | 1 | 1 |
| **Rural, low-income family, budget printer, no yard** | Buy, carefully | Five ZIPs are a lot on a phone with patchy data; START HERE says download only the format you need. "Anywhere Picnic" no longer assumes a yard. Low-ink files are in every set. | 1 | 1 |
| *Rotating: foster or kinship carer* | Buy | "Look at photos of people we love" (family kit) works for us; "family photos" did not. | 1 | 1 |

**Scores:** every seat J 1/5 and P 1/5 (limit 2). Pass.

### Issues raised and what changed

| Issue | Seat | Fix | Where |
|---|---|---|---|
| START HERE didn't say plays work seated | Wheelchair-using parent | Safety box: "Every play works from a chair, a bed or a wheelchair." | `build/shared/bundle.js` (also used by the Library) |
| Inherited part fixes (sign line, talk-line reassurance, dad and two-parent names, video calls, Anywhere Picnic, photos of people we love, hook-and-loop wording) | Dad, two-mom family, Deaf parent, military family, rural family, foster carer | Fixed in each part and rebuilt; the bundle ZIPs are built from the parts' files at staging time | each part's `build/` |
| Five ZIPs on a phone | Rural family | Answered in writing: START HERE already says download only the format you need; a no-ZIP option is not possible on Etsy (5-file limit). | — |
