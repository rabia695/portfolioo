/* Rabia: поведение сайта. Тексты и проекты лежат в папке content/, здесь их менять не нужно. */
(function () {
  'use strict';

  var S = window.SETTINGS || {};
  var T = window.TEXTS || {};
  var P = window.PROJECTS || [];
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lang = 'ru';
  var demoMode = 'logo';
  var demoTouched = false;
  var copyTimer = null;

  /* ---------- помощники ---------- */

  function get(obj, path) {
    var parts = path.split('.');
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function tr(path) {
    var v = get(T[lang], path);
    if (v === undefined) v = get(T.ru, path);
    return v === undefined ? '' : v;
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null && text !== '') n.textContent = text;
    return n;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function isExternal(url) {
    return /^https?:\/\//i.test(url);
  }

  function detectLang() {
    try {
      var saved = localStorage.getItem('lang');
      if (saved && T[saved]) return saved;
    } catch (e) { /* хранилище может быть недоступно */ }
    var nav = (navigator.language || 'ru').toLowerCase();
    return /^(ru|be|kk)/.test(nav) ? 'ru' : 'en';
  }

  /* Картинка или подсказка-заглушка (если включено showPlaceholders) или ничего */
  function mediaBlock(src, alt, placeholderText, cls, eager, w, h) {
    var wrap = el('figure', 'media ' + (cls || ''));
    if (src) {
      if (w && h) {
        wrap.style.aspectRatio = w + ' / ' + h;
        wrap.className += ' has-ratio';
      }
      var img = document.createElement('img');
      img.alt = alt || '';
      if (w && h) { img.width = w; img.height = h; }
      img.loading = eager ? 'eager' : 'lazy';
      img.decoding = 'async';
      /* картинка проявляется, когда загрузилась, а не выскакивает рывком */
      var done = function () { wrap.className += ' is-loaded'; };
      img.addEventListener('load', done);
      img.addEventListener('error', done);
      img.src = src;
      if (img.complete) done();
      wrap.appendChild(img);
      return wrap;
    }
    if (S.showPlaceholders) {
      wrap.className += ' media--empty';
      wrap.appendChild(el('span', 'media-hint', placeholderText));
      return wrap;
    }
    return null;
  }

  /* ---------- статические тексты ---------- */

  function applyStatic() {
    var i, n, list, key, parts, p;

    document.documentElement.lang = lang;
    document.title = tr('meta.title');
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', tr('meta.description'));
    var ogt = document.querySelector('meta[property="og:title"]');
    if (ogt) ogt.setAttribute('content', tr('meta.title'));
    var ogd = document.querySelector('meta[property="og:description"]');
    if (ogd) ogd.setAttribute('content', tr('meta.description'));

    list = document.querySelectorAll('[data-i18n]');
    for (i = 0; i < list.length; i++) {
      list[i].textContent = tr(list[i].getAttribute('data-i18n'));
    }

    list = document.querySelectorAll('[data-i18n-attr]');
    for (i = 0; i < list.length; i++) {
      parts = list[i].getAttribute('data-i18n-attr').split(';');
      for (p = 0; p < parts.length; p++) {
        key = parts[p].split(':');
        if (key.length === 2) list[i].setAttribute(key[0].trim(), tr(key[1].trim()));
      }
    }

    list = document.querySelectorAll('[data-list]');
    for (i = 0; i < list.length; i++) {
      var items = tr(list[i].getAttribute('data-list'));
      clear(list[i]);
      for (n = 0; n < items.length; n++) {
        list[i].appendChild(el('li', '', items[n]));
      }
    }

    list = document.querySelectorAll('[data-checks]');
    for (i = 0; i < list.length; i++) {
      var checks = tr(list[i].getAttribute('data-checks'));
      clear(list[i]);
      for (n = 0; n < checks.length; n++) {
        var pair = checks[n].split('|');
        var li = el('li', '', '');
        li.appendChild(el('span', 'syschecks-k', pair[0]));
        li.appendChild(el('span', 'syschecks-v', pair[1] || ''));
        list[i].appendChild(li);
      }
    }

    list = document.querySelectorAll('[data-paras]');
    for (i = 0; i < list.length; i++) {
      var paras = tr(list[i].getAttribute('data-paras'));
      clear(list[i]);
      for (n = 0; n < paras.length; n++) {
        list[i].appendChild(el('p', '', paras[n]));
      }
    }

    list = document.querySelectorAll('[data-link]');
    for (i = 0; i < list.length; i++) {
      var url = S[list[i].getAttribute('data-link')];
      if (url) {
        list[i].setAttribute('href', url);
        if (isExternal(url)) {
          list[i].setAttribute('target', '_blank');
          list[i].setAttribute('rel', 'noopener');
        }
      }
    }

    var langBtns = document.querySelectorAll('[data-lang]');
    for (i = 0; i < langBtns.length; i++) {
      langBtns[i].setAttribute('aria-pressed', langBtns[i].getAttribute('data-lang') === lang ? 'true' : 'false');
    }

    var copyBtn = document.getElementById('copy-btn');
    if (copyBtn && !copyTimer) copyBtn.textContent = tr('contacts.copy');
  }

  /* ---------- кейс Kinni ---------- */

  /* ---------- первый экран: картинки Kinni по кругу ---------- */

  var heroTimer = null;

  function buildHeroKinni() {
    var box = document.getElementById('hero-kinni');
    if (!box) return;
    var list = (window.KINNI && window.KINNI.hero) || [];
    clear(box);
    if (heroTimer) { clearInterval(heroTimer); heroTimer = null; }
    if (!list.length) return;
    var imgs = list.map(function (f, i) {
      var im = document.createElement('img');
      im.src = 'images/kinni/' + f;
      im.alt = '';
      var pos = window.KINNI && window.KINNI.heroPos && window.KINNI.heroPos[f];
      if (pos) im.style.objectPosition = pos;
      im.decoding = 'async';
      if (i > 0) im.loading = 'lazy';
      im.className = i === 0 ? 'is-on' : '';
      box.appendChild(im);
      return im;
    });
    var cur = 0;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && imgs.length > 1) {
      heroTimer = setInterval(function () {
        imgs[cur].className = '';
        cur = (cur + 1) % imgs.length;
        imgs[cur].className = 'is-on';
      }, 4200);
    }
  }

  /* ---------- крупный просмотр слайдов ---------- */

  var lbState = null;

  function openLightbox(srcs, index, altFn, trigger) {
    closeLightbox(true);
    var root = el('div', 'lb');
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-label', tr('identity.zoomLabel'));
    var scroller = el('div', 'lb-scroll');
    var img = document.createElement('img');
    img.className = 'lb-img';
    scroller.appendChild(img);
    var close = el('button', 'lb-btn lb-close', '×');
    var prev = el('button', 'lb-btn lb-prev', '←');
    var next = el('button', 'lb-btn lb-next', '→');
    var zoom = el('button', 'lb-btn lb-zoom', tr('identity.zoomIn'));
    var count = el('span', 'lb-count');
    [close, prev, next, zoom].forEach(function (b) { b.type = 'button'; });
    close.setAttribute('aria-label', tr('identity.close'));
    prev.setAttribute('aria-label', tr('identity.prev'));
    next.setAttribute('aria-label', tr('identity.next'));
    root.appendChild(scroller);
    [close, prev, next, zoom, count].forEach(function (n) { root.appendChild(n); });
    document.body.appendChild(root);
    document.body.classList.add('lb-open');

    var i = index, zoomed = false;
    function show(k) {
      i = Math.max(0, Math.min(srcs.length - 1, k));
      img.src = srcs[i];
      img.alt = altFn(i);
      count.textContent = (i + 1) + ' / ' + srcs.length;
      prev.disabled = i === 0;
      next.disabled = i === srcs.length - 1;
      setZoom(false);
      scroller.scrollTop = 0; scroller.scrollLeft = 0;
    }
    function setZoom(z) {
      zoomed = z;
      root.classList.toggle('is-zoom', z);
      zoom.textContent = z ? tr('identity.zoomOut') : tr('identity.zoomIn');
    }
    function onKey(e) {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') show(i + 1);
      else if (e.key === 'ArrowLeft') show(i - 1);
      else if (e.key === 'Tab') {
        var f = [close, prev, next, zoom].filter(function (b) { return !b.disabled; });
        var a = document.activeElement, k = f.indexOf(a);
        if (!f.length) return;
        e.preventDefault();
        f[(k + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    }
    close.addEventListener('click', function () { closeLightbox(); });
    prev.addEventListener('click', function () { show(i - 1); });
    next.addEventListener('click', function () { show(i + 1); });
    zoom.addEventListener('click', function () { setZoom(!zoomed); });
    img.addEventListener('click', function () { setZoom(!zoomed); });
    root.addEventListener('click', function (e) { if (e.target === root || e.target === scroller) closeLightbox(); });
    var x0 = null;
    scroller.addEventListener('touchstart', function (e) { x0 = !zoomed && e.touches.length === 1 ? e.touches[0].clientX : null; }, { passive: true });
    scroller.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1));
    }, { passive: true });
    document.addEventListener('keydown', onKey);
    lbState = { root: root, onKey: onKey, trigger: trigger };
    show(i);
    close.focus();
  }

  function closeLightbox(silent) {
    if (!lbState) return;
    document.removeEventListener('keydown', lbState.onKey);
    if (lbState.root.parentNode) lbState.root.parentNode.removeChild(lbState.root);
    document.body.classList.remove('lb-open');
    var t = lbState.trigger;
    lbState = null;
    if (!silent && t && t.focus) t.focus();
  }

  function buildKinniSlider(box) {
    if (!box) return;
    var K = window.KINNI || {};
    var sets = [
      { key: 'presentation', label: tr('identity.tabPres'), list: K.presentation || [] },
      { key: 'brandbook', label: tr('identity.tabBrand'), list: K.brandbook || [] }
    ].filter(function (x) { return x.list.length; });
    clear(box);
    if (!sets.length) return;

    var info = tr('identity.info') || [];
    function infoCard(it) {
      var card = el('article', 'card kinfo-card');
      card.appendChild(el('p', 'kinfo-label', it.label));
      if (it.text) card.appendChild(el('p', '', it.text));
      if (it.list) {
        var ul = el('ul', 'kinfo-list');
        it.list.forEach(function (t) { ul.appendChild(el('li', '', t)); });
        card.appendChild(ul);
      }
      return card;
    }
    if (info.length) {
      var first = el('div', 'kinfo kinfo--one');
      first.appendChild(infoCard(info[0]));
      box.appendChild(first);
    }
    var coll = K.collateral || [];
    if (coll.length) {
      var cg = el('div', 'kcollat');
      coll.forEach(function (f) {
        var m = mediaBlock('images/kinni/' + f, tr('identity.collatAlt'), '', 'case-media', false, 1600, 900);
        if (m) cg.appendChild(m);
      });
      box.appendChild(cg);
    }
    if (info.length > 1) {
      var grid = el('div', 'kinfo');
      info.slice(1).forEach(function (it) { grid.appendChild(infoCard(it)); });
      box.appendChild(grid);
    }

    var tabs = el('div', 'kslider-tabs');
    tabs.setAttribute('role', 'tablist');
    var stage = el('div', 'kslider-stage');
    var track = el('div', 'kslider-track');
    track.setAttribute('tabindex', '0');
    track.setAttribute('aria-label', tr('identity.sliderLabel'));
    var prev = el('button', 'kslider-btn kslider-prev', '←');
    var next = el('button', 'kslider-btn kslider-next', '→');
    prev.type = next.type = 'button';
    prev.setAttribute('aria-label', tr('identity.prev'));
    next.setAttribute('aria-label', tr('identity.next'));
    var count = el('span', 'kslider-count');
    var current = 0, active = 0;

    function slideW() { return track.clientWidth; }
    function update() {
      var n = sets[active].list.length;
      current = Math.max(0, Math.min(n - 1, Math.round(track.scrollLeft / Math.max(1, slideW()))));
      count.textContent = (current + 1) + ' / ' + n;
      prev.disabled = current === 0;
      next.disabled = current === n - 1;
    }
    function go(i) {
      var n = sets[active].list.length;
      i = Math.max(0, Math.min(n - 1, i));
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      track.scrollTo({ left: i * slideW(), behavior: reduce ? 'auto' : 'smooth' });
    }
    function render(k) {
      active = k;
      clear(track);
      var set = sets[k];
      set.list.forEach(function (f, i) {
        var fig = el('figure', 'kslide');
        var img = document.createElement('img');
        img.src = 'images/kinni/' + f;
        img.alt = tr('identity.slideAlt').replace('{set}', set.label).replace('{n}', i + 1).replace('{total}', set.list.length);
        img.decoding = 'async';
        if (i > 0) img.loading = 'lazy';
        fig.appendChild(img);
        track.appendChild(fig);
      });
      track.scrollLeft = 0;
      [].forEach.call(tabs.children, function (b, j) {
        b.setAttribute('aria-selected', j === k ? 'true' : 'false');
        b.className = 'kslider-tab' + (j === k ? ' is-on' : '');
      });
      update();
    }

    sets.forEach(function (set, k) {
      var b = el('button', 'kslider-tab', set.label);
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.addEventListener('click', function () { render(k); });
      tabs.appendChild(b);
    });
    prev.addEventListener('click', function () { go(current - 1); });
    next.addEventListener('click', function () { go(current + 1); });
    track.addEventListener('scroll', function () { window.requestAnimationFrame(update); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
    });
    window.addEventListener('resize', function () { track.scrollLeft = current * slideW(); });

    var zoomBtn = el('button', 'kslider-zoom', tr('identity.zoomBtn'));
    zoomBtn.type = 'button';
    zoomBtn.setAttribute('aria-label', tr('identity.zoomLabel'));
    function zoomOpen() {
      var set = sets[active];
      openLightbox(set.list.map(function (f) { return 'images/kinni/' + f; }), current, function (k) {
        return tr('identity.slideAlt').replace('{set}', set.label).replace('{n}', k + 1).replace('{total}', set.list.length);
      }, zoomBtn);
    }
    zoomBtn.addEventListener('click', zoomOpen);
    track.addEventListener('click', function (e) { if (e.target.tagName === 'IMG') zoomOpen(); });
    stage.appendChild(track);
    stage.appendChild(zoomBtn);
    stage.appendChild(prev);
    stage.appendChild(next);
    var bar = el('div', 'kslider-bar');
    bar.appendChild(tabs);
    bar.appendChild(count);
    box.appendChild(bar);
    box.appendChild(stage);
    if (S.telegram && !box.getAttribute('data-nofoot')) {
      var foot = el('div', 'kslider-foot');
      foot.appendChild(linkBtn(S.telegram, tr('casePage.cta'), 'btn btn--dark btn--lg'));
      box.appendChild(foot);
    }
    render(0);
  }

  function linkBtn(url, label, cls) {
    var a = el('a', cls, label);
    a.setAttribute('href', url);
    if (isExternal(url)) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    }
    return a;
  }

  /* ---------- проекты ---------- */

  function buildProjects() {
    var box = document.getElementById('project-list');
    if (!box) return;
    clear(box);

    for (var i = 0; i < P.length; i++) {
      var pr = P[i];
      var d = pr[lang] || pr.ru;
      var art = el('article', 'card project');
      art.id = 'project-' + pr.id;

      /* картинки */
      var gallery = el('div', 'gallery');
      var imgs = (pr.cover ? [pr.cover] : []).concat(pr.images || []);
      if (imgs.length) {
        for (var k = 0; k < imgs.length; k++) {
          var m = mediaBlock(imgs[k], d.title, '', k === 0 ? 'gallery-main' : 'gallery-more');
          if (m) gallery.appendChild(m);
        }
      } else {
        var mp = mediaBlock('', d.title, tr('projects.imgPlaceholder'), 'gallery-main');
        if (mp) gallery.appendChild(mp);
      }
      var hasGallery = gallery.childNodes.length > 0;
      if (hasGallery) {
        var wrap = el('a', 'gallery-link');
        wrap.href = 'case.html?id=' + encodeURIComponent(pr.id);
        wrap.setAttribute('aria-label', d.title + ' — ' + tr('casePage.open'));
        wrap.appendChild(gallery);
        art.appendChild(wrap);
      }
      else art.className += ' project--solo';

      /* текст */
      var body = el('div', 'project-body');
      var head = el('div', 'project-head');
      head.appendChild(el('h3', '', d.title));
      if (d.tag) head.appendChild(el('span', 'chip', d.tag));
      body.appendChild(head);

      var dl = el('dl', 'facts');
      addFact(dl, tr('projects.task'), d.task);
      addFact(dl, tr('projects.did'), d.did);
      if (d.result) addFact(dl, tr('projects.result'), d.result);
      body.appendChild(dl);

      if (d.stats && d.stats.length) {
        var stats = el('ul', 'stats');
        for (var s = 0; s < d.stats.length; s++) {
          var li = el('li');
          li.appendChild(el('span', 'stat-v', d.stats[s].v));
          li.appendChild(el('span', 'stat-t', d.stats[s].t));
          stats.appendChild(li);
        }
        body.appendChild(stats);
      }
      if (d.note) body.appendChild(el('p', 'project-note', d.note));

      var actions = el('div', 'project-actions');
      var open = el('a', 'btn btn--dark project-btn', tr('casePage.open'));
      open.href = 'case.html?id=' + encodeURIComponent(pr.id);
      actions.appendChild(open);
      if (pr.behance) actions.appendChild(linkBtn(pr.behance, tr('projects.behance'), 'btn btn--outline project-btn'));
      body.appendChild(actions);

      art.appendChild(body);
      box.appendChild(art);
    }

    if (S.comingSoonCard) {
      var soon = el('article', 'card project project--soon');
      soon.appendChild(el('h3', '', tr('projects.soonTitle')));
      soon.appendChild(el('p', '', tr('projects.soonText')));
      if (S.telegram) soon.appendChild(linkBtn(S.telegram, tr('projects.soonBtn'), 'btn btn--dark project-btn'));
      box.appendChild(soon);
    }
  }

  function addFact(dl, label, value) {
    if (!value) return;
    var wrap = el('div', 'fact');
    wrap.appendChild(el('dt', '', label));
    wrap.appendChild(el('dd', '', value));
    dl.appendChild(wrap);
  }

  /* ---------- обо мне ---------- */

  function buildFooter() {
    var L = S.legal || {};
    [['f-inn', 'inn'], ['f-ogrnip', 'ogrnip'], ['f-address', 'address'], ['f-email', 'email']].forEach(function (p) {
      var node = document.getElementById(p[0]);
      if (!node) return;
      var label = tr('footer.' + p[1]);
      clear(node);
      if (L[p[1]]) {
        node.hidden = false;
        node.appendChild(document.createTextNode(label + ': '));
        if (p[1] === 'email') {
          var a = el('a', null, L.email);
          a.href = 'mailto:' + L.email;
          node.appendChild(a);
        } else {
          node.appendChild(document.createTextNode(L[p[1]]));
        }
      } else if (S.showPlaceholders) {
        node.hidden = false;
        node.textContent = label + ': …';
      } else {
        node.hidden = true;
      }
    });
  }

  function buildStages() {
    var box = document.getElementById('stages-list');
    if (!box) return;
    clear(box);
    var items = tr('process.stages');
    if (!items || !items.length) return;
    items.forEach(function (s) {
      var li = el('li');
      li.appendChild(el('span', 'stage-name', s.name));
      li.appendChild(el('span', 'stage-days', s.days));
      box.appendChild(li);
    });
  }

  function buildAbout() {
    var box = document.getElementById('about-photo');
    if (!box) return;
    var section = document.getElementById('about');
    clear(box);
    var m = mediaBlock(S.portrait, tr('about.photoAlt'), tr('about.photoPlaceholder'), 'portrait');
    if (m) {
      box.appendChild(m);
      section.classList.remove('about--solo');
    } else {
      section.classList.add('about--solo');
    }
  }

  /* ---------- пример на первом экране ---------- */

  function setDemo(mode, byUser) {
    var stage = document.getElementById('stage');
    if (!stage) return;
    demoMode = mode;
    if (byUser) demoTouched = true;
    stage.setAttribute('data-mode', mode);

  }

  /* ---------- копирование шаблона сообщения ---------- */

  function copyTemplate() {
    var text = tr('contacts.template');
    var btn = document.getElementById('copy-btn');

    function done() {
      btn.textContent = tr('contacts.copied');
      clearTimeout(copyTimer);
      copyTimer = setTimeout(function () {
        copyTimer = null;
        btn.textContent = tr('contacts.copy');
      }, 2000);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }

    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { /* ничего */ }
      document.body.removeChild(ta);
    }
  }

  /* ---------- меню на телефоне ---------- */

  function setMenu(open) {
    if (!document.getElementById('menu-btn')) return;
    var nav = document.getElementById('nav');
    var btn = document.getElementById('menu-btn');
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  /* ---------- страница одного кейса ---------- */

  function currentCase() {
    var id = '';
    try { id = new URLSearchParams(location.search).get('id') || ''; } catch (e) { id = ''; }
    if (!id) {
      var mm = location.search.match(/[?&]id=([^&]+)/);
      id = mm ? decodeURIComponent(mm[1]) : '';
    }
    for (var i = 0; i < P.length; i++) if (P[i].id === id) return P[i];
    return null;
  }

  function aboutItem(label, text) {
    var item = el('div', 'about-item');
    item.appendChild(el('p', 'about-label', label));
    item.appendChild(el('p', '', text));
    return item;
  }

  function appendStats(box, list) {
    if (!list || !list.length) return;
    var stats = el('ul', 'stats');
    for (var s = 0; s < list.length; s++) {
      var li = el('li');
      li.appendChild(el('span', 'stat-v', list[s].v));
      li.appendChild(el('span', 'stat-t', list[s].t));
      stats.appendChild(li);
    }
    box.appendChild(stats);
  }

  function buildCase() {
    var box = document.getElementById('case-body');
    if (!box) return;
    clear(box);

    var pr = currentCase();
    var head = document.getElementById('case-head');
    clear(head);

    if (!pr) {
      head.appendChild(el('h1', '', tr('casePage.missingTitle')));
      head.appendChild(el('p', 'lead', tr('casePage.missingText')));
      document.title = tr('casePage.missingTitle');
      return;
    }

    var d = pr[lang] || pr.ru;
    var story = pr.story || {};
    var sd = story[lang] || story.ru || {};

    var topBack = document.querySelector('.doc-back');
    if (topBack) {
      topBack.href = 'index.html#project-' + pr.id;
      topBack.setAttribute('data-back', '1');
    }

    document.title = d.title + ' — ' + tr('casePage.docTitle');
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', d.task || '');

    /* шапка кейса */
    head.appendChild(el('h1', '', d.title));
    if (sd.lead) head.appendChild(el('p', 'lead', sd.lead));

    if (d.client) {
      /* «О проекте»: заказчик, задача, срок, решение и цифры */
      var about = el('section', 'case-about');
      about.appendChild(el('h2', 'about-title', tr('casePage.about')));
      var grid = el('div', 'about-grid');

      var c1 = el('div', 'about-col');
      c1.appendChild(aboutItem(tr('casePage.client'), d.client));
      grid.appendChild(c1);

      var c2 = el('div', 'about-col');
      c2.appendChild(aboutItem(tr('casePage.task'), d.caseTask || d.task));
      if (d.timeline) c2.appendChild(aboutItem(tr('casePage.timeline'), d.timeline));
      grid.appendChild(c2);

      if (d.solution && d.solution.length) {
        var c3 = el('div', 'about-col');
        var item = el('div', 'about-item');
        item.appendChild(el('p', 'about-label', tr('casePage.solution')));
        var ul = el('ul', 'dots about-list');
        for (var q = 0; q < d.solution.length; q++) ul.appendChild(el('li', '', d.solution[q]));
        item.appendChild(ul);
        c3.appendChild(item);
        grid.appendChild(c3);
      }
      about.appendChild(grid);
      box.appendChild(about);
      appendStats(box, d.caseStats || d.stats);
    } else if (!story.kinni) {
      /* задача и что сделано */
      var dl = el('dl', 'facts');
      addFact(dl, tr('projects.task'), d.task);
      addFact(dl, tr('projects.did'), d.did);
      if (d.result) addFact(dl, tr('projects.result'), d.result);
      if (dl.childNodes.length) box.appendChild(dl);
      appendStats(box, d.stats);
    }
    if (d.note) box.appendChild(el('p', 'project-note', d.note));

    /* кейс Кинни: пояснение, карточки, слайдеры презентации и брендбука */
    if (story.kinni) {
    }

    /* блоки кейса: текст и картинки по порядку; подряд идущие картинки собираются в одну ленту */
    var blocks = story.blocks || [];
    var gallery = null;
    for (var b = 0; b < blocks.length; b++) {
      var bl = blocks[b];
      var bt = bl[lang] || bl.ru || {};
      if (bl.t === 'text') {
        gallery = null;
        var sec = el('section', 'case-text');
        if (bt.title) sec.appendChild(el('h2', '', bt.title));
        if (bt.text) sec.appendChild(el('p', '', bt.text));
        box.appendChild(sec);
      } else if (bl.t === 'img') {
        var media = mediaBlock(bl.src, bt.alt || d.title, tr('casePage.imgPlaceholder'), 'case-media', true, bl.w, bl.h);
        if (!media) continue;
        if (bl.src && bt.caption) media.appendChild(el('figcaption', 'case-caption', bt.caption));
        if (!gallery) {
          gallery = el('div', 'case-gallery' + (story.tone ? ' case-gallery--' + story.tone : ''));
          box.appendChild(gallery);
        }
        if (bl.gap) media.classList.add('gap-after');
        gallery.appendChild(media);
      }
    }

    if (story.kinni) {
      var kb = el('div', 'kslider');
      kb.setAttribute('data-nofoot', '1');
      box.appendChild(kb);
      buildKinniSlider(kb);
    }

    if (!blocks.length && !story.kinni) {
      var ph = mediaBlock('', d.title, tr('casePage.imgPlaceholder'), 'case-media');
      if (ph) {
        var g0 = el('div', 'case-gallery');
        g0.appendChild(ph);
        box.appendChild(g0);
      }
    }

    /* кнопки внизу */
    var foot = el('div', 'case-foot');
    if (S.telegram) foot.appendChild(linkBtn(S.telegram, tr('casePage.cta'), 'btn btn--dark btn--lg'));
    var backAll = el('a', 'case-all', tr('casePage.allProjects'));
    backAll.href = 'index.html#project-' + pr.id;
    backAll.setAttribute('data-back', '1');
    foot.appendChild(backAll);
    box.appendChild(foot);
  }

  /* ---------- запуск ---------- */

  /* Висячие предлоги: короткие слова и тире склеиваются со следующим словом неразрывным пробелом */
  var GLUE_RU = /(^|[\s\u00a0(«"„])((?:[а-яёА-ЯЁ]{1,3}|[Нн]е|[Пп]ри|[Дд]ля|[Бб]ез|[Нн]ад|[Пп]од|[Чч]то|[Кк]ак|[Ии]ли|[Нн]ужно)|[aAIi])[ \t]+(?=[^\s])/g;
  function glueText(s) {
    var prev;
    do { prev = s; s = s.replace(GLUE_RU, '$1$2\u00a0'); } while (s !== prev);
    return s.replace(/ ([—–])/g, '\u00a0$1');
  }
  function glue(root) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode && n.parentNode.nodeName;
        return (p === 'SCRIPT' || p === 'STYLE' || p === 'NOSCRIPT' || p === 'TITLE') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var n, list = [];
    while ((n = w.nextNode())) list.push(n);
    list.forEach(function (t) {
      var g = glueText(t.nodeValue);
      if (g !== t.nodeValue) t.nodeValue = g;
    });
  }

  /* страница кейса всегда открывается с самого начала */
  function toCaseTop() {
    if (!document.getElementById('case-body') || location.hash) return;
    try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
    window.scrollTo(0, 0);
    if (window.requestAnimationFrame) window.requestAnimationFrame(function () { window.scrollTo(0, 0); });
    window.addEventListener('load', function () { window.scrollTo(0, 0); });
  }

  function render() {
    applyStatic();
    try { buildHeroKinni(); } catch (e) { if (window.console) console.error(e); }
    buildProjects();
    buildAbout();
    buildStages();
    buildCase();
    toCaseTop();
    buildFooter();
    setDemo(demoMode, false);
    glue(document.body);
  }

  function init() {
    lang = detectLang();
    render();

    var langBtns = document.querySelectorAll('[data-lang]');
    Array.prototype.forEach.call(langBtns, function (b) {
      b.addEventListener('click', function () {
        lang = b.getAttribute('data-lang');
        try { localStorage.setItem('lang', lang); } catch (e) { /* ничего */ }
        render();
      });
    });

    var copyBtn = document.getElementById('copy-btn');
    if (copyBtn) copyBtn.addEventListener('click', copyTemplate);

    var menuBtn = document.getElementById('menu-btn');
    if (menuBtn) {
      menuBtn.addEventListener('click', function () {
        setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
      });
    }
    Array.prototype.forEach.call(document.querySelectorAll('#nav a'), function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });

    /* Одно продуманное движение: знак собирается в систему. При reduced-motion не запускается. */
    if (!reduceMotion) {
      setTimeout(function () {
        if (!demoTouched) setDemo('system', false);
      }, 1800);
    }
  }

  init();
})();
