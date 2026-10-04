import React, { useState } from 'react';
import { projectShareUrl, projectShareWhatsAppText } from '../data/portfolioProjects';

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.7 10.3 21.4 3h-1.6l-5.8 6.4L9.3 3H3.5l7 10.1L3.5 21h1.6l6.2-6.8L14.7 21h5.8l-7.3-10.7zm-2.2 2.4-.7-1-5.6-7.6h2.4l4.5 6.2.7 1 5.9 8h-2.4l-4.8-6.6z" />
    </svg>
  );
}

function WhatsAppShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3zm5 12.6c-.2.6-1.2 1.1-1.7 1.1-.4 0-.9.2-3.1-.7-2.6-1.1-4.2-3.7-4.3-3.9-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.6.7 2 .8 2.1.1.2.1.3 0 .5-.1.2-.2.3-.3.5l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.3.1 1.7.8 2 .9.3.2.5.2.5.3.1.2.1.9-.1 1.5z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 3h8a2 2 0 0 1 2 2v10h-2V5H9V3zm-4 4h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zm0 2v10h8V9H5z" />
    </svg>
  );
}

export default function ProjectShareActions({ project, shareTitle, className = '' }) {
  const [copied, setCopied] = useState(false);
  const title = shareTitle || project.name;
  const url = projectShareUrl(project);
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(projectShareWhatsAppText(title, url))}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const xHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <div
        className={`project-share-actions ${className}`.trim()}
        role="group"
        aria-label={`Share ${title}`}
      >
        <a
          className="project-share-btn"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share ${title} on WhatsApp`}
        >
          <WhatsAppShareIcon />
        </a>
        <a
          className="project-share-btn"
          href={facebookHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share ${title} on Facebook`}
        >
          <FacebookIcon />
        </a>
        <a
          className="project-share-btn"
          href={xHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share ${title} on X`}
        >
          <XIcon />
        </a>
        <button
          type="button"
          className="project-share-btn"
          onClick={copyLink}
          aria-label={`Copy link to ${title}`}
        >
          <LinkIcon />
        </button>
      </div>
      <p
        className={`project-share-copy-note${copied ? ' show' : ''}`}
        role="status"
        aria-live="polite"
      >
        Link copied
      </p>
    </>
  );
}
