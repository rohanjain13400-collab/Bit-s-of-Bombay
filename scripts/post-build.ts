import fs from 'fs';
import path from 'path';

/**
 * Post-build static route generator for Bits of Bombay
 * Creates pre-rendered HTML entry points and metadata for all 18 canonical sitemap URLs:
 * - 8 static pages
 * - 10 editorial blog articles
 * - 404.html fallback
 *
 * This guarantees zero 404 errors on direct navigation and refresh,
 * even before SPA hydration or Vercel rewrites execute.
 */

const CANONICAL_DOMAIN = 'https://bit-s-of-bombay.vercel.app';

interface RouteMetadata {
  path: string;
  title: string;
  description: string;
}

const STATIC_ROUTES: RouteMetadata[] = [
  {
    path: '',
    title: 'Bits of Bombay | Stories, Streets & City of Dreams Guide',
    description: 'Explore Bits of Bombay, the premier travel & lifestyle digital magazine featuring curated cafe reviews, street food guides, heritage spots, and city stories.',
  },
  {
    path: 'blogs',
    title: 'Mumbai Blog Articles & Guides | Bits of Bombay Magazine',
    description: 'Read authentic Mumbai blog articles covering heritage walks, top local eateries, scenic promenades, travel itineraries, and insider tips from local editors.',
  },
  {
    path: 'places',
    title: 'Places to Visit in Mumbai: Heritage, Skylines & Sea',
    description: 'Discover iconic places to visit in Mumbai, from the majestic Gateway of India and Art Deco Marine Drive to secret stepwells and hidden historical enclaves.',
  },
  {
    path: 'food',
    title: 'Mumbai Food Guide: Iconic Street Food & Artisanal Cafes',
    description: 'Explore the definitive Mumbai food guide featuring buttery pav bhaji, sizzling vada pav trails, coastal seafood feasts, and curated specialty coffee spots.',
  },
  {
    path: 'travel',
    title: 'Mumbai Travel Guide: One-Day Itineraries & City Commutes',
    description: 'Plan your trip with our Mumbai travel guide. Get practical 24-hour itineraries, local train survival guides, and scenic weekend escapes across Maharashtra.',
  },
  {
    path: 'experiences',
    title: 'Mumbai City Experiences: Monsoons, Nightlife & Walks',
    description: 'Immerse yourself in authentic Mumbai city experiences: monsoon coastal strolls, midnight street food runs, local train rides, and cultural walking tours.',
  },
  {
    path: 'about',
    title: 'About Bits of Bombay: Stories, Streets & Cultural Soul',
    description: 'Learn about Bits of Bombay, a digital travel and lifestyle publication born to chronicle Bombay’s vibrant streets, heritage architecture, and cafe culture.',
  },
  {
    path: 'contact',
    title: 'Contact Bits of Bombay: Editorial Desk & Collaborations',
    description: 'Get in touch with the Bits of Bombay editorial desk. Share untold Mumbai street stories, recommend hidden cafes, or submit press inquiries and feedback.',
  },
];

const BLOG_ARTICLES: RouteMetadata[] = [
  {
    path: 'blogs/mumbai-in-24-hours',
    title: 'Mumbai in 24 Hours: The Ultimate One-Day City Itinerary',
    description: 'Explore Mumbai in 24 hours with our complete one day in Mumbai itinerary. Experience South Mumbai day tour highlights, Irani cafes, Marine Drive and Bandra.',
  },
  {
    path: 'blogs/mumbai-street-food-trail',
    title: 'Best Street Food in Mumbai: The Ultimate Local Food Trail Guide',
    description: 'Discover the best street food in Mumbai with our curated guide. Explore iconic spots for vada pav in Mumbai, buttery pav bhaji, chaat and legendary kebabs.',
  },
  {
    path: 'blogs/marine-drive-sunset',
    title: 'Marine Drive Mumbai Sunset: The Queen’s Necklace Golden Hour Guide',
    description: 'Experience the magic of a Marine Drive Mumbai sunset. Guide to Queen’s Necklace Mumbai viewing spots, evening walks, chai vendors and sea-breeze rituals.',
  },
  {
    path: 'blogs/hidden-gems-mumbai',
    title: 'Hidden Places in Mumbai: Secret Enclaves & Heritage Spots',
    description: 'Uncover secret and offbeat hidden places in Mumbai. Explore secret spots in Mumbai including Khotachiwadi, Banganga Tank, and Portuguese colonial lanes.',
  },
  {
    path: 'blogs/mumbai-cafe-culture',
    title: 'Mumbai Cafe Culture: Best Cafes in Mumbai from Irani to Specialty',
    description: 'Explore Mumbai cafe culture with our curated guide to the best cafes in Mumbai. Discover vintage Irani cafes in South Bombay and artisanal roasteries in Bandra.',
  },
  {
    path: 'blogs/mumbai-local-train',
    title: 'Mumbai Local Train Survival Guide: How to Ride Mumbai Locals',
    description: 'Master the Mumbai local train with our comprehensive commuter guide. Tips on rush hours, fast vs slow locals, Churchgate and CSMT terminus navigation.',
  },
  {
    path: 'blogs/mumbai-after-dark',
    title: 'Mumbai After Dark: Midnight Walks, Nightlife & Street Food',
    description: 'Experience Mumbai nightlife and night walks. Discover midnight street food at Bademiya, seaside walks on Marine Drive, and vibrant Bandra late-night scenes.',
  },
  {
    path: 'blogs/mumbai-in-monsoon',
    title: 'Mumbai in Monsoon: Rainy Season Mumbai Guide & Coastal Magic',
    description: 'Experience the romance of Mumbai in monsoon. Best rainy season Mumbai viewpoints, steaming cutting chai, coastal promenades, and city survival tips.',
  },
  {
    path: 'blogs/weekend-escapes-mumbai',
    title: 'Weekend Getaways Near Mumbai: Road Trips & Hill Station Escapes',
    description: 'Plan refreshing weekend getaways near Mumbai. Top road trips from Mumbai to Lonavala, Alibaug beaches, Matheran forests, and scenic Western Ghats.',
  },
  {
    path: 'blogs/through-eyes-of-mumbaikar',
    title: 'Life in Mumbai: Living in Mumbai Through the Eyes of a Mumbaikar',
    description: 'Reflections on living in Mumbai: the spirit of Bombay, local train camaraderie, monsoon magic, cutting chai rituals, and what makes this city truly home.',
  },
];

function generateStaticHtmlForRoutes() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error(`[post-build] dist/index.html not found! Run 'vite build' first.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  // Copy dist/index.html to dist/404.html as universal static fallback
  fs.writeFileSync(path.join(distDir, '404.html'), baseHtml, 'utf-8');
  console.log(`[post-build] Created dist/404.html fallback`);

  const allRoutes = [...STATIC_ROUTES, ...BLOG_ARTICLES];

  for (const route of allRoutes) {
    if (!route.path) continue; // Root already exists as dist/index.html

    const canonicalUrl = `${CANONICAL_DOMAIN}/${route.path}`;
    let customizedHtml = baseHtml;

    // Replace Title
    customizedHtml = customizedHtml.replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${route.title}</title>`
    );

    // Replace or insert Meta Description
    if (customizedHtml.includes('name="description"')) {
      customizedHtml = customizedHtml.replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="description" content="${route.description}" />`
      );
    }

    // Replace or insert Canonical URL
    if (customizedHtml.includes('rel="canonical"')) {
      customizedHtml = customizedHtml.replace(
        /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
        `<link rel="canonical" href="${canonicalUrl}" />`
      );
    }

    // Replace Open Graph metadata
    customizedHtml = customizedHtml.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${route.title}" />`
    );
    customizedHtml = customizedHtml.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${route.description}" />`
    );
    customizedHtml = customizedHtml.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );

    // Write directory index: dist/{path}/index.html
    const targetDir = path.join(distDir, route.path);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(path.join(targetDir, 'index.html'), customizedHtml, 'utf-8');

    // Also write flat html file: dist/{path}.html (for hosts supporting cleanUrls)
    const flatHtmlPath = path.join(distDir, `${route.path}.html`);
    const flatParentDir = path.dirname(flatHtmlPath);
    if (!fs.existsSync(flatParentDir)) {
      fs.mkdirSync(flatParentDir, { recursive: true });
    }
    fs.writeFileSync(flatHtmlPath, customizedHtml, 'utf-8');
  }

  console.log(`[post-build] Generated static HTML pages for all ${allRoutes.length} canonical routes`);
}

generateStaticHtmlForRoutes();
