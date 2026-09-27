const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const baseUrl = process.env.PREVIEW_BASE_URL || 'http://localhost:4321';
const docsDir = path.join(__dirname, '..', 'docs', 'screenshots');
const shotsDir = path.join(__dirname, '..', 'public', 'shots');

for (const dir of [docsDir, shotsDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const captures = [
  { name: 'hero', path: '/', viewport: { width: 1280, height: 800 }, clip: { x: 0, y: 0, width: 1280, height: 800 } },
  { name: 'hero-mobile', path: '/', viewport: { width: 390, height: 844 }, clip: { x: 0, y: 0, width: 390, height: 700 } },
  { name: 'portfolio', path: '/#portfolio', viewport: { width: 1280, height: 800 }, selector: '#portfolio' },
  { name: 'tutoring', path: '/tutoring', viewport: { width: 1280, height: 800 }, selector: '.tutoring-page' },
  { name: 'footer', path: '/', viewport: { width: 1280, height: 900 }, selector: 'footer' },
];

(async () => {
  const browser = await chromium.launch();
  for (const shot of captures) {
    const page = await browser.newPage({ viewport: shot.viewport });
    await page.goto(baseUrl + shot.path, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.waitForTimeout(1500);
    const fileName = `${shot.name}.png`;
    if (shot.selector) {
      const el = page.locator(shot.selector).first();
      await el.scrollIntoViewIfNeeded();
      await el.screenshot({ path: path.join(docsDir, fileName) });
      await el.screenshot({ path: path.join(shotsDir, fileName) });
    } else {
      await page.screenshot({ path: path.join(docsDir, fileName), clip: shot.clip });
      await page.screenshot({ path: path.join(shotsDir, fileName), clip: shot.clip });
    }
    console.log('Captured', fileName);
    await page.close();
  }
  await browser.close();
})();
