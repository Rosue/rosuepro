import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getBlogPostByPath } from '../data/blogPosts';
import {
  blogArticleShareUrl,
  blogShareFacebookHref,
  blogShareLinkedInHref,
  blogShareWhatsAppHref,
  blogShareXHref,
} from '../constants/blogShare';
import {
  FacebookIcon,
  LinkIcon,
  LinkedInIcon,
  WhatsAppShareIcon,
  XIcon,
} from './shareIcons';

const COPY_NOTE_MS = 1400;

export default function BlogArticleShare({ variant = 'compact' }) {
  const { pathname } = useLocation();
  const post = getBlogPostByPath(pathname);
  const [copied, setCopied] = useState(false);
  const hideCopyNoteTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (hideCopyNoteTimerRef.current) {
        window.clearTimeout(hideCopyNoteTimerRef.current);
      }
    };
  }, []);

  if (!post) {
    return null;
  }

  const title = post.cardTitle;
  const url = blogArticleShareUrl(pathname);
  const whatsappHref = blogShareWhatsAppHref(title, url);
  const facebookHref = blogShareFacebookHref(url);
  const xHref = blogShareXHref(title, url);
  const linkedInHref = blogShareLinkedInHref(url);

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

  const copyNote = (
    <p
      className={`project-share-copy-note${copied ? ' show' : ''}`}
      role="status"
      aria-live="polite"
    >
      {copied ? 'Link copied' : ''}
    </p>
  );

  if (variant === 'footer') {
    return (
      <>
        <section className="blog-article-share-footer" aria-labelledby="blog-share-footer-title">
          <h2 id="blog-share-footer-title" className="blog-article-share-footer-title">
            Share this article
          </h2>
          <div className="home-share-row blog-article-share-footer-row">
            <a
              className="home-share-pill home-share-pill--wa"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share ${title} on WhatsApp`}
            >
              <WhatsAppShareIcon />
              WhatsApp
            </a>
            <a
              className="home-share-pill"
              href={facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share ${title} on Facebook`}
            >
              <FacebookIcon />
              Facebook
            </a>
            <a
              className="home-share-pill"
              href={xHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share ${title} on X`}
            >
              <XIcon />
              X
            </a>
            <a
              className="home-share-pill"
              href={linkedInHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share ${title} on LinkedIn`}
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <button
              type="button"
              className="home-share-pill"
              onClick={copyLink}
              aria-label={`Copy link to ${title}`}
            >
              <LinkIcon />
              Copy link
            </button>
          </div>
        </section>
        {copyNote}
      </>
    );
  }

  return (
    <>
      <div className="blog-article-share-compact-wrap">
        <div
          className="project-share-actions blog-article-share-compact"
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
          <a
            className="project-share-btn"
            href={linkedInHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share ${title} on LinkedIn`}
          >
            <LinkedInIcon />
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
      </div>
      {copyNote}
    </>
  );
}
