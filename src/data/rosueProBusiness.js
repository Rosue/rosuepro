/** Facts used in JSON-LD (must match on-site copy and pricing). */
const origin = 'https://rosue.pro';

const address = {
  '@type': 'PostalAddress',
  addressLocality: 'Discovery Bay',
  addressRegion: 'St. Ann',
  addressCountry: 'JM',
};

const areaServed = {
  '@type': 'Place',
  name: 'Worldwide',
};

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
      'Template-based landing page plus WhatsApp chatbot setup for small businesses worldwide, with handoff rules when a person should take over.',
    offer: {
      description:
        'Get a quote on WhatsApp. The monthly chatbot service covers ongoing chatbot service only — not website hosting, domain, or e-commerce platform fees.',
    },
  },
  {
    id: 'custom-websites',
    name: 'Custom websites',
    description:
      'Business websites built around your services, branding, and contact details so people can find you on Google and reach out.',
    offer: {
      description: 'Get a quote for an agreed business website scope.',
    },
  },
  {
    id: 'google-business-profile',
    name: 'Google Business Profile (Google Maps)',
    description:
      'Help claiming and verifying a Google Business Profile on Google Maps, then customising the listing with description, categories, hours, and contact details.',
    offer: {
      description: 'Get a quote — scope confirmed before work begins.',
    },
  },
  {
    id: 'promo-videos',
    name: 'Promo videos',
    description: 'Short promo videos for WhatsApp Status, Reels and your feed. Quote confirmed after scoping.',
    offer: {
      description: 'Get a quote — scope confirmed before work begins.',
    },
  },
  {
    id: 'ai-automations',
    name: 'AI automations',
    description:
      'Focused automations connected to the tools your business already uses, such as intake, follow-ups, or data entry.',
    offer: {
      description: 'Get a quote per agreed workflow or integration.',
    },
  },
  {
    id: 'ai-chatbots',
    name: 'AI chatbots',
    description:
      'Website or WhatsApp chatbots that answer FAQs, capture leads, and hand off to a person when needed.',
    offer: {
      description: 'Get a quote for a scoped website or WhatsApp bot.',
    },
  },
  {
    id: 'java-tutoring',
    name: 'Java tutoring & guided debugging',
    description: 'Online Java tutoring and guided debugging for learners worldwide.',
    offer: {
      description: 'Get a quote per session — message us anytime on WhatsApp or email.',
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
