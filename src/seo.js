const pages = require('./seo-pages.json');
const { getProjectBySlug, projectSeoPage, allProjectSeoPages, absoluteImageUrl } = require('./data/portfolioProjects');
const { getBlogPostByPath } = require('./data/blogPosts');
const origin = 'https://rosue.pro';

const ROSUEPRO_PHONE = '+1-876-566-7328';

const websiteDesignJamaicaFaq = [
  {
    question: 'How much does website design cost in Jamaica?',
    answer:
      'It depends on the size and complexity of the site. At RosuePro, landing pages start from J$25,000 and website fixes start from J$8,000. Larger or more complex projects are quoted based on scope.',
  },
  {
    question: 'Is a landing page enough for my business?',
    answer:
      'For many small businesses, yes, especially at the start. If your main goal is to get customers to contact you or book, a focused landing page can do that job well. You can always expand into a larger website later.',
  },
  {
    question: 'What does a WhatsApp chatbot do?',
    answer:
      'It automatically replies to customer messages on WhatsApp, answering common questions and collecting enquiry details, so customers get a quick response even when you are unavailable. RosuePro AI and WhatsApp chatbots start from J$28,000.',
  },
  {
    question: 'Can you fix my existing website instead of building a new one?',
    answer:
      'Yes. If your current site is broken, slow or out of date, a repair may be all you need. Website fixes and repairs start from J$8,000, depending on what needs doing.',
  },
  {
    question: 'Where is RosuePro based?',
    answer:
      'RosuePro is based in Kingston, Jamaica, and offers web design, chatbot and AI automation services to local businesses island-wide.',
  },
];

function pageFor(pathname) {
  const path = pathname.replace(/\/$/, '') || '/';
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

function absoluteAsset(assetPath) {
  return absoluteImageUrl(assetPath || '/social-preview.png');
}

function schemaFor(page) {
  const organization = {
    '@type': 'Organization',
    '@id': origin + '/#organization',
    name: 'RosuePro',
    url: origin + '/',
    logo: origin + '/logo.png',
    email: 'rosuepro@gmail.com',
    telephone: ROSUEPRO_PHONE,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Discovery Bay',
      addressRegion: 'St. Ann',
      addressCountry: 'JM',
    },
    areaServed: [
      { '@type': 'City', name: 'Kingston' },
      { '@type': 'Country', name: 'Jamaica' },
    ],
    sameAs: [
      'https://www.facebook.com/RosuePro',
      'https://www.instagram.com/rosuepro',
      'https://www.linkedin.com/in/rosuepro/',
    ],
  };

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

  if (page.path === '/blog/website-design-jamaica-price') {
    graph.push({
      '@type': 'LocalBusiness',
      '@id': origin + '/#rosuepro-local',
      name: 'RosuePro',
      url: origin + '/',
      telephone: ROSUEPRO_PHONE,
      email: 'rosuepro@gmail.com',
      address: organization.address,
      areaServed: organization.areaServed,
      priceRange: 'J$8,000 – J$45,000+',
    });
    graph.push({
      '@type': 'Service',
      '@id': origin + '/blog/website-design-jamaica-price#landing-chatbot-package',
      name: 'Landing page + WhatsApp chatbot setup',
      description:
        'Landing page plus WhatsApp chatbot setup for Jamaican small businesses: J$45,000 one-time, then J$4,000/month for the chatbot service (not website hosting).',
      provider: { '@id': organization['@id'] },
      areaServed: organization.areaServed,
      offers: {
        '@type': 'Offer',
        price: '45000',
        priceCurrency: 'JMD',
        description:
          'J$45,000 one-time setup for the landing page and WhatsApp chatbot, then J$4,000/month for ongoing chatbot service (not hosting).',
        url: origin + '/',
        availableAtOrFrom: { '@id': origin + '/#rosuepro-local' },
      },
    });
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

  if (page.path !== '/' && !page.noindex) {
    const crumbs = [{ name: 'Home', item: origin + '/' }];
    if (page.path.startsWith('/blog/')) crumbs.push({ name: 'Blog', item: origin + '/blog' });
    crumbs.push({ name: page.label, item: origin + page.path });
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
  for (const [key, value] of Object.entries({
    title: page.title,
    description: page.description,
    url: origin + page.path,
    type: page.type || 'website',
    site_name: 'RosuePro',
    image: asset,
    'image:alt': page.imageAlt || 'RosuePro Website Development',
  })) {
    setMeta('property', 'og:' + key, value);
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
