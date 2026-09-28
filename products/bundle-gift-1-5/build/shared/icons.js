// Play Before Pixels: flat icon set shared by the gift bundle, the printable library, the winter
// countdown, the gift-reveal cards and play coupons, and the free "Five 5-Minute Plays" printable.
//
// Style (brand/BRAND.md "Illustration style"): flat vector, solid fills from the brand palette, no
// gradients, no shadows, no outlines. Every icon is drawn in a 100 x 100 box.
//
// Each icon is a list of PARTS. In color files the parts are simply drawn. In low-ink files each part is
// drawn twice (an ink silhouette a little larger, then a white fill), so the page shows clean line art a
// child can color, with lines only between parts, never across them (see kit.js `icon()`).
//
// Fill classes (colors live in kit.js CSS, so low-ink can swap them):
//   fk sky · ft tomato · fs sun · fg grass · fp plum · fn brown (hair #A0522D) · fw paper white
//   fd night (ink in color, white in low-ink) · fi ink details (always ink) · fsk skin
//   tk / tt / ts / tg / tp  pale tints (sky, tomato, sun, grass, plum)
//   sl = a stroked line (fill none); its stroke color is set inline and turns ink in low-ink.
'use strict';

const star = (cx, cy, r, cls) => {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = Math.PI / 2 * -1 + i * Math.PI / 5, rr = i % 2 ? r * 0.46 : r;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return `<path class="${cls}" d="M${pts.join('L')}Z" stroke-linejoin="round"/>`;
};
const eye = (x, y, r = 3.2) => `<circle class="fi" cx="${x}" cy="${y}" r="${r}"/>`;
const smile = (x, y, w = 7, col = '#1D2940', sw = 2.6) => `<path class="sl" d="M${x - w} ${y}Q${x} ${y + w * 0.9} ${x + w} ${y}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round"/>`;
const line = (d, col = '#1D2940', sw = 2.6) => `<path class="sl" d="${d}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
const ring = (cx, cy, r1, r2, cls) => `<path class="${cls}" fill-rule="evenodd" d="M${cx - r1} ${cy}a${r1} ${r1} 0 1 0 ${2 * r1} 0a${r1} ${r1} 0 1 0 ${-2 * r1} 0ZM${cx - r2} ${cy}a${r2} ${r2} 0 1 0 ${2 * r2} 0a${r2} ${r2} 0 1 0 ${-2 * r2} 0Z"/>`;

const mittenShape = (cls, cuff) => [
  `<path class="${cls}" d="M36 76V40Q36 20 53 20Q70 20 70 40V76Z"/><rect class="${cls}" x="20" y="42" width="17" height="30" rx="8.5" transform="rotate(-28 28.5 57)"/>`,
  `<rect class="${cuff}" x="31" y="70" width="44" height="17" rx="6"/>`,
];

const I = {
  // ---------------- winter countdown ----------------
  snowball: [
    `<path class="fk" d="M16 52H84L77 88Q76 93 70 93H30Q24 93 23 88Z"/>`,
    `<rect class="fw" x="31" y="62" width="9" height="5" rx="2.5"/><rect class="fw" x="46" y="62" width="9" height="5" rx="2.5"/><rect class="fw" x="61" y="62" width="9" height="5" rx="2.5"/><rect class="fw" x="36" y="75" width="9" height="5" rx="2.5"/><rect class="fw" x="54" y="75" width="9" height="5" rx="2.5"/>`,
    `<circle class="tk" cx="36" cy="40" r="15"/>` + line('M28 36Q34 40 30 46M38 30Q42 38 46 36', '#3D86D8', 2.2),
    `<circle class="tk" cx="63" cy="33" r="17"/>` + line('M54 30Q60 34 57 42M64 22Q70 30 74 27M66 40Q70 44 72 40', '#3D86D8', 2.2),
  ],
  mitten: [
    `<g transform="translate(-16 0) scale(.9) translate(6 6)">${mittenShape('ft', 'fs').join('')}</g>`,
    `<g transform="translate(116 0) scale(-.9 .9) translate(6 6)">${mittenShape('ft', 'fs').join('')}</g>`,
  ],
  window: [
    `<rect class="fk" x="16" y="12" width="68" height="78" rx="8"/>`,
    `<rect class="tk" x="23" y="19" width="25" height="30" rx="3"/><rect class="tk" x="52" y="19" width="25" height="30" rx="3"/><rect class="tk" x="23" y="53" width="25" height="30" rx="3"/><rect class="tk" x="52" y="53" width="25" height="30" rx="3"/>`,
    `<ellipse class="fw" cx="50" cy="52" rx="20" ry="16"/>` + eye(43, 48, 2.6) + eye(57, 48, 2.6) + smile(50, 56, 7, '#3D86D8', 2.4),
  ],
  bear: [
    `<path class="fp" d="M8 90L50 14L92 90Z"/>`,
    `<path class="tp" d="M30 90L50 50L70 90Z"/>`,
    `<circle class="fn" cx="40" cy="66" r="6"/><circle class="fn" cx="60" cy="66" r="6"/><circle class="fn" cx="50" cy="78" r="14"/>`,
    `<ellipse class="fs" cx="50" cy="83" rx="7" ry="5"/>` + eye(50, 81, 2.2) + line('M42 74Q45 76 48 74M52 74Q55 76 58 74', '#1D2940', 2),
  ],
  ice: [
    `<rect class="tk" x="14" y="24" width="72" height="62" rx="10"/>`,
    `<ellipse class="fs" cx="54" cy="64" rx="20" ry="13"/><circle class="fs" cx="40" cy="47" r="11"/><path class="ft" d="M29 47Q21 47 22 51Q24 54 30 52Z"/>` + eye(38, 45, 2.2),
    line('M22 32L30 32M70 76L78 76M74 30L80 36', '#FFFFFF', 3),
  ],
  penguin: [
    `<ellipse class="fk" cx="50" cy="56" rx="26" ry="34"/><path class="fk" d="M25 50Q12 62 18 72Q26 64 28 58Z"/><path class="fk" d="M75 50Q88 62 82 72Q74 64 72 58Z"/>`,
    `<ellipse class="fw" cx="50" cy="64" rx="17" ry="24"/><ellipse class="fw" cx="43" cy="38" rx="8" ry="9"/><ellipse class="fw" cx="57" cy="38" rx="8" ry="9"/>`,
    eye(44, 39, 2.8) + eye(56, 39, 2.8) + `<path class="fs" d="M44 46L56 46L50 54Z"/>`,
    `<ellipse class="fs" cx="40" cy="90" rx="9" ry="4"/><ellipse class="fs" cx="60" cy="90" rx="9" ry="4"/>`,
  ],
  teddy: [
    `<circle class="fn" cx="34" cy="44" r="8"/><circle class="fn" cx="66" cy="44" r="8"/><ellipse class="fn" cx="50" cy="80" rx="22" ry="16"/><circle class="fn" cx="50" cy="54" r="21"/>`,
    `<ellipse class="fs" cx="50" cy="61" rx="9" ry="7"/>` + eye(43, 51, 2.6) + eye(57, 51, 2.6) + `<ellipse class="fi" cx="50" cy="58" rx="3.2" ry="2.4"/>`,
    `<path class="ft" d="M29 42Q30 14 50 14Q70 14 71 42Z"/><rect class="fw" x="27" y="38" width="46" height="9" rx="4.5"/>`,
    `<circle class="fw" cx="50" cy="12" r="7"/>`,
  ],
  mug: [
    ring(74, 56, 15, 8, 'fk'),
    `<path class="fk" d="M20 36H72V78Q72 90 60 90H32Q20 90 20 78Z"/>`,
    `<ellipse class="fn" cx="46" cy="38" rx="24" ry="5"/>`,
    `<rect class="fw" x="30" y="56" width="32" height="7" rx="3.5"/>`,
    line('M36 26Q32 20 36 14M50 26Q46 20 50 14', '#3D86D8', 3),
  ],
  boot: [
    `<path class="fp" d="M28 18H58V58L80 62Q90 64 90 74V82H24V24Q24 18 28 18Z"/>`,
    `<rect class="fw" x="20" y="12" width="42" height="14" rx="7"/>`,
    `<rect class="fi" x="22" y="80" width="70" height="8" rx="4"/>`,
    `<circle class="fs" cx="42" cy="44" r="4"/><circle class="fs" cx="42" cy="58" r="4"/>`,
  ],
  snowman: [
    `<circle class="tk" cx="50" cy="52" r="46"/>`,
    `<circle class="fw" cx="50" cy="72" r="20"/><circle class="fw" cx="50" cy="40" r="14"/>`,
    `<rect class="fi" x="38" y="22" width="24" height="5" rx="2"/><rect class="fi" x="42" y="10" width="16" height="14" rx="2"/>`,
    eye(45, 38, 2.2) + eye(55, 38, 2.2) + `<path class="ft" d="M50 42L62 45L50 47Z"/><circle class="ft" cx="50" cy="66" r="2.6"/><circle class="ft" cx="50" cy="76" r="2.6"/>`,
    line('M31 62L18 52M69 62L82 52', '#A0522D', 3),
  ],
  snowflake: [
    `<g transform="translate(50 50)">${[0, 60, 120].map(a => `<rect class="fk" x="-4.5" y="-42" width="9" height="84" rx="4.5" transform="rotate(${a})"/>`).join('')}${[0, 60, 120, 180, 240, 300].map(a => `<g transform="rotate(${a})"><rect class="fk" x="-3.2" y="-39" width="6.4" height="17" rx="3.2" transform="rotate(42 0 -24)"/><rect class="fk" x="-3.2" y="-39" width="6.4" height="17" rx="3.2" transform="rotate(-42 0 -24)"/></g>`).join('')}<circle class="fk" r="11"/></g>`,
    `<circle class="fw" cx="50" cy="50" r="5"/>`,
  ],
  icicle: [
    `<rect class="fk" x="10" y="12" width="80" height="10" rx="5"/>`,
    `<path class="tk" d="M16 22L22 50L28 22Z"/><path class="tk" d="M32 22L38 40L44 22Z"/><path class="tk" d="M70 22L76 44L82 22Z"/>`,
    `<rect class="fp" x="56" y="36" width="6" height="40" rx="3"/><path class="fp" d="M59 36Q72 38 74 50Q66 44 59 46Z"/><ellipse class="fp" cx="50" cy="78" rx="12" ry="9" transform="rotate(-20 50 78)"/>`,
  ],
  moon: [
    `<circle class="fd" cx="50" cy="50" r="44"/>`,
    `<path class="fs" d="M52 20A30 30 0 1 0 80 58A23 23 0 1 1 52 20Z"/>`,
    star(28, 30, 7, 'fs') + star(72, 26, 5, 'fs') + star(30, 72, 4.5, 'fs'),
  ],
  flashlight: [
    `<path class="ts" d="M58 30L96 8V58Z"/>`,
    `<g transform="rotate(-30 40 60)"><rect class="fk" x="14" y="50" width="42" height="20" rx="6"/><path class="fk" d="M54 46H70V74H54Z"/><rect class="fw" x="68" y="44" width="6" height="32" rx="3"/><rect class="fi" x="28" y="56" width="8" height="8" rx="2"/></g>`,
  ],
  toast: [
    `<path class="fn" d="M18 88V44Q10 42 10 32Q10 14 32 14H68Q90 14 90 32Q90 42 82 44V88Z"/>`,
    `<path class="ts" d="M25 81V40Q18 38 18 32Q18 22 34 22H66Q82 22 82 32Q82 38 75 40V81Z"/>`,
    `<path class="fw" d="M30 44Q34 34 46 38Q58 30 66 40Q76 44 70 56Q72 68 58 66Q48 74 38 66Q26 64 30 54Z"/>`,
    `<circle class="fs" cx="44" cy="50" r="5"/><circle class="fs" cx="58" cy="54" r="5"/>`,
  ],
  bird: [
    `<rect class="fn" x="8" y="80" width="84" height="7" rx="3.5"/>`,
    `<ellipse class="ft" cx="50" cy="56" rx="26" ry="21"/><circle class="ft" cx="64" cy="40" r="13"/><path class="ft" d="M26 52L10 42L16 62Z"/>`,
    `<path class="tt" d="M34 56Q46 46 56 58Q46 68 34 56Z"/>`,
    `<path class="fs" d="M76 38L88 42L76 46Z"/>` + eye(67, 37, 2.8),
    line('M46 76L44 82M56 76L58 82', '#1D2940', 2.4),
  ],
  cushions: [
    `<rect class="fk" x="12" y="66" width="76" height="24" rx="10"/>`,
    `<rect class="fg" x="20" y="42" width="60" height="24" rx="10"/>`,
    `<rect class="fp" x="30" y="18" width="40" height="24" rx="10"/>`,
    `<circle class="fw" cx="50" cy="78" r="3"/><circle class="fw" cx="50" cy="54" r="3"/><circle class="fw" cx="50" cy="30" r="3"/>`,
  ],
  mittenfriend: [
    `<g transform="translate(-2 0)">${mittenShape('fg', 'fs').join('')}</g>`,
    `<circle class="fw" cx="46" cy="40" r="6"/><circle class="fw" cx="60" cy="40" r="6"/>` + eye(47, 41, 2.6) + eye(61, 41, 2.6) + smile(53, 52, 8, '#1D2940', 2.6),
  ],
  pot: [
    `<rect class="fk" x="8" y="44" width="16" height="8" rx="4"/><rect class="fk" x="76" y="44" width="16" height="8" rx="4"/><path class="fk" d="M18 40H82V74Q82 88 68 88H32Q18 88 18 74Z"/>`,
    `<rect class="fw" x="14" y="36" width="72" height="8" rx="4"/>`,
    `<rect class="fn" x="58" y="4" width="8" height="40" rx="4" transform="rotate(28 62 24)"/><ellipse class="fn" cx="72" cy="8" rx="8" ry="11" transform="rotate(28 72 8)"/>`,
    line('M8 24L14 30M92 24L86 30M20 14L24 22', '#EE5A36', 3),
  ],
  book: [
    `<path class="ft" d="M6 26Q28 20 50 30Q72 20 94 26V84Q72 78 50 88Q28 78 6 84Z"/>`,
    `<path class="fw" d="M12 30Q30 26 47 34V80Q30 72 12 78Z"/>`,
    `<path class="fw" d="M88 30Q70 26 53 34V80Q70 72 88 78Z"/>`,
    line('M18 42Q30 40 40 45M18 52Q30 50 40 55M18 62Q30 60 40 65M60 45Q70 40 82 42M60 55Q70 50 82 52', '#B9C1D0', 2.4),
  ],
  footprints: [
    `<g transform="rotate(-12 32 64)"><ellipse class="fp" cx="32" cy="70" rx="11" ry="17"/>${[[-9, -21, 4.2], [-3, -24, 4.4], [3, -24, 4], [8, -21, 3.6], [12, -16, 3.2]].map(([x, y, r]) => `<circle class="fp" cx="${32 + x}" cy="${70 + y}" r="${r}"/>`).join('')}</g>`,
    `<g transform="rotate(12 68 36)"><ellipse class="fk" cx="68" cy="42" rx="11" ry="17"/>${[[9, -21, 4.2], [3, -24, 4.4], [-3, -24, 4], [-8, -21, 3.6], [-12, -16, 3.2]].map(([x, y, r]) => `<circle class="fk" cx="${68 + x}" cy="${42 + y}" r="${r}"/>`).join('')}</g>`,
  ],
  hatsun: [
    `<path class="ft" d="M8 66Q8 30 34 30Q58 30 58 66Z"/><rect class="fw" x="4" y="62" width="58" height="12" rx="6"/>`,
    `<circle class="fw" cx="33" cy="26" r="8"/>`,
    `<ellipse class="fs" cx="74" cy="80" rx="18" ry="8"/>`,
    `<rect class="fg" x="62" y="70" width="24" height="6" rx="3"/><rect class="fg" x="70" y="62" width="6" height="14" rx="3"/>`,
    star(80, 30, 12, 'fs'),
  ],
  hide: [
    star(66, 34, 20, 'fs'),
    `<rect class="fp" x="10" y="44" width="80" height="40" rx="14"/>`,
    `<circle class="fw" cx="50" cy="64" r="4"/>`,
    eye(62, 32, 2.6) + eye(71, 32, 2.6),
  ],
  star: [
    star(50, 54, 36, 'fs'),
    star(16, 20, 9, 'ft') + star(86, 22, 7, 'fk') + star(84, 84, 6, 'fg'),
    eye(43, 52, 3) + eye(57, 52, 3) + smile(50, 60, 7, '#1D2940', 2.6),
  ],
  // ---------------- play coupons and gift cards ----------------
  tent: [
    `<path class="fp" d="M8 88L50 16L92 88Z"/>`,
    `<path class="fw" d="M34 88L50 54L66 88Z"/>`,
    `<rect class="fn" x="48" y="6" width="4" height="16" rx="2"/><path class="ft" d="M52 6L66 11L52 16Z"/>`,
  ],
  notes: [
    `<rect class="fp" x="34" y="18" width="7" height="54" rx="3.5"/><ellipse class="fp" cx="28" cy="74" rx="13" ry="10" transform="rotate(-20 28 74)"/>`,
    `<rect class="fk" x="70" y="12" width="7" height="48" rx="3.5"/><ellipse class="fk" cx="64" cy="62" rx="13" ry="10" transform="rotate(-20 64 62)"/>`,
    `<path class="fp" d="M34 18L77 12V24L41 30Z"/>`,
  ],
  pancakes: [
    `<ellipse class="fs" cx="50" cy="80" rx="36" ry="10"/><ellipse class="fs" cx="50" cy="66" rx="34" ry="10"/><ellipse class="fs" cx="50" cy="52" rx="32" ry="10"/>`,
    `<path class="fn" d="M20 50Q30 60 50 60Q70 60 80 50Q78 44 50 44Q22 44 20 50Z"/>`,
    `<rect class="fw" x="42" y="36" width="16" height="10" rx="3"/>`,
  ],
  tree: [
    `<rect class="fn" x="44" y="56" width="12" height="34" rx="4"/>`,
    `<circle class="fg" cx="50" cy="34" r="22"/><circle class="fg" cx="32" cy="50" r="16"/><circle class="fg" cx="68" cy="50" r="16"/>`,
    `<circle class="fw" cx="42" cy="32" r="4"/><circle class="fw" cx="60" cy="44" r="4"/>`,
  ],
  blocks: [
    `<rect class="ft" x="14" y="62" width="30" height="30" rx="5"/><circle class="fw" cx="29" cy="77" r="7"/>`,
    `<rect class="fk" x="50" y="62" width="30" height="30" rx="5"/><path class="fw" d="M65 69L73 84H57Z"/>`,
    `<rect class="fg" x="32" y="30" width="30" height="30" rx="5"/><rect class="fw" x="40" y="38" width="14" height="14" rx="2"/>`,
    `<rect class="fs" x="38" y="2" width="26" height="26" rx="5"/>` + star(51, 15, 7, 'fw'),
  ],
  bubbles: [
    `<circle class="tk" cx="38" cy="58" r="26"/>` + line('M24 50A16 16 0 0 1 32 40', '#FFFFFF', 4),
    `<circle class="tk" cx="72" cy="30" r="16"/>` + line('M64 26A9 9 0 0 1 69 20', '#FFFFFF', 3.4),
    `<circle class="tk" cx="76" cy="72" r="10"/>`,
  ],
  sockfriend: [
    `<path class="fk" d="M30 12H62V60Q62 70 72 72L80 74Q92 78 88 88Q86 94 76 92L46 86Q30 82 30 66Z"/>`,
    `<rect class="fw" x="28" y="8" width="36" height="12" rx="4"/>`,
    `<circle class="fw" cx="40" cy="40" r="6"/><circle class="fw" cx="54" cy="40" r="6"/>` + eye(41, 41, 2.6) + eye(55, 41, 2.6) + smile(47, 54, 7, '#1D2940', 2.6),
  ],
  basket: [
    `<path class="fn" d="M26 44Q26 12 50 12Q74 12 74 44H66Q66 20 50 20Q34 20 34 44Z"/>`,
    `<path class="fs" d="M12 44H88L80 86Q79 92 72 92H28Q21 92 20 86Z"/>`,
    `<rect class="fn" x="12" y="40" width="76" height="10" rx="5"/>`,
    `<rect class="ft" x="26" y="58" width="48" height="6" rx="3"/><rect class="ft" x="30" y="72" width="40" height="6" rx="3"/>`,
  ],
  brush: [
    `<circle class="fk" cx="26" cy="30" r="11"/><circle class="fs" cx="74" cy="26" r="9"/><circle class="fg" cx="24" cy="74" r="8"/>`,
    `<g transform="rotate(40 56 58)"><rect class="fn" x="50" y="36" width="12" height="50" rx="6"/><rect class="fx" x="48" y="26" width="16" height="12" rx="2"/><path class="ft" d="M48 26Q48 8 56 4Q64 8 64 26Z"/></g>`,
  ],
  cookie: [
    `<circle class="fs" cx="50" cy="52" r="38"/>`,
    `<circle class="fn" cx="36" cy="40" r="5"/><circle class="fn" cx="60" cy="34" r="4.5"/><circle class="fn" cx="64" cy="60" r="5"/><circle class="fn" cx="40" cy="66" r="4.5"/><circle class="fn" cx="52" cy="50" r="3.5"/>`,
  ],
  ball: [
    `<circle class="fs" cx="50" cy="50" r="42"/><path class="ft" d="M50 50L50 8A42 42 0 0 1 86.4 71Z"/><path class="fk" d="M50 50L13.6 71A42 42 0 0 1 13.6 29Z"/><circle class="fw" cx="50" cy="50" r="9"/>`,
  ],
  boxcar: [
    `<rect class="fn" x="10" y="30" width="80" height="46" rx="4"/>`,
    `<path class="ts" d="M10 30L26 18H74L90 30Z"/>`,
    `<rect class="fw" x="22" y="40" width="24" height="18" rx="3"/><rect class="fw" x="54" y="40" width="24" height="18" rx="3"/>`,
    `<circle class="fi" cx="28" cy="80" r="11"/><circle class="fi" cx="72" cy="80" r="11"/><circle class="fw" cx="28" cy="80" r="4"/><circle class="fw" cx="72" cy="80" r="4"/>`,
  ],
  face: [
    `<circle class="fs" cx="50" cy="52" r="40"/>`,
    `<circle class="fw" cx="36" cy="42" r="9"/><circle class="fw" cx="64" cy="42" r="9"/>` + eye(38, 44, 4) + eye(62, 40, 4),
    `<path class="fi" d="M32 62Q50 84 68 62Z"/><path class="ft" d="M44 70Q50 84 56 70Z"/>`,
  ],
  map: [
    `<path class="ts" d="M10 20L36 12L64 20L90 12V80L64 88L36 80L10 88Z"/>`,
    `<path class="fs" d="M36 12V80L64 88V20Z"/>`,
    line('M18 70Q30 52 44 60Q56 66 60 46', '#EE5A36', 3) + line('M66 30L78 42M78 30L66 42', '#EE5A36', 5),
  ],
  hat: [
    `<ellipse class="fp" cx="50" cy="70" rx="44" ry="12"/>`,
    `<path class="fp" d="M24 68Q24 26 50 26Q76 26 76 68Z"/>`,
    `<rect class="ft" x="24" y="54" width="52" height="10" rx="3"/>`,
    `<path class="fg" d="M70 54Q92 30 84 14Q72 30 68 52Z"/>`,
  ],
  bowl: [
    `<g transform="rotate(-30 70 30)"><rect class="fn" x="64" y="4" width="10" height="56" rx="5"/><ellipse class="fn" cx="69" cy="8" rx="11" ry="13"/></g>`,
    `<path class="fk" d="M8 50H92Q92 90 50 90Q8 90 8 50Z"/>`,
    `<rect class="fw" x="6" y="46" width="88" height="8" rx="4"/>`,
  ],
  pour: [
    `<g transform="rotate(-40 36 36)"><path class="fk" d="M20 16H52L48 60Q47 64 43 64H29Q25 64 24 60Z"/></g>`,
    `<circle class="tk" cx="58" cy="52" r="4"/><circle class="tk" cx="62" cy="64" r="4.5"/><circle class="tk" cx="60" cy="76" r="4"/>`,
    `<path class="fg" d="M36 78H90Q90 94 63 94Q36 94 36 78Z"/>`,
  ],
  gift: [
    `<rect class="ft" x="14" y="42" width="72" height="50" rx="5"/>`,
    `<rect class="ft" x="8" y="30" width="84" height="16" rx="4"/>`,
    `<rect class="fs" x="44" y="30" width="12" height="62"/>`,
    `<path class="fs" d="M50 30Q30 6 22 16Q18 28 50 30Z"/><path class="fs" d="M50 30Q70 6 78 16Q82 28 50 30Z"/>`,
  ],
  heart: [
    `<path class="ft" d="M50 88C44 82 10 62 10 38C10 24 20 14 32 14C40 14 46 18 50 26C54 18 60 14 68 14C80 14 90 24 90 38C90 62 56 82 50 88Z"/>`,
    `<circle class="fw" cx="32" cy="34" r="6"/>`,
  ],
  towel: [
    `<rect class="fsk" x="24" y="20" width="52" height="52" rx="26"/>`,
    eye(40, 44, 3.4) + eye(60, 44, 3.4) + `<ellipse class="fi" cx="50" cy="58" rx="5" ry="6"/>`,
    `<path class="fg" d="M6 74Q8 64 18 64H82Q92 64 94 74L96 94H4Z"/>`,
    `<rect class="fw" x="10" y="80" width="80" height="5" rx="2.5"/>`,
  ],
  socks: [
    `<path class="fs" d="M12 46H88L80 88Q79 93 73 93H27Q21 93 20 88Z"/>`,
    `<path class="fp" d="M26 8H44V40Q44 46 50 48L58 50Q66 54 62 62Q60 66 54 64L34 58Q26 56 26 46Z"/>`,
    `<path class="fk" d="M60 18H76V44Q76 50 82 52L86 54Q92 58 88 64Q86 67 80 65L66 60Q60 58 60 50Z"/>`,
    `<rect class="fn" x="12" y="42" width="76" height="10" rx="5"/>`,
  ],
  // ---------------- bundle parts ----------------
  binder: [
    `<rect class="fp" x="18" y="10" width="64" height="82" rx="6"/>`,
    `<rect class="fw" x="30" y="18" width="46" height="66" rx="3"/>`,
    `<circle class="fs" cx="44" cy="36" r="6"/><rect class="ft" x="54" y="30" width="12" height="12" rx="2"/><circle class="fg" cx="44" cy="62" r="6"/><path class="fk" d="M60 56L67 68H53Z"/>`,
    `<rect class="fi" x="12" y="24" width="12" height="6" rx="3"/><rect class="fi" x="12" y="48" width="12" height="6" rx="3"/><rect class="fi" x="12" y="72" width="12" height="6" rx="3"/>`,
  ],
  cards: [
    `<rect class="fk" x="12" y="22" width="40" height="58" rx="6" transform="rotate(-16 32 51)"/>`,
    `<rect class="fs" x="30" y="16" width="40" height="58" rx="6"/>`,
    `<rect class="ft" x="48" y="22" width="40" height="58" rx="6" transform="rotate(16 68 51)"/>`,
    `<circle class="fw" cx="50" cy="38" r="9"/><rect class="fw" x="36" y="54" width="28" height="4" rx="2"/><rect class="fw" x="36" y="62" width="20" height="4" rx="2"/>`,
  ],
  checklist: [
    `<rect class="fg" x="16" y="12" width="68" height="82" rx="8"/>`,
    `<rect class="fw" x="24" y="22" width="52" height="64" rx="4"/>`,
    `<rect class="fs" x="38" y="6" width="24" height="12" rx="4"/>`,
    line('M31 38L35 42L42 34M31 56L35 60L42 52M31 74L35 78L42 70', '#2FA36B', 3) + `<rect class="tg" x="48" y="35" width="22" height="5" rx="2.5"/><rect class="tg" x="48" y="53" width="22" height="5" rx="2.5"/><rect class="tg" x="48" y="71" width="22" height="5" rx="2.5"/>`,
  ],
  talkcard: [
    `<rect class="fs" x="20" y="10" width="60" height="82" rx="8"/>`,
    `<path class="fw" d="M32 26H68Q74 26 74 32V50Q74 56 68 56H48L38 64V56H32Q26 56 26 50V32Q26 26 32 26Z"/>`,
    `<circle class="ft" cx="38" cy="41" r="4"/><circle class="ft" cx="50" cy="41" r="4"/><circle class="ft" cx="62" cy="41" r="4"/>`,
    `<rect class="fw" x="30" y="70" width="40" height="5" rx="2.5"/><rect class="fw" x="30" y="79" width="28" height="5" rx="2.5"/>`,
  ],
  routine: [
    `<rect class="fk" x="6" y="20" width="88" height="60" rx="8"/>`,
    `<rect class="fw" x="13" y="28" width="22" height="44" rx="4"/><rect class="fw" x="39" y="28" width="22" height="44" rx="4"/><rect class="fw" x="65" y="28" width="22" height="44" rx="4"/>`,
    `<circle class="fs" cx="24" cy="50" r="7"/><path class="fg" d="M42 54Q50 40 58 54Z"/><rect class="fg" x="42" y="54" width="16" height="4" rx="2"/><path class="fp" d="M78 42A8 8 0 1 0 84 54A6 6 0 1 1 78 42Z"/>`,
  ],
  book100: [
    `<rect class="fk" x="18" y="8" width="64" height="84" rx="6"/>`,
    `<rect class="fi" x="18" y="8" width="10" height="84" rx="4"/>`,
    `<rect class="fw" x="36" y="22" width="36" height="46" rx="4"/>`,
    star(54, 45, 13, 'fs'),
  ],
};

module.exports = { I, star };
