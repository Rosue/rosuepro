import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/** After hydration, replace legacy paths (e.g. /about-us) with canonical URLs without changing the page tree. */
export default function useReplacePathWhen(fromPath, toPath) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === fromPath) {
      navigate(toPath, { replace: true });
    }
  }, [fromPath, navigate, pathname, toPath]);
}
