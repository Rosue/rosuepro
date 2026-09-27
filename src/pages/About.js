import React from 'react';
import { Link } from 'react-router-dom';
import TopNavbar from '../components/TopNavbar';
import Footer from '../components/Footer';
import { EmailWhatsAppActions } from '../components/ContactActions';

export default function About() {
  return <>
    <TopNavbar />
    <main className="container main-content mb-5">
      <h1>About RosuePro</h1>
      <p className="lead">Landing pages, WhatsApp chatbots, and practical website support for small businesses in Jamaica — plus Java tutoring for learners.</p>
      <p>RosuePro builds template-based business landing pages, scoped website repairs, AI automations, and WhatsApp or website chatbots for small businesses. Appointments are available evenings and Saturdays, with scope and price agreed before work begins.</p>
      <h2>Development experience</h2>
      <p>Our work draws on experience with Java, Spring Boot, React, databases, and API integrations. <Link to="/resume">Explore our software development experience and skills.</Link></p>
      <h2>See our work</h2>
      <p>Our portfolio includes supermarket platforms, memorial websites, tour booking, appointment scheduling, and interactive maps. <Link to="/portfolio">Browse the website development portfolio.</Link></p>
      <h2>Tell us what you need</h2>
      <p><Link to="/#services">View services and current prices</Link>, then reach out with your questions, website URL, or project details. We will discuss the scope and arrange an appointment.</p>
      <EmailWhatsAppActions
        className="contact-actions d-flex flex-column flex-sm-row flex-wrap gap-2 my-3"
        mailtoHref="mailto:rosuepro@gmail.com?subject=RosuePro%20project%20enquiry"
        mailLabel="Email rosuepro@gmail.com"
      />
      <p>Based in Kingston, Jamaica, serving small businesses and learners across the island. Registered business address: Discovery Bay, St. Ann.</p>
      <p><Link to="/tutoring">Java tutoring for learners</Link> is listed separately with its own pricing.</p>
    </main>
    <Footer />
  </>;
}
