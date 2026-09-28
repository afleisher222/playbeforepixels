// First Phone Agreement Kit: extra art. Same flat style, palette and cast as the rest of the line
// (base.js = board-book cast; art.js = routine-card icon library; the sleepy nightcap comes from
// products/picture-tablet-slept). The phone is always generic: no buttons, logos, notches or app icons.
const B = require('./base.js');
const L = require('./art.js');
const { C, sym, cheeks } = B;
const { A, CAST, R, Ci, Pa, St, Gp, U, Tx, star, moon, sun, heart, bust } = L;
const I = C.ink, W = '#FFFFFF', T = C.tomato, S = C.sun, K = C.sky, G = C.grass, P = C.plum;
const tT = C.tTomato, tS = C.tSun, tK = C.tSky, tG = C.tGrass, tP = C.tPlum, WA = C.wash;
const GREY = '#C9D2E0', WOOD = '#C08457';

// ---------- the generic phone (origin = centre, 56 x 96) ----------
const phoneBody = `<rect x="-28" y="-48" width="56" height="96" rx="12" fill="${I}"/><rect x="-22" y="-39" width="44" height="80" rx="6" fill="var(--scr,${tK})"/><rect x="-7" y="-45" width="14" height="3" rx="1.5" fill="#3A4A68"/>`;
const pFaceSleep = `<path d="M-13 2Q-9 6.5-5 2M5 2Q9 6.5 13 2" stroke="${I}" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="-14" cy="11" r="4" fill="${T}" opacity=".35"/><circle cx="14" cy="11" r="4" fill="${T}" opacity=".35"/><path d="M-4 14Q0 17 4 14" stroke="${I}" stroke-width="2.3" fill="none" stroke-linecap="round"/>`;
const pFaceAwake = `<circle cx="-9" cy="0" r="3.6" fill="${I}"/><circle cx="9" cy="0" r="3.6" fill="${I}"/><circle cx="-8" cy="-1.2" r="1.1" fill="#fff"/><circle cx="10" cy="-1.2" r="1.1" fill="#fff"/><circle cx="-15" cy="9" r="4" fill="${T}" opacity=".35"/><circle cx="15" cy="9" r="4" fill="${T}" opacity=".35"/><path d="M-6 9Q0 15 6 9" stroke="${I}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
// nightcap: same shapes and colours as the tablet's cap in The Day the Tablet Slept, drawn to phone size
const nightcap = `<path d="M-30-30C-30-60 14-78 40-58C52-49 55-32 51-18C46-30 40-35 33-33Z" fill="${P}"/><path d="M-35-34C-12-43 14-47 38-41L39-30C15-36-10-33-32-24Z" fill="${tP}"/><circle cx="-12" cy="-54" r="3" fill="${tP}"/><circle cx="12" cy="-62" r="2.6" fill="${tP}"/><circle cx="30" cy="-52" r="2.6" fill="${tP}"/><circle cx="51" cy="-15" r="8" fill="${S}"/>`;

const NEW = [
  sym('phone-awake', phoneBody + pFaceAwake),
  sym('phone-sleep', phoneBody + pFaceSleep + nightcap),
  sym('phone-plain', phoneBody),
  sym('basket', `<path d="M-46-10H46L38 30C37 35 33 38 28 38H-28C-33 38-37 35-38 30Z" fill="${WOOD}"/><rect x="-50" y="-16" width="100" height="10" rx="5" fill="#A06A40"/>` + [-26, -8, 10, 28].map(x => `<rect x="${x - 2}" y="-4" width="4" height="38" rx="2" fill="#A06A40" opacity=".55"/>`).join('')),
  sym('padlock', `<path d="M-16-6V-18A16 16 0 0 1 16-18V-6" stroke="var(--lk2,${I})" stroke-width="7" fill="none"/><rect x="-26" y="-8" width="52" height="42" rx="9" fill="var(--lk,${S})"/><circle cx="0" cy="8" r="5.5" fill="${I}"/><rect x="-2.5" y="9" width="5" height="12" rx="2.5" fill="${I}"/>`),
  sym('envelope', `<rect x="-34" y="-22" width="68" height="44" rx="5" fill="${W}"/><path d="M-34-18L0 6 34-18" stroke="${GREY}" stroke-width="3" fill="none" stroke-linejoin="round"/><rect x="16" y="-18" width="14" height="14" rx="2" fill="${T}"/>`),
  sym('keys', `<circle cx="-14" cy="-12" r="11" fill="none" stroke="${GREY}" stroke-width="4"/><g transform="rotate(30 -8 0)"><circle cx="0" cy="0" r="9" fill="${S}"/><circle cx="0" cy="0" r="3.5" fill="${W}"/><rect x="-3" y="7" width="6" height="26" rx="2" fill="${S}"/><rect x="2" y="22" width="7" height="4" rx="1" fill="${S}"/><rect x="2" y="28" width="5" height="4" rx="1" fill="${S}"/></g><g transform="rotate(-20 -20 0)"><circle cx="-24" cy="4" r="8" fill="${K}"/><circle cx="-24" cy="4" r="3" fill="${W}"/><rect x="-27" y="10" width="6" height="22" rx="2" fill="${K}"/><rect x="-22" y="24" width="6" height="4" rx="1" fill="${K}"/></g>`),
  sym('camera', `<rect x="-30" y="-16" width="60" height="40" rx="8" fill="var(--cm,${P})"/><rect x="-14" y="-24" width="20" height="10" rx="3" fill="var(--cm,${P})"/><circle cx="0" cy="4" r="13" fill="${W}"/><circle cx="0" cy="4" r="8" fill="${I}"/><circle cx="3" cy="1" r="2.5" fill="${W}"/><rect x="18" y="-11" width="7" height="5" rx="2" fill="${S}"/>`),
  sym('piggy', `<ellipse cx="0" cy="4" rx="34" ry="26" fill="var(--pg,#F4A6B0)"/><circle cx="-24" cy="-16" r="8" fill="var(--pg,#F4A6B0)"/><rect x="-22" y="22" width="10" height="14" rx="4" fill="var(--pg,#F4A6B0)"/><rect x="12" y="22" width="10" height="14" rx="4" fill="var(--pg,#F4A6B0)"/><ellipse cx="-34" cy="6" rx="8" ry="10" fill="#E88796"/><circle cx="-36" cy="3" r="1.8" fill="${I}"/><circle cx="-36" cy="9" r="1.8" fill="${I}"/><circle cx="-18" cy="-4" r="3" fill="${I}"/><rect x="-6" y="-24" width="18" height="4" rx="2" fill="${I}"/><path d="M34 0Q44-6 40 6" stroke="#E88796" stroke-width="3" fill="none" stroke-linecap="round"/>`),
];

// ---------- helpers ----------
const phone = (x, y, s, rot = 0, kind = 'awake', scr) => Gp(`translate(${x},${y}) rotate(${rot}) scale(${s})`, U('phone-' + kind), scr ? `--scr:${scr}` : '');
// big kid (9–12): the grown-up build at a smaller scale, with the children's hair and colours
const tween = (k, o) => B.adult(Object.assign({}, CAST[k], o));
const tweenAt = (k, x, floor, s, o = {}) => tween(k, Object.assign({ x, y: floor - 81 * s, s }, o));
const grownAt = (k, x, floor, s, o = {}) => B.adult(Object.assign({}, CAST[k], { x, y: floor - 81 * s, s }, o));
const bubbleTalk = (x, y, s, inner = '', f = W) => Gp(`translate(${x},${y}) scale(${s})`, R(-18, -13, 36, 26, 11, f) + Pa('M-9 11L-15 21-1 12Z', f) + inner);
const dots3 = `<circle cx="-7" cy="0" r="2.6" fill="${I}"/><circle cx="0" cy="0" r="2.6" fill="${I}"/><circle cx="7" cy="0" r="2.6" fill="${I}"/>`;
const zz = (x, y, f = I) => `<text x="${x}" y="${y}" font-family="Fredoka, sans-serif" font-weight="600" font-size="15" fill="${f}">z</text><text x="${x + 11}" y="${y - 10}" font-family="Fredoka, sans-serif" font-weight="600" font-size="11" fill="${f}">z</text>`;

// ---------- icons (120 x 100 box, like the routine cards) ----------
A.phoneSleep = () => phone(58, 58, .66, -4, 'sleep') + moon(98, 24, .24) + zz(84, 86);
A.phoneAwake = () => phone(60, 54, .7, 4) + star(24, 26, .8, S) + star(98, 74, .6, T);
A.phoneBed = () => U('bed', 'translate(60,72) scale(.95)', `--bd:${K}`) + phone(50, 57, .36, -90, 'sleep') + Gp('translate(60,72) scale(.95)', `<path d="M-18-10H40A6 6 0 0 1 46-4V14H-12A6 6 0 0 1-18 8Z" fill="${P}"/><circle cx="4" cy="3" r="3" fill="#fff" opacity=".5"/><circle cx="22" cy="3" r="3" fill="#fff" opacity=".5"/>`) + moon(98, 22, .22) + zz(18, 40);
A.phonePark = () => phone(46, 46, .46, -10, 'sleep') + phone(76, 48, .46, 8, 'sleep') + U('basket', 'translate(60,74) scale(.82)') + moon(102, 20, .2);
A.phoneGift = () => B.use('palm', 'translate(60,84) scale(1.7)', 'style="--sk:#C08457"') + phone(60, 44, .56, 0) + star(24, 24, .9, S) + star(98, 30, .7, T) + star(96, 70, .5, S);
A.chargeSpot = () => R(14, 70, 92, 8, 4, WOOD) + R(22, 78, 6, 14, 3, WOOD) + R(92, 78, 6, 14, 3, WOOD) + phone(46, 48, .4, 0, 'sleep') + phone(78, 50, .36, 0, 'sleep') + St('M46 68V74Q46 82 58 82H70', GREY, 3) + moon(100, 18, .18);
A.keysBag = () => U('backpack', 'translate(40,56) scale(.72)', `--bp:${K};--bp2:${S}`) + U('keys', 'translate(88,52) scale(.95)') + U('bottle', 'translate(96,76) scale(.42)', `--bt:${G}`);
A.homeAddress = () => U('house', 'translate(52,60) scale(.8)', `--rf:${T}`) + Gp('translate(96,38)', R(-15, -11, 30, 22, 5, K) + Tx(0, 6, 0, W, '12', 14)) + R(94, 49, 4, 34, 2, WOOD);
A.numbersCard = () => Gp('rotate(-6 60 52)', R(20, 22, 80, 58, 9, W) + R(20, 22, 80, 14, 7, P) + R(20, 30, 80, 6, 0, P) + Tx(60, 58, 0, I, '555 · 12', 14) + Tx(60, 74, 0, I, '555 · 34', 14)) + star(100, 20, .7, S) + heart(22, 86, .16);
A.planner = () => Gp('rotate(-5 60 54)', R(24, 16, 70, 72, 6, T) + R(30, 26, 58, 56, 3, W) + [0, 1, 2, 3].map(r => [0, 1, 2, 3].map(c => R(34 + c * 13, 30 + r * 12.5, 10, 9.5, 2, (r === 1 && c === 2) ? S : (r === 3 && c === 0) ? tG : WA)).join('')).join('') + R(38, 10, 5, 12, 2.5, I) + R(74, 10, 5, 12, 2.5, I)) + Gp('translate(98,58) rotate(26)', R(-4.5, -28, 9, 44, 2, K) + Pa('M-4.5 16H4.5L0 25Z', '#F1D9A6'));
A.writeLetter = () => U('envelope', 'translate(54,56) scale(1.05)') + heart(71, 42, .09, W) + Gp('translate(98,48) rotate(28)', R(-4.5, -28, 9, 44, 2, G) + Pa('M-4.5 16H4.5L0 25Z', '#F1D9A6')) + star(22, 24, .6, S);
A.mapCompass = () => Pa('M18 24L44 16 72 26 100 18V80L72 88 44 78 18 86Z', tS) + Pa('M44 16V78L72 88V26Z', '#F8E3A8') + St('M28 70Q40 50 58 56T90 34', T, 3, 'stroke-dasharray="5 5"') + Gp('translate(90,34)', Pa('M0 10C-8 0-8-6-8-8A8 8 0 0 1 8-8C8-6 8 0 0 10Z', T) + Ci(0, -7, 3, W)) + Ci(28, 70, 4.5, K);
A.piggyAsk = () => U('piggy', 'translate(54,60) scale(.95)') + Ci(84, 26, 11, S) + Ci(84, 26, 6.5, '#E0A612') + Gp('translate(24,26)', R(-11, -11, 22, 22, 8, W) + Tx(0, 6, 0, T, '?', 16));
A.kindWords = () => bubbleTalk(42, 40, 1.35, heart(0, 1, .2)) + Gp('translate(82,64) scale(-1.2,1.2)', R(-18, -13, 36, 26, 11, K) + Pa('M-9 11L-15 21-1 12Z', K)) + Gp('translate(82,64)', star(0, 0, .75, W));
A.lockInfo = () => U('padlock', 'translate(58,56) scale(1.02)') + star(20, 28, .7, T) + star(100, 30, .55, K) + Ci(98, 80, 5, G);
A.cameraAsk = () => U('camera', 'translate(52,58) scale(1.08)') + Gp('translate(96,28)', R(-12, -11, 24, 22, 8, W) + Tx(0, 6, 0, T, '?', 16)) + star(22, 26, .6, S);
A.askDownload = () => Gp('translate(52,58)', R(-28, -28, 56, 56, 14, K) + Pa('M-4-16H4V2H12L0 16-12 2H-4Z', W)) + Gp('translate(96,28)', R(-12, -11, 24, 22, 8, W) + Tx(0, 6, 0, T, '?', 16)) + star(98, 80, .55, S);
A.eyesUp = () => [0, 1, 2, 3, 4].map(i => R(18 + i * 18, 82, 11, 8, 2, W)).join('') + R(12, 80, 96, 12, 3, GREY, 'opacity=".55"') + tweenAt('A', 58, 84, .34, { face: 'smile', aR: -8, aL: 14 }) + sun(98, 20, .2);
A.tellGrownup = () => A.talkAbout();
A.alwaysCall = () => U('house', 'translate(80,64) scale(.6)', `--rf:${K}`) + phone(34, 56, .52, -8) + St('M52 44Q66 20 84 30', T, 3, 'stroke-dasharray="4 5"') + heart(66, 18, .16);
A.friendsFirst = () => tweenAt('J', 36, 90, .36, { face: 'laugh', aR: -40 }) + tweenAt('E', 84, 90, .36, { face: 'laugh', flip: true, aR: -40 }) + bubbleTalk(60, 18, .8, dots3);
A.lookAfter = () => phone(46, 54, .6, -6) + Gp('translate(88,54)', R(-16, -30, 32, 60, 10, G) + R(-11, -24, 22, 48, 6, tG)) + heart(96, 20, .16) + star(18, 22, .6, S);
A.secretNo = () => bust('C', 44, 52, .8, 'think') + Gp('translate(94,30)', R(-15, -12, 30, 24, 9, W) + Pa('M-8 10L-13 19-1 11Z', W) + Tx(0, 6, 0, T, '!', 16));
A.playLove = () => U('ball', 'translate(40,62) scale(.36)') + A.instrument().replace(/^/, '<g transform="translate(34,4) scale(.62)">') + '</g>' + star(24, 22, .6, S);
A.paperPlane = () => Pa('M16 58L104 22 70 84 58 64Z', '#E6ECF5') + Pa('M58 64L104 22 50 70Z', '#DCE4F0') + Pa('M58 64L62 82 70 84Z', GREY) + St('M16 88Q30 74 44 80', K, 3, 'stroke-dasharray="4 5"') + star(24, 26, .6, S);
A.cardTricks = () => [[-24, T, '♥', -14], [0, K, '★', 0], [24, G, '♣', 14]].map(([r, f, g, dx]) => Gp(`translate(${60 + dx},90) rotate(${r})`, R(-17, -64, 34, 48, 5, W, `stroke="${GREY}" stroke-width="1.5"`) + Tx(0, -34, 0, f, g, 20, 'Nunito Sans', 800))).join('') + star(98, 22, .6, S) + star(22, 30, .5, T);
A.cloudWatch = () => U('cloud', 'translate(42,34) scale(.8)', `--cl:#B9D3F2`) + U('cloud', 'translate(88,24) scale(.6)', `--cl:#B9D3F2`) + `<ellipse cx="60" cy="92" rx="52" ry="9" fill="${G}"/>` + L.head('D', 60, 74, .62, 'joy') + sun(104, 60, .16);
A.checkIn = () => bust('E', 32, 50, .66, 'smile') + bust('G1', 88, 44, .72, 'smile') + U('clock', 'translate(60,22) scale(.4)', `--ck1:${P}`) + R(14, 74, 92, 8, 4, WOOD);
A.freeChoice = () => Ci(60, 52, 28, S) + Tx(60, 62, 0, W, '?', 34) + star(26, 26, .8, T) + star(96, 30, .6, K) + star(92, 80, .5, G);
A.carTalk = () => A.carRide() + bubbleTalk(90, 22, .75, dots3);
A.homeworkZone = () => A.homework();
A.tableZone = () => A.familyDinnerBig();
A.bedroomNight = () => A.lightsOutBig();
A.gameNight = () => A.familyGame();
A.friendsOver = () => A.friendsFirst();
A.walkZone = () => A.eyesUp();
A.cook = () => A.helpDinner();

// ---------- scenes (big, for cover, guide and listing images) ----------
// The first-phone moment: a grown-up hands over a phone; nobody is a villain, the phone is friendly.
function sceneGift(o = {}) {
  const w = o.w || 620, h = o.h || 330, floor = h - 30;
  const tx = 318, ty = floor - 150;
  const g = Object.assign({}, CAST.G2, { x: 220, y: floor - 81 * 1.06, s: 1.06, face: 'laugh', aL: 12 });
  g.aR = B.aimAdult(g, 'R', tx - 8, ty + 14);
  const k = Object.assign({}, CAST.D, { x: 410, y: floor - 81 * .84, s: .84, face: 'joy', flip: true, aL: 16 });
  k.aR = B.aimAdult(k, 'R', tx + 10, ty + 18);
  return `<svg class="art" viewBox="0 0 ${w} ${h}" style="width:100%;height:100%">
  ${o.bg === false ? '' : `<rect x="0" y="0" width="${w}" height="${h}" rx="26" fill="${o.bg || tS}"/>`}
  <rect x="30" y="${floor}" width="${w - 60}" height="10" rx="5" fill="${G}"/>
  ${Gp(`translate(${w - 100},${floor - 80})`, R(-50, 40, 100, 10, 5, WOOD) + R(-44, 50, 7, 30, 3, WOOD) + R(37, 50, 7, 30, 3, WOOD) + phone(-18, 14, .44, -4, 'sleep') + phone(20, 16, .4, 6, 'sleep') + moon(34, -70, .3))}
  ${B.adult(g)}
  ${B.adult(k)}
  ${phone(tx, ty - 6, .62, 6)}
  ${star(70, 60, 1.2, S)}${star(250, 40, .8, T)}${heart(400, 48, .42)}${star(530, 120, .7, K)}
  ${U('ball', `translate(90,${floor - 24}) scale(.48)`)}${U('book-closed', `translate(146,${floor - 30}) scale(.9) rotate(-8)`, `--bc:${K}`)}
</svg>`;
}
// Phone-free afternoon: a big kid and a grown-up outside, phones asleep in a basket by the door.
function sceneAfternoon(o = {}) {
  const w = o.w || 620, h = o.h || 330, floor = h - 30;
  return `<svg class="art" viewBox="0 0 ${w} ${h}" style="width:100%;height:100%">
  ${o.bg === false ? '' : `<rect x="0" y="0" width="${w}" height="${h}" rx="26" fill="${o.bg || tG}"/>`}
  ${sun(w - 80, 70, .8)}
  <rect x="30" y="${floor}" width="${w - 60}" height="10" rx="5" fill="${G}"/>
  ${U('tree', `translate(80,${floor - 44}) scale(1.35)`)}
  ${Gp(`translate(178,${floor - 44}) scale(1.05)`, '<g transform="translate(-60,-50)">' + A.bike() + '</g>')}
  ${tweenAt('A', 300, floor, .86, { face: 'laugh', aL: 150, aR: -160 })}
  ${grownAt('G1', 420, floor, 1.04, { face: 'laugh', flip: true, aL: 10, aR: -150 })}
  ${U('ball', `translate(362,${floor - 236}) scale(.44)`)}
  ${Gp(`translate(${w - 84},${floor - 30}) scale(1.3)`, phone(-16, -10, .38, -10, 'sleep') + phone(12, -8, .38, 8, 'sleep') + U('basket', 'translate(0,12) scale(.7)'))}
  ${star(240, 60, .9, S)}${star(480, 90, .7, T)}
</svg>`;
}

module.exports = { NEW, phone, tween, tweenAt, grownAt, sceneGift, sceneAfternoon, bubbleTalk, dots3, zz };
