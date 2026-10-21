import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router from './core/Router';

function mockScrollTo() {
  const scrollTo = jest.fn();
  Object.defineProperty(window, 'scrollTo', { configurable: true, writable: true, value: scrollTo });
  return scrollTo;
}

test('scrolls to top when the pathname changes', () => {
  const scrollTo = mockScrollTo();

  render(
    <MemoryRouter initialEntries={['/about']}>
      <Router />
    </MemoryRouter>
  );

  scrollTo.mockClear();
  fireEvent.click(screen.getByRole('link', { name: 'Portfolio', exact: true }));

  expect(scrollTo).toHaveBeenCalledWith(0, 0);
});

test('scrolls to a hash target on the same pathname instead of jumping to the top', () => {
  const scrollTo = mockScrollTo();
  const services = document.createElement('section');
  services.id = 'services';
  services.scrollIntoView = jest.fn();
  document.body.appendChild(services);

  render(
    <MemoryRouter initialEntries={['/']}>
      <Router />
    </MemoryRouter>
  );

  scrollTo.mockClear();
  fireEvent.click(screen.getByRole('link', { name: 'Services' }));

  expect(services.scrollIntoView).toHaveBeenCalled();
  expect(scrollTo).not.toHaveBeenCalled();

  services.remove();
});
