// Adds fill-in form fields to the digital (color) PDFs so buyers can type into the blank plays and planners.
//   node build/fields.js <source.html> <rendered.pdf> <out.pdf>
// Measures every .field[data-name] in the HTML (96 px = 1 in) and places an AcroForm text field on it (pdf-lib).
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs'); const path = require('path');
(async () => {
  const [html, pdfIn, pdfOut] = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const page = await browser.newPage({ viewport: { width: 1200, height: 1000 } });
  await page.goto('file://' + path.resolve(html), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const pages = await page.evaluate(() => [...document.querySelectorAll('.page')].map(pg => {
    const pr = pg.getBoundingClientRect();
    return [...pg.querySelectorAll('.field[data-name]')].map(el => {
      const r = el.getBoundingClientRect();
      return { name: el.dataset.name, lines: +el.dataset.lines || 1, x: r.left - pr.left, y: r.top - pr.top, w: r.width, h: r.height };
    });
  }));
  await browser.close();
  const doc = await PDFDocument.load(fs.readFileSync(pdfIn));
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const form = doc.getForm();
  const ink = rgb(0x1D / 255, 0x29 / 255, 0x40 / 255);
  let n = 0;
  doc.getPages().forEach((pg, pi) => {
    const H = pg.getHeight(), k = 0.75;
    (pages[pi] || []).forEach(f => {
      if (f.w < 4 || f.h < 4) return;
      const tf = form.createTextField(`p${pi + 1}.${f.name}`);
      if (f.lines > 1) tf.enableMultiline();
      tf.addToPage(pg, { x: f.x * k, y: H - (f.y + f.h) * k, width: f.w * k, height: f.h * k, borderWidth: 0, textColor: ink, font, backgroundColor: undefined, borderColor: undefined });
      tf.setFontSize(f.lines > 1 ? 10 : 11);
      n++;
    });
  });
  form.updateFieldAppearances(font);
  doc.setTitle('100 Screen-Free Plays for Ages 0–5');
  doc.setAuthor('Play Before Pixels (AlphaPlay LLC)');
  doc.setSubject('Easy, low-prep play and talk ideas for babies, toddlers and preschoolers, sorted by age');
  doc.setKeywords(['screen-free play', 'toddler activities', 'baby play ideas', 'preschool activities', 'play and talk']);
  fs.writeFileSync(pdfOut, await doc.save());
  console.log(`${n} fields -> ${path.basename(pdfOut)}`);
})().catch(e => { console.error(e); process.exit(1); });
