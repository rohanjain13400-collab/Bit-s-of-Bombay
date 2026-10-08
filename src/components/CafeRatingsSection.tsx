import React, { useState } from 'react';
import { Star, Coffee, Wifi, Sparkles, MapPin, ExternalLink, Instagram, CheckCircle2, DollarSign } from 'lucide-react';
import { CAFES_RATINGS_DATA, INSTAGRAM_URL, INSTAGRAM_HANDLE, CafeReview } from '../data/cafes';

export const CafeRatingsSection: React.FC = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('All');
  const [activeCafeModal, setActiveCafeModal] = useState<CafeReview | null>(null);

  const neighborhoods = ['All', 'Bandra West', 'South Bombay', 'Versova & Juhu', 'Khar West'];

  const filteredCafes = CAFES_RATINGS_DATA.filter((cafe) => {
    if (selectedNeighborhood === 'All') return true;
    if (selectedNeighborhood === 'Bandra West') return cafe.neighborhood.includes('Bandra');
    if (selectedNeighborhood === 'South Bombay') return cafe.neighborhood.includes('Fort') || cafe.neighborhood.includes('Marine Lines');
    if (selectedNeighborhood === 'Versova & Juhu') return cafe.neighborhood.includes('Versova') || cafe.neighborhood.includes('Juhu');
    if (selectedNeighborhood === 'Khar West') return cafe.neighborhood.includes('Khar');
    return true;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-b border-[#B08D57]/25" id="cafes-ratings">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#B08D57]/30 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#8B1E2D]"></span>
              <span className="text-xs uppercase tracking-widest text-[#8B1E2D] font-bold">
                Bits of Bombay Curated Index
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1C1C]">
              Bombay Café Guide & Ratings
            </h2>
            <p className="text-sm text-[#5A5751] mt-2 max-w-xl font-sans">
              Hand-reviewed coffee quality, student-friendly corners, ambience scores, and signature orders verified by the <strong className="text-[#1C1C1C] font-semibold">{INSTAGRAM_HANDLE}</strong> editorial team.
            </p>
          </div>

          {/* Instagram Channel Callout Box */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0 inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-[#B08D57]/30 hover:border-[#8B1E2D] shadow-xs hover:shadow-md transition-all text-[#1C1C1C]"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#B08D57] via-[#8B1E2D] to-[#B08D57] p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-[#8B1E2D] group-hover:bg-[#8B1E2D] group-hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </div>
            </div>
            <div className="text-left">
              <p className="text-[11px] uppercase tracking-wider text-[#B08D57] font-bold">Follow on Instagram</p>
              <p className="font-serif font-bold text-sm text-[#1C1C1C] group-hover:text-[#8B1E2D] transition-colors flex items-center gap-1">
                <span>{INSTAGRAM_HANDLE}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </p>
            </div>
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {neighborhoods.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedNeighborhood(area)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-md transition-all shrink-0 cursor-pointer ${
                selectedNeighborhood === area
                  ? 'bg-[#8B1E2D] text-white shadow-xs'
                  : 'bg-white hover:bg-[#F5F0E8] text-[#1C1C1C] border border-[#B08D57]/30 hover:border-[#8B1E2D]'
              }`}
            >
              {area}
            </button>
          ))}
        </div>

        {/* Cafe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCafes.map((cafe) => (
            <div
              key={cafe.id}
              className="bg-white rounded-xl border border-[#B08D57]/25 hover:border-[#8B1E2D]/50 transition-all duration-300 hover:shadow-lg flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6">
                {/* Header: Rating & Neighborhood */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF7F2] border border-[#B08D57]/30 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-[#8B1E2D] text-[#8B1E2D]" />
                    <span className="font-serif font-bold text-sm text-[#1C1C1C]">
                      {cafe.rating.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-[#5A5751]">/ 5</span>
                  </div>
                  <span className="text-[11px] font-medium text-[#B08D57] flex items-center gap-1 text-right">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate max-w-[120px]">{cafe.neighborhood.split(',')[0]}</span>
                  </span>
                </div>

                {/* Cafe Name */}
                <h3 className="font-serif text-xl font-bold text-[#1C1C1C] group-hover:text-[#8B1E2D] transition-colors leading-snug mb-2">
                  {cafe.name}
                </h3>

                {/* Full Neighborhood Address */}
                <p className="text-xs text-[#5A5751] mb-4">
                  {cafe.neighborhood}
                </p>

                {/* Sub-Score Bars */}
                <div className="space-y-2 py-3 border-t border-b border-[#B08D57]/15 my-3 text-xs">
                  <div className="flex items-center justify-between text-[#5A5751]">
                    <span className="flex items-center gap-1.5">
                      <Coffee className="w-3 h-3 text-[#B08D57]" />
                      Coffee Quality
                    </span>
                    <span className="font-semibold text-[#1C1C1C]">{cafe.subScores.coffee.toFixed(1)}</span>
                  </div>
                  <div className="w-full bg-[#EAE3D5] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#8B1E2D] h-full rounded-full"
                      style={{ width: `${(cafe.subScores.coffee / 5) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[#5A5751] pt-1">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#B08D57]" />
                      Ambience Score
                    </span>
                    <span className="font-semibold text-[#1C1C1C]">{cafe.subScores.ambience.toFixed(1)}</span>
                  </div>
                  <div className="w-full bg-[#EAE3D5] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#B08D57] h-full rounded-full"
                      style={{ width: `${(cafe.subScores.ambience / 5) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[#5A5751] pt-1">
                    <span className="flex items-center gap-1.5">
                      <Wifi className="w-3 h-3 text-[#B08D57]" />
                      Work & Chill
                    </span>
                    <span className="font-semibold text-[#1C1C1C]">{cafe.subScores.workFriendly.toFixed(1)}</span>
                  </div>
                  <div className="w-full bg-[#EAE3D5] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#1C1C1C] h-full rounded-full"
                      style={{ width: `${(cafe.subScores.workFriendly / 5) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Price & Vibe */}
                <div className="pt-1 pb-3 text-xs text-[#5A5751] space-y-1">
                  <p className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-[#8B1E2D]" />
                    <span className="font-medium text-[#1C1C1C]">Avg for two:</span> {cafe.priceForTwo}
                  </p>
                  <p className="italic font-serif text-[11px] text-[#5A5751]/90 line-clamp-2">
                    “{cafe.vibe}”
                  </p>
                </div>

                {/* Signature Must Orders */}
                <div className="pt-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#B08D57] block mb-1">
                    Must Order:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cafe.signatureMustOrders.slice(0, 2).map((item) => (
                      <span
                        key={item}
                        className="text-[11px] px-2 py-0.5 bg-[#FAF7F2] border border-[#B08D57]/20 rounded text-[#1C1C1C]"
                      >
                        {item}
                      </span>
                    ))}
                    {cafe.signatureMustOrders.length > 2 && (
                      <span className="text-[10px] text-[#5A5751] self-center">
                        +{cafe.signatureMustOrders.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer: Instagram verification & Review Modal */}
              <div className="p-4 bg-[#FAF7F2] border-t border-[#B08D57]/20 flex items-center justify-between text-xs">
                <button
                  onClick={() => setActiveCafeModal(cafe)}
                  className="font-bold text-[#8B1E2D] hover:underline cursor-pointer"
                >
                  Full Verdict & Review
                </button>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-[#B08D57] hover:text-[#8B1E2D] transition-colors"
                  title="Featured on Instagram"
                >
                  <Instagram className="w-3 h-3" />
                  <span>{INSTAGRAM_HANDLE}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for In-depth Verdict */}
        {activeCafeModal && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setActiveCafeModal(null)}
          >
            <div
              className="bg-[#F5F0E8] rounded-xl max-w-xl w-full p-6 sm:p-8 border border-[#B08D57]/40 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs uppercase tracking-widest text-[#8B1E2D] font-bold">
                      {activeCafeModal.neighborhood}
                    </span>
                    <span>·</span>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#1C1C1C]">
                      <Star className="w-3.5 h-3.5 fill-[#8B1E2D] text-[#8B1E2D]" />
                      <span>{activeCafeModal.rating.toFixed(1)} / 5.0</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1C1C1C]">
                    {activeCafeModal.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveCafeModal(null)}
                  className="p-1 rounded-full text-[#5A5751] hover:text-[#8B1E2D] cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-sm text-[#1C1C1C]">
                <p className="leading-relaxed font-sans">{activeCafeModal.description}</p>

                <div className="p-4 bg-white rounded-lg border border-[#B08D57]/30">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#8B1E2D] block mb-1">
                    Editorial Verdict from {INSTAGRAM_HANDLE}:
                  </span>
                  <p className="font-serif italic text-[#1C1C1C] leading-relaxed">
                    “{activeCafeModal.editorialVerdict}”
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#B08D57] mb-2">
                    Signature Must-Orders:
                  </h4>
                  <ul className="space-y-1.5">
                    {activeCafeModal.signatureMustOrders.map((dish) => (
                      <li key={dish} className="flex items-center gap-2 text-xs text-[#1C1C1C]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8B1E2D] shrink-0" />
                        <span>{dish}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-[#5A5751] border-t border-[#B08D57]/20">
                  <span>Approximate cost for two: <strong>{activeCafeModal.priceForTwo}</strong></span>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#8B1E2D] font-bold hover:underline"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Watch reels on Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
