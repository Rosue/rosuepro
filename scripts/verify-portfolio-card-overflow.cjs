const http = require('http');
const { chromium } = require('playwright');

const VIEWPORTS = [360, 390, 768, 820, 1024, 1280, 1440];
const BASE_URL = process.env.PORTFOLIO_OVERFLOW_BASE_URL || 'http://127.0.0.1:3000';
const ROUTES = [
  {
    path: '/portfolio',
    cardSelector: '.portfolio-client-grid .portfolio-project-card',
    rowSelector: '.portfolio-client-grid .col',
  },
  {
    path: '/',
    cardSelector: '.featured-projects .project-promo-card',
    rowSelector: '.featured-projects .row > .col',
  },
];

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

        card.querySelectorAll('.portfolio-card-actions--showcase .portfolio-card-btn').forEach((btn) => {
          const rect = btn.getBoundingClientRect();
          if (rect.height < 44) {
            errors.push(
              `${routePath} card "${cardLabel}" button "${btn.getAttribute('aria-label') || btn.textContent?.trim()}" height ${rect.height}px < 44px at viewport ${viewportWidth}px`
            );
          }
          if (rect.right > cardRect.right + 1 || rect.left < cardRect.left - 1) {
            errors.push(
              `${routePath} card "${cardLabel}" button "${btn.getAttribute('aria-label') || btn.textContent?.trim()}" outside card bounds at viewport ${viewportWidth}px`
            );
          }
        });

        const shareRow = card.querySelector('.portfolio-card-share-actions');
        if (shareRow) {
          const shareRect = shareRow.getBoundingClientRect();
          if (shareRect.right > cardRect.right + 1 || shareRect.left < cardRect.left - 1) {
            errors.push(
              `${routePath} card "${cardLabel}" share actions outside card bounds at viewport ${viewportWidth}px`
            );
          }
        }
      });

      const rowEls = cards.map((card) =>
        card.querySelector('.portfolio-card-actions-primary')
      ).filter(Boolean);

      const sorted = rowEls
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return { el, top: rect.top, bottom: rect.bottom };
        })
        .sort((a, b) => a.top - b.top || a.el.getBoundingClientRect().left - b.el.getBoundingClientRect().left);

      const rows = [];
      sorted.forEach((item) => {
        const row = rows.find((r) => Math.abs(r.top - item.top) < 8);
        if (row) {
          row.items.push(item);
        } else {
          rows.push({ top: item.top, items: [item] });
        }
      });

      rows.forEach((row) => {
        if (row.items.length < 2) {
          return;
        }
        const bottoms = row.items.map((item) => item.bottom);
        const diff = Math.max(...bottoms) - Math.min(...bottoms);
        if (diff > 2) {
          errors.push(
            `${routePath} action buttons not bottom-aligned in a grid row (delta ${diff.toFixed(1)}px) at viewport ${viewportWidth}px`
          );
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
