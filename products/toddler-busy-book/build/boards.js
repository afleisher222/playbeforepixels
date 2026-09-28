// Board-drawing helpers. Every board is drawn in a 672 x 516 px box (1 px = 1/96 in), so slot sizes are real sizes.
const { C, BB, use } = require('./lib.js');
const { CELL, BIG, INNER } = require('./core.js');

const W = INNER.w, H = INNER.h;
const F = 'Fredoka, Nunito Sans, sans-serif';
const T = (x, y, s, size = 20, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" font-family="${o.f || F}" font-weight="${o.w || 600}" font-size="${size}" fill="${o.c || C.ink}"${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${s}</text>`;
const U = (id, x, y, s = 1, ex = '') => use(id, x, y, s, ex);
const rr = (x, y, w, h, r, f, ex = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" ${ex}/>`;
const tint = (x, y, w, h, r, f) => `<rect class="tint" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}"/>`;
// dashed "place a piece here" outline at exact piece size
const slot = (x, y, cell, inner = '', o = {}) => `<g transform="translate(${x},${y})"><rect class="tint" x="3" y="3" width="${cell.w - 6}" height="${cell.h - 6}" rx="14" fill="${o.fill || '#FFFFFF'}"/><rect x="3" y="3" width="${cell.w - 6}" height="${cell.h - 6}" rx="14" fill="none" stroke="${o.stroke || '#9AA6BC'}" stroke-width="2" stroke-dasharray="7 6"/>${inner}</g>`;

// silhouettes: an ink "shadow" of any symbol (vector, built from the symbol source)
const { ARTDEFS } = require('./lib.js');
const silCache = {};
function silDef(id) {
  if (silCache[id] !== undefined) return;
  const m = ARTDEFS.match(new RegExp(`<symbol id="${id}"[^>]*>([\\s\\S]*?)</symbol>`));
  if (!m) throw new Error('no symbol ' + id);
  silCache[id] = '';
  let body = m[1]
    .replace(/<(path|rect|circle|ellipse)[^>]*\sopacity="[^"]*"[^>]*\/>/g, '')
    .replace(/fill="(?!none)[^"]*"/g, `fill="${C.ink}"`).replace(/stroke="(?!none)[^"]*"/g, `stroke="${C.ink}"`)
    .replace(/style="[^"]*"/g, '');
  body = body.replace(/href="#([^"]+)"/g, (_, x) => { silDef(x); return `href="#sil-${x}"`; });
  silCache[id] = `<symbol id="sil-${id}" overflow="visible">${body}</symbol>`;
}
const SIL = (id, x, y, s = 1) => { silDef(id); return `<g class="sil" opacity=".78">${U('sil-' + id, x, y, s)}</g>`; };
const silDefs = () => Object.values(silCache).join('');

// lay out a grid of equal cells centred in the board box
function gridPos(n, cols, cell, gapX = 12, gapY = 12, top = null, boxH = H) {
  const rows = Math.ceil(n / cols);
  const gw = cols * cell.w + (cols - 1) * gapX, gh = rows * cell.h + (rows - 1) * gapY;
  const x0 = (W - gw) / 2, y0 = top === null ? (boxH - gh) / 2 : top;
  return Array.from({ length: n }, (_, i) => [x0 + (i % cols) * (cell.w + gapX), y0 + Math.floor(i / cols) * (cell.h + gapY)]);
}

// ---------- characters (same cast as the board book) ----------
function kidAt(k, x, floor, s, o = {}) { return BB.kid(Object.assign({}, BB.KIDS[k], { x, y: floor - 27 * s, s }, o)); }
function adultAt(a, x, floor, s, o = {}) { return BB.adult(Object.assign({}, BB.ADULTS[a], { x, y: floor - 81 * s, s }, o)); }
// a big friendly head (for feelings and "where's your nose?")
function head(k, x, y, s, face = 'smile') {
  const K = typeof k === 'object' ? k : (BB.KIDS[k] || BB.ADULTS[k]);
  const hb = K.hs === 'bob' ? '<use href="#hb-bob"/>' : K.hs === 'long' ? '<use href="#hb-long"/>' : '';
  // sad: brows lift at the middle, a tear, a frown. mad: brows dip at the middle, a flat tight mouth.
  // (the old sad face had brows dipping at the middle, which reads as angry)
  const eyes = `<circle cx="-8.5" cy="-1" r="3.9" fill="#FFFFFF"/><circle cx="-8.5" cy="-0.3" r="3.1" fill="${C.ink}"/><circle cx="8.5" cy="-1" r="3.9" fill="#FFFFFF"/><circle cx="8.5" cy="-0.3" r="3.1" fill="${C.ink}"/><circle class="ck" cx="-14.5" cy="7.5" r="4.3"/><circle class="ck" cx="14.5" cy="7.5" r="4.3"/>`;
  const faceSvg = face === 'sad'
    ? `${eyes}<path d="M-13.5-7.5L-5-10.5M13.5-7.5L5-10.5" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/><path d="M-6 13Q0 7.5 6 13" stroke="${C.ink}" stroke-width="2.7" fill="none" stroke-linecap="round"/><path d="M-9.5 4.5C-7 8.5-7 11-9.5 11C-12 11-12 8.5-9.5 4.5Z" fill="${C.sky}"/>`
    : face === 'mad'
      ? `${eyes}<path d="M-14-10.5L-4.5-6M14-10.5L4.5-6" stroke="${C.ink}" stroke-width="2.6" stroke-linecap="round"/><path d="M-6 12Q0 9.5 6 12" stroke="${C.ink}" stroke-width="2.7" fill="none" stroke-linecap="round"/>`
      : `<use href="#face-${face}"/>`;
  return `<g style="--sk:${K.skin};--hr:${K.hair};--hw:${K.hw || C.sun}" transform="translate(${x},${y}) scale(${s})">${hb}<use href="#t-head"/>${faceSvg}${K.hs === 'none' ? '' : `<use href="#h-${K.hs}"/>`}</g>`;
}

module.exports = { W, H, T, U, rr, tint, slot, SIL, silDefs, gridPos, kidAt, adultAt, head, CELL, BIG, C, BB };
