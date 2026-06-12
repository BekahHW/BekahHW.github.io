(function () {
  "use strict";

  var catalog = document.getElementById("tags-catalog");
  if (!catalog) return;

  var tabs = Array.prototype.slice.call(catalog.querySelectorAll(".catalog-tab"));
  var panels = Array.prototype.slice.call(catalog.querySelectorAll(".catalog-panel"));
  var sortToggle = document.getElementById("catalog-sort-toggle");
  var catalogList = document.getElementById("catalog-list");
  var graphLoaded = false;
  var graphLoading = false;

  var viewToHash = {
    "by-topic": "by-topic",
    "by-date": "by-date",
    map: "map"
  };

  function parseHash() {
    var raw = (window.location.hash || "").replace(/^#/, "");
    if (!raw || raw === "by-topic") return { view: "by-topic", mapTopic: null };
    if (raw === "by-date") return { view: "by-date", mapTopic: null };
    if (raw === "map") return { view: "map", mapTopic: null };
    if (raw.indexOf("map=") === 0) return { view: "map", mapTopic: decodeURIComponent(raw.slice(4)) };
    return { view: "by-topic", mapTopic: null };
  }

  function setHash(view, mapTopic) {
    var next = view === "by-topic" ? "#by-topic" : view === "by-date" ? "#by-date" : mapTopic ? "#map=" + encodeURIComponent(mapTopic) : "#map";
    if (window.location.hash !== next) {
      history.pushState({ catalogView: view, mapTopic: mapTopic || null }, "", next);
    }
  }

  function activateView(view, mapTopic, fromHash) {
    tabs.forEach(function (tab) {
      var active = tab.getAttribute("data-view") === view;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    panels.forEach(function (panel) {
      var active = panel.getAttribute("data-panel") === view;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });

    if (view === "map") {
      loadGraph(mapTopic);
    }

    if (!fromHash) {
      setHash(view, mapTopic);
    }
  }

  function loadGraph(mapTopic) {
    if (graphLoaded) {
      if (mapTopic && window.TopicGraph && window.TopicGraph.selectTopic) {
        window.TopicGraph.selectTopic(mapTopic);
      }
      return;
    }
    if (graphLoading) return;
    graphLoading = true;

    var script = document.createElement("script");
    var cssLink = document.querySelector('link[href*="/assets/css/style.css"]');
    script.src = cssLink ?
      cssLink.getAttribute("href").replace("/assets/css/style.css", "/assets/js/topic-graph.js") :
      "/assets/js/topic-graph.js";
    script.onload = function () {
      graphLoaded = true;
      graphLoading = false;
      if (window.TopicGraph && window.TopicGraph.init) {
        window.TopicGraph.init({ mapTopic: mapTopic || null });
      }
    };
    script.onerror = function () {
      graphLoading = false;
    };
    document.body.appendChild(script);
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      activateView(tab.getAttribute("data-view"), null, false);
    });

    tab.addEventListener("keydown", function (event) {
      var targetIndex = index;
      if (event.key === "ArrowRight") targetIndex = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") targetIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") targetIndex = 0;
      else if (event.key === "End") targetIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      tabs[targetIndex].focus();
      activateView(tabs[targetIndex].getAttribute("data-view"), null, false);
    });
  });

  window.addEventListener("popstate", function () {
    var parsed = parseHash();
    activateView(parsed.view, parsed.mapTopic, true);
  });

  catalog.querySelectorAll(".catalog-row__trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var row = trigger.closest(".catalog-row");
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      var open = trigger.getAttribute("aria-expanded") !== "true";
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
      row.classList.toggle("is-open", open);
      if (panel) panel.hidden = !open;
    });
  });

  if (sortToggle && catalogList) {
    var rows = Array.prototype.slice.call(catalogList.querySelectorAll(".catalog-row"));
    sortToggle.addEventListener("click", function () {
      var alpha = sortToggle.getAttribute("aria-pressed") !== "true";
      sortToggle.setAttribute("aria-pressed", alpha ? "true" : "false");
      sortToggle.textContent = alpha ? "Sort by count" : "Sort A-Z";
      catalogList.setAttribute("data-sort", alpha ? "alpha" : "count");
      rows.sort(function (a, b) {
        if (alpha) {
          return a.getAttribute("data-tag-name").localeCompare(b.getAttribute("data-tag-name"));
        }
        return Number(b.getAttribute("data-count")) - Number(a.getAttribute("data-count"));
      });
      rows.forEach(function (row) {
        catalogList.appendChild(row);
      });
    });
  }

  var initial = parseHash();
  if (initial.view !== "by-topic" || initial.mapTopic) {
    activateView(initial.view, initial.mapTopic, true);
  }

  window.TagsCatalog = {
    activateView: activateView,
    setMapTopic: function (slug) {
      setHash("map", slug);
    }
  };
})();
