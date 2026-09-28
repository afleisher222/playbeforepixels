// Object icons for the Play & Talk decks. Flat, solid fills, brand palette only, no outlines.
// Each icon is drawn centered on 0,0 inside roughly a 100 x 100 box. Characters and the core
// objects (ball, blocks, duck, dog, cat, cup, book, moon, car...) come from chars.js, which is
// copied from the Up! Go! More! board book so the whole line shares one cast.
const { C, SK, HR, KIDS, ADULTS, SYMBOLS, kid, adult, use, sym } = require('./chars.js');
const I = C.ink, W = '#FFFFFF';

const r = (x, y, w, h, rx, f, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${extra}/>`;
const c = (x, y, rr, f, extra = '') => `<circle cx="${x}" cy="${y}" r="${rr}" fill="${f}" ${extra}/>`;
const p = (d, f, extra = '') => `<path d="${d}" fill="${f}" ${extra}/>`;
const line = (d, col, w = 4) => `<path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const g = (tf, body, style = '') => `<g transform="${tf}" ${style ? `style="${style}"` : ''}>${body}</g>`;
const vars = o => `--sk:${o.skin};--hr:${o.hair};--sh:${o.shirt};--pa:${o.pants};--so:${o.shoe};--hw:${o.hw || C.sun}`;

// a head only (for close-up faces)
function head(o, face, s = 1, x = 0, y = 0) {
  const back = o.hs === 'bob' ? use('hb-bob') : o.hs === 'long' ? use('hb-long') : '';
  return `<g style="${vars(o)}" transform="translate(${x},${y}) scale(${s})">${back}${use('t-head')}${use('face-' + face)}${use('h-' + o.hs)}</g>`;
}

const EXTRA = [
  sym('bub', `<circle r="10" fill="${C.tSky}"/><path d="M-6-2A7 7 0 0 1-2-6" stroke="${C.sky}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`),
  sym('wheel-s', `<circle r="8" fill="${I}"/><circle r="3" fill="#FFFFFF"/>`),
  sym('leaf', `<path d="M0-26C16-18 18 6 0 26C-18 6-16-18 0-26Z" fill="${C.grass}"/><path d="M0-18V22" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>`),
];

const ICONS = {
  cloth: () => g('rotate(-8)', r(-40, -30, 80, 60, 8, C.sky) + r(-40, -14, 80, 7, 0, W, 'opacity=".85"') + r(-40, 6, 80, 7, 0, W, 'opacity=".85"') + r(-40, 22, 80, 8, 0, C.tomato) + r(-40, -30, 80, 8, 0, C.tomato)),
  babyface: () => head(KIDS.B, 'oh', 1.45, -2, 4),
  laughhead: () => head(KIDS.D, 'laugh', 1.45, 0, 4),
  pot: () => r(-38, -6, 76, 40, 12, C.sky) + r(-46, 28, 92, 10, 5, C.sky) + r(-8, -14, 16, 10, 5, I) +
    g('rotate(-35) translate(18,-30)', `<ellipse cx="0" cy="-10" rx="9" ry="13" fill="${C.sun}"/>` + r(-3, 0, 6, 38, 3, C.sun)) +
    line('M-30-26l-8-8M-22-32l-2-10', C.tomato, 4),
  hideduck: () => g('translate(4,-10) scale(.9)', use('duck')) + p('M-44 34C-44 4-26-6 0-6C26-6 44 4 44 34Z', C.plum) + r(-44, 30, 88, 8, 4, C.plum),
  bubbles: () => g('translate(-14,-12) scale(1.5)', use('bub')) + g('translate(18,-26) scale(1)', use('bub')) + g('translate(22,6) scale(1.2)', use('bub')) + g('translate(-26,20) scale(.8)', use('bub')) +
    g('rotate(30) translate(12,26)', `<circle r="10" fill="none" stroke="${C.plum}" stroke-width="4"/>` + r(-2.5, 9, 5, 26, 2.5, C.plum)),
  note: () => p('M-10 20V-28L26-36V12', 'none', `stroke="${C.plum}" stroke-width="7" stroke-linejoin="round"`) + `<ellipse cx="-18" cy="22" rx="12" ry="9" fill="${C.plum}"/><ellipse cx="18" cy="14" rx="12" ry="9" fill="${C.plum}"/>` + r(-10, -34, 36, 12, 2, C.plum, 'transform="skewY(-12)"'),
  ball: () => g('scale(.78)', use('ball')),
  bookopen: () => g('scale(.46)', use('book-open', '', `style="--bc:${C.grass}"`)) + g('translate(-20,2) scale(.28)', use('duck')) + g('translate(20,2) scale(.2)', use('sun')),
  basket: () => g('translate(-16,-18) scale(.34)', use('ball')) + g('translate(14,-16) scale(.4)', use('block-2')) +
    `<path d="M-26 -4A26 26 0 0 1 26 -4" stroke="${C.tomato}" stroke-width="6" fill="none" stroke-linecap="round" transform="translate(0,-22) scale(1.4,1.3)" opacity="0"/>` +
    p('M-40-4H40L32 34C31 38 28 40 24 40H-24C-28 40-31 38-32 34Z', C.sun) + r(-42, -8, 84, 10, 5, C.tomato) + r(-34, 10, 68, 5, 2.5, W, 'opacity=".5"') + r(-32, 23, 64, 5, 2.5, W, 'opacity=".5"'),
  tree: () => r(-6, 4, 12, 40, 5, '#A0522D') + c(0, -14, 30, C.grass) + c(-22, 0, 18, C.grass) + c(22, 0, 18, C.grass) + g('translate(28,-30) scale(.5)', use('leaf')),
  cups: () => [[0,-38,C.tomato],[-22,-10,C.sky],[22,-10,C.sun],[-44,18,C.grass],[0,18,C.plum],[44,18,C.tomato]].map(([x,y,f]) => g(`translate(${x},${y})`, p('M-12 0H12L16 26H-16Z', f) + r(-17, 22, 34, 6, 3, f) + r(-9, 5, 18, 3.5, 1.75, W, 'opacity=".55"'))).join(''),
  sock: () => g('rotate(-10)', p('M-12-40H14V8C14 14 18 16 26 18L32 20C40 22 42 30 40 36C38 42 32 44 24 42L-6 36C-14 34-18 28-16 20L-12 4Z', C.tomato) + r(-14, -42, 30, 12, 4, W) + p('M26 18L32 20C40 22 42 30 40 36C38 42 32 44 24 42Z', C.sun)),
  boxcar: () => r(-42, -20, 84, 44, 6, C.sun) + p('M-42-20L-30-34H-6L-10-20Z', C.tSun) + p('M42-20L30-34H6L10-20Z', C.tSun) + g('translate(-26,28) scale(1.2)', use('wheel-s')) + g('translate(26,28) scale(1.2)', use('wheel-s')) + r(-26, -8, 52, 6, 3, W, 'opacity=".6"'),
  soup: () => line('M-14-30q-6-8 0-14M2-30q-6-8 0-14M18-30q-6-8 0-14', C.sky, 4) + r(-40, -20, 80, 50, 14, C.tomato) + r(-46, -24, 92, 10, 5, C.tomato) + r(-50, -8, 10, 8, 4, C.tomato) + r(40, -8, 10, 8, 4, C.tomato) +
    g('rotate(28) translate(18,-40)', `<ellipse cx="0" cy="0" rx="8" ry="10" fill="${C.sun}"/>` + r(-2.5, 6, 5, 34, 2.5, C.sun)),
  animals: () => g('translate(-6,4) scale(.62)', use('dog', '', `style="--dg:${C.sun};--ear:${C.tomato}"`)) + g('translate(26,22) scale(.46)', use('duck')),
  pour: () => r(-44, 14, 88, 26, 10, C.sky) + r(-40, 12, 80, 8, 4, C.tSky) + g('translate(20,-18) rotate(-50) scale(.62)', use('cup', '', `style="--c1:${C.tomato};--c2:${C.sun}"`)) +
    p('M-2-8C-6-2-6 4-2 8C2 4 2-2-2-8Z', C.sky) + p('M-12 0C-15 4-15 8-12 10C-9 8-9 4-12 0Z', C.sky),
  tower: () => g('translate(0,26) scale(.62)', use('block-1')) + g('translate(0,-10) scale(.62)', use('block-3')) + g('translate(-26,26) scale(.62)', use('block-2')) + g('translate(26,26) scale(.62)', use('block-4')) + g('translate(4,-44) scale(.5) rotate(8)', use('block-2')),
  hat: () => `<ellipse cx="0" cy="14" rx="48" ry="12" fill="${C.grass}"/>` + p('M-26 12C-26-26 26-26 26 12Z', C.grass) + r(-27, -2, 54, 10, 0, C.tomato) + c(20, -16, 7, C.sun),
  cushions: () => r(-44, 18, 88, 22, 11, C.tomato) + r(-36, -4, 72, 22, 11, C.sky) + r(-26, -26, 52, 22, 11, C.sun) + c(-20, 29, 3, W, 'opacity=".6"') + c(20, 29, 3, W, 'opacity=".6"'),
  socks: () => g('translate(-14,0) rotate(-12) scale(.72)', ICONS.sock()) + g('translate(18,4) rotate(14) scale(.72)', `<g style="filter:none">${ICONS.sock().replace(new RegExp(C.tomato, 'g'), C.sky)}</g>`),
  teddy: () => {
    const b = '#A0522D', m = SK[0];
    return c(-22, -30, 11, b) + c(22, -30, 11, b) + c(-22, -30, 5, m) + c(22, -30, 5, m) + `<ellipse cx="0" cy="26" rx="30" ry="22" fill="${b}"/>` + c(0, -12, 28, b) + `<ellipse cx="0" cy="-3" rx="12" ry="9" fill="${m}"/>` +
      c(-10, -18, 3.2, I) + c(10, -18, 3.2, I) + `<ellipse cx="0" cy="-7" rx="4.5" ry="3.2" fill="${I}"/>` + r(-44, 20, 88, 26, 10, C.sky) + r(-44, 20, 88, 7, 3, C.tSky);
  },
  tunnel: () => r(-44, -14, 8, 54, 3, C.tomato) + r(36, -14, 8, 54, 3, C.tomato) + p('M-48-20C-40-44 40-44 48-20L46 36H30V6C30-10-30-10-30 6V36H-46Z', C.plum) + c(0, 26, 0.1, I),
  hands: () => {
    const st = `--sk:${SK[2]}`;
    return g('translate(-16,6) rotate(-18) scale(1.7)', use('palm'), st) + g('translate(16,6) scale(-1.7,1.7) rotate(-18)', use('palm'), st) + line('M-6-40v-8M6-40v-8M-18-36l-5-6M18-36l5-6', C.sun, 4);
  },
  tissuebox: () => p('M-12-20C-18-40 4-46 6-30C14-44 30-34 16-18Z', C.grass) + r(-42, -20, 84, 56, 8, C.sky) + `<ellipse cx="0" cy="-12" rx="22" ry="6" fill="${I}" opacity=".85"/>` + p('M-10-14C-12-30 4-34 6-22C14-32 24-24 14-12Z', C.grass) + c(-26, 16, 5, W, 'opacity=".5"') + c(26, 16, 5, W, 'opacity=".5"'),
  fort: () => p('M0-42L46 36H-46Z', C.tomato) + p('M0-10L18 36H-18Z', I) + r(-1.5, -56, 3, 16, 1.5, I) + p('M1.5-56L18-51L1.5-46Z', C.sun),
  teapot: () => p('M-30-6C-30-30 22-30 22-6V16C22 26 14 32 4 32H-12C-22 32-30 26-30 16Z', C.sky) + r(-16, -32, 28, 8, 4, C.sky) + c(-2, -36, 5, C.sun) +
    p('M20-2L40-16L42-10L24 8Z', C.sky) + `<path d="M-30 -2C-44 -2-44 18-30 18" stroke="${C.sky}" stroke-width="7" fill="none"/>` + r(-30, 2, 52, 6, 3, W, 'opacity=".5"') +
    g('translate(30,24)', p('M-12-8H12L9 10H-9Z', C.tomato) + r(-16, 10, 32, 5, 2.5, C.tomato)),
  sort: () => c(-26, 20, 18, C.tSky) + c(26, 20, 18, C.tTomato) + g('translate(-26,10) scale(.5)', use('block-2')) + g('translate(26,10) scale(.5)', use('block-1')) + g('translate(0,-26) scale(.5)', use('block-3')) + p('M-44 20h36q0 16-18 16t-18-16Z', C.sky) + p('M8 20h36q0 16-18 16t-18-16Z', C.tomato),
  ramp: () => p('M-48 36L40-22V36Z', C.grass) + r(36, -26, 10, 62, 4, C.tomato) + g('translate(-4,6) rotate(-33.4) scale(.24)', use('car-front')),
  crayon: () => line('M-40 26C-30-10-10 30 0-4S24 16 36-20', C.sky, 6) + g('rotate(40) translate(4,-16)', r(-8, -30, 16, 50, 3, C.tomato) + p('M-8 20H8L0 34Z', C.tomato) + r(-8, -16, 16, 6, 0, W, 'opacity=".7"')),
  dancer: () => kid(Object.assign({}, KIDS.E, { x: 0, y: 30, s: .78, aL: 150, aR: -120, face: 'laugh', lL: 14, lR: -3 })) + line('M30-40q8-6 14 0M34-28q6-4 10 0', C.plum, 3.5) + g('translate(-34,-22) scale(.36)', ICONS.note()),
  puppet: () => g('rotate(8)', p('M-18 44V-14C-18-34 18-34 18-14V44Z', C.grass) + c(-7, -18, 6, W) + c(9, -18, 6, W) + c(-6, -17, 3, I) + c(10, -17, 3, I) + p('M-10-2Q0 8 10-2Q0 2-10-2Z', C.tomato) + r(-20, 34, 40, 10, 5, C.sun)),
  nature: () => g('translate(-20,-6) rotate(-20) scale(1)', use('leaf')) + r(-4, -10, 42, 7, 3.5, '#A0522D', 'transform="rotate(-30)"') +
    g('translate(22,12)', `<ellipse cx="0" cy="0" rx="12" ry="18" fill="#A0522D"/>` + line('M-8-6l8 4 8-4M-9 4l9 4 9-4M-6 12l6 3 6-3', '#E0AC80', 2.4)) + r(-40, 30, 80, 8, 4, C.sun),
  bag: () => g('translate(-12,-28) scale(.5)', use('book-closed', '', `style="--bc:${C.sky}"`)) + r(4, -34, 16, 26, 4, C.sun) + `<path d="M-18-6C-18-30 18-30 18-6" stroke="${C.tomato}" stroke-width="6" fill="none"/>` + p('M-32-8H32L28 40H-28Z', C.tomato) + r(-16, 8, 32, 10, 5, W, 'opacity=".45"'),
  tub: () => g('translate(-10,-16) scale(1)', use('bub')) + g('translate(8,-26) scale(.8)', use('bub')) + g('translate(24,-12) scale(.7)', use('bub')) + g('translate(-26,-10) scale(.36)', use('duck')) +
    r(-48, -4, 96, 14, 7, C.sky) + p('M-44 6H44C44 26 32 36 14 36H-14C-32 36-44 26-44 6Z', C.sky) + r(-34, 34, 8, 10, 4, I) + r(26, 34, 8, 10, 4, I) + r(34, -30, 6, 28, 3, I) + r(26, -32, 20, 6, 3, I),
  frog: () => `<ellipse cx="0" cy="16" rx="38" ry="24" fill="${C.grass}"/>` + c(-18, -12, 14, C.grass) + c(18, -12, 14, C.grass) + c(-18, -13, 7.5, W) + c(18, -13, 7.5, W) + c(-17, -12, 4, I) + c(19, -12, 4, I) +
    `<path d="M-16 16Q0 28 16 16" stroke="${I}" stroke-width="3.5" fill="none" stroke-linecap="round"/>` + c(-26, 10, 5, C.tomato, 'opacity=".3"') + c(26, 10, 5, C.tomato, 'opacity=".3"') + `<ellipse cx="-34" cy="38" rx="14" ry="6" fill="${C.grass}"/><ellipse cx="34" cy="38" rx="14" ry="6" fill="${C.grass}"/>`,
  magnifier: () => g('rotate(-35)', r(-6, 18, 12, 36, 6, C.tomato)) + c(-6, -8, 32, C.sun) + c(-6, -8, 24, W) + c(-16, -12, 8, C.sky) + p('M0-20L10-2H-10Z', C.grass, 'transform="translate(2,4)"'),
  wipe: () => r(-46, 8, 92, 10, 5, C.sky) + r(-38, 18, 8, 26, 4, C.sky) + r(30, 18, 8, 26, 4, C.sky) + g('translate(-4,-6) rotate(-10)', r(-22, -12, 44, 20, 8, C.grass) + r(-22, -4, 44, 4, 2, W, 'opacity=".5"')) +
    g('translate(26,-30) scale(1.4)', use('star')) + g('translate(-30,-24) scale(.9)', use('star')),
  storybox: () => g('translate(-24,-22) scale(.3)', use('moon')) + g('translate(24,-18) scale(.36)', use('duck')) + g('translate(0,-36) scale(1.3)', use('star')) + r(-40, -6, 80, 44, 6, C.tomato) + p('M-40-6L-52-20H-30L-22-6Z', C.tTomato) + p('M40-6L52-20H30L22-6Z', C.tTomato) + r(-10, 8, 20, 6, 3, W, 'opacity=".6"'),
  cone: () => p('M-6-40H6L26 30H-26Z', C.tomato) + p('M-12-12H12L16 4H-16Z', W) + r(-36, 28, 72, 10, 4, C.tomato) + line('M26-30q20 10 8 32', C.sky, 5) + p('M28 2l12-2-4 11z', C.sky),
  binoculars: () => r(-40, -24, 32, 50, 14, I) + r(8, -24, 32, 50, 14, I) + r(-10, -12, 20, 16, 5, I) + c(-24, 14, 12, C.sky) + c(24, 14, 12, C.sky) + c(-28, 10, 4, W, 'opacity=".8"') + c(20, 10, 4, W, 'opacity=".8"'),
  plate: () => c(0, 0, 36, C.tSky) + c(0, 0, 24, W) + g('translate(-46,0)', r(-3, -10, 6, 44, 3, I) + r(-8, -34, 4, 20, 2, I) + r(-2, -34, 4, 20, 2, I) + r(4, -34, 4, 20, 2, I) + r(-8, -18, 16, 10, 5, I)) +
    g('translate(46,0)', r(-3, -6, 6, 40, 3, I) + `<ellipse cx="0" cy="-20" rx="8" ry="13" fill="${I}"/>`) + c(-6, -4, 8, C.grass) + c(8, 4, 7, C.tomato) + c(4, -10, 5, C.sun),
  rocket: () => p('M-18 18L-34 40V20Z', C.tomato) + p('M18 18L34 40V20Z', C.tomato) + p('M-10 36Q0 60 10 36Z', C.sun) + r(-20, -22, 40, 60, 6, C.sun) + p('M-20-22L0-52L20-22Z', C.tomato) + c(0, -4, 10, C.sky) + c(-3, -7, 3, W, 'opacity=".8"') + r(-12, 16, 24, 6, 3, W, 'opacity=".6"'),
  list: () => g('rotate(-6)', r(-30, -42, 60, 84, 6, C.tSky) + [-24, -6, 12].map(y => r(-12, y, 32, 5, 2.5, C.sky) + line(`M-24 ${y + 2}l4 4 7-8`, C.grass, 3.5)).join('') + r(-12, 30, 22, 5, 2.5, C.sky)) + g('translate(30,10) rotate(30)', r(-5, -30, 10, 44, 2, C.tomato) + p('M-5 14H5L0 24Z', C.sun)),
  leader: () => kid(Object.assign({}, KIDS.C, { x: 2, y: 30, s: .78, aL: 20, aR: -160, face: 'joy', lL: 3, lR: -3 })) + g('translate(-34,-26) scale(1.4)', use('star')) + g('translate(36,-6)', use('star')),
  flashlight: () => p('M-8-8L46-40V40L-8 8Z', C.tSun) + g('translate(22,0)', `<ellipse cx="2" cy="4" rx="13" ry="8" fill="${I}"/>` + c(-10, -4, 7, I) + p('M-16-6L-24-3L-16 0Z', I) + p('M0 0L12-18L14 2Z', I) + p('M8 6L22 2L16 10Z', I)) +
    g('translate(-26,0)', r(-22, -9, 30, 18, 6, C.sky) + r(4, -14, 12, 28, 4, I) + r(-14, -3, 10, 6, 3, W, 'opacity=".6"')),
  bridge: () => g('translate(-30,24) scale(.5)', use('block-2')) + g('translate(-30,-4) scale(.5)', use('block-3')) + g('translate(30,24) scale(.5)', use('block-1')) + g('translate(30,-4) scale(.5)', use('block-4')) +
    r(-46, -22, 92, 8, 4, C.plum) + g('translate(0,-30) scale(.2)', use('car-front')),
  brush: () => g('translate(-18,14) scale(.66)', use('cup', '', `style="--c1:${C.sky};--c2:${C.tSky}"`)) + g('translate(16,-4) rotate(28)', r(-3.5, -40, 7, 50, 3.5, C.tomato) + r(-5, 6, 10, 8, 2, I) + p('M-5 14H5C6 22 2 28 0 30C-2 28-6 22-5 14Z', C.sun)) + line('M20 36q8-6 16 0', C.sky, 4) + p('M36-22C33-17 33-12 36-10C39-12 39-17 36-22Z', C.sky),
  mirror: () => `<ellipse cx="0" cy="-4" rx="36" ry="44" fill="${C.plum}"/><ellipse cx="0" cy="-4" rx="28" ry="36" fill="${C.tSky}"/>` + head(KIDS.A, 'oh', .9, 0, 0) + r(-6, 36, 12, 10, 3, C.plum),
  bird: () => `<path d="M24-30A18 18 0 0 1 24 0M32-38A30 30 0 0 1 32 8" stroke="${C.sky}" stroke-width="4.5" fill="none" stroke-linecap="round"/>` +
    g('translate(-8,4)', `<ellipse cx="0" cy="8" rx="24" ry="18" fill="${C.sky}"/>` + c(-14, -12, 14, C.sky) + p('M-28-14L-40-10L-28-6Z', C.sun) + c(-17, -15, 3, I) + p('M8 0C20-10 30-6 30 2C22 6 14 8 8 6Z', '#2D6FB8') + r(-8, 24, 4, 12, 2, C.sun) + r(4, 24, 4, 12, 2, C.sun)),
  carside: () => g('scale(.42)', use('car-front')),
  moonstars: () => g('translate(-4,2) scale(.72)', use('moon')) + g('translate(30,-26) scale(1.3)', use('star')) + g('translate(34,16) scale(.9)', use('star')),
};
// keep the "socks" pair readable: the second sock is sky blue
ICONS.socks = () => g('translate(-16,2) rotate(-10) scale(.72)', ICONS.sock()) + g('translate(18,6) rotate(12) scale(.72)', ICONS.sock().split(C.tomato).join(C.sky));

// shapes used as the colorblind-friendly age code
const SHAPE = {
  triangle: (col, s = 1) => `<path transform="scale(${s})" d="M0-9L9.5 7.5H-9.5Z" fill="${col}" stroke="${col}" stroke-width="2.5" stroke-linejoin="round"/>`,
  square: (col, s = 1) => `<rect transform="scale(${s})" x="-7.8" y="-7.8" width="15.6" height="15.6" rx="2.5" fill="${col}"/>`,
  star: (col, s = 1) => `<path transform="scale(${s})" d="M0-10L2.9-3.9 9.5-3.1 4.6 1.4 5.9 8 0 4.7-5.9 8-4.6 1.4-9.5-3.1-2.9-3.9Z" fill="${col}" stroke="${col}" stroke-width="1.5" stroke-linejoin="round"/>`,
  circle: (col, s = 1) => `<circle r="${8.6 * s}" fill="${col}"/>`,
};

const ALL_SYMBOLS = SYMBOLS.concat(EXTRA);
module.exports = { ICONS, SHAPE, ALL_SYMBOLS, head, C, SK, HR, KIDS, ADULTS, kid, adult, use };
