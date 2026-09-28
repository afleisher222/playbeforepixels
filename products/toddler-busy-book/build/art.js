// New object art for the Toddler Busy Book. Same rules as the rest of the line (guide-100-plays/build/icons.js,
// board-up-go-more): flat vector, solid fills, no gradients, no outlines, brand palette only.
// Every symbol fits a ~100 x 100 box centred on 0,0 and is prefixed "b-".
// Wood and skin use the brand skin-tone swatches, exactly as the guide's spoon, box and dough do.
const C = {
  ink: '#1D2940', paper: '#FFFFFF', wash: '#F3F6FB', tomato: '#EE5A36', sun: '#F5B820', sky: '#3D86D8',
  grass: '#2FA36B', plum: '#8A5CC7', tTomato: '#FDE9E3', tSun: '#FEF4D8', tSky: '#E3EEFA', tGrass: '#DFF3E9', tPlum: '#EFE6FA',
  s1: '#F4CFAE', s2: '#E0AC80', s3: '#C08457', s4: '#8D5A3B', s5: '#5C3A26',
};
const W = '#FFFFFF', I = C.ink;
const R = (x, y, w, h, f, rx = 0, ex = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${ex}/>`;
const Ci = (cx, cy, r, f, ex = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${ex}/>`;
const E = (cx, cy, rx, ry, f, ex = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${ex}/>`;
const Pa = (d, f, ex = '') => `<path d="${d}" fill="${f}" ${ex}/>`;
const L = (d, c, w) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const sym = (id, body) => `<symbol id="b-${id}" overflow="visible">${body}</symbol>`;
const eye = (x, y, r = 4) => Ci(x, y, r, I) + Ci(x + r * 0.35, y - r * 0.35, r * 0.32, W);
const star = (r1, r2, k = 5) => { let d = ''; for (let i = 0; i < k * 2; i++) { const r = i % 2 ? r2 : r1; const a = Math.PI / k * i - Math.PI / 2; d += (i ? 'L' : 'M') + (r * Math.cos(a)).toFixed(1) + ' ' + (r * Math.sin(a)).toFixed(1); } return d + 'Z'; };
const smile = (y = 8, w = 7) => L(`M${-w} ${y}Q0 ${y + w * 0.9} ${w} ${y}`, I, 3.2);
const cloudPath = 'M-40 22C-54 22-56 2-42-2C-44-20-22-28-12-16C-6-32 22-32 26-12C42-16 54 2 42 14C46 22 38 22 34 22Z';

const ART = [
  // ---------- food (pictures only; nothing on a choking-hazard list) ----------
  sym('apple', Pa('M0-22C-10-30-44-30-44 2C-44 28-22 44-10 42C-4 41-2 38 0 38C2 38 4 41 10 42C22 44 44 28 44 2C44-30 10-30 0-22Z', C.tomato) + R(-3, -40, 6, 20, C.s4, 3) + Pa('M4-30C10-44 26-44 30-36C22-30 12-28 4-30Z', C.grass) + E(-22, -8, 6, 10, W, 'opacity=".35" transform="rotate(20 -22 -8)"')),
  sym('banana', Pa('M-40-26C-44 10-18 40 20 36C34 34 42 26 44 20C30 26 4 24-14 4C-26-10-30-22-30-30Z', C.sun) + R(-39, -40, 9, 14, C.s4, 3, 'transform="rotate(-8 -35 -33)"') + Pa('M-30-24C-26-2-8 18 20 26C0 24-20 8-26-12Z', W, 'opacity=".35"')),
  sym('bread', Pa('M-38 40V-6C-48-10-50-40-22-42H22C50-40 48-10 38-6V40Z', C.s2) + Pa('M-30 34V-10C-40-14-38-34-18-34H18C38-34 40-14 30-10V34Z', C.tSun)),
  sym('milk', Pa('M-24-18L-12-38H12L24-18Z', C.sky) + R(-12, -46, 24, 10, C.sky, 3) + R(-24, -18, 48, 64, W) + R(-24, -2, 48, 26, C.sky) + Ci(0, 11, 8, W)),
  sym('cake', Pa('M-40 0L40-24V36H-40Z', C.sun) + Pa('M-40 0L40-24V-12L-40 12Z', W) + R(-40, 20, 80, 6, C.tomato) + Pa('M-40 0L40-24C44-24 44-28 40-30L-40-6Z', W) + Ci(24, -32, 9, C.tomato) + L('M24-40Q26-50 32-52', C.grass, 3)),
  sym('cupcake', Pa('M-30 4H30L22 44H-22Z', C.plum) + L('M-16 8L-12 42M0 8V42M16 8L12 42', C.tPlum, 3) + Pa('M-36 6C-40-10-26-18-18-16C-18-32 18-32 18-16C28-20 42-10 36 6Z', C.tTomato) + Ci(0, -28, 8, C.tomato)),
  sym('toast', Pa('M-36 38V-6C-46-10-46-38-20-40H20C46-38 46-10 36-6V38Z', C.s3) + Pa('M-28 32V-10C-36-14-34-32-16-32H16C34-32 36-14 28-10V32Z', C.sun) + R(-14, -8, 28, 16, C.tSun, 4)),
  sym('pizza', Ci(0, 0, 48, C.s2) + Ci(0, 0, 40, C.tomato) + Ci(0, 0, 34, C.sun, 'opacity=".9"')),
  sym('slice-tomato', Ci(0, 0, 40, C.tomato) + Ci(0, 0, 32, C.tomato) + [0, 72, 144, 216, 288].map(a => E(Math.cos(a * Math.PI / 180) * 17, Math.sin(a * Math.PI / 180) * 17, 5, 8, C.tTomato, `transform="rotate(${a + 90} ${(Math.cos(a * Math.PI / 180) * 17).toFixed(1)} ${(Math.sin(a * Math.PI / 180) * 17).toFixed(1)})"`)).join('') + Ci(0, 0, 6, C.tTomato)),
  sym('pepper', Pa('M0-30C22-30 40-14 40 8C40 30 22 42 0 42C-22 42-40 30-40 8C-40-14-22-30 0-30Z', C.grass) + Pa('M0-18C14-18 26-8 26 8C26 22 14 30 0 30C-14 30-26 22-26 8C-26-8-14-18 0-18Z', C.tGrass) + R(-4, -44, 8, 16, C.grass, 4)),
  sym('mushroom', Pa('M-42 4C-42-26-20-40 0-40C20-40 42-26 42 4Z', C.s2) + R(-16, 2, 32, 38, C.tSun, 12) + Ci(-18, -18, 6, C.tSun) + Ci(12, -26, 5, C.tSun) + Ci(22, -8, 5, C.tSun)),
  sym('cheese', Pa('M-42 30L-42-8L36-34L42 30Z', C.sun) + Ci(-12, 8, 7, C.tSun) + Ci(16, 14, 5, C.tSun) + Ci(18, -12, 5, C.tSun)),
  sym('bone', Pa('M-30-10C-46-26-58-4-44 0C-58 4-46 26-30 10H30C46 26 58 4 44 0C58-4 46-26 30-10Z', W)),
  sym('pear', Pa('M0-30C-10-30-14-18-14-8C-30 2-34 18-28 30C-20 44 20 44 28 30C34 18 30 2 14-8C14-18 10-30 0-30Z', C.grass) + R(-3, -44, 6, 16, C.s4, 3) + E(-12, 16, 5, 9, W, 'opacity=".3"')),
  // ---------- animals ----------
  sym('cow', '<g transform="translate(12,0)">' + R(-42, -8, 76, 44, W, 22) + Pa('M-20-8H6C8 4 0 12-10 10C-22 8-24 0-20-8Z', I) + Ci(18, 22, 9, I) + R(-34, 26, 12, 24, W, 6) + R(14, 26, 12, 24, W, 6) + R(-34, 42, 12, 8, I, 4) + R(14, 42, 12, 8, I, 4) + Ci(-40, -22, 22, W) + E(-48, -6, 16, 11, C.tTomato) + Ci(-53, -7, 2.4, I) + Ci(-43, -7, 2.4, I) + eye(-44, -28, 3.4) + eye(-30, -28, 3.4) + Pa('M-58-38C-66-40-68-32-60-30Z', C.s2) + Pa('M-22-38C-14-40-12-32-20-30Z', C.s2) + R(-26, -50, 7, 12, C.tSun, 3) + R(-60, -50, 7, 12, C.tSun, 3) + R(32, -2, 6, 26, W, 3, 'transform="rotate(-20 35 11)"') + '</g>'),
  sym('pig', '<g transform="translate(8,0)">' + R(-40, -14, 78, 50, C.s1, 25) + R(-30, 28, 12, 18, C.s1, 6) + R(14, 28, 12, 18, C.s1, 6) + Ci(-38, -14, 22, C.s1) + Pa('M-54-30L-56-48-42-36Z', C.s2) + Pa('M-30-38L-20-50-18-32Z', C.s2) + E(-50, -6, 11, 8, C.s2) + Ci(-54, -6, 2.4, I) + Ci(-46, -6, 2.4, I) + eye(-44, -22, 3.3) + eye(-30, -22, 3.3) + L('M38 2Q48-4 44 8Q40 16 50 12', C.s2, 4) + '</g>'),
  sym('sheep', [[-30, -6], [-14, -16], [4, -16], [20, -8], [26, 8], [12, 20], [-8, 22], [-26, 14]].map(([x, y]) => Ci(x, y, 16, W)).join('') + Ci(-2, 2, 24, W) + R(-24, 22, 9, 22, I, 4.5) + R(10, 22, 9, 22, I, 4.5) + E(-42, -12, 15, 18, I) + E(-54, -16, 9, 5, I, 'transform="rotate(-25 -54 -16)"') + eye(-46, -14, 3.2) + eye(-37, -14, 3.2) + Ci(-44, -30, 8, W) + Ci(-34, -28, 7, W)),
  sym('fish', Pa('M-40 0C-40-20-18-30 4-30C24-30 34-14 38 0C34 14 24 30 4 30C-18 30-40 20-40 0Z', 'var(--fc,' + C.sky + ')') + Pa('M34 0L52-22V22Z', 'var(--fc,' + C.sky + ')') + Pa('M-4-30L10-44 16-28Z', 'var(--fc,' + C.sky + ')') + eye(-20, -6, 5) + L('M-34 10Q-28 14-22 10', I, 3) + Pa('M4-20C12-10 12 10 4 20', 'none', `stroke="${W}" stroke-width="4" stroke-linecap="round" opacity=".45"`)),
  sym('bird', Ci(0, 4, 34, 'var(--bd,' + C.sky + ')') + Pa('M-8 4C6-14 30-10 34 6C20 4 6 12-8 4Z', 'var(--bw,' + C.tSky + ')') + Pa('M-36-2L-50 4-36 10Z', C.sun) + eye(-18, -8, 4.5) + R(-8, 34, 5, 12, C.sun, 2.5) + R(6, 34, 5, 12, C.sun, 2.5) + Pa('M30-4L48-16 44 4Z', 'var(--bd,' + C.sky + ')')),
  sym('frog', E(0, 14, 40, 28, C.grass) + Ci(-20, -16, 14, C.grass) + Ci(20, -16, 14, C.grass) + Ci(-20, -17, 8, W) + Ci(20, -17, 8, W) + Ci(-19, -16, 4.5, I) + Ci(21, -16, 4.5, I) + L('M-16 10Q0 22 16 10', I, 3.4) + E(-34, 38, 14, 6, C.grass) + E(34, 38, 14, 6, C.grass) + Ci(-12, 4, 4, C.s1) + Ci(12, 4, 4, C.s1)),
  sym('bee', E(-14, -22, 16, 22, C.tSky, 'transform="rotate(-25 -14 -22)"') + E(12, -24, 16, 22, C.tSky, 'transform="rotate(25 12 -24)"') + E(0, 6, 38, 28, C.sun) + R(-14, -20, 10, 52, I, 0, 4) + R(8, -18, 10, 48, I, 4) + Pa('M34 6L48 0 46 12Z', I) + eye(-24, 0, 4.5) + L('M-30 12Q-24 16-18 12', I, 3) + L('M-30-18Q-34-34-26-38M-18-20Q-16-36-8-38', I, 2.6)),
  sym('ladybug', E(0, 6, 36, 34, C.tomato) + Ci(0, -28, 16, I) + R(-2, -26, 4, 66, I) + Ci(-16, -2, 7, I) + Ci(16, -2, 7, I) + Ci(-18, 22, 6, I) + Ci(18, 22, 6, I) + eye(-6, -32, 3) + eye(6, -32, 3)),
  sym('teddy', Ci(-24, -34, 12, C.s3) + Ci(24, -34, 12, C.s3) + Ci(-24, -34, 6, C.s2) + Ci(24, -34, 6, C.s2) + R(-30, 2, 60, 48, C.s3, 24) + Ci(0, -16, 30, C.s3) + E(0, -6, 13, 10, C.s2) + E(0, -10, 5, 4, I) + eye(-12, -22, 3.6) + eye(12, -22, 3.6) + L('M-5-2Q0 2 5-2', I, 2.6) + Ci(-30, 20, 10, C.s3) + Ci(30, 20, 10, C.s3) + E(0, 26, 15, 16, C.s2)),
  // ---------- nature & weather ----------
  sym('flower', R(-3, 0, 6, 48, C.grass, 3) + Pa('M0 30C10 14 28 14 32 20C24 30 10 32 0 30Z', C.grass) + [0, 60, 120, 180, 240, 300].map(a => Ci((Math.cos(a * Math.PI / 180) * 18).toFixed(1), (-14 + Math.sin(a * Math.PI / 180) * 18).toFixed(1), 13, 'var(--pt,' + C.tomato + ')')).join('') + Ci(0, -14, 12, C.sun)),
  sym('tree', R(-7, 4, 14, 44, C.s4, 6) + Ci(0, -14, 34, C.grass) + Ci(-24, 2, 20, C.grass) + Ci(24, 2, 20, C.grass) + Ci(-12, -26, 8, W, 'opacity=".22"')),
  sym('cloud', Pa(cloudPath, 'var(--cl,' + W + ')')),
  sym('rain', `<g transform="translate(0,-12)">${Pa(cloudPath, C.sky)}</g>` + [[-24, 24], [-4, 32], [16, 24], [30, 36]].map(([x, y]) => Pa(`M${x} ${y - 10}C${x + 6} ${y - 2} ${x + 6} ${y + 6} ${x} ${y + 6}C${x - 6} ${y + 6} ${x - 6} ${y - 2} ${x} ${y - 10}Z`, C.sky)).join('')),
  sym('snowflake', [0, 60, 120].map(a => `<g transform="rotate(${a})">${L('M0-40V40M0-26L-10-34M0-26L10-34M0 26L-10 34M0 26L10 34', C.sky, 6)}</g>`).join('')),
  sym('snowman', Ci(0, 22, 28, W) + Ci(0, -20, 20, W) + eye(-7, -24, 3) + eye(7, -24, 3) + Pa('M0-18L14-14 0-12Z', C.tomato) + Ci(0, 14, 3.5, I) + Ci(0, 26, 3.5, I) + R(-18, -42, 36, 8, I, 3) + R(-11, -58, 22, 18, I, 3)),
  sym('wind', L('M-44-12H18C30-12 34-28 22-32C14-34 8-28 10-22', C.sky, 7) + L('M-44 6H30C42 6 46 22 34 26C26 28 20 22 22 16', C.sky, 7) + L('M-36 22H0', C.sky, 7)),
  sym('pond', E(0, 10, 48, 22, C.sky) + E(-10, 6, 26, 8, W, 'opacity=".3"') + R(30, -30, 4, 36, C.grass, 2) + E(32, -34, 5, 10, C.s4) + R(-40, -20, 4, 28, C.grass, 2)),
  sym('log', R(-44, -16, 88, 36, C.s3, 18) + E(40, 2, 12, 18, C.s2) + E(40, 2, 6, 10, C.s3) + L('M-30-6H10M-20 8H20', C.s4, 3.5)),
  sym('nest', E(0, 10, 44, 20, C.s3) + E(0, 4, 34, 12, C.s4) + E(-12, -2, 11, 14, W) + E(10, -4, 11, 14, C.tSky) + L('M-40 10Q-20 22 0 12Q20 22 40 10', C.s4, 3)),
  sym('hive', Pa('M-36 40V0C-36-26-18-44 0-44C18-44 36-26 36 0V40Z', C.sun) + R(-36, -22, 72, 6, C.s2) + R(-38, -4, 76, 6, C.s2) + R(-38, 14, 76, 6, C.s2) + Pa('M-10 40V30A10 10 0 0 1 10 30V40Z', I)),
  sym('doghouse', Pa('M-40 44V-6L0-40 40-6V44Z', C.sun) + Pa('M-50-2L0-46 50-2 44 4 0-34-44 4Z', C.tomato) + Pa('M-14 44V14A14 14 0 0 1 14 14V44Z', I)),
  sym('fishbowl', Pa('M-26-34H26C46-20 50 14 32 32C22 42-22 42-32 32C-50 14-46-20-26-34Z', C.tSky) + Pa('M-44 0H44C44 18 36 30 32 32C22 42-22 42-32 32C-38 26-44 16-44 0Z', C.sky, 'opacity=".55"') + R(-30, -40, 60, 8, C.tSky, 4) + R(-38, 38, 76, 8, C.s3, 4)),
  // ---------- clothes ----------
  sym('coat', Pa('M-18-40H18L44-20 36 4 26 0V44H-26V0L-36 4-44-20Z', 'var(--co,' + C.sky + ')') + Pa('M-18-40L0-22 18-40Z', C.tSky) + R(-2, -22, 4, 66, C.ink, 2, 'opacity=".25"') + Ci(-8, -6, 3.5, W) + Ci(-8, 10, 3.5, W) + Ci(-8, 26, 3.5, W) + R(-22, 10, 12, 4, W, 2, 'opacity=".4"') + R(10, 10, 12, 4, W, 2, 'opacity=".4"')),
  sym('tshirt', Pa('M-16-38Q0-28 16-38L44-22 34-4 24-10V40H-24V-10L-34-4-44-22Z', 'var(--ts,' + C.grass + ')') + Pa('M-16-38Q0-28 16-38Q0-18-16-38Z', W, 'opacity=".45"')),
  sym('shorts', Pa('M-34-26H34L40 34H8L0 0-8 34H-40Z', 'var(--sr,' + C.plum + ')') + R(-34, -30, 68, 10, 'var(--sr,' + C.plum + ')', 3) + R(-34, -24, 68, 3, W, 1.5, 'opacity=".35"')),
  sym('sunhat', E(0, 12, 50, 14, C.sun) + Pa('M-26 12C-26-18-12-28 0-28C12-28 26-18 26 12Z', C.sun) + R(-26, 0, 52, 9, C.tomato)),
  sym('beanie', Pa('M-36 16C-36-18-18-34 0-34C18-34 36-18 36 16Z', C.tomato) + R(-40, 10, 80, 20, C.tTomato, 8) + Ci(0, -38, 11, C.sun) + L('M-16-24V8M0-30V8M16-24V8', C.tTomato, 4)),
  sym('mitten', Pa('M-24 36V-14C-24-34-12-44 2-44C16-44 26-34 26-18V36Z', C.plum) + Pa('M-24 0C-34-4-42-16-34-24C-28-30-20-24-18-16Z', C.plum) + R(-28, 28, 58, 16, C.tPlum, 6) + L('M-10-20L6-6M6-20L-10-6', C.tPlum, 3)),
  sym('umbrella', Pa('M-48 0C-46-30-24-44 0-44C24-44 46-30 48 0C40-8 32-8 24 0C16-8 8-8 0 0C-8-8-16-8-24 0C-32-8-40-8-48 0Z', C.tomato) + R(-2.5, -52, 5, 10, I, 2.5) + L('M0 0V32C0 42 14 42 14 32', I, 5) + Pa('M0-44C-8-30-12-14-12 0H-24C-24-16-14-34 0-44Z', W, 'opacity=".25"')),
  sym('sunglasses', R(-44, -14, 38, 26, I, 12) + R(6, -14, 38, 26, I, 12) + R(-8, -10, 16, 5, I, 2.5) + R(-38, -8, 12, 5, W, 2.5, 'opacity=".4"') + R(12, -8, 12, 5, W, 2.5, 'opacity=".4"')),
  sym('pjs', Pa('M-16-40Q0-30 16-40L40-26 32-10 22-14V14H-22V-14L-32-10-40-26Z', C.tSky) + Pa('M-22 12H22L26 44H4L0 22-4 44H-26Z', C.tSky) + Ci(-8, -18, 5, C.sun) + Ci(10, -4, 5, C.sun) + Ci(-10, 30, 5, C.sun) + Ci(12, 34, 4, C.sun)),
  // ---------- home & things ----------
  sym('toothbrush', R(-6, -18, 12, 64, C.sky, 6, 'transform="rotate(20)"') + `<g transform="rotate(20)">${R(-8, -44, 16, 28, W, 4)}${R(-8, -44, 16, 4, C.tSky)}${R(-8, -34, 16, 4, C.tSky)}${R(-8, -24, 16, 4, C.tSky)}${R(-4, -18, 4, 30, W, 2, 'opacity=".4"')}</g>`),
  sym('bed', R(-48, -4, 96, 26, C.plum, 6) + R(-48, -30, 12, 64, C.s3, 4) + R(40, -12, 10, 46, C.s3, 4) + R(-34, -14, 26, 14, W, 7) + R(-12, -10, 56, 16, C.tSky, 6)),
  sym('bath', R(-46, -6, 92, 34, W, 12) + R(-50, -12, 100, 10, C.sky, 5) + R(-36, 26, 8, 14, C.sky, 4) + R(28, 26, 8, 14, C.sky, 4) + R(30, -44, 6, 34, C.s3, 3) + R(22, -46, 20, 7, C.s3, 3.5) + [[-30, -14], [-16, -20], [0, -14], [-22, -26]].map(([x, y]) => Ci(x, y, 8, W)).join('') + Ci(-16, -20, 8, C.tSky)),
  sym('sofa', R(-50, -18, 100, 40, C.grass, 14) + R(-36, -34, 72, 30, C.grass, 12) + R(-54, -10, 18, 36, C.grass, 9) + R(36, -10, 18, 36, C.grass, 9) + R(-54, -10, 18, 36, I, 9, 'opacity=".18"') + R(36, -10, 18, 36, I, 9, 'opacity=".18"') + R(-44, 24, 8, 12, C.s4, 3) + R(36, 24, 8, 12, C.s4, 3)),
  sym('fridge', R(-30, -48, 60, 96, W, 8) + R(-30, -10, 60, 4, C.tSky) + R(-22, -40, 5, 20, C.sky, 2.5) + R(-22, 0, 5, 26, C.sky, 2.5) + Ci(14, -30, 4, C.tomato) + R(6, 10, 14, 12, C.sun, 2)),
  sym('lamp', Pa('M-24-12L-14-44H14L24-12Z', C.sun) + R(-3, -12, 6, 44, I, 3) + R(-20, 30, 40, 10, I, 5)),
  sym('boat', Pa('M-46 6H46L32 30H-32Z', C.tomato) + R(-2, -44, 5, 50, C.s4, 2) + Pa('M4-40L34 0H4Z', W) + Pa('M-2-34L-30 0H-2Z', C.sun) + L('M-54 36Q-44 30-34 36T-14 36T6 36T26 36T46 36', C.sky, 4)),
  sym('bus', R(-50, -34, 100, 60, C.sun, 12) + R(-42, -26, 22, 20, W, 4) + R(-14, -26, 22, 20, W, 4) + R(14, -26, 22, 20, W, 4) + R(40, -26, 8, 30, C.tSky, 3) + R(-50, 6, 100, 5, C.tomato) + Ci(-28, 28, 11, I) + Ci(-28, 28, 4, W) + Ci(28, 28, 11, I) + Ci(28, 28, 4, W)),
  sym('truck', R(-50, -30, 62, 48, C.tomato, 6) + Pa('M14-16H34L48 2V18H14Z', C.sky) + R(22, -10, 12, 12, W, 2) + Ci(-30, 22, 11, I) + Ci(-30, 22, 4, W) + Ci(30, 22, 11, I) + Ci(30, 22, 4, W)),
  sym('train', R(-48, -18, 60, 40, C.sky, 8) + R(12, -40, 36, 62, C.sky, 8) + R(18, -34, 24, 18, W, 4) + R(-40, -34, 14, 18, C.ink, 3) + R(-44, -40, 22, 8, C.ink, 3) + R(-52, 8, 104, 6, C.tomato, 3) + Ci(-30, 26, 10, I) + Ci(-4, 26, 10, I) + Ci(30, 26, 10, I) + Ci(-30, 26, 3.5, W) + Ci(-4, 26, 3.5, W) + Ci(30, 26, 3.5, W)),
  sym('present', R(-38, -12, 76, 54, C.plum, 6) + R(-44, -26, 88, 18, C.plum, 5) + R(-44, -26, 88, 18, W, 5, 'opacity=".25"') + R(-7, -26, 14, 68, C.sun) + Pa('M0-26C-8-44-30-44-26-32C-24-26-10-26 0-26Z', C.sun) + Pa('M0-26C8-44 30-44 26-32C24-26 10-26 0-26Z', C.sun)),
  sym('drum', E(0, -18, 40, 12, C.tSun) + Pa('M-40-18V26C-40 40 40 40 40 26V-18C40-6-40-6-40-18Z', C.tomato) + L('M-40-10L-20 30L0-8L20 30L40-10', W, 4) + R(-6, -58, 6, 40, C.s3, 3, 'transform="rotate(-30 -3 -38)"') + Ci(-16, -54, 6, C.s2)),
  sym('shovel-pail', Pa('M-34-18H14L8 40H-28Z', C.tomato) + R(-38, -24, 56, 10, C.tomato, 5) + L('M-30-20Q-10-50 10-20', I, 4) + R(24, -40, 6, 50, C.s3, 3) + Pa('M18 8H36V28C36 38 18 38 18 28Z', C.sky)),
  sym('clock', Ci(0, 0, 42, C.sky) + Ci(0, 0, 34, W) + L('M0-22V0L14 10', I, 5) + Ci(0, 0, 4, I)),
  // ---------- shapes (for shape pages) ----------
  sym('s-circle', Ci(0, 0, 44, 'var(--sf,' + C.tomato + ')')),
  sym('s-square', R(-40, -40, 80, 80, 'var(--sf,' + C.sky + ')', 6)),
  sym('s-triangle', Pa('M0-44L48 38H-48Z', 'var(--sf,' + C.grass + ')', `stroke="var(--sf,${C.grass})" stroke-width="8" stroke-linejoin="round"`)),
  sym('s-rectangle', R(-48, -28, 96, 56, 'var(--sf,' + C.sun + ')', 6)),
  sym('s-star', Pa(star(50, 22), 'var(--sf,' + C.plum + ')', `stroke="var(--sf,${C.plum})" stroke-width="6" stroke-linejoin="round"`)),
  sym('s-heart', Pa('M0 42C-8 34-48 12-48-12C-48-32-34-42-22-42C-12-42-4-36 0-28C4-36 12-42 22-42C34-42 48-32 48-12C48 12 8 34 0 42Z', 'var(--sf,' + C.tomato + ')')),
  sym('s-oval', E(0, 0, 48, 32, 'var(--sf,' + C.sky + ')')),
  sym('s-diamond', Pa('M0-48L38 0 0 48-38 0Z', 'var(--sf,' + C.sun + ')', `stroke="var(--sf,${C.sun})" stroke-width="6" stroke-linejoin="round"`)),
  // ---------- UI bits used on pages ----------
  sym('scissors', Ci(-22, 18, 11, 'none', `stroke="${I}" stroke-width="6"`) + Ci(22, 18, 11, 'none', `stroke="${I}" stroke-width="6"`) + Pa('M-14 8L20-44 26-40-6 12Z', I) + Pa('M14 8L-20-44-26-40 6 12Z', I)),
  sym('printer', R(-34, -44, 68, 40, W) + R(-24, -34, 36, 5, C.tSky, 2) + R(-24, -24, 48, 5, C.tSky, 2) + R(-46, -12, 92, 42, C.plum, 12) + R(-30, 20, 60, 26, W) + R(-22, 28, 30, 4, C.tSky, 2) + Ci(32, 2, 5, C.sun)),
  sym('laminator', R(-46, -10, 92, 34, C.sky, 10) + R(-38, -24, 76, 18, W) + R(-38, -24, 76, 5, C.tSky) + R(-30, 2, 20, 6, W, 3, 'opacity=".5"') + Ci(34, 6, 4, C.sun)),
  sym('velcro', Ci(-18, 0, 18, W) + Ci(-18, 0, 12, C.tSky) + Ci(18, 0, 18, W) + Ci(18, 0, 12, C.tSun) + [[-24, -4], [-14, 4], [-20, 6], [-12, -6]].map(([x, y]) => Ci(x, y, 2, C.sky)).join('') + [[12, -4], [22, 4], [16, 6], [24, -6]].map(([x, y]) => Ci(x, y, 2, C.s3)).join('')),
  sym('binder', R(-38, -46, 76, 92, C.plum, 8) + R(-24, -46, 62, 92, C.tPlum, 8) + [-26, 0, 26].map(y => R(-44, y - 5, 18, 10, I, 5)).join('') + R(-8, -26, 38, 24, W, 5)),
  sym('pouch', R(-44, -30, 88, 64, C.tSky, 8) + R(-44, -30, 88, 12, C.sky, 6) + R(-30, 0, 32, 20, W, 4) + R(10, 0, 22, 24, C.tSun, 4, 'transform="rotate(8 21 12)"')),
  sym('tube', R(-18, -44, 36, 88, C.s2, 4) + E(0, -44, 18, 7, C.s3) + E(0, -44, 12, 4, C.s5) + L('M-18-20L18-4M-18 8L18 24', C.s3, 3)),
];

module.exports = { ART, C, star };
