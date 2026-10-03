import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import type { Lang } from './i18n';
import { useLang } from './useLang';

export const SITE_URL = 'https://arurecord.pl';
export const SITE_NAME = 'AruRecord';
export const DEFAULT_IMAGE = `${SITE_URL}/scul%20gitara.png`;

const OG_LOCALE: Record<Lang, string> = { pl: 'pl_PL', en: 'en_US' };

type SeoProps = {
  title?: string;
  description?: string;
  /** Ścieżka BEZ prefiksu języka, np. "/about" (prefiks /en dokleja komponent). */
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function absoluteUrl(path = '/') {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  publishedTime,
  noindex = false,
  jsonLd,
}: SeoProps) {
  const { t } = useTranslation();
  const { lang, localePath } = useLang();
  const otherLang: Lang = lang === 'pl' ? 'en' : 'pl';

  const pageTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} - ${t('seo.siteTagline')}`;
  const pageDescription = description ?? t('seo.defaultDescription');

  const canonicalUrl = absoluteUrl(localePath(path));
  const urlPl = absoluteUrl(path);
  const urlEn = absoluteUrl(path === '/' ? '/en' : `/en${path}`);
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);
  const structuredData = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <html lang={lang} />
      <title>{pageTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="pl" href={urlPl} />
      <link rel="alternate" hrefLang="en" href={urlEn} />
      <link rel="alternate" hrefLang="x-default" href={urlPl} />
      <meta name="description" content={pageDescription} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      <meta property="og:locale" content={OG_LOCALE[lang]} />
      <meta property="og:locale:alternate" content={OG_LOCALE[otherLang]} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {structuredData.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/ARU_logo.png'),
    image: DEFAULT_IMAGE,
    email: 'arurecordmail@gmail.com',
    sameAs: [
      'https://www.instagram.com/arurec0rd/',
      'https://www.tiktok.com/@arurecord',
      'https://discord.gg/82NaCbJXFU',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'arurecordmail@gmail.com',
      contactType: 'customer support',
      areaServed: 'PL',
      availableLanguage: ['pl', 'en'],
    },
  };
}

export function webSiteJsonLd(lang: Lang = 'pl') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: lang === 'en' ? `${SITE_URL}/en` : SITE_URL,
    inLanguage: lang === 'en' ? 'en' : 'pl-PL',
  };
}
