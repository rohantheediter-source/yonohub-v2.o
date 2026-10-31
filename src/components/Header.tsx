import React, { useState } from 'react';
import {
  Gamepad2,
  Search,
  Menu,
  X,
  Layers,
  Sparkles,
  Info,
  ShieldCheck,
  ChevronRight,
  Flame,
} from 'lucide-react';
import type { GameCategory } from '../types/game';
import { CATEGORIES_LIST } from '../data/gamesData';

interface HeaderProps {
  currentCategory: GameCategory;
  onSelectCategory: (category: GameCategory) => void;
  onOpenAbout: () => void;
  onOpenSearch: () => void;
  onScrollToGames: () => void;
  onResetHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenAbout,
  onOpenSearch,
  onScrollToGames,
  onResetHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const handleNavClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#111318]/95 backdrop-blur-md border-b border-[#303946] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Website Name */}
          <div
            onClick={onResetHome}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B5CF6] via-[#191E27] to-[#00D6B5] p-[1.5px] transition-transform duration-200 group-hover:scale-105">
              <div className="w-full h-full bg-[#111318] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-[#00D6B5] transition-colors group-hover:text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00D6B5] rounded-full ring-2 ring-[#111318] animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white font-sans">
                  NEXUS<span className="text-[#00D6B5]">PLAY</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-[#202733] border border-[#303946] text-[#A7B0BE]">
                  v2.0
                </span>
              </div>
              <span className="text-[10px] text-[#A7B0BE] tracking-wider uppercase hidden sm:block">
                Mobile Game Vault
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={onResetHome}
              className="px-3.5 py-1.5 text-sm font-medium text-white hover:text-[#00D6B5] rounded-lg hover:bg-[#191E27] transition-all duration-150"
            >
              Home
            </button>

            <button
              onClick={() => {
                onSelectCategory('All Games');
                onScrollToGames();
              }}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 ${
                currentCategory === 'All Games'
                  ? 'text-[#00D6B5] bg-[#202733] border border-[#303946]'
                  : 'text-[#A7B0BE] hover:text-white hover:bg-[#191E27]'
              }`}
            >
              All Games
            </button>

            {/* Categories Menu */}
            <div className="relative">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 ${
                  categoriesDropdownOpen
                    ? 'text-[#00D6B5] bg-[#202733]'
                    : 'text-[#A7B0BE] hover:text-white hover:bg-[#191E27]'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Categories</span>
              </button>

              {categoriesDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setCategoriesDropdownOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-[#191E27] border border-[#303946] shadow-2xl p-2 z-20 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[11px] font-semibold text-[#A7B0BE] uppercase tracking-wider px-2 py-1 mb-1">
                      Browse Genres
                    </div>
                    <div className="grid grid-cols-1 gap-0.5">
                      {CATEGORIES_LIST.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            onSelectCategory(cat);
                            setCategoriesDropdownOpen(false);
                            onScrollToGames();
                          }}
                          className={`flex items-center justify-between w-full px-2.5 py-2 text-xs rounded-lg text-left transition-colors ${
                            currentCategory === cat
                              ? 'bg-[#202733] text-[#00D6B5] font-semibold'
                              : 'text-[#A7B0BE] hover:text-white hover:bg-[#202733]'
                          }`}
                        >
                          <span>{cat}</span>
                          {currentCategory === cat && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00D6B5]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={onOpenAbout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium text-[#A7B0BE] hover:text-white hover:bg-[#191E27] rounded-lg transition-all duration-150"
            >
              <Info className="w-4 h-4" />
              <span>About Us</span>
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Search games"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#191E27] hover:bg-[#202733] border border-[#303946] text-[#A7B0BE] hover:text-white transition-all text-xs"
            >
              <Search className="w-4 h-4 text-[#00D6B5]" />
              <span className="hidden sm:inline">Search games...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] text-[#A7B0BE] bg-[#111318] rounded border border-[#303946]">
                /
              </kbd>
            </button>

            {/* Safe badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#191E27]/80 border border-[#303946] text-[11px] text-[#00D6B5]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Verified</span>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-lg bg-[#191E27] border border-[#303946] text-[#A7B0BE] hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-[#111318]/98 border-b border-[#303946] shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200 z-50">
          <div className="px-4 py-4 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavClick(onResetHome)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#191E27] border border-[#303946] text-sm font-medium text-white hover:border-[#00D6B5]"
              >
                <Gamepad2 className="w-4 h-4 text-[#00D6B5]" />
                <span>Home</span>
              </button>
              <button
                onClick={() =>
                  handleNavClick(() => {
                    onSelectCategory('All Games');
                    onScrollToGames();
                  })
                }
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#191E27] border border-[#303946] text-sm font-medium text-white hover:border-[#00D6B5]"
              >
                <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                <span>All Games</span>
              </button>
            </div>

            {/* Search Bar in Mobile Menu */}
            <button
              onClick={() => handleNavClick(onOpenSearch)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#202733] border border-[#303946] text-sm text-[#A7B0BE]"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#00D6B5]" />
                <span>Search by game name...</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#A7B0BE]" />
            </button>

            {/* Categories Grid */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-semibold text-[#A7B0BE] uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#00D6B5]" />
                  Categories
                </span>
                <span className="text-[11px] text-[#A7B0BE]">
                  {CATEGORIES_LIST.length} genres
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {CATEGORIES_LIST.map((cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      handleNavClick(() => {
                        onSelectCategory(cat);
                        onScrollToGames();
                      })
                    }
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                      currentCategory === cat
                        ? 'bg-[#00D6B5]/15 border border-[#00D6B5]/50 text-[#00D6B5]'
                        : 'bg-[#191E27] border border-[#303946]/60 text-[#A7B0BE] hover:text-white'
                    }`}
                  >
                    <span className="truncate">{cat}</span>
                    {currentCategory === cat && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D6B5]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* About & Trust */}
            <div className="pt-2 border-t border-[#303946] flex flex-col gap-2">
              <button
                onClick={() => handleNavClick(onOpenAbout)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#191E27] border border-[#303946] text-sm text-white"
              >
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#8B5CF6]" />
                  <span>About NexusPlay</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A7B0BE]" />
              </button>

              <div className="flex items-center justify-center gap-2 py-2 text-xs text-[#A7B0BE]">
                <ShieldCheck className="w-4 h-4 text-[#00D6B5]" />
                <span>Legitimate files • 100% Virus-Free Scanned</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
