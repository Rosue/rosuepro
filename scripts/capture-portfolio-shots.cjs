const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const sharp = require('sharp');

const outDir = path.join(__dirname, '..', 'public', 'portfolio');
fs.mkdirSync(outDir, { recursive: true });

const targets = [
  { url: 'https://pack-my-cart.web.app/', file: 'pack-my-cart.webp' },
  { url: 'https://funeral-template.web.app/', file: 'funeral-template.webp' },
  { url: 'https://carlos-transports.web.app/', file: 'carlos-transports.webp' },
  { url: 'https://reggaewheels-2482a.web.app/', file: 'reggae-wheels.webp' },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  for (const target of targets) {
    console.log('Capturing', target.url);
    await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.waitForTimeout(5000);
    const pngPath = path.join(outDir, target.file.replace('.webp', '.png'));
    await page.screenshot({ path: pngPath, fullPage: false });
    await sharp(pngPath)
      .resize(1280, 800, { fit: 'cover', position: 'top' })
      .webp({ quality: 82 })
      .toFile(path.join(outDir, target.file));
    fs.unlinkSync(pngPath);
    console.log('Wrote', target.file);
  }
  await browser.close();
})();
