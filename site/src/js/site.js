/* Play Before Pixels: one deferred script. Every link and page works without it.
   Menus (disclosure pattern), mobile drawer (modal dialog), search sheet and page,
   shop filters (state in the URL), product gallery and formats, word explorer, help filter,
   contact answers. No tracking, no storage of personal data. */
(function () {
  'use strict';
  var d = document, w = window;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var finePointer = w.matchMedia && w.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  d.documentElement.classList.add('js');

  /* ---------- skip link: focus <main> without touching the URL (keeps shop filters) ---------- */
  var skip = $('.skip-link');
  if (skip) skip.addEventListener('click', function (e) { var m = $('#main'); if (m) { e.preventDefault(); m.focus(); } });

  /* ---------- mega menus ---------- */
  var header = $('.site-header');
  var scrim = $('[data-nav-scrim]');
  var openMega = null, openedAt = 0, hoverT = null;
  function panelOf(btn) { return d.getElementById(btn.getAttribute('aria-controls')); }
  function setMega(btn, open, how) {
    if (!btn) return;
    var p = panelOf(btn);
    if (open) {
      if (openMega && openMega !== btn) setMega(openMega, false);
      btn.setAttribute('aria-expanded', 'true'); p.classList.add('is-open'); openMega = btn; openedAt = how === 'hover' ? Date.now() : 0;
      if (scrim) scrim.classList.add('is-open');
    } else {
      btn.setAttribute('aria-expanded', 'false'); p.classList.remove('is-open');
      if (openMega === btn) openMega = null;
      if (scrim && !openMega) scrim.classList.remove('is-open');
    }
  }
  $$('[data-mega]').forEach(function (btn) {
    var li = btn.parentNode, p = panelOf(btn);
    btn.addEventListener('click', function () {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      if (isOpen && openedAt && Date.now() - openedAt < 450) { openedAt = 0; return; } /* click right after hover-open keeps it */
      setMega(btn, !isOpen, 'click');
    });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setMega(btn, true, 'key'); var a = $('a, button', p); if (a) a.focus(); }
    });
    if (finePointer) {
      li.addEventListener('mouseenter', function () { clearTimeout(hoverT); hoverT = setTimeout(function () { if (btn.getAttribute('aria-expanded') !== 'true') setMega(btn, true, 'hover'); }, 110); });
      li.addEventListener('mouseleave', function () { clearTimeout(hoverT); hoverT = setTimeout(function () { setMega(btn, false); }, 220); });
    }
    p.addEventListener('click', function (e) { if (e.target.closest('a')) setMega(btn, false); });
  });
  d.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && openMega) { var b = openMega; setMega(b, false); b.focus(); }
  });
  d.addEventListener('click', function (e) { if (openMega && header && !header.contains(e.target)) setMega(openMega, false); });
  if (header) header.addEventListener('focusout', function (e) { if (openMega && e.relatedTarget && !header.contains(e.relatedTarget)) setMega(openMega, false); });
  if (scrim) scrim.addEventListener('click', function () { if (openMega) setMega(openMega, false); });

  /* ---------- dialogs: mobile menu and search sheet ---------- */
  var lastFocus = null, openDialog = null;
  function bgNodes(dlg) { return $$('body > *').filter(function (n) { return n !== dlg && !n.matches('script, .scrim') && !n.contains(dlg); }); }
  function focusables(el) { return $$('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', el).filter(function (n) { return n.offsetParent !== null || n === d.activeElement; }); }
  function openDlg(dlg, opener, focusEl) {
    if (openDialog) closeDlg(openDialog, true);
    lastFocus = opener || d.activeElement;
    dlg.hidden = false;
    var s = $('[data-scrim="' + dlg.id + '"]'); if (s) s.classList.add('is-open');
    bgNodes(dlg).forEach(function (n) { n.inert = true; n.setAttribute('data-inerted', ''); });
    d.body.classList.add('is-locked');
    requestAnimationFrame(function () { dlg.classList.add('is-open'); (focusEl || focusables(dlg)[0] || dlg).focus(); });
    if (opener && opener.hasAttribute('aria-expanded')) opener.setAttribute('aria-expanded', 'true');
    openDialog = dlg;
  }
  function closeDlg(dlg, silent) {
    dlg.classList.remove('is-open');
    var s = $('[data-scrim="' + dlg.id + '"]'); if (s) s.classList.remove('is-open');
    $$('[data-inerted]').forEach(function (n) { n.inert = false; n.removeAttribute('data-inerted'); });
    d.body.classList.remove('is-locked');
    setTimeout(function () { if (!dlg.classList.contains('is-open')) dlg.hidden = true; }, 260);
    $$('[aria-controls="' + dlg.id + '"][aria-expanded]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    openDialog = null;
    if (!silent && lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $$('[data-dialog]').forEach(function (dlg) {
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); closeDlg(dlg); return; }
      if (e.key !== 'Tab') return;
      var f = focusables(dlg); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    $$('[data-close]', dlg).forEach(function (b) { b.addEventListener('click', function () { closeDlg(dlg); }); });
    var s = $('[data-scrim="' + dlg.id + '"]'); if (s) s.addEventListener('click', function () { closeDlg(dlg); });
  });

  var mnav = $('#mnav');
  $$('[data-open-menu]').forEach(function (b) { b.addEventListener('click', function () { openDlg(mnav, b); }); });
  if (mnav) {
    $$('.acc-btn[aria-controls]', mnav).forEach(function (b) {
      b.addEventListener('click', function () {
        var p = d.getElementById(b.getAttribute('aria-controls')); var open = b.getAttribute('aria-expanded') !== 'true';
        b.setAttribute('aria-expanded', String(open)); p.hidden = !open;
      });
    });
    var cur = d.documentElement.getAttribute('data-nav');
    if (cur) { var ab = $('.acc-btn[aria-controls="m-' + cur + '"]', mnav); if (ab) { ab.setAttribute('aria-expanded', 'true'); d.getElementById('m-' + cur).hidden = false; } }
    mnav.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]'); if (!a || a.hasAttribute('data-open-search')) return;
      var u = new URL(a.href, location.href);
      if (u.pathname === location.pathname && u.search === location.search) closeDlg(mnav, true);
    });
  }

  /* ---------- search ---------- */
  var sheet = $('#search'), sInput = $('[data-search-input]'), sBox = $('[data-search-results]');
  var index = null, loading = null;
  function loadIndex() {
    if (index) return Promise.resolve(index);
    if (!loading) loading = fetch('/assets/search.json').then(function (r) { return r.json(); }).then(function (j) { index = j; return j; }).catch(function () { index = { items: [], suggest: [] }; return index; });
    return loading;
  }
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ''); }
  function match(q) {
    var terms = norm(q).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index.items.map(function (it) {
      var hay = norm(it.t + ' ' + it.k), score = 0;
      for (var i = 0; i < terms.length; i++) { if (hay.indexOf(terms[i]) < 0) return null; score += norm(it.t).indexOf(terms[i]) >= 0 ? 3 : 1; }
      return { it: it, s: score + (it.g === 'p' ? 1 : 0) };
    }).filter(Boolean).sort(function (a, b) { return b.s - a.s; }).map(function (x) { return x.it; });
  }
  function hl(t, q) {
    var out = esc(t);
    norm(q).split(/\s+/).filter(function (x) { return x.length > 1; }).forEach(function (term) {
      out = out.replace(new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>');
    });
    return out;
  }
  function row(it, q, id) {
    var th = it.i ? '<span class="th"><img src="' + it.i + '" alt="" width="52" height="52" loading="lazy"></span>' : '<span class="th txt">' + (it.g === 'a' ? 'Q&amp;A' : 'Page') + '</span>';
    return '<li><a href="' + it.u + '"' + (id ? ' id="' + id + '" role="option" aria-selected="false"' : '') + '>' + th + '<span><b>' + hl(it.t, q) + '</b><small>' + esc(it.m || '') + '</small></span>' + (it.p ? '<span class="num price">' + esc(it.p) + '</span>' : '') + '</a></li>';
  }
  function renderResults(box, q, forSheet) {
    var res = match(q);
    if (!q.trim()) {
      box.innerHTML = '<p class="search-hint">Try one of these:</p><div class="search-sugg">' + index.suggest.map(function (s) { return '<a class="chip" href="' + s.u + '">' + esc(s.t) + '</a>'; }).join('') + '</div>';
      return res;
    }
    if (!res.length) {
      box.innerHTML = '<p class="search-hint">Nothing matches “' + esc(q) + '” yet. Try a shorter word, or pick an age:</p><div class="search-sugg">' + index.suggest.map(function (s) { return '<a class="chip" href="' + s.u + '">' + esc(s.t) + '</a>'; }).join('') + '</div>';
      return res;
    }
    var prods = res.filter(function (x) { return x.g === 'p'; }), pages = res.filter(function (x) { return x.g !== 'p'; });
    var n = 0, html = '';
    if (prods.length) html += '<p class="grp" id="sg-p">Products</p><ul role="group" aria-labelledby="sg-p">' + prods.slice(0, 6).map(function (it) { return row(it, q, forSheet ? 'sr-' + (n++) : null); }).join('') + '</ul>';
    if (pages.length) html += '<p class="grp" id="sg-a">Pages and answers</p><ul role="group" aria-labelledby="sg-a">' + pages.slice(0, forSheet ? 6 : 30).map(function (it) { return row(it, q, forSheet ? 'sr-' + (n++) : null); }).join('') + '</ul>';
    if (forSheet) html += '<p class="search-all"><a class="link" href="/search/?q=' + encodeURIComponent(q) + '">See every result for “' + esc(q) + '” <svg class="arr" viewBox="0 0 16 10" aria-hidden="true" focusable="false"><path d="M1 5h13M10 1l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg></a></p>';
    box.innerHTML = html;
    return res;
  }
  var active = -1;
  function setActive(i) {
    var opts = $$('[role="option"]', sBox);
    opts.forEach(function (o) { o.setAttribute('aria-selected', 'false'); });
    active = i;
    if (i >= 0 && opts[i]) { opts[i].setAttribute('aria-selected', 'true'); sInput.setAttribute('aria-activedescendant', opts[i].id); opts[i].scrollIntoView({ block: 'nearest' }); }
    else sInput.removeAttribute('aria-activedescendant');
  }
  function openSearch(opener) {
    if (!sheet) return;
    if (openDialog === mnav) closeDlg(mnav, true);
    openDlg(sheet, opener, sInput);
    loadIndex().then(function () { renderResults(sBox, sInput.value, true); sInput.setAttribute('aria-expanded', 'true'); });
  }
  $$('[data-open-search]').forEach(function (a) { a.addEventListener('click', function (e) { if (!sheet) return; e.preventDefault(); openSearch($('.tools [data-open-search]') || a); }); });
  d.addEventListener('keydown', function (e) {
    if (e.key === '/' && !openDialog && !/^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName || '')) && !e.target.isContentEditable) { e.preventDefault(); openSearch($('.tools [data-open-search]')); }
  });
  if (sInput) {
    sInput.addEventListener('input', function () { active = -1; sInput.removeAttribute('aria-activedescendant'); loadIndex().then(function () { renderResults(sBox, sInput.value, true); }); });
    sInput.addEventListener('keydown', function (e) {
      var opts = $$('[role="option"]', sBox);
      if (e.key === 'ArrowDown') { e.preventDefault(); if (opts.length) setActive(Math.min(active + 1, opts.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(active - 1, -1)); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        if (active >= 0 && opts[active]) location.href = opts[active].href;
        else if (sInput.value.trim()) location.href = '/search/?q=' + encodeURIComponent(sInput.value.trim());
      }
    });
  }
  var sp = $('[data-search-page]');
  if (sp) {
    var qi = $('[data-search-page-input]'), box = $('[data-search-page-results]'), cnt = $('[data-search-page-count]');
    var q0 = new URLSearchParams(location.search).get('q') || '';
    qi.value = q0;
    var run = function () {
      loadIndex().then(function () {
        var q = qi.value.trim(); var r = renderResults(box, q, false);
        cnt.textContent = q ? (r.length + (r.length === 1 ? ' result' : ' results') + ' for “' + q + '”') : '';
        d.title = (q ? 'Search: ' + q + ' | ' : 'Search | ') + 'Play Before Pixels';
      });
    };
    run();
    qi.addEventListener('input', function () { run(); var u = new URL(location.href); if (qi.value.trim()) u.searchParams.set('q', qi.value.trim()); else u.searchParams.delete('q'); history.replaceState(null, '', u); });
  }

  /* ---------- shop filters ---------- */
  var shop = $('[data-shop]');
  if (shop) (function () {
    var cfg = JSON.parse($('[data-shop-cfg]').textContent);
    var grid = $('[data-shop-grid]'), tpl = $('[data-all-cards]');
    var all = $$('.p-card', tpl.content).map(function (n) { return n.cloneNode(true); });
    var moreStatic = $('[data-more-static]'), moreWrap = $('[data-show-more-wrap]'), moreBtn = $('[data-show-more]');
    var countEl = $('[data-shop-count]'), sortWrap = $('[data-sort-wrap]'), sortSel = $('[data-sort]'), empty = $('[data-shop-empty]');
    if (moreStatic) moreStatic.remove();
    if (sortWrap) sortWrap.hidden = false;
    var LIMIT = cfg.limit, expanded = false;
    var state = { age: shop.getAttribute('data-base-age') || '', type: shop.getAttribute('data-base-type') || '', sort: 'featured' };
    var qs = new URLSearchParams(location.search);
    if (qs.get('age') && cfg.bands[qs.get('age')]) state.age = qs.get('age');
    if (qs.get('type') && cfg.types[qs.get('type')]) state.type = qs.get('type');
    if (qs.get('sort')) state.sort = qs.get('sort');
    function urlFor(s) {
      var path = !s.age && !s.type ? '/shop/' : s.age && !s.type ? '/shop/ages/' + s.age + '/' : !s.age && s.type ? cfg.types[s.type].path : '/shop/';
      var p = new URLSearchParams();
      if (s.age && s.type) { p.set('age', s.age); p.set('type', s.type); }
      if (s.sort && s.sort !== 'featured') p.set('sort', s.sort);
      var q = p.toString(); return path + (q ? '?' + q : '');
    }
    function apply(push) {
      var b = state.age ? cfg.bands[state.age] : null, t = state.type ? cfg.types[state.type] : null;
      var list = all.filter(function (c) {
        return (!b || (' ' + c.getAttribute('data-ages') + ' ').indexOf(' ' + state.age + ' ') >= 0) && (!t || (' ' + c.getAttribute('data-types') + ' ').indexOf(' ' + state.type + ' ') >= 0);
      });
      var key = { age: function (c) { return +(c.getAttribute('data-lo') || 0); }, low: function (c) { return +c.getAttribute('data-price'); }, high: function (c) { return -c.getAttribute('data-price'); }, featured: function (c) { return +c.getAttribute('data-order'); } }[state.sort] || function (c) { return +c.getAttribute('data-order'); };
      list.sort(function (a, c) { return key(a) - key(c) || (+a.getAttribute('data-order') - +c.getAttribute('data-order')); });
      grid.innerHTML = '';
      list.forEach(function (c, i) { var n = c.cloneNode(true); n.hidden = !expanded && i >= LIMIT; grid.appendChild(n); });
      moreWrap.hidden = expanded || list.length <= LIMIT;
      $('span', moreBtn).textContent = list.length;
      empty.hidden = list.length > 0;
      countEl.textContent = list.length + (list.length === 1 ? ' thing' : ' things');
      var name = b && t ? t.label + ' for ages ' + b.label : b ? b.name : t ? t.label : cfg.allName;
      $('[data-shop-title]').textContent = name;
      $('[data-shop-lede]').textContent = b && !t ? b.lede : t && !b ? t.lede : b && t ? t.lede : cfg.allLede;
      d.title = (b || t ? name + ' | ' : '') + cfg.titleBase;
      var crumbs = $('[data-crumbs] ol');
      crumbs.innerHTML = '<li><a href="/">Home</a></li>' + (b || t ? '<li><a href="/shop/">Shop</a></li><li><span aria-current="page">' + esc(name) + '</span></li>' : '<li><span aria-current="page">Shop</span></li>');
      $$('[data-f-age]').forEach(function (a) { if (a.getAttribute('data-f-age') === state.age) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      $$('[data-f-type]').forEach(function (a) { a.setAttribute('aria-pressed', String(a.getAttribute('data-f-type') === state.type)); });
      if (sortSel) sortSel.value = state.sort;
      if (push) history.pushState({ shop: state }, '', urlFor(state));
    }
    shop.parentNode.addEventListener('click', function (e) {
      var a = e.target.closest('[data-f-age], [data-f-type], [data-reset]');
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      if (a.hasAttribute('data-reset')) { state.age = ''; state.type = ''; }
      else if (a.hasAttribute('data-f-age')) state.age = a.getAttribute('data-f-age');
      else state.type = a.getAttribute('data-f-type');
      expanded = false; apply(true);
    });
    if (sortSel) sortSel.addEventListener('change', function () { state.sort = sortSel.value; apply(true); });
    moreBtn.addEventListener('click', function () {
      expanded = true; var cards = $$('.p-card', grid), first = cards[LIMIT];
      cards.forEach(function (c) { c.hidden = false; }); moreWrap.hidden = true;
      if (first) { var l = $('a', first); if (l) l.focus(); }
    });
    w.addEventListener('popstate', function (e) {
      if (e.state && e.state.shop) { state = e.state.shop; } else {
        var p = new URLSearchParams(location.search), m = /\/shop\/ages\/([\w-]+)\//.exec(location.pathname);
        state = { age: m ? m[1] : (p.get('age') || ''), type: p.get('type') || (Object.keys(cfg.types).filter(function (k) { return cfg.types[k].path === location.pathname; })[0] || ''), sort: p.get('sort') || 'featured' };
      }
      expanded = false; apply(false);
    });
    history.replaceState({ shop: state }, '', location.href);
    apply(false);
  })();

  /* ---------- product: gallery, formats, word explorer ---------- */
  var gal = $('[data-gallery]');
  if (gal) {
    var thumbs = $$('[data-thumb]', gal), slides = $$('[data-slide]', gal);
    var show = function (i, focus) {
      slides.forEach(function (s, k) { s.hidden = k !== i; });
      thumbs.forEach(function (t, k) { t.setAttribute('aria-pressed', String(k === i)); t.tabIndex = k === i ? 0 : -1; });
      if (focus) thumbs[i].focus();
    };
    thumbs.forEach(function (t, i) {
      t.tabIndex = i === 0 ? 0 : -1;
      t.addEventListener('click', function () { show(i); });
      t.addEventListener('keydown', function (e) {
        var n = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (e.key === 'Home') n = -i; if (e.key === 'End') n = thumbs.length - 1 - i;
        if (n !== undefined) { e.preventDefault(); show((i + n + thumbs.length) % thumbs.length, true); }
      });
    });
  }
  var radios = $$('.formats input[type=radio]');
  if (radios.length) {
    var priceOut = $('[data-price-out]'), shipOut = $('[data-ship]'), row = $('[data-buy-row]');
    var money = function (v) { v = Math.round(v * 100) / 100; return '$' + (v % 1 === 0 ? String(v) : v.toFixed(2)); };
    radios.forEach(function (r) {
      r.addEventListener('change', function () {
        if (!r.checked) return;
        var p = +r.getAttribute('data-price'); priceOut.textContent = money(p);
        if (shipOut) shipOut.textContent = r.getAttribute('data-ship');
        var btn = $('[data-buy]', row), href = r.getAttribute('data-buy');
        if (btn && href) { btn.href = href; var pp = $('[data-buy-price]', btn); if (pp) pp.textContent = money(p); }
      });
    });
  }
  var words = $('[data-words]');
  if (words) {
    var data = JSON.parse($('[data-words-json]').textContent);
    var img = $('[data-wo-img]');
    $$('[data-word]', words).forEach(function (b) {
      b.addEventListener('click', function () {
        var x = data[+b.getAttribute('data-word')];
        $$('[data-word]', words).forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
        img.removeAttribute('srcset'); img.removeAttribute('sizes'); img.src = x.img; img.alt = 'The page for “' + x.w + '”.';
        $('[data-wo-page]').textContent = 'Page ' + x.page;
        $('[data-wo-word]').textContent = x.w; $('[data-wo-cue]').textContent = x.cue;
        $('[data-wo-tip]').innerHTML = '<b>' + esc(x.tip[0]) + '</b> ' + esc(x.tip[1]);
      });
    });
  }

  /* ---------- help filter ---------- */
  var hs = $('[data-help-search]');
  if (hs) {
    hs.hidden = false;
    var hi = $('[data-help-filter]'), hc = $('[data-help-count]');
    hi.addEventListener('input', function () {
      var q = norm(hi.value.trim()), n = 0;
      $$('[data-help-sec]').forEach(function (sec) {
        var any = false;
        $$('details', sec).forEach(function (dt) { var ok = !q || norm(dt.textContent).indexOf(q) >= 0; dt.hidden = !ok; if (ok) { any = true; n++; } if (q && ok) dt.open = true; });
        sec.hidden = !any;
      });
      hc.textContent = q ? n + (n === 1 ? ' answer' : ' answers') + ' match' : '';
    });
  }

  /* ---------- contact: matching answers as you type ---------- */
  var cm = $('[data-contact-msg]');
  if (cm) {
    var ans = JSON.parse($('[data-answers]').textContent), sug = $('[data-contact-sugg]');
    cm.addEventListener('input', function () {
      var t = norm(cm.value).split(/\W+/).filter(function (x) { return x.length > 3; });
      if (!t.length) { sug.hidden = true; return; }
      var hits = ans.map(function (a) { var s = 0; t.forEach(function (x) { if (a.k.indexOf(x) >= 0) s++; }); return { a: a, s: s }; }).filter(function (x) { return x.s; }).sort(function (a, b) { return b.s - a.s; }).slice(0, 3);
      $('ul', sug).innerHTML = hits.map(function (h) { return '<li><a href="' + h.a.url + '">' + esc(h.a.q) + '</a></li>'; }).join('');
      sug.hidden = !hits.length;
    });
  }

  /* ---------- forms that are not connected yet ---------- */
  $$('form[data-soon]').forEach(function (f) { f.addEventListener('submit', function (e) { e.preventDefault(); }); });
})();
