import React, { useRef } from 'react';
import { ArrowDown, Compass, BookOpen } from 'lucide-react';
import { BlogArticle, Category } from '../types';
import { heroImage } from '../data/blogs';
import { FeaturedStories } from '../components/FeaturedStories';
import { CategorySection } from '../components/CategorySection';
import { BlogCard } from '../components/BlogCard';
import { NewsletterCta } from '../components/NewsletterCta';

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

  const scrollToLatest = () => {
    latestStoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const featuredArticles = articles.filter((a) => a.isFeatured).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1C1C1C]">
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
          {/* Magazine Kicker */}
          <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1 rounded-full border border-[#B08D57]/40 bg-[#1C1C1C]/60 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#8B1E2D] animate-pulse"></span>
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#F5F0E8] font-medium">
              Digital Travel & Lifestyle Publication
            </span>
          </div>

          {/* Main Hero Title */}
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white mb-6 drop-shadow-md">
            MUMBAI DIARIES
          </h1>

          {/* Tagline */}
          <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#F5F0E8] max-w-3xl mx-auto mb-10 leading-relaxed font-light drop-shadow">
            “Stories, Streets & Experiences from the City of Dreams.”
          </p>

          {/* Subtext description */}
          <p className="font-sans text-xs sm:text-sm text-[#F5F0E8]/80 max-w-xl mx-auto mb-10 leading-relaxed hidden sm:block">
            Exploring Bombay through its street culinary trails, sea-sprayed promenades, heritage lanes, nocturnal rhythms, and everyday stories.
          </p>

          {/* Two Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={scrollToCategories}
              className="w-full sm:w-auto px-8 py-4 bg-[#8B1E2D] hover:bg-[#731824] text-white font-semibold text-xs uppercase tracking-widest rounded-md transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2.5 group"
            >
              <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              <span>Explore Mumbai</span>
            </button>

            <button
              onClick={scrollToLatest}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-[#F5F0E8] hover:text-white border border-[#B08D57]/50 font-semibold text-xs uppercase tracking-widest rounded-md backdrop-blur-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5"
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

      {/* 4. LATEST STORIES SECTION (All 10 blogs in a responsive 3-col / 2-col / 1-col grid) */}
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
            “Mumbai is not just a place to visit. It is a story to experience. You do not just live in Mumbai; Mumbai starts living inside you.”
          </blockquote>
          <cite className="text-xs uppercase tracking-widest text-[#B08D57] font-sans font-semibold not-italic">
            — The Mumbai Diaries Manifesto
          </cite>
        </div>
      </section>

      {/* 5. NEWSLETTER / DISCOVER CTA */}
      <NewsletterCta />
    </div>
  );
};
