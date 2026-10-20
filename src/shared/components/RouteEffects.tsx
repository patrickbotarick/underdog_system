import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    const heading = document.querySelector<HTMLHeadingElement>('h1');
    document.title = `${heading?.textContent ?? 'Página'} | Underdog`;
    heading?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
