import { useLocation } from 'react-router-dom';
import { langFromPath, type Lang } from './i18n';

export function useLang() {
  const { pathname, search } = useLocation();
  const lang = langFromPath(pathname);
  const locale = lang === 'en' ? 'en-GB' : 'pl-PL';

  /** "/en/about" -> "/about", "/en" -> "/" */
  const stripLang = (p: string) => p.replace(/^\/en(?=\/|$)/, '') || '/';

  /** Dokleja prefiks języka do ścieżki: "/about" -> "/en/about" (dla PL bez zmian). */
  const localePath = (path: string) => {
    if (lang === 'pl') return path;
    const rest = path === '/' ? '' : path.startsWith('/#') ? path.slice(1) : path;
    return `/en${rest}`;
  };

  /** Ta sama podstrona w innym języku (do przełącznika). */
  const pathFor = (target: Lang) => {
    const base = stripLang(pathname);
    const next = target === 'en' ? `/en${base === '/' ? '' : base}` : base;
    return next + search;
  };

  const formatDate = (value: string | Date) =>
    new Date(value).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return { lang, locale, localePath, pathFor, formatDate };
}
