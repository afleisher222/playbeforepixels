// Writes ../listing.json from build stats (counts are never typed by hand). node build/listing.js
const fs = require('fs'), path = require('path');
const S = require('./stats.json');
const A = S.actPages, P = S.pages, N = S.activities;
const price = 11.99;
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
const L = {
  slug: 'toddler-busy-book',
  title: `${N} Toddler Busy Book Activities for Ages 1–5`,
  subtitle: 'Matching, sorting, colors, shapes, pretend play, first words and mazes, sorted by age, with a “talk while you play” line on every page',
  etsy_title: `${N} Toddler Busy Book Printable Activities, Ages 1-5 Learning Binder, Screen-Free Matching, Colors, Shapes, Pretend Play, Mazes, Letter + A4`,
  amazon_title: `Toddler Busy Book for Ages 1–5: ${S.noCut} No-Cut Activities to Point, Name and Play, with a Talk Line on Every Page`,
  format: `Digital download (printable PDF), website edition and Etsy edition. Main file: ${P} pages = cover, license page, start-here page, 2-page grown-up guide, how-to-read-a-page, safety rules, assembly guide (binder, laminated, velcro), laminating & velcro tips, printing tips, 2-page page finder, 4 binder covers (tomato, sky, grass, plum), spine labels, pouch labels, 3 age-band divider pages, ${N} activities (${S.byBand.b1} for 1–2 years, ${S.byBand.b2} for 2–3, ${S.byBand.b3} for 3–5; ${S.noCut} need no cutting) with ${S.sheets} straight-cut piece sheets (${S.pieces} pieces), 5 make-your-own pages, a weekly busy-book planner (Monday and Sunday starts, pre-filled example and blank), a Busy Book Star certificate, an answer key, quick answers, a “more from Play Before Pixels” page and a free-bonus page (QR + short link; the Etsy edition has a thank-you page instead and no URL anywhere). Every main file has 95 type-in form fields (covers, spine and pouch labels, make-your-own pages, blank planners, certificate) that work in free PDF readers. Each edition comes in Color and Low-ink (white pages, colorable line art), each in US Letter and A4, plus a short START HERE guide. Website edition also includes an 18-file PNG template set (300 dpi) for design apps.`,
  trim: 'US Letter 8.5 × 11 in AND A4 210 × 297 mm (separate files). Content sits in a 7.25 × 10 in live area centred on both sizes (Letter margins 0.625/0.5 in; A4 about 0.51/0.84 in), so every piece prints at exactly the same size on both. Standard pieces 2.25 × 2 in (5.7 × 5.1 cm); big pieces for 1–2 years 3 × 2.5 in (7.6 × 6.4 cm); pouch labels 3.5 × 2 in; spine labels 1, 1.5 and 2 in wide. Print at 100% / actual size; a 2 in check square is on the printing-tips page.',
  pages: P,
  activities: N,
  ages: `1–5 in three bands: 1–2 years (from 12 months, ${S.byBand.b1} activities), 2–3 years (from 24 months, ${S.byBand.b2}), 3–5 years (from 36 months, ${S.byBand.b3}). Every activity shows its starting age in months.`,
  price_usd: price,
  price_notes: `Everyday price $${price} (about $${(price / N).toFixed(2)} per activity), ${SAME_PRICE}. ${HONEST} DEMAND-CHECK's list-then-sale suggestion is not used. Never below $5. Bundles: a part of the $29 Ages 1–5 Instant Gift Bundle and the $45 Birth-to-5 Printable Library (ops/QUEUE.md), each 10–25% under the live sum of its parts; the earlier $19.99 'mega bundle' idea is retired. Ladder: this single, then seasonal add-on packs, then the bundles. Nets: net_per_unit_by_channel (UNVERIFIED fees). ${KILL}`,
  ...pricing(price, { kdpLater: true }),
  short_description: `${N} screen-free printable busy book activities for ages 1–5, sorted by age, with a talk line on every page. ${S.noCut} no-cut pages; every piece 2 in or bigger.`,
  long_description: `${N} printable busy book activities for ages 1–5, in three age bands (1–2, 2–3 and 3–5 years). You get Color and Low-ink PDFs in US Letter and A4. Each page gives you something to talk about, not just busy hands.\n\nThere are first words with big pictures, animal sounds, matching, and color and shape sorting. Kids match shadows and play pretend: pizza shop, café, post office and dress for the weather. They count, make patterns, tell first-next-last stories, rhyme and try eight mazes, easy to tricky.\n\nEvery page has a “talk while you play” line and a safety note. It also has an easier and a harder idea and a 2-minute version. Prep is 0 minutes for the ${S.noCut} no-cut activities and 5–10 minutes for pages with pieces. Piece sheets use straight cuts, 12 pieces or fewer per sheet. Every piece is 2 in (5.1 cm) or bigger, larger than a toilet-paper tube. Every play follows our published safety rules.\n\nAlso inside: binder covers in four colors, spine and pouch labels, and a guide to put it together. Use a binder, laminated pages or velcro (ages 3–5 only). Add laminating tips, a weekly planner, make-your-own pages, a certificate and an answer key.\n\nYou can type into the covers, labels, planners, blank pages and certificate in a free PDF reader. That's about ${Math.round(100 * price / N)} cents a play. Printed words are in English. Digital download for your own home; nothing ships.`,
  bullets: [
    `${N} activities in three age bands (1–2, 2–3, 3–5 years), each with its starting age in months`,
    'A “talk while you play” line, make-it-easier/harder ideas and a 2-minute version on every page',
    `${S.noCut} no-cut pages to play today; piece sheets use straight cuts, 12 pieces or fewer per sheet, every piece 2 in (5.1 cm) or bigger`,
    'Matching, sorting, colors, shapes, pretend play, first words, counting, patterns, rhymes and 8 mazes',
    'Color + Low-ink, US Letter + A4, type-in covers, labels and planners (Monday/Sunday), assembly, laminating and velcro guide'
  ],
  keywords: ['toddler busy book', 'busy binder printable', 'toddler activities', 'toddler activity pages', 'quiet book printable', 'learning binder', 'screen free activities'],
  etsy_tags: ['toddler busy book', 'busy binder', 'busy book printable', 'quiet book', 'toddler activities', 'toddler learning', 'learning binder', 'screen free play', 'matching game', 'toddler printable', 'homeschool toddler', 'busy book pages', 'first words'],
  seo_title: `${N} Toddler Busy Book Activities | Play Before Pixels`,
  seo_description: `${N} printable busy book activities for ages 1–5, sorted by age, with a talk line on every page. ${S.noCut} no-cut pages. Color + Low-ink, Letter + A4.`,
  alt_text: 'Cover of the printable Toddler Busy Book by Play Before Pixels: a navy title on a pale blue page, a smiling toddler and grown-up on a big yellow circle, and four white piece cards showing a duck, a red apple, a purple star and a ball, with age chips for 1–2, 2–3 and 3–5 years.',
  // alt text for each listing image, in order (read by ops/UPLOAD-PACKETS/build_packets.py)
  listing_images_alt: require('./listing-images-alt.json'),
  listing_images: [
    'preview/listing-images/listing-01.png — hero: number of activities, pages and pieces (thumbnail)',
    'preview/listing-images/listing-02.png — what’s inside: 8 sample pages and the counts',
    'preview/listing-images/listing-03.png — three age bands with a sample page each',
    'preview/listing-images/listing-04.png — first words pages with the board-book art and a talk line',
    'preview/listing-images/listing-05.png — matching page + its piece sheet + pieces',
    'preview/listing-images/listing-06.png — 3–5 years: mazes, patterns and sequencing',
    'preview/listing-images/listing-07.png — how every page works (talk line, easier/harder, 2-minute version, prep, safety)',
    'preview/listing-images/listing-08.png — sizes and formats: Color vs Low-ink, Letter + A4, type-in pages, 4 colorways',
    'preview/listing-images/listing-09.png — how to use in 4 steps + assembly and laminating pages',
    'preview/listing-images/listing-10.png — safety: toilet-paper-tube test, grown-up keeps the pieces, no velcro under 3',
    'mockup.png — website product image (1600 × 1200)'
  ],
  channels: [
    'Etsy digital download: upload the 5 plain PDFs in etsy-upload/ (START HERE + Color Letter/A4 + Low-ink Letter/A4), each under 15 MB; the Etsy edition carries no URL or QR code',
    'Play Before Pixels website shop (automatic digital delivery): the four website-edition PDFs, START HERE (Letter + A4) and toddler-busy-book-PNG-templates.zip',
    'Amazon: none at launch. The KDP activity edition in amazon_route is HELD (no 0–3 KDP activity editions before CPSC guidance; ops/QUEUE.md)'
  ],
  amazon_route: `kdp-activity-edition: a paperback built from the ${S.noCut} no-cut activities (first words, look-and-find, sing & move, mazes and roads, counting, feelings), 8.5 × 11 in, premium color, single-sided mark-making pages per CUSTOMER-VOICE rule 20, with cut-piece activities replaced by point-and-name versions (no scissors in a bound book for toddlers) [VERIFY KDP color cost and page limits]. Not built yet: see human_todo. HELD (ops/QUEUE.md): 0–3 KDP activity editions, this one included, wait for CPSC guidance. The printable stays on Etsy and our site.`,
  next_products: ['board-up-go-more', 'guide-100-plays', 'bored-play-cards'],
  bonus_url: 'playbeforepixels.com/bonus/toddler-busy-book',
  bonus_offer: 'Free companion printable “Busy Book Extras” (seasonal pages in the same three age bands) plus a monthly “play at this age” email. Sign-up asks only for an email and the child’s birth month and year; never a name. QR code and short link are on the last page of the website edition (the Etsy edition has no URL or QR, per the marketplace rule).',
  shareable_piece: `Busy Book Star certificate (page ${A['x-cert']}, type-in name, favorite page and date) and the four binder covers, designed to be photographed, each with the Play Before Pixels mark.`,
  files: {
    print_letter: `toddler-busy-book.pdf (${P} pages, Color, US Letter, website edition, 95 type-in fields)`,
    print_a4: 'toddler-busy-book-A4.pdf (Color, A4)',
    low_ink: 'toddler-busy-book-low-ink-Letter.pdf and toddler-busy-book-low-ink-A4.pdf (white pages, colorable line art)',
    start_here: 'toddler-busy-book-START-HERE.pdf and -START-HERE-A4.pdf (8 pages: files, quick start, grown-up guide, safety, assembly, printing, quick answers)',
    editable: 'Type-in form fields are built into every main PDF (binder covers, spine and pouch labels, My people, Our words, matching board and blank cards, blank Monday/Sunday planners, certificate); pre-filled example versions of My people and the planner sit beside the blank ones',
    png_templates: 'toddler-busy-book-PNG-templates.zip (png-templates/: 18 PNGs at 300 dpi + HOW-TO-USE.txt), website edition only',
    etsy_upload: 'etsy-upload/ (5 plain PDFs, no zips, no URL/QR)',
    source: 'source.html (Color, US Letter, website edition). build/ holds acts-young.js and acts-old.js (all activity text and boards), extra-pages.js (guide, safety, covers, back matter), art.js (new art), lib.js (reuses the board-book scenes and the 100-plays icons), build.js, check.js (QA), fillable.js, marketing.js, listing.js and make-all.sh (rebuilds everything)',
    images: `cover.png (1236 × 1600), mockup.png (1600 × 1200), preview/p01–p${P}.png (color), preview/low-ink/, preview/listing-images/listing-01–10.png (2000 × 2000)`
  },
  compliance_notes: `Rule 1 and the diagnosis-search rule: no health, therapy, medical, developmental-outcome or diagnosis claims anywhere; no diagnosis, condition, therapy or speech words in the product, images, keywords or tags (build/check.js scans every edition for banned words, including "therapy", "late talker", "catch up", "certified", "safety-checked"). The guide says the book is parent education, not medical or developmental advice, and every age-band page carries the pediatrician line; ages are "starting points, not deadlines". Rule 2: no company, app, device or product is named; PDF readers and design apps are described generically. Rule 4 child safety: supervision note ("Play together, with a grown-up right there") on every activity page (checked automatically); every cut piece is 2.0 in or bigger (1–2 years: 2.5 in), above the 1.75 in brief and the 1.25 in tube test (checked automatically); "Grown-up keeps the pieces" printed on every piece sheet; no velcro dots on any 1–2 or 2–3 activity, velcro optional on 3–5 with "Check dots before each play"; no balloons, beads, buttons, coins, cords or strings; pictured foods exclude whole grapes, nuts, popcorn and hard candy and no real food is used; toy-car and photo pages carry their own notes. Rule 5: no research citations are used. Rule 6: talk moves in plain words, no program names. Rule 7 and logo rules: original titles, art and layout; characters and scenes reused from our own board book and 100-plays guide; official logo files unaltered. CUSTOMER-VOICE: Color + Low-ink in Letter + A4, plain PDFs ≤15 MB, START HERE is file 1, Etsy edition has no URL/QR, version footer on every page, prep time on page 3 and in the listing, straight-cut grids ≤12 pieces, ${S.noCut} no-cut pages, every activity has a starting age in months, easier/harder pair, 2-minute version and talk line, 2-page grown-up guide with "most children love 2–3 of these" and the language line, fillable fields, number of activities (not pages) leads the title, honest cost per activity. Honest pricing: no anchor or "was" price. Printables are digital; any future physical version needs CPSIA review [VERIFY]. Trademark note: "velcro" is used lowercase and generically (hook-and-loop dots), as in the brand's own customer-voice rules; no Velcro-brand logo or product claim appears. AI-assisted content: do not describe text or art as human-made in any copyright filing.`,
  human_todo: [
    'Rewrite the grown-up text in your own words in build/acts-young.js, build/acts-old.js and build/extra-pages.js (marked FOUNDER), then run `bash products/toddler-busy-book/build/make-all.sh` and commit each version so your authorship is on record',
    'Print one Letter and one A4 test: check the 2 in square on the printing-tips page, one piece sheet on cardstock, one laminated piece with rounded corners, and the Low-ink file',
    'Open a main PDF in a free PDF reader on a computer and a phone: type a name on a binder cover and a blank planner, save, reprint',
    'Read every activity once more for safety in your own home context, especially the 1–2 and 2–3 pages',
    'Build the free bonus page at playbeforepixels.com/bonus/toddler-busy-book (Busy Book Extras + email sign-up asking only email and child’s birth month/year) before the website listing goes live; the QR code already points there',
    'Make sure playbeforepixels.com/help exists (the FAQ points to it in the website edition)',
    'Etsy (G-day week): upload the 5 files in etsy-upload/, add the 10 listing images (listing-01 as thumbnail), paste etsy_title, etsy_tags and long_description, set $11.99 with no "was" price, Offsite Ads off, and put prep time and cost per activity in the description as written; create the same product on Gumroad at $11.99',
    'Website: add the product with mockup.png and cover.png, deliver the 4 website-edition PDFs + START HERE + PNG zip, and link "Next for your child’s age" to next_products',
    'Decide whether the Etsy listing should mention the PNG template set (it is only in the website download, because Etsy files must be plain PDFs)',
    'Later: build the KDP activity edition described in amazon_route (HELD until CPSC guidance for 0–3 activity books); list seasonal add-on packs; the bundles are the $29 Ages 1–5 Instant Gift Bundle and the $45 Birth-to-5 Printable Library (ops/QUEUE.md)',
    'Check every printer and marketplace template against the current rules before upload (printables here; KDP later)',
    'Confirm the gift line matches your license terms: "Can I give it as a gift?" (give the printed book, not the files). Child-care, classroom and library licenses are HELD until employment counsel clears school-facing sales in writing; the PDFs say they are not available yet',
    'Decide whether to say "hook-and-loop dots" instead of "velcro" (a brand name) across this product and the customer-voice rules'
  ],
  // Honest AI disclosure per channel (COMPLIANCE-GATE 17; G2-08), including KDP answers for the planned activity edition.
  ai_disclosure: {
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
  },
  owner: OWNER,
  list_price_usd: null,
  price_history: [],
  status: 'ready-pending-accounts',
  edition: 'G0 (ages 1–5 only): the whole product is already a G0 edition; nothing is held back (ops/QUEUE.md LAUNCH FIRST: Toddler Busy Book, 74 activities, ages 1–5 — $11.99)'
};
const bad = /\b(therapy|autism|adhd|speech|slp|clinically|cure|preschool|classroom|teacher|daycare|library|visual schedule)\b/i;
for (const k of ['keywords', 'etsy_tags']) if (L[k].some(t => bad.test(t))) throw new Error('banned keyword');
if (L.etsy_tags.length > 13 || L.etsy_tags.some(t => t.length > 20)) throw new Error('etsy tags');
if (L.short_description.length > 160 || L.seo_title.length > 60 || L.seo_description.length > 155) throw new Error('length: ' + [L.short_description.length, L.seo_title.length, L.seo_description.length]);
const words = L.long_description.split(/\s+/).length; if (words < 120 || words > 250) throw new Error('long_description words ' + words);
if (L.etsy_title.length > 140) throw new Error('etsy_title ' + L.etsy_title.length);
if (underFloor(L).length) throw new Error('net under price_floor: ' + underFloor(L).join(', '));
fs.writeFileSync(path.join(__dirname, '..', 'listing.json'), JSON.stringify(L, null, 2) + '\n');
console.log('listing.json ok · long_description words', words, '· etsy title chars', L.etsy_title.length);
