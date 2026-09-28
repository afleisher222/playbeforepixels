// Winter Countdown store images: 6 listing images (2000 x 2000, Etsy-edition pages, no web address),
// the website mockup (1600 x 1200) and cover.png (1600 px long side). Run after the PDFs are rendered:
//   node marketing.js && node ../../bundle-gift-1-5/build/shared/render.js tmp/mk-jobs.json
'use strict';
const path = require('path');
const fs = require('fs');
const M = require('../../bundle-gift-1-5/build/shared/marketing.js');
const { C } = require('../../bundle-gift-1-5/build/shared/kit.js');
const { NOBUY } = require('./content.js');

const PDIR = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, 'tmp', 'mk');
const LI = path.join(PDIR, 'preview', 'listing-images');
fs.mkdirSync(LI, { recursive: true });
const E = n => `products/winter-countdown/build/tmp/etsy-color/p${String(n).padStart(2, '0')}.png`;
const L = n => `products/winter-countdown/build/tmp/etsy-lowink/p${String(n).padStart(2, '0')}.png`;
const S = n => `products/winter-countdown/preview/p${String(n).padStart(2, '0')}.png`;
const o = OUT;
const list = [
  { name: 'listing-01', out: path.join(LI, 'listing-01.png'), html: M.hero({ outDir: o, kicker: 'Printable winter countdown · Ages 2–5',
    title: '24 Days of Play<br><span style="color:#1E5FAA">Winter Countdown</span>', titleSize: 140,
    sub: 'One easy play a day for 24 winter days, made from things you already have.', pages: [E(1), E(9), E(6)],
    chips: ['24 plays', `${NOBUY} need nothing to buy`] }) },
  { name: 'listing-02', out: path.join(LI, 'listing-02.png'), html: M.grid({ outDir: o, kicker: 'What’s inside · 25 pages',
    title: 'Everything for 24 winter days', items: [
      { img: E(2), label: '2-page grown-up guide' }, { img: E(4), label: 'Safety rules' }, { img: E(6), label: 'Countdown board' },
      { img: E(9), label: '24 play cards' }, { img: E(21), label: '24 number tags' }, { img: E(23), label: 'Fridge certificate' }] }) },
  { name: 'listing-03', out: path.join(LI, 'listing-03.png'), html: M.feature({ outDir: o, kicker: 'Every play card', title: 'Short steps, one talk line, one safety line',
    img: E(13), points: ['Starting age in months, with an age label in words', 'Prep, mess and play time at a glance',
      'Make it easier, make it harder, and a 2-minute version for tired days', 'Its own safety line, and always “With a grown-up”'] }) },
  { name: 'listing-04', out: path.join(LI, 'listing-04.png'), html: M.feature({ outDir: o, bg: C.tSky, kicker: 'Three ways to use it', title: 'A card a day, the board, or pick and choose',
    img: E(6), img2: E(7), points: ['Hang the board and color a circle after each play', 'No time to cut? Read each day from the list page',
      'A blank board to write or type your own plays', 'Start any day. Skip, swap or repeat days'] }) },
  { name: 'listing-05', out: path.join(LI, 'listing-05.png'), html: M.formats({ outDir: o, title: 'Color and low-ink, Letter and A4',
    color: E(9), lowink: L(9), files: [['1 · START HERE', 'One page: what to print first'], ['2 · Color, US Letter', '25 pages'], ['3 · Color, A4', '25 pages'],
      ['4 · Low-ink, US Letter', 'White pages, line art to color'], ['5 · Low-ink, A4', 'White pages, line art to color']],
    note: 'A digital download: nothing ships. Print at home at 100%. Type in the blank board and certificate in a free PDF reader.' }) },
  { name: 'listing-06', out: path.join(LI, 'listing-06.png'), html: M.feature({ outDir: o, bg: C.tGrass, kicker: 'For any family', title: 'Snow, cozy days and long nights',
    img: E(8), points: ['A winter countdown, not tied to any holiday or faith', 'Count down to a break, a trip, a birthday or nothing at all',
      `${NOBUY} of 24 plays use only things most homes have`, 'Every play follows our published safety rules'] }) },
  { name: 'mockup', out: path.join(PDIR, 'mockup.png'), w: 1600, h: 1200, html: M.mockup({ outDir: o, pages: [S(1), S(9), S(6)], tag: '24 winter plays · ages 2–5' }) },
];
fs.writeFileSync(path.join(__dirname, 'tmp', 'mk-jobs.json'), JSON.stringify(M.jobs(OUT, list), null, 1));
console.log(`wrote ${list.length} image jobs`);
