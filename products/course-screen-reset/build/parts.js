// Shared parts for "The 30-Day Screen Reset" (Play Before Pixels · AlphaPlay LLC): QR, scenes, icons, cards.
// Cast and object art are the same symbols as 100 Screen-Free Plays and Up! Go! More! (chars.js, icons.js).
const path = require('path');
const fs = require('fs');
let QR = null; try { QR = require('qrcode'); } catch (e) { /* cached in qr.json */ }
const CH = require('./chars.js');
const { ART, UI } = require('./icons.js');
const K = require('./content.js');
const { C, KIDS, ADULTS, kid, adult, aimAdult, aimKid, adultHand, kidHand, use, F } = CH;
Object.assign(C, { s1: '#F4CFAE', s2: '#E0AC80', s3: '#C08457', s4: '#8D5A3B' });

const OUT = path.join(__dirname, '..');
const SLUG = 'course-screen-reset';
const SITE = 'playbeforepixels.com';
const BONUS = 'playbeforepixels.com/bonus/course-screen-reset';
const COPY = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.';
const W = '#FFFFFF';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pad2 = n => String(n).padStart(2, '0');

const WC = { // week colors
  sky: { c: C.sky, t: C.tSky, fg: W, deep: '#2A6BB5' },
  grass: { c: C.grass, t: C.tGrass, fg: W, deep: '#237F53' },
  sun: { c: C.sun, t: C.tSun, fg: C.ink, deep: '#B98500' },
  tomato: { c: C.tomato, t: C.tTomato, fg: W, deep: '#C8421F' },
  plum: { c: C.plum, t: C.tPlum, fg: W, deep: '#6D43A6' },
};
const weekOf = d => K.WEEKS.find(w => d >= w.from && d <= w.to);
const wc = d => WC[weekOf(d).color];

// ---------------------------------------------------------------- QR (bonus link)
function qrData() {
  const cache = path.join(__dirname, 'qr.json');
  if (QR) {
    const q = QR.create('https://' + BONUS, { errorCorrectionLevel: 'M' });
    const n = q.modules.size, d = q.modules.data; let p = '';
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (d[y * n + x]) p += `M${x} ${y}h1v1h-1z`;
    const out = { url: 'https://' + BONUS, n, d: p };
    fs.writeFileSync(cache, JSON.stringify(out));
    return out;
  }
  return JSON.parse(fs.readFileSync(cache, 'utf8'));
}
function qrSvg(size = 100, fg = C.ink) {
  const { n, d } = qrData();
  return `<svg viewBox="-2 -2 ${n + 4} ${n + 4}" width="${size}" height="${size}" shape-rendering="crispEdges" role="img" aria-label="QR code to ${BONUS}"><rect x="-2" y="-2" width="${n + 4}" height="${n + 4}" fill="${W}"/><path d="${d}" fill="${fg}"/></svg>`;
}

// ---------------------------------------------------------------- extra symbols for this product
const EXTRA = [
  `<symbol id="glasses" overflow="visible"><circle cx="-8.5" cy="-1" r="7.2" fill="none" stroke="${C.ink}" stroke-width="2.2"/><circle cx="8.5" cy="-1" r="7.2" fill="none" stroke="${C.ink}" stroke-width="2.2"/><path d="M-1.4-1.5H1.4" stroke="${C.ink}" stroke-width="2.2"/></symbol>`,
  `<symbol id="u-hour" viewBox="0 0 24 24"><path d="M5 2H19V4.5C19 8.5 14.5 10.3 14.5 12S19 15.5 19 19.5V22H5V19.5C5 15.5 9.5 13.7 9.5 12S5 8.5 5 4.5Z" fill="currentColor"/><path d="M8 5H16C15.6 7.3 12 8.8 12 10.5C12 8.8 8.4 7.3 8 5Z" fill="#FFFFFF"/><path d="M8.3 19.5C9 17.4 12 16.3 12 14.5C12 16.3 15 17.4 15.7 19.5Z" fill="#FFFFFF"/></symbol>`,
  `<symbol id="u-sprout" viewBox="0 0 24 24"><path d="M11 22V12" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M11 13C11 8 7.5 5 2.5 5C2.5 10 6 13 11 13Z" fill="currentColor"/><path d="M12 11C12 6 15.5 2.5 21.5 2.5C21.5 8 18 11 12 11Z" fill="currentColor"/></symbol>`,
  `<symbol id="u-bolt" viewBox="0 0 24 24"><path d="M13.5 1.5L4 13.5H11L10 22.5L20 10H13Z" fill="currentColor"/></symbol>`,
  `<symbol id="u-star" viewBox="0 0 24 24"><path d="M12 2L14.9 8.3 21.8 9 16.6 13.6 18.1 20.4 12 16.9 5.9 20.4 7.4 13.6 2.2 9 9.1 8.3Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>`,
  `<symbol id="u-people" viewBox="0 0 24 24"><circle cx="8" cy="6.5" r="3.5" fill="currentColor"/><circle cx="17" cy="9" r="2.8" fill="currentColor"/><path d="M1.5 21C1.5 15 4.5 12 8 12S14.5 15 14.5 21Z" fill="currentColor"/><path d="M15.5 21C15.5 17.5 14.8 15.4 13.8 14.2C14.8 13.2 15.9 12.9 17 12.9C20 12.9 22.5 15.4 22.5 21Z" fill="currentColor"/></symbol>`,
  `<symbol id="u-quote" viewBox="0 0 24 24"><path d="M3 13C3 8 5.5 5 9.5 4L10.3 6C8 6.8 6.8 8.4 6.6 10.5H10V19H3ZM13 13C13 8 15.5 5 19.5 4L20.3 6C18 6.8 16.8 8.4 16.6 10.5H20V19H13Z" fill="currentColor"/></symbol>`,
];

function defs() {
  return `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${CH.SYMBOLS.join('')}${UI.join('')}${EXTRA.join('')}</defs></svg>
<svg width="0" height="0" style="position:absolute" aria-hidden="true" class="artdefs"><defs>${ART.join('')}</defs></svg>`;
}

// ---------------------------------------------------------------- small UI pieces
const ico = (id, cls = '', size = '1em') => `<svg class="ico ${cls}" width="${size}" height="${size}" aria-hidden="true"><use href="#u-${id}"/></svg>`;
function drops(level) { return `<span class="drops">${[0, 1].map(i => ico(i < level ? 'drop' : 'drop-o')).join('')}</span>`; }
const ageLabel = m => m < 24 ? `From ${m} months` : (m % 12 === 0 ? `From ${m / 12} years` : `From ${Math.floor(m / 12)}½ years`);
function artDisc(id, t, size = 1.3, extra = '') {
  return `<div class="disc art" style="width:${size}in;height:${size}in;${extra}"><svg viewBox="-60 -60 120 120" width="100%" height="100%"><circle r="60" fill="${t}" class="ground"/><use href="#a-${id}" transform="scale(.8)"/></svg></div>`;
}
const fld = (name, cls = '', lines = 1) => `<span class="field ${cls}" data-name="${name}" data-lines="${lines}"></span>`;

// ---------------------------------------------------------------- scenes (600 x 600 viewBox), same cast as the line
const glassesOn = `<g transform="translate(0,-69)"><use href="#glasses"/></g>`;
function sceneCover() { // grown-up and child on the floor with a play basket; the tablet naps in its basket
  const k = Object.assign({}, KIDS.C, { x: 222, y: F - 27 * 1.55, s: 1.55, aL: 150, aR: -150, face: 'laugh', front: glassesOn });
  const g = Object.assign({}, ADULTS.G1, { x: 438, y: F - 51 * 1.12, s: 1.12, flip: true, legs: 'kneel', aL: 12, face: 'laugh', beard: true });
  g.aR = aimAdult(g, 'R', 330, 332);
  const basket = `<g transform="translate(96 ${F})"><path d="M-62-58H62L52 0H-52Z" fill="${C.s3}"/><rect x="-66" y="-66" width="132" height="14" rx="7" fill="${C.s4}"/><path d="M-40-40H40M-44-24H44" stroke="${C.s2}" stroke-width="5" stroke-linecap="round"/></g>`;
  const inBasket = use('ball', `translate(70,${F - 86}) scale(.46)`) + use('block-2', `translate(118,${F - 84}) rotate(-12) scale(.62)`);
  const blocks = use('block-3', `translate(330,${F - 28})`) + use('block-1', `translate(330,${F - 84})`) + use('block-4', `translate(334,${F - 140}) rotate(7)`);
  const nap = `<g transform="translate(520 ${F})"><g transform="translate(0,-74) scale(.66)"><use href="#tablet-sleeping"/></g><path d="M-48-50C-20-60 20-60 48-50V-34H-48Z" fill="${C.tPlum}"/><path d="M-44-38H44L38 0H-38Z" fill="${C.plum}"/><text x="-20" y="-130" font-family="Caveat" font-weight="700" font-size="34" fill="${C.ink}">z z z</text></g>`;
  const ground = `<ellipse cx="300" cy="${F + 6}" rx="280" ry="26" fill="${C.sun}" fill-opacity=".35"/><circle cx="300" cy="318" r="170" fill="${W}"/>`;
  return ground + adult(g) + blocks + kid(k) + basket + inBasket + nap;
}
function sceneWeek1() { // floor time: baby/toddler and grown-up, cups tumbling
  const k = Object.assign({}, KIDS.B, { x: 200, y: F - 4 * 1.3, s: 1.3, lL: -80, lR: -76, aL: 132, aR: -132, face: 'laugh' });
  const g = Object.assign({}, ADULTS.G2, { x: 452, y: F - 12 * 1.05, s: 1.05, flip: true, legs: 'sit', aL: 20, face: 'laugh' });
  g.aR = aimAdult(g, 'R', 352, F - 70);
  const rug = `<ellipse cx="300" cy="${F}" rx="250" ry="24" fill="${C.sky}"/>`;
  const cup = (x, y, r, c) => `<g transform="translate(${x},${y}) rotate(${r}) scale(.8)"><path d="M-20-28H20L16 30H-16Z" fill="${c}"/></g>`;
  const cups = cup(318, F - 22, 0, C.tomato) + cup(360, F - 22, 0, C.grass) + cup(300, F - 76, -28, C.sun) + cup(352, F - 104, 22, C.plum);
  return `<circle cx="300" cy="318" r="160" fill="${W}"/>` + rug + adult(g) + cups + kid(k);
}
function sceneWeek2() { // box rocket countdown
  const k = Object.assign({}, KIDS.D, { x: 214, y: 360, s: 1.35, face: 'laugh', aL: 150, aR: -150, legs: false });
  const box = `<g transform="translate(214 0)">
    <path d="M-78 ${F}V350H78V${F}Z" fill="${C.s2}"/>
    <path d="M-78 350L-96 322H-18L0 350Z" fill="${C.s3}"/><path d="M78 350L96 322H18L0 350Z" fill="${C.s3}"/>
    <circle cx="0" cy="408" r="26" fill="${C.tSky}"/><circle cx="0" cy="408" r="18" fill="${C.sky}"/>
    <path d="M-78 ${F - 44}L-112 ${F}H-78Z" fill="${C.tomato}"/><path d="M78 ${F - 44}L112 ${F}H78Z" fill="${C.tomato}"/>
    <path d="M-34 ${F}L0 ${F + 30}L34 ${F}Z" fill="${C.sun}"/></g>`;
  const g = Object.assign({}, ADULTS.G5, { x: 450, y: F - 51 * 1.08, s: 1.08, flip: true, legs: 'kneel', aL: 16, aR: -150, face: 'laugh' });
  const stars = [[120, 190, 1], [300, 140, .7], [540, 250, .8], [350, 250, .5]].map(([x, y, s]) => `<path d="M0-12L3.5-3.5 12 0 3.5 3.5 0 12-3.5 3.5-12 0-3.5-3.5Z" fill="${C.sun}" transform="translate(${x} ${y}) scale(${s * 1.6})"/>`).join('');
  return `<circle cx="300" cy="318" r="160" fill="${W}"/>` + stars + kid(k) + box + adult(g);
}
function sceneWeek3() { // reading together, speech bubbles
  const g = Object.assign({}, ADULTS.G3, { x: 330, y: F - 12 * 1.1, s: 1.1, legs: 'sit', face: 'smile', aL: -40, aR: 40 });
  const k = Object.assign({}, KIDS.E, { x: 238, y: F - 4 * 1.35, s: 1.35, lL: -80, lR: -76, face: 'laugh', aL: -30, aR: -150 });
  const book = `<g transform="translate(300 ${F - 118}) scale(.62)"><use href="#book-open" style="--bc:${C.tomato}"/></g>`;
  const bub = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30-22H30A12 12 0 0 1 42-10V8A12 12 0 0 1 30 20H0L-16 34V20H-30A12 12 0 0 1-42 8V-10A12 12 0 0 1-30-22Z" fill="${c}"/><circle cx="-16" r="5" cy="-1" fill="${W}"/><circle cx="0" r="5" cy="-1" fill="${W}"/><circle cx="16" r="5" cy="-1" fill="${W}"/></g>`;
  return `<circle cx="300" cy="318" r="160" fill="${W}"/>` + adult(g) + kid(k) + book + bub(170, 196, 1.3, C.sky) + bub(440, 170, 1.1, C.grass);
}
function sceneWeek4() { // car ride, window spotting
  const car = `<g transform="translate(300 ${F - 40}) scale(1.35)">${use('car-back')}${use('car-front')}</g>`;
  const k = Object.assign({}, KIDS.A, { x: 262, y: F - 70, s: 1.05, face: 'laugh', aL: 12, aR: -150, legs: false });
  const g = Object.assign({}, ADULTS.G4, { x: 380, y: F - 44, s: .8, face: 'smile', aL: 30, aR: -30, legs: 'none' });
  const road = `<rect x="40" y="${F + 8}" width="520" height="18" rx="9" fill="${C.ink}" fill-opacity=".15"/>`;
  const cloud = `<g fill="${W}"><circle cx="150" cy="170" r="26"/><circle cx="184" cy="156" r="34"/><circle cx="222" cy="172" r="24"/><rect x="150" y="170" width="72" height="26"/></g>`;
  return `<circle cx="300" cy="318" r="160" fill="${C.tSky}"/>` + cloud + road + adult(g) + kid(k) + car + use('sun', 'translate(470,170) scale(.7)');
}
function sceneWeek5() { // parade
  const k1 = Object.assign({}, KIDS.B, { x: 170, y: F - 27 * 1.4, s: 1.4, face: 'laugh', aL: 150, aR: -150, lL: 16, lR: -8 });
  const k2 = Object.assign({}, KIDS.D, { x: 300, y: F - 27 * 1.55, s: 1.55, face: 'laugh', aL: 12, aR: -150 });
  const g = Object.assign({}, ADULTS.G2, { x: 440, y: F - 81 * .95, s: .95, flip: true, face: 'laugh', aL: -150, aR: 150 });
  const hand = kidHand(k2, 'R');
  const spoon = `<g transform="translate(${hand[0]},${hand[1]}) rotate(30)"><rect x="-4" y="-40" width="8" height="46" rx="4" fill="${C.s3}"/><ellipse cx="0" cy="-44" rx="10" ry="7" fill="${C.s3}"/></g>`;
  const pot = `<g transform="translate(${hand[0] + 30},${hand[1] + 26})"><rect x="-26" y="-18" width="52" height="34" rx="8" fill="${C.ink}" fill-opacity=".8"/><rect x="-32" y="-22" width="64" height="8" rx="4" fill="${C.ink}"/></g>`;
  const stars = [[110, 200, 1.2], [300, 150, .8], [520, 230, 1], [420, 140, .6]].map(([x, y, s]) => `<path d="M0-12L3.5-3.5 12 0 3.5 3.5 0 12-3.5 3.5-12 0-3.5-3.5Z" fill="${C.sun}" transform="translate(${x} ${y}) scale(${s * 1.6})"/>`).join('');
  return `<circle cx="300" cy="318" r="160" fill="${W}"/>` + stars + adult(g) + kid(k1) + pot + kid(k2) + spoon;
}
const WEEK_SCENES = [sceneWeek1, sceneWeek2, sceneWeek3, sceneWeek4, sceneWeek5];
const sceneSvg = (fn, cls = '', vb = '0 0 600 600') => `<svg class="scene ${cls}" viewBox="${vb}" width="100%" height="100%">${fn()}</svg>`;

// ---------------------------------------------------------------- play card (the same card on the page, in emails and in the book)
function playMeta(p) {
  return `<div class="meta">
    <span>${ico('sprout')} ${ageLabel(p.from)}</span>
    <span>${ico('clock')} ${K.PREP[p.prep]}</span>
    <span>${drops(p.mess)} ${K.MESS[p.mess]}</span>
    <span>${ico('hour')} ${K.TIME[p.time]}</span>
  </div>`;
}
function playCard(day, opts = {}) {
  const p = day.play, w = wc(day.d), m = K.MOVES[p.move];
  const mat = p.mat.length ? esc(p.mat.join(', ')) : '<i>Nothing but you</i>';
  return `<article class="play">
    <div class="phead">
      ${artDisc(p.art, w.t, 1.25)}
      <div class="ptitle">
        <div class="kicker" style="color:${w.deep}">Today’s play</div>
        <h2>${esc(p.t)}</h2>
        ${playMeta(p)}
        <div class="need">${ico('bag')}<span><b>You need:</b> ${mat}</span></div>
      </div>
    </div>
    <p class="how">${esc(p.how)}</p>
    <div class="talk" style="background:${w.t}">${ico('talk', 'big')}<div><div class="tlab">Talk while you play <span>· ${m.name}</span></div><div class="tline">${esc(p.talk)}</div></div></div>
    <div class="ez">
      <div><b>Make it easier</b>${esc(p.easier)}</div>
      <div><b>Make it harder</b>${esc(p.harder)}</div>
    </div>
    <div class="tired">${ico('bolt')}<span><b>Tired-grown-up version (2 minutes, no setup):</b> ${esc(p.tired)}</span></div>
    <div class="safe">${ico('shield')}<span><b>Safety:</b> ${esc(p.safe)}</span></div>
  </article>`;
}
function scriptBox(day, big = false) {
  const s = day.script, w = wc(day.d);
  return `<div class="script${big ? ' big' : ''}" style="border-color:${w.c}">
    <div class="slab" style="color:${w.deep}">${ico('quote')} Plain words for: ${esc(s.moment)}</div>
    ${s.lines.map(l => `<p class="sline">${esc(l)}</p>`).join('')}
    <p class="swhy">${esc(s.why)}</p>
  </div>`;
}

module.exports = { C, W, CH, K, OUT, SLUG, SITE, BONUS, COPY, esc, pad2, WC, weekOf, wc, qrSvg, defs, ico, drops, ageLabel, artDisc, fld,
  sceneCover, WEEK_SCENES, sceneSvg, playCard, playMeta, scriptBox };
