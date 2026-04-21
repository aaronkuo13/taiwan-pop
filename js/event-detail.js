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
    document.getElementById('detailDate').innerHTML       = `📅 &nbsp;${dateStr(ev)}${ev.time ? ' &nbsp;' + ev.time : ''}`;
    document.getElementById('detailLocation').innerHTML   = `📍 &nbsp;${(lang === 'en' && ev.location_full) ? ev.location_full : ev.location}`;

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

    /* Program */
    const programEl = document.getElementById('detailProgram');
    if (programEl && ev.program && ev.program.length) {
      const label = lang === 'en' ? 'Program' : '演出曲目';
      const premiereLabel = lang === 'en' ? 'World Premiere' : '世界首演';
      programEl.innerHTML = `
        <p class="event-section-label">${label}</p>
        <ol class="program-list">
          ${ev.program.map((item, i) => {
            const text = (lang === 'en' && item.en) ? item.en : item.zh;
            const badge = item.premiere ? `<span class="program-premiere">${premiereLabel}</span>` : '';
            return `<li class="program-item"><span class="program-num">${String(i+1).padStart(2,'0')}</span><span>${text}${badge}</span></li>`;
          }).join('')}
        </ol>`;
      programEl.classList.remove('is-hidden');
    }

    /* Ensemble */
    const ensembleEl = document.getElementById('detailEnsemble');
    if (ensembleEl && ev.ensemble) {
      const s     = ev.ensemble;
      const label = lang === 'en' ? 'Performing Organization' : '演出單位';
      const name  = (lang === 'en' && s.name_en) ? s.name_en : s.name;
      const bio   = (lang === 'en' && s.bio_en)  ? s.bio_en  : s.bio;
      const links = [
        s.website   && `<a href="${s.website}"   target="_blank" rel="noopener" class="speaker-link">🌐 Website</a>`,
        s.facebook  && `<a href="${s.facebook}"  target="_blank" rel="noopener" class="speaker-link">Facebook</a>`,
        s.instagram && `<a href="${s.instagram}" target="_blank" rel="noopener" class="speaker-link">Instagram</a>`
      ].filter(Boolean).join('');
      ensembleEl.innerHTML = `
        <p class="event-section-label">${label}</p>
        <div class="speaker-card">
          <p class="speaker-name">${name}</p>
          <p class="speaker-bio">${bio}</p>
          ${links ? `<div class="speaker-links">${links}</div>` : ''}
        </div>`;
      ensembleEl.classList.remove('is-hidden');
    }

    /* Performers */
    const performersEl = document.getElementById('detailPerformers');
    if (performersEl && ev.performers && ev.performers.length) {
      const label = lang === 'en' ? 'Performers' : '演出者';
      performersEl.innerHTML = `
        <p class="event-section-label">${label}</p>
        <div class="performers-grid">
          ${ev.performers.map(p => {
            const instrument = (lang === 'en' && p.instrument_en) ? p.instrument_en : p.instrument;
            const name = (lang === 'en' && p.name_en) ? p.name_en : p.name;
            const bio  = (lang === 'en' && p.bio_en)  ? p.bio_en  : p.bio;
            const links = [
              p.website   && `<a href="${p.website}"   target="_blank" rel="noopener" class="speaker-link">🌐 Website</a>`,
              p.facebook  && `<a href="${p.facebook}"  target="_blank" rel="noopener" class="speaker-link">Facebook</a>`,
              p.instagram && `<a href="${p.instagram}" target="_blank" rel="noopener" class="speaker-link">Instagram</a>`
            ].filter(Boolean).join('');
            return `<div class="performer-card">
              <span class="performer-instrument">${instrument}</span>
              <p class="performer-name">${name}</p>
              <p class="performer-bio">${bio}</p>
              ${links ? `<div class="speaker-links">${links}</div>` : ''}
            </div>`;
          }).join('')}
        </div>`;
      performersEl.classList.remove('is-hidden');
    }

    /* Speakers */
    const speakersEl = document.getElementById('detailSpeakers');
    if (speakersEl && ev.speakers && ev.speakers.length) {
      const label = lang === 'en' ? 'Speakers' : '主講人';
      speakersEl.innerHTML = `
        <p class="event-speakers-title">${label}</p>
        ${ev.speakers.map(s => {
          const name  = (lang === 'en' && s.name_en)  ? s.name_en  : s.name;
          const role  = (lang === 'en' && s.role_en)  ? s.role_en  : s.role;
          const bio   = (lang === 'en' && s.bio_en)   ? s.bio_en   : s.bio;
          const links = [
            s.website   && `<a href="${s.website}"   target="_blank" rel="noopener" class="speaker-link">🌐 Website</a>`,
            s.facebook  && `<a href="${s.facebook}"  target="_blank" rel="noopener" class="speaker-link">Facebook</a>`,
            s.instagram && `<a href="${s.instagram}" target="_blank" rel="noopener" class="speaker-link">Instagram</a>`
          ].filter(Boolean).join('');
          return `<div class="speaker-card">
            <p class="speaker-name">${name}</p>
            <p class="speaker-role">${role}</p>
            <p class="speaker-bio">${bio}</p>
            ${links ? `<div class="speaker-links">${links}</div>` : ''}
          </div>`;
        }).join('')}`;
      speakersEl.classList.remove('is-hidden');
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
