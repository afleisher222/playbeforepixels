#!/usr/bin/env node
// survey_usage.js - which brand-font faces does the repo actually draw text with?
//
// Loads HTML pages in the same Chromium that brand/render.js uses and, for every element that
// draws text (text nodes, plus ::before/::after content), records the computed font-family, the
// computed font-weight / font-style / font-size, font-optical-sizing and font-variation-settings.
// The family is the first brand family in the element's font-family list (see fonts.css).
//
// Why px size matters: Chromium applies `font-optical-sizing: auto` to fonts with an opsz axis,
// setting opsz = font-size in CSS px (clamped to the axis range). Static instances have one fixed
// opsz, so this survey is what shows how far each pinned instance is from the variable render.
//
// It also checks coverage: every (family, style, weight) the pages ask for must have a static
// @font-face in fonts.css at exactly that weight (after clamping to the old variable range), or
// Chromium will silently snap to the nearest static weight.
//
// Usage (repo root):
//   node brand/fonts/survey_usage.js [--json out.json] [dir-or-file ...]
//   default dirs: products brand content site-concepts
// Exit 0 = every used weight is covered, 1 = something is not covered, 2 = script error.
const path = require('path');
const fs = require('fs');

function loadPlaywright() {
  const tries = ['/opt/node22/lib/node_modules/playwright', 'playwright'];
  try { tries.push(path.join(require('child_process').execSync('npm root -g', { encoding: 'utf8' }).trim(), 'playwright')); } catch (e) {}
  for (const t of tries) { try { return require(t); } catch (e) {} }
  throw new Error('Playwright not found (bootstrap.sh step 3)');
}

const ROOT = path.resolve(__dirname, '..', '..');
const BRAND = ['Bricolage Grotesque', 'Nunito Sans', 'Fredoka', 'Caveat'];
// Ranges the variable faces were declared with (pre-static fonts.css): a request outside is clamped.
const RANGE = { 'Bricolage Grotesque': [400, 800], 'Nunito Sans': [300, 900], 'Fredoka': [400, 700], 'Caveat': null };
const SKIP_DIRS = new Set(['node_modules', '.git', 'tmp', '.qa', 'qa-scratch', 'dbg']);

function listHtml(p) {
  const abs = path.resolve(ROOT, p);
  if (!fs.existsSync(abs)) return [];
  if (fs.statSync(abs).isFile()) return abs.endsWith('.html') ? [abs] : [];
  const out = [];
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
    const f = path.join(d, e.name);
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(f); }
    else if (e.isFile() && e.name.endsWith('.html')) out.push(f);
  });
  walk(abs);
  return out.sort();
}

// Parse fonts.css: which (family, style, weight) have a static (single-weight) face.
function staticFaces() {
  const css = fs.readFileSync(path.join(__dirname, 'fonts.css'), 'utf8');
  const have = new Set();
  for (const m of css.matchAll(/@font-face\s*{([^}]*)}/g)) {
    const b = m[1];
    const fam = (b.match(/font-family:\s*['"]?([^;'"]+)/) || [])[1];
    const sty = ((b.match(/font-style:\s*([a-z]+)/) || [])[1]) || 'normal';
    const w = ((b.match(/font-weight:\s*([^;]+)/) || [])[1] || '400').trim().split(/\s+/);
    if (w.length === 1) have.add(`${fam}|${sty}|${w[0]}`);
  }
  return have;
}

(async () => {
  const args = process.argv.slice(2);
  let jsonOut = null;
  const ji = args.indexOf('--json');
  if (ji >= 0) { jsonOut = args[ji + 1]; args.splice(ji, 2); }
  const targets = args.length ? args : ['products', 'brand', 'content', 'site-concepts'];
  const files = targets.flatMap(listHtml);
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const usage = new Map();          // key family|style|weight|sizePx -> {chars, files:Set}
  const settings = new Map();       // font-optical-sizing / font-variation-settings values seen
  let done = 0, failed = [];
  const queue = files.slice();
  const worker = async () => {
    const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
    while (queue.length) {
      const f = queue.shift();
      try {
        await page.goto('file://' + f, { waitUntil: 'load', timeout: 30000 });
        await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
        await page.evaluate(() => document.fonts.ready);
        const rows = await page.evaluate((BRAND) => {
          const out = {};
          const firstBrand = ff => {
            for (const raw of ff.split(',')) {
              const n = raw.trim().replace(/^['"]|['"]$/g, '');
              const hit = BRAND.find(b => b.toLowerCase() === n.toLowerCase());
              if (hit) return hit;
              if (['serif', 'sans-serif', 'monospace', 'cursive', 'system-ui'].includes(n)) return null;
            }
            return null;
          };
          const add = (cs, n) => {
            const fam = firstBrand(cs.fontFamily);
            if (!fam || !n) return;
            const k = [fam, cs.fontStyle.startsWith('oblique') ? 'oblique' : cs.fontStyle, cs.fontWeight,
              Math.round(parseFloat(cs.fontSize) * 100) / 100, cs.fontOpticalSizing, cs.fontVariationSettings].join('|');
            out[k] = (out[k] || 0) + n;
          };
          const tw = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
          let t;
          while ((t = tw.nextNode())) {
            const el = t.parentElement;
            if (!el) continue;
            const n = t.nodeValue.replace(/\s+/g, '').length;
            if (!n) continue;
            if (['SCRIPT', 'STYLE', 'TITLE', 'NOSCRIPT', 'TEMPLATE'].includes(el.tagName)) continue;
            const cs = getComputedStyle(el);
            if (cs.display === 'none' || cs.visibility === 'hidden') continue;
            add(cs, n);
          }
          for (const el of document.querySelectorAll('*')) {
            for (const pe of ['::before', '::after']) {
              const cs = getComputedStyle(el, pe);
              const c = cs.content;
              if (!c || c === 'none' || c === 'normal') continue;
              const m = c.match(/"((?:[^"\\]|\\.)*)"/g);
              const n = m ? m.join('').replace(/["\s]/g, '').length : 0;
              if (n && cs.display !== 'none') add(cs, n);
            }
          }
          return out;
        }, BRAND);
        for (const [k, n] of Object.entries(rows)) {
          const [fam, sty, w, size, ops, fvs] = k.split('|');
          settings.set(`font-optical-sizing:${ops}; font-variation-settings:${fvs}`, (settings.get(`font-optical-sizing:${ops}; font-variation-settings:${fvs}`) || 0) + n);
          const key = [fam, sty, w, size].join('|');
          const u = usage.get(key) || { chars: 0, files: new Set() };
          u.chars += n; u.files.add(path.relative(ROOT, f));
          usage.set(key, u);
        }
      } catch (e) { failed.push(`${path.relative(ROOT, f)}: ${String(e.message).split('\n')[0]}`); }
      done++;
      if (done % 50 === 0) process.stderr.write(`${done}/${files.length}\n`);
    }
    await page.close();
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  await browser.close();

  // Summarise by face (family/style/effective weight).
  const faces = new Map();
  for (const [key, u] of usage) {
    const [fam, sty, w, size] = key.split('|');
    const r = RANGE[fam];
    const eff = r ? Math.min(Math.max(+w, r[0]), r[1]) : +w;
    const fk = `${fam}|${sty}|${eff}`;
    const f = faces.get(fk) || { chars: 0, files: new Set(), sizes: new Map(), requested: new Set() };
    f.chars += u.chars; u.files.forEach(x => f.files.add(x)); f.requested.add(+w);
    f.sizes.set(+size, (f.sizes.get(+size) || 0) + u.chars);
    faces.set(fk, f);
  }
  const have = staticFaces();
  let uncovered = 0;
  console.log(`pages surveyed: ${files.length}, failed: ${failed.length}`);
  failed.forEach(x => console.log('  FAILED ' + x));
  console.log('\ncomputed optical-sizing / variation settings on brand text (chars):');
  for (const [k, n] of settings) console.log(`  ${k}  -> ${n}`);
  console.log('\nface (family | style | effective weight): chars, pages, requested weights, static face?');
  const sorted = [...faces.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  for (const [k, f] of sorted) {
    // Oblique/italic on a family with no italic face is synthesised from the normal face.
    const [fam, sty, eff] = k.split('|');
    const needKey = (fam === 'Nunito Sans' && sty === 'italic') ? `${fam}|italic|${eff}` : `${fam}|normal|${eff}`;
    const ok = have.has(needKey);
    if (!ok) uncovered++;
    console.log(`  ${k}: ${f.chars} chars, ${f.files.size} pages, requested ${[...f.requested].sort((a, b) => a - b).join('/')}, static: ${ok ? 'yes' : 'NO'}`);
    const sz = [...f.sizes.entries()].sort((a, b) => a[0] - b[0]);
    console.log('      px sizes (chars): ' + sz.map(([s, n]) => `${s}(${n})`).join(' '));
  }
  if (jsonOut) {
    const obj = {};
    for (const [k, f] of sorted) obj[k] = { chars: f.chars, pages: [...f.files].sort(), requested: [...f.requested], sizes: Object.fromEntries([...f.sizes.entries()].sort((a, b) => a[0] - b[0])) };
    fs.writeFileSync(jsonOut, JSON.stringify({ files: files.length, failed, settings: Object.fromEntries(settings), faces: obj }, null, 1));
  }
  process.exit(uncovered ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
