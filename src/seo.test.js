import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router from './core/Router';
import { applyMetadata } from './seo';

test('updates metadata during client navigation without leaving duplicate tags', async () => {
  render(<MemoryRouter initialEntries={['/']}><Router /></MemoryRouter>);
  await waitFor(() => expect(document.title).toBe('Java Tutoring & Website Services in Jamaica | RosuePro'));
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
