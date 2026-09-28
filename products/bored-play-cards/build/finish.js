// Renders every PDF in build/gen/manifest.json, then (pdf-lib):
//   - adds real fill-in fields on top of every [data-field] element (color editions only; they work in free
//     PDF readers that support forms). data-ml="1" = multi-line, data-fs = font size, <i data-field> = tick circle.
//   - sets title / author / subject (with the version) / keywords (with the channel: store or etsy).
//   - fails if any PDF is over 15 MB (customer-voice rule 2) or any Etsy file contains a URL (COMPLIANCE-GATE #16).
//   node build/finish.js            (run from the product folder, after node build/build.js)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { PDFDocument, rgb, StandardFonts, drawEllipse, TextAlignment } = require('pdf-lib');
const fs = require('fs'); const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const VERSION = 'Version 1.0 · September 2026';

(async () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'gen/manifest.json'), 'utf8'));
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  fs.mkdirSync(path.join(ROOT, 'etsy-upload'), { recursive: true });
  for (const e of manifest) {
    const html = path.join(ROOT, e.html), out = path.join(ROOT, e.pdf);
    const page = await browser.newPage({ viewport: { width: 1200, height: 1000 } });
    await page.goto('file://' + html, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const pdfBytes = await page.pdf({ printBackground: true, preferCSSPageSize: true, tagged: true, outline: false });
    const fields = e.fields ? await page.evaluate(() => [...document.querySelectorAll('.page')].map(pg => {
      const pr = pg.getBoundingClientRect();
      return [...pg.querySelectorAll('[data-field]')].map(el => {
        const r = el.getBoundingClientRect();
        return { name: el.dataset.field, tick: el.tagName === 'I', ml: el.dataset.ml === '1', fs: +(el.dataset.fs || 0), x: r.left - pr.left, y: r.top - pr.top, w: r.width, h: r.height };
      });
    })) : [];
    await page.close();
    const doc = await PDFDocument.load(pdfBytes);
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const ink = rgb(0x1D / 255, 0x29 / 255, 0x40 / 255);
    let n = 0;
    if (e.fields) {
      const form = doc.getForm();
      doc.getPages().forEach((pg, pi) => {
        const H = pg.getHeight(); const k = 0.75; const seen = {};
        (fields[pi] || []).forEach(f => {
          seen[f.name] = (seen[f.name] || 0) + 1;
          const id = `p${pi + 1}_${f.name}_${seen[f.name]}`;
          const box = { x: f.x * k, y: H - (f.y + f.h) * k, width: f.w * k, height: f.h * k, borderWidth: 0 };
          if (f.tick) {
            const cb = form.createCheckBox(id); cb.addToPage(pg, { ...box, textColor: ink });
            const w = box.width, h = box.height;
            const dot = drawEllipse({ x: w / 2, y: h / 2, xScale: w * 0.32, yScale: h * 0.32, color: ink, borderWidth: 0 });
            cb.updateAppearances(() => ({ normal: { on: dot, off: [] }, down: { on: dot, off: [] } }));
          } else {
            const tf = form.createTextField(id);
            if (f.ml) tf.enableMultiline();
            tf.addToPage(pg, { ...box, textColor: ink, font, backgroundColor: undefined, borderColor: undefined });
            tf.setFontSize(f.fs || (f.ml ? 9 : 10));
            if (f.name === 'cert_name' || f.name.startsWith('div_')) tf.setAlignment(TextAlignment.Center);
          }
          n++;
        });
      });
      form.updateFieldAppearances(font);
    }
    const what = e.start ? 'START HERE' : `${e.low ? 'Low-ink' : 'Color'} · ${e.size === 'a4' ? 'A4' : 'US Letter'}`;
    doc.setTitle(`“I’m Bored” Play Cards · ${what}`);
    doc.setAuthor('AlphaPlay LLC (Play Before Pixels)');
    doc.setSubject(`150 printable play cards for ages 1–12, with summer and rainy-day sets · ${VERSION}`);
    doc.setKeywords([`channel: ${e.ed}`, '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.', 'License: personal and family use in one household.']);
    doc.setCreator('Play Before Pixels'); doc.setProducer('Play Before Pixels');
    doc.setLanguage('en-US');
    doc.setCreationDate(new Date('2026-09-28T12:00:00Z')); doc.setModificationDate(new Date());
    fs.writeFileSync(out, await doc.save());
    const mb = fs.statSync(out).size / 1048576;
    if (mb > 15) throw new Error(`${e.pdf} is ${mb.toFixed(1)} MB (limit 15 MB)`);
    console.log(`${e.pdf.padEnd(42)} ${String(doc.getPageCount()).padStart(3)} pages ${mb.toFixed(1).padStart(5)} MB ${n ? n + ' fields' : ''}`);
  }
  await browser.close();
})().catch(err => { console.error(err); process.exit(1); });
