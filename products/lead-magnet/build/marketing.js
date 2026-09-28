// Five 5-Minute Plays: the sign-up page hero (2000 x 2000) and the website mockup (1600 x 1200).
// Store/email edition pages are used: this file is only ever shown on our own site and email platform.
'use strict';
const path = require('path');
const fs = require('fs');
const M = require('../../bundle-gift-1-5/build/shared/marketing.js');
const { C } = require('../../bundle-gift-1-5/build/shared/kit.js');
const PDIR = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, 'tmp', 'mk');
const S = n => `products/lead-magnet/preview/p${String(n).padStart(2, '0')}.png`;
fs.mkdirSync(path.join(PDIR, 'preview', 'listing-images'), { recursive: true });
const list = [
  { name: 'signup-hero', out: path.join(PDIR, 'preview', 'listing-images', 'signup-hero.png'), html: M.hero({ outDir: OUT, bg: C.tGrass, kicker: 'Free printable · Ages 0–5',
    title: 'Five 5-Minute Plays', titleSize: 140, sub: 'Five little plays with things you already have, each one growing with your child from birth to five.',
    pages: [S(1), S(5), S(6)], chips: ['Free', 'Nothing to buy'] }) },
  { name: 'mockup', out: path.join(PDIR, 'mockup.png'), w: 1600, h: 1200, html: M.mockup({ outDir: OUT, pages: [S(1), S(3), S(2)], tag: 'Free · five plays for ages 0–5' }) },
];
fs.writeFileSync(path.join(__dirname, 'tmp', 'mk-jobs.json'), JSON.stringify(M.jobs(OUT, list), null, 1));
console.log(`wrote ${list.length} image jobs`);
