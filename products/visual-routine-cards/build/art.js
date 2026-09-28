// Card art library for Visual Routine Cards. Every piece of art is drawn in a 120 x 100 box
// (the card adds a tint circle behind it at 60,52 r44). Flat shapes, brand palette only,
// reusable symbols from base.js so the cast matches the board book.
const B = require('./base.js');
const { C, SK, HR, KIDS, ADULTS, sym, eye, cheeks, aim, use } = B;
const I = C.ink, W = '#FFFFFF', T = C.tomato, S = C.sun, K = C.sky, G = C.grass, P = C.plum;
const tT = C.tTomato, tS = C.tSun, tK = C.tSky, tG = C.tGrass, tP = C.tPlum, WA = C.wash;
const GREY = '#C9D2E0', SAND = '#F1D9A6';

// ---------- primitives ----------
const R = (x, y, w, h, rx, f, ex = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${ex}/>`;
const Ci = (x, y, r, f, ex = '') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${ex}/>`;
const El = (x, y, rx, ry, f, ex = '') => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" ${ex}/>`;
const Pa = (d, f, ex = '') => `<path d="${d}" fill="${f}" ${ex}/>`;
const St = (d, col, w = 3, ex = '') => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const Gp = (tf, body, style = '') => `<g transform="${tf}"${style ? ` style="${style}"` : ''}>${body}</g>`;
const U = (id, tf = '', style = '') => `<use href="#${id}" transform="${tf}"${style ? ` style="${style}"` : ''}/>`;
const Tx = (x, y, s, f, str, fs = 14, fam = 'Fredoka', wt = 600) => `<text x="${x}" y="${y}" font-family="${fam}, Nunito Sans, sans-serif" font-weight="${wt}" font-size="${fs}" fill="${f}" text-anchor="middle">${str}</text>`;

// ---------- extra cast (same construction as the board book) ----------
const CAST = Object.assign({}, KIDS, {
  F: { skin: SK[5], hair: HR[0], hs: 'bun', shirt: C.sky, pants: C.tomato, shoe: C.ink },
  G: { skin: SK[1], hair: HR[0], hs: 'long', shirt: C.sun, pants: C.sky, shoe: C.plum },
  H: { skin: SK[0], hair: HR[2], hs: 'curly', shirt: C.tomato, pants: C.grass, shoe: C.sun },
  J: { skin: SK[3], hair: HR[0], hs: 'short', shirt: C.plum, pants: C.ink, shoe: C.sun },
  L: { skin: SK[2], hair: HR[0], hs: 'wrapkid', hw: C.grass, shirt: C.sun, pants: C.plum, shoe: C.ink },
}, ADULTS);
const kid = (k, o) => B.kid(Object.assign({}, CAST[k], o));
const adult = (k, o) => B.adult(Object.assign({}, CAST[k], o));
const stand = (k, x, floor, s, o = {}) => kid(k, Object.assign({ x, y: floor - 27 * s, s }, o));
// head only, big (feelings cards etc.)
function head(k, x, y, s, face, extra = '') {
  const d = CAST[k];
  const hb = d.hs === 'bob' ? U('hb-bob') : d.hs === 'long' ? U('hb-long') : '';
  const hf = d.hs === 'none' ? '' : U('h-' + d.hs);
  return `<g style="${B.vars(d)}" transform="translate(${x},${y}) scale(${s})">${hb}${U('t-head')}${U('face-' + face)}${hf}${extra}</g>`;
}
// head + shoulders bust (origin = chin level)
function bust(k, x, y, s, face = 'smile', o = {}) {
  const d = Object.assign({}, CAST[k], o);
  const hb = d.hs === 'bob' ? U('hb-bob') : d.hs === 'long' ? U('hb-long') : '';
  return `<g style="${B.vars(d)}" transform="translate(${x},${y}) scale(${s})">${hb}<rect class="sh" x="-24" y="14" width="48" height="40" rx="18"/>${U('t-head')}${U('face-' + face)}${d.hs === 'none' ? '' : U('h-' + d.hs)}${o.top || ''}</g>`;
}

// ---------- new symbols (faces for feelings + objects) ----------
const e2 = (x, y, dx = 0) => `<circle cx="${x}" cy="${y}" r="3.9" fill="#FFFFFF"/><circle cx="${x + dx}" cy="${y + 0.7}" r="3.1" fill="${I}"/><circle cx="${x + 1.1 + dx}" cy="${y - 0.4}" r="1" fill="#FFFFFF"/>`;
const EY = e2(-8.5, -1) + e2(8.5, -1);
const mouth = d => `<path d="${d}" stroke="${I}" stroke-width="2.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const brow = d => `<path d="${d}" stroke="${I}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
const closed = d => `<path d="${d}" stroke="${I}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
const NEW_SYMBOLS = [
  sym('h-wrapkid', `<path class="hw" d="M-26 3C-30-30 30-30 26 3C18-9-18-9-26 3Z"/><circle class="hw" cx="0" cy="-27" r="9"/>`),
  sym('face-sad', EY + cheeks + mouth('M-6.5 13Q0 7 6.5 13') + `<path d="M-13 6Q-15 10-13 12.5Q-11 10-13 6Z" fill="${C.sky}"/>`),
  sym('face-mad', EY + brow('M-14-10L-4-6M14-10L4-6') + mouth('M-6.5 12.5Q0 9 6.5 12.5')),
  sym('face-worry', EY + cheeks + brow('M-13-7L-4-10.5M13-7L4-10.5') + mouth('M-7 11.5Q-3.5 8.5 0 11.5Q3.5 14.5 7 11.5')),
  sym('face-scared', e2(-8.5, -2) + e2(8.5, -2) + brow('M-13-10Q-8.5-13-4-10.5M13-10Q8.5-13 4-10.5') + `<ellipse cx="0" cy="12" rx="3.4" ry="4.2" fill="${I}"/>`),
  sym('face-yawn', closed('M-12.5 0Q-8.5 3.5-4.5 0M4.5 0Q8.5 3.5 12.5 0') + cheeks + `<ellipse cx="0" cy="11.5" rx="5" ry="6.2" fill="${I}"/><ellipse cx="0" cy="14" rx="3" ry="2.4" fill="${C.tomato}"/>`),
  sym('face-silly', e2(-8.5, -1) + closed('M4.5-1Q8.5-4 12.5-1') + cheeks + mouth('M-7 8Q0 14 7 8') + `<path d="M-2 10.5H5V15A3.5 3.5 0 0 1-2 15Z" fill="${C.tomato}"/>`),
  sym('face-calm', closed('M-12.5 0Q-8.5 3.5-4.5 0M4.5 0Q8.5 3.5 12.5 0') + cheeks + mouth('M-5.5 9Q0 13 5.5 9')),
  sym('face-shy', e2(-8.5, 0, 1.3) + e2(8.5, 0, 1.3) + `<circle class="ck" cx="-14" cy="8" r="5.5" style="opacity:.5"/><circle class="ck" cx="14" cy="8" r="5.5" style="opacity:.5"/>` + mouth('M-3.5 11Q0 13 3.5 11')),
  sym('face-frust', EY + brow('M-14-9L-4-6.5M14-9L4-6.5') + mouth('M-7 12L-3.5 9.5L0 12L3.5 9.5L7 12')),
  sym('face-wow', e2(-8.5, -2) + e2(8.5, -2) + cheeks + brow('M-12-10Q-8.5-12-5-10M12-10Q8.5-12 5-10') + `<ellipse cx="0" cy="11" rx="4.8" ry="6" fill="${I}"/>`),
  sym('face-bored', `<path d="M-12.5-2H-4.5M4.5-2H12.5" stroke="${I}" stroke-width="2.6" stroke-linecap="round"/><path d="M-12-1.5A4 3.4 0 0 0-5-1.5M5-1.5A4 3.4 0 0 0 12-1.5" fill="${I}"/>` + mouth('M-5 11H5')),
  sym('face-think', e2(-8.5, -1, 1.4) + e2(8.5, -1, 1.4) + cheeks + brow('M4-9Q8.5-12 13-9') + mouth('M-4 11Q1 12.5 5 9.5')),
  sym('face-laugh-c', closed('M-12.5 1Q-8.5-4-4.5 1M4.5 1Q8.5-4 12.5 1') + cheeks + `<path d="M-8.5 6.5Q0 21 8.5 6.5Z" fill="${I}"/><path d="M-4.2 13Q0 10.4 4.2 13Q0 15.8-4.2 13Z" fill="${C.tomato}"/>`),
  // objects
  sym('toothbrush', `<g transform="rotate(-32)"><rect x="-40" y="-5" width="62" height="10" rx="5" fill="var(--tb,${K})"/><rect x="16" y="-8" width="24" height="12" rx="4" fill="var(--tb,${K})"/><rect x="18" y="-18" width="20" height="11" rx="2.5" fill="#FFFFFF"/><path d="M19-22C22-30 34-30 37-22Z" fill="${C.sky}" opacity=".0"/><path d="M18-18C18-26 38-28 40-20C36-22 26-22 18-18Z" fill="var(--tp,${G})"/></g>`),
  sym('shirt', `<path d="M-14-30L-34-20-42 0-28 6-24-4V34H24V-4L28 6 42 0 34-20 14-30C10-22-10-22-14-30Z" fill="var(--sc,${K})"/>`),
  sym('pants', `<path d="M-22-30H22L26 32H6L0-4-6 32H-26Z" fill="var(--pc,${I})"/><rect x="-22" y="-34" width="44" height="8" rx="3" fill="var(--pc,${I})"/>`),
  sym('sock', `<path d="M-9-30H9V8C9 16 14 18 22 18C30 18 32 24 32 28C32 34 26 36 20 36H-2C-8 36-9 32-9 26Z" fill="var(--sk2,${T})"/><rect x="-10" y="-34" width="20" height="9" rx="3" fill="var(--sk3,#FFFFFF)"/><path d="M18 18C26 18 32 22 32 28C32 33 28 36 22 36C26 32 26 22 18 18Z" fill="var(--sk3,#FFFFFF)" opacity=".7"/>`),
  sym('bowl', `<path d="M-34-6H34C34 14 20 26 0 26C-20 26-34 14-34-6Z" fill="var(--bw,${K})"/><rect x="-14" y="24" width="28" height="6" rx="3" fill="var(--bw,${K})"/><rect x="-36" y="-9" width="72" height="7" rx="3.5" fill="var(--bw2,${I})" opacity=".18"/>`),
  sym('spoon', `<rect x="-3" y="-4" width="6" height="40" rx="3" fill="var(--sp,${P})"/><ellipse cx="0" cy="-10" rx="8" ry="11" fill="var(--sp,${P})"/>`),
  sym('fork', `<rect x="-3" y="-2" width="6" height="38" rx="3" fill="var(--fk,${P})"/><path d="M-9-24V-6C-9 0-5 2 0 2C5 2 9 0 9-6V-24H6V-8H2V-24H-2V-8H-6V-24Z" fill="var(--fk,${P})"/>`),
  sym('plate', `<circle r="36" fill="#FFFFFF"/><circle r="27" fill="var(--pl,${WA})"/>`),
  sym('banana', `<path d="M-30-6C-18 16 18 20 32-4C34-8 30-10 28-7C14 8-12 8-24-10C-26-13-32-11-30-6Z" fill="${S}"/><rect x="26" y="-14" width="6" height="9" rx="2" fill="#8D5A3B" transform="rotate(20 29 -10)"/>`),
  sym('broccoli', `<rect x="-5" y="0" width="10" height="20" rx="4" fill="#8FCF9F"/><circle cx="-9" cy="-4" r="9" fill="${G}"/><circle cx="9" cy="-4" r="9" fill="${G}"/><circle cx="0" cy="-12" r="10" fill="${G}"/>`),
  sym('sandwich', `<path d="M-34 14L0-26 34 14Z" fill="#F1D9A6" stroke="#E3B04B" stroke-width="5" stroke-linejoin="round"/><path d="M-26 8L0-18 26 8Z" fill="${G}" opacity=".0"/><rect x="-36" y="12" width="72" height="8" rx="4" fill="${G}"/><path d="M-34 22L0-18 34 22Z" fill="#F1D9A6" stroke="#E3B04B" stroke-width="5" stroke-linejoin="round" transform="translate(0,6)"/>`),
  sym('backpack', `<rect x="-26" y="-30" width="52" height="62" rx="16" fill="var(--bp,${T})"/><path d="M-12-30V-38A12 12 0 0 1 12-38V-30" stroke="var(--bp,${T})" stroke-width="7" fill="none"/><rect x="-18" y="4" width="36" height="22" rx="7" fill="var(--bp2,${S})"/><rect x="-10" y="-16" width="20" height="5" rx="2.5" fill="#FFFFFF" opacity=".7"/>`),
  sym('bed', `<rect x="-50" y="-26" width="14" height="52" rx="6" fill="var(--bd,${K})"/><rect x="36" y="-6" width="12" height="32" rx="5" fill="var(--bd,${K})"/><rect x="-46" y="4" width="92" height="14" rx="6" fill="var(--bd,${K})"/><rect x="-38" y="-8" width="80" height="14" rx="6" fill="#FFFFFF"/><rect x="-36" y="-20" width="24" height="14" rx="7" fill="#FFFFFF"/>`),
  sym('blanket', `<path d="M-30-10H40A6 6 0 0 1 46-4V14H-24A6 6 0 0 1-30 8Z" fill="var(--bl,${P})"/><circle cx="-8" cy="3" r="3" fill="#FFFFFF" opacity=".5"/><circle cx="10" cy="3" r="3" fill="#FFFFFF" opacity=".5"/><circle cx="28" cy="3" r="3" fill="#FFFFFF" opacity=".5"/>`),
  sym('tub', `<rect x="-46" y="-6" width="92" height="36" rx="16" fill="#FFFFFF"/><rect x="-50" y="-10" width="100" height="10" rx="5" fill="var(--tu,${K})"/><rect x="-36" y="28" width="10" height="10" rx="4" fill="var(--tu,${K})"/><rect x="26" y="28" width="10" height="10" rx="4" fill="var(--tu,${K})"/>`),
  sym('suds', `<circle cx="-30" cy="-12" r="9" fill="#FFFFFF"/><circle cx="-18" cy="-16" r="11" fill="#FFFFFF"/><circle cx="18" cy="-15" r="10" fill="#FFFFFF"/><circle cx="31" cy="-11" r="8" fill="#FFFFFF"/>`),
  sym('house', `<path d="M-40-4L0-38 40-4Z" fill="var(--rf,${T})" stroke="var(--rf,${T})" stroke-width="6" stroke-linejoin="round"/><rect x="-32" y="-8" width="64" height="44" rx="4" fill="var(--hw2,#FFFFFF)"/><rect x="-10" y="10" width="20" height="26" rx="3" fill="var(--dr,${K})"/><rect x="-26" y="2" width="12" height="12" rx="2" fill="var(--wn,${S})"/><rect x="14" y="2" width="12" height="12" rx="2" fill="var(--wn,${S})"/>`),
  sym('tree', `<rect x="-6" y="0" width="12" height="40" rx="5" fill="#8D5A3B"/><circle cx="0" cy="-12" r="26" fill="var(--tr,${G})"/><circle cx="-18" cy="2" r="16" fill="var(--tr,${G})"/><circle cx="18" cy="2" r="16" fill="var(--tr,${G})"/>`),
  sym('flower', `<rect x="-2.5" y="0" width="5" height="34" rx="2.5" fill="${G}"/><ellipse cx="9" cy="20" rx="9" ry="4.5" fill="${G}" transform="rotate(-30 9 20)"/>` + [0, 72, 144, 216, 288].map(a => `<circle cx="0" cy="-10" r="7.5" fill="var(--fl,${T})" transform="rotate(${a})"/>`).join('') + `<circle r="6.5" fill="${S}"/>`),
  sym('clock', `<circle r="30" fill="var(--ck1,${K})"/><circle r="24" fill="#FFFFFF"/><path d="M0-15V0L10 7" stroke="${I}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle r="3" fill="${I}"/>` + [0, 90, 180, 270].map(a => `<rect x="-1.5" y="-21" width="3" height="5" rx="1.5" fill="${I}" transform="rotate(${a})"/>`).join('')),
  sym('check', `<circle r="26" fill="var(--cc,${G})"/><path d="M-12 0L-3 9 13-9" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
  sym('arrow', `<path d="M-30-8H6V-22L32 0 6 22V8H-30Z" fill="var(--ar,${I})" stroke="var(--ar,${I})" stroke-width="6" stroke-linejoin="round"/>`),
  sym('drop', `<path d="M0-14C6-4 9 1 9 5A9 9 0 0 1-9 5C-9 1-6-4 0-14Z" fill="var(--dp,${K})"/>`),
  sym('note', `<ellipse cx="-4" cy="10" rx="8" ry="6.5" fill="var(--nt,${P})" transform="rotate(-20 -4 10)"/><rect x="1.5" y="-18" width="5" height="29" rx="2.5" fill="var(--nt,${P})"/><path d="M4-18C12-16 18-10 16-2C14-8 10-10 4-10Z" fill="var(--nt,${P})"/>`),
  sym('teddy', `<circle cx="-16" cy="-30" r="9" fill="var(--td,#C08457)"/><circle cx="16" cy="-30" r="9" fill="var(--td,#C08457)"/><circle cx="-16" cy="-30" r="4.5" fill="#F4CFAE"/><circle cx="16" cy="-30" r="4.5" fill="#F4CFAE"/><ellipse cx="0" cy="16" rx="24" ry="22" fill="var(--td,#C08457)"/><circle cx="0" cy="-16" r="21" fill="var(--td,#C08457)"/><ellipse cx="0" cy="-9" rx="9" ry="7" fill="#F4CFAE"/><circle cx="-7" cy="-20" r="2.6" fill="${I}"/><circle cx="7" cy="-20" r="2.6" fill="${I}"/><ellipse cx="0" cy="-11" rx="3" ry="2.2" fill="${I}"/><ellipse cx="0" cy="18" rx="13" ry="12" fill="#F4CFAE"/><circle cx="-20" cy="34" r="8" fill="var(--td,#C08457)"/><circle cx="20" cy="34" r="8" fill="var(--td,#C08457)"/>`),
  sym('tablet', `<rect x="-34" y="-46" width="68" height="92" rx="10" fill="${I}"/><rect x="-27" y="-38" width="54" height="76" rx="5" fill="var(--scr,${C.wash})"/>`),
  sym('cloud', `<path d="M-30 12A14 14 0 0 1-24-14A18 18 0 0 1 8-20A16 16 0 0 1 34-2A12 12 0 0 1 30 12Z" fill="var(--cl,#FFFFFF)"/>`),
  sym('car-s', `<path d="M-50-2C-50-20-42-24-28-24H4C14-24 20-15 30-14L42-13C50-12 52-6 52 2V6C52 12 49 15 44 15H-44C-48 15-50 12-50 8Z" fill="var(--cr,${K})"/><rect x="-36" y="-19" width="26" height="12" rx="4" fill="#FFFFFF" opacity=".7"/><rect x="-6" y="-19" width="16" height="12" rx="4" fill="#FFFFFF" opacity=".7"/><circle cx="-28" cy="15" r="11" fill="${I}"/><circle cx="-28" cy="15" r="4" fill="#FFFFFF"/><circle cx="30" cy="15" r="11" fill="${I}"/><circle cx="30" cy="15" r="4" fill="#FFFFFF"/><circle cx="48" cy="-2" r="4" fill="${S}"/>`),
  sym('bag', `<path d="M-26-14H26L22 32H-22Z" fill="var(--bg1,${S})"/><path d="M-12-14V-22A12 12 0 0 1 12-22V-14" stroke="var(--bg1,${S})" stroke-width="5" fill="none"/>`),
  sym('cushion', `<rect x="-40" y="-16" width="80" height="32" rx="14" fill="var(--cu,${P})"/><circle cx="0" cy="0" r="4" fill="#FFFFFF" opacity=".6"/>`),
  sym('bottle', `<rect x="-14" y="-18" width="28" height="48" rx="8" fill="var(--bt,${K})"/><rect x="-7" y="-30" width="14" height="14" rx="3" fill="var(--bt2,${I})"/><rect x="-9" y="-2" width="18" height="18" rx="4" fill="#FFFFFF" opacity=".75"/>`),
  sym('hand-up', `<rect class="sk" x="-7" y="-4" width="14" height="30" rx="7"/><rect class="sk" x="-12" y="-38" width="5.6" height="20" rx="2.8"/><rect class="sk" x="-5.6" y="-43" width="5.6" height="24" rx="2.8"/><rect class="sk" x="0.6" y="-41" width="5.6" height="22" rx="2.8"/><rect class="sk" x="6.6" y="-36" width="5.2" height="18" rx="2.6"/><rect class="sk" x="-12" y="-26" width="24" height="24" rx="9"/><rect class="sk" x="8" y="-18" width="13" height="6" rx="3" transform="rotate(-40 9 -15)"/>`),
];

// ---------- helpers for recurring objects ----------
const sun = (x, y, s) => U('sun', `translate(${x},${y}) scale(${s})`);
const moon = (x, y, s) => U('moon', `translate(${x},${y}) scale(${s})`);
const star = (x, y, s, f) => f ? Gp(`translate(${x},${y}) scale(${s})`, `<path d="M0-12L3.5-3.5 12 0 3.5 3.5 0 12-3.5 3.5-12 0-3.5-3.5Z" fill="${f}"/>`) : U('star', `translate(${x},${y}) scale(${s})`);
const heart = (x, y, s, f = T) => U('heart', `translate(${x},${y}) scale(${s})`, `--hc:${f}`);
const drop = (x, y, s, f = K) => U('drop', `translate(${x},${y}) scale(${s})`, `--dp:${f}`);
const note = (x, y, s, f = P) => U('note', `translate(${x},${y}) scale(${s})`, `--nt:${f}`);
const bubble = (x, y, s, h = K) => U('bubble', `translate(${x},${y}) scale(${s})`, `--bh:${h}`);
const sparkle = (x, y, s = 1, f = S) => star(x, y, s, f);
const zz = (x, y, f = I) => `<text x="${x}" y="${y}" font-family="Fredoka, sans-serif" font-weight="600" font-size="15" fill="${f}">z</text><text x="${x + 11}" y="${y - 10}" font-family="Fredoka, sans-serif" font-weight="600" font-size="11" fill="${f}">z</text>`;
const ground = (f = G, y = 88) => `<rect x="14" y="${y}" width="92" height="7" rx="3.5" fill="${f}"/>`;
const hand = (x, y, s, skin, rot = 0) => `<g style="--sk:${skin}" transform="translate(${x},${y}) rotate(${rot}) scale(${s})">${U('palm')}</g>`;
const handUp = (x, y, s, skin, rot = 0) => `<g style="--sk:${skin}" transform="translate(${x},${y}) rotate(${rot}) scale(${s})">${U('hand-up')}</g>`;
const bigNum = (x, y, n, f = I, fs = 40) => `<text x="${x}" y="${y}" font-family="Fredoka, sans-serif" font-weight="600" font-size="${fs}" fill="${f}" text-anchor="middle">${n}</text>`;
const book = (x, y, s, c = T) => U('book-closed', `translate(${x},${y}) scale(${s})`, `--bc:${c}`);
const openBook = (x, y, s, c = K, inner = '') => Gp(`translate(${x},${y}) scale(${s})`, U('book-open', '', `--bc:${c}`) + inner);
const tablet = (x, y, s, rot = 0) => Gp(`translate(${x},${y}) rotate(${rot}) scale(${s})`, U('tablet-sleeping'));
const shoe = (x, y, s, up = T, st = S, flip = false) => Gp(`translate(${x},${y}) scale(${flip ? -s : s},${s})`, U('shoe'), `--up:${up};--st:${st}`);

// ---------- ART ----------
const A = {};

// MORNING (0-5)
A.wakeUp = () => sun(96, 22, .26) + U('bed', 'translate(60,70) scale(.95)') + kid('B', { x: 40, y: 72, s: .52, legs: false, aL: 140, aR: -140, face: 'laugh' }) + U('blanket', 'translate(60,70) scale(.95)', `--bl:${P}`);
A.openCurtains = () => R(24, 16, 72, 66, 6, W) + R(30, 22, 60, 54, 3, tK) + sun(60, 50, .3) + Pa('M22 12H44C40 34 40 56 30 84H22Z', T) + Pa('M98 12H76C80 34 80 56 90 84H98Z', T) + R(16, 10, 88, 6, 3, I);
A.potty = () => Pa('M30 48H90C90 70 78 82 60 82C42 82 30 70 30 48Z', K) + El(60, 48, 32, 8, '#2E6EB5') + El(60, 48, 22, 4.5, tK) + R(72, 20, 22, 32, 9, S) + R(36, 80, 48, 9, 4.5, '#2E6EB5') + star(52, 64, .7, W);
A.diaper = () => Pa('M24 34H96V46C96 68 82 84 60 84C38 84 24 68 24 46Z', K) + Pa('M30 40H90V48C90 66 78 78 60 78C42 78 30 66 30 48Z', tK) + R(18, 30, 20, 16, 5, S) + R(82, 30, 20, 16, 5, S) + star(60, 58, 1, S) + R(24, 32, 72, 6, 3, '#2E6EB5');
A.washFace = () => bust('C', 60, 46, .95, 'joy') + R(78, 40, 22, 22, 4, K, 'transform="rotate(14 89 51)"') + drop(34, 76, .55) + drop(92, 78, .45) + drop(24, 60, .4);
A.brushTeeth = () => U('toothbrush', 'translate(56,54) scale(1.05)') + Gp('translate(90,70) rotate(-14)', R(-9, -22, 18, 34, 5, T) + R(-5, -30, 10, 9, 3, W) + R(-6, -10, 12, 10, 3, W, 'opacity=".7"'));
A.brushTeethNight = () => U('toothbrush', 'translate(54,58) scale(1.0)', `--tb:${P}`) + moon(94, 26, .3) + star(24, 24, .7, S);
A.brushHair = () => Gp('rotate(-28 60 50)', R(54, 48, 13, 44, 6.5, P) + El(60, 34, 24, 26, P) + El(60, 34, 18, 20, tP) + [-10, -3, 4, 11].map(dx => [-12, -3, 6, 15].map(dy => Ci(60 + dx, 34 + dy, 2, P)).join('')).join(''));
A.getDressed = () => U('shirt', 'translate(44,48) scale(.9)', `--sc:${T}`) + U('pants', 'translate(86,56) scale(.78)', `--pc:${K}`);
A.socks = () => U('sock', 'translate(44,50) scale(1.05)', `--sk2:${T};--sk3:${W}`) + U('sock', 'translate(72,54) scale(1.05)', `--sk2:${K};--sk3:${W}`);
A.shoesOn = () => shoe(38, 62, .55, T, S) + shoe(80, 56, .55, T, S);
A.coatOn = () => Pa('M40 18H80L96 34 92 86H28L24 34Z', G) + Pa('M48 18Q60 34 72 18Z', tG) + R(58, 26, 4, 60, 2, '#27875A') + [40, 54, 68].map(y => Ci(52, y, 3.2, W)).join('') + R(22, 34, 14, 46, 7, G) + R(84, 34, 14, 46, 7, G) + R(68, 58, 16, 12, 3, '#27875A');
A.warmHat = () => Pa('M24 64C24 32 40 18 60 18C80 18 96 32 96 64Z', T) + R(18, 58, 84, 18, 9, S) + Ci(60, 16, 10, S) + [34, 48, 62, 76, 88].map(x => R(x - 2, 30, 4, 26, 2, W, 'opacity=".25"')).join('');
A.sunHat = () => sun(92, 22, .24) + El(56, 70, 48, 12, S) + Pa('M30 68C30 42 42 32 56 32C70 32 82 42 82 68Z', S) + R(30, 58, 52, 9, 3, T);
A.breakfast = () => U('bowl', 'translate(52,62) scale(1.05)', `--bw:${K}`) + [[36, 54], [46, 50], [58, 52], [68, 49], [44, 57], [62, 56]].map(([x, y]) => Ci(x, y, 4.5, S)).join('') + U('spoon', 'translate(84,40) rotate(28) scale(.9)', `--sp:${T}`) + sun(96, 18, .18);
A.packBag = () => U('backpack', 'translate(60,56) scale(1.05)');
A.hugGoodbye = () => heart(88, 20, .26) + adult('G1', { x: 76, y: 90 - 51 * .4, s: .4, legs: 'kneel', flip: true, face: 'joy', aL: 10, aR: -62 }) + stand('A', 44, 90, .52, { face: 'joy', aL: 10, aR: -72 });
A.carRide = () => U('car-s', 'translate(60,62) scale(.95)', `--cr:${K}`) + head('D', 44, 42, .38, 'laugh') + ground(GREY, 82);
A.stroller = () => Pa('M30 30C30 20 40 14 50 14V50H30Z', P) + Pa('M30 46H82C82 62 72 70 58 70H40C34 70 30 64 30 58Z', P) + St('M82 46L92 22H100', I, 4) + Ci(40, 80, 9, I) + Ci(74, 80, 9, I) + Ci(40, 80, 3.5, W) + Ci(74, 80, 3.5, W) + head('E', 60, 40, .36, 'smile');
A.preschool = () => U('house', 'translate(60,52) scale(.95)', `--rf:${K};--dr:${T};--wn:${S}`) + R(78, 12, 3, 26, 1.5, I) + Pa('M81 12L96 17 81 22Z', T);
A.walkToSchool = () => stand('C', 46, 88, .62, { back: U('backpack', 'translate(0,-32) scale(.42)', `--bp:${S};--bp2:${T}`), aL: 20, aR: -20, lL: 12, lR: -12, face: 'smile' }) + U('house', 'translate(92,58) scale(.45)', `--rf:${T}`) + ground(GREY);
A.grandparents = () => U('house', 'translate(86,60) scale(.5)', `--rf:${P}`) + adult('G4', { x: 42, y: 90 - 81 * .35, s: .35, aR: -140, aL: 10, face: 'laugh' }) + heart(86, 18, .2);

// MEALS
A.washHands = () => Pa('M52 16H80V26H66V32H52Z', GREY) + drop(59, 44, .5) + drop(63, 56, .45) + hand(44, 74, 1.4, SK[2], -20) + hand(78, 74, 1.4, SK[2], 20, true) + bubble(30, 50, .35) + bubble(92, 46, .3) + bubble(96, 62, .22);
A.lunch = () => U('plate', 'translate(52,56) scale(1)') + U('sandwich', 'translate(52,56) scale(.62)') + U('cup', 'translate(96,60) scale(.55)', `--c1:${T};--c2:${S}`);
A.dinner = () => U('plate', 'translate(60,54) scale(1.08)', `--pl:${tS}`) + [[-8, -4], [0, -8], [8, -2], [-4, 4], [4, 5], [10, -10]].map(([x, y]) => `<path d="M${60 + x - 6} ${54 + y}q3-4 6 0t6 0" stroke="${S}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`).join('') + U('broccoli', 'translate(72,54) scale(.55)') + U('fork', 'translate(16,58) scale(.8)') + U('spoon', 'translate(104,58) scale(.8)');
A.snack = () => U('plate', 'translate(60,58) scale(1.05)', `--pl:${tG}`) + U('banana', 'translate(56,52) scale(.82)') + [[46, 68], [62, 70], [76, 64]].map(([x, y]) => R(x - 6, y - 6, 12, 12, 2, '#E3B04B') + Ci(x - 2, y - 2, 1, '#A0522D') + Ci(x + 2, y + 2, 1, '#A0522D')).join('');
A.drinkWater = () => Pa('M40 22H80L74 84H46Z', tK) + Pa('M42.5 44H77.5L74 84H46Z', K) + drop(92, 30, .7) + R(60, 10, 6, 40, 3, T, 'transform="rotate(14 63 30)"');
A.milk = () => Pa('M42 26H78L72 86H48Z', GREY) + Pa('M43.5 34H76.5L72 86H48Z', W) + Pa('M24 50V30L36 22H50V50Z', K) + R(24, 50, 26, 34, 3, K) + R(27, 58, 20, 14, 2, W) + drop(37, 64, .45, K);
A.sitAtTable = () => R(34, 34, 52, 42, 14, T) + kid('B', { x: 60, y: 70, s: .6, legs: false, face: 'laugh', aL: 30, aR: -30 }) + R(22, 64, 76, 9, 4.5, W) + R(30, 72, 7, 20, 3.5, T, 'transform="rotate(8 33 72)"') + R(84, 72, 7, 20, 3.5, T, 'transform="rotate(-8 87 72)"') + U('bowl', 'translate(44,58) scale(.3)', `--bw:${K}`);
A.bib = () => Pa('M36 22C36 14 48 14 48 22C48 30 72 30 72 22C72 14 84 14 84 22V58C84 76 74 86 60 86C46 86 36 76 36 58Z', K) + Pa('M42 40H78V58C78 72 70 80 60 80C50 80 42 72 42 58Z', W) + U('duck', 'translate(60,62) scale(.38)');
A.tryABite = () => U('plate', 'translate(52,62) scale(.9)') + U('broccoli', 'translate(44,62) scale(.6)') + Gp('translate(80,44) rotate(30)', U('fork', 'scale(.9)') + '') + U('broccoli', 'translate(76,20) scale(.42)') + star(28, 26, .7, S);
A.allDoneEat = () => U('plate', 'translate(52,58) scale(1)') + U('fork', 'translate(44,58) rotate(40) scale(.72)') + U('spoon', 'translate(58,58) rotate(40) scale(.72)') + U('check', 'translate(92,26) scale(.52)');
A.familyMeal = () => bust('A', 34, 44, .62, 'laugh') + bust('G3', 86, 36, .66, 'smile', { shirt: K }) + bust('D', 60, 50, .5, 'joy') + R(12, 66, 96, 8, 4, T) + R(22, 74, 7, 18, 3.5, T) + R(91, 74, 7, 18, 3.5, T) + El(38, 64, 14, 4, W) + El(82, 64, 14, 4, W);

// PLAY
A.playTime = () => U('ball', 'translate(34,64) scale(.42)') + U('block-1', 'translate(72,72) scale(.5)') + U('block-3', 'translate(96,72) scale(.5)') + U('block-2', 'translate(84,46) scale(.5)') + star(30, 22, .8, S);
A.blocks = () => U('block-3', 'translate(44,74) scale(.56)') + U('block-1', 'translate(76,74) scale(.56)') + U('block-2', 'translate(60,44) scale(.56)') + U('block-4', 'translate(60,16) scale(.46) rotate(8)');
A.ball = () => U('ball', 'translate(60,52) scale(.72) rotate(-12)');
A.puzzle = () => {
  const pc = (x, y, f, r) => Gp(`translate(${x},${y}) rotate(${r})`, Pa('M-16-16H-5A5 5 0 1 1 5-16H16V-5A5 5 0 1 1 16 5V16H5A5 5 0 1 0-5 16H-16V5A5 5 0 1 0-16-5Z', f));
  return R(20, 16, 80, 70, 8, W) + pc(42, 38, T, 0) + pc(78, 38, K, 0) + pc(42, 66, G, 0) + pc(84, 72, S, 16);
};
A.toyCars = () => U('car-s', 'translate(58,50) scale(.8)', `--cr:${T}`) + R(14, 74, 92, 12, 6, GREY) + [26, 46, 66, 86].map(x => R(x, 79, 10, 3, 1.5, W)).join('');
A.train = () => R(18, 42, 44, 30, 6, T) + R(40, 22, 22, 22, 4, T) + R(44, 26, 14, 12, 3, W) + R(14, 30, 12, 14, 3, I) + R(66, 46, 38, 26, 6, K) + Ci(30, 76, 8, I) + Ci(52, 76, 8, I) + Ci(76, 76, 8, I) + Ci(96, 76, 8, I) + R(60, 58, 8, 4, 2, I) + ground(GREY, 86);
A.teddy = () => U('teddy', 'translate(60,52) scale(1.0)');
A.pretendKitchen = () => R(18, 60, 84, 30, 6, W) + Ci(40, 60, 1, W) + R(22, 54, 76, 8, 4, GREY) + Pa('M32 34H74V52C74 58 70 62 64 62H42C36 62 32 58 32 52Z', T) + R(28, 30, 50, 7, 3.5, T) + R(74, 36, 16, 5, 2.5, I) + Gp('translate(54,22) rotate(20)', U('spoon', 'scale(.7)', `--sp:${S}`)) + R(30, 70, 22, 14, 3, tK) + R(64, 70, 22, 14, 3, tK) + St('M44 16Q48 10 44 4M58 16Q62 10 58 4', GREY, 3);
A.teaParty = () => Gp('translate(48,56)', El(0, 6, 26, 22, K) + R(-12, -20, 24, 8, 4, K) + Ci(0, -22, 5, K) + Pa('M24 0C36-4 40 6 32 12', 'none', `stroke="${K}" stroke-width="5"`) + Pa('M-24-2L-40-12-36-4-26 6Z', K) + Ci(-6, 4, 4, W, 'opacity=".6"') + Ci(8, 8, 4, W, 'opacity=".6"')) + Gp('translate(94,76)', Pa('M-12-8H12L9 8H-9Z', T) + El(0, 9, 16, 3.5, T) + Pa('M12-4C18-4 18 4 11 4', 'none', `stroke="${T}" stroke-width="3"`));
A.dressUp = () => stand('E', 60, 88, .6, { face: 'laugh', aL: 140, aR: -40, back: Pa('M-18-44L-34 26H34L18-44Z', T) }) + Gp('translate(60,23) scale(.6)', Pa('M-24 10V-14L-12-2 0-18 12-2 24-14V10Z', S));
A.drawing = () => Gp('rotate(-6 60 52)', R(24, 18, 66, 70, 4, W) + sun(44, 38, .16) + Pa('M40 76V62L54 52 68 62V76Z', T) + R(70, 64, 6, 12, 3, G) + Ci(73, 60, 8, G) + R(32, 76, 52, 3, 1.5, G)) + Gp('translate(96,52) rotate(28)', R(-7, -26, 14, 44, 5, K) + Pa('M-7 18H7L0 30Z', K) + R(-7, -18, 14, 5, 0, I, 'opacity=".2"'));
A.painting = () => R(24, 14, 60, 50, 3, W) + R(28, 18, 52, 42, 2, tK) + Ci(44, 36, 9, T) + Pa('M30 60L50 42 66 56 80 46V60Z', G) + St('M38 64L28 92M70 64L80 92M54 64V88', '#C08457', 4) + Gp('translate(98,60) rotate(24)', R(-3, -26, 6, 36, 3, S) + Pa('M-5 10H5V18C5 24 0 28 0 28C0 28-5 24-5 18Z', P));
A.playDough = () => El(40, 66, 22, 14, T) + El(76, 70, 18, 11, K) + Ci(64, 50, 10, G) + Gp('translate(84,32) rotate(-20)', R(-20, -6, 40, 12, 6, S) + R(-30, -3, 12, 6, 3, '#C08457') + R(18, -3, 12, 6, 3, '#C08457')) + star(38, 64, .9, '#FFFFFF');
A.music = () => Gp('translate(52,64)', El(0, -12, 30, 9, S) + R(-30, -12, 60, 26, 3, T) + El(0, 14, 30, 9, T) + El(0, -12, 26, 6, W) + St('M-30-6L-18 12M-18-6L-6 12M-6-6L6 12M6-6L18 12M18-6L30 12', S, 2.5)) + St('M70 28L90 10M78 34L100 22', '#C08457', 4) + Ci(90, 10, 5, T) + Ci(100, 22, 5, T) + note(26, 26, .9, P);
A.sing = () => bust('F', 50, 50, .95, 'laugh') + note(92, 30, 1, P) + note(100, 60, .75, T) + note(20, 24, .7, K);
A.dance = () => stand('G', 58, 88, .6, { face: 'laugh', aL: 150, aR: -110, lL: 4, lR: -30 }) + note(22, 34, .8, P) + note(98, 42, .8, T) + star(94, 18, .7, S) + star(24, 68, .6, S);
A.bubbles = () => Gp('translate(40,70) rotate(-30)', R(-3, -6, 6, 34, 3, T) + Ci(0, -16, 12, 'none', `stroke="${T}" stroke-width="5"`)) + bubble(62, 42, .7) + bubble(88, 26, .5) + bubble(90, 62, .45) + bubble(48, 18, .35) + bubble(76, 80, .3);
A.stacker = () => R(56, 14, 8, 70, 4, '#C08457') + [[T, 36], [S, 31], [G, 26], [K, 21], [P, 16]].map(([f, w], i) => R(60 - w, 72 - i * 12, w * 2, 12, 6, f)).join('') + R(28, 82, 64, 8, 4, '#C08457');
A.shapeSorter = () => R(22, 34, 76, 54, 8, K) + R(22, 34, 76, 12, 6, '#2E6EB5') + Ci(40, 40, 5, I, 'opacity=".6"') + R(55, 35, 10, 10, 1, I, 'opacity=".6"') + Pa('M80 34L86 45H74Z', I, 'opacity=".6"') + U('block-1', 'translate(42,66) scale(.36)') + U('block-4', 'translate(78,66) scale(.36)') + Gp('translate(60,20) scale(.9)', Pa('M0-10L10 8H-10Z', G, `stroke="${G}" stroke-width="4" stroke-linejoin="round"`));
A.fort = () => Pa('M12 88L60 18 108 88Z', P) + Pa('M60 18L80 88H40Z', tP) + bust('H', 60, 72, .6, 'laugh') + Pa('M40 88L60 18 50 88Z', P, 'opacity=".0"') + star(96, 20, .7, S) + star(22, 30, .5, S);
A.puppets = () => Gp('translate(60,54)', Pa('M-26 36V-14C-26-32-14-40 0-40C14-40 26-32 26-14V36Z', G) + Pa('M-26-8C-10 2 10 2 26-8V2C10 12-10 12-26 2Z', T) + Ci(-10, -22, 6, W) + Ci(10, -22, 6, W) + Ci(-9, -21, 3, I) + Ci(11, -21, 3, I) + Pa('M-6-38L0-50 6-38Z', S)) + star(98, 24, .6, S);
A.playFriend = () => stand('A', 30, 88, .52, { face: 'laugh', aR: -60, aL: 10 }) + stand('J', 90, 88, .52, { face: 'laugh', flip: true, aR: -60, aL: 10 }) + U('ball', 'translate(60,74) scale(.26)');
A.peekaboo = () => bust('B', 60, 52, .95, 'laugh') + hand(46, 50, .78, SK[0], -8) + hand(74, 50, .78, SK[0], 8) + star(98, 20, .6, S) + star(22, 30, .45, S);
A.tummyTime = () => R(12, 72, 96, 14, 7, G) + Gp('translate(66,62)', R(-26, -10, 48, 22, 11, S) + R(-40, -2, 18, 14, 7, K)) + head('E', 36, 44, .55, 'laugh') + Ci(28, 66, 5, SK[1]) + Ci(44, 68, 5, SK[1]) + U('ball', 'translate(96,52) scale(.18)');
A.quietTime = () => U('cushion', 'translate(56,74) scale(1)', `--cu:${P}`) + U('teddy', 'translate(40,50) scale(.6)') + book(76, 56, .6, T) + star(96, 20, .5, S) + star(24, 22, .4, S);
A.tidyToys = () => R(26, 50, 68, 38, 6, T) + R(22, 46, 76, 10, 5, '#D24A28') + U('ball', 'translate(46,40) scale(.24)') + U('block-3', 'translate(70,38) scale(.3) rotate(12)') + U('teddy', 'translate(88,24) scale(.34) rotate(18)') + St('M88 50C86 44 84 42 88 40', 'none');

// OUTSIDE
A.goOutside = () => R(16, 16, 46, 72, 6, P) + R(22, 22, 34, 66, 3, tK) + sun(40, 40, .18) + R(22, 70, 34, 18, 0, G) + Pa('M56 22L80 16V92L56 88Z', T) + Ci(74, 56, 3, S) + U('tree', 'translate(96,50) scale(.5)');
A.park = () => U('tree', 'translate(40,48) scale(.9)') + R(62, 62, 44, 6, 3, T) + R(62, 52, 44, 6, 3, T) + R(66, 68, 5, 18, 2.5, I) + R(98, 68, 5, 18, 2.5, I) + ground(G);
A.slide = () => R(24, 20, 7, 68, 3.5, T) + R(40, 20, 7, 68, 3.5, T) + [34, 50, 66].map(y => R(26, y, 20, 5, 2.5, T)).join('') + R(22, 18, 30, 8, 4, T) + Gp('translate(44,24) rotate(40)', R(0, -8, 84, 16, 8, S)) + stand('C', 70, 60, .42, { face: 'laugh', aL: 130, aR: -130, lL: -60, lR: -60 }) + ground(G);
A.swing = () => R(16, 12, 88, 7, 3.5, K) + R(18, 12, 6, 80, 3, K) + R(96, 12, 6, 80, 3, K) + St('M46 18L44 66M74 18L76 66', I, 2.4) + kid('D', { x: 60, y: 68, s: .5, face: 'laugh', aL: 170, aR: -170, lL: -40, lR: -30 }) + R(40, 66, 40, 6, 3, T);
A.sandbox = () => Pa('M14 88C20 64 44 56 60 56C76 56 100 64 106 88Z', SAND) + Gp('translate(44,52)', Pa('M-14-14H14L10 18H-10Z', T) + R(-16, -18, 32, 7, 3.5, T) + Pa('M-12-16C-12-34 12-34 12-16', 'none', `stroke="${T}" stroke-width="3"`)) + Gp('translate(82,48) rotate(24)', R(-3, -26, 6, 30, 3, K) + Pa('M-9 2H9V14C9 20 0 24 0 24C0 24-9 20-9 14Z', K)) + star(74, 76, .5, T) + Ci(28, 80, 3, '#E3B04B');
A.walk = () => adult('G2', { x: 74, y: 88 - 81 * .36, s: .36, face: 'smile', aL: 10, aR: aim(-1, 1.6) }) + stand('F', 42, 88, .48, { face: 'laugh', aR: -38, lL: 10, lR: -10 }) + ground(GREY);
A.natureWalk = () => Gp('translate(44,50) rotate(-30)', Pa('M0-34C22-18 22 18 0 34C-22 18-22-18 0-34Z', G) + St('M0-30V36', '#27875A', 3)) + Gp('translate(78,38) rotate(20)', Pa('M0-20C12-10 12 10 0 20C-12 10-12-10 0-20Z', S)) + Gp('translate(84,70)', Ci(0, 0, 12, 'none', `stroke="${I}" stroke-width="5"`) + Ci(0, 0, 9.5, W, 'opacity=".5"') + R(8, 8, 6, 18, 3, I, 'transform="rotate(-45 11 17)"'));
A.trike = () => Ci(34, 72, 16, I) + Ci(34, 72, 6, W) + Ci(86, 76, 11, I) + Ci(86, 76, 4, W) + St('M34 72L50 46H80L86 76', T, 6) + R(42, 40, 20, 7, 3.5, K) + St('M34 72L28 40H22', T, 5) + R(14, 36, 16, 6, 3, I);
A.garden = () => Pa('M14 88C26 72 94 72 106 88Z', '#8D5A3B') + U('flower', 'translate(44,46) scale(.95)', `--fl:${T}`) + U('flower', 'translate(76,54) scale(.75)', `--fl:${P}`) + Gp('translate(96,40) rotate(24)', R(-3, -26, 6, 30, 3, S) + Pa('M-9 2H9V14C9 20 0 24 0 24C0 24-9 20-9 14Z', GREY));
A.puddles = () => { const boot = (x, y, f, fl) => Gp(`translate(${x},${y}) scale(${fl ? -1 : 1},1)`, Pa('M-10-30H8V2C8 6 12 8 18 9C24 10 26 14 26 18V20H-10Z', f) + R(-12, -34, 22, 8, 4, f) + R(-10, 16, 36, 5, 2.5, I, 'opacity=".25"')); return El(60, 82, 48, 9, K) + boot(34, 64, S, false) + boot(86, 60, T, true) + drop(22, 26, .5) + drop(60, 18, .55) + drop(100, 28, .5) + Ci(20, 80, 3, W) + Ci(100, 84, 2.5, W); };
A.chalk = () => [[20, 56, T], [44, 56, S], [68, 56, K], [44, 30, G]].map(([x, y, f]) => R(x, y, 22, 22, 3, 'none', `stroke="${f}" stroke-width="4"`)).join('') + Tx(31, 73, 0, T, '1', 15) + Tx(55, 73, 0, S, '2', 15) + Tx(79, 73, 0, K, '3', 15) + Tx(55, 47, 0, G, '4', 15) + Gp('translate(96,32) rotate(30)', R(-5, -16, 10, 32, 4, P)) + Gp('translate(94,76) rotate(-20)', R(-5, -14, 10, 28, 4, T));
A.kickBall = () => stand('H', 44, 88, .62, { face: 'laugh', aL: 40, aR: -60, lL: 6, lR: -60 }) + U('ball', 'translate(94,72) scale(.3)') + St('M74 64H66M76 74H64', GREY, 3) + ground(G);
A.picnic = () => Pa('M10 86L28 52H92L110 86Z', T) + Pa('M24 60H96M18 72H102M40 52L32 86M60 52V86M80 52L88 86', 'none', `stroke="${W}" stroke-width="3" opacity=".6"`) + Gp('translate(60,44)', R(-20, -10, 40, 24, 5, S) + Pa('M-14-10C-14-26 14-26 14-10', 'none', `stroke="#C08457" stroke-width="4"`)) + sun(98, 16, .2);
A.sunscreen = () => sun(92, 24, .28) + Gp('translate(50,58) rotate(-12)', R(-16, -26, 32, 52, 10, W) + R(-12, 22, 24, 10, 4, T) + sun(0, -4, .18) + R(-10, 12, 20, 4, 2, T));
A.snow = () => Ci(60, 72, 18, W) + Ci(60, 44, 13, W) + Ci(55, 42, 1.8, I) + Ci(65, 42, 1.8, I) + Pa('M60 46L72 48 60 50Z', T) + R(48, 28, 24, 6, 3, K) + R(52, 16, 16, 14, 3, K) + St('M44 64L28 54M76 64L92 54', '#8D5A3B', 3) + [[20, 20], [98, 30], [30, 36], [100, 76], [20, 80]].map(([x, y]) => Ci(x, y, 3, W)).join('');
A.bugs = () => Gp('translate(56,54)', El(0, 4, 26, 24, T) + Pa('M0-20V28', 'none', `stroke="${I}" stroke-width="3"`) + Ci(0, -20, 12, I) + [[-12, -4], [12, -4], [-14, 14], [14, 14], [-6, 6], [6, 6]].map(([x, y]) => Ci(x, y, 4, I)).join('') + St('M-4-30L-10-40M4-30L10-40', I, 2.5) + Ci(-4, -22, 2, W) + Ci(4, -22, 2, W)) + Gp('translate(94,30) rotate(40)', Pa('M0-14C10-6 10 6 0 14C-10 6-10-6 0-14Z', G));
A.birds = () => R(10, 64, 100, 6, 3, '#8D5A3B') + Gp('translate(54,48)', El(0, 0, 20, 16, K) + Ci(14, -12, 11, K) + Pa('M24-12L33-9 24-6Z', S) + Ci(16, -14, 2.4, I) + Pa('M-18-4L-34-12-24 6Z', K) + Pa('M-8-4C-2 6 8 6 10 0C4 4-2 2-8-4Z', '#2E6EB5') + St('M-4 14V20M4 14V20', S, 2.4)) + Gp('translate(92,26) scale(.6)', El(0, 0, 20, 16, T) + Ci(14, -12, 11, T) + Pa('M24-12L33-9 24-6Z', S) + Ci(16, -14, 2.4, I));
A.wagon = () => R(24, 48, 70, 26, 5, T) + Ci(38, 80, 9, I) + Ci(80, 80, 9, I) + Ci(38, 80, 3.5, W) + Ci(80, 80, 3.5, W) + St('M94 56L108 40', I, 4) + U('teddy', 'translate(58,34) scale(.46)');
A.waterPlay = () => R(18, 52, 84, 30, 8, K) + R(24, 56, 72, 12, 5, tK) + R(30, 82, 6, 10, 3, K) + R(84, 82, 6, 10, 3, K) + U('duck', 'translate(48,52) scale(.36)') + drop(74, 38, .5) + drop(88, 28, .4) + drop(64, 24, .35) + Gp('translate(96,44) rotate(30)', Pa('M-8-8H8L6 10H-6Z', T));

// READING TOGETHER
A.readTogether = () => bust('G5', 36, 32, .66, 'smile') + bust('A', 82, 38, .58, 'laugh') + openBook(60, 78, .44, G, U('duck', 'translate(-44,4) scale(.6)') + U('ball', 'translate(44,0) scale(.42)'));
A.chooseBook = () => R(14, 14, 92, 76, 5, '#C08457') + R(20, 20, 80, 30, 2, W) + R(20, 56, 80, 28, 2, W) + [[22, T, 26], [31, S, 24], [40, K, 28], [49, G, 25], [58, P, 27], [67, T, 23]].map(([x, f, h]) => R(x, 50 - h, 8, h, 2, f)).join('') + [[22, K, 24], [31, P, 26], [40, S, 22], [49, T, 25]].map(([x, f, h]) => R(x, 84 - h, 8, h, 2, f)).join('') + Gp('translate(80,66) rotate(-18)', R(-6, -18, 13, 30, 2, G) + Ci(1, -4, 3, W)) + hand(96, 56, 1.1, SK[3], -20);
A.library = () => Pa('M16 34L60 12 104 34Z', P) + R(20, 34, 80, 8, 2, P) + [30, 50, 66, 86].map(x => R(x - 4, 44, 8, 34, 2, W)).join('') + R(14, 80, 92, 8, 3, P) + book(60, 22, .22, S);
A.pointName = () => openBook(58, 56, .52, K, U('duck', 'translate(-44,6) scale(.62)') + U('ball', 'translate(44,2) scale(.44)')) + hand(34, 80, 1.1, SK[4], 10) + `<g></g>`;
A.talkPictures = () => openBook(52, 66, .48, T, U('sun', 'translate(-44,0) scale(.44)') + U('cat', 'translate(52,12) scale(.6)')) + Gp('translate(90,26)', R(-20, -16, 40, 28, 12, W) + Pa('M-8 10L-14 22-2 12Z', W) + Ci(-9, -2, 3, I) + Ci(0, -2, 3, I) + Ci(9, -2, 3, I));
A.tellStory = () => bust('J', 40, 50, .85, 'laugh') + Gp('translate(86,30)', R(-24, -20, 48, 38, 14, W) + Pa('M-16 14L-26 26-6 16Z', W) + U('moon', 'translate(-8,0) scale(.2)') + star(10, -6, .6, S) + star(12, 8, .4, S));
A.readToTeddy = () => U('teddy', 'translate(82,56) scale(.72)') + stand('L', 36, 88, .58, { face: 'laugh', armsFront: true, aL: -40, aR: -80 }) + book(56, 50, .44, S) + heart(98, 20, .18);
A.bedtimeStory = () => openBook(60, 60, .56, P, U('moon', 'translate(-44,0) scale(.42)') + U('star', 'translate(40,-8) scale(1.1)') + U('star', 'translate(56,12) scale(.8)')) + star(22, 20, .6, S) + star(100, 20, .5, S);
A.rhymes = () => openBook(52, 64, .5, S, U('note', 'translate(-44,4) scale(.9)') + U('note', 'translate(44,0) scale(.9)', `--nt:${T}`)) + note(94, 26, .8, K) + note(24, 22, .6, G);
A.libraryBag = () => U('bag', 'translate(60,58) scale(1.05)', `--bg1:${G}`) + book(50, 44, .38, T) + book(70, 40, .36, S) + R(38, 58, 44, 18, 6, W, 'opacity=".35"') + heart(60, 70, .16, W);

// BATH
A.bathTime = () => head('D', 58, 38, .62, 'laugh') + U('tub', 'translate(60,62) scale(1)', `--tu:${K}`) + [[22, 50, 8], [33, 46, 10], [86, 47, 9], [98, 51, 7], [46, 52, 6], [72, 52, 6]].map(([x, y, r]) => Ci(x, y, r, W)).join('') + U('duck', 'translate(92,38) scale(.28)') + bubble(26, 22, .3) + bubble(40, 14, .2);
A.bathToys = () => U('duck', 'translate(40,54) scale(.8)') + Gp('translate(86,62)', Pa('M-22 0H22L16 14H-16Z', T) + R(-2, -26, 4, 26, 2, I) + Pa('M2-26L18-8H2Z', W)) + Gp('translate(70,24)', Pa('M-10-10H10L8 12H-8Z', G)) + El(60, 84, 48, 6, K);
A.washHair = () => bust('G', 56, 62, .84, 'laugh', { top: `<g><circle cx="-14" cy="-22" r="9" fill="#FFFFFF"/><circle cx="0" cy="-27" r="11" fill="#FFFFFF"/><circle cx="14" cy="-22" r="9" fill="#FFFFFF"/><circle cx="22" cy="-12" r="6" fill="#FFFFFF"/><circle cx="-22" cy="-12" r="6" fill="#FFFFFF"/></g>` }) + U('bottle', 'translate(98,62) scale(.6)', `--bt:${P};--bt2:${I}`) + bubble(22, 24, .28) + bubble(90, 18, .22);
A.rinse = () => Gp('translate(50,30) rotate(-38)', Pa('M-16-14H16L12 22H-12Z', G) + R(-18, -18, 36, 7, 3.5, G)) + drop(70, 46, .5) + drop(76, 60, .5) + drop(68, 72, .45) + drop(80, 82, .4) + bubble(30, 78, .3);
A.towel = () => Pa('M22 42C22 20 38 10 60 10C82 10 98 20 98 42V88H22Z', T) + head('C', 60, 44, .82, 'joy') + Pa('M30 36C32 22 44 16 60 16C76 16 88 22 90 36C84 26 74 24 60 24C46 24 36 26 30 36Z', T) + Ci(44, 16, 6, T) + Ci(76, 16, 6, T) + R(22, 70, 76, 5, 2, W, 'opacity=".5"');
A.lotion = () => Gp('translate(52,56)', R(-18, -18, 36, 50, 10, W) + R(-4, -30, 8, 14, 2, P) + R(-4, -32, 26, 6, 3, P) + R(-12, 0, 24, 18, 5, tP) + heart(0, 10, .12, P)) + drop(90, 34, .6, tP) + drop(96, 58, .4, tP);

// BEDTIME
A.pajamas = () => U('shirt', 'translate(42,46) scale(.82)', `--sc:${P}`) + U('pants', 'translate(88,54) scale(.72)', `--pc:${P}`) + [[34, 38], [48, 52], [36, 62], [86, 44], [92, 64]].map(([x, y]) => star(x, y, .5, S)).join('') + moon(98, 16, .14);
A.lullaby = () => moon(44, 50, .7) + note(82, 34, .9, S) + note(94, 64, .75, W) + star(24, 22, .5, S) + star(100, 16, .4, S);
A.cuddle = () => heart(60, 20, .3) + bust('G1', 42, 46, .74, 'calm', { shirt: G }) + bust('B', 78, 56, .62, 'joy') + R(28, 74, 64, 18, 9, P);
A.nightLight = () => Gp('translate(60,54)', Ci(0, 0, 34, S, 'opacity=".28"') + Ci(0, 0, 22, S, 'opacity=".5"') + R(-18, -24, 36, 48, 12, W) + star(0, 0, 1.3, S)) + star(22, 20, .5, S) + star(100, 80, .4, S);
A.lightsOff = () => R(38, 16, 44, 70, 10, W) + R(50, 30, 20, 42, 6, GREY) + R(52, 52, 16, 18, 5, I) + moon(96, 26, .22) + star(22, 30, .5, S);
A.sleep = () => U('bed', 'translate(60,70) scale(.95)', `--bd:${P}`) + head('A', 30, 55, .52, 'sleep') + U('blanket', 'translate(62,66) scale(.9)', `--bl:${K}`) + moon(94, 22, .22) + zz(44, 30, I);
A.nap = () => U('bed', 'translate(60,70) scale(.95)', `--bd:${G}`) + head('H', 30, 55, .52, 'sleep') + U('blanket', 'translate(62,66) scale(.9)', `--bl:${S}`) + sun(96, 20, .2) + zz(44, 30, I);
A.goodnight = () => moon(88, 30, .44) + star(56, 18, .6, S) + stand('D', 40, 88, .58, { face: 'joy', aR: -140, aL: 10 }) + ground('#FFFFFF', 88);
A.lovey = () => Pa('M20 70C20 52 40 46 60 50C80 54 100 50 100 66V86H20Z', K) + [30, 50, 70, 90].map(x => Ci(x, 70, 3, W, 'opacity=".5"')).join('') + U('teddy', 'translate(60,44) scale(.66)') + heart(92, 22, .16);
A.sleepSack = () => Pa('M34 44H86V80C86 90 74 94 60 94C46 94 34 90 34 80Z', K) + star(50, 66, .6, S) + star(70, 78, .5, S) + star(72, 58, .4, S) + head('E', 60, 32, .58, 'calm') + moon(98, 20, .16);
A.windDown = () => Gp('translate(46,46)', Pa('M-20-26H20L28 6H-28Z', S) + R(-4, 6, 8, 34, 2, I) + R(-18, 38, 36, 6, 3, I)) + Ci(46, 30, 40, S, 'opacity=".14"') + book(90, 70, .4, T) + moon(94, 24, .18);

// HELPING JOBS
A.feedPet = () => Gp('translate(56,62) scale(.62) scale(-1,1)', U('dog'), `--dg:${S};--ear:${T}`) + Gp('translate(90,80)', Pa('M-16-6H16L12 6H-12Z', T) + El(0, -6, 16, 4, '#C08457'));
A.waterPlants = () => Gp('translate(46,40)', Pa('M-22-12H10V20H-22Z', K) + Pa('M10-6L32-22 34-18 12 2Z', K) + Pa('M-22-4C-34-4-34 14-22 14', 'none', `stroke="${K}" stroke-width="5"`)) + drop(84, 30, .42) + drop(90, 44, .42) + drop(80, 50, .38) + Gp('translate(88,72)', Pa('M-14 0H14L10 18H-10Z', T)) + U('flower', 'translate(88,54) scale(.5)', `--fl:${P}`);
A.laundry = () => Pa('M26 44H94L86 88H34Z', S) + [36, 48, 60, 72, 84].map(x => R(x - 2, 50, 4, 32, 2, W, 'opacity=".45"')).join('') + U('shirt', 'translate(52,36) scale(.4) rotate(-16)', `--sc:${T}`) + U('sock', 'translate(78,30) scale(.5) rotate(30)', `--sk2:${K};--sk3:${W}`);
A.matchSocks = () => U('sock', 'translate(28,40) scale(.62)', `--sk2:${T}`) + U('sock', 'translate(48,40) scale(.62)', `--sk2:${T}`) + U('sock', 'translate(76,46) scale(.62)', `--sk2:${G}`) + U('sock', 'translate(96,46) scale(.62)', `--sk2:${G}`) + St('M34 82Q60 94 88 84', GREY, 3) + U('check', 'translate(62,18) scale(.3)');
A.wipeSpill = () => El(54, 76, 36, 8, K, 'opacity=".5"') + Gp('translate(50,62) rotate(-10)', R(-18, -12, 36, 24, 6, S) + R(-18, -2, 36, 3, 1.5, W, 'opacity=".5"')) + hand(52, 50, 1.1, SK[1], 0) + Gp('translate(92,50)', R(-10, -8, 20, 36, 5, G) + R(-7, -22, 12, 16, 3, I) + R(4, -22, 10, 5, 2, I)) + drop(24, 36, .4) + drop(32, 26, .35);
A.setTable = () => U('plate', 'translate(60,56) scale(.9)', `--pl:${tT}`) + U('fork', 'translate(18,56) scale(.72)') + U('spoon', 'translate(102,56) scale(.72)', `--sp:${K}`) + U('cup', 'translate(96,20) scale(.4)', `--c1:${G};--c2:${S}`) + R(4, 90, 112, 6, 3, T, 'opacity=".0"');
A.helpCook = () => U('bowl', 'translate(56,64) scale(.95)', `--bw:${T}`) + El(56, 58, 30, 6, SAND) + Gp('translate(70,36) rotate(26)', R(-3, -22, 6, 44, 3, '#C08457') + El(0, 22, 7, 10, '#C08457')) + hand(80, 26, 1.0, SK[4], 30) + star(24, 22, .5, S);
A.shoesAway = () => R(16, 44, 88, 6, 3, '#C08457') + R(16, 82, 88, 6, 3, '#C08457') + R(16, 44, 6, 44, 3, '#C08457') + R(98, 44, 6, 44, 3, '#C08457') + shoe(40, 36, .32, T, S) + shoe(78, 36, .32, K, W) + shoe(40, 74, .32, G, S) + shoe(78, 74, .32, P, W);
A.carryBags = () => U('bag', 'translate(58,56) scale(1.1)', `--bg1:${T}`) + Gp('translate(44,32) rotate(-10)', R(-8, -12, 16, 26, 7, SAND)) + U('banana', 'translate(68,28) scale(.4) rotate(-30)') + U('broccoli', 'translate(80,24) scale(.4)') + R(40, 62, 36, 5, 2.5, W, 'opacity=".4"');
A.recycling = () => Pa('M30 36H90L84 88H36Z', G) + R(26, 30, 68, 10, 5, '#27875A') + Gp('translate(60,62)', St('M-10-6L-4-14H4L10-6M10 4L6 12H-6M-10 4L-14-2', W, 3.5)) + Gp('translate(46,20) rotate(-18)', R(-6, -14, 12, 26, 4, K) + R(-3, -18, 6, 6, 2, K)) + Gp('translate(78,18) rotate(14)', R(-10, -8, 20, 16, 2, SAND));
A.foldTowels = () => R(26, 70, 68, 16, 5, K) + R(30, 54, 60, 16, 5, T) + R(28, 38, 64, 16, 5, S) + R(32, 22, 56, 16, 5, G) + [78, 62, 46, 30].map(y => R(26, y, 68, 2, 1, W, 'opacity=".5"')).join('');
A.makeBed = () => U('bed', 'translate(60,66) scale(.95)', `--bd:${S}`) + U('blanket', 'translate(62,60) scale(.9)', `--bl:${K}`) + U('teddy', 'translate(34,38) scale(.3)') + star(98, 24, .6, S) + star(86, 16, .4, S);
A.booksBack = () => R(14, 60, 92, 6, 3, '#C08457') + [[20, T, 34], [30, S, 30], [40, K, 36], [50, G, 32]].map(([x, f, h]) => R(x, 60 - h, 9, h, 2, f)).join('') + Gp('translate(80,40) rotate(20)', R(-6, -18, 13, 34, 2, P)) + hand(92, 58, 1.1, SK[2], -10);
A.helpBaby = () => R(24, 56, 72, 30, 14, P) + head('E', 44, 50, .48, 'laugh') + R(34, 58, 50, 22, 10, W) + stand('J', 94, 88, .4, { face: 'joy', flip: true, aR: -70 }) + Gp('translate(72,34)', Ci(0, 0, 7, S) + R(-2, 6, 4, 12, 2, T)) + heart(36, 20, .14);
A.sweep = () => Gp('translate(52,50) rotate(24)', R(-3, -44, 6, 60, 3, '#C08457') + Pa('M-16 16H16L22 40H-22Z', S) + [-14, -6, 2, 10].map(x => R(x, 22, 3, 16, 1.5, '#E3A40E')).join('')) + Pa('M76 72H104L100 88H80Z', K) + R(86, 62, 8, 12, 3, K) + [[26, 84], [34, 88], [22, 90]].map(([x, y]) => Ci(x, y, 2.5, GREY)).join('');

// FEELINGS (all ages) + CALM-DOWN CHOICES
A.fHappy = () => head('A', 60, 54, 1.45, 'laugh');
A.fSad = () => head('C', 60, 54, 1.45, 'sad');
A.fMad = () => head('D', 60, 54, 1.45, 'mad');
A.fWorried = () => head('B', 60, 54, 1.45, 'worry');
A.fScared = () => head('F', 60, 54, 1.45, 'scared');
A.fTired = () => head('E', 60, 54, 1.45, 'yawn') + zz(88, 26, I);
A.fExcited = () => head('H', 60, 54, 1.45, 'wow') + sparkle(20, 24, .9) + sparkle(100, 30, .8) + sparkle(96, 84, .6);
A.fCalm = () => head('G', 60, 54, 1.45, 'calm');
A.fSilly = () => head('J', 60, 54, 1.45, 'silly');
A.fProud = () => head('L', 60, 54, 1.45, 'joy') + star(96, 76, 1.5, S);
A.fFrustrated = () => head('C', 60, 54, 1.45, 'frust') + St('M16 20L24 26M20 12L26 22M100 20L92 26M96 12L90 22', T, 3);
A.fSurprised = () => head('A', 60, 54, 1.45, 'wow') + Tx(100, 34, 0, T, '!', 26);
A.fShy = () => head('F', 60, 54, 1.45, 'shy');
A.fLoved = () => head('B', 60, 56, 1.4, 'joy') + heart(20, 22, .22) + heart(100, 26, .18) + heart(98, 82, .14);
A.fBored = () => head('H', 60, 54, 1.45, 'bored');
A.fHungry = () => head('D', 52, 56, 1.25, 'oh') + U('bowl', 'translate(96,80) scale(.4)', `--bw:${T}`);
A.bigBreath = () => bust('E', 44, 50, .9, 'calm') + St('M72 38C84 38 88 30 84 26M72 50C92 50 98 42 94 34M72 62C86 62 90 70 84 74', K, 3.5);
A.askHug = () => heart(60, 22, .34) + stand('F', 40, 88, .56, { face: 'joy', aL: 60, aR: -100 }) + stand('B', 82, 88, .56, { face: 'joy', flip: true, aL: 60, aR: -100 });
A.calmCorner = () => U('cushion', 'translate(54,76) scale(1)', `--cu:${K}`) + U('cushion', 'translate(46,56) scale(.7) rotate(-8)', `--cu:${P}`) + U('teddy', 'translate(84,54) scale(.5)') + book(26, 40, .34, S) + star(96, 18, .5, S);
A.squeezePillow = () => bust('H', 60, 40, .8, 'calm') + U('cushion', 'translate(60,76) scale(.78) rotate(-4)', `--cu:${T}`) + Ci(30, 76, 7, SK[0]) + Ci(90, 74, 7, SK[0]) + heart(98, 22, .16);
A.askHelp = () => stand('J', 44, 88, .62, { face: 'smile', aR: -150, aL: 10 }) + Gp('translate(94,30)', R(-16, -14, 32, 26, 10, W) + Pa('M-10 10L-16 20-2 12Z', W) + Tx(0, 6, 0, T, '?', 20));
A.talkAbout = () => bust('C', 34, 52, .7, 'smile') + bust('G2', 86, 46, .76, 'smile', { shirt: T }) + Gp('translate(60,18)', R(-14, -10, 28, 20, 8, W) + Pa('M-6 8L-10 16-1 9Z', W) + Ci(-6, 0, 2.2, I) + Ci(0, 0, 2.2, I) + Ci(6, 0, 2.2, I));
A.countFive = () => handUp(52, 58, 1.35, SK[3], 0) + Tx(92, 58, 0, T, '5', 40);
A.stretch = () => stand('H', 60, 88, .64, { face: 'joy', aL: 165, aR: -165, lL: 14, lR: -14 }) + sparkle(22, 30, .6) + sparkle(98, 30, .6);
A.drawIt = () => Gp('rotate(-4 60 52)', R(26, 16, 62, 70, 4, W) + St('M36 70C44 40 52 76 60 46S76 64 80 36', P, 4) + Ci(66, 30, 7, S)) + Gp('translate(96,58) rotate(30)', R(-6, -24, 12, 40, 5, T) + Pa('M-6 16H6L0 26Z', T));

// OUT & ABOUT
A.shopping = () => St('M16 26H28L38 70H88L96 38H32', I, 5) + Ci(44, 82, 7, I) + Ci(82, 82, 7, I) + U('banana', 'translate(56,34) scale(.36) rotate(-10)') + R(62, 32, 14, 22, 3, T) + R(78, 28, 12, 26, 3, G) + R(44, 38, 14, 16, 3, K);
A.checkUp = () => St('M40 20V44C40 60 60 64 64 52V40', I, 5) + Ci(40, 18, 4, I) + Ci(64, 38, 9, K) + Ci(64, 38, 4, W) + St('M52 60C52 78 82 78 86 62', I, 5) + Ci(86, 56, 8, GREY) + Ci(86, 56, 4, I) + heart(92, 22, .2);
A.dentist = () => Pa('M36 26C36 16 48 14 60 20C72 14 84 16 84 26C84 42 80 52 78 70C77 80 70 82 68 72L64 56C62 50 58 50 56 56L52 72C50 82 43 80 42 70C40 52 36 42 36 26Z', W) + Pa('M46 30C46 26 50 24 54 26', 'none', `stroke="${GREY}" stroke-width="3" stroke-linecap="round"`) + sparkle(94, 30, .8, S) + sparkle(26, 60, .5, S);
A.haircut = () => Gp('translate(46,52) rotate(-30)', Ci(-8, 24, 8, 'none', `stroke="${T}" stroke-width="5"`) + Ci(8, 24, 8, 'none', `stroke="${T}" stroke-width="5"`) + Pa('M-5 16L4-30 7-28 0 16Z', GREY) + Pa('M5 16L-4-30-7-28 0 16Z', GREY) + Ci(0, 4, 2.4, I)) + Gp('translate(86,52) rotate(12)', R(-6, -36, 12, 72, 4, K) + [-28, -20, -12, -4, 4, 12].map(y => R(-14, y, 9, 4, 2, K)).join(''));
A.friendsHouse = () => U('house', 'translate(60,48) scale(.8)', `--rf:${G};--dr:${S}`) + head('H', 30, 80, .34, 'laugh') + head('D', 90, 80, .34, 'laugh') + heart(60, 12, .14);
A.birthday = () => R(26, 54, 68, 32, 6, T) + R(26, 54, 68, 10, 5, W) + R(34, 36, 52, 20, 6, P) + [44, 60, 76].map(x => R(x - 2.5, 20, 5, 16, 2, S) + El(x, 15, 3.5, 5.5, T)).join('') + [34, 50, 66, 82].map(x => Ci(x, 74, 3, S)).join('');
A.swimLesson = () => R(12, 50, 96, 40, 8, K) + St('M18 62q8-6 16 0t16 0 16 0 16 0 16 0', W, 3) + head('L', 60, 50, .56, 'laugh', `<rect x="-20" y="-8" width="40" height="11" rx="5.5" fill="${T}" opacity=".0"/>`) + Gp('translate(60,49) scale(.56)', Ci(-9, -1, 7, 'none', `stroke="${K}" stroke-width="3.5"`) + Ci(9, -1, 7, 'none', `stroke="${K}" stroke-width="3.5"`)) + St('M20 76q8-6 16 0t16 0 16 0 16 0 16 0', W, 3, 'opacity=".6"');
A.bus = () => R(16, 26, 88, 50, 10, S) + [26, 46, 66].map(x => R(x, 34, 16, 16, 3, W)).join('') + R(86, 34, 12, 30, 3, W) + R(16, 56, 88, 5, 0, I, 'opacity=".2"') + Ci(34, 78, 9, I) + Ci(84, 78, 9, I) + Ci(34, 78, 3.5, W) + Ci(84, 78, 3.5, W) + Ci(100, 68, 3, T);
A.airplane = () => Gp('translate(60,52) rotate(-16)', R(-44, -9, 88, 18, 9, W) + Pa('M-6-8L-22-40H-12L14-8Z', K) + Pa('M-6 8L-22 36H-12L14 8Z', K) + Pa('M-44-8L-50-26H-40L-30-8Z', T) + [-20, -10, 0, 10, 20].map(x => Ci(x, -2, 2.6, K)).join('')) + U('cloud', 'translate(28,82) scale(.4)') + U('cloud', 'translate(96,26) scale(.3)');
A.waiting = () => Gp('translate(60,52)', R(-24, -40, 48, 7, 3.5, P) + R(-24, 33, 48, 7, 3.5, P) + Pa('M-18-33H18C18-14 4-6 4 0C4 6 18 14 18 33H-18C-18 14-4 6-4 0C-4-6-18-14-18-33Z', tK) + Pa('M-12-24H12C10-14 2-8 0-4C-2-8-10-14-12-24Z', S) + Pa('M-12 30H12C10 22 2 18 0 18C-2 18-10 22-12 30Z', S)) + star(98, 22, .5, S);
A.train2 = () => A.train();

// WORDS / TIME
A.wFirst = () => Ci(60, 50, 34, T) + bigNum(60, 67, '1', W, 50);
A.wThen = () => U('arrow', 'translate(60,52) scale(1.2)', `--ar:${K}`) + bigNum(60, 60, '2', W, 22);
A.wNow = () => Ci(60, 52, 30, G) + Ci(60, 52, 14, W) + Ci(60, 52, 7, G);
A.wNext = () => U('arrow', 'translate(52,52) scale(.9)', `--ar:${S}`) + U('arrow', 'translate(84,52) scale(.6)', `--ar:${T}`);
A.wLater = () => U('clock', 'translate(60,52) scale(1.2)', `--ck1:${P}`);
A.wWait = () => handUp(60, 58, 1.45, SK[2], 0);
A.wAllDone = () => U('check', 'translate(60,52) scale(1.3)');
A.wToday = () => R(28, 20, 64, 66, 8, W) + R(28, 20, 64, 18, 8, T) + R(28, 30, 64, 8, 0, T) + R(40, 12, 6, 14, 3, I) + R(74, 12, 6, 14, 3, I) + star(60, 62, 1.6, S);
A.wChange = () => R(26, 20, 68, 64, 12, W) + star(60, 50, 2.2, P) + Tx(88, 34, 0, T, '!', 20);
A.wHelp = () => handUp(50, 60, 1.35, SK[4], -10) + heart(92, 28, .2);
A.wYes = () => Ci(60, 52, 32, G) + St('M45 52L56 63 76 41', W, 8);
A.wNo = () => Ci(60, 52, 32, T) + St('M47 39L73 65M73 39L47 65', W, 8);

// PLAY FIRST / SCREENS LATER
A.playFirst = () => Ci(24, 22, 13, T) + bigNum(24, 30, '1', W, 20) + U('block-1', 'translate(50,74) scale(.44)') + U('block-3', 'translate(76,74) scale(.44)') + U('block-2', 'translate(63,50) scale(.44)') + U('ball', 'translate(96,70) scale(.24)') + star(96, 26, .6, S);
A.screensLater = () => Ci(24, 22, 13, K) + bigNum(24, 30, '2', W, 20) + tablet(58, 56, .62) + Gp('translate(94,70)', U('clock', 'scale(.5)', `--ck1:${S}`));
A.playFirstBig = () => Ci(22, 20, 12, T) + bigNum(22, 27, '1', W, 18) + U('ball', 'translate(46,70) scale(.3)') + U('block-3', 'translate(80,76) scale(.36)') + U('block-1', 'translate(80,52) scale(.36)') + Gp('translate(62,34) rotate(-10)', R(-14, -10, 28, 20, 3, S) + R(-12, -8, 12, 16, 1, W, 'opacity=".5"')) + star(100, 24, .5, S);
A.screensOff = () => tablet(52, 54, .6, -6) + moon(92, 30, .28) + zz(84, 70, I);
A.devicesSleep = () => R(18, 64, 84, 8, 4, '#C08457') + tablet(44, 44, .42) + Gp('translate(80,50)', R(-10, -18, 20, 34, 5, I) + R(-7, -14, 14, 26, 2, WA) + St('M-3-2Q0 1 3-2', I, 1.5)) + moon(96, 18, .18) + St('M44 64V80Q44 88 54 88H70', GREY, 3);

// 5-12 SPECIFIC
A.alarm = () => Gp('translate(60,54)', U('clock', 'scale(1.05)', `--ck1:${T}`) + Ci(-22, -28, 9, T) + Ci(22, -28, 9, T) + R(-24, 28, 8, 10, 3, T) + R(16, 28, 8, 10, 3, T)) + St('M18 26L10 20M102 26L110 20M16 40H8M104 40H112', S, 3);
A.dressedBig = () => U('shirt', 'translate(38,46) scale(.74)', `--sc:${G}`) + U('pants', 'translate(76,58) scale(.62)', `--pc:${K}`) + U('sock', 'translate(104,64) scale(.42)', `--sk2:${S}`);
A.floss = () => U('toothbrush', 'translate(48,56) scale(.95)', `--tb:${G};--tp:${K}`) + Gp('translate(92,56)', R(-12, -18, 24, 32, 6, K) + R(-12, -18, 24, 8, 4, I, 'opacity=".25"') + St('M0-18C0-30 10-36 16-40', GREY, 2));
A.washFaceBig = () => Pa('M20 60H100V68C100 80 90 88 78 88H42C30 88 20 80 20 68Z', K) + El(60, 60, 40, 7, tK) + Pa('M54 24H70V38H64V48H54Z', I, 'opacity=".55"') + drop(59, 54, .4) + Gp('translate(90,38) rotate(10)', R(-13, -11, 26, 24, 5, T) + R(-13, -3, 26, 3, 1.5, W, 'opacity=".5"'));
A.hair = () => Gp('rotate(-28 50 50)', R(44, 50, 12, 40, 6, S) + El(50, 36, 20, 22, S) + El(50, 36, 14, 16, '#FBE3A0')) + Gp('translate(86,50) rotate(14)', R(-5, -34, 10, 68, 3, T) + [-26, -18, -10, -2, 6, 14, 22].map(y => R(-12, y, 8, 3.5, 1.7, T)).join(''));
A.lunchbox = () => R(22, 38, 76, 48, 8, K) + R(22, 38, 76, 16, 8, '#2E6EB5') + R(46, 26, 28, 16, 6, 'none', `stroke="${I}" stroke-width="4"`) + R(52, 44, 16, 6, 3, S) + U('sandwich', 'translate(46,72) scale(.3)') + U('banana', 'translate(78,70) scale(.3)');
A.waterBottle = () => Gp('translate(60,54)', R(-16, -26, 32, 64, 12, G) + R(-10, -38, 20, 14, 4, I) + R(-16, -6, 32, 16, 0, W, 'opacity=".35"') + St('M4-38C14-44 22-40 20-30', I, 3));
A.weather = () => sun(46, 38, .36) + U('cloud', 'translate(72,60) scale(.95)') + drop(62, 84, .35) + drop(78, 88, .35) + drop(92, 82, .3);
A.jacketShoes = () => Pa('M22 18H58L68 30 64 70H16L12 30Z', T) + R(38, 22, 3, 48, 1.5, '#C44325') + R(10, 30, 10, 36, 5, T) + R(60, 30, 10, 36, 5, T) + shoe(88, 78, .34, K, W);
A.busStop = () => R(20, 12, 7, 78, 3.5, I) + R(8, 12, 32, 22, 6, T) + Tx(24, 28, 0, W, 'BUS', 11) + Gp('translate(72,58) scale(.62)', R(-44, -26, 88, 50, 10, S) + [-34, -14, 6].map(x => R(x, -18, 16, 16, 3, W)).join('') + Ci(-26, 26, 9, I) + Ci(24, 26, 9, I)) + ground(GREY);
A.school = () => R(20, 40, 80, 48, 4, T) + Pa('M14 42L60 14 106 42Z', I) + R(52, 60, 16, 28, 2, S) + [28, 80].map(x => R(x, 50, 12, 12, 2, W)).join('') + [28, 80].map(x => R(x, 68, 12, 12, 2, W)).join('') + Ci(60, 32, 7, W) + St('M60 28V32H63', I, 1.6);
A.unpackBag = () => U('backpack', 'translate(44,58) scale(.95)', `--bp:${K};--bp2:${S}`) + Gp('translate(88,40) rotate(14)', R(-12, -16, 24, 32, 3, T) + R(-12, -16, 5, 32, 1, I, 'opacity=".2"')) + Gp('translate(92,76) rotate(-8)', R(-12, -8, 24, 16, 4, G));
A.snackBig = () => U('plate', 'translate(56,60) scale(.95)', `--pl:${tS}`) + U('banana', 'translate(50,52) scale(.66)') + [[48, 70], [64, 72]].map(([x, y]) => El(x, y, 7, 5, '#F5D36B')).join('') + U('cup', 'translate(98,58) scale(.45)', `--c1:${K};--c2:${S}`);
A.homework = () => Gp('rotate(-6 56 54)', R(24, 16, 60, 74, 4, W) + R(24, 16, 10, 74, 2, K) + [34, 44, 54, 64, 74].map(y => R(40, y, 36, 3, 1.5, GREY)).join('')) + Gp('translate(94,54) rotate(30)', R(-5, -30, 10, 48, 2, S) + Pa('M-5 18H5L0 28Z', SAND) + R(-5, -34, 10, 6, 2, T));
A.reading20 = () => openBook(52, 62, .48, P, '') + Gp('translate(94,30)', U('clock', 'scale(.55)', `--ck1:${G}`)) + Tx(94, 66, 0, I, '20', 16) + Tx(94, 78, 0, I, 'min', 9, 'Nunito Sans', 800);
A.instrument = () => Gp('translate(54,58) rotate(-30)', El(0, 16, 22, 20, T) + El(0, -8, 16, 15, T) + Ci(0, 8, 6, I) + R(-4, -58, 8, 46, 3, '#8D5A3B') + R(-6, -64, 12, 12, 3, I) + [-4, 0, 4].map(x => R(x - .5, -56, 1, 70, .5, W, 'opacity=".6"')).join('')) + note(96, 30, .8, P) + note(22, 26, .6, K);
A.sports = () => Gp('translate(50,58)', Ci(0, 0, 28, W) + Pa('M0-10L9.5-3 6 8H-6L-9.5-3Z', I) + [0, 72, 144, 216, 288].map(a => `<path d="M0-28L4-22-4-22Z" fill="${I}" transform="rotate(${a})"/>`).join('')) + Gp('translate(94,40)', R(-4, -24, 8, 40, 4, S) + El(0, 20, 12, 7, S)) + ground(G);
A.bike = () => Ci(34, 66, 18, 'none', `stroke="${I}" stroke-width="5"`) + Ci(88, 66, 18, 'none', `stroke="${I}" stroke-width="5"`) + St('M34 66L52 40H80L88 66M52 40L62 66H34M80 40L76 30H68', T, 5) + R(44, 32, 18, 6, 3, I) + Ci(62, 66, 4, I);
A.build = () => [[30, 74, T], [52, 74, K], [74, 74, G], [41, 60, S], [63, 60, P], [52, 46, T]].map(([x, y, f]) => R(x - 11, y - 7, 22, 14, 2, f) + Ci(x - 5, y - 8, 3, f) + Ci(x + 5, y - 8, 3, f)).join('') + R(80, 26, 22, 14, 2, K, 'transform="rotate(20 91 33)"');
A.artProject = () => R(20, 24, 56, 60, 4, W) + Ci(38, 44, 8, S) + Pa('M26 76L44 56 56 68 70 54V78H26Z', G) + Gp('translate(90,36) rotate(20)', Ci(-6, 16, 6, 'none', `stroke="${K}" stroke-width="4"`) + Ci(6, 16, 6, 'none', `stroke="${K}" stroke-width="4"`) + Pa('M-4 10L3-24 5-23 0 10Z', GREY) + Pa('M4 10L-3-24-5-23 0 10Z', GREY)) + Gp('translate(92,76)', R(-10, -6, 20, 12, 4, P));
A.boardGame = () => R(16, 22, 88, 64, 8, W) + [[0, 0, T], [1, 0, S], [2, 0, G], [3, 0, K], [3, 1, P], [3, 2, T], [2, 2, S], [1, 2, G], [0, 2, K], [0, 1, P]].map(([c, r, f]) => R(26 + c * 18, 32 + r * 16, 14, 12, 3, f)).join('') + R(60, 50, 16, 16, 3, I) + Ci(64, 54, 1.8, W) + Ci(72, 62, 1.8, W) + Ci(68, 58, 1.8, W) + Ci(40, 54, 5, T);
A.jobsList = () => R(30, 14, 60, 76, 6, W) + R(48, 10, 24, 10, 4, I) + [30, 46, 62].map((y, i) => R(38, y, 12, 12, 3, i < 2 ? G : GREY) + (i < 2 ? St(`M41 ${y + 6}L44 ${y + 9} 48 ${y + 3}`, W, 2.4) : '') + R(56, y + 4, 26, 4, 2, GREY)).join('') + R(38, 76, 44, 4, 2, GREY, 'opacity=".5"');
A.familyGame = () => bust('D', 30, 40, .56, 'laugh') + bust('G3', 90, 34, .6, 'smile', { shirt: P }) + R(14, 64, 92, 8, 4, '#C08457') + Gp('translate(60,58)', R(-18, -8, 36, 10, 3, W) + R(-14, -6, 8, 6, 1, T) + R(-4, -6, 8, 6, 1, K) + R(6, -6, 8, 6, 1, G)) + R(22, 72, 6, 18, 3, '#C08457') + R(92, 72, 6, 18, 3, '#C08457');
A.helpDinner = () => Gp('translate(52,56)', Pa('M-30-10H30V14C30 22 24 28 16 28H-16C-24 28-30 22-30 14Z', GREY) + R(-34, -14, 68, 8, 4, I) + R(30, -8, 16, 6, 3, I)) + St('M42 30Q46 22 42 14M56 30Q60 22 56 14M70 30Q74 22 70 14', GREY, 3) + Gp('translate(94,64) rotate(-20)', R(-3, -22, 6, 36, 3, '#C08457') + El(0, 16, 7, 9, '#C08457'));
A.clearTable = () => R(22, 76, 76, 8, 4, S) + U('plate', 'translate(52,66) scale(.56)', `--pl:${tT}`) + U('plate', 'translate(52,58) scale(.56)', `--pl:${tT}`) + U('plate', 'translate(52,50) scale(.56)', `--pl:${tT}`) + Ci(52, 50, 20, 'none', `stroke="${T}" stroke-width="2" opacity=".4"`) + U('fork', 'translate(88,54) rotate(20) scale(.6)') + U('spoon', 'translate(98,54) rotate(20) scale(.6)', `--sp:${K}`) + R(14, 86, 92, 6, 3, '#C08457');
A.dishes = () => R(14, 56, 92, 32, 6, GREY) + R(20, 56, 80, 12, 4, K) + Pa('M76 24H92V34H86V44H76Z', I, 'opacity=".5"') + U('suds', 'translate(56,58) scale(.7)') + Gp('translate(40,48) rotate(-14)', El(0, 0, 18, 6, W) + El(0, 0, 13, 3.5, tS)) + drop(82, 50, .35);
A.shower = () => St('M30 88V20C30 12 36 8 44 8H56', GREY, 5) + Pa('M48 16H80L72 28H56Z', GREY) + [[56, 42], [64, 52], [72, 40], [60, 64], [70, 72], [78, 58], [66, 84]].map(([x, y]) => drop(x, y, .36)).join('') + U('bottle', 'translate(96,70) scale(.5)', `--bt:${T};--bt2:${I}`);
A.layOut = () => R(12, 82, 96, 6, 3, '#C08457') + U('shirt', 'translate(38,46) scale(.62)', `--sc:${S}`) + U('pants', 'translate(76,50) scale(.56)', `--pc:${I}`) + U('sock', 'translate(100,58) scale(.36)', `--sk2:${T}`) + moon(96, 16, .16);
A.packTomorrow = () => U('backpack', 'translate(52,56) scale(.95)', `--bp:${G};--bp2:${S}`) + U('check', 'translate(92,26) scale(.4)') + moon(22, 20, .14);
A.readInBed = () => U('bed', 'translate(60,70) scale(.95)', `--bd:${K}`) + kid('J', { x: 40, y: 72, s: .5, legs: false, face: 'smile', aL: 60, aR: -60 }) + U('blanket', 'translate(62,70) scale(.9)', `--bl:${P}`) + book(54, 50, .36, T) + Gp('translate(98,30)', Pa('M-10-10H10L14 6H-14Z', S) + R(-2, 6, 4, 10, 2, I));
A.journal = () => Gp('rotate(-6 56 54)', R(22, 18, 64, 72, 6, P) + R(28, 22, 54, 64, 3, W) + [36, 46, 56, 66].map(y => R(34, y, 40, 3, 1.5, GREY)).join('') + heart(62, 76, .14)) + Gp('translate(96,50) rotate(24)', R(-5, -30, 10, 48, 2, K) + Pa('M-5 18H5L0 28Z', SAND));
A.talkDay = () => bust('L', 34, 50, .7, 'laugh') + bust('G5', 88, 46, .74, 'smile') + Gp('translate(56,16)', R(-12, -9, 24, 18, 7, W) + sun(0, 0, .1)) + Gp('translate(74,14)', R(-8, -7, 16, 14, 6, W) + heart(0, 0, .12));
A.tidyRoom = () => U('bed', 'translate(50,66) scale(.8)', `--bd:${G}`) + U('blanket', 'translate(52,62) scale(.76)', `--bl:${K}`) + R(86, 50, 22, 38, 3, '#C08457') + R(89, 54, 16, 14, 2, S) + R(89, 72, 16, 14, 2, S) + sparkle(96, 26, .7) + sparkle(22, 26, .5);
A.foldClothes = () => R(24, 64, 72, 14, 4, K) + R(28, 50, 64, 14, 4, T) + Gp('translate(60,34)', Pa('M-28 8H28V16H-28Z', G) + Pa('M-28 8L-18-4H18L28 8Z', G) + Pa('M-6-4Q0 4 6-4Z', '#27875A')) + R(20, 80, 80, 6, 3, '#C08457', 'opacity=".0"');
A.trash = () => Pa('M32 34H88L82 88H38Z', I) + R(28, 26, 64, 10, 5, I) + R(52, 18, 16, 10, 4, I) + [48, 60, 72].map(x => R(x - 2, 44, 4, 36, 2, W, 'opacity=".3"')).join('') + Gp('translate(96,64) rotate(20)', Pa('M-10-12H10L12 12H-12Z', GREY) + St('M-4-12L-8-18M4-12L8-18', GREY, 2.5));
A.vacuum = () => St('M40 20V60Q40 74 54 74H62', I, 5) + R(30, 10, 20, 16, 5, P) + R(54, 70, 44, 14, 7, P) + Ci(62, 86, 4, I) + Ci(90, 86, 4, I) + [[22, 84], [30, 88]].map(([x, y]) => Ci(x, y, 2.4, GREY)).join('');
A.walkDog = () => Gp('translate(76,70) scale(.5) scale(-1,1)', U('dog'), `--dg:#C08457;--ear:${I}`) + stand('D', 34, 88, .56, { face: 'laugh', aR: -40, lL: 10, lR: -10 }) + St('M52 64Q66 66 92 60', T, 2.4) + ground(G);
A.wipeCounter = () => R(12, 60, 96, 10, 3, GREY) + R(14, 70, 92, 20, 3, W) + Gp('translate(50,52) rotate(-8)', R(-16, -8, 32, 16, 5, G)) + hand(50, 42, 1, SK[4], 0) + Gp('translate(92,36)', R(-9, -8, 18, 32, 5, K) + R(-6, -20, 11, 14, 3, I)) + sparkle(24, 40, .5, K);
A.helpSibling = () => stand('A', 38, 88, .62, { face: 'joy', aR: -60, aL: 10 }) + stand('E', 80, 88, .42, { face: 'laugh', flip: true, aR: -60, aL: 10 }) + heart(60, 22, .2);
A.rake = () => Gp('translate(46,52) rotate(28)', R(-3, -44, 6, 70, 3, '#C08457') + R(-22, 24, 44, 6, 3, GREY) + [-18, -10, -2, 6, 14].map(x => R(x, 28, 3, 12, 1.5, GREY)).join('')) + [[78, 80, T], [92, 74, S], [100, 84, '#C08457'], [70, 70, S], [86, 62, T]].map(([x, y, f]) => Gp(`translate(${x},${y}) rotate(${x * 7})`, Pa('M0-8C6-4 6 4 0 8C-6 4-6-4 0-8Z', f))).join('') + ground('#8D5A3B');
A.makeLunch = () => R(18, 56, 84, 30, 6, K) + R(22, 60, 36, 22, 3, W) + R(62, 60, 36, 22, 3, W) + U('sandwich', 'translate(40,72) scale(.26)') + U('banana', 'translate(80,70) scale(.3)') + Pa('M18 56L30 30H90L102 56Z', '#2E6EB5');
A.chargeOut = () => A.devicesSleep();
A.feedPetBig = () => Gp('translate(50,60) scale(.6)', U('cat'), `--ct:${P}`) + Gp('translate(90,80)', Pa('M-16-6H16L12 6H-12Z', K) + El(0, -6, 16, 4, '#C08457'));
A.freePlay = () => U('ball', 'translate(30,70) scale(.3)') + Gp('translate(66,58)', R(-24, -18, 48, 36, 4, W) + Ci(-8, -4, 6, S) + Pa('M-20 14L-4 0 6 10 20-2V14Z', G)) + star(100, 24, .6, S) + note(96, 76, .6, P);
A.outsideTime = () => sun(94, 22, .22) + U('tree', 'translate(40,50) scale(.8)') + U('ball', 'translate(84,74) scale(.26)') + ground(G);

// ---- 5-12 variants so no two cards share the same picture ----
A.makeBedBig = () => U('bed', 'translate(58,66) scale(.95)', `--bd:${K}`) + Pa('M30 56H102A6 6 0 0 1 108 62V78H30Z', G) + R(30, 62, 78, 4, 2, W, 'opacity=".5"') + U('check', 'translate(94,24) scale(.38)');
A.setTableBig = () => [[34, T], [86, K]].map(([x, f]) => U('plate', `translate(${x},58) scale(.62)`, `--pl:${f === T ? tT : tK}`) + U('fork', `translate(${x - 28},60) scale(.5)`) + U('spoon', `translate(${x + 28},60) scale(.5)`, `--sp:${f}`)).join('') + U('cup', 'translate(60,24) scale(.36)', `--c1:${G};--c2:${S}`);
A.putAwayDishes = () => R(18, 14, 84, 76, 6, '#C08457') + R(24, 20, 72, 30, 3, W) + R(24, 56, 72, 28, 3, W) + [36, 50, 64].map(x => El(x, 36, 4, 12, T)).join('') + [80, 88].map(x => Pa(`M${x - 5} 30H${x + 5}L${x + 3} 48H${x - 3}Z`, K)).join('') + [34, 44].map(x => Pa(`M${x - 5} 66H${x + 5}L${x + 3} 82H${x - 3}Z`, G)).join('') + Gp('translate(76,72)', El(0, 0, 16, 6, S)) + hand(100, 64, .9, SK[1], -30);
A.sortRecycling = () => [[36, G, '#27875A'], [84, K, '#2E6EB5']].map(([x, f, d]) => Pa(`M${x - 22} 44H${x + 22}L${x + 18} 88H${x - 18}Z`, f) + R(x - 25, 38, 50, 8, 4, d)).join('') + Gp('translate(36,24) rotate(-14)', R(-6, -14, 12, 26, 4, tK) + R(-3, -18, 6, 6, 2, tK)) + Gp('translate(84,26) rotate(10)', R(-11, -9, 22, 18, 2, SAND)) + Gp('translate(36,66)', St('M-8-4L-3-10H3L8-4M8 3L5 9H-5M-8 3L-11-1', W, 3)) + Gp('translate(84,66)', St('M-8-4L-3-10H3L8-4M8 3L5 9H-5M-8 3L-11-1', W, 3));
A.screensLaterBig = () => Ci(22, 20, 12, K) + bigNum(22, 27, '2', W, 18) + tablet(52, 56, .56, -6) + U('check', 'translate(92,28) scale(.3)') + Gp('translate(94,72)', U('clock', 'scale(.42)', `--ck1:${P}`));
A.washer = () => R(28, 12, 64, 78, 8, W) + R(28, 12, 64, 16, 8, GREY) + Ci(40, 20, 3, K) + Ci(50, 20, 3, T) + Ci(60, 58, 23, GREY) + Ci(60, 58, 17, K) + Pa('M44 62C50 56 56 66 62 60S72 56 76 60V64C72 72 66 76 60 76C52 76 46 70 44 62Z', tK) + Ci(52, 54, 3, W, 'opacity=".7"');
A.houseplant = () => Gp('translate(52,50)', Pa('M-16 14H16L12 40H-12Z', T) + R(-19, 10, 38, 8, 4, '#D24A28') + [[-18, -10, -40], [0, -24, 0], [18, -10, 40], [-10, -2, -20], [10, -2, 20]].map(([x, y, r]) => Gp(`translate(${x},${y}) rotate(${r})`, Pa('M0-16C9-8 9 8 0 16C-9 8-9-8 0-16Z', G))).join('')) + Gp('translate(92,56)', R(-10, -10, 20, 30, 6, K) + R(-6, -22, 10, 14, 3, I) + R(2, -22, 10, 5, 2, I)) + drop(80, 28, .3) + drop(72, 20, .26);
A.breakfastBig = () => U('plate', 'translate(48,60) scale(.95)', `--pl:${tS}`) + Gp('translate(46,56) rotate(-8)', R(-18, -16, 36, 32, 9, '#E3B04B') + R(-13, -11, 26, 22, 6, SAND) + R(-8, -6, 12, 10, 3, S)) + Pa('M82 30H104L100 86H86Z', GREY) + Pa('M83.5 40H102.5L100 86H86Z', W);
A.familyDinnerBig = () => El(60, 54, 50, 38, '#C08457') + [[60, 24], [60, 84], [22, 54], [98, 54]].map(([x, y]) => Ci(x, y, 11, W) + Ci(x, y, 7, tS)).join('') + Ci(60, 54, 12, T) + Ci(60, 54, 7, S);
A.pjBig = () => Gp('translate(60,52)', Pa('M-14-30L-34-20-42 0-28 6-24-4V34H24V-4L28 6 42 0 34-20 14-30C10-22-10-22-14-30Z', K) + [-18, -6, 6, 18].map(y => R(-24, y, 48, 5, 0, W, 'opacity=".45"')).join('') + Ci(0, -12, 2.4, W) + Ci(0, 0, 2.4, W) + Ci(0, 12, 2.4, W)) + moon(98, 20, .18);
A.lightsOutBig = () => R(16, 16, 40, 44, 5, I) + moon(36, 38, .26) + star(46, 26, .35, S) + R(16, 36, 40, 3, 0, '#2A3A57') + R(34, 16, 3, 44, 0, '#2A3A57') + R(62, 70, 44, 20, 4, '#C08457') + Gp('translate(84,48)', Pa('M-14-18H14L18 4H-18Z', GREY) + R(-2, 4, 4, 14, 2, I) + R(-10, 16, 20, 5, 2.5, I)) + zz(24, 84, I);
A.backpackDoor = () => R(60, 10, 44, 82, 4, P) + R(66, 16, 32, 70, 3, '#A07AD6') + Ci(92, 52, 3, S) + R(34, 20, 22, 5, 2.5, I) + R(38, 24, 4, 8, 2, I) + U('backpack', 'translate(40,58) scale(.62)', `--bp:${T};--bp2:${S}`) + shoe(40, 88, .22, K, W);

module.exports = { A, NEW_SYMBOLS, CAST, R, Ci, Pa, St, Gp, U, Tx, star, moon, sun, tablet, heart, bigNum, stand, kid, adult, head, bust };
