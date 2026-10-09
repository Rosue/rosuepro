/** Publish dates from the git commits that added each article (YYYY-MM-DD). */
const blogPosts = [
  {
    path: '/blog/websites-and-ai-for-jamaican-funeral-homes-memorials',
    datePublished: '2026-10-03',
    cardTitle: 'How Jamaican funeral homes can serve families online with AI',
    cardExcerpt:
      'When families need service times, chapel directions, and tributes shared with relatives abroad, phone calls at every hour can overwhelm staff. A respectful website, memorial pages, WhatsApp chatbots, and light automations from RosuePro help funeral homes in Jamaica answer with dignity.',
    image: '/websites-and-ai-for-jamaican-funeral-homes-memorials.webp',
    imageAlt: 'Respectful Jamaican memorial chapel exterior for a funeral home website',
    ctaLabel: 'Read funeral home guide',
  },
  {
    path: '/blog/whatsapp-chatbot-for-business-jamaica',
    datePublished: '2026-09-30',
    cardTitle: 'WhatsApp Chatbot for Business Jamaica: How Small Businesses Reply Faster in 2026',
    cardExcerpt:
      'Looking for a WhatsApp chatbot for business Jamaica? This guide explains what a bot does for Kingston small businesses, who it suits, RosuePro pricing from J$28,000, and the J$45,000 landing page plus chatbot package.',
    image: '/whatsapp-chatbot-for-business-jamaica.webp',
    imageAlt: 'Smartphone showing a WhatsApp business chatbot conversation for a Jamaican small business',
    ctaLabel: 'Read WhatsApp chatbot guide',
  },
  {
    path: '/blog/website-design-jamaica-price',
    datePublished: '2026-09-27',
    cardTitle: 'Website Design Jamaica Price: What a Website Really Costs in 2026',
    cardExcerpt:
      'If you have searched for website design Jamaica price, you have probably noticed that the answers are all over the place. This guide sets out what drives website cost in Jamaica, what a landing page is, and what RosuePro charges in Kingston.',
    image: '/website-design-jamaica-price.webp',
    imageAlt: 'Kingston business owner reviewing a landing page on a laptop with WhatsApp open on her phone',
    ctaLabel: 'Read website design price guide',
  },
  {
    path: '/blog/pack-my-cart-helps-jamaican-supermarkets',
    datePublished: '2026-09-20',
    cardTitle: 'How Pack My Cart helps Jamaican supermarket owners sell online',
    cardExcerpt:
      'If you run a supermarket or mini-mart in Jamaica, most of your day still happens on the shop floor — stock, suppliers, the line at the till, and a phone full of WhatsApp questions. Pack My Cart is built for customers who expect to browse prices, build a cart, and choose delivery or pick-up without waiting for a reply.',
    image: '/Screenshot 2025-08-03 160451.png',
    imageAlt: 'Pack My Cart online supermarket platform for Jamaica',
    ctaLabel: 'Read Pack My Cart article',
  },
  {
    path: '/blog/websites-and-ai-for-jamaican-restaurants-cookshops',
    datePublished: '2026-09-26',
    cardTitle: 'How Jamaican restaurants and cook shops can fill more tables with a website and AI',
    cardExcerpt:
      'If you run a restaurant or cook shop in Jamaica, your phone is part of the kitchen. A simple business website, an AI chatbot for common questions, and light automations give customers a clear place to see your menu — and give you fewer of the same messages to answer by hand.',
    image: '/jamaican-restaurant-cookshop-blog.png',
    imageAlt: 'Websites and AI for Jamaican restaurants and cook shops',
    ctaLabel: 'Read restaurant and cook shop tips',
  },
  {
    path: '/blog/websites-and-ai-for-jamaican-salons-barbershops',
    datePublished: '2026-09-23',
    cardTitle: 'How Jamaican salon and barbershop owners can win more bookings with a website and AI',
    cardExcerpt:
      'If you run a salon or barbershop in Jamaica, your phone is probably a second workplace. A simple business website, an AI chatbot for common questions, and light automations give customers a clear place to learn about you — and give you fewer of the same messages to answer by hand.',
    image: '/jamaican-salon-barbershop-blog.png',
    imageAlt: 'Websites and AI for Jamaican salons and barbershops',
    ctaLabel: 'Read salon and barbershop tips',
  },
  {
    path: '/blog/basic-tips-market-music',
    datePublished: '2025-04-08',
    cardTitle: 'Basic Tips on how to Market your music',
    cardExcerpt:
      'In the fast paced and constantly evolving music world we currently live in, and one which boasts of thousands and thousands of music artistes, the success of nowadays musicians especially the upcoming ones is almost not guaranteed unless some pertinent things are put into consideration. In this article, I have decided to put together a few tips for upcoming musicians like you that will definitely help your career push.',
    image: '/headphones-4595492_1280.jpg',
    imageAlt: 'Headphones for music and online promotion',
    ctaLabel: 'Read music marketing tips',
  },
];

function getBlogPostByPath(path) {
  const normalized = path.replace(/\/$/, '');
  return blogPosts.find((post) => post.path === normalized);
}

function blogPostsByNewest() {
  return [...blogPosts].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

function formatPublishedDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-JM', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

module.exports = {
  blogPosts,
  getBlogPostByPath,
  blogPostsByNewest,
  formatPublishedDate,
};
