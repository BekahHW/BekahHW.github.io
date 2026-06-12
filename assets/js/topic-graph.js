(function () {
  "use strict";

  var state = {
    data: null,
    nodes: [],
    edges: [],
    nodeById: {},
    selectedId: null,
    mobile: window.matchMedia("(max-width: 699px)").matches,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    transform: { x: 0, y: 0, k: 1 },
    defaultTransform: { x: 0, y: 0, k: 1 }
  };

  var svg;
  var rootG;
  var edgesG;
  var nodesG;
  var labelsG;
  var panel;
  var panelTitle;
  var panelPosts;
  var panelChips;
  var panelMore;
  var panelClose;
  var workspace;
  var tooltip;
  var resetBtn;

  function assetUrl(path) {
    var link = document.querySelector('link[href*="/assets/css/style.css"]');
    if (!link) return path;
    return link.getAttribute("href").replace("/assets/css/style.css", path);
  }

  function roughenLine(x1, y1, x2, y2, segments, amplitude) {
    var points = [[x1, y1]];
    for (var i = 1; i < segments; i += 1) {
      var t = i / segments;
      var x = x1 + (x2 - x1) * t + (Math.random() - 0.5) * amplitude;
      var y = y1 + (y2 - y1) * t + (Math.random() - 0.5) * amplitude;
      points.push([x, y]);
    }
    points.push([x2, y2]);
    return "M" + points.map(function (p) { return p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" L");
  }

  function roughenCircle(cx, cy, r) {
    var steps = 18;
    var parts = [];
    for (var i = 0; i <= steps; i += 1) {
      var angle = (Math.PI * 2 * i) / steps;
      var jitter = (Math.random() - 0.5) * 1.6;
      var x = cx + (r + jitter) * Math.cos(angle);
      var y = cy + (r + jitter) * Math.sin(angle);
      parts.push((i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1));
    }
    return parts.join(" ") + " Z";
  }

  function edgeWidth(weight) {
    return Math.min(4, 1 + weight * 0.45);
  }

  function nodePos(node) {
    return {
      x: state.mobile ? node.xMobile : node.x,
      y: state.mobile ? node.yMobile : node.y
    };
  }

  function neighbors(id) {
    var set = {};
    state.edges.forEach(function (edge) {
      if (edge.source === id) set[edge.target] = true;
      if (edge.target === id) set[edge.source] = true;
    });
    return Object.keys(set);
  }

  function normalizePost(post) {
    return {
      title: post.t || post.title,
      url: post.u || post.url,
      date: post.d || post.date
    };
  }

  function postsForTopic(id) {
    var list = (state.data.postsByTopic && state.data.postsByTopic[id]) || [];
    return list.map(normalizePost).sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });
  }

  function postsForPair(a, b) {
    var left = postsForTopic(a);
    var right = postsForTopic(b);
    var urls = {};
    right.forEach(function (p) { urls[p.url] = p; });
    return left.filter(function (p) { return urls[p.url]; }).sort(function (x, y) {
      return y.date.localeCompare(x.date);
    });
  }

  function formatDate(iso) {
    var parts = iso.split("-");
    if (parts.length !== 3) return iso;
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[Number(parts[1]) - 1] + " " + Number(parts[2]) + ", " + parts[0];
  }

  function renderPosts(posts, topic) {
    panelPosts.innerHTML = "";
    posts.slice(0, 12).forEach(function (post) {
      var article = document.createElement("article");
      article.className = "post-card post-card--compact";
      article.innerHTML = '<p class="code">' + formatDate(post.date) + '</p><h2><a href="' + post.url + '">' + post.title + '</a></h2>';
      panelPosts.appendChild(article);
    });

    if (topic && topic.count > posts.length) {
      panelMore.hidden = false;
      panelMore.innerHTML = '<a href="' + topic.url + '">View all ' + topic.count + ' posts →</a>';
    } else {
      panelMore.hidden = true;
      panelMore.innerHTML = "";
    }
  }

  function renderChips(ids, activeId) {
    panelChips.innerHTML = "";
    ids.forEach(function (id) {
      var node = state.nodeById[id];
      if (!node) return;
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "map-chip";
      chip.textContent = node.label;
      if (id === activeId) chip.setAttribute("aria-current", "true");
      chip.addEventListener("click", function () {
        selectTopic(id, true);
      });
      panelChips.appendChild(chip);
    });
  }

  function openPanel(mode) {
    panel.hidden = false;
    workspace.classList.add("has-panel");
    panel.setAttribute("data-mode", mode);
  }

  function closePanel() {
    panel.hidden = true;
    workspace.classList.remove("has-panel");
    state.selectedId = null;
    clearHighlight();
    if (window.TagsCatalog) {
      history.replaceState(history.state, "", "#map");
    }
  }

  function clearHighlight() {
    nodesG.querySelectorAll(".map-graph-node").forEach(function (el) {
      el.classList.remove("is-selected", "is-dim", "is-highlight");
    });
    edgesG.querySelectorAll(".map-graph-edge, .map-graph-edge-hit").forEach(function (el) {
      el.classList.remove("is-dim", "is-highlight");
    });
  }

  function highlightTopic(id) {
    var related = neighbors(id);
    related.push(id);
    var relatedSet = {};
    related.forEach(function (n) { relatedSet[n] = true; });

    nodesG.querySelectorAll(".map-graph-node").forEach(function (el) {
      var nid = el.getAttribute("data-id");
      el.classList.toggle("is-selected", nid === id);
      el.classList.toggle("is-highlight", !!relatedSet[nid]);
      el.classList.toggle("is-dim", !relatedSet[nid]);
    });

    edgesG.querySelectorAll(".map-graph-edge").forEach(function (el) {
      var s = el.getAttribute("data-source");
      var t = el.getAttribute("data-target");
      var on = (s === id || t === id);
      el.classList.toggle("is-highlight", on);
      el.classList.toggle("is-dim", !on);
    });
  }

  function selectTopic(id, updateHash) {
    var topic = state.nodeById[id];
    if (!topic) return;
    state.selectedId = id;
    highlightTopic(id);
    panelTitle.textContent = topic.label;
    renderChips(neighbors(id), id);
    renderPosts(postsForTopic(id), topic);
    openPanel("topic");
    centerOnNode(topic);
    if (updateHash && window.TagsCatalog) {
      history.replaceState({ catalogView: "map", mapTopic: id }, "", "#map=" + encodeURIComponent(id));
    }
  }

  function selectEdge(source, target) {
    var a = state.nodeById[source];
    var b = state.nodeById[target];
    if (!a || !b) return;
    panelTitle.textContent = a.label + " + " + b.label;
    renderChips([source, target], null);
    renderPosts(postsForPair(source, target), null);
    openPanel("edge");
  }

  function centerOnNode(node) {
    var pos = nodePos(node);
    var wrap = document.getElementById("map-canvas-wrap");
    var rect = wrap.getBoundingClientRect();
    var scale = state.transform.k;
    state.transform.x = rect.width / 2 - pos.x * scale;
    state.transform.y = rect.height / 2 - pos.y * scale;
    applyTransform();
  }

  function applyTransform() {
    rootG.setAttribute("transform", "translate(" + state.transform.x + "," + state.transform.y + ") scale(" + state.transform.k + ")");
  }

  function resetView() {
    state.transform = {
      x: state.defaultTransform.x,
      y: state.defaultTransform.y,
      k: state.defaultTransform.k
    };
    applyTransform();
  }

  function bindPanZoom() {
    var dragging = false;
    var last = null;

    svg.addEventListener("pointerdown", function (event) {
      if (event.target.closest(".map-graph-node")) return;
      dragging = true;
      last = { x: event.clientX, y: event.clientY };
      svg.classList.add("is-dragging");
      svg.setPointerCapture(event.pointerId);
    });

    svg.addEventListener("pointermove", function (event) {
      if (!dragging || !last) return;
      state.transform.x += event.clientX - last.x;
      state.transform.y += event.clientY - last.y;
      last = { x: event.clientX, y: event.clientY };
      applyTransform();
    });

    function endDrag(event) {
      if (!dragging) return;
      dragging = false;
      last = null;
      svg.classList.remove("is-dragging");
      try { svg.releasePointerCapture(event.pointerId); } catch (e) {}
    }

    svg.addEventListener("pointerup", endDrag);
    svg.addEventListener("pointercancel", endDrag);

    svg.addEventListener("wheel", function (event) {
      event.preventDefault();
      var delta = event.deltaY < 0 ? 1.08 : 0.92;
      var next = Math.min(2.5, Math.max(0.6, state.transform.k * delta));
      var rect = svg.getBoundingClientRect();
      var px = event.clientX - rect.left;
      var py = event.clientY - rect.top;
      state.transform.x = px - ((px - state.transform.x) * next) / state.transform.k;
      state.transform.y = py - ((py - state.transform.y) * next) / state.transform.k;
      state.transform.k = next;
      applyTransform();
    }, { passive: false });
  }

  function showTooltip(text, x, y) {
    tooltip.textContent = text;
    tooltip.hidden = false;
    tooltip.style.left = x + 12 + "px";
    tooltip.style.top = y + 12 + "px";
  }

  function hideTooltip() {
    tooltip.hidden = true;
  }

  function renderGraph() {
    svg.innerHTML = "";
    rootG = svgEl("g", { class: "map-root" });
    edgesG = svgEl("g", { class: "map-edges" });
    nodesG = svgEl("g", { class: "map-nodes" });
    labelsG = svgEl("g", { class: "map-labels" });
    svg.appendChild(rootG);
    rootG.appendChild(edgesG);
    rootG.appendChild(nodesG);
    rootG.appendChild(labelsG);

    state.edges.forEach(function (edge) {
      var a = state.nodeById[edge.source];
      var b = state.nodeById[edge.target];
      if (!a || !b) return;
      var pa = nodePos(a);
      var pb = nodePos(b);
      var path = roughenLine(pa.x, pa.y, pb.x, pb.y, 6, 2.2);
      var visible = svgEl("path", {
        d: path,
        class: "map-graph-edge",
        "data-source": edge.source,
        "data-target": edge.target,
        "stroke-width": edgeWidth(edge.weight)
      });
      var hit = svgEl("path", {
        d: path,
        class: "map-graph-edge-hit",
        "data-source": edge.source,
        "data-target": edge.target
      });
      hit.addEventListener("click", function () {
        selectEdge(edge.source, edge.target);
      });
      edgesG.appendChild(visible);
      edgesG.appendChild(hit);
    });

    state.nodes.forEach(function (node) {
      var pos = nodePos(node);
      var group = svgEl("g", { class: "map-graph-node", "data-id": node.id, tabindex: "0", role: "button", "aria-label": node.label + ", " + node.count + " posts" });
      var outline = svgEl("path", { d: roughenCircle(pos.x, pos.y, node.r), class: "map-node-shape" });
      group.appendChild(outline);
      var label = svgEl("text", {
        x: pos.x,
        y: pos.y + node.r + 14,
        class: "map-graph-label"
      });
      label.textContent = node.label;
      labelsG.appendChild(label);

      group.addEventListener("mouseenter", function (event) {
        showTooltip(node.label + " · " + node.count + " posts", event.clientX, event.clientY);
      });
      group.addEventListener("mousemove", function (event) {
        showTooltip(node.label + " · " + node.count + " posts", event.clientX, event.clientY);
      });
      group.addEventListener("mouseleave", hideTooltip);
      group.addEventListener("click", function () { selectTopic(node.id, true); });
      group.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectTopic(node.id, true);
        }
      });
      nodesG.appendChild(group);
    });

    resetView();
    bindPanZoom();
  }

  function svgEl(name, attrs) {
    var el = document.createElementNS("http://www.w3.org/2000/svg", name);
    Object.keys(attrs).forEach(function (key) {
      el.setAttribute(key, attrs[key]);
    });
    return el;
  }

  function buildConstellationFallback() {
    var wrap = document.getElementById("constellation-fallback");
    if (!wrap) return;
    wrap.innerHTML = "";
    state.nodes.slice().sort(function (a, b) { return b.count - a.count; }).forEach(function (node) {
      var related = neighbors(node.id).map(function (id) { return state.nodeById[id]; }).filter(Boolean)
        .sort(function (a, b) { return b.count - a.count; }).slice(0, 3);
      var row = document.createElement("div");
      row.className = "constellation-row";
      var chips = related.map(function (r) {
        return '<button type="button" class="map-chip" data-topic="' + r.id + '">' + r.label + '</button>';
      }).join("");
      row.innerHTML = '<h3><a href="' + node.url + '">' + node.label + '</a> <span class="code">' + node.count + ' posts</span></h3><div class="constellation-chips">' + chips + "</div>";
      wrap.appendChild(row);
    });
    wrap.querySelectorAll("[data-topic]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        selectTopic(chip.getAttribute("data-topic"), true);
      });
    });
  }

  function init(options) {
    options = options || {};
    svg = document.getElementById("topic-map-svg");
    panel = document.getElementById("map-side-panel");
    panelTitle = document.getElementById("map-panel-title");
    panelPosts = document.getElementById("map-panel-posts");
    panelChips = document.getElementById("map-panel-chips");
    panelMore = document.getElementById("map-panel-more");
    panelClose = document.getElementById("map-panel-close");
    workspace = document.querySelector(".map-workspace");
    tooltip = document.getElementById("map-tooltip");
    resetBtn = document.getElementById("map-reset");

    if (!svg) return;

    if (state.mobile) {
      svg.setAttribute("viewBox", "0 0 360 420");
    } else {
      svg.setAttribute("viewBox", "0 0 880 520");
    }

    panelClose.addEventListener("click", closePanel);
    resetBtn.addEventListener("click", resetView);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !panel.hidden) closePanel();
    });

    fetch(assetUrl("/assets/data/topic-graph.json"))
      .then(function (res) { return res.json(); })
      .then(function (data) {
        state.data = data;
        state.nodes = data.nodes || [];
        state.edges = data.edges || [];
        state.nodeById = {};
        state.nodes.forEach(function (node) { state.nodeById[node.id] = node; });
        renderGraph();
        buildConstellationFallback();
        if (options.mapTopic) {
          selectTopic(options.mapTopic, false);
        }
      });
  }

  window.TopicGraph = {
    init: init,
    selectTopic: function (id) { selectTopic(id, true); }
  };
})();
