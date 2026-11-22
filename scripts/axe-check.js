const { chromium } = require("playwright-core");
const { AxeBuilder } = require("@axe-core/playwright");
const { spawn } = require("child_process");
const path = require("path");

const port = "4173";
const base = `http://localhost:${port}/SMRB-Portfolio`;

(async () => {
  const server = spawn(`npx serve "${path.resolve(__dirname, "..", ".preview-root")}" -l ${port}`, {
    stdio: "ignore",
    shell: true,
  });
  await new Promise((r) => setTimeout(r, 4000));

  const browser = await chromium.launch();

  for (const [label, url, reducedMotion] of [
    ["home (desktop)", `${base}/`, "no-preference"],
    ["home (reduced motion / mobile)", `${base}/`, "reduce"],
    ["404", `${base}/404.html`, "no-preference"],
  ]) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion,
    });
    const page = await context.newPage();
    await page.goto(url);
    await page.waitForTimeout(2000);
    const results = await new AxeBuilder({ page }).analyze();
    console.log(label, "violations:", results.violations.length, JSON.stringify(results.violations.map((v) => v.id)));
    for (const v of results.violations) {
      console.log(JSON.stringify(v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })), null, 2));
    }
    await context.close();
  }

  await browser.close();
  server.kill();
})();
