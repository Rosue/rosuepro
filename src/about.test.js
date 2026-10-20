import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router from './core/Router';
import { applyMetadata } from './seo';
import { CONTACT_MAILTO_HREF, CONTACT_WHATSAPP_HREF } from './constants/contactPage';
import { getAboutWorkStrip } from './constants/aboutPage';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Router />
    </MemoryRouter>
  );
}

test('about page shows redesign sections and exact hero copy', () => {
  renderAt('/about');
  expect(screen.getByRole('heading', { name: /help small businesses sell/i })).toBeInTheDocument();
  expect(screen.getByText(/Fully remote\./)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'What we build' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'How we work' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Our work' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Get a quote' })).toBeInTheDocument();
  expect(screen.queryByText(/Java tutoring/i)).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Resume' })).not.toBeInTheDocument();
});

test('about page work strip uses live portfolio URLs', () => {
  renderAt('/about');
  getAboutWorkStrip().forEach((project) => {
    expect(screen.getByRole('link', { name: project.name })).toHaveAttribute('href', project.liveUrl);
  });
  expect(screen.getByRole('link', { name: /View the full portfolio/i })).toHaveAttribute('href', '/portfolio');
});

test('about page CTAs use WhatsApp and project enquiry mailto', () => {
  renderAt('/about');
  const waLinks = screen
    .getAllByRole('link', { name: /Chat on WhatsApp/i })
    .filter((link) => link.classList.contains('contact-page-btn--wa'));
  expect(waLinks).toHaveLength(2);
  waLinks.forEach((link) => {
    expect(link.getAttribute('href')).toBe(CONTACT_WHATSAPP_HREF);
  });
  expect(screen.getByRole('link', { name: 'Email rosuepro@gmail.com' })).toHaveAttribute('href', CONTACT_MAILTO_HREF);
});

test('/about-us redirects to /about', async () => {
  renderAt('/about-us');
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /help small businesses sell/i })).toBeInTheDocument();
  });
});

test('about page metadata is indexable with canonical /about', () => {
  applyMetadata(document, '/about');
  expect(document.title).toBe('About | RosuePro');
  expect(document.querySelector('link[rel="canonical"]').href).toBe('https://rosue.pro/about');
  expect(document.querySelector('meta[name="robots"]').content).not.toContain('noindex');
});
