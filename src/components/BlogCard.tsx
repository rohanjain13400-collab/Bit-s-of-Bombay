import React from 'react';
import { Clock, Bookmark, ArrowRight } from 'lucide-react';
import { BlogArticle } from '../types';

interface BlogCardProps {
  article: BlogArticle;
  onSelect: (article: BlogArticle) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (articleId: string) => void;
  variant?: 'standard' | 'featured';
}

export const BlogCard: React.FC<BlogCardProps> = ({
  article,
  onSelect,
  isBookmarked = false,
  onToggleBookmark,
  variant = 'standard',
}) => {
  return (
    <article
      className={`group flex flex-col bg-white rounded-lg overflow-hidden border border-[#B08D57]/20 hover:border-[#8B1E2D]/40 transition-all duration-300 hover:shadow-lg ${
        variant === 'featured' ? 'h-full' : ''
      }`}
    >
      {/* Image Container with Zoom Effect */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#EAE3D5]">
        <img
          src={article.heroImage}
          alt={article.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Bookmark Action */}
        {onToggleBookmark && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(article.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-sm cursor-pointer ${
              isBookmarked
                ? 'bg-[#8B1E2D] text-white'
                : 'bg-white/80 hover:bg-white text-[#1C1C1C] hover:text-[#8B1E2D]'
            }`}
            title={isBookmarked ? 'Remove from saved' : 'Save for later'}
            aria-label="Bookmark story"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-6 sm:p-7 justify-between">
        <div className="space-y-3">
          {/* Metadata - Zero Pill Discipline: Clean unboxed text with typographic separator */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B08D57]">
            <span className="hover:text-[#8B1E2D] transition-colors">{article.category}</span>
            <span aria-hidden="true" className="text-[#B08D57]/60">·</span>
            <span className="flex items-center gap-1 text-[#5A5751] font-normal normal-case">
              <Clock className="w-3.5 h-3.5 inline text-[#B08D57]" />
              {article.readingTime}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(article)}
            className="font-serif text-xl sm:text-2xl font-bold text-[#1C1C1C] group-hover:text-[#8B1E2D] transition-colors cursor-pointer leading-snug line-clamp-2"
          >
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[#5A5751] leading-relaxed line-clamp-3 font-normal">
            {article.shortIntro}
          </p>
        </div>

        {/* Action Button: Read Story */}
        <div className="pt-6 mt-4 border-t border-[#B08D57]/15 flex items-center justify-between">
          <button
            onClick={() => onSelect(article)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#8B1E2D] hover:text-[#731824] transition-colors cursor-pointer group/btn"
          >
            <span>Read Story</span>
            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
          </button>

          <span className="text-[11px] text-[#5A5751]/80 font-serif italic">
            By {article.author.name}
          </span>
        </div>
      </div>
    </article>
  );
};
