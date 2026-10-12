import { useEffect, useRef } from 'react';

const VIDEO_SRC = '/videos/packmycart-demo.mp4';
const POSTER_SRC = '/videos/packmycart-demo-poster.webp';

export default function PackMyCartDemoVideo() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const motionQuery =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    let srcAssigned = false;

    const syncPlayback = (entry) => {
      if (!srcAssigned && entry.isIntersecting) {
        video.src = VIDEO_SRC;
        srcAssigned = true;
      }

      if (motionQuery?.matches) {
        return;
      }

      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => syncPlayback(entry));
      },
      { threshold: [0, 0.5, 1] }
    );

    observer.observe(root);

    const onMotionChange = () => {
      if (motionQuery?.matches) {
        video.pause();
      }
    };
    motionQuery?.addEventListener('change', onMotionChange);

    return () => {
      observer.disconnect();
      motionQuery?.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <figure className="packmycart-demo-video" ref={rootRef}>
      <div className="packmycart-demo-video__frame">
        <video
          ref={videoRef}
          className="packmycart-demo-video__player"
          muted
          playsInline
          loop
          preload="none"
          poster={POSTER_SRC}
          controls
          aria-label="Pack My Cart demo video: Blacka AI shopping helper"
        />
      </div>
      <figcaption className="packmycart-demo-video__caption">
        Blacka, the AI shopping helper, answering in Jamaican Creole.
      </figcaption>
    </figure>
  );
}
