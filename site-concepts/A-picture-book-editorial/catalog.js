/* Play Before Pixels: concept catalog (Direction A).
   Prices are USD list prices. Local prices are derived in nav.js. */
window.PBP = window.PBP || {};

PBP.AGES = [
  { id: "0-1",  label: "0–1",  name: "Babies",       years: 1, tint: "var(--t-tomato)", ink: "var(--tomato)" },
  { id: "1-3",  label: "1–3",  name: "Toddlers",     years: 2, tint: "var(--t-sun)",    ink: "var(--sun)" },
  { id: "3-5",  label: "3–5",  name: "Preschool",    years: 2, tint: "var(--t-grass)",  ink: "var(--grass)" },
  { id: "5-8",  label: "5–8",  name: "Early school", years: 3, tint: "var(--t-sky)",    ink: "var(--sky)" },
  { id: "8-12", label: "8–12", name: "Big kids",     years: 4, tint: "var(--t-plum)",   ink: "var(--plum)" }
];

PBP.TYPES = [
  { id: "books",     label: "Books",       members: ["board", "picture", "guide"] },
  { id: "printable", label: "Printables" },
  { id: "cards",     label: "Card decks" },
  { id: "classroom", label: "Classroom" },
  { id: "kit",       label: "Group kits" },
  { id: "course",    label: "Written course" },
  { id: "merch",     label: "Merch" },
  { id: "free",      label: "Free briefs" }
];
PBP.SUBTYPES = [
  { id: "board",   label: "Board books" },
  { id: "picture", label: "Picture books" },
  { id: "guide",   label: "Guides for grown-ups" }
];

PBP.PRODUCTS = [
  {
    id: "up-go-more", title: "Up! Go! More!", sub: "14 first words to say, sign and play together",
    type: "board", kind: "Board book", ages: ["0-1", "1-3"], ageText: "0–3", badge: "New",
    photo: "assets/photo-ugm.png", thumb: "assets/ugm-cover.png", ground: "var(--t-sun)",
    blurb: "One everyday word per page, one big picture, and a Grown-up corner tip that turns each page into a back-and-forth.",
    long: [
      "Each page shows one word a toddler actually uses — hi, up, down, go, stop, ball, uh-oh, more, all done, shoe, bye-bye, book, hug and night-night — set in huge rounded letters beside one big, bright picture of a child and a grown-up acting it out.",
      "At the foot of every page, a short Grown-up corner gives you one easy way to keep the talk going: pause and wait, add one word, use a gesture, offer a choice, sing it, or follow your child’s lead. There is no script to learn and nothing to get right."
    ],
    formats: [
      { id: "board", label: "Board book", price: 12.99, status: "ok", note: "Ships in 2–4 business days",
        spec: [["Trim", "6 × 6 in (15.2 × 15.2 cm)"], ["Pages", "14 word pages, plus a how-to and a word guide inside the covers"], ["Binding", "Thick board, rounded corners"]] },
      { id: "paperback", label: "Paperback", price: 7.99, status: "ok", note: "Printed to order · ships in 4–7 business days",
        spec: [["Trim", "6 × 6 in (15.2 × 15.2 cm)"], ["Pages", "18 pages, full color"], ["Binding", "Saddle-stitched softcover, for ages 2 and up"]] },
      { id: "hardcover", label: "Hardcover", price: 16.99, status: "soon", note: "Gift edition, spring 2027",
        spec: [["Trim", "8.5 × 8.5 in (21.6 × 21.6 cm)"], ["Pages", "24 pages"], ["Binding", "Case-bound, printed boards"]] },
      { id: "library", label: "Library binding", price: 21.99, status: "soon", note: "For libraries and classrooms, 2027",
        spec: [["Trim", "8.5 × 8.5 in (21.6 × 21.6 cm)"], ["Pages", "24 pages"], ["Binding", "Reinforced, sewn, laminated boards"]] }
    ],
    words: [
      ["hi", "03", "Take turns.", "Wave, say “hi!”, then count to five in your head. A look, wave or sound back counts as a turn."],
      ["up", "04", "Wait for it.", "Hold your arms out, then pause. When they reach up, say “up!” as you lift."],
      ["down", "05", "Say it big.", "Crouch low and stretch it out: “dooown!” Slow, playful words are easier to copy."],
      ["go", "06", "Wait.", "Say “Ready, set…” then pause. Let your child fill in “go!” Any sound counts."],
      ["stop", "07", "Gesture.", "Hold up a flat hand as you say “stop!” A sign plus a word gives two ways to answer."],
      ["ball", "08", "Add one word.", "If your child says “ball,” you say “big ball” or “roll ball.” One step ahead."],
      ["uh-oh", "09", "Name the moment.", "Little tumbles are talk moments. Say “uh-oh!” with a big face, then wait."],
      ["more", "10", "Gesture.", "Pause the fun. Tap your fingertips together, say “more?” and wait before you carry on."],
      ["all done", "11", "Offer a choice.", "“More, or all done?” Hold up a hand for each. A point is a real answer."],
      ["shoe", "12", "Follow their lead.", "Grabbed a shoe? Talk about the shoe: “Your shoe. Big shoe. Shoe on!”"],
      ["bye-bye", "13", "Make it a routine.", "Same wave, same words, every time. Words that repeat are the easiest to pick up."],
      ["book", "14", "Say what you see.", "Point and name what your child looks at: “duck!” Let them turn the pages."],
      ["hug", "15", "Sing it.", "Put “hug” in any tune you know (“hug, hug, hug!”) and squeeze on the last one."],
      ["night-night", "16", "Say it.", "Say “night-night” to everything: the duck, the moon, even the tablet. A calm goodnight game."]
    ],
    spreads: [["ugm-p02", "ugm-p03"], ["ugm-p04", "ugm-p05"], ["ugm-p06", "ugm-p07"], ["ugm-p08", "ugm-p09"], ["ugm-p10", "ugm-p11"], ["ugm-p12", "ugm-p13"], ["ugm-p14", "ugm-p15"], ["ugm-p16", "ugm-p17"]],
    details: [["Ages", "0–3"], ["Language", "English"], ["Illustration", "Flat, high-contrast, an inclusive cast of toddlers, parents and grandparents"], ["Publisher", "Play Before Pixels, a trade name of AlphaPlay LLC"], ["First published", "2026"], ["ISBN-13", "Assigned at publication"]],
    related: ["tablet-slept", "print-0-5", "cards", "hundred-plays"],
    fig: ["ugm-p17", "Inside back cover: where the fourteen words live in your day, from mealtime to bedtime."]
  },
  {
    id: "tablet-slept", title: "The Day the Tablet Slept", sub: "A funny read-aloud about a day full of play",
    type: "picture", kind: "Picture book", ages: ["3-5", "5-8"], ageText: "3–7",
    photo: "assets/photo-tts.png", thumb: "assets/tts-cover.png", ground: "var(--t-sky)",
    blurb: "The family tablet takes a nap, nightcap and all. So Ada and her dog Biscuit build, splash, blast off and bake.",
    long: [
      "On Saturday morning, Ada zooms downstairs to find the family tablet wearing a nightcap and snoring a tiny “zzz-bip”. It worked hard all week, Papa explains, and today it gets to rest.",
      "So Ada and Biscuit fill the day themselves: a block tower (CRASH!), every puddle on the street, a big empty box that becomes a rocket, pancakes with Papa and the perfect book at the library. The tablet is never the bad guy. It just takes a day off."
    ],
    formats: [
      { id: "board", label: "Board book", price: 0, status: "none", note: "Not made as a board book", spec: [] },
      { id: "paperback", label: "Paperback", price: 11.99, status: "ok", note: "Printed to order · ships in 4–7 business days",
        spec: [["Trim", "8.5 × 8.5 in (21.6 × 21.6 cm)"], ["Pages", "32 pages, full color"], ["Binding", "Perfect-bound softcover"]] },
      { id: "hardcover", label: "Hardcover", price: 17.99, status: "ok", note: "Printed to order · ships in 5–9 business days",
        spec: [["Trim", "8.5 × 8.5 in (21.6 × 21.6 cm)"], ["Pages", "32 pages, full color"], ["Binding", "Case laminate, printed boards"]] },
      { id: "library", label: "Library binding", price: 24.99, status: "ok", note: "For libraries and classrooms",
        spec: [["Trim", "8.5 × 8.5 in (21.6 × 21.6 cm)"], ["Pages", "32 pages, full color"], ["Binding", "Reinforced case binding"]] }
    ],
    spreads: [["tts-p06", "tts-p07"], ["tts-p08", "tts-p09"], ["tts-p12", "tts-p13"], ["tts-p18", "tts-p19"], ["tts-p20", "tts-p21"], ["tts-p26", "tts-p27"]],
    details: [["Ages", "3–7"], ["Language", "English"], ["Extras", "“Talk about it” questions for grown-ups on the last page"], ["Publisher", "Play Before Pixels, a trade name of AlphaPlay LLC"], ["First published", "2026"], ["ISBN-13", "Assigned at publication"]],
    related: ["up-go-more", "mtlt", "print-5-12", "cards"],
    fig: ["tts-p30", "The last page: “Talk about it” questions for grown-ups, and ideas for planning your own play day."]
  },
  {
    id: "mtlt", title: "More Talk, Less Tap", sub: "A classroom read-aloud about asking good questions",
    type: "picture", kind: "Picture book", ages: ["3-5", "5-8"], ageText: "4–8", badge: "Spring 2027",
    photo: "assets/photo-mtlt.png", thumb: "assets/photo-mtlt.png", ground: "var(--t-grass)",
    blurb: "A rainy-day classroom, a question box and a goldfish named Pip. A read-aloud for circle time, coming spring 2027.",
    long: ["A rainy morning, a class that can’t go outside, and a question box on the teacher’s desk. A read-aloud for circle time about wondering out loud, taking turns and listening to the answer."],
    formats: [
      { id: "paperback", label: "Paperback", price: 11.99, status: "soon", note: "Spring 2027", spec: [["Trim", "8.5 × 8.5 in"], ["Pages", "32 pages"]] },
      { id: "hardcover", label: "Hardcover", price: 17.99, status: "soon", note: "Spring 2027", spec: [["Trim", "8.5 × 8.5 in"], ["Pages", "32 pages"]] },
      { id: "library", label: "Library binding", price: 24.99, status: "soon", note: "Spring 2027", spec: [["Trim", "8.5 × 8.5 in"], ["Pages", "32 pages"]] }
    ],
    details: [["Ages", "4–8"], ["Status", "In production, spring 2027"], ["Publisher", "Play Before Pixels, a trade name of AlphaPlay LLC"]],
    related: ["tablet-slept", "classroom", "print-5-12", "cards"]
  },
  {
    id: "hundred-plays", title: "100 Plays Before Pixels", sub: "Everyday play ideas for ages 0–5, one play a page",
    type: "guide", kind: "Guide for grown-ups", ages: ["0-1", "1-3", "3-5"], ageText: "0–5",
    photo: "assets/photo-100plays.png", ground: "var(--t-tomato)",
    blurb: "A hundred plays that need nothing you don’t already own, sorted by age, time of day and how much energy you have left.",
    long: ["A hundred plays that use what’s already in the house: a laundry basket, a wooden spoon, a cardboard box. Each page gives the play, the words to use while you play it, and a safety note where one is needed. Sorted by age band, time of day and how much energy you have left."],
    formats: [
      { id: "paperback", label: "Paperback", price: 19.99, status: "ok", note: "Printed to order · ships in 4–7 business days", spec: [["Trim", "8 × 10 in (20.3 × 25.4 cm)"], ["Pages", "128 pages"], ["Binding", "Perfect-bound softcover"]] },
      { id: "pdf", label: "Printable PDF", price: 12.00, status: "ok", note: "Delivered by email in minutes", spec: [["Paper", "US Letter and A4"], ["Pages", "128 pages"]] }
    ],
    details: [["For", "Parents and carers of children 0–5"], ["Safety", "Every play checked against our small-parts and supervision rules"], ["Publisher", "Play Before Pixels, a trade name of AlphaPlay LLC"], ["ISBN-13", "Assigned at publication"]],
    related: ["up-go-more", "print-0-5", "cards", "course"]
  },
  {
    id: "print-0-5", title: "Talk & Play Printables, 0–5", sub: "Fridge sheets, word charts and play menus",
    type: "printable", kind: "Printable bundle", ages: ["0-1", "1-3", "3-5"], ageText: "0–5",
    photo: "assets/photo-print05.png", ground: "var(--t-grass)",
    blurb: "Twenty-four sheets for the fridge and the diaper bag: words for every routine, play menus and a first-words tracker.",
    long: ["Twenty-four printable sheets: words for every routine, a week of play menus, a first-words tracker and a how-to-read-together card. Print what you need, as often as you need."],
    formats: [{ id: "pdf", label: "PDF download", price: 16.00, status: "ok", note: "Delivered by email in minutes", spec: [["Paper", "US Letter and A4"], ["Sheets", "24"]] }],
    details: [["Ages", "0–5"], ["License", "Personal and household use"]],
    related: ["up-go-more", "hundred-plays", "cards", "print-5-12"]
  },
  {
    id: "print-5-12", title: "After-School Unplugged, 5–12", sub: "Menus, logs and boredom-busters for school-age kids",
    type: "printable", kind: "Printable bundle", ages: ["5-8", "8-12"], ageText: "5–12",
    photo: "assets/photo-print512.png", ground: "var(--t-plum)",
    blurb: "An after-school menu kids choose from themselves, a paper reading log, and thirty boredom-busters that need no batteries.",
    long: ["An after-school menu kids choose from themselves, a reading log that fills up page by page, and thirty boredom-busters that need a pencil at most."],
    formats: [{ id: "pdf", label: "PDF download", price: 18.00, status: "ok", note: "Delivered by email in minutes", spec: [["Paper", "US Letter and A4"], ["Sheets", "32"]] }],
    details: [["Ages", "5–12"], ["License", "Personal and household use"]],
    related: ["tablet-slept", "cards", "course", "classroom"]
  },
  {
    id: "cards", title: "Back-and-Forth Cards", sub: "52 talk and play prompts for ages 1–8",
    type: "cards", kind: "Card deck", ages: ["1-3", "3-5", "5-8"], ageText: "1–8",
    photo: "assets/photo-cards.png", ground: "var(--t-tomato)",
    blurb: "Fifty-two poker-size cards, each with one small move to try at the table, in the bath or in the car.",
    long: ["Fifty-two poker-size cards in a tuck box. Each card has one small move to try — wait, look and say, add one word, offer a choice — and a play to go with it."],
    formats: [{ id: "deck", label: "Card deck", price: 16.99, status: "ok", note: "Printed to order · ships in 4–7 business days", spec: [["Size", "2.5 × 3.5 in, 52 cards"], ["Box", "Printed tuck box"]] }],
    details: [["Ages", "1–8, with a grown-up"], ["Publisher", "Play Before Pixels, a trade name of AlphaPlay LLC"]],
    related: ["up-go-more", "print-0-5", "hundred-plays", "tablet-slept"]
  },
  {
    id: "classroom", title: "PreK–5 Classroom Pack", sub: "Printables, discussion cards and family letters",
    type: "classroom", kind: "Classroom pack", ages: ["3-5", "5-8", "8-12"], ageText: "PreK–5",
    photo: "assets/photo-classroom.png", ground: "var(--t-sky)",
    blurb: "Sixty printable pages, discussion cards and plain-language family letters, licensed per teacher or per school site.",
    long: ["Sixty printable pages of screen-free activities, discussion cards for circle time and plain-language family letters. General and research-based: it helps people ask good questions and never names any school, district or product.", "Your license arrives by automated email as a stamped PDF, the moment your order is paid."],
    formats: [
      { id: "teacher", label: "One teacher", price: 19.00, status: "ok", note: "License emailed instantly", spec: [["Covers", "One classroom, one school year"], ["Delivery", "PDF + stamped license"]] },
      { id: "site", label: "School site license", price: 39.00, status: "ok", note: "License emailed instantly", spec: [["Covers", "Every teacher at one school site, one year"], ["Delivery", "PDF + stamped license"]] }
    ],
    details: [["Grades", "PreK–5"], ["Pages", "60 printable pages"], ["Paper", "US Letter and A4"], ["License terms", "See Site licenses"]],
    related: ["group-kit", "mtlt", "print-5-12", "brief"]
  },
  {
    id: "group-kit", title: "Host-It-Yourself Evening Kit", sub: "Slides, a word-for-word script and take-home handouts",
    type: "kit", kind: "Group kit", ages: ["0-1", "1-3", "3-5", "5-8", "8-12"], ageText: "For grown-ups",
    photo: "assets/photo-groupkit.png", ground: "var(--t-plum)",
    blurb: "Everything a PTA or parent group needs to run its own 60-minute evening, presented by one of your own members.",
    long: ["Twenty-two slides, a speaker script you can read aloud word for word, a sign-up sheet and a take-home handout. No expertise needed and nobody from us on stage: a member of your own group presents it.", "Choose the early-years edition (0–5) or the school-years edition (5–12)."],
    formats: [
      { id: "early", label: "Early years, 0–5", price: 49.00, status: "ok", note: "License emailed instantly", spec: [["Covers", "One group, unlimited evenings for 12 months"], ["Runs", "About 60 minutes"]] },
      { id: "school", label: "School years, 5–12", price: 49.00, status: "ok", note: "License emailed instantly", spec: [["Covers", "One group, unlimited evenings for 12 months"], ["Runs", "About 60 minutes"]] }
    ],
    details: [["For", "PTAs, parent groups, teacher groups"], ["Includes", "Slides (PDF and PPTX), script, handouts, sign-up sheet"], ["Live sessions", "None. Your group presents it."]],
    related: ["classroom", "brief", "hundred-plays", "cards"]
  },
  {
    id: "course", title: "The 30-Day Screen Reset", sub: "A written course, one short lesson a day",
    type: "course", kind: "Written course", ages: ["0-1", "1-3", "3-5", "5-8", "8-12"], ageText: "Families 0–12",
    photo: "assets/photo-course.png", ground: "var(--wash)",
    blurb: "Thirty short written lessons by email with a printable workbook. Read at your own pace; nothing to watch, no calls.",
    long: ["Thirty short written lessons, one a day by email, with a printable workbook. Day one asks you to change nothing — just notice. By day thirty you have a family plan you wrote yourself.", "Self-paced and entirely written: there is nothing to watch and nobody to call."],
    formats: [{ id: "course", label: "Written course", price: 39.00, status: "ok", note: "Lesson one arrives by email in minutes", spec: [["Lessons", "30, about 6 minutes each"], ["Workbook", "Printable PDF, Letter and A4"], ["Guarantee", "14 days"]] }],
    details: [["For", "Parents and carers of children 0–12"], ["Format", "Email lessons + printable workbook"]],
    related: ["hundred-plays", "print-5-12", "cards", "brief"]
  },
  {
    id: "tee", title: "“Play Before Pixels” Tee", sub: "Organic cotton, printed to order",
    type: "merch", kind: "Merch", ages: [], ageText: "Adult & kids sizes",
    photo: "assets/photo-tee.png", ground: "var(--t-sun)",
    blurb: "Navy organic-cotton tee, printed to order in the size you choose.",
    long: ["Navy organic-cotton tee with a four-color print. Printed to order by our print partner and shipped from the nearest facility."],
    formats: [
      { id: "adult", label: "Adult", price: 26.00, status: "ok", note: "Printed to order · ships in 5–8 business days", sizes: ["XS", "S", "M", "L", "XL", "2XL"], spec: [["Fabric", "100% organic cotton"]] },
      { id: "kids", label: "Kids", price: 20.00, status: "ok", note: "Printed to order · ships in 5–8 business days", sizes: ["2T", "3T", "4T", "5–6", "7–8", "9–11"], spec: [["Fabric", "100% organic cotton"]] }
    ],
    details: [["Returns", "Made to order: replaced free if damaged or misprinted"]],
    related: ["tote", "cards", "up-go-more", "hundred-plays"]
  },
  {
    id: "tote", title: "“Talk, touch, play.” Tote", sub: "Heavy cotton canvas, printed to order",
    type: "merch", kind: "Merch", ages: [], ageText: "One size",
    photo: "assets/photo-tote.png", ground: "var(--t-grass)",
    blurb: "A library-sized canvas tote that holds about twelve picture books.",
    long: ["A heavy canvas tote big enough for a library haul, about twelve picture books. Printed to order."],
    formats: [{ id: "tote", label: "Tote bag", price: 22.00, status: "ok", note: "Printed to order · ships in 5–8 business days", spec: [["Size", "15 × 16 in"], ["Fabric", "Natural cotton canvas"]] }],
    details: [["Returns", "Made to order: replaced free if damaged or misprinted"]],
    related: ["tee", "tablet-slept", "up-go-more", "cards"]
  },
  {
    id: "brief", title: "Screens, Talk & the First Three Years", sub: "A free four-page research brief",
    type: "free", kind: "Free research brief", ages: ["0-1", "1-3"], ageText: "For grown-ups",
    photo: "assets/photo-brief.png", ground: "var(--wash)",
    blurb: "What large studies have found about early screen time and language, and what they have not. Four pages, every source listed.",
    long: ["What large studies have found about early screen time and talk, what they have not found, and what the WHO and AAP recommend. Four pages; every source listed in full. Delivered by email."],
    formats: [{ id: "pdf", label: "PDF", price: 0, status: "ok", note: "Free · delivered by email", spec: [["Pages", "4"], ["Paper", "US Letter and A4"]] }],
    details: [["From", "The Virtual Autism Project"], ["Note", "Education, not medical advice"]],
    related: ["course", "hundred-plays", "group-kit", "classroom"]
  }
];

PBP.byId = function (id) { return PBP.PRODUCTS.find(function (p) { return p.id === id; }); };
PBP.fromPrice = function (p) {
  var ps = p.formats.filter(function (f) { return f.status !== "none"; }).map(function (f) { return f.price; });
  return Math.min.apply(null, ps);
};

/* Pages and sections, for search */
PBP.PAGES = [
  { t: "The Virtual Autism Project", d: "Research hub: a term some clinicians use; not a medical diagnosis", u: "research.html" },
  { t: "What the studies found", d: "Madigan 2019, Heffler 2020, Kushima 2022, Takahashi 2023, Brushe 2024", u: "research.html#studies" },
  { t: "Screen-time guidelines by age", d: "WHO 2019 and AAP 2016, set against the age scale", u: "research.html#guidelines" },
  { t: "Screens and school", d: "UNESCO 2023 and a 54-study review of reading on paper", u: "research.html#school" },
  { t: "Free research briefs", d: "Four-page PDFs, every source listed", u: "research.html#briefs" },
  { t: "About Play Before Pixels", d: "Founded by a parent and educator", u: "info.html#about" },
  { t: "Shipping", d: "Printed to order, shipped worldwide", u: "info.html#shipping" },
  { t: "Returns and refunds", d: "30 days on books and decks", u: "info.html#returns" },
  { t: "Site licenses", d: "How classroom and group licenses work", u: "info.html#licenses" },
  { t: "Bulk and PTA orders", d: "Ten or more copies", u: "info.html#bulk" },
  { t: "Book formats explained", d: "Board, paperback, hardcover, library binding", u: "info.html#formats" },
  { t: "Questions", d: "Frequently asked", u: "info.html#faq" },
  { t: "Contact", d: "Write to us", u: "info.html#contact" }
];
