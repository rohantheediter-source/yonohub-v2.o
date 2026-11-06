import React from 'react';
import {
  Gamepad2,
  Flame,
  Sparkles,
  Trophy,
} from 'lucide-react';
import type { GameCategory, FilterState } from '../types/game';
import { CATEGORIES_LIST } from '../data/gamesData';

interface CategoryFiltersProps {
  filters: FilterState;
  onSelectCategory: (category: GameCategory) => void;
  onUpdateFilters?: (updates: Partial<FilterState>) => void;
  categoryCounts?: Record<GameCategory, number>;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  filters,
  onSelectCategory,
}) => {
  const getCategoryIcon = (cat: GameCategory, isSelected: boolean) => {
    switch (cat) {
      case 'All Games':
        return <Gamepad2 className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-teal-500'}`} />;
      case 'Popular Games':
        return <Flame className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-amber-500 animate-pulse'}`} />;
      case 'New Release':
        return <Sparkles className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-purple-500'}`} />;
      case 'Rummy':
        return <Trophy className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-500'}`} />;
      default:
        return <Gamepad2 className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-teal-500'}`} />;
    }
  };

  const getCategoryStyles = (category: GameCategory, isSelected: boolean) => {
    if (isSelected) {
      switch (category) {
        case 'Popular Games':
          return 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white border-amber-500 shadow-md shadow-amber-500/25 font-bold scale-[1.02]';
        case 'New Release':
          return 'bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white border-purple-500 shadow-md shadow-purple-500/25 font-bold scale-[1.02]';
        case 'Rummy':
          return 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/25 font-bold scale-[1.02]';
        case 'All Games':
        default:
          return 'bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-600 text-white border-teal-500 shadow-md shadow-teal-500/25 font-bold scale-[1.02]';
      }
    }
    switch (category) {
      case 'Popular Games':
        return 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-amber-400/60 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-950/20';
      case 'New Release':
        return 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-purple-400/60 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-950/20';
      case 'Rummy':
        return 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-emerald-400/60 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20';
      case 'All Games':
      default:
        return 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-teal-400/60 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-teal-950/20';
    }
  };

  return (
    <nav aria-label="Game categories" className="w-full space-y-3">
      {/* Category Tabs Bar */}
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none no-scrollbar scroll-smooth">
          {CATEGORIES_LIST.map((category) => {
            const isSelected = filters.category === category;

            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer select-none active:scale-95 shadow-sm ${getCategoryStyles(category, isSelected)}`}
              >
                <span>{getCategoryIcon(category, isSelected)}</span>
                <span>{category}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
