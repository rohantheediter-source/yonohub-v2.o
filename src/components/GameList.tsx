import React, { useState } from 'react';
import type { Game } from '../types/game';
import { GameCard } from './GameCard';
import { SearchX, RotateCcw, Rows3, LayoutGrid } from 'lucide-react';

interface GameListProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
  onDownloadGame: (game: Game) => void;
  onResetFilters: () => void;
  currentCategoryTitle: string;
}

export const GameList: React.FC<GameListProps> = ({
  games,
  onSelectGame,
  onDownloadGame,
  onResetFilters,
  currentCategoryTitle,
}) => {
  const [columnMode, setColumnMode] = useState<'single' | 'double'>('double');

  if (games.length === 0) {
    return (
      <div className="w-full py-16 px-4 text-center rounded-2xl bg-[#191E27] border border-[#303946] flex flex-col items-center justify-center my-6">
        <div className="w-14 h-14 rounded-2xl bg-[#202733] border border-[#303946] flex items-center justify-center text-[#A7B0BE] mb-4">
          <SearchX className="w-7 h-7 text-[#8B5CF6]" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1.5">No Games Found</h3>
        <p className="text-sm text-[#A7B0BE] max-w-md mx-auto mb-5">
          We couldn&apos;t find any titles matching your current search or category filter. Try searching for something else or reset your criteria.
        </p>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00D6B5] text-[#111318] text-sm font-semibold hover:bg-[#00D6B5]/90 transition-all shadow-md shadow-[#00D6B5]/15"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <section id="games-section" className="w-full space-y-4 pt-2">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#303946]/50">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            {currentCategoryTitle}
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-[#191E27] border border-[#303946] text-xs font-semibold text-[#00D6B5]">
            {games.length} {games.length === 1 ? 'Game' : 'Games'}
          </span>
        </div>

        {/* View mode toggle on medium/large screens */}
        <div className="hidden sm:flex items-center gap-1 bg-[#191E27] border border-[#303946] p-1 rounded-lg">
          <button
            onClick={() => setColumnMode('single')}
            title="Single Column View"
            className={`p-1.5 rounded-md transition-colors ${
              columnMode === 'single'
                ? 'bg-[#202733] text-[#00D6B5]'
                : 'text-[#A7B0BE] hover:text-white'
            }`}
          >
            <Rows3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setColumnMode('double')}
            title="Two Column View"
            className={`p-1.5 rounded-md transition-colors ${
              columnMode === 'double'
                ? 'bg-[#202733] text-[#00D6B5]'
                : 'text-[#A7B0BE] hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Compact Horizontal Game Cards List */}
      <div
        className={`grid gap-2.5 sm:gap-3 ${
          columnMode === 'single'
            ? 'grid-cols-1 max-w-4xl mx-auto'
            : 'grid-cols-1 lg:grid-cols-2'
        }`}
      >
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onSelect={onSelectGame}
            onDownload={onDownloadGame}
          />
        ))}
      </div>
    </section>
  );
};
