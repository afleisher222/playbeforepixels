// Writes ../listing.json and ../listing-starter.json from the live card data and page counts.
// Checks every length limit in brand/BRAND.md and Etsy's title/tag limits, and fails on banned words.
const fs = require('fs'); const path = require('path');
const { CARDS } = require('./cards.js');
const m = require('./manifest.json');
const N = CARDS.length, NY = CARDS.filter(c => !c.cat.startsWith('bk-')).length, NB = N - NY, NS = CARDS.filter(c => c.starter).length;
const D = m.docs;
const PC = D['full-store-color-letter'].pages, PL = D['full-store-low-letter'].pages, PS = D['starter-store-color-letter'].pages, PSL = D['starter-store-low-letter'].pages;
const words = s => s.split(/\s+/).filter(Boolean).length;
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
const SP = 5.00; // Starter everyday price (decision D2, ops/QUEUE.md)
const STARTER_NOTE = ` Gumroad Discover is left out on purpose: at $${SP.toFixed(2)} a Discover sale would net about $${NET.site_gumroad_discover_sale(SP).toFixed(2)}, under the $3.00 floor, so sell the Starter on Gumroad as a direct sale or order add-on with Discover turned off (ops/PRE-MORTEM.md #38; whether Discover can be turned off for one product is UNVERIFIED). The Etsy Offsite Ads case clears the floor by only about $${c2(NET.etsy_offsite_ad_sale(SP) - 3).toFixed(2)}.`;
const common = {
  bonus_url: 'playbeforepixels.com/bonus/visual-routine-cards',
  bonus_offer: 'Free on the bonus page (email plus optional child birth month/year; never names): seasonal routine cards (holidays, back to school, travel day), one short age-matched play idea a month, and, for own-store buyers of the Complete Set, the Canva-ready PNG set in canva-png/. Linked only from the own-store edition (QR + short link); Etsy files carry no URL or QR.',
  amazon_route: 'none-with-reason',
  amazon_route_notes: 'Cut-apart, laminated picture cards with velcro dots do not work as a bound KDP paperback: the cards would have to be cut out of a book, which breaks the under-3 "grown-up keeps the pieces" rule and ruins the binding. The write-in big-kid checklists feed the planned KDP "Play First, Then Screens" checklist journal (products/play-first-family-kit, amazon_route kdp-activity-edition) instead. Revisit a print-on-demand card deck only after this printable sells (DEMAND-CHECK section 4, rule 8), and check it against the chosen printer\'s current template before upload.',
  language: 'English (card labels and guide). Fillable fields accept typed labels in other Latin-alphabet languages, accents included.',
  faq: [
    { q: 'How long does prep take?', a: 'About 20 minutes to print, laminate and cut the cards for one routine, once. No time tonight? Print the 2 pages START HERE names, lay four cards on the strip and start.' },
    { q: 'How does delivery work?', a: 'Instant download: nothing ships. On Etsy your files stay on your Purchases page (open Etsy in a web browser, not the app). On our site the link is in your order email. On a phone, save each PDF to Files and open it in free Adobe Acrobat Reader.' },
    { q: 'Which file do I print?', a: 'One file for your paper size (US Letter or A4) and ink (Color or Low-ink). Every card is 2.2 in (5.6 cm) on both sizes. Print at 100% / Actual size.' },
    { q: 'What can I type?', a: 'Card labels on blank, word-free and photo-frame cards, chart titles and names, big-kid jobs and tick boxes, in free Adobe Acrobat Reader on a computer or phone. Accents work (á, ñ, ü). Colors and pictures cannot be changed.' },
    { q: 'Who is it for?', a: 'One family: print as many copies as your home needs, including for grandparents and sitters who care for your child.' },
    { q: 'Can I give it as a gift?', a: 'Yes. Buy it and pass the files on, or print and laminate one set for the family you are giving it to. The personal license then belongs to that family. [VERIFY whether the store can send the download straight to a gift recipient.]' },
    { q: 'Can a classroom, child-care center, library or PTA use it?', a: 'Not yet. This set is licensed for one family. Classroom and group licenses are not offered right now.' },
    { q: 'Is there a Spanish version?', a: 'Not yet: the printed labels are in English. You can type your own labels in Spanish (accents work) on the word-free and blank cards. A Spanish edition would be made by a human translator.' },
    { q: 'Does it work for children who sign, point or use a talking device?', a: 'Yes. A sign, a point, a tap on a card or a device, even a "no", counts as communicating. There are More, Stop, My turn, Break, Help, Yes and No cards, and every card comes word-free too.' },
    { q: 'What ages is it for?', a: 'Birth to 12. The guide shows ways to use the cards from one card at a time (0–12 months) to a checklist a big kid writes. Ages are a guide, never a deadline.' },
    { q: 'Is it safe for toddlers?', a: 'A grown-up stays close and keeps the pieces. Cards are 2.2 in (5.6 cm) square; do not shrink or cut them smaller. No velcro dots under 3. Every card follows our published safety rules.' },
    { q: 'Is this professional advice?', a: 'No. These are everyday routine cards for families. Questions about your child\'s development? Your child\'s doctor is a good place to start.' },
    { q: 'Refunds?', a: 'Digital downloads follow the shop\'s published refund policy. If a file will not open or print, we fix it or send it again [link the policy page at launch].' },
    { q: 'Is it on Amazon?', a: 'No. Cut-apart cards do not work as a bound book.' }
  ],
  list_price_usd: null,
  price_history: [],
  editable: 'Fillable text fields (free Adobe Acrobat Reader, computer or phone) are merged into every Color and Low-ink file: card labels on blank, word-free and photo-frame cards; chart titles and names; the "When every card is done, we:" line; Today board "Who I\'ll see today"; big-kid checklist jobs, week, name and screen spot, plus tick boxes. Colors and pictures: not editable. Typed text shows in a standard font (Helvetica), not the brand fonts.',
  // Honest AI disclosure per channel (COMPLIANCE-GATE 17; G2-08).
  ai_disclosure: {
    "as_of": "2026-09-28",
    "ai_helped_with": "Claude (an AI model made by Anthropic), working in Claude Code, wrote the draft text (activities, talk lines, guide pages, safety notes and this listing), made the illustrations as flat vector art in code from the brand's own symbol library, and built the page layouts and PDF files with scripts.",
    "humans_did": "The founder, for AlphaPlay LLC, directs the product line and set the brand, safety and honesty rules (brand/BRAND.md) that every draft follows, and she gives the final go-ahead before anything is listed. As of 2026-09-28 no person has rewritten the text or redrawn the art, and the customer panel in panel.md was simulated, not real people. Still to be done by a person before release: rewrite the text in her own words, proof the cover and page 1, and check a printed copy (human_todo).",
    "etsy_attribution": "Designed by Play Before Pixels",
    "etsy_ai_flag": true,
    "etsy_who_made": "I did (the shop made it, using AI tools) [UNVERIFIED form wording]",
    "etsy": "In Etsy's listing form, say the shop designed this item and that AI tools were used, wherever the form asks. As best known (UNVERIFIED): Etsy's Creativity Standards sort items as Made by, Designed by, Handpicked by or Sourced by; an item made with AI tools belongs under Designed by, and Etsy asks sellers to say in the description that AI was used. Add etsy_description_line at the end of the Etsy description.",
    "etsy_description_line": "How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels.",
    "site": "Product page line: 'How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels.' Add 'and edited by the founder' only after she has rewritten the text or art. The PDFs' last page now says 'Illustrations and text created with AI assistance and edited by Play Before Pixels'; until the founder has edited the text, 'edited by' overstates the human part, so that line in build/ should match what happened (product build lane).",
    "social_ai_label": "Turn on each platform's AI-generated-content label for posts that use these images or this text (label names UNVERIFIED).",
    "notes": "Answers describe what really happened as of the date above. Platform categories and form wording are from memory (UNVERIFIED): check each form on upload day. Never call any part hand-drawn, handmade or human-written."
  },
  owner: OWNER,
  compliance_notes: 'HARD RULES: no health, medical, therapy or outcome claims anywhere in the files, listings or keywords; diagnosis, condition and therapy words (and professional-credential words) are not used, even though competitors use them (BRAND rule 1 and the diagnosis-search rule; DEMAND-CHECK 4.12). Positioned as parent education: "helps little ones see what comes next." No real brands, apps, devices, schools or companies are named or shown; the tablet is a generic sleeping tablet shown as a neutral object (rule 2). One citation only, the allowed WHO 2019 under-5 guideline (rule 5). Talk ideas in plain words, no trademarked program names (rule 6). CHILD SAFETY (rule 4): every card is 2.2 in / 5.6 cm square and the storage labels are 1.62 in tall, measured in the rendered CSS by build/check.js (build fails under 1.5 in); cut-piece pages print "Grown-up keeps the pieces"; no velcro dots for under-3s (lay-on-top, All done pocket or page-protector route); every chart page prints "Ages 3+: check dots before each play; remove any that lift"; a printed 2.2 in size-check square; adult supervision, magnet, laminating-scrap and blind-cord notes; no balloons, cords, or choking-hazard foods pictured. SCREENS (CUSTOMER-VOICE rule 26): screens have a fixed spot in the day that never grows or shrinks with jobs or behavior; the big-kid checklist line reads "Screens have their own spot in our day: ___. Same spot every day, list or no list."; "What we do next" and "5 more minutes" cards are included. No-guilt wording; no fear words. Listing wording: "Every card follows our published safety rules" (never "safety-checked" or "certified"). HONEST PRICING (BRAND "Honest pricing", gate #18): plain everyday price, no was/compare-at price, no standing sale. CHANNEL EDITIONS (gate #16): Etsy files in etsy-upload/ contain no playbeforepixels.com URL, short link or QR code (build/check.js fails if they do); own-store files carry the website in every footer and the bonus QR. Copyright line and "Version 1.0 · September 2026" on every page. Logo from brand/logo only (wordmark in footers and headers, horizontal lockup on covers). Low-ink files: white backgrounds, no tinted grounds, line art children can color. PDFs are tagged and bookmarked; small accent text uses a darkened tomato (#C8431F) for 4.5:1 contrast. Diverse cast reused from the board book. Digital download only: no inventory.',
};
const full = {
  slug: 'visual-routine-cards',
  title: `${N} Visual Routine Cards for Ages 0–12: Morning, Meals, Play and Bedtime Charts`,
  etsy_title: `${N} Visual Routine Cards, Editable Toddler Daily Schedule, Morning & Bedtime Chart, First Then Board, Kids Checklist PDF`,
  subtitle: `${N} picture cards for ages 0–5 and 5–12, 6 chart layouts, 4 colorways, fillable PDF. Helps little ones see what comes next.`,
  format: `Digital download, 5 plain PDFs (no zip): START HERE + Color US Letter (${PC} pages) + Color A4 (${PC} pages) + Low-ink US Letter (${PL} pages) + Low-ink A4 (${PL} pages). Fillable fields for free Adobe Acrobat Reader merged into every Color and Low-ink file; bookmarked; tagged. Own-store bonus: Canva-ready PNGs (canva-png/).`,
  trim: 'US Letter 8.5 × 11 in and A4 210 × 297 mm, 0.5 in margins, no bleed (home printing). Two chart layouts are landscape pages. Every card is 2.2 × 2.2 in (5.6 cm) on both paper sizes.',
  pages: PC,
  pages_breakdown: `Color file, ${PC} pages = 66 card pages (Rainbow, Soft and Navy: 20 picture-card pages + 1 second-copies page + 1 blank-card page each) + 21 word-free and photo-frame card pages + 63 chart pages (per colorway: 11 ready-made layouts and checklists + 10 blank fillable) + 7 guide pages (cover, 2-page grown-up guide, use by age, print guide, laminating and safety, card index) + 2 extras pages (Today markers and All done pocket, storage labels) + 1 thank-you page. Low-ink file, ${PL} pages: the same in the Simple colorway only. Letter and A4 counts are never added together.`,
  ages: '0–5 and 5–12 (feelings, plan words and the screens cards for all ages)',
  price_usd: 9.50,
  price_notes: `Everyday price $9.50 (decision D1 as recommended in business/GROWTH-ENGINE.md), ${SAME_PRICE}. Honest value line: ${N} cards, about 4¢ each. ${HONEST} This overrides DEMAND-CHECK rule 2; the item has never been offered at a higher price. The 60-card Starter Set is a second listing at $5.00 (listing-starter.json), the entry rung of the ladder. Bundles: a part of the $45 Birth-to-5 Printable Library (ops/QUEUE.md). Search words wait for the founder's D9 answer (ops/APPROVALS.md). Nets: net_per_unit_by_channel (UNVERIFIED fees). ${KILL} Re-check competitor prices on the live Etsy pages before launch [VERIFY].`,
  ...pricing(9.50),
  short_description: `${N} printable routine picture cards and 6 charts for ages 0–12. Fillable PDF, Color and Low-ink, US Letter + A4. Helps little ones see what comes next.`,
  long_description: `${N} printable routine picture cards for ages 0–12, with 6 charts, in US Letter and A4 PDFs. Big, friendly pictures show little ones what comes next at mornings, meals, bath and bedtime. Your child can point to them, carry them and move them to "All done."\n\nOf the ${N} cards, ${NY} are for ages 0–5 and all ages. They cover morning, meals, play, outside, reading together, bath, bedtime, helping jobs, and out and about. There are plan words like More, Stop, My turn and Break, and a feelings check-in. ${NB} big-kid cards are for ages 5–12. A "Play first / Screens later" pair uses a plain, generic tablet. "What we do next" and "5 more minutes" cards help with the switch.\n\nChoose from 6 chart layouts: vertical and horizontal strips, a first–then board, morning and bedtime charts and a Today board. Big kids get weekly checklists too. Every chart comes ready-made and blank, with a Monday or Sunday start.\n\nMake it yours: type labels, titles and jobs in free Adobe Acrobat Reader, in any language with accents. Or use the word-free, blank and photo-frame cards. Busy cards come twice. Rainbow, Soft and Navy looks are in the Color file; Simple line art is in the Low-ink file.\n\nA 2-page grown-up guide covers setup in 2 minutes (start with just 2 pages tonight), easy talk tips and use by age. Every card follows our published safety rules.\n\nInstant digital download. No physical item ships.`,
  bullets: [
    `${N} cards on ${PC} pages (Color file) = 66 card pages + 21 word-free and photo pages + 63 chart pages + 10 guide and extras pages; about 4¢ a card; about 20 minutes to prep one routine, then reusable`,
    `${NY} cards for ages 0–5 and all ages (including More, Stop, My turn, Break and Quiet ears), ${NB} big-kid cards for 5–12, second copies of busy cards, plus "Play first / Screens later", "What we do next" and "5 more minutes"`,
    '6 chart layouts (vertical and horizontal strips, first–then, morning, bedtime, Today board) and big-kid checklists, each ready-made and blank, Monday or Sunday start',
    'Fillable in free Adobe Acrobat Reader: card labels, chart titles, names and jobs (colors and pictures are not editable); word-free, blank and photo-frame cards too',
    '4 colorways in a Color file and a Low-ink file, US Letter and A4; cards stay 2.2 in (5.6 cm); grown-up guide, laminating tips and safety notes included'
  ],
  keywords: ['visual routine cards', 'toddler routine chart', 'morning routine chart kids', 'bedtime routine cards', 'daily schedule printable', 'first then board', 'kids checklist printable'],
  etsy_tags: ['visual routine cards', 'toddler routine', 'morning routine', 'bedtime routine', 'daily schedule kids', 'first then board', 'visual schedule', 'kids chore chart', 'routine chart', 'preschool printable', 'toddler printable', 'kids checklist', 'editable chart'],
  seo_title: `${N} Visual Routine Cards for Kids 0–12 | Play Before Pixels`,
  seo_description: `${N} printable routine cards and 6 charts for toddlers and big kids. Fillable PDF, color and low-ink, Letter and A4. Helps little ones see what comes next.`,
  alt_text: `Cover of ${N} Visual Routine Cards:`+' a warm yellow panel with the Play Before Pixels logo, the title in navy and tomato, and five picture cards fanned below: Brush teeth, Blocks, Sleep, Play first and Screens later.',
  listing_images_alt: [
    `${N} Visual Routine Cards, ages 0–5 and 5–12: a yellow panel with the Play Before Pixels logo, the title, a morning chart filled with picture cards, and big Play first and Screens later cards.`,
    `What's inside: ${N} cards, ${PC} pages, 5 files. Six tiles list ${N} picture cards, 6 chart layouts, 4 colorways, fillable fields, extras and 2 guide pages, above a row of sample cards.`,
    'Two grown-up guide pages, slightly tilted: "Pictures make the plan easy to see" and "The cards are the start of a conversation" with six talk tips beside small cards.',
    `A grid of 12 cards for ages 0–5, including Wake up, Get dressed, Snack, Blocks, Bath time, Lullaby, Worried and Grocery store, in a varied cast of children.`,
    `Nine big-kid cards for ages 5–12, such as Homework, Read 20 minutes and Walk the dog, beside a weekly morning checklist with a tick circle for each day.`,
    'Six chart layouts shown as small pages: vertical strips, horizontal strips, a first–then board, a morning chart, a bedtime chart filled with cards, and a Today board.',
    'Play first and Screens later cards with a plain sleeping tablet, plus What we do next and 5 more minutes cards, and a row of feelings cards: Happy, Sad, Mad, Tired and Big breath.',
    'The same four cards in four looks: Rainbow, Soft and Navy from the Color file, and Simple black line art from the Low-ink file.',
    'Cards relabeled by typing: Rise and shine, Toilet and the Spanish word Bloques, above tiles for fillable fields, word-free and blank cards, and photo-frame cards.',
    'How to download: open Etsy in a web browser, go to Purchases, open the PDF in Adobe Acrobat Reader. The 5 files are listed, with a 2.2 inch card-size square.'
  ],
  listing_images: ['preview/listing-images/01-cover.png', 'preview/listing-images/02-whats-inside.png', 'preview/listing-images/03-grown-up-guide.png', 'preview/listing-images/04-ages-0-5-cards.png', 'preview/listing-images/05-ages-5-12-cards.png', 'preview/listing-images/06-six-chart-layouts.png', 'preview/listing-images/07-play-first-screens-later.png', 'preview/listing-images/08-four-colorways.png', 'preview/listing-images/09-make-it-yours.png', 'preview/listing-images/10-how-to-download.png'],
  channels: [
    'Etsy (digital download; upload the 5 files in etsy-upload/complete/, which carry no URL or QR code; listing images are rendered from the Etsy edition)',
    'Play Before Pixels website shop (instant download: START-HERE.pdf and the 4 PDFs in the product root, which carry the website and bonus QR; canva-png/ on the bonus page)',
    'Later: a Routine Cards + Play-First Family Kit pair and the holiday gift bundle (DEMAND-CHECK section 2)',
    'Not TPT or school channels: school-facing listings are on hold until employment counsel answers (marketing/BLIND-SPOTS.md)'
  ],
  files: {
    own_store: ['START-HERE.pdf', `visual-routine-cards.pdf (Color, US Letter, ${PC} pages)`, 'visual-routine-cards-a4.pdf (Color, A4)', `visual-routine-cards-low-ink.pdf (Low-ink, US Letter, ${PL} pages)`, 'visual-routine-cards-low-ink-a4.pdf (Low-ink, A4)', 'canva-png/ (bonus page only)'],
    etsy_files: ['etsy-upload/complete/1-START-HERE.pdf', 'etsy-upload/complete/2-Color-US-Letter.pdf', 'etsy-upload/complete/3-Color-A4.pdf', 'etsy-upload/complete/4-Low-Ink-US-Letter.pdf', 'etsy-upload/complete/5-Low-Ink-A4.pdf'],
    source: 'source.html (Color, US Letter, own-store edition). Every file is generated by build/make-all.sh from build/build.js, cards.js, card.js and art.js.',
  },
  shareable_piece: 'The finished morning chart or Today board on the fridge: every page footer carries the small Play Before Pixels wordmark (plus the website on own-store files), so a photo of a filled chart shows the brand without extra stickers.',
  next_products: ['play-first-family-kit', 'bored-play-cards', 'toddler-busy-book'],
  starter_tier: { listing: 'listing-starter.json', price_usd: SP, cards: NS },
  ...common,
  human_todo: [
    'Human authorship (BRAND.md): rewrite the welcome and grown-up guide text (build/build.js, marked FOUNDER-EDIT) and the talk tips in your own words; pick or reorder any cards; then run bash build/make-all.sh. Commit each draft and log it in legal/protection/creation-records-log.md.',
    'Build the free bonus page at playbeforepixels.com/bonus/visual-routine-cards (email + optional child birth month/year, never names, privacy link): seasonal routine cards and the canva-png/ set. The QR code in the own-store files already points to https://playbeforepixels.com/bonus/visual-routine-cards.',
    'Physical proof: print page 6 (size check) and one card page and one landscape chart on your own printer in Letter and A4 at 100%; the dashed square must measure 2.2 in (5.6 cm) and landscape pages must auto-rotate.',
    'Fillable-field test: open 2-Color-US-Letter.pdf and 4-Low-Ink-US-Letter.pdf in free Adobe Acrobat Reader on a computer AND a phone, type a card label, a chart title and a checklist job, tick a box, save, reopen and print (CUSTOMER-VOICE rule 23).',
    'Founder proof of the cover and page 1 (15–30 min) and commit your edits (CUSTOMER-VOICE rule 47).',
    'Create the Etsy listing: digital item; upload the 5 files in etsy-upload/complete/ in order; the 10 listing images in order (the last one is "How to download"); etsy_title, 13 etsy_tags and long_description; set a plain $9.50 price with NO sale or compare-at price; answer the AI/creation questions per ai_disclosure; recheck competitor prices on the live pages [VERIFY]. Put the "use a browser, not the Etsy app" text in the automatic order message too.',
    'Create the $5.00 Starter Set listing from listing-starter.json and link the two listings to each other.',
    'Copy the 4 PDFs and START-HERE.pdf in the product root to the website shop.',
    'Customer panel (panel.md): confirm the new gift wording in the terms of use (grandparents and sitters, one printed set for a gifted family); it matches play-talk-cards but is a license decision.',
    'Customer panel: when employment counsel answers, decide on classroom, child-care center, library and PTA licenses for this set (teachers, a director, a PTA leader and a librarian all asked). Until then the FAQ says "not yet".',
    'Customer panel: a Spanish edition was the most-asked-for extra. Only after this set sells, and only with a human translator (BLIND-SPOTS "Not now: translations").',
    'Fillable-field test: also type "Sueño, baño" in a word-free card label in Acrobat Reader to confirm accents display and print.',
    'Update site-concepts/C-paper-craft/catalog.js, which still says 228 cards (now ' + N + ').'
  ]
};
const starter = {
  slug: 'visual-routine-cards-starter',
  title: `${NS} Visual Routine Cards for Toddlers: Starter Set with 3 Charts`,
  etsy_title: `${NS} Visual Routine Cards for Toddlers, Editable Morning & Bedtime Chart, First Then Board, Daily Schedule PDF, Play Before Pixels`,
  subtitle: `${NS} picture cards for ages 0–5 plus 3 charts, fillable PDF. Helps little ones see what comes next.`,
  format: `Digital download, 5 plain PDFs (no zip): START HERE + Color US Letter (${PS} pages) + Color A4 (${PS} pages) + Low-ink US Letter (${PSL} pages) + Low-ink A4 (${PSL} pages). Fillable fields for free Adobe Acrobat Reader merged into every file; bookmarked; tagged.`,
  trim: 'US Letter 8.5 × 11 in and A4 210 × 297 mm, 0.5 in margins, no bleed. The first–then board is a landscape page. Every card is 2.2 × 2.2 in (5.6 cm).',
  pages: PS,
  pages_breakdown: `Color file, ${PS} pages = 7 card pages (5 picture-card pages + second copies + blank cards) + 6 word-free and photo-frame pages + 5 chart pages (strip, first–then and morning chart ready-made; strip and morning chart blank fillable) + 5 guide pages (cover, 2-page grown-up guide, print guide, laminating and safety) + 1 thank-you page. Low-ink file: the same ${PSL} pages in the Simple colorway. Letter and A4 counts are never added together.`,
  ages: '0–5',
  price_usd: SP,
  price_notes: `Everyday price $${SP.toFixed(2)} (decision D2 in business/GROWTH-ENGINE.md, adopted in ops/QUEUE.md), the same on Etsy and on our own checkout; it meets commerce/PRICING.md's rule never to list a single printable under $5. Honest value line: ${NS} cards, about ${Math.round(100 * SP / NS)}¢ each. ${HONEST} Never discounted: any discount would push an Etsy Offsite Ads sale under the $3.00 floor. It can be a $5 order add-on (GROWTH-ENGINE §5b). Nets: net_per_unit_by_channel (UNVERIFIED fees). The listing and the PDF both point buyers to the $9.50 Complete Set.`,
  ...pricing(SP, { discover: false, note: STARTER_NOTE }),
  short_description: `${NS} printable routine picture cards for ages 0–5, plus a strip, a first–then board and a morning chart. Fillable PDF, US Letter + A4.`,
  long_description: `${NS} printable routine picture cards for ages 0–5, with three charts, in US Letter and A4 PDFs. It's a simple place to start. The cards cover a little one's day: waking up, potty, getting dressed, meals and play. Others show outside time, reading together, bath, bedtime, helping jobs and a feelings check-in. There are plan words too, like First, Then and Wait. A "Play first / Screens later" pair uses a plain, generic tablet, with no brands and no apps.\n\nUse one card at a time with a baby, or two on the first–then board with a toddler. A preschooler can use a morning chart of up to nine steps. Your child points to each picture and moves it to "All done."\n\nYou get the cards in the color-coded Rainbow look and in a Low-ink file with line art to color. There are second copies of the busiest cards, plus blank, word-free and photo-frame cards. The three charts come ready-made and blank. Type labels and titles in free Adobe Acrobat Reader. A 2-page grown-up guide covers setup in 2 minutes and easy talk tips. Every card follows our published safety rules.\n\nWant more? The Complete Set has ${N} cards for ages 0–12. It adds 6 chart layouts and 4 colorways.\n\nInstant digital download. No physical item ships.`,
  bullets: [
    `${NS} cards on ${PS} pages (Color file) = 7 card pages + 6 word-free and photo pages + 5 chart pages + 6 guide pages; about 7.5¢ a card; about 20 minutes to prep one routine`,
    'Morning, meals, play, outside, reading, bath, bedtime, helping jobs, feelings and plan words, plus a Play first / Screens later pair with a plain, generic tablet',
    '3 charts, ready-made and blank: vertical strip, first–then board and a 9-step morning chart',
    'Fillable in free Adobe Acrobat Reader: card labels, chart titles and names (colors and pictures are not editable); Color and Low-ink files, US Letter and A4',
    '2-page grown-up guide: setup in 2 minutes, talk tips, laminating, and safety notes; every card 2.2 in (5.6 cm)'
  ],
  keywords: ['toddler routine cards', 'visual routine cards', 'first then board', 'morning routine chart', 'bedtime routine chart', 'toddler daily schedule', 'preschool routine printable'],
  etsy_tags: ['toddler routine', 'visual routine cards', 'first then board', 'morning routine', 'bedtime routine', 'toddler schedule', 'preschool printable', 'routine chart', 'daily schedule kids', 'toddler printable', 'visual schedule', 'potty routine', 'kids routine cards'],
  seo_title: `${NS} Visual Routine Cards for Toddlers | Play Before Pixels`,
  seo_description: `${NS} printable routine cards for toddlers plus a first–then board and morning chart. Fillable PDF, US Letter and A4. Helps little ones see what comes next.`,
  listing_images_alt: [
    `${NS} Visual Routine Cards Starter Set, ages 0–5: a sky-blue panel with the logo, the title, a vertical strip chart holding four cards, and big Sleep and Breakfast cards.`,
    `All ${NS} Starter Set cards in a small grid, above three tiles: ${NS} cards, 3 charts and fillable fields.`,
    'Two grown-up guide pages, slightly tilted: a Starter Set setup page with a four-card bedtime, and a page of talk tips.',
    'A morning chart filled with nine cards, next to an All done pocket holding Bath time and Pajamas cards, with a talk tip.',
    'How to download: open Etsy in a web browser, go to Purchases, open the PDF in Adobe Acrobat Reader. The 5 files are listed, with a 2.2 inch card-size square.'
  ],
  alt_text: 'Cover of the 60 Visual Routine Cards Starter Set: sky-blue panel with the Play Before Pixels logo, the title and a vertical strip chart holding Brush teeth, Get dressed, Shoes on and Play first cards.',
  listing_images: ['preview/listing-images/starter/01-starter-cover.png', 'preview/listing-images/starter/02-starter-whats-inside.png', 'preview/listing-images/starter/03-starter-grown-up-guide.png', 'preview/listing-images/starter/04-starter-in-use.png', 'preview/listing-images/starter/05-how-to-download.png'],
  channels: ['Etsy (digital download; the 5 files in etsy-upload/starter/, no URL or QR)', 'Play Before Pixels website shop (instant download: START-HERE-starter.pdf and the 4 starter PDFs in the product root)'],
  files: {
    own_store: ['START-HERE-starter.pdf', `visual-routine-cards-starter-letter.pdf (Color, US Letter, ${PS} pages)`, 'visual-routine-cards-starter-a4.pdf (Color, A4)', `visual-routine-cards-starter-low-ink-letter.pdf (Low-ink, US Letter, ${PSL} pages)`, 'visual-routine-cards-starter-low-ink-a4.pdf (Low-ink, A4)'],
    etsy_files: ['etsy-upload/starter/1-START-HERE.pdf', 'etsy-upload/starter/2-Color-US-Letter.pdf', 'etsy-upload/starter/3-Color-A4.pdf', 'etsy-upload/starter/4-Low-Ink-US-Letter.pdf', 'etsy-upload/starter/5-Low-Ink-A4.pdf'],
  },
  shareable_piece: 'The finished morning chart on the fridge, with the small Play Before Pixels wordmark in the footer.',
  next_products: ['visual-routine-cards', 'play-first-family-kit', 'bored-play-cards'],
  ...common,
  faq: common.faq.map(f => f.q === 'What ages is it for?' ? { q: f.q, a: 'Birth to 5. The guide shows ways to use the cards from one card at a time (0–12 months) to a nine-step morning chart. Ages are a guide, never a deadline. Big-kid cards for 5–12 are in the Complete Set.' }
    : f.q === 'Does it work for children who sign, point or use a talking device?' ? { q: f.q, a: 'Yes. A sign, a point, a tap on a card or a device, even a "no", counts as communicating. Every card comes word-free too, and the Complete Set adds More, Stop, My turn, Break and Help cards.' }
    : f.q === 'What can I type?' ? { q: f.q, a: 'Card labels on blank, word-free and photo-frame cards, and chart titles and names, in free Adobe Acrobat Reader on a computer or phone. Accents work (á, ñ, ü). Colors and pictures cannot be changed.' } : f),
  bonus_offer: 'Own-store edition only (QR + short link): free seasonal routine cards and one short age-matched play idea a month (email plus optional child birth month/year; never names). Etsy files carry no URL or QR.',
  human_todo: [
    'Price is $5.00 (decision D2, adopted in ops/QUEUE.md; it meets the $5 minimum in commerce/PRICING.md). On Gumroad, sell it as a direct sale or order add-on with Discover turned off (see net_notes).',
    'Create the Etsy listing with the 5 files in etsy-upload/starter/ and the 5 listing images in order (the last one is "How to download"); plain price, no sale.',
    'Link it to the Complete Set listing in the description and the shop section.',
    'Same print, size-check and Acrobat Reader phone test as the Complete Set.'
  ]
};
const BANNED = /autism|autistic|adhd|therapy|therapist|\bslp\b|speech delay|late talker|clinically|cure|heal|reverse|safety-checked|certified|safe for all ages/i;
for (const [f, o] of [['listing.json', full], ['listing-starter.json', starter]]) {
  const errs = [];
  if (o.short_description.length > 160) errs.push('short_description ' + o.short_description.length);
  if (o.seo_title.length > 60) errs.push('seo_title ' + o.seo_title.length);
  if (o.seo_description.length > 155) errs.push('seo_description ' + o.seo_description.length);
  const w = words(o.long_description); if (w < 120 || w > 250) errs.push('long_description words ' + w);
  if (o.etsy_title.length > 140) errs.push('etsy_title ' + o.etsy_title.length);
  if (o.bullets.length !== 5) errs.push('bullets ' + o.bullets.length);
  if (o.keywords.length !== 7) errs.push('keywords ' + o.keywords.length);
  if (o.etsy_tags.length !== 13) errs.push('etsy_tags ' + o.etsy_tags.length);
  o.etsy_tags.forEach(t => { if (t.length > 20) errs.push('tag too long ' + t); });
  const pub = [o.title, o.etsy_title, o.subtitle, o.short_description, o.long_description, ...o.bullets, ...o.keywords, ...o.etsy_tags, o.seo_title, o.seo_description, o.alt_text].join(' ');
  if (BANNED.test(pub)) errs.push('banned word: ' + pub.match(BANNED)[0]);
  if (underFloor(o).length) errs.push('net under price_floor: ' + underFloor(o).join(', '));
  if (o.price_usd < 5) errs.push('single printable under $5 (commerce/PRICING.md)');
  if (errs.length) throw new Error(f + ': ' + errs.join('; '));
  fs.writeFileSync(path.join(__dirname, '..', f), JSON.stringify(o, null, 2) + '\n');
  console.log(f, 'ok · words', w, '· etsy_title', o.etsy_title.length, '· short', o.short_description.length, '· seo', o.seo_title.length, o.seo_description.length, '· net', JSON.stringify(o.net_per_unit_by_channel));
}
