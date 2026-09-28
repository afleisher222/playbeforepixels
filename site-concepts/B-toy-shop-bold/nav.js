/* Play Before Pixels — Concept B shared script
   Catalog · product mockups · header + mega menu · mobile menu · search · cart drawer · quick view · currency · footer
   Every overlay: focus is moved in, trapped, Escape closes, focus returns to the control that opened it.
*/
(function () {
  'use strict';
  var PBP = window.PBP = window.PBP || {};
  var IMG = 'assets/img/', ART = 'assets/art/';

  /* ------------------------------------------------------------------ data */
  PBP.bands = [
    { id: '0-1', label: '0–1', name: 'Babies', c: 'var(--tomato)', ct: 'var(--tomato-t)', art: 'kid-milo-sithold.svg' },
    { id: '1-3', label: '1–3', name: 'Toddlers', c: 'var(--sun)', ct: 'var(--sun-t)', art: 'kid-priya-sittalk.svg' },
    { id: '3-5', label: '3–5', name: 'Preschool', c: 'var(--grass)', ct: 'var(--grass-t)', art: 'kid-zara-cheer.svg' },
    { id: '5-8', label: '5–8', name: 'Early school', c: 'var(--sky)', ct: 'var(--sky-t)', art: 'kid-sam-carry.svg' },
    { id: '8-12', label: '8–12', name: 'Big kids', c: 'var(--plum)', ct: 'var(--plum-t)', art: 'kid-leo-point.svg' }
  ];
  PBP.types = [
    { id: 'board-books', label: 'Board books', group: 'books' },
    { id: 'picture-books', label: 'Picture books', group: 'books' },
    { id: 'guides', label: 'Guides', group: 'books' },
    { id: 'gift-sets', label: 'Gift sets' },
    { id: 'printables', label: 'Printables' },
    { id: 'cards', label: 'Card deck' },
    { id: 'classroom', label: 'Classroom' },
    { id: 'group-kits', label: 'Group kits' },
    { id: 'course', label: 'Course' },
    { id: 'merch', label: 'Merch' }
  ];
  PBP.catalog = [
    { id: 'up-go-more', title: 'Up! Go! More!', sub: '14 first words to say, sign and play together', type: 'board-books', bands: ['0-1', '1-3'], ages: '0–3',
      url: 'product.html', g: 'var(--sky)', badge: 'New', mock: { k: 'board', src: 'up-go-more-cover.png' },
      formats: [
        { id: 'board', label: 'Board book', price: 12.99, note: '18 sturdy pages · 6 × 6 in' },
        { id: 'cards', label: 'Board book + printable word cards', price: 17.99, note: 'Adds 28 picture cards as an instant PDF' },
        { id: 'trio', label: 'Baby-shower trio', price: 34.99, was: 38.97, note: 'Three books and three gift notes' }
      ],
      blurb: 'One everyday word per page, one big picture, and a short Grown-up corner tip that turns reading into a back-and-forth.',
      bullets: ['hi, up, down, go, stop, ball, uh-oh, more… 14 real first words', 'A Grown-up corner talk idea on every page', 'Rounded corners, no detachable parts'],
      tags: 'baby toddler first words board book gift shower' },
    { id: 'tablet-slept', title: 'The Day the Tablet Slept', sub: 'A funny read-aloud about a day full of play', type: 'picture-books', bands: ['3-5', '5-8'], ages: '3–7',
      g: 'var(--sun)', mock: { k: 'pb', src: 'tablet-slept-cover.png' },
      formats: [{ id: 'pb', label: 'Paperback', price: 11.99, note: '32 pages · 8.5 × 8.5 in' }, { id: 'hc', label: 'Hardcover', price: 17.99, note: '32 pages · 8.5 × 8.5 in' }],
      blurb: 'The family tablet takes a nap, nightcap and all. So Ada builds, splashes, blasts off and bakes. Ends with a Talk about it page for grown-ups.',
      bullets: ['12 full-bleed spreads', 'Talk about it questions at the back', 'Printed to order'], tags: 'picture book read aloud story bedtime' },
    { id: 'first-library', title: 'The First Library', sub: 'Board book, read-aloud and printables in one gift', type: 'gift-sets', bands: ['1-3', '3-5'], ages: '1–5',
      g: 'var(--grass)', badge: 'Save $6.99', mock: { k: 'set' },
      formats: [{ id: 'set', label: 'Gift set', price: 29.99, was: 36.98, note: 'Up! Go! More! + The Day the Tablet Slept (paperback) + Talk & Play Printables' }],
      blurb: 'Our two books and the 0–5 printable bundle, together. The printables arrive by email straight away; the books follow from the printer.',
      bullets: ['Up! Go! More! board book', 'The Day the Tablet Slept, paperback', 'Talk & Play Printables, 0–5 (PDF)'], tags: 'gift set bundle birthday present' },
    { id: 'shower-set', title: 'Baby-Shower Trio', sub: 'Three copies of Up! Go! More! and three gift notes', type: 'gift-sets', bands: ['0-1', '1-3'], ages: '0–3',
      g: 'var(--plum-t)', badge: 'Save $3.98', mock: { k: 'trio' },
      formats: [{ id: 'trio', label: 'Three books + three notes', price: 34.99, was: 38.97, note: 'Shipped to one address' }],
      blurb: 'One for the parents, one for the grandparents, one for the car. Each comes with a small card explaining the Grown-up corner.',
      bullets: ['3 × Up! Go! More! board book', '3 fold-over gift notes', 'Shipped together to one address'], tags: 'baby shower gift new baby present' },
    { id: 'plays-100', title: '100 Plays Before Pixels', sub: 'The grown-up guide: 100 screen-free plays for 0–5', type: 'guides', bands: ['0-1', '1-3', '3-5'], ages: '0–5',
      g: 'var(--sun-t)', mock: { k: 'guide' },
      formats: [{ id: 'pb', label: 'Paperback', price: 19.99, note: '8 × 10 in · printed to order' }, { id: 'pdf', label: 'Printable PDF', price: 14, note: 'US Letter and A4 · instant download', digital: true }],
      blurb: 'One hundred plays sorted by age and by how much time you have, each with what to say, what to notice, and a safety line.',
      bullets: ['Sorted by age and by minutes available', 'A safety note on every play', 'Uses things you already have'], tags: 'activities ideas guide parents play' },
    { id: 'printables-0-5', title: 'Talk & Play Printables, 0–5', sub: 'Picture cards, routine charts and a 4-week play planner', type: 'printables', bands: ['0-1', '1-3', '3-5'], ages: '0–5',
      g: 'var(--tomato)', badge: 'Instant download', mock: { k: 'sheets', a: 'ugm' },
      formats: [{ id: 'pdf', label: 'PDF · US Letter + A4', price: 12, note: '62 pages · emailed after checkout', digital: true }],
      blurb: 'First-word picture cards from the board book, a morning-to-bedtime routine chart and a four-week play planner. Print what you need, as often as you like at home.',
      bullets: ['28 first-word picture cards', 'Routine charts for 6 moments of the day', '4-week play planner'], tags: 'printable pdf download cards chart planner' },
    { id: 'printables-5-12', title: 'Paper Play Pack, 5–12', sub: 'Puzzles, story starters, a boredom menu and a family screen plan', type: 'printables', bands: ['5-8', '8-12'], ages: '5–12',
      g: 'var(--sky-t)', badge: 'Instant download', mock: { k: 'sheets', a: 'ts' },
      formats: [{ id: 'pdf', label: 'PDF · US Letter + A4', price: 16, note: '48 pages · emailed after checkout', digital: true }],
      blurb: 'For school-age kids who say “I’m bored” at 4:15 pm. Pencil puzzles, story starters, a boredom menu to pin on the fridge and a family screen plan you fill in together.',
      bullets: ['20 pencil puzzles and mazes', '12 story starters', 'Boredom menu + family screen plan'], tags: 'printable pdf puzzles school age boredom' },
    { id: 'week-planner', title: 'Screen-Light Week Planner', sub: 'A one-page plan for the whole family’s week', type: 'printables', bands: ['3-5', '5-8', '8-12'], ages: '3–12',
      g: 'var(--grass-t)', mock: { k: 'planner' },
      formats: [{ id: 'pdf', label: 'PDF · US Letter + A4', price: 9, note: '6 pages · emailed after checkout', digital: true }],
      blurb: 'A fridge-door planner with a slot for every afternoon, a “when screens are on” box, and a Sunday reset checklist.',
      bullets: ['Weekly and daily versions', 'Fill-in family agreement', 'Colour and ink-saver editions'], tags: 'printable planner family week schedule' },
    { id: 'talk-back-cards', title: 'Talk-Back Cards', sub: '52 conversation cards for the car, the bath and the dinner table', type: 'cards', bands: ['3-5', '5-8', '8-12'], ages: '3–10',
      g: 'var(--plum)', mock: { k: 'cards' },
      formats: [{ id: 'deck', label: 'Card deck', price: 18.99, note: '52 poker-size cards in a tuck box' }],
      blurb: 'Silly questions, would-you-rathers and “tell me about” prompts sorted into four colours by age, so everyone at the table gets a turn.',
      bullets: ['52 cards in four age colours', 'Poker size, fits a glovebox', 'Printed to order'], tags: 'cards deck conversation game questions' },
    { id: 'classroom-pack', title: 'PreK–5 Classroom Pack', sub: 'Talk-rich routines, paper activities and family letters', type: 'classroom', bands: ['3-5', '5-8', '8-12'], ages: 'PreK–5',
      g: 'var(--sky)', badge: 'Site license', mock: { k: 'pack' },
      formats: [{ id: 'room', label: 'One classroom', price: 19, note: 'One teacher, one classroom', digital: true }, { id: 'site', label: 'Whole-school site license', price: 39, note: 'Every teacher in one school building', digital: true }],
      blurb: '40 short routines for morning meeting, transitions and read-aloud time, 60 printable paper activities, and family letters in plain words. Delivered by email as a license-stamped PDF.',
      bullets: ['40 talk-rich routines by grade band', '60 printable paper activities', 'Pay by card or purchase order'], tags: 'teacher classroom school license prek kindergarten' },
    { id: 'group-kit', title: 'Talk, Play & Screens Evening', sub: 'A host-it-yourself kit for PTAs and parent groups', type: 'group-kits', bands: [], ages: 'For groups',
      g: 'var(--sun-t)', mock: { k: 'kit', h: 'Talk, play & screens' },
      formats: [{ id: 'lic', label: 'One-group license', price: 49, note: 'Slides, speaker script, handouts and a flyer', digital: true }],
      blurb: 'Everything one of your own members needs to run a 60-minute evening: 24 slides, a word-for-word speaker script, take-home handouts and a flyer you can edit.',
      bullets: ['24 slides + speaker script', 'Handouts in English and large print', 'Presented by your own member'], tags: 'pta parent group workshop evening kit license' },
    { id: 'staff-kit', title: 'Paper & Talk in the Classroom', sub: 'A host-it-yourself staff-meeting kit for teacher groups', type: 'group-kits', bands: [], ages: 'For groups',
      g: 'var(--grass-t)', mock: { k: 'kit', h: 'Paper & talk in the classroom' },
      formats: [{ id: 'lic', label: 'One-school license', price: 69, note: '45-minute session, slides, script and planning sheets', digital: true }],
      blurb: 'A 45-minute session a teacher-leader can run at a staff meeting, with planning sheets for trying one paper-and-talk routine for two weeks.',
      bullets: ['45-minute session, ready to present', 'Two-week try-it planning sheets', 'Research page with sources'], tags: 'teacher staff meeting professional kit school' },
    { id: 'course', title: 'The 30-Day Screen Reset', sub: 'A written course: one short lesson a day', type: 'course', bands: ['0-1', '1-3', '3-5', '5-8', '8-12'], ages: 'Families 0–12',
      g: 'var(--tomato-t)', mock: { k: 'course' },
      formats: [{ id: 'course', label: 'Written course', price: 39, note: '30 lessons by email + printable tracker', digital: true }],
      blurb: 'Thirty five-minute reads, one a day, with a printable tracker. No videos to watch, no live calls, no group to join. Read it at the kitchen table.',
      bullets: ['30 written lessons, one per day', 'Printable tracker and family plan', 'Keep it forever'], tags: 'course lessons reset family plan' },
    { id: 'tee', title: '“More talk, less tap” tee', sub: 'Adult unisex tee, organic cotton', type: 'merch', bands: [], ages: 'Grown-ups',
      g: 'var(--ink)', mock: { k: 'tee' },
      formats: [{ id: 'tee', label: 'Adult tee · S–3XL', price: 28, note: 'Made to order by our print partner' }],
      blurb: 'Sun-yellow, heavyweight and soft. Printed when you order, so there is never a pile of unsold shirts.', bullets: ['Unisex fit, S–3XL', 'Water-based ink', 'Made to order'], tags: 'tshirt tee shirt merch apparel' },
    { id: 'tote', title: '“Laps not apps” tote', sub: 'Library-sized canvas tote', type: 'merch', bands: [], ages: 'Grown-ups',
      g: 'var(--tomato)', mock: { k: 'tote' },
      formats: [{ id: 'tote', label: 'Canvas tote', price: 24, note: 'Fits a stack of picture books' }],
      blurb: 'A sturdy tote sized for the weekly library run. Made to order.', bullets: ['Heavy cotton canvas', 'Long handles', 'Made to order'], tags: 'tote bag merch library' }
  ];
  PBP.byId = function (id) { for (var i = 0; i < PBP.catalog.length; i++) if (PBP.catalog[i].id === id) return PBP.catalog[i]; return null; };
  PBP.typeLabel = function (id) { for (var i = 0; i < PBP.types.length; i++) if (PBP.types[i].id === id) return PBP.types[i].label; return id; };
  PBP.countBand = function (b) { return PBP.catalog.filter(function (p) { return p.bands.indexOf(b) > -1; }).length; };
  PBP.countType = function (t) { return PBP.catalog.filter(function (p) { return p.type === t; }).length; };
  PBP.minPrice = function (p) { return Math.min.apply(null, p.formats.map(function (f) { return f.price; })); };

  /* ------------------------------------------------------------------ helpers */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var mem = {};
  function sget(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return k in mem ? mem[k] : d; } }
  function sset(k, v) { mem[k] = v; try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  PBP.$ = $; PBP.$$ = $$; PBP.esc = esc;

  var ICON = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 8h15l-1.2 12.5H5.7z"/><path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" stroke-linecap="round"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M3.5 7h17M3.5 12h17M3.5 17h11"/></svg>',
    x: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M3 3l10 10M13 3 3 13"/></svg>',
    car: '<svg class="car" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3.5 5 6.5 8 3.5"/></svg>',
    plus: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M8 2v12M2 8h12"/></svg>'
  };
  PBP.ICON = ICON;

  /* ------------------------------------------------------------------ currency */
  var RATES = { USD: 1, CAD: 1.37, GBP: 0.75, EUR: 0.86, AUD: 1.52 };
  PBP.cur = sget('pbp-cur', 'USD'); if (!RATES[PBP.cur]) PBP.cur = 'USD';
  PBP.money = function (usd) {
    var c = PBP.cur, v = usd * RATES[c];
    var s = new Intl.NumberFormat('en-US', { style: 'currency', currency: c, currencyDisplay: c === 'USD' ? 'symbol' : 'narrowSymbol', minimumFractionDigits: v % 1 ? 2 : 0 }).format(c === 'USD' ? v : Math.round(v * 100) / 100);
    if (c !== 'USD') s = '≈ ' + s.replace(/\.(\d)$/, '.$10');
    return s;
  };
  function paintPrices(root) { $$('[data-usd]', root).forEach(function (el) { el.textContent = PBP.money(+el.getAttribute('data-usd')); }); }
  PBP.paintPrices = paintPrices;
  function curSelect(id) {
    return '<select class="sel" id="' + id + '" data-cur aria-label="Currency">' + Object.keys(RATES).map(function (c) { return '<option value="' + c + '"' + (c === PBP.cur ? ' selected' : '') + '>' + c + '</option>'; }).join('') + '</select>';
  }
  function setCur(c) {
    PBP.cur = c; sset('pbp-cur', c);
    $$('[data-cur]').forEach(function (s) { s.value = c; });
    paintPrices(document); renderCart();
    $$('[data-cur-note]').forEach(function (n) { n.hidden = c === 'USD'; });
    announce('Prices shown in ' + c + (c === 'USD' ? '' : ', estimated'));
  }

  /* ------------------------------------------------------------------ mockups */
  var PROMPTS = [
    { c: 'var(--sun)', p: 'What would a dog say about your socks?', t: 'Ages 3–5' },
    { c: 'var(--paper)', p: 'Best part of today? You first, then me.', t: 'Everyone' },
    { c: 'var(--grass-t)', p: 'Would you rather have a tail or wings?', t: 'Ages 5–8' }
  ];
  function img(src, cls) { return '<img src="' + IMG + src + '" alt=""' + (cls ? ' class="' + cls + '"' : '') + '>'; }
  PBP.mock = function (p) {
    var m = p.mock, k = m.k;
    if (k === 'board') return '<div class="mock book book--board">' + img(m.src) + '</div>';
    if (k === 'pb') return '<div class="mock book book--pb">' + img(m.src) + '</div>';
    if (k === 'set') return '<div class="mock set"><div class="book book--pb s2">' + img('tablet-slept-cover.png') + '</div><div class="book book--board s1">' + img('up-go-more-cover.png') + '</div>' +
      '<div class="sheet s3" style="transform:rotate(-2deg)"><h4>Talk &amp; Play Printables</h4><div class="grid">' + img('ugm-p08.png') + img('ugm-p10.png') + '</div><div class="foot"><span>0–5</span><span>PDF</span></div></div><span class="tag">Save<br>$6.99</span></div>';
    if (k === 'trio') return '<div class="mock set set--trio"><div class="book book--board s1">' + img('up-go-more-cover.png') + '</div><div class="book book--board s2">' + img('up-go-more-cover.png') + '</div><div class="book book--board s3">' + img('up-go-more-cover.png') + '</div></div>';
    if (k === 'guide') return '<div class="mock cover cover--guide"><h4>100 Plays <em>Before</em> Pixels</h4><p>Screen-free play for ages 0–5, sorted by how much time you have</p><img src="' + ART + 'kids-cheer.svg" alt=""><span class="brand">Play Before Pixels</span></div>';
    if (k === 'sheets') {
      var a = m.a === 'ts'
        ? ['ts-p10.png', 'ts-p11.png', 'ts-p19.png', 'ts-p06.png']
        : ['ugm-p03.png', 'ugm-p08.png', 'ugm-p12.png', 'ugm-p14.png'];
      var t = m.a === 'ts' ? 'Story starters' : 'First-word cards';
      return '<div class="mock sheets"><div class="sheet sh1"><h4>' + (m.a === 'ts' ? 'Boredom menu' : 'Our day, in words') + '</h4><div class="lines" style="--c:' + (m.a === 'ts' ? 'var(--plum-t)' : 'var(--sun-t)') + '"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="foot"><span>Play Before Pixels</span><span>p. 2</span></div></div>' +
        '<div class="sheet sh2"><h4>' + t + '</h4><div class="grid">' + a.map(function (s) { return img(s); }).join('') + '</div><div class="foot"><span>Print · cut · play</span><span>p. 7</span></div></div></div>';
    }
    if (k === 'planner') {
      var cells = ''; for (var i = 1; i <= 15; i++) cells += '<i' + ([1, 2, 4, 5, 6, 9, 11].indexOf(i) > -1 ? ' class="on"' : '') + '>' + ['M', 'T', 'W', 'T', 'F'][(i - 1) % 5] + '</i>';
      return '<div class="mock sheets" style="width:56cqmin"><div class="sheet sh2" style="width:52cqmin;left:2cqmin;right:auto;transform:rotate(-3deg)"><h4>This week, on paper</h4><div class="cal">' + cells + '</div><div class="lines" style="--c:var(--grass-t)"><i></i><i></i></div></div></div>';
    }
    if (k === 'cards') return '<div class="mock cards">' + PROMPTS.map(function (q, i) { return '<div class="card c' + (i + 1) + '" style="--c:' + q.c + '"><span>Talk-Back</span><p>' + q.p + '</p><span>' + q.t + '</span></div>'; }).join('') + '</div>';
    if (k === 'pack') return '<div class="mock cover cover--pack"><h4>PreK–5 Classroom Pack</h4><p>Talk-rich routines and paper activities</p><span class="stamp">Site license<br>Your school</span><img src="' + ART + 'circle-time.svg" alt=""></div>';
    if (k === 'kit') return '<div class="mock kit"><div class="slide"><h4>' + esc(m.h) + '</h4><img src="' + ART + (m.h.indexOf('class') > -1 ? 'teacher-point.svg' : 'kids-cheer.svg') + '" alt=""></div><div class="sheet"><h4>Speaker script</h4><div class="lines"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div></div>';
    if (k === 'course') {
      var c2 = ''; for (var j = 1; j <= 30; j++) c2 += '<i' + (j < 12 ? ' class="on"' : '') + '>' + j + '</i>';
      return '<div class="mock course"><div class="sheet sh1"><span class="big30">30</span><h4>Day Screen Reset</h4><div class="lines" style="--c:var(--tomato-t)"><i></i><i></i><i></i></div></div><div class="sheet sh2"><h4>My tracker</h4><div class="cal" style="grid-template-columns:repeat(6,1fr)">' + c2 + '</div><div class="foot"><span>Day 12</span><span>Keep going</span></div></div></div>';
    }
    if (k === 'tee') return '<div class="mock"><svg class="garment" viewBox="0 0 300 300" aria-hidden="true"><path d="M104 36 60 52 18 104l36 30 22-18v152h148V116l22 18 36-30-42-52-44-16c-6 18-24 28-46 28s-40-10-46-28Z" fill="#F5B820"/><path d="M104 36c6 18 24 28 46 28s40-10 46-28" fill="none" stroke="#E0A512" stroke-width="6"/><text x="150" y="148" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="27" fill="#1D2940" letter-spacing="-1">more talk,</text><text x="150" y="176" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="27" fill="#1D2940" letter-spacing="-1">less tap.</text></svg></div>';
    if (k === 'tote') return '<div class="mock"><svg class="garment" viewBox="0 0 300 300" aria-hidden="true"><path d="M104 118V70a46 46 0 0 1 92 0v48" fill="none" stroke="#EFE7D6" stroke-width="12"/><path d="M62 112h176l-8 170H70Z" fill="#F7F1E4"/><text x="150" y="196" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="36" fill="#1D2940" letter-spacing="-1.5">laps</text><text x="150" y="232" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="36" fill="#EE5A36" letter-spacing="-1.5">not apps</text></svg></div>';
    return '';
  };
  PBP.stage = function (p) { return '<div class="stage">' + PBP.mock(p) + '</div>'; };
  PBP.href = function (p) { return p.url || ('shop.html#p=' + p.id); };
  PBP.tile = function (p, opts) {
    opts = opts || {};
    var f0 = p.formats[0], was = f0.was ? '<s data-usd="' + f0.was + '">$' + f0.was + '</s>' : '';
    var from = p.formats.length > 1 ? '<span class="vh">from </span>' : '';
    return '<a class="ptile" href="' + PBP.href(p) + '"' + (p.url ? '' : ' data-qv="' + p.id + '"') + '>' +
      '<div class="ptile-media" style="--g:' + p.g + '">' + (p.badge ? '<span class="ptile-badge"><span class="chip">' + esc(p.badge) + '</span></span>' : '') + PBP.stage(p) + '</div>' +
      '<div class="ptile-info"><h3>' + esc(p.title) + '</h3><p class="pr num">' + from + '<span data-usd="' + PBP.minPrice(p) + '">$' + PBP.minPrice(p) + '</span>' + was + '</p>' +
      '<p class="meta">' + esc(PBP.typeLabel(p.type)) + ' · ' + esc(p.ages) + '</p></div></a>';
  };
  PBP.mscale = function (p) {
    return '<div class="mscale" aria-label="Age bands: ' + (p.bands.length ? p.bands.map(function (b) { return b.replace('-', ' to '); }).join(', ') : 'for grown-ups') + '"><div class="mscale-bar" aria-hidden="true">' +
      PBP.bands.map(function (b) { return '<span class="' + (p.bands.indexOf(b.id) > -1 ? 'on' : '') + '" style="--c:' + b.c + '"></span>'; }).join('') + '</div><div class="mscale-lab" aria-hidden="true">' +
      PBP.bands.map(function (b) { return '<span class="' + (p.bands.indexOf(b.id) > -1 ? 'on' : '') + '">' + b.label + '</span>'; }).join('') + '</div></div>';
  };

  /* ------------------------------------------------------------------ live region */
  var live;
  function announce(msg) { if (!live) return; live.textContent = ''; setTimeout(function () { live.textContent = msg; }, 30); }
  PBP.announce = announce;

  /* ------------------------------------------------------------------ header */
  var page = document.body.getAttribute('data-page') || '';
  function bandLinks(cls) {
    return PBP.bands.map(function (b) {
      return '<a class="' + cls + '" href="shop.html#age=' + b.id + '" style="--c:' + b.c + ';--ct:' + b.ct + '"><b>' + b.label + '</b>' + (cls === 'mega-age' ? '<span>' + b.name + '</span><em>' + PBP.countBand(b.id) + ' items</em>' : '<span class="vh"> years, ' + b.name + '</span>') + '</a>';
    }).join('');
  }
  function typeLinks() { return PBP.types.map(function (t) { return '<li><a href="shop.html#type=' + t.id + '">' + t.label + '<span>' + PBP.countType(t.id) + '</span></a></li>'; }).join(''); }
  function li(href, label, meta, extra) { return '<li><a href="' + href + '"' + (extra || '') + '>' + label + (meta ? '<span>' + meta + '</span>' : '') + '</a></li>'; }

  var NAV = [
    { id: 'shop', label: 'Shop', pages: ['shop'] },
    { id: 'books', label: 'Books', pages: ['product'] },
    { id: 'teach', label: 'For Teachers &amp; Groups', pages: [] },
    { id: 'research', label: 'Research', pages: ['research'] },
    { id: 'about', label: 'About', href: 'about.html', pages: ['about'] }
  ];
  var BOOKS_LIST = li('shop.html#type=board-books', 'Board books', 'Ages 0–3') + li('shop.html#type=picture-books', 'Picture books', 'Ages 3–7') + li('shop.html#type=guides', 'Guides for grown-ups', '0–5') + li('shop.html#type=gift-sets', 'Gift sets', 'Save up to $6.99');
  var TEACH_A = li('shop.html#p=classroom-pack', 'PreK–5 Classroom Pack', 'from $19', ' data-qv="classroom-pack"') + li('shop.html#p=talk-back-cards', 'Talk-Back Cards', '$18.99', ' data-qv="talk-back-cards"') + li('about.html#licenses', 'How site licenses work', '');
  var TEACH_B = li('shop.html#p=group-kit', 'Evening kit for PTAs', '$49', ' data-qv="group-kit"') + li('shop.html#p=staff-kit', 'Staff-meeting kit', '$69', ' data-qv="staff-kit"') + li('about.html#quote', 'Request a quote or pay by PO', '');
  var RES_A = li('research.html', 'Start here', '') + li('research.html#studies', 'What the studies say', '8 sources') + li('research.html#guidelines', 'Guidelines at a glance', 'WHO · AAP') + li('research.html#not', 'What this is not', '');
  var RES_B = li('research.html#briefs', 'Free one-page briefs', '3 PDFs') + li('research.html#sources', 'Full source list', '') + li('research.html#doctor', 'Questions for your child’s doctor', '');

  function megaHTML() {
    var ugm = PBP.byId('up-go-more'), fl = PBP.byId('first-library');
    return '' +
      '<div class="mega mega--shop" id="mm-shop" data-mega>' +
        '<div class="mega-in"><div><h2>Shop by age</h2><div class="mega-ages">' + bandLinks('mega-age') + '</div></div>' +
        '<div><h2>Shop by type</h2><ul class="mega-types">' + typeLinks() + '</ul><p class="mega-all"><a class="arrow-link" href="shop.html">Shop all ' + PBP.catalog.length + ' products <span aria-hidden="true">→</span></a></p>' +
        '<p class="mega-note">Printables arrive by email a minute after checkout. Books, cards and merch are printed when you order.</p></div>' +
        '<a class="mega-feat" href="shop.html#p=first-library" data-qv="first-library"><div class="stage">' + PBP.mock(fl) + '</div><div><p class="label">Gift set · ages 1–5</p><h3>The First Library</h3><p class="num"><span data-usd="29.99">$29.99</span> <s class="muted" data-usd="36.98">$36.98</s></p></div></a></div></div>' +
      '<div class="mega mega--sm" id="mm-books" data-mega><div class="mega-in"><div><h2>Books by format</h2><ul class="mega-list">' + BOOKS_LIST + '</ul></div>' +
        '<div><h2>Our books</h2><ul class="mega-list">' + li('product.html', 'Up! Go! More!', 'Board book · 0–3') + li('shop.html#p=tablet-slept', 'The Day the Tablet Slept', 'Picture book · 3–7', ' data-qv="tablet-slept"') + li('shop.html#p=plays-100', '100 Plays Before Pixels', 'Guide · 0–5', ' data-qv="plays-100"') + '</ul></div>' +
        '<a class="mega-feat" href="product.html" style="background:var(--sky)"><div class="stage">' + PBP.mock(ugm) + '</div><div><p class="label" style="color:#fff">New board book</p><h3 style="color:#fff">Up! Go! More!</h3><p style="color:#fff" class="num"><span data-usd="12.99">$12.99</span> · ages 0–3</p></div></a></div></div>' +
      '<div class="mega mega--sm" id="mm-teach" data-mega><div class="mega-in"><div><h2>For classrooms</h2><ul class="mega-list">' + TEACH_A + '</ul></div><div><h2>For PTAs &amp; groups</h2><ul class="mega-list">' + TEACH_B + '</ul></div>' +
        '<a class="mega-feat" href="shop.html#p=classroom-pack" data-qv="classroom-pack" style="background:var(--grass-t)"><div class="stage"><img src="' + ART + 'circle-time.svg" alt="" style="width:88%"></div><div><p class="label">Whole-school site license</p><h3>One price, every classroom</h3><p class="num"><span data-usd="39">$39</span> · delivered by email</p></div></a></div></div>' +
      '<div class="mega mega--sm" id="mm-research" data-mega><div class="mega-in"><div><h2>The Virtual Autism Project</h2><ul class="mega-list">' + RES_A + '</ul></div><div><h2>Read and share</h2><ul class="mega-list">' + RES_B + '</ul></div>' +
        '<div class="mega-feat" style="background:var(--wash);min-height:0;align-content:start"><p class="label muted" style="margin-bottom:10px">How we write about this</p><p style="font-weight:600;font-size:15.5px;line-height:1.5">“Virtual autism” is a term some clinicians use. It is not a medical diagnosis. We report what studies found, including their limits, and never present an association as a cause.</p></div></div></div>';
  }

  function headerHTML() {
    var items = NAV.map(function (n) {
      var cur = n.pages.indexOf(page) > -1;
      if (n.href) return '<li><a class="pnav-top" href="' + n.href + '"' + (cur ? ' aria-current="page"' : '') + '>' + n.label + '</a></li>';
      return '<li><button class="pnav-top' + (cur ? ' is-current' : '') + '" type="button" aria-expanded="false" aria-controls="mm-' + n.id + '" data-mega-btn>' + n.label + ICON.car + '</button></li>';
    }).join('');
    return '<div class="util on-dark"><div class="wrap"><p><span>Printables arrive by email a minute after checkout</span><span>Books printed to order, shipped worldwide</span><span>Schools can pay by purchase order</span></p>' +
      '<div class="util-r"><a href="about.html#contact">Help &amp; contact</a><label><span class="vh">Currency</span>' + curSelect('cur-util') + '</label></div></div></div>' +
      '<header class="hdr" id="hdr"><div class="wrap hdr-in">' +
      '<button class="ibtn menu-btn" type="button" aria-expanded="false" aria-controls="mnav" data-open="mnav">' + ICON.menu + '<span class="vh">Menu</span></button>' +
      '<a class="logo" href="index.html" aria-label="Play Before Pixels, home"><b>Play Before Pixels</b></a>' +
      '<nav class="pnav" aria-label="Main"><ul>' + items + '</ul></nav>' +
      '<div class="hdr-act"><button class="ibtn search-btn" type="button" aria-expanded="false" aria-controls="search" data-open="search">' + ICON.search + '<span class="lbl">Search</span></button>' +
      '<button class="ibtn cart-btn" type="button" aria-expanded="false" aria-controls="cart" data-open="cart">' + ICON.bag + '<span class="lbl">Cart</span><span class="cart-count num" data-n="0" data-cart-count>0</span><span class="vh" data-cart-sr>, 0 items</span></button></div>' +
      '</div>' + megaHTML() + '</header><div class="nav-scrim" data-nav-scrim></div>';
  }

  function mnavHTML() {
    function acc(id, title, body) {
      return '<li><button class="acc-btn" type="button" aria-expanded="false" aria-controls="acc-' + id + '">' + title + ICON.plus + '</button><div class="acc-panel" id="acc-' + id + '" hidden>' + body + '</div></li>';
    }
    return '<div class="layer mnav" id="mnav" role="dialog" aria-modal="true" aria-label="Menu" data-layer>' +
      '<div class="layer-hd"><a class="logo" href="index.html">Play Before Pixels</a><button class="xbtn" type="button" data-close>' + ICON.x + '<span class="vh">Close menu</span></button></div>' +
      '<div class="layer-bd"><form class="mnav-search" action="shop.html" role="search" data-search-form><label class="field"><span class="vh">Search the shop</span>' + ICON.search + '<input type="search" name="q" placeholder="Search books, printables, kits" autocomplete="off"></label></form>' +
      '<ul class="acc">' +
        acc('shop', 'Shop', '<h3>By age</h3><div class="age-chips">' + bandLinks('age-chip') + '</div><h3>By type</h3><ul>' + typeLinks() + li('shop.html', '<strong>Shop all ' + PBP.catalog.length + ' products</strong>', '') + '</ul>') +
        acc('books', 'Books', '<ul>' + li('product.html', 'Up! Go! More!', 'Board book · 0–3') + BOOKS_LIST + '</ul>') +
        acc('teach', 'For Teachers &amp; Groups', '<h3>Classrooms</h3><ul>' + TEACH_A + '</ul><h3>PTAs &amp; groups</h3><ul>' + TEACH_B + '</ul>') +
        acc('research', 'Research', '<ul>' + RES_A + RES_B + '</ul>') +
        '<li><a class="acc-link" href="about.html"' + (page === 'about' ? ' aria-current="page"' : '') + '>About</a></li>' +
      '</ul></div>' +
      '<div class="mnav-ft"><div class="row"><a class="tlink" href="about.html#contact">Help &amp; contact</a><a class="tlink" href="about.html#shipping">Shipping</a><a class="tlink" href="about.html#returns">Returns</a></div>' +
      '<div class="row"><label>Currency ' + curSelect('cur-mnav') + '</label><label>Language <select class="sel" aria-label="Language"><option selected>English</option><option disabled>Español (in preparation)</option></select></label></div></div></div>';
  }

  function layersHTML() {
    return '<div class="layer-scrim" data-layer-scrim></div>' + mnavHTML() +
      '<aside class="layer drawer on-sun" id="cart" role="dialog" aria-modal="true" aria-labelledby="cart-h" data-layer>' +
        '<div class="layer-hd"><h2 id="cart-h">Your cart</h2><button class="xbtn" type="button" data-close>' + ICON.x + '<span class="vh">Close cart</span></button></div>' +
        '<div class="layer-bd" data-cart-body></div><div class="cart-ft" data-cart-ft></div></aside>' +
      '<div class="layer search" id="search" role="dialog" aria-modal="true" aria-label="Search" data-layer><div class="search-in">' +
        '<form class="search-top" action="shop.html" role="search" data-search-form><label class="field"><span class="vh">Search the shop</span>' + ICON.search +
        '<input type="search" name="q" placeholder="Try “board book”, “5–8” or “license”" autocomplete="off" data-search-input aria-controls="sres"></label>' +
        '<button class="xbtn" type="button" data-close>' + ICON.x + '<span class="vh">Close search</span></button></form>' +
        '<div class="search-sugg" data-sugg><span class="label muted">Popular</span><a href="shop.html#age=1-3">Toddlers 1–3</a><a href="shop.html#type=printables">Printables</a><a href="shop.html#type=gift-sets">Gift sets</a><a href="shop.html#p=classroom-pack" data-qv="classroom-pack">Classroom license</a><a href="research.html">Research</a></div>' +
        '<ul class="sres" id="sres" data-sres aria-live="polite"></ul></div></div>' +
      '<div class="layer qv" id="qv" role="dialog" aria-modal="true" aria-labelledby="qv-h" data-layer><button class="xbtn" type="button" data-close>' + ICON.x + '<span class="vh">Close quick view</span></button><div class="layer-bd" data-qv-body></div></div>' +
      '<div class="vh" role="status" aria-live="polite" data-live></div>';
  }

  function footerHTML() {
    var L = window.PBP_LINKS || {};
    var SOCIAL = [['instagram', 'Instagram'], ['pinterest', 'Pinterest'], ['facebook', 'Facebook'], ['tiktok', 'TikTok'], ['youtube', 'YouTube'], ['threads', 'Threads'], ['x', 'X'], ['linkedin', 'LinkedIn'], ['substack', 'Substack']];
    var STORES = [['etsy', 'Etsy'], ['tpt', 'Teachers Pay Teachers'], ['amazon_author', 'Amazon'], ['bookshop', 'Bookshop.org'], ['faire', 'Faire (retailers)']];
    function row(list) { return list.filter(function (s) { return typeof L[s[0]] === 'string' && /^https:\/\//.test(L[s[0]].trim()); }).map(function (s) { return '<a href="' + esc(L[s[0]].trim()) + '" rel="noopener" target="_blank">' + s[1] + '<span class="vh"> (opens in a new tab)</span></a>'; }).join(''); }
    var soc = row(SOCIAL), st = row(STORES);
    var pay = (window.PBP_PAYMENTS || []).filter(Boolean);
    return '<footer class="ft on-dark" id="footer"><div class="wrap">' +
      '<div class="ft-top"><div class="ft-brand"><a class="logo" href="index.html">Play Before Pixels</a><p>Talk-along books, paper play and classroom kits for ages 0–12. Founded by a parent and educator. Made to be read out loud.</p></div>' +
      '<nav aria-label="Shop"><h2>Shop</h2><ul>' + PBP.bands.map(function (b) { return '<li><a href="shop.html#age=' + b.id + '">Ages ' + b.label + '</a></li>'; }).join('') + '<li><a href="shop.html#type=gift-sets">Gift sets</a></li><li><a href="shop.html">Shop all</a></li></ul></nav>' +
      '<nav aria-label="Teachers and groups"><h2>Teachers &amp; groups</h2><ul><li><a href="shop.html#type=classroom">Classroom Pack</a></li><li><a href="about.html#licenses">Site licenses</a></li><li><a href="shop.html#type=group-kits">Host-it-yourself kits</a></li><li><a href="about.html#quote">Quotes &amp; purchase orders</a></li><li><a href="research.html">Research</a></li></ul></nav>' +
      '<nav aria-label="Help"><h2>Help</h2><ul><li><a href="about.html#contact">Contact us</a></li><li><a href="about.html#faq">FAQ</a></li><li><a href="about.html#shipping">Shipping</a></li><li><a href="about.html#returns">Returns &amp; refunds</a></li><li><a href="about.html">About</a></li></ul></nav>' +
      '<nav aria-label="Legal"><h2>Legal</h2><ul><li><a href="about.html#privacy">Privacy</a></li><li><a href="about.html#terms">Terms of use</a></li><li><a href="about.html#accessibility">Accessibility</a></li><li><a href="about.html#disclaimer">Educational disclaimer</a></li><li><a href="about.html#affiliates">Affiliate disclosure</a></li></ul></nav></div>' +
      '<div class="ft-mid"><div class="grp"><label>Language <select class="sel" aria-label="Language"><option selected>English</option><option disabled>Español (in preparation)</option></select></label><label>Currency ' + curSelect('cur-ft') + '</label>' +
      '<span class="small" data-cur-note' + (PBP.cur === 'USD' ? ' hidden' : '') + '>Other currencies are estimates; checkout shows the exact amount.</span></div>' +
      (soc ? '<div class="grp"><span class="label" style="color:var(--sun)">Follow</span><div class="ft-social">' + soc + '</div></div>' : '') +
      (st ? '<div class="grp"><span class="label" style="color:var(--sun)">Also sold at</span><div class="ft-social">' + st + '</div></div>' : '') +
      (pay.length ? '<div class="grp"><span class="label" style="color:var(--sun)">We accept</span><span class="small">' + pay.map(esc).join(' · ') + '</span></div>' : '') + '</div>' +
      '<div class="ft-bot"><p>© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.</p><p>Our books and guides are parent and teacher education. They are not medical advice. For questions about your child’s development, talk with their doctor.</p></div>' +
      '<p class="ft-big" aria-hidden="true">Play Before Pixels</p></div></footer>';
  }

  /* ------------------------------------------------------------------ layer manager */
  var FOC = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  var openLayer = null, opener = null, inerted = [];
  function focusables(el) { return $$(FOC, el).filter(function (n) { return n.getClientRects().length && !n.closest('[hidden]') && getComputedStyle(n).visibility !== 'hidden'; }); }
  function setOpeners(id, v) { $$('[aria-controls="' + id + '"][data-open]').forEach(function (b) { b.setAttribute('aria-expanded', v ? 'true' : 'false'); }); }
  PBP.open = function (id, from, focusSel) {
    var el = document.getElementById(id); if (!el) return;
    if (openLayer && openLayer !== el) PBP.close(true);
    closeMega();
    opener = from || opener || document.activeElement;
    openLayer = el;
    el.classList.add('is-open');
    $('[data-layer-scrim]').classList.add('is-on');
    document.body.classList.add('is-locked');
    inerted = Array.prototype.slice.call(document.body.children).filter(function (n) { return n !== el && !n.hasAttribute('data-layer-scrim') && !n.hasAttribute('data-live') && n.tagName !== 'SCRIPT' && !n.inert; });
    inerted.forEach(function (n) { n.inert = true; });
    setOpeners(id, true);
    var target = (focusSel && $(focusSel, el)) || focusables(el)[0];
    setTimeout(function () { if (target) target.focus({ preventScroll: true }); }, 40);
  };
  PBP.close = function (silent) {
    if (!openLayer) return;
    var el = openLayer; openLayer = null;
    el.classList.remove('is-open');
    $('[data-layer-scrim]').classList.remove('is-on');
    document.body.classList.remove('is-locked');
    inerted.forEach(function (n) { n.inert = false; }); inerted = [];
    setOpeners(el.id, false);
    if (el.id === 'qv') clearHashP();
    var o = opener; opener = null;
    if (!silent && o && document.contains(o) && o.getClientRects().length) o.focus({ preventScroll: true });
  };
  document.addEventListener('keydown', function (e) {
    if (openLayer) {
      if (e.key === 'Escape') { e.preventDefault(); PBP.close(); return; }
      if (e.key === 'Tab') {
        var f = focusables(openLayer); if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && (document.activeElement === first || !openLayer.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && (document.activeElement === last || !openLayer.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
      }
    }
  });

  /* ------------------------------------------------------------------ mega menu */
  var megaOpen = null, megaTimer = null, finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  function openMega(btn, focusFirst) {
    var id = btn.getAttribute('aria-controls'), panel = document.getElementById(id);
    if (megaOpen && megaOpen.btn !== btn) closeMega(true);
    btn.setAttribute('aria-expanded', 'true'); panel.classList.add('is-open');
    $('[data-nav-scrim]').classList.add('is-on');
    megaOpen = { btn: btn, panel: panel };
    if (focusFirst) { var f = focusables(panel)[0]; if (f) f.focus(); }
  }
  function closeMega(keepScrim, returnFocus) {
    clearTimeout(megaTimer);
    if (!megaOpen) return;
    megaOpen.btn.setAttribute('aria-expanded', 'false'); megaOpen.panel.classList.remove('is-open');
    if (returnFocus) megaOpen.btn.focus();
    megaOpen = null;
    if (!keepScrim) { var s = $('[data-nav-scrim]'); if (s) s.classList.remove('is-on'); }
  }
  PBP.closeMega = closeMega;
  function wireMega() {
    var hdr = $('#hdr');
    $$('[data-mega-btn]').forEach(function (btn, i, all) {
      btn.addEventListener('click', function () { btn.getAttribute('aria-expanded') === 'true' ? closeMega() : openMega(btn); });
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); openMega(btn, true); }
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          var tops = $$('.pnav-top'), k = tops.indexOf(btn) + (e.key === 'ArrowRight' ? 1 : -1);
          if (tops[k]) { e.preventDefault(); tops[k].focus(); if (megaOpen) { closeMega(true); if (tops[k].hasAttribute('data-mega-btn')) openMega(tops[k]); else closeMega(); } }
        }
      });
      if (finePointer) {
        btn.addEventListener('mouseenter', function () { clearTimeout(megaTimer); megaTimer = setTimeout(function () { openMega(btn); }, megaOpen ? 0 : 110); });
      }
    });
    if (finePointer) {
      $$('.pnav-top:not([data-mega-btn])').forEach(function (a) { a.addEventListener('mouseenter', function () { clearTimeout(megaTimer); megaTimer = setTimeout(function () { closeMega(); }, 120); }); });
      hdr.addEventListener('mouseleave', function () { clearTimeout(megaTimer); megaTimer = setTimeout(function () { closeMega(); }, 260); });
      hdr.addEventListener('mouseenter', function () { if (megaOpen) clearTimeout(megaTimer); });
      $$('.logo, .hdr-act', hdr).forEach(function (n) { n.addEventListener('mouseenter', function () { clearTimeout(megaTimer); megaTimer = setTimeout(function () { closeMega(); }, 160); }); });
    }
    $$('[data-mega]').forEach(function (panel) {
      panel.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.preventDefault(); closeMega(false, true); } });
      panel.addEventListener('click', function (e) { if (e.target.closest('a')) closeMega(); });
    });
    hdr.addEventListener('focusout', function (e) { if (megaOpen && e.relatedTarget && !hdr.contains(e.relatedTarget)) closeMega(); });
    $('.pnav').addEventListener('keydown', function (e) { if (e.key === 'Escape' && megaOpen) { e.preventDefault(); closeMega(false, true); } });
    $('[data-nav-scrim]').addEventListener('click', function () { closeMega(); });
    document.addEventListener('click', function (e) { if (megaOpen && !e.target.closest('#hdr')) closeMega(); });
    window.addEventListener('resize', function () { if (window.innerWidth < 1024) closeMega(); if (window.innerWidth >= 1024 && openLayer && openLayer.id === 'mnav') PBP.close(true); });
  }

  /* ------------------------------------------------------------------ cart */
  var CART_KEY = 'pbp-cart-v1';
  function getCart() { var c = sget(CART_KEY, []); return Array.isArray(c) ? c.filter(function (l) { return PBP.byId(l.id); }) : []; }
  function setCart(c) { sset(CART_KEY, c); renderCart(); }
  function fmtOf(p, fid) { for (var i = 0; i < p.formats.length; i++) if (p.formats[i].id === fid) return p.formats[i]; return p.formats[0]; }
  PBP.addToCart = function (id, fid, qty, from) {
    var p = PBP.byId(id); if (!p) return;
    var f = fmtOf(p, fid), c = getCart(), line = null;
    c.forEach(function (l) { if (l.id === id && l.f === f.id) line = l; });
    if (line) line.qty = Math.min(99, line.qty + (qty || 1)); else c.push({ id: id, f: f.id, qty: qty || 1 });
    setCart(c);
    var cc = $('[data-cart-count]'); if (cc) { cc.classList.remove('bump'); void cc.offsetWidth; cc.classList.add('bump'); }
    announce('Added ' + p.title + ', ' + f.label + ', to your cart');
    PBP.open('cart', from || $('.cart-btn'), '[data-cart-body] h3, .xbtn');
  };
  function renderCart() {
    var body = $('[data-cart-body]'), ft = $('[data-cart-ft]'); if (!body) return;
    var c = getCart(), n = 0, sub = 0, digitalOnly = true;
    c.forEach(function (l) { var p = PBP.byId(l.id), f = fmtOf(p, l.f); n += l.qty; sub += f.price * l.qty; if (!f.digital) digitalOnly = false; });
    $$('[data-cart-count]').forEach(function (el) { el.textContent = n; el.setAttribute('data-n', n); });
    $$('[data-cart-sr]').forEach(function (el) { el.textContent = ', ' + n + (n === 1 ? ' item' : ' items'); });
    if (!c.length) {
      body.innerHTML = '<div class="cart-empty"><h3>Nothing here yet.</h3><p class="muted">Start with an age, or with the board book everyone asks about.</p><div class="row">' +
        PBP.bands.map(function (b) { return '<a class="chip" style="background:' + b.ct + ';border-color:transparent" href="shop.html#age=' + b.id + '">' + b.label + '</a>'; }).join('') + '</div>' +
        '<p style="margin-top:24px"><a class="btn" href="product.html">See Up! Go! More! <span class="arr" aria-hidden="true">→</span></a></p></div>';
      ft.hidden = true; return;
    }
    ft.hidden = false;
    body.innerHTML = '<ul class="cart-list">' + c.map(function (l, i) {
      var p = PBP.byId(l.id), f = fmtOf(p, l.f);
      return '<li class="cart-item"><div class="cart-thumb" style="--g:' + p.g + '">' + PBP.stage(p) + '</div><div><h3><a href="' + PBP.href(p) + '"' + (p.url ? '' : ' data-qv="' + p.id + '"') + ' style="text-decoration:none">' + esc(p.title) + '</a></h3><p class="fmt">' + esc(f.label) + (f.digital ? ' · instant PDF' : '') + '</p>' +
        '<div class="qty" role="group" aria-label="Quantity for ' + esc(p.title) + '"><button type="button" data-q="' + i + '" data-d="-1" aria-label="One fewer">−</button><output aria-live="polite">' + l.qty + '</output><button type="button" data-q="' + i + '" data-d="1" aria-label="One more">+</button></div>' +
        '<button class="rm" type="button" data-rm="' + i + '">Remove<span class="vh"> ' + esc(p.title) + '</span></button></div><p class="lp num" data-usd="' + (f.price * l.qty).toFixed(2) + '">' + PBP.money(f.price * l.qty) + '</p></li>';
    }).join('') + '</ul>';
    ft.innerHTML = '<div class="cart-sub"><span style="font-weight:800">Subtotal</span><strong class="num" data-usd="' + sub.toFixed(2) + '">' + PBP.money(sub) + '</strong></div>' +
      '<p class="small">' + (digitalOnly ? 'Everything here is digital: it arrives by email a minute after checkout.' : 'Printed items are made to order; shipping and any tax are calculated at checkout. Digital items arrive by email right away.') + '</p>' +
      '<button class="btn btn--block" type="button" data-checkout>Check out <span class="arr" aria-hidden="true">→</span></button>' +
      '<p class="cart-msg" data-checkout-msg hidden role="status">Design concept: in the live shop this button opens secure checkout with cards, wallets and, for schools, purchase orders.</p>';
  }
  function wireCart() {
    document.addEventListener('click', function (e) {
      var q = e.target.closest('[data-q]'), rm = e.target.closest('[data-rm]'), ck = e.target.closest('[data-checkout]');
      if (q) { var c = getCart(), i = +q.getAttribute('data-q'); c[i].qty = Math.max(1, Math.min(99, c[i].qty + (+q.getAttribute('data-d')))); setCart(c); var b = $('[data-q="' + i + '"][data-d="' + q.getAttribute('data-d') + '"]'); if (b) b.focus(); }
      if (rm) { var c2 = getCart(), k = +rm.getAttribute('data-rm'), gone = PBP.byId(c2[k].id).title; c2.splice(k, 1); setCart(c2); announce('Removed ' + gone); var nx = $('[data-rm]') || $('#cart .xbtn'); if (nx) nx.focus(); }
      if (ck) { var m = $('[data-checkout-msg]'); m.hidden = false; }
    });
    window.addEventListener('storage', function (e) { if (e.key === CART_KEY) renderCart(); });
  }

  /* ------------------------------------------------------------------ search */
  function searchResults(q) {
    q = q.trim().toLowerCase(); if (!q) return [];
    var toks = q.replace(/[–—]/g, '-').split(/\s+/);
    return PBP.catalog.filter(function (p) {
      var hay = (p.title + ' ' + p.sub + ' ' + PBP.typeLabel(p.type) + ' ' + p.ages.replace(/–/g, '-') + ' ' + p.bands.join(' ') + ' ' + p.tags).toLowerCase();
      return toks.every(function (t) { return hay.indexOf(t) > -1; });
    });
  }
  PBP.search = searchResults;
  function wireSearch() {
    var inp = $('[data-search-input]'), out = $('[data-sres]');
    function paint() {
      var q = inp.value, r = searchResults(q).slice(0, 8);
      $('[data-sugg]').hidden = !!q.trim();
      if (!q.trim()) { out.innerHTML = ''; return; }
      out.innerHTML = r.length ? r.map(function (p) {
        return '<li><a href="' + PBP.href(p) + '"' + (p.url ? '' : ' data-qv="' + p.id + '"') + '><div class="cart-thumb" style="--g:' + p.g + '">' + PBP.stage(p) + '</div><div><h3>' + esc(p.title) + '</h3><p>' + esc(PBP.typeLabel(p.type)) + ' · ' + esc(p.ages) + '</p></div><span class="pr num">' + PBP.money(PBP.minPrice(p)) + '</span></a></li>';
      }).join('') + '<li style="grid-column:1/-1;padding-top:14px"><a class="arrow-link" style="display:inline-flex;border-bottom:2px solid" href="shop.html#q=' + encodeURIComponent(q.trim()) + '">See all ' + r.length + ' in the shop <span aria-hidden="true">→</span></a></li>'
        : '<li class="sres-none">Nothing matches “' + esc(q) + '”. Try an age like “3–5”, or <a class="tlink" href="shop.html">browse everything</a>.</li>';
    }
    inp.addEventListener('input', paint);
    $$('[data-search-form]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault(); var v = f.q.value.trim();
        var url = 'shop.html' + (v ? '#q=' + encodeURIComponent(v) : '');
        PBP.close(true);
        if (page === 'shop') { location.hash = v ? 'q=' + encodeURIComponent(v) : ''; var m = $('#main'); if (m) m.focus(); } else location.href = url;
      });
    });
  }

  /* ------------------------------------------------------------------ quick view */
  function clearHashP() {
    if (/(^|[#&])p=/.test(location.hash)) {
      var rest = location.hash.replace(/^#/, '').split('&').filter(function (s) { return s.indexOf('p=') !== 0; }).join('&');
      history.replaceState(null, '', location.pathname + location.search + (rest ? '#' + rest : ''));
    }
  }
  PBP.quickView = function (id, from) {
    var p = PBP.byId(id); if (!p) return;
    if (p.url) { location.href = p.url; return; }
    var body = $('[data-qv-body]');
    var fmts = p.formats.map(function (f, i) {
      return '<label class="fopt"><input type="radio" name="qvf" value="' + f.id + '"' + (i ? '' : ' checked') + '><span class="fopt-b"><span class="fopt-t">' + esc(f.label) + '</span><span class="fopt-n">' + esc(f.note) + '</span></span><span class="fopt-p num" data-usd="' + f.price + '">' + PBP.money(f.price) + '</span></label>';
    }).join('');
    body.innerHTML = '<div class="qv-grid"><div class="qv-media" style="--g:' + p.g + '">' + PBP.stage(p) + '</div>' +
      '<form class="qv-info" data-qv-form><p class="label muted">' + esc(PBP.typeLabel(p.type)) + ' · ' + esc(p.ages) + '</p><h2 id="qv-h">' + esc(p.title) + '</h2><p class="lede" style="font-size:17px">' + esc(p.blurb) + '</p>' +
      (p.bands.length ? PBP.mscale(p) : '<p class="small muted">Made for grown-ups, parent groups and teachers.</p>') +
      '<fieldset class="fopts"><legend class="vh">Format</legend>' + fmts + '</fieldset>' +
      '<ul class="bul">' + p.bullets.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>' +
      '<button class="btn btn--block" type="submit">Add to cart <span class="arr" aria-hidden="true">→</span></button>' +
      '<p class="small muted">' + (p.formats[0].digital ? 'Delivered by email as a PDF right after checkout.' : 'Printed to order and shipped by our print partner. 30-day returns on books and cards.') + ' <a class="tlink" href="shop.html#type=' + p.type + '">More ' + esc(PBP.typeLabel(p.type).toLowerCase()) + '</a></p></form></div>';
    $('[data-qv-form]', body).addEventListener('submit', function (e) {
      e.preventDefault(); var f = e.target.querySelector('input[name=qvf]:checked').value;
      var o = opener; PBP.close(true); PBP.addToCart(p.id, f, 1, o);
    });
    PBP.open('qv', from, '#qv-h');
    $('#qv-h').setAttribute('tabindex', '-1');
  };
  function hashP() { var m = location.hash.match(/(?:^#|&)p=([\w-]+)/); return m ? m[1] : null; }

  /* ------------------------------------------------------------------ forms (concept: no network) */
  function wireForms() {
    document.addEventListener('submit', function (e) {
      var f = e.target.closest('[data-demo-form]'); if (!f) return;
      e.preventDefault(); if (!f.reportValidity()) return;
      var ok = $('[data-ok]', f); if (ok) { ok.hidden = false; ok.focus && ok.setAttribute('tabindex', '-1'); ok.focus(); }
      $$('input, textarea, select, button[type=submit]', f).forEach(function (n) { n.disabled = true; });
    });
  }

  /* ------------------------------------------------------------------ boot */
  function boot() {
    var slot = $('#site-header'); if (slot) slot.outerHTML = headerHTML();
    var fslot = $('#site-footer'); if (fslot) fslot.outerHTML = footerHTML();
    document.body.insertAdjacentHTML('beforeend', layersHTML());
    live = $('[data-live]');
    // fill any page containers asking for tiles / mocks
    $$('[data-tiles]').forEach(function (el) { el.innerHTML = el.getAttribute('data-tiles').split(',').map(function (id) { return PBP.tile(PBP.byId(id.trim())); }).join(''); });
    $$('[data-mock]').forEach(function (el) { var p = PBP.byId(el.getAttribute('data-mock')); if (p) el.innerHTML = PBP.stage(p); });
    wireMega(); wireCart(); wireSearch(); wireForms(); renderCart(); paintPrices(document);

    document.addEventListener('click', function (e) {
      var o = e.target.closest('[data-open]');
      if (o) { e.preventDefault(); var id = o.getAttribute('aria-controls'); if (openLayer && openLayer.id === id) PBP.close(); else PBP.open(id, o, id === 'search' ? '[data-search-input]' : (id === 'cart' ? '#cart .xbtn' : null)); return; }
      if (e.target.closest('[data-close]') || e.target.hasAttribute('data-layer-scrim')) { PBP.close(); return; }
      var q = e.target.closest('[data-qv]');
      if (q && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) { e.preventDefault(); var from = openLayer ? opener : q; PBP.close(true); PBP.quickView(q.getAttribute('data-qv'), from); return; }
      var add = e.target.closest('[data-add]');
      if (add) { e.preventDefault(); PBP.addToCart(add.getAttribute('data-add'), add.getAttribute('data-fmt'), 1, add); return; }
      // any plain link inside an open layer that stays on this page: close the layer first
      var a = e.target.closest('a[href]');
      if (a && openLayer && openLayer.contains(a)) {
        var u = new URL(a.href, location.href);
        if (u.pathname === location.pathname) { PBP.close(true); }
      }
    });
    document.addEventListener('change', function (e) { if (e.target.matches('[data-cur]')) setCur(e.target.value); });
    // mobile accordion
    $$('.acc-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') === 'true';
        $$('.acc-btn').forEach(function (x) { x.setAttribute('aria-expanded', 'false'); document.getElementById(x.getAttribute('aria-controls')).hidden = true; });
        if (!open) { b.setAttribute('aria-expanded', 'true'); document.getElementById(b.getAttribute('aria-controls')).hidden = false; }
      });
    });
    // open the section for the current page in the mobile menu
    var curAcc = { shop: 'acc-shop', product: 'acc-books', research: 'acc-research' }[page];
    if (curAcc) { var cb = $('[aria-controls="' + curAcc + '"]'); if (cb) { cb.setAttribute('aria-expanded', 'true'); document.getElementById(curAcc).hidden = false; } }

    var hp = hashP(); if (hp) setTimeout(function () { PBP.quickView(hp, null); }, 60);
    window.addEventListener('hashchange', function () { var h = hashP(); if (h && !(openLayer && openLayer.id === 'qv')) PBP.quickView(h, null); });
    if (/[#&]menu$/.test(location.hash)) PBP.open('mnav', $('.menu-btn'));
    document.dispatchEvent(new CustomEvent('pbp:ready'));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
