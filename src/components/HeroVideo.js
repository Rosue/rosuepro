import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FORMATS,
  PORTRAIT_FORMAT,
  WIDE_FORMAT,
  getPoster,
  getFormat,
  getVideoSrc,
  shouldSkipAutoload,
} from './heroVideoSources';

const CAPTION =
  '18-second RosuePro promo video with voiceover (use the sound button to listen): landing pages and WhatsApp chatbots for small businesses worldwide';

function env() {
  if (typeof window === 'undefined') return { width: 1440, dpr: 1 };
  return { width: window.innerWidth || 1440, dpr: window.devicePixelRatio || 1 };
}

export default function HeroVideo({ children }) {
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const [ratio, setRatio] = useState(WIDE_FORMAT);
  const [skipAuto, setSkipAuto] = useState(false);

  useEffect(() => {
    setSkipAuto(
      shouldSkipAutoload({ matchMedia: window.matchMedia, connection: navigator.connection })
    );
  }, []);
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const userPaused = useRef(false);
  const inView = useRef(true);

  const loadSrc = useCallback((r) => {
    const v = videoRef.current;
    if (!v) return;
    const { width, dpr } = env();
    v.poster = getPoster(r, width); // poster before src
    const src = getVideoSrc(r, { dpr, viewportWidth: width });
    v.muted = true;
    v.src = src;
    if (v.load) v.load();
    const p = v.play && v.play();
    if (p && p.catch) p.catch(() => {});
    setLoaded(true);
  }, []);

  // Deferred autoload after window load / idle.
  useEffect(() => {
    if (skipAuto) return undefined;
    let idleId;
    const start = () => {
      const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
      idleId = ric(() => loadSrc(getFormat()));
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      window.removeEventListener('load', start);
      if (idleId && window.cancelIdleCallback) window.cancelIdleCallback(idleId);
    };
  }, [skipAuto, loadSrc]);

  useEffect(() => { setRatio(getFormat()); }, []);

  // Swap only when the ratio class changes.
  useEffect(() => {
    const onChange = () => {
      const next = getFormat();
      setRatio((prev) => {
        if (prev !== next && loaded) loadSrc(next);
        else if (prev !== next && videoRef.current) videoRef.current.poster = getPoster(next, env().width);
        return next;
      });
    };
    window.addEventListener('resize', onChange);
    window.addEventListener('orientationchange', onChange);
    return () => {
      window.removeEventListener('resize', onChange);
      window.removeEventListener('orientationchange', onChange);
    };
  }, [loaded, loadSrc]);

  // Pause out of view, resume when back (unless the user paused).
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || !frameRef.current) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        inView.current = entry.isIntersecting;
        if (!v || !loaded) return;
        if (!entry.isIntersecting) v.pause();
        else if (!userPaused.current) {
          const p = v.play();
          if (p && p.catch) p.catch(() => {});
        }
      },
      { threshold: 0.25 }
    );
    io.observe(frameRef.current);
    return () => io.disconnect();
  }, [loaded]);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
      setPaused(false);
    } else {
      userPaused.current = true;
      v.pause();
      setPaused(true);
    }
  };

  const playOnTap = () => {
    userPaused.current = false;
    loadSrc(getFormat());
  };

  const poster = getPoster(ratio, env().width);

  return (
    <div className="hero-video" data-format={ratio} data-wide={WIDE_FORMAT}>
      <div className="hero-video-media">
        <div className="hero-video-frame" ref={frameRef}>
          <picture hidden={loaded}>
            <source media="(max-width: 767px) and (orientation: portrait)" srcSet={`${FORMATS[PORTRAIT_FORMAT].poster.small} 960w, ${FORMATS[PORTRAIT_FORMAT].poster.full} ${FORMATS[PORTRAIT_FORMAT].poster.fullWidth}w`} sizes="100vw" />
            <img
              className="hero-video-poster"
              src={FORMATS[WIDE_FORMAT].poster.full}
              srcSet={`${FORMATS[WIDE_FORMAT].poster.small} 960w, ${FORMATS[WIDE_FORMAT].poster.full} ${FORMATS[WIDE_FORMAT].poster.fullWidth}w`}
              sizes="(min-width: 1200px) 58vw, 100vw"
              alt=""
              fetchpriority="high"
              aria-hidden="true"
            />
          </picture>
          <video
            ref={videoRef}
            className="hero-video-el"
            poster={poster}
            preload="none"
            muted
            loop
            playsInline
            autoPlay={!skipAuto}
            aria-hidden="true"
            tabIndex={-1}
            hidden={!loaded}
            data-testid="hero-video"
          />
          <span className="visually-hidden">{CAPTION}</span>
          {!loaded && skipAuto ? (
            <button type="button" className="hero-video-play-cta" onClick={playOnTap}>
              ▶ Play video
            </button>
          ) : null}
          {loaded ? (
            <div className="hero-video-controls">
              <button
                type="button"
                className="hero-video-btn"
                onClick={togglePlay}
                aria-label={paused ? 'Play video' : 'Pause video'}
              >
                {paused ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
                )}
              </button>
              <button
                type="button"
                className="hero-video-btn"
                onClick={toggleSound}
                aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
              >
                {muted ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.6 3 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z" /></svg>
                )}
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="hero-video-copy">{children}</div>
    </div>
  );
}
