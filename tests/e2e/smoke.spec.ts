import { test, expect } from "@playwright/test";
import { chapters } from "../../content/chapters";
import { projects } from "../../content/projects";

// REDESIGN_PLAN.md Phase 8: home loads, all 11 chapters reachable via the
// menu, case-study routes return 200 under the basePath, no console errors.
//
// Every page.goto() below is a relative path with NO leading slash. The
// config's baseURL already carries the GitHub Pages basePath
// (http://localhost:4173/SMRB-Portfolio/); a leading "/" resolves against
// the bare origin instead (standard URL rules), silently dropping the
// basePath and 404ing (or worse, 200ing against serve's own directory
// listing for "/", which was a false-positive "home loads" pass the first
// time this suite ran) - caught by adding the actual slug to the 200
// assertion's message and seeing it fail on every project, not a flaky one.
// Known, accepted limitation (documented in REDESIGN_PLAN.md's decisions
// log): a direct (non-Link) navigation to a /work/[slug]/ page makes Next's
// client router try to prefetch that same page's own RSC payload right
// after hydration, which 404s under static export - harmless, doesn't
// affect rendering, and out of scope to "fix" here. Chromium's own
// "Failed to load resource" console message never includes the URL, so
// this has to be matched against the network response, not console text.
const KNOWN_RSC_PREFETCH_404 = /__next\.work[./]\$d\$slug[./]__PAGE__\.txt/;

test.describe("smoke", () => {
  let consoleErrors: string[];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on("console", (msg) => {
      // Chromium logs its own generic "Failed to load resource" line for
      // every failed request; the "response" listener below checks those
      // precisely by URL, so this would otherwise double-report them.
      if (msg.type() === "error" && !/^Failed to load resource:/.test(msg.text())) {
        consoleErrors.push(msg.text());
      }
    });
    page.on("pageerror", (err) => consoleErrors.push(String(err)));
    page.on("response", (res) => {
      if (res.status() >= 400 && !KNOWN_RSC_PREFETCH_404.test(res.url())) {
        consoleErrors.push(`${res.status()} ${res.url()}`);
      }
    });
  });

  test.afterEach(() => {
    expect(consoleErrors, consoleErrors.join("\n")).toEqual([]);
  });

  test("home loads", async ({ page }) => {
    const response = await page.goto("./");
    expect(response?.status()).toBe(200);
    // Both the desktop Board and the mobile/reduced-motion ChapterStack
    // keep their own <h1> for chapter 1 in the DOM at all times (CSS-only
    // responsive switching to avoid a hydration mismatch, not two real
    // headings) - exactly one is ever display:none, so ":visible" is the
    // one an actual visitor or screen reader perceives.
    await expect(page.locator("h1:visible")).toBeVisible();
  });

  test("all chapters are reachable via the chapter menu", async ({ page }) => {
    expect(chapters.length).toBe(11);
    await page.goto("./");
    const menuNav = page.getByRole("navigation", { name: "Chapters" });
    for (const chapter of chapters) {
      await page.getByRole("button", { name: /open chapter menu/i }).first().click();
      await menuNav.getByRole("link", { name: new RegExp(chapter.shortTitle) }).click();
      await expect(page.locator(`#${chapter.id}`)).toBeInViewport();
    }
  });

  test("case-study routes return 200 under the basePath", async ({ page }) => {
    for (const project of projects) {
      const response = await page.goto(`work/${project.slug}/`);
      expect(response?.status(), `slug: ${project.slug}`).toBe(200);
      await expect(page.locator("h1")).toContainText(project.name);
    }
  });
});
