import { clientPortfolioProjects } from '../data/portfolioProjects';
import { CONTACT_MAILTO_HREF, CONTACT_WHATSAPP_HREF } from './contactPage';

export const ABOUT_WHATSAPP_HREF = CONTACT_WHATSAPP_HREF;

export const ABOUT_MAILTO_HREF = CONTACT_MAILTO_HREF;

const WORK_STRIP_SLUGS = [
  'pack-my-cart',
  'funeral-template',
  'vybz-meter',
  'carlos-transports',
  'reggae-wheels',
];

export const ABOUT_WHAT_WE_BUILD = [
  {
    number: '01',
    title: 'Landing pages',
    description: 'Template-based business landing pages.',
  },
  {
    number: '02',
    title: 'Chatbots',
    description: "WhatsApp or website chatbots that answer your customers' questions.",
  },
  {
    number: '03',
    title: 'AI automations',
    description: 'Automate repetitive tasks across email, WhatsApp, your website and spreadsheets.',
  },
  {
    number: '04',
    title: 'Website repairs',
    description: 'Scoped fixes for an existing website.',
  },
];

export const ABOUT_HOW_WE_WORK = [
  {
    title: 'Tell us what you need',
    description: 'Send your questions, website URL or project details.',
  },
  {
    title: 'Agree scope and quote',
    description: 'Scope and quote are agreed before work begins.',
  },
  {
    title: 'We build it',
    description: 'Built with Java, Spring Boot, React, databases and API integrations as needed.',
  },
  {
    title: 'Stay in touch',
    description: 'Message us anytime on WhatsApp or email.',
  },
];

export function getAboutWorkStrip() {
  return WORK_STRIP_SLUGS.map((slug) => {
    const project = clientPortfolioProjects().find((entry) => entry.slug === slug);
    if (!project) {
      throw new Error(`Missing portfolio project for About work strip: ${slug}`);
    }
    return { name: project.name, liveUrl: project.liveUrl };
  });
}
