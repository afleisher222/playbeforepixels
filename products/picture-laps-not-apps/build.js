// Build script for "Laps Not Apps" — PERSONALIZED keepsake edition (8.5 x 8.5 in picture book, 32 interior pages).
// Every word comes from WORDS.md (the founder's file); every order variable comes from personalize.js (map: personalization.json).
// Modes:
//   node build.js [--look 1-4]      sample book for the example order: source.html (cover + 32 interior + back), interior-only.html,
//                                   cover.html, cover-wrap-hardcover.html, cover-wrap-softcover.html, picker.html, mockup.html
//   node build.js --template        template.html: every variable shown as a highlighted {{TOKEN}} (for checking the variable map)
//   node build.js --order o.json --out <dir> [--cover-w in --cover-h in --spine in] [--allow-drafts]
//                                   one customer's interior.html + cover-wrap.html + check.json (then: node render-order.js <dir>)
// Units inside the art: 1 unit = 0.01 in. Page = 875 x 875 units (8.5 in trim + 0.125 in bleed each side).
const fs = require('fs'), path = require('path');
const DIR = __dirname;
const PZ = require('./personalize.js');
const ARGS = (() => { const a = process.argv.slice(2), o = {}; for (let i = 0; i < a.length; i++) if (a[i].startsWith('--')) { const k = a[i].slice(2); o[k] = (a[i + 1] !== undefined && !a[i + 1].startsWith('--')) ? a[++i] : true; } return o; })();
const MODE = ARGS.template ? 'template' : ARGS.order ? 'order' : 'sample';
const ORDER = MODE === 'order' ? JSON.parse(fs.readFileSync(ARGS.order, 'utf8')) : { ...PZ.SAMPLE_ORDER, ...(ARGS.look ? { look: +ARGS.look } : {}) };
const NZ = PZ.normalize(ORDER);
if (!NZ.ok) { console.error('ORDER ERROR (cannot build): ' + NZ.errors.join('; ')); process.exit(2); }
const LOOK = PZ.LOOKS[NZ.look];
// Etsy edition: no URL and no QR code anywhere in the book (BRAND.md customer-voice rule 2; Etsy's no-off-site-links rule).
const ETSY = String(ORDER.channel || '').trim().toLowerCase() === 'etsy';
// Every POD interior carries a version line (BRAND.md customer-voice rule 3). Bump it whenever the words or art change.
const VERSION = 'Version 1.0 · September 2026';

const C = { ink: '#1D2940', paper: '#FFFFFF', wash: '#F3F6FB', tomato: '#EE5A36', sun: '#F5B820', sky: '#3D86D8', grass: '#2FA36B', plum: '#8A5CC7',
  tT: '#FDE9E3', sT: '#FEF4D8', kT: '#E3EEFA', gT: '#DFF3E9', pT: '#EFE6FA' };
const SK = { s1: '#F4CFAE', s2: '#E0AC80', s3: '#C08457', s4: '#8D5A3B', s5: '#5C3A26', s6: '#3E271B' };
const H = { black: '#2B1D16', brown: '#5A3825', auburn: '#A0522D', blond: '#E3B04B', navy: '#1D2940' };
const f = n => +(+n).toFixed(2);

/* ---------------------------------------------------------------- faces & hair */
function face(cx, cy, r, mood, skin, cheeks = true) {
  const dark = skin === SK.s5 || skin === SK.s6;
  const lineC = dark ? C.tT : C.ink;
  const ex = r * 0.36, ey = cy + r * 0.04, er = r * 0.12;
  const closed = mood === 'sleep' || mood === 'yawn' || mood === 'content';
  let s = '';
  for (const sx of [-1, 1]) {
    const x = cx + sx * ex;
    if (closed) s += `<path d="M${f(x - er * 1.45)} ${f(ey - er * 0.1)} Q${f(x)} ${f(ey + er * 1.6)} ${f(x + er * 1.45)} ${f(ey - er * 0.1)}" stroke="${lineC}" stroke-width="${f(er * 0.8)}" fill="none" stroke-linecap="round"/>`;
    else s += (skin === SK.s6 ? `<circle cx="${f(x)}" cy="${f(ey)}" r="${f(er * 1.5)}" fill="${C.paper}"/>` : '') + `<circle cx="${f(x)}" cy="${f(ey)}" r="${f(er)}" fill="${C.ink}"/><circle cx="${f(x + er * 0.36)}" cy="${f(ey - er * 0.36)}" r="${f(er * 0.38)}" fill="${C.paper}"/>`;
  }
  if (cheeks) for (const sx of [-1, 1]) s += `<circle cx="${f(cx + sx * r * 0.6)}" cy="${f(cy + r * 0.38)}" r="${f(r * 0.15)}" fill="${C.tomato}" opacity="${dark ? 0.5 : 0.3}"/>`;
  const my = cy + r * 0.42;
  if (mood === 'open' || mood === 'sing') {
    const w = mood === 'open' ? r * 0.28 : r * 0.18, h = mood === 'open' ? r * 0.34 : r * 0.24;
    s += `<path d="M${f(cx - w)} ${f(my)} L${f(cx + w)} ${f(my)} Q${f(cx + w)} ${f(my + h)} ${f(cx)} ${f(my + h)} Q${f(cx - w)} ${f(my + h)} ${f(cx - w)} ${f(my)}Z" fill="${C.ink}"/>`;
    s += `<ellipse cx="${f(cx)}" cy="${f(my + h * 0.72)}" rx="${f(w * 0.52)}" ry="${f(h * 0.22)}" fill="${C.tomato}"/>`;
  } else if (mood === 'yawn') {
    s += `<ellipse cx="${f(cx)}" cy="${f(my + r * 0.12)}" rx="${f(r * 0.15)}" ry="${f(r * 0.2)}" fill="${C.ink}"/>`;
  } else if (mood === 'o') {
    s += `<ellipse cx="${f(cx)}" cy="${f(my + r * 0.08)}" rx="${f(r * 0.1)}" ry="${f(r * 0.13)}" fill="${C.ink}"/>`;
  } else {
    s += `<path d="M${f(cx - r * 0.24)} ${f(my)} Q${f(cx)} ${f(my + r * 0.24)} ${f(cx + r * 0.24)} ${f(my)}" stroke="${lineC}" stroke-width="${f(r * 0.09)}" fill="none" stroke-linecap="round"/>`;
  }
  return s;
}

function hair(style, cx, cy, r, col) {
  const cap = (dip, ext = 1.05, low = 0, skew = 0.15) => {
    const R = r * ext, th = Math.asin(low), x1 = cx - R * Math.cos(th), x2 = cx + R * Math.cos(th), y = cy + R * low;
    return `<path d="M${f(x1)} ${f(y)} A${f(R)} ${f(R)} 0 ${low > 0 ? 1 : 0} 1 ${f(x2)} ${f(y)} Q${f(cx + r * skew)} ${f(cy - r * dip)} ${f(x1)} ${f(y)}Z" fill="${col}"/>`;
  };
  let back = '', front = '';
  switch (style) {
    case 'short': front = cap(0.62, 1.05, -0.05, 0.3); break;
    case 'crop': // short, side-swept fringe with a little flick on top (picker look 2)
      front = cap(0.3, 1.06, 0.02, -0.55) + `<path d="M${f(cx + r * 0.1)} ${f(cy - r * 0.98)} q${f(r * 0.06)} ${f(-r * 0.4)} ${f(r * 0.42)} ${f(-r * 0.3)}" stroke="${col}" stroke-width="${f(r * 0.16)}" fill="none" stroke-linecap="round"/>`; break;
    case 'puffs':
      back = `<circle cx="${f(cx - r * 0.92)}" cy="${f(cy - r * 0.72)}" r="${f(r * 0.44)}" fill="${col}"/><circle cx="${f(cx + r * 0.92)}" cy="${f(cy - r * 0.72)}" r="${f(r * 0.44)}" fill="${col}"/>`;
      front = cap(0.95, 1.05, -0.12, 0); break;
    case 'bun':
      back = `<circle cx="${f(cx)}" cy="${f(cy - r * 1.02)}" r="${f(r * 0.42)}" fill="${col}"/>`;
      front = cap(0.72, 1.07, 0.08, 0.2); break;
    case 'long':
      back = `<rect x="${f(cx - r * 1.2)}" y="${f(cy - r * 0.9)}" width="${f(r * 2.4)}" height="${f(r * 2.35)}" rx="${f(r * 0.8)}" fill="${col}"/>`;
      front = cap(0.5, 1.08, 0.3, -0.4); break;
    case 'bob':
      back = `<rect x="${f(cx - r * 1.15)}" y="${f(cy - r * 1.0)}" width="${f(r * 2.3)}" height="${f(r * 1.72)}" rx="${f(r * 0.8)}" fill="${col}"/>`;
      front = cap(0.55, 1.08, 0.22, 0); break;
    case 'wrap':
      back = `<ellipse cx="${f(cx)}" cy="${f(cy - r * 0.92)}" rx="${f(r * 0.98)}" ry="${f(r * 0.72)}" fill="${col}"/>`;
      front = cap(0.5, 1.06, -0.02, 0) + `<circle cx="${f(cx + r * 0.62)}" cy="${f(cy - r * 1.28)}" r="${f(r * 0.3)}" fill="${col}"/><rect x="${f(cx - r * 1.04)}" y="${f(cy - r * 0.34)}" width="${f(r * 2.08)}" height="${f(r * 0.16)}" rx="${f(r * 0.08)}" fill="${C.tomato}"/>`;
      break;
    case 'tuft':
      front = `<path d="M${f(cx - r * 0.05)} ${f(cy - r * 0.97)} q${f(-r * 0.08)} ${f(-r * 0.42)} ${f(r * 0.32)} ${f(-r * 0.36)}" stroke="${col}" stroke-width="${f(r * 0.14)}" fill="none" stroke-linecap="round"/>`; break;
  }
  return { back, front };
}
function beard(cx, cy, r, col) {
  return `<path d="M${f(cx - r)} ${f(cy)} A${f(r)} ${f(r)} 0 0 0 ${f(cx + r)} ${f(cy)} C${f(cx + r * 0.86)} ${f(cy + r * 0.52)} ${f(cx + r * 0.46)} ${f(cy + r * 0.6)} ${f(cx)} ${f(cy + r * 0.74)} C${f(cx - r * 0.46)} ${f(cy + r * 0.6)} ${f(cx - r * 0.86)} ${f(cy + r * 0.52)} ${f(cx - r)} ${f(cy)}Z" fill="${col}"/>`;
}
function glasses(cx, cy, r) {
  const ex = r * 0.36, ey = cy + r * 0.04, gr = r * 0.23;
  return `<g fill="none" stroke="${C.ink}" stroke-width="${f(r * 0.065)}"><circle cx="${f(cx - ex)}" cy="${f(ey)}" r="${f(gr)}"/><circle cx="${f(cx + ex)}" cy="${f(ey)}" r="${f(gr)}"/><path d="M${f(cx - ex + gr)} ${f(ey)} Q${f(cx)} ${f(ey - gr * 0.5)} ${f(cx + ex - gr)} ${f(ey)}"/></g>`;
}
function head(cx, cy, r, p) {
  const hr = hair(p.hs, cx, cy, r, p.hc);
  let s = '';
  s += `<circle cx="${f(cx - r * 0.97)}" cy="${f(cy + r * 0.1)}" r="${f(r * 0.19)}" fill="${p.skin}"/><circle cx="${f(cx + r * 0.97)}" cy="${f(cy + r * 0.1)}" r="${f(r * 0.19)}" fill="${p.skin}"/>`;
  if (p.earrings) s += `<circle cx="${f(cx - r * 0.99)}" cy="${f(cy + r * 0.36)}" r="${f(r * 0.1)}" fill="${C.sun}"/><circle cx="${f(cx + r * 0.99)}" cy="${f(cy + r * 0.36)}" r="${f(r * 0.1)}" fill="${C.sun}"/>`;
  s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="${p.skin}"/>`;
  if (p.beard) s += beard(cx, cy, r, p.hc);
  s += face(cx, cy, r, p.mood || 'smile', p.skin, p.cheeks !== false);
  s += hr.front;
  if (p.glasses) s += glasses(cx, cy, r);
  if (p.flower) {
    const fx = cx + r * 0.78, fy = cy - r * 0.7, pr = r * 0.17;
    for (let i = 0; i < 5; i++) { const a = i * 2 * Math.PI / 5; s += `<circle cx="${f(fx + Math.cos(a) * pr * 1.1)}" cy="${f(fy + Math.sin(a) * pr * 1.1)}" r="${f(pr)}" fill="${C.tomato}"/>`; }
    s += `<circle cx="${f(fx)}" cy="${f(fy)}" r="${f(pr * 0.8)}" fill="${C.sun}"/>`;
  }
  return { back: hr.back, s };
}

/* ---------------------------------------------------------------- characters */
// Adult, seated, front view. Symbol box 240 x 300. Lap top ~ y188. Shoes bottom y296 (chair) / y254 (floor).
function adultBody(p) {
  const cx = 120, cy = 62, r = 38;
  const h = head(cx, cy, r, { cheeks: false, ...p });
  let s = h.back;
  s += `<rect x="108" y="86" width="24" height="26" fill="${p.skin}"/>`;
  if (p.seat === 'floor') {
    s += `<rect x="24" y="210" width="192" height="44" rx="22" fill="${p.pants}"/><ellipse cx="34" cy="240" rx="21" ry="13" fill="${p.shoes}"/><ellipse cx="206" cy="240" rx="21" ry="13" fill="${p.shoes}"/>`;
  } else {
    s += `<rect x="78" y="216" width="36" height="68" rx="12" fill="${p.pants}"/><rect x="126" y="216" width="36" height="68" rx="12" fill="${p.pants}"/>`;
    s += `<rect x="70" y="274" width="48" height="22" rx="11" fill="${p.shoes}"/><rect x="122" y="274" width="48" height="22" rx="11" fill="${p.shoes}"/>`;
  }
  s += `<rect x="70" y="100" width="100" height="112" rx="34" fill="${p.shirt}"/>`;
  s += `<rect x="50" y="108" width="30" height="84" rx="15" fill="${p.shirt}"/><rect x="160" y="108" width="30" height="84" rx="15" fill="${p.shirt}"/>`;
  s += `<rect x="58" y="186" width="124" height="46" rx="22" fill="${p.pants}"/>`;
  s += h.s;
  return s;
}
function adultArms(p, kind) {
  const hand = (x, y) => `<circle cx="${x}" cy="${y}" r="13" fill="${p.skin}"/>`;
  const arm = d => `<path d="${d}" stroke="${p.shirt}" stroke-width="26" fill="none" stroke-linecap="round"/>`;
  switch (kind) {
    case 'hug': return arm('M65 178 Q70 212 102 208') + arm('M175 178 Q170 212 138 208') + hand(104, 207) + hand(136, 207);
    case 'rest': return arm('M65 178 L76 204') + arm('M175 178 L164 204') + hand(80, 208) + hand(160, 208);
    case 'book': return arm('M65 178 Q66 200 80 198') + arm('M175 178 Q174 200 160 198') + hand(84, 196) + hand(156, 196);
    case 'lift': return arm('M65 178 Q66 160 90 158') + arm('M175 178 Q174 160 150 158') + hand(94, 157) + hand(146, 157);
    case 'torch': return arm('M65 178 L76 204') + hand(80, 208) + arm('M175 178 Q206 160 200 128') + hand(199, 124);
  }
  return '';
}
// Child. Symbol box 120 x 200. Sitting: seat line y ~124, feet y145. Standing: shoes bottom y188.
function kidBody(p) {
  const cx = 60, cy = 42, r = 32;
  const h = head(cx, cy, r, p);
  let s = h.back;
  if (p.pose === 'stand') {
    s += `<rect x="41" y="110" width="17" height="68" rx="8" fill="${p.pants}"/><rect x="62" y="110" width="17" height="68" rx="8" fill="${p.pants}"/>`;
    s += `<rect x="34" y="172" width="26" height="16" rx="8" fill="${p.shoes}"/><rect x="60" y="172" width="26" height="16" rx="8" fill="${p.shoes}"/>`;
  } else {
    s += `<rect x="40" y="106" width="18" height="38" rx="9" fill="${p.pants}"/><rect x="62" y="106" width="18" height="38" rx="9" fill="${p.pants}"/>`;
    s += `<ellipse cx="49" cy="145" rx="11" ry="7" fill="${p.shoes}"/><ellipse cx="71" cy="145" rx="11" ry="7" fill="${p.shoes}"/>`;
  }
  s += `<rect x="36" y="68" width="48" height="56" rx="18" fill="${p.shirt}"/>`;
  const arm = d => `<path d="${d}" stroke="${p.shirt}" stroke-width="13" fill="none" stroke-linecap="round"/>`;
  const hand = (x, y) => `<circle cx="${x}" cy="${y}" r="7.5" fill="${p.skin}"/>`;
  switch (p.arms || 'down') {
    case 'down': s += arm('M39 80 L33 104') + arm('M81 80 L87 104') + hand(32, 109) + hand(88, 109); break;
    case 'up': s += arm('M39 80 L21 54') + arm('M81 80 L99 54') + hand(19, 49) + hand(101, 49); break;
    case 'point': s += arm('M39 80 L33 104') + hand(32, 109) + arm('M81 80 L106 60') + hand(110, 56); break;
    case 'pointL': s += arm('M39 80 L14 60') + hand(10, 56) + arm('M81 80 L87 104') + hand(88, 109); break;
    case 'clap': s += arm('M39 80 Q31 100 52 96') + arm('M81 80 Q89 100 68 96') + hand(55, 94) + hand(65, 94); break;
    case 'hold': s += arm('M39 80 Q34 98 44 101') + arm('M81 80 Q86 98 76 101') + hand(46, 101) + hand(74, 101); break;
  }
  s += h.s;
  return s;
}

const P = {
  // the story's child: skin and hair come from the order's "look" (character picker)
  kid: { skin: LOOK.skin, hc: LOOK.hair, hs: LOOK.hs, shirt: C.sun, pants: C.sky, shoes: C.tomato },
  kidpj: { skin: LOOK.skin, hc: LOOK.hair, hs: LOOK.hs, shirt: C.plum, pants: C.plum, shoes: C.pT },
  ada: { skin: SK.s2, hc: H.auburn, hs: 'bob', shirt: C.tomato, pants: C.sun, shoes: C.ink, flower: true },
  baby: { skin: SK.s6, hc: H.black, hs: 'tuft', shirt: C.sky, pants: C.sky, shoes: C.kT },
  dad: { skin: SK.s5, hc: H.black, hs: 'short', shirt: C.grass, pants: C.ink, shoes: C.tomato, beard: true },
  gma: { skin: SK.s3, hc: C.wash, hs: 'bun', shirt: C.plum, pants: C.ink, shoes: C.tomato, glasses: true, cheeks: true },
  theo: { skin: SK.s4, hc: H.black, hs: 'short', shirt: C.tomato, pants: C.sky, shoes: C.paper, seat: 'floor', cheeks: true },
  jo: { skin: SK.s1, hc: H.auburn, hs: 'long', shirt: C.sky, pants: C.plum, shoes: C.tomato, seat: 'floor', cheeks: true },
  bea: { skin: SK.s6, hc: C.sun, hs: 'wrap', shirt: C.plum, pants: C.sky, shoes: C.sun, seat: 'floor', earrings: true },
};

/* ---------------------------------------------------------------- symbols */
const SYM = [];
const sym = (id, w, h, body) => SYM.push(`<symbol id="${id}" viewBox="0 0 ${w} ${h}" overflow="visible">${body}</symbol>`);
const SIZE = {};
function defA(id, base, o = {}) { sym(id, 240, 300, adultBody({ ...P[base], ...o })); SIZE[id] = [240, 300]; }
function defK(id, base, o = {}) { sym(id, 120, 200, kidBody({ ...P[base], ...o })); SIZE[id] = [120, 200]; }
for (const k of ['dad', 'gma', 'theo', 'jo', 'bea']) for (const a of ['hug', 'rest', 'book', 'lift', 'torch']) { sym(`${k}-${a}`, 240, 300, adultArms(P[k], a)); SIZE[`${k}-${a}`] = [240, 300]; }
defA('dad', 'dad'); defA('dad-sing', 'dad', { mood: 'sing' });
defA('gma', 'gma'); defA('gma-open', 'gma', { mood: 'open' });
defA('theo', 'theo'); defA('theo-sing', 'theo', { mood: 'sing' });
defA('jo', 'jo'); defA('bea', 'bea');
defK('kid-sit', 'kid'); defK('kid-sit-point', 'kid', { arms: 'point', mood: 'open' }); defK('kid-sit-hold', 'kid', { arms: 'hold' });
defK('kid-sit-laugh', 'kid', { arms: 'hold', mood: 'open' }); defK('kid-sit-sing', 'kid', { arms: 'clap', mood: 'sing' });
defK('kid-sit-clap', 'kid', { arms: 'clap', mood: 'open' }); defK('kid-sit-content', 'kid', { mood: 'content' });
defK('kid-stand', 'kid', { pose: 'stand', arms: 'up', mood: 'open' }); defK('kid-stand-point', 'kid', { pose: 'stand', arms: 'pointL', mood: 'o' });
defK('kidpj-stand', 'kidpj', { pose: 'stand' }); defK('kidpj-yawn', 'kidpj', { pose: 'stand', mood: 'yawn', arms: 'up' });
defK('kidpj-sleep', 'kidpj', { mood: 'sleep' });
defK('ada-sit', 'ada', { arms: 'hold' }); defK('baby-up', 'baby', { arms: 'up' });
// all four picker looks (standing, arms up) for the picker and mockup images
for (const [n, L] of Object.entries(PZ.LOOKS)) defK(`look-${n}`, 'kid', { skin: L.skin, hc: L.hair, hs: L.hs, pose: 'stand', arms: 'up', mood: 'open' });

// props in adult coordinates (240 x 300)
sym('armchair', 240, 300, `<rect x="22" y="80" width="196" height="160" rx="46" fill="${C.tomato}"/><rect x="0" y="158" width="58" height="106" rx="26" fill="${C.tomato}"/><rect x="182" y="158" width="58" height="106" rx="26" fill="${C.tomato}"/><rect x="44" y="212" width="152" height="52" rx="14" fill="${C.tT}"/><rect x="30" y="262" width="14" height="36" rx="5" fill="${C.ink}"/><rect x="196" y="262" width="14" height="36" rx="5" fill="${C.ink}"/>`);
function wheel(cx, cy) {
  return `<circle cx="${cx}" cy="${cy}" r="62" fill="none" stroke="${C.ink}" stroke-width="14"/><circle cx="${cx}" cy="${cy}" r="47" fill="none" stroke="${C.sky}" stroke-width="5"/>` +
    [0, 60, 120].map(a => `<line x1="${f(cx + 47 * Math.cos(a * Math.PI / 180))}" y1="${f(cy + 47 * Math.sin(a * Math.PI / 180))}" x2="${f(cx - 47 * Math.cos(a * Math.PI / 180))}" y2="${f(cy - 47 * Math.sin(a * Math.PI / 180))}" stroke="${C.ink}" stroke-width="4"/>`).join('') +
    `<circle cx="${cx}" cy="${cy}" r="11" fill="${C.ink}"/>`;
}
sym('wheelchair', 240, 300, `<rect x="60" y="74" width="11" height="140" rx="5" fill="${C.ink}"/><rect x="169" y="74" width="11" height="140" rx="5" fill="${C.ink}"/><rect x="53" y="66" width="25" height="16" rx="8" fill="${C.tomato}"/><rect x="162" y="66" width="25" height="16" rx="8" fill="${C.tomato}"/><rect x="64" y="96" width="112" height="114" rx="14" fill="${C.ink}"/><rect x="48" y="208" width="144" height="24" rx="10" fill="${C.ink}"/>${wheel(38, 252)}${wheel(202, 252)}<rect x="64" y="226" width="9" height="72" fill="${C.ink}"/><rect x="167" y="226" width="9" height="72" fill="${C.ink}"/><rect x="66" y="292" width="108" height="10" rx="5" fill="${C.ink}"/><circle cx="69" cy="307" r="10" fill="${C.ink}"/><circle cx="171" cy="307" r="10" fill="${C.ink}"/>`);
sym('rocker', 240, 300, `<rect x="42" y="36" width="156" height="206" rx="44" fill="${C.tomato}"/><rect x="30" y="204" width="180" height="30" rx="14" fill="${C.tT}"/><rect x="48" y="250" width="13" height="52" fill="${C.tomato}"/><rect x="179" y="250" width="13" height="52" fill="${C.tomato}"/><path d="M6 290 Q120 330 234 290" stroke="${C.tomato}" stroke-width="13" fill="none" stroke-linecap="round"/>`);
sym('busseat', 240, 300, `<rect x="12" y="108" width="216" height="132" rx="30" fill="${C.sky}"/><rect x="6" y="204" width="228" height="30" rx="14" fill="${C.kT}"/><rect x="110" y="256" width="20" height="44" fill="${C.ink}"/><rect x="70" y="292" width="100" height="10" rx="5" fill="${C.ink}"/>`);
sym('bench', 240, 300, `<rect x="-26" y="112" width="12" height="130" fill="${C.ink}"/><rect x="254" y="112" width="12" height="130" fill="${C.ink}"/><rect x="-50" y="120" width="340" height="28" rx="12" fill="${C.tomato}"/><rect x="-50" y="160" width="340" height="28" rx="12" fill="${C.tomato}"/><rect x="-56" y="212" width="352" height="28" rx="12" fill="${C.tomato}"/><rect x="-36" y="238" width="14" height="62" rx="4" fill="${C.ink}"/><rect x="262" y="238" width="14" height="62" rx="4" fill="${C.ink}"/>`);

// animals & objects
sym('cat', 140, 90, `<path d="M118 70 Q146 80 120 88 L66 88" stroke="${C.sun}" stroke-width="14" fill="none" stroke-linecap="round"/><ellipse cx="80" cy="60" rx="58" ry="28" fill="${C.sun}"/><path d="M78 34 q7 12 0 24 M98 35 q7 12 0 24 M118 42 q6 10 0 20" stroke="${C.tomato}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M14 38 L12 10 L34 24Z" fill="${C.sun}"/><path d="M40 22 L60 10 L58 36Z" fill="${C.sun}"/><circle cx="36" cy="46" r="27" fill="${C.sun}"/><path d="M22 46 q5 5 10 0 M40 46 q5 5 10 0" stroke="${C.ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M33 54 L39 54 L36 58Z" fill="${C.tomato}"/><path d="M30 61 q3 3 6 0 q3 3 6 0" stroke="${C.ink}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`);
sym('dog', 210, 150, `<path d="M44 62 Q20 44 30 20" stroke="${C.sun}" stroke-width="13" fill="none" stroke-linecap="round"/><rect x="50" y="88" width="17" height="52" rx="8" fill="${C.sun}"/><rect x="76" y="88" width="17" height="52" rx="8" fill="${C.sun}"/><rect x="126" y="88" width="17" height="52" rx="8" fill="${C.sun}"/><rect x="150" y="88" width="17" height="52" rx="8" fill="${C.sun}"/><rect x="36" y="50" width="136" height="56" rx="28" fill="${C.sun}"/><circle cx="92" cy="72" r="15" fill="${C.tomato}"/><circle cx="160" cy="52" r="33" fill="${C.sun}"/><ellipse cx="190" cy="66" rx="19" ry="14" fill="${C.sun}"/><circle cx="206" cy="60" r="7" fill="${C.ink}"/><ellipse cx="146" cy="50" rx="12" ry="25" fill="${C.ink}" transform="rotate(18 146 50)"/><circle cx="170" cy="44" r="5" fill="${C.ink}"/><circle cx="172" cy="42" r="1.8" fill="${C.paper}"/><rect x="128" y="70" width="14" height="34" rx="6" fill="${C.sky}"/>`);
function duck(id, body, wing) { sym(id, 100, 80, `<path d="M4 40 L22 50 L12 58Z" fill="${body}"/><ellipse cx="48" cy="54" rx="40" ry="22" fill="${body}"/><circle cx="72" cy="28" r="18" fill="${body}"/><ellipse cx="92" cy="32" rx="12" ry="6.5" fill="${C.tomato}"/><circle cx="76" cy="24" r="3.6" fill="${C.ink}"/><ellipse cx="42" cy="50" rx="19" ry="10" fill="${wing}"/>`); }
duck('duck', C.sun, C.sT); duck('duck-w', C.paper, C.wash);
sym('tree', 200, 320, `<rect x="88" y="140" width="26" height="180" rx="8" fill="${H.auburn}"/><circle cx="100" cy="100" r="96" fill="${C.grass}"/>`);
sym('book', 160, 100, `<rect x="-5" y="-5" width="170" height="110" rx="10" fill="${C.tomato}"/><rect x="3" y="3" width="75" height="94" rx="5" fill="${C.paper}"/><rect x="82" y="3" width="75" height="94" rx="5" fill="${C.paper}"/><circle cx="28" cy="36" r="9" fill="${H.auburn}"/><circle cx="52" cy="36" r="9" fill="${H.auburn}"/><circle cx="40" cy="52" r="20" fill="${H.auburn}"/><circle cx="34" cy="50" r="2.6" fill="${C.ink}"/><circle cx="46" cy="50" r="2.6" fill="${C.ink}"/><ellipse cx="40" cy="58" rx="6" ry="4" fill="${C.sT}"/><rect x="20" y="78" width="40" height="7" rx="3.5" fill="${C.kT}"/><rect x="90" y="54" width="60" height="30" rx="8" fill="${C.sky}"/><ellipse cx="118" cy="46" rx="18" ry="11" fill="${C.ink}"/><circle cx="130" cy="30" r="8" fill="${C.tomato}"/><rect x="92" y="12" width="40" height="7" rx="3.5" fill="${C.kT}"/>`);
sym('mug', 50, 50, `<circle cx="38" cy="26" r="10" fill="none" stroke="${C.sky}" stroke-width="7"/><rect x="0" y="6" width="38" height="44" rx="9" fill="${C.sky}"/>`);
sym('phone-down', 80, 40, `<rect x="0" y="0" width="80" height="40" rx="10" fill="${C.ink}"/><rect x="7" y="6" width="22" height="22" rx="7" fill="${C.wash}"/><circle cx="13" cy="12" r="3.4" fill="${C.ink}"/><circle cx="23" cy="22" r="3.4" fill="${C.ink}"/>`);
sym('note', 40, 60, `<circle cx="12" cy="48" r="11" fill="currentColor"/><rect x="18" y="6" width="6" height="44" rx="3" fill="currentColor"/><path d="M21 6 Q34 12 36 26 Q30 18 22 18Z" fill="currentColor"/>`);
sym('star', 40, 40, `<path d="M20 0 Q23 17 40 20 Q23 23 20 40 Q17 23 0 20 Q17 17 20 0Z" fill="currentColor"/>`);
sym('heart', 40, 36, `<path d="M20 36 C6 26 0 18 0 11 C0 4 5 0 11 0 C15 0 18 2 20 6 C22 2 25 0 29 0 C35 0 40 4 40 11 C40 18 34 26 20 36Z" fill="currentColor"/>`);
sym('moon', 100, 100, `<path d="M62 4 A48 48 0 1 0 96 70 A40 40 0 1 1 62 4Z" fill="currentColor"/>`);
sym('drop', 20, 30, `<path d="M10 0 Q20 16 20 20 A10 10 0 0 1 0 20 Q0 16 10 0Z" fill="currentColor"/>`);
sym('cloud', 160, 70, `<circle cx="50" cy="40" r="30" fill="currentColor"/><circle cx="92" cy="30" r="30" fill="currentColor"/><circle cx="120" cy="46" r="22" fill="currentColor"/><rect x="20" y="44" width="124" height="26" rx="13" fill="currentColor"/>`);

const U = (id, x = 0, y = 0, s = 1, style = '') => { const [w, h] = SIZE[id] || [0, 0]; return `<use href="#${id}"${w ? ` width="${w}" height="${h}"` : ''} transform="translate(${f(x)} ${f(y)}) scale(${s})"${style ? ` style="${style}"` : ''}/>`; };
for (const [id, w, h] of [['armchair', 240, 300], ['wheelchair', 240, 300], ['rocker', 240, 300], ['busseat', 240, 300], ['bench', 240, 300], ['cat', 140, 90], ['dog', 210, 150], ['duck', 100, 80], ['duck-w', 100, 80], ['tree', 200, 320], ['book', 160, 100], ['mug', 50, 50], ['phone-down', 80, 40], ['note', 40, 60], ['star', 40, 40], ['heart', 40, 36], ['moon', 100, 100], ['drop', 20, 30], ['cloud', 160, 70]]) SIZE[id] = [w, h];
const col = (id, x, y, s, c) => U(id, x, y, s, `color:${c}`);

// contact (floor) line of each seat type in adult units
const CONTACT = { couch: 296, armchair: 298, wheelchair: 318, rocker: 312, busseat: 302, bench: 300, floor: 254 };
// A grown-up lap group. cx = centre x, fy = floor y in scene units.
function lap({ a, kid, cx, fy, s = 1.5, seat = 'floor', arms = 'hug', ks = 0.88, kdy = 0, front = '', behind = '' }) {
  const base = a.split('-')[0];
  const x = cx - 120 * s, y = fy - CONTACT[seat] * s;
  const kx = 120 - 60 * ks, ky = 206 - 124 * ks + kdy;
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${s})">${behind}${SIZE[seat] ? U(seat) : ''}${U(a)}${kid ? `<g transform="translate(${f(kx)} ${f(ky)}) scale(${ks})">${U(kid)}</g>` : ''}${front}${arms ? U(`${base}-${arms}`) : ''}</g>`;
}
const standKid = (id, cx, fy, s) => U(id, cx - 60 * s, fy - 188 * s, s);
const rect = (x, y, w, h, fill, rx = 0) => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}"${rx ? ` rx="${rx}"` : ''} fill="${fill}"/>`;
const text = (x, y, str, size, fill, fam = 'Bricolage Grotesque', weight = 800, anchor = 'middle', extra = '') => `<text x="${x}" y="${y}" font-family="'${fam}', 'Nunito Sans', sans-serif" font-weight="${weight}" font-size="${size}" fill="${fill}" text-anchor="${anchor}"${extra}>${str}</text>`;
const hand = (s) => text(0, 0, s, 0, '');
function bubble(x, y, w, h, tx, ty, str, size, fill = C.paper, tc = C.ink) {
  return `<g><path d="M${x + w * 0.3} ${y + h - 2} L${tx} ${ty} L${x + w * 0.52} ${y + h - 2}Z" fill="${fill}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}"/>${text(x + w / 2, y + h / 2 + size * 0.36, str, size, tc)}</g>`;
}
function windowFrame(x, y, w, h, pane, frame, inner = '', bars = true, id) {
  return `<clipPath id="${id}"><rect x="${x + 16}" y="${y + 16}" width="${w - 32}" height="${h - 32}" rx="14"/></clipPath>` +
    rect(x, y, w, h, frame, 26) + `<g clip-path="url(#${id})">${rect(x, y, w, h, pane)}${inner}</g>` +
    (bars ? rect(x + w / 2 - 7, y + 16, 14, h - 32, frame) + rect(x + 16, y + h / 2 - 7, w - 32, 14, frame) : '');
}

/* ---------------------------------------------------------------- spreads (1750 x 875) */
const SPREADS = [];
// 1 Morning — Dad's armchair, phone resting face-down
SPREADS.push(() => rect(0, 0, 1750, 875, C.kT) + rect(0, 735, 1750, 140, C.sun) +
  windowFrame(90, 300, 270, 300, C.sT, C.paper, `<circle cx="180" cy="540" r="78" fill="${C.sun}"/>${col('cloud', 220, 360, 0.7, C.paper)}`, true, 'w1') +
  `<ellipse cx="560" cy="800" rx="240" ry="42" fill="${C.tomato}"/>` + standKid('kidpj-stand', 560, 800, 2.05) +
  text(724, 720, 'pad, pad, pad…', 36, C.ink, 'Caveat', 700) +
  // right
  rect(1500, 350, 176, 150, C.paper, 12) + rect(1514, 364, 148, 122, C.gT, 6) + `<path d="M1514 486 L1570 410 L1610 460 L1632 436 L1662 486Z" fill="${C.grass}"/><circle cx="1628" cy="394" r="14" fill="${C.sun}"/>` +
  lap({ a: 'dad', cx: 1225, fy: 805, s: 1.5, seat: 'armchair', arms: 'rest' }) +
  `<rect x="1580" y="600" width="20" height="200" fill="${C.grass}"/><ellipse cx="1590" cy="802" rx="56" ry="11" fill="${C.grass}"/><ellipse cx="1590" cy="600" rx="104" ry="26" fill="${C.grass}"/>` +
  U('phone-down', 1506, 584, 0.9) + U('mug', 1612, 548, 1));

// 2 Grandma rolls in with a book
SPREADS.push(() => rect(0, 0, 1750, 875, C.pT) + `<circle cx="1300" cy="580" r="300" fill="${C.sky}"/>` + rect(0, 745, 1750, 130, C.kT) +
  // bookshelf
  rect(96, 330, 290, 415, C.tomato, 16) + rect(114, 350, 254, 110, C.tT, 8) + rect(114, 478, 254, 110, C.tT, 8) + rect(114, 606, 254, 120, C.tT, 8) +
  [[124, 380, 28, C.sky], [156, 370, 22, C.grass], [182, 392, 30, C.sun], [216, 376, 24, C.plum], [244, 386, 26, C.ink], [290, 400, 60, C.sky, 1],
   [124, 508, 30, C.sun], [158, 498, 24, C.tomato], [186, 512, 28, C.grass], [218, 500, 22, C.sky], [246, 506, 30, C.plum], [280, 520, 60, C.grass, 1],
   [124, 640, 26, C.plum], [154, 630, 30, C.sky], [188, 646, 22, C.sun], [214, 634, 28, C.grass]].map(([x, y, w, c, lie]) => lie ? rect(x, y + 40, 76, 20, c, 4) + rect(x + 4, y + 20, 68, 20, C.tomato, 4) : rect(x, y, w, (y < 460 ? 460 : y < 590 ? 588 : 726) - y, c, 4)).join('') +
  `<rect x="266" y="662" width="70" height="64" rx="10" fill="${C.sun}"/><ellipse cx="286" cy="640" rx="16" ry="28" fill="${C.grass}"/><ellipse cx="314" cy="636" rx="16" ry="32" fill="${C.grass}"/>` +
  standKid('kid-stand', 610, 805, 2.05) +
  lap({ a: 'gma', kid: 'kid-sit-hold', cx: 1300, fy: 810, s: 1.5, seat: 'wheelchair', arms: 'book', front: U('book', 70, 166, 0.62) }) +
  U('cat', 1530, 742, 0.95));

// 3 Voices — ROAR / Again!
SPREADS.push(() => rect(0, 0, 1750, 875, C.sT) + `<circle cx="440" cy="590" r="290" fill="${C.tomato}"/>` + rect(0, 750, 1750, 125, C.tT) +
  lap({ a: 'gma-open', kid: 'kid-sit-laugh', cx: 440, fy: 815, s: 1.5, seat: 'wheelchair', arms: 'book', front: U('book', 70, 166, 0.62) }) +
  bubble(70, 330, 200, 84, 250, 440, 'ROAR!', 50) +
  text(705, 380, 'squeak!', 44, C.ink, 'Caveat', 700) + text(700, 440, 'shhh…', 40, C.ink, 'Caveat', 700) +
  // big book close-up
  `<g transform="rotate(-3 1310 590)">` + rect(958, 392, 704, 400, C.sky, 26) + rect(976, 408, 326, 368, C.paper, 12) + rect(1318, 408, 326, 368, C.paper, 12) +
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => { const a = i * Math.PI / 5; return `<circle cx="${f(1139 + Math.cos(a) * 96)}" cy="${f(588 + Math.sin(a) * 96)}" r="40" fill="${H.auburn}"/>`; }).join('') +
  `<circle cx="1139" cy="588" r="100" fill="${H.auburn}"/><circle cx="1139" cy="592" r="74" fill="${C.sun}"/><circle cx="1086" cy="532" r="18" fill="${C.sun}"/><circle cx="1192" cy="532" r="18" fill="${C.sun}"/>` +
  `<circle cx="1113" cy="578" r="8" fill="${C.ink}"/><circle cx="1165" cy="578" r="8" fill="${C.ink}"/><path d="M1127 600 L1151 600 L1139 612Z" fill="${C.tomato}"/><path d="M1117 624 L1161 624 Q1161 652 1139 652 Q1117 652 1117 624Z" fill="${C.ink}"/>` +
  rect(1350, 450, 250, 22, C.kT, 11) + rect(1350, 492, 200, 22, C.kT, 11) + rect(1350, 534, 230, 22, C.kT, 11) +
  `<ellipse cx="1470" cy="690" rx="54" ry="34" fill="${C.plum}"/><circle cx="1420" cy="662" r="26" fill="${C.plum}"/><circle cx="1402" cy="640" r="14" fill="${C.pT}"/><circle cx="1414" cy="664" r="4" fill="${C.ink}"/><path d="M1524 700 Q1560 700 1556 668" stroke="${C.plum}" stroke-width="7" fill="none" stroke-linecap="round"/>` +
  `<path d="M1644 690 L1644 776 L1560 776Z" fill="${C.wash}"/></g>` +
  `<path d="M1680 900 L1600 760" stroke="${C.sun}" stroke-width="78" stroke-linecap="round"/><circle cx="1592" cy="748" r="40" fill="${P.kid.skin}"/>` +
  bubble(1400, 338, 240, 80, 1560, 430, 'Again!', 48, C.ink, C.paper));

// 4 Bus
SPREADS.push(() => {
  const city = (x0) => [[0, 90, C.pT], [110, 50, C.tT], [190, 120, C.gT], [340, 70, C.pT], [440, 110, C.tT], [580, 60, C.gT], [680, 100, C.pT]].map(([dx, h, c]) => rect(x0 + dx, 560 - h - 60, 96, h + 80, c, 8)).join('');
  return rect(0, 0, 1750, 875, C.sT) + rect(0, 760, 1750, 115, C.tT) +
    windowFrame(80, 300, 720, 250, C.kT, C.paper, city(100) + rect(80, 520, 720, 40, C.wash) + rect(120, 330, 90, 8, C.paper, 4) + rect(560, 350, 120, 8, C.paper, 4), false, 'w4a') +
    lap({ a: 'dad', kid: 'kid-sit-point', cx: 430, fy: 815, s: 1.5, seat: 'busseat' }) +
    rect(806, 250, 18, 625, C.sun, 9) +
    windowFrame(950, 340, 720, 420, C.kT, C.paper,
      `<circle cx="1270" cy="430" r="46" fill="${C.sun}"/>` + col("cloud", 1010, 400, 0.8, C.paper) + rect(950, 610, 720, 140, C.gT) + rect(950, 600, 720, 24, C.wash) +
      U('tree', 1440, 290, 1.0) + U('dog', 1170, 470, 1.1) + text(1470, 470, '', 10, C.ink), false, 'w4b');
});

// 5 Brother's lap — song
SPREADS.push(() => rect(0, 0, 1750, 875, C.gT) + rect(0, 730, 1750, 145, C.kT) + `<ellipse cx="470" cy="792" rx="390" ry="62" fill="${C.sun}"/>` +
  lap({ a: 'theo-sing', kid: 'kid-sit-sing', cx: 470, fy: 800, s: 1.8, ks: 0.8 }) +
  col('note', 150, 400, 1.3, C.tomato) + col('note', 740, 360, 1.1, C.sky) + col('note', 720, 520, 1.4, C.plum) +
  text(1312, 500, 'QUACK!', 150, C.tomato) +
  rect(930, 660, 790, 58, C.sky, 29) +
  [0, 1, 2, 3, 4].map(i => U('duck', 970 + i * 146, 580, 1.2)).join(''));

// 6 Clap / tap / boop — and a sleepy drum
SPREADS.push(() => rect(0, 0, 1750, 875, C.tT) + `<circle cx="440" cy="560" r="250" fill="${C.sky}"/>` + rect(875, 745, 875, 130, C.sT) +
  U('kid-sit-clap', 440 - 60 * 4.2, 505 - 42 * 4.2, 4.2) +
  `<g stroke="${C.ink}" stroke-width="7" stroke-linecap="round"><path d="M340 700 L310 690 M338 730 L306 736 M540 700 L570 690 M542 730 L574 736"/></g>` +
  text(150, 420, 'clap!', 64, C.tomato, 'Caveat', 700) + text(740, 420, 'tap!', 64, C.grass, 'Caveat', 700) + text(740, 740, 'boop!', 64, C.plum, 'Caveat', 700) +
  `<ellipse cx="1310" cy="790" rx="360" ry="58" fill="${C.sun}"/>` +
  lap({ a: 'theo-sing', kid: 'kid-sit-content', cx: 1310, fy: 800, s: 1.8, ks: 0.8 }) +
  `<g fill="none" stroke="${C.sky}" stroke-width="9" stroke-linecap="round"><path d="M1580 560 q22 40 0 80"/><path d="M1616 540 q34 60 0 120"/><path d="M1040 560 q-22 40 0 80"/><path d="M1004 540 q-34 60 0 120"/></g>` +
  text(1630, 480, 'hmm…', 52, C.ink, 'Caveat', 700));

// 7 Park — two moms
SPREADS.push(() => rect(0, 0, 1750, 875, C.kT) + `<ellipse cx="1300" cy="640" rx="620" ry="110" fill="${C.gT}"/>` + rect(0, 620, 1750, 255, C.grass) +
  U('tree', 20, 330, 1.05) + col('cloud', 640, 330, 0.8, C.paper) + col('cloud', 1560, 350, 0.7, C.paper) +
  rect(160, 700, 620, 118, C.sun, 16) + [0, 1, 2, 3, 4, 5, 6].map(i => rect(196 + i * 84, 700, 30, 118, C.sT)).join('') +
  lap({ a: 'jo', kid: 'ada-sit', cx: 470, fy: 772, s: 1.55, ks: 0.85, front: U('book', 76, 168, 0.55) , arms: 'book'}) +
  rect(980, 700, 620, 118, C.tomato, 16) + [0, 1, 2, 3, 4, 5, 6].map(i => rect(1016 + i * 84, 700, 30, 118, C.tT)).join('') +
  lap({ a: 'bea', kid: 'baby-up', cx: 1290, fy: 772, s: 1.55, ks: 0.66, kdy: -8, arms: 'lift' }) +
  `<g fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"><path d="M1170 560 q-16 20 0 40 M1146 548 q-22 32 0 64 M1410 560 q16 20 0 40 M1434 548 q22 32 0 64"/></g>` +
  text(1520, 470, 'Whee!', 66, C.tomato, 'Caveat', 700));

// 8 Park bench and ducks
SPREADS.push(() => rect(0, 0, 1750, 875, C.kT) + rect(0, 630, 1750, 245, C.gT) + `<circle cx="60" cy="640" r="80" fill="${C.grass}"/><circle cx="150" cy="656" r="56" fill="${C.grass}"/>` +
  `<circle cx="1650" cy="400" r="58" fill="${C.sun}"/>` +
  lap({ a: 'dad', kid: 'kid-sit-point', cx: 430, fy: 800, s: 1.45, seat: 'bench' }) +
  `<ellipse cx="1170" cy="752" rx="260" ry="74" fill="${C.sky}"/>` +
  `<g stroke="${C.paper}" stroke-width="6" stroke-linecap="round"><path d="M960 712 L1004 712 M972 732 L1010 732"/></g>` +
  // exactly three ducks: the rhyme counts "one, two, three", and the last one (speed lines) is fast
  U('duck-w', 1016, 680, 1.0) + U('duck-w', 1136, 684, 1.0) + U('duck-w', 1256, 680, 1.0) +
  rect(1450, 662, 250, 40, C.sun, 10) +
  lap({ a: 'jo', kid: 'ada-sit', cx: 1575, fy: 686, s: 0.72, ks: 0.85, front: U('book', 76, 168, 0.55), arms: 'book' }) +
  // "a park full of laps": Mama Bea and the baby further back on the striped blanket, so the right page shows more than one lap
  rect(1180, 640, 170, 30, C.tomato, 8) + [0, 1, 2].map(i => rect(1200 + i * 52, 640, 16, 30, C.tT)).join('') +
  lap({ a: 'bea', kid: 'baby-up', cx: 1265, fy: 658, s: 0.5, ks: 0.66, kdy: -8, arms: 'lift' }));

// 9 Cat on Grandma's lap — then we share
SPREADS.push(() => rect(0, 0, 875, 875, C.pT) + rect(0, 755, 875, 120, C.plum) + rect(875, 0, 875, 875, C.sT) + rect(875, 755, 875, 120, C.sun) +
  lap({ a: 'gma', cx: 300, fy: 812, s: 1.35, seat: 'wheelchair', front: U('cat', 66, 148, 0.78) }) +
  standKid('kid-stand-point', 690, 812, 1.85) + text(790, 470, '!', 90, C.tomato) +
  lap({ a: 'gma', kid: 'kid-sit', cx: 1300, fy: 812, s: 1.5, seat: 'wheelchair', arms: 'rest', front: U('cat', 62, 196, 0.66) }) +
  (() => {
    const L = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - 30} ${x2} ${y2}" stroke="${C.ink}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="7" fill="${C.ink}"/>`;
    return text(1020, 470, 'one kid', 50, C.tomato, 'Caveat', 700) + L(1060, 486, 1238, 522) +
      text(985, 640, 'one cat', 50, C.tomato, 'Caveat', 700) + L(1030, 656, 1240, 670) +
      text(1610, 560, 'one lap', 50, C.tomato, 'Caveat', 700) + L(1570, 574, 1368, 656) +
      text(1612, 690, 'one chair', 46, C.tomato, 'Caveat', 700) + L(1590, 704, 1500, 736);
  })());

// 10 Blanket fort
SPREADS.push(() => {
  const drops = [[100, 110], [150, 200], [80, 270], [720, 90], [790, 180], [740, 260], [960, 120], [1010, 230], [1640, 110], [1690, 210], [1620, 280]].map(([x, y]) => col('drop', x, y, 1.2, C.sky)).join('');
  const scal = Array.from({ length: 25 }, (_, i) => `<circle cx="${80 + i * 60}" cy="402" r="28" fill="${C.sun}"/>`).join('');
  const gx = 1455, gs = 1.25, gy = 810 - 318 * gs; // grandma group origin
  const hx = gx - 120 * gs + 174 * gs, hy = gy + 70 * gs; // right push-handle grip
  const tx = 1080 - 120 * 1.3 + 199 * 1.3, ty = 790 - 254 * 1.3 + 124 * 1.3; // Theo's raised hand
  return rect(0, 0, 1750, 875, C.wash) + drops +
    `<path d="M60 360 L1560 360 L1560 760 L60 760Z" fill="${C.sT}"/>` + rect(0, 760, 1750, 115, C.pT) +
    rect(110, 520, 660, 190, C.plum, 44) + rect(84, 610, 90, 170, C.plum, 36) + rect(706, 610, 90, 170, C.plum, 36) + rect(160, 650, 560, 80, C.pT, 18) +
    lap({ a: 'dad', kid: 'kid-sit-hold', cx: 440, fy: 800, s: 1.3, seat: 'couch', arms: 'book', front: U('book', 70, 166, 0.62) }) +
    `<path d="M${f(tx)} ${f(ty - 30)} L${f(tx - 110)} 420 L${f(tx + 60)} 420Z" fill="${C.paper}"/>` +
    lap({ a: 'theo', cx: 1080, fy: 790, s: 1.3, arms: 'torch' }) +
    // a plain flashlight (handle + wide head), so it can never be read as a phone
    `<rect x="${f(tx - 9)}" y="${f(ty - 30)}" width="18" height="44" rx="6" fill="${C.ink}"/><path d="M${f(tx - 19)} ${f(ty - 50)} L${f(tx + 19)} ${f(ty - 50)} L${f(tx + 10)} ${f(ty - 28)} L${f(tx - 10)} ${f(ty - 28)}Z" fill="${C.sky}"/><rect x="${f(tx - 19)}" y="${f(ty - 54)}" width="38" height="8" rx="4" fill="${C.sT}"/>` +
    lap({ a: 'gma', cx: gx, fy: 810, s: gs, seat: 'wheelchair', arms: 'rest' }) +
    `<path d="M40 330 L1540 330 L1556 420 L60 420Z" fill="${C.sun}"/>` + scal +
    Array.from({ length: 13 }, (_, i) => rect(90 + i * 118, 330, 40, 88, C.tomato)).join('') +
    `<path d="M1530 330 Q1580 360 ${f(hx)} ${f(hy)}" stroke="${C.sun}" stroke-width="30" fill="none" stroke-linecap="round"/><circle cx="${f(hx)}" cy="${f(hy)}" r="17" fill="${C.tomato}"/>` +
    `<path d="M40 330 Q24 520 60 600 L112 600 Q92 500 112 420Z" fill="${C.sun}"/>`;
});

// 11 Night — sleepy lap
SPREADS.push(() => rect(0, 0, 1750, 875, C.ink) + rect(0, 760, 1750, 115, C.plum) + `<ellipse cx="560" cy="800" rx="260" ry="40" fill="${C.sun}"/><ellipse cx="1300" cy="800" rx="330" ry="46" fill="${C.sun}"/>` +
  rect(100, 300, 70, 440, C.tomato, 20) + rect(530, 300, 70, 440, C.tomato, 20) +
  windowFrame(160, 320, 380, 380, C.sky, C.wash, col('moon', 340, 360, 1.3, C.sun) + [[220, 380], [290, 470], [210, 600], [450, 610], [360, 540]].map(([x, y], i) => col('star', x, y, 0.5 + (i % 2) * 0.3, C.sun)).join(''), true, 'w11') +
  standKid('kidpj-yawn', 690, 812, 1.8) + text(752, 452, 'yawn…', 40, C.sT, 'Caveat', 700) +
  lap({ a: 'dad-sing', kid: 'kidpj-sleep', cx: 1300, fy: 805, s: 1.48, seat: 'rocker' }) +
  col('note', 1530, 420, 1.0, C.sun) + col('note', 1590, 360, 0.8, C.sun) +
  [[1000, 330], [1660, 520], [960, 560], [1690, 300]].map(([x, y]) => col('star', x, y, 0.6, C.sun)).join(''));

// 12 Ending — montage + cheek to cheek
SPREADS.push(() => {
  const circ = (id, cx, cy, bg, inner) => `<clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="128"/></clipPath><g clip-path="url(#${id})"><rect x="${cx - 130}" y="${cy - 130}" width="260" height="260" fill="${bg}"/>${inner}</g>`;
  return rect(0, 0, 875, 875, C.paper) +
    circ('m1', 297, 440, C.sT, rect(160, 330, 280, 70, C.kT) + lap({ a: 'dad', kid: 'kid-sit-point', cx: 297, fy: 555, s: 0.62, seat: 'busseat' })) +
    circ('m2', 577, 440, C.gT, `<ellipse cx="577" cy="540" rx="120" ry="24" fill="${C.sun}"/>` + lap({ a: 'theo-sing', kid: 'kid-sit-sing', cx: 577, fy: 545, s: 0.66, ks: 0.8 })) +
    circ('m3', 297, 710, C.pT, lap({ a: 'gma', kid: 'kid-sit-hold', cx: 297, fy: 818, s: 0.58, seat: 'wheelchair', arms: 'book', front: U('book', 70, 166, 0.62) })) +
    circ('m4', 577, 710, C.ink, col('moon', 620, 600, 0.45, C.sun) + lap({ a: 'dad', kid: 'kidpj-sleep', cx: 560, fy: 820, s: 0.6, seat: 'rocker' })) +
    // right page: cheek to cheek
    rect(875, 0, 875, 875, C.ink) + `<circle cx="1320" cy="610" r="300" fill="${C.sun}"/>` +
    [[960, 330], [1650, 340], [1000, 520], [1680, 560], [1600, 440]].map(([x, y], i) => col('star', x, y, 0.5 + (i % 3) * 0.25, C.sun)).join('') +
    rect(1030, 740, 390, 240, C.grass, 90) + rect(1350, 740, 220, 240, C.plum, 70) +
    (() => { const d = head(1215, 590, 150, { ...P.dad, mood: 'content', cheeks: false }); return d.back + d.s; })() +
    (() => { const k = head(1462, 650, 108, { ...P.kidpj, mood: 'content' }); return k.back + k.s; })() +
    col('heart', 1332, 430, 1.4, C.tomato);
});


/* ---------------------------------------------------------------- words: WORDS.md is the founder's file (human authorship) */
function readWords() {
  const src = fs.readFileSync(path.join(DIR, 'WORDS.md'), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  const out = {}; let key = null;
  src.split('\n').forEach(l => {
    const m = l.match(/^##\s+(.+?)\s*$/);
    if (m) { const draft = /\(draft\)\s*$/i.test(m[1]); key = m[1].replace(/\s*\(draft\)\s*$/i, '').trim(); out[key] = { draft, lines: [] }; }
    else if (key) out[key].lines.push(l);
  });
  for (const k in out) out[k].text = out[k].lines.join('\n').trim();
  return out;
}
const W = readWords();
const need = k => { if (!(k in W)) throw new Error(`WORDS.md is missing the section "## ${k}"`); return W[k].text; };
const DRAFTS = Object.keys(W).filter(k => W[k].draft);
const AUTHOR = (W.author && W.author.text) || '';
const AUTHOR_NOTE = (W['author note'] && W['author note'].text) || '';
// ISBN for the copyright page, from WORDS.md "## isbn" if that section is ever added. A personalized one-reader edition
// normally carries none (UNVERIFIED for Lulu); nothing prints while it is empty. See founder-notes.md.
const ISBN = (W.isbn && W.isbn.text) || '';
const SHOW_SLOTS = MODE !== 'order' || !!ARGS['allow-drafts'];
if (MODE === 'order' && !ARGS['allow-drafts']) {
  const left = [...DRAFTS.map(k => `"## ${k}" is still marked (draft)`), ...(AUTHOR_NOTE ? [] : ['"## author note" is empty'])];
  if (left.length) {
    console.error('HUMAN-AUTHORSHIP GATE: real orders build only from the founder\'s own words. Still to do in WORDS.md:\n  - ' + left.join('\n  - '));
    process.exit(3);
  }
}

// every customer value is HTML-escaped; tokens are replaced only after the founder's text is escaped
const escH = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const VARS = MODE === 'template' ? Object.fromEntries(Object.keys(NZ.vars).map(k => [k, `{{${k}}}`])) : NZ.vars;
function fill(str) {
  // U+2060 (word joiner) before an em dash stops a line from starting with "—"
  return escH(str).replace(/(\S)—/g, '$1\u2060—').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\{\{(\w+)\}\}/g, (m, k) => {
    if (!(k in VARS)) throw new Error(`Unknown variable {{${k}}} in WORDS.md`);
    const v = escH(VARS[k]).replace(/\n/g, '<br>');
    if (MODE === 'template') return `<span class="tok${k === 'CHILD_NAME' ? ' nm' : ''}">${v}</span>`;
    return k === 'CHILD_NAME' ? `<span class="nm">${v}</span>` : v;
  });
}
const NAME = fill('{{CHILD_NAME}}');
const HAS = k => MODE === 'template' || !!NZ.vars[k];

/* ---------------------------------------------------------------- brand assets */
const QR = JSON.parse(fs.readFileSync(path.join(DIR, 'qr.json'), 'utf8'));
const BONUS = 'playbeforepixels.com/bonus/picture-laps-not-apps';
const LOGO = (file) => fs.readFileSync(path.join(DIR, '../../brand/logo', file), 'utf8').replace(/<title>[\s\S]*?<\/title>/, '').replace(/ width="[\d.]+" height="[\d.]+"/, '');
const qrSvg = (px) => `<svg viewBox="-2 -2 ${QR.n + 4} ${QR.n + 4}" width="${px}" height="${px}" shape-rendering="crispEdges"><rect x="-2" y="-2" width="${QR.n + 4}" height="${QR.n + 4}" fill="#fff"/><path d="${QR.d}" fill="${C.ink}"/></svg>`;
const slot = (title, hint, cls = '') => SHOW_SLOTS ? `<div class="slot ${cls}"><b>${title}</b><span>${hint}</span></div>` : '';

/* ---------------------------------------------------------------- pages */
const pages = [];
const svgPage = (inner, off = 0, w = 875) => `<svg class="art" viewBox="${off} 0 ${w} 875" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

// Front cover
function coverArt() {
  return rect(0, 0, 875, 875, C.sun) + `<circle cx="437" cy="730" r="318" fill="${C.sky}"/>` + rect(0, 790, 875, 85, C.tomato) +
    col('heart', 130, 540, 1.3, C.tomato) + col('star', 700, 500, 1.1, C.paper) + col('star', 110, 680, 0.8, C.paper) +
    lap({ a: 'gma', kid: 'kid-sit-hold', cx: 437, fy: 838, s: 1.34, seat: 'wheelchair', arms: 'book', front: U('book', 70, 166, 0.62) }) +
    U('cat', 645, 740, 1.0);
}
const TAGLINE = fill(need('title tagline'));
const COVER = `<div class="page cover">${svgPage(coverArt())}
  <div class="cv-top logo">${LOGO('lockup-horizontal.svg')}</div>
  <h1 class="cv-title">Laps<br><span>Not Apps</span></h1>
  <div class="cv-sub" data-fit="cover-tagline" data-min="15"><span class="pill">${TAGLINE}</span></div>
</div>`;
pages.push(COVER);

// I1 Title page
pages.push(`<div class="page">${svgPage(rect(0, 0, 875, 875, C.paper) + `<ellipse cx="437" cy="650" rx="240" ry="30" fill="${C.kT}"/>` +
  `<g transform="translate(${437 - 120 * 1.05} ${650 - 298 * 1.05}) scale(1.05)">${U('armchair')}</g>` + U('book', 437 - 60, 650 - 298 * 1.05 + 214 * 1.05 - 49, 0.75) +
  text(640, 440, 'saved for you', 44, C.tomato, 'Caveat', 700) + `<path d="M606 456 Q570 486 536 516" stroke="${C.tomato}" stroke-width="4" fill="none" stroke-linecap="round"/>`)}
  <div class="tp"><h1>Laps <span>Not</span> Apps</h1>
    <p data-fit="title-tagline" data-min="15">${TAGLINE}</p>
    <p class="byline">${AUTHOR ? fill(AUTHOR) : 'A Play Before Pixels read-aloud'}</p>
  </div>
  <div class="tp-foot logo">${LOGO('lockup-horizontal.svg')}</div>
</div>`);

// I2 Copyright page
pages.push(`<div class="page">${svgPage(rect(0, 0, 875, 875, C.paper))}
  <div class="copy">
    <p class="copy-title">Laps Not Apps</p>
    <p>Personalized edition. Each copy is printed on demand for one reader.</p>
    <p>© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.</p>
    <p>All rights reserved. No part of this book may be reproduced, stored or shared in any form without written permission from the publisher, except for brief quotations in reviews.</p>
    <p>Published by AlphaPlay LLC, doing business as Play Before Pixels${ETSY ? '' : '<br>playbeforepixels.com'}</p>
    <p>First edition 2026 · ${VERSION}</p>
    ${ISBN ? `<p>ISBN ${fill(ISBN)}</p>` : ''}
    <p>Read together, and keep books away from mouths. The lap games in this book are for play and connection, always with an adult close by. This book is general parent education. It is not medical or developmental advice.</p>
    <p>Illustrations are flat vector art. Text is set in Fredoka and Nunito Sans, with titles in Bricolage Grotesque.</p>
  </div>
</div>`);

// I3 Dedication (personalized)
const MSG = HAS('GIFT_MESSAGE') ? fill('{{GIFT_MESSAGE}}') : fill(need('default dedication')).replace(/\n/g, '<br>');
pages.push(`<div class="page">${svgPage(rect(0, 0, 875, 875, C.sT) + rect(0, 812, 875, 63, C.sun) + `<ellipse cx="437" cy="808" rx="150" ry="22" fill="${C.tomato}"/>` +
  standKid('kid-stand', 437, 804, 1.2) + col('heart', 250, 640, 1.1, C.tomato) + col('heart', 590, 600, 0.8, C.plum) + col('star', 640, 700, 0.7, C.sun) + col('star', 210, 560, 0.6, C.sky))}
  <div class="ded2">
    <div class="ded-for">For</div>
    <div class="ded-name" data-fit="ded-name" data-min="30">${NAME}</div>
    <div class="ded-msg" data-fit="ded-msg" data-min="15" data-maxh="1.62">${MSG}</div>
    ${HAS('GIVER_NAME') ? `<div class="ded-from">With love from</div><div class="ded-giver" data-fit="ded-giver" data-min="15">${fill('{{GIVER_NAME}}')}</div>` : ''}
    ${HAS('GIFT_DATE') ? `<div class="ded-date">${fill('{{GIFT_DATE}}')}</div>` : ''}
  </div>
</div>`);

// I4–I27 Story (12 spreads)
const LIGHT = { 10: [true, true], 11: [false, true] };
SPREADS.forEach((fn, i) => {
  const art = fn();
  const n = i + 1;
  const light = LIGHT[i] || [false, false];
  const vv = (key, lt) => `<div class="verse${lt ? ' light' : ''}" data-fit="${key}" data-min="26">${need(key).split('\n').map(l => `<span class="l">${fill(l.trim())}</span>`).join('')}`;
  pages.push(`<div class="page story">${svgPage(art, 0, 875)}${vv(`s${n} left`, light[0])}</div></div>`);
  pages.push(`<div class="page story">${svgPage(art, 875, 875)}${vv(`s${n} right`, light[1])}<div class="tip"><b>Lap talk</b> ${fill(need(`s${n} tip`))}</div></div></div>`);
});

// I28–I29 Lap games
const GAMES = [
  ['Pony Ride', 'Once your baby holds their head steady', 'Sit your little one on your knees, facing you, with a firm hold under the arms. Chant “Trot, trot, trot…” with small bounces. On “Whoa!”, stop—and wait for a look, a wiggle or a word that says “more.”', 'Small, gentle bounces only. Never shake, toss or drop a baby.', C.sun, C.sT],
  ['Row the Boat', 'Babies who can sit, toddlers, big kids', 'Face to face, hold hands or forearms and rock slowly forward and back while you sing a rowing song. Stop the boat mid-song. Wait for them to rock you to start again.', 'Rock slowly. Never pull, swing or lift a child by the hands or arms.', C.sky, C.kT],
  ['Peekaboo Lap', 'From the early months', 'Cover your own face with your hands or a light cloth. “Where did I go?” Pause… “Peekaboo!” Soon they will pull the cloth away themselves.', 'Cover your face, not theirs. Put the cloth away afterward—never leave one with a sleeping baby.', C.grass, C.gT],
  ['Toe Count', 'All ages', 'Hold a foot and count the toes: “One, two, three, four…” Stop before “FIVE!” and wait for a squeal, a wiggle or a word. Then do fingers.', 'Gentle touches. If they pull away, that’s a “no”—switch games.', C.tomato, C.tT],
  ['Lap Drum', 'Toddlers and up', 'Pat a beat on your knees—slow, fast, soft, loud. They copy you. Then swap: they lead and you copy them. A sturdy board book makes a great drum.', 'Hands and board books only. For under-3s, nothing small enough to fit through a toilet-paper tube.', C.plum, C.pT],
];
const gameCard = (g, n) => `<div class="game" style="background:${g[5]}"><div class="gnum" style="background:${g[4]}">${n}</div><div class="gbody"><h3>${g[0]}</h3><div class="gage">${g[1]}</div><p>${g[2]}</p><p class="gsafe"><b>Safe play:</b> ${g[3]}</p></div></div>`;
pages.push(`<div class="page matter">${svgPage(rect(0, 0, 875, 875, C.paper))}
  <div class="mat">
    <div class="kicker">For grown-ups</div>
    <h2>5 lap games for tiny ones</h2>
    <p class="lede">No batteries, no screens—just you, a lap and a few silly minutes. Keep games short, stop while it’s still fun, and let your little one ask for “more” in any way they can.</p>
    ${GAMES.slice(0, 3).map((g, i) => gameCard(g, i + 1)).join('')}
  </div>
</div>`);
pages.push(`<div class="page matter">${svgPage(rect(0, 0, 875, 875, C.paper) + rect(110, 790, 655, 34, C.sky, 17) + [0, 1, 2, 3, 4].map(i => U('duck', 150 + i * 118, 722, 0.95)).join(''))}
  <div class="mat">
    ${GAMES.slice(3).map((g, i) => gameCard(g, i + 4)).join('')}
    <div class="safety">
      <h3>Lap-time safety</h3>
      <ul>
        <li>An adult stays close and hands-on for every game.</li>
        <li>For children under 3: no objects small enough to fit through a toilet-paper tube (about 1.25 in / 3.2 cm), no balloons, and no cords or strings long enough to wrap a neck.</li>
        <li>In a car, children ride in a properly installed car seat—never on a lap. On buses and trains, follow local rules and hold on securely.</li>
        <li>Sleepy snuggles are lovely. When a baby falls asleep, move them to their own safe sleep space, on their back.</li>
        <li>Stop any game when your child looks away, fusses or says “no.”</li>
      </ul>
    </div>
  </div>
</div>`);

// I30 Family reading pledge (the shareable page)
const PROMISES = need('pledge promises').split('\n').map(s => s.trim()).filter(Boolean);
pages.push(`<div class="page matter">${svgPage(rect(0, 0, 875, 875, C.gT) + rect(0, 822, 875, 53, C.grass) + U('book', 640, 92, 0.72) + col('heart', 772, 70, 0.8, C.tomato) + col('star', 600, 78, 0.55, C.sun))}
  <div class="mat pledge">
    <div class="kicker">Our family reading pledge</div>
    <h2>Books before screens</h2>
    <div class="pl-card">
      <p class="pl-intro">${fill(need('pledge intro'))}</p>
      <ul class="pl-list">${PROMISES.map(p => `<li><i></i><span>${fill(p)}</span></li>`).join('')}<li class="own"><i></i><span>our own promise:</span><em></em></li></ul>
      <div class="pl-sign">
        <div class="sg"><span>Signed, the grown-ups</span><em></em></div>
        <div class="sg"><span>${NAME}’s mark <small>(a scribble counts!)</small></span><em></em></div>
        <div class="sg"><span>Date</span><em></em></div>
      </div>
    </div>
    <div class="pl-foot"><div class="logo">${LOGO('lockup-horizontal.svg')}</div><span>Snap your signed pledge and share it with <b>#PlayBeforePixels</b>, if you like.</span></div>
  </div>
</div>`);

// I31 How to use + favorite laps
const NOTE = need('grown-up note').split('\n').map(s => s.trim()).filter(Boolean);
pages.push(`<div class="page matter">${svgPage(rect(0, 0, 875, 875, C.kT) + col('heart', 760, 90, 1.2, C.tomato) + rect(0, 812, 875, 63, C.sun) +
  lap({ a: 'dad', kid: 'kid-sit', cx: 150, fy: 830, s: 0.6, seat: 'armchair' }) + lap({ a: 'jo', kid: 'ada-sit', cx: 345, fy: 826, s: 0.62, ks: 0.85, arms: 'book', front: U('book', 76, 168, 0.55) }) +
  lap({ a: 'bea', kid: 'baby-up', cx: 535, fy: 826, s: 0.62, ks: 0.66, kdy: -8, arms: 'lift' }) + lap({ a: 'gma', kid: 'kid-sit-hold', cx: 730, fy: 836, s: 0.56, seat: 'wheelchair', arms: 'book', front: U('book', 70, 166, 0.62) }))}
  <div class="mat note">
    <div class="kicker">How to use this book</div>
    <h2>A lap is a small place with a big job.</h2>
    ${NOTE.map(p => `<p>${fill(p)}</p>`).join('')}
    <div class="fav">
      <h3 data-fit="fav-h" data-min="14">${NAME}’s favorite laps</h3>
      <div class="frow"><span>Best lap for stories</span><i></i></div>
      <div class="frow"><span>Best lap for songs</span><i></i></div>
      <div class="frow"><span>Best lap for sleepy time</span><i></i></div>
      <div class="frow"><span>Our first read together</span><i></i></div>
    </div>
  </div>
</div>`);

// I32 Author note + More from Play Before Pixels + bonus QR
const NEXT = [
  // only products that are on sale today, youngest first (the Bring a Book inserts go back here once they are live)
  ['Up! Go! More!', 'Talk-along book · ages 0–3', C.tomato, C.tT],
  ['100 Screen-Free Plays for Ages 0–5', 'Guide + printables · ages 0–5', C.grass, C.gT],
  ['The Day the Tablet Slept', 'Picture book · ages 3–7', C.sky, C.kT],
];
pages.push(`<div class="page matter">${svgPage(rect(0, 0, 875, 875, C.paper))}
  <div class="mat last">
    ${AUTHOR_NOTE ? `<div class="kicker">A note from the author</div>
    <div class="an">${AUTHOR_NOTE.split('\n').filter(Boolean).map(p => `<p>${fill(p)}</p>`).join('')}</div>` : ''}
    <h2 class="mf">More from Play Before Pixels</h2>
    <p class="mf-sub">Next for your little one’s age</p>
    <div class="tiles">${NEXT.map(([t, d, c, bg]) => `<div class="tile" style="background:${bg}"><i style="background:${c}"></i><b>${t}</b><span>${d}</span></div>`).join('')}</div>
    ${ETSY ? `<div class="bonus etsy"><div><div class="bonus-k">Loved this book?</div>
        <p>You will find more Play Before Pixels books and printables in the same shop.</p></div></div>` : `<div class="bonus">
      <div class="qr">${qrSvg(120)}</div>
      <div><div class="bonus-k">Free for grown-ups</div>
        <p>A printable lap-reading tracker and 5 more lap games.</p>
        <p class="url">${BONUS}</p>
        <p class="fine">We ask only for an email and your child’s birth month and year—never a name.</p></div>
    </div>`}
    <div class="last-logo logo">${LOGO('lockup-horizontal.svg')}</div>
  </div>
</div>`);

// Back cover
const BACK = `<div class="page back">${svgPage(rect(0, 0, 875, 875, C.sun) + `<circle cx="300" cy="600" r="200" fill="${C.sky}"/>` + rect(0, 750, 875, 125, C.tomato) +
  lap({ a: 'dad', kid: 'kid-sit-content', cx: 300, fy: 752, s: 0.9, seat: 'armchair' }) +
  col('heart', 470, 470, 1.1, C.tomato) + col('star', 70, 480, 0.9, C.paper))}
  <div class="bk">
    <h2>A lap is the best seat in town.</h2>
    <p>${fill(need('back blurb'))}</p>
    <ul>
      <li>Rhyming read-aloud with the child’s name in six rhymes</li>
      <li>A “Lap talk” idea on every spread for grown-ups</li>
      <li>Dedication, family reading pledge and keepsake pages</li>
    </ul>
  </div>
  <div class="series"><div class="series-h">Collect the books</div>
    <div class="srow"><i style="background:${C.tomato}"></i>Laps Not Apps</div>
    <div class="srow"><i style="background:${C.sky}"></i>The Day the Tablet Slept</div>
    <div class="srow"><i style="background:${C.grass}"></i>Up! Go! More!</div>
  </div>
  <div class="bk-foot"><div class="logo">${LOGO('lockup-horizontal-white.svg')}</div><div class="bk-age">Ages 0–5 · Personalized keepsake${ETSY ? '' : ' · playbeforepixels.com'}</div></div>
  <div class="isbn" aria-hidden="true"></div>
</div>`;
pages.push(BACK);

/* ---------------------------------------------------------------- CSS & HTML */
const CSS = `
@page { size: 8.75in 8.75in; margin: 0 }
* { box-sizing: border-box; margin: 0; padding: 0 }
html, body { background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact }
body { font-family: "Nunito Sans", sans-serif; color: ${C.ink} }
.page { width: 8.75in; height: 8.75in; position: relative; overflow: hidden; break-after: page; page-break-after: always; background: #fff }
.page:last-child { break-after: auto; page-break-after: auto }
.art { position: absolute; inset: 0; width: 100%; height: 100%; display: block }
.logo svg { display: block; width: 100%; height: auto }
.nm { color: ${C.tomato} }
.light .nm, .nm-light .nm { color: ${C.sun} }
.tok { background: ${C.sun}; color: ${C.ink}; border-radius: .06in; padding: 0 .04in; font-size: .82em }
.tok.nm { background: ${C.tomato}; color: #fff }
.slot { border: 2px dashed ${C.tomato}; border-radius: .14in; padding: .12in .18in; background: #fff; color: ${C.tomato}; text-align: left }
.slot b { display: block; font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 13pt }
.slot span { display: block; font-size: 10pt; line-height: 1.35; font-weight: 700 }
.slot.small { display: inline-block; margin-top: .12in; padding: .06in .14in }
.slot.small b { font-size: 10.5pt } .slot.small span { font-size: 9pt }
.verse { position: absolute; left: .62in; right: .62in; top: .64in; text-align: center; font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 600; font-size: 27pt; line-height: 1.2; color: ${C.ink} }
.verse .l { display: block; white-space: nowrap }
.verse.light { color: #fff }
.tip { display: inline-block; margin-top: .13in; max-width: 5.6in; background: #fff; border-radius: .16in; padding: .07in .2in .09in; font-family: "Nunito Sans", sans-serif; font-weight: 700; font-size: 11.5pt; line-height: 1.32; color: ${C.ink}; text-align: left; white-space: normal }
.tip b { font-family: "Caveat", "Nunito Sans", cursive; font-weight: 700; font-size: 18pt; color: ${C.tomato}; margin-right: .04in; line-height: 1 }
.cover .cv-top { position: absolute; top: .56in; left: 50%; width: 2.2in; margin-left: -1.1in }
.cv-title { position: absolute; top: 1.24in; left: .5in; right: .5in; text-align: center; font-family: "Bricolage Grotesque", "Nunito Sans", sans-serif; font-weight: 800; font-size: 80pt; line-height: .9; letter-spacing: -.02em; color: ${C.ink} }
.cv-title span { color: ${C.paper} }
.cv-sub { position: absolute; top: 3.36in; left: .5in; right: .5in; text-align: center; white-space: nowrap; font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 600; font-size: 17pt; color: ${C.ink} }
.cv-sub .pill { display: inline-block; background: #fff; border-radius: 999px; padding: .05in .26in .07in }
.cv-sub .nm { font-size: 1.3em; line-height: 1 }
.tp { position: absolute; top: 1.05in; left: .6in; right: .6in; text-align: center }
.tp h1 { font-family: "Bricolage Grotesque", "Nunito Sans", sans-serif; font-weight: 800; font-size: 60pt; line-height: 1; letter-spacing: -.02em }
.tp h1 span { color: ${C.tomato} }
.tp p { margin-top: .16in; font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 500; font-size: 17pt; white-space: nowrap }
.tp p .nm { font-weight: 600 }
.tp .byline { margin-top: .1in; font-family: "Nunito Sans", sans-serif; font-weight: 700; font-size: 11.5pt; opacity: .8 }
.tp-foot { position: absolute; bottom: .68in; left: 50%; width: 2.1in; margin-left: -1.05in }
.copy { position: absolute; left: .8in; right: 1.6in; bottom: .7in; font-size: 9.5pt; line-height: 1.45 }
.copy p { margin-top: .1in }
.copy-title { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 14pt }
.isbn-inline { margin-top: .12in; font-weight: 700 }
.box, .printbox { display: inline-block; border: 1.5px dashed ${C.tomato}; color: ${C.tomato}; padding: .03in .1in; border-radius: 4px; font-weight: 700 }
.printbox { margin-top: .12in }
.ded2 { position: absolute; top: .78in; left: .7in; right: .7in; text-align: center }
.ded-for { font-family: "Caveat", cursive; font-weight: 700; font-size: 34pt; color: ${C.tomato}; line-height: 1 }
.ded-name { font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 600; font-size: 62pt; line-height: 1.05; white-space: nowrap }
.ded-msg { margin: .16in auto 0; max-width: 6.2in; text-wrap: balance; font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 500; font-size: 19pt; line-height: 1.32; overflow-wrap: anywhere }
.ded-msg .nm { font-weight: 600 }
.ded-from { margin-top: .2in; font-family: "Caveat", cursive; font-weight: 700; font-size: 24pt; line-height: 1 }
.ded-giver { font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 600; font-size: 22pt; color: ${C.tomato}; white-space: nowrap }
.ded-date { margin-top: .06in; font-weight: 700; font-size: 11pt; opacity: .75 }
.mat { position: absolute; left: .7in; right: .7in; top: .66in; bottom: .6in }
.kicker { font-family: "Caveat", cursive; font-weight: 700; font-size: 22pt; color: ${C.tomato}; line-height: 1 }
.mat h2 { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 30pt; line-height: 1.02; letter-spacing: -.01em; margin-top: .04in }
.lede { font-size: 12.5pt; line-height: 1.45; margin: .12in 0 .2in }
.game { display: flex; gap: .2in; border-radius: .2in; padding: .2in .26in; margin-bottom: .16in }
.gnum { flex: 0 0 .56in; height: .56in; border-radius: 50%; color: #fff; font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 22pt; display: flex; align-items: center; justify-content: center }
.game h3 { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 18pt; line-height: 1.1 }
.gage { font-family: "Caveat", cursive; font-weight: 700; font-size: 14pt; color: ${C.ink}; opacity: .8; line-height: 1.1 }
.game p { font-size: 11.8pt; line-height: 1.42; margin-top: .05in }
.game .gsafe b { color: ${C.tomato} }
.safety { border: 3px solid ${C.ink}; border-radius: .2in; padding: .18in .24in; margin-top: .06in }
.safety h3 { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 15pt }
.safety ul { margin: .06in 0 0 .2in; font-size: 11pt; line-height: 1.4 }
.safety li { margin-top: .03in }
.pledge h2 { font-size: 40pt }
.pl-card { margin-top: .22in; background: #fff; border-radius: .24in; padding: .28in .36in .3in }
.pl-intro { font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 600; font-size: 18pt; line-height: 1.2 }
.pl-list { list-style: none; margin-top: .1in }
.pl-list li { display: flex; align-items: center; gap: .16in; margin-top: .12in; font-size: 13pt; font-weight: 700; line-height: 1.25 }
.pl-list li i { flex: 0 0 .26in; height: .26in; border: 2.5px solid ${C.grass}; border-radius: .07in }
.pl-list li.own span { white-space: nowrap }
.pl-list li.own em, .sg em { flex: 1; border-bottom: 2px solid ${C.ink}; height: .22in; align-self: flex-end }
.pl-sign { margin-top: .26in; display: grid; grid-template-columns: 1fr 1fr; column-gap: .3in; row-gap: .08in }
.sg { display: flex; flex-direction: column-reverse; gap: .04in; font-size: 10.5pt; font-weight: 700 }
.sg em { flex: 0 0 .44in; align-self: stretch }
.sg small { font-weight: 600; opacity: .8 }
.pl-foot { position: absolute; left: 0; right: 0; bottom: .42in; display: flex; align-items: center; gap: .22in; font-size: 10.5pt; font-weight: 700 }
.pl-foot .logo { flex: 0 0 1.6in }
.note p { font-size: 12pt; line-height: 1.5; margin-top: .14in }
.note p b { color: ${C.tomato} }
.note h2 { font-size: 27pt !important; white-space: nowrap }
.fav { background: #fff; border-radius: .22in; padding: .2in .3in .24in; margin-top: .18in } /* keeps clear of the four laps drawn along the bottom */
.fav h3 { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 16pt; white-space: nowrap }
.fav h3 .nm { color: ${C.tomato} }
.frow { display: flex; align-items: flex-end; gap: .14in; margin-top: .15in; font-weight: 700; font-size: 11.5pt }
.frow span { white-space: nowrap }
.frow i { flex: 1; border-bottom: 2px solid ${C.ink}; height: .2in }
.last .an p { font-size: 12pt; line-height: 1.5; margin-top: .1in }
.last .an-slot { margin-top: .12in; min-height: 1.3in }
.mf { margin-top: .34in !important; font-size: 24pt !important }
.mf-sub { font-size: 11.5pt; font-weight: 700; opacity: .75; margin-top: .02in }
.tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: .16in; margin-top: .14in }
.tile { border-radius: .18in; padding: .16in .18in .18in; min-height: 1.3in }
.tile i { display: block; width: .42in; height: .42in; border-radius: .08in; margin-bottom: .1in }
.tile b { display: block; font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 12.5pt; line-height: 1.1 }
.tile span { display: block; margin-top: .05in; font-size: 9.5pt; font-weight: 700; opacity: .8 }
.bonus { display: flex; gap: .24in; align-items: center; margin-top: .26in; background: ${C.sT}; border-radius: .2in; padding: .18in .22in }
.bonus .qr svg { display: block; border-radius: .06in }
.bonus-k { font-family: "Caveat", cursive; font-weight: 700; font-size: 20pt; color: ${C.tomato}; line-height: 1 }
.bonus p { font-size: 11.5pt; font-weight: 700; line-height: 1.35; margin-top: .04in }
.bonus .url { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 12pt }
.bonus .fine { font-size: 9pt; font-weight: 600; opacity: .8 }
.last-logo { position: absolute; left: 50%; bottom: 0; width: 1.9in; margin-left: -.95in }
.bk { position: absolute; top: .62in; left: .7in; right: .7in }
.bk h2 { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 34pt; line-height: 1; letter-spacing: -.01em }
.bk p { margin-top: .16in; font-size: 12.5pt; line-height: 1.45 }
.bk .nm { color: ${C.ink}; font-weight: 800 }
.bk ul { margin: .12in 0 0 .22in; font-size: 11.5pt; line-height: 1.45; font-weight: 700 }
.series { position: absolute; left: 5.35in; top: 4.55in; width: 2.7in; background: #fff; border-radius: .2in; padding: .16in .2in .18in }
.series-h { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 12.5pt; margin-bottom: .04in }
.srow { display: flex; align-items: center; gap: .1in; margin-top: .07in; font-size: 10.5pt; font-weight: 700 }
.srow i { flex: 0 0 .2in; height: .26in; border-radius: .04in }
.bk-foot { position: absolute; left: .6in; bottom: .56in; color: #fff } /* text stays inside the 0.5 in (bleed + safe) margin */
.bk-foot .logo { width: 1.5in }
.bk-age { margin-top: .06in; font-weight: 700; font-size: 9.5pt; color: #fff }
.isbn { position: absolute; right: .55in; bottom: .55in; width: 2in; height: 1.2in; background: #fff } /* plain 2 x 1.2 in barcode area, no label or outline; match it to the printer's cover template (UNVERIFIED) */
`;

// Shrink-to-fit for every variable line (long names, long messages). Results land in window.__fit and <html data-fit>.
const FIT = `<script>(function(){
function over(el,maxh){ if (el.scrollWidth > el.clientWidth + 0.5) return true;
  for (const c of el.querySelectorAll('.l')) if (c.scrollWidth > c.clientWidth + 0.5) return true;
  return !!(maxh && el.scrollHeight > maxh + 0.5); }
function fit(el){ const min = parseFloat(el.dataset.min || 14), maxh = el.dataset.maxh ? parseFloat(el.dataset.maxh) * 96 : 0;
  let size = parseFloat(getComputedStyle(el).fontSize), n = 0;
  while (over(el, maxh) && size > min) { size -= 0.5; el.style.fontSize = size + 'px'; n++; }
  return { id: el.dataset.fit, px: size, shrunk: n, ok: !over(el, maxh) }; }
function run(){ const r = Array.from(document.querySelectorAll('[data-fit]')).map(fit); window.__fit = r;
  document.documentElement.setAttribute('data-fit', r.every(x => x.ok) ? 'ok' : 'fail'); }
(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(run);
})();</script>`;

const DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><defs>${SYM.join('\n')}</defs></svg>`;
const doc = (title, body, extraCss = '') => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title>
<link rel="stylesheet" href="${ARGS.fonts || '../../brand/fonts/fonts.css'}"><style>${CSS}${extraCss}</style></head><body>${DEFS}
${body}
${FIT}</body></html>`;

// Case-wrap / paperback cover: back + spine + front in one sheet (dimensions from the printer; see ORDER-TO-PRINT.md)
function coverWrap(format, dims) {
  const soft = format === 'softcover';
  const S = +dims.spine, H = soft ? 8.75 : +dims.h;
  const Wt = soft ? 0.125 + 8.5 + S + 8.5 + 0.125 : +dims.w;
  const PW = (Wt - S) / 2, py = (H - 8.75) / 2;
  const bx = soft ? 0 : (PW - 8.75) / 2, fx = soft ? 8.5 + S : PW + S + (PW - 8.75) / 2;
  const ext = (x, w, band) => `<div style="position:absolute;left:${x}in;top:0;width:${w}in;height:${H}in;background:${C.sun}"></div><div style="position:absolute;left:${x}in;top:${py + band}in;width:${w}in;height:${H - py - band}in;background:${C.tomato}"></div>`;
  const spineText = S >= 0.25 ? `<div class="sp-text">Laps Not Apps <span>· made for ${NAME}</span></div>` : '';
  const css = `@page { size: ${Wt}in ${H}in; margin: 0 } html, body { width: ${Wt}in; height: ${H}in; overflow: hidden }
  .wrap { position: relative; width: ${Wt}in; height: ${H}in; overflow: hidden; background: ${C.sun} }
  .panel { position: absolute; top: 0; width: ${PW}in; height: ${H}in; overflow: hidden }
  .wrap .page { position: absolute; top: ${py}in; break-after: auto; page-break-after: auto; background: transparent } /* no white hairline where the page meets the wrap extension */
  .spine { position: absolute; left: ${PW}in; top: 0; width: ${S}in; height: ${H}in; background: ${C.tomato} }
  .sp-text { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%) rotate(90deg); white-space: nowrap; font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: ${Math.min(14, S * 50)}pt; color: #fff }
  .sp-text .nm { color: ${C.sun} } .sp-text span { font-family: "Fredoka", sans-serif; font-weight: 600 }`;
  // each panel clips its own page, so a page's bleed never spills across the spine onto the other side
  const panel = (x, band, pageHtml, cls, left) => `<div class="panel" style="left:${x}in">${ext(0, PW, band)}${pageHtml.replace(`class="page ${cls}"`, `class="page ${cls}" style="left:${left}in"`)}</div>`;
  const body = `<div class="wrap">${panel(0, 7.5, BACK, 'back', bx)}${panel(PW + S, 7.9, COVER, 'cover', fx - PW - S)}
    <div class="spine">${spineText}</div></div>`;
  return doc(`Laps Not Apps cover wrap (${format})`, body, css);
}
// Placeholder dimensions until the printer's own calculator/API gives the real ones [VERIFY]
const WRAP_DEFAULTS = { hardcover: { w: 19.0, h: 10.25, spine: 0.25 }, softcover: { spine: 0.08 } };

/* ---------------------------------------------------------------- write files */
const interior = pages.slice(1, -1);
if (MODE === 'order') {
  const out = path.resolve(ARGS.out || path.join(DIR, 'orders', String(ORDER.order_id || 'order')));
  fs.mkdirSync(out, { recursive: true });
  const fontsRel = path.relative(out, path.join(DIR, '../../brand/fonts/fonts.css'));
  ARGS.fonts = ARGS.fonts || fontsRel;
  const dims = { ...WRAP_DEFAULTS[NZ.format], ...(ARGS['cover-w'] ? { w: +ARGS['cover-w'] } : {}), ...(ARGS['cover-h'] ? { h: +ARGS['cover-h'] } : {}), ...(ARGS.spine ? { spine: +ARGS.spine } : {}) };
  fs.writeFileSync(path.join(out, 'interior.html'), doc('Laps Not Apps interior', interior.join('\n')));
  fs.writeFileSync(path.join(out, 'cover-wrap.html'), coverWrap(NZ.format, dims));
  fs.writeFileSync(path.join(out, 'check.json'), JSON.stringify({ order_id: ORDER.order_id || null, format: NZ.format, look: NZ.look, pronouns: NZ.pronouns, vars: NZ.vars, holds: NZ.holds, drafts_left: DRAFTS, channel: ORDER.channel || null, etsy_edition_no_url: ETSY, version: VERSION, cover_dims_in: dims, dims_are_placeholders: !(ARGS['cover-w'] || ARGS.spine), interior_pages: interior.length }, null, 2));
  console.log(`order ${ORDER.order_id}: ${interior.length} interior pages → ${out}${NZ.holds.length ? '\nHOLD for review: ' + NZ.holds.join('; ') : ''}`);
  process.exit(NZ.holds.length ? 4 : 0);
}
if (MODE === 'template') {
  fs.writeFileSync(path.join(DIR, 'template.html'), doc('Laps Not Apps — variable template', pages.join('\n')));
  console.log(`template: ${pages.length} pages; ${DRAFTS.length} WORDS.md sections still marked (draft)`);
  process.exit(0);
}
// sample
fs.writeFileSync(path.join(DIR, 'source.html'), doc('Laps Not Apps', pages.join('\n')));
fs.writeFileSync(path.join(DIR, 'interior-only.html'), doc('Laps Not Apps interior', interior.join('\n')));
for (const fmt of ['hardcover', 'softcover']) fs.writeFileSync(path.join(DIR, `cover-wrap-${fmt}.html`), coverWrap(fmt, WRAP_DEFAULTS[fmt]));
fs.writeFileSync(path.join(DIR, 'cover.html'), doc('Laps Not Apps cover', `<div class="trim">${COVER}</div>`, `html,body{width:816px;height:816px;overflow:hidden} .trim{width:816px;height:816px;overflow:hidden;position:relative} .trim .page{position:absolute;left:-12px;top:-12px}`));

// Character picker (store image + the reference for the "Look" option)
const pick = Object.entries(PZ.LOOKS).map(([n, L]) => `<div class="card"><svg viewBox="-12 -16 144 212" class="kid"><use href="#look-${n}" width="120" height="200"/></svg><div class="lk">${L.label}</div><div class="ld">${L.desc}</div></div>`).join('');
fs.writeFileSync(path.join(DIR, 'picker.html'), `<!doctype html><html><head><meta charset="utf-8"><title>Laps Not Apps character picker</title>
<link rel="stylesheet" href="../../brand/fonts/fonts.css"><style>
*{margin:0;padding:0;box-sizing:border-box} html,body{width:1600px;height:1200px;overflow:hidden;background:${C.wash};font-family:'Nunito Sans',sans-serif;color:${C.ink}}
.logo{position:absolute;left:80px;top:64px;width:300px} .logo svg{display:block;width:100%;height:auto}
h1{position:absolute;left:80px;right:80px;top:170px;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:78px;letter-spacing:-.01em;line-height:1}
.sub{position:absolute;left:80px;right:80px;top:268px;font-size:30px;font-weight:700;opacity:.85}
.grid{position:absolute;left:80px;right:80px;top:350px;display:grid;grid-template-columns:repeat(4,1fr);gap:36px}
.card{background:#fff;border-radius:36px;padding:34px 24px 34px;text-align:center}
.card:nth-child(1){background:${C.sT}} .card:nth-child(2){background:${C.kT}} .card:nth-child(3){background:${C.gT}} .card:nth-child(4){background:${C.pT}}
.kid{display:block;width:280px;height:412px;margin:0 auto}
.lk{margin-top:18px;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:44px}
.ld{margin-top:6px;font-size:22px;font-weight:700;line-height:1.3;opacity:.85;min-height:58px}
.steps{position:absolute;left:80px;right:80px;bottom:70px;display:flex;gap:28px}
.step{flex:1;display:flex;align-items:center;gap:18px;font-size:26px;font-weight:800}
.step i{flex:0 0 58px;height:58px;border-radius:50%;background:${C.tomato};color:#fff;font-style:normal;font-family:'Bricolage Grotesque',sans-serif;font-size:30px;display:flex;align-items:center;justify-content:center}
</style></head><body>${DEFS}<div class="logo">${LOGO('lockup-horizontal.svg')}</div>
<h1>Choose your child’s look</h1><div class="sub">Laps Not Apps · the story’s child changes; the family in the story stays the same.</div>
<div class="grid">${pick}</div>
<div class="steps"><div class="step"><i>1</i>Pick a look</div><div class="step"><i>2</i>Type the name</div><div class="step"><i>3</i>Add who it’s from</div><div class="step"><i>4</i>We print and ship it</div></div>
</body></html>`);

// Mockup (website/store hero)
fs.writeFileSync(path.join(DIR, 'mockup.html'), `<!doctype html><html><head><meta charset="utf-8"><title>Laps Not Apps mockup</title>
<link rel="stylesheet" href="../../brand/fonts/fonts.css"><style>
*{margin:0;padding:0;box-sizing:border-box} html,body{width:1600px;height:1200px;overflow:hidden;background:${C.wash}}
.floor{position:absolute;left:0;right:0;top:960px;bottom:0;background:${C.kT}}
.blob{position:absolute;left:-120px;top:-160px;width:760px;height:760px;border-radius:50%;background:${C.sT}}
.blob2{position:absolute;right:-140px;top:120px;width:420px;height:420px;border-radius:50%;background:${C.pT}}
.book{position:absolute;left:150px;top:290px;width:680px;height:680px;perspective:2200px}
.book .inner{position:absolute;inset:0;transform:rotateY(16deg);transform-origin:left center;transform-style:preserve-3d}
.book img{position:absolute;inset:0;width:680px;height:680px;border-radius:4px 10px 10px 4px}
.book .spine{position:absolute;left:-34px;top:0;width:34px;height:680px;background:${C.tomato};transform:rotateY(-90deg);transform-origin:right center}
.book .hinge{position:absolute;left:16px;top:0;width:6px;height:680px;background:rgba(29,41,64,.12)}
.shadow{position:absolute;left:170px;top:962px;width:680px;height:40px;border-radius:50%;background:rgba(29,41,64,.22);filter:blur(18px)}
.spread{position:absolute;left:870px;top:640px;width:640px;height:320px;display:flex;transform:rotate(-4deg);box-shadow:0 26px 40px rgba(29,41,64,.22);border-radius:6px;overflow:hidden}
.spread img{width:320px;height:320px;object-fit:cover}
.tag{position:absolute;left:900px;top:250px;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:58px;line-height:1;color:${C.ink};letter-spacing:-.01em}
.tag small{display:block;margin-top:16px;font-family:'Nunito Sans',sans-serif;font-weight:700;font-size:25px;color:${C.ink};line-height:1.35}
.pill{display:inline-block;margin-top:18px;background:${C.tomato};color:#fff;font-family:'Nunito Sans',sans-serif;font-weight:800;font-size:21px;padding:8px 20px;border-radius:999px}
.looks{display:flex;gap:10px;margin-top:22px}.looks svg{width:62px;height:62px;background:#fff;border-radius:50%}
</style></head><body><div class="blob"></div><div class="blob2"></div><div class="floor"></div><div class="shadow"></div>${DEFS}
<div class="book"><div class="inner"><div class="spine"></div><img src="cover.png" alt=""><div class="hinge"></div></div></div>
<div class="tag">Laps Not Apps<small>A rhyming read-aloud with your child’s<br>name in six rhymes · ages 0–5</small><span class="pill">Personalized keepsake</span>
<div class="looks">${Object.keys(PZ.LOOKS).map(n => `<svg viewBox="12 -8 96 96"><use href="#look-${n}" width="120" height="200"/></svg>`).join('')}</div></div>
<div class="spread"><img src="preview/p25.png" alt=""><img src="preview/p26.png" alt=""></div>
</body></html>`);
console.log(`sample: ${pages.length} pages (${interior.length} interior); ${DRAFTS.length} WORDS.md sections still marked (draft); author note ${AUTHOR_NOTE ? 'written' : 'EMPTY'}`);
