/* Плавные переходы между страницами: страница мягко гаснет и следующая мягко проявляется.
   Подключён на всех страницах сайта. При включённой настройке «уменьшить движение» переходы обычные. */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var leaving = false;
  function leave(go) {
    if (leaving) return;
    leaving = true;
    if (reduceMotion) { go(); return; }
    document.documentElement.classList.add('is-leaving');
    setTimeout(go, 260);
  }

  /* Возврат из кейса: если пришли с главной, вернуться ровно туда, где были */
  function cameFromHome() {
    try {
      if (!document.referrer || history.length < 2) return false;
      var r = new URL(document.referrer);
      if (r.host !== location.host || r.protocol !== location.protocol) return false;
      return /(^|\/)(index\.html)?$/.test(r.pathname);
    } catch (e) { return false; }
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || a.target || a.hasAttribute('download')) return;
    var u;
    try { u = new URL(a.href, location.href); } catch (err) { return; }
    if (u.protocol !== location.protocol || u.host !== location.host) return;
    if (!/(\.html|\/)$/.test(u.pathname)) return;
    if (u.pathname === location.pathname && u.search === location.search) return; /* якорь на этой же странице */
    e.preventDefault();
    if (a.hasAttribute('data-back') || a.classList.contains('doc-back')) {
      if (cameFromHome() && document.querySelector('.case')) {
        leave(function () { history.back(); });
        return;
      }
    }
    leave(function () { location.href = u.href; });
  });

  /* страница вернулась из кэша браузера: показать снова */
  window.addEventListener('pageshow', function (e) {
    leaving = false;
    document.documentElement.classList.remove('is-leaving');
  });
})();
