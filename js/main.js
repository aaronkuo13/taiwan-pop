/* ============================================================
   Taiwan Pop — Main JavaScript
   ============================================================ */

'use strict';

/* ---------- Events Data ----------
   Update this array with real event information
   ---------------------------------------------------------- */
const EVENTS = [
  {
    num: '01', icon: '🎭',
    date: '2026-04-18', title: '臺美藝文大師系列講座 ─ 林懷民',
    location: 'New York, NY',
    desc: '雲門舞集創辦人林懷民於紐約現身說法，分享橫跨半世紀的創作歷程與台灣當代藝術的國際視野，是不可錯過的藝文饗宴。'
  },
  {
    num: '02', icon: '🎼',
    date: '2026-05-09', title: 'NSO × 泰武古謠',
    location: 'New York, NY',
    desc: '國家交響樂團（NSO）攜手屏東泰武國小古謠傳唱隊，以當代管弦與排灣族千年古謠的相遇，呈現台灣最深層的音樂靈魂。'
  },
  {
    num: '03', icon: '🎨',
    date: '2026-06-06', title: '布希維克街頭藝術節',
    location: 'Bushwick, Brooklyn, NY',
    desc: '台灣視覺藝術家進駐布魯克林藝術重鎮 Bushwick，以壁畫、裝置與現場創作，在紐約最具活力的街頭留下台灣的印記。'
  },
  {
    num: '04', icon: '🎬',
    date: '2026-06-13', title: '臺灣主題影展',
    location: 'New York, NY',
    desc: '精選台灣當代電影與紀錄片，於紐約影展場地放映，讓國際觀眾透過鏡頭認識台灣的土地、人文與當代生活故事。'
  },
  {
    num: '05', icon: '🌈',
    date: '2026-06-28', title: '紐約同志大遊行',
    location: 'Manhattan, New York, NY',
    desc: 'Taiwan Pop 代表隊盛裝參與世界最大同志遊行，以台灣驕傲的多元包容價值向全球發聲，展現台灣在亞洲人權進步的先行姿態。'
  },
  {
    num: '06', icon: '💃',
    date: '2026-07-11', title: '翃舞製作',
    location: 'New York, NY',
    desc: '翃舞製作以當代舞蹈語彙回應台灣社會文化，在紐約舞台呈現融合東方美學與當代肢體語言的精彩舞作，展現台灣舞蹈的國際高度。'
  },
  {
    num: '07', icon: '🎵',
    date: '2026-08-01', title: '"SummerStage" Taiwanese Waves',
    location: 'Central Park SummerStage, New York, NY',
    desc: 'Taiwan Pop 壓軸鉅獻！在紐約中央公園 SummerStage 舉辦台灣音樂之夜，集結台灣當代音樂人，以最震撼的現場演出向紐約致敬。'
  },
];

/* ---------- Navbar: transparent → solid on scroll ---------- */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Scroll handler
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-label', navLinks.classList.contains('open') ? '關閉選單' : '開啟選單');
  });

  // Close menu on nav link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
})();

/* ---------- Active nav link on scroll ---------- */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35, rootMargin: '-60px 0px -60px 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* ---------- Calendar ---------- */
(function initCalendar() {
  const grid      = document.getElementById('calGrid');
  const title     = document.getElementById('calTitle');
  const prevBtn   = document.getElementById('prevMonth');
  const nextBtn   = document.getElementById('nextMonth');
  const upcoming  = document.getElementById('upcomingList');

  if (!grid) return;

  // Convert events to a Set of 'YYYY-MM-DD' keys for O(1) lookup
  const eventMap = {};
  EVENTS.forEach(ev => {
    if (!eventMap[ev.date]) eventMap[ev.date] = [];
    eventMap[ev.date].push(ev);
  });

  // Start on the month of the first upcoming event
  const today = new Date();
  let current = new Date(today.getFullYear(), today.getMonth(), 1);

  // Jump to first event month if it's in the future
  const firstEvent = EVENTS.map(e => new Date(e.date)).sort((a, b) => a - b)[0];
  if (firstEvent && firstEvent > today) {
    current = new Date(firstEvent.getFullYear(), firstEvent.getMonth(), 1);
  }

  const monthNames = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  const shortMonths = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

  function pad(n) { return String(n).padStart(2, '0'); }
  function dateKey(y, m, d) { return `${y}-${pad(m+1)}-${pad(d)}`; }

  function renderCalendar() {
    const year  = current.getFullYear();
    const month = current.getMonth();

    title.textContent = `${year} 年 ${monthNames[month]}`;

    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev  = new Date(year, month, 0).getDate();

    grid.innerHTML = '';

    // Prev month tail
    for (let i = firstDay - 1; i >= 0; i--) {
      appendDay(daysInPrev - i, 'other-month', null);
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const key = dateKey(year, month, d);
      const isToday = (
        d === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      );
      const evs = eventMap[key] || [];
      appendDay(d, isToday ? 'today' : '', evs.length ? evs : null, key);
    }

    // Next month leading
    const total = firstDay + daysInMonth;
    const remainder = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (let d = 1; d <= remainder; d++) {
      appendDay(d, 'other-month', null);
    }

    renderUpcoming();
  }

  function appendDay(day, extraClass, events, key) {
    const el = document.createElement('div');
    el.classList.add('cal-day');
    if (extraClass) extraClass.split(' ').filter(Boolean).forEach(c => el.classList.add(c));

    const num = document.createElement('span');
    num.textContent = day;
    el.appendChild(num);

    if (events && events.length) {
      el.classList.add('has-event');
      el.title = events.map(e => e.title).join(', ');

      const dots = document.createElement('div');
      dots.className = 'cal-dot-wrap';
      events.slice(0, 3).forEach(() => {
        const dot = document.createElement('span');
        dot.className = 'cal-dot';
        dots.appendChild(dot);
      });
      el.appendChild(dots);

      el.addEventListener('click', () => openModal(events[0]));
    }

    grid.appendChild(el);
  }

  function renderUpcoming() {
    upcoming.innerHTML = '';

    const upcomingEvents = EVENTS
      .map(e => ({ ...e, dateObj: new Date(e.date) }))
      .filter(e => e.dateObj >= today)
      .sort((a, b) => a.dateObj - b.dateObj)
      .slice(0, 5);

    if (!upcomingEvents.length) {
      upcoming.innerHTML = '<li style="color:var(--text-muted);font-size:14px">暫無近期活動</li>';
      return;
    }

    upcomingEvents.forEach(ev => {
      const [y, m, d] = ev.date.split('-').map(Number);
      const li = document.createElement('li');
      li.className = 'upcoming-item';
      li.style.cursor = 'pointer';
      li.innerHTML = `
        <div class="upcoming-date-badge">
          <span class="day">${d}</span>
          <span class="month">${shortMonths[m - 1]}</span>
        </div>
        <div class="upcoming-info">
          <h4>${ev.title}</h4>
          <p>${ev.location}</p>
        </div>
      `;
      li.addEventListener('click', () => openModal(ev));
      upcoming.appendChild(li);
    });
  }

  prevBtn.addEventListener('click', () => {
    current.setMonth(current.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener('click', () => {
    current.setMonth(current.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();
})();

/* ---------- Scroll-reveal animation ---------- */
(function initReveal() {
  if (!('IntersectionObserver' in window)) return;

  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity .6s ease, transform .6s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll(
    '.article-card, .event-card, .gallery-item, .upcoming-item, .calendar-box, .upcoming-box'
  );

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
})();

/* ---------- Event Modal ---------- */
(function initModal() {
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalClose');
  if (!backdrop) return;

  function openModal(ev) {
    document.getElementById('modalNum').textContent   = `EVENT ${ev.num || ''}`;
    document.getElementById('modalIcon').textContent  = ev.icon || '';
    document.getElementById('modalTitle').textContent = ev.title;
    document.getElementById('modalDate').querySelector('span').textContent = ev.date.replace(/-/g, '.');
    document.getElementById('modalLocation').querySelector('span').textContent = ev.location;
    document.getElementById('modalDesc').textContent  = ev.desc || '';

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

  // Expose globally so calendar can call it
  window.openModal = openModal;
})();
