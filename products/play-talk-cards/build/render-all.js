// node build/render-all.js [--skip-pdf]
// 1) builds the HTML (build.js)  2) renders every PDF with brand/render.js
// 3) adds type-in form fields to the "make your own" page + PDF metadata (pdf-lib)
// 4) renders preview PNGs and cover.png for both products
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const HERE = __dirname, ROOT = path.resolve(HERE, '..'), REPO = path.resolve(ROOT, '../..');
const RENDER = path.join(REPO, 'brand/render.js');
const run = (...a) => execFileSync('node', [RENDER, ...a], { stdio: 'inherit' });

async function measureFields(browser, html, W) {
  const page = await browser.newPage({ viewport: { width: W, height: 1000 } });
  await page.goto('file://' + html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const pageIndex = await page.evaluate(() => [...document.querySelectorAll('.page')].findIndex(p => p.querySelectorAll('.bl-body').length === 9));
  const res = await page.evaluate(() => {
    const pg = [...document.querySelectorAll('.page')].find(p => p.querySelectorAll('.bl-body').length === 9);
    const pr = pg.getBoundingClientRect();
    const rel = r => ({ x: r.left - pr.left, y: r.top - pr.top, w: r.width, h: r.height });
    const union = els => { const rs = els.map(e => e.getBoundingClientRect()); const l = Math.min(...rs.map(r => r.left)), t = Math.min(...rs.map(r => r.top)), rr = Math.max(...rs.map(r => r.right)), b = Math.max(...rs.map(r => r.bottom)); return rel({ left: l, top: t, width: rr - l, height: b - t }); };
    return [...pg.querySelectorAll('.bl-body')].map(body => {
      const plain = [...body.children].filter(e => e.classList.contains('ln'));
      const talk = [...body.querySelectorAll('.bl-talk .ln')];
      return { plain: plain.map(e => rel(e.getBoundingClientRect())), plainAll: union(plain), talk: union(talk) };
    });
  });
  await page.close();
  return { pageIndex, cards: res };
}

async function postProcess(entry, measured) {
  const bytes = fs.readFileSync(entry.pdf);
  const doc = await PDFDocument.load(bytes);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const P = entry.product === 'A'
    ? { title: '52 Play & Talk Cards, Ages 0–5', subject: 'Printable play and talk cards for babies, toddlers and preschoolers' }
    : { title: '52 Family Talk-Along Cards, Ages 5–12', subject: 'Printable family conversation cards for dinner, the car, bath time and bedtime' };
  setMeta(doc, entry, P);
  if (!measured) { fs.writeFileSync(entry.pdf, await doc.save()); return; }
  const fields = measured.cards;
  const form = doc.getForm();
  const page = doc.getPage(measured.pageIndex);
  const Hpt = page.getHeight();
  const k = 0.75; // px -> pt
  const ink = rgb(0x1D / 255, 0x29 / 255, 0x40 / 255);
  const add = (name, r, multi, size, padTop = 0) => {
    const f = form.createTextField(name);
    if (multi) f.enableMultiline();
    f.addToPage(page, { x: r.x * k, y: Hpt - (r.y + r.h) * k, width: r.w * k, height: (r.h + padTop) * k, borderWidth: 0, textColor: ink, font });
    f.setFontSize(size);
  };
  fields.forEach((c, i) => {
    const n = i + 1;
    if (entry.product === 'A') {
      const [t, need, p1, p2, p3] = c.plain;
      add(`card${n}_title`, t, false, 10, 4);
      add(`card${n}_need`, need, false, 8.5, 4);
      add(`card${n}_play`, { x: p1.x, y: p1.y, w: p1.w, h: p3.y + p3.h - p1.y }, true, 8.5, 4);
      add(`card${n}_talk`, c.talk, true, 8.5, 4);
    } else {
      add(`card${n}_question`, c.plainAll, true, 11, 4);
      add(`card${n}_tip`, c.talk, true, 8.5, 4);
    }
  });
  form.updateFieldAppearances(font);
  fs.writeFileSync(entry.pdf, await doc.save());
}

function setMeta(doc, entry, P) {
  const what = entry.startHere ? ' · START HERE' : (entry.ink ? ' (low-ink)' : ' (color)') + (entry.size === 'a4' ? ' (A4)' : ' (US Letter)');
  doc.setTitle(P.title + what);
  doc.setAuthor('AlphaPlay LLC (Play Before Pixels)');
  doc.setSubject(P.subject + ' · Version 1.0 · September 2026');
  doc.setKeywords(['© 2026 AlphaPlay LLC. All rights reserved.', 'Play Before Pixels is a trade name of AlphaPlay LLC.', entry.ed === 'etsy' ? 'License: personal/family use only. Full terms in the shop listing and policies.' : 'License: personal/family use only. Full terms: playbeforepixels.com/license']);
  doc.setCreator('Play Before Pixels');
  doc.setProducer('Play Before Pixels');
  doc.setCreationDate(new Date('2026-09-28T12:00:00Z'));
  doc.setModificationDate(new Date());
}

(async () => {
  execFileSync('node', [path.join(HERE, 'build.js')], { stdio: 'inherit' });
  const manifest = JSON.parse(fs.readFileSync(path.join(HERE, 'gen/manifest.json'), 'utf8'));
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  // remove files from the old naming (ink-saver) so nothing stale ships
  for (const d of [ROOT, path.join(ROOT, 'talk-along')]) for (const f of fs.readdirSync(d)) if (/ink-saver.*\.pdf$/.test(f)) fs.unlinkSync(path.join(d, f));
  for (const e of manifest) {
    if (!process.argv.includes('--skip-pdf')) {
      run('pdf', e.html, e.pdf);
      let measured = null;
      if (!e.startHere) {
        measured = await measureFields(browser, e.html, e.W);
        if (measured.cards.length !== 9 || measured.pageIndex < 0) throw new Error('expected 9 blank cards, got ' + measured.cards.length);
      }
      await postProcess(e, measured);
      const mb = fs.statSync(e.pdf).size / 1048576;
      if (mb > 15) throw new Error(e.pdf + ' is over 15 MB');
      console.log('pdf', path.relative(ROOT, e.pdf), mb.toFixed(1) + ' MB');
    }
    if (e.startHere && e.ed === 'store') run('pages', e.html, path.join(path.dirname(e.pdf), 'preview', 'start-here'), '.page', '1.5');
    if (e.lowInkPreview) {
      const lp = path.join(path.dirname(e.pdf), 'preview', 'low-ink');
      fs.rmSync(lp, { recursive: true, force: true });
      run('pages', e.html, lp, '.page', '1');
    }
    if (e.main) {
      const dir = path.dirname(e.pdf);
      const prev = path.join(dir, 'preview');
      fs.mkdirSync(prev, { recursive: true });
      for (const f of fs.readdirSync(prev)) if (/^p\d+\.png$/.test(f)) fs.unlinkSync(path.join(prev, f));
      run('pages', e.html, prev, '.page', '1.5');
      run('png', path.join(HERE, `gen/${e.product}-cover.html`), path.join(dir, 'cover.png'), String(e.W), String(e.H), String(1600 / e.H));
    }
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
