import React from 'react';
import PortfolioProjectCard from './PortfolioProjectCard';
import { featuredHomeProjects } from '../data/portfolioProjects';

export default function PortfolioShowcase({ id = 'portfolio', headingId = 'portfolio-heading' }) {
  const projects = featuredHomeProjects();

  return (
    <section className="container my-5" id={id} aria-labelledby={headingId}>
      <div className="card shadow featured-projects">
        <div className="card-body">
          <h2 id={headingId} className="card-title text-center text-dark">Portfolio</h2>
          <p className="card-text text-center text-dark">
            Live sites built for Jamaican businesses — tap a project to visit the demo.
          </p>
          <div className="row row-cols-1 row-cols-md-2 g-4 mt-1">
            {projects.map((project) => (
              <div className="col" key={project.slug}>
                <PortfolioProjectCard
                  project={project}
                  context="home"
                  cardClassName="card h-100 project-promo-card"
                />
              </div>
            ))}
          </div>
          <p className="text-center mt-4 mb-0">
            <a href="/portfolio">See more website projects</a>
            {' · '}
            <a href="/portfolio#demos">Try live demos</a>
          </p>
        </div>
      </div>
    </section>
  );
}
