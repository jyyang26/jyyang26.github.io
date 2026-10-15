(() => {
  "use strict";

  const DATA = window.RSI_DATA;
  const $ = (selector) => document.querySelector(selector);
  if (!DATA || DATA.schemaVersion !== 1) {
    $("#load-error").hidden = false;
    return;
  }

  const NS = "http://www.w3.org/2000/svg";
  const C = { blue: "#0052D9", gray: "#909399", light: "#C0C4CC", reward: "#7AA6DC", grid: "#E3E9F0", spine: "#CBD5E1", title: "#153B67" };
  const embedded = new URLSearchParams(location.search).has("embed");
  const panoramaOnly = new URLSearchParams(location.search).has("panorama");
  document.documentElement.classList.toggle("panorama", panoramaOnly);
  let externallyVisible = !embedded;
  const RUN = 24000;
  const HOLD = 1500;
  const MORPH = 1600;
  const STRIDE = RUN + HOLD + MORPH;
  const TOTAL = panoramaOnly ? 7000 : STRIDE * 2 + RUN + HOLD;
  const STARTS = [0, STRIDE, STRIDE * 2];
  const ORDER = ["TB4", "TB3", "TB2.1", "TBH", "LHTB", "SWR100"];
  const STAGES = ["base", "rsr1", "rl1", "rsr2", "long"];
  const STAGE_TITLES = { base: "Base", base_dump: "Direct PPO · Base dump", rsr1: "RSR-1 · SWR-RSR", rl1: "RPR-1", rl1_dump: "RPR-1 · Discarded tail", rsr2: "RSR-2", rl2_dump: "RPR-2 · Standard reward dump", long: "RPR-2 · Long-Reward", long_dump: "Long-Reward · Discarded tail" };
  const EVENTS = { base: [300, 750], base_dump: [950, 3000], rsr1: [3650, 5000], rl1: [5350, 8350], rl1_dump: [8700, 10800], rsr2: [12600, 14000], rl2_dump: [14200, 16750], long: [18100, 21600], long_dump: [22300, 23200] };
  const CHAPTERS = ["01 / A BETTER STARTING POINT", "02 / FOUR BENCHMARKS, ONE RECURSION", "03 / THE COMPLETE PICTURE"];
  const CHAPTER_STATUS = ["01 · Focus", "02 · Four suites", "03 · Panorama"];
  const NARRATIVE = [
    [0, "Start from Base", "Measured evaluations anchor every step of the recursion.", "INITIALIZE"],
    [950, "Explore direct training", "Direct PPO is not retained; its measured TB4 trajectory remains at zero.", "DIRECT PPO"],
    [3000, "Discard, do not erase", "Unretained exploration fades to gray and stays visible as training history.", "DISCARD"],
    [3650, "RSR-1 · Self-Rewrite", "Return to Base; the dashed path reaches the first rewritten actor.", "REWRITE"],
    [5350, "RPR-1 · Policy-Refine", "Reveal measured optimization steps, with every rise and fall intact.", "EXPLORE"],
    [8350, "Retain step 20", "A star marks the selected checkpoint that seeds the next rewrite.", "RETAIN"],
    [8700, "Explore further", "Later points may improve individual suites, but are not the selected root.", "BRANCH OUT"],
    [10800, "Prune the RPR-1 tail", "Discard the continuation, not the retained step-20 checkpoint.", "PRUNE"],
    [11400, "Return to the retained root", "The light retraces the branch to step 20 before the next rewrite.", "RETURN TO ROOT"],
    [12600, "RSR-2 · Rewrite again", "The second rewrite starts from retained RPR-1 step 20.", "REWRITE AGAIN"],
    [14200, "Compare an alternative", "The standard-reward RPR-2 branch is explored but not retained.", "ALTERNATIVE"],
    [16750, "Discard the FDR branch", "The alternative fades; the next exploration still begins at RSR-2.", "DISCARD"],
    [17300, "Return to RSR-2", "Use the same root for the Long-Reward policy-refinement branch.", "RETURN TO ROOT"],
    [18100, "RPR-2 · Long-Reward", "The SPR branch explores further; intermediate performance is nonmonotonic.", "LONG-REWARD"],
    [21600, "Step 18 · Terminal-RSI-27B", "The enlarged blue star marks one final model, not a per-suite maximum.", "FINAL RETAINED"],
    [22300, "One final continuation", "Step 20 is not retained. The final model remains anchored at step 18.", "FINAL TAIL"],
    [23200, "Keep the trunk, prune the tail", "Alternate RSR and RPR, always continuing from selected checkpoints.", "RECURSION"],
    [24000, "A better starting point", "Keep the evidence: retained paths, discarded branches, and missing evaluations.", "COMPLETE"]
  ];

  const clamp = (value, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, value));
  const ease = (value) => { const x = clamp(value); return x * x * (3 - 2 * x); };
  const lerp = (a, b, t) => a + (b - a) * t;
  const fixed = (value) => Number(value).toFixed(2);
  const fmtTime = (ms) => `${String(Math.floor(ms / 60000)).padStart(2, "0")}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")}`;
  const attr = (node, name, value) => {
    const text = String(value);
    if (node.getAttribute(name) !== text) node.setAttribute(name, text);
  };
  function svg(tag, attributes, parent, text) {
    const node = document.createElementNS(NS, tag);
    for (const [name, value] of Object.entries(attributes || {})) node.setAttribute(name, value);
    if (text !== undefined) node.textContent = text;
    if (parent) parent.appendChild(node);
    return node;
  }
  function blend(a, b, amount) {
    const rgb = (color) => [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16));
    const left = rgb(a), right = rgb(b);
    return `rgb(${left.map((v, i) => Math.round(lerp(v, right[i], amount))).join(",")})`;
  }
  function symbol(shape, radius) {
    if (shape === "D") return `M0,${-radius}L${radius},0L0,${radius}L${-radius},0Z`;
    if (shape === "*") {
      return Array.from({ length: 10 }, (_, i) => {
        const angle = -Math.PI / 2 + i * Math.PI / 5;
        const r = i % 2 ? radius * 0.382 : radius;
        return `${i ? "L" : "M"}${Math.cos(angle) * r},${Math.sin(angle) * r}`;
      }).join("") + "Z";
    }
    return `M${radius},0A${radius},${radius} 0 1 0 ${-radius},0A${radius},${radius} 0 1 0 ${radius},0`;
  }
  function along(coords, amount) {
    const position = clamp(amount) * (coords.length - 1);
    const index = Math.min(coords.length - 2, Math.floor(position));
    const fraction = position - index;
    return [lerp(coords[index][0], coords[index + 1][0], fraction), lerp(coords[index][1], coords[index + 1][1], fraction)];
  }
  function partialPath(coords, amount) {
    if (amount <= 0) return "";
    const last = clamp(amount) * (coords.length - 1);
    const whole = Math.floor(last);
    let d = `M${coords[0][0]},${coords[0][1]}`;
    for (let i = 1; i <= whole; i++) d += `L${coords[i][0]},${coords[i][1]}`;
    if (whole < coords.length - 1) {
      const head = along(coords, amount);
      d += `L${head[0]},${head[1]}`;
    }
    return d;
  }
  function intersects(a, b, padding = 0) {
    return a.x < b.x + b.w + padding && a.x + a.w + padding > b.x && a.y < b.y + b.h + padding && a.y + a.h + padding > b.y;
  }
  function segmentIntersectsBox(a, b, box) {
    let lo = 0, hi = 1;
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const p = [-dx, dx, -dy, dy];
    const q = [a[0] - box.x, box.x + box.w - a[0], a[1] - box.y, box.y + box.h - a[1]];
    for (let i = 0; i < 4; i++) {
      if (Math.abs(p[i]) < 1e-8) { if (q[i] < 0) return false; }
      else {
        const ratio = q[i] / p[i];
        if (p[i] < 0) lo = Math.max(lo, ratio); else hi = Math.min(hi, ratio);
        if (lo > hi) return false;
      }
    }
    return true;
  }

  function validateData() {
    for (const name of ORDER.slice(0, 4)) {
      const groups = DATA.terminal[name];
      if (!groups?.rl1.some((point) => point.step === 20) || !groups?.long.some((point) => point.step === 18)) throw new Error(`Missing selected checkpoints: ${name}`);
      for (const [stage, points] of Object.entries(groups)) {
        const steps = new Set();
        for (const point of points) {
          if (!Number.isFinite(point.x) || !Number.isFinite(point.value) || point.value < 0 || point.value > 100 || steps.has(point.step)) throw new Error(`Invalid data: ${name} / ${stage}`);
          steps.add(point.step);
        }
      }
    }
  }
  try { validateData(); } catch (error) {
    $("#load-error").hidden = false;
    $("#load-error").textContent = `Data validation failed: ${error.message}`;
    return;
  }

  const measure = document.createElement("canvas").getContext("2d");
  const textWidths = new Map();
  function textWidth(text, size, bold) {
    const key = `${text}-${size}-${bold}`;
    if (!textWidths.has(key)) {
      measure.font = `${bold ? 700 : 400} ${size}px "DejaVu Sans", Arial, sans-serif`;
      textWidths.set(key, measure.measureText(text).width);
    }
    return textWidths.get(key);
  }

  class Chart {
    constructor(name) {
      this.name = name;
      this.terminal = Boolean(DATA.terminal[name]);
      this.dual = name === "LHTB";
      this.nodes = [];
      this.series = [];
      this.labels = [];
      this.root = svg("g", { "data-benchmark": name, role: "group", "aria-label": DATA.titles[name] }, $("#charts"));
      this.axis = svg("g", { class: "chart-grid", "aria-hidden": "true" }, this.root);
      this.title = svg("text", { class: "chart-title", "text-anchor": "middle" }, this.axis, DATA.titles[name]);
      this.yTitle = svg("text", { class: "axis-text", "text-anchor": "middle" }, this.axis, this.dual ? "Correct tasks" : "Performance (%)");
      this.spines = svg("path", { fill: "none", stroke: C.spine, "stroke-width": 0.7 }, this.axis);
      this.gridLines = [];
      this.xTicks = STAGES.map((stage, i) => ({
        stage,
        line: svg("line", { stroke: "#EEF1F5", "stroke-width": 0.55 }, this.axis),
        text: svg("text", { class: "stage-tick", "text-anchor": "middle" }, this.axis, ["Base", "RSR-1", "RPR-1", "RSR-2", "RPR-2"][i])
      }));
      if (this.dual) this.rightTitle = svg("text", { class: "axis-text", "text-anchor": "middle", fill: C.gray }, this.axis, "Process reward");
      this.dumpLayer = svg("g", {}, this.root);
      this.mainLayer = svg("g", {}, this.root);
      this.effectsLayer = svg("g", { "aria-hidden": "true" }, this.root);
      this.labelLayer = svg("g", {}, this.root);
      this.hitLayer = svg("g", {}, this.root);
      this.pulse = svg("circle", { class: "pulse", fill: "none", stroke: C.blue, "stroke-width": 1.5, opacity: 0 }, this.effectsLayer);
      this.retrace = svg("circle", { class: "retrace", fill: C.blue, r: 4, opacity: 0 }, this.effectsLayer);
      this.byStage = {};
      if (this.terminal) this.buildTerminal(); else this.buildAuxiliary();
      const missingStages = this.terminal ? [] : STAGES.filter((stage) => !DATA.auxiliary[name][stage]);
      if (name === "SWR100" && missingStages.length) {
        this.missing = svg("g", { "aria-label": `${missingStages.map((stage) => STAGE_TITLES[stage]).join(" and ")} not measured; no extrapolation` }, this.root);
        this.missingLine = svg("line", { stroke: "#E3E9F0", "stroke-dasharray": "2 4" }, this.missing);
        this.missingLabel = svg("text", { fill: "#94A3B8", "text-anchor": "middle", "font-size": 10 }, this.missing, "NOT REPORTED");
        this.missingNote = svg("text", { fill: "#A6B1C0", "text-anchor": "middle", "font-size": 9 }, this.missing, "No extrapolation");
      }
      this.setupTicks();
    }

    addNode(record, stage, time, metric = "value") {
      const discarded = stage.includes("dump");
      const selected = (stage === "rl1" && (!this.terminal || record.step === 20)) || (stage === "long" && (!this.terminal || record.step === 18));
      const shape = stage.startsWith("rsr") ? "D" : selected ? "*" : "o";
      const node = { ...record, stage, metric, time, discarded, selected, shape, value: metric === "reward" ? record.reward : metric === "correct" ? record.correct : record.value, final: stage === "long" && selected };
      node.group = svg("g", { opacity: 0, "data-stage": stage, "data-step": record.step ?? "stage", "data-metric": metric, "data-value": node.value, "data-status": discarded ? "Discarded" : "Retained" }, discarded ? this.dumpLayer : this.mainLayer);
      node.mark = svg("path", { class: "node-mark", stroke: discarded || node.final || metric === "reward" ? "none" : "white", "stroke-width": 0.35 }, node.group);
      node.hit = svg("circle", { class: "node-hit", r: 9, tabindex: -1, role: "img", "aria-label": `${DATA.titles[this.name]}, ${STAGE_TITLES[stage]}, ${record.step ? `Step ${record.step}, ` : ""}${metric === "correct" ? `${record.correct}/${record.total}` : fixed(node.value)}, ${discarded ? "Discarded" : "Retained"}`, "data-point": `${this.name}-${stage}-${record.step ?? 0}-${metric}`, visibility: "hidden" }, this.hitLayer);
      node.hit.addEventListener("pointerenter", (event) => showTooltip(this, node, event));
      node.hit.addEventListener("pointermove", positionTooltip);
      node.hit.addEventListener("pointerleave", hideTooltip);
      node.hit.addEventListener("focus", () => showTooltip(this, node));
      node.hit.addEventListener("blur", hideTooltip);
      node.hit.addEventListener("pointerdown", (event) => { event.stopPropagation(); showTooltip(this, node, event); });
      this.nodes.push(node);
      if (!discarded && (stage === "base" || stage.startsWith("rsr") || selected)) {
        const text = metric === "correct" ? `${record.correct}/${record.total}` : fixed(node.value);
        const group = svg("g", { class: "value-label", opacity: 0, "data-label": `${stage}-${metric}` }, this.labelLayer);
        const box = svg("rect", { rx: 2.5, fill: "rgba(255,255,255,0.88)" }, group);
        const labelText = svg("text", { "text-anchor": "middle", "dominant-baseline": "central", fill: metric === "reward" ? C.gray : C.blue }, group, text);
        this.labels.push({ node, group, box, text: labelText, content: text, reward: metric === "reward", base: stage === "base", bold: stage !== "base" && metric !== "reward" });
      }
      return node;
    }

    addSeries(stage, nodes, options = {}) {
      const [start, end] = EVENTS[stage];
      const discarded = stage.includes("dump");
      const group = svg("g", {}, discarded ? this.dumpLayer : this.mainLayer);
      const path = svg("path", { class: "curve", fill: "none", "stroke-width": 1.7, "stroke-linecap": "round", "stroke-linejoin": "round", "data-branch": stage, "data-root-stage": nodes[0].stage, "data-root-step": nodes[0].step ?? "stage" }, group);
      if (stage.startsWith("rsr") && options.metric !== "reward" && !this.dual) attr(path, "stroke-dasharray", "3 2");
      const head = svg("circle", { class: "branch-head", r: 3.6, opacity: 0 }, group);
      const series = { stage, nodes, path, head, start, end, discarded, color: options.metric === "reward" ? C.reward : stage === "base_dump" || stage === "rl2_dump" ? C.light : discarded ? C.gray : C.blue, ...options };
      group.parentNode.insertBefore(group, group.parentNode.firstChild);
      this.series.push(series);
      return series;
    }

    buildTerminal() {
      const groups = DATA.terminal[this.name];
      for (const [stage, points] of Object.entries(groups)) {
        this.byStage[stage] = points.map((record, index) => this.addNode(record, stage, stage === "base" ? 500 : lerp(...EVENTS[stage], (index + 1) / points.length)));
      }
      const first = (stage) => this.byStage[stage][0];
      const selected = this.byStage.rl1.find((node) => node.step === 20);
      const final = this.byStage.long.find((node) => node.step === 18);
      this.selected = selected;
      this.final = final;
      for (const [stage, root] of [["base_dump", first("base")], ["rl1_dump", selected], ["rl2_dump", first("rsr2")], ["long_dump", final], ["rsr1", first("base")], ["rl1", first("rsr1")], ["rsr2", selected], ["long", first("rsr2")]]) {
        if (this.byStage[stage].length) this.addSeries(stage, [root, ...this.byStage[stage]]);
      }
      this.nodes.filter((node) => !node.discarded).forEach((node) => this.hitLayer.appendChild(node.hit));
      const values = this.nodes.map((node) => node.value);
      const lo = Math.min(...values), hi = Math.max(...values), span = Math.max(12, hi - lo);
      this.domain = [lo - span * 0.16, hi + span * 0.38];
      const step = this.name === "TB4" || this.name === "TB3" ? 5 : 20;
      this.tickValues = [];
      for (let value = Math.ceil(Math.max(0, this.domain[0]) / step) * step; value <= Math.min(100, this.domain[1]); value += step) this.tickValues.push(value);
    }

    buildAuxiliary() {
      const stages = DATA.auxiliary[this.name];
      let previous, previousReward;
      for (const stage of STAGES.filter((key) => stages[key])) {
        const record = stages[stage];
        const time = stage === "base" ? 500 : EVENTS[stage][1];
        const node = this.addNode(record, stage, time, this.dual ? "correct" : "value");
        this.byStage[stage] = [node];
        if (previous) this.addSeries(stage, [previous, node], { staircase: true });
        previous = node;
        if (this.dual) {
          const reward = this.addNode(record, stage, time, "reward");
          if (previousReward) this.addSeries(stage, [previousReward, reward], { metric: "reward" });
          previousReward = reward;
        }
      }
      this.final = this.byStage.long?.[0];
      this.selected = this.byStage.rl1[0];
      const maxCorrect = this.dual ? Math.max(...Object.values(stages).map((record) => record.correct)) : 0;
      this.domain = this.dual ? [-maxCorrect * 0.9, maxCorrect * 1.7] : [2.5, 7.5];
      this.tickValues = this.dual ? [0, 2, 4, 6] : [3, 4, 5, 6, 7];
      this.rewardDomain = [0.1, 0.8];
    }

    setupTicks() {
      this.gridLines = this.tickValues.map((value) => ({ value, line: svg("line", { stroke: C.grid, "stroke-width": 0.6 }, this.axis), text: svg("text", { class: "axis-text", "text-anchor": "end", "dominant-baseline": "central" }, this.axis, this.dual ? String(value) : fixed(value)) }));
      if (this.dual) this.rewardTicks = [0.1, 0.3, 0.5, 0.7].map((value) => ({ value, text: svg("text", { fill: C.gray, "text-anchor": "start", "dominant-baseline": "central" }, this.axis, fixed(value)) }));
    }

    layout(rect) {
      const [x, y, w, h] = rect;
      attr(this.root, "transform", `translate(${x},${y})`);
      const key = `${w.toFixed(2)}:${h.toFixed(2)}`;
      if (key === this.layoutKey) return;
      this.layoutKey = key;
      this.w = w; this.h = h;
      const detail = clamp((w - 448) / (1220 - 448));
      const titleSize = this.dual ? 17.2 : lerp(18.5, 26, detail);
      this.tickSize = lerp(12, 15, detail);
      this.labelSize = lerp(14, 19, detail);
      const left = lerp(this.dual ? 52 : 60, 82, detail);
      const right = this.dual ? 56 : lerp(17, 40, detail);
      const top = lerp(49, 70, detail);
      const bottom = h - lerp(39, 49, detail);
      this.plot = { x: left, y: top, w: w - left - right, h: bottom - top };
      this.px = (value) => left + ((value + 0.35) / 7.5) * this.plot.w;
      this.py = (value, metric) => {
        const domain = metric === "reward" ? this.rewardDomain : this.domain;
        return bottom - (value - domain[0]) / (domain[1] - domain[0]) * this.plot.h;
      };
      attr(this.title, "x", w / 2); attr(this.title, "y", 23 + detail * 5); attr(this.title, "font-size", titleSize);
      attr(this.yTitle, "font-size", lerp(11.5, 14, detail));
      attr(this.yTitle, "transform", `translate(${this.dual ? 10 : 12},${(top + bottom) / 2}) rotate(-90)`);
      if (this.dual) {
        this.yTitle.style.fill = C.blue;
        attr(this.rightTitle, "font-size", 10.5);
        attr(this.rightTitle, "transform", `translate(${w - 7},${(top + bottom) / 2}) rotate(-90)`);
      }
      attr(this.spines, "d", `M${left},${top}V${bottom}H${w - right}${this.dual ? `M${w - right},${top}V${bottom}` : ""}`);
      for (const tick of this.gridLines) {
        const yy = this.py(tick.value);
        attr(tick.line, "x1", left); attr(tick.line, "x2", w - right); attr(tick.line, "y1", yy); attr(tick.line, "y2", yy);
        attr(tick.text, "x", left - 8); attr(tick.text, "y", yy); attr(tick.text, "font-size", this.tickSize);
        if (this.dual) tick.text.style.fill = C.blue;
      }
      for (const tick of this.rewardTicks || []) {
        attr(tick.text, "x", w - right + 6); attr(tick.text, "y", this.py(tick.value, "reward")); attr(tick.text, "font-size", 10);
      }
      for (const tick of this.xTicks) {
        const xx = this.px(DATA.stageX[tick.stage]);
        attr(tick.line, "x1", xx); attr(tick.line, "x2", xx); attr(tick.line, "y1", top); attr(tick.line, "y2", bottom + 3);
        attr(tick.line, "opacity", tick.stage === "base" ? 0 : 1);
        attr(tick.text, "x", xx); attr(tick.text, "y", bottom + 23); attr(tick.text, "font-size", this.tickSize);
        if (this.name === "SWR100" && !this.byStage[tick.stage]) tick.text.style.fill = "#A8B5C5";
      }
      for (const node of this.nodes) {
        node.p = [this.px(node.x), this.py(node.value, node.metric)];
        node.r = (node.shape === "*" ? lerp(8.5, 11.5, detail) * (node.final ? 1.3 : 1) : node.shape === "D" ? lerp(5, 6.5, detail) : lerp(node.discarded ? 2.6 : 2.95, 4, detail)) * (node.metric === "reward" ? 0.75 : 1);
        attr(node.group, "transform", `translate(${node.p[0]},${node.p[1]})`);
        attr(node.mark, "d", symbol(node.shape, node.r));
        attr(node.hit, "cx", node.p[0]); attr(node.hit, "cy", node.p[1]); attr(node.hit, "r", Math.max(7, node.r + 2));
      }
      for (const series of this.series) {
        series.coords = series.nodes.map((node) => node.p);
        if (series.staircase) series.coords = [series.coords[0], [series.coords[1][0], series.coords[0][1]], series.coords[1]];
        attr(series.path, "stroke-width", lerp(1.7, 2.2, detail));
      }
      if (this.missing) {
        const xx = this.px(4.95), yy = this.py(5.0);
        attr(this.missingLine, "x1", this.px(3.65)); attr(this.missingLine, "x2", this.px(6.4));
        attr(this.missingLine, "y1", yy - 17); attr(this.missingLine, "y2", yy - 17);
        attr(this.missingLabel, "x", xx); attr(this.missingLabel, "y", yy + 2);
        attr(this.missingNote, "x", xx); attr(this.missingNote, "y", yy + 18);
      }
      this.layoutLabels();
    }

    layoutLabels() {
      const occupied = [];
      const ranks = [];
      const markers = this.nodes.map((node) => ({ x: node.p[0] - node.r - 1.2, y: node.p[1] - node.r - 1.2, w: node.r * 2 + 2.4, h: node.r * 2 + 2.4 }));
      const labels = [...this.labels].sort((a, b) => Number(a.reward) - Number(b.reward) || Number(b.node.final) - Number(a.node.final) || Number(a.base) - Number(b.base) || b.node.value - a.node.value);
      for (const label of labels) {
        const { node, base, reward } = label;
        const size = base ? this.labelSize * 0.72 : reward ? this.labelSize * 0.76 : this.labelSize;
        const width = textWidth(label.content, size, label.bold) + 7;
        const height = size + 4;
        const defaultDY = (reward ? 1 : -1) * (node.r + height / 2 + 5);
        let targetDX = 0;
        if (this.name === "TB4" && !base && !reward && !node.final) targetDX = node.stage === "rl1" ? -16 : -9;
        const sameValue = ranks.find((rank) => rank.metric === node.metric && Math.abs(rank.value - node.value) < 1e-8);
        const dxs = node.final ? [0] : [targetDX, 0, -6, 6, -12, 12, -20, 20, -28, 28, -38, 38];
        const dys = [defaultDY, ...[0, 8, 16, 24, 34, 46, 60].map((offset) => defaultDY + (reward ? offset : -offset))];
        if (sameValue && !base) dys.unshift(sameValue.y - node.p[1]);
        let best = null;
        for (const dy of dys) {
          for (const dx of dxs) {
            const cx = node.p[0] + dx, cy = node.p[1] + dy;
            const box = { x: cx - width / 2, y: cy - height / 2, w: width, h: height };
            const outside = box.x < this.plot.x + 1 || box.x + box.w > this.plot.x + this.plot.w - 1 || box.y < this.plot.y - 6 || box.y + box.h > this.plot.y + this.plot.h + (base ? 7 : -2);
            const wrongSide = reward ? box.y <= node.p[1] + node.r : box.y + box.h >= node.p[1] - node.r;
            let cost = (outside ? 1e8 : 0) + (wrongSide ? 1e7 : 0) + Math.abs(dx - targetDX) * 1.5 + Math.abs(dy - defaultDY);
            cost += occupied.filter((other) => intersects(box, other, 3)).length * 1e6;
            cost += markers.filter((other) => intersects(box, other, 1)).length * 1e5;
            for (const series of this.series) {
              for (let i = 1; i < series.coords.length; i++) if (segmentIntersectsBox(series.coords[i - 1], series.coords[i], box)) cost += 30;
            }
            if (!base && !reward) {
              for (const rank of ranks.filter((entry) => entry.metric === node.metric && !entry.base)) {
                if (Math.abs(rank.value - node.value) < 1e-8) cost += Math.abs(rank.y - cy) * 20;
                else if ((rank.value - node.value) * (cy - rank.y) < 0) cost += 50000;
              }
            }
            if (!best || cost < best.cost) best = { cost, box, cx, cy };
          }
        }
        occupied.push(best.box);
        ranks.push({ value: node.value, metric: node.metric, y: best.cy, base });
        label.boxGeometry = best.box;
        attr(label.group, "transform", `translate(${best.cx},${best.cy})`);
        attr(label.box, "x", -width / 2); attr(label.box, "y", -height / 2); attr(label.box, "width", width); attr(label.box, "height", height);
        attr(label.text, "font-size", size); attr(label.text, "font-weight", label.bold ? 700 : 400);
      }
    }

    render(time, opacity = 1) {
      attr(this.dumpLayer, "opacity", opacity); attr(this.mainLayer, "opacity", opacity); attr(this.labelLayer, "opacity", opacity); attr(this.effectsLayer, "opacity", opacity);
      this.currentTime = time;
      for (const series of this.series) {
        const progress = clamp((time - series.start) / (series.end - series.start));
        const pruning = series.discarded ? ease((time - series.end) / 650) : 0;
        const color = series.discarded ? blend(C.blue, series.color, pruning) : series.color;
        attr(series.path, "d", partialPath(series.coords, progress));
        attr(series.path, "stroke", color); attr(series.path, "opacity", 1 - pruning * 0.3);
        const moving = progress > 0 && progress < 1;
        attr(series.head, "opacity", moving ? 0.75 : 0);
        if (moving) {
          const head = along(series.coords, progress);
          attr(series.head, "cx", head[0]); attr(series.head, "cy", head[1]); attr(series.head, "fill", color);
        }
      }
      for (const node of this.nodes) {
        const reveal = ease((time - node.time) / 200);
        const pruning = node.discarded ? ease((time - EVENTS[node.stage][1]) / 650) : 0;
        const baseColor = node.stage === "base_dump" || node.stage === "rl2_dump" ? C.light : C.gray;
        const color = node.metric === "reward" ? C.reward : node.discarded ? blend(C.blue, baseColor, pruning) : C.blue;
        attr(node.group, "opacity", reveal * (1 - pruning * 0.3));
        attr(node.mark, "fill", color);
        attr(node.mark, "transform", reveal > 0 && reveal < 1 ? `scale(${0.75 + reveal * 0.25})` : "scale(1)");
        const interactive = reveal > 0.6 && opacity > 0.5;
        attr(node.hit, "visibility", interactive ? "visible" : "hidden");
        attr(node.hit, "tabindex", interactive ? 0 : -1);
      }
      for (const label of this.labels) attr(label.group, "opacity", ease((time - label.node.time - 100) / 350));
      if (this.missing) attr(this.missing, "opacity", ease((time - EVENTS.rsr2[0]) / 600) * opacity);
      this.renderEffects(time);
    }

    renderEffects(time) {
      let pulseNode = null, elapsed = 0;
      for (const [start, stage] of [[5000, "rsr1"], [8350, "rl1"], [12000, "rl1"], [14000, "rsr2"], [17800, "rsr2"], [21600, "long"]]) {
        if (time >= start && time < start + 1050 && this.byStage[stage]) {
          pulseNode = stage === "rl1" ? this.selected : stage === "long" ? this.final : this.byStage[stage][0];
          elapsed = (time - start) / 1050;
        }
      }
      attr(this.pulse, "opacity", pulseNode ? (1 - elapsed) * 0.5 : 0);
      if (pulseNode) {
        attr(this.pulse, "cx", pulseNode.p[0]); attr(this.pulse, "cy", pulseNode.p[1]); attr(this.pulse, "r", pulseNode.r + 3 + ease(elapsed) * 18);
      }
      let returnPath = null, progress = 0;
      if (this.terminal) {
        for (const [start, end, stage] of [[11400, 12400, "rl1_dump"], [17300, 17900, "rl2_dump"]]) {
          if (time >= start && time <= end) {
            returnPath = this.series.find((series) => series.stage === stage).coords;
            progress = (time - start) / (end - start);
          }
        }
      }
      attr(this.retrace, "opacity", returnPath ? Math.sin(Math.PI * progress) * 0.95 : 0);
      if (returnPath) {
        const position = along(returnPath, 1 - ease(progress));
        attr(this.retrace, "cx", position[0]); attr(this.retrace, "cy", position[1]);
      }
    }
  }

  const LAYOUTS = [
    { TB4: [82, 66, 1236, 521] },
    { TB4: [26, 66, 657, 255], TB3: [715, 66, 657, 255], "TB2.1": [26, 336, 657, 255], TBH: [715, 336, 657, 255] },
    { TB4: [18, 66, 446, 255], TB3: [474, 66, 446, 255], "TB2.1": [930, 66, 446, 255], TBH: [18, 336, 446, 255], LHTB: [474, 336, 446, 255], SWR100: [930, 336, 446, 255] }
  ];
  const charts = ORDER.map((name) => new Chart(name));
  const legend = $("#legend");
  for (const [x, label, shape, color, dashed] of [[310, "RPR", "*", C.blue, false], [497, "RSR", "D", C.blue, true], [684, "RPR Process", "o", C.reward, false], [943, "Discard RPR", "o", C.gray, false]]) {
    const item = svg("g", { transform: `translate(${x},0)` }, legend);
    const line = svg("line", { x1: 0, x2: 39, y1: -4, y2: -4, stroke: color, "stroke-width": 1.7 }, item);
    if (dashed) attr(line, "stroke-dasharray", "3 2");
    svg("path", { d: symbol(shape, shape === "*" ? 7.3 : shape === "D" ? 4.5 : 2.9), fill: color, transform: "translate(19.5,-4)" }, item);
    svg("text", { x: 50, y: 0, fill: label === "RPR" || label === "RSR" ? C.blue : "#64748B", "font-size": 12, "font-weight": label === "RPR" || label === "RSR" ? 700 : 400 }, item, label);
  }

  let time = 0;
  let speed = 1;
  let playing = !embedded && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = null;
  let lastStamp = null;
  let lastNarrative = "";
  let currentChapter = 0;
  let tooltipTarget = null;
  let beforeDialog = false;
  const timeline = $("#timeline");
  timeline.max = TOTAL;
  $("#total-time").textContent = fmtTime(TOTAL);
  $("#record-count").textContent = Object.values(DATA.terminal).reduce((total, groups) => total + Object.values(groups).reduce((count, points) => count + points.length, 0), 0) + Object.values(DATA.auxiliary).reduce((count, stages) => count + Object.keys(stages).length, 0);
  $("#source-hash").textContent = DATA.sourceSHA256;

  function render() {
    const chapter = panoramaOnly ? 2 : time >= STARTS[2] ? 2 : time >= STARTS[1] ? 1 : 0;
    const local = panoramaOnly ? time / TOTAL * RUN : time - STARTS[chapter];
    const morphing = chapter < 2 && local >= RUN + HOLD;
    const rawMorph = morphing ? clamp((local - RUN - HOLD) / MORPH) : 0;
    const mix = ease(rawMorph);
    const target = morphing ? chapter + 1 : chapter;
    const visibleChapter = morphing && mix > 0.5 ? target : chapter;
    currentChapter = visibleChapter;
    for (const chart of charts) {
      const from = LAYOUTS[chapter][chart.name];
      const to = LAYOUTS[target][chart.name];
      if (!from && !to) { attr(chart.root, "display", "none"); continue; }
      attr(chart.root, "display", "inline");
      let rect = from || to;
      if (morphing) {
        const initial = from || [to[0] + to[2] * 0.025, to[1] + 12, to[2] * 0.95, to[3] * 0.95];
        rect = initial.map((value, i) => lerp(value, to[i], mix));
      }
      chart.layout(rect);
      attr(chart.root, "opacity", from ? 1 : mix);
      attr(chart.root, "aria-hidden", from || mix > 0.5 ? "false" : "true");
      chart.render(from ? Math.min(local, RUN + HOLD) : 0, morphing ? from ? 1 - ease((rawMorph - 0.3) / 0.7) : 0 : 1);
    }
    $("#chapter-label").textContent = panoramaOnly ? "PANORAMA / SIX BENCHMARKS, ONE RECURSION" : CHAPTERS[visibleChapter];
    $("#chapter-status").textContent = CHAPTER_STATUS[visibleChapter];
    $("#visualization").dataset.chapter = visibleChapter;
    $("#visualization").dataset.time = Math.round(time);
    $("#visualization").dataset.transitioning = String(morphing);
    attr(legend, "opacity", visibleChapter === 2 ? 1 : 0.84);
    const event = panoramaOnly && time >= TOTAL
      ? [RUN, "Terminal-RSI-27B retained", "Final selected checkpoint: RPR-2 SPR step 18. Discarded branches remain visible.", "FINAL RETAINED"]
      : [...NARRATIVE].reverse().find((entry) => local >= entry[0]) || NARRATIVE[0];
    const narrativeKey = morphing ? `morph-${target}` : `${chapter}-${event[0]}`;
    if (lastNarrative !== narrativeKey) {
      lastNarrative = narrativeKey;
      $("#event-index").textContent = morphing ? "→" : String(panoramaOnly && time >= TOTAL ? NARRATIVE.length : NARRATIVE.indexOf(event) + 1).padStart(2, "0");
      $("#event-title").textContent = morphing ? target === 1 ? "From one suite to four" : "The complete picture" : event[1];
      $("#event-detail").textContent = morphing ? "The same measured training history, seen across a wider evaluation space." : event[2];
      $("#event-tag").textContent = morphing ? "CHANGE PERSPECTIVE" : event[3];
      $("#live-status").textContent = `${CHAPTER_STATUS[visibleChapter]}. ${$("#event-title").textContent}. ${$("#event-detail").textContent}`;
    }
    timeline.value = Math.round(time);
    timeline.style.setProperty("--progress", `${time / TOTAL * 100}%`);
    timeline.setAttribute("aria-valuetext", `${CHAPTER_STATUS[visibleChapter]}, elapsed ${fmtTime(time)}`);
    $("#current-time").textContent = fmtTime(time);
    document.querySelectorAll("button[data-chapter]").forEach((button) => {
      const selected = Number(button.dataset.chapter) === visibleChapter;
      button.classList.toggle("active", selected);
      if (selected) button.setAttribute("aria-current", "step"); else button.removeAttribute("aria-current");
    });
    if (tooltipTarget && (morphing || tooltipTarget.node.hit.getAttribute("visibility") !== "visible" || tooltipTarget.chart.root.getAttribute("display") === "none")) hideTooltip();
  }

  function tick(stamp) {
    frame = null;
    if (!playing || document.hidden || !externallyVisible) { lastStamp = null; return; }
    if (lastStamp !== null) time = Math.min(TOTAL, time + (stamp - lastStamp) * speed);
    lastStamp = stamp;
    render();
    if (time >= TOTAL) { playing = false; updateTransport(); lastStamp = null; window.dispatchEvent(new CustomEvent("rsi:ended")); return; }
    frame = requestAnimationFrame(tick);
  }
  function schedule() {
    if (playing && !document.hidden && externallyVisible && frame === null) frame = requestAnimationFrame(tick);
  }
  function updateTransport() {
    $("#play-text").textContent = playing ? "Pause" : time >= TOTAL ? "Replay" : "Play";
    $("#play-toggle").setAttribute("aria-label", playing ? "Pause animation" : "Play animation");
    attr($("#play-glyph"), "d", playing ? "M4 3h3v10H4zm5 0h3v10H9z" : "M4 2.5L13 8L4 13.5Z");
    document.body.dataset.playing = String(playing);
    publishPlayerState();
  }
  function pause() {
    playing = false;
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null; lastStamp = null; updateTransport();
  }
  function play() {
    if (time >= TOTAL) time = 0;
    playing = true; lastStamp = null; updateTransport(); render(); schedule();
  }
  function seek(value) {
    time = clamp(Number(value) || 0, 0, TOTAL);
    lastStamp = null; hideTooltip(); render();
    if (time >= TOTAL) pause(); else updateTransport();
  }
  function jump(chapter) {
    seek(STARTS[chapter]);
    play();
  }

  function tooltipLine(label, value) {
    const row = document.createElement("div"); row.className = "tooltip-line";
    const key = document.createElement("span"); key.textContent = label;
    const content = document.createElement("b"); content.textContent = value;
    row.append(key, content); return row;
  }
  function showTooltip(chart, node, event) {
    const tooltip = $("#tooltip");
    tooltip.replaceChildren();
    const title = document.createElement("div"); title.className = "tooltip-heading"; title.textContent = DATA.titles[chart.name];
    const subtitle = document.createElement("div"); subtitle.className = "tooltip-stage"; subtitle.textContent = STAGE_TITLES[node.stage];
    tooltip.append(title, subtitle, tooltipLine("Training step", node.step ? String(node.step) + (node.final ? " · Final" : "") : "— · Stage checkpoint"));
    if (chart.dual) {
      tooltip.append(tooltipLine("Correct tasks", `${node.correct} / ${node.total}`), tooltipLine("Process reward", fixed(node.reward)));
    } else tooltip.append(tooltipLine("Performance (%)", fixed(node.value)));
    const status = document.createElement("div"); status.className = `tooltip-status${node.discarded ? " discarded" : ""}`;
    status.textContent = node.discarded ? "Discarded · Not carried forward" : node.final ? "Retained · Final selected checkpoint" : node.selected ? "Retained · Root for the next phase" : "Retained · Main training trajectory";
    tooltip.append(status);
    const coincident = chart.nodes.filter((other) => other !== node && other.metric === node.metric && other.time <= chart.currentTime && Math.hypot(other.p[0] - node.p[0], other.p[1] - node.p[1]) < 0.1);
    for (const other of coincident) {
      const detail = document.createElement("div");
      detail.className = "tooltip-status discarded";
      detail.textContent = `Coincident record: ${STAGE_TITLES[other.stage]} · Step ${other.step} · ${fixed(other.value)} · ${other.discarded ? "Discarded" : "Retained"}`;
      tooltip.append(detail);
    }
    tooltip.hidden = false;
    tooltipTarget = { chart, node };
    node.hit.setAttribute("aria-describedby", "tooltip");
    if (event) positionTooltip(event);
    else {
      const box = node.hit.getBoundingClientRect();
      positionTooltip({ clientX: box.x + box.width / 2, clientY: box.y + box.height / 2 });
    }
  }
  function positionTooltip(event) {
    const tooltip = $("#tooltip");
    if (tooltip.hidden) return;
    const width = tooltip.offsetWidth, height = tooltip.offsetHeight;
    let x = event.clientX + 16, y = event.clientY - height - 12;
    if (x + width > window.innerWidth - 12) x = event.clientX - width - 16;
    if (y < 12) y = event.clientY + 18;
    tooltip.style.left = `${clamp(x, 12, Math.max(12, window.innerWidth - width - 12))}px`;
    tooltip.style.top = `${clamp(y, 12, Math.max(12, window.innerHeight - height - 12))}px`;
  }
  function hideTooltip() {
    $("#tooltip").hidden = true;
    tooltipTarget?.node.hit.removeAttribute("aria-describedby");
    tooltipTarget = null;
  }

  $("#play-toggle").addEventListener("click", () => playing ? pause() : play());
  $("#replay").addEventListener("click", () => { seek(0); play(); });
  document.querySelectorAll("button[data-chapter]").forEach((button) => button.addEventListener("click", () => jump(Number(button.dataset.chapter))));
  document.querySelectorAll("button[data-speed]").forEach((button) => button.addEventListener("click", () => {
    speed = Number(button.dataset.speed);
    document.querySelectorAll("button[data-speed]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active); item.setAttribute("aria-pressed", String(active));
    });
  }));
  timeline.addEventListener("input", () => seek(timeline.value));
  timeline.addEventListener("pointerdown", hideTooltip);
  document.addEventListener("visibilitychange", () => {
    lastStamp = null;
    if (document.hidden && frame !== null) { cancelAnimationFrame(frame); frame = null; }
    else schedule();
  });
  window.addEventListener("resize", hideTooltip);
  document.addEventListener("pointerdown", (event) => { if (!event.target.closest(".node-hit")) hideTooltip(); });
  document.addEventListener("keydown", (event) => {
    if ($("#source-dialog").open || event.target.closest("input, textarea, select, [contenteditable=true]") || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.code === "Space" && !event.target.closest("button")) { event.preventDefault(); playing ? pause() : play(); }
    else if (event.key.toLowerCase() === "r") { seek(0); play(); }
    else if (["1", "2", "3"].includes(event.key)) jump(Number(event.key) - 1);
    else if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); seek(time + (event.key === "ArrowRight" ? 1000 : -1000)); }
    else if (event.key === "Home") { event.preventDefault(); seek(STARTS[currentChapter]); }
    else if (event.key === "End") { event.preventDefault(); seek(STARTS[currentChapter] + RUN); pause(); }
    else if (event.key === "Escape") hideTooltip();
  });
  $("#source-open").addEventListener("click", () => {
    beforeDialog = playing; pause(); hideTooltip(); $("#source-dialog").showModal();
  });
  $("#source-close").addEventListener("click", () => $("#source-dialog").close());
  $("#source-dialog").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      const box = event.currentTarget.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.currentTarget.close();
    }
  });
  $("#source-dialog").addEventListener("close", () => { if (beforeDialog) play(); });
  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (event) => {
    if (event.matches) { pause(); seek(TOTAL); }
  });
  function stepForward() {
    pause();
    const chapter = time >= STARTS[2] ? 2 : time >= STARTS[1] ? 1 : 0;
    const local = time - STARTS[chapter];
    const next = NARRATIVE.find(entry => entry[0] > local + 1);
    seek(next ? STARTS[chapter] + next[0] : chapter < 2 ? STARTS[chapter + 1] : TOTAL);
  }
  $("#step-forward").addEventListener("click", stepForward);
  window.RSI_PLAYER = Object.freeze({
    play, pause, seek, step: stepForward,
    jump: (chapter) => { if (Number.isInteger(chapter) && chapter >= 0 && chapter < STARTS.length) jump(chapter); },
    setVisible: (visible) => {
      const nextVisible = Boolean(visible);
      if (externallyVisible !== nextVisible) {
        externallyVisible = nextVisible;
        lastStamp = null;
        if (!externallyVisible && frame !== null) { cancelAnimationFrame(frame); frame = null; }
        else schedule();
        publishPlayerState();
      }
    },
    getState: () => ({ time, playing, speed, chapter: currentChapter, duration: TOTAL, visible: externallyVisible })
  });
  const playerChannel = "terminal-rsi-player-v1";
  const parentURL = new URL(document.referrer || location.href);
  const parentOrigin = parentURL.protocol === "file:" ? "null" : parentURL.origin;
  function publishPlayerState(type = "state") {
    if (!embedded || window.parent === window) return;
    window.parent.postMessage(
      { channel: playerChannel, type, state: window.RSI_PLAYER.getState() },
      parentOrigin === "null" ? "*" : parentOrigin,
    );
  }
  window.addEventListener("message", event => {
    if (!embedded || event.source !== window.parent || event.origin !== parentOrigin) return;
    const message = event.data;
    if (!message || message.channel !== playerChannel) return;
    switch (message.command) {
      case "hello": publishPlayerState("ready"); break;
      case "visible":
        if (typeof message.value === "boolean") window.RSI_PLAYER.setVisible(message.value);
        break;
      case "replay": speed = 1; seek(0); play(); break;
      case "finish": pause(); seek(TOTAL); break;
      case "pause": pause(); break;
    }
  });
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) time = TOTAL;
  else if (embedded && !panoramaOnly) time = RUN;
  render(); updateTransport(); schedule();
  publishPlayerState("ready");
})();
