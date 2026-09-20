import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyMetadata } from '../seo';

export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => { applyMetadata(document, pathname); }, [pathname]);
  return null;
}
