/* ============================================================
   GRIDIRON BREWING — shared interactions
   ============================================================ */
(function () {
  /* ---- sticky header background on scroll ---- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu toggle ---- */
  var menuBtn = document.querySelector('.menu-btn');
  var navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  /* ---- scroll reveals ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ============================================================
     TAP-LIST FILTER (Beers page only)
     ============================================================ */
  var grid = document.querySelector('[data-tap-grid]');
  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.beer-card'));
  var state = { style: 'all', abv: 'all' };
  var countEl = document.querySelector('[data-tap-count]');
  var noRes = document.querySelector('.no-results');

  function abvBucket(v) {
    if (v < 5) return 'session';
    if (v <= 6.5) return 'standard';
    return 'strong';
  }

  function apply() {
    var shown = 0;
    cards.forEach(function (card) {
      var styleOk = state.style === 'all' || card.dataset.style === state.style;
      var abvOk = state.abv === 'all' || abvBucket(parseFloat(card.dataset.abv)) === state.abv;
      var ok = styleOk && abvOk;
      card.classList.toggle('hidden', !ok);
      if (ok) shown++;
    });
    if (countEl) countEl.innerHTML = '<b>' + shown + '</b> ' + (shown === 1 ? 'beer' : 'beers') + ' on tap';
    if (noRes) noRes.style.display = shown === 0 ? 'block' : 'none';
  }

  document.querySelectorAll('[data-filter]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var group = chip.dataset.filter; // 'style' | 'abv'
      var val = chip.dataset.value;
      state[group] = val;
      document.querySelectorAll('[data-filter="' + group + '"]').forEach(function (c) {
        c.classList.toggle('active', c === chip);
      });
      apply();
    });
  });

  apply();
})();
