/** Long-form portfolio copy — facts from project data, demos, and repo docs. */
const portfolioProjectDetails = {
  'carlos-transports': {
    intro:
      'Carlos Transports is a Jamaica-focused taxi and private charter booking site built so travellers can request rides without hunting through scattered social posts or outdated phone lists.',
    sections: [
      {
        heading: 'What visitors can do',
        paragraphs: [
          'The live site at carlos-transports.web.app presents Carlos Transports as a fast, safe option for private charter, airport pickup, and nightlife or event rides across Jamaica.',
        ],
        bullets: [
          'See the core promise up front: private charter, airport runs, and event or nightlife transport.',
          'Move from interest to enquiry with clear calls to action suited to phone-first visitors.',
          'Browse on mobile — the layout is built for people booking rides on the go.',
        ],
      },
      {
        heading: 'Why a dedicated site helps',
        paragraphs: [
          'Ride services in Jamaica still run heavily on WhatsApp and word of mouth. A focused website gives Carlos Transports a stable link for Google, referrals, and ads — separate from a single post that disappears in the feed.',
        ],
      },
      {
        heading: 'RosuePro’s role',
        paragraphs: [
          'RosuePro designed and built this marketing and booking front end as part of our Jamaica small-business website work. Need something similar for transport, tours, or another service business? Start from the portfolio or message us on WhatsApp.',
        ],
      },
    ],
  },
  'vybz-meter': {
    intro:
      'Vybz Meter is an interactive map for discovering and sharing hotspots across Jamaica — built for people who want a visual way to explore places instead of scrolling endless lists.',
    sections: [
      {
        heading: 'Map-first experience',
        paragraphs: [
          'The demo at vybz-meter.web.app centres on an interactive map powered with OpenStreetMap data so users can explore locations spatially.',
        ],
        bullets: [
          'Discover hotspots across Jamaica on a map interface.',
          'Share and explore places in a format that suits social and mobile use.',
          'OpenStreetMap attribution is visible on the live demo, matching licensing requirements.',
        ],
      },
      {
        heading: 'Technical notes',
        paragraphs: [
          'This project highlights RosuePro’s ability to ship map-driven React experiences hosted on Firebase — useful for tourism, events, or community tools where “where on the island?” matters as much as the description.',
        ],
      },
    ],
  },
  'funeral-template': {
    intro:
      'The Funeral Template is a respectful memorial website starter that families and funeral homes can customise — calm typography, space for service details, and a tone suited to difficult moments.',
    sections: [
      {
        heading: 'Built for dignified announcements',
        paragraphs: [
          'The live demo at funeral-template.web.app shows a polished memorial homepage (including white-dove artwork) that can be adapted for obituaries, service times, directions, and tributes.',
        ],
        bullets: [
          'Present service information clearly for local and overseas relatives.',
          'Offer a shareable web address that outlasts a single social media post.',
          'Start from a proven layout instead of designing under pressure.',
        ],
      },
      {
        heading: 'For funeral homes and families',
        paragraphs: [
          'RosuePro also publishes guidance for Jamaican funeral homes on combining websites with WhatsApp chatbots; this template is the visual starting point for that kind of presence.',
        ],
      },
    ],
  },
  'reggae-wheels': {
    intro:
      'Reggae Wheels is a Jamaica travel and car-rental site — plan island trips and experiences, or rent a vehicle to explore on your own, with contact details for Discovery Bay.',
    sections: [
      {
        heading: 'Trips and car rental',
        paragraphs: [
          'The live site at reggaewheels-2482a.web.app welcomes travellers with options to plan island trips and experiences or rent a vehicle for independent exploration.',
        ],
        bullets: [
          'Present tours, trips, and rental choices in one mobile-friendly site.',
          'Give visitors a stable link for Google and referrals beyond social posts alone.',
          'Surface contact paths for Discovery Bay and wider Jamaica travel enquiries.',
        ],
      },
    ],
  },
  'shynz-by-onyx': {
    intro:
      'Shynz By Onyx (rj-detailing.web.app) is an appointment-focused website where clients can see scheduling information and book time with the business.',
    sections: [
      {
        heading: 'Appointment-led flow',
        paragraphs: [
          'Salons, detailers, and similar service businesses in Jamaica often juggle DMs and voice notes. This build puts appointments and schedule visibility on a proper site.',
        ],
        bullets: [
          'Calendar-style appointment experience on the live demo.',
          'Mobile-friendly layout for clients booking from their phones.',
          'Branded presence separate from a single Instagram grid.',
        ],
      },
    ],
  },
  'pack-my-cart': {
    intro:
      'Pack My Cart is an online supermarket platform for Jamaican shops — product listings, carts, and checkout — with a live chatbot demo shoppers can try on pack-my-cart.web.app.',
    sections: [
      {
        heading: 'Online grocery for local supermarkets',
        paragraphs: [
          'Pack My Cart lets supermarket owners list products, accept carts, and support delivery or pick-up workflows. RosuePro has published a full article on how it helps Jamaican supermarket owners sell online.',
        ],
        bullets: [
          'Product browsing and cart flows aimed at Jamaican grocery shoppers.',
          'Live chatbot demo (“Blacka chat”) on the same domain for common shopper questions.',
          'Shareable web app URL for marketing and WhatsApp hand-offs.',
        ],
      },
      {
        heading: 'See also',
        paragraphs: [
          'Read the RosuePro blog post “How Pack My Cart helps Jamaican supermarket owners sell online” for owner-focused detail, or open the live platform to explore the shopper experience.',
        ],
      },
    ],
  },
  yahsonice: {
    intro:
      'Yahsonice is a website concept that connects bar owners with bartenders — helping both sides find opportunities without relying only on informal networks.',
    sections: [
      {
        heading: 'Hospitality staffing angle',
        paragraphs: [
          'Nightlife and events in Jamaica depend on reliable bartenders and venues finding each other quickly. Yahsonice frames that matchmaking problem as a dedicated web experience with RosuePro portfolio imagery and shareable project pages.',
        ],
        bullets: [
          'Speaks directly to bar owners and working bartenders.',
          'Designed as a portfolio showcase; a public live demo URL is not linked yet.',
          'Share RosuePro’s project page when discussing similar marketplace or community tools.',
        ],
      },
    ],
  },
};

function getPortfolioProjectDetails(slug) {
  return portfolioProjectDetails[slug];
}

module.exports = { portfolioProjectDetails, getPortfolioProjectDetails };
