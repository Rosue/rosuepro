import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Portforlio from './pages/Portforlio';

test('lists custom website offering from J$25,000 on the home page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Custom websites' })).toBeInTheDocument();
  expect(screen.getByText('From J$25,000')).toBeInTheDocument();
  expect(screen.getByText(/find you on Google/i)).toBeInTheDocument();
});

test('lists Google Business Profile help with ask-for-a-price on the home page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Google Business Profile (Google Maps)' })).toBeInTheDocument();
  expect(screen.getByText('Ask for a price')).toBeInTheDocument();
  expect(screen.getByText(/never claims a listing for someone who does not own the business/i)).toBeInTheDocument();
  expect(screen.getByText(/Customise your profile: business description, categories, hours/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Ask about Google Business Profile' })).toBeInTheDocument();
});

test('promotes Pack My Cart, Reggae Wheels, and Funeral Template on the home page', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: 'Visit Pack My Cart' })).toHaveAttribute(
    'href',
    'https://pack-my-cart.web.app/'
  );
  expect(screen.getByRole('link', { name: 'Visit Reggae Wheels' })).toHaveAttribute(
    'href',
    'https://reggaewheels-2482a.web.app/'
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
  expect(vybzWhatsApp.href).toContain(encodeURIComponent('Vybz Meter — https://vybz-meter.web.app/'));

  const copyButton = screen.getByRole('button', { name: 'Copy link to Vybz Meter' });
  expect(copyButton).toHaveTextContent('');
  expect(copyButton.querySelector('svg')).toBeInTheDocument();
  expect(screen.queryByText('WhatsApp', { selector: '.project-share-btn span' })).not.toBeInTheDocument();
  document.querySelectorAll('.project-share-btn').forEach((btn) => {
    expect(btn).toHaveTextContent('');
  });
});

describe('copy link on portfolio page', () => {
  const originalClipboard = navigator.clipboard;

  afterEach(() => {
    Object.assign(navigator, { clipboard: originalClipboard });
  });

  test('shows a status message after a successful copy', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(
      <BrowserRouter>
        <Portforlio />
      </BrowserRouter>
    );

    await userEvent.click(screen.getByRole('button', { name: 'Copy link to Vybz Meter' }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith('https://vybz-meter.web.app/');
      expect(screen.getByText('Link copied')).toBeInTheDocument();
    });
  });
});
