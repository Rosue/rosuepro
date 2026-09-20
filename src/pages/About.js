import React from 'react';
import { Link } from 'react-router-dom';
import TopNavbar from '../components/TopNavbar';
import Footer from '../components/Footer';

export default function About() {
  return <>
    <TopNavbar />
    <main className="container main-content mb-5">
      <h1>About RosuePro</h1>
      <p className="lead">Java tutoring and practical website support for learners and small businesses in Jamaica.</p>
      <p>RosuePro provides online Java tutoring and guided debugging, scoped website repairs, and template-based business landing pages. Appointments are available evenings and Saturdays, with scope and price agreed before work begins.</p>
      <h2>Development experience</h2>
      <p>Our work draws on experience with Java, Spring Boot, React, databases, and API integrations. <Link to="/resume">Explore our software development experience and skills.</Link></p>
      <h2>See our work</h2>
      <p>Our portfolio includes interactive maps, memorial websites, tour booking, appointment scheduling, and supermarket platforms. <Link to="/portfolio">Browse the website development portfolio.</Link></p>
      <h2>Tell us what you need</h2>
      <p><Link to="/#services">View services and current prices</Link>, then email <a href="mailto:rosuepro@gmail.com">rosuepro@gmail.com</a> with your questions, website URL, or project details. We will discuss the scope and arrange an appointment.</p>
      <p>Based in Discovery Bay, Jamaica, serving learners and businesses across Jamaica.</p>
    </main>
    <Footer />
  </>;
}
