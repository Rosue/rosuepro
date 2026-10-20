import React from 'react';
import TopNavbar from '../components/TopNavbar';
import { EmailWhatsAppActions } from '../components/ContactActions';
import { javaTutoringOffer } from '../data/tutoringOffer';

export default function Tutoring() {
  const mailto = `mailto:rosuepro@gmail.com?subject=${encodeURIComponent(javaTutoringOffer.subject)}&body=${encodeURIComponent(javaTutoringOffer.body)}`;

  return (
    <>
      <TopNavbar />
      <main id="main-content" className="container main-content mb-5 tutoring-page">
        <section aria-labelledby="tutoring-heading">
          <p className="service-eyebrow text-center mb-2">ROSUEPRO · LEARNERS WORLDWIDE</p>
          <h1 id="tutoring-heading" className="text-center txt-dark">
            Java tutoring &amp; guided debugging
          </h1>
          <p className="lead text-center">
            Online sessions for students and career switchers — message us anytime on WhatsApp or email.
          </p>
          <article className="card service-card mx-auto mt-4" style={{ maxWidth: '42rem' }}>
            <div className="card-body p-4">
              <h2 className="h4">{javaTutoringOffer.title}</h2>
              <p className="service-price mt-3 mb-0">
                <a href={javaTutoringOffer.quoteHref} target="_blank" rel="noopener noreferrer">
                  {javaTutoringOffer.quoteLabel}
                </a>
              </p>
              <p className="small text-secondary">{javaTutoringOffer.unit}</p>
              <p>{javaTutoringOffer.description}</p>
              <ul className="ps-3">
                {javaTutoringOffer.includes.map((item) => (
                  <li className="mb-2" key={item}>{item}</li>
                ))}
              </ul>
              <p className="small text-secondary">{javaTutoringOffer.note}</p>
              <EmailWhatsAppActions
                className="contact-actions d-flex flex-column flex-sm-row flex-wrap gap-2 mt-3"
                mailtoHref={mailto}
                mailLabel={javaTutoringOffer.action}
                whatsappMessage={`Hi RosuePro,\n\nI would like a Java tutoring session.\nTopics or problem: \nExperience level: \nPreferred time: `}
              />
            </div>
          </article>
          <p className="text-center small mt-4 mb-0">
            Get a quote on WhatsApp or email — we confirm scope and timing personally.
          </p>
        </section>
      </main>
    </>
  );
}
