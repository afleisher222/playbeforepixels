// Activity pages and piece sheets.
const { BANDS, CELL, BIG, PANEL, INNER, header, footer, pieceGrid, ui, esc, C } = require('./core.js');
const { BB } = require('./lib.js');

const monthsLabel = m => m >= 36 && m % 12 === 0 ? `from ${m / 12} years` : `from ${m} months`;

function safetyLine(a) {
  const parts = ['<b>Play together</b>, with a grown-up right there.'];
  if (a.cut || a.usesPiecesOf) {
    if (a.band === 'b3') parts.push('<b>Grown-up keeps the pieces</b> and counts them back in. Velcro is optional: <b>check dots before each play</b>, and keep pieces away from under-3s.');
    else parts.push('<b>Grown-up keeps the pieces</b> and counts them back in. No velcro dots for under-3s: lay pieces on top.');
  }
  if (a.safety) parts.push(a.safety);
  return parts.join(' ');
}

function wordPanel(a) {
  const m = a.word;
  const art = BB.wordArt(m);
  const bg = (art.match(/fill="(#[0-9A-Fa-f]{6})"/) || [])[1] || '#FFFFFF';
  const S = PANEL.h - 24; // square scene, full panel height
  const fs = Math.min(m.fs * 0.9, 140);
  const word = `<text x="300" y="${40 + fs * 0.74}" text-anchor="middle" font-family="Fredoka, Nunito Sans, sans-serif" font-weight="600" font-size="${fs}" fill="${m.dark ? '#FFFFFF' : C.ink}" class="ink">${esc(m.w)}</text>`;
  const cueLab = { say: 'Say it', sign: 'Sign it', act: 'Act it' }[m.cue[0]];
  return { bg, svg: `<svg class="board scene" width="${PANEL.w}" height="${PANEL.h}" viewBox="0 0 ${PANEL.w} ${PANEL.h}" style="left:0;top:0"><rect class="tint" x="0" y="0" width="${PANEL.w}" height="${PANEL.h}" fill="${bg}"/><svg x="${(PANEL.w - S - 24) / 2}" y="0" width="${S + 24}" height="${PANEL.h}" viewBox="-12 -12 624 624" preserveAspectRatio="xMidYMid slice">${art}${word}</svg>
    <g transform="translate(18,${PANEL.h - 58})"><rect class="tint" x="0" y="0" width="${Math.max(170, m.cue[1].length * 8.6 + 110)}" height="40" rx="20" fill="#FFFFFF"/><text x="16" y="26" font-family="Nunito Sans, sans-serif" font-weight="800" font-size="11" letter-spacing="1.5" fill="${C.tomato}">${cueLab.toUpperCase()}</text><text x="${16 + cueLab.length * 9 + 10}" y="26" font-family="Bricolage Grotesque, sans-serif" font-weight="700" font-size="15" fill="${C.ink}">${esc(m.cue[1])}</text></g></svg>` };
}

function activityPage(a, ctx, pn) {
  const B = BANDS[a.band];
  let right = '';
  if (a.cut) right = `<span class="tag">${ui('u-scissors')}Cut pieces on page ${ctx.sheetPage[a.id]}</span>`;
  else if (a.usesPiecesOf) right = `<span class="tag">${ui('u-scissors')}Uses the cards on page ${ctx.sheetPage[a.usesPiecesOf]}</span>`;
  else right = `<span class="tag">${ui('u-nocut')}No cutting: play today</span>`;
  let play;
  if (a.kind === 'word') { const w = wordPanel(a); play = `<div class="play" style="background:${w.bg}">${w.svg}</div>`; }
  else {
    const bgc = a.panel === 'plum' ? C.tPlum : null;
    play = `<div class="play"${bgc ? ` style="background:${bgc}"` : ''}><svg class="board" width="${INNER.w}" height="${INNER.h}" viewBox="0 0 ${INNER.w} ${INNER.h}" overflow="visible">${a.board()}</svg></div>`;
  }
  return `<section class="page band-${a.band}" data-act="${a.id}"><div class="live">
  ${header(a.band, a.cat, right)}
  <div class="tt"><h1>${a.title}</h1><p class="how">${a.how}</p></div>
  ${play}
  <div class="gu">
    <div class="talk">${ui('u-talk')}<div><span class="lab">Talk while you play <i>· ${a.talk[0]}</i></span><q>${a.talk[1]}</q></div></div>
    <div class="row3"><div class="box"><span class="lab">Make it easier</span>${a.easier}</div><div class="box"><span class="lab">Make it harder</span>${a.harder}</div><div class="box tired"><span class="lab">Tired? 2-minute version</span>${a.tired}</div></div>
    <div class="meta"><span>${ui('u-pin')}<b>${B.label}</b>&nbsp;· ${monthsLabel(a.from)}</span><span>${ui('u-clock')}Prep: ${a.prep}</span><span>${ui('u-drop-o')}Mess: ${a.mess}</span><span>${ui('u-bag')}Needs: ${a.needs}</span></div>
    <div class="safe">${ui('u-shield')}<span>${safetyLine(a)}</span></div>
  </div>
  ${footer(ctx, pn)}
</div></section>`;
}

function sheetPage(a, ctx, pn) {
  const cell = a.cell === 'big' ? BIG : CELL;
  const cols = a.cols || (a.cell === 'big' ? 2 : 3);
  const g = pieceGrid(a.pieces, cell, cols, 'p.' + ctx.usedBy[a.id].join('+'));
  const minIn = (Math.min(cell.w, cell.h) / 96).toFixed(2).replace(/0$/, '');
  const cm = (Math.min(cell.w, cell.h) / 96 * 2.54).toFixed(1);
  const forWhat = a.piecesFor ? `${a.piecesFor} (pages ${ctx.usedBy[a.id].join(' and ')})` : `page ${ctx.actPage[a.id]}: ${a.title}`;
  const velcro = a.band === 'b3' ? 'Velcro is optional: <b>check dots before each play</b>; throw away any piece whose dot lifts.' : '<b>No velcro dots for under-3s:</b> lay pieces on top. Throw away torn or peeling pieces.';
  return `<section class="page band-${a.band} sheet" data-sheet="${a.id}"><div class="live">
  ${header(a.band, 'Cut-out pieces', `<span class="tag">${ui('u-scissors')}${a.pieces.length} pieces · for ${a.piecesFor ? 'pages ' + ctx.usedBy[a.id].join(' and ') : 'page ' + ctx.actPage[a.id]}</span>`)}
  <div class="tt"><h1 style="font-size:23px">Pieces for ${forWhat}</h1></div>
  <div class="cutnote">${ui('u-scissors')}<span>Cut on the dashed lines: straight cuts only. Every piece is ${minIn} in (${cm} cm) or bigger: bigger than a toilet-paper tube.</span></div>
  <div class="grid" style="top:${a.cell === 'big' ? 120 : 104}px">${g.svg}</div>
  <div class="keep">${ui('u-shield')}<div class="big">Grown-up keeps<br>the pieces</div><p>Count pieces out and back in; store them in a labeled pouch. ${velcro}</p></div>
  ${footer(ctx, pn)}
</div></section>`;
}

module.exports = { activityPage, sheetPage, monthsLabel, safetyLine };
