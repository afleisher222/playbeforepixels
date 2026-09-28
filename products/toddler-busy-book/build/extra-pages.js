// Front matter, covers, age-band dividers and back matter for the Toddler Busy Book.
// FOUNDER: the grown-up guide text below is a draft; rewrite it in your own words and rebuild.
const { BANDS, CELL, BIG, footer, header, ui, esc, qrSvg, C, VERSION, COPYRIGHT, BONUS, SLUG, pieceGrid } = require('./core.js');
const { BB, use } = require('./lib.js');
const { head, kidAt, adultAt } = require('./boards.js');
const { activityPage, monthsLabel } = require('./pages.js');
const { MAZES, mazeSvg } = require('./acts-old.js');

const U = (id, x, y, s = 1, ex = '') => use(id, x, y, s, ex);
const pageWrap = (cls, inner, ctx, pn, band = 'n') => `<section class="page band-${band} ${cls}"><div class="live">${inner}${footer(ctx, pn)}</div></section>`;
const textHead = (eyebrow, title, lede = '') => `<div class="tp"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1>${lede ? `<p class="lede">${lede}</p>` : ''}</div>`;
const count = (ctx, f) => ctx.acts.filter(f).length;
const bandRange = (ctx, b) => { const ps = ctx.acts.filter(a => a.band === b).map(a => ctx.actPage[a.id]); const s = ctx.sheetPage; const all = ps.concat(ctx.acts.filter(a => a.band === b && a.pieces).map(a => s[a.id])); return [ctx.actPage['x-div-' + b], Math.max(...all)]; };

const EXTRA_CSS = `
.cover-bg{position:absolute;inset:0;border-radius:26px;overflow:hidden}
.pillrow{display:flex;gap:8px;flex-wrap:wrap}
.chip{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:6px 12px;font-weight:800;font-size:12.5px;background:#FFFFFF}
.chip i{width:12px;height:12px;border-radius:6px;display:inline-block}
.stat{border-radius:16px;padding:12px 14px;background:var(--wash)}
.stat b{display:block;font-family:"Bricolage Grotesque",sans-serif;font-size:30px;line-height:1}
.stat span{font-size:11.5px;font-weight:700;color:var(--soft)}
.step{display:flex;gap:12px;align-items:flex-start}
.step h3{font-size:17px;margin-bottom:3px}
.step p{font-size:12.3px;line-height:1.42}
.tbl{width:100%;border-collapse:collapse;font-size:10.6px}
.tbl td{padding:3.2px 6px;border-bottom:1px solid #E6EAF1;vertical-align:middle}
.tbl td.pg{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:12px;width:30px}
.tbl td.ck{width:18px}
.tbl .box12{display:inline-block;width:11px;height:11px;border:1.5px solid #9AA6BC;border-radius:3px;vertical-align:middle}
.tbl tr.bh td{background:var(--bt);font-weight:800;font-size:11px;padding:5px 6px;border-radius:0}
.tbl .cutc{color:var(--soft);font-weight:700}
.field{display:block;border-bottom:2px solid #C9D1DE;min-height:24px}
.qa{display:grid;grid-template-columns:1fr 1fr;gap:10px 14px}
.qa div{background:var(--wash);border-radius:14px;padding:10px 13px}
.qa h4{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:13.5px;margin-bottom:3px;line-height:1.2}
.qa p{font-size:11.2px;line-height:1.42}
.mini{width:696px;height:960px;position:relative;background:#FFFFFF}
.callout{position:absolute;width:26px;height:26px;border-radius:13px;background:var(--tomato);color:#fff;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 3px #fff}
.legend li{list-style:none;display:flex;gap:9px;margin-bottom:9px;font-size:12px;line-height:1.38}
.legend li .num{background:var(--tomato);width:22px;height:22px;font-size:12px}
.plan{width:100%;border-collapse:separate;border-spacing:0 6px}
.plan td{background:var(--wash);padding:0 10px;height:74px;font-size:12px;vertical-align:middle}
.plan td:first-child{border-radius:14px 0 0 14px;width:92px;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:16px}
.plan td:last-child{border-radius:0 14px 14px 0;width:70px;text-align:center}
.plan th{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:var(--soft);text-align:left;padding:0 10px}
.plan .fl{display:block;height:54px;background:#FFFFFF;border-radius:10px;padding:6px 8px;font-size:12px;line-height:1.3}
.plan .tick{display:inline-block;width:30px;height:30px;border-radius:15px;background:#FFFFFF;border:2px solid #C9D1DE}
.nextp{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.nextp .np{border-radius:18px;padding:12px;background:var(--wash);display:flex;flex-direction:column;gap:8px}
.nextp img{width:100%;height:210px;object-fit:contain;background:#FFFFFF;border-radius:12px}
.nextp h3{font-size:16px}.nextp p{font-size:11.5px;line-height:1.4}
.label-card{position:absolute;border:1.5px dashed #7F8BA3;border-radius:0}
`;

// ---------------- 1. cover ----------------
function coverArt() {
  // board-book cast + busy-book pieces, all from the shared art
  return `<svg class="board" width="696" height="560" viewBox="0 0 696 560">
    <circle cx="360" cy="300" r="230" fill="${C.sun}"/>
    ${adultAt('G2', 470, 520, 1.55, { legs: 'kneel', y: 520 - 51 * 1.55, flip: true, aL: 12, aR: -60, face: 'laugh' })}
    ${kidAt('A', 300, 520, 2.1, { aL: 20, aR: -110, face: 'laugh' })}
    <g transform="translate(96,150) rotate(-10)"><rect x="-80" y="-68" width="160" height="136" rx="16" fill="#FFFFFF"/><use href="#w-duck" transform="translate(0,-8) scale(.9)"/><text x="0" y="56" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="18" fill="${C.ink}">duck</text></g>
    <g transform="translate(610,140) rotate(9)"><rect x="-78" y="-66" width="156" height="132" rx="16" fill="#FFFFFF"/><use href="#b-apple" transform="translate(0,-8) scale(.78)"/><text x="0" y="54" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="18" fill="${C.ink}">red</text></g>
    <g transform="translate(96,420) rotate(6)"><rect x="-78" y="-66" width="156" height="132" rx="16" fill="#FFFFFF"/><use href="#b-s-star" transform="translate(0,-6) scale(.78)" style="--sf:${C.plum}"/></g>
    <g transform="translate(618,420) rotate(-7)"><rect x="-78" y="-66" width="156" height="132" rx="16" fill="#FFFFFF"/><use href="#w-ball" transform="translate(0,-4) scale(.9)"/></g>
  </svg>`;
}
const cover = {
  id: 'cover', html: (ctx, pn) => {
    const n = ctx.acts.length;
    return `<section class="page band-n coverp"><div class="live">
      <div class="cover-bg" style="background:${C.tSky}"></div>
      <div style="position:absolute;left:36px;top:34px;right:36px;display:flex;justify-content:space-between;align-items:center"><img src="${ctx.rel}brand/logo/lockup-horizontal.svg" style="height:40px" alt="Play Before Pixels"><span class="chip" style="font-size:12px">Printable · Ages 1–5</span></div>
      <div style="position:absolute;left:36px;top:108px;right:36px">
        <div class="disp" style="font-size:30px;color:${C.tomato}">${n} busy book activities</div>
        <h1 style="font-size:78px;margin-top:4px;letter-spacing:-.025em">Toddler<br>Busy Book</h1>
        <p style="font-size:16px;font-weight:700;margin-top:10px;max-width:520px;line-height:1.35">Matching, sorting, colors, shapes, pretend play, first words and mazes, sorted by age, with a “talk while you play” line on every page.</p>
      </div>
      <div style="position:absolute;left:0;top:360px">${coverArt()}</div>
      <div style="position:absolute;left:36px;right:36px;bottom:62px" class="pillrow">
        ${['b1', 'b2', 'b3'].map(b => `<span class="chip"><i style="background:${BANDS[b].c}"></i>${BANDS[b].label}</span>`).join('')}
        <span class="chip">${count(ctx, a => !a.cut && !a.usesPiecesOf)} no-cut pages: play today</span>
      </div>
    </div></section>`;
  },
};

// ---------------- 2. start here ----------------
const startHerePage = {
  id: 'start', html: (ctx, pn) => {
    const nc = count(ctx, a => !a.cut && !a.usesPiecesOf);
    const sheets = ctx.acts.filter(a => a.pieces).length;
    const pieces = ctx.acts.reduce((t, a) => t + (a.pieces ? a.pieces.length : 0), 0);
    const pick = { b1: ['w-ball', 'moo', 'peekhouse'], b2: ['colorhunt', 'road', 'count123'], b3: ['maze1', 'rocket', 'odd'] };
    return pageWrap('', `${textHead('Start here', 'Play today in three steps', `Prep time: <b>0 minutes</b> for ${nc} pages (print and play). <b>5–10 minutes</b> for pages with pieces: 12 straight cuts or fewer per sheet. No page takes longer to prep than it plays.`)}
      <div style="display:flex;flex-direction:column;gap:14px;margin-top:20px">
        <div class="step"><span class="num">1</span><div><h3>Find your child’s age band</h3><p>Pages are sorted by age. Ages are starting points, not deadlines: move up or down whenever you like.</p>
          <div class="pillrow" style="margin-top:8px">${['b1', 'b2', 'b3'].map(b => { const [a, z] = bandRange(ctx, b); return `<span class="chip" style="background:${BANDS[b].t}"><i style="background:${BANDS[b].c}"></i>${BANDS[b].label} · pages ${a}–${z}</span>`; }).join('')}</div></div></div>
        <div class="step"><span class="num">2</span><div><h3>Print one no-cut page and play</h3><p>Good first pages: ${['b1', 'b2', 'b3'].map(b => `<b>${BANDS[b].short}:</b> ${pick[b].map(id => { const a = ctx.acts.find(x => x.id === id); return `${a.title.replace(/^First words: /, '')} (p.${ctx.actPage[id]})`; }).join(', ')}`).join(' · ')}.</p></div></div>
        <div class="step"><span class="num">3</span><div><h3>Cut pieces when you have ten minutes</h3><p>Each piece sheet sits right after its activity page. Cut on the straight dashed lines, count the pieces into a pouch, and the grown-up keeps the pouch. Laminating and velcro are optional (tips on page ${ctx.actPage['x-lam']}).</p></div></div>
        <div class="step"><span class="num">4</span><div><h3>Talk while you play</h3><p>Every page has one line to say out loud. That line is the heart of the book. Read the 2-page grown-up guide next (pages ${ctx.actPage['x-guide1']}–${ctx.actPage['x-guide2']}).</p></div></div>
      </div>
      <div class="cols3" style="margin-top:22px;grid-template-columns:repeat(4,1fr)">
        <div class="stat"><b>${ctx.acts.length}</b><span>activities in 3 age bands</span></div>
        <div class="stat"><b>${nc}</b><span>no-cut pages, ready today</span></div>
        <div class="stat"><b>${sheets}</b><span>piece sheets · ${pieces} pieces, all 2 in or bigger</span></div>
        <div class="stat"><b>${ctx.pages}</b><span>pages in all, US Letter and A4</span></div>
      </div>
      <div class="card t-sky" style="margin-top:14px"><p><b>Inside too:</b> binder covers in 4 colors, spine and pouch labels, a weekly busy-book planner (Monday and Sunday starts, pre-filled and blank), make-your-own pages you can type into, a Busy Book Star certificate, an answer key and quick answers. <b>Color and Low-ink files</b> are included: Low-ink prints on white with colorable line art.</p></div>`, ctx, pn);
  },
};

// ---------------- 3-4. grown-up guide ----------------
const guide1 = {
  id: 'guide1', html: (ctx, pn) => pageWrap('', `${textHead('Grown-up guide · 1 of 2', 'Why busy-book play?', 'Little ones learn words from the people who talk and play with them. A busy book gives the two of you something to point at, name and move around, so the talk comes easily. You don’t need a plan or a script; the pages give you one.')}
    <div class="cols2" style="margin-top:18px">
      <div class="card t-sun"><h3>2-minute setup</h3><ol><li>Print one page. Cutting can wait.</li><li>Sit side by side or with your child on your lap.</li><li>Let your child touch, point and choose first.</li><li>Say the “talk while you play” line, then pause.</li><li>Stop while it’s still fun. Short is perfect.</li></ol></div>
      <div class="card t-grass"><h3>Most children love 2–3 of these</h3><p>You don’t need all ${ctx.acts.length}. Most children find two or three favorites and want them again and again. That’s not boring for them: repeating is how play grows. Rotate a few pages each week and keep the rest for later.</p></div>
    </div>
    <div class="card" style="margin-top:14px"><h3>Three talk lines that work on any page</h3>
      <div class="cols3" style="margin-top:8px">
        <div><div class="lab" style="color:${C.tomato}">Say what you see</div><p class="disp" style="font-size:17px;margin:3px 0">“Big red apple!”</p><p>Name what your child is looking at, in a few words.</p></div>
        <div><div class="lab" style="color:${C.tomato}">Pause and wait</div><p class="disp" style="font-size:17px;margin:3px 0">“Ready, set… (wait)”</p><p>Count to five in your head. Give your child room to take a turn.</p></div>
        <div><div class="lab" style="color:${C.tomato}">Add one word</div><p class="disp" style="font-size:17px;margin:3px 0">“Duck.” → “Yellow duck!”</p><p>Repeat what your child says and add one word.</p></div>
      </div></div>
    <div class="card t-plum" style="margin-top:14px"><h3>Every turn counts</h3><p>Talk, sing and read in the language you know best. A sign, a point, a look, a sound or a device tap all count as a turn. There’s no right answer on any page: if your child calls the frog a “duck,” say “A green frog! Ribbit!” and keep playing.</p></div>`, ctx, pn),
};
const guide2 = {
  id: 'guide2', html: (ctx, pn) => pageWrap('', `${textHead('Grown-up guide · 2 of 2', 'How the book works')}
    <div class="cols3" style="margin-top:14px">${['b1', 'b2', 'b3'].map(b => { const B = BANDS[b]; return `<div class="card" style="background:${B.t}"><span class="pill" style="background:${B.c};color:${B.on}">${B.label}</span><h3 style="margin-top:8px">${B.name}</h3><p>${B.blurb}</p><p style="margin-top:6px"><b>${count(ctx, a => a.band === b)} activities</b>, ${count(ctx, a => a.band === b && !a.cut && !a.usesPiecesOf)} with no cutting.</p></div>`; }).join('')}</div>
    <div class="card" style="margin-top:14px"><h3>Six talk moves you’ll see on the pages</h3><div class="cols3" style="margin-top:6px">${[['Say what you see', 'Name it in a few words.'], ['Pause and wait', 'Leave a gap for their turn.'], ['Repeat and add one word', 'Say it back, one step bigger.'], ['Offer a choice', '“This or that?” A point is an answer.'], ['Follow their lead', 'Talk about what they’re into.'], ['Sing and gesture', 'Tunes and moves make words stick.']].map(([h, t]) => `<div style="display:flex;gap:8px">${ui('u-talk')}<p><b>${h}.</b> ${t}</p></div>`).join('')}</div></div>
    <div class="cols2" style="margin-top:14px">
      <div class="card t-sky"><h3>Make it easier, make it harder</h3><p>Every page has both, so one page grows with your child. If a page is a struggle, pick “easier” or save it for later. If it’s too easy, try “harder,” or move to the next band.</p></div>
      <div class="card t-sun"><h3>The tired-grown-up version</h3><p>Every page has a 2-minute version with no setup, for days when you have nothing left. Two minutes of play together still counts.</p></div>
    </div>
    <div class="card t-grass" style="margin-top:14px"><h3>A good fit for screen-free moments</h3><p>Waiting for dinner, a rainy afternoon, a slow morning, a doctor’s waiting room: pick a page, sit together and play. Nothing to charge, nothing to switch off.</p></div>
    <div class="card" style="margin-top:14px;border:1.5px solid var(--line);background:#fff"><p><b>Every child grows at their own pace.</b> The ages in this book are starting points, not deadlines, and no page is a test. If you have questions about your child’s development, your pediatrician is the best person to ask. This book is parent education and play ideas, not medical or developmental advice.</p></div>`, ctx, pn),
};

// ---------------- 5. how to read a page ----------------
const howToRead = {
  id: 'read', html: (ctx, pn) => {
    const a = ctx.acts.find(x => x.id === 'same-toys');
    const mini = activityPage(a, ctx, ctx.actPage[a.id]).replace('<section class="page', '<div class="mini').replace(/<\/section>$/, '</div>');
    const s = 0.62;
    const pts = [[20, 30, 'Age band and starting age', 'A color and a word label, so you never rely on color alone.'], [560, 30, 'Cut or no-cut', 'No-cut pages are ready today. Cut pages point to their piece sheet.'], [20, 100, 'Title and how to play', 'One or two sentences. That’s all the instructions you need.'], [340, 400, 'The play area', 'Big, calm pictures for your child to point at, pat and place pieces on.'], [20, 740, 'Talk while you play', 'One line to say out loud, and the talk move it uses.'], [20, 810, 'Easier, harder, tired version', 'Three ways to play the same page, including a 2-minute one.'], [20, 880, 'Prep, mess, needs, safety', 'Honest prep time, what you need and the safety note for this page.']];
    return pageWrap('', `${textHead('How to read a page', 'Every page works the same way')}
      <div style="position:absolute;left:0;top:92px;width:${696 * s}px;height:${960 * s}px;border-radius:14px;box-shadow:0 0 0 1.5px #D5DCE8;overflow:hidden"><div style="transform:scale(${s});transform-origin:0 0">${mini}</div>
        ${pts.map(([x, y], i) => `<span class="callout" style="left:${x * s - 4}px;top:${y * s - 6}px">${i + 1}</span>`).join('')}</div>
      <ul class="legend" style="position:absolute;left:${696 * s + 22}px;right:0;top:100px">${pts.map(([, , h, t], i) => `<li><span class="num">${i + 1}</span><span><b>${h}.</b> ${t}</span></li>`).join('')}</ul>
      <div class="card t-sun" style="position:absolute;left:0;right:0;bottom:40px"><p><b>Piece sheets</b> come right after their activity page. Each piece shows the page it belongs to in its corner (for example “p.${ctx.actPage[a.id]}”), so strays always find their way home.</p></div>`, ctx, pn);
  },
};

// ---------------- 6. safety ----------------
const safety = {
  id: 'safety', html: (ctx, pn) => pageWrap('', `${textHead('Safety first', 'Our play safety rules', 'Every page in this book follows these rules. Please read them once before you start.')}
    <div style="display:grid;grid-template-columns:1.05fr 1fr;gap:16px;margin-top:18px">
      <div class="card t-grass" style="display:flex;gap:14px;align-items:center"><svg width="130" height="170" viewBox="-65 -85 130 170"><use href="#b-tube" transform="scale(1.3)"/></svg><div><h3>The toilet-paper-tube test</h3><p>For children under 3, nothing small enough to fit through a toilet-paper tube (about 1.25 in / 3.2 cm across). <b>Every cut piece in this book is 2 in (5.1 cm) or bigger</b> on its shortest side, and the pieces for 1–2 years are 2.5 in (6.3 cm) or bigger.</p></div></div>
      <div class="card t-sun"><h3>Grown-up keeps the pieces</h3><p>Count pieces out and back in. Store them in a pouch or envelope that the grown-up keeps. Throw away any piece that tears, bends, gets wet or peels.</p></div>
    </div>
    <div class="cols3" style="margin-top:14px">
      <div class="card"><h3>Always together</h3><p>Every activity is played with a grown-up right there. Paper and pieces are for hands, not mouths.</p></div>
      <div class="card"><h3>Velcro rules</h3><p><b>No loose velcro dots for under-3s:</b> for 1–2 and 2–3 pages, lay pieces on top. For 3–5 pages velcro is optional: <b>check dots before each play</b> and keep pieces away from younger children.</p></div>
      <div class="card"><h3>Laminated edges</h3><p>Leave a small border when you cut laminated pieces and round the corners so edges stay soft.</p></div>
      <div class="card"><h3>Crayons and pens</h3><p>Dry-erase crayons are for the 3–5 pages, with a grown-up. The grown-up keeps caps, which are small.</p></div>
      <div class="card"><h3>Pretend food only</h3><p>The food pages are pictures. No real food is part of any activity, and none of the pictured foods are small, hard or round snacks.</p></div>
      <div class="card"><h3>Nothing else to add</h3><p>No balloons, beads, buttons, coins, strings or cords are used or needed anywhere in this book.</p></div>
    </div>
    <div class="card t-plum" style="margin-top:14px"><p><b>Real toys?</b> A few pages suggest a real toy (a ball, a toy car, a box). For under-3s, any real toy must pass the tube test and have no small parts that come off. If you’re ever unsure, leave it out: the page works without it.</p></div>`, ctx, pn),
};

// ---------------- 7. build it ----------------
const buildIt = {
  id: 'build', html: (ctx, pn) => pageWrap('', `${textHead('Assembly guide', 'Build your busy book three ways', 'Pick the one that fits your week. You can start with the quick one today and upgrade later.')}
    <div class="cols3" style="margin-top:18px">${[
      ['Quick: no laminator', 'b-binder', C.tSky, ['Print pages on cardstock (or plain paper).', 'Slide each page into a clear sheet protector.', 'Keep pages in a 1–1.5 in 3-ring binder.', 'Pieces go in a zip pouch clipped to the binder.'], 'About 15 minutes for 10 pages.'],
      ['Classic: laminated', 'b-laminator', C.tSun, ['Print on cardstock and laminate (3–5 mil pouches).', 'Cut pieces with a small clear border; round corners.', 'Punch holes and use binder rings or a binder.', 'One labeled pouch per piece sheet.'], 'Pieces last for months of play.'],
      ['Velcro: ages 3–5 only', 'b-velcro', C.tTomato, ['Laminate first, then add dots.', 'Soft (loop) dot on the page, scratchy (hook) dot on the piece.', 'Press firmly; let dots set overnight.', 'Check dots before each play. No velcro for under-3s.'], 'Use only for the 3–5 pages.'],
    ].map(([h, id, t, steps, note]) => `<div class="card" style="background:${t}"><svg width="100%" height="110" viewBox="-100 -55 200 110"><use href="#${id}" transform="scale(1.05)"/></svg><h3>${h}</h3><ol>${steps.map(s => `<li>${s}</li>`).join('')}</ol><p class="small" style="margin-top:6px">${note}</p></div>`).join('')}</div>
    <div class="cols2" style="margin-top:14px">
      <div class="card"><h3>Handy supplies</h3><ul><li>Cardstock, 65–110 lb (176–300 gsm)</li><li>Scissors or a paper trimmer (straight cuts only)</li><li>Sheet protectors or a laminator (optional)</li><li>Binder or binder rings, and zip pouches</li><li>Velcro dots for the 3–5 pages (optional)</li></ul></div>
      <div class="card t-grass"><h3>Organize by age</h3><p>Use one binder cover per child or per age band (4 colors on pages ${ctx.actPage['x-cov1']}–${ctx.actPage['x-cov4']}). Tape a pouch label to each pouch (page ${ctx.actPage['x-pouch']}). Keep 5–8 pages in the binder and rotate the rest each week with the planner on page ${ctx.actPage['x-plan1']}.</p></div>
    </div>`, ctx, pn),
};
const laminate = {
  id: 'lam', html: (ctx, pn) => pageWrap('', `${textHead('Laminating & velcro tips', 'Make it last')}
    <div class="cols2" style="margin-top:16px">
      <div class="card t-sky"><h3>Laminating</h3><ul><li>Use 3–5 mil pouches. Thicker pouches make stiffer pieces that little hands grip easily.</li><li>Laminate the whole sheet first, then cut. Leave about 1/8 in (3 mm) of clear border so the seal holds.</li><li>Round every corner with scissors or a corner rounder.</li><li>No laminator? Clear sheet protectors work for pages; packing tape over both sides works for a few pieces.</li><li>Wipe pages with a damp cloth. Let them dry flat.</li></ul></div>
      <div class="card t-tomato"><h3>Velcro (3–5 pages only)</h3><ul><li>Soft “loop” dots go on the page; scratchy “hook” dots go on the back of pieces.</li><li>Put the dot in the middle of the slot so pieces sit straight.</li><li>Press for 30 seconds and let dots set overnight before play.</li><li><b>Check dots before each play.</b> Throw away any piece whose dot lifts at the edge.</li><li><b>Never</b> on 1–2 or 2–3 pages: lay those pieces on top instead.</li></ul></div>
    </div>
    <div class="cols3" style="margin-top:14px">
      <div class="card"><h3>Dry-erase</h3><p>Mazes and road pages work with a dry-erase crayon on laminated pages. Wipe with a dry cloth. The grown-up keeps caps.</p></div>
      <div class="card"><h3>Storage</h3><p>One zip pouch per piece sheet, labeled with its page number. Every piece also shows its page in the corner.</p></div>
      <div class="card"><h3>Save ink</h3><p>Print the Low-ink file for pages you want to color, and for piece sheets you’ll laminate anyway.</p></div>
    </div>
    <div class="card t-sun" style="margin-top:14px"><p><b>Worn out?</b> That means it was loved. Reprint just that page: the files are yours to print again for your own home.</p></div>`, ctx, pn),
};
const printing = {
  id: 'print', html: (ctx, pn) => pageWrap('', `${textHead('Printing tips', 'Print only what you need')}
    <div class="cols2" style="margin-top:16px">
      <div class="card"><h3>Pick your file</h3><ul><li><b>US Letter</b> (8.5 × 11 in) or <b>A4</b> (210 × 297 mm): same pages, same piece sizes.</li><li><b>Color</b> for bright pages. <b>Low-ink</b> for white pages with colorable line art.</li><li>The make-your-own pages can be typed into in a free PDF reader before printing.</li></ul></div>
      <div class="card"><h3>Printer settings</h3><ul><li>Print at <b>100% / actual size</b>. “Fit to page” shrinks pieces.</li><li>Single-sided only: pieces and pages need blank backs.</li><li>Print a page range (for example ${ctx.actPage['x-div-b1']}–${ctx.actPage['x-div-b1'] + 8}) instead of the whole book.</li></ul></div>
      <div class="card t-sun"><h3>Paper</h3><p>Cardstock (65–110 lb / 176–300 gsm) for pieces and anything you’ll handle a lot. Plain paper is fine for no-cut pages in sheet protectors.</p></div>
      <div class="card t-sky"><h3>Home or print shop</h3><p>Home printers are perfect. For a sturdy set, a local print shop can print on cardstock and laminate; take the file on a USB stick and ask for “actual size.”</p></div>
    </div>
    <div class="card" style="margin-top:14px"><h3>Check your size</h3><div style="display:flex;gap:18px;align-items:center;margin-top:6px"><div style="width:192px;height:192px;border:2px dashed ${C.ink};border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;text-align:center;flex:none">This square is<br>2 in / 5.1 cm<br>on each side</div><p>Measure this square after printing. If it’s smaller than 2 in (5.1 cm), your printer is scaling the page: choose 100% or actual size and print again. The pieces rely on it.</p></div></div>`, ctx, pn),
};

// ---------------- page finder ----------------
function finderRows(ctx, bands) {
  return bands.map(b => `<tr class="bh band-${b}"><td colspan="5">${BANDS[b].label} · ${BANDS[b].name}</td></tr>` + ctx.acts.filter(a => a.band === b).map(a => `<tr><td class="ck"><span class="box12"></span></td><td class="pg">${ctx.actPage[a.id]}</td><td><b>${a.title}</b></td><td class="cutc">${a.cat}</td><td class="cutc">${a.cut ? `cut · p.${ctx.sheetPage[a.id]}` : a.usesPiecesOf ? `cards p.${ctx.sheetPage[a.id]}` : 'no cut'} · ${monthsLabel(a.from)}</td></tr>`).join('')).join('');
}
const finder1 = { id: 'find1', html: (ctx, pn) => pageWrap('', `${textHead('Page finder · 1 of 2', 'Every activity, by age')}<p class="small" style="margin:4px 0 8px">Tick the pages you’ve played. Stars go on the favorites.</p><table class="tbl">${finderRows(ctx, ['b1', 'b2'])}</table>`, ctx, pn) };
const finder2 = { id: 'find2', html: (ctx, pn) => pageWrap('', `${textHead('Page finder · 2 of 2', 'Every activity, by age')}<table class="tbl" style="margin-top:10px">${finderRows(ctx, ['b3'])}</table>
  <table class="tbl" style="margin-top:14px"><tr class="bh"><td colspan="3">Also inside</td></tr>${[['Binder covers (4 colors), spine and pouch labels', ctx.actPage['x-cov1'] + '–' + ctx.actPage['x-pouch']], ['Make your own pages (fillable)', ctx.actPage['x-own1'] + '–' + ctx.actPage['x-own5']], ['Weekly busy-book planner (Monday and Sunday starts)', ctx.actPage['x-plan1'] + '–' + ctx.actPage['x-plan4']], ['Busy Book Star certificate', ctx.actPage['x-cert']], ['Answer key', ctx.actPage['x-answers']], ['Quick answers', ctx.actPage['x-faq']]].map(([t, p]) => `<tr><td class="pg" style="width:60px">${p}</td><td colspan="2"><b>${t}</b></td></tr>`).join('')}</table>`, ctx, pn) };

const copyright = {
  id: 'copy', html: (ctx, pn) => pageWrap('', `${textHead('The small print', 'License, copyright and version')}
    <div class="cols2" style="margin-top:16px">
      <div class="card"><h3>Your license</h3><p>Thank you for buying this book. It’s licensed for use in <b>your own home</b>: print as many copies as your family needs. Please don’t share, resell, post or upload the files.<span class="site-only"> Child-care and classroom licenses: playbeforepixels.com/licenses.</span></p></div>
      <div class="card"><h3>Parent education</h3><p>This book is parent education and play ideas. It is not medical, developmental or professional advice and doesn’t diagnose, treat or prevent anything. Every play follows our published safety rules (page ${ctx.actPage['x-safety']}); a grown-up is always part of play.</p></div>
    </div>
    <div class="card t-sky" style="margin-top:14px"><h3>Copyright</h3><p>${COPYRIGHT} All rights reserved. The characters and art belong to the Play Before Pixels family of products, including the Up! Go! More! talk-along board book.</p><p style="margin-top:6px"><b>${VERSION}.</b> If we improve this file, we’ll tell past buyers what changed; we never swap a file quietly.</p></div>
    <div class="card" style="margin-top:14px;display:flex;align-items:center;gap:18px"><img src="${ctx.rel}brand/logo/lockup-horizontal.svg" style="height:44px"><p>Play Before Pixels makes calm, paper-first play for families: talk, touch and play first; fewer screens, more back-and-forth.<span class="url"> playbeforepixels.com</span></p></div>`, ctx, pn),
};

// ---------------- covers (4 colorways), spine labels, pouch labels ----------------
const COLORWAYS = [['tomato', C.tomato, C.tTomato, '#FFFFFF'], ['sky', C.sky, C.tSky, '#FFFFFF'], ['grass', C.grass, C.tGrass, '#FFFFFF'], ['plum', C.plum, C.tPlum, '#FFFFFF']];
const coverPage = (i) => ({
  id: 'cov' + (i + 1), html: (ctx, pn) => {
    const [name, c, t] = COLORWAYS[i];
    const art = [['w-duck', 'b-apple', 'w-ball'], ['b-fish', 'w-star', 'a-car'], ['b-frog', 'a-leaf', 'b-bus'], ['b-teddy', 'w-moon', 'b-s-heart']][i];
    return `<section class="page band-n"><div class="live">
      <div class="cover-bg" style="background:${c}"></div>
      <div style="position:absolute;left:40px;top:40px;right:40px;display:flex;justify-content:space-between;align-items:center"><img src="${ctx.rel}brand/logo/lockup-horizontal-reverse.svg" style="height:34px"><span class="chip">Binder cover · ${name}</span></div>
      <div style="position:absolute;left:40px;right:40px;top:150px;text-align:center;color:#fff"><div class="hand" style="font-size:40px">my</div><h1 style="font-size:92px;color:#fff">Busy Book</h1></div>
      <svg class="board" style="position:absolute;left:48px;top:370px" width="600" height="300" viewBox="0 0 600 300">${art.map((id, k) => `<circle cx="${110 + k * 190}" cy="150" r="96" fill="${t}"/>` + `<use href="#${id}" transform="translate(${110 + k * 190},150) scale(1.3)" ${id === 'b-s-heart' ? `style="--sf:${C.tomato}"` : ''}/>`).join('')}</svg>
      <div style="position:absolute;left:90px;right:90px;top:720px;background:#fff;border-radius:22px;padding:18px 24px"><div class="lab">This busy book belongs to</div><div data-field="cover_name" class="kid" style="height:54px;font-size:36px;border-bottom:2px dashed #C9D1DE;margin-top:4px"></div><div class="small" style="margin-top:6px">Type a name here before printing, or write it by hand.</div></div>
      <div style="position:absolute;left:0;right:0;bottom:28px;text-align:center;color:#fff;font-size:10px;font-weight:700;opacity:.85">Slide into a clear-view binder · ${VERSION}</div>
    </div></section>`;
  },
});
const spinePage = {
  id: 'spine', html: (ctx, pn) => pageWrap('', `${textHead('Labels', 'Binder spine labels')}<p class="small" style="margin-top:4px">Cut the strip that fits your binder spine: 1 in, 1.5 in or 2 in. Type a name in the white box first if you like.</p>
    <div style="position:absolute;left:0;right:0;top:120px;display:flex;gap:18px;justify-content:center">${[[1, 0], [1.5, 1], [2, 2], [1.5, 3]].map(([w, k]) => { const [, c] = COLORWAYS[k]; return `<div style="width:${w * 96}px;height:760px;background:${c};border:1.5px dashed #7F8BA3;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:18px 0"><img src="${ctx.rel}brand/logo/mark-small-white.svg" style="width:${Math.min(w * 96 - 30, 44)}px"><div style="writing-mode:vertical-rl;transform:rotate(180deg);color:#fff;font-family:'Bricolage Grotesque';font-weight:800;font-size:${18 + w * 8}px;white-space:nowrap">Busy Book</div><div data-field="spine_name" style="width:${w * 96 - 16}px;height:140px;background:#fff;border-radius:8px"></div><div style="color:#fff;font-size:10px;font-weight:800">${w} in</div></div>`; }).join('')}</div>`, ctx, pn),
};
const pouchPage = {
  id: 'pouch', html: (ctx, pn) => pageWrap('', `${textHead('Labels', 'Pouch labels')}<p class="small" style="margin-top:4px">One label per pouch of pieces. Type or write the page number and name, then tape the label to a zip pouch. Each label is 3.5 × 2 in.</p>
    <div style="position:absolute;left:12px;top:118px;display:grid;grid-template-columns:336px 336px;">${Array.from({ length: 8 }, (_, i) => { const [, c, t] = COLORWAYS[i % 4]; return `<div style="width:336px;height:192px;border:1.2px dashed #7F8BA3;padding:12px;background:#fff"><div style="height:100%;border-radius:14px;background:${t};padding:12px 14px;display:flex;flex-direction:column;gap:6px"><div style="display:flex;justify-content:space-between;align-items:center"><span class="pill" style="background:${c};color:#fff">Pieces for page</span><span data-field="pouch_page" style="width:70px;height:28px;background:#fff;border-radius:8px;display:inline-block"></span></div><div data-field="pouch_name" style="height:34px;background:#fff;border-radius:8px"></div><div style="display:flex;justify-content:space-between;font-size:11px;font-weight:800;align-items:center"><span>Pieces: <span data-field="pouch_count" style="width:46px;height:24px;background:#fff;border-radius:6px;display:inline-block;vertical-align:middle"></span></span><span>Grown-up keeps these</span></div></div></div>`; }).join('')}</div>`, ctx, pn),
};

// ---------------- band dividers ----------------
const LOVES = {
  b1: ['Pointing, patting and “again!”', 'Animal sounds and silly voices', 'One big picture at a time', 'Songs with moves', 'Hiding and finding (peekaboo!)'],
  b2: ['Matching and sorting', 'Colors, shapes and pairs', 'Pretend play: cooking, dressing up, driving', '“In, on, under” and other little words', 'Doing it “by myself”'],
  b3: ['Mazes and roads for a finger or crayon', 'Counting, patterns and first-next-last stories', 'Bigger pretend play: shop, café, post office', 'Rhymes and “which one is different?”', 'Being the one who explains'],
};
function divider(band, list) {
  const B = BANDS[band];
  const scene = { b1: ['A', 'G4', 'w-ball'], b2: ['C', 'G1', 'w-blocks'], b3: ['E', 'G3', 'a-rocket'] }[band];
  return {
    id: 'div-' + band, html: (ctx, pn) => `<section class="page band-${band}"><div class="live">
      <div class="cover-bg bgfill" style="background:${B.t}"></div>
      <div style="position:absolute;left:40px;top:40px;right:40px"><span class="pill" style="font-size:16px;height:32px;padding:0 16px">${B.label}</span><h1 style="font-size:72px;margin-top:18px">${B.name}</h1><p style="font-size:17px;font-weight:700;margin-top:10px;max-width:560px;line-height:1.4">${B.blurb}</p></div>
      <svg class="board" style="position:absolute;left:0;top:250px" width="696" height="320" viewBox="0 0 696 320"><circle cx="348" cy="200" r="150" fill="${B.c}" opacity=".9"/>${adultAt(scene[1], 430, 320, 1.25, { legs: 'kneel', y: 320 - 51 * 1.25, flip: true, face: 'laugh', aR: -40 })}${kidAt(scene[0], 290, 320, 1.7, { face: 'laugh', aR: -100 })}${U(scene[2], 180, 270, 0.7)}</svg>
      <div style="position:absolute;left:40px;right:40px;top:600px;display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div class="card" style="background:#fff"><h3>What this age often loves</h3><ul>${LOVES[band].map(l => `<li>${l}</li>`).join('')}</ul></div>
        <div class="card" style="background:#fff"><h3>In this section</h3><p><b>${list.length} activities</b> · ${list.filter(a => !a.cut && !a.usesPiecesOf).length} no-cut pages · starting from ${monthsLabel(B.from).replace('from ', '')}.</p><p style="margin-top:6px">Start with whatever your child is into today. Skip anything that isn’t fun yet, and come back later.</p></div>
      </div>
      <div class="card" style="position:absolute;left:40px;right:40px;bottom:44px;background:#fff;border:1.5px solid var(--line)"><p style="font-size:11.5px"><b>Every child grows at their own pace.</b> Ages are starting points, not deadlines. Questions about your child’s development? Your pediatrician is the best person to ask.</p></div>
      ${footer(ctx, pn)}
    </div></section>`,
  };
}

// ---------------- back matter ----------------
const people = [['Mama', 'A'], ['Dada', 'G1'], ['Grandma', 'G4'], ['Grandpa', 'G3'], ['me!', 'C'], ['our dog', 'dog']];
const peoplePage = (filled) => ({
  id: filled ? 'own1' : 'own2', html: (ctx, pn) => pageWrap('', `${header('b1', 'Make your own · first words', `<span class="tag">${ui('u-nocut')}${filled ? 'Example' : 'Fillable'}</span>`)}
    <div class="tt"><h1>My people</h1><p class="how"><b>${filled ? 'Tape a photo in each frame.' : 'Type the names, print, then tape in photos.'}</b> ${filled ? 'Photos of family and friends are some of the best first words there are.' : 'Use any names your family uses: Mom, Ima, Abuela, Nonno, Auntie, our cat…'}</p></div>
    <div class="play" style="height:640px"><div style="position:absolute;left:24px;top:24px;display:grid;grid-template-columns:repeat(3,200px);gap:24px 24px">${people.map(([n, k]) => `<div style="height:280px;background:#fff;border-radius:18px;padding:12px;display:flex;flex-direction:column;gap:10px"><div style="flex:1;border:2px dashed #C9D1DE;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:4px;color:#9AA6BC;font-size:11px;font-weight:800">${filled ? `<svg width="120" height="120" viewBox="-60 -60 120 120">${k === 'dog' ? U('w-dog', 0, 6, 0.95) : `<g transform="translate(0,6)">${head(BB.KIDS[k] ? k : 'A', 0, 0, 1.7, 'smile').replace(/--sk:[^;]+;--hr:[^;]+;/, BB.ADULTS[k] ? `--sk:${BB.ADULTS[k].skin};--hr:${BB.ADULTS[k].hair};` : '$&')}</g>`}</svg>` : ''}photo here</div><div data-field="person" class="kid" style="height:36px;font-size:26px;text-align:center;line-height:36px">${filled ? n : ''}</div></div>`).join('')}</div></div>
    <div class="gu" style="top:772px"><div class="talk">${ui('u-talk')}<div><span class="lab">Talk while you play <i>· Say what you see</i></span><q>“Who’s that? It’s Grandma! Hi, Grandma! (wave)”</q></div></div>
    <div class="safe">${ui('u-shield')}<span><b>Play together.</b> Photos stay taped flat under the lamination or sheet protector. No pins, clips or loose photo corners for under-3s.</span></div></div>`, ctx, pn, 'b1'),
});
const wordsPage = {
  id: 'own3', html: (ctx, pn) => pageWrap('', `${header('b2', 'Make your own · first words', `<span class="tag">${ui('u-nocut')}Fillable</span>`)}
    <div class="tt"><h1>Our words</h1><p class="how"><b>Type or write a word your child loves</b>, then draw it, stick a picture from a magazine, or tape a photo above it.</p></div>
    <div class="play" style="height:640px"><div style="position:absolute;left:24px;top:24px;display:grid;grid-template-columns:repeat(3,200px);gap:24px">${Array.from({ length: 6 }, () => `<div style="height:280px;background:#fff;border-radius:18px;padding:12px;display:flex;flex-direction:column;gap:10px"><div style="flex:1;border:2px dashed #C9D1DE;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#9AA6BC;font-size:11px;font-weight:800">draw or stick it here</div><div data-field="word" class="kid" style="height:36px;font-size:26px;text-align:center;line-height:36px;border-bottom:2px solid #E3E8F0"></div></div>`).join('')}</div></div>
    <div class="gu" style="top:772px"><div class="talk">${ui('u-talk')}<div><span class="lab">Talk while you play <i>· Repeat and add one word</i></span><q>“Truck! Big truck. Big red truck!”</q></div></div>
    <div class="safe">${ui('u-shield')}<span><b>Play together.</b> Glue and stickers are for grown-up hands on this page; let it dry before little ones play.</span></div></div>`, ctx, pn, 'b2'),
};
const blankBoard = {
  id: 'own4', html: (ctx, pn) => pageWrap('', `${header('b2', 'Make your own · matching board', `<span class="tag">${ui('u-scissors')}Pieces on page ${pn + 1}</span>`)}
    <div class="tt"><h1>Our matching game</h1><p class="how"><b>Draw the same picture twice:</b> once in a box here and once on the matching card on the next page. Type labels first if you like.</p></div>
    <div class="play" style="height:560px"><div style="position:absolute;left:12px;top:40px;display:grid;grid-template-columns:repeat(3,${CELL.w}px);gap:36px 12px">${Array.from({ length: 6 }, () => `<div style="width:${CELL.w}px;height:${CELL.h}px;background:#fff;border:2px dashed #9AA6BC;border-radius:14px;position:relative"><div data-field="board_label" class="kid" style="position:absolute;left:14px;right:14px;bottom:10px;height:28px;text-align:center;font-size:18px;line-height:28px"></div></div>`).join('')}</div></div>
    <div class="gu" style="top:692px"><div class="talk">${ui('u-talk')}<div><span class="lab">Talk while you play <i>· Follow their lead</i></span><q>“You drew a cat! Where’s the other cat?”</q></div></div>
    <div class="row3"><div class="box"><span class="lab">Make it easier</span>Draw just two or three pairs.</div><div class="box"><span class="lab">Make it harder</span>Your child draws; you guess, then match.</div><div class="box tired"><span class="lab">Tired? 2-minute version</span>Draw one picture together. Done.</div></div>
    <div class="safe">${ui('u-shield')}<span><b>Play together.</b> Grown-up keeps the pieces. Pieces are 2 in (5.1 cm) or bigger. No velcro dots for under-3s.</span></div></div>`, ctx, pn, 'b2'),
};
const blankPieces = {
  id: 'own5', html: (ctx, pn) => {
    const g = pieceGrid(Array.from({ length: 12 }, () => ({ raw: () => '', tint: '#FFFFFF' })), CELL, 3, 'p.' + (pn - 1));
    return pageWrap('sheet', `${header('b2', 'Make your own · pieces', `<span class="tag">${ui('u-scissors')}12 blank cards</span>`)}
    <div class="tt"><h1 style="font-size:23px">Blank cards for your own games</h1></div>
    <div class="cutnote">${ui('u-scissors')}<span>Draw, stick or type, then cut on the dashed lines. Every card is 2.25 × 2 in (5.7 × 5.1 cm).</span></div>
    <div class="grid" style="top:104px;position:absolute">${g.svg}${Array.from({ length: 12 }, (_, i) => `<div data-field="card_label" class="kid" style="position:absolute;left:${(i % 3) * CELL.w + 20}px;top:${Math.floor(i / 3) * CELL.h + CELL.h - 44}px;width:${CELL.w - 40}px;height:26px;text-align:center;font-size:17px"></div>`).join('')}</div>
    <div class="keep">${ui('u-shield')}<div class="big">Grown-up keeps<br>the pieces</div><p>Count pieces out and back in; store them in a labeled pouch. No velcro dots for under-3s.</p></div>`, ctx, pn, 'b2');
  },
};
const DAYS_M = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAYS_S = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const planPage = (sunday, filled, k) => ({
  id: 'plan' + k, html: (ctx, pn) => {
    const days = sunday ? DAYS_S : DAYS_M;
    const ex = { Monday: ['same-toys', '“Ball! Same ball!”'], Tuesday: ['moo', '“The cow says… moo!”'], Wednesday: ['w-up', '“Up… up… UP!”'], Thursday: ['same-toys', 'Again! Favorites repeat.'], Friday: ['peekhouse', '“Where’s dog? Peekaboo!”'], Saturday: ['drum', '“Boom! Boom!”'], Sunday: ['teddy', '“Toast for Teddy? Yum!”'] };
    const cell = (d, i) => filled ? (i === 0 ? `${ctx.acts.find(a => a.id === ex[d][0]).title.replace(/^First words: /, '')} · p.${ctx.actPage[ex[d][0]]}` : ex[d][1]) : '';
    return pageWrap('', `${header('b1', 'Weekly planner', `<span class="tag">${sunday ? 'Sunday start' : 'Monday start'} · ${filled ? 'example' : 'fillable'}</span>`)}
    <div class="tt"><h1>This week’s busy book</h1><p class="how">${filled ? 'An example week for a 1–2-year-old: three or four pages, lots of repeats.' : 'Pick 3–5 pages for the week. Repeats are great. Type in before printing, or write by hand.'}</p></div>
    <table class="plan" style="position:absolute;top:112px;left:0;right:0"><tr><th></th><th>Page to play</th><th>Talk line to try</th><th>Played?</th></tr>${days.map(d => `<tr><td>${d}</td><td><span class="fl" data-field="plan_page">${cell(d, 0)}</span></td><td><span class="fl" data-field="plan_talk">${cell(d, 1)}</span></td><td><span class="tick"></span></td></tr>`).join('')}</table>
    <div class="card t-grass" style="position:absolute;left:0;right:0;bottom:36px;display:flex;gap:14px;align-items:center"><div><h3>Rotate, don’t rush</h3><p>Keep this week’s pages in the binder and the rest on a shelf. Next week, swap two pages and keep the favorites.</p></div><div style="flex:none;width:250px"><div class="lab">Our favorite page this week</div><div data-field="plan_fav" class="field" style="height:30px;margin-top:4px">${filled ? `<span class="kid" style="font-size:17px">Same, same! Toys</span>` : ''}</div></div></div>`, ctx, pn, 'b1');
  },
});
const cert = {
  id: 'cert', html: (ctx, pn) => `<section class="page band-n"><div class="live">
    <div class="cover-bg" style="background:${C.tSun};border:10px solid ${C.sun}"></div>
    <div style="position:absolute;left:50px;right:50px;top:60px;text-align:center">
      <svg width="180" height="180" viewBox="-90 -90 180 180" style="margin:0 auto"><circle r="86" fill="${C.sun}"/><path d="${require('./lib.js').star(62, 27)}" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/></svg>
      <div class="hand" style="font-size:34px;color:${C.tomato};margin-top:14px">hooray for</div>
      <div data-field="cert_name" class="kid" style="height:78px;font-size:54px;line-height:78px;border-bottom:3px dashed ${C.sun};margin:6px 40px 0"></div>
      <h1 style="font-size:64px;margin-top:22px">Busy Book Star</h1>
      <p style="font-size:17px;font-weight:700;margin-top:12px">for playing, pointing, matching and talking together!</p>
    </div>
    <svg class="board" style="position:absolute;left:98px;top:560px" width="500" height="150" viewBox="0 0 500 150">${['w-duck', 'b-apple', 'w-ball', 'b-frog', 'w-star'].map((id, i) => `<circle cx="${50 + i * 100}" cy="75" r="44" fill="#FFFFFF"/><use href="#${id}" transform="translate(${50 + i * 100},75) scale(.62)"/>`).join('')}</svg>
    <div style="position:absolute;left:60px;right:60px;top:740px;display:grid;grid-template-columns:1fr 1fr;gap:26px">
      <div><div class="lab">Favorite page</div><div data-field="cert_fav" class="field" style="height:34px;margin-top:4px"></div></div>
      <div><div class="lab">Date</div><div data-field="cert_date" class="field" style="height:34px;margin-top:4px"></div></div>
    </div>
    <div style="position:absolute;left:0;right:0;bottom:44px;display:flex;justify-content:center;align-items:center;gap:10px"><img src="${ctx.rel}brand/logo/lockup-horizontal.svg" style="height:26px"><span class="url" style="font-weight:800;font-size:12px">playbeforepixels.com</span></div>
    <div style="position:absolute;left:0;right:0;bottom:14px;text-align:center;font-size:9px;color:#5B6780">Snap a photo for the fridge or the grandparents. ${VERSION}</div>
  </div></section>`,
};
const answers = {
  id: 'answers', html: (ctx, pn) => {
    const mz = MAZES.map((z, i) => `<div style="text-align:center"><svg width="150" height="118" viewBox="0 0 672 516" style="background:${C.tTomato};border-radius:10px">${mazeSvg(z.m, { w: 672, h: 516 }, { edge: C.tomato + '55', solution: true })}</svg><div class="small"><b>p.${ctx.actPage[z.id]}</b> ${z.title}</div></div>`).join('');
    const ans = ctx.acts.filter(a => a.answer).map(a => `<tr><td class="pg">${ctx.actPage[a.id]}</td><td><b>${a.title}</b></td><td>${a.answer}</td></tr>`).join('');
    return pageWrap('', `${textHead('Answer key', 'Peek only if you need to')}<p class="small" style="margin-top:4px">There’s no wrong way to play. These are here for grown-ups who like to check.</p>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px 8px;margin-top:14px">${mz}</div>
      <table class="tbl" style="margin-top:16px">${ans}</table>`, ctx, pn);
  },
};
const faq = {
  id: 'faq', html: (ctx, pn) => pageWrap('', `${textHead('Quick answers', 'Questions, answered')}
    <div class="qa" style="margin-top:14px">${[
      ['What ages is it for?', `About 12 months to 5 years, in three bands (1–2, 2–3, 3–5). Every page shows its starting age in months. Move up or down freely.`],
      ['Do I have to cut everything?', `No. ${count(ctx, a => !a.cut && !a.usesPiecesOf)} activities need no cutting at all. Cut piece sheets when you have ten minutes; each has 12 straight cuts or fewer.`],
      ['Are the pieces safe for my toddler?', 'Every piece is 2 in (5.1 cm) or bigger, bigger than a toilet-paper tube. A grown-up plays along, keeps the pieces and checks them each time. No velcro dots for under-3s.'],
      ['Which file should I print?', 'US Letter or A4 to match your paper. Color for bright pages; Low-ink for white pages with colorable line art. Print at 100% / actual size.'],
      ['Can I type into the pages?', 'Yes: the make-your-own pages, binder covers, labels, planner and certificate have type-in boxes that work in free PDF readers. Type, save, then print.'],
      ['Do I need a laminator?', 'No. Sheet protectors or plain cardstock work well. Laminating just makes pieces last longer (tips on page ' + ctx.actPage['x-lam'] + ').'],
      ['Is anything shipped?', 'No, it’s a digital download. You print at home or at a print shop, as many copies as your own family needs.'],
      ['My child only wants one page. Is that OK?', 'Completely. Most children love two or three pages and repeat them. Try that page’s “harder” line when it feels easy.'],
      ['Is this therapy or a school program?', 'No. It’s play for families: pages to talk about together. It isn’t medical or professional advice. Questions about development go to your pediatrician.'],
      ['A file won’t open on my phone', '<span class="site-only">Download on a computer or tablet if you can. Help with downloads and printing: playbeforepixels.com/help.</span><span class="etsy-only">Etsy downloads work best in a web browser on a computer or tablet (the app can’t download files). Send us a message through the shop if you’re stuck.</span>'],
    ].map(([q, a]) => `<div><h4>${q}</h4><p>${a}</p></div>`).join('')}</div>`, ctx, pn),
};
const moreFrom = {
  id: 'more', html: (ctx, pn) => pageWrap('', `${textHead('More from Play Before Pixels', 'Next for your child’s age', 'Made to go together: the same friendly characters, the same talk-while-you-play idea.')}
    <div class="nextp" style="margin-top:18px">${[['board-up-go-more', 'Up! Go! More!', 'Our talk-along first-words book, ages 0–3. The first-words pages in this busy book come from it.'], ['guide-100-plays', '100 Screen-Free Plays', 'Plays for ages 0–5 with things you already have, sorted by age, each with a talk line.'], ['bored-play-cards', '150 “I’m Bored” Play Cards', 'Play ideas for ages 1–12, sorted by age and energy, with a talk prompt on every card.']].map(([slug, t, d]) => `<div class="np"><img src="${ctx.rel}products/${slug}/cover.png" alt=""><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
    <div class="card t-sky" style="margin-top:16px"><p><b>Find them</b> <span class="site-only">at playbeforepixels.com, where every product page shows “Next for your child’s age.”</span><span class="etsy-only">in the Play Before Pixels shop.</span> Printables download instantly; books are printed to order.</p></div>`, ctx, pn),
};
const bonus = {
  id: 'bonus', html: (ctx, pn) => pageWrap('', `<div class="site-only">${textHead('Your free bonus', 'One more thing: a free bonus', 'Get a free companion printable, <b>Busy Book Extras</b> (seasonal pages for the same age bands), plus a short monthly “play at this age” email.')}
    <div style="display:flex;gap:28px;align-items:center;margin-top:26px"><div style="background:#fff;border-radius:18px;padding:14px;box-shadow:0 0 0 2px #D5DCE8">${qrSvg(230)}</div>
      <div><div class="lab">Scan, or type the short link</div><p class="disp" style="font-size:24px;margin-top:6px">${BONUS}</p><p style="font-size:12.5px;line-height:1.45;margin-top:10px">We only ask for an email and your child’s birth month and year, so the ideas fit their age. We never ask for your child’s name. Unsubscribe any time.</p></div></div></div>
    <div class="etsy-only">${textHead('Thank you', 'Thank you for playing with us', 'We hope a few of these pages become favorites. If they do, a review in the shop helps other families find us.')}</div>
    <div class="card t-sun" style="margin-top:26px"><h3>Share the fun</h3><p>Snap a photo of your busy book or the Busy Book Star certificate and share it with friends and family. Sharing is always optional; please don’t share the files themselves.</p></div>
    <div style="position:absolute;left:0;right:0;bottom:60px;display:flex;justify-content:center"><img src="${ctx.rel}brand/logo/lockup-stacked.svg" style="height:120px"></div>`, ctx, pn),
};

const front = [cover, copyright, startHerePage, guide1, guide2, howToRead, safety, buildIt, laminate, printing, finder1, finder2];
const coversSection = [coverPage(0), coverPage(1), coverPage(2), coverPage(3), spinePage, pouchPage];
const back = [peoplePage(true), peoplePage(false), wordsPage, blankBoard, blankPieces, planPage(false, true, 1), planPage(true, true, 2), planPage(false, false, 3), planPage(true, false, 4), cert, answers, faq, moreFrom, bonus];

// START HERE file: a short standalone guide (Etsy file 1)
function startHere(ctx) {
  const pages = [cover, startHerePage, guide1, safety, buildIt, printing, faq];
  const files = `<section class="page band-n"><div class="live">${textHead('START HERE', 'What’s in your download', 'Five files. Open this one first, then print from the file that matches your paper.')}
    <table class="tbl" style="margin-top:16px;font-size:12px">${[['1', 'START HERE.pdf', 'This guide: quick start, grown-up guide, safety, assembly, printing and quick answers.'], ['2', 'Color · US Letter', `All ${ctx.pages} pages in color, 8.5 × 11 in.`], ['3', 'Color · A4', `All ${ctx.pages} pages in color, 210 × 297 mm.`], ['4', 'Low-ink · US Letter', 'White pages with colorable line art. Same pages, same piece sizes.'], ['5', 'Low-ink · A4', 'White pages with colorable line art, A4.']].map(([n, f, d]) => `<tr><td class="pg">${n}</td><td><b>${f}</b></td><td>${d}</td></tr>`).join('')}</table>
    <div class="card t-sun" style="margin-top:16px"><h3>Type-in pages</h3><p>In every main file, the binder covers, spine and pouch labels, make-your-own pages, weekly planners and certificate have type-in boxes. Open the file in a free PDF reader, type, save, then print.</p></div>
    <div class="card t-sky" style="margin-top:12px"><h3>Prep time</h3><p><b>0 minutes</b> for ${count(ctx, a => !a.cut && !a.usesPiecesOf)} pages. <b>5–10 minutes</b> for pages with pieces (12 straight cuts or fewer per sheet).</p></div>
    ${footer(ctx, 2)}</div></section>`;
  return pages.map((p, i) => i === 1 ? files + p.html(ctx, i + 2) : p.html(ctx, i + 1 + (i > 1 ? 1 : 0))).join('\n');
}

module.exports = { front, coversSection, back, divider, startHere, EXTRA_CSS };
