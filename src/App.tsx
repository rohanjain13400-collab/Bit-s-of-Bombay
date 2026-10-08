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

function parseRoute(pathname: string, articles: BlogArticle[]): {
  view: string;
  category: Category;
  article: BlogArticle | null;
} {
  const normalized = pathname.trim().replace(/\/+$/, '') || '/';

  if (normalized === '/' || normalized === '') {
    return { view: 'home', category: 'All', article: null };
  }
  if (normalized === '/blogs') {
    return { view: 'blogs', category: 'All', article: null };
  }
  if (normalized === '/places') {
    return { view: 'blogs', category: 'Places', article: null };
  }
  if (normalized === '/food') {
    return { view: 'blogs', category: 'Food', article: null };
  }
  if (normalized === '/travel') {
    return { view: 'blogs', category: 'Travel', article: null };
  }
  if (normalized === '/experiences') {
    return { view: 'blogs', category: 'Experiences', article: null };
  }
  if (normalized === '/about') {
    return { view: 'about', category: 'All', article: null };
  }
  if (normalized === '/contact') {
    return { view: 'contact', category: 'All', article: null };
  }
  if (normalized.startsWith('/blogs/')) {
    const slug = normalized.replace(/^\/blogs\//, '');
    const found = articles.find((a) => a.slug === slug);
    if (found) {
      return { view: 'article', category: found.category, article: found };
    }
  }

  return { view: 'home', category: 'All', article: null };
}

export default function App() {
  const initialRoute = parseRoute(
    typeof window !== 'undefined' ? window.location.pathname : '/',
    BLOGS
  );

  const [currentView, setCurrentView] = useState<string>(initialRoute.view);
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialRoute.category);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(initialRoute.article);
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

  // Synchronize browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseRoute(window.location.pathname, BLOGS);
      setCurrentView(parsed.view);
      setSelectedCategory(parsed.category);
      setSelectedArticle(parsed.article);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
    let targetPath = '/';

    if (view === 'category' && categoryFilter) {
      targetPath = `/${categoryFilter.toLowerCase().replace(/\s+/g, '-')}`;
      setSelectedCategory(categoryFilter);
      setCurrentView('blogs');
      setSelectedArticle(null);
    } else if (view === 'blogs') {
      targetPath = '/blogs';
      setSelectedCategory(categoryFilter || 'All');
      setCurrentView('blogs');
      setSelectedArticle(null);
    } else if (view === 'about') {
      targetPath = '/about';
      setCurrentView('about');
      setSelectedArticle(null);
    } else if (view === 'contact') {
      targetPath = '/contact';
      setCurrentView('contact');
      setSelectedArticle(null);
    } else {
      targetPath = '/';
      setCurrentView('home');
      setSelectedArticle(null);
    }

    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: BlogArticle) => {
    setSelectedArticle(article);
    setCurrentView('article');
    const targetPath = `/blogs/${article.slug}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromArticle = () => {
    setCurrentView('blogs');
    setSelectedArticle(null);
    if (window.location.pathname !== '/blogs') {
      window.history.pushState(null, '', '/blogs');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const savedArticlesList = BLOGS.filter((a) => savedArticleIds.includes(a.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E8] text-[#1C1C1C] font-sans selection:bg-[#8B1E2D]/20 selection:text-[#8B1E2D]">
      {/* Sticky Navigation Bar */}
      <Navbar
        currentView={currentView}
        selectedCategory={selectedCategory}
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
