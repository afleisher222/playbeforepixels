// Shared parts for "100 Screen-Free Plays for Ages 0–5" (Play Before Pixels · AlphaPlay LLC): QR, scenes, play cards.
// Used by book.js (interiors) and extras.js (cover, wrap, mockup, listing images).
const path = require('path');
const fs = require('fs');
let QR = null; // qrcode (npm install in build/); qr.json caches the result so the build also works without it
try { QR = require('qrcode'); } catch (e) { /* use cache */ }
const CH = require('./chars.js');
const { ART, UI } = require('./icons.js');
const { P, BANDS, MOVES, WHERE } = require('./plays.js');
const { C, KIDS, ADULTS, kid, adult, aim, aimKid, aimAdult, adultHand, kidHand, use, F } = CH;
Object.assign(C, { s1: '#F4CFAE', s2: '#E0AC80', s3: '#C08457', s4: '#8D5A3B' }); // skin tones, also used for cardboard

const OUT = path.join(__dirname, '..');
const SLUG = 'guide-100-plays';
const BONUS = 'playbeforepixels.com/bonus/guide-100-plays';
const TITLE = '100 Screen-Free Plays';
const SUB = 'for Ages 0–5';
const COPY = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.';
const FONTS = '../../brand/fonts/fonts.css';
const W = '#FFFFFF';
const VERSION = 'Version 1.0 · September 2026'; // CUSTOMER-VOICE rule 7: bump on every change and tell past buyers

const BC = { // band colors
  b0: { c: C.sky, t: C.tSky, fg: W, name: 'sky' },
  b1: { c: C.grass, t: C.tGrass, fg: W, name: 'grass' },
  b2: { c: C.sun, t: C.tSun, fg: C.ink, name: 'sun' },
  b3: { c: C.tomato, t: C.tTomato, fg: W, name: 'tomato' },
};
const band = k => BANDS.find(b => b.key === k);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pad2 = n => String(n).padStart(2, '0');

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
  return `<svg class="qr" viewBox="-2 -2 ${n + 4} ${n + 4}" width="${size}" height="${size}" shape-rendering="crispEdges" role="img" aria-label="QR code to ${BONUS}"><rect x="-2" y="-2" width="${n + 4}" height="${n + 4}" fill="${W}"/><path d="${d}" fill="${fg}"/></svg>`;
}

// ---------------------------------------------------------------- scenes (600 x 600 viewBox)
function sceneBaby() { // 0–1: baby and grown-up on the floor, cup tower tumbling
  const k = Object.assign({}, KIDS.B, { x: 190, y: F - 4 * 1.3, s: 1.3, lL: -80, lR: -76, aL: 132, aR: -132, face: 'laugh' });
  const g = Object.assign({}, ADULTS.G2, { x: 452, y: F - 12 * 1.05, s: 1.05, flip: true, legs: 'sit', aL: 20, face: 'laugh' });
  g.aR = aimAdult(g, 'R', 352, F - 70);
  const rug = `<ellipse cx="300" cy="${F}" rx="250" ry="24" fill="${C.sky}"/>`;
  const cup = (x, y, r, c) => `<g transform="translate(${x},${y}) rotate(${r}) scale(.8)"><path d="M-20-28H20L16 30H-16Z" fill="${c}"/></g>`;
  const cups = cup(318, F - 22, 0, C.tomato) + cup(360, F - 22, 0, C.grass) + cup(300, F - 76, -28, C.sun) + cup(352, F - 104, 22, C.plum);
  const pops = `<rect x="262" y="330" width="8" height="18" rx="4" fill="${C.sun}" transform="rotate(-30 266 339)"/><rect x="392" y="310" width="8" height="18" rx="4" fill="${C.sun}" transform="rotate(30 396 319)"/>`;
  return `<circle cx="300" cy="318" r="160" fill="${W}"/>` + rug + adult(g) + cups + pops + kid(k);
}
function sceneBubbles() { // 1–2: bubble chase
  const g = Object.assign({}, ADULTS.G1, { x: 160, y: F - 51 * 1.1, s: 1.1, legs: 'kneel', aR: -128, aL: 14, face: 'smile' });
  const h = adultHand(g, 'R');
  const wand = `<g transform="translate(${h[0]},${h[1]}) rotate(-35)"><rect x="-4" y="-46" width="8" height="54" rx="4" fill="${C.tomato}"/><circle cx="0" cy="-62" r="17" fill="${C.tomato}"/><circle cx="0" cy="-62" r="10" fill="${C.tGrass}"/></g>`;
  const k = Object.assign({}, KIDS.A, { x: 412, y: F - 27 * 1.5, s: 1.5, face: 'laugh', aL: 150, aR: -150 });
  const bub = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${W}"/><path d="M${x - r * .55} ${y - r * .2}A${r * .6} ${r * .6} 0 0 1 ${x - r * .2} ${y - r * .55}" stroke="${C.sky}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
  const bubbles = [[268, 230, 24], [322, 196, 16], [330, 268, 12], [470, 180, 19], [380, 232, 11], [520, 260, 12], [292, 320, 10]].map(b => bub(...b)).join('');
  return `<circle cx="300" cy="318" r="160" fill="${C.grass}"/>` + adult(g) + wand + kid(k) + bubbles;
}
function scenePuddle() { // 2–3: puddle jump
  const k = Object.assign({}, KIDS.C, { x: 262, y: F - 27 * 1.5 - 44, s: 1.5, face: 'laugh', aL: 140, aR: -140, lL: 18, lR: -18, shoe: C.sun });
  const g = Object.assign({}, ADULTS.G4, { x: 462, y: F - 81 * 1.02, s: 1.02, flip: true, aL: -150, aR: 150, face: 'laugh' });
  const puddle = `<ellipse cx="262" cy="${F + 2}" rx="120" ry="20" fill="${C.sky}"/><ellipse cx="226" cy="${F - 2}" rx="36" ry="6" fill="${W}" fill-opacity=".5"/>`;
  const drop = (x, y, r) => `<path d="M${x} ${y - r * 1.8}Q${x + r} ${y - r * .2} ${x} ${y + r}Q${x - r} ${y - r * .2} ${x} ${y - r * 1.8}Z" fill="${C.sky}"/>`;
  const drops = drop(150, 420, 9) + drop(182, 392, 7) + drop(360, 404, 9) + drop(392, 430, 6) + drop(130, 452, 6);
  const cloud = `<g fill="${W}"><circle cx="150" cy="170" r="26"/><circle cx="184" cy="156" r="34"/><circle cx="222" cy="172" r="24"/><rect x="150" y="170" width="72" height="26"/></g>`;
  return `<circle cx="300" cy="318" r="160" fill="${C.sun}"/>` + cloud + puddle + drops + adult(g) + kid(k);
}
function sceneRocket() { // 3–5: box rocket countdown
  const k = Object.assign({}, KIDS.D, { x: 214, y: 360, s: 1.35, face: 'laugh', aL: 150, aR: -150, legs: false });
  const box = `<g transform="translate(214 0)">
    <path d="M-78 ${F}V350H78V${F}Z" fill="${C.s2}"/>
    <path d="M-78 350L-96 322H-18L0 350Z" fill="${C.s3}"/><path d="M78 350L96 322H18L0 350Z" fill="${C.s3}"/>
    <circle cx="0" cy="408" r="26" fill="${C.tSky}"/><circle cx="0" cy="408" r="18" fill="${C.sky}"/>
    <path d="M-78 ${F - 44}L-112 ${F}H-78Z" fill="${C.tomato}"/><path d="M78 ${F - 44}L112 ${F}H78Z" fill="${C.tomato}"/>
    <path d="M-34 ${F}L0 ${F + 30}L34 ${F}Z" fill="${C.sun}"/></g>`;
  const g = Object.assign({}, ADULTS.G5, { x: 450, y: F - 51 * 1.08, s: 1.08, flip: true, legs: 'kneel', aL: 16, aR: -150, face: 'laugh' });
  const stars = [[120, 190, 1], [300, 140, .7], [540, 260, .8], [340, 250, .5]].map(([x, y, s]) => `<circle cx="${x}" cy="${y}" r="${(s * 9).toFixed(1)}" fill="${C.sun}"/>`).join('');
  const nums = `<text x="440" y="176" text-anchor="middle" font-family="Bricolage Grotesque" font-weight="800" font-size="40" fill="${C.ink}">3, 2, 1…</text>`;
  return `<circle cx="300" cy="318" r="160" fill="${C.tomato}"/>` + stars + kid(k) + box + adult(g) + nums;
}
function sceneCover() { // cover: tower of blocks, ball, grown-up and child
  const k = Object.assign({}, KIDS.A, { x: 200, y: F - 27 * 1.55, s: 1.55, aL: 16, aR: -124, face: 'laugh' });
  const g = Object.assign({}, ADULTS.G3, { x: 446, y: F - 14 * 1.3, s: 1.3, flip: true, legs: 'cross', aL: 12, face: 'laugh' });
  g.aR = aimAdult(g, 'R', 352, F - 110);
  const blocks = use('block-3', `translate(318,${F - 28})`) + use('block-1', `translate(318,${F - 84})`) + use('block-2', `translate(318,${F - 140})`) + use('block-4', `translate(322,${F - 196}) rotate(8)`);
  const ball = use('ball', `translate(96,${F - 34}) scale(.68) rotate(-12)`);
  return adult(g) + blocks + kid(k) + ball;
}
function sceneGoodnight() { // closing page: story time on the rug, moon up, the tablet asleep on the shelf
  const g = Object.assign({}, ADULTS.G2, { x: 300, y: F - 14 * 1.2, s: 1.2, legs: 'cross', face: 'smile', armsFront: true });
  const k = Object.assign({}, KIDS.C, { x: 196, y: F - 27 * 1.3, s: 1.3, face: 'laugh', aL: 16, aR: -40 });
  const k2 = Object.assign({}, KIDS.A, { x: 408, y: F - 27 * 1.3, s: 1.3, flip: true, face: 'smile', aL: 14, aR: -44 });
  g.aL = aimAdult(g, 'L', 270, F - 70); g.aR = aimAdult(g, 'R', 330, F - 70);
  const book = use('book-open', `translate(300,${F - 78}) scale(.5)`, `style="--bc:${C.tomato}"`);
  const rug = `<ellipse cx="300" cy="${F}" rx="236" ry="22" fill="${C.plum}"/>`;
  const moon = use('moon', 'translate(470 200) scale(.9)');
  const dots = [[140, 180, 7], [200, 136, 5], [396, 132, 6], [540, 286, 5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.sun}"/>`).join('');
  return `<circle cx="300" cy="318" r="160" fill="${C.sky}"/>` + moon + dots + rug + adult(g) + kid(k) + kid(k2) + book;
}
const SCENES = { b0: sceneBaby, b1: sceneBubbles, b2: scenePuddle, b3: sceneRocket };

// ---------------------------------------------------------------- small UI pieces
const ico = (id, cls = '', size = '1em') => `<svg class="ico ${cls}" width="${size}" height="${size}" aria-hidden="true"><use href="#u-${id}"/></svg>`;
const PREP = ['No prep', '2-min prep', '10-min prep'];
const TIMEL = { 5: 'Plays about 5 min', 10: 'Plays about 10 min', 20: 'Plays 20+ min' };
const fromLabel = m => m === 0 ? 'From birth' : `From ${m} mo`;
const MESS = ['No mess', 'A little mess', 'Messy'];
function drops(level) {
  return `<span class="drops">${[0, 1].map(i => ico(i < level ? 'drop' : 'drop-o')).join('')}</span>`;
}
function artDisc(p, size = 1.45) {
  const b = BC[p.band];
  return `<div class="disc" style="width:${size}in;height:${size}in"><svg class="scene" viewBox="-60 -60 120 120" width="100%" height="100%"><circle r="60" fill="${b.t}"/><use href="#a-${p.art}" transform="scale(.82)"/></svg><span class="badge" style="background:${b.c};color:${b.fg}">${pad2(p.n)}</span></div>`;
}
function wherePills(p) { return p.where.filter(w => w !== 'move').slice(0, 2).map(w => WHERE[w]).join(' · ') + (p.where.includes('move') ? ' · Big energy' : ''); }

function playCard(p) {
  const b = BC[p.band]; const m = MOVES[p.move];
  const mat = p.mat.length ? esc(p.mat.join(', ')) : '<i>Nothing but you</i>';
  const hc = p.band === 'b2' ? C.ink : b.c;
  return `<article class="play" id="play-${p.n}">
    <div class="phead">
      ${artDisc(p)}
      <div class="ptitle">
        <div class="kicker">Play ${p.n} <span class="agepill" style="background:${b.t}">${fromLabel(p.from)}</span><span class="best">Best for ${esc(p.age)}</span></div>
        <h3>${esc(p.t)}</h3>
        <div class="meta">
          <span>${ico('clock')} ${PREP[p.prep]}</span>
          <span>${drops(p.mess)} ${MESS[p.mess]}</span>
          <span>${ico('timer')} ${TIMEL[p.time]}</span>
          <span>${ico('pin')} ${wherePills(p)}</span>
        </div>
        <div class="need">${ico('bag')}<span><b>You need:</b> ${mat}</span>${p.buy ? '' : `<span class="nbuy">${ico('home')} Nothing to buy</span>`}</div>
      </div>
    </div>
    <p class="how">${esc(p.how)}</p>
    <div class="eh"><p><b style="color:${hc}">Make it easier:</b> ${esc(p.easy)}</p><p><b style="color:${hc}">Make it harder:</b> ${esc(p.grow)}</p></div>
    <div class="talk" style="background:${b.t}">${ico('talk', 'big')}<div><div class="tlab">Talk while you play <span>· ${m.name}</span></div><div class="tline">${esc(p.talk)}</div></div></div>
    <div class="safe">${ico('shield')}<span><b>Safety:</b> ${esc(p.safe)}</span></div>
  </article>`;
}

// blank play template (editable in the PDF editions)
let fieldCount = 0;
const fld = (name, cls = '', lines = 1) => `<span class="field ${cls}" data-name="${name}" data-lines="${lines}"></span>`;
function ownCard(id, bandKey) {
  const b = BC[bandKey];
  return `<article class="play own">
    <div class="phead">
      <div class="disc" style="width:1.2in;height:1.2in"><svg viewBox="-60 -60 120 120" width="100%" height="100%"><circle r="58" fill="none" stroke="${b.c}" stroke-width="2.4" stroke-dasharray="6 6"/><text y="6" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="20" fill="${C.ink}">draw it!</text></svg></div>
      <div class="ptitle">
        <div class="kicker">Our own play <span class="agepill" style="background:${b.t}">age: ${fld(id + '-age', 'inl w1')}</span></div>
        <div class="lineh">${fld(id + '-title', 'big')}</div>
        <div class="meta"><span>${ico('clock')}</span><span>${ico('check', 'tick')} No prep</span><span>${ico('check', 'tick')} 2 min</span><span>${ico('check', 'tick')} 10 min</span><span style="margin-left:.1in">${drops(0)}</span><span>${ico('check', 'tick')} None</span><span>${ico('check', 'tick')} A little</span><span>${ico('check', 'tick')} Messy</span><span style="margin-left:.1in">${ico('timer')}</span><span>${ico('check', 'tick')} 5</span><span>${ico('check', 'tick')} 10</span><span>${ico('check', 'tick')} 20+</span></div>
        <div class="need">${ico('bag')}<span><b>You need:</b></span>${fld(id + '-need')}</div>
      </div>
    </div>
    <div class="lines3"><div class="tlab" style="color:#5A6478">How to play</div>${fld(id + '-how', 'multi', 3)}</div>
    <div class="need"><span><b>Easier:</b></span>${fld(id + '-easy')}<span style="margin-left:.1in"><b>Harder:</b></span>${fld(id + '-grow')}</div>
    <div class="talk" style="background:${b.t}">${ico('talk', 'big')}<div style="flex:1"><div class="tlab">Talk while you play</div>${fld(id + '-talk')}</div></div>
    <div class="safe">${ico('shield')}<span><b>Safety:</b></span>${fld(id + '-safe')}</div>
  </article>`;
}

module.exports = { sceneGoodnight, OUT, SLUG, BONUS, TITLE, SUB, COPY, FONTS, W, BC, band, esc, pad2, qrSvg, SCENES, sceneCover, ico, PREP, MESS, TIMEL, fromLabel, drops, artDisc, playCard, ownCard, fld, wherePills, VERSION };
