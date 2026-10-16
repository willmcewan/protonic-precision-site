/* Protonic Precision site behavior. No dependencies; three.js loads only when someone opens a 360° view. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  // ---------- age gate ----------
  var gate = $('#gate');
  if (gate && store('pp_21') !== 'yes') {
    gate.hidden = false; document.documentElement.style.overflow = 'hidden';
    var yes = $('[data-gate-yes]', gate); setTimeout(function () { yes && yes.focus(); }, 30);
    yes.addEventListener('click', function () { store('pp_21', 'yes'); gate.hidden = true; document.documentElement.style.overflow = ''; });
    $('[data-gate-no]', gate).addEventListener('click', function () { $('[data-gate-msg]', gate).hidden = false; });
  }

  // ---------- mega menu ----------
  var items = $$('[data-mega]'), closeT;
  function closeAll(except) { items.forEach(function (it) { if (it !== except) { it.classList.remove('open'); $('.nav-link', it).setAttribute('aria-expanded', 'false'); } }); }
  function open(it) { closeAll(it); it.classList.add('open'); $('.nav-link', it).setAttribute('aria-expanded', 'true'); }
  var hoverable = window.matchMedia && matchMedia('(hover: hover)').matches;
  items.forEach(function (it) {
    var btn = $('.nav-link', it);
    btn.addEventListener('click', function () { it.classList.contains('open') ? closeAll() : open(it); });
    if (hoverable) {
      it.addEventListener('mouseenter', function () { clearTimeout(closeT); open(it); });
      it.addEventListener('mouseleave', function () { closeT = setTimeout(closeAll, 160); });
    }
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('[data-mega]')) closeAll(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeAll(); closeDrawer(); hideResults(); } });

  // ---------- mobile drawer ----------
  var drawer = $('#drawer'), opener = $('[data-open-drawer]');
  function closeDrawer() { if (drawer && !drawer.hidden) { drawer.hidden = true; document.documentElement.style.overflow = ''; opener && opener.setAttribute('aria-expanded', 'false'); opener && opener.focus(); } }
  opener && opener.addEventListener('click', function () { drawer.hidden = false; document.documentElement.style.overflow = 'hidden'; opener.setAttribute('aria-expanded', 'true'); $('[data-close-drawer]').focus(); });
  $('[data-close-drawer]') && $('[data-close-drawer]').addEventListener('click', closeDrawer);

  // ---------- search ----------
  var index = null;
  function loadIndex() { if (index) return Promise.resolve(index); return fetch('/search.json').then(function (r) { return r.json(); }).then(function (j) { index = j; return j; }).catch(function () { index = []; return index; }); }
  function find(q) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index.map(function (d) {
      var hay = (d.title + ' ' + d.kicker + ' ' + d.text).toLowerCase(), t = d.title.toLowerCase(), score = 0;
      for (var i = 0; i < terms.length; i++) { if (hay.indexOf(terms[i]) < 0) return null; score += t.indexOf(terms[i]) >= 0 ? 5 : 1; }
      if (d.type === 'product') score += 2;
      return { d: d, s: score };
    }).filter(Boolean).sort(function (a, b) { return b.s - a.s; }).map(function (x) { return x.d; });
  }
  function resultRow(d) {
    return '<a role="option" href="' + d.url + '"><span class="thumb' + (d.img ? '' : ' pg') + '">' + (d.img ? '<img src="' + d.img + '" alt="">' : (d.type === 'guide' ? 'GUIDE' : 'PAGE')) + '</span><span><b>' + escapeHtml(d.title) + '</b><small>' + escapeHtml(d.kicker) + '</small></span></a>';
  }
  function escapeHtml(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var sform = $('[data-search]'), sinput = sform && $('input', sform), sout = sform && $('.search-results', sform), sel = -1;
  function hideResults() { if (sout) { sout.hidden = true; sel = -1; } }
  if (sform) {
    sinput.addEventListener('focus', loadIndex);
    sinput.addEventListener('input', function () {
      var q = sinput.value.trim();
      if (!q) return hideResults();
      loadIndex().then(function () {
        var r = find(q).slice(0, 7); sel = -1;
        sout.innerHTML = r.length ? r.map(resultRow).join('') + '<a role="option" href="/search/?q=' + encodeURIComponent(q) + '"><span class="thumb pg">ALL</span><span><b>See all results</b><small>for “' + escapeHtml(q) + '”</small></span></a>' : '<div class="none">No matches for “' + escapeHtml(q) + '”. Try a caliber, a metal or a question.</div>';
        sout.hidden = false;
      });
    });
    sinput.addEventListener('keydown', function (e) {
      var opts = $$('a', sout); if (sout.hidden || !opts.length) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length;
        opts.forEach(function (o, i) { o.setAttribute('aria-selected', String(i === sel)); });
      } else if (e.key === 'Enter' && sel >= 0) { e.preventDefault(); location.href = opts[sel].href; }
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('[data-search]')) hideResults(); });
  }
  var spage = $('[data-search-page]');
  if (spage) {
    var pin = $('input', spage), out = $('[data-search-out]'), sum = $('[data-search-summary]');
    function run() {
      var q = pin.value.trim();
      if (!q) { out.innerHTML = ''; sum.textContent = 'Type to search products, guides and answers.'; return; }
      loadIndex().then(function () {
        var r = find(q);
        sum.textContent = r.length + (r.length === 1 ? ' result' : ' results') + ' for “' + q + '”';
        out.innerHTML = r.map(function (d) {
          return '<a class="lcard" href="' + d.url + '"><div class="well">' + (d.img ? '<img src="' + d.img + '" alt="">' : '<span class="eyebrow">' + (d.type === 'guide' ? 'Guide' : 'Page') + '</span>') + '</div><div class="body"><p class="eyebrow">' + escapeHtml(d.kicker) + '</p><h3>' + escapeHtml(d.title) + '</h3><p style="font-size:14px;color:var(--ink-2)">' + escapeHtml(d.text.slice(0, 140)) + '…</p></div></a>';
        }).join('');
      });
    }
    pin.value = new URLSearchParams(location.search).get('q') || '';
    pin.addEventListener('input', function () { history.replaceState(null, '', '/search/' + (pin.value ? '?q=' + encodeURIComponent(pin.value) : '')); run(); });
    spage.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    run();
  }

  // ---------- hero slider ----------
  var hero = $('[data-slider]');
  if (hero) {
    var slides = $$('.slide', hero), bars = $$('.bars button', hero), out2 = $('output', hero), cur = 0, timer, DUR = 7000;
    hero.style.setProperty('--dur', DUR + 'ms');
    function go(n, user) {
      slides[cur].classList.remove('on'); slides[cur].setAttribute('aria-hidden', 'true'); $$('a', slides[cur]).forEach(function (a) { a.tabIndex = -1; });
      bars.forEach(function (b, i) { b.classList.remove('on'); b.classList.toggle('done', i < n); b.setAttribute('aria-selected', 'false'); });
      cur = (n + slides.length) % slides.length;
      slides[cur].classList.add('on'); slides[cur].removeAttribute('aria-hidden'); $$('a', slides[cur]).forEach(function (a) { a.removeAttribute('tabindex'); });
      void bars[cur].offsetWidth; bars[cur].classList.add('on'); bars[cur].setAttribute('aria-selected', 'true');
      bars.forEach(function (b, i) { b.classList.toggle('done', i < cur); });
      out2.innerHTML = '<b>' + String(cur + 1).padStart(2, '0') + '</b>/ ' + String(slides.length).padStart(2, '0');
      schedule();
    }
    function schedule() { clearTimeout(timer); if (!reduce && !hero.classList.contains('paused')) timer = setTimeout(function () { go(cur + 1); }, DUR); }
    $('[data-next]', hero).addEventListener('click', function () { go(cur + 1, true); });
    $('[data-prev]', hero).addEventListener('click', function () { go(cur - 1, true); });
    bars.forEach(function (b, i) { b.addEventListener('click', function () { go(i, true); }); });
    hero.addEventListener('mouseenter', function () { hero.classList.add('paused'); clearTimeout(timer); });
    hero.addEventListener('mouseleave', function () { hero.classList.remove('paused'); go(cur); });
    hero.addEventListener('focusin', function () { hero.classList.add('paused'); clearTimeout(timer); });
    if (reduce) hero.classList.add('paused');
    schedule();
  }

  // ---------- carousels ----------
  $$('[data-carousel]').forEach(function (c) {
    var track = $('.track', c), sec = c.closest('section'), prev = $('[data-car-prev]', sec), next = $('[data-car-next]', sec);
    function step() { var card = track.firstElementChild; return card ? card.getBoundingClientRect().width + 14 : 300; }
    function upd() { if (!prev) return; prev.disabled = track.scrollLeft < 4; next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 4; }
    prev && prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }); });
    next && next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }); });
    track.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd); upd();
  });

  // ---------- category filters ----------
  var listing = $('[data-listing]');
  if (listing) {
    var grid = $('[data-grid]', listing), cards = $$('.lcard', grid), count = $('[data-count]', listing), empty = $('[data-empty]', listing), sortSel = $('[data-sort]', listing);
    var original = cards.slice();
    function apply() {
      var groups = {};
      $$('input[type=checkbox]:checked', listing).forEach(function (i) { (groups[i.name] = groups[i.name] || []).push(i.value); });
      var shown = 0;
      cards.forEach(function (c) {
        var ok = Object.keys(groups).every(function (k) { var vals = (c.getAttribute('data-' + k) || '').split('|'); return groups[k].some(function (v) { return vals.indexOf(v) >= 0; }); });
        c.hidden = !ok; if (ok) shown++;
      });
      count.textContent = shown; empty.hidden = shown > 0;
      var q = new URLSearchParams(); Object.keys(groups).forEach(function (k) { groups[k].forEach(function (v) { q.append(k, v); }); });
      history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q : ''));
    }
    function sort() {
      var v = sortSel.value, list = original.slice();
      if (v === 'name') list.sort(function (a, b) { return a.dataset.name.localeCompare(b.dataset.name); });
      if (v === 'z') list.sort(function (a, b) { return a.dataset.z - b.dataset.z; });
      if (v === 'price') list.sort(function (a, b) { return a.dataset.price - b.dataset.price; });
      if (v === 'price-desc') list.sort(function (a, b) { return b.dataset.price - a.dataset.price; });
      list.forEach(function (c) { grid.appendChild(c); });
    }
    new URLSearchParams(location.search).forEach(function (v, k) { var i = listing.querySelector('input[name="' + k + '"][value="' + CSS.escape(v) + '"]'); if (i) i.checked = true; });
    listing.addEventListener('change', function (e) { if (e.target.matches('input[type=checkbox]')) apply(); });
    sortSel.addEventListener('change', sort);
    $$('[data-clear]', listing).forEach(function (b) { b.addEventListener('click', function () { $$('input[type=checkbox]', listing).forEach(function (i) { i.checked = false; }); apply(); }); });
    apply();
  }

  // ---------- product gallery + 360° ----------
  var gal = $('[data-gallery]');
  if (gal) {
    var stage = $('[data-stage]', gal), img = $('img', stage), hint = $('[data-hint]', stage), thumbs = $$('.thumbs button', gal), viewer = null, cv = null;
    function press(b) { thumbs.forEach(function (t) { t.setAttribute('aria-pressed', String(t === b)); }); }
    thumbs.forEach(function (b) {
      b.addEventListener('click', function () {
        press(b);
        if (b.hasAttribute('data-3d')) return open3d();
        if (viewer) { viewer.stop(); cv.hidden = true; hint.hidden = true; }
        img.hidden = false; img.src = b.getAttribute('data-view');
      });
    });
    function loadScript(src) { return new Promise(function (res, rej) { var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }
    function open3d() {
      if (viewer) { img.hidden = true; cv.hidden = false; hint.hidden = false; viewer.start(); return; }
      hint.hidden = false; hint.textContent = 'Loading 3D…';
      var fonts = document.fonts ? Promise.all([document.fonts.load('800 40px Archivo'), document.fonts.load('500 20px "IBM Plex Mono"')]).catch(function () {}) : Promise.resolve();
      Promise.all([loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'), loadScript('/assets/js/pp-data.js'), fonts])
        .then(function () { return loadScript('/assets/js/viewer.js'); })
        .then(function () {
          cv = document.createElement('canvas'); cv.setAttribute('aria-label', '3D view. Drag to turn.'); stage.appendChild(cv);
          viewer = window.ProtonicViewer(cv, { autoRotate: !reduce });
          viewer.setModel(window.PP_MODEL);
          function fit() { var r = stage.getBoundingClientRect(); viewer.resize(r.width, r.height); }
          fit(); if (window.ResizeObserver) new ResizeObserver(fit).observe(stage);
          img.hidden = true; hint.textContent = 'Drag to turn'; viewer.start();
        })
        .catch(function () { hint.textContent = '3D view unavailable on this device'; });
    }

    // Colorway picker: swaps the gallery images, the 3D finish and the notify link.
    var cw = $('[data-colorways]');
    if (cw) {
      var sws = $$('[data-cw]', cw), stills = thumbs.filter(function (t) { return !t.hasAttribute('data-3d'); });
      var notifyBtn = $('a[data-notify]'), notifyLabel = notifyBtn && $('[data-notify-label]', notifyBtn);
      function pick(sw) {
        sws.forEach(function (o) { o.setAttribute('aria-checked', String(o === sw)); o.tabIndex = o === sw ? 0 : -1; });
        $('[data-cw-name]', cw).textContent = sw.getAttribute('data-name');
        $('[data-cw-status]', cw).textContent = sw.getAttribute('data-status');
        var srcs = sw.getAttribute('data-views').split('|');
        stills.forEach(function (t, i) { t.setAttribute('data-view', srcs[i]); $('img', t).src = srcs[i]; if (t.getAttribute('aria-pressed') === 'true') img.src = srcs[i]; });
        if (window.PP_MODEL) window.PP_MODEL = Object.assign({}, window.PP_MODEL, { finish: sw.getAttribute('data-finish') });
        if (viewer) viewer.setModel(window.PP_MODEL);
        if (notifyBtn) { notifyBtn.href = sw.getAttribute('data-cw-href'); notifyLabel.textContent = sw.getAttribute('data-cw-cta'); }
      }
      sws.forEach(function (sw, i) {
        sw.tabIndex = sw.getAttribute('aria-checked') === 'true' ? 0 : -1;
        sw.addEventListener('click', function () { pick(sw); });
        sw.addEventListener('keydown', function (e) {
          var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
          if (!d) return; e.preventDefault();
          var n = sws[(i + d + sws.length) % sws.length]; pick(n); n.focus();
        });
      });
    }
  }

  // ---------- email helpers ----------
  $$('[data-join]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = $('input', f).value.trim();
      location.href = 'mailto:will@protonicprecision.com?subject=' + encodeURIComponent('Add me to the Protonic restock list') + '&body=' + encodeURIComponent('Please add ' + email + ' to the restock list.');
    });
  });
  $$('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = b.getAttribute('data-copy');
      var done = function () { b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy address'; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(t).then(done, function () {});
    });
  });
  $$('[data-year]').forEach(function (s) { s.textContent = new Date().getFullYear(); });
})();
