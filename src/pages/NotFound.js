import React from 'react';
import { Link } from 'react-router-dom';
import TopNavbar from '../components/TopNavbar';
import Footer from '../components/Footer';

export default function NotFound() {
  return <><TopNavbar /><main className="container main-content mb-5"><h1>Page not found</h1><p>The address may have changed or the page may no longer exist.</p><p><Link to="/">Explore RosuePro services</Link> or <Link to="/portfolio">view our portfolio</Link>.</p></main><Footer /></>;
}
