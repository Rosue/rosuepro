import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {
  HOME_SHARE_QR_SRC,
  ROSUE_PRO_HOME_URL,
  homeShareFacebookHref,
  homeShareLinkedInHref,
  homeShareWhatsAppHref,
  homeShareWhatsAppMessage,
  homeShareXHref,
} from './constants/homeShare';

test('home share QR SVG encodes https://rosue.pro', async () => {
  const expected = await QRCode.toString(ROSUE_PRO_HOME_URL, {
    type: 'svg',
    margin: 4,
    width: 128,
    color: { dark: '#000000', light: '#ffffff' },
  });
  const actual = fs.readFileSync(
    path.join(__dirname, '../public/home-share-qr.svg'),
    'utf8'
  );
  expect(actual.trim()).toBe(expected.trim());
});

test('home page includes share band above the footer', () => {
  render(<App />);

  const section = document.getElementById('share');
  expect(section).toHaveAttribute('aria-labelledby', 'share-title');
  expect(
    screen.getByRole('heading', { name: 'Know a business that needs a website?' })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Scan the code or share RosuePro with a friend, customer, or group chat/i)
  ).toBeInTheDocument();
  const qrWrapper = screen.getByRole('img', { name: 'QR code for rosue.pro' });
  expect(qrWrapper).toBeInTheDocument();
  const qrImg = qrWrapper.querySelector('img');
  expect(qrImg).toHaveAttribute('src', HOME_SHARE_QR_SRC);
  expect(qrImg.getAttribute('src')).not.toContain('object Object');
  expect(qrImg.getAttribute('src')).toMatch(/home-share-qr\.svg$/);

  const whatsapp = screen.getByRole('link', { name: 'WhatsApp' });
  expect(whatsapp.href).toBe(homeShareWhatsAppHref());
  expect(whatsapp).toHaveAttribute('target', '_blank');
  expect(whatsapp).toHaveAttribute('rel', 'noopener noreferrer');

  expect(screen.getByRole('link', { name: 'Facebook' }).href).toBe(homeShareFacebookHref());
  expect(screen.getByRole('link', { name: 'X' }).href).toBe(homeShareXHref());
  expect(screen.getByRole('link', { name: 'LinkedIn' }).href).toBe(homeShareLinkedInHref());

  const main = document.getElementById('main-content');
  const footer = document.querySelector('footer');
  expect(main.compareDocumentPosition(section)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(section.compareDocumentPosition(footer)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
});

test('home share WhatsApp message includes rosue.pro URL', () => {
  expect(homeShareWhatsAppMessage()).toContain(ROSUE_PRO_HOME_URL);
  expect(homeShareWhatsAppHref()).toContain(encodeURIComponent(ROSUE_PRO_HOME_URL));
});

describe('home share copy link', () => {
  const originalClipboard = navigator.clipboard;

  afterEach(() => {
    Object.assign(navigator, { clipboard: originalClipboard });
  });

  test('shows Link copied toast after copying rosue.pro', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'Copy link' }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(ROSUE_PRO_HOME_URL);
      expect(screen.getByText('Link copied')).toBeInTheDocument();
    });
  });
});
