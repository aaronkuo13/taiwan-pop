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
          <img src="${ev.img || `https://picsum.photos/600/320?grayscale&random=${ev.num}`}" alt="${t}" loading="lazy">
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
          <img src="${ev.img || `https://picsum.photos/400/180?grayscale&random=${ev.num}`}" alt="${t}" loading="lazy">
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

  const today = new Date().toISOString().slice(0, 10);

  const sorted = EVENTS
    .filter(e => (e.endDate || e.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  const ev = sorted[0] || EVENTS.slice().sort((a, b) => b.date.localeCompare(a.date))[0];
  const title = ev.title_en || ev.title;

  el.innerHTML = `
    <a href="event.html?num=${ev.num}" class="featured-banner">
      <img src="images/banner_sample.png" alt="${title}" loading="eager">
    </a>`;
}
