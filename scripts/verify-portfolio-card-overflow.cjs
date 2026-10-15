const http = require('http');
const path = require('path');
const { chromium } = require('playwright');

const VIEWPORTS = [360, 768, 1024, 1280, 1440];
const BASE_URL = process.env.PORTFOLIO_OVERFLOW_BASE_URL || 'http://127.0.0.1:3000';
const ROUTES = [
  { path: '/portfolio', cardSelector: '.portfolio-project-card' },
  { path: '/', cardSelector: '.project-promo-card' },
];

function assertNoOverflow(card, context) {
  const cardRect = card.getBoundingClientRect();
  const cardLabel =
    card.querySelector('.card-title')?.textContent?.trim() || context.cardIndex;

  if (card.scrollWidth > card.clientWidth + 1) {
    throw new Error(
      `${context.route} card "${cardLabel}" scrollWidth ${card.scrollWidth} > clientWidth ${card.clientWidth} at viewport ${context.width}px`
    );
  }

  const buttons = card.querySelectorAll('.portfolio-card-actions .btn');
  buttons.forEach((btn) => {
    const rect = btn.getBoundingClientRect();
    if (rect.right > cardRect.right + 1 || rect.left < cardRect.left - 1) {
      throw new Error(
        `${context.route} card "${cardLabel}" button "${btn.textContent?.trim()}" outside card bounds at viewport ${context.width}px (btn right ${rect.right}, card right ${cardRect.right})`
      );
    }
  });

  const shareRow = card.querySelector('.project-share-actions');
  if (shareRow) {
    const shareRect = shareRow.getBoundingClientRect();
    if (shareRect.right > cardRect.right + 1 || shareRect.left < cardRect.left - 1) {
      throw new Error(
        `${context.route} card "${cardLabel}" share actions outside card bounds at viewport ${context.width}px`
      );
    }
  }
}

async function checkRoute(page, route, width) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForSelector(route.cardSelector, { timeout: 30000 });

  const failures = await page.evaluate(
    ({ cardSelector, routePath, viewportWidth }) => {
      const cards = Array.from(document.querySelectorAll(cardSelector));
      const errors = [];

      cards.forEach((card, cardIndex) => {
        const cardRect = card.getBoundingClientRect();
        const cardLabel =
          card.querySelector('.card-title')?.textContent?.trim() || String(cardIndex);

        if (card.scrollWidth > card.clientWidth + 1) {
          errors.push(
            `${routePath} card "${cardLabel}" scrollWidth ${card.scrollWidth} > clientWidth ${card.clientWidth} at viewport ${viewportWidth}px`
          );
        }

        card.querySelectorAll('.portfolio-card-actions .btn').forEach((btn) => {
          const rect = btn.getBoundingClientRect();
          if (rect.right > cardRect.right + 1 || rect.left < cardRect.left - 1) {
            errors.push(
              `${routePath} card "${cardLabel}" button "${btn.textContent?.trim()}" outside card bounds at viewport ${viewportWidth}px`
            );
          }
        });

        const shareRow = card.querySelector('.project-share-actions');
        if (shareRow) {
          const shareRect = shareRow.getBoundingClientRect();
          if (shareRect.right > cardRect.right + 1 || shareRect.left < cardRect.left - 1) {
            errors.push(
              `${routePath} card "${cardLabel}" share actions outside card bounds at viewport ${viewportWidth}px`
            );
          }
        }
      });

      return errors;
    },
    { cardSelector: route.cardSelector, routePath: route.path, viewportWidth: width }
  );

  if (failures.length) {
    throw new Error(failures.join('\n'));
  }
}

async function waitForServer(url) {
  const { hostname, port, pathname } = new URL(url);
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get({ hostname, port, path: pathname || '/', timeout: 2000 }, (res) => {
          res.resume();
          resolve();
        });
        req.on('error', reject);
        req.on('timeout', () => {
          req.destroy();
          reject(new Error('timeout'));
        });
      });
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw new Error(`Server not reachable at ${url}`);
}

(async () => {
  if (!process.env.PORTFOLIO_OVERFLOW_BASE_URL) {
    await waitForServer(BASE_URL);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    for (const width of VIEWPORTS) {
      for (const route of ROUTES) {
        await checkRoute(page, route, width);
        console.log(`OK ${route.path} @ ${width}px`);
      }
    }
    console.log('Portfolio card overflow checks passed for all viewports.');
  } finally {
    await browser.close();
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
