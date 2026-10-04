import React from 'react';
import { Link } from 'react-router-dom';
import ProjectShareActions from './ProjectShareActions';
import {
  projectDescriptionForContext,
  projectDisplayName,
  projectImageAltForContext,
  projectImageForContext,
  projectPagePath,
  projectVisitLabel,
} from '../data/portfolioProjects';

export default function PortfolioProjectCard({
  project,
  context = 'portfolio',
  showRosuePageLink = false,
  cardClassName = 'card mb-5 portfolio-project-card',
}) {
  const image = projectImageForContext(project, context);
  const imageAlt = projectImageAltForContext(project, context);
  const description = projectDescriptionForContext(project, context);
  const visitLabel = projectVisitLabel(project, context);
  const displayName = projectDisplayName(project, context);

  return (
    <article className={cardClassName}>
      <img
        src={image}
        className="card-img-top project-preview"
        alt={imageAlt}
        loading="lazy"
        decoding="async"
        width="1280"
        height="800"
      />
      <div className={`card-body d-flex flex-column${context === 'home' ? ' text-center' : ''}`}>
        {context === 'home' ? (
          <h3 className="h4 card-title">{displayName}</h3>
        ) : (
          <h2 className="h5 card-title mb-1">{displayName}</h2>
        )}
        <p className={`card-text mb-3${context === 'home' ? ' flex-grow-1' : ''}`}>{description}</p>
        {project.demoUrl ? (
          <p className="small mb-2">
            <a href={project.demoUrl} target="_blank" rel="noreferrer">
              {project.demoText}
            </a>
          </p>
        ) : null}
        <div className="portfolio-card-actions">
          <div className="portfolio-card-actions-primary">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                {visitLabel}
              </a>
            ) : null}
            {showRosuePageLink ? (
              <Link to={projectPagePath(project)} className="btn btn-outline-primary">
                View on RosuePro
              </Link>
            ) : null}
          </div>
          <ProjectShareActions project={project} shareTitle={displayName} />
        </div>
      </div>
    </article>
  );
}
