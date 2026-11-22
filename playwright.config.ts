import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PREVIEW_PORT || "4173";
const BASE_URL = `http://localhost:${PORT}/SMRB-Portfolio`;

// Smoke tests only (REDESIGN_PLAN.md Phase 8): exercise the real static
// export under its GitHub Pages basePath, not `next dev`.
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  fullyParallel: true,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: `${BASE_URL}/`,
    // Forces the ChapterStack layout (no GSAP/ScrollTrigger camera), which
    // is the stable thing a smoke test should exercise; the scroll-driven
    // Board is covered by the manual Playwright QA passes each phase has
    // used instead (documented in the decisions log), not this suite.
    reducedMotion: "reduce",
  },
  webServer: {
    command: "node scripts/preview-export.js",
    url: `${BASE_URL}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
