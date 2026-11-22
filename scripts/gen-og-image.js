const { chromium } = require('playwright-core');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve(__dirname, 'og-image.html'));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.resolve(__dirname, '../public/og-image.png') });
  await browser.close();
  console.log('wrote public/og-image.png');
})();
