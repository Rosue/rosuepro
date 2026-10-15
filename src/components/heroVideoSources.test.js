import { getFormat, getVideoSrc, shouldSkipAutoload, PORTRAIT_QUERY, WIDE_FORMAT, FORMATS } from './heroVideoSources';

const mm = (matchQuery) => (q) => ({ matches: q === matchQuery });

test('portrait phones get 9:16, 768px+ gets the wide format (16:9)', () => {
  expect(WIDE_FORMAT).toBe('16x9');
  expect(getFormat(mm(PORTRAIT_QUERY))).toBe('9x16');
  expect(getFormat(mm('nothing'))).toBe('16x9');
  expect(getFormat(undefined)).toBe('16x9');
});

test('wide format is a single key; portrait phones always get 9:16', () => {
  expect(getFormat(mm('nothing'), 'other')).toBe('other');
  expect(getFormat(mm(PORTRAIT_QUERY), 'other')).toBe('9x16');
  expect(Object.keys(FORMATS).sort()).toEqual(['16x9', '9x16']);
});

test('resolution picks by DPR and viewport', () => {
  expect(getVideoSrc('9x16', { dpr: 2 })).toMatch(/ad-9x16-720-v4/);
  expect(getVideoSrc('9x16', { dpr: 3 })).toMatch(/ad-9x16-1080-v4/);
  expect(getVideoSrc('16x9', { viewportWidth: 1280 })).toMatch(/ad-16x9-720-v4/);
  expect(getVideoSrc('16x9', { viewportWidth: 1440 })).toMatch(/ad-16x9-1080-v4/);
});

test('reduced motion and data saver skip autoload', () => {
  expect(shouldSkipAutoload({ matchMedia: mm('(prefers-reduced-motion: reduce)') })).toBe(true);
  expect(shouldSkipAutoload({ matchMedia: mm('x'), connection: { saveData: true } })).toBe(true);
  expect(shouldSkipAutoload({ matchMedia: mm('x'), connection: { effectiveType: 'slow-2g' } })).toBe(true);
  expect(shouldSkipAutoload({ matchMedia: mm('x'), connection: { effectiveType: '4g' } })).toBe(false);
});
