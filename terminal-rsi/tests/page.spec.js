const { test, expect } = require("@playwright/test");

const expected = {
  TB4: [0, 6.1, 16.67, 17.46, 19.84],
  "TB2.1": [51.7, 70.1, 77.53, 86.52, 86.52],
  TB3: [0, 6.8, 14.29, 15, 16.95],
  TBH: [31, 54, 69.5, 76, 79],
};
const stageCharts = {
  "chart-tb4": "TB4",
  "chart-tb21": "TB2.1",
  "chart-tb3": "TB3",
  "chart-hard": "TBH",
};
async function open(page, reduced = true) {
  await page.emulateMedia({
    reducedMotion: reduced ? "reduce" : "no-preference",
  });
  await page.goto("/");
  await expect(page.locator("#paper-title")).toContainText(
    "Recursive Self-Improving Terminal Agents",
  );
}
async function option(page, id) {
  await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  await expect(page.locator(`#${id} svg`)).toHaveCount(1);
  return page
    .locator(`#${id}`)
    .evaluate((el) => echarts.getInstanceByDom(el).getOption());
}

test("independent benchmark data, no cross-suite aggregate anywhere in the page", async ({
  page,
}) => {
  await open(page);
  const data = await page.evaluate(() => TERMINAL_RESEARCH);
  expect(data).not.toHaveProperty("macro");
  for (const [key, values] of Object.entries(expected))
    expect(data.progression[key].map((v) => Number(v.toFixed(2)))).toEqual(
      values,
    );
  expect(data.progressionStages).toEqual([
    "Base",
    "RSR-1",
    "RPR-1",
    "RSR-2",
    "Terminal-RSI-27B",
  ]);
  expect(await page.locator("body").textContent()).not.toMatch(
    /macro|50\.58|29\.90|20\.68|48\.75|average|mean across/i,
  );
  expect(
    await page.locator('meta[name="description"]').getAttribute("content"),
  ).not.toMatch(/macro|average/i);
  await expect(page.locator("#stage-table tbody tr")).toHaveCount(4);
  await expect(page.locator(".hero-metrics")).toContainText("+19.84");
  await expect(page.locator(".hero-metrics")).toContainText("+34.82");
});

test("Hero has two independent five-stage charts and correctly positioned floating labels", async ({
  page,
}) => {
  await open(page);
  for (const [id, key] of [
    ["hero-tb4", "TB4"],
    ["hero-tb21", "TB2.1"],
  ]) {
    const opt = await option(page, id);
    expect(opt.series[0].type).toBe("line");
    expect(opt.yAxis[0].min).toBe(key === "TB2.1" ? 50 : 0);
    const points = opt.series[0].data;
    expect(points.map((point) => Number(point.value.toFixed(2)))).toEqual(
      expected[key],
    );
    expect(points[1].symbol).toBe("diamond");
    expect(points[3].symbol).toBe("diamond");
    expect(points[2].symbol).toMatch(/^path:\/\//);
    expect(points[2].symbol.split("L")).toHaveLength(10);
    expect(points[4].symbol).toBe(points[2].symbol);
    expect(points[4].symbolSize / points[2].symbolSize).toBeCloseTo(1.3, 10);
    expect(opt.xAxis[0].data).toEqual([
      "Base",
      "RSR-1",
      "RPR-1",
      "RSR-2",
      "RPR-2",
    ]);
  }
  const positions = await page.evaluate(() => {
    const refine = document
      .querySelector(".float-refine")
      .getBoundingClientRect();
    const rewrite = document
      .querySelector(".float-rewrite")
      .getBoundingClientRect();
    return {
      above: refine.top < rewrite.top,
      left: refine.left < rewrite.left,
    };
  });
  expect(positions).toEqual({ above: true, left: true });
});

test("four checkpoint charts use progressively darker blue with the final model darkest", async ({
  page,
}) => {
  await open(page);
  for (const [id, key] of Object.entries(stageCharts)) {
    const opt = await option(page, id);
    expect(opt.series[0].type).toBe("bar");
    const colors = opt.series[0].data.map((point) => point.itemStyle.color);
    expect(colors).toEqual([
      "#C3D8FA",
      "#95BBF3",
      "#6299EA",
      "#3075E2",
      "#0052D9",
    ]);
    const luminance = (color) => {
      const [r, g, b] = [1, 3, 5].map((i) =>
        parseInt(color.slice(i, i + 2), 16),
      );
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    for (let i = 1; i < colors.length; i++)
      expect(luminance(colors[i])).toBeLessThan(luminance(colors[i - 1]));
    expect(opt.series[0].emphasis.disabled).toBe(true);
    expect(
      opt.series[0].data.map((point) => Number(point.value.toFixed(2))),
    ).toEqual(expected[key]);
    expect(opt.xAxis[0].data).toEqual([
      "Base",
      "RSR-1",
      "RPR-1",
      "RSR-2",
      "Terminal-RSI-27B",
    ]);
    expect(opt.yAxis[0].min).toBe(0);
    await expect(page.locator(`#${id} svg`)).toContainText(
      `${expected[key][4].toFixed(2)}%`,
    );
  }
  await page.locator("#show-data").click();
  await expect(page.locator("#data-table-panel")).toBeVisible();
  await expect(page.locator("#results")).not.toContainText("PPO");
  await expect(page.locator("#stage-table thead th")).toHaveCount(6);
});

test("frontier charts are separately rendered, descending and include both Base rows", async ({
  page,
}) => {
  await open(page);
  for (const [id, key] of [
    ["chart-frontier-tb4", "TB4"],
    ["chart-frontier-tb21", "TB2.1"],
  ]) {
    const opt = await option(page, id);
    const names = opt.yAxis[0].data,
      values = opt.series[0].data.map((d) => d.value);
    expect(names.length).toBe(11);
    expect(values).toEqual([...values].sort((a, b) => b - a));
    expect(opt.xAxis[0].min).toBe(key === "TB2.1" ? 20 : 0);
    expect(opt.xAxis[0].max).toBe(key === "TB2.1" ? 100 : 60);
    expect(opt.yAxis[0].inverse).toBe(true);
    const base = names.indexOf("Qwen3.8-27B (Base)"),
      ours = names.indexOf("Terminal-RSI-27B");
    expect(values[base]).toBe(key === "TB4" ? 0 : 51.7);
    expect(opt.series[0].data[ours].itemStyle.color).toBe("#0052D9");
    await expect(page.locator(`#${id} svg`)).toContainText(
      "Qwen3.8-27B (Base)",
    );
    await expect(page.locator(`#${id} svg`)).toContainText(
      "DeepSeek V4 Flash 0731",
    );
  }
  await expect(
    page.locator("#results [role=tab], #results [data-frontier]"),
  ).toHaveCount(0);
  for (const id of Object.keys(stageCharts)) await option(page, id);
  await expect(page.locator("#results .chart svg")).toHaveCount(6);
});

test("Panorama plays automatically once in seven seconds, holds its final frame and replays", async ({
  page,
}) => {
  await open(page, false);
  await page.locator("#trajectory-frame").scrollIntoViewIfNeeded();
  const frame = page.frameLocator("#trajectory-frame");
  await expect(frame.locator("#visualization")).toHaveAttribute(
    "data-chapter",
    "2",
  );
  const child = page.frames().find((f) => f.url().includes("trajectory.html"));
  const initial = await child.evaluate(() => RSI_PLAYER.getState());
  expect(initial.duration).toBe(7000);
  await expect
    .poll(() => child.evaluate(() => RSI_PLAYER.getState().playing))
    .toBe(true);
  await expect(frame.locator(".control-deck")).toBeHidden();
  await expect(page.locator("#method-tabs [role=tab]")).toHaveCount(3);
  await expect(page.locator("#panel-trajectory")).toBeVisible();
  await expect(page.locator("#panel-loop")).toBeHidden();
  await expect(page.locator("#panel-credit")).toBeHidden();
  await expect(frame.locator("#visualization")).toHaveAttribute(
    "data-time",
    "7000",
    { timeout: 10000 },
  );
  await expect(frame.locator("body")).toHaveAttribute("data-playing", "false");
  await expect(page.locator("#panorama-status")).toContainText("retained");
  for (const [key, value] of [
    ["TB4", "19.84"],
    ["TB2.1", "86.52"],
    ["TB3", "16.95"],
    ["TBH", "79.00"],
  ]) {
    await expect(
      frame.locator(`[data-benchmark="${key}"] [data-label="long-value"]`),
    ).toContainText(value);
  }
  await page.waitForTimeout(400);
  expect(await child.evaluate(() => RSI_PLAYER.getState().time)).toBe(7000);
  await page.locator("#panorama-replay").click();
  await expect
    .poll(() => child.evaluate(() => RSI_PLAYER.getState().time))
    .toBeLessThan(1000);
  const duration = await child.evaluate(
    () =>
      new Promise((resolve) => {
        RSI_PLAYER.pause();
        RSI_PLAYER.seek(0);
        const start = performance.now();
        addEventListener(
          "rsi:ended",
          () => resolve(performance.now() - start),
          { once: true },
        );
        RSI_PLAYER.play();
      }),
  );
  expect(duration).toBeGreaterThanOrEqual(6900);
  expect(duration).toBeLessThan(8500);
});

test("Panorama respects reduced motion, remains six-panel, and suspends when offscreen", async ({
  page,
}) => {
  await open(page);
  await page.locator("#trajectory-frame").scrollIntoViewIfNeeded();
  const child = page.frames().find((f) => f.url().includes("trajectory.html"));
  const frame = page.frameLocator("#trajectory-frame");
  await expect(frame.locator("#visualization")).toHaveAttribute(
    "data-time",
    "7000",
  );
  await expect(frame.locator("body")).toHaveAttribute("data-playing", "false");
  expect(
    await child.evaluate(
      () =>
        [...document.querySelectorAll("[data-benchmark]")].filter(
          (el) => el.getAttribute("display") !== "none",
        ).length,
    ),
  ).toBe(6);
  await page.locator("#panorama-replay").click();
  await page.locator("#citation").scrollIntoViewIfNeeded();
  await expect
    .poll(() => child.evaluate(() => RSI_PLAYER.getState().visible))
    .toBe(false);
  const time = await child.evaluate(() => RSI_PLAYER.getState().time);
  await page.waitForTimeout(300);
  expect(await child.evaluate(() => RSI_PLAYER.getState().time)).toBe(time);
});

test("both cases provide five reachable stages with correct scores and evidence types", async ({
  page,
}) => {
  await open(page);
  for (const [key, scores] of [
    ["drift", ["81.82", "96.97", "100", "100", "100"]],
    ["ffi", ["50", "50", "75", "100", "100"]],
  ]) {
    await page.locator(`#case-tab-${key}`).click();
    await expect(page.locator("#case-milestones button")).toHaveCount(5);
    for (let i = 0; i < 5; i++) {
      await page.locator("#case-milestones button").nth(i).click();
      await expect(page.locator("#case-score")).toHaveText(`${scores[i]}%`);
      await expect(page.locator("#terminal-position")).toHaveText(
        `0${i + 1} / 05`,
      );
      await expect(
        page.locator("#case-milestones button").nth(i),
      ).toHaveAttribute("aria-current", "step");
      if (i < 4)
        await expect(page.locator("#terminal-evidence-kind")).toHaveText(
          "RECORDED EXCERPTS",
        );
    }
    await expect(page.locator("#terminal-stage")).toHaveText(
      "RPR-2 · Terminal-RSI-27B",
    );
    await expect(page.locator("#terminal-evidence-kind")).toHaveText(
      "RECORDED EXCERPTS",
    );
    await expect(page.locator("#terminal-output")).not.toHaveClass(
      /stage-summary/,
    );
    await expect(page.locator("#case-next")).toBeDisabled();
    await expect(page.locator("#case-source")).toBeVisible();
    await page.locator("#case-prev").click();
    await expect(page.locator("#terminal-stage")).toHaveText("RSR-2");
    await expect(page.locator("#case-next")).toBeEnabled();
    await page.locator("#case-next").click();
    await page.locator("#case-replay").click();
    await expect(page.locator("#case-content")).toHaveAttribute(
      "data-case",
      "drift",
    );
    await expect(page.locator("#terminal-position")).toHaveText("01 / 05");
    await page.locator("#case-play").click();
  }
  await expect(page.locator(".case-evidence")).toHaveCount(0);
  await expect(page.locator("#case-stage-note")).not.toContainText(
    "author-supplied stage update",
  );
});

test("case ladders reproduce stepwise rates and point clicks select the matching trajectory", async ({
  page,
}) => {
  await open(page);
  for (const [key, scores] of [
    ["drift", ["81.82", "96.97", "100", "100", "100"]],
    ["ffi", ["50", "50", "75", "100", "100"]],
  ]) {
    await page.locator(`#case-tab-${key}`).click();
    const ladder = page.locator("#case-ladder");
    await expect(ladder).toHaveAttribute("data-case", key);
    await expect(ladder.locator("[data-case-step]")).toHaveCount(5);
    expect(await ladder.locator(".ladder-value").allTextContents()).toEqual(
      scores.map((score) => `${score}%`),
    );
    const path = await ladder.locator("[data-step-path]").getAttribute("d");
    expect((path.match(/H/g) || []).length).toBe(4);
    expect((path.match(/V/g) || []).length).toBe(4);
    expect(path).not.toMatch(/[CLQ]/);
    for (let i = 0; i < 5; i++) {
      await ladder.locator(`[data-case-step="${i}"] .ladder-hit`).click();
      await expect(ladder.locator(`[data-case-step="${i}"]`)).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      await expect(ladder.locator('[aria-pressed="true"]')).toHaveCount(1);
      await expect(page.locator("#terminal-position")).toHaveText(
        `0${i + 1} / 05`,
      );
      await expect(page.locator("#case-score")).toHaveText(`${scores[i]}%`);
      const detail = await page.evaluate(
        ({ key, i }) => TERMINAL_RESEARCH.cases[key].ladder.milestones[i],
        { key, i },
      );
      await expect(page.locator("#case-capability-title")).toHaveText(
        detail.title,
      );
      await expect(page.locator("#case-capability-detail")).toHaveText(
        detail.detail,
      );
    }
    await expect(page.locator("#case-stage-note")).not.toContainText(
      "author-supplied stage update",
    );
    await page.locator("#case-prev").click();
    await expect(ladder.locator('[data-case-step="3"]')).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.locator("#terminal-output")).not.toHaveClass(
      /stage-summary/,
    );
  }
  await expect(page.locator(".case-score-track, .case-evidence")).toHaveCount(
    0,
  );
});

test("case ladder supports keyboard selection and replay follows the same selected step", async ({
  page,
}) => {
  await open(page);
  await page.locator("#case-tab-drift").click();
  const first = page.locator('#case-ladder [data-case-step="0"]');
  await first.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator('#case-ladder [data-case-step="1"]')).toBeFocused();
  await expect(page.locator("#terminal-stage")).toHaveText("RSR-1");
  await page.keyboard.press("End");
  await expect(page.locator("#terminal-stage")).toContainText("RPR-2");
  await page.keyboard.press("Home");
  await expect(page.locator("#terminal-stage")).toHaveText("BASE");
  await page.locator("#case-play").click();
  await expect(page.locator("#terminal-stage")).toHaveText("RSR-1", {
    timeout: 6500,
  });
  await expect(
    page.locator('#case-ladder [data-case-step="1"]'),
  ).toHaveAttribute("aria-pressed", "true");
  await page.locator('#case-ladder [data-case-step="4"] .ladder-hit').click();
  await expect(page.locator("#case-play")).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await expect(page.locator("#terminal-position")).toHaveText("05 / 05");
});

test("ladder labels fit and equal-score stages remain independently selectable", async ({
  page,
}) => {
  await open(page);
  for (const key of ["drift", "ffi"]) {
    await page.locator(`#case-tab-${key}`).click();
    await page.locator("#case-ladder").scrollIntoViewIfNeeded();
    const outside = await page.locator("#case-ladder").evaluate((svg) => {
      const box = svg.getBoundingClientRect();
      return [...svg.querySelectorAll("text")]
        .filter((text) => {
          const r = text.getBoundingClientRect();
          return (
            r.left < box.left - 1 ||
            r.right > box.right + 1 ||
            r.top < box.top - 1 ||
            r.bottom > box.bottom + 1
          );
        })
        .map((text) => text.textContent);
    });
    expect(outside).toEqual([]);
    const plateau = key === "drift" ? [2, 3, 4] : [3, 4];
    const ys = [];
    for (const i of plateau) {
      await page
        .locator(`#case-ladder [data-case-step="${i}"] .ladder-hit`)
        .click();
      await expect(page.locator("#case-score")).toHaveText("100%");
      await expect(page.locator("#terminal-position")).toHaveText(
        `0${i + 1} / 05`,
      );
      ys.push(
        await page
          .locator(`#case-ladder [data-case-step="${i}"] .ladder-value`)
          .getAttribute("y"),
      );
    }
    expect(new Set(ys).size).toBe(1);
  }
});

test("responsive 4+2 grids, floating labels and charts stay within their bounds", async ({
  page,
}, info) => {
  await open(page);
  if (info.project.name === "mobile") {
    await page.locator("#menu-toggle").click();
    await expect(page.locator("#main-nav")).toBeVisible();
    await page.locator('#main-nav a[href="#results"]').click();
    await expect(page.locator("#menu-toggle")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  }
  for (const id of ["overview", "method", "results", "cases", "citation"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      id,
    ).toBe(true);
  }
  const columns = await page.evaluate(() =>
    [".progression-grid", ".frontier-grid"].map(
      (s) =>
        getComputedStyle(document.querySelector(s)).gridTemplateColumns.split(
          " ",
        ).length,
    ),
  );
  expect(columns).toEqual(info.project.name === "desktop" ? [4, 2] : [1, 1]);
  for (const id of [
    "hero-tb4",
    "hero-tb21",
    ...Object.keys(stageCharts),
    "chart-frontier-tb4",
    "chart-frontier-tb21",
  ]) {
    await option(page, id);
    const outside = await page.locator(`#${id}`).evaluate((el) => {
      const box = el.getBoundingClientRect();
      return [...el.querySelectorAll("svg text")]
        .filter((t) => {
          const r = t.getBoundingClientRect();
          return (
            r.width &&
            (r.left < box.left - 2 ||
              r.right > box.right + 2 ||
              r.top < box.top - 2 ||
              r.bottom > box.bottom + 2)
          );
        })
        .map((t) => t.textContent);
    });
    expect(outside, id).toEqual([]);
  }
});

test("Panorama does not consume its playback while only the edge is visible", async ({
  page,
}) => {
  await open(page, false);
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    const box = document
      .querySelector(".trajectory-scroll")
      .getBoundingClientRect();
    scrollTo(0, scrollY + box.top - innerHeight + 70);
  });
  const frame = page.frameLocator("#trajectory-frame");
  await expect(frame.locator("#visualization")).toHaveAttribute(
    "data-time",
    "0",
  );
  await page.waitForTimeout(800);
  await expect(frame.locator("#visualization")).toHaveAttribute(
    "data-time",
    "0",
  );
  await expect(frame.locator("body")).toHaveAttribute("data-playing", "false");
  await page.locator(".trajectory-scroll").scrollIntoViewIfNeeded();
  await expect(frame.locator("body")).toHaveAttribute("data-playing", "true");
  await expect
    .poll(async () =>
      Number(await frame.locator("#visualization").getAttribute("data-time")),
    )
    .toBeGreaterThan(200);
});

test("file-origin page automatically plays, holds final state and replays through the message bridge", async ({
  page,
}) => {
  const { pathToFileURL } = require("node:url");
  const path = require("node:path");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(pathToFileURL(path.resolve(__dirname, "../index.html")).href);
  await page.locator(".trajectory-scroll").scrollIntoViewIfNeeded();
  const frame = page.frameLocator("#trajectory-frame");
  await expect(frame.locator("body")).toHaveAttribute("data-playing", "true");
  await expect
    .poll(async () =>
      Number(await frame.locator("#visualization").getAttribute("data-time")),
    )
    .toBeGreaterThan(200);
  await expect(frame.locator("#visualization")).toHaveAttribute(
    "data-time",
    "7000",
    { timeout: 10000 },
  );
  await expect(page.locator("#panorama-status")).toContainText("retained");
  await page.waitForTimeout(250);
  await expect(frame.locator("body")).toHaveAttribute("data-playing", "false");
  await page.locator("#panorama-replay").click();
  await expect(frame.locator("body")).toHaveAttribute("data-playing", "true");
  expect(
    Number(await frame.locator("#visualization").getAttribute("data-time")),
  ).toBeLessThan(1000);
});

test("reduced-motion status explains playback and disabling it restores automatic entry", async ({
  page,
}) => {
  await open(page);
  await page.locator(".trajectory-scroll").scrollIntoViewIfNeeded();
  await expect(page.locator("#panorama-status")).toHaveText(
    "Reduced motion · press Replay",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const frame = page.frameLocator("#trajectory-frame");
  await expect(frame.locator("body")).toHaveAttribute("data-playing", "true");
  expect(
    Number(await frame.locator("#visualization").getAttribute("data-time")),
  ).toBeLessThan(1000);
});

test("titles are updated and every terminal stage uses identical code typography", async ({
  page,
}) => {
  await open(page);
  await expect(page.locator("#results .eyebrow")).toContainText(
    "Recursively-Improving Terminal Performance",
  );
  await expect(page.locator('#main-nav a[href="#cases"]')).toHaveText(
    "Case Study",
  );
  await expect(page.locator("#cases-title")).toHaveText("Case Study");
  for (const key of ["drift", "ffi"]) {
    await page.locator(`#case-tab-${key}`).click();
    const typography = () =>
      page.locator("#terminal-output").evaluate((el) => {
        const s = getComputedStyle(el);
        return [s.fontFamily, s.fontSize, s.lineHeight, s.whiteSpace];
      });
    const base = await typography();
    expect(base[0]).toMatch(/mono/i);
    await page.locator("#case-milestones button").nth(4).click();
    expect(await typography()).toEqual(base);
  }
});

test("method tabs restore both explainers with keyboard navigation and persistent state", async ({
  page,
}) => {
  await open(page);
  const tabs = page.locator("#method-tabs [role=tab]");
  await expect(tabs).toHaveCount(3);
  await expect(page.locator("#method [role=tabpanel]")).toHaveCount(3);
  await page.locator("#tab-trajectory").focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#tab-loop")).toBeFocused();
  await expect(page.locator("#panel-loop")).toBeVisible();
  await expect(page.locator("#panel-trajectory")).toBeHidden();
  await page.locator('[data-loop-step="1"]').click();
  await expect(page.locator("#actor-status")).toHaveText("Supervised update");
  await expect(page.locator("#critic-status")).toHaveText("Weights retained");
  await page.locator("#loop-next").click();
  await expect(page.locator("#actor-status")).toHaveText("Frozen");
  await expect(page.locator("#critic-status")).toHaveText("4-update warm-up");
  await expect(page.locator("#calibration-count")).toHaveClass(/active/);
  await page.locator("#tab-loop").focus();
  await page.keyboard.press("End");
  await expect(page.locator("#tab-credit")).toBeFocused();
  await expect(page.locator("#panel-credit")).toBeVisible();
  await expect(page.locator('#method-tabs [aria-selected="true"]')).toHaveCount(
    1,
  );
  await page.locator("#tab-loop").click();
  await expect(page.locator("#loop-counter")).toHaveText("03 / 05");
  await page.locator("#loop-next").click();
  await expect(page.locator("#actor-status")).toHaveText("PPO update");
  await expect(page.locator("#critic-status")).toHaveText("Value update");
  await page.locator("#loop-reset").click();
  await expect(page.locator("#loop-counter")).toHaveText("01 / 05");
  await page.locator("#tab-loop").focus();
  await page.keyboard.press("Home");
  await expect(page.locator("#tab-trajectory")).toBeFocused();
  await expect(page.locator("#panel-trajectory")).toBeVisible();
});

test("method walkthrough plays and pauses when its tab is hidden", async ({
  page,
}) => {
  await open(page, false);
  await page.locator("#tab-loop").click();
  await page.locator("#loop-play").click();
  await expect(page.locator("#loop-counter")).toHaveText("02 / 05", {
    timeout: 6000,
  });
  await page.locator("#loop-play").click();
  await expect(page.locator("#loop-play")).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await expect(page.locator(".loop-layout")).toHaveClass(/motion-paused/);
  await page.locator("#loop-play").click();
  await page.locator("#tab-credit").click();
  await page.waitForTimeout(3900);
  await expect(page.locator("#loop-counter")).toHaveText("02 / 05");
  await page.locator("#tab-loop").click();
  await page.locator("#loop-play").scrollIntoViewIfNeeded();
  await expect(page.locator("#loop-counter")).toHaveText("03 / 05", {
    timeout: 6000,
  });
  await page.locator("#loop-reset").click();
  await expect(page.locator("#loop-counter")).toHaveText("01 / 05");
});

test("credit explainer replays and observation length does not add credit boundaries", async ({
  page,
}) => {
  await open(page, false);
  await page.locator("#tab-credit").click();
  await page.locator("#credit-play").click();
  await expect(page.locator("#token-timeline")).toHaveClass(/credit-flow/);
  await page.locator("#observation-length").fill("3");
  await expect(page.locator("#observation-output")).toHaveText("long");
  await expect(page.locator(".observation-block div")).toHaveCSS(
    "height",
    "51px",
  );
  await expect(page.locator(".credit-route")).toContainText(
    "one boundary, one decay",
  );
  await expect(page.locator("#panel-credit")).toContainText(
    "deployment in the reported checkpoints remains unverified",
  );
  await expect(page.locator(".reward-comparison")).toContainText("50.09%");
  await expect(page.locator(".reward-comparison")).toContainText("28.72%");
  await page.locator("#tab-loop").click();
  await expect(page.locator("#token-timeline")).not.toHaveClass(/credit-flow/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator("#tab-credit").click();
  await page.locator("#credit-play").click();
  await expect(page.locator("#token-timeline")).not.toHaveClass(/credit-flow/);
});

test("Panorama pauses while another method tab is active and retains its final frame", async ({
  page,
}) => {
  await open(page, false);
  await page.locator(".trajectory-scroll").scrollIntoViewIfNeeded();
  const child = page
    .frames()
    .find((frame) => frame.url().includes("trajectory.html"));
  await expect
    .poll(() => child.evaluate(() => RSI_PLAYER.getState().time))
    .toBeGreaterThan(250);
  await child.evaluate(() => {
    window.tabPersistenceMarker = "same-player";
  });
  await page.locator("#tab-loop").click();
  await expect
    .poll(() => child.evaluate(() => RSI_PLAYER.getState().visible))
    .toBe(false);
  const paused = await child.evaluate(() => RSI_PLAYER.getState().time);
  await page.waitForTimeout(400);
  expect(await child.evaluate(() => RSI_PLAYER.getState().time)).toBe(paused);
  await page.locator("#tab-trajectory").click();
  await page.locator(".trajectory-scroll").scrollIntoViewIfNeeded();
  expect(await child.evaluate(() => window.tabPersistenceMarker)).toBe(
    "same-player",
  );
  await expect
    .poll(() => child.evaluate(() => RSI_PLAYER.getState().time))
    .toBeGreaterThan(paused);
  await expect
    .poll(() => child.evaluate(() => RSI_PLAYER.getState().time), {
      timeout: 10000,
    })
    .toBe(7000);
  const finalPaths = await child.evaluate(() =>
    [...document.querySelectorAll(".curve")].map((path) =>
      path.getAttribute("d"),
    ),
  );
  await page.locator("#tab-credit").click();
  await page.locator("#tab-trajectory").click();
  await page.locator(".trajectory-scroll").scrollIntoViewIfNeeded();
  expect(await child.evaluate(() => RSI_PLAYER.getState().time)).toBe(7000);
  expect(
    await child.evaluate(() =>
      [...document.querySelectorAll(".curve")].map((path) =>
        path.getAttribute("d"),
      ),
    ),
  ).toEqual(finalPaths);
});

test("restored methods fit mobile, tablet and desktop without clipped controls", async ({
  page,
}) => {
  await open(page);
  for (const width of [390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const tab of ["loop", "credit"]) {
      await page.locator(`#tab-${tab}`).click();
      const overflows = await page
        .locator(`#panel-${tab}`)
        .evaluate((panel) => {
          const bounds = panel.getBoundingClientRect();
          return [
            ...panel.querySelectorAll(
              "button, input, code, .tokens, .parameter-cards, .observation-block",
            ),
          ]
            .filter((el) => {
              const box = el.getBoundingClientRect();
              return box.left < bounds.left - 1 || box.right > bounds.right + 1;
            })
            .map((el) => el.id || el.className || el.tagName);
        });
      expect(overflows, `${width} / ${tab}`).toEqual([]);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBe(true);
    }
  }
});

test("resources, citation and runtime remain functional", async ({
  page,
  context,
  request,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await open(page);
  await page.locator('[data-resource="code"]').click();
  await expect(page.locator("#info-dialog")).toContainText(
    "not publicly accessible",
  );
  await page.locator(".dialog-close").click();
  await page.locator('[data-resource="model"]').click();
  await expect(page.locator("#info-dialog")).toContainText("no public models");
  await page.locator(".dialog-close").click();
  for (const id of ["method", "results", "cases", "citation"]) {
    const heading = page.locator(`#${id} .reveal`).first();
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toHaveClass(/is-visible/);
  }
  await page.locator("#copy-citation").click();
  await expect(page.locator("#copy-citation")).toContainText("Copied");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "@misc{yang2026terminalrsi",
  );
  for (const path of [
    "assets/terminal-rsi-paper.pdf",
    "assets/figures/trajectories.png",
    "assets/figures/embedding-drift.png",
    "assets/figures/rust-ffi.png",
    "assets/vendor/echarts.min.js",
  ])
    expect((await request.head(`/${path}`)).ok()).toBe(true);
  expect(errors).toEqual([]);
});
