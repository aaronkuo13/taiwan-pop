'use strict';

/* ---------- Event Modal ---------- */
(function initModal() {
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalClose');
  if (!backdrop) return;

  function openModalByNum(num) {
    const ev = EVENTS.find(e => e.num === num);
    if (!ev) return;

    const lang  = window.currentLang || 'zh';
    const t     = (lang === 'en' && ev.title_en) ? ev.title_en : ev.title;
    
    // Prefer long_desc if it exists, otherwise fallback to desc
    let desc = (lang === 'en' && ev.long_desc_en) ? ev.long_desc_en : ev.long_desc;
    if (!desc) {
      desc = (lang === 'en' && ev.desc_en) ? ev.desc_en : ev.desc;
    }
    
    const ctaText = (lang === 'en') ? 'Learn more, Register now' : '了解更多，立即報名';

    document.getElementById('modalNum').textContent   = `EVENT ${ev.num || ''}`;
    document.getElementById('modalIcon').textContent  = ev.icon || '';
    document.getElementById('modalTitle').textContent = t;
    const dateDisplay = ev.endDate
      ? `${ev.date.replace(/-/g, '.')} – ${ev.endDate.replace(/-/g, '.')}`
      : ev.date.replace(/-/g, '.');
    document.getElementById('modalDate').querySelector('span').textContent     = dateDisplay;
    document.getElementById('modalLocation').querySelector('span').textContent = ev.location;
    document.getElementById('modalDesc').textContent = desc || '';
    
    const ctaBtn = document.querySelector('.modal-cta');
    ctaBtn.textContent = ctaText;
    ctaBtn.href = ev.externalUrl || '#';
    if (!ev.externalUrl) {
      ctaBtn.onclick = (e) => e.preventDefault(); // Do nothing if URL is empty, as requested
    } else {
      ctaBtn.onclick = null;
    }

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

  window.openModalByNum = openModalByNum;
})();
