const B = require('./base.js'); const { A, NEW_SYMBOLS } = require('./art.js');
const ids = process.argv.slice(2);
const DEFS = `<svg class="defs" width="0" height="0" style="position:absolute"><defs>${B.SYMBOLS.join('')}${NEW_SYMBOLS.join('')}</defs></svg>`;
const low = process.env.LOW === '1';
const css = `.sk{fill:var(--sk)} .hr{fill:var(--hr)} .sh{fill:var(--sh)} .pa{fill:var(--pa)} .so{fill:var(--so)} .hw{fill:var(--hw)} .ck{fill:#EE5A36;opacity:.28} symbol{overflow:visible}
body{font-family:sans-serif;display:flex;flex-wrap:wrap;gap:8px;width:1100px} div{width:120px;font-size:11px;text-align:center} svg.a{width:120px;height:100px;background:#F3F6FB}
${low ? `svg.a *,.defs *{fill:#fff!important;stroke:#1D2940!important;stroke-width:1.3px!important;vector-effect:non-scaling-stroke} svg.a [fill="#1D2940"],.defs [fill="#1D2940"]{fill:#1D2940!important} .ck{display:none} svg.a{background:#fff}` : ''}`;
console.log(`<!doctype html><html><head><style>${css}</style></head><body>${DEFS}${ids.map(i => `<div><svg class="a" viewBox="0 0 120 100">${A[i]()}</svg>${i}</div>`).join('')}</body></html>`);
