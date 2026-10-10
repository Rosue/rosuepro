import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router from './core/Router';
import { applyMetadata } from './seo';
import { getShareUrl, projectShareUrl } from './data/portfolioProjects';

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

test('website design Jamaica price article includes Article and FAQ structured data', () => {
  applyMetadata(document, '/blog/website-design-jamaica-price');
  const graph = JSON.parse(document.getElementById('seo-structured-data').textContent)['@graph'];
  const article = graph.find((item) => item['@type'] === 'Article');
  expect(article.datePublished).toBe('2026-09-27');
  expect(article.author.name).toBe('RosuePro');
  expect(article.image[0]).toBe('https://rosue.pro/website-design-jamaica-price.webp');
  expect(graph.some((item) => item['@type'] === 'FAQPage')).toBe(true);
  expect(graph.find((item) => item['@type'] === 'Organization').telephone).toBe('+1-876-566-7328');
});

test('homepage includes ProfessionalService and service offers in structured data', () => {
  applyMetadata(document, '/');
  const graph = JSON.parse(document.getElementById('seo-structured-data').textContent)['@graph'];
  expect(graph.some((item) => item['@type'] === 'ProfessionalService')).toBe(true);
  const services = graph.filter((item) => item['@type'] === 'Service');
  expect(services.length).toBeGreaterThanOrEqual(7);
  const leadPackage = services.find((item) => item.name === 'Landing page + WhatsApp chatbot setup');
  expect(leadPackage.offers.price).toBe('45000');
  expect(document.querySelector('link[rel="preload"][href="/Slide1.webp"]')).toBeTruthy();
});

test('portfolio detail breadcrumbs include Portfolio parent', () => {
  applyMetadata(document, '/portfolio/vybz-meter');
  const crumbs = JSON.parse(document.getElementById('seo-structured-data').textContent)['@graph'].find(
    (item) => item['@type'] === 'BreadcrumbList'
  ).itemListElement;
  expect(crumbs.map((item) => item.item)).toEqual([
    'https://rosue.pro/',
    'https://rosue.pro/portfolio',
    'https://rosue.pro/portfolio/vybz-meter',
  ]);
});

test('404 page is noindex', () => {
  applyMetadata(document, '/404');
  expect(document.querySelector('meta[name="robots"]').content).toBe('noindex, follow');
  expect(document.querySelector('link[rel="canonical"]')).toBeNull();
});

test('sitemap lists every public route with lastmod', () => {
  const { buildSitemapXml } = require('../scripts/sitemap-build.cjs');
  const { allPublicRoutes, origin } = require('./seo');
  const xml = buildSitemapXml('2026-01-01');
  allPublicRoutes().forEach((route) => {
    expect(xml).toContain(`<loc>${origin}${route}</loc>`);
  });
  expect((xml.match(/<lastmod>/g) || []).length).toBe(allPublicRoutes().length);
});

test('portfolio card share actions prefer the live project URL when available', () => {
  expect(projectShareUrl({ slug: 'yahsonice' })).toBe('https://rosue.pro/portfolio/yahsonice');
  expect(projectShareUrl({ slug: 'vybz-meter', liveUrl: 'https://vybz-meter.web.app/' })).toBe(
    'https://vybz-meter.web.app/'
  );
});

test('reggae wheels portfolio page exposes social metadata and preview image', () => {
  applyMetadata(document, '/portfolio/reggae-wheels');
  expect(document.title).toBe('Reggae Wheels | RosuePro Portfolio');
  expect(document.querySelector('meta[property="og:description"]').content).toContain('car-rental');
  expect(document.querySelector('meta[property="og:image"]').content).toBe(
    'https://rosue.pro/portfolio/reggae-wheels.webp'
  );
});
