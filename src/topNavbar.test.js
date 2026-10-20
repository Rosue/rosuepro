import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';

function renderNav(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <TopNavbar />
    </MemoryRouter>
  );
}

test('main nav shows Services, Portfolio, Contact and WhatsApp CTA', () => {
  renderNav('/');
  expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/#services');
  expect(screen.getByRole('link', { name: 'Portfolio' })).toHaveAttribute('href', '/portfolio');
  expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/about-us');
  expect(screen.getAllByRole('link', { name: /Chat on WhatsApp/i })[0]).toHaveAttribute(
    'href',
    expect.stringContaining('wa.me')
  );
});

test('Services link is current on home', () => {
  renderNav('/');
  expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('aria-current', 'page');
});

test('skip link targets main content', () => {
  renderNav('/');
  expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main-content');
});

test('mobile menu opens and closes with Escape', () => {
  renderNav('/portfolio');
  const toggle = screen.getByRole('button', { name: 'Open menu' });
  fireEvent.click(toggle);
  expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
});
