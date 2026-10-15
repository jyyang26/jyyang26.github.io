(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];
  if (window.katex) {
    $$(".math-inline, .math-display").forEach((element) => {
      window.katex.render(element.textContent.trim(), element, {
        displayMode: element.classList.contains("math-display"),
        throwOnError: false,
        trust: false,
      });
    });
  }
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
  let pageActive = true;
  const gainNumbers = $$("[data-gain]");
  let gainVisible = false,
    gainElapsed = -500,
    gainFrame = null,
    gainLastTime = null,
    gainComplete = motion.matches;
  function renderGains(progress) {
    const eased = 1 - Math.pow(1 - progress, 3);
    gainNumbers.forEach((element) => {
      element.textContent = `+${fmt(Number(element.dataset.gain) * eased)}`;
    });
  }
  function stopGains() {
    cancelAnimationFrame(gainFrame);
    gainFrame = null;
    gainLastTime = null;
  }
  function syncGains() {
    stopGains();
    if (motion.matches) {
      gainComplete = true;
      renderGains(1);
    }
    if (gainComplete || !gainVisible || document.hidden || !pageActive) return;
    const tick = (time) => {
      if (gainLastTime !== null) gainElapsed += time - gainLastTime;
      gainLastTime = time;
      const progress = Math.max(0, Math.min(gainElapsed / 1100, 1));
      renderGains(progress);
      gainComplete = progress === 1;
      if (gainComplete) stopGains();
      else gainFrame = requestAnimationFrame(tick);
    };
    gainFrame = requestAnimationFrame(tick);
  }
  renderGains(gainComplete ? 1 : 0);
  new IntersectionObserver((entries) => {
    gainVisible = entries[0].isIntersecting;
    syncGains();
  }, { threshold: 0.2 }).observe($(".hero-metrics"));
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

  let activeMethod = "trajectory";
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
    const visible =
      activeMethod === "trajectory" && frameVisible && !document.hidden;
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

  const loopSteps = [
    {
      title: "Start with reproducible success.",
      text: "Discover successful terminal trajectories across complementary harnesses. Only terminal-verifier successes become candidates for rewriting.",
      actor: "Roll out",
      critic: "Seed warm-up",
      actorOn: false,
      criticOn: false,
    },
    {
      title: "Rewrite the experience, not the critic.",
      text: "Plan a runbook, review its validity and leakage, then execute again in a fresh target environment. Remove private guidance and train only the actor on verified public trajectories. The learned value critic is preserved.",
      actor: "Supervised update",
      critic: "Weights retained",
      actorOn: true,
      criticOn: false,
    },
    {
      title: "New actor. Recalibrated critic.",
      text: "RPR-1 loads the prepared critic seed. Later RPR phases inherit the preceding critic across the actor-only rewrite. Freeze the new actor for four critic-only calibration updates before joint learning.",
      actor: "Frozen",
      critic: "4-update warm-up",
      actorOn: false,
      criticOn: true,
    },
    {
      title: "Refine choices toward completion.",
      text: "Update actor and critic jointly with PPO. RPR-1 uses Family Dense Reward; the retained RPR-2 Long-Reward branch uses Success-Prioritized Reward. Switch to Credit & reward to inspect that design.",
      actor: "PPO update",
      critic: "Value update",
      actorOn: true,
      criticOn: true,
    },
    {
      title: "A better checkpoint becomes the next start.",
      text: "Keep the selected checkpoint rather than a discarded branch endpoint. RPR-1 step 20 seeds RSR-2. RPR-2 SPR step 18 is the final Terminal-RSI-27B model.",
      actor: "Checkpoint kept",
      critic: "Carried forward",
      actorOn: false,
      criticOn: false,
    },
  ];
  const LOOP_STEP_MS = 3600;
  const CREDIT_CYCLE_MS = 3400;
  let loopStep = 0,
    loopPlaying = true,
    loopVisible = false,
    loopTimer = null,
    loopRemaining = LOOP_STEP_MS,
    loopDeadline = 0;
  let creditPlaying = true,
    creditVisible = false;
  const creditAnimations = [];
  function renderLoop() {
    const state = loopSteps[loopStep];
    const discovering = loopStep === 0;
    $(".loop-layout").classList.toggle("discovery-active", discovering);
    $(".loop-layout").style.setProperty("--discovery-duration", `${LOOP_STEP_MS}ms`);
    $("#discovery-visual").hidden = !discovering;
    $("#parameter-visual").hidden = discovering;
    $("#loop-visual-label").textContent = discovering ? "TRAJECTORY DISCOVERY" : "PARAMETER HANDOFF";
    $("#loop-counter").textContent =
      `${String(loopStep + 1).padStart(2, "0")} / 05`;
    $("#loop-title").textContent = state.title;
    $("#loop-description").textContent = state.text;
    $("#actor-status").textContent = state.actor;
    $("#critic-status").textContent = state.critic;
    $("#actor-state").classList.toggle("updating", state.actorOn);
    $("#critic-state").classList.toggle("updating", state.criticOn);
    $("#calibration-count").classList.toggle("active", loopStep === 2);
    $$("[data-loop-step]").forEach((button) => {
      const active = Number(button.dataset.loopStep) === loopStep;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    $("#loop-play").textContent = motion.matches
      ? "Reduced motion · use steps"
      : loopPlaying ? "Pause walkthrough" : "Continue walkthrough";
    $("#loop-play").disabled = motion.matches;
    $("#loop-play").setAttribute("aria-pressed", String(loopPlaying && !motion.matches));
  }
  function stopLoop() {
    if (loopTimer !== null) {
      loopRemaining = Math.max(0, loopDeadline - performance.now());
      clearTimeout(loopTimer);
      loopTimer = null;
    }
  }
  function syncCredit() {
    const running = creditPlaying && creditVisible && activeMethod === "credit"
      && !document.hidden && pageActive && !motion.matches;
    if (running && !creditAnimations.length) {
      $$("#token-timeline .tokens b, #token-timeline .turn-boundary").forEach((element) => {
        let delay = parseFloat(getComputedStyle(element).getPropertyValue("--flow-delay")) * 1000;
        if (element.matches(".tokens b")) {
          const tokens = $$("b", element.parentElement);
          delay += (tokens.length - 1 - tokens.indexOf(element)) * 150;
        }
        const base = { backgroundColor: "#ebf2ff", color: blue, boxShadow: "0 0 0 0 transparent" };
        const highlight = { backgroundColor: blue, color: "#fff", boxShadow: "0 0 0 4px #0052d915" };
        const animation = element.animate([
          { ...base, offset: 0 },
          { ...base, offset: delay / CREDIT_CYCLE_MS },
          { ...highlight, offset: (delay + 280) / CREDIT_CYCLE_MS },
          { ...highlight, offset: (delay + 420) / CREDIT_CYCLE_MS },
          { ...base, offset: (delay + 700) / CREDIT_CYCLE_MS },
          { ...base, offset: 1 },
        ], { duration: CREDIT_CYCLE_MS, iterations: Infinity });
        animation.pause();
        animation.currentTime = 0;
        creditAnimations.push(animation);
      });
    }
    creditAnimations.forEach((animation) => running ? animation.play() : animation.pause());
    $("#token-timeline").classList.toggle("credit-flow", running);
    $("#credit-play").textContent = motion.matches
      ? "Reduced motion · static view"
      : creditPlaying ? "Pause credit flow" : "Continue credit flow";
    $("#credit-play").disabled = motion.matches;
    $("#credit-play").setAttribute("aria-pressed", String(creditPlaying && !motion.matches));
  }
  function syncMethodPlayback() {
    const running = loopPlaying && loopVisible && activeMethod === "loop"
      && !document.hidden && pageActive && !motion.matches;
    $(".loop-layout").classList.toggle("motion-paused", !running);
    if (!running) stopLoop();
    else if (loopTimer === null) {
      loopDeadline = performance.now() + loopRemaining;
      loopTimer = setTimeout(() => {
        loopTimer = null;
        loopRemaining = LOOP_STEP_MS;
        loopStep = (loopStep + 1) % loopSteps.length;
        renderLoop();
        syncMethodPlayback();
      }, loopRemaining);
    }
    if (loopStep === 0) {
      const remaining = running ? Math.max(0, loopDeadline - performance.now()) : loopRemaining;
      $("#discovery-visual").getAnimations({ subtree: true }).forEach((animation) => {
        animation.currentTime = LOOP_STEP_MS - remaining;
      });
    }
    syncCredit();
  }
  function setLoopStep(index, play = false) {
    stopLoop();
    loopRemaining = LOOP_STEP_MS;
    loopPlaying = play;
    loopStep = index;
    renderLoop();
    syncMethodPlayback();
    announce(`Method step ${index + 1}. ${loopSteps[index].title}`);
  }
  $("#loop-play").addEventListener("click", () => {
    loopPlaying = !loopPlaying;
    renderLoop();
    syncMethodPlayback();
  });
  $("#loop-next").addEventListener("click", () =>
    setLoopStep((loopStep + 1) % loopSteps.length),
  );
  $("#loop-reset").addEventListener("click", () => setLoopStep(0));
  $$("[data-loop-step]").forEach((button) =>
    button.addEventListener("click", () =>
      setLoopStep(Number(button.dataset.loopStep), button.dataset.loopStep === "0"),
    ),
  );
  new IntersectionObserver((entries) => {
    loopVisible = entries[0].isIntersecting;
    syncMethodPlayback();
  }).observe($(".loop-layout"));
  new IntersectionObserver((entries) => {
    creditVisible = entries[0].isIntersecting;
    syncCredit();
  }).observe($("#token-timeline"));
  $("#credit-play").addEventListener("click", () => {
    creditPlaying = !creditPlaying;
    syncCredit();
  });
  const methodTabs = $$("#method-tabs [role=tab]");
  function activateMethod(key) {
    if (activeMethod === key) return;
    activeMethod = key;
    methodTabs.forEach((tab) => {
      const selected = tab.dataset.methodTab === key;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      $(`#${tab.getAttribute("aria-controls")}`).hidden = !selected;
    });
    frameVisible = false;
    syncFrame();
    syncMethodPlayback();
    if (key === "trajectory") {
      resizeFrame();
      frameObserver.unobserve($(".trajectory-scroll"));
      frameObserver.observe($(".trajectory-scroll"));
    }
  }
  methodTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateMethod(tab.dataset.methodTab));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % methodTabs.length;
      else if (event.key === "ArrowLeft")
        next = (index + methodTabs.length - 1) % methodTabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = methodTabs.length - 1;
      else return;
      event.preventDefault();
      methodTabs[next].focus();
      activateMethod(methodTabs[next].dataset.methodTab);
    });
  });
  renderLoop();
  syncMethodPlayback();

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
        min: key === "TB2.1" ? 20 : 0,
        max: key === "TB4" ? 60 : 100,
        interval: key === "TB2.1" ? (compact ? 40 : 20) : undefined,
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

  const CASE_STAGE_MS = 3000;
  const CASE_TEXT_MS = 2400;
  const caseOrder = ["drift", "ffi"];
  let caseKey = "drift",
    caseStep = 0,
    casePlaying = false,
    casesVisible = false;
  let caseStarted = false,
    caseFinished = false,
    caseElapsed = CASE_STAGE_MS;
  let caseFrame = null,
    caseStamp = null,
    caseEpoch = 0,
    caseSwap = null;
  let caseLines = [],
    caseCharacters = 0,
    ladderLengths = [0],
    ladderPath = null;
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
      ladderLengths = [0];
      points
        .slice(1)
        .forEach((point, index) =>
          ladderLengths.push(
            ladderLengths[index] +
              point[0] -
              points[index][0] +
              Math.abs(point[1] - points[index][1]),
          ),
        );
      ladderElement("path", { d: path, class: "ladder-track" }, backdrop);
      ladderPath = ladderElement(
        "path",
        {
          d: path,
          class: "ladder-curve",
          "data-step-path": "true",
          "stroke-dasharray": ladderLengths.at(-1),
        },
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
      stage = c.stages[caseStep];
    syncCaseTabs();
    const content = $("#case-content");
    if (
      content.dataset.case &&
      content.dataset.case !== caseKey &&
      !motion.matches
    ) {
      caseSwap?.cancel();
      caseSwap = content.animate(
        [
          { opacity: 0.5, transform: "translateY(5px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 260, easing: "ease-out" },
      );
    }
    content.dataset.case = caseKey;
    $("#case-content").dataset.stage = String(caseStep);
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
    $("#terminal-file").textContent = c.file;
    $("#terminal-file").title = stage.trial;
    $("#terminal-evidence-kind").textContent = "RECORDED EXCERPTS";
    $("#terminal-stage").textContent = stage.model
      ? `${stage.name} · ${stage.model}`
      : stage.name.toUpperCase();
    $("#terminal-position").textContent =
      `${String(caseStep + 1).padStart(2, "0")} / ${String(c.stages.length).padStart(2, "0")}`;
    $("#terminal-insight").textContent = stage.insight;
    $("#terminal-output").setAttribute(
      "aria-label",
      `${stage.name} recorded evidence. ${stage.trial}`,
    );
    caseCharacters = 0;
    caseLines = stage.logs.map(([kind, raw]) => {
      const text = kind === "command" ? `$ ${raw}` : raw || " ";
      const node = document.createElement("span");
      node.className = kind ? `log-${kind}` : "";
      const start = caseCharacters;
      caseCharacters += text.length;
      return { node, text, start };
    });
    $("#terminal-output").replaceChildren(
      ...caseLines.map((line) => line.node),
    );
    $("#terminal-output").scrollTop = 0;
    $("#case-source").hidden = false;
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
    paintCaseFrame();
    updateCaseControls();
  }
  function paintCaseTrackers(progress) {
    $$("[data-case-tracker]").forEach((tracker) => {
      const order = caseOrder.indexOf(tracker.dataset.caseTracker);
      const current = caseOrder.indexOf(caseKey);
      $$("b", tracker).forEach((bar, i) => {
        const amount =
          order < current
            ? 1
            : order > current
              ? 0
              : i < caseStep
                ? 1
                : i === caseStep
                  ? progress
                  : 0;
        bar.style.transform = `scaleX(${amount})`;
      });
    });
  }
  function paintCaseProgress(progress) {
    const start = ladderLengths[Math.max(0, caseStep - 1)];
    const end = ladderLengths[caseStep];
    const fraction = motion.matches ? 1 : Math.min(1, caseElapsed / 950);
    ladderPath.setAttribute(
      "stroke-dashoffset",
      String(ladderLengths.at(-1) - start - (end - start) * fraction),
    );
    $$("#case-ladder [data-case-step]").forEach((node, index) =>
      node.classList.toggle("is-future", index > caseStep),
    );
    $("#case-content").dataset.elapsed = String(Math.round(caseElapsed));
    paintCaseTrackers(progress);
  }
  function paintCaseFrame() {
    const progress = Math.min(1, caseElapsed / CASE_STAGE_MS);
    const count = motion.matches
      ? caseCharacters
      : Math.floor(caseCharacters * Math.min(1, caseElapsed / CASE_TEXT_MS));
    caseLines.forEach((line) => {
      const shown = Math.max(0, Math.min(line.text.length, count - line.start));
      const text = line.text.slice(0, shown);
      if (line.node.textContent !== text) line.node.textContent = text;
      line.node.hidden = shown === 0;
      line.node.classList.toggle(
        "typing-line",
        shown > 0 && shown < line.text.length && casePlaying,
      );
    });
    paintCaseProgress(progress);
    if (casePlaying)
      $("#terminal-output").scrollTop = $("#terminal-output").scrollHeight;
  }
  function advanceCase() {
    if (caseStep === lastCaseStep() && caseKey === "ffi") {
      caseElapsed = CASE_STAGE_MS;
      casePlaying = false;
      caseFinished = true;
      updateCaseControls();
      return;
    }
    caseElapsed -= CASE_STAGE_MS;
    if (caseStep < lastCaseStep()) caseStep++;
    else {
      caseKey = "ffi";
      caseStep = 0;
    }
    renderCase();
  }
  function tickCase(stamp, epoch) {
    if (epoch !== caseEpoch) return;
    caseFrame = null;
    if (!casePlaying || !casesVisible || document.hidden) {
      caseStamp = null;
      return;
    }
    caseElapsed += Math.max(0, stamp - caseStamp);
    caseStamp = stamp;
    while (caseElapsed >= CASE_STAGE_MS && casePlaying) advanceCase();
    paintCaseFrame();
    scheduleCase();
  }
  function updateCaseControls() {
    $("#case-play").textContent = casePlaying ? "Ⅱ Pause" : "▶ Play";
    $("#case-play").setAttribute("aria-pressed", String(casePlaying));
    $("#case-content").dataset.playing = String(casePlaying);
    $("#case-playback-status").textContent = caseFinished
      ? "Case A + Case B · complete"
      : `${caseKey === "drift" ? "Case A" : "Case B"} · ${caseStep + 1}/5 · ${casePlaying ? "playing" : "paused"}`;
  }
  function stopCaseFrame() {
    caseSwap?.cancel();
    caseSwap = null;
    caseEpoch++;
    if (caseFrame !== null) cancelAnimationFrame(caseFrame);
    caseFrame = null;
    caseStamp = null;
  }
  function scheduleCase() {
    if (!casePlaying || !casesVisible || document.hidden) {
      stopCaseFrame();
      updateCaseControls();
      return;
    }
    if (caseFrame !== null) return;
    const epoch = caseEpoch;
    if (caseStamp === null) caseStamp = performance.now();
    caseFrame = requestAnimationFrame((stamp) => tickCase(stamp, epoch));
  }
  function setCaseStep(index) {
    stopCaseFrame();
    caseStep = Math.max(0, Math.min(lastCaseStep(), index));
    casePlaying = false;
    caseStarted = true;
    caseFinished = false;
    caseElapsed = CASE_STAGE_MS;
    renderCase();
    scheduleCase();
    announce(
      `${research.cases[caseKey].stages[caseStep].name}. ${research.cases[caseKey].stages[caseStep].insight}`,
    );
  }
  function syncCaseTabs() {
    $$(".case-tabs [role=tab]").forEach((button) => {
      const selected = button.dataset.case === caseKey;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    $("#case-content").setAttribute("aria-labelledby", `case-tab-${caseKey}`);
  }
  function activateCase(key) {
    if (!caseOrder.includes(key)) return;
    caseKey = key;
    setCaseStep(0);
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
  function replayCases() {
    stopCaseFrame();
    caseKey = "drift";
    caseStep = 0;
    caseElapsed = 0;
    caseStarted = true;
    caseFinished = false;
    casePlaying = true;
    renderCase();
    scheduleCase();
  }
  $("#case-replay").addEventListener("click", replayCases);
  $("#case-play").addEventListener("click", () => {
    if (caseFinished) {
      replayCases();
      return;
    }
    stopCaseFrame();
    caseStarted = true;
    casePlaying = !casePlaying;
    if (casePlaying && caseElapsed >= CASE_STAGE_MS) caseElapsed = 0;
    paintCaseFrame();
    updateCaseControls();
    scheduleCase();
  });
  $("#case-next").addEventListener("click", () => setCaseStep(caseStep + 1));
  $("#case-prev").addEventListener("click", () => setCaseStep(caseStep - 1));
  renderCase();
  new IntersectionObserver(
    (entries) => {
      casesVisible =
        entries[0].isIntersecting && entries[0].intersectionRatio >= 0.25;
      if (casesVisible && !caseStarted && !motion.matches) replayCases();
      else scheduleCase();
    },
    { threshold: [0, 0.25], rootMargin: "-76px 0px -20px 0px" },
  ).observe($(".terminal-player"));

  document.addEventListener("visibilitychange", () => {
    $$(".screen").forEach((section) => {
      const box = section.getBoundingClientRect();
      section.classList.toggle(
        "motion-paused",
        document.hidden || box.bottom <= 0 || box.top >= innerHeight,
      );
    });
    syncFrame();
    syncMethodPlayback();
    syncGains();
    scheduleCase();
  });
  motion.addEventListener("change", () => {
    if (motion.matches) {
      stopCaseFrame();
      casePlaying = false;
      caseElapsed = CASE_STAGE_MS;
      sendPlayerCommand("finish");
    }
    renderCase();
    renderLoop();
    syncFrame();
    syncMethodPlayback();
    syncGains();
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
      }
    }),
  );
  $("#authors-info").addEventListener("click", () => {
    showInfo("Authors & affiliations", [
      "* Equal contribution: Junyao Yang, Zongxia Li, Yucheng Shi. † Corresponding author: Shuicheng Yan.",
    ]);
    const list = document.createElement("ul");
    [
      "1 · Tencent Hy Frontier",
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
    pageActive = false;
    stopCaseFrame();
    clearTimeout(copyTimer);
    syncMethodPlayback();
    stopGains();
    lastFrameVisibility = null;
    sendPlayerCommand("visible", false);
  });
  addEventListener("pageshow", () => {
    pageActive = true;
    updateNavigation();
    syncFrame();
    syncMethodPlayback();
    syncGains();
    scheduleCase();
  });
})();
