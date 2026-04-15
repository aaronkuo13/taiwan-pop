'use strict';

/* ---------- Render Events (grouped by category, primary/secondary hierarchy) ---------- */
function renderEvents() {
  const lang = window.currentLang || 'zh';
  const grid = document.querySelector('#events .events-grid');
  if (!grid) return;

  const L = LANG[lang];

  const CATEGORIES = [
    { id:'sound',  code:'SOUND',  labelKey:'cat-sound-label',  subKey:'cat-sound-sub'  },
    { id:'image',  code:'IMAGE',  labelKey:'cat-image-label',  subKey:'cat-image-sub'  },
    { id:'street', code:'STREET', labelKey:'cat-street-label', subKey:'cat-street-sub' },
  ];

  function dateStr(ev) {
    return ev.endDate
      ? `${ev.date.replace(/-/g,'.')} – ${ev.endDate.replace(/-/g,'.')}`
      : ev.date.replace(/-/g,'.');
  }

  function primaryCard(ev, catId) {
    const t   = (lang === 'en' && ev.title_en)    ? ev.title_en    : ev.title;
    const sub = (lang === 'en' && ev.subtitle_en)  ? ev.subtitle_en : (ev.subtitle || '');
    const href   = ev.externalUrl || '#';
    const target = ev.externalUrl ? 'target="_blank" rel="noopener"' : '';
    const cta    = L['event-cta'] || '了解更多・立即報名 →';
    return `
      <div class="event-card event-card--primary card--${catId}" onclick="location.href='event.html?num=${ev.num}'" style="cursor: pointer;">
        <div class="event-card-img">
          <img src="https://picsum.photos/600/320?grayscale&random=${ev.num}" alt="${t}" loading="lazy">
          <span class="event-card-pill pill--${catId}">${L[`cat-${catId}-label`]}</span>
        </div>
        <div class="event-card-body">
          <h3 class="event-card-title">${t}</h3>
          <p class="event-card-subtitle">${sub}</p>
          <div class="event-card-meta">
            <span>${dateStr(ev)}</span>
            <span>${ev.location}</span>
          </div>
          <span class="event-card-cta">${cta}</span>
        </div>
      </div>`;
  }

  function secondaryCard(ev, catId) {
    const t    = (lang === 'en' && ev.title_en) ? ev.title_en : ev.title;
    const sub  = (lang === 'en' && ev.subtitle_en) ? ev.subtitle_en : (ev.subtitle || '');
    const href   = ev.externalUrl || '#';
    const target = ev.externalUrl ? 'target="_blank" rel="noopener"' : '';
    return `
      <div class="event-card event-card--secondary card--${catId}" onclick="location.href='event.html?num=${ev.num}'" style="cursor: pointer;">
        <div class="event-card-img">
          <img src="https://picsum.photos/400/180?grayscale&random=${ev.num}" alt="${t}" loading="lazy">
          <span class="event-card-pill event-card-pill--sm pill--${catId}">${L[`cat-${catId}-label`]}</span>
        </div>
        <div class="event-card-body">
          <h4 class="event-card-title">${t}</h4>
          <p class="event-card-subtitle">${sub}</p>
          <div class="event-card-meta">
            <span>${dateStr(ev)}</span>
            <span>${ev.location}</span>
          </div>
        </div>
      </div>`;
  }

  grid.innerHTML = CATEGORIES.map(cat => {
    const primary   = EVENTS.filter(e => e.category === cat.id &&  e.isPrimary);
    const secondary = EVENTS.filter(e => e.category === cat.id && !e.isPrimary);

    const secondaryHtml = secondary.length ? `
      <div class="events-secondary-grid">
        ${secondary.map(ev => secondaryCard(ev, cat.id)).join('')}
      </div>` : '';

    return `
      <div class="events-category" id="cat-${cat.id}">
        <div class="events-cat-header cat-header--${cat.id}">
          <span class="events-cat-code">${cat.code}</span>
          <h3 class="events-cat-name">${L[cat.labelKey] || ''}</h3>
          <p class="events-cat-sub">${L[cat.subKey] || ''}</p>
        </div>
        <div class="events-primary-grid">
          ${primary.map(ev => primaryCard(ev, cat.id)).join('')}
        </div>
        ${secondaryHtml}
      </div>`;
  }).join('');
}

/* ---------- Featured Banner (upcoming event) ---------- */
function renderFeaturedBanner() {
  const el = document.getElementById('featured-event');
  if (!el) return;

  const lang  = window.currentLang || 'zh';
  const L     = LANG[lang];
  const today = new Date().toISOString().slice(0, 10);

  /* Upcoming = not yet ended; sort ascending by start date */
  const sorted = EVENTS
    .filter(e => (e.endDate || e.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  const ev = sorted[0] || EVENTS.slice().sort((a,b) => b.date.localeCompare(a.date))[0];

  const title    = (lang === 'en' && ev.title_en)    ? ev.title_en    : ev.title;
  const subtitle = (lang === 'en' && ev.subtitle_en) ? ev.subtitle_en : (ev.subtitle || '');
  const catId    = ev.category;
  const catLabel = L[`cat-${catId}-label`] || catId;

  const dateStr = ev.endDate
    ? `${ev.date.replace(/-/g,'.')} – ${ev.endDate.replace(/-/g,'.')}`
    : ev.date.replace(/-/g,'.');

  const upcomingLabel = lang === 'en' ? 'UPCOMING EVENT' : '即將登場';
  const ctaLabel      = lang === 'en' ? 'Event Details →' : '查看活動詳情 →';

  el.innerHTML = `
    <div class="featured-banner">
      <div class="featured-banner-content">
        <div class="featured-banner-label">${upcomingLabel}</div>
        <div class="featured-banner-meta">
          <span class="pill--${catId}" style="font-family:var(--font-sans);font-size:11px;font-weight:700;letter-spacing:1px;padding:4px 12px;border-radius:50px;">${catLabel}</span>
          <span class="featured-banner-num">EVENT ${ev.num}</span>
        </div>
        <h2 class="featured-banner-title">${title}</h2>
        <p class="featured-banner-sub">${subtitle}</p>
        <div class="featured-banner-info">
          <span>📅 &nbsp;${dateStr}</span>
          <span>📍 &nbsp;${ev.location}</span>
        </div>
        <a href="event.html?num=${ev.num}" class="btn btn-primary featured-banner-cta">${ctaLabel}</a>
      </div>
      <div class="featured-banner-image">
        <img src="images/banner_sample.png" alt="${title}" loading="eager">
      </div>
    </div>`;
}
