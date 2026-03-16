'use strict';

/* ---------- Render Events Cards (called by lang-init on switch) ---------- */
function renderEvents() {
  const lang = window.currentLang || 'zh';
  const grid = document.querySelector('#events .events-grid');
  if (!grid) return;

  const svgCal = `<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 2h12a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm0 3v9h12V5H2zm3-4v3M11 1v3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`;

  grid.innerHTML = EVENTS.map(ev => {
    const t = (lang === 'en' && ev.title_en) ? ev.title_en : ev.title;
    const d = (lang === 'en' && ev.desc_en)  ? ev.desc_en  : ev.desc;
    const dateStr = ev.endDate
      ? `${ev.date.replace(/-/g,'.')} – ${ev.endDate.replace(/-/g,'.')}`
      : ev.date.replace(/-/g,'.');
    const learnMore = lang === 'en' ? 'Learn More →' : '了解更多 →';
    return `
      <div class="event-card">
        <div class="event-num">${ev.num}</div>
        <div class="event-icon">${ev.icon}</div>
        <h3>${t}</h3>
        <p class="event-date">${svgCal} ${dateStr}</p>
        <p class="event-desc">${d}</p>
        <a href="#" class="event-link">${learnMore}</a>
      </div>`;
  }).join('');
}
