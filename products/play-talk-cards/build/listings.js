// node build/listings.js : writes listing.json for both products and checks BRAND.md limits.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const common = {
  channels: [
    'Etsy (digital download, delivered instantly by Etsy)',
    'Play Before Pixels website shop (instant download by automated email/link)',
    'Later, only after the printable sells: print-on-demand poker deck in a tuck box (files in pod-later/, marked POD LATER)',
  ],
  compliance_notes: 'Parent education only: no health, medical or developmental-outcome claims anywhere (BRAND.md rule 1); no trademarked program names (talk moves are described in plain words); no diagnosis-related keywords, tags or wording (BRAND.md search-targeting rule); no named schools, companies, apps or devices; no research citations used. Child safety (BRAND.md rule 4) is built in: a grown-up stays within reach on every play, every under-3 object is described as bigger than a toilet-paper tube, water play always says a grown-up within arm’s reach, no balloons, no long cords or strings, no choking-risk foods; car cards say a passenger reads. Faceless: nothing requires the founder on camera or live. Printable only, no inventory. Copyright line on every page and in PDF metadata: “© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.” Personal/family license notice on page 3, in every page footer and in PDF metadata. The founder’s note box on page 3 is a clearly labeled placeholder for human-authored text and must be replaced before release. Artwork and text were drafted with AI assistance (Claude Code); do not describe them as human-made, and answer any marketplace AI-use questions truthfully. The POD-later files must be checked against the chosen printer’s current card and tuck-box templates before any upload, and a physical card deck for families may count as a children’s product in the US (CPSIA) [VERIFY with the POD partner and counsel before listing it].',
};
const A = {
  slug: 'play-talk-cards',
  title: '52 Play & Talk Cards for Ages 0–5',
  subtitle: 'One play and one talk tip on every card, age-coded for babies, toddlers and preschoolers',
  format: 'Printable PDF, instant download: 4 PDFs of 13 pages each (US Letter and A4, full color and ink-saver). Includes 54 poker-size cards (52 plays, a how-to card and a blank card) on 6 card sheets, an optional card-backs page, a page of type-in make-your-own cards (fillable in free Adobe Acrobat Reader), a 52-week play tracker, a grown-up guide with 8 talk moves, printing and safety tips, and a free companion bonus link.',
  trim: 'Cards 2.5 × 3.5 in (63.5 × 88.9 mm, poker size), 9 per page with cut lines. US Letter 8.5 × 11 in and A4 210 × 297 mm. Card sheets use 0.25 in top and bottom margins on US Letter so the cards print at true size; if a printer clips the edge, choosing “Fit” prints them slightly smaller. All other pages use 0.5 in margins. No bleed (home printing).',
  pages: 13,
  ages: '0–5',
  price_usd: 6.99,
  list_price_usd: 10.75,
  price_notes: 'Spec target is $7. List at $10.75 and run the usual 35% Etsy sale, landing at $6.99 (DEMAND-CHECK.md section 4, rules 1–3). Suggested bundle with Family Talk-Along Cards: $11.99 (list $17.99), about 15% off the pair [founder to confirm]. Kill rule: fewer than 5 sales after 60 days with listing and SEO fixed means reprice once, then fold into a bundle. POD deck later at about $22, only after the printable has sold (section 4 rule 8); landed unit cost at or below 35–40% of retail [VERIFY POD quotes].',
  short_description: '52 printable play cards for ages 0–5. Every card has one simple play, one talk tip and a safety note. Age-coded, poker size, Letter + A4.',
  long_description: 'Five minutes of play and a little back-and-forth talk: that’s the whole idea behind these 52 Play & Talk Cards for babies, toddlers and preschoolers.\n\nEvery card gives you one simple play that uses things you already have at home (a dish towel, a pot and spoon, a cardboard box, a pile of socks), plus one talk tip in plain words, like “pause and wait,” “say what you see” or “offer a choice.” A short safety note sits on every card too.\n\nThe cards are sorted into four age colors, each with its own shape: 0–12 months, 1–2 years, 2–3 years and 3–5 years, with 13 plays in each. Pick your child’s color and go. Ages are a guide, not a rule.\n\nPrint at home on cardstock: nine poker-size cards per page with cut lines, plus optional card backs. You also get a grown-up guide, a page of type-in blank cards for your family’s own favorite plays, and a 52-week checklist for the fridge. The download includes US Letter and A4 versions in full color and ink-saver.\n\nThese are ideas for everyday play and conversation, not medical or professional advice. A grown-up plays along and stays close every time.\n\nThis is a digital download. Nothing is shipped.',
  bullets: [
    '52 simple plays for ages 0–5, 13 in each age color: 0–12 months, 1–2, 2–3 and 3–5 years',
    'One plain-words talk tip on every card, like pause and wait, say what you see, or offer a choice',
    'Safety note on every card: grown-up within reach, nothing smaller than a toilet-paper tube for under-3s',
    'Print at home: 54 poker-size cards, 9 per page, cut lines, optional backs, type-in blank cards',
    'US Letter and A4, full color and ink-saver, plus a grown-up guide and a 52-week play tracker',
  ],
  keywords: ['toddler activity cards', 'baby play ideas printable', 'screen free toddler activities', 'printable play cards 0-5', 'talk while you play', 'preschool activity cards', 'toddler busy printable'],
  seo_title: '52 Play & Talk Cards, Ages 0–5 | Printable Play Ideas',
  seo_description: 'Printable cards for ages 0–5: 52 simple plays, each with a talk tip and a safety note. Age-coded, poker size, US Letter and A4. Instant download.',
  alt_text: 'A fan of colorful printable play cards on a sunny yellow background. Each card shows an age chip, a simple icon, a play title such as Color Sort, a short play, a talk tip and a safety note, under the title 52 Play & Talk Cards.',
  next_products: ['family-talk-along-cards', 'bored-play-cards', 'guide-100-plays'],
  bonus_url: 'playbeforepixels.com/bonus/play-talk-cards',
  files: {
    print: ['play-talk-cards.pdf', 'play-talk-cards-A4.pdf', 'play-talk-cards-ink-saver.pdf', 'play-talk-cards-ink-saver-A4.pdf'],
    source: 'source.html (US Letter, full color); variants are generated by build/build.js',
    content_to_edit: 'build/content.js',
    previews: 'preview/p01.png … p13.png',
    listing_images: 'preview/listing-images/01-hero.png … 08-grow-with-it.png (2000 × 2000)',
    cover: 'cover.png', mockup: 'mockup.png',
    pod_later: ['pod-later/POD-LATER_play-talk-deck_54-fronts.pdf', 'pod-later/POD-LATER_play-talk-deck_back.pdf', 'pod-later/POD-LATER_play-talk-deck_tuck-box.pdf', 'pod-later/proof-play-talk-deck_cards.png', 'pod-later/proof-play-talk-deck_tuck-box-guide.png'],
    rebuild: 'cd products/play-talk-cards && node build/render-all.js && node build/pod.js && node build/market.js && node build/listings.js',
  },
  pod_later: { status: 'POD LATER: do not list until the printable has sold', product: '54-card poker deck (52 plays + how-to + blank) in a tuck box', trim: '2.5 × 3.5 in, 0.125 in bleed (2.75 × 3.75 in pages), text inside a 0.16 in safe zone', target_price_usd: 22 },
};
const B = {
  slug: 'family-talk-along-cards',
  title: '52 Family Talk-Along Cards for Ages 5–12',
  subtitle: 'Conversation cards for dinner, the car, bath time and bedtime, with a one-line grown-up tip on each',
  format: 'Printable PDF, instant download: 4 PDFs of 13 pages each (US Letter and A4, full color and ink-saver). Includes 54 poker-size cards (52 questions, a how-to card and a blank card) on 6 card sheets, an optional card-backs page, a page of type-in make-your-own cards (fillable in free Adobe Acrobat Reader), cut-out moment labels with a talk-along week check, a grown-up guide with 6 talk-along habits, printing and safety tips, and a free companion bonus link.',
  trim: A.trim,
  pages: 13,
  ages: '5–12',
  price_usd: 6.99,
  list_price_usd: 10.75,
  price_notes: 'Spec target is $7. List at $10.75 and run the usual 35% Etsy sale, landing at $6.99 (DEMAND-CHECK.md section 4). Suggested bundle with 52 Play & Talk Cards: $11.99 (list $17.99) [founder to confirm]. Don’t fight 200–400-card decks on Amazon; win on the by-moment structure and the grown-up tip. Kill rule: fewer than 5 sales after 60 days means reprice once, then bundle. POD deck later at about $24, only after the printable has sold [VERIFY POD quotes].',
  short_description: '52 printable conversation cards for ages 5–12, sorted by moment: dinner, car, bath and bedtime. A grown-up tip on every card.',
  long_description: 'Real talk happens in small moments: passing the peas, waiting at a red light, rinsing shampoo, turning off the lamp. These 52 Family Talk-Along Cards give those moments a good question.\n\nThe cards are sorted by moment, 13 for each: dinner, the car, bath time and bedtime. Questions range from silly (“What would a fish say about our bathtub?”) to thoughtful (“What was a brave thing you did this week?”). Every card carries a one-line grown-up tip for keeping the talk going, like “go first with your answer” or “just listen; ‘that sounds hard’ is enough.”\n\nThe grown-up guide covers six easy talk-along habits and how to use the cards with 5–7s and with 8–12s. Anyone can say “pass,” grown-ups answer too, and in the car a passenger reads while the driver just talks.\n\nPrint at home: nine poker-size cards per page with cut lines and optional card backs. You also get type-in blank cards for your family’s own questions, plus cut-out labels so each pile can live where it gets used: a jar on the table, the glove box, a zip bag by the sink, the nightstand. US Letter and A4, full color and ink-saver.\n\nThis is a digital download. Nothing is shipped.',
  bullets: [
    '52 conversation cards for ages 5–12, 13 each for dinner, the car, bath time and bedtime',
    'A one-line grown-up tip on every card for keeping the talk going',
    'Grown-up guide: 6 talk-along habits plus tips for ages 5–7 and 8–12',
    'Print at home: 54 poker-size cards, 9 per page, cut lines, optional backs, type-in blank cards',
    'Cut-out moment labels and a weekly check page; US Letter and A4, full color and ink-saver',
  ],
  keywords: ['family conversation cards', 'dinner table questions kids', 'car ride questions for kids', 'bedtime questions for kids', 'conversation starters kids', 'screen free family activity', 'printable talk cards'],
  seo_title: '52 Family Talk-Along Cards, Ages 5–12 | Printable',
  seo_description: 'Printable conversation cards for ages 5–12: 52 questions for dinner, the car, bath time and bedtime, each with a grown-up tip. Letter and A4.',
  alt_text: 'A fan of printable conversation cards on a bright blue background. Cards are color-coded Dinner, Car, Bath and Bedtime, each with a big question and a grown-up tip, under the title 52 Family Talk-Along Cards.',
  next_products: ['bored-play-cards', 'visual-routine-cards', 'play-talk-cards'],
  bonus_url: 'playbeforepixels.com/bonus/family-talk-along-cards',
  files: {
    print: ['family-talk-along-cards.pdf', 'family-talk-along-cards-A4.pdf', 'family-talk-along-cards-ink-saver.pdf', 'family-talk-along-cards-ink-saver-A4.pdf'],
    source: 'source.html (US Letter, full color); variants are generated by ../build/build.js',
    content_to_edit: '../build/content.js',
    previews: 'preview/p01.png … p13.png',
    listing_images: 'preview/listing-images/01-hero.png … 08-grow-with-it.png (2000 × 2000)',
    cover: 'cover.png', mockup: 'mockup.png',
    pod_later: ['../pod-later/POD-LATER_talk-along-deck_54-fronts.pdf', '../pod-later/POD-LATER_talk-along-deck_back.pdf', '../pod-later/POD-LATER_talk-along-deck_tuck-box.pdf', '../pod-later/proof-talk-along-deck_cards.png', '../pod-later/proof-talk-along-deck_tuck-box-guide.png'],
    rebuild: A.files.rebuild,
  },
  pod_later: { status: 'POD LATER: do not list until the printable has sold', product: '54-card poker deck (52 questions + how-to + blank) in a tuck box', trim: A.pod_later.trim, target_price_usd: 24 },
};
const todo = (name, bonus) => [
  'Human authorship (BRAND.md): rewrite the card text in build/content.js in your own words, choose and reorder the cards, and adjust colors if you like; commit each draft and log it in legal/protection/creation-records-log.md. Then rebuild (see files.rebuild).',
  'Write the founder’s note on page 3 in your own words (60–90 words) and replace the dashed placeholder box in build/build.js (printPage) before release.',
  `Build the free bonus page at ${bonus} (email + child’s birth month/year only, no names; links the privacy policy) before listing; the QR code already points there.`,
  'Publish the full license terms at playbeforepixels.com/license and a contact form at playbeforepixels.com/contact (both are printed in the PDF) [VERIFY final URLs].',
  'Print one Letter and one A4 copy on cardstock at 100%: check cut lines, card size (2.5 × 3.5 in), colors, and the optional backs page flipped on the long edge; confirm the type-in fields work in free Adobe Acrobat Reader.',
  `Upload the 4 PDFs (zip them or attach as separate files), the 8 listing images and the mockup to Etsy and the site; set list price $10.75 with a 35% sale; answer Etsy’s creation and AI-use questions truthfully [VERIFY current Etsy policy].`,
  'Confirm “52 Play & Talk Cards” and “Family Talk-Along Cards” are clear to use as product names (brand/ORIGINALITY.md does not list them yet) [VERIFY with the trademark search routine].',
  'Only after the printable has sold: request POD quotes and templates, place the pod-later art on the printer’s own card and tuck-box templates, order a proof, and confirm CPSIA/children’s-product status with the partner and counsel [VERIFY].',
];
A.human_todo = todo('A', A.bonus_url);
B.human_todo = todo('B', B.bonus_url);
Object.assign(A, common); Object.assign(B, common);
const order = ['slug', 'title', 'subtitle', 'format', 'trim', 'pages', 'ages', 'price_usd', 'list_price_usd', 'price_notes', 'short_description', 'long_description', 'bullets', 'keywords', 'seo_title', 'seo_description', 'alt_text', 'channels', 'compliance_notes', 'human_todo', 'next_products', 'bonus_url', 'files', 'pod_later'];
const words = s => s.split(/\s+/).filter(Boolean).length;
for (const [L, dir] of [[A, ROOT], [B, path.join(ROOT, 'talk-along')]]) {
  const errs = [];
  if (L.short_description.length > 160) errs.push('short_description ' + L.short_description.length);
  const lw = words(L.long_description); if (lw < 120 || lw > 250) errs.push('long_description words ' + lw);
  if (L.bullets.length !== 5) errs.push('bullets');
  if (L.keywords.length !== 7) errs.push('keywords');
  if (L.seo_title.length > 60) errs.push('seo_title ' + L.seo_title.length);
  if (L.seo_description.length > 155) errs.push('seo_description ' + L.seo_description.length);
  const all = JSON.stringify(L).toLowerCase();
  for (const bad of ['autism', 'therapy', 'therapist', 'slp', 'clinically', 'cure', 'adhd', 'hanen']) if (all.includes(bad)) errs.push('banned word: ' + bad);
  if (errs.length) { console.error(L.slug, errs); process.exit(1); }
  const out = {}; order.forEach(k => { out[k] = L[k]; });
  fs.writeFileSync(path.join(dir, 'listing.json'), JSON.stringify(out, null, 2) + '\n');
  console.log(L.slug, 'ok', 'long words', lw, 'short', L.short_description.length, 'seo', L.seo_title.length, L.seo_description.length);
}
