import fs from 'fs';
import path from 'path';

/**
 * Sitemap & Robots generator for Bits of Bombay
 * Canonical production domain: https://bit-s-of-bombay.vercel.app/
 */
export const CANONICAL_DOMAIN = 'https://bit-s-of-bombay.vercel.app';

export interface SitemapEntry {
  path: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export const STATIC_PAGES: SitemapEntry[] = [
  { path: '', changefreq: 'daily', priority: '1.0' },
  { path: 'blogs', changefreq: 'daily', priority: '0.9' },
  { path: 'places', changefreq: 'weekly', priority: '0.8' },
  { path: 'food', changefreq: 'weekly', priority: '0.8' },
  { path: 'travel', changefreq: 'weekly', priority: '0.8' },
  { path: 'experiences', changefreq: 'weekly', priority: '0.8' },
  { path: 'about', changefreq: 'monthly', priority: '0.7' },
  { path: 'contact', changefreq: 'monthly', priority: '0.7' },
];

export const BLOG_SLUGS: string[] = [
  'mumbai-in-24-hours',
  'mumbai-street-food-trail',
  'marine-drive-sunset',
  'hidden-gems-mumbai',
  'mumbai-cafe-culture',
  'mumbai-local-train',
  'mumbai-after-dark',
  'mumbai-in-monsoon',
  'weekend-escapes-mumbai',
  'through-eyes-of-mumbaikar',
];

export function buildSitemapXml(): string {
  const today = new Date().toISOString().split('T')[0];

  const staticUrlsXml = STATIC_PAGES.map((page) => {
    const loc = page.path ? `${CANONICAL_DOMAIN}/${page.path}` : `${CANONICAL_DOMAIN}/`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }).join('\n');

  const articleUrlsXml = BLOG_SLUGS.map((slug) => {
    const loc = `${CANONICAL_DOMAIN}/blogs/${slug}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Static Pages -->
${staticUrlsXml}

  <!-- 10 Curated Editorial Articles -->
${articleUrlsXml}
</urlset>
`;
}

export function buildRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${CANONICAL_DOMAIN}/sitemap.xml
`;
}

export function generateSitemapAndRobots() {
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapXml = buildSitemapXml();
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');

  const robotsTxt = buildRobotsTxt();
  const robotsPath = path.join(publicDir, 'robots.txt');
  fs.writeFileSync(robotsPath, robotsTxt, 'utf-8');

  console.log(`[generate-sitemap] Successfully wrote ${STATIC_PAGES.length + BLOG_SLUGS.length} URLs to ${sitemapPath}`);
  console.log(`[generate-sitemap] Successfully updated ${robotsPath} with canonical sitemap URL`);
}

generateSitemapAndRobots();
