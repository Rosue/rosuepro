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

test('burger click opens mobile sheet and toggles aria-expanded', () => {
  renderNav('/');
  const sheet = document.querySelector('.site-nav-sheet');
  expect(sheet).not.toHaveClass('site-nav-sheet--open');

  const toggle = screen.getByRole('button', { name: 'Open menu' });
  fireEvent.click(toggle);

  expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
  expect(sheet).toHaveClass('site-nav-sheet--open');
  expect(sheet).toHaveAttribute('aria-hidden', 'false');
  expect(sheet).toHaveTextContent('Services');
  expect(sheet).toHaveTextContent('Portfolio');
});

test('rapid double click does not leave menu closed', () => {
  renderNav('/');
  const toggle = screen.getByRole('button', { name: 'Open menu' });
  fireEvent.click(toggle);
  fireEvent.click(toggle);
  expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
});
