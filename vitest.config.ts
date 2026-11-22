import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // tests/e2e/** are Playwright specs (run via `npm run test:e2e`), not
    // Vitest ones - both use the default `*.spec.ts` naming, so Vitest's
    // default include glob picks them up unless excluded here, and fails
    // since they use @playwright/test's `test`, not Vitest's.
    exclude: ["node_modules/**", "tests/e2e/**"],
  },
});
