'use strict';

/* ---------- Event Modal ---------- */
(function initModal() {
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalClose');
  if (!backdrop) return;

  function openModal(ev) {
    const lang  = window.currentLang || 'zh';
    const t     = (lang === 'en' && ev.title_en) ? ev.title_en : ev.title;
    const desc  = (lang === 'en' && ev.desc_en)  ? ev.desc_en  : ev.desc;
    const cta   = LANG[lang]['modal-cta'];

    document.getElementById('modalNum').textContent   = `EVENT ${ev.num || ''}`;
    document.getElementById('modalIcon').textContent  = ev.icon || '';
    document.getElementById('modalTitle').textContent = t;
    const dateDisplay = ev.endDate
      ? `${ev.date.replace(/-/g, '.')} – ${ev.endDate.replace(/-/g, '.')}`
      : ev.date.replace(/-/g, '.');
    document.getElementById('modalDate').querySelector('span').textContent     = dateDisplay;
    document.getElementById('modalLocation').querySelector('span').textContent = ev.location;
    document.getElementById('modalDesc').textContent = desc || '';
    document.querySelector('.modal-cta').textContent = cta;

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  window.openModal = openModal;
})();
