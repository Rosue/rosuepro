import React from 'react';
import { Link } from 'react-router-dom';
import { EmailWhatsAppActions } from './ContactActions';

const offers = [
  {
    title: 'Website fixes',
    price: 'From J$8,000',
    unit: 'per agreed repair',
    description: 'Get one specific website problem assessed and fixed, with a clear scope before work begins.',
    includes: ['Contact form troubleshooting', 'Mobile layout fixes', 'Content updates or a specific website error'],
    note: 'Send the URL and a description. Price and turnaround are confirmed after inspection; larger issues are quoted separately.',
    action: 'Request a repair quote',
    subject: 'Website repair enquiry',
    body: 'Hi RosuePro,\n\nI need help with a website issue.\nWebsite URL: \nWhat is happening: \nExpected result: \nPreferred deadline: ',
  },
  {
    title: 'Business landing page',
    price: 'From J$25,000',
    unit: 'for a template-based single page',
    description: 'Give customers a clear place to learn about your business and contact you.',
    includes: ['Responsive single-page layout', 'Your services, business details, and supplied images', 'Email or WhatsApp enquiry link'],
    note: 'You supply the text, logo, and images. Delivery is agreed once content is ready. Domain, hosting, and extra features are quoted separately.',
    action: 'Discuss a landing page',
    subject: 'Business landing page enquiry',
    body: 'Hi RosuePro,\n\nI would like a business landing page.\nBusiness name and services: \nDo you have text, a logo, and images ready? \nPreferred deadline: ',
  },
  {
    title: 'AI automations',
    price: 'From J$35,000',
    unit: 'per agreed workflow or integration',
    description: 'Reduce repetitive admin with a focused automation connected to the tools your business already uses.',
    includes: ['One business process mapped and automated (e.g. intake, follow-ups, reminders, data entry)', 'Connections between email, forms, spreadsheets, or your website where needed', 'Testing, simple documentation, and a walkthrough when it goes live'],
    note: 'Tell us what you do manually today. Scope, tools, and price are confirmed before build; hosting fees and ongoing changes are quoted separately.',
    action: 'Discuss an automation',
    subject: 'AI automation enquiry',
    body: 'Hi RosuePro,\n\nI would like help automating a task.\nWhat happens today (step by step): \nTools involved (email, WhatsApp, website, Excel, etc.): \nHow often: \nPreferred deadline: ',
  },
  {
    title: 'AI chatbots',
    price: 'From J$28,000',
    unit: 'for a scoped website or WhatsApp bot',
    description: 'Handle common customer questions, capture leads, or support staff—with clear rules on when a person takes over.',
    includes: ['Answers based on your FAQs and business details', 'Lead capture or handoff to email or WhatsApp', 'Setup for a website chat widget or WhatsApp Business (where supported)'],
    note: 'You supply FAQs, tone, and when to escalate to a human. Extra languages, deep integrations, or high-volume support are quoted separately.',
    action: 'Request a chatbot quote',
    subject: 'AI chatbot enquiry',
    body: 'Hi RosuePro,\n\nI would like a chatbot.\nBusiness and main questions it should answer: \nWebsite, WhatsApp, or both: \nWhen should it hand off to a person? \nPreferred deadline: ',
  },
];

const defaultMailto = `mailto:rosuepro@gmail.com?subject=${encodeURIComponent('RosuePro enquiry')}&body=${encodeURIComponent("Hi RosuePro,\n\nI'm interested in a landing page + WhatsApp chatbot for my business.\n")}`;

export default function ServiceOfferings() {
  return (
    <section className="service-offerings py-5" id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="services-intro mx-auto text-center mb-4">
          <p className="service-eyebrow">ROSUEPRO · JAMAICAN SMALL BUSINESS WEBSITES</p>
          <h1 id="services-heading">
            Landing page + WhatsApp chatbot packages<br />for Jamaican small businesses.
          </h1>
          <p className="lead mt-3">
            Get a professional landing page and a WhatsApp chatbot that answers common questions and captures leads — built for businesses in Kingston and across Jamaica.
          </p>
          <p className="service-availability">Evenings &amp; Saturdays · By appointment · Jamaica time</p>
          <EmailWhatsAppActions
            className="contact-actions d-flex flex-column flex-sm-row flex-wrap gap-2 justify-content-center mt-4"
            mailtoHref={defaultMailto}
            mailLabel="Email enquiry"
            whatsappLabel="WhatsApp enquiry"
          />
        </div>
        <div className="row row-cols-1 row-cols-lg-3 g-4">
          {offers.map((offer) => (
            <div className="col" key={offer.title}>
              <article className="card service-card h-100">
                <div className="card-body p-4 d-flex flex-column">
                  <h2 className="h4">{offer.title}</h2>
                  <p className="service-price mt-3 mb-0">{offer.price}</p>
                  <p className="small text-secondary">{offer.unit}</p>
                  <p>{offer.description}</p>
                  <ul className="ps-3">{offer.includes.map((item) => <li className="mb-2" key={item}>{item}</li>)}</ul>
                  <p className="small text-secondary">{offer.note}</p>
                  <EmailWhatsAppActions
                    className="contact-actions d-flex flex-column gap-2 mt-auto"
                    mailtoHref={`mailto:rosuepro@gmail.com?subject=${encodeURIComponent(offer.subject)}&body=${encodeURIComponent(offer.body)}`}
                    mailLabel={offer.action}
                    buttonClassEmail="btn btn-primary btn-whatsapp-pair w-100"
                    buttonClassWhatsApp="btn btn-whatsapp btn-whatsapp-pair w-100"
                  />
                </div>
              </article>
            </div>
          ))}
        </div>
        <p className="text-center small mt-4 mb-0">
          All prices in Jamaican dollars. Enquiries open your email app or WhatsApp; appointments are confirmed personally.
        </p>
        <p className="text-center mt-4">
          <a href="/#portfolio">View portfolio examples</a> or <Link to="/about-us">learn more about RosuePro</Link>.
        </p>
        <div className="service-next-steps mt-4 p-4">
          <h2 className="h4">A simple way to get started</h2>
          <p className="mb-2">
            Choose an offer and describe what you need. We’ll agree on the scope, price, and an available evening or Saturday before booking.
          </p>
          <EmailWhatsAppActions
            className="contact-actions d-flex flex-column flex-sm-row flex-wrap gap-2 mb-3"
            mailtoHref="mailto:rosuepro@gmail.com?subject=Custom%20development%20enquiry"
            mailLabel="Ask for a custom quote"
            whatsappMessage="Hi RosuePro,\n\nI need a custom quote for website or chatbot work.\nWhat I need: \n"
          />
          <p className="mb-0 small text-secondary">
            Also offering <Link to="/tutoring">Java tutoring for learners</Link> — separate from our business website packages.
          </p>
        </div>
      </div>
    </section>
  );
}
