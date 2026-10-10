export const ROSUE_PRO_HOME_URL = 'https://rosue.pro';

/** Static asset in /public — must stay a plain path for SSR prerender. */
export const HOME_SHARE_QR_SRC = `${process.env.PUBLIC_URL || ''}/home-share-qr.svg`;

export const HOME_SHARE_SOCIAL_TEXT =
  'RosuePro — landing pages + WhatsApp chatbots for Jamaican small businesses';

export function homeShareWhatsAppMessage() {
  return `${HOME_SHARE_SOCIAL_TEXT} ${ROSUE_PRO_HOME_URL}`;
}

export function homeShareWhatsAppHref() {
  return `https://wa.me/?text=${encodeURIComponent(homeShareWhatsAppMessage())}`;
}

export function homeShareFacebookHref() {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ROSUE_PRO_HOME_URL)}`;
}

export function homeShareXHref() {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(ROSUE_PRO_HOME_URL)}&text=${encodeURIComponent(HOME_SHARE_SOCIAL_TEXT)}`;
}

export function homeShareLinkedInHref() {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(ROSUE_PRO_HOME_URL)}`;
}
