import { buildWhatsAppUrl } from './whatsapp';

export const GET_QUOTE_LABEL = 'Get a quote';

export const GET_QUOTE_HREF = buildWhatsAppUrl(
  'Hi RosuePro,\n\nI would like a quote.\nWhat I need: \n'
);
