import React, { useState, useEffect } from 'react';
import { Search, Bookmark, Menu, X, Compass, Instagram } from 'lucide-react';
import { Category } from '../types';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/cafes';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, categoryFilter?: Category) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenBookmarks,
  savedCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', view: 'home' },
    { label: 'Blogs', view: 'blogs' },
    { label: 'Places', view: 'category', category: 'Places' as Category },
    { label: 'Food', view: 'category', category: 'Food' as Category },
    { label: 'Travel', view: 'category', category: 'Travel' as Category },
    { label: 'Experiences', view: 'category', category: 'Experiences' as Category },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: string, category?: Category) => {
    onNavigate(view, category);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F0E8]/95 backdrop-blur-md shadow-sm border-b border-[#B08D57]/20 py-3.5'
          : 'bg-[#F5F0E8] border-b border-[#B08D57]/15 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-wider text-[#1C1C1C] group-hover:text-[#8B1E2D] transition-colors">
                BITS OF BOMBAY
              </span>
              <span className="w-2 h-2 rounded-full bg-[#8B1E2D] self-baseline mt-2"></span>
            </div>
            <p className="text-[10px] sm:text-[11px] tracking-widest text-[#B08D57] font-medium uppercase hidden sm:block">
              Stories, Streets & Experiences
            </p>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => {
              const isActive =
                currentView === item.view ||
                (currentView === 'category' && item.category && item.view === 'category');
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view, item.category)}
                  className={`text-sm tracking-wide transition-all cursor-pointer relative py-1 focus:outline-none ${
                    isActive
                      ? 'text-[#8B1E2D] font-semibold'
                      : 'text-[#1C1C1C] hover:text-[#8B1E2D] font-medium'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B1E2D] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Search, Bookmarks, Mobile Menu */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#B08D57]/30 hover:border-[#8B1E2D] bg-[#FAF7F2] text-[#1C1C1C] hover:text-[#8B1E2D] text-xs font-medium transition-all cursor-pointer shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20"
              title="Search articles (Ctrl+K)"
              aria-label="Search articles"
            >
              <Search className="w-4 h-4 text-[#B08D57]" />
              <span className="hidden md:inline text-xs text-[#5A5751]">Search...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#EAE3D5] text-[#5A5751] rounded">
                ⌘K
              </kbd>
            </button>

            {/* Instagram Profile */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-[#B08D57]/20 hover:border-[#8B1E2D] hover:bg-[#FAF7F2] text-[#1C1C1C] hover:text-[#8B1E2D] transition-colors cursor-pointer focus:outline-none"
              title={`Visit ${INSTAGRAM_HANDLE} on Instagram`}
              aria-label="Instagram profile"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Saved Bookmarks */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2 rounded-full border border-[#B08D57]/20 hover:border-[#8B1E2D] hover:bg-[#FAF7F2] text-[#1C1C1C] hover:text-[#8B1E2D] transition-colors cursor-pointer focus:outline-none"
              title="Saved Reading List"
              aria-label="Saved reading list"
            >
              <Bookmark className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8B1E2D] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md border border-[#B08D57]/30 text-[#1C1C1C] hover:text-[#8B1E2D] hover:bg-[#FAF7F2] transition-colors cursor-pointer focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#F5F0E8] border-b border-[#B08D57]/20 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view, item.category)}
                className="text-left py-2.5 px-3 rounded-md text-base font-medium text-[#1C1C1C] hover:text-[#8B1E2D] hover:bg-[#FAF7F2] transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>{item.label}</span>
                <Compass className="w-4 h-4 text-[#B08D57]/60" />
              </button>
            ))}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-md text-base font-medium text-[#8B1E2D] hover:bg-[#FAF7F2] transition-colors flex items-center justify-between"
            >
              <span>Instagram {INSTAGRAM_HANDLE}</span>
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-4 pt-4 border-t border-[#B08D57]/20 flex items-center justify-between text-xs text-[#5A5751]">
            <span>Stories, Streets & Experiences</span>
            <span className="text-[#8B1E2D] font-serif font-bold">Bits of Bombay</span>
          </div>
        </div>
      )}
    </header>
  );
};
