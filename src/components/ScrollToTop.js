import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

let scrollRestorationConfigured = false;

function configureScrollRestoration() {
  if (scrollRestorationConfigured || typeof window === 'undefined') return;
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  scrollRestorationConfigured = true;
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    configureScrollRestoration();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (hash) {
      const target = document.getElementById(hash.replace(/^#/, ''));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
