import { render, screen } from '@testing-library/react';
import PackMyCartDemoVideo from './PackMyCartDemoVideo';

describe('PackMyCartDemoVideo', () => {
  const originalIntersectionObserver = global.IntersectionObserver;

  afterEach(() => {
    global.IntersectionObserver = originalIntersectionObserver;
  });

  test('renders accessible video with poster and caption; src is assigned lazily', () => {
    const observe = jest.fn();
    const disconnect = jest.fn();
    global.IntersectionObserver = jest.fn(() => ({
      observe,
      disconnect,
      unobserve: jest.fn(),
    }));

    render(<PackMyCartDemoVideo />);

    const video = screen.getByLabelText('Pack My Cart demo video: Blacka AI shopping helper');
    expect(video).toHaveAttribute('poster', '/videos/packmycart-demo-poster.webp');
    expect(video).toHaveAttribute('preload', 'none');
    expect(video.muted).toBe(true);
    expect(video).not.toHaveAttribute('src');

    expect(
      screen.getByText('Blacka, the AI shopping helper, answering in Jamaican Creole.')
    ).toBeInTheDocument();
    expect(observe).toHaveBeenCalled();
  });

  test('assigns video src on first intersection', () => {
    let callback;
    global.IntersectionObserver = jest.fn((cb) => {
      callback = cb;
      return { observe: jest.fn(), disconnect: jest.fn(), unobserve: jest.fn() };
    });

    render(<PackMyCartDemoVideo />);
    const video = screen.getByLabelText('Pack My Cart demo video: Blacka AI shopping helper');

    callback([
      {
        isIntersecting: true,
        intersectionRatio: 0.1,
        target: video.closest('figure'),
      },
    ]);

    expect(video.getAttribute('src')).toBe('/videos/packmycart-demo.mp4');
  });
});
