/**
 * video-resume.js
 * Cinematic self-playing scene controller for the Video Resume page.
 * No scroll required — scenes auto-advance on a timer.
 *
 * Controls:
 *   ← / →  or  swipe    Previous / Next scene
 *   Space                Pause / Resume
 *   Click dots           Jump to scene
 */

(function () {
  'use strict';

  // ── Scene definitions ──────────────────────────────────────────────────────
  // selector: CSS selector for the section element
  // duration: how long this scene plays before auto-advancing (ms)
  var SCENES = [
    { selector: '.vr-hero',          duration: 8500  },  // Scene 1: Opener
    { selector: '.vr-what',          duration: 13000 },  // Scene 2: What I Do
    { selector: '.vr-proof-numbers', duration: 10500 },  // Scene 3: By the Numbers
    { selector: '.vr-proof',         duration: 12000 },  // Scene 4: Selected Work
    { selector: '.vr-ai',            duration: 12500 },  // Scene 5: AI & Systems
    { selector: '.vr-throughline',   duration: 9500  },  // Scene 6: Throughline
    { selector: '.vr-cta',           duration: 12000 },  // Scene 7: CTA (then loops)
  ];

  // ── State ──────────────────────────────────────────────────────────────────
  var state = {
    current:   0,
    paused:    false,
    rafId:     null,
    startTime: 0,
    elapsed:   0,   // ms elapsed in current scene when paused
  };

  // ── DOM references (populated in init) ────────────────────────────────────
  var dom = {
    sceneEls:     [],
    progressFill: null,
    dots:         [],
    counter:      null,
    btnPrev:      null,
    btnNext:      null,
    btnPause:     null,
  };

  // ── Initialise ─────────────────────────────────────────────────────────────
  function boot() {
    if (!document.querySelector('.video-resume')) return;

    // Resolve scene elements
    SCENES.forEach(function (scene) {
      scene.el = document.querySelector('.video-resume ' + scene.selector) || null;
    });

    // Cache UI handles
    dom.progressFill = document.querySelector('.vr-progress__fill');
    dom.dots         = Array.from(document.querySelectorAll('.vr-dot'));
    dom.counter      = document.querySelector('.vr-counter');
    dom.btnPrev      = document.querySelector('.vr-ctrl--prev');
    dom.btnNext      = document.querySelector('.vr-ctrl--next');
    dom.btnPause     = document.querySelector('.vr-ctrl--pause');

    bindEvents();
    initMermaid();

    // Small delay so fonts are loaded before first paint
    setTimeout(function () { showScene(0); }, 150);
  }

  // ── Show a scene ───────────────────────────────────────────────────────────
  function showScene(index) {
    var total = SCENES.length;
    if (index < 0)      index = total - 1;
    if (index >= total) index = 0;

    state.current = index;
    state.paused  = false;

    // Deactivate every scene element (resets their child animations too)
    SCENES.forEach(function (s) {
      if (s.el) s.el.classList.remove('vr-scene-active');
    });

    // Activate the target scene
    // Force a reflow between remove & add so CSS animations restart
    var target = SCENES[index];
    if (target.el) {
      void target.el.offsetWidth;           // reflow
      target.el.classList.add('vr-scene-active');
    }

    // Update dot indicators
    dom.dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === index);
    });

    // Update scene counter
    if (dom.counter) {
      dom.counter.textContent = (index + 1) + ' \u2215 ' + total;
    }

    // Reset pause button to "pause" state
    setPauseIcon(false);

    // Trigger count-up animation for the numbers scene
    if (target.selector === '.vr-proof-numbers') {
      // Wait for elements to be past their animation-delay before counting
      setTimeout(runCountUp, 600);
    }

    // Start the progress bar and scene timer
    startTimer(target.duration);
  }

  // ── Scene timer (RAF-based) ────────────────────────────────────────────────
  function startTimer(duration) {
    cancelAnimationFrame(state.rafId);
    state.elapsed   = 0;
    state.startTime = performance.now();

    // Reset progress bar to 0 instantly
    if (dom.progressFill) {
      dom.progressFill.style.transition = 'none';
      dom.progressFill.style.transform  = 'scaleX(0)';
    }

    function tick(now) {
      if (state.paused) return;

      var elapsed  = now - state.startTime;
      var progress = Math.min(elapsed / duration, 1);

      // Drive the progress fill directly (no CSS transition lag)
      if (dom.progressFill) {
        dom.progressFill.style.transform = 'scaleX(' + progress + ')';
      }

      if (elapsed >= duration) {
        // Auto-advance (loop back from last scene)
        showScene((state.current + 1) % SCENES.length);
        return;
      }

      state.rafId = requestAnimationFrame(tick);
    }

    state.rafId = requestAnimationFrame(tick);
  }

  // ── Pause / Resume ─────────────────────────────────────────────────────────
  function togglePause() {
    if (state.paused) {
      // Resume
      state.paused    = false;
      // Recalculate startTime so elapsed time is correct on resume
      state.startTime = performance.now() - state.elapsed;
      setPauseIcon(false);

      var duration = SCENES[state.current].duration;

      // Restart RAF from current progress
      function tick(now) {
        if (state.paused) return;

        state.elapsed    = now - state.startTime;
        var progress     = Math.min(state.elapsed / duration, 1);

        if (dom.progressFill) {
          dom.progressFill.style.transform = 'scaleX(' + progress + ')';
        }

        if (state.elapsed >= duration) {
          showScene((state.current + 1) % SCENES.length);
          return;
        }

        state.rafId = requestAnimationFrame(tick);
      }

      state.rafId = requestAnimationFrame(tick);

    } else {
      // Pause — save elapsed so we can resume from same position
      state.elapsed = performance.now() - state.startTime;
      state.paused  = true;
      cancelAnimationFrame(state.rafId);
      setPauseIcon(true);
    }
  }

  function setPauseIcon(isPaused) {
    if (!dom.btnPause) return;
    if (isPaused) {
      dom.btnPause.innerHTML = '&#9654;';     // ▶ play
      dom.btnPause.setAttribute('aria-label', 'Play');
    } else {
      dom.btnPause.innerHTML = '&#9646;&#9646;'; // ⏸ pause
      dom.btnPause.setAttribute('aria-label', 'Pause');
    }
  }

  // ── Count-up animation for stats ──────────────────────────────────────────
  function runCountUp() {
    var els = document.querySelectorAll('.vr-proof-numbers .vr-stat__number[data-count]');
    els.forEach(function (el) {
      var target   = parseInt(el.getAttribute('data-count'), 10);
      var suffix   = el.getAttribute('data-suffix') || '';
      var start    = performance.now();
      var countDur = 1800; // ms

      // Stagger each counter slightly based on its position
      var stagger = Array.prototype.indexOf.call(el.parentElement.parentElement.children, el.parentElement) * 200;

      setTimeout(function () {
        function update(now) {
          var elapsed  = now - start;
          var pct      = Math.min(elapsed / countDur, 1);
          // Ease-out cubic
          var ease     = 1 - Math.pow(1 - pct, 3);
          var current  = Math.round(ease * target);

          el.textContent = current >= 1000
            ? current.toLocaleString() + suffix
            : current + suffix;

          if (pct < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target >= 1000
              ? target.toLocaleString() + suffix
              : target + suffix;
          }
        }
        start = performance.now();
        requestAnimationFrame(update);
      }, stagger);
    });
  }

  // ── Event bindings ─────────────────────────────────────────────────────────
  function bindEvents() {
    if (dom.btnPrev) {
      dom.btnPrev.addEventListener('click', function () {
        showScene(state.current - 1);
      });
    }

    if (dom.btnNext) {
      dom.btnNext.addEventListener('click', function () {
        showScene(state.current + 1);
      });
    }

    if (dom.btnPause) {
      dom.btnPause.addEventListener('click', togglePause);
    }

    dom.dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        showScene(i);
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      if (!document.querySelector('.video-resume')) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          showScene(state.current + 1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          showScene(state.current - 1);
          break;
        case ' ':
          e.preventDefault();
          togglePause();
          break;
      }
    });

    // Touch swipe (left/right)
    var touchStartX = 0;
    var touchStartY = 0;

    document.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      var dy = e.changedTouches[0].clientY - touchStartY;
      // Only register horizontal swipes (more horizontal than vertical)
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 48) {
        if (dx < 0) showScene(state.current + 1);
        else         showScene(state.current - 1);
      }
    }, { passive: true });
  }

  // ── Mermaid initialisation ─────────────────────────────────────────────────
  function initMermaid() {
    if (typeof mermaid === 'undefined') return;

    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        primaryColor:        '#0a1724',
        primaryTextColor:    '#f5f2e9',
        primaryBorderColor:  '#cd9023',
        lineColor:           '#cd9023',
        secondaryColor:      '#11273c',
        tertiaryColor:       '#f2e9d8',
        edgeLabelBackground: '#f2e9d8',
        fontSize:            '14px'
      },
      flowchart: {
        curve: 'basis',
        useMaxWidth: true
      },
      securityLevel: 'loose'
    });
  }

  // ── Boot ───────────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}());
