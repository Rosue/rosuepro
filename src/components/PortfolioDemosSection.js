import React from 'react';
import { Container } from 'react-bootstrap';
import PortfolioProjectCard from './PortfolioProjectCard';
import { demoPortfolioProjects } from '../data/portfolioProjects';

export default function PortfolioDemosSection() {
  const demos = demoPortfolioProjects();

  return (
    <section
      id="demos"
      className="portfolio-demos-band"
      aria-labelledby="demos-heading"
    >
      <Container>
        <header className="portfolio-demos-header text-center">
          <h2 id="demos-heading" className="h3 txt-dark mb-2">
            Try a live demo
          </h2>
          <p className="portfolio-demos-subtext mb-4">
            Working prototypes built by RosuePro. They use sample data and aren&apos;t client sites.
          </p>
        </header>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 portfolio-demos-grid">
          {demos.map((project) => (
            <div className="col" key={project.slug}>
              <PortfolioProjectCard
                project={project}
                context="portfolio"
                cardClassName="card h-100 portfolio-project-card portfolio-project-card--demo"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
