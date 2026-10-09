import { featuredHomeProjects, getProjectBySlug } from './portfolioProjects';

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
