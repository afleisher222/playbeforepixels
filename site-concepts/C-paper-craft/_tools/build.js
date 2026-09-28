// Builds the concept pages: _src/<page>.html + shared chrome -> <page>.html
// usage: node _tools/build.js
const fs = require('fs'); const path = require('path'); const vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const ctx = { window: {} }; ctx.globalThis = ctx.window; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'catalog.js'), 'utf8'), ctx);
const W = ctx.window; const P = W.PBP_CATALOG; const byId = id => P.find(p => p.id === id);
const esc = W.PBP_esc;

const I = {
  chev: '<svg class="chev" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M15.5 15.5l5 5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 8.5h15l-1.2 12h-12.6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8.5 8.5V7a3.5 3.5 0 0 1 7 0v1.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  x: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  reg: '<svg class="reg" viewBox="0 0 22 22" aria-hidden="true"><circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="11" cy="11" r="2.4" fill="currentColor"/><path d="M11 0v22M0 11h22" stroke="currentColor" stroke-width="1"/></svg>'
};
W.I = I;

const bandCount = k => P.filter(p => p.ages.includes(k)).length;
const ageTabs = () => '<ul class="age-tabs">' + W.PBP_BANDS.map(b =>
  `<li><a class="age-tab c-${b.color}" href="shop.html#age=${b.key}"><span class="t">${b.label}</span><span class="n">${b.name}<small>${b.label} ${b.unit}</small></span><span class="c">${bandCount(b.key)}</span></a></li>`).join('') + '</ul>';

const typeLinks = () => '<ul class="mega-list">' + W.PBP_TYPES.map(t => {
  const n = P.filter(p => p.type === t.key).length;
  return `<li><a href="shop.html#type=${t.key}">${t.label}<small class="num">${n}</small></a></li>`;
}).join('') + '</ul>';

function megaPanels() {
  const ugm = byId('up-go-more');
  const books = ['up-go-more', 'tablet-slept', 'laps-not-apps', 'plays-100'].map(byId);
  return `
  <div class="mega" id="mega-shop" data-mega-panel>
    <div class="wrap mega-inner mega-inner--shop">
      <div><h2>Shop by age</h2>${ageTabs()}</div>
      <div><h2>Shop by type</h2>${typeLinks()}<p class="mega-all"><a class="link" href="shop.html">Everything we make <span class="arr" aria-hidden="true">→</span></a></p></div>
      <a class="mega-feature" href="product.html">
        <div class="surface g-sky-t">${W.PBP_mock(ugm, { decorative: true })}</div>
        <span><span class="stamp">New · Book 1</span></span>
        <span><strong>Up! Go! More!</strong><span class="meta">22 first words to say, sign and act out · ages 0–3 · from <span data-usd="11.99">$11.99</span></span></span>
      </a>
    </div>
  </div>
  <div class="mega" id="mega-books" data-mega-panel>
    <div class="wrap mega-inner mega-inner--books">
      <div><h2>Our books</h2>
        <ul class="shelf">${books.map(b => `<li><a href="${W.PBP_href(b)}"><div class="surface g-${b.ground}">${W.PBP_mock(b, { decorative: true })}</div><span><b>${esc(b.title)}</b><small>Ages ${b.ageText} · from <span data-usd="${W.PBP_minPrice(b)}">$${W.PBP_minPrice(b).toFixed(2)}</span></small></span></a></li>`).join('')}</ul>
      </div>
      <div class="mega-note">
        <h2>How our books work</h2>
        <p>Every page has something for the child and a short tip for the grown-up reading along.</p>
        <ul class="mega-list">
          <li><a href="shop.html#type=board">Board books <small>0–3</small></a></li>
          <li><a href="shop.html#type=picture">Picture books <small>2–7</small></a></li>
          <li><a href="shop.html#type=guide">The 100-play guide <small>0–5</small></a></li>
          <li><a href="shop.html#c=books">All books <small class="num">${P.filter(p => ['board', 'picture', 'guide'].includes(p.type)).length}</small></a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="mega" id="mega-teach" data-mega-panel>
    <div class="wrap mega-inner mega-inner--teach">
      <div><h2>For classrooms</h2>
        <ul class="mega-list">
          <li><a href="shop.html#item=classroom-pack">Classroom Talk &amp; Play Pack <small>PreK–5</small></a></li>
          <li><a href="shop.html#item=routine-cards">Visual routine cards <small>for classroom walls</small></a></li>
          <li><a href="shop.html#item=bored-cards">I’m Bored! Play Cards <small>indoor recess</small></a></li>
          <li><a href="info.html#licenses">Site licenses explained <small>single · school</small></a></li>
        </ul>
      </div>
      <div><h2>For PTAs &amp; parent groups</h2>
        <ul class="mega-list">
          <li><a href="shop.html#item=group-kit">Parent Night Kit <small>host it yourself</small></a></li>
          <li><a href="info.html#licenses">Quotes &amp; purchase orders <small>by form</small></a></li>
          <li><a href="research.html#studies">Research briefs <small>free</small></a></li>
        </ul>
        <p class="mega-all"><a class="link" href="shop.html#c=teachers">All for teachers &amp; groups <span class="arr" aria-hidden="true">→</span></a></p>
      </div>
      <div class="mega-note mega-note--frame">
        <h2>How licenses work</h2>
        <p>Pay by card or purchase order. The files and a stamped license PDF with your school’s name arrive by email, automatically. Your own member presents every kit.</p>
      </div>
    </div>
  </div>
  <div class="mega" id="mega-research" data-mega-panel>
    <div class="wrap mega-inner mega-inner--research">
      <div class="mega-note">
        <h2>The Virtual Autism Project</h2>
        <p>A calm reading room on young children, screens and talk. “Virtual autism” is a term some clinicians use. It is not a medical diagnosis.</p>
        <p><a class="link" href="research.html">Open the reading room <span class="arr" aria-hidden="true">→</span></a></p>
      </div>
      <div><h2>Start here</h2>
        <ul class="mega-list">
          <li><a href="research.html#term">What the term means, and what it doesn’t</a></li>
          <li><a href="research.html#studies">The studies, in plain words <small>10 sources</small></a></li>
          <li><a href="research.html#guidance">WHO and AAP guidance, side by side</a></li>
          <li><a href="research.html#paper">Paper or screen for reading?</a></li>
          <li><a href="research.html#worried">If you’re worried about your child</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="nav-scrim" data-nav-scrim></div>`;
}

const navItems = [
  ['shop', 'Shop', 'mega-shop'], ['books', 'Books', 'mega-books'], ['teach', 'For Teachers &amp; Groups', 'mega-teach'], ['research', 'Research', 'mega-research']
];

function panel(id) {
  const all = megaPanels();
  const m = all.match(new RegExp('<div class="mega" id="' + id + '"[\\s\\S]*?(?=\\n  <div class="mega" id=|\\n  <div class="nav-scrim")'));
  return m ? m[0] : '';
}
function header(active) {
  return `<a class="skip-link" href="#main">Skip to content</a>
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs><filter id="ink" x="-5%" y="-20%" width="110%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.6"/></filter></defs></svg>
<div class="utility"><div class="wrap">
  <p><span class="u-long">Printables download instantly. Books are printed to order and ship worldwide.</span><span class="u-short">Instant downloads · Books ship worldwide</span></p>
  <nav aria-label="Help and currency">
    <a class="u-hide" href="info.html#help">Help centre</a>
    <a class="u-hide" href="info.html#downloads">Resend my download</a>
    <label class="mini-select"><span class="visually-hidden">Currency</span><select data-currency>
      <option value="USD">USD $</option><option value="GBP">GBP £</option><option value="EUR">EUR €</option><option value="CAD">CAD $</option><option value="AUD">AUD $</option>
    </select></label>
  </nav>
</div></div>
<header class="site-header" id="top">
  <div class="wrap masthead">
    <a class="brand" href="index.html"><img src="assets/lockup-horizontal.svg" alt="Play Before Pixels, home" width="141" height="38"></a>
    <nav class="primary-nav" aria-label="Main">
      <ul>
        ${navItems.map(([k, l, id]) => `<li><button class="nav-top${active === k ? ' is-current' : ''}" type="button" aria-expanded="false" aria-controls="${id}" data-mega="${id}">${l} ${I.chev}</button>${panel(id)}</li>`).join('\n        ')}
        <li><a class="nav-top${active === 'about' ? ' is-current' : ''}" href="info.html#about"${active === 'about' ? ' aria-current="page"' : ''}>About</a></li>
      </ul>
    </nav>
    <div class="tools">
      <button class="tool-btn" type="button" data-open-search aria-haspopup="dialog" aria-controls="search">${I.search}<span class="search-label">Search</span><kbd aria-hidden="true">/</kbd><span class="visually-hidden">(press slash)</span></button>
      <button class="tool-btn" type="button" data-open-cart aria-haspopup="dialog" aria-controls="cart">${I.bag}<span class="cart-label">Cart</span><span class="cart-count" data-cart-count aria-hidden="true">0</span><span class="visually-hidden" data-cart-sr>, 0 items</span></button>
      <button class="tool-btn menu-btn" type="button" data-open-menu aria-haspopup="dialog" aria-controls="mnav" aria-expanded="false">${I.menu}<span>Menu</span></button>
    </div>
  </div>
  <div class="nav-scrim" data-nav-scrim></div>
</header>`;
}

function mobileNav() {
  const acc = (id, title, body) => `<div class="acc"><h3><button class="acc-btn" type="button" aria-expanded="false" aria-controls="${id}">${title}<span class="pm" aria-hidden="true"></span></button></h3><div class="acc-panel" id="${id}" hidden>${body}</div></div>`;
  return `
<div class="scrim" data-scrim="mnav"></div>
<div class="drawer drawer--left mnav" id="mnav" role="dialog" aria-modal="true" aria-labelledby="mnav-title" data-dialog>
  <div class="drawer-head"><a class="brand" href="index.html"><img src="assets/lockup-horizontal.svg" alt="Play Before Pixels, home" width="119" height="32" style="height:32px;width:auto"></a><h2 class="visually-hidden" id="mnav-title">Menu</h2><button class="x-btn" type="button" data-close aria-label="Close menu">${I.x}</button></div>
  <div class="drawer-body">
    <button class="mnav-search" type="button" data-open-search>${I.search}Search books, printables, answers</button>
    ${acc('m-shop', 'Shop', '<p class="eyebrow">By age</p>' + ageTabs() + '<p class="eyebrow">By type</p>' + typeLinks() + '<p class="mega-all"><a class="link" href="shop.html">Everything we make <span class="arr" aria-hidden="true">→</span></a></p>')}
    ${acc('m-books', 'Books', '<ul><li><a href="product.html">Up! Go! More! <small class="meta">0–3</small></a></li><li><a href="shop.html#item=tablet-slept">The Day the Tablet Slept <small class="meta">3–7</small></a></li><li><a href="shop.html#item=laps-not-apps">Laps Not Apps <small class="meta">2–6</small></a></li><li><a href="shop.html#item=plays-100">100 Screen-Free Plays <small class="meta">0–5</small></a></li><li><a href="shop.html#c=books"><b>All books</b></a></li></ul>')}
    ${acc('m-teach', 'For Teachers &amp; Groups', '<ul><li><a href="shop.html#item=classroom-pack">Classroom Talk &amp; Play Pack <small class="meta">PreK–5</small></a></li><li><a href="shop.html#item=group-kit">Parent Night Kit <small class="meta">host it yourself</small></a></li><li><a href="shop.html#item=routine-cards">Visual routine cards</a></li><li><a href="info.html#licenses">Licenses, quotes &amp; purchase orders</a></li><li><a href="shop.html#c=teachers"><b>All for teachers &amp; groups</b></a></li></ul>')}
    ${acc('m-research', 'Research', '<ul><li><a href="research.html">The Virtual Autism Project</a></li><li><a href="research.html#term">What the term means</a></li><li><a href="research.html#studies">The studies, in plain words</a></li><li><a href="research.html#guidance">WHO and AAP guidance</a></li><li><a href="research.html#worried">If you’re worried</a></li></ul>')}
    <div class="acc"><a class="acc-btn" href="info.html#about">About</a></div>
  </div>
  <div class="drawer-foot mnav-foot">
    <div class="row"><a href="info.html#help">Help centre</a><a href="info.html#downloads">Resend my download</a><a href="info.html#contact">Contact</a></div>
    <div class="row">
      <label class="select-field">Currency<select data-currency><option value="USD">USD $</option><option value="GBP">GBP £</option><option value="EUR">EUR €</option><option value="CAD">CAD $</option><option value="AUD">AUD $</option></select></label>
      <label class="select-field">Language<select data-lang><option value="en-US">English (US)</option><option value="en-GB">English (UK)</option><option value="es" disabled>Español (coming 2027)</option></select></label>
    </div>
  </div>
</div>`;
}

function searchSheet() {
  return `
<div class="scrim" data-scrim="search"></div>
<div class="search-sheet" id="search" role="dialog" aria-modal="true" aria-label="Search the site" data-dialog>
  <div class="wrap">
    <form class="search-bar" role="search" action="shop.html" data-search-form>
      <label>${I.search}<span class="visually-hidden">Search</span><input type="search" name="q" placeholder="Search books, printables, answers" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="search-results" aria-autocomplete="list" data-search-input></label>
      <button class="x-btn" type="button" data-close aria-label="Close search">${I.x}</button>
    </form>
    <div class="search-results" id="search-results" role="listbox" aria-label="Results" data-search-results></div>
  </div>
</div>`;
}

function cartDrawer() {
  return `
<div class="scrim" data-scrim="cart"></div>
<div class="drawer drawer--right" id="cart" role="dialog" aria-modal="true" aria-labelledby="cart-title" data-dialog>
  <div class="drawer-head"><h2 id="cart-title">Your cart</h2><button class="x-btn" type="button" data-close aria-label="Close cart">${I.x}</button></div>
  <div class="drawer-body" data-cart-body aria-live="polite"></div>
  <div class="drawer-foot" data-cart-foot></div>
</div>
<div class="toast" role="status" aria-live="polite" data-toast><span data-toast-msg></span><button type="button" data-open-cart>View cart</button></div>`;
}

function footer() {
  return `
<footer class="footer on-ink" id="footer">
  <div class="wrap">
    <div class="f-strip" aria-hidden="true"><div class="colour-bar">${'<i></i>'.repeat(12)}</div>${I.reg}<small>Colour control · AlphaPlay LLC</small></div>
    <div class="f-top">
      <div class="f-sign">
        <h2>A free play plan, every other Sunday.</h2>
        <p>Five plays for the week ahead, sorted by age, on one printable page. Just an email. If you like, add your child’s birth month so the plays fit. No names, ever.</p>
        <form class="signup" data-signup novalidate>
          <div class="field"><label for="su-email">Email</label><input id="su-email" type="email" name="email" autocomplete="email" placeholder="you@example.com" required></div>
          <button class="btn btn--light" type="submit">Send me the plan</button>
          <div class="row2">
            <div class="field"><label for="su-month">Birth month <span style="font-weight:600">(optional)</span></label><select id="su-month" name="m"><option value="">Month</option>${['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => `<option>${m}</option>`).join('')}</select></div>
            <div class="field"><label for="su-year">Birth year <span style="font-weight:600">(optional)</span></label><select id="su-year" name="y"><option value="">Year</option>${[2026,2025,2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014].map(y => `<option>${y}</option>`).join('')}</select></div>
          </div>
          <small>Unsubscribe in one click. We never sell or share your email.</small>
          <p class="signup-done" data-signup-done hidden role="status"></p>
        </form>
      </div>
      <nav class="f-cols" aria-label="Footer">
        <div><h3>Shop by age</h3><ul>${W.PBP_BANDS.map(b => `<li><a href="shop.html#age=${b.key}">Ages ${b.label}</a></li>`).join('')}<li><a href="shop.html">Everything</a></li></ul></div>
        <div><h3>Shop by type</h3><ul><li><a href="shop.html#c=books">Books</a></li><li><a href="shop.html#c=printables">Printables</a></li><li><a href="shop.html#c=teachers">Teachers &amp; groups</a></li><li><a href="shop.html#type=course">Written course</a></li><li><a href="shop.html#c=gifts">Gifts &amp; merch</a></li></ul></div>
        <div><h3>Help</h3><ul><li><a href="info.html#help">Help centre</a></li><li><a href="info.html#downloads">Resend my download</a></li><li><a href="info.html#shipping">Shipping</a></li><li><a href="info.html#returns">Returns &amp; reprints</a></li><li><a href="info.html#licenses">Licenses &amp; POs</a></li><li><a href="info.html#contact">Contact</a></li></ul></div>
        <div><h3>About</h3><ul><li><a href="info.html#about">Our story</a></li><li><a href="research.html">Research hub</a></li><li><a href="info.html#accessibility">Accessibility</a></li><li><a href="info.html#privacy">Privacy</a></li><li><a href="info.html#terms">Terms of sale</a></li></ul></div>
      </nav>
    </div>
    <div class="f-mid">
      <div class="selects">
        <label class="select-field">Language<select data-lang><option value="en-US">English (US)</option><option value="en-GB">English (UK)</option><option value="es" disabled>Español (coming 2027)</option></select></label>
        <label class="select-field">Currency<select data-currency><option value="USD">USD $</option><option value="GBP">GBP £</option><option value="EUR">EUR €</option><option value="CAD">CAD $</option><option value="AUD">AUD $</option></select></label>
      </div>
      <div data-social-wrap hidden><h3 class="visually-hidden">Follow and shop elsewhere</h3><ul class="socials" data-socials></ul></div>
    </div>
    <div class="f-base">
      <div class="brandline"><img src="assets/lockup-horizontal-reverse.svg" alt="Play Before Pixels" width="111" height="30"><span>© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.</span></div>
      <nav aria-label="Legal"><a href="info.html#privacy">Privacy</a><a href="info.html#terms">Terms</a><a href="info.html#accessibility">Accessibility</a><a href="info.html#shipping">Shipping</a><a href="info.html#returns">Returns</a></nav>
    </div>
    <p class="f-colophon">${I.reg}<span>Founded by a parent and educator. Parent education, not medical advice. Set in Bricolage Grotesque, Nunito Sans, Fredoka and Caveat.</span></p>
  </div>
</footer>`;
}

function page(src) {
  let s = fs.readFileSync(src, 'utf8');
  const fm = {}; s = s.replace(/^<!--([\s\S]*?)-->\n/, (_, b) => { b.trim().split('\n').forEach(l => { const i = l.indexOf(':'); fm[l.slice(0, i).trim()] = l.slice(i + 1).trim(); }); return ''; });
  // helpers inside page bodies
  s = s.replace(/\{\{MOCK:([\w-]+)(?::(\w+))?\}\}/g, (_, id, d) => W.PBP_mock(byId(id), { decorative: d === 'd' }));
  s = s.replace(/\{\{CARD:([\w-]+)\}\}/g, (_, id) => W.PBP_card(byId(id)));
  s = s.replace(/\{\{ALLCARDS\}\}/g, () => P.map(p => W.PBP_card(p)).join('\n'));
  s = s.replace(/\{\{AGETABS\}\}/g, ageTabs);
  s = s.replace(/\{\{COUNT:([\w-]+)\}\}/g, (_, k) => String(bandCount(k)));
  s = s.replace(/\{\{I:(\w+)\}\}/g, (_, k) => I[k]);
  s = s.replace(/\{\{WORDS_JSON\}\}/g, () => { const m = JSON.parse(fs.readFileSync(path.join(ROOT, '../../products/board-up-go-more/build/manuscript.json'), 'utf8')); return JSON.stringify(m.words.map(w => ({ w: w.w, cue: w.cue, tip: w.tip }))).replace(/</g, '\\u003c'); });
  s = s.replace(/\{\{WORDBTNS\}\}/g, () => { const m = JSON.parse(fs.readFileSync(path.join(ROOT, '../../products/board-up-go-more/build/manuscript.json'), 'utf8')); return m.words.map((w, i) => `<li><button type="button" class="wbtn" data-word="${i}" aria-pressed="${i === 2}" aria-controls="word-out">${esc(w.w)}</button></li>`).join(''); });
  const out = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${fm.title}</title>
<meta name="description" content="${fm.desc}">
<meta name="theme-color" content="#1D2940">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../../brand/fonts/fonts.css">
<link rel="stylesheet" href="styles.css">
</head>
<body data-page="${fm.page}">
${header(fm.nav)}
${s}
${footer()}
${mobileNav()}
${searchSheet()}
${cartDrawer()}
<script src="../../commerce/links.js"></script>
<script src="catalog.js"></script>
<script src="nav.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(ROOT, path.basename(src)), out);
  console.log('built', path.basename(src), out.length);
}

fs.readdirSync(path.join(ROOT, '_src')).filter(f => f.endsWith('.html')).forEach(f => page(path.join(ROOT, '_src', f)));
