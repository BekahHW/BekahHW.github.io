/**
 * video-resume.js — Player Mode
 *
 * Cinematic, timer-driven scene sequencer.
 * No scrolling. CSS animations + JS timers.
 *
 * Controls:
 *   Space / K       → play / pause
 *   → / L           → next scene
 *   ← / J           → previous scene
 *   R               → restart
 */

(function () {
  'use strict';

  // ─── Scene manifest ─────────────────────────────────────────────────────────
  // duration: ms this scene plays before advancing (null = stays until user acts)
  var SCENES = [
    { id: 'vr-hero',   label: 'Hook',          duration: 6500  },
    { id: 'vr-what',   label: 'What I Do',     duration: 10500 },
    { id: 'vr-proof',  label: 'Proof of Work', duration: 11000 },
    { id: 'vr-ai',     label: 'AI & Systems',  duration: 10000 },
    { id: 'vr-thru',   label: 'Throughline',   duration: 7500  },
    { id: 'vr-cta',    label: 'Work With Me',  duration: null  }
  ];

  // ─── State ───────────────────────────────────────────────────────────────────
  var state = {
    current:        0,
    isPlaying:      true,
    sceneStartedAt: 0,   // Date.now() when scene became active
    pausedAt:       0,   // Date.now() when paused (0 = not paused)
    sceneTimer:     null,
    mermaidDone:    false,
    countUpDone:    false
  };

  // ─── DOM refs (populated in init) ───────────────────────────────────────────
  var dom = {
    sceneEls:     [],
    progressFill: null,
    playPauseBtn: null,
    iconPause:    null,
    iconPlay:     null,
    restartBtn:   null,
    dotsWrap:     null,
    sceneLabel:   null
  };

  // ════════════════════════════════════════════════════════════════════════════
  //  INIT
  // ════════════════════════════════════════════════════════════════════════════

  function init() {
    if (!document.querySelector('.video-resume')) return;

    dom.sceneEls     = Array.from(document.querySelectorAll('.vr-scene'));
    dom.progressFill = document.getElementById('vr-progress-fill');
    dom.playPauseBtn = document.getElementById('vr-play-pause');
    dom.iconPause    = document.getElementById('vr-icon-pause');
    dom.iconPlay     = document.getElementById('vr-icon-play');
    dom.restartBtn   = document.getElementById('vr-restart');
    dom.dotsWrap     = document.getElementById('vr-scene-dots');
    dom.sceneLabel   = document.getElementById('vr-scene-label');

    if (!dom.sceneEls.length) return;

    setupMermaid();
    buildDots();
    attachControls();

    // Kick off the first scene
    activateScene(0, false);
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  SCENE MANAGEMENT
  // ════════════════════════════════════════════════════════════════════════════

  /**
   * Transition to a scene.
   * @param {number}  index       - target scene index
   * @param {boolean} transition  - true → crossfade; false → instant swap
   */
  function activateScene(index, transition) {
    var prev    = dom.sceneEls[state.current];
    var next    = dom.sceneEls[index];
    var sceneDef = SCENES[index];

    if (!next) return;

    clearTimeout(state.sceneTimer);
    state.sceneTimer = null;

    // ── Transition out the current scene ──────────────────────────────────────
    if (transition && prev && prev !== next) {
      prev.classList.add('is-leaving');
      prev.addEventListener('animationend', function onLeave() {
        prev.removeEventListener('animationend', onLeave);
        prev.classList.remove('is-active', 'is-leaving');
      });
    } else if (prev) {
      prev.classList.remove('is-active', 'is-leaving');
    }

    state.current = index;
    state.sceneStartedAt = Date.now();
    state.pausedAt = 0;

    // ── Force animation restart by reflow ─────────────────────────────────────
    next.classList.remove('is-active', 'is-leaving');
    void next.offsetHeight; // trigger reflow
    next.classList.add('is-active');

    // ── Side-effects per scene ────────────────────────────────────────────────
    if (next.id === 'vr-ai' && !state.mermaidDone) {
      setTimeout(triggerMermaid, 800);
    }

    if (next.id === 'vr-proof' && !state.countUpDone) {
      state.countUpDone = true;
      setTimeout(runCountUp, 1600);
    }

    // ── Update controls ───────────────────────────────────────────────────────
    updateDots(index);
    updateLabel(sceneDef.label);

    // ── Start progress bar + auto-advance timer ───────────────────────────────
    if (state.isPlaying && sceneDef.duration) {
      startProgressBar(sceneDef.duration);
      scheduleAdvance(sceneDef.duration);
    } else if (!sceneDef.duration) {
      // Final scene: fill bar completely and stop
      setProgressFill(100, 0);
    }
  }

  function scheduleAdvance(ms) {
    state.sceneTimer = setTimeout(function () {
      var next = (state.current + 1) % SCENES.length;
      activateScene(next, true);
    }, ms);
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  PROGRESS BAR
  //  Uses CSS transitions for smooth, GPU-accelerated animation.
  //  On pause: captures computed width and freezes.
  //  On resume: continues from where it stopped.
  // ════════════════════════════════════════════════════════════════════════════

  function startProgressBar(duration) {
    var el = dom.progressFill;
    if (!el) return;
    el.style.transition = 'none';
    el.style.width      = '0%';
    void el.offsetHeight;
    el.style.transition = 'width ' + duration + 'ms linear';
    el.style.width      = '100%';
  }

  function pauseProgressBar() {
    var el = dom.progressFill;
    if (!el) return;
    var computed = parseFloat(window.getComputedStyle(el).width)  || 0;
    var parent   = parseFloat(window.getComputedStyle(el.parentElement).width) || 1;
    var pct      = (computed / parent) * 100;
    el.style.transition = 'none';
    el.style.width      = pct.toFixed(3) + '%';
  }

  function resumeProgressBar(totalDuration) {
    var elapsed   = state.pausedAt - state.sceneStartedAt;
    var remaining = Math.max(totalDuration - elapsed, 0);
    var el = dom.progressFill;
    if (!el) return;
    void el.offsetHeight;
    el.style.transition = 'width ' + remaining + 'ms linear';
    el.style.width      = '100%';
  }

  function setProgressFill(pct, transitionMs) {
    var el = dom.progressFill;
    if (!el) return;
    el.style.transition = transitionMs ? 'width ' + transitionMs + 'ms ease' : 'none';
    el.style.width      = pct + '%';
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  PLAY / PAUSE
  // ════════════════════════════════════════════════════════════════════════════

  function pause() {
    if (!state.isPlaying) return;
    state.isPlaying = false;
    state.pausedAt  = Date.now();
    clearTimeout(state.sceneTimer);
    state.sceneTimer = null;

    pauseProgressBar();
    pauseSceneAnimations();
    setPlayPauseUI(false);
  }

  function resume() {
    if (state.isPlaying) return;
    state.isPlaying = true;

    var sceneDef = SCENES[state.current];
    var elapsed  = state.pausedAt - state.sceneStartedAt;

    // Adjust sceneStartedAt so elapsed tracking stays accurate
    state.sceneStartedAt = Date.now() - elapsed;
    state.pausedAt = 0;

    resumeSceneAnimations();
    setPlayPauseUI(true);

    if (sceneDef.duration) {
      var remaining = Math.max(sceneDef.duration - elapsed, 0);
      resumeProgressBar(sceneDef.duration);
      scheduleAdvanceIn(remaining);
    }
  }

  function scheduleAdvanceIn(ms) {
    state.sceneTimer = setTimeout(function () {
      var next = (state.current + 1) % SCENES.length;
      activateScene(next, true);
    }, ms);
  }

  function togglePlayPause() {
    if (state.isPlaying) {
      pause();
    } else {
      resume();
    }
  }

  function restart() {
    state.isPlaying = true;
    state.mermaidDone = false;
    state.countUpDone = false;
    setProgressFill(0, 0);
    setPlayPauseUI(true);
    activateScene(0, false);
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  ANIMATION PAUSE / RESUME
  //  Pauses CSS keyframe animations on all .va elements in the active scene.
  // ════════════════════════════════════════════════════════════════════════════

  function pauseSceneAnimations() {
    var sceneEl = dom.sceneEls[state.current];
    if (!sceneEl) return;
    sceneEl.querySelectorAll('.va, .va-left, .va-scale').forEach(function (el) {
      el.style.animationPlayState = 'paused';
    });
  }

  function resumeSceneAnimations() {
    var sceneEl = dom.sceneEls[state.current];
    if (!sceneEl) return;
    sceneEl.querySelectorAll('.va, .va-left, .va-scale').forEach(function (el) {
      el.style.animationPlayState = 'running';
    });
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  CONTROLS UI
  // ════════════════════════════════════════════════════════════════════════════

  function buildDots() {
    if (!dom.dotsWrap) return;
    SCENES.forEach(function (scene, i) {
      var btn = document.createElement('button');
      btn.className   = 'vr-dot' + (i === 0 ? ' is-active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', 'Jump to: ' + scene.label);
      btn.setAttribute('title', scene.label);
      btn.dataset.index = i;
      btn.addEventListener('click', function () {
        state.isPlaying  = true;
        state.countUpDone = i > 2 ? state.countUpDone : false; // reset if going before proof
        setPlayPauseUI(true);
        activateScene(i, state.current !== i);
      });
      dom.dotsWrap.appendChild(btn);
    });
  }

  function updateDots(index) {
    if (!dom.dotsWrap) return;
    dom.dotsWrap.querySelectorAll('.vr-dot').forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === index);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
  }

  function updateLabel(label) {
    if (dom.sceneLabel) dom.sceneLabel.textContent = label;
  }

  function setPlayPauseUI(playing) {
    if (!dom.iconPause || !dom.iconPlay || !dom.playPauseBtn) return;
    dom.iconPause.style.display = playing ? '' : 'none';
    dom.iconPlay.style.display  = playing ? 'none' : '';
    dom.playPauseBtn.setAttribute(
      'aria-label',
      playing ? 'Pause playback' : 'Resume playback'
    );
    dom.playPauseBtn.setAttribute(
      'title',
      playing ? 'Pause (Space)' : 'Play (Space)'
    );
  }

  function attachControls() {
    if (dom.playPauseBtn) dom.playPauseBtn.addEventListener('click', togglePlayPause);
    if (dom.restartBtn)   dom.restartBtn.addEventListener('click', restart);

    document.addEventListener('keydown', function (e) {
      // Ignore when focus is inside a link/button in the CTA scene
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;

      switch (e.key) {
        case ' ':
        case 'k':
        case 'K':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowRight':
        case 'l':
        case 'L':
          e.preventDefault();
          activateScene((state.current + 1) % SCENES.length, true);
          break;
        case 'ArrowLeft':
        case 'j':
        case 'J':
          e.preventDefault();
          activateScene(
            (state.current - 1 + SCENES.length) % SCENES.length,
            true
          );
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          restart();
          break;
      }
    });
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  COUNT-UP NUMBERS
  // ════════════════════════════════════════════════════════════════════════════

  function runCountUp() {
    var els = document.querySelectorAll('[data-count-target]');
    els.forEach(function (el) {
      var target   = parseFloat(el.dataset.countTarget) || 0;
      var suffix   = el.dataset.countSuffix  || '';
      var prefix   = el.dataset.countPrefix  || '';
      var duration = 1600;
      var start    = Date.now();

      function tick() {
        var elapsed  = Date.now() - start;
        var progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        var eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = prefix + Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }

      tick();
    });
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  MERMAID
  // ════════════════════════════════════════════════════════════════════════════

  function setupMermaid() {
    if (typeof mermaid === 'undefined') return;
    mermaid.initialize({
      startOnLoad:   false,
      theme:         'base',
      themeVariables: {
        primaryColor:       '#0a1724',
        primaryTextColor:   '#f5f2e9',
        primaryBorderColor: '#cd9023',
        lineColor:          '#cd9023',
        secondaryColor:     '#11273c',
        tertiaryColor:      '#f2e9d8',
        fontSize:           '14px'
      },
      flowchart: { curve: 'basis', useMaxWidth: true },
      securityLevel: 'loose'
    });
  }

  function triggerMermaid() {
    if (typeof mermaid === 'undefined' || state.mermaidDone) return;
    state.mermaidDone = true;
    try {
      mermaid.run();
    } catch (e) {
      // mermaid.run may not exist in older builds — fall back gracefully
    }
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  BOOT
  // ════════════════════════════════════════════════════════════════════════════

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
