// Snaps every page box of a PDF to an exact size in inches (Chromium rounds page sizes slightly).
// node build/fixsize.js <file.pdf> <widthIn> <heightIn>
const { PDFDocument } = require('pdf-lib'); const fs = require('fs');
(async () => {
  const [f, w, h] = process.argv.slice(2); const d = await PDFDocument.load(fs.readFileSync(f));
  for (const p of d.getPages()) { const W = +w * 72, H = +h * 72; p.setMediaBox(0, 0, W, H); p.setCropBox(0, 0, W, H); p.setTrimBox(0, 0, W, H); p.setBleedBox(0, 0, W, H); }
  fs.writeFileSync(f, await d.save()); console.log('sized', f, w, h);
})();
