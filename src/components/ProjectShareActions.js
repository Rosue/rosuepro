import React, { useEffect, useRef, useState } from 'react';
import { projectShareUrl, projectShareWhatsAppText } from '../data/portfolioProjects';
import { FacebookIcon, LinkIcon, WhatsAppShareIcon, XIcon } from './shareIcons';

const COPY_NOTE_MS = 1400;

export default function ProjectShareActions({ project, shareTitle, className = '' }) {
  const [copied, setCopied] = useState(false);
  const hideCopyNoteTimerRef = useRef(null);
  const title = shareTitle || project.name;
  const url = projectShareUrl(project);
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(projectShareWhatsAppText(title, url))}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const xHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  useEffect(() => {
    return () => {
      if (hideCopyNoteTimerRef.current) {
        window.clearTimeout(hideCopyNoteTimerRef.current);
      }
    };
  }, []);

  function scheduleHideCopyNote() {
    if (hideCopyNoteTimerRef.current) {
      window.clearTimeout(hideCopyNoteTimerRef.current);
    }
    hideCopyNoteTimerRef.current = window.setTimeout(() => {
      hideCopyNoteTimerRef.current = null;
      setCopied(false);
    }, COPY_NOTE_MS);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      scheduleHideCopyNote();
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
        {copied ? 'Link copied' : ''}
      </p>
    </>
  );
}
