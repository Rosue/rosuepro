const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const base = 'http://127.0.0.1:3456/about';
const outDir = '/opt/cursor/artifacts/screenshots';
const viewports = [
  { label: '390', width: 390, height: 844 },
  { label: '820', width: 820, height: 1100 },
  { label: '1440', width: 1440, height: 900 },
];

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);
    const file = path.join(outDir, `about-${vp.label}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log('Wrote', file);
    await context.close();
  }
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
