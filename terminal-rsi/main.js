(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];
  const research = window.TERMINAL_RESEARCH;
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const blue = "#0052D9";
  const font =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';
  const numberFormat = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false,
  });
  const fmt = (value) => numberFormat.format(value);
  const announce = (text) => {
    $("#announcement").textContent = text;
  };
  if (!research) {
    announce("Interactive data could not be loaded. Please consult the paper.");
    return;
  }

  document.documentElement.classList.add("js");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.04, rootMargin: "0px 0px -24px 0px" },
  );
  $$(".reveal").forEach((el) => revealObserver.observe(el));
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>
      entry.target.classList.toggle(
        "motion-paused",
        !entry.isIntersecting || document.hidden,
      ),
    );
  });
  $$(".screen").forEach((el) => sectionObserver.observe(el));

  let scrollFrame = null;
  function updateNavigation() {
    scrollFrame = null;
    const height = document.documentElement.scrollHeight - innerHeight;
    $("#reading-progress").style.transform =
      `scaleX(${height > 0 ? Math.min(1, Math.max(0, scrollY / height)) : 0})`;
    const sections = $$("main > section[id]");
    const current =
      [...sections]
        .reverse()
        .find((el) => el.getBoundingClientRect().top <= innerHeight * 0.4) ||
      sections[0];
    $$("#main-nav a, .page-rail a").forEach((a) => {
      if (a.hash === `#${current.id}`)
        a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
  }
  addEventListener(
    "scroll",
    () => {
      if (scrollFrame === null)
        scrollFrame = requestAnimationFrame(updateNavigation);
    },
    { passive: true },
  );
  function closeMenu() {
    $("#main-nav").classList.remove("is-open");
    $("#menu-toggle").setAttribute("aria-expanded", "false");
  }
  $("#menu-toggle").addEventListener("click", () => {
    const open = $("#menu-toggle").getAttribute("aria-expanded") !== "true";
    $("#menu-toggle").setAttribute("aria-expanded", String(open));
    $("#main-nav").classList.toggle("is-open", open);
  });
  $$("#main-nav a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      $("#main-nav").classList.contains("is-open")
    ) {
      closeMenu();
      $("#menu-toggle").focus();
    }
  });
  updateNavigation();

  const iframe = $("#trajectory-frame");
  const playerChannel = "terminal-rsi-player-v1";
  const playerURL = new URL(iframe.src, location.href);
  const playerOrigin =
    playerURL.protocol === "file:" ? "null" : playerURL.origin;
  let frameStarted = false,
    frameVisible = false,
    frameReady = false;
  let lastFrameVisibility = null,
    playerState = null;
  function sendPlayerCommand(command, value) {
    iframe.contentWindow?.postMessage(
      { channel: playerChannel, command, value },
      playerOrigin === "null" ? "*" : playerOrigin,
    );
  }
  function resizeFrame() {
    if (iframe.clientWidth)
      iframe.style.height = `${Math.ceil((iframe.clientWidth - 32) / 2 + 24)}px`;
  }
  function updatePanoramaStatus() {
    if (!frameReady) {
      $("#panorama-status").textContent = "Loading panorama…";
      return;
    }
    $("#panorama-status").textContent =
      motion.matches && !frameStarted
        ? "Reduced motion · press Replay"
        : playerState?.time >= playerState?.duration
          ? "Terminal-RSI-27B · retained"
          : playerState?.playing
            ? playerState.visible
              ? "Playing · 7 seconds"
              : "Paused offscreen"
            : "Ready · plays on entry";
  }
  function syncFrame() {
    if (!frameReady) return;
    const visible = frameVisible && !document.hidden;
    if (visible !== lastFrameVisibility) {
      lastFrameVisibility = visible;
      sendPlayerCommand("visible", visible);
    }
    if (visible && !frameStarted && !motion.matches) {
      frameStarted = true;
      sendPlayerCommand("replay");
    }
    updatePanoramaStatus();
  }
  addEventListener("message", (event) => {
    if (event.source !== iframe.contentWindow || event.origin !== playerOrigin)
      return;
    const message = event.data;
    if (
      !message ||
      message.channel !== playerChannel ||
      !["ready", "state"].includes(message.type)
    )
      return;
    if (
      !message.state ||
      !Number.isFinite(message.state.time) ||
      !Number.isFinite(message.state.duration)
    )
      return;
    playerState = message.state;
    if (message.type === "ready") {
      frameReady = true;
      syncFrame();
    }
    updatePanoramaStatus();
  });
  iframe.addEventListener("load", () => {
    resizeFrame();
    sendPlayerCommand("hello");
  });
  const frameObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      frameVisible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
      syncFrame();
    },
    { threshold: [0, 0.35], rootMargin: "-76px 0px -24px 0px" },
  );
  frameObserver.observe($(".trajectory-scroll"));
  new ResizeObserver(resizeFrame).observe($(".trajectory-scroll"));
  sendPlayerCommand("hello");
  $("#panorama-replay").addEventListener("click", () => {
    if (!frameReady) {
      sendPlayerCommand("hello");
      return;
    }
    frameStarted = true;
    sendPlayerCommand("replay");
  });

  function sourceTitle(key) {
    return key === "TBH"
      ? "Terminal-Bench Hard"
      : `Terminal-Bench ${key === "TB4" ? "4.0" : key === "TB3" ? "3.0" : "2.1"}`;
  }
  const chartSpecs = new Map([
    ["hero-tb4", { key: "TB4", kind: "hero" }],
    ["hero-tb21", { key: "TB2.1", kind: "hero" }],
    ["chart-tb4", { key: "TB4", kind: "stage" }],
    ["chart-tb21", { key: "TB2.1", kind: "stage" }],
    ["chart-tb3", { key: "TB3", kind: "stage" }],
    ["chart-hard", { key: "TBH", kind: "stage" }],
    ["chart-frontier-tb4", { key: "TB4", kind: "frontier" }],
    ["chart-frontier-tb21", { key: "TB2.1", kind: "frontier" }],
  ]);
  const charts = new Map();
  const checkpointColors = ["#C3D8FA", "#95BBF3", "#6299EA", "#3075E2", blue];
  const heroStar =
    "path://" +
    Array.from({ length: 10 }, (_, index) => {
      const angle = -Math.PI / 2 + (index * Math.PI) / 5;
      const radius = index % 2 ? 0.382 : 1;
      return `${index ? "L" : "M"}${Math.cos(angle) * radius},${Math.sin(angle) * radius}`;
    }).join("") +
    "Z";
  function scoreDescription(key, stages, values) {
    return `${sourceTitle(key)}. ${stages.map((stage, i) => `${stage}: ${fmt(values[i])} percent`).join("; ")}.`;
  }
  function progressionOption(key, hero, width) {
    const values = hero ? research.retained[key] : research.progression[key];
    const stages = hero ? research.stages : research.progressionStages;
    const max = key === "TB4" ? 25 : key === "TB3" ? 20 : 100;
    const small = width < 320;
    const description = scoreDescription(key, stages, values);
    return {
      animation: !motion.matches,
      animationDuration: hero ? 850 : 1000,
      animationEasing: "cubicOut",
      textStyle: { fontFamily: font },
      aria: { enabled: true, label: { description } },
      grid: {
        left: hero ? 40 : 34,
        right: hero ? 27 : 18,
        top: hero ? 22 : 40,
        bottom: hero ? 27 : 80,
      },
      tooltip: {
        trigger: "axis",
        confine: true,
        renderMode: "richText",
        axisPointer: { type: hero ? "line" : "shadow" },
        formatter: (params) =>
          `${sourceTitle(key)}\n${params[0].axisValue}: ${fmt(params[0].value)}%`,
        textStyle: { fontFamily: font, fontSize: 11 },
      },
      xAxis: {
        type: "category",
        data: stages,
        boundaryGap: !hero,
        axisTick: { show: false },
        axisLine: { lineStyle: { color: "#DCE3ED" } },
        axisLabel: {
          interval: 0,
          color: "#65738A",
          fontSize: hero ? 9 : small ? 8 : 9,
          margin: 12,
          lineHeight: 12,
          formatter: (value) =>
            value === "Terminal-RSI-27B"
              ? "Terminal-\nRSI-27B"
              : !hero && value.includes("-")
                ? value.replace("-", "-\n")
                : value,
        },
      },
      yAxis: {
        type: "value",
        min: hero && key === "TB2.1" ? 50 : 0,
        max,
        interval: hero && key === "TB2.1" ? 25 : undefined,
        splitNumber: hero ? 2 : 4,
        name: hero ? "" : "Performance (%)",
        nameGap: 20,
        nameTextStyle: { align: "left", color: "#65738A", fontSize: 10 },
        axisLabel: {
          fontSize: 9,
          color: "#7B889A",
          formatter: hero ? "{value}%" : "{value}",
        },
        splitLine: { lineStyle: { color: "#E8EDF5", type: "dashed" } },
      },
      series: [
        {
          name: "Success (%)",
          type: hero ? "line" : "bar",
          smooth: false,
          symbol: "circle",
          symbolSize: 5,
          barMaxWidth: 34,
          data: hero
            ? values.map((value, index) => {
                const symbolSize =
                  index === 4
                    ? 14 * 1.3
                    : index === 2
                      ? 14
                      : index === 0
                        ? 5
                        : 8;
                return {
                  value,
                  symbol:
                    index === 2 || index === 4
                      ? heroStar
                      : index === 1 || index === 3
                        ? "diamond"
                        : "circle",
                  symbolSize,
                  symbolKeepAspect: true,
                  label: { distance: 14 - symbolSize / 2 },
                };
              })
            : values.map((value, index) => ({
                value,
                itemStyle: { color: checkpointColors[index] },
              })),
          lineStyle: { color: blue, width: 2 },
          itemStyle: { color: blue, borderRadius: hero ? 0 : [3, 3, 0, 0] },
          areaStyle: hero ? { color: "#0052D90D" } : undefined,
          label: {
            show: true,
            position: "top",
            distance: hero ? 8 : 7,
            color: blue,
            fontFamily: font,
            fontSize: hero ? 9 : small ? 8 : 10,
            formatter: (p) => `${fmt(p.value)}%`,
          },
          emphasis: hero ? { itemStyle: { color: blue } } : { disabled: true },
          animationDelay: (index) => index * 65,
        },
      ],
    };
  }
  function frontierOption(key, width) {
    const rows = research.frontier
      .filter((row) => row[key] !== null)
      .sort((a, b) => b[key] - a[key]);
    const compact = width < 440;
    const labelSize = compact ? 9 : 11;
    return {
      animation: !motion.matches,
      animationDuration: 900,
      textStyle: { fontFamily: font },
      aria: {
        enabled: true,
        label: {
          description: `${sourceTitle(key)}. Author-supplied reference scores. ${rows.map((row) => `${row.name}: ${fmt(row[key])} percent`).join("; ")}.`,
        },
      },
      grid: {
        left: compact ? 144 : 181,
        right: compact ? 48 : 57,
        top: 10,
        bottom: 45,
      },
      tooltip: {
        trigger: "item",
        confine: true,
        renderMode: "richText",
        formatter: (p) =>
          `${rows[p.dataIndex].name}\n${rows[p.dataIndex].effort} · ${fmt(p.value)}%`,
        textStyle: { fontSize: 11 },
      },
      xAxis: {
        type: "value",
        min: 0,
        max: key === "TB4" ? 60 : 100,
        splitNumber: compact ? 2 : 5,
        name: "Performance (%)",
        nameLocation: "middle",
        nameGap: 28,
        nameTextStyle: { fontSize: 10, color: "#65738A" },
        axisLabel: { fontSize: 10, color: "#7B889A" },
        splitLine: { lineStyle: { color: "#EDF1F6", type: "dashed" } },
      },
      yAxis: {
        type: "category",
        inverse: true,
        data: rows.map((row) => row.name),
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          interval: 0,
          margin: 9,
          fontSize: labelSize,
          color: "#65738A",
          formatter: (name, i) =>
            rows[i].ours
              ? "{ours|Terminal-RSI-27B (Ours)}"
              : rows[i].base
                ? "{base|Qwen3.8-27B (Base)}"
                : name,
          rich: {
            ours: { color: blue, fontWeight: 700, fontSize: labelSize },
            base: { color: "#55637A", fontWeight: 550, fontSize: labelSize },
          },
        },
      },
      series: [
        {
          type: "bar",
          name: "Success (%)",
          barMaxWidth: 15,
          data: rows.map((row) => ({
            value: row[key],
            itemStyle: {
              color: row.ours ? blue : row.base ? "#909399" : "#C0C4CC",
              borderRadius: [0, 3, 3, 0],
            },
            label: {
              color: row.ours ? blue : "#65738A",
              fontWeight: row.ours ? 700 : 400,
            },
          })),
          label: {
            show: true,
            position: "right",
            distance: 5,
            fontSize: compact ? 9 : 11,
            formatter: (p) => `${fmt(p.value)}%`,
          },
          emphasis: { disabled: true },
        },
      ],
    };
  }
  function chartOption(id) {
    const spec = chartSpecs.get(id),
      width = $(`#${id}`).clientWidth;
    return spec.kind === "frontier"
      ? frontierOption(spec.key, width)
      : progressionOption(spec.key, spec.kind === "hero", width);
  }
  function initChart(id) {
    if (charts.has(id)) return;
    const element = $(`#${id}`);
    if (!window.echarts) {
      element.textContent =
        "Interactive chart unavailable. Exact values are listed in the data table.";
      $("#data-table-panel").hidden = false;
      $("#show-data").setAttribute("aria-expanded", "true");
      return;
    }
    const chart = echarts.init(element, null, { renderer: "svg" });
    charts.set(id, chart);
    chart.setOption(chartOption(id));
  }
  const chartObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initChart(entry.target.id);
          chartObserver.unobserve(entry.target);
        }
      }),
    { rootMargin: "100px" },
  );
  const resizeObserver = new ResizeObserver((entries) =>
    entries.forEach((entry) => {
      const chart = charts.get(entry.target.id);
      if (chart && entry.contentRect.width > 0) {
        chart.resize();
        chart.setOption(chartOption(entry.target.id));
      }
    }),
  );
  chartSpecs.forEach((_, id) => {
    chartObserver.observe($(`#${id}`));
    resizeObserver.observe($(`#${id}`));
  });

  function appendTableRow(table, values, className = "") {
    const row = document.createElement("tr");
    row.className = className;
    values.forEach((value, i) => {
      const cell = document.createElement(i ? "td" : "th");
      if (!i) cell.scope = "row";
      cell.textContent = value;
      row.append(cell);
    });
    $("tbody", table).append(row);
  }
  research.keys.forEach((key) =>
    appendTableRow($("#stage-table"), [
      sourceTitle(key),
      ...research.progression[key].map(fmt),
    ]),
  );
  research.frontier.forEach((row) =>
    appendTableRow(
      $("#frontier-table"),
      [
        row.name,
        ...["TB4", "TB2.1"].map((key) =>
          row[key] === null ? "—" : fmt(row[key]),
        ),
      ],
      row.ours ? "ours" : "",
    ),
  );
  $("#show-data").addEventListener("click", () => {
    const panel = $("#data-table-panel");
    panel.hidden = !panel.hidden;
    $("#show-data").setAttribute("aria-expanded", String(!panel.hidden));
    $("#show-data").textContent = panel.hidden
      ? "Inspect all chart data ↓"
      : "Hide chart data ↑";
  });

  let caseKey = "drift",
    caseStep = 0,
    casePlaying = false,
    casesVisible = false,
    caseTimer = null;
  const lastCaseStep = () => research.cases[caseKey].stages.length - 1;
  function ladderElement(tag, attributes, parent, text) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attributes).forEach(([key, value]) =>
      element.setAttribute(key, String(value)),
    );
    if (text !== undefined) element.textContent = text;
    parent.append(element);
    return element;
  }
  function renderCaseLadder() {
    const c = research.cases[caseKey];
    const ladder = $("#case-ladder");
    if (ladder.dataset.case !== caseKey) {
      ladder.dataset.case = caseKey;
      ladder.replaceChildren();
      ladder.setAttribute("viewBox", "0 0 430 232");
      ladderElement(
        "title",
        { id: "case-ladder-title" },
        ladder,
        `${c.title.replace("\n", " ")} — verifier pass rate`,
      );
      ladderElement(
        "desc",
        { id: "case-ladder-description" },
        ladder,
        "Select a point or step to inspect the corresponding trajectory. Arrow keys select adjacent stages. Each stage has its own selectable region, including equal-score stages.",
      );
      const x = (index) => 58 + index * 82;
      const y = (score) =>
        174 -
        ((score - c.ladder.domain[0]) /
          (c.ladder.domain[1] - c.ladder.domain[0])) *
          130;
      const points = c.stages.map((stage, index) => [x(index), y(stage.score)]);
      const backdrop = ladderElement(
        "g",
        { "aria-hidden": "true", "pointer-events": "none" },
        ladder,
      );
      c.ladder.ticks.forEach((tick) => {
        ladderElement(
          "line",
          { x1: 40, x2: 412, y1: y(tick), y2: y(tick), class: "ladder-grid" },
          backdrop,
        );
        ladderElement(
          "text",
          {
            x: 32,
            y: y(tick) + 3.5,
            "text-anchor": "end",
            class: "ladder-tick",
          },
          backdrop,
          `${tick}%`,
        );
      });
      ladderElement(
        "line",
        { x1: 58, x2: 83, y1: 17, y2: 17, class: "ladder-baseline" },
        backdrop,
      );
      ladderElement(
        "text",
        { x: 90, y: 20, class: "ladder-tick" },
        backdrop,
        `Base reference · ${c.stages[0].scoreLabel}%`,
      );
      ladderElement(
        "line",
        {
          x1: 40,
          x2: 412,
          y1: points[0][1],
          y2: points[0][1],
          class: "ladder-baseline",
        },
        backdrop,
      );
      const path = points.reduce(
        (d, point, index) =>
          index ? `${d}H${point[0]}V${point[1]}` : `M${point[0]},${point[1]}`,
        "",
      );
      ladderElement(
        "path",
        { d: path, class: "ladder-curve", "data-step-path": "true" },
        backdrop,
      );
      c.stages.forEach((stage, index) => {
        const [px, py] = points[index];
        const milestone = c.ladder.milestones[index];
        const group = ladderElement(
          "g",
          {
            class: "ladder-stage",
            role: "button",
            tabindex: 0,
            "data-case-step": index,
            "aria-label": `${stage.name}, ${stage.scoreLabel} percent. ${milestone.title}`,
            "aria-controls":
              "terminal-output case-capability-title case-capability-detail",
          },
          ladder,
        );
        ladderElement(
          "title",
          {},
          group,
          `${stage.name} · ${stage.scoreLabel}% — ${milestone.title}`,
        );
        ladderElement(
          "rect",
          {
            x: px - 36,
            y: 29,
            width: 72,
            height: 196,
            rx: 8,
            class: "ladder-hit",
          },
          group,
        );
        ladderElement(
          "line",
          { x1: px, x2: px, y1: py + 13, y2: 191, class: "ladder-leader" },
          group,
        );
        ladderElement(
          "circle",
          { cx: px, cy: py, r: 13, class: "ladder-halo" },
          group,
        );
        ladderElement(
          "path",
          {
            d: `M${px},${py - 5.5}l5.5,5.5 -5.5,5.5 -5.5,-5.5Z`,
            class: `ladder-marker${index === c.stages.length - 1 ? " final" : ""}`,
          },
          group,
        );
        ladderElement(
          "text",
          { x: px, y: py - 17, "text-anchor": "middle", class: "ladder-value" },
          group,
          `${stage.scoreLabel}%`,
        );
        const label = ladderElement(
          "text",
          { x: px, y: 207, "text-anchor": "middle", class: "ladder-milestone" },
          group,
        );
        milestone.label.forEach((line, lineIndex) =>
          ladderElement(
            "tspan",
            { x: px, dy: lineIndex ? 13 : 0 },
            label,
            line,
          ),
        );
        group.addEventListener("click", () => setCaseStep(index));
        group.addEventListener("keydown", (event) => {
          let next = index;
          if (event.key === "ArrowRight")
            next = Math.min(lastCaseStep(), index + 1);
          else if (event.key === "ArrowLeft") next = Math.max(0, index - 1);
          else if (event.key === "Home") next = 0;
          else if (event.key === "End") next = lastCaseStep();
          else if (!["Enter", " "].includes(event.key)) return;
          event.preventDefault();
          setCaseStep(next);
          $(`[data-case-step="${next}"]`, ladder).focus();
        });
      });
    }
    $$("[data-case-step]", ladder).forEach((group, index) =>
      group.setAttribute("aria-pressed", String(index === caseStep)),
    );
    const selected = c.ladder.milestones[caseStep];
    $("#case-capability-title").textContent = selected.title;
    $("#case-capability-detail").textContent = selected.detail;
  }
  function renderCase() {
    const c = research.cases[caseKey],
      stage = c.stages[caseStep],
      supplied = stage.evidenceKind === "author-update";
    $("#case-tag").textContent = c.tag;
    $("#case-title").replaceChildren(
      ...c.title
        .split("\n")
        .flatMap((line, i) =>
          i
            ? [document.createElement("br"), document.createTextNode(line)]
            : [document.createTextNode(line)],
        ),
    );
    $("#case-summary").textContent = c.summary;
    $("#case-score").replaceChildren(
      document.createTextNode(stage.scoreLabel),
      Object.assign(document.createElement("span"), { textContent: "%" }),
    );
    renderCaseLadder();
    $("#case-stage-note").textContent = `${stage.name} · ${stage.note}`;
    $("#terminal-file").textContent = supplied
      ? `${stage.model} / stage summary`
      : c.file;
    $("#terminal-evidence-kind").textContent = supplied
      ? "FINAL-STAGE SUMMARY"
      : "RECORDED EXCERPTS";
    $("#terminal-stage").textContent = stage.model
      ? `${stage.name} · ${stage.model}`
      : stage.name.toUpperCase();
    $("#terminal-position").textContent =
      `${String(caseStep + 1).padStart(2, "0")} / ${String(c.stages.length).padStart(2, "0")}`;
    $("#terminal-insight").textContent = stage.insight;
    $("#terminal-output").setAttribute(
      "aria-label",
      supplied
        ? "Author-supplied final-stage summary, not a raw transcript"
        : `${stage.name} recorded evidence. ${stage.trial}`,
    );
    $("#terminal-output").classList.toggle("stage-summary", supplied);
    const lines = supplied
      ? stage.summary.map((text) => ["highlight", text])
      : stage.logs;
    $("#terminal-output").replaceChildren(
      ...lines.map(([kind, text]) => {
        const line = document.createElement("span");
        line.className = kind ? `log-${kind}` : "";
        line.textContent = text || " ";
        return line;
      }),
    );
    $("#case-source").hidden = supplied;
    $("#case-source").href = c.figure;
    $("#case-source").textContent =
      `View original Figure ${caseKey === "drift" ? "14" : "15"} ↗`;
    const milestones = $("#case-milestones");
    if (milestones.dataset.case !== caseKey) {
      milestones.replaceChildren();
      milestones.dataset.case = caseKey;
      c.stages.forEach((s, i) => {
        const li = document.createElement("li"),
          button = document.createElement("button"),
          value = document.createElement("strong");
        button.textContent = s.name;
        value.textContent = `${s.scoreLabel}%`;
        button.append(value);
        button.setAttribute(
          "aria-label",
          `${s.name}, ${s.scoreLabel} percent checker pass fraction`,
        );
        button.addEventListener("click", () => setCaseStep(i));
        li.append(button);
        milestones.append(li);
      });
    }
    $$("button", milestones).forEach((button, i) => {
      if (i === caseStep) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    $("#case-prev").disabled = caseStep === 0;
    $("#case-next").disabled = caseStep === lastCaseStep();
    $("#case-play").textContent = casePlaying
      ? "Ⅱ Pause evolution"
      : caseStep === lastCaseStep()
        ? "↺ Replay evolution"
        : "▶ Replay evolution";
    $("#case-play").setAttribute("aria-pressed", String(casePlaying));
  }
  function scheduleCase() {
    clearTimeout(caseTimer);
    caseTimer = null;
    if (casePlaying && casesVisible && !document.hidden)
      caseTimer = setTimeout(() => {
        if (caseStep === lastCaseStep()) casePlaying = false;
        else caseStep++;
        renderCase();
        scheduleCase();
      }, 4400);
  }
  function setCaseStep(index) {
    caseStep = Math.max(0, Math.min(lastCaseStep(), index));
    casePlaying = false;
    renderCase();
    scheduleCase();
    announce(
      `${research.cases[caseKey].stages[caseStep].name}. ${research.cases[caseKey].stages[caseStep].insight}`,
    );
  }
  function activateCase(key) {
    caseKey = key;
    caseStep = 0;
    casePlaying = false;
    $$(".case-tabs [role=tab]").forEach((button) => {
      const selected = button.dataset.case === key;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    $("#case-content").setAttribute("aria-labelledby", `case-tab-${key}`);
    renderCase();
    scheduleCase();
  }
  const caseTabs = $$(".case-tabs [role=tab]");
  caseTabs.forEach((button, index) => {
    button.addEventListener("click", () => activateCase(button.dataset.case));
    button.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key))
        return;
      event.preventDefault();
      const next =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? caseTabs.length - 1
            : (index + 1) % caseTabs.length;
      caseTabs[next].focus();
      activateCase(caseTabs[next].dataset.case);
    });
  });
  $("#case-play").addEventListener("click", () => {
    casePlaying = !casePlaying;
    if (casePlaying && caseStep === lastCaseStep()) caseStep = 0;
    renderCase();
    scheduleCase();
  });
  $("#case-next").addEventListener("click", () => setCaseStep(caseStep + 1));
  $("#case-prev").addEventListener("click", () => setCaseStep(caseStep - 1));
  renderCase();
  new IntersectionObserver((entries) => {
    casesVisible = entries[0].isIntersecting;
    scheduleCase();
  }).observe($("#case-content"));

  document.addEventListener("visibilitychange", () => {
    $$(".screen").forEach((section) => {
      const box = section.getBoundingClientRect();
      section.classList.toggle(
        "motion-paused",
        document.hidden || box.bottom <= 0 || box.top >= innerHeight,
      );
    });
    syncFrame();
    scheduleCase();
  });
  motion.addEventListener("change", () => {
    if (motion.matches) {
      casePlaying = false;
      sendPlayerCommand("finish");
    }
    renderCase();
    syncFrame();
    scheduleCase();
    charts.forEach((chart) => chart.setOption({ animation: !motion.matches }));
  });

  const dialog = $("#info-dialog"),
    dialogContent = $("#info-content");
  function showInfo(title, paragraphs) {
    $("#info-title").textContent = title;
    dialogContent.replaceChildren(
      ...paragraphs.map((text) =>
        Object.assign(document.createElement("p"), { textContent: text }),
      ),
    );
    dialog.showModal();
  }
  $$("[data-resource]").forEach((button) =>
    button.addEventListener("click", () => {
      if (button.dataset.resource === "code")
        showInfo("Code release is forthcoming.", [
          "The repository named in the project materials is not publicly accessible at the time of this page’s resource check. We do not link a missing repository as an available release.",
          "The paper and interactive results are available now. Repository specified in the materials: github.com/jyyang26/Terminal-RSI.",
        ]);
      else {
        showInfo("Model weights are not public yet.", [
          "The Hugging Face organization is available, but currently lists no public models. No specific Terminal-RSI-27B model URL has been supplied.",
        ]);
        const a = document.createElement("a");
        a.href = "https://huggingface.co/Teriminal-RSI";
        a.target = "_blank";
        a.rel = "noopener";
        a.className = "button";
        a.textContent = "Visit the Hugging Face organization ↗";
        dialogContent.append(a);
      }
    }),
  );
  $("#authors-info").addEventListener("click", () => {
    showInfo("Authors & affiliations", [
      "* Equal contribution: Junyao Yang, Zongxia Li, Yucheng Shi. † Corresponding author: Shuicheng Yan.",
    ]);
    const list = document.createElement("ul");
    [
      "1 · Tencent Hy Foundation Model Frontier",
      "2 · National University of Singapore",
      "3 · University of Maryland, College Park",
      "4 · University of Georgia",
      "5 · Indiana University",
    ].forEach((text) =>
      list.append(
        Object.assign(document.createElement("li"), { textContent: text }),
      ),
    );
    dialogContent.append(list);
    const note = document.createElement("p");
    note.className = "dialog-note";
    note.textContent =
      "Affiliations and author superscripts reproduce the supplied manuscript. Institution 3 is listed in the paper but is not assigned to an author in that list.";
    dialogContent.append(note);
  });
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom
    )
      dialog.close();
  });
  let copyTimer;
  $("#copy-citation").addEventListener("click", async () => {
    const text = $("#bibtex").textContent.trim();
    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        success = true;
      }
    } catch {
      success = false;
    }
    if (!success) {
      const selection = getSelection(),
        range = document.createRange();
      range.selectNodeContents($("#bibtex"));
      selection.removeAllRanges();
      selection.addRange(range);
      try {
        success = document.execCommand("copy");
      } catch {
        success = false;
      }
      if (success) selection.removeAllRanges();
    }
    clearTimeout(copyTimer);
    $("#copy-citation").textContent = success
      ? "Copied ✓"
      : "Text selected — copy manually";
    announce(
      success
        ? "BibTeX citation copied."
        : "Citation selected. Press Command C or Control C to copy.",
    );
    copyTimer = setTimeout(() => {
      $("#copy-citation").textContent = "Copy citation ⧉";
    }, 3000);
  });
  addEventListener("resize", updateNavigation, { passive: true });
  addEventListener("pagehide", () => {
    clearTimeout(caseTimer);
    clearTimeout(copyTimer);
    lastFrameVisibility = null;
    sendPlayerCommand("visible", false);
  });
  addEventListener("pageshow", () => {
    updateNavigation();
    syncFrame();
    scheduleCase();
  });
})();
