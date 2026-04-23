'use strict';

/* ---------- Render Events (grouped by category, primary/secondary hierarchy) ---------- */
function renderEvents() {
  const lang = window.currentLang || 'zh';
  const grid = document.querySelector('.events-grid');
  if (!grid) return;

  const L = LANG[lang];

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
    const primary   = EVENTS.filter(e => e.category === cat.id &&  e.isPrimary);
    const secondary = EVENTS.filter(e => e.category === cat.id && !e.isPrimary);
    const total     = primary.length + secondary.length;

    const catNumLabel = `0${idx + 1} · ${cat.code} · ${L[cat.labelKey] || ''}`;

    const secondaryHtml = secondary.length ? `
      <div class="secondary-grid">
        ${secondary.map(ev => secondaryCard(ev, cat.id)).join('')}
        ${secondary.length < 4 && cat.id === 'street' ? `
        <div style="background:#0a0a0a;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:0.5rem">
          <div style="font-family:var(--font-d);font-size:5rem;opacity:0.04">+</div>
          <div style="font-family:var(--font-m);font-size:0.58rem;letter-spacing:0.2em;color:rgba(255,255,255,0.12)">MORE TO COME</div>
        </div>` : ''}
      </div>` : '';

    /* pad primary grid to 3 cols if needed */
    const padHtml = primary.length < 3 ? `
      <div style="background:#0a0a0a;display:flex;align-items:center;justify-content:center;aspect-ratio:4/5;flex-direction:column;gap:0.5rem">
        <div style="font-family:var(--font-d);font-size:5rem;opacity:0.04">+</div>
        <div style="font-family:var(--font-m);font-size:0.58rem;letter-spacing:0.2em;color:rgba(255,255,255,0.12)">MORE TO COME</div>
      </div>`.repeat(3 - primary.length) : '';

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
          ${primary.map(ev => primaryCard(ev, cat.id)).join('')}${padHtml}
        </div>
        ${secondaryHtml}
      </section>`;
  }).join('');
}

/* ---------- Featured Banner (upcoming event) ---------- */
function renderFeaturedBanner() {
  const el = document.getElementById('featured-event');
  if (!el) return;

  const lang  = window.currentLang || 'zh';
  const today = new Date().toISOString().slice(0, 10);

  const sorted = EVENTS
    .filter(e => e.img && (e.endDate || e.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  const ev    = sorted[0] || EVENTS.filter(e => e.img).slice().sort((a,b) => b.date.localeCompare(a.date))[0];
  if (!ev) return;

  const t    = (lang === 'en' && ev.title_en) ? ev.title_en : ev.title;
  const sub  = (lang === 'en' && ev.subtitle_en) ? ev.subtitle_en : (ev.subtitle || '');
  const catId = ev.category;

  el.innerHTML = `
    <div class="featured-wrap">
      <a href="event.html?num=${ev.num}" class="featured-banner">
        <div class="featured-banner-placeholder" style="background-image:url('images/%E5%B1%95%E6%BC%94banner/%E6%9E%97%E6%87%B7%E6%B0%91.png')"></div>
        <div class="featured-banner-overlay"></div>
        <div class="featured-banner-content">
          <div class="featured-banner-cat"><span class="cat cat-${catId}">${catId.toUpperCase()}</span></div>
          <div class="featured-banner-title">${t}</div>
          <div class="featured-banner-date">${sub}</div>
          <div class="featured-banner-cta">
            <span class="btn btn-pink" style="font-size:0.62rem;padding:0.6rem 1.4rem">${lang === 'en' ? 'Learn More →' : '了解詳情 →'}</span>
          </div>
        </div>
        <div class="featured-label">FEATURED EVENT</div>
      </a>
    </div>`;
}
