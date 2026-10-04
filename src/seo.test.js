import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router from './core/Router';
import { applyMetadata } from './seo';
import { getShareUrl } from './data/portfolioProjects';

test('updates metadata during client navigation without leaving duplicate tags', async () => {
  render(<MemoryRouter initialEntries={['/']}><Router /></MemoryRouter>);
  await waitFor(() => expect(document.title).toBe('Landing Page + WhatsApp Chatbot for Jamaican Small Businesses | RosuePro'));
  fireEvent.click(screen.getByRole('link', { name: 'Portfolio', exact: true }));
  await waitFor(() => expect(document.title).toBe('Website Development Portfolio | RosuePro Jamaica'));
  expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
  expect(document.querySelector('link[rel="canonical"]').href).toBe('https://rosue.pro/portfolio');
  expect(document.querySelectorAll('#seo-structured-data')).toHaveLength(1);
  const graph = JSON.parse(document.getElementById('seo-structured-data').textContent)['@graph'];
  expect(graph.find(item => item['@type'] === 'BreadcrumbList').itemListElement[1].item).toBe('https://rosue.pro/portfolio');
});

test('unknown routes are noindex and returning to a public route restores indexing', () => {
  applyMetadata(document, '/does-not-exist');
  expect(document.querySelector('meta[name="robots"]').content).toBe('noindex, follow');
  expect(document.querySelector('link[rel="canonical"]')).toBeNull();
  applyMetadata(document, '/about-us');
  expect(document.querySelector('meta[name="robots"]').content).not.toContain('noindex');
  expect(document.querySelector('link[rel="canonical"]').href).toBe('https://rosue.pro/about-us');
});

test('portfolio project pages expose per-project social metadata', () => {
  applyMetadata(document, '/portfolio/vybz-meter');
  expect(document.title).toBe('Vybz Meter | RosuePro Portfolio');
  expect(document.querySelector('meta[property="og:title"]').content).toBe('Vybz Meter | RosuePro Portfolio');
  expect(document.querySelector('meta[property="og:description"]').content).toContain('interactive map');
  expect(document.querySelector('meta[property="og:url"]').content).toBe('https://rosue.pro/portfolio/vybz-meter');
  expect(document.querySelector('meta[property="og:image"]').content).toBe(
    'https://rosue.pro/projects/vybz-meter.webp'
  );
  expect(document.querySelector('meta[name="twitter:card"]').content).toBe('summary_large_image');
  expect(document.querySelector('meta[name="twitter:image"]').content).toBe(
    'https://rosue.pro/projects/vybz-meter.webp'
  );
});

test('share links always use the RosuePro portfolio page for social previews', () => {
  expect(getShareUrl({ slug: 'yahsonice' })).toBe('https://rosue.pro/portfolio/yahsonice');
  expect(getShareUrl({ slug: 'vybz-meter', liveUrl: 'https://vybz-meter.web.app/' })).toBe(
    'https://rosue.pro/portfolio/vybz-meter'
  );
});

test('blog index metadata matches Jamaica website and WhatsApp guides', () => {
  applyMetadata(document, '/blog');
  expect(document.title).toBe('Jamaica Website & WhatsApp Guides | RosuePro Blog');
  expect(document.querySelector('meta[name="description"]').content).toMatch(/WhatsApp chatbots/i);
  expect(document.querySelector('meta[name="description"]').content).toMatch(/Jamaican small businesses/i);
});

test('website design Jamaica price article includes Article, FAQ, and Service structured data', () => {
  applyMetadata(document, '/blog/website-design-jamaica-price');
  const graph = JSON.parse(document.getElementById('seo-structured-data').textContent)['@graph'];
  const article = graph.find((item) => item['@type'] === 'Article');
  expect(article.datePublished).toBe('2026-09-27');
  expect(article.author.name).toBe('RosuePro');
  expect(article.image[0]).toBe('https://rosue.pro/website-design-jamaica-price.webp');
  expect(graph.some((item) => item['@type'] === 'FAQPage')).toBe(true);
  const service = graph.find((item) => item['@type'] === 'Service');
  expect(service.offers.price).toBe('45000');
  expect(service.offers.priceCurrency).toBe('JMD');
  expect(graph.find((item) => item['@type'] === 'Organization').telephone).toBe('+1-876-566-7328');
});
