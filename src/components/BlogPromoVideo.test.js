import { fireEvent, render, screen } from '@testing-library/react';
import BlogPromoVideo, { BLOG_VIDEO_CAPTION } from './BlogPromoVideo';
import { getBlogVideoSrc, PORTRAIT_QUERY } from './heroVideoSources';

const mm = (portrait, reduced = false) => (q) => ({
  matches: q.includes('reduced-motion') ? reduced : portrait && q === PORTRAIT_QUERY,
  addEventListener() {}, removeEventListener() {},
});

describe('BlogPromoVideo', () => {
  const origIO = global.IntersectionObserver;
  const origMM = window.matchMedia;
  let observers;
  beforeEach(() => {
    observers = [];
    global.IntersectionObserver = jest.fn((cb, opts) => {
      observers.push({ cb, opts });
      return { observe: jest.fn(), disconnect: jest.fn(), unobserve: jest.fn() };
    });
    window.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });
  afterEach(() => { global.IntersectionObserver = origIO; window.matchMedia = origMM; });

  test('1080p for DPR 3+ or 1440px+, 720p otherwise', () => {
    expect(getBlogVideoSrc('9x16', { dpr: 2, viewportWidth: 390 })).toMatch(/9x16-720p-v4/);
    expect(getBlogVideoSrc('9x16', { dpr: 3, viewportWidth: 390 })).toMatch(/9x16-1080p-v4/);
    expect(getBlogVideoSrc('16x9', { dpr: 1, viewportWidth: 1280 })).toMatch(/16x9-720p-v4/);
    expect(getBlogVideoSrc('16x9', { dpr: 1, viewportWidth: 1440 })).toMatch(/16x9-1080p-v4/);
  });

  test('portrait: 9:16 poster, muted, preload none, lazy src, autoplay at 50%', () => {
    window.matchMedia = mm(true);
    render(<BlogPromoVideo />);
    expect(screen.getByText(BLOG_VIDEO_CAPTION)).toBeInTheDocument();
    const video = screen.getByTestId('blog-promo-video');
    expect(video).toHaveAttribute('aria-hidden', 'true');
    expect(video).toHaveAttribute('preload', 'none');
    expect(video.getAttribute('poster')).toMatch(/poster-title-9x16/);
    expect(video.muted).toBe(true);
    expect(video).not.toHaveAttribute('src');
    expect(observers.some((o) => o.opts.rootMargin === '200px')).toBe(true);
    const half = observers.find((o) => Array.isArray(o.opts.threshold));
    half.cb([{ isIntersecting: true, intersectionRatio: 0.6 }]);
    expect(video.getAttribute('src')).toMatch(/9x16-720p-v4\.mp4/);
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
    half.cb([{ isIntersecting: false, intersectionRatio: 0 }]);
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Turn sound on' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Play video' })).toBeInTheDocument();
  });

  test('reduced motion: poster + Play video button, no autoplay', () => {
    window.matchMedia = mm(false, true);
    render(<BlogPromoVideo />);
    const video = screen.getByTestId('blog-promo-video');
    expect(video.getAttribute('poster')).toMatch(/poster-title-16x9/);
    const half = observers.find((o) => Array.isArray(o.opts.threshold));
    half.cb([{ isIntersecting: true, intersectionRatio: 1 }]);
    expect(video).not.toHaveAttribute('src');
    expect(window.HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /Play video/ }));
    expect(video.getAttribute('src')).toMatch(/16x9-(720|1080)p-v4\.mp4/);
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });
});
