import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Portforlio from './pages/Portforlio';

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
