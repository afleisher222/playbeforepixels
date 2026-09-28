// Card + shared CSS for Visual Routine Cards
const B = require('./base.js');
const { A, NEW_SYMBOLS } = require('./art.js');
const { CAT } = require('./cards.js');
const { C } = B;

const COLORWAYS = [
  { id: 'rainbow', name: 'Rainbow', note: 'Color-coded by routine' },
  { id: 'soft', name: 'Soft', note: 'Gentle tinted cards' },
  { id: 'navy', name: 'Navy', note: 'Bold navy frames' },
  { id: 'simple', name: 'Simple', note: 'White cards, line art' },
];

const DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${B.SYMBOLS.join('')}${NEW_SYMBOLS.join('')}</defs></svg>`;

function labelSize(label) {
  const n = label.length;
  if (n <= 10) return 18;
  if (n <= 13) return 16.5;
  if (n <= 16) return 15;
  if (n <= 19) return 13.5;
  return 13; // wraps to two lines
}
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

// card: {id, cat, art, label}; opts: {blankLabel, blankArt, field}
function card(cd, cw, opts = {}) {
  const cat = CAT[cd.cat];
  const style = `--c:${cat.c};--t:${cat.t};--on:${cat.on}`;
  const art = opts.photo ? `<rect x="8" y="4" width="104" height="92" rx="6" fill="#FFFFFF" stroke="#9AA6BA" stroke-width="1.3" stroke-dasharray="4 3"/><path d="M42 62l12-14 9 10 7-7 12 11z" fill="#C9D2E0"/><circle cx="74" cy="38" r="5" fill="#C9D2E0"/><text x="60" y="78" text-anchor="middle" font-family="Nunito Sans, sans-serif" font-size="7.5" font-weight="700" fill="#8C97AB">glue a photo here</text><text x="60" y="88" text-anchor="middle" font-family="Nunito Sans, sans-serif" font-size="6.5" font-weight="700" fill="#8C97AB">1.6 × 1.4 in · 4 × 3.5 cm</text>`
    : opts.blankArt ? `<circle cx="60" cy="52" r="42" fill="none" stroke="#B8C2D3" stroke-width="1.4" stroke-dasharray="4 4"/><text x="60" y="50" text-anchor="middle" font-family="Nunito Sans, sans-serif" font-size="7.5" font-weight="700" fill="#8C97AB">draw it, or</text><text x="60" y="60" text-anchor="middle" font-family="Nunito Sans, sans-serif" font-size="7.5" font-weight="700" fill="#8C97AB">glue a photo</text>`
    : `<circle class="disc" cx="60" cy="52" r="44"/>${A[cd.art]()}`;
  const lab = opts.blankLabel ? `<div class="lab blank"${opts.field ? ` data-field="${opts.field}" data-fsize="15"` : ''}></div>`
    : `<div class="lab" style="font-size:${labelSize(cd.label)}px">${esc(cd.label)}</div>`;
  return `<div class="card cw-${cw}" data-card="${cd.id}" style="${style}"><svg class="art" viewBox="0 0 120 100" aria-hidden="true">${art}</svg>${lab}</div>`;
}

const CSS = `
:root{--ink:${C.ink};--wash:${C.wash}}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;color:${C.ink};font-family:"Nunito Sans","Helvetica Neue",Arial,sans-serif}
symbol{overflow:visible}
.sk{fill:var(--sk)} .hr{fill:var(--hr)} .sh{fill:var(--sh)} .pa{fill:var(--pa)} .so{fill:var(--so)} .hw{fill:var(--hw)} .ck{fill:${C.tomato};opacity:.28}
/* ---- card ---- */
.card{width:2.2in;height:2.2in;border-radius:.17in;position:relative;overflow:hidden;background:#fff;flex:0 0 auto;break-inside:avoid}
.card .art{position:absolute;left:.07in;right:.07in;top:.07in;height:1.56in;width:calc(100% - .14in);display:block}
.card .lab{position:absolute;left:0;right:0;bottom:0;height:.52in;display:flex;align-items:center;justify-content:center;text-align:center;padding:0 .1in .02in;font-family:"Fredoka","Nunito Sans",sans-serif;font-weight:600;line-height:1.02;letter-spacing:.005em}
.card .lab.blank::after{content:"";position:absolute;left:.26in;right:.26in;bottom:.15in;border-bottom:1.5px solid currentColor;opacity:.35}
.card .disc{fill:var(--t)}
.cw-rainbow{border:.075in solid var(--c);background:var(--c)}
.cw-rainbow .art,.cw-navy .art{left:0;right:0;top:0;width:100%;height:1.6in;background:#fff;border-radius:.095in .095in 0 0}
.cw-rainbow .lab{background:var(--c);color:var(--on);height:.47in}
.cw-rainbow .lab.blank{background:#fff;color:${C.ink};border-radius:0 0 .095in .095in}
.cw-soft{background:var(--t)}
.cw-soft .disc{fill:#fff}
.cw-soft .lab{color:${C.ink}}
.cw-navy{border:.075in solid ${C.ink};background:${C.ink}}
.cw-navy .lab{background:${C.ink};color:#fff;height:.47in}
.cw-navy .lab.blank{background:#fff;color:${C.ink};border-radius:0 0 .095in .095in}
.cw-simple{border:.02in solid ${C.ink}}
.cw-simple .disc{fill:none}
.cw-simple .lab{color:${C.ink}}
`;

module.exports = { card, CSS, DEFS, COLORWAYS, labelSize, esc };
