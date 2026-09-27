import React from 'react';
import { buildWhatsAppUrl } from '../constants/whatsapp';

export function WhatsAppButton({
  className = 'btn btn-whatsapp',
  children = 'Chat on WhatsApp',
  message,
  block = false,
}) {
  return (
    <a
      className={`${className}${block ? ' w-100' : ''}`.trim()}
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

export function EmailWhatsAppActions({
  mailtoHref,
  mailLabel = 'Email RosuePro',
  whatsappLabel = 'Chat on WhatsApp',
  whatsappMessage,
  className = 'contact-actions d-flex flex-wrap gap-2 justify-content-center',
  buttonClassEmail = 'btn btn-primary',
  buttonClassWhatsApp = 'btn btn-whatsapp',
}) {
  return (
    <div className={className}>
      <a className={buttonClassEmail} href={mailtoHref}>
        {mailLabel}
      </a>
      <WhatsAppButton className={buttonClassWhatsApp} message={whatsappMessage}>
        {whatsappLabel}
      </WhatsAppButton>
    </div>
  );
}
