const BASE = '/videos/hero';

export const HERO_POSTERS = {
  portrait: { full: `${BASE}/poster-916-v1.webp`, small: `${BASE}/poster-916-960-v1.webp` },
  landscape: { full: `${BASE}/poster-169-v1.webp`, small: `${BASE}/poster-169-960-v1.webp` },
};

export const PORTRAIT_QUERY = '(max-width: 767px) and (orientation: portrait)';

/** 'portrait' (9:16) on portrait phones, otherwise 'landscape' (16:9). */
export function getRatioClass(matchMedia = typeof window !== 'undefined' ? window.matchMedia : undefined) {
  if (!matchMedia) return 'landscape';
  return matchMedia(PORTRAIT_QUERY).matches ? 'portrait' : 'landscape';
}

export function getPoster(ratio, viewportWidth = 1440) {
  const p = HERO_POSTERS[ratio];
  // Portrait phones and narrow landscape screens get the 960px variant.
  if (ratio === 'portrait') return viewportWidth * 1 <= 480 ? p.small : p.full;
  return viewportWidth < 960 ? p.small : p.full;
}

/** Ordered sources (MP4 only; VP9 WebM was larger than H.264 CRF 28 so it is omitted) for the given ratio class. */
export function getVideoSources(ratio, { dpr = 1, viewportWidth = 1440 } = {}) {
  if (ratio === 'portrait') {
    return [
      { src: dpr >= 3 ? `${BASE}/hero-916-1080-v1.mp4` : `${BASE}/hero-916-720-v1.mp4`, type: 'video/mp4' },
    ];
  }
  return [
    { src: viewportWidth >= 1440 ? `${BASE}/hero-169-1080-v1.mp4` : `${BASE}/hero-169-720-v1.mp4`, type: 'video/mp4' },
  ];
}

/** Pick the first source the browser can play. */
export function pickVideoSrc(sources, canPlayType) {
  if (!canPlayType) return sources[sources.length - 1].src;
  const hit = sources.find((s) => canPlayType(s.type));
  return (hit || sources[sources.length - 1]).src;
}

export function shouldSkipAutoload({ matchMedia, connection } = {}) {
  const reduced = !!(matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const saveData = !!(connection && connection.saveData);
  const slow = !!(connection && ['2g', 'slow-2g'].includes(connection.effectiveType));
  return reduced || saveData || slow;
}
