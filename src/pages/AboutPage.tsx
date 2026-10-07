import React from 'react';
import { Compass, BookOpen, Camera, Palette, Type, Sparkles, Heart } from 'lucide-react';
import { heroImage } from '../data/blogs';

export const AboutPage: React.FC = () => {
  const colorSwatches = [
    { name: 'Cream', hex: '#F5F0E8', role: 'Main background, warm editorial canvas', textDark: true },
    { name: 'Charcoal', hex: '#1C1C1C', role: 'Primary typography, strong contrast & depth', textDark: false },
    { name: 'Deep Red', hex: '#8B1E2D', role: 'Key call-to-action buttons, accents & drop caps', textDark: false },
    { name: 'Muted Gold', hex: '#B08D57', role: 'Subtle borders, dividers & luxury metallic details', textDark: false },
    { name: 'White', hex: '#FFFFFF', role: 'Article cards, clean surfaces & breathing room', textDark: true },
  ];

  const designKeywords = [
    'Mumbai',
    'Streets',
    'Stories',
    'Food',
    'Culture',
    'Travel',
    'People',
    'Experiences',
  ];

  return (
    <div className="py-12 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* 1. Main Editorial Intro */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#B08D57] font-bold block mb-3">
          About The Publication
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1C1C1C] leading-tight mb-8">
          More Than a City. It’s a Story.
        </h1>
        <div className="space-y-5 text-base sm:text-lg text-[#5A5751] leading-relaxed font-sans text-left sm:text-justify">
          <p>
            <strong className="text-[#1C1C1C]">Mumbai Diaries</strong> is a digital magazine celebrating Mumbai through its streets, food, people, places, and everyday experiences. Born as a rigorous college design and journalism publication project, it was conceived to transcend basic student blogs and deliver a real, authentic, premium digital travel publication.
          </p>
          <p>
            The website explores both the iconic and lesser-known sides of Mumbai, bringing together travel inspiration, food culture, city stories, and everyday moments. We do not look at Mumbai through a clinical tourist lens or generic itineraries. Instead, we chronicle the city as a living, breathing emotional tapestry.
          </p>
          <p>
            From the dawn clatter of Irani café saucers in South Bombay to midnight cutting chai beside the Queen’s Necklace, Mumbai is an unwritten contract of communal grace and relentless hope.
          </p>
        </div>
      </section>

      {/* Editorial Mission Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-[#B08D57]/20">
        <div className="bg-white p-8 rounded-xl border border-[#B08D57]/25 shadow-xs">
          <Compass className="w-8 h-8 text-[#8B1E2D] mb-4" />
          <h3 className="font-serif text-xl font-bold text-[#1C1C1C] mb-2">Authentic Urban Travel</h3>
          <p className="text-xs sm:text-sm text-[#5A5751] leading-relaxed">
            Real itineraries made for college students, young travelers, and wanderers who crave genuine street-level immersion.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl border border-[#B08D57]/25 shadow-xs">
          <Camera className="w-8 h-8 text-[#B08D57] mb-4" />
          <h3 className="font-serif text-xl font-bold text-[#1C1C1C] mb-2">Cinematic Photography</h3>
          <p className="text-xs sm:text-sm text-[#5A5751] leading-relaxed">
            Warm, film-grain-inspired editorial visuals capturing the rain-streaked roads, golden hour promenades, and bustling railway platforms.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl border border-[#B08D57]/25 shadow-xs">
          <Heart className="w-8 h-8 text-[#8B1E2D] mb-4" />
          <h3 className="font-serif text-xl font-bold text-[#1C1C1C] mb-2">Human Storytelling</h3>
          <p className="text-xs sm:text-sm text-[#5A5751] leading-relaxed">
            Honoring the commuters, chaiwalas, midnight workers, and everyday dreamers who keep Mumbai awake and moving forward.
          </p>
        </div>
      </section>

      {/* 2. THE VISUAL MOOD BOARD SECTION */}
      <section className="bg-white rounded-2xl p-8 sm:p-12 border-2 border-[#B08D57]/30 shadow-md space-y-12">
        <div className="border-b border-[#B08D57]/30 pb-6">
          <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest text-[#8B1E2D] font-bold">
            <Palette className="w-4 h-4" />
            <span>Design Specification & Visual Mood Board</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1C1C1C]">
            Visual Identity & Aesthetic System
          </h2>
          <p className="text-sm text-[#5A5751] mt-1 font-sans">
            How Mumbai Diaries translates the spirit of the City of Dreams into color, typography, texture, and mood.
          </p>
        </div>

        {/* Mood Description */}
        <div className="p-6 bg-[#FAF7F2] rounded-xl border border-[#B08D57]/30">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B08D57] mb-2">
            <Sparkles className="w-4 h-4 text-[#8B1E2D]" />
            <span>Core Atmospheric Mood</span>
          </div>
          <p className="font-serif italic text-xl sm:text-2xl text-[#1C1C1C] leading-snug">
            “Cinematic, youthful, nostalgic, premium, warm, urban, and authentic Mumbai.”
          </p>
          <p className="text-xs sm:text-sm text-[#5A5751] mt-2 font-sans">
            Inspired by the fusion of modern high-end international travel publications and raw, candid Mumbai street photojournalism.
          </p>
        </div>

        {/* 1. Colour Palette */}
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#1C1C1C] mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#8B1E2D]" />
            <span>The Colour Palette</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#5A5751] mb-6">
            A warm, heritage-inspired spectrum anchored by cream paper tones and punctuated with deep Bombay crimson and antique brass gold.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {colorSwatches.map((color) => (
              <div
                key={color.name}
                className="rounded-lg overflow-hidden border border-[#B08D57]/30 shadow-xs flex flex-col"
              >
                <div
                  className="h-28 w-full p-3 flex flex-col justify-between"
                  style={{ backgroundColor: color.hex }}
                >
                  <span
                    className={`text-xs font-mono font-bold uppercase ${
                      color.textDark ? 'text-[#1C1C1C]' : 'text-white'
                    }`}
                  >
                    {color.hex}
                  </span>
                </div>
                <div className="p-3.5 bg-[#FAF7F2] flex-1">
                  <h4 className="font-serif font-bold text-sm text-[#1C1C1C]">{color.name}</h4>
                  <p className="text-[11px] text-[#5A5751] mt-1 leading-snug">{color.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Typography Specimen */}
        <div className="pt-8 border-t border-[#B08D57]/20">
          <h3 className="font-serif text-2xl font-bold text-[#1C1C1C] mb-4 flex items-center gap-2">
            <Type className="w-5 h-5 text-[#8B1E2D]" />
            <span>Typography System</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Serif */}
            <div className="p-6 bg-[#FAF7F2] rounded-lg border border-[#B08D57]/30">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B1E2D] block mb-2">
                Primary Headings & Titles
              </span>
              <h4 className="font-serif text-3xl font-extrabold text-[#1C1C1C] mb-2">
                Playfair Display
              </h4>
              <p className="font-serif italic text-lg text-[#5A5751] mb-4">
                Stories, Streets & Experiences from the City of Dreams.
              </p>
              <p className="text-xs text-[#5A5751] font-sans">
                An elegant, high-contrast serif typeface conveying editorial sophistication, heritage literature, and the timeless weight of Mumbai's colonial architecture.
              </p>
            </div>

            {/* Sans-Serif */}
            <div className="p-6 bg-[#FAF7F2] rounded-lg border border-[#B08D57]/30">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#B08D57] block mb-2">
                Body & Interface Elements
              </span>
              <h4 className="font-sans text-2xl font-bold text-[#1C1C1C] mb-2">
                Plus Jakarta Sans
              </h4>
              <p className="font-sans text-sm text-[#5A5751] mb-4">
                The quick brown fox jumps over the lazy dog. 1234567890.
              </p>
              <p className="text-xs text-[#5A5751] font-sans">
                A clean, modern sans-serif engineered for maximum legibility on digital screens, providing rapid scanning for itineraries, metadata, and buttons.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Photography Style */}
        <div className="pt-8 border-t border-[#B08D57]/20">
          <h3 className="font-serif text-2xl font-bold text-[#1C1C1C] mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#8B1E2D]" />
            <span>Photography Direction</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#5A5751] mb-6">
            All photography adheres to strict visual rules: cinematic golden-hour and nocturnal lighting, realistic Indian city atmospheres, warm color balance, subtle organic film grain, shallow depth of field, and authentic human emotion—free of artificial stock clichés.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#B08D57]/20 text-center">
              <span className="font-serif font-bold text-sm text-[#1C1C1C] block">Street & Rail</span>
              <span className="text-[11px] text-[#5A5751]">Dynamic movement</span>
            </div>
            <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#B08D57]/20 text-center">
              <span className="font-serif font-bold text-sm text-[#1C1C1C] block">Food Culture</span>
              <span className="text-[11px] text-[#5A5751]">Sensory steam & sizzle</span>
            </div>
            <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#B08D57]/20 text-center">
              <span className="font-serif font-bold text-sm text-[#1C1C1C] block">Promenade Glow</span>
              <span className="text-[11px] text-[#5A5751]">Amber sunsets & sea spray</span>
            </div>
            <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#B08D57]/20 text-center">
              <span className="font-serif font-bold text-sm text-[#1C1C1C] block">Heritage Architecture</span>
              <span className="text-[11px] text-[#5A5751]">Basalt & Art Deco lines</span>
            </div>
          </div>
        </div>

        {/* 4. Design Keywords */}
        <div className="pt-8 border-t border-[#B08D57]/20">
          <span className="text-xs uppercase tracking-widest text-[#B08D57] font-bold block mb-3">
            Design DNA Keywords
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {designKeywords.map((kw, i) => (
              <span
                key={kw}
                className="font-serif text-lg sm:text-xl font-bold text-[#1C1C1C] hover:text-[#8B1E2D] transition-colors"
              >
                {kw}
                {i < designKeywords.length - 1 && (
                  <span className="text-[#B08D57] ml-3 select-none font-sans font-light">/</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* College Project Disclaimer & Colophon */}
      <section className="text-center p-8 bg-[#FAF7F2] rounded-xl border border-[#B08D57]/30 max-w-2xl mx-auto text-xs text-[#5A5751] space-y-2">
        <p className="font-serif font-bold text-sm text-[#1C1C1C]">Project Colophon</p>
        <p>
          Curated and engineered as an editorial graduation project in digital media design and travel publishing.
        </p>
        <p className="italic text-[#B08D57]">
          “Dedicated to the millions of souls who make Mumbai the greatest living story on earth.”
        </p>
      </section>
    </div>
  );
};
