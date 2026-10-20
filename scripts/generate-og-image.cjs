const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 1200px; height: 630px; overflow: hidden; }
    .canvas {
      width: 1200px;
      height: 630px;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      background: radial-gradient(ellipse 120% 90% at 85% 20%, #2A56B8 0%, #163A8C 52%, #102C6C 100%);
      position: relative;
      padding: 80px 100px;
    }
    .wordmark {
      font-size: 96px;
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.02em;
    }
    .wordmark .rosue { color: #ffffff; }
    .wordmark .pro { color: #E86F12; }
    .headline {
      margin-top: 36px;
      max-width: 980px;
      font-size: 52px;
      font-weight: 700;
      line-height: 1.12;
      color: #ffffff;
    }
    .subline {
      margin-top: 22px;
      font-size: 28px;
      font-weight: 400;
      color: #C9D6F0;
    }
    .bottom {
      position: absolute;
      left: 100px;
      right: 100px;
      bottom: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 14px 26px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.28);
      background: rgba(42, 86, 184, 0.35);
      color: #ffffff;
      font-size: 22px;
      font-weight: 600;
    }
    .dot {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: #1EBE5D;
      flex-shrink: 0;
    }
    .domain {
      font-size: 28px;
      font-weight: 700;
      color: #ffffff;
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="wordmark" aria-hidden="true"><span class="rosue">Rosue</span><span class="pro">Pro</span></div>
    <p class="headline">Landing pages + AI chatbots for small businesses</p>
    <p class="subline">Built fast. Ready to sell. Worldwide.</p>
    <div class="bottom">
      <div class="pill"><span class="dot"></span>Chat with us on WhatsApp</div>
      <div class="domain">rosue.pro</div>
    </div>
  </div>
</body>
</html>`;

(async () => {
  const outPath = path.join(__dirname, '../public/og-image.png');
  const tmpHtml = path.join(__dirname, '../.og-image-render.html');
  fs.writeFileSync(tmpHtml, html);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(`file://${tmpHtml}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: outPath, type: 'png' });
  await browser.close();
  fs.unlinkSync(tmpHtml);
  const { size } = fs.statSync(outPath);
  if (size > 350 * 1024) {
    console.error(`og-image.png is ${size} bytes (max ~350KB)`);
    process.exit(1);
  }
  console.log(`Wrote ${outPath} (${size} bytes)`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
