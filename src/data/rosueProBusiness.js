/** Facts used in JSON-LD (must match on-site copy and pricing). */
const origin = 'https://rosue.pro';

const address = {
  '@type': 'PostalAddress',
  addressLocality: 'Discovery Bay',
  addressRegion: 'St. Ann',
  addressCountry: 'JM',
};

const areaServed = [
  { '@type': 'City', name: 'Kingston' },
  { '@type': 'Country', name: 'Jamaica' },
];

const sameAs = [
  'https://www.facebook.com/RosuePro',
  'https://www.instagram.com/rosuepro',
  'https://www.linkedin.com/in/rosuepro/',
];

const serviceCatalog = [
  {
    id: 'landing-page-whatsapp-chatbot',
    name: 'Landing page + WhatsApp chatbot setup',
    description:
      'Template-based landing page plus WhatsApp chatbot setup for Jamaican small businesses, with handoff rules when a person should take over.',
    offer: {
      price: '45000',
      priceCurrency: 'JMD',
      description:
        'J$45,000 one-time setup, then J$4,000/month chatbot service. The monthly fee covers ongoing chatbot service only — not website hosting, domain, or e-commerce platform fees.',
    },
  },
  {
    id: 'custom-websites',
    name: 'Custom websites',
    description:
      'Business websites built around your services, branding, and contact details so people can find you on Google and reach out.',
    offer: {
      description: 'From J$25,000 for an agreed business website scope.',
    },
  },
  {
    id: 'google-business-profile',
    name: 'Google Business Profile (Google Maps)',
    description:
      'Help claiming and verifying a Google Business Profile on Google Maps, then customising the listing with description, categories, hours, and contact details.',
    offer: {
      description: 'Ask for a price — scope confirmed before work begins.',
    },
  },
  {
    id: 'website-fixes',
    name: 'Website fixes',
    description: 'One specific website problem assessed and fixed, with clear scope before work begins.',
    offer: {
      description: 'From J$8,000 per agreed repair.',
    },
  },
  {
    id: 'ai-automations',
    name: 'AI automations',
    description:
      'Focused automations connected to the tools your business already uses, such as intake, follow-ups, or data entry.',
    offer: {
      description: 'From J$35,000 per agreed workflow or integration.',
    },
  },
  {
    id: 'ai-chatbots',
    name: 'AI chatbots',
    description:
      'Website or WhatsApp chatbots that answer FAQs, capture leads, and hand off to a person when needed.',
    offer: {
      description: 'From J$28,000 for a scoped website or WhatsApp bot.',
    },
  },
  {
    id: 'java-tutoring',
    name: 'Java tutoring & guided debugging',
    description: 'Online Java tutoring and guided debugging for learners in Jamaica.',
    offer: {
      description: 'J$3,500 per 60-minute online session — evenings and Saturdays by appointment.',
    },
  },
];

module.exports = {
  origin,
  phone: '+1-876-566-7328',
  email: 'rosuepro@gmail.com',
  address,
  areaServed,
  sameAs,
  serviceCatalog,
};
