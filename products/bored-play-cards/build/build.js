// Build script for "I'm Bored" Play Cards (Play Before Pixels).
//   node build/build.js
// Writes the HTML for every edition into build/gen/ (plus ../source.html = store edition, color, US Letter):
//   editions  store (our own site: URL + QR allowed) and etsy (no URL, short link or QR: COMPLIANCE-GATE #16)
//   inks      color (brand tints, fillable blanks) and low-ink (white background, colorable line art, write-in blanks)
//   sizes     US Letter and A4
//   + START HERE (one page per edition), cover, mockup, Etsy listing images, PNG template set (store bonus).
// gen/manifest.json lists every PDF to render; make-all.sh does the rendering.
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const { C, KIDS, ADULTS, SYMBOLS, kid, adult, kidHand } = require('./chars');
const { CATS, BANDS, CARDS, MINI } = require('./cards');
const COMP = require('./companion');

const ROOT = path.resolve(__dirname, '..');
const GEN = path.join(__dirname, 'gen');
const SLUG = 'bored-play-cards';
const BONUS = `playbeforepixels.com/bonus/${SLUG}`;
const HELP = 'playbeforepixels.com/help';
const COPY = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.';
const VERSION = 'Version 1.0 · September 2026';
const PRICE = 6.5;

// ---------- edition state ----------
const SIZES = {
  letter: { key: 'letter', name: 'US Letter', w: 8.5, h: 11, css: '8.5in 11in' },
  a4: { key: 'a4', name: 'A4', w: 210 / 25.4, h: 297 / 25.4, css: '210mm 297mm' },
};
let SZ = SIZES.letter; // page size being built
let ED = 'store';      // 'store' | 'etsy'
let LOW = false;       // low-ink edition
let BASE = '../../../'; // path from the HTML file to the repo root
const STORE = () => ED === 'store';

// ---------- QR codes (drawn here so they always match the printed link) ----------
function qrSVG(text) {
  const q = QRCode.create(text, { errorCorrectionLevel: 'M' });
  const n = q.modules.size, d = q.modules.data;
  let p = '';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (d[y * n + x]) p += `M${x} ${y}h1v1h-1z`;
  return `<svg class="qr" viewBox="-2 -2 ${n + 4} ${n + 4}" shape-rendering="crispEdges" aria-label="QR code: ${text}"><rect x="-2" y="-2" width="${n + 4}" height="${n + 4}" fill="#FFFFFF"/><path d="${p}" fill="${C.ink}"/></svg>`;
}
const QR_BONUS = qrSVG('https://' + BONUS);
const QR_HELP = qrSVG('https://' + HELP);

// ---------- themes ----------
const TH = {
  b13: { m: C.sun, t: C.tSun, name: 'Ages 1–3' },
  b35: { m: C.grass, t: C.tGrass, name: 'Ages 3–5' },
  b58: { m: C.sky, t: C.tSky, name: 'Ages 5–8' },
  b812: { m: C.plum, t: C.tPlum, name: 'Ages 8–12' },
  summer: { m: C.tomato, t: C.tTomato, name: 'Summer set' },
  rainy: { m: C.ink, t: C.wash, name: 'Rainy-day set' },
};
const ENERGY = { c: 'Calm', m: 'Medium', w: 'Wiggly' };
const ELEV = { c: 1, m: 2, w: 3 };
const tvars = th => `--m:${th.m};--t:${th.t}`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const fromTxt = m => m < 36 ? `from ${m} mo` : `from ${Math.floor(m / 12)}${m % 12 ? '½' : ''} yrs`;
const PREP = { 0: 'No prep', 2: 'Prep 2 min', 10: 'Prep 10 min' };
const MESS = { 1: 'Low mess', 2: 'Some mess', 3: 'Messy' };
const TIME = { 5: 'About 5 min', 10: 'About 10 min', 20: '20+ min' };
const meta = cd => { const m = COMP[cd.t]; if (!m) throw new Error('No companion entry for card: ' + cd.t); return m; };

// every card, in pack order, with its band key
const ALL = [
  ...['b13', 'b35', 'b58', 'b812'].flatMap(k => CARDS[k].map((cd, i) => ({ k, cd, i }))),
  ...['summer', 'rainy'].flatMap(k => MINI[k].cards.map((cd, i) => ({ k, cd, i }))),
];
const N_ALL = ALL.length;
const N_FREE = ALL.filter(x => !meta(x.cd)[5]).length; // "nothing to buy" cards
// Tiers: full = all four bands + seasonal sets (5–12 material HELD until counsel's G1 answer; ships later as a free update
// to the same listing), g0 = the Ages 1–5 edition that launches (1–3 and 3–5 bands only; business/GROWTH-ENGINE.md §8a).
// The seasonal sets span ages 1–12, so they stay with the full tier.
let TIER = 'full';
const G0 = () => TIER === 'g0';
const BKEYS = () => (G0() ? ['b13', 'b35'] : ['b13', 'b35', 'b58', 'b812']);
const SKEYS = () => (G0() ? [] : ['summer', 'rainy']);
const ACT = () => ALL.filter(x => BKEYS().includes(x.k) || SKEYS().includes(x.k));
const nAll = () => ACT().length;
const nFree = () => ACT().filter(x => !meta(x.cd)[5]).length;
const nMain = () => BKEYS().reduce((s, k) => s + CARDS[k].length, 0);
const AGES = () => (G0() ? '1–5' : '1–12');

// ---------- icons (flat, 24-unit grid, currentColor) ----------
const ICONS = [
  `<symbol id="ic-build" viewBox="0 0 24 24"><rect x="2.5" y="13" width="9" height="9" rx="2" fill="currentColor"/><rect x="12.5" y="13" width="9" height="9" rx="2" fill="currentColor" opacity=".55"/><rect x="7.5" y="3" width="9" height="9" rx="2" fill="currentColor"/></symbol>`,
  `<symbol id="ic-pretend" viewBox="0 0 24 24"><path d="M3 8l4.5 4L12 4l4.5 8L21 8l-1.8 11.5H4.8Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="12" cy="15" r="1.8" fill="#fff"/></symbol>`,
  `<symbol id="ic-move" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" fill="currentColor"/><path d="M12 12V2.5A9.5 9.5 0 0 1 20.2 16.8Z" fill="#fff" opacity=".45"/><path d="M12 12L3.8 16.8A9.5 9.5 0 0 1 3.8 7.2Z" fill="#fff" opacity=".25"/><circle cx="12" cy="12" r="2.2" fill="#fff"/></symbol>`,
  `<symbol id="ic-outside" viewBox="0 0 24 24"><circle cx="12" cy="9.5" r="7.5" fill="currentColor"/><rect x="10.5" y="13" width="3" height="9" rx="1.5" fill="currentColor"/><circle cx="9" cy="7.5" r="2" fill="#fff" opacity=".4"/></symbol>`,
  `<symbol id="ic-words" viewBox="0 0 24 24"><path d="M1.5 5.5C5 4.3 8.8 4.6 12 6.5c3.2-1.9 7-2.2 10.5-1v14c-3.5-1.1-7.3-.8-10.5 1.1-3.2-1.9-7-2.2-10.5-1.1Z" fill="currentColor"/><path d="M12 6.8v13.5" stroke="#fff" stroke-width="1.4"/><path d="M4.5 9.5c1.8-.4 3.6-.2 5 .5M4.5 12.5c1.8-.4 3.6-.2 5 .5M14.5 10c1.4-.7 3.2-.9 5-.5M14.5 13c1.4-.7 3.2-.9 5-.5" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".7"/></symbol>`,
  `<symbol id="ic-music" viewBox="0 0 24 24"><rect x="9" y="3" width="3" height="14" rx="1.2" fill="currentColor"/><path d="M10 3.2c3.8-.8 7.5 1 8.5 4.8-2.2-1.6-5-2-8.5-1.2Z" fill="currentColor"/><ellipse cx="7.5" cy="17.5" rx="4.5" ry="3.6" fill="currentColor"/></symbol>`,
  `<symbol id="ic-kitchen" viewBox="0 0 24 24"><path d="M2.5 11h19a9.5 9.5 0 0 1-19 0Z" fill="currentColor"/><rect x="13" y="1.5" width="2.6" height="11" rx="1.3" fill="currentColor" transform="rotate(25 14.3 7)"/><rect x="6" y="18.5" width="12" height="3" rx="1.5" fill="currentColor"/></symbol>`,
  `<symbol id="ic-games" viewBox="0 0 24 24"><rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="currentColor"/><circle cx="7.8" cy="7.8" r="1.9" fill="#fff"/><circle cx="12" cy="12" r="1.9" fill="#fff"/><circle cx="16.2" cy="16.2" r="1.9" fill="#fff"/><circle cx="16.2" cy="7.8" r="1.9" fill="#fff"/><circle cx="7.8" cy="16.2" r="1.9" fill="#fff"/></symbol>`,
  `<symbol id="ic-talk" viewBox="0 0 24 24"><path d="M5 3h14a3.5 3.5 0 0 1 3.5 3.5v7A3.5 3.5 0 0 1 19 17h-7l-5.5 4.5V17H5a3.5 3.5 0 0 1-3.5-3.5v-7A3.5 3.5 0 0 1 5 3Z" fill="currentColor"/><circle cx="7.5" cy="10" r="1.5" fill="#fff"/><circle cx="12" cy="10" r="1.5" fill="#fff"/><circle cx="16.5" cy="10" r="1.5" fill="#fff"/></symbol>`,
  `<symbol id="ic-safe" viewBox="0 0 24 24"><path d="M12 1.5l8.5 3.2v6.2c0 5.4-3.6 9.9-8.5 11.6-4.9-1.7-8.5-6.2-8.5-11.6V4.7Z" fill="currentColor"/><path d="M8 12.2l2.8 2.8 5.4-5.6" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></symbol>`,
  `<symbol id="ic-sun" viewBox="0 0 24 24">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<rect x="11" y="0.5" width="2" height="4.5" rx="1" fill="currentColor" transform="rotate(${a} 12 12)"/>`).join('')}<circle cx="12" cy="12" r="6" fill="currentColor"/></symbol>`,
  `<symbol id="ic-rain" viewBox="0 0 24 24"><path d="M6.5 14a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 17.6 6a4 4 0 0 1-.1 8Z" fill="currentColor"/><path d="M8 17l-1.3 3.5M12.5 17l-1.3 3.5M17 17l-1.3 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>`,
  `<symbol id="ic-heart" viewBox="0 0 24 24"><path d="M12 21C9 18.7 2 14 2 8.3 2 5.4 4.2 3 7 3c2.1 0 3.8 1.2 5 3 1.2-1.8 2.9-3 5-3 2.8 0 5 2.4 5 5.3C22 14 15 18.7 12 21Z" fill="currentColor"/></symbol>`,
  `<symbol id="ic-star" viewBox="0 0 24 24"><path d="M12 2l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 16.8 6.1 20.1l1.3-6.6L2.5 8.9l6.6-.8Z" fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></symbol>`,
  `<symbol id="ic-pen" viewBox="0 0 24 24"><path d="M4 20l1-4.5L15.5 5a2.1 2.1 0 0 1 3 0l.5.5a2.1 2.1 0 0 1 0 3L8.5 19Z" fill="currentColor"/><path d="M4 20l4.5-1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>`,
  `<symbol id="ic-later" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" fill="currentColor"/><path d="M12 6.5V12l3.8 2.4" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></symbol>`,
  `<symbol id="ic-prep" viewBox="0 0 24 24"><path d="M5.5 2h13v2.6c0 3.6-2.6 5.6-4.4 7.4 1.8 1.8 4.4 3.8 4.4 7.4V22h-13v-2.6c0-3.6 2.6-5.6 4.4-7.4-1.8-1.8-4.4-3.8-4.4-7.4Z" fill="currentColor"/><path d="M9 19.5c.8-1.6 2-2.4 3-2.4s2.2.8 3 2.4Z" fill="#fff" opacity=".6"/></symbol>`,
  `<symbol id="ic-mess" viewBox="0 0 24 24"><path d="M12 1.8c3.6 5.1 7.2 8.7 7.2 12.7a7.2 7.2 0 0 1-14.4 0c0-4 3.6-7.6 7.2-12.7Z" fill="currentColor"/><path d="M8.8 14.6a3.3 3.3 0 0 0 2.6 3.3" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".7"/></symbol>`,
  `<symbol id="ic-adult" viewBox="0 0 24 24"><circle cx="8" cy="5" r="3.3" fill="currentColor"/><path d="M2.5 22v-7a5.5 5.5 0 0 1 11 0v7Z" fill="currentColor"/><circle cx="18" cy="10.5" r="2.6" fill="currentColor"/><path d="M14.2 22v-4.3a3.8 3.8 0 0 1 7.6 0V22Z" fill="currentColor"/></symbol>`,
  `<symbol id="ic-alone" viewBox="0 0 24 24"><circle cx="12" cy="6.5" r="4" fill="currentColor"/><path d="M5.5 22v-5.5a6.5 6.5 0 0 1 13 0V22Z" fill="currentColor"/></symbol>`,
  `<symbol id="ic-check" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10.5" fill="currentColor"/><path d="M7.3 12.4l3.1 3.1 6.3-6.6" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></symbol>`,
  `<symbol id="ic-cut" viewBox="0 0 24 24"><circle cx="6" cy="18" r="3.3" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="18" cy="18" r="3.3" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M8.3 15.6L18 2.5M15.7 15.6L6 2.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></symbol>`,
];
const icon = (id, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><use href="#ic-${id}"/></svg>`;
const meter = e => `<svg class="mt" viewBox="0 0 17 12" aria-hidden="true">${[0, 1, 2].map(i => `<rect x="${i * 6}" y="${8 - i * 4}" width="4.4" height="${4 + i * 4}" rx="1.4" fill="currentColor" opacity="${i < ELEV[e] ? 1 : .22}"/>`).join('')}</svg>`;

// ---------- logo + page helpers ----------
const logo = (file, cls = 'lg') => {
  if (LOW) file = file.replace(/-(white|reverse)$/, ''); // low-ink pages are white: always the ink logo
  return `<img class="${cls}" src="${BASE}brand/logo/${file}.svg" alt="Play Before Pixels">`;
};
const pg = (cls, inner, style = '') => `<section class="page ${cls}"${style ? ` style="${style}"` : ''}>${inner}</section>`;
const site = (withUrl, without = '') => STORE() ? withUrl : without; // URL text only in the store edition
const edName = () => `${LOW ? 'Low-ink' : 'Color'} edition · ${SZ.name}`;

// Field hooks: only the color edition carries fillable fields (finish.js reads data-field / data-ml / data-fs).
const F = (name, ml = false, fs = 0) => LOW ? '' : ` data-field="${name}"${ml ? ' data-ml="1"' : ''}${fs ? ` data-fs="${fs}"` : ''}`;
const lines = n => Array.from({ length: n }, () => '<span class="ln"></span>').join('');

// ---------- cards ----------
function card(cd, key, num, opts = {}) {
  const th = TH[key];
  const band = BANDS.find(b => b.key === key);
  const isMini = !band;
  const [from, prep, mess, time, alone, buy] = meta(cd);
  const ageTxt = isMini ? `Ages ${cd.a}` : band.label;
  const safe = cd.s || (band ? band.safe : 'Grown-up nearby.');
  const numTxt = isMini ? `${icon(key === 'summer' ? 'sun' : 'rain', 'ssi')}${String(num).padStart(2, '0')}` : `${band.ages} · ${String(num).padStart(2, '0')}`;
  const seasonIc = isMini ? icon(key === 'summer' ? 'sun' : 'rain', 'ssi') : '';
  const nothing = /^nothing$/i.test(cd.n.trim());
  const M = n => opts.marks ? `<span class="mk m${n}">${n}</span>` : '';
  const flag2 = nothing ? `<span class="fg fnb">${icon('check', 'fi')}Nothing needed</span>` : !buy ? `<span class="fg fnb">${icon('check', 'fi')}Nothing to buy</span>` : '';
  return `<div class="card${opts.marks ? ' marked' : ''}" style="${tvars(th)}"${opts.id ? ` id="${opts.id}"` : ''}><div class="panel">
  <div class="hd">${M(1)}<span class="age">${seasonIc}${ageTxt}<em>· ${fromTxt(from)}</em></span><span class="en">${meter(cd.e)}${ENERGY[cd.e]}</span>${M(2)}</div>
  <div class="meta">${M(3)}<span>${icon('prep', 'mi')}${PREP[prep]}</span><span>${icon('mess', 'mi')}${MESS[mess]}</span><span>${icon('later', 'mi')}${TIME[time]}</span></div>
  <div class="ti"><div class="tt"><div class="cat">${CATS[cd.c].name}</div><h3>${esc(cd.t)}</h3></div><span class="ci">${icon(cd.c)}</span>${M(4)}</div>
  <div class="bd">
    <div class="row">${M(5)}<b>You need</b><p>${esc(cd.n)}</p></div>
    <div class="row">${M(6)}<b>Try it</b><p>${esc(cd.d)}</p></div>
    <div class="talk">${M(7)}${icon('talk', 'ti2')}<div><b>Talk</b><p>${esc(cd.k)}</p></div></div>
  </div>
  <div class="sp"></div>
  <div class="fl">${M(8)}<span class="fg ${alone ? 'fal' : 'fgu'}">${icon(alone ? 'alone' : 'adult', 'fi')}${alone ? 'Can do alone' : 'With a grown-up'}</span>${flag2}<i>${numTxt}</i></div>
  <div class="ft">${M(9)}${icon('safe', 'si')}<span>${esc(safe)}</span></div>
</div></div>`;
}

function blankCard(key) {
  const th = TH[key];
  const band = BANDS.find(b => b.key === key);
  const ageTxt = band ? band.label : 'Ages ______';
  const seasonIc = !band ? icon(key === 'summer' ? 'sun' : 'rain', 'ssi') : '';
  const box = (name, n, ml, fs) => LOW ? `<div class="wlines">${lines(n)}</div>` : `<div class="wbox" style="height:${n * 15}px"${F(name, ml, fs)}></div>`;
  const tick = name => `<i class="tk"${F(name)}></i>`;
  return `<div class="card blank${LOW ? '' : ' ed'}" style="${tvars(th)}"><div class="panel">
  <div class="hd"><span class="age">${seasonIc}${ageTxt}</span><span class="en en3">${tick('calm')}Calm${tick('medium')}Med${tick('wiggly')}Wiggly</span></div>
  <div class="meta mw"><span>From<b class="wm1"${F('from', false, 7)}></b></span><span>Prep<b class="wm1"${F('prep', false, 7)}></b></span><span>Time<b class="wm1"${F('time', false, 7)}></b></span></div>
  <div class="ti"><div class="tt"><div class="cat">Your idea</div>${LOW ? '<div class="wl big"></div>' : `<div class="wl big"${F('title', false, 11)}></div>`}</div><span class="ci">${icon('pen')}</span></div>
  <div class="bd">
    <div class="row"><b>You need</b>${box('need', 2, true, 8)}</div>
    <div class="row"><b>Try it</b>${box('try', 3, true, 8)}</div>
    <div class="talk">${icon('talk', 'ti2')}<div><b>Talk</b>${box('talk', 2, true, 8)}</div></div>
  </div>
  <div class="sp"></div>
  <div class="fl fl3">${tick('grownup')}<span>With a grown-up</span>${tick('alone')}<span>Can do alone</span></div>
  <div class="ft">${icon('safe', 'si')}<span>Our safety rules apply to your cards too: see the safety page.</span></div>
</div></div>`;
}

function cardBack(key) {
  const th = TH[key];
  const shapes = key === 'summer' ? 'sun' : key === 'rainy' ? 'rain' : null;
  const op = key === 'b13' ? .38 : .2;
  const dots = [[30, 40, 26], [190, 64, 16], [26, 190, 12], [196, 190, 13], [40, 140, 8], [198, 140, 10], [112, 28, 7], [190, 280, 12]]
    .map(([x, y, r], i) => shapes && i % 2 === 0
      ? `<g transform="translate(${x - r},${y - r}) scale(${r / 12})" style="color:#FFFFFF" opacity="${op}"><use href="#ic-${shapes}" width="24" height="24"/></g>`
      : `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFFFFF" opacity="${op}"/>`).join('');
  const band = BANDS.find(b => b.key === key);
  const sub = band ? band.label : th.name;
  return `<div class="card back" style="${tvars(th)}"><div class="panel">
  <svg class="bgdots" viewBox="0 0 208 304" preserveAspectRatio="none" aria-hidden="true">${dots}</svg>
  <div class="bk"><div class="bkc"><span class="bk1">I’m</span><span class="bk2">bored!</span></div>
  <div class="bks">Play cards · ${sub}</div></div>
  <div class="bkb">${logo(key === 'b13' ? 'wordmark' : key === 'rainy' ? 'wordmark-reverse' : 'wordmark-white', 'lgb')}</div>
</div></div>`;
}

// ---------- sheets ----------
function cropMarks(cols, rows, cw, ch, x0, y0) {
  const L = 0.16, g = 0.03; let s = '';
  for (let i = 0; i <= cols; i++) {
    const x = x0 + i * cw;
    s += `<i class="cm v" style="left:${x}in;top:${y0 - g - L}in;height:${L}in"></i><i class="cm v" style="left:${x}in;top:${y0 + rows * ch + g}in;height:${L}in"></i>`;
  }
  for (let j = 0; j <= rows; j++) {
    const y = y0 + j * ch;
    s += `<i class="cm h" style="top:${y}in;left:${x0 - g - L}in;width:${L}in"></i><i class="cm h" style="top:${y}in;left:${x0 + cols * cw + g}in;width:${L}in"></i>`;
  }
  return s;
}
// 9 poker-size cards (2.5 × 3.5 in) on a straight-line grid: 4 cuts each way with a paper trimmer (rule 9).
function cardSheet(items, label) {
  const x0 = (SZ.w - 7.5) / 2, y0 = (SZ.h - 10.5) / 2;
  const cells = items.map((h, i) => `<div class="cell" style="left:${x0 + (i % 3) * 2.5}in;top:${y0 + Math.floor(i / 3) * 3.5}in">${h}</div>`).join('');
  const guides = [1, 2].map(i => `<i class="gl v" style="left:${x0 + i * 2.5}in;top:${y0}in;height:10.5in"></i>`).join('') +
    [1, 2].map(j => `<i class="gl h" style="top:${y0 + j * 3.5}in;left:${x0}in;width:7.5in"></i>`).join('') +
    `<i class="gl box" style="left:${x0}in;top:${y0}in;width:7.5in;height:10.5in"></i>`;
  const side = (txt, left) => `<div class="sl" style="left:${left ? x0 / 2 : SZ.w - x0 / 2}in;top:${y0 + 5.25}in;transform:translate(-50%,-50%) rotate(${left ? -90 : 90}deg)">${txt}</div>`;
  const leftTxt = `<span class="sll">${logo('wordmark', 'lgs')}<span>${site('playbeforepixels.com · ')}${label} · ${VERSION}</span></span>`;
  const rightTxt = `<span class="sll">${icon('cut', 'sci')}<span>Grown-up keeps the pieces · every piece is 1.5 in or larger · ${COPY}</span></span>`;
  return pg('sheet', cells + guides + cropMarks(3, 3, 2.5, 3.5, x0, y0) + side(leftTxt, true) + side(rightTxt, false));
}
function chunk(a, n) { const r = []; for (let i = 0; i < a.length; i += n) r.push(a.slice(i, i + n)); return r; }

// Standard content page with 0.5 in margins, header strip and footer (logo + URL on every page; store edition only for the URL).
function contentPage(cls, eyebrow, title, body, opts = {}) {
  return pg('cp ' + cls, `<div class="cpin">
  <header class="phd">${logo('lockup-horizontal', 'lgh')}<span class="pe">${eyebrow}</span></header>
  ${title ? `<h2 class="ph">${title}</h2>` : ''}
  ${body}
  </div><footer class="pf"><span class="pfl">${logo('wordmark', 'lgf')}<span>${site('playbeforepixels.com · ')}“I’m Bored” Play Cards · ${VERSION}</span></span><span>${COPY} For use in your own home.</span></footer>`, opts.style);
}

// ---------- illustrations ----------
function jarSVG(opts = {}) {
  const lab = opts.lab || C.tomato;
  const cardsIn = [[-54, -58, -16, C.sun], [-20, -74, -5, C.grass], [18, -70, 7, C.sky], [52, -56, 17, C.plum]]
    .map(([x, y, r, c]) => `<g transform="translate(${x},${y}) rotate(${r})"><rect x="-24" y="-40" width="48" height="78" rx="7" fill="#fff"/><rect x="-24" y="-40" width="48" height="15" rx="7" fill="${c}"/><rect x="-24" y="-31" width="48" height="6" fill="${c}"/><rect x="-18" y="-18" width="30" height="5" rx="2.5" fill="${C.ink}" opacity=".45"/><rect x="-18" y="-9" width="36" height="3.5" rx="1.75" fill="${C.ink}" opacity=".2"/><rect x="-18" y="-2" width="32" height="3.5" rx="1.75" fill="${C.ink}" opacity=".2"/></g>`).join('');
  return `<g>
    <rect x="-98" y="-40" width="196" height="218" rx="44" fill="${C.tSky}"/>
    ${cardsIn}
    <rect x="-98" y="-22" width="196" height="200" rx="44" fill="${C.tSky}" opacity=".86"/>
    <rect x="-86" y="-50" width="172" height="20" rx="10" fill="${C.sky}" opacity=".35"/>
    <circle cx="0" cy="80" r="62" fill="${lab}"/>
    <text x="0" y="74" text-anchor="middle" font-family="Bricolage Grotesque, Nunito Sans, sans-serif" font-weight="800" font-size="30" fill="#fff" letter-spacing="-.5">I’m</text>
    <text x="0" y="104" text-anchor="middle" font-family="Bricolage Grotesque, Nunito Sans, sans-serif" font-weight="800" font-size="30" fill="#fff" letter-spacing="-.5">bored!</text>
    <rect x="-82" y="6" width="13" height="96" rx="6.5" fill="#fff" opacity=".6"/>
  </g>`;
}
function coverArt(w, h) {
  const floor = h - 34;
  const k = Object.assign({}, KIDS.A, { x: w * 0.6, y: floor - 27 * 1.5, s: 1.5, aL: 16, aR: -150, face: 'laugh' });
  const hand = kidHand(k, 'R');
  const held = `<g transform="translate(${hand[0] + 2},${hand[1] - 34}) rotate(10)"><rect x="-25" y="-38" width="50" height="76" rx="7" fill="#fff"/><rect x="-25" y="-38" width="50" height="15" rx="7" fill="${C.grass}"/><rect x="-25" y="-29" width="50" height="6" fill="${C.grass}"/><rect x="-19" y="-16" width="30" height="5" rx="2.5" fill="${C.ink}" opacity=".45"/><rect x="-19" y="-7" width="38" height="3.5" rx="1.75" fill="${C.ink}" opacity=".2"/><rect x="-19" y="0" width="34" height="3.5" rx="1.75" fill="${C.ink}" opacity=".2"/><rect x="-19" y="12" width="38" height="14" rx="5" fill="${C.tGrass}"/></g>`;
  const g = Object.assign({}, ADULTS.G3, { x: w * 0.83, y: floor - 81 * 1.12, s: 1.12, flip: true, aL: 18, aR: -58, face: 'laugh' });
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" aria-hidden="true">
    <circle cx="${w * 0.52}" cy="${h * 0.5}" r="${h * 0.46}" fill="${C.sun}"/>
    <rect x="${w * 0.08}" y="${floor - 3}" width="${w * 0.88}" height="10" rx="5" fill="${C.ink}" opacity=".08"/>
    <g transform="translate(${w * 0.27},${floor - 178}) scale(1.0)">${jarSVG({ lab: C.tomato })}</g>
    ${adult(g)}${kid(k)}${held}
  </svg>`;
}

// ---------- CSS ----------
const css = (fontHref, size) => `<link rel="stylesheet" href="${fontHref}">
<style>
@page { size: ${size.css}; margin: 0 }
:root{--ink:${C.ink};--wash:${C.wash};--line:#C9D2E0;--mut:#5B667C}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:"Nunito Sans","Helvetica Neue",Arial,sans-serif;color:var(--ink)}
symbol{overflow:visible}
.sk{fill:var(--sk)} .hr{fill:var(--hr)} .sh{fill:var(--sh)} .pa{fill:var(--pa)} .so{fill:var(--so)} .hw{fill:var(--hw)} .ck{fill:${C.tomato};opacity:.28}
.page{width:${size.w}in;height:${size.h}in;position:relative;overflow:hidden;page-break-after:always;break-after:page;background:#fff}
.page:last-child{page-break-after:auto;break-after:auto}
h1,h2,h3,h4,p{margin:0}
/* ---- card: 2.5 x 3.5 in cut size, 1/8 in white margin inside the cut line (rule 9) ---- */
.card{width:2.5in;height:3.5in;padding:.125in;position:relative}
.panel{width:100%;height:100%;border-radius:12px;border:2px solid var(--m);background:#fff;overflow:hidden;display:flex;flex-direction:column;position:relative}
.hd{background:var(--m);height:24px;flex:0 0 24px;display:flex;align-items:center;justify-content:space-between;gap:3px;padding:0 4px;position:relative}
.age{background:#fff;color:var(--ink);border-radius:20px;height:16px;padding:0 6px;font-weight:800;font-size:7.6px;letter-spacing:.06em;text-transform:uppercase;display:flex;align-items:center;gap:3px;white-space:nowrap;min-width:0}
.age em{font-style:normal;font-weight:700;letter-spacing:.02em;text-transform:none;font-size:7.6px}
.ssi{width:9px;height:9px;color:var(--ink);flex:0 0 9px}
.en{background:#fff;color:var(--ink);border-radius:20px;height:16px;padding:0 6px 0 5px;display:flex;align-items:center;gap:3px;font-weight:800;font-size:7.4px;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;flex:none}
.mt{width:12px;height:9px;display:block}
.meta{height:15px;flex:0 0 15px;display:flex;align-items:center;justify-content:space-between;padding:0 7px;background:var(--t);font-size:6.9px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap;position:relative}
.meta span{display:flex;align-items:center;gap:2.5px}
.mi{width:8px;height:8px;color:var(--ink);flex:0 0 8px}
.ti{display:flex;align-items:flex-start;justify-content:space-between;gap:5px;padding:5px 7px 2px 8px;position:relative}
.tt{flex:1;min-width:0}
.cat{font-weight:800;font-size:7px;letter-spacing:.11em;text-transform:uppercase;opacity:.75;margin-bottom:1px}
.ti h3{font-family:"Fredoka","Nunito Sans",sans-serif;font-weight:600;font-size:18px;line-height:1.02;letter-spacing:-.005em}
.ci{flex:0 0 32px;width:32px;height:32px;border-radius:50%;background:var(--t);display:flex;align-items:center;justify-content:center;color:var(--m)}
.card[style*="--m:${C.sun}"] .ci,.card[style*="--m:${C.sun}"] .talk .ti2{color:#A87700}
.ci .i{width:20px;height:20px;display:block}
.bd{padding:2px 8px 0;display:flex;flex-direction:column;gap:4px;position:relative;z-index:1}
.row{position:relative}
.row b,.talk b{display:block;font-weight:800;font-size:7px;letter-spacing:.11em;text-transform:uppercase;opacity:.75;margin-bottom:0}
.row p{font-size:11px;line-height:1.26;font-weight:600}
.talk{background:var(--t);border-radius:8px;padding:4px 7px 4px 5px;display:flex;gap:4px;align-items:flex-start;margin-top:1px;position:relative}
.talk>div{flex:1;min-width:0}
.talk .ti2{flex:0 0 13px;width:13px;height:13px;color:var(--m);margin-top:1px}
.talk p{font-size:11px;line-height:1.22;font-weight:800}
.sp{flex:1;min-height:0}
.fl{display:flex;align-items:center;gap:3px;padding:0 5px 3px 6px;position:relative}
.fg{display:inline-flex;align-items:center;gap:2px;height:13px;padding:0 4px 0 3px;border-radius:10px;font-size:6.4px;font-weight:800;letter-spacing:.02em;text-transform:uppercase;white-space:nowrap}
.fg.fgu{background:var(--ink);color:#fff}.fg.fal{background:#fff;border:1.2px solid var(--ink)}.fg.fnb{background:var(--t)}
.fi{width:8px;height:8px;flex:0 0 8px}
.fl i{margin-left:auto;padding-left:2px;display:flex;align-items:center;gap:2px;font-style:normal;font-size:6.4px;font-weight:800;letter-spacing:0;opacity:.75;white-space:nowrap}
.ft{padding:3px 7px 4px 7px;display:flex;gap:4px;align-items:flex-start;border-top:1.5px solid var(--t);position:relative}
.ft .si{flex:0 0 10px;width:10px;height:10px;color:var(--ink);opacity:.7;margin-top:.5px}
.ft span{font-size:7.3px;line-height:1.26;font-weight:700;flex:1}
/* blank card */
.en3{gap:2px;padding:0 5px;font-size:6.4px;letter-spacing:.03em}
.tk{width:8px;height:8px;border-radius:50%;border:1.3px solid var(--ink);display:inline-block;flex:0 0 8px;margin-left:2px}
.en3 .tk:first-child{margin-left:0}
.mw{justify-content:flex-start;gap:6px}.mw span{flex:1;gap:3px}.wm1{flex:1;height:10px;border-bottom:1px solid var(--ink);opacity:.5;display:block}
.ed .wm1{background:#fff;opacity:1;border:0;border-radius:3px}
.wl{height:22px;border-bottom:1.3px solid var(--line)}
.wl.big{height:24px}
.wlines{display:flex;flex-direction:column}
.wlines .ln{display:block;height:15px;border-bottom:1.3px solid var(--line)}
.blank .talk .wlines .ln{border-color:rgba(29,41,64,.22)}
.blank .ci{color:var(--ink)}
.wbox{background:${C.wash};border-radius:5px;margin-top:1px}
.talk .wbox{background:rgba(255,255,255,.75)}
.ed .wl.big{background:${C.wash};border-radius:5px;border-bottom:0;height:24px;margin-top:2px}
.fl3{gap:3px;font-size:6.4px;font-weight:800;letter-spacing:.02em;text-transform:uppercase}
.fl3 .tk{margin-left:0}.fl3 span{margin-right:5px;white-space:nowrap}
/* card back */
.back .panel{background:var(--m);border-color:var(--m);align-items:center;justify-content:center}
.bgdots{position:absolute;inset:0;width:100%;height:100%}
.bk{position:relative;text-align:center;display:flex;flex-direction:column;align-items:center}
.bkc{width:140px;height:140px;border-radius:50%;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center}
.bk1,.bk2{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;letter-spacing:-.03em;line-height:.9;color:var(--ink)}
.bk1{font-size:28px}.bk2{font-size:34px}
.bks{margin-top:11px;background:#fff;color:var(--ink);border-radius:20px;padding:3px 10px;font-weight:800;font-size:8px;letter-spacing:.12em;text-transform:uppercase}
.bkb{position:absolute;bottom:14px;left:0;right:0;display:flex;justify-content:center}
.lgb{height:11px;display:block}
/* sheet */
.sheet .cell{position:absolute;width:2.5in;height:3.5in}
.gl{position:absolute;display:block;border:0 solid #9AA5B8}
.gl.v{border-left-width:1px}.gl.h{border-top-width:1px}.gl.box{border-width:1px}
.cm{position:absolute;display:block;background:var(--mut)}
.cm.v{width:.8px}.cm.h{height:.8px}
.sll{display:flex;align-items:center;gap:6px}.lgs{height:7px;display:block}.sci{width:9px;height:9px;color:var(--mut)}
.sl{position:absolute;white-space:nowrap;text-align:center;font-size:6.8px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
/* content pages */
.cp .cpin{position:absolute;left:.5in;right:.5in;top:.5in;bottom:.72in;display:flex;flex-direction:column}
.phd{display:flex;justify-content:space-between;align-items:center;padding-bottom:10px;border-bottom:2px solid var(--wash);margin-bottom:16px}
.pe{font-weight:800;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--mut)}
.ph{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:38px;line-height:1.02;letter-spacing:-.025em;margin-bottom:14px}
.lead{font-size:15px;line-height:1.5;font-weight:600;max-width:6.4in}
.lgh{height:.24in;display:block}
.lgf{height:9px;display:block}
.pfl{display:flex;align-items:center;gap:8px}
.pf{position:absolute;left:.5in;right:.5in;bottom:.4in;display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:7.3px;font-weight:700;color:var(--mut);letter-spacing:.02em}
.hand{font-family:"Caveat",cursive;font-weight:700}
.kick{font-weight:800;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--mut);display:block;margin-bottom:4px}
.pill{display:inline-flex;align-items:center;gap:6px;border-radius:30px;padding:6px 13px;font-weight:800;font-size:12px}
.h4,.cp h4{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;letter-spacing:-.01em}
</style>`;

// Low-ink edition: white grounds, no tints, colorable line art (customer-voice rule 1).
const lowCss = `<style>
body.low *{background-color:transparent!important;box-shadow:none!important;color:${C.ink}!important;filter:none!important}
body.low .page{background:#fff!important}
body.low svg:not(.qr):not(.mt) *{fill:#fff!important;stroke:${C.ink}!important;stroke-width:1.1px!important;vector-effect:non-scaling-stroke;opacity:1!important}
body.low svg.mt rect{fill:${C.ink}!important}
/* SVG text stays filled ink, never outlined: stroked text makes Chromium write a Type 3 font into the PDF (print preflight G1) */
body.low :is(text, #svg-text-fill){fill:${C.ink}!important;stroke:none!important} /* :is() with an id gives id-level specificity, so this beats the line-art rule above */
body.low .i,body.low .mi,body.low .fi,body.low .ssi,body.low .si,body.low .ti2,body.low .sci{overflow:visible}
body.low .panel{border-color:var(--m)}
body.low .hd{border-bottom:2px solid var(--m)}
body.low :is(.age,.en,.meta,.talk,.ci,.fg,.pill,.bkc,.bks,.inside,.st,.gu,.wn,.bdg,.enx,.ct,.agp,.agt,.agc,.sri,.tube,.sbox,.tpb,.wy,.tn,.dic,.ms,.mslot,.wd,.wc,.wnote,.ixh,.ctq2,.fqi,.fqh,.bn,.bnq,.nxi,.sn,.gbox,.pbox,.cxh,.vd,.sfile,.snum,.chip){outline:1.2px solid #9AA5B8;outline-offset:-1.2px}
body.low .agh{border-bottom:2px solid var(--m)}
body.low .fg.fgu{outline-color:${C.ink}}
body.low .mk{outline:1.5px solid ${C.ink};outline-offset:-1.5px}
body.low .ctf{border:3px solid ${C.ink}}
body.low .wlab,body.low .slab{border:3px solid var(--m)}
body.low .rl{outline:.8px dashed #9AA5B8;outline-offset:3px;border:3px solid var(--m)}
body.low .rli{border-color:#9AA5B8!important}
body.low .back .panel{border-color:var(--m)}
body.low .fan .panel,body.low .mc .panel{background-color:#fff!important}
</style>`;

// ---------- pages ----------
function coverPage() {
  const chips = G0() ? [`${nMain()} cards · 2 age bands`, 'Ages 1–5, sorted by age', 'Calm · Medium · Wiggly', 'A talk prompt on every card'] : ['150 cards + 36 seasonal', 'Ages 1–12, sorted by age', 'Calm · Medium · Wiggly', 'A talk prompt on every card'];
  const fan = G0() ? [['b35', CARDS.b35[16], 17], ['b13', CARDS.b13[12], 13], ['b35', CARDS.b35[0], 1], ['b13', CARDS.b13[3], 4], ['b35', CARDS.b35[2], 3]]
    : [['b812', CARDS.b812[0], 1], ['b58', CARDS.b58[1], 2], ['summer', MINI.summer.cards[1], 2], ['b13', CARDS.b13[3], 4], ['b35', CARDS.b35[2], 3]];
  const fanHtml = fan.map(([k, cd, n], i) => `<div class="fan" style="transform:rotate(${(i - 2) * 9}deg)">${card(cd, k, n)}</div>`).join('');
  return pg('cover', `
  <div class="cv-top">${logo('lockup-horizontal', 'lgc')}<span class="cv-tag">${site('playbeforepixels.com · ')}${edName()}</span></div>
  <h1 class="cv-h"><span>I’m</span><span>bored!</span></h1>
  <div class="cv-sub">Play Cards</div>
  <p class="cv-p">${nMain()} screen-free play ideas for ages ${AGES()}, each with what you need, how to play, a talk prompt and a safety note.</p>
  <div class="cv-art">${coverArt(560, 470)}</div>
  <div class="cv-fan">${fanHtml}</div>
  <div class="cv-chips">${chips.map((c, i) => `<span class="pill" style="background:${[C.tSun, C.tGrass, C.tSky, C.tPlum][i]}">${c}</span>`).join('')}</div>
  <div class="cv-extra"><span><b>Prep:</b> about ${G0() ? 15 : 30} min to print and cut every card with a paper trimmer, then use them again and again. No time? Print one sheet, or point and pick from the card index with no cutting.</span></div>
  <div class="cv-ft">${VERSION} · ${COPY}</div>
  `);
}
const coverCss = `<style>
.cover{background:${C.wash}}
.cv-top{position:absolute;left:.55in;right:.55in;top:.5in;display:flex;justify-content:space-between;align-items:center}
.lgc{height:.36in;display:block}
.cv-tag{font-weight:800;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--mut)}
.cv-h{position:absolute;left:.5in;top:.95in;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:124px;line-height:.84;letter-spacing:-.045em}
.cv-h span{display:block}
.cv-sub{position:absolute;left:.55in;top:3.02in;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:52px;letter-spacing:-.03em;color:${C.tomato}}
.cv-p{position:absolute;left:.57in;top:3.9in;width:3.35in;font-size:14.5px;line-height:1.45;font-weight:600}
.cv-art{position:absolute;right:.1in;top:1.05in;width:4.5in;height:3.78in}
.cv-fan{position:absolute;left:0;right:0;top:5.2in;height:3.9in}
.fan{position:absolute;top:0;left:${'calc(50% - 1.25in)'};width:2.5in;height:3.5in;transform-origin:50% 175%}
.fan .card{padding:0}.fan .panel{box-shadow:0 8px 18px rgba(29,41,64,.13)}
.cv-chips{position:absolute;left:.55in;right:.55in;bottom:1.18in;display:flex;flex-wrap:wrap;gap:8px}
.cv-ft{position:absolute;left:.57in;right:.55in;bottom:.3in;font-size:7.3px;font-weight:700;color:var(--mut)}
.cv-extra{position:absolute;left:.57in;right:.55in;bottom:.52in;font-size:12px;line-height:1.45;font-weight:600;background:#fff;border-radius:14px;padding:9px 14px}
</style>`;

function welcomeArt() {
  const W = 400, H = 190, Fl = 176;
  const k = Object.assign({}, KIDS.B, { x: 250, y: Fl - 27 * 1.05, s: 1.05, aL: 150, aR: -150, face: 'laugh' });
  const g = Object.assign({}, ADULTS.G1, { x: 110, y: Fl - 51 * 0.85, s: 0.85, legs: 'kneel', aL: 20, aR: -70, face: 'laugh' });
  const blocks = `<use href="#block-1" transform="translate(330,${Fl - 20}) scale(.72)"/><use href="#block-3" transform="translate(372,${Fl - 20}) scale(.72)"/><use href="#block-2" transform="translate(351,${Fl - 61}) scale(.72)"/>`;
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="100%" aria-hidden="true"><circle cx="220" cy="118" r="70" fill="${C.tSun}"/><rect x="20" y="${Fl}" width="370" height="6" rx="3" fill="${C.ink}" opacity=".08"/>${adult(g)}${kid(k)}${blocks}</svg>`;
}
const N_BLANK = () => BKEYS().reduce((s, k) => s + (9 - CARDS[k].length % 9) % 9, 0) + (SKEYS().length ? 9 : 0);
function welcomePage(guide) {
  const inside = [
    ...(G0() ? [[String(nMain()), 'play cards in 2 age bands: 1–3 and 3–5']] : [['150', 'play cards in 4 age bands: 1–3, 3–5, 5–8, 8–12'], ['36', 'seasonal cards: 18 summer + 18 rainy-day']]),
    [String(N_BLANK()), `blank “your idea” cards${LOW ? ' to write on' : ' you can type in or write on'}`],
    [String(dividerList().length), 'box dividers: ages, kinds of play, favorites, blanks'],
    ['12', 'jar labels, including energy jars and blanks'],
    [String(BKEYS().length + SKEYS().length), 'card-back designs for double-sided printing'],
    ['1', 'Today’s Play Menu choice board'],
    ['3', 'Our Play Week planners: example, Monday and Sunday start'],
  ];
  const steps = [['Print', 'Only the sheets you need, at 100% (actual size).'], ['Cut & store', 'About 1 min a sheet with a trimmer. Jar, box or ring.'], ['Offer two', 'Or let your child pull one from the jar.'], ['Play & talk', 'Use the talk line, then follow their lead.']];
  const body = `
  <p class="lead">“I’m bored!” isn’t a problem you have to fix. It’s a pause, and pauses are where children start inventing. These cards give that pause a gentle nudge: one simple idea, the few everyday things you need, and one thing to say while you play.</p>
  <div class="wgrid">
    <div class="why">
      <div class="whyi"><span class="wn" style="background:${C.tSky};color:${C.sky}">${icon('talk')}</span><div><h4>Talk is built in</h4><p>Every card has a talk line. The back-and-forth (your question, their answer, your answer back) turns an activity into time together.</p></div></div>
      <div class="whyi"><span class="wn" style="background:${C.tGrass};color:${C.grass}">${icon('star')}</span><div><h4>Sorted by age and energy</h4><p>Pick your child’s age band, then ask: calm, medium or wiggly? Matching the mood makes a “yes” more likely.</p></div></div>
      <div class="whyi"><span class="wn" style="background:${C.tTomato};color:${C.tomato}">${icon('safe')}</span><div><h4>Safety on every card</h4><p>Every card has its own safety line and follows the rules on page ${guide.safety}. Every card for ages 1–3 uses only things too big to fit through a toilet-paper tube.</p></div></div>
      <div class="whyi"><span class="wn" style="background:${C.tSun};color:#A87700">${icon('kitchen')}</span><div><h4>Made from everyday things</h4><p>Pots, socks, boxes, paper, a walk outside. ${nFree()} of the ${nAll()} cards need nothing you have to buy.</p></div></div>
      <div class="wart">${welcomeArt()}</div>
    </div>
    <div class="inside"><span class="kick">What’s inside</span>
      ${inside.map(([n, t]) => `<div class="in"><b>${n}</b><span>${t}</span></div>`).join('')}
      <div class="in fmt"><span>${LOW ? 'Low-ink edition: white background, line art to color, write-in blanks.' : 'Color edition: type-in (fillable) blank cards, labels, planners and certificate.'} The pack comes in color and low-ink files, each in US Letter and A4.</span></div>
    </div>
  </div>
  <div class="steps">${steps.map(([h, t], i) => `<div class="st"><span class="sn" style="background:${[C.sun, C.grass, C.sky, C.plum][i]};color:${i ? '#fff' : C.ink}">${i + 1}</span><h4>${h}</h4><p>${t}</p></div>`).join('')}</div>
  <div class="gu"><div class="gut"><span class="kick">Prep budget</span><p><b>About ${G0() ? 15 : 30} minutes</b> to print and cut all the cards with a paper trimmer, then they last for years (laminating is optional). <b>No time today?</b> Print one sheet, or read titles from the card index on page ${guide.index} and let your child pick: no cutting at all.</p></div><div class="gut"><span class="kick">Your job as the grown-up</span><p>You don’t have to entertain. Set out the things on the card, play for the first few minutes, then let your child lead. The grown-up guide on page ${guide.guide} has the rest.</p></div></div>`;
  return contentPage('welcome', 'Start here', 'Boredom is where<br>play begins.', body);
}
const welcomeCss = `<style>
.welcome .lead{margin-bottom:16px}
.wgrid{display:grid;grid-template-columns:1.25fr 1fr;gap:24px}
.whyi{display:flex;gap:12px;margin-bottom:12px}
.wn{flex:0 0 38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.wn .i{width:21px;height:21px}
.whyi h4,.st h4{font-size:16px;margin:0 0 2px}
.whyi p{font-size:12px;line-height:1.42;font-weight:600}
.wart{height:1.3in;margin-top:0}
.inside{background:${C.wash};border-radius:18px;padding:14px 18px}
.in{display:flex;gap:10px;align-items:baseline;padding:4px 0;border-bottom:1px solid #E1E7F1;font-size:12px;font-weight:600;line-height:1.3}
.in b{flex:0 0 30px;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:19px;color:#C4401F}
.in.fmt{border:0;font-weight:700;font-size:10.8px;padding-top:8px;line-height:1.4}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:14px}
.st{background:#fff;border:2px solid ${C.wash};border-radius:16px;padding:10px 12px}
.sn{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:14px;margin-bottom:5px}
.st p{font-size:11.2px;line-height:1.38;font-weight:600}
.gu{margin-top:auto;background:${C.tSun};border-radius:18px;padding:12px 18px;display:grid;grid-template-columns:1fr 1fr;gap:20px}
.gu p{font-size:11.6px;line-height:1.45;font-weight:600}
</style>`;

// Grown-up guide (customer-voice rules 14, 15, 27, 28, 32)
function guidePage(guide) {
  const talk = [
    ['Pause and wait', 'Count to five in your head before you jump in. The pause is their turn to talk, point or show you.'],
    ['Say what you see', '“You stacked it so tall!” Describe what they are doing instead of asking question after question.'],
    ['Repeat and add one word', 'They say “truck.” You say “big truck!” Their words, plus one more.'],
  ];
  const practise = ['Taking turns and waiting', 'Trying an idea and changing it', 'Big moves: running, balancing, throwing', 'Listening and noticing', 'Putting plans and feelings into words', 'Finishing something they started'];
  const body = `
  <div class="gd2">
    <div class="gbox" style="background:${C.tSky}"><span class="kick">Set up in 2 minutes</span><ol class="gol"><li>Print one sheet for your child’s age band (page guide on page ${guide.tips}).</li><li>Cut it, or skip cutting: point and pick from the card index.</li><li>Put the cards in a jar, a box or a pocket.</li><li>Next time you hear “I’m bored!”, offer two cards.</li></ol></div>
    <div class="gbox" style="background:${C.tGrass}"><span class="kick">What your child is practicing</span><ul class="gul">${practise.map(p => `<li>${p}</li>`).join('')}</ul><p class="gsm">That’s all it is: ordinary play. No scores, no levels, nothing to pass.</p></div>
  </div>
  <span class="kick" style="margin-top:14px">Three talk lines that work at every age</span>
  <div class="gt3">${talk.map(([h, t], i) => `<div class="gt"><span class="gtn" style="background:${[C.sun, C.grass, C.sky][i]};color:${i ? '#fff' : C.ink}">${i + 1}</span><h4>${h}</h4><p>${t}</p></div>`).join('')}</div>
  <div class="gd2" style="margin-top:14px">
    <div class="gbox" style="background:${C.tPlum}"><span class="kick">When interest fades</span><p>Stop while it’s still fun and put the card back for another day. Try the easier version in the card index, or let your child change the rules. Many children lose interest after a few minutes, and that’s fine.</p><p class="gbig">Most children love 2–3 of these; that’s normal. Playing a favorite again and again is the point.</p></div>
    <div class="gbox" style="background:${C.tSun}"><span class="kick">Every language counts</span><p class="gbig">Talk, sign, sing and read in the language you know best. Every language counts.</p><p>A sign, a point or a device tap counts as communicating too; answer it as you would words. You don’t need to be chatty: reading the talk line word for word, or playing quietly side by side, counts too.</p></div>
  </div>
  <div class="gd2" style="margin-top:14px">
    <div class="gbox" style="background:${C.tTomato}"><span class="kick">When you hear “I’m bored!”</span><p>Try: “I hear you. Want to pick one of two cards, or think for a minute first?” Boredom isn’t an emergency. A few quiet minutes often turn into your child’s own idea, and that counts as a win.</p></div>
    <div class="gbox" style="background:${C.wash}"><span class="kick">Siblings of different ages</span><p>Pick a card from the younger child’s band and give the older one a job: reader, rule-keeper or helper. Small parts from older cards stay out of reach of children under 3.</p></div>
  </div>
  <div class="gd3">
    <div><h4>Tired grown-up?</h4><p>Every card has a 2-minute version in the card index (page ${guide.index}): no setup, played from the couch or the floor. Every play works from a chair, a bed or a wheelchair, and any sound play can be a see-it or feel-it play: flick the light for “stop.”</p></div>
    <div><h4>Easier or harder</h4><p>The card index also gives a “make it easier” and a “make it harder” line for every card, plus the age it usually starts from.</p></div>
    <div><h4>Helping cards are fun</h4><p>Kitchen & Helping cards are for fun together, never a consequence for saying “I’m bored.”</p></div>
  </div>`;
  return contentPage('guide', 'Grown-up guide · 1 of 2', 'The grown-up guide', body);
}
function pantryPage(guide) {
  const P = [
    ['Big pots and pans', ''], ['Big wooden spoons', ''], ['Plastic cups and bowls', ''], ['Big plastic tubs with lids', ''],
    ['Towels and dish towels', ''], ['Sheets and blankets', ''], ['Pillows and cushions', ''], ['Cardboard boxes', ''],
    ['A laundry basket', ''], ['Grown-up socks', ''], ['Soft toys', ''], ['A big soft ball', ''],
    ['Picture books', ''], ['Paper', ''], ['Palm-size crayons', 'too big for the tube test'], ['A flashlight', 'grown-up holds it for under-3s'],
    ['Empty plastic bottles', ''], ['Food boxes from the cupboard', ''], ['Rain boots and a raincoat', ''], ['Pencils and markers', 'ages 3+'],
    ['Painter’s tape', 'ages 3+'], ['A deck of cards', 'ages 5+'], ['Child-safe scissors', 'ages 5+'], ['Sidewalk chalk', 'ages 3+'],
    ['Bubbles', 'grown-up holds the liquid'],
  ];
  const picks = [['b13', 'Peekaboo Towel'], ['b13', 'Knee Bounce Ride'], ['b35', 'Animal Charades'], ['b35', 'I Spy Colors'], ['b58', 'Would You Rather?'], ['b58', 'One-Word Story'], ['b812', 'Twenty Questions'], ['b812', 'Silly Debate']]
    .map(([k, t]) => ({ k, cd: CARDS[k].find(c => c.t === t) })).filter(x => BKEYS().includes(x.k));
  if (G0()) for (const k of ['b13', 'b35']) for (const i of FIRST[k]) if (picks.length < 8 && !picks.some(x => x.cd === CARDS[k][i])) picks.push({ k, cd: CARDS[k][i] });
  const body = `
  <div class="pgrid">
    <div class="pbox"><span class="kick">Pantry list · 25 things most homes already have</span>
      <p class="psm">${nFree()} of the ${nAll()} cards use only everyday things like these (the “Nothing to buy” flag). Keep small things (the ones marked 3+ or 5+) away from children under 3.</p>
      <div class="pl">${P.map(([t, n]) => `<div class="pli"><i class="bx"></i><span>${t}${n ? ` <em>${n}</em>` : ''}</span></div>`).join('')}</div>
    </div>
    <div class="pside">
      <div class="pbox" style="background:${C.tTomato}"><span class="kick">Tired-grown-up plays</span><p class="psm">Played from the couch or the floor, with no setup. Every card’s 2-minute version is in the card index; here are eight to start.</p>
      ${picks.map(({ k, cd }) => `<div class="tg"><span class="tgb" style="background:${TH[k].m};color:${k === 'b13' ? C.ink : '#fff'}">${TH[k].name.replace('Ages ', '')}</span><div><b>${esc(cd.t)}</b><p>${esc(meta(cd)[8])}</p></div></div>`).join('')}</div>
      <div class="part">${welcomeArt()}</div>
    </div>
  </div>
  <div class="pnote"><div><h4>No time to cut?</h4><p>The card index pages are a no-cut menu: read a few titles aloud and let your child choose, or point to the picture of the kind of play.</p></div><div><h4>Swap freely</h4><p>No wooden spoon? Any big, sturdy kitchen tool works. Swap what the card asks for with what you have, and keep the card’s safety line.</p></div></div>`;
  return contentPage('pantry', 'Grown-up guide · 2 of 2', 'Pantry list &amp; tired-grown-up plays', body);
}
const guideCss = `<style>
.gd2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.gbox{border-radius:16px;padding:12px 16px}
.gbox p{font-size:12px;line-height:1.45;font-weight:600}
.gbox p+p{margin-top:6px}
.gbig{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800!important;font-size:15px!important;line-height:1.25!important}
.gol,.gul{margin:0;padding-left:18px;font-size:12px;line-height:1.45;font-weight:600}
.gol li,.gul li{margin-bottom:3px}
.gsm{font-size:11px!important;margin-top:4px;opacity:.9}
.gt3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.gt{border:2px solid ${C.wash};border-radius:16px;padding:11px 13px}
.gtn{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:14px;margin-bottom:5px}
.gt h4{font-size:16px;margin-bottom:2px}.gt p{font-size:11.6px;line-height:1.42;font-weight:600}
.gd3{margin-top:auto;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;background:${C.wash};border-radius:16px;padding:12px 16px}
.gd3 h4{font-size:14px;margin-bottom:2px}.gd3 p{font-size:11.2px;line-height:1.42;font-weight:600}
.pgrid{display:grid;grid-template-columns:1.1fr 1fr;gap:16px}
.pbox{background:${C.wash};border-radius:16px;padding:12px 16px}
.psm{font-size:11.2px;line-height:1.42;font-weight:600;margin-bottom:8px}
.pl{display:grid;grid-template-columns:1fr;gap:0}
.pli{display:flex;gap:7px;align-items:center;font-size:11.4px;font-weight:700;padding:3px 0;border-bottom:1px solid #E1E7F1}
.pli em{font-style:normal;font-weight:600;color:var(--mut);font-size:10.4px}
.bx{width:11px;height:11px;border:1.4px solid ${C.ink};border-radius:3px;flex:0 0 11px;display:inline-block}
.tg{display:flex;gap:8px;align-items:flex-start;padding:5px 0;border-bottom:1px solid rgba(29,41,64,.1)}
.tgb{flex:0 0 38px;text-align:center;border-radius:10px;font-weight:800;font-size:9.5px;padding:2px 0}
.tg b{font-size:12px;font-weight:800}.tg p{font-size:11px;line-height:1.35;font-weight:600}
.part{height:1.75in;margin-top:10px}
.pnote{margin-top:auto;display:grid;grid-template-columns:1fr 1fr;gap:18px;background:${C.tSun};border-radius:16px;padding:12px 16px}
.pnote h4{font-size:14px;margin-bottom:2px}.pnote p{font-size:11.2px;line-height:1.42;font-weight:600}
</style>`;

function anatomyPage() {
  const sample = CARDS.b35[16]; // Feelings Freeze
  const marks = [
    [1, 'Age band and starting age', 'Color plus the words, and the age it usually starts from.'],
    [2, 'Energy level', 'One, two or three bars: calm, medium or wiggly.'],
    [3, 'Prep, mess, play time', 'Setup time, how messy it gets and roughly how long it lasts.'],
    [4, 'Kind of play', 'Eight kinds, each with its own picture and divider.'],
    [5, 'You need', 'Everyday things. Gather them first.'],
    [6, 'Try it', 'One or two short steps. Change anything you like.'],
    [7, 'Talk', 'One thing to say or ask while you play, in any language.'],
    [8, 'Who and what', '“With a grown-up” or “Can do alone,” plus “Nothing needed” or “Nothing to buy.”'],
    [9, 'Safety line', 'Read it before you start, every time.'],
  ];
  const bands = BANDS.filter(b => BKEYS().includes(b.key)).map(b => `<div class="bdg" style="background:${TH[b.key].t}"><span style="background:${TH[b.key].m}"></span><b>${b.label}</b></div>`).join('');
  const energies = [['c', 'Calm', 'Sit-down play for winding down.'], ['m', 'Medium', 'Up-and-about: pretend, building, helping.'], ['w', 'Wiggly', 'Big-body play, indoors or out.']];
  const cats = Object.entries(CATS).map(([k, v]) => `<div class="ct">${icon(k)}<span>${v.name}</span></div>`).join('');
  const body = `
  <div class="an">
    <div class="an-card"><div class="scale">${card(sample, 'b35', 17, { marks: true })}</div></div>
    <div class="an-leg">${marks.map(([n, h, t]) => `<div class="lg"><span class="mk s">${n}</span><div><h4>${h}</h4><p>${t}</p></div></div>`).join('')}</div>
  </div>
  <div class="an-row"><span class="kick">Age bands, always with a word label</span><div class="bands">${bands}${SKEYS().length ? `<div class="bdg" style="background:${C.tTomato}"><span style="background:${C.tomato}"></span><b>Summer</b></div><div class="bdg" style="background:${C.wash}"><span style="background:${C.ink}"></span><b>Rainy day</b></div>` : ''}</div>
  <p class="note">Bands overlap on purpose. Children move between them, so try the band above or below whenever a card fits your child.</p></div>
  <div class="an-row"><span class="kick">Three energy levels</span><div class="ens">${energies.map(([e, h, t]) => `<div class="enx"><div class="enh"><span class="en">${meter(e)}${h}</span></div><p>${t}</p></div>`).join('')}</div>
  <p class="note">Wiggly cards count toward active play. The World Health Organization’s 2019 guidelines recommend at least 180 minutes a day of varied physical activity for children aged 1–4, spread across the day.</p></div>
  <div class="an-row"><span class="kick">Eight kinds of play</span><div class="cats">${cats}</div></div>`;
  return contentPage('anatomy', 'How the cards work', 'Read a card in<br>five seconds.', body);
}
const anatomyCss = `<style>
.anatomy .ph{margin-bottom:10px}
.an{display:flex;gap:44px;align-items:flex-start;margin-bottom:6px}
.an-card{flex:0 0 3.25in;height:4.55in;position:relative;margin-left:22px}
.an-card .scale{position:absolute;left:0;top:0;width:240px;height:336px;transform:scale(1.3);transform-origin:0 0}
.marked .panel{overflow:visible}.marked .hd{border-radius:10px 10px 0 0}
.mk{position:absolute;width:15px;height:15px;border-radius:50%;background:${C.tomato};color:#fff;font-weight:800;font-size:9px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 2px #fff;z-index:3;top:50%;transform:translateY(-50%);left:-30px}
.mk.m2,.mk.m4{left:auto;right:-9px}
.mk.m4{top:14px}
.mk.m5,.mk.m6{top:7px;transform:none}
.fl .mk,.ft .mk{left:-30px}
.mk.s{position:static;flex:0 0 22px;width:22px;height:22px;font-size:11.5px;box-shadow:none;transform:none}
.an-leg{flex:1;padding-top:0}
.lg{display:flex;gap:10px;margin-bottom:6px}
.lg h4{font-size:14px;margin:0}
.lg p{font-size:11.2px;line-height:1.35;font-weight:600}
.an-row{margin-top:9px}
.bands{display:flex;flex-wrap:wrap;gap:7px}
.bdg{display:flex;align-items:center;gap:7px;border-radius:30px;padding:4px 11px 4px 5px;font-size:11.5px}
.bdg span{width:15px;height:15px;border-radius:50%}
.note{font-size:10.8px;line-height:1.42;font-weight:600;margin-top:5px}
.ens{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.enx{background:${C.wash};border-radius:14px;padding:8px 12px}
.enx .en{display:inline-flex;background:#fff;height:20px;font-size:9.5px;padding:0 9px 0 6px}
.enx .mt{width:15px;height:11px}
.enx p{font-size:11px;line-height:1.35;font-weight:600;margin-top:4px}
.cats{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}
.ct{display:flex;align-items:center;gap:7px;font-size:11.2px;font-weight:800;background:${C.wash};border-radius:12px;padding:6px 9px}
.ct .i{width:18px;height:18px;flex:0 0 18px;color:${C.ink}}
</style>`;

const FIRST = { b13: [3, 5, 16], b35: [0, 2, 16], b58: [1, 12, 18], b812: [0, 1, 22] };
function agesPage() {
  const P = [
    ['b13', 'Do it again!', 'Filling and dumping, stacking and knocking down, copying you, again and again.', 'Be the partner on the floor. Keep turns short, and repeat whatever gets a smile.', 'Short words and long pauses. Say what they’re doing (“In! Out!”), then wait for any sound, sign or point back.'],
    ['b35', 'Let’s pretend', 'Pretend worlds, chasing games, simple rules, and stories that change every minute.', 'Take a part in the story (customer, patient, passenger) and let your child direct.', 'Ask “what happens next?” and add one new word to what they say.'],
    ['b58', 'Let me try', 'Building, making, games with rules, and inventions of their own.', 'Set it up, then step back. Be the tester, the audience or the rule-checker.', 'Ask “why?” and “how did you figure that out?”, and give them time to answer.'],
    ['b812', 'My idea!', 'Projects, challenges, strategy, and real skills like cooking, fixing and planning.', 'Be the assistant, not the boss. Offer the time and materials, then admire the result.', 'Ask for their plan and their opinion, and share yours too.'],
  ];
  const PA = P.filter(([k]) => BKEYS().includes(k));
  const body = `<p class="lead">Every child plays differently, and age bands are a starting point, not a rule. Here is what play often looks like in each band, and the easiest way for a grown-up to join in.</p>
  <div class="ages${G0() ? ' two' : ''}">${PA.map(([k, h, play, role, talk]) => `<div class="agp" style="${tvars(TH[k])}">
    <div class="agh"><span>${TH[k].name}</span><h3>${h}</h3></div>
    <div class="agb"><div><span class="kick">Play looks like</span><p>${play}</p></div><div><span class="kick">Your part</span><p>${role}</p></div><div class="agt">${icon('talk', 'ti2')}<div><span class="kick">Talk tip</span><p>${talk}</p></div></div><div class="ag3"><span class="kick">Three to try first</span><div>${FIRST[k].map(i => `<span class="agc">${esc(CARDS[k][i].t)}</span>`).join('')}</div></div></div>
  </div>`).join('')}</div>
  ${G0() ? `<div class="gd2" style="margin-top:14px">
    <div class="gbox" style="background:${C.tSky}"><span class="kick">Between two bands?</span><p>Children move between bands all the time. Play a 3–5 card with a two-year-old and be the helper, or bring back a 1–3 favorite for a four-year-old. The card index gives an easier and a harder way for every card.</p></div>
    <div class="gbox" style="background:${C.tPlum}"><span class="kick">Big brothers and sisters</span><p>An older child can join any card as the reader, the rule-keeper or the helper. Keep small things from their games away from children under 3.</p></div>
  </div>
  <div style="height:1.6in;margin-top:10px">${byeArt()}</div>` : ''}
  <p class="ped">Every child plays and talks on their own timeline. If you have questions about your child’s development, talk with your pediatrician.</p>`;
  return contentPage('agespg', 'Play at every age', 'What play looks<br>like at each age.', body);
}
const agesCss = `<style>
.agespg .lead{margin-bottom:10px;font-size:13.5px}.agespg .ph{margin-bottom:10px}
.ages{display:grid;grid-template-columns:1fr 1fr;gap:14px;flex:1}
.ages.two{flex:0 0 auto;align-items:start}
.agp{border-radius:18px;background:var(--t);overflow:hidden;display:flex;flex-direction:column}
.agh{background:var(--m);padding:9px 16px}
.agh span{display:inline-block;background:#fff;color:var(--ink);border-radius:20px;padding:2px 9px;font-weight:800;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase}
.agh h3{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:25px;letter-spacing:-.02em;line-height:1.05;margin-top:3px;color:#fff}
.agp[style*="--m:${C.sun}"] .agh h3{color:${C.ink}}
.agb{padding:8px 14px 6px;display:flex;flex-direction:column;gap:5px}
.agb p{font-size:11.4px;line-height:1.36;font-weight:600}
.ag3 .agc{display:inline-block;background:#fff;border-radius:20px;padding:3px 10px;margin:0 5px 5px 0;font-size:11.5px;font-weight:800}
.agt{display:flex;gap:8px;background:#fff;border-radius:12px;padding:8px 11px}
.agt .ti2{flex:0 0 18px;width:18px;height:18px;color:var(--m)}
.agp[style*="--m:${C.sun}"] .agt .ti2{color:#A87700}
.ped{margin-top:8px;font-size:11.5px;font-weight:700;background:${C.wash};border-radius:12px;padding:8px 14px}
</style>`;

function tubeArt() {
  return `<svg viewBox="0 0 330 120" width="100%" height="100%" aria-hidden="true">
    <g transform="translate(20,20)"><rect x="0" y="0" width="54" height="86" rx="8" fill="#FFFFFF"/><ellipse cx="27" cy="4" rx="27" ry="8" fill="#E9C77A"/><ellipse cx="27" cy="4" rx="19" ry="4.5" fill="#FFFFFF"/><path d="M4 30 50 20M4 54 50 44M4 78 50 68" stroke="#E9C77A" stroke-width="3" stroke-linecap="round"/></g>
    <g transform="translate(135,62)"><use href="#block-4" transform="scale(.95)"/></g>
    <circle cx="135" cy="22" r="12" fill="${C.grass}"/><path d="M129 22l4 4 7-8" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <g transform="translate(250,70)"><circle r="9" fill="${C.sky}"/><circle cx="-3" cy="-2" r="1.6" fill="#fff"/><circle cx="3" cy="-2" r="1.6" fill="#fff"/><circle cx="-3" cy="3" r="1.6" fill="#fff"/><circle cx="3" cy="3" r="1.6" fill="#fff"/><rect x="18" y="-6" width="14" height="12" rx="3" fill="${C.plum}"/></g>
    <circle cx="258" cy="22" r="12" fill="${C.tomato}"/><path d="M253 17l10 10M263 17l-10 10" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
    <text x="135" y="118" text-anchor="middle" font-family="Nunito Sans, sans-serif" font-weight="800" font-size="12" fill="${C.ink}">Too big to fit: OK</text>
    <text x="258" y="118" text-anchor="middle" font-family="Nunito Sans, sans-serif" font-weight="800" font-size="12" fill="${C.ink}">Fits: too small</text>
  </svg>`;
}
function safetyPage() {
  const R = [
    ['safe', 'A grown-up is always in charge', 'Every card assumes an adult nearby. For ages 1–3, stay within reach the whole time. Every card for under-5s says “With a grown-up.”'],
    ['build', 'Small parts and under-3s', 'For children under 3, use only things too big to fit through a toilet-paper tube (about 1.25 in / 3.2 cm across). Every 1–3 card is written this way. Older cards that use small things (coins, dice, tape, seeds, dough) say so: keep those away from younger brothers and sisters.'],
    ['rain', 'Water', 'Any amount of water means a grown-up within arm’s reach, the whole time. Empty tubs and buckets straight after play.'],
    ['star', 'No balloons', 'Balloons are not safe for children under 8, so no card in this pack uses them.'],
    ['pretend', 'Cords, strings and scarves', 'Nothing long enough to wrap around a neck: no long strings, cords, ties or long scarves. Sheets and blankets are draped, never tied.'],
    ['kitchen', 'Food and the kitchen', 'Sit down to eat. No whole grapes, nuts, popcorn, hard candy or marshmallows for young children; cut food thin and soft. Check allergies. Grown-ups handle sharp knives, the stove and the oven.'],
    ['outside', 'Outdoors', 'Play well away from the street. No berries or mushrooms. Hats, water and shade in the sun. No puddle play in thunder or lightning.'],
    ['games', 'Hide-and-seek', 'Never hide in appliances, chests, trunks or cars.'],
  ];
  const body = `<p class="lead">Every play follows these safety rules, and every card has its own safety line at the bottom. They apply to every card, including the ones you write yourself.</p>
  <div class="srules">${R.map(([ic, h, t], i) => `<div class="sr"><span class="sri" style="background:${[C.tTomato, C.tSun, C.tSky, C.tPlum, C.tGrass][i % 5]}">${icon(ic)}</span><div><h4>${h}</h4><p>${t}</p></div></div>`).join('')}</div>
  <div class="tube"><div class="tubeart">${tubeArt()}</div><div><span class="kick">The toilet-paper tube test</span><h4>If it fits through the tube, it’s too small for under-3s.</h4><p>Keep a cardboard tube in the play basket and test anything new before a toddler plays with it. A tube is about 1.25 in (3.2 cm) across.</p></div></div>
  <div class="sbox"><div><h4>The cards and pieces</h4><p>Grown-up keeps the cut pieces and the jar. Every cut piece in this pack is 1.5 in or larger. Printed cards are paper, not toys for children who still mouth things: round laminated corners. Hook-and-loop dots: check them before each play; remove any that lift. No loose dots for under-3s.</p></div>
  <div><h4>You know your child best</h4><p>Skip or change any card that doesn’t suit your child, your space or your day. These cards are ideas for play at home. They are not medical or developmental advice.</p></div></div>`;
  return contentPage('safety', 'Safe play, every time', 'Safety first,<br>then fun.', body);
}
const safetyCss = `<style>
.safety .lead{margin-bottom:12px}
.srules{display:grid;grid-template-columns:1fr 1fr;gap:10px 22px}
.sr{display:flex;gap:11px}
.sri{flex:0 0 34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:${C.ink}}
.sri .i{width:18px;height:18px}
.sr h4,.sbox h4{font-size:14.5px;margin:0 0 2px}
.sr p,.sbox p{font-size:11.4px;line-height:1.42;font-weight:600}
.tube{margin-top:14px;display:flex;gap:22px;align-items:center;background:${C.tSun};border-radius:18px;padding:12px 20px}
.tubeart{flex:0 0 3.1in;height:1.1in}
.tube h4{font-size:17px;line-height:1.15;margin:2px 0 4px}
.tube p{font-size:11.4px;line-height:1.42;font-weight:600}
.sbox{margin-top:auto;display:grid;grid-template-columns:1fr 1fr;gap:18px;background:${C.wash};border-radius:18px;padding:14px 20px}
</style>`;

function tipsPage(G) {
  const T = [
    ['Print', 'Print at 100% or “actual size,” not “fit to page.” Cardstock (65–110 lb / 176–300 gsm) makes sturdy cards. Pick the US Letter or A4 file to match your paper.'],
    ['Double-sided (optional)', `Print the backs page for your age band once for each card sheet. Put the printed stack back in the tray (test one sheet first to see which way it goes) and print the fronts on the other side.`],
    ['Cut', 'Straight lines only: 4 cuts each way per sheet with a paper trimmer or scissors. The white border inside each card hides small wobbles. Grown-up keeps the pieces.'],
    ['Laminate', 'Pouches (3–5 mil) make cards last for years and wipe clean. Leave a thin sealed edge, then round the corners so there are no sharp points.'],
    ['Hook-and-loop dots', 'For the Play Menu (ages 3+): a hook dot on each card back, loop dots on the board. Check dots before each play; remove any that lift. Store spare dots out of reach: they’re small parts.'],
    ['Store', 'A big jar with one of the labels, a 3 × 5 in recipe box with the dividers, or a binder ring through a punched corner. Keep rings away from little ones.'],
  ];
  const W = [
    ['The jar pull', 'Your child pulls a card. Don’t like it? Put it back and pull once more.'],
    ['Pick one of two', 'Lay out two cards and let your child choose. Choosing is half the fun.'],
    ['Energy check', 'Ask “calm, medium or wiggly?” first, then pull from that energy.'],
    ['Play Menu', 'Put four cards on the menu in the morning: calm, wiggly, together and free choice.'],
    ['Big helper', 'An older child reads a 1–3 card aloud and plays it with a younger one, with a grown-up close by.'],
    G0() ? ['Move up a band', 'When the 1–3 cards feel easy, mix in a few 3–5 cards. Keep the under-3 size rule for little siblings.'] : ['Season swap', 'Add the summer or rainy-day set when the weather turns.'],
  ];
  const S = ['Cardstock, 65–110 lb / 176–300 gsm', 'A paper trimmer or scissors', 'Laminator and 3–5 mil pouches (optional)', 'Corner rounder (optional)', 'Hook-and-loop dots (optional, ages 3+)', 'A big jar or a 3 × 5 in recipe box'];
  const body = `<div class="tp">${T.map(([h, t], i) => `<div class="tpi"><span class="tn">${i + 1}</span><div><h4>${h}</h4><p>${t}</p></div></div>`).join('')}</div>
  <div class="tpg"><div class="tpb"><span class="kick">Page guide · print only what you need</span>${G.map(([h, n]) => `<div class="pgr"><span>${h}</span><b>${n}</b></div>`).join('')}</div>
  <div class="tpb"><span class="kick">Handy supplies</span>${S.map(t => `<div class="sup">${icon('star', 'i')}<span>${t}</span></div>`).join('')}<p class="tpn">${LOW ? 'You have the low-ink file: white backgrounds and line art your child can color in.' : 'Saving ink? Use the low-ink files: white backgrounds and line art your child can color in.'}</p></div></div>
  <div class="ways"><span class="kick">Six ways to play with the cards</span><div class="wg">${W.map(([h, t], i) => `<div class="wy" style="background:${[C.tSun, C.tGrass, C.tSky, C.tPlum, C.tTomato, C.wash][i]}"><h4>${h}</h4><p>${t}</p></div>`).join('')}</div></div>`;
  return contentPage('tips', 'Print, cut, laminate & store', 'Make them last.', body);
}
const tipsCss = `<style>
.tips .ph{margin-bottom:10px}
.tp{display:grid;grid-template-columns:1fr 1fr;gap:10px 22px}
.tpi{display:flex;gap:10px}
.tn{flex:0 0 26px;height:26px;border-radius:50%;background:${C.ink};color:#fff;display:flex;align-items:center;justify-content:center;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:13px}
.tpi h4,.wy h4{font-size:14.5px;margin:0 0 1px}
.tpi p{font-size:11.2px;line-height:1.4;font-weight:600}
.tpg{display:grid;grid-template-columns:1.15fr 1fr;gap:14px;margin-top:10px}
.tpb{background:${C.wash};border-radius:16px;padding:10px 14px}
.pgr{display:flex;justify-content:space-between;gap:10px;font-size:10.4px;font-weight:700;padding:1.5px 0;border-bottom:1px solid #E1E7F1}
.pgr b{font-weight:800;white-space:nowrap}
.sup{display:flex;gap:7px;align-items:center;font-size:11.2px;font-weight:700;padding:2px 0}
.sup .i{width:12px;height:12px;color:#A87700;flex:0 0 12px}
.tpn{font-size:10.8px;font-weight:600;line-height:1.4;margin-top:6px}
.ways{margin-top:auto}
.wg{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}
.wy{border-radius:14px;padding:9px 12px}
.wy p{font-size:11px;line-height:1.38;font-weight:600}
</style>`;

// dividers: 2.4in wide, 3.5in body + 0.45in tab, one SVG shape with a single cut line
function divider(d, idx) {
  const W = 230.4, H = 379.2, T = 43.2, tw = 104, r = 14, rt = 11;
  const a = [14, (W - tw) / 2, W - tw - 14][idx % 3];
  const shape = `M0 ${T + r}Q0 ${T} ${r} ${T}H${a}V${rt}Q${a} 0 ${a + rt} 0H${a + tw - rt}Q${a + tw} 0 ${a + tw} ${rt}V${T}H${W - r}Q${W} ${T} ${W} ${T + r}V${H - r}Q${W} ${H} ${W - r} ${H}H${r}Q0 ${H} 0 ${H - r}Z`;
  const inner = d.blank
    ? `<span class="dic">${icon('pen')}</span>${LOW ? '<div class="dwl"></div><div class="dwl sm"></div>' : `<div class="dwl"${F('div_title', false, 16)}></div><div class="dwl sm"${F('div_note', false, 10)}></div>`}`
    : `${d.num ? `<span class="dic dnum">${d.num}</span>` : `<span class="dic">${icon(d.ic)}</span>`}<h3>${d.h}</h3><p>${d.p}</p>`;
  return `<div class="dv" style="--m:${d.m};--t:${d.t}">
    <svg class="dsvg" viewBox="-2 -2 ${W + 4} ${H + 4}" aria-hidden="true"><path d="${shape}" fill="${d.m}"/><rect x="7" y="${T + 7}" width="${W - 14}" height="${H - T - 14}" rx="${r - 5}" fill="${d.t}"/><path d="${shape}" fill="none" stroke="#9AA5B8" stroke-width="1"/></svg>
    <div class="dtab" style="left:${a / 96}in;width:${tw / 96}in"><span${d.blank ? F('div_tab', false, 9) : ''}>${d.tab}</span></div>
    <div class="dbody">${inner}</div>
  </div>`;
}
function dividerList() {
  return [
    ...BANDS.filter(b => BKEYS().includes(b.key)).map(b => ({ m: TH[b.key].m, t: TH[b.key].t, tab: b.label, num: b.ages, h: b.label, p: `${CARDS[b.key].length} play cards` })),
    ...Object.entries(CATS).map(([k, v]) => ({ m: C.ink, t: C.wash, tab: v.short, ic: k, h: v.name, p: 'Kind of play' })),
    ...(SKEYS().length ? [{ m: C.tomato, t: C.tTomato, tab: 'Summer', ic: 'sun', h: 'Summer', p: '18 cards' },
      { m: C.ink, t: C.wash, tab: 'Rainy day', ic: 'rain', h: 'Rainy day', p: '18 cards' }] : []),
    { m: C.tomato, t: C.tTomato, tab: 'Favorites', ic: 'heart', h: 'Family favorites', p: 'The ones we play again and again' },
    { m: C.grass, t: C.tGrass, tab: 'Tried it', ic: 'star', h: 'Tried it!', p: 'Played at least once' },
    { m: C.sky, t: C.tSky, tab: 'Save for later', ic: 'later', h: 'Save for later', p: 'Not today, maybe next time' },
    { m: C.plum, t: C.tPlum, tab: 'Our ideas', ic: 'pen', h: 'Our own ideas', p: 'Cards we made up ourselves' },
    ...[[C.sun, C.tSun], [C.grass, C.tGrass], [C.sky, C.tSky], [C.plum, C.tPlum], [C.tomato, C.tTomato], [C.ink, C.wash]].map(([m, t]) => ({ m, t, tab: '', blank: true })),
  ];
}
function dividerPages() {
  const D = dividerList();
  const gx = 0.14, gy = 0.3, H = 3.95, x0 = (SZ.w - (3 * 2.4 + 2 * gx)) / 2, y0 = (SZ.h - (2 * H + gy)) / 2 + 0.12;
  const pages = chunk(D, 6);
  return pages.map((grp, pi) => {
    const cells = grp.map((d, i) => `<div class="dcell" style="left:${x0 + (i % 3) * (2.4 + gx)}in;top:${y0 + Math.floor(i / 3) * (H + gy)}in">${divider(d, pi * 6 + i)}</div>`).join('');
    const what = pi === pages.length - 1 ? (LOW ? 'blank dividers: write your own' : 'blank dividers: type or write your own') : 'cut around the tab';
    return pg('divs', `<div class="dhd">${logo('lockup-horizontal', 'lgh')}<span class="pe">Box dividers · ${what} · ${pi + 1} of ${pages.length}</span></div>${cells}<div class="dft">${logo('wordmark', 'lgf')}<span>${site('playbeforepixels.com · ')}${VERSION} · Grown-up keeps the pieces · ${COPY}</span></div>`);
  });
}
const dividerCss = `<style>
.divs .dhd{position:absolute;left:.5in;right:.5in;top:.4in;display:flex;justify-content:space-between;align-items:center}
.dft{position:absolute;left:.5in;right:.5in;bottom:.35in;display:flex;gap:8px;align-items:center;font-size:7.3px;font-weight:700;color:var(--mut)}
.dcell{position:absolute;width:2.4in;height:3.95in}
.dv{position:relative;width:2.4in;height:3.95in}
.dsvg{position:absolute;left:-2px;top:-2px;width:calc(2.4in + 4px);height:calc(3.95in + 4px);overflow:visible}
.dtab{position:absolute;top:0;height:.45in;display:flex;align-items:center;justify-content:center}
.dtab span{background:#fff;color:var(--ink);border-radius:20px;padding:2px 8px;font-weight:800;font-size:9.5px;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;min-width:.7in;min-height:15px;text-align:center}
.dbody{position:absolute;left:0;right:0;top:.45in;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 16px}
.dic{width:66px;height:66px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;color:var(--m);margin-bottom:12px}
.dv[style*="--m:${C.sun}"] .dic{color:#A87700}
.dic .i{width:34px;height:34px}
.dnum{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:22px;letter-spacing:-.02em;color:var(--ink)!important}
.dbody h3{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:25px;line-height:1.02;letter-spacing:-.02em}
.dbody p{font-size:11.5px;font-weight:700;margin-top:6px}
.dwl{width:1.9in;height:.42in;border-bottom:1.5px solid var(--ink);background:#fff;border-radius:6px 6px 0 0}
.dwl.sm{height:.3in;margin-top:8px}
</style>`;

function labelPages() {
  const ways = [[C.tomato, C.tTomato], [C.sun, C.tSun], [C.sky, C.tSky], [C.grass, C.tGrass]];
  const round = ([m, t]) => { const dark = m === C.sun; return `<div class="rl" style="--m:${m};--t:${t}"><div class="rli${dark ? ' dk' : ''}">
    <span class="rlk">${logo(dark ? 'wordmark' : 'wordmark-white', 'lgr')}</span><span class="rl1">I’m</span><span class="rl2">bored!</span><span class="rl3">Pull a card.<br>Play together.</span>
    <span class="rld">${[C.sun, C.grass, C.sky, C.plum, C.tomato].filter(c => c !== m).map(c => `<i style="background:${c}"></i>`).join('')}</span></div></div>`; };
  const p1 = contentPage('labels', 'Jar labels · 1 of 2', 'Round jar labels', `<p class="lead">Four colorways. Cut on the dashed circle and stick to the jar with clear tape or glue dots. Label size: 3.4 in / 8.6 cm. Grown-up keeps the jar.</p>
    <div class="rgrid">${ways.map(round).join('')}</div>`);
  const mini = [[C.sun, -14, 0], [C.grass, -5, 1], [C.sky, 5, 2], [C.tomato, 14, 3]].map(([c, r, i]) => `<g transform="translate(${60 + i * 58},${92 + Math.abs(i - 1.5) * 10}) rotate(${r})"><rect x="-34" y="-50" width="68" height="96" rx="9" fill="#fff"/><rect x="-34" y="-50" width="68" height="20" rx="9" fill="${c}"/><rect x="-34" y="-38" width="68" height="8" fill="${c}"/><rect x="-25" y="-20" width="40" height="7" rx="3.5" fill="${C.ink}" opacity=".5"/><rect x="-25" y="-7" width="50" height="4.5" rx="2.25" fill="${C.ink}" opacity=".2"/><rect x="-25" y="2" width="44" height="4.5" rx="2.25" fill="${C.ink}" opacity=".2"/><rect x="-25" y="18" width="50" height="16" rx="6" fill="${c}" opacity=".25"/></g>`).join('');
  const wide = (m, t, name) => `<div class="wlab" style="--m:${m};--t:${t}"><div class="wl1"><span class="wlt">I’m bored!</span><span class="wls">${name}</span></div><div class="wl2">${icon('talk')}<span>Pull a card · Play together · Talk about it</span></div><svg class="wlart" viewBox="0 0 290 180" aria-hidden="true">${mini}</svg></div>`;
  const small = (h, e, m, t) => `<div class="slab" style="--m:${m};--t:${t}"><span class="en">${e ? meter(e) : icon('heart', 'mt')}${h}</span><b>${e ? `${h} jar` : 'Done & loved'}</b><p>${e === 'c' ? 'Quiet, sit-down play' : e === 'm' ? 'Up-and-about play' : e === 'w' ? 'Big-body play' : 'Cards we loved go here'}</p></div>`;
  const blankLab = (m, t, i) => `<div class="slab bl" style="--m:${m};--t:${t}"><span class="en">${icon('pen', 'mt')}Our jar</span>${LOW ? '<div class="bline"></div><div class="bline sm"></div>' : `<div class="bline"${F('label_' + i, false, 18)}></div><div class="bline sm"${F('label_note_' + i, false, 10)}></div>`}</div>`;
  const p2 = contentPage('labels', 'Jar labels · 2 of 2', 'Wrap labels &amp; energy jars', `<p class="lead">Use one big jar, or split the cards into three energy jars so your child can choose the mood first. The last two labels are blank: name a jar yourself.</p>
    <div class="wgrid2">${wide(C.ink, C.wash, 'Play cards for our family')}${wide(C.plum, C.tPlum, 'Screen-free play ideas')}</div>
    <div class="sgrid">${small('Calm', 'c', C.sky, C.tSky)}${small('Medium', 'm', C.grass, C.tGrass)}${small('Wiggly', 'w', C.tomato, C.tTomato)}${small('Loved', null, C.sun, C.tSun)}${blankLab(C.plum, C.tPlum, 1)}${blankLab(C.ink, C.wash, 2)}</div>`);
  return [p1, p2];
}
const labelCss = `<style>
.rgrid{display:grid;grid-template-columns:3.4in 3.4in;gap:.3in .45in;justify-content:center;margin-top:10px}
.rl{width:3.4in;height:3.4in;border-radius:50%;outline:.8px dashed #9AA5B8;outline-offset:3px;background:var(--m);display:flex;align-items:center;justify-content:center}
.rli{width:2.9in;height:2.9in;border-radius:50%;border:2.5px solid rgba(255,255,255,.55);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center}
.rli.dk{border-color:rgba(29,41,64,.25);color:${C.ink}}
.rlk{margin-bottom:9px}.lgr{height:13px;display:block}
.rl1,.rl2{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;letter-spacing:-.04em;line-height:.86}
.rl1{font-size:40px}.rl2{font-size:58px}
.rl3{font-weight:800;font-size:19px;line-height:1.1;margin-top:8px}
.rld{display:flex;gap:5px;margin-top:9px}.rld i{width:12px;height:12px;border-radius:50%;outline:2px solid #fff}
.wgrid2{display:flex;flex-direction:column;gap:.2in;margin:4px 0 .22in}
.wlab{height:1.85in;border-radius:18px;background:var(--m);color:#fff;outline:.8px dashed #9AA5B8;outline-offset:3px;display:flex;flex-direction:column;justify-content:center;padding:0 .4in;position:relative;overflow:hidden}
.wlt{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:62px;letter-spacing:-.04em;line-height:.9;display:block}
.wls{font-weight:800;font-size:19px;letter-spacing:.06em;text-transform:uppercase;display:block;margin-top:6px}
.wlart{position:absolute;right:.25in;top:50%;transform:translateY(-50%);width:2.9in;height:1.7in}
.wl2{display:flex;align-items:center;gap:8px;margin-top:10px;font-weight:800;font-size:19px}
.wl2 .i{width:20px;height:20px}
.sgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:.22in}
.slab{height:1.6in;border-radius:16px;background:var(--t);border:5px solid var(--m);outline:.8px dashed #9AA5B8;outline-offset:3px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;padding:0 .22in}
.slab .en{display:inline-flex;align-items:center;gap:5px;background:#fff;border-radius:20px;height:21px;padding:0 9px 0 7px;font-weight:800;font-size:9.5px;letter-spacing:.08em;text-transform:uppercase}
.slab .mt{width:15px;height:11px;display:block;color:var(--m)}
.slab[style*="--m:${C.sun}"] .mt{color:#A87700}
.slab b{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:25px;letter-spacing:-.02em;margin-top:6px;line-height:1.05}
.slab p{font-size:11.5px;font-weight:700}
.bline{width:100%;height:.36in;border-bottom:1.5px solid var(--ink);background:#fff;border-radius:6px 6px 0 0;margin-top:6px}
.bline.sm{height:.24in}
</style>`;

function menuPage() {
  const slots = [['Calm pick', C.sky, C.tSky], ['Wiggly pick', C.tomato, C.tTomato], ['Together pick', C.grass, C.tGrass], ['Free choice', C.plum, C.tPlum]];
  return contentPage('menu', 'Choice board · laminate me', 'Today’s Play Menu', `<p class="lead ml">Put one card in each space, then let your child choose. Done? Move it to the “Done & loved” jar.</p>
  <div class="mgrid">${slots.map(([h, m, t]) => `<div class="ms" style="--m:${m};--t:${t}"><span class="mh">${h}</span><div class="mslot"><i class="vd"></i><span>Card goes here</span></div></div>`).join('')}</div>
  <div class="mv"><b>${icon('safe', 'i')}Hook-and-loop dots (ages 3+):</b> Check dots before each play; remove any that lift. <b>For under-3s:</b> no loose dots. Lay each card on top of its space, or slide the board and cards into a page protector.</div>`);
}
const menuCss = `<style>
.menu .ph{margin-bottom:6px}.ml{font-size:13.5px;margin-bottom:8px}
.mgrid{display:grid;grid-template-columns:repeat(2,2.85in);gap:.1in .3in;justify-content:center}
.ms{background:var(--t);border-radius:16px;padding:5px 0 .1in;display:flex;flex-direction:column;align-items:center}
.mh{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:15px;color:var(--ink);margin-bottom:4px}
.mslot{width:2.6in;height:3.55in;border-radius:14px;border:2.5px dashed var(--m);background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}
.mslot span{font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--mut)}
.vd{width:.55in;height:.55in;border-radius:50%;background:var(--t);display:block}
.mv{margin-top:auto;background:${C.wash};border-radius:12px;padding:8px 14px;font-size:11.5px;font-weight:600;line-height:1.4}
.mv b{font-weight:800}.mv .i{width:13px;height:13px;vertical-align:-2px;margin-right:4px}
</style>`;

function weekPage(start, example) {
  const days = start === 'mon' ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const col = [C.tSun, C.tGrass, C.tSky, C.tPlum, C.tTomato, C.tSun, C.tGrass];
  const X = example ? [
    ['Pillow Mountain', 'w', '“Again! Higher mountain!”', 3], ['Teddy Picnic', 'c', '“Teddy wants MORE tea.”', 2], ['Rain Band', 'c', '“The rain is shouting now!”', 3],
    ['Where’s Teddy?', 'm', '“He’s hiding in my sock!”', 2], ['Animal Parade', 'w', '“I’m a stomping duck.”', 3], ['Sand Castle', 'm', '“A castle for the worms.”', 3], ['Reading Nest', 'c', '“Read it with the funny voice.”', 2],
  ] : null;
  const f = n => example ? '' : F(n, n.endsWith('said'), n.endsWith('said') ? 10 : 10);
  const rows = days.map((d, i) => {
    const ex = X && X[i];
    const ticks = ['c', 'm', 'w'].map(e => `<i class="${ex && ex[1] === e ? 'on' : ''}"${example ? '' : F(`wk_${start}_${i}_${e}`)}></i>`).join('');
    return `<div class="wr"><div class="wd" style="background:${col[i]}">${d}</div><div class="wc"${f(`wk_${start}_${i}_card`)}>${ex ? `<span class="hand wx">${esc(ex[0])}</span>` : ''}</div><div class="we">${ticks}</div><div class="wc wide"${f(`wk_${start}_${i}_said`)}>${ex ? `<span class="hand wx">${esc(ex[2])}</span>` : ''}</div><div class="wh">${[0, 1, 2].map(j => icon('star', 'wst' + (ex && j < ex[3] ? ' on' : ''))).join('')}</div></div>`;
  }).join('');
  const title = example ? 'Our Play Week: an example' : 'Our Play Week';
  const eyebrow = example ? 'Weekly planner · filled-in example' : `Weekly planner · ${start === 'mon' ? 'Monday' : 'Sunday'} start`;
  return contentPage('week', eyebrow, title, `
  <div class="wtop"><div><span class="kick">Week of</span><div class="mline"${example ? '' : F(`wk_${start}_week`)}>${example ? '<span class="hand wx">June 8</span>' : ''}</div></div><div><span class="kick">Player(s)</span><div class="mline"${example ? '' : F(`wk_${start}_players`)}>${example ? '<span class="hand wx">Our two, ages 2 and 4</span>' : ''}</div></div></div>
  <div class="wtab"><div class="wr wth"><div>Day</div><div>Card we played</div><div class="wec">Energy<br><span>C · M · W</span></div><div>Something they said</div><div>Loved it?</div></div>${rows}</div>
  <div class="wnote"><span class="hand">${example ? 'Your turn' : 'Why write it down?'}</span><p>${example ? 'This page shows one way to fill it in. The blank planners come next, with Monday and Sunday starts. One card a day is plenty, and some days will be empty. That’s fine too.' : 'The funny things children say while they play are easy to forget. A line a day becomes a little record of your year, and a reminder of which cards to play again.'}</p></div>`);
}
const weekCss = `<style>
.mline{height:28px;border-bottom:1.5px solid var(--line);display:flex;align-items:flex-end}
.wtop{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:14px}
.wtab{display:flex;flex-direction:column;gap:6px}
.wr{display:grid;grid-template-columns:1.05in 2.1in .78in 1fr .72in;gap:8px;align-items:stretch;min-height:.86in}
.wth{min-height:0;font-weight:800;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--mut);align-items:end}
.wth span{letter-spacing:.05em}
.wd{border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:14px}
.wc{border:1.5px solid #DCE3EE;border-radius:12px;background:#fff;display:flex;align-items:center;padding:0 10px}
.wx{font-size:22px;line-height:1.1;color:${C.ink}}
.we{display:flex;align-items:center;justify-content:center;gap:5px}
.we i{width:14px;height:14px;border-radius:50%;border:1.5px solid ${C.ink}}
.we i.on{background:${C.ink}}
.wh{display:flex;align-items:center;justify-content:center;gap:2px;color:#A87700}
.wst{width:17px;height:17px;opacity:.35}.wst.on{opacity:1}
.wnote{margin-top:auto;display:flex;gap:16px;align-items:center;background:${C.wash};border-radius:16px;padding:10px 18px}
.wnote .hand{font-size:24px;flex:0 0 1.8in}
.wnote p{font-size:12px;line-height:1.45;font-weight:600}
</style>`;

// Card index + grown-up companion: every card with its starting age, easier, harder and 2-minute version (rules 14, 15).
function companionPages() {
  const items = [];
  for (const k of [...BKEYS(), ...SKEYS()]) {
    const list = CARDS[k] || MINI[k].cards;
    items.push({ band: k, n: list.length });
    list.forEach((cd, i) => items.push({ k, cd, i }));
  }
  const est = it => {
    if (it.band) return 30;
    const m = meta(it.cd);
    const l = s => Math.ceil(s.length / 33);
    return 8 + 11 * Math.max(l(m[6]), l(m[7]), l(m[8]), Math.ceil(it.cd.t.length / 22) + 1);
  };
  const budget = 850; // same pagination in Letter and A4, so page numbers match across files
  const pages = []; let cur = [], h = 0; // budget tuned so Letter (the shorter page) never overflows; check.js confirms
  for (const it of items) {
    const e = est(it);
    if (h + e > budget || (it.band && h + e + 40 > budget)) { pages.push(cur); cur = []; h = 0; }
    cur.push(it); h += e;
  }
  if (cur.length) pages.push(cur);
  const row = ({ k, cd, i }) => {
    const m = meta(cd);
    return `<div class="cxr"><i class="bx"></i><span class="nn">${String(i + 1).padStart(2, '0')}</span><div class="c1"><b>${esc(cd.t)}</b><span class="c1m">${icon(cd.c, 'i')}${meter(cd.e)}${fromTxt(m[0])}${k === 'summer' || k === 'rainy' ? ` · ages ${cd.a}` : ''}</span></div><div class="c2">${esc(m[6])}</div><div class="c2">${esc(m[7])}</div><div class="c2 c3">${esc(m[8])}</div></div>`;
  };
  const head = `<div class="cxl">Tick a box when you’ve played a card. Each card’s safety line applies to all its versions.<span style="flex-basis:100%;height:2px"></span>${icon('build')}${icon('pretend')}${icon('move')}${icon('outside')}${icon('words')}${icon('music')}${icon('kitchen')}${icon('games')} = kind of play · bars = energy · No time to cut? Read titles aloud and let your child pick.</div>
  <div class="cxr cxth"><span></span><span></span><div class="c1">Card · starting age</div><div class="c2">Make it easier</div><div class="c2">Make it harder</div><div class="c2 c3">2-minute tired-grown-up version</div></div>`;
  return pages.map((grp, pi) => contentPage('index', `Card index &amp; grown-up companion · ${pi + 1} of ${pages.length}`, null,
    head + grp.map(it => it.band ? `<div class="cxh" style="${tvars(TH[it.band])}"><span>${TH[it.band].name}</span><em>${it.n} cards</em></div>` : row(it)).join('')));
}
const indexCss = `<style>
.index .phd{margin-bottom:8px}
.cxl{font-size:9.6px;font-weight:700;margin-bottom:6px;display:flex;align-items:center;gap:3px;flex-wrap:wrap;color:var(--mut)}
.cxl .i{width:12px;height:12px;color:${C.ink}}
.cxr{display:grid;grid-template-columns:12px 15px 1.45in 1fr 1fr 1fr;gap:7px;align-items:start;padding:2px 0 3px;border-bottom:1px solid #E6EBF3;font-size:8.8px;line-height:1.24;font-weight:600}
.cxth{font-weight:800;font-size:8px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut);border-bottom:1.5px solid ${C.ink};padding-bottom:3px}
.cxr .bx{width:10px;height:10px;border:1.3px solid ${C.ink};border-radius:3px;margin-top:1px;display:block}
.nn{font-size:8px;font-weight:800;color:var(--mut);margin-top:1px}
.c1 b{display:block;font-size:9.6px;font-weight:800;line-height:1.15}
.c1m{display:flex;align-items:center;gap:4px;font-size:8.2px;font-weight:700;color:var(--mut);margin-top:1px}
.c1m .i{width:11px;height:11px;color:${C.ink}}.c1m .mt{width:11px;height:8px;color:${C.ink}}
.c3{font-weight:700}
.cxh{display:flex;justify-content:space-between;align-items:center;margin-top:6px;border-left:6px solid var(--m);background:var(--t);border-radius:6px;padding:3px 10px}
.cxh span{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:14px}
.cxh em{font-style:normal;font-size:9px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}
</style>`;

function byeArt() {
  const Fl = 150;
  const k1 = Object.assign({}, KIDS.C, { x: 150, y: Fl - 27 * 1.05, s: 1.05, aL: 20, aR: -150, face: 'laugh' });
  const k2 = Object.assign({}, KIDS.E, { x: 370, y: Fl - 27 * 1.05, s: 1.05, aL: 150, aR: -150, face: 'joy' });
  const g = Object.assign({}, ADULTS.G4, { x: 260, y: Fl - 81 * 0.78, s: 0.78, aL: 20, aR: -140, face: 'smile' });
  return `<svg class="byesvg" viewBox="0 -50 520 210" aria-hidden="true"><rect x="40" y="${Fl}" width="440" height="6" rx="3" fill="${C.ink}" opacity=".07"/>${adult(g)}${kid(k1)}${kid(k2)}<g transform="translate(455,${Fl - 64}) scale(.36)">${jarSVG({ lab: C.grass })}</g></svg>`;
}
function certPage() {
  const k = Object.assign({}, KIDS.D, { x: 170, y: 250 - 27 * 1.5, s: 1.5, aL: 150, aR: -150, face: 'laugh' });
  const k2 = Object.assign({}, KIDS.B, { x: 330, y: 250 - 27 * 1.35, s: 1.35, aL: 140, aR: -30, face: 'joy' });
  const art = `<svg viewBox="0 0 520 260" width="100%" height="100%" aria-hidden="true"><circle cx="255" cy="150" r="108" fill="${C.tSun}"/>${[[60, 60], [470, 70], [90, 190], [450, 200], [255, 22]].map(([x, y]) => `<use href="#star" transform="translate(${x},${y}) scale(1.2)"/>`).join('')}${kid(k)}${kid(k2)}<g transform="translate(430,186) scale(.4)">${jarSVG({ lab: C.tomato })}</g></svg>`;
  return pg('cert', `<div class="ctf">
    <div class="ctl">${logo('lockup-horizontal', 'lgh')}<span class="pe">Fridge certificate · print, fill in, share</span></div>
    <div class="cta">${art}</div>
    <div class="ctk">Official</div>
    <h2 class="cth">Play Jar Star</h2>
    <p class="ctp">This certificate goes to</p>
    <div class="ctn"${F('cert_name', false, 22)}></div>
    <p class="ctp">for playing <span class="ctm">${[10, 25, 50, 100].map(n => `<i${F('cert_' + n)}></i>${n}`).join(' ')}</span> cards from the “I’m bored!” jar.</p>
    <div class="ctr"><div><span class="kick">Favorite card</span><div class="mline"${F('cert_fav', false, 11)}></div></div><div><span class="kick">Date</span><div class="mline"${F('cert_date', false, 11)}></div></div></div>
    <div class="ctq"><div class="ctq1"><span class="kick">Our top three cards</span>${[1, 2, 3].map(i => `<div class="ctli"><b>${i}</b><div class="mline"${F('cert_top' + i, false, 11)}></div></div>`).join('')}</div>
    <div class="ctq2"><span class="kick ctqk">${icon('talk', 'ctqi')}Best thing we said while we played</span><div class="ctqb"${F('cert_said', true, 12)}></div></div></div>
    <div class="ctb"><span>Pull a card. Play together.</span>${logo('mark', 'lgm')}<span>${site('playbeforepixels.com', 'Play Before Pixels')}</span></div>
    <div class="ctv">${VERSION} · ${COPY}</div>
  </div>`);
}
const certCss = `<style>
.cert{background:#fff}
.ctf{position:absolute;inset:.45in;border:10px solid ${C.sun};border-radius:28px;display:flex;flex-direction:column;align-items:center;text-align:center;padding:.3in .5in .16in}
.ctl{align-self:stretch;display:flex;justify-content:space-between;align-items:center}
.cta{width:5.2in;height:2.5in;margin-top:8px}
.ctk{font-weight:800;font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:#C4401F;margin-top:6px}
.cth{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:66px;letter-spacing:-.035em;line-height:1}
.ctp{font-size:17px;font-weight:700;margin-top:12px}
.ctn{width:5in;height:.55in;border-bottom:2px solid ${C.ink};margin-top:6px}
.ctm{display:inline-flex;gap:6px;align-items:center;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-size:19px;margin:0 4px}
.ctm i{width:17px;height:17px;border:2px solid ${C.ink};border-radius:50%;display:inline-block;margin-left:6px}
.ctr{display:grid;grid-template-columns:1.6fr 1fr;gap:26px;width:5.6in;margin-top:18px;text-align:left}
.ctq{display:grid;grid-template-columns:1fr 1fr;gap:22px;width:6.3in;margin-top:20px;text-align:left}
.ctli{display:flex;align-items:flex-end;gap:8px}.ctli b{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-size:16px;color:#C4401F;padding-bottom:4px}.ctli .mline{flex:1}
.ctq2{background:${C.tSky};border-radius:16px;padding:12px 14px;position:relative}
.ctqk{display:flex;align-items:center;gap:6px}.ctqi{width:16px;height:16px;color:${C.sky};flex:0 0 16px}
.ctqb{height:1.0in}
.ctb{margin-top:auto;display:flex;gap:14px;align-items:center;font-weight:800;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--mut)}
.ctv{font-size:7px;font-weight:700;color:var(--mut);margin-top:6px}
.lgm{height:.35in;display:block}
</style>`;

function faqPage(guide) {
  const Q = [
    ['My child is between two age bands.', 'Use both. The bands overlap on purpose, and many cards work a year or two either side. The card index gives an easier and a harder version of every card.'],
    ['My child says no to every card.', 'Offer just two cards, or let them pull one without looking. A little boredom is fine too: it often turns into their own idea.'],
    ['Do I have to play too?', 'For ages 1–3, yes: you are the best toy in the room. For older children, start together, then step back and be the audience. Cards marked “Can do alone” still need a grown-up at home.'],
    ['Which pages should I print?', `Only what you need. The page guide on page ${guide.tips} lists every section.`],
    ['Color or low-ink?', LOW ? 'You are holding the low-ink file: white backgrounds and line art to color. The color file has the same cards in full color, with type-in blanks.' : 'Both have the same cards. Low-ink uses white backgrounds and line art to color; this color file adds type-in blanks.'],
    ['How do I type on the blanks?', LOW ? 'Use the color file: open it in a free PDF reader that supports fill-in forms (a computer is easiest), click a box and type. In this low-ink file, the blanks are for writing by hand.' : 'Open this file in a free PDF reader that supports fill-in forms (a computer is easiest), click a box and type, then save a copy. You can type text and tick circles; fonts, colors and pictures stay as they are.'],
    ['Can I print it again, or at a print shop?', 'Yes. Print as many copies as your household needs, at home or at a print shop. Grandparents and sitters who care for your child count as your household.'],
    ['Can a teacher, center or library use it?', 'Not yet. This file is licensed for one household. Classroom, child-care, library and group licenses are not available yet.'],
    ['Can I give it as a gift?', 'Yes. Print and cut the cards, put them in a jar with one of the labels, and give the jar. The family you give it to becomes the household this license covers.'],
    ['My child dislikes mess or loud noise.', 'Skip those cards, or use the easier version: a spoon instead of hands, a towel on the pot, watching first and joining later. Every child may pass.'],
    ['Is it in other languages?', 'The cards are in English. Say the talk lines in the language you know best; a sign, a point or a device tap counts as an answer.'],
    ['Is there a screen version?', 'No, and that’s on purpose. The cards are paper so the play happens off-screen.'],
    ['Lost your file?', STORE() ? 'Use the link in your order email, or the re-download page on the START HERE sheet.' : 'Sign in on a web browser (not the shopping app) and open Purchases in your account: your files stay there.'],
  ];
  return contentPage('faq', 'Quick answers', 'Questions,<br>answered.', `<div class="fq">${Q.map(([q, a]) => `<div class="fqi"><h4>${q}</h4><p>${a}</p></div>`).join('')}</div>
  <div class="fqh"><b>Download or file trouble?</b> ${STORE() ? `Answers to common download and printing questions are at ${HELP}.` : 'Download on a computer or in your phone’s web browser, not in the shopping app: apps often can’t save files. Still stuck? Message us through the shop.'}</div>`);
}
const faqCss = `<style>
.faq .ph{margin-bottom:10px}
.fq{display:grid;grid-template-columns:1fr 1fr;gap:10px 20px}
.fqi{background:${C.wash};border-radius:14px;padding:9px 13px}
.fqi h4{font-size:14px;margin:0 0 2px;line-height:1.2}
.fqi p{font-size:11.2px;line-height:1.42;font-weight:600}
.fqh{margin-top:auto;background:${C.tSky};border-radius:14px;padding:10px 16px;font-size:11.8px;font-weight:600;line-height:1.45}
</style>`;

function bonusPage() {
  const next = [
    ['52 Play & Talk Cards', 'For ages 0–5: one simple play and one talk tip on every card.', C.tSun],
    ['Visual Routine Cards', 'Picture cards for mornings, bedtime and the moments in between.', C.tSky],
    ['100 Screen-Free Plays', 'Our activity book: 100 plays sorted by age, each with a talk line and a safety note.', C.tGrass],
  ];
  const top = STORE() ? `<div class="bn">
    <div class="bnq">${QR_BONUS}<span class="bnu">playbeforepixels.com/bonus/<br>${SLUG}</span></div>
    <div class="bnt"><p class="lead">Scan the code or type the link for this pack’s free companion: a printable seasonal mini-set of play cards and a short “play at this age” email each month.</p>
    <p class="bnp">We only ask for your email and your child’s birth month and year, never names. Unsubscribe any time.</p></div>
  </div>` : `<div class="bn"><div class="bnt"><p class="lead">Thank you for playing with us. If a card became a family favorite, we’d love to hear which one. You can leave a review in the shop where you bought this pack.</p><p class="bnp">Reviews are always optional, and honest ones help other families most.</p></div></div>`;
  return contentPage('bonus', STORE() ? 'Your free bonus' : 'Thank you', STORE() ? 'One more thing:<br>a free bonus.' : 'Happy playing!', `
  ${top}
  <span class="kick" style="margin-top:18px">More from Play Before Pixels${STORE() ? '' : ': look for these in our shop'}</span>
  <div class="nx">${next.map(([h, t, bg]) => `<div class="nxi" style="background:${bg}"><h4>${h}</h4><p>${t}</p></div>`).join('')}</div>
  <div class="bye">${byeArt()}<span class="hand">Happy playing!</span></div>
  <div class="legal">
    <p><b>${COPY}</b> All rights reserved. ${VERSION}.</p>
    <p>Print permission (personal license): you may print this file for your own household as often as you like, at home or at a print shop; grandparents and sitters who care for your child count as your household. Please don’t share, resell or post the file or its pages. Classroom, child-care, library and group licenses are not available yet.</p>
    <p>These cards are ideas for supervised play at home. They are parent education, not medical, developmental or professional advice, and they don’t replace the judgment of the grown-up in charge. Follow the safety page and every card’s safety line, and skip anything that doesn’t suit your child.</p>
    <p>Play Before Pixels is an independent small business. No brands, products or organizations are named or endorsed in this pack.</p>
  </div>`);
}
const bonusCss = `<style>
.bn{display:flex;gap:28px;align-items:center;background:${C.tSun};border-radius:22px;padding:20px 26px}
.bnq{flex:0 0 1.9in;background:#fff;border-radius:16px;padding:14px;display:flex;flex-direction:column;align-items:center;gap:8px}
.bnq .qr{width:1.5in;height:1.5in;display:block}
.bnu{font-size:8.5px;font-weight:800;text-align:center;word-break:break-all;line-height:1.3}
.bnt .lead{font-size:15px;margin-bottom:8px}
.bnp{font-size:12px;font-weight:700}
.nx{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.nxi{border-radius:16px;padding:12px 15px}
.nxi h4{font-size:16px;margin:0 0 4px}
.nxi p{font-size:11.5px;line-height:1.42;font-weight:600}
.bye{margin-top:14px;display:flex;align-items:center;justify-content:center;gap:10px}
.byesvg{width:4.4in;height:1.78in}
.bye .hand{font-size:40px;color:#C4401F;transform:rotate(-4deg)}
.legal{margin-top:auto;border-top:2px solid ${C.wash};padding-top:10px;display:flex;flex-direction:column;gap:5px}
.legal p{font-size:9.4px;line-height:1.45;font-weight:600}
</style>`;

// ---------- START HERE (one page; file 1 of the Etsy five-file set, rule 4) ----------
function startHereDoc() {
  const sfx = G0() ? '-ages-1-5' : '';
  const files = STORE()
    ? [[`START-HERE${sfx}.pdf`, 'This page.'], [`bored-play-cards${sfx}.pdf`, 'Color, US Letter. Type-in blanks.'], [`bored-play-cards${sfx}-A4.pdf`, 'Color, A4. Type-in blanks.'], [`bored-play-cards${sfx}-low-ink.pdf`, 'Low-ink, US Letter. Line art to color.'], [`bored-play-cards${sfx}-low-ink-A4.pdf`, 'Low-ink, A4. Line art to color.']]
    : [['1-START-HERE.pdf', 'This page.'], ['2-Color-US-Letter.pdf', 'Color, US Letter. Type-in blanks.'], ['3-Color-A4.pdf', 'Color, A4. Type-in blanks.'], ['4-Low-Ink-US-Letter.pdf', 'Low-ink, US Letter. Line art to color.'], ['5-Low-Ink-A4.pdf', 'Low-ink, A4. Line art to color.']];
  const page = pg('cp shp', `<div class="cpin">
  <header class="phd">${logo('lockup-horizontal', 'lgh')}<span class="pe">File 1 of 5 · Start here</span></header>
  <h2 class="ph">Start here</h2>
  <p class="lead">“I’m Bored” Play Cards: ${G0() ? `${nMain()} play cards for ages 1–5, in two age bands (1–3 and 3–5)` : '150 play cards for ages 1–12, plus 18 summer and 18 rainy-day cards'}. Every file has the same cards; pick the ink and the paper size you want.</p>
  <div class="shg">
    <div class="sbx"><span class="kick">Your 5 files</span>${files.map(([f, t], i) => `<div class="sfr"><span class="snum">${i + 1}</span><div><b>${f}</b><span>${t}</span></div></div>`).join('')}
      <p class="ssm"><b>US Letter</b> is for the USA and Canada. <b>A4</b> is for most other countries.</p></div>
    <div class="sbx" style="background:${C.tSky}"><span class="kick">Downloading</span><p><b>Use a web browser, not the shopping app.</b> Apps often can’t save files. On a computer or in your phone’s browser, tap each file to save it.</p>
      <p>${STORE() ? '<b>Lost a file?</b> Use the link in your order email, or scan the code below for the re-download page.' : '<b>Lost a file?</b> Sign in on a web browser and open Purchases in your account. Your files stay there.'}</p>
      ${STORE() ? '' : '<p><b>On a phone?</b> After you tap a file, open it from your Downloads folder. To type in the blanks, a computer is easiest.</p><p><b>File won’t open?</b> Try a free PDF reader, then download it again from Purchases.</p>'}
      ${STORE() ? `<div class="sqr"><div>${QR_HELP}<span>Re-download and help<br>${HELP}</span></div><div>${QR_BONUS}<span>Free bonus mini-set<br>${BONUS}</span></div></div>` : ''}</div>
  </div>
  <div class="shg">
    <div class="sbx" style="background:${C.tSun}"><span class="kick">Print settings</span><p>Print at <b>100% / actual size</b>, not “fit to page.” Use cardstock (65–110 lb / 176–300 gsm) for the cards. Print only what you need: the page guide is on page ${GUIDE[GK('letter')].tips} of each main file. Double-sided backs are optional; the steps are on the same page.</p><p><b>Prep:</b> about ${G0() ? 15 : 30} minutes to print and cut every card with a paper trimmer, then use them again and again. No time? Print one sheet today.</p></div>
    <div class="sbx" style="background:${C.tGrass}"><span class="kick">Typing in the blanks</span><p>The <b>color</b> files have type-in boxes on the blank cards, planners, blank labels, blank dividers and certificate. Open the file in a free PDF reader that supports fill-in forms (a computer is easiest), click a box, type, then save a copy.</p><p><b>What you can edit:</b> text boxes and tick circles, yes. Fonts, colors and pictures, no. The low-ink files have the same blanks to write on by hand.</p></div>
  </div>
  <div class="sbx sinside"><span class="kick">Inside every main file · page numbers</span><div class="sig">${GUIDE[GK('letter')].list.map(([h, n]) => `<div class="pgr"><span>${h}</span><b>${n}</b></div>`).join('')}</div></div>
  <div class="sbx sfull"><span class="kick">Print permission and safety</span><p>Print these files for your own household (grandparents and sitters count too), at home or at a print shop. <b>Print shops:</b> this customer may print copies for their family. Please don’t share or resell the files. Licenses for classrooms, centers and libraries are not available yet.</p><p>Before you play, read the safety page (page ${GUIDE[GK('letter')].safety} of each main file). Every play follows our published safety rules, and every card has its own safety line.</p></div>
  </div><footer class="pf"><span class="pfl">${logo('wordmark', 'lgf')}<span>${site('playbeforepixels.com · ')}“I’m Bored” Play Cards · ${VERSION}</span></span><span>${COPY}</span></footer>`);
  return page;
}
const shCss = `<style>
.shp .ph{margin-bottom:8px}.shp .lead{font-size:14px;margin-bottom:11px}
.shg{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
.sbx{background:${C.wash};border-radius:16px;padding:12px 16px}
.sbx p{font-size:11.2px;line-height:1.42;font-weight:600}
.sbx p+p{margin-top:6px}
.sfr{display:flex;gap:9px;align-items:center;padding:3px 0;border-bottom:1px solid #E1E7F1}
.snum{flex:0 0 22px;height:22px;border-radius:50%;background:${C.ink};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px}
.sfr b{display:block;font-size:11.2px;font-weight:800}.sfr span{font-size:10.6px;font-weight:600}
.ssm{margin-top:6px}
.sqr{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px}
.sqr>div{background:#fff;border-radius:12px;padding:8px;display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center}
.sqr .qr{width:1.05in;height:1.05in;display:block}
.sqr span{font-size:8px;font-weight:800;line-height:1.3;word-break:break-all}
.sfull{margin-top:auto}
.sinside .sig{display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:repeat(7,auto);grid-auto-flow:column;gap:0 18px}
.sinside{margin-bottom:12px}.sinside .pgr{display:flex;justify-content:space-between;gap:6px;font-size:9.4px;font-weight:700;padding:1.5px 0;border-bottom:1px solid #E1E7F1}
.sinside .pgr b{white-space:nowrap}
</style>`;

// ---------- assemble ----------
function bandFronts(key) {
  const list = CARDS[key] || MINI[key].cards;
  const fronts = list.map((cd, i) => card(cd, key, i + 1));
  while (fronts.length % 9) fronts.push(blankCard(key));
  const groups = chunk(fronts, 9);
  return groups.map((g, i) => cardSheet(g, `${TH[key].name} · sheet ${i + 1} of ${groups.length}`));
}
function seasonalBlankSheet() {
  const items = [...Array(5).fill('summer'), ...Array(4).fill('rainy')].map(k => blankCard(k));
  return cardSheet(items, 'Blank seasonal cards · your ideas');
}
function backsPages() {
  return [...BKEYS(), ...SKEYS()].map(k => cardSheet(Array.from({ length: 9 }, () => cardBack(k)), `Card backs · ${TH[k].name} · print on the back of each ${TH[k].name} sheet`));
}
const ALLCSS = [certCss, faqCss, coverCss, welcomeCss, guideCss, anatomyCss, agesCss, safetyCss, tipsCss, dividerCss, labelCss, menuCss, weekCss, indexCss, bonusCss, shCss].join('\n');
function doc(fontHref, size, pages, extra = '', title = '') {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title || `“I’m Bored” Play Cards${G0() ? ', Ages 1–5' : ''} · ${LOW ? 'Low-ink' : 'Color'} · ${size.name} · Play Before Pixels`}</title>
${css(fontHref, size)}
${ALLCSS}
${LOW ? lowCss : ''}
${extra}
</head><body class="${LOW ? 'low' : 'color'} ed-${ED}">
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${SYMBOLS.filter(x => !x.includes('id="speech"')).join('\n')}${ICONS.join('\n')}</defs></svg>
${pages.join('\n')}
</body></html>`;
}

// Sections in order; page numbers are computed so the page guide is always right.
const GUIDE = {};
const GK = (sz = SZ.key) => (G0() ? 'g0-' : '') + sz; // page numbers differ per tier and paper size
function mainPages() {
  const secs = [];
  const add = (name, pages, show = true) => secs.push({ name, pages: Array.isArray(pages) ? pages : [pages], show });
  const g0 = GUIDE[GK()] || { safety: 7, index: 40, guide: 3, tips: 8 };
  add('cover', coverPage(), false);
  add('Start here', welcomePage(g0));
  add('Grown-up guide & pantry list', [guidePage(g0), pantryPage(g0)]);
  add('How to read a card · play at every age', [anatomyPage(), agesPage()]);
  add('Safety rules', safetyPage());
  add('tips', null); // placeholder, filled below once page numbers are known
  add('Ages 1–3 cards', bandFronts('b13'));
  add('Ages 3–5 cards', bandFronts('b35'));
  if (!G0()) {
    add('Ages 5–8 cards', bandFronts('b58'));
    add('Ages 8–12 cards', bandFronts('b812'));
    add('Summer + rainy-day sets, seasonal blanks', [...bandFronts('summer'), ...bandFronts('rainy'), seasonalBlankSheet()]);
  }
  add('Card backs (optional)', backsPages());
  add('Card index & grown-up companion', companionPages());
  add('Box dividers', dividerPages());
  add('Jar labels', labelPages());
  add('Play Menu + weekly planners', [menuPage(), weekPage('mon', true), weekPage('mon', false), weekPage('sun', false)]);
  add('Play Jar Star certificate', certPage());
  add('Quick answers', faqPage(g0));
  add(STORE() ? 'Free bonus · more · license' : 'More from us · license', bonusPage());
  // number the pages
  let n = 1; const G = []; const at = {};
  for (const s of secs) {
    const len = s.name === 'tips' ? 1 : s.pages.length;
    s.from = n; s.to = n + len - 1; n += len;
    at[s.name] = s.from;
  }
  const g = { safety: at['Safety rules'], index: at['Card index & grown-up companion'], guide: at['Grown-up guide & pantry list'], tips: at['tips'] };
  const LABEL = { tips: 'Print, cut, laminate & store' };
  for (const s of secs) if (s.show) G.push([LABEL[s.name] || s.name, s.from === s.to ? String(s.from) : `${s.from}–${s.to}`]);
  secs.find(s => s.name === 'tips').pages = [tipsPage(G)];
  Object.assign(g, { at, list: G });
  return { pages: secs.flatMap(s => s.pages), g };
}
function buildMain() {
  // two passes: the first finds page numbers, the second prints them
  let r = mainPages();
  GUIDE[GK()] = r.g;
  r = mainPages();
  if (JSON.stringify(r.g) !== JSON.stringify(GUIDE[GK()])) throw new Error('page numbers moved between passes');
  return r.pages;
}

// PNG template assets for design apps (store bonus only; never zipped, never on Etsy)
function pngTemplatesDoc() {
  const items = [];
  for (const k of ['b13', 'b35', 'b58', 'b812', 'summer', 'rainy']) {
    items.push({ name: `blank-card-${k}`, w: 2.5, h: 3.5, html: blankCard(k) });
    items.push({ name: `card-back-${k}`, w: 2.5, h: 3.5, html: cardBack(k) });
  }
  [[C.tomato, 'tomato'], [C.sun, 'sun'], [C.sky, 'sky'], [C.grass, 'grass']].forEach(([m, n]) => {
    items.push({ name: `round-label-blank-${n}`, w: 3.4, h: 3.4, html: `<div class="rl" style="--m:${m};outline:0"><div class="rli${m === C.sun ? ' dk' : ''}"></div></div>` });
  });
  [[C.ink, C.wash, 'ink'], [C.plum, C.tPlum, 'plum']].forEach(([m, t, n]) => {
    items.push({ name: `wrap-label-blank-${n}`, w: 7.5, h: 1.85, html: `<div class="wlab" style="--m:${m};--t:${t};outline:0;height:1.85in"></div>` });
  });
  [[C.sun, C.tSun, 'sun'], [C.grass, C.tGrass, 'grass'], [C.sky, C.tSky, 'sky'], [C.plum, C.tPlum, 'plum'], [C.tomato, C.tTomato, 'tomato'], [C.ink, C.wash, 'ink']].forEach(([m, t, n]) => {
    items.push({ name: `divider-blank-${n}`, w: 2.4, h: 3.95, html: divider({ m, t, tab: '', ic: 'pen', h: '', p: '' }, 1).replace(/<div class="dbody">[\s\S]*?<\/div>\s*<\/div>$/, '</div>') });
  });
  fs.writeFileSync(path.join(GEN, 'png-templates-manifest.json'), JSON.stringify(items.map(i => i.name)));
  return items.map(it => `<section class="page asset" data-name="${it.name}" style="width:${it.w}in;height:${it.h}in">${it.html}</section>`);
}

// ---------- write ----------
fs.rmSync(GEN, { recursive: true, force: true });
fs.mkdirSync(GEN, { recursive: true });
const FONT = '../../../../brand/fonts/fonts.css';
const manifest = [];
// Output names per tier. Full (held until G1): the original names. Ages 1–5 edition (launches): "-ages-1-5" names and
// its own Etsy folder, etsy-upload-ages-1-5/ (5 files, the Etsy limit).
const pdfNames = sfx => ({
  store: { color: { letter: `bored-play-cards${sfx}.pdf`, a4: `bored-play-cards${sfx}-A4.pdf` }, low: { letter: `bored-play-cards${sfx}-low-ink.pdf`, a4: `bored-play-cards${sfx}-low-ink-A4.pdf` }, start: `START-HERE${sfx}.pdf` },
  etsy: { color: { letter: `etsy-upload${sfx}/2-Color-US-Letter.pdf`, a4: `etsy-upload${sfx}/3-Color-A4.pdf` }, low: { letter: `etsy-upload${sfx}/4-Low-Ink-US-Letter.pdf`, a4: `etsy-upload${sfx}/5-Low-Ink-A4.pdf` }, start: `etsy-upload${sfx}/1-START-HERE.pdf` },
});
BASE = '../../../../';
for (const tier of ['full', 'g0']) for (const ed of ['store', 'etsy']) {
  TIER = tier; ED = ed;
  const PDFNAME = pdfNames(tier === 'g0' ? '-ages-1-5' : '');
  const tp = tier === 'g0' ? 'g0-' : '';
  for (const low of [false, true]) {
    LOW = low;
    for (const sz of ['letter', 'a4']) {
      SZ = SIZES[sz];
      const pages = buildMain();
      const file = `${tp}${ed}-${low ? 'low' : 'color'}-${sz}.html`;
      fs.writeFileSync(path.join(GEN, file), doc(FONT, SZ, pages));
      manifest.push({ html: `build/gen/${file}`, pdf: PDFNAME[ed][low ? 'low' : 'color'][sz], tier, ed, low, size: sz, fields: !low, pages: pages.length });
    }
  }
  LOW = false; SZ = SIZES.letter;
  fs.writeFileSync(path.join(GEN, `${tp}${ed}-start-here.html`), doc(FONT, SZ, [startHereDoc()], '', `START HERE · “I’m Bored” Play Cards${tier === 'g0' ? ', Ages 1–5' : ''} · Play Before Pixels`));
  manifest.push({ html: `build/gen/${tp}${ed}-start-here.html`, pdf: PDFNAME[ed].start, tier, ed, low: false, size: 'letter', fields: false, start: true, pages: 1 });
}
TIER = 'full';
// ../source.html: the store color US Letter edition (BRAND deliverable), with paths from the product folder
ED = 'store'; LOW = false; SZ = SIZES.letter; BASE = '../../';
fs.writeFileSync(path.join(ROOT, 'source.html'), doc('../../brand/fonts/fonts.css', SZ, buildMain()));
BASE = '../../../../';
TIER = 'g0'; // website cover and mockup show the Ages 1–5 edition, the one that launches (G0)
fs.writeFileSync(path.join(GEN, 'cover.html'), doc(FONT, SZ, [coverPage()], '<style>body{width:8.5in}</style>'));
TIER = 'full';
fs.writeFileSync(path.join(GEN, 'png-templates.html'), doc(FONT, SZ, pngTemplatesDoc(), '<style>.asset{page-break-after:auto}</style>'));
fs.writeFileSync(path.join(GEN, 'manifest.json'), JSON.stringify(manifest, null, 1));

const counts = Object.fromEntries(Object.entries(CARDS).map(([k, v]) => [k, v.length]));
console.log('cards', counts, 'summer', MINI.summer.cards.length, 'rainy', MINI.rainy.cards.length, 'nothing-to-buy', `${N_FREE}/${N_ALL}`, 'blanks', N_BLANK());
console.log('pages', manifest.map(m => `${m.ed}-${m.low ? 'low' : 'color'}-${m.size}:${m.pages}`).join(' '));
console.log('guide', JSON.stringify(GUIDE));
fs.writeFileSync(path.join(GEN, 'guide.json'), JSON.stringify({ GUIDE, g0: { cards: { b13: CARDS.b13.length, b35: CARDS.b35.length } } }, null, 1));

// ---------- store images: mockup (1600x1200) and Etsy listing images (2000x2000 = 1000px pages at 2x) ----------
// Listing images use the Etsy-edition previews (no URL or QR anywhere in marketplace images).
let PFX = ''; // '' = full-edition previews, 'g0-' = Ages 1–5 previews
const PV = n => `${PFX}prev-etsy/p${String(n).padStart(2, '0')}.png`;
const PVS = n => `../../preview/${PFX ? 'ages-1-5/' : ''}p${String(n).padStart(2, '0')}.png`;
const PL = n => `${PFX}prev-etsy-low/p${String(n).padStart(2, '0')}.png`;
const GL = GUIDE.letter;
ED = 'etsy'; LOW = false; SZ = SIZES.letter;
const CD = (k, i, extra = '') => `<div class="mc ${extra}">${card((CARDS[k] || MINI[k].cards)[i], k, i + 1)}</div>`;
const BK = (k, extra = '') => `<div class="mc ${extra}">${cardBack(k)}</div>`;
const mkCss = `<style>
.mc{width:2.5in;height:3.5in;position:absolute}
.mc .card{padding:0}.mc .panel{box-shadow:0 10px 24px rgba(29,41,64,.16)}
.paper{position:absolute;background:#fff;box-shadow:0 14px 34px rgba(29,41,64,.16)}
.paper img{width:100%;height:100%;display:block}
.L{width:1000px;height:1000px;position:relative;overflow:hidden;background:${C.wash};font-family:"Nunito Sans",sans-serif;color:${C.ink}}
.L .lh{position:absolute;left:64px;top:56px;right:64px}
.L .lk{font-weight:800;font-size:15px;letter-spacing:.16em;text-transform:uppercase;color:${C.ink}}
.L h2{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:64px;line-height:.98;letter-spacing:-.035em;margin:8px 0 0}
.L .ls{font-size:22px;font-weight:600;line-height:1.4;margin-top:12px;max-width:760px}
.L .lg1{position:absolute;right:64px;bottom:48px;height:34px}
.L .chip{display:inline-flex;align-items:center;gap:8px;border-radius:40px;padding:10px 20px;font-weight:800;font-size:19px;background:#fff}
.blob{position:absolute;border-radius:50%}
.L .chip .i{width:22px;height:22px}
.tag{position:absolute;background:${C.ink};color:#fff;border-radius:12px;padding:6px 12px;font-weight:800;font-size:15px;letter-spacing:.06em;text-transform:uppercase}
</style>`;
const at = (x, y, r = 0, sc = 1) => `left:${x}px;top:${y}px;transform:rotate(${r}deg) scale(${sc});transform-origin:0 0`;
const place = (html, x, y, r, sc) => html.replace(/class="mc ?[^"]*"/, `class="mc" style="${at(x, y, r, sc)}"`);
function mockupPage() {
  return `<section class="page mock" style="width:1600px;height:1200px;background:${C.wash};position:relative;overflow:hidden">
    <div class="blob" style="width:1000px;height:1000px;left:-200px;top:-120px;background:${C.tSun}"></div>
    <div class="blob" style="width:640px;height:640px;right:-140px;top:-200px;background:${C.tSky}"></div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:300px;background:#E9EEF6"></div>
    <div class="paper" style="left:760px;top:170px;width:560px;height:725px;transform:rotate(6deg)"><img src="${PVS(GL.at['Ages 1–3 cards'])}"></div>
    <div style="position:absolute;left:120px;top:250px;width:560px;height:700px"><svg viewBox="-110 -110 220 300" width="100%" height="100%">${jarSVG({ lab: C.tomato })}</svg></div>
    <div style="position:absolute;left:170px;top:915px;width:470px;height:50px;border-radius:50%;background:rgba(29,41,64,.16);filter:blur(16px)"></div>
    ${place(BK(G0() ? 'b35' : 'b812'), 1330, 250, 16, 0.95)}
    ${place(CD('b35', 16), 640, 590, -10, 1.12)}
    ${place(CD('b13', 3), 945, 560, -1, 1.12)}
    ${place(G0() ? CD('b35', 2) : CD('b58', 1), 1245, 580, 8, 1.12)}
  </section>`;
}
function L(inner, bg = C.wash) { return `<section class="page L" style="background:${bg}">${inner}${logo('lockup-horizontal', 'lg1')}</section>`; }
function listingPages(G) {
  const P = [];
  const A = G.at, sheet1 = A['Ages 1–3 cards'];
  // 1 hero
  P.push(L(`<div class="lh"><div class="lk">Printable · ages 1–12</div><h2 style="font-size:92px">150 “I’m bored!”<br>Play Cards</h2><p class="ls">Screen-free play ideas sorted by age and energy, with a talk line on every card.</p></div>
    <div style="position:absolute;left:40px;top:410px;width:330px;height:430px"><svg viewBox="-110 -110 220 300" width="100%" height="100%">${jarSVG({ lab: C.tomato })}</svg></div>
    ${place(CD('b812', 0), 330, 440, -14, 1.02)}${place(CD('b58', 1), 470, 390, -5, 1.02)}${place(CD('b13', 3), 620, 380, 5, 1.02)}${place(CD('b35', 2), 745, 420, 14, 1.02)}
    <div style="position:absolute;left:64px;bottom:44px;display:flex;gap:10px;flex-wrap:wrap;width:640px"><span class="chip">+ 36 summer & rainy-day cards</span><span class="chip">Color + low-ink · Letter + A4</span></div>`, C.tSun));
  // 2 contents grid (rule 36)
  const inside = [['150', 'play cards, 4 age bands'], ['36', 'summer + rainy-day cards'], [String(N_BLANK()), 'blank “your idea” cards'], ['2', 'grown-up guide pages'], ['186', 'easier, harder and 2-minute versions'], ['24', 'box dividers'], ['12', 'jar labels'], ['6', 'card-back designs'], ['4', 'Play Menu + planners'], ['1', 'Play Jar Star certificate']];
  P.push(L(`<div class="lh"><div class="lk">What’s inside</div><h2>Everything for a<br>play jar that works.</h2></div>
    <div style="position:absolute;left:64px;top:290px;width:420px">${inside.map(([n, t]) => `<div style="display:flex;gap:14px;align-items:baseline;padding:7px 0;border-bottom:2px solid #E1E7F1;font-size:19px;font-weight:700"><b style="font-family:Bricolage Grotesque;font-size:29px;color:#C4401F;width:62px">${n}</b>${t}</div>`).join('')}</div>
    <div class="paper" style="${at(520, 300, -4)};width:230px;height:298px"><img src="${PV(sheet1)}"></div>
    <div class="paper" style="${at(730, 290, 5)};width:230px;height:298px"><img src="${PV(G.index)}"></div>
    <div class="paper" style="${at(510, 600, 3)};width:230px;height:298px"><img src="${PV(A['Box dividers'])}"></div>
    <div class="paper" style="${at(735, 610, -4)};width:230px;height:298px"><img src="${PV(G.tips)}"></div>`));
  // 3 grown-up guide page (rule 27)
  P.push(L(`<div class="lh"><div class="lk">Grown-up guide inside</div><h2>Two-minute setup,<br>three talk lines.</h2><p class="ls" style="font-size:19px">Plus a pantry list, a 2-minute version of every card, and “most children love 2–3 of these; that’s normal.”</p></div>
    <div class="paper" style="${at(90, 330, -3)};width:420px;height:543px"><img src="${PV(G.guide)}"></div>
    <div class="paper" style="${at(500, 320, 3)};width:420px;height:543px"><img src="${PV(G.guide + 1)}"></div>`, C.tSky));
  // 4 how a card works
  const marks = [['Age band + starting age', 'Color plus a word label'], ['Energy level', 'Calm, medium or wiggly'], ['Prep, mess, play time', 'Before you say yes'], ['You need · Try it', 'Everyday things, short steps'], ['Talk line', 'One thing to say while you play'], ['Flags + safety line', 'With a grown-up · Nothing to buy']];
  P.push(L(`<div class="lh"><div class="lk">How the cards work</div><h2>Read a card in<br>five seconds.</h2></div>
    ${place(CD('b35', 16), 90, 290, -3, 1.75)}
    <div style="position:absolute;left:570px;top:300px;width:380px">${marks.map(([h, t], i) => `<div style="display:flex;gap:14px;margin-bottom:20px"><span style="flex:0 0 38px;height:38px;border-radius:50%;background:${C.ink};color:#fff;font-weight:800;font-size:19px;display:flex;align-items:center;justify-content:center">${i + 1}</span><div><div style="font-family:Bricolage Grotesque;font-weight:800;font-size:24px">${h}</div><div style="font-size:18px;font-weight:600">${t}</div></div></div>`).join('')}</div>`, '#FFFFFF'));
  // 5 young ages
  P.push(L(`<div class="lh"><div class="lk">Sorted by age</div><h2>Ages 1–3 and 3–5</h2><p class="ls" style="font-size:19px">Every 1–3 card uses only things too big to fit through a toilet-paper tube.</p></div>
    ${place(CD('b13', 0), 88, 214, -1.5, 0.97)}${place(CD('b13', 12), 382, 210, 0, 0.97)}${place(CD('b13', 19), 676, 214, 1.5, 0.97)}
    ${place(CD('b35', 12), 88, 560, -1.5, 0.97)}${place(CD('b35', 2), 382, 556, 0, 0.97)}${place(CD('b35', 33), 676, 560, 1.5, 0.97)}`, C.tGrass));
  // 6 older ages
  P.push(L(`<div class="lh"><div class="lk">Sorted by age</div><h2>Ages 5–8 and 8–12</h2><p class="ls" style="font-size:19px">Bigger projects, games with rules and real-life skills.</p></div>
    ${place(CD('b58', 5), 88, 214, -1.5, 0.97)}${place(CD('b58', 25), 382, 210, 0, 0.97)}${place(CD('b58', 13), 676, 214, 1.5, 0.97)}
    ${place(CD('b812', 15), 88, 560, -1.5, 0.97)}${place(CD('b812', 22), 382, 556, 0, 0.97)}${place(CD('b812', 26), 676, 560, 1.5, 0.97)}`, C.tPlum));
  // 7 seasonal sets
  P.push(L(`<div class="lh"><div class="lk">Bonus sets</div><h2>Summer & rainy-day<br>mini-sets</h2><p class="ls">36 extra cards for sunny afternoons and stuck-inside days.</p></div>
    ${place(BK('summer'), 64, 330, -7, 1.0)}${place(CD('summer', 1), 250, 350, 3, 1.08)}
    ${place(BK('rainy'), 530, 330, -5, 1.0)}${place(CD('rainy', 10), 705, 350, 5, 1.08)}
    <div style="position:absolute;left:64px;top:770px;display:flex;gap:12px"><span class="chip" style="background:${C.tomato};color:#fff">${icon('sun', 'i')} 18 summer cards</span><span class="chip" style="background:${C.ink};color:#fff">${icon('rain', 'i')} 18 rainy-day cards</span></div>
    <p style="position:absolute;left:64px;top:840px;width:640px;font-size:19px;font-weight:600;line-height:1.4">Sprinklers, ice rescues and cloud stories. Puddle jumping, reading nests and living-room camp-outs.</p>`, C.tTomato));
  // 8 labels, dividers + low-ink
  P.push(L(`<div class="lh"><div class="lk">Jar labels · dividers · low-ink files</div><h2>Color or low-ink.<br>Same cards.</h2></div>
    <div class="paper" style="${at(64, 300, -3)};width:300px;height:388px"><img src="${PV(A['Jar labels'] + 1)}"></div>
    <div class="paper" style="${at(350, 290, 2)};width:300px;height:388px"><img src="${PV(A['Box dividers'])}"></div>
    <div class="paper" style="${at(640, 300, 5)};width:300px;height:388px"><img src="${PL(sheet1)}"></div>
    <span class="tag" style="left:660px;top:700px">Low-ink edition</span>
    ${['b13', 'b35', 'b58', 'b812', 'summer', 'rainy'].map((k, i) => place(BK(k), 70 + i * 128, 740, (i - 2.5) * 3, 0.52)).join('')}`, '#FFFFFF'));
  // 9 files, prep and value
  const Fm = [['5 plain PDFs, no zip', 'START HERE + color and low-ink, each in US Letter and A4'], ['Type-in blanks', 'Color files: blank cards, labels, dividers, planners and certificate. Text and ticks only.'], ['Prep: about 30 min', 'Print and cut with a trimmer, then use again and again'], ['150 plays, about 4¢ each', `$${PRICE.toFixed(2)} for 150 cards, plus 36 seasonal`], ['Instant download', 'Digital files only. Nothing is shipped.']];
  P.push(L(`<div class="lh"><div class="lk">Files, prep and value</div><h2>Print it your way.</h2></div>
    <div style="position:absolute;left:64px;top:240px;width:500px">${Fm.map(([h, t], i) => `<div style="background:#fff;border-radius:20px;padding:15px 22px;margin-bottom:13px;border-left:10px solid ${[C.sun, C.grass, C.sky, C.plum, C.tomato][i]}"><div style="font-family:Bricolage Grotesque;font-weight:800;font-size:26px">${h}</div><div style="font-size:18px;font-weight:600;line-height:1.3">${t}</div></div>`).join('')}</div>
    <div class="paper" style="${at(630, 240, 4)};width:290px;height:375px"><img src="${PV(1)}"></div>
    <div class="paper" style="${at(600, 505, -3)};width:290px;height:375px"><img src="${PV(A['Play Menu + weekly planners'] + 1)}"></div>`));
  // 10 how to download (rule 5: always the last image)
  const S = [['Use a web browser', 'On a computer or your phone’s browser. The shopping app often can’t save files.'], ['Open Purchases', 'Sign in, open your account’s Purchases page and tap each file.'], ['Start with file 1', 'START HERE says which file to print and how.'], ['Lost a file later?', 'It stays in Purchases. Download it again any time.']];
  P.push(L(`<div class="lh"><div class="lk">How to download</div><h2>Use a browser,<br>not the app.</h2></div>
    <div class="paper" style="${at(610, 300, 4)};width:320px;height:414px"><img src="prev-etsy-start/p01.png"></div>
    <div style="position:absolute;left:64px;top:300px;width:520px">${S.map(([h, t], i) => `<div style="display:flex;gap:16px;margin-bottom:26px"><span style="flex:0 0 52px;height:52px;border-radius:50%;background:${[C.sun, C.grass, C.sky, C.plum][i]};color:${i ? '#fff' : C.ink};font-family:Bricolage Grotesque;font-weight:800;font-size:26px;display:flex;align-items:center;justify-content:center">${i + 1}</span><div><div style="font-family:Bricolage Grotesque;font-weight:800;font-size:28px">${h}</div><div style="font-size:19px;font-weight:600;line-height:1.35">${t}</div></div></div>`).join('')}</div>
    <div style="position:absolute;left:64px;bottom:120px;right:64px;background:#fff;border-radius:20px;padding:16px 22px;font-size:19px;font-weight:700">Every play follows our published safety rules. For use in your own home.</div>`, C.tSun));
  return P;
}
function listingPagesG0(G) {
  const P = [];
  const A = G.at, sheet1 = A['Ages 1–3 cards'], N = nMain();
  P.push(L(`<div class="lh"><div class="lk">Printable · ages 1–5</div><h2 style="font-size:92px">${N} “I’m bored!”<br>Play Cards</h2><p class="ls">Screen-free play ideas for toddlers and little kids, sorted by age and energy, with a talk line on every card.</p></div>
    <div style="position:absolute;left:40px;top:410px;width:330px;height:430px"><svg viewBox="-110 -110 220 300" width="100%" height="100%">${jarSVG({ lab: C.tomato })}</svg></div>
    ${place(CD('b35', 16), 330, 440, -14, 1.02)}${place(CD('b13', 12), 470, 390, -5, 1.02)}${place(CD('b13', 3), 620, 380, 5, 1.02)}${place(CD('b35', 2), 745, 420, 14, 1.02)}
    <div style="position:absolute;left:64px;bottom:44px;display:flex;gap:10px;flex-wrap:wrap;width:640px"><span class="chip">Ages 1–3 + 3–5</span><span class="chip">Color + low-ink · Letter + A4</span></div>`, C.tSun));
  const inside = [[String(N), 'play cards, 2 age bands'], [String(N_BLANK()), 'blank “your idea” cards'], ['2', 'grown-up guide pages'], [String(N), 'easier, harder and 2-minute versions'], [String(dividerList().length), 'box dividers'], ['12', 'jar labels'], ['2', 'card-back designs'], ['4', 'Play Menu + planners'], ['1', 'Play Jar Star certificate']];
  P.push(L(`<div class="lh"><div class="lk">What’s inside</div><h2>Everything for a<br>play jar that works.</h2></div>
    <div style="position:absolute;left:64px;top:290px;width:420px">${inside.map(([n, t]) => `<div style="display:flex;gap:14px;align-items:baseline;padding:7px 0;border-bottom:2px solid #E1E7F1;font-size:19px;font-weight:700"><b style="font-family:Bricolage Grotesque;font-size:29px;color:#C4401F;width:62px">${n}</b>${t}</div>`).join('')}</div>
    <div class="paper" style="${at(520, 300, -4)};width:230px;height:298px"><img src="${PV(sheet1)}"></div>
    <div class="paper" style="${at(730, 290, 5)};width:230px;height:298px"><img src="${PV(G.index)}"></div>
    <div class="paper" style="${at(510, 600, 3)};width:230px;height:298px"><img src="${PV(A['Box dividers'])}"></div>
    <div class="paper" style="${at(735, 610, -4)};width:230px;height:298px"><img src="${PV(G.tips)}"></div>`));
  P.push(L(`<div class="lh"><div class="lk">Grown-up guide inside</div><h2>Two-minute setup,<br>three talk lines.</h2><p class="ls" style="font-size:19px">Plus a pantry list, a 2-minute version of every card, and “most children love 2–3 of these; that’s normal.”</p></div>
    <div class="paper" style="${at(90, 330, -3)};width:420px;height:543px"><img src="${PV(G.guide)}"></div>
    <div class="paper" style="${at(500, 320, 3)};width:420px;height:543px"><img src="${PV(G.guide + 1)}"></div>`, C.tSky));
  const marks = [['Age band + starting age', 'Color plus a word label'], ['Energy level', 'Calm, medium or wiggly'], ['Prep, mess, play time', 'Before you say yes'], ['You need · Try it', 'Everyday things, short steps'], ['Talk line', 'One thing to say while you play'], ['Flags + safety line', 'With a grown-up · Nothing to buy']];
  P.push(L(`<div class="lh"><div class="lk">How the cards work</div><h2>Read a card in<br>five seconds.</h2></div>
    ${place(CD('b35', 16), 90, 290, -3, 1.75)}
    <div style="position:absolute;left:570px;top:300px;width:380px">${marks.map(([h, t], i) => `<div style="display:flex;gap:14px;margin-bottom:20px"><span style="flex:0 0 38px;height:38px;border-radius:50%;background:${C.ink};color:#fff;font-weight:800;font-size:19px;display:flex;align-items:center;justify-content:center">${i + 1}</span><div><div style="font-family:Bricolage Grotesque;font-weight:800;font-size:24px">${h}</div><div style="font-size:18px;font-weight:600">${t}</div></div></div>`).join('')}</div>`, '#FFFFFF'));
  P.push(L(`<div class="lh"><div class="lk">Sorted by age</div><h2>Ages 1–3 and 3–5</h2><p class="ls" style="font-size:19px">Every 1–3 card uses only things too big to fit through a toilet-paper tube.</p></div>
    ${place(CD('b13', 0), 88, 214, -1.5, 0.97)}${place(CD('b13', 12), 382, 210, 0, 0.97)}${place(CD('b13', 19), 676, 214, 1.5, 0.97)}
    ${place(CD('b35', 12), 88, 560, -1.5, 0.97)}${place(CD('b35', 2), 382, 556, 0, 0.97)}${place(CD('b35', 33), 676, 560, 1.5, 0.97)}`, C.tGrass));
  P.push(L(`<div class="lh"><div class="lk">Jar labels · dividers · low-ink files</div><h2>Color or low-ink.<br>Same cards.</h2></div>
    <div class="paper" style="${at(64, 300, -3)};width:300px;height:388px"><img src="${PV(A['Jar labels'] + 1)}"></div>
    <div class="paper" style="${at(350, 290, 2)};width:300px;height:388px"><img src="${PV(A['Box dividers'])}"></div>
    <div class="paper" style="${at(640, 300, 5)};width:300px;height:388px"><img src="${PL(sheet1)}"></div>
    <span class="tag" style="left:660px;top:700px">Low-ink edition</span>
    ${['b13', 'b35'].map((k, i) => place(BK(k), 300 + i * 200, 740, (i - 0.5) * 6, 0.52)).join('')}`, '#FFFFFF'));
  const Fm = [['5 plain PDFs, no zip', 'START HERE + color and low-ink, each in US Letter and A4'], ['Type-in blanks', 'Color files: blank cards, labels, dividers, planners and certificate. Text and ticks only.'], ['Prep: about 15 min', 'Print and cut with a trimmer, then use again and again'], [`${N} plays, about ${Math.round(100 * PRICE / N)}¢ each`, `$${PRICE.toFixed(2)} for ${N} cards in two age bands`], ['Instant download', 'Digital files only. Nothing is shipped.']];
  P.push(L(`<div class="lh"><div class="lk">Files, prep and value</div><h2>Print it your way.</h2></div>
    <div style="position:absolute;left:64px;top:240px;width:500px">${Fm.map(([h, t], i) => `<div style="background:#fff;border-radius:20px;padding:15px 22px;margin-bottom:13px;border-left:10px solid ${[C.sun, C.grass, C.sky, C.plum, C.tomato][i]}"><div style="font-family:Bricolage Grotesque;font-weight:800;font-size:26px">${h}</div><div style="font-size:18px;font-weight:600;line-height:1.3">${t}</div></div>`).join('')}</div>
    <div class="paper" style="${at(630, 240, 4)};width:290px;height:375px"><img src="${PV(1)}"></div>
    <div class="paper" style="${at(600, 505, -3)};width:290px;height:375px"><img src="${PV(A['Play Menu + weekly planners'] + 1)}"></div>`));
  const S = [['Use a web browser', 'On a computer or your phone’s browser. The shopping app often can’t save files.'], ['Open Purchases', 'Sign in, open your account’s Purchases page and tap each file.'], ['Start with file 1', 'START HERE says which file to print and how.'], ['Lost a file later?', 'It stays in Purchases. Download it again any time.']];
  P.push(L(`<div class="lh"><div class="lk">How to download</div><h2>Use a browser,<br>not the app.</h2></div>
    <div class="paper" style="${at(610, 300, 4)};width:320px;height:414px"><img src="g0-prev-etsy-start/p01.png"></div>
    <div style="position:absolute;left:64px;top:300px;width:520px">${S.map(([h, t], i) => `<div style="display:flex;gap:16px;margin-bottom:26px"><span style="flex:0 0 52px;height:52px;border-radius:50%;background:${[C.sun, C.grass, C.sky, C.plum][i]};color:${i ? '#fff' : C.ink};font-family:Bricolage Grotesque;font-weight:800;font-size:26px;display:flex;align-items:center;justify-content:center">${i + 1}</span><div><div style="font-family:Bricolage Grotesque;font-weight:800;font-size:28px">${h}</div><div style="font-size:19px;font-weight:600;line-height:1.35">${t}</div></div></div>`).join('')}</div>
    <div style="position:absolute;left:64px;bottom:120px;right:64px;background:#fff;border-radius:20px;padding:16px 22px;font-size:19px;font-weight:700">Every play follows our published safety rules. For use in your own home.</div>`, C.tSun));
  return P;
}
BASE = '../../../../';
TIER = 'g0'; PFX = 'g0-';
fs.writeFileSync(path.join(GEN, 'mockup.html'), doc(FONT, SZ, [mockupPage()], mkCss + '<style>body{width:1600px}</style>'));
fs.writeFileSync(path.join(GEN, 'listing-g0.html'), doc(FONT, SZ, listingPagesG0(GUIDE['g0-letter']), mkCss));
TIER = 'full'; PFX = '';
fs.writeFileSync(path.join(GEN, 'listing.html'), doc(FONT, SZ, listingPages(GL), mkCss));
