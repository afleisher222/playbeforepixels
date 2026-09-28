// Ages 1–5 Instant Gift Bundle: the bundle's own pages (cover, what's inside, gift-reveal fold card, reveal
// cards, last page) and START HERE. The four parts and the free coupon set are NOT copied: zip-config.json
// names their files and shared/manifest.py writes ../zip-manifest.json for the upload-packet step.
//   bash make.sh
'use strict';
const { make } = require('./shared/bundle.js');

const B = {
  slug: 'bundle-gift-1-5',
  product: 'Ages 1–5 Instant Gift Bundle',
  kicker: 'Printable gift bundle · Ages 1–5',
  titleHtml: 'Ages 1–5<br><em>Instant Gift</em><br>Bundle',
  titleSize: 64,
  lede: 'Four printable play sets and a book of play coupons, in one download. Print what you need, when you need it.',
  bg: '#E3EEFA',
  parts: [
    { art: 'binder', color: 'plum', name: 'Toddler Busy Book', title: 'Toddler Busy Book', count: '74 activities', ages: 'Ages 1–5',
      what: 'Matching, colors, shapes, pretend play and mazes, in a binder you build once and use again and again.',
      begin: 'Its START HERE, then the pages for your child’s band: 1–2, 2–3 or 3–5.', folder: 'Toddler-Busy-Book folder', zip: 'Toddler-Busy-Book' },
    { art: 'checklist', color: 'grass', name: 'Play-First Family Kit', title: 'Play-First Family Kit', count: 'includes the ages 2–5 pages', ages: 'Ages 2–5',
      what: 'A picture checklist, helping jobs and a play board that make play an easy, expected part of the day.',
      begin: 'Its START HERE, then the ages 2–5 picture checklist.', folder: 'Play-First-Family-Kit folder', zip: 'Play-First-Family-Kit' },
    { art: 'cards', color: 'sun', name: '“I’m Bored” Play Cards', title: 'I’m Bored Play Cards', count: '76 cards for ages 1–5', ages: 'Ages 1–3 and 3–5',
      what: 'Play ideas sorted by age and energy, each with what you need, a talk line and a safety line. Keep them in a jar.',
      begin: 'The 1–3 or 3–5 card sheets. No time to cut? Pick from the card index.', folder: 'Bored-Play-Cards folder', zip: 'Bored-Play-Cards' },
    { art: 'talkcard', color: 'tomato', name: '52 Play & Talk Cards', title: 'Play and Talk Cards', count: '52 cards', ages: 'Ages 0–5',
      what: 'One play and one talk tip on every card: a card a week for a year, sorted into four age bands.',
      begin: 'This week’s card on the fridge. Swap it next week.', folder: 'Play-and-Talk-Cards folder', zip: 'Play-and-Talk-Cards' },
  ],
  free: { art: 'gift', name: 'Play Coupons and gift-reveal cards', title: 'Play Coupons', short: 'Free: 16 play coupons',
    count: '16 coupons', ages: 'Ages 1–5', what: '16 play coupons, blank coupons and a coupon-book cover: plays to give as a promise to play together.',
    begin: 'Pages 3–7: fold card, reveal cards and coupons.', folder: 'Play-Coupons folder', zip: 'Play-Coupons' },
  ownZip: 'Gift-Pages',
  insideTitle: 'Four play sets and a book of play coupons',
  insideLede: 'Everything here is printable and made for ages 1–5, with a grown-up. Each set has its own START HERE page, so you never need to read everything at once.',
  firstWeek: [
    'Day 1: put this week’s Play & Talk card on the fridge.',
    'Day 2: print the busy book pages for your child’s band and build the binder.',
    'Day 3: cut the “I’m Bored” cards for your child’s age into a jar.',
    'Day 5: hang the family kit’s picture checklist.',
    'Any day: hand over a play coupon.',
  ],
  fold: { kicker: 'A gift for you', title: 'A gift<br>of play', sub: 'Four printable play sets for ages 1–5, plus play coupons.', icons: ['binder', 'checklist', 'cards', 'talkcard'], backLine: 'Printable play for ages 1–5' },
  revealTitle: 'Inside is…',
  startLede: 'Four printable play sets for ages 1–5 and a free book of play coupons. Open the gift pages first, then each set’s own START HERE.',
  next: [
    ['book100', 'plum', 'Birth-to-5 Printable Library', 'This bundle plus the visual routine cards and 100 Screen-Free Plays, for every stage from birth to 5.'],
    ['snowflake', 'sky', '24 Days of Play: Winter Countdown', 'One easy winter play a day for ages 2–5, from things you already have.'],
    ['routine', 'grass', 'Visual Routine Cards', 'Picture cards for mornings, meals, play and bedtime.'],
  ],
  subject: 'Printable gift bundle for ages 1-5: toddler busy book, family kit pages, bored play cards, play and talk cards, and free play coupons',
  keywords: 'printable gift bundle, toddler activities, busy book, play cards, play coupons',
};
make(B, __dirname);
