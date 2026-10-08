import { useState, useEffect } from 'react';
import { BLOGS } from './data/blogs';
import { BlogArticle, Category } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BlogsPage } from './pages/BlogsPage';
import { ArticlePage } from './pages/ArticlePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SearchModal } from './components/SearchModal';
import { SavedStoriesDrawer } from './components/SavedStoriesDrawer';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Bookmarks with local storage persistence
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bitsofbombay_saved') || localStorage.getItem('mumbai_diaries_saved');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bitsofbombay_saved', JSON.stringify(savedArticleIds));
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [savedArticleIds]);

  // Global search shortcut (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleBookmark = (articleId: string) => {
    setSavedArticleIds((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleClearAllBookmarks = () => {
    setSavedArticleIds([]);
  };

  const handleNavigate = (view: string, categoryFilter?: Category) => {
    if (view === 'category' && categoryFilter) {
      setSelectedCategory(categoryFilter);
      setCurrentView('blogs');
    } else {
      if (view === 'blogs') {
        setSelectedCategory(categoryFilter || 'All');
      }
      setCurrentView(view);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: BlogArticle) => {
    setSelectedArticle(article);
    setCurrentView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromArticle = () => {
    setCurrentView('blogs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const savedArticlesList = BLOGS.filter((a) => savedArticleIds.includes(a.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E8] text-[#1C1C1C] font-sans selection:bg-[#8B1E2D]/20 selection:text-[#8B1E2D]">
      {/* Sticky Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => setIsSavedDrawerOpen(true)}
        savedCount={savedArticleIds.length}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            articles={BLOGS}
            onSelectArticle={handleSelectArticle}
            onNavigateToCategory={(cat) => handleNavigate('category', cat)}
            savedArticleIds={savedArticleIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentView === 'blogs' && (
          <BlogsPage
            key={selectedCategory}
            articles={BLOGS}
            initialCategory={selectedCategory}
            onSelectArticle={handleSelectArticle}
            savedArticleIds={savedArticleIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentView === 'article' && selectedArticle && (
          <ArticlePage
            article={selectedArticle}
            allArticles={BLOGS}
            onBack={handleBackFromArticle}
            onSelectArticle={handleSelectArticle}
            isBookmarked={savedArticleIds.includes(selectedArticle.id)}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentView === 'about' && <AboutPage />}

        {currentView === 'contact' && <ContactPage />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Functional Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={BLOGS}
        onSelectArticle={handleSelectArticle}
      />

      {/* Saved Reading List Drawer */}
      <SavedStoriesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={handleSelectArticle}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={handleClearAllBookmarks}
      />
    </div>
  );
}
