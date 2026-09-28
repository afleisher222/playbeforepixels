// Card components shared by the print sheets, the POD-later deck files and the listing images.
// Poker size: 2.5 x 3.5 in trim = 240 x 336 CSS px at 96 dpi. `b` = bleed in px (12 px = 0.125 in).
const { ICONS, SHAPE, ALL_SYMBOLS, head, C, KIDS, ADULTS, kid, adult, use } = require('./art.js');
const { BANDS, MOVES, PLAYS, MOMENTS, PROMPTS } = require('./content.js');

const CW = 240, CH = 336;
const TINT = { sky: C.tSky, grass: C.tGrass, sun: C.tSun, tomato: C.tTomato, plum: C.tPlum };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const pad2 = n => String(n).padStart(2, '0');
const COPY = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.';

const defs = () => `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${ALL_SYMBOLS.join('\n')}</defs></svg>`;
const shapeSvg = (shape, col, px = 14) => `<svg viewBox="-11 -11 22 22" width="${px}" height="${px}" aria-hidden="true">${SHAPE[shape](col)}</svg>`;
const speech = (col, px = 16) => `<svg viewBox="-16 -16 32 32" width="${px}" height="${px}" aria-hidden="true"><circle r="16" fill="${col}"/><use href="#speech"/></svg>`;
const shield = (col, px = 11) => `<svg viewBox="0 0 20 22" width="${px}" height="${px * 1.1}" aria-hidden="true"><path d="M10 0L20 4V10C20 16 15.5 20.5 10 22C4.5 20.5 0 16 0 10V4Z" fill="${col}"/><path d="M5.5 11l3 3 6-6.5" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const icon = (id, s = 1) => `<g transform="scale(${s})">${ICONS[id]()}</g>`;

// ---------------- deck A: play cards ----------------
const DECK_A = []; // 54 entries in print order
DECK_A.push({ kind: 'howto' });
let n = 0;
BANDS.forEach(b => PLAYS[b.key].forEach(pl => DECK_A.push(Object.assign({ kind: 'play', no: ++n, band: b }, pl))));
DECK_A.push({ kind: 'blank' });

function bandDeco(shape, x, y, s, style) {
  return `<g transform="translate(${x},${y}) scale(${s})" style="${style}">${SHAPE[shape]('currentColor')}</g>`;
}

function cardA(cd, b = 0) {
  const W = CW + 2 * b, H = CH + 2 * b;
  if (cd.kind === 'howto') return howtoA(b);
  if (cd.kind === 'blank') return blankA(b);
  const bd = cd.band, col = C[bd.color], tint = TINT[bd.color];
  const mv = MOVES[cd.m];
  const art = `<svg class="art" viewBox="0 0 240 108" width="240" height="108" aria-hidden="true">
    ${bandDeco(bd.shape, 30, 84, 3.2, 'color:var(--deco)')}${bandDeco(bd.shape, 214, 30, 2.2, 'color:var(--deco)')}
    <circle cx="120" cy="58" r="45" fill="#fff"/><g transform="translate(120,58)">${icon(cd.i, .74)}</g></svg>`;
  return `<div class="card cA" style="--band:${col};--tint:${tint};--b:${b}px;width:${W}px;height:${H}px">
  <div class="bandbg" style="height:${b + 108}px"></div>
  <div class="trim">
    ${art}
    <span class="chip">${shapeSvg(bd.shape, col, 13)}<b>${bd.ages}</b> ${bd.unit}</span>
    <span class="num">${pad2(cd.no)}</span>
    <div class="body">
      <h3>${esc(cd.t)}</h3>
      <p class="need"><i>You need</i> ${esc(cd.n)}</p>
      <p class="play">${esc(cd.p)}</p>
      <div class="talk"><span class="tl">${speech(col, 13)}Talk tip <em>· ${mv.name}</em></span><p>${esc(cd.k)}</p></div>
      <p class="safe">${shield(col)}<span>${esc(cd.s || bd.safe)}</span></p>
    </div>
  </div>
</div>`;
}

function howtoA(b = 0) {
  const W = CW + 2 * b, H = CH + 2 * b;
  const key = BANDS.map(bd => `<li>${shapeSvg(bd.shape, C[bd.color], 13)}<b>${bd.ages}</b><span>${bd.label.replace(/^0–12 months$/, 'months')}</span></li>`).join('');
  return `<div class="card cA special" style="--band:${C.plum};--tint:${C.tPlum};--b:${b}px;width:${W}px;height:${H}px">
  <div class="bandbg" style="height:${b + 78}px"></div>
  <div class="trim">
    <div class="sp-head"><span class="sp-kick">Start here</span><h3>How to play</h3></div>
    <div class="body sp-body">
      <ol class="steps">
        <li>Find your child’s color.</li>
        <li>Pick a card, or let your child pick.</li>
        <li>Play for five minutes or more.</li>
        <li>Try the talk tip. Then wait.</li>
      </ol>
      <ul class="key">${BANDS.map(bd => `<li>${shapeSvg(bd.shape, C[bd.color], 13)}<b>${bd.ages}</b> ${bd.unit === 'yr' ? 'year' : 'years'}</li>`).join('')}</ul>
      <p class="safe big">${shield(C.plum, 12)}<span>Every card: a grown-up plays along and stays within reach.</span></p>
    </div>
  </div>
</div>`;
}

function blankA(b = 0, label = 'Your own play') {
  const W = CW + 2 * b, H = CH + 2 * b;
  return `<div class="card cA special blank" style="--band:${C.plum};--tint:${C.tPlum};--b:${b}px;width:${W}px;height:${H}px">
  <div class="bandbg" style="height:${b + 64}px"></div>
  <div class="trim">
    <div class="sp-head sm"><span class="sp-kick">Make it yours</span><h3>${label}</h3></div>
    <span class="num">+</span>
    <div class="body bl-body">
      <p class="bl-lab">Title</p><i class="ln"></i>
      <p class="bl-lab">You need</p><i class="ln"></i>
      <p class="bl-lab">The play</p><i class="ln"></i><i class="ln"></i><i class="ln"></i>
      <div class="talk bl-talk"><span class="tl">${speech(C.plum, 13)}Talk tip</span><i class="ln"></i><i class="ln"></i></div>
      <p class="bl-age">Ages: <span>0–1</span><span>1–2</span><span>2–3</span><span>3–5</span></p>
    </div>
  </div>
</div>`;
}

function backA(b = 0) {
  const W = CW + 2 * b, H = CH + 2 * b;
  const shapes = [];
  const cols = [C.sky, C.grass, C.sun, C.tomato];
  const sh = ['triangle', 'square', 'star', 'circle'];
  let k = 0;
  for (let y = -30; y < 380; y += 44) for (let x = -30 + ((y / 44) % 2 ? 22 : 0); x < 290; x += 44) {
    shapes.push(`<g transform="translate(${x},${y}) scale(1.05) rotate(${(k * 37) % 30 - 15})">${SHAPE[sh[k % 4]](cols[(k * 3 + 1) % 4])}</g>`); k++;
  }
  return `<div class="card back" style="--b:${b}px;width:${W}px;height:${H}px">
  <svg class="bgpat" viewBox="-${b} -${b} ${W} ${H}" width="${W}" height="${H}" aria-hidden="true"><rect x="-${b}" y="-${b}" width="${W}" height="${H}" fill="${C.ink}"/><g opacity=".9">${shapes.join('')}</g></svg>
  <div class="trim">
    <div class="bk-label">
      <img class="bk-mark" src="${LOGO.mark}" alt="">
      <p class="bk-t">Play &amp; Talk</p>
      <p class="bk-s">Cards · Ages 0–5</p>
      <p class="bk-b">Play Before Pixels</p>
    </div>
  </div>
</div>`;
}

// ---------------- deck B: family talk-along cards ----------------
const DECK_B = [];
DECK_B.push({ kind: 'howto' });
n = 0;
MOMENTS.forEach(m => PROMPTS[m.key].forEach(pr => DECK_B.push(Object.assign({ kind: 'prompt', no: ++n, mo: m }, pr))));
DECK_B.push({ kind: 'blank' });
const MOMENT_SUB = { dinner: 'Table talk', car: 'A passenger reads', bath: 'Grown-up stays close', bedtime: 'Wind-down talk' };

function qSize(q) { const L = q.length; return L <= 44 ? 22 : L <= 62 ? 20 : L <= 80 ? 18.5 : 17.5; }

function cardB(cd, b = 0) {
  const W = CW + 2 * b, H = CH + 2 * b;
  if (cd.kind === 'howto') return howtoB(b);
  if (cd.kind === 'blank') return blankB(b);
  const m = cd.mo, col = C[m.color], tint = TINT[m.color];
  const on = m.color === 'sun' ? C.ink : '#fff';
  const art = `<svg class="art" viewBox="0 0 240 84" width="240" height="84" aria-hidden="true">
    <circle cx="232" cy="84" r="46" style="fill:var(--deco)"/><circle cx="196" cy="8" r="16" style="fill:var(--deco)"/>
    <circle cx="46" cy="44" r="29" fill="#fff"/><g transform="translate(46,44)">${icon(m.icon, .46)}</g></svg>`;
  return `<div class="card cB" style="--band:${col};--tint:${tint};--on:${on};--b:${b}px;width:${W}px;height:${H}px">
  <div class="bandbg" style="height:${b + 84}px"></div>
  <div class="trim">
    ${art}
    <div class="mo"><b>${m.name}</b><span>${MOMENT_SUB[m.key]}</span></div>
    <span class="num">${pad2(cd.no)}</span>
    <div class="body">
      <p class="q" style="font-size:${qSize(cd.q)}px">${esc(cd.q)}</p>
      <div class="talk"><span class="tl">${speech(col, 13)}Grown-up tip</span><p>${esc(cd.k)}</p></div>
    </div>
  </div>
</div>`;
}

function howtoB(b = 0) {
  const W = CW + 2 * b, H = CH + 2 * b;
  return `<div class="card cB special" style="--band:${C.ink};--tint:${C.wash};--on:#fff;--b:${b}px;width:${W}px;height:${H}px">
  <div class="bandbg" style="height:${b + 78}px"></div>
  <div class="trim">
    <div class="sp-head"><span class="sp-kick">Start here</span><h3>How to talk along</h3></div>
    <div class="body sp-body">
      <ol class="steps">
        <li>Pick a card that fits the moment.</li>
        <li>Read it out loud.</li>
        <li>Everyone answers, grown-ups too.</li>
        <li>“Pass” is always allowed.</li>
      </ol>
      <ul class="key">${MOMENTS.map(m => `<li><svg viewBox="-11 -11 22 22" width="13" height="13"><circle r="9" fill="${C[m.color]}"/></svg><b>${m.name}</b></li>`).join('')}</ul>
      <p class="safe big">${shield(C.ink, 12)}<span>In the car, a passenger reads. The driver just talks.</span></p>
    </div>
  </div>
</div>`;
}

function blankB(b = 0) {
  const W = CW + 2 * b, H = CH + 2 * b;
  return `<div class="card cB special blank" style="--band:${C.ink};--tint:${C.wash};--on:#fff;--b:${b}px;width:${W}px;height:${H}px">
  <div class="bandbg" style="height:${b + 64}px"></div>
  <div class="trim">
    <div class="sp-head sm"><span class="sp-kick">Make it yours</span><h3>Your own question</h3></div>
    <span class="num">+</span>
    <div class="body bl-body">
      <p class="bl-lab">Our question</p><i class="ln"></i><i class="ln"></i><i class="ln"></i><i class="ln"></i>
      <div class="talk bl-talk"><span class="tl">${speech(C.ink, 13)}Grown-up tip</span><i class="ln"></i><i class="ln"></i></div>
      <p class="bl-age">For: <span>Dinner</span><span>Car</span><span>Bath</span><span>Bedtime</span></p>
    </div>
  </div>
</div>`;
}

function backB(b = 0) {
  const W = CW + 2 * b, H = CH + 2 * b;
  const cols = [C.tomato, C.sun, C.sky, C.plum];
  const bub = [];
  let k = 0;
  for (let y = -20; y < 380; y += 48) for (let x = -24 + ((y / 48) % 2 ? 26 : 0); x < 290; x += 52) {
    const f = (k % 2) ? -1 : 1;
    bub.push(`<g transform="translate(${x},${y}) scale(${1.25 * f},1.25)"><path d="M-10-8H10A5 5 0 0 1 15-3V3A5 5 0 0 1 10 8H1L-6 13V8H-10A5 5 0 0 1-15 3V-3A5 5 0 0 1-10-8Z" fill="${cols[(k * 3 + 2) % 4]}"/></g>`); k++;
  }
  return `<div class="card back" style="--b:${b}px;width:${W}px;height:${H}px">
  <svg class="bgpat" viewBox="-${b} -${b} ${W} ${H}" width="${W}" height="${H}" aria-hidden="true"><rect x="-${b}" y="-${b}" width="${W}" height="${H}" fill="${C.ink}"/><g opacity=".9">${bub.join('')}</g></svg>
  <div class="trim">
    <div class="bk-label">
      <img class="bk-mark" src="${LOGO.mark}" alt="">
      <p class="bk-t">Talk-Along</p>
      <p class="bk-s">Family cards · Ages 5–12</p>
      <p class="bk-b">Play Before Pixels</p>
    </div>
  </div>
</div>`;
}

// logo paths are set by the caller relative to the HTML file being written
const LOGO = { mark: '', lockup: '', lockupWhite: '' };
function setLogoBase(rel) {
  LOGO.mark = rel + 'mark.svg'; LOGO.lockup = rel + 'lockup-horizontal.svg'; LOGO.lockupWhite = rel + 'lockup-horizontal-white.svg';
  LOGO.markWhite = rel + 'mark-white.svg'; LOGO.wordmark = rel + 'wordmark.svg';
}

const CARD_CSS = `
symbol{overflow:visible}
.sk{fill:var(--sk)} .hr{fill:var(--hr)} .sh{fill:var(--sh)} .pa{fill:var(--pa)} .so{fill:var(--so)} .hw{fill:var(--hw)} .ck{fill:${C.tomato};opacity:.28}
.card{position:relative;overflow:hidden;background:#fff;color:${C.ink};font-family:"Nunito Sans","Helvetica Neue",Arial,sans-serif;--deco:rgba(255,255,255,.2);flex:none}
.card .bandbg{position:absolute;left:0;right:0;top:0;background:var(--band)}
.card .trim{position:absolute;left:var(--b);top:var(--b);width:${CW}px;height:${CH}px}
.card .art{position:absolute;left:0;top:0;display:block}
.chip,.num{position:absolute;top:11px;height:22px;border-radius:11px;background:#fff;display:flex;align-items:center;font-weight:800;color:${C.ink};line-height:1}
.chip{left:12px;padding:0 9px 0 6px;gap:4px;font-size:9.5px;letter-spacing:.02em}
.chip b{font-family:"Fredoka","Nunito Sans",sans-serif;font-weight:600;font-size:13px;letter-spacing:0}
.num{right:12px;min-width:30px;justify-content:center;padding:0 7px;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-size:12.5px}
.cA .body{position:absolute;left:15px;right:15px;top:117px;bottom:12px;display:flex;flex-direction:column}
.cA h3{margin:0 0 3px;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:17px;line-height:1.05;letter-spacing:-.015em}
.need{margin:0 0 5px;font-size:9.5px;line-height:1.25;font-weight:700}
.need i{font-style:normal;font-weight:800;font-size:7.5px;letter-spacing:.12em;text-transform:uppercase;opacity:.6;margin-right:3px}
.play{margin:0;font-size:10.6px;line-height:1.36;font-weight:600}
.talk{margin-top:auto;background:var(--tint);border-radius:10px;padding:6px 9px 7px}
.talk .tl{display:flex;align-items:center;gap:5px;font-weight:800;font-size:7.5px;letter-spacing:.11em;text-transform:uppercase;margin-bottom:2px}
.talk .tl em{font-style:normal;opacity:.7}
.talk p{margin:0;font-size:10.2px;line-height:1.3;font-weight:700}
.safe{margin:6px 0 0;display:flex;align-items:flex-start;gap:5px;font-size:8.2px;line-height:1.25;font-weight:700;opacity:.82;min-height:20px}
.safe svg{flex:none;margin-top:1px}
/* special cards */
.special .sp-head{position:absolute;left:15px;right:15px;top:14px;color:#fff}
.sp-kick{display:block;font-weight:800;font-size:8px;letter-spacing:.14em;text-transform:uppercase;opacity:.85;margin-bottom:3px}
.special .sp-head h3{margin:0;color:#fff;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:24px;letter-spacing:-.02em;line-height:1.02}
.special .sp-head.sm h3{font-size:20px}
.sp-body{top:92px!important}
.cB .sp-body{position:absolute;left:15px;right:15px;top:92px;bottom:12px;display:flex;flex-direction:column}
.steps{margin:0 0 8px;padding:0;list-style:none;counter-reset:s}
.steps li{counter-increment:s;position:relative;padding-left:24px;margin:0 0 6px;font-size:10.8px;line-height:1.3;font-weight:700;min-height:17px}
.steps li::before{content:counter(s);position:absolute;left:0;top:-1px;width:17px;height:17px;border-radius:50%;background:var(--band);color:#fff;font-family:"Fredoka",sans-serif;font-weight:600;font-size:10px;display:flex;align-items:center;justify-content:center}
.key{margin:0;padding:8px 10px;list-style:none;background:var(--tint);border-radius:10px;display:grid;grid-template-columns:1fr 1fr;gap:5px 8px}
.key li{display:flex;align-items:center;gap:5px;font-size:9.5px;font-weight:700}
.key b{font-family:"Fredoka",sans-serif;font-weight:600;font-size:12px}
.cB .key b{font-family:"Nunito Sans",sans-serif;font-weight:800;font-size:10px}
.safe.big{margin-top:auto;font-size:9px;opacity:1}
.bl-body{position:absolute;left:15px;right:15px;top:74px;bottom:12px;display:flex;flex-direction:column}
.bl-lab{margin:6px 0 0;font-weight:800;font-size:7.5px;letter-spacing:.12em;text-transform:uppercase;opacity:.6}
.ln{display:block;height:17px;border-bottom:1.2px solid rgba(29,41,64,.28)}
.bl-talk{margin-top:10px}
.bl-talk .ln{border-color:rgba(29,41,64,.22)}
.bl-age{margin:8px 0 0;font-size:8.5px;font-weight:800;display:flex;gap:4px;align-items:center}
.bl-age span{border:1.2px solid rgba(29,41,64,.35);border-radius:8px;padding:1px 5px;font-weight:700}
/* deck B */
.cB .mo{position:absolute;left:84px;top:24px;color:var(--on)}
.cB .mo b{display:block;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:23px;letter-spacing:-.02em;line-height:1}
.cB .mo span{display:block;font-size:8.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-top:4px;opacity:.92}
.cB .num{top:auto;bottom:auto;top:11px}
.cB .body{position:absolute;left:16px;right:16px;top:100px;bottom:13px;display:flex;flex-direction:column}
.cB .q{margin:0;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:700;line-height:1.16;letter-spacing:-.012em}
.cB .talk p{font-size:10.4px}
/* backs */
.back .bgpat{position:absolute;left:0;top:0}
.bk-label{position:absolute;left:34px;right:34px;top:88px;height:160px;background:#fff;border-radius:22px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:${C.ink}}
.bk-mark{width:38px;height:auto;margin-bottom:8px}
.bk-t{margin:0;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:25px;letter-spacing:-.02em;line-height:1}
.bk-s{margin:5px 0 0;font-size:10px;font-weight:800;letter-spacing:.06em}
.bk-b{margin:10px 0 0;font-size:8px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;opacity:.6}
/* ink-saver colorway */
.ink .card{--deco:transparent}
.ink .cA:not(.special) .bandbg,.ink .cB:not(.special) .bandbg{background:var(--tint)}
.ink .cB:not(.special){--on:${C.ink}}
.ink .cA:not(.special) .talk,.ink .cB:not(.special) .talk{background:#fff;border:1.4px solid var(--band)}
.ink .special .bandbg{background:var(--tint)}
.ink .special .sp-head,.ink .special .sp-head h3{color:${C.ink}}
.ink .back .bgpat rect{fill:#fff}
.ink .back .bk-label{border:2px solid ${C.ink}}
`;

module.exports = { CW, CH, DECK_A, DECK_B, cardA, cardB, backA, backB, blankA, blankB, defs, CARD_CSS, setLogoBase, LOGO, COPY, TINT, shapeSvg, speech, shield, icon, esc, pad2 };
