import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Sparkles, Flame, Download } from 'lucide-react';
import type { Game } from '../types/game';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  games: Game[];
  onSelectGame: (game: Game) => void;
  onQuickDownload: (game: Game) => void;
  totalGamesCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  games,
  onSelectGame,
  onQuickDownload,
  totalGamesCount,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const trendingTags = ['Genshin Impact', 'Call of Duty', 'Asphalt 9', 'Subway Surfers', 'Minecraft'];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#191E27]/50 via-[#111318] to-[#111318] border-b border-[#303946]/50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Subtle gaming background elements (clean, non-distracting) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft atmospheric gradient orbs */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[220px] bg-gradient-to-b from-[#00D6B5]/10 via-[#8B5CF6]/5 to-transparent blur-3xl opacity-70" />
        {/* Subtle geometric dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #00D6B5 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Micro badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#191E27] border border-[#303946] text-[#00D6B5] text-xs font-medium mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#00D6B5]" />
          <span>Curated Independent Mobile Games Repository</span>
          <span className="w-1 h-1 rounded-full bg-[#303946]" />
          <span className="text-[#A7B0BE]">{totalGamesCount} Titles Available</span>
        </div>

        {/* Heading & Subtitle strictly adhering to prompt */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2 font-sans">
          Discover Your Next Game
        </h1>
        <p className="text-sm sm:text-base text-[#A7B0BE] max-w-xl mx-auto mb-6">
          Explore and download your favourite mobile games.
        </p>

        {/* Modern Search Bar */}
        <div ref={containerRef} className="relative max-w-2xl mx-auto text-left">
          <div
            className={`flex items-center w-full rounded-xl bg-[#202733] border transition-all duration-200 px-3.5 py-2.5 sm:py-3 shadow-lg ${
              isFocused
                ? 'border-[#00D6B5] ring-2 ring-[#00D6B5]/20 shadow-[#00D6B5]/5'
                : 'border-[#303946] hover:border-[#303946]/90'
            }`}
          >
            <Search className={`w-5 h-5 mr-3 transition-colors ${isFocused ? 'text-[#00D6B5]' : 'text-[#A7B0BE]'}`} />
            
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Search games by name, category, or developer..."
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-[#A7B0BE]/70 focus:outline-none"
            />

            {searchQuery && (
              <button
                onClick={onClearSearch}
                aria-label="Clear search query"
                className="p-1 rounded-md text-[#A7B0BE] hover:text-white hover:bg-[#191E27] mr-1.5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <div className="hidden sm:flex items-center pl-2 border-l border-[#303946] text-xs text-[#A7B0BE]">
              <span className="bg-[#111318] px-1.5 py-0.5 rounded border border-[#303946] text-[10px]">ESC</span>
            </div>
          </div>

          {/* Search suggestions dropdown */}
          {isFocused && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-[#191E27] border border-[#303946] shadow-2xl z-30 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3 py-2 text-[11px] font-semibold text-[#A7B0BE] uppercase tracking-wider bg-[#202733]/50 border-b border-[#303946]">
                Matching Games ({suggestions.length})
              </div>

              {suggestions.length > 0 ? (
                <div className="divide-y divide-[#303946]/40">
                  {suggestions.map((game) => (
                    <div
                      key={game.id}
                      className="flex items-center justify-between p-2.5 hover:bg-[#202733] transition-colors cursor-pointer group"
                      onClick={() => {
                        onSelectGame(game);
                        setIsFocused(false);
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={game.icon}
                          alt={game.title}
                          className="w-9 h-9 rounded-lg object-cover bg-[#111318] border border-[#303946]"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="truncate">
                          <div className="text-sm font-semibold text-white group-hover:text-[#00D6B5] transition-colors truncate">
                            {game.title}
                          </div>
                          <div className="text-[11px] text-[#A7B0BE] flex items-center gap-2">
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
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#00D6B5] hover:bg-[#00D6B5]/90 text-[#111318] text-xs font-semibold transition-transform active:scale-95"
                        >
                          <Download className="w-3 h-3" />
                          <span>Get</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-[#A7B0BE]">
                  No matching games found for &quot;<span className="text-white font-medium">{searchQuery}</span>&quot;
                </div>
              )}
            </div>
          )}

          {/* Trending Search Tags */}
          <div className="mt-3 flex items-center justify-center flex-wrap gap-1.5 text-xs">
            <span className="text-[#A7B0BE] flex items-center gap-1 mr-1 text-[11px]">
              <Flame className="w-3.5 h-3.5 text-[#00D6B5]" />
              Trending:
            </span>
            {trendingTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onSearchChange(tag)}
                className="px-2.5 py-1 rounded-md bg-[#191E27] hover:bg-[#202733] border border-[#303946] text-[#A7B0BE] hover:text-white transition-colors text-[11px]"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
