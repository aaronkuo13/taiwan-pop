/* ============================================================
   Taiwan Pop — Main JavaScript
   ============================================================ */

'use strict';

/* ---------- Events Data ----------
   Update this array with real event information
   ---------------------------------------------------------- */
const EVENTS = [
  {
    num: '01', icon: '🎤',
    date: '2026-04-15', title: '春季演唱會',
    location: '台北小巨蛋',
    desc: '台灣最具代表性的流行歌手齊聚一堂，帶來震撼人心的春季音樂盛宴，邀請所有音樂愛好者共同感受台灣流行音樂的魅力。精彩演出陣容豐富，歡迎闔家共享。'
  },
  {
    num: '02', icon: '🏆',
    date: '2026-04-22', title: '音樂創作大賽',
    location: '線上 + 現場',
    desc: '公開徵集全台灣優秀音樂創作人，無論是詞曲創作或製作編曲，都歡迎投件，為台灣流行音樂注入新血。評審團由業界專業人士組成，優勝者將獲得豐富獎金與演出機會。'
  },
  {
    num: '03', icon: '💬',
    date: '2026-05-01', title: '音樂人對談論壇',
    location: '台北國際會議中心',
    desc: '邀請業界知名音樂人、製作人與各方意見領袖，共同探討台灣流行音樂的現況與未來發展方向，深度交流音樂創作、產業趨勢與國際化策略。'
  },
  {
    num: '04', icon: '🌟',
    date: '2026-05-15', title: 'Taiwan Sound Awards',
    location: '國家音樂廳',
    desc: '年度台灣流行音樂獎項盛典，表彰最具影響力的音樂作品與藝人，見證台灣音樂產業的閃耀時刻。典禮設有多個獎項類別，涵蓋創作、演唱、製作各領域。'
  },
  {
    num: '05', icon: '🎵',
    date: '2026-06-20', title: '夏日音樂節',
    location: '台北大安森林公園',
    desc: '戶外場地、多元舞台、跨界音樂風格，夏日音樂節打破疆界，讓所有世代的音樂人共聚一堂，享受音樂的純粹樂趣。現場設有美食區、手作市集等豐富周邊活動。'
  },
  {
    num: '06', icon: '🎨',
    date: '2026-07-10', title: '流行文化展覽',
    location: '松山文創園區',
    desc: '透過沉浸式展覽形式，回顧台灣流行音樂的發展歷程，從唱片、服裝到視覺藝術，全面展現台灣流行文化的豐富面貌。互動裝置與珍貴歷史文物同步呈現。'
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
