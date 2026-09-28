// Build script for "I'm Bored" Play Cards (Play Before Pixels).
//   node build/build.js
// Writes: ../source.html (US Letter, all pages), source-a4.html, duplex-*.html, editable-*.html,
//         png-templates.html, cover.html, mockup.html, listing.html (all in build/).
const fs = require('fs');
const path = require('path');
const { C, KIDS, ADULTS, SYMBOLS, kid, adult, kidHand, aimKid } = require('./chars');
const { CATS, BANDS, CARDS, MINI } = require('./cards');

const ROOT = path.resolve(__dirname, '..');
const SLUG = 'bored-play-cards';
const BONUS = `playbeforepixels.com/bonus/${SLUG}`;
const COPY = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.';
const QR = fs.readFileSync(path.join(__dirname, 'qr.svg'), 'utf8').replace('<svg ', '<svg class="qr" ');

const TH = {
  b13: { m: C.sun, t: C.tSun, on: C.ink, name: 'Ages 1–3' },
  b35: { m: C.grass, t: C.tGrass, on: '#FFFFFF', name: 'Ages 3–5' },
  b58: { m: C.sky, t: C.tSky, on: '#FFFFFF', name: 'Ages 5–8' },
  b812: { m: C.plum, t: C.tPlum, on: '#FFFFFF', name: 'Ages 8–12' },
  summer: { m: C.tomato, t: C.tTomato, on: '#FFFFFF', name: 'Summer set' },
  rainy: { m: C.ink, t: C.wash, on: '#FFFFFF', name: 'Rainy-day set' },
};
const ENERGY = { c: 'Calm', m: 'Medium', w: 'Wiggly' };
const ELEV = { c: 1, m: 2, w: 3 };
const tvars = th => `--m:${th.m};--t:${th.t};--on:${th.on}`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

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
];
const icon = (id, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><use href="#ic-${id}"/></svg>`;
const meter = e => `<svg class="mt" viewBox="0 0 17 12" aria-hidden="true">${[0, 1, 2].map(i => `<rect x="${i * 6}" y="${8 - i * 4}" width="4.4" height="${4 + i * 4}" rx="1.4" fill="currentColor" opacity="${i < ELEV[e] ? 1 : .22}"/>`).join('')}</svg>`;

// ---------- cards ----------
function card(cd, key, num, opts = {}) {
  const th = TH[key];
  const band = BANDS.find(b => b.key === key);
  const isMini = !band;
  const ageTxt = isMini ? `Ages ${cd.a}` : band.label;
  let safe = cd.s || (band ? band.safe : 'Grown-up nearby.');
  const numTxt = isMini ? `${key === 'summer' ? 'Summer' : 'Rainy'} · ${String(num).padStart(2, '0')}` : `${band.ages} · ${String(num).padStart(2, '0')}`;
  const seasonIc = isMini ? `<span class="ss">${icon(key === 'summer' ? 'sun' : 'rain', 'ssi')}</span>` : '';
  const M = n => opts.marks ? `<span class="mk m${n}">${n}</span>` : '';
  return `<div class="card${opts.marks ? ' marked' : ''}" style="${tvars(th)}"${opts.id ? ` id="${opts.id}"` : ''}><div class="panel">
  <div class="hd"><span class="age">${M(1)}${seasonIc}${ageTxt}</span><span class="en">${M(2)}${meter(cd.e)}${ENERGY[cd.e]}</span></div>
  <div class="ti"><div class="tt"><div class="cat">${CATS[cd.c].name}</div><h3>${esc(cd.t)}</h3></div><span class="ci">${M(3)}${icon(cd.c)}</span></div>
  <div class="bd">
    <div class="row">${M(4)}<b>You need</b><p>${esc(cd.n)}</p></div>
    <div class="row">${M(5)}<b>Try it</b><p>${esc(cd.d)}</p></div>
    <div class="talk">${M(6)}${icon('talk', 'ti2')}<div><b>Talk</b><p>${esc(cd.k)}</p></div></div>
  </div>
  <div class="ft"><span class="wm">${icon(cd.c)}</span>${M(7)}${icon('safe', 'si')}<span>${esc(safe)}</span><i>${numTxt}</i></div>
</div></div>`;
}

function blankCard(key, opts = {}) {
  const th = TH[key];
  const band = BANDS.find(b => b.key === key);
  const ageTxt = band ? band.label : 'Ages ____';
  const f = opts.fields ? (n) => ` data-field="${n}"` : () => '';
  const lines = n => Array.from({ length: n }, () => '<span class="ln"></span>').join('');
  const seasonIc = !band ? `<span class="ss">${icon(key === 'summer' ? 'sun' : 'rain', 'ssi')}</span>` : '';
  return `<div class="card blank${opts.fields ? ' ed' : ''}" style="${tvars(th)}"><div class="panel">
  <div class="hd"><span class="age">${seasonIc}${ageTxt}</span><span class="en en3"><i${f('calm')}></i>Calm<i${f('medium')}></i>Med<i${f('wiggly')}></i>Wiggly</span></div>
  <div class="ti"><div class="tt"><div class="cat">Your idea</div><div class="wl big"${f('title')}></div></div><span class="ci">${icon('pen')}</span></div>
  <div class="bd">
    <div class="row"><b>You need</b><div class="wlines"${f('need')}>${lines(2)}</div></div>
    <div class="row"><b>Try it</b><div class="wlines"${f('try')}>${lines(4)}</div></div>
    <div class="talk">${icon('talk', 'ti2')}<div><b>Talk</b><div class="wlines"${f('talk')}>${lines(2)}</div></div></div>
  </div>
  <div class="ft">${icon('safe', 'si')}<span>Check the safety page before you play.</span><i>Your card</i></div>
</div></div>`;
}

function cardBack(key) {
  const th = TH[key];
  const shapes = key === 'summer' ? 'sun' : key === 'rainy' ? 'rain' : null;
  const op = key === 'b13' ? .38 : .2;
  const dots = [[30, 40, 26], [205, 70, 16], [26, 200, 12], [214, 200, 13], [40, 150, 8], [215, 150, 10], [120, 30, 7], [205, 296, 12]]
    .map(([x, y, r], i) => shapes && i % 2 === 0
      ? `<g transform="translate(${x - r},${y - r}) scale(${r / 12})" style="color:#FFFFFF" opacity="${op}"><use href="#ic-${shapes}" width="24" height="24"/></g>`
      : `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFFFFF" opacity="${op}"/>`).join('');
  const band = BANDS.find(b => b.key === key);
  const sub = band ? band.label : th.name;
  return `<div class="card back" style="${tvars(th)}"><div class="panel">
  <svg class="bgdots" viewBox="0 0 222 318" preserveAspectRatio="none" aria-hidden="true">${dots}</svg>
  <div class="bk"><div class="bkc"><span class="bk1">I’m</span><span class="bk2">bored!</span></div>
  <div class="bks">Play cards · ${sub}</div></div>
  <div class="bkb">${logo(key === 'b13' ? 'wordmark' : key === 'rainy' ? 'wordmark-reverse' : 'wordmark-white', 'lgb')}</div>
</div></div>`;
}

// ---------- page helpers ----------
const SIZES = {
  letter: { name: 'US Letter', w: 8.5, h: 11, css: '8.5in 11in' },
  a4: { name: 'A4', w: 210 / 25.4, h: 297 / 25.4, css: '210mm 297mm' },
};
let SZ = SIZES.letter; // current size while building
let BASE = '../../'; // path from the HTML file to the repo root
const logo = (file, cls = 'lg') => `<img class="${cls}" src="${BASE}brand/logo/${file}.svg" alt="Play Before Pixels">`;
const pg = (cls, inner, style = '') => `<section class="page ${cls}"${style ? ` style="${style}"` : ''}>${inner}</section>`;

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
function cardSheet(items, label) {
  const x0 = (SZ.w - 7.5) / 2, y0 = (SZ.h - 10.5) / 2;
  const cells = items.map((h, i) => `<div class="cell" style="left:${x0 + (i % 3) * 2.5}in;top:${y0 + Math.floor(i / 3) * 3.5}in">${h}</div>`).join('');
  const guides = [1, 2].map(i => `<i class="gl v" style="left:${x0 + i * 2.5}in;top:${y0}in;height:10.5in"></i>`).join('') +
    [1, 2].map(j => `<i class="gl h" style="top:${y0 + j * 3.5}in;left:${x0}in;width:7.5in"></i>`).join('') +
    `<i class="gl box" style="left:${x0}in;top:${y0}in;width:7.5in;height:10.5in"></i>`;
  const side = (txt, left) => `<div class="sl" style="left:${left ? x0 / 2 : SZ.w - x0 / 2}in;top:${y0 + 5.25}in;transform:translate(-50%,-50%) rotate(${left ? -90 : 90}deg)">${txt}</div>`;
  return pg('sheet', cells + guides + cropMarks(3, 3, 2.5, 3.5, x0, y0) + (label ? side(`<span class="sll">${logo('wordmark', 'lgs')}<span>playbeforepixels.com · ${label}</span></span>`, true) + side(COPY, false) : ''));
}
function chunk(a, n) { const r = []; for (let i = 0; i < a.length; i += n) r.push(a.slice(i, i + n)); return r; }

// Standard content page with 0.5in margins, header strip and footer.
function contentPage(cls, eyebrow, title, body, opts = {}) {
  return pg('cp ' + cls, `<div class="cpin">
  <header class="phd">${logo('lockup-horizontal', 'lgh')}<span class="pe">${eyebrow}</span></header>
  ${title ? `<h2 class="ph">${title}</h2>` : ''}
  ${body}
  </div><footer class="pf"><span class="pfl">${logo('wordmark', 'lgf')}<span>playbeforepixels.com · “I’m Bored” Play Cards</span></span><span>${COPY} For use in your own home.</span></footer>`, opts.style);
}

// ---------- illustrations ----------
function jarSVG(opts = {}) {
  // open jar with play cards sticking out; label colour = opts.lab
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
  // child pulling a card from the jar, grown-up beside
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
:root{--ink:${C.ink};--wash:${C.wash};--line:#C9D2E0}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:"Nunito Sans","Helvetica Neue",Arial,sans-serif;color:var(--ink)}
symbol{overflow:visible}
.sk{fill:var(--sk)} .hr{fill:var(--hr)} .sh{fill:var(--sh)} .pa{fill:var(--pa)} .so{fill:var(--so)} .hw{fill:var(--hw)} .ck{fill:${C.tomato};opacity:.28}
.page{width:${size.w}in;height:${size.h}in;position:relative;overflow:hidden;page-break-after:always;break-after:page;background:#fff}
.page:last-child{page-break-after:auto;break-after:auto}
h1,h2,h3,p{margin:0}
/* ---- card ---- */
.card{width:2.5in;height:3.5in;padding:.09in;position:relative}
.panel{width:100%;height:100%;border-radius:13px;border:2px solid var(--t);background:#fff;overflow:hidden;display:flex;flex-direction:column;position:relative}
.hd{background:var(--m);color:var(--on);height:27px;flex:0 0 27px;display:flex;align-items:center;justify-content:space-between;padding:0 7px 0 9px}
.age{font-weight:800;font-size:9.5px;letter-spacing:.09em;text-transform:uppercase;display:flex;align-items:center;gap:4px;white-space:nowrap}
.ss{display:inline-flex}.ssi{width:12px;height:12px;color:var(--on)}
.en{background:#fff;color:var(--ink);border-radius:20px;height:17px;padding:0 7px 0 5px;display:flex;align-items:center;gap:4px;font-weight:800;font-size:8.5px;letter-spacing:.08em;text-transform:uppercase}
.mt{width:13px;height:10px;display:block}
.ti{display:flex;align-items:flex-start;justify-content:space-between;gap:6px;padding:7px 9px 3px 10px}
.tt{flex:1;min-width:0}
.cat{font-weight:800;font-size:7.8px;letter-spacing:.12em;text-transform:uppercase;opacity:.62;margin-bottom:1px}
.ti h3{font-family:"Fredoka","Nunito Sans",sans-serif;font-weight:600;font-size:19.5px;line-height:1.02;letter-spacing:-.005em}
.ci{flex:0 0 27px;width:27px;height:27px;border-radius:50%;background:var(--t);display:flex;align-items:center;justify-content:center;color:var(--m)}
.card[style*="--m:${C.sun}"] .ci{color:#C98F00}
.ci .i{width:16px;height:16px;display:block}
.bd{padding:3px 10px 0;display:flex;flex-direction:column;gap:7px;position:relative;z-index:1}
.ft{position:relative}
.ft .wm{position:absolute;right:10px;bottom:calc(100% + 6px);width:54px;height:54px;color:var(--t);z-index:0;opacity:1;flex:none}
.wm .i{width:54px;height:54px;display:block}
.row b,.talk b{display:block;font-weight:800;font-size:7.8px;letter-spacing:.12em;text-transform:uppercase;opacity:.62;margin-bottom:1px}
.row p{font-size:12px;line-height:1.3;font-weight:600}
.talk{background:var(--t);border-radius:9px;padding:5px 8px 6px 6px;display:flex;gap:5px;align-items:flex-start;margin-top:1px}
.talk>div{flex:1;min-width:0}
.talk .ti2{flex:0 0 15px;width:15px;height:15px;color:var(--m);margin-top:1px}
.card[style*="--m:${C.sun}"] .talk .ti2{color:#C98F00}
.talk p{font-size:12px;line-height:1.25;font-weight:800}
.ft{margin-top:auto;padding:4px 9px 6px 9px;display:flex;gap:4px;align-items:flex-start;border-top:1.5px solid var(--t)}
.ft .si{flex:0 0 11px;width:11px;height:11px;color:var(--ink);opacity:.55;margin-top:.5px}
.ft span{font-size:8px;line-height:1.28;font-weight:700;flex:1;opacity:.82}
.ft i{font-style:normal;font-size:7px;font-weight:800;letter-spacing:.06em;opacity:.45;white-space:nowrap;margin-top:1px}
/* blank card */
.blank .en3{gap:3px;padding:0 6px;font-size:7px;letter-spacing:.04em}
.blank .en3 i{width:8px;height:8px;border-radius:50%;border:1.3px solid var(--ink);display:inline-block;margin-left:2px}
.blank .en3 i:first-child{margin-left:0}
.wl{height:22px;border-bottom:1.3px solid var(--line)}
.wl.big{height:26px}
.wlines{display:flex;flex-direction:column}
.wlines .ln{display:block;height:17px;border-bottom:1.3px solid var(--line)}
.blank .talk .wlines .ln{border-color:rgba(29,41,64,.22)}
.blank .ci{color:var(--ink);opacity:.8}
.ed .wlines{background:${C.wash};border-radius:6px}.ed .wlines .ln{border-color:transparent}
.ed .talk .wlines{background:rgba(255,255,255,.7)}.ed.blank .talk .wlines .ln{border-color:transparent}
.ed .wl.big{background:${C.wash};border-radius:6px;border-bottom:0;height:24px;margin-top:2px}
/* card back */
.back .panel{background:var(--m);border-color:var(--m);align-items:center;justify-content:center}
.bgdots{position:absolute;inset:0;width:100%;height:100%}
.bk{position:relative;text-align:center}
.bkc{width:148px;height:148px;border-radius:50%;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto}
.bk1,.bk2{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;letter-spacing:-.03em;line-height:.9;color:var(--ink)}
.bk1{font-size:30px}.bk2{font-size:36px}
.bks{margin-top:12px;color:var(--on);font-weight:800;font-size:9px;letter-spacing:.14em;text-transform:uppercase}
.bkb{position:absolute;bottom:15px;left:0;right:0;display:flex;justify-content:center}
.lgb{height:12px;display:block}
/* sheet */
.sheet .cell{position:absolute;width:2.5in;height:3.5in}
.gl{position:absolute;display:block;border:0 dashed #D3DAE6}
.gl.v{border-left-width:.6px}.gl.h{border-top-width:.6px}.gl.box{border-width:.6px}
.cm{position:absolute;display:block;background:#8A94A8}
.cm.v{width:.6px}.cm.h{height:.6px}
.sll{display:flex;align-items:center;gap:6px}.lgs{height:7px;display:block}
.sl{position:absolute;white-space:nowrap;text-align:center;font-size:7px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#8A94A8}
/* content pages */
.cp .cpin{position:absolute;left:.5in;right:.5in;top:.5in;bottom:.72in;display:flex;flex-direction:column}
.phd{display:flex;justify-content:space-between;align-items:center;padding-bottom:10px;border-bottom:2px solid var(--wash);margin-bottom:16px}
.brand{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:14px;letter-spacing:-.01em}
.pe{font-weight:800;font-size:10px;letter-spacing:.16em;text-transform:uppercase;opacity:.6}
.ph{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:38px;line-height:1.02;letter-spacing:-.025em;margin-bottom:14px}
.lead{font-size:15px;line-height:1.5;font-weight:600;max-width:6.4in}
.lgh{height:.24in;display:block}
.lgf{height:9px;display:block}
.pfl{display:flex;align-items:center;gap:8px}
.pf{position:absolute;left:.5in;right:.5in;bottom:.4in;display:flex;justify-content:space-between;align-items:center;font-size:7.5px;font-weight:700;color:#7C879C;letter-spacing:.02em}
.hand{font-family:"Caveat",cursive;font-weight:700}
.kick{font-weight:800;font-size:10px;letter-spacing:.14em;text-transform:uppercase;opacity:.62;display:block;margin-bottom:4px}
.pill{display:inline-flex;align-items:center;gap:6px;border-radius:30px;padding:6px 13px;font-weight:800;font-size:12px}
</style>`;

// ---------- pages ----------
function coverPage() {
  const chips = ['150 cards + 36 seasonal', 'Ages 1–12, sorted by age', 'Calm · Medium · Wiggly', 'A talk prompt on every card'];
  const fan = [['b812', CARDS.b812[0], 1], ['b58', CARDS.b58[1], 2], ['summer', MINI.summer.cards[1], 2], ['b13', CARDS.b13[3], 4], ['b35', CARDS.b35[2], 3]];
  const fanHtml = fan.map(([k, cd, n], i) => `<div class="fan" style="transform:rotate(${(i - 2) * 9}deg)">${card(cd, k, n)}</div>`).join('');
  return pg('cover', `
  <div class="cv-top">${logo('lockup-horizontal', 'lgc')}<span class="cv-tag">playbeforepixels.com · US Letter + A4</span></div>
  <h1 class="cv-h"><span>I’m</span><span>bored!</span></h1>
  <div class="cv-sub">Play Cards</div>
  <p class="cv-p">150 screen-free play ideas for ages 1–12, each with what you need, how to play, a talk prompt and a safety note.</p>
  <div class="cv-art">${coverArt(560, 470)}</div>
  <div class="cv-fan">${fanHtml}</div>
  <div class="cv-chips">${chips.map((c, i) => `<span class="pill" style="background:${[C.tSun, C.tGrass, C.tSky, C.tPlum][i]}">${c}</span>`).join('')}</div>
  <div class="cv-extra"><b>Also inside:</b> summer & rainy-day sets · jar labels · box dividers · play menu · weekly planner · editable blanks</div>
  `);
}
const coverCss = `<style>
.cover{background:${C.wash}}
.cv-top{position:absolute;left:.55in;right:.55in;top:.5in;display:flex;justify-content:space-between;align-items:center}
.lgc{height:.36in;display:block}
.cv-tag{font-weight:800;font-size:10px;letter-spacing:.14em;text-transform:uppercase;opacity:.6}
.cv-h{position:absolute;left:.5in;top:.95in;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:124px;line-height:.84;letter-spacing:-.045em}
.cv-h span{display:block}
.cv-sub{position:absolute;left:.55in;top:3.02in;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:52px;letter-spacing:-.03em;color:${C.tomato}}
.cv-p{position:absolute;left:.57in;top:3.9in;width:3.35in;font-size:14.5px;line-height:1.45;font-weight:600}
.cv-art{position:absolute;right:.1in;top:1.05in;width:4.5in;height:3.78in}
.cv-fan{position:absolute;left:0;right:0;top:5.3in;height:3.9in}
.fan{position:absolute;top:0;left:3in;width:2.5in;height:3.5in;transform-origin:50% 175%}
.fan .card{padding:0}.fan .panel{box-shadow:0 8px 18px rgba(29,41,64,.13)}
.cv-chips{position:absolute;left:.55in;right:.55in;bottom:1.02in;display:flex;flex-wrap:wrap;gap:8px}
.cv-extra{position:absolute;left:.57in;right:.55in;bottom:.55in;font-size:12.5px;font-weight:600}
</style>`;

function welcomeArt() {
  const W = 400, H = 190, F = 176;
  const k = Object.assign({}, KIDS.B, { x: 250, y: F - 27 * 1.05, s: 1.05, aL: 150, aR: -150, face: 'laugh' });
  const g = Object.assign({}, ADULTS.G1, { x: 110, y: F - 51 * 0.85, s: 0.85, legs: 'kneel', aL: 20, aR: -70, face: 'laugh' });
  const blocks = `<use href="#block-1" transform="translate(330,${F - 20}) scale(.72)"/><use href="#block-3" transform="translate(372,${F - 20}) scale(.72)"/><use href="#block-2" transform="translate(351,${F - 61}) scale(.72)"/>`;
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="100%" aria-hidden="true"><circle cx="220" cy="118" r="70" fill="${C.tSun}"/><rect x="20" y="${F}" width="370" height="6" rx="3" fill="${C.ink}" opacity=".08"/>${adult(g)}${kid(k)}${blocks}</svg>`;
}
function welcomePage() {
  const inside = [
    ['150', 'play cards in 4 age bands: 1–3, 3–5, 5–8, 8–12'],
    ['36', 'seasonal cards: 18 summer + 18 rainy-day'],
    ['30', 'blank “your idea” cards, plus a fillable editable file'],
    ['18', 'box dividers: ages, kinds of play, favorites'],
    ['10', 'jar labels in 4 colorways, including energy jars'],
    ['6', 'card-back designs for double-sided printing'],
    ['1', 'Today’s Play Menu choice board (velcro-ready)'],
    ['2', 'Our Play Week planners: Monday or Sunday start'],
  ];
  const steps = [['Print', 'Cardstock, at 100% (actual size).'], ['Cut & store', 'Into a jar, a recipe box or a ring.'], ['Pull a card', 'Or offer a pick of three.'], ['Play & talk', 'Use the talk prompt, then follow their lead.']];
  const body = `
  <p class="lead">“I’m bored!” isn’t a problem you have to fix. It’s a pause, and pauses are where children start inventing. These cards give that pause a gentle nudge: one simple idea, the few everyday things you need, and one thing to say while you play.</p>
  <div class="wgrid">
    <div class="why">
      <div class="whyi"><span class="wn" style="background:${C.tSky};color:${C.sky}">${icon('talk')}</span><div><h4>Talk is built in</h4><p>Every card ends with a talk prompt. The back-and-forth (your question, their answer, your answer back) is what turns an activity into time together.</p></div></div>
      <div class="whyi"><span class="wn" style="background:${C.tGrass};color:${C.grass}">${icon('star')}</span><div><h4>Sorted by age and energy</h4><p>Choose your child’s age band, then ask one question: calm, medium or wiggly? Matching the mood makes a “yes” much more likely.</p></div></div>
      <div class="whyi"><span class="wn" style="background:${C.tTomato};color:${C.tomato}">${icon('safe')}</span><div><h4>Safety on every card</h4><p>Each card carries its own safety line, and every card for ages 1–3 uses only things bigger than a toilet-paper tube.</p></div></div>
      <div class="whyi"><span class="wn" style="background:${C.tSun};color:#C98F00">${icon('kitchen')}</span><div><h4>Made from everyday things</h4><p>Pots, socks, boxes, paper, a walk outside. No shopping list, no batteries, no screens.</p></div></div>
      <div class="wart">${welcomeArt()}</div>
    </div>
    <div class="inside"><span class="kick">What’s inside</span>
      ${inside.map(([n, t]) => `<div class="in"><b>${n}</b><span>${t}</span></div>`).join('')}
      <div class="in fmt"><span>US Letter + A4 · fillable blanks · PNG template set · index & checklist</span></div>
    </div>
  </div>
  <div class="steps">${steps.map(([h, t], i) => `<div class="st"><span class="sn" style="background:${[C.sun, C.grass, C.sky, C.plum][i]};color:${i ? '#fff' : C.ink}">${i + 1}</span><h4>${h}</h4><p>${t}</p></div>`).join('')}</div>
  <div class="gu"><span class="hand">Your job as the grown-up</span><p>You don’t have to entertain. Set out the things on the card, play for the first few minutes, then step back and let your child lead. Say what you see, wait, and answer their answer.</p></div>`;
  return contentPage('welcome', 'Start here', 'Boredom is where<br>play begins.', body);
}
const welcomeCss = `<style>
.welcome .lead{margin-bottom:20px}
.wgrid{display:grid;grid-template-columns:1.25fr 1fr;gap:26px}
.whyi{display:flex;gap:12px;margin-bottom:15px}
.wn{flex:0 0 38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.wn .i{width:21px;height:21px}
.whyi h4,.st h4{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:16px;margin:0 0 2px;letter-spacing:-.01em}
.whyi p{font-size:12.2px;line-height:1.45;font-weight:600}
.wart{height:1.55in;margin-top:0}
.inside{background:${C.wash};border-radius:18px;padding:16px 18px}
.in{display:flex;gap:10px;align-items:baseline;padding:5px 0;border-bottom:1px solid #E1E7F1;font-size:12px;font-weight:600;line-height:1.3}
.in b{flex:0 0 30px;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:19px;color:${C.tomato}}
.in.fmt{border:0;font-weight:800;font-size:11px;padding-top:8px}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:22px}
.st{background:#fff;border:2px solid ${C.wash};border-radius:16px;padding:12px 13px}
.sn{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:15px;margin-bottom:6px}
.st p{font-size:11.5px;line-height:1.4;font-weight:600}
.gu{margin-top:auto;background:${C.tSun};border-radius:18px;padding:14px 20px;display:flex;gap:18px;align-items:center}
.gu .hand{font-size:27px;line-height:1;flex:0 0 1.9in;color:${C.ink}}
.gu p{font-size:13px;line-height:1.45;font-weight:700}
</style>`;

function anatomyPage() {
  const sample = CARDS.b35[16]; // Feelings Freeze
  const marks = [
    [1, 'Age band', 'The color tells you the age band at a glance.'],
    [2, 'Energy level', 'One, two or three bars: calm, medium or wiggly.'],
    [3, 'Kind of play', 'Eight kinds, each with its own icon and divider.'],
    [4, 'You need', 'Everyday things only. Gather them first.'],
    [5, 'Try it', 'One or two short steps. Change anything you like.'],
    [6, 'Talk', 'One thing to say or ask while you play.'],
    [7, 'Safety line', 'Read it before you start, every time.'],
  ];
  const bands = BANDS.map(b => `<div class="bdg" style="background:${TH[b.key].t}"><span style="background:${TH[b.key].m}"></span><b>${b.label}</b></div>`).join('');
  const energies = [['c', 'Calm', 'Sit-down play for winding down, quiet mornings and before bed.'], ['m', 'Medium', 'Up-and-about play: pretend, building, helping, walks.'], ['w', 'Wiggly', 'Big-body play for burning energy, indoors or out.']];
  const cats = Object.entries(CATS).map(([k, v]) => `<div class="ct">${icon(k)}<span>${v.name}</span></div>`).join('');
  const body = `
  <div class="an">
    <div class="an-card"><div class="scale">${card(sample, 'b35', 17, { marks: true })}</div></div>
    <div class="an-leg">${marks.map(([n, h, t]) => `<div class="lg"><span class="mk s">${n}</span><div><h4>${h}</h4><p>${t}</p></div></div>`).join('')}</div>
  </div>
  <div class="an-row"><span class="kick">Four age bands</span><div class="bands">${bands}<div class="bdg" style="background:${C.tTomato}"><span style="background:${C.tomato}"></span><b>Summer</b></div><div class="bdg" style="background:${C.wash}"><span style="background:${C.ink}"></span><b>Rainy day</b></div></div>
  <p class="note">Bands overlap on purpose. Children move between them, so try the band above or below whenever a card fits your child.</p></div>
  <div class="an-row"><span class="kick">Three energy levels</span><div class="ens">${energies.map(([e, h, t]) => `<div class="enx"><div class="enh"><span class="en">${meter(e)}${h}</span></div><p>${t}</p></div>`).join('')}</div>
  <p class="note">Wiggly cards count toward active play. The World Health Organization’s 2019 guidelines recommend at least 180 minutes a day of varied physical activity for children aged 1–4, spread across the day.</p></div>
  <div class="an-row"><span class="kick">Eight kinds of play</span><div class="cats">${cats}</div></div>`;
  return contentPage('anatomy', 'How the cards work', 'Read a card in<br>five seconds.', body);
}
const anatomyCss = `<style>
.an{display:flex;gap:26px;align-items:flex-start;margin-bottom:14px}
.an-card{flex:0 0 3.5in;height:4.7in;position:relative;margin-left:8px}
.an-card .scale{position:absolute;left:0;top:0;width:240px;height:336px;transform:scale(1.4);transform-origin:0 0}
.marked .panel{overflow:visible}.marked .hd{border-radius:11px 11px 0 0}
.marked .age,.marked .en,.marked .ci,.marked .row,.marked .talk,.marked .ft{position:relative}
.mk.m1,.mk.m4,.mk.m5,.mk.m6,.mk.m7{left:-27px;top:50%;transform:translateY(-50%)}
.mk.m4,.mk.m5{top:0;transform:none}
.mk.m2,.mk.m3{right:-24px;top:50%;transform:translateY(-50%)}
.mk.m3{right:-30px}
.mk.m1{left:-26px}
.ft .mk{opacity:1;flex:none;font-size:10px;left:-26px;top:50%;transform:translateY(-50%);line-height:1}
.mk{position:absolute;width:17px;height:17px;border-radius:50%;background:${C.tomato};color:#fff;font-weight:800;font-size:10px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 2px #fff;z-index:3}
.mk.s{position:static;flex:0 0 24px;width:24px;height:24px;font-size:12.5px;box-shadow:none}
.an-leg{flex:1;padding-top:4px}
.lg{display:flex;gap:11px;margin-bottom:12px}
.lg h4{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:15px;margin:0}
.lg p{font-size:12px;line-height:1.4;font-weight:600}
.an-row{margin-top:12px}
.bands{display:flex;flex-wrap:wrap;gap:8px}
.bdg{display:flex;align-items:center;gap:7px;border-radius:30px;padding:5px 12px 5px 6px;font-size:12px}
.bdg span{width:16px;height:16px;border-radius:50%}
.note{font-size:11px;line-height:1.45;font-weight:600;opacity:.8;margin-top:7px}
.ens{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.enx{background:${C.wash};border-radius:14px;padding:10px 12px}
.enx .en{display:inline-flex;background:#fff;height:22px;font-size:10px;padding:0 10px 0 7px}
.enx .mt{width:16px;height:12px}
.enx p{font-size:11.2px;line-height:1.4;font-weight:600;margin-top:6px}
.cats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.ct{display:flex;align-items:center;gap:7px;font-size:11.5px;font-weight:800;background:${C.wash};border-radius:12px;padding:7px 9px}
.ct .i{width:18px;height:18px;flex:0 0 18px;color:${C.ink}}
</style>`;

const FIRST = { b13: [3, 5, 16], b35: [0, 2, 16], b58: [1, 12, 18], b812: [0, 1, 22] };
function agesPage() {
  const P = [
    ['b13', 'Do it again!', 'Filling and dumping, stacking and knocking down, copying you, again and again.', 'Be the partner on the floor. Keep turns short, and repeat whatever gets a smile.', 'Short words and long pauses. Say what they’re doing (“In! Out!”), then wait for any sound or gesture back.'],
    ['b35', 'Let’s pretend', 'Pretend worlds, chasing games, simple rules, and stories that change every minute.', 'Take a part in the story (customer, patient, passenger) and let your child direct.', 'Ask “what happens next?” and add one new word to what they say.'],
    ['b58', 'Let me try', 'Building, making, games with rules, and inventions of their own.', 'Set it up, then step back. Be the tester, the audience or the rule-checker.', 'Ask “why?” and “how did you figure that out?”, and give them time to answer.'],
    ['b812', 'My idea!', 'Projects, challenges, strategy, and real skills like cooking, fixing and planning.', 'Be the assistant, not the boss. Offer the time and materials, then admire the result.', 'Ask for their plan and their opinion, and share yours too.'],
  ];
  const body = `<p class="lead">Every child plays differently, and age bands are a starting point, not a rule. Here is what play often looks like in each band, and the easiest way for a grown-up to join in.</p>
  <div class="ages">${P.map(([k, h, play, role, talk]) => `<div class="agp" style="${tvars(TH[k])}">
    <div class="agh"><span>${TH[k].name}</span><h3>${h}</h3></div>
    <div class="agb"><div><span class="kick">Play looks like</span><p>${play}</p></div><div><span class="kick">Your part</span><p>${role}</p></div><div class="agt">${icon('talk', 'ti2')}<div><span class="kick">Talk tip</span><p>${talk}</p></div></div><div class="ag3"><span class="kick">Three to try first</span><div>${FIRST[k].map(i => `<span class="agc">${esc(CARDS[k][i].t)}</span>`).join('')}</div></div></div>
  </div>`).join('')}</div>`;
  return contentPage('agespg', 'Play at every age', 'What play looks<br>like at each age.', body);
}
const agesCss = `<style>
.agespg .lead{margin-bottom:12px;font-size:14px}
.ages{display:grid;grid-template-columns:1fr 1fr;gap:16px;flex:1}
.agp{border-radius:18px;background:var(--t);overflow:hidden;display:flex;flex-direction:column}
.agh{background:var(--m);color:var(--on);padding:10px 16px}
.agh span{font-weight:800;font-size:10px;letter-spacing:.14em;text-transform:uppercase;opacity:.9}
.agh h3{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:25px;letter-spacing:-.02em;line-height:1.05}
.agb{padding:11px 16px 10px;display:flex;flex-direction:column;gap:8px}
.agb p{font-size:12px;line-height:1.42;font-weight:600}
.ag3 .agc{display:inline-block;background:#fff;border-radius:20px;padding:3px 10px;margin:0 5px 5px 0;font-size:11.5px;font-weight:800}
.agt{display:flex;gap:8px;background:#fff;border-radius:12px;padding:9px 11px}
.agt .ti2{flex:0 0 18px;width:18px;height:18px;color:var(--m)}
.agp[style*="--m:${C.sun}"] .agt .ti2{color:#C98F00}
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
    ['safe', 'A grown-up is always in charge', 'Every card assumes an adult nearby. For ages 1–3, stay within reach the whole time.'],
    ['build', 'Small parts and under-3s', 'For children under 3, use only things too big to fit through a toilet-paper tube (about 1.25 in / 3.2 cm across). Every 1–3 card is written this way. Older cards that use small things (coins, dice, tape, seeds) say so: keep those away from younger brothers and sisters.'],
    ['rain', 'Water', 'Any amount of water means a grown-up within arm’s reach, the whole time. Empty tubs and buckets straight after play.'],
    ['star', 'No balloons', 'Balloons are not safe for children under 8, so no card in this pack uses them.'],
    ['pretend', 'Cords, strings and scarves', 'Nothing long enough to wrap around a neck: no long strings, cords, ties or long scarves. Sheets and blankets are draped, never tied.'],
    ['kitchen', 'Food and the kitchen', 'Sit down to eat. No whole grapes, nuts, popcorn, hard candy or marshmallows for young children. Check allergies. Grown-ups handle sharp knives, the stove and the oven.'],
    ['outside', 'Outdoors', 'Play well away from the street. No berries or mushrooms. Hats, water and shade in the sun. No puddle play in thunder or lightning.'],
    ['games', 'Hide-and-seek', 'Never hide in appliances, chests, trunks or cars.'],
  ];
  const body = `<p class="lead">Every card has a safety line at the bottom. These are the rules behind them. They apply to every card, including the ones you write yourself.</p>
  <div class="srules">${R.map(([ic, h, t], i) => `<div class="sr"><span class="sri" style="background:${[C.tTomato, C.tSun, C.tSky, C.tPlum, C.tGrass][i % 5]}">${icon(ic)}</span><div><h4>${h}</h4><p>${t}</p></div></div>`).join('')}</div>
  <div class="tube"><div class="tubeart">${tubeArt()}</div><div><span class="kick">The toilet-paper tube test</span><h4>If it fits through the tube, it’s too small for under-3s.</h4><p>Keep a cardboard tube in the play basket and test anything new before a toddler plays with it. A tube is about 1.25 in (3.2 cm) across.</p></div></div>
  <div class="sbox"><div><h4>The cards themselves</h4><p>Printed and laminated cards are paper, not toys for children who still mouth things. Round laminated corners, and keep velcro dots, rings and the jar lid out of reach of little ones.</p></div>
  <div><h4>You know your child best</h4><p>Skip or change any card that doesn’t suit your child, your space or your day. These cards are ideas for play at home. They are not medical or developmental advice.</p></div></div>`;
  return contentPage('safety', 'Safe play, every time', 'Safety first,<br>then fun.', body);
}
const safetyCss = `<style>
.safety .lead{margin-bottom:16px}
.srules{display:grid;grid-template-columns:1fr 1fr;gap:12px 22px}
.sr{display:flex;gap:11px}
.sri{flex:0 0 36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:${C.ink}}
.sri .i{width:19px;height:19px}
.sr h4,.sbox h4{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:15px;margin:0 0 2px}
.sr p,.sbox p{font-size:11.8px;line-height:1.45;font-weight:600}
.tube{margin-top:18px;display:flex;gap:22px;align-items:center;background:${C.tSun};border-radius:18px;padding:14px 20px}
.tubeart{flex:0 0 3.3in;height:1.2in}
.tube h4{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:17px;line-height:1.15;margin:2px 0 4px}
.tube p{font-size:11.8px;line-height:1.45;font-weight:600}
.sbox{margin-top:auto;display:grid;grid-template-columns:1fr 1fr;gap:18px;background:${C.wash};border-radius:18px;padding:16px 20px}
</style>`;

function tipsPage() {
  const T = [
    ['Print', 'Print at 100% or “actual size,” not “fit to page.” Cardstock (65–110 lb / 176–300 gsm) makes sturdy cards. Pick the US Letter or A4 file to match your paper.'],
    ['Card backs (optional)', 'Print a sheet of fronts, put it back in the tray and print one backs page on the other side. Test one sheet first. Or print the double-sided cards file and choose “flip on long edge.”'],
    ['Cut', 'Cut along the light grey lines with a paper trimmer or scissors. The white border around each card hides small wobbles.'],
    ['Laminate', 'Laminating pouches (3–5 mil) make cards last for years and wipe clean. Leave a thin sealed edge around each card, then round the corners with a corner punch or scissors so there are no sharp points.'],
    ['Velcro', 'Stick a hook (scratchy) dot on the back of each card you want to use on the Play Menu, and loop (soft) dots on the board. Store spare dots out of reach: they’re small parts.'],
    ['Store', 'A big jar with one of the labels, a 3 × 5 in recipe box with the dividers, or a binder ring through a punched corner. Keep rings away from little ones.'],
  ];
  const W = [
    ['The jar pull', 'Your child pulls a card. Don’t like it? Put it back and pull once more.'],
    ['Pick one of three', 'Lay out three cards and let your child choose. Choosing is half the fun.'],
    ['Energy check', 'Ask “calm, medium or wiggly?” first, then pull from that energy.'],
    ['Play Menu', 'Velcro four cards onto the menu each morning: calm, wiggly, together and free choice.'],
    ['Big helper', 'An older child reads a 1–3 card aloud and plays it with a younger one, with a grown-up close by.'],
    ['Season swap', 'Add the summer or rainy-day set when the weather turns.'],
  ];
  const G = [['Start here, card guide, safety', '1–6'], ['Ages 1–3 cards', '7–11'], ['Ages 3–5 cards', '12–16'], ['Ages 5–8 cards', '17–21'], ['Ages 8–12 cards', '22–26'], ['Summer + rainy-day sets', '27–30'], ['Card backs (optional)', '31–36'], ['Box dividers', '37–39'], ['Jar labels', '40–41'], ['Play Menu + weekly planners', '42–44'], ['Play Jar Star certificate', '45'], ['Card index & checklist', '46–48'], ['Quick answers', '49']];
  const S = ['Cardstock, 65–110 lb / 176–300 gsm', 'A paper trimmer or scissors', 'Laminator and 3–5 mil pouches (optional)', 'Corner rounder (optional)', 'Hook-and-loop (velcro) dots (optional)', 'A big jar or a 3 × 5 in recipe box'];
  const body = `<div class="tp">${T.map(([h, t], i) => `<div class="tpi"><span class="tn">${i + 1}</span><div><h4>${h}</h4><p>${t}</p></div></div>`).join('')}</div>
  <div class="tpg"><div class="tpb"><span class="kick">Page guide · print only what you need</span>${G.map(([h, n]) => `<div class="pgr"><span>${h}</span><b>${n}</b></div>`).join('')}</div>
  <div class="tpb"><span class="kick">Handy supplies</span>${S.map(t => `<div class="sup">${icon('star', 'i')}<span>${t}</span></div>`).join('')}<p class="tpn">Save ink: the cards print beautifully without backs, and the planners and index work fine in black and white.</p></div></div>
  <div class="ways"><span class="kick">Six ways to play with the cards</span><div class="wg">${W.map(([h, t], i) => `<div class="wy" style="background:${[C.tSun, C.tGrass, C.tSky, C.tPlum, C.tTomato, C.wash][i]}"><h4>${h}</h4><p>${t}</p></div>`).join('')}</div></div>`;
  return contentPage('tips', 'Print, cut, laminate & store', 'Make them last.', body);
}
const tipsCss = `<style>
.tp{display:grid;grid-template-columns:1fr 1fr;gap:14px 24px}
.tpi{display:flex;gap:11px}
.tn{flex:0 0 28px;height:28px;border-radius:50%;background:${C.ink};color:#fff;display:flex;align-items:center;justify-content:center;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:14px}
.tpi h4,.wy h4{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:15px;margin:0 0 2px}
.tpi p{font-size:12px;line-height:1.45;font-weight:600}
.tpg{display:grid;grid-template-columns:1.1fr 1fr;gap:16px;margin-top:12px}
.tpb{background:${C.wash};border-radius:16px;padding:12px 16px}
.pgr{display:flex;justify-content:space-between;font-size:11px;font-weight:700;padding:2px 0;border-bottom:1px solid #E1E7F1}
.pgr b{font-weight:800}
.sup{display:flex;gap:7px;align-items:center;font-size:11.5px;font-weight:700;padding:3px 0}
.sup .i{width:12px;height:12px;color:${C.sun};flex:0 0 12px}
.tpn{font-size:11px;font-weight:600;line-height:1.4;margin-top:8px;opacity:.8}
.ways{margin-top:auto}
.wg{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.wy{border-radius:14px;padding:11px 13px}
.wy p{font-size:11.5px;line-height:1.4;font-weight:600}
</style>`;

function sectionOpener(key, title, sub, count) {
  // not a separate page: used as label above card sheets
  return `${TH[key].name} · ${title}${count ? ` · ${count}` : ''}`;
}

// dividers: 2.4in wide, 3.5in body + 0.45in tab, drawn as one SVG shape with a single cut line
function divider(d, idx) {
  const W = 230.4, H = 379.2, T = 43.2, tw = 104, r = 14, rt = 11;
  const a = [14, (W - tw) / 2, W - tw - 14][idx % 3];
  const shape = `M0 ${T + r}Q0 ${T} ${r} ${T}H${a}V${rt}Q${a} 0 ${a + rt} 0H${a + tw - rt}Q${a + tw} 0 ${a + tw} ${rt}V${T}H${W - r}Q${W} ${T} ${W} ${T + r}V${H - r}Q${W} ${H} ${W - r} ${H}H${r}Q0 ${H} 0 ${H - r}Z`;
  return `<div class="dv" style="--m:${d.m};--t:${d.t};--on:${d.on}">
    <svg class="dsvg" viewBox="-2 -2 ${W + 4} ${H + 4}" aria-hidden="true"><path d="${shape}" fill="${d.m}"/><rect x="7" y="${T + 7}" width="${W - 14}" height="${H - T - 14}" rx="${r - 5}" fill="${d.t}"/><path d="${shape}" fill="none" stroke="#B7C1D3" stroke-width=".8" stroke-dasharray="3 3" transform="translate(0 0)"/></svg>
    <div class="dtab" style="left:${a / 96}in;width:${tw / 96}in">${d.tab}</div>
    <div class="dbody">${d.num ? `<span class="dic dnum">${d.num}</span>` : `<span class="dic">${icon(d.ic)}</span>`}<h3>${d.h}</h3><p>${d.p}</p></div>
  </div>`;
}
function dividerPages() {
  const D = [
    ...BANDS.map(b => ({ m: TH[b.key].m, t: TH[b.key].t, on: TH[b.key].on, tab: b.label, num: b.ages, h: b.label, p: `${CARDS[b.key].length} play cards` })),
    ...Object.entries(CATS).map(([k, v], i) => ({ m: C.ink, t: C.wash, on: '#FFFFFF', tab: v.short, ic: k, h: v.name, p: 'Kind of play' })),
    { m: C.tomato, t: C.tTomato, on: '#FFFFFF', tab: 'Summer', ic: 'sun', h: 'Summer', p: '18 cards' },
    { m: C.ink, t: C.wash, on: '#FFFFFF', tab: 'Rainy day', ic: 'rain', h: 'Rainy day', p: '18 cards' },
    { m: C.tomato, t: C.tTomato, on: '#FFFFFF', tab: 'Favorites', ic: 'heart', h: 'Family favorites', p: 'The ones we play again and again' },
    { m: C.grass, t: C.tGrass, on: '#FFFFFF', tab: 'Tried it', ic: 'star', h: 'Tried it!', p: 'Played at least once' },
    { m: C.sky, t: C.tSky, on: '#FFFFFF', tab: 'Save for later', ic: 'later', h: 'Save for later', p: 'Not today, maybe next time' },
    { m: C.plum, t: C.tPlum, on: '#FFFFFF', tab: 'Our ideas', ic: 'pen', h: 'Our own ideas', p: 'Cards we made up ourselves' },
  ];
  const gx = 0.14, gy = 0.35, H = 3.95, x0 = (SZ.w - (3 * 2.4 + 2 * gx)) / 2, y0 = (SZ.h - (2 * H + gy)) / 2 + 0.15;
  return chunk(D, 6).map((grp, pi) => {
    const cells = grp.map((d, i) => `<div class="dcell" style="left:${x0 + (i % 3) * (2.4 + gx)}in;top:${y0 + Math.floor(i / 3) * (H + gy)}in">${divider(d, pi * 6 + i)}</div>`).join('');
    return pg('divs', `<div class="dhd">${logo('lockup-horizontal', 'lgh')}<span class="pe">Box dividers · cut around the tab · ${pi + 1} of 3</span></div>${cells}<div class="dft">${logo('wordmark', 'lgf')}<span>playbeforepixels.com · ${COPY}</span></div>`);
  });
}
const dividerCss = `<style>
.divs .dhd{position:absolute;left:.5in;right:.5in;top:.45in;display:flex;justify-content:space-between;align-items:center}
.dft{position:absolute;left:.5in;right:.5in;bottom:.4in;display:flex;gap:8px;align-items:center;font-size:7.5px;font-weight:700;color:#7C879C}
.dcell{position:absolute;width:2.4in;height:3.95in}
.dv{position:relative;width:2.4in;height:3.95in}
.dsvg{position:absolute;left:-2px;top:-2px;width:calc(2.4in + 4px);height:calc(3.95in + 4px);overflow:visible}
.dtab{position:absolute;top:0;height:.45in;color:var(--on);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap}
.dbody{position:absolute;left:0;right:0;top:.45in;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 16px}
.dic{width:66px;height:66px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;color:var(--m);margin-bottom:12px}
.dv[style*="--m:${C.sun}"] .dic{color:#C98F00}
.dic .i{width:34px;height:34px}
.dnum{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:22px;letter-spacing:-.02em;color:var(--ink)!important}
.dbody h3{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:25px;line-height:1.02;letter-spacing:-.02em}
.dbody p{font-size:11.5px;font-weight:700;margin-top:6px;opacity:.75}
</style>`;

function labelPages() {
  const ways = [[C.tomato, '#FFFFFF', C.tTomato], [C.sun, C.ink, C.tSun], [C.sky, '#FFFFFF', C.tSky], [C.grass, '#FFFFFF', C.tGrass]];
  const round = ([m, on, t], i) => `<div class="rl" style="--m:${m};--on:${on};--t:${t}"><div class="rli">
    <span class="rlk">${logo(on === C.ink ? 'wordmark' : 'wordmark-white', 'lgr')}</span><span class="rl1">I’m</span><span class="rl2">bored!</span><span class="rl3">Pull a card. Play together.</span>
    <span class="rld">${[C.sun, C.grass, C.sky, C.plum, C.tomato].filter(c => c !== m).map(c => `<i style="background:${c}"></i>`).join('')}</span></div></div>`;
  const p1 = contentPage('labels', 'Jar labels · 1 of 2', 'Round jar labels', `<p class="lead">Four colorways. Cut on the dashed circle and stick to the jar with clear tape or glue dots. Label size: 3.4 in / 8.6 cm.</p>
    <div class="rgrid">${ways.map(round).join('')}</div>`);
  const mini = [[C.sun, -14, 0], [C.grass, -5, 1], [C.sky, 5, 2], [C.tomato, 14, 3]].map(([c, r, i]) => `<g transform="translate(${60 + i * 58},${92 + Math.abs(i - 1.5) * 10}) rotate(${r})"><rect x="-34" y="-50" width="68" height="96" rx="9" fill="#fff"/><rect x="-34" y="-50" width="68" height="20" rx="9" fill="${c}"/><rect x="-34" y="-38" width="68" height="8" fill="${c}"/><rect x="-25" y="-20" width="40" height="7" rx="3.5" fill="${C.ink}" opacity=".5"/><rect x="-25" y="-7" width="50" height="4.5" rx="2.25" fill="${C.ink}" opacity=".2"/><rect x="-25" y="2" width="44" height="4.5" rx="2.25" fill="${C.ink}" opacity=".2"/><rect x="-25" y="18" width="50" height="16" rx="6" fill="${c}" opacity=".25"/></g>`).join('');
  const wide = (m, on, t, name) => `<div class="wlab" style="--m:${m};--on:${on};--t:${t}"><div class="wl1"><span class="wlt">I’m bored!</span><span class="wls">${name}</span></div><div class="wl2">${icon('talk')}<span>Pull a card · Play together · Talk about it</span></div><svg class="wlart" viewBox="0 0 290 180" aria-hidden="true">${mini}</svg></div>`;
  const small = (h, e, m, t) => `<div class="slab" style="--m:${m};--t:${t}"><span class="en">${e ? meter(e) : icon('heart', 'mt')}${h}</span><b>${e ? `${h} jar` : 'Done & loved'}</b><p>${e === 'c' ? 'Quiet, sit-down play' : e === 'm' ? 'Up-and-about play' : e === 'w' ? 'Big-body play' : 'Cards we loved go here'}</p></div>`;
  const p2 = contentPage('labels', 'Jar labels · 2 of 2', 'Wrap labels & energy jars', `<p class="lead">Use one big jar, or split the cards into three energy jars so your child can choose the mood first.</p>
    <div class="wgrid2">${wide(C.ink, '#FFFFFF', C.wash, 'Play cards for our family')}${wide(C.plum, '#FFFFFF', C.tPlum, 'Screen-free play ideas')}</div>
    <div class="sgrid">${small('Calm', 'c', C.sky, C.tSky)}${small('Medium', 'm', C.grass, C.tGrass)}${small('Wiggly', 'w', C.tomato, C.tTomato)}${small('Loved', null, C.sun, C.tSun)}</div>`);
  return [p1, p2];
}
const labelCss = `<style>
.rgrid{display:grid;grid-template-columns:3.4in 3.4in;gap:.3in .45in;justify-content:center;margin-top:10px}
.rl{width:3.4in;height:3.4in;border-radius:50%;outline:.8px dashed #B7C1D3;outline-offset:3px;background:var(--m);display:flex;align-items:center;justify-content:center}
.rli{width:2.9in;height:2.9in;border-radius:50%;border:2.5px solid rgba(255,255,255,.55);display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--on)}
.rl[style*="--m:${C.sun}"] .rli{border-color:rgba(29,41,64,.25)}
.rlk{margin-bottom:9px}.lgr{height:13px;display:block}
.rl1,.rl2{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;letter-spacing:-.04em;line-height:.86}
.rl1{font-size:40px}.rl2{font-size:58px}
.rl3{font-weight:800;font-size:12px;margin-top:9px}
.rld{display:flex;gap:5px;margin-top:10px}.rld i{width:12px;height:12px;border-radius:50%;outline:2px solid #fff}
.wgrid2{display:flex;flex-direction:column;gap:.22in;margin:6px 0 .25in}
.wlab{height:2.0in;border-radius:18px;background:var(--m);color:var(--on);outline:.8px dashed #B7C1D3;outline-offset:3px;display:flex;flex-direction:column;justify-content:center;padding:0 .4in;position:relative;overflow:hidden}
.wlt{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:66px;letter-spacing:-.04em;line-height:.9;display:block}
.wls{font-weight:800;font-size:13px;letter-spacing:.14em;text-transform:uppercase;opacity:.85;display:block;margin-top:6px}
.wlart{position:absolute;right:.25in;top:50%;transform:translateY(-50%);width:2.9in;height:1.8in}
.wl2{display:flex;align-items:center;gap:8px;margin-top:14px;font-weight:700;font-size:13px}
.wl2 .i{width:20px;height:20px}
.sgrid{display:grid;grid-template-columns:1fr 1fr;gap:.25in}
.slab{height:1.45in;border-radius:16px;background:var(--t);border:5px solid var(--m);outline:.8px dashed #B7C1D3;outline-offset:3px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;padding:0 .3in}
.slab .en{display:inline-flex;align-items:center;gap:5px;background:#fff;border-radius:20px;height:22px;padding:0 10px 0 7px;font-weight:800;font-size:10px;letter-spacing:.08em;text-transform:uppercase}
.slab .mt{width:16px;height:12px;display:block;color:var(--m)}
.slab b{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:28px;letter-spacing:-.02em;margin-top:6px}
.slab p{font-size:12px;font-weight:700;opacity:.75}
</style>`;

function menuPage(fields) {
  const slots = [['Calm pick', C.sky, C.tSky], ['Wiggly pick', C.tomato, C.tTomato], ['Together pick', C.grass, C.tGrass], ['Free choice', C.plum, C.tPlum]];
  const f = n => fields ? ` data-field="${n}"` : '';
  return contentPage('menu', 'Choice board · laminate me', 'Today’s Play Menu', `<p class="lead ml">Velcro one card into each space, then let your child choose. Done? Move it to the “Done & loved” jar.</p>
  <div class="mgrid">${slots.map(([h, m, t]) => `<div class="ms" style="--m:${m};--t:${t}"><span class="mh">${h}</span><div class="mslot"><i class="vd"></i><span>Card goes here</span></div></div>`).join('')}</div>`);
}
const menuCss = `<style>
.menu .ph{margin-bottom:6px}.ml{font-size:13.5px;margin-bottom:10px}
.mgrid{display:grid;grid-template-columns:repeat(2,2.85in);gap:.12in .3in;justify-content:center}
.ms{background:var(--t);border-radius:16px;padding:5px 0 .12in;display:flex;flex-direction:column;align-items:center}
.mh{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:15px;color:var(--ink);margin-bottom:4px}
.mslot{width:2.6in;height:3.6in;border-radius:14px;border:2.5px dashed var(--m);background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}
.mslot span{font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;opacity:.45}
.vd{width:.55in;height:.55in;border-radius:50%;background:var(--t);display:block}
</style>`;

function weekPage(start, fields) {
  const days = start === 'mon' ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const col = [C.tSun, C.tGrass, C.tSky, C.tPlum, C.tTomato, C.tSun, C.tGrass];
  const f = n => fields ? ` data-field="${n}"` : '';
  const rows = days.map((d, i) => `<div class="wr"><div class="wd" style="background:${col[i]}">${d}</div><div class="wc"${f(`wk_${start}_${i}_card`)}></div><div class="we"><i${f(`wk_${start}_${i}_c`)}></i><i${f(`wk_${start}_${i}_m`)}></i><i${f(`wk_${start}_${i}_w`)}></i></div><div class="wc wide"${f(`wk_${start}_${i}_said`)}></div><div class="wh">${[0, 1, 2].map(() => icon('star', 'wst')).join('')}</div></div>`).join('');
  return contentPage('week', `Weekly planner · ${start === 'mon' ? 'Monday' : 'Sunday'} start`, 'Our Play Week', `
  <div class="wtop"><div><span class="kick">Week of</span><div class="mline"${f(`wk_${start}_week`)}></div></div><div><span class="kick">Player(s)</span><div class="mline"${f(`wk_${start}_players`)}></div></div></div>
  <div class="wtab"><div class="wr wth"><div>Day</div><div>Card we played</div><div class="wec">Energy<br><span>C · M · W</span></div><div>Something they said</div><div>Loved it?</div></div>${rows}</div>
  <div class="wnote"><span class="hand">Why write it down?</span><p>The funny things children say while they play are easy to forget. A line a day becomes a little record of your year, and a reminder of which cards to play again.</p></div>`);
}
const weekCss = `<style>
.mline{height:28px;border-bottom:1.5px solid var(--line)}
.wtop{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:14px}
.wtab{display:flex;flex-direction:column;gap:6px}
.wr{display:grid;grid-template-columns:1.05in 2.1in .78in 1fr .72in;gap:8px;align-items:stretch;min-height:.9in}
.wth{min-height:0;font-weight:800;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;opacity:.62;align-items:end}
.wth span{letter-spacing:.05em}
.wd{border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:14px}
.wc{border:1.5px solid ${C.wash};border-radius:12px;background:#fff}
.we{display:flex;align-items:center;justify-content:center;gap:5px}
.we i{width:14px;height:14px;border-radius:50%;border:1.5px solid ${C.ink};opacity:.55}
.wh{display:flex;align-items:center;justify-content:center;gap:2px;color:${C.sun}}
.wst{width:17px;height:17px;opacity:.5}
.wnote{margin-top:auto;display:flex;gap:16px;align-items:center;background:${C.wash};border-radius:16px;padding:12px 18px}
.wnote .hand{font-size:24px;flex:0 0 1.8in}
.wnote p{font-size:12px;line-height:1.45;font-weight:600}
</style>`;

function indexPages() {
  const col = (key, list, title) => `<div class="ixc" style="${tvars(TH[key])}"><div class="ixh">${title}<span>${list.length} cards</span></div>${list.map((cd, i) => `<div class="ixr"><i class="bx"></i><span class="nn">${String(i + 1).padStart(2, '0')}</span><span class="tt2">${esc(cd.t)}</span><span class="ic2">${icon(cd.c)}</span><span class="e2">${meter(cd.e)}</span></div>`).join('')}</div>`;
  const legend = `<div class="ixl">Tick a box when you’ve played a card. ${icon('build')}${icon('pretend')}${icon('move')}${icon('outside')}${icon('words')}${icon('music')}${icon('kitchen')}${icon('games')} = kind of play · bars = energy</div>`;
  const p1 = contentPage('index', 'Card index & checklist · 1 of 3', null, legend + `<div class="ixg">${col('b13', CARDS.b13, 'Ages 1–3')}${col('b35', CARDS.b35, 'Ages 3–5')}</div>`);
  const p2 = contentPage('index', 'Card index & checklist · 2 of 3', null, legend + `<div class="ixg">${col('b58', CARDS.b58, 'Ages 5–8')}${col('b812', CARDS.b812, 'Ages 8–12')}</div>`);
  const p3 = contentPage('index', 'Card index & checklist · 3 of 3', null, legend + `<div class="ixg">${col('summer', MINI.summer.cards, 'Summer set')}${col('rainy', MINI.rainy.cards, 'Rainy-day set')}</div>
    <div class="ixn"><h4>Blank cards</h4><p>Each age band ends with a few blank “your idea” cards, and the editable file has fillable blanks in every color. The best cards are often the ones your child invents. Write them down!</p></div>`);
  return [p1, p2, p3];
}
const indexCss = `<style>
.index .phd{margin-bottom:12px}
.ixl{font-size:10.5px;font-weight:700;opacity:.8;margin-bottom:10px;display:flex;align-items:center;gap:3px;flex-wrap:wrap}
.ixl .i{width:13px;height:13px}
.ixg{display:grid;grid-template-columns:1fr 1fr;gap:22px}
.ixh{background:var(--m);color:var(--on);border-radius:10px;padding:6px 10px;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:15px;display:flex;justify-content:space-between;align-items:center;margin-bottom:3px}
.ixh span{font-family:"Nunito Sans",sans-serif;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;opacity:.9}
.ixr{display:flex;align-items:center;gap:7px;height:.215in;border-bottom:1px solid ${C.wash};font-size:11px;font-weight:700}
.bx{width:11px;height:11px;border:1.4px solid ${C.ink};border-radius:3px;opacity:.6;flex:0 0 11px}
.nn{width:16px;font-size:9px;font-weight:800;opacity:.5}
.tt2{flex:1}
.ic2 .i{width:13px;height:13px;display:block;color:var(--m)}
.ixc[style*="--m:${C.sun}"] .ic2 .i{color:#C98F00}
.e2 .mt{width:13px;height:10px;display:block}
.ixn{margin-top:22px;background:${C.wash};border-radius:16px;padding:14px 18px}
.ixn h4{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:15px;margin:0 0 3px}
.ixn p{font-size:12px;line-height:1.45;font-weight:600}
</style>`;

function byeArt() {
  const F = 150;
  const k1 = Object.assign({}, KIDS.C, { x: 150, y: F - 27 * 1.05, s: 1.05, aL: 20, aR: -150, face: 'laugh' });
  const k2 = Object.assign({}, KIDS.E, { x: 370, y: F - 27 * 1.05, s: 1.05, aL: 150, aR: -150, face: 'joy' });
  const g = Object.assign({}, ADULTS.G4, { x: 260, y: F - 81 * 0.78, s: 0.78, aL: 20, aR: -140, face: 'smile' });
  return `<svg class="byesvg" viewBox="0 -50 520 210" aria-hidden="true"><rect x="40" y="${F}" width="440" height="6" rx="3" fill="${C.ink}" opacity=".07"/>${adult(g)}${kid(k1)}${kid(k2)}<g transform="translate(455,${F - 64}) scale(.36)">${jarSVG({ lab: C.grass })}</g></svg>`;
}
function certPage(fields) {
  const f = n => fields ? ` data-field="${n}"` : '';
  const k = Object.assign({}, KIDS.D, { x: 170, y: 250 - 27 * 1.5, s: 1.5, aL: 150, aR: -150, face: 'laugh' });
  const k2 = Object.assign({}, KIDS.B, { x: 330, y: 250 - 27 * 1.35, s: 1.35, aL: 140, aR: -30, face: 'joy' });
  const art = `<svg viewBox="0 0 520 260" width="100%" height="100%" aria-hidden="true"><circle cx="255" cy="150" r="108" fill="${C.tSun}"/>${[[60, 60], [470, 70], [90, 190], [450, 200], [255, 22]].map(([x, y]) => `<use href="#star" transform="translate(${x},${y}) scale(1.2)"/>`).join('')}${kid(k)}${kid(k2)}<g transform="translate(430,186) scale(.4)">${jarSVG({ lab: C.tomato })}</g></svg>`;
  return pg('cert', `<div class="ctf">
    <div class="ctl">${logo('lockup-horizontal', 'lgh')}<span class="pe">Fridge certificate · print, fill in, share</span></div>
    <div class="cta">${art}</div>
    <div class="ctk">Official</div>
    <h2 class="cth">Play Jar Star</h2>
    <p class="ctp">This certificate goes to</p>
    <div class="ctn"${f('cert_name')}></div>
    <p class="ctp">for playing <span class="ctm">${[10, 25, 50, 100].map(n => `<i${f('cert_' + n)}></i>${n}`).join(' ')}</span> cards from the “I’m bored!” jar.</p>
    <div class="ctr"><div><span class="kick">Favorite card</span><div class="mline"${f('cert_fav')}></div></div><div><span class="kick">Date</span><div class="mline"${f('cert_date')}></div></div></div>
    <div class="ctq"><div class="ctq1"><span class="kick">Our top three cards</span>${[1, 2, 3].map(i => `<div class="ctli"><b>${i}</b><div class="mline"${f('cert_top' + i)}></div></div>`).join('')}</div>
    <div class="ctq2"><span class="kick ctqk">${icon('talk', 'ctqi')}Best thing we said while we played</span><div class="ctqb"${f('cert_said')}></div></div></div>
    <div class="ctb"><span>Pull a card. Play together.</span>${logo('mark', 'lgm')}<span>playbeforepixels.com</span></div>
  </div>`);
}
const certCss = `<style>
.cert{background:#fff}
.ctf{position:absolute;inset:.45in;border:10px solid ${C.sun};border-radius:28px;display:flex;flex-direction:column;align-items:center;text-align:center;padding:.3in .5in}
.ctl{align-self:stretch;display:flex;justify-content:space-between;align-items:center}
.cta{width:5.2in;height:2.6in;margin-top:10px}
.ctk{font-weight:800;font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:${C.tomato};margin-top:6px}
.cth{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:66px;letter-spacing:-.035em;line-height:1}
.ctp{font-size:17px;font-weight:700;margin-top:14px}
.ctn{width:5in;height:.55in;border-bottom:2px solid ${C.ink};margin-top:6px}
.ctm{display:inline-flex;gap:6px;align-items:center;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-size:19px;margin:0 4px}
.ctm i{width:17px;height:17px;border:2px solid ${C.ink};border-radius:50%;display:inline-block;margin-left:6px}
.ctr{display:grid;grid-template-columns:1.6fr 1fr;gap:26px;width:5.6in;margin-top:22px;text-align:left}
.ctq{display:grid;grid-template-columns:1fr 1fr;gap:22px;width:6.3in;margin-top:24px;text-align:left}
.ctli{display:flex;align-items:flex-end;gap:8px}.ctli b{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-size:16px;color:${C.tomato};padding-bottom:4px}.ctli .mline{flex:1}
.ctq2{background:${C.tSky};border-radius:16px;padding:12px 14px;position:relative}
.ctqk{display:flex;align-items:center;gap:6px}.ctqi{width:16px;height:16px;color:${C.sky};flex:0 0 16px}
.ctqb{height:1.05in}
.ctb{margin-top:auto;display:flex;gap:14px;align-items:center;font-weight:800;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#5B667C}
.lgm{height:.35in;display:block}
</style>`;
function faqPage() {
  const Q = [
    ['My child is between two age bands.', 'Use both. The bands overlap on purpose, and many cards work a year or two either side.'],
    ['My child says no to every card.', 'Offer just two cards, or let them pull one without looking. A little boredom is fine too: it often turns into their own idea.'],
    ['Do I have to play too?', 'For ages 1–3, yes: you are the best toy in the room. For older children, start together, then step back and be the audience.'],
    ['Which pages should I print?', 'Only what you need. The page guide on the “Make them last” page lists every section.'],
    ['Can I print it again?', 'Yes. Print as many copies as your own household needs, as often as you like.'],
    ['Can I print at a print shop?', 'Yes, for your own family’s use. Choose cardstock and ask them to print at 100% (actual size).'],
    ['Can I share it with my class, group or friends?', 'This file is licensed for one household. For groups or classrooms, ask about a license through the contact form at playbeforepixels.com.'],
    ['Is there a screen version?', 'No, and that’s on purpose. The cards are paper so the play happens off-screen.'],
    ['How do I type on the blank cards?', 'Open the editable file in a free PDF reader app that supports fill-in forms, click a box and type. Or use the PNG template set in a design app.'],
    ['Where is my free bonus?', 'On the last page: scan the QR code or type the short link.'],
  ];
  return contentPage('faq', 'Quick answers', 'Questions,<br>answered.', `<div class="fq">${Q.map(([q, a]) => `<div class="fqi"><h4>${q}</h4><p>${a}</p></div>`).join('')}</div>
  <div class="fqh"><b>Download or file trouble?</b> Answers to common download and printing questions are at playbeforepixels.com/help.</div>`);
}
const faqCss = `<style>
.fq{display:grid;grid-template-columns:1fr 1fr;gap:14px 24px}
.fqi{background:${C.wash};border-radius:14px;padding:11px 14px}
.fqi h4{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:14.5px;margin:0 0 3px;line-height:1.2}
.fqi p{font-size:11.8px;line-height:1.45;font-weight:600}
.fqh{margin-top:auto;background:${C.tSky};border-radius:14px;padding:12px 16px;font-size:12px;font-weight:600}
</style>`;
function bonusPage() {
  const next = [
    ['52 Play & Talk Cards', 'For ages 0–5: one simple play and one talk tip on every card.', C.tSun],
    ['Visual Routine Cards', 'Picture cards for mornings, bedtime and the moments in between.', C.tSky],
    ['100 Screen-Free Plays', 'Our activity book: 100 plays sorted by age, each with a talk line and a safety note.', C.tGrass],
  ];
  return contentPage('bonus', 'Your free bonus', 'One more thing:<br>a free bonus.', `
  <div class="bn">
    <div class="bnq">${QR}<span class="bnu">playbeforepixels.com/bonus/<br>${SLUG}</span></div>
    <div class="bnt"><p class="lead">Scan the code or type the link for this pack’s free companion: a printable seasonal mini-set of play cards and a short “play at this age” email each month.</p>
    <p class="bnp">We only ask for your email and your child’s birth month and year, never names. Unsubscribe any time.</p></div>
  </div>
  <span class="kick" style="margin-top:22px">More from Play Before Pixels</span>
  <div class="nx">${next.map(([h, t, bg]) => `<div class="nxi" style="background:${bg}"><h4>${h}</h4><p>${t}</p></div>`).join('')}</div>
  <div class="bye">${byeArt()}<span class="hand">Happy playing!</span></div>
  <div class="legal">
    <p><b>${COPY}</b> All rights reserved.</p>
    <p>This file is for use in your own home. You may print as many copies as your family needs. Please don’t share, resell or post the file or its pages. For group, classroom or other licenses, write to us through the contact form at playbeforepixels.com.</p>
    <p>These cards are ideas for supervised play at home. They are parent education, not medical, developmental or professional advice, and they don’t replace the judgment of the grown-up in charge. Follow the safety page and every card’s safety line, and skip anything that doesn’t suit your child.</p>
    <p>Play Before Pixels is an independent small business. No brands, products or organizations are named or endorsed in this pack.</p>
  </div>`);
}
const bonusCss = `<style>
.bn{display:flex;gap:28px;align-items:center;background:${C.tSun};border-radius:22px;padding:22px 26px}
.bnq{flex:0 0 1.9in;background:#fff;border-radius:16px;padding:14px;display:flex;flex-direction:column;align-items:center;gap:8px}
.bnq .qr{width:1.5in;height:1.5in;display:block}
.bnu{font-size:8.5px;font-weight:800;text-align:center;word-break:break-all;line-height:1.3}
.bnt .lead{font-size:15.5px;margin-bottom:10px}
.bnp{font-size:12px;font-weight:700;opacity:.8}
.nx{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.nxi{border-radius:16px;padding:14px 15px}
.nxi h4{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:16px;margin:0 0 4px}
.nxi p{font-size:11.5px;line-height:1.42;font-weight:600}
.bye{margin-top:18px;display:flex;align-items:center;justify-content:center;gap:10px}
.byesvg{width:4.6in;height:1.86in}
.bye .hand{font-size:40px;color:${C.tomato};transform:rotate(-4deg)}
.legal{margin-top:auto;border-top:2px solid ${C.wash};padding-top:12px;display:flex;flex-direction:column;gap:6px}
.legal p{font-size:9.5px;line-height:1.45;font-weight:600;opacity:.85}
</style>`;

// ---------- assemble ----------
function bandSheets(key, withBacks) {
  const list = CARDS[key] || MINI[key].cards;
  const fronts = list.map((cd, i) => card(cd, key, i + 1));
  while (fronts.length % 9) fronts.push(blankCard(key));
  const groups = chunk(fronts, 9);
  const total = groups.length;
  const lbl = i => `${TH[key].name} · sheet ${i + 1} of ${total}`;
  if (!withBacks) return groups.map((g, i) => cardSheet(g, lbl(i)));
  const backs = Array.from({ length: 9 }, () => cardBack(key));
  return groups.flatMap((g, i) => [cardSheet(g, lbl(i)), cardSheet(backs, `Backs · ${TH[key].name} · reverse of sheet ${i + 1}`)]);
}
function backsPages() {
  return ['b13', 'b35', 'b58', 'b812', 'summer', 'rainy'].map(k => cardSheet(Array.from({ length: 9 }, () => cardBack(k)), `Card backs (optional) · ${TH[k].name}`));
}
const ALLCSS = [certCss, faqCss, coverCss, welcomeCss, anatomyCss, agesCss, safetyCss, tipsCss, dividerCss, labelCss, menuCss, weekCss, indexCss, bonusCss].join('\n');
function doc(fontHref, size, pages, extra = '') {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>“I’m Bored” Play Cards · ${size.name} · Play Before Pixels</title>
${css(fontHref, size)}
${ALLCSS}
${extra}
</head><body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${SYMBOLS.join('\n')}${ICONS.join('\n')}</defs></svg>
${pages.join('\n')}
</body></html>`;
}

function mainPages(duplex) {
  return [
    coverPage(), welcomePage(), anatomyPage(), agesPage(), safetyPage(), tipsPage(),
    ...bandSheets('b13', duplex), ...bandSheets('b35', duplex), ...bandSheets('b58', duplex), ...bandSheets('b812', duplex),
    ...bandSheets('summer', duplex), ...bandSheets('rainy', duplex),
    ...(duplex ? [] : backsPages()),
    ...dividerPages(), ...labelPages(), menuPage(false), weekPage('mon', false), weekPage('sun', false), certPage(false),
    ...indexPages(), faqPage(), bonusPage(),
  ];
}

function duplexPages() {
  return ['b13', 'b35', 'b58', 'b812', 'summer', 'rainy'].flatMap(k => bandSheets(k, true));
}
function editablePages() {
  // one sheet of fillable blank cards per colour + fillable menu, planners and a name label
  const intro = contentPage('edintro', 'Editable file', 'Make your own cards', `<p class="lead">This file has fill-in boxes. Open it in a free PDF reader app that supports fill-in forms, click a box and type. Save, then print at 100% on cardstock.</p>
  <div class="edl">
    <div><h4>What you can edit</h4><p>Blank cards in all six colors (title, what you need, try it, talk, energy), both weekly planners (Monday and Sunday start) and the Play Jar Star certificate.</p></div>
    <div><h4>Prefer a design app?</h4><p>Use the PNG template set in your download: place a blank card, jar label or divider as a background image, then add your own text boxes. Keep the text inside the white panel.</p></div>
    <div><h4>Handwriting works too</h4><p>Every blank also prints as a lined card, so you can write ideas with your child instead of typing them.</p></div>
    <div><h4>Keep it safe</h4><p>Cards you write follow the same safety rules: see the safety page in the main file.</p></div>
  </div>
  <p class="edc">${COPY} For use in your own home.</p>`);
  const sheets = ['b13', 'b35', 'b58', 'b812', 'summer', 'rainy'].map(k => cardSheet(Array.from({ length: 9 }, () => blankCard(k, { fields: true })), `Editable blank cards · ${TH[k].name}`));
  return [intro, ...sheets, menuPage(true), weekPage('mon', true), weekPage('sun', true), certPage(true)];
}
const edCss = `<style>
.edl{display:grid;grid-template-columns:1fr 1fr;gap:18px 26px;margin-top:10px}
.edl h4{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:16px;margin:0 0 3px}
.edl p{font-size:12.5px;line-height:1.45;font-weight:600}
.edc{margin-top:auto;font-size:10px;font-weight:700;opacity:.7}
</style>`;

// PNG template assets (for design apps): each asset is its own .page element at print size
function pngTemplatesDoc() {
  const items = [];
  for (const k of ['b13', 'b35', 'b58', 'b812', 'summer', 'rainy']) {
    items.push({ name: `blank-card-${k}`, w: 2.5, h: 3.5, html: blankCard(k, { fields: true }) });
    items.push({ name: `lined-card-${k}`, w: 2.5, h: 3.5, html: blankCard(k) });
    items.push({ name: `card-back-${k}`, w: 2.5, h: 3.5, html: cardBack(k) });
  }
  [[C.tomato, 'tomato'], [C.sun, 'sun'], [C.sky, 'sky'], [C.grass, 'grass']].forEach(([m, n]) => {
    items.push({ name: `round-label-blank-${n}`, w: 3.4, h: 3.4, html: `<div class="rl" style="--m:${m};outline:0"><div class="rli" style="${m === C.sun ? 'border-color:rgba(29,41,64,.25)' : ''}"></div></div>` });
  });
  [[C.ink, C.wash, 'ink'], [C.plum, C.tPlum, 'plum']].forEach(([m, t, n]) => {
    items.push({ name: `wrap-label-blank-${n}`, w: 7.5, h: 2.0, html: `<div class="wlab" style="--m:${m};--t:${t};outline:0;height:2in"></div>` });
  });
  [[C.sun, C.tSun, C.ink, 'sun'], [C.grass, C.tGrass, '#fff', 'grass'], [C.sky, C.tSky, '#fff', 'sky'], [C.plum, C.tPlum, '#fff', 'plum'], [C.tomato, C.tTomato, '#fff', 'tomato'], [C.ink, C.wash, '#fff', 'ink']].forEach(([m, t, on, n], i) => {
    items.push({ name: `divider-blank-${n}`, w: 2.4, h: 3.95, html: divider({ m, t, on, tab: '', ic: 'pen', h: '', p: '' }, 1).replace(/<div class="dbody">[\s\S]*?<\/div>\s*<\/div>$/, '</div>') });
  });
  const pages = items.map(it => `<section class="page asset" data-name="${it.name}" style="width:${it.w}in;height:${it.h}in">${it.html}</section>`);
  fs.writeFileSync(path.join(__dirname, 'png-templates-manifest.json'), JSON.stringify(items.map(i => i.name)));
  return pages;
}

// ---------- write ----------
SZ = SIZES.letter; BASE = '../../';
fs.writeFileSync(path.join(ROOT, 'source.html'), doc('../../brand/fonts/fonts.css', SZ, mainPages(false)));
BASE = '../../../';
fs.writeFileSync(path.join(__dirname, 'duplex-letter.html'), doc('../../../brand/fonts/fonts.css', SZ, duplexPages()));
fs.writeFileSync(path.join(__dirname, 'editable-letter.html'), doc('../../../brand/fonts/fonts.css', SZ, editablePages(), edCss));
fs.writeFileSync(path.join(__dirname, 'cover.html'), doc('../../../brand/fonts/fonts.css', SZ, [coverPage()], '<style>body{width:8.5in}</style>'));
SZ = SIZES.a4;
fs.writeFileSync(path.join(__dirname, 'source-a4.html'), doc('../../../brand/fonts/fonts.css', SZ, mainPages(false)));
fs.writeFileSync(path.join(__dirname, 'duplex-a4.html'), doc('../../../brand/fonts/fonts.css', SZ, duplexPages()));
fs.writeFileSync(path.join(__dirname, 'editable-a4.html'), doc('../../../brand/fonts/fonts.css', SZ, editablePages(), edCss));
SZ = SIZES.letter;
fs.writeFileSync(path.join(__dirname, 'png-templates.html'), doc('../../../brand/fonts/fonts.css', SZ, pngTemplatesDoc(), '<style>.asset{page-break-after:auto}</style>'));

const counts = Object.fromEntries(Object.entries(CARDS).map(([k, v]) => [k, v.length]));
console.log('cards', counts, 'summer', MINI.summer.cards.length, 'rainy', MINI.rainy.cards.length, 'pages', mainPages(false).length);


// ---------- store images: mockup (1600x1200) and Etsy listing images (2000x2000 = 1000px pages at 2x) ----------
const PV = n => `../preview/p${String(n).padStart(2, '0')}.png`;
const CD = (k, i, extra = '') => `<div class="mc ${extra}">${card((CARDS[k] || MINI[k].cards)[i], k, i + 1)}</div>`;
const BK = (k, extra = '') => `<div class="mc ${extra}">${cardBack(k)}</div>`;
const mkCss = `<style>
.mc{width:2.5in;height:3.5in;position:absolute}
.mc .card{padding:0}.mc .panel{box-shadow:0 10px 24px rgba(29,41,64,.16)}
.paper{position:absolute;background:#fff;box-shadow:0 14px 34px rgba(29,41,64,.16)}
.paper img{width:100%;height:100%;display:block}
.L{width:1000px;height:1000px;position:relative;overflow:hidden;background:${C.wash};font-family:"Nunito Sans",sans-serif;color:${C.ink}}
.L .lh{position:absolute;left:64px;top:56px;right:64px}
.L .lk{font-weight:800;font-size:15px;letter-spacing:.16em;text-transform:uppercase;color:${C.tomato}}
.L h2{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:64px;line-height:.98;letter-spacing:-.035em;margin:8px 0 0}
.L .ls{font-size:22px;font-weight:600;line-height:1.4;margin-top:12px;max-width:760px}
.L .lg1{position:absolute;right:64px;bottom:48px;height:34px}
.L .chip{display:inline-flex;align-items:center;gap:8px;border-radius:40px;padding:10px 20px;font-weight:800;font-size:19px;background:#fff}
.blob{position:absolute;border-radius:50%}
.L .chip .i{width:22px;height:22px}
</style>`;
function mockupPage() {
  return `<section class="page mock" style="width:1600px;height:1200px;background:${C.wash};position:relative;overflow:hidden">
    <div class="blob" style="width:1000px;height:1000px;left:-200px;top:-120px;background:${C.tSun}"></div>
    <div class="blob" style="width:640px;height:640px;right:-140px;top:-200px;background:${C.tSky}"></div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:300px;background:#E9EEF6"></div>
    <div class="paper" style="left:760px;top:170px;width:560px;height:725px;transform:rotate(6deg)"><img src="${PV(12)}"></div>
    <div style="position:absolute;left:120px;top:250px;width:560px;height:700px"><svg viewBox="-110 -110 220 300" width="100%" height="100%">${jarSVG({ lab: C.tomato })}</svg></div>
    <div style="position:absolute;left:170px;top:915px;width:470px;height:50px;border-radius:50%;background:rgba(29,41,64,.16);filter:blur(16px)"></div>
    ${place(BK('b812'), 1330, 250, 16, 0.95)}
    ${place(CD('b35', 16), 640, 590, -10, 1.12)}
    ${place(CD('b13', 3), 945, 560, -1, 1.12)}
    ${place(CD('b58', 1), 1245, 580, 8, 1.12)}
  </section>`;
}
function L(inner, bg = C.wash) { return `<section class="page L" style="background:${bg}">${inner}${logo('lockup-horizontal', 'lg1')}</section>`; }
const at = (x, y, r = 0, sc = 1) => `left:${x}px;top:${y}px;transform:rotate(${r}deg) scale(${sc});transform-origin:0 0`;
const place = (html, x, y, r, sc) => html.replace(/class="mc ?[^"]*"/, `class="mc" style="${at(x, y, r, sc)}"`);
function listingPages() {
  const P = [];
  // 1 hero
  P.push(L(`<div class="lh"><div class="lk">Printable · ages 1–12</div><h2 style="font-size:92px">150 “I’m bored!”<br>Play Cards</h2><p class="ls">Screen-free play ideas sorted by age and energy, with a talk prompt on every card.</p></div>
    <div style="position:absolute;left:40px;top:410px;width:330px;height:430px"><svg viewBox="-110 -110 220 300" width="100%" height="100%">${jarSVG({ lab: C.tomato })}</svg></div>
    ${place(CD('b812', 0), 330, 440, -14, 1.02)}${place(CD('b58', 1), 470, 390, -5, 1.02)}${place(CD('b13', 3), 620, 380, 5, 1.02)}${place(CD('b35', 2), 745, 420, 14, 1.02)}
    <div style="position:absolute;left:64px;bottom:44px;display:flex;gap:10px;flex-wrap:wrap;width:640px"><span class="chip">+ 36 summer & rainy-day cards</span><span class="chip">Editable · US Letter + A4</span></div>`, C.tSun));
  // 2 what's inside
  const inside = [['150', 'play cards, 4 age bands'], ['36', 'summer + rainy-day cards'], ['30', 'blank “your idea” cards'], ['18', 'box dividers'], ['10', 'jar labels, 4 colorways'], ['6', 'card-back designs'], ['1', 'Play Menu choice board'], ['2', 'weekly planners (Mon/Sun)'], ['1', 'Play Jar Star certificate'], ['3', 'pages of card index & checklist']];
  P.push(L(`<div class="lh"><div class="lk">What’s inside</div><h2>Everything for a<br>play jar that works.</h2></div>
    <div style="position:absolute;left:64px;top:300px;width:400px">${inside.map(([n, t]) => `<div style="display:flex;gap:14px;align-items:baseline;padding:8px 0;border-bottom:2px solid #E1E7F1;font-size:20px;font-weight:700"><b style="font-family:Bricolage Grotesque;font-size:30px;color:${C.tomato};width:62px">${n}</b>${t}</div>`).join('')}</div>
    <div class="paper" style="${at(520, 300, -4)};width:230px;height:298px"><img src="${PV(7)}"></div>
    <div class="paper" style="${at(730, 290, 5)};width:230px;height:298px"><img src="${PV(37)}"></div>
    <div class="paper" style="${at(510, 600, 3)};width:230px;height:298px"><img src="${PV(40)}"></div>
    <div class="paper" style="${at(735, 610, -4)};width:230px;height:298px"><img src="${PV(42)}"></div>`));
  // 3 anatomy
  const marks = [['Age band color', 'Find your child’s cards at a glance'], ['Energy level', 'Calm, medium or wiggly'], ['You need', 'Everyday things only'], ['Try it', 'One or two short steps'], ['Talk prompt', 'One thing to say while you play'], ['Safety line', 'On every single card']];
  P.push(L(`<div class="lh"><div class="lk">How the cards work</div><h2>Read a card in<br>five seconds.</h2></div>
    ${place(CD('b35', 16), 90, 290, -3, 1.75)}
    <div style="position:absolute;left:570px;top:320px;width:370px">${marks.map(([h, t], i) => `<div style="display:flex;gap:14px;margin-bottom:22px"><span style="flex:0 0 38px;height:38px;border-radius:50%;background:${C.tomato};color:#fff;font-weight:800;font-size:19px;display:flex;align-items:center;justify-content:center">${i + 1}</span><div><div style="font-family:Bricolage Grotesque;font-weight:800;font-size:25px">${h}</div><div style="font-size:18px;font-weight:600">${t}</div></div></div>`).join('')}</div>`, '#FFFFFF'));
  // 4 young ages
  P.push(L(`<div class="lh"><div class="lk">Sorted by age</div><h2>Ages 1–3 and 3–5</h2><p class="ls" style="font-size:19px">Every 1–3 card uses only things bigger than a toilet-paper tube.</p></div>
    ${place(CD('b13', 0), 70, 250, -4, 1.08)}${place(CD('b13', 12), 355, 240, 0, 1.08)}${place(CD('b13', 19), 640, 250, 4, 1.08)}
    ${place(CD('b35', 12), 110, 570, -3, 0.95)}${place(CD('b35', 2), 370, 560, 1, 0.95)}${place(CD('b35', 33), 620, 570, 4, 0.95)}`, C.tGrass));
  // 5 older ages
  P.push(L(`<div class="lh"><div class="lk">Sorted by age</div><h2>Ages 5–8 and 8–12</h2><p class="ls" style="font-size:19px">Bigger projects, games with rules and real-life skills.</p></div>
    ${place(CD('b58', 5), 70, 250, -4, 1.08)}${place(CD('b58', 25), 355, 240, 0, 1.08)}${place(CD('b58', 13), 640, 250, 4, 1.08)}
    ${place(CD('b812', 15), 110, 570, -3, 0.95)}${place(CD('b812', 22), 370, 560, 1, 0.95)}${place(CD('b812', 26), 620, 570, 4, 0.95)}`, C.tPlum));
  // 6 seasonal sets
  P.push(L(`<div class="lh"><div class="lk">Bonus sets</div><h2>Summer & rainy-day<br>mini-sets</h2><p class="ls">36 extra cards for sunny afternoons and stuck-inside days.</p></div>
    ${place(BK('summer'), 64, 330, -7, 1.0)}${place(CD('summer', 1), 250, 350, 3, 1.08)}
    ${place(BK('rainy'), 530, 330, -5, 1.0)}${place(CD('rainy', 10), 705, 350, 5, 1.08)}
    <div style="position:absolute;left:64px;top:770px;display:flex;gap:12px"><span class="chip" style="background:${C.tomato};color:#fff">${icon('sun', 'i')} 18 summer cards</span><span class="chip" style="background:${C.ink};color:#fff">${icon('rain', 'i')} 18 rainy-day cards</span></div>
    <p style="position:absolute;left:64px;top:840px;width:640px;font-size:19px;font-weight:600;line-height:1.4">Sprinklers, ice rescues and cloud stories. Puddle jumping, reading nests and living-room camp-outs.</p>`, C.tTomato));
  // 7 labels, dividers, colorways
  P.push(L(`<div class="lh"><div class="lk">Jar labels · dividers · card backs</div><h2>Four colorways.<br>One calm system.</h2></div>
    <div class="paper" style="${at(64, 300, -3)};width:300px;height:388px"><img src="${PV(40)}"></div>
    <div class="paper" style="${at(350, 290, 2)};width:300px;height:388px"><img src="${PV(41)}"></div>
    <div class="paper" style="${at(640, 300, 5)};width:300px;height:388px"><img src="${PV(37)}"></div>
    ${['b13', 'b35', 'b58', 'b812', 'summer', 'rainy'].map((k, i) => place(BK(k), 70 + i * 128, 715, (i - 2.5) * 3, 0.56)).join('')}`, '#FFFFFF'));
  // 8 sizes & formats
  const F = [['US Letter + A4', 'Every page in both sizes, at 100% scale'], ['Fillable editable PDF', 'Type your own cards in any free PDF reader with fill-in forms'], ['PNG template set', '30 templates at 300 dpi: blank cards, backs, labels, dividers'], ['Double-sided cards file', 'Fronts and backs, ready for duplex printing'], ['Instant download', 'Digital file only. Nothing is shipped.']];
  P.push(L(`<div class="lh"><div class="lk">Sizes & formats</div><h2>Print it your way.</h2></div>
    <div style="position:absolute;left:64px;top:250px;width:470px">${F.map(([h, t], i) => `<div style="background:#fff;border-radius:20px;padding:18px 22px;margin-bottom:14px;border-left:10px solid ${[C.sun, C.grass, C.sky, C.plum, C.tomato][i]}"><div style="font-family:Bricolage Grotesque;font-weight:800;font-size:27px">${h}</div><div style="font-size:18px;font-weight:600">${t}</div></div>`).join('')}</div>
    <div class="paper" style="${at(620, 240, 4)};width:290px;height:375px"><img src="${PV(27)}"></div>
    <div class="paper" style="${at(590, 505, -3)};width:290px;height:375px"><img src="${PV(44)}"></div>`));
  // 9 how to use
  const S = [['Print', 'On cardstock, at actual size'], ['Cut & laminate', 'Round the corners, add velcro if you like'], ['Fill the jar', 'Or a recipe box with the dividers'], ['Pull, play, talk', 'Use the talk prompt, then follow their lead']];
  P.push(L(`<div class="lh"><div class="lk">How to use</div><h2>From “I’m bored!”<br>to “Again!”</h2></div>
    <div style="position:absolute;left:64px;top:300px;width:420px">${S.map(([h, t], i) => `<div style="display:flex;gap:16px;margin-bottom:26px"><span style="flex:0 0 52px;height:52px;border-radius:50%;background:${[C.sun, C.grass, C.sky, C.plum][i]};color:${i ? '#fff' : C.ink};font-family:Bricolage Grotesque;font-weight:800;font-size:26px;display:flex;align-items:center;justify-content:center">${i + 1}</span><div><div style="font-family:Bricolage Grotesque;font-weight:800;font-size:28px">${h}</div><div style="font-size:19px;font-weight:600">${t}</div></div></div>`).join('')}</div>
    <div class="paper" style="${at(540, 280, 3)};width:400px;height:518px"><img src="${PV(42)}"></div>
    ${place(CD('b35', 0), 600, 350, -2, 0.62)}${place(CD('b13', 16), 772, 352, 2, 0.62)}`, C.tSky));
  // 10 safety + talk
  P.push(L(`<div class="lh"><div class="lk">Made with care</div><h2>Safety line and talk<br>prompt on every card.</h2></div>
    <div style="position:absolute;left:64px;top:300px;width:560px;display:grid;grid-template-columns:1fr 1fr;gap:16px">
      ${[['Grown-up nearby', 'Every card assumes adult supervision.'], ['Under-3s', 'Nothing small enough to fit through a toilet-paper tube.'], ['No balloons', 'None of the cards use them.'], ['Water and food', 'Arm’s-reach water rules. No choking-hazard foods.']].map(([h, t]) => `<div style="background:#fff;border-radius:20px;padding:18px 20px"><div style="font-family:Bricolage Grotesque;font-weight:800;font-size:24px">${h}</div><div style="font-size:17px;font-weight:600;line-height:1.35">${t}</div></div>`).join('')}
    </div>
    <div style="position:absolute;left:64px;top:640px;width:560px;height:200px;background:${C.tSun};border-radius:24px;padding:14px 20px"><svg viewBox="0 0 330 120" width="100%" height="100%">${tubeArt().replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg></div>
    ${place(CD('b13', 5), 680, 330, 4, 1.1)}`, C.tGrass));
  return P;
}
BASE = '../../../';
fs.writeFileSync(path.join(__dirname, 'mockup.html'), doc('../../../brand/fonts/fonts.css', SZ, [mockupPage()], mkCss + '<style>body{width:1600px}</style>'));
fs.writeFileSync(path.join(__dirname, 'listing.html'), doc('../../../brand/fonts/fonts.css', SZ, listingPages(), mkCss));
