import React from 'react';
import { Link } from 'react-router-dom';
import { EmailWhatsAppActions } from './ContactActions';
import {
  LEAD_PACKAGE_CHATBOT_SERVICE_NOTE,
  LEAD_PACKAGE_PRICE_SUMMARY,
  LEAD_PACKAGE_TITLE,
} from '../constants/leadPackage';
import { WHATSAPP_DEFAULT_MESSAGE } from '../constants/whatsapp';

const offers = [
  {
    title: LEAD_PACKAGE_TITLE,
    leadPackage: true,
    price: 'J$45,000',
    unit: 'one-time setup · chatbot service J$4,000/month',
    description:
      'Our lead package for Jamaican small businesses: a template-based landing page plus WhatsApp chatbot setup so customers can learn about you and start a conversation 24/7.',
    includes: [
      'Responsive landing page with your services, details, and supplied images',
      'WhatsApp chatbot wired to your FAQs and enquiry flow',
      'Handoff rules so a person takes over when needed',
    ],
    note: `${LEAD_PACKAGE_CHATBOT_SERVICE_NOTE} Standalone landing pages without a chatbot remain available from J$25,000 — ask if you only need the page.`,
    action: 'Enquire about this package',
    subject: 'Landing page + WhatsApp chatbot package',
    body:
      'Hi RosuePro,\n\nI am interested in the landing page + WhatsApp chatbot package (J$45,000 setup + J$4,000/month chatbot service).\nBusiness name and services: \nMain questions for the chatbot: \nDo you have text, logo, and images ready? \nPreferred deadline: ',
    whatsappMessage: WHATSAPP_DEFAULT_MESSAGE,
  },
  {
    title: 'Custom websites',
    price: 'From J$25,000',
    unit: 'for an agreed business website scope',
    description:
      'A website built around your business—your services, branding, and contact details—so people can find you on Google, learn what you offer, and reach out when they are ready. Showing up online helps more customers discover you and can lead to more sales for your business.',
    includes: [
      'Mobile-friendly pages tailored to your business and supplied content',
      'Clear service or product information visitors and search engines can read',
      'Contact details and enquiry paths so interested customers can reach you',
    ],
    note: 'Scope, number of pages, and final price are confirmed before build. Domain, hosting renewal, and ongoing content updates are quoted separately unless agreed upfront.',
    action: 'Enquire about a custom website',
    subject: 'Custom website enquiry',
    body:
      'Hi RosuePro,\n\nI would like a custom website for my business (from J$25,000 for agreed scope).\nBusiness name and what you do: \nPages or sections you need: \nDo you have logo, text, and images ready? \nPreferred deadline: ',
  },
  {
    title: 'Google Business Profile (Google Maps)',
    price: 'Ask for a price',
    unit: 'scope confirmed before we begin',
    description:
      'Guidance for Jamaican business owners who own the business to claim and verify their listing on Google Maps, so people can find you, see your hours and category, and contact you by phone, WhatsApp, or your website. Rosue walks you through each step—you complete Google’s verification yourself (for example video, phone, or postcard).',
    includes: [
      'Find your existing Google Maps listing or create one for your business',
      'Request ownership and work through Google’s verification (you complete the check)',
      'Add hours, photos, category, phone/WhatsApp, and a website link on your profile',
      'Optional link to a RosuePro website when you have one',
    ],
    note:
      'You must own the business (or be authorised to manage it). RosuePro never claims a listing for someone who does not own the business. Google decides verification outcomes; we do not guarantee approval, rankings, traffic, or how many people will find you.',
    action: 'Ask about Google Business Profile',
    subject: 'Google Business Profile (Google Maps) enquiry',
    body:
      'Hi RosuePro,\n\nI own this business and would like help with my Google Business Profile on Google Maps.\nBusiness name: \nLocation or area served: \nExisting listing on Google Maps (yes / no / not sure): \nRosuePro website to link (if any): \nPreferred deadline: ',
  },
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

const defaultMailto = `mailto:rosuepro@gmail.com?subject=${encodeURIComponent('Landing page + WhatsApp chatbot package')}&body=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;

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
          <p className="service-lead-price fw-semibold mt-2">{LEAD_PACKAGE_PRICE_SUMMARY}.</p>
          <p className="small text-secondary mb-0">{LEAD_PACKAGE_CHATBOT_SERVICE_NOTE}</p>
          <p className="service-availability mt-3">Evenings &amp; Saturdays · By appointment · Jamaica time</p>
          <EmailWhatsAppActions
            className="contact-actions d-flex flex-column flex-sm-row flex-wrap gap-2 justify-content-center mt-4"
            mailtoHref={defaultMailto}
            mailLabel="Email enquiry"
            whatsappLabel="WhatsApp enquiry"
            whatsappMessage={WHATSAPP_DEFAULT_MESSAGE}
          />
        </div>
        <div className="row row-cols-1 row-cols-lg-3 g-4">
          {offers.map((offer) => (
            <div className="col" key={offer.title}>
              <article className={`card service-card h-100${offer.leadPackage ? ' service-card-lead' : ''}`}>
                {offer.leadPackage ? (
                  <div className="service-card-lead-badge text-center py-2">Lead package</div>
                ) : null}
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
                    whatsappMessage={offer.whatsappMessage ?? offer.body}
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
          <Link to={{ pathname: '/', hash: '#portfolio' }}>View portfolio examples</Link> or <Link to="/about-us">learn more about RosuePro</Link>.
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
