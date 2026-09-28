// Edition runner shared by the gift-reveal set, both bundles and the lead magnet: writes every edition's
// HTML (store / etsy / email × color / low-ink × US Letter / A4), the committed source.html, and the
// render.js + finish.py job files. Same pipeline as products/winter-countdown/build/build.js.
'use strict';
const path = require('path');
const fs = require('fs');
const K = require('./kit.js');

// o: { slug, product, buildDir, editions: ['store','etsy'], pages(ctx) -> [{html,label,noFoot}], extraCss(ctx),
//      startHere(ctx) -> html | null, toc, meta: {subject, keywords}, storeName(ink,size), etsyName(ink,size),
//      startName: {store, etsy}, footerPages(pages) -> [indexes] | null }
function run(o) {
  const PDIR = path.resolve(o.buildDir, '..');
  const HTML = path.join(o.buildDir, 'html');
  const TMP = path.join(o.buildDir, 'tmp');
  for (const d of [HTML, TMP]) fs.mkdirSync(d, { recursive: true });
  const JOBS = [], FINISH = [], OUT = [];
  const editions = o.editions || ['store', 'etsy'];
  const inks = o.inks || ['color', 'lowink'];
  let total = null;
  for (const edition of editions) for (const ink of inks) for (const size of ['letter', 'a4']) {
    const ctx = K.context({ edition, ink, size, outDir: HTML, product: o.product });
    const first = o.pages(ctx);
    ctx.total = first.length;
    const pages = o.pages(ctx);
    total = pages.length;
    const html = K.doc(ctx, { title: o.product, pages, extraCss: o.extraCss(ctx) });
    const name = `${edition}-${ink}-${size}`;
    const file = path.join(HTML, name + '.html');
    fs.writeFileSync(file, html);
    const outName = edition === 'etsy' ? o.etsyName(ink, size) : o.storeName(ink, size, edition);
    if (!outName) continue;
    const raw = path.join(TMP, name + '.pdf');
    const fj = path.join(TMP, name + '.fields.json');
    JOBS.push({ html: file, pdf: raw, fields: fj });
    const fp = o.footerPages ? o.footerPages(pages) : pages.map((p, i) => (p.noFoot ? null : i)).filter(i => i !== null);
    FINISH.push({ in: raw, out: path.join(PDIR, outName), fields: fj, title: `${o.product} (${ink === 'lowink' ? 'Low-ink' : 'Color'}, ${ctx.sizeName})`,
      edition, version: ctx.version, toc: o.toc, footer_pages: fp, ...o.meta });
    OUT.push(outName);
    const primary = editions[0];
    if (edition === primary && size === 'letter') JOBS.push({ html: file, pages: { dir: path.join(PDIR, 'preview', ink === 'lowink' ? 'low-ink' : ''), scale: 1.5 } });
    if (edition === 'etsy' && size === 'letter') JOBS.push({ html: file, pages: { dir: path.join(TMP, `etsy-${ink}`), scale: 1.5 } });
    if (edition === primary && size === 'letter' && ink === 'color') {
      JOBS.push({ html: file, pages: { dir: path.join(TMP, 'cover'), selector: 'section.page:first-of-type', scale: 1600 / 1056 } });
      const c2 = K.context({ edition, ink, size, outDir: PDIR, product: o.product });
      c2.total = total;
      fs.writeFileSync(path.join(PDIR, 'source.html'), K.doc(c2, { title: o.product, pages: o.pages(c2), extraCss: o.extraCss(c2) }));
    }
  }
  if (o.startHere) for (const edition of editions) {
    const ctx = K.context({ edition, ink: 'color', size: 'letter', outDir: HTML, product: 'Start here' });
    ctx.total = total;
    const html = K.doc(ctx, { title: `${o.product}: Start here`, pages: [{ html: o.startHere(ctx), label: 'Start here' }], extraCss: o.extraCss(ctx) });
    const file = path.join(HTML, `start-${edition}.html`);
    fs.writeFileSync(file, html);
    const raw = path.join(TMP, `start-${edition}.pdf`);
    JOBS.push({ html: file, pdf: raw });
    FINISH.push({ in: raw, out: path.join(PDIR, o.startName[edition]), title: `${o.product}: Start here`, edition, version: ctx.version, ...o.meta });
    JOBS.push({ html: file, pages: { dir: path.join(PDIR, 'preview', `start-here-${edition}`), scale: 1.5 } });
    OUT.push(o.startName[edition]);
  }
  fs.writeFileSync(path.join(TMP, 'jobs.json'), JSON.stringify(JOBS, null, 1));
  fs.writeFileSync(path.join(TMP, 'finish.json'), JSON.stringify(FINISH, null, 1));
  console.log(`${o.slug}: ${OUT.length} PDFs, ${total} pages each; ${JOBS.length} render jobs`);
  return { total, OUT };
}

// Common page CSS used by the new builds (titles, boxes, grids, START HERE, "more" page).
function commonCss(ctx) {
  const { C, D } = K;
  return `
.d-sky{color:${D.sky}}.d-tomato{color:${D.tomato}}.d-grass{color:${D.grass}}.d-plum{color:${D.plum}}
.ptitle{font-size:38px;margin:6px 0 8px}
.lede2{font-size:15.5px;line-height:1.5;max-width:660px;margin-bottom:18px}
.sub{font-size:20px;margin:18px 0 10px}
.small{font-size:11px;line-height:1.45}
.box{background:${C.wash};border-radius:16px;padding:13px 16px}
.box h4{font-size:16px;margin:0 0 4px}
.box p,.box li{font-size:13.4px;line-height:1.48}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.tile{background:${C.wash};border-radius:16px;padding:12px 14px;border-bottom:5px solid ${C.sky}}
.tile b{display:block;font-family:"Bricolage Grotesque",sans-serif;font-size:34px;line-height:1}
.tile span{display:block;font-size:11px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;margin-top:4px;color:#3C4760}
.sh-logo{height:28px;margin-bottom:18px;align-self:flex-start}
.sh-top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
.files{list-style:none;margin:0 0 6px;padding:0;display:flex;flex-direction:column;gap:6px}
.files li{display:flex;gap:12px;align-items:baseline;background:${C.wash};border-radius:10px;padding:9px 14px;font-size:13.5px}
.files b{min-width:250px;font-weight:800}
.shb{background:${C.tSky};border-radius:16px;padding:12px 14px}
.shb h4{display:flex;align-items:center;gap:6px;font-size:16px;margin:0 0 4px}
.shb p{font-size:13.4px;line-height:1.48}
.tight{margin-top:auto}
.nexts{display:flex;flex-direction:column;gap:10px}
.nx{display:flex;gap:14px;align-items:center;background:${C.wash};border-radius:16px;padding:10px 14px;border-left:8px solid var(--c)}
.nx h4{font-size:16px;margin:0 0 3px}.nx p{font-size:13px;line-height:1.45}
.nx-ic{flex:none;width:70px;height:70px;border-radius:50%;background:#FFFFFF;display:flex;align-items:center;justify-content:center}
.bonus{display:flex;gap:18px;align-items:center;background:${C.tSun};border-radius:18px;padding:14px 18px;margin-top:16px}
.bonus h4{font-size:16px;margin:0 0 4px}.bonus p{font-size:13px;line-height:1.45}
.bonus .small{margin-top:6px}
.colophon{margin-top:auto;border-top:1.5px solid ${C.wash};padding-top:10px}
.colophon p{font-size:10.2px;line-height:1.5;margin-top:4px}
body.lowink .box,body.lowink .tile,body.lowink .files li,body.lowink .shb,body.lowink .nx,body.lowink .bonus{background:#FFFFFF;box-shadow:inset 0 0 0 1.5px ${C.line}}
`;
}

module.exports = { run, commonCss };
