import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Portforlio from './pages/Portforlio';

test('lists custom website offering from J$25,000 on the home page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Custom websites' })).toBeInTheDocument();
  expect(screen.getByText('From J$25,000')).toBeInTheDocument();
  expect(screen.getByText(/find you on Google/i)).toBeInTheDocument();
});

test('promotes Pack My Cart and Funeral Template on the home page', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: 'Visit Pack My Cart' })).toHaveAttribute(
    'href',
    'https://pack-my-cart.web.app/'
  );
  expect(screen.getByRole('link', { name: /Visit Funeral site template/i })).toHaveAttribute(
    'href',
    'https://funeral-template.web.app/'
  );
});

test('promotes Vybz Meter and Funeral Template on the portfolio page', () => {
  render(
    <BrowserRouter>
      <Portforlio />
    </BrowserRouter>
  );

  expect(screen.getByRole('link', { name: 'Visit Vybz Meter' })).toHaveAttribute(
    'href',
    'https://vybz-meter.web.app/'
  );
  expect(screen.getByRole('link', { name: 'Visit Funeral Template' })).toHaveAttribute(
    'href',
    'https://funeral-template.web.app/'
  );
});

test('portfolio cards link to RosuePro project pages', () => {
  render(
    <BrowserRouter>
      <Portforlio />
    </BrowserRouter>
  );

  const vybzDetailLink = screen
    .getAllByRole('link', { name: 'Vybz Meter' })
    .find((link) => link.getAttribute('href') === '/portfolio/vybz-meter');
  expect(vybzDetailLink).toBeTruthy();
  expect(screen.getAllByRole('link', { name: 'View project page' }).length).toBeGreaterThanOrEqual(7);
});

test('portfolio projects include share actions', () => {
  render(
    <BrowserRouter>
      <Portforlio />
    </BrowserRouter>
  );

  expect(screen.getAllByRole('link', { name: /Share .+ on WhatsApp/ }).length).toBeGreaterThanOrEqual(7);
  expect(screen.getAllByRole('button', { name: /Copy link to/ }).length).toBeGreaterThanOrEqual(7);

  const vybzWhatsApp = screen.getByRole('link', { name: 'Share Vybz Meter on WhatsApp' });
  expect(vybzWhatsApp.href).toContain(encodeURIComponent('https://rosue.pro/portfolio/vybz-meter'));
});
