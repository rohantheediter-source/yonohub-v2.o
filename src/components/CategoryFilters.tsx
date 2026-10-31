import React from 'react';
import {
  Gamepad2,
  Flame,
  Sparkles,
  Swords,
  Compass,
  Car,
  ShieldAlert,
  Zap,
  Puzzle as PuzzleIcon,
  SlidersHorizontal,
  WifiOff,
  Award,
  Coins,
  Trophy,
} from 'lucide-react';
import type { GameCategory, FilterState } from '../types/game';
import { CATEGORIES_LIST } from '../data/gamesData';

interface CategoryFiltersProps {
  filters: FilterState;
  onSelectCategory: (category: GameCategory) => void;
  onUpdateFilters: (updates: Partial<FilterState>) => void;
  categoryCounts: Record<GameCategory, number>;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  filters,
  onSelectCategory,
  onUpdateFilters,
  categoryCounts,
}) => {
  const getCategoryIcon = (cat: GameCategory) => {
    switch (cat) {
      case 'All Games':
        return <Gamepad2 className="w-3.5 h-3.5" />;
      case 'Popular Games':
        return <Flame className="w-3.5 h-3.5 text-amber-500" />;
      case 'New Releases':
        return <Sparkles className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />;
      case 'Rummy':
        return <Trophy className="w-3.5 h-3.5 text-emerald-500" />;
      case 'Slots':
        return <Coins className="w-3.5 h-3.5 text-amber-500" />;
      case 'Action':
        return <Swords className="w-3.5 h-3.5 text-rose-500" />;
      case 'Adventure':
        return <Compass className="w-3.5 h-3.5 text-[var(--accent-primary)]" />;
      case 'Racing':
        return <Car className="w-3.5 h-3.5 text-amber-500" />;
      case 'Strategy':
        return <ShieldAlert className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />;
      case 'Arcade':
        return <Zap className="w-3.5 h-3.5 text-cyan-500" />;
      case 'Puzzle':
        return <PuzzleIcon className="w-3.5 h-3.5 text-pink-500" />;
      default:
        return <Gamepad2 className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Category Tabs Bar */}
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none no-scrollbar scroll-smooth">
          {CATEGORIES_LIST.map((category) => {
            const isSelected = filters.category === category;
            const count = categoryCounts[category] || 0;

            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer select-none active:scale-95 shadow-sm ${
                  isSelected
                    ? 'bg-[var(--accent-primary)] text-[var(--accent-primary-text)] border-[var(--accent-primary)] font-bold shadow-md shadow-[var(--accent-primary)]/15'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-main)]'
                }`}
              >
                <span>{getCategoryIcon(category)}</span>
                <span>{category}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-sans ${
                    isSelected
                      ? 'bg-black/20 text-white font-semibold'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Sort & Quick Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-[var(--border-color)] text-xs">
        {/* Left: Quick toggles */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[var(--text-secondary)] text-[11px] mr-1 hidden sm:inline">Filter:</span>
          
          <button
            onClick={() => onUpdateFilters({ offlineOnly: !filters.offlineOnly })}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs transition-colors shadow-sm ${
              filters.offlineOnly
                ? 'bg-[var(--accent-secondary)]/15 border-[var(--accent-secondary)] text-[var(--accent-secondary)] font-semibold'
                : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-main)]'
            }`}
          >
            <WifiOff className="w-3 h-3 text-[var(--accent-secondary)]" />
            <span>Offline Play</span>
          </button>

          <button
            onClick={() => onUpdateFilters({ editorsChoiceOnly: !filters.editorsChoiceOnly })}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs transition-colors shadow-sm ${
              filters.editorsChoiceOnly
                ? 'bg-[var(--accent-primary)]/15 border-[var(--accent-primary)] text-[var(--accent-primary)] font-semibold'
                : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-main)]'
            }`}
          >
            <Award className="w-3 h-3 text-[var(--accent-primary)]" />
            <span>Editors&apos; Choice</span>
          </button>
        </div>

        {/* Right: Sort by selector */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
          <span className="text-[var(--text-secondary)] text-[11px]">Sort by:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onUpdateFilters({ sortBy: e.target.value as FilterState['sortBy'] })}
            className="bg-[var(--bg-secondary)] text-[var(--text-main)] text-xs border border-[var(--border-color)] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[var(--accent-primary)] cursor-pointer shadow-sm"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Latest Updates</option>
            <option value="size">File Size</option>
          </select>
        </div>
      </div>
    </div>
  );
};
