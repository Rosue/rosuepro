import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BLOG_FORMATS,
  PORTRAIT_FORMAT,
  WIDE_FORMAT,
  getBlogVideoSrc,
  getFormat,
  getPoster,
  shouldSkipAutoload,
} from './heroVideoSources';

export const BLOG_VIDEO_CAPTION = 'A 30-second tour of the RosuePro blog';
const DESCRIPTION =
  'Video: free RosuePro guides for small businesses, covering what a website really costs, WhatsApp chatbots, and guides for garages, salons and restaurants. Read free guides at rosue.pro/blog.';

function env() {
  if (typeof window === 'undefined') return { width: 1440, dpr: 1 };
  return { width: window.innerWidth || 1440, dpr: window.devicePixelRatio || 1 };
}

/** Compact /blog intro video. Logic mirrors FuneralTemplateDemoVideo; sources come from heroVideoSources. */
export default function BlogPromoVideo() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [format, setFormat] = useState(WIDE_FORMAT); // matches prerender; corrected after mount
  const [skipAuto, setSkipAuto] = useState(true);

  useEffect(() => {
    setSkipAuto(
      shouldSkipAutoload({ matchMedia: window.matchMedia, connection: navigator.connection })
    );
  }, []);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(true);
  const srcFormat = useRef(null);
  const userPaused = useRef(false);
  const inView = useRef(false);

  const assignSrc = useCallback((f) => {
    const v = videoRef.current;
    if (!v || srcFormat.current === f) return;
    const { width, dpr } = env();
    v.poster = getPoster(f, width, BLOG_FORMATS);
    v.muted = true;
    v.src = getBlogVideoSrc(f, { dpr, viewportWidth: width });
    srcFormat.current = f;
    if (v.load) v.load();
  }, []);

  const tryPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.play) return;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }, []);

  useEffect(() => { setFormat(getFormat()); }, []);

  useEffect(() => {
    const onChange = () => {
      const next = getFormat();
      setFormat((prev) => {
        if (prev !== next && srcFormat.current) {
          assignSrc(next);
          if (inView.current && !userPaused.current && (!skipAuto || started)) tryPlay();
        }
        return next;
      });
    };
    window.addEventListener('orientationchange', onChange);
    window.addEventListener('resize', onChange);
    return () => {
      window.removeEventListener('orientationchange', onChange);
      window.removeEventListener('resize', onChange);
    };
  }, [assignSrc, tryPlay, skipAuto, started]);

  // Lazy src within 200px of the viewport.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === 'undefined' || skipAuto) return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { assignSrc(getFormat()); io.disconnect(); }
      }),
      { rootMargin: '200px' }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [assignSrc, skipAuto]);

  // Autoplay at 50% in view; pause when scrolled away.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        const v = videoRef.current;
        inView.current = e.isIntersecting && e.intersectionRatio >= 0.5;
        if (!v) return;
        if (!inView.current) v.pause();
        else if (!userPaused.current && (!skipAuto || started)) {
          assignSrc(getFormat());
          tryPlay();
        }
      }),
      { threshold: [0, 0.5, 1] }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [assignSrc, tryPlay, skipAuto, started]);

  const onPlayTap = () => {
    userPaused.current = false;
    setStarted(true);
    assignSrc(getFormat());
    tryPlay();
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      assignSrc(getFormat());
      tryPlay();
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const portrait = format === PORTRAIT_FORMAT;
  const showPlayCta = skipAuto && !started;

  return (
    <figure className={`blog-promo-video blog-promo-video--${portrait ? 'portrait' : 'wide'}`} data-format={format}>
      <div className="blog-promo-video__frame" ref={rootRef}>
        <video
          ref={videoRef}
          className="blog-promo-video__player"
          poster={getPoster(format, env().width, BLOG_FORMATS)}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          data-testid="blog-promo-video"
        />
        <span className="visually-hidden">{DESCRIPTION}</span>
        {showPlayCta ? (
          <button type="button" className="hero-video-play-cta" onClick={onPlayTap}>
            ▶ Play video
          </button>
        ) : (
          <div className="hero-video-controls">
            <button type="button" className="hero-video-btn" onClick={togglePlay}
              aria-label={paused ? 'Play video' : 'Pause video'}>
              {paused ? (
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
              )}
            </button>
            <button type="button" className="hero-video-btn" onClick={toggleSound}
              aria-label={muted ? 'Turn sound on' : 'Turn sound off'}>
              {muted ? (
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.6 3 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z" /></svg>
              )}
            </button>
          </div>
        )}
      </div>
      <figcaption className="blog-promo-video__caption">{BLOG_VIDEO_CAPTION}</figcaption>
    </figure>
  );
}
