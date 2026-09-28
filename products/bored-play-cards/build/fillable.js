// Adds real fill-in form fields to the editable PDFs.
//   node build/fillable.js <editable.html> <rendered.pdf> <out.pdf>
// The PDF is first rendered with brand/render.js; this script measures every [data-field]
// element in the same HTML (96 px = 1 in) and places an AcroForm field on top of it (pdf-lib).
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { PDFDocument, rgb, StandardFonts, drawEllipse, TextAlignment } = require('pdf-lib');
const fs = require('fs'); const path = require('path');
(async () => {
  const [html, pdfIn, pdfOut] = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const page = await browser.newPage({ viewport: { width: 1200, height: 1000 } });
  await page.goto('file://' + path.resolve(html), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const pages = await page.evaluate(() => [...document.querySelectorAll('.page')].map(pg => {
    const pr = pg.getBoundingClientRect();
    return [...pg.querySelectorAll('[data-field]')].map(el => {
      const r = el.getBoundingClientRect();
      return { name: el.dataset.field, tag: el.tagName, x: r.left - pr.left, y: r.top - pr.top, w: r.width, h: r.height };
    });
  }));
  await browser.close();
  const doc = await PDFDocument.load(fs.readFileSync(pdfIn));
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const form = doc.getForm();
  const ink = rgb(0x1D / 255, 0x29 / 255, 0x40 / 255);
  let n = 0;
  doc.getPages().forEach((pg, pi) => {
    const H = pg.getHeight(); const k = 0.75;
    const seen = {};
    (pages[pi] || []).forEach(f => {
      seen[f.name] = (seen[f.name] || 0) + 1;
      const id = `p${pi + 1}_${f.name}_${seen[f.name]}`;
      const box = { x: f.x * k, y: H - (f.y + f.h) * k, width: f.w * k, height: f.h * k, borderWidth: 0 };
      if (f.tag === 'I') {
        const cb = form.createCheckBox(id); cb.addToPage(pg, { ...box, textColor: ink, borderColor: undefined, backgroundColor: undefined });
        // custom look: nothing when off (the printed circle shows through), a filled ink dot when on
        const w = box.width, h = box.height;
        const dot = drawEllipse({ x: w / 2, y: h / 2, xScale: w * 0.32, yScale: h * 0.32, color: ink, borderWidth: 0 });
        cb.updateAppearances(() => ({ normal: { on: dot, off: [] }, down: { on: dot, off: [] } }));
      } else {
        const tf = form.createTextField(id);
        const multi = !['title', 'menu_day', 'cert_name', 'cert_fav', 'cert_date'].includes(f.name) && !/_week$|_players$|^cert_top/.test(f.name);
        if (multi) tf.enableMultiline();
        tf.addToPage(pg, { ...box, textColor: ink, font, backgroundColor: undefined, borderColor: undefined });
        tf.setFontSize(f.name === 'cert_name' ? 22 : f.name === 'cert_said' ? 12 : f.name === 'title' ? 11 : multi ? (f.name.startsWith('wk_') ? 10 : 8.5) : 11);
        if (f.name === 'cert_name') tf.setAlignment(TextAlignment.Center);
      }
      n++;
    });
  });
  form.updateFieldAppearances(font);
  fs.writeFileSync(pdfOut, await doc.save());
  console.log(`${n} fields -> ${pdfOut}`);
})().catch(e => { console.error(e); process.exit(1); });
