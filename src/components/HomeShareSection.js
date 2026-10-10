import React, { useEffect, useRef, useState } from 'react';
import {
  HOME_SHARE_QR_SRC,
  ROSUE_PRO_HOME_URL,
  homeShareFacebookHref,
  homeShareLinkedInHref,
  homeShareWhatsAppHref,
  homeShareXHref,
} from '../constants/homeShare';
import {
  FacebookIcon,
  LinkIcon,
  LinkedInIcon,
  WhatsAppShareIcon,
  XIcon,
} from './shareIcons';

const COPY_NOTE_MS = 1400;

export default function HomeShareSection() {
  const [copied, setCopied] = useState(false);
  const hideCopyNoteTimerRef = useRef(null);

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
      await navigator.clipboard.writeText(ROSUE_PRO_HOME_URL);
      setCopied(true);
      scheduleHideCopyNote();
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <section className="home-share-band" id="share" aria-labelledby="share-title">
        <div className="container home-share-grid">
          <div className="home-share-qr" role="img" aria-label="QR code for rosue.pro">
            <img src={HOME_SHARE_QR_SRC} width={128} height={128} alt="" decoding="async" />
          </div>
          <div className="home-share-copy">
            <h2 id="share-title">Know a business that needs a website?</h2>
            <p>
              Scan the code or share RosuePro with a friend, customer, or group chat.
            </p>
            <div className="home-share-row">
              <a
                className="home-share-pill home-share-pill--wa"
                href={homeShareWhatsAppHref()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppShareIcon />
                WhatsApp
              </a>
              <a
                className="home-share-pill"
                href={homeShareFacebookHref()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
                Facebook
              </a>
              <a
                className="home-share-pill"
                href={homeShareXHref()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon />
                X
              </a>
              <a
                className="home-share-pill"
                href={homeShareLinkedInHref()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
              <button type="button" className="home-share-pill" onClick={copyLink}>
                <LinkIcon />
                Copy link
              </button>
            </div>
          </div>
        </div>
      </section>
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
