import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pl from './locales/pl.json';
import en from './locales/en.json';

export const SUPPORTED_LANGS = ['pl', 'en'] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

/** Język wynika z adresu: /en i /en/... = angielski, reszta = polski. */
export function langFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'pl';
}

i18n.use(initReactI18next).init({
  resources: {
    pl: { translation: pl },
    en: { translation: en },
  },
  // start od razu w dobrym języku, żeby nie było mignięcia polskiego tekstu na /en
  lng: langFromPath(window.location.pathname),
  fallbackLng: 'pl',
  interpolation: { escapeValue: false }, // React już escapuje
});

export default i18n;
