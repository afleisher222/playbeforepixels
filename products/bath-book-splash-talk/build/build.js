// Build script for "Duck! Bubbles! All Done!" — a talk-along bath book for ages 0–2 (DESIGN ONLY, held from sale).
// 8 printed panels: front cover, 6 word pages (one word + one grown-up tip each), back cover.
// Size: 5.5 x 5.5 in trim, 0.125 in bleed (5.75 x 5.75 in panels), rounded corners r = 0.375 in.
// All of these sizes are UNVERIFIED: they come from the chosen factory's bath-book template (MANUFACTURING.md).
// Run: node build/build.js   then   bash build/render-all.sh
const fs = require('fs');
const path = require('path');
const K = require('./cast.js');
const { C, KIDS, ADULTS, use, kid, adult, bg, circle } = K;
const ROOT = path.resolve(__dirname, '..');

// ---------- geometry (600 px grid = 5.75 in panel with bleed) ----------
const GRID = 600, PANEL_IN = 5.75, PPI = GRID / PANEL_IN;       // 104.35 grid px per inch
const BLEED = 0.125 * PPI;                                        // 13.0
const SAFE = BLEED + 0.5 * PPI;                                   // 65.2: 0.5 in inside trim (heat-seal edge + brand 0.375 in safe zone)
const RADIUS = 0.375 * PPI;                                       // 39.1: die-cut corner radius at trim
const CSS_PX = PANEL_IN * 96;                                     // 552 CSS px per panel
const SCALE = CSS_PX / GRID;                                      // 0.92

const QR = JSON.parse(fs.readFileSync(path.join(__dirname, 'qr.json'), 'utf8'));
const qrSvg = px => `<svg class="qr" viewBox="-2 -2 ${QR.n + 4} ${QR.n + 4}" width="${px}" height="${px}" shape-rendering="crispEdges" aria-label="QR code to ${QR.url}"><rect x="-2" y="-2" width="${QR.n + 4}" height="${QR.n + 4}" fill="#FFFFFF"/><path d="${QR.d}" fill="${C.ink}"/></svg>`;
const VERSION = 'Version 1.0 · September 2026';
const COPYRIGHT = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.';
const TITLE = ['Duck!', 'Bubbles!', 'All done!'];

// ---------- bath-time drawing parts ----------
const drop = (x, y, s, c) => `<path transform="translate(${x},${y}) scale(${s})" d="M0-16C6-6 10 0 10 5A10 10 0 0 1-10 5C-10 0-6-6 0-16Z" fill="${c}"/>`;
const bubbleAt = (x, y, r, hl = C.sky) => `<g transform="translate(${x},${y}) scale(${(r / 20).toFixed(3)})" style="--bh:${hl}">${use('bubble')}</g>`;
// bathtub: rim top at y, centered at cx, width w. Drawn in front of the child.
function tub(cx, y, w, col = C.tomato, water = C.sky) {
  const x0 = cx - w / 2, h = 150;
  return `<rect x="${x0 - 8}" y="${y - 12}" width="${w + 16}" height="26" rx="13" fill="${col}"/>
  <path d="M${x0} ${y}H${x0 + w}V${y + h - 50}A50 50 0 0 1 ${x0 + w - 50} ${y + h}H${x0 + 50}A50 50 0 0 1 ${x0} ${y + h - 50}Z" fill="${col}"/>
  <rect x="${x0 + 40}" y="${y + h - 6}" width="30" height="34" rx="12" fill="${col}"/><rect x="${x0 + w - 70}" y="${y + h - 6}" width="30" height="34" rx="12" fill="${col}"/>
  <path d="M${x0 + 4} ${y - 2}C${x0 + w * .25} ${y - 26} ${x0 + w * .5} ${y + 16} ${x0 + w * .75} ${y - 10}S${x0 + w - 4} ${y - 2} ${x0 + w - 4} ${y - 2}Z" fill="${water}"/>`;
}
// water line inside the tub, drawn behind the tub front
const waterBack = (cx, y, w, c) => `<rect x="${cx - w / 2}" y="${y - 30}" width="${w}" height="40" rx="18" fill="${c}"/>`;

// ---------- scenes (600 x 600 grid incl. bleed); the art sits between y 190 and y 430 ----------
const scenes = {};
scenes.splash = () => {
  const k = Object.assign({}, KIDS.A, { x: 300, y: 402, s: 1.35, aL: 150, aR: -150, face: 'laugh', legs: false });
  const drops = [[196, 220, 1.3], [160, 280, 1], [230, 170, .9], [404, 220, 1.3], [440, 280, 1], [370, 170, .9], [128, 344, .8], [472, 344, .8]]
    .map(([x, y, s]) => drop(x, y, s, C.sky)).join('');
  return bg(C.sky) + circle(300, 318, 176, '#FFFFFF') + drops + waterBack(300, 400, 300, C.sky) + kid(k) + tub(300, 396, 330);
};
scenes.pour = () => {
  const cup = `<g style="--c1:${C.tomato};--c2:${C.sun}" transform="translate(236,236) rotate(-118) scale(1.9)">${use('cup')}</g>`;
  const stream = `<path d="M292 250C300 300 318 330 318 392" stroke="${C.sky}" stroke-width="30" fill="none" stroke-linecap="round"/>`;
  const splashes = drop(270, 378, .9, C.sky) + drop(366, 370, 1.1, C.sky) + drop(390, 330, .7, C.sky);
  return bg(C.sun) + circle(300, 318, 176, '#FFFFFF') + stream + cup + splashes + tub(300, 408, 330);
};
scenes.bubbles = () => {
  const k = Object.assign({}, KIDS.B, { x: 300, y: 432, s: 1.25, aL: 128, aR: -128, face: 'oh', legs: false });
  const bs = [[300, 200, 46], [196, 250, 34], [404, 244, 38], [150, 330, 24], [452, 330, 28], [236, 170, 20], [372, 162, 24], [120, 262, 16], [478, 254, 16]]
    .map(([x, y, r]) => bubbleAt(x, y, r, C.plum)).join('');
  const foam = [[186, 408, 34], [236, 420, 30], [364, 420, 30], [414, 408, 34], [300, 430, 28]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFFFFF"/>`).join('');
  return bg(C.plum) + circle(300, 318, 176, C.tPlum) + bs + kid(k) + `<rect x="110" y="420" width="380" height="200" rx="40" fill="${C.sky}"/>` + foam;
};
scenes.duck = () => {
  const waves = `<path d="M-20 420C40 390 90 450 150 420S260 390 300 420 410 450 450 420 560 390 620 420V620H-20Z" fill="${C.sky}"/>`;
  return bg(C.ink) + circle(300, 318, 176, '#FFFFFF') + `<g transform="translate(300,330) scale(4.4)">${use('duck')}</g>` + waves;
};
scenes.wash = () => {
  const k = Object.assign({}, KIDS.E, { x: 300, y: 404, s: 1.35, aL: 20, aR: -40, face: 'joy', legs: false });
  const head = [300, 404 - 69 * 1.35];
  const suds = [[-26, -34, 16], [0, -42, 18], [26, -34, 16], [-40, -16, 12], [40, -16, 12]].map(([dx, dy, r]) => `<circle cx="${head[0] + dx}" cy="${head[1] + dy}" r="${r}" fill="#FFFFFF"/>`).join('')
    + bubbleAt(214, 170, 16, C.grass) + bubbleAt(392, 176, 20, C.grass) + bubbleAt(430, 236, 12, C.grass);
  // grown-up arm from the right with a washcloth on the child's arm
  const g = Object.assign({}, ADULTS.G5, { x: 560, y: 560, s: 1.2, flip: true, aR: 58, aL: 0 });
  const arm = `<g style="--sk:${g.skin};--sh:${g.shirt}" transform="translate(520,300) rotate(66) scale(1.3)">${use('g-arm')}</g>`;
  const cloth = `<rect x="386" y="318" width="64" height="54" rx="12" fill="${C.sun}" transform="rotate(-12 418 345)"/><rect x="392" y="330" width="52" height="7" rx="3.5" fill="#FFFFFF" opacity=".6" transform="rotate(-12 418 345)"/>`;
  return bg(C.grass) + circle(300, 318, 176, '#FFFFFF') + waterBack(300, 400, 300, C.sky) + kid(k) + suds + arm + cloth + tub(300, 396, 330);
};
scenes.alldone = () => {
  // child wrapped in a hooded towel, arms up out of the towel, empty tub behind
  const k = Object.assign({}, KIDS.D, { x: 300, y: 440, s: 1.5, aL: 140, aR: -140, face: 'laugh', shirt: C.sun, pants: C.sun, legs: false });
  const hy = 440 - 69 * 1.5;
  const hood = `<path d="M${300 - 46} ${hy + 22}C${300 - 60} ${hy - 58} ${300 + 60} ${hy - 58} ${300 + 46} ${hy + 22}C${300 + 34} ${hy - 26} ${300 - 34} ${hy - 26} ${300 - 46} ${hy + 22}Z" fill="${C.sun}"/>`;
  const wrap = `<path d="M232 372C232 340 368 340 368 372V470H232Z" fill="${C.sun}"/><path d="M240 400H360" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" opacity=".7"/><path d="M240 424H360" stroke="${C.tomato}" stroke-width="8" stroke-linecap="round"/>`;
  return bg(C.tomato) + circle(300, 318, 176, '#FFFFFF') + kid(k) + wrap + hood + `<rect x="150" y="466" width="300" height="12" rx="6" fill="${C.tTomato}"/>`;
};

// ---------- manuscript (DRAFT: founder rewrites in her own words; see ../human_todo in listing.json) ----------
const WORDS = [
  { w: 'splash', scene: 'splash', fs: 128, dark: true, tip: ['Say it as you do it.', 'Pat the water: “splash, splash!” Then stop and wait for your little one’s turn.'] },
  { w: 'pour', scene: 'pour', fs: 138, dark: false, tip: ['Pause before you pour.', 'Hold the cup up and wait. Then say “pour!” as the water falls.'] },
  { w: 'bubbles', scene: 'bubbles', fs: 118, dark: true, tip: ['Offer a choice.', '“Big bubble or little bubble?” A look or a reach is an answer.'] },
  { w: 'duck', scene: 'duck', fs: 138, dark: true, tip: ['Copy their sounds.', 'A quack, a squeal, a splash: copy it back, then wait for more.'] },
  { w: 'wash', scene: 'wash', fs: 138, dark: true, tip: ['Name as you go.', '“Wash your arm. Wash your toes.” One body part, one word at a time.'] },
  { w: 'all done', scene: 'alldone', fs: 112, dark: true, tip: ['Sign it and say it.', 'Open hands, twist them: “all done!” Then wrap up for a cuddle.'] },
];
WORDS.forEach(p => {
  const n = (p.tip[0] + ' ' + p.tip[1]).split(/\s+/).length;
  if (n > 22) throw new Error(`Tip too long on "${p.w}": ${n} words`);
  if (!scenes[p.scene]) throw new Error('No scene for ' + p.w);
});

// ---------- pages ----------
const logo = (rel, variant, h) => `<img class="logo" style="height:${h}px" src="${rel}brand/logo/lockup-horizontal${variant ? '-' + variant : ''}.svg" alt="Play Before Pixels">`;
const art = (svg, label) => `<svg class="art" viewBox="0 0 600 600" role="img" aria-label="${label}">${svg}</svg>`;

function wordPage(p, i) {
  return {
    cls: `word-page${p.dark ? ' dark' : ''}`, html: `
  ${art(scenes[p.scene](), p.w)}
  <h2 class="word" style="font-size:${p.fs}px">${p.w}</h2>
  <div class="card"><p class="tip"><span class="lab">Grown-up tip</span> <strong>${p.tip[0]}</strong> ${p.tip[1]}</p></div>
  <span class="pno">${i + 2}</span>`
  };
}
function coverArt() {
  const k = Object.assign({}, KIDS.A, { x: 430, y: 432, s: 1.18, aL: 150, aR: -150, face: 'laugh', legs: false });
  const bs = [[350, 228, 22], [520, 214, 26], [468, 168, 14], [372, 170, 12], [540, 290, 14]].map(([x, y, r]) => bubbleAt(x, y, r, C.sky)).join('');
  return bg(C.sky) + circle(432, 330, 150, '#FFFFFF') + bs + waterBack(430, 424, 230, C.sky) + kid(k) +
    `<g transform="translate(344,410) scale(1.35)">${use('duck')}</g>` + tub(438, 422, 250, C.tomato, C.tSky) +
    `<rect x="-10" y="486" width="620" height="130" fill="${C.ink}"/>`;
}
const cover = rel => ({
  cls: 'cover', html: `
  ${art(coverArt(), 'A laughing toddler in a bathtub with a yellow duck and bubbles')}
  <span class="spill"><b>Talk-Along</b><i>Bath Book</i></span>
  <h1 class="ctitle">${TITLE.map(t => `<span>${t.replace('!', '<i>!</i>')}</span>`).join('')}</h1>
  <p class="csub">6 bath-time words to say and play</p>
  <div class="cband">${logo(rel, 'reverse', 26)}<span class="age"><b>0–2</b> years</span></div>`
});
function backArt() { return bg(C.tSky) + `<rect x="-10" y="-10" width="620" height="92" fill="${C.sky}"/>`; }
const back = rel => ({
  cls: 'back', html: `
  ${art(backArt(), '')}
  <div class="bk">
    <div class="bhead">${logo(rel, 'reverse', 22)}</div>
    <h2 class="btitle">Talk and play at bath time</h2>
    <p class="blurb">Six words for the tub, one on every page, each with a short grown-up tip. Say it, pause, and wait for a turn. A look, a sound or a splash counts.</p>
    <p class="lang">Talk, sign, sing and read in the language you know best.</p>
    <div class="safe"><b>Bath safety:</b> stay within arm’s reach every second. This book is for talk and play, not a float or a seat.</div>
    <p class="care">Care: squeeze out water, wipe dry and stand the book open to dry after each bath. Check every page before each bath; stop using it if anything splits or peels.</p>
    <div class="brow">
      <div class="bl">
        <div class="bonus">${qrSvg(58)}<span><b>Free bath-time song sheet</b>playbeforepixels.com</span></div>
        <div class="track"><span>Tracking label</span><small>Factory prints batch, date and place of manufacture here (CPSIA)</small></div>
      </div>
      <div class="isbn"><span>ISBN / barcode</span><small>2 × 1.2 in, supplied by the factory or ISBN agency</small></div>
    </div>
    <p class="legal">${COPYRIGHT} ${VERSION}. More talk and play: <i>Up! Go! More!</i> and <i>Soft! Bumpy! Crinkle!</i></p>
  </div>`
});

// ---------- CSS (sizes in the 600 px grid) ----------
const css = rel => `
<link rel="stylesheet" href="${rel}brand/fonts/fonts.css">
<style>
:root{--ink:${C.ink};--wash:${C.wash}}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
symbol{overflow:visible}
.sk{fill:var(--sk)} .hr{fill:var(--hr)} .sh{fill:var(--sh)} .pa{fill:var(--pa)} .so{fill:var(--so)} .hw{fill:var(--hw)} .ck{fill:${C.tomato};opacity:.28}
.page{position:relative;overflow:hidden;page-break-after:always;break-after:page;background:#fff;width:${CSS_PX}px;height:${CSS_PX}px}
.page:last-child{page-break-after:auto;break-after:auto}
.pg{position:absolute;left:0;top:0;width:600px;height:600px;overflow:hidden;transform:scale(${SCALE});transform-origin:0 0;font-family:"Nunito Sans","Helvetica Neue",Arial,sans-serif;color:var(--ink)}
.art{position:absolute;left:0;top:0;width:100%;height:100%;display:block}
.logo{display:block;width:auto}
.word{position:absolute;left:${SAFE}px;right:${SAFE}px;top:${SAFE - 26}px;margin:0;text-align:center;font-family:"Fredoka","Nunito Sans",sans-serif;font-weight:600;line-height:1.08;letter-spacing:-.01em;color:var(--ink);white-space:nowrap}
.dark .word{color:#fff}
.card{position:absolute;left:${SAFE}px;right:${SAFE}px;bottom:${SAFE}px;background:#fff;border-radius:20px;padding:11px 16px 12px}
.tip{margin:0;font-size:15px;line-height:1.3;font-weight:600;color:var(--ink)}
.tip .lab{display:block;font-weight:800;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:${C.tomato};margin-bottom:3px}
.tip strong{font-weight:800}
.pno{position:absolute;right:${SAFE}px;bottom:${SAFE - 26}px;font-weight:800;font-size:10px;color:#fff;opacity:.8}
.cover .spill{position:absolute;left:${SAFE}px;top:${SAFE}px;display:inline-flex;border-radius:99px;background:${C.ink};color:#fff;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;overflow:hidden}
.spill b{padding:6px 9px 6px 13px}.spill i{font-style:normal;background:${C.tomato};padding:6px 13px 6px 9px}
.cover .ctitle{position:absolute;left:${SAFE - 3}px;top:${SAFE + 40}px;margin:0;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:64px;line-height:.94;letter-spacing:-.035em;color:#fff}
.cover .ctitle span{display:block}.cover .ctitle i{font-style:normal;color:${C.sun}}
.csub{position:absolute;left:${SAFE}px;top:318px;width:180px;margin:0;font-weight:800;font-size:17px;line-height:1.2;color:#fff}
.cband{position:absolute;left:${SAFE}px;right:${SAFE}px;top:486px;height:${535 - 486}px;display:flex;align-items:center;justify-content:space-between}
.age{display:flex;flex-direction:column;align-items:center;justify-content:center;width:62px;height:62px;border-radius:50%;background:${C.tomato};color:#fff;font-size:9.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;line-height:1;margin-top:-30px}
.age b{font-family:"Fredoka",sans-serif;font-weight:600;font-size:21px;letter-spacing:0;margin-bottom:2px}
.back .bk{position:absolute;left:${SAFE}px;right:${SAFE}px;top:${SAFE - 40}px;bottom:${SAFE}px;display:flex;flex-direction:column}
.bhead{height:44px;display:flex;align-items:center}
.btitle{margin:22px 0 6px;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:27px;letter-spacing:-.025em;line-height:1}
.blurb{margin:0;font-size:13.5px;line-height:1.36}
.lang{margin:7px 0 0;font-family:"Caveat",cursive;font-weight:700;font-size:19px;color:${C.tomato};line-height:1.1}
.safe{margin:9px 0 0;background:#fff;border-left:7px solid ${C.tomato};border-radius:10px;padding:7px 11px;font-size:12.5px;line-height:1.32}
.safe b{font-weight:800}
.care{margin:7px 0 0;font-size:10.5px;line-height:1.35}
.brow{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;gap:12px}
.bl{display:flex;flex-direction:column;gap:8px}
.bonus{display:flex;align-items:center;gap:9px}
.bonus span{font-size:10px;line-height:1.3}.bonus b{display:block;font-size:11px;font-weight:800}
.track{width:176px;height:52px;border:1.5px dashed #9AA3B5;border-radius:6px;background:#fff;padding:5px 8px;display:flex;flex-direction:column;justify-content:center}
.track span{font-weight:800;font-size:10px;letter-spacing:.1em;text-transform:uppercase}.track small{font-size:8.5px;line-height:1.25;opacity:.8}
.isbn{width:${(2 * PPI).toFixed(1)}px;height:${(1.2 * PPI).toFixed(1)}px;background:#fff;border:1.5px dashed #9AA3B5;border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 12px}
.isbn span{font-weight:800;font-size:12px;letter-spacing:.1em;text-transform:uppercase}.isbn small{font-size:9px;opacity:.7;margin-top:4px;line-height:1.3}
.legal{margin:8px 0 0;font-size:8.5px;line-height:1.35;opacity:.9}
.legal i{font-style:italic}
</style>`;

// ---------- die line overlay (separate file; the factory's own die line always wins) ----------
const T0 = BLEED, T1 = GRID - BLEED;
const dieOverlay = () => `<svg class="art" viewBox="0 0 600 600" style="z-index:9" aria-hidden="true">
  <rect x="0.75" y="0.75" width="598.5" height="598.5" fill="none" stroke="#2FA36B" stroke-width="1.5"/>
  <rect x="${T0}" y="${T0}" width="${T1 - T0}" height="${T1 - T0}" rx="${RADIUS}" fill="none" stroke="#FF00FF" stroke-width="2"/>
  <rect x="${SAFE}" y="${SAFE}" width="${GRID - 2 * SAFE}" height="${GRID - 2 * SAFE}" rx="12" fill="none" stroke="#00B7FF" stroke-width="1.5" stroke-dasharray="6 5"/>
  <text x="${T0 + 44}" y="${T0 + 10}" font-family="Nunito Sans" font-weight="800" font-size="8.5" fill="#FF00FF">DIE LINE: 5.5 in trim, corner radius 0.375 in (UNVERIFIED)</text>
  <text x="${SAFE + 4}" y="${SAFE + 12}" font-family="Nunito Sans" font-weight="800" font-size="8.5" fill="#00B7FF">SAFE: 0.5 in inside trim (heat-seal edge)</text>
  <text x="4" y="596" font-family="Nunito Sans" font-weight="800" font-size="8.5" fill="#2FA36B">BLEED 0.125 in</text>
</svg>`;

function htmlDoc(title, rel, body, extra = '') {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
${css(rel)}<style>@page{size:${PANEL_IN}in ${PANEL_IN}in;margin:0}</style>${extra}
</head><body>
${K.defs()}
${body}
</body></html>`;
}
const pageHtml = (p, overlay = '') => `<section class="page"><div class="pg ${p.cls}">${p.html}${overlay}</div></section>`;

function build() {
  const R0 = '../../', R1 = '../../../';
  const pages = rel => [cover(rel), ...WORDS.map(wordPage), back(rel)];
  if (pages(R0).length !== 8) throw new Error('bath book must have 8 panels');
  fs.writeFileSync(path.join(ROOT, 'source.html'), htmlDoc('Duck! Bubbles! All Done! — bath book (design only)', R0, pages(R0).map(p => pageHtml(p)).join('\n')));
  fs.writeFileSync(path.join(__dirname, 'dieline.html'), htmlDoc('Duck! Bubbles! All Done! — die line proof', R1, pages(R1).map(p => pageHtml(p, dieOverlay())).join('\n')));
  // cover crop at trim with die-cut corners, for cover.png
  const trimPx = (GRID - 2 * BLEED) * SCALE;
  fs.writeFileSync(path.join(__dirname, 'cover-only.html'), htmlDoc('cover', R1,
    `<div style="width:${trimPx}px;height:${trimPx}px;overflow:hidden;border-radius:${RADIUS * SCALE}px;position:relative"><div style="position:absolute;left:${-BLEED * SCALE}px;top:${-BLEED * SCALE}px">${pageHtml(cover(R1))}</div></div>`,
    `<style>body{background:#fff}</style>`));
  // one word page at trim for the mockup
  fs.writeFileSync(path.join(__dirname, 'page-duck.html'), htmlDoc('duck', R1,
    `<div style="width:${trimPx}px;height:${trimPx}px;overflow:hidden;border-radius:${RADIUS * SCALE}px;position:relative"><div style="position:absolute;left:${-BLEED * SCALE}px;top:${-BLEED * SCALE}px">${pageHtml(wordPage(WORDS[3], 3))}</div></div>`));
  console.log(`bath book: 8 panels, ${PANEL_IN} in with bleed, trim ${(GRID - 2 * BLEED) / PPI} in, corner r 0.375 in, safe ${(SAFE / PPI).toFixed(3)} in from panel edge`);
}
build();
