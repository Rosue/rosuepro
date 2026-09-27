/** Public business WhatsApp click-to-chat number (E.164 without +). */
export const WHATSAPP_NUMBER_E164 = [1876, 5667328].join('');

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi RosuePro, I'm interested in the landing page + WhatsApp chatbot package (J$45,000 one-time setup, then J$4,000/month for chatbot service).\n\nBusiness name: \nWhat should the chatbot answer? \n";

export function buildWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(message)}`;
}
