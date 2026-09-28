// Build script for "The Day the Tablet Slept" (Play Before Pixels).
// node build.js  -> writes source.html, cover.html, mockup.html in this folder.
// All art is flat inline SVG built from reusable <symbol>s defined once in <defs>.
const fs = require('fs');
const path = require('path');
const OUT = __dirname;
const GUIDES = process.env.GUIDES === '1';

const C = {
  ink: '#1D2940', paper: '#FFFFFF', wash: '#F3F6FB', tomato: '#EE5A36', sun: '#F5B820', sky: '#3D86D8',
  grass: '#2FA36B', plum: '#8A5CC7', tTomato: '#FDE9E3', tSun: '#FEF4D8', tSky: '#E3EEFA', tGrass: '#DFF3E9', tPlum: '#EFE6FA',
  // kit skin & hair tones (also used for cardboard, pancakes and the dog's shading)
  s1: '#F4CFAE', s2: '#E0AC80', s3: '#C08457', s4: '#8D5A3B', s5: '#5C3A26',
  h1: '#2B1D16', h2: '#5A3825', h3: '#A0522D', h4: '#E3B04B',
};
const n = v => Math.round(v * 10) / 10;
const R = (x, y, w, h, f, rx = 0, ex = '') => `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${n(rx)}" fill="${f}" ${ex}/>`;
const Ci = (cx, cy, r, f, ex = '') => `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${f}" ${ex}/>`;
const E = (cx, cy, rx, ry, f, ex = '') => `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}" fill="${f}" ${ex}/>`;
const P = (d, f, ex = '') => `<path d="${d}" fill="${f}" ${ex}/>`;
const U = (id, x = 0, y = 0, s = 1, ex = '') => `<use href="#${id}" transform="translate(${n(x)} ${n(y)}) scale(${s})" ${ex}/>`;
const G = (t, inner) => `<g transform="${t}">${inner}</g>`;
const line = (d, col, w) => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const SPREAD_BG = f => R(-12, -12, 1656, 840, f);
const PAGE_BG = f => R(-12, -12, 840, 840, f);
let uid = 0; const nid = p => `${p}${++uid}`;

function starPath(r1, r2, k = 5) {
  let d = '';
  for (let i = 0; i < k * 2; i++) { const r = i % 2 ? r2 : r1; const a = Math.PI / k * i - Math.PI / 2; d += (i ? 'L' : 'M') + n(r * Math.cos(a)) + ' ' + n(r * Math.sin(a)); }
  return d + 'Z';
}

// ------------------------------------------------------------------ symbols
const FACE_EYES = `${Ci(-21, 14, 7.5, C.ink)}${Ci(21, 14, 7.5, C.ink)}${Ci(-18.5, 11.5, 2.4, C.paper)}${Ci(23.5, 11.5, 2.4, C.paper)}`;
const CHEEKS = `${Ci(-38, 32, 10, C.tomato, 'fill-opacity=".38"')}${Ci(38, 32, 10, C.tomato, 'fill-opacity=".38"')}`;
const SYMBOLS = `
<symbol id="face-smile" overflow="visible">${CHEEKS}${FACE_EYES}${line('M-14 34 Q0 46 14 34', C.ink, 5.5)}</symbol>
<symbol id="face-laugh" overflow="visible">${CHEEKS}${line('M-29 16 Q-21 5 -13 16', C.ink, 5.5)}${line('M13 16 Q21 5 29 16', C.ink, 5.5)}${P('M-16 30 Q0 32 16 30 Q15 52 0 52 Q-15 52 -16 30Z', C.ink)}${E(0, 46, 8, 5, C.tomato)}</symbol>
<symbol id="face-o" overflow="visible">${CHEEKS}${FACE_EYES}${E(0, 39, 7.5, 9.5, C.ink)}</symbol>
<symbol id="face-sleep" overflow="visible">${CHEEKS}${line('M-29 13 Q-21 21 -13 13', C.ink, 5.5)}${line('M13 13 Q21 21 29 13', C.ink, 5.5)}${line('M-8 36 Q0 41 8 36', C.ink, 5)}</symbol>

<symbol id="ada-head" overflow="visible">
  ${Ci(-64, -50, 30, C.h1)}${Ci(64, -50, 30, C.h1)}${Ci(0, -8, 66, C.h1)}
  ${Ci(-45, -37, 9, C.sun)}${Ci(45, -37, 9, C.sun)}
  ${Ci(-58, 12, 12, C.s3)}${Ci(58, 12, 12, C.s3)}${Ci(0, 6, 60, C.s3)}
  ${P('M-62 8 C-66 -82 66 -82 62 8 C52 -18 26 -28 0 -20 C-26 -28 -52 -18 -62 8Z', C.h1)}
</symbol>
<symbol id="papa-head" overflow="visible">
  ${Ci(-59, 12, 12, C.s4)}${Ci(59, 12, 12, C.s4)}${Ci(0, 6, 60, C.s4)}
  ${P('M-62 6 C-68 -86 68 -86 62 6 C58 -12 52 -22 42 -28 C12 -18 -26 -22 -48 -34 C-55 -24 -59 -12 -61 6Z', C.h1)}
  ${P('M-60 16 C-58 96 58 96 60 16 C56 42 42 58 24 55 C12 53 -12 53 -24 55 C-42 58 -56 42 -60 16Z', C.h1)}
</symbol>
<symbol id="rosa-head" overflow="visible">
  ${Ci(0, -66, 30, C.h3)}${Ci(0, -2, 66, C.h3)}
  ${Ci(-58, 12, 12, C.s1)}${Ci(58, 12, 12, C.s1)}${Ci(0, 6, 60, C.s1)}
  ${P('M-62 10 C-68 -84 66 -86 62 4 C44 -20 10 -14 -14 -38 C-24 -18 -44 -8 -62 10Z', C.h3)}
  ${Ci(-26, -52, 7, C.plum)}
</symbol>

<symbol id="tablet-body" overflow="visible">
  ${R(0, 0, 150, 200, C.ink, 24)}${R(12, 16, 126, 170, C.tSky, 14)}${Ci(75, 8.5, 3, C.sky)}
</symbol>
<symbol id="tab-face-sleep" overflow="visible">
  ${Ci(38, 126, 11, C.tomato, 'fill-opacity=".4"')}${Ci(112, 126, 11, C.tomato, 'fill-opacity=".4"')}
  ${line('M38 102 Q50 114 62 102', C.ink, 6)}${line('M88 102 Q100 114 112 102', C.ink, 6)}${line('M65 132 Q75 140 85 132', C.ink, 5.5)}
</symbol>
<symbol id="tab-face-awake" overflow="visible">
  ${Ci(38, 126, 11, C.tomato, 'fill-opacity=".4"')}${Ci(112, 126, 11, C.tomato, 'fill-opacity=".4"')}
  ${Ci(50, 104, 8.5, C.ink)}${Ci(100, 104, 8.5, C.ink)}${Ci(53, 101, 2.6, C.paper)}${Ci(103, 101, 2.6, C.paper)}
  ${P('M58 126 Q75 128 92 126 Q90 150 75 150 Q60 150 58 126Z', C.ink)}${E(75, 144, 8, 5, C.tomato)}
</symbol>
<symbol id="nightcap" overflow="visible">
  ${P('M-6 40 C-6 -44 104 -92 176 -44 C208 -22 218 22 208 64 C194 30 178 16 160 20 Z', C.plum)}
  ${P('M-18 30 C36 6 104 -8 168 6 L172 38 C108 24 40 36 -12 58 Z', C.tPlum)}
  ${Ci(38, -20, 7, C.tPlum)}${Ci(96, -44, 6, C.tPlum)}${Ci(150, -30, 6, C.tPlum)}${Ci(124, 2, 5, C.tPlum)}
  ${Ci(208, 70, 19, C.sun)}
</symbol>
<symbol id="tablet-sleeping" overflow="visible">${U('tablet-body')}${U('tab-face-sleep')}${U('nightcap')}</symbol>
<symbol id="tablet-awake" overflow="visible">${U('tablet-body')}${U('tab-face-awake')}</symbol>

<symbol id="dog-base" overflow="visible">
  ${R(-104, -168, 20, 66, C.sun, 10, 'transform="rotate(-38 -94 -104)"')}
  ${R(-52, -66, 22, 66, C.h4, 11)}${R(46, -66, 22, 66, C.h4, 11)}
  ${R(-94, -130, 180, 82, C.sun, 41)}
  ${E(-26, -106, 26, 18, C.h3)}
  ${R(-76, -66, 25, 66, C.sun, 12.5)}${R(24, -66, 25, 66, C.sun, 12.5)}
  ${R(40, -134, 20, 56, C.tomato, 10, 'transform="rotate(22 50 -106)"')}${Ci(60, -86, 7, C.sun)}
  ${Ci(90, -152, 46, C.sun)}
  ${P('M60 -190 C38 -188 32 -134 50 -118 C70 -124 80 -162 78 -188 Z', C.h3)}
  ${E(124, -136, 30, 22, C.tSun)}${E(149, -145, 11, 9, C.ink)}
</symbol>
<symbol id="dog" overflow="visible">${U('dog-base')}${Ci(100, -164, 7, C.ink)}${Ci(102.5, -166.5, 2.2, C.paper)}${line('M117 -121 Q127 -113 137 -121', C.ink, 4.5)}</symbol>
<symbol id="dog-happy" overflow="visible">${U('dog-base')}${line('M92 -162 Q100 -173 108 -162', C.ink, 5)}${E(129, -112, 8, 11, C.tomato)}${line('M115 -122 Q127 -112 139 -122', C.ink, 4.5)}</symbol>
<symbol id="dog-lie" overflow="visible">
  ${R(-112, -40, 70, 22, C.sun, 11, 'transform="rotate(-18 -100 -30)"')}
  ${R(-96, -78, 180, 78, C.sun, 39)}${E(-30, -56, 26, 16, C.h3)}
  ${R(40, -26, 86, 26, C.sun, 13)}
  ${R(38, -86, 20, 40, C.tomato, 10, 'transform="rotate(10 48 -66)"')}
  ${Ci(92, -76, 44, C.sun)}
  ${P('M64 -112 C42 -110 38 -58 56 -44 C74 -50 82 -86 80 -110 Z', C.h3)}
  ${E(124, -60, 28, 20, C.tSun)}${E(147, -68, 10, 8, C.ink)}
  ${line('M90 -86 Q98 -79 106 -86', C.ink, 4.5)}
</symbol>

<symbol id="block-c" overflow="visible">${R(0, 0, 64, 64, 'inherit', 10)}${Ci(32, 32, 15, C.paper, 'fill-opacity=".5"')}</symbol>
<symbol id="block-t" overflow="visible">${R(0, 0, 64, 64, 'inherit', 10)}${P('M32 16 L48 46 L16 46Z', C.paper, 'fill-opacity=".5"')}</symbol>
<symbol id="block-s" overflow="visible">${R(0, 0, 64, 64, 'inherit', 10)}${R(18, 18, 28, 28, C.paper, 4, 'fill-opacity=".5"')}</symbol>
<symbol id="star" overflow="visible">${P(starPath(20, 9), 'inherit', 'stroke="inherit" stroke-width="4" stroke-linejoin="round"')}</symbol>
<symbol id="book" overflow="visible">${R(0, 0, 92, 118, 'inherit', 8)}${R(80, 6, 8, 106, C.paper, 3)}${R(14, 30, 52, 12, C.paper, 6, 'fill-opacity=".6"')}${R(14, 50, 34, 8, C.paper, 4, 'fill-opacity=".6"')}</symbol>
<symbol id="book-open" overflow="visible">${P('M-104 -6 L0 6 L104 -6 L104 80 L0 90 L-104 80Z', C.sun)}${P('M-96 -12 C-60 -18 -20 -12 -2 0 L-2 80 C-20 70 -60 66 -96 72Z', C.paper)}${P('M96 -12 C60 -18 20 -12 2 0 L2 80 C20 70 60 66 96 72Z', C.paper)}${R(-80, 10, 54, 7, C.tSky, 3)}${R(-80, 26, 44, 7, C.tSky, 3)}${Ci(52, 30, 18, C.s3)}${Ci(38, 16, 7, C.s3)}${Ci(66, 16, 7, C.s3)}</symbol>
<symbol id="cup" overflow="visible">${R(-30, -40, 60, 64, 'inherit', 12)}${P('M26 -26 C52 -26 52 12 26 12 L26 2 C40 2 40 -16 26 -16Z', 'inherit')}</symbol>
<symbol id="boot" overflow="visible">${P('M-24 -86 L14 -86 L14 -30 L42 -24 C52 -22 54 0 44 0 L-24 0 Z', C.sun)}${R(-28, -92, 46, 14, C.sun, 7)}</symbol>
<symbol id="cloud" overflow="visible">${Ci(0, 0, 30, C.paper)}${Ci(42, -18, 42, C.paper)}${Ci(88, 0, 30, C.paper)}${R(0, 0, 88, 30, C.paper)}</symbol>
<mask id="moon-mask"><rect x="-80" y="-80" width="160" height="160" fill="#fff"/><circle cx="30" cy="-18" r="52" fill="#000"/></mask>
<symbol id="moon" overflow="visible"><circle r="60" fill="${C.tSun}" mask="url(#moon-mask)"/></symbol>
<symbol id="sun" overflow="visible">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => R(-7, -86, 14, 26, C.sun, 7, `transform="rotate(${a})"`)).join('')}${Ci(0, 0, 50, C.sun)}</symbol>
<symbol id="ball" overflow="visible">${Ci(0, 0, 40, C.tomato)}${P('M-40 0 A40 40 0 0 1 40 0 L28 0 A28 12 0 0 0 -28 0Z', C.sun)}${P('M-38 12 C-20 24 20 24 38 12 L34 22 C18 32 -18 32 -34 22Z', C.paper)}</symbol>
<symbol id="duck" overflow="visible">${E(0, 0, 40, 24, C.sun)}${Ci(26, -28, 20, C.sun)}${P('M42 -30 L62 -26 L42 -20Z', C.tomato)}${Ci(30, -32, 4, C.ink)}${P('M-40 -6 L-54 -22 L-30 -14Z', C.sun)}</symbol>
<symbol id="pancake" overflow="visible">${R(-56, -8, 112, 20, C.s3, 10)}${E(0, -8, 56, 15, C.s2)}</symbol>
<symbol id="rocket" overflow="visible">
  ${P('M-100 -130 L-176 -6 L-176 20 L-100 -30Z', C.tomato)}${P('M100 -130 L176 -6 L176 20 L100 -30Z', C.tomato)}
  ${R(-100, -350, 200, 350, C.s2, 6)}
  ${R(-100, -214, 200, 24, C.sun)}
  ${line('M-64 -350 L-64 -336', C.s3, 4)}${line('M70 -30 L70 -12', C.s3, 4)}${line('M-60 -60 L-40 -60', C.s3, 4)}
  ${P('M-114 -348 Q0 -560 114 -348Z', C.plum)}${Ci(0, -456, 13, C.sun)}
  ${Ci(0, -282, 52, C.paper)}${Ci(0, -282, 42, C.tSky)}
  ${Ci(0, -120, 44, C.paper)}${Ci(0, -120, 34, C.tSky)}
  ${R(-40, -2, 80, 10, C.s3, 5)}
</symbol>
`;

// ------------------------------------------------------------------ people
const BODY = {
  child: { legX: 17, legW: 26, legTop: -112, legLen: 98, shoeW: 40, shoeH: 22, torso: [-50, -212, 100, 130, 40], pantsTop: -128, neck: [-12, -234, 24, 32], headY: -270, headS: 1, sh: [40, -192], L1: 44, L2: 42, armW: 22 },
  adult: { legX: 26, legW: 32, legTop: -202, legLen: 186, shoeW: 50, shoeH: 26, torso: [-66, -412, 132, 232, 50], pantsTop: -232, neck: [-15, -434, 30, 34], headY: -478, headS: 1.02, sh: [56, -386], L1: 72, L2: 68, armW: 28 },
};
function seg(A, B, w, fill) {
  const dx = B[0] - A[0], dy = B[1] - A[1]; const L = Math.hypot(dx, dy); const ang = Math.atan2(-dx, dy) * 180 / Math.PI;
  return `<rect x="${n(-w / 2)}" y="${n(-w / 2)}" width="${n(w)}" height="${n(L + w)}" rx="${n(w / 2)}" fill="${fill}" transform="translate(${n(A[0])} ${n(A[1])}) rotate(${n(ang)})"/>`;
}
function ik(S, T, L1, L2, bend) {
  let dx = T[0] - S[0], dy = T[1] - S[1]; let d = Math.hypot(dx, dy);
  const dd = Math.max(Math.abs(L1 - L2) + 0.5, Math.min(d, L1 + L2 - 0.5));
  const a = Math.atan2(dy, dx); const A = Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + dd * dd - L2 * L2) / (2 * L1 * dd))));
  const ang = a + bend * A; const El = [S[0] + L1 * Math.cos(ang), S[1] + L1 * Math.sin(ang)];
  const ex = T[0] - El[0], ey = T[1] - El[1]; const el = Math.hypot(ex, ey) || 1;
  return [El, [El[0] + ex / el * L2, El[1] + ey / el * L2]];
}
function person(o) {
  const B = BODY[o.kind || 'child']; const flip = o.flip ? -1 : 1; const s = o.s || 1;
  const toLocal = W => [(W[0] - o.x) / s * flip, (W[1] - o.y) / s];
  let g = '';
  // legs
  if (!o.noLegs) {
    const legs = o.legs || [0, 0]; const len = o.legLen || B.legLen;
    [-1, 1].forEach((side, i) => {
      const ang = side === -1 ? legs[0] : -legs[1];
      let leg = R(-B.legW / 2, 0, B.legW, len, o.pants, B.legW / 2);
      if (o.boots) leg += R(-B.legW / 2 - 3, len - 52, B.legW + 6, 52, o.shoes, 8);
      leg += R(-B.shoeW / 2 + side * 7, len - 10, B.shoeW, B.shoeH, o.shoes, B.shoeH / 2);
      g += G(`translate(${side * B.legX} ${B.legTop}) rotate(${ang})`, leg);
    });
  }
  // torso
  const [tx, ty, tw, th, tr] = B.torso; const bot = ty + th;
  g += R(B.neck[0], B.neck[1], B.neck[2], B.neck[3], o.skin, 8);
  g += R(tx, ty, tw, th, o.shirt, tr);
  if (o.pants && !o.dress) { const r = tr; g += P(`M${tx} ${B.pantsTop} H${tx + tw} V${bot - r} Q${tx + tw} ${bot} ${tx + tw - r} ${bot} H${tx + r} Q${tx} ${bot} ${tx} ${bot - r}Z`, o.pants); }
  if (o.apron) g += R(tx + tw * 0.2, ty + 26, tw * 0.6, th - 20, o.apron, 14) + R(tx + tw * 0.28, ty + 36, tw * 0.44, 12, C.paper, 6, 'fill-opacity=".45"');
  if (o.collar) g += P(`M-22 ${ty + 2} L0 ${ty + 22} L22 ${ty + 2}Z`, o.collar);
  if (o.buttons) [0, 1, 2].forEach(i => g += Ci(0, ty + 40 + i * 28, 5, o.buttons));
  // head
  g += U(o.head, 0, B.headY, B.headS) + U(o.face || 'face-smile', 0, B.headY, B.headS);
  // arms
  [-1, 1].forEach(side => {
    const spec = side === -1 ? (o.armL || { a: 12, b: 0 }) : (o.armR || { a: 12, b: 0 });
    const Sh = [side * B.sh[0], B.sh[1]]; let El, H;
    if (spec.shh) {
      [El, H] = ik(Sh, [side * -2, B.headY + B.headS * 58], B.L1, B.L2, -side);
    } else if (spec.to || spec.toW) {
      const T = spec.toW ? toLocal(spec.toW) : spec.to;
      [El, H] = ik(Sh, T, B.L1, B.L2, spec.bend != null ? spec.bend : side);
    } else {
      const a = spec.a * Math.PI / 180, b = (spec.a + (spec.b || 0)) * Math.PI / 180;
      El = [Sh[0] + side * Math.sin(a) * B.L1, Sh[1] + Math.cos(a) * B.L1];
      H = [El[0] + side * Math.sin(b) * B.L2, El[1] + Math.cos(b) * B.L2];
    }
    const w = B.armW; const fc = spec.shh ? (o.shade || o.skin) : o.skin; let a = seg(Sh, El, w, o.skin) + seg(El, H, w, fc);
    if (o.sleeves === 'long') { const H2 = [El[0] + (H[0] - El[0]) * 0.72, El[1] + (H[1] - El[1]) * 0.72]; a += seg(Sh, El, w + 5, o.shirt) + seg(El, H2, w + 5, o.shirt); }
    else { const M = [Sh[0] + (El[0] - Sh[0]) * 0.55, Sh[1] + (El[1] - Sh[1]) * 0.55]; a += seg(Sh, M, w + 6, o.shirt); }
    if (spec.hold) a += G(`translate(${n(H[0])} ${n(H[1])})${spec.holdRot ? ` rotate(${spec.holdRot})` : ''}`, spec.hold);
    a += Ci(H[0], H[1], w * 0.68, fc);
    if (spec.finger || spec.shh) a += R(H[0] - w * 0.2, H[1] - w * 1.55, w * 0.4, w * 1.45, fc, w * 0.2);
    if (spec.front !== false) g += a; else g = a + g;
  });
  return G(`translate(${n(o.x)} ${n(o.y)})${o.rot ? ` rotate(${o.rot})` : ''} scale(${n(s * flip * 1000) / 1000} ${s})`, g);
}
const OUTFIT = {
  pj: { shirt: C.plum, pants: C.plum, shoes: C.paper, sleeves: 'long', buttons: C.tPlum },
  day: { shirt: C.tomato, pants: C.ink, shoes: C.paper },
  socks: { shirt: C.tomato, pants: C.ink, shoes: C.paper },
  rain: { shirt: C.tomato, pants: C.sky, shoes: C.sun, boots: true, sleeves: 'long', buttons: C.sun },
};
const ada = o => person({ kind: 'child', head: 'ada-head', skin: C.s3, shade: C.s4, ...OUTFIT[o.outfit || 'day'], ...o });
const papa = o => person({ kind: 'adult', head: 'papa-head', skin: C.s4, shade: C.s5, shirt: C.grass, pants: C.ink, shoes: C.tomato, collar: C.tGrass, ...o });
const rosa = o => person({ kind: 'adult', head: 'rosa-head', skin: C.s1, shade: C.s2, shirt: C.plum, pants: C.ink, shoes: C.ink, collar: C.paper, buttons: C.tPlum, ...o });
const dog = (x, y, s = 1, v = 'dog', flip = false, rot = 0) => G(`translate(${x} ${y})${rot ? ` rotate(${rot})` : ''} scale(${flip ? -s : s} ${s})`, U(v));

// ------------------------------------------------------------------ props
const zzz = (x, y, s = 1, col = C.sky) => `<g font-family="Fredoka, Nunito Sans, sans-serif" font-weight="700" fill="${col}">
  <text x="${x}" y="${y}" font-size="${n(40 * s)}">z</text><text x="${n(x + 32 * s)}" y="${n(y - 44 * s)}" font-size="${n(54 * s)}">z</text><text x="${n(x + 74 * s)}" y="${n(y - 102 * s)}" font-size="${n(72 * s)}">Z</text></g>`;
function blanket(x, y, w, h, col = C.tomato, dot = C.paper, rot = 0) {
  let d = R(x, y, w, h, col, 20) + R(x + 10, y + 5, w - 20, 16, C.paper, 8, 'fill-opacity=".35"');
  for (let i = 0; i < Math.floor(w / 44); i++) for (let j = 0; j < Math.floor((h - 30) / 40); j++) d += Ci(x + 26 + i * 44 + (j % 2) * 22, y + 46 + j * 40, 5, dot, 'fill-opacity=".8"');
  return rot ? G(`rotate(${rot} ${x + w / 2} ${y + h / 2})`, d) : d;
}
// tablet resting on a pillow; (cx, surfaceY) = where the pillow sits
function tabletOnPillow(cx, sy, s = 1, rot = -4, awake = false) {
  const pw = 300 * s, ph = 58 * s;
  let g = R(cx - pw / 2, sy - ph, pw, ph, C.paper, ph / 2);
  const tx = cx - 75 * s, ty = sy - ph * 0.55 - 200 * s;
  g += G(`rotate(${rot} ${cx} ${sy - ph})`, U(awake ? 'tablet-awake' : 'tablet-sleeping', tx, ty, s) + (awake ? '' : blanket(cx - 112 * s, ty + 148 * s, 224 * s, 80 * s)));
  return g;
}
function cabinet(x, y, w, h, col = C.sky, knob = C.sun) {
  return R(x + 26, y + h - 6, 18, 30, C.ink, 6) + R(x + w - 44, y + h - 6, 18, 30, C.ink, 6) + R(x, y, w, h, col, 18) +
    R(x + w / 2 - 3, y + 26, 6, h - 52, C.paper, 3, 'fill-opacity=".35"') + Ci(x + w / 2 - 22, y + h / 2, 9, knob) + Ci(x + w / 2 + 22, y + h / 2, 9, knob);
}
function windowFrame(x, y, w, h, glass, inner = '') {
  const id = nid('win');
  return `<clipPath id="${id}"><rect x="${x + 14}" y="${y + 14}" width="${w - 28}" height="${h - 28}" rx="8"/></clipPath>` +
    R(x, y, w, h, C.paper, 16) + R(x + 14, y + 14, w - 28, h - 28, glass, 8) + `<g clip-path="url(#${id})">${inner}</g>` +
    R(x + w / 2 - 6, y + 14, 12, h - 28, C.paper) + R(x + 14, y + h / 2 - 6, w - 28, 12, C.paper);
}
function plant(x, gy, pot = C.tomato) {
  return E(x - 34, gy - 150, 22, 52, C.grass, `transform="rotate(-28 ${x - 34} ${gy - 150})"`) + E(x + 34, gy - 150, 22, 52, C.grass, `transform="rotate(28 ${x + 34} ${gy - 150})"`) +
    E(x, gy - 176, 24, 62, C.grass) + P(`M${x - 50} ${gy - 100} H${x + 50} L${x + 38} ${gy} H${x - 38}Z`, pot) + R(x - 56, gy - 112, 112, 22, pot, 8);
}
const block = (x, y, col, kind = 'c', s = 1, rot = 0) => `<use href="#block-${kind}" fill="${col}" transform="translate(${n(x)} ${n(y)}) rotate(${rot} ${32 * s} ${32 * s}) scale(${s})"/>`;
const bookU = (x, y, col, s = 1, rot = 0) => `<use href="#book" fill="${col}" transform="translate(${n(x)} ${n(y)}) rotate(${rot}) scale(${s})"/>`;
const starU = (x, y, col, s = 1, rot = 0) => `<use href="#star" fill="${col}" stroke="${col}" transform="translate(${n(x)} ${n(y)}) rotate(${rot}) scale(${s})"/>`;
function stars(list, col) { return list.map(([x, y, s, c]) => starU(x, y, c || col, s || 0.5)).join(''); }
function dots(list, col) { return list.map(([x, y, r]) => Ci(x, y, r || 3, col)).join(''); }
function rocketWithCrew(x, y, s, rot, crew = true) {
  let inner = U('rocket');
  if (crew) {
    const a = nid('rw'), b = nid('rw');
    inner += `<clipPath id="${a}"><circle cx="0" cy="-282" r="42"/></clipPath><clipPath id="${b}"><circle cx="0" cy="-120" r="34"/></clipPath>`;
    inner += `<g clip-path="url(#${a})">${U('ada-head', 0, -270, 0.62)}${U('face-laugh', 0, -270, 0.62)}</g>`;
    inner += `<g clip-path="url(#${b})">${G('translate(-50 -40) scale(0.55)', U('dog-happy'))}</g>`;
  }
  return G(`translate(${x} ${y}) rotate(${rot}) scale(${s})`, inner);
}
function flames(x, y, s, rot) {
  return G(`translate(${x} ${y}) rotate(${rot}) scale(${s})`, P('M-60 0 Q-40 110 0 170 Q40 110 60 0Z', C.tomato) + P('M-34 0 Q-22 70 0 110 Q22 70 34 0Z', C.sun));
}
const caveat = (x, y, t, size, col, ex = '') => `<text x="${x}" y="${y}" font-family="Caveat, Nunito Sans, sans-serif" font-weight="700" font-size="${size}" fill="${col}" ${ex}>${t}</text>`;
const display = (x, y, t, size, col, ex = '') => `<text x="${x}" y="${y}" font-family="Bricolage Grotesque, Nunito Sans, sans-serif" font-weight="800" font-size="${size}" fill="${col}" ${ex}>${t}</text>`;
function lamp(x, sy, shade = C.grass) {
  return R(x - 30, sy - 14, 60, 14, C.ink, 7) + R(x - 5, sy - 110, 10, 100, C.ink, 5) + P(`M${x - 44} ${sy - 108} L${x - 28} ${sy - 170} H${x + 28} L${x + 44} ${sy - 108}Z`, shade);
}
function burst(cx, cy, r1, r2, k, col) { let d = ''; for (let i = 0; i < k * 2; i++) { const r = i % 2 ? r2 : r1; const a = Math.PI / k * i; d += (i ? 'L' : 'M') + n(cx + r * Math.cos(a)) + ' ' + n(cy + r * Math.sin(a)); } return P(d + 'Z', col); }
function puddle(cx, cy, rx, ry) { return E(cx, cy, rx, ry, C.sky) + E(cx - rx * 0.3, cy - ry * 0.25, rx * 0.3, ry * 0.22, C.paper, 'fill-opacity=".5"'); }
function drops(cx, cy, list) { return list.map(([dx, dy, r]) => P(`M${n(cx + dx)} ${n(cy + dy - r * 1.8)} Q${n(cx + dx + r)} ${n(cy + dy - r * 0.2)} ${n(cx + dx)} ${n(cy + dy + r)} Q${n(cx + dx - r)} ${n(cy + dy - r * 0.2)} ${n(cx + dx)} ${n(cy + dy - r * 1.8)}Z`, C.sky)).join(''); }
// pseudo-random, deterministic
let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
function shelfBooks(x, y, w, shelfBottom, cols) {
  let g = '', cx = x + 8, i = 0;
  while (cx < x + w - 30) { const bw = 20 + Math.floor(rnd() * 16), bh = 84 + Math.floor(rnd() * 34); const col = cols[i++ % cols.length];
    if (rnd() < 0.1 && cx < x + w - 70) { g += R(cx + 8, shelfBottom - bh + 6, bw, bh, col, 4, `transform="rotate(-14 ${cx + 8} ${shelfBottom})"`); cx += bw + 30; continue; }
    g += R(cx, shelfBottom - bh, bw, bh, col, 4) + R(cx + 4, shelfBottom - bh + 14, bw - 8, 6, C.paper, 3, 'fill-opacity=".5"'); cx += bw + 3; }
  return g;
}
function bookshelf(x, y, w, h, levels) {
  let g = R(x, y, w, h, C.sky, 14) + R(x + 16, y + 16, w - 32, h - 32, C.tSky, 6);
  const lh = (h - 32) / levels; const cols = [C.tomato, C.sun, C.grass, C.plum, C.ink, C.sky, C.paper];
  for (let i = 0; i < levels; i++) { const b = y + 16 + lh * (i + 1); g += shelfBooks(x + 16, y, w - 32, b - (i < levels - 1 ? 8 : 0), cols.slice(i).concat(cols.slice(0, i))); if (i < levels - 1) g += R(x + 16, b - 8, w - 32, 16, C.sky); }
  return g;
}

// ------------------------------------------------------------------ spreads (coords: 0..1632 x 0..816, gutter x=816)
const spreads = {};
spreads.s1 = () => {
  let s = SPREAD_BG(C.tSun) + R(-12, 600, 1656, 240, C.grass);
  s += windowFrame(508, 110, 236, 260, C.sky, U('sun', 650, 200, 0.62) + U('cloud', 548, 300, 0.7));
  s += E(380, 728, 300, 50, C.tomato);
  s += plant(690, 610, C.tomato);
  s += dog(140, 724, 0.82, 'dog-happy');
  s += ada({ x: 410, y: 736, s: 1.08, outfit: 'pj', face: 'face-laugh', legs: [28, -10], armL: { a: 135, b: 25 }, armR: { a: 60, b: -40 } });
  s += cabinet(1060, 480, 440, 220, C.sky);
  s += lamp(1122, 480);
  s += tabletOnPillow(1300, 480, 1.05, -5);
  s += zzz(1446, 330, 1, C.sky);
  return s;
};
spreads.s2 = () => {
  let s = R(-12, -12, 828, 840, C.tTomato) + R(816, -12, 828, 840, C.tGrass) + R(-12, 650, 828, 190, C.sun) + R(816, 650, 828, 190, C.grass);
  s += cabinet(70, 540, 210, 150, C.sky) + tabletOnPillow(175, 540, 0.56, -4) + zzz(250, 400, 0.6, C.sky);
  s += papa({ x: 520, y: 776, s: 0.94, face: 'face-smile', armL: { shh: true }, armR: { a: 20, b: 105, hold: `<use href="#cup" fill="${C.sun}" transform="translate(4 -10) scale(1.05)"/>` } });
  s += dog(975, 776, 0.9, 'dog');
  s += caveat(1050, 500, '?', 96, C.plum);
  s += ada({ x: 1290, y: 784, s: 1.3, outfit: 'pj', face: 'face-o', armL: { a: 40, b: 80 }, armR: { a: 40, b: 80 } });
  return s;
};
spreads.s3 = () => {
  let s = SPREAD_BG(C.tPlum) + R(-12, 620, 1656, 220, C.sky);
  const cols = [C.tomato, C.sun, C.grass, C.plum, C.tomato, C.sun]; const kinds = ['c', 't', 's', 'c', 't', 's'];
  for (let i = 0; i < 6; i++) s += block(530 + (i % 2 ? 4 : -4), 700 - 64 * (i + 1), cols[i], kinds[i]);
  s += block(640, 716, C.grass, 't', 0.9, 12) + block(60, 740, C.sun, 's', 0.9, -10);
  s += dog(140, 724, 0.72, 'dog');
  s += ada({ x: 350, y: 730, s: 1.05, face: 'face-smile', armL: { a: 20, b: 10 }, armR: { a: 118, b: 30, hold: `<use href="#block-c" fill="${C.plum}" transform="translate(-32 -58)"/>` } });
  s += burst(1150, 440, 190, 120, 12, C.sun);
  [[980, 300, C.tomato, 't', 30], [1090, 250, C.grass, 's', -20], [1200, 330, C.plum, 'c', 15], [1250, 230, C.tomato, 's', 40],
   [1040, 440, C.sun, 'c', -35], [1180, 470, C.tomato, 'c', 60], [1250, 520, C.grass, 't', -12], [940, 560, C.plum, 's', 22]].forEach(([x, y, c, k, r]) => s += block(x, y, c === C.sun ? C.paper : c, k, 0.95, r));
  s += block(1470, 728, C.sun, 't', 0.9, 8) + block(880, 740, C.tomato, 'c', 0.9, -14);
  s += dog(1000, 690, 0.8, 'dog-happy', false, -14);
  s += ada({ x: 1400, y: 726, s: 1.05, face: 'face-laugh', legs: [14, 14], armL: { a: 150, b: 12 }, armR: { a: 150, b: 12 } });
  return s;
};
spreads.s4 = () => {
  let s = SPREAD_BG(C.tSky);
  s += U('cloud', 560, 260, 0.9);
  // rainbow
  [C.tomato, C.sun, C.grass, C.sky, C.plum].forEach((c, i) => s += `<path d="M${520 + i * 18} 620 A${150 - i * 18} ${150 - i * 18} 0 0 1 ${820 - i * 18} 620" fill="none" stroke="${c}" stroke-width="18"/>`);
  s += R(-12, 210, 262, 380, C.tomato) + R(-12, 190, 282, 34, C.ink, 8);
  s += R(66, 380, 120, 200, C.plum, 60) + Ci(160, 480, 9, C.sun) + R(26, 250, 190, 90, C.paper, 12) + R(40, 264, 162, 62, C.sky, 6);
  s += P('M-12 570 C360 520 1220 600 1644 540 L1644 840 L-12 840Z', C.grass);
  s += R(36, 570, 170, 22, C.wash, 8);
  s += puddle(640, 724, 80, 18) + G('translate(650 716) scale(0.62)', U('duck'));
  s += ada({ x: 420, y: 716, s: 1.05, outfit: 'rain', face: 'face-smile', legs: [8, 8], armL: { a: 60, b: 40 }, armR: { a: 60, b: 40 } });
  s += puddle(930, 716, 60, 15) + puddle(1150, 740, 100, 22) + puddle(1450, 756, 172, 32);
  s += drops(930, 700, [[-40, -20, 8], [34, -24, 7]]);
  s += drops(1150, 716, [[-90, -40, 10], [-60, -80, 8], [70, -60, 9], [100, -30, 8]]);
  s += ada({ x: 1150, y: 640, s: 1.0, outfit: 'rain', face: 'face-laugh', legs: [16, 16], armL: { a: 140, b: 20 }, armR: { a: 140, b: 20 } });
  s += drops(1450, 730, [[-180, -60, 12], [-150, -120, 10], [-110, -40, 9], [120, -90, 11], [170, -50, 10], [150, -140, 9], [-40, -10, 9], [60, -12, 9]]);
  s += papa({ x: 1450, y: 724, s: 0.72, face: 'face-laugh', legs: [18, 18], armL: { a: 120, b: 30 }, armR: { a: 120, b: 30 } });
  return s;
};
spreads.s5 = () => {
  let s = SPREAD_BG(C.tSun) + R(-12, 600, 1656, 240, C.grass);
  [[30, 790, -12], [110, 760, 8], [190, 782, -12], [270, 752, 8]].forEach(([x, y, r]) => s += E(x, y, 14, 22, C.sky, `transform="rotate(${80 + r} ${x} ${y})"`));
  s += caveat(70, 700, 'tip', 34, C.tomato, 'transform="rotate(-8 70 700)"') + caveat(200, 690, 'tip', 34, C.tomato, 'transform="rotate(6 200 690)"');
  s += windowFrame(560, 110, 200, 240, C.sky, U('cloud', 600, 250, 0.6) + U('sun', 700, 150, 0.5));
  s += ada({ x: 470, y: 722, s: 1.12, outfit: 'socks', face: 'face-smile', rot: -4, legs: [10, -6], armL: { a: 70, b: 30 }, armR: { shh: true } });
  s += R(880, 668, 780, 200, C.sky, 24) + R(1247, 700, 6, 140, C.paper, 3, 'fill-opacity=".35"') + Ci(1226, 764, 10, C.sun) + Ci(1274, 764, 10, C.sun);
  s += tabletOnPillow(1250, 672, 1.4, -4);
  s += zzz(1462, 440, 1.1, C.sky);
  s += caveat(1480, 520, 'bip!', 40, C.tomato);
  return s;
};
spreads.s6 = () => {
  let s = SPREAD_BG(C.tGrass) + R(-12, 620, 1656, 220, C.sky);
  s += dog(116, 736, 0.78, 'dog');
  s += P('M270 420 L204 330 L270 324 L316 420Z', C.s3) + P('M650 420 L716 330 L650 324 L604 420Z', C.s3) + P('M300 420 L320 360 L600 360 L620 420Z', C.s3);
  s += ada({ x: 460, y: 600, s: 1.1, face: 'face-laugh', noLegs: true, armL: { a: 158, b: -18 }, armR: { a: 158, b: -18 } });
  s += R(260, 418, 400, 310, C.s2, 8) ;
  s += caveat(330, 600, '↑ this way up ↑', 34, C.s3);
  s += rocketWithCrew(1230, 724, 0.92, 0, false);
  s += starU(1180, 560, C.sun, 0.7, 12) + starU(1290, 610, C.tomato, 0.55, -8) + caveat(1186, 700, 'ADA-1', 38, C.plum);
  s += ada({ x: 1470, y: 736, s: 1.05, face: 'face-smile', armL: { toW: [1330, 560], bend: 1, hold: R(-8, -44, 16, 52, C.tomato, 7) + R(-8, -52, 16, 12, C.ink, 5) }, armR: { a: 18, b: 10 } });
  [[900, 760, C.tomato, 20], [960, 780, C.grass, -30], [1580, 780, C.plum, 50]].forEach(([x, y, c, r]) => s += R(x, y, 60, 14, c, 7, `transform="rotate(${r} ${x} ${y})"`));
  return s;
};
spreads.s7 = () => {
  let s = SPREAD_BG(C.ink);
  s += stars([[640, 470, .5, C.sun], [90, 420, .45], [420, 380, .35], [300, 560, .5, C.sun], [760, 90, .4], [1000, 330, .45, C.sun], [900, 620, .35], [1420, 380, .5], [1600, 300, .4, C.sun], [1360, 760, .35], [1560, 520, .45], [960, 740, .5, C.sun]], C.paper);
  s += dots([[200, 330, 3], [540, 520, 4], [700, 610, 3], [120, 530, 3], [880, 470, 4], [1500, 440, 3], [1060, 520, 3], [1600, 620, 3]], C.paper);
  s += U('moon', 640, 200, 1.45);
  s += Ci(170, 680, 78, C.tomato) + `<ellipse cx="170" cy="680" rx="140" ry="26" fill="none" stroke="${C.tPlum}" stroke-width="14" transform="rotate(-14 170 680)"/>` + Ci(140, 650, 12, C.tTomato, 'fill-opacity=".6"');
  // exhaust puffs
  [[330, 790, 20], [420, 770, 24], [520, 740, 28], [630, 700, 32], [750, 660, 36], [880, 620, 40]].forEach(([x, y, r]) => s += Ci(x, y, r, C.paper, 'fill-opacity=".9"'));
  // sock planet
  s += Ci(1590, 740, 150, C.plum);
  s += G('translate(1500 650) rotate(-20)', P('M0 0 H26 V40 Q26 52 40 52 H56 Q66 52 66 64 Q66 76 54 76 H22 Q0 76 0 54Z', C.sun) + R(0, 0, 26, 10, C.paper, 3));
  s += G('translate(1560 700) rotate(15)', P('M0 0 H26 V40 Q26 52 40 52 H56 Q66 52 66 64 Q66 76 54 76 H22 Q0 76 0 54Z', C.grass) + R(0, 0, 26, 10, C.paper, 3));
  s += G('translate(1470 770) rotate(-45)', P('M0 0 H26 V40 Q26 52 40 52 H56 Q66 52 66 64 Q66 76 54 76 H22 Q0 76 0 54Z', C.tomato) + R(0, 0, 26, 10, C.paper, 3));
  // comet
  s += P('M1470 190 L1590 120 L1600 136 L1480 206Z', C.paper, 'fill-opacity=".5"') + Ci(1476, 200, 20, C.sun);
  s += flames(1025, 620, 0.9, 42);
  s += rocketWithCrew(1030, 620, 0.9, 38, true);
  return s;
};
spreads.s8 = () => {
  let s = SPREAD_BG(C.tTomato);
  s += windowFrame(548, 110, 214, 250, C.sky, U('sun', 700, 180, 0.55) + U('cloud', 580, 290, 0.6));
  // utensil rail on right page, low on the wall
  s += R(1330, 236, 270, 10, C.ink, 5);
  s += R(1370, 240, 10, 90, C.sun, 5) + E(1375, 338, 20, 26, C.sun) + R(1450, 240, 10, 100, C.grass, 5) + E(1455, 352, 22, 14, C.grass) + R(1530, 240, 10, 96, C.plum, 5) + R(1516, 328, 38, 34, C.plum, 8);
  s += ada({ x: 400, y: 700, s: 1.1, face: 'face-laugh', apron: C.grass, armL: { toW: [470, 506], bend: 1, hold: '' }, armR: { toW: [545, 490], bend: -1, hold: R(-6, -70, 12, 80, C.paper, 6, 'transform="rotate(20)"') } });
  s += papa({ x: 1280, y: 808, s: 0.95, face: 'face-smile', armL: { toW: [1156, 520], bend: 1 }, armR: { a: 36, b: 60 } });
  // counter
  s += R(-12, 540, 1656, 30, C.sun) + R(-12, 570, 1656, 270, C.sky);
  [[40, 350], [420, 350], [880, 350], [1260, 350]].forEach(([x, w]) => s += R(x, 604, w, 190, C.paper, 12, 'fill-opacity=".18"') + Ci(x + w / 2, 626, 8, C.sun));
  // bowl + flour + eggs (left)
  s += P('M470 505 H650 Q646 580 560 580 Q474 580 470 505Z', C.plum) + R(462, 498, 196, 14, C.plum, 7);
  s += R(120, 404, 110, 138, C.tSky, 16) + R(110, 396, 130, 28, C.tSky, 12) + caveat(128, 488, 'flour', 38, C.sky);
  s += E(290, 526, 20, 15, C.paper) + P('M320 540 Q336 510 352 540Z', C.paper) + P('M356 540 Q372 510 388 540Z', C.paper);
  // stove + pan + pancake (right)
  s += R(960, 526, 250, 16, C.ink, 8);
  s += R(972, 506, 176, 30, C.ink, 14) + R(986, 500, 148, 10, C.tSky, 5, 'fill-opacity=".5"') + R(1140, 510, 76, 16, C.ink, 8);
  s += G('translate(1060 380) rotate(-18)', U('pancake'));
  s += line('M990 330 Q1000 300 1030 292', C.ink, 5) + line('M1120 440 Q1140 420 1130 390', C.ink, 5);
  // plate stack
  s += E(1470, 536, 110, 16, C.paper);
  for (let i = 0; i < 4; i++) s += U('pancake', 1470, 520 - i * 20, 1.2);
  s += R(1452, 436, 36, 22, C.sun, 6);
  return s;
};
spreads.s9 = () => {
  let s = R(-12, -12, 828, 840, C.tSun) + R(-12, 600, 828, 240, C.grass);
  s += cabinet(250, 480, 400, 220, C.sky);
  s += R(300, 424, 300, 58, C.paper, 29);
  s += G('translate(360 452) rotate(-90)', U('tablet-sleeping'));
  s += blanket(560, 470, 150, 96, C.tomato, C.paper, 28);
  s += zzz(560, 330, 0.9, C.sky);
  s += ada({ x: 130, y: 738, s: 1.02, face: 'face-o', armL: { a: 18, b: 12 }, armR: { shh: true } });
  // right: outside
  s += R(816, -12, 828, 840, C.tSky) + R(816, 610, 828, 230, C.grass) + R(816, 660, 828, 56, C.wash);
  s += U('sun', 1190, 236, 0.5);
  s += R(1300, 380, 344, 300, C.plum) + P('M1280 384 L1470 290 L1660 384Z', C.ink);
  for (let i = 0; i < 4; i++) s += R(1330 + i * 72, 450, 24, 200, C.paper, 6);
  s += R(1300, 392, 344, 44, C.tPlum) + display(1316, 426, 'LIBRARY', 32, C.plum, 'letter-spacing="3"');
  s += R(1406, 560, 84, 120, C.sun, 42);
  s += papa({ x: 1030, y: 720, s: 0.8, face: 'face-smile', legs: [10, -8], armL: { a: 14, b: 10, hold: R(-34, 6, 68, 76, C.sun, 10) + R(-26, -14, 10, 30, C.sun, 5) + R(16, -14, 10, 30, C.sun, 5) }, armR: { toW: [1112, 520], bend: -1 } });
  s += ada({ x: 1170, y: 724, s: 0.82, face: 'face-laugh', legs: [10, -8], armL: { toW: [1116, 528], bend: 1 }, armR: { a: 30, b: 10 } });
  return s;
};
spreads.s10 = () => {
  let s = SPREAD_BG(C.tPlum) + R(-12, 700, 1656, 140, C.plum);
  seed = 11;
  s += bookshelf(36, 236, 440, 470, 3);
  s += E(560, 760, 220, 40, C.tomato);
  s += ada({ x: 600, y: 750, s: 1.1, face: 'face-laugh', armL: { to: [-16, -140], bend: 1, hold: `<use href="#book" fill="${C.plum}" transform="translate(-30 -72) scale(0.9)"/>` + G('translate(12 -26)', Ci(0, 0, 20, C.s2) + Ci(-15, -16, 8, C.s2) + Ci(15, -16, 8, C.s2) + Ci(-7, -3, 3, C.ink) + Ci(7, -3, 3, C.ink)) }, armR: { to: [18, -130], bend: -1 } });
  s += bookshelf(1490, 236, 200, 470, 3);
  s += rosa({ x: 1210, y: 872, s: 0.95, face: 'face-smile', armR: { shh: true }, armL: { a: 20, b: 50 } });
  s += R(940, 560, 490, 26, C.paper, 8) + R(960, 586, 450, 200, C.tomato, 10) + R(990, 620, 390, 12, C.paper, 6, 'fill-opacity=".35"');
  s += bookU(1318, 480, C.sky, 0.72, 0) + R(1300, 540, 110, 22, C.grass, 5) + R(1308, 518, 96, 22, C.sun, 5);
  s += plant(1010, 560, C.sun);
  return s;
};
spreads.s11 = () => {
  let s = SPREAD_BG(C.tPlum) + R(-12, 700, 1656, 140, C.plum);
  s += windowFrame(70, 230, 240, 250, C.ink, U('moon', 230, 290, 0.7) + stars([[120, 300, .35], [170, 420, .3], [260, 400, .3]], C.sun));
  s += Ci(420, 470, 110, C.tSun);
  s += R(350, 560, 150, 150, C.sun, 14) + R(362, 612, 126, 8, C.paper, 4, 'fill-opacity=".45"') + lamp(420, 560, C.tomato);
  // chair back
  s += R(526, 470, 150, 200, C.sky, 30) + R(536, 690, 16, 30, C.ink, 6) + R(650, 690, 16, 30, C.ink, 6);
  s += papa({ x: 600, y: 780, s: 0.92, face: 'face-smile', legLen: 100, legs: [4, 4], armL: { toW: [640, 530], bend: 1 }, armR: { toW: [730, 520], bend: -1 } });
  s += G('translate(690 500) rotate(-8) scale(0.8)', U('book-open'));
  s += R(522, 600, 158, 32, C.sky, 14);
  // bed
  s += R(1520, 380, 140, 400, C.sky, 30) + R(880, 520, 40, 250, C.sky, 18);
  s += R(900, 590, 640, 120, C.paper, 16);
  s += R(1380, 470, 170, 90, C.paper, 40);
  s += ada({ x: 1420, y: 720, s: 1.05, outfit: 'pj', face: 'face-smile', noLegs: true, armL: { a: 22, b: 30 }, armR: { a: 22, b: 30 } });
  s += blanket(900, 560, 590, 150, C.tomato, C.paper);
  s += G('translate(1100 566) scale(0.72)', U('dog-lie'));
  return s;
};
spreads.s12 = () => {
  let s = SPREAD_BG(C.ink) + R(-12, 700, 1656, 140, C.plum);
  s += stars([[520, 300, .35, C.sun], [140, 560, .3], [760, 520, .3, C.sun], [1000, 380, .3], [1580, 420, .35, C.sun], [900, 300, .3], [1200, 330, .3, C.sun]], C.paper);
  s += windowFrame(70, 220, 250, 270, C.sky, U('moon', 190, 350, 0.9) + stars([[260, 280, .35], [120, 440, .3], [270, 440, .3]], C.sun));
  s += cabinet(380, 500, 360, 200, C.sky);
  s += tabletOnPillow(560, 500, 1.0, -4);
  s += zzz(670, 330, 0.8, C.sun);
  // bed
  s += R(1500, 400, 150, 380, C.sky, 30) + R(870, 540, 40, 230, C.sky, 18);
  s += R(890, 600, 630, 110, C.paper, 16);
  s += R(1320, 520, 190, 86, C.paper, 40);
  s += G('translate(1410 540) rotate(-14)', U('ada-head', 0, 0, 0.92) + U('face-sleep', 0, 0, 0.92));
  s += P('M890 604 C960 560 1080 556 1200 572 C1280 580 1330 596 1360 604 L1360 700 L890 700Z', C.tomato) + R(1300, 596, 80, 112, C.tomato, 20);
  s += R(1290, 590, 90, 22, C.paper, 11, 'fill-opacity=".35"');
  [[940, 640], [1000, 620], [1060, 660], [1130, 610], [1180, 660], [1250, 630], [1320, 670]].forEach(([x, y]) => s += Ci(x, y, 5, C.paper, 'fill-opacity=".8"'));
  s += G('translate(1010 588) scale(0.62)', U('dog-lie'));
  s += zzz(1460, 420, 0.6, C.sun);
  return s;
};

// ------------------------------------------------------------------ story text (per page)
const RF = (t, col) => `<span class="ref" style="color:${col}">${t}</span>`;
const EM = (t, col = C.tomato) => `<span class="em" style="color:${col}">${t}</span>`;
const story = [
  // [spreadKey, leftText, rightText]
  ['s1', { x: 48, y: 52, w: 430, html: `On Saturday morning, Ada zoomed downstairs to find the tablet. Her slippers were on the wrong feet. She did not care one bit.` },
         { x: 56, y: 52, w: 560, html: `But the tablet was wearing a nightcap. Its eyes were closed. And it was going…<span class="zz" style="color:${C.sky}">zzz… zzz… zzz.</span>` }],
  ['s2', { x: 48, y: 52, w: 720, html: `“The tablet is sleeping,” whispered Papa. “It worked hard all week. Today, it gets to rest.”` },
         { x: 56, y: 52, w: 720, html: `“Sleeping?” said Ada. “In the DAYTIME?”<br>“Everybody needs a rest sometimes,” said Papa.${RF('Shhh… the tablet is sleeping.<br>So what shall we do today?', C.grass)}` }],
  ['s3', { x: 48, y: 52, w: 720, html: `Ada found the blocks. One, two, three… a tower! Four, five, six… taller than Biscuit! Biscuit sat very still and watched.` },
         { x: 56, y: 52, w: 720, html: `Seven… eight… ${EM('CRASH!')} Biscuit jumped. Ada giggled. “Again!” So they built it again. And again. And AGAIN.` }],
  ['s4', { x: 48, y: 52, w: 720, html: `Outside, last night’s rain had left puddles everywhere — big ones, small ones, and one with a real duck in it! Ada pulled on her yellow boots.` },
         { x: 56, y: 48, w: 720, size: 27, html: `${EM('SPLISH', C.sky)} went the small one. ${EM('SPLASH', C.sky)} went the middle one. ${EM('SPLOOOSH', C.sky)} went the great big one — all over Papa’s shoes!<br>“Oops,” said Ada. “Oops,” said Papa… and jumped in, too.` }],
  ['s5', { x: 48, y: 52, w: 460, html: `Back inside, Ada peeled off her wet boots and tiptoed to the shelf.<br>Tip… tip… tip…` },
         { x: 56, y: 52, w: 720, html: `The tablet was still sleeping. It snored a teeny-tiny snore: zzz-bip… zzz-bip…${RF('Shhh… the tablet is sleeping.<br>So what shall we do now?', C.plum)}` }],
  ['s6', { x: 48, y: 52, w: 720, html: `In the hall sat a big, empty box.<br>“That’s not a box,” said Ada. “That’s a ${EM('ROCKET!')}”` },
         { x: 56, y: 52, w: 720, html: `She gave it round windows. She gave it red wings. She gave it a pointy top — just like the tablet’s nightcap.` }],
  ['s7', { x: 48, y: 52, w: 470, cls: 'w', html: `“Ten, nine, eight…” counted Ada. Biscuit held on tight. <span class="nw">“…three, two, ONE!”</span><span class="big" style="color:${C.sun}">WHOOOOSH!</span>` },
         { x: 56, y: 52, w: 560, cls: 'w', html: `Past the moon. Past the stars. Past a planet made entirely of socks. Biscuit was the <span class="nw">co-pilot</span>. He was very good at barking at comets.` }],
  ['s8', { x: 48, y: 52, w: 460, html: `All that flying made Ada hungry. Her tummy rumbled like a rocket.<br>“Pancakes?” asked Papa.<br>“${EM('PANCAKES!')}” said Ada.` },
         { x: 56, y: 52, w: 720, html: `Ada cracked the egg (mostly into the bowl). She stirred and stirred. Papa flipped. ${EM('Flip! Flop! Plop!')}<br>“That one looks like the moon,” said Ada.` }],
  ['s9', { x: 48, y: 52, w: 720, html: `After lunch, Ada peeked at the shelf. The tablet had rolled over, and its nightcap had flopped. But it was still sleeping.` },
         { x: 56, y: 44, w: 720, html: `${RF('Shhh… the tablet is sleeping.<br>So what shall we do now?', C.plum).replace('class="ref"', 'class="ref first"')}“Let’s go find some stories,” said Papa.` }],
  ['s10', { x: 48, y: 52, w: 720, html: `The library had books about dinosaurs, books about rockets, books about the moon, and one book about a dog in boots.` },
          { x: 56, y: 52, w: 590, size: 27, html: `“Shhh,” whispered Ms. Rosa the librarian. “Books like it quiet.”<br>“Just like the tablet!” whispered Ada. She picked a book about a bear who could not sleep.` }],
  ['s11', { x: 48, y: 52, w: 720, html: `That night, Papa read the bear book. Ada turned the pages. She did all the growly bear voices. <span class="nw">${EM('GRRR… YAWWWN.', C.plum)}</span>` },
          { x: 56, y: 52, w: 720, size: 27, html: `“What was your favorite part of today?” asked Papa. Ada thought and thought. “The crash. The splash. The rocket. The pancakes. The library…” She yawned a big bear yawn. “All of it.”` }],
  ['s12', { x: 48, y: 52, w: 720, cls: 'w', html: `Down the hall, in its cozy nightcap, the tablet slept. It had rested all day long, and it was dreaming a quiet, happy dream.` },
          { x: 56, y: 52, w: 720, cls: 'w', html: `And snug in her bed, Ada slept too.${RF('Shhh… everybody is sleeping.<br>What a good, good day.', C.sun)}` }],
];

// ------------------------------------------------------------------ single pages (coords 0..816)
function coverArt(back = false) {
  let s = PAGE_BG(C.sky) + R(-12, 664, 840, 170, C.tomato);
  if (back) return s;
  s += stars([[70, 300, .45, C.sun], [770, 300, .4, C.paper], [740, 470, .3, C.sun], [60, 470, .3, C.paper]], C.sun);
  s += cabinet(320, 560, 260, 124, C.grass, C.sun);
  s += tabletOnPillow(450, 560, 1.12, -5);
  s += zzz(590, 420, 0.9, C.sun);
  s += ada({ x: 190, y: 700, s: 1.0, face: 'face-smile', armL: { a: 16, b: 10 }, armR: { shh: true } });
  s += dog(650, 700, 0.74, 'dog', false);
  return s;
}
function endpaper(bg, col1, col2) {
  let s = PAGE_BG(bg);
  const icons = [
    (x, y) => block(x - 26, y - 26, col1, 'c', 0.8, 10),
    (x, y) => G(`translate(${x} ${y + 36}) scale(0.7) rotate(-10)`, U('boot')),
    (x, y) => starU(x, y, col2, 1.2, 8),
    (x, y) => G(`translate(${x - 10} ${y}) scale(0.5)`, U('moon')),
    (x, y) => G(`translate(${x - 6} ${y + 10}) scale(0.72)`, U('duck')),
    (x, y) => bookU(x - 28, y - 36, col1, 0.62, -8),
    (x, y) => G(`translate(${x} ${y + 40}) scale(0.16) rotate(20)`, U('rocket')),
    (x, y) => G(`translate(${x - 30} ${y - 10}) scale(0.4) rotate(-10)`, U('nightcap')),
    (x, y) => G(`translate(${x} ${y + 4}) scale(0.7)`, U('pancake')),
  ];
  let k = 0;
  for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) { const x = 62 + c * 138 + (r % 2 ? 69 : 0), y = 60 + r * 140; s += icons[(k++ * 5 + r) % icons.length](x, y); }
  return s;
}
const pages = [];
function page(vbx, art, texts = [], extra = '') {
  return `<section class="page">
<svg class="art" xmlns="http://www.w3.org/2000/svg" viewBox="${vbx} -12 840 840" width="840" height="840">${art}</svg>
${texts.map(t => `<div class="t ${t.cls || ''}" style="left:${t.x + 12}px;top:${t.y + 12}px;width:${t.w}px;${t.size ? `font-size:${t.size}px;` : ''}${t.align ? `text-align:${t.align};` : ''}">${t.html}</div>`).join('\n')}
${extra}${GUIDES ? '<div class="guide-trim"></div><div class="guide-safe"></div>' : ''}
</section>`;
}

// 1 front cover
const COVER_TEXT = [{ x: 44, y: 40, w: 728, cls: 'title', html: `The Day the<br>Tablet <span style="color:${C.sun}">Slept</span>` },
  { x: 44, y: 736, w: 728, cls: 'byline', html: `A Play Before Pixels read-aloud` }];
pages.push(page(-12, coverArt(), COVER_TEXT));
// 2 endpaper
pages.push(page(-12, endpaper(C.tSky, C.sky, C.sun)));
// 3 title page
pages.push(page(-12, PAGE_BG(C.paper) + Ci(408, 570, 200, C.tSun) + cabinet(278, 650, 260, 100, C.sky) + tabletOnPillow(408, 650, 0.9, -4) + zzz(530, 520, 0.7, C.sky),
  [{ x: 60, y: 80, w: 696, cls: 'title ink center', html: `The Day the<br>Tablet Slept` }, { x: 60, y: 272, w: 696, cls: 'sub center', html: `A Play Before Pixels read-aloud` }]));
// 4 copyright
const ISBN_BOX = `<div class="isbn" style="left:${60 + 12}px;top:${560 + 12}px"><b>ISBN / barcode</b><span>to be supplied by publisher</span></div>`;
pages.push(page(-12, PAGE_BG(C.wash) + G('translate(640 760) scale(0.7)', U('dog-lie')) + zzz(700, 640, 0.5, C.sky),
  [{ x: 60, y: 70, w: 600, cls: 'small', html: `<p><b>The Day the Tablet Slept</b></p>
<p>Text and illustrations © 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC. All rights reserved.</p>
<p>No part of this book may be reproduced, stored or transmitted in any form or by any means without written permission from the publisher, except for brief quotations in a review.</p>
<p>First edition, 2026.</p>
<p>The illustrations were drawn as flat digital art. The text is set in Fredoka, with Bricolage Grotesque and Nunito Sans.</p>
<p><b>A note for grown-ups:</b> puddle play, cooking and box-building are best enjoyed with a grown-up close by. The tablet in this story is a made-up character and is not based on any real product.</p>
<p>Published by AlphaPlay LLC, doing business as Play Before Pixels.</p>` }], ISBN_BOX));
// 5 dedication
pages.push(page(-12, PAGE_BG(C.tTomato) + rocketWithCrew(408, 700, 0.5, 0, false) + stars([[250, 560, .5, C.sun], [570, 520, .4, C.plum], [600, 640, .3, C.tomato]], C.sun),
  [{ x: 90, y: 150, w: 636, cls: 'ded center', html: `For every grown-up who ever said, “Let’s see what we can make,”<br><br>and every kid who turned a box into a rocket.` }]));
// 6-29 story
story.forEach(([k, lt, rt]) => { const art = spreads[k](); pages.push(page(-12, art, [lt])); pages.push(page(804, art, [rt])); });
// 30 talk about it
const qs = [
  ['Why do you think the tablet needed a rest? When do <i>you</i> like to rest?', C.tomato],
  ['Ada did lots of things on her day. Which one would you like to try first?', C.sun],
  ['What could a big box turn into at our house?', C.sky],
  ['What should we cook together? What will your job be?', C.grass],
  ['Point to Biscuit whenever you spot him. What is he doing?', C.plum],
  ['Let’s plan our own “tablet sleeps” day. Pick three things to do!', C.tomato],
];
pages.push(page(-12, PAGE_BG(C.tGrass) + R(-12, -12, 840, 196, C.grass) + G('translate(690 150) scale(0.42) rotate(8)', U('tablet-sleeping')) +
  block(76, 734, C.tomato, 'c', 0.66, -8) + G('translate(206 780) scale(0.5) rotate(-6)', U('boot')) + G('translate(318 782) scale(0.1) rotate(18)', U('rocket')) + G('translate(440 766) scale(0.62)', U('pancake')) + bookU(540, 728, C.plum, 0.46, 6) + dog(700, 792, 0.3, 'dog-happy'),
  [{ x: 48, y: 44, w: 600, cls: 'talk-h', html: `Talk about it` },
   { x: 48, y: 118, w: 560, cls: 'talk-sub', html: `For grown-ups: after reading, try a few of these. Pause, wait, and let your child answer. There are no wrong answers.` }],
  `<ol class="qs" style="left:${48 + 12}px;top:${214 + 12}px">${qs.map(([q, c], i) => `<li><span class="num" style="background:${c}">${i + 1}</span><span>${q}</span></li>`).join('')}</ol>
<div class="tip" style="left:${48 + 12}px;top:${628 + 12}px"><b>Read it again, and…</b> say what you see (“Biscuit is jumping!”), repeat and add one word (“Splash!” → “Big splash!”), and follow your child’s lead. Puddles, cooking and box-building are best with a grown-up close by.</div>`));
// 31 the end
pages.push(page(-12, PAGE_BG(C.tSun) + R(-12, 600, 840, 240, C.grass) + windowFrame(60, 200, 200, 230, C.sky, U('sun', 160, 300, 0.6)) +
  cabinet(400, 470, 360, 170, C.sky) + tabletOnPillow(580, 470, 0.95, 0, true) + G('translate(650 452) rotate(8) scale(0.34)', U('nightcap')) +
  line('M488 250 L468 230', C.sun, 8) + line('M580 220 L580 194', C.sun, 8) + line('M672 250 L692 230', C.sun, 8) +
  ada({ x: 290, y: 690, s: 1.0, outfit: 'pj', face: 'face-laugh', armL: { a: 20, b: 10 }, armR: { a: 150, b: 20 } }) + dog(96, 700, 0.62, 'dog-happy'),
  [{ x: 48, y: 52, w: 720, html: `In the morning, the tablet woke up and stretched. “Good morning!” said Ada. “Wait till I tell you about my day…”` },
   { x: 48, y: 700, w: 720, cls: 'end', align: 'right', html: `The End` }]));
// 32 back cover
const backArt = coverArt(true) + G('translate(96 560) scale(0.46) rotate(-6)', U('tablet-sleeping')) + zzz(210, 520, 0.5, C.sun) + dog(400, 700, 0.62, 'dog-happy') +
  stars([[740, 110, .4, C.sun], [60, 400, .3, C.paper]], C.sun);
pages.push(page(-12, backArt,
  [{ x: 60, y: 70, w: 690, cls: 'blurb', html: `<p class="blurb-h">Shhh… the tablet is sleeping.<br>So what shall we do today?</p>
<p>Ada’s tablet is taking a day off — nightcap and all. So Ada builds a tower (CRASH!), splashes every puddle, blasts off in a cardboard-box rocket, flips pancakes with Papa and finds the perfect library book.</p>
<p>A warm, funny read-aloud about a day full of play, and a tablet that simply needed a good rest. Includes “Talk about it” questions for grown-ups.</p>` },
   { x: 48, y: 736, w: 480, cls: 'backmeta', html: `Ages 3–7 · Play Before Pixels` }],
  `<div class="isbn back" style="left:${588 + 12}px;top:${664 + 12}px"><b>ISBN / barcode</b><span>2 × 1.2 in · keep clear</span></div>`));

// ------------------------------------------------------------------ html
const CSS = `
@page { size: 8.75in 8.75in; margin: 0 }
* { box-sizing: border-box }
html, body { margin: 0; padding: 0; background: #FFFFFF }
body { -webkit-print-color-adjust: exact; print-color-adjust: exact }
.page { width: 8.75in; height: 8.75in; page-break-after: always; break-after: page; overflow: hidden; position: relative; background: #FFFFFF }
.page:last-child { page-break-after: auto; break-after: auto }
.art { position: absolute; left: 0; top: 0; width: 100%; height: 100% }
.t { position: absolute; font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 500; font-size: 28px; line-height: 1.32; color: #1D2940; letter-spacing: .1px }
.t.w { color: #FFFFFF }
.t .em { font-weight: 700 }
.nw { white-space: nowrap }
.t .zz { display: block; font-weight: 700; font-size: 40px; margin-top: 6px }
.t .ref { display: block; font-weight: 600; font-size: 34px; line-height: 1.18; margin-top: 16px }
.t .ref.first { margin-top: 0; margin-bottom: 14px }
.t .big { display: block; font-family: "Bricolage Grotesque", "Nunito Sans", sans-serif; font-weight: 800; font-size: 64px; line-height: 1; margin-top: 18px; letter-spacing: -1px }
.t.title { font-family: "Bricolage Grotesque", "Nunito Sans", sans-serif; font-weight: 800; font-size: 96px; line-height: .94; letter-spacing: -2.5px; color: #FFFFFF }
.t.title.ink { color: #1D2940; font-size: 84px }
.t.center { text-align: center }
.t.sub { font-family: "Nunito Sans", sans-serif; font-weight: 800; font-size: 20px; letter-spacing: 3px; text-transform: uppercase; color: #EE5A36 }
.t.byline { font-family: "Nunito Sans", sans-serif; font-weight: 800; font-size: 22px; letter-spacing: 2.5px; text-transform: uppercase; color: #FFFFFF; text-align: center }
.t.small { font-family: "Nunito Sans", sans-serif; font-weight: 400; font-size: 15px; line-height: 1.5 }
.t.small p { margin: 0 0 10px }
.t.ded { font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 500; font-size: 34px; line-height: 1.3; color: #1D2940 }
.t.talk-h { font-family: "Bricolage Grotesque", "Nunito Sans", sans-serif; font-weight: 800; font-size: 58px; line-height: 1; color: #FFFFFF; letter-spacing: -1px }
.t.talk-sub { font-family: "Nunito Sans", sans-serif; font-weight: 600; font-size: 18px; line-height: 1.4; color: #FFFFFF }
.t.end { font-family: "Bricolage Grotesque", "Nunito Sans", sans-serif; font-weight: 800; font-size: 60px; color: #FFFFFF; letter-spacing: -1px }
.t.blurb { font-family: "Nunito Sans", sans-serif; font-weight: 500; font-size: 21px; line-height: 1.45; color: #FFFFFF }
.t.blurb p { margin: 0 0 14px }
.t.blurb .blurb-h { font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 600; font-size: 36px; line-height: 1.18; color: #F5B820; margin-bottom: 22px }
.t.backmeta { font-family: "Nunito Sans", sans-serif; font-weight: 800; font-size: 17px; letter-spacing: 2px; text-transform: uppercase; color: #FFFFFF; text-align: left }
.qs { position: absolute; width: 720px; margin: 0; padding: 0; list-style: none; font-family: "Nunito Sans", sans-serif; font-size: 19px; line-height: 1.35; color: #1D2940; font-weight: 600 }
.qs li { display: flex; align-items: center; gap: 16px; background: #FFFFFF; border-radius: 18px; padding: 11px 18px 11px 12px; margin-bottom: 10px; min-height: 58px }
.qs .num { flex: 0 0 38px; height: 38px; border-radius: 50%; color: #FFFFFF; font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 700; font-size: 21px; display: flex; align-items: center; justify-content: center }
.tip { position: absolute; width: 720px; font-family: "Nunito Sans", sans-serif; font-size: 16px; line-height: 1.45; color: #1D2940; background: #FEF4D8; border-radius: 18px; padding: 14px 20px }
.isbn { position: absolute; width: 192px; height: 115px; background: #FFFFFF; border: 2px dashed #1D2940; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: "Nunito Sans", sans-serif; color: #1D2940; text-align: center }
.isbn b { font-size: 15px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase }
.isbn span { font-size: 11.5px; margin-top: 4px }
.guide-trim { position: absolute; left: 12px; top: 12px; right: 12px; bottom: 12px; border: 1px solid rgba(255,0,0,.8); pointer-events: none }
.guide-safe { position: absolute; left: 48px; top: 48px; right: 48px; bottom: 48px; border: 1px dashed rgba(0,160,255,.9); pointer-events: none }
`;
const defs = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${SYMBOLS}</defs></svg>`;
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>The Day the Tablet Slept — Play Before Pixels (print interior + covers, 8.75 x 8.75 in with bleed)</title>
<link rel="stylesheet" href="../../brand/fonts/fonts.css">
<style>${CSS}</style></head>
<body>
${defs}
${pages.join('\n')}
</body></html>`;
fs.writeFileSync(path.join(OUT, GUIDES ? process.env.GUIDES_OUT : 'source.html'), html);

// cover.html: front cover cropped to trim (816 x 816 css px) for the store image
if (!GUIDES) {
  const coverPage = pages[0];
  fs.writeFileSync(path.join(OUT, 'cover.html'), `<!doctype html><html><head><meta charset="utf-8"><title>Cover</title>
<link rel="stylesheet" href="../../brand/fonts/fonts.css"><style>${CSS}
html,body{width:816px;height:816px;overflow:hidden} .crop{position:absolute;left:-12px;top:-12px}</style></head>
<body>${defs}<div class="crop">${coverPage}</div></body></html>`);
  // mockup.html: 1600 x 1200 product shot
  const spreadSvg = k => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1632 816" width="100%" height="100%">${spreads[k]()}</svg>`;
  const s7 = story.find(x => x[0] === 's7');
  const txt = (t, dx) => `<div class="t ${t.cls || ''}" style="left:${t.x + dx}px;top:${t.y}px;width:${t.w}px;${t.size ? `font-size:${t.size}px;` : ''}">${t.html}</div>`;
  fs.writeFileSync(path.join(OUT, 'mockup.html'), `<!doctype html><html><head><meta charset="utf-8"><title>Mockup</title>
<link rel="stylesheet" href="../../brand/fonts/fonts.css"><style>${CSS}
html,body{width:1600px;height:1200px;overflow:hidden;background:${C.wash}}
.surface{position:absolute;left:0;right:0;top:760px;bottom:0;background:${C.tSky}}
.shadow{position:absolute;border-radius:50%;background:rgba(29,41,64,.22);filter:blur(22px)}
.book{position:absolute;left:150px;top:190px;width:600px;height:600px;transform:perspective(2200px) rotateY(16deg);transform-origin:left center}
.book .face{position:absolute;inset:0;overflow:hidden;border-radius:3px 10px 10px 3px}
.book .face .crop{position:absolute;left:-12px;top:-12px;transform:scale(${600 / 816});transform-origin:12px 12px}
.book .spine{position:absolute;left:-26px;top:0;width:26px;height:600px;background:#2f6fb8;border-radius:4px 0 0 4px}
.book .pages{position:absolute;right:-12px;top:6px;width:12px;height:588px;background:#fff;border-radius:0 4px 4px 0}
.open{position:absolute;left:790px;top:600px;width:720px;height:360px;transform:perspective(2400px) rotateX(24deg) rotateZ(-3deg);transform-origin:center bottom}
.open .rim{position:absolute;left:-10px;top:-6px;right:-10px;bottom:-10px;background:#FFFFFF;border-radius:10px}
.open .sheet{position:absolute;inset:0;overflow:hidden;border-radius:4px}
.open .sheet .inner{position:absolute;left:0;top:0;width:1632px;height:816px;transform:scale(${720 / 1632});transform-origin:0 0}
.open .gut{position:absolute;left:356px;top:0;width:8px;height:360px;background:rgba(29,41,64,.14)}
.tag{position:absolute;left:830px;top:250px;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:64px;line-height:1;color:${C.ink};letter-spacing:-1.5px}
.tag small{display:block;font-family:"Nunito Sans",sans-serif;font-weight:700;font-size:24px;letter-spacing:.5px;color:${C.tomato};margin-top:18px}
.tag .pill{display:inline-block;margin-top:22px;font-family:"Nunito Sans",sans-serif;font-weight:800;font-size:18px;letter-spacing:2px;text-transform:uppercase;background:${C.sun};color:${C.ink};padding:10px 18px;border-radius:30px}
</style></head><body>${defs}
<div class="surface"></div>
<div class="shadow" style="left:170px;top:760px;width:640px;height:70px"></div>
<div class="shadow" style="left:800px;top:900px;width:720px;height:70px"></div>
<div class="book"><div class="spine"></div><div class="face"><div class="crop">${coverPage}</div></div><div class="pages"></div></div>
<div class="tag">A read-aloud about<br>a very sleepy tablet<small>32-page picture book · ages 3–7</small><span class="pill">Play Before Pixels</span></div>
<div class="open"><div class="rim"></div><div class="sheet"><div class="inner">${spreadSvg('s7')}${txt(s7[1], 0)}${txt(s7[2], 816)}</div></div><div class="gut"></div></div>
</body></html>`);
}
// cover-wrap.html: one-piece paperback cover (back | spine | front) for printers that want a wrap file.
// SPINE_IN must be recalculated from the printer's own calculator for the final paper and page count.
if (!GUIDES) {
  const SPINE_IN = 0.075; const sp = SPINE_IN * 96; const W = 828 * 2 + sp;
  fs.writeFileSync(path.join(OUT, 'cover-wrap.html'), `<!doctype html><html><head><meta charset="utf-8"><title>Cover wrap</title>
<link rel="stylesheet" href="../../brand/fonts/fonts.css"><style>${CSS}
@page { size: ${(W / 96).toFixed(4)}in 8.75in; margin: 0 }
html,body{width:${W}px;height:840px;overflow:hidden}
.wrap{position:relative;width:${W}px;height:840px;overflow:hidden}
.part{position:absolute;top:0;height:840px;overflow:hidden}
.part .page{position:absolute;top:0}
</style></head><body>${defs}<div class="wrap">
<div class="part" style="left:0;width:828px">${pages[31].replace('<section class="page">', '<section class="page" style="left:0">')}</div>
<div class="part" style="left:828px;width:${sp}px;background:${C.sky}"></div>
<div class="part" style="left:${828 + sp}px;width:828px">${pages[0].replace('<section class="page">', '<section class="page" style="left:-12px">')}</div>
</div></body></html>`);
}
console.log('pages:', pages.length);
