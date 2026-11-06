import React, { useState } from 'react';
import type { Game } from '../types/game';
import { GameCard } from './GameCard';
import {
  SearchX,
  RotateCcw,
  Rows3,
  LayoutGrid,
  Gamepad2,
} from 'lucide-react';

interface GameListProps {
  games: Game[];
  totalAvailableGames?: number;
  onSelectGame: (game: Game) => void;
  onDownloadGame: (game: Game) => void;
  onResetFilters: () => void;
  currentCategoryTitle: string;
}

export const GameList: React.FC<GameListProps> = ({
  games,
  totalAvailableGames = 0,
  onSelectGame,
  onDownloadGame,
  onResetFilters,
  currentCategoryTitle,
}) => {
  const [columnMode, setColumnMode] = useState<'single' | 'double'>('double');

  if (totalAvailableGames === 0) {
    return (
      <div className="w-full py-16 px-4 text-center rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex flex-col items-center justify-center my-6 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-primary)] mb-4 shadow-sm">
          <Gamepad2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">No Games Added Yet</h3>
        <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-4 leading-relaxed">
          The gaming repository is currently empty. Add your custom mobile games to{' '}
          <code className="px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--accent-primary)] font-semibold border border-[var(--border-color)] text-xs">
            src/data/gamesData.ts
          </code>{' '}
          to display them on this website.
        </p>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="w-full py-16 px-4 text-center rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex flex-col items-center justify-center my-6 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] mb-4">
          <SearchX className="w-7 h-7 text-[var(--accent-secondary)]" />
        </div>
        <h3 className="text-lg font-bold text-[var(--text-main)] mb-1.5">No Games Found</h3>
        <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-5">
          We couldn&apos;t find any titles matching your current filter. Try selecting a different category or reset your filters.
        </p>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent-primary)] text-[var(--accent-primary-text)] text-sm font-semibold hover:bg-[var(--accent-primary-hover)] transition-all shadow-sm cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <section id="games-section" className="w-full space-y-4 pt-1">
      {/* Section Header with Category Title & View Toggle */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg sm:text-xl font-extrabold text-[var(--text-main)] tracking-tight">
            {currentCategoryTitle}
          </h2>
          <span className="px-2.5 py-0.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-color)] text-xs font-bold text-[var(--accent-primary)]">
            {games.length} {games.length === 1 ? 'Game' : 'Games'}
          </span>
        </div>

        {/* View mode toggle on medium/large screens */}
        <div className="hidden sm:flex items-center gap-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] p-1 rounded-xl shadow-sm">
          <button
            onClick={() => setColumnMode('single')}
            title="Single Column View"
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              columnMode === 'single'
                ? 'bg-[var(--bg-subtle)] text-[var(--accent-primary)] font-bold shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'
            }`}
          >
            <Rows3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setColumnMode('double')}
            title="Two Column View"
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              columnMode === 'double'
                ? 'bg-[var(--bg-subtle)] text-[var(--accent-primary)] font-bold shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Clean Grid View of Games */}
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
