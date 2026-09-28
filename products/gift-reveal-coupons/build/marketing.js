// Gift-Reveal Cards and Play Coupons store images: 5 listing images (Etsy-edition pages, no web address),
// mockup.png (1600 x 1200). Run after the PDFs are rendered (make.sh does both).
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
const E = n => `products/gift-reveal-coupons/build/tmp/etsy-color/p${String(n).padStart(2, '0')}.png`;
const L = n => `products/gift-reveal-coupons/build/tmp/etsy-lowink/p${String(n).padStart(2, '0')}.png`;
const S = n => `products/gift-reveal-coupons/preview/p${String(n).padStart(2, '0')}.png`;
const o = OUT;
const list = [
  { name: 'listing-01', out: path.join(LI, 'listing-01.png'), html: M.hero({ outDir: o, bg: C.tTomato, kicker: 'Printable gift add-on · Ages 1–5',
    title: '16 Play Coupons<br><span style="color:#B83A1C">+ gift-reveal cards</span>', titleSize: 130,
    sub: 'Give time together: a blanket fort, a kitchen dance party, one extra story.', pages: [E(5), E(3), E(6)],
    chips: ['16 coupons', `${NOBUY} need nothing to buy`] }) },
  { name: 'listing-02', out: path.join(LI, 'listing-02.png'), html: M.grid({ outDir: o, kicker: 'What’s inside · 11 pages', title: 'Everything to give a gift of play', items: [
    { img: E(3), label: 'Fold card' }, { img: E(4), label: '2 reveal cards' }, { img: E(5), label: 'Coupons 1–8' },
    { img: E(6), label: 'Coupons 9–16' }, { img: E(7), label: '7 blank + a cover' }, { img: E(8), label: 'Coupon key' }] }) },
  { name: 'listing-03', out: path.join(LI, 'listing-03.png'), html: M.feature({ outDir: o, kicker: 'Every coupon', title: 'A promise to play, not a thing to buy',
    img: E(5), points: ['A starting age in months and an age label in words', 'One line of how, and one thing to say while you play',
      'Easier, harder and 2-minute versions in the coupon key', 'Its own safety line, and always “With a grown-up”'] }) },
  { name: 'listing-04', out: path.join(LI, 'listing-04.png'), html: M.feature({ outDir: o, bg: C.tSky, kicker: 'Make it a surprise', title: 'Fold card and reveal cards',
    img: E(3), img2: E(4), points: ['Tuck the coupons in with any gift, or give them on their own', 'Type the For and From lines, or write them by hand',
      'Straight-line cuts, about 10 minutes', 'Coupons never expire and are never traded for screen time'] }) },
  { name: 'listing-05', out: path.join(LI, 'listing-05.png'), html: M.formats({ outDir: o, title: 'Color and low-ink, Letter and A4',
    color: E(6), lowink: L(6), files: [['1 · START HERE', 'One page: what to print first'], ['2 · Color, US Letter', '11 pages'], ['3 · Color, A4', '11 pages'],
      ['4 · Low-ink, US Letter', 'White pages, line art to color'], ['5 · Low-ink, A4', 'White pages, line art to color']],
    note: 'A digital download: nothing ships. Print at home at 100%. Free inside our Ages 1–5 Gift Bundle and Birth-to-5 Library.' }) },
  { name: 'mockup', out: path.join(PDIR, 'mockup.png'), w: 1600, h: 1200, html: M.mockup({ outDir: o, pages: [S(1), S(5), S(3)], tag: '16 play coupons · ages 1–5' }) },
];
fs.writeFileSync(path.join(__dirname, 'tmp', 'mk-jobs.json'), JSON.stringify(M.jobs(OUT, list), null, 1));
console.log(`wrote ${list.length} image jobs`);
