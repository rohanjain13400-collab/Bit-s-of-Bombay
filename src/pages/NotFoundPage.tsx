import React, { useEffect } from 'react';
import { Compass, ArrowLeft, BookOpen, Home } from 'lucide-react';
import { BlogArticle } from '../types';
import { BlogCard } from '../components/BlogCard';
import { updatePageSEO, SITE_PAGES_SEO } from '../utils/seo';

interface NotFoundPageProps {
  onNavigate: (view: string) => void;
  onSelectArticle: (article: BlogArticle) => void;
  popularArticles: BlogArticle[];
  savedArticleIds?: string[];
  onToggleBookmark?: (articleId: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigate,
  onSelectArticle,
  popularArticles,
  savedArticleIds = [],
  onToggleBookmark,
}) => {
  useEffect(() => {
    updatePageSEO(SITE_PAGES_SEO.notFound);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-[80vh] bg-[#F5F0E8] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8B1E2D]/10 text-[#8B1E2D] rounded-full text-xs font-bold uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5" />
          <span>404 Error · Lost in the City</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1C1C1C] tracking-tight">
          Story Not Found
        </h1>

        <p className="max-w-xl mx-auto text-[#5A5751] text-base sm:text-lg leading-relaxed font-sans">
          The article or page you are looking for may have been moved, renamed, or is currently unavailable.
          Explore our curated Mumbai guides and editorial archives below.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('blogs')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B1E2D] hover:bg-[#731824] text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse All Stories</span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#FAF7F2] text-[#1C1C1C] border border-[#B08D57]/30 font-bold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4 text-[#B08D57]" />
            <span>Return to Homepage</span>
          </button>
        </div>
      </div>

      {/* Suggested Featured Articles */}
      {popularArticles && popularArticles.length > 0 && (
        <div className="max-w-7xl mx-auto mt-20 pt-12 border-t border-[#B08D57]/20">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#B08D57] font-bold block mb-1">
              Curated Recommendations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1C1C1C]">
              Stories You Might Enjoy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularArticles.slice(0, 3).map((article) => (
              <BlogCard
                key={article.id}
                article={article}
                onSelect={onSelectArticle}
                isBookmarked={savedArticleIds.includes(article.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
