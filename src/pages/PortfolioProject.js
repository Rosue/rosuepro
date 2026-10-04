import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import TopNavbar from '../components/TopNavbar';
import Footer from '../components/Footer';
import ProjectShareActions from '../components/ProjectShareActions';
import { getProjectBySlug } from '../data/portfolioProjects';
import { getPortfolioProjectDetails } from '../data/portfolioProjectDetails';

export default function PortfolioProject() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const details = getPortfolioProjectDetails(slug);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <TopNavbar />
      <main className="container main-content mb-5" id="main-content">
        <p className="mt-4 mb-0">
          <Link to="/portfolio">← Back to portfolio</Link>
        </p>
        <h1 className="text-center mt-4 txt-dark">{project.name}</h1>
        <p className="text-center lead mx-auto" style={{ maxWidth: '42rem' }}>{project.description}</p>
        <div className="card portfolio-project-card mx-auto" style={{ maxWidth: '960px' }}>
          <img
            src={project.image}
            className="card-img-top project-preview"
            alt={project.imageAlt}
            width="1280"
            height="800"
          />
          <div className="card-body">
            {details ? (
              <div className="portfolio-project-detail mx-auto" style={{ maxWidth: '40rem' }}>
                <p className="lead">{details.intro}</p>
                {details.sections.map((section) => (
                  <section key={section.heading} className="mb-4">
                    <h2 className="h4 txt-dark">{section.heading}</h2>
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                    {section.bullets?.length ? (
                      <ul>
                        {section.bullets.map((item) => (
                          <li key={item} className="mb-2">{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>
            ) : (
              <p className="text-center">{project.description}</p>
            )}
            <div className="text-center mt-4">
              {project.demoUrl ? (
                <p className="small">
                  <a href={project.demoUrl} target="_blank" rel="noreferrer">
                    {project.demoText}
                  </a>
                </p>
              ) : null}
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary mb-3">
                  {project.visitLabel || `Visit ${project.name}`}
                </a>
              ) : (
                <p className="text-muted mb-3">Live demo link coming soon.</p>
              )}
              <ProjectShareActions project={project} className="justify-content-center" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
