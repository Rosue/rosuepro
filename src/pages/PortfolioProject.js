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

  const isDemo = project.type === 'demo';
  const previewClassName = `card-img-top project-preview${isDemo ? ' project-preview--16-10' : ''}`;

  return (
    <>
      <TopNavbar />
      <main className="container main-content mb-5" id="main-content">
        <p className="mt-4 mb-0">
          <Link to="/portfolio">← Back to portfolio</Link>
        </p>
        <h1 className="text-center mt-4 txt-dark">
          {project.name.length >= 10 ? project.name : `${project.name}: RosuePro portfolio project`}
        </h1>
        <p className="text-center lead mx-auto" style={{ maxWidth: '42rem' }}>{project.description}</p>
        <div className="card portfolio-project-card mx-auto" style={{ maxWidth: '960px' }}>
          {isDemo ? (
            <div className="portfolio-card-preview-wrap">
              <span className="portfolio-demo-pill">Demo</span>
              <img
                src={project.image}
                className={previewClassName}
                alt={project.imageAlt}
                width="1280"
                height="800"
              />
            </div>
          ) : (
            <img
              src={project.image}
              className={previewClassName}
              alt={project.imageAlt}
              width="1280"
              height="800"
            />
          )}
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
            {project.demoUrl ? (
              <p className="small text-center">
                <a href={project.demoUrl} target="_blank" rel="noreferrer">
                  {project.demoText}
                </a>
              </p>
            ) : null}
            {isDemo ? (
              <p className="portfolio-demo-meta small text-muted text-center mb-3">
                {project.demoMeta || 'Prototype · sample data'}
              </p>
            ) : null}
            <div className="portfolio-card-actions portfolio-card-actions--centered">
              <div className="portfolio-card-actions-primary">
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                    {project.visitLabel || (isDemo ? 'Try the demo' : `Visit ${project.name}`)}
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
