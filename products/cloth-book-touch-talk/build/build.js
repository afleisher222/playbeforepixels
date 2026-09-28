// Build script for "Soft! Bumpy! Crinkle!" — a talk-along cloth book for ages 0–1 (DESIGN ONLY, held from sale).
// 8 printed fabric panels: front cover, 6 word pages, back cover. Pages 1–3 are high-contrast (ink and white).
// Size: 6 x 6 in finished page, 0.375 in seam allowance on every edge (6.75 x 6.75 in printed panel),
// finished corners rounded r = 0.5 in. All sizes are UNVERIFIED: the chosen factory's cloth-book template decides.
// Outputs: source.html (print panels, no marks) and build/maker-spec.html (the same panels with the sensory
// elements, ribbon tabs, seams and label marked for the maker).
// Run: node build/build.js   then   bash build/render-all.sh
const fs = require('fs');
const path = require('path');
const K = require('../../bath-book-splash-talk/build/cast.js'); // shared Talk-Along cast (copied from board-up-go-more)
const { C, KIDS, ADULTS, use, kid, adult, bg, circle } = K;
const ROOT = path.resolve(__dirname, '..');

// ---------- geometry (600 px grid = 6.75 in printed panel) ----------
const GRID = 600, PANEL_IN = 6.75, PPI = GRID / PANEL_IN;      // 88.9 grid px per inch
const SA = 0.375 * PPI;                                          // 33.3 seam allowance
const SAFE = SA + 0.375 * PPI;                                   // 66.7: text and faces 0.375 in inside the finished edge
const RADIUS = 0.5 * PPI;                                        // 44.4 finished corner radius
const CSS_PX = PANEL_IN * 96;                                    // 648
const SCALE = CSS_PX / GRID;                                     // 1.08

const QR = JSON.parse(fs.readFileSync(path.join(__dirname, 'qr.json'), 'utf8'));
const qrSvg = px => `<svg class="qr" viewBox="-2 -2 ${QR.n + 4} ${QR.n + 4}" width="${px}" height="${px}" shape-rendering="crispEdges" aria-label="QR code to ${QR.url}"><rect x="-2" y="-2" width="${QR.n + 4}" height="${QR.n + 4}" fill="#FFFFFF"/><path d="${QR.d}" fill="${C.ink}"/></svg>`;
const VERSION = 'Version 1.0 · September 2026';
const COPYRIGHT = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.';
const TITLE = ['Soft!', 'Bumpy!', 'Crinkle!'];
const I = C.ink, W = '#FFFFFF';

// ---------- art ----------
// high-contrast face (ink/white only), centered at cx, cy with radius r
function hcFace(cx, cy, r, face = I, feat = W) {
  const e = r * .2;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${face}"/>
  <circle cx="${cx - r * .36}" cy="${cy - r * .14}" r="${e}" fill="${feat}"/><circle cx="${cx + r * .36}" cy="${cy - r * .14}" r="${e}" fill="${feat}"/>
  <circle cx="${cx - r * .36}" cy="${cy - r * .14}" r="${e * .5}" fill="${face}"/><circle cx="${cx + r * .36}" cy="${cy - r * .14}" r="${e * .5}" fill="${face}"/>
  <path d="M${cx - r * .38} ${cy + r * .26}Q${cx} ${cy + r * .66} ${cx + r * .38} ${cy + r * .26}" stroke="${feat}" stroke-width="${r * .12}" fill="none" stroke-linecap="round"/>`;
}
// checker ring (ink/white) around a centre, n segments
function checkerRing(cx, cy, r0, r1, n = 16) {
  let out = '';
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * 2 * Math.PI, a1 = ((i + 1) / n) * 2 * Math.PI;
    const p = (r, a) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
    out += `<path d="M${p(r0, a0)}L${p(r1, a0)}A${r1} ${r1} 0 0 1 ${p(r1, a1)}L${p(r0, a1)}A${r0} ${r0} 0 0 0 ${p(r0, a0)}Z" fill="${i % 2 ? W : I}"/>`;
  }
  return out;
}
const MIRROR = { cx: 300, cy: 300, r: 1.5 * PPI }; // 3 in mirror (UNVERIFIED size)
const scenes = {};
scenes.hi = () => bg(W) + [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => `<rect x="-11" y="-182" width="22" height="40" rx="11" fill="${I}" transform="translate(300,300) rotate(${a})"/>`).join('') + hcFace(300, 300, 118);
const checker2 = (cx, cy, r0, r1, n) => { const m = (r0 + r1) / 2; return checkerRing(cx, cy, r0, m, n) + `<g transform="rotate(${360 / n} ${cx} ${cy})">${checkerRing(cx, cy, m, r1, n)}</g>`; };
scenes.look = () => bg(I) + `<circle cx="${MIRROR.cx}" cy="${MIRROR.cy}" r="${MIRROR.r + 48}" fill="${W}"/>` + checker2(MIRROR.cx, MIRROR.cy, MIRROR.r + 8, MIRROR.r + 48, 22) +
  `<circle cx="${MIRROR.cx}" cy="${MIRROR.cy}" r="${MIRROR.r + 8}" fill="${W}"/><circle cx="${MIRROR.cx}" cy="${MIRROR.cy}" r="${MIRROR.r}" fill="${C.wash}"/>
   <path d="M${MIRROR.cx - 80} ${MIRROR.cy - 60}A100 100 0 0 1 ${MIRROR.cx - 20} ${MIRROR.cy - 104}" stroke="${W}" stroke-width="16" fill="none" stroke-linecap="round"/>
   <path d="M${MIRROR.cx - 96} ${MIRROR.cy - 20}A100 100 0 0 1 ${MIRROR.cx - 88} ${MIRROR.cy - 44}" stroke="${W}" stroke-width="16" fill="none" stroke-linecap="round"/>`;
scenes.crinkle = () => {
  const leaf = `<g transform="translate(300,300) rotate(-28)"><path d="M0-150C84-100 96 20 0 150C-96 20-84-100 0-150Z" fill="${C.grass}"/>
    <path d="M0-120V170" stroke="${W}" stroke-width="12" stroke-linecap="round"/>
    ${[-70, -20, 30].map(y => `<path d="M0 ${y}L46 ${y - 40}M0 ${y}L-46 ${y - 40}" stroke="${W}" stroke-width="9" stroke-linecap="round"/>`).join('')}</g>`;
  return bg(C.sun) + circle(300, 300, 200, W) + leaf;
};
const CAT_PATCH = { cx: 306, cy: 326, rx: 82, ry: 50 };
scenes.soft = () => bg(C.tPlum) + circle(300, 300, 200, W) + `<g transform="translate(316,300) scale(3.4)">${use('cat')}</g>` +
  `<ellipse cx="${CAT_PATCH.cx}" cy="${CAT_PATCH.cy}" rx="${CAT_PATCH.rx}" ry="${CAT_PATCH.ry}" fill="${C.plum}"/>` +
  [[-50, -18], [-18, -26], [16, -20], [48, -10], [-36, 10], [0, 4], [34, 16], [-10, 28]].map(([dx, dy]) => `<path d="M${CAT_PATCH.cx + dx - 9} ${CAT_PATCH.cy + dy}Q${CAT_PATCH.cx + dx} ${CAT_PATCH.cy + dy - 9} ${CAT_PATCH.cx + dx + 9} ${CAT_PATCH.cy + dy}" stroke="${C.tPlum}" stroke-width="5" fill="none" stroke-linecap="round"/>`).join('');
const SHELL = { cx: 300, cy: 300, r: 118 };
scenes.bumpy = () => {
  const { cx, cy, r } = SHELL;
  const body = `<ellipse cx="${cx - 150}" cy="${cy + 10}" rx="46" ry="38" fill="${C.sun}"/><circle cx="${cx - 166}" cy="${cy}" r="6" fill="${I}"/><path d="M${cx - 178} ${cy + 20}Q${cx - 166} ${cy + 28} ${cx - 154} ${cy + 20}" stroke="${I}" stroke-width="4" fill="none" stroke-linecap="round"/>
    ${[-70, 60].map(dx => `<rect x="${cx + dx - 20}" y="${cy + 10}" width="40" height="62" rx="20" fill="${C.sun}"/>`).join('')}<path d="M${cx + 112} ${cy + 20}L${cx + 150} ${cy + 36}L${cx + 112} ${cy + 46}Z" fill="${C.sun}"/>`;
  const shell = `<path d="M${cx - r} ${cy + 40}A${r} ${r * .95} 0 0 1 ${cx + r} ${cy + 40}Z" fill="${C.grass}"/>` +
    [[-60, -10], [0, -40], [60, -10], [-30, 20], [30, 20], [-84, 26], [84, 26], [0, -2]].map(([dx, dy]) => `<circle cx="${cx + dx}" cy="${cy + dy}" r="17" fill="${C.tGrass}"/>`).join('') +
    `<rect x="${cx - r - 6}" y="${cy + 34}" width="${2 * r + 12}" height="16" rx="8" fill="${C.grass}"/>`;
  return bg(C.tGrass) + circle(300, 300, 200, W) + body + shell;
};
scenes.byebye = () => {
  const k = Object.assign({}, KIDS.C, { x: 238, y: 440 - 27 * 1.5, s: 1.5, aL: 14, aR: -150, face: 'laugh' });
  const g = Object.assign({}, ADULTS.G4, { x: 392, y: 440 - 81 * 1.02, s: 1.02, flip: true, aL: -8, aR: -150, face: 'smile' });
  return bg(C.plum) + circle(300, 300, 200, C.tPlum) + use('moon', 'translate(430,170) scale(.7)') + adult(g) + kid(k) + `<rect x="130" y="436" width="340" height="14" rx="7" fill="${W}"/>`;
};

// ---------- manuscript (DRAFT: the founder rewrites in her own words) ----------
const WORDS = [
  { w: 'hi!', scene: 'hi', fs: 120, hc: true, tip: ['Say it close up, then wait.', 'A look, a wiggle or a coo is baby’s turn. Say “hi!” back.'] },
  { w: 'look!', scene: 'look', fs: 108, hc: true, dark: true, tip: ['Look together.', '“Who’s that? That’s you!” Pause, then copy any sound baby makes.'] },
  { w: 'crinkle', scene: 'crinkle', fs: 96, tip: ['Crinkle, then pause.', 'Scrunch the page, say “crinkle!”, then stop. Wait for a reach for more.'] },
  { w: 'soft', scene: 'soft', fs: 112, tip: ['Say what you feel.', 'Stroke the patch: “soft, soft.” Then bring baby’s hand to touch it too.'] },
  { w: 'bumpy', scene: 'bumpy', fs: 104, tip: ['Name it as you touch.', '“Bump, bump, bumpy!” Tap the bumps with baby’s fingers or toes.'] },
  { w: 'bye-bye', scene: 'byebye', fs: 100, dark: true, tip: ['Wave and wait.', '“Bye-bye, book!” Wave slowly. A look or a kick is a wave back.'] },
];
WORDS.forEach(p => { const n = (p.tip[0] + ' ' + p.tip[1]).split(/\s+/).length; if (n > 22) throw new Error(`Tip too long on "${p.w}": ${n}`); });

// ---------- pages ----------
const logo = (rel, variant, h) => `<img class="logo" style="height:${h}px" src="${rel}brand/logo/lockup-horizontal${variant ? '-' + variant : ''}.svg" alt="Play Before Pixels">`;
const art = (svg, label) => `<svg class="art" viewBox="0 0 600 600" role="img" aria-label="${label}">${svg}</svg>`;
function wordPage(p) {
  // art area: y 150–440 (scene drawn at 300,300 r 200 and scaled .72 toward 300,296)
  const s = scenes[p.scene]().replace(/^(<rect[^>]*\/>)/, '$1<g transform="translate(300,302) scale(.72) translate(-300,-300)">') + '</g>';
  return {
    cls: `word-page${p.dark ? ' dark' : ''}${p.hc ? ' hc' : ''}`, html: `
  ${art(s, p.w)}
  <h2 class="word" style="font-size:${p.fs}px">${p.w}</h2>
  <div class="card"><p class="tip"><span class="lab">Grown-up tip</span> <strong>${p.tip[0]}</strong> ${p.tip[1]}</p></div>`
  };
}
const coverArt = () => bg(I) + `<circle cx="410" cy="286" r="150" fill="${W}"/><circle cx="410" cy="286" r="135" fill="${I}"/>` + hcFace(410, 286, 118, W, I) + `<rect x="-10" y="470" width="620" height="140" fill="${C.tomato}"/>`;
const cover = rel => ({
  cls: 'cover', html: `
  ${art(coverArt(), 'A smiling black-and-white face in a checkered ring')}
  <span class="spill"><b>Talk-Along</b><i>Cloth Book</i></span>
  <h1 class="ctitle">${TITLE.map(t => `<span>${t.replace('!', '<i>!</i>')}</span>`).join('')}</h1>
  <p class="csub">6 first words to touch, look and say</p>
  <div class="cband">${logo(rel, 'reverse', 27)}<span class="age"><b>0–1</b> year</span></div>`
});
const back = rel => ({
  cls: 'back', html: `
  ${art(bg(C.wash) + `<rect x="-10" y="-10" width="620" height="${SAFE + 46}" fill="${I}"/>`, '')}
  <div class="bk">
    <div class="bhead">${logo(rel, 'reverse', 24)}</div>
    <h2 class="btitle">Touch, look and talk</h2>
    <p class="blurb">Six soft pages to crinkle, stroke, tap and look into, each with one word and a short grown-up tip. Say it, pause, and wait. A look, a coo or a kick is a turn.</p>
    <p class="lang">Talk, sign, sing and read in the language you know best.</p>
    <div class="safe"><b>Before each play:</b> check the seams, ribbon tabs and mirror. Stop using the book if anything is loose, torn or worn. Play together with a grown-up close by.</div>
    <p class="care">Care: surface wash with a damp cloth, or hand wash cold and air dry flat (confirm with the factory’s fabric test). Do not tumble dry or iron the mirror.</p>
    <div class="brow">
      <div class="bonus">${qrSvg(58)}<span><b>Free first-words song sheet</b>playbeforepixels.com</span></div>
    </div>
    <p class="legal">${COPYRIGHT} ${VERSION}. Tracking and care details are on the sewn-in label. More talk and play: <b>Up! Go! More!</b> and <b>Duck! Bubbles! All Done!</b></p>
  </div>`
});

// ---------- CSS ----------
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
.word{position:absolute;left:${SAFE}px;right:${SAFE}px;top:${SAFE - 14}px;margin:0;text-align:center;font-family:"Fredoka","Nunito Sans",sans-serif;font-weight:600;line-height:1.08;letter-spacing:-.01em;color:var(--ink);white-space:nowrap}
.dark .word{color:#fff}
.card{position:absolute;left:${SAFE}px;right:${SAFE}px;bottom:${SAFE}px;background:#fff;border-radius:20px;padding:11px 16px 12px}
.hc:not(.dark) .card{background:${C.ink};color:#fff}.hc:not(.dark) .tip{color:#fff}.hc:not(.dark) .tip .lab{color:${C.sun}}
.tip{margin:0;font-size:15px;line-height:1.3;font-weight:600;color:var(--ink)}
.tip .lab{display:block;font-weight:800;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:${C.tomato};margin-bottom:3px}
.tip strong{font-weight:800}
.cover .spill{position:absolute;left:${SAFE}px;top:${SAFE}px;display:inline-flex;border-radius:99px;background:#fff;color:${C.ink};font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;overflow:hidden}
.spill b{padding:6px 9px 6px 13px}.spill i{font-style:normal;background:${C.tomato};color:#fff;padding:6px 13px 6px 9px}
.cover .ctitle{position:absolute;left:${SAFE - 3}px;top:${SAFE + 40}px;margin:0;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:58px;line-height:.96;letter-spacing:-.035em;color:#fff}
.cover .ctitle span{display:block}.cover .ctitle i{font-style:normal;color:${C.sun}}
.csub{position:absolute;left:${SAFE}px;top:318px;width:190px;margin:0;font-weight:800;font-size:16px;line-height:1.25;color:#fff}
.cband{position:absolute;left:${SAFE}px;right:${SAFE}px;top:470px;height:${600 - SAFE - 470}px;display:flex;align-items:center;justify-content:space-between}
.age{display:flex;flex-direction:column;align-items:center;justify-content:center;width:56px;height:56px;border-radius:50%;background:${C.ink};color:#fff;font-size:9.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;line-height:1}
.age b{font-family:"Fredoka",sans-serif;font-weight:600;font-size:20px;letter-spacing:0;margin-bottom:2px}
.back .bk{position:absolute;left:${SAFE}px;right:${SAFE}px;top:${SAFE - 8}px;bottom:${SAFE}px;display:flex;flex-direction:column}
.bhead{height:40px;display:flex;align-items:center}
.btitle{margin:22px 0 6px;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:27px;letter-spacing:-.025em;line-height:1}
.blurb{margin:0;font-size:14.5px;line-height:1.36}
.lang{margin:7px 0 0;font-family:"Caveat",cursive;font-weight:700;font-size:21px;color:${C.tomato};line-height:1.1}
.safe{margin:8px 0 0;background:#fff;border-left:7px solid ${C.tomato};border-radius:10px;padding:8px 12px;font-size:13.5px;line-height:1.32}
.safe b{font-weight:800}
.care{margin:8px 0 0;font-size:11.5px;line-height:1.35}
.brow{margin-top:auto;display:flex;align-items:flex-end;gap:14px}
.bonus{display:flex;align-items:center;gap:9px;flex:0 0 auto}
.bonus span{font-size:10px;line-height:1.3}.bonus b{display:block;font-size:11px;font-weight:800}
.legal{margin:8px 0 0;font-size:8.8px;line-height:1.4;opacity:.9}
.legal b{font-weight:800}
</style>`;

// ---------- maker marks (separate file; never printed on fabric) ----------
const M = '#FF00FF', CY = '#00B7FF', GR = '#2FA36B';
const note = (x, y, w, lines, col = M) => `<g><rect x="${x}" y="${y}" width="${w}" height="${lines.length * 12 + 8}" rx="4" fill="#FFFFFF" stroke="${col}" stroke-width="1.2"/>${lines.map((l, i) => `<text x="${x + 6}" y="${y + 15 + i * 12}" font-family="Nunito Sans" font-weight="800" font-size="9" fill="${col}">${l}</text>`).join('')}</g>`;
const edgeMarks = () => `<rect x="0.75" y="0.75" width="598.5" height="598.5" fill="none" stroke="${GR}" stroke-width="1.5"/>
  <rect x="${SA}" y="${SA}" width="${GRID - 2 * SA}" height="${GRID - 2 * SA}" rx="${RADIUS}" fill="none" stroke="${M}" stroke-width="2"/>
  <rect x="${SA - 7}" y="${SA - 7}" width="${GRID - 2 * SA + 14}" height="${GRID - 2 * SA + 14}" rx="${RADIUS + 7}" fill="none" stroke="${M}" stroke-width="1" stroke-dasharray="3 3"/>
  <rect x="${SAFE}" y="${SAFE}" width="${GRID - 2 * SAFE}" height="${GRID - 2 * SAFE}" rx="10" fill="none" stroke="${CY}" stroke-width="1.2" stroke-dasharray="6 5"/>
  <rect x="${SA + 44}" y="${SA - 23}" width="525" height="15" rx="3" fill="#FFFFFF"/><text x="${SA + 50}" y="${SA - 12}" font-family="Nunito Sans" font-weight="800" font-size="8.5" fill="${M}">FINISHED EDGE 6 x 6 in, r 0.5 in · dashed = double lockstitch seam line · outer = 0.375 in seam allowance (UNVERIFIED)</text>`;
// ribbon tab: closed loop sewn into the right-hand seam; y = centre
// Ribbon tabs: one closed loop per leaf, sewn into the fore-edge seam. Leaf 2 = p3/p4, leaf 3 = p5/p6, leaf 4 = p7/p8.
// On rectos (odd pages) the fore-edge is on the right; on versos (even pages) it is on the left.
const TAB = { 3: [180, C.tomato], 5: [300, C.sun], 7: [420, C.sky] };
const tabR = (y, col) => `<rect x="${GRID - SA - 4}" y="${y - 13}" width="${SA + 10}" height="26" rx="13" fill="${col}"/><path d="M${GRID - SA} ${y - 16}V${y + 16}" stroke="${M}" stroke-width="2.5" stroke-dasharray="3 2"/>`;
const tabL = (y, col) => `<rect x="-6" y="${y - 13}" width="${SA + 10}" height="26" rx="13" fill="${col}"/><path d="M${SA} ${y - 16}V${y + 16}" stroke="${M}" stroke-width="2.5" stroke-dasharray="3 2"/>`;
const spine = side => `<text x="${side === 'L' ? SA - 10 : GRID - SA + 10}" y="300" transform="rotate(-90 ${side === 'L' ? SA - 10 : GRID - SA + 10} 300)" text-anchor="middle" font-family="Nunito Sans" font-weight="800" font-size="8.5" fill="${M}">SPINE SEAM</text>`;
const tabNote = (y, x = 330) => note(x, y + 20, 214, ['RIBBON TAB (this leaf): closed loop, both', 'ends in the seam, sticks out 1 in or less']);
const MAKER = {
  cover: () => spine('L') + note(SAFE, 384, 232, ['COVER LEAF (p1/p2): printed panels with thin', 'polyester batting, fully enclosed. No tab.']),
  hi: () => spine('R') + note(SAFE, 452, 236, ['HIGH CONTRAST: ink #1D2940 and white only']),
  look: () => spine('L') + `<circle cx="300" cy="302" r="${MIRROR.r * .72}" fill="none" stroke="${M}" stroke-width="2.5"/><circle cx="300" cy="302" r="${(MIRROR.r + 8) * .72}" fill="none" stroke="${M}" stroke-width="1" stroke-dasharray="3 3"/>` +
    tabR(...TAB[3]) + note(SAFE, 158, 250, ['SAFETY MIRROR FILM: flexible reflective film,', 'no glass, no rigid acrylic. Circle ~2.2 in', '(UNVERIFIED). Edges enclosed by a stitched', 'fabric frame (dashed); double lockstitch.']),
  crinkle: () => spine('R') + tabL(...TAB[3]) + note(SAFE, 158, 250, ['CRINKLE LAYER: crinkle film fills leaf 2', '(behind the mirror) between the fabric', 'layers; fully enclosed, stitched all round.']),
  soft: () => {
    const cx = 300 + (CAT_PATCH.cx - 300) * .72, cy = 302 + (CAT_PATCH.cy - 300) * .72;
    return spine('L') + `<ellipse cx="${cx}" cy="${cy}" rx="${CAT_PATCH.rx * .72}" ry="${CAT_PATCH.ry * .72}" fill="none" stroke="${M}" stroke-width="2.5"/>` + tabR(...TAB[5]) +
      note(SAFE, 158, 250, ['SOFT PATCH: plush/minky appliqué on the', 'cat, satin-stitched edge, short pile that', 'does not shed (lab to confirm).']);
  },
  bumpy: () => spine('R') + `<path d="M${300 - SHELL.r * .72} ${302 + 40 * .72}A${SHELL.r * .72} ${SHELL.r * .95 * .72} 0 0 1 ${300 + SHELL.r * .72} ${302 + 40 * .72}Z" fill="none" stroke="${M}" stroke-width="2.5"/>` + tabL(...TAB[5]) +
    note(SAFE, 158, 250, ['BUMPY PATCH: quilted or ribbed (corduroy)', 'appliqué on the shell, stitched through;', 'no beads, buttons or loose fill.']),
  byebye: () => spine('L') + tabR(...TAB[7]) + note(SAFE, 158, 250, ['SPINE: all leaves joined by a double', 'lockstitch spine seam; no rings, no ties.']),
  back: () => spine('R') + tabL(...TAB[7]) + `<rect x="${GRID - SA - 50}" y="330" width="56" height="110" rx="3" fill="#FFFFFF" stroke="${M}" stroke-width="2"/><text x="${GRID - SA - 22}" y="385" transform="rotate(-90 ${GRID - SA - 22} 385)" text-anchor="middle" font-family="Nunito Sans" font-weight="800" font-size="8" fill="${M}">SEWN-IN LABEL</text>` +
    note(GRID - SA - 312, 392, 256, ['PERMANENT TRACKING + CARE LABEL: sewn into', 'the spine seam (right). Printed: maker, place', 'and date of manufacture, batch, age grade,', 'fibre content, care. Wording from the lab.']),
};

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
const pageHtml = (p, overlay = '') => `<section class="page"><div class="pg ${p.cls}">${p.html}${overlay ? `<svg class="art" viewBox="0 0 600 600" style="z-index:9" aria-hidden="true">${overlay}</svg>` : ''}</div></section>`;

function build() {
  const R0 = '../../', R1 = '../../../';
  const pages = rel => [cover(rel), ...WORDS.map(wordPage), back(rel)];
  const keys = ['cover', ...WORDS.map(w => w.scene), 'back'];
  if (pages(R0).length !== 8) throw new Error('cloth book must have 8 panels');
  fs.writeFileSync(path.join(ROOT, 'source.html'), htmlDoc('Soft! Bumpy! Crinkle! — cloth book (design only)', R0, pages(R0).map(p => pageHtml(p)).join('\n')));
  fs.writeFileSync(path.join(__dirname, 'maker-spec.html'), htmlDoc('Soft! Bumpy! Crinkle! — maker spec', R1, pages(R1).map((p, i) => pageHtml(p, edgeMarks() + MAKER[keys[i]]())).join('\n')));
  const fin = (GRID - 2 * SA) * SCALE;
  const crop = p => `<div style="width:${fin}px;height:${fin}px;overflow:hidden;border-radius:${RADIUS * SCALE}px;position:relative"><div style="position:absolute;left:${-SA * SCALE}px;top:${-SA * SCALE}px">${pageHtml(p)}</div></div>`;
  fs.writeFileSync(path.join(__dirname, 'cover-only.html'), htmlDoc('cover', R1, crop(cover(R1))));
  fs.writeFileSync(path.join(__dirname, 'page-soft.html'), htmlDoc('soft', R1, crop(wordPage(WORDS[3]))));
  console.log(`cloth book: 8 panels, ${PANEL_IN} in printed panel, 6 in finished, seam allowance 0.375 in, finished size ${fin.toFixed(1)} CSS px`);
}
build();
