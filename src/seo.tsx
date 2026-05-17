import { Helmet } from 'react-helmet-async';

export const SITE_URL = 'https://arurecord.pl';
export const SITE_NAME = 'AruRecord';
export const DEFAULT_IMAGE = `${SITE_URL}/scul%20gitara.png`;
export const DEFAULT_DESCRIPTION =
  'AruRecord to polskie studio dubbingu i lokalizacji. Tworzymy spolszczenia, dubbing do filmów, seriali, animacji, gier, reklam i audiobooków.';

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function buildTitle(title?: string) {
  return title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - studio dubbingu i lokalizacji`;
}

export function absoluteUrl(path = '/') {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  publishedTime,
  noindex = false,
  jsonLd,
}: SeoProps) {
  const pageTitle = buildTitle(title);
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);
  const structuredData = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      <meta property="og:locale" content="pl_PL" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
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
      availableLanguage: ['pl'],
    },
  };
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'pl-PL',
  };
}
