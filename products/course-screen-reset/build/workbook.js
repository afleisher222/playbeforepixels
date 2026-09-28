// Builds every interior edition of "30 Days of Back-and-Forth" from content.js:
//   workbook (instant download): Color and Low-ink, each in US Letter and A4, with type-in fields
//   paperback (Amazon KDP): 8 x 10 in trim, black-and-white interior, bleed on top, bottom and outside edge
//   etsy: Color Letter with no URL or QR (marketplace rule, CUSTOMER-VOICE #2)
// Run: node build/workbook.js [variantKey]
const fs = require('fs');
const path = require('path');
const P = require('./parts.js');
const { C, W, K, esc, pad2, WC, weekOf, wc, qrSvg, ico, drops, ageLabel, artDisc, fld, sceneCover, WEEK_SCENES, sceneSvg, playCard, scriptBox, COPY, SITE, BONUS } = P;

// Paperback ISBN, printed as plain text on the copyright page only once it exists (KDP free ISBN or an owned one;
// the copyright-page line is optional on KDP, UNVERIFIED). Leave '' until then. See ../founder-notes.md.
const ISBN_PAPERBACK = '';

const VARIANTS = {
  'color-letter': { file: 'source.html', w: 8.5, h: 11, m: .55, low: false, gray: false, url: true, book: false, fill: true },
  'color-a4': { file: 'source-color-a4.html', w: 8.27, h: 11.69, m: .55, low: false, gray: false, url: true, book: false, fill: true },
  'lowink-letter': { file: 'source-lowink-letter.html', w: 8.5, h: 11, m: .55, low: true, gray: false, url: true, book: false, fill: true },
  'lowink-a4': { file: 'source-lowink-a4.html', w: 8.27, h: 11.69, m: .55, low: true, gray: false, url: true, book: false, fill: true },
  'kdp': { file: 'paperback/source-kdp.html', w: 8.125, h: 10.25, m: .55, low: true, gray: true, url: true, book: true, fill: false, bleed: .125, gutter: .75 },
  'etsy-letter': { file: 'build/etsy/source-etsy-letter.html', w: 8.5, h: 11, m: .55, low: false, gray: false, url: false, book: false, fill: false },
};

function toGray(html) {
  return html.replace(/(?<![\w-])#([0-9a-fA-F]{6})(?![\w-])/g, (m, h) => {
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    let L = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    if (L < 70) L = 26; else if (L > 225 && L < 255) L = Math.max(L - 8, 226);
    const x = L.toString(16).padStart(2, '0'); return '#' + x + x + x;
  });
}

function doc(V) {
  const depth = V.file.split('/').length - 1;
  const up = '../'.repeat(depth);
  const FONTS = up + '../../brand/fonts/fonts.css';
  const LOGO = up + '../../brand/logo/lockup-horizontal' + (V.gray ? '-black' : '') + '.svg';
  const MARK = up + '../../brand/logo/mark-small' + (V.gray ? '-black' : '') + '.svg';
  let pageNo = 0;
  const pages = [];
  const F = (name, cls = '', lines = 1) => V.fill ? fld(name, cls, lines) : `<span class="field ${cls}" data-lines="${lines}"></span>`;

  // ---------- page shell
  function page(body, o = {}) {
    pageNo++;
    const n = pageNo, recto = n % 2 === 1;
    let pad;
    if (V.book) {
      const b = V.bleed, g = V.gutter, m = V.m;
      pad = { t: b + m, b: b + .5, l: recto ? g : b + m, r: recto ? b + m : g };
    } else pad = { t: V.m, b: .5, l: V.m, r: V.m };
    const footer = o.nofoot ? '' : `<footer class="foot" style="left:${pad.l}in;right:${pad.r}in;bottom:${V.book ? V.bleed + .42 : .28}in">
      <span class="fl">${V.url ? `<img src="${MARK}" alt="" class="fmark">` : ''}<b>${esc(K.TITLE)}</b>${o.run ? ' · ' + esc(o.run) : ''}</span>
      <span class="fr">${V.url ? SITE + ' · ' : 'Play Before Pixels · '}${K.VERSION}<b class="pn">${n}</b></span></footer>`;
    pages.push(`<section class="page ${o.cls || ''}" style="${o.bg && !V.low ? `background:${o.bg};` : ''}">
      <div class="inner" style="padding:${pad.t}in ${pad.r}in ${pad.b + .35}in ${pad.l}in">${body}</div>${footer}</section>`);
  }
  const LOCKUP = `<div class="cv-top"><div class="cv-num">30</div><div class="cv-t">Days<br>of</div></div><div class="cv-bf">Back-and-Forth</div>`;
  const NOPREP = K.DAYS.filter(d => d.play.prep === 0).length;
  const H = (kicker, title, color = C.ink, deep = C.ink) => `<header class="ph"><div class="kick" style="color:${deep}">${kicker}</div><h1 style="color:${color}">${title}</h1></header>`;

  // ================================================================= FRONT MATTER
  if (!V.book) {
    page(`<div class="cover">
        ${LOCKUP}
        <p class="cv-sub">${esc(K.SUB)}</p>
        <div class="cv-scene">${sceneSvg(sceneCover, '', '20 150 560 360')}</div>
        <p class="cv-tag">${esc(K.TAGLINE)}</p>
        <p class="cv-ed">Workbook &amp; trackers · ${V.low ? 'Low-ink edition' : 'Color edition'} · ${V.w === 8.5 ? 'US Letter' : 'A4'} · ${NOPREP} of 30 plays need no prep; the rest take about 2 minutes</p>
        <div class="cv-logo">${V.url ? `<img src="${LOGO}" alt="Play Before Pixels">` : '<span class="wm">Play Before Pixels</span>'}</div>
      </div>`, { nofoot: true, cls: 'cvpage', bg: C.tSun });
  } else {
    page(`<div class="titlep">
        ${LOCKUP}
        <p class="cv-sub">${esc(K.SUB)}</p>
        <p class="tp-tag">30 short lessons, 30 easy plays and plain words for tricky moments, for families with children aged 1 to 12</p>
        <div class="tp-scene">${sceneSvg(sceneCover, '', '20 150 560 360')}</div>
        <div class="tp-gift"><div><span>A gift for</span><i></i></div><div><span>With love from</span><i></i></div></div>
        <div class="cv-logo"><img src="${LOGO}" alt="Play Before Pixels"></div>
      </div>`, { nofoot: true });
    page(copyrightBody(true), { nofoot: true, cls: 'copyp' });
  }

  // Start here
  const startWorkbook = `
    <div class="cols2">
      <div>
        <h3>How the program works</h3>
        <ol class="steps">
          <li><b>One email a morning, for 30 days.</b> Each has a short lesson (about 3 minutes to read), one easy play and plain words for a tricky moment.</li>
          <li><b>This workbook holds the same 30 days</b>, plus trackers, planning pages, a scripts bank and a certificate. Use it on paper or type into it.</li>
          <li><b>Go at your own pace.</b> Miss a day? Nothing breaks. Pick up where you are. It’s fine to take longer than 30 days.</li>
        </ol>
        <h3>Your 2-minute setup</h3>
        <ul class="ticks">
          <li>Print pages 6–10 (or just the tracker) and put them on the fridge.</li>
          <li>Fill a play basket with 5–8 things you already have (page 8).</li>
          <li>Pick a phone parking spot for your own phone.</li>
        </ul>
      </div>
      <div>
        <h3>Printing tips</h3>
        <ul class="ticks">
          <li><b>Letter or A4:</b> open the file that matches your paper and print at “Actual size” or 100%.</li>
          <li><b>Paper:</b> ordinary printer paper is fine. Use card stock for the tracker and certificate if you have it.</li>
          <li><b>Save ink:</b> print the Low-ink edition (white pages, line drawings your child can color).</li>
          <li><b>Print shop:</b> any copy shop can print it. Laminate the tracker and use a dry-erase marker to reuse it.</li>
        </ul>
        <h3>What you can type into</h3>
        <p class="small">Open the Color or Low-ink PDF in free Adobe Acrobat Reader and click any light line to type: the planning pages, the blank tracker, the daily notes, the check-ins, your family plan, the certificate and the blank play pages. The lessons, plays and pre-filled tracker are fixed text. Save a copy to keep your notes.</p>
      </div>
    </div>`;
  const startBook = `
    <div class="cols2">
      <div>
        <h3>How this book works</h3>
        <ol class="steps">
          <li><b>One short lesson a day, for 30 days.</b> Each takes about three minutes to read.</li>
          <li><b>One easy play a day</b>, with a version for little ones, a version for big kids and a two-minute version for tired days.</li>
          <li><b>Plain words for a tricky moment</b> every day, and a bank of extra scripts at the back.</li>
          <li><b>Write in it.</b> The planning pages, tracker, daily notes and check-ins are yours to fill in.</li>
        </ol>
      </div>
      <div>
        <h3>Your 2-minute setup</h3>
        <ul class="ticks">
          <li>Read Day 1 tonight. It asks you only to notice.</li>
          <li>Fill a play basket with 5–8 things you already have.</li>
          <li>Pick a phone parking spot for your own phone.</li>
          <li>Go at your own pace. Miss a day? Nothing breaks.</li>
        </ul>
        <h3>Free color pages</h3>
        <p class="small">This book is printed in black and white. Scan the code on the last page for free color tracker pages you can print at home.</p>
      </div>
    </div>`;
  page(`${H('Start here', 'Welcome to your 30 days', C.tomato, C.ink)}
    <p class="lead">This is a written, go-at-your-own-pace program. No videos, no calls, no perfect days required. We’re not banning anything. We’re <b>adding</b>: more play, more talk, more time face to face, and a steady spot in the day for screens.</p>
    ${V.book ? startBook : startWorkbook}
    <div class="howday">
      <div class="hd">${artDisc('book', C.tSky, .95)}<b>Read</b><span>one short lesson, about 3 minutes</span></div>
      <div class="arrow">→</div>
      <div class="hd">${artDisc('ball', C.tGrass, .95)}<b>Play</b><span>one easy play with things you have</span></div>
      <div class="arrow">→</div>
      <div class="hd">${artDisc('hand', C.tTomato, .95)}<b>Say</b><span>plain words for one tricky moment</span></div>
    </div>
    <div class="promise">
      <div><b>What this is</b>Parent education about everyday play and talk, for families with children aged about 1 to 12.</div>
      <div><b>What this isn’t</b>Treatment, diagnosis or advice about any one child. If you have questions about your child’s development, talk with your pediatrician.</div>
    </div>`, { run: 'Start here' });

  // Note + map
  // Optional welcome in the founder's own words (template: ../founder-notes.md). Nothing prints until it is written.
  const note = K.FOUNDER.welcomeNote ? `<p class="fnote">${esc(K.FOUNDER.welcomeNote)}</p>` : '';
  page(`${H(note ? 'A note before you start' : 'Before you start', 'Your month at a glance')}
    ${note}
    <div class="map">${K.WEEKS.map(w => { const c = WC[w.color]; return `<div class="mapw" style="border-color:${c.c}">
      <div class="mapk" style="background:${c.c};color:${c.fg}">${w.n < 5 ? 'Week ' + w.n : 'Days 29–30'}</div>
      <div class="mapt">${esc(w.title)}</div>
      <ol start="${w.from}">${K.DAYS.filter(d => d.d >= w.from && d.d <= w.to).map(d => `<li><span class="dn">${d.d}</span>${esc(d.title)}</li>`).join('')}</ol></div>`; }).join('')}</div>`, { run: 'Contents' });

  // Grown-up guide (CUSTOMER-VOICE rule 14)
  page(`${H('Grown-up guide', 'The why, in plain words')}
    <div class="cols2">
      <div>
        <h3>Why play and talk?</h3>
        <p>Children learn to communicate by doing it: babbling, pointing, asking and answering, with a person who answers back. Those everyday exchanges happen during play, meals, baths and car rides. This program makes a little more room for them.</p>
        <p>Screens aren’t the enemy here. They get a steady spot in the day, the same time and the same ending, so nobody has to negotiate. The rest of the day fills up with easy, ordinary play.</p>
        <h3>Three talk lines to start with</h3>
        <ul class="talklines">
          <li>“You’re stacking the red one!” <span>(say what you see)</span></li>
          <li>“Ready, set… (wait) go!” <span>(pause and wait)</span></li>
          <li>“Ball!” “Big ball!” <span>(repeat and add one)</span></li>
        </ul>
        <p class="small">Talk, sing and read in the language you know best. A sign, a point, a look or a tap on a device counts as communicating.</p>
      </div>
      <div>
        <h3>Six easy talk moves</h3>
        <div class="moves">${Object.values(K.MOVES).map((m, i) => `<div class="move"><span class="mn">${i + 1}</span><div><b>${esc(m.name)}</b>${esc(m.tip)}</div></div>`).join('')}</div>
        <div class="love"><b>Good to know:</b> most children love 2–3 of these plays far more than the rest and ask for them again and again. That’s the program working. Repeat the favorites.</div>
      </div>
    </div>
    <div class="turns"><h3>What counts as a turn?</h3><div class="trow">${[['eye', 'A look'], ['hand', 'A point or a sign'], ['note', 'A sound or a song'], ['heart', 'A smile'], ['book', 'A word'], ['phone', 'A tap on a talking device']].map(([a, t]) => `<div class="tt">${artDisc(a, C.tSky, .8)}<span>${t}</span></div>`).join('')}</div><p class="small">Every one of these is communicating. Answer it as if it were the best thing anyone has said all day.</p></div>`, { run: 'Grown-up guide' });

  // Safety + icon key
  const PEDI = '<p class="pedi">Every child talks, plays and grows on their own timeline. If you have questions about your child’s development, talk with your pediatrician.</p>';
  page(`${H('Before you play', 'Safety, ages and how to read a play')}
    <div class="cols2">
      <div>
        <h3>${ico('shield')} Every play follows our published safety rules</h3>
        <ul class="safelist">${K.SAFETY.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
        <p class="small">You know your child best. Skip or change any play that doesn’t suit your child, your home or your day.</p>
        <h3>Ages</h3>
        <p>Every play shows a starting age (“From 18 months”), a way to make it easier and a way to make it harder for big kids. Every week has boxes for toddlers and preschoolers, school-age kids, and siblings and twins.</p>
        ${V.book ? '' : PEDI}
      </div>
      <div>
        <h3>How to read a play</h3>
        <div class="keyrow">${ico('sprout', 'k')}<div><b>Starting age</b>The youngest age the play usually suits.</div></div>
        <div class="keyrow">${ico('clock', 'k')}<div><b>Prep</b>No prep · 2-min prep · 10-min prep. No play takes longer to set up than it plays.</div></div>
        <div class="keyrow"><span class="k">${drops(1)}</span><div><b>Mess</b>No mess · A little mess · Messy.</div></div>
        <div class="keyrow">${ico('hour', 'k')}<div><b>Play time</b>Quick · Short · Longer. A rough guide only: many children play longer or shorter.</div></div>
        <div class="keyrow">${ico('bag', 'k')}<div><b>You need</b>Things most homes already have. Nothing to buy.</div></div>
        <div class="keyrow">${ico('talk', 'k')}<div><b>Talk while you play</b>One talk line to try, and the talk move it uses.</div></div>
        <div class="keyrow">${ico('bolt', 'k')}<div><b>Tired-grown-up version</b>Two minutes, no setup, for days when you’re running on empty.</div></div>
        ${V.book ? PEDI : ''}
      </div>
    </div>
    <div class="tube"><svg viewBox="0 0 24 24" width="64" height="64" class="tubei"><use href="#u-tube"/></svg><div><h3>The tube test for under-3s</h3><p>Try to push the object through an empty toilet-paper tube. If it fits, it’s too small for a child under 3. Keep it out of the play basket and out of reach.</p></div></div>`, { run: 'Safety and ages' });

  // Planning pages
  const slots = [['Wake-up and breakfast', 'sun'], ['Morning', 'leaf'], ['Midday and lunch', 'bowl'], ['Afternoon', 'ball'], ['Before dinner', 'pot'], ['Evening and bedtime', 'moon']];
  page(`${H('Day 1 · planning page', 'Our ordinary day', C.sky, C.ink)}
    <p class="lead s">Walk through one ordinary day. Where do screens show up, and why? Where does play already happen? You’re drawing a map, not grading yourself.</p>
    <div class="dayrows" style="--ch:${V.book ? .72 : .86}in">
      <div class="drh"><span></span><span>What usually happens</span><span>Screens? Why?</span><span>Play or talk already?</span></div>
      ${slots.map(([t, a], i) => `<div class="dr">${artDisc(a, C.tSky, .62)}<b>${t}</b>${F('od-' + i + '-what', 'cell', 2)}${F('od-' + i + '-screen', 'cell', 2)}${F('od-' + i + '-play', 'cell', 2)}</div>`).join('')}
    </div>
    <div class="circleit"><b>Circle the two moments when a screen helps you most.</b> Those are the moments this program will help with first. <span class="fl2">Our two moments:</span>${F('od-two')}</div>`, { run: 'Planning' });

  const ex = { when: 'After nap, about 3:30', where: 'On the couch in the living room', what: 'Two episodes of a gentle show we choose together', end: '“Two more minutes” warning, the episode ends, “Night-night, tablet”', land: 'Snack, then outside to find the moon' };
  const spotRows = [['When', 'when'], ['Where', 'where'], ['What', 'what'], ['How it ends', 'end'], ['What comes next (the landing)', 'land']];
  page(`${H('Day 3 · planning page', 'Our screen spot', C.sky, C.ink)}
    <p class="lead s">A steady spot: the same time, the same place, the same ending, every day. It doesn’t grow when chores are done and doesn’t shrink after a hard morning. It simply stays put.</p>
    <div class="spot" style="--ch:${V.book ? .5 : .56}in">
      <div class="spotcol ex"><div class="spoth">Example</div>${spotRows.map(([l, k]) => `<div class="sr"><b>${l}</b><span>${esc(ex[k])}</span></div>`).join('')}</div>
      <div class="spotcol"><div class="spoth">Ours</div>${spotRows.map(([l, k]) => `<div class="sr"><b>${l}</b>${F('spot-' + k, 'cell', 2)}</div>`).join('')}</div>
    </div>
    <div class="never">${ico('shield')}<span><b>Our promise:</b> screens are never a prize and never a punishment. No earning minutes, no losing minutes. The spot is just part of the day, like lunch.</span></div>
    <div class="ending"><div class="en"><span class="enn">1</span><b>A warning</b>“Two more minutes, then the tablet goes to sleep.”</div><div class="en"><span class="enn">2</span><b>A clear ending</b>The episode ends or the timer rings. “Night-night, tablet.”</div><div class="en"><span class="enn">3</span><b>A landing</b>“Now we go outside and find the moon.”</div></div>
    <div class="spotsay"><b>Tell your child:</b> “Here’s our new plan. Shows are after nap, on the couch. Two shows, then outside. Every day.”</div>`, { run: 'Planning' });

  const basket = [['Something to build with', 'blocks, cups, boxes, tubes', 'blocks'], ['Something to pretend with', 'a teddy, pots, a hat, a toy phone', 'hat'], ['Something to make with', 'paper, crayons, tape', 'crayon'], ['Something to move with', 'a soft ball, a cushion to climb over', 'ball'], ['Something to look at together', '2–3 books or family photos', 'book'], ['Something that makes a sound', 'a pot and spoon, a shaker bottle glued shut', 'note']];
  page(`${H('Day 4 · planning page', 'Our play basket', C.sky, C.ink)}
    <p class="lead s">Five to eight things you already have, within your child’s reach, near where you usually are. Keep the rest out of sight and swap a few things each week.</p>
    <div class="basket">${basket.map(([t, e, a], i) => `<div class="bk">${artDisc(a, C.tSky, .78)}<div><b>${t}</b><span class="eg">e.g. ${e}</span>${F('bk-' + i, 'multi', 2)}</div></div>`).join('')}</div>
    <div class="swap"><b>Swap list</b> (things to rotate in next week)${F('bk-swap', 'multi', 4)}</div>
    <p class="small safeline">${ico('shield')} For children under 3, everything in the basket must be too big to fit through a toilet-paper tube. No cords, strings or balloons.</p>`, { run: 'Planning' });

  // Trackers (pre-filled and blank)
  function tracker(pre) {
    const cells = K.DAYS.map(d => { const w = wc(d.d); return `<div class="tc" style="border-top-color:${w.c}">
      <div class="tcn" style="color:${w.deep}">${d.d}</div>
      <div class="tcp">${pre ? esc(d.play.t) : F('tr-' + d.d, 'tcf')}</div>
      <div class="tck"><span>${ico('check')} played</span><span>${ico('check')} spot kept</span><span>${ico('star')} again!</span></div></div>`; }).join('');
    return `${H('Tracker' + (pre ? ' · pre-filled' : ' · blank'), pre ? '30 days of play' : 'Our own 30 days', C.tomato)}
      <p class="lead s">${pre ? 'Each square is that day’s play. Tick what happened. Color the star when your child asks for a play again: those are your family’s favorites.' : 'Write in your own plays, or your child’s favorites. Tick what happened and color the star when a play gets asked for again.'}</p>
      <div class="tracker">${cells}</div>
      <p class="small nog">No scores, no streaks to break. A blank square just means life happened.</p>`;
  }
  page(tracker(true), { run: 'Tracker' });
  page(tracker(false), { run: 'Tracker' });

  // ================================================================= THE 30 DAYS
  const cap = t => { const x = t.replace(/^[^:]+:\s*/, ''); return x.charAt(0).toUpperCase() + x.slice(1); };
  function weekPage(w) {
    const c = WC[w.color];
    const days = K.DAYS.filter(d => d.d >= w.from && d.d <= w.to);
    page(`<div class="wk">
      <div class="wkhead" style="background:${V.low ? W : c.t}">
        <div class="wkt"><div class="wkk" style="color:${c.deep}">${w.n < 5 ? 'Week ' + w.n : 'Days 29–30'} · Days ${w.from}–${w.to}</div><h1>${esc(w.title)}</h1><p>${esc(w.big)}</p><p class="wkkeep"><b>On one line:</b> ${esc(w.keep)}</p></div>
        <div class="wksc">${sceneSvg(WEEK_SCENES[w.n - 1], '', '90 150 420 380')}</div>
      </div>
      <div class="wkdays">${days.map(d => `<div class="wkd"><span class="wkn" style="background:${c.c};color:${c.fg}">${d.d}</span><div><b>${esc(d.title)}</b><span>${esc(d.play.t)}</span></div></div>`).join('')}</div>
      <div class="bands">
        <div class="band"><h4>${ico('sprout')} Toddlers and preschoolers</h4><p>${esc(cap(w.little))}</p></div>
        <div class="band"><h4>${ico('bolt')} School-age kids</h4><p>${esc(cap(w.bigk))}</p></div>
        <div class="band"><h4>${ico('people')} Siblings and twins</h4><p>${esc(cap(w.siblings))}</p></div>
      </div>
      ${w.n === 5 ? `<div class="wk5"><h4>${ico('check')} Your one-page plan will have five parts</h4><ol><li>Your screen spot: when, where, what and how it ends</li><li>Your two or three favorite plays, plus one new one</li><li>Your words for tricky moments</li><li>Your phone parking spot and one phone-free window</li><li>Your tough-day plan</li></ol><p class="small">Then print the certificate, let your child decorate it and put it on the fridge.</p></div>` : ''}
      <div class="wkscripts"><h4>${ico('quote')} Plain words you’ll use this week</h4>
        ${days.map(d => `<div class="wks"><b>${esc(d.script.moment)}</b><span>${esc(d.script.lines[0])}</span></div>`).join('')}</div>
    </div>`, { run: w.n < 5 ? 'Week ' + w.n : 'Days 29–30' });
  }
  function lessonPage(d) {
    const w = wc(d.d), wk = weekOf(d.d);
    page(`<div class="lesson">
      <div class="lhead">
        <div class="dbig" style="color:${w.c}">${pad2(d.d)}</div>
        <div class="ltitle"><div class="kick" style="color:${w.deep}">Day ${d.d} · ${wk.n < 5 ? 'Week ' + wk.n : 'Your plan'} · ${esc(wk.title)}</div><h1>${esc(d.title)}</h1></div>
        ${artDisc(d.art, w.t, 1.05)}
      </div>
      <p class="idea" style="border-color:${w.c}">${esc(d.idea)}</p>
      <div class="ltext">${d.lesson.map(p => `<p>${esc(p)}</p>`).join('')}</div>
      ${scriptBox(d)}
      <div class="step" style="background:${V.low ? W : w.t}">${ico('check', 'big')}<div><div class="tlab">Today’s one small step</div>${esc(d.step)}</div></div>
    </div>`, { run: 'Day ' + d.d });
  }
  function playPage(d) {
    const w = wc(d.d), m = K.MOVES[d.play.move];
    page(`${playCard(d)}
      <div class="movetip" style="border-color:${w.c}"><b style="color:${w.deep}">Today’s talk move: ${esc(m.name)}.</b> ${esc(m.tip)}</div>
      <div class="notes">
        <div class="nh"><b>Today’s notes</b><span>${ico('check')} We played</span><span>${ico('check')} Screen spot kept</span><span>${ico('star')} Asked for it again</span></div>
        <div class="nl"><span>What happened? What did your child say, show or do?</span>${F('d' + d.d + '-notes', 'multi', V.book ? 3 : 4)}</div>
      </div>`, { run: 'Day ' + d.d });
  }
  function checkin(n) {
    const w = K.WEEKS[n - 1], c = WC[w.color];
    const qs = ['What helped most this week?', 'What would we change?', 'What did our child ask for again?', 'One thing we’ll keep doing'];
    page(`${H('Week ' + n + ' check-in', 'Look back kindly', c.deep, c.deep)}
      <p class="lead s">Look for what helped, not what you missed. Adjusting the plan is the program working.</p>
      <div class="ci">${qs.map((q, i) => `<div class="ciq" style="border-color:${c.c}"><b>${q}</b>${F('ci' + n + '-' + i, 'multi', 6)}</div>`).join('')}</div>
      <div class="ciself">${artDisc('heart', c.t, .7)}<p><b>Words for yourself:</b> “I don’t need a perfect week. I need a next step.”</p></div>`, { run: 'Week ' + n + ' check-in' });
  }
  function toughPage() {
    const rows = [['What a cozy day looks like at our house', 'td-cozy'], ['Our quiet plays for sick or tired days', 'td-plays'], ['What we’ll say about the change', 'td-say'], ['How we go back tomorrow', 'td-back']];
    page(`${H('Day 28 · planning page', 'Our tough-day plan', C.tomato)}
      <p class="lead s">A planned change for a hard day is fine. Say it out loud, and go back to your usual rhythm the next day. No making up for it.</p>
      <div class="ci">${rows.map(([q, k]) => `<div class="ciq" style="border-color:${C.tomato}"><b>${q}</b>${F(k, 'multi', 5)}</div>`).join('')}</div>
      <div class="spotsay"><b>Example:</b> “You’re sick today, so it’s a cozy movie day on the couch together. Tomorrow we go back to our usual plan.”</div>`, { run: 'Planning' });
  }
  function planPage() {
    const rows = [['Our screen spot (when, where, what, how it ends)', 'fp-spot', 3], ['Our favorite plays (and one new one to try)', 'fp-plays', 4], ['Our words for tricky moments', 'fp-words', 4], ['Our phone parking spot and phone-free window', 'fp-phone', 2], ['Our tough-day plan', 'fp-tough', 3]];
    page(`${H('Day 30', 'Our family’s plan', C.plum)}
      <p class="lead s">Short enough for the fridge. Look at it again in a month and change what you need to.</p>
      <div class="fplan">${rows.map(([q, k, l]) => `<div class="fpr"><b>${q}</b>${F(k, 'multi', l)}</div>`).join('')}</div>
      <div class="sign"><span>Signed by everyone in our family</span>${F('fp-sign')}<span class="date">Date</span>${F('fp-date', 'short')}</div>`, { run: 'Your plan' });
  }
  function certPage() {
    page(`<div class="cert">
      <div class="cstars">${[0, 1, 2, 3, 4].map(i => `<svg viewBox="-50 -50 100 100" width="${i === 2 ? 70 : 44}"><use href="#a-star"/></svg>`).join('')}</div>
      <div class="cawd">This certificate is awarded to</div>
      <div class="cname">${F('cert-name', 'cn')}</div>
      <div class="cawd">for finishing</div>
      <div class="ct">30 Days of<br>Back-and-Forth</div>
      <p class="cp">30 days of more play, more talk and a steady spot for screens.</p>
      <div class="cfav"><b>Our favorite play:</b>${F('cert-fav')}</div>
      <div class="cdate"><b>Date:</b>${F('cert-date', 'short')}</div>
      <div class="cscene">${sceneSvg(WEEK_SCENES[4], '', '70 120 470 380')}</div>
      <div class="clogo">${V.url ? `<img src="${LOGO}" alt="Play Before Pixels"><span>${SITE}</span>` : '<span class="wm">Play Before Pixels</span>'}</div>
      <p class="cshare">Put it on the fridge. If you share a photo, we’d love to see it: #PlayBeforePixels. Please leave out your child’s name and face.</p>
    </div>`, { run: 'Celebrate', cls: 'certpage' });
  }

  for (const w of K.WEEKS) {
    weekPage(w);
    for (const d of K.DAYS.filter(x => x.d >= w.from && x.d <= w.to)) {
      lessonPage(d); playPage(d);
      if (d.d === 28) toughPage();
      if (d.d === 30) {
        planPage();
        // Paperback: the certificate is a page children decorate, so it gets a recto of its own with a blank back (CUSTOMER-VOICE rule 20).
        if (V.book && (pageNo + 1) % 2 === 0) page('<div class="blankp">This page is left blank on purpose.</div>', { nofoot: true });
        certPage();
        if (V.book) page('<div class="blankp">The back of the certificate is left blank so your child can decorate the front.</div>', { nofoot: true });
      }
    }
    if (w.n <= 4) checkin(w.n);
  }

  // ================================================================= BACK MATTER
  const allScripts = K.DAYS.map(d => ({ moment: d.script.moment, lines: d.script.lines, day: d.d })).concat(K.SCRIPT_BANK);
  const per = Math.ceil(allScripts.length / 3);
  [0, 1, 2].map(i => allScripts.slice(i * per, (i + 1) * per)).forEach((list, i) => {
    page(`${H('Scripts bank' + (i ? ' (continued)' : ''), i ? 'More plain words' : 'Plain words for tricky moments', C.grass)}
      ${i ? '' : `<p class="lead s">Every script from the 30 days, plus extras, in one place. ${V.book ? 'Copy the ones you need onto a card or sticky note' : 'Cut out the ones you need'} and keep them where the tricky moment happens.</p>`}
      <div class="sbank">${list.map(s => `<div class="sb"><b>${esc(s.moment)}${s.day ? ` <span>Day ${s.day}</span>` : ''}</b>${s.lines.map(l => `<p>${esc(l)}</p>`).join('')}</div>`).join('')}</div>`, { run: 'Scripts bank' });
  });

  // Blank play page
  const own = i => `<article class="play own">
    <div class="phead">
      <div class="disc" style="width:.85in;height:.85in"><svg viewBox="-60 -60 120 120" width="100%" height="100%"><circle r="57" fill="none" stroke="${C.grass}" stroke-width="2.4" stroke-dasharray="6 6"/><text y="6" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="22" fill="${C.ink}">draw it!</text></svg></div>
      <div class="ptitle"><div class="kicker">Our own play</div>${F('own' + i + '-title', 'big')}
        <div class="meta"><span>${ico('sprout')} From ${F('own' + i + '-age', 'inl')}</span><span>${ico('clock')} Prep ${F('own' + i + '-prep', 'inl')}</span><span>${drops(1)} Mess ${F('own' + i + '-mess', 'inl')}</span></div>
        <div class="need">${ico('bag')}<b>You need:</b>${F('own' + i + '-need')}</div></div>
    </div>
    <div class="ownl"><b>How to play</b>${F('own' + i + '-how', 'multi', 2)}</div>
    <div class="ownl"><b>Talk while you play</b>${F('own' + i + '-talk')}</div>
    <div class="ownl two"><div><b>Easier</b>${F('own' + i + '-easy')}</div><div><b>Harder</b>${F('own' + i + '-hard')}</div></div>
    <div class="ownl"><b>${ico('shield')} Safety</b>${F('own' + i + '-safe')}</div>
  </article>`;
  page(`${H('Blank pages', 'Our own plays', C.grass)}${own(1)}${own(2)}`, { run: 'Blank pages' });

  if (!V.book) {
    page(`${H('Questions', 'Questions parents ask')}
      <div class="faq">${K.FAQ.map(([q, a]) => `<div class="fq"><b>${esc(q)}</b><p>${esc(a)}</p></div>`).join('')}</div>
      <p class="small">More answers live in the help center${V.url ? ' at ' + SITE + '/help' : ''}. We don’t offer personal replies or advice about individual children.</p>`, { run: 'Questions' });
  }

  page(`${H('Sources', 'Where the research lines come from')}
    <p class="lead s">This program uses research sparingly and in plain words. Studies that find a link between two things do not show that one causes the other.</p>
    <ul class="sources">
      <li><b>World Health Organization (2019).</b> Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age. (Days 2 and 12)</li>
      <li><b>American Academy of Pediatrics, Council on Communications and Media (2016).</b> Media and Young Minds. <i>Pediatrics</i>, 138(5). (Day 3)</li>
      <li><b>Brushe ME, et al. (2024).</b> Screen time and parent–child talk when children are aged 12 to 36 months. <i>JAMA Pediatrics</i>, 178(4), 369–375. (Day 2)</li>
      <li><b>Delgado P, et al. (2018).</b> Don’t throw away your printed books: a meta-analysis on the effects of reading media on reading comprehension. <i>Educational Research Review</i>, 25, 23–38. (Day 21)</li>
    </ul>
    <div class="promise">
      <div><b>Plain-words talk moves</b>The six talk moves in this program are described in everyday words. They are not taken from, or endorsed by, any named program.</div>
      <div><b>Not medical advice</b>This program is parent education. It does not diagnose, treat or prevent any condition. For questions about your child’s health or development, talk with your pediatrician.</div>
    </div>`, { run: 'Sources' });

  // More from Play Before Pixels + bonus
  const next = [['100 Screen-Free Plays', 'Paperback and printable guide for ages 0–5, sorted by age.', 'book'], ['150 “I’m Bored” Play Cards', 'Age-banded play cards with a talk prompt on each.', 'box'], ['Play-First Family Kit', 'Screen rhythm chart, family play plan, helping jobs and more.', 'list'], ['The Day the Tablet Slept', 'A funny bedtime read-aloud for ages 3–7.', 'moon']];
  page(`${H('What’s next', 'More from Play Before Pixels', C.tomato)}
    <div class="nextg">${next.map(([t, s, a]) => `<div class="nx">${artDisc(a, C.tSun, .9)}<div><b>${t}</b><span>${s}</span></div></div>`).join('')}</div>
    ${V.url ? `<div class="bonus">
      <div class="qr">${qrSvg(132)}</div>
      <div><div class="tlab">Free bonus</div><h3>${V.book ? 'Free color tracker pages and a monthly play email' : 'Keep going: a free monthly play email'}</h3>
      <p>${V.book ? 'Scan the code or visit' : 'Visit'} <b>${BONUS}</b> for ${V.book ? 'free printable color trackers and certificate, plus' : ''} three new plays for your child’s age each month. We ask only for your email and your child’s birth month and year, never a name.</p>
      <p class="small">Share with a friend: when a friend buys with your link, you each get $5 off. Your link is in every email.</p></div>
    </div>` : `<div class="bonus nourl"><p>Find more from Play Before Pixels in our shop.</p></div>`}
    ${V.book ? '' : copyrightMini()}`, { run: 'What’s next' });

  if (V.book) {
    page(`<div class="endp"><div class="cv-logo"><img src="${LOGO}" alt="Play Before Pixels"></div><p>Talk, touch and play come first.</p></div>`, { nofoot: true });
  }
  if (V.book && pageNo % 2 === 1) page('<div></div>', { nofoot: true });

  function copyrightMini() {
    return `<div class="copymini"><b>${COPY}</b> ${K.VERSION}. For use by the purchasing household. Please share the link, not the file. Every play follows our published safety rules; a grown-up is always there. This program is parent education and is not medical advice.</div>`;
  }
  function copyrightBody(book) {
    return `<div class="copy">
      <p><b>${esc(K.TITLE)}</b><br>${esc(K.SUB)}</p>
      <p>${COPY}<br>All rights reserved. No part of this book may be reproduced without written permission, except short quotations in reviews.</p>
      <p>${K.VERSION}. Printed on demand.</p>
      <p>Published by AlphaPlay LLC, doing business as Play Before Pixels.<br>${SITE}</p>
      <p>This book is parent education about everyday play and talk. It is not medical advice and does not diagnose, treat or prevent any condition. For questions about your child’s health or development, talk with your pediatrician. Every play follows our published safety rules and is meant to be played with a grown-up close by.</p>
      <p>No product, app, device, school or program named or pictured in this book is real; the tablet is a generic, unbranded character.</p>
      ${ISBN_PAPERBACK ? `<p>ISBN ${esc(ISBN_PAPERBACK)}</p>` : ''}
      <p class="small">Free bonus: ${BONUS}</p>
    </div>`;
  }

  // ================================================================= CSS + assemble
  const w = V.w, h = V.h;
  const css = `
@page { size: ${w}in ${h}in; margin: 0 }
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#fff}
body{font-family:"Nunito Sans","Helvetica Neue",Arial,sans-serif;color:${C.ink};font-size:10.5pt;line-height:1.45;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:${w}in;height:${h}in;position:relative;overflow:hidden;page-break-after:always;break-after:page;background:#fff}
.inner{position:absolute;inset:0;display:flex;flex-direction:column}
h1,h2,h3,h4,.kick,.cv-num,.cv-t,.dbig,.tlab,.kicker{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif}
h1{font-weight:800;font-size:27pt;line-height:1.05;letter-spacing:-.01em}
h2{font-weight:800;font-size:19pt;line-height:1.08}
h3{font-weight:800;font-size:12.5pt;margin:.14in 0 .06in;display:flex;align-items:center;gap:.06in}
h4{font-weight:800;font-size:10.5pt;display:flex;gap:.05in;align-items:center;margin-bottom:.03in}
p{margin:0 0 .08in}
b{font-weight:800}
.small{font-size:9pt;color:#4A5570}
.ico{display:inline-block;vertical-align:-.13em;fill:currentColor;flex:none}
.ico.big{width:22px;height:22px}
.kick{font-weight:800;font-size:9.5pt;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.05in}
.ph{margin-bottom:.14in}
.lead{font-size:12.5pt;line-height:1.45;margin-bottom:.14in}
.lead.s{font-size:11pt}
.cols2{display:grid;grid-template-columns:1fr 1fr;gap:.32in}
.foot{position:absolute;display:flex;justify-content:space-between;align-items:center;font-size:7.5pt;color:#5A6478;border-top:1px solid #DCE3EE;padding-top:.06in}
.foot .fl{display:flex;align-items:center;gap:.06in}
.foot b{font-weight:800;color:${C.ink}}
.fmark{height:.17in}
.pn{margin-left:.1in;font-size:9pt;font-family:"Bricolage Grotesque",sans-serif}
.sk{fill:var(--sk)}.hr{fill:var(--hr)}.sh{fill:var(--sh)}.pa{fill:var(--pa)}.so{fill:var(--so)}.hw{fill:var(--hw)}.ck{fill:#EE5A36;opacity:.28}
.disc{position:relative;flex:none}
.disc svg{display:block}
/* fields */
.field{display:block;border-bottom:1.3px solid #9AA6BC;min-height:.3in;margin-top:.04in}
.field.multi{min-height:auto;height:calc(var(--l,3) * .3in);background:repeating-linear-gradient(to bottom,transparent 0,transparent calc(.3in - 1.3px),#9AA6BC calc(.3in - 1.3px),#9AA6BC .3in);border-bottom:0}
.field.multi[data-lines="2"]{--l:2}.field.multi[data-lines="3"]{--l:3}.field.multi[data-lines="4"]{--l:4}.field.multi[data-lines="5"]{--l:5}.field.multi[data-lines="6"]{--l:6}
.field.cell{min-height:auto;height:var(--ch,.5in);border:1.3px solid #C9D2E1;border-radius:6px;background:#fff;margin:0}
.field.inl{display:inline-block;width:.8in;min-height:.2in;margin:0 0 0 .04in;vertical-align:-.05in}
.field.short{display:inline-block;width:1.5in}
.field.big{min-height:.36in}
/* cover */
.cvpage .inner{padding:.7in!important}
.cover,.titlep{flex:1;display:flex;flex-direction:column;align-items:center;text-align:center}
.cv-top{display:flex;align-items:center;gap:.18in;margin-top:.1in}
.cv-num{font-weight:800;font-size:150pt;line-height:.8;color:${C.tomato};letter-spacing:-.04em}
.cv-t{font-weight:800;font-size:46pt;line-height:.92;text-align:left;color:${C.ink}}
.cv-bf{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:50pt;line-height:1;letter-spacing:-.01em;color:${C.ink};white-space:nowrap;margin-top:.1in}
.blankp{margin:auto;font-size:8pt;color:#8A93A6;text-align:center}
.cv-sub{font-family:"Bricolage Grotesque",sans-serif;font-weight:700;font-size:19pt;margin-top:.22in}
.cv-scene{width:6.2in;height:4in;margin-top:.25in}
.cv-scene svg{width:100%;height:100%}
.cv-tag{font-weight:800;font-size:12.5pt;margin-top:.02in}
.cv-ed{font-size:9.5pt;color:#4A5570;margin-top:.04in}
.cv-logo{margin-top:auto}
.cv-logo img{height:.62in}
.wm{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:18pt}
.tp-tag{font-size:11.5pt;max-width:5in;margin-top:.1in}
.tp-scene{width:4.6in;height:2.96in;margin-top:.15in}
.tp-gift{width:4.2in;margin:.06in 0 .2in;text-align:left;font-size:10.5pt}.tp-gift div{display:flex;align-items:flex-end;gap:.1in;margin-top:.14in}.tp-gift span{font-weight:700;white-space:nowrap}.tp-gift i{flex:1;border-bottom:1px solid #6E6E6E;height:.22in}
.endp{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.2in;font-family:"Caveat",cursive;font-size:22pt;font-weight:700}
.endp .cv-logo{margin:0}
/* copyright */
.copyp .inner{justify-content:flex-end}
.copy{font-size:9pt;line-height:1.5;margin-top:auto}
.copy p{margin-bottom:.1in}
.copymini{font-size:8pt;color:#4A5570;margin-top:auto;padding-top:.1in;border-top:1px solid #DCE3EE}
.copymini b{color:${C.ink}}
/* start */
.steps{padding-left:.22in}
.steps li{margin-bottom:.07in}
.ticks{list-style:none}
.ticks li{position:relative;padding-left:.22in;margin-bottom:.06in}
.ticks li:before{content:"";position:absolute;left:0;top:.05in;width:.1in;height:.1in;border-radius:50%;background:${C.tomato}}
.howday{display:flex;align-items:center;justify-content:center;gap:.2in;margin:.2in 0}
.hd{display:flex;flex-direction:column;align-items:center;text-align:center;width:1.7in;font-size:9.5pt}
.hd b{font-family:"Bricolage Grotesque",sans-serif;font-size:14pt;margin-top:.05in}
.arrow{font-size:22pt;color:#9AA6BC;font-weight:800}
.promise{display:grid;grid-template-columns:1fr 1fr;gap:.2in;margin-top:auto}
.promise div{background:${C.wash};border-radius:12px;padding:.14in .16in;font-size:9.5pt}
.promise b{display:block;font-size:10.5pt;margin-bottom:.03in}
/* founder slot + map */
.founder-slot{border:2px dashed ${C.tomato};border-radius:12px;padding:.16in;font-size:9.5pt;color:#4A5570;margin-bottom:.16in}
.founder-slot b{display:block;color:${C.tomato};letter-spacing:.06em;margin-bottom:.04in}
.fnote{font-size:11.5pt;font-style:italic;margin-bottom:.16in}
.map{display:grid;grid-template-columns:1fr 1fr;gap:.14in;flex:1;align-content:start}
.mapw{border:2px solid;border-radius:14px;padding:.14in .16in .1in;overflow:hidden}
.mapw:last-child{grid-column:span 2}
.mapk{display:inline-block;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:9pt;border-radius:99px;padding:.02in .12in;margin-bottom:.04in}
.mapt{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:14pt;margin-bottom:.06in}
.mapw ol{list-style:none;font-size:10pt}
.mapw:last-child ol{display:flex;gap:.3in}
.mapw li{display:flex;gap:.07in;margin-bottom:.045in}
.dn{font-weight:800;width:.2in;text-align:right;flex:none}
/* guide */
.talklines{list-style:none}
.talklines li{font-family:"Bricolage Grotesque",sans-serif;font-weight:700;font-size:11pt;background:${C.tSun};border-radius:10px;padding:.07in .12in;margin-bottom:.06in}
.talklines span{font-family:"Nunito Sans",sans-serif;font-weight:600;font-size:8.5pt;color:#4A5570}
.moves{display:flex;flex-direction:column;gap:.07in}
.move{display:flex;gap:.1in;font-size:9.5pt}
.move b{display:block;font-size:10.5pt}
.mn{flex:none;width:.28in;height:.28in;border-radius:50%;background:${C.sky};color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center;font-family:"Bricolage Grotesque",sans-serif}
.love{margin-top:.14in;background:${C.tGrass};border-radius:12px;padding:.12in .14in;font-size:9.8pt}
/* safety */
.safelist{padding-left:.2in;margin-bottom:.08in}
.safelist li{margin-bottom:.05in}
.pedi{background:${C.tSky};border-radius:10px;padding:.1in .12in;font-weight:700;font-size:9.8pt}
.keyrow{display:flex;gap:.12in;align-items:flex-start;margin-bottom:.1in;font-size:9.5pt}
.keyrow b{display:block;font-size:10.5pt}
.keyrow .k,.keyrow>.ico{width:.3in;height:.3in;flex:none;color:${C.ink};display:flex;align-items:center}
/* planning */
.dayrows{display:flex;flex-direction:column;gap:.08in}
.drh,.dr{display:grid;grid-template-columns:.62in 1.15in 1fr 1fr 1fr;gap:.08in;align-items:center}
.drh span{font-weight:800;font-size:8.5pt;text-transform:uppercase;letter-spacing:.05em;color:#4A5570}
.drh span:first-child{grid-column:span 2}
.dr b{font-size:9.5pt;line-height:1.2}
.circleit{margin-top:auto;background:${C.tSun};border-radius:12px;padding:.14in .16in}
.fl2{font-weight:800;display:block;margin-top:.06in}
.spot{display:grid;grid-template-columns:1fr 1fr;gap:.2in;margin-bottom:.16in}
.spotcol{border-radius:14px;padding:.14in;border:2px solid ${C.sky}}
.spotcol.ex{background:${C.tSky};border-color:${C.tSky}}
.spoth{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:13pt;margin-bottom:.06in}
.sr{margin-bottom:.1in;font-size:9.8pt}
.sr b{display:block;font-size:9pt;text-transform:uppercase;letter-spacing:.04em;color:#4A5570}
.sr span{display:block;min-height:.5in;font-family:"Caveat",cursive;font-size:15pt;line-height:1.1;font-weight:700}
.never{display:flex;gap:.1in;align-items:flex-start;background:${C.tGrass};border-radius:12px;padding:.12in .14in;margin-bottom:.12in}
.never .ico{width:22px;height:22px;color:${C.grass}}
.spotsay{background:${C.tSun};border-radius:12px;padding:.12in .14in;margin-top:auto}
.basket{display:grid;grid-template-columns:1fr 1fr;gap:.24in .24in}
.bk{display:flex;gap:.12in;align-items:flex-start}
.bk>div:last-child{flex:1}
.bk b{display:block}
.eg{display:block;font-size:8.8pt;color:#4A5570}
.swap{margin-top:.2in}
.safeline{margin-top:auto}
/* tracker */
.tracker{display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:repeat(6,minmax(0,1fr));gap:.07in;flex:1;min-height:0}
.tc{overflow:hidden}
${V.book ? ".tcn{font-size:12pt!important}.tck{font-size:6.6pt!important}.field.tcf{min-height:.24in!important}.tracker+.nog{margin-top:.04in}" : ""}
.tc{border:1.3px solid #C9D2E1;border-top-width:5px;border-radius:8px;padding:.05in .07in;display:flex;flex-direction:column}
.tcn{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:15pt;line-height:1}
.tcp{font-weight:700;font-size:8.5pt;line-height:1.2;flex:1;margin:.03in 0}
.field.tcf{min-height:.3in}
.tck{display:flex;flex-direction:column;gap:.01in;font-size:7pt;color:#4A5570}
.tck .ico{width:9px;height:9px}
.nog{margin-top:.08in}
/* week opener */
.wk{flex:1;display:flex;flex-direction:column}
.wkhead{display:flex;border-radius:18px;padding:.18in .22in;gap:.12in;align-items:center;margin-bottom:.14in}
.wkt{flex:1}
.wkt h1{font-size:30pt}
.wkt p{font-size:11pt;margin-top:.08in}
.wkkeep{font-size:9.8pt!important;border-top:1.5px solid rgba(29,41,64,.15);padding-top:.06in}
.wkk{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:10pt;letter-spacing:.06em;text-transform:uppercase;margin-bottom:.05in}
.wksc{width:2.9in;height:2.65in;flex:none}
${V.book ? '.wksc{width:2.45in;height:2.22in}.wkhead{margin-bottom:.1in}.wkdays{margin-bottom:.1in}.bands{margin-bottom:.1in}' : ''}
.wkdays{display:grid;grid-template-columns:1fr 1fr;gap:.06in .2in;margin-bottom:.14in}
.wkd{display:flex;gap:.1in;align-items:center}
.wkd b{display:block;font-size:10pt;line-height:1.2}
.wkd span:not(.wkn){font-size:8.8pt;color:#4A5570}
.wkn{flex:none;width:.34in;height:.34in;border-radius:50%;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:11pt}
.bands{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.12in;margin-bottom:.14in}
.band{background:${C.wash};border-radius:12px;padding:.12in;font-size:9.3pt}
.keep{border:2px solid;border-radius:12px;padding:.12in .14in;margin-top:auto;font-size:10.5pt}
/* lesson */
.lesson{flex:1;display:flex;flex-direction:column}
.lhead{display:flex;gap:.16in;align-items:center;margin-bottom:.12in}
.dbig{font-weight:800;font-size:64pt;line-height:.8;letter-spacing:-.03em}
.ltitle{flex:1}
.ltitle h1{font-size:25pt}
.idea{font-size:13pt;font-weight:700;line-height:1.35;border-left:5px solid;padding:.02in 0 .02in .14in;margin-bottom:.16in}
.ltext{font-size:${V.book ? 10.6 : 11.6}pt;line-height:1.52}
.ltext p{margin-bottom:.1in}
.step{margin-top:auto;display:flex;gap:.12in;align-items:flex-start;border-radius:12px;padding:.13in .16in;font-size:11pt}
.step .tlab,.talk .tlab{font-weight:800;font-size:8.5pt;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.02in}
/* play */
.play{display:flex;flex-direction:column}
.phead{display:flex;gap:.2in;align-items:center;margin-bottom:.1in}
.ptitle{flex:1}
.kicker{font-weight:800;font-size:9pt;letter-spacing:.08em;text-transform:uppercase}
.meta{display:flex;flex-wrap:wrap;gap:.04in .16in;font-size:8.8pt;font-weight:700;margin:.05in 0}
.meta span{display:inline-flex;align-items:center;gap:.04in}
.drops .ico{width:9px;height:11px;color:${C.sky}}
.need{display:flex;gap:.06in;font-size:9.5pt;align-items:baseline}
.need .ico{flex:none}
.need .field{flex:1}
.how{font-size:${V.book ? 10.6 : 11.4}pt;line-height:1.5;margin-bottom:.1in}
.talk{display:flex;gap:.12in;align-items:center;border-radius:12px;padding:.1in .16in;margin-bottom:.1in}
.tlab span{font-weight:600;text-transform:none;letter-spacing:0;color:#4A5570;font-family:"Nunito Sans",sans-serif}
.tline{font-family:"Fredoka","Nunito Sans",sans-serif;font-weight:600;font-size:13pt}
.ez{display:grid;grid-template-columns:1fr 1fr;gap:.14in;margin-bottom:.08in;font-size:9.6pt}
.ez div{border:1.3px solid #DCE3EE;border-radius:10px;padding:.08in .12in}
.ez b{display:block;font-size:9.8pt}
.tired,.safe{display:flex;gap:.08in;align-items:flex-start;font-size:9.4pt;margin-bottom:.06in}
.tired .ico{color:${C.sun};width:16px;height:16px}
.safe .ico{color:${C.grass};width:16px;height:16px}
.script{border-left:5px solid;background:${C.wash};border-radius:0 12px 12px 0;padding:.1in .16in;margin:.08in 0 .1in}
.slab{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:10.5pt;display:flex;gap:.06in;align-items:center;margin-bottom:.04in}
.sline{font-family:"Fredoka","Nunito Sans",sans-serif;font-weight:500;font-size:11.5pt;margin-bottom:.03in}
.swhy{font-size:9pt;color:#4A5570;margin:0}
.notes{flex:1;display:flex;flex-direction:column;min-height:1.4in;border:1.3px dashed #9AA6BC;border-radius:12px;padding:.1in .14in}
.nl{flex:1;display:flex;flex-direction:column}
.notes .field.multi{height:auto;flex:1}
.nh{display:flex;gap:.2in;align-items:center;font-size:9pt;margin-bottom:.02in}
.nh b{font-family:"Bricolage Grotesque",sans-serif;font-size:11pt;margin-right:auto}
.nh span{display:inline-flex;gap:.04in;align-items:center}
.nl>span{font-size:8.8pt;color:#4A5570}
/* extras */
.movetip{border-left:5px solid;background:${C.wash};border-radius:0 12px 12px 0;padding:.1in .16in;font-size:9.8pt;margin:.06in 0 .12in}
.wkscripts{background:${C.wash};border-radius:12px;padding:.1in .14in}
.wks{display:grid;grid-template-columns:2.7in 1fr;gap:.12in;font-size:8.8pt;line-height:1.3;padding:.03in 0;border-top:1px solid #DCE3EE}
.wks:first-of-type{border-top:0}
.wks span{font-family:"Fredoka","Nunito Sans",sans-serif}
.ending{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.12in;margin-bottom:.12in}
.en{border:1.3px solid #C9D2E1;border-radius:12px;padding:.1in .12in;font-size:9.5pt}
.en b{display:block;font-family:"Bricolage Grotesque",sans-serif;font-size:11pt}
.enn{display:inline-flex;width:.26in;height:.26in;border-radius:50%;background:${C.sky};color:#fff;font-weight:800;align-items:center;justify-content:center;margin-bottom:.04in}
.turns{margin-top:auto;border-top:1.5px solid #DCE3EE;padding-top:.06in}
.trow{display:flex;justify-content:space-between;margin:.06in 0}
.tt{display:flex;flex-direction:column;align-items:center;text-align:center;width:1.05in;font-weight:700;font-size:9pt;gap:.05in}
.tube{margin-top:auto;display:flex;gap:.2in;align-items:center;background:${C.tSun};border-radius:14px;padding:.16in .2in}
.tubei{flex:none;color:${C.ink}}
.tube h3{margin-top:0}
.tube p{margin:0}
.wk5{border:2px solid ${C.plum};border-radius:12px;padding:.14in .18in;margin-bottom:.14in;font-size:10.5pt}
.wk5 ol{padding-left:.22in;margin:.06in 0}
.wk5 li{margin-bottom:.04in}
/* check-ins */
.ci{display:grid;grid-template-columns:1fr 1fr;gap:.24in .24in;align-content:start;margin-bottom:.2in}
.ciq{border-top:4px solid;padding-top:.08in}
.ciq b{font-family:"Bricolage Grotesque",sans-serif;font-size:11.5pt}
.ciself{display:flex;gap:.14in;align-items:center;margin-top:auto;background:${C.wash};border-radius:12px;padding:.12in}
.ciself p{margin:0;font-size:11pt}
/* plan + cert */
.fplan{display:flex;flex-direction:column;gap:.1in}
.fpr b{font-family:"Bricolage Grotesque",sans-serif;font-size:11pt}
.sign{margin-top:auto;display:grid;grid-template-columns:auto 1fr auto 1.4in;gap:.1in;align-items:end;font-weight:700}
.sign .field{margin:0}
${V.book ? `.certpage .inner{padding-top:${V.bleed + .42}in!important;padding-bottom:${V.bleed + .62}in!important}` : '.certpage .inner{padding:.5in .5in .7in!important}'}
.cert{flex:1;border:6px solid ${C.sun};border-radius:26px;display:flex;flex-direction:column;align-items:center;text-align:center;padding:.3in .4in .2in;outline:2px solid ${C.sun};outline-offset:-14px}
.cstars{display:flex;gap:.12in;align-items:center;margin-bottom:.1in}
.cstars svg{display:block}
.cawd{font-size:12pt;font-weight:700;color:#4A5570}
.cname{width:5in;margin:.04in 0 .12in}
.field.cn{min-height:.5in;border-bottom-width:2px}
.ct{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:36pt;line-height:1;color:${C.tomato};margin:.06in 0 .1in}
.cp{font-size:12pt;max-width:4.8in}
.cfav,.cdate{display:flex;gap:.08in;align-items:flex-end;width:4.6in;text-align:left;margin-top:.06in}
.cfav .field,.cdate .field{flex:1;margin:0}
.cscene{width:3.4in;height:2.75in;margin-top:.1in}
.clogo{display:flex;flex-direction:column;align-items:center;gap:.02in;font-size:9pt;font-weight:700;margin-top:auto}
.clogo img{height:.46in}
.cshare{font-size:8pt;color:#4A5570;margin:.06in 0 0}
/* scripts bank */
.sbank{columns:2;column-gap:.26in}
.sb{break-inside:avoid;border:1.3px dashed #9AA6BC;border-radius:10px;padding:.07in .1in;margin-bottom:.08in}
.sb b{display:flex;justify-content:space-between;gap:.1in;font-size:9.4pt;line-height:1.25;margin-bottom:.02in}
.sb b span{font-weight:700;font-size:7.5pt;color:#4A5570;flex:none}
.sb p{font-family:"Fredoka","Nunito Sans",sans-serif;font-size:9.4pt;margin:0 0 .02in;line-height:1.3}
/* own play */
.own{border:1.3px solid #C9D2E1;border-radius:14px;padding:.1in .16in;margin-bottom:.12in}
.own .phead{margin-bottom:0}
.own .field:not(.multi):not(.inl){min-height:.26in}
.own .field.multi{height:calc(var(--l,3) * .28in);background:repeating-linear-gradient(to bottom,transparent 0,transparent calc(.28in - 1.3px),#9AA6BC calc(.28in - 1.3px),#9AA6BC .28in)}
.own .ptitle .field.big{margin-top:.02in}
.ownl{margin-top:.03in;font-size:9.5pt}
.ownl.two{display:grid;grid-template-columns:1fr 1fr;gap:.2in}
/* faq */
.faq{columns:2;column-gap:.3in}
.fq{break-inside:avoid;margin-bottom:.12in;font-size:9.5pt}
.fq b{display:block;font-size:10.5pt}
.fq p{margin:0}
.sources{padding-left:.2in;margin-bottom:.2in}
.sources li{margin-bottom:.1in}
/* next */
.nextg{display:grid;grid-template-columns:1fr 1fr;gap:.16in .24in;margin-bottom:.2in}
.nx{display:flex;gap:.14in;align-items:center}
.nx b{display:block;font-family:"Bricolage Grotesque",sans-serif;font-size:12pt}
.nx span{font-size:9.3pt}
.bonus{display:flex;gap:.24in;align-items:center;background:${C.tSun};border-radius:16px;padding:.2in}
.bonus .qr svg{display:block}
.bonus h3{margin-top:.02in}
.bonus p{font-size:10pt}
.bonus .tlab{font-weight:800;font-size:9pt;letter-spacing:.08em;text-transform:uppercase;color:${C.tomato}}
${V.low ? `
/* ---- low-ink: white grounds, colorable line art ---- */
.page{background:#fff!important}
.promise div,.talklines li,.love,.pedi,.circleit,.spotcol.ex,.never,.spotsay,.band,.ciself,.bonus,.script,.talk,.step{background:#fff!important;border:1.3px solid #C9D2E1}
.script{border-left:5px solid}
.mapk,.wkn,.mn{background:#fff!important;color:${C.ink}!important;border:1.5px solid ${C.ink}}
` : ''}
${V.low && !V.gray ? `
.artdefs symbol *,.chardefs symbol *,svg.scene *,.art svg *,.cstars svg *{fill:#fff!important;stroke:${C.ink}!important;stroke-width:2.2px!important;stroke-linejoin:round}
.art .ground{stroke-width:1.5px!important}
` : ''}
`;
  let html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(K.TITLE)} — ${V.book ? 'Paperback interior' : 'Workbook'}</title>
<link rel="stylesheet" href="${FONTS}"><style>${css}</style></head><body>
${P.defs().replace('<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' + P.CH.SYMBOLS.join(''), '<svg width="0" height="0" style="position:absolute" aria-hidden="true" class="chardefs"><defs>' + P.CH.SYMBOLS.join('') + '</defs></svg><svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>')}
${pages.join('\n')}
</body></html>`;
  if (V.gray) html = toGray(html);
  return { html, count: pages.length };
}

if (require.main === module) {
  const only = process.argv[2];
  for (const [k, V] of Object.entries(VARIANTS)) {
    if (only && only !== k) continue;
    const { html, count } = doc(V);
    const out = path.join(P.OUT, V.file);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    console.log(k.padEnd(14), count, 'pages ->', V.file);
  }
}
module.exports = { VARIANTS, doc, toGray };
