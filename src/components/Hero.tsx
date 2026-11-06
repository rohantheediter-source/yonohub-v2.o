import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Game } from '../types/game';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  games: Game[];
  onSelectGame: (game: Game) => void;
  onQuickDownload: (game: Game) => void;
  totalGamesCount?: number;
}

const HERO_BANNERS = [
  {
    src: '/yono-hub-banner.jpg',
    alt: 'Yono Hub - Explore, Play, Grow',
  },
  {
    src: '/yono-app-hub-banner.jpg',
    alt: 'Yono App Hub - Explore, Play, Grow',
  },
];

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  games,
  onSelectGame,
  onQuickDownload,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play sliding banner carousel every 4.5 seconds
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Filter suggestions based on query
  const suggestions = searchQuery.trim().length > 0
    ? games.filter((g) =>
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.developer.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  // Close suggestions if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut '/' or 'Ctrl+K' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--bg-secondary)] via-[var(--bg-main)] to-[var(--bg-main)] border-b border-[var(--border-color)] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Subtle gaming background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft atmospheric glowing orbs */}
        <div className="absolute -top-16 -left-12 w-96 h-96 bg-gradient-to-tr from-teal-500/20 via-emerald-400/15 to-transparent blur-3xl rounded-full animate-float-slow" />
        <div className="absolute -top-20 -right-12 w-96 h-96 bg-gradient-to-bl from-purple-500/20 via-indigo-400/15 to-transparent blur-3xl rounded-full animate-pulse-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-gradient-to-r from-teal-500/10 via-cyan-400/10 to-purple-500/10 blur-3xl opacity-70" />
        {/* Subtle geometric dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle, var(--accent-primary) 1.2px, transparent 1.2px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Sliding Hero Banner Carousel */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] aspect-[1024/384] group select-none transition-all duration-300 hover:shadow-teal-500/10"
        >
          {/* Slides Track with Horizontal Slide Animation */}
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-full h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {HERO_BANNERS.map((banner, idx) => (
              <div key={banner.src} className="w-full h-full flex-shrink-0 aspect-[1024/384]">
                <img
                  src={banner.src}
                  alt={banner.alt}
                  className="w-full h-full object-cover block mx-auto"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                  width="1024"
                  height="384"
                />
              </div>
            ))}
          </div>

          {/* Left Navigation Chevron Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Banner"
            className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Right Navigation Chevron Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Banner"
            className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-2.5 sm:bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/15">
            {HERO_BANNERS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === idx
                    ? 'w-6 h-1.5 bg-gradient-to-r from-teal-400 to-emerald-400'
                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        <h1 className="sr-only">Yono Hub &amp; Yono App Hub - Explore, Play, Grow. Download Verified Mobile Games &amp; Rummy APKs.</h1>

        {/* Modern Search Bar */}
        <div ref={containerRef} className="relative max-w-2xl mx-auto text-left">
          <div
            className={`flex items-center w-full rounded-2xl bg-[var(--bg-input)] border transition-all duration-300 px-4 py-3 sm:py-3.5 shadow-sm ${
              isFocused
                ? 'border-teal-500 ring-4 ring-teal-500/15 shadow-xl shadow-teal-500/10 scale-[1.01]'
                : 'border-[var(--border-color)] hover:border-teal-400/50 hover:shadow-md'
            }`}
          >
            <Search className={`w-5 h-5 mr-3 transition-colors ${isFocused ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'}`} />
            
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Search games by name, category, or developer..."
              className="w-full bg-transparent text-sm sm:text-base text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none"
            />

            {searchQuery && (
              <button
                onClick={onClearSearch}
                aria-label="Clear search query"
                className="p-1 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] mr-1.5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <div className="hidden sm:flex items-center pl-2 border-l border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
              <span className="bg-[var(--bg-subtle)] px-1.5 py-0.5 rounded border border-[var(--border-color)] text-[10px]">ESC</span>
            </div>
          </div>

          {/* Search suggestions dropdown */}
          {isFocused && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-xl z-30 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3 py-2 text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider bg-[var(--bg-subtle)] border-b border-[var(--border-color)]">
                Matching Games ({suggestions.length})
              </div>

              {suggestions.length > 0 ? (
                <div className="divide-y divide-[var(--border-color)]">
                  {suggestions.map((game) => (
                    <div
                      key={game.id}
                      className="flex items-center justify-between p-2.5 hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer group"
                      onClick={() => {
                        onSelectGame(game);
                        setIsFocused(false);
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={game.icon}
                          alt={game.title}
                          className="w-9 h-9 rounded-lg object-cover bg-[var(--bg-subtle)] border border-[var(--border-color)] shadow-sm"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="truncate">
                          <div className="text-sm font-semibold text-[var(--text-main)] group-hover:text-[var(--accent-primary)] transition-colors truncate">
                            {game.title}
                          </div>
                          <div className="text-[11px] text-[var(--text-secondary)] flex items-center gap-2">
                            <span>{game.category}</span>
                            <span>•</span>
                            <span>{game.fileSize}</span>
                            <span>•</span>
                            <span>{game.version}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pl-2 flex-shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsFocused(false);
                            onQuickDownload(game);
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-primary-text)] text-xs font-semibold transition-transform active:scale-95 shadow-sm"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-[var(--text-secondary)]">
                  No matching games found for &quot;<span className="text-[var(--text-main)] font-semibold">{searchQuery}</span>&quot;
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
