import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, ArrowRight, CornerDownLeft } from 'lucide-react';
import { BlogArticle } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: BlogArticle[];
  onSelectArticle: (article: BlogArticle) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickPills = ['Food', 'Marine Drive', 'Travel', 'Monsoon', 'Local Train', 'Café', 'Heritage'];

  const filteredArticles = query.trim()
    ? articles.filter((article) => {
        const q = query.toLowerCase();
        const matchTitle = article.title.toLowerCase().includes(q);
        const matchCategory = article.category.toLowerCase().includes(q);
        const matchIntro = article.shortIntro.toLowerCase().includes(q);
        const matchTags = article.tags.some((t) => t.toLowerCase().includes(q));
        const matchSections = article.sections.some(
          (s) =>
            s.heading?.toLowerCase().includes(q) ||
            s.paragraphs.some((p) => p.toLowerCase().includes(q))
        );
        return matchTitle || matchCategory || matchIntro || matchTags || matchSections;
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C1C1C]/70 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 md:p-20">
      <div
        className="relative w-full max-w-2xl bg-[#F5F0E8] rounded-xl shadow-2xl border border-[#B08D57]/40 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#B08D57]/30 bg-[#FAF7F2]">
          <Search className="w-5 h-5 text-[#8B1E2D] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories, streets, food, trains, monsoons..."
            className="w-full bg-transparent border-0 px-3.5 text-base text-[#1C1C1C] placeholder-[#5A5751]/60 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#5A5751] hover:text-[#8B1E2D] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[11px] font-mono bg-[#EAE3D5] text-[#5A5751] rounded">
              ESC
            </kbd>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-5 py-3 border-b border-[#B08D57]/15 bg-[#F5F0E8] flex items-center gap-2 flex-wrap">
          <span className="text-[11px] uppercase tracking-wider text-[#B08D57] font-semibold mr-1">
            Try:
          </span>
          {quickPills.map((pill) => (
            <button
              key={pill}
              onClick={() => setQuery(pill)}
              className="px-2.5 py-1 text-xs rounded-full bg-white border border-[#B08D57]/30 text-[#1C1C1C] hover:border-[#8B1E2D] hover:text-[#8B1E2D] transition-colors cursor-pointer"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 divide-y divide-[#B08D57]/15">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-[#5A5751]">
              <p className="font-serif italic text-base text-[#1C1C1C]">
                “The whole city is an open book waiting for you to turn the page.”
              </p>
              <p className="text-xs text-[#5A5751] mt-1">
                Type keywords like “Marine Drive”, “Vada Pav”, “Monsoon”, or “Local Train”.
              </p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="py-12 text-center text-[#5A5751]">
              <p className="font-serif text-lg text-[#1C1C1C]">No stories found matching “{query}”</p>
              <p className="text-xs text-[#5A5751] mt-1">
                Try searching for broader keywords like Food, Travel, Places, or Culture.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#B08D57] pb-1">
                Found {filteredArticles.length} matching {filteredArticles.length === 1 ? 'story' : 'stories'}
              </div>
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="group flex gap-4 p-3 rounded-lg bg-white hover:bg-[#FAF7F2] border border-transparent hover:border-[#8B1E2D]/30 transition-all cursor-pointer items-center"
                >
                  <img
                    src={article.heroImage}
                    alt={article.imageAlt}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#B08D57] font-semibold">
                      <span>{article.category}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-normal normal-case text-[#5A5751]">
                        <Clock className="w-3 h-3 text-[#B08D57]" />
                        {article.readingTime}
                      </span>
                    </div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#1C1C1C] group-hover:text-[#8B1E2D] transition-colors truncate">
                      {article.title}
                    </h4>
                    <p className="text-xs text-[#5A5751] line-clamp-1 mt-0.5">
                      {article.shortIntro}
                    </p>
                  </div>
                  <CornerDownLeft className="w-4 h-4 text-[#B08D57] group-hover:text-[#8B1E2D] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-[#EAE3D5]/50 border-t border-[#B08D57]/20 flex items-center justify-between text-xs text-[#5A5751]">
          <span>Mumbai Diaries Instant Search</span>
          <button
            onClick={onClose}
            className="text-xs text-[#8B1E2D] font-semibold hover:underline cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
