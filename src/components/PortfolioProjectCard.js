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

  const detailPath = projectPagePath(project);
  const titleHeading =
    context === 'home' ? (
      <h3 className="h4 card-title mb-0">
        <Link to={detailPath} className="text-reset text-decoration-none">
          {displayName}
        </Link>
      </h3>
    ) : (
      <h2 className="h5 card-title mb-1">
        <Link to={detailPath} className="text-reset text-decoration-none">
          {displayName}
        </Link>
      </h2>
    );

  return (
    <article className={cardClassName}>
      <Link to={detailPath} className="d-block">
        <img
          src={image}
          className="card-img-top project-preview"
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          width="1280"
          height="800"
        />
      </Link>
      <div className={`card-body${context === 'home' ? ' d-flex flex-column text-center' : ''}`}>
        {titleHeading}
        <p className={`card-text mb-3${context === 'home' ? ' flex-grow-1' : ''}`}>{description}</p>
        {project.demoUrl ? (
          <p className="small mb-2">
            <a href={project.demoUrl} target="_blank" rel="noreferrer">
              {project.demoText}
            </a>
          </p>
        ) : null}
        <div className={`d-flex flex-wrap gap-2 align-items-center mb-3${context === 'home' ? ' justify-content-center' : ''}`}>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className={`btn btn-primary${context === 'home' ? ' align-self-center' : ''}`}
            >
              {visitLabel}
            </a>
          ) : null}
          <Link to={detailPath} className="btn btn-outline-primary">
            {showRosuePageLink ? 'View on RosuePro' : 'View project page'}
          </Link>
        </div>
        <ProjectShareActions
          project={project}
          className={context === 'home' ? 'justify-content-center' : ''}
        />
      </div>
    </article>
  );
}
