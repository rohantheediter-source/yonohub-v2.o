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
        return <Flame className="w-3.5 h-3.5 text-amber-400" />;
      case 'New Releases':
        return <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />;
      case 'Action':
        return <Swords className="w-3.5 h-3.5 text-rose-400" />;
      case 'Adventure':
        return <Compass className="w-3.5 h-3.5 text-[#00D6B5]" />;
      case 'Racing':
        return <Car className="w-3.5 h-3.5 text-amber-400" />;
      case 'Strategy':
        return <ShieldAlert className="w-3.5 h-3.5 text-[#8B5CF6]" />;
      case 'Arcade':
        return <Zap className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Puzzle':
        return <PuzzleIcon className="w-3.5 h-3.5 text-pink-400" />;
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
                className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer select-none active:scale-95 ${
                  isSelected
                    ? 'bg-[#00D6B5] text-[#111318] border-[#00D6B5] font-semibold shadow-md shadow-[#00D6B5]/15'
                    : 'bg-[#191E27] text-[#A7B0BE] border-[#303946] hover:bg-[#202733] hover:text-white'
                }`}
              >
                <span>{getCategoryIcon(category)}</span>
                <span>{category}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-sans ${
                    isSelected
                      ? 'bg-[#111318]/20 text-[#111318]'
                      : 'bg-[#111318] text-[#A7B0BE] border border-[#303946]/50'
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
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-[#303946]/50 text-xs">
        {/* Left: Quick toggles */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[#A7B0BE] text-[11px] mr-1 hidden sm:inline">Filter:</span>
          
          <button
            onClick={() => onUpdateFilters({ offlineOnly: !filters.offlineOnly })}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs transition-colors ${
              filters.offlineOnly
                ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white font-medium'
                : 'bg-[#191E27] border-[#303946] text-[#A7B0BE] hover:text-white'
            }`}
          >
            <WifiOff className="w-3 h-3 text-[#8B5CF6]" />
            <span>Offline Play</span>
          </button>

          <button
            onClick={() => onUpdateFilters({ editorsChoiceOnly: !filters.editorsChoiceOnly })}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs transition-colors ${
              filters.editorsChoiceOnly
                ? 'bg-[#00D6B5]/20 border-[#00D6B5] text-[#00D6B5] font-medium'
                : 'bg-[#191E27] border-[#303946] text-[#A7B0BE] hover:text-white'
            }`}
          >
            <Award className="w-3 h-3 text-[#00D6B5]" />
            <span>Editors&apos; Choice</span>
          </button>
        </div>

        {/* Right: Sort by selector */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#A7B0BE]" />
          <span className="text-[#A7B0BE] text-[11px]">Sort by:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onUpdateFilters({ sortBy: e.target.value as FilterState['sortBy'] })}
            className="bg-[#191E27] text-white text-xs border border-[#303946] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#00D6B5] cursor-pointer"
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
