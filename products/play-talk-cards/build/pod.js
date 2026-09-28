// POD LATER: print-on-demand deck files. Do not upload or sell until the printable version has sold
// (marketing/DEMAND-CHECK.md, section 4 rule 8). node build/pod.js
// Output: pod-later/POD-LATER_<deck>_54-fronts.pdf (2.75 x 3.75 in pages = 2.5 x 3.5 in trim + 0.125 in bleed),
//         pod-later/POD-LATER_<deck>_back.pdf, pod-later/POD-LATER_<deck>_tuck-box.pdf (page 1 guide, page 2 art only),
//         pod-later/proof-<deck>.png (bleed / trim / safe-zone check).
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const K = require('./cards.js');
const { C, ICONS, SHAPE } = require('./art.js');
const { BANDS, MOMENTS } = require('./content.js');
const { logoRel, fontRel } = require('./build.js');

const HERE = __dirname, ROOT = path.resolve(HERE, '..'), REPO = path.resolve(ROOT, '../..');
const OUT = path.join(ROOT, 'pod-later');
const GEN = path.join(HERE, 'gen');
fs.mkdirSync(OUT, { recursive: true });
const RENDER = path.join(REPO, 'brand/render.js');
const run = (...a) => execFileSync('node', [RENDER, ...a], { stdio: 'inherit' });
const B = 12; // 0.125 in bleed

const DECKS = [
  { key: 'A', name: 'play-talk-deck', deck: K.DECK_A, card: K.cardA, back: K.backA, title: 'Play &amp; Talk', sub: '52 play cards · Ages 0–5', color: C.sun, on: C.ink,
    blurb: 'One play and one talk tip on every card. Age-coded for babies, toddlers and preschoolers, with simple safety notes built in.',
    inside: ['52 play cards in 4 age colors', 'How-to card', 'Blank card for your own play'],
    warn: 'For grown-ups to use with children. Cards are not a toy; keep them away from babies’ mouths. A grown-up supervises every play.' },
  { key: 'B', name: 'talk-along-deck', deck: K.DECK_B, card: K.cardB, back: K.backB, title: 'Talk-Along', sub: '52 family cards · Ages 5–12', color: C.sky, on: '#fff',
    blurb: 'Good questions for dinner, the car, bath time and bedtime, with a one-line grown-up tip on every card.',
    inside: ['52 question cards in 4 moments', 'How-to card', 'Blank card for your own question'],
    warn: 'In the car, a passenger reads the cards. Stay with children at bath time.' },
];

const CSS = `@page{size:2.75in 3.75in;margin:0}*{box-sizing:border-box}html,body{margin:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:264px;height:360px;overflow:hidden;page-break-after:always;break-after:page;position:relative}.page:last-child{page-break-after:auto}${K.CARD_CSS}`;
const head = (title, css, fromDir) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title><link rel="stylesheet" href="${fontRel(fromDir)}"><style>${css}</style></head><body>${K.defs()}`;

// ---------- tuck box (poker deck, 54 cards; box interior sized for ~0.7 in stack) ----------
const T = { W: 246, H: 342, D: 72, glue: 48, flap: 58, dust: 50 }; // px @96dpi: 2.5625 x 3.5625 x 0.75 in
function tuck(d, guide) {
  const x0 = B, y0 = B + T.flap + T.D; // top-left of the side-L panel row
  const X = { sideL: x0, front: x0 + T.D, sideR: x0 + T.D + T.W, back: x0 + 2 * T.D + T.W, glue: x0 + 2 * T.D + 2 * T.W };
  const totalW = 2 * T.D + 2 * T.W + T.glue + 2 * B, totalH = T.flap * 2 + T.D * 2 + T.H + 2 * B;
  const icons = d.key === 'A' ? ['ball', 'tower', 'teapot', 'rocket'] : MOMENTS.map(m => m.icon);
  const tints = d.key === 'A' ? [C.tSky, C.tGrass, C.tSun, C.tTomato] : [C.tTomato, C.tSun, C.tSky, C.tPlum];
  const panel = (x, y, w, h, bg, inner = '', cls = '') => `<div class="pn ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${bg}">${inner}</div>`;
  const front = `<div class="fr">
      <img src="${K.LOGO.mark}" class="fr-mark" alt="">
      <p class="fr-k">${d.sub}</p>
      <h1 style="color:${d.on}">${d.title}</h1>
      <p class="fr-s" style="color:${d.on}">Cards</p>
      <div class="fr-ic">${icons.map((ic, i) => `<span style="background:${tints[i]}"><svg viewBox="-58 -58 116 116" width="34" height="34">${ICONS[ic]()}</svg></span>`).join('')}</div>
      <p class="fr-b">Play Before Pixels</p></div>`;
  const back = `<div class="bk">
      <h2>${d.title} Cards</h2><p>${d.blurb}</p>
      <ul>${d.inside.map(t => `<li>${t}</li>`).join('')}</ul>
      <p class="warn">${d.warn}</p>
      <p class="cr">${K.COPY} ${K.VERSION}. Printed on demand. playbeforepixels.com</p></div>`;
  // No barcode box: add a UPC only if a seller channel requires one, in the spot the chosen printer's tuck-box template gives.
  const side = rot => `<div class="sd" style="transform:rotate(${rot}deg)"><b>${d.title} Cards</b> · ${d.sub}</div>`;
  let art = '';
  // bleed-filled background under the whole die, white where waste
  art += panel(0, y0 - B, totalW, T.H + 2 * B, d.color);
  art += panel(X.front - B, 0, T.W + 2 * B, T.flap + T.D + B, d.color); // top flap + top panel
  art += panel(X.front - B, y0 + T.H, T.W + 2 * B, T.D + T.flap + B, d.color); // bottom panel + flap
  art += panel(X.sideL - B, y0 - T.dust - B, T.D + B, T.dust + B, d.color); art += panel(X.sideR, y0 - T.dust - B, T.D + B, T.dust + B, d.color);
  art += panel(X.sideL - B, y0 + T.H, T.D + B, T.dust + B, d.color); art += panel(X.sideR, y0 + T.H, T.D + B, T.dust + B, d.color);
  art += panel(X.front, y0, T.W, T.H, 'transparent', front);
  art += panel(X.back, y0 - B, T.W + T.glue + B, T.H + 2 * B, '#fff');
  art += panel(X.back, y0, T.W, T.H, 'transparent', back);
  art += panel(X.sideL, y0, T.D, T.H, 'transparent', side(-90), 'side');
  art += panel(X.sideR, y0, T.D, T.H, 'transparent', side(90), 'side');
  art += panel(X.front, B + T.flap, T.W, T.D, 'transparent', `<img src="${K.LOGO.markWhite}" class="top-mark" alt="">`);
  let g = '';
  if (guide) {
    const cut = [], fold = [];
    const L = (a, b, c, e, arr) => arr.push(`<line x1="${a}" y1="${b}" x2="${c}" y2="${e}"/>`);
    // folds
    [X.front, X.sideR, X.back, X.glue].forEach(x => L(x, y0, x, y0 + T.H, fold));
    L(X.front, y0, X.front + T.W, y0, fold); L(X.front, B + T.flap, X.front + T.W, B + T.flap, fold);
    L(X.front, y0 + T.H, X.front + T.W, y0 + T.H, fold); L(X.front, y0 + T.H + T.D, X.front + T.W, y0 + T.H + T.D, fold);
    L(X.sideL, y0, X.sideL + T.D, y0, fold); L(X.sideR, y0, X.sideR + T.D, y0, fold); L(X.sideL, y0 + T.H, X.sideL + T.D, y0 + T.H, fold); L(X.sideR, y0 + T.H, X.sideR + T.D, y0 + T.H, fold);
    // cut outline (simplified)
    cut.push(`<path d="M${X.sideL} ${y0} V${y0 + T.H} M${X.back} ${y0}H${X.glue} M${X.back} ${y0 + T.H}H${X.glue} M${X.glue} ${y0 + 8}L${X.glue + T.glue} ${y0 + 20}V${y0 + T.H - 20}L${X.glue} ${y0 + T.H - 8}
      M${X.front} ${B + T.flap}Q${X.front} ${B} ${X.front + 30} ${B}H${X.front + T.W - 30}Q${X.front + T.W} ${B} ${X.front + T.W} ${B + T.flap}
      M${X.front} ${y0 + T.H + T.D}Q${X.front} ${y0 + T.H + T.D + T.flap} ${X.front + 30} ${y0 + T.H + T.D + T.flap}H${X.front + T.W - 30}Q${X.front + T.W} ${y0 + T.H + T.D + T.flap} ${X.front + T.W} ${y0 + T.H + T.D}
      M${X.sideL} ${y0}V${y0 - T.dust + 12}Q${X.sideL} ${y0 - T.dust} ${X.sideL + 20} ${y0 - T.dust}H${X.front}V${y0 - T.D}
      M${X.sideR + T.D} ${y0}V${y0 - T.dust + 12}Q${X.sideR + T.D} ${y0 - T.dust} ${X.sideR + T.D - 20} ${y0 - T.dust}H${X.sideR}V${y0 - T.D}
      M${X.sideL} ${y0 + T.H}V${y0 + T.H + T.dust - 12}Q${X.sideL} ${y0 + T.H + T.dust} ${X.sideL + 20} ${y0 + T.H + T.dust}H${X.front}
      M${X.sideR + T.D} ${y0 + T.H}V${y0 + T.H + T.dust - 12}Q${X.sideR + T.D} ${y0 + T.H + T.dust} ${X.sideR + T.D - 20} ${y0 + T.H + T.dust}H${X.sideR}
      M${X.front} ${y0 - T.D}V${B + T.flap} M${X.front + T.W} ${y0 - T.D}V${B + T.flap} M${X.front} ${y0 + T.H + T.D}V${y0 + T.H} M${X.front + T.W} ${y0 + T.H + T.D}V${y0 + T.H}"/>`);
    g = `<svg class="guide" width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}"><rect x="${B}" y="${B}" width="${totalW - 2 * B}" height="${totalH - 2 * B}" fill="none" stroke="#00AEEF" stroke-width=".6" stroke-dasharray="2 2"/>
      <g stroke="#FF00FF" stroke-width="1.2" fill="none">${cut.join('')}</g><g stroke="#00AEEF" stroke-width="1" stroke-dasharray="5 3">${fold.join('')}</g>
      <text x="${X.back + 10}" y="${y0 - 40}" font-size="9" font-family="sans-serif" fill="#FF00FF">POD LATER · GUIDE ONLY · magenta = cut, cyan dashed = fold</text>
      <text x="${X.back + 10}" y="${y0 - 26}" font-size="9" font-family="sans-serif" fill="#FF00FF">Place the art on your printer’s own tuck-box template [VERIFY sizes]</text></svg>`;
  }
  return { html: `<div class="tb" style="width:${totalW}px;height:${totalH}px">${art}${g}</div>`, w: totalW, h: totalH };
}
const TUCK_CSS = (w, h) => `@page{size:${w / 96}in ${h / 96}in;margin:0}*{box-sizing:border-box}html,body{margin:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;font-family:"Nunito Sans",sans-serif;color:${C.ink}}
symbol{overflow:visible}.sk{fill:var(--sk)} .hr{fill:var(--hr)} .sh{fill:var(--sh)} .pa{fill:var(--pa)} .so{fill:var(--so)} .hw{fill:var(--hw)} .ck{fill:${C.tomato};opacity:.28}
.tb{position:relative;overflow:hidden;background:#fff;page-break-after:always;break-after:page}.tb:last-child{page-break-after:auto}
.pn{position:absolute}.guide{position:absolute;left:0;top:0}
.fr{position:absolute;inset:0;padding:22px 20px;display:flex;flex-direction:column;align-items:center;text-align:center}
.fr-mark{width:38px;background:#fff;border-radius:10px;padding:6px;margin-bottom:12px}
.fr-k{margin:0;font-weight:800;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:${C.ink};background:#fff;border-radius:10px;padding:4px 9px}
.fr h1{margin:14px 0 0;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:44px;line-height:.95;letter-spacing:-.03em}
.fr-s{margin:2px 0 0;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:28px;letter-spacing:-.02em}
.fr-ic{display:flex;gap:6px;margin-top:16px}
.fr-ic span{width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:4px solid #fff}
.fr-b{margin:auto 0 0;font-weight:800;font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:${C.ink};background:#fff;border-radius:10px;padding:4px 9px}
.bk{position:absolute;inset:0;padding:22px 20px 16px}
.bk h2{margin:0 0 6px;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:19px}
.bk p{margin:0 0 8px;font-size:10px;line-height:1.4}
.bk ul{margin:0 0 8px;padding-left:15px;font-size:10px;line-height:1.45;font-weight:700}
.bk .warn{background:${C.wash};border-radius:8px;padding:6px 8px;font-size:8.5px;font-weight:700}
.bk .cr{font-size:7.5px;opacity:.7}
.upc{position:absolute;right:20px;bottom:16px;width:1.2in;height:.7in;border:1.2px dashed #9AA3B5;border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-size:8px;font-weight:800;line-height:1.2}
.upc small{font-weight:600;font-size:6.5px}
.side{display:flex;align-items:center;justify-content:center}
.sd{white-space:nowrap;font-size:10px;font-weight:700;color:${C.ink}}
.sd b{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:13px}
.top-mark{position:absolute;left:50%;top:50%;width:26px;transform:translate(-50%,-50%)}`;

for (const d of DECKS) {
  // fronts (54 pages) and back (1 page), each 2.75 x 3.75 in
  K.setLogoBase(logoRel(GEN));
  const fronts = d.deck.map(cd => `<section class="page">${d.card(cd, B)}</section>`).join('');
  const fh = path.join(GEN, `pod-${d.key}-fronts.html`);
  fs.writeFileSync(fh, head(`POD LATER ${d.name} fronts`, CSS, GEN) + fronts + '</body></html>');
  const bh = path.join(GEN, `pod-${d.key}-back.html`);
  fs.writeFileSync(bh, head(`POD LATER ${d.name} back`, CSS, GEN) + `<section class="page">${d.back(B)}</section></body></html>`);
  run('pdf', fh, path.join(OUT, `POD-LATER_${d.name}_54-fronts.pdf`));
  run('pdf', bh, path.join(OUT, `POD-LATER_${d.name}_back.pdf`));
  // tuck box: page 1 with guide, page 2 art only
  const t1 = tuck(d, true), t2 = tuck(d, false);
  const th = path.join(GEN, `pod-${d.key}-tuck.html`);
  fs.writeFileSync(th, head(`POD LATER ${d.name} tuck box`, TUCK_CSS(t1.w, t1.h), GEN) + t1.html + t2.html + '</body></html>');
  run('pdf', th, path.join(OUT, `POD-LATER_${d.name}_tuck-box.pdf`));
  run('pages', th, path.join(GEN, `tuck-${d.key}`), '.tb', '2');
  fs.copyFileSync(path.join(GEN, `tuck-${d.key}`, 'p01.png'), path.join(OUT, `proof-${d.name}_tuck-box-guide.png`));
  // proof sheet: 6 cards with trim (solid) and 0.16 in safe zone (dashed) drawn on top
  const picks = d.key === 'A' ? [0, 1, 20, 33, 44, 53] : [0, 1, 18, 30, 45, 53];
  const cells = picks.map(i => `<div class="pc">${d.card(d.deck[i], B)}<i class="trimln"></i><i class="safeln"></i></div>`).join('') + `<div class="pc">${d.back(B)}<i class="trimln"></i><i class="safeln"></i></div>`;
  const ph = path.join(GEN, `pod-${d.key}-proof.html`);
  fs.writeFileSync(ph, head('proof', `body{margin:0;background:#E9EDF3}${K.CARD_CSS}.wrap{display:flex;flex-wrap:wrap;gap:18px;padding:22px;width:1210px}.pc{position:relative}.trimln{position:absolute;left:${B}px;top:${B}px;width:240px;height:336px;outline:1.2px solid #FF00FF}.safeln{position:absolute;left:${B + 15}px;top:${B + 15}px;width:210px;height:306px;outline:1px dashed #00AEEF}.lg{width:100%;font:700 14px sans-serif;color:#1D2940}`, GEN) +
    `<div class="wrap"><p class="lg">POD LATER · ${d.name}: magenta = trim (2.5 × 3.5 in), color beyond it = 0.125 in bleed, cyan dashed = 0.16 in safe zone. Check against the chosen printer’s template [VERIFY].</p>${cells}</div></body></html>`);
  run('png', ph, path.join(OUT, `proof-${d.name}_cards.png`), '1210', '0', '1');
}
console.log('POD-later files written to', path.relative(REPO, OUT));
