'use strict';

/* ---------- Language Init (runs last — sets lang after all modules ready) ---------- */
(function initLang() {
  // Detect preference: saved → browser lang → default zh
  const saved       = localStorage.getItem('twpop_lang');
  const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
  window.currentLang = saved || (browserLang.startsWith('zh') ? 'zh' : 'en');

  window.setLang = function(lang) {
    window.currentLang = lang;
    localStorage.setItem('twpop_lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';
    const L = LANG[lang];

    // Update all [data-i18n] text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.dataset.i18n;
      if (L[k] !== undefined) el.textContent = L[k];
    });

    // Update [data-i18n-html] nodes (allow <br> etc.)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const k = el.dataset.i18nHtml;
      if (L[k] !== undefined) el.innerHTML = L[k];
    });

    // Toggle active state on all lang buttons (desktop + mobile)
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Re-render dynamic sections
    if (typeof renderEvents === 'function') renderEvents();
    if (typeof renderFeaturedBanner === 'function') renderFeaturedBanner();
    if (window.reRenderCalendar) window.reRenderCalendar();
    if (window.reRenderNews) window.reRenderNews();
  };

  // Attach click handlers to all lang buttons (injected by components.js)
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.lang-btn');
    if (btn && btn.dataset.lang) window.setLang(btn.dataset.lang);
  });

  // Apply on load
  window.setLang(window.currentLang);
  if (typeof renderEvents === 'function') renderEvents();
  if (typeof renderFeaturedBanner === 'function') renderFeaturedBanner();
})();
