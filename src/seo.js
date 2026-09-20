const pages = require('./seo-pages.json');
const origin = 'https://rosue.pro';
function pageFor(pathname) {
  const path = pathname.replace(/\/$/, '') || '/';
  return { path, ...(pages[path] || { title: 'Page Not Found | RosuePro', description: 'This page could not be found. Explore RosuePro services, view our portfolio, or contact us for help.', label: 'Page not found', noindex: true }) };
}
function schemaFor(page) {
  const organization = { '@type': 'Organization', '@id': origin + '/#organization', name: 'RosuePro', url: origin + '/', logo: origin + '/logo.png', email: 'rosuepro@gmail.com', areaServed: { '@type': 'Country', name: 'Jamaica' }, sameAs: ['https://www.facebook.com/RosuePro','https://www.instagram.com/rosuepro','https://www.linkedin.com/in/rosuepro/'] };
  const graph = [organization, { '@type': 'WebSite', '@id': origin + '/#website', name: 'RosuePro', url: origin + '/', publisher: { '@id': organization['@id'] } }, { '@type': page.type === 'article' ? 'Article' : 'WebPage', '@id': origin + page.path + '#page', url: origin + page.path, name: page.title, ...(page.type === 'article' ? { headline: page.label } : {}), description: page.description, inLanguage: 'en', isPartOf: { '@id': origin + '/#website' }, publisher: { '@id': organization['@id'] } }];
  if (page.path !== '/' && !page.noindex) {
    const crumbs = [{ name: 'Home', item: origin + '/' }];
    if (page.path.startsWith('/blog/')) crumbs.push({ name: 'Blog', item: origin + '/blog' });
    crumbs.push({ name: page.label, item: origin + page.path });
    graph.push({ '@type': 'BreadcrumbList', itemListElement: crumbs.map((item, i) => ({ '@type': 'ListItem', position: i + 1, ...item })) });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
function applyMetadata(doc, pathname) {
  const page = pageFor(pathname);
  doc.title = page.title;
  const setMeta = (attribute, key, value) => {
    let tag = doc.querySelector('meta[' + attribute + '="' + key + '"]');
    if (!tag) { tag = doc.createElement('meta'); tag.setAttribute(attribute, key); doc.head.appendChild(tag); }
    tag.setAttribute('content', value);
  };
  setMeta('name','description',page.description);
  setMeta('name','robots',page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
  for (const [key, value] of Object.entries({title:page.title,description:page.description,url:origin+page.path,type:page.type || 'website',site_name:'RosuePro',image:origin+(page.image || '/social-preview.png'),'image:alt':page.imageAlt || 'RosuePro Website Development'})) setMeta('property','og:'+key,value);
  setMeta('name','twitter:card','summary_large_image');
  for (const key of ['title','description','image','image:alt']) setMeta('name','twitter:'+key,doc.querySelector('meta[property="og:'+key+'"]').content);
  let canonical = doc.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical = doc.createElement('link'); canonical.rel = 'canonical'; doc.head.appendChild(canonical); }
  if (page.noindex) canonical.remove(); else canonical.href = origin + page.path;
  let schema = doc.getElementById('seo-structured-data');
  if (!schema) { schema = doc.createElement('script'); schema.id = 'seo-structured-data'; schema.type = 'application/ld+json'; doc.head.appendChild(schema); }
  schema.textContent = JSON.stringify(schemaFor(page)).replace(/</g, '\\u003c');
}
module.exports = { pages, origin, pageFor, schemaFor, applyMetadata };
