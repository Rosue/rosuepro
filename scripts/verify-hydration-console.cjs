const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { allPublicRoutes } = require('../src/seo');

const buildDir = path.join(__dirname, '..', 'build');
const routes = [...allPublicRoutes(), '/404', '/about-us', '/resume'];
const port = Number(process.env.HYDRATION_CHECK_PORT) || 3766;

function resolveFile(urlPath) {
  let pathname = urlPath.split('?')[0];
  if (pathname.endsWith('/')) pathname = pathname.slice(0, -1);
  if (pathname === '') pathname = '/';

  const candidates = [
    pathname === '/' ? path.join(buildDir, 'index.html') : path.join(buildDir, pathname + '.html'),
    path.join(buildDir, '404.html'),
  ];

  for (const file of candidates) {
    if (fs.existsSync(file)) return file;
  }
  return path.join(buildDir, 'index.html');
}

function startFirebaseLikeServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const file = resolveFile(req.url || '/');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fs.readFileSync(file));
    });
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

async function main() {
  const server = await startFirebaseLikeServer();
  const browser = await chromium.launch();
  const failures = [];

  for (const route of routes) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(String(err)));

    await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(400);

    const reactHydration = errors.filter(
      (e) =>
        /Minified React error #418|#423|Hydration/i.test(e) ||
        /did not match/i.test(e)
    );
    if (reactHydration.length) {
      failures.push({ route, errors: reactHydration });
    }
    await context.close();
  }

  await browser.close();
  server.close();

  const out = path.join('/opt/cursor/artifacts', 'hydration-console-report.json');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify({ failures, routeCount: routes.length }, null, 2));

  if (failures.length) {
    console.error('Hydration/console failures:', JSON.stringify(failures, null, 2));
    process.exit(1);
  }
  console.log(`OK: ${routes.length} routes, no React hydration console errors`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
