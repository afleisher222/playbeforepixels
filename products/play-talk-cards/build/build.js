// Build: node build/build.js
// Writes the printable HTML sources for both products (US Letter + A4, full color + ink-saver),
// the cover-only pages and the QR codes. render.js (called from render-all.js) turns them into PDFs/PNGs.
const fs = require('fs');
const path = require('path');
const QR = require('qrcode');
const K = require('./cards.js');
const { C, KIDS, ADULTS, kid, adult, use, SHAPE, ICONS } = require('./art.js');
const { BANDS, MOVES, PLAYS, MOMENTS, PROMPTS, HABITS, MESS, moLabel } = require('./content.js');
// Edition: 'store' (our site: URL + QR allowed) or 'etsy' (no URL, no QR: marketplace rule, BRAND customer-voice rule 2)
let ED = 'store';
const store = () => ED === 'store';

const ROOT = path.resolve(__dirname, '..');
const REPO = path.resolve(ROOT, '../..');
const GEN = path.join(__dirname, 'gen');
fs.mkdirSync(GEN, { recursive: true });

const SIZES = {
  letter: { name: 'US Letter', W: 816, H: 1056, css: '8.5in 11in', gx: 48, gy: 24 },
  a4: { name: 'A4', W: 794, H: 1123, css: '210mm 297mm', gx: 37, gy: 57.5 },
};
const LICENSE_URL = 'playbeforepixels.com/license';

const PRODUCTS = {
  A: {
    key: 'A', slug: 'play-talk-cards', dir: ROOT, pdfBase: 'play-talk-cards',
    title: '52 Play & Talk Cards', short: 'Play & Talk Cards', ages: '0–5', agesLong: 'Ages 0–5',
    kicker: 'Printable card deck · Ages 0–5', sub: 'One play and one talk tip on every card, for babies, toddlers and preschoolers.',
    deck: K.DECK_A, card: K.cardA, back: K.backA, color: C.sun, tint: C.tSun, bonus: 'playbeforepixels.com/bonus/play-talk-cards',
  },
  B: {
    key: 'B', slug: 'family-talk-along-cards', dir: path.join(ROOT, 'talk-along'), pdfBase: 'family-talk-along-cards',
    title: '52 Family Talk-Along Cards', short: 'Family Talk-Along Cards', ages: '5–12', agesLong: 'Ages 5–12',
    kicker: 'Printable conversation cards · Ages 5–12', sub: 'Good questions for dinner, the car, bath time and bedtime.',
    deck: K.DECK_B, card: K.cardB, back: K.backB, color: C.sky, tint: C.tSky, bonus: 'playbeforepixels.com/bonus/family-talk-along-cards',
  },
};

// ---------- small helpers ----------
const esc = K.esc;
const check = col => `<svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="${col}"/><path d="M5.5 10.5l3 3 6-6.5" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const shapeSvg = K.shapeSvg;
function foot(P, n, total) {
  return `<div class="pfoot"><span>${esc(P.short)} · ${P.agesLong} · page ${n} of ${total} · ${K.VERSION}${store() ? ' · <b>playbeforepixels.com</b>' : ''}</span><span>${K.COPY} Personal/family license: no resale or sharing.</span></div>`;
}

// ---------- page 1: cover ----------
function coverArt(P, S) {
  // characters standing on the panel edge, left of the card fan
  if (P.key === 'A') {
    const g = Object.assign({}, ADULTS.G2, { x: 118, y: 0 - 51 * 1.25, s: 1.25, legs: 'kneel', aL: 16, aR: -118, face: 'laugh' });
    const k = Object.assign({}, KIDS.A, { x: 212, y: 0 - 27 * 1.45, s: 1.45, aL: 150, aR: -150, face: 'laugh' });
    return adult(g) + kid(k) + use('ball', 'translate(46,-32) scale(.32)');
  }
  const g = Object.assign({}, ADULTS.G1, { x: 104, y: 0 - 81 * 1.08, s: 1.08, aL: 12, aR: -34, face: 'laugh' });
  const k = Object.assign({}, KIDS.E, { x: 206, y: 0 - 27 * 1.6, s: 1.6, aL: 14, aR: -140, face: 'laugh' });
  return adult(g) + kid(k);
}
function fan(P, picks, scale) {
  const rots = [-10, 0, 10], dx = [-122, 0, 122], dy = [22, 0, 22];
  return picks.map((i, j) => `<div class="fan-card" style="transform:translate(${dx[j] * scale / .86}px,${dy[j] * scale / .86}px) rotate(${rots[j]}deg) scale(${scale})">${P.card(P.deck[i], 0)}</div>`).join('');
}
function coverPage(P, S, n, total) {
  const panelH = Math.round(S.H * 0.555);
  const picks = P.key === 'A' ? [2, 29, 44] : [1, 14, 44];
  const tiles = P.key === 'A'
    ? BANDS.map(b => `<div class="tile" style="--c:${C[b.color]};--t:${K.TINT[b.color]}">${shapeSvg(b.shape, C[b.color], 18)}<b>${b.ages}</b><span>${b.unit === 'yr' ? 'year' : 'years'}</span><em>13 plays</em></div>`).join('')
    : MOMENTS.map(m => `<div class="tile" style="--c:${C[m.color]};--t:${K.TINT[m.color]}"><svg viewBox="-50 -50 100 100" width="30" height="30">${ICONS[m.icon]()}</svg><b class="mw">${m.name}</b><em>13 cards</em></div>`).join('');
  const inside = P.key === 'A'
    ? ['54 poker-size cards: 52 plays + how-to + blank', 'No-cut play pages: start today, cut later', 'Every play: start age, prep, mess, 2-min version', 'Make-your-own cards you can type into', 'Grown-up guide with 8 simple talk moves', 'A 52-week play checklist for the fridge']
    : ['54 poker-size cards: 52 questions + how-to + blank', 'No-cut question pages: start tonight', '9 cards per page, with cut lines and card backs', 'Make-your-own cards you can type into', 'Grown-up guide with 6 easy talk-along habits', 'Cut-out labels for jars, bags and the glove box'];
  const prep = P.key === 'A'
    ? '<b>Prep:</b> about 20 min to print and cut, once. Most plays: 0–2 min to set up.'
    : '<b>Prep:</b> about 20 min to print and cut, once. No prep to ask a question.';
  return `<section class="page cover" style="--panel:${P.color}">
  <div class="panel" style="height:${panelH}px"></div>
  <div class="cv-head">
    <p class="kick">${esc(P.kicker)}</p>
    <h1><span class="n52">52</span> ${P.key === 'A' ? 'Play &amp;<br>Talk Cards' : 'Family<br>Talk-Along Cards'}</h1>
    <p class="csub">${esc(P.sub)}</p>
  </div>
  <svg class="cv-people" viewBox="0 -300 300 300" width="300" height="300" style="top:${panelH - 300}px" aria-hidden="true">${coverArt(P, S)}</svg>
  <div class="fan" style="top:${panelH - 30}px;left:${S.W - 272}px">${fan(P, picks, .86)}</div>
  <div class="cv-low" style="top:${panelH + 150}px">
    <div class="tiles">${tiles}</div>
    <p class="prepline">${prep}</p>
    <div class="inside"><h2>Inside this download</h2><ul>${inside.map(t => `<li>${check(P.key === 'A' ? C.grass : C.sky)}<span>${t}</span></li>`).join('')}</ul></div>
  </div>
  <div class="cv-foot"><img src="${K.LOGO.lockup}" alt="Play Before Pixels" class="lockup"><span>${store() ? '<b>playbeforepixels.com</b><br>' : ''}${K.COPY}<br>${K.VERSION}</span></div>
</section>`;
}

// ---------- page 2: start here ----------
function startPage(P, S, n, total) {
  if (P.key === 'A') {
    const steps = [
      ['Find your child’s color.', 'Each age has a color and a shape (see the key). Ages are a guide, not a rule.'],
      ['Pick one card.', 'Or let your child pick. Keep a few by the door, the tub or the toy basket.'],
      ['Gather what you need.', 'Almost every play uses things you already have at home.'],
      ['Play, then try the talk tip.', 'Say it once, then wait. Their look, sound or point is a turn.'],
      ['Stay close and stop while it’s fun.', 'Five happy minutes beats twenty tired ones. Play it again tomorrow.'],
    ];
    const ranges = ['01–13', '14–26', '27–39', '40–52'];
    const looks = ['Faces, voices, peekaboo, and “what happens if I…?”', 'Filling, dumping, climbing and first pretend play', 'Pretend play, sorting, place words and big-paper art', 'Stories, simple games with rules and taking turns'];
    return `<section class="page content">
  <div class="pin">
    <p class="kick dark">Grown-up guide</p>
    <h2 class="ptitle">Start here</h2>
    <p class="lede">Five minutes of play and a little back-and-forth talk. That’s the whole idea. No screens, no scripts, nothing to get right.</p>
    <div class="two">
      <div><h3 class="h3">How to use the cards</h3><ol class="bigsteps">${steps.map(([a, b], i) => `<li style="--c:${[C.tomato, C.sun, C.sky, C.grass, C.plum][i]}"><b>${a}</b> ${b}</li>`).join('')}</ol></div>
      <div><h3 class="h3">Age key</h3><div class="agekey">${BANDS.map((b, i) => `<div class="ak" style="--c:${C[b.color]};--t:${K.TINT[b.color]}"><div class="ak-l">${shapeSvg(b.shape, C[b.color], 20)}<b>${b.ages}</b><span>${b.unit === 'yr' ? 'year' : 'years'}</span></div><div class="ak-r"><em>Cards ${ranges[i]}</em><p>${looks[i]}</p></div></div>`).join('')}</div>
      <p class="small">Every child grows at their own pace. Play any card that fits your child today, younger or older. If you have questions about your child’s development, your child’s doctor is a good place to start.</p></div>
    </div>
    <h3 class="h3">The 8 talk moves on the cards</h3>
    <div class="moves">${Object.values(MOVES).map((m, i) => `<div class="mv" style="--c:${[C.tomato, C.sun, C.sky, C.grass, C.plum, C.tomato, C.sun, C.sky][i]}">${K.speech([C.tomato, C.sun, C.sky, C.grass, C.plum, C.tomato, C.sun, C.sky][i], 22)}<b>${m.name}</b><p>${m.how}</p></div>`).join('')}</div>
    <div class="whyband">
      <div><b>Why play and talk?</b> Little ones learn to talk by talking with you: a look, a sound, your answer, their turn. Play is full of those moments.</div>
      <div><b>Try:</b> “Your turn!” · “Tell me more.” <b>Talk, sign, sing and read in the language you know best.</b> A sign, a point, a tap, or the talk line read word for word: all count.</div>
      <div><b>Most children love 2–3 of these.</b> Repeat the favorites. Tired day? Use the 2-minute versions. Every play works from a chair, a bed or a wheelchair.</div>
    </div>
  </div>
  ${foot(P, n, total)}
</section>`;
  }
  const steps = [
    ['Match the card to the moment.', 'Dinner cards at the table, on-the-way cards on the go, bath cards at the tub, bedtime cards at lights-out.'],
    ['One card is plenty.', 'A single good question can fill a whole meal. Put the rest back for tomorrow.'],
    ['Everyone answers.', 'Grown-ups too. Kids open up when they hear your answer first.'],
    ['Use the grown-up tip.', 'Each card has one small idea for keeping the talk going.'],
    ['Keep it light.', 'Anyone can say “pass.” It’s a conversation, not a quiz.'],
  ];
  const younger = 'Read the card aloud, give an example answer, and welcome short answers. Drawing an answer counts too.';
  const older = 'Let them read the card and pick who goes first. Skip any that feel too young; bath cards suit tooth-brushing too.';
  return `<section class="page content">
  <div class="pin">
    <p class="kick dark">Grown-up guide</p>
    <h2 class="ptitle">Start here</h2>
    <p class="lede">Real talk happens in small moments: passing the peas, waiting at a red light, rinsing shampoo, turning off the lamp. These cards give those moments a good question.</p>
    <div class="two">
      <div><h3 class="h3">How to use the cards</h3><ol class="bigsteps">${steps.map(([a, b], i) => `<li style="--c:${[C.tomato, C.sun, C.sky, C.plum, C.grass][i]}"><b>${a}</b> ${b}</li>`).join('')}</ol></div>
      <div><h3 class="h3">Four moments</h3><div class="agekey">${MOMENTS.map((m, i) => `<div class="ak" style="--c:${C[m.color]};--t:${K.TINT[m.color]}"><div class="ak-l"><svg viewBox="-50 -50 100 100" width="34" height="34">${ICONS[m.icon]()}</svg><b class="mw">${m.name}</b></div><div class="ak-r"><em>Cards ${['01–13', '14–26', '27–39', '40–52'][i]}</em><p>${m.where}</p></div></div>`).join('')}</div>
      <div class="agesplit"><p><b>Ages 5–7.</b> ${younger}</p><p><b>Ages 8–12.</b> ${older}</p></div></div>
    </div>
    <h3 class="h3">6 talk-along habits</h3>
    <div class="moves m3">${HABITS.map((h, i) => `<div class="mv">${K.speech([C.tomato, C.sun, C.sky, C.plum, C.grass, C.tomato][i], 22)}<b>${h.name}</b><p>${h.how}</p></div>`).join('')}</div>
    <div class="whyband b">
      <div><b>Why a question card?</b> Kids often say more side by side than face to face. A card takes the pressure off: nobody is being quizzed, everyone gets a turn.</div>
      <div><b>Three talk lines:</b> “Tell me more.” · “What was that like?” · “I wonder…” <b>Talk or sign in the language you know best.</b> Drawing, pointing or typing an answer counts too.</div>
      <div><b>Most families love 2–3 of these</b> and ask them again and again. Keep the favorites on top of the pile.</div>
    </div>
    <p class="small">Some questions (the hard parts, the worries) can bring up big feelings. Listening is enough. If something your child shares worries you, reach out to your child’s doctor or another trusted professional.</p>
  </div>
  ${foot(P, n, total)}
</section>`;
}

// ---------- page 3: print, safety, founder note, license ----------
// Optional founder's note, in her own words (60–90 words; template in ../founder-notes.md). A = 52 Play & Talk Cards,
// B = Family Talk-Along Cards. Leave '' and nothing prints.
const FOUNDER_NOTE = { A: '', B: '' };
function printPage(P, S, n, total) {
  const printTips = [
    ['Print at “Actual size” (100%).', 'Cards are standard poker size, 2.5 × 3.5 in (63.5 × 88.9 mm).'],
    ['Use cardstock if you can.', 'Heavy paper or cardstock (65–110 lb / 176–300 gsm) feels like a real deck.'],
    ['Edges cut off?', 'Choose “Fit” instead. The cards print a little smaller and still work.'],
    ['Backs are optional.', 'Print the backs page on the reverse of a card sheet, flipping on the long edge. Test one sheet first.'],
    ['Cut on the lines.', 'A paper trimmer is fastest. Grown-up keeps the pieces and does the cutting. No time? Use the no-cut pages today.'],
    ['Make them last.', 'Laminate for sticky fingers. Keep them in a recipe box, a zip bag or on a ring.'],
  ];
  const safety = P.key === 'A' ? [
    'A grown-up plays along and stays within reach, every time.',
    'Under 3: every object is bigger than a toilet-paper tube opening (about 1.25 in / 3.2 cm).',
    'Water play: a grown-up within arm’s reach the whole time. Tip the water out after.',
    'No balloons, no long cords or strings, and no choking-risk foods on any card.',
    'Check toys and boxes for loose parts, staples and tape before play.',
    'Grown-up keeps the pieces: the paper cards are for grown-up hands, not for mouths.',
  ] : [
    'In the car, a passenger reads the card. The driver keeps eyes on the road.',
    'Bath time: stay with your child. Keep the cards dry in a zip bag by the sink.',
    'Any question can be skipped. Nobody has to answer something that feels too big.',
    'If a big worry comes up, listen first. Solutions can wait for a calm moment.',
    'Grown-up keeps the pieces: cards, laminated cards and rings stay away from babies and toddlers.',
  ];
  return `<section class="page content">
  <div class="pin">
    <p class="kick dark">Before you print</p>
    <h2 class="ptitle">Print, cut and keep</h2>
    <div class="two">
      <div><ul class="tips">${printTips.map(([a, b], i) => `<li>${check([C.tomato, C.sun, C.sky, C.grass, C.plum, C.tomato][i])}<span><b>${a}</b> ${b}</span></li>`).join('')}</ul></div>
      <div>
        <svg class="sheetmini" viewBox="0 0 170 220" width="170" height="220" aria-hidden="true"><rect width="170" height="220" rx="6" fill="${C.wash}"/>${[0, 1, 2].map(r => [0, 1, 2].map(c => `<rect x="${13 + c * 48}" y="${14 + r * 64}" width="48" height="64" fill="#fff"/><rect x="${13 + c * 48}" y="${14 + r * 64}" width="48" height="22" fill="${[C.sky, C.grass, C.sun, C.tomato][(r * 3 + c) % 4]}"/><circle cx="${37 + c * 48}" cy="${25 + r * 64}" r="8" fill="#fff"/>`).join('')).join('')}<path d="M13 14V206M61 14V206M109 14V206M157 14V206M13 14H157M13 78H157M13 142H157M13 206H157" stroke="${C.ink}" stroke-width=".8" stroke-dasharray="3 2" opacity=".5"/></svg>
        <p class="small center">9 cards per page · 6 pages · 54 cards<br>Prep: about 20 minutes to print and cut</p>
      </div>
    </div>
    <div class="safetybox">
      <h3 class="h3">${K.shield(C.grass, 18)} Safety basics${P.key === 'A' ? ' built into every card' : ''}</h3>
      <ul>${safety.map(t => `<li>${t}</li>`).join('')}</ul>
    </div>
    ${FOUNDER_NOTE[P.key] ? `<div class="founder"><span class="flabel">A note from us</span><p>${FOUNDER_NOTE[P.key]}</p></div>` : ''}
    <h3 class="h3">Ways to use your deck</h3>
    <div class="ways">${(P.key === 'A' ? [
      ['Card of the day', 'Clip one card to the fridge each morning.', C.tomato],
      ['Grab-and-go', 'Keep a few in the diaper bag for waiting rooms.', C.sun],
      ['Share the job', 'Hand a card to grandparents or the sitter.', C.sky],
      ['Rainy-day pile', 'Save the indoor plays for stuck-inside days.', C.grass],
    ] : [
      ['Question jar', 'One card a night at the dinner table.', C.tomato],
      ['Road-trip stack', 'A passenger reads; everyone answers.', C.sun],
      ['Kid picks', 'Let your child choose the card, or ask it.', C.sky],
      ['Family favorites', 'Keep the best ones and ask them again next year.', C.plum],
    ]).map(([a, b, c]) => `<div class="way" style="--c:${c}"><b>${a}</b><p>${b}</p></div>`).join('')}</div>
    <div class="license"><b>License: PERSONAL.</b> You may print and copy this for your own family only (grandparents and sitters who care for your child count as family). No resale, redistribution, sharing, posting, uploading to shared or public drives or websites, or use to train AI. ${store() ? 'Classroom, center and library licenses are not available yet. Full terms: ' + LICENSE_URL : 'Classroom, center and library licenses are not available yet. Full terms are in the shop’s listing and policies.'}<br>${K.COPY} All rights reserved. ${K.VERSION}.</div>
  </div>
  ${foot(P, n, total)}
</section>`;
}

// ---------- card sheet pages ----------
function gridLines(S) {
  const x0 = S.gx, y0 = S.gy, xs = [0, 1, 2, 3].map(i => x0 + i * K.CW), ys = [0, 1, 2, 3].map(i => y0 + i * K.CH);
  const out = [];
  xs.forEach(x => { out.push(`<line x1="${x}" y1="${Math.max(2, y0 - 22)}" x2="${x}" y2="${y0 - 5}"/>`, `<line x1="${x}" y1="${y0 + 3 * K.CH + 5}" x2="${x}" y2="${Math.min(S.H - 2, y0 + 3 * K.CH + 22)}"/>`); });
  ys.forEach(y => { out.push(`<line x1="${Math.max(2, x0 - 30)}" y1="${y}" x2="${x0 - 6}" y2="${y}"/>`, `<line x1="${x0 + 3 * K.CW + 6}" y1="${y}" x2="${Math.min(S.W - 2, x0 + 3 * K.CW + 30)}" y2="${y}"/>`); });
  const inner = [];
  xs.forEach(x => inner.push(`<line x1="${x}" y1="${y0}" x2="${x}" y2="${y0 + 3 * K.CH}"/>`));
  ys.forEach(y => inner.push(`<line x1="${x0}" y1="${y}" x2="${x0 + 3 * K.CW}" y2="${y}"/>`));
  return `<svg class="cutmarks" width="${S.W}" height="${S.H}" viewBox="0 0 ${S.W} ${S.H}" aria-hidden="true"><g stroke="${C.ink}" stroke-width=".8">${out.join('')}</g><g stroke="#B9C1D0" stroke-width=".6" stroke-dasharray="4 3">${inner.join('')}</g></svg>`;
}
function sheetPage(P, S, cardsHtml, note, n, total) {
  const cells = cardsHtml.map(h => `<div class="cell">${h}</div>`).join('');
  return `<section class="page sheet">
  <div class="grid" style="left:${S.gx}px;top:${S.gy}px">${cells}</div>
  ${gridLines(S)}
  <div class="sidenote l" style="width:${S.H}px"><span>${esc(P.short)} · ${esc(note)} · page ${n} of ${total} · ${K.VERSION}</span></div>
  <div class="sidenote r" style="width:${S.H}px"><span>Print at Actual size (100%) · cut on the lines · Grown-up keeps the pieces</span></div>
  <div class="sheetfoot" style="left:${S.gx}px;width:${3 * K.CW}px;top:${S.gy + 3 * K.CH}px;height:${S.H - S.gy - 3 * K.CH}px"><span>${store() ? 'playbeforepixels.com · © 2026 AlphaPlay LLC' : '© 2026 AlphaPlay LLC · personal/family license'}</span></div>
</section>`;
}

// ---------- no-cut pages (customer-voice rules 5, 6, 7): play today without cutting ----------
function noCutA(P, S, b, half, n, total) {
  const bi = BANDS.indexOf(b), col = C[b.color], tint = K.TINT[b.color];
  const from = half === 0 ? 0 : 7, list = PLAYS[b.key].slice(from, half === 0 ? 7 : 13);
  const rows = list.map((pl, j) => { const i = from + j; return `<div class="nc-row">
    <div class="nc-a"><em>${K.pad2(bi * 13 + i + 1)}</em><b>${esc(pl.t)}</b><span class="nc-m">${[moLabel(pl.mo), `Prep ${pl.prep} min`, MESS[pl.mess], `~${pl.min} min`].map(t => `<u>${t}</u>`).join(' · ')}${pl.buy ? '' : ' · <i>nothing to buy</i>'}</span><span class="nc-n"><i>Needs</i> ${esc(pl.n)}</span></div>
    <div class="nc-b">${esc(pl.p)} <span class="nc-k">Talk: ${esc(pl.k)}</span>${pl.s ? `<span class="nc-s">${K.shield(C.grass, 11)}<span><b>Safety:</b> ${esc(pl.s)}</span></span>` : ''}</div>
    <div class="nc-c"><p><i>2-minute version</i> ${esc(pl.tired)}</p><p><i>Easier</i> ${esc(pl.easy)}</p><p><i>Harder</i> ${esc(pl.hard)}</p></div>
  </div>`; }).join('');
  return `<section class="page content nocut" style="--c:${col};--t:${tint}">
  <div class="pin">
    <div class="nc-head"><div><p class="kick dark">No-cut play pages · ${bi * 2 + half + 1} of 8</p><h2 class="ptitle sm">${shapeSvg(b.shape, col, 30)} ${b.ages} ${b.unit === 'yr' ? 'year' : 'years'}: cards ${K.pad2(bi * 13 + from + 1)}–${K.pad2(bi * 13 + from + list.length)}</h2></div>
    <p class="nc-safe">${K.shield(C.grass, 14)}<span><b>With a grown-up, every time.</b> ${esc(b.safe)} Card-specific safety notes are on each card and in the rows below.</span></p></div>
    <div class="nc-cols"><span>Play</span><span>How to play</span><span>Tired day · easier · harder</span></div>
    <div class="nc-list">${rows}</div>
    <p class="small">Start ages are a guide, never a deadline: every child grows at their own pace. Questions about your child’s development? Your child’s doctor is a good place to start.</p>
  </div>
  ${foot(P, n, total)}
</section>`;
}
function noCutB(P, S, moments, n, total, part) {
  const blocks = moments.map(m => {
    const i0 = MOMENTS.indexOf(m) * 13;
    return `<div class="ncq" style="--c:${C[m.color]};--t:${K.TINT[m.color]}"><div class="ncq-h"><svg viewBox="-50 -50 100 100" width="30" height="30">${ICONS[m.icon]()}</svg><b>${m.name}</b><span>${m.key === 'car' ? 'A passenger reads; the driver just talks.' : m.key === 'bath' ? 'Grown-up stays close. Keep this page dry.' : m.where}</span></div>
    <ol>${PROMPTS[m.key].map((q, j) => `<li><em>${K.pad2(i0 + j + 1)}</em><span><b>${esc(q.q)}</b> <i>${esc(q.k)}</i></span></li>`).join('')}</ol></div>`;
  }).join('');
  return `<section class="page content nocutb">
  <div class="pin">
    <p class="kick dark">No-cut question pages · ${part} of 2</p>
    <h2 class="ptitle sm">Start tonight, cut later</h2>
    <p class="lede sm">Read a question straight from this page. The grown-up tip is in italics.</p>
    ${blocks}
  </div>
  ${foot(P, n, total)}
</section>`;
}

// ---------- extra page A: 52-week tracker ----------
function trackerPage(P, S, n, total) {
  const cols = BANDS.map(b => `<div class="tcol" style="--c:${C[b.color]};--t:${K.TINT[b.color]}"><div class="thead">${shapeSvg(b.shape, C[b.color], 16)}<b>${b.ages}</b> ${b.unit === 'yr' ? 'year' : 'years'}</div>${PLAYS[b.key].map((p, i) => `<div class="trow"><i class="box"></i><em>${K.pad2(BANDS.indexOf(b) * 13 + i + 1)}</em><span>${esc(p.t)}</span><i class="heart"><svg viewBox="0 0 24 22" width="14" height="13" aria-hidden="true"><path d="M12 20.5C5.5 15.6 2 12.2 2 7.9 2 4.9 4.3 2.5 7.2 2.5c2 0 3.7 1.1 4.8 2.8 1.1-1.7 2.8-2.8 4.8-2.8 2.9 0 5.2 2.4 5.2 5.4 0 4.3-3.5 7.7-10 12.6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg></i></div>`).join('')}</div>`).join('');
  return `<section class="page content">
  <div class="pin">
    <p class="kick dark">For the fridge</p>
    <h2 class="ptitle">Our Play &amp; Talk Year</h2>
    <p class="lede">One card a week is plenty. Check it off when you’ve played it, and color in the heart if your child asks for it again.</p>
    <div class="tracker">${cols}</div>
    <div class="trk-foot"><span>Our favorite play so far:</span><i class="ln"></i><span>A new word, sign or sound we noticed:</span><i class="ln"></i></div>
    <div class="sharemark"><img src="${K.LOGO.lockup}" alt="Play Before Pixels"><span>${store() ? 'playbeforepixels.com' : 'Play Before Pixels'}</span></div>
  </div>
  ${foot(P, n, total)}
</section>`;
}

// ---------- extra page B: moment labels ----------
function labelsPage(P, S, n, total) {
  const labels = MOMENTS.map((m, i) => `<div class="lab" style="--c:${C[m.color]};--t:${K.TINT[m.color]};--on:${m.color === 'sun' ? C.ink : '#fff'}">
    <div class="lab-top"><span class="lab-ic"><svg viewBox="-60 -60 120 120" width="60" height="60">${ICONS[m.icon]()}</svg></span><div><b>${m.name}</b><span>Talk-along cards ${['01–13', '14–26', '27–39', '40–52'][i]}</span></div></div>
    <p>${m.where}</p></div>`).join('');
  return `<section class="page content">
  <div class="pin">
    <p class="kick dark">Cut-out labels</p>
    <h2 class="ptitle">Where the cards live</h2>
    <p class="lede">Cards get used when they’re already in the room. Split the deck into four piles, cut out these labels (a grown-up cuts and keeps the pieces), and tape each one to a jar, an envelope or a zip bag.</p>
    <div class="labels">${labels}</div>
    <h3 class="h3">Our talk-along week</h3>
    <p class="small" style="margin:-4px 0 10px">Check a box each time a card gets asked. Start on any day. Aim for a few checks, not a full grid.</p>
    <table class="week"><tr><th></th>${[1, 2, 3, 4, 5, 6, 7].map(d => `<th>Day ${d}</th>`).join('')}</tr>${MOMENTS.map(m => `<tr style="--c:${C[m.color]};--t:${K.TINT[m.color]}"><td class="wm">${m.name}</td>${[1, 2, 3, 4, 5, 6, 7].map(() => '<td><i></i></td>').join('')}</tr>`).join('')}</table>
    <div class="trk-foot"><span>Our family’s favorite question so far:</span><i class="ln"></i><span>A question we want to add:</span><i class="ln"></i></div>
    <div class="sharemark"><img src="${K.LOGO.lockup}" alt="Play Before Pixels"><span>${store() ? 'playbeforepixels.com' : 'Play Before Pixels'}</span></div>
  </div>
  ${foot(P, n, total)}
</section>`;
}

// ---------- last page: what's next ----------
function nextPage(P, S, n, total, qrSvg) {
  const nexts = P.key === 'A' ? [
    ['“I’m Bored” Play Cards', 'Ages 1–5 · 76 play cards in two age bands, each with a talk prompt', C.tomato, 'storybox'],
    ['Toddler Busy Book', 'Ages 1–5 · 74 printable activities for waiting rooms, car rides and quiet time', C.sky, 'basket'],
    ['100 Screen-Free Plays', 'Ages 0–5 · the activity book, sorted by age, with a talk line on every play', C.grass, 'bookopen'],
  ] : [
    ['“I’m Bored” Play Cards', 'Ages 1–12 · 150 age-banded screen-free plays, each with a talk prompt', C.tomato, 'storybox'],
    ['First Phone Agreement Kit', 'Ages 9–12 · a readiness checklist and a family agreement, for whenever the time is right', C.grass, 'list'],
    ['52 Play & Talk Cards', 'Ages 0–5 · for the little ones: one play and one talk tip per card', C.sun, 'ball'],
  ];
  return `<section class="page content">
  <div class="pin">
    <p class="kick dark">Keep playing</p>
    <h2 class="ptitle">What’s next</h2>
    ${store() ? `<div class="bonus" style="--c:${P.color};--t:${P.tint}">
      <div class="qr">${qrSvg}</div>
      <div><h3>Your free companion bonus</h3><p>Scan the code or visit <b>${P.bonus}</b> for extra printable cards and a short, friendly idea by email each month.</p><p class="small">We ask only for an email address and your child’s birth month and year, never names. Unsubscribe any time.</p></div>
    </div>` : `<div class="bonus" style="--c:${P.color};--t:${P.tint}">
      <div><h3>Thank you for playing first</h3><p>Your files stay on your Etsy Purchases page, ready to download again any time. Open them in a web browser, not the app, and save them to Files or your computer.</p><p class="small">Share a photo of your fridge checklist or your favorite card: sharing is always optional.</p></div>
    </div>`}
    <h3 class="h3">Next for your family</h3>
    <div class="nexts">${nexts.map(([t, d, c, ic]) => `<div class="nx" style="--c:${c}"><span class="nx-ic"><svg viewBox="-60 -60 120 120" width="58" height="58">${ICONS[ic]()}</svg></span><div><b>${t}</b><p>${d}</p></div></div>`).join('')}</div>
    <p class="small">${store() ? 'Find them all at <b>playbeforepixels.com</b>.' : 'Find them all in our shop, <b>Play Before Pixels</b>.'} Bundles are offered at a fair discount.</p>
    <div class="review"><div><h3>Which card did your family love?</h3><p>A short, honest review on the shop where you bought this helps other families decide. Questions or ideas? ${store() ? 'Write to us through the contact form at <b>playbeforepixels.com/contact</b>.' : 'Send us a message through Etsy.'}</p></div><svg viewBox="-50 -50 100 100" width="84" height="84" aria-hidden="true"><use href="#heart" transform="scale(1.05)"/></svg></div>
    <div class="colophon">
      <img src="${K.LOGO.lockup}" alt="Play Before Pixels" class="lockup sm">
      <p><b>${esc(P.title)}, ${P.agesLong}.</b> ${K.VERSION}. Printable PDF for personal and family use.</p>
      <p>Parent education only. These cards are ideas for everyday play and conversation; they are not medical, developmental or professional advice and are not a substitute for care from a qualified professional. ${P.key === 'A' ? 'Always supervise children during play.' : 'Supervise children as right for their age, especially near water and in the car.'}</p>
      <p>${K.COPY} All rights reserved. License: personal/family use only; ${store() ? 'full terms at ' + LICENSE_URL : 'full terms in the shop’s listing and policies'}.</p>
    </div>
  </div>
  ${foot(P, n, total)}
</section>`;
}

// ---------- START HERE (file 1, one page) ----------
function fileList(P) {
  const b = P.pdfBase;
  return store()
    ? [['START-HERE.pdf', 'This page: what each file is and how to print.'], [`${b}.pdf`, 'Color, US Letter.'], [`${b}-A4.pdf`, 'Color, A4.'], [`${b}-low-ink.pdf`, 'Low-ink, US Letter: white backgrounds, saves ink.'], [`${b}-low-ink-A4.pdf`, 'Low-ink, A4.']]
    : [['1-START-HERE.pdf', 'This page: what each file is and how to print.'], ['2-Color-US-Letter.pdf', 'Color, US Letter.'], ['3-Color-A4.pdf', 'Color, A4.'], ['4-Low-Ink-US-Letter.pdf', 'Low-ink, US Letter: white backgrounds, saves ink.'], ['5-Low-Ink-A4.pdf', 'Low-ink, A4.']];
}
function startHerePage(P, S, qrSvg) {
  const N = pageCount(P);
  const map = P.key === 'A'
    ? [['1', 'Cover'], ['2', 'Grown-up guide'], ['3', 'Printing and safety'], ['4–11', 'No-cut play pages (2 per age)'], ['12–17', 'Card sheets'], ['18', 'Card backs (optional)'], ['19', 'Type-in blank cards'], ['20', '52-week fridge checklist'], ['21', 'What’s next']]
    : [['1', 'Cover'], ['2', 'Grown-up guide'], ['3', 'Printing and safety'], ['4–5', 'No-cut question pages'], ['6–11', 'Card sheets'], ['12', 'Card backs (optional)'], ['13', 'Type-in blank cards'], ['14', 'Moment labels + week check'], ['15', 'What’s next']];
  const qs = P.key === 'A'
    ? [['Short on time?', 'Print your child’s two no-cut pages (4–11) and play today. Cut the cards later.'], ['Which pages to print?', 'Pages 12–17 are the 54 cards. Page 18 (backs) and page 19 (blank cards) are optional.'], ['Paper', 'Cardstock (65–110 lb / 176–300 gsm) feels like a real deck. Plain paper works too.']]
    : [['Short on time?', 'Print pages 4–5 only and ask a question tonight. Cut the cards later.'], ['Which pages to print?', 'Pages 6–11 are the 54 cards. Page 12 (backs) and page 13 (blank cards) are optional.'], ['Paper', 'Cardstock (65–110 lb / 176–300 gsm) feels like a real deck. Plain paper works too.']];
  return `<section class="page content starthere">
  <div class="pin">
    <p class="kick dark">File 1 · Start here</p>
    <h2 class="ptitle">${esc(P.title)}</h2>
    <p class="lede">Thank you! Here is what each file holds and how to print it. <b>Prep: about 20 minutes to print and cut, once.</b> Or start today with the no-cut pages.</p>
    <div class="two">
      <div><h3 class="h3">Your ${store() ? '5 files' : '5 files'}</h3><ul class="files">${fileList(P).map(([f, d]) => `<li><b>${f}</b><span>${d}</span></li>`).join('')}</ul>
      <p class="small">Every file has the same ${N} pages. Pick <b>one</b> file: Letter or A4, color or low-ink.</p></div>
      <div><h3 class="h3">What’s on each page</h3><div class="pmap">${map.map(([a, b]) => `<div><em>${a}</em><span>${b}</span></div>`).join('')}</div></div>
    </div>
    <h3 class="h3">Print it right</h3>
    <ul class="tips">${[['Print at “Actual size” (100%).', 'Cards come out at poker size, 2.5 × 3.5 in (63.5 × 88.9 mm). If the edges get cut off, choose “Fit”; the cards print a little smaller.'], ...qs, ['Type-in cards', 'Open the file in free Adobe Acrobat Reader to type on the blank cards (title, needs, play and talk tip). Everything else is print-only.'], ['Downloading on a phone?', store() ? 'Open the download link from your order email in a web browser, save each PDF to Files, then open it in Adobe Acrobat Reader.' : 'Open your Etsy Purchases page in a web browser (not the app), save each PDF to Files, then open it in Adobe Acrobat Reader. Your files stay on your Purchases page to download again any time.']].map(([a, b], i) => `<li>${check([C.tomato, C.sun, C.sky, C.grass, C.plum, C.tomato][i])}<span><b>${a}</b> ${b}</span></li>`).join('')}</ul>
    ${store() ? `<div class="bonus sh" style="--c:${P.color};--t:${P.tint}"><div class="qr">${qrSvg}</div><div><h3>Free bonus and re-downloads</h3><p>Scan for your free companion printables: <b>${P.bonus}</b>. Lost a file? Your link stays in your order email; help is at <b>playbeforepixels.com/help</b>.</p></div></div>` : ''}
    <div class="license"><b>License: PERSONAL.</b> Print and copy for your own family only. Print shops may print copies for this customer’s family. No resale, sharing, posting or uploading. ${store() ? 'Classroom, center and library licenses are not available yet. Full terms: ' + LICENSE_URL : 'Classroom, center and library licenses are not available yet. Full terms are in the shop’s listing and policies.'}<br>${K.COPY} All rights reserved. ${K.VERSION}.</div>
  </div>
  <div class="pfoot"><span>${esc(P.short)} · START HERE · ${K.VERSION}${store() ? ' · <b>playbeforepixels.com</b>' : ''}</span><span>${K.COPY}</span></div>
</section>`;
}

// ---------- CSS ----------
function pageCss(S) {
  return `
@page { size: ${S.css}; margin: 0 }
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:"Nunito Sans","Helvetica Neue",Arial,sans-serif;color:${C.ink}}
.page{width:${S.W}px;height:${S.H}px;position:relative;overflow:hidden;page-break-after:always;break-after:page;background:#fff}
.page:last-child{page-break-after:auto;break-after:auto}
${K.CARD_CSS}
/* sheets */
.grid{position:absolute;display:grid;grid-template-columns:repeat(3,${K.CW}px);grid-template-rows:repeat(3,${K.CH}px)}
.cell{width:${K.CW}px;height:${K.CH}px;overflow:hidden}
.cutmarks{position:absolute;left:0;top:0;pointer-events:none}
.sidenote{position:absolute;top:0;height:${Math.max(18, S.gx - 14)}px;display:flex;align-items:center;justify-content:center;font-size:7.5px;font-weight:700;letter-spacing:.02em;color:${C.ink};opacity:.7;white-space:nowrap}
.sidenote.l{left:0;transform-origin:0 0;transform:translate(${Math.max(4, S.gx / 2 - 9)}px,${S.H}px) rotate(-90deg)}
.sheetfoot{position:absolute;display:flex;align-items:center;justify-content:center;font-size:6.6px;font-weight:700;opacity:.7;white-space:nowrap}
.sidenote.r{left:${S.W}px;transform-origin:0 0;transform:translate(-${Math.max(4, S.gx / 2 - 9)}px,0) rotate(90deg)}
/* content pages */
.pin{position:absolute;left:48px;right:48px;top:48px;bottom:56px;display:flex;flex-direction:column}
.kick{margin:0 0 8px;font-weight:800;font-size:12px;letter-spacing:.16em;text-transform:uppercase}
.kick.dark{color:${C.tomato}}
.ptitle{margin:0 0 10px;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:44px;letter-spacing:-.025em;line-height:1}
.lede{margin:0 0 20px;font-size:15.5px;line-height:1.45;max-width:620px}
.h3{margin:0 0 10px;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:19px;letter-spacing:-.01em;display:flex;align-items:center;gap:8px}
.two{display:grid;grid-template-columns:1.05fr 1fr;gap:28px;margin-bottom:18px}
.bigsteps{list-style:none;margin:0;padding:0;counter-reset:s}
.bigsteps li{counter-increment:s;position:relative;padding-left:40px;margin:0 0 9px;font-size:13px;line-height:1.42;min-height:28px}
.bigsteps li::before{content:counter(s);position:absolute;left:0;top:0;width:28px;height:28px;border-radius:50%;background:var(--c);color:#fff;font-family:"Fredoka",sans-serif;font-weight:600;font-size:15px;display:flex;align-items:center;justify-content:center}
.bigsteps b{font-weight:800;display:block}
.agekey{display:flex;flex-direction:column;gap:7px}
.ak{display:flex;align-items:center;gap:12px;background:var(--t);border-radius:14px;padding:9px 12px;border-left:7px solid var(--c)}
.ak-l{display:flex;align-items:center;gap:6px;min-width:104px}
.ak-l b{font-family:"Fredoka",sans-serif;font-weight:600;font-size:21px;line-height:1}
.ak-l b.mw{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:17px}
.ak-l span{font-size:11px;font-weight:800}
.ak-r em{font-style:normal;font-weight:800;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;opacity:.65}
.ak-r p{margin:1px 0 0;font-size:12px;line-height:1.3;font-weight:600}
.small{margin:10px 0 0;font-size:11px;line-height:1.45;opacity:.85}
.center{text-align:center}
.agesplit p{margin:10px 0 0;font-size:11.5px;line-height:1.42}
.moves{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.moves.m3{grid-template-columns:repeat(3,1fr)}
.mv{background:${C.wash};border-radius:14px;padding:12px 12px 13px}
.mv b{display:block;margin:6px 0 3px;font-weight:800;font-size:13px}
.mv p{margin:0;font-size:11.2px;line-height:1.38}
.tips{list-style:none;margin:0;padding:0}
.tips li{display:flex;gap:9px;align-items:flex-start;margin:0 0 10px;font-size:12.5px;line-height:1.42}
.tips li svg{flex:none;margin-top:2px}
.tips b{font-weight:800}
.sheetmini{display:block;margin:4px auto 0}
.safetybox{background:${C.tGrass};border-radius:16px;padding:14px 18px 10px;margin:4px 0 14px}
.safetybox ul{margin:0;padding:0 0 0 18px}
.safetybox li{font-size:12.5px;line-height:1.4;margin:0 0 5px}
.founder{border-radius:14px;padding:12px 16px;margin:0 0 14px;background:${C.wash}}
.flabel{display:block;font-weight:800;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:${C.plum};margin-bottom:5px}
.founder p{margin:0;font-size:12px;line-height:1.45}
.ways{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}
.way{border-top:6px solid var(--c);background:${C.wash};border-radius:12px;padding:10px 12px}
.way b{font-weight:800;font-size:13px}
.way p{margin:3px 0 0;font-size:11.5px;line-height:1.38}
.license{margin-top:auto;font-size:10px;line-height:1.5;background:${C.wash};border-radius:12px;padding:10px 14px}
.pfoot{position:absolute;left:48px;right:48px;bottom:16px;display:flex;flex-direction:column;gap:2px;font-size:7.6px;line-height:1.25;font-weight:700;opacity:.65;white-space:nowrap}
/* tracker */
.tracker{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.tcol{background:var(--t);border-radius:14px;padding:10px 10px 8px}
.thead{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:800;margin-bottom:6px}
.thead b{font-family:"Fredoka",sans-serif;font-weight:600;font-size:19px}
.trow{display:flex;align-items:center;gap:6px;background:#fff;border-radius:8px;padding:5px 8px;margin-bottom:5px;font-size:12.2px;font-weight:700;min-height:43px}
.trow .box{flex:none;width:14px;height:14px;border:1.6px solid var(--c);border-radius:3px}
.trow em{font-style:normal;font-size:9px;font-weight:800;opacity:.55}
.trow span{flex:1;line-height:1.15}
.trow .heart{font-style:normal;color:var(--c);font-size:14px;line-height:1;display:inline-flex}
.trk-foot{margin-top:auto;display:grid;grid-template-columns:auto 1fr;gap:10px 10px;align-items:end;font-size:12px;font-weight:800}
.trk-foot .ln{display:block;border-bottom:1.3px solid rgba(29,41,64,.35);height:18px}
/* labels */
.labels{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:18px}
.lab{border:2px dashed #B9C1D0;border-radius:18px;padding:10px;background:#fff}
.lab-top{display:flex;align-items:center;gap:12px;background:var(--c);color:var(--on);border-radius:12px;padding:12px 14px}
.lab-ic{flex:none;width:72px;height:72px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center}
.lab-top b{display:block;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:34px;letter-spacing:-.02em;line-height:1}
.lab-top span{display:block;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;margin-top:4px}
.lab p{margin:10px 6px 4px;font-size:13px;font-weight:700}
.week{width:100%;border-collapse:separate;border-spacing:6px;margin:0 -6px}
.week th{font-size:10.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;opacity:.65;text-align:center}
.week td{background:var(--t);border-radius:10px;height:44px;text-align:center}
.week td i{display:inline-block;width:18px;height:18px;border:2px solid var(--c);border-radius:4px;background:#fff;vertical-align:middle}
.week td.wm{background:var(--c);color:#fff;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:15px;width:110px;text-align:left;padding-left:12px}
/* next */
.bonus{display:flex;gap:22px;align-items:center;background:var(--t);border-radius:18px;padding:18px 22px;margin-bottom:22px}
.bonus .qr{flex:none;width:132px;height:132px;background:#fff;border-radius:12px;padding:10px}
.bonus .qr svg{width:100%;height:100%;display:block}
.bonus h3{margin:0 0 6px;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:22px}
.bonus p{margin:0;font-size:13px;line-height:1.45}
.bonus .small{margin-top:8px;font-size:11px}
.nexts{display:flex;flex-direction:column;gap:10px}
.nx{display:flex;align-items:center;gap:14px;border-radius:16px;background:${C.wash};padding:10px 14px;border-left:8px solid var(--c)}
.nx-ic{flex:none;width:68px;height:68px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center}
.nx b{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:18px}
.nx p{margin:2px 0 0;font-size:12.5px;line-height:1.4}
.review{margin-top:18px;display:flex;align-items:center;gap:18px;border:2px solid ${C.wash};border-radius:16px;padding:14px 18px}
.review h3{margin:0 0 4px;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:18px}
.review p{margin:0;font-size:12.5px;line-height:1.45}
.review svg{flex:none}
.colophon{margin-top:auto;border-top:1.5px solid ${C.wash};padding-top:14px}
.colophon p{margin:6px 0 0;font-size:10px;line-height:1.5}
.lockup{height:34px;width:auto;display:block}
.lockup.sm{height:26px}
/* additions: prep line, why band, no-cut pages, share mark, start here */
.prepline{margin:0 0 12px;font-size:12.5px;line-height:1.4;background:#fff;border-radius:12px;padding:7px 12px}
.whyband{margin-top:14px;display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.whyband>div{background:${C.tSun};border-radius:14px;padding:10px 13px;font-size:10.8px;line-height:1.4}
.whyband.b{margin-top:10px}
.ink .whyband{margin-top:10px}
.whyband.b>div{background:${C.tSky}}
.moves.m3 .mv{padding:10px 12px 11px}
.whyband b{font-weight:800}
.ptitle.sm{font-size:30px;display:flex;align-items:center;gap:10px;margin-bottom:6px}
.lede.sm{font-size:13px;margin:0 0 12px}
.nc-head{display:flex;justify-content:space-between;align-items:flex-end;gap:18px;margin-bottom:8px}
.nc-safe{margin:0;max-width:330px;display:flex;gap:6px;align-items:flex-start;font-size:10px;line-height:1.35;background:${C.tGrass};border-radius:10px;padding:7px 10px}
.nc-safe svg{flex:none;margin-top:1px}
.nc-cols{display:grid;grid-template-columns:168px 1fr 250px;gap:12px;padding:0 10px 3px;font-size:8.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;opacity:.6}
.nc-list{display:flex;flex-direction:column;gap:9px}
.nc-row{display:grid;grid-template-columns:168px 1fr 250px;gap:12px;background:var(--t);border-left:5px solid var(--c);border-radius:10px;padding:9px 12px 9px 10px;font-size:10.6px;line-height:1.36}
.nc-a em{font-style:normal;font-weight:800;font-size:8.5px;opacity:.6;margin-right:4px}
.nc-a b{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:14px}
.nc-m{display:block;font-size:8.8px;font-weight:800;opacity:.75;margin-top:3px}
.nc-m i{font-style:normal;color:${C.grass};white-space:nowrap}
.nc-m u{text-decoration:none;white-space:nowrap}
.nc-n{display:block;font-size:9.6px;font-weight:700;margin-top:3px}
.nc-n i,.nc-c i{font-style:normal;font-weight:800;font-size:7.4px;letter-spacing:.1em;text-transform:uppercase;opacity:.65;margin-right:3px}
.nc-k{display:block;font-weight:800;margin-top:3px}
.nc-s{display:flex;gap:5px;align-items:flex-start;margin-top:4px;font-size:10px;line-height:1.32;color:${C.ink}}
.nc-s svg{flex:none;margin-top:1px}
.nc-s b{font-weight:800}
.nc-c p{margin:0 0 2px}
.ncq{margin-bottom:12px;border-radius:14px;background:var(--t);border-left:7px solid var(--c);padding:9px 14px 8px}
.ncq-h{display:flex;align-items:center;gap:8px;margin-bottom:4px}
.ncq-h b{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:19px}
.ncq-h span{font-size:10.5px;font-weight:700;opacity:.8;margin-left:6px}
.ncq ol{margin:0;padding:0;list-style:none;columns:2;column-gap:18px}
.ncq li{display:flex;gap:6px;break-inside:avoid;font-size:10.2px;line-height:1.3;margin-bottom:4.5px}
.ncq li em{font-style:normal;font-weight:800;font-size:8.5px;opacity:.55;margin-top:1px}
.ncq li b{font-weight:800}
.ncq li i{opacity:.8}
.sharemark{display:flex;align-items:center;gap:10px;justify-content:flex-end;margin-top:10px;font-size:10px;font-weight:800;opacity:.8}
.sharemark img{height:22px;width:auto}
.files{list-style:none;margin:0;padding:0}
.files li{display:flex;flex-direction:column;background:${C.wash};border-radius:10px;padding:7px 12px;margin-bottom:6px;font-size:11.5px;line-height:1.35}
.files b{font-weight:800;font-size:12.5px}
.pmap{display:grid;grid-template-columns:1fr;gap:4px}
.pmap div{display:flex;gap:10px;align-items:baseline;font-size:12px;border-bottom:1px solid ${C.wash};padding:3px 0}
.pmap em{font-style:normal;font-weight:800;min-width:44px;color:${C.tomato}}
.bonus.sh{margin:6px 0 14px;padding:12px 18px}
.bonus.sh .qr{width:104px;height:104px;padding:8px}
.bonus.sh h3{font-size:18px}
/* low-ink pages: white grounds, outlines instead of fills */
.ink .cover,.ink .cover .panel{background:#fff!important}
.ink .cover .panel{border-bottom:3px solid ${C.ink}}
.ink .n52{background:#fff;color:${C.ink};border:3px solid ${C.ink}}
.ink .tile,.ink .prepline{border:1.5px solid #B9C1D0}
.ink .ak,.ink .tcol,.ink .mv,.ink .way,.ink .safetybox,.ink .license,.ink .bonus,.ink .nx,.ink .whyband>div,.ink .nc-row,.ink .nc-safe,.ink .ncq,.ink .files li,.ink .lab-top{background:#fff!important;border:1.5px solid var(--c,#B9C1D0)}
.ink .safetybox,.ink .license,.ink .whyband>div,.ink .nc-safe,.ink .files li,.ink .mv,.ink .way{border-color:#B9C1D0}
.ink .nc-row,.ink .ak,.ink .nx,.ink .ncq{border-left:5px solid var(--c)}
.ink .lab-top{color:${C.ink}!important}
.ink .week td{background:#fff;border:1.2px solid #D5DBE6}
.ink .week td.wm{background:#fff;color:${C.ink};border:2px solid var(--c)}
.ink .review svg use{fill:none;stroke:${C.tomato};stroke-width:4}
/* cover */
.cover{background:${C.wash}}
.cover .panel{position:absolute;left:0;top:0;right:0;background:var(--panel)}
.cv-head{position:absolute;left:56px;right:56px;top:58px}
.cover .kick{color:${C.ink};font-size:13px}
.cover h1{margin:6px 0 0;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:${S.W > 800 ? 74 : 72}px;line-height:.98;letter-spacing:-.035em;color:${C.ink}}
.n52{display:inline-block;background:${C.tomato};color:#fff;border-radius:18px;padding:0 14px 4px;line-height:1.02;margin-right:4px}
.csub{margin:16px 0 0;max-width:400px;font-size:18px;line-height:1.38;font-weight:700}
.cv-people{position:absolute;left:24px;overflow:visible}
.fan{position:absolute;width:0;height:0}
.fan-card{position:absolute;left:-120px;top:-168px;transform-origin:50% 50%}
.fan-card .card{border-radius:0}
.cv-low{position:absolute;left:56px;right:56px}
.tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px}
.tile{background:#fff;border-radius:14px;padding:10px 12px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;border-bottom:6px solid var(--c)}
.tile b{font-family:"Fredoka",sans-serif;font-weight:600;font-size:22px;line-height:1}
.tile b.mw{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:17px}
.tile span{font-size:11px;font-weight:800}
.tile em{flex-basis:100%;font-style:normal;font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;opacity:.65}
.inside h2{margin:0 0 8px;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:19px}
.inside ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:6px 22px}
.inside li{display:flex;gap:8px;align-items:flex-start;font-size:12.5px;line-height:1.35;font-weight:600}
.inside li svg{flex:none;margin-top:1px}
.cv-foot{position:absolute;left:56px;right:56px;bottom:26px;display:flex;align-items:center;justify-content:space-between;font-size:8.5px;font-weight:700}
.cv-foot span{opacity:.7;text-align:right;line-height:1.45}
.cv-foot span b{font-size:11px;opacity:1}
`;
}

// ---------- assemble a product document ----------
function logoRel(fromDir) { return path.relative(fromDir, path.join(REPO, 'brand/logo')).split(path.sep).join('/') + '/'; }
function fontRel(fromDir) { return path.relative(fromDir, path.join(REPO, 'brand/fonts/fonts.css')).split(path.sep).join('/'); }

// Page plan. A: cover, guide, print+safety, 8 no-cut play pages, 6 card sheets, backs, blanks, tracker, next = 21.
// B: cover, guide, print+safety, 2 no-cut question pages, 6 card sheets, backs, blanks, labels, next = 15.
const pageCount = P => P.key === 'A' ? 21 : 15;
function buildPages(P, S, qrSvg, opts = {}) {
  const TOTAL = pageCount(P);
  const pages = [];
  let n = 0;
  pages.push(coverPage(P, S, ++n, TOTAL));
  pages.push(startPage(P, S, ++n, TOTAL));
  pages.push(printPage(P, S, ++n, TOTAL));
  if (P.key === 'A') BANDS.forEach(b => [0, 1].forEach(h => pages.push(noCutA(P, S, b, h, ++n, TOTAL))));
  else { pages.push(noCutB(P, S, MOMENTS.slice(0, 2), ++n, TOTAL, 1)); pages.push(noCutB(P, S, MOMENTS.slice(2), ++n, TOTAL, 2)); }
  for (let s = 0; s < 6; s++) {
    const cards = P.deck.slice(s * 9, s * 9 + 9).map(cd => P.card(cd, 0));
    pages.push(sheetPage(P, S, cards, `Sheet ${s + 1} of 6`, ++n, TOTAL));
  }
  pages.push(sheetPage(P, S, Array(9).fill(P.back(0)), 'Card backs (optional)', ++n, TOTAL));
  const blank = P.key === 'A' ? K.blankA(0) : K.blankB(0);
  pages.push(sheetPage(P, S, Array(9).fill(blank), 'Make your own: type or write', ++n, TOTAL));
  pages.push(P.key === 'A' ? trackerPage(P, S, ++n, TOTAL) : labelsPage(P, S, ++n, TOTAL));
  pages.push(nextPage(P, S, ++n, TOTAL, qrSvg));
  if (n !== TOTAL) throw new Error('page count mismatch ' + n + ' vs ' + TOTAL);
  return pages;
}

function htmlDoc(P, S, pagesHtml, fromDir, ink, extraCss = '') {
  K.setLogoBase(logoRel(fromDir));
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(P.title)}, ${P.agesLong}</title>
<link rel="stylesheet" href="${fontRel(fromDir)}">
<style>${pageCss(S)}${extraCss}</style>
</head><body class="${ink ? 'ink' : ''}">
${K.defs()}
${pagesHtml}
</body></html>`;
}

async function main() {
  const out = [];
  for (const P of Object.values(PRODUCTS)) {
    fs.mkdirSync(P.dir, { recursive: true });
    const qrSvg = (await QR.toString('https://' + P.bonus, { type: 'svg', margin: 0, color: { dark: C.ink, light: '#FFFFFF' }, errorCorrectionLevel: 'M' })).replace(/<\?xml[^>]*>/, '');
    fs.writeFileSync(path.join(__dirname, `qr-${P.key}.svg`), qrSvg);
    const etsyDir = path.join(P.dir, 'etsy-upload');
    fs.mkdirSync(etsyDir, { recursive: true });
    for (const ed of ['store', 'etsy']) {
      ED = ed;
      for (const [sk, S] of Object.entries(SIZES)) {
        for (const ink of [false, true]) {
          const name = `${P.pdfBase}${ink ? '-low-ink' : ''}${sk === 'a4' ? '-A4' : ''}`;
          const etsyName = { 'false-letter': '2-Color-US-Letter', 'false-a4': '3-Color-A4', 'true-letter': '4-Low-Ink-US-Letter', 'true-a4': '5-Low-Ink-A4' }[`${ink}-${sk}`];
          // main source.html = store edition, Letter, full color, in the product folder; the rest live in build/gen
          const isMain = ed === 'store' && sk === 'letter' && !ink;
          const file = isMain ? path.join(P.dir, 'source.html') : path.join(GEN, `${P.key}-${ed}-${name}.html`);
          K.setLogoBase(logoRel(path.dirname(file)));
          const pages = buildPages(P, S, qrSvg);
          fs.writeFileSync(file, htmlDoc(P, S, pages.join('\n'), path.dirname(file), ink));
          const pdf = ed === 'store' ? path.join(P.dir, name + '.pdf') : path.join(etsyDir, etsyName + '.pdf');
          out.push({ product: P.key, ed, size: sk, ink, html: file, pdf, W: S.W, H: S.H, gx: S.gx, gy: S.gy, main: isMain, lowInkPreview: ed === 'store' && sk === 'letter' && ink });
          if (isMain) {
            const cf = path.join(GEN, `${P.key}-cover.html`);
            K.setLogoBase(logoRel(GEN));
            fs.writeFileSync(cf, htmlDoc(P, S, coverPage(P, S, 1, pageCount(P)), GEN, false));
          }
        }
      }
      // START HERE (Letter; prints fine on A4 with "Fit")
      const sf = path.join(GEN, `${P.key}-${ed}-start-here.html`);
      K.setLogoBase(logoRel(GEN));
      fs.writeFileSync(sf, htmlDoc(P, SIZES.letter, startHerePage(P, SIZES.letter, qrSvg), GEN, false));
      out.push({ product: P.key, ed, startHere: true, html: sf, pdf: ed === 'store' ? path.join(P.dir, 'START-HERE.pdf') : path.join(etsyDir, '1-START-HERE.pdf') });
    }
    ED = 'store';
  }
  fs.writeFileSync(path.join(GEN, 'manifest.json'), JSON.stringify(out, null, 1));
  console.log('wrote', out.length, 'documents');
}
module.exports = { PRODUCTS, SIZES, pageCss, htmlDoc, logoRel, fontRel, coverArt, fan, pageCount };
if (require.main === module) main().catch(e => { console.error(e); process.exit(1); });
