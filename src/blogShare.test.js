import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Router from './core/Router';
import { applyMetadata } from './seo';
import { getBlogPostByPath } from './data/blogPosts';
import {
  blogArticleShareUrl,
  blogShareFacebookHref,
  blogShareLinkedInHref,
  blogShareWhatsAppHref,
  blogShareWhatsAppText,
  blogShareXHref,
} from './constants/blogShare';

const AI_AUTOMATION_PATH = '/blog/ai-automation-jamaica';

test('blog share helpers use canonical rosue.pro article URLs and title', () => {
  const post = getBlogPostByPath(AI_AUTOMATION_PATH);
  const url = blogArticleShareUrl(AI_AUTOMATION_PATH);
  const title = post.cardTitle;

  expect(url).toBe('https://rosue.pro/blog/ai-automation-jamaica');
  expect(blogShareWhatsAppText(title, url)).toBe(`${title} — ${url}`);
  expect(blogShareWhatsAppHref(title, url)).toBe(
    `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`
  );
  expect(blogShareFacebookHref(url)).toBe(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  );
  expect(blogShareXHref(title, url)).toBe(
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
  );
  expect(blogShareLinkedInHref(url)).toBe(
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  );
});

test('blog article pages expose Open Graph metadata', () => {
  applyMetadata(document, AI_AUTOMATION_PATH);
  expect(document.querySelector('meta[property="og:title"]').content).toBe('AI Automation Jamaica | RosuePro');
  expect(document.querySelector('meta[property="og:description"]').content).toMatch(/AI automation Jamaica/i);
  expect(document.querySelector('meta[property="og:url"]').content).toBe(
    'https://rosue.pro/blog/ai-automation-jamaica'
  );
  expect(document.querySelector('meta[property="og:image"]').content).toBe(
    'https://rosue.pro/ai-automation-jamaica.webp'
  );
});

test('blog article renders compact and footer share rows', async () => {
  render(
    <MemoryRouter initialEntries={[AI_AUTOMATION_PATH]}>
      <Router />
    </MemoryRouter>
  );

  const post = getBlogPostByPath(AI_AUTOMATION_PATH);
  const title = post.cardTitle;
  const url = blogArticleShareUrl(AI_AUTOMATION_PATH);

  expect(
    screen.getByRole('heading', { name: 'Share this article' })
  ).toBeInTheDocument();

  const whatsappTop = screen.getAllByRole('link', {
    name: `Share ${title} on WhatsApp`,
  })[0];
  expect(whatsappTop.href).toBe(blogShareWhatsAppHref(title, url));
  expect(whatsappTop).toHaveAttribute('target', '_blank');
  expect(whatsappTop).toHaveAttribute('rel', 'noopener noreferrer');

  expect(
    screen.getAllByRole('link', { name: `Share ${title} on Facebook` })[0].href
  ).toBe(blogShareFacebookHref(url));
  expect(screen.getAllByRole('link', { name: `Share ${title} on X` })[0].href).toBe(
    blogShareXHref(title, url)
  );
  expect(
    screen.getAllByRole('link', { name: `Share ${title} on LinkedIn` })[0].href
  ).toBe(blogShareLinkedInHref(url));

  const footerSection = screen.getByRole('heading', { name: 'Share this article' }).closest('section');
  const footer = within(footerSection);
  expect(footer.getByText('WhatsApp')).toBeInTheDocument();
  expect(footer.getByText('Facebook')).toBeInTheDocument();
  expect(footer.getByText('LinkedIn')).toBeInTheDocument();
});

describe('blog article copy link', () => {
  const originalClipboard = navigator.clipboard;

  afterEach(() => {
    Object.assign(navigator, { clipboard: originalClipboard });
  });

  test('shows Link copied toast from compact share row', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(
      <MemoryRouter initialEntries={[AI_AUTOMATION_PATH]}>
        <Router />
      </MemoryRouter>
    );

    const post = getBlogPostByPath(AI_AUTOMATION_PATH);
    const copyButtons = screen.getAllByRole('button', {
      name: `Copy link to ${post.cardTitle}`,
    });
    await userEvent.click(copyButtons[0]);

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(blogArticleShareUrl(AI_AUTOMATION_PATH));
      expect(screen.getByText('Link copied')).toBeInTheDocument();
    });
  });
});
