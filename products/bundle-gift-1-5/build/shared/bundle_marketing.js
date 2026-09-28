// Store images for a bundle (5 listing images + mockup), from the bundle's own Etsy-edition pages only:
// the parts' cover images carry a web address, so they are never used in Etsy images (COMPLIANCE-GATE 16).
'use strict';
const path = require('path');
const fs = require('fs');
const M = require('./marketing.js');
const { C } = require('./kit.js');

function run(o) {
  // o: { slug, buildDir, kicker, titleHtml, sub, chips, items (parts [name,count]), note, tag, bg }
  const PDIR = path.resolve(o.buildDir, '..');
  const OUT = path.join(o.buildDir, 'tmp', 'mk');
  const LI = path.join(PDIR, 'preview', 'listing-images');
  fs.mkdirSync(LI, { recursive: true });
  const E = n => `products/${o.slug}/build/tmp/etsy-color/p${String(n).padStart(2, '0')}.png`;
  const L = n => `products/${o.slug}/build/tmp/etsy-lowink/p${String(n).padStart(2, '0')}.png`;
  const S = n => `products/${o.slug}/preview/p${String(n).padStart(2, '0')}.png`;
  const SH = `products/${o.slug}/preview/start-here-etsy/p01.png`;
  const list = [
    { name: 'listing-01', out: path.join(LI, 'listing-01.png'), html: M.hero({ outDir: OUT, bg: o.bg || C.tSky, kicker: o.kicker, title: o.titleHtml, titleSize: 128,
      sub: o.sub, pages: [E(1), E(2), E(3)], chips: o.chips }) },
    { name: 'listing-02', out: path.join(LI, 'listing-02.png'), html: M.feature({ outDir: OUT, bg: C.wash, kicker: 'What’s inside', title: o.insideTitle,
      img: E(2), points: o.items.map(([n, c]) => `<b>${n}</b><br><span style="font-weight:600">${c}</span>`) }) },
    { name: 'listing-03', out: path.join(LI, 'listing-03.png'), html: M.feature({ outDir: OUT, kicker: 'Ready to give', title: 'A fold card and reveal cards inside',
      img: E(3), img2: E(4), points: ['Print the fold card, write your message inside', '“Surprise! Inside is…” cards list every set', 'Or forward the download: the license passes to the family', 'Also inside: 16 play coupons'] }) },
    { name: 'listing-04', out: path.join(LI, 'listing-04.png'), html: M.formats({ outDir: OUT, title: 'One download, every format',
      color: E(1), lowink: L(1), files: o.files, note: o.note }) },
    { name: 'listing-05', out: path.join(LI, 'listing-05.png'), html: M.grid({ outDir: OUT, kicker: 'Gift pages', title: 'Start here, then open any set', cols: 3, items: [
      { img: SH, label: 'START HERE' }, { img: E(1), label: 'Bundle cover' }, { img: E(2), label: 'What’s inside' },
      { img: E(3), label: 'Fold card' }, { img: E(4), label: 'Reveal cards' }, { img: E(5), label: 'What’s next' }] }) },
    { name: 'mockup', out: path.join(PDIR, 'mockup.png'), w: 1600, h: 1200, html: M.mockup({ outDir: OUT, pages: [S(1), S(2), S(3)], tag: o.tag }) },
  ];
  fs.writeFileSync(path.join(o.buildDir, 'tmp', 'mk-jobs.json'), JSON.stringify(M.jobs(OUT, list), null, 1));
  console.log(`wrote ${list.length} image jobs`);
}
module.exports = { run };
