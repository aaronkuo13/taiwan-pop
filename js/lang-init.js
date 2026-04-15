'use strict';

/* ---------- Language Init (runs last — sets lang after all modules ready) ---------- */
(function initLang() {
  // Detect preference: saved → browser lang → default zh
  const saved      = localStorage.getItem('twpop_lang');
  const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
  window.currentLang = saved || (browserLang.startsWith('zh') ? 'zh' : 'en');

  // Inject ZH | EN pill toggle into navLinks as the last <li>
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    const li = document.createElement('li');
    li.className = 'nav-lang-item';
    li.innerHTML =
      '<div class="lang-toggle" aria-label="Switch language">' +
      '<button class="lang-btn" data-lang="zh">ZH</button>' +
      '<button class="lang-btn" data-lang="en">EN</button>' +
      '</div>';
    navLinks.appendChild(li);
    li.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => window.setLang(btn.dataset.lang));
    });
  }

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

    // Toggle active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Re-render dynamic sections
    renderEvents();
    if (typeof renderFeaturedBanner === 'function') renderFeaturedBanner();
    if (window.reRenderCalendar) window.reRenderCalendar();
    if (window.reRenderNews) window.reRenderNews();
  };

  // Apply on load
  window.setLang(window.currentLang);
  // Render events + featured banner on initial load (injected sections start empty)
  renderEvents();
  if (typeof renderFeaturedBanner === 'function') renderFeaturedBanner();
})();
