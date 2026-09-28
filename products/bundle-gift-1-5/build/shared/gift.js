// Gift-reveal pieces shared by products/gift-reveal-coupons and both bundles:
//   foldCard(ctx, o)  - one page: a card to cut out and fold in half (front upright, back upside down,
//                       inside left blank for a handwritten message);
//   revealCards(ctx, o) - one page: two flat "Surprise! Inside is..." cards.
// Pieces are cut on straight lines only and carry no web address (the page footer, which does, is cut away).
'use strict';
const K = require('./kit.js');
const { C, D, esc, icon, mi, field, logo, CHARS } = K;

function giftArt(ctx, dispW = 440) {
  const w = 440, h = 230;
  const { kid, adult, KIDS, ADULTS } = CHARS;
  const floor = h - 6;
  const iconAt = (n, x, y, s) => icon(n, ctx, s).replace('<svg class="ic ', `<svg x="${x}" y="${y}" class="ic `);
  return `<svg viewBox="0 0 ${w} ${h}" width="${dispW}" height="${Math.round(dispW * h / w)}" aria-hidden="true">
    <ellipse class="fw" cx="${w / 2}" cy="${floor + 2}" rx="${w / 2 - 20}" ry="9"/>
    ${adult(Object.assign({}, ADULTS.G2, { x: 120, y: floor - 81 * 0.95, s: 0.95, aL: 30, aR: -110, face: 'laugh' }))}
    ${kid(Object.assign({}, KIDS.D, { x: 222, y: floor - 27 * 1.05, s: 1.05, aL: 150, aR: -150, face: 'joy' }))}
    ${iconAt('gift', 268, floor - 112, 112)}
    ${iconAt('star', 10, 8, 56)}
  </svg>`;
}

// o: { kicker, title, sub, icons: [art names], toLine: true }
function foldCard(ctx, o) {
  const W = ctx.W - 96, top = 52, half = Math.floor((ctx.H - 74 - 70 - top) / 2);
  const back = `<div class="fc-back">
      ${logo(ctx, 'stacked', null, 'fc-logo')}
      <p class="fc-bt">${esc(o.backLine || 'Printable play for families')}</p>
      <p class="fc-bs">${K.OWNER}</p>
    </div>`;
  const front = `<div class="fc-front">
      <div class="fc-left">
        <p class="kicker ${o.kickerCls || 'd-tomato'}">${esc(o.kicker || 'A gift for you')}</p>
        <h2 class="fc-title">${o.title || 'A gift<br>of play'}</h2>
        ${o.sub ? `<p class="fc-sub">${esc(o.sub)}</p>` : ''}
        ${o.icons ? `<div class="fc-icons">${o.icons.map(a => `<span class="fc-ic li-white">${icon(a, ctx, 40)}</span>`).join('')}</div>` : ''}
        <div class="fc-lines">
          <div><span>For</span><div class="field" ${field(o.prefix + '_for', { size: 14 })}></div></div>
          <div><span>From</span><div class="field" ${field(o.prefix + '_from', { size: 14 })}></div></div>
        </div>
      </div>
      <div class="fc-art">${giftArt(ctx, 350)}</div>
    </div>`;
  return `<div class="fc" style="top:${top}px;width:${W}px;height:${half * 2}px">
    <div class="fc-half fc-top li-white" style="height:${half}px">${back}</div>
    <div class="fc-fold"><span>${mi('scissors', 12)} Cut on the outer line · fold here · write your message inside</span></div>
    <div class="fc-half fc-bot li-white" style="height:${half}px">${front}</div>
  </div>`;
}

// o: { prefix, title, items: [strings] | null (blank lines), note }
function revealCards(ctx, o) {
  const W = ctx.W - 96, top = 52, h = Math.floor((ctx.H - 74 - 70 - top - 24) / 2);
  const one = (k, style) => `<div class="rv li-white" style="height:${h}px">
      <div class="rv-in">
        <div class="rv-head"><p class="kicker d-plum">${esc(o.kicker || 'Surprise!')}</p><h3>${esc(o.title || 'Inside is…')}</h3></div>
        <div class="rv-body">
          ${o.items ? `<ul class="rv-list">${o.items.map(([a, t]) => `<li>${icon(a, ctx, 34)}<span>${esc(t)}</span></li>`).join('')}</ul>`
            : `<div class="rv-blank">${[1, 2, 3, 4].map(i => `<div class="field" ${field(`${o.prefix}${k}_item${i}`, { size: 13 })}></div>`).join('')}</div>`}
          <div class="rv-side">${icon(style, ctx, 96)}</div>
        </div>
        <div class="rv-lines">
          <div><span>For</span><div class="field" ${field(`${o.prefix}${k}_for`, { size: 13 })}></div></div>
          <div><span>From</span><div class="field" ${field(`${o.prefix}${k}_from`, { size: 13 })}></div></div>
        </div>
      </div>
    </div>`;
  return `<div class="rvs" style="top:${top}px;width:${W}px">
    ${one('a', o.art1 || 'gift')}
    <div class="rv-cut"><span>${mi('scissors', 12)} Cut on the dashed lines</span></div>
    ${one('b', o.art2 || 'heart')}
  </div>`;
}

function css(ctx) {
  return `
.fc{position:absolute;left:48px;border:1.6px dashed #8C96AA;border-radius:4px}
.fc-half{position:absolute;left:0;right:0;overflow:hidden}
.fc-top{top:0;background:${C.wash}}
.fc-bot{bottom:0;background:${C.tSun}}
.fc-fold{position:absolute;left:0;right:0;top:50%;border-top:1.6px dashed #8C96AA;z-index:2}
.fc-fold span{position:absolute;left:50%;transform:translate(-50%,-50%);background:#FFFFFF;padding:2px 10px;font-size:9.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#3C4760;white-space:nowrap;display:flex;gap:6px;align-items:center;border-radius:6px}
.fc-back{position:absolute;inset:0;transform:rotate(180deg);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center}
.fc-logo{height:120px;width:auto}
.fc-bt{font-size:15px;font-weight:800}
.fc-bs{font-size:9px;color:#3C4760}
.fc-front{position:absolute;inset:0;display:flex;align-items:stretch;padding:26px 30px}
.fc-left{flex:1;display:flex;flex-direction:column}
.fc-title{font-size:62px;line-height:.95;letter-spacing:-.03em;margin-top:8px}
.fc-sub{font-size:15px;font-weight:700;margin-top:10px;max-width:360px;line-height:1.35}
.fc-icons{display:flex;gap:8px;margin-top:12px}
.fc-ic{width:52px;height:52px;border-radius:50%;background:#FFFFFF;display:flex;align-items:center;justify-content:center}
.fc-lines{margin-top:auto;display:grid;grid-template-columns:1fr 1fr;gap:18px;font-size:13px;font-weight:800}
.fc-lines .field,.rv-lines .field{height:26px;margin-top:3px;background:transparent}
.fc-art{flex:none;align-self:flex-end}
.rvs{position:absolute;left:48px;display:flex;flex-direction:column;gap:0}
.rv{border:1.6px dashed #8C96AA;border-radius:4px;background:${C.tPlum};padding:14px}
.rv + .rv-cut + .rv{background:${C.tSky}}
.rv-cut{height:24px;position:relative}
.rv-cut span{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:9.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#3C4760;display:flex;gap:6px;align-items:center}
.rv-in{height:100%;background:#FFFFFF;border-radius:16px;padding:18px 22px;display:flex;flex-direction:column}
.rv-head h3{font-size:40px;margin-top:4px}
.rv-body{flex:1;display:flex;gap:18px;align-items:center;min-height:0}
.rv-list{list-style:none;margin:0;padding:0;flex:1;display:flex;flex-direction:column;gap:6px}
.rv-list li{display:flex;align-items:center;gap:10px;font-size:15px;font-weight:800}
.rv-blank{flex:1;display:flex;flex-direction:column;gap:12px}
.rv-blank .field{height:28px;background:transparent}
.rv-side{flex:none}
.rv-lines{display:grid;grid-template-columns:1fr 1fr;gap:18px;font-size:13px;font-weight:800}
body.lowink .fc-top,body.lowink .fc-bot,body.lowink .rv{background:#FFFFFF!important}
body.lowink .rv-in{box-shadow:inset 0 0 0 1.5px ${C.line}}
`;
}

module.exports = { foldCard, revealCards, giftArt, css };
