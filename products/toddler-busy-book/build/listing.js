// Writes ../listing.json from build stats (counts are never typed by hand). node build/listing.js
const fs = require('fs'), path = require('path');
const S = require('./stats.json');
const A = S.actPages, P = S.pages, N = S.activities;
const price = 11.99;
const L = {
  slug: 'toddler-busy-book',
  title: `${N} Toddler Busy Book Activities for Ages 1–5`,
  subtitle: 'Matching, sorting, colors, shapes, pretend play, first words and mazes, sorted by age, with a “talk while you play” line on every page',
  etsy_title: `${N} Toddler Busy Book Printable Activities, Ages 1-5 Busy Binder, Screen-Free Matching, Colors, Shapes, Pretend Play, Mazes, US Letter + A4`,
  format: `Digital download (printable PDF), website edition and Etsy edition. Main file: ${P} pages = cover, license page, start-here page, 2-page grown-up guide, how-to-read-a-page, safety rules, assembly guide (binder, laminated, velcro), laminating & velcro tips, printing tips, 2-page page finder, 4 binder covers (tomato, sky, grass, plum), spine labels, pouch labels, 3 age-band divider pages, ${N} activities (${S.byBand.b1} for 1–2 years, ${S.byBand.b2} for 2–3, ${S.byBand.b3} for 3–5; ${S.noCut} need no cutting) with ${S.sheets} straight-cut piece sheets (${S.pieces} pieces), 5 make-your-own pages, a weekly busy-book planner (Monday and Sunday starts, pre-filled example and blank), a Busy Book Star certificate, an answer key, quick answers, a “more from Play Before Pixels” page and a free-bonus page (QR + short link; the Etsy edition has a thank-you page instead and no URL anywhere). Every main file has 95 type-in form fields (covers, spine and pouch labels, make-your-own pages, blank planners, certificate) that work in free PDF readers. Each edition comes in Color and Low-ink (white pages, colorable line art), each in US Letter and A4, plus a short START HERE guide. Website edition also includes an 18-file PNG template set (300 dpi) for design apps.`,
  trim: 'US Letter 8.5 × 11 in AND A4 210 × 297 mm (separate files). Content sits in a 7.25 × 10 in live area centred on both sizes (Letter margins 0.625/0.5 in; A4 about 0.51/0.84 in), so every piece prints at exactly the same size on both. Standard pieces 2.25 × 2 in (5.7 × 5.1 cm); big pieces for 1–2 years 3 × 2.5 in (7.6 × 6.3 cm); pouch labels 3.5 × 2 in; spine labels 1, 1.5 and 2 in wide. Print at 100% / actual size; a 2 in check square is on the printing-tips page.',
  pages: P,
  activities: N,
  ages: `1–5 in three bands: 1–2 years (from 12 months, ${S.byBand.b1} activities), 2–3 years (from 24 months, ${S.byBand.b2}), 3–5 years (from 36 months, ${S.byBand.b3}). Every activity shows its starting age in months.`,
  price_usd: price,
  price_notes: `Everyday price $${price} (about $${(price / N).toFixed(2)} per activity). DEMAND-CHECK.md suggested "$15.99 list, sold at about $11–$12"; BRAND.md "Honest pricing" overrides that rule, so there is no $15.99 anchor, no "was" price and no permanent sale: the everyday price sits where buyers actually pay. Only genuine, time-limited promotions that truly end (a launch week, Black Friday). Never below $5. Ladder: this single → seasonal add-on packs → a $19.99 "mega bundle" later (with the play cards or 100-plays PDF) at 10–25% off the sum of parts. Kill rule: fewer than 5 sales after 60 days with listing and SEO fixed → reprice once, then fold into a bundle.`,
  short_description: `${N} screen-free busy book activities for ages 1–5, sorted by age, with a talk line on every page. ${S.noCut} no-cut pages; every piece 2 in or bigger.`,
  long_description: `A busy book that gives you something to talk about, not just something to keep little hands busy.\n\nThese ${N} printable activities are sorted into three age bands (1–2, 2–3 and 3–5 years): first words with art from our talk-along board book, animal sounds, matching, color and shape sorting, shadow match, pretend play (pizza shop, café, post office, dress for the weather), counting, patterns, first-next-last stories, rhymes and eight mazes from easy to tricky.\n\nEvery page has one “talk while you play” line to say out loud, a make-it-easier and make-it-harder idea, a 2-minute version for tired days, honest prep time and a safety note. ${S.noCut} activities need no cutting at all. Piece sheets use straight cuts only, 12 or fewer per sheet, and every piece is 2 in (5.1 cm) or bigger, larger than a toilet-paper tube. Every play follows our published safety rules.\n\nYou also get binder covers in four colors, spine and pouch labels, an assembly guide (binder, laminated or velcro for ages 3–5), laminating tips, a weekly planner with Monday and Sunday starts, make-your-own pages, a certificate and an answer key.\n\nFiles: Color and Low-ink, each in US Letter and A4, with type-in pages that work in free PDF readers. About $${(price / N).toFixed(2)} per activity. This is a digital download; nothing is shipped. For use in your own home.`,
  bullets: [
    `${N} activities in three age bands (1–2, 2–3, 3–5 years), each with its starting age in months`,
    'A “talk while you play” line, make-it-easier/harder ideas and a 2-minute version on every page',
    `${S.noCut} no-cut pages to play today; piece sheets use straight cuts, 12 or fewer per sheet, every piece 2 in (5.1 cm) or bigger`,
    'Matching, sorting, colors, shapes, pretend play, first words from our board book, counting, patterns, rhymes and 8 mazes',
    'Color + Low-ink, US Letter + A4, type-in covers, labels and planners (Monday/Sunday), assembly, laminating and velcro guide'
  ],
  keywords: ['toddler busy book', 'busy binder printable', 'toddler activities', 'preschool activities', 'quiet book printable', 'learning binder', 'screen free activities'],
  etsy_tags: ['toddler busy book', 'busy binder', 'busy book printable', 'quiet book', 'toddler activities', 'preschool printable', 'learning binder', 'screen free play', 'matching game', 'toddler printable', 'homeschool toddler', 'busy book pages', 'first words'],
  seo_title: `${N} Toddler Busy Book Activities | Play Before Pixels`,
  seo_description: `${N} printable busy book activities for ages 1–5, sorted by age, with a talk line on every page. ${S.noCut} no-cut pages. Color + Low-ink, Letter + A4.`,
  alt_text: 'Cover of the printable Toddler Busy Book by Play Before Pixels: a navy title on a pale blue page, a smiling toddler and grown-up on a big yellow circle, and four white piece cards showing a duck, a red apple, a purple star and a ball, with age chips for 1–2, 2–3 and 3–5 years.',
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
    'Amazon: KDP paperback activity-book edition later (see amazon_route)'
  ],
  amazon_route: `kdp-activity-edition: a paperback built from the ${S.noCut} no-cut activities (first words, look-and-find, sing & move, mazes and roads, counting, feelings), 8.5 × 11 in, premium color, single-sided mark-making pages per CUSTOMER-VOICE rule 20, with cut-piece activities replaced by point-and-name versions (no scissors in a bound book for toddlers) [VERIFY KDP color cost and page limits]. Not built yet: see human_todo. The printable stays on Etsy and our site.`,
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
  compliance_notes: `Rule 1 and autism rule: no health, therapy, medical, developmental-outcome or diagnosis claims anywhere; no autism/ADHD/therapy/speech words in the product, images, keywords or tags (build/check.js scans every edition for banned words, including "therapy", "late talker", "catch up", "certified", "safety-checked"). The guide says the book is parent education, not medical or developmental advice, and every age-band page carries the pediatrician line; ages are "starting points, not deadlines". Rule 2: no company, app, device or product is named; PDF readers and design apps are described generically. Rule 4 child safety: supervision note ("Play together, with a grown-up right there") on every activity page (checked automatically); every cut piece is 2.0 in or bigger (1–2 years: 2.5 in), above the 1.75 in brief and the 1.25 in tube test (checked automatically); "Grown-up keeps the pieces" printed on every piece sheet; no velcro dots on any 1–2 or 2–3 activity, velcro optional on 3–5 with "Check dots before each play"; no balloons, beads, buttons, coins, cords or strings; pictured foods exclude whole grapes, nuts, popcorn and hard candy and no real food is used; toy-car and photo pages carry their own notes. Rule 5: no research citations are used. Rule 6: talk moves in plain words, no program names. Rule 7 and logo rules: original titles, art and layout; characters and scenes reused from our own board book and 100-plays guide; official logo files unaltered. CUSTOMER-VOICE: Color + Low-ink in Letter + A4, plain PDFs ≤15 MB, START HERE is file 1, Etsy edition has no URL/QR, version footer on every page, prep time on page 3 and in the listing, straight-cut grids ≤12 pieces, ${S.noCut} no-cut pages, every activity has a starting age in months, easier/harder pair, 2-minute version and talk line, 2-page grown-up guide with "most children love 2–3 of these" and the language line, fillable fields, number of activities (not pages) leads the title, honest cost per activity. Honest pricing: no anchor or "was" price. Printables are digital; any future physical version needs CPSIA review [VERIFY]. AI-assisted content: do not describe text or art as human-made in any copyright filing.`,
  human_todo: [
    'Rewrite the grown-up text in your own words in build/acts-young.js, build/acts-old.js and build/extra-pages.js (marked FOUNDER), then run `bash products/toddler-busy-book/build/make-all.sh` and commit each version so your authorship is on record',
    'Print one Letter and one A4 test: check the 2 in square on the printing-tips page, one piece sheet on cardstock, one laminated piece with rounded corners, and the Low-ink file',
    'Open a main PDF in a free PDF reader on a computer and a phone: type a name on a binder cover and a blank planner, save, reprint',
    'Read every activity once more for safety in your own home context, especially the 1–2 and 2–3 pages',
    'Build the free bonus page at playbeforepixels.com/bonus/toddler-busy-book (Busy Book Extras + email sign-up asking only email and child’s birth month/year) before the website listing goes live; the QR code already points there',
    'Make sure playbeforepixels.com/help and /licenses exist (the FAQ and license page point to them in the website edition)',
    'Etsy: upload the 5 files in etsy-upload/, add the 10 listing images (listing-01 as thumbnail), paste etsy_title, etsy_tags and long_description, set $11.99 with no "was" price, and put prep time and cost per activity in the description as written',
    'Website: add the product with mockup.png and cover.png, deliver the 4 website-edition PDFs + START HERE + PNG zip, and link "Next for your child’s age" to next_products',
    'Decide whether the Etsy listing should mention the PNG template set (it is only in the website download, because Etsy files must be plain PDFs)',
    'Later: build the KDP activity edition described in amazon_route; list seasonal add-on packs and the $19.99 bundle',
    'Check every printer and marketplace template against the current rules before upload (printables here; KDP later)'
  ]
};
const bad = /\b(therapy|autism|adhd|speech|slp|clinically|cure)\b/i;
for (const k of ['keywords', 'etsy_tags']) if (L[k].some(t => bad.test(t))) throw new Error('banned keyword');
if (L.etsy_tags.length > 13 || L.etsy_tags.some(t => t.length > 20)) throw new Error('etsy tags');
if (L.short_description.length > 160 || L.seo_title.length > 60 || L.seo_description.length > 155) throw new Error('length: ' + [L.short_description.length, L.seo_title.length, L.seo_description.length]);
const words = L.long_description.split(/\s+/).length; if (words < 120 || words > 250) throw new Error('long_description words ' + words);
fs.writeFileSync(path.join(__dirname, '..', 'listing.json'), JSON.stringify(L, null, 2) + '\n');
console.log('listing.json ok · long_description words', words, '· etsy title chars', L.etsy_title.length);
