import { fireEvent, render, screen } from '@testing-library/react';
import FuneralTemplateDemoVideo, { getFuneralRatio } from './FuneralTemplateDemoVideo';

const mm = (portrait, reduced = false) => (q) => ({
  matches: q.includes('reduced-motion') ? reduced : portrait,
  addEventListener() {}, removeEventListener() {},
});

describe('FuneralTemplateDemoVideo', () => {
  const origIO = global.IntersectionObserver;
  const origMM = window.matchMedia;
  let callbacks;
  beforeEach(() => {
    callbacks = [];
    global.IntersectionObserver = jest.fn((cb, opts) => {
      callbacks.push({ cb, opts });
      return { observe: jest.fn(), disconnect: jest.fn(), unobserve: jest.fn() };
    });
    window.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });
  afterEach(() => { global.IntersectionObserver = origIO; window.matchMedia = origMM; });

  test('picks ratio by media query', () => {
    expect(getFuneralRatio(mm(true))).toBe('portrait');
    expect(getFuneralRatio(mm(false))).toBe('landscape');
  });

  test('renders heading, caption, poster and lazy src (rootMargin 200px)', () => {
    window.matchMedia = mm(true);
    render(<FuneralTemplateDemoVideo />);
    expect(screen.getByRole('heading', { name: 'See it in action' })).toBeInTheDocument();
    expect(screen.getByText('Funeral template demo, made with RosuePro')).toBeInTheDocument();
    const video = screen.getByTestId('funeral-demo-video');
    expect(video).toHaveAttribute('poster', '/videos/funeral-template/poster-916-v1.webp');
    expect(video).toHaveAttribute('preload', 'none');
    expect(video).toHaveAttribute('width', '720');
    expect(video.muted).toBe(true);
    expect(video).not.toHaveAttribute('src');
    const lazy = callbacks.find((c) => c.opts && c.opts.rootMargin === '200px');
    lazy.cb([{ isIntersecting: true, intersectionRatio: 0 }]);
    expect(video.getAttribute('src')).toBe('/videos/funeral-template/funeral-promo-916-720-v1.mp4');
    expect(screen.getByLabelText('Turn sound on')).toBeInTheDocument();
    expect(screen.getByLabelText('Play video')).toBeInTheDocument();
  });

  test('uses 16:9 on wide screens and shows Play video button with reduced motion', () => {
    window.matchMedia = mm(false, true);
    render(<FuneralTemplateDemoVideo />);
    const video = screen.getByTestId('funeral-demo-video');
    expect(video).toHaveAttribute('poster', '/videos/funeral-template/poster-169-v1.webp');
    const btn = screen.getByRole('button', { name: /Play video/ });
    expect(video).not.toHaveAttribute('src');
    fireEvent.click(btn);
    expect(video.getAttribute('src')).toBe('/videos/funeral-template/funeral-promo-169-720-v1.mp4');
  });
});
