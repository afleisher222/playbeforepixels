# Demographic Audit: who is still left out of the launch lineup and the site

Written September 28, 2026. This is a read-only audit: no product file was changed. It covers the nine launch products (`toddler-busy-book`, `visual-routine-cards` 0–5 edition, `bored-play-cards` ages 1–5, `play-first-family-kit` 2–5, `play-talk-cards`, `guide-100-plays`, `bundle-gift-1-5`, `winter-countdown`, `course-screen-reset`) and `site/` (screenshots in `site/shots/` plus the source in `site/src/` and `site/config.json`).

**What I looked at.** Covers, mockups and a sample of rendered pages for every product (preview PNGs combined into contact sheets), including routine card pages 2–5 and 8–22, busy book pages 4, 7, 20, 30, 45, 65, 70, 92, 110 and 120, family kit pages 1, 3, 4, 10, 20, 25, 30 and 35, and guide, course, bundle, winter and talk-card pages. I also looked at the site home page at 1440 px, the shared cast code (`products/*/build/chars.js` / `base.js`), the card lists, the play text and every `listing.json`.

**What this does not repeat.** Things already handled are left out: the home-language line, "a sign, a point or a tap counts", talker-as-voice, Break/Stop cards, the no-guilt test, low-ink files, Spanish editions, the two-home, grandfamily, deployment, foster, sitter, dad, small-space, car/transit and faith editions in COMMUNITY-PRODUCTS.md, and every fix already logged in each `panel.md`. **Main finding about the panels:** all 13 simulated panels use the same 13 people. None of them is a dad, a same-sex couple, a disabled or Deaf parent, a military family, a rural or low-income family, a foster carer or a person of faith. That is why the gaps below were never raised.

**Hard rules applied.** No health or outcome claims. No autism or disability targeting in marketing: every inclusion fix below lives inside the product and is written for every family, never as a listing keyword or an audience. Nothing about the founder.

Evidence from memory, not checked this session, is marked **UNVERIFIED**.

---

## 1. Score grid

Key: **F** = fine · **m** = minor fix · **G** = real gap. Columns: TBB busy book · VRC routine cards 0–5 · BPC bored cards 1–5 · PFK family kit 2–5 · PTC play & talk cards · G100 100 plays guide · BUN gift bundle 1–5 · WIN winter countdown · CRS 30-day course · SITE.

| Lens | TBB | VRC | BPC | PFK | PTC | G100 | BUN | WIN | CRS | SITE |
|---|---|---|---|---|---|---|---|---|---|---|
| Dad as main parent | m | F | F | F | m | m | m | F | F | F |
| Two moms / two dads | m | F | F | F | F | F | F | F | F | m |
| Single parent | F | F | F | F | F | F | F | F | F | F |
| Grandparents raising grandchildren | m | F | F | F | F | F | F | F | F | F |
| Foster / adoptive | F | F | F | m | m | F | F | F | m | F |
| Co-parenting across two homes | m | m | m | m | m | m | m | m | m | m |
| Military / far-away grown-up | F | m | F | m | F | F | F | F | F | F |
| Race and skin tone in the art | F | F | F | F | F | F | F | F | F | F |
| Hair, head coverings, older men, body size | G | G | G | G | G | G | G | G | G | G |
| Religion (is the winter set secular?) | F | F | F | F | F | F | F | F | F | F |
| Names | F | F | F | F | F | F | F | F | F | F |
| Foods | m | m | F | F | F | F | m | F | F | F |
| Holidays and climate | F | F | F | F | F | F | F | m | F | F |
| Income: ink, materials, printer access | m | F | F | F | F | F | F | F | F | m |
| Small homes, no yard, shared rooms | F | F | m | m | F | F | F | F | F | F |
| Rural and urban settings | F | m | F | F | m | F | F | F | F | F |
| Disability in the child (seen in the art) | G | G | G | G | G | G | G | G | m | G |
| Disability in the parent (mobility, chronic illness) | m | F | m | m | m | m | m | m | m | F |
| Deaf and hard of hearing (child or parent) | m | m | m | m | m | m | m | m | m | F |
| Blind and low vision | F | m | F | F | F | m | F | F | m | F |
| Children who use AAC (text) | F | F | F | F | F | F | F | F | F | F |
| Neurodivergent children | F | F | F | F | F | F | F | F | F | F |
| Neurodivergent, shy or second-language parents | m | m | m | m | m | m | m | m | m | F |
| Home language and reading level | F | F | F | F | F | F | F | F | F | m |
| Working parents with no time | F | F | F | F | F | F | F | F | F | F |
| Sensory differences | F | F | F | F | F | F | F | F | F | F |
| Gender roles in the activities and art | F | m | F | F | F | F | F | F | F | F |
| Tone: guilt, preachiness, screen-using families | F | F | F | F | F | F | F | F | m | m |

### Why each cell scored the way it did

- **Race and skin tone: fine.** The shared cast has a six-step skin range (`SK` in every `chars.js`), from very light to very dark, and textured hair (puffs, curls). The routine-card faces and hands cover the range evenly. Black children and adults lead the covers of the winter set, the family kit and the course, and the site's hero spread.
- **Hair, head coverings, older men and body size: real gap everywhere.** Every lineup product draws from the same 5 children and 5 adults (`KIDS` A–E, `ADULTS` G1–G5).
  - Every adult uses one body template (`g-body`, 54 units wide), so there are no larger or smaller bodies.
  - The only older adult is G4, a grandmother with a gray bun. No older man appears in any lineup product, although the course text says "Grandpa played with a box too!".
  - A `beard` symbol exists but is used once (course, `build/parts.js:78`).
  - The only head covering is G5's African-style wrap. There is no hijab, turban or kippah.
  - Straight black hair on light-to-medium skin, which many East and South Asian families would read as theirs, is missing from the adult cast and thin among the children (kid E is auburn).
- **Disability in the child, seen in the art: real gap.** The lineup draws no wheelchair, walker, hearing aid, cochlear implant, AAC device, limb difference or cane. The disabilities in the art are glasses on the course cover child and in a few busy-book pieces, plus "Quiet ears" ear defenders on the routine cards.
  - The talker appears in text only.
  - BRAND-RESPECT-PLAN move 5 and CUSTOMER-VOICE rule 35 require an inclusive cast in every series. So far that has only been done in `board-up-go-more` (a hearing aid) and `picture-laps-not-apps` (a grandmother who uses a wheelchair), and neither is in the lineup.
  - The shared symbols already exist: `aid` in `board-up-go-more/build/build.js:19` and `wheelchair` in `picture-laps-not-apps/build.js:213`. Porting them into the shared cast needs design time, not a new illustrator.
- **Site disability: real gap, caused by a bug.** The home page's best inclusion moment is cut off. See fix S1.
- **Two homes: minor, everywhere.** Every personal license covers "one family… including grandparents and sitters". It does not cover a child's second home. `first-phone-plan/listing.json:35` already says "including a second home", so the wording exists but hasn't reached the lineup. The course FAQ contradicts itself: "anyone in your household can use it. Forward the emails to your co-parent."
- **Religion: fine, with one note on timing.** The winter set bans every holiday and faith word at build time (`winter-countdown/build/content.js:208`), and its FAQ answers the question well. But a 24-day countdown that is listed Oct 25–Dec 5, where "many families start on the first of the month", ends on December 24. Buyers will still read it as an Advent swap, and that is fine; just don't market it against Advent. Its real gap is climate (see fix W1).
- **Dads: minor.** Across the nine products' source, the word "Dad" never appears, and "Mom" appears once. The text stays neutral ("grown-up"), which is good. But 5 of the 7 covers with an adult show a female-coded adult (busy book, talk cards, guide, bundle, family kit). The only examples of a caregiver name are Mom, Ima, Abuela, Nonno, Auntie, and Grandma.
- **Tone: very good.** The only lines that suggest a screen can't do what a parent does are one course line and one home-page statistic (fixes C1 and S3). No fail words were found.
- **Reading level.** A syllable-count estimate puts the listing descriptions at about grade 4.5–6.6 and the play and lesson text at about grades 2.5–3.6. Fine.

---

## 2. Every fix: file, current text or image, replacement

IDs match the ranked list in section 3. "No decision" means it's a copy or code change inside existing rules. "Founder" means the founder has to approve it. "Reader" means it needs a paid sensitivity reader. "Art" means new or ported illustration.

### Site

**S1. The home-page spread cuts out the grandmother in the wheelchair.** No decision.
- `site/config.json` lines 291–295. Current: `"spread": ["preview/p06.png", "preview/p07.png"]`, alt "…Dad in his armchair saves a seat, and Grandma rolls in with a book on her knee."
- The book's spreads begin on odd pages: p05+p06 is spread 1 and p07+p08 is spread 2. So the site shows the right half of one spread next to the left half of the next. The text "Then Grandma rolls in" sits above an empty room. Grandma, who uses a wheelchair, is on p08 ("Her lap is a lap with the very best wheels"), and it isn't shown. The same off-by-one hits lines 298–301 (`p14`/`p15`).
- Replace with `"spread": ["preview/p07.png", "preview/p08.png"]`, alt: "A spread with the sample name Maya: Grandma rolls in with a book on her knee, and Maya reads on her lap in her wheelchair." Change lines 298–301 to `p15`/`p16`, or `p13`/`p14`, after checking which pair matches the alt text. Then re-shoot `site/shots/home-*`.
- The personalized book also has a fixed "Dad" (only `{{GRANDMA}}` is a variable). See idea 5.

**S2. The license page and help center say "household".** Founder approval (license wording, but it copies wording already approved in first-phone-plan).
- `site/src/templates/pages.js:146` current: `<li>The buyer and their household</li>` → `<li>The buyer's family, including a child's second home, grandparents and sitters</li>`.
- `site/src/templates/help.js:42` current: "…unlimited copies for your own household." → "…unlimited copies for your own family, including a child's second home, grandparents and sitters who care for your child."

**S3. The home-page deficit number.** No decision.
- `site/src/templates/home.js:156` current: `<b class="num">194</b>fewer conversational turns per day, linked with screen time at 36 months (Brushe ME et al., JAMA Pediatrics 2024). An association, not proof…`
- This is the only number in the colophon, and it measures a loss for families who use screens. Move it to the research notes page, where the evidence label sits next to it. Replace it in the colophon with a product fact: `<b class="num">1</b>talk line on every page, in any language your family speaks.`

**S4. The help center has no answers on languages, family types or printing without a printer.** No decision. Add to `site/src/templates/help.js`:
- "Is it only in English?" → "The printed words are in English for now. Every talk line works in any language, including signed languages. Type or write your own words on the blank cards."
- "Does it work for our family?" → "Every page says 'grown-up', not Mom or Dad, and the blank cards take any names: Mama and Mommy, Dad and Papa, Nana, Tío, Auntie. Two homes? Print a set for each; your license covers both."
- "No printer?" → "Most pages are in plain black and white in the low-ink file. Public libraries and print shops can print from a USB stick; start with the pages the START HERE file lists." Don't quote library prices; they vary (UNVERIFIED).

### All printables: shared template lines

**T1. The license line leaves out the child's second home.** Founder approval, as in S2.
- Current, in `visual-routine-cards/build/build.js:564` and `:614`, `bored-play-cards/build/build.js`, `play-talk-cards/build/build.js` and `listings.js`, `winter-countdown/build/build.js`, and the `license_tiers.covers` field of every lineup `listing.json` (including the listing variants listed by `grep -l "grandparents and sitters"`): "one family's personal use, including grandparents and sitters (who care for your child)".
- Replace with: "one family's personal use, including a child's second home, grandparents and sitters who care for your child."
- Course, `course-screen-reset/build/content.js:718` current: "Yes, anyone in your household can use it. Forward the emails to your co-parent." → "Yes. Your license covers your family, including a co-parent in a second home and grandparents who care for your child. Forward the emails to them."

**T2. Add "sign" to the home-language line.** No decision. Update CUSTOMER-VOICE rule 28 in the same pass.
- Current (TBB `extra-pages.js:137`, VRC `build.js:460`, BPC `build.js:496`, PFK `build.js:508`, PTC `build.js:120`, G100 `book.js:278`, WIN `build.js:158`, CRS `extras.js:161` and `workbook.js:174`): "Talk, sing and read in the language you know best."
- Replace with: "Talk, sign, sing and read in the language you know best."
- Deaf parents whose home language is ASL or another signed language then see their language named as a language, not only as "a sign counts".

**T3. Add one line saying every play works sitting down**, for parents who use a wheelchair, parents with pain, fatigue or a new injury, pregnant or postpartum parents, and older grandparents. No decision. Put it in each guide's "how plays work" box.
- G100: `book.js:260`, after "…with a grown-up right there."
- TBB: the "Every way of playing counts" card, `extra-pages.js:139`.
- BPC: the grown-up guide, "Tired grown-up?" box.
- PFK: guide page 4.
- PTC: the how-to card.
- WIN: guide page 2.
- CRS: `content.js`, safety and ages page.
- Text: "Every play works from a chair, a bed or a wheelchair too. Bring it up to a table or tray, and let your child do the fetching and moving while you do the talking."
- Also, G100 play 44 "Follow me, follow you", `plays.js:238`, current: "Crawl around the room and invite your toddler to follow." → "Crawl, scoot or roll around the room, or wave from your chair, and invite your toddler to follow."

**T4. Sound plays get a see-it or feel-it version.** No decision. It's written for every family and never marketed to Deaf families.
- One line in each guide beside T3: "Any sound play can be a see-it or feel-it play: a light flick for 'stop', a hand on the pot for the beat, a stomp you feel through the floor."
- Plays to check:
  - PTC "Close your eyes. How many sounds can you hear right now?" and "Sound Walk";
  - BPC "What's That Sound?" and "Stop-and-Go Dance";
  - WIN "Winter Storm Band" and "Freeze Like an Icicle";
  - G100 "Kitchen band";
  - TBB "night-night" ("Whisper").
- Each gets an easier or 2-minute line such as "Or: flick the light for stop."

**T5. Tell parents that reading the talk line word for word counts.** This is for neurodivergent, shy, tired or second-language grown-ups. No decision. Every guide coaches the child's way of playing, and none reassures the parent. Add to each grown-up guide next to the three talk lines: "You don't need to be chatty. Reading the talk line straight off the card, playing quietly side by side, or saying the same line every time all count. Your way of playing is part of it too."

### Toddler Busy Book

**TBB1. The "My people" example leaves out dads and two-parent names.** No decision.
- `products/toddler-busy-book/build/extra-pages.js:303`, current: "Use any names your family uses: Mom, Ima, Abuela, Nonno, Auntie, our cat…"
- Replace with: "Use any names your family uses: Mama, Daddy, Mommy, Papa, Abuela, Nonno, Auntie, Grandpa, our cat…" This adds a dad and puts two same-role names side by side, without calling attention to it. Keep "Ima" if the founder wants a Hebrew example: "Mama, Daddy, Ima, Papa…". Check that the line still fits.

**TBB2. The café foods are all Western.** Art, but it can be drawn in-house in the existing SVG style.
- Current food pieces in `art.js` and `acts-*.js`: apple, banana, pizza, toast, milk, cupcake, pear, cheese, cake, bread.
- Add a rice bowl, noodles, flatbread or tortilla, and dumplings as café and "pretend food" pieces, each at least 2 in. They are pictures, so no choking check applies. The talk lines stay the same ("What would you like?").

### Visual Routine Cards (0–5)

**VRC1. Add ordinary cards for the child's own aids, drawn as generic devices.** Founder approval plus one disability sensitivity reader.
- New cards: "Glasses on", "Hearing aids in" and "My talker". Put them in Morning ("Glasses on", "Hearing aids in") and Plan words ("My talker"), in `visual-routine-cards/build/cards.js` `LIST.morning` and `LIST.words`.
- Don't market them. The listing only says "blank and everyday cards for every child".
- This is a routine need for any child who wears glasses or hearing aids, and it keeps to the targeting rule.

**VRC2. Add cards for people who aren't in the room.** No decision.
- Add to `LIST.about` or a new "People" row: "Video call" (generic device), "Other home" (a small house with a heart), "Grown-up at work" and "Count the sleeps".
- This serves military, two-home, shift-work and immigrant families, and families with relatives far away, without naming any status. COMMUNITY-PRODUCTS plans these only inside separate paid editions, but one card each belongs in the base set.

**VRC3. Hair and body-care cards assume straight hair.** No decision; code art.
- `art.js:131` `brushHair` draws a paddle brush. `washHair` (`art.js:227`) shows a straight-haired child.
- Swap the paddle brush for a wide-tooth comb. Add a "Hair wrap / bonnet" card to Bedtime, a common routine in many Black families, and a "Lotion"-style "Hair oil" card is optional.
- Add "Shower" and "Wash up" to the 0–5 Bath row for families with no tub. "Shower" exists only in the 5–12 set.

**VRC4. The Dress-up card is a girl in a dress and crown.** No decision; code art.
- Redraw it as a child in a cape and a hat, or rotate the cast (kid B or D), so dress-up isn't coded as a girls' thing.

**VRC5. Meals and places.** No decision.
- The Breakfast, Lunch and Dinner art is cereal, a sandwich and pasta with broccoli. Swap one to a rice bowl, or add a blank "Our food" card that is pre-labeled but left undrawn.
- Out & about has Bus ride and Airplane but no Train or subway. Add "Train ride".
- For apartment families, add "Stairs or elevator" and "Laundromat". All are small, one-symbol cards.

**VRC6. Add a touch-and-see tip to the grown-up guide.** For low-vision children and parents, and every toddler. No decision.
- Add to guide page 2, `build.js` talk page: "Some families tape a small real thing to a card (a sock on 'Socks on', a spoon on 'Breakfast') so it can be felt as well as seen."
- Don't describe it as a technique or a therapy.

### "I'm Bored" Play Cards (1–5)

**BPC1. The title assumes a backyard.** No decision.
- `bored-play-cards/build/cards.js:206`, current title: `'Backyard Picnic'`. Replace with `'Anywhere Picnic'`, and keep the easier version ("Picnic on the living-room floor", `companion.js:179`).
- In the 5–12 file, "Backyard Games Day" and "Backyard Camp" (`cards.js:121`, `:162`) become "Games Day" and "Camp Night".

### Play-First Family Kit (2–5)

**PFK1. "Screens sleep outside bedrooms" doesn't work in shared rooms or studios.** No decision.
- `play-first-family-kit/build/content.js:86`, current: `'Screens sleep outside bedrooms at night.'`
- Replace with: `'Screens sleep in their spot at night.'` The fixed spot is the idea, and it fits a one-room home, a shared room and a parent who sleeps next to the child.

**PFK2. Video calls aren't named as talk.** No decision.
- `play-first-family-kit/build/build.js:521`, after the talker line, add: `<li>Video calls with people you love are talk time, not screen time. Wave, show and tell.</li>`
- The same line already exists in `guide-100-plays/build/book.js:520`. Without it, "screens rest at meals, in the car and at night" can read as a ban on the nightly call with a deployed parent, the other home or grandparents abroad.

**PFK3. "Look at family photos".** No decision.
- `content.js:100`, current: `'Look at family photos'`. Replace with: `'Look at photos of people we love'`, and in the play guide's easier line add "photos of people and places from now are just as good".
- This avoids assuming baby or birth-family photos exist (foster, adoptive and kinship families).

### Play & Talk Cards

**PTC1. The "In the car" section assumes a car.** No decision.
- `play-talk-cards/build/content.js:108`, current: `{ key: 'car', name: 'Car', long: 'In the car', … where: 'Keep them in the glove box or a door pocket.' }`
- Replace with: `name: 'On the way', long: 'On the way: car, bus, train or walk', where: 'Keep them in a bag, a pocket or the glove box.'`
- Line 132, current: "If this car could take us anywhere in one second, where would we go?" → "If we could go anywhere in one second, where would we go?"
- Line 146, current: "What would a fish say about our bathtub?" → "What would a fish say about our bath?" This works for families with a shower or a bucket bath too.

**PTC2. "What's your favorite memory of our family?"** No decision. Keep it, but make sure the "Passing is okay" card is printed on every card sheet, not only once in the deck. That protects a child who is new to a family.

### 100 Screen-Free Plays

**G100-1.** Apply T3 (including play 44), T4 and T5. The cover shows a light-skinned blond woman (G3). When the cast bible is built (section 4), consider a second-edition cover showing a father figure or a grandparent.

### Gift Bundle 1–5

**BUN1.** No changes to the bundle itself; it inherits the fixes to its four parts. Its listing already tags "grandparent gift". Add "gift for dad" and "new dad gift" to the keyword test list in the monthly research run (UNVERIFIED search demand).

### Winter Countdown

**W1. It assumes snow and cold.** No decision.
- `winter-countdown/build/content.js:76` (Winter Walk Hunt), current hunt list: "a bare tree, a bird, a puddle or ice, your foggy breath and something white".
- Add to the guide (`build.js`, guide page) and the FAQ: "No snow where you live? Every play works indoors, and the hunt card has a warm-weather list: a leaf, a bird, a cloud, a shadow and something white."
- Put those five as the hunt card's "easier" alternatives. For warm US states and for Southern Hemisphere buyers, where December is summer, see idea 2.

### 30 Days of Back-and-Forth (course)

**C1. Drop the comparison with screens.** No decision.
- `course-screen-reset/build/content.js:181`, current: "Ten minutes of connection often makes the next hour calmer. It fills a cup that a screen can't."
- Replace with: "Those ten minutes are just for the two of you." This removes both the implied behaviour outcome and the comparison with screens.

**C2. The phone lesson assumes a grown-up's phone is optional.** No decision.
- Day 24, `content.js` (the "Grown-up phones" lesson, after "Phones are where our work, our bills, our friends and our news live."), add: "For some grown-ups a phone is also how they hear, see, talk or manage their health: captions, video calls in sign language, reading aloud, reminders. That's not screen time. Keep it with you and say what it's doing: 'My phone is helping me hear Grandma.'"
- Keep this general. Don't name conditions, and make no health claim.

**C3.** Apply T1 (FAQ), T2, T3, T4 and T5.

### Cast: all illustrated products

**K1. Extend the shared cast.** Founder approval for the cast bible; a paid disability reader for the device drawings.
- Add to the cast in `chars.js` / `base.js`, which is copied into `bored-play-cards`, `course-screen-reset`, `guide-100-plays`, `play-talk-cards`, `play-first-family-kit`, `visual-routine-cards` and `first-phone-plan`:
  - G6, an older man: gray hair, the existing `beard` symbol, glasses;
  - G7, a larger-bodied adult: a `g-body-wide` symbol about 70 units;
  - G8, an adult in a hijab: a new `h-hijab` symbol;
  - a child with straight black hair on SK[1] or SK[2];
  - flags for a hearing aid (`aid`, ported from `board-up-go-more/build/build.js`), a wheelchair (ported from `picture-laps-not-apps/build.js:213`), glasses, and a generic picture-board talker.
- Then add one of them, shown in passing, to one picture in each product, for example:
  - VRC "Play with a friend": a friend in a wheelchair;
  - BPC cover jar scene: a child with a hearing aid;
  - PFK cover: swap in G6 (grandpa);
  - PTC cover: G7;
  - WIN cover: add G8 or G6 at the snowman;
  - TBB "hi" page (p20): a child waving from a wheelchair;
  - G100 age-band openers: one per band.
- Follow the cast rule: they simply take part, never as a lesson, with no caption and no marketing.

---

## 3. The 10 highest-value changes, ranked

### No founder decision needed (copy and code edits inside current rules)

| Rank | Change | Fix IDs | Why it's worth doing |
|---|---|---|---|
| 1 | Fix the home-page spread so the grandmother in the wheelchair is visible (and fix the second off-by-one spread) | S1 | The site's most visible inclusion moment is currently cut off, and the text above it points at an empty room. One JSON line. |
| 2 | "Screens sleep in their spot" and "Video calls are talk time" in the Family Kit | PFK1, PFK2 | Makes the core screen rules work for shared rooms and studio apartments, and for military, two-home and immigrant families who rely on calls. |
| 3 | "Every play works from a chair, a bed or a wheelchair" plus the see-it or feel-it line, in every guide | T3, T4 | The only fix in this audit for disabled parents, Deaf families and older grandparents. Two sentences per product. |
| 4 | "Talk, sign, sing and read…" and "reading the talk line word for word counts" | T2, T5 | Names signed languages as home languages, and gives neurodivergent, shy and second-language parents permission to play their own way. |
| 5 | Talk-deck "On the way" section, "Anywhere Picnic", the no-snow hunt list and "photos of people we love" | PTC1, BPC1, W1, PFK3 | Removes the assumption of a car, a yard and snow, and of birth-family photos, at almost no cost. |
| 6 | "Mama, Daddy, Mommy, Papa…" on the busy book's My people page, plus the four "people who aren't here" routine cards | TBB1, VRC2 | The first time "Dad" appears anywhere in the lineup, a quiet signal to two-mom and two-dad families, and cards military and two-home families need daily. |

### Needs a founder decision, a paid sensitivity reader or new illustration

| Rank | Change | Fix IDs | What it needs |
|---|---|---|---|
| 7 | Cover a child's second home in every license (copy the first-phone-plan wording) | T1, S2 | Founder approval of the license text. No reader. |
| 8 | Extend the shared cast: older man, larger body, hijab, straight black hair, and hearing-aid, wheelchair and talker flags, one appearance per product | K1 | Founder approval of a cast bible, plus 1 paid disability sensitivity reader for the device drawings (BRAND-RESPECT move 5 budgets $300–600 per read, UNVERIFIED). The symbols are code-drawn and two already exist. |
| 9 | Glasses, hearing-aid and talker routine cards | VRC1 | Founder approval plus the same disability reader (share the review with #8). |
| 10 | Hair and food variety: wide-tooth comb, bonnet card, shower card; rice, noodles, flatbread and dumplings in the busy-book café and on the meal cards | VRC3, VRC5, TBB2 | New code-drawn symbols. A paid cultural reader (hair care especially) is advisable before launch. |

Also do, at lower priority: C1 and C2 (course lines, no decision), S3 and S4 (site, no decision), VRC4 and VRC6 (no decision).

**Process change behind all of this: widen the simulated panel.** Add six seats to the template in `ops/ROUTINE.md` and every future `panel.md`: a dad who is the main parent, a two-mom or two-dad family, a wheelchair-using or chronically ill parent, a Deaf parent who signs, a military family, and a rural family with a budget printer and no yard. The current 13 seats never raised any of the gaps above.

---

## 4. Product and edition ideas for groups still left out

These are not in COMMUNITY-PRODUCTS.md. Each targets a **situation**, never a status or a diagnosis, and every demand claim is a hypothesis for the monthly research run.

1. **Sit-Down Plays: 60 Plays You Can Run From a Chair, Couch or Bed.** For grown-ups with limited mobility, chronic illness, pain, pregnancy, recovery or older age. It is marketed on the situation ("on the days you can't get down on the floor"), never on disability or health. It reuses the tired-grown-up versions already written for every play (bored cards, 100 plays, winter, course), so it is mostly a re-sort. No health claims. Demand UNVERIFIED.
2. **24 Days of Play: Summer Countdown.** Same template as the winter set, with a sun, water and shade theme. It serves Southern Hemisphere families at their December–January summer break, warm-climate US families who find the winter set doesn't fit, and Northern Hemisphere families in June. A second seasonal listing on existing art, with no faith review needed.
3. **Touch-and-See Routine Add-On.** Texture tags and object-card templates for the base routine cards, sold as a universal touch-and-feel sensory feature for every toddler (never as a vision or disability product). Needs a disability reader. Low priority, but it's the only product idea in the catalogue that serves blind and low-vision families.
4. **Our Signs, Our Words family page (free).** A blank "our family's words" sheet in the free lead magnet with three columns: say it, sign it (drawn by the family), our language. It covers Deaf, signing, multilingual and AAC families in one universal page, at no cost. It is not the held ASL product (#33); nothing is taught.
5. **A caregiver-name option in the personalized book.** Out of lineup scope, but the site features it. `picture-laps-not-apps` personalizes `{{GRANDMA}}` but prints "Dad" as fixed text. Adding a `{{GROWNUP}}` field (Dad, Mama, Papa, Mommy, Tía, blank) opens the site's hero product to two-mom families, single-mom families and kinship carers. Build it in `personalization.json` and `personalize.js`. Founder approval needed because it changes the rhyme.

### Background figures (all UNVERIFIED, recalled from memory; do not quote publicly)
- About 18% of US stay-at-home parents are fathers (Pew, around 2021).
- Roughly 2.5 million US children live with grandparents or other relatives without a parent present (Annie E. Casey / Generations United).
- About 4 million US parents have a disability (National Council on Disability, 2012).
- About 90% of Deaf children are born to hearing parents, and Deaf parents mostly have hearing children (commonly cited Gallaudet figures).
- About 1.6 million US children have a parent serving in the military (DoD, including Guard and Reserve).
- Roughly a quarter of US children are Hispanic, and about 5–6% are Asian American (Census/KIDS COUNT).
- December is summer in Australia, New Zealand, South Africa and South America. This one is a fact, not a statistic.
