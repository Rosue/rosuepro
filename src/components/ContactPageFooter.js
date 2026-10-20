import React from 'react';
import { Link } from 'react-router-dom';

export default function ContactPageFooter() {
  return (
    <footer className="contact-page-footer">
      <div className="contact-page-wrap">
        <div className="contact-page-foot">
          <Link className="contact-page-foot-logo" to="/" aria-label="RosuePro home">
            Rosue<span>Pro</span>
          </Link>
          <nav aria-label="Footer">
            <Link to="/blog">Blog</Link>
            <Link to="/tutoring">Tutoring</Link>
            <Link to="/about-us">About</Link>
          </nav>
        </div>
        <small>Registered business address: Discovery Bay, St. Ann, Jamaica · © RosuePro</small>
      </div>
    </footer>
  );
}
