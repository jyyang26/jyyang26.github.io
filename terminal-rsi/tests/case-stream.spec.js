const { test, expect } = require("@playwright/test");
test("Hero identity and Approach labels are updated", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".title-cursor")).toHaveCount(0);
  await expect(page.locator('#main-nav a[href="#method"]')).toHaveText(
    "Approach",
  );
  await expect(page.locator(".authors")).toHaveCSS("font-weight", "700");
  await expect(page.locator(".authors")).toHaveCSS("color", "rgb(0, 0, 0)");
  const authors = page.locator(".authors");
  const desktop = page.viewportSize().width > 649;
  await expect(authors).toHaveCSS("font-size", desktop ? "15.6px" : "14.8px");
  await page.evaluate(() => document.fonts.ready);
  const layout = await authors.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      height: element.getBoundingClientRect().height,
      lineHeight: parseFloat(style.lineHeight),
      width: element.clientWidth,
      contentWidth: element.scrollWidth,
    };
  });
  expect(layout.contentWidth).toBeLessThanOrEqual(layout.width);
  if (desktop) expect(layout.height).toBeLessThanOrEqual(layout.lineHeight + 1);
  await expect(page.locator(".affiliation-row")).toContainText(
    "Tencent Hy Foundation Model Frontier",
  );
});
test("RPR-2 uses new independent trials and no repeated RSR-2 excerpt", async ({
  page,
}) => {
  await page.goto("/");
  const cases = await page.evaluate(() => TERMINAL_RESEARCH.cases);
  for (const c of Object.values(cases)) {
    expect(c.stages).toHaveLength(5);
    expect(new Set(c.stages.map((s) => s.trial)).size).toBe(5);
    expect(c.stages[4].evidenceKind).toBe("recorded");
    expect(c.stages[4].repeatTrials).toHaveLength(2);
    expect(c.stages[4].logs).not.toEqual(c.stages[3].logs);
  }
});
async function setup(page) {
  await page.clock.install();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.locator(".terminal-player").scrollIntoViewIfNeeded();
  await expect(page.locator("#case-content")).toHaveAttribute(
    "data-playing",
    "true",
  );
  await page.clock.pauseAt(await page.evaluate(() => Date.now() + 1000));
  await page.evaluate(() => document.querySelector("#case-replay").click());
  await page.clock.runFor(32);
}

async function snapshot(page) {
  return page.locator("#case-content").evaluate((el) => ({
    key: el.dataset.case,
    step: el.dataset.stage,
    elapsed: Number(el.dataset.elapsed),
    playing: el.dataset.playing,
    text: document.querySelector("#terminal-output").textContent,
    path: document
      .querySelector(".ladder-curve")
      .getAttribute("stroke-dashoffset"),
  }));
}

test("ten independent stages play A then B with exactly three-second chapters", async ({
  page,
}) => {
  await setup(page);
  for (const key of ["drift", "ffi"]) {
    for (let i = 0; i < 5; i++) {
      const start = await snapshot(page);
      expect(start.key).toBe(key);
      expect(start.step).toBe(String(i));
      expect(start.elapsed).toBeLessThan(100);
      await page.clock.runFor(2800);
      await expect(page.locator("#case-content")).toHaveAttribute(
        "data-stage",
        String(i),
      );
      const atEnd = await snapshot(page);
      expect(atEnd.text.length).toBeGreaterThan(start.text.length);
      if (i === 4)
        await expect(page.locator("#terminal-output")).toContainText(
          key === "ffi" ? "2 passed in 2.37s" : "11 passed in 26.69s",
        );
      await page.clock.runFor(200);
    }
  }
  await expect(page.locator("#case-content")).toHaveAttribute(
    "data-playing",
    "false",
  );
  await expect(page.locator("#case-content")).toHaveAttribute(
    "data-case",
    "ffi",
  );
  await expect(page.locator("#terminal-position")).toHaveText("05 / 05");
  await expect(page.locator("#case-playback-status")).toContainText("complete");
  const final = await snapshot(page);
  await page.clock.runFor(6000);
  expect(await snapshot(page)).toEqual(final);
  expect(
    await page
      .locator(".case-segment-tracker b")
      .evaluateAll((bars) =>
        bars.every((bar) => bar.style.transform === "scaleX(1)"),
      ),
  ).toBe(true);
});

test("typing and blue stairs advance together, pause retains text, clicks freeze full selected evidence", async ({
  page,
}) => {
  await setup(page);
  await page.clock.runFor(400);
  const partial = await snapshot(page);
  await page.clock.runFor(500);
  expect((await snapshot(page)).text.length).toBeGreaterThan(
    partial.text.length,
  );
  await page.evaluate(() => document.querySelector("#case-play").click());
  const paused = await snapshot(page);
  await page.clock.runFor(4000);
  expect(await snapshot(page)).toEqual(paused);
  await page.evaluate(() => document.querySelector("#case-play").click());
  await page.clock.runFor(2300);
  const early = await snapshot(page);
  expect(early.step).toBe("1");
  await page.clock.runFor(400);
  expect(Number((await snapshot(page)).path)).toBeLessThan(Number(early.path));
  await page.evaluate(() =>
    document
      .querySelector('#case-ladder [data-case-step="4"]')
      .dispatchEvent(new MouseEvent("click", { bubbles: true })),
  );
  await expect(page.locator("#terminal-output")).toContainText(
    "11 passed in 43.98s",
  );
  const selected = await snapshot(page);
  expect(selected.playing).toBe("false");
  expect(selected.path).toBe("0");
  await page.clock.runFor(10000);
  expect(await snapshot(page)).toEqual(selected);
});

test("rapid replay, case changes and background suspension leave only one running clock", async ({
  page,
}) => {
  await setup(page);
  await page.evaluate(() => {
    for (let i = 0; i < 8; i++) document.querySelector("#case-replay").click();
  });
  await page.clock.runFor(3100);
  expect((await snapshot(page)).step).toBe("1");
  await page.evaluate(() => {
    document.querySelector("#case-tab-ffi").click();
    document.querySelector("#case-milestones button:last-child").click();
  });
  const stopped = await snapshot(page);
  await page.clock.runFor(6000);
  expect(await snapshot(page)).toEqual(stopped);
  await page.evaluate(() => document.querySelector("#case-replay").click());
  await page.clock.runFor(400);
  expect((await snapshot(page)).key).toBe("drift");
  expect((await snapshot(page)).step).toBe("0");
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  const hidden = await snapshot(page);
  await page.clock.runFor(6000);
  expect(await snapshot(page)).toEqual(hidden);
  await page.evaluate(() => {
    delete document.hidden;
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.clock.runFor(400);
  expect((await snapshot(page)).elapsed).toBeGreaterThan(hidden.elapsed);
  expect((await snapshot(page)).step).toBe("0");
});
