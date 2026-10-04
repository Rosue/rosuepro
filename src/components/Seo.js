import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyMetadata } from '../seo';

const GA_MEASUREMENT_ID = 'G-3ELM99NJ51';

function trackPageView(pathname) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    send_to: GA_MEASUREMENT_ID,
    page_path: pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    applyMetadata(document, pathname);
    trackPageView(pathname);
  }, [pathname]);
  return null;
}
