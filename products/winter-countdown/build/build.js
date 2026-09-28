// 24 Days of Play: Winter Countdown (ages 2–5 edition): writes every edition's HTML and the render jobs.
//   node build.js            -> build/html/*.html, source.html, build/jobs.json, build/finish.json
// Then: bash build/make.sh  (renders PDFs, adds form fields, checks, previews, cover, mockup, listing images)
'use strict';
const path = require('path');
const fs = require('fs');
const K = require('../../bundle-gift-1-5/build/shared/kit.js');
const { PLAYS, MOVES, HUNT, HEAD, NOBUY } = require('./content.js');
const { C, D, esc, icon, mi, ageChip, field, logo, qr, bonusUrl, CHARS } = K;

const SLUG = 'winter-countdown';
const PRODUCT = '24 Days of Play: Winter Countdown';
const PDIR = path.resolve(__dirname, '..');
const HTML = path.join(__dirname, 'html');
fs.mkdirSync(HTML, { recursive: true });

const HC = { sky: [C.sky, C.tSky, D.sky], plum: [C.plum, C.tPlum, D.plum], grass: [C.grass, C.tGrass, D.grass], tomato: [C.tomato, C.tTomato, D.tomato] };
const PREP = m => (m ? `Prep ${m} min` : 'No prep');
const MESS = ['No mess', 'A little mess', 'Messy'];
const steps = t => t.split(/(?<=[.!?][”]?)\s+(?=[A-Z“])/);
const iconAt = (name, ctx, x, y, s) => icon(name, ctx, s).replace('<svg class="ic ', `<svg x="${x}" y="${y}" class="ic `);

// ---------------------------------------------------------------- the scene (cast from chars.js)
function scene(ctx, w = 400, h = 300) {
  const { kid, adult, KIDS, ADULTS } = CHARS;
  const floor = h - 6;
  const g = adult(Object.assign({}, ADULTS.G1, { x: 118, y: floor - 51 * 1.2, s: 1.2, legs: 'kneel', aL: 20, aR: -60, face: 'laugh' }));
  const k = kid(Object.assign({}, KIDS.A, { x: 222, y: floor - 27 * 1.25, s: 1.25, aL: 150, aR: -40, face: 'laugh' }));
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" class="scene" aria-hidden="true">
    <ellipse class="fw li-snow" cx="${w / 2}" cy="${floor + 2}" rx="${w / 2 - 6}" ry="16"/>
    ${iconAt('snowman', ctx, 262, floor - 150, 150)}
    ${g}${k}
    ${iconAt('snowball', ctx, 8, floor - 78, 80)}
  </svg>`;
}

// ---------------------------------------------------------------- page parts
function metaRow(p) {
  return `<div class="meta">
    <span>${mi('from')} From ${p.from} mo</span>
    <span>${mi('prep')} ${PREP(p.prep)}${p.night ? ' (the night before)' : ''}</span>
    <span>${mi('mess')} ${MESS[p.mess]}</span>
    <span>${mi('time')} About ${p.time} min</span>
    ${p.buy ? '' : `<span class="nb">${mi('nobuy', 13, D.grass)} Nothing to buy</span>`}
  </div>`;
}

function card(ctx, p) {
  const [c, t, d] = HC[HEAD[(p.n - 1) % HEAD.length]];
  return `<article class="card" style="--c:${c};--t:${t};--d:${d}">
    <header class="ch li-edge">
      <div class="day li-white"><span>Day</span><b>${p.n}</b></div>
      <div class="ch-mid">
        <h3 class="li-text">${esc(p.t)}</h3>
        <div class="ch-flags">${ageChip(p.age)}<span class="flag">${mi('grownup', 12)} With a grown-up</span></div>
      </div>
      <div class="disc li-white">${icon(p.art, ctx, 82)}</div>
    </header>
    ${metaRow(p)}
    <div class="cbody">
      <div class="cleft">
        <p class="need"><b>You need:</b> ${esc(p.needs)}</p>
        <ol class="how">${steps(p.how).map(t => `<li>${esc(t)}</li>`).join('')}</ol>
        ${p.hunt ? `<div class="hunt">${HUNT.map(([a, l], i) => `<span class="hi"><i class="tick" ${field(`hunt_${i + 1}`, { check: 1 })}></i>${icon(a, ctx, 26)}<em>${l}</em></span>`).join('')}</div>` : ''}
        <div class="talk li-white">${mi('talk', 14, d)}<div><em>Talk while you play · ${MOVES[p.move]}</em><p>${esc(p.talk)}</p></div></div>
      </div>
      <div class="cright">
        <p class="ez">${mi('easy', 14, D.grass)}<span><b>Make it easier:</b> ${esc(p.easy)}</span></p>
        <p class="ez">${mi('hard', 14, D.plum)}<span><b>Make it harder:</b> ${esc(p.hard)}</span></p>
        <p class="ez">${mi('two', 14, D.sky)}<span><b>Tired? 2-minute version:</b> ${esc(p.two)}</span></p>
        <p class="sf li-white">${mi('safe', 14, D.tomato)}<span><b>Safety:</b> ${esc(p.safe)}</span></p>
      </div>
    </div>
  </article>`;
}

function cardPage(ctx, a, b) {
  return `<div class="cardpage">
    <div class="half top">${card(ctx, a)}</div>
    <div class="cutrow"><span class="cutnote">${mi('scissors', 14)} Cut on the dashed line · Grown-up keeps the pieces</span></div>
    <div class="half bot">${card(ctx, b)}</div>
  </div>`;
}

function cover(ctx) {
  const flakes = [[700, 34, 46], [636, 132, 24], [730, 236, 30], [560, 28, 22], [60, 520, 34], [170, 580, 22], [40, 404, 20]];
  return `<div class="cv">
    <div class="cv-panel li-white">
      ${flakes.map(([x, y, s]) => `<div class="flk" style="left:${x}px;top:${y}px">${icon('snowflake', ctx, s)}</div>`).join('')}
      <div class="cv-head">
        ${logo(ctx, 'lockup', null, 'lockup cv-logo')}
        <p class="kicker">Printable winter countdown · Ages 2–5</p>
        <h1><span class="n24 li-edge">24</span> Days of Play</h1>
        <h2>Winter Countdown</h2>
        <p class="lede">One easy play a day for 24 winter days, made from things you already have. Start any day you like.</p>
      </div>
      <div class="cv-art">${scene(ctx).replace('width="400" height="300"', 'width="500" height="375"')}</div>
    </div>
    <div class="cv-low">
      <div class="tiles">
        <div class="tile li-white"><b>24</b><span>plays, one a day</span></div>
        <div class="tile li-white"><b>${NOBUY}</b><span>need nothing to buy</span></div>
        <div class="tile li-white"><b>0–5</b><span>minutes to set up most days</span></div>
        <div class="tile li-white"><b>2+</b><span>years, with a grown-up</span></div>
      </div>
      <p class="prepline li-white"><b>Prep:</b> about 15 minutes to print and cut the 12 card pages, once. No time to cut? Use the countdown board and the list page.</p>
      <ul class="inside">
        <li>${mi('check', 15, D.grass)} 24 play cards with a talk line and safety line</li>
        <li>${mi('check', 15, D.grass)} Easier, harder and 2-minute versions</li>
        <li>${mi('check', 15, D.grass)} A countdown board, plus a blank one</li>
        <li>${mi('check', 15, D.grass)} 24 number tags and a fridge certificate</li>
      </ul>
      <div class="peek">${[0, 3, 4, 5, 12, 13, 17, 19].map(i => `<div class="pk"><div class="pk-d li-white">${icon(PLAYS[i].art, ctx, 46)}</div><span>${esc(PLAYS[i].t)}</span></div>`).join('')}</div>
    </div>
  </div>`;
}

function guide1(ctx) {
  return `<div class="pad">
    <p class="kicker d-sky">Grown-up guide · 1 of 2</p>
    <h2 class="ptitle">How the countdown works</h2>
    <p class="lede2">Winter days can be long and dark. This countdown gives each one a small, warm play to look forward to. It takes about two minutes to start, and there is no wrong way to do it.</p>
    <div class="steps">
      <div class="step li-white"><b>1</b><div><h4>Print</h4><p>Print pages 6–23 (or the whole file). Card stock is nice but plain paper works.</p></div></div>
      <div class="step li-white"><b>2</b><div><h4>Pick a way</h4><p>Cut the 12 card pages in half and tuck each card in an envelope, bag or jar with its number tag. Or skip the cutting and use the board.</p></div></div>
      <div class="step li-white"><b>3</b><div><h4>Pick a start day</h4><p>Any day works. Many families start on the first of the month; others start the first snowy week or the first day of a break.</p></div></div>
    </div>
    <h3 class="sub">Three ways to use it</h3>
    <div class="ways">
      <div class="way li-white" style="--c:${C.sky}"><h4>Card a day</h4><p>Open one numbered card each morning. Play it when it suits your day, even at bedtime.</p></div>
      <div class="way li-white" style="--c:${C.plum}"><h4>Board only</h4><p>Hang the countdown board. Read the day’s play from the list page. Your child marks the square after you play.</p></div>
      <div class="way li-white" style="--c:${C.grass}"><h4>Pick and choose</h4><p>Skip a day, swap two days, play a favorite twice. The numbers are there to help, not to boss you around.</p></div>
    </div>
    <div class="note li-white">
      ${icon('star', ctx, 58)}
      <p><b>Most children love 2–3 of these</b> and want them again and again. That’s the countdown working. Play the favorites as often as you like, and let the rest wait for another winter.</p>
    </div>
    <div class="why li-white">
      <h4>Why a play a day?</h4>
      <p>Young children learn words and ideas in back-and-forth moments with the people who love them: a look, a laugh, a turn, a word. A short play each day adds more of those moments to ordinary winter days. The screens in your home keep their usual spot; this is simply something warm to add.</p>
    </div>
    <h3 class="sub">A peek at the first week</h3>
    <div class="week">${PLAYS.slice(0, 7).map(p => `<div class="wk li-white"><b>Day ${p.n}</b>${icon(p.art, ctx, 54)}<span>${esc(p.t)}</span><em>${PREP(p.prep)}</em></div>`).join('')}</div>
  </div>`;
}

function guide2(ctx) {
  const moves = [
    ['wait', 'Pause and wait', 'Say a little, then stop and count to five in your head. A look, a sound or a wiggle is an answer.', '“Ready, set… (wait)”'],
    ['see', 'Say what you see', 'Put words to what your child is doing, right as it happens. No quiz questions needed.', '“Drip, drip. It’s melting!”'],
    ['choice', 'Offer a choice', 'Hold up two things and wait. Pointing and reaching count as answers.', '“Big cup or little cup?”'],
  ];
  return `<div class="pad">
    <p class="kicker d-sky">Grown-up guide · 2 of 2</p>
    <h2 class="ptitle">Talk while you play</h2>
    <p class="lede2">Every card has one talk line. Say it your way, or read it straight off the card. These three moves do most of the work:</p>
    <div class="moves">${moves.map(([k, n, tip, ex]) => `<div class="mv li-white"><h4>${n}</h4><p>${tip}</p><p class="ex">${ex}</p></div>`).join('')}</div>
    <div class="lang li-white">${mi('talk', 18, D.sky)}<p><b>Talk, sign, sing and read in the language you know best.</b> Every talk line works in any language. A sign, a point or a tap on a talking device counts as communicating, just like a word. Reading the talk line word for word, or playing quietly side by side, counts too.</p></div>
    <h3 class="sub">How to read a play card</h3>
    <div class="anat">
      <div class="anat-card">${card(ctx, PLAYS[2])}</div>
      <ol class="anat-key">
        <li><b>Day number and name.</b> Use them in order or not.</li>
        <li><b>Age label.</b> Color, shape and words, from the play’s own starting age: <span class="nowrap">${ageChip('2+')},</span> <span class="nowrap">${ageChip(K.ageFrom(30))} or</span> <span class="nowrap">${ageChip('3+')}.</span></li>
        <li><b>Prep, mess and time.</b> Play times are rough; stop whenever your child is done.</li>
        <li><b>Nothing to buy.</b> ${NOBUY} of the 24 plays use only things most homes have.</li>
        <li><b>Easier, harder and 2-minute versions.</b> Tired? The 2-minute version still counts.</li>
        <li><b>Safety line.</b> Read it before you start. A grown-up is always there.</li>
      </ol>
    </div>
    <h3 class="sub">If today isn’t the day</h3>
    <div class="ways">
      <div class="way li-white" style="--c:${C.sun}"><h4>Not interested? Busy week?</h4><p>Try the 2-minute version, let your child pick another day, or play two short days at the weekend. Watching you play counts too. There’s no streak to keep.</p></div>
      <div class="way li-white" style="--c:${C.sky}"><h4>Sitting down? No snow?</h4><p>Every play works from a chair, a bed or a wheelchair, and indoors. Sound plays can be see-it or feel-it plays: a light flick for “stop.” The hunt card has a no-snow list.</p></div>
      <div class="way li-white" style="--c:${C.tomato}"><h4>Two children?</h4><p>Give each a job: one holds, one pours; one hides, one seeks. Take turns being the leader.</p></div>
    </div>
  </div>`;
}

function safety(ctx) {
  const rules = [
    ['grownup', 'A grown-up plays too', 'Every play is for a child and a grown-up together. Stay close and watch.'],
    ['safe', 'The toilet-paper tube test', 'For children under 3, anything that fits through a toilet-paper tube (about 1.25 in or 3.2 cm across) stays out of reach. When in doubt, leave it out.'],
    ['mess', 'Water and ice', 'Stay within arm’s reach during any water play, even a tray of melting ice. Warm water only: test it on your wrist.'],
    ['needs', 'No cords, no balloons', 'No cords, strings, scarves or ties long enough to go around a neck. No balloons for children under 8.'],
    ['heart', 'Food and allergies', 'Soft food cut small and thin, eaten sitting down. No whole grapes, nuts, popcorn, marshmallows or hard candy for little ones. Check allergies first.'],
    ['night', 'Lights, batteries and heat', 'Use a flashlight with a screwed-shut battery door and keep button batteries away from children. Keep hot drinks and the stove out of every play.'],
    ['from', 'Windows and climbing', 'Look through closed windows from the floor. A grown-up lifts; nobody stands on sills or furniture.'],
    ['time', 'Cold days outside', 'Dress for the weather and come in when little hands and noses feel cold. Hold hands near roads.'],
  ];
  return `<div class="pad">
    <p class="kicker d-tomato">Before you play</p>
    <h2 class="ptitle">Our safety rules</h2>
    <p class="lede2">Every play in this countdown follows these rules, and each card has its own safety line. You know your child best: skip or change anything that doesn’t suit them.</p>
    <div class="rules">${rules.map(([m, h, t]) => `<div class="rule li-white">${mi(m, 20, D.tomato)}<div><h4>${h}</h4><p>${t}</p></div></div>`).join('')}</div>
    <p class="small note2">These are everyday play ideas for families, not medical or developmental advice. Questions about your child’s growth or health? Your child’s doctor is a good place to start.</p>
  </div>`;
}

function pantry(ctx) {
  const byArt = a => PLAYS.find(p => p.art === a).n;
  const days = (...arts) => arts.map(byArt).sort((a, b) => a - b);
  const items = [
    ['Paper and crayons', days('snowball', 'snowman', 'snowflake', 'footprints', 'star')], ['A laundry basket', days('snowball')],
    ['Mittens, gloves, socks', days('mitten', 'penguin', 'teddy', 'mittenfriend', 'hatsun')], ['A blanket and pillows', days('bear', 'book')],
    ['A table', days('bear')], ['A plastic tub, a baking tray, spoons', days('ice')], ['Big bath toys', days('ice')],
    ['A teddy or doll, a hat, a small towel', days('teddy')], ['Cups, a pot, spoons', days('mug', 'pot')], ['Warm clothes', days('boot', 'hatsun')],
    ['Tape', days('snowflake', 'footprints')], ['Music, or your singing', days('icicle')], ['A window', days('window', 'moon', 'bird')],
    ['A flashlight and 2–3 toys', days('flashlight')], ['Toast, a soft spread, a banana', days('toast')], ['Sofa cushions', days('cushions')],
    ['One toy to hide', days('hide')], ['This countdown', days('star')],
  ];
  const buys = PLAYS.filter(p => p.buy);
  return `<div class="pad">
    <p class="kicker d-grass">Get ready in 5 minutes</p>
    <h2 class="ptitle">What you’ll need</h2>
    <p class="lede2"><b>${NOBUY} of the 24 plays need nothing to buy.</b> Gather a few of these as you go; there is no need to set everything up at once.</p>
    <div class="pantry">${items.map(([n, days]) => `<div class="pi li-white"><span>${n}</span><em>Day ${days.join(', ')}</em></div>`).join('')}</div>
    <div class="twobox">
      <div class="tb li-white">${mi('night', 18, D.plum)}<div><h4>One play needs a head start</h4><p><b>Day ${byArt('ice')}, Ice Rescue:</b> freeze the toys in a tub of water the night before (about 2 minutes). Put a reminder on Day ${byArt('ice') - 1}.</p></div></div>
      <div class="tb li-white">${mi('needs', 18, D.grass)}<div><h4>Two plays may need something</h4><p>${buys.map(p => `<b>Day ${p.n}, ${p.t}:</b> ${p.n === byArt('snowflake') ? 'child-safe scissors' : 'toast, a soft spread and a banana'}`).join('. ')}. Swap in any other day if you don’t have them.</p></div></div>
    </div>
    <div class="prepbox li-white">
      <h4>Prep plan</h4>
      <p><b>Once, about 15 minutes:</b> print, cut the card pages in half along the dashed line, cut out the number tags and hang the board.</p>
      <p><b>Each day, 0–5 minutes:</b> read the card, gather what it needs, play.</p>
      <p><b>No time to cut?</b> Hang the board and read each day’s play from the list on page 8.</p>
    </div>
  </div>`;
}

function board(ctx, blank) {
  const cells = PLAYS.map(p => `<div class="bc li-white" style="--c:${HC[HEAD[(p.n - 1) % HEAD.length]][0]}">
      <b class="bn">${p.n}</b>
      ${blank ? `<div class="bl" ${field(`board_play_${p.n}`, { size: 9, multi: 1 })}></div>` : `${icon(p.art, ctx, 66)}<span class="bt">${esc(p.t)}</span>`}
      <i class="spot"></i>
    </div>`).join('');
  return `<div class="pad">
    <div class="bhead">
      <div><p class="kicker d-sky">${blank ? 'Make your own' : 'Hang it where everyone can see'}</p>
      <h2 class="ptitle">Our winter countdown</h2>
      <p class="lede2">${blank ? 'Write or draw your own plays in the squares, or type them in before you print. Mark the circle after each day.' : 'After each day’s play, your child colors the circle or adds a sticker. Play the days in any order.'}</p></div>
      ${icon('snowflake', ctx, 70)}
    </div>
    <div class="board">${cells}</div>
  </div>`;
}

function list(ctx) {
  return `<div class="pad">
    <p class="kicker d-plum">No cutting needed</p>
    <h2 class="ptitle">All 24 plays at a glance</h2>
    <p class="lede2">Read the day’s play here if you’re using the board only. The full card, with its talk line and safety line, is on the page shown.</p>
    <div class="lst">
      <div class="lh"><span>Day</span><span></span><span>Play</span><span>You need</span><span>Age</span><span>Card</span></div>
      ${PLAYS.map(p => `<div class="lr"><b>${p.n}</b>${icon(p.art, ctx, 26)}<span class="ln">${esc(p.t)}</span><span class="lnd">${esc(p.needs)}</span><span class="la">${p.from} mo+</span><span class="lp">p. ${9 + Math.floor((p.n - 1) / 2)}</span></div>`).join('')}
    </div>
  </div>`;
}

function tags(ctx, from) {
  const t = PLAYS.slice(from, from + 12).map(p => `<div class="tag"><div class="tg-in li-white" style="--c:${HC[HEAD[(p.n - 1) % HEAD.length]][0]}">
      <span class="tg-day">Day</span><b class="tg-n">${p.n}</b>${icon(p.art, ctx, 44)}</div></div>`).join('');
  return `<div class="pad tagpad">
    <div class="taghead"><div><p class="kicker d-sky">Number tags · ${from + 1}–${from + 12}</p><h2 class="ptitle sm">Tape a tag on each envelope, bag or jar</h2></div>
    <span class="cutnote">${mi('scissors', 14)} Cut on the dashed lines · Grown-up keeps the pieces</span></div>
    <div class="tags">${t}</div>
  </div>`;
}

function certificate(ctx) {
  const { kid, adult, KIDS, ADULTS } = CHARS;
  const art = `<svg viewBox="0 0 520 250" width="660" height="317" aria-hidden="true">
    <ellipse class="fw" cx="260" cy="244" rx="250" ry="10"/>
    ${adult(Object.assign({}, ADULTS.G3, { x: 150, y: 244 - 81, s: 1, aL: 20, aR: -140, face: 'laugh' }))}
    ${kid(Object.assign({}, KIDS.C, { x: 250, y: 244 - 27 * 1.1, s: 1.1, aL: 150, aR: -150, face: 'joy' }))}
    ${kid(Object.assign({}, KIDS.B, { x: 320, y: 244 - 27 * 0.95, s: 0.95, aL: 140, aR: -30, face: 'laugh' }))}
    ${iconAt('snowman', ctx, 370, 104, 140)}
    ${iconAt('star', ctx, 30, 20, 70)}
  </svg>`;
  return `<div class="cert li-white">
    <div class="cert-in">
      <p class="kicker d-sky">24 Days of Play</p>
      <h2 class="cert-t">We played our way<br>through winter!</h2>
      <p class="cert-our hand">Our family</p>
      <div class="cert-art">${art}</div>
      <div class="flakes">${PLAYS.map(() => icon('snowflake', ctx, 36)).join('')}</div>
      <p class="cert-sub">Color a snowflake for every day you played.</p>
      <div class="cert-lines">
        <div><span>Our favorite day was</span><div class="field" ${field('cert_favorite', { size: 13 })}></div></div>
        <div><span>Date</span><div class="field" ${field('cert_date', { size: 13 })}></div></div>
      </div>
      <p class="posting">Posting a photo? Leave out names and faces.</p>
    </div>
  </div>`;
}

function answers(ctx) {
  const faq = [
    ['Which file do I print?', `Pick one: US Letter or A4, color or low-ink. Every file has the same ${ctx.total} pages. Print at “Actual size” or 100%, not “Fit”.`],
    ['Which pages?', 'Pages 6–8 (boards and list), 9–20 (play cards), 21–22 (number tags) and 23 (certificate). The guide pages are for you to read on screen.'],
    ['What paper?', 'Plain paper is fine. Card stock makes cards and tags last longer. Laminating is optional.'],
    ['We started late. Is that okay?', 'Yes. The plays aren’t tied to dates. Start on any day and play as many days as you like.'],
    ['Is this tied to a holiday?', 'No. It’s a winter countdown for any family: snow, cold, cozy days and long nights. Use it to count down to a holiday, a break, a birthday or nothing at all.'],
    ['We have a baby and a preschooler.', 'Every card says its starting age. Let the baby watch from a lap and keep small things out of reach. Many plays have an easier version for younger children.'],
    ['Can I type in it?', 'Yes, in the color and low-ink files, with a free PDF reader: the blank board squares, the Winter Walk Hunt tick boxes and the certificate lines. Pictures and colors can’t be changed.'],
    ['Can we use it again next winter?', 'Yes. Print a fresh copy each year; your license doesn’t expire. Children often ask for their favorite days again.'],
    ['A page won’t print right?', ctx.edition === 'etsy' ? 'Open it in a different free PDF reader and print at 100%. Still stuck? Send us a message through the shop.' : 'Open it in a different free PDF reader and print at 100%. Still stuck? Answers are at playbeforepixels.com/help.'],
    ['Can I share it?', 'Your license covers one household, including grandparents and sitters who care for your child. Please don’t share the files. A gift passes the license to the family who receives it.'],
  ];
  return `<div class="pad">
    <p class="kicker d-sky">Printing and quick answers</p>
    <h2 class="ptitle">Good to know</h2>
    <div class="faq">${faq.map(([q, a]) => `<div class="qa li-white"><h4>${q}</h4><p>${a}</p></div>`).join('')}</div>
    <div class="pmap li-white"><h4>Page map</h4><p>1 cover · 2–3 grown-up guide · 4 safety rules · 5 what you need · 6 countdown board · 7 blank board · 8 all 24 plays · 9–20 play cards (Days 1–24) · 21–22 number tags · 23 certificate · 24 good to know · 25 more from Play Before Pixels</p></div>
  </div>`;
}

function more(ctx) {
  const nx = [
    ['binder', C.plum, 'Toddler Busy Book', '74 activities for ages 1–5: matching, colors, shapes, pretend play and mazes.'],
    ['cards', C.sun, '“I’m Bored” Play Cards', 'Play cards sorted by age and energy, for the long days after the countdown ends.'],
    ['talkcard', C.tomato, '52 Play & Talk Cards', 'One play and one talk tip on every card, for ages 0–5. A card a week for a year.'],
    ['gift', C.sky, 'Ages 1–5 Instant Gift Bundle', 'The busy book, the family kit pages and two card sets in one download.'],
  ];
  return `<div class="pad">
    <p class="kicker d-plum">What’s next</p>
    <h2 class="ptitle">More from Play Before Pixels</h2>
    <p class="lede2">Next for ages 2–5. ${ctx.edition === 'etsy' ? 'Find them in our shop.' : 'Find them all at playbeforepixels.com.'}</p>
    <div class="nexts">${nx.map(([a, c, h, t]) => `<div class="nx li-white" style="--c:${c}"><div class="nx-ic">${icon(a, ctx, 56)}</div><div><h4>${h}</h4><p>${t}</p></div></div>`).join('')}</div>
    <div class="bonus store-only li-white">
      <div class="qrwrap">${qr(bonusUrl(SLUG), 118)}</div>
      <div><p class="kicker">For grown-ups</p><h4>Free winter bonus page</h4>
      <p>Scan for a free printable and the monthly “3 plays for your child’s age” email. We ask only for your email and, if you like, your child’s birth month and year. Never names.</p>
      <p class="small">playbeforepixels.com/bonus/winter-countdown · Lost your files? playbeforepixels.com/help</p></div>
    </div>
    <div class="bonus etsy-only li-white">
      ${icon('heart', ctx, 70)}
      <div><h4>Thank you for playing with us</h4>
      <p>Your files stay on your Purchases page, so you can download them again any time. If something won’t open or print, send us a message through the shop.</p></div>
    </div>
    <div class="colophon">
      <p><b>24 Days of Play: Winter Countdown, ages 2–5 edition.</b> ${ctx.version}. Everyday play ideas for families, not medical or developmental advice. Every play follows our published safety rules; a grown-up is always there.</p>
      <p>Personal license: one household, including grandparents and sitters who care for your child. Please don’t resell or share the files.</p>
      <p>${K.OWNER} Text, illustrations and page design were made with AI tools for Play Before Pixels.</p>
    </div>
  </div>`;
}

// ---------------------------------------------------------------- START HERE (1 page)
function startHere(ctx) {
  const files = ctx.edition === 'etsy'
    ? [['1-START-HERE.pdf', 'This page.'], ['2-Color-US-Letter.pdf', 'Color, US Letter (8.5 × 11 in).'], ['3-Color-A4.pdf', 'Color, A4.'], ['4-Low-Ink-US-Letter.pdf', 'Low-ink, US Letter: white pages, line art to color.'], ['5-Low-Ink-A4.pdf', 'Low-ink, A4.']]
    : [['START-HERE.pdf', 'This page.'], ['winter-countdown.pdf', 'Color, US Letter (8.5 × 11 in).'], ['winter-countdown-A4.pdf', 'Color, A4.'], ['winter-countdown-low-ink.pdf', 'Low-ink, US Letter: white pages, line art to color.'], ['winter-countdown-low-ink-A4.pdf', 'Low-ink, A4.']];
  return `<div class="pad">
    ${logo(ctx, 'lockup', null, 'lockup sh-logo')}
    <div class="sh-top">
      <div><p class="kicker d-sky">Start here · 24 Days of Play: Winter Countdown</p>
      <h2 class="ptitle">Welcome! Here’s how to begin.</h2>
      <p class="lede2">24 winter plays for ages 2–5, one a day. About 15 minutes to print and cut, once. Most days take 0–5 minutes to set up.</p></div>
      ${icon('snowflake', ctx, 86)}
    </div>
    <h3 class="sub">Your files: pick one to print</h3>
    <ul class="files">${files.map(([f, t]) => `<li class="li-white"><b>${f}</b><span>${t}</span></li>`).join('')}</ul>
    <p class="small">Every file has the same 25 pages. Letter is the usual size in the US and Canada; A4 almost everywhere else.</p>
    <div class="sh-grid">
      <div class="shb li-white"><h4>${mi('print', 16)} Print settings</h4><p>Print at <b>Actual size</b> or <b>100%</b>. Plain paper works; card stock lasts longer. Print pages 6–23; read the guide on screen.</p></div>
      <div class="shb li-white"><h4>${mi('scissors', 16)} Then</h4><p>Cut the card pages in half on the dashed line. Cut out the number tags. Hang the board. That’s it.</p></div>
      <div class="shb li-white"><h4>${mi('phone', 16)} On a phone?</h4><p>${ctx.edition === 'etsy' ? 'Download in a web browser, not the shopping app. Your files stay on your Purchases page.' : 'Open the download link in a web browser and save each PDF. Lost it? playbeforepixels.com/help'}</p></div>
      <div class="shb li-white"><h4>${mi('safe', 16, D.tomato)} Safety first</h4><p>Read page 4 before Day 1. Every card has its own safety line, and a grown-up is always there.</p></div>
    </div>
    <h3 class="sub">What’s inside</h3>
    <div class="tiles sh-tiles">
      <div class="tile li-white"><b>24</b><span>play cards, 2 per page</span></div>
      <div class="tile li-white"><b>${NOBUY}</b><span>need nothing to buy</span></div>
      <div class="tile li-white"><b>2</b><span>countdown boards, one blank</span></div>
      <div class="tile li-white"><b>24</b><span>number tags + a certificate</span></div>
    </div>
    <p class="small tight">Personal license for one household. Print shops may print copies for this customer’s family. ${K.OWNER}</p>
  </div>`;
}

// ---------------------------------------------------------------- CSS
function extraCss(ctx) {
  const W = ctx.W, H = ctx.H;
  const half = Math.floor(H / 2);
  const cardH = H - 74 - (half + 24);
  return `
.d-sky{color:${D.sky}}.d-tomato{color:${D.tomato}}.d-grass{color:${D.grass}}.d-plum{color:${D.plum}}
.ptitle{font-size:38px;margin:6px 0 8px}
.ptitle.sm{font-size:24px;margin:4px 0 0}
.lede2{font-size:15.5px;line-height:1.5;max-width:660px;margin-bottom:18px}
.sub{font-size:20px;margin:18px 0 10px}
.small{font-size:11px;line-height:1.45}
.nowrap{white-space:nowrap}
/* cover */
.cv{position:absolute;inset:0;background:${C.wash}}
.cv-panel{position:absolute;left:0;right:0;top:0;height:${Math.round(H * 0.6)}px;background:${C.tSky};overflow:hidden}
.flk{position:absolute;opacity:.9}
body.color .flk .fk{fill:#FFFFFF}
.cv-head{position:absolute;left:52px;top:40px;right:52px}
.cv-logo{height:30px;margin-bottom:22px}
.peek{display:grid;grid-template-columns:repeat(8,1fr);gap:8px;margin-top:18px}
.pk{display:flex;flex-direction:column;align-items:center;text-align:center;gap:5px}
.pk-d{width:64px;height:64px;border-radius:50%;background:#FFFFFF;display:flex;align-items:center;justify-content:center}
.pk span{font-size:10px;font-weight:800;line-height:1.2}
.cv-head .kicker{color:${C.ink}}
.cv h1{font-size:78px;line-height:.95;letter-spacing:-.035em;margin:14px 0 0;display:flex;align-items:center;gap:16px}
.n24{display:inline-flex;align-items:center;justify-content:center;background:${C.tomato};color:#FFFFFF;border-radius:22px;padding:4px 18px 8px;font-size:92px;line-height:1}
body.lowink .n24{color:${C.ink};--c:${C.ink}}
.cv h2{font-size:44px;color:${D.sky};margin:8px 0 0;letter-spacing:-.02em}
body.lowink .cv h2{color:${C.ink}}
.cv .lede{font-size:17px;line-height:1.45;font-weight:600;max-width:330px;margin-top:16px}
.cv-art{position:absolute;right:26px;bottom:0}
.cv-low{position:absolute;left:52px;right:52px;top:${Math.round(H * 0.6) + 22}px}
.tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.tile{background:#FFFFFF;border-radius:16px;padding:12px 14px;border-bottom:5px solid ${C.sky}}
.tile b{display:block;font-family:"Bricolage Grotesque",sans-serif;font-size:34px;line-height:1}
.tile span{display:block;font-size:11px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;margin-top:4px;color:#3C4760}
.prepline{background:#FFFFFF;border-radius:12px;padding:8px 14px;margin:12px 0 10px;font-size:12.5px}
.inside{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:6px 18px;font-size:13.5px;font-weight:600}
.inside li{display:flex;align-items:center;gap:8px}
/* guide */
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.step{display:flex;gap:10px;background:${C.tSky};border-radius:16px;padding:12px}
.step>b{flex:none;width:30px;height:30px;border-radius:50%;background:${C.ink};color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-family:"Fredoka",sans-serif;font-size:17px;font-weight:600}
body.lowink .step>b{background:#FFFFFF;color:${C.ink};box-shadow:inset 0 0 0 2px ${C.ink}}
.step h4,.way h4,.mv h4,.rule h4,.tb h4,.qa h4,.nx h4,.pmap h4,.prepbox h4,.why h4,.shb h4,.bonus h4{font-size:16px;margin:0 0 4px}
.step p,.way p,.mv p,.rule p,.tb p,.qa p,.nx p,.pmap p,.prepbox p,.why p,.shb p,.bonus p{font-size:13.4px;line-height:1.48}
.ways{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.way{background:${C.wash};border-radius:16px;padding:12px 14px;border-top:6px solid var(--c)}
.note{display:flex;gap:14px;align-items:center;background:${C.tSun};border-radius:16px;padding:12px 16px;margin-top:16px;font-size:13px;line-height:1.5}
.why{background:${C.wash};border-radius:16px;padding:14px 16px;margin-top:14px}
.week{display:grid;grid-template-columns:repeat(7,1fr);gap:8px}
.wk{background:${C.tSky};border-radius:14px;padding:10px 6px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:5px}
.wk b{font-family:"Fredoka",sans-serif;font-weight:600;font-size:14px}
.wk span{font-size:11px;font-weight:800;line-height:1.2}
.wk em{font-style:normal;font-size:10px;font-weight:700;color:#3C4760}
.moves{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.mv{background:${C.tSky};border-radius:16px;padding:12px 14px}
.mv .ex{margin-top:6px;font-weight:800;color:${D.sky}}
body.lowink .mv .ex{color:${C.ink}}
.lang{display:flex;gap:10px;align-items:flex-start;background:${C.wash};border-radius:14px;padding:10px 14px;margin-top:12px;font-size:12.5px;line-height:1.45}
.anat{display:grid;grid-template-columns:1fr;gap:10px}
.anat-card{transform:scale(.7);transform-origin:top left;height:${Math.round(cardH * 0.7)}px;width:${Math.round((W - 96) * 0.7)}px}
.anat-card .card{width:${W - 96}px;height:${cardH}px}
.anat{grid-template-columns:${Math.round((W - 96) * 0.7)}px 1fr}
.anat-key{margin:0;padding-left:18px;font-size:12px;line-height:1.42}
.anat-key li{margin-bottom:5px}
.anat-key .chip{font-size:9.5px;padding:1px 7px 1px 5px}
/* safety */
.rules{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.rule{display:flex;gap:12px;background:${C.tTomato};border-radius:16px;padding:16px 16px}
.rule .mi{margin-top:2px}
.note2{margin-top:16px;background:${C.wash};border-radius:12px;padding:10px 14px}
/* pantry */
.pantry{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
.pi{display:flex;flex-direction:column;background:${C.tGrass};border-radius:12px;padding:10px 12px;font-size:13.5px;font-weight:700}
.pi em{font-style:normal;font-weight:800;font-size:11.5px;color:${D.grass};margin-top:2px}
body.lowink .pi em{color:${C.ink}}
.twobox{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px}
.tb{display:flex;gap:10px;background:${C.wash};border-radius:16px;padding:12px 14px}
.prepbox{background:${C.tSky};border-radius:16px;padding:14px 16px;margin-top:14px}
.prepbox p{margin-bottom:5px}
/* board */
.bhead{display:flex;justify-content:space-between;align-items:flex-start;gap:20px}
.board{flex:1;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(6,1fr);gap:10px;margin-top:4px}
.bc{position:relative;background:${C.wash};border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px 8px 10px;border:3px solid var(--c)}
.bn{position:absolute;left:10px;top:6px;font-family:"Fredoka",sans-serif;font-weight:600;font-size:24px;line-height:1}
.bt{font-size:12px;font-weight:800;text-align:center;line-height:1.2;margin-top:4px;max-width:140px}
.spot{position:absolute;right:9px;top:9px;width:26px;height:26px;border-radius:50%;border:2px dashed #8C96AA;background:#FFFFFF}
.bl{position:absolute;left:12px;right:12px;bottom:12px;top:40px;border-bottom:1.4px solid #8C96AA}
/* list */
.lst{display:flex;flex-direction:column;flex:1}
.lh,.lr{display:grid;grid-template-columns:30px 30px 1.25fr 1.6fr 58px 40px;gap:8px;align-items:center}
.lh{font-size:9.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#3C4760;padding:0 8px 4px}
.lr{flex:1;border-bottom:1px solid ${C.wash};padding:0 8px;font-size:11.2px}
.lr:nth-child(odd){background:${C.wash}}
body.lowink .lr:nth-child(odd){background:#FFFFFF}
.lr b{font-family:"Fredoka",sans-serif;font-weight:600;font-size:15px}
.ln{font-weight:800}
.la,.lp{font-weight:700;color:#3C4760}
/* cards */
.cardpage{position:absolute;inset:0}
.half{position:absolute;left:48px;right:48px;height:${cardH}px}
.half.top{top:${half - 24 - cardH}px}
.half.bot{top:${half + 24}px}
.cutrow{position:absolute;left:0;right:0;top:${half}px;border-top:1.6px dashed #8C96AA}
.cutrow .cutnote{position:absolute;left:50%;transform:translate(-50%,-50%);background:#FFFFFF;padding:0 10px}
.card{width:100%;height:100%;display:flex;flex-direction:column;gap:8px}
.ch{display:flex;align-items:center;gap:14px;background:var(--c);border-radius:20px;padding:10px 14px}
.day{flex:none;width:78px;height:78px;border-radius:18px;background:#FFFFFF;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1}
.day span{font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--d)}
.day b{font-family:"Fredoka",sans-serif;font-weight:600;font-size:40px;color:${C.ink}}
body.lowink .day span{color:${C.ink}}
.ch-mid{flex:1;min-width:0}
.ch h3{font-size:27px;color:#FFFFFF;letter-spacing:-.02em;margin-bottom:7px}
.ch-flags{display:flex;gap:6px;flex-wrap:wrap}
.ch-flags .chip{background:#FFFFFF}
.ch-flags .flag{background:#FFFFFF}
.disc{flex:none;width:94px;height:94px;border-radius:50%;background:#FFFFFF;display:flex;align-items:center;justify-content:center}
.meta{display:flex;flex-wrap:wrap;gap:4px 16px;font-size:12.4px;font-weight:700;padding:0 4px;color:#2A3550}
.meta span{display:inline-flex;align-items:center;gap:5px}
.meta .nb{color:${D.grass};font-weight:800}
body.lowink .meta .nb{color:${C.ink}}
.cbody{flex:1;display:grid;grid-template-columns:1.18fr 1fr;gap:14px;min-height:0}
.cleft,.cright{display:flex;flex-direction:column;gap:9px;min-height:0}
.need{font-size:14px;line-height:1.4}
.how{list-style:none;margin:2px 0 0;padding:0;display:flex;flex-direction:column;gap:7px;counter-reset:st}
.how li{counter-increment:st;position:relative;padding-left:32px;font-size:15px;line-height:1.42}
.how li::before{content:counter(st);position:absolute;left:0;top:0;width:23px;height:23px;border-radius:50%;background:var(--t);color:${C.ink};font-family:"Fredoka",sans-serif;font-weight:600;font-size:14px;display:flex;align-items:center;justify-content:center}
body.lowink .how li::before{background:#FFFFFF;box-shadow:inset 0 0 0 1.6px ${C.ink}}
.talk{margin-top:auto;display:flex;gap:8px;align-items:flex-start;background:var(--t);border-radius:14px;padding:9px 12px}
.talk em{display:block;font-style:normal;font-size:9.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--d)}
body.lowink .talk em{color:${C.ink}}
.talk p{font-size:17px;font-weight:800;line-height:1.3;margin-top:1px}
.ez{display:flex;gap:8px;align-items:flex-start;font-size:13.6px;line-height:1.42;padding-bottom:7px;border-bottom:1px solid ${C.wash}}
.ez .mi{margin-top:1px}
.sf{margin-top:auto;display:flex;gap:8px;align-items:flex-start;font-size:13.4px;line-height:1.42;background:${C.tTomato};border-radius:12px;padding:8px 11px}
.hunt{display:flex;gap:6px;flex-wrap:wrap}
.hi{display:inline-flex;align-items:center;gap:4px;background:${C.wash};border-radius:10px;padding:2px 8px 2px 4px;font-size:10.5px;font-weight:800}
.hi em{font-style:normal}
.tick{display:inline-block;width:14px;height:14px;border:1.6px solid #8C96AA;border-radius:3px;background:#FFFFFF}
body.lowink .hi{background:#FFFFFF;box-shadow:inset 0 0 0 1.2px ${C.line}}
/* tags */
.taghead{display:flex;flex-direction:column;gap:6px;margin-bottom:12px}
.tags{flex:1;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(4,1fr);border-top:1.6px dashed #8C96AA;border-left:1.6px dashed #8C96AA}
.tag{border-right:1.6px dashed #8C96AA;border-bottom:1.6px dashed #8C96AA;padding:12px}
.tg-in{width:100%;height:100%;border-radius:18px;background:var(--c);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}
.tg-day{font-size:13px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#FFFFFF}
.tg-n{font-family:"Fredoka",sans-serif;font-weight:600;font-size:74px;line-height:.9;color:#FFFFFF}
.tg-in .ic{background:#FFFFFF;border-radius:50%;padding:4px;width:52px;height:52px}
body.lowink .tg-day,body.lowink .tg-n{color:${C.ink}}
/* certificate */
.cert{position:absolute;left:40px;right:40px;top:40px;bottom:70px;border-radius:28px;background:${C.tSky};padding:14px}
.cert-in{height:100%;border:3px dashed ${C.sky};border-radius:20px;display:flex;flex-direction:column;align-items:center;text-align:center;padding:26px 30px}
body.lowink .cert-in{border-color:#8C96AA}
.cert-t{font-size:48px;line-height:1.02;margin-top:8px;letter-spacing:-.03em}
.cert-our{font-size:56px;color:${D.tomato};margin:6px 0 0;line-height:1}
body.lowink .cert-our{color:${C.ink}}
.cert-art{margin-top:6px}
.flakes{display:grid;grid-template-columns:repeat(12,1fr);gap:10px 14px;margin-top:14px}
body.color .flakes .fk{fill:#FFFFFF}
.cert-sub{font-size:14px;font-weight:700;margin-top:10px}
.cert-lines{width:100%;display:grid;grid-template-columns:1.6fr 1fr;gap:20px;margin-top:auto;text-align:left;font-size:14px;font-weight:800}
.cert-lines .field{height:28px;margin-top:4px;background:transparent}
.posting{font-size:11px;font-weight:700;margin-top:12px;color:#3C4760}
/* answers */
.faq{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.qa{background:${C.wash};border-radius:14px;padding:13px 16px}
.pmap{margin-top:12px;background:${C.tSky};border-radius:14px;padding:10px 14px}
/* more */
.nexts{display:flex;flex-direction:column;gap:10px}
.nx{display:flex;gap:14px;align-items:center;background:${C.wash};border-radius:16px;padding:10px 14px;border-left:8px solid var(--c)}
.nx-ic{flex:none;width:70px;height:70px;border-radius:50%;background:#FFFFFF;display:flex;align-items:center;justify-content:center}
.bonus{display:flex;gap:18px;align-items:center;background:${C.tSun};border-radius:18px;padding:14px 18px;margin-top:16px}
.bonus .small{margin-top:6px}
.colophon{margin-top:auto;border-top:1.5px solid ${C.wash};padding-top:10px}
.colophon p{font-size:10.2px;line-height:1.5;margin-top:4px}
/* start here */
.sh-logo{height:28px;margin-bottom:18px;align-self:flex-start}
.sh-tiles .tile{background:${C.wash}}
.sh-top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
.files{list-style:none;margin:0 0 6px;padding:0;display:flex;flex-direction:column;gap:6px}
.files li{display:flex;gap:12px;align-items:baseline;background:${C.wash};border-radius:10px;padding:9px 14px;font-size:13.5px}
.files b{min-width:230px;font-weight:800}
.sh-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px}
.shb{background:${C.tSky};border-radius:16px;padding:12px 14px}
.shb h4{display:flex;align-items:center;gap:6px}
.tight{margin-top:auto}
/* low-ink grounds */
body.lowink .cv,body.lowink .cv-panel{background:#FFFFFF!important}
body.lowink .cv-panel{border-bottom:3px solid ${C.ink}}
body.lowink .ch{background:#FFFFFF}
body.lowink .ch h3{color:${C.ink}}
body.lowink .tg-in{background:#FFFFFF}
body.lowink .cert{background:#FFFFFF}
body.lowink .bc{background:#FFFFFF}
body.lowink .fw.li-snow{fill:#FFFFFF;stroke:${C.ink};stroke-width:1.5px}
`;
}

// ---------------------------------------------------------------- assemble
function mainPages(ctx) {
  const P = [];
  P.push({ html: cover(ctx), label: 'Cover' });
  P.push({ html: guide1(ctx), label: 'Grown-up guide 1' });
  P.push({ html: guide2(ctx), label: 'Grown-up guide 2' });
  P.push({ html: safety(ctx), label: 'Safety rules' });
  P.push({ html: pantry(ctx), label: 'What you need' });
  P.push({ html: board(ctx, false), label: 'Countdown board' });
  P.push({ html: board(ctx, true), label: 'Blank board' });
  P.push({ html: list(ctx), label: 'All 24 plays' });
  for (let i = 0; i < 24; i += 2) P.push({ html: cardPage(ctx, PLAYS[i], PLAYS[i + 1]), label: `Days ${i + 1}–${i + 2}` });
  P.push({ html: tags(ctx, 0), label: 'Tags 1–12' });
  P.push({ html: tags(ctx, 12), label: 'Tags 13–24' });
  P.push({ html: certificate(ctx), label: 'Certificate' });
  P.push({ html: answers(ctx), label: 'Good to know' });
  P.push({ html: more(ctx), label: 'More from Play Before Pixels' });
  return P;
}

const OUT = [];
const JOBS = [];
const FINISH = [];
const TOC = [['Cover', 1], ['Grown-up guide', 2], ['Safety rules', 4], ['What you need', 5], ['Countdown board', 6], ['Blank board', 7], ['All 24 plays', 8], ['Play cards, Days 1–24', 9], ['Number tags', 21], ['Certificate', 23], ['Good to know', 24], ['More from Play Before Pixels', 25]];
const META = { subject: 'A secular winter countdown of 24 screen-free plays for ages 2-5, with a talk line and safety line on every card', keywords: 'winter countdown, winter activities, toddler, preschool, printable, screen-free play' };

function build(edition, ink, size) {
  const outDir = HTML;
  const ctx = K.context({ edition, ink, size, outDir, product: PRODUCT });
  ctx.total = 25;
  const pages = mainPages(ctx);
  if (pages.length !== ctx.total) throw new Error('page count ' + pages.length);
  const html = K.doc(ctx, { title: PRODUCT, pages, extraCss: extraCss(ctx) });
  const name = `${edition}-${ink}-${size}`;
  const file = path.join(HTML, name + '.html');
  fs.writeFileSync(file, html);
  const pdfName = edition === 'etsy'
    ? `etsy-upload/${{ 'color-letter': '2-Color-US-Letter', 'color-a4': '3-Color-A4', 'lowink-letter': '4-Low-Ink-US-Letter', 'lowink-a4': '5-Low-Ink-A4' }[`${ink}-${size}`]}.pdf`
    : `${SLUG}${ink === 'lowink' ? '-low-ink' : ''}${size === 'a4' ? '-A4' : ''}.pdf`;
  const raw = path.join(__dirname, 'tmp', name + '.pdf');
  const fj = path.join(__dirname, 'tmp', name + '.fields.json');
  JOBS.push({ html: file, pdf: raw, fields: fj });
  FINISH.push({ in: raw, out: path.join(PDIR, pdfName), fields: fj, title: `${PRODUCT} (${ink === 'lowink' ? 'Low-ink' : 'Color'}, ${ctx.sizeName})`, edition, version: ctx.version, toc: TOC, ...META });
  if (edition === 'store' && size === 'letter') JOBS.push({ html: file, pages: { dir: path.join(PDIR, 'preview', ink === 'lowink' ? 'low-ink' : ''), scale: 1.5 } });
  // Etsy-edition page images (no web address) feed the listing images; the cover PNG comes from the store edition.
  if (edition === 'etsy' && size === 'letter') JOBS.push({ html: file, pages: { dir: path.join(__dirname, 'tmp', `etsy-${ink}`), scale: 1.5 } });
  if (edition === 'store' && size === 'letter' && ink === 'color') JOBS.push({ html: file, pages: { dir: path.join(__dirname, 'tmp', 'cover'), selector: 'section.page:first-of-type', scale: 1600 / 1056 } });
  if (edition === 'store' && ink === 'color' && size === 'letter') {
    // committed source: the store edition, color, US Letter, with paths relative to the product folder
    const c2 = K.context({ edition, ink, size, outDir: PDIR, product: PRODUCT });
    c2.total = 25;
    fs.writeFileSync(path.join(PDIR, 'source.html'), K.doc(c2, { title: PRODUCT, pages: mainPages(c2), extraCss: extraCss(c2) }));
  }
  OUT.push(pdfName);
}

function buildStart(edition) {
  const ctx = K.context({ edition, ink: 'color', size: 'letter', outDir: HTML, product: 'Start here' });
  const html = K.doc(ctx, { title: `${PRODUCT}: Start here`, pages: [{ html: startHere(ctx), label: 'Start here' }], extraCss: extraCss(ctx) });
  const file = path.join(HTML, `start-${edition}.html`);
  fs.writeFileSync(file, html);
  const raw = path.join(__dirname, 'tmp', `start-${edition}.pdf`);
  JOBS.push({ html: file, pdf: raw });
  FINISH.push({ in: raw, out: path.join(PDIR, edition === 'etsy' ? 'etsy-upload/1-START-HERE.pdf' : 'START-HERE.pdf'), title: `${PRODUCT}: Start here`, edition, version: ctx.version, ...META });
  JOBS.push({ html: file, pages: { dir: path.join(PDIR, 'preview', `start-here-${edition}`), scale: 1.5 } });
}

fs.mkdirSync(path.join(__dirname, 'tmp'), { recursive: true });
fs.mkdirSync(path.join(PDIR, 'etsy-upload'), { recursive: true });
for (const edition of ['store', 'etsy']) for (const ink of ['color', 'lowink']) for (const size of ['letter', 'a4']) build(edition, ink, size);
buildStart('store');
buildStart('etsy');
fs.writeFileSync(path.join(__dirname, 'tmp', 'jobs.json'), JSON.stringify(JOBS, null, 1));
fs.writeFileSync(path.join(__dirname, 'tmp', 'finish.json'), JSON.stringify(FINISH, null, 1));
console.log(`wrote ${OUT.length} editions + 2 START HERE pages; ${JOBS.length} render jobs`);

module.exports = { card, scene, PLAYS, extraCss, mainPages };
