'use strict';

/* ---------- Calendar ---------- */
(function initCalendar() {
  const grid     = document.getElementById('calGrid');
  const title    = document.getElementById('calTitle');
  const prevBtn  = document.getElementById('prevMonth');
  const nextBtn  = document.getElementById('nextMonth');
  const upcoming = document.getElementById('upcomingList');
  const popup    = document.getElementById('calDayPopup');
  const popupDate = document.getElementById('calDayPopupDate');
  const popupList = document.getElementById('calDayPopupList');
  const popupClose = document.getElementById('calDayPopupClose');

  if (!grid) return;

  // Build eventMap: single-day → one key; multi-day → one key per day in range
  const eventMap = {};
  function addEventToMap(key, ev) {
    if (!eventMap[key]) eventMap[key] = [];
    if (!eventMap[key].find(e => e.num === ev.num)) eventMap[key].push(ev);
  }
  EVENTS.forEach(ev => {
    if (ev.endDate) {
      const start = new Date(ev.date + 'T12:00:00');
      const end   = new Date(ev.endDate + 'T12:00:00');
      for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        addEventToMap(`${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}`, ev);
      }
    } else {
      addEventToMap(ev.date, ev);
    }
  });

  const today = new Date();
  let current = new Date(today.getFullYear(), today.getMonth(), 1);

  const firstEvent = EVENTS.map(e => new Date(e.date)).sort((a, b) => a - b)[0];
  if (firstEvent && firstEvent > today) {
    current = new Date(firstEvent.getFullYear(), firstEvent.getMonth(), 1);
  }

  function pad(n) { return String(n).padStart(2, '0'); }
  function dateKey(y, m, d) { return `${y}-${pad(m+1)}-${pad(d)}`; }

  /* ── Day Popup ── */
  function showDayPopup(events, anchorEl, label) {
    const lang = window.currentLang || 'zh';
    popupDate.textContent = label;
    popupList.innerHTML = '';
    events.forEach(ev => {
      const t = (lang === 'en' && ev.title_en) ? ev.title_en : ev.title;
      const li = document.createElement('li');
      const a  = document.createElement('a');
      a.href = 'event.html?num=' + ev.num;
      a.textContent = t;
      li.appendChild(a);
      popupList.appendChild(li);
    });

    // Position near the anchor cell
    const rect = anchorEl.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;

    let top  = rect.bottom + scrollY + 8;
    let left = rect.left  + scrollX;

    popup.style.display = 'block';

    // Clamp so popup doesn't overflow right edge
    const pw = popup.offsetWidth;
    if (left + pw > window.innerWidth - 16) {
      left = window.innerWidth - pw - 16;
    }

    popup.style.top  = top  + 'px';
    popup.style.left = left + 'px';
  }

  function hideDayPopup() {
    popup.style.display = 'none';
  }

  if (popupClose) popupClose.addEventListener('click', hideDayPopup);
  document.addEventListener('click', function(e) {
    if (popup.style.display === 'block' && !popup.contains(e.target) && !e.target.closest('.cal-day')) {
      hideDayPopup();
    }
  });

  /* ── Render ── */
  function renderCalendar() {
    const L     = LANG[window.currentLang || 'zh'];
    const year  = current.getFullYear();
    const month = current.getMonth();

    title.textContent = L.calTitle(year, L.months[month]);

    // Update weekday headers
    const wdSpans = document.querySelectorAll('.cal-weekdays span');
    wdSpans.forEach((span, i) => { if (L.weekdays[i]) span.textContent = L.weekdays[i]; });

    const firstDay    = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev  = new Date(year, month, 0).getDate();

    grid.innerHTML = '';
    hideDayPopup();

    for (let i = firstDay - 1; i >= 0; i--) {
      appendDay(daysInPrev - i, 'other-month', null, null, L);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const key = dateKey(year, month, d);
      const isToday = (
        d === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      );
      const evs = eventMap[key] || [];
      appendDay(d, isToday ? 'today' : '', evs.length ? evs : null, { year, month, d, key }, L);
    }

    const total     = firstDay + daysInMonth;
    const remainder = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (let d = 1; d <= remainder; d++) {
      appendDay(d, 'other-month', null, null, L);
    }

    renderUpcoming();
  }

  function appendDay(day, extraClass, events, info, L) {
    const el = document.createElement('div');
    el.classList.add('cal-day');
    if (extraClass) extraClass.split(' ').filter(Boolean).forEach(c => el.classList.add(c));

    const num = document.createElement('span');
    num.textContent = day;
    el.appendChild(num);

    if (events && events.length) {
      el.classList.add('has-event');

      const dots = document.createElement('div');
      dots.className = 'cal-dot-wrap';
      events.slice(0, 3).forEach(() => {
        const dot = document.createElement('span');
        dot.className = 'cal-dot';
        dots.appendChild(dot);
      });
      el.appendChild(dots);

      el.addEventListener('click', function(e) {
        e.stopPropagation();
        if (events.length === 1) {
          location.href = 'event.html?num=' + events[0].num;
        } else {
          const label = `${info.year}.${pad(info.month + 1)}.${pad(info.d)}`;
          showDayPopup(events, el, label);
        }
      });
    }

    grid.appendChild(el);
  }

  function renderUpcoming() {
    const L    = LANG[window.currentLang || 'zh'];
    const lang = window.currentLang || 'zh';
    upcoming.innerHTML = '';

    const upcomingEvents = EVENTS
      .map(e => ({ ...e, dateObj: new Date(e.date) }))
      .filter(e => e.dateObj >= today)
      .sort((a, b) => a.dateObj - b.dateObj)
      .slice(0, 6);

    if (!upcomingEvents.length) {
      upcoming.innerHTML = `<li style="color:var(--text-muted);font-size:14px">${L['cal-no-events']}</li>`;
      return;
    }

    upcomingEvents.forEach(ev => {
      const [y, m, d] = ev.date.split('-').map(Number);
      const li = document.createElement('li');
      li.className = 'upcoming-item';

      const evTitle = (lang === 'en' && ev.title_en) ? ev.title_en : ev.title;

      let rangeHtml = '';
      if (ev.endDate) {
        const [ey, em, ed] = ev.endDate.split('-').map(Number);
        const rangeStr = (em === m)
          ? `${d}–${ed} ${L.shortMonths[m - 1]}`
          : `${L.shortMonths[m - 1]} ${d} – ${L.shortMonths[em - 1]} ${ed}`;
        rangeHtml = `<span class="upcoming-range">${rangeStr}</span><br>`;
      }

      li.innerHTML = `
        <div class="upcoming-item-top">
          <div class="upcoming-date-badge">
            <span class="day">${d}</span>
            <span class="month">${L.shortMonths[m - 1]}</span>
          </div>
          <div class="upcoming-info">
            ${rangeHtml}
            <h4>${evTitle}</h4>
            <p>${ev.location}</p>
          </div>
        </div>
        <div class="upcoming-item-footer">${L['cal-view-detail'] || '查看詳情 →'}</div>
      `;
      li.addEventListener('click', () => { location.href = 'event.html?num=' + ev.num; });
      upcoming.appendChild(li);
    });
  }

  prevBtn.addEventListener('click', () => { current.setMonth(current.getMonth() - 1); renderCalendar(); });
  nextBtn.addEventListener('click', () => { current.setMonth(current.getMonth() + 1); renderCalendar(); });

  renderCalendar();

  // Expose for language switch re-render
  window.reRenderCalendar = renderCalendar;
})();
