// Birth-to-5 Printable Library: the bundle's own pages and START HERE. Six parts and the included coupon set are
// NOT copied: zip-config.json names their files and the shared manifest writes ../zip-manifest.json.
//   bash make.sh
'use strict';
const { make } = require('../../bundle-gift-1-5/build/shared/bundle.js');

const B = {
  slug: 'bundle-library-0-5',
  product: 'Birth-to-5 Printable Library',
  kicker: 'Printable library · Birth to 5',
  titleHtml: 'Birth-to-5<br><em>Printable</em><br>Library',
  titleSize: 64,
  lede: 'Six printable play sets for every stage from birth to 5, plus a book of play coupons, in one download.',
  bg: '#EFE6FA',
  parts: [
    { art: 'book100', color: 'plum', name: '100 Screen-Free Plays', title: '100 Screen-Free Plays', count: '100 plays', ages: 'Ages 0–5',
      what: 'A quick play for every age and every moment of an ordinary day, from first smiles to five, sorted by stage.',
      begin: 'Its START HERE, then the pages for your child’s stage.', folder: '100-Screen-Free-Plays folder', zip: '100-Screen-Free-Plays' },
    { art: 'talkcard', color: 'tomato', name: '52 Play & Talk Cards', title: 'Play and Talk Cards', count: '52 cards', ages: 'Ages 0–5',
      what: 'One play and one talk tip on every card: a card a week for a year, in four age bands.',
      begin: 'This week’s card on the fridge.', folder: 'Play-and-Talk-Cards folder', zip: 'Play-and-Talk-Cards' },
    { art: 'routine', color: 'sky', name: 'Visual Routine Cards', title: 'Visual Routine Cards', count: 'includes the ages 0–5 cards', ages: 'Ages 0–5',
      what: 'Picture cards and charts for mornings, meals, play and bedtime, with blank and word-free cards.',
      begin: 'Its START HERE, then one routine you use every day.', folder: 'Visual-Routine-Cards folder', zip: 'Visual-Routine-Cards' },
    { art: 'binder', color: 'grass', name: 'Toddler Busy Book', title: 'Toddler Busy Book', count: '74 activities', ages: 'Ages 1–5',
      what: 'Matching, colors, shapes, pretend play and mazes, in a binder you build once.',
      begin: 'The pages for your child’s band: 1–2, 2–3 or 3–5.', folder: 'Toddler-Busy-Book folder', zip: 'Toddler-Busy-Book' },
    { art: 'cards', color: 'sun', name: '“I’m Bored” Play Cards', title: 'I’m Bored Play Cards', count: '76 cards for ages 1–5', ages: 'Ages 1–5',
      what: 'Play ideas sorted by age and energy, with a talk line and a safety line on every card.',
      begin: 'The 1–3 or 3–5 card sheets, or the card index.', folder: 'Bored-Play-Cards folder', zip: 'Bored-Play-Cards' },
    { art: 'checklist', color: 'plum', name: 'Play-First Family Kit', title: 'Play-First Family Kit', count: 'includes the ages 2–5 pages', ages: 'Ages 2–5',
      what: 'A picture checklist, helping jobs and a play board that make play an expected part of the day.',
      begin: 'The ages 2–5 picture checklist.', folder: 'Play-First-Family-Kit folder', zip: 'Play-First-Family-Kit' },
  ],
  free: { art: 'gift', name: 'Play Coupons and gift-reveal cards', title: 'Play Coupons', short: 'Plus 16 play coupons',
    count: '16 coupons', ages: 'Ages 1–5', what: '16 play coupons, blank coupons and a coupon-book cover.',
    begin: 'Pages 3–7.', folder: 'Play-Coupons folder', zip: 'Play-Coupons' },
  ownZip: 'Library-Pages',
  insideTitle: 'Six play sets, birth to 5',
  insideLede: 'Everything is printable and made for a child and a grown-up together. Start with the set for your child’s age today; the rest waits until you need it.',
  firstWeek: [
    'Under 1: open 100 Screen-Free Plays at the first stage and the 0–1 Play & Talk cards.',
    'Ages 1–2: add one routine chart and the busy book’s 1–2 pages.',
    'Ages 2–5: add the bored-card jar and the family kit checklist.',
    'Every week: one Play & Talk card on the fridge.',
  ],
  fold: { kicker: 'A gift for you', title: 'A gift<br>of play', sub: 'Six printable play sets for every stage from birth to 5.', icons: ['book100', 'talkcard', 'routine', 'binder'], backLine: 'Printable play from birth to 5' },
  revealTitle: 'Inside is…',
  startLede: 'Six printable play sets for every stage from birth to 5, and a book of play coupons, all included. Open the library pages first, then each set’s own START HERE.',
  next: [
    ['snowflake', 'sky', '24 Days of Play: Winter Countdown', 'One easy winter play a day for ages 2–5.'],
    ['gift', 'tomato', 'Play Coupons and gift-reveal cards', 'Already inside this library: give a coupon any day.'],
    ['heart', 'grass', 'Five 5-Minute Plays (free)', 'A free printable and a monthly email with 3 plays for your child’s age.'],
  ],
  subject: 'Printable library for ages 0-5: 100 screen-free plays, play and talk cards, routine cards, busy book, bored cards, family kit and play coupons',
  keywords: 'printable library, baby and toddler activities, play cards, routine cards, busy book',
};
make(B, __dirname);
