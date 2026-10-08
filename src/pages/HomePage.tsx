import React, { useRef } from 'react';
import { ArrowDown, Compass, BookOpen, Mail, Instagram, ExternalLink, Coffee } from 'lucide-react';
import { BlogArticle, Category } from '../types';
import { heroImage } from '../data/blogs';
import { FeaturedStories } from '../components/FeaturedStories';
import { CategorySection } from '../components/CategorySection';
import { BlogCard } from '../components/BlogCard';
import { CafeRatingsSection } from '../components/CafeRatingsSection';
import { NewsletterCta } from '../components/NewsletterCta';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, CONTACT_EMAIL } from '../data/cafes';

interface HomePageProps {
  articles: BlogArticle[];
  onSelectArticle: (article: BlogArticle) => void;
  onNavigateToCategory: (category: Category) => void;
  savedArticleIds: string[];
  onToggleBookmark: (articleId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  articles,
  onSelectArticle,
  onNavigateToCategory,
  savedArticleIds,
  onToggleBookmark,
}) => {
  const latestStoriesRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const cafesRef = useRef<HTMLDivElement>(null);

  const scrollToLatest = () => {
    latestStoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCafes = () => {
    cafesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const featuredArticles = articles.filter((a) => a.isFeatured).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#1C1C1C]">
        {/* Full-bleed background hero image with editorial grading */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Marine Drive golden hour skyline and Queen's Necklace promenade"
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] scale-102 transform duration-1000"
          />
          {/* Subtle gradient overlays for text legibility and cinematic mood */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C]/50 via-transparent to-[#1C1C1C]/30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Magazine Kicker with Instagram handle link */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#B08D57]/50 bg-[#1C1C1C]/70 backdrop-blur-md text-[#F5F0E8] hover:border-[#8B1E2D] transition-all group"
          >
            <span className="w-2 h-2 rounded-full bg-[#8B1E2D] animate-pulse"></span>
            <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium">
              Digital Travel & Lifestyle Magazine
            </span>
            <span className="text-[#B08D57] font-semibold flex items-center gap-1 text-[11px] ml-1">
              · {INSTAGRAM_HANDLE}
              <Instagram className="w-3.5 h-3.5 group-hover:text-white transition-colors" />
            </span>
          </a>

          {/* Main Hero Title */}
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white mb-6 drop-shadow-md">
            BITS OF BOMBAY
          </h1>

          {/* Tagline */}
          <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#F5F0E8] max-w-3xl mx-auto mb-10 leading-relaxed font-light drop-shadow">
            “Stories, Streets & Experiences from the City of Dreams.”
          </p>

          {/* Subtext description */}
          <p className="font-sans text-xs sm:text-sm text-[#F5F0E8]/80 max-w-xl mx-auto mb-10 leading-relaxed hidden sm:block">
            Exploring Bombay through its artisanal cafes, street culinary trails, sea-sprayed promenades, heritage lanes, nocturnal rhythms, and everyday stories.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 flex-wrap">
            <button
              onClick={scrollToCategories}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#8B1E2D] hover:bg-[#731824] text-white font-semibold text-xs uppercase tracking-widest rounded-md transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2 group"
            >
              <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              <span>Explore Bombay</span>
            </button>

            <button
              onClick={scrollToCafes}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#B08D57] hover:bg-[#977645] text-white font-semibold text-xs uppercase tracking-widest rounded-md transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <Coffee className="w-4 h-4" />
              <span>Café Ratings & Guide</span>
            </button>

            <button
              onClick={scrollToLatest}
              className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-[#F5F0E8] hover:text-white border border-[#B08D57]/50 font-semibold text-xs uppercase tracking-widest rounded-md backdrop-blur-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#B08D57]" />
              <span>Read Latest Stories</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToLatest}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-[#F5F0E8]/70 hover:text-white transition-colors cursor-pointer flex flex-col items-center gap-1.5 z-10"
          aria-label="Scroll to stories"
        >
          <span className="text-[10px] uppercase tracking-widest font-mono">Scroll Down</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#B08D57]" />
        </button>
      </section>

      {/* 2. FEATURED STORIES SECTION */}
      <FeaturedStories
        articles={featuredArticles}
        onSelect={onSelectArticle}
      />

      {/* 3. EXPLORE BY CATEGORY SECTION */}
      <div ref={categoriesRef}>
        <CategorySection
          articles={articles}
          onSelectCategory={onNavigateToCategory}
        />
      </div>

      {/* 4. DEDICATED BOMBAY CAFE RATINGS SECTION (With Instagram Channel & Star Ratings) */}
      <div ref={cafesRef}>
        <CafeRatingsSection />
      </div>

      {/* 5. LATEST STORIES SECTION (All 10 blogs in a responsive 3-col / 2-col / 1-col grid) */}
      <section ref={latestStoriesRef} className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#B08D57]/30 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B08D57] font-bold block mb-1">
              Complete Editorial Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1C1C]">
              LATEST STORIES
            </h2>
          </div>
          <p className="text-sm text-[#5A5751] max-w-md font-sans">
            All 10 chronicles across travel, food trails, hidden architecture, monsoon showers, and suburban railway folklore.
          </p>
        </div>

        {/* Responsive Grid: Desktop: 3-column, Tablet: 2-column, Mobile: 1-column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <BlogCard
              key={article.id}
              article={article}
              onSelect={onSelectArticle}
              isBookmarked={savedArticleIds.includes(article.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      </section>

      {/* Atmospheric Editorial Quote Interstitial */}
      <section className="py-16 bg-[#1C1C1C] text-[#F5F0E8] relative overflow-hidden my-12 border-y border-[#B08D57]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-4xl text-[#B08D57] font-serif block mb-2">“</span>
          <blockquote className="font-serif italic text-xl sm:text-2xl md:text-3xl text-white leading-relaxed mb-6">
            “Bombay is not just a place to visit. It is a story to experience. You do not just live in Bombay; Bombay starts living inside you.”
          </blockquote>
          <cite className="text-xs uppercase tracking-widest text-[#B08D57] font-sans font-semibold not-italic">
            — The Bits of Bombay Manifesto
          </cite>
        </div>
      </section>

      {/* 6. BOTTOM OF LAUNCH PAGE: DIRECT CONTACT & INSTAGRAM CONNECT BAR */}
      <section className="py-12 bg-white border-t border-b border-[#B08D57]/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-10 rounded-2xl bg-[#FAF7F2] border border-[#B08D57]/30 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E2D]">
                <Mail className="w-4 h-4" />
                <span>Direct Editorial Reach</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1C1C1C]">
                Connect with Bits of Bombay
              </h3>
              <p className="text-sm text-[#5A5751] max-w-lg leading-relaxed font-sans">
                For cafe collaborations, street food recommendations, press inquiries, or stories, reach out directly to our editorial inbox:
              </p>
              <div className="pt-2">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 text-base sm:text-lg font-serif font-bold text-[#8B1E2D] hover:text-[#731824] underline decoration-[#B08D57] decoration-2 underline-offset-4"
                >
                  <Mail className="w-4 h-4 text-[#B08D57]" />
                  <span>{CONTACT_EMAIL}</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[#8B1E2D] to-[#B08D57] hover:opacity-95 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                <span>Visit {INSTAGRAM_HANDLE}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#F5F0E8] text-[#1C1C1C] border border-[#B08D57]/40 font-semibold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#8B1E2D]" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER / DISCOVER CTA */}
      <NewsletterCta />
    </div>
  );
};
