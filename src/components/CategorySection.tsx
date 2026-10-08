import React from 'react';
import { MapPin, Utensils, Compass, Building2, Sparkles, HeartHandshake, ArrowRight } from 'lucide-react';
import { Category, BlogArticle } from '../types';

interface CategorySectionProps {
  onSelectCategory: (category: Category) => void;
  articles: BlogArticle[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
  articles,
}) => {
  const categories: {
    name: Category;
    label: string;
    description: string;
    icon: React.ElementType;
    bgAccent: string;
  }[] = [
    {
      name: 'Places',
      label: 'Places',
      description: 'Hidden stepwells, Queen’s Necklace, Art Deco promenades, and sleepy heritage hamlets.',
      icon: MapPin,
      bgAccent: 'from-[#8B1E2D]/90 to-[#1C1C1C]/90',
    },
    {
      name: 'Food',
      label: 'Food',
      description: 'Sizzling tawas, golden vada pavs, roadside cutting chai, and Irani bakery legacies.',
      icon: Utensils,
      bgAccent: 'from-[#B08D57]/90 to-[#1C1C1C]/90',
    },
    {
      name: 'Travel',
      label: 'Travel',
      description: '24-hour city itineraries, Sahyadri mountain retreats, and seaside Konkan escapes.',
      icon: Compass,
      bgAccent: 'from-[#8B1E2D]/80 to-[#1C1C1C]/90',
    },
    {
      name: 'City Life',
      label: 'City Life',
      description: 'Inside the 7-million-passenger suburban rail and the midnight streets that never sleep.',
      icon: Building2,
      bgAccent: 'from-[#1C1C1C]/95 to-[#5A5751]/95',
    },
    {
      name: 'Culture',
      label: 'Culture',
      description: 'The philosophy of "adjusting", multilingual streets, and the fierce pride of Mumbaikars.',
      icon: HeartHandshake,
      bgAccent: 'from-[#B08D57]/80 to-[#8B1E2D]/90',
    },
    {
      name: 'Experiences',
      label: 'Experiences',
      description: 'Torrential monsoons, steaming kanda bhajjis, and high tide waves over coastal stone.',
      icon: Sparkles,
      bgAccent: 'from-[#1C1C1C]/90 to-[#8B1E2D]/90',
    },
  ];

  return (
    <section className="py-20 bg-[#FAF7F2] border-b border-[#B08D57]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#B08D57]/30 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8B1E2D] font-bold block mb-1">
              Curated City Disciplines
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1C1C1C]">
              EXPLORE MUMBAI
            </h2>
          </div>
          <p className="text-sm text-[#5A5751] max-w-md font-sans">
            Choose your lens—from street gastronomy and historic promenades to nocturnal subcultures and monsoon downpours.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const count = articles.filter(
              (a) => a.category === cat.name || (cat.name === 'Experiences' && a.category === 'Experiences')
            ).length;

            return (
              <div
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className="group relative cursor-pointer bg-white rounded-lg p-7 border border-[#B08D57]/20 hover:border-[#8B1E2D] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#F5F0E8] border border-[#B08D57]/30 flex items-center justify-center text-[#8B1E2D] group-hover:bg-[#8B1E2D] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-[#B08D57] font-semibold tracking-wider uppercase">
                      {count} {count === 1 ? 'Article' : 'Articles'}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#1C1C1C] group-hover:text-[#8B1E2D] transition-colors mb-2">
                    {cat.label}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5A5751] leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#B08D57]/15">
                  <a
                    href={`/${cat.label.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectCategory(cat.name);
                    }}
                    className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#8B1E2D] hover:text-[#731824] transition-colors"
                  >
                    <span>Browse {cat.label} Stories</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
