// node build/listings.js : writes listing.json for both products and checks BRAND.md limits.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const SAFE_LINE = 'Every play follows our published safety rules';
// ---------- Price floor and net per channel (ops/TESTS/listing-fixes.md, 2026-09-28) ----------
// One fee model for every listing; every fee is UNVERIFIED (see FEE_NOTE). Same rounding as the hand-kept listings.
const c2 = x => Math.floor(x * 100 + 0.5 + 1e-6) / 100;
const REFUND = 0.05; // GAPS-ROUND-2 G2-11 refund allowance (3–5%; the cautious end)
const NET = {
  etsy: p => c2(p - 0.20 - 0.065 * p - (0.03 * p + 0.25) - REFUND * p),
  etsy_offsite_ad_sale: p => c2(p - 0.20 - 0.065 * p - (0.03 * p + 0.25) - REFUND * p - 0.15 * p),
  site_gumroad: p => c2(p - (0.10 * p + 0.50) - (0.029 * p + 0.30) - REFUND * p),
  site_gumroad_discover_sale: p => c2(p - 0.30 * p - (0.029 * p + 0.30) - REFUND * p),
};
const FEE_NOTE = "Estimated net per unit in USD, after fees and a 5% refund allowance (GAPS-ROUND-2 G2-11), rounded to the cent. Every fee is UNVERIFIED: no live check was possible on 2026-09-28 (web search unavailable). Fee model: commerce/PRICING.md §2, which points to commerce/storefront-setup-guide.md; where sources disagree, the more cautious figure is used (business/STRESS-TEST.md 'Needs a live check'). Etsy digital: $0.20 listing + 6.5% transaction + 3% + $0.25 payment processing; an Offsite Ads sale adds 15% (12% once the shop passes $10,000 in 12 months). Own checkout at launch (ops/QUEUE.md): Gumroad as merchant of record, 10% + $0.50, plus 2.9% + $0.30 card processing counted to be safe (the storefront guide says processing is included); a sale that comes through Gumroad Discover costs about 30% instead of 10% + $0.50. Shopify (deferred until about 25 own-site orders a month) would net more: 2.9% + $0.30. Before listing, check each fee on the platform's own fee page or calculator and replace these numbers.";
const FLOOR_BASIS = "$3.00 net per digital sale (commerce/PRICING.md §2; COMPLIANCE-GATE 18). Every channel's net must stay at or above it, and no repricing or promotion may go below it.";
const KDP_LATER_NOTE = " kdp_activity_edition_later: planned, not built; fill in from KDP's calculator before it is published.";
const HONEST = "One price, shown plainly: no list, 'was', compare-at or crossed-out price and no standing sale (BRAND.md 'Honest pricing'; 16 CFR 233.1). A promotion is allowed only if it is real and time-limited, with its start and end dates recorded in price_history before it runs.";
const KILL = "Kill rule (ops/QUEUE.md): fewer than 5 sales in 60 days after the EXP-03 search-copy decision → reprice once (never below price_floor, no 'was' price) → add to a bundle as a part and deactivate the listing.";
const SAME_PRICE = "the same on Etsy and on our own checkout (Gumroad at launch), per ops/QUEUE.md LAUNCH FIRST (business/GROWTH-ENGINE.md §8a)";
const OWNER = "© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.";
const pricing = (p, { kdpLater = false, discover = true, note = '' } = {}) => {
  const nets = {};
  for (const [k, f] of Object.entries(NET)) if (discover || k !== 'site_gumroad_discover_sale') nets[k] = f(p);
  if (kdpLater) nets.kdp_activity_edition_later = null;
  const margins = {};
  for (const [k, v] of Object.entries(nets)) margins[k] = v === null ? null : Math.round(100 * v / p);
  return { price_floor: 3.0, price_floor_basis: FLOOR_BASIS, net_per_unit_by_channel: nets, margin_pct_by_channel: margins,
    net_notes: FEE_NOTE + (kdpLater ? KDP_LATER_NOTE : '') + note };
};
const underFloor = L => Object.entries(L.net_per_unit_by_channel).filter(([, v]) => v !== null && v < L.price_floor).map(([k]) => k);
const common = {
  channels: [
    'Etsy (digital download, delivered instantly by Etsy): upload the 5 files in etsy-upload/ (no URL or QR code inside, per Etsy link rules and BRAND customer-voice rule 2)',
    'Play Before Pixels website shop (instant download by automated email/link): the store edition PDFs + START-HERE.pdf (with the bonus QR code and website)',
    'Later, only after the printable sells: print-on-demand poker deck in a tuck box (files in pod-later/, marked POD LATER)',
  ],
};
const compliance = (key) => [
  'Parent education only: no health, medical or developmental-outcome claims (BRAND.md rule 1); no trademarked program names (talk moves are plain words, rule 6); no diagnosis-related keywords, tags or wording anywhere (diagnosis-search rule); no named schools, companies, apps, devices or competitor brands; no research citations used.',
  key === 'A'
    ? 'Child safety (rule 4) on every card and every no-cut row: “With a grown-up” on every card; every under-3 object described as bigger than a toilet-paper tube (big toy animals, big toy cars with no loose wheels, jumbo egg-shaped crayons, grown-up socks, rolled sock pairs); water play (Pour and Splash, Toy Bath, Water Painting and the bath-time 2-minute version) always says a grown-up within arm’s reach; no balloons, no cords/strings/hat ties, no choking-risk foods or coins; tissue-box film removed; plain water only for wiping; kitchen hunt keeps knives, stove and cleaners off the list; unbreakable or wall mirror; the grown-up keeps markers and caps and does the cutting (“Grown-up keeps the pieces” on every card sheet).'
    : 'Child safety (rule 4): car cards say a passenger reads and the driver just talks; bath cards say the grown-up stays close; any question can be passed; cut pieces and laminated cards stay with grown-ups around babies and toddlers (“Grown-up keeps the pieces” on every card sheet and the labels page).',
  'Customer-voice rules: Color and Low-ink files (white grounds, outlined panels, line-art backs) in US Letter and A4, each a plain PDF under 15 MB, never a zip; file 1 is START HERE; Etsy edition carries no URL or QR code; “Version 1.0 · September 2026” on every page and in PDF metadata; prep time on page 1, START HERE and the listing; no-cut pages for same-day use; cut pages print “Grown-up keeps the pieces”; cards are 2.5 × 3.5 in (well over the 1.5 in minimum); fillable blank cards work in free Acrobat Reader and the listing says exactly what is editable; grown-up guide with a plain-words why, three talk lines, “most children love 2–3 of these” and the home-language line; start ages are never deadlines and stage pages carry the doctor line; no fear words, no screen-time trade-offs.' + (key === 'A' ? ' Every play has a start age in months, prep/mess/play-time icons, a 2-minute “tired grown-up” version and an easier/harder pair; 46 of 52 plays (88%) need nothing to buy; no play takes longer to prep than to play.' : ''),
  'Honest pricing (BRAND.md, overrides DEMAND-CHECK rule 2): one everyday price, no “was”, compare-at or crossed-out price, no permanent sale, no countdowns.',
  'Copyright line on every page and in PDF metadata: “© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.” Personal/family license on page 3, START HERE, every footer and the metadata; page 3 and START HERE point class, center and library users to the classroom and site licenses (license_tiers). The founder’s note box on page 3 is a clearly labeled placeholder for human-authored text and must be replaced before release.',
  'POD-later files must be checked against the chosen printer’s current card and tuck-box templates before any upload. Their safe zone is 0.16 in inside trim (the usual card-printer margin); BRAND.md’s general 0.375 in safe zone is not practical on a 2.5 in card, so confirm the printer’s own safe zone [VERIFY]. A physical family card deck may count as a children’s product in the US (CPSIA) [VERIFY with the POD partner and counsel before listing it].',
].join(' ');

const A = {
  slug: 'play-talk-cards',
  title: '52 Play & Talk Cards for Ages 0–5',
  subtitle: 'One play and one talk tip on every card, age-coded for babies, toddlers and preschoolers',
  etsy_title: "52 Play and Talk Cards for Ages 0-5, Printable Toddler and Baby Activities, Screen-Free Ideas with Tips, Play Before Pixels",
  format: 'Printable PDF, instant download. 5 files: START HERE (1 page) plus the same 21-page deck as Color and Low-ink, each in US Letter and A4. Inside: 54 poker-size cards (52 plays, a how-to card and a blank) on 6 card sheets, optional card backs, 8 no-cut play pages (every play with its start age, prep, mess, play time, a 2-minute version and easier/harder), a grown-up guide with 8 talk moves, printing and safety tips, type-in blank cards (fillable in free Adobe Acrobat Reader), a 52-week fridge checklist and a “what’s next” page. English text.',
  trim: 'Cards 2.5 × 3.5 in (63.5 × 88.9 mm, poker size), 9 per page with cut lines. US Letter 8.5 × 11 in and A4 210 × 297 mm. Card sheets use 0.25 in top and bottom margins on US Letter so the cards print at true size; if a printer clips the edge, choosing “Fit” prints them slightly smaller. All other pages use 0.5 in margins. No bleed (home printing).',
  pages: 21,
  ages: '0–5 (four bands: 0–12 months, 1–2, 2–3 and 3–5 years; every play shows its start age in months)',
  price_usd: 7.00,
  price_notes: `Everyday price $7.00, ${SAME_PRICE}. Honest value line: 52 plays for about 13 cents each. ${HONEST} Bundles: a part of the $29 Ages 1–5 Instant Gift Bundle and the $45 Birth-to-5 Printable Library (ops/QUEUE.md), each 10–25% under the live sum of its parts; it can also be a $7 order add-on (GROWTH-ENGINE §5b). The earlier $12 pair with the Family Talk-Along Cards is not in the adopted plan (5–12 listings wait for counsel's G1 answer). Nets: net_per_unit_by_channel (UNVERIFIED fees). ${KILL} POD deck later at about $22, only after the printable has sold (DEMAND-CHECK section 4 rule 8); landed unit cost at or below 35–40% of retail [VERIFY POD quotes].`,
  short_description: '52 printable play cards for ages 0–5: one play, one talk tip and a safety note on every card. Age-coded, no-cut pages, Letter + A4.',
  long_description: "52 printable play cards for ages 0–5, in US Letter and A4 PDFs. Each card has one simple play and one talk tip in plain words, like “pause and wait,” “say what you see” or “offer a choice.”\n\nEvery play uses everyday things: a dish towel, a pot and spoon, a cardboard box, rolled-up socks. 46 of the 52 need nothing to buy. Each one shows its start age in months, prep time, mess level and usual play time. It also has a 2-minute version for tired days and a make-it-easier / make-it-harder pair.\n\nThe cards are sorted into four age colors, each with its own shape and word label: 0–12 months, 1–2, 2–3 and 3–5 years. There are 13 plays in each. Ages are a guide, never a deadline.\n\nPrep takes about 20 minutes to print and cut, once. Most plays then take 0–2 minutes to set up. No time to cut? Play today from the no-cut pages. You also get a grown-up guide, type-in blank cards and a 52-week fridge checklist. Color and low-ink files, US Letter and A4.\n\nEvery play follows our published safety rules, and a grown-up plays along every time. These are ideas for everyday play and conversation, not medical or professional advice. Digital download: nothing ships. That’s about 13 cents a play.",
  bullets: [
    '52 plays for ages 0–5, 13 in each age color: 0–12 months, 1–2, 2–3 and 3–5 years',
    'Every card: one play, one plain-words talk tip and a “with a grown-up” safety note',
    'Start age in months, prep, mess, a 2-minute version and easier/harder for every play',
    'Prep about 20 min to print and cut; no-cut pages let you start today. Every play follows our published safety rules.',
    'Color + low-ink, US Letter + A4, type-in blank cards and a 52-week fridge checklist',
  ],
  keywords: ['toddler activity cards', 'baby play ideas printable', 'screen free toddler activities', 'printable play cards 0-5', 'talk while you play', 'preschool activity cards', 'toddler busy printable'],
  etsy_tags: ['toddler activities', 'play cards printable', 'baby play ideas', 'toddler play cards', 'preschool activities', 'screen free play', 'activity cards kids', 'talk while you play', 'toddler printable', 'baby activity cards', 'toddler play ideas', 'rainy day activities', 'parenting printable'],
  seo_title: '52 Play & Talk Cards, Ages 0–5 | Printable Play Ideas',
  seo_description: 'Printable cards for ages 0–5: 52 simple plays, each with a talk tip and a safety note. Age-coded, no-cut pages, US Letter and A4. Instant download.',
  alt_text: 'A fan of colorful printable play cards on a sunny yellow background. Each card shows an age chip, a simple icon, a play title such as Color Sort, the start age, prep and mess, a short play, a talk tip and a safety note, under the title 52 Play & Talk Cards.',
  editable: 'Fillable text fields on the 9 blank cards (page 19): title, needs, the play and the talk tip for each card, in free Adobe Acrobat Reader. Everything else, including the 52 printed cards, colors and pictures, is print-only.',
  shareable_piece: 'The 52-week “Our Play & Talk Year” fridge checklist (page 20) with the small brand lockup, designed to be photographed; sharing is invited, never required.',
  bonus_offer: 'Store edition only (QR on page 21 and START HERE): extra printable cards and one short, age-matched play idea a month by email at playbeforepixels.com/bonus/play-talk-cards; email plus optional child birth month/year, never names.',
  amazon_route: 'none-with-reason: a cut-apart card deck does not work as a KDP paperback (thin pages, cutting destroys the book). On Amazon the same play-and-talk content is carried by the 100 Screen-Free Plays KDP paperback (guide-100-plays); the physical deck goes to POD or FBA-later only after the printable sells (marketing/AMAZON-AND-RETAIL-ROADMAP.md, card decks row).',
  next_products: ['family-talk-along-cards', 'bored-play-cards', 'guide-100-plays'],
  bonus_url: 'playbeforepixels.com/bonus/play-talk-cards',
  listing_images: ['preview/listing-images/01-hero.png', 'preview/listing-images/02-every-card.png', 'preview/listing-images/03-age-coded.png', 'preview/listing-images/04-print-at-home.png', 'preview/listing-images/05-talk-moves.png', 'preview/listing-images/06-whats-included.png', 'preview/listing-images/07-safety.png', 'preview/listing-images/08-grow-with-it.png'],
  files: {
    store: ['START-HERE.pdf', 'play-talk-cards.pdf', 'play-talk-cards-A4.pdf', 'play-talk-cards-low-ink.pdf', 'play-talk-cards-low-ink-A4.pdf'],
    etsy_upload: ['etsy-upload/1-START-HERE.pdf', 'etsy-upload/2-Color-US-Letter.pdf', 'etsy-upload/3-Color-A4.pdf', 'etsy-upload/4-Low-Ink-US-Letter.pdf', 'etsy-upload/5-Low-Ink-A4.pdf'],
    source: 'source.html (store edition, US Letter, color); every other edition is generated by build/build.js',
    content_to_edit: 'build/content.js',
    previews: 'preview/p01.png … p21.png (color), preview/low-ink/, preview/start-here/',
    cover: 'cover.png', mockup: 'mockup.png',
    pod_later: ['pod-later/POD-LATER_play-talk-deck_54-fronts.pdf', 'pod-later/POD-LATER_play-talk-deck_back.pdf', 'pod-later/POD-LATER_play-talk-deck_tuck-box.pdf', 'pod-later/proof-play-talk-deck_cards.png', 'pod-later/proof-play-talk-deck_tuck-box-guide.png'],
    qa: 'node build/check-cards.js (fails if any card text overflows or collides)',
    rebuild: 'cd products/play-talk-cards && node build/check-cards.js && node build/render-all.js && node build/pod.js && node build/market.js && node build/listings.js',
  },
  pod_later: { status: 'POD LATER: do not list until the printable has sold', product: '54-card poker deck (52 plays + how-to + blank) in a tuck box', trim: '2.5 × 3.5 in, 0.125 in bleed (2.75 × 3.75 in pages), text inside a 0.16 in safe zone [VERIFY against the printer’s template]', target_price_usd: 22 },
};
const B = {
  slug: 'family-talk-along-cards',
  title: '52 Family Talk-Along Cards for Ages 5–12',
  subtitle: 'Conversation cards for dinner, the car, bath time and bedtime, with a one-line grown-up tip on each',
  etsy_title: "52 Family Talk-Along Cards, Ages 5-12, Printable Conversation Starters for Dinner, Car, Bath and Bedtime, Kids Questions, Play Before Pixels",
  amazon_title: 'Family Talk-Along Journal, Ages 5–12: 52 Questions for Dinner, the Car, Bath Time and Bedtime (Black-and-White Interior)',
  format: 'Printable PDF, instant download. 5 files: START HERE (1 page) plus the same 15-page deck as Color and Low-ink, each in US Letter and A4. Inside: 54 poker-size cards (52 questions, a how-to card and a blank) on 6 card sheets, optional card backs, 2 no-cut question pages, a grown-up guide with 6 talk-along habits, printing and safety tips, type-in blank cards (fillable in free Adobe Acrobat Reader), cut-out moment labels with a talk-along week check, and a “what’s next” page. English text.',
  trim: A.trim,
  pages: 15,
  ages: '5–12 (tips for 5–7s and 8–12s in the guide)',
  price_usd: 7.00,
  price_notes: `Everyday price $7.00, the same on Etsy and on our own checkout (the spec and DEMAND-CHECK target; incumbents sell 120–400-card decks at $15–$30). Honest value line: 52 questions for about 13 cents each. ${HONEST} Not in the LAUNCH FIRST list (ops/QUEUE.md): 5–12 material waits for counsel's G1 answer, and the earlier $12 pair with 52 Play & Talk Cards is not in the adopted plan. Don’t fight 200–400-card decks on Amazon; win on the by-moment structure and the grown-up tip. Nets: net_per_unit_by_channel (UNVERIFIED fees). ${KILL} POD deck later at about $24, only after the printable has sold [VERIFY POD quotes].`,
  short_description: '52 printable conversation cards for ages 5–12, sorted by moment: dinner, car, bath and bedtime. A grown-up tip on every card.',
  long_description: "52 printable talk cards for ages 5–12, in US Letter and A4 PDFs. They are sorted by the moments when families actually talk: passing the peas, waiting at a red light, rinsing shampoo, turning off the lamp.\n\nThere are 13 cards for each moment: dinner, the car, bath time and bedtime. Questions range from silly (“What would a fish say about our bathtub?”) to thoughtful (“What was a brave thing you did this week?”). Every card carries a one-line grown-up tip for keeping the talk going, like “go first with yours” or “just listen; ‘that sounds hard’ is enough.” No trivia, no quizzing.\n\nThe grown-up guide covers six easy talk-along habits and how to use the cards with 5–7s and with 8–12s. Anyone can say “pass,” grown-ups answer too, and in the car a passenger reads while the driver just talks.\n\nPrep takes about 20 minutes to print and cut, once, or start tonight with the two no-cut question pages. You also get type-in blank cards and cut-out labels so each pile can live where it gets used. Color and low-ink files, US Letter and A4. That’s about 13 cents a question.\n\nThis is a digital download. Nothing ships.",
  bullets: [
    '52 conversation cards for ages 5–12, 13 each for dinner, the car, bath time and bedtime',
    'A one-line grown-up tip on every card for keeping the talk going',
    'Grown-up guide: 6 talk-along habits plus tips for ages 5–7 and 8–12',
    'Prep about 20 min to print and cut, or start tonight with the no-cut question pages',
    'Color + low-ink, US Letter + A4, type-in blank cards, moment labels and a weekly check',
  ],
  keywords: ['family conversation cards', 'dinner table questions kids', 'car ride questions for kids', 'bedtime questions for kids', 'conversation starters kids', 'screen free family activity', 'printable talk cards'],
  etsy_tags: ['conversation cards', 'dinner questions', 'car ride games kids', 'bedtime questions', 'family talk cards', 'kids question cards', 'questions for kids', 'screen free family', 'road trip printable', 'family connection', 'conversation starter', 'kids talk prompts', 'printable cards'],
  seo_title: '52 Family Talk-Along Cards, Ages 5–12 | Printable',
  seo_description: 'Printable conversation cards for ages 5–12: 52 questions for dinner, the car, bath time and bedtime, each with a grown-up tip. Letter and A4.',
  alt_text: 'A fan of printable conversation cards on a bright blue background. Cards are color-coded Dinner, Car, Bath and Bedtime, each with a big question and a grown-up tip, under the title 52 Family Talk-Along Cards.',
  editable: 'Fillable text fields on the 9 blank cards (page 13): the question and the grown-up tip for each card, in free Adobe Acrobat Reader. Everything else, including the 52 printed cards, colors and pictures, is print-only.',
  shareable_piece: 'The “Where the cards live” labels and talk-along week page (page 14) with the small brand lockup, designed to be photographed on a jar or the fridge; sharing is invited, never required.',
  bonus_offer: 'Store edition only (QR on page 15 and START HERE): extra printable question cards and one short family talk idea a month by email at playbeforepixels.com/bonus/family-talk-along-cards; email plus optional child birth month/year, never names.',
  amazon_route: 'kdp-activity-edition (planned, not built): “Family Talk-Along Journal, Ages 5–12”, an 8.5 × 11 in KDP paperback with one question and one write-or-draw answer space per page, grouped by the four moments, black-and-white interior stated in the subtitle, kid mark-making pages single-sided. Queued for a build session; the PDF stays on Etsy and our site. Check against KDP’s current template before upload [VERIFY KDP cost].',
  next_products: ['bored-play-cards', 'first-phone-plan', 'play-talk-cards'],
  bonus_url: 'playbeforepixels.com/bonus/family-talk-along-cards',
  listing_images: ['preview/listing-images/01-hero.png', 'preview/listing-images/02-every-card.png', 'preview/listing-images/03-four-moments.png', 'preview/listing-images/04-print-at-home.png', 'preview/listing-images/05-talk-habits.png', 'preview/listing-images/06-whats-included.png', 'preview/listing-images/07-real-life.png', 'preview/listing-images/08-grow-with-it.png'],
  files: {
    store: ['START-HERE.pdf', 'family-talk-along-cards.pdf', 'family-talk-along-cards-A4.pdf', 'family-talk-along-cards-low-ink.pdf', 'family-talk-along-cards-low-ink-A4.pdf'],
    etsy_upload: ['etsy-upload/1-START-HERE.pdf', 'etsy-upload/2-Color-US-Letter.pdf', 'etsy-upload/3-Color-A4.pdf', 'etsy-upload/4-Low-Ink-US-Letter.pdf', 'etsy-upload/5-Low-Ink-A4.pdf'],
    source: 'source.html (store edition, US Letter, color); every other edition is generated by ../build/build.js',
    content_to_edit: '../build/content.js',
    previews: 'preview/p01.png … p15.png (color), preview/low-ink/, preview/start-here/',
    cover: 'cover.png', mockup: 'mockup.png',
    pod_later: ['../pod-later/POD-LATER_talk-along-deck_54-fronts.pdf', '../pod-later/POD-LATER_talk-along-deck_back.pdf', '../pod-later/POD-LATER_talk-along-deck_tuck-box.pdf', '../pod-later/proof-talk-along-deck_cards.png', '../pod-later/proof-talk-along-deck_tuck-box-guide.png'],
    qa: A.files.qa,
    rebuild: A.files.rebuild,
  },
  pod_later: { status: 'POD LATER: do not list until the printable has sold', product: '54-card poker deck (52 questions + how-to + blank) in a tuck box', trim: A.pod_later.trim, target_price_usd: 24 },
};

// ---------- panel fixes (Sept 28, 2026, products/play-talk-cards/panel.md): language, licenses, FAQ ----------
const TIERS = [
  { tier: 'personal', price_usd: 7.00, covers: 'One family: print and copy for your own home, including grandparents and sitters who care for your child. Sold on Etsy and our site.' },
  { tier: 'single-classroom', price_usd: 12.00, covers: 'One teacher, one classroom or one child-care room, and the families of those children (copy a card or no-cut page to send home). Our site only [founder to confirm price].' },
  { tier: 'site', price_usd: 29.00, covers: 'All staff at one named school, child-care center or library site, including its family events; delivered by automated email with a license certificate naming the site. A PTA or parent group may buy it for its school. Our site only [founder to confirm price; counsel to confirm terms].' },
];
const faqShared = (L, P) => [
  { q: 'How does delivery work?', a: 'Instant download: nothing ships. On Etsy your files stay on your Purchases page; on our site the link is in your order email and on the resend-my-download page. On a phone, open the link in a web browser and save each PDF to Files.' },
  { q: 'Which file do I print?', a: 'Pick one: US Letter or A4, Color or Low-ink. Every file has the same pages. START HERE shows which pages to print first.' },
  { q: 'Which license do I need?', a: 'Personal ($7) for your own family, including grandparents and sitters who care for your child. Single-classroom for one teacher or one child-care room, and site for a whole school, center or library; both are on our site only. Full terms: playbeforepixels.com/license.' },
  { q: 'Can I give it as a gift?', a: 'Yes. Buy it and forward the download email, or print and cut the deck for the family you are giving it to. The personal license then belongs to that family. [VERIFY that the store can send the download straight to a gift recipient.]' },
  { q: 'Can our PTA or parent group use it?', a: 'A PTA may buy the site license for its school and use the cards at school family events. Printed decks to take home need one personal copy per family, or ask for a quote through the contact form [counsel to confirm].' },
  { q: 'Can a library use it at storytime?', a: 'Yes, with a site license naming your library: use the cards in person and copy the no-cut pages for the families you serve. Online storytime only in a private, registration-only session with no public recording [counsel to confirm].' },
  { q: 'Is there a Spanish version?', a: 'Not yet: the card text is in English. The grown-up guide says to talk, sing and read in the language you know best, and every talk tip works in any language. A Spanish edition would be made by a human translator.' },
  { q: 'Is there a printed deck?', a: 'Not yet. A printed deck in a tuck box may follow once the printable has found its families. It would be print-on-demand, and we would say so here.' },
  { q: 'Is this professional advice?', a: 'No. These are everyday play and conversation ideas for families. Questions about your child’s development? Your child’s doctor is a good place to start.' },
  { q: 'Refunds?', a: 'Digital downloads follow the shop’s published refund policy. If a file will not open or print, we fix it or send it again [link the policy page at launch].' },
];
const faqA = [
  { q: 'What’s inside?', a: '52 plays on poker-size cards (13 for each age: 0–12 months, 1–2, 2–3 and 3–5 years), plus a how-to card and a blank. Also 8 no-cut play pages with each play’s 2-minute version and easier/harder pair, a grown-up guide, printing and safety tips, type-in blank cards and a 52-week fridge checklist.' },
  { q: 'How long does prep take?', a: 'About 20 minutes to print and cut, once. Most plays then take 0–2 minutes to set up, and 46 of the 52 need nothing to buy. No time to cut? Play from the no-cut pages today.' },
  { q: 'What ages is it for?', a: 'Birth to 5. Every play shows a start age in months, but ages are a guide, never a deadline: play any card that fits your child today, younger or older.' },
  { q: 'Does it work for children who sign, point or use a talking device?', a: 'Yes. A look, a sound, a sign, a point or a device tap is a turn. No card asks your child for eye contact, and you can skip any play your child doesn’t enjoy (tickles, mess or noise).' },
  { q: 'Can a child-care center or preschool use it?', a: 'Yes, with a single-classroom or site license. The plays are written for one grown-up and one or two children, so use them in small groups, and keep the under-3 size rule for every object.' },
  { q: 'Is it on Amazon?', a: 'Not as a card deck: a cut-apart deck doesn’t work as a paperback. The 100 Screen-Free Plays paperback carries the same play-and-talk idea.' },
];
const faqB = [
  { q: 'What’s inside?', a: '52 question cards on poker-size cards (13 each for dinner, the car, bath time and bedtime), plus a how-to card and a blank. Also 2 no-cut question pages, a grown-up guide with 6 talk-along habits, type-in blank cards and cut-out moment labels with a weekly check.' },
  { q: 'How long does prep take?', a: 'About 20 minutes to print and cut, once, or none: read tonight’s question straight from the no-cut pages.' },
  { q: 'Will my 11-year-old find it babyish?', a: 'Some cards are silly on purpose for 5–7s. The guide tells older kids to read the cards themselves, pick who answers first and skip any that feel too young. Bath cards work at tooth-brushing time too.' },
  { q: 'Do any cards talk about screens?', a: 'One car card asks what game, show or video your child likes right now and what the best part is, so you can be curious about it. No card judges screens or trades them for anything.' },
  { q: 'Does it work for kids who draw, point or type their answers?', a: 'Yes. Drawing, pointing or typing an answer counts, anyone can say “pass,” and side-by-side talk in the car counts as much as face-to-face.' },
  { q: 'Can a teacher or after-school program use it?', a: 'Yes, with a single-classroom or site license from our site. The questions work for morning meeting or a closing circle.' },
  { q: 'Is it on Amazon?', a: 'Not yet. A Family Talk-Along Journal paperback is planned.' },
];
A.language = 'English (card text, guide and listing). Talk tips tell families to talk in the language they know best. No Spanish edition yet.';
B.language = A.language;
A.license_tiers = TIERS; B.license_tiers = TIERS;
A.faq = [...faqA.slice(0, 2), ...faqShared(A), ...faqA.slice(2)];
B.faq = [...faqB.slice(0, 2), ...faqShared(B), ...faqB.slice(2)];
const todo = (L) => [
  'Human authorship (BRAND.md): rewrite the card text in build/content.js in your own words (plays, talk tips, 2-minute versions, easier/harder, questions), choose and reorder the cards, and adjust colors if you like; commit each draft and log it in legal/protection/creation-records-log.md. Then rebuild (see files.rebuild).',
  'Write the founder’s note on page 3 in your own words (60–90 words) and replace the dashed placeholder box in build/build.js (printPage) before release.',
  `Build the free bonus page at ${L.bonus_url} (email + optional child birth month/year only, no names; links the privacy policy) before listing; the QR code already points there.`,
  'Publish playbeforepixels.com/license (full license terms), /contact (contact form) and /help (downloads and printing help), all printed in the store edition, plus /safety (the published safety rules the listing refers to: BRAND.md rule 4 in plain words) [VERIFY final URLs].',
  'Print one Letter and one A4 copy on cardstock at 100%: check cut lines, card size (2.5 × 3.5 in), colors, the low-ink file, and the optional backs page flipped on the long edge; confirm the type-in fields work in free Adobe Acrobat Reader. Founder proof of the cover and page 1 (customer-voice rule 21).',
  'Etsy: upload the 5 files in etsy-upload/ as separate PDFs (never a zip), the 8 listing images and the mockup; set the everyday price $7.00 with no compare-at or sale price; answer Etsy’s creation and AI-use questions truthfully (see ai_disclosure) [VERIFY current Etsy policy]. Our site: deliver START-HERE.pdf plus the 4 store-edition PDFs.',
  'Name clearance: brand/ORIGINALITY.md (Sept 28, 2026) keeps “52 Play & Talk Cards” (unchanged) and “52 Family Talk-Along Cards” (row A14), but every rating there is provisional and unsearched. Run the exact-phrase and USPTO knockout searches (task #18) before listing [VERIFY].',
  'Licenses (panel, Sept 28, 2026): set up the classroom and site tiers in license_tiers on our site (stamped PDF + license certificate by automated email) and add them to playbeforepixels.com/license; the PDFs already point class, center and library users there. Confirm prices [founder to confirm] and the FAQ answers marked [counsel to confirm]. Etsy sells the personal license only.',
  'Spanish (panel): the card text is English only and the listing says so. A Spanish edition needs a human translator (no machine translation) and belongs with La Charla Cuenta [founder to decide].',
  'Only after the printable has sold: request POD quotes and templates, place the pod-later art on the printer’s own card and tuck-box templates (confirm its safe zone), order a proof, and confirm CPSIA/children’s-product status with the partner and counsel [VERIFY].',
];
A.human_todo = todo(A);
B.human_todo = todo(B);
A.compliance_notes = compliance('A'); B.compliance_notes = compliance('B');
Object.assign(A, pricing(A.price_usd)); Object.assign(B, pricing(B.price_usd, { kdpLater: true }));
// Honest AI disclosure per channel (COMPLIANCE-GATE 17; G2-08). B adds KDP answers for its planned journal edition.
A.ai_disclosure = {
    "as_of": "2026-09-28",
    "ai_helped_with": "Claude (an AI model made by Anthropic), working in Claude Code, wrote the draft text (activities, talk lines, guide pages, safety notes and this listing), made the illustrations as flat vector art in code from the brand's own symbol library, and built the page layouts and PDF files with scripts.",
    "humans_did": "The founder, for AlphaPlay LLC, directs the product line and set the brand, safety and honesty rules (brand/BRAND.md) that every draft follows, and she gives the final go-ahead before anything is listed. As of 2026-09-28 no person has rewritten the text or redrawn the art, and the customer panel in panel.md was simulated, not real people. Still to be done by a person before release: rewrite the text in her own words, proof the cover and page 1, and check a printed copy (human_todo).",
    "etsy_attribution": "Designed by Play Before Pixels",
    "etsy_ai_flag": true,
    "etsy_who_made": "I did (the shop made it, using AI tools) [UNVERIFIED form wording]",
    "etsy": "In Etsy's listing form, say the shop designed this item and that AI tools were used, wherever the form asks. As best known (UNVERIFIED): Etsy's Creativity Standards sort items as Made by, Designed by, Handpicked by or Sourced by; an item made with AI tools belongs under Designed by, and Etsy asks sellers to say in the description that AI was used. Add etsy_description_line at the end of the Etsy description.",
    "etsy_description_line": "How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels.",
    "site": "Product page line: 'How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels.' Add 'and edited by the founder' only after she has rewritten the text or art.",
    "social_ai_label": "Turn on each platform's AI-generated-content label for posts that use these images or this text (label names UNVERIFIED).",
    "notes": "Answers describe what really happened as of the date above. Platform categories and form wording are from memory (UNVERIFIED): check each form on upload day. Never call any part hand-drawn, handmade or human-written."
  };
B.ai_disclosure = {
    "as_of": "2026-09-28",
    "ai_helped_with": "Claude (an AI model made by Anthropic), working in Claude Code, wrote the draft text (activities, talk lines, guide pages, safety notes and this listing), made the illustrations as flat vector art in code from the brand's own symbol library, and built the page layouts and PDF files with scripts.",
    "humans_did": "The founder, for AlphaPlay LLC, directs the product line and set the brand, safety and honesty rules (brand/BRAND.md) that every draft follows, and she gives the final go-ahead before anything is listed. As of 2026-09-28 no person has rewritten the text or redrawn the art, and the customer panel in panel.md was simulated, not real people. Still to be done by a person before release: rewrite the text in her own words, proof the cover and page 1, and check a printed copy (human_todo).",
    "etsy_attribution": "Designed by Play Before Pixels",
    "etsy_ai_flag": true,
    "etsy_who_made": "I did (the shop made it, using AI tools) [UNVERIFIED form wording]",
    "etsy": "In Etsy's listing form, say the shop designed this item and that AI tools were used, wherever the form asks. As best known (UNVERIFIED): Etsy's Creativity Standards sort items as Made by, Designed by, Handpicked by or Sourced by; an item made with AI tools belongs under Designed by, and Etsy asks sellers to say in the description that AI was used. Add etsy_description_line at the end of the Etsy description.",
    "etsy_description_line": "How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels.",
    "kdp_ai_text": "AI-generated (Claude). Answer yes. As best known (UNVERIFIED), KDP counts text an AI tool wrote as AI-generated even after heavy editing; only passages the founder writes herself are her own.",
    "kdp_ai_images": "AI-generated (Claude; vector art made in code). Answer yes.",
    "kdp_ai_translation": "None: English only, no machine translation.",
    "site": "Product page line: 'How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels.' Add 'and edited by the founder' only after she has rewritten the text or art.",
    "social_ai_label": "Turn on each platform's AI-generated-content label for posts that use these images or this text (label names UNVERIFIED).",
    "notes": "Answers describe what really happened as of the date above. Platform categories and form wording are from memory (UNVERIFIED): check each form on upload day. Never call any part hand-drawn, handmade or human-written."
  };
A.owner = OWNER; B.owner = OWNER;
Object.assign(A, common); Object.assign(B, common);
const OPTIONAL = ['amazon_title'];
const order = ['slug', 'title', 'subtitle', 'etsy_title', 'amazon_title', 'format', 'trim', 'pages', 'ages', 'price_usd', 'price_notes', 'price_floor', 'price_floor_basis', 'net_per_unit_by_channel', 'margin_pct_by_channel', 'net_notes', 'short_description', 'long_description', 'bullets', 'keywords', 'etsy_tags', 'seo_title', 'seo_description', 'alt_text', 'editable', 'shareable_piece', 'bonus_offer', 'channels', 'amazon_route', 'language', 'license_tiers', 'faq', 'ai_disclosure', 'compliance_notes', 'human_todo', 'next_products', 'bonus_url', 'listing_images', 'files', 'pod_later', 'owner'];
const words = s => s.split(/\s+/).filter(Boolean).length;
for (const [L, dir] of [[A, ROOT], [B, path.join(ROOT, 'talk-along')]]) {
  const errs = [];
  if (L.short_description.length > 160) errs.push('short_description ' + L.short_description.length);
  const lw = words(L.long_description); if (lw < 120 || lw > 250) errs.push('long_description words ' + lw);
  if (L.bullets.length !== 5) errs.push('bullets');
  if (L.keywords.length !== 7) errs.push('keywords');
  if (L.seo_title.length > 60) errs.push('seo_title ' + L.seo_title.length);
  if (L.seo_description.length > 155) errs.push('seo_description ' + L.seo_description.length);
  if (L.etsy_title.length > 140) errs.push('etsy_title ' + L.etsy_title.length);
  if (L.etsy_tags.length !== 13 || L.etsy_tags.some(t => t.length > 20)) errs.push('etsy_tags');
  if (L.next_products.length < 2 || L.next_products.length > 3) errs.push('next_products');
  if ('list_price_usd' in L) errs.push('list price not allowed (honest pricing)');
  if (L.slug === 'play-talk-cards' && !L.long_description.includes(SAFE_LINE)) errs.push('missing published-safety-rules line');
  for (const f of order) if (L[f] === undefined && !OPTIONAL.includes(f)) errs.push('missing field ' + f);
  const uf = underFloor(L); if (uf.length) errs.push('net under price_floor: ' + uf.join(', '));
  for (const f of L.listing_images) if (!fs.existsSync(path.join(dir, f))) errs.push('missing image ' + f);
  for (const f of [...L.files.store, ...L.files.etsy_upload]) if (!fs.existsSync(path.join(dir, f))) errs.push('missing file ' + f);
  const all = JSON.stringify(L).toLowerCase();
  for (const bad of ['autism', 'therapy', 'therapist', 'slp', 'clinically', 'cure', 'adhd', 'hanen', 'safety-checked', 'certified', 'safe for all ages', 'late talker', 'speech delay', 'catch up', 'was $', 'tabletopics', 'table topics']) if (all.includes(bad)) errs.push('banned word: ' + bad);
  if (errs.length) { console.error(L.slug, errs); process.exit(1); }
  const out = {}; order.forEach(k => { if (L[k] !== undefined) out[k] = L[k]; });
  fs.writeFileSync(path.join(dir, 'listing.json'), JSON.stringify(out, null, 2) + '\n');
  console.log(L.slug, 'ok', 'long words', lw, 'short', L.short_description.length, 'seo', L.seo_title.length, L.seo_description.length);
}
