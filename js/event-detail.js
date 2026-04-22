'use strict';

/* ---------- Event Detail Page ---------- */
(function initEventDetail() {

  const ICONS = {
    website:   `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    facebook:  `<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`
  };

  function socialBtns(s) {
    return [
      s.website   && `<a href="${s.website}"   target="_blank" rel="noopener" class="ev-social-btn" aria-label="Website">${ICONS.website}</a>`,
      s.facebook  && `<a href="${s.facebook}"  target="_blank" rel="noopener" class="ev-social-btn" aria-label="Facebook">${ICONS.facebook}</a>`,
      s.instagram && `<a href="${s.instagram}" target="_blank" rel="noopener" class="ev-social-btn" aria-label="Instagram">${ICONS.instagram}</a>`
    ].filter(Boolean).join('');
  }

  function dateStr(ev) {
    return ev.endDate
      ? `${ev.date.replace(/-/g,'.')} – ${ev.endDate.replace(/-/g,'.')}`
      : ev.date.replace(/-/g,'.');
  }

  function renderHero(ev, lang) {
    const catId    = ev.category;
    const title    = (lang === 'en' && ev.title_en)    ? ev.title_en    : ev.title;
    const subtitle = (lang === 'en' && ev.subtitle_en) ? ev.subtitle_en : (ev.subtitle || '');
    const location = (lang === 'en' && ev.location_full) ? ev.location_full : ev.location;
    const backLabel = lang === 'en' ? 'Events' : '展演活動';
    const dateLabel = lang === 'en' ? 'DATE'   : '日期';
    const venueLabel = lang === 'en' ? 'VENUE'  : '場地';

    const ctaHtml = ev.externalUrl
      ? `<a href="${ev.externalUrl}" target="_blank" rel="noopener" class="btn btn-white">${lang === 'en' ? 'Get Tickets' : '立即購票'}</a>`
      : `<a href="#" class="btn btn-white" style="opacity:0.45;pointer-events:none">${lang === 'en' ? 'Coming Soon' : '即將公布'}</a>`;

    const imgHtml = ev.img
      ? `<img src="${ev.img}" alt="${title}">`
      : `<div class="ev-hero-img-placeholder"><span>${ev.icon || ''}</span></div>`;

    document.getElementById('ev-hero').innerHTML = `
      <div class="ev-hero">
        <div class="ev-hero-left ev-hero-left--${catId}">
          <a href="events.html" class="ev-back">← ${backLabel}</a>
          <div class="ev-cat-row">
            <span class="cat cat-${catId}">${catId.toUpperCase()}</span>
            <span class="ev-num">EVENT ${ev.num}</span>
          </div>
          <h1 class="ev-title">${title}</h1>
          ${subtitle ? `<div class="ev-subtitle">${subtitle}</div>` : ''}
          <div class="ev-meta">
            <div class="ev-meta-row">
              <span class="ev-meta-key">${dateLabel}</span>
              <span class="ev-meta-val">${dateStr(ev)}${ev.time ? ' · ' + ev.time : ''}</span>
            </div>
            <div class="ev-meta-row">
              <span class="ev-meta-key">${venueLabel}</span>
              <span class="ev-meta-val">${location}</span>
            </div>
          </div>
          <div class="ev-actions">
            ${ctaHtml}
            <a href="calendar.html" class="btn btn-outline">${lang === 'en' ? 'View Calendar' : '前往行事曆'}</a>
          </div>
        </div>
        <div class="ev-hero-right">
          ${imgHtml}
          <div class="ev-img-sticker">NYC<small>2026</small></div>
        </div>
      </div>`;
  }

  function renderEvent(ev) {
    const lang = window.currentLang || 'zh';
    const L    = LANG[lang];

    const title = (lang === 'en' && ev.title_en) ? ev.title_en : ev.title;
    document.title = `${title} — Taiwan Pop 2026`;

    renderHero(ev, lang);

    let desc = (lang === 'en' && ev.long_desc_en) ? ev.long_desc_en : ev.long_desc;
    if (!desc) desc = (lang === 'en' && ev.desc_en) ? ev.desc_en : ev.desc;

    /* Description */
    const descEl = document.getElementById('detailDesc');
    const labelAbout = lang === 'en' ? 'ABOUT · Event Introduction' : 'ABOUT · 活動介紹';
    let descHtml = `<span class="ev-section-label">${labelAbout}</span>`;
    if (desc) {
      descHtml += desc
        .split('\n\n')
        .map(para => `<p class="ev-body">${para.replace(/\n/g,'<br>')}</p>`)
        .join('');
    }
    if (!(ev.long_desc || ev.long_desc_en)) {
      descHtml += `<p class="ev-body" style="opacity:0.4">${lang === 'en' ? '— Full details coming soon.' : '— 活動詳細資訊即將公布'}</p>`;
    }
    descEl.innerHTML = descHtml;

    /* Video */
    const videoEl = document.getElementById('detailVideo');
    if (ev.youtubeId) {
      const labelVideo = lang === 'en' ? 'VIDEO · Trailer' : 'VIDEO · 預告影片';
      videoEl.innerHTML = `
        <span class="ev-section-label">${labelVideo}</span>
        <div class="ev-video-wrap">
          <iframe src="https://www.youtube.com/embed/${ev.youtubeId}"
            title="${title}" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen loading="lazy"></iframe>
        </div>`;
      videoEl.classList.remove('is-hidden');
    } else {
      videoEl.classList.add('is-hidden');
    }

    /* Program */
    const programEl = document.getElementById('detailProgram');
    if (ev.program && ev.program.length) {
      const labelProg = lang === 'en' ? 'PROGRAM · Repertoire' : 'PROGRAM · 演出曲目';
      const premiereLabel = lang === 'en' ? 'WORLD PREMIERE' : '世界首演';
      programEl.innerHTML = `
        <span class="ev-section-label">${labelProg}</span>
        <div class="ev-program">
          ${ev.program.map(item => {
            const text = (lang === 'en' && item.en) ? item.en : item.zh;
            const badge = item.premiere ? `<span class="ev-program-premiere">${premiereLabel}</span>` : '';
            const en = (item.en && lang !== 'en') ? `<div class="ev-program-en">${item.en}</div>` : '';
            return `<div class="ev-program-item">
              <div class="ev-program-title">${text}${badge}${en}</div>
            </div>`;
          }).join('')}
        </div>`;
      programEl.classList.remove('is-hidden');
    } else {
      programEl.classList.add('is-hidden');
    }

    /* Ensemble */
    const ensembleEl = document.getElementById('detailEnsemble');
    if (ev.ensemble) {
      const s = ev.ensemble;
      const labelEns = lang === 'en' ? 'ENSEMBLE · Performing Organization' : 'ENSEMBLE · 演出單位';
      const name  = (lang === 'en' && s.name_en) ? s.name_en : s.name;
      const bio   = (lang === 'en' && s.bio_en)  ? s.bio_en  : s.bio;
      const links = socialBtns(s);
      const photoHtml = s.photo
        ? `<div class="ev-ensemble-photo"><img src="${s.photo}" alt="${name}"></div>`
        : '';
      const logoHtml = s.logo
        ? `<img src="${s.logo}" alt="${name} logo" class="ev-ensemble-logo">`
        : '';
      ensembleEl.innerHTML = `
        <span class="ev-section-label">${labelEns}</span>
        <div class="ev-ensemble${s.photo ? '' : ' ev-ensemble-no-photo'}">
          ${photoHtml}
          <div>
            ${logoHtml}
            <div class="ev-ensemble-name">${name}</div>
            ${s.name_en && lang !== 'en' ? `<div class="ev-ensemble-name-en">${s.name_en}</div>` : ''}
            ${bio ? `<p class="ev-ensemble-bio">${bio}</p>` : ''}
            ${links ? `<div class="ev-ensemble-social">${links}</div>` : ''}
          </div>
        </div>`;
      ensembleEl.classList.remove('is-hidden');
    } else {
      ensembleEl.classList.add('is-hidden');
    }

    /* Speakers */
    const speakersEl = document.getElementById('detailSpeakers');
    if (ev.speakers && ev.speakers.length) {
      const label = (lang === 'en' && ev.speakersLabel_en) ? ev.speakersLabel_en
                  : ev.speakersLabel ? ev.speakersLabel
                  : (lang === 'en' ? 'Speakers' : '主講人');
      speakersEl.innerHTML = `
        <span class="ev-section-label">${label.toUpperCase()} · ${label}</span>
        <div class="ev-speakers-grid">
          ${ev.speakers.map(s => {
            const name  = (lang === 'en' && s.name_en) ? s.name_en : s.name;
            const role  = (lang === 'en' && s.role_en) ? s.role_en : s.role;
            const bio   = (lang === 'en' && s.bio_en)  ? s.bio_en  : s.bio;
            const links = socialBtns(s);
            return `<div class="ev-speaker">
              <div class="ev-speaker-name">${name}</div>
              ${role ? `<div class="ev-speaker-role">${role}</div>` : ''}
              ${bio  ? `<p class="ev-speaker-bio">${bio}</p>`       : ''}
              ${links ? `<div class="ev-speaker-links">${links}</div>` : ''}
            </div>`;
          }).join('')}
        </div>`;
      speakersEl.classList.remove('is-hidden');
    } else {
      speakersEl.classList.add('is-hidden');
    }

    /* Performers */
    const performersEl = document.getElementById('detailPerformers');
    if (ev.performers && ev.performers.length) {
      const label = (lang === 'en' && ev.performersLabel_en) ? ev.performersLabel_en
                  : ev.performersLabel ? ev.performersLabel
                  : (lang === 'en' ? 'Performers' : '演出者');
      performersEl.innerHTML = `
        <span class="ev-section-label">${label.toUpperCase()} · ${label}</span>
        <div class="ev-performers-grid">
          ${ev.performers.map(p => {
            const instrument = (lang === 'en' && p.instrument_en) ? p.instrument_en : (p.instrument || '');
            const name  = (lang === 'en' && p.name_en) ? p.name_en : p.name;
            const bio   = (lang === 'en' && p.bio_en)  ? p.bio_en  : p.bio;
            const links = socialBtns(p);
            return `<div class="ev-performer">
              ${instrument ? `<div class="ev-performer-instr">${instrument}</div>` : ''}
              <div class="ev-performer-name">${name}</div>
              ${bio   ? `<p class="ev-performer-bio">${bio}</p>`         : ''}
              ${links ? `<div class="ev-performer-links">${links}</div>` : ''}
            </div>`;
          }).join('')}
        </div>`;
      performersEl.classList.remove('is-hidden');
    } else {
      performersEl.classList.add('is-hidden');
    }

    /* Gallery */
    const galleryEl = document.getElementById('detailGallery');
    if (ev.gallery && ev.gallery.length) {
      const labelGal = lang === 'en' ? 'GALLERY · Production Photos' : 'GALLERY · 劇照';
      galleryEl.innerHTML = `
        <span class="ev-section-label">${labelGal}</span>
        <div class="ev-gallery">
          ${ev.gallery.map(src => `
            <div class="ev-gallery-item">
              <img src="${src}" alt="${title}" loading="lazy">
            </div>`).join('')}
        </div>`;
      galleryEl.classList.remove('is-hidden');
    } else {
      galleryEl.classList.add('is-hidden');
    }

    document.getElementById('eventDetailPage').classList.add('is-ready');
  }

  function init() {
    const num = new URLSearchParams(location.search).get('num');
    if (!num) { location.href = 'events.html'; return; }

    const ev = EVENTS.find(e => e.num === num);
    if (!ev) { location.href = 'events.html'; return; }

    renderEvent(ev);

    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => setTimeout(() => renderEvent(ev), 0));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
