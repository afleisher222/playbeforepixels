// Build script for "More Talk, Less Tap" (Play Before Pixels).
// node build/build.js  -> writes ../source.html, cover.html, mockup.html
// Page = 8.75 x 8.75 in (8.5 in trim + 0.125 in bleed) = 840 x 840 CSS px. Trim coords 0..816, bleed -12..828.
// Safe zone: 36 px (0.375 in) inside trim. Spreads are drawn in spread coords 0..1632 (gutter at 816).
const fs = require('fs');
const path = require('path');
const A = require('./art.js');
const { C, R, Ci, E, P, L, U, G, SYMBOLS, kid, kidAt, teacher, teacherAt, tower, blk, motion, windowRain, shelf, paperFish, table } = A;
const OUT = path.resolve(__dirname, '..');
const GUIDES = process.env.GUIDES === '1';
// Bonus read-aloud edition (September 2026): the book is cut as a retail title and ships as a bonus PDF
// inside the Talk Tower Classroom Game Kit. %BR% is replaced with the relative path to /brand at write time.
const WORDS = require('../../build/words.js');   // founder-editable text lives in ../../WORDS.md
const QR = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../qr.json'), 'utf8'));
const qrSvg = (px) => `<svg viewBox="-2 -2 ${QR.n + 4} ${QR.n + 4}" width="${px}" height="${px}" shape-rendering="crispEdges"><rect x="-2" y="-2" width="${QR.n + 4}" height="${QR.n + 4}" fill="#fff"/><path d="${QR.d}" fill="#1D2940"/></svg>`;
const LOGO = (file, h) => `<img src="%BR%logo/${file}" alt="Play Before Pixels" style="height:${h}px;display:block">`;
const founderBox = (label, hint) => `<div class="fbox"><b>${label}</b><br>${hint}</div>`;

const pages = [];
// text item: [x, y, w, html, cls, style]
function T(x, y, w, html, cls = 'story', style = '') { return { x, y, w, html, cls, style }; }
function renderTexts(texts, dx) {
  return texts.map(t => `<div class="${t.cls}" style="left:${t.x - dx + 12}px;top:${t.y + 12}px;${t.w ? `width:${t.w}px;` : ''}${t.style}">${t.html}</div>`).join('\n');
}
function guides(vx) {
  if (!GUIDES) return '';
  const x0 = vx + 12;
  return `<rect x="${x0}" y="0" width="816" height="816" fill="none" stroke="#f0f" stroke-width="1.5"/><rect x="${x0 + 36}" y="36" width="744" height="744" fill="none" stroke="#0bf" stroke-width="1.5" stroke-dasharray="6 6"/>`;
}
function svg(vx, art) {
  return `<svg class="art" viewBox="${vx} -12 840 840" width="840" height="840" xmlns="http://www.w3.org/2000/svg">${art}${guides(vx)}</svg>`;
}
function single({ bg = C.paper, art = '', texts = [], label = '' }) {
  pages.push({ label, html: `<section class="page" style="background:${bg}">${svg(-12, R(-12, -12, 840, 840, bg) + art)}${renderTexts(texts, 0)}</section>` });
}
function spread({ bg = C.paper, art = '', texts = [], label = '' }) {
  const left = texts.filter(t => t.x < 816), right = texts.filter(t => t.x >= 816);
  const bgArt = R(-12, -12, 1656, 840, bg) + art;
  pages.push({ label: label + ' L', html: `<section class="page" style="background:${bg}">${svg(-12, bgArt)}${renderTexts(left, 0)}</section>` });
  pages.push({ label: label + ' R', html: `<section class="page" style="background:${bg}">${svg(804, bgArt)}${renderTexts(right, 816)}</section>` });
}
const floor = (y, col, x0 = -12, w = 1656) => R(x0, y, w, 900, col);
const rug = (cx, cy, rx, ry) => E(cx, cy, rx + 14, ry + 8, C.tomato) + E(cx, cy, rx, ry, C.sun);
const clack = (x, y, rot = -6, size = 88, extra = '') => T(x, y, 0, 'CLACK!', 'boom', `font-size:${size}px;transform:rotate(${rot}deg);${extra}`);
const upGoes = (x, y, col = C.ink) => T(x, y, 0, 'Up it goes!', 'chant', `color:${col}`);
const bub = (x, y, w, text, tail = 'bl', extra = '', cls = '') => T(x, y, w, text, `bub ${tail} ${cls}`, extra);
const hand = (x, y, text, rot = -4, col = C.sky, size = 40) => T(x, y, 0, text, 'hand', `transform:rotate(${rot}deg);color:${col};font-size:${size}px`);
const bursts = (x, y, r, col = C.ink, k = 6, len = 26) => { let s = ''; for (let i = 0; i < k; i++) { const a = -150 + i * (120 / (k - 1)); const rr = a * Math.PI / 180; s += A.motion(x + r * Math.cos(rr), y + r * Math.sin(rr), len, a, col, 7); } return s; };
const wallSign = (x, y, w = 230) => R(x, y, w, 64, C.paper, 12) + R(x + 18, y - 22, 12, 30, C.ink, 4) + R(x + w - 30, y - 22, 12, 30, C.ink, 4);

// =============================================================== P1 FRONT COVER
single({
  label: 'cover', bg: C.tomato,
  art: E(408, 800, 560, 150, C.paper) + E(408, 800, 520, 128, C.wash) +
    tower(600, 720, ['q', 'j', 'i', 'l', 'q'], 1.08) +
    bursts(600, 364, 40, C.paper, 5, 26) +
    kidAt('leo', 'cheer', 150, 760, 1.12, 'laugh') +
    kidAt('priya', 'sithand', 330, 790, 1.05, 'talk') +
    kidAt('zara', 'point', 470, 770, 1.0, 'talk', false) +
    kidAt('sam', 'sit', 722, 772, 0.86, 'smile', true) +
    // mini speech bubbles with the block icons
    G('translate(196 370)', P('M0 0 h96 a20 20 0 0 1 20 20 v48 a20 20 0 0 1 -20 20 h-54 l-22 22 l2 -22 h-22 a20 20 0 0 1 -20 -20 v-48 a20 20 0 0 1 20 -20Z', C.paper) + A.TX(48, 66, '?', 58, C.sky)) +
    G('translate(360 460)', P('M0 0 h96 a20 20 0 0 1 20 20 v48 a20 20 0 0 1 -20 20 h-22 l2 22 l-22 -22 h-54 a20 20 0 0 1 -20 -20 v-48 a20 20 0 0 1 20 -20Z', C.paper) + A.TX(48, 62, 'ha!', 40, C.ink)),
  texts: [
    T(52, 40, 400, LOGO('lockup-horizontal-white.svg', 44), ''),
    T(48, 104, 560, 'More Talk,<br>Less Tap', 'covertitle'),
    T(52, 318, 560, 'A Talk Tower story for circle time', 'coversub'),
    T(612, 60, 150, 'Circle-time<br>talk games<br>inside!', 'badge'),
  ],
});

// =============================================================== P2 ENDPAPER
(function () {
  let art = '';
  const types = ['q', 'j', 'i', 'l'];
  let k = 0;
  for (let r = 0; r < 7; r++) for (let c = 0; c < 6; c++) {
    const x = 20 + c * 140 + (r % 2) * 70, y = 20 + r * 124;
    const rot = [-12, 8, -4, 14, -8, 4][(r + c) % 6];
    art += blk(types[k++ % 4], x, y, 0.8, rot);
  }
  art += R(158, 258, 500, 300, C.paper, 28);
  single({
    label: 'endpaper', bg: C.tSky, art,
    texts: [T(198, 300, 420, 'This book lives in', 'plate'), T(198, 404, 420, '', 'plateline'), T(198, 490, 420, '', 'plateline')],
  });
})();

// =============================================================== P3 TITLE
single({
  label: 'title', bg: C.paper,
  art: tower(408, 676, ['q', 'j', 'i', 'l'], 0.94) + E(408, 686, 190, 20, C.wash) +
    kidAt('priya', 'cheer', 250, 686, 0.86, 'laugh') + kidAt('sam', 'stand', 566, 686, 0.86, 'smile', true),
  texts: [
    T(60, 90, 696, 'More Talk, Less Tap', 'title', ''),
    T(60, 196, 696, 'A Talk Tower story for circle time', 'titlesub'),
    T(60, 238, 696, WORDS.one('story-author') ? `<div class="byline">${WORDS.one('story-author')}</div>` : founderBox('FOUNDER: your author line', 'Write it in WORDS.md, section “story-author”. This box disappears once filled.'), 'titleslot'),
    T(318, 722, 180, LOGO('lockup-horizontal.svg', 48), ''),
  ],
});

// =============================================================== P4 COPYRIGHT
single({
  label: 'copyright', bg: C.paper,
  art: blk('q', 90, 120, 0.6, -6) + blk('j', 150, 116, 0.6, 5) + blk('i', 210, 122, 0.6, -3) + blk('l', 270, 118, 0.6, 6),
  texts: [T(60, 190, 696, `
<p><b>More Talk, Less Tap</b><br>Bonus read-aloud edition, included with the Talk Tower Classroom Game Kit</p>
<p>Text and illustrations © 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC. All rights reserved.</p>
<p>This PDF is licensed with the kit: one classroom (single-classroom license) or one school site (site license). You may print it and project it for the children you teach. Please do not share, post or upload the file. Reading it aloud to your class or family is always welcome. Full terms: playbeforepixels.com/license</p>
<p>This is a work of fiction. Room 5, Ms. Poppy and the children are imaginary and are not based on any real school, teacher or child. The games and notes at the back are general ideas for grown-ups to enjoy with children; they are not a program, assessment or professional advice. Adults supervise all activities. With children under 3 nearby, use only blocks and objects too big to fit through a toilet-paper tube (about 1.25 in / 3.2 cm).</p>
<p>Published by AlphaPlay LLC, doing business as Play Before Pixels · playbeforepixels.com<br>Free bonus printable: playbeforepixels.com/bonus/picture-more-talk-less-tap</p>
<p>First edition 2026 · Version 1.0 · September 2026</p>`, 'legal'),
    T(60, 660, 330, 'ISBN / barcode<br><span>Not needed for this bonus PDF. Add one only if a print edition is ever published.</span>', 'isbnbox', 'height:auto'),
    T(420, 660, 336, WORDS.one('story-dedication') ? `<div class="dedic">${WORDS.one('story-dedication')}</div>` : founderBox('FOUNDER: your dedication', 'Your own words, in WORDS.md section “story-dedication”.'), ''),
  ],
});

// =============================================================== P5 MEET THE CLASS
(function () {
  const cast = [
    ['priya', 'Priya', 'asks the first question'],
    ['leo', 'Leo', 'knows a joke for everything'],
    ['zara', 'Zara', 'is full of ideas'],
    ['milo', 'Milo', 'always wants to know more'],
    ['sam', 'Sam', 'is a great listener'],
  ];
  let art = '';
  const texts = [T(60, 54, 696, 'Meet Room 5', 'h1', 'text-align:center')];
  const pos = [[168, 250], [408, 250], [648, 250], [168, 530], [408, 530]];
  const cols = [C.tTomato, C.tSky, C.tSun, C.tPlum, C.tGrass];
  cast.forEach(([id, name, line], i) => {
    const [x, y] = pos[i];
    art += Ci(x, y, 92, cols[i]) + `<clipPath id="cp${i}"><circle cx="${x}" cy="${y}" r="92"/></clipPath><g clip-path="url(#cp${i})">${kid(id, 'stand', x, y + 6, 1.05, 'smile')}</g>`;
    texts.push(T(x - 110, y + 104, 220, `<b>${name}</b><br>${line}`, 'castname'));
  });
  // Ms. Poppy + Bubbles
  art += Ci(648, 530, 92, C.wash) + `<clipPath id="cp6"><circle cx="648" cy="530" r="92"/></clipPath><g clip-path="url(#cp6)">${teacher('stand', 648, 548, 0.95, 'smile')}</g>`;
  texts.push(T(538, 634, 220, '<b>Ms. Poppy</b><br>is the teacher', 'castname'));
  art += G('translate(730 170) scale(0.9)', U('fish'));
  texts.push(hand(606, 116, 'and Bubbles!', -6, C.tomato, 34));
  single({ label: 'meet', bg: C.paper, art, texts });
})();

// =============================================================== STORY
// S1 p6-7 — tap, tap, tap / nobody said a word
spread({
  label: 'S1', bg: C.tSky,
  art: floor(610, C.tSun) +
    G('translate(84 300)', windowRain(360, 230)) +
    G('translate(490 470)', shelf(270, 140)) + U('bowl', 625, 470, 0.95) +
    U('bin', 250, 730, 0.8) + U('plant', 640, 770, 0.9) +
    // right page circle
    rug(1232, 716, 370, 92) +
    teacherAt('sit', 1232, 684, 1.0, 'smile') +
    kidAt('priya', 'sit', 944, 694, 0.95, 'shy') + kidAt('zara', 'sit', 1082, 680, 0.95, 'smile') +
    kidAt('leo', 'sit', 1384, 680, 0.95, 'shy', true) + kidAt('sam', 'sit', 1520, 694, 0.95, 'shy', true) +
    kidAt('milo', 'sit', 1232, 808, 0.92, 'think'),
  texts: [
    T(60, 60, 700, '<p>In Room 5, lots of things went <em>tap</em>.</p><p>Tap, tap, tap went the rain on the window.</p><p>Tap, tap went Bubbles the fish, nosing the side of his bowl.</p>'),
    hand(150, 256, 'tap!', -8), hand(360, 548, 'tap!', 6), hand(700, 290, 'tap!', -6, C.tomato),
    T(876, 60, 700, '<p>But at circle time, nobody said a word.</p><p>Not Priya. Not Leo. Not Zara, or Milo, or Sam.</p><p>Everybody was waiting for somebody else to go first.</p>'),
    bub(1300, 318, 0, '…', 'bl', 'font-size:40px;padding:4px 30px 18px'),
  ],
});

// S2 p8-9 — the bin of blocks / the rules
spread({
  label: 'S2', bg: C.tSun,
  art: floor(640, C.tTomato, -12, 840) + R(804, -12, 852, 840, C.paper) +
    teacherAt('point', 140, 740, 1.1, 'laugh') +
    G('translate(300 700)', P('M-110 -70 L40 -104 Q56 -106 56 -90 L56 90 Q56 106 40 104 L-110 70 Q-122 68 -122 56 L-122 -56 Q-122 -68 -110 -70Z', C.tomato) + E(56, 0, 26, 104, C.tomato) + E(56, 0, 16, 90, C.tTomato) + R(-90, -8, 110, 14, C.tTomato, 7)) +
    blk('q', 450, 560, 1, -24) + blk('j', 540, 650, 1, 18) + blk('i', 430, 730, 1, -8) + blk('q', 600, 520, 0.9, 40) +
    A.motion(420, 470, 40, -40, C.ink, 7) + A.motion(530, 450, 40, -70, C.ink, 7) + A.motion(650, 440, 36, -100, C.ink, 7) +
    kidAt('priya', 'sit', 670, 812, 0.9, 'wow', true) +
    // key rows
    U('blk-q', 900, 300, 1.55) + U('blk-j', 900, 460, 1.55) + U('blk-i', 900, 620, 1.55),
  texts: [
    T(60, 60, 700, '<p>So Ms. Poppy tipped out a big bin of blocks.</p>'),
    T(320, 190, 0, 'CLATTER!', 'boom', 'font-size:84px;transform:rotate(-7deg);color:' + C.tomato),
    T(876, 56, 700, '<p>“Let’s build a <b>Talk Tower</b>!” she said. “Every time someone says something out loud, a block goes on.”</p>'),
    T(1080, 306, 500, 'Ask a question', 'keyh'), T(1082, 362, 500, '<span style="background:' + C.sky + '">blue block</span>', 'keypill'),
    T(1080, 466, 500, 'Tell a joke', 'keyh'), T(1082, 522, 500, '<span style="background:' + C.sun + ';color:' + C.ink + '">yellow block</span>', 'keypill'),
    T(1080, 626, 500, 'Share an idea', 'keyh'), T(1082, 682, 500, '<span style="background:' + C.grass + '">green block</span>', 'keypill'),
  ],
});

// S3 p10-11 — Priya's question
spread({
  label: 'S3', bg: C.tPlum,
  art: floor(690, C.wash) +
    G('translate(470 540)', shelf(280, 150)) + U('bowl', 610, 540, 1.0) +
    kidAt('priya', 'sithand', 230, 790, 1.5, 'talk') +
    // right
    wallSign(1330, 290, 250) +
    teacherAt('sit', 990, 770, 1.2, 'laugh') +
    kidAt('priya', 'stand', 1200, 780, 1.2, 'laugh') +
    E(1450, 764, 96, 12, C.tPlum) + tower(1450, 760, ['q'], 1.4) + bursts(1450, 660, 44, C.ink, 5, 26),
  texts: [
    T(60, 60, 700, '<p>Priya’s hand shot up first.</p>'),
    bub(270, 236, 420, 'Why is Bubbles orange?', 'bl', 'font-size:40px;'),
    T(876, 60, 700, '<p>“That’s a question!” said Ms. Poppy.</p><p>A blue block went on the Talk Tower.</p>'),
    T(1356, 302, 200, 'Talk Tower', 'sign'),
    clack(1290, 430, -6, 84),
  ],
});

// S4 p12-13 — Leo's joke
spread({
  label: 'S4', bg: C.tSky,
  art: floor(700, C.wash) +
    kidAt('leo', 'point', 170, 790, 1.4, 'talk') +
    rug(1226, 736, 340, 76) +
    kidAt('priya', 'sit', 950, 720, 1.0, 'laugh') + kidAt('zara', 'sit', 1086, 742, 1.0, 'laugh') +
    kidAt('milo', 'sit', 1222, 720, 1.0, 'laugh') + kidAt('sam', 'sit', 1358, 742, 1.0, 'smile', true) +
    tower(1500, 750, ['q', 'j'], 1.2) + bursts(1500, 590, 42, C.ink, 5, 24),
  texts: [
    T(60, 60, 700, '<p>Then Leo had a joke.</p>'),
    bub(330, 160, 300, 'Knock, knock!', 'bl'),
    bub(456, 262, 300, 'Who’s there?', 'br', '', 'sky'),
    bub(330, 364, 300, 'Cow says.', 'bl'),
    bub(436, 466, 320, 'Cow says who?', 'br', '', 'sky'),
    bub(340, 578, 410, 'No, silly! A cow says <b>MOO!</b>', 'bl'),
    T(876, 60, 700, '<p>Room 5 laughed and laughed. Even Bubbles blew a bubble.</p><p>A yellow block went on.</p>'),
    clack(1120, 276, -5, 92), upGoes(1150, 388),
  ],
});

// S5 p14-15 — Zara's idea
spread({
  label: 'S5', bg: C.tGrass,
  art: floor(680, C.wash) +
    G('translate(60 520)', shelf(280, 160)) + U('bowl', 200, 520, 1.1) +
    kidAt('zara', 'point', 570, 790, 1.35, 'talk', true) +
    // right: gallery of paper friends, drawing table, tower
    G('translate(930 150)', A.paperFish(C.plum, -6)) + G('translate(1060 140)', A.paperFish(C.sky, 5)) + G('translate(1190 154)', A.paperFish(C.grass, -3)) +
    G('translate(1320 142)', A.paperFish(C.sun, 7)) + G('translate(1450 152)', A.paperFish(C.tomato, -5)) +
    kid('leo', 'stand', 960, 500, 1.0, 'smile') + kid('milo', 'stand', 1110, 500, 1.0, 'think') + kid('priya', 'stand', 1260, 500, 1.0, 'smile', true) +
    G('translate(880 610)', table(480, 110)) +
    R(918, 596, 84, 16, C.paper, 4) + R(1068, 596, 84, 16, C.paper, 4) + R(1218, 596, 84, 16, C.paper, 4) +
    R(1010, 592, 34, 10, C.tomato, 4, 'transform="rotate(-20 1027 597)"') + R(1160, 592, 34, 10, C.grass, 4, 'transform="rotate(15 1177 597)"') +
    tower(1510, 780, ['q', 'j', 'i'], 1.15) + bursts(1510, 552, 40, C.ink, 5, 24),
  texts: [
    T(60, 60, 700, '<p>Zara watched Bubbles swim round and round, all by himself.</p>'),
    bub(410, 236, 350, 'I have an idea! Let’s draw Bubbles some friends!', 'bl', 'font-size:30px'),
    T(876, 252, 440, '<p>“That’s an idea!” said Ms. Poppy.</p><p>A green block went on.</p>', 'story', 'font-size:30px'),
    clack(1340, 400, 6, 64),
  ],
});

// S6 p16-17 — all week long
spread({
  label: 'S6', bg: C.tSun,
  art: floor(700, C.wash) +
    kid('milo', 'carry', 190, 520, 1.05, 'talk') + G('translate(190 614) rotate(-8)', U('banana', 0, 0, 1.15)) +
    kid('leo', 'stand', 400, 520, 1.05, 'laugh') + kid('sam', 'stand', 610, 520, 1.05, 'listenL') +
    G('translate(60 642)', table(700, 110)) +
    // right: tower taller than the kids
    tower(1196, 772, ['q', 'j', 'i', 'q', 'i', 'j'], 1.12) +
    kidAt('sam', 'stand', 990, 772, 1.1, 'listen') + kidAt('priya', 'stand', 1356, 772, 1.1, 'wow', true) +
    teacherAt('stand', 1500, 772, 1.06, 'smile', true),
  texts: [
    T(60, 60, 700, '<p>All week long, Room 5 talked. At snack time. At painting time. Out in the garden.</p>'),
    bub(90, 270, 300, 'Why are bananas bendy?', 'bl', 'font-size:29px'),
    bub(420, 236, 330, 'What if worms wore tiny hats?', 'bl', 'font-size:29px'),
    T(876, 60, 700, '<p>By Wednesday, the Talk Tower was taller than everyone. Well, everyone except Ms. Poppy.</p><p>But Sam hadn’t added a block yet. Sam liked listening best.</p>', 'story', 'font-size:30px'),
  ],
});

// S7 p18-19 — all at once, CRASH
spread({
  label: 'S7', bg: C.tPlum,
  art: floor(700, C.wash) +
    kidAt('priya', 'handup', 110, 790, 1.0, 'talk') + kidAt('leo', 'point', 250, 790, 1.0, 'talk') +
    kidAt('zara', 'cheer', 400, 790, 1.0, 'talk') + kidAt('milo', 'handup', 550, 790, 1.0, 'talk', true) + kidAt('sam', 'stand', 690, 790, 0.95, 'oh', true) +
    // right: tower falling
    tower(960, 770, ['q', 'j', 'i', 'q', 'i'], 1.1, 12) +
    blk('j', 1250, 360, 1.1, 30) + blk('q', 1420, 420, 1.0, -25) + blk('i', 1130, 300, 1.0, 60) + blk('q', 1360, 290, 0.9, 15) +
    A.motion(1080, 390, 44, -150, C.ink, 7) + A.motion(1290, 290, 40, -110, C.ink, 7) + A.motion(1500, 390, 36, -50, C.ink, 7),
  texts: [
    T(60, 60, 700, '<p>Then, on Thursday, everybody had something to say.</p>'),
    T(60, 150, 0, 'ALL. AT. ONCE!', 'boom', 'font-size:74px;color:' + C.plum + ';transform:rotate(-3deg)'),
    bub(40, 300, 0, 'Me! Me!', 'bl', 'transform:rotate(-6deg)'),
    bub(220, 256, 0, 'Guess what—', 'bl', 'transform:rotate(4deg)', 'sky'),
    bub(420, 320, 0, 'My turn!', 'br', 'transform:rotate(-3deg)'),
    bub(560, 250, 0, 'Listen—', 'br', 'transform:rotate(6deg)', 'sky'),
    bub(300, 400, 0, 'I know!', 'bl', 'transform:rotate(3deg)'),
    T(876, 60, 700, '<p>The words got all tangled up. Nobody could hear anybody.</p><p>The Talk Tower went wibble… wobble…</p>'),
    T(1170, 580, 0, 'CRASH!', 'boom', 'font-size:108px;transform:rotate(-8deg)'),
  ],
});

// S8 p20-21 — quiet; Sam's idea
spread({
  label: 'S8', bg: C.tSky,
  art: floor(620, C.wash) +
    blk('q', 110, 750, 1, -20) + blk('j', 330, 776, 1, 12) + blk('i', 510, 760, 1, 40) + blk('q', 700, 736, 1, -8) + blk('i', 80, 650, 0.9, 30) +
    kidAt('priya', 'sit', 150, 690, 1.0, 'uhoh') + kidAt('leo', 'sit', 320, 680, 1.0, 'uhoh', true) + kidAt('zara', 'sit', 480, 700, 1.0, 'oh') +
    kidAt('sam', 'sit', 650, 680, 1.05, 'shy', true) +
    // right
    teacherAt('sit', 990, 770, 1.15, 'talk') +
    kidAt('sam', 'stand', 1236, 780, 1.15, 'laugh') +
    E(1430, 784, 80, 10, C.tSky) + tower(1430, 780, ['i'], 1.3) + bursts(1430, 690, 42, C.ink, 5, 24) +
    blk('q', 1540, 640, 0.8, 20) + blk('j', 1560, 740, 0.8, -12),
  texts: [
    T(60, 60, 700, '<p>Blocks everywhere. Room 5 went very, very quiet.</p><p>Then a small voice said something.</p>'),
    bub(380, 330, 350, 'Maybe… we could take turns?', 'br', 'font-size:29px'),
    T(876, 60, 700, '<p>Everyone turned to look at Sam.</p>'),
    bub(876, 150, 380, 'Sam, that’s a great idea!', 'bl', '', 'sky'),
    T(876, 290, 460, '<p>Sam’s very first block started a brand-new tower.</p>', 'story', 'font-size:30px'),
    clack(1320, 456, -6, 72),
  ],
});

// S9 p22-23 — the Talking Star
spread({
  label: 'S9', bg: C.tSun,
  art: floor(700, C.wash) + rug(400, 778, 340, 62) +
    teacherAt('sithold', 400, 780, 1.55, 'talk') + U('star', 400, 694, 1.1) +
    rug(1224, 744, 370, 76) +
    kidAt('priya', 'sit', 940, 706, 0.95, 'listen') + kidAt('leo', 'sit', 1076, 726, 0.95, 'listen') +
    kidAt('zara', 'sithold', 1224, 766, 1.05, 'talk') + U('star', 1224, 708, 0.72) +
    kidAt('milo', 'sit', 1372, 726, 0.95, 'listenL') + kidAt('sam', 'sit', 1508, 706, 0.95, 'listenL'),
  texts: [
    T(60, 60, 700, '<p>Ms. Poppy brought out the Talking Star.</p><p>“Whoever holds the star talks. Everybody else listens, with their eyes, their ears and their whole body.”</p>'),
    T(876, 60, 700, 'Pass the star.<br>Take a turn.<br>Pass the star.<br>Take a turn.', 'chantbig'),
    T(1250, 80, 0, 'CLACK!', 'boom', 'font-size:60px;transform:rotate(6deg)'),
    T(1330, 180, 0, 'CLACK!', 'boom', 'font-size:60px;transform:rotate(-5deg)'),
    T(1250, 280, 0, 'CLACK!', 'boom', 'font-size:60px;transform:rotate(4deg)'),
  ],
});

// S10 p24-25 — listening counts too
spread({
  label: 'S10', bg: C.tPlum,
  art: floor(700, C.wash) +
    kidAt('priya', 'sithold', 200, 790, 1.25, 'talk') + U('star', 200, 716, 0.8) +
    kidAt('milo', 'sit', 590, 790, 1.25, 'listenL') +
    // right
    teacherAt('sittalk', 1010, 776, 1.3, 'smile') +
    tower(1450, 770, ['i', 'q', 'j', 'i', 'q', 'l'], 1.05) + bursts(1450, 372, 42, C.ink, 5, 24),
  texts: [
    T(60, 60, 700, '<p>When it was Priya’s turn, she talked about her grandma’s garden. Milo listened to every word. Then he asked something more.</p>'),
    bub(60, 300, 360, 'My grandma grows <b>giant</b> pumpkins!', 'bl', 'font-size:29px'),
    bub(420, 400, 320, 'How do they get so big?', 'br', 'font-size:29px', 'plum'),
    T(876, 60, 700, '<p>“Milo, you were really listening,” said Ms. Poppy. “Listening counts too!”</p><p>So the tower got a brand-new color: a purple block, for good listening.</p>'),
    clack(1150, 396, -6, 72),
  ],
});

// S11 p26-27 — up, up, up / the end
spread({
  label: 'S11', bg: C.tSky,
  art: floor(700, C.wash) +
    U('clock', 130, 392, 0.85) + G('translate(56 492)', windowRain(170, 150)) +
    tower(626, 790, ['i', 'q', 'j', 'i', 'q', 'l', 'j', 'q'], 1.04) +
    U('stool', 490, 672, 1.25) + teacherAt('reach', 490, 672, 1.0, 'laugh') + blk('l', 594, 244, 0.9, -6) +
    // right
    kidAt('priya', 'cheer', 930, 790, 1.02, 'laugh', true) + kidAt('leo', 'stand', 1070, 790, 1.02, 'laugh', true) + kidAt('zara', 'cheer', 1210, 790, 1.02, 'talk', true) +
    kidAt('milo', 'handup', 1350, 790, 1.02, 'laugh', true) + kidAt('sam', 'cheer', 1490, 790, 1.02, 'laugh', true),
  texts: [
    T(60, 60, 380, '<p>Up, up, up went the Talk Tower. Past the window. Past the clock. Ms. Poppy had to stand on the step stool!</p>', 'story', 'font-size:30px'),
    T(876, 60, 700, '<p>“We built all that with our words!” said Priya.</p><p>“And our ears,” said Sam.</p>'),
    T(876, 214, 700, '<p>Tap, tap, tap went the rain. But nobody in Room 5 heard it. They were much too busy talking.</p>'),
    T(876, 396, 700, 'The End', 'theend'),
  ],
});

// =============================================================== P28 NOTE
single({
  label: 'note', bg: C.wash,
  art: blk('q', 590, 780, 0.62, -8) + blk('j', 660, 776, 0.62, 10) + blk('l', 730, 780, 0.62, -4),
  texts: [
    T(60, 56, 696, 'A note for educators and families', 'h2'),
    T(60, 130, 696, `
<p>Children get better at conversation by having lots of conversations, with grown-ups and friends who listen and talk back. Every question and answer, every joke and laugh, is a turn. <em>More Talk, Less Tap</em> makes those turns visible, and celebrates them.</p>
<p><b>Build your own Talk Tower.</b> Big blocks, paper strips on a wall or sticky notes on a door all work. Keep it a celebration, not a scoreboard: no winners, no prizes, and nobody has to talk until they are ready.</p>
<p><b>Try these at circle time</b></p>
<ul>
<li><b>Pause and wait.</b> After you ask a question, count to five in your head. Quieter children, like Sam, often need that moment.</li>
<li><b>Say what you see.</b> “You’re smiling! Do you have a joke?”</li>
<li><b>Repeat and add a little.</b> “A pumpkin!” “A giant orange pumpkin!”</li>
<li><b>Follow their lead.</b> Talk about what the child already cares about.</li>
<li><b>Count listening too.</b> A follow-up question such as “What happened next?” shows real listening.</li>
</ul>
<p>Every way of talking counts: words, signs, pointing or a tap on a talking device, in the language you know best. And when the tower falls? Build it again, one turn at a time.</p>`, 'note'),
  ],
});

// =============================================================== P29 TALK STARTERS
(function () {
  const cards = [
    ['q', C.sky, 'Questions', ['What is the best smell in the world?', 'If you were tiny, where would you go?', 'What would a dog say if it could talk?']],
    ['j', C.sun, 'Jokes', ['What do you call a sleeping dinosaur? A dino-snore!', 'Why did the teddy bear skip dessert? It was stuffed!']],
    ['i', C.grass, 'Ideas', ['Let’s make up a song about lunch.', 'Let’s build a fort for the teddy bears.', 'Let’s invent a brand-new animal.']],
    ['l', C.plum, 'Listening', ['What happened next?', 'How did that feel?', 'Can you tell me more?']],
  ];
  let art = '';
  const texts = [T(60, 54, 696, 'Talk starters for your Talk Tower', 'h2', 'text-align:center')];
  cards.forEach(([t, col, name, lines], i) => {
    const x = 60 + (i % 2) * 358, y = 170 + Math.floor(i / 2) * 306;
    art += R(x, y, 338, 286, C.paper, 22) + R(x, y, 338, 12, col, 0) + U('blk-' + t, x + 22, y + 34, 0.72);
    texts.push(T(x + 104, y + 38, 220, name, 'cardh'));
    texts.push(T(x + 24, y + 104, 296, '<ul>' + lines.map(l => `<li>${l}</li>`).join('') + '</ul>', 'cardtext'));
  });
  single({ label: 'starters', bg: C.tSun, art, texts });
})();

// =============================================================== P30-31 GAMES
(function () {
  const games = [
    { n: 1, col: C.sky, name: 'Build a Talk Tower', meta: 'Whole group · 10 minutes',
      need: 'A basket of large blocks (or paper strips and tape)',
      steps: ['Sit in a circle with the basket in the middle.', 'Each time someone asks a question, tells a joke or shares an idea out loud, they add a block.', 'A good follow-up question counts too!', 'How tall can the tower grow before tidy-up time?'] },
    { n: 2, col: C.sun, name: 'Pass the Talking Star', meta: 'Whole group · 5–10 minutes',
      need: 'Any soft toy to be your Talking Star',
      steps: ['Give everyone the same starter, like “My favorite animal is…”', 'Whoever holds the star talks. Everyone else listens.', 'Pass the star to the next friend.', 'Saying “pass” is always OK.'] },
    { n: 3, col: C.plum, name: 'Ask Me One More', meta: 'Pairs · 5 minutes',
      need: 'Nothing at all',
      steps: ['One friend shares something: “I have a cat.”', 'Their partner listens, then asks one more question: “What is its name?”', 'Swap turns.', 'Grown-ups, show it first with a child.'] },
  ];
  let art = R(-12, -12, 1656, 840, C.paper);
  const texts = [
    T(60, 56, 700, 'Circle-time talk games', 'h1'),
    T(62, 142, 690, 'Three quick games for ages 3–7. A grown-up leads, everyone gets a turn, and every voice counts.', 'gamesintro'),
  ];
  const boxes = [[60, 260, 696, 500], [876, 48, 696, 360], [876, 426, 696, 342]];
  games.forEach((g, i) => {
    const [x, y, w, h] = boxes[i];
    art += R(x, y, w, h, C.wash, 26) + R(x + 24, y + 26, 72, 72, g.col, 16);
    texts.push(T(x + 24, y + 30, 72, String(g.n), 'gnum', g.col === C.sun ? `color:${C.ink}` : ''));
    texts.push(T(x + 116, y + 26, w - 140, g.name, 'gname'));
    texts.push(T(x + 118, y + 76, w - 140, g.meta, 'gmeta'));
    texts.push(T(x + 26, y + 120, w - 52, `<p class="need"><b>You need:</b> ${g.need}</p><ol>${g.steps.map(s => `<li>${s}</li>`).join('')}</ol>`, 'gbody'));
  });
  art += tower(640, 740, ['q', 'j', 'i', 'l'], 0.62) + kidAt('leo', 'cheer', 520, 740, 0.62, 'laugh');
  const bgArt = art;
  pages.push({ label: 'games L', html: `<section class="page" style="background:${C.paper}">${svg(-12, bgArt)}${renderTexts(texts.filter(t => t.x < 816), 0)}</section>` });
  pages.push({ label: 'games R', html: `<section class="page" style="background:${C.paper}">${svg(804, bgArt)}${renderTexts(texts.filter(t => t.x >= 816), 816)}</section>` });
})();

// =============================================================== P32 BACK COVER
single({
  label: 'back', bg: C.sky,
  art: E(408, 830, 520, 120, C.tSky) +
    tower(160, 790, ['q', 'j', 'i', 'l'], 0.9) +
    kidAt('zara', 'cheer', 300, 790, 0.85, 'laugh') +
    R(564, 624, 192, 115, C.paper, 4) + R(404, 566, 150, 176, C.paper, 10),
  texts: [
    T(60, 60, 696, 'Room 5 is building a tower out of words.', 'backh'),
    T(60, 190, 696, `<p>Every time someone asks a question, tells a joke or shares an idea out loud, a block goes on the Talk Tower. But what happens when everybody talks at once?</p><p>A warm, funny read-aloud about conversation, taking turns and really listening, with circle-time talk games and a note for educators and families at the back.</p>`, 'backtext'),
    T(60, 500, 420, 'Ages 3–7 · Bonus read-aloud from the Talk Tower Classroom Game Kit', 'backmeta'),
    T(566, 648, 188, 'ISBN / barcode<br>(print edition only)', 'isbnlabel'),
    T(421, 576, 120, qrSvg(116), ''),
    T(404, 700, 150, 'Scan for a free<br>bonus printable', 'qrcap'),
    T(60, 426, 0, LOGO('lockup-horizontal-white.svg', 46), ''),
  ],
});

// =============================================================== CSS + write
const CSS = `
@page { size: 8.75in 8.75in; margin: 0 }
* { box-sizing: border-box }
html, body { margin: 0; padding: 0; background: #FFFFFF }
body { -webkit-print-color-adjust: exact; print-color-adjust: exact }
.page { width: 8.75in; height: 8.75in; position: relative; overflow: hidden; page-break-after: always; break-after: page }
.page:last-child { page-break-after: auto; break-after: auto }
.art { position: absolute; left: 0; top: 0; width: 840px; height: 840px; display: block }
.page > div { position: absolute }
.story { font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 500; font-size: 31px; line-height: 1.3; color: ${C.ink} }
.story p { margin: 0 0 .5em }
.story em { font-style: normal; color: ${C.tomato}; font-weight: 700 }
.story b { font-weight: 700 }
.boom { font-family: "Bricolage Grotesque", "Fredoka", sans-serif; font-weight: 800; color: ${C.tomato}; white-space: nowrap; letter-spacing: -1px; line-height: 1 }
.chant { font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 38px; white-space: nowrap }
.chantbig { font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 46px; line-height: 1.22; color: ${C.ink} }
.hand { font-family: "Caveat", "Nunito Sans", cursive; font-weight: 700; white-space: nowrap; line-height: 1 }
.sign { font-family: "Caveat", cursive; font-weight: 700; font-size: 38px; color: ${C.ink}; text-align: center; line-height: 1 }
.bub { --bc: #FFFFFF; background: var(--bc); color: ${C.ink}; border-radius: 30px; padding: 14px 24px 16px; font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 500; font-size: 32px; line-height: 1.18; text-align: center; white-space: normal }
.bub[style*="width:0"], .bub:not([style*="width"]) { white-space: nowrap }
.bub b { font-weight: 700 }
.bub.sky { --bc: ${C.sky}; color: #fff }
.bub.plum { --bc: ${C.plum}; color: #fff }
.bub::after { content: ""; position: absolute; width: 0; height: 0; border-style: solid; bottom: -24px }
.bub.bl::after { left: 36px; border-width: 26px 30px 0 0; border-color: var(--bc) transparent transparent transparent }
.bub.br::after { right: 36px; border-width: 26px 0 0 30px; border-color: var(--bc) transparent transparent transparent }
.covertitle { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 106px; line-height: .95; color: #fff; letter-spacing: -2px }
.coversub { font-family: "Nunito Sans", sans-serif; font-weight: 800; font-size: 27px; line-height: 1.2; color: ${C.ink} }
.badge { width: 156px; height: 156px; border-radius: 50%; background: ${C.sun}; color: ${C.ink}; font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 22px; line-height: 1.12; display: flex; align-items: center; justify-content: center; text-align: center; transform: rotate(8deg) }
.coverbrand { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 20px; color: #fff; letter-spacing: 3px }
.plate { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 40px; color: ${C.ink}; text-align: center }
.plateline { height: 3px; background: ${C.ink}; opacity: .25 }
.title { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 78px; line-height: 1; color: ${C.ink}; text-align: center; letter-spacing: -1.5px }
.titlesub { font-family: "Nunito Sans", sans-serif; font-weight: 700; font-size: 28px; color: ${C.tomato}; text-align: center }
.imprint { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 20px; letter-spacing: 3px; color: ${C.ink}; text-align: center }
.legal { font-family: "Nunito Sans", sans-serif; font-weight: 400; font-size: 15.5px; line-height: 1.5; color: ${C.ink} }
.legal p { margin: 0 0 .8em }
.isbnbox { border: 2px dashed ${C.ink}; border-radius: 8px; padding: 14px 18px; font-family: "Nunito Sans", sans-serif; font-weight: 800; font-size: 15px; color: ${C.ink}; height: 84px }
.isbnbox span { font-weight: 400; opacity: .7 }
.h1 { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 60px; line-height: 1.02; color: ${C.ink}; letter-spacing: -1px }
.h2 { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 44px; line-height: 1.05; color: ${C.ink}; letter-spacing: -.5px }
.castname { font-family: "Nunito Sans", sans-serif; font-size: 19px; line-height: 1.25; color: ${C.ink}; text-align: center }
.castname b { font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 26px }
.keyh { font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 44px; color: ${C.ink}; line-height: 1 }
.keypill span { display: inline-block; color: #fff; font-family: "Nunito Sans", sans-serif; font-weight: 800; font-size: 20px; padding: 6px 16px; border-radius: 999px }
.note { font-family: "Nunito Sans", sans-serif; font-weight: 400; font-size: 20px; line-height: 1.45; color: ${C.ink} }
.note p { margin: 0 0 .7em } .note ul { margin: 0 0 .8em; padding-left: 1.1em } .note li { margin-bottom: .3em }
.cardh { font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 34px; color: ${C.ink}; line-height: 1 }
.cardtext { font-family: "Nunito Sans", sans-serif; font-size: 19px; line-height: 1.35; color: ${C.ink} }
.cardtext ul { margin: 0; padding-left: 1em } .cardtext li { margin-bottom: .45em }
.gamesintro { font-family: "Nunito Sans", sans-serif; font-size: 22px; line-height: 1.4; color: ${C.ink} }
.gnum { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 50px; line-height: 64px; color: #fff; text-align: center }
.gname { font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 36px; color: ${C.ink}; line-height: 1.1 }
.gmeta { font-family: "Nunito Sans", sans-serif; font-weight: 700; font-size: 18px; color: ${C.ink}; opacity: .75 }
.gbody { font-family: "Nunito Sans", sans-serif; font-size: 21px; line-height: 1.4; color: ${C.ink} }
.gbody .need { margin: 0 0 .5em } .gbody ol { margin: 0; padding-left: 1.3em } .gbody li { margin-bottom: .3em }
.backh { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 50px; line-height: 1.04; color: #fff; letter-spacing: -1px }
.backtext { font-family: "Nunito Sans", sans-serif; font-weight: 600; font-size: 22px; line-height: 1.45; color: #fff }
.backtext p { margin: 0 0 .8em }
.backmeta { font-family: "Nunito Sans", sans-serif; font-weight: 800; font-size: 18px; color: ${C.ink}; background: ${C.sun}; padding: 8px 16px; border-radius: 999px; white-space: nowrap; width: auto !important }
.isbnlabel { font-family: "Nunito Sans", sans-serif; font-weight: 700; font-size: 14px; color: ${C.ink}; text-align: center; opacity: .6 }
.backbrand { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 20px; letter-spacing: 3px; color: #fff; white-space: nowrap }
.fbox { border: 2.5px dashed ${C.tomato}; border-radius: 10px; padding: 10px 14px; font-family: "Nunito Sans", sans-serif; font-size: 14px; line-height: 1.35; color: ${C.ink}; background: #fff }
.fbox b { color: ${C.tomato}; font-weight: 800; letter-spacing: .3px }
.titleslot { text-align: center } .titleslot .fbox { display: inline-block; max-width: 560px; text-align: left; font-size: 12.5px; padding: 6px 12px }
.byline { font-family: "Nunito Sans", sans-serif; font-weight: 700; font-size: 24px; color: ${C.ink}; text-align: center }
.dedic { font-family: "Nunito Sans", sans-serif; font-style: italic; font-size: 17px; line-height: 1.45; color: ${C.ink} }
.qrcap { font-family: "Nunito Sans", sans-serif; font-weight: 800; font-size: 13px; line-height: 1.2; color: ${C.ink}; text-align: center }
.theend { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 64px; color: ${C.tomato}; letter-spacing: -1px }
`;

const head = (title, extra = '') => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title>
<link rel="stylesheet" href="%BR%fonts/fonts.css"><style>${CSS}${extra}</style></head>`;
const withBR = (html, br) => html.split('%BR%').join(br);
const html = `${head('More Talk, Less Tap — interior (Play Before Pixels)')}<body>${SYMBOLS()}
${pages.map(p => `<!-- ${p.label} -->\n${p.html}`).join('\n')}
</body></html>`;
fs.writeFileSync(path.join(OUT, 'source.html'), withBR(html, '../../../brand/'));

// cover.html: the front cover cropped to trim (8.5 in = 816 px), rendered at 1600 px for the store
const cover = `${head('More Talk, Less Tap — cover', '.crop{width:816px;height:816px;overflow:hidden;position:relative}.crop .page{position:absolute;left:-12px;top:-12px}')}<body>${SYMBOLS()}<div class="crop">${pages[0].html}</div></body></html>`;
fs.writeFileSync(path.join(__dirname, 'cover.html'), withBR(cover, '../../../../brand/'));
console.log(pages.length + ' pages');
