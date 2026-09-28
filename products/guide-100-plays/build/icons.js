// Object art for the 100 Plays guide. Flat, no outlines, brand palette only. Each symbol fits a ~100 x 100 box centred on 0,0.
// Shares the Play Before Pixels look with board-up-go-more (ball, blocks, duck, shoe, cup come from the same geometry).
const C = {
  ink: '#1D2940', paper: '#FFFFFF', wash: '#F3F6FB', tomato: '#EE5A36', sun: '#F5B820', sky: '#3D86D8',
  grass: '#2FA36B', plum: '#8A5CC7', tTomato: '#FDE9E3', tSun: '#FEF4D8', tSky: '#E3EEFA', tGrass: '#DFF3E9', tPlum: '#EFE6FA',
  s1: '#F4CFAE', s2: '#E0AC80', s3: '#C08457', s4: '#8D5A3B', h1: '#2B1D16',
};
const W = '#FFFFFF';
const R = (x, y, w, h, f, rx = 0, ex = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${ex}/>`;
const Ci = (cx, cy, r, f, ex = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${ex}/>`;
const E = (cx, cy, rx, ry, f, ex = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${ex}/>`;
const Pa = (d, f, ex = '') => `<path d="${d}" fill="${f}" ${ex}/>`;
const L = (d, c, w) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const sym = (id, body) => `<symbol id="a-${id}" overflow="visible">${body}</symbol>`;
const star = (r1, r2, k = 5) => { let d = ''; for (let i = 0; i < k * 2; i++) { const r = i % 2 ? r2 : r1; const a = Math.PI / k * i - Math.PI / 2; d += (i ? 'L' : 'M') + (r * Math.cos(a)).toFixed(1) + ' ' + (r * Math.sin(a)).toFixed(1); } return d + 'Z'; };
const eyes = (y = -4, dx = 12, r = 4.5) => Ci(-dx, y, r, C.ink) + Ci(dx, y, r, C.ink) + Ci(-dx + 1.5, y - 1.5, 1.4, W) + Ci(dx + 1.5, y - 1.5, 1.4, W);

const ART = [
  sym('face', Ci(-40, 4, 9, C.s2) + Ci(40, 4, 9, C.s2) + Ci(0, 0, 40, C.s2) + Pa('M-40-2C-42-40 42-40 40-2C34-22 14-28 0-22C-14-28-34-22-40-2Z', C.h1) + eyes(2) + Ci(-22, 14, 6, C.tomato, 'fill-opacity=".35"') + Ci(22, 14, 6, C.tomato, 'fill-opacity=".35"') + L('M-10 16Q0 25 10 16', C.ink, 4)),
  sym('mirror', R(-7, 22, 14, 30, C.plum, 7) + E(0, -8, 34, 40, C.plum) + E(0, -8, 26, 32, C.tSky) + L('M-12-22L-2-32M-14-8L6-28', W, 5)),
  sym('heart', Pa('M0 40C-8 32-46 10-46-14C-46-32-34-42-21-42C-11-42-4-36 0-28C4-36 11-42 21-42C34-42 46-32 46-14C46 10 8 32 0 40Z', C.tomato)),
  sym('puppet', R(-52, -26, 18, 60, C.tSky, 8) + Pa('M-40-22H10C34-22 48-6 48 8C48 22 36 32 20 32H-40Z', C.sky) + Ci(16, -6, 6, W) + Ci(17, -5, 3.4, C.ink) + Pa('M24 14Q38 12 48 10Q46 24 30 24Z', C.tomato) + R(-40, -4, 40, 6, W, 3, 'fill-opacity=".45"')),
  sym('note', E(-22, 30, 14, 10, C.plum, 'transform="rotate(-20 -22 30)"') + E(26, 20, 14, 10, C.plum, 'transform="rotate(-20 26 20)"') + R(-12, -36, 8, 66, C.plum) + R(36, -46, 8, 66, C.plum) + Pa('M-12-36L44-46V-30L-12-20Z', C.plum)),
  sym('rattle', R(-5, 4, 10, 40, C.grass, 5) + Ci(0, 44, 9, C.grass) + Ci(0, -18, 28, C.sun) + Ci(-10, -26, 6, W, 'fill-opacity=".7"') + Ci(10, -12, 4, W, 'fill-opacity=".7"')),
  sym('towel', R(-38, -34, 76, 70, C.sky, 8) + R(-38, 14, 76, 8, W, 0, 'fill-opacity=".6"') + R(-38, 24, 76, 4, W, 0, 'fill-opacity=".6"') + R(-38, -34, 76, 12, C.tSky, 8)),
  sym('cup', Pa('M-24-30H24L19 34C18.5 39 16 41 11 41H-11C-16 41-18.5 39-19 34Z', C.sky) + R(-28, -42, 56, 16, C.sun, 8) + R(-7, -56, 14, 18, C.sun, 7)),
  sym('ball', Ci(0, 0, 44, C.sun) + Pa('M0 0L0-44A44 44 0 0 1 38.1 22Z', C.tomato) + Pa('M0 0L-38.1 22A44 44 0 0 1-38.1-22Z', C.sky) + Ci(0, 0, 9, W)),
  sym('box', Pa('M-40-10H40V40H-40Z', C.s2) + Pa('M-40-10L-50-28H-6L0-10Z', C.s3) + Pa('M40-10L50-28H6L0-10Z', C.s3) + R(-12, 4, 24, 8, C.s3, 3)),
  sym('pot', R(-38, -14, 76, 46, C.sky, 12) + R(-44, -22, 88, 12, C.ink, 6) + R(-54, -8, 18, 10, C.ink, 5) + R(36, -8, 18, 10, C.ink, 5) + `<g transform="rotate(30)">${R(-4, -62, 8, 40, C.s3, 4)}${E(0, -66, 9, 13, C.s3)}</g>`),
  sym('bucket', L('M-30-24Q0-64 30-24', C.ink, 5) + Pa('M-36-24H36L28 40H-28Z', C.grass) + R(-38, -30, 76, 12, C.tGrass, 6)),
  sym('cups', Pa('M-18 8H18L14 44H-14Z', C.tomato) + Pa('M-15-24H15L12 8H-12Z', C.sun) + Pa('M-12-50H12L9.5-24H-9.5Z', C.sky)),
  sym('hand', `<g transform="rotate(-12)">${R(-22, -10, 44, 44, C.s2, 18)}${R(-22, -38, 10, 36, C.s2, 5)}${R(-9, -46, 10, 42, C.s2, 5)}${R(4, -42, 10, 38, C.s2, 5)}${R(17, -30, 9, 28, C.s2, 4.5)}${R(18, 6, 26, 11, C.s2, 5.5, 'transform="rotate(-40 20 10)"')}</g>` + L('M-44-30Q-52-14-44 2', C.sky, 5) + L('M40-44Q52-30 46-12', C.sky, 5)),
  sym('leaf', Pa('M-36 36C-44-10-10-44 40-40C44 8 12 42-36 36Z', C.grass) + L('M-36 36L22-22M-8 8L-8-14M8-8L22-4', C.tGrass, 4)),
  sym('cushion', R(-44, -28, 88, 56, C.plum, 22) + L('M-26-10Q0-2 26-10M-26 10Q0 2 26 10', C.tPlum, 4)),
  sym('light', Ci(0, -10, 28, C.sun) + R(-13, 14, 26, 20, C.sun, 4) + R(-12, 32, 24, 12, C.ink, 5) + L('M0-52V-60M-34-40L-40-46M34-40L40-46M-44-10H-52M44-10H52', C.sun, 5)),
  sym('book', R(-34, -44, 68, 88, C.tomato, 8) + R(-34, -44, 12, 88, C.ink, 4, 'fill-opacity=".22"') + Ci(6, -6, 16, W) + Ci(6, -6, 7, C.sun)),
  sym('basket', Pa('M-46-20H46L38 40H-38Z', C.sun) + R(-50, -26, 100, 12, C.tomato, 6) + [-24, -8, 8, 24].map(x => R(x - 4, -4, 8, 32, W, 4, 'fill-opacity=".55"')).join('')),
  sym('tape', Ci(0, 0, 38, C.sky) + Ci(0, 0, 18, W) + Pa('M30 22L56 34L50 44L24 32Z', C.tSky)),
  sym('sock', Pa('M-14-46H18V10L34 22C44 30 38 46 26 44L-6 38C-16 36-14 26-14 18Z', C.tomato) + R(-14, -46, 32, 12, C.sun) + R(-14, -26, 32, 6, W, 0, 'fill-opacity=".6"')),
  sym('brush', `<g transform="rotate(35)">${R(-5, -10, 10, 58, C.s3, 5)}${R(-8, -22, 16, 14, C.ink, 3)}${Pa('M-8-22C-10-40-2-50 0-54C2-50 10-40 8-22Z', C.sky)}</g>` + Pa('M-40 30Q-30 24-20 30T0 30', 'none', `stroke="${C.sky}" stroke-width="6" stroke-linecap="round"`)),
  sym('bubbles', Ci(-14, 6, 26, C.tSky) + Ci(-14, 6, 20, W) + L('M-26 0A12 12 0 0 1-18-8', C.sky, 4) + Ci(26, -20, 16, C.tSky) + Ci(26, -20, 11, W) + Ci(24, 30, 10, C.tSky) + Ci(24, 30, 6, W)),
  sym('duck', E(0, 12, 38, 24, C.sun) + Pa('M22 0C36-2 42 8 44 16C34 14 26 14 22 10Z', C.sun) + Ci(-16, -16, 20, C.sun) + Pa('M-34-18C-48-18-50-10-45-7C-40-4-35-7-32-10Z', C.tomato) + Ci(-19, -20, 3.4, C.ink)),
  sym('car', Pa('M-46 10V-4C-46-14-40-18-30-18L-20-36H18L32-18H38C46-18 50-12 50-4V10C50 16 46 20 40 20H-40C-44 20-46 16-46 10Z', C.tomato) + Pa('M-14-30H-2V-18H-22Z', C.tSky) + Pa('M4-30H14L24-18H4Z', C.tSky) + Ci(-26, 20, 12, C.ink) + Ci(-26, 20, 4, W) + Ci(28, 20, 12, C.ink) + Ci(28, 20, 4, W)),
  sym('doll', Ci(0, -26, 20, C.s3) + Pa('M-20-28C-22-50 22-50 20-28C14-40-14-40-20-28Z', C.h1) + eyes(-24, 7, 3) + L('M-5-16Q0-12 5-16', C.ink, 3) + R(-20, -6, 40, 46, C.plum, 16) + R(-30, 0, 12, 26, C.s3, 6) + R(18, 0, 12, 26, C.s3, 6)),
  sym('bowl', Pa('M-46-4H46C46 26 26 40 0 40C-26 40-46 26-46-4Z', C.tomato) + E(0, -4, 46, 10, C.tTomato) + `<g transform="rotate(-30)">${R(-4, -62, 8, 44, C.s3, 4)}${E(0, -66, 9, 12, C.s3)}</g>` + E(-14, -6, 8, 3, C.sun) + E(14, -6, 10, 3, C.sun)),
  sym('ramp', Pa('M-50 40L50 40L50 0Z', C.plum) + `<g transform="translate(26 -16) scale(.3)">${Ci(0, 0, 44, C.sun)}${Pa('M0 0L0-44A44 44 0 0 1 38.1 22Z', C.tomato)}${Pa('M0 0L-38.1 22A44 44 0 0 1-38.1-22Z', C.sky)}${Ci(0, 0, 9, W)}</g>` + R(-54, 40, 108, 6, C.ink, 3)),
  sym('plane', Pa('M-48 4L48-34L-8 20Z', C.sky) + Pa('M-8 20L48-34L10 40Z', C.tSky) + Pa('M-8 20L0 8L10 40Z', C.ink, 'fill-opacity=".25"')),
  sym('plate', E(0, 16, 48, 18, C.tSky) + E(0, 14, 34, 11, W) + R(-26, -10, 52, 12, C.s2, 6) + R(-28, -18, 56, 8, C.grass, 4) + R(-26, -34, 52, 16, C.s2, 8)),
  sym('door', R(-28, -48, 56, 94, C.grass, 6) + R(-20, -40, 40, 34, W, 4, 'fill-opacity=".35"') + R(-20, 0, 40, 38, W, 4, 'fill-opacity=".35"') + Ci(16, 4, 5, C.sun) + L('M36-30Q44-20 36-10M44-38Q56-20 44-2', C.tomato, 4)),
  sym('feet', `<g transform="translate(-18 6) rotate(-10)">${E(0, 6, 13, 22, C.s3)}${Ci(-9, -22, 4.5, C.s3)}${Ci(-1, -25, 4.5, C.s3)}${Ci(7, -23, 4, C.s3)}${Ci(13, -18, 3.5, C.s3)}</g>` + `<g transform="translate(20 -8) rotate(10)">${E(0, 6, 13, 22, C.s3)}${Ci(9, -22, 4.5, C.s3)}${Ci(1, -25, 4.5, C.s3)}${Ci(-7, -23, 4, C.s3)}${Ci(-13, -18, 3.5, C.s3)}</g>`),
  sym('phone', R(-38, -4, 76, 42, C.tomato, 14) + Ci(0, 16, 13, W) + Ci(0, 16, 5, C.tomato) + R(-46, -26, 92, 18, C.ink, 9) + R(-50, -30, 24, 22, C.ink, 9) + R(26, -30, 24, 22, C.ink, 9)),
  sym('house', Pa('M-40-6L0-44L40-6Z', C.tomato) + R(-34, -8, 68, 52, C.s2) + R(-10, 12, 20, 32, C.sky, 3) + R(14, 2, 14, 14, W, 2)),
  sym('blocks', `<g transform="translate(-22 20) scale(.72)">${R(-28, -28, 56, 56, C.tomato, 9)}${Ci(0, 0, 13, W)}</g><g transform="translate(22 20) scale(.72)">${R(-28, -28, 56, 56, C.sky, 9)}${Pa('M0-14L14 11H-14Z', W)}</g><g transform="translate(0 -22) scale(.72)">${R(-28, -28, 56, 56, C.grass, 9)}${R(-12, -12, 24, 24, W, 4)}</g>`),
  sym('torch', Pa('M-6-8L-44-50L4-58Z', C.sun, 'fill-opacity=".5"') + `<g transform="rotate(45)">${R(-10, 0, 20, 52, C.plum, 6)}${Pa('M-16 2H16L12-14H-12Z', C.plum)}${R(-12, -18, 24, 6, C.sun, 3)}${R(-4, 16, 8, 10, W, 3, 'fill-opacity=".6"')}</g>`),
  sym('bag', Pa('M-36-20H36L32 42H-32Z', C.grass) + L('M-18-20V-30C-18-50 18-50 18-30V-20', C.ink, 6) + Ci(0, 12, 10, C.tGrass)),
  sym('boot', Pa('M-24-46H12V-2L38 6C48 9 50 24 40 28H-24Z', C.sun) + R(-30, -50, 46, 12, C.sun, 6) + R(-26, 26, 70, 10, C.ink, 5) + Ci(28, 44, 5, C.sky) + Ci(-40, 20, 6, C.sky)),
  sym('chalk', `<g transform="rotate(-20)">${R(-40, -10, 60, 18, C.sky, 9)}</g><g transform="rotate(15)">${R(-20, 14, 56, 18, C.tomato, 9)}</g>` + L('M-40 40Q-20 30 0 42T40 38', C.sun, 6)),
  sym('moon', Pa('M8-44A44 44 0 1 0 44 8A34 34 0 1 1 8-44Z', C.sun) + `<path d="${star(10, 4)}" transform="translate(32 -30)" fill="${C.sun}"/>`),
  sym('shoe', `<g transform="scale(.9)"><path d="M-46 8V-14C-46-26-38-30-28-30H-14C-6-30-2-24 2-18L10-8C14-4 20-2 30 0L40 2C48 4 50 10 50 16V18H-46Z" fill="${C.sky}"/><rect x="-50" y="14" width="104" height="14" rx="7" fill="${C.tSky}"/><rect x="-18" y="-24" width="12" height="30" rx="5" fill="${C.sun}" transform="rotate(28 -12 -9)"/><rect x="-4" y="-16" width="12" height="28" rx="5" fill="${C.sun}" transform="rotate(28 2 -2)"/></g>`),
  sym('eye', Ci(-8, -8, 32, C.plum) + Ci(-8, -8, 22, C.tSky) + `<g transform="rotate(-45 -8 -8)">${R(-16, 22, 16, 40, C.plum, 7)}</g>` + L('M-20-18A14 14 0 0 1-8-24', W, 5)),
  sym('teapot', E(0, 8, 34, 28, C.sky) + R(-20, -26, 40, 8, C.sky, 4) + Ci(0, -30, 6, C.sun) + Pa('M30 0L52-18L50-10L36 14Z', C.sky) + L('M-32-4C-52-4-52 24-30 22', C.sky, 7) + R(-30, 30, 60, 8, C.ink, 4, 'fill-opacity=".2"')),
  sym('photo', `<g transform="rotate(-6)">${R(-40, -40, 80, 86, W)}${R(-40, -40, 80, 86, C.ink, 4, 'fill-opacity=".08"')}${R(-32, -32, 64, 56, C.tSky)}${Pa('M-32 24L-8-4L8 12L18 2L32 16V24Z', C.grass)}${Ci(16, -16, 8, C.sun)}</g>`),
  sym('wheel', Ci(0, 0, 44, C.ink) + Ci(0, 0, 32, W) + R(-32, -5, 64, 10, C.ink) + R(-5, 0, 10, 32, C.ink) + Ci(0, 0, 12, C.tomato)),
  sym('crayon', `<g transform="rotate(-35)">${R(-12, -40, 24, 76, C.tomato, 4)}${Pa('M-12-40L0-62L12-40Z', C.s2)}${Pa('M-5-54L0-62L5-54Z', C.tomato)}${R(-12, -20, 24, 8, C.ink, 0, 'fill-opacity=".25"')}${R(-12, 16, 24, 8, C.ink, 0, 'fill-opacity=".25"')}</g>`),
  sym('stairs', Pa('M-46 44V20H-22V-4H2V-28H26V-52H46V44Z', C.grass) + Pa('M-46 20H-22V26H-46ZM-22-4H2V2H-22ZM2-28H26V-22H2Z', C.tGrass)),
  sym('star', `<path d="${star(46, 20)}" fill="${C.sun}"/>`),
  sym('rocket', Pa('M-18 30V-14C-18-34 0-52 0-52C0-52 18-34 18-14V30Z', C.s2) + Ci(0, -10, 9, C.tSky) + Pa('M-18 6L-36 36H-18Z', C.tomato) + Pa('M18 6L36 36H18Z', C.tomato) + Pa('M-10 30L0 52L10 30Z', C.sun) + Pa('M-12-36C-8-44 0-52 0-52C0-52 8-44 12-36Z', C.plum)),
  sym('tent', Pa('M-50 40L0-44L50 40Z', C.tomato) + Pa('M0-44L22 40H-22Z', C.tTomato) + Pa('M0-10L12 40H-12Z', C.ink, 'fill-opacity=".85"') + R(-56, 40, 112, 6, C.ink, 3)),
  sym('list', R(-32, -40, 64, 86, C.s2, 6) + R(-26, -30, 52, 70, W, 3) + R(-12, -48, 24, 14, C.ink, 4) + [-16, 0, 16].map(y => L(`M-18 ${y}l5 5 8-9`, C.grass, 4) + R(0, y - 3, 20, 6, C.tSky, 3)).join('')),
  sym('dough', Ci(-20, 18, 24, C.plum) + `<g transform="rotate(-20)">${R(-44, -34, 88, 22, C.s2, 11)}${R(-60, -28, 18, 10, C.s3, 5)}${R(42, -28, 18, 10, C.s3, 5)}</g>` + Ci(26, 26, 14, C.grass)),
  sym('mail', R(-44, -28, 88, 60, C.sky, 6) + Pa('M-44-24L0 8L44-24', 'none', `stroke="${W}" stroke-width="6" stroke-linejoin="round"`) + R(22, -22, 14, 16, C.tomato, 2)),
  sym('sun', [0, 45, 90, 135, 180, 225, 270, 315].map(a => R(-5, -52, 10, 16, C.sun, 5, `transform="rotate(${a})"`)).join('') + Ci(0, 0, 30, C.sun)),
  sym('spoon', E(0, 36, 40, 14, C.plum) + R(-5, -50, 10, 84, C.s3, 5) + E(0, -52, 12, 8, C.s3) + [22, 8, -6, -20].map((y, i) => R(-13, y, 26, 12, i % 2 ? C.tomato : C.sun, 3)).join('')),
  sym('spade', `<g transform="rotate(30)">${R(-5, 4, 10, 42, C.s3, 5)}${R(-10, 40, 20, 10, C.ink, 5)}${Pa('M-18 4H18V-24C18-40 0-52 0-52C0-52-18-40-18-24Z', C.sky)}</g>` + E(-28, 40, 20, 8, C.s4)),
  sym('hat', Pa('M-36 12C-36-26-18-40 0-40C18-40 36-26 36 12Z', C.sun) + R(-50, 8, 100, 14, C.sun, 7) + R(-6, -40, 12, 50, C.tomato, 6, 'fill-opacity=".5"')),
  sym('note-sq', `<g transform="rotate(-8)">${R(-42, -40, 50, 50, C.sun, 3)}${Ci(-17, -15, 10, C.tomato)}</g><g transform="rotate(6)">${R(-6, -8, 50, 50, C.tGrass, 3)}${R(-6, -8, 50, 50, C.grass, 3, 'fill-opacity=".55"')}${Pa('M19 4L32 28H6Z', W)}</g>`),
];

// ---------- UI icons (24 x 24 box, 0..24) ----------
const UI = [
  `<symbol id="u-clock" viewBox="0 0 24 24"><circle cx="12" cy="13" r="9.5" fill="currentColor"/><circle cx="12" cy="13" r="7" fill="#FFFFFF"/><rect x="9.5" y="1" width="5" height="3" rx="1.5" fill="currentColor"/><path d="M12 8.5V13l3 2" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round"/></symbol>`,
  `<symbol id="u-drop" viewBox="0 0 24 24"><path d="M12 2C12 2 4.5 11 4.5 15.5A7.5 7.5 0 0 0 19.5 15.5C19.5 11 12 2 12 2Z" fill="currentColor"/></symbol>`,
  `<symbol id="u-drop-o" viewBox="0 0 24 24"><path d="M12 4.6C10 7.2 6.5 12 6.5 15.5A5.5 5.5 0 0 0 17.5 15.5C17.5 12 14 7.2 12 4.6Z" fill="none" stroke="currentColor" stroke-width="2"/></symbol>`,
  `<symbol id="u-bag" viewBox="0 0 24 24"><path d="M4 8H20L18.6 21H5.4Z" fill="currentColor"/><path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" stroke="currentColor" stroke-width="2" fill="none"/></symbol>`,
  `<symbol id="u-talk" viewBox="0 0 24 24"><path d="M5 3H19A3 3 0 0 1 22 6V14A3 3 0 0 1 19 17H11L6 21V17H5A3 3 0 0 1 2 14V6A3 3 0 0 1 5 3Z" fill="currentColor"/><circle cx="8" cy="10" r="1.6" fill="#FFFFFF"/><circle cx="12" cy="10" r="1.6" fill="#FFFFFF"/><circle cx="16" cy="10" r="1.6" fill="#FFFFFF"/></symbol>`,
  `<symbol id="u-shield" viewBox="0 0 24 24"><path d="M12 1.5L21 5V11.5C21 17 17 21 12 22.5C7 21 3 17 3 11.5V5Z" fill="currentColor"/><path d="M7.8 12l3 3 5.5-6" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></symbol>`,
  `<symbol id="u-pin" viewBox="0 0 24 24"><path d="M12 22S4 14.5 4 9.5A8 8 0 0 1 20 9.5C20 14.5 12 22 12 22Z" fill="currentColor"/><circle cx="12" cy="9.5" r="3" fill="#FFFFFF"/></symbol>`,
  `<symbol id="u-check" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" stroke-width="2"/></symbol>`,
  `<symbol id="u-tube" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="7" ry="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 5V19C5 21 19 21 19 19V5" fill="none" stroke="currentColor" stroke-width="2"/></symbol>`,
];

module.exports = { ART, UI, star };
