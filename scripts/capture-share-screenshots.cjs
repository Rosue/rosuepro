const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const OUT_DIR = '/opt/cursor/artifacts';

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const buildIndex = path.join(__dirname, '../build/index.html');
  await page.goto(`file://${buildIndex}`, { waitUntil: 'load' });
  await page.locator('#share').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.locator('#share').screenshot({
    path: path.join(OUT_DIR, 'home-share-production-build.png'),
  });

  await browser.close();
  console.log('Saved production build screenshot');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
