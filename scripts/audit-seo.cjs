const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const routes = ['/', '/portfolio', '/resume', '/blog', '/blog/basic-tips-market-music', '/about-us'];
const origin = 'https://rosue.pro';
const local = process.argv.includes('--local');
async function read(url) {
  if (!local) {
    const r = await fetch(new URL(url, origin));
    return { status: r.status, body: await r.text(), type: r.headers.get('content-type'), url: r.url };
  }
  const pathname = decodeURIComponent(new URL(url, origin).pathname);
  let file = path.join('build', pathname === '/' ? 'index.html' : pathname);
  if (!path.extname(file)) file += '.html';
  const exists = fs.existsSync(file);
  return { status: exists ? 200 : 404, body: fs.readFileSync(exists ? file : 'build/404.html', 'utf8'), url: origin + pathname };
}
(async () => {
  const pages = await Promise.all(routes.map(async route => {
    const result = await read(route);
    return { route, ...result, doc: new JSDOM(result.body, { url: origin + route }).window.document };
  }));
  const all = fn => pages.every(fn);
  const meta = (p, selector) => p.doc.querySelector(selector)?.getAttribute('content') || '';
  const unique = values => new Set(values).size === pages.length;
  const robots = await read('/robots.txt');
  const sitemap = await read('/sitemap.xml');
  const missing = await read('/seo-audit-missing-page');
  const internal = new Set();
  const images = new Set();
  pages.forEach(p => {
    p.doc.querySelectorAll('a[href]').forEach(a => {
      const u = new URL(a.href);
      if (u.origin === origin && u.pathname !== '/') internal.add(u.pathname);
    });
    p.doc.querySelectorAll('img[src]').forEach(i => images.add(new URL(i.src).pathname));
  });
  const linkResults = await Promise.all([...internal].map(read));
  const imageResults = await Promise.all([...images].map(async url => {
    if (local) return fs.existsSync(path.join('build', decodeURIComponent(url)));
    const r = await fetch(origin + url);
    return r.ok && (r.headers.get('content-type') || '').startsWith('image/');
  }));
  const structured = p => [...p.doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(s => {
    try { const v = JSON.parse(s.textContent); return v['@graph'] || [v]; } catch { return []; }
  });
  const checks = [
    ['HTTPS pages respond successfully', all(p => p.status === 200 && p.url.startsWith('https:'))],
    ['Document language declared', all(p => !!p.doc.documentElement.lang)],
    ['Mobile viewport declared', all(p => /width=device-width/.test(meta(p, 'meta[name="viewport"]')))],
    ['Unique descriptive page titles', unique(pages.map(p => p.doc.title)) && all(p => p.doc.title.length >= 15 && p.doc.title.length <= 75)],
    ['Unique page descriptions', unique(pages.map(p => meta(p, 'meta[name="description"]'))) && all(p => meta(p, 'meta[name="description"]').length >= 70)],
    ['Self-referencing canonical URLs', all(p => p.doc.querySelector('link[rel="canonical"]')?.href === origin + p.route)],
    ['Public pages allow indexing', all(p => !/noindex/i.test(meta(p, 'meta[name="robots"]'))) && !/Disallow:\s*\/\s*$/m.test(robots.body)],
    ['XML sitemap lists every public route', /<urlset\b/.test(sitemap.body) && routes.every(r => sitemap.body.includes('<loc>' + origin + r + '</loc>'))],
    ['Robots advertises sitemap', robots.status === 200 && robots.body.includes('Sitemap: ' + origin + '/sitemap.xml')],
    ['Route-specific HTML without JavaScript', unique(pages.map(p => p.doc.querySelector('#root')?.textContent)) && all(p => (p.doc.querySelector('#root')?.textContent.length || 0) > 200)],
    ['Crawlable internal navigation', all(p => p.doc.querySelectorAll('a[href^="/"]').length >= 3)],
    ['One descriptive H1 per page', all(p => p.doc.querySelectorAll('h1').length === 1 && p.doc.querySelector('h1').textContent.length >= 10)],
    ['Images have useful alternative text', images.size > 0 && all(p => [...p.doc.images].every(i => i.hasAttribute('alt') && !/^(logo|First slide|Second slide)$/.test(i.alt)))],
    ['Images reserve layout dimensions', images.size > 0 && all(p => [...p.doc.images].every(i => Number(i.getAttribute('width')) > 0 && Number(i.getAttribute('height')) > 0))],
    ['Social preview metadata', all(p => ['og:title','og:description','og:url','og:image'].every(key => meta(p, 'meta[property="' + key + '"]')) && meta(p, 'meta[name="twitter:card"]') === 'summary_large_image')],
    ['Organization structured data', all(p => structured(p).some(v => v['@type'] === 'Organization' && v.name === 'RosuePro' && v.url === origin + '/'))],
    ['Breadcrumb structured data on subpages', pages.filter(p => p.route !== '/').every(p => structured(p).some(v => v['@type'] === 'BreadcrumbList' && v.itemListElement?.length >= 2))],
    ['Unknown URL returns HTTP 404', missing.status === 404],
    ['Main content landmark', all(p => p.doc.querySelectorAll('main').length === 1)],
    ['Internal links and image assets resolve', internal.size >= 3 && linkResults.every(r => r.status === 200) && imageResults.every(Boolean)]
  ];
  const score = checks.filter(([,pass]) => pass).length * 5;
  const result = { date: new Date().toISOString(), scope: '20-point technical and on-page checklist, 5 points each. Not a Google ranking or Lighthouse score. Excludes backlinks, Search Console, real-user Core Web Vitals, and keyword positions.', mode: local ? 'local-build' : 'live', score, checks: checks.map(([name,pass]) => ({name,pass,points:pass?5:0})), pages:pages.map(({route,status,doc})=>({route,status,title:doc.title})), internalLinks:[...internal] };
  const output = process.argv.find(x => x.startsWith('--output='))?.slice(9);
  if (output) { fs.mkdirSync(path.dirname(output), {recursive:true}); fs.writeFileSync(output, JSON.stringify(result,null,2)); }
  console.log(JSON.stringify(result,null,2));
})().catch(e => { console.error(e); process.exit(1); });
