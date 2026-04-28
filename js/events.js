'use strict';

/* ---------- Render Events (grouped by category, primary/secondary hierarchy) ---------- */
function renderEvents() {
  const lang = window.currentLang || 'zh';
  const grid = document.querySelector('.events-grid');
  if (!grid) return;

  // Wait for visibility config from Firestore (null = still loading)
  if (window.eventsVisibility === null) {
    grid.innerHTML = '<div style="padding:5rem 2.5rem;font-family:var(--font-m);font-size:0.65rem;letter-spacing:0.2em;color:rgba(255,255,255,0.2);text-align:center">LOADING · 載入中</div>';
    return;
  }

  const L = LANG[lang];
  const vis = window.eventsVisibility || {};
  const visibleEvents = EVENTS.filter(e => vis[e.num] !== false);

  const CATEGORIES = [
    { id:'sound',  code:'SOUND',  labelKey:'cat-sound-label',  subKey:'cat-sound-sub',  num:'01' },
    { id:'image',  code:'IMAGE',  labelKey:'cat-image-label',  subKey:'cat-image-sub',  num:'02' },
    { id:'street', code:'STREET', labelKey:'cat-street-label', subKey:'cat-street-sub', num:'03' },
  ];

  function dateStr(ev) {
    if (!ev.date || ev.date === 'TBA') return 'TBA';
    return ev.endDate
      ? `${ev.date.replace(/-/g,'.')} – ${ev.endDate.replace(/-/g,'.')}`
      : ev.date.replace(/-/g,'.');
  }

  function comingOverlay() {
    return `<div class="card-coming"><span>COMING SOON</span></div>`;
  }

  function comingSoonCard(catId) {
    const sub = lang === 'en' ? 'Stay tuned for updates.' : '活動資訊即將公布';
    return `
      <div class="primary-card primary-card-${catId}" style="cursor:default;opacity:0.55;">
        <div class="primary-card-img">
          <div class="primary-card-img-placeholder" style="font-size:6rem;">✦</div>
        </div>
        <div class="primary-card-body">
          <div class="primary-card-cat"><span class="cat cat-${catId}">${catId.toUpperCase()}</span></div>
          <div class="primary-card-title">COMING SOON</div>
          <div class="primary-card-subtitle">${sub}</div>
          <div class="primary-card-date">2026</div>
        </div>
      </div>`;
  }

  function primaryCard(ev, catId) {
    const t      = (lang === 'en' && ev.title_en)   ? ev.title_en   : ev.title;
    const sub    = (lang === 'en' && ev.subtitle_en) ? ev.subtitle_en : (ev.subtitle || '');
    const coming = !ev.img;
    const imgHtml = ev.img
      ? `<img src="${ev.img}" alt="${t}" loading="lazy">`
      : `<div class="primary-card-img-placeholder">${ev.icon || ''}</div>`;
    return `
      <a href="event.html?num=${ev.num}" class="primary-card primary-card-${catId}"${coming ? ' style="position:relative"' : ''}>
        <div class="primary-card-img">${imgHtml}</div>
        <div class="primary-card-body">
          <div class="primary-card-cat"><span class="cat cat-${catId}">${catId.toUpperCase()}</span></div>
          <div class="primary-card-title">${t}</div>
          <div class="primary-card-subtitle">${sub}</div>
          <div class="primary-card-date">${dateStr(ev)}</div>
        </div>
        ${coming ? comingOverlay() : ''}
      </a>`;
  }

  function secondaryCard(ev, catId) {
    const t      = (lang === 'en' && ev.title_en) ? ev.title_en : ev.title;
    const coming = !ev.img;
    const imgHtml = ev.img
      ? `<img src="${ev.img}" alt="${t}" loading="lazy">`
      : `<div class="secondary-card-img-placeholder">${ev.icon || ''}</div>`;
    return `
      <a href="event.html?num=${ev.num}" class="secondary-card"${coming ? ' style="position:relative"' : ''}>
        <div class="secondary-card-img">${imgHtml}</div>
        <div class="secondary-card-body">
          <div class="secondary-card-cat"><span class="cat cat-${catId}">${catId.toUpperCase()}</span></div>
          <div class="secondary-card-title">${t}</div>
          <div class="secondary-card-date">${dateStr(ev)}</div>
        </div>
        ${coming ? comingOverlay() : ''}
      </a>`;
  }

  grid.innerHTML = CATEGORIES.map((cat, idx) => {
    const primary   = visibleEvents.filter(e => e.category === cat.id &&  e.isPrimary);
    const secondary = visibleEvents.filter(e => e.category === cat.id && !e.isPrimary);
    const total     = primary.length + secondary.length;

    const catNumLabel = `0${idx + 1} · ${L[cat.labelKey] || ''}`;

    const secondaryHtml = secondary.length ? `
      <div class="secondary-grid">
        ${secondary.map(ev => secondaryCard(ev, cat.id)).join('')}
        ${secondary.length < 4 && cat.id === 'street' ? `
        <div style="background:#0a0a0a;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:0.5rem">
          <div style="font-family:var(--font-d);font-size:5rem;opacity:0.04">+</div>
          <div style="font-family:var(--font-m);font-size:0.58rem;letter-spacing:0.2em;color:rgba(255,255,255,0.12)">MORE TO COME</div>
        </div>` : ''}
      </div>` : '';

    const primaryHtml = primary.length > 0
      ? primary.map(ev => primaryCard(ev, cat.id)).join('')
      : comingSoonCard(cat.id);

    return `
      <section class="cat-section" id="cat-${cat.id}">
        <div class="cat-section-header">
          <div>
            <span class="t-label" style="display:block;margin-bottom:0.5rem">${catNumLabel}</span>
            <div class="cat-section-title-wrap">
              <h2 class="cat-section-title cat-${cat.id}-title">${L[cat.labelKey] || ''}</h2>
              <span class="cat-count">${total}</span>
            </div>
            <p class="cat-desc">${L[cat.subKey] || ''}</p>
          </div>
          <span class="cat cat-${cat.id}">${cat.code}</span>
        </div>
        <div class="primary-grid">
          ${primaryHtml}
        </div>
        ${secondaryHtml}
      </section>`;
  }).join('');
}

/* ---------- Featured Banner · Image + Status Bar + Sticker ---------- */
function renderFeaturedBanner() {
  const el = document.getElementById('featured-event');
  if (!el || typeof EVENTS === 'undefined') return;

  const lang = window.currentLang || 'zh';
  const todayStr = (function() {
    const n = new Date();
    return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}-${String(n.getDate()).padStart(2,'0')}`;
  })();

  // Filter by visibility (while loading, show all to avoid blank banner)
  const vis = window.eventsVisibility || {};
  const pool = window.eventsVisibility === null
    ? EVENTS
    : EVENTS.filter(e => vis[e.num] !== false);
  if (!pool.length) return;

  // Select featured event: explicit flag → next upcoming → most recent past
  let ev = pool.find(e => e.featured);
  if (!ev) {
    const upcoming = pool.filter(e => e.date && e.date !== 'TBA' && e.date >= todayStr)
                         .sort((a, b) => a.date.localeCompare(b.date));
    ev = upcoming[0] || pool.slice().sort((a, b) => b.date.localeCompare(a.date))[0];
  }
  if (!ev) return;

  // Countdown days
  const [dy, dm, dd] = ev.date.split('-').map(Number);
  const eventDate = new Date(dy, dm - 1, dd);
  const today = new Date(); today.setHours(0,0,0,0);
  const diffDays = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

  // Status bar date string
  const WDAYS = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const mm  = String(dm).padStart(2,'0');
  const day = String(dd).padStart(2,'0');
  const wk  = WDAYS[new Date(dy, dm - 1, dd).getDay()];
  const timeStr = ev.time && ev.time !== 'TBA'
    ? ` · ${ev.time.replace('p.m.','PM').replace('a.m.','AM')}`
    : '';
  const dateDisplay = `${mm}.${day} ${wk}${timeStr}`;

  // i18n labels
  const title      = (lang === 'en' && ev.title_en) ? ev.title_en : ev.title;
  const ctaLabel   = lang === 'en' ? 'LEARN MORE →' : '了解詳情 →';
  const statusZh   = '即將登場';
  const countdownStr = diffDays > 0  ? `倒數 ${diffDays} 天`
                     : diffDays === 0 ? '今天登場'
                     : '';

  const imgSrc = ev.bannerImg || ev.imgInner || ev.img || '';
  const href   = `event.html?num=${ev.num}`;

  el.innerHTML = `
    <div class="featured-wrap reveal">
      <a href="${href}" class="featured-banner">
        <div class="fb-sticker">即將登場<span class="fb-sticker-en">NEXT UP</span></div>
        <div class="fb-image-wrap">
          ${imgSrc
            ? `<img src="${imgSrc}" alt="${title}">`
            : `<div style="width:100%;aspect-ratio:16/9;background:#111;display:flex;align-items:center;justify-content:center;font-family:var(--font-d);font-size:8rem;opacity:0.08">${ev.icon || ''}</div>`
          }
        </div>
        <div class="fb-status">
          <span class="fb-status-dot"></span>
          <span>UPCOMING</span>
          <span class="fb-status-zh">${statusZh}</span>
          <span class="fb-status-sep">/</span>
          <span>${dateDisplay}</span>
          ${countdownStr ? `<span class="fb-status-sep">/</span><span>${countdownStr}</span>` : ''}
          <span class="fb-status-cta">${ctaLabel}</span>
        </div>
      </a>
    </div>`;

  // Re-observe reveal for dynamically injected element
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    el.querySelectorAll('.reveal').forEach(r => obs.observe(r));
  }
}
