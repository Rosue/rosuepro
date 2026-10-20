import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contact from './pages/Contact';
import { applyMetadata } from './seo';
import {
  CONTACT_MAILTO_HREF,
  CONTACT_WHATSAPP_HREF,
  CONTACT_WHATSAPP_MESSAGE,
} from './constants/contactPage';
import { buildWhatsAppUrl } from './constants/whatsapp';

function renderContact() {
  return render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );
}

test('contact page shows headline, cards, and FAQ from the redesign', () => {
  renderContact();
  expect(screen.getByRole('heading', { name: /build your next customer magnet/i })).toBeInTheDocument();
  expect(screen.getByText(/Scope and quote are agreed before work begins/i)).toBeInTheDocument();
  expect(screen.getByText('Recommended')).toBeInTheDocument();
  expect(screen.getByText('+1 876 566 7328')).toBeInTheDocument();
  expect(screen.getByText('rosuepro@gmail.com')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'What to send us' })).toBeInTheDocument();
  expect(screen.getByText('Do I need to visit an office?')).toBeInTheDocument();
  expect(screen.getByText(/Registered business address: Discovery Bay/i)).toBeInTheDocument();
});

test('contact page WhatsApp and email actions use project enquiry links', () => {
  renderContact();
  const waLinks = screen.getAllByRole('link', { name: /Chat on WhatsApp/i });
  const cardWa = waLinks.find((link) => link.classList.contains('contact-page-btn--wa'));
  expect(cardWa).toHaveAttribute('href', CONTACT_WHATSAPP_HREF);
  expect(CONTACT_WHATSAPP_HREF).toBe(buildWhatsAppUrl(CONTACT_WHATSAPP_MESSAGE));
  expect(screen.getByRole('link', { name: 'Send an email' })).toHaveAttribute('href', CONTACT_MAILTO_HREF);
});

test('contact nav link is current on the contact page', () => {
  render(
    <MemoryRouter initialEntries={['/contact']}>
      <Contact />
    </MemoryRouter>
  );
  expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('aria-current', 'page');
});

test('contact page metadata is indexable with canonical URL', () => {
  applyMetadata(document, '/contact');
  expect(document.title).toBe('Contact | RosuePro');
  expect(document.querySelector('meta[name="description"]').content).toMatch(/WhatsApp or email/i);
  expect(document.querySelector('link[rel="canonical"]').href).toBe('https://rosue.pro/contact');
  expect(document.querySelector('meta[name="robots"]').content).not.toContain('noindex');
});
