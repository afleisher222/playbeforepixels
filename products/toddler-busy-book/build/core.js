// Page system for the Toddler Busy Book: sizes, CSS, page chrome, piece grid, QR.
// Every physical measurement is in CSS px at 96 px per inch, so pieces print at the same real size on Letter and A4.
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const { C, ARTDEFS, UIDEFS, ui } = require('./lib.js');

const IN = 96;
const LIVE = { w: 696, h: 960 };             // 7.25 x 10 in live area, centred on Letter (0.625/0.5 in margins) and A4 (0.51/0.84 in)
const CELL = { w: 216, h: 192 };             // standard piece: 2.25 x 2.0 in (smallest side 2.0 in >= 1.75 in rule)
const BIG = { w: 288, h: 240 };              // big piece for 1-2 years: 3.0 x 2.5 in
const PANEL = { w: 696, h: 576, pad: 12 };   // play panel
const INNER = { w: 672, h: 516 };            // board drawing box, centred in the panel
const MIN_PIECE_IN = 1.75;

const SLUG = 'toddler-busy-book';
const BONUS = `playbeforepixels.com/bonus/${SLUG}`;
const VERSION = 'Version 1.0 · September 2026';
const COPYRIGHT = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.';
const PRODUCT = 'Toddler Busy Book';

const BANDS = {
  b1: { key: 'b1', label: '1–2 years', short: '1–2', from: 12, c: C.grass, t: C.tGrass, on: '#FFFFFF', name: 'Little hands', blurb: 'Point, name, pat and place. Big pictures, big pieces, lots of repeating.' },
  b2: { key: 'b2', label: '2–3 years', short: '2–3', from: 24, c: C.sun, t: C.tSun, on: C.ink, name: 'Busy explorers', blurb: 'Match, sort and pretend. Colors, shapes, pairs and first little stories.' },
  b3: { key: 'b3', label: '3–5 years', short: '3–5', from: 36, c: C.tomato, t: C.tTomato, on: '#FFFFFF', name: 'Big thinkers', blurb: 'Mazes, counting, patterns, sequencing and bigger pretend play.' },
};

// ---------- QR (vector) ----------
function qrPath(text) {
  const q = QRCode.create(text, { errorCorrectionLevel: 'M' });
  const n = q.modules.size, d = q.modules.data; let p = '';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (d[y * n + x]) p += `M${x} ${y}h1v1h-1z`;
  return { n, p };
}
const QR = qrPath('https://' + BONUS);
const qrSvg = (px) => `<svg class="qr" viewBox="-4 -4 ${QR.n + 8} ${QR.n + 8}" width="${px}" height="${px}" shape-rendering="crispEdges" aria-label="QR code to ${BONUS}"><rect x="-4" y="-4" width="${QR.n + 8}" height="${QR.n + 8}" fill="#FFFFFF"/><path d="${QR.p}" fill="${C.ink}"/></svg>`;

// ---------- CSS ----------
function css(size) {
  const [pw, ph] = size === 'a4' ? ['210mm', '297mm'] : ['8.5in', '11in'];
  return `
@page{size:${pw} ${ph};margin:0}
:root{--ink:${C.ink};--wash:${C.wash};--tomato:${C.tomato};--sun:${C.sun};--sky:${C.sky};--grass:${C.grass};--plum:${C.plum};
--t-tomato:${C.tTomato};--t-sun:${C.tSun};--t-sky:${C.tSky};--t-grass:${C.tGrass};--t-plum:${C.tPlum};--line:#D5DCE8;--soft:#5B6780}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#FFFFFF;color:var(--ink);font-family:"Nunito Sans","Helvetica Neue",Arial,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:${pw};height:${ph};page-break-after:always;break-after:page;overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;background:#FFFFFF}
.live{width:${LIVE.w}px;height:${LIVE.h}px;position:relative}
h1,h2,h3,.disp{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;letter-spacing:-.01em;line-height:1.05}
.kid{font-family:"Fredoka","Nunito Sans",sans-serif;font-weight:600}
.hand{font-family:"Caveat","Nunito Sans",cursive;font-weight:700}
svg{display:block}
.sk{fill:var(--sk)}.hr{fill:var(--hr)}.sh{fill:var(--sh)}.pa{fill:var(--pa)}.so{fill:var(--so)}.hw{fill:var(--hw)}.ck{fill:${C.tomato};opacity:.28}
body.lowink .ck{display:none}
body.lowink .sildefs :is(path,rect,circle,ellipse){fill:#E6EAF1!important;stroke:#8A96AD!important;stroke-width:1.2px;vector-effect:non-scaling-stroke}
.ui{width:14px;height:14px;display:inline-block;vertical-align:-2px;flex:none}
b,strong{font-weight:800}
.band-b1{--bc:var(--grass);--bt:var(--t-grass);--bon:#FFFFFF}
.band-b2{--bc:var(--sun);--bt:var(--t-sun);--bon:var(--ink)}
.band-b3{--bc:var(--tomato);--bt:var(--t-tomato);--bon:#FFFFFF}
.band-n{--bc:var(--sky);--bt:var(--t-sky);--bon:#FFFFFF}
/* header */
.hd{position:absolute;left:0;right:0;top:0;height:28px;display:flex;align-items:center;gap:10px;font-size:11px;font-weight:700;color:var(--soft)}
.pill{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 11px;border-radius:12px;background:var(--bc);color:var(--bon);font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:12.5px;letter-spacing:.02em;white-space:nowrap}
.hd .from{color:var(--ink);font-weight:800}
.hd .cat{text-transform:uppercase;letter-spacing:.12em;font-size:10px;font-weight:800;color:var(--soft)}
.hd .sp{flex:1}
.tag{display:inline-flex;align-items:center;gap:5px;height:22px;padding:0 9px;border-radius:11px;background:var(--wash);color:var(--ink);font-size:10.5px;font-weight:800;white-space:nowrap}
.tag .ui{width:13px;height:13px;color:var(--bc)}
/* title block */
.tt{position:absolute;left:0;right:0;top:40px}
.tt h1{font-size:33px}
.tt .how{margin-top:7px;font-size:13px;line-height:1.35;color:var(--ink);max-width:680px}
.tt .how b{color:var(--ink)}
/* play panel */
.play{position:absolute;left:0;top:118px;width:${PANEL.w}px;height:${PANEL.h}px;border-radius:22px;background:var(--bt);overflow:hidden}
.play>svg{position:absolute;left:${(PANEL.w - INNER.w) / 2}px;top:${(PANEL.h - INNER.h) / 2}px}
/* grown-up band */
.gu{position:absolute;left:0;right:0;top:${118 + PANEL.h + 12}px;bottom:30px;display:flex;flex-direction:column;gap:8px}
.talk{display:flex;gap:11px;align-items:flex-start;background:var(--wash);border-radius:14px;padding:10px 14px}
.talk .ui{width:22px;height:22px;color:var(--bc);margin-top:2px}
.lab{font-size:9.5px;font-weight:800;letter-spacing:.13em;text-transform:uppercase;color:var(--soft)}
.lab i{font-style:normal;letter-spacing:.02em;text-transform:none;font-weight:700}
.talk q{display:block;quotes:none;font-family:"Bricolage Grotesque",sans-serif;font-weight:700;font-size:16.5px;line-height:1.22;margin-top:2px}
.row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
.box{border:1.5px solid var(--line);border-radius:12px;padding:7px 10px;font-size:11.2px;line-height:1.33}
.box .lab{display:block;margin-bottom:2px;color:var(--ink)}
.box.tired{background:var(--bt);border-color:transparent}
.meta{display:flex;gap:14px;align-items:center;font-size:11px;font-weight:700;flex-wrap:wrap}
.meta span{display:inline-flex;gap:5px;align-items:center}
.meta .ui{color:var(--soft)}
.safe{display:flex;gap:7px;align-items:flex-start;font-size:11px;line-height:1.32;color:var(--ink)}
.safe .ui{color:var(--grass);width:15px;height:15px;margin-top:0}
.safe b{font-weight:800}
/* footer */
.ft{position:absolute;left:0;right:0;bottom:0;height:20px;display:flex;align-items:center;gap:8px;font-size:9px;color:var(--soft);border-top:1px solid var(--line);padding-top:4px}
.ft img{height:13px;width:auto}
.ft .sp{flex:1}
.ft .pn{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:11px;color:var(--ink)}
/* piece sheets */
.cutnote{position:absolute;left:0;right:0;top:72px;display:flex;gap:8px;align-items:center;font-size:12px;font-weight:700}
.cutnote .ui{width:18px;height:18px;color:var(--ink)}
.grid{position:absolute;left:50%;transform:translateX(-50%)}
.keep{position:absolute;left:0;right:0;bottom:28px;display:flex;gap:12px;align-items:center;background:var(--wash);border-radius:14px;padding:7px 14px}
.keep .big{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:16px;white-space:nowrap;line-height:1.1}
.keep p{font-size:11px;line-height:1.35}
.keep .ui{width:24px;height:24px;color:var(--grass)}
/* generic text pages */
.eyebrow{font-size:10.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--bc)}
.tp h1{font-size:40px;margin-top:6px}
.lede{font-size:15px;line-height:1.45;margin-top:10px;max-width:640px}
.card{border-radius:18px;padding:16px 18px;background:var(--wash)}
.card h3{font-size:19px;margin-bottom:5px}
.card p,.card li{font-size:12.5px;line-height:1.42}
.card ul,.card ol{padding-left:18px}
.card li{margin:2px 0}
.cols2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.cols3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.t-tomato{background:var(--t-tomato)}.t-sun{background:var(--t-sun)}.t-sky{background:var(--t-sky)}.t-grass{background:var(--t-grass)}.t-plum{background:var(--t-plum)}
.num{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:13px;background:var(--ink);color:#fff;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:14px;flex:none}
.small{font-size:10.5px;color:var(--soft);line-height:1.4}
.slot-fill{border:1.5px dashed #9AA6BC;border-radius:8px;background:#FFFFFF}
.human{border:2px dashed ${C.plum};border-radius:10px;padding:6px 10px;color:${C.plum};font-size:11px;font-weight:700;background:#FFFFFF}
/* ---------- LOW-INK edition: white grounds, colorable outline art ---------- */
body.lowink .play,body.lowink .box.tired,body.lowink .talk,body.lowink .keep,body.lowink .card{background:#FFFFFF!important;border:1.5px solid #B9C2D3}
body.lowink .pill{background:#FFFFFF;color:var(--ink);box-shadow:inset 0 0 0 2px var(--bc)}
body.lowink .bgfill{background:#FFFFFF!important}
body.lowink .artdefs :is(path,rect,circle,ellipse,polygon):not([fill="none"]),
body.lowink svg.board :is(path,rect,circle,ellipse,polygon):not([fill="none"]):not(.ink):not(.keepc):not(.keepc *):not(.cutline){fill:#FFFFFF!important;stroke:${C.ink};stroke-width:1.4px;vector-effect:non-scaling-stroke}
body.lowink .artdefs [fill="${C.ink}"],body.lowink svg.board [fill="${C.ink}"]{fill:${C.ink}!important}
body.lowink .artdefs [fill="#FFFFFF"][opacity],body.lowink .artdefs [opacity]{stroke:none!important;fill:#FFFFFF!important}
body.lowink svg.board .tint{fill:#FFFFFF!important;stroke:#B9C2D3!important}
body.lowink svg.board .keepc,body.lowink svg.board .keepc *{stroke:none}
body.lowink svg.board .sil,body.lowink svg.board .sil *{fill:#E6EAF1!important;stroke:#8A96AD!important;stroke-width:1.2px}
body.lowink .cover-bg{background:#FFFFFF!important}
/* ---------- ETSY edition: no URL, no QR (marketplace rule) ---------- */
body.etsy .url,body.etsy .site-only{display:none!important}
body:not(.etsy) .etsy-only{display:none!important}
`;
}

// ---------- chrome ----------
const REL = { root: '../../', build: '../../../' };
const mark = (rel) => `<img src="${rel}brand/logo/mark-small.svg" alt="">`;
function footer(ctx, pn) {
  return `<div class="ft">${mark(ctx.rel)}<span><b style="color:var(--ink)">Play Before Pixels</b> · ${PRODUCT}<span class="url"> · playbeforepixels.com</span></span><span class="sp"></span><span>${VERSION} · © 2026 AlphaPlay LLC</span><span class="pn">${pn}</span></div>`;
}
function header(band, cat, right) {
  const B = BANDS[band];
  return `<div class="hd"><span class="pill">${B.label}</span><span class="cat">${cat}</span><span class="sp"></span>${right || ''}</div>`;
}
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

// ---------- piece card + sheet ----------
// A piece is { art: svg-string drawn in a 100-unit box centred at 0,0 (or custom), word, tint, bg }.
function pieceCard(p, w, h, ref) {
  const inset = 7, rx = 14;
  const labelH = p.word ? 26 : 0;
  const s = p.s || Math.min((w - 40) / 100, (h - 30 - labelH) / 100);
  const cy = (h - labelH) / 2 + 2;
  const art = p.raw ? p.raw(w, h) : `<g transform="translate(${w / 2},${cy}) scale(${s.toFixed(3)})">${p.art}</g>`;
  return `<rect class="tint" x="${inset}" y="${inset}" width="${w - inset * 2}" height="${h - inset * 2}" rx="${rx}" fill="${p.tint || '#F3F6FB'}"/>` + art +
    (p.word ? `<text x="${w / 2}" y="${h - 17}" text-anchor="middle" font-family="Fredoka, Nunito Sans, sans-serif" font-weight="600" font-size="17" fill="${C.ink}">${esc(p.word)}</text>` : '') +
    (ref ? `<text x="${w - 16}" y="22" text-anchor="end" font-family="Nunito Sans, sans-serif" font-weight="800" font-size="9" fill="#8A96AD">${ref}</text>` : '');
}
// straight-line cutting grid: dashed lines run edge to edge so every cut is one straight line
function pieceGrid(pieces, cell, cols, ref) {
  const rows = Math.ceil(pieces.length / cols);
  const W = cell.w * cols, H = cell.h * rows;
  let out = pieces.map((p, i) => `<g transform="translate(${(i % cols) * cell.w},${Math.floor(i / cols) * cell.h})">${pieceCard(p, cell.w, cell.h, ref)}</g>`).join('');
  let lines = '';
  for (let c = 0; c <= cols; c++) lines += `<line class="cutline" x1="${c * cell.w}" y1="-10" x2="${c * cell.w}" y2="${H + 10}"/>`;
  for (let r = 0; r <= rows; r++) lines += `<line class="cutline" x1="-10" y1="${r * cell.h}" x2="${W + 10}" y2="${r * cell.h}"/>`;
  // empty cells in the last row get a soft "spare" fill so nobody hunts for a missing piece
  for (let i = pieces.length; i < rows * cols; i++) out += `<g transform="translate(${(i % cols) * cell.w},${Math.floor(i / cols) * cell.h})"><rect class="tint" x="7" y="7" width="${cell.w - 14}" height="${cell.h - 14}" rx="14" fill="#FFFFFF" stroke="#E3E8F0" stroke-width="1.5"/><text x="${cell.w / 2}" y="${cell.h / 2 + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="#A7B1C4" font-family="Nunito Sans, sans-serif">spare card: draw your own</text></g>`;
  return { W, H, svg: `<svg class="board pieces" data-cell-w="${cell.w}" data-cell-h="${cell.h}" width="${W + 20}" height="${H + 20}" viewBox="-10 -10 ${W + 20} ${H + 20}" style="margin:-10px">${out}<g stroke="#7F8BA3" stroke-width="1.3" stroke-dasharray="6 5" fill="none">${lines}</g></svg>` };
}

// ---------- html doc ----------
function htmlDoc({ title, rel, size, lowink, etsy, body, extraCss = '', extraDefs = '' }) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title>
<link rel="stylesheet" href="${rel}brand/fonts/fonts.css">
<style>${css(size)}${extraCss}</style></head>
<body class="${lowink ? 'lowink' : 'color'} ${etsy ? 'etsy' : 'site'}">${ARTDEFS}${UIDEFS}<svg class="sildefs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${extraDefs}</defs></svg>
${body}
</body></html>`;
}

module.exports = { IN, LIVE, CELL, BIG, PANEL, INNER, MIN_PIECE_IN, SLUG, BONUS, VERSION, COPYRIGHT, PRODUCT, BANDS, qrSvg, css, REL, mark, footer, header, esc, pieceCard, pieceGrid, htmlDoc, ui, C };
