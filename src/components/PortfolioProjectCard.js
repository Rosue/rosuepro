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

  return (
    <article className={cardClassName}>
      {isDemo ? (
        <div className="portfolio-card-preview-wrap">
          <span className="portfolio-demo-pill">Demo</span>
          {previewImage}
        </div>
      ) : (
        previewImage
      )}
      <div className={`card-body d-flex flex-column${context === 'home' ? ' text-center' : ''}`}>
        {context === 'home' ? (
          <h3 className="h4 card-title">{displayName}</h3>
        ) : (
          <h2 className="h5 card-title mb-1">{displayName}</h2>
        )}
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
          }`}
        >
          <div className="portfolio-card-actions-primary">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
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
