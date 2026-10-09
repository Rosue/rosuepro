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

test('portfolio page includes live demo section with prototype cards', () => {
  render(
    <BrowserRouter>
      <Portforlio />
    </BrowserRouter>
  );

  const demosSection = document.getElementById('demos');
  expect(demosSection).toHaveAttribute('aria-labelledby', 'demos-heading');
  expect(screen.getByRole('heading', { name: 'Try a live demo' })).toBeInTheDocument();
  expect(
    screen.getByText(/Working prototypes built by RosuePro/i)
  ).toBeInTheDocument();

  const tryDemoLinks = screen.getAllByRole('link', { name: 'Try the demo' });
  expect(tryDemoLinks[0]).toHaveAttribute('href', 'https://trimpon-ja.web.app');
  expect(tryDemoLinks).toHaveLength(6);
  expect(screen.queryByRole('heading', { name: 'TrimPon JA', level: 2 })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Share TrimPon JA on WhatsApp' })).toBeInTheDocument();
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
