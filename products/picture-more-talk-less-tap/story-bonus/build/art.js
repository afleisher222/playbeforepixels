// Art library for "More Talk, Less Tap" (Play Before Pixels).
// Flat geometric inline SVG. Characters and props are defined ONCE as <symbol>s and reused.
const C = {
  ink: '#1D2940', paper: '#FFFFFF', wash: '#F3F6FB', tomato: '#EE5A36', sun: '#F5B820', sky: '#3D86D8',
  grass: '#2FA36B', plum: '#8A5CC7', tTomato: '#FDE9E3', tSun: '#FEF4D8', tSky: '#E3EEFA', tGrass: '#DFF3E9', tPlum: '#EFE6FA',
};
const n = v => Math.round(v * 10) / 10;
const R = (x, y, w, h, f, rx = 0, ex = '') => `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${n(rx)}" fill="${f}" ${ex}/>`;
const Ci = (cx, cy, r, f, ex = '') => `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${f}" ${ex}/>`;
const E = (cx, cy, rx, ry, f, ex = '') => `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}" fill="${f}" ${ex}/>`;
const P = (d, f, ex = '') => `<path d="${d}" fill="${f}" ${ex}/>`;
const L = (d, col, w, ex = '') => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const U = (id, x = 0, y = 0, s = 1, ex = '') => `<use href="#${id}" transform="translate(${n(x)} ${n(y)}) scale(${s})" ${ex}/>`;
const G = (t, inner) => `<g transform="${t}">${inner}</g>`;
const TX = (x, y, str, size, fill, ex = '') => `<text x="${n(x)}" y="${n(y)}" font-family="Fredoka, 'Nunito Sans', sans-serif" font-weight="700" font-size="${size}" fill="${fill}" text-anchor="middle" ${ex}>${str}</text>`;

function starPath(r1, r2, k = 5) {
  let d = '';
  for (let i = 0; i < k * 2; i++) { const r = i % 2 ? r2 : r1; const a = Math.PI / k * i - Math.PI / 2; d += (i ? 'L' : 'M') + n(r * Math.cos(a)) + ' ' + n(r * Math.sin(a)); }
  return d + 'Z';
}

// ---------------------------------------------------------------- cast
const KIDS = {
  priya: { skin: '#C08457', hair: '#2B1D16', shirt: C.tomato, pants: C.ink, shoe: C.sky, style: 'bun' },
  leo:   { skin: '#F4CFAE', hair: '#E3B04B', shirt: C.sky, pants: C.ink, shoe: C.tomato, style: 'flat', glasses: true },
  zara:  { skin: '#5C3A26', hair: '#2B1D16', shirt: C.sun, pants: C.plum, shoe: C.tomato, style: 'puffs' },
  sam:   { skin: '#E0AC80', hair: '#A0522D', shirt: C.grass, pants: C.sky, shoe: C.ink, style: 'fringe' },
  milo:  { skin: '#8D5A3B', hair: '#2B1D16', shirt: C.plum, pants: C.ink, shoe: C.sun, style: 'curly' },
};
const TEACH = { skin: '#8D5A3B', hair: '#2B1D16' };

function hairBack(k) {
  const h = k.hair;
  if (k.style === 'bun') return Ci(0, -56, 22, h);
  if (k.style === 'puffs') return Ci(-42, -38, 27, h) + Ci(42, -38, 27, h);
  return '';
}
function hairFront(k) {
  const h = k.hair;
  switch (k.style) {
    case 'bun': return P('M-47 4 C-50 -34 -26 -52 0 -52 C26 -52 50 -34 47 4 C42 -12 32 -22 16 -27 C6 -15 -22 -12 -40 -12 C-44 -6 -46 -2 -47 4Z', h) + R(-15, -42, 30, 10, C.sun, 5);
    case 'puffs': return P('M-46 -4 C-46 -38 -24 -50 0 -50 C24 -50 46 -38 46 -4 C34 -24 18 -30 0 -30 C-18 -30 -34 -24 -46 -4Z', h) + L('M-38 -28 Q0 -52 38 -28', C.tomato, 8);
    case 'fringe': return P('M-47 8 C-52 -36 -22 -56 4 -54 C34 -52 52 -32 47 8 C44 -8 38 -18 30 -24 C18 -12 -8 -10 -30 -20 C-38 -12 -44 -2 -47 8Z', h);
    case 'flat': return P('M-47 -2 C-48 -34 -36 -54 0 -54 C36 -54 48 -34 47 -2 C44 -16 38 -26 28 -30 L-26 -30 C-38 -26 -44 -16 -47 -2Z', h) + P('M-6 -52 Q2 -68 14 -60 Q6 -56 4 -50Z', h);
    case 'curly': {
      let s = P('M-46 -2 C-48 -40 -24 -54 0 -54 C24 -54 48 -40 46 -2 C36 -18 20 -26 0 -26 C-20 -26 -36 -18 -46 -2Z', h);
      [-168, -145, -120, -95, -70, -45, -20].forEach(a => { const r = a * Math.PI / 180; s += Ci(44 * Math.cos(r), 44 * Math.sin(r) - 4, 15, h); });
      return s;
    }
  }
  return '';
}
function kidHead(k) {
  let s = hairBack(k) + Ci(-45, 8, 10, k.skin) + Ci(45, 8, 10, k.skin) + Ci(0, 0, 46, k.skin) + hairFront(k);
  if (k.glasses) s += `<circle cx="-16" cy="3" r="13" fill="none" stroke="${C.ink}" stroke-width="4"/><circle cx="16" cy="3" r="13" fill="none" stroke="${C.ink}" stroke-width="4"/>` + L('M-4 1 Q0 -2 4 1', C.ink, 4);
  return s;
}
function kidBody(k, pose) {
  const A = (x1, y1, x2, y2) => L(`M${x1} ${y1} L${x2} ${y2}`, k.shirt, 22) + Ci(x2, y2, 12, k.skin);
  const sit = pose.startsWith('sit');
  let s = '';
  if (!sit) s += R(-29, 114, 25, 62, k.pants, 12) + R(4, 114, 25, 62, k.pants, 12) + E(-18, 178, 19, 10, k.shoe) + E(18, 178, 19, 10, k.shoe);
  s += R(-38, 38, 76, sit ? 82 : 90, k.shirt, 30);
  if (sit) s += R(-66, 104, 132, 42, k.pants, 21) + E(-64, 138, 17, 10, k.shoe) + E(64, 138, 17, 10, k.shoe);
  const downL = A(-32, 56, -46, 116), downR = A(32, 56, 46, 116);
  const lapL = A(-32, 56, -36, 108), lapR = A(32, 56, 36, 108);
  switch (pose) {
    case 'stand': s += downL + downR; break;
    case 'cheer': s += A(-30, 54, -64, -14) + A(30, 54, 64, -14); break;
    case 'point': s += downL + A(32, 56, 84, 36); break;
    case 'handup': s += downL + A(30, 54, 44, -46); break;
    case 'carry': s += A(-32, 56, -16, 94) + A(32, 56, 16, 94); break;
    case 'reach': s += downL + A(30, 54, 30, -70); break;
    case 'sit': s += lapL + lapR; break;
    case 'sithand': s += lapL + A(30, 54, 44, -46); break;
    case 'sithold': s += A(-32, 56, -16, 94) + A(32, 56, 16, 94); break;
    case 'sittalk': s += lapL + A(32, 56, 82, 50); break;
    case 'sitcheer': s += A(-30, 54, -64, -14) + A(30, 54, 64, -14); break;
  }
  return s;
}
const KID_POSES = ['stand', 'cheer', 'point', 'handup', 'carry', 'reach', 'sit', 'sithand', 'sithold', 'sittalk', 'sitcheer'];

function teacherHead() {
  const t = TEACH;
  return E(0, -22, 74, 68, t.hair) + Ci(0, 0, 48, t.skin) +
    P('M-48 -2 C-50 -44 50 -44 48 -2 C36 -24 -36 -24 -48 -2Z', t.hair) + L('M-56 -36 Q0 -80 56 -36', C.tomato, 13) +
    Ci(-49, 26, 7, C.sun) + Ci(49, 26, 7, C.sun);
}
function teacherBody(pose) {
  const sk = TEACH.skin;
  const A = (x1, y1, x2, y2) => L(`M${x1} ${y1} L${x2} ${y2}`, C.sun, 24) + Ci(x2, y2, 13, sk);
  const sit = pose.startsWith('sit');
  let s = '';
  if (!sit) {
    s += R(-30, 206, 22, 72, sk, 11) + R(8, 206, 22, 72, sk, 11) + E(-20, 280, 22, 11, C.tomato) + E(20, 280, 22, 11, C.tomato);
    s += P('M-42 40 Q0 30 42 40 L70 214 Q0 228 -70 214Z', C.ink);
    s += P('M-42 40 L-20 42 L-28 204 L-64 198Z', C.sun) + P('M42 40 L20 42 L28 204 L64 198Z', C.sun);
    [[-8, 80], [10, 110], [-12, 150], [8, 186], [-30, 200], [34, 150]].forEach(([x, y]) => { s += Ci(x, y, 4, C.paper); });
  } else {
    s += P('M-42 40 Q0 30 42 40 L56 136 L-56 136Z', C.ink);
    s += P('M-42 40 L-20 42 L-26 132 L-54 130Z', C.sun) + P('M42 40 L20 42 L26 132 L54 130Z', C.sun);
    s += R(-94, 116, 188, 52, C.ink, 26) + E(-92, 158, 21, 11, C.tomato) + E(92, 158, 21, 11, C.tomato);
    [[-8, 80], [8, 108], [-60, 142], [-20, 150], [30, 138], [66, 150]].forEach(([x, y]) => { s += Ci(x, y, 4, C.paper); });
  }
  const dL = A(-40, 58, -56, 160), dR = A(40, 58, 56, 160);
  switch (pose) {
    case 'stand': s += dL + dR; break;
    case 'point': s += dL + A(40, 58, 104, 30); break;
    case 'reach': s += dL; break;
    case 'hold': s += A(-40, 58, -30, 128) + A(40, 58, 30, 128); break;
    case 'sit': s += A(-40, 58, -50, 128) + A(40, 58, 50, 128); break;
    case 'sithold': s += A(-40, 58, -18, 112) + A(40, 58, 18, 112); break;
    case 'sittalk': s += A(-40, 58, -50, 128) + A(40, 58, 100, 64); break;
  }
  return s;
}
const T_POSES = ['stand', 'point', 'reach', 'hold', 'sit', 'sithold', 'sittalk'];

// faces, centred on the head centre (head r = 46)
const EYES = (dx = 0, dy = 0, r = 6) => Ci(-16 + dx, 2 + dy, r, C.ink) + Ci(16 + dx, 2 + dy, r, C.ink) + Ci(-14 + dx, 0 + dy, 2, C.paper) + Ci(18 + dx, 0 + dy, 2, C.paper);
const CHEEK = (o = '.4') => Ci(-29, 17, 8, C.tomato, `fill-opacity="${o}"`) + Ci(29, 17, 8, C.tomato, `fill-opacity="${o}"`);
const FACES = {
  smile: CHEEK() + EYES() + L('M-11 19 Q0 28 11 19', C.ink, 4.5),
  talk: CHEEK() + EYES() + P('M-11 16 Q0 18 11 16 Q10 32 0 32 Q-10 32 -11 16Z', C.ink) + E(0, 28, 5, 3, C.tomato),
  laugh: CHEEK('.5') + L('M-23 5 Q-16 -4 -9 5', C.ink, 4.5) + L('M9 5 Q16 -4 23 5', C.ink, 4.5) + P('M-14 14 Q0 17 14 14 Q13 35 0 35 Q-13 35 -14 14Z', C.ink) + E(0, 30, 6, 3.5, C.tomato),
  oh: CHEEK() + EYES(0, 0, 6.5) + E(0, 25, 6, 8, C.ink),
  shy: CHEEK('.55') + EYES(0, 5, 5.5) + L('M-7 23 Q0 27 7 23', C.ink, 4),
  listen: CHEEK() + EYES(4, -1) + L('M-8 20 Q2 27 12 20', C.ink, 4.5),
  listenL: CHEEK() + EYES(-4, -1) + L('M-12 20 Q-2 27 8 20', C.ink, 4.5),
  uhoh: CHEEK() + EYES(0, 1, 6) + L('M-9 25 Q0 20 9 25', C.ink, 4.5) + L('M-25 -12 L-10 -9', C.ink, 4) + L('M25 -12 L10 -9', C.ink, 4),
  wow: CHEEK() + EYES(0, 0, 7) + L('M-25 -14 Q-17 -20 -9 -15', C.ink, 4) + L('M25 -14 Q17 -20 9 -15', C.ink, 4) + E(0, 25, 8, 9, C.ink),
  think: CHEEK() + EYES(3, -4) + L('M-6 22 Q4 24 10 20', C.ink, 4.5),
};

// blocks: 96 x 64, top-left origin
function earIcon() {
  return L('M40 46 C34 45 33 38 36 33 C39 28 37 22 40 18 C44 12 56 10 61 18 C65 24 63 30 58 35 C55 38 54 41 54 45 C54 51 47 54 43 50', C.paper, 6.5) + L('M47 30 C47 24 55 23 55 29', C.paper, 5);
}
const BLOCKS = {
  q: R(0, 0, 96, 64, C.sky, 12) + R(6, 6, 84, 52, C.sky, 8) + TX(48, 49, '?', 46, C.paper),
  j: R(0, 0, 96, 64, C.sun, 12) + Ci(37, 25, 5, C.ink) + Ci(59, 25, 5, C.ink) + P('M30 34 Q48 38 66 34 Q63 52 48 52 Q33 52 30 34Z', C.ink),
  i: R(0, 0, 96, 64, C.grass, 12) + Ci(48, 26, 14, C.paper) + R(41, 36, 14, 12, C.paper, 3) + R(43, 49, 10, 4, C.paper, 2) + L('M26 18 L20 14', C.paper, 4) + L('M70 18 L76 14', C.paper, 4) + L('M48 6 L48 2', C.paper, 0),
  l: R(0, 0, 96, 64, C.plum, 12) + earIcon(),
};

function fish(ex = '') {
  return P('M22 0 L46 -18 Q42 0 46 18Z', C.tomato) + E(0, 0, 32, 21, C.tomato) + P('M-4 -18 Q8 -34 18 -16Z', C.tomato) +
    Ci(-16, -5, 5.5, C.ink) + Ci(-14.5, -6.5, 1.9, C.paper) + L('M-24 7 Q-19 11 -14 8', C.ink, 3) + P('M2 4 Q10 0 12 10Z', '#F5B820');
}
function bowl() {
  // base centre at (0,0); bowl ~164 wide, 150 tall. White glass, sky-tint water.
  return P('M-50 -146 A82 82 0 1 0 50 -146 Z', C.paper) +
    P('M-74 -104 A82 82 0 0 0 74 -104 Z', C.tSky) +
    L('M-74 -104 Q-37 -112 0 -104 Q37 -96 74 -104', C.sky, 4) +
    P('M-60 -18 Q0 -34 60 -18 A82 82 0 0 1 -60 -18Z', C.sun) +
    L('M-30 -24 Q-36 -50 -26 -70', C.grass, 7) + L('M-20 -24 Q-10 -46 -18 -62', C.grass, 7) +
    E(0, -146, 52, 9, C.sky) + E(0, -146, 45, 5, C.paper) +
    G('translate(10 -62) scale(0.9)', fish()) + Ci(-30, -104, 5, C.paper) + Ci(-22, -124, 4, C.sky) + Ci(-16, -138, 3, C.sky);
}
function talkStar() {
  return `<path d="${starPath(58, 30)}" fill="${C.sun}" stroke="${C.sun}" stroke-width="16" stroke-linejoin="round"/>` +
    Ci(-12, -2, 5, C.ink) + Ci(12, -2, 5, C.ink) + L('M-8 10 Q0 16 8 10', C.ink, 4) + Ci(-20, 8, 5, C.tomato, 'fill-opacity=".45"') + Ci(20, 8, 5, C.tomato, 'fill-opacity=".45"');
}
function bin(withBlocks = true) {
  let s = '';
  if (withBlocks) s += G('translate(-78 -58) rotate(-12)', BLOCKS.q) + G('translate(-10 -72) rotate(8)', BLOCKS.i) + G('translate(20 -40) rotate(-4)', BLOCKS.j);
  return s + P('M-110 -20 L110 -20 L92 90 Q0 100 -92 90Z', C.tomato) + R(-118, -34, 236, 24, C.tomato, 12) + R(-70, 20, 140, 14, C.tTomato, 7);
}
function stool() {
  return R(-70, 0, 140, 24, C.grass, 10) + R(-58, 20, 20, 74, C.grass, 6) + R(38, 20, 20, 74, C.grass, 6) + R(-44, 54, 88, 14, C.grass, 5);
}
function clock() {
  return Ci(0, 0, 50, C.tomato) + Ci(0, 0, 40, C.paper) + L('M0 0 L0 -26', C.ink, 6) + L('M0 0 L18 8', C.ink, 6) + Ci(0, 0, 5, C.ink) +
    [0, 90, 180, 270].map(a => { const r = a * Math.PI / 180; return Ci(32 * Math.sin(r), -32 * Math.cos(r), 3, C.ink); }).join('');
}
function windowRain(w = 300, h = 240, rain = true) {
  // top-left origin
  let s = R(-14, -14, w + 28, h + 28, C.paper, 16) + R(0, 0, w, h, C.tSky, 8);
  // clouds
  s += Ci(w * 0.28, h * 0.2, 26, C.paper) + Ci(w * 0.38, h * 0.16, 32, C.paper) + Ci(w * 0.48, h * 0.22, 24, C.paper) + R(w * 0.2, h * 0.2, w * 0.32, 24, C.paper, 12);
  s += Ci(w * 0.7, h * 0.14, 20, C.paper) + Ci(w * 0.78, h * 0.1, 24, C.paper) + R(w * 0.64, h * 0.12, w * 0.22, 20, C.paper, 10);
  if (rain) {
    const drops = [[0.12, 0.45], [0.3, 0.55], [0.22, 0.78], [0.42, 0.42], [0.55, 0.7], [0.68, 0.46], [0.8, 0.66], [0.9, 0.38], [0.38, 0.88], [0.62, 0.9], [0.86, 0.9], [0.08, 0.9]];
    drops.forEach(([a, b]) => { s += L(`M${n(a * w)} ${n(b * h)} l-6 18`, C.sky, 6); });
  }
  s += R(w / 2 - 7, 0, 14, h, C.paper) + R(0, h / 2 - 7, w, 14, C.paper) + R(-24, h + 6, w + 48, 20, C.paper, 8);
  return s;
}
function shelf(w = 260, h = 120) {
  // top-left origin: a low white cubby shelf with books
  let s = R(0, 0, w, h, C.paper, 10) + R(14, 14, w / 2 - 21, h - 28, C.tSky, 6) + R(w / 2 + 7, 14, w / 2 - 21, h - 28, C.tSky, 6);
  const cols = [C.tomato, C.sun, C.grass, C.plum, C.sky];
  let x = 24;
  cols.forEach((c, i) => { const bh = h - 44 - (i % 2) * 10; s += R(x, h - 14 - bh, 16, bh, c, 3); x += 20; });
  s += R(w / 2 + 20, h - 50, 70, 36, C.sun, 6) + R(w / 2 + 28, h - 58, 54, 10, C.tomato, 5);
  return s;
}
function plant() {
  return P('M-20 -70 Q-60 -110 -44 -150 Q-10 -120 -8 -70Z', C.grass) + P('M4 -70 Q10 -140 40 -160 Q48 -110 18 -70Z', C.grass) + P('M-6 -70 Q-20 -130 0 -176 Q20 -130 8 -70Z', C.grass) +
    P('M-40 -72 L40 -72 L30 0 L-30 0Z', C.tomato) + R(-46, -82, 92, 18, C.tomato, 8);
}
function paperFish(col, rot = 0) {
  return G(`rotate(${rot})`, R(-50, -38, 100, 76, C.paper, 6) + G('translate(-2 2) scale(0.9)', fish().replace(/#EE5A36/g, col)) + R(-14, -46, 28, 14, C.sun, 3, 'fill-opacity=".85"'));
}
function banana() {
  return P('M-40 -10 Q-10 30 40 -14 Q44 -8 38 0 Q0 38 -42 0 Z', C.sun) + R(38, -20, 8, 10, '#8D5A3B', 3);
}
function table(w, h = 200) {
  // solid counter-style table: hides legs of children standing behind it
  return R(14, 16, w - 28, h, C.paper, 10) + R(0, 0, w, 30, C.sky, 14) + R(40, 56, w - 80, 10, C.tSky, 5);
}

function SYMBOLS() {
  let s = '';
  for (const [name, k] of Object.entries(KIDS)) {
    for (const p of KID_POSES) s += `<symbol id="k-${name}-${p}" overflow="visible">${kidBody(k, p)}${kidHead(k)}</symbol>`;
  }
  const tOver = p => p === 'reach' ? L('M40 58 L96 -80', C.sun, 24) + Ci(98, -86, 13, TEACH.skin) : '';
  for (const p of T_POSES) s += `<symbol id="t-${p}" overflow="visible">${teacherBody(p)}${teacherHead()}${tOver(p)}</symbol>`;
  for (const [f, v] of Object.entries(FACES)) s += `<symbol id="f-${f}" overflow="visible">${v}</symbol>`;
  for (const [b, v] of Object.entries(BLOCKS)) s += `<symbol id="blk-${b}" overflow="visible">${v}</symbol>`;
  s += `<symbol id="fish" overflow="visible">${fish()}</symbol>`;
  s += `<symbol id="bowl" overflow="visible">${bowl()}</symbol>`;
  s += `<symbol id="star" overflow="visible">${talkStar()}</symbol>`;
  s += `<symbol id="bin" overflow="visible">${bin()}</symbol>`;
  s += `<symbol id="stool" overflow="visible">${stool()}</symbol>`;
  s += `<symbol id="clock" overflow="visible">${clock()}</symbol>`;
  s += `<symbol id="plant" overflow="visible">${plant()}</symbol>`;
  s += `<symbol id="banana" overflow="visible">${banana()}</symbol>`;
  return `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${s}</defs></svg>`;
}

// placement helpers --------------------------------------------------
// kid(name, pose, x, y, s, face, flip): (x,y) = head centre
function kid(name, pose, x, y, s = 1, face = 'smile', flip = false) {
  return `<g transform="translate(${n(x)} ${n(y)}) scale(${flip ? -s : s} ${s})"><use href="#k-${name}-${pose}"/><use href="#f-${face}"/></g>`;
}
// feet-based placement: standing feet bottom = 188, sitting bottom = 148
function kidAt(name, pose, x, floorY, s = 1, face = 'smile', flip = false) {
  const off = pose.startsWith('sit') ? 148 : 188;
  return kid(name, pose, x, floorY - off * s, s, face, flip);
}
function teacher(pose, x, y, s = 1, face = 'smile', flip = false) {
  return `<g transform="translate(${n(x)} ${n(y)}) scale(${flip ? -s : s} ${s})"><use href="#t-${pose}"/><use href="#f-${face}"/></g>`;
}
function teacherAt(pose, x, floorY, s = 1, face = 'smile', flip = false) {
  const off = pose.startsWith('sit') ? 169 : 291;
  return teacher(pose, x, floorY - off * s, s, face, flip);
}
const JIT = [0, 5, -4, 3, -6, 4, -2, 6, -5, 2, -3, 5, -1, 4, -4, 2];
function tower(x, baseY, seq, s = 1, tilt = 0) {
  let out = '';
  seq.forEach((t, i) => { out += U('blk-' + t, x - 48 * s + JIT[i % JIT.length] * s, baseY - (i + 1) * 64 * s, s); });
  return tilt ? G(`rotate(${tilt} ${x} ${baseY})`, out) : out;
}
function blk(t, x, y, s = 1, rot = 0) { // centre-based, rotated
  return G(`translate(${n(x)} ${n(y)}) rotate(${rot}) scale(${s})`, U('blk-' + t, -48, -32));
}
function motion(x, y, len, ang, col = C.ink, w = 6) {
  const r = ang * Math.PI / 180;
  return L(`M${n(x)} ${n(y)} l${n(len * Math.cos(r))} ${n(len * Math.sin(r))}`, col, w);
}

module.exports = { C, n, R, Ci, E, P, L, U, G, TX, starPath, SYMBOLS, kid, kidAt, teacher, teacherAt, tower, blk, motion, windowRain, shelf, paperFish, table, KIDS };
