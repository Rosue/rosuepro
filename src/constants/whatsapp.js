/** Public business WhatsApp click-to-chat number (E.164 without +). */
export const WHATSAPP_NUMBER_E164 = [1876, 5667328].join('');

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi RosuePro, I'm interested in a landing page + WhatsApp chatbot for my business.";

export function buildWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(message)}`;
}
