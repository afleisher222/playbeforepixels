// Play Before Pixels page kit: tokens, base CSS, low-ink mode, footer, logo, QR, icons and form-field
// markers. Shared by five builds, all under products/ or marketing/ and all added September 28, 2026:
//   products/bundle-gift-1-5, products/bundle-library-0-5, products/winter-countdown,
//   products/gift-reveal-coupons, products/lead-magnet.
// Pages are laid out in CSS px at 96 dpi (US Letter 816 x 1056, A4 794 x 1123) and printed by Chromium
// with the CSS @page size, the same engine and settings as brand/render.js.
'use strict';
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');
const { I: ICONS } = require('./icons.js');
const CHARS = require('./chars.js');

const ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const C = {
  ink: '#1D2940', paper: '#FFFFFF', wash: '#F3F6FB', tomato: '#EE5A36', sun: '#F5B820', sky: '#3D86D8',
  grass: '#2FA36B', plum: '#8A5CC7', tTomato: '#FDE9E3', tSun: '#FEF4D8', tSky: '#E3EEFA', tGrass: '#DFF3E9', tPlum: '#EFE6FA',
  brown: '#A0522D', skin: '#E0AC80', line: '#C9D0DC',
};
// Darkened accents for small colored text: each is 4.5:1 or better on white and on every tint
// (ops/COMPLIANCE-GATE.md line 20; checked September 28, 2026: lowest is 4.75 on the plum tint).
const D = { tomato: '#B83A1C', sky: '#1E5FAA', grass: '#1B7447', plum: '#6B3FA6', sun: '#8A5A00' };
const SIZES = {
  letter: { W: 816, H: 1056, css: '8.5in 11in', name: 'US Letter' },
  a4: { W: 794, H: 1123, css: '210mm 297mm', name: 'A4' },
};
const OWNER = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.';
const SITE = 'playbeforepixels.com';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rel = (fromDir, repoPath) => path.relative(fromDir, path.join(ROOT, repoPath)).split(path.sep).join('/');

// ---------------------------------------------------------------- logo (supplied files only)
// kind: 'lockup' (horizontal, default), 'stacked', 'mark', 'mark-small', 'wordmark'
function logo(ctx, kind = 'lockup', variant = null, cls = 'lockup', h = null) {
  const base = { lockup: 'lockup-horizontal', stacked: 'lockup-stacked', mark: 'mark', 'mark-small': 'mark-small', wordmark: 'wordmark' }[kind];
  const v = variant || (ctx.ink === 'lowink' ? 'black' : null);
  const file = `brand/logo/${base}${v ? '-' + v : ''}.svg`;
  if (!fs.existsSync(path.join(ROOT, file))) throw new Error('missing logo file ' + file);
  return `<img class="${cls}" src="${rel(ctx.outDir, file)}" alt="Play Before Pixels"${h ? ` style="height:${h}px;width:auto"` : ''}>`;
}

// ---------------------------------------------------------------- QR (store and email editions only)
const qrCache = {};
function qr(url, px = 110) {
  if (!qrCache[url]) qrCache[url] = execFileSync('python3', [path.join(__dirname, 'qr.py'), url], { encoding: 'utf8' }).trim();
  const [n, d] = qrCache[url].split('|');
  return `<svg class="qr" viewBox="0 0 ${n} ${n}" width="${px}" height="${px}" shape-rendering="crispEdges" role="img" aria-label="QR code for grown-ups"><rect width="${n}" height="${n}" fill="#FFFFFF"/><path d="${d}" fill="${C.ink}"/></svg>`;
}
const bonusUrl = slug => `https://${SITE}/bonus/${slug}?src=bonus-${slug}`;

// ---------------------------------------------------------------- icons
// Color: parts drawn as they are. Low-ink: each part as an ink silhouette, then a white fill.
function icon(name, ctx, px = 64, extra = '') {
  const parts = ICONS[name];
  if (!parts) throw new Error('unknown icon ' + name);
  const body = ctx && ctx.ink === 'lowink'
    ? parts.map(p => `<g class="lo">${p}</g><g class="lf">${p}</g>`).join('')
    : parts.join('');
  return `<svg class="ic ${extra}" viewBox="-4 -4 108 108" width="${px}" height="${px}" aria-hidden="true">${body}</svg>`;
}

// Small one-color meta icons (16 x 16, ink): materials, prep, mess, time, talk, safety and flags.
const MI = {
  from: '<circle cx="8" cy="4.2" r="2.6"/><path d="M3.2 14.5V11Q3.2 7.6 8 7.6Q12.8 7.6 12.8 11V14.5Z"/>',
  prep: '<path fill="none" stroke="currentColor" stroke-width="1.7" d="M8 1.8A6.2 6.2 0 1 1 7.99 1.8ZM8 4.6V8.3L10.6 9.9" stroke-linecap="round"/>',
  mess: '<path d="M8 1.5Q13 7.6 13 10.4A5 5 0 0 1 3 10.4Q3 7.6 8 1.5Z"/>',
  time: '<rect x="6" y="0.8" width="4" height="1.8" rx=".6"/><path fill="none" stroke="currentColor" stroke-width="1.7" d="M8 4A5.6 5.6 0 1 1 7.99 4ZM8 6.6V9.8" stroke-linecap="round"/>',
  needs: '<path d="M3 6H13L12.2 14.2Q12.1 15 11.3 15H4.7Q3.9 15 3.8 14.2Z"/><path fill="none" stroke="currentColor" stroke-width="1.5" d="M5.6 6.4V4.6A2.4 2.4 0 0 1 10.4 4.6V6.4"/>',
  talk: '<path d="M3 2.2H13Q15 2.2 15 4.2V9.4Q15 11.4 13 11.4H7.4L4 14.2V11.4H3Q1 11.4 1 9.4V4.2Q1 2.2 3 2.2Z"/>',
  safe: '<path d="M8 1L14 3.4V7.6Q14 12.6 8 15Q2 12.6 2 7.6V3.4Z"/><path fill="none" stroke="#FFFFFF" stroke-width="1.7" d="M5.2 8.1L7.2 10L10.9 5.9" stroke-linecap="round" stroke-linejoin="round"/>',
  easy: '<circle cx="8" cy="8" r="7"/><path fill="none" stroke="#FFFFFF" stroke-width="1.8" d="M4.8 6.8L8 10L11.2 6.8" stroke-linecap="round" stroke-linejoin="round"/>',
  hard: '<circle cx="8" cy="8" r="7"/><path fill="none" stroke="#FFFFFF" stroke-width="1.8" d="M4.8 9.4L8 6.2L11.2 9.4" stroke-linecap="round" stroke-linejoin="round"/>',
  two: '<circle cx="8" cy="8" r="7"/><text x="8" y="11.6" text-anchor="middle" font-family="Fredoka, Nunito Sans, sans-serif" font-weight="700" font-size="10" fill="#FFFFFF">2</text>',
  grownup: '<circle cx="5.2" cy="3.4" r="2.2"/><path d="M1.6 14.6V9.4Q1.6 6.4 5.2 6.4Q8.8 6.4 8.8 9.4V14.6Z"/><circle cx="11.6" cy="7.4" r="1.8"/><path d="M9.4 14.6V11.6Q9.4 9.8 11.6 9.8Q13.8 9.8 13.8 11.6V14.6Z"/>',
  nobuy: '<path d="M2 8.4V2.8Q2 2 2.8 2H8.4L14.4 8L8 14.4Z"/><path fill="none" stroke="#FFFFFF" stroke-width="1.6" d="M5.6 8.4L7.4 10.2L10.6 6.8" stroke-linecap="round" stroke-linejoin="round"/>',
  night: '<path d="M9.4 1.6A6.6 6.6 0 1 0 14.4 10.4A5.2 5.2 0 1 1 9.4 1.6Z"/>',
  scissors: '<circle cx="4" cy="11.6" r="2.6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="11.6" r="2.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path fill="none" stroke="currentColor" stroke-width="1.5" d="M5.6 9.6L12 1.6M10.4 9.6L4 1.6" stroke-linecap="round"/>',
  check: '<circle cx="8" cy="8" r="7"/><path fill="none" stroke="#FFFFFF" stroke-width="1.9" d="M4.8 8.2L7 10.4L11.4 5.8" stroke-linecap="round" stroke-linejoin="round"/>',
  print: '<rect x="4" y="1.6" width="8" height="4" rx=".8"/><rect x="1.4" y="5.6" width="13.2" height="6" rx="1.4"/><rect x="4" y="9.4" width="8" height="5.2" rx=".6" fill="#FFFFFF" stroke="currentColor" stroke-width="1.3"/>',
  phone: '<rect x="4" y="1" width="8" height="14" rx="1.8"/><rect x="5.4" y="2.8" width="5.2" height="9" rx=".6" fill="#FFFFFF"/>',
  heart: '<path d="M8 14.2C7 13.3 1.6 10 1.6 5.9C1.6 3.7 3.2 2 5.1 2C6.4 2 7.4 2.7 8 3.9C8.6 2.7 9.6 2 10.9 2C12.8 2 14.4 3.7 14.4 5.9C14.4 10 9 13.3 8 14.2Z"/>',
  gift: '<rect x="2" y="7" width="12" height="7.4" rx=".8"/><rect x="1.2" y="4.4" width="13.6" height="3.2" rx=".8"/><rect x="7" y="4.4" width="2" height="10" fill="#FFFFFF"/><path d="M8 4.4Q4.6 0.4 3.4 2.2Q2.8 4 8 4.4Q13.2 4 12.6 2.2Q11.4 0.4 8 4.4Z"/>',
};
const mi = (name, px = 13, color = C.ink) => `<svg class="mi" viewBox="0 0 16 16" width="${px}" height="${px}" fill="${color}" style="color:${color}" aria-hidden="true">${MI[name]}</svg>`;

// Age label: color + shape + word, never color alone (COMPLIANCE-GATE 20; CUSTOMER-VOICE 17).
// Matches the age system of the 52 Play & Talk Cards and 100 Screen-Free Plays.
const AGES = {
  '0-1': { word: '0–1 yr', long: 'Birth to 1', c: C.sky, t: C.tSky, d: D.sky, shape: 'tri' },
  '1-2': { word: '1–2 yrs', long: '1 to 2 years', c: C.grass, t: C.tGrass, d: D.grass, shape: 'sq' },
  '2-3': { word: '2–3 yrs', long: '2 to 3 years', c: C.sun, t: C.tSun, d: D.sun, shape: 'star' },
  '3-5': { word: '3–5 yrs', long: '3 to 5 years', c: C.tomato, t: C.tTomato, d: D.tomato, shape: 'dot' },
  '2+': { word: 'from 2 yrs', long: 'Best from 2 years', c: C.sun, t: C.tSun, d: D.sun, shape: 'star' },
  '3+': { word: 'from 3 yrs', long: 'Best from 3 years', c: C.tomato, t: C.tTomato, d: D.tomato, shape: 'dot' },
};
function shape(kind, color, px = 12) {
  const s = {
    tri: `<path d="M8 1.5L15 14.5H1Z" fill="${color}"/>`,
    sq: `<rect x="2" y="2" width="12" height="12" rx="2" fill="${color}"/>`,
    star: `<path d="M8 .8L10.1 5.6L15.2 6L11.3 9.4L12.5 14.4L8 11.7L3.5 14.4L4.7 9.4L.8 6L5.9 5.6Z" fill="${color}"/>`,
    dot: `<circle cx="8" cy="8" r="6.6" fill="${color}"/>`,
  }[kind];
  return `<svg class="shape" viewBox="0 0 16 16" width="${px}" height="${px}" aria-hidden="true">${s}</svg>`;
}
const ageChip = (key, cls = '') => {
  const a = AGES[key];
  return `<span class="chip ${cls}" style="--c:${a.c};--t:${a.t};--d:${a.d}">${shape(a.shape, a.c)}<b>${a.word}</b></span>`;
};

// Form fields: finish.py turns every [data-field] box into a real AcroForm field (free PDF readers).
const field = (name, o = {}) => `data-field="${name}"${o.multi ? ' data-multi="1"' : ''}${o.size ? ` data-fsize="${o.size}"` : ''}${o.align !== undefined ? ` data-falign="${o.align}"` : ''}${o.check ? ' data-ftype="check"' : ''}`;

// ---------------------------------------------------------------- CSS
function css(ctx) {
  const S = SIZES[ctx.size];
  return `
@page{size:${S.css};margin:0}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#FFFFFF}
body{font-family:"Nunito Sans","Fredoka",sans-serif;color:${C.ink};-webkit-print-color-adjust:exact;print-color-adjust:exact;font-size:12px;line-height:1.4}
.page{width:${S.W}px;height:${S.H}px;position:relative;overflow:hidden;background:#FFFFFF;break-after:page;page-break-after:always}
.page:last-child{break-after:auto;page-break-after:auto}
.pad{position:absolute;left:48px;right:48px;top:48px;bottom:74px;display:flex;flex-direction:column}
h1,h2,h3,h4{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;margin:0;letter-spacing:-.015em;line-height:1.05}
p{margin:0}
b,strong{font-weight:800}
.kicker{font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}
.hand{font-family:"Caveat","Nunito Sans",sans-serif;font-weight:700}
.kid{font-family:"Fredoka","Nunito Sans",sans-serif;font-weight:600}
.lockup{height:26px;width:auto;display:block}
.foot{position:absolute;left:48px;right:48px;bottom:26px;height:26px;display:flex;align-items:center;gap:14px;border-top:1px solid ${C.line};padding-top:5px}
.foot .lockup{height:17px;flex:none}
.foot .ft-txt{flex:1;display:flex;flex-direction:column;align-items:flex-end;font-size:7.6px;line-height:1.3;font-weight:700;color:#3C4760;white-space:nowrap}
.foot .ft-txt span:first-child{font-weight:800;color:${C.ink}}
.chip{display:inline-flex;align-items:center;gap:5px;background:var(--t);border-radius:999px;padding:3px 10px 3px 7px;font-size:11px;line-height:1.2;white-space:nowrap}
.chip b{font-weight:800;color:${C.ink}}
.flag{display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:800;letter-spacing:.02em;border-radius:6px;padding:2px 7px;background:${C.wash};white-space:nowrap}
.flag.go{background:${C.tGrass}}
.mi{flex:none;vertical-align:-2px}
.ic{display:block;flex:none}
.qrwrap{background:#FFFFFF;border-radius:12px;padding:8px;display:inline-block}
.qrwrap .qr{display:block}
.cutnote{display:flex;align-items:center;gap:6px;font-size:9.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#3C4760}
.cut{border:1.6px dashed #8C96AA}
.field{background:#FFFFFF;border-bottom:1.4px solid #8C96AA;min-height:22px}
/* shared icon fills */
.fk{fill:${C.sky}}.ft{fill:${C.tomato}}.fs{fill:${C.sun}}.fg{fill:${C.grass}}.fp{fill:${C.plum}}.fn{fill:${C.brown}}
.fw{fill:#FFFFFF}.fd{fill:${C.ink}}.fi{fill:${C.ink}}.fsk{fill:${C.skin}}.fx{fill:${C.tSky}}
.tk{fill:${C.tSky}}.tt{fill:${C.tTomato}}.ts{fill:${C.tSun}}.tg{fill:${C.tGrass}}.tp{fill:${C.tPlum}}
/* the cast (chars.js) */
symbol{overflow:visible}.sk{fill:var(--sk)}.hr{fill:var(--hr)}.sh{fill:var(--sh)}.pa{fill:var(--pa)}.so{fill:var(--so)}.hw{fill:var(--hw)}.ck{fill:${C.tomato};opacity:.28}
/* editions: store files carry the web address and QR code; Etsy files carry neither (COMPLIANCE-GATE 16) */
body.etsy .store-only{display:none!important}
body.store .etsy-only{display:none!important}
/* low-ink: white grounds, line art to color (CUSTOMER-VOICE rule 1) */
body.lowink .page{background:#FFFFFF!important}
body.lowink .lo *{fill:${C.ink}!important;stroke:${C.ink}!important;stroke-width:3.4px;vector-effect:non-scaling-stroke;stroke-linejoin:round;stroke-linecap:round}
body.lowink .lo .sl{fill:none!important}
body.lowink .lf *{fill:#FFFFFF!important;stroke:none}
body.lowink .lf .fi{fill:${C.ink}!important}
body.lowink .lf .sl{fill:none!important;stroke:${C.ink}!important}
body.lowink .sk,body.lowink .hr,body.lowink .sh,body.lowink .pa,body.lowink .so,body.lowink .hw{fill:#FFFFFF!important;stroke:${C.ink};stroke-width:1.7px;vector-effect:non-scaling-stroke}
body.lowink .ck{display:none}
body.lowink .chip{background:#FFFFFF;box-shadow:inset 0 0 0 1.4px var(--c)}
body.lowink .flag{background:#FFFFFF;box-shadow:inset 0 0 0 1.2px ${C.line}}
body.lowink .li-white{background:#FFFFFF!important;box-shadow:inset 0 0 0 1.5px ${C.line}!important}
body.lowink .li-edge{background:#FFFFFF!important;box-shadow:inset 0 0 0 2px var(--c,${C.ink})!important}
body.lowink .li-text{color:${C.ink}!important}
`;
}

// ---------------------------------------------------------------- footer and document
function footer(ctx, n, total, label) {
  const right2 = ctx.edition === 'etsy'
    ? `${OWNER} · Find more in our shop`
    : `${OWNER} · ${SITE}`;
  return `<div class="foot">${logo(ctx, 'lockup')}<div class="ft-txt"><span>${esc(label)} · page ${n} of ${total} · ${ctx.version}</span><span>${right2}</span></div></div>`;
}

// pages: array of { html, label, noFoot, cls }
function doc(ctx, { title, pages, extraCss = '', defs = '' }) {
  const total = pages.length;
  const body = pages.map((p, i) => `<section class="page ${p.cls || ''}" data-label="${esc(p.label || '')}">${p.html}${p.noFoot ? '' : footer(ctx, i + 1, total, ctx.product)}</section>`).join('\n');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title>
<link rel="stylesheet" href="${rel(ctx.outDir, 'brand/fonts/fonts.css')}">
<style>${css(ctx)}${extraCss}</style></head>
<body class="${ctx.ink} ${ctx.edition} ${ctx.size}">
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${CHARS.SYMBOLS.join('')}${defs}</defs></svg>
${body}
</body></html>`;
}

function context(o) {
  const S = SIZES[o.size];
  return Object.assign({ W: S.W, H: S.H, sizeName: S.name, version: 'Version 1.0 · September 2026' }, o);
}

module.exports = { ROOT, C, D, SIZES, OWNER, SITE, esc, rel, logo, qr, bonusUrl, icon, ICONS, mi, MI, AGES, shape, ageChip, field, css, footer, doc, context, CHARS };
