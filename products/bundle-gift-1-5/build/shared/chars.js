// Shared Play Before Pixels cast and symbol library. Copied unchanged from products/play-talk-cards/build/chars.js
// (itself from the Up! Go! More! board book build) so the cast looks the same across the line.
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

// Copied from products/board-up-go-more/build/build.js so the cast looks the same across the line.
module.exports = { C, SK, HR, KIDS, ADULTS, SYMBOLS, kid, adult, kidHand, adultHand, aimKid, aimAdult, use, sym };
