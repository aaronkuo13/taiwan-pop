'use strict';

/* ---------- Board Game 文化大富翁 ---------- */
(function initBoardGame() {

  /* ── 常數 ── */
  const TOTAL_LAPS        = 3;
  const CPU_HIT_RATE_NORM = 0.50;
  const CPU_HIT_RATE_SEEN = 0.80;

  /* ── 40格棋盤定義 ── */
  const SPACES = [
    { type:'start',         label:'出發點',      icon:'🏁' },
    { type:'zone', zone:'lin-hwai-min', qIdx:0, label:'林懷民①', icon:'🎭' },
    { type:'zone', zone:'lin-hwai-min', qIdx:1, label:'林懷民②', icon:'🎭' },
    { type:'zone', zone:'lin-hwai-min', qIdx:2, label:'林懷民③', icon:'🎭' },
    { type:'chance',        label:'機會',        icon:'🎴' },
    { type:'zone', zone:'nso-paiwan', qIdx:0,   label:'NSO①',    icon:'🎵' },
    { type:'zone', zone:'nso-paiwan', qIdx:1,   label:'NSO②',    icon:'🎵' },
    { type:'zone', zone:'nso-paiwan', qIdx:2,   label:'NSO③',    icon:'🎵' },
    { type:'fate',          label:'命運',        icon:'💀' },
    { type:'zone', zone:'bushwick', qIdx:0,     label:'布希維克①', icon:'🎨' },
    { type:'zone', zone:'bushwick', qIdx:1,     label:'布希維克②', icon:'🎨' },
    { type:'zone', zone:'bushwick', qIdx:2,     label:'布希維克③', icon:'🎨' },
    { type:'corner-chance', label:'機會角',      icon:'🎴' },
    { type:'free',          label:'免費通過',    icon:'🎁' },
    { type:'zone', zone:'film', qIdx:0,         label:'影展①',   icon:'🎬' },
    { type:'zone', zone:'film', qIdx:1,         label:'影展②',   icon:'🎬' },
    { type:'zone', zone:'film', qIdx:2,         label:'影展③',   icon:'🎬' },
    { type:'fate',          label:'命運',        icon:'💀' },
    { type:'zone', zone:'pride', qIdx:0,        label:'同志①',   icon:'🌈' },
    { type:'zone', zone:'pride', qIdx:1,        label:'同志②',   icon:'🌈' },
    { type:'corner-fate',   label:'命運角',      icon:'💀' },
    { type:'zone', zone:'pride', qIdx:2,        label:'同志③',   icon:'🌈' },
    { type:'chance',        label:'機會',        icon:'🎴' },
    { type:'zone', zone:'horse', qIdx:0,        label:'翃舞①',   icon:'💃' },
    { type:'zone', zone:'horse', qIdx:1,        label:'翃舞②',   icon:'💃' },
    { type:'zone', zone:'horse', qIdx:2,        label:'翃舞③',   icon:'💃' },
    { type:'fate',          label:'命運',        icon:'💀' },
    { type:'zone', zone:'summerstage', qIdx:0,  label:'舞台①',   icon:'🌙' },
    { type:'zone', zone:'summerstage', qIdx:1,  label:'舞台②',   icon:'🌙' },
    { type:'zone', zone:'summerstage', qIdx:2,  label:'舞台③',   icon:'🌙' },
    { type:'rest',          label:'休息',        icon:'😴' },
    { type:'free',          label:'免費通過',    icon:'🎁' },
    { type:'corner-chance', label:'機會角',      icon:'🎴' },
    { type:'fate',          label:'命運',        icon:'💀' },
    { type:'free',          label:'免費通過',    icon:'🎁' },
    { type:'rest',          label:'休息',        icon:'😴' },
    { type:'free',          label:'免費通過',    icon:'🎁' },
    { type:'chance',        label:'機會',        icon:'🎴' },
    { type:'free',          label:'免費通過',    icon:'🎁' },
    { type:'fate',          label:'命運',        icon:'💀' },
  ];

  /* ── 矩形棋盤各格像素位置 (1080×760) ── */
  /* l=left, t=top, w=width, h=height */
  const RECTS = [
    {l:  0, t:660, w:100, h:100}, // [0]  START (BL corner)
    {l:100, t:660, w: 80, h:100}, // [1]  林懷民①
    {l:180, t:660, w: 80, h:100}, // [2]  林懷民②
    {l:260, t:660, w: 80, h:100}, // [3]  林懷民③
    {l:340, t:660, w: 80, h:100}, // [4]  機會
    {l:420, t:660, w: 80, h:100}, // [5]  NSO①
    {l:500, t:660, w: 80, h:100}, // [6]  NSO②
    {l:580, t:660, w: 80, h:100}, // [7]  NSO③
    {l:660, t:660, w: 80, h:100}, // [8]  命運
    {l:740, t:660, w: 80, h:100}, // [9]  布希維克①
    {l:820, t:660, w: 80, h:100}, // [10] 布希維克②
    {l:900, t:660, w: 80, h:100}, // [11] 布希維克③
    {l:980, t:660, w:100, h:100}, // [12] 機會角 (BR corner)
    {l:980, t:580, w:100, h: 80}, // [13] 免費通過
    {l:980, t:500, w:100, h: 80}, // [14] 影展①
    {l:980, t:420, w:100, h: 80}, // [15] 影展②
    {l:980, t:340, w:100, h: 80}, // [16] 影展③
    {l:980, t:260, w:100, h: 80}, // [17] 命運
    {l:980, t:180, w:100, h: 80}, // [18] 同志①
    {l:980, t:100, w:100, h: 80}, // [19] 同志②
    {l:980, t:  0, w:100, h:100}, // [20] 命運角 (TR corner)
    {l:900, t:  0, w: 80, h:100}, // [21] 同志③
    {l:820, t:  0, w: 80, h:100}, // [22] 機會
    {l:740, t:  0, w: 80, h:100}, // [23] 翃舞①
    {l:660, t:  0, w: 80, h:100}, // [24] 翃舞②
    {l:580, t:  0, w: 80, h:100}, // [25] 翃舞③
    {l:500, t:  0, w: 80, h:100}, // [26] 命運
    {l:420, t:  0, w: 80, h:100}, // [27] 舞台①
    {l:340, t:  0, w: 80, h:100}, // [28] 舞台②
    {l:260, t:  0, w: 80, h:100}, // [29] 舞台③
    {l:180, t:  0, w: 80, h:100}, // [30] 休息
    {l:100, t:  0, w: 80, h:100}, // [31] 免費通過
    {l:  0, t:  0, w:100, h:100}, // [32] 機會角 (TL corner)
    {l:  0, t:100, w:100, h: 80}, // [33] 命運
    {l:  0, t:180, w:100, h: 80}, // [34] 免費通過
    {l:  0, t:260, w:100, h: 80}, // [35] 休息
    {l:  0, t:340, w:100, h: 80}, // [36] 免費通過
    {l:  0, t:420, w:100, h: 80}, // [37] 機會
    {l:  0, t:500, w:100, h: 80}, // [38] 免費通過
    {l:  0, t:580, w:100, h: 80}, // [39] 命運
  ];

  /* ── 角色方向 ── */
  function spaceDir(idx) {
    if (idx >= 1  && idx <= 12) return 'right';
    if (idx >= 13 && idx <= 20) return 'back';
    if (idx >= 21 && idx <= 32) return 'left';
    return 'front'; // 0, 33-39
  }

  /* ── 機會牌 (10張) ── */
  const CHANCE_CARDS = [
    { text:'你在社群分享 Taiwan Pop，演算法大爆發！',       effect:'前進 3 格',   fn: p => moveBy(p, 3) },
    { text:'林懷民大師親自指導你的步伐！',                  effect:'前進 2 格',   fn: p => moveBy(p, 2) },
    { text:'發現台灣小吃攤，精力充沛！',                    effect:'再骰一次',    fn: p => grantExtraRoll(p) },
    { text:'雲門舞集表演票抽中啦！',                        effect:'前進 4 格',   fn: p => moveBy(p, 4) },
    { text:'台灣觀光局贊助旅費！',                          effect:'前進 2 格',   fn: p => moveBy(p, 2) },
    { text:'遇到同鄉台灣人互相打氣！',                      effect:'再骰一次',    fn: p => grantExtraRoll(p) },
    { text:'意外成為 Taiwan Pop 網紅代言人！',               effect:'前進 3 格',   fn: p => moveBy(p, 3) },
    { text:'台灣外交部特別招待，搭頭等艙回出發點！',         effect:'移動到出發點', fn: p => moveToStart(p) },
    { text:'紐約地鐵嚴重延誤',                              effect:'後退 2 格',   fn: p => moveBy(p, -2) },
    { text:'收到 SummerStage 貴賓票，直奔現場！',            effect:'前進 3 格',   fn: p => moveBy(p, 3) },
  ];

  /* ── 命運牌 (10張) ── */
  const FATE_CARDS = [
    { text:'護照忘在旅館，跑回去拿',                       effect:'後退 3 格', fn: p => moveBy(p, -3) },
    { text:'踩到紐約口香糖，鞋子黏住了',                   effect:'停一回合',  fn: p => setSkip(p) },
    { text:'搞錯地鐵方向，坐到終點站',                     effect:'後退 4 格', fn: p => moveBy(p, -4) },
    { text:'行李太重，走路超慢',                           effect:'後退 2 格', fn: p => moveBy(p, -2) },
    { text:'遇上紐約暴雨，忘了帶傘',                       effect:'後退 1 格', fn: p => moveBy(p, -1) },
    { text:'時差太嚴重，在 Central Park 長椅睡著',          effect:'停一回合',  fn: p => setSkip(p) },
    { text:'被紐約街頭藝人邀請上台跳舞，耽誤時間',          effect:'後退 2 格', fn: p => moveBy(p, -2) },
    { text:'台灣媒體採訪你對活動的感想！',                  effect:'前進 2 格', fn: p => moveBy(p, 2) },
    { text:'意外接受 CNN 採訪，介紹台灣文化！',             effect:'前進 3 格', fn: p => moveBy(p, 3) },
    { text:'找到一張 Carnegie Hall 掉落的貴賓券！',         effect:'前進 2 格', fn: p => moveBy(p, 2) },
  ];

  /* ── 遊戲狀態 ── */
  const G = {
    players: [
      { id:'human', name:'a-we', pos:0, laps:0, skip:false, freePass:false },
      { id:'cpu',   name:'yoyo', pos:0, laps:0, skip:false, freePass:false },
    ],
    turn:       0,
    phase:      'roll',
    extraRoll:  false,
    chancePool: shuffle([...Array(10).keys()]),
    fatePool:   shuffle([...Array(10).keys()]),
    prevPos:    [0, 0],
    visited:    [new Set(), new Set()],
  };

  /* ── DOM refs ── */
  const boardEl      = document.getElementById('bgBoard');
  const diceBtnEl    = document.getElementById('bgDiceBtn');
  const diceLabelEl  = document.getElementById('bgDiceLabel');
  const diceResultEl = document.getElementById('bgDiceResult');
  const turnMsgEl    = document.getElementById('bgTurnMsg');
  const qModal       = document.getElementById('bgQuestionModal');
  const qZone        = document.getElementById('bgQZone');
  const qText        = document.getElementById('bgQText');
  const qOpts        = document.getElementById('bgQOpts');
  const qResult      = document.getElementById('bgQResult');
  const qNext        = document.getElementById('bgQNext');
  const cardModal    = document.getElementById('bgCardModal');
  const cardBox      = document.getElementById('bgCardBox');
  const cardType     = document.getElementById('bgCardType');
  const cardText     = document.getElementById('bgCardText');
  const cardEffect   = document.getElementById('bgCardEffect');
  const winModal     = document.getElementById('bgWinModal');
  const boardWrap    = document.getElementById('bgBoardWrap');

  if (!boardEl) return;

  /* ── 棋盤縮放 ── */
  const BOARD_W = 1080, BOARD_H = 760;
  function scaleBoard() {
    const ww = boardWrap ? boardWrap.offsetWidth : window.innerWidth;
    const scale = Math.min(1, ww / BOARD_W);
    boardEl.style.transform = `scale(${scale})`;
    boardEl.style.transformOrigin = 'top left';
    if (boardWrap) boardWrap.style.height = (BOARD_H * scale) + 'px';
  }
  scaleBoard();
  window.addEventListener('resize', scaleBoard);

  /* ── 建立棋盤格 ── */
  SPACES.forEach((sp, i) => {
    const r = RECTS[i];
    const el = document.createElement('div');
    el.className = 'bg-cell bg-cell--' + sp.type;
    if (sp.zone) el.dataset.zone = sp.zone;
    el.style.left   = r.l + 'px';
    el.style.top    = r.t + 'px';
    el.style.width  = r.w + 'px';
    el.style.height = r.h + 'px';
    el.title = sp.label;
    el.innerHTML = `<span class="bg-cell-icon">${sp.icon}</span><span class="bg-cell-num">${i}</span>`;
    boardEl.appendChild(el);
  });

  /* ── 中心區域 ── */
  const centerEl = document.createElement('div');
  centerEl.className = 'bg-center';
  centerEl.innerHTML = `
    <div class="bg-center-title">文化大富翁</div>
    <div class="bg-card-piles">
      <div class="bg-card-pile bg-card-pile--chance"><span>🎴</span><span>機會</span></div>
      <div class="bg-card-pile bg-card-pile--fate"><span>💀</span><span>命運</span></div>
    </div>
  `;
  boardEl.appendChild(centerEl);

  /* ── 棋子 ── */
  const PIECE_IMGS = [
    { front:'images/awe-front.png',  back:'images/awe-back.png',  left:'images/awe-left.png',  right:'images/awe-right.png'  },
    { front:'images/yoyo-front.png', back:'images/yoyo-back.png', left:'images/yoyo-left.png', right:'images/yoyo-right.png' },
  ];

  const pieceEls = G.players.map((p, i) => {
    const wrap = document.createElement('div');
    wrap.className = `bg-piece bg-piece--${p.id}`;

    const diceAnim = document.createElement('div');
    diceAnim.className = 'bg-dice-anim hidden';
    wrap.appendChild(diceAnim);

    const img = document.createElement('img');
    img.className = 'bg-piece-img';
    img.src = PIECE_IMGS[i].front;
    img.alt = p.name;
    wrap.appendChild(img);

    boardEl.appendChild(wrap);
    return { wrap, img, diceAnim };
  });

  function getPieceCenter(idx) {
    const r = RECTS[idx];
    return { cx: r.l + r.w / 2, cy: r.t + r.h / 2 };
  }

  function placePiece(playerIdx, spaceIdx, offsetX) {
    const { cx, cy } = getPieceCenter(spaceIdx);
    const PIECE_SIZE = 52;
    const wrap = pieceEls[playerIdx].wrap;
    wrap.style.left = (cx - PIECE_SIZE / 2 + (offsetX || 0)) + 'px';
    wrap.style.top  = (cy - PIECE_SIZE / 2) + 'px';
  }

  function updatePieceDir(playerIdx, dir) {
    pieceEls[playerIdx].img.src = PIECE_IMGS[playerIdx][dir];
  }

  function updateAllPieces() {
    G.players.forEach((p, i) => {
      placePiece(i, p.pos, i === 0 ? -14 : 14);
      updatePieceDir(i, spaceDir(p.pos));
    });
  }
  updateAllPieces();

  /* ── Helpers ── */
  function updateStatusBar() {
    document.getElementById('bgPlayerPos').textContent  = G.players[0].pos;
    document.getElementById('bgPlayerLaps').textContent = G.players[0].laps;
    document.getElementById('bgCpuPos').textContent     = G.players[1].pos;
    document.getElementById('bgCpuLaps').textContent    = G.players[1].laps;
  }

  function setTurnMsg(msg) { if (turnMsgEl) turnMsgEl.textContent = msg; }
  function setDiceResult(txt) { if (diceResultEl) diceResultEl.textContent = txt; }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function drawCard(pool, deck) {
    if (pool.length === 0) pool.push(...shuffle([...Array(deck.length).keys()]));
    return deck[pool.shift()];
  }

  /* ── 骰子動畫 ── */
  const DICE_FACES = ['⚀','⚁','⚂','⚃','⚄','⚅'];
  function runDiceAnim(playerIdx, finalRoll, onDone) {
    const { diceAnim } = pieceEls[playerIdx];
    diceAnim.classList.remove('hidden');
    let frame = 0;
    const FRAMES = 14;
    const timer = setInterval(() => {
      frame++;
      diceAnim.textContent = DICE_FACES[Math.floor(Math.random() * 6)];
      diceAnim.classList.remove('bg-dice-pop');
      void diceAnim.offsetWidth; // reflow
      diceAnim.classList.add('bg-dice-pop');
      if (frame >= FRAMES) {
        clearInterval(timer);
        diceAnim.textContent = DICE_FACES[finalRoll - 1];
        setTimeout(() => {
          diceAnim.classList.add('hidden');
          onDone();
        }, 400);
      }
    }, 60);
  }

  /* ── 逐格移動動畫 ── */
  function animateMove(playerIdx, stepsLeft, onDone) {
    if (stepsLeft <= 0) { onDone(); return; }
    const p = G.players[playerIdx];
    const nextPos = (p.pos + 1) % SPACES.length;
    if (nextPos === 0 && p.pos !== 0) {
      p.laps += 1;
      if (p.laps >= TOTAL_LAPS) {
        p.pos = 0;
        updateAllPieces();
        updateStatusBar();
        setTimeout(() => showWin(playerIdx), 300);
        return;
      }
    }
    p.pos = nextPos;
    placePiece(playerIdx, p.pos, playerIdx === 0 ? -14 : 14);
    updatePieceDir(playerIdx, spaceDir(p.pos));
    updateStatusBar();
    setTimeout(() => animateMove(playerIdx, stepsLeft - 1, onDone), 200);
  }

  /* ── 位移輔助 (用於卡牌效果) ── */
  function advancePos(player, steps) {
    if (steps > 0) {
      for (let i = 0; i < steps; i++) {
        const next = (player.pos + 1) % SPACES.length;
        if (next === 0 && player.pos !== 0) {
          player.laps += 1;
          if (player.laps >= TOTAL_LAPS) { player.pos = next; return true; }
        }
        player.pos = next;
      }
    } else {
      player.pos = ((player.pos + steps) % SPACES.length + SPACES.length) % SPACES.length;
    }
    return false;
  }

  /* ── 卡牌效果輔助 ── */
  function moveBy(playerIdx, steps) {
    const p = G.players[playerIdx];
    const won = advancePos(p, steps);
    updateAllPieces();
    updateStatusBar();
    if (won) setTimeout(() => showWin(playerIdx), 600);
  }

  function moveToStart(playerIdx) {
    const p = G.players[playerIdx];
    if (p.pos !== 0) p.laps += 1;
    p.pos = 0;
    if (p.laps >= TOTAL_LAPS) { updateAllPieces(); updateStatusBar(); setTimeout(() => showWin(playerIdx), 600); return; }
    updateAllPieces();
    updateStatusBar();
  }

  function grantExtraRoll(playerIdx) {
    if (playerIdx === 0) G.extraRoll = true;
  }

  function setSkip(playerIdx) { G.players[playerIdx].skip = true; }

  /* ── 擲骰子 ── */
  window.bgRollDice = function() {
    if (G.phase !== 'roll') return;
    if (diceBtnEl) { diceBtnEl.disabled = true; diceBtnEl.classList.add('rolling'); }
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceResult('🎲 ' + roll);
    if (diceLabelEl) diceLabelEl.textContent = roll + ' 步';
    G.phase = 'moving';
    runDiceAnim(0, roll, () => {
      if (diceBtnEl) diceBtnEl.classList.remove('rolling');
      G.prevPos[0] = G.players[0].pos;
      animateMove(0, roll, () => {
        if (G.phase === 'gameover') return;
        landOn(0, SPACES[G.players[0].pos], G.players[0].pos);
      });
    });
  };

  /* ── 落地處理 ── */
  function landOn(playerIdx, sp, spaceIdx) {
    const p = G.players[playerIdx];
    if (sp.type === 'free') { endTurn(playerIdx); return; }
    if (sp.type === 'zone' && p.freePass) {
      p.freePass = false;
      setTurnMsg(playerIdx === 0 ? '🎁 免費通過！' : '🤖 yoyo 免費通過！');
      endTurn(playerIdx);
      return;
    }
    switch (sp.type) {
      case 'start':
        endTurn(playerIdx); break;
      case 'rest':
        setSkip(playerIdx);
        setTurnMsg(playerIdx === 0 ? '😴 踩到休息格，下回合跳過' : '🤖 yoyo 在休息...');
        endTurn(playerIdx); break;
      case 'chance':
      case 'corner-chance':
        showCard(playerIdx, 'chance'); break;
      case 'fate':
      case 'corner-fate':
        showCard(playerIdx, 'fate'); break;
      case 'zone':
        showQuestion(playerIdx, sp, spaceIdx); break;
      default:
        endTurn(playerIdx);
    }
  }

  /* ── 問題 ── */
  function showQuestion(playerIdx, sp, spaceIdx) {
    G.phase = 'question';
    const wasVisited = G.visited[playerIdx].has(spaceIdx);
    G.visited[playerIdx].add(spaceIdx);
    const cpuRate = wasVisited ? CPU_HIT_RATE_SEEN : CPU_HIT_RATE_NORM;

    const q = GAME_DATA[sp.zone].questions[sp.qIdx];
    const zd = GAME_DATA[sp.zone];
    qZone.textContent = zd.emoji + ' ' + zd.title;
    qZone.style.background = zd.colorLight;
    qZone.style.color = zd.color;

    qText.textContent = q.q;
    qOpts.innerHTML = '';
    qResult.className = 'bg-modal-result hidden';
    qResult.innerHTML = '';
    qNext.className = 'bg-modal-next hidden';
    qModal.classList.remove('hidden');

    const indices = shuffle([0, 1, 2, 3]);
    const correctOrigIdx = q.ans;

    if (playerIdx === 1) {
      const willCorrect = Math.random() < cpuRate;
      const chosenIdx = willCorrect ? correctOrigIdx : (correctOrigIdx + 1 + Math.floor(Math.random() * 3)) % 4;
      indices.forEach(origIdx => {
        const btn = document.createElement('button');
        btn.className = 'bg-opt-btn';
        btn.textContent = q.opts[origIdx];
        btn.disabled = true;
        qOpts.appendChild(btn);
      });
      setTurnMsg('🤖 yoyo 思考中...');
      setTimeout(() => {
        const isCorrect = (chosenIdx === correctOrigIdx);
        const displayPos = indices.indexOf(chosenIdx);
        qOpts.children[displayPos].classList.add(isCorrect ? 'correct' : 'wrong');
        handleAnswer(playerIdx, isCorrect, q);
      }, 1500);
    } else {
      indices.forEach(origIdx => {
        const btn = document.createElement('button');
        btn.className = 'bg-opt-btn';
        btn.textContent = q.opts[origIdx];
        btn.onclick = () => {
          Array.from(qOpts.children).forEach(b => b.disabled = true);
          const isCorrect = (origIdx === correctOrigIdx);
          btn.classList.add(isCorrect ? 'correct' : 'wrong');
          handleAnswer(playerIdx, isCorrect, q);
        };
        qOpts.appendChild(btn);
      });
    }
  }

  function handleAnswer(playerIdx, isCorrect, q) {
    if (isCorrect) {
      qResult.className = 'bg-modal-result correct';
      qResult.innerHTML = `✅ 答對了！<br><small>${q.fact}</small>`;
    } else {
      qResult.className = 'bg-modal-result wrong';
      qResult.innerHTML = `❌ 答錯了！正確答案是「${q.opts[q.ans]}」<br><small>${q.fact}</small>`;
      G.players[playerIdx].pos = G.prevPos[playerIdx];
      updateAllPieces();
      updateStatusBar();
    }
    qNext.className = 'bg-modal-next';
    qNext.dataset.player = playerIdx;
    qNext.dataset.correct = isCorrect ? '1' : '0';
  }

  window.bgQuestionDone = function() {
    qModal.classList.add('hidden');
    G.phase = 'roll';
    endTurn(parseInt(qNext.dataset.player));
  };

  /* ── 卡牌 ── */
  function showCard(playerIdx, type) {
    G.phase = 'card';
    const card = type === 'chance'
      ? drawCard(G.chancePool, CHANCE_CARDS)
      : drawCard(G.fatePool,   FATE_CARDS);
    cardBox.className = `bg-card-box bg-card-box--${type}`;
    cardType.textContent   = type === 'chance' ? '🎴 機會！' : '💀 命運！';
    cardText.textContent   = card.text;
    cardEffect.textContent = '→ ' + card.effect;
    cardModal.classList.remove('hidden');
    cardModal.dataset.player = playerIdx;
    cardModal._pendingFn = () => card.fn(playerIdx);
  }

  window.bgCardDone = function() {
    cardModal.classList.add('hidden');
    const playerIdx = parseInt(cardModal.dataset.player);
    if (cardModal._pendingFn) { cardModal._pendingFn(); cardModal._pendingFn = null; }
    G.phase = 'roll';
    if (G.players[playerIdx].laps >= TOTAL_LAPS) { setTimeout(() => showWin(playerIdx), 300); return; }
    if (!G.extraRoll) { endTurn(playerIdx); } else { G.extraRoll = false; enableRoll(); }
  };

  /* ── 回合結束 / CPU 回合 ── */
  function endTurn(playerIdx) {
    if (G.phase === 'gameover') return;
    if (G.extraRoll && playerIdx === 0) { G.extraRoll = false; setTurnMsg('🎲 再骰一次！'); enableRoll(); return; }
    G.turn = playerIdx === 0 ? 1 : 0;
    if (G.turn === 1) {
      setTurnMsg('🤖 yoyo 的回合...');
      setDiceResult('');
      if (diceBtnEl) diceBtnEl.disabled = true;
      setTimeout(cpuTurn, 1200);
    } else {
      if (G.players[0].skip) {
        G.players[0].skip = false;
        setTurnMsg('😴 你在休息，跳過本回合');
        setTimeout(() => endTurn(0), 1500);
      } else {
        enableRoll();
      }
    }
  }

  function enableRoll() {
    G.phase = 'roll';
    G.turn  = 0;
    setTurnMsg('輪到你了！');
    if (diceLabelEl) diceLabelEl.textContent = '擲骰子';
    if (diceBtnEl) diceBtnEl.disabled = false;
  }

  function cpuTurn() {
    if (G.phase === 'gameover') return;
    if (G.players[1].skip) {
      G.players[1].skip = false;
      setTurnMsg('🤖 yoyo 在休息...');
      setTimeout(() => endTurn(1), 1200);
      return;
    }
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceResult('🎲 ' + roll);
    setTurnMsg('🤖 yoyo 擲出 ' + roll + ' 步');
    G.phase = 'moving';
    G.prevPos[1] = G.players[1].pos;
    runDiceAnim(1, roll, () => {
      animateMove(1, roll, () => {
        if (G.phase === 'gameover') return;
        landOn(1, SPACES[G.players[1].pos], G.players[1].pos);
      });
    });
  }

  /* ── 獲勝 ── */
  function showWin(playerIdx) {
    G.phase = 'gameover';
    const isHuman = playerIdx === 0;
    winModal.classList.remove('hidden');
    document.getElementById('bgWinIcon').textContent  = isHuman ? '🎉' : '🤖';
    document.getElementById('bgWinTitle').textContent = isHuman ? '恭喜你獲勝！' : 'yoyo 獲勝！';
    document.getElementById('bgWinSub').textContent   = isHuman
      ? '你成功繞行紐約三圈，探索了所有台灣文化活動！'
      : '別氣餒，再試一次讓你更了解台灣文化！';
    const winImg = document.getElementById('bgWinImg');
    if (winImg) winImg.classList.toggle('hidden', !isHuman);
    const container = document.getElementById('bgWinConfetti');
    container.innerHTML = '';
    const colors = ['#FF4D75','#008F7A','#FFD700','#FF6B35','#A8E6CF'];
    for (let i = 0; i < 60; i++) {
      const d = document.createElement('div');
      d.className = 'confetti-piece';
      d.style.cssText =
        `left:${(Math.random()*100).toFixed(1)}%;` +
        `background:${colors[i%colors.length]};` +
        `animation-delay:${(Math.random()*1.5).toFixed(2)}s;` +
        `animation-duration:${(2+Math.random()*2).toFixed(2)}s;` +
        `width:${(6+Math.random()*8).toFixed(0)}px;height:${(6+Math.random()*8).toFixed(0)}px;`;
      container.appendChild(d);
    }
  }

  window.bgRestart = function() {
    winModal.classList.add('hidden');
    G.players.forEach(p => { p.pos = 0; p.laps = 0; p.skip = false; p.freePass = false; });
    G.turn       = 0;
    G.extraRoll  = false;
    G.chancePool = shuffle([...Array(10).keys()]);
    G.fatePool   = shuffle([...Array(10).keys()]);
    G.prevPos    = [0, 0];
    G.visited    = [new Set(), new Set()];
    updateAllPieces();
    updateStatusBar();
    setDiceResult('');
    enableRoll();
  };

  /* ── 初始化 ── */
  updateStatusBar();
  enableRoll();

})();
