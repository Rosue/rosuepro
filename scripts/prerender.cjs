// Render the same React routes used by the browser; no separate SEO-only copy.
process.env.NODE_ENV = 'production';
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const { JSDOM } = require('jsdom');
const original = require.extensions['.js'];
require.extensions['.js'] = (module, filename) => {
  if (!filename.startsWith(path.resolve('src') + path.sep)) return original(module, filename);
  const result = babel.transformFileSync(filename, { babelrc: false, configFile: false, presets: [['@babel/preset-env', { targets: { node: 'current' } }], ['@babel/preset-react', { runtime: 'automatic' }]] });
  module._compile(result.code, filename);
};
const React = require('react');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');
const Router = require('../src/core/Router').default;
const { pages, origin, applyMetadata } = require('../src/seo');
const template = fs.readFileSync('build/index.html','utf8');
for (const route of [...Object.keys(pages), '/404']) {
  const dom = new JSDOM(template);
  const doc = dom.window.document;
  applyMetadata(doc, route);
  const root = doc.getElementById('root');
  root.innerHTML = renderToString(React.createElement(StaticRouter, { location: route }, React.createElement(Router)));
  root.setAttribute('data-prerendered','true');
  doc.querySelector('noscript')?.remove();
  const file = route === '/' ? 'build/index.html' : path.join('build', route + '.html');
  fs.mkdirSync(path.dirname(file), {recursive:true});
  fs.writeFileSync(file,dom.serialize());
  console.log('Prerendered ' + route);
}
fs.writeFileSync('build/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + Object.keys(pages).map(route => '  <url><loc>' + origin + route + '</loc></url>').join('\n') + '\n</urlset>\n');
fs.writeFileSync('build/robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: ' + origin + '/sitemap.xml\n');
