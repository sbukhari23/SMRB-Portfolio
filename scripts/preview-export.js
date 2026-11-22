// Builds the static export and serves it with the GitHub Pages basePath
// prefix (out/ wrapped one level deep as <tmp>/SMRB-Portfolio/), the same
// way REDESIGN_PLAN.md's decisions log records verifying basePath locally.
// `npx serve out` alone serves everything at the bare root, so every
// basePath-prefixed asset URL the app requests would 404.
const fs = require("fs");
const path = require("path");
const { spawnSync, spawn } = require("child_process");

const root = path.resolve(__dirname, "..");
const out = path.join(root, "out");
const previewRoot = path.join(root, ".preview-root");
const target = path.join(previewRoot, "SMRB-Portfolio");
const port = process.env.PREVIEW_PORT || "4173";

// shell:true with a single joined string (not an args array) avoids
// Node's DEP0190 warning about unescaped args under shell:true.
const build = spawnSync("npm run build", { cwd: root, stdio: "inherit", shell: true });
if (build.status !== 0) process.exit(build.status ?? 1);

fs.rmSync(previewRoot, { recursive: true, force: true });
fs.mkdirSync(previewRoot, { recursive: true });
fs.cpSync(out, target, { recursive: true });

const server = spawn(`npx serve "${previewRoot}" -l ${port}`, { stdio: "inherit", shell: true });
process.on("exit", () => server.kill());
process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
