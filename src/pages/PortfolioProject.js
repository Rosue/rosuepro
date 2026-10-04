import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import TopNavbar from '../components/TopNavbar';
import Footer from '../components/Footer';
import ProjectShareActions from '../components/ProjectShareActions';
import { getProjectBySlug } from '../data/portfolioProjects';

export default function PortfolioProject() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

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
        <p className="text-center text-muted">{project.description}</p>
        <div className="card portfolio-project-card mx-auto" style={{ maxWidth: '960px' }}>
          <img
            src={project.image}
            className="card-img-top project-preview"
            alt={project.imageAlt}
            width="1280"
            height="800"
          />
          <div className="card-body text-center">
            {project.demoUrl ? (
              <p className="small">
                <a href={project.demoUrl} target="_blank" rel="noreferrer">
                  {project.demoText}
                </a>
              </p>
            ) : null}
            <div className="portfolio-card-actions portfolio-card-actions--centered">
              <div className="portfolio-card-actions-primary">
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                    {project.visitLabel || `Visit ${project.name}`}
                  </a>
                ) : (
                  <p className="text-muted mb-0">Live demo link coming soon.</p>
                )}
              </div>
              <ProjectShareActions project={project} shareTitle={project.name} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
