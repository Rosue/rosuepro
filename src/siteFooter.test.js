import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router from './core/Router';
import { buildSitemapXml } from '../scripts/sitemap-build.cjs';
import { allPublicRoutes } from './seo';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Router />
    </MemoryRouter>
  );
}

test('shared footer shows Discovery Bay address and footer nav without Resume', () => {
  renderAt('/');
  const footer = screen.getByRole('contentinfo');
  expect(footer).toHaveClass('contact-page-footer');
  expect(footer).toHaveTextContent(/Registered business address: Discovery Bay/i);
  expect(screen.getByRole('navigation', { name: 'Footer' })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Resume' })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog');
  expect(screen.getByRole('link', { name: 'Tutoring' })).toHaveAttribute('href', '/tutoring');
  expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about-us');
});

test('shared footer appears on contact and portfolio project pages', () => {
  renderAt('/contact');
  expect(screen.getAllByText(/Registered business address: Discovery Bay/i).length).toBeGreaterThanOrEqual(1);

  renderAt('/portfolio/pack-my-cart');
  expect(screen.getAllByText(/Registered business address: Discovery Bay/i).length).toBeGreaterThanOrEqual(1);
});

test('/resume redirects to the home page', async () => {
  renderAt('/resume');
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /Landing pages and AI chatbots/i })).toBeInTheDocument();
  });
  expect(screen.queryByRole('link', { name: 'Resume' })).not.toBeInTheDocument();
});

test('sitemap does not list /resume', () => {
  const xml = buildSitemapXml('2026-01-01');
  expect(allPublicRoutes()).not.toContain('/resume');
  expect(xml).not.toContain('<loc>https://rosue.pro/resume</loc>');
});
