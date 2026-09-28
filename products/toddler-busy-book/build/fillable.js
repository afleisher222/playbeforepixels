// Adds real type-in form fields to a rendered PDF (works in free PDF readers).
//   node build/fillable.js <source.html> <rendered.pdf> <out.pdf>
// Measures every empty [data-field] element in the HTML (96 px = 1 in) and places an AcroForm text field on it.
// Elements that already hold text (the pre-filled example pages) are skipped.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { PDFDocument, rgb, StandardFonts, TextAlignment } = require('pdf-lib');
const fs = require('fs'); const path = require('path');
const STYLE = { cover_name: [28, 1], spine_name: [11, 1, 1], pouch_page: [13, 1], pouch_name: [13, 0], pouch_count: [11, 1], person: [18, 1], word: [18, 1], board_label: [13, 1], card_label: [12, 1], plan_page: [10.5, 0, 1], plan_talk: [10.5, 0, 1], plan_fav: [12, 0], cert_name: [34, 1], cert_fav: [13, 0], cert_date: [13, 0] };
(async () => {
  const [html, pdfIn, pdfOut] = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const page = await browser.newPage({ viewport: { width: 1200, height: 1000 } });
  await page.goto('file://' + path.resolve(html), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const pages = await page.evaluate(() => [...document.querySelectorAll('.page')].map(pg => {
    const pr = pg.getBoundingClientRect();
    return [...pg.querySelectorAll('[data-field]')].filter(el => !el.textContent.trim()).map(el => {
      const r = el.getBoundingClientRect();
      return { name: el.dataset.field, x: r.left - pr.left, y: r.top - pr.top, w: r.width, h: r.height };
    });
  }));
  await browser.close();
  const doc = await PDFDocument.load(fs.readFileSync(pdfIn));
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const form = doc.getForm();
  const ink = rgb(0x1D / 255, 0x29 / 255, 0x40 / 255);
  let n = 0;
  doc.getPages().forEach((pg, pi) => {
    const H = pg.getHeight(), k = 0.75, seen = {};
    (pages[pi] || []).forEach(f => {
      seen[f.name] = (seen[f.name] || 0) + 1;
      const [size, center, multi] = STYLE[f.name] || [12, 0];
      const tf = form.createTextField(`p${pi + 1}_${f.name}_${seen[f.name]}`);
      if (multi) tf.enableMultiline();
      tf.addToPage(pg, { x: f.x * k, y: H - (f.y + f.h) * k, width: f.w * k, height: f.h * k, borderWidth: 0, textColor: ink, font, backgroundColor: undefined, borderColor: undefined });
      tf.setFontSize(size);
      if (center) tf.setAlignment(TextAlignment.Center);
      n++;
    });
  });
  form.updateFieldAppearances(font);
  fs.writeFileSync(pdfOut, await doc.save());
  console.log(`${n} fields -> ${path.basename(pdfOut)}`);
})().catch(e => { console.error(e); process.exit(1); });
