// Builds every HTML source for the Toddler Busy Book.
//   node build/build.js            -> source.html (Color, US Letter, website edition) + build/html/*.html (all editions)
// Editions: {color, lowink} x {letter, a4} x {site, etsy}. Etsy editions carry no URL or QR (marketplace rule).
const fs = require('fs');
const path = require('path');
const core = require('./core.js');
const { htmlDoc, REL, BANDS } = core;
const { b1, b2 } = require('./acts-young.js');
const { b3 } = require('./acts-old.js');
const { activityPage, sheetPage } = require('./pages.js');
const { silDefs } = require('./boards.js');
const { defs } = require('./extra-defs.js');
const extra = require('./extra-pages.js');

const ROOT = path.resolve(__dirname, '..');
const ACTS = [...b1, ...b2, ...b3];
const ids = new Set(); ACTS.forEach(a => { if (ids.has(a.id)) throw new Error('duplicate id ' + a.id); ids.add(a.id); });

// ---------- page plan ----------
function plan() {
  const seq = [];
  extra.front.forEach(f => seq.push({ type: 'extra', f }));
  extra.coversSection.forEach(f => seq.push({ type: 'extra', f }));
  for (const [band, list] of [['b1', b1], ['b2', b2], ['b3', b3]]) {
    seq.push({ type: 'extra', f: extra.divider(band, list) });
    list.forEach(a => { seq.push({ type: 'act', a }); if (a.pieces) seq.push({ type: 'sheet', a }); });
  }
  extra.back.forEach(f => seq.push({ type: 'extra', f }));
  const ctx = { actPage: {}, sheetPage: {}, usedBy: {}, pages: seq.length, acts: ACTS };
  seq.forEach((s, i) => { if (s.type === 'act') ctx.actPage[s.a.id] = i + 1; if (s.type === 'sheet') ctx.sheetPage[s.a.id] = i + 1; if (s.type === 'extra' && s.f.id) ctx.actPage['x-' + s.f.id] = i + 1; });
  ACTS.forEach(a => { if (a.usesPiecesOf) ctx.sheetPage[a.id] = ctx.sheetPage[a.usesPiecesOf]; });
  ACTS.forEach(a => { if (a.pieces) ctx.usedBy[a.id] = ACTS.filter(b => b.id === a.id || b.usesPiecesOf === a.id).map(b => ctx.actPage[b.id]).sort((x, y) => x - y); });
  return { seq, ctx };
}

function render(opts) {
  const { seq, ctx } = plan();
  Object.assign(ctx, opts);
  const body = seq.map((s, i) => {
    const pn = i + 1;
    if (s.type === 'act') return activityPage(s.a, ctx, pn);
    if (s.type === 'sheet') return sheetPage(s.a, ctx, pn);
    return s.f.html(ctx, pn);
  }).join('\n');
  const title = `Toddler Busy Book — ${opts.lowink ? 'Low-ink' : 'Color'} — ${opts.size === 'a4' ? 'A4' : 'US Letter'}${opts.etsy ? ' — Etsy edition' : ''}`;
  return { html: htmlDoc({ title, rel: opts.rel, size: opts.size, lowink: opts.lowink, etsy: opts.etsy, body, extraCss: extra.EXTRA_CSS, extraDefs: defs.all() + silDefs() }), ctx, seq };
}

function main() {
  const out = path.join(__dirname, 'html'); fs.mkdirSync(out, { recursive: true });
  const editions = [];
  for (const etsy of [false, true]) for (const lowink of [false, true]) for (const size of ['letter', 'a4']) editions.push({ etsy, lowink, size });
  let info;
  for (const e of editions) {
    const name = `${e.etsy ? 'etsy' : 'site'}-${e.lowink ? 'lowink' : 'color'}-${e.size}.html`;
    const r = render(Object.assign({ rel: '../../../../' }, e));
    fs.writeFileSync(path.join(out, name), r.html);
    if (!e.etsy && !e.lowink && e.size === 'letter') {
      fs.writeFileSync(path.join(ROOT, 'source.html'), render(Object.assign({ rel: REL.root }, e)).html);
      info = r;
    }
  }
  // START HERE (short guide file, Letter + A4 readable) for both editions
  for (const etsy of [false, true]) for (const size of ['letter', 'a4']) {
    const { ctx } = plan(); Object.assign(ctx, { etsy, size, rel: '../../../../' });
    fs.writeFileSync(path.join(out, `start-here-${etsy ? 'etsy' : 'site'}-${size}.html`), htmlDoc({ title: 'START HERE — Toddler Busy Book', rel: '../../../../', size, etsy, body: extra.startHere(ctx), extraCss: extra.EXTRA_CSS, extraDefs: defs.all() + silDefs() }));
  }
  const stats = {
    pages: info.seq.length,
    activities: ACTS.length,
    byBand: Object.fromEntries(['b1', 'b2', 'b3'].map(b => [b, ACTS.filter(a => a.band === b).length])),
    noCut: ACTS.filter(a => !a.cut && !a.usesPiecesOf).length,
    sheets: info.seq.filter(s => s.type === 'sheet').length,
    pieces: ACTS.reduce((n, a) => n + (a.pieces ? a.pieces.length : 0), 0),
    maxPiecesPerSheet: Math.max(...ACTS.filter(a => a.pieces).map(a => a.pieces.length)),
    actPages: info.ctx.actPage, sheetPages: info.ctx.sheetPage,
  };
  fs.writeFileSync(path.join(__dirname, 'stats.json'), JSON.stringify(stats, null, 1));
  console.log(`pages ${stats.pages} | activities ${stats.activities} ${JSON.stringify(stats.byBand)} | no-cut ${stats.noCut} | sheets ${stats.sheets} | pieces ${stats.pieces} (max ${stats.maxPiecesPerSheet}/sheet)`);
}
if (require.main === module) main();
module.exports = { plan, render, ACTS };
