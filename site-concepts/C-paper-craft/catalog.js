/* Play Before Pixels — concept C catalog (shared by shop, search, cart, menus).
   Prices in USD. Honest pricing: no "was" prices; bundles show the plain sum of their parts. */
window.PBP_BANDS = [
  { key: '0-1', label: '0–1', name: 'Babies', unit: 'year', color: 'sky' },
  { key: '1-3', label: '1–3', name: 'Toddlers', unit: 'years', color: 'grass' },
  { key: '3-5', label: '3–5', name: 'Preschool', unit: 'years', color: 'sun' },
  { key: '5-8', label: '5–8', name: 'Early school', unit: 'years', color: 'tomato' },
  { key: '8-12', label: '8–12', name: 'Big kids', unit: 'years', color: 'plum' }
];

window.PBP_TYPES = [
  { key: 'board', label: 'Board books' },
  { key: 'picture', label: 'Picture books' },
  { key: 'guide', label: 'Guides' },
  { key: 'printable', label: 'Printables' },
  { key: 'bundle', label: 'Printable bundles' },
  { key: 'deck', label: 'Card decks' },
  { key: 'classroom', label: 'Classroom packs' },
  { key: 'groupkit', label: 'Host-it-yourself kits' },
  { key: 'course', label: 'Written course' },
  { key: 'merch', label: 'Merch' }
];

window.PBP_COLLECTIONS = {
  books: { title: 'Books', lede: 'Talk-along board books, read-aloud picture books and a 100-play guide. Books are printed to order and shipped worldwide.', types: ['board', 'picture', 'guide'] },
  printables: { title: 'Printables', lede: 'Instant PDFs in US Letter and A4, with an ink-saver version. Print tonight, play tomorrow.', types: ['printable', 'bundle'] },
  teachers: { title: 'For Teachers & Groups', lede: 'Classroom packs with single-classroom and whole-school licenses, and parent-night kits your own member presents.', types: ['classroom', 'groupkit'], extra: ['routine-cards', 'bored-cards'] },
  gifts: { title: 'Gifts & merch', lede: 'Keepsake books, a card deck in a tuck box, and a few printed-to-order things for grown-ups.', types: ['deck', 'merch'], extra: ['laps-not-apps'] }
};

window.PBP_CATALOG = [
  {
    id: 'up-go-more', title: 'Up! Go! More!', line: '22 first words to say, sign and act out',
    type: 'board', ages: ['0-1', '1-3'], ageText: '0–3', ground: 'sun-t', mock: 'board', img: 'assets/ugm-cover.webp',
    url: 'product.html', stamp: 'Talk-Along Firsts · Book 1',
    formats: [
      { id: 'board', label: 'Board book', detail: '6 × 6 in · 26 board pages · rounded corners', price: 12.99, ship: 'Ships from our fulfilment warehouse in 1–2 business days' },
      { id: 'paperback', label: 'Talk-along paperback', detail: '8.5 × 8.5 in · 32 paper pages · read together', price: 11.99, ship: 'Printed to order, ships in 3–5 business days' }
    ],
    alt: 'Up! Go! More! cover: big navy title on sunny yellow and a laughing toddler with arms raised beside a striped ball.'
  },
  {
    id: 'tablet-slept', title: 'The Day the Tablet Slept', line: 'A funny bedtime read-aloud with a box rocket and a dog named Biscuit',
    type: 'picture', ages: ['3-5', '5-8'], ageText: '3–7', ground: 'sky-t', mock: 'book', img: 'assets/tts-cover.webp', stamp: 'Picture book',
    formats: [
      { id: 'paperback', label: 'Paperback', detail: '8.5 × 8.5 in · 32 pages', price: 11.99, ship: 'Printed to order, ships in 3–5 business days' },
      { id: 'hardcover', label: 'Hardcover', detail: '8.5 × 8.5 in · 32 pages · case laminate', price: 19.99, ship: 'Printed to order, ships in 5–7 business days' }
    ],
    alt: 'The Day the Tablet Slept cover: Ada and Biscuit the dog blast off in a cardboard-box rocket while a tablet sleeps in a nightcap.'
  },
  {
    id: 'laps-not-apps', title: 'Laps Not Apps', line: 'A cozy rhyming read-aloud about the best seats in town',
    type: 'picture', ages: ['1-3', '3-5'], ageText: '2–6', ground: 'tomato-t', mock: 'book', img: 'assets/laps-cover.webp', stamp: 'Keepsake hardcover',
    formats: [{ id: 'hardcover', label: 'Hardcover', detail: '8.5 × 8.5 in · 32 pages · a talk tip on every spread', price: 19.99, ship: 'Printed to order, ships in 5–7 business days' }],
    alt: 'Laps Not Apps cover: a grandmother in a wheelchair reads a picture book with a toddler on her lap.'
  },
  {
    id: 'plays-100', title: '100 Screen-Free Plays for Ages 0–5', line: 'Easy, low-prep plays sorted by age, each with a talk line and a safety note',
    type: 'guide', ages: ['0-1', '1-3', '3-5'], ageText: '0–5', ground: 'grass-t', mock: 'guide', img: 'assets/guide-cover.webp', stamp: 'Guide',
    formats: [
      { id: 'paperback', label: 'Paperback', detail: '8 × 10 in · printed to order', price: 16.99, ship: 'Printed to order, ships in 3–5 business days' },
      { id: 'pdf', label: 'PDF', detail: '86 pages · US Letter and A4', price: 9.99, ship: 'Instant download' }
    ],
    alt: '100 Screen-Free Plays for Ages 0–5 cover with four age-band tabs.'
  },
  {
    id: 'play-talk-cards', title: '52 Play & Talk Cards', line: 'One play and one talk tip on every card',
    type: 'printable', ages: ['0-1', '1-3', '3-5'], ageText: '0–5', ground: 'sun-t', mock: 'sheet', img: 'assets/ptc-cover.webp', stamp: 'Instant PDF',
    formats: [{ id: 'pdf', label: 'PDF', detail: '54 poker-size cards · Letter & A4 · ink-saver', price: 7.00, ship: 'Instant download' }],
    alt: '52 Play & Talk Cards printable cover with three fanned cards for ages 0–1, 2–3 and 3–5.'
  },
  {
    id: 'family-talk-along', title: '52 Family Talk-Along Cards', line: 'Good questions for dinner, the car, bath time and bedtime',
    type: 'printable', ages: ['5-8', '8-12'], ageText: '5–12', ground: 'sky-t', mock: 'sheet', img: 'assets/fta-cover.webp', stamp: 'Instant PDF',
    formats: [{ id: 'pdf', label: 'PDF', detail: '54 cards · Letter & A4 · ink-saver', price: 7.00, ship: 'Instant download' }],
    alt: '52 Family Talk-Along Cards cover with Dinner, Car and Bedtime cards.'
  },
  {
    id: 'bored-cards', title: 'I’m Bored! Play Cards', line: '150 screen-free play ideas sorted by age and energy',
    type: 'printable', ages: ['1-3', '3-5', '5-8', '8-12'], ageText: '1–12', ground: 'wash', mock: 'sheet', img: 'assets/bored-cover.webp', stamp: 'Instant PDF', teachers: true,
    formats: [{ id: 'pdf', label: 'PDF', detail: '150 cards + 36 seasonal · jar labels · editable blanks', price: 6.50, ship: 'Instant download' }],
    alt: 'I’m Bored! Play Cards cover: a jar of cards and a fan of age-banded play cards.'
  },
  {
    id: 'routine-cards', title: '200+ Visual Routine Cards', line: 'Pictures that show little ones what comes next',
    type: 'printable', ages: ['1-3', '3-5', '5-8', '8-12'], ageText: '1–12', ground: 'plum-t', mock: 'sheet', img: 'assets/vrc-cover.webp', stamp: 'Instant PDF', teachers: true,
    formats: [{ id: 'pdf', label: 'PDF', detail: '228 picture cards · 6 chart layouts · editable', price: 9.50, ship: 'Instant download' }],
    alt: '200+ Visual Routine Cards cover with picture cards for brushing teeth, blocks and sleep.'
  },
  {
    id: 'bundle-little', title: 'Paper Play Bundle, Ages 0–5', line: 'Play & Talk Cards, Visual Routine Cards and I’m Bored! Play Cards',
    type: 'bundle', ages: ['0-1', '1-3', '3-5'], ageText: '0–5', ground: 'grass-t', mock: 'stack', imgs: ['assets/ptc-cover.webp', 'assets/vrc-cover.webp', 'assets/bored-cover.webp'], img: 'assets/ptc-cover.webp', stamp: '3 PDFs', sum: 23.00,
    formats: [{ id: 'pdf', label: '3 PDFs', detail: 'Letter & A4 · one download link', price: 18.00, ship: 'Instant download' }],
    alt: 'Three printable covers stacked: Play & Talk Cards, Visual Routine Cards and I’m Bored! Play Cards.'
  },
  {
    id: 'bundle-big', title: 'Paper Play Bundle, Ages 5–12', line: 'Family Talk-Along Cards, Visual Routine Cards and I’m Bored! Play Cards',
    type: 'bundle', ages: ['5-8', '8-12'], ageText: '5–12', ground: 'tomato-t', mock: 'stack', imgs: ['assets/fta-cover.webp', 'assets/vrc-cover.webp', 'assets/bored-cover.webp'], img: 'assets/fta-cover.webp', stamp: '3 PDFs', sum: 23.00,
    formats: [{ id: 'pdf', label: '3 PDFs', detail: 'Letter & A4 · one download link', price: 18.00, ship: 'Instant download' }],
    alt: 'Three printable covers stacked: Family Talk-Along Cards, Visual Routine Cards and I’m Bored! Play Cards.'
  },
  {
    id: 'classroom-pack', title: 'Classroom Talk & Play Pack, PreK–5', line: 'Talk Tower game, talk brain breaks, family letters and a read-aloud story',
    type: 'classroom', ages: ['3-5', '5-8', '8-12'], ageText: 'PreK–5', ground: 'tomato-t', mock: 'book', img: 'assets/mtlt-cover.webp', stamp: 'Site license', teachers: true,
    formats: [
      { id: 'classroom', label: 'Single classroom', detail: 'One teacher, one classroom', price: 18.00, ship: 'Instant download + license PDF' },
      { id: 'site', label: 'Whole-school site license', detail: 'Every teacher in one school building', price: 39.00, ship: 'Instant download + stamped license PDF' }
    ],
    alt: 'More Talk, Less Tap cover: children at circle time building a Talk Tower of question, idea and joke blocks.'
  },
  {
    id: 'group-kit', title: 'Talk, Touch, Play: Parent Night Kit', line: 'Slides, a word-for-word script and handouts. Your own member presents it.',
    type: 'groupkit', ages: ['0-1', '1-3', '3-5', '5-8'], ageText: 'Grown-ups of 0–8s', ground: 'wash', mock: 'folder', img: 'assets/ptc-p05.webp', stamp: 'Host it yourself', teachers: true,
    formats: [
      { id: 'single', label: 'Single site', detail: 'One school, library or group · unlimited nights for a year', price: 129.00, ship: 'Instant download + license PDF' },
      { id: 'multi', label: 'Multi-site', detail: 'Up to 5 sites in one organization', price: 249.00, ship: 'Instant download + license PDF' }
    ],
    alt: 'A navy kit folder holding a printed speaker script, slide printouts and handouts.'
  },
  {
    id: 'card-deck', title: 'Play & Talk Card Deck', line: '52 plays in a sturdy tuck box for the diaper bag',
    type: 'deck', ages: ['0-1', '1-3', '3-5'], ageText: '0–5', ground: 'sky-t', mock: 'deck', img: 'assets/ptc-cover.webp', stamp: 'Printed to order',
    formats: [{ id: 'deck', label: 'Card deck', detail: '54 poker-size cards · tuck box', price: 22.00, ship: 'Printed to order, ships in 4–6 business days' }],
    alt: 'A tuck box of Play & Talk cards with three cards fanned out beside it.'
  },
  {
    id: 'screen-reset', title: '30-Day Screen Reset', line: 'A written course: one short lesson and one play a day, by email',
    type: 'course', ages: ['0-1', '1-3', '3-5', '5-8', '8-12'], ageText: 'For grown-ups', ground: 'sun-t', mock: 'workbook', img: 'assets/guide-p05.webp', stamp: 'Written · no video',
    formats: [{ id: 'course', label: 'Written course', detail: '30 emails + printable workbook and trackers', price: 27.00, ship: 'Day 1 arrives by email right away' }],
    alt: 'A printed 30-Day Screen Reset workbook with a day-by-day grid.'
  },
  {
    id: 'tee', title: 'Play Before Pixels Tee', line: 'Soft unisex tee with the wordmark, for grown-ups',
    type: 'merch', ages: [], ageText: 'Adult sizes XS–3XL', ground: 'wash', mock: 'tee', img: 'assets/wordmark-reverse.svg', stamp: 'Printed to order',
    formats: [{ id: 'tee', label: 'Tee', detail: 'Unisex · 100% cotton · XS–3XL', price: 27.00, ship: 'Printed to order, ships in 3–5 business days' }],
    alt: 'A navy tee laid flat with the Play Before Pixels wordmark in white.'
  },
  {
    id: 'tote', title: 'Library Tote', line: 'Fits eight picture books and a snack',
    type: 'merch', ages: [], ageText: 'For grown-ups', ground: 'sun-t', mock: 'tote', img: 'assets/wordmark-white.svg', stamp: 'Printed to order',
    formats: [{ id: 'tote', label: 'Tote', detail: 'Heavy cotton · 15 × 16 in', price: 22.00, ship: 'Printed to order, ships in 3–5 business days' }],
    alt: 'A sky-blue cotton tote bag with the Play Before Pixels wordmark.'
  }
];

/* Pages and answers for site search */
window.PBP_PAGES = [
  { title: 'Home', url: 'index.html', kind: 'Page', text: 'home play before pixels talk-along books printables' },
  { title: 'Shop everything', url: 'shop.html', kind: 'Shop', text: 'shop all products store' },
  { title: 'Books', url: 'shop.html#c=books', kind: 'Collection', text: 'books board book picture book guide paperback hardcover' },
  { title: 'Printables', url: 'shop.html#c=printables', kind: 'Collection', text: 'printables pdf download print at home letter a4' },
  { title: 'For Teachers & Groups', url: 'shop.html#c=teachers', kind: 'Collection', text: 'teachers classroom school pta group license kit parent night' },
  { title: 'Gifts & merch', url: 'shop.html#c=gifts', kind: 'Collection', text: 'gift merch tee tote deck keepsake' },
  { title: 'The Virtual Autism Project', url: 'research.html', kind: 'Research', text: 'research virtual autism screens studies hub' },
  { title: 'What “virtual autism” means, and what it doesn’t', url: 'research.html#term', kind: 'Research', text: 'virtual autism term meaning diagnosis clinicians' },
  { title: 'The studies, in plain words', url: 'research.html#studies', kind: 'Research', text: 'studies jama pediatrics madigan heffler kushima takahashi brushe harle research' },
  { title: 'WHO and AAP guidance, side by side', url: 'research.html#guidance', kind: 'Research', text: 'who aap guidelines screen time under 5 hours' },
  { title: 'Paper or screen for reading?', url: 'research.html#paper', kind: 'Research', text: 'paper reading screens delgado comprehension unesco' },
  { title: 'If you’re worried about your child', url: 'research.html#worried', kind: 'Research', text: 'worried doctor pediatrician early intervention evaluation' },
  { title: 'About Play Before Pixels', url: 'info.html#about', kind: 'About', text: 'about founder parent educator alphaplay company' },
  { title: 'Help centre', url: 'info.html#help', kind: 'Help', text: 'help faq questions orders' },
  { title: 'Downloads: resend my files', url: 'info.html#downloads', kind: 'Help', text: 'download resend link phone tablet files pdf' },
  { title: 'Printing tips', url: 'info.html#printing', kind: 'Help', text: 'print printing paper letter a4 laminate cardstock ink' },
  { title: 'Shipping', url: 'info.html#shipping', kind: 'Help', text: 'shipping delivery print on demand worldwide tracking international' },
  { title: 'Returns and reprints', url: 'info.html#returns', kind: 'Help', text: 'returns refund reprint damaged misprint' },
  { title: 'Licenses, quotes and purchase orders', url: 'info.html#licenses', kind: 'Help', text: 'license site classroom school purchase order quote invoice po' },
  { title: 'Contact', url: 'info.html#contact', kind: 'Help', text: 'contact email form question' },
  { title: 'Privacy', url: 'info.html#privacy', kind: 'Legal', text: 'privacy data email cookies' },
  { title: 'Terms of sale', url: 'info.html#terms', kind: 'Legal', text: 'terms conditions sale' },
  { title: 'Accessibility', url: 'info.html#accessibility', kind: 'Legal', text: 'accessibility large print screen reader' }
];

/* ---------- Shared renderers (used by _tools/build.js at build time and nav.js in the browser) ---------- */
(function (w) {
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  var bandColor = function (k) { var b = w.PBP_BANDS.filter(function (x) { return x.key === k; })[0]; return b ? b.color : 'sky'; };
  var TEE = '<svg viewBox="0 0 400 350" aria-hidden="true"><path d="M128 18c20 16 44 24 72 24s52-8 72-24l96 44-34 86-40-16v200H106V132l-40 16-34-86z" fill="#1D2940"/><path d="M128 18c20 16 44 24 72 24s52-8 72-24l-8-4c-18 13-38 19-64 19s-46-6-64-19z" fill="#2B3957"/><path d="M106 132l-4-40M294 132l4-40" stroke="#2B3957" stroke-width="3" fill="none"/></svg>';
  var TOTE = '<svg viewBox="0 0 360 420" aria-hidden="true"><path d="M118 168c0-112 124-112 124 0" fill="none" stroke="#2F74C2" stroke-width="16" stroke-linecap="round"/><path d="M40 150h280l-10 262H50z" fill="#3D86D8"/><path d="M40 150h280v14H40z" fill="#2F74C2"/></svg>';
  function img(src, alt, cls) { return '<img src="' + src + '" alt="' + esc(alt || '') + '" loading="lazy" decoding="async"' + (cls ? ' class="' + cls + '"' : '') + '>'; }
  w.PBP_mock = function (p, opt) {
    opt = opt || {}; var a = opt.decorative ? '' : p.alt;
    switch (p.mock) {
      case 'board': return '<div class="obj m-board"><div class="edge"></div><div class="face">' + img(p.img, a) + '</div></div>';
      case 'book': return '<div class="obj m-book"><div class="edge"></div><div class="face">' + img(p.img, a) + '</div></div>';
      case 'guide': return '<div class="obj m-book m-guide"><div class="edge"></div><div class="face">' + img(p.img, a) + '</div></div>';
      case 'sheet': return '<div class="obj m-sheet"><div class="under"></div><div class="face">' + img(p.img, a) + '</div></div>';
      case 'stack': return '<div class="obj m-stack" role="img" aria-label="' + esc(a) + '">' + p.imgs.map(function (s) { return '<div class="face">' + img(s, '') + '</div>'; }).join('') + '</div>';
      case 'deck': return '<div class="obj m-deck" role="img" aria-label="' + esc(a) + '"><div class="box">' + img(p.img, '') + '</div><span class="card"></span><span class="card"></span></div>';
      case 'folder': return '<div class="obj m-folder" role="img" aria-label="' + esc(a) + '"><div class="sheet"><b>Speaker script</b><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="sheet"><b>Take-home handout</b><i></i><i></i><i></i><i></i><i></i></div><div class="pocket"><b>Talk, Touch, Play</b><span>Parent night kit</span></div></div>';
      case 'workbook': var d = ''; for (var i = 0; i < 30; i++) d += '<i' + (i < 9 ? ' class="done"' : '') + '></i>'; return '<div class="obj m-workbook" role="img" aria-label="' + esc(a) + '"><small>Written course · Workbook</small><b>30-Day Screen Reset</b><div class="days">' + d + '</div></div>';
      case 'tee': return '<div class="obj m-tee" role="img" aria-label="' + esc(a) + '">' + TEE + img(p.img, '', 'print') + '</div>';
      case 'tote': return '<div class="obj m-tote" role="img" aria-label="' + esc(a) + '">' + TOTE + img(p.img, '', 'print') + '</div>';
    }
    return '';
  };
  w.PBP_minPrice = function (p) { return Math.min.apply(null, p.formats.map(function (f) { return f.price; })); };
  w.PBP_href = function (p) { return p.url || ('shop.html#item=' + p.id); };
  w.PBP_card = function (p, opt) {
    opt = opt || {};
    var min = w.PBP_minPrice(p), multi = p.formats.length > 1;
    var dots = p.ages.map(function (k) { return '<i class="dot-' + bandColor(k) + '"></i>'; }).join('');
    var quick = p.formats.length === 1 && !p.url
      ? '<button class="quick-add" type="button" data-add="' + p.id + '" data-format="' + p.formats[0].id + '">Add<span class="visually-hidden"> ' + esc(p.title) + ' to cart</span></button>'
      : '<span class="ages">' + (dots ? '<span class="age-dots" aria-hidden="true">' + dots + '</span>' : '') + ' ' + esc(p.ageText) + '</span>';
    return '<li class="p-card" data-id="' + p.id + '" data-type="' + p.type + '" data-ages="' + p.ages.join(' ') + '" data-price="' + min + '">' +
      '<div class="surface g-' + p.ground + '"><span class="stamp stamp--ink">' + esc(p.stamp) + '</span>' + w.PBP_mock(p, { decorative: true }) + '</div>' +
      '<h3><a href="' + w.PBP_href(p) + '"' + (p.url ? '' : ' data-quick="' + p.id + '"') + '>' + esc(p.title) + '</a></h3>' +
      '<p class="line">' + esc(p.line) + '</p>' +
      '<div class="foot"><span class="price">' + (multi ? '<small>from </small>' : '') + '<span data-usd="' + min + '">$' + min.toFixed(2) + '</span></span>' + quick + '</div>' +
      '</li>';
  };
  w.PBP_esc = esc; w.PBP_bandColor = bandColor;
})(typeof window !== 'undefined' ? window : globalThis);
