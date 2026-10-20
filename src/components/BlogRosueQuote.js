import React from 'react';
import { GET_QUOTE_HREF, GET_QUOTE_LABEL } from '../constants/quote';

/** Shared sitewide pricing copy for blog articles (no published dollar amounts). */
export default function BlogRosueQuote({ className = 'mb-4' }) {
  return (
    <p className={className}>
      RosuePro quotes every project based on scope — landing pages, chatbots, automations, website fixes, and our lead landing page plus WhatsApp chatbot package.{' '}
      <a href={GET_QUOTE_HREF} target="_blank" rel="noopener noreferrer">{GET_QUOTE_LABEL}</a> on WhatsApp.
    </p>
  );
}

export function BlogRosueQuoteLink() {
  return (
    <a href={GET_QUOTE_HREF} target="_blank" rel="noopener noreferrer">{GET_QUOTE_LABEL}</a>
  );
}
