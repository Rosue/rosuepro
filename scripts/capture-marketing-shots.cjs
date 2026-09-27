const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const baseUrl = process.env.PREVIEW_BASE_URL || 'http://localhost:4321';
const docsDir = path.join(__dirname, '..', 'docs', 'screenshots');
const shotsDir = path.join(__dirname, '..', 'public', 'shots');
const buildShotsDir = path.join(__dirname, '..', 'build', 'shots');

for (const dir of [docsDir, shotsDir, buildShotsDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const captures = [
  { name: 'hero', path: '/', viewport: { width: 1280, height: 800 }, clip: { x: 0, y: 0, width: 1280, height: 800 } },
  { name: 'portfolio', path: '/#portfolio', viewport: { width: 1280, height: 900 }, selector: '#portfolio' },
  { name: 'offer', path: '/#services', viewport: { width: 1280, height: 900 }, selector: '#services' },
];

(async () => {
  const browser = await chromium.launch();
  for (const shot of captures) {
    const page = await browser.newPage({ viewport: shot.viewport });
    await page.goto(baseUrl + shot.path, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.waitForTimeout(2000);
    const fileName = `${shot.name}.png`;
    for (const dir of [docsDir, shotsDir, buildShotsDir]) {
      const out = path.join(dir, fileName);
      if (shot.selector) {
        const el = page.locator(shot.selector).first();
        await el.scrollIntoViewIfNeeded();
        await el.screenshot({ path: out });
      } else {
        await page.screenshot({ path: out, clip: shot.clip });
      }
    }
    console.log('Captured', fileName);
    await page.close();
  }
  await browser.close();
})();
