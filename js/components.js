'use strict';

/* ---------- Shared Navbar + Footer Component Injection ---------- */
(function injectComponents() {
  const path = window.location.pathname;
  const page = path.includes('event.html') ? 'event-detail'
             : path.includes('events')   ? 'events'
             : path.includes('calendar') ? 'calendar'
             : path.includes('concept')  ? 'concept'
             : path.includes('awe')      ? 'awe'
             : path.includes('article')  ? 'article'
             : path.includes('news')     ? 'news'
             : 'home';

  /* ── Links: resolve relative to current page ── */
  const href = {
    logo:     page === 'home'     ? '#'              : 'index.html',
    concept:  page === 'concept'  ? '#'              : 'concept.html',
    news:     page === 'news'     ? '#'              : 'news.html',
    events:   page === 'events'   ? '#events'        : 'events.html',
    awe:      page === 'awe'      ? '#'              : 'awe.html',
    calendar: page === 'calendar' ? '#'              : 'calendar.html',
    contact:  page === 'home'     ? '#contact'       : 'index.html#contact',
    quiz:     page === 'awe'      ? '#quiz'          : 'awe.html#quiz',
  };

  const activeClass = (p) => page === p ? ' active' : '';

  /* ── Navbar ── */
  const nav = document.getElementById('navbar');
  if (nav) {
    nav.className = 'tp-nav';
    nav.innerHTML = `
      <a href="${href.logo}" class="tp-nav-logo">
        <img src="images/taiwanpop_green.png" alt="Taiwan Pop" style="height:32px;width:auto;">
      </a>
      <ul class="tp-nav-links" id="navLinks">
        <li><a href="${href.concept}"  class="${'nav-link' + activeClass('concept')}"  data-i18n="nav-concept">策展理念</a></li>
        <li><a href="${href.news}"     class="${'nav-link' + activeClass('news')}"     data-i18n="nav-news">最新消息</a></li>
        <li><a href="${href.events}"   class="${'nav-link' + activeClass('events')}"   data-i18n="nav-events">展演活動</a></li>
        <li><a href="${href.calendar}" class="${'nav-link' + activeClass('calendar')}" data-i18n="nav-calendar">行事曆</a></li>
      </ul>
      <button class="tp-nav-toggle" id="navToggle" aria-label="開啟選單">
        <span></span><span></span><span></span>
      </button>
      <div class="lang-toggle">
        <button class="lang-btn" data-lang="zh">中</button>
        <span class="lang-sep">|</span>
        <button class="lang-btn" data-lang="en">EN</button>
      </div>`;

    /* Mobile overlay — injected after <nav>, before first child of body */
    const mobile = document.createElement('div');
    mobile.className = 'tp-nav-mobile';
    mobile.id = 'navMobile';
    mobile.innerHTML = `
      <div class="lang-toggle-mobile">
        <button class="lang-btn" data-lang="zh">中文</button>
        <span class="lang-sep">|</span>
        <button class="lang-btn" data-lang="en">ENGLISH</button>
      </div>
      <a href="${href.concept}"><span data-i18n="nav-concept">策展理念</span><span class="zh">CONCEPT</span></a>
      <a href="${href.news}"><span data-i18n="nav-news">最新消息</span><span class="zh">NEWS</span></a>
      <a href="${href.events}"><span data-i18n="nav-events">展演活動</span><span class="zh">EVENTS</span></a>
      <a href="${href.calendar}"><span data-i18n="nav-calendar">行事曆</span><span class="zh">CALENDAR</span></a>
      <a href="${href.events}" class="tp-nav-mobile-cta" data-i18n="btn-explore">探索活動 ↗</a>`;
    nav.insertAdjacentElement('afterend', mobile);
  }

  /* ── Footer ── */
  const footer = document.getElementById('contact');
  if (footer) {
    footer.className = 'tp-footer';
    footer.innerHTML = `
      <div class="tp-footer-inner" style="max-width:1200px;margin:0 auto;">
        <div>
          <div class="tp-footer-logo">TAIWANPOP</div>
          <p class="tp-footer-tagline" data-i18n="footer-desc">Taiwan Pop 是台灣文化部與Taipei Cultural Center in NY合作的年度文化交流計畫，透過七大藝文展演讓台灣被世界看見。</p>
          <div style="display:flex;gap:12px;margin-top:1.4rem;">
            <a href="#" aria-label="Instagram" style="color:rgba(0,0,0,0.4);transition:color .2s;" onmouseover="this.style.color='#000'" onmouseout="this.style.color='rgba(0,0,0,0.4)'">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a href="#" aria-label="YouTube" style="color:rgba(0,0,0,0.4);transition:color .2s;" onmouseover="this.style.color='#000'" onmouseout="this.style.color='rgba(0,0,0,0.4)'">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="#" aria-label="Facebook" style="color:rgba(0,0,0,0.4);transition:color .2s;" onmouseover="this.style.color='#000'" onmouseout="this.style.color='rgba(0,0,0,0.4)'">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>
        <div>
          <p class="tp-footer-col-title">導覽</p>
          <ul class="tp-footer-links">
            <li><a href="${href.concept}" data-i18n="nav-concept">策展理念</a></li>
            <li><a href="${href.news}"    data-i18n="footer-news">最新消息</a></li>
            <li><a href="${href.events}"  data-i18n="footer-events">展演活動</a></li>
            <li><a href="${href.calendar}" data-i18n="footer-cal">行事曆</a></li>
          </ul>
        </div>
        <div>
          <p class="tp-footer-col-title" data-i18n="footer-contact-h">聯絡資訊</p>
          <ul class="tp-footer-links">
            <li>New York, NY / 台灣 台北市</li>
            <li data-i18n="footer-hours">週一至週五 09:00–18:00 (TST)</li>
            <li style="margin-top:.8rem;"><a href="https://tccny.moc.gov.tw/ch/Default.aspx" target="_blank" rel="noopener">紐文臺北文化中心</a></li>
          </ul>
        </div>
      </div>
      <div class="tp-footer-bottom" style="max-width:1200px;margin:0 auto;">
        <span class="tp-footer-copy">© 2026 Taiwan Pop. All rights reserved.</span>
        <div class="tp-footer-dots">
          <div class="tp-footer-dot" style="background:var(--green)"></div>
          <div class="tp-footer-dot" style="background:var(--blue)"></div>
          <div class="tp-footer-dot" style="background:var(--pink)"></div>
        </div>
        <span class="tp-footer-copy">台灣文化部 × Taipei Cultural Center in NY</span>
      </div>`;
  }
})();
