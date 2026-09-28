/* Play Before Pixels, Direction A: shared header, mega-menu, mobile menu,
   search, bag (cart) drawer, currency, footer. No dependencies. */
(function () {
  "use strict";
  var PBP = window.PBP = window.PBP || {};
  var doc = document, body = doc.body;
  var section = body.getAttribute("data-section") || "";

  /* ---------- storage (per-viewer convenience only) ---------- */
  function load(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  /* ---------- money ---------- */
  var CUR = {
    USD: { rate: 1, locale: "en-US", label: "USD $" },
    CAD: { rate: 1.37, locale: "en-CA", label: "CAD $" },
    GBP: { rate: 0.79, locale: "en-GB", label: "GBP £" },
    EUR: { rate: 0.92, locale: "de-DE", label: "EUR €" },
    AUD: { rate: 1.52, locale: "en-AU", label: "AUD $" }
  };
  PBP.currency = load("pbp-cur", "USD");
  if (!CUR[PBP.currency]) PBP.currency = "USD";
  PBP.money = function (usd) {
    if (!usd) return "Free";
    var c = CUR[PBP.currency], v = usd * c.rate;
    if (PBP.currency !== "USD") v = Math.ceil(v) - 0.01; /* local .99 price points */
    var whole = Math.abs(v - Math.round(v)) < 0.001;
    return new Intl.NumberFormat(c.locale, { style: "currency", currency: PBP.currency, minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: whole ? 0 : 2 }).format(v);
  };
  PBP.price = function (usd) { return '<span class="money" data-usd="' + usd + '">' + PBP.money(usd) + "</span>"; };
  function refreshMoney() {
    doc.querySelectorAll("[data-usd]").forEach(function (el) { el.textContent = PBP.money(+el.getAttribute("data-usd")); });
    doc.querySelectorAll("select[data-currency]").forEach(function (s) { s.value = PBP.currency; });
    renderBag();
  }
  function setCurrency(c) { if (!CUR[c]) return; PBP.currency = c; save("pbp-cur", c); refreshMoney(); }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  PBP.esc = esc;

  /* ---------- icons ---------- */
  var I = {
    chev: '<svg class="i-chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    search: '<svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="m13 13 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    bag: '<svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 6.5h13l-1 11h-11z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M7 8V5a3 3 0 0 1 6 0v3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    close: '<svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="m4 4 12 12M16 4 4 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    arrow: '<svg class="i-arrow" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    menu: '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M2 6h16M2 14h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
  };
  PBP.icon = I;

  /* ---------- counts by age / type ---------- */
  function countAge(a) { return PBP.PRODUCTS.filter(function (p) { return p.ages.indexOf(a) > -1; }).length; }

  /* ---------- age scale (the ruler) ---------- */
  /* mode: "links" | "filter" | "display"; sel: array of age ids to mark */
  PBP.ageScale = function (mode, sel, opts) {
    opts = opts || {};
    sel = sel || [];
    var h = '<div class="scale scale--' + mode + (opts.compact ? " scale--compact" : "") + '"' + (mode === "filter" ? ' role="group" aria-label="Filter by age"' : "") + ">";
    PBP.AGES.forEach(function (a) {
      var on = sel.indexOf(a.id) > -1;
      var ticks = ""; for (var i = 0; i < a.years; i++) ticks += "<i></i>";
      var inner = '<span class="sc-top"><span class="sc-label">' + a.label + '</span><span class="sc-name">' + a.name + "</span></span>" +
        '<span class="sc-bar" style="--tint:' + a.tint + ";--ink-a:" + a.ink + '">' + ticks + "</span>" +
        (opts.note ? '<span class="sc-note">' + (opts.note[a.id] || "") + "</span>" : "") +
        (opts.counts ? '<span class="sc-count">' + countAge(a.id) + " things</span>" : "");
      var st = ' style="--grow:' + a.years + '"';
      if (mode === "links") h += '<a class="sc-seg" href="shop.html#age=' + a.id + '"' + st + ">" + inner + "</a>";
      else if (mode === "filter") h += '<button type="button" class="sc-seg" data-age="' + a.id + '" aria-pressed="' + on + '"' + st + ">" + inner + "</button>";
      else h += '<div class="sc-seg' + (on ? " is-on" : "") + '"' + st + ">" + inner + "</div>";
    });
    h += "</div>";
    if (!opts.noAxis) {
      h += '<div class="scale-axis" aria-hidden="true">';
      for (var y = 0; y <= 12; y++) h += "<span>" + y + "</span>";
      h += "</div>";
    }
    return h;
  };

  /* ---------- product tile ---------- */
  PBP.tile = function (p, opts) {
    opts = opts || {};
    var ok = p.formats.filter(function (f) { return f.status === "ok"; });
    var from = PBP.fromPrice(p);
    var multi = p.formats.filter(function (f) { return f.status !== "none"; }).length > 1;
    var href = "product.html#" + p.id;
    var action;
    if (!ok.length) action = '<a class="tile-add" href="' + href + '">Get notified</a>';
    else if (ok[0].sizes) action = '<a class="tile-add" href="' + href + '">Choose size</a>';
    else action = '<button type="button" class="tile-add" data-add="' + p.id + '" data-fmt="' + ok[0].id + '">Add to bag<span class="sr">: ' + esc(p.title) + ", " + esc(ok[0].label) + "</span></button>";
    return '<article class="tile' + (opts.cls ? " " + opts.cls : "") + '">' +
      '<a class="tile-img" href="' + href + '" tabindex="-1" aria-hidden="true" style="--ground:' + p.ground + '"><img src="' + p.photo + '" alt="" width="1000" height="1250"></a>' +
      '<div class="tile-meta">' +
      '<p class="label">' + esc(p.kind) + " · " + esc(p.ageText.indexOf("For") === 0 || p.ageText.indexOf("Fam") === 0 || p.ageText.indexOf("One") === 0 || p.ageText.indexOf("Adult") === 0 || p.ageText.indexOf("PreK") === 0 ? p.ageText : "Ages " + p.ageText) + (p.badge ? ' <span class="badge">' + esc(p.badge) + "</span>" : "") + "</p>" +
      '<h3 class="tile-title"><a href="' + href + '">' + esc(p.title) + "</a></h3>" +
      (opts.noSub ? "" : '<p class="tile-sub">' + esc(p.sub) + "</p>") +
      '<p class="tile-price">' + (from === 0 ? "Free" : (multi ? '<span class="from">from</span> ' : "") + PBP.price(from)) + "</p>" +
      action + "</div></article>";
  };

  /* ---------- header ---------- */
  function ageLinks() {
    return PBP.AGES.map(function (a) {
      return '<li><a class="mm-age" href="shop.html#age=' + a.id + '" style="--tint:' + a.tint + ";--grow:" + a.years + '"><span class="mm-age-l">' + a.label + '</span><span class="mm-age-n">' + a.name + '</span><span class="mm-age-bar"></span><span class="mm-age-c">' + countAge(a.id) + "</span></a></li>";
    }).join("");
  }
  var typeLinks =
    '<li><a href="shop.html#type=board">Board books</a></li>' +
    '<li><a href="shop.html#type=picture">Picture books</a></li>' +
    '<li><a href="shop.html#type=guide">Guides for grown-ups</a></li>' +
    '<li><a href="shop.html#type=printable">Printables</a></li>' +
    '<li><a href="shop.html#type=cards">Card decks</a></li>' +
    '<li><a href="shop.html#type=course">Written course</a></li>' +
    '<li><a href="shop.html#type=merch">Merch</a></li>' +
    '<li><a href="shop.html#type=free">Free research briefs</a></li>';

  var MENUS = {
    shop: {
      label: "Shop",
      html:
        '<div class="mm-col mm-col--age"><p class="label">Shop by age</p><ul class="mm-ages">' + ageLinks() + "</ul></div>" +
        '<div class="mm-col"><p class="label">Shop by type</p><ul class="mm-list">' + typeLinks + '</ul></div>' +
        '<div class="mm-col"><p class="label">At school &amp; in groups</p><ul class="mm-list">' +
        '<li><a href="product.html#classroom">PreK–5 Classroom Pack</a></li><li><a href="product.html#group-kit">Host-it-yourself evening kits</a></li><li><a href="info.html#licenses">How site licenses work</a></li><li><a href="info.html#bulk">Bulk &amp; PTA orders</a></li></ul>' +
        '<a class="mm-all" href="shop.html">Everything in the shop ' + I.arrow + "</a></div>" +
        '<a class="mm-feature" href="product.html#up-go-more"><span class="mm-feature-img" style="--ground:var(--t-sun)"><img src="assets/photo-ugm.png" alt="" width="1000" height="1250"></span><span class="label">New board book · Ages 0–3</span><span class="mm-feature-t">Up! Go! More!</span><span class="mm-feature-p">' + "<span data-usd=\"12.99\"></span></span></a>"
    },
    books: {
      label: "Books",
      html:
        '<div class="mm-books">' +
        [["up-go-more", "assets/ugm-cover.png", "Board book · 0–3", "Up! Go! More!"],
         ["tablet-slept", "assets/tts-cover.png", "Picture book · 3–7", "The Day the Tablet Slept"],
         ["mtlt", "assets/photo-mtlt.png", "Picture book · 4–8 · Spring 2027", "More Talk, Less Tap"],
         ["hundred-plays", "assets/photo-100plays.png", "Guide for grown-ups · 0–5", "100 Plays Before Pixels"]].map(function (b) {
          return '<a class="mm-book" href="product.html#' + b[0] + '"><span class="mm-book-img' + (b[1].indexOf("photo") > -1 ? " is-photo" : "") + '"><img src="' + b[1] + '" alt=""></span><span class="label">' + b[2] + '</span><span class="mm-book-t">' + b[3] + "</span></a>";
        }).join("") + "</div>" +
        '<div class="mm-col mm-col--aside"><p class="label">Browse</p><ul class="mm-list"><li><a href="shop.html#type=books">All books</a></li><li><a href="shop.html#type=board">Board books</a></li><li><a href="shop.html#type=picture">Picture books</a></li><li><a href="info.html#formats">Board, paperback, hardcover or library binding?</a></li></ul></div>'
    },
    teachers: {
      label: "For Teachers &amp; Groups",
      html:
        '<div class="mm-col mm-col--wide"><p class="label">For classrooms</p><a class="mm-big" href="product.html#classroom">PreK–5 Classroom Pack</a><p class="mm-desc">Sixty printable pages, circle-time cards and family letters. One teacher <span data-usd="19"></span>; a whole school site <span data-usd="39"></span>. The license arrives by email as a stamped PDF.</p></div>' +
        '<div class="mm-col mm-col--wide"><p class="label">For PTAs &amp; parent groups</p><a class="mm-big" href="product.html#group-kit">Host-it-yourself evening kits</a><p class="mm-desc">Slides, a word-for-word script and handouts, presented by a member of your own group. <span data-usd="49"></span> per group, per year.</p></div>' +
        '<div class="mm-col"><p class="label">Good to know</p><ul class="mm-list"><li><a href="info.html#licenses">How site licenses work</a></li><li><a href="info.html#bulk">Bulk &amp; PTA book orders</a></li><li><a href="research.html#briefs">Free research briefs</a></li><li><a href="shop.html#type=classroom">Everything for school</a></li></ul><p class="mm-note">We don’t run live sessions. Every kit is presented by your own people.</p></div>'
    },
    research: {
      label: "Research",
      html:
        '<div class="mm-col mm-col--wide"><p class="label">The Virtual Autism Project</p><a class="mm-big" href="research.html">Free, careful reading on screens and early development</a><p class="mm-desc">“Virtual autism” is a term some clinicians use. It is not a medical diagnosis, and the studies describe associations, not causes.</p></div>' +
        '<div class="mm-col"><p class="label">Read</p><ul class="mm-list"><li><a href="research.html#term">What the term means</a></li><li><a href="research.html#studies">What the studies found</a></li><li><a href="research.html#guidelines">Guidelines by age</a></li><li><a href="research.html#school">Screens and school</a></li></ul></div>' +
        '<div class="mm-col"><p class="label">Use</p><ul class="mm-list"><li><a href="research.html#briefs">Free research briefs</a></li><li><a href="research.html#method">How we read research</a></li><li><a href="info.html#faq">Questions</a></li></ul></div>'
    }
  };

  function headerHTML() {
    var nav = ["shop", "books", "teachers", "research"].map(function (k) {
      return '<li class="p-item"><button type="button" class="p-link p-trigger" id="t-' + k + '" aria-expanded="false" aria-controls="mm-' + k + '"' + (section === k ? ' data-current="true"' : "") + ">" + MENUS[k].label + I.chev + "</button></li>";
    }).join("") + '<li class="p-item"><a class="p-link" href="info.html#about"' + (section === "about" ? ' aria-current="page"' : "") + ">About</a></li>";
    var panels = Object.keys(MENUS).map(function (k) {
      return '<div class="mm" id="mm-' + k + '" role="region" aria-labelledby="t-' + k + '" hidden><div class="wrap mm-in mm-in--' + k + '">' + MENUS[k].html + "</div></div>";
    }).join("");
    return '<div class="utility"><div class="wrap utility-in"><p>Printed to order, shipped worldwide. Printables arrive by email in minutes.</p>' +
      '<div class="utility-r"><a href="info.html#shipping">Shipping</a><a href="info.html#faq">Help</a>' + currencySelect("u") + "</div></div></div>" +
      '<div class="bar"><div class="wrap bar-in">' +
      '<a class="wordmark" href="index.html" aria-label="Play Before Pixels, home"><span>Play</span> <span>Before</span> <span>Pixels</span></a>' +
      '<nav class="primary" aria-label="Main"><ul class="p-list">' + nav + "</ul></nav>" +
      '<div class="tools">' +
      '<button type="button" class="tool tool-search" data-open-search aria-haspopup="dialog">' + I.search + '<span class="tool-t">Search</span><kbd>/</kbd></button>' +
      '<button type="button" class="tool tool-bag" data-open-bag aria-haspopup="dialog"><span class="tool-t">Bag</span>' + I.bag + '<span class="bag-count" aria-hidden="true">0</span><span class="sr bag-sr">, 0 items</span></button>' +
      '<button type="button" class="tool tool-menu" aria-expanded="false" aria-controls="mobile-menu" aria-haspopup="dialog">' + I.menu + '<span class="tool-t">Menu</span></button>' +
      "</div></div></div>" + panels;
  }

  function currencySelect(idp) {
    return '<label class="cur"><span class="sr">Currency</span><select data-currency id="cur-' + idp + '">' +
      Object.keys(CUR).map(function (c) { return '<option value="' + c + '">' + CUR[c].label + "</option>"; }).join("") + "</select></label>";
  }

  /* ---------- mobile menu ---------- */
  function mobileHTML() {
    function acc(id, label, inner) {
      return '<div class="m-acc"><h2 class="m-acc-h"><button type="button" class="m-acc-b" aria-expanded="' + (section === id ? "true" : "false") + '" aria-controls="m-' + id + '">' + label + I.chev + "</button></h2>" +
        '<div class="m-acc-p" id="m-' + id + '"' + (section === id ? "" : " hidden") + ">" + inner + "</div></div>";
    }
    var ages = '<p class="label">By age</p><ul class="m-ages">' + PBP.AGES.map(function (a) {
      return '<li><a href="shop.html#age=' + a.id + '" style="--tint:' + a.tint + '"><b>' + a.label + "</b> " + a.name + "</a></li>";
    }).join("") + "</ul>";
    return '<div class="mobile" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>' +
      '<div class="m-head"><a class="wordmark" href="index.html"><span>Play</span> <span>Before</span> <span>Pixels</span></a><button type="button" class="m-close" data-close>' + I.close + '<span class="sr">Close menu</span></button></div>' +
      '<div class="m-body">' +
      '<button type="button" class="m-search" data-open-search>' + I.search + "<span>Search books, printables, research</span></button>" +
      acc("shop", "Shop", ages + '<p class="label">By type</p><ul class="m-list">' + typeLinks + '</ul><a class="m-all" href="shop.html">Everything in the shop ' + I.arrow + "</a>") +
      acc("books", "Books", '<ul class="m-list"><li><a href="product.html#up-go-more">Up! Go! More! <small>Board book · 0–3</small></a></li><li><a href="product.html#tablet-slept">The Day the Tablet Slept <small>Picture book · 3–7</small></a></li><li><a href="product.html#mtlt">More Talk, Less Tap <small>Spring 2027</small></a></li><li><a href="product.html#hundred-plays">100 Plays Before Pixels <small>Guide · 0–5</small></a></li><li><a href="info.html#formats">Book formats explained</a></li></ul>') +
      acc("teachers", "For Teachers &amp; Groups", '<ul class="m-list"><li><a href="product.html#classroom">PreK–5 Classroom Pack</a></li><li><a href="product.html#group-kit">Host-it-yourself evening kits</a></li><li><a href="info.html#licenses">How site licenses work</a></li><li><a href="info.html#bulk">Bulk &amp; PTA orders</a></li></ul>') +
      acc("research", "Research", '<ul class="m-list"><li><a href="research.html">The Virtual Autism Project</a></li><li><a href="research.html#studies">What the studies found</a></li><li><a href="research.html#guidelines">Guidelines by age</a></li><li><a href="research.html#school">Screens and school</a></li><li><a href="research.html#briefs">Free research briefs</a></li></ul>') +
      '<a class="m-top" href="info.html#about">About</a>' +
      '<div class="m-foot"><button type="button" class="btn btn--ink" data-open-bag>' + I.bag + ' Bag <span class="bag-count-inline">(0)</span></button>' + currencySelect("m") + "</div>" +
      "</div></div>";
  }

  /* ---------- search ---------- */
  function searchHTML() {
    return '<div class="search" id="search" role="dialog" aria-modal="true" aria-label="Search" hidden><div class="search-in wrap">' +
      '<form class="search-form" role="search" action="shop.html"><label for="q" class="label">Search the shop and the research hub</label>' +
      '<div class="search-row">' + I.search + '<input id="q" name="q" type="search" autocomplete="off" placeholder="Try “board book”, “5–8”, “WHO”" aria-describedby="search-hint"><button type="button" class="search-x" data-close>' + I.close + '<span class="sr">Close search</span></button></div>' +
      '<p id="search-hint" class="search-hint">Press ↓ to move through results, Esc to close.</p></form>' +
      '<div class="search-res" aria-live="polite"></div></div></div>';
  }
  function runSearch(q) {
    q = q.trim().toLowerCase();
    var box = doc.querySelector(".search-res");
    var prods = PBP.PRODUCTS, pages = PBP.PAGES;
    if (q) {
      var terms = q.replace(/-/g, "–").split(/\s+/);
      var hay = function (s) { return s.toLowerCase().replace(/-/g, "–"); };
      prods = prods.filter(function (p) {
        var s = hay([p.title, p.sub, p.kind, p.ageText, p.blurb, p.type, p.ages.map(function (a) { return a.replace("-", "–"); }).join(" ")].join(" "));
        return terms.every(function (t) { return s.indexOf(t) > -1; });
      });
      pages = pages.filter(function (g) { var s = hay(g.t + " " + g.d); return terms.every(function (t) { return s.indexOf(t) > -1; }); });
    } else { prods = prods.slice(0, 4); pages = pages.slice(0, 3); }
    var h = "";
    if (prods.length) h += '<p class="label">' + (q ? "Products" : "Popular") + '</p><ul class="sr-list">' + prods.map(function (p) {
      return '<li><a href="product.html#' + p.id + '"><span class="sr-img" style="--ground:' + p.ground + '"><img src="' + p.photo + '" alt=""></span><span><b>' + esc(p.title) + "</b><small>" + esc(p.kind) + " · " + esc(p.ageText) + "</small></span><em>" + (PBP.fromPrice(p) ? PBP.price(PBP.fromPrice(p)) : "Free") + "</em></a></li>";
    }).join("") + "</ul>";
    if (pages.length) h += '<p class="label">' + (q ? "Pages" : "Research &amp; help") + '</p><ul class="sr-list sr-list--pages">' + pages.map(function (g) {
      return '<li><a href="' + g.u + '"><span><b>' + esc(g.t) + "</b><small>" + esc(g.d) + "</small></span></a></li>";
    }).join("") + "</ul>";
    if (!h) h = '<p class="sr-empty">Nothing matches “' + esc(q) + '”. Try an age like “1–3”, or <a href="shop.html">browse the whole shop</a>.</p>';
    box.innerHTML = h;
  }

  /* ---------- bag ---------- */
  var bag = load("pbp-bag", []);
  function bagHTML() {
    return '<div class="drawer" id="bag" role="dialog" aria-modal="true" aria-labelledby="bag-h" hidden>' +
      '<div class="drawer-head"><h2 id="bag-h" tabindex="-1">Your bag</h2><button type="button" class="drawer-x" data-close>' + I.close + '<span class="sr">Close bag</span></button></div>' +
      '<div class="drawer-body"></div></div><div class="scrim" hidden></div>';
  }
  function bagCount() { return bag.reduce(function (n, i) { return n + i.q; }, 0); }
  function findFmt(p, f) { return p.formats.find(function (x) { return x.id === f; }) || p.formats[0]; }
  function renderBag() {
    var n = bagCount();
    doc.querySelectorAll(".bag-count").forEach(function (el) { el.textContent = n; el.classList.toggle("is-empty", !n); });
    doc.querySelectorAll(".bag-sr").forEach(function (el) { el.textContent = ", " + n + (n === 1 ? " item" : " items"); });
    doc.querySelectorAll(".bag-count-inline").forEach(function (el) { el.textContent = "(" + n + ")"; });
    var b = doc.querySelector("#bag .drawer-body"); if (!b) return;
    if (!bag.length) {
      b.innerHTML = '<div class="bag-empty"><p class="bag-empty-t">Nothing in here yet.</p><p>Start with the age of the child you’re shopping for.</p>' + PBP.ageScale("links", [], { noAxis: true, compact: true }) + '<a class="btn btn--ink" href="shop.html">Browse the shop ' + I.arrow + "</a></div>";
      return;
    }
    var sub = 0, digital = false, physical = false;
    var rows = bag.map(function (it, i) {
      var p = PBP.byId(it.id); if (!p) return "";
      var f = findFmt(p, it.f); sub += f.price * it.q;
      if (/email|Delivered|License/i.test(f.note)) digital = true; else physical = true;
      return '<li class="bag-row"><a class="bag-img" href="product.html#' + p.id + '" style="--ground:' + p.ground + '" tabindex="-1" aria-hidden="true"><img src="' + p.photo + '" alt=""></a>' +
        '<div class="bag-info"><a class="bag-t" href="product.html#' + p.id + '">' + esc(p.title) + '</a><span class="bag-f">' + esc(f.label) + (it.s ? ", size " + esc(it.s) : "") + "</span>" +
        '<div class="qty" role="group" aria-label="Quantity of ' + esc(p.title) + '"><button type="button" data-q="' + i + '" data-d="-1" aria-label="One fewer">−</button><output aria-live="polite">' + it.q + '</output><button type="button" data-q="' + i + '" data-d="1" aria-label="One more">+</button></div></div>' +
        '<div class="bag-r">' + PBP.price(f.price * it.q) + '<button type="button" class="bag-rm" data-rm="' + i + '">Remove<span class="sr"> ' + esc(p.title) + "</span></button></div></li>";
    }).join("");
    var notes = [];
    if (physical) notes.push("Printed items are made to order by our print partners and may arrive separately.");
    if (digital) notes.push("Downloads and licenses arrive by email the moment you pay.");
    b.innerHTML = '<ul class="bag-list">' + rows + "</ul>" +
      '<div class="bag-foot"><dl class="bag-sum"><div><dt>Subtotal</dt><dd>' + PBP.price(sub) + '</dd></div><div><dt>Shipping &amp; tax</dt><dd>At checkout</dd></div></dl>' +
      '<p class="bag-note">' + notes.join(" ") + "</p>" +
      '<button type="button" class="btn btn--ink btn--block" data-checkout>Check out ' + I.arrow + "</button>" +
      '<p class="bag-msg" role="status"></p><button type="button" class="link-btn" data-close>Keep shopping</button></div>';
  }
  PBP.add = function (id, f, q, s) {
    var ex = bag.find(function (i) { return i.id === id && i.f === f && (i.s || "") === (s || ""); });
    if (ex) ex.q += q || 1; else bag.push({ id: id, f: f, q: q || 1, s: s || "" });
    save("pbp-bag", bag); renderBag(); openLayer("bag");
  };

  /* ---------- layers: dialogs with focus trap ---------- */
  var openId = null, lastFocus = null;
  function focusables(el) {
    return Array.prototype.filter.call(el.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])'), function (x) { return x.offsetParent !== null || x === doc.activeElement; });
  }
  function setInert(on) {
    ["pbp-header", "main", "pbp-footer"].forEach(function (id) {
      var el = doc.getElementById(id); if (!el) return;
      if (on) el.setAttribute("inert", ""); else el.removeAttribute("inert");
    });
  }
  function openLayer(id) {
    if (openId && openId !== id) closeLayer(true);
    closeMega();
    var el = doc.getElementById(id); if (!el) return;
    if (!openId) lastFocus = doc.activeElement;
    openId = id; el.hidden = false; body.classList.add("is-locked");
    if (id === "bag") doc.querySelector(".scrim").hidden = false;
    setInert(true);
    requestAnimationFrame(function () { el.classList.add("is-open"); });
    if (id === "mobile-menu") doc.querySelector(".tool-menu").setAttribute("aria-expanded", "true");
    var target = id === "search" ? el.querySelector("input") : id === "bag" ? el.querySelector("#bag-h") : el.querySelector(".m-close");
    if (target) target.focus();
    if (id === "search") runSearch(el.querySelector("input").value);
  }
  function closeLayer(swap) {
    if (!openId) return;
    var el = doc.getElementById(openId);
    el.classList.remove("is-open"); el.hidden = true;
    if (openId === "bag") doc.querySelector(".scrim").hidden = true;
    if (openId === "mobile-menu") doc.querySelector(".tool-menu").setAttribute("aria-expanded", "false");
    openId = null;
    if (!swap) { body.classList.remove("is-locked"); setInert(false); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  }
  PBP.openLayer = openLayer; PBP.closeLayer = closeLayer;

  /* ---------- mega-menu ---------- */
  var megaOpen = null, hoverT = null;
  function openMega(k, focusFirst) {
    if (megaOpen === k) return;
    closeMega(true);
    var t = doc.getElementById("t-" + k), p = doc.getElementById("mm-" + k);
    t.setAttribute("aria-expanded", "true"); p.hidden = false; megaOpen = k;
    doc.querySelector(".mm-scrim").hidden = false;
    doc.getElementById("pbp-header").classList.add("mega-on");
    if (focusFirst) { var f = focusables(p)[0]; f && f.focus(); }
  }
  function closeMega(keepScrim) {
    if (!megaOpen) return;
    doc.getElementById("t-" + megaOpen).setAttribute("aria-expanded", "false");
    doc.getElementById("mm-" + megaOpen).hidden = true; megaOpen = null;
    if (!keepScrim) { doc.querySelector(".mm-scrim").hidden = true; doc.getElementById("pbp-header").classList.remove("mega-on"); }
  }

  /* ---------- footer ---------- */
  function footerHTML() {
    var L = window.PBP_LINKS || {};
    var socialKeys = [["instagram", "Instagram"], ["pinterest", "Pinterest"], ["facebook", "Facebook"], ["tiktok", "TikTok"], ["youtube", "YouTube"], ["threads", "Threads"], ["x", "X"], ["linkedin", "LinkedIn"], ["substack", "Substack"]];
    var storeKeys = [["amazon_author", "Amazon"], ["bookshop", "Bookshop.org"], ["etsy", "Etsy"], ["tpt", "Teachers Pay Teachers"], ["faire", "Faire (wholesale)"], ["bn_press", "Barnes & Noble"], ["kobo", "Kobo"], ["apple_books", "Apple Books"], ["google_play_books", "Google Play Books"]];
    function list(keys) {
      return keys.filter(function (k) { return typeof L[k[0]] === "string" && /^https:\/\//.test(L[k[0]].trim()); })
        .map(function (k) { return '<li><a href="' + esc(L[k[0]].trim()) + '" rel="noopener" target="_blank">' + esc(k[1]) + '<span class="sr"> (opens in a new tab)</span></a></li>'; }).join("");
    }
    var social = list(socialKeys), stores = list(storeKeys);
    var yr = "2026";
    return '<footer class="foot"><div class="wrap">' +
      '<div class="foot-top"><div class="foot-sign"><a class="wordmark wordmark--big" href="index.html"><span>Play</span> <span>Before</span> <span>Pixels</span></a>' +
      '<p class="foot-line">Books, printables and kits for talk, touch and play. Founded by a parent and educator.</p></div>' +
      '<form class="foot-news" data-news><label for="news-e" class="label">One play idea a week, by email</label><div class="foot-news-row"><input id="news-e" type="email" required autocomplete="email" placeholder="you@example.com"><button class="btn btn--sun" type="submit">Sign up</button></div><p class="foot-news-msg" role="status"></p></form></div>' +
      '<div class="foot-cols">' +
      '<nav aria-label="Shop"><p class="label">Shop</p><ul><li><a href="shop.html">Everything</a></li>' + PBP.AGES.map(function (a) { return '<li><a href="shop.html#age=' + a.id + '">Ages ' + a.label + "</a></li>"; }).join("") + "</ul></nav>" +
      '<nav aria-label="By type"><p class="label">By type</p><ul><li><a href="shop.html#type=books">Books</a></li><li><a href="shop.html#type=printable">Printables</a></li><li><a href="shop.html#type=cards">Card decks</a></li><li><a href="shop.html#type=course">Written course</a></li><li><a href="shop.html#type=merch">Merch</a></li></ul></nav>' +
      '<nav aria-label="Teachers and groups"><p class="label">Teachers &amp; groups</p><ul><li><a href="product.html#classroom">Classroom Pack</a></li><li><a href="product.html#group-kit">Evening kits</a></li><li><a href="info.html#licenses">Site licenses</a></li><li><a href="info.html#bulk">Bulk orders</a></li></ul></nav>' +
      '<nav aria-label="Research"><p class="label">Research</p><ul><li><a href="research.html">Virtual Autism Project</a></li><li><a href="research.html#studies">The studies</a></li><li><a href="research.html#guidelines">Guidelines by age</a></li><li><a href="research.html#briefs">Free briefs</a></li></ul></nav>' +
      '<nav aria-label="Help"><p class="label">Help</p><ul><li><a href="info.html#shipping">Shipping</a></li><li><a href="info.html#returns">Returns &amp; refunds</a></li><li><a href="info.html#faq">Questions</a></li><li><a href="info.html#contact">Contact</a></li><li><a href="info.html#about">About</a></li></ul></nav>' +
      (stores ? '<nav aria-label="Also sold at"><p class="label">Also sold at</p><ul>' + stores + "</ul></nav>" : "") +
      (social ? '<nav aria-label="Follow"><p class="label">Follow</p><ul>' + social + "</ul></nav>" : "") +
      "</div>" +
      '<div class="foot-set"><label class="foot-sel"><span class="label">Language</span><select id="lang"><option value="en" selected>English</option><option disabled>Español · 2027</option><option disabled>Français · 2027</option><option disabled>Deutsch · 2027</option></select></label>' +
      '<label class="foot-sel"><span class="label">Currency</span>' + currencySelect("f").replace('<label class="cur"><span class="sr">Currency</span>', "").replace("</select></label>", "</select>") + "</label>" +
      '<p class="foot-fine">Prices in other currencies are set locally and rounded; taxes and duties are shown at checkout.</p></div>' +
      '<div class="foot-legal"><p>© ' + yr + " AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.</p>" +
      '<ul><li><a href="info.html#privacy">Privacy</a></li><li><a href="info.html#terms">Terms</a></li><li><a href="info.html#cookies">Cookies</a></li><li><a href="info.html#accessibility">Accessibility</a></li><li><a href="info.html#licenses">License terms</a></li></ul>' +
      '<p class="foot-fine">Our books and printables are parent education. They are not medical advice, diagnosis or treatment.</p></div>' +
      "</div></footer>";
  }

  /* ---------- mount ---------- */
  var hdr = doc.getElementById("pbp-header"), ftr = doc.getElementById("pbp-footer");
  if (hdr) hdr.innerHTML = headerHTML();
  if (ftr) ftr.innerHTML = footerHTML();
  var layers = doc.createElement("div");
  layers.innerHTML = '<div class="mm-scrim" hidden></div>' + mobileHTML() + searchHTML() + bagHTML();
  while (layers.firstChild) body.appendChild(layers.firstChild);
  refreshMoney();

  /* ---------- events ---------- */
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  doc.querySelectorAll(".p-trigger").forEach(function (t) {
    var k = t.id.slice(2);
    t.addEventListener("click", function () { if (megaOpen === k) closeMega(); else openMega(k, false); });
    t.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); openMega(k, true); }
    });
    if (fine) {
      t.parentNode.addEventListener("mouseenter", function () { clearTimeout(hoverT); hoverT = setTimeout(function () { openMega(k); }, megaOpen ? 0 : 120); });
    }
  });
  if (fine && hdr) {
    hdr.addEventListener("mouseleave", function () { clearTimeout(hoverT); hoverT = setTimeout(function () { closeMega(); }, 220); });
    hdr.addEventListener("mouseenter", function () { if (megaOpen) clearTimeout(hoverT); });
    doc.querySelectorAll(".p-item > a").forEach(function (a) { a.addEventListener("mouseenter", function () { clearTimeout(hoverT); hoverT = setTimeout(closeMega, 120); }); });
  }
  /* left/right arrows move across the top-level items */
  var tops = Array.prototype.slice.call(doc.querySelectorAll(".p-link"));
  tops.forEach(function (el, i) {
    el.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      var n = tops[(i + (e.key === "ArrowRight" ? 1 : tops.length - 1)) % tops.length];
      var wasOpen = !!megaOpen; n.focus();
      if (wasOpen && n.classList.contains("p-trigger")) openMega(n.id.slice(2)); else if (wasOpen) closeMega();
    });
  });
  /* close mega when focus leaves header, or a link inside is used */
  if (hdr) hdr.addEventListener("focusout", function (e) { if (megaOpen && !hdr.contains(e.relatedTarget)) closeMega(); });
  doc.querySelectorAll(".mm a").forEach(function (a) { a.addEventListener("click", function () { closeMega(); }); });
  var scr = doc.querySelector(".mm-scrim"); if (scr) scr.addEventListener("click", function () { closeMega(); });

  doc.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target : e.target.parentNode;
    var o;
    if ((o = t.closest("[data-open-search]"))) { e.preventDefault(); openLayer("search"); return; }
    if ((o = t.closest("[data-open-bag]"))) { e.preventDefault(); openLayer("bag"); return; }
    if (t.closest(".tool-menu")) { openLayer("mobile-menu"); return; }
    if (t.closest("[data-close]")) { closeLayer(); return; }
    if (t.closest(".scrim")) { closeLayer(); return; }
    if ((o = t.closest("[data-add]"))) { PBP.add(o.getAttribute("data-add"), o.getAttribute("data-fmt"), 1); return; }
    if ((o = t.closest("[data-q]"))) {
      var i = +o.getAttribute("data-q"); bag[i].q = Math.max(1, bag[i].q + +o.getAttribute("data-d"));
      save("pbp-bag", bag); renderBag(); var nb = doc.querySelector('[data-q="' + i + '"][data-d="' + o.getAttribute("data-d") + '"]'); nb && nb.focus(); return;
    }
    if ((o = t.closest("[data-rm]"))) { bag.splice(+o.getAttribute("data-rm"), 1); save("pbp-bag", bag); renderBag(); doc.getElementById("bag-h").focus(); return; }
    if (t.closest("[data-checkout]")) {
      var m = doc.querySelector(".bag-msg");
      m.textContent = "This is a design concept: at launch, checkout opens our secure store. Your bag is saved on this device.";
      return;
    }
    if ((o = t.closest(".m-acc-b"))) {
      var ex = o.getAttribute("aria-expanded") === "true";
      o.setAttribute("aria-expanded", String(!ex)); doc.getElementById(o.getAttribute("aria-controls")).hidden = ex; return;
    }
    /* links inside a dialog: close it so same-page hash links land correctly */
    if (openId && (o = t.closest("a[href]")) && doc.getElementById(openId).contains(o)) { closeLayer(true); body.classList.remove("is-locked"); setInert(false); }
  });

  doc.addEventListener("change", function (e) {
    if (e.target.matches("select[data-currency]")) setCurrency(e.target.value);
  });
  doc.addEventListener("submit", function (e) {
    var f = e.target;
    if (f.matches("[data-news]")) {
      e.preventDefault();
      f.querySelector(".foot-news-msg").textContent = "Thank you. Check your inbox to confirm; the first play arrives on Sunday.";
    } else if (f.matches(".search-form")) {
      e.preventDefault(); var a = doc.querySelector(".search-res a"); if (a) { closeLayer(true); body.classList.remove("is-locked"); setInert(false); location.href = a.getAttribute("href"); }
    }
  });
  var qi = doc.getElementById("q");
  if (qi) qi.addEventListener("input", function () { runSearch(qi.value); });

  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (openId) { e.preventDefault(); closeLayer(); return; }
      if (megaOpen) { var k = megaOpen; closeMega(); doc.getElementById("t-" + k).focus(); return; }
    }
    if (e.key === "/" && !openId && !/INPUT|TEXTAREA|SELECT/.test(doc.activeElement.tagName)) { e.preventDefault(); openLayer("search"); return; }
    if (openId === "search" && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      var links = Array.prototype.slice.call(doc.querySelectorAll(".search-res a"));
      if (!links.length) return;
      e.preventDefault();
      var idx = links.indexOf(doc.activeElement);
      if (e.key === "ArrowDown") (links[idx + 1] || links[0]).focus();
      else if (idx <= 0) qi.focus(); else links[idx - 1].focus();
      return;
    }
    if (e.key === "Tab" && openId) {
      var el = doc.getElementById(openId), f = focusables(el);
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (doc.activeElement === first || !el.contains(doc.activeElement))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (doc.activeElement === last || !el.contains(doc.activeElement))) { e.preventDefault(); first.focus(); }
    }
  });
  /* the mobile menu is for small screens: close it if the window grows past the breakpoint */
  var mq = window.matchMedia("(min-width: 1080px)");
  (mq.addEventListener ? mq.addEventListener.bind(mq, "change") : mq.addListener.bind(mq))(function (m) { if (m.matches && openId === "mobile-menu") closeLayer(); if (!m.matches) closeMega(); });

  /* hash links to the current page: re-run page hash handlers */
  PBP.onHash = function (fn) { window.addEventListener("hashchange", fn); fn(); };

  /* open a layer from the URL, for screenshots and deep links: ?open=menu|bag|search */
  var qp = new URLSearchParams(location.search).get("open");
  if (qp === "menu") openLayer("mobile-menu"); else if (qp === "bag") openLayer("bag"); else if (qp === "search") openLayer("search");
  if (qp === "mega") openMega(new URLSearchParams(location.search).get("m") || "shop");
})();
