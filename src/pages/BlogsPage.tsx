import React, { useState } from 'react';
import { Search, SlidersHorizontal, BookOpen, Coffee, Instagram } from 'lucide-react';
import { BlogArticle, Category } from '../types';
import { BlogCard } from '../components/BlogCard';
import { CafeRatingsSection } from '../components/CafeRatingsSection';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/cafes';

interface BlogsPageProps {
  articles: BlogArticle[];
  initialCategory?: Category;
  onSelectArticle: (article: BlogArticle) => void;
  savedArticleIds: string[];
  onToggleBookmark: (articleId: string) => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({
  articles,
  initialCategory = 'All',
  onSelectArticle,
  savedArticleIds,
  onToggleBookmark,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'readingTime'>('default');

  const categories: Category[] = [
    'All',
    'Travel',
    'Food',
    'Places',
    'City Life',
    'Lifestyle',
    'Experiences',
    'Culture',
  ];

  // Filtering
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory;
    const matchesQuery =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.shortIntro.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  // Sorting
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'readingTime') {
      const timeA = parseInt(a.readingTime) || 0;
      const timeB = parseInt(b.readingTime) || 0;
      return timeB - timeA;
    }
    return 0;
  });

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest text-[#B08D57] font-bold block mb-2">
          The Full Archive
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1C1C1C] mb-4">
          All Stories & Field Notes
        </h1>
        <p className="text-sm sm:text-base text-[#5A5751] font-sans leading-relaxed">
          Ten comprehensive essays capturing the aromas, railway corridors, monsoon skies, artisanal cafes, and human warmth of Bombay.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-10 space-y-4">
        {/* Category Tabs (Segmented interactive buttons, allowed by frontend-design skill) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#B08D57]/20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-md transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#8B1E2D] text-white shadow-xs'
                  : 'bg-white hover:bg-[#FAF7F2] text-[#1C1C1C] border border-[#B08D57]/30 hover:border-[#8B1E2D]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* In-page search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#B08D57] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword, place, or dish..."
              className="w-full pl-9 pr-4 py-2 rounded-md bg-white border border-[#B08D57]/30 text-xs text-[#1C1C1C] placeholder-[#5A5751]/60 focus:outline-none focus:ring-1 focus:ring-[#8B1E2D]"
            />
          </div>

          {/* Sort dropdown & Result Counter */}
          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 text-xs text-[#5A5751]">
            <span className="font-medium">
              Showing {sortedArticles.length} of {articles.length} stories
            </span>
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B08D57]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#B08D57]/30 rounded px-2.5 py-1 text-xs text-[#1C1C1C] focus:outline-none cursor-pointer"
              >
                <option value="default">Original Order</option>
                <option value="readingTime">Longest Read First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Articles */}
      {sortedArticles.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-[#B08D57]/20 p-8">
          <BookOpen className="w-12 h-12 text-[#B08D57]/40 mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-[#1C1C1C]">No articles match your criteria</h3>
          <p className="text-xs text-[#5A5751] mt-1 max-w-sm mx-auto">
            Try adjusting your category filter or search query to browse other Mumbai stories.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-[#8B1E2D] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#731824] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedArticles.map((article) => (
            <BlogCard
              key={article.id}
              article={article}
              onSelect={onSelectArticle}
              isBookmarked={savedArticleIds.includes(article.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      )}

      {/* Embedded Cafe Ratings when exploring Lifestyle or All */}
      {(selectedCategory === 'Lifestyle' || selectedCategory === 'All') && (
        <div className="mt-20">
          <CafeRatingsSection />
        </div>
      )}
    </div>
  );
};
