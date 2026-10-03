import React, { useState } from 'react';
import { getShareUrl, shareMessage } from '../data/portfolioProjects';

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.865-5.07-4.427 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
    </svg>
  );
}

function WhatsAppShareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
      <path d="M6.586 4.5A2 2 0 0 0 4.085 6.085l.793.792A1 1 0 0 1 4.06 7.06l-1.78-1.78A4 4 0 0 1 8.343 3.06l1.829 1.828a3 3 0 0 0-4.243 4.243l-.793-.793a1 1 0 0 1-.146-.199 2 2 0 0 1 .861-3.337L7.12 4.55a2 2 0 1 1 2.83 2.83l-.793.792a4 4 0 0 0-.128 1.287z" />
    </svg>
  );
}

export default function ProjectShareActions({ project, className = '' }) {
  const [copied, setCopied] = useState(false);
  const url = getShareUrl(project);
  const text = shareMessage(project);
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const xHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={`project-share-actions ${className}`.trim()} role="group" aria-label={`Share ${project.name}`}>
      <span className="project-share-label">Share</span>
      <a
        className="btn btn-sm btn-outline-primary project-share-btn"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share ${project.name} on WhatsApp`}
      >
        <WhatsAppShareIcon />
        <span>WhatsApp</span>
      </a>
      <a
        className="btn btn-sm btn-outline-primary project-share-btn"
        href={facebookHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share ${project.name} on Facebook`}
      >
        <FacebookIcon />
        <span>Facebook</span>
      </a>
      <a
        className="btn btn-sm btn-outline-primary project-share-btn"
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share ${project.name} on X`}
      >
        <XIcon />
        <span>X</span>
      </a>
      <button
        type="button"
        className="btn btn-sm btn-outline-primary project-share-btn"
        onClick={copyLink}
        aria-label={`Copy link to ${project.name}`}
      >
        <LinkIcon />
        <span>{copied ? 'Copied' : 'Copy link'}</span>
      </button>
    </div>
  );
}
