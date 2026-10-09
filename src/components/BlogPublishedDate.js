import React from 'react';
import { useLocation } from 'react-router-dom';
import { formatPublishedDate, getBlogPostByPath } from '../data/blogPosts';

export default function BlogPublishedDate({ className = 'text-center text-muted mb-0' }) {
  const { pathname } = useLocation();
  const post = getBlogPostByPath(pathname);
  if (!post) return null;

  return (
    <p className={className}>
      <time dateTime={post.datePublished}>Published {formatPublishedDate(post.datePublished)}</time>
    </p>
  );
}
