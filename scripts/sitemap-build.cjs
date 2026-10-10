const { execSync } = require('child_process');
const path = require('path');
const { allPublicRoutes, origin } = require('../src/seo');
const { getBlogPostByPath } = require('../src/data/blogPosts');

const root = path.join(__dirname, '..');

const routeSourceFiles = {
  '/': 'src/pages/Landing.js',
  '/portfolio': 'src/pages/Portforlio.js',
  '/resume': 'src/pages/Resume.js',
  '/blog': 'src/pages/Blog.js',
  '/about-us': 'src/pages/About.js',
  '/tutoring': 'src/pages/Tutoring.js',
};

function gitLastMod(relativePath) {
  try {
    return execSync(`git log -1 --format=%cs -- "${relativePath}"`, {
      cwd: root,
      encoding: 'utf8',
    }).trim();
  } catch {
    return null;
  }
}

function lastModForRoute(route) {
  const blog = getBlogPostByPath(route);
  if (blog?.datePublished) return blog.datePublished;

  if (route.startsWith('/portfolio/')) {
    return gitLastMod('src/data/portfolioProjects.js') || gitLastMod('src/data/portfolioProjectDetails.js');
  }

  if (route.startsWith('/blog/')) {
    return gitLastMod('src/pages/Blog.js');
  }

  const source = routeSourceFiles[route] || 'src/seo-pages.json';
  return gitLastMod(source);
}

function buildSitemapXml(buildDate = new Date().toISOString().slice(0, 10)) {
  const urls = allPublicRoutes()
    .map((route) => {
      const lastmod = lastModForRoute(route) || buildDate;
      return `  <url>\n    <loc>${origin}${route}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRobotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
}

module.exports = { buildSitemapXml, buildRobotsTxt, lastModForRoute };
