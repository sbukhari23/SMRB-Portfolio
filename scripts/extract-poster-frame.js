const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

// Grabs a still frame from public/videos/<name>.mp4 at a given timestamp and
// saves it as public/images/<name>-poster.jpg, for use as a HoverVideo poster.
//
// page.setContent() loads at an about:blank-ish origin, which Chromium
// refuses file:// media access from (blocked silently: no error, no
// loadedmetadata event, just hangs forever) - so this writes a real sibling
// .html file to disk and page.goto()'s it with file://, giving the page a
// file:// origin of its own, which IS allowed to reference another local
// file:// path.
const [, , name, seekSeconds] = process.argv;
if (!name) {
  console.error('Usage: node extract-poster-frame.js <video-basename> [seekSeconds=3]');
  process.exit(1);
}
const seek = Number(seekSeconds || 3);

(async () => {
  const videoPath = path.resolve(__dirname, `../public/videos/${name}.mp4`);
  const htmlPath = path.resolve(__dirname, `.poster-frame-${name}.html`);
  fs.writeFileSync(
    htmlPath,
    `<!doctype html><html><head><style>html,body{margin:0;background:#000}video{display:block;width:1200px;height:auto}</style></head>
     <body><video id="v" src="${name}.mp4" muted playsinline></video></body></html>`
  );
  fs.copyFileSync(videoPath, path.resolve(__dirname, `${name}.mp4`));

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
  page.on('console', (m) => console.log('[page]', m.text()));

  await page.goto(`file://${htmlPath.replace(/\\/g, '/')}`);
  console.log('navigated, waiting for metadata...');

  await page.evaluate(() => {
    const v = document.getElementById('v');
    return new Promise((resolve, reject) => {
      if (v.readyState >= 1) return resolve();
      v.addEventListener('loadedmetadata', resolve, { once: true });
      v.addEventListener('error', () => reject(new Error('video error: ' + v.error?.message)), { once: true });
      setTimeout(() => reject(new Error('timed out waiting for loadedmetadata')), 15000);
    });
  });
  console.log('metadata loaded, seeking...');

  await page.evaluate((t) => {
    const v = document.getElementById('v');
    v.currentTime = Math.min(t, Math.max(v.duration - 0.1, 0));
  }, seek);
  await page.waitForTimeout(1500);
  console.log('seeked, screenshotting...');

  const outPath = path.resolve(__dirname, `../public/images/${name}-poster.jpg`);
  await page.locator('#v').screenshot({ path: outPath, quality: 85, type: 'jpeg' });
  await browser.close();

  fs.unlinkSync(htmlPath);
  fs.unlinkSync(path.resolve(__dirname, `${name}.mp4`));
  console.log('wrote', outPath);
})().catch((err) => {
  console.error('FAILED:', err);
  process.exit(1);
});
