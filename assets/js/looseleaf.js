(function () {
  "use strict";

  var menuBtn = document.getElementById("menuBtn");
  var navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".site-nav") && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
      }
    });
  }

  var headline = document.getElementById("headline");
  var subline = document.getElementById("subline");
  var redraft = document.getElementById("redraft");

  if (headline && subline && redraft) {
    var drafts = [
      {
        h: 'I spent ten years teaching college English. Now I teach developers, search engines, and AI systems <span class="pen">to understand each other.</span>',
        s: "Writing about developer experience, AI tooling, and the communities that make tech worth working in."
      },
      {
        h: 'Clarity is <span class="pen">a developer tool.</span>',
        s: "I write about AI, developer experience, and community. Former English professor, current AI platform DX lead, permanent explainer of things."
      },
      {
        h: "Most AI content assumes you already get it. <span class=\"pen\">Mine doesn't.</span>",
        s: "Plain-language writing on AI tooling, agents, and developer experience, from someone who taught writing for a decade before she taught machines."
      }
    ];
    var i = 0;

    redraft.addEventListener("click", function () {
      i = (i + 1) % drafts.length;
      headline.innerHTML = drafts[i].h;
      subline.textContent = drafts[i].s;
    });
  }

  var ticks = document.querySelectorAll(".ai-foundations .tick");
  var progress = document.getElementById("aiFoundationsProgress");
  var storageKey = "ai-foundations-progress";

  if (ticks.length && progress) {
    var total = ticks.length;
    var lines = {
      0: "Check off readings as you go.",
      half: "Halfway there. Keep going.",
      almost: "One left. Finish strong.",
      done: "All six. A+ work. See you at office hours."
    };

    function updateProgressLine(done) {
      if (done === 0) {
        progress.textContent = lines[0];
      } else if (done === total) {
        progress.textContent = lines.done;
      } else if (done === total - 1) {
        progress.textContent = lines.almost;
      } else if (done >= total / 2) {
        progress.textContent = lines.half;
      } else {
        progress.textContent = done + " of " + total + " readings complete.";
      }
    }

    function saveProgress() {
      var completed = [];
      ticks.forEach(function (tick) {
        if (tick.checked) {
          completed.push(tick.dataset.slug);
        }
      });
      try {
        localStorage.setItem(storageKey, JSON.stringify(completed));
      } catch (e) {}
    }

    function restoreProgress() {
      var completed = [];
      try {
        completed = JSON.parse(localStorage.getItem(storageKey) || "[]");
      } catch (e) {
        completed = [];
      }

      ticks.forEach(function (tick) {
        var slug = tick.dataset.slug;
        if (completed.indexOf(slug) !== -1) {
          tick.checked = true;
          tick.closest(".reading").classList.add("is-done");
        }
      });

      updateProgressLine(completed.length);
    }

    ticks.forEach(function (tick) {
      tick.addEventListener("change", function () {
        tick.closest(".reading").classList.toggle("is-done", tick.checked);
        var done = Array.prototype.filter.call(ticks, function (t) {
          return t.checked;
        }).length;
        updateProgressLine(done);
        saveProgress();
      });
    });

    restoreProgress();
  }
})();
