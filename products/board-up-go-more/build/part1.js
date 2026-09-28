// Build script for "Up! Go! More!" (Talk-Along Firsts, Book 1).
// ONE source, TWO editions: 6x6 in board book (offset run) + 8.5x8.5 in talk-along paperback (print on demand).
// All text comes from build/manuscript.json (the founder's manuscript). Run: node build/build.js
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const C = {
  ink: '#1D2940', paper: '#FFFFFF', wash: '#F3F6FB', tomato: '#EE5A36', sun: '#F5B820', sky: '#3D86D8',
  grass: '#2FA36B', plum: '#8A5CC7', tTomato: '#FDE9E3', tSun: '#FEF4D8', tSky: '#E3EEFA', tGrass: '#DFF3E9', tPlum: '#EFE6FA',
};
const SK = ['#F4CFAE', '#E0AC80', '#C08457', '#8D5A3B', '#5C3A26', '#3E271B'];
const HR = ['#2B1D16', '#5A3825', '#A0522D', '#E3B04B', '#1D2940'];

// ---------- cast (same look on every page) ----------
const KIDS = {
  A: { skin: SK[3], hair: HR[0], hs: 'puffs', shirt: C.tomato, pants: C.sky, shoe: C.ink },
  B: { skin: SK[0], hair: HR[3], hs: 'tuft', shirt: C.grass, pants: C.plum, shoe: C.tomato },
  C: { skin: SK[2], hair: HR[1], hs: 'curly', shirt: C.sky, pants: C.ink, shoe: C.grass },
  D: { skin: SK[4], hair: HR[4], hs: 'short', shirt: C.sun, pants: C.grass, shoe: C.sky },
  E: { skin: SK[1], hair: HR[2], hs: 'bob', shirt: C.plum, pants: C.tomato, shoe: C.ink },
};
const ADULTS = {
  G1: { skin: SK[5], hair: HR[0], hs: 'short', shirt: C.grass, pants: C.ink, shoe: C.tomato },
  G2: { skin: SK[1], hair: HR[1], hs: 'bun', shirt: C.tomato, pants: C.sky, shoe: C.ink },
  G3: { skin: SK[0], hair: HR[3], hs: 'long', shirt: C.sky, pants: C.ink, shoe: C.sun },
  G4: { skin: SK[2], hair: C.wash, hs: 'bun', shirt: C.plum, pants: C.sky, shoe: C.tomato },
  G5: { skin: SK[3], hair: HR[0], hs: 'wrap', hw: C.sun, shirt: C.tomato, pants: C.ink, shoe: C.sun },
};

// ---------- SVG symbol library ----------
const I = C.ink;
const sym = (id, body) => `<symbol id="${id}" overflow="visible">${body}</symbol>`;
const eye = (x, y) => `<circle cx="${x}" cy="${y}" r="3.9" fill="#FFFFFF"/><circle cx="${x}" cy="${y + 0.7}" r="3.1" fill="${I}"/><circle cx="${x + 1.1}" cy="${y - 0.4}" r="1" fill="#FFFFFF"/>`;
const eyes = eye(-8.5, -1) + eye(8.5, -1);
const cheeks = `<circle class="ck" cx="-14.5" cy="7.5" r="4.3"/><circle class="ck" cx="14.5" cy="7.5" r="4.3"/>`;
const capPath = 'M-25 0A25 25 0 0 1 25 0C20-13-20-13-25 0Z';
const bobFront = 'M-27 10C-29-18-15-27 0-27C15-27 29-18 27 10C25-2 18-9 0-9C-18-9-25-2-27 10Z';
const curly = [-172, -148, -122, -96, -70, -44, -14].map(a => {
  const r = a * Math.PI / 180; return `<circle class="hr" cx="${(22 * Math.cos(r)).toFixed(1)}" cy="${(22 * Math.sin(r)).toFixed(1)}" r="9"/>`;
}).join('');

const SYMBOLS = [
  // heads & faces
  sym('t-head', `<circle class="sk" cx="-23" cy="3" r="6"/><circle class="sk" cx="23" cy="3" r="6"/><circle class="sk" r="24"/>`),
  sym('face-smile', eyes + cheeks + `<path d="M-6.5 8.5Q0 14.5 6.5 8.5" stroke="${I}" stroke-width="2.7" fill="none" stroke-linecap="round"/>`),
  sym('face-laugh', eyes + cheeks + `<path d="M-8.5 6.5Q0 21 8.5 6.5Z" fill="${I}"/><path d="M-6.6 7.2H6.6Q6 9.2 5.4 9.6H-5.4Q-6 9.2-6.6 7.2Z" fill="#FFFFFF"/><path d="M-4.2 13Q0 10.4 4.2 13Q0 15.8-4.2 13Z" fill="${C.tomato}"/>`),
  sym('face-oh', eye(-8.5, -2) + eye(8.5, -2) + cheeks + `<ellipse cx="0" cy="11" rx="4.2" ry="5.2" fill="${I}"/>`),
  sym('face-sleep', `<path d="M-12.5 0Q-8.5 4.5-4.5 0M4.5 0Q8.5 4.5 12.5 0" stroke="${I}" stroke-width="2.5" fill="none" stroke-linecap="round"/>` + cheeks + `<path d="M-4 9.5Q0 12.5 4 9.5" stroke="${I}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`),
  sym('face-joy', `<path d="M-12.5 1Q-8.5-4-4.5 1M4.5 1Q8.5-4 12.5 1" stroke="${I}" stroke-width="2.6" fill="none" stroke-linecap="round"/>` + cheeks + `<path d="M-6.5 8.5Q0 14.5 6.5 8.5" stroke="${I}" stroke-width="2.7" fill="none" stroke-linecap="round"/>`),
  // hair
  sym('h-short', `<path class="hr" d="M-25.5 2A25.5 25.5 0 0 1 25.5 2C22-10 12-16-2-12C-12-9-20-8-25.5 2Z"/>`),
  sym('h-puffs', `<circle class="hr" cx="-23" cy="-16" r="12"/><circle class="hr" cx="23" cy="-16" r="12"/><path class="hr" d="${capPath}"/>`),
  sym('h-curly', curly + `<path class="hr" d="${capPath}"/>`),
  sym('h-tuft', `<path class="hr" d="M-21-9C-15-21 15-21 21-9C12-15-12-15-21-9Z"/><path class="hr" d="M-3-22C-9-34 4-41 11-33C4-35-1-32 3-22Z"/>`),
  sym('h-bun', `<circle class="hr" cx="0" cy="-28" r="11"/><path class="hr" d="${capPath}"/>`),
  sym('h-bob', `<path class="hr" d="${bobFront}"/>`),
  sym('hb-bob', `<rect class="hr" x="-28" y="-8" width="56" height="30" rx="11"/>`),
  sym('h-long', `<path class="hr" d="M-27 12C-29-18-15-27 0-27C15-27 29-18 27 12C25-4 16-12 6-11C-8-9-24-6-27 12Z"/>`),
  sym('hb-long', `<rect class="hr" x="-30" y="-10" width="17" height="58" rx="8.5"/><rect class="hr" x="13" y="-10" width="17" height="58" rx="8.5"/>`),
  sym('h-wrap', `<path class="hw" d="M-27 4C-31-31 31-31 27 4C18-8-18-8-27 4Z"/><circle class="hw" cx="9" cy="-28" r="10"/><circle class="hw" cx="21" cy="-21" r="8"/>`),
  sym('beard', `<path class="hr" d="M-22 2C-22 32 22 32 22 2C17 19-17 19-22 2Z"/>`),
  // toddler parts (origin = hip)
  sym('t-body', `<rect class="sh" x="-18" y="-45" width="36" height="40" rx="15"/><path class="pa" d="M-18-19H18V-6A10 10 0 0 1 8 4H-8A10 10 0 0 1-18-6Z"/>`),
  sym('t-arm', `<rect class="sh" x="-5.5" y="-5" width="11" height="14" rx="5.5"/><rect class="sk" x="-4.5" y="4" width="9" height="21" rx="4.5"/><circle class="sk" cy="26" r="6.2"/>`),
  sym('t-leg', `<rect class="pa" x="-6.5" y="-2" width="13" height="24" rx="6.5"/><rect class="so" x="-8" y="17" width="18" height="10" rx="5"/>`),
  sym('t-leg-sock', `<rect class="pa" x="-6.5" y="-2" width="13" height="24" rx="6.5"/><rect fill="#FFFFFF" x="-7" y="15" width="16" height="12" rx="6"/>`),
  // grown-up parts (origin = hip)
  sym('g-neck', `<rect class="sk" x="-8" y="-108" width="16" height="18" rx="4"/>`),
  sym('g-body', `<rect class="sh" x="-27" y="-95" width="54" height="84" rx="22"/><path class="pa" d="M-27-24H27V-6A12 12 0 0 1 15 6H-15A12 12 0 0 1-27-6Z"/>`),
  sym('g-arm', `<rect class="sh" x="-7.5" y="-6" width="15" height="32" rx="7.5"/><rect class="sk" x="-6.5" y="20" width="13" height="30" rx="6.5"/><circle class="sk" cy="51" r="8.5"/>`),
  sym('g-thigh', `<rect class="pa" x="-11" y="-8" width="22" height="50" rx="11"/>`),
  sym('g-shin', `<rect class="pa" x="-10.5" y="-10" width="21" height="46" rx="10.5"/><rect class="so" x="-12" y="28" width="29" height="13" rx="6.5"/>`),
  sym('g-shin-k', `<rect class="pa" x="-10.5" y="-10" width="21" height="46" rx="10.5"/><rect class="so" x="-9" y="27" width="18" height="15" rx="7"/>`),
  sym('g-lap', `<rect class="pa" x="-42" y="-18" width="84" height="32" rx="16"/>`),
  sym('palm', `<rect class="sk" x="-11.5" y="-19" width="5.4" height="16" rx="2.7"/><rect class="sk" x="-5.4" y="-23" width="5.4" height="18" rx="2.7"/><rect class="sk" x="0.6" y="-22" width="5.4" height="17" rx="2.7"/><rect class="sk" x="6.4" y="-18" width="5" height="14" rx="2.5"/><rect class="sk" x="-11.5" y="-9" width="23" height="19" rx="8"/><rect class="sk" x="7" y="-2" width="12" height="6" rx="3" transform="rotate(-35 8 1)"/>`),
  // objects
  sym('ball', `<circle r="50" fill="${C.sun}"/><path d="M0 0L0-50A50 50 0 0 1 43.3 25Z" fill="${C.tomato}"/><path d="M0 0L-43.3 25A50 50 0 0 1-43.3-25Z" fill="${C.sky}"/><circle r="10" fill="#FFFFFF"/>`),
  sym('block-1', `<rect x="-28" y="-28" width="56" height="56" rx="9" fill="${C.tomato}"/><circle r="13" fill="#FFFFFF"/>`),
  sym('block-2', `<rect x="-28" y="-28" width="56" height="56" rx="9" fill="${C.sky}"/><path d="M0-14L14 11H-14Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="4" stroke-linejoin="round"/>`),
  sym('block-3', `<rect x="-28" y="-28" width="56" height="56" rx="9" fill="${C.grass}"/><rect x="-12" y="-12" width="24" height="24" rx="4" fill="#FFFFFF"/>`),
  sym('block-4', `<rect x="-28" y="-28" width="56" height="56" rx="9" fill="${C.sun}"/><path d="M0-15L4.4-6 14-4.6 7 2.2 8.8 12 0 7.4-8.8 12-7 2.2-14-4.6-4.4-6Z" fill="#FFFFFF"/>`),
  sym('shoe', `<path d="M-46 8V-14C-46-26-38-30-28-30H-14C-6-30-2-24 2-18L10-8C14-4 20-2 30 0L40 2C48 4 50 10 50 16V18H-46Z" fill="var(--up)"/><rect x="-50" y="14" width="104" height="14" rx="7" fill="#FFFFFF"/><rect x="-18" y="-24" width="12" height="30" rx="5" fill="var(--st)" transform="rotate(28 -12 -9)"/><rect x="-4" y="-16" width="12" height="28" rx="5" fill="var(--st)" transform="rotate(28 2 -2)"/>`),
  sym('cup', `<path d="M-20-28H20L16 30C15.5 34 13 36 9 36H-9C-13 36-15.5 34-16 30Z" fill="var(--c1,${C.sky})"/><rect x="-24" y="-38" width="48" height="14" rx="7" fill="var(--c2,${C.sun})"/><rect x="-6" y="-50" width="12" height="16" rx="6" fill="var(--c2,${C.sun})"/>`),
  sym('duck', `<ellipse cx="0" cy="8" rx="30" ry="20" fill="${C.sun}"/><path d="M18-2C30-4 34 4 36 10C28 8 22 8 18 6Z" fill="${C.sun}"/><circle cx="-12" cy="-16" r="16" fill="${C.sun}"/><path d="M-27-17C-38-17-40-10-36-8C-32-6-28-8-26-10Z" fill="${C.tomato}"/><circle cx="-15" cy="-19" r="2.8" fill="${I}"/><path d="M-6 6C4 14 14 12 18 4C10 8 2 8-6 6Z" fill="#FFFFFF" opacity=".55"/>`),
  sym('dog', `<rect x="-38" y="-18" width="70" height="36" rx="18" fill="var(--dg,${C.sun})"/><rect x="-32" y="8" width="12" height="26" rx="6" fill="var(--dg,${C.sun})"/><rect x="14" y="8" width="12" height="26" rx="6" fill="var(--dg,${C.sun})"/><rect x="26" y="-34" width="10" height="26" rx="5" transform="rotate(25 31 -21)" fill="var(--dg,${C.sun})"/><circle cx="-40" cy="-28" r="22" fill="var(--dg,${C.sun})"/><ellipse cx="-58" cy="-20" rx="10" ry="8" fill="var(--dg,${C.sun})"/><circle cx="-66" cy="-22" r="4.5" fill="${I}"/><rect x="-36" y="-50" width="14" height="30" rx="7" transform="rotate(20 -29 -35)" fill="var(--ear,${C.tomato})"/><circle cx="-46" cy="-32" r="2.8" fill="${I}"/><rect x="-44" y="-8" width="22" height="7" rx="3.5" fill="${C.sky}"/>`),
  sym('cat', `<rect x="-30" y="-10" width="56" height="34" rx="17" fill="var(--ct,${C.plum})"/><circle cx="-24" cy="-20" r="18" fill="var(--ct,${C.plum})"/><path d="M-40-30L-38-48-28-36Z" fill="var(--ct,${C.plum})"/><path d="M-20-36L-10-48-8-30Z" fill="var(--ct,${C.plum})"/><circle cx="-30" cy="-22" r="2.6" fill="${I}"/><circle cx="-18" cy="-22" r="2.6" fill="${I}"/><rect x="20" y="-26" width="9" height="34" rx="4.5" transform="rotate(20 24 -9)" fill="var(--ct,${C.plum})"/>`),
  sym('sun', [0, 45, 90, 135, 180, 225, 270, 315].map(a => `<rect x="-5" y="-62" width="10" height="18" rx="5" fill="${C.sun}" transform="rotate(${a})"/>`).join('') + `<circle r="36" fill="${C.sun}"/>`),
  sym('moon', `<path d="M10-44A44 44 0 1 0 44 10A34 34 0 1 1 10-44Z" fill="${C.sun}"/>`),
  sym('star', `<path d="M0-12L3.5-3.5 12 0 3.5 3.5 0 12-3.5 3.5-12 0-3.5-3.5Z" fill="${C.sun}"/>`),
  sym('heart', `<path d="M0 30C-6 24-40 4-40-18C-40-32-30-40-19-40C-10-40-3-34 0-27C3-34 10-40 19-40C30-40 40-32 40-18C40 4 6 24 0 30Z" fill="var(--hc,${C.tomato})"/>`),
  sym('book-open', `<path d="M-92-52C-60-60-24-56 0-44C24-56 60-60 92-52V52C60 44 24 46 0 58C-24 46-60 44-92 52Z" fill="var(--bc,${C.sky})"/><path d="M-84-46C-56-52-24-48-4-38V48C-24 38-56 36-84 42Z" fill="#FFFFFF"/><path d="M84-46C56-52 24-48 4-38V48C24 38 56 36 84 42Z" fill="#FFFFFF"/>`),
  sym('book-closed', `<rect x="-26" y="-34" width="52" height="68" rx="6" fill="var(--bc,${C.tomato})"/><rect x="-26" y="-34" width="10" height="68" rx="4" fill="var(--bs,${C.ink})" opacity=".25"/><circle cx="5" cy="-4" r="11" fill="#FFFFFF"/>`),
  sym('tablet-sleeping', `<rect x="-34" y="-46" width="68" height="92" rx="10" fill="${I}"/><rect x="-27" y="-38" width="54" height="76" rx="5" fill="${C.wash}"/><path d="M-15-2Q-10 3-5-2M5-2Q10 3 15-2" stroke="${I}" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M-5 12Q0 15 5 12" stroke="${I}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`),
  sym('wheel', `<circle r="24" fill="${I}"/><circle r="8.5" fill="#FFFFFF"/>`),
  sym('car-back', `<rect x="-98" y="-92" width="28" height="70" rx="14" fill="${C.sky}"/><rect x="30" y="-72" width="9" height="34" rx="4.5" fill="${I}" transform="rotate(28 34 -55)"/><circle cx="46" cy="-76" r="14" fill="${I}"/><circle cx="46" cy="-76" r="6" fill="${C.sky}"/>`),
  sym('car-front', `<path d="M-100-6C-100-40-84-46-58-46H4C22-46 34-30 54-28L82-26C98-24 104-12 104 4V12C104 24 98 30 88 30H-88C-96 30-100 24-100 16Z" fill="${C.sky}"/><circle cx="94" cy="-6" r="8" fill="${C.sun}"/><rect x="-72" y="-22" width="54" height="10" rx="5" fill="#FFFFFF" opacity=".5"/><use href="#wheel" x="-58" y="30"/><use href="#wheel" x="62" y="30"/>`),
  sym('bubble', `<circle r="20" fill="#FFFFFF"/><path d="M-11-4A12 12 0 0 1-4-11" stroke="var(--bh,${C.sky})" stroke-width="3.2" fill="none" stroke-linecap="round"/>`),
  sym('spark', `<path d="M0-12C1.5-3 3-1.5 12 0C3 1.5 1.5 3 0 12C-1.5 3-3 1.5-12 0C-3-1.5-1.5-3 0-12Z" fill="#FFFFFF"/>`),
  sym('speech', `<path d="M-8-7H8A5 5 0 0 1 13-2V3A5 5 0 0 1 8 8H0L-6 12.5V8H-8A5 5 0 0 1-13 3V-2A5 5 0 0 1-8-7Z" fill="#FFFFFF"/>`),
];

// ---------- helpers ----------
const rad = d => d * Math.PI / 180;
// angle (deg) that rotates a down-pointing limb toward (dx,dy)
const aim = (dx, dy) => +(Math.atan2(-dx, dy) * 180 / Math.PI).toFixed(1);
const use = (id, tf = '', extra = '') => `<use href="#${id}" transform="${tf}" ${extra}/>`;

function vars(o) {
  return `--sk:${o.skin};--hr:${o.hair};--sh:${o.shirt};--pa:${o.pants};--so:${o.shoe};--hw:${o.hw || C.sun}`;
}
function hairBack(hs) { return hs === 'bob' ? use('hb-bob') : hs === 'long' ? use('hb-long') : ''; }
function hairFront(hs) { return hs === 'none' ? '' : use('h-' + hs); }

// Toddler. origin = hip. standing: feet bottom at +27 (so y = floor - 27*s)
function kid(o) {
  const d = Object.assign({ s: 1, flip: false, aL: 12, aR: -12, lL: 3, lR: -3, face: 'smile', tilt: 0, armsFront: false, legs: true, sock: null }, o);
  const legId = side => (d.sock === side ? 't-leg-sock' : 't-leg');
  const legs = d.legs ? use(legId('L'), `translate(-8,-4) rotate(${d.lL})`) + use(legId('R'), `translate(8,-4) rotate(${d.lR})`) : '';
  const arms = (d.hideL ? '' : use('t-arm', `translate(-14,-38) rotate(${d.aL})`)) + (d.hideR ? '' : use('t-arm', `translate(14,-38) rotate(${d.aR})`));
  const head = `<g transform="translate(0,-69) rotate(${d.tilt})">${hairBack(d.hs)}${use('t-head')}${use('face-' + d.face)}${hairFront(d.hs)}</g>`;
  const inner = (d.back || '') + legs + use('t-body') + (d.armsFront ? head + arms : arms + head) + (d.front || '');
  return `<g style="${vars(d)}" transform="translate(${d.x},${d.y}) scale(${d.flip ? -d.s : d.s},${d.s})">${inner}</g>`;
}
function kidHand(d, side) { // world position of hand center
  const f = d.flip ? -1 : 1, sx = side === 'L' ? -14 : 14, a = side === 'L' ? d.aL : d.aR, L = 26;
  return [d.x + f * d.s * (sx - L * Math.sin(rad(a))), d.y + d.s * (-38 + L * Math.cos(rad(a)))];
}

// Grown-up. origin = hip. standing: feet bottom at +81 (y = floor - 81*s). kneel: y = floor - 51*s. sit(legs forward): floor - 12*s. cross: floor - 14*s
const LEGS = { stand: [0, 0, 0, 0], kneel: [0, 90, 0, 90], sit: [-90, -90, -90, -90], chair: [-90, 0, -90, 0], kneel1: [-70, 0, 0, 90] };
function adult(o) {
  const d = Object.assign({ s: 1, flip: false, aL: 10, aR: -10, legs: 'stand', face: 'smile', tilt: 0, armsFront: false }, o);
  let legs = '';
  if (d.legs === 'cross') legs = use('g-lap', 'translate(0,0)');
  else if (d.legs !== 'none') {
    const [thL, shL, thR, shR] = Array.isArray(d.legs) ? d.legs : LEGS[d.legs];
    const shin = d.legs === 'kneel' ? 'g-shin-k' : 'g-shin';
    const leg = (x, th, sh) => `<g transform="translate(${x},-4) rotate(${th})">${use('g-thigh')}<g transform="translate(0,40) rotate(${sh - th})">${use(shin)}</g></g>`;
    legs = leg(-12, thL, shL) + leg(12, thR, shR);
  }
  const arms = (d.hideL ? '' : use('g-arm', `translate(-22,-80) rotate(${d.aL})`)) + (d.hideR ? '' : use('g-arm', `translate(22,-80) rotate(${d.aR})`));
  const head = `<g transform="translate(0,-126) scale(.92) rotate(${d.tilt})">${hairBack(d.hs)}${use('t-head')}${d.beard ? use('beard') : ''}${use('face-' + d.face)}${hairFront(d.hs)}</g>`;
  const inner = (d.back || '') + legs + use('g-neck') + use('g-body') + (d.armsFront ? head + arms : arms + head) + (d.front || '');
  return `<g style="${vars(d)}" transform="translate(${d.x},${d.y}) scale(${d.flip ? -d.s : d.s},${d.s})">${inner}</g>`;
}
function adultHand(d, side) {
  const f = d.flip ? -1 : 1, sx = side === 'L' ? -22 : 22, a = side === 'L' ? d.aL : d.aR, L = 51;
  return [d.x + f * d.s * (sx - L * Math.sin(rad(a))), d.y + d.s * (-80 + L * Math.cos(rad(a)))];
}
// angle for a limb so its hand points at a world target
function aimKid(d, side, tx, ty) { const f = d.flip ? -1 : 1; const sx = d.x + f * d.s * (side === 'L' ? -14 : 14), sy = d.y - 38 * d.s; return aim(f * (tx - sx), ty - sy); }
function aimAdult(d, side, tx, ty) { const f = d.flip ? -1 : 1; const sx = d.x + f * d.s * (side === 'L' ? -22 : 22), sy = d.y - 80 * d.s; return aim(f * (tx - sx), ty - sy); }
const bg = c => `<rect x="0" y="0" width="600" height="600" fill="${c}"/>`;
const circle = (cx, cy, r, c) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}"/>`;
const F = 474; // floor line (px)

// ---------- scenes (600 x 600 page incl. bleed) ----------
const scenes = {};

scenes.hi = () => {
  const k = Object.assign({}, KIDS.A, { x: 212, y: F - 27 * 1.5, s: 1.5, aL: 16, aR: -124, face: 'laugh' });
  const g = Object.assign({}, ADULTS.G1, { x: 402, y: F - 51 * 1.15, s: 1.15, flip: true, legs: 'kneel', aR: -148, aL: 12, face: 'laugh' });
  return bg(C.tSun) + circle(300, 330, 150, C.sun) + adult(g) + kid(k);
};

scenes.up = () => {
  // big up-arrow behind the child
  const arrow = `<path d="M226 196L322 302H274V600H178V302H130Z" fill="${C.sky}" stroke="${C.sky}" stroke-width="18" stroke-linejoin="round"/>`;
  const k = Object.assign({}, KIDS.E, { x: 226, y: F - 27 * 1.5 - 12, s: 1.5, aL: 142, aR: -142, face: 'laugh', lL: 8, lR: -8 });
  const g = Object.assign({}, ADULTS.G2, { x: 382, y: F - 81 * 1.04, s: 1.04, flip: true, aL: -24, face: 'laugh' });
  const kh = kidHand(k, 'R');
  g.aR = aimAdult(g, 'R', kh[0] + 22, kh[1] + 2);
  const lift = `<rect x="196" y="${F - 3}" width="22" height="7" rx="3.5" fill="${C.sky}"/><rect x="236" y="${F - 3}" width="22" height="7" rx="3.5" fill="${C.sky}"/>`;
  return bg(C.tSky) + arrow + lift + adult(g) + kid(k);
};

scenes.down = () => {
  const x0 = 196, y0 = 262, x1 = 440, y1 = 452;
  const ang = Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI, len = Math.hypot(x1 - x0, y1 - y0);
  const slide = `
    <rect x="140" y="250" width="16" height="${F - 250 + 4}" rx="8" fill="${C.tomato}"/>
    <rect x="${x0 - 10}" y="250" width="16" height="${F - 250 + 4}" rx="8" fill="${C.tomato}"/>
    ${[300, 350, 400, 450].map(y => `<rect x="146" y="${y}" width="${x0 - 146}" height="11" rx="5.5" fill="${C.tomato}"/>`).join('')}
    <rect x="132" y="246" width="${x0 - 116}" height="18" rx="9" fill="${C.tomato}"/>
    <g transform="translate(${x0},${y0}) rotate(${ang.toFixed(2)})"><rect x="-6" y="-13" width="${len + 40}" height="26" rx="13" fill="${C.sun}"/><rect x="-6" y="-20" width="${len + 40}" height="10" rx="5" fill="${C.tomato}"/></g>
    <rect x="${x1 + 8}" y="${y1}" width="14" height="${F - y1 + 4}" rx="7" fill="${C.tomato}"/>`;
  // child sitting on the ramp
  const t = 0.42, ux = Math.cos(rad(ang)), uy = Math.sin(rad(ang));
  const px = x0 + (x1 - x0) * t, py = y0 + (y1 - y0) * t;
  const s = 1.3;
  const k = Object.assign({}, KIDS.C, { x: px + uy * 14, y: py - ux * 14 - 4 * s, s, lL: aim(ux, uy), lR: aim(ux, uy) + 4, aL: 134, aR: -134, face: 'laugh', tilt: 0 });
  const hill = `<path d="M-40 ${F}C100 ${F - 40} 500 ${F - 40} 640 ${F}V720H-40Z" fill="${C.grass}"/>`;
  const g = Object.assign({}, ADULTS.G3, { x: 500, y: F - 51 * 0.98, s: 0.98, flip: true, legs: 'kneel', aL: 20, aR: -75, face: 'laugh' });
  return bg(C.tGrass) + circle(300, 318, 138, '#FFFFFF') + slide + kid(k) + adult(g);
};

function car(x, y, s, rider) {
  return `<g transform="translate(${x},${y}) scale(${s})">${use('car-back')}${rider || ''}${use('car-front')}</g>`;
}
scenes.go = () => {
  const cs = 1.05, cx = 340, cy = F - 54 * cs;
  const rider = kid(Object.assign({}, KIDS.D, { x: -38, y: -44, s: 1.22, lL: -80, lR: -80, aL: -40, aR: aim(56, -24), face: 'laugh', hideL: true }));
  const g = Object.assign({}, ADULTS.G3, { x: 160, y: F - 51 * 1.08, s: 1.08, legs: 'kneel', face: 'laugh' });
  g.aR = aimAdult(g, 'R', 244, 392); g.aL = aimAdult(g, 'L', 236, 420);
  const dust = `<circle cx="258" cy="${F - 8}" r="9" fill="${C.grass}"/><circle cx="240" cy="${F - 16}" r="6" fill="${C.grass}"/><circle cx="226" cy="${F - 6}" r="5" fill="${C.grass}"/>`;
  return bg(C.tGrass) + circle(318, 336, 142, C.grass) + adult(g) + car(cx, cy, cs, rider) + dust;
};

scenes.stop = () => {
  const cs = 1.05, cx = 250, cy = F - 54 * cs;
  const rider = kid(Object.assign({}, KIDS.D, { x: -38, y: -44, s: 1.22, lL: -80, lR: -80, aL: -40, aR: aim(56, -18), face: 'oh', hideL: true }));
  const g = Object.assign({}, ADULTS.G4, { x: 470, y: F - 81 * 1.0, s: 1.0, flip: true, aR: -150, aL: 10, face: 'smile' });
  const h = adultHand(g, 'R');
  const palm = `<g style="${vars(g)}" transform="translate(${h[0]},${h[1] - 4}) scale(1.25)">${use('palm')}</g>`;
  return bg(C.tTomato) + circle(300, 318, 150, C.tomato) + car(cx, cy, cs, rider) + adult(g) + palm;
};

scenes.ball = () => {
  const k = Object.assign({}, KIDS.C, { x: 168, y: F - 4 * 1.5, s: 1.5, lL: -80, lR: -76, aL: 24, face: 'laugh' });
  const g = Object.assign({}, ADULTS.G5, { x: 444, y: F - 12 * 1.05, s: 1.05, flip: true, legs: 'sit', aL: 20, face: 'laugh' });
  const bx = 300, by = F - 62;
  k.aR = aimKid(k, 'R', bx - 60, by - 4); g.aR = aimAdult(g, 'R', bx + 62, by - 10);
  const rug = `<ellipse cx="300" cy="${F}" rx="250" ry="26" fill="${C.plum}"/>`;
  return bg(C.tPlum) + circle(300, 318, 150, '#FFFFFF') + rug + adult(g) + use('ball', `translate(${bx},${by}) scale(1.24) rotate(-12)`) + kid(k);
};

scenes['uh-oh'] = () => {
  const k = Object.assign({}, KIDS.B, { x: 196, y: F - 27 * 1.7, s: 1.7, face: 'oh', armsFront: true });
  k.aL = aim(-2, -26); k.aR = aim(2, -26);
  const blocks = use('block-3', `translate(400,${F - 28})`) + use('block-1', `translate(460,${F - 28})`) +
    use('block-2', `translate(376,322) rotate(-24)`) + use('block-4', `translate(452,262) rotate(18)`) + use('block-1', 'translate(492,372) rotate(38)');
  const pops = `<rect x="416" y="214" width="8" height="18" rx="4" fill="${C.plum}" transform="rotate(-30 420 223)"/><rect x="494" y="220" width="8" height="18" rx="4" fill="${C.plum}" transform="rotate(30 498 229)"/><rect x="336" y="270" width="8" height="18" rx="4" fill="${C.plum}" transform="rotate(-60 340 279)"/>`;
  return bg(C.tSun) + circle(300, 318, 150, C.sun) + kid(k) + blocks + pops;
};

scenes.more = () => {
  const g = Object.assign({}, ADULTS.G3, { x: 150, y: F - 51 * 1.1, s: 1.1, legs: 'kneel', aR: -128, aL: 14, face: 'smile' });
  const h = adultHand(g, 'R');
  const wand = `<g transform="translate(${h[0]},${h[1]}) rotate(-35)"><rect x="-4" y="-46" width="8" height="54" rx="4" fill="${C.tomato}"/><circle cx="0" cy="-62" r="17" fill="${C.tomato}"/><circle cx="0" cy="-62" r="10" fill="${C.tGrass}"/></g>`;
  const k = Object.assign({}, KIDS.A, { x: 408, y: F - 27 * 1.5, s: 1.5, face: 'laugh', armsFront: true });
  k.aL = aim(8, 24.7); k.aR = aim(-8, 24.7);
  const bubbles = [[268, 230, 1.15], [322, 196, 0.8], [330, 268, 0.62], [470, 212, 0.95], [380, 232, 0.55], [512, 300, 0.6], [292, 330, 0.5]]
    .map(([x, y, s]) => use('bubble', `translate(${x},${y}) scale(${s})`)).join('');
  return bg(C.tGrass) + circle(300, 318, 150, C.grass) + adult(g) + wand + kid(k) + bubbles;
};

function highChair(cx, col) {
  return `
    <rect x="${cx - 64}" y="296" width="128" height="120" rx="32" fill="${col}"/>
    <rect x="${cx - 74}" y="404" width="15" height="${F - 404 + 2}" rx="7.5" fill="${col}" transform="rotate(9 ${cx - 66} 404)"/>
    <rect x="${cx + 59}" y="404" width="15" height="${F - 404 + 2}" rx="7.5" fill="${col}" transform="rotate(-9 ${cx + 66} 404)"/>
    <rect x="${cx - 52}" y="440" width="104" height="12" rx="6" fill="${col}"/>`;
}
scenes['all done'] = () => {
  const cx = 300;
  const k = Object.assign({}, KIDS.B, { x: cx, y: 398, s: 1.5, aL: 128, aR: -128, face: 'laugh', legs: false });
  const tray = `<rect x="${cx - 104}" y="388" width="208" height="22" rx="11" fill="#FFFFFF"/>`;
  const bowl = `<path d="M${cx - 92} 360H${cx - 32}C${cx - 32} 378 ${cx - 44} 388 ${cx - 62} 388C${cx - 80} 388 ${cx - 92} 378 ${cx - 92} 360Z" fill="${C.sky}"/>`;
  const cup = `<g transform="translate(${cx + 70},362) scale(.62)">${use('cup')}</g>`;
  return bg(C.tSun) + circle(300, 318, 150, C.sun) + highChair(cx, C.tomato) + kid(k) + tray + bowl + cup;
};

scenes.shoe = () => {
  const k = Object.assign({}, KIDS.E, { x: 204, y: F - 6 * 1.85, s: 1.85, lL: -84, lR: -78, face: 'laugh', sock: 'R', aL: 20 });
  const tx = 274, ty = 368;
  k.aR = aimKid(k, 'R', tx, ty);
  const h = kidHand(k, 'R');
  const shoeK = `<g style="--up:${C.tomato};--st:${C.sun}" transform="translate(${h[0] + 40},${h[1] - 6}) scale(1) rotate(-8)">${use('shoe')}</g>`;
  const hand = `<circle cx="${h[0]}" cy="${h[1]}" r="${6.2 * 1.85}" fill="${k.skin}"/>`;
  const bigShoe = `<g style="--up:${C.ink};--st:${C.sky}" transform="translate(448,${F - 24}) scale(1.08)">${use('shoe')}</g>`;
  const rug = `<ellipse cx="300" cy="${F}" rx="250" ry="26" fill="${C.sun}"/>`;
  return bg(C.tSky) + circle(300, 318, 150, C.sky) + rug + kid(k) + shoeK + hand + bigShoe;
};

scenes['bye-bye'] = () => {
  const door = `<rect x="352" y="196" width="160" height="${F - 196 + 2}" rx="14" fill="${C.plum}"/><rect x="368" y="212" width="128" height="${F - 212 + 2}" rx="8" fill="#FFFFFF"/>
    <path d="M368 212H420V${F + 2}H368Z" fill="${C.sky}"/><circle cx="410" cy="350" r="6" fill="${C.sun}"/>`;
  const g = Object.assign({}, ADULTS.G2, { x: 462, y: F - 81 * 0.98, s: 0.98, flip: true, aR: -150, aL: 10, face: 'laugh' });
  const k = Object.assign({}, KIDS.D, { x: 196, y: F - 27 * 1.5, s: 1.5, aL: 14, aR: -122, face: 'laugh' });
  const dog = `<g style="--dg:${C.sun};--ear:${C.tomato}" transform="translate(290,${F - 34}) scale(.95) scale(-1,1)">${use('dog')}</g>`;
  return bg(C.tPlum) + door + adult(g) + kid(k) + dog;
};

scenes.book = () => {
  const g = Object.assign({}, ADULTS.G4, { x: 332, y: F - 14 * 1.22, s: 1.22, legs: 'cross', face: 'smile', aL: 30, aR: -10 });
  const k = Object.assign({}, KIDS.A, { x: 250, y: 446, s: 1.25, legs: false, face: 'laugh', aL: 10, aR: -10 });
  const bx = 304, by = 438, bs = 0.86;
  g.aR = aimAdult(g, 'R', bx + 70, by - 8);
  const gh = adultHand(g, 'R');
  const bk = `<g style="--bc:${C.grass}" transform="translate(${bx},${by}) scale(${bs})">${use('book-open')}
      <g transform="translate(-44,6) scale(.62)">${use('duck')}</g><g transform="translate(46,0) scale(.44)">${use('ball')}</g></g>`;
  const hands = `<circle cx="${bx - 76}" cy="${by - 14}" r="8.5" fill="${k.skin}"/><circle cx="${gh[0]}" cy="${gh[1]}" r="10" fill="${g.skin}"/>`;
  return bg(C.tSun) + circle(300, 318, 150, C.sun) + adult(g) + kid(k) + bk + hands;
};

scenes.hug = () => {
  const heart = use('heart', 'translate(304,226) scale(.9)');
  const g = Object.assign({}, ADULTS.G1, { x: 356, y: F - 51 * 1.18, s: 1.18, legs: 'kneel', flip: true, face: 'laugh', tilt: 10, hideR: true, aL: 14 });
  const k = Object.assign({}, KIDS.C, { x: 262, y: F - 27 * 1.45, s: 1.45, face: 'joy', tilt: 12, aL: 16, hideR: true });
  const ga = [356 - 22 * 1.18, g.y - 80 * 1.18]; // grown-up front shoulder
  const gArm = `<path d="M${ga[0]} ${ga[1] + 4}C${ga[0] - 24} ${ga[1] + 30} ${ga[0] - 64} ${ga[1] + 46} ${k.x + 8} ${k.y - 54}" stroke="${g.shirt}" stroke-width="18" stroke-linecap="round" fill="none"/>
    <path d="M${k.x + 10} ${k.y - 54}Q${k.x - 6} ${k.y - 58} ${k.x - 20} ${k.y - 54}" stroke="${g.skin}" stroke-width="15" stroke-linecap="round" fill="none"/><circle cx="${k.x - 23}" cy="${k.y - 53}" r="10" fill="${g.skin}"/>`;
  const ks = [k.x + 14 * 1.45, k.y - 38 * 1.45];
  const kArm = `<path d="M${ks[0]} ${ks[1]}L${ks[0] + 18} ${ks[1] + 4}" stroke="${k.shirt}" stroke-width="16" stroke-linecap="round"/><path d="M${ks[0] + 14} ${ks[1] + 3}L${ks[0] + 56} ${ks[1] + 10}" stroke="${k.skin}" stroke-width="13" stroke-linecap="round"/><circle cx="${ks[0] + 58}" cy="${ks[1] + 10}" r="9" fill="${k.skin}"/>`;
  return bg(C.tTomato) + heart + adult(g) + kid(k) + kArm + gArm;
};

scenes['night-night'] = () => {
  const bedX = 312;
  const stars = [[110, 240, 1], [160, 205, .7], [520, 330, .8], [440, 196, .6], [96, 330, .6]].map(([x, y, s]) => use('star', `translate(${x},${y}) scale(${s})`)).join('');
  const moon = use('moon', 'translate(470,254) scale(1.0)');
  const k = Object.assign({}, KIDS.B, { x: bedX - 4, y: 420, s: 1.3, face: 'sleep', legs: false, aL: 8, aR: -8, tilt: -8 });
  const bed = `
    <rect x="${bedX - 150}" y="298" width="36" height="${F - 298 + 4}" rx="16" fill="${C.sky}"/>
    <rect x="${bedX + 118}" y="360" width="30" height="${F - 360 + 4}" rx="14" fill="${C.sky}"/>
    <rect x="${bedX - 126}" y="296" width="96" height="46" rx="23" fill="#FFFFFF"/>`;
  const blanket = `<path d="M${bedX - 132} 372C${bedX - 132} 356 ${bedX - 118} 346 ${bedX - 100} 346H${bedX + 124}C${bedX + 138} 346 ${bedX + 146} 358 ${bedX + 146} 372V440C${bedX + 146} 452 ${bedX + 138} 460 ${bedX + 126} 460H${bedX - 112}C${bedX - 124} 460 ${bedX - 132} 452 ${bedX - 132} 440Z" fill="${C.plum}"/>
    ${[0, 1, 2, 3].map(i => `<circle cx="${bedX - 70 + i * 60}" cy="408" r="9" fill="${C.tPlum}" opacity=".45"/>`).join('')}`;
  const duck = use('duck', `translate(${bedX + 92},336) scale(.72)`);
  const shelf = `<rect x="58" y="424" width="84" height="52" rx="10" fill="${C.sky}"/>`;
  const tab = `<g transform="translate(100,396) scale(.52) rotate(-8)">${use('tablet-sleeping')}</g>`;
  const zz = `<text x="124" y="352" font-family="Fredoka, sans-serif" font-weight="600" font-size="20" fill="${C.wash}">z</text><text x="136" y="336" font-family="Fredoka, sans-serif" font-weight="600" font-size="14" fill="${C.wash}">z</text>`;
  // child's head on pillow: draw child (head/torso), then blanket covers body
  const kidHead = kid(Object.assign({}, k, { x: bedX - 78, y: 400, aL: 40, aR: -40 }));
  return bg(C.ink) + stars + moon + bed + kidHead + blanket + duck + shelf + tab + zz;
};
