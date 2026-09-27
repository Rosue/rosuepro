import React from 'react';

const projects = [
  {
    name: 'Pack My Cart',
    description: 'Online supermarket platform for Jamaican shops — product listings, carts, and checkout.',
    url: 'https://pack-my-cart.web.app/',
    image: '/portfolio/pack-my-cart.webp',
    imageAlt: 'Pack My Cart supermarket website homepage',
  },
  {
    name: 'Funeral site template',
    description: 'A respectful memorial website template families and funeral homes can customise.',
    url: 'https://funeral-template.web.app/',
    image: '/portfolio/funeral-template.webp',
    imageAlt: 'Funeral memorial website template homepage',
  },
];

export default function PortfolioShowcase({ id = 'portfolio', headingId = 'portfolio-heading' }) {
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
              <div className="col" key={project.url}>
                <article className="card h-100 project-promo-card">
                  <img
                    src={project.image}
                    className="card-img-top project-preview"
                    alt={project.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width="1280"
                    height="800"
                  />
                  <div className="card-body d-flex flex-column text-center">
                    <h3 className="h4 card-title">{project.name}</h3>
                    <p className="card-text flex-grow-1">{project.description}</p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary align-self-center"
                    >
                      Visit {project.name}
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <p className="text-center mt-4 mb-0">
            <a href="/portfolio">See more website projects</a>
          </p>
        </div>
      </div>
    </section>
  );
}
