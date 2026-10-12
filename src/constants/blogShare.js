import { ROSUE_PRO_HOME_URL } from './homeShare';

export function blogArticleShareUrl(pathname) {
  const path = pathname.replace(/\/$/, '');
  return `${ROSUE_PRO_HOME_URL}${path}`;
}

export function blogShareWhatsAppText(shareTitle, url) {
  return `${shareTitle} — ${url}`;
}

export function blogShareWhatsAppHref(shareTitle, url) {
  return `https://wa.me/?text=${encodeURIComponent(blogShareWhatsAppText(shareTitle, url))}`;
}

export function blogShareFacebookHref(url) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

export function blogShareXHref(shareTitle, url) {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareTitle)}`;
}

export function blogShareLinkedInHref(url) {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
}
