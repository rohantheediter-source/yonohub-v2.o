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
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--bg-secondary)] via-[var(--bg-main)] to-[var(--bg-main)] border-b border-[var(--border-color)] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Subtle gaming background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft atmospheric gradient */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[220px] bg-gradient-to-b from-[var(--accent-primary)]/10 via-[var(--accent-secondary)]/5 to-transparent blur-3xl opacity-60" />
        {/* Subtle geometric dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, var(--accent-primary) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Micro badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--accent-primary)] text-xs font-semibold mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Independent Mobile Games Repository</span>
          <span className="w-1 h-1 rounded-full bg-[var(--border-color)]" />
          <span className="text-[var(--text-secondary)] font-medium">{totalGamesCount} Titles Available</span>
        </div>

        {/* Heading & Subtitle */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-main)] mb-2 font-sans">
          Discover Your Next Game
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto mb-6">
          Explore and download your favourite mobile games.
        </p>

        {/* Modern Search Bar */}
        <div ref={containerRef} className="relative max-w-2xl mx-auto text-left">
          <div
            className={`flex items-center w-full rounded-xl bg-[var(--bg-input)] border transition-all duration-200 px-3.5 py-2.5 sm:py-3 shadow-sm ${
              isFocused
                ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20 shadow-md'
                : 'border-[var(--border-color)] hover:border-[var(--border-hover)]'
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
                          <span>Get</span>
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

          {/* Trending Search Tags */}
          <div className="mt-3 flex items-center justify-center flex-wrap gap-1.5 text-xs">
            <span className="text-[var(--text-secondary)] flex items-center gap-1 mr-1 text-[11px]">
              <Flame className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              Trending:
            </span>
            {trendingTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onSearchChange(tag)}
                className="px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] hover:bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors text-[11px] shadow-sm"
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
