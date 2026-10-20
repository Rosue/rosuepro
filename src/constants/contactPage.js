import { buildWhatsAppUrl } from './whatsapp';

export const CONTACT_PHONE_DISPLAY = '+1 876 566 7328';

export const CONTACT_EMAIL = 'rosuepro@gmail.com';

export const CONTACT_MAILTO_HREF =
  'mailto:rosuepro@gmail.com?subject=RosuePro%20project%20enquiry';

export const CONTACT_WHATSAPP_MESSAGE =
  "Hi RosuePro, I'd like to talk about a project.\n\nBusiness name: \nWhat I sell: \nLink (if any): ";

export const CONTACT_WHATSAPP_HREF = buildWhatsAppUrl(CONTACT_WHATSAPP_MESSAGE);

export const CONTACT_FAQ = [
  {
    question: 'Do I need to visit an office?',
    answer: 'No. RosuePro is fully remote, so everything happens on WhatsApp or email.',
    defaultOpen: true,
  },
  {
    question: 'When is the price agreed?',
    answer: 'Scope and quote are agreed with you before any work begins.',
  },
  {
    question: 'What can you build?',
    answer:
      'Template-based business landing pages, WhatsApp or website chatbots, AI automations and scoped website repairs.',
  },
];
