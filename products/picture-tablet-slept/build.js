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
// ------------------------------------------------------------------ words: WORDS.md is the founder's file (human authorship)
const QR = JSON.parse(fs.readFileSync(path.join(OUT, 'qr.json'), 'utf8'));
const BONUS = 'playbeforepixels.com/bonus/picture-tablet-slept';
const LOGO = (f, w) => fs.readFileSync(path.join(OUT, '../../brand/logo', f), 'utf8').replace(/<title>[\s\S]*?<\/title>/, '').replace(/ width="[\d.]+" height="[\d.]+"/, ` width="${w}"`);
function readWords() {
  const src = fs.readFileSync(path.join(OUT, 'WORDS.md'), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  const out = {}; let key = null;
  src.split('\n').forEach(l => { const m = l.match(/^##\s+(.+?)\s*$/); if (m) { key = m[1].trim(); out[key] = []; } else if (key) out[key].push(l); });
  for (const k in out) out[k] = out[k].join('\n').trim();
  return out;
}
const WORDS = readWords();
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function md(text, o = {}) {
  const em = o.em || C.tomato;
  const inline = t => esc(t).replace(/\[\[(.+?)\]\]/g, '<span class="nw">$1</span>').replace(/\*\*(.+?)\*\*/g, `<span class="em" style="color:${em}">$1</span>`);
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  let html = '', ref = [];
  const flush = () => { if (ref.length) { html += `<span class="ref${html ? '' : ' first'}" style="color:${o.ref || C.grass}">${ref.map(inline).join('<br>')}</span>`; ref = []; } };
  lines.forEach(l => {
    if (l.startsWith('>')) { ref.push(l.replace(/^>\s*/, '')); return; }
    flush();
    const big = l.match(/^==(.+)==$/);
    if (big) html += `<span class="${o.bigCls || 'big'}" style="color:${o.bigCol || C.sun}">${inline(big[1])}</span>`;
    else html += `<span class="ln">${inline(l)}</span>`;
  });
  flush();
  return html;
}
function need(k) { if (!(k in WORDS)) throw new Error(`WORDS.md is missing the section "## ${k}"`); return WORDS[k]; }

// per-page text box (trim coords) and colors; the words come from WORDS.md
const LAYOUT = {
  s1: [{ x: 48, y: 52, w: 430 }, { x: 56, y: 52, w: 560, bigCls: 'zz', bigCol: C.sky }],
  s2: [{ x: 48, y: 52, w: 700 }, { x: 56, y: 52, w: 700, ref: C.grass }],
  s3: [{ x: 48, y: 52, w: 700 }, { x: 56, y: 52, w: 700 }],
  s4: [{ x: 48, y: 52, w: 700 }, { x: 56, y: 48, w: 700, size: 27, em: C.sky }],
  s5: [{ x: 48, y: 52, w: 460 }, { x: 56, y: 52, w: 700, ref: C.plum }],
  s6: [{ x: 48, y: 52, w: 700 }, { x: 56, y: 52, w: 700 }],
  s7: [{ x: 48, y: 52, w: 470, cls: 'w', em: C.sun }, { x: 56, y: 52, w: 560, cls: 'w' }],
  s8: [{ x: 48, y: 52, w: 460 }, { x: 56, y: 52, w: 700 }],
  s9: [{ x: 48, y: 52, w: 700 }, { x: 56, y: 44, w: 700, ref: C.plum }],
  s10: [{ x: 48, y: 52, w: 700 }, { x: 56, y: 52, w: 590, size: 27 }],
  s11: [{ x: 48, y: 52, w: 700, em: C.plum }, { x: 56, y: 52, w: 700, size: 27 }],
  s12: [{ x: 48, y: 52, w: 700, cls: 'w' }, { x: 56, y: 52, w: 700, cls: 'w', ref: C.sun }],
};
const box = (k, L) => ({ ...L, html: md(need(k), L) });

// ------------------------------------------------------------------ interior pages (KDP / IngramSpark: trim 8.5 x 8.5, bleed top, bottom and outside edge only)
// Even pages are left-hand pages (bleed on the left); odd pages are right-hand pages (bleed on the right). 96 px = 1 in.
const PW = 828, PH = 840;
function page(no, art, texts = [], extra = () => '', spread = false) {
  const side = no % 2 ? 'R' : 'L';
  const vbx = spread ? (side === 'L' ? -12 : 816) : (side === 'L' ? -12 : 0);
  const off = side === 'L' ? 12 : 0; // trim-left edge, in page px
  const trimL = off, safe = 36;
  return `<section class="page ${side}" data-page="${no}">
<svg class="art" xmlns="http://www.w3.org/2000/svg" viewBox="${vbx} -12 ${PW} ${PH}" width="${PW}" height="${PH}">${art}</svg>
${texts.map(t => `<div class="t ${t.cls || ''}" style="left:${t.x + off}px;top:${t.y + 12}px;width:${t.w}px;${t.size ? `font-size:${t.size}px;` : ''}${t.align ? `text-align:${t.align};` : ''}">${t.html}</div>`).join('\n')}
${extra(off)}${GUIDES ? `<div class="guide" style="left:${trimL}px;top:12px;width:816px;height:816px;border:1px solid red"></div><div class="guide" style="left:${trimL + safe}px;top:${12 + safe}px;width:${816 - 2 * safe}px;height:${816 - 2 * safe}px;border:1px dashed #09f"></div>` : ''}
</section>`;
}
const slot = (x, y, w, h, title, body) => off => `<div class="slot" style="left:${x + off}px;top:${y + 12}px;width:${w}px;height:${h}px"><b>${title}</b><span>${body}</span></div>`;
const both = (...fs) => off => fs.map(f => f(off)).join('');

const pages = [];
// p1 (R) title page
const authorLine = need('author');
pages.push(page(1, PAGE_BG(C.paper) + Ci(408, 610, 220, C.tSun) + rocketWithCrew(196, 760, 0.42, -8, false) + starU(120, 520, C.sun, 0.6, 10) + starU(300, 470, C.tomato, 0.45, -8) +
  ada({ x: 420, y: 760, s: 0.95, face: 'face-laugh', armL: { a: 16, b: 10 }, armR: { a: 150, b: 20 } }) + dog(560, 760, 0.62, 'dog-happy') + R(-12, 760, 840, 80, C.tSky),
  [{ x: 60, y: 76, w: 696, cls: 'title ink center', html: `The Day the<br>Tablet Slept` },
   { x: 60, y: 268, w: 696, cls: 'sub center', html: `A Play Before Pixels read-aloud` },
   ...(authorLine ? [{ x: 60, y: 304, w: 696, cls: 'author center', html: esc(authorLine) }] : [])]));
// p2 (L) copyright
const ISBN_BOX = off => `<div class="isbn" style="left:${60 + off}px;top:${566 + 12}px"><b>ISBN / barcode</b><span>paperback and hardcover ISBNs<br>to be added by the publisher</span></div>`;
pages.push(page(2, PAGE_BG(C.wash) + G('translate(650 740) scale(0.66)', U('dog-lie')) + zzz(700, 630, 0.5, C.sky),
  [{ x: 60, y: 64, w: 640, cls: 'small', html: `<p><b>The Day the Tablet Slept</b></p>
<p>© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC. All rights reserved.</p>
<p>No part of this book may be reproduced, stored or transmitted in any form or by any means without written permission from the publisher, except for brief quotations in a review.</p>
<p>First edition, 2026. Paperback and hardcover.</p>
<p>The illustrations are flat digital art. The text is set in Fredoka, with Bricolage Grotesque and Nunito Sans.</p>
<p><b>A note for grown-ups:</b> puddle play, cooking and box-building are best enjoyed with a grown-up close by. The tablet in this story is a made-up character and is not based on any real product.</p>
<p><b>Free Play Day planner</b> for grown-ups to print: ${BONUS}</p>
<p>Published by AlphaPlay LLC, doing business as Play Before Pixels · playbeforepixels.com</p>` }],
  both(ISBN_BOX, off => `<div class="logo" style="left:${60 + off}px;top:${712 + 12}px;width:210px">${LOGO('lockup-horizontal.svg', 210)}</div>`)));
// p3 (R) dedication (founder writes it)
const ded = need('dedication');
pages.push(page(3, PAGE_BG(C.tTomato) + rocketWithCrew(408, 730, 0.5, 0, false) + stars([[250, 590, .5, C.sun], [570, 550, .4, C.plum], [600, 670, .3, C.tomato]], C.sun),
  ded ? [{ x: 90, y: 130, w: 636, cls: 'ded center', html: md(ded) }] : [],
  ded ? () => '' : slot(90, 110, 636, 300, 'Founder writes this page', 'Your dedication, in your own words.<br>Type it under <i>## dedication</i> in WORDS.md, then rebuild.<br>This box disappears once you do.')));
// p4-p27 story spreads
Object.keys(LAYOUT).forEach((k, i) => {
  const art = spreads[k](); const [L, Rt] = LAYOUT[k]; const no = 4 + i * 2;
  pages.push(page(no, art, [box(`${k} left`, L)], undefined, true));
  pages.push(page(no + 1, art, [box(`${k} right`, Rt)], undefined, true));
});
// p28 (L) morning
pages.push(page(28, PAGE_BG(C.tSun) + R(-12, 610, 840, 240, C.grass) + windowFrame(60, 250, 190, 220, C.sky, U('sun', 155, 340, 0.55)) +
  cabinet(400, 490, 360, 160, C.sky) + tabletOnPillow(580, 490, 0.95, 0, true) + G('translate(650 472) rotate(8) scale(0.34)', U('nightcap')) +
  line('M488 270 L468 250', C.sun, 8) + line('M580 240 L580 214', C.sun, 8) + line('M672 270 L692 250', C.sun, 8) +
  ada({ x: 300, y: 700, s: 1.0, outfit: 'pj', face: 'face-laugh', armL: { a: 20, b: 10 }, armR: { a: 150, b: 20 } }) + dog(100, 710, 0.62, 'dog-happy'),
  [{ ...box('morning', { x: 48, y: 44, w: 720 }) }, { x: 48, y: 700, w: 720, cls: 'end', align: 'right', html: `The End` }]));
// p29 (R) talk about it
const qs = [
  ['Why do you think the tablet was so sleepy? When do <i>you</i> like to rest?', C.tomato],
  ['Crash, splash, rocket, pancakes, library… which part would you pick?', C.sun],
  ['What could a big box turn into at our house?', C.sky],
  ['Say the sleepy part with me: “Shhh…” What does Biscuit say?', C.grass],
  ['What should we cook together? What will your job be?', C.plum],
  ['Let’s plan our own Play Day. Pick three things to do!', C.tomato],
];
pages.push(page(29, PAGE_BG(C.tGrass) + R(-12, -12, 840, 196, C.grass) + G('translate(690 150) scale(0.42) rotate(8)', U('tablet-sleeping')) +
  block(76, 734, C.tomato, 'c', 0.66, -8) + G('translate(206 780) scale(0.5) rotate(-6)', U('boot')) + G('translate(318 782) scale(0.1) rotate(18)', U('rocket')) + G('translate(440 766) scale(0.62)', U('pancake')) + bookU(540, 728, C.plum, 0.46, 6) + dog(700, 780, 0.3, 'dog-happy'),
  [{ x: 48, y: 44, w: 600, cls: 'talk-h', html: `Talk about it` },
   { x: 48, y: 118, w: 560, cls: 'talk-sub', html: `For grown-ups: after reading, try a few of these. Pause, wait, and let your child answer. There are no wrong answers.` }],
  off => `<ol class="qs" style="left:${48 + off}px;top:${214 + 12}px">${qs.map(([q, c], i) => `<li><span class="num" style="background:${c}">${i + 1}</span><span>${q}</span></li>`).join('')}</ol>
<div class="tip" style="left:${48 + off}px;top:${620 + 12}px"><b>Read it again, and…</b> say what you see (“Biscuit is jumping!”), repeat and add one word (“Splash!” → “Big splash!”), and follow your child’s lead. Let them shout the “Shhh…” and the “WOOF!”</div>`));
// p30 (L) plan your own play day + bonus QR
const qrSvg = (px, col = C.ink) => `<svg viewBox="-2 -2 ${QR.n + 4} ${QR.n + 4}" width="${px}" height="${px}" shape-rendering="crispEdges"><rect x="-2" y="-2" width="${QR.n + 4}" height="${QR.n + 4}" fill="#fff"/><path d="${QR.d}" fill="${col}"/></svg>`;
const planRow = (y, label, icon, col) => G('', R(48, y, 720, 118, C.paper, 22) + R(48, y, 150, 118, col, 22) + R(150, y, 48, 118, col) + icon + R(250, y + 84, 470, 4, C.tSky, 2));
pages.push(page(30, PAGE_BG(C.tSky) + R(-12, -12, 840, 180, C.sky) +
  planRow(200, 'Morning', U('sun', 123, 259, 0.42), C.tSun) +
  planRow(334, 'Afternoon', G('translate(123 312) scale(0.17)', U('rocket')), C.tTomato) +
  planRow(468, 'Bedtime', G('translate(99 232) scale(0.42)', '') + U('moon', 118, 527, 0.62), C.tPlum) +
  R(48, 612, 720, 168, C.paper, 22) + dog(724, 176, 0.36, 'dog-happy'),
  [{ x: 48, y: 40, w: 640, cls: 'talk-h', html: `Plan your own Play Day` },
   { x: 48, y: 108, w: 620, cls: 'talk-sub', html: `Draw or write one thing for each part of the day. Then do it together!` },
   { x: 230, y: 212, w: 500, cls: 'plan', html: `Morning` }, { x: 230, y: 346, w: 500, cls: 'plan', html: `Afternoon` }, { x: 230, y: 480, w: 500, cls: 'plan', html: `Bedtime story` }],
  off => `<div class="qr" style="left:${70 + off}px;top:${630 + 12}px">${qrSvg(132)}</div>
<div class="bonus" style="left:${226 + off}px;top:${630 + 12}px"><b>Free for grown-ups:</b> a printable Play Day planner and coloring pages. Scan the code or visit<br><span class="url">${BONUS}</span><br><span class="pair">Want more ideas? This story pairs with <i>100 Screen-Free Plays</i>.</span></div>`));
// p31 (R) a note from the author (founder writes it)
const note = need('note');
pages.push(page(31, PAGE_BG(C.tSun) + R(-12, 650, 840, 200, C.paper) + G('translate(640 600) scale(0.5)', U('dog-lie')),
  [{ x: 60, y: 60, w: 696, cls: 'talk-h ink', html: `A note from the author` }, ...(note ? [{ x: 60, y: 150, w: 660, cls: 'note', html: md(note) }] : [])],
  both(note ? () => '' : slot(60, 150, 696, 360, 'Founder writes this page', 'A short note in your own voice (60–120 words): why you wrote this story.<br>Type it under <i>## note</i> in WORDS.md, then rebuild.<br>Keep it about play, reading and family time. No health claims.'),
    off => `<div class="logo" style="left:${258 + off}px;top:${680 + 12}px;width:300px">${LOGO('lockup-horizontal.svg', 300)}</div><div class="t tag center" style="left:${60 + off}px;top:${764 + 12}px;width:696px">Books and printables for talking and playing together · playbeforepixels.com</div>`)));
// p32 (L) endpaper
pages.push(page(32, endpaper(C.tSky, C.sky, C.sun)));
if (pages.length !== 32) throw new Error('expected 32 interior pages, got ' + pages.length);

// ------------------------------------------------------------------ covers (art in trim coords 0..816; backgrounds oversized for bleed and hardcover wrap)
function frontCover() {
  let s = R(-200, -200, 1216, 1216, C.sky) + R(-200, 700, 1216, 520, C.grass);
  s += stars([[60, 330, .45, C.sun], [770, 300, .4], [520, 300, .3, C.sun], [40, 560, .3], [600, 420, .35, C.paper]], C.paper);
  // speed lines + smoke
  [[40, 470, 90], [20, 540, 120], [60, 610, 80]].forEach(([x, y, w]) => s += R(x, y, w, 16, C.paper, 8, 'fill-opacity=".55"'));
  // tablet, asleep on its shelf (small, the running joke)
  s += cabinet(598, 604, 180, 96, C.plum, C.sun) + tabletOnPillow(688, 604, 0.7, -5) + zzz(716, 398, 0.55, C.sun);
  // the box rocket, with Ada and Biscuit on board
  let r = flames(318, 668, 0.62, 0);
  r += Ci(250, 780, 34, C.paper) + Ci(318, 792, 40, C.paper) + Ci(390, 780, 34, C.paper) + Ci(200, 792, 22, C.paper) + Ci(440, 794, 22, C.paper);
  r += P('M176 470 L118 392 L186 386 L222 470Z', C.s3) + P('M460 470 L518 392 L450 386 L414 470Z', C.s3) + R(176, 452, 284, 30, C.s3, 4);
  r += dog(170, 520, 0.6, 'dog-happy');
  r += ada({ x: 356, y: 668, s: 0.98, face: 'face-laugh', noLegs: true, armL: { a: 150, b: -14 }, armR: { a: 158, b: -20 } });
  r += P('M180 560 L108 676 L180 660Z', C.tomato) + P('M456 560 L528 676 L456 660Z', C.tomato);
  r += R(168, 470, 300, 200, C.s2, 10) + R(168, 504, 300, 20, C.sun);
  r += Ci(240, 596, 38, C.paper) + Ci(240, 596, 29, C.tSky) + caveat(302, 620, 'ADA-1', 46, C.plum);
  r += line('M430 548 L446 548', C.s3, 4) + line('M190 646 L204 646', C.s3, 4);
  s += G('rotate(-6 318 570)', r);
  return s;
}
const FRONT_TEXT = [{ x: 44, y: 40, w: 728, cls: 'title', html: `The Day the<br>Tablet <span style="color:${C.sun}">Slept</span>` },
  { x: 48, y: 244, w: 600, cls: 'byline', html: authorLine ? `${esc(authorLine)} · A Play Before Pixels read-aloud` : `A Play Before Pixels read-aloud` }];
function backCover() {
  let s = R(-200, -200, 1216, 1216, C.sky) + R(-200, 700, 1216, 520, C.grass);
  s += stars([[740, 90, .4, C.sun], [470, 560, .3, C.paper], [700, 520, .3, C.sun]], C.sun);
  s += dog(340, 700, 0.56, 'dog-happy') + G('translate(470 616) scale(0.13) rotate(10)', U('rocket'));
  return s;
}
const BACK_TEXT = [{ x: 56, y: 60, w: 690, cls: 'blurb', html: `<p class="blurb-h">Shhh… the tablet is sleeping.<br>So what shall we do?</p>
<p>Build a tower (CRASH!). Splash every puddle. Blast off in a cardboard-box rocket with Biscuit the dog as co-pilot. Flip pancakes with Papa, then find the perfect bedtime book.</p>
<p>A funny, cozy read-aloud with a refrain kids love to join in on, and one very sleepy tablet in a nightcap. With “Talk about it” questions and a Play Day planner for grown-ups.</p>` },
  { x: 56, y: 640, w: 300, cls: 'backmeta', html: `Picture book · Ages 3–7` }];
const BACK_EXTRA = `<div class="logo" style="left:56px;top:722px;width:220px">${LOGO('lockup-horizontal-white.svg', 220)}</div>
<div class="isbn back" style="left:588px;top:664px"><b>ISBN / barcode</b><span>2 × 1.2 in · keep clear</span></div>`;
// A canvas whose origin is trim (0,0); panel shows art from (ax, ay).
function canvas(art, texts, extra, ax, ay) {
  return `<div class="canvas" style="left:${-ax - 200}px;top:${-ay - 200}px">
<svg class="art" xmlns="http://www.w3.org/2000/svg" viewBox="-200 -200 1216 1216" width="1216" height="1216">${art}</svg>
<div class="inner">${texts.map(t => `<div class="t ${t.cls || ''}" style="left:${t.x}px;top:${t.y}px;width:${t.w}px;">${t.html}</div>`).join('')}${extra}</div></div>`;
}
const panel = (x, y, w, h, inner, bg = '') => `<div class="panel" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;${bg ? `background:${bg}` : ''}">${inner}</div>`;
const FRONT = (ax, ay) => canvas(frontCover(), FRONT_TEXT, '', ax, ay);
const BACK = (ax, ay) => canvas(backCover(), BACK_TEXT, BACK_EXTRA, ax, ay);
const spine = (x, y, w, h, grassTop) => panel(x, y, w, h, `<div style="position:absolute;left:0;right:0;top:${grassTop}px;bottom:0;background:${C.grass}"></div>`, C.sky);

// KDP paperback wrap: bleed 0.125 | back 8.5 | spine | front 8.5 | bleed 0.125; height 8.75. Spine = pages x 0.002347 in (premium color) [VERIFY in KDP's cover calculator].
const KDP_SPINE_IN = +(process.env.KDP_SPINE_IN || (32 * 0.002347).toFixed(4));
// IngramSpark case laminate: wrap 0.625 | board (trim - 0.185) | hinge 0.5 | spine | hinge 0.5 | board | wrap 0.625; height 0.625 + (trim + 0.25) + 0.625.
// Spine width for case laminate comes from IngramSpark's Cover Template Generator only; 0.25 in is a placeholder [VERIFY].
const HC_SPINE_IN = +(process.env.HC_SPINE_IN || 0.25);
function wrapHtml(kind) {
  let W, H, body = '', guides = '';
  if (kind === 'kdp') {
    const sp = KDP_SPINE_IN * 96; W = 828 * 2 + sp; H = 840;
    body = panel(0, 0, 828, 840, BACK(-12, -12)) + spine(828, 0, sp, 840, 712) + panel(828 + sp, 0, 828, 840, FRONT(0, -12));
    guides = [[12, 12, 816, 816], [828 + sp, 12, 816, 816]].map(([x, y, w, h]) => `<div class="guide" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border:1px solid red"></div>`).join('') +
      `<div class="guide" style="left:828px;top:0;width:${sp}px;height:840px;border-left:1px dashed #09f;border-right:1px dashed #09f"></div>`;
  } else {
    const wrap = 60, board = 8.315 * 96, hinge = 48, sp = HC_SPINE_IN * 96, bh = 840; W = 2 * (wrap + board + hinge) + sp; H = wrap * 2 + bh;
    const half = wrap + board + hinge;
    // board shows trim x 9..807 (centered), y -12..828
    body = panel(0, 0, half, H, BACK(9 - wrap, -12 - wrap)) + spine(half, 0, sp, H, wrap + 712) + panel(half + sp, 0, half, H, FRONT(9 - hinge, -12 - wrap));
    guides = [[wrap, wrap, board, bh], [half + sp + hinge, wrap, board, bh]].map(([x, y, w, h]) => `<div class="guide" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border:1px solid red"></div>`).join('') +
      `<div class="guide" style="left:${wrap + board}px;top:0;width:${2 * hinge + sp}px;height:${H}px;border-left:1px dashed #09f;border-right:1px dashed #09f;background:rgba(0,150,255,.08)"></div>`;
  }
  return { W, H, html: (g) => `<!doctype html><html><head><meta charset="utf-8"><title>${kind === 'kdp' ? 'KDP paperback cover' : 'IngramSpark case laminate cover'}</title>
<link rel="stylesheet" href="../../brand/fonts/fonts.css"><style>${CSS}
@page { size: ${(W / 96).toFixed(4)}in ${(H / 96).toFixed(4)}in; margin: 0 }
html,body{width:${W}px;height:${H}px;overflow:hidden}
</style></head><body>${defs}<div class="wrap" style="width:${W}px;height:${H}px">${body}${g ? guides : ''}</div></body></html>` };
}

// ------------------------------------------------------------------ html
const CSS = `
@page { size: 8.625in 8.75in; margin: 0 }
* { box-sizing: border-box }
html, body { margin: 0; padding: 0; background: #FFFFFF }
body { -webkit-print-color-adjust: exact; print-color-adjust: exact }
.page { width: 8.625in; height: 8.75in; page-break-after: always; break-after: page; overflow: hidden; position: relative; background: #FFFFFF }
.page:last-child { page-break-after: auto; break-after: auto }
.art { position: absolute; left: 0; top: 0 }
.page .art { width: 100%; height: 100% }
.t { position: absolute; font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 500; font-size: 28px; line-height: 1.32; color: #1D2940; letter-spacing: .1px }
.t .ln { display: block }
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
.t.author { font-family: "Nunito Sans", sans-serif; font-weight: 700; font-size: 22px; color: #1D2940 }
.t.byline { font-family: "Nunito Sans", sans-serif; font-weight: 800; font-size: 19px; letter-spacing: 2.5px; text-transform: uppercase; color: #FFFFFF }
.t.small { font-family: "Nunito Sans", sans-serif; font-weight: 400; font-size: 15px; line-height: 1.5 }
.t.small p { margin: 0 0 9px }
.t.ded { font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 500; font-size: 34px; line-height: 1.3; color: #1D2940 }
.t.note { font-family: "Nunito Sans", sans-serif; font-weight: 500; font-size: 21px; line-height: 1.5 }
.t.talk-h { font-family: "Bricolage Grotesque", "Nunito Sans", sans-serif; font-weight: 800; font-size: 56px; line-height: 1; color: #FFFFFF; letter-spacing: -1px }
.t.talk-h.ink { color: #1D2940; font-size: 50px }
.t.talk-sub { font-family: "Nunito Sans", sans-serif; font-weight: 600; font-size: 18px; line-height: 1.4; color: #FFFFFF }
.t.plan { font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 600; font-size: 30px; color: #1D2940 }
.t.tag { font-family: "Nunito Sans", sans-serif; font-weight: 700; font-size: 14px; letter-spacing: .5px; color: #1D2940 }
.t.end { font-family: "Bricolage Grotesque", "Nunito Sans", sans-serif; font-weight: 800; font-size: 60px; color: #FFFFFF; letter-spacing: -1px }
.t.blurb { font-family: "Nunito Sans", sans-serif; font-weight: 500; font-size: 21px; line-height: 1.45; color: #FFFFFF }
.t.blurb p { margin: 0 0 14px }
.t.blurb .blurb-h { font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 600; font-size: 38px; line-height: 1.16; color: #F5B820; margin-bottom: 22px }
.t.backmeta { font-family: "Nunito Sans", sans-serif; font-weight: 800; font-size: 16px; letter-spacing: 2px; text-transform: uppercase; color: #FFFFFF }
.qs { position: absolute; width: 720px; margin: 0; padding: 0; list-style: none; font-family: "Nunito Sans", sans-serif; font-size: 19px; line-height: 1.35; color: #1D2940; font-weight: 600 }
.qs li { display: flex; align-items: center; gap: 16px; background: #FFFFFF; border-radius: 18px; padding: 10px 18px 10px 12px; margin-bottom: 9px; min-height: 56px }
.qs .num { flex: 0 0 38px; height: 38px; border-radius: 50%; color: #FFFFFF; font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 700; font-size: 21px; display: flex; align-items: center; justify-content: center }
.tip { position: absolute; width: 720px; font-family: "Nunito Sans", sans-serif; font-size: 16px; line-height: 1.45; color: #1D2940; background: #FEF4D8; border-radius: 18px; padding: 14px 20px }
.qr { position: absolute; width: 132px; height: 132px }
.qr svg { display: block }
.bonus { position: absolute; width: 520px; font-family: "Nunito Sans", sans-serif; font-size: 17px; line-height: 1.45; color: #1D2940 }
.bonus .url { font-weight: 800; color: #3D86D8; font-size: 16px }
.bonus .pair { display: inline-block; margin-top: 8px; font-size: 15px; color: #1D2940 }
.logo { position: absolute }
.logo svg { display: block; width: 100%; height: auto }
.slot { position: absolute; border: 3px dashed #EE5A36; border-radius: 18px; background: rgba(255,255,255,.85); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; font-family: "Nunito Sans", sans-serif; color: #1D2940 }
.slot b { font-size: 20px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #EE5A36; margin-bottom: 10px }
.slot span { font-size: 17px; line-height: 1.5 }
.isbn { position: absolute; width: 192px; height: 115px; background: #FFFFFF; border: 2px dashed #1D2940; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: "Nunito Sans", sans-serif; color: #1D2940; text-align: center }
.isbn b { font-size: 15px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase }
.isbn span { font-size: 11.5px; margin-top: 4px; line-height: 1.3 }
.panel { position: absolute; overflow: hidden }
.canvas { position: absolute; width: 1216px; height: 1216px }
.canvas .inner { position: absolute; left: 200px; top: 200px; width: 816px; height: 816px }
.guide { position: absolute; pointer-events: none; z-index: 9 }
`;
const defs = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${SYMBOLS}</defs></svg>`;
const doc = (title, body, css = '') => `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${title}</title>
<link rel="stylesheet" href="../../brand/fonts/fonts.css">
<style>${CSS}${css}</style></head>
<body>
${defs}
${body}
</body></html>`;
const w = (f, s) => fs.writeFileSync(path.join(OUT, f), s);
if (GUIDES) {
  w('_guides.html', doc('guides', pages.join('\n')));
  w('_cover-kdp-guides.html', wrapHtml('kdp').html(true));
  w('_cover-hc-guides.html', wrapHtml('hc').html(true));
  console.log('guides written'); process.exit(0);
}
w('source.html', doc('The Day the Tablet Slept: interior, 32 pages, 8.625 x 8.75 in (8.5 x 8.5 trim + bleed on top, bottom and outside edge)', pages.join('\n')));
// review file: facing pages side by side (checks that every spread meets cleanly at the gutter)
const pairs = [[1]]; for (let i = 2; i <= 32; i += 2) pairs.push(i < 32 ? [i, i + 1] : [i]);
w('spreads.html', doc('Spreads (review only)', pairs.map(p => `<div class="spread" style="display:flex;justify-content:${p[0] === 1 ? 'flex-end' : 'flex-start'};width:1656px">${p.map(n => pages[n - 1].replace('class="page', 'style="page-break-after:auto" class="page')).join('')}</div>`).join('\n'),
  `.spread{margin:0 0 0 0}`));
const kdp = wrapHtml('kdp'), hc = wrapHtml('hc');
w('cover-kdp-paperback.html', kdp.html(false));
w('cover-ingramspark-hardcover.html', hc.html(false));
w('cover.html', `<!doctype html><html><head><meta charset="utf-8"><title>Cover</title><link rel="stylesheet" href="../../brand/fonts/fonts.css"><style>${CSS}
html,body{width:816px;height:816px;overflow:hidden}</style></head><body>${defs}${panel(0, 0, 816, 816, FRONT(0, 0))}</body></html>`);
w('back.html', `<!doctype html><html><head><meta charset="utf-8"><title>Back cover</title><link rel="stylesheet" href="../../brand/fonts/fonts.css"><style>${CSS}
html,body{width:816px;height:816px;overflow:hidden}</style></head><body>${defs}${panel(0, 0, 816, 816, BACK(0, 0))}</body></html>`);
// mockup 1600 x 1200
const spreadArt = k => spreads[k]();
const openSpread = k => {
  const [L, Rt] = LAYOUT[k];
  const t = (b, dx) => `<div class="t ${b.cls || ''}" style="left:${b.x + dx}px;top:${b.y}px;width:${b.w}px;${b.size ? `font-size:${b.size}px;` : ''}">${b.html}</div>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1632 816" width="1632" height="816" style="position:absolute;left:0;top:0">${spreadArt(k)}</svg>${t(box(k + ' left', L), 0)}${t(box(k + ' right', Rt), 816)}`;
};
w('mockup.html', `<!doctype html><html><head><meta charset="utf-8"><title>Mockup</title>
<link rel="stylesheet" href="../../brand/fonts/fonts.css"><style>${CSS}
html,body{width:1600px;height:1200px;overflow:hidden;background:${C.wash}}
.surface{position:absolute;left:0;right:0;top:780px;bottom:0;background:${C.tSky}}
.shadow{position:absolute;border-radius:50%;background:rgba(29,41,64,.22);filter:blur(22px)}
.book{position:absolute;left:130px;top:210px;width:600px;height:600px;transform:perspective(2200px) rotateY(16deg);transform-origin:left center}
.book .face{position:absolute;inset:0;overflow:hidden;border-radius:3px 10px 10px 3px}
.book .face .panel{transform:scale(${600 / 816});transform-origin:0 0}
.book .spinebar{position:absolute;left:-24px;top:0;width:24px;height:600px;background:#2f6fb8;border-radius:4px 0 0 4px}
.book .pg{position:absolute;right:-12px;top:6px;width:12px;height:588px;background:#fff;border-radius:0 4px 4px 0}
.open{position:absolute;left:790px;top:640px;width:720px;height:360px;transform:perspective(2400px) rotateX(24deg) rotateZ(-3deg);transform-origin:center bottom}
.open .rim{position:absolute;left:-10px;top:-6px;right:-10px;bottom:-10px;background:#FFFFFF;border-radius:10px}
.open .sheet{position:absolute;inset:0;overflow:hidden;border-radius:4px}
.open .sheet .inner{position:absolute;left:0;top:0;width:1632px;height:816px;transform:scale(${720 / 1632});transform-origin:0 0}
.open .gut{position:absolute;left:356px;top:0;width:8px;height:360px;background:rgba(29,41,64,.14)}
.tag{position:absolute;left:830px;top:190px;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:58px;line-height:1.02;color:${C.ink};letter-spacing:-1.5px}
.tag .hl{color:${C.tomato}}
.tag small{display:block;font-family:"Nunito Sans",sans-serif;font-weight:700;font-size:23px;letter-spacing:.3px;color:${C.ink};margin-top:20px;line-height:1.4}
.mlogo{position:absolute;left:834px;top:540px;width:250px}
.mlogo svg{display:block;width:100%;height:auto}
</style></head><body>${defs}
<div class="surface"></div>
<div class="shadow" style="left:150px;top:780px;width:640px;height:70px"></div>
<div class="shadow" style="left:800px;top:940px;width:720px;height:70px"></div>
<div class="book"><div class="spinebar"></div><div class="face">${panel(0, 0, 816, 816, FRONT(0, 0))}</div><div class="pg"></div></div>
<div class="tag">Blocks. Puddles.<br>A box <span class="hl">rocket.</span><br>One very sleepy tablet.<small>A funny bedtime read-aloud with a refrain<br>kids shout along to · 32 pages · ages 3–7</small></div>
<div class="mlogo">${LOGO('lockup-horizontal.svg', 250)}</div>
<div class="open"><div class="rim"></div><div class="sheet"><div class="inner">${openSpread('s7')}</div></div><div class="gut"></div></div>
</body></html>`);
console.log('pages:', pages.length, '| kdp wrap in:', (kdp.W / 96).toFixed(4), 'x', (kdp.H / 96).toFixed(4), '| hardcover wrap in:', (hc.W / 96).toFixed(4), 'x', (hc.H / 96).toFixed(4));
