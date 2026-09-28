#!/usr/bin/env node
// check_fonts.js - catches silent font fallback and path escapes before a routine commits renders.
//
// For every HTML file given (or every .html in products/<slug>/ and its subfolders), it loads the
// page in the same Chromium that brand/render.js uses, asks Chromium which font actually drew each
// text node (DevTools CSS.getPlatformFontsForNode), and reports:
//   - glyphs drawn by any font that is not a brand font from brand/fonts/fonts.css
//     (e.g. an arrow in Caveat falling back to the system's Liberation Sans),
//   - @font-face files that failed to load,
//   - any request outside this repository (absolute paths, another checkout, the web).
// Read-only. Exit 0 = clean, 1 = something to fix, 2 = script error.
//
// Usage (from the repo root):
//   node ops/TESTS/check_fonts.js picture-tablet-slept board-up-go-more
//   node ops/TESTS/check_fonts.js products/picture-tablet-slept/source.html
const path = require('path');
const fs = require('fs');

function loadPlaywright() {
  const tries = ['/opt/node22/lib/node_modules/playwright', 'playwright'];
  try { tries.push(path.join(require('child_process').execSync('npm root -g', { encoding: 'utf8' }).trim(), 'playwright')); } catch (e) {}
  for (const t of tries) { try { return require(t); } catch (e) {} }
  throw new Error('Playwright not found (bootstrap.sh step 3)');
}

const ROOT = path.resolve(__dirname, '..', '..');
const css = fs.readFileSync(path.join(ROOT, 'brand/fonts/fonts.css'), 'utf8');
const BRAND = [...new Set([...css.matchAll(/font-family:\s*['"]?([^;'"]+)['"]?/g)].map(m => m[1].trim()))];

function htmlFiles(arg) {
  const p = path.resolve(arg);
  if (p.endsWith('.html') && fs.existsSync(p)) return [p];
  const dir = fs.existsSync(p) && fs.statSync(p).isDirectory() ? p : path.join(ROOT, 'products', arg);
  if (!fs.existsSync(dir)) { console.error(`not found: ${arg}`); return []; }
  const out = [];
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
    const f = path.join(d, e.name);
    if (e.isDirectory() && !['node_modules', 'tmp', '.qa', 'qa-scratch', 'dbg'].includes(e.name)) walk(f);
    else if (e.isFile() && e.name.endsWith('.html') && !e.name.startsWith('_')) out.push(f);
  });
  walk(dir);
  return out.sort();
}

(async () => {
  const args = process.argv.slice(2);
  if (!args.length) { console.log('usage: node ops/TESTS/check_fonts.js <product-slug | file.html> ...'); process.exit(2); }
  const files = args.flatMap(htmlFiles);
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  let problems = 0;
  for (const f of files) {
    const page = await browser.newPage({ viewport: { width: 1800, height: 1200 } });
    const outside = [], failed = [];
    page.on('request', r => { const u = r.url(); if (!u.startsWith('data:') && !u.startsWith('blob:') && !u.startsWith('about:') && !decodeURI(u).startsWith('file://' + ROOT + '/')) outside.push(u); });
    page.on('requestfailed', r => failed.push(`${r.url()} (${(r.failure() || {}).errorText})`));
    await page.goto('file://' + f, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const faceErrors = await page.evaluate(() => [...document.fonts].filter(x => x.status === 'error').map(x => `${x.family} ${x.weight}`));
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
    const { root } = await cdp.send('DOM.getDocument', { depth: -1, pierce: true });
    const fallback = new Map();
    const walk = async n => {
      const text = (n.children || []).filter(c => c.nodeType === 3).map(c => c.nodeValue).join('');
      if (n.nodeType === 1 && text.trim()) {
        try {
          const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId: n.nodeId });
          for (const x of fonts) {
            if (BRAND.some(b => x.familyName.startsWith(b))) continue;
            const key = `${x.familyName} in <${n.localName}> "${text.trim().slice(0, 70)}"`;
            fallback.set(key, (fallback.get(key) || 0) + x.glyphCount);
          }
        } catch (e) { /* node without layout */ }
      }
      for (const c of n.children || []) await walk(c);
      if (n.contentDocument) await walk(n.contentDocument);
    };
    await walk(root);
    const n = fallback.size + outside.length + failed.length + faceErrors.length;
    problems += n;
    console.log(`${n ? 'FAIL' : 'ok  '} ${path.relative(ROOT, f)}`);
    for (const [k, v] of fallback) console.log(`       fallback font: ${v} glyph(s) of ${k}`);
    outside.forEach(u => console.log(`       request outside the repository: ${u}`));
    failed.forEach(u => console.log(`       request failed: ${u}`));
    faceErrors.forEach(u => console.log(`       @font-face failed to load: ${u}`));
    await page.close();
  }
  await browser.close();
  console.log(`${files.length} file(s) checked, ${problems} problem(s). Brand fonts: ${BRAND.join(', ')}`);
  process.exit(problems ? 1 : 0);
})().catch(e => { console.error('check_fonts.js error:', e.message || e); process.exit(2); });
