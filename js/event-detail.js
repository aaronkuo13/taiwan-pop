'use strict';

/* ---------- Event Detail Page ---------- */
(function initEventDetail() {

  function dateStr(ev) {
    return ev.endDate
      ? `${ev.date.replace(/-/g,'.')} – ${ev.endDate.replace(/-/g,'.')}`
      : ev.date.replace(/-/g,'.');
  }

  function renderEvent(ev) {
    const lang = window.currentLang || 'zh';
    const L    = LANG[lang];

    const catId    = ev.category;
    const catLabel = L[`cat-${catId}-label`] || catId;
    const title    = (lang === 'en' && ev.title_en)    ? ev.title_en    : ev.title;
    const subtitle = (lang === 'en' && ev.subtitle_en) ? ev.subtitle_en : (ev.subtitle || '');

    let desc = (lang === 'en' && ev.long_desc_en) ? ev.long_desc_en : ev.long_desc;
    if (!desc) desc = (lang === 'en' && ev.desc_en) ? ev.desc_en : ev.desc;

    /* Page title */
    document.title = `${title} — Taiwan Pop 2026`;

    /* Hero */
    const catEl = document.getElementById('detailCat');
    catEl.textContent = catLabel;
    catEl.className   = `event-detail-cat pill--${catId}`;

    document.getElementById('detailNum').textContent      = `EVENT ${ev.num}`;
    document.getElementById('detailTitle').textContent    = title;
    document.getElementById('detailSubtitle').textContent = subtitle;
    document.getElementById('detailDate').innerHTML       = `📅 &nbsp;${dateStr(ev)}`;
    document.getElementById('detailLocation').innerHTML   = `📍 &nbsp;${ev.location}`;

    /* CTA button */
    const cta = document.getElementById('detailCta');
    const ctaLabel = lang === 'en' ? 'Learn More · Register Now →' : '了解更多・立即報名 →';
    cta.textContent = ctaLabel;
    if (ev.externalUrl) {
      cta.href = ev.externalUrl;
      cta.target = '_blank';
      cta.rel = 'noopener';
      cta.removeAttribute('aria-disabled');
      cta.classList.remove('btn--disabled');
      cta.onclick = null;
    } else {
      cta.href = '#';
      cta.setAttribute('aria-disabled', 'true');
      cta.classList.add('btn--disabled');
      cta.onclick = e => e.preventDefault();
    }

    /* Description */
    const descEl = document.getElementById('detailDesc');
    const hasLong = ev.long_desc || ev.long_desc_en;

    if (desc) {
      descEl.innerHTML = desc
        .split('\n\n')
        .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
        .join('');
    }

    if (!hasLong) {
      descEl.innerHTML += `<p class="event-detail-coming-soon">${lang === 'en' ? '— Full event details coming soon.' : '— 活動詳細資訊即將公布'}</p>`;
    }

    /* Reveal page */
    document.getElementById('eventDetailPage').classList.add('is-ready');
  }

  function init() {
    const num = new URLSearchParams(location.search).get('num');
    if (!num) { location.href = 'events.html'; return; }

    const ev = EVENTS.find(e => e.num === num);
    if (!ev) { location.href = 'events.html'; return; }

    renderEvent(ev);

    /* Re-render on lang toggle */
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => setTimeout(() => renderEvent(ev), 0));
    });
  }

  /* Run after all scripts (lang-init.js sets currentLang synchronously) */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
