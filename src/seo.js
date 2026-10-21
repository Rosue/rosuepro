const pages = require('./seo-pages.json');
const { getProjectBySlug, projectSeoPage, allProjectSeoPages, absoluteImageUrl } = require('./data/portfolioProjects');
const { getBlogPostByPath } = require('./data/blogPosts');
const {
  phone: ROSUEPRO_PHONE,
  email: ROSUEPRO_EMAIL,
  address: ROSUEPRO_ADDRESS,
  areaServed: ROSUEPRO_AREA_SERVED,
  sameAs: ROSUEPRO_SAME_AS,
  serviceCatalog,
} = require('./data/rosueProBusiness');
const origin = 'https://rosue.pro';

const websiteDesignJamaicaFaq = [
  {
    question: 'How much does website design cost in Jamaica?',
    answer:
      'It depends on the size and complexity of the site. RosuePro quotes landing pages, website fixes, and larger builds based on scope — message us on WhatsApp or email for a quote.',
  },
  {
    question: 'Is a landing page enough for my business?',
    answer:
      'For many small businesses, yes, especially at the start. If your main goal is to get customers to contact you or book, a focused landing page can do that job well. You can always expand into a larger website later.',
  },
  {
    question: 'What does a WhatsApp chatbot do?',
    answer:
      'It automatically replies to customer messages on WhatsApp, answering common questions and collecting enquiry details, so customers get a quick response even when you are unavailable. Get a quote from RosuePro for a scoped chatbot.',
  },
  {
    question: 'Can you fix my existing website instead of building a new one?',
    answer:
      'Yes. If your current site is broken, slow or out of date, a repair may be all you need. Website fixes are quoted based on what needs doing — contact RosuePro on WhatsApp.',
  },
  {
    question: 'Where is RosuePro based?',
    answer:
      'RosuePro is a fully remote studio serving small businesses worldwide, with a registered business address in Discovery Bay, St. Ann, Jamaica.',
  },
];

function pageFor(pathname) {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path === '/404') {
    return {
      path: '/404',
      title: 'Page Not Found | RosuePro',
      description: 'This page could not be found. Explore RosuePro services, view our portfolio, or contact us for help.',
      label: 'Page not found',
      noindex: true,
    };
  }
  const projectMatch = path.match(/^\/portfolio\/([^/]+)$/);
  if (projectMatch) {
    const project = getProjectBySlug(projectMatch[1]);
    if (project) return projectSeoPage(project);
    return {
      path,
      title: 'Page Not Found | RosuePro',
      description: 'This page could not be found. Explore RosuePro services, view our portfolio, or contact us for help.',
      label: 'Page not found',
      noindex: true,
    };
  }
  const page = {
    path,
    ...(pages[path] || {
      title: 'Page Not Found | RosuePro',
      description: 'This page could not be found. Explore RosuePro services, view our portfolio, or contact us for help.',
      label: 'Page not found',
      noindex: true,
    }),
  };
  const blog = getBlogPostByPath(path);
  if (blog?.datePublished) {
    page.datePublished = blog.datePublished;
  }
  return page;
}

function allPublicRoutes() {
  return [...Object.keys(pages), ...allProjectSeoPages().map((page) => page.path)];
}

const DEFAULT_OG_IMAGE_PATH = '/og-image.png';
const DEFAULT_OG_IMAGE_URL = absoluteImageUrl(DEFAULT_OG_IMAGE_PATH) + '?v=3';
const DEFAULT_OG_IMAGE_ALT =
  'RosuePro: landing pages and AI chatbots for small businesses worldwide';

function absoluteAsset(assetPath) {
  if (!assetPath) {
    return DEFAULT_OG_IMAGE_URL;
  }
  return absoluteImageUrl(assetPath);
}

function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': origin + '/#organization',
    name: 'RosuePro',
    url: origin + '/',
    logo: origin + '/logo.png',
    email: ROSUEPRO_EMAIL,
    telephone: ROSUEPRO_PHONE,
    address: ROSUEPRO_ADDRESS,
    areaServed: ROSUEPRO_AREA_SERVED,
    sameAs: ROSUEPRO_SAME_AS,
  };
}

function professionalServiceNode() {
  return {
    '@type': 'ProfessionalService',
    '@id': origin + '/#rosuepro-professional-service',
    name: 'RosuePro',
    url: origin + '/',
    image: origin + '/logo.png',
    telephone: ROSUEPRO_PHONE,
    email: ROSUEPRO_EMAIL,
    address: ROSUEPRO_ADDRESS,
    areaServed: ROSUEPRO_AREA_SERVED,
  };
}

function serviceSchemaNodes(providerId, pagePath = '/') {
  return serviceCatalog.map((service) => {
    const offer = {
      '@type': 'Offer',
      url: origin + pagePath,
      description: service.offer.description,
    };
    if (service.offer.price) {
      offer.price = service.offer.price;
      offer.priceCurrency = service.offer.priceCurrency;
    }
    return {
      '@type': 'Service',
      '@id': `${origin}${pagePath}#service-${service.id}`,
      name: service.name,
      description: service.description,
      provider: { '@id': providerId },
      areaServed: ROSUEPRO_AREA_SERVED,
      offers: offer,
    };
  });
}

function shouldIncludeBusinessSchema(page) {
  if (page.noindex) return false;
  return (
    page.path === '/' ||
    page.path === '/about' ||
    page.path === '/portfolio' ||
    page.path.startsWith('/portfolio/')
  );
}

function breadcrumbItems(page) {
  if (page.path === '/' || page.noindex) return null;
  const crumbs = [{ name: 'Home', item: origin + '/' }];
  if (page.path.startsWith('/portfolio')) {
    crumbs.push({ name: 'Portfolio', item: origin + '/portfolio' });
  }
  if (page.path.startsWith('/blog')) {
    crumbs.push({ name: 'Blog', item: origin + '/blog' });
  }
  const leaf = page.path.replace(/\/$/, '');
  if (leaf !== '/portfolio' && leaf !== '/blog') {
    crumbs.push({ name: page.label, item: origin + page.path });
  }
  return crumbs;
}

function schemaFor(page) {
  const organization = organizationNode();

  const pageNode = {
    '@type': page.type === 'article' ? 'Article' : 'WebPage',
    '@id': origin + page.path + '#page',
    url: origin + page.path,
    name: page.title,
    description: page.description,
    inLanguage: 'en',
    isPartOf: { '@id': origin + '/#website' },
    publisher: { '@id': organization['@id'] },
  };

  if (page.type === 'article') {
    pageNode.headline = page.label;
    pageNode.author = { '@type': 'Organization', name: 'RosuePro', '@id': organization['@id'] };
    if (page.datePublished) {
      pageNode.datePublished = page.datePublished;
    }
    if (page.image) {
      pageNode.image = [absoluteAsset(page.image)];
    }
    pageNode.mainEntityOfPage = { '@id': origin + page.path + '#page' };
  }

  const graph = [
    organization,
    {
      '@type': 'WebSite',
      '@id': origin + '/#website',
      name: 'RosuePro',
      url: origin + '/',
      publisher: { '@id': organization['@id'] },
    },
    pageNode,
  ];

  if (shouldIncludeBusinessSchema(page)) {
    graph.push(professionalServiceNode());
    if (page.path === '/' || page.path === '/about') {
      graph.push(...serviceSchemaNodes(organization['@id'], page.path));
    }
  }

  if (page.path === '/blog/website-design-jamaica-price') {
    graph.push({
      '@type': 'FAQPage',
      '@id': origin + page.path + '#faq',
      mainEntity: websiteDesignJamaicaFaq.map((entry) => ({
        '@type': 'Question',
        name: entry.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: entry.answer,
        },
      })),
    });
  }

  const crumbs = breadcrumbItems(page);
  if (crumbs) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((item, i) => ({ '@type': 'ListItem', position: i + 1, ...item })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

function applyMetadata(doc, pathname) {
  const page = pageFor(pathname);
  doc.title = page.title;
  const setMeta = (attribute, key, value) => {
    let tag = doc.querySelector('meta[' + attribute + '="' + key + '"]');
    if (!tag) {
      tag = doc.createElement('meta');
      tag.setAttribute(attribute, key);
      doc.head.appendChild(tag);
    }
    tag.setAttribute('content', value);
  };
  setMeta('name', 'description', page.description);
  setMeta('name', 'robots', page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
  const asset = absoluteAsset(page.image);
  const imageAlt = page.imageAlt || (page.image ? 'RosuePro Website Development' : DEFAULT_OG_IMAGE_ALT);
  for (const [key, value] of Object.entries({
    title: page.title,
    description: page.description,
    url: origin + page.path,
    type: page.type || 'website',
    site_name: 'RosuePro',
    image: asset,
    'image:alt': imageAlt,
  })) {
    setMeta('property', 'og:' + key, value);
  }
  if (!page.image) {
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
  } else {
    doc.querySelectorAll('meta[property="og:image:width"], meta[property="og:image:height"]').forEach((tag) => tag.remove());
  }
  setMeta('name', 'twitter:card', 'summary_large_image');
  for (const key of ['title', 'description', 'image', 'image:alt']) {
    setMeta('name', 'twitter:' + key, doc.querySelector('meta[property="og:' + key + '"]').content);
  }
  let canonical = doc.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = doc.createElement('link');
    canonical.rel = 'canonical';
    doc.head.appendChild(canonical);
  }
  if (page.noindex) canonical.remove();
  else canonical.href = origin + page.path;
  if (page.path === '/') {
    // Hero LCP is the video poster <img fetchpriority="high"> in the page markup.
    doc.querySelectorAll('link[rel="preload"][href="/Slide1.webp"]').forEach((l) => l.remove());
  }
  let schema = doc.getElementById('seo-structured-data');
  if (!schema) {
    schema = doc.createElement('script');
    schema.id = 'seo-structured-data';
    schema.type = 'application/ld+json';
    doc.head.appendChild(schema);
  }
  schema.textContent = JSON.stringify(schemaFor(page)).replace(/</g, '\\u003c');
}

module.exports = { pages, origin, pageFor, schemaFor, applyMetadata, allPublicRoutes };
