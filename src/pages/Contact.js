import React from 'react';
import TopNavbar from '../components/TopNavbar';
import ContactPageFooter from '../components/ContactPageFooter';
import { WhatsAppButton } from '../components/ContactActions';
import {
  CONTACT_EMAIL,
  CONTACT_FAQ,
  CONTACT_MAILTO_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_WHATSAPP_MESSAGE,
} from '../constants/contactPage';

export default function Contact() {
  return (
    <div className="contact-page">
      <TopNavbar />
      <main id="main-content">
        <section className="contact-page-wrap contact-page-hero">
          <p className="contact-page-eyebrow">Contact</p>
          <h1>Let’s build your next customer magnet</h1>
          <p className="contact-page-sub">
            Tell us about your business and what you need. Message us anytime on WhatsApp or email.
            Scope and quote are agreed before work begins.
          </p>
        </section>

        <section className="contact-page-wrap contact-page-cards" aria-label="Ways to contact us">
          <article className="contact-page-card contact-page-card--primary">
            <span className="contact-page-tag">Recommended</span>
            <h2>WhatsApp</h2>
            <p>Chat with us directly about your project.</p>
            <p className="contact-page-detail">{CONTACT_PHONE_DISPLAY}</p>
            <WhatsAppButton
              className="contact-page-btn contact-page-btn--wa"
              message={CONTACT_WHATSAPP_MESSAGE}
              block
            >
              Chat on WhatsApp
            </WhatsAppButton>
          </article>

          <article className="contact-page-card">
            <span className="contact-page-tag">Prefer email?</span>
            <h2>Email</h2>
            <p>Send your questions, website URL or project details.</p>
            <p className="contact-page-detail">{CONTACT_EMAIL}</p>
            <a className="contact-page-btn contact-page-btn--out" href={CONTACT_MAILTO_HREF}>
              Send an email
            </a>
          </article>
        </section>

        <section className="contact-page-wrap contact-page-two">
          <div className="contact-page-panel">
            <h2>What to send us</h2>
            <ol>
              <li>Your business name</li>
              <li>What you sell or offer</li>
              <li>
                Your website or social link <span>(if you have one)</span>
              </li>
            </ol>
          </div>
          <div className="contact-page-panel">
            <h2>Common questions</h2>
            {CONTACT_FAQ.map((item) => (
              <details key={item.question} open={item.defaultOpen || undefined}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <ContactPageFooter />
    </div>
  );
}
