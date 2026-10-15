import React, { useCallback, useEffect, useRef, useState } from 'react';

const BASE = '/videos/funeral-template';
export const FUNERAL_VIDEO = {
  portrait: {
    src: `${BASE}/funeral-promo-916-720-v1.mp4`,
    poster: `${BASE}/poster-916-v1.webp`,
    width: 720,
    height: 1280,
  },
  landscape: {
    src: `${BASE}/funeral-promo-169-720-v1.mp4`,
    poster: `${BASE}/poster-169-v1.webp`,
    width: 1280,
    height: 720,
  },
};

const PORTRAIT_QUERY = '(max-width: 767px) and (orientation: portrait)';

export function getFuneralRatio(matchMedia) {
  const mm = matchMedia || (typeof window !== 'undefined' ? window.matchMedia : null);
  if (typeof mm !== 'function') return 'landscape';
  return mm.call(typeof window !== 'undefined' ? window : undefined, PORTRAIT_QUERY).matches
    ? 'portrait'
    : 'landscape';
}

export function shouldSkipFuneralAutoplay() {
  if (typeof window === 'undefined') return true;
  const reduced =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);
  return reduced || saveData;
}

export default function FuneralTemplateDemoVideo() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [ratio, setRatio] = useState(() => getFuneralRatio());
  const [skipAuto] = useState(() => shouldSkipFuneralAutoplay());
  const [started, setStarted] = useState(false); // user tapped Play (reduced motion / saveData)
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(true);
  const srcRatio = useRef(null);
  const userPaused = useRef(false);
  const inView = useRef(false);

  const assignSrc = useCallback((r) => {
    const v = videoRef.current;
    if (!v || srcRatio.current === r) return;
    v.src = FUNERAL_VIDEO[r].src;
    srcRatio.current = r;
    if (v.load) v.load();
  }, []);

  const tryPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.play) return;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }, []);

  // Choose source on load and on orientation change.
  useEffect(() => {
    const onChange = () => {
      const next = getFuneralRatio();
      setRatio((prev) => {
        if (prev !== next && srcRatio.current) {
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

  // Lazy src (rootMargin 200px) when autoplay is allowed.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === 'undefined' || skipAuto) return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { assignSrc(getFuneralRatio()); io.disconnect(); } }),
      { rootMargin: '200px' }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [assignSrc, skipAuto]);

  // Autoplay at 50% in view; pause when out of view.
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
          assignSrc(getFuneralRatio());
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
    assignSrc(getFuneralRatio());
    tryPlay();
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      assignSrc(getFuneralRatio());
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

  const meta = FUNERAL_VIDEO[ratio];
  const showPlayCta = skipAuto && !started;

  return (
    <section className="funeral-demo-video" aria-labelledby="funeral-demo-video-heading">
      <h2 id="funeral-demo-video-heading" className="h4 txt-dark text-center">See it in action</h2>
      <figure className={`funeral-demo-video__figure funeral-demo-video__figure--${ratio}`} ref={rootRef}>
        <div className="funeral-demo-video__frame">
          <video
            ref={videoRef}
            className="funeral-demo-video__player"
            poster={meta.poster}
            width={meta.width}
            height={meta.height}
            muted
            loop
            playsInline
            preload="none"
            aria-label="Funeral template demo video"
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
            data-testid="funeral-demo-video"
          />
          {showPlayCta ? (
            <button type="button" className="funeral-demo-video__play-cta" onClick={onPlayTap}>
              ▶ Play video
            </button>
          ) : (
            <div className="funeral-demo-video__controls">
              <button type="button" className="funeral-demo-video__btn" onClick={toggleSound}
                aria-label={muted ? 'Turn sound on' : 'Mute video'}>
                <span aria-hidden="true">{muted ? '🔇' : '🔊'}</span>
              </button>
              <button type="button" className="funeral-demo-video__btn" onClick={togglePlay}
                aria-label={paused ? 'Play video' : 'Pause video'}>
                <span aria-hidden="true">{paused ? '▶' : '❚❚'}</span>
              </button>
            </div>
          )}
        </div>
        <figcaption className="funeral-demo-video__caption">Funeral template demo, made with RosuePro</figcaption>
      </figure>
    </section>
  );
}
