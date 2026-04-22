'use strict';

/* ---------- Event Detail Page ---------- */
(function initEventDetail() {

  const ICONS = {
    website:   `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    facebook:  `<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`
  };

  function socialLinks(s) {
    return [
      s.website   && `<a href="${s.website}"   target="_blank" rel="noopener" class="speaker-link speaker-link--icon" aria-label="Website">${ICONS.website}</a>`,
      s.facebook  && `<a href="${s.facebook}"  target="_blank" rel="noopener" class="speaker-link speaker-link--icon" aria-label="Facebook">${ICONS.facebook}</a>`,
      s.instagram && `<a href="${s.instagram}" target="_blank" rel="noopener" class="speaker-link speaker-link--icon" aria-label="Instagram">${ICONS.instagram}</a>`
    ].filter(Boolean).join('');
  }

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

    /* Video */
    const videoEl = document.getElementById('detailVideo');
    if (videoEl && ev.youtubeId) {
      const label = lang === 'en' ? 'Watch' : '預告影片';
      videoEl.innerHTML = `
        <p class="event-section-label">${label}</p>
        <div class="video-wrap">
          <iframe src="https://www.youtube.com/embed/${ev.youtubeId}"
            title="${title}" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </div>`;
      videoEl.classList.remove('is-hidden');
    }

    /* Ensemble */
    const ensembleEl = document.getElementById('detailEnsemble');
    if (ensembleEl && ev.ensemble) {
      const s     = ev.ensemble;
      const label = lang === 'en' ? 'Performing Organization' : '演出單位';
      const name  = (lang === 'en' && s.name_en) ? s.name_en : s.name;
      const bio   = (lang === 'en' && s.bio_en)  ? s.bio_en  : s.bio;
      const links = socialLinks(s);
      const photoHtml = s.photo
        ? `<img src="${s.photo}" alt="${name}" class="ensemble-photo">`
        : '';
      const logoHtml = s.logo
        ? `<img src="${s.logo}" alt="${name} logo" class="ensemble-logo">`
        : '';
      ensembleEl.innerHTML = `
        <p class="event-section-label">${label}</p>
        <div class="speaker-card ensemble-card${s.photo ? ' ensemble-card--with-photo' : ''}">
          ${photoHtml}
          <div class="ensemble-body">
            ${logoHtml}
            <p class="speaker-name">${name}</p>
            <p class="speaker-bio">${bio}</p>
            ${links ? `<div class="speaker-links">${links}</div>` : ''}
          </div>
        </div>`;
      ensembleEl.classList.remove('is-hidden');
    }

    /* Performers */
    const performersEl = document.getElementById('detailPerformers');
    if (performersEl && ev.performers && ev.performers.length) {
      const label = (lang === 'en' && ev.performersLabel_en) ? ev.performersLabel_en
                  : ev.performersLabel ? ev.performersLabel
                  : (lang === 'en' ? 'Performers' : '演出者');
      performersEl.innerHTML = `
        <p class="event-section-label">${label}</p>
        <div class="performers-grid">
          ${ev.performers.map(p => {
            const instrument = (lang === 'en' && p.instrument_en) ? p.instrument_en : p.instrument;
            const name = (lang === 'en' && p.name_en) ? p.name_en : p.name;
            const bio  = (lang === 'en' && p.bio_en)  ? p.bio_en  : p.bio;
            const links = socialLinks(p);
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
      const label = (lang === 'en' && ev.speakersLabel_en) ? ev.speakersLabel_en
                  : ev.speakersLabel ? ev.speakersLabel
                  : (lang === 'en' ? 'Speakers' : '主講人');
      speakersEl.innerHTML = `
        <p class="event-speakers-title">${label}</p>
        ${ev.speakers.map(s => {
          const name  = (lang === 'en' && s.name_en)  ? s.name_en  : s.name;
          const role  = (lang === 'en' && s.role_en)  ? s.role_en  : s.role;
          const bio   = (lang === 'en' && s.bio_en)   ? s.bio_en   : s.bio;
          const links = socialLinks(s);
          return `<div class="speaker-card">
            <p class="speaker-name">${name}</p>
            <p class="speaker-role">${role}</p>
            <p class="speaker-bio">${bio}</p>
            ${links ? `<div class="speaker-links">${links}</div>` : ''}
          </div>`;
        }).join('')}`;
      speakersEl.classList.remove('is-hidden');
    }

    /* Gallery */
    const galleryEl = document.getElementById('detailGallery');
    if (galleryEl && ev.gallery && ev.gallery.length) {
      const label = lang === 'en' ? 'Gallery' : '劇照';
      galleryEl.innerHTML = `
        <p class="event-section-label">${label}</p>
        <div class="photo-grid">
          ${ev.gallery.map(src => `<img src="${src}" alt="${title}" class="photo-grid-item" loading="lazy">`).join('')}
        </div>`;
      galleryEl.classList.remove('is-hidden');
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
