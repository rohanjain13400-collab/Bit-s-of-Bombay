import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  Bookmark,
  Share2,
  Check,
  Compass,
  AlertCircle,
  Maximize2,
  X,
  Type,
} from 'lucide-react';
import { BlogArticle } from '../types';
import { NewsletterCta } from '../components/NewsletterCta';
import { BlogCard } from '../components/BlogCard';

interface ArticlePageProps {
  article: BlogArticle;
  allArticles: BlogArticle[];
  onBack: () => void;
  onSelectArticle: (article: BlogArticle) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  allArticles,
  onBack,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  // Calculate reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Find related articles
  const relatedArticles = allArticles.filter(
    (a) => article.relatedArticleSlugs.includes(a.slug) || (a.category === article.category && a.id !== article.id)
  ).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#1C1C1C]">
      {/* 1. Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#8B1E2D] z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Top Breadcrumb & Controls Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-4 flex items-center justify-between border-b border-[#B08D57]/20 text-xs">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[#8B1E2D] font-bold uppercase tracking-wider hover:text-[#731824] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Stories</span>
        </button>

        {/* Action Buttons: Font size, Share, Bookmark */}
        <div className="flex items-center gap-3">
          {/* Font Size Toggle */}
          <button
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
            className="p-1.5 rounded-full border border-[#B08D57]/30 hover:border-[#8B1E2D] bg-white text-[#1C1C1C] cursor-pointer flex items-center gap-1"
            title="Toggle larger reading font"
            aria-label="Toggle larger font size"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold">{fontSize === 'normal' ? 'A+' : 'A-'}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-1.5 rounded-full border border-[#B08D57]/30 hover:border-[#8B1E2D] bg-white text-[#1C1C1C] cursor-pointer flex items-center gap-1.5"
            title="Copy story link"
            aria-label="Share article"
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-[10px] text-green-600 font-bold">Copied</span>
              </>
            ) : (
              <Share2 className="w-3.5 h-3.5 text-[#5A5751]" />
            )}
          </button>

          {/* Bookmark */}
          <button
            onClick={() => onToggleBookmark(article.id)}
            className={`p-1.5 rounded-full border transition-all cursor-pointer ${
              isBookmarked
                ? 'bg-[#8B1E2D] border-[#8B1E2D] text-white'
                : 'bg-white border-[#B08D57]/30 hover:border-[#8B1E2D] text-[#1C1C1C]'
            }`}
            title={isBookmarked ? 'Saved to reading list' : 'Save for later'}
            aria-label="Bookmark article"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* 2. Large Hero Image with Click to Zoom */}
        <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg border border-[#B08D57]/30 bg-[#EAE3D5] group">
          <img
            src={article.heroImage}
            alt={article.imageAlt}
            className="w-full aspect-[16/9] object-cover object-center group-hover:scale-101 transition-transform duration-500 cursor-pointer"
            onClick={() => setIsImageModalOpen(true)}
          />
          <button
            onClick={() => setIsImageModalOpen(true)}
            className="absolute bottom-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm text-xs cursor-pointer flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity"
            title="Expand Image"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="text-[11px] font-sans">View Full Photo</span>
          </button>
        </div>

        {/* 3. Category (Zero-Pill discipline: unboxed text with gold accent) */}
        <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-widest font-bold text-[#8B1E2D]">
          <span>{article.category}</span>
          <span aria-hidden="true" className="text-[#B08D57]">·</span>
          <span className="text-[#B08D57] font-serif italic normal-case">Special Feature</span>
        </div>

        {/* 4. Large Blog Title */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1C1C1C] leading-tight mb-6">
          {article.title}
        </h1>

        {/* 5. Short Introduction */}
        <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#5A5751] leading-relaxed mb-6 border-l-4 border-[#8B1E2D] pl-4 sm:pl-6 py-1">
          {article.shortIntro}
        </p>

        {/* 6. Reading Time & Author Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-10 border-t border-b border-[#B08D57]/20 text-xs text-[#5A5751]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#8B1E2D] text-white flex items-center justify-center font-serif font-bold text-sm">
              {article.author.name[0]}
            </div>
            <div>
              <p className="font-bold text-[#1C1C1C]">{article.author.name}</p>
              <p className="text-[11px] text-[#5A5751]">{article.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[#5A5751]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>{article.readingTime}</span>
            </span>
            <span>·</span>
            <span>{article.publishedDate}</span>
          </div>
        </div>

        {/* 7. Main Article Content (65-75 characters per line on desktop) */}
        <div
          className={`mx-auto max-w-3xl space-y-8 font-sans ${
            fontSize === 'large' ? 'text-lg leading-relaxed' : 'text-base leading-relaxed'
          } text-[#1C1C1C]`}
        >
          {article.sections.map((section, idx) => (
            <div key={idx} className="space-y-5">
              {section.heading && (
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1C1C] pt-6 pb-2 border-b border-[#B08D57]/20">
                  {section.heading}
                </h2>
              )}

              {section.subHeading && (
                <h3 className="font-serif text-xl font-semibold text-[#8B1E2D]">
                  {section.subHeading}
                </h3>
              )}

              {/* Paragraphs */}
              {section.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className={`text-[#1C1C1C]/90 font-normal ${
                    idx === 0 && pIdx === 0 ? 'drop-cap' : ''
                  }`}
                >
                  {p}
                </p>
              ))}

              {/* Bullet Points */}
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="my-5 space-y-2 bg-white/70 p-5 rounded-lg border border-[#B08D57]/20">
                  {section.bulletPoints.map((item, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-sm text-[#1C1C1C]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E2D] mt-2 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Pull Quote */}
              {section.quote && (
                <blockquote className="my-8 p-6 bg-[#FAF7F2] border-l-4 border-[#B08D57] rounded-r-lg font-serif italic text-lg sm:text-xl text-[#1C1C1C] leading-relaxed shadow-2xs">
                  “{section.quote}”
                </blockquote>
              )}

              {/* Editorial Callout */}
              {section.callout && (
                <div className="my-6 p-5 bg-[#FAF7F2] rounded-lg border border-[#8B1E2D]/30 flex items-start gap-3">
                  <Compass className="w-5 h-5 text-[#8B1E2D] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#8B1E2D] mb-1">
                      {section.callout.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5A5751] leading-relaxed">
                      {section.callout.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Practical Information Box */}
          {article.practicalInfo && (
            <div className="my-10 p-6 sm:p-7 bg-white rounded-xl border-2 border-[#B08D57]/30 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-[#8B1E2D]" />
                <h3 className="font-serif text-xl font-bold text-[#1C1C1C]">
                  Practical Field Guide & Tips
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                {article.practicalInfo.bestTimeToVisit && (
                  <div>
                    <span className="font-bold text-[#8B1E2D] block uppercase text-[11px] tracking-wider mb-0.5">
                      Best Time to Visit:
                    </span>
                    <p className="text-[#5A5751]">{article.practicalInfo.bestTimeToVisit}</p>
                  </div>
                )}
                {article.practicalInfo.idealBudget && (
                  <div>
                    <span className="font-bold text-[#8B1E2D] block uppercase text-[11px] tracking-wider mb-0.5">
                      Estimated Budget:
                    </span>
                    <p className="text-[#5A5751]">{article.practicalInfo.idealBudget}</p>
                  </div>
                )}
                {article.practicalInfo.howToReach && (
                  <div>
                    <span className="font-bold text-[#8B1E2D] block uppercase text-[11px] tracking-wider mb-0.5">
                      How to Reach:
                    </span>
                    <p className="text-[#5A5751]">{article.practicalInfo.howToReach}</p>
                  </div>
                )}
                {article.practicalInfo.recommendedFor && (
                  <div>
                    <span className="font-bold text-[#8B1E2D] block uppercase text-[11px] tracking-wider mb-0.5">
                      Recommended For:
                    </span>
                    <p className="text-[#5A5751]">{article.practicalInfo.recommendedFor}</p>
                  </div>
                )}
              </div>
              {article.practicalInfo.localTip && (
                <div className="mt-4 pt-4 border-t border-[#B08D57]/20 text-xs text-[#1C1C1C]">
                  <span className="font-bold text-[#B08D57] uppercase tracking-wider block text-[11px] mb-1">
                    Insider Mumbaikar Advice:
                  </span>
                  <p className="italic font-serif text-sm text-[#5A5751]">
                    “{article.practicalInfo.localTip}”
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 8. Key Takeaways Section */}
          <div className="my-12 p-7 bg-[#FAF7F2] rounded-xl border border-[#B08D57]/40 shadow-xs">
            <h3 className="font-serif text-2xl font-bold text-[#1C1C1C] mb-4 pb-2 border-b border-[#B08D57]/20">
              Key Takeaways
            </h3>
            <ul className="space-y-3">
              {article.keyTakeaways.map((takeaway, tIdx) => (
                <li key={tIdx} className="flex items-start gap-3 text-sm text-[#1C1C1C]">
                  <span className="w-5 h-5 rounded-full bg-[#8B1E2D]/15 text-[#8B1E2D] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {tIdx + 1}
                  </span>
                  <span className="leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-[#B08D57]/20 flex items-center gap-2 flex-wrap">
            <span className="text-xs uppercase tracking-wider text-[#B08D57] font-semibold">
              Filed under:
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[#5A5751] hover:text-[#8B1E2D] transition-colors cursor-default"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* 9. Related Stories Section */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-[#FAF7F2] border-t border-b border-[#B08D57]/25">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#B08D57]/30 gap-3">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B08D57] font-bold block mb-1">
                  Continue Reading
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1C1C1C]">
                  Related Stories
                </h2>
              </div>
              <button
                onClick={onBack}
                className="text-xs font-bold uppercase tracking-wider text-[#8B1E2D] hover:underline cursor-pointer"
              >
                View all stories
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((relArticle) => (
                <BlogCard
                  key={relArticle.id}
                  article={relArticle}
                  onSelect={onSelectArticle}
                  isBookmarked={false}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. Newsletter CTA */}
      <NewsletterCta />

      {/* Image Lightbox Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-[#B08D57] p-2 cursor-pointer"
              aria-label="Close photo view"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={article.heroImage}
              alt={article.imageAlt}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <p className="text-white/80 text-xs text-center mt-3 font-serif italic">
              {article.imageAlt} — Bits of Bombay Photography
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
