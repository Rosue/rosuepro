const origin = 'https://rosue.pro';

const portfolioProjects = [
  {
    slug: 'carlos-transports',
    name: 'Carlos Transports',
    description:
      'Jamaica taxi and private charter booking — private charter, airport pickup, and nightlife & event rides. Fast, safe, and always on time.',
    liveUrl: 'https://carlos-transports.web.app/',
    image: '/portfolio/carlos-transports.webp',
    imageAlt: 'Carlos Transports website showing Jamaica taxi and private charter booking',
    visitLabel: 'Visit Carlos Transports',
    featuredOnHome: true,
  },
  {
    slug: 'vybz-meter',
    name: 'Vybz Meter',
    description: 'An interactive map for discovering and sharing hotspots across Jamaica.',
    liveUrl: 'https://vybz-meter.web.app/',
    image: '/projects/vybz-meter.webp',
    imageAlt: 'Vybz Meter website showing its interactive Jamaica hotspots map',
    visitLabel: 'Visit Vybz Meter',
  },
  {
    slug: 'funeral-template',
    name: 'Funeral Template',
    homeName: 'Funeral site template',
    description: 'A respectful memorial website template families and funeral homes can customise.',
    portfolioDescription: 'A respectful and polished funeral website template.',
    liveUrl: 'https://funeral-template.web.app/',
    image: '/portfolio/funeral-template.webp',
    portfolioImage: '/projects/funeral-template.webp',
    imageAlt: 'Funeral memorial website template homepage',
    portfolioImageAlt: 'Funeral Template website showing its memorial homepage with white doves',
    visitLabel: 'Visit Funeral Template',
    homeVisitLabel: 'Visit Funeral site template',
    featuredOnHome: true,
  },
  {
    slug: 'reggae-wheels',
    name: 'Reggae Wheels Website',
    description: 'This website books and advertises tours, trips and rentals',
    liveUrl: 'https://reggaewheels-2482a.web.app/',
    image: '/reggaewheels-2482a.web.app_ (1).webp',
    imageAlt: 'Reggae Wheels tour and rental booking website',
    visitLabel: 'Visit Reggae Wheels',
  },
  {
    slug: 'shynz-by-onyx',
    name: 'Shynz By Onyx Website',
    description: 'This is an appointment website where users can set and see the schedule',
    liveUrl: 'https://rj-detailing.web.app/',
    image: '/rj-detailing.web.app_calendar.png',
    imageAlt: 'Shynz By Onyx appointment scheduling website',
    visitLabel: 'Visit Shynz By Onyx',
  },
  {
    slug: 'pack-my-cart',
    name: 'Pack My Cart',
    homeName: 'Pack My Cart',
    description: 'Online supermarket platform for Jamaican shops — product listings, carts, and checkout.',
    portfolioDescription: 'This is a new Supermarket Platform',
    liveUrl: 'https://pack-my-cart.web.app/',
    image: '/portfolio/pack-my-cart.webp',
    portfolioImage: '/Screenshot 2025-08-03 160451.png',
    imageAlt: 'Pack My Cart supermarket website homepage',
    portfolioImageAlt: 'Pack My Cart online supermarket platform',
    visitLabel: 'Visit Pack My Cart',
    featuredOnHome: true,
    demoText: 'Live chatbot demo: try Blacka chat on pack-my-cart.web.app',
    demoUrl: 'https://pack-my-cart.web.app/',
  },
  {
    slug: 'yahsonice',
    name: 'Yahsonice Website',
    description: 'This website connects Bar Owners with Bartenders',
    image: '/432952191_923514793107512_60065450142670162_ysn.jpg',
    imageAlt: 'Yahsonice website connecting bar owners with bartenders',
    visitLabel: null,
  },
];

function getProjectBySlug(slug) {
  return portfolioProjects.find((project) => project.slug === slug);
}

function projectPagePath(project) {
  return `/portfolio/${project.slug}`;
}

function absoluteImageUrl(imagePath) {
  if (!imagePath) return null;
  const normalized = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return origin + encodeURI(normalized);
}

function projectImageForContext(project, context) {
  if (context === 'portfolio' && project.portfolioImage) return project.portfolioImage;
  return project.image;
}

function projectImageAltForContext(project, context) {
  if (context === 'portfolio' && project.portfolioImageAlt) return project.portfolioImageAlt;
  return project.imageAlt;
}

function projectDisplayName(project, context) {
  if (context === 'home' && project.homeName) return project.homeName;
  return project.name;
}

function projectDescriptionForContext(project, context) {
  if (context === 'portfolio' && project.portfolioDescription) return project.portfolioDescription;
  return project.description;
}

function projectVisitLabel(project, context) {
  if (context === 'home' && project.homeVisitLabel) return project.homeVisitLabel;
  if (project.visitLabel) return project.visitLabel;
  return `Visit ${project.name}`;
}

function getShareUrl(project) {
  return origin + projectPagePath(project);
}

/** URL shared from portfolio cards (live site when available). */
function projectShareUrl(project) {
  if (project.liveUrl) return project.liveUrl;
  return getShareUrl(project);
}

function shareMessage(project) {
  return `${project.name} — ${project.description}`;
}

function projectShareWhatsAppText(shareTitle, url) {
  return `${shareTitle} — ${url}`;
}

function projectSeoDescription(project) {
  const base = project.description.trim();
  const withName = base.toLowerCase().startsWith(project.name.toLowerCase())
    ? base
    : `${project.name}: ${base}`;
  if (withName.length >= 70) return withName;
  return `${withName} Website development project in the RosuePro Jamaica portfolio.`;
}

function projectSeoPage(project) {
  const path = projectPagePath(project);
  const imagePath = project.image;
  return {
    path,
    title: `${project.name} | RosuePro Portfolio`,
    description: projectSeoDescription(project),
    label: project.name,
    image: imagePath,
    imageAlt: project.imageAlt,
    type: 'website',
  };
}

function allProjectSeoPages() {
  return portfolioProjects.map(projectSeoPage);
}

function featuredHomeProjects() {
  return portfolioProjects.filter((project) => project.featuredOnHome);
}

module.exports = {
  origin,
  portfolioProjects,
  getProjectBySlug,
  projectPagePath,
  absoluteImageUrl,
  projectImageForContext,
  projectImageAltForContext,
  projectDisplayName,
  projectDescriptionForContext,
  projectVisitLabel,
  getShareUrl,
  projectShareUrl,
  projectShareWhatsAppText,
  shareMessage,
  projectSeoPage,
  allProjectSeoPages,
  featuredHomeProjects,
};
