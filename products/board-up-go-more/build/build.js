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
  C: { skin: SK[2], hair: HR[1], hs: 'curly', shirt: C.sky, pants: C.ink, shoe: C.grass, aid: true }, // hearing aid (inclusive cast, customer-voice rule 35)
  D: { skin: SK[4], hair: HR[4], hs: 'short', shirt: C.sun, pants: C.grass, shoe: C.sky },
  E: { skin: SK[1], hair: HR[2], hs: 'bob', shirt: C.plum, pants: C.tomato, shoe: C.ink },
};
const ADULTS = {
  G1: { skin: SK[5], hair: HR[0], hs: 'short', shirt: C.grass, pants: C.ink, shoe: C.tomato },
  G2: { skin: SK[1], hair: HR[1], hs: 'bun', shirt: C.tomato, pants: C.sky, shoe: C.ink },
  G3: { skin: SK[0], hair: HR[3], hs: 'long', shirt: C.sky, pants: C.ink, shoe: C.sun },
  G4: { skin: SK[2], hair: C.wash, hs: 'bun', shirt: C.plum, pants: C.sky, shoe: C.tomato, glasses: true },
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
  sym('glasses', `<circle cx="-8.5" cy="-1" r="7.2" stroke="${I}" stroke-width="2.2" fill="none"/><circle cx="8.5" cy="-1" r="7.2" stroke="${I}" stroke-width="2.2" fill="none"/><path d="M-1.6-2Q0-3.6 1.6-2" stroke="${I}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`),
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
  const aid = d.aid ? `<path d="M24.5-9C31.5-8.5 32 2 27 6.5" stroke="${C.plum}" stroke-width="4.6" fill="none" stroke-linecap="round"/><circle cx="22.5" cy="3" r="2.6" fill="${C.plum}"/>` : '';
  const head = `<g transform="translate(0,-69) rotate(${d.tilt})">${hairBack(d.hs)}${use('t-head')}${use('face-' + d.face)}${hairFront(d.hs)}${aid}</g>`;
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
  const head = `<g transform="translate(0,-126) scale(.92) rotate(${d.tilt})">${hairBack(d.hs)}${use('t-head')}${d.beard ? use('beard') : ''}${use('face-' + d.face)}${d.glasses ? use('glasses') : ''}${hairFront(d.hs)}</g>`;
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
  const arrow = `<path d="M226 196L322 302H274V720H178V302H130Z" fill="${C.sky}" stroke="${C.sky}" stroke-width="18" stroke-linejoin="round"/>`;
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
    use('block-2', `translate(376,322) rotate(-6)`) + use('block-4', `translate(452,262) rotate(18)`) + use('block-1', 'translate(492,372) rotate(38)');
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

// ---------- new scenes (revision 2: 22 words) ----------
scenes.peekaboo = () => {
  const s = 1.55, kc = KIDS.E;
  // both hands over the eyes (the classic peekaboo), smile peeking out below
  const arm = f => `<path d="M${f * 14}-40L${f * 17}-47" stroke="${kc.shirt}" stroke-width="11" stroke-linecap="round" fill="none"/>` +
    `<path d="M${f * 17}-46Q${f * 20}-56 ${f * 12}-63" stroke="${kc.skin}" stroke-width="9" stroke-linecap="round" fill="none"/>` +
    `<g transform="translate(${f * 9.8},-70) scale(${f * 0.86},0.86)">${use('palm')}</g>`; // fingers up against the hair so the hands read as hands
  const k = Object.assign({}, kc, { x: 214, y: F - 27 * s, s, face: 'laugh', hideL: true, hideR: true, front: arm(-1) + arm(1) });
  const g = Object.assign({}, ADULTS.G5, { x: 418, y: F - 51 * 1.12, s: 1.12, flip: true, legs: 'kneel', aL: 118, aR: -118, face: 'laugh' });
  const pops = [[330, 236, -20], [512, 250, 24], [300, 300, -60]].map(([x, y, r]) => `<rect x="${x}" y="${y}" width="8" height="20" rx="4" fill="${C.sky}" transform="rotate(${r} ${x + 4} ${y + 10})"/>`).join('');
  return bg(C.tSky) + circle(300, 318, 150, '#FFFFFF') + adult(g) + kid(k) + pops;
};

scenes.wow = () => {
  const sunX = 432, sunY = 262;
  const k = Object.assign({}, KIDS.C, { x: 262, y: F - 27 * 1.55, s: 1.55, face: 'oh', aL: 14 });
  k.aR = aimKid(k, 'R', sunX - 40, sunY + 30);
  const g = Object.assign({}, ADULTS.G2, { x: 128, y: F - 81 * 1.02, s: 1.02, face: 'oh', aL: 10 });
  g.aR = aimAdult(g, 'R', 206, 330);
  return bg(C.tSun) + circle(300, 318, 150, '#FFFFFF') + use('sun', `translate(${sunX},${sunY}) scale(.92)`) + adult(g) + kid(k);
};

scenes.in = () => {
  const bx = 392;
  const bucket = `<path d="M${bx - 78} 344H${bx + 78}L${bx + 62} ${F}H${bx - 62}Z" fill="${C.sky}"/>
    <rect x="${bx - 88}" y="330" width="176" height="24" rx="12" fill="${C.ink}"/>
    <path d="M${bx - 74} 336Q${bx} 226 ${bx + 74} 336" stroke="${C.ink}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  const inside = use('block-3', `translate(${bx - 34},326) scale(.7) rotate(-10)`) + use('block-4', `translate(${bx + 30},322) scale(.7) rotate(12)`);
  const k = Object.assign({}, KIDS.D, { x: 176, y: F - 4 * 1.5, s: 1.5, lL: -80, lR: -76, aL: 24, face: 'laugh' });
  k.aR = aimKid(k, 'R', bx - 40, 256);
  const h = kidHand(k, 'R');
  const held = use('block-1', `translate(${h[0] + 24},${h[1] - 4}) scale(.68) rotate(8)`);
  const hand = `<circle cx="${h[0]}" cy="${h[1]}" r="${6.2 * 1.5}" fill="${k.skin}"/>`;
  const plop = [[bx - 14, 236, -14], [bx + 20, 232, 14]].map(([x, y, r]) => `<rect x="${x}" y="${y}" width="7" height="18" rx="3.5" fill="${C.sky}" transform="rotate(${r} ${x} ${y})"/>`).join('');
  const rug = `<ellipse cx="300" cy="${F}" rx="250" ry="24" fill="${C.sun}"/>`;
  return bg(C.tSky) + circle(300, 318, 150, '#FFFFFF') + rug + inside + bucket + kid(k) + held + hand + plop;
};

scenes.open = () => {
  const bx = 400, top = 356;
  const duck = use('duck', `translate(${bx + 6},${top - 14}) scale(1.2)`);
  const box = `<rect x="${bx - 80}" y="${top}" width="160" height="${F - top}" rx="12" fill="${C.tomato}"/>
    <rect x="${bx - 14}" y="${top}" width="28" height="${F - top}" fill="${C.sun}"/>`;
  const lid = `<path d="M${bx - 80} ${top + 2}L${bx - 6} ${top + 2}L${bx - 36} ${top - 44}Q${bx - 40} ${top - 50} ${bx - 48} ${top - 48}L${bx - 110} ${top - 30}Q${bx - 118} ${top - 26} ${bx - 112} ${top - 18}Z" fill="${C.tomato}"/>
    <path d="M${bx + 80} ${top + 2}L${bx + 6} ${top + 2}L${bx + 36} ${top - 44}Q${bx + 40} ${top - 50} ${bx + 48} ${top - 48}L${bx + 110} ${top - 30}Q${bx + 118} ${top - 26} ${bx + 112} ${top - 18}Z" fill="${C.tomato}"/>
    <rect x="${bx - 76}" y="${top - 8}" width="152" height="16" rx="8" fill="${C.ink}"/>`;
  const k = Object.assign({}, KIDS.A, { x: 190, y: F - 27 * 1.5, s: 1.5, aL: 142, aR: -142, face: 'laugh', lL: 6, lR: -6 });
  const sparks = [[bx - 70, 250, .9], [bx + 76, 232, .7], [bx - 18, 214, .55]].map(([x, y, s]) => `<g transform="translate(${x},${y}) scale(${s})"><use href="#star"/></g>`).join('');
  const rug = `<ellipse cx="300" cy="${F}" rx="250" ry="24" fill="${C.plum}"/>`;
  return bg(C.tTomato) + circle(300, 318, 150, '#FFFFFF') + rug + lid + duck + box + kid(k) + sparks;
};

scenes.help = () => {
  const shelf = `<rect x="378" y="252" width="168" height="16" rx="8" fill="${C.plum}"/><rect x="516" y="252" width="16" height="${F - 252 + 2}" rx="8" fill="${C.plum}"/>`;
  const duck = use('duck', 'translate(456,222) scale(.95)');
  const k = Object.assign({}, KIDS.B, { x: 414, y: F - 27 * 1.5, s: 1.5, face: 'oh', aL: 14, lL: 4, lR: -4 });
  k.aR = aimKid(k, 'R', 520, 318); // reaching up toward the toy: a reach is asking
  const g = Object.assign({}, ADULTS.G1, { x: 196, y: F - 51 * 1.12, s: 1.12, legs: 'kneel', face: 'smile', aL: 12, aR: -34 }); // waiting, hand open
  return bg(C.tGrass) + circle(300, 318, 150, '#FFFFFF') + shelf + duck + adult(g) + kid(k);
};

scenes.clap = () => {
  const k = Object.assign({}, KIDS.A, { x: 206, y: F - 27 * 1.6, s: 1.6, face: 'laugh', aL: aim(11, 16), aR: aim(-11, 16) });
  const g = Object.assign({}, ADULTS.G4, { x: 420, y: F - 14 * 1.2, s: 1.2, flip: true, legs: 'cross', face: 'laugh', aL: aim(18, 40), aR: aim(-18, 40) });
  const mk = (cx, cy, sp) => [-110, -70, 70, 110].map(a => `<rect x="${cx - 3.5}" y="${cy - sp - 15}" width="7" height="15" rx="3.5" fill="${C.plum}" transform="rotate(${a} ${cx} ${cy})"/>`).join('');
  const kh = [206, F - 27 * 1.6 - 14.6 * 1.6];
  const gh = [420, F - 14 * 1.2 - 33.5 * 1.2];
  return bg(C.tPlum) + circle(300, 318, 150, '#FFFFFF') + adult(g) + kid(k) + mk(kh[0], kh[1], 40) + mk(gh[0], gh[1], 44);
};

scenes.eat = () => {
  const cx = 300, s = 1.5;
  const k = Object.assign({}, KIDS.D, { x: cx, y: 398, s, aL: 18, face: 'oh', legs: false });
  k.aR = aim(-2, -18);
  const h = kidHand(k, 'R');
  const mouth = [cx + 5 * s, 398 - 58 * s];
  const ang = Math.atan2(mouth[1] - h[1], mouth[0] - h[0]) * 180 / Math.PI;
  const spoon = `<g transform="translate(${h[0]},${h[1]}) rotate(${ang.toFixed(1)})"><rect x="-4" y="-3.5" width="30" height="7" rx="3.5" fill="${C.plum}"/><ellipse cx="30" cy="0" rx="10" ry="7.5" fill="${C.plum}"/></g>`;
  const hand = `<circle cx="${h[0]}" cy="${h[1]}" r="${6.2 * s}" fill="${k.skin}"/>`;
  const tray = `<rect x="${cx - 104}" y="388" width="208" height="22" rx="11" fill="#FFFFFF"/>`;
  const bowl = `<path d="M${cx - 92} 360H${cx - 32}C${cx - 32} 378 ${cx - 44} 388 ${cx - 62} 388C${cx - 80} 388 ${cx - 92} 378 ${cx - 92} 360Z" fill="${C.grass}"/>`;
  return bg(C.tTomato) + circle(300, 318, 150, '#FFFFFF') + highChair(cx, C.sky) + kid(k) + tray + bowl + spoon + hand;
};

scenes.cup = () => {
  const s = 1.7, x = 254, y = F - 27 * s;
  const k = Object.assign({}, KIDS.C, { x, y, s, face: 'joy' });
  const cupC = [x + 34, y - 58 * s + 42];
  k.aL = aimKid(k, 'L', cupC[0] - 24, cupC[1] + 14); k.aR = aimKid(k, 'R', cupC[0] + 26, cupC[1] + 6);
  const cup = `<g style="--c1:${C.tomato};--c2:${C.sun}" transform="translate(${cupC[0]},${cupC[1]}) rotate(-38) scale(1.05)">${use('cup')}</g>`;
  const hl = kidHand(k, 'L'), hr = kidHand(k, 'R');
  const hands = `<circle cx="${hl[0]}" cy="${hl[1]}" r="${6.2 * s}" fill="${k.skin}"/><circle cx="${hr[0]}" cy="${hr[1]}" r="${6.2 * s}" fill="${k.skin}"/>`;
  const drops = `<circle cx="${x + 96}" cy="${cupC[1] - 70}" r="7" fill="${C.sky}"/><circle cx="${x + 118}" cy="${cupC[1] - 46}" r="5" fill="${C.sky}"/>`;
  const duck = use('duck', `translate(446,${F - 26}) scale(1.05)`);
  const rug = `<ellipse cx="300" cy="${F}" rx="250" ry="24" fill="${C.grass}"/>`;
  return bg(C.tSky) + circle(300, 318, 150, '#FFFFFF') + rug + duck + kid(k) + cup + hands + drops;
};

// ---------- manuscript (the founder's words live in manuscript.json) ----------
const MS = JSON.parse(fs.readFileSync(path.join(__dirname, 'manuscript.json'), 'utf8'));
const PRINT_READY = process.env.PRINT_READY === '1';
if (PRINT_READY) {
  const open = MS.words.filter(w => !w.founder_rewritten).map(w => w.w);
  if (open.length || !MS.note_to_grownups.founder_rewritten || !MS.author_credit)
    throw new Error('PRINT_READY refused: founder has not rewritten/approved: ' + [...open, !MS.note_to_grownups.founder_rewritten ? 'note_to_grownups' : '', !MS.author_credit ? 'author_credit' : ''].filter(Boolean).join(', '));
}
const WORDS = MS.words.map(p => Object.assign({}, p, { acc: C[p.acc] }));
const N = WORDS.length;
WORDS.forEach(p => {
  if (!scenes[p.w]) throw new Error('No picture drawn for word: ' + p.w);
  const n = (p.tip[0] + ' ' + p.tip[1]).replace(/[“”"…:!?,.()]/g, ' ').split(/\s+/).filter(Boolean).length;
  if (n > 24) throw new Error(`Tip too long on "${p.w}": ${n} words`);
  if (p.cue[1].split(/\s+/).length > 7) throw new Error(`Cue too long on "${p.w}"`);
});
const WORDNUM = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four'];
const QR = JSON.parse(fs.readFileSync(path.join(__dirname, 'qr.json'), 'utf8'));
const BONUS = 'playbeforepixels.com/bonus/board-up-go-more';
const qrSvg = (px) => `<svg class="qr" viewBox="-4 -4 ${QR.n + 8} ${QR.n + 8}" width="${px}" height="${px}" shape-rendering="crispEdges" aria-label="QR code to ${BONUS}"><rect x="-4" y="-4" width="${QR.n + 8}" height="${QR.n + 8}" fill="#FFFFFF"/><path d="${QR.d}" fill="${C.ink}"/></svg>`;

// ---------- shared bits ----------
const defs = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${SYMBOLS.join('\n')}</defs></svg>`;
const ICON = {
  say: `<svg viewBox="-16 -16 32 32" aria-hidden="true"><circle r="16" fill="currentColor"/><use href="#speech"/></svg>`,
  sign: `<svg viewBox="-16 -16 32 32" aria-hidden="true"><circle r="16" fill="currentColor"/><g style="--sk:#FFFFFF" transform="translate(-1.5,2) scale(.62)"><use href="#palm"/></g></svg>`,
  act: `<svg viewBox="-16 -16 32 32" aria-hidden="true"><circle r="16" fill="currentColor"/><g transform="scale(.82)"><use href="#spark"/></g></svg>`,
};
const CUE_LABEL = { say: 'Say it', sign: 'Sign it', act: 'Act it' };
const slot = (label) => `<span class="slot">${label}</span>`;
const seriesPill = (dark) => `<span class="spill${dark ? ' dk' : ''}"><b>${MS.series}</b><i>Book ${MS.series_number}</i></span>`;
const logo = (rel, variant = 'reverse', h = 34) => `<img class="logo" style="height:${h}px" src="${rel}brand/logo/lockup-horizontal${variant ? '-' + variant : ''}.svg" alt="Play Before Pixels">`;
const VERSION = 'Version 1.0 · September 2026';
const COPYRIGHT = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.';
// Byline: the brand credit "Play Before Pixels" until the founder sets author_credit in manuscript.json
// (brand byline until counsel answers REVENUE-PLAN Q9; see ../founder-notes.md). No placeholder prints.
const authorLine = () => `<span>${MS.author_credit || 'Play Before Pixels'}</span>`;
// Printer lines (ISBNs, country of printing, batch/tracking number) print only once they exist, from an optional
// "print_lines" object in manuscript.json: { "isbn_board", "isbn_paperback", "printed_in", "batch" }.
const PL = MS.print_lines || {};
if (!PL.printed_in || !PL.batch) console.warn('NOTE: board book has no "Printed in" or batch/tracking line yet (manuscript.json print_lines). An offset print run of a children\'s book needs both (CPSIA tracking label, UNVERIFIED); see ../founder-notes.md.');

// ---------- word page ----------
function wordArt(p) {
  const art = scenes[p.w]();
  const bgc = (art.match(/fill="(#[0-9A-Fa-f]{6})"/) || [])[1] || '#FFFFFF';
  // shrink the drawing 8% toward the top-centre so the talk card fits under the floor line
  return `<rect x="-20" y="-20" width="640" height="640" fill="${bgc}"/><g transform="translate(300,180) scale(.92) translate(-300,-180)">${art}</g>`;
}
function wordPage(p) {
  const [type, cue] = p.cue;
  return {
    cls: `word-page${p.dark ? ' dark' : ''}`, html: `
  <svg class="art" viewBox="0 0 600 600" preserveAspectRatio="none" role="img" aria-label="${p.w}">${wordArt(p)}</svg>
  <h2 class="word" style="font-size:${p.fs}px">${p.w}</h2>
  <div class="card${p.acc === C.sun ? ' lt' : ''}" style="--acc:${p.acc}">
    <div class="cue"><span class="chip">${ICON[type]}${CUE_LABEL[type]}</span><span class="cue-tx">${cue}</span></div>
    <p class="tip"><span class="lab">Grown-up tip</span> <strong>${p.tip[0]}</strong> ${p.tip[1]}</p>
  </div>`
  };
}

// ---------- cover ----------
function coverArt() {
  const k = Object.assign({}, KIDS.A, { x: 420, y: 470 - 27 * 1.56, s: 1.56, aL: 128, aR: -128, face: 'laugh' });
  const ball = use('ball', 'translate(503,432) scale(.56) rotate(14)');
  return bg(C.sun) + circle(420, 380, 146, '#FFFFFF') + `<rect x="-10" y="470" width="620" height="140" fill="${C.ink}"/>` + kid(k) + ball;
}
const cover = (rel) => ({
  cls: 'cover', html: `
  <svg class="art" viewBox="0 0 600 600" preserveAspectRatio="none" role="img" aria-label="A toddler with arms up, laughing">${coverArt()}</svg>
  ${seriesPill()}
  <h1 class="ctitle"><span>Up<i>!</i></span><span>Go<i>!</i></span><span>More<i>!</i></span></h1>
  <div class="count"><b>${N}</b><span>first words to say, sign and act out</span></div>
  <div class="badge"><span>A grown-up tip</span><b>on every page</b></div>
  <div class="cband">${logo(rel)}<span class="age"><b>0–3</b> years</span></div>`
});

// ---------- how to read (board inside front cover / paperback p4) ----------
const howTo = (belongs) => ({
  cls: 'inner howto', html: `
  <div class="in">
    <h2 class="ptitle">How to read this book together</h2>
    <div class="cues3">${['say', 'sign', 'act'].map((t, i) => `<div class="c3" style="--acc:${[C.tomato, C.grass, C.plum][i]}">${ICON[t]}<b>${CUE_LABEL[t]}</b><span>${MS.cue_types[t]}</span></div>`).join('')}</div>
    <ol class="steps">
      <li style="--c:${C.tomato}"><b>Go slow.</b> One word per page. Say it, point to the picture, then pause.</li>
      <li style="--c:${C.sun};--n:${C.ink}"><b>Wait for a turn.</b> Count to five in your head. A look, a point, a sign, a sound or a tap on a talking device is your child’s turn.</li>
      <li style="--c:${C.sky}"><b>Copy each other.</b> Try the say it, sign it or act it idea. Then copy whatever your child does back.</li>
      <li style="--c:${C.grass}"><b>Pick any tip, skip any tip.</b> It’s their book: skip ahead, go back, or stay on one page.</li>
    </ol>
    <svg class="strip" viewBox="0 0 504 96" aria-hidden="true">
      <circle cx="46" cy="48" r="44" fill="${C.tTomato}"/><g transform="translate(46,50) scale(.62)">${use('ball')}</g>
      <circle cx="148" cy="48" r="44" fill="${C.tSun}"/><g transform="translate(152,54) scale(.8)">${use('duck')}</g>
      <circle cx="252" cy="48" r="44" fill="${C.tSky}"/><g style="--up:${C.sky};--st:${C.ink}" transform="translate(252,50) scale(.62)">${use('shoe')}</g>
      <circle cx="356" cy="48" r="44" fill="${C.tGrass}"/><g style="--bc:${C.grass}" transform="translate(356,48) scale(.9)">${use('book-closed')}</g>
      <circle cx="458" cy="48" r="44" fill="${C.tPlum}"/><g transform="translate(458,54) scale(.7)">${use('cup')}</g>
    </svg>
    <p class="note">Every child talks on their own timeline. If you have questions about your child’s speech or development, your child’s doctor is a good place to start. Talk, sing and read in the language you know best. Every language counts.</p>
    ${belongs ? '<p class="belongs"><span>This book belongs to</span><i></i></p>' : ''}
  </div>`
});

// ---------- routines (board inside back cover / paperback p27) ----------
const routinesPage = (withLegal) => ({
  cls: 'inner routines-pg', html: `
  <div class="in">
    <h2 class="ptitle">Keep the words going</h2>
    <p class="lede">Use these words again and again, in the same moments each day.</p>
    <div class="routines">${MS.routines.map(([t, ws, c]) => `<div class="rt" style="--c:${C[c]};--t:${C['t' + c[0].toUpperCase() + c.slice(1)]}"><span class="rtl">${t}</span><span class="chips">${ws.map(w => `<em>${w}</em>`).join('')}</span></div>`).join('')}</div>
    <p class="note">No screen needed. Just the two of you, and a little time to wait.</p>
    ${withLegal ? `<div class="legal">
      <p><b>Up! Go! More!</b> · ${MS.series}, Book ${MS.series_number} · Board book edition · ${authorLine()}</p>
      <p>${COPYRIGHT} All rights reserved. First edition · ${VERSION}.</p>
      <p>${[PL.isbn_board ? `ISBN ${PL.isbn_board}` : '', PL.printed_in ? `Printed in ${PL.printed_in}` : '', PL.batch ? `Batch ${PL.batch}` : '', 'playbeforepixels.com'].filter(Boolean).join(' · ')}</p>
    </div>` : ''}
  </div>`
});

// ---------- mini covers + series ----------
function miniCover(b) {
  const bgc = [C.sun, C.grass, C.sky][b.n - 1];
  const art = b.n === 1 ? use('ball', 'translate(74,74) scale(.34)') : b.n === 2 ? `<g style="--dg:${C.sun};--ear:${C.tomato}" transform="translate(84,82) scale(.46)">${use('dog')}</g>` : use('duck', 'translate(76,76) scale(.62)');
  return `<div class="mini" style="--bg:${bgc}"><svg viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" fill="${bgc}"/><circle cx="76" cy="72" r="26" fill="#FFFFFF"/>${art}<rect y="88" width="100" height="12" fill="${C.ink}"/></svg>
    <span class="mt">${b.title.map(t => `<span>${t}</span>`).join('')}</span><span class="mn">${b.n}</span></div>`;
}
const seriesStrip = () => `<div class="series"><p class="slab">Collect the ${MS.series} series</p><div class="books">${MS.series_books.map(b => `<div class="sb">${miniCover(b)}<b>Book ${b.n} · ${b.theme}</b><small>${b.status === 'this book' ? 'You are holding it' : 'Coming soon'}</small></div>`).join('')}</div></div>`;

// ---------- back cover ----------
function backArt() {
  return bg(C.tSky) + `<rect x="-10" y="432" width="620" height="200" fill="${C.ink}"/>` + circle(470, 150, 84, C.sun) +
    kid(Object.assign({}, KIDS.A, { x: 470, y: 226 - 27 * .95, s: .95, aL: 16, aR: -122, face: 'laugh' }));
}
const back = (rel) => ({
  cls: 'back', html: `
  <svg class="art" viewBox="0 0 600 600" preserveAspectRatio="none" aria-hidden="true">${backArt()}</svg>
  <div class="back-in">
    <h2 class="btitle">Up! Go! More!</h2>
    <p class="blurb">${WORDNUM[N][0].toUpperCase() + WORDNUM[N].slice(1)} first words, one per page, from <b>hi</b> to <b>night-night</b>. Every page has one big picture, one thing to <b>say, sign or act out</b> together, and a <b>grown-up tip</b> that turns reading into a back-and-forth chat.</p>
    <p class="blurb2">Made for laps and back-and-forth.</p>
    <p class="bage"><b>Ages 0–3</b> Read together · ${N} words · a tip on every page</p>
  </div>
  ${seriesStrip()}
  <div class="bband">
    ${logo(rel, 'reverse', 26)}
    <div class="bonus">${qrSvg(62)}<span><b>Free grown-up bonus</b>playbeforepixels.com/<br>bonus/board-up-go-more<small>Published by Play Before Pixels / AlphaPlay LLC</small></span></div>
  </div>
  <div class="isbn final" aria-hidden="true"></div>`
});

// ---------- paperback-only pages ----------
const titlePage = (rel) => ({
  cls: 'inner title-pg', html: `
  <div class="in center">
    ${seriesPill()}
    <h1 class="ttl">Up! Go! More!</h1>
    <p class="tsub">${N} first words to say, sign and act out</p>
    <svg class="tart" viewBox="0 0 200 150" aria-hidden="true"><circle cx="100" cy="80" r="66" fill="${C.tSun}"/>${kid(Object.assign({}, KIDS.A, { x: 100, y: 146 - 27 * .9, s: .9, aL: 128, aR: -128, face: 'laugh' }))}</svg>
    <p class="by">${authorLine()}</p>
    <div class="gift"><span>A gift for</span><i></i><span>With love from</span><i></i></div>
    <div class="tlogo">${logo(rel, '', 30)}</div>
  </div>`
});
const copyrightPage = () => ({
  cls: 'inner copy-pg', html: `
  <p class="dedi" data-founder="rewrite">For every little voice,<br>and the grown-ups who wait for it.</p>
  <div class="in bottom">
    <p><b>Up! Go! More!</b><br>${N} first words to say, sign and act out<br>${MS.series}, Book ${MS.series_number} · Talk-along paperback edition</p>
    <p>${authorLine()}</p>
    <p>${COPYRIGHT}<br>All rights reserved. No part of this book may be copied or shared in any form without written permission, except short quotes in reviews.</p>
    <p>This book is for reading together. It shares everyday play and talk ideas for families. It is not medical or developmental advice; for questions about your child, talk with your child’s doctor.</p>
    <p>Paper pages: read together and keep away from mouths.</p>
    <p>${PL.isbn_paperback ? `ISBN ${PL.isbn_paperback}<br>` : ''}First edition · ${VERSION}</p>
    <p>playbeforepixels.com</p>
  </div>`
});
const noteDraft = MS.note_to_grownups;
const notePage = () => ({
  cls: 'inner note-pg', html: `
  <div class="in">
    <h2 class="ptitle">${noteDraft.heading}</h2>
    <div class="notebody">
      ${noteDraft.draft.map(t => `<p>${t}</p>`).join('')}
      <p class="sig">${authorLine()}</p>
    </div>
    <svg class="noteart" viewBox="0 0 504 110" aria-hidden="true">
      <circle cx="60" cy="56" r="50" fill="${C.tTomato}"/><g transform="translate(60,58) scale(.72)">${use('ball')}</g>
      <circle cx="188" cy="56" r="50" fill="${C.tSun}"/><g transform="translate(192,62) scale(.9)">${use('duck')}</g>
      <circle cx="316" cy="56" r="50" fill="${C.tGrass}"/><g style="--bc:${C.grass}" transform="translate(316,56)">${use('book-closed')}</g>
      <circle cx="444" cy="56" r="50" fill="${C.tPlum}"/><g style="--hc:${C.plum}" transform="translate(444,60) scale(.8)">${use('heart')}</g>
    </svg>
  </div>`
});
const keepsakePage = () => ({
  cls: 'inner keep-pg', html: `
  <div class="in">
    <h2 class="ptitle">Our word list</h2>
    <p class="lede">Just for fun. Tick a word the first time your child says, signs or taps it, in any language, and jot the date. Every child has their own timeline, so there is no right time for any box.</p>
    <div class="klist">${WORDS.map(p => `<div class="kw"><i></i><b>${p.w}</b><span></span></div>`).join('')}</div>
  </div>`
});
const ownWordsPage = () => ({
  cls: 'inner own-pg', html: `
  <div class="in">
    <h2 class="ptitle">Add your own words</h2>
    <p class="lede">Your child’s first words may be different from the ones in this book. Grown-ups, add the words that matter in your home: names, pets, a favorite food, words in your home language.</p>
    <div class="frames">${[C.tomato, C.sun, C.sky, C.grass].map(c => `<div class="fr" style="--c:${c}"><span class="fi">Grown-up: add a photo or sketch</span><span class="fl">Word:</span></div>`).join('')}</div>
  </div>`
});
const bonusPage = () => ({
  cls: 'inner bonus-pg', html: `
  <div class="in center">
    <p class="kicker">Free for grown-ups</p>
    <h2 class="ptitle">Keep the talk going after the book closes</h2>
    <div class="qrbox">${qrSvg(170)}</div>
    <p class="link">${BONUS}</p>
    <p class="lede">Scan for printable word cards and a one-page “say it, sign it, act it” sheet for the fridge. We only ask for your child’s birth month and year, never their name.</p>
  </div>`
});
const seriesPage = () => ({
  cls: 'inner series-pg', html: `
  <div class="in">
    <p class="kicker">The ${MS.series} series</p>
    <h2 class="ptitle">Collect all three</h2>
    <div class="bigbooks">${MS.series_books.map(b => `<div class="bb">${miniCover(b)}<div><b>Book ${b.n}: ${b.title.join(' ')}</b><span>${b.theme}</span><small>${b.status === 'this book' ? 'You are holding it' : 'Coming soon'}</small></div></div>`).join('')}</div>
    <p class="note">Same size, same style, same grown-up tips, made to sit together on the shelf.</p>
  </div>`
});
const endPage = () => ({
  cls: 'end-pg', html: `
  <svg class="art" viewBox="0 0 600 600" preserveAspectRatio="none" aria-hidden="true">${bg(C.ink)}${[[110, 150, 1], [180, 110, .7], [500, 170, .8], [430, 96, .6], [96, 300, .6], [520, 330, .7]].map(([x, y, s]) => use('star', `translate(${x},${y}) scale(${s})`)).join('')}${use('moon', 'translate(300,220) scale(1.3)')}</svg>
  <div class="endtx"><h2>The end.</h2><p>Night-night, book. Read it again tomorrow?</p></div>`
});

// ---------- CSS (all sizes in the 600 px page grid; the paperback scales it x1.4) ----------
const css = (rel) => `
<link rel="stylesheet" href="${rel}brand/fonts/fonts.css">
<style>
:root{--ink:${C.ink};--wash:${C.wash}}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
symbol{overflow:visible}
.sk{fill:var(--sk)} .hr{fill:var(--hr)} .sh{fill:var(--sh)} .pa{fill:var(--pa)} .so{fill:var(--so)} .hw{fill:var(--hw)} .ck{fill:${C.tomato};opacity:.28}
.page{position:relative;overflow:hidden;page-break-after:always;break-after:page;background:#fff}
.page:last-child{page-break-after:auto;break-after:auto}
.pg{width:600px;height:600px;position:relative;overflow:hidden;background:#fff;font-family:"Nunito Sans","Helvetica Neue",Arial,sans-serif;color:var(--ink)}
.art{position:absolute;left:0;top:0;width:100%;height:100%;display:block}
.slot{display:inline-block;border:1.2px dashed ${C.tomato};color:${C.tomato};border-radius:4px;padding:0 5px;font-weight:800;font-size:.92em;line-height:1.35}
.logo{display:block;width:auto}
/* word pages */
.word{position:absolute;left:44px;right:44px;top:24px;margin:0;text-align:center;font-family:"Fredoka","Nunito Sans",sans-serif;font-weight:600;line-height:1.08;letter-spacing:-.01em;color:var(--ink);white-space:nowrap}
.dark .word{color:#fff}
.card{position:absolute;left:48px;right:48px;bottom:48px;background:#fff;border-radius:18px;padding:9px 16px 10px 12px}
.cue{display:flex;align-items:center;gap:10px}
.chip{display:inline-flex;align-items:center;gap:6px;background:var(--acc);color:#fff;border-radius:99px;padding:3px 10px 3px 3px;font-weight:800;font-size:10px;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap}
.chip svg{width:20px;height:20px;display:block;color:rgba(255,255,255,.28)}
.cue-tx{font-family:"Fredoka","Nunito Sans",sans-serif;font-weight:600;font-size:17px;line-height:1.1;color:var(--ink)}
.tip{margin:7px 0 0;padding-top:7px;border-top:1.5px solid ${C.wash};font-size:13.4px;line-height:1.3;font-weight:600;color:var(--ink)}
.tip .lab{font-weight:800;font-size:9.6px;letter-spacing:.14em;text-transform:uppercase;color:var(--acc);margin-right:3px}
.tip strong{font-weight:800}
.card.lt .chip{color:var(--ink)}.card.lt .chip svg{color:rgba(255,255,255,.55)}.card.lt .tip .lab{color:var(--ink)}
/* cover */
.spill{position:absolute;left:48px;top:48px;display:inline-flex;align-items:center;gap:0;border-radius:99px;background:${C.ink};color:#fff;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;overflow:hidden}
.spill b{padding:5px 9px 5px 12px}
.spill i{font-style:normal;background:${C.tomato};padding:5px 12px 5px 9px}
.cover .ctitle{position:absolute;left:44px;top:80px;margin:0;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:88px;line-height:.9;letter-spacing:-.035em;color:var(--ink)}
.cover .ctitle span{display:block}
.cover .ctitle i{font-style:normal;color:#fff}
.count{position:absolute;left:48px;top:340px;width:200px;display:flex;align-items:center;gap:10px}
.count b{font-family:"Fredoka",sans-serif;font-weight:600;font-size:66px;line-height:.9;color:#fff;background:${C.ink};border-radius:18px;padding:6px 10px 8px}
.count span{font-weight:800;font-size:15px;line-height:1.22;color:var(--ink)}
.badge{position:absolute;right:48px;top:52px;width:124px;height:124px;border-radius:50%;background:${C.tomato};color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;transform:rotate(8deg)}
.badge span{font-weight:700;font-size:13px;line-height:1.1}
.badge b{font-family:"Fredoka",sans-serif;font-weight:600;font-size:19px;line-height:1.02;margin-top:2px;width:96px}
.cband{position:absolute;left:48px;right:48px;top:486px;height:66px;display:flex;align-items:center;justify-content:space-between;color:#fff}
.age{display:flex;flex-direction:column;align-items:center;justify-content:center;width:62px;height:62px;border-radius:50%;background:${C.tomato};color:#fff;font-size:9.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;line-height:1}
.age b{font-family:"Fredoka",sans-serif;font-weight:600;font-size:21px;letter-spacing:0;margin-bottom:2px;text-transform:none}
/* inner pages */
.inner{background:${C.wash}}
.inner .in{position:absolute;left:48px;right:48px;top:48px;bottom:48px;display:flex;flex-direction:column}
.inner .in.center{align-items:center;text-align:center}
.inner .in.bottom{justify-content:flex-end}
.ptitle{margin:0 0 14px;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:29px;line-height:1.04;letter-spacing:-.02em}
.kicker{margin:0 0 6px;font-weight:800;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:${C.tomato}}
.lede{margin:0 0 14px;font-size:13.5px;line-height:1.42}
.note{margin:auto 0 0;font-size:11.5px;line-height:1.42;opacity:.82}
.cues3{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin:0 0 16px}
.c3{background:#fff;border-radius:14px;padding:9px 10px 10px;display:flex;flex-direction:column;align-items:flex-start;color:var(--acc)}
.c3 svg{width:28px;height:28px;margin-bottom:5px}
.c3 b{font-family:"Fredoka",sans-serif;font-weight:600;font-size:17px;line-height:1;color:var(--ink)}
.c3 span{font-size:11.5px;line-height:1.25;color:var(--ink);margin-top:3px}
.steps{list-style:none;margin:0;padding:0;counter-reset:s}
.steps li{position:relative;padding-left:40px;margin:0 0 10px;font-size:13.5px;line-height:1.36;counter-increment:s;min-height:28px}
.steps li::before{content:counter(s);position:absolute;left:0;top:0;width:27px;height:27px;border-radius:50%;background:var(--c);color:var(--n,#fff);font-family:"Fredoka",sans-serif;font-weight:600;font-size:15px;display:flex;align-items:center;justify-content:center}
.steps b{font-weight:800}
.strip{display:block;width:100%;height:auto;margin:auto 0 0}.strip+.note{margin-top:14px}
.belongs{margin:12px 0 0;display:flex;align-items:flex-end;gap:10px;font-family:"Caveat",cursive;font-weight:700;font-size:21px}
.belongs i{flex:1;border-bottom:2px solid ${C.ink};opacity:.35;height:1px;margin-bottom:6px}
.routines{display:flex;flex-direction:column;gap:7px}
.rt{background:#fff;border-radius:14px;padding:7px 12px 8px 14px;border-left:8px solid var(--c)}
.rtl{display:block;font-weight:800;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;opacity:.72;margin-bottom:4px}
.chips{display:flex;flex-wrap:wrap;gap:5px}
.chips em{font-style:normal;font-family:"Fredoka",sans-serif;font-weight:600;font-size:15px;line-height:1;padding:4px 10px 5px;border-radius:99px;background:var(--t)}
.routines-pg .note{margin-top:auto}.legal{margin:14px 0 0;padding-top:10px;border-top:1.5px solid rgba(29,41,64,.12);font-size:8.6px;line-height:1.45;opacity:.9}
.legal p{margin:0 0 2px}
/* back */
.back-in{position:absolute;left:48px;top:48px;width:310px}
.btitle{margin:0 0 8px;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:34px;letter-spacing:-.03em;line-height:1}
.blurb{margin:0;font-size:12.5px;line-height:1.42}
.blurb b{font-weight:800}
.bage{margin:8px 0 0;display:flex;align-items:center;gap:8px;font-size:11px;font-weight:800;color:var(--ink)}.bage b{flex:none;white-space:nowrap;font-family:"Fredoka",sans-serif;font-weight:600;font-size:15px;background:${C.tomato};color:#fff;border-radius:99px;padding:2px 10px 3px}
.blurb2{margin:6px 0 0;font-family:"Caveat",cursive;font-weight:700;font-size:21px;color:${C.tomato}}
.series{position:absolute;left:48px;right:48px;top:262px}
.slab{margin:0 0 7px;font-weight:800;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase}
.books{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.sb b{display:block;font-size:10.5px;font-weight:800;margin-top:5px;line-height:1.2}
.sb small{display:block;font-size:9.5px;opacity:.72}
.mini{position:relative;width:96px;height:96px;border-radius:5px;overflow:hidden;box-shadow:0 0 0 1px rgba(29,41,64,.08)}
.mini svg{position:absolute;inset:0;width:100%;height:100%}
.mt{position:absolute;left:8px;top:8px;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:13.5px;line-height:.92;letter-spacing:-.03em;color:${C.ink}}
.mt span{display:block}
.mn{position:absolute;right:6px;top:6px;width:18px;height:18px;border-radius:50%;background:${C.ink};color:#fff;font-family:"Fredoka",sans-serif;font-weight:600;font-size:11px;display:flex;align-items:center;justify-content:center}
.bband{position:absolute;left:48px;top:450px;width:300px;color:#fff}
.bonus{display:flex;align-items:center;gap:10px;margin-top:12px}
.bonus .qr{display:block;border-radius:4px}
.bonus span{font-size:10px;line-height:1.3;opacity:.95}
.bonus b{display:block;font-size:11.5px;font-weight:800;margin-bottom:1px}
.bonus small{display:block;margin-top:3px;font-size:9px;opacity:.75}
.isbn{position:absolute;right:48px;bottom:48px;width:192px;height:115px;background:#fff;border:1.5px dashed #9AA3B5;border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:${C.ink};padding:0 12px}
.isbn span{font-weight:800;font-size:12px;letter-spacing:.1em;text-transform:uppercase}
.isbn.final{border:0;border-radius:0}
.isbn small{font-size:9px;opacity:.7;margin-top:4px;line-height:1.3}
/* paperback extras */
.title-pg .spill{position:static;margin:14px 0 18px}
.ttl{margin:0;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:58px;letter-spacing:-.035em;line-height:1}
.tsub{margin:8px 0 0;font-weight:700;font-size:16px}
.tart{width:200px;height:auto;margin:12px 0 4px}
.gift{margin:14px auto 0;display:grid;grid-template-columns:auto 190px;gap:8px 10px;align-items:end;font-family:"Caveat",cursive;font-weight:700;font-size:19px;text-align:left}.gift i{border-bottom:1.3px solid ${C.ink};height:20px}
.by{margin:4px 0 0;font-family:"Caveat",cursive;font-weight:700;font-size:22px}
.by .slot{font-family:"Nunito Sans",sans-serif;font-size:12px}
.tlogo{margin-top:auto}
.dedi{position:absolute;left:0;right:0;top:150px;margin:0;text-align:center;font-family:"Caveat",cursive;font-weight:700;font-size:25px;line-height:1.25;color:${C.ink}}
.copy-pg .in p{margin:0 0 9px;font-size:10.5px;line-height:1.5;max-width:380px}
.notebody{position:relative;background:#fff;border-radius:16px;padding:18px 22px 14px}
.notebody.draft{border:1.5px dashed ${C.tomato};padding-top:30px}
.draftlab{position:absolute;left:16px;top:9px;font-size:9px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:${C.tomato}}
.notebody p{margin:0 0 11px;font-size:14.5px;line-height:1.5}
.notebody .sig{font-family:"Caveat",cursive;font-weight:700;font-size:22px;margin:4px 0 0}
.notebody .sig .slot{font-family:"Nunito Sans",sans-serif;font-size:11.5px}
.noteart{display:block;width:100%;height:auto;margin-top:auto}
.klist{display:grid;grid-template-columns:1fr 1fr;gap:5px 16px}
.kw{display:flex;align-items:center;gap:8px;background:#fff;border-radius:9px;padding:3.5px 10px;min-height:27px}
.kw i{flex:0 0 14px;height:14px;border:2px solid ${C.ink};border-radius:4px;opacity:.55}
.kw b{font-family:"Fredoka",sans-serif;font-weight:600;font-size:14px;width:92px}
.kw span{flex:1;border-bottom:1.5px solid rgba(29,41,64,.25);height:12px}
.frames{display:grid;grid-template-columns:1fr 1fr;gap:12px;flex:1}
.fr{position:relative;background:#fff;border-radius:16px;border:2px dashed var(--c);display:flex;flex-direction:column;justify-content:flex-end;padding:10px 12px}
.fi{position:absolute;left:0;right:0;top:42%;text-align:center;font-family:"Caveat",cursive;font-weight:700;font-size:18px;color:var(--c)}
.fl{font-weight:800;font-size:11px;letter-spacing:.1em;text-transform:uppercase;border-bottom:1.5px solid rgba(29,41,64,.25);padding-bottom:4px}
.bonus-pg .ptitle{max-width:400px}
.qrbox{background:#fff;border-radius:20px;padding:16px;margin:6px 0 10px}
.qrbox .qr{display:block}
.link{margin:0 0 14px;font-weight:800;font-size:14px;color:${C.tomato}}
.bonus-pg .lede{max-width:400px}
.bigbooks{display:flex;flex-direction:column;gap:10px}
.bb{display:flex;align-items:center;gap:18px;background:#fff;border-radius:16px;padding:9px}
.bb .mini{width:104px;height:104px;flex:0 0 104px}
.bb .mini .mt{font-size:17px;left:9px;top:9px}
.bb>div:last-child>b{display:block;font-family:"Fredoka",sans-serif;font-weight:600;font-size:20px;line-height:1.1}
.bb>div:last-child>span{display:block;font-size:13px;margin-top:2px}
.bb>div:last-child>small{display:block;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:${C.tomato};margin-top:5px}
.end-pg .endtx{position:absolute;left:48px;right:48px;top:350px;text-align:center;color:#fff}
.endtx h2{margin:0;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:52px;letter-spacing:-.03em}
.endtx p{margin:6px 0 0;font-family:"Caveat",cursive;font-weight:700;font-size:26px;color:${C.sun}}
</style>`;

// ---------- assemble ----------
const IN = 96, BLEED = 12; // px per inch, bleed in px (0.125 in)
function htmlDoc(title, rel, pageCss, body, extra = '') {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
${css(rel)}<style>${pageCss}</style>${extra}
</head><body>
${defs}
${body}
</body></html>`;
}
const boardPage = p => `<section class="page pg ${p.cls}">${p.html}</section>`;
// Paperback page: 8.5x8.5 trim, bleed on top/bottom/outside only (8.625 x 8.75 in). Page 1 is a right-hand page.
const PB_SCALE = 1.4; // 600 px grid -> 840 px = 8.75 in
function pbPage(p, i) {
  const recto = (i % 2 === 0); // i=0 -> page 1 (right-hand); gutter on the left
  return `<section class="page pbp"><div class="pg ${p.cls}" style="position:absolute;top:0;left:${recto ? -BLEED : 0}px;transform:scale(${PB_SCALE});transform-origin:0 0">${p.html}</div></section>`;
}

function build() {
  const R0 = '../../', R1 = '../../../';
  // ---- A. board book (6 x 6 in trim, 6.25 in with bleed) ----
  const boardPages = [cover(R0), howTo(true), ...WORDS.map(wordPage), routinesPage(true), back(R0)];
  const boardCss = `@page{size:6.25in 6.25in;margin:0}.page{width:600px;height:600px}`;
  fs.writeFileSync(path.join(ROOT, 'source.html'), htmlDoc('Up! Go! More! — board book', R0, boardCss, boardPages.map(boardPage).join('\n')));
  const guides = `<style>.pg::after{content:"";position:absolute;inset:12px;outline:1px dashed #f0f;z-index:9}.pg::before{content:"";position:absolute;inset:48px;outline:1px dashed #0bf;z-index:9}</style>`;
  fs.writeFileSync(path.join(__dirname, 'debug-board.html'), htmlDoc('debug', R1, boardCss, [cover(R1), howTo(true), ...WORDS.map(wordPage), routinesPage(true), back(R1)].map(boardPage).join('\n'), guides));
  fs.writeFileSync(path.join(__dirname, 'cover-only.html'), htmlDoc('cover', R1, `body{margin:-12px 0 0 -12px;overflow:hidden}.page{width:600px;height:600px}`, boardPage(cover(R1))));

  // ---- B. talk-along paperback (8.5 x 8.5 in trim), print on demand ----
  const PB = path.join(ROOT, 'paperback');
  fs.mkdirSync(PB, { recursive: true });
  const pbPages = [titlePage(R1), copyrightPage(), notePage(), howTo(false), ...WORDS.map(wordPage), routinesPage(false), keepsakePage(), ownWordsPage(), bonusPage(), seriesPage(), endPage()];
  if (pbPages.length % 2) throw new Error('paperback page count must be even: ' + pbPages.length);
  const pbCss = `@page{size:8.625in 8.75in;margin:0}.pbp{width:828px;height:840px}`;
  fs.writeFileSync(path.join(PB, 'source.html'), htmlDoc('Up! Go! More! — talk-along paperback interior', R1, pbCss, pbPages.map(pbPage).join('\n')));
  // trimmed preview (what the reader sees): crop the bleed
  const pbTrimCss = `.pbp{width:816px;height:816px}`;
  fs.writeFileSync(path.join(PB, 'preview-trim.html'), htmlDoc('preview', R1, pbTrimCss, pbPages.map((p, i) => `<section class="page pbp"><div class="pg ${p.cls}" style="position:absolute;top:-12px;left:-12px;transform:scale(${PB_SCALE});transform-origin:0 0">${p.html}</div></section>`).join('\n')));

  // cover wrap: back | spine | front. Spine width = pages x paper caliper [VERIFY with the KDP / IngramSpark cover calculator]
  const CALIPER = 0.002347; // KDP premium colour on white paper, in per page (standard colour needs 72+ pages) [VERIFY]
  const spineIn = +(pbPages.length * CALIPER).toFixed(4);
  const spinePx = spineIn * IN, trimPx = 8.5 * IN;
  const wrapW = BLEED + trimPx + spinePx + trimPx + BLEED, wrapH = 8.75 * IN;
  const wrapCss = `@page{size:${(wrapW / IN).toFixed(4)}in 8.75in;margin:0}.wrap{width:${wrapW}px;height:${wrapH}px;position:relative;overflow:hidden;background:${C.ink}}
    .half{position:absolute;top:0;height:${wrapH}px;overflow:hidden}.half>.pg{position:absolute;top:0;transform:scale(${PB_SCALE});transform-origin:0 0}
    .wrap .isbn{width:${2 * IN / PB_SCALE}px;height:${1.2 * IN / PB_SCALE}px;right:${(BLEED + IN / 4) / PB_SCALE}px;bottom:${(BLEED + IN / 4) / PB_SCALE}px;padding:0 6px}.wrap .isbn span{font-size:9px}.wrap .isbn small{font-size:7px} /* KDP barcode area: 2 x 1.2 in, 0.25 in from spine and bottom trim [VERIFY] */`;
  const wrapBody = `<section class="page wrap">
    <div class="half" style="left:0;width:${BLEED + trimPx}px"><div class="pg ${back(R1).cls}" style="left:0">${back(R1).html}</div></div>
    <div class="half" style="left:${BLEED + trimPx + spinePx}px;width:${trimPx + BLEED}px"><div class="pg ${cover(R1).cls}" style="left:${-BLEED}px">${cover(R1).html}</div></div>
  </section>`;
  fs.writeFileSync(path.join(PB, 'cover-wrap.html'), htmlDoc('Up! Go! More! — paperback cover wrap', R1, wrapCss, wrapBody));

  console.log(`board pages: ${boardPages.length} | paperback interior pages: ${pbPages.length} | spine ${spineIn} in | wrap ${(wrapW / IN).toFixed(4)} x 8.75 in | words: ${N}`);
}
build();
