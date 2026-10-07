import React from 'react';
import { Instagram, Twitter, Compass, MapPin, Mail, ArrowUp } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  onNavigate: (view: string, categoryFilter?: Category) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Blogs', view: 'blogs' },
    { label: 'Places', view: 'category', category: 'Places' as Category },
    { label: 'Food', view: 'category', category: 'Food' as Category },
    { label: 'Travel', view: 'category', category: 'Travel' as Category },
    { label: 'Experiences', view: 'category', category: 'Experiences' as Category },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  return (
    <footer className="bg-[#1C1C1C] text-[#F5F0E8] border-t border-[#B08D57]/30 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#F5F0E8]/10">
          {/* Main Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-3xl font-extrabold tracking-wider text-white">
                MUMBAI DIARIES
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E2D]"></span>
            </div>
            <p className="font-serif italic text-lg text-[#B08D57]">
              “Stories, Streets & Experiences from the City of Dreams.”
            </p>
            <p className="text-sm text-[#F5F0E8]/70 leading-relaxed max-w-md pt-1">
              A curated digital travel and lifestyle magazine celebrating the pulse, culinary heritage, timeless promenades, and everyday magic of Mumbai.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-3">
              <a
                href="#social"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-[#FAF7F2]/10 hover:bg-[#8B1E2D] flex items-center justify-center text-[#F5F0E8] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#social"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-[#FAF7F2]/10 hover:bg-[#8B1E2D] flex items-center justify-center text-[#F5F0E8] transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#social"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-[#FAF7F2]/10 hover:bg-[#8B1E2D] flex items-center justify-center text-[#F5F0E8] transition-colors"
                aria-label="Explore Map"
              >
                <Compass className="w-4 h-4" />
              </a>
              <a
                href="#social"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-[#FAF7F2]/10 hover:bg-[#8B1E2D] flex items-center justify-center text-[#F5F0E8] transition-colors"
                aria-label="Newsletter"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold">
              Editorial Index
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.view, link.category)}
                    className="text-[#F5F0E8]/80 hover:text-white hover:translate-x-1 transition-all cursor-pointer inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Secondary Links & Sections */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold">
              Exploration & About
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.slice(4).map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.view, link.category)}
                    className="text-[#F5F0E8]/80 hover:text-white hover:translate-x-1 transition-all cursor-pointer inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#F5F0E8]/60">
              <MapPin className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>Curated in South Bombay & Bandra, Mumbai</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F5F0E8]/60 gap-4">
          <p>© 2026 Mumbai Diaries. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span>A College Digital Travel Magazine Project</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#B08D57] hover:text-white transition-colors cursor-pointer group"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
