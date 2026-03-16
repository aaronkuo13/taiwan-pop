'use strict';

/* ---------- Quiz / Map Interactive ---------- */
(function initQuiz() {
  const overlay    = document.getElementById('quizOverlay');
  const backBtn    = document.getElementById('quizBackBtn');
  const mapScroll  = document.getElementById('mapScroll');
  const mapStage   = document.getElementById('mapStage');
  const hintBadge  = document.getElementById('mapHintBadge');
  const footerDots = document.getElementById('mapFooterDots');
  const doneCount  = document.getElementById('mapDoneCount');

  if (!overlay || !mapScroll) return;

  const completed = JSON.parse(localStorage.getItem('twpop_quiz') || '{}');

  let curEvent = null, curQ = 0, score = 0, answered = false;
  let shuffledAns = 0, shuffledOpts = [];

  function buildFooterDots() {
    footerDots.innerHTML = '';
    Object.values(GAME_DATA).forEach(ev => {
      const d = document.createElement('div');
      const c = completed[ev.id];
      let cls = 'map-footer-dot';
      if (c) cls += (c.score === c.total) ? ' done-perfect' : ' done-partial';
      d.className = cls;
      d.id = 'fdot-' + ev.id;
      d.textContent = ev.emoji;
      footerDots.appendChild(d);
    });
    doneCount.textContent = Object.keys(completed).filter(k => k !== '__allDoneCelebrated').length;
  }

  function markPinDone(id, isPerfect) {
    const pin = mapStage.querySelector(`[data-qid="${id}"]`);
    if (pin) {
      pin.classList.remove('done-partial', 'done-perfect');
      pin.classList.add(isPerfect ? 'done-perfect' : 'done-partial');
    }
    const dot = document.getElementById('fdot-' + id);
    if (dot) {
      dot.classList.remove('done-partial', 'done-perfect');
      dot.classList.add(isPerfect ? 'done-perfect' : 'done-partial');
    }
    doneCount.textContent = Object.keys(completed).filter(k => k !== '__allDoneCelebrated').length;
  }

  function applyCompleted() {
    Object.entries(completed).forEach(([id, data]) => {
      if (id === '__allDoneCelebrated') return;
      markPinDone(id, data.score === data.total);
    });
  }

  function checkAllPerfect() {
    return Object.keys(GAME_DATA).every(id =>
      completed[id] && completed[id].score === completed[id].total
    );
  }

  function showAllDoneCelebration() {
    const ov = document.getElementById('allDoneOverlay');
    if (!ov) return;
    const pc = document.getElementById('celebrateParticles');
    pc.innerHTML = '';
    const emojis = ['🎊','🎉','✨','🎭','🎨','🎬','🎵','💃','🌈','🏆','🇹🇼','⭐','🎶','🎪','🎀'];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'celebrate-particle';
      p.textContent = emojis[i % emojis.length];
      p.style.cssText = `left:${(i / 30 * 100 + (Math.random() - .5) * 8).toFixed(1)}%;` +
        `animation-delay:${(Math.random() * 4.5).toFixed(2)}s;` +
        `animation-duration:${(3.8 + Math.random() * 3.5).toFixed(2)}s;` +
        `font-size:${14 + Math.floor(Math.random() * 18)}px;`;
      pc.appendChild(p);
    }
    // Update celebration text for current language
    const lang = window.currentLang || 'zh';
    const L = LANG[lang];
    const titleEl = ov.querySelector('.celebrate-title');
    const subEl   = ov.querySelector('.celebrate-sub');
    const badgeEl = ov.querySelector('.celebrate-badge');
    const invEl   = ov.querySelector('.celebrate-invite');
    const toEvEl  = document.getElementById('celebrateToEvents');
    const closeEl = document.getElementById('celebrateClose');
    if (titleEl) titleEl.textContent = L['cel-title'];
    if (subEl)   subEl.innerHTML     = L['cel-sub'];
    if (badgeEl) badgeEl.textContent = L['cel-badge'];
    if (invEl)   invEl.textContent   = L['cel-invite'];
    if (toEvEl)  toEvEl.textContent  = L['cel-to-events'];
    if (closeEl) closeEl.textContent = L['cel-close'];

    closeQuiz();
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // Drag-to-scroll
  let isDragging = false, dragStartX = 0, dragScrollLeft = 0;
  mapScroll.addEventListener('mousedown', e => {
    isDragging = true;
    dragStartX = e.pageX - mapScroll.offsetLeft;
    dragScrollLeft = mapScroll.scrollLeft;
    mapScroll.style.cursor = 'grabbing';
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
    mapScroll.style.cursor = '';
  });
  mapScroll.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - mapScroll.offsetLeft;
    mapScroll.scrollLeft = dragScrollLeft - (x - dragStartX) * 1.4;
  });

  // Scroll hint
  const quizSection = document.getElementById('quiz');
  if (quizSection && hintBadge) {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        hintBadge.classList.add('show');
        setTimeout(() => hintBadge.classList.remove('show'), 3200);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(quizSection);
  }

  // Expose startQuiz for a-we system
  window._startQuiz = startQuiz;

  function startQuiz(id) {
    curEvent = GAME_DATA[id];
    curQ     = 0;
    score    = 0;
    answered = false;
    if (!curEvent) return;

    const lang = window.currentLang || 'zh';
    document.getElementById('quizEvLabel').textContent = (lang === 'en' && curEvent.title_en) ? curEvent.title_en : curEvent.title;
    document.getElementById('quizEvLabel').style.color = curEvent.color;
    document.getElementById('quizEvTitle').textContent = (lang === 'en' && curEvent.subtitle_en) ? curEvent.subtitle_en : curEvent.subtitle;
    document.getElementById('quizProgFill').style.background = curEvent.color;

    buildDots();
    renderQuestion();

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    overlay.scrollTop = 0;
  }

  function closeQuiz() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function buildDots() {
    const row = document.getElementById('quizDots');
    row.innerHTML = '';
    curEvent.questions.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'quiz-dot';
      d.id = 'qdot-' + i;
      d.style.borderColor = curEvent.color + '44';
      row.appendChild(d);
    });
  }

  function updateDot(i, correct) {
    const d = document.getElementById('qdot-' + i);
    if (!d) return;
    if (correct) {
      d.textContent = '✓';
      d.style.background = curEvent.color;
      d.style.borderColor = curEvent.color;
      d.style.color = 'white';
    } else {
      d.textContent = '✗';
      d.style.background = '#fdeee9';
      d.style.borderColor = '#e8472a';
      d.style.color = '#e8472a';
    }
  }

  function renderQuestion() {
    const total = curEvent.questions.length;
    const L     = LANG[window.currentLang || 'zh'];
    document.getElementById('quizProgText').textContent  = `Q${curQ + 1} / ${total}`;
    document.getElementById('quizProgScore').textContent = `${score} / ${total}`;
    document.getElementById('quizProgFill').style.width  = `${(curQ / total) * 100}%`;

    const q    = curEvent.questions[curQ];
    const lang = window.currentLang || 'zh';
    const evTitle = (lang === 'en' && curEvent.title_en) ? curEvent.title_en : curEvent.title;
    const qText   = (lang === 'en' && q.q_en)    ? q.q_en    : q.q;
    const srcOpts = (lang === 'en' && q.opts_en) ? q.opts_en : q.opts;
    const factText= (lang === 'en' && q.fact_en) ? q.fact_en : q.fact;

    // Fisher-Yates shuffle
    const idxs = [0, 1, 2, 3];
    for (let k = idxs.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [idxs[k], idxs[j]] = [idxs[j], idxs[k]];
    }
    shuffledOpts = idxs.map(k => srcOpts[k]);
    shuffledAns  = idxs.indexOf(q.ans);

    const nextLabel = curQ < total - 1 ? L['quiz-next-q'] : L['quiz-see-result'];

    const area = document.getElementById('quizArea');
    area.innerHTML = `
      <div class="quiz-q-card">
        <p class="quiz-q-num">Q${curQ + 1} · ${evTitle}</p>
        <p class="quiz-q-text">${qText}</p>
        <div class="quiz-opts" id="quizOpts">
          ${shuffledOpts.map((o, i) => `
            <button class="quiz-opt" onclick="quizChoose(${i})">
              <span style="margin-right:6px;opacity:.4;font-style:normal">${['Ａ','Ｂ','Ｃ','Ｄ'][i]}.</span>${o}
              <span class="quiz-opt-mark"></span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-fact" id="quizFact">
          <p class="quiz-fact-lbl">💡 Taiwan Fun Fact</p>
          <p>${factText}</p>
        </div>
        <button class="quiz-next" id="quizNext"
          style="background:${curEvent.color}"
          onclick="quizNext()">
          ${nextLabel}
        </button>
      </div>
    `;
    answered = false;
    overlay.scrollTop = 0;
  }

  window.quizChoose = function(i) {
    if (answered) return;
    answered = true;
    const btns = document.querySelectorAll('.quiz-opt');
    btns.forEach(b => b.disabled = true);
    const correct = (i === shuffledAns);
    btns[i].classList.add(correct ? 'correct' : 'wrong');
    btns[i].querySelector('.quiz-opt-mark').textContent = correct ? '✓' : '✗';
    if (!correct) {
      btns[shuffledAns].classList.add('correct');
      btns[shuffledAns].querySelector('.quiz-opt-mark').textContent = '✓';
    }
    if (correct) score++;
    updateDot(curQ, correct);
    document.getElementById('quizFact').classList.add('show');
    document.getElementById('quizNext').classList.add('show');
  };

  window.quizNext = function() {
    curQ++;
    if (curQ >= curEvent.questions.length) { showResult(); return; }
    renderQuestion();
  };

  function showResult() {
    const total = curEvent.questions.length;
    const L     = LANG[window.currentLang || 'zh'];
    document.getElementById('quizProgFill').style.width  = '100%';
    document.getElementById('quizProgScore').textContent = `${score} / ${total}`;

    const pct   = score / total;
    const emoji = pct === 1 ? '🏆' : pct >= 0.6 ? '🎉' : '💪';
    const msg   = pct === 1 ? L['quiz-res-perfect']
                : pct >= 0.6 ? L['quiz-res-good']
                : L['quiz-res-keep'];

    const isPerfect = (score === total);
    completed[curEvent.id] = { score, total, date: new Date().toISOString() };
    localStorage.setItem('twpop_quiz', JSON.stringify(completed));
    markPinDone(curEvent.id, isPerfect);

    if (isPerfect && checkAllPerfect() && !completed.__allDoneCelebrated) {
      completed.__allDoneCelebrated = true;
      localStorage.setItem('twpop_quiz', JSON.stringify(completed));
      setTimeout(() => showAllDoneCelebration(), 1900);
    }

    document.getElementById('quizArea').innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result-emoji">${emoji}</div>
        <div class="quiz-result-score" style="color:${curEvent.color}">${score} / ${total}</div>
        <p class="quiz-result-msg">${msg}</p>
        <div class="quiz-result-unlock"
          style="background:${curEvent.colorLight};color:${curEvent.color}">
          🎉 ${((window.currentLang || 'zh') === 'en' && curEvent.unlockMsg_en) ? curEvent.unlockMsg_en : curEvent.unlockMsg}
        </div>
        <div class="quiz-result-actions">
          <button class="quiz-result-btn" style="background:${curEvent.color};color:white"
            onclick="quizRetry()">${L['quiz-retry']}</button>
          <button class="quiz-result-btn sec" onclick="quizBackToMap()">${L['quiz-back-map']}</button>
        </div>
      </div>
    `;
  }

  window.quizRetry    = function() { startQuiz(curEvent.id); };
  window.quizBackToMap = function() { closeQuiz(); };

  backBtn.addEventListener('click', closeQuiz);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const celebOv = document.getElementById('allDoneOverlay');
      if (celebOv && celebOv.classList.contains('open')) {
        celebOv.classList.remove('open');
        document.body.style.overflow = '';
      } else if (overlay.classList.contains('open')) {
        closeQuiz();
      }
    }
  });

  const allDoneOv = document.getElementById('allDoneOverlay');
  if (allDoneOv) {
    function closeCelebration() {
      allDoneOv.classList.remove('open');
      document.body.style.overflow = '';
    }
    document.getElementById('celebrateClose').addEventListener('click', closeCelebration);
    document.getElementById('celebrateToEvents').addEventListener('click', closeCelebration);
  }

  buildFooterDots();
  applyCompleted();
})();

/* ---------- A-WE Character System ---------- */
(function initAwe() {
  const AWE_SPEED = 10;        // % map-width per second
  const ASPECT    = 1600 / 520; // mapStage w/h ratio — for isotropic distance
  const ENC_R     = 4;          // encounter trigger radius (normalised %)

  const CARDS = [
    { id:'k01', x:35, y:47, img:'https://picsum.photos/seed/tw001/400/200', fact:'雲門舞集由林懷民創立於 1973 年', ans:true },
    { id:'k02', x:54, y:36, img:'https://picsum.photos/seed/tw002/400/200', fact:'台灣是亞洲第一個同婚合法化的地區（2019年）', ans:true },
    { id:'k03', x:40, y:62, img:'https://picsum.photos/seed/tw003/400/200', fact:'排灣族泰武古謠已列入文化部無形文化資產', ans:true },
    { id:'k04', x:72, y:44, img:'https://picsum.photos/seed/tw004/400/200', fact:'布希維克（Bushwick）位於曼哈頓', ans:false },
    { id:'k05', x:62, y:65, img:'https://picsum.photos/seed/tw005/400/200', fact:'NSO 全名是 National Symphony Orchestra（不含 of Taiwan）', ans:false },
    { id:'k06', x:15, y:40, img:'https://picsum.photos/seed/tw006/400/200', fact:'林肯中心位於紐約上西城（Upper West Side）', ans:true },
    { id:'k07', x:30, y:55, img:'https://picsum.photos/seed/tw007/400/200', fact:'卡內基音樂廳建於 1891 年', ans:true },
    { id:'k08', x:50, y:20, img:'https://picsum.photos/seed/tw008/400/200', fact:'台灣電影《悲情城市》首部入圍威尼斯影展競賽', ans:true },
    { id:'k09', x:44, y:72, img:'https://picsum.photos/seed/tw009/400/200', fact:'IFC Center 位於格林威治村（Greenwich Village）', ans:true },
    { id:'k10', x:76, y:30, img:'https://picsum.photos/seed/tw010/400/200', fact:'紐約同志大遊行每年在 6 月舉行', ans:true },
    { id:'k11', x:22, y:68, img:'https://picsum.photos/seed/tw011/400/200', fact:'翃舞製作是以原住民文化為核心的舞蹈公司', ans:false },
    { id:'k12', x:60, y:50, img:'https://picsum.photos/seed/tw012/400/200', fact:'Central Park SummerStage 是免費戶外演出場地', ans:true },
    { id:'k13', x:36, y:28, img:'https://picsum.photos/seed/tw013/400/200', fact:'台灣護照免簽國家數全球排名前 40 名', ans:true },
    { id:'k14', x:80, y:62, img:'https://picsum.photos/seed/tw014/400/200', fact:'台灣電影金馬獎比金曲獎歷史更悠久', ans:true },
    { id:'k15', x:12, y:58, img:'https://picsum.photos/seed/tw015/400/200', fact:'珍珠奶茶發源於台中', ans:true },
  ];

  const S = {
    pos:         { x: 50, y: 50 }, // overwritten below after DOM refs are ready
    waypoints:   [],
    dir:         'front',
    moving:      false,
    paused:      false,
    pendingQid:  null,
    collected:   new Set(),
    active:      new Set(CARDS.map(c => c.id)),
    recentWrong: new Set(), // answered wrong — suppressed until a-we walks away
    lastTime:    null,
    raf:         null,
  };

  const mapStage      = document.getElementById('mapStage');
  const charEl        = document.getElementById('aweChar');
  const spriteEl      = document.getElementById('aweSprite');
  const counterEl     = document.getElementById('cardCountNum');
  const cardModal     = document.getElementById('cardModal');
  const cmFact        = document.getElementById('cmFact');
  const cmResult      = document.getElementById('cmResult');
  const cmImg         = document.getElementById('cmImg');
  const diceBtn       = document.getElementById('diceBtn');
  const diceResult    = document.getElementById('diceResult');
  const completeModal = document.getElementById('aweComplete');
  if (!charEl || !mapStage) return;

  /* Start at center of the visible viewport, not the full 1600px map */
  const mapScrollEl = document.getElementById('mapScroll');
  const stageW      = mapStage.offsetWidth || 1600;
  S.pos.x = mapScrollEl
    ? (mapScrollEl.scrollLeft + mapScrollEl.clientWidth / 2) / stageW * 100
    : 20;

  /* --- Pin click → move a-we --- */
  mapStage.querySelectorAll('.map-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      const x = parseFloat(pin.style.left);
      const y = parseFloat(pin.style.top);
      moveTo(x, y, pin.dataset.qid);
    });
  });

  updateDOM();

  /* --- Movement --- */
  function moveTo(tx, ty, qid) {
    if (S.paused) return;
    S.waypoints  = [{ x: tx, y: S.pos.y }, { x: tx, y: ty }];
    S.pendingQid = qid;
    if (!S.moving) {
      S.moving   = true;
      S.lastTime = null;
      S.raf      = requestAnimationFrame(tick);
    }
  }

  /* Straight-line movement for dice rolls (no quiz trigger) */
  function moveDirect(tx, ty) {
    if (S.paused) return;
    S.waypoints  = [{ x: tx, y: ty }];
    S.pendingQid = null;
    if (!S.moving) {
      S.moving   = true;
      S.lastTime = null;
      S.raf      = requestAnimationFrame(tick);
    }
  }

  /* Dice roll — exposed globally */
  const DICE_DIRS = ['N', 'S', 'E', 'W'];
  const DICE_STEP = 8; // % per step
  window.aweDiceRoll = function() {
    if (S.paused || S.moving) return;
    if (diceBtn) { diceBtn.disabled = true; diceBtn.classList.add('rolling'); }
    setTimeout(() => {
      if (diceBtn) { diceBtn.classList.remove('rolling'); }
      const dir   = DICE_DIRS[Math.floor(Math.random() * 4)];
      const steps = Math.floor(Math.random() * 6) + 1;
      const dist  = steps * DICE_STEP;
      let tx = S.pos.x, ty = S.pos.y;
      if (dir === 'N') ty = Math.max(5,  ty - dist);
      if (dir === 'S') ty = Math.min(95, ty + dist);
      if (dir === 'E') tx = Math.min(95, tx + dist);
      if (dir === 'W') tx = Math.max(5,  tx - dist);
      const arrows = { N:'↑北', S:'↓南', E:'→東', W:'←西' };
      // Show result in button label
      const lbl = diceBtn ? diceBtn.querySelector('.dice-label') : null;
      if (lbl) lbl.textContent = `${arrows[dir]} × ${steps} 步`;
      moveDirect(tx, ty);
    }, 500);
  };

  function tick(ts) {
    if (!S.lastTime) S.lastTime = ts;
    const dt = Math.min((ts - S.lastTime) / 1000, 0.1);
    S.lastTime = ts;

    if (S.paused) { S.raf = requestAnimationFrame(tick); return; }

    if (S.waypoints.length === 0) {
      S.moving = false;
      charEl.classList.remove('moving');
      updateDOM(); // re-enable dice button
      // Restore dice label after short delay
      if (diceBtn) {
        const lbl = diceBtn.querySelector('.dice-label');
        if (lbl && lbl.textContent !== '擲骰子') {
          setTimeout(() => { if (lbl) lbl.textContent = '擲骰子'; }, 1200);
        }
      }
      if (S.pendingQid) {
        const qid  = S.pendingQid;
        S.pendingQid = null;
        window._startQuiz && window._startQuiz(qid);
      }
      return;
    }

    const wp   = S.waypoints[0];
    const dx   = wp.x - S.pos.x;
    const dy   = wp.y - S.pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const step = AWE_SPEED * dt;

    if (Math.abs(dx) > 0.2)      S.dir = dx > 0 ? 'right' : 'left';
    else if (Math.abs(dy) > 0.2) S.dir = dy > 0 ? 'front' : 'back';

    if (dist <= step) {
      S.pos = { x: wp.x, y: wp.y };
      S.waypoints.shift();
    } else {
      S.pos.x += (dx / dist) * step;
      S.pos.y += (dy / dist) * step;
    }

    checkEncounters();
    updateDOM();
    S.raf = requestAnimationFrame(tick);
  }

  /* --- Encounter detection --- */
  function checkEncounters() {
    for (const c of CARDS) {
      if (!S.active.has(c.id)) continue;
      const dx = c.x - S.pos.x;
      const dy = (c.y - S.pos.y) * ASPECT;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // If answered wrong recently, clear suppression only once far enough away
      if (S.recentWrong.has(c.id)) {
        if (dist > ENC_R * 3) S.recentWrong.delete(c.id);
        continue;
      }
      if (dist < ENC_R) { showCard(c); break; }
    }
  }

  function showCard(card) {
    S.paused = true;
    charEl.classList.remove('moving');
    if (cmImg) cmImg.src       = card.img || '';
    cmFact.textContent         = card.fact;
    cmResult.textContent       = '';
    cmResult.className         = 'cm-result hidden';
    cardModal.dataset.cid      = card.id;
    cardModal.dataset.cans     = card.ans;
    cardModal.classList.remove('hidden');
  }

  window.aweAnswer = function(userAns) {
    const card    = CARDS.find(c => c.id === cardModal.dataset.cid);
    const correct = (userAns === (cardModal.dataset.cans === 'true'));
    if (correct) {
      S.collected.add(card.id);
      S.active.delete(card.id);
      cmResult.textContent = '🎉 正確！卡片收藏成功';
      cmResult.className   = 'cm-result correct';
    } else {
      S.recentWrong.add(card.id); // suppress re-trigger until a-we walks away
      cmResult.textContent = '❌ 答錯了，下次路過再試試！';
      cmResult.className   = 'cm-result wrong';
    }
    updateCounter();
    setTimeout(() => {
      cardModal.classList.add('hidden');
      S.paused = false;
      if (S.collected.size === CARDS.length) { showCompletion(); return; }
      if (S.moving || S.waypoints.length > 0 || S.pendingQid) {
        S.moving   = true;
        S.lastTime = null;
        S.raf      = requestAnimationFrame(tick);
      }
    }, 1400);
  };

  /* --- DOM helpers --- */
  function updateDOM() {
    charEl.style.left = S.pos.x + '%';
    charEl.style.top  = S.pos.y + '%';
    spriteEl.src = 'images/awe-' + S.dir + '.png';
    charEl.classList.toggle('moving', S.moving && !S.paused);
    if (diceBtn) diceBtn.disabled = S.moving || S.paused;
  }

  function updateCounter() {
    if (counterEl) counterEl.textContent = S.collected.size;
  }

  /* --- Completion --- */
  function showCompletion() {
    if (!completeModal) return;
    const container = document.getElementById('aweCelebConfetti');
    container.innerHTML = '';
    const colors = ['#FF4D75','#008F7A','#FFD700','#FF6B35','#A8E6CF','#FF85A1','#B5EAD7'];
    for (let i = 0; i < 80; i++) {
      const d = document.createElement('div');
      d.className = 'confetti-piece';
      d.style.cssText =
        `left:${(Math.random()*100).toFixed(1)}%;` +
        `background:${colors[i % colors.length]};` +
        `animation-delay:${(Math.random()*2).toFixed(2)}s;` +
        `animation-duration:${(2 + Math.random()*2).toFixed(2)}s;` +
        `width:${(6 + Math.random()*8).toFixed(0)}px;` +
        `height:${(6 + Math.random()*8).toFixed(0)}px;` +
        `transform:rotate(${(Math.random()*360).toFixed(0)}deg)`;
      container.appendChild(d);
    }
    completeModal.classList.remove('hidden');
  }

  window.aweCloseComplete = function() {
    completeModal.classList.add('hidden');
  };
})();
