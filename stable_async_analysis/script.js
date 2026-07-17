/* ==========================================================================
   Dive into Staleness Analysis in Async RL — interactions
   --------------------------------------------------------------------------
   Modules (vanilla JS, no dependencies):
     1. Theme toggle (persist via localStorage)
     2. Reading progress bar + TOC scrollspy
     3. Reveal-on-scroll
     4. Copy BibTeX
     5. Interactive training-drift line charts (crosshair + tooltip + legend)
     6. Clip-geometry explorer (trust-region widget for §5.c / §5.d)
     7. Lightbox (click-to-zoom for images and inlined static SVGs)
   ========================================================================== */
(function () {
  "use strict";
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const svgNS = "http://www.w3.org/2000/svg";
  const el = (tag, attrs, parent) => {
    const n = document.createElementNS(svgNS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };
  const fmtP = (x, d = 4) => (+x).toFixed(d);

  /* ============ 1. THEME ============ */
  const root = document.documentElement;
  const forced = new URLSearchParams(location.search).get("theme");
  const saved = forced || localStorage.getItem("satr-theme");
  if (saved === "dark" || (!saved && matchMedia("(prefers-color-scheme: dark)").matches)) {
    root.classList.add("dark");
  } else if (saved === "light") {
    root.classList.remove("dark");
  }
  $("#theme-toggle")?.addEventListener("click", () => {
    root.classList.toggle("dark");
    localStorage.setItem("satr-theme", root.classList.contains("dark") ? "dark" : "light");
  });

  /* ============ 1b. LANGUAGE ============
     Static prose is switched instantly by CSS ([lang] blocks); the page
     reloads so JS-rendered chart/widget labels re-render in the new
     language. Scroll position is preserved across the reload. */
  const ZH = root.getAttribute("data-lang") === "zh";
  const T = (en, zh) => (ZH ? zh : en);
  $("#lang-toggle")?.addEventListener("click", () => {
    try {
      localStorage.setItem("satr-lang", ZH ? "en" : "zh");
      sessionStorage.setItem("satr-scroll", String(window.scrollY));
    } catch (e) {}
    location.reload();
  });
  try {
    const sy = sessionStorage.getItem("satr-scroll");
    if (sy != null) {
      sessionStorage.removeItem("satr-scroll");
      requestAnimationFrame(() => window.scrollTo(0, +sy));
    }
  } catch (e) {}

  /* ============ 2. PROGRESS + SCROLLSPY ============ */
  const bar = $("#progress-bar");
  const tocItems = $$(".toc__item");
  const sections = tocItems
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);

  function onScroll() {
    const h = document.documentElement;
    const scrolled = h.scrollHeight - h.clientHeight;
    const ratio = scrolled > 0 ? h.scrollTop / scrolled : 0;
    if (bar) bar.style.width = (Math.min(1, Math.max(0, ratio)) * 100).toFixed(2) + "%";
    let active = sections[0];
    const probe = h.scrollTop + 140;
    for (const sec of sections) if (sec.offsetTop <= probe) active = sec;
    tocItems.forEach((a) =>
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + (active && active.id))
    );
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ============ 3. REVEAL ============ */
  const revealSel = [
    ".hero__figure", ".tldr", ".note", ".figure", ".specs",
    ".insights", ".ticklist--takeaways", ".symlist", ".callout",
    ".method", ".steps", ".chain", ".cmp-table-wrap",
    ".aside", ".closing", ".exp-placeholder", ".exp-figure"
  ].join(",");
  $$(revealSel).forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  $$(".reveal").forEach((el) => io.observe(el));

  // Debug helper: `?prefetch-in-view=1` forces every reveal-tracked element
  // into its final visible state immediately (used by screenshot tooling).
  if (new URLSearchParams(location.search).get("prefetch-in-view") === "1") {
    $$(".reveal, .exp-figure").forEach((el) => el.classList.add("is-in"));
  }

  /* ============ 4. COPY BIBTEX ============ */
  const cpy = $("#copy-bib");
  cpy?.addEventListener("click", () => {
    const block = $("#bibtex-block");
    if (!block) return;
    navigator.clipboard.writeText(block.textContent.trim()).then(() => {
      const orig = cpy.textContent;
      cpy.textContent = "Copied ✓";
      setTimeout(() => (cpy.textContent = orig), 1400);
    }).catch(() => {});
  });

  /* ============ 5. INTERACTIVE LINE CHARTS ============
     Reads the JSON blob embedded as <script id="chart-data" type="application/json">
     and renders every <figure class="exp-figure" data-chart="line-training"> into
     an interactive SVG: one path per whitelisted series, end-of-curve labels with
     steady-state values, a hover crosshair + tooltip, and a click-to-toggle legend.
  ============================================== */
  const dataNode = document.getElementById("chart-data");
  if (dataNode) {
    let CHART = {};
    try { CHART = JSON.parse(dataNode.textContent); } catch (e) { console.warn("chart-data parse failed", e); }

    // Colour class per (method, algo). Kept in sync with style.css .lc-path--* rules.
    const methodClass = (m, algo) => {
      const k = (m || "").toLowerCase();
      const isGspo = (algo || "").toUpperCase() === "GSPO";
      if (k === "satr")     return "lc-path--satr";
      if (k === "satr+r3")  return "lc-path--satr-r3";
      if (k === "r3")       return isGspo ? "lc-path--r3-gspo"    : "lc-path--r3";
      if (k === "tis")      return isGspo ? "lc-path--tis-gspo"   : "lc-path--tis";
      if (k === "tis+r3")   return isGspo ? "lc-path--tis_r3-gspo": "lc-path--tis_r3";
      if (k === "dppo")     return "lc-path--dppo";
      if (k === "slime")    return isGspo ? "lc-path--slime-gspo" : "lc-path--slime";
      if (k === "baseline") return "lc-path--baseline";
      return "";
    };

    // Honest short labels for the curated slugs (fall back to `display`).
    const shortLabelFor = (slug, s) => {
      const map = {
        "grpo_slime__s1_gbs2048"     : "GRPO",
        "grpo__dppo__s1__u4jyssm8"   : "GRPO + DPPO",
        "grpo__r3__s1__c8j5hem6"     : "GRPO + R3",
        "gspo__satr__s1__mvb19ayy"   : "GSPO + SATR",
        "gspo__satr_r3__s1__eenokv3e": "GSPO + SATR + R3",
        "grpo_slime__s8"             : "GRPO",
        "gspo_slime__s8"             : "GSPO",
        "grpo__dppo__s8__yzh8bw0y"   : "GRPO + DPPO",
        "grpo__r3__s8__async_r3"     : "GRPO + R3",
        "gspo__satr__s8__ddxzokvw"   : "GSPO + SATR",
        "grpo__satr_r3__s8__s8et8i00": "GRPO + SATR + R3",
        "gspo__r3__s1_new"           : "GSPO + R3",
        "gspo__tis__s1_new"          : "GSPO + TIS",
        "gspo__tis_r3__s1_new"       : "GSPO + TIS + R3",
        "gspo__r3__s8_new"           : "GSPO + R3",
        "gspo__tis__s8_new"          : "GSPO + TIS",
        "gspo__tis_r3__s8_new"       : "GSPO + TIS + R3",
      };
      return map[slug] || s.display || slug;
    };

    // Steady-state value = mean of trailing 25% of points (min 3), ignoring
    // values beyond the axis cap. Returns null when the run leaves the axis
    // (diverged) so callers can render "diverges" instead of a bogus 0.
    const steadyState = (pts, yMax) => {
      const n = pts.length;
      let start = Math.max(1, Math.floor(n * 0.75));
      if (n - start < 3) start = Math.max(1, n - 3);
      let sum = 0, k = 0;
      for (let i = start; i < n; i++) {
        const v = pts[i][1];
        if (v > yMax) continue;
        sum += v; k += 1;
      }
      return k >= 3 ? sum / k : null;
    };

    const lineFigures = $$('.exp-figure[data-chart="line-training"]');
    const sxAll = CHART.series || {};

    lineFigures.forEach((fig) => {
      const host = fig.querySelector(".line-chart");
      if (!host) return;
      $$("svg, img, object", host).forEach((n) => n.remove());

      const stale = fig.dataset.stale ? Number(fig.dataset.stale) : null;
      const only  = fig.dataset.only  ? fig.dataset.only.split(",") : null;
      const skip  = fig.dataset.skip  ? fig.dataset.skip.split(",") : null;

      let entries;
      if (only && only.length) {
        entries = only
          .map((slug) => (sxAll[slug] ? [slug.trim(), sxAll[slug.trim()]] : null))
          .filter(Boolean)
          .filter(([slug, s]) => (stale == null || s.stale === stale));
      } else {
        entries = Object.entries(sxAll).filter(([slug, s]) => {
          if (stale != null && s.stale !== stale) return false;
          if (skip && skip.includes(slug)) return false;
          return true;
        });
        entries.sort((a, b) => (a[1].method || "").localeCompare(b[1].method || ""));
      }
      if (!entries.length) return;

      // --- axis extents ---
      const xMin = 0;
      const xMax = Number(fig.dataset.xmax || 260);
      const yMin = 0;
      const yMax = Number(fig.dataset.ymax || 0.036);

      // --- plot geometry (1:1 to visual pixels) ---
      const hostBox = host.getBoundingClientRect();
      const W = Math.max(720, Math.round(hostBox.width || 960));
      const H = 500;
      const PL = 74, PR = 190, PT = 34, PB = 54;
      const PW = W - PL - PR;
      const PH = H - PT - PB;

      const tx = (x) => PL + Math.max(0, Math.min(1, (x - xMin) / (xMax - xMin))) * PW;
      const ty = (y) => PT + PH - Math.max(0, Math.min(1, (y - yMin) / (yMax - yMin))) * PH;

      const svg = el("svg", {
        viewBox: `0 0 ${W} ${H}`,
        preserveAspectRatio: "xMidYMid meet",
        "shape-rendering": "geometricPrecision",
        "text-rendering": "geometricPrecision",
        role: "img",
      });

      // --- grid & ticks ---
      const yTicks = fig.dataset.yticks
        ? fig.dataset.yticks.split(",").map(Number)
        : [0, 0.008, 0.016, 0.024, 0.032];
      yTicks.forEach((v) => {
        const y = ty(v);
        el("line", { class: "lc-grid", x1: PL, x2: PL + PW, y1: y, y2: y }, svg);
        const t = el("text", { class: "lc-tick", x: PL - 8, y: y + 4.5, "text-anchor": "end" }, svg);
        t.textContent = v.toFixed(3);
      });
      const xTicks = fig.dataset.xticks
        ? fig.dataset.xticks.split(",").map(Number)
        : [0, 60, 120, 180, 240];
      xTicks.forEach((v) => {
        const x = tx(v);
        el("line", { class: "lc-frame", x1: x, x2: x, y1: PT + PH, y2: PT + PH + 4 }, svg);
        const t = el("text", { class: "lc-tick", x: x, y: PT + PH + 22, "text-anchor": "middle" }, svg);
        t.textContent = v;
      });
      el("rect", { class: "lc-frame", x: PL, y: PT, width: PW, height: PH }, svg);

      const xl = el("text", { class: "lc-axlbl", x: PL + PW / 2, y: H - 12, "text-anchor": "middle" }, svg);
      xl.textContent = T("training step", "训练步数");
      const yl = el("text", { class: "lc-axlbl", transform: `translate(20 ${PT + PH / 2}) rotate(-90)`, "text-anchor": "middle" }, svg);
      yl.textContent = T("|log π_train − log π_rollout|  (per-token mean)", "|log π_train − log π_rollout|（逐 token 平均）");

      // --- paths ---
      const endGroup = el("g", { class: "lc-endgroup" });
      const labelX = PL + PW + 10;
      const drawn = [];

      entries.forEach(([slug, s]) => {
        const rawPts = s.points;
        if (!rawPts || rawPts.length < 2) return;
        const cls = methodClass(s.method, s.algo);

        // Helper: build a path "d" string + return (lastX, lastY, lastRaw).
        const buildPath = (pts) => {
          let d = "";
          let lastX = null, lastY = null;
          for (let k = 0; k < pts.length; k++) {
            const px = pts[k][0], py0 = pts[k][1];
            if (px > xMax) break;
            const py = Math.min(py0, yMax);
            const X = tx(px), Y = ty(py);
            d += (k === 0 ? "M" : "L") + X.toFixed(1) + " " + Y.toFixed(1) + " ";
            lastX = X; lastY = Y;
          }
          return { d: d.trim(), lastX, lastY, lastRaw: pts.length ? pts[pts.length - 1][1] : null };
        };
        const rawGeom = buildPath(rawPts);
        if (!rawGeom.d) return;

        const pRaw = el("path", { class: "lc-path lc-path--raw " + cls, d: rawGeom.d }, svg);
        pRaw.dataset.slug = slug;
        pRaw.setAttribute("aria-label", s.display + " (raw)");

        drawn.push({
          slug, s, cls,
          pathRaw: pRaw,
          rawPoints: rawPts,
          endRaw: { x: rawGeom.lastX, y: rawGeom.lastY, raw: rawGeom.lastRaw },
          steadyRaw: steadyState(rawPts, yMax),
          visible: true,
          label: shortLabelFor(slug, s),
        });
      });

      // Raise SATR-family curves to the top of the paint order so they are
      // never hidden behind other lines. Re-appending an existing SVG node
      // moves it to the end of its parent (== rendered on top).
      drawn.forEach((d) => {
        if (d.cls === "lc-path--satr" || d.cls === "lc-path--satr-r3") {
          svg.appendChild(d.pathRaw);
        }
      });

      // --- end labels: pack visible labels top-down without overlap ---
      function packLabels() {
        const vis = drawn.filter((d) => d.visible);
        const bandTop = PT + 16, bandBot = PT + PH - 16;
        const step = vis.length > 1 ? (bandBot - bandTop) / (vis.length - 1) : 0;
        const sorted = vis.slice().sort((a, b) => a.lastY - b.lastY);
        sorted.forEach((d, rank) => {
          const lblY = vis.length > 1 ? bandTop + rank * step : (bandTop + bandBot) / 2;
          d._leader.setAttribute("x2", labelX - 3);
          d._leader.setAttribute("y2", lblY);
          d._name.setAttribute("y", lblY - 2);
          d._val.setAttribute("y", lblY + 16);
        });
        drawn.forEach((d) => {
          const show = d.visible ? "" : "none";
          d._leader.style.display = show;
          d._dot.style.display = show;
          d._name.style.display = show;
          d._val.style.display = show;
        });
      }

      drawn.forEach((d) => {
        d.lastX = d.endRaw.x; d.lastY = d.endRaw.y;
        d.steady = d.steadyRaw;
        d.diverged = d.endRaw.raw != null && d.endRaw.raw > yMax;
        d._leader = el("line", { class: "lc-leader " + d.cls, x1: d.lastX, y1: d.lastY, x2: labelX - 3, y2: d.lastY, stroke: "currentColor" }, endGroup);
        d._dot = el("circle", { class: "lc-endpt " + d.cls, cx: d.lastX, cy: d.lastY, r: 5, fill: "currentColor" }, endGroup);
        d._name = el("text", { class: "lc-endlabel " + d.cls, x: labelX, y: d.lastY, fill: "currentColor" }, endGroup);
        d._name.textContent = d.label;
        d._val = el("text", { class: "lc-endval", x: labelX, y: d.lastY + 16 }, endGroup);
        d._val.textContent = d.diverged ? T("diverges ↑", "发散 ↑") : (d.steady != null ? "≈ " + d.steady.toFixed(4) : "");
      });

      // --- hover crosshair + tooltip ---
      const hoverG = el("g", { class: "lc-hover", style: "display:none" }, svg);
      const crossLine = el("line", { class: "lc-cross", x1: 0, x2: 0, y1: PT, y2: PT + PH }, hoverG);
      drawn.forEach((d) => {
        d._hdot = el("circle", { class: "lc-hoverpt " + d.cls, r: 4.5, fill: "currentColor" }, hoverG);
      });

      svg.appendChild(endGroup);
      host.appendChild(svg);

      const tip = document.createElement("div");
      tip.className = "lc-tip";
      tip.style.display = "none";
      host.appendChild(tip);

      // resolve actual stroke colors once (for tooltip swatches)
      requestAnimationFrame(() => {
        drawn.forEach((d) => { d.color = getComputedStyle(d.pathRaw).stroke; });
      });

      function hideHover() { hoverG.style.display = "none"; tip.style.display = "none"; }

      svg.addEventListener("pointerleave", hideHover);
      svg.addEventListener("pointermove", (ev) => {
        const rect = svg.getBoundingClientRect();
        const vx = (ev.clientX - rect.left) * (W / rect.width);
        if (vx < PL - 6 || vx > PL + PW + 6) { hideHover(); return; }
        const stepX = xMin + ((vx - PL) / PW) * (xMax - xMin);
        // snap to the data grid (points every 4 steps)
        const snap = Math.round(stepX / 4) * 4;
        const rows = [];
        drawn.forEach((d) => {
          d._hdot.style.display = "none";
          if (!d.visible) return;
          let best = null, bestDx = 8.01;
          for (const [px, py] of d.s.points) {
            const dx = Math.abs(px - snap);
            if (dx < bestDx && px <= xMax) { bestDx = dx; best = [px, py]; }
            if (px > snap + 8) break;
          }
          if (!best) return;
          const Y = ty(Math.min(best[1], yMax));
          d._hdot.setAttribute("cx", tx(best[0]));
          d._hdot.setAttribute("cy", Y);
          d._hdot.style.display = "";
          rows.push({ d, v: best[1] });
        });
        if (!rows.length) { hideHover(); return; }
        rows.sort((a, b) => b.v - a.v);
        crossLine.setAttribute("x1", tx(snap));
        crossLine.setAttribute("x2", tx(snap));
        hoverG.style.display = "";
        tip.innerHTML =
          `<div class="lc-tip__head">${T("step", "第")} ${snap}${T("", " 步")}</div>` +
          rows.map((r) =>
            `<div class="lc-tip__row"><i style="background:${r.d.color || "currentColor"}"></i>` +
            `<span>${r.d.label}</span><b>${r.v > yMax ? r.v.toFixed(3) + " ↑" : r.v.toFixed(4)}</b></div>`
          ).join("");
        tip.style.display = "";
        const hostRect = host.getBoundingClientRect();
        const pxInHost = ((tx(snap)) / W) * hostRect.width;
        const tw = tip.offsetWidth || 180;
        let left = pxInHost + 16;
        if (left + tw > hostRect.width - 8) left = pxInHost - tw - 16;
        tip.style.left = Math.max(4, left) + "px";
        tip.style.top = "26px";
      });

      // --- legend chips (click to toggle series) ---
      const legend = document.createElement("div");
      legend.className = "line-chart__legend";
      drawn.forEach((d) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "lc-chip " + d.cls;
        chip.innerHTML = `<i></i><span>${d.label}</span>`;
        chip.setAttribute("aria-pressed", "true");
        chip.addEventListener("click", () => {
          d.visible = !d.visible;
          chip.classList.toggle("is-off", !d.visible);
          chip.setAttribute("aria-pressed", d.visible ? "true" : "false");
          d.pathRaw.style.display = d.visible ? "" : "none";
          packLabels();
          hideHover();
        });
        legend.appendChild(chip);
      });
      const hint = document.createElement("span");
      hint.className = "line-chart__hint";
      hint.textContent = T("click a series to hide it · hover the plot to inspect values",
                           "点击图例可隐藏该曲线 · 悬停图表可查看数值");
      legend.appendChild(hint);
      host.parentNode.insertBefore(legend, host);

      packLabels();

      // measure path lengths for the scroll-triggered draw-in transition
      $$(".lc-path", svg).forEach((p) => {
        try {
          const L = p.getTotalLength();
          if (L && isFinite(L)) p.style.setProperty("--len", L.toFixed(1));
        } catch (e) { /* no layout yet */ }
      });
    });
  }

  /* ============ 6. CLIP-GEOMETRY EXPLORER ============
     One reusable widget rendered into every <div class="clip-explorer"
     data-method="...">. It draws the (μ_R, π) log–log plane and the sampled
     gradient regions of the chosen mechanism, with:
       · an advantage-sign toggle  (asymmetric mechanisms change their dead side)
       · parameter slider(s)       (ε, δ, α/β, φ, ρ)
       · a hover readout           (μ, π, r and the per-token verdict)
  ============================================== */
  const LOG_MIN = -3, LOG_MAX = 0;
  const GRID_N = 140;

  // Bernoulli KL D_B(a ‖ b) with clamping for numerical safety.
  function bernKL(a, b) {
    const eps = 1e-12;
    a = Math.min(1 - eps, Math.max(eps, a));
    b = Math.min(1 - eps, Math.max(eps, b));
    return a * Math.log(a / b) + (1 - a) * Math.log((1 - a) / (1 - b));
  }
  // Largest p ≥ q (dir=+1) or smallest p ≤ q (dir=−1) with both Bernoulli KLs ≤ φ.
  function kpopBound(q, phi, dir) {
    const g = (p) => Math.max(bernKL(p, q), bernKL(q, p));
    let lo = q, hi = dir > 0 ? 1 - 1e-9 : 1e-9;
    if (g(hi) <= phi) return hi;
    for (let i = 0; i < 48; i++) {
      const mid = (lo + hi) / 2;
      if (g(mid) <= phi) lo = mid; else hi = mid;
    }
    return lo;
  }

  const EXPLORERS = {
    trpo: {
      family: "constraint",
      params: [{ key: "delta", label: "δ_TR", min: 0.02, max: 0.30, step: 0.01, val: 0.10 }],
      bounds(p) { return { kind: "prob", delta: p.delta }; },
      boundText(p) { return [`π = μ_R − δ  (δ = ${p.delta.toFixed(3)})`, `π = μ_R + δ`]; },
    },
    ppo: {
      family: "asym",
      params: [
        { key: "el", label: "ε_low",  min: 0.05, max: 0.50, step: 0.01, val: 0.20 },
        { key: "eh", label: "ε_high", min: 0.05, max: 0.50, step: 0.01, val: 0.28 },
      ],
      bounds(p) { return { kind: "ratio", lo: 1 - p.el, hi: 1 + p.eh }; },
      boundText(p) { return [`r = 1−ε_low = ${(1 - p.el).toFixed(2)}`, `r = 1+ε_high = ${(1 + p.eh).toFixed(2)}`]; },
    },
    dppo: {
      family: "asym",
      params: [{ key: "delta", label: "δ", min: 0.01, max: 0.15, step: 0.005, val: 0.05 }],
      bounds(p) { return { kind: "prob", delta: p.delta }; },
      boundText(p) { return [`π = μ_R − δ  (δ = ${p.delta.toFixed(3)})`, `π = μ_R + δ`]; },
    },
    satr: {
      family: "asym",
      // Illustrative directional hill-kernel factor from Eq. (3.2).
      // This widget uses 0.5 < c_dir,b,t < 1, and the dashed band marks c = 1.
      params: [{ key: "c", label: "c<sub>dir,b,t</sub> (illustrative gated factor, 0.5&lt;c&lt;1)", min: 0.50, max: 1.00, step: 0.01, val: 0.75 }],
      base: { el: 0.20, eh: 0.20 },
      bounds(p) { return { kind: "ratio", lo: 1 - 0.20 * p.c, hi: 1 + 0.20 * p.c }; },
      boundText(p) { return [`d < 0 case: r = 1−ε_low·c₋ = ${(1 - 0.2 * p.c).toFixed(3)}`, `d > 0 case: r = 1+ε_high·c₊ = ${(1 + 0.2 * p.c).toFixed(3)}`]; },
      reference: { lo: 0.80, hi: 1.20, label: "gate off: c₋ = c₊ = 1 (PPO baseline)" },
    },
    tis: {
      family: "weight",
      params: [{ key: "C", label: "C (truncation cap)", min: 1.0, max: 8.0, step: 0.5, val: 2.0 }],
      bounds(p) { return { kind: "ratio", lo: 1, hi: p.C }; },
      boundText(p) { return [`r = 1`, `r = C = ${p.C.toFixed(1)}`]; },
    },
    icepop: {
      family: "mask",
      params: [
        { key: "alpha", label: "α", min: 0.10, max: 0.90, step: 0.05, val: 0.50 },
        { key: "beta",  label: "β", min: 1.5,  max: 10,   step: 0.5,  val: 5.0 },
      ],
      bounds(p) { return { kind: "ratio", lo: p.alpha, hi: p.beta }; },
      boundText(p) { return [`r = α = ${p.alpha.toFixed(2)}`, `r = β = ${p.beta.toFixed(1)}`]; },
    },
    kpop: {
      family: "mask",
      params: [{ key: "phi", label: "φ", min: 0.005, max: 0.10, step: 0.005, val: 0.02 }],
      bounds(p) { return { kind: "kpop", phi: p.phi }; },
      boundText(p) { return [`Bernoulli KL = φ = ${p.phi.toFixed(3)} boundary`, ""]; },
    },
  };

  function renderExplorer(host) {
    const method = host.dataset.method;
    const cfg = EXPLORERS[method];
    if (!cfg) return;
    const params = {};
    cfg.params.forEach((p) => (params[p.key] = p.val));
    let sign = +1; // advantage sign A-hat

    // ---------- static scaffold ----------
    host.classList.add("ce");
    const bar = document.createElement("div");
    bar.className = "ce__bar";
    host.appendChild(bar);

    // sign toggle
    const signWrap = document.createElement("div");
    signWrap.className = "ce__signs";
    const bPos = document.createElement("button");
    bPos.type = "button"; bPos.className = "ce__sign is-on"; bPos.innerHTML = "A&#770; &gt; 0";
    const bNeg = document.createElement("button");
    bNeg.type = "button"; bNeg.className = "ce__sign"; bNeg.innerHTML = "A&#770; &lt; 0";
    signWrap.append(bPos, bNeg);
    bar.appendChild(signWrap);
    if (cfg.family !== "asym") {
      const note = document.createElement("span");
      note.className = "ce__note";
      note.textContent = cfg.family === "constraint"
        ? T("projected necessary condition |π(y)−μ_R(y)| ≤ δ; the full-TV constraint is stronger",
            "逐动作必要投影 |π(y)−μ_R(y)| ≤ δ；完整 TV 约束更强")
        : method === "tis"
        ? T("no hard mask — the weight w = sg[min(r, C)] is the same for both signs",
            "没有硬掩码 — 权重 w = sg[min(r, C)] 与 Â 的符号无关")
        : T("symmetric mask: the discard region is identical for both signs of Â",
            "对称掩码：丢弃区域与 Â 的符号无关");
      signWrap.appendChild(note);
      if (cfg.family === "constraint") {
        bPos.hidden = true;
        bNeg.hidden = true;
      }
    } else if (method === "satr") {
      const note = document.createElement("span");
      note.className = "ce__note";
      note.textContent = T(
        "illustrative gated token: the directional hill-kernel factor satisfies 0.5 < c_dir,b,t < 1; d>0 contracts only the upper endpoint; d<0 only the lower",
        "门控 token 示意：方向性 hill kernel 因子满足 0.5 < c_dir,b,t < 1；d>0 仅收缩上端，d<0 仅收缩下端"
      );
      signWrap.appendChild(note);
    }

    // sliders
    const sliders = document.createElement("div");
    sliders.className = "ce__sliders";
    bar.appendChild(sliders);
    cfg.params.forEach((p) => {
      const w = document.createElement("label");
      w.className = "ce__slider";
      w.innerHTML = `<span class="ce__slider-name">${p.label}</span>
        <input type="range" min="${p.min}" max="${p.max}" step="${p.step}" value="${p.val}">
        <span class="ce__slider-val"></span>`;
      const input = w.querySelector("input");
      const val = w.querySelector(".ce__slider-val");
      const show = () => (val.textContent = (+input.value).toFixed(p.step < 0.01 ? 3 : 2));
      input.addEventListener("input", () => { params[p.key] = +input.value; show(); update(); });
      show();
      sliders.appendChild(w);
    });

    // ---------- svg plot ----------
    const W = 680, H = 560, PL = 66, PR = 24, PT = 20, PB = 60;
    const PW = W - PL - PR, PH = H - PT - PB;
    const X = (u) => PL + ((u - LOG_MIN) / (LOG_MAX - LOG_MIN)) * PW;
    const Y = (v) => PT + PH - ((v - LOG_MIN) / (LOG_MAX - LOG_MIN)) * PH;
    const clampV = (v) => Math.max(LOG_MIN, Math.min(LOG_MAX, v));

    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, class: "ce__svg", role: "img" });
    host.appendChild(svg);

    // hatch pattern for the dead region (unique id per instance)
    const uid = "ceh-" + method + "-" + Math.floor(performance.now() * 1000 % 1e9).toString(36);
    const defs = el("defs", {}, svg);
    const pat = el("pattern", { id: uid, width: 7, height: 7, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs);
    el("rect", { width: 7, height: 7, class: "ce-hatch-bg" }, pat);
    el("line", { x1: 0, y1: 0, x2: 0, y2: 7, class: "ce-hatch-line" }, pat);

    // grid + ticks (decades)
    for (let d = LOG_MIN; d <= LOG_MAX; d++) {
      el("line", { class: "ce-grid", x1: X(d), x2: X(d), y1: PT, y2: PT + PH }, svg);
      el("line", { class: "ce-grid", x1: PL, x2: PL + PW, y1: Y(d), y2: Y(d) }, svg);
      const lx = el("text", { class: "ce-tick", x: X(d), y: PT + PH + 20, "text-anchor": "middle" }, svg);
      lx.innerHTML = `10<tspan dy="-5" font-size="9">${d}</tspan>`;
      const lyt = el("text", { class: "ce-tick", x: PL - 8, y: Y(d) + 4, "text-anchor": "end" }, svg);
      lyt.innerHTML = `10<tspan dy="-5" font-size="9">${d}</tspan>`;
    }

    // region paths (order matters: dead below boundaries)
    const regKeep  = el("path", { class: "ce-region ce-region--keep" }, svg);
    const regAbove = el("path", { class: "ce-region" }, svg);
    const regBelow = el("path", { class: "ce-region" }, svg);
    const refLo = el("path", { class: "ce-ref", style: "display:none" }, svg);
    const refHi = el("path", { class: "ce-ref", style: "display:none" }, svg);
    const bndLo = el("path", { class: "ce-bound" }, svg);
    const bndHi = el("path", { class: "ce-bound" }, svg);

    // diagonal r = 1
    el("line", { class: "ce-diag", x1: X(LOG_MIN), y1: Y(LOG_MIN), x2: X(LOG_MAX), y2: Y(LOG_MAX) }, svg);
    const diagLbl = el("text", { class: "ce-lbl", x: X(-1.62), y: Y(-1.5) + 16, transform: `rotate(-45 ${X(-1.62)} ${Y(-1.5) + 16})` }, svg);
    diagLbl.textContent = T("r = 1 (on-policy)", "r = 1（同策略）");

    // frame + axis labels
    el("rect", { class: "ce-frame", x: PL, y: PT, width: PW, height: PH }, svg);
    const ax = el("text", { class: "ce-axlbl", x: PL + PW / 2, y: H - 14, "text-anchor": "middle" }, svg);
    ax.textContent = T("μ_R(y_t | s_t)   — behavior (rollout) probability", "μ_R(y_t | s_t) — 行为策略（rollout）概率");
    const ay = el("text", { class: "ce-axlbl", transform: `translate(17 ${PT + PH / 2}) rotate(-90)`, "text-anchor": "middle" }, svg);
    ay.textContent = T("π_train(y_t | s_t) — train probability", "π_train(y_t | s_t) — 训练策略概率");

    // boundary labels
    const bndLblHi = el("text", { class: "ce-blbl" }, svg);
    const bndLblLo = el("text", { class: "ce-blbl" }, svg);

    // hover dot
    const hdot = el("circle", { class: "ce-dot", r: 5, style: "display:none" }, svg);

    // readout + region legend
    const READ_IDLE = "<em>" + T("hover the plane to inspect a token: μ_R, π, r and its verdict",
                                 "将鼠标悬停在平面上，可查看任意 token 的 μ_R、π、r 及其判定") + "</em>";
    const read = document.createElement("div");
    read.className = "ce__read";
    read.innerHTML = READ_IDLE;
    host.appendChild(read);

    const rl = document.createElement("div");
    rl.className = "ce__legend";
    host.appendChild(rl);

    // ---------- geometry ----------
    // Boundary sampling: returns arrays of [u, vLo, vHi] over the u grid.
    function sampleBounds() {
      const b = cfg.bounds(params);
      const rows = [];
      for (let i = 0; i <= GRID_N; i++) {
        const u = LOG_MIN + (i / GRID_N) * (LOG_MAX - LOG_MIN);
        const mu = Math.pow(10, u);
        let vLo, vHi;
        if (b.kind === "ratio") {
          vLo = u + Math.log10(Math.max(1e-6, b.lo));
          vHi = u + Math.log10(b.hi);
        } else if (b.kind === "prob") {
          vHi = Math.log10(Math.min(1, mu + b.delta));
          vLo = mu > b.delta ? Math.log10(mu - b.delta) : LOG_MIN - 0.35;
        } else { // kpop
          vHi = Math.log10(kpopBound(mu, b.phi, +1));
          vLo = Math.log10(Math.max(1e-6, kpopBound(mu, b.phi, -1)));
        }
        rows.push([u, vLo, vHi]);
      }
      return rows;
    }

    const toPath = (pts) => pts.map((p, i) => (i ? "L" : "M") + X(p[0]).toFixed(1) + " " + Y(clampV(p[1])).toFixed(1)).join(" ");

    function update() {
      const rows = sampleBounds();
      const hiPts = rows.map(([u, , vHi]) => [u, vHi]);
      const loPts = rows.map(([u, vLo]) => [u, vLo]);

      // kept band
      let d = toPath(hiPts);
      d += loPts.slice().reverse().map((p) => "L" + X(p[0]).toFixed(1) + " " + Y(clampV(p[1])).toFixed(1)).join(" ") + " Z";
      regKeep.setAttribute("d", d);

      // above region (π larger than window top)
      let dA = toPath(hiPts) + ` L ${X(LOG_MAX)} ${Y(LOG_MAX)} L ${X(LOG_MIN)} ${Y(LOG_MAX)} Z`;
      regAbove.setAttribute("d", dA);
      // below region
      let dB = toPath(loPts) + ` L ${X(LOG_MAX)} ${Y(LOG_MIN)} L ${X(LOG_MIN)} ${Y(LOG_MIN)} Z`;
      regBelow.setAttribute("d", dB);

      // boundary strokes
      bndHi.setAttribute("d", toPath(hiPts));
      bndLo.setAttribute("d", toPath(loPts.filter((p) => p[1] > LOG_MIN - 0.3)));

      // region semantics per family + sign
      const dead = `url(#${uid})`;
      if (cfg.family === "asym") {
        regAbove.setAttribute("class", "ce-region " + (sign > 0 ? "ce-region--dead" : "ce-region--pull"));
        regBelow.setAttribute("class", "ce-region " + (sign > 0 ? "ce-region--pull" : "ce-region--dead"));
        (sign > 0 ? regAbove : regBelow).setAttribute("fill", dead);
        (sign > 0 ? regBelow : regAbove).removeAttribute("fill");
        regKeep.setAttribute("class", "ce-region ce-region--keep");
      } else if (cfg.family === "mask") {
        regAbove.setAttribute("class", "ce-region ce-region--dead");
        regBelow.setAttribute("class", "ce-region ce-region--dead");
        regAbove.setAttribute("fill", dead);
        regBelow.setAttribute("fill", dead);
        regKeep.setAttribute("class", "ce-region ce-region--keep");
      } else if (cfg.family === "constraint") {
        regAbove.setAttribute("class", "ce-region ce-region--dead");
        regBelow.setAttribute("class", "ce-region ce-region--dead");
        regAbove.removeAttribute("fill");
        regBelow.removeAttribute("fill");
        regKeep.setAttribute("class", "ce-region ce-region--keep");
      } else { // tis
        regAbove.setAttribute("class", "ce-region ce-region--trunc");
        regAbove.removeAttribute("fill");
        regBelow.setAttribute("class", "ce-region ce-region--damp");
        regBelow.removeAttribute("fill");
        regKeep.setAttribute("class", "ce-region ce-region--keep");
      }

      // reference band (SATR: PPO baseline)
      if (cfg.reference) {
        const cLo = Math.log10(cfg.reference.lo), cHi = Math.log10(cfg.reference.hi);
        refLo.style.display = refHi.style.display = "";
        // straight lines: v = u + c, clipped to the square
        const seg = (c) => {
          const u0 = Math.max(LOG_MIN, LOG_MIN - c), u1 = Math.min(LOG_MAX, LOG_MAX - c);
          return `M ${X(u0)} ${Y(u0 + c)} L ${X(u1)} ${Y(u1 + c)}`;
        };
        refLo.setAttribute("d", seg(cLo));
        refHi.setAttribute("d", seg(cHi));
      }

      // boundary labels
      const bt = cfg.boundText(params);
      if (bt[1]) {
        const p = hiPts[Math.floor(GRID_N * 0.42)];
        bndLblHi.setAttribute("x", X(p[0]) - 8);
        bndLblHi.setAttribute("y", Y(clampV(p[1])) - 8);
        bndLblHi.setAttribute("text-anchor", "end");
        bndLblHi.textContent = bt[1];
      } else bndLblHi.textContent = "";
      if (bt[0]) {
        const vis = loPts.filter((p) => p[1] > LOG_MIN + 0.08 && p[1] < LOG_MAX - 0.05);
        const p = vis[Math.floor(vis.length * 0.62)] || loPts[Math.floor(GRID_N * 0.62)];
        bndLblLo.setAttribute("x", X(p[0]) + 10);
        bndLblLo.setAttribute("y", Y(clampV(p[1])) + 16);
        bndLblLo.setAttribute("text-anchor", "start");
        bndLblLo.textContent = bt[0];
      } else bndLblLo.textContent = "";

      renderRegionLegend();
    }

    function renderRegionLegend() {
      const items = [];
      if (cfg.family === "asym") {
        items.push(["keep", T("inside window — full gradient", "窗口内 — 保留完整梯度")]);
        items.push(["pull", T("outside, converging — pull-back gradient kept", "窗口外但在收敛方向 — 保留回拉梯度")]);
        items.push(["dead", T("outside, diverging — gradient zeroed", "窗口外且在偏离方向 — 梯度归零")]);
      } else if (cfg.family === "mask") {
        items.push(["keep", T("inside range — gradient kept", "范围内 — 保留梯度")]);
        items.push(["dead", T("outside range — zeroed for BOTH signs of Â (pull-back lost)", "范围外 — 无论 Â 的符号均归零（回拉梯度丢失）")]);
      } else if (cfg.family === "constraint") {
        items.push(["keep", T("inside the per-action necessary projection", "位于逐动作必要投影内")]);
        items.push(["dead", T("outside — the full-TV constraint is necessarily violated", "投影外 — 完整 TV 约束必然被违反")]);
      } else {
        items.push(["trunc", T("r > C — truncated: w = C", "r > C — 截断：w = C")]);
        items.push(["keep", T("1 < r ≤ C — exact IS weight: w = r", "1 < r ≤ C — 精确 IS 权重：w = r")]);
        items.push(["damp", T("r < 1 — damped: w = r < 1 (never zeroed)", "r < 1 — 衰减：w = r < 1（永不归零）")]);
      }
      rl.innerHTML = items.map(([k, t]) => `<span class="ce__lg ce__lg--${k}"><i></i>${t}</span>`).join("");
    }

    // ---------- sign toggle ----------
    function setSign(s) {
      sign = s;
      bPos.classList.toggle("is-on", s > 0);
      bNeg.classList.toggle("is-on", s < 0);
      update();
    }
    bPos.addEventListener("click", () => setSign(+1));
    bNeg.addEventListener("click", () => setSign(-1));

    // ---------- hover readout ----------
    svg.addEventListener("pointerleave", () => {
      hdot.style.display = "none";
      read.innerHTML = READ_IDLE;
    });
    svg.addEventListener("pointermove", (ev) => {
      const rect = svg.getBoundingClientRect();
      const vx = (ev.clientX - rect.left) * (W / rect.width);
      const vy = (ev.clientY - rect.top) * (H / rect.height);
      if (vx < PL || vx > PL + PW || vy < PT || vy > PT + PH) { hdot.style.display = "none"; return; }
      const u = LOG_MIN + ((vx - PL) / PW) * (LOG_MAX - LOG_MIN);
      const v = LOG_MIN + ((PT + PH - vy) / PH) * (LOG_MAX - LOG_MIN);
      const mu = Math.pow(10, u), pi = Math.pow(10, v), r = pi / mu;
      hdot.setAttribute("cx", vx); hdot.setAttribute("cy", vy);
      hdot.style.display = "";

      const b = cfg.bounds(params);
      let verdict = "", cls = "keep";
      if (cfg.family === "weight") {
        const C = params.C ?? 1;
        const w = Math.min(C, r);
        verdict = r > C
          ? T(`truncated: w = C = ${C.toFixed(1)} (raw r = ${r.toFixed(2)})`, `被截断：w = C = ${C.toFixed(1)}（原始 r = ${r.toFixed(2)}）`)
          : r > 1
          ? T(`exact IS weight kept: w = r = ${w.toFixed(3)}`, `保留精确 IS 权重：w = r = ${w.toFixed(3)}`)
          : T(`damped: w = r = ${w.toFixed(3)}`, `被衰减：w = r = ${w.toFixed(3)}`);
        cls = r > C ? "trunc" : (r > 1 ? "keep" : "damp");
      } else {
        let inside;
        if (b.kind === "ratio") inside = r >= b.lo && r <= b.hi;
        else if (b.kind === "prob") inside = Math.abs(pi - mu) <= b.delta;
        else inside = Math.max(bernKL(pi, mu), bernKL(mu, pi)) <= b.phi;
        const above = b.kind === "prob" ? pi - mu > b.delta : (b.kind === "ratio" ? r > b.hi : pi > mu);
        if (inside && cfg.family === "constraint") {
          verdict = T("inside the necessary projection — full TV is not certified", "位于必要投影内 — 不能据此验证完整 TV");
          cls = "keep";
        }
        else if (!inside && cfg.family === "constraint") {
          verdict = T("outside the projection — full-TV constraint violated", "位于投影外 — 已违反完整 TV 约束");
          cls = "dead";
        }
        else if (inside) {
          verdict = method === "dppo"
            ? T("below the sampled-action threshold — full gradient", "低于采样动作阈值 — 保留完整梯度")
            : cfg.family === "mask"
            ? T("inside the sampled keep range — gradient kept", "位于采样保留区间 — 保留梯度")
            : T("inside the nominal sampled-ratio window — full gradient", "位于名义采样比率窗口 — 保留完整梯度");
          cls = "keep";
        }
        else if (cfg.family === "mask") { verdict = T("masked out — gradient zeroed (even the pull-back direction)", "被掩码丢弃 — 梯度归零（连回拉方向也被丢弃）"); cls = "dead"; }
        else {
          const diverging = (sign > 0) === above;
          verdict = diverging
            ? T("outside + diverging — gradient zeroed", "窗口外且偏离 — 梯度归零")
            : T("outside + converging — pull-back gradient kept", "窗口外但收敛 — 保留回拉梯度");
          cls = diverging ? "dead" : "pull";
        }
      }
      read.innerHTML =
        `<span class="ce__read-nums">μ_R = ${fmtP(mu, mu < 0.01 ? 4 : 3)} · π = ${fmtP(pi, pi < 0.01 ? 4 : 3)} · r = ${r.toFixed(r > 10 ? 1 : 2)} · log r = ${Math.log(r).toFixed(2)}</span>` +
        ` <span class="ce__read-verdict ce__read-verdict--${cls}">${verdict}</span>`;
    });

    update();
  }
  $$(".clip-explorer").forEach(renderExplorer);

  /* ============ 7. LIGHTBOX ============
     Click-to-zoom for every content <img> and for inlined static SVG figures
     (.figure--svg). A single overlay is lazily created and reused.
  ============================================== */
  const lightboxSel = [
    ".figure img", ".subfigure img", ".subfigure--inline img",
    ".hero__figure img", ".aside--figure img", ".line-chart img",
    "figure img"
  ].join(",");

  let lb = null;
  function ensureLightbox() {
    if (lb) return lb;
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Image preview");
    lb.innerHTML =
      '<button type="button" class="lightbox__close" aria-label="Close preview">✕</button>' +
      '<img class="lightbox__img" alt=""/>' +
      '<div class="lightbox__svgwrap"></div>' +
      '<div class="lightbox__caption"></div>';
    lb.addEventListener("click", (e) => {
      if (e.target === lb || e.target.classList.contains("lightbox__close")) closeLightbox();
    });
    document.body.appendChild(lb);
    return lb;
  }
  function openLightboxImg(src, alt) {
    const box = ensureLightbox();
    const img = box.querySelector(".lightbox__img");
    const wrap = box.querySelector(".lightbox__svgwrap");
    wrap.style.display = "none"; wrap.innerHTML = "";
    img.style.display = "";
    img.src = src; img.alt = alt || "";
    box.querySelector(".lightbox__caption").textContent = alt || "";
    box.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function openLightboxSvg(svgNode, alt) {
    const box = ensureLightbox();
    const img = box.querySelector(".lightbox__img");
    const wrap = box.querySelector(".lightbox__svgwrap");
    img.style.display = "none"; img.src = "";
    wrap.innerHTML = "";
    wrap.appendChild(svgNode.cloneNode(true));
    wrap.style.display = "";
    box.querySelector(".lightbox__caption").textContent = alt || "";
    box.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => {
      const im = lb.querySelector(".lightbox__img");
      if (im) im.src = "";
      const wrap = lb.querySelector(".lightbox__svgwrap");
      if (wrap) wrap.innerHTML = "";
    }, 250);
  }

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    // inlined static SVG figures (theme-aware) — zoom the whole svg
    const zsvg = target.closest(".figure--svg > svg");
    if (zsvg) {
      e.preventDefault();
      openLightboxSvg(zsvg, zsvg.getAttribute("aria-label") || "");
      return;
    }
    if (!target.matches(lightboxSel)) return;
    if (target.closest(".site-nav") || target.closest(".site-footer")) return;
    const src = target.currentSrc || target.src;
    if (!src) return;
    e.preventDefault();
    openLightboxImg(src, target.alt || "");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lb && lb.classList.contains("is-open")) closeLightbox();
  });
})();
