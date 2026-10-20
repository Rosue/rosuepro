import React, { useCallback, useEffect, useId, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { buildWhatsAppUrl } from '../constants/whatsapp';

const NAV_LINKS = [
  {
    label: 'Services',
    to: '/',
    hash: 'services',
    isActive: (pathname) => pathname === '/',
  },
  {
    label: 'Portfolio',
    to: '/portfolio',
    isActive: (pathname) => pathname.startsWith('/portfolio'),
  },
  {
    label: 'Contact',
    to: '/about-us',
    isActive: (pathname) => pathname.startsWith('/about-us'),
  },
];

function NavWhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="site-nav__wa-svg">
      <path
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.5z"
      />
    </svg>
  );
}

function BurgerIcon({ open }) {
  if (open) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export default function TopNavbar() {
  const location = useLocation();
  const sheetId = useId().replace(/:/g, '');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const whatsappHref = buildWhatsAppUrl();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

  const linkProps = (item) => {
    const active = item.isActive(location.pathname);
    const to = item.hash ? { pathname: item.to, hash: item.hash } : item.to;
    return { to, 'aria-current': active ? 'page' : undefined };
  };

  return (
    <>
      <a className="site-nav-skip" href="#main-content">
        Skip to content
      </a>
      <header className={`site-nav-header${scrolled ? ' site-nav-header--scrolled' : ''}`}>
        <nav className="site-nav-bar" aria-label="Main">
          <Link className="site-nav-logo" to="/" aria-label="RosuePro home">
            Rosue<span>Pro</span>
          </Link>

          <ul className="site-nav-links">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <Link className="site-nav-link" {...linkProps(item)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <a className="site-nav-wa site-nav-wa--bar" href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <NavWhatsAppIcon />
            Chat on WhatsApp
          </a>

          <a
            className="site-nav-wa-icon"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <NavWhatsAppIcon />
          </a>

          <button
            type="button"
            className="site-nav-burger"
            aria-expanded={menuOpen}
            aria-controls={sheetId}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={toggleMenu}
          >
            <BurgerIcon open={menuOpen} />
          </button>
        </nav>

        <div
          className={`site-nav-sheet${menuOpen ? ' site-nav-sheet--open' : ''}`}
          id={sheetId}
          aria-hidden={menuOpen ? 'false' : 'true'}
        >
          <ul className="site-nav-sheet-list">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <Link className="site-nav-sheet-row" {...linkProps(item)} onClick={closeMenu}>
                  {item.label}
                  <span aria-hidden="true">›</span>
                </Link>
              </li>
            ))}
          </ul>
          <a
            className="site-nav-wa site-nav-wa--sheet"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Chat on WhatsApp
          </a>
          <small className="site-nav-sheet-note">Blog · Tutoring · Resume live in the footer</small>
        </div>
      </header>
    </>
  );
}
