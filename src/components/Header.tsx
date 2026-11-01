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
  Sun,
  Moon,
} from 'lucide-react';
import type { GameCategory, Theme } from '../types/game';
import { CATEGORIES_LIST } from '../data/gamesData';

interface HeaderProps {
  currentCategory: GameCategory;
  onSelectCategory: (category: GameCategory) => void;
  onOpenAbout: () => void;
  onOpenSearch: () => void;
  onScrollToGames: () => void;
  onResetHome: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenAbout,
  onOpenSearch,
  onScrollToGames,
  onResetHome,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const handleNavClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-color)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Website Name */}
          <div
            onClick={onResetHome}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-emerald-500 to-teal-400 shadow-md shadow-emerald-500/20 group-hover:shadow-emerald-500/40 group-hover:scale-105 transition-all duration-300">
              <img
                src="/yono-hub-logo.jpg"
                alt="Yono Hub Logo"
                className="w-full h-full rounded-full object-cover"
              />
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[var(--bg-secondary)]"></span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-[var(--text-main)] font-sans">
                  YONO<span className="bg-gradient-to-r from-teal-500 via-emerald-400 to-indigo-500 bg-clip-text text-transparent"> HUB</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-gradient-to-r from-teal-500/10 to-indigo-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400">
                  v2.0
                </span>
              </div>
              <span className="text-[10px] text-[var(--text-secondary)] tracking-wider uppercase hidden sm:block font-medium">
                Explore • Play • Grow
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={onResetHome}
              className="px-3.5 py-1.5 text-sm font-medium text-[var(--text-main)] hover:text-[var(--accent-primary)] rounded-lg hover:bg-[var(--bg-subtle)] transition-all duration-150"
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
                  ? 'text-[var(--accent-primary)] bg-[var(--bg-subtle)] border border-[var(--border-color)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)]'
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
                    ? 'text-[var(--accent-primary)] bg-[var(--bg-subtle)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)]'
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
                  <div className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-2xl p-2 z-20 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider px-2 py-1 mb-1">
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
                              ? 'bg-[var(--bg-subtle)] text-[var(--accent-primary)] font-semibold'
                              : 'text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)]'
                          }`}
                        >
                          <span>{cat}</span>
                          {currentCategory === cat && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
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
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] rounded-lg transition-all duration-150"
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
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-all text-xs shadow-sm"
            >
              <Search className="w-4 h-4 text-[var(--accent-primary)]" />
              <span className="hidden sm:inline">Search games...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] text-[var(--text-secondary)] bg-[var(--bg-subtle)] rounded border border-[var(--border-color)]">
                /
              </kbd>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}
              className="p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all shadow-sm"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-[var(--accent-secondary)]" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Safe badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[11px] text-[var(--accent-primary)] shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Verified</span>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors shadow-sm"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200 z-50">
          <div className="px-4 py-4 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavClick(onResetHome)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] text-sm font-medium text-[var(--text-main)] hover:border-[var(--accent-primary)]"
              >
                <Gamepad2 className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Home</span>
              </button>
              <button
                onClick={() =>
                  handleNavClick(() => {
                    onSelectCategory('All Games');
                    onScrollToGames();
                  })
                }
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] text-sm font-medium text-[var(--text-main)] hover:border-[var(--accent-primary)]"
              >
                <Sparkles className="w-4 h-4 text-[var(--accent-secondary)]" />
                <span>All Games</span>
              </button>
            </div>

            {/* Search Bar in Mobile Menu */}
            <button
              onClick={() => handleNavClick(onOpenSearch)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)]"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Search by game name...</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>

            {/* Categories Grid */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                  Categories
                </span>
                <span className="text-[11px] text-[var(--text-secondary)]">
                  {CATEGORIES_LIST.length} collections
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
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
                        ? 'bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/50 text-[var(--accent-primary)] font-semibold'
                        : 'bg-[var(--bg-subtle)] border border-[var(--border-color)]/70 text-[var(--text-secondary)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    <span className="truncate">{cat}</span>
                    {currentCategory === cat && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* About & Theme Toggle */}
            <div className="pt-2 border-t border-[var(--border-color)] flex flex-col gap-2">
              <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)]">
                <span className="text-xs font-medium text-[var(--text-main)]">Interface Theme</span>
                <button
                  onClick={onToggleTheme}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-main)] shadow-sm"
                >
                  {theme === 'light' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                      <span>Dark</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => handleNavClick(onOpenAbout)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-main)]"
              >
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[var(--accent-secondary)]" />
                  <span>About Yono Hub</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>

              <div className="flex items-center justify-center gap-2 py-2 text-xs text-[var(--text-secondary)]">
                <ShieldCheck className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Legitimate files • 100% Virus-Free Scanned</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
