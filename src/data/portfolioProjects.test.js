import {
  clientPortfolioProjects,
  demoPortfolioProjects,
  featuredHomeProjects,
  getProjectBySlug,
  projectVisitLabel,
} from './portfolioProjects';

test('featured home portfolio includes Reggae Wheels with live URL and preview image', () => {
  const featured = featuredHomeProjects();
  const reggaeWheels = featured.find((project) => project.slug === 'reggae-wheels');
  expect(reggaeWheels).toBeDefined();
  expect(reggaeWheels.liveUrl).toBe('https://reggaewheels-2482a.web.app/');
  expect(reggaeWheels.image).toBe('/portfolio/reggae-wheels.webp');
  expect(reggaeWheels.featuredOnHome).toBe(true);
});

test('reggae-wheels resolves for portfolio detail route', () => {
  const project = getProjectBySlug('reggae-wheels');
  expect(project).toBeDefined();
  expect(project.name).toBe('Reggae Wheels');
});

test('demo prototypes are excluded from client portfolio and homepage featured lists', () => {
  const demos = demoPortfolioProjects();
  expect(demos).toHaveLength(8);
  expect(demos.map((project) => project.slug)).toEqual([
    'trimpon-ja',
    'checkpon-ja',
    'yardfix-ja',
    'fitpon-ja',
    'barrelpon-ja',
    'pack-my-hardware',
    'party-jamaica',
    'jamaica-route-taxi',
  ]);

  const clientSlugs = clientPortfolioProjects().map((project) => project.slug);
  demos.forEach((demo) => {
    expect(clientSlugs).not.toContain(demo.slug);
  });

  featuredHomeProjects().forEach((project) => {
    expect(project.type).not.toBe('demo');
  });
});

test('demo projects use Try the demo CTA label', () => {
  const trimpon = getProjectBySlug('trimpon-ja');
  expect(projectVisitLabel(trimpon, 'portfolio')).toBe('Try the demo');
});
