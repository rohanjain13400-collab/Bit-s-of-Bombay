import { BlogArticle } from '../types';

export interface PageSEOConfig {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  image?: string;
  article?: BlogArticle;
  breadcrumbs?: { name: string; url: string }[];
}

export const BASE_SITE_URL = 'https://bitsofbombay.com';

export const SITE_PAGES_SEO: Record<string, PageSEOConfig> = {
  home: {
    title: 'Bits of Bombay | Stories, Streets & City of Dreams Guide',
    description: 'Explore Bits of Bombay, the premier travel & lifestyle digital magazine featuring curated cafe reviews, street food guides, heritage spots, and city stories.',
    canonicalPath: '/',
    ogType: 'website',
    breadcrumbs: [{ name: 'Home', url: '/' }],
  },
  blogs: {
    title: 'Mumbai Blog Articles & Guides | Bits of Bombay Magazine',
    description: 'Read authentic Mumbai blog articles covering heritage walks, top local eateries, scenic promenades, travel itineraries, and insider tips from local editors.',
    canonicalPath: '/blogs',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Blogs', url: '/blogs' },
    ],
  },
  places: {
    title: 'Places to Visit in Mumbai: Heritage, Skylines & Sea',
    description: 'Discover iconic places to visit in Mumbai, from the majestic Gateway of India and Art Deco Marine Drive to secret stepwells and hidden historical enclaves.',
    canonicalPath: '/places',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Places', url: '/places' },
    ],
  },
  food: {
    title: 'Mumbai Food Guide: Iconic Street Food & Artisanal Cafes',
    description: 'Explore the definitive Mumbai food guide featuring buttery pav bhaji, sizzling vada pav trails, coastal seafood feasts, and curated specialty coffee spots.',
    canonicalPath: '/food',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Food', url: '/food' },
    ],
  },
  travel: {
    title: 'Mumbai Travel Guide: One-Day Itineraries & City Commutes',
    description: 'Plan your trip with our Mumbai travel guide. Get practical 24-hour itineraries, local train survival guides, and scenic weekend escapes across Maharashtra.',
    canonicalPath: '/travel',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Travel', url: '/travel' },
    ],
  },
  experiences: {
    title: 'Mumbai City Experiences: Monsoons, Nightlife & Walks',
    description: 'Immerse yourself in authentic Mumbai city experiences: monsoon coastal strolls, midnight street food runs, local train rides, and cultural walking tours.',
    canonicalPath: '/experiences',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Experiences', url: '/experiences' },
    ],
  },
  about: {
    title: 'About Bits of Bombay: Stories, Streets & Cultural Soul',
    description: 'Learn about Bits of Bombay, a digital travel and lifestyle publication born to chronicle Bombay’s vibrant streets, heritage architecture, and cafe culture.',
    canonicalPath: '/about',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' },
    ],
  },
  contact: {
    title: 'Contact Bits of Bombay: Editorial Desk & Collaborations',
    description: 'Get in touch with the Bits of Bombay editorial desk. Share untold Mumbai street stories, recommend hidden cafes, or submit press inquiries and feedback.',
    canonicalPath: '/contact',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact' },
    ],
  },
};

/**
 * Dynamically updates document head metadata for SEO, AEO, social sharing, and structured data
 */
export function updatePageSEO(config: PageSEOConfig): void {
  // 1. Update Title
  document.title = config.title;

  const fullCanonicalUrl = `${BASE_SITE_URL}${config.canonicalPath.startsWith('/') ? config.canonicalPath : `/${config.canonicalPath}`}`;

  // Helper to set or create meta tag by name or property
  const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
    let el = document.querySelector(`meta[${attribute}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attribute, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 2. Standard Meta Tags
  setMetaTag('name', 'description', config.description);

  // 3. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', fullCanonicalUrl);

  // 4. OpenGraph Tags
  setMetaTag('property', 'og:title', config.title);
  setMetaTag('property', 'og:description', config.description);
  setMetaTag('property', 'og:url', fullCanonicalUrl);
  setMetaTag('property', 'og:type', config.ogType || 'website');
  setMetaTag('property', 'og:site_name', 'Bits of Bombay');
  if (config.image) {
    setMetaTag('property', 'og:image', config.image.startsWith('http') ? config.image : `${BASE_SITE_URL}${config.image}`);
  }

  // 5. Twitter Card Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', config.title);
  setMetaTag('name', 'twitter:description', config.description);
  if (config.image) {
    setMetaTag('name', 'twitter:image', config.image.startsWith('http') ? config.image : `${BASE_SITE_URL}${config.image}`);
  }

  // 6. Schema.org JSON-LD Structured Data
  let jsonLdEl = document.getElementById('bits-of-bombay-schema') as HTMLScriptElement | null;
  if (!jsonLdEl) {
    jsonLdEl = document.createElement('script');
    jsonLdEl.id = 'bits-of-bombay-schema';
    jsonLdEl.type = 'application/ld+json';
    document.head.appendChild(jsonLdEl);
  }

  const jsonLdGraph: any[] = [
    {
      '@type': 'WebSite',
      '@id': `${BASE_SITE_URL}/#website`,
      url: BASE_SITE_URL,
      name: 'Bits of Bombay',
      description: 'Stories, Streets & Experiences from the City of Dreams.',
      publisher: {
        '@type': 'Organization',
        name: 'Bits of Bombay',
        url: BASE_SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_SITE_URL}/hero_marine_drive.webp`,
        },
      },
    },
  ];

  // Breadcrumbs Schema
  if (config.breadcrumbs && config.breadcrumbs.length > 0) {
    jsonLdGraph.push({
      '@type': 'BreadcrumbList',
      itemListElement: config.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url.startsWith('http') ? crumb.url : `${BASE_SITE_URL}${crumb.url}`,
      })),
    });
  }

  // Article & FAQ Schema
  if (config.article) {
    const article = config.article;
    const articleSchema: any = {
      '@type': 'BlogPosting',
      '@id': `${fullCanonicalUrl}/#article`,
      mainEntityOfPage: fullCanonicalUrl,
      headline: article.seoTitle || article.title,
      description: article.metaDescription || article.shortIntro,
      image: article.heroImage.startsWith('http') ? article.heroImage : `${BASE_SITE_URL}${article.heroImage}`,
      datePublished: '2026-10-01T08:00:00+05:30',
      dateModified: '2026-10-07T12:00:00+05:30',
      author: {
        '@type': 'Person',
        name: article.author.name,
        jobTitle: article.author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Bits of Bombay',
        url: BASE_SITE_URL,
      },
      articleSection: article.category,
      keywords: [article.mainKeyword, ...(article.relatedKeywords || []), ...article.tags].filter(Boolean).join(', '),
    };
    jsonLdGraph.push(articleSchema);

    // If AEO optimized, add FAQPage schema for Answer Engine citation
    if (article.isAEOOptimized && article.aeoFaq && article.aeoFaq.length > 0) {
      jsonLdGraph.push({
        '@type': 'FAQPage',
        mainEntity: article.aeoFaq.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.directAnswer,
          },
        })),
      });
    }
  }

  jsonLdEl.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': jsonLdGraph,
  });
}
