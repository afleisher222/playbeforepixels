// Shared pieces for The Add-One Chain kit, slides, cover and mockup.
const fs = require('fs'); const path = require('path');
const A = require('../story-bonus/build/art.js');
const { C, R, Ci, E, P, L, G, TX } = A;
// Product name in one place (brand/ORIGINALITY.md A12, Sep 29, 2026; the earlier name is retired). The new name
// is unsearched: it still needs trademark counsel's clearance (listing.json human_todo).
// NAME is the full title; SHORT reads inside a sentence ("our Add-One Chain").
const NAME = 'The Add-One Chain';
const SHORT = 'Add-One Chain';
// Printed in every PDF footer (BRAND.md customer-voice rule 3). Bump it for every re-issue and tell past buyers.
const VERSION = 'Version 1.0 · September 2026';
const BLOCK = {
  q: { label: 'ASK', word: 'Ask', col: C.sky, dark: C.sky, ink: '#fff', tint: C.tSky, kid: 'I asked a question.', fs: 46, short: 'a question to a friend' },
  j: { label: 'COMMENT', word: 'Comment', col: C.sun, dark: C.ink, ink: C.ink, tint: C.tSun, kid: 'I said something back.', fs: 33, short: 'something back to a friend' },
  i: { label: 'ADD ONE', word: 'Add one', col: C.grass, dark: C.grass, ink: '#fff', tint: C.tGrass, kid: 'I added one more idea.', fs: 34, short: 'more idea to what a friend said' },
  l: { label: 'LISTEN', word: 'Listen', col: C.plum, dark: C.plum, ink: '#fff', tint: C.tPlum, kid: 'I listened to a friend.', fs: 39, short: 'and show you heard, your way' },
};
function ear(col) {
  return L('M40 46 C34 45 33 38 36 33 C39 28 37 22 40 18 C44 12 56 10 61 18 C65 24 63 30 58 35 C55 38 54 41 54 45 C54 51 47 54 43 50', col, 6.5) + L('M47 30 C47 24 55 23 55 29', col, 5);
}
// Glyphs drawn in the story's 96 x 64 link space, without the link background.
function glyphInner(t, onWhite = false) {
  const fg = onWhite ? BLOCK[t].col : (t === 'j' ? C.ink : C.paper);
  switch (t) {
    case 'q': return TX(48, 50, '?', 50, fg);
    case 'j': { const f = onWhite ? C.ink : C.ink; return Ci(37, 25, 5.5, f) + Ci(59, 25, 5.5, f) + P('M29 34 Q48 38 67 34 Q64 54 48 54 Q32 54 29 34Z', f); }
    case 'i': return Ci(48, 26, 15, fg) + R(40.5, 37, 15, 12, fg, 3) + R(42.5, 50, 11, 4.5, fg, 2) + L('M24 16 L18 12', fg, 4.5) + L('M72 16 L78 12', fg, 4.5) + L('M48 5 L48 1', fg, 0);
    case 'l': return ear(fg);
  }
  return '';
}
const glyph = (t, size, onWhite = false) => `<svg class="glyph" viewBox="16 0 64 60" width="${size}" height="${(size * 60 / 64).toFixed(1)}" xmlns="http://www.w3.org/2000/svg">${glyphInner(t, onWhite)}</svg>`;

function topicIcon(ic) {
  switch (ic) {
    case 'fish': return G('translate(-8 4) scale(1.4)', '<use href="#fish"/>') + Ci(34, -30, 5, C.sky) + Ci(42, -44, 4, C.sky);
    case 'food': return Ci(-18, 10, 30, C.tomato) + P('M-18 -18 Q-6 -34 8 -26 Q-4 -14 -18 -18Z', C.grass) + L('M-18 -18 L-20 -30', C.ink, 4) + Ci(-28, 2, 6, '#fff', 'fill-opacity=".5"') + G('translate(24 20) scale(.8) rotate(-20)', '<use href="#banana"/>');
    case 'weather': {
      let rays = ''; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; rays += L(`M${-12 + 34 * Math.cos(a)} ${-14 + 34 * Math.sin(a)} L${-12 + 44 * Math.cos(a)} ${-14 + 44 * Math.sin(a)}`, C.sun, 6); }
      return G('translate(-6 0)', rays + Ci(-12, -14, 26, C.sun) + Ci(6, 24, 18, C.sky) + Ci(28, 14, 24, C.sky) + R(-10, 22, 66, 26, C.sky, 13));
    }
    case 'ball': return Ci(0, 0, 48, C.tomato) + L('M-46 -12 Q0 6 46 -12', '#fff', 7) + L('M-40 24 Q0 40 40 24', '#fff', 7) + L('M-6 -47 Q14 0 -6 47', C.sun, 7);
    case 'book': return P('M0 -26 Q-26 -40 -52 -32 V34 Q-26 26 0 40Z', C.sky) + P('M0 -26 Q26 -40 52 -32 V34 Q26 26 0 40Z', C.plum) + P('M-4 -22 Q-24 -32 -44 -28 V26 Q-24 20 -4 32Z', '#fff') + P('M4 -22 Q24 -32 44 -28 V26 Q24 20 4 32Z', '#fff') + L('M-36 -14 Q-24 -18 -12 -12', C.ink, 3) + L('M-36 0 Q-24 -4 -12 2', C.ink, 3) + L('M12 -12 Q24 -18 36 -14', C.ink, 3) + L('M12 2 Q24 -4 36 0', C.ink, 3);
    case 'home': return R(-38, -6, 76, 56, C.sun, 4) + P('M-50 -2 L0 -46 L50 -2Z', C.tomato) + R(-10, 16, 22, 34, C.ink, 4) + R(20, 6, 16, 16, '#fff', 3) + R(-32, 6, 16, 16, '#fff', 3);
    case 'tree': return R(-7, 8, 14, 44, C.ink, 4) + Ci(-20, -4, 24, C.grass) + Ci(20, -4, 24, C.grass) + Ci(0, -26, 28, C.grass) + Ci(10, -18, 5, C.tomato) + Ci(-14, 2, 5, C.tomato);
    case 'music': return E(-26, 30, 16, 12, C.plum, 'transform="rotate(-20 -26 30)"') + E(26, 20, 16, 12, C.plum, 'transform="rotate(-20 26 20)"') + R(-14, -34, 7, 64, C.plum) + R(38, -44, 7, 64, C.plum) + P('M-14 -34 L45 -44 L45 -28 L-14 -18Z', C.plum);
    case 'friends': return A.kid('priya', 'stand', -26, -20, 0.36, 'smile') + A.kid('leo', 'stand', 28, -20, 0.36, 'laugh', true);
  }
  return Ci(0, 0, 40, C.wash);
}
const QR = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../qr.json'), 'utf8'));
const qrSvg = (px, col = C.ink) => `<svg class="qr" viewBox="-2 -2 ${QR.n + 4} ${QR.n + 4}" width="${px}" height="${px}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg"><rect x="-2" y="-2" width="${QR.n + 4}" height="${QR.n + 4}" fill="#fff"/><path d="${QR.d}" fill="${col}"/></svg>`;
const LOGO = (file, h) => `<img class="logo" src="%BR%logo/${file}" alt="Play Before Pixels" style="height:${h}px">`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
module.exports = { NAME, SHORT, VERSION, BLOCK, glyph, glyphInner, topicIcon, qrSvg, LOGO, esc, QR };
