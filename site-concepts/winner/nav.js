/* Play Before Pixels — Concept C: shared navigation and page behaviour.
   Everything degrades to plain links. Browser storage is used only for the cart and the
   chosen currency, and every read/write is wrapped so the page works without it. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var CAT = window.PBP_CATALOG || [];
  var byId = function (id) { return CAT.filter(function (p) { return p.id === id; })[0]; };
  var esc = window.PBP_esc || function (s) { return s; };
  var mem = {};
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return k in mem ? mem[k] : d; } },
    set: function (k, v) { mem[k] = v; try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  };
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------------- Currency ---------------- */
  var RATES = { USD: 1, GBP: 0.79, EUR: 0.92, CAD: 1.37, AUD: 1.52 };
  var cur = store.get('pbp-cur', 'USD'); if (!RATES[cur]) cur = 'USD';
  function money(usd) {
    var v = Math.round(usd * RATES[cur] * 100) / 100;
    try { return (cur === 'USD' ? '' : '≈ ') + new Intl.NumberFormat('en-US', { style: 'currency', currency: cur }).format(v); }
    catch (e) { return '$' + v.toFixed(2); }
  }
  function applyPrices(root) { $$('[data-usd]', root).forEach(function (el) { el.textContent = money(+el.getAttribute('data-usd')); }); }
  function initCurrency() {
    $$('[data-currency]').forEach(function (sel) {
      sel.value = cur;
      sel.addEventListener('change', function () {
        cur = sel.value; store.set('pbp-cur', cur);
        $$('[data-currency]').forEach(function (s) { s.value = cur; });
        applyPrices(); renderCart();
        toast(cur === 'USD' ? 'Prices shown in US dollars' : 'Prices shown in ' + cur + ' are estimates. Checkout shows the exact amount.', false);
      });
    });
    applyPrices();
  }

  /* ---------------- Screen-reader announcer ---------------- */
  var ann = document.createElement('p'); ann.className = 'visually-hidden'; ann.setAttribute('aria-live', 'polite'); ann.setAttribute('data-announce', '');
  document.body.appendChild(ann);
  function announce(msg) { ann.textContent = ''; setTimeout(function () { ann.textContent = msg; }, 60); }

  /* ---------------- Skip link: move real focus to <main>, not just the scroll position ---------------- */
  (function () {
    var main = document.getElementById('main'); if (!main) return;
    if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
    function toMain(e) { if (e) e.preventDefault(); main.focus(); main.scrollIntoView(); } // hash is left alone so shop filters survive
    $$('.skip-link').forEach(function (a) { a.addEventListener('click', toMain); });
    if (location.hash === '#main') setTimeout(function () { main.focus(); }, 0);
  })();

  /* ---------------- Focus helpers & dialogs ---------------- */
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  function focusables(root) {
    return $$(FOCUSABLE, root).filter(function (el) { return el.getClientRects().length && !el.closest('[hidden]') && getComputedStyle(el).visibility !== 'hidden'; });
  }
  var stack = [];
  function setInert(on, keep) {
    $$('body > *').forEach(function (el) {
      if (el === keep || el.tagName === 'SCRIPT' || el.classList.contains('scrim') || el.hasAttribute('data-toast')) return;
      if (on) { if (!el.inert) { el.inert = true; el.setAttribute('data-was-inert', ''); } }
      else if (el.hasAttribute('data-was-inert')) { el.inert = false; el.removeAttribute('data-was-inert'); }
    });
  }
  function openDialog(id, trigger) {
    var d = document.getElementById(id); if (!d) return;
    if (d.classList.contains('is-open')) return;
    closeMega(false);
    if (stack.length) { var top = stack[stack.length - 1]; closeDialog(top, false); }
    d._trigger = trigger || document.activeElement;
    d.classList.add('is-open');
    var sc = $('[data-scrim="' + id + '"]'); if (sc) sc.classList.add('is-open');
    document.body.classList.add('is-locked');
    stack.push(d); setInert(false); setInert(true, d);
    if (id === 'mnav') $$('[data-open-menu]').forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
    if (d.onOpen) d.onOpen();
    var f0 = $('[data-autofocus]', d) || focusables(d)[0]; if (f0) f0.focus();
    setTimeout(function () { if (!d.contains(document.activeElement)) { var f = $('[data-autofocus]', d) || focusables(d)[0]; if (f) f.focus(); } }, 40);
  }
  function closeDialog(d, restore) {
    if (!d || !d.classList.contains('is-open')) return;
    d.classList.remove('is-open');
    var sc = $('[data-scrim="' + d.id + '"]'); if (sc) sc.classList.remove('is-open');
    stack = stack.filter(function (x) { return x !== d; });
    setInert(false);
    if (!stack.length) document.body.classList.remove('is-locked'); else setInert(true, stack[stack.length - 1]);
    if (d.id === 'mnav') $$('[data-open-menu]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    if (d.onClose) d.onClose();
    if (restore !== false) {
      var t = d._trigger;
      if (t && document.contains(t) && t.getClientRects().length) t.focus();
      else { var h = $('main h1'); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); } }
    }
  }
  window.PBP_openDialog = openDialog; window.PBP_closeDialog = closeDialog;

  document.addEventListener('keydown', function (e) {
    var top = stack[stack.length - 1];
    if (e.key === 'Escape') {
      if (top) { e.preventDefault(); closeDialog(top); return; }
      if (openMega) { e.preventDefault(); openMega.parentElement._hoverLock = true; closeMega(true); return; }
    }
    if (e.key === 'Tab' && top) {
      var f = focusables(top); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (!top.contains(document.activeElement)) { e.preventDefault(); first.focus(); return; }
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (e.key === '/' && !top && !/^(INPUT|TEXTAREA|SELECT)$/.test((document.activeElement || {}).tagName || '') && !e.metaKey && !e.ctrlKey) {
      e.preventDefault(); openDialog('search', document.activeElement);
    }
  });
  document.addEventListener('click', function (e) {
    var c = e.target.closest('[data-close]'); if (c) { closeDialog(c.closest('[data-dialog]')); return; }
    var sc = e.target.closest('.scrim'); if (sc) { closeDialog(document.getElementById(sc.getAttribute('data-scrim'))); return; }
    var o;
    if ((o = e.target.closest('[data-open-cart]'))) { e.preventDefault(); openDialog('cart', o); return; }
    if ((o = e.target.closest('[data-open-search]'))) { e.preventDefault(); openDialog('search', o); return; }
    if ((o = e.target.closest('[data-open-menu]'))) { e.preventDefault(); openDialog('mnav', o); return; }
    var add = e.target.closest('[data-add]');
    if (add) { e.preventDefault(); addToCart(add.getAttribute('data-add'), add.getAttribute('data-format'), 1, false); return; }
    // Links inside an open drawer that point elsewhere on the same page: close the drawer first.
    var a = e.target.closest('a[href]');
    if (a && stack.length) {
      var u = new URL(a.getAttribute('href'), location.href);
      if (u.pathname === location.pathname && u.hash) { closeDialog(stack[stack.length - 1], false); }
    }
  });

  /* ---------------- Mega menus (disclosure pattern) ---------------- */
  var openMega = null, openedAt = 0, hoverT = null;
  var scrim = $('[data-nav-scrim]');
  function panelOf(btn) { return document.getElementById(btn.getAttribute('data-mega')); }
  function openMegaPanel(btn) {
    if (openMega === btn) return;
    closeMega(false);
    panelOf(btn).classList.add('is-open'); btn.setAttribute('aria-expanded', 'true');
    if (scrim) scrim.classList.add('is-open');
    openMega = btn; openedAt = Date.now();
  }
  function closeMega(focusBtn) {
    clearTimeout(hoverT);
    if (!openMega) return;
    var b = openMega; openMega = null;
    panelOf(b).classList.remove('is-open'); b.setAttribute('aria-expanded', 'false');
    if (scrim) scrim.classList.remove('is-open');
    if (focusBtn) b.focus();
  }
  $$('[data-mega]').forEach(function (btn) {
    var li = btn.parentElement; var panel = panelOf(btn);
    btn.addEventListener('click', function () {
      if (openMega === btn) { if (Date.now() - openedAt > 450) { clearTimeout(hoverT); btn.parentElement._hoverLock = true; closeMega(false); } }
      else openMegaPanel(btn);
    });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); openMegaPanel(btn); var f = focusables(panel)[0]; if (f) f.focus(); }
    });
    if (finePointer) {
      li.addEventListener('mouseenter', function () { if (li._hoverLock) return; clearTimeout(hoverT); hoverT = setTimeout(function () { openMegaPanel(btn); }, openMega ? 0 : 110); });
      li.addEventListener('mouseleave', function () { li._hoverLock = false; clearTimeout(hoverT); hoverT = setTimeout(function () { if (openMega === btn) closeMega(false); }, 220); });
    }
    // After a deliberate close (link chosen or trigger clicked shut), don't let hover reopen it until the pointer leaves.
    panel.addEventListener('click', function (e) { if (e.target.closest('a')) { clearTimeout(hoverT); li._hoverLock = true; closeMega(false); } });
  });
  if (scrim) scrim.addEventListener('click', function () { closeMega(false); });
  var hdr = $('.site-header');
  if (hdr) hdr.addEventListener('focusout', function (e) {
    if (openMega && (!e.relatedTarget || !openMega.parentElement.contains(e.relatedTarget))) {
      if (e.relatedTarget && e.relatedTarget.hasAttribute('data-mega')) return; // moving to another trigger
      closeMega(false);
    }
  });
  document.addEventListener('click', function (e) { if (openMega && !e.target.closest('.primary-nav')) closeMega(false); });

  /* ---------------- Mobile menu accordions ---------------- */
  $$('.acc-btn[aria-controls]').forEach(function (b) {
    b.addEventListener('click', function () {
      var p = document.getElementById(b.getAttribute('aria-controls'));
      var open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!open)); p.hidden = open;
    });
  });
  // Expand the section for the current page in the mobile menu
  (function () {
    var map = { shop: 'm-shop', books: 'm-books', teach: 'm-teach', research: 'm-research' };
    var cur = $('.nav-top.is-current[data-mega]');
    if (cur) { var key = Object.keys(map).filter(function (k) { return cur.getAttribute('aria-controls').indexOf(k) > -1; })[0]; var b = key && $('[aria-controls="' + map[key] + '"]'); if (b) b.click(); }
  })();
  // Close the mobile menu if the viewport grows past the breakpoint
  window.addEventListener('resize', function () { var m = $('#mnav'); if (m && m.classList.contains('is-open') && window.innerWidth > 1060) closeDialog(m, false); });

  /* ---------------- Search ---------------- */
  var sInput = $('[data-search-input]'), sOut = $('[data-search-results]'), sForm = $('[data-search-form]'), sSel = -1;
  var TYPE = {}; (window.PBP_TYPES || []).forEach(function (t) { TYPE[t.key] = t.label; });
  function hl(text, toks) {
    var s = esc(text); toks.forEach(function (t) { if (t.length > 1) s = s.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); }); return s;
  }
  function norm(s) { return String(s).toLowerCase().replace(/[’']/g, '').replace(/[–—-]/g, '-'); }
  function renderSearch() {
    if (!sOut) return;
    var q = norm(sInput.value.trim()); sSel = -1; sInput.removeAttribute('aria-activedescendant');
    if (!q) {
      sOut.innerHTML = '<p class="grp">Try</p><div class="search-sugg">' +
        [['Board books', 'shop.html#type=board'], ['Ages 1–3', 'shop.html#age=1-3'], ['Ages 5–8', 'shop.html#age=5-8'], ['Printables', 'shop.html#c=printables'], ['Site licenses', 'info.html#licenses'], ['Virtual autism', 'research.html#term'], ['Shipping', 'info.html#shipping']]
          .map(function (x) { return '<a class="chip" href="' + x[1] + '">' + x[0] + '</a>'; }).join('') +
        '</div><p class="search-hint">Search by title, age (like “3–5”), type or question.</p>';
      return;
    }
    var toks = q.split(/\s+/).filter(Boolean);
    var prods = CAT.map(function (p) {
      var hay = norm([p.title, p.line, TYPE[p.type], p.ageText, p.stamp, p.ages.join(' ')].join(' '));
      var t = norm(p.title), sc = 0;
      toks.forEach(function (k) { if (t.indexOf(k) > -1) sc += 3; else if (hay.indexOf(k) > -1) sc += 1; else sc -= 5; });
      return { p: p, s: sc };
    }).filter(function (x) { return x.s > 0; }).sort(function (a, b) { return b.s - a.s; }).slice(0, 6);
    var pages = (window.PBP_PAGES || []).map(function (g) {
      var hay = norm(g.title + ' ' + g.text), sc = 0;
      toks.forEach(function (k) { if (norm(g.title).indexOf(k) > -1) sc += 2; else if (hay.indexOf(k) > -1) sc += 1; else sc -= 5; });
      return { g: g, s: sc };
    }).filter(function (x) { return x.s > 0; }).sort(function (a, b) { return b.s - a.s; }).slice(0, 6);
    var i = 0, html = '';
    if (prods.length) html += '<p class="grp" id="sg-p">Products</p><ul role="group" aria-labelledby="sg-p">' + prods.map(function (x) {
      var p = x.p;
      return '<li><a role="option" id="sr-' + (i++) + '" href="' + window.PBP_href(p) + '"><span class="th g-' + p.ground + '" style="background:var(--g)"><img src="' + (p.imgs ? p.imgs[0] : p.img) + '" alt=""></span><span><b>' + hl(p.title, toks) + '</b><small>' + esc(TYPE[p.type]) + ' · ' + esc(p.ageText) + '</small></span><span class="price" data-usd="' + window.PBP_minPrice(p) + '"></span></a></li>';
    }).join('') + '</ul>';
    if (pages.length) html += '<p class="grp" id="sg-g">Pages and answers</p><ul role="group" aria-labelledby="sg-g">' + pages.map(function (x) {
      var g = x.g;
      return '<li><a role="option" id="sr-' + (i++) + '" href="' + g.url + '"><span class="th txt">' + esc(g.kind.slice(0, 4)).toUpperCase() + '</span><span><b>' + hl(g.title, toks) + '</b><small>' + esc(g.kind) + '</small></span><span aria-hidden="true">→</span></a></li>';
    }).join('') + '</ul>';
    if (!html) html = '<p class="search-hint" role="status">Nothing matches “' + esc(sInput.value) + '”. Try an age like 3–5, or a type like printables.</p><div class="search-sugg"><a class="chip" href="shop.html">Browse everything</a><a class="chip" href="info.html#help">Help centre</a></div>';
    if (html) html += '<p class="search-all"><a class="link" href="shop.html#q=' + encodeURIComponent(sInput.value.trim()) + '">See every product matching “' + esc(sInput.value.trim()) + '” <span class="arr" aria-hidden="true">→</span></a></p>';
    sOut.innerHTML = html; applyPrices(sOut);
  }
  function moveSel(d) {
    var opts = $$('[role="option"]', sOut); if (!opts.length) return;
    if (sSel > -1 && opts[sSel]) opts[sSel].removeAttribute('aria-selected');
    sSel = (sSel + d + opts.length) % opts.length;
    opts[sSel].setAttribute('aria-selected', 'true'); sInput.setAttribute('aria-activedescendant', opts[sSel].id);
    opts[sSel].scrollIntoView({ block: 'nearest' });
  }
  if (sInput) {
    sInput.setAttribute('data-autofocus', '');
    sInput.addEventListener('input', renderSearch);
    sInput.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveSel(1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); moveSel(-1); }
    });
    sForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var opts = $$('[role="option"]', sOut); var t = sSel > -1 ? opts[sSel] : null; var q = sInput.value.trim();
      closeDialog($('#search'), false);
      // Highlighted result wins; otherwise a typed query goes to the filtered shop; empty goes to everything.
      location.href = t ? t.getAttribute('href') : q ? 'shop.html#q=' + encodeURIComponent(q) : 'shop.html';
    });
    sOut.addEventListener('click', function (e) { if (e.target.closest('a')) closeDialog($('#search'), false); });
    $('#search').onOpen = function () { renderSearch(); sInput.select(); };
  }

  /* ---------------- Cart ---------------- */
  var cart = store.get('pbp-cart', []).filter(function (i) { return byId(i.id); });
  function fmtOf(p, f) { return p.formats.filter(function (x) { return x.id === f; })[0] || p.formats[0]; }
  function saveCart() { store.set('pbp-cart', cart); }
  function count() { return cart.reduce(function (n, i) { return n + i.q; }, 0); }
  function renderCount(bump) {
    var n = count();
    $$('[data-cart-count]').forEach(function (el) { el.textContent = n; if (bump) { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); setTimeout(function () { el.classList.remove('bump'); }, 260); } });
    $$('[data-cart-btn]').forEach(function (el) { el.setAttribute('aria-label', 'Cart, ' + n + (n === 1 ? ' item' : ' items')); });
    $$('[data-cart-sr]').forEach(function (el) { el.textContent = ', ' + n + (n === 1 ? ' item' : ' items'); });
  }
  function renderCart() {
    var body = $('[data-cart-body]'), foot = $('[data-cart-foot]'); if (!body) return;
    renderCount(false);
    if (!cart.length) {
      body.innerHTML = '<div class="cart-empty"><p class="hand" style="margin-bottom:10px">Nothing in here yet.</p><p>Start with your child’s age:</p><div class="search-sugg">' +
        (window.PBP_BANDS || []).map(function (b) { return '<a class="chip" href="shop.html#age=' + b.key + '"><span class="dot dot-' + b.color + '" style="background:var(--' + b.color + ')"></span>' + b.label + '</a>'; }).join('') + '</div></div>';
      foot.innerHTML = '<a class="link" href="shop.html">Browse everything <span class="arr" aria-hidden="true">→</span></a>';
      return;
    }
    var sub = 0, digital = false, printed = false;
    body.innerHTML = '<ul class="cart-list">' + cart.map(function (it, idx) {
      var p = byId(it.id), f = fmtOf(p, it.f), line = f.price * it.q; sub += line;
      if (/Instant|email/.test(f.ship)) digital = true; else printed = true;
      return '<li class="cart-item"><a class="thumb g-' + p.ground + '" style="background:var(--g)" href="' + window.PBP_href(p) + '" tabindex="-1" aria-hidden="true"><img src="' + (p.imgs ? p.imgs[0] : p.img) + '" alt=""></a>' +
        '<div><h3><a href="' + window.PBP_href(p) + '" style="text-decoration:none">' + esc(p.title) + '</a></h3><p class="fmt">' + esc(f.label) + ' · ' + esc(f.detail.split(' · ')[0]) + '</p>' +
        '<div style="display:flex;align-items:center"><span class="qty"><button type="button" data-q="' + idx + '" data-d="-1" aria-label="One fewer ' + esc(p.title) + '">−</button><output aria-live="polite" aria-label="Quantity">' + it.q + '</output><button type="button" data-q="' + idx + '" data-d="1" aria-label="One more ' + esc(p.title) + '">+</button></span>' +
        '<button class="remove" type="button" data-rm="' + idx + '">Remove<span class="visually-hidden"> ' + esc(p.title) + '</span></button></div></div>' +
        '<span class="price" data-usd="' + line.toFixed(2) + '"></span></li>';
    }).join('') + '</ul>';
    var ship = [];
    if (digital) ship.push('Downloads arrive by email the moment you pay.');
    if (printed) ship.push('Books and merch ship with tracking by email.');
    var hasShop = window.PBP_LINKS && window.PBP_LINKS.shopify;
    foot.innerHTML = '<div class="subtotal"><span>Subtotal</span><span class="price" data-usd="' + sub.toFixed(2) + '"></span></div>' +
      '<p class="cart-note">Tax and shipping are worked out at checkout.' + (cur !== 'USD' ? ' Prices in ' + cur + ' are estimates.' : '') + '</p>' +
      (hasShop ? '<a class="btn btn--block" href="' + esc(window.PBP_LINKS.shopify) + '">Check out <span class="arr" aria-hidden="true">→</span></a>'
        : '<button class="btn btn--block" type="button" data-checkout>Check out <span class="arr" aria-hidden="true">→</span></button><p class="checkout-msg" data-checkout-msg hidden role="status">Checkout opens on our secure store when the shop launches. Nothing has been charged.</p>') +
      '<ul class="cart-ship">' + ship.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>';
    applyPrices(body); applyPrices(foot);
  }
  document.addEventListener('click', function (e) {
    var q = e.target.closest('[data-q]');
    if (q) { var it = cart[+q.getAttribute('data-q')]; it.q = Math.max(0, it.q + (+q.getAttribute('data-d'))); if (!it.q) cart.splice(+q.getAttribute('data-q'), 1); saveCart(); renderCart(); var again = $('[data-q="' + q.getAttribute('data-q') + '"][data-d="' + q.getAttribute('data-d') + '"]'); (again || $('#cart .x-btn')).focus(); return; }
    var rm = e.target.closest('[data-rm]');
    if (rm) { var p = byId(cart[+rm.getAttribute('data-rm')].id); cart.splice(+rm.getAttribute('data-rm'), 1); saveCart(); renderCart(); toast('Removed ' + p.title, false); announce('Removed ' + p.title + ' from your cart.'); var f = $('#cart [data-q]') || $('#cart .x-btn'); f.focus(); return; }
    if (e.target.closest('[data-checkout]')) { var m = $('[data-checkout-msg]'); if (m) m.hidden = false; }
  });
  function addToCart(id, f, q, openDrawer) {
    var p = byId(id); if (!p) return;
    f = f || p.formats[0].id;
    var it = cart.filter(function (i) { return i.id === id && i.f === f; })[0];
    if (it) it.q += q; else cart.push({ id: id, f: f, q: q });
    saveCart(); renderCart(); renderCount(true);
    announce('Added ' + p.title + ', ' + fmtOf(p, f).label + ', to your cart. ' + count() + (count() === 1 ? ' item' : ' items') + ' in cart.');
    if (openDrawer) openDialog('cart', document.activeElement); else toast('Added: ' + p.title, true);
  }
  window.PBP_addToCart = addToCart;
  // Keep every open tab in step: cart and currency changes made elsewhere show up here.
  window.addEventListener('storage', function (e) {
    if (e.key === 'pbp-cart') { cart = store.get('pbp-cart', []).filter(function (i) { return byId(i.id); }); renderCart(); }
    if (e.key === 'pbp-cur') { var c = store.get('pbp-cur', 'USD'); if (RATES[c]) { cur = c; $$('[data-currency]').forEach(function (s) { s.value = cur; }); applyPrices(); renderCart(); } }
  });

  /* ---------------- Toast ---------------- */
  var tEl = $('[data-toast]'), tT;
  function toast(msg, withCart) {
    if (!tEl) return;
    $('[data-toast-msg]', tEl).textContent = msg;
    $('button', tEl).hidden = !withCart;
    tEl.classList.add('is-on'); clearTimeout(tT); tT = setTimeout(function () { tEl.classList.remove('is-on'); }, 3600);
  }

  /* ---------------- Footer: links from commerce/links.js (only non-empty ones show) ---------------- */
  (function () {
    var L = window.PBP_LINKS || {}; var wrap = $('[data-social-wrap]'), ul = $('[data-socials]'); if (!ul) return;
    var names = { instagram: 'Instagram', pinterest: 'Pinterest', facebook: 'Facebook', tiktok: 'TikTok', youtube: 'YouTube', threads: 'Threads', x: 'X', linkedin: 'LinkedIn', substack: 'Substack', etsy: 'Etsy shop', tpt: 'Teachers Pay Teachers', amazon_author: 'Amazon', bookshop: 'Bookshop.org' };
    var items = Object.keys(names).filter(function (k) { return typeof L[k] === 'string' && /^https:\/\//.test(L[k]); });
    ul.innerHTML = items.map(function (k) { return '<li><a href="' + esc(L[k]) + '" rel="noopener" target="_blank">' + names[k] + '<span class="visually-hidden"> (opens in a new tab)</span></a></li>'; }).join('');
    wrap.hidden = !items.length;
    // Retailer links on product pages
    $$('[data-retail]').forEach(function (el) {
      var keys = el.getAttribute('data-retail').split(' ').filter(function (k) { return L[k]; });
      if (!keys.length) return;
      var lab = { kdp_book_up_go_more: 'Amazon', bookshop_book_up_go_more: 'Bookshop.org', shop_book_up_go_more: 'Our store' };
      el.innerHTML = 'Also sold at ' + keys.map(function (k) { return '<a href="' + esc(L[k]) + '" rel="noopener" target="_blank">' + (lab[k] || k) + '</a>'; }).join(', ');
      el.hidden = false;
    });
  })();

  /* ---------------- Newsletter ---------------- */
  $$('[data-signup]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var em = f.querySelector('input[type="email"]'); var done = $('[data-signup-done]', f);
      if (!em.value || !em.checkValidity()) { em.setAttribute('aria-invalid', 'true'); done.hidden = false; done.textContent = 'Please check the email address.'; em.focus(); return; }
      em.removeAttribute('aria-invalid'); done.hidden = false; done.textContent = 'Thanks. The plan is on its way to ' + em.value + '.';
    });
  });

  /* ======================= PAGE MODULES ======================= */
  var page = document.body.getAttribute('data-page');

  /* ---------- Shop / collections ---------- */
  if (page === 'shop') (function () {
    var grid = $('[data-shop-grid]'); if (!grid) return;
    var cards = $$('.p-card', grid); var LIMIT = 8; var expanded = false;
    var title = $('[data-shop-title]'), lede = $('[data-shop-lede]'), crumb = $('[data-crumb-current]'), crumbShop = $('[data-crumb-shop]');
    var countEl = $('[data-shop-count]'), more = $('[data-show-more]'), empty = $('[data-shop-empty]'), sortSel = $('[data-sort]');
    var BANDS = window.PBP_BANDS, COLS = window.PBP_COLLECTIONS;
    function matchQ(c, q) {
      var p = byId(c.getAttribute('data-id')); if (!p) return false;
      var hay = norm([p.title, p.line, TYPE[p.type], p.ageText, p.ages.join(' ')].join(' '));
      return norm(q).split(/\s+/).filter(Boolean).every(function (k) { return hay.indexOf(k) > -1; });
    }
    function parse() { var h = location.hash.replace(/^#/, ''); var o = {}; h.split('&').forEach(function (kv) { var p = kv.split('='); if (p[0]) o[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || ''); }); return o; }
    function write(o, replace) {
      var h = Object.keys(o).filter(function (k) { return o[k]; }).map(function (k) { return k + '=' + o[k]; }).join('&');
      var url = location.pathname + (h ? '#' + h : '');
      if (replace) history.replaceState(null, '', url); else history.pushState(null, '', url);
      apply();
    }
    function apply() {
      var s = parse(); var col = s.c && COLS[s.c]; var q = (s.q || '').trim();
      // Filter
      var vis = cards.filter(function (c) {
        var id = c.getAttribute('data-id'), t = c.getAttribute('data-type'), ages = c.getAttribute('data-ages').split(' ');
        if (col && col.types.indexOf(t) < 0 && (col.extra || []).indexOf(id) < 0) return false;
        if (s.type && t !== s.type) return false;
        if (s.age && ages.indexOf(s.age) < 0) return false;
        if (q && !matchQ(c, q)) return false;
        return true;
      });
      // Sort
      var mode = s.sort || 'featured'; if (sortSel) sortSel.value = mode;
      var order = cards.slice();
      if (mode === 'low') order.sort(function (a, b) { return a.getAttribute('data-price') - b.getAttribute('data-price'); });
      if (mode === 'high') order.sort(function (a, b) { return b.getAttribute('data-price') - a.getAttribute('data-price'); });
      if (mode === 'age') order.sort(function (a, b) { var f = function (c) { var k = c.getAttribute('data-ages').split(' ')[0]; return k ? parseInt(k, 10) : 99; }; return f(a) - f(b); });
      order.forEach(function (c) { grid.appendChild(c); });
      var shown = 0;
      order.forEach(function (c) { var on = vis.indexOf(c) > -1; var within = on && (expanded || shown < LIMIT); if (on) shown++; c.hidden = !within; });
      if (more) { more.hidden = expanded || vis.length <= LIMIT; more.querySelector('span').textContent = vis.length; }
      if (empty) empty.hidden = vis.length > 0;
      // Headings
      var band = BANDS.filter(function (b) { return b.key === s.age; })[0];
      var tl = (window.PBP_TYPES.filter(function (t) { return t.key === s.type; })[0] || {}).label;
      var name = q ? 'Results for “' + q + '”' : col ? col.title : (tl && band ? tl + ', ages ' + band.label : tl ? tl : band ? 'For ages ' + band.label : 'Everything we make');
      title.textContent = name;
      lede.textContent = q ? (vis.length ? 'Products whose title, type or age matches your search. Pick an age to narrow it down.' : 'Nothing in the shop matches that. Try an age like 3–5, or a type like printables.') : col ? col.lede : band ? band.name + ': books, printables and kits chosen for ' + band.label + ' ' + band.unit + '. Everything is sorted by age, so you can start where your child is.' : tl ? 'Every ' + tl.toLowerCase().replace(/s$/, '') + ' we make, sorted by age.' : 'Talk-along books, printables, classroom packs and kits, from birth to twelve. Pick an age or a type to narrow it down.';
      countEl.textContent = vis.length + (vis.length === 1 ? ' product' : ' products');
      crumb.textContent = (q || col || tl || band) ? name : 'Everything';
      document.title = name + ' · Shop · Play Before Pixels';
      // Controls state
      $$('[data-age]').forEach(function (b) { var on = (b.getAttribute('data-age') || '') === (s.age || ''); b.setAttribute('aria-current', on ? 'true' : 'false'); });
      $$('[data-type-f]').forEach(function (b) { b.setAttribute('aria-pressed', String((b.getAttribute('data-type-f') || '') === (s.type || '') && !col)); });
      $$('[data-col]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-col') === (s.c || ''))); });
      var navCur = { books: 'mega-books', teachers: 'mega-teach' }[s.c] || 'mega-shop';
      $$('.nav-top[data-mega]').forEach(function (b) { b.classList.toggle('is-current', b.getAttribute('data-mega') === navCur); });
      // Quick view
      if (s.item && byId(s.item)) openQuick(s.item); else if ($('#qv').classList.contains('is-open')) closeDialog($('#qv'), true);
    }
    $$('[data-age]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); var s = parse(); s.age = b.getAttribute('data-age'); delete s.item; write(s); }); });
    $$('[data-type-f]').forEach(function (b) { b.addEventListener('click', function () { var s = parse(); s.type = b.getAttribute('data-type-f'); delete s.c; delete s.item; write(s); }); });
    $$('[data-col]').forEach(function (b) { b.addEventListener('click', function () { var s = parse(); s.c = b.getAttribute('data-col'); delete s.type; delete s.item; write(s); }); });
    if (sortSel) sortSel.addEventListener('change', function () { var s = parse(); s.sort = sortSel.value === 'featured' ? '' : sortSel.value; write(s, true); });
    if (more) more.addEventListener('click', function () { expanded = true; apply(); var c = cards.filter(function (x) { return !x.hidden; })[LIMIT]; if (c) { var a = c.querySelector('.p-title a'); a.focus(); } });
    $$('[data-reset]').forEach(function (b) { b.addEventListener('click', function () { write({}); }); });
    window.addEventListener('hashchange', apply); window.addEventListener('popstate', apply);
    // Quick view drawer
    var qv = $('#qv'), qvBody = $('[data-qv-body]');
    function openQuick(id) {
      var p = byId(id); if (p.url) { location.href = p.url; return; }
      var min = window.PBP_minPrice(p);
      qvBody.innerHTML =
        '<div class="surface g-' + p.ground + '">' + window.PBP_mock(p) + '</div>' +
        '<span class="stamp stamp--ink">' + esc(p.stamp) + '</span>' +
        '<h3 id="qv-title">' + esc(p.title) + '</h3><p class="lede" style="font-size:17px">' + esc(p.line) + '.</p>' +
        (p.ages.length ? miniRuler(p) : '<p class="meta">' + esc(p.ageText) + '</p>') +
        '<fieldset class="formats" style="margin-top:22px"><legend>Format</legend>' + p.formats.map(function (f, i) {
          return '<label class="fmt-opt"><input type="radio" name="qvf" value="' + f.id + '"' + (i ? '' : ' checked') + '><span><b>' + esc(f.label) + '</b><small>' + esc(f.detail) + '</small><small>' + esc(f.ship) + '</small></span><span class="price" data-usd="' + f.price + '"></span></label>';
        }).join('') + '</fieldset>' +
        (p.sum ? '<p class="meta" style="margin-top:10px">Bought one by one, these three come to <span data-usd="' + p.sum + '"></span>.</p>' : '');
      $('[data-qv-add]').onclick = function () { var f = qv.querySelector('input[name="qvf"]:checked').value; closeDialog(qv, false); clearItem(); addToCart(p.id, f, 1, true); };
      applyPrices(qvBody);
      if (!qv.classList.contains('is-open')) { var trig = $('[data-quick="' + id + '"]'); openDialog('qv', trig && trig.getClientRects().length ? trig : null); }
      else { qv.scrollTop = 0; }
    }
    function clearItem() { var s = parse(); if (s.item) { delete s.item; write(s, true); } }
    qv.onClose = clearItem;
    apply();
  })();

  function miniRuler(p) {
    var B = window.PBP_BANDS;
    return '<div class="mini-ruler" aria-label="Age range: ' + esc(p.ageText) + '"><div class="bar" aria-hidden="true">' + B.map(function (b) {
      return '<span class="' + (p.ages.indexOf(b.key) > -1 ? 'on' : '') + '" style="--c:var(--' + b.color + ')"></span>';
    }).join('') + '</div><div class="labels" aria-hidden="true">' + B.map(function (b) { return '<span class="' + (p.ages.indexOf(b.key) > -1 ? 'on' : '') + '">' + b.label + '</span>'; }).join('') + '</div></div>';
  }
  window.PBP_miniRuler = miniRuler;

  /* ---------- Product page ---------- */
  if (page === 'product') (function () {
    var p = byId('up-go-more');
    // Gallery
    var stage = $('[data-stage]'), thumbs = $$('[data-thumb]');
    thumbs.forEach(function (t, i) {
      t.addEventListener('click', function () {
        thumbs.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        t.setAttribute('aria-pressed', 'true');
        $$('[data-slide]', stage).forEach(function (s) { s.hidden = s.getAttribute('data-slide') !== t.getAttribute('data-thumb'); });
      });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return;
        e.preventDefault(); var n = thumbs[(i + d + thumbs.length) % thumbs.length]; n.focus(); n.click();
      });
    });
    // Formats
    var price = $('[data-product-price]'), ship = $('[data-product-ship]'), addBtn = $('[data-product-add]'), qtyOut = $('[data-qty]');
    var q = 1;
    function sync() {
      var f = $('input[name="format"]:checked').value, fo = p.formats.filter(function (x) { return x.id === f; })[0];
      price.setAttribute('data-usd', fo.price); ship.textContent = fo.ship;
      $('[data-add-price]').setAttribute('data-usd', (fo.price * q).toFixed(2));
      applyPrices(price.parentElement); applyPrices(addBtn);
    }
    $$('input[name="format"]').forEach(function (r) { r.addEventListener('change', sync); });
    $$('[data-qty-d]').forEach(function (b) { b.addEventListener('click', function () { q = Math.min(20, Math.max(1, q + (+b.getAttribute('data-qty-d')))); qtyOut.value = q; qtyOut.textContent = q; sync(); }); });
    addBtn.addEventListener('click', function () { addToCart(p.id, $('input[name="format"]:checked').value, q, true); });
    sync();
    // Word explorer
    var data = []; try { data = JSON.parse($('#words-data').textContent); } catch (e) { }
    var wbtns = $$('[data-word]'), wOut = $('[data-word-out]');
    function showWord(i) {
      var w = data[i]; if (!w) return;
      wbtns.forEach(function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-word') === i)); });
      $('[data-w-img]', wOut).src = 'assets/ugm-p' + String(i + 3).padStart(2, '0') + '.webp';
      $('[data-w-img]', wOut).alt = 'Page for the word “' + w.w + '”';
      $('[data-w-word]', wOut).textContent = w.w;
      $('[data-w-cue]', wOut).textContent = ({ say: 'Say it', sign: 'Sign it', act: 'Act it' })[w.cue[0]] + ': ' + w.cue[1];
      $('[data-w-tip-h]', wOut).textContent = w.tip[0];
      $('[data-w-tip]', wOut).textContent = w.tip[1];
      $('[data-w-page]', wOut).textContent = 'Page ' + (i + 3) + ' of 26';
    }
    wbtns.forEach(function (b) { b.addEventListener('click', function () { showWord(+b.getAttribute('data-word')); }); });
  })();

  /* ---------- Research page: section highlighting in the contents list ---------- */
  if (page === 'research' && 'IntersectionObserver' in window) (function () {
    var links = $$('[data-toc] a'); var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { links.forEach(function (a) { a.removeAttribute('aria-current'); }); var a = map[e.target.id]; if (a) a.setAttribute('aria-current', 'true'); } });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  })();

  /* ---------- Share: copy link ---------- */
  $$('[data-copy-link]').forEach(function (b) {
    b.addEventListener('click', function () {
      var done = $('[data-copy-done]'); var url = 'https://playbeforepixels.com/research';
      var ok = function () { if (done) { done.hidden = false; setTimeout(function () { done.hidden = true; }, 2500); } };
      try { navigator.clipboard.writeText(url).then(ok, ok); } catch (e) { ok(); }
    });
  });

  /* ---------- Info / help page ---------- */
  if (page === 'info') (function () {
    function openFromHash() {
      var id = location.hash.slice(1); if (!id) return;
      var el = document.getElementById(id); if (!el) return;
      if (el.tagName === 'DETAILS') el.open = true;
      var d = el.querySelector && el.querySelector('details'); if (d && el.tagName === 'SECTION' && el.hasAttribute('data-open-first')) d.open = true;
    }
    window.addEventListener('hashchange', openFromHash); openFromHash();
    var hs = $('[data-help-search]'), items = $$('.help-faq details');
    if (hs) hs.addEventListener('input', function () {
      var q = norm(hs.value.trim()); var n = 0;
      items.forEach(function (d) { var on = !q || norm(d.textContent).indexOf(q) > -1; d.hidden = !on; if (on) n++; if (q && on) d.open = true; if (!q) d.open = false; });
      $('[data-help-count]').textContent = q ? n + (n === 1 ? ' answer' : ' answers') + ' found' : '';
    });
    // Contact form: show matching answers while typing
    var msg = $('[data-contact-msg]'), subj = $('[data-contact-subj]'), sugg = $('[data-contact-sugg]');
    function suggest() {
      var q = norm((subj.value || '') + ' ' + (msg.value || '')); var words = q.split(/\W+/).filter(function (w) { return w.length > 3; });
      if (!words.length) { sugg.hidden = true; return; }
      var hits = items.map(function (d) { var t = norm(d.textContent), s = 0; words.forEach(function (w) { if (t.indexOf(w) > -1) s++; }); return { d: d, s: s }; }).filter(function (x) { return x.s > 0; }).sort(function (a, b) { return b.s - a.s; }).slice(0, 3);
      sugg.hidden = !hits.length;
      $('ul', sugg).innerHTML = hits.map(function (h) { return '<li><a href="#' + h.d.id + '">' + esc(h.d.querySelector('summary').textContent) + '</a></li>'; }).join('');
    }
    if (msg) { msg.addEventListener('input', suggest); subj.addEventListener('change', suggest); }
    var cf = $('[data-contact]');
    if (cf) cf.addEventListener('submit', function (e) { e.preventDefault(); var ok = $('[data-contact-done]'); if (!cf.checkValidity()) { cf.reportValidity(); return; } ok.hidden = false; ok.focus(); });
  })();

  /* ---------------- Boot ---------------- */
  initCurrency(); renderCart();
  // Debug/screenshot hook: ?open=menu|cart|search|mega-shop opens that state on load
  var m = /[?&]open=([\w-]+)/.exec(location.search);
  if (m) setTimeout(function () {
    if (m[1].indexOf('mega-') === 0) { var b = $('[data-mega="' + m[1] + '"]'); if (b) openMegaPanel(b); }
    else if (m[1] === 'menu') openDialog('mnav'); else openDialog(m[1]);
  }, 50);
})();
