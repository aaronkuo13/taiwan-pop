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

    const padHtml = '';

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

/* ---------- Featured Banner · Ticket Stub ---------- */
let _eventsJsonCache = null;

async function renderFeaturedBanner() {
  const el = document.getElementById('featured-event');
  if (!el) return;

  // Load events.json (cached after first fetch)
  if (!_eventsJsonCache) {
    try {
      const res = await fetch('data/events.json');
      _eventsJsonCache = await res.json();
    } catch (e) {
      console.error('Failed to load data/events.json', e);
      return;
    }
  }

  const lang   = window.currentLang || 'zh';
  const today  = (function() {
    const n = new Date(); return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}-${String(n.getDate()).padStart(2,'0')}`;
  })();
  const events = _eventsJsonCache;

  // §2 selection logic
  let ev = events.find(e => e.featured);
  if (!ev) {
    const upcoming = events.filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
    ev = upcoming[0] || events.slice().sort((a, b) => b.date.localeCompare(a.date))[0];
  }
  if (!ev) return;

  // §3 date formatting (local time, no UTC offset issue)
  const [dy, dm, dd] = ev.date.split('-').map(Number);
  const d       = new Date(dy, dm - 1, dd);
  const month   = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day     = String(d.getDate()).padStart(2, '0');
  const weekday = d.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
  const timeStr = ev.time && ev.time !== 'TBA' ? `${weekday} · ${ev.time}` : weekday;

  // §4 i18n
  const title    = lang === 'en' ? ev.titleEn : ev.titleZh;
  const subtitle = lang === 'en' ? '' : ev.titleEn;
  const venue    = lang === 'en' ? ev.venueEn : ev.venue;
  const nextUp   = lang === 'en' ? 'NEXT UP'        : '即將登場';
  const featured = lang === 'en' ? 'FEATURED EVENT' : '精選活動';
  const upcoming = lang === 'en' ? 'UPCOMING'       : '最近登場';
  const cta      = lang === 'en' ? 'ADMIT ONE · LEARN MORE' : 'ADMIT ONE · 了解詳情';
  const noStr    = String(ev.num).padStart(3, '0');
  const catCode  = ev.category.toUpperCase();

  // Category colour scheme
  const CAT_COLORS = {
    sound:  { bg: 'var(--pink)',  text: '#fff', tagText: 'var(--pink)',  shadow: 'rgba(255,45,107,0.28)' },
    image:  { bg: 'var(--blue)',  text: '#fff', tagText: 'var(--blue)',  shadow: 'rgba(59,127,255,0.28)' },
    street: { bg: 'var(--green)', text: '#000', tagText: 'var(--green)', shadow: 'rgba(0,255,87,0.22)'   },
  };
  const cc = CAT_COLORS[ev.category] || CAT_COLORS.street;

  el.innerHTML = `
    <div class="featured-wrap reveal">
      <a href="${ev.href}" class="featured-ticket" style="--ticket-color:${cc.bg};--ticket-shadow:${cc.shadow}">
        <div class="ticket-stub" style="background:${cc.bg};color:${cc.text}">
          <div class="stub-no">NO. ${noStr} · ${nextUp}</div>
          <div class="stub-date">
            <div class="stub-month">${month}</div>
            <div class="stub-day">${day}</div>
            <div class="stub-weekday">${timeStr}</div>
          </div>
          <div class="stub-tag" style="color:${cc.tagText}">${catCode}</div>
        </div>
        <div class="ticket-info">
          <div class="ticket-barcode">
            <i style="height:22px"></i><i style="height:14px"></i><i style="height:26px"></i>
            <i style="height:10px"></i><i style="height:22px"></i><i style="height:18px"></i>
            <i style="height:26px"></i><i style="height:14px"></i>
          </div>
          <div class="ticket-meta">
            <span>${featured}</span><span class="dot">●</span><span>${upcoming}</span>
          </div>
          <h2 class="ticket-title">${title}</h2>
          ${subtitle ? `<div class="ticket-subtitle">${subtitle}</div>` : ''}
          <div class="ticket-venue">${venue}</div>
          <div class="ticket-cta">
            <div class="ticket-cta-label">${cta}</div>
            <div class="ticket-cta-arrow">→</div>
          </div>
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
