// QA: finds cards/pages whose content overflows. node build/check.js <file.html>
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const page = await browser.newPage();
  await page.goto('file://' + path.resolve(process.argv[2]), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const res = await page.evaluate(() => {
    const out = []; let minSlack = 999;
    document.querySelectorAll('.card:not(.back)').forEach((c, i) => {
      const p = c.querySelector('.panel'); const bd = c.querySelector('.bd'); const ft = c.querySelector('.ft');
      const pr = p.getBoundingClientRect(), br = bd.getBoundingClientRect(), fr = ft.getBoundingClientRect();
      const slack = fr.top - br.bottom; minSlack = Math.min(minSlack, slack);
      const t = (c.querySelector('h3') || {}).textContent;
      if (slack < 4 || fr.bottom > pr.bottom + 0.5) out.push({ i, t, slack: Math.round(slack) });
      const h3 = c.querySelector('h3'); if (h3 && h3.getBoundingClientRect().height > 44) out.push({ i, t, titleLines: 3 });
    });
    const pages = [];
    document.querySelectorAll('.cpin').forEach((c, i) => { if (c.scrollHeight > c.clientHeight + 1) pages.push({ page: i, over: c.scrollHeight - c.clientHeight }); });
    return { out, minSlack: Math.round(minSlack), pages };
  });
  console.log(JSON.stringify(res, null, 1));
  await browser.close();
})();
