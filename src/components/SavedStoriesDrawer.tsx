import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { BlogArticle } from '../types';

interface SavedStoriesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: BlogArticle[];
  onSelectArticle: (article: BlogArticle) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const SavedStoriesDrawer: React.FC<SavedStoriesDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#1C1C1C]/60 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-[#F5F0E8] h-full shadow-2xl flex flex-col border-l border-[#B08D57]/30 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#B08D57]/20 flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#8B1E2D]" />
            <h3 className="font-serif text-xl font-bold text-[#1C1C1C]">
              Saved Reading List
            </h3>
            <span className="text-xs bg-[#8B1E2D] text-white px-2 py-0.5 rounded-full font-bold">
              {savedArticles.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#5A5751] hover:text-[#8B1E2D] hover:bg-[#EAE3D5] cursor-pointer"
            aria-label="Close saved stories"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {savedArticles.length === 0 ? (
            <div className="text-center py-16 text-[#5A5751]">
              <Bookmark className="w-10 h-10 mx-auto text-[#B08D57]/50 mb-3" />
              <h4 className="font-serif text-lg text-[#1C1C1C]">No stories saved yet</h4>
              <p className="text-xs text-[#5A5751] mt-1 max-w-xs mx-auto">
                Click the bookmark icon on any story card to save articles for offline or leisurely reading later.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="group relative bg-white rounded-lg p-3.5 border border-[#B08D57]/20 hover:border-[#8B1E2D]/40 transition-all shadow-xs flex gap-3.5"
              >
                <img
                  src={article.heroImage}
                  alt={article.imageAlt}
                  className="w-20 h-20 rounded-md object-cover shrink-0 cursor-pointer"
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#B08D57] block">
                    {article.category} · {article.readingTime}
                  </span>
                  <h4
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="font-serif text-sm font-bold text-[#1C1C1C] group-hover:text-[#8B1E2D] transition-colors line-clamp-2 cursor-pointer mt-0.5"
                  >
                    {article.title}
                  </h4>
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      onClick={() => {
                        onSelectArticle(article);
                        onClose();
                      }}
                      className="text-[11px] font-bold text-[#8B1E2D] hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onRemoveBookmark(article.id)}
                      className="text-[11px] text-[#5A5751] hover:text-[#8B1E2D] cursor-pointer inline-flex items-center gap-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedArticles.length > 0 && (
          <div className="p-4 bg-[#FAF7F2] border-t border-[#B08D57]/20 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-[#5A5751] hover:text-[#8B1E2D] transition-colors cursor-pointer"
            >
              Clear all bookmarks
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#8B1E2D] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#731824] cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
