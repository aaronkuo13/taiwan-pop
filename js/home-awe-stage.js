'use strict';

/* ── a-We Stage Animation (Homepage) ──
 * 30 normal runners + 1 giant, spawned one-by-one with accelerating intervals.
 * Movement ONLY during jump phases (pause on ground between hops).
 * Giant fills stage height and jumps above the stage boundary.
 * After giant exits right, scene resets.
 */
(function () {

  /* ── Runner configs ── */
  /* bottom: px above stage floor | jumpDist: px moved per complete hop */
  var RUNNERS = [
    { size: 36, jumpDist: 80,  bottom: 12 },
    { size: 44, jumpDist: 90,  bottom: 10 },
    { size: 30, jumpDist: 68,  bottom: 11 },
    { size: 50, jumpDist: 98,  bottom: 14 },
    { size: 38, jumpDist: 82,  bottom: 12 },
    { size: 46, jumpDist: 92,  bottom: 13 },
    { size: 32, jumpDist: 72,  bottom: 10 },
    { size: 54, jumpDist: 108, bottom: 15 },
    { size: 40, jumpDist: 84,  bottom: 12 },
    { size: 28, jumpDist: 65,  bottom: 10 },
    { size: 48, jumpDist: 95,  bottom: 13 },
    { size: 34, jumpDist: 74,  bottom: 11 },
    { size: 42, jumpDist: 87,  bottom: 12 },
    { size: 56, jumpDist: 112, bottom: 16 },
    { size: 36, jumpDist: 79,  bottom: 11 },
    { size: 44, jumpDist: 91,  bottom: 13 },
    { size: 30, jumpDist: 67,  bottom: 10 },
    { size: 52, jumpDist: 102, bottom: 15 },
    { size: 38, jumpDist: 81,  bottom: 12 },
    { size: 60, jumpDist: 116, bottom: 16 },
    { size: 32, jumpDist: 71,  bottom: 10 },
    { size: 46, jumpDist: 94,  bottom: 13 },
    { size: 40, jumpDist: 85,  bottom: 12 },
    { size: 28, jumpDist: 63,  bottom: 10 },
    { size: 54, jumpDist: 106, bottom: 15 },
    { size: 36, jumpDist: 78,  bottom: 11 },
    { size: 44, jumpDist: 89,  bottom: 13 },
    { size: 50, jumpDist: 99,  bottom: 14 },
    { size: 34, jumpDist: 75,  bottom: 11 },
    { size: 58, jumpDist: 114, bottom: 16 },
    /* Giant — size set dynamically to stage height in init() */
    { isGiant: true, size: 300, jumpDist: 400, bottom: 0 },
  ];

  /* ── Hop timing (virtual 60fps "frames"; scaled by dt) ── */
  /*   pause: rest on ground | squat: wind-up | up/down: airborne | land: absorb impact */
  var HOP_NORMAL = { pause: 20, squat: 5, up: 13, down: 13, land: 6, height: 58 };
  var HOP_GIANT  = { pause: 20, squat: 5, up: 13, down: 13, land: 6, height: 75 };

  /* ── Spawn interval (frames at 60fps) ── */
  var SPAWN_INTERVAL_START = 100; /* ~1.67s */
  var SPAWN_INTERVAL_MIN   =  25; /* ~0.42s */
  var SPAWN_INTERVAL_STEP  =   3; /* decrease each spawn */

  /* ── Pause before scene restarts after giant exits ── */
  var RESET_PAUSE_MS = 800;

  /* ── State ── */
  var stage, stageW;
  var active        = [];
  var spawnIdx      = 0;
  var spawnTimer    = 0;
  var spawnInterval = SPAWN_INTERVAL_START;
  var rafId         = null;
  var lastTime      = 0;
  var resetting     = false;

  /* ────────────────────────── init ────────────────────────── */
  function init() {
    stage = document.querySelector('.awe-stage');
    if (!stage) return;
    stageW = stage.offsetWidth;

    /* Set giant size to match actual stage height */
    var stageH = stage.offsetHeight;
    RUNNERS[RUNNERS.length - 1].size = stageH;

    spawnRunner();
    rafId = requestAnimationFrame(tick);
  }

  /* ────────────────────────── spawn ────────────────────────── */
  function spawnRunner() {
    if (spawnIdx >= RUNNERS.length || resetting) return;
    var cfg = RUNNERS[spawnIdx++];
    var hop = cfg.isGiant
      ? { pause: HOP_GIANT.pause, squat: HOP_GIANT.squat, up: HOP_GIANT.up,
          down: HOP_GIANT.down, land: HOP_GIANT.land, height: HOP_GIANT.height }
      : { pause: HOP_NORMAL.pause, squat: HOP_NORMAL.squat, up: HOP_NORMAL.up,
          down: HOP_NORMAL.down, land: HOP_NORMAL.land, height: HOP_NORMAL.height };

    /* px moved per frame during airborne phases (up + down) */
    var pfd = cfg.jumpDist / (hop.up + hop.down);

    var img = document.createElement('img');
    img.src = 'images/awe-right.png';
    img.alt = '';
    img.className = 'awe-runner' + (cfg.isGiant ? ' awe-runner--giant' : '');
    img.style.width  = cfg.size + 'px';
    img.style.bottom = cfg.bottom + 'px';
    img.style.left   = -(cfg.size + 20) + 'px';
    stage.insertBefore(img, stage.querySelector('.awe-ground-line'));

    active.push({
      el: img, cfg: cfg, hop: hop, pfd: pfd,
      x:      -(cfg.size + 20),
      phase:  0,   /* 0=pause 1=squat 2=up 3=down 4=land */
      timer:  0,
      hopY:   0,
      scaleY: 1,
    });

    /* Decrease spawn interval for next runner */
    spawnInterval = Math.max(SPAWN_INTERVAL_MIN, spawnInterval - SPAWN_INTERVAL_STEP);
  }

  /* ────────────────────────── tick ────────────────────────── */
  function tick(time) {
    var dt = lastTime ? Math.min((time - lastTime) / 16.667, 3) : 1;
    lastTime = time;

    /* Time-based spawn trigger */
    if (spawnIdx < RUNNERS.length && !resetting) {
      spawnTimer += dt;
      if (spawnTimer >= spawnInterval) {
        spawnTimer = 0;
        spawnRunner();
      }
    }

    var giantExited = false;
    var toRemove    = [];

    for (var i = 0; i < active.length; i++) {
      var r = active[i];
      r.timer += dt;

      switch (r.phase) {

        case 0: /* pause on ground — no X movement */
          r.hopY  = 0;
          r.scaleY = 1;
          if (r.timer >= r.hop.pause) { r.phase = 1; r.timer = 0; }
          break;

        case 1: /* squat / wind-up — no X movement */
          var p1 = Math.min(r.timer / r.hop.squat, 1);
          r.hopY   = 0;
          r.scaleY = 1 - 0.22 * p1; /* squish down */
          if (r.timer >= r.hop.squat) { r.phase = 2; r.timer = 0; }
          break;

        case 2: /* rising — X advances */
          var p2 = Math.min(r.timer / r.hop.up, 1);
          r.hopY   = -r.hop.height * Math.sin(p2 * Math.PI / 2);
          r.scaleY = 1 + 0.14 * Math.sin(p2 * Math.PI); /* stretch mid-air */
          r.x     += r.pfd * dt;
          if (r.timer >= r.hop.up) { r.phase = 3; r.timer = 0; }
          break;

        case 3: /* falling — X advances */
          var p3 = Math.min(r.timer / r.hop.down, 1);
          r.hopY   = -r.hop.height * Math.cos(p3 * Math.PI / 2);
          r.scaleY = 1;
          r.x     += r.pfd * dt;
          if (r.timer >= r.hop.down) { r.phase = 4; r.timer = 0; r.hopY = 0; }
          break;

        case 4: /* land impact — no X movement */
          var p4 = Math.min(r.timer / r.hop.land, 1);
          r.hopY   = 0;
          r.scaleY = 0.78 + 0.22 * p4; /* squish → recover */
          if (r.timer >= r.hop.land) { r.phase = 0; r.timer = 0; r.scaleY = 1; }
          break;
      }

      r.el.style.left      = r.x.toFixed(1) + 'px';
      r.el.style.transform =
        'translateY(' + r.hopY.toFixed(1) + 'px) scaleY(' + r.scaleY.toFixed(3) + ')';

      /* Off right edge? */
      if (r.x > stageW + r.cfg.size + 20) {
        if (r.cfg.isGiant) giantExited = true;
        toRemove.push(i);
      }
    }

    /* Remove exited runners (reverse so splice indices stay valid) */
    for (var j = toRemove.length - 1; j >= 0; j--) {
      active[toRemove[j]].el.remove();
      active.splice(toRemove[j], 1);
    }

    /* Giant exited → reset scene */
    if (giantExited && !resetting) {
      resetting = true;
      cancelAnimationFrame(rafId);
      for (var k = 0; k < active.length; k++) active[k].el.remove();
      active        = [];
      spawnIdx      = 0;
      spawnTimer    = 0;
      spawnInterval = SPAWN_INTERVAL_START;
      lastTime      = 0;
      setTimeout(function () {
        resetting = false;
        spawnRunner();
        rafId = requestAnimationFrame(tick);
      }, RESET_PAUSE_MS);
      return;
    }

    rafId = requestAnimationFrame(tick);
  }

  /* ────────────────────────── boot ────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
