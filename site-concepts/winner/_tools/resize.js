// Resize PNGs to WebP using headless Chromium's canvas (no native image libs on this box).
// usage: node resize.js <outdir> <width> <src>=<name> ...
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'); const path = require('path');
(async () => {
  const [outdir, width, ...pairs] = process.argv.slice(2);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const p = await b.newPage();
  for (const pr of pairs) {
    const [src, name] = pr.split('=');
    const data = 'data:image/png;base64,' + fs.readFileSync(src).toString('base64');
    const out = await p.evaluate(async ({ data, w }) => {
      const img = new Image(); img.src = data; await img.decode();
      const W = Math.min(w, img.naturalWidth), H = Math.round(img.naturalHeight * W / img.naturalWidth);
      const c = document.createElement('canvas'); c.width = W; c.height = H;
      const x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(img, 0, 0, W, H);
      return c.toDataURL('image/webp', 0.88);
    }, { data, w: +width });
    fs.writeFileSync(path.join(outdir, name + '.webp'), Buffer.from(out.split(',')[1], 'base64'));
  }
  await b.close();
})();
