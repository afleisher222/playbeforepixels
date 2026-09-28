// Writes ../listing.json and ../listing-starter.json from the live card data.
const fs = require('fs'); const path = require('path');
const { CARDS } = require('./cards.js');
const m = require('./manifest.json');
const N = CARDS.length, NY = CARDS.filter(c => !c.cat.startsWith('bk-')).length, NB = N - NY;
const words = s => s.split(/\s+/).filter(Boolean).length;
const common = {
  bonus_url: 'playbeforepixels.com/bonus/visual-routine-cards',
  compliance_notes: 'No health, medical, therapy or outcome claims anywhere in the product, listing or keywords; the words autism, ADHD, therapy, speech therapy and SLP are deliberately not used, even though competitors use them (brand/BRAND.md rule 1; marketing/DEMAND-CHECK.md section 4.12). Positioned as parent education: "helps little ones see what comes next." No real brands, apps, devices, schools or companies are named or shown; the tablet is a generic, sleeping tablet (rule 2). Only one citation is used, the allowed WHO 2019 under-5 guideline, worded as in BRAND.md (rule 5). Talk ideas use plain words only, no trademarked program names (rule 6). Child safety (rule 4): every card is 2.2 in / 5.6 cm square (larger than the 1.75 in minimum set for this product and the ~1.25 in toilet-paper-tube rule of thumb) on both Letter and A4; the guide includes an adult-supervision note, a print-at-100% instruction, a printed 2.2 in size-check square, and warnings about velcro dots, laminating scraps and small magnets; no balloons, no cords, no choking-hazard foods pictured (foods shown: banana, cereal, toast, pasta, broccoli, sandwich, crackers). Diverse cast reused from the board book. Copyright line on every page: "© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC." The final page states that illustrations and text were created with AI assistance and edited by Play Before Pixels. Digital download only: no inventory, delivered instantly by the marketplace.',
};
const full = {
  slug: 'visual-routine-cards',
  title: '200+ Visual Routine Cards for Kids, Editable Morning & Bedtime Chart, Toddler Daily Schedule, First Then Board, Printable PDF',
  subtitle: `${N} picture cards for ages 0–5 and 5–12, 6 chart layouts, 4 colorways. Helps little ones see what comes next.`,
  format: `Digital download (5 files): Complete PDF US Letter (${m.letter.full} pages, bookmarked), Complete PDF A4 (${m.a4.full} pages), Editable PDFs Letter + A4 (${m.letter.editable} pages each, typeable form fields, zip), Canva-ready card PNGs (zip), Canva-ready chart PNGs (zip).`,
  trim: 'US Letter 8.5 x 11 in and A4 210 x 297 mm, 0.5 in margins, no bleed (home printing). Every card is 2.2 x 2.2 in (5.6 cm) on both paper sizes.',
  pages: m.letter.full,
  ages: '0–5 and 5–12 (feelings and plan-word cards for all ages)',
  price_usd: 9.50,
  price_notes: 'List at $9.50 and run a standing 30–40% sale (sells at about $5.70–$6.65; launch sale about $6.50) per marketing/DEMAND-CHECK.md sections 1, 3 and 4. The 60-card Starter Set is a second listing at $4.50 (listing-starter.json), the entry rung of the ladder. Later: include in a Play-First Family Kit bundle at 10–25% off the sum of its parts. Re-check competitor prices on the live Etsy pages before launch [VERIFY].',
  short_description: `${N} printable picture cards and 6 routine charts for ages 0–12. Editable, US Letter + A4, 4 colorways. Helps little ones see what comes next.`,
  long_description: `Mornings, meals, bath and bedtime go more smoothly when little ones can see what comes next. This printable set turns your family's everyday rhythm into big, friendly pictures your child can point to, carry and move to "All done."\n\nInside are ${N} picture cards: ${NY} for ages 0–5 (morning, meals, play, outside, reading together, bath, bedtime, helping jobs, out and about, plan words and a feelings check-in) and ${NB} big-kid cards for ages 5–12 (mornings, after school, evenings and family jobs). A "Play first / Screens later" pair uses a plain, generic tablet, with no brands and no apps.\n\nChoose from 6 chart layouts: vertical and horizontal strips, a first–then board, morning and bedtime charts, and a Today board with Monday or Sunday start. Big kids get weekly checklists, pre-filled or blank.\n\nEverything comes in 4 colorways, including an ink-saving white version, in US Letter and A4. Make it yours with blank cards, a typeable PDF for free Adobe Acrobat Reader, and Canva-ready PNGs.\n\nA short parent guide shows how to use the cards at each age, with an easy talk tip on every chart, plus laminating and velcro tips. Every card is 2.2 in (5.6 cm), sized for little hands.\n\nInstant digital download. No physical item ships.`,
  bullets: [
    `${N} picture cards: ${NY} for ages 0–5 plus ${NB} big-kid cards for ages 5–12, including a feelings check-in and a Play first / Screens later pair`,
    '6 chart layouts: vertical and horizontal strips, first–then board, morning chart, bedtime chart and a Today board (Monday or Sunday start), plus big-kid weekly checklists',
    '4 colorways (Rainbow, Soft, Navy, ink-saving Simple) in US Letter and A4; every card stays 2.2 in (5.6 cm)',
    'Make it yours: blank cards, a typeable editable PDF for free Adobe Acrobat Reader, and Canva-ready PNGs of every card and chart',
    'Parent guide by age with a talk tip on every chart, plus laminating, velcro and safety tips'
  ],
  keywords: ['visual routine cards', 'toddler routine chart', 'morning routine chart kids', 'bedtime routine cards', 'daily schedule printable', 'first then board', 'kids checklist printable'],
  etsy_tags: ['visual routine cards', 'toddler routine', 'morning routine', 'bedtime routine', 'daily schedule kids', 'first then board', 'visual schedule', 'kids chore chart', 'routine chart', 'preschool printable', 'toddler printable', 'kids checklist', 'editable chart'],
  seo_title: '200+ Visual Routine Cards for Kids 0–12 | Play Before Pixels',
  seo_description: `${N} printable routine cards and 6 charts for toddlers and big kids. Editable, US Letter and A4, 4 colorways. Helps little ones see what comes next.`,
  alt_text: 'Cover of 200+ Visual Routine Cards: a warm yellow panel with the title in navy and tomato, and five picture cards fanned below, including Brush teeth, Blocks, Sleep, Play first and Screens later.',
  channels: [
    'Etsy (digital download listing; upload the 5 files in etsy_files)',
    'Play Before Pixels website shop (instant digital download through the storefront in commerce/)',
    'Later: inside a Play-First Family Kit bundle and the holiday gift bundle (marketing/DEMAND-CHECK.md section 2)',
    'Not TPT or school channels: school-facing listings are on hold until employment counsel answers (marketing/BLIND-SPOTS.md)'
  ],
  etsy_files: [
    'visual-routine-cards.pdf (Complete, US Letter)',
    'visual-routine-cards-a4.pdf (Complete, A4)',
    'downloads/visual-routine-cards-editable-pdfs.zip (Editable PDFs, Letter + A4)',
    'downloads/visual-routine-cards-canva-cards.zip (card PNGs, art-only PNGs, blank frames)',
    'downloads/visual-routine-cards-canva-charts.zip (chart and checklist backgrounds, Letter + A4)'
  ],
  listing_images: ['preview/listing-images/01-cover.png', 'preview/listing-images/02-whats-inside.png', 'preview/listing-images/03-ages-0-5-cards.png', 'preview/listing-images/04-ages-5-12-cards.png', 'preview/listing-images/05-six-chart-layouts.png', 'preview/listing-images/06-in-use-bedtime-chart.png', 'preview/listing-images/07-play-first-screens-later.png', 'preview/listing-images/08-four-colorways.png', 'preview/listing-images/09-editable-make-it-yours.png', 'preview/listing-images/10-how-to-use-sizes-formats.png'],
  next_products: ['play-first-family-kit', 'im-bored-play-cards', 'toddler-busy-book'],
  starter_tier: { listing: 'listing-starter.json', price_usd: 4.50, cards: 60 },
  ...common,
  human_todo: [
    'Rewrite the welcome page text (build/build.js, marked FOUNDER-EDIT) and the talk tips in your own words, and pick or reorder any cards you want changed; commit each draft so your authorship is provable (brand/BRAND.md "Human authorship")',
    'Build the free bonus at playbeforepixels.com/bonus/visual-routine-cards (seasonal routine cards: holidays, back to school, travel day) with an email form that asks only for birth month and year; the QR code on the last page already points there',
    'Print one page of cards and one chart on your own printer in both Letter and A4 at 100%, and measure the 2.2 in size-check square on page 6',
    'Open the editable PDF in Adobe Acrobat Reader on a computer and on a phone, type a label and a checklist job, save, reopen and print',
    'Import a few PNGs into a free Canva account to confirm the README steps',
    'Create the Etsy listing: digital item, the 5 files in etsy_files, the 10 listing images in order, the title, 13 etsy_tags and description; set the $9.50 price with a 30–40% sale; recheck competitor prices on the live pages [VERIFY]',
    'Create the $4.50 Starter Set listing from listing-starter.json and link the two listings to each other',
    'Log the product in legal/protection/creation-records-log.md'
  ]
};
const starter = {
  slug: 'visual-routine-cards-starter',
  title: '60 Visual Routine Cards for Toddlers, Morning & Bedtime Routine Chart, First Then Board, Daily Schedule Printable PDF',
  subtitle: '60 picture cards for ages 0–5 plus 3 charts. Helps little ones see what comes next.',
  format: `Digital download (2 files): Starter Set PDF, US Letter (${m.letter.starter} pages) and A4 (${m.a4.starter} pages).`,
  trim: 'US Letter 8.5 x 11 in and A4 210 x 297 mm, 0.5 in margins, no bleed. Every card is 2.2 x 2.2 in (5.6 cm).',
  pages: m.letter.starter,
  ages: '0–5',
  price_usd: 4.50,
  price_notes: 'Entry tier of the routine-cards ladder at $4.50 (marketing/DEMAND-CHECK.md section 1). Keep it undiscounted or run the same sale as the Complete Set; the listing and the PDF both point buyers to the $9.50 Complete Set.',
  short_description: '60 printable picture cards for ages 0–5, plus a strip, a first–then board and a morning chart. Letter + A4. Helps little ones see what comes next.',
  long_description: 'A simple place to start. These 60 printable picture cards cover the moments that fill a little one\'s day: waking up, potty, getting dressed, meals, play, outside time, reading together, bath, bedtime, helping jobs, a feelings check-in and plan words like First, Then and Wait. A "Play first / Screens later" pair uses a plain, generic tablet, with no brands and no apps.\n\nUse one card at a time with a baby, two on the first–then board with a toddler, or a morning chart of up to nine steps with a preschooler. Your child points to each picture and moves it to "All done."\n\nYou get the cards in the color-coded Rainbow look and an ink-saving Simple version, plus three charts: a vertical strip, a first–then board and a morning chart. A one-page guide covers how to use the cards by age, easy talk tips, and laminating, velcro and safety tips. Every card is 2.2 in (5.6 cm), sized for little hands, in US Letter and A4.\n\nWant more? The Complete Set has 228 cards for ages 0–12, 6 chart layouts, 4 colorways, editable files and Canva-ready PNGs.\n\nInstant digital download. No physical item ships.',
  bullets: [
    '60 picture cards for ages 0–5: morning, meals, play, outside, reading, bath, bedtime, helping jobs, feelings and plan words',
    'Includes a Play first / Screens later card pair with a plain, generic tablet',
    '3 charts: vertical strip, first–then board and a 9-step morning chart',
    'Rainbow and ink-saving Simple versions, US Letter and A4, every card 2.2 in (5.6 cm)',
    'One-page guide: use by age, talk tips, laminating, velcro and safety'
  ],
  keywords: ['toddler routine cards', 'visual routine cards', 'first then board', 'morning routine chart', 'bedtime routine chart', 'toddler daily schedule', 'preschool routine printable'],
  etsy_tags: ['toddler routine', 'visual routine cards', 'first then board', 'morning routine', 'bedtime routine', 'toddler schedule', 'preschool printable', 'routine chart', 'daily schedule kids', 'toddler printable', 'visual schedule', 'potty routine', 'kids routine cards'],
  seo_title: '60 Visual Routine Cards for Toddlers | Play Before Pixels',
  seo_description: '60 printable routine cards for toddlers and preschoolers plus a first–then board and morning chart. Letter and A4. Helps little ones see what comes next.',
  alt_text: 'Cover of the 60 Visual Routine Cards Starter Set: sky-blue panel with the title and a vertical strip chart holding Brush teeth, Get dressed, Shoes on and Play first cards.',
  channels: ['Etsy (digital download listing)', 'Play Before Pixels website shop (instant digital download)'],
  etsy_files: ['visual-routine-cards-starter-letter.pdf', 'visual-routine-cards-starter-a4.pdf'],
  listing_images: ['preview/listing-images/starter/01-starter-cover.png', 'preview/listing-images/starter/02-starter-whats-inside.png', 'preview/listing-images/starter/03-starter-vs-complete.png', 'preview/listing-images/06-in-use-bedtime-chart.png'],
  next_products: ['visual-routine-cards', 'play-first-family-kit', 'im-bored-play-cards'],
  ...common,
  human_todo: [
    'Create the Etsy listing with the 2 files and the 4 listing images in listing_images',
    'Link it to the Complete Set listing in the description and the shop section',
    'Same print and size check as the Complete Set'
  ]
};
for (const [f, o] of [['listing.json', full], ['listing-starter.json', starter]]) {
  if (o.short_description.length > 160) throw new Error(f + ' short_description ' + o.short_description.length);
  if (o.seo_title.length > 60) throw new Error(f + ' seo_title ' + o.seo_title.length);
  if (o.seo_description.length > 155) throw new Error(f + ' seo_description ' + o.seo_description.length);
  const w = words(o.long_description); if (w < 120 || w > 250) throw new Error(f + ' long_description words ' + w);
  if (o.title.length > 140) throw new Error(f + ' title ' + o.title.length);
  o.etsy_tags.forEach(t => { if (t.length > 20) throw new Error('tag too long ' + t); });
  fs.writeFileSync(path.join(__dirname, '..', f), JSON.stringify(o, null, 2) + '\n');
  console.log(f, 'ok', 'words', w, 'title', o.title.length);
}
