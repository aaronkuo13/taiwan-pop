import { db } from './firebase.js';
import {
  collection, getDocs, addDoc, query, orderBy, limit, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

/* ── Canvas dimensions ── */
const W = 800, H = 480, GROUND_Y = 400, SPEED_INIT = 5, SPEED_MAX = 12;
/* Air time ≈ 2×vy÷gravity = 2×22÷0.68 ≈ 65 frames (used for safe gap calc) */
const JUMP_FRAMES = Math.round(2 * 22 / 0.68);

/* ── Obstacle definitions ── */
/* weight: higher = appears more often (easy=3, medium=2, hard=1) */
// sx,sy,sw,sh = content crop bbox in the source PNG (all images are 893x958)
// w,h = game display size at natural aspect ratio (sw/sh)
// Drawn via 9-param drawImage: content bottom aligns to GROUND_Y automatically
const OBSTACLES = [
  { src: 'images/場景-01-tccny.png',               sx: 271, sy: 303, sw: 351, sh: 351, w: 139, h: 139, weight: 3 },
  { src: 'images/場景-02-empire state bldg.png',   sx: 271, sy: 203, sw: 351, sh: 551, w: 119, h: 187, weight: 1 },
  { src: 'images/場景-03-chrysler.png',             sx: 271, sy: 203, sw: 351, sh: 551, w: 114, h: 179, weight: 1 },
  { src: 'images/場景-04-flatiron bldg.png',       sx: 258, sy: 278, sw: 376, sh: 401, w: 140, h: 149, weight: 2 },
  { src: 'images/場景-05-brooklyn bridge.png',     sx: 269, sy: 241, sw: 353, sh: 476, w: 121, h: 163, weight: 2 },
  { src: 'images/場景-06-statue liberty.png',      sx: 271, sy: 203, sw: 351, sh: 551, w: 109, h: 171, weight: 2 },
  { src: 'images/場景-07-central park.png',        sx: 246, sy: 341, sw: 401, sh: 276, w: 136, h:  94, weight: 3 },
  { src: 'images/場景-08-merkin concert hall.png', sx: 271, sy: 266, sw: 351, sh: 426, w: 132, h: 160, weight: 2 },
  { src: 'images/場景-09-skirball ctr.png',        sx: 271, sy: 303, sw: 351, sh: 351, w: 128, h: 128, weight: 2 },
  { src: 'images/場景-10-metrograph cinema.png',   sx: 271, sy: 303, sw: 351, sh: 351, w: 112, h: 112, weight: 3 },
  { src: 'images/場景-11-bushwick collective.png', sx: 271, sy: 278, sw: 351, sh: 401, w: 140, h: 160, weight: 2 },
  { src: 'images/場景-12-hungdance.png',           sx: 271, sy: 113, sw: 351, sh: 529, w:  98, h: 147, weight: 3 },
  { src: 'images/場景-13-graffiti spray can.png',  sx: 296, sy: 216, sw: 301, sh: 526, w:  89, h: 155, weight: 2 },
  { src: 'images/場景-14.png',                     sx: 271, sy: 203, sw: 351, sh: 551, w:  94, h: 147, weight: 2 },
  { src: 'images/場景-15.png',                     sx: 258, sy: 278, sw: 376, sh: 401, w: 138, h: 147, weight: 2 },
  { src: 'images/場景-16.png',                     sx: 258, sy: 203, sw: 376, sh: 551, w: 101, h: 147, weight: 2 },
  { src: 'images/場景-17.png',                     sx: 271, sy: 228, sw: 351, sh: 501, w: 103, h: 147, weight: 2 },
  { src: 'images/場景-18.png',                     sx: 271, sy: 316, sw: 351, sh: 326, w: 132, h: 122, weight: 2 },
  { src: 'images/場景-19.png',                     sx: 271, sy: 253, sw: 351, sh: 451, w: 114, h: 147, weight: 2 },
  { src: 'images/場景-20.png',                     sx: 271, sy: 291, sw: 351, sh: 376, w: 138, h: 147, weight: 2 },
];

/* Build weighted pool once */
const OBS_POOL = [];
OBSTACLES.forEach((o, i) => { for (let k = 0; k < o.weight; k++) OBS_POOL.push(i); });

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
    this.p = { x: 80, y: GROUND_Y, vy: 0, w: 86, h: 125, onGround: true };

    /* Speed */
    this.speed      = SPEED_INIT;
    this.speedFlash = null;   // { t }

    /* Film grain: 3 pre-generated frames, cycle every 100ms */
    this.grainFrames = Array.from({ length: 3 }, () => this._makeGrain());

    /* Obstacles */
    this.obs         = [];
    this.distToNext  = 500;
    this.recentObs   = []; /* last 4 indices, for no-repeat */

    /* Popup */
    this.popup = null;

    /* Ground scroll offset */
    this.gx = 0;

    /* Sprites */
    this.imgWalkR = this._loadImg('images/awe_v10_pink-walk_right.png');
    this.imgWalkL = this._loadImg('images/awe_v10_pink-walk_left.png');
    this.imgJumps = [26, 27, 28, 29, 30].map(n => this._loadImg(`images/awe_v10_pink-${n}.png`));

    /* Obstacle images */
    this.obsImgs = OBSTACLES.map(o => this._loadImg(o.src));

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
      this.p.vy       = -22;
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
    this.recentObs  = [];
    this.popup      = null;
    this.gx         = 0;
    this.speed      = SPEED_INIT;
    this.speedFlash = null;
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

    /* Speed acceleration */
    const prevSpeedInt = Math.floor(this.speed);
    this.speed = Math.min(SPEED_MAX, SPEED_INIT + this.score * 0.006);
    if (Math.floor(this.speed) > prevSpeedInt) {
      this.speedFlash = { t: 70 };
    }
    if (this.speedFlash) {
      this.speedFlash.t--;
      if (this.speedFlash.t <= 0) this.speedFlash = null;
    }

    /* Player physics */
    this.p.vy += 0.68;
    this.p.y  += this.p.vy;
    if (this.p.y >= GROUND_Y) {
      this.p.y        = GROUND_Y;
      this.p.vy       = 0;
      this.p.onGround = true;
    }

    /* Ground scroll */
    this.gx = (this.gx - this.speed + W * 2) % W;

    /* Spawn obstacles */
    this.distToNext -= this.speed;
    const last = this.obs[this.obs.length - 1];
    if (this.distToNext <= 0 && (!last || last.x < W - 120)) {
      this._spawn();
      /* Min gap = jump distance + 180px (max building width ~140px + 40px buffer)
         Ensures player always lands clear of the next obstacle at any speed */
      const minGap = Math.max(520, JUMP_FRAMES * this.speed + 180);
      this.distToNext = minGap + Math.random() * 350;
    }

    /* Move obstacles */
    for (let i = this.obs.length - 1; i >= 0; i--) {
      const o = this.obs[i];
      o.x -= this.speed;

      /* Trigger popup when obstacle fully passed */
      if (!o.passed && o.x + o.w < this.p.x) {
        o.passed   = true;
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
    /* Filter pool to exclude recently seen indices */
    const pool = OBS_POOL.filter(i => !this.recentObs.includes(i));
    const src  = pool.length ? pool : OBS_POOL; /* fallback if somehow all excluded */
    const idx  = src[Math.floor(Math.random() * src.length)];

    /* Track recent (keep last 4) */
    this.recentObs.push(idx);
    if (this.recentObs.length > 4) this.recentObs.shift();

    const def = OBSTACLES[idx];
    const ev  = GAME_EVENTS[this.evIdx % GAME_EVENTS.length];
    this.evIdx++;
    this.obs.push({
      x: W + 10, y: GROUND_Y - def.h,
      w: def.w, h: def.h,
      imgIdx: idx, ev, passed: false,
    });
  }

  _hit() {
    const { x, y, w, h } = this.p;
    /* Player: trim 15% horizontal each side, 12% from bottom (transparent feet area) */
    const pHm = Math.floor(w * 0.15);
    const pVm = Math.floor(h * 0.12);

    for (const o of this.obs) {
      /* Building: trim 8% horizontal, 5% top (content crop = no large transparent areas) */
      const oHm = Math.floor(o.w * 0.08);
      const oVm = Math.floor(o.h * 0.05);
      if (
        x + w - pHm > o.x  + oHm &&
        x + pHm     < o.x  + o.w - oHm &&
        y - pVm     > o.y  + oVm
      ) return true;
    }
    return false;
  }

  /* ── draw ── */
  _draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, W, H);

    /* Warm cream background */
    ctx.fillStyle = '#ede8d5';
    ctx.fillRect(0, 0, W, H);

    /* Popup BEHIND obstacles and player */
    if (this.popup) this._drawPopup();

    /* Ground line */
    ctx.strokeStyle = '#00aa00';
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y + 2);
    ctx.lineTo(W, GROUND_Y + 2);
    ctx.stroke();

    /* Ground dashes */
    ctx.fillStyle = 'rgba(0,140,0,0.3)';
    for (let i = 0; i < 26; i++) {
      const dx = (this.gx + i * 32) % W;
      ctx.fillRect(dx, GROUND_Y + 6, 18, 2);
    }

    /* Obstacles */
    this.obs.forEach(o => this._drawBuilding(o));

    /* Player */
    this._drawPlayer();

    /* Score HUD */
    this._drawScore();

    /* Speed-up flash */
    if (this.speedFlash) this._drawSpeedFlash();

    /* Film grain overlay */
    this._drawGrain();

    /* State overlays */
    if (this.state === 'idle') this._drawIdle();
    else if (this.state === 'dead') this._drawDead();
  }

  _drawPlayer() {
    const { x, y, w, h, onGround } = this.p;

    let img;
    let bob = 0;
    if (onGround) {
      /* Walk: alternate every 8 frames */
      img = (Math.floor(this.frame / 8) % 2 === 0) ? this.imgWalkR : this.imgWalkL;
      bob = (this.state === 'running') ? Math.sin(this.frame * 0.35) * 2 : 0;
    } else {
      /* Jump: pick frame by vy — vy goes from -22 (takeoff) to +22 (landing) */
      const vy = this.p.vy;
      let fi;
      if      (vy < -13) fi = 0;  // 26 — takeoff
      else if (vy <  -5) fi = 1;  // 27 — rising
      else if (vy <   3) fi = 2;  // 28 — peak
      else if (vy <  11) fi = 3;  // 29 — falling
      else               fi = 4;  // 30 — about to land
      img = this.imgJumps[fi];
    }

    if (img && img.complete && img.naturalWidth > 0) {
      /* Draw at natural aspect ratio; center horizontally over the hitbox */
      const drawW = Math.round(img.naturalWidth / img.naturalHeight * h);
      const drawX = x - Math.round((drawW - w) / 2);
      this.ctx.drawImage(img, drawX, y - h + bob, drawW, h);
    } else {
      this.ctx.fillStyle = '#00aa00';
      this.ctx.fillRect(x, y - h, w, h);
    }
  }

  _drawBuilding(o) {
    const ctx = this.ctx;
    const { x, y, w, h, imgIdx } = o;
    const img = this.obsImgs[imgIdx];

    if (img && img.complete && img.naturalWidth > 0) {
      /* Crop to content bbox → natural aspect ratio, bottom aligned to GROUND_Y */
      const def = OBSTACLES[imgIdx];
      ctx.drawImage(img, def.sx, def.sy, def.sw, def.sh, x, y, w, h);
    } else {
      /* Fallback: simple outline box while image loads */
      ctx.fillStyle   = '#e8e8e8';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = '#00cc00';
      ctx.lineWidth   = 1.5;
      ctx.strokeRect(x, y, w, h);
    }
  }

  _drawHitboxes() {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;

    // Player hitbox
    const { x, y, w, h } = this.p;
    const pHm = Math.floor(w * 0.15);
    const pVm = Math.floor(h * 0.12);
    ctx.strokeRect(x + pHm, y - h, w - pHm * 2, h - pVm);

    // Building hitboxes
    this.obs.forEach(o => {
      const oHm = Math.floor(o.w * 0.08);
      const oVm = Math.floor(o.h * 0.05);
      ctx.strokeRect(o.x + oHm, o.y + oVm, o.w - oHm * 2, o.h - oVm);
    });

    ctx.restore();
  }

  /* ── Marquee / Theater-style popup ── */
  _drawPopup() {
    const ctx = this.ctx;
    const { ev, opacity } = this.popup;

    /* Dimensions: tall marquee spanning most of the canvas width */
    const pw = 700, ph = 210;
    const px = (W - pw) / 2;   // 50px side margins
    const py = 22;

    ctx.save();
    ctx.globalAlpha = opacity;

    /* ── Outer dark wood frame ── */
    ctx.fillStyle = '#2a1004';
    this._rrect(px, py, pw, ph, 14);
    ctx.fill();

    /* ── Red-orange neon ring ── */
    const neonInset = 20;
    const nx = px + neonInset, ny = py + neonInset;
    const nw = pw - neonInset * 2, nh = ph - neonInset * 2;
    ctx.strokeStyle = '#cc2200';
    ctx.lineWidth   = 2.5;
    ctx.shadowColor = '#ff4400';
    ctx.shadowBlur  = 12;
    this._rrect(nx, ny, nw, nh, 8);
    ctx.stroke();
    ctx.shadowBlur = 0;

    /* ── Warm cream content area ── */
    const cInset = 26;
    const bx = px + cInset, by = py + cInset;
    const bw = pw - cInset * 2, bh = ph - cInset * 2;
    ctx.fillStyle = '#f7ede0';
    this._rrect(bx, by, bw, bh, 5);
    ctx.fill();

    /* ── Lightbulbs (alternate on/off every 280ms) ── */
    const flip   = Math.floor(Date.now() / 280) % 2;
    const bR     = 7;
    const bOff   = 12;   // offset from outer frame edge to bulb center
    const bSpace = 30;
    const topY   = py + bOff;
    const botY   = py + ph - bOff;
    const lefX   = px + bOff;
    const rigX   = px + pw - bOff;

    let bulbIdx = 0;
    const drawBulb = (bx2, by2) => {
      const on = (bulbIdx++ + flip) % 2 === 0;
      ctx.save();
      ctx.shadowColor = on ? '#ffcc00' : 'transparent';
      ctx.shadowBlur  = on ? 14 : 0;
      ctx.fillStyle   = on ? '#ffe94a' : '#5a3208';
      ctx.beginPath();
      ctx.arc(bx2, by2, bR, 0, Math.PI * 2);
      ctx.fill();
      /* Filament dot */
      ctx.shadowBlur  = 0;
      ctx.fillStyle   = on ? 'rgba(0,0,0,0.28)' : 'rgba(0,0,0,0.18)';
      ctx.beginPath();
      ctx.arc(bx2, by2, bR * 0.32, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    /* Top & bottom rows */
    for (let x = lefX; x <= rigX + 1; x += bSpace) {
      drawBulb(x, topY);
      drawBulb(x, botY);
    }
    /* Left & right columns (skip corners already covered by row) */
    for (let y = topY + bSpace; y < botY; y += bSpace) {
      drawBulb(lefX, y);
      drawBulb(rigX, y);
    }

    /* ── Text content ── */
    const tcx  = px + pw / 2;
    const midY = py + ph / 2;

    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur   = 0;

    /* Event name */
    ctx.font      = 'bold 26px Montserrat, "Noto Sans TC", sans-serif';
    ctx.fillStyle = '#1a0800';
    ctx.fillText(ev.name, tcx, midY - 32);

    /* Thin divider */
    ctx.strokeStyle = 'rgba(120,60,20,0.25)';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(px + cInset + 40, midY - 8);
    ctx.lineTo(px + pw - cInset - 40, midY - 8);
    ctx.stroke();

    /* Location & date */
    ctx.font      = '17px Montserrat, "Noto Sans TC", sans-serif';
    ctx.fillStyle = '#5a3010';
    ctx.fillText(`📍 ${ev.location}`, tcx, midY + 16);
    ctx.fillText(`🗓  ${ev.date}`,     tcx, midY + 44);

    ctx.restore();
  }

  /* ── Speed-up flash ── */
  _drawSpeedFlash() {
    const alpha = this.speedFlash.t / 70;
    const ctx   = this.ctx;
    ctx.save();
    ctx.globalAlpha  = alpha;
    ctx.shadowColor  = '#ff6600';
    ctx.shadowBlur   = 12;
    ctx.fillStyle    = '#ff6600';
    ctx.font         = 'bold 18px Montserrat, sans-serif';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('SPEED UP!', W / 2, 85);
    ctx.restore();
  }

  /* ── Pre-generate one grain canvas (random per-pixel noise) ── */
  _makeGrain() {
    const gc   = document.createElement('canvas');
    gc.width   = W;
    gc.height  = H;
    const gctx = gc.getContext('2d');
    const id   = gctx.createImageData(W, H);
    const d    = id.data;
    for (let i = 0; i < d.length; i += 4) {
      const v    = Math.random() * 220 | 0;
      d[i]       = d[i + 1] = d[i + 2] = v;
      d[i + 3]   = Math.random() * 32 | 0;   // max ~12% alpha, very subtle
    }
    gctx.putImageData(id, 0, 0);
    return gc;
  }

  /* ── Draw animated grain (cycle 3 frames every 100ms) ── */
  _drawGrain() {
    const idx = Math.floor(Date.now() / 100) % 3;
    this.ctx.drawImage(this.grainFrames[idx], 0, 0);
  }

  _drawScore() {
    const ctx = this.ctx;
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign    = 'right';
    ctx.font         = 'bold 14px Montserrat, monospace';
    ctx.fillStyle    = 'rgba(0,160,0,0.4)';
    ctx.fillText(`HI ${String(this.hiScore).padStart(5,'0')}`, W - 12, 24);
    ctx.fillStyle = '#009900';
    ctx.fillText(String(this.score).padStart(5,'0'), W - 12, 44);

    /* Speed indicator */
    const spd = this.speed.toFixed(1);
    ctx.textAlign = 'left';
    ctx.font      = '11px Montserrat, monospace';
    ctx.fillStyle = 'rgba(0,140,0,0.45)';
    ctx.fillText(`SPD ${spd}`, 12, 24);
  }

  _drawIdle() {
    const ctx = this.ctx;
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle    = '#009900';
    ctx.font         = 'bold 17px Montserrat, "Noto Sans TC", sans-serif';
    ctx.textAlign    = 'center';
    ctx.fillText('按空白鍵 或 點擊畫面開始', W/2, H/2 - 8);
    ctx.fillStyle = 'rgba(0,100,0,0.5)';
    ctx.font      = '11px Montserrat, sans-serif';
    ctx.fillText('PRESS SPACE / TAP TO START', W/2, H/2 + 13);
  }

  _drawDead() {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillRect(0, 0, W, H);
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle    = '#111';
    ctx.font         = 'bold 26px Montserrat, sans-serif';
    ctx.textAlign    = 'center';
    ctx.fillText('GAME OVER', W/2, H/2 - 12);
    ctx.fillStyle = '#009900';
    ctx.font      = '13px Montserrat, "Noto Sans TC", sans-serif';
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
