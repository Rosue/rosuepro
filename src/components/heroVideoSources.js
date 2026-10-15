const BASE = '/videos/hero';

/**
 * Formats available for the hero. Phones in portrait always use 9:16.
 * 768px+ uses WIDE_FORMAT (16:9). To swap in another wide cut, add its
 * entry/files and change WIDE_FORMAT (one line).
 */
export const FORMATS = {
  '9x16': {
    aspect: '9 / 16',
    poster: { full: `${BASE}/poster-9x16-v4.webp`, small: `${BASE}/poster-9x16-960-v4.webp`, fullWidth: 1080 },
    video: { sd: `${BASE}/ad-9x16-720-v4.mp4`, hd: `${BASE}/ad-9x16-1080-v4.mp4` },
  },
  '16x9': {
    aspect: '16 / 9',
    poster: { full: `${BASE}/poster-16x9-v4.webp`, small: `${BASE}/poster-16x9-960-v4.webp`, fullWidth: 1920 },
    video: { sd: `${BASE}/ad-16x9-720-v4.mp4`, hd: `${BASE}/ad-16x9-1080-v4.mp4` },
  },
};

export const PORTRAIT_FORMAT = '9x16';
export const WIDE_FORMAT = '16x9'; // one-line switch: any key in FORMATS (e.g. a future 4:5 or 1:1 cut)

export const PORTRAIT_QUERY = '(max-width: 767px) and (orientation: portrait)';

/** Returns the format key: 9x16 on portrait phones, WIDE_FORMAT otherwise.  */
export function getFormat(matchMedia = typeof window !== 'undefined' ? window.matchMedia : undefined, wide = WIDE_FORMAT) {
  if (!matchMedia) return wide;
  return matchMedia(PORTRAIT_QUERY).matches ? PORTRAIT_FORMAT : wide;
}

export function getPoster(format, viewportWidth = 1440) {
  const p = FORMATS[format].poster;
  return viewportWidth <= 480 ? p.small : p.full;
}

/** 1080p for DPR>=3 on 9:16; for wide formats only at viewports >=1440px. */
export function getVideoSrc(format, { dpr = 1, viewportWidth = 1440 } = {}) {
  const v = FORMATS[format].video;
  if (format === PORTRAIT_FORMAT) return dpr >= 3 ? v.hd : v.sd;
  return viewportWidth >= 1440 ? v.hd : v.sd;
}

export function shouldSkipAutoload({ matchMedia, connection } = {}) {
  const reduced = !!(matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const saveData = !!(connection && connection.saveData);
  const slow = !!(connection && ['2g', 'slow-2g'].includes(connection.effectiveType));
  return reduced || saveData || slow;
}
