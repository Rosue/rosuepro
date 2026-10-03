import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyMetadata } from '../seo';

const GA_MEASUREMENT_ID = 'G-3ELM99NJ51';

export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    applyMetadata(document, pathname);
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, { page_path: pathname });
    }
  }, [pathname]);
  return null;
}
