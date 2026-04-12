'use strict';

/* ---------- Concept Accordion ---------- */
(function initConceptAccordion() {
  const panels = document.querySelectorAll('.concept-panel');
  if (!panels.length) return;

  panels.forEach(panel => {
    panel.addEventListener('click', function () {
      if (this.classList.contains('concept-panel--active')) return;
      panels.forEach(p => p.classList.remove('concept-panel--active'));
      this.classList.add('concept-panel--active');
    });
  });
})();
