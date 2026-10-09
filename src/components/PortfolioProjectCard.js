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
  const isDemo = project.type === 'demo';
  const detailPath = projectPagePath(project);
  const previewClassName = `card-img-top project-preview${
    isDemo ? ' project-preview--16-10' : ''
  }`;

  const previewImage = (
    <img
      src={image}
      className={previewClassName}
      alt={imageAlt}
      loading="lazy"
      decoding="async"
      width="1280"
      height="800"
    />
  );

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

  const previewBlock = isDemo ? (
    <div className="portfolio-card-preview-wrap">
      <span className="portfolio-demo-pill">Demo</span>
      <Link to={detailPath} className="d-block">
        {previewImage}
      </Link>
    </div>
  ) : (
    <Link to={detailPath} className="d-block">
      {previewImage}
    </Link>
  );

  return (
    <article className={cardClassName}>
      {previewBlock}
      <div className={`card-body d-flex flex-column${context === 'home' ? ' text-center' : ''}`}>
        {titleHeading}
        <p
          className={`card-text${isDemo ? ' mb-2' : ' mb-3'}${context === 'home' ? ' flex-grow-1' : ''}`}
        >
          {description}
        </p>
        {isDemo ? (
          <p className="portfolio-demo-meta small text-muted mb-2">
            {project.demoMeta || 'Prototype · sample data'}
          </p>
        ) : null}
        {project.demoUrl ? (
          <p className="small mb-2">
            <a href={project.demoUrl} target="_blank" rel="noreferrer">
              {project.demoText}
            </a>
          </p>
        ) : null}
        <div
          className={`portfolio-card-actions${
            isDemo ? ' portfolio-card-actions--single-line' : ''
          }${context === 'home' ? ' justify-content-center' : ''}`}
        >
          <div className="portfolio-card-actions-primary">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-primary${context === 'home' ? ' align-self-center' : ''}`}
              >
                {visitLabel}
              </a>
            ) : null}
            <Link to={detailPath} className="btn btn-outline-primary">
              {showRosuePageLink ? 'View on RosuePro' : 'View project page'}
            </Link>
          </div>
          <ProjectShareActions project={project} shareTitle={displayName} />
        </div>
      </div>
    </article>
  );
}
