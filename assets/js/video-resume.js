/**
 * video-resume.js
 * Cinematic scroll-driven animations for the Video Resume page.
 * Uses IntersectionObserver (no frameworks).
 */

(function () {
  'use strict';

  // ─── IntersectionObserver: fade-in animated elements ───────────────────────
  function initFadeAnimations() {
    var elements = document.querySelectorAll('.video-resume .vr-animate');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: make all elements visible immediately
      elements.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ─── Smooth scroll for hero anchor ─────────────────────────────────────────
  function initSmoothScroll() {
    var scrollBtn = document.querySelector('.video-resume .vr-hero__scroll');
    if (!scrollBtn) return;

    scrollBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector('#what-i-do');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // ─── Mermaid initialisation ─────────────────────────────────────────────────
  function initMermaid() {
    if (typeof mermaid === 'undefined') return;

    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        primaryColor:      '#0a1724',
        primaryTextColor:  '#f5f2e9',
        primaryBorderColor:'#cd9023',
        lineColor:         '#cd9023',
        secondaryColor:    '#11273c',
        tertiaryColor:     '#f2e9d8',
        edgeLabelBackground: '#f2e9d8',
        fontSize:          '16px'
      },
      flowchart: {
        curve: 'basis',
        useMaxWidth: true
      },
      securityLevel: 'loose'
    });
  }

  // ─── Boot ───────────────────────────────────────────────────────────────────
  function boot() {
    // Only run on video-resume pages
    if (!document.querySelector('.video-resume')) return;

    initFadeAnimations();
    initSmoothScroll();
    initMermaid();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}());
