import React from 'react';
import { Link } from 'react-router-dom';
import TopNavbar from '../components/TopNavbar';
import useReplacePathWhen from '../hooks/useReplacePathWhen';
import { WhatsAppButton } from '../components/ContactActions';
import { CONTACT_WHATSAPP_MESSAGE } from '../constants/contactPage';
import {
  ABOUT_HOW_WE_WORK,
  ABOUT_MAILTO_HREF,
  ABOUT_WHAT_WE_BUILD,
  getAboutWorkStrip,
} from '../constants/aboutPage';

export default function About() {
  useReplacePathWhen('/about-us', '/about');
  const workStrip = getAboutWorkStrip();

  return (
    <div className="about-page">
      <TopNavbar />
      <main id="main-content">
        <section className="contact-page-wrap about-page-hero">
          <p className="contact-page-eyebrow">About RosuePro</p>
          <h1>We build websites and chatbots that help small businesses sell</h1>
          <p className="contact-page-sub">
            Landing pages, WhatsApp chatbots and practical website support for small businesses worldwide. Fully
            remote.
          </p>
          <div className="about-page-hero-ctas">
            <WhatsAppButton
              className="contact-page-btn contact-page-btn--wa"
              message={CONTACT_WHATSAPP_MESSAGE}
            >
              Chat on WhatsApp
            </WhatsAppButton>
            <Link className="contact-page-btn contact-page-btn--out" to="/portfolio">
              See our work
            </Link>
          </div>
        </section>

        <section className="contact-page-wrap about-page-sec" aria-labelledby="about-build-heading">
          <h2 id="about-build-heading">What we build</h2>
          <p className="about-page-lead">Focused services for small businesses.</p>
          <div className="about-page-grid4">
            {ABOUT_WHAT_WE_BUILD.map((item) => (
              <article key={item.title} className="about-page-card">
                <div className="about-page-card-icon" aria-hidden="true">{item.number}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-page-wrap about-page-sec" aria-labelledby="about-how-heading">
          <h2 id="about-how-heading">How we work</h2>
          <p className="about-page-lead">Fully remote, start to finish.</p>
          <ol className="about-page-steps">
            {ABOUT_HOW_WE_WORK.map((step) => (
              <li key={step.title}>
                <b>{step.title}</b>
                <span>{step.description}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="contact-page-wrap about-page-sec" aria-labelledby="about-work-heading">
          <h2 id="about-work-heading">Our work</h2>
          <p className="about-page-lead">
            Supermarket platforms, memorial websites, tour booking, appointment scheduling and interactive maps.
          </p>
          <div className="about-page-strip">
            {workStrip.map((project) => (
              <a
                key={project.name}
                className="about-page-chip"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.name}
              </a>
            ))}
          </div>
          <Link className="about-page-portfolio-link" to="/portfolio">
            View the full portfolio →
          </Link>
        </section>

        <section className="contact-page-wrap about-page-band-wrap" aria-labelledby="about-quote-heading">
          <div className="about-page-band">
            <div>
              <h2 id="about-quote-heading">Get a quote</h2>
              <p>Tell us about your business. We&apos;ll discuss the scope and next steps.</p>
            </div>
            <div className="about-page-band-ctas">
              <WhatsAppButton
                className="contact-page-btn contact-page-btn--wa"
                message={CONTACT_WHATSAPP_MESSAGE}
              >
                Chat on WhatsApp
              </WhatsAppButton>
              <a className="contact-page-btn about-page-btn--mail" href={ABOUT_MAILTO_HREF}>
                Email rosuepro@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
