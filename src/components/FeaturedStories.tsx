import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { BlogArticle } from '../types';

interface FeaturedStoriesProps {
  articles: BlogArticle[];
  onSelect: (article: BlogArticle) => void;
}

export const FeaturedStories: React.FC<FeaturedStoriesProps> = ({
  articles,
  onSelect,
}) => {
  if (articles.length === 0) return null;

  return (
    <section className="py-16 border-b border-[#B08D57]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#B08D57]/30 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B08D57] font-bold block mb-1">
              Curated Editor’s Picks
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1C1C1C]">
              FEATURED STORIES
            </h2>
          </div>
          <p className="text-sm text-[#5A5751] max-w-md italic font-serif">
            Essential long-reads capturing the historic architecture, culinary soul, and coastal pulse of the city.
          </p>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article, idx) => (
            <div
              key={article.id}
              onClick={() => onSelect(article)}
              className="group cursor-pointer flex flex-col bg-white rounded-lg overflow-hidden border border-[#B08D57]/25 hover:border-[#8B1E2D] transition-all duration-300 hover:shadow-xl"
            >
              {/* Image with subtle badge / overlay */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE3D5]">
                <img
                  src={article.heroImage}
                  alt={article.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 bg-[#1C1C1C]/80 backdrop-blur-md text-[#F5F0E8] text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold rounded">
                  Issue Spotlight #{idx + 1}
                </div>
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-3">
                  {/* Clean unboxed category + read time */}
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B08D57]">
                    <span>{article.category}</span>
                    <span aria-hidden="true" className="text-[#B08D57]/60">·</span>
                    <span className="flex items-center gap-1 text-[#5A5751] font-normal normal-case">
                      <Clock className="w-3.5 h-3.5 inline text-[#B08D57]" />
                      {article.readingTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#1C1C1C] group-hover:text-[#8B1E2D] transition-colors leading-tight">
                    <a
                      href={`/blogs/${article.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelect(article);
                      }}
                      className="hover:underline focus:outline-none"
                    >
                      {article.title}
                    </a>
                  </h3>

                  <p className="text-sm text-[#5A5751] leading-relaxed line-clamp-3">
                    {article.shortIntro}
                  </p>
                </div>

                {/* Read story button with descriptive anchor text */}
                <div className="pt-4 border-t border-[#B08D57]/15">
                  <a
                    href={`/blogs/${article.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelect(article);
                    }}
                    aria-label={`Explore full story: ${article.title}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#8B1E2D] group-hover:text-[#731824] transition-colors"
                  >
                    <span>Explore {article.category} Feature</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
