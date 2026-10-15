import { getRatioClass, getVideoSources, pickVideoSrc, shouldSkipAutoload, PORTRAIT_QUERY } from './heroVideoSources';

const mm = (matchQuery) => (q) => ({ matches: q === matchQuery });

test('portrait phones get 9:16, everything else 16:9', () => {
  expect(getRatioClass(mm(PORTRAIT_QUERY))).toBe('portrait');
  expect(getRatioClass(mm('nothing'))).toBe('landscape');
  expect(getRatioClass(undefined)).toBe('landscape');
});

test('resolution picks by DPR and viewport', () => {
  const mp4 = (s) => pickVideoSrc(s, (t) => t === 'video/mp4');
  expect(mp4(getVideoSources('portrait', { dpr: 2 }))).toMatch(/hero-916-720/);
  expect(mp4(getVideoSources('portrait', { dpr: 3 }))).toMatch(/hero-916-1080/);
  expect(mp4(getVideoSources('landscape', { viewportWidth: 1280 }))).toMatch(/hero-169-720/);
  expect(mp4(getVideoSources('landscape', { viewportWidth: 1440 }))).toMatch(/hero-169-1080/);
  expect(pickVideoSrc(getVideoSources('landscape'), () => '')).toMatch(/\.mp4$/);
});

test('reduced motion and data saver skip autoload', () => {
  expect(shouldSkipAutoload({ matchMedia: mm('(prefers-reduced-motion: reduce)') })).toBe(true);
  expect(shouldSkipAutoload({ matchMedia: mm('x'), connection: { saveData: true } })).toBe(true);
  expect(shouldSkipAutoload({ matchMedia: mm('x'), connection: { effectiveType: 'slow-2g' } })).toBe(true);
  expect(shouldSkipAutoload({ matchMedia: mm('x'), connection: { effectiveType: '4g' } })).toBe(false);
});
