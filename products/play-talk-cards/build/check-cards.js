// QA: node build/check-cards.js
// Renders every card of both decks (color and low-ink) and fails if any text overflows its card,
// collides with the talk box / safety line, or if the meta row is wider than the card body.
const fs = require('fs');
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const K = require('./cards.js');
const { logoRel, fontRel } = require('./build.js');

const GEN = path.join(__dirname, 'gen');
fs.mkdirSync(GEN, { recursive: true });
K.setLogoBase(logoRel(GEN));

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const problems = [];
  for (const ink of [false, true]) {
    const cards = [...K.DECK_A.map(c => K.cardA(c, 0)), ...K.DECK_B.map(c => K.cardB(c, 0))];
    const f = path.join(GEN, `check-cards${ink ? '-ink' : ''}.html`);
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${fontRel(GEN)}"><style>body{margin:0}${K.CARD_CSS}</style></head><body class="${ink ? 'ink' : ''}">${K.defs()}<div style="display:flex;flex-wrap:wrap;gap:6px;width:1500px">${cards.join('')}</div></body></html>`);
    const page = await browser.newPage();
    await page.goto('file://' + f, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const res = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('.card').forEach((card, idx) => {
        const cr = card.getBoundingClientRect();
        const body = card.querySelector('.body');
        if (!body) return;
        const br = body.getBoundingClientRect();
        const label = (card.querySelector('h3') || card.querySelector('.q') || {}).textContent || ('#' + idx);
        if (body.scrollHeight > body.clientHeight + 1) out.push(label + ': body overflows by ' + (body.scrollHeight - body.clientHeight) + 'px');
        const kids = [...body.querySelectorAll('h3,.need,.meta,.play,.talk,.safe,.q,.steps,.key,.ver')];
        kids.forEach(k => {
          const r = k.getBoundingClientRect();
          if (r.bottom > cr.bottom - 14.5 || r.right > cr.right - 14.5 || r.left < cr.left + 14.5) out.push(label + ': ' + k.className + ' too close to edge');
        });
        const meta = body.querySelector('.meta');
        if (meta && meta.scrollWidth > meta.clientWidth + 1) out.push(label + ': meta row too wide (' + meta.scrollWidth + '>' + meta.clientWidth + ')');
        const play = body.querySelector('.play'), talk = body.querySelector('.talk');
        if (play && talk) {
          const gap = talk.getBoundingClientRect().top - play.getBoundingClientRect().bottom;
          if (gap < 4) out.push(label + ': play text touches talk tip (gap ' + gap.toFixed(1) + ')');
        }
        const mob = card.querySelector('.mo b'), num = card.querySelector('.num');
        if (mob && num) { const rg = document.createRange(); rg.selectNodeContents(mob); const a = rg.getBoundingClientRect(), b = num.getBoundingClientRect(); if (a.right > b.left - 3 && a.top < b.bottom) out.push(label + ': moment name touches the number pill'); }
        const q = body.querySelector('.q'), qw = body.querySelector('.qwrap');
        if (q && qw && q.getBoundingClientRect().height > qw.getBoundingClientRect().height + 1) out.push(label + ': question too tall');
      });
      return out;
    });
    res.forEach(r => problems.push((ink ? '[low-ink] ' : '') + r));
    if (!ink) {
      const gaps = await page.evaluate(() => [...document.querySelectorAll('.cA .body')].map(b => { const p = b.querySelector('.play'), t = b.querySelector('.talk'); return p && t ? Math.round(t.getBoundingClientRect().top - p.getBoundingClientRect().bottom) : null; }).filter(x => x !== null));
      console.log('deck A play→talk gaps: min', Math.min(...gaps), 'max', Math.max(...gaps));
    }
    await page.close();
  }
  await browser.close();
  if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
  console.log('all', K.DECK_A.length + K.DECK_B.length, 'cards fit (color and low-ink)');
})().catch(e => { console.error(e); process.exit(1); });
