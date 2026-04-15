import { db } from './firebase.js';
import {
  collection, getDocs, addDoc, query, orderBy, limit, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

/* ── Canvas dimensions ── */
const W = 800, H = 320, GROUND_Y = 265, SPEED = 5;

/* ── Event data for obstacle popups ── */
const GAME_EVENTS = [
  { name: 'NSO《來自臺灣》室內樂巡演',    location: 'Merkin Concert Hall',        date: '2026.05.19' },
  { name: '翃舞製作《羽人》BIRDY',          location: 'Skirball Cultural Center',   date: '2026.07.17–18' },
  { name: 'Taiwanese Waves @ SummerStage', location: 'Central Park, NYC',          date: '2026.08.16' },
  { name: '砲臺舞蹈節',                    location: 'Hudson River Park',          date: '2026.08.12–14' },
  { name: '臺美藝文大師系列講座',           location: 'Asia Society',               date: '2026.06.14' },
  { name: '世界之間：臺灣電影',            location: 'Anthology Film Archives',     date: '2026.07' },
  { name: '布希維克街頭藝術節',            location: 'Bushwick, Brooklyn',         date: '2026.06.07–08' },
  { name: '2026 紐約同志遊行',             location: 'Fifth Avenue, NYC',          date: '2026.06.28' },
];

/* ─────────────────────────────────────────
   Game Class
───────────────────────────────────────── */
class AWEGame {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx    = this.canvas.getContext('2d');

    this.state   = 'idle';   // idle | running | dead
    this.score   = 0;
    this.frame   = 0;
    this.hiScore = parseInt(localStorage.getItem('awe_hi') || '0');
    this.evIdx   = 0;

    /* Player */
    this.p = { x: 80, y: GROUND_Y, vy: 0, w: 44, h: 64, onGround: true };

    /* Obstacles */
    this.obs         = [];
    this.distToNext  = 500;

    /* Popup */
    this.popup = null;

    /* Ground scroll offset */
    this.gx = 0;

    /* Sprites */
    this.imgRun  = this._loadImg('images/awe-right.png');
    this.imgJump = this._loadImg('images/awe-front.png');

    /* Controls */
    const act = () => this._input();
    document.addEventListener('keydown', e => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); act(); }
    });
    this.canvas.addEventListener('click',      act);
    this.canvas.addEventListener('touchstart', e => { e.preventDefault(); act(); });

    this._resize();
    window.addEventListener('resize', () => this._resize());

    requestAnimationFrame(() => this._loop());
  }

  /* ── helpers ── */
  _loadImg(src) {
    const img = new Image();
    img.src = src;
    return img;
  }

  _resize() {
    const cw    = this.canvas.parentElement.clientWidth;
    const scale = Math.min(1, cw / W);
    this.canvas.style.width  = `${W * scale}px`;
    this.canvas.style.height = `${H * scale}px`;
  }

  /* ── input ── */
  _input() {
    if (this.state === 'idle') {
      this.state = 'running';
    } else if (this.state === 'running' && this.p.onGround) {
      this.p.vy       = -14;
      this.p.onGround = false;
    } else if (this.state === 'dead') {
      this._restart();
    }
  }

  _restart() {
    this.state      = 'idle';
    this.score      = 0;
    this.frame      = 0;
    this.evIdx      = 0;
    this.obs        = [];
    this.distToNext = 500;
    this.popup      = null;
    this.gx         = 0;
    Object.assign(this.p, { y: GROUND_Y, vy: 0, onGround: true });
  }

  /* ── main loop ── */
  _loop() {
    requestAnimationFrame(() => this._loop());
    this._update();
    this._draw();
  }

  /* ── update ── */
  _update() {
    if (this.state !== 'running') return;

    this.frame++;

    /* Score: +1 per 6 frames */
    if (this.frame % 6 === 0) {
      this.score++;
      if (this.score > this.hiScore) {
        this.hiScore = this.score;
        localStorage.setItem('awe_hi', this.hiScore);
      }
    }

    /* Player physics */
    this.p.vy += 0.7;
    this.p.y  += this.p.vy;
    if (this.p.y >= GROUND_Y) {
      this.p.y        = GROUND_Y;
      this.p.vy       = 0;
      this.p.onGround = true;
    }

    /* Ground scroll */
    this.gx = (this.gx - SPEED + W * 2) % W;

    /* Spawn obstacles */
    this.distToNext -= SPEED;
    const last = this.obs[this.obs.length - 1];
    if (this.distToNext <= 0 && (!last || last.x < W - 120)) {
      this._spawn();
      this.distToNext = 380 + Math.random() * 340;
    }

    /* Move obstacles */
    for (let i = this.obs.length - 1; i >= 0; i--) {
      const o = this.obs[i];
      o.x -= SPEED;

      /* Trigger popup when obstacle fully passed */
      if (!o.passed && o.x + o.w < this.p.x) {
        o.passed  = true;
        this.popup = { ev: o.ev, t: 250, opacity: 1 };
      }

      if (o.x + o.w < 0) this.obs.splice(i, 1);
    }

    /* Popup timer */
    if (this.popup) {
      this.popup.t--;
      this.popup.opacity = this.popup.t < 40 ? this.popup.t / 40 : 1;
      if (this.popup.t <= 0) this.popup = null;
    }

    /* Collision */
    if (this._hit()) {
      this.state = 'dead';
      onGameOver(this.score);
    }
  }

  _spawn() {
    const h  = 55 + Math.floor(Math.random() * 65);
    const w  = 32 + Math.floor(Math.random() * 28);
    const ev = GAME_EVENTS[this.evIdx % GAME_EVENTS.length];
    this.evIdx++;
    this.obs.push({ x: W + 10, y: GROUND_Y - h, w, h, ev, passed: false, style: this.evIdx % 5 });
  }

  _hit() {
    const { x, y, w } = this.p;
    const m = 7;
    for (const o of this.obs) {
      if (
        x + w - m > o.x + m &&
        x + m     < o.x + o.w - m &&
        y - m     > o.y + m
      ) return true;
    }
    return false;
  }

  /* ── draw ── */
  _draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    /* Ground line */
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y + 2);
    ctx.lineTo(W, GROUND_Y + 2);
    ctx.stroke();

    /* Ground dashes */
    ctx.fillStyle = 'rgba(0,255,0,0.2)';
    for (let i = 0; i < 26; i++) {
      const dx = (this.gx + i * 32) % W;
      ctx.fillRect(dx, GROUND_Y + 6, 18, 2);
    }

    /* Obstacles */
    this.obs.forEach(o => this._drawBuilding(o));

    /* Player */
    this._drawPlayer();

    /* Popup */
    if (this.popup) this._drawPopup();

    /* Score HUD */
    this._drawScore();

    /* State overlays */
    if (this.state === 'idle') this._drawIdle();
    else if (this.state === 'dead') this._drawDead();
  }

  _drawPlayer() {
    const { x, y, w, h, onGround } = this.p;
    const img = onGround ? this.imgRun : this.imgJump;
    const bob = (this.state === 'running' && onGround)
      ? Math.sin(this.frame * 0.35) * 2 : 0;

    if (img.complete && img.naturalWidth > 0) {
      this.ctx.drawImage(img, x, y - h + bob, w, h);
    } else {
      this.ctx.fillStyle = '#00ff00';
      this.ctx.fillRect(x, y - h, w, h);
    }
  }

  _drawBuilding(o) {
    const ctx        = this.ctx;
    const { x, y, w, h, style } = o;

    /* Body */
    ctx.fillStyle = '#06061a';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth   = 1.5;
    ctx.strokeRect(x, y, w, h);

    /* Windows */
    ctx.fillStyle = 'rgba(0,255,0,0.1)';
    const cols = Math.max(1, Math.floor(w / 13));
    const rows = Math.max(1, Math.floor(h / 18));
    const ww = 5, wh = 4;
    const cg = (w - cols * ww) / (cols + 1);
    const rg = (h - rows * wh) / (rows + 1);
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        ctx.fillRect(x + cg + c*(ww+cg), y + rg + r*(wh+rg), ww, wh);

    /* Rooftop decorations */
    ctx.lineWidth = 1;
    if (style === 0) {
      /* Antenna */
      ctx.strokeStyle = '#00ff00';
      ctx.beginPath(); ctx.moveTo(x+w/2, y); ctx.lineTo(x+w/2, y-13); ctx.stroke();
      ctx.fillStyle = '#00ff00';
      ctx.beginPath(); ctx.arc(x+w/2, y-14, 2, 0, Math.PI*2); ctx.fill();
    } else if (style === 1) {
      /* Parapet notches */
      ctx.strokeStyle = '#00ff00';
      for (let i = 0; i < Math.floor(w/10); i++)
        ctx.strokeRect(x + 3 + i*10, y - 6, 6, 6);
    } else if (style === 2) {
      /* Arch */
      ctx.strokeStyle = '#f52281';
      ctx.beginPath(); ctx.arc(x+w/2, y, w/2.5, Math.PI, 0); ctx.stroke();
    } else if (style === 3) {
      /* Triangle gable */
      ctx.strokeStyle = '#0082d2';
      ctx.beginPath(); ctx.moveTo(x-2, y); ctx.lineTo(x+w/2, y-12); ctx.lineTo(x+w+2, y); ctx.stroke();
    } else {
      /* Flag */
      ctx.strokeStyle = '#00ff00';
      ctx.beginPath(); ctx.moveTo(x+w/2, y); ctx.lineTo(x+w/2, y-15); ctx.stroke();
      ctx.fillStyle = '#f52281';
      ctx.beginPath(); ctx.moveTo(x+w/2, y-15); ctx.lineTo(x+w/2+10, y-10); ctx.lineTo(x+w/2, y-5); ctx.fill();
    }
  }

  _drawPopup() {
    const ctx = this.ctx;
    const { ev, opacity } = this.popup;
    ctx.save();
    ctx.globalAlpha = opacity;

    const pw = 330, ph = 78, px = (W - pw) / 2, py = 14;

    ctx.fillStyle = 'rgba(0,0,0,0.9)';
    this._rrect(px, py, pw, ph, 8); ctx.fill();
    ctx.strokeStyle = '#00ff00'; ctx.lineWidth = 1;
    this._rrect(px, py, pw, ph, 8); ctx.stroke();

    ctx.fillStyle   = '#00ff00';
    ctx.font        = 'bold 13px Montserrat, "Noto Sans TC", sans-serif';
    ctx.textAlign   = 'center';
    ctx.fillText(ev.name, px + pw/2, py + 23);

    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font      = '11px Montserrat, sans-serif';
    ctx.fillText(`📍 ${ev.location}`, px + pw/2, py + 43);
    ctx.fillText(`🗓  ${ev.date}`,     px + pw/2, py + 60);

    ctx.restore();
  }

  _drawScore() {
    const ctx = this.ctx;
    ctx.textAlign = 'right';
    ctx.font      = 'bold 14px Montserrat, monospace';
    ctx.fillStyle = 'rgba(0,255,0,0.3)';
    ctx.fillText(`HI ${String(this.hiScore).padStart(5,'0')}`, W - 12, 22);
    ctx.fillStyle = '#00ff00';
    ctx.fillText(String(this.score).padStart(5,'0'), W - 12, 42);
  }

  _drawIdle() {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0,255,0,0.92)';
    ctx.font      = 'bold 17px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('按空白鍵 或 點擊畫面開始', W/2, H/2 - 8);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font      = '11px Montserrat, sans-serif';
    ctx.fillText('PRESS SPACE / TAP TO START', W/2, H/2 + 13);
  }

  _drawDead() {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fff';
    ctx.font      = 'bold 26px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', W/2, H/2 - 12);
    ctx.fillStyle = 'rgba(0,255,0,0.6)';
    ctx.font      = '13px Montserrat, sans-serif';
    ctx.fillText('按空白鍵 / 點擊重新開始', W/2, H/2 + 13);
  }

  /* Rounded rect path helper */
  _rrect(x, y, w, h, r) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y); ctx.quadraticCurveTo(x+w, y,   x+w,   y+r);
    ctx.lineTo(x+w,   y+h-r); ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r,   y+h); ctx.quadraticCurveTo(x,   y+h, x,     y+h-r);
    ctx.lineTo(x,     y+r); ctx.quadraticCurveTo(x,   y,   x+r,   y);
    ctx.closePath();
  }
}

/* ─────────────────────────────────────────
   Leaderboard
───────────────────────────────────────── */
async function onGameOver(score) {
  if (score === 0) return;

  /* Show loading state */
  updateUI(null, score);

  try {
    const snap    = await getDocs(query(collection(db, 'leaderboard'), orderBy('score', 'desc'), limit(10)));
    const entries = [];
    snap.forEach(d => entries.push({ id: d.id, ...d.data() }));

    const qualifies = entries.length < 10 || score > (entries[9]?.score ?? 0);
    updateUI(entries, score);

    if (qualifies) showNameModal(score);
  } catch (err) {
    console.error('排行榜錯誤', err);
  }
}

function showNameModal(score) {
  const modal = document.getElementById('name-modal');
  document.getElementById('modal-score-val').textContent = String(score).padStart(5, '0');
  document.getElementById('player-name').value = '';
  modal.classList.add('open');

  document.getElementById('name-submit').onclick = async () => {
    const name = document.getElementById('player-name').value.trim();
    if (!name) { modal.classList.remove('open'); return; }
    try {
      await addDoc(collection(db, 'leaderboard'), { name, score, createdAt: serverTimestamp() });
      modal.classList.remove('open');
      loadLeaderboard();
    } catch (err) {
      console.error(err);
    }
  };

  document.getElementById('name-skip').onclick = () => modal.classList.remove('open');

  document.getElementById('player-name').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('name-submit').click();
  }, { once: true });
}

async function loadLeaderboard() {
  try {
    const snap    = await getDocs(query(collection(db, 'leaderboard'), orderBy('score', 'desc'), limit(10)));
    const entries = [];
    snap.forEach(d => entries.push(d.data()));
    updateUI(entries, null);
  } catch (err) {
    console.error(err);
  }
}

function updateUI(entries, currentScore) {
  const list = document.getElementById('lb-list');
  if (!list) return;

  if (!entries) {
    list.innerHTML = '<li class="lb-status">計算中...</li>';
    return;
  }
  if (entries.length === 0) {
    list.innerHTML = '<li class="lb-status">尚無紀錄，成為第一名！</li>';
    return;
  }

  list.innerHTML = entries.map((e, i) => `
    <li class="lb-row${e.score === currentScore && currentScore > 0 ? ' lb-you' : ''}">
      <span class="lb-rank">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</span>
      <span class="lb-name">${e.name}</span>
      <span class="lb-score">${String(e.score).padStart(5, '0')}</span>
    </li>`).join('');
}

/* ── Init ── */
loadLeaderboard();
new AWEGame();
