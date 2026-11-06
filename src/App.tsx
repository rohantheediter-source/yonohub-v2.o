import { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilters } from './components/CategoryFilters';
import { GameList } from './components/GameList';
import { GameDetailsModal } from './components/GameDetailsModal';
import { DownloadProgressModal } from './components/DownloadProgressModal';
import { AboutModal } from './components/AboutModal';
import { ContactModal } from './components/ContactModal';
import { LegalModal } from './components/LegalModal';
import { Toast } from './components/Toast';
import { FloatingTelegram } from './components/FloatingTelegram';
import { Footer } from './components/Footer';

import type { Game, GameCategory, FilterState, Theme } from './types/game';
import { GAMES_DATA } from './data/gamesData';

export function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('yonohub_theme') || localStorage.getItem('nexusplay_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {
      // ignore
    }
    return 'light'; // Default to Light theme as requested!
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    category: 'All Games',
    searchQuery: '',
    sortBy: 'popular',
    offlineOnly: false,
    editorsChoiceOnly: false,
  });

  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [downloadingGame, setDownloadingGame] = useState<Game | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  // Synchronize HTML theme attribute and meta theme-color
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('yonohub_theme', theme);
    } catch {
      // ignore
    }
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'light' ? '#F4F6F9' : '#111318');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      showToast(`Switched to ${next === 'light' ? 'Light' : 'Dark'} Theme`);
      return next;
    });
  };

  // Sync hash routing for shareable game links: #/game/:slug
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/game/')) {
        const slug = hash.replace('#/game/', '');
        const found = GAMES_DATA.find((g) => g.slug === slug || g.id === slug);
        if (found) {
          setSelectedGame(found);
        }
      } else if (hash === '' || hash === '#/') {
        setSelectedGame(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // check on mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openGameDetails = (game: Game) => {
    setSelectedGame(game);
    window.location.hash = `#/game/${game.slug}`;
  };

  const closeGameDetails = () => {
    setSelectedGame(null);
    if (window.location.hash.startsWith('#/game/')) {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const handleQuickDownload = (game: Game) => {
    setDownloadingGame(game);
  };

  // Scroll smoothly to games list
  const scrollToGames = () => {
    const el = document.getElementById('games-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Reset to Home view
  const handleResetHome = () => {
    setSearchQuery('');
    setFilters({
      category: 'All Games',
      searchQuery: '',
      sortBy: 'popular',
      offlineOnly: false,
      editorsChoiceOnly: false,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Returned to Yono Hub Home');
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<GameCategory, number> = {
      'All Games': GAMES_DATA.length,
      'Popular Games': GAMES_DATA.filter((g) => g.isPopular).length,
      'New Release': GAMES_DATA.filter((g) => g.isNew).length,
      Rummy: GAMES_DATA.filter((g) => g.isRummy || g.category === 'Rummy').length,
    };
    return counts;
  }, []);

  // Filtered & Sorted Games
  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter((game) => {
      // Search match
      const query = searchQuery.trim().toLowerCase();
      if (query) {
        const titleMatch = game.title.toLowerCase().includes(query);
        const descMatch = game.shortDescription.toLowerCase().includes(query);
        const devMatch = game.developer.toLowerCase().includes(query);
        const tagMatch = game.tags.some((t) => t.toLowerCase().includes(query));
        const categoryMatch = game.category.toLowerCase().includes(query);
        if (!titleMatch && !descMatch && !devMatch && !tagMatch && !categoryMatch) {
          return false;
        }
      }

      // 4 Main Category Filter
      if (filters.category === 'Popular Games') {
        if (!game.isPopular) return false;
      } else if (filters.category === 'New Release') {
        if (!game.isNew) return false;
      } else if (filters.category === 'Rummy') {
        if (!game.isRummy && game.category !== 'Rummy') return false;
      }
      // If 'All Games', shows ALL games!

      // Offline filter
      if (filters.offlineOnly && !game.isOffline) {
        return false;
      }

      // Editors choice filter
      if (filters.editorsChoiceOnly && !game.isEditorsChoice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (filters.sortBy === 'newest') {
        return new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime();
      }
      if (filters.sortBy === 'size') {
        const parseSize = (str: string) => {
          const val = parseFloat(str);
          if (str.includes('GB')) return val * 1024;
          return val;
        };
        return parseSize(a.fileSize) - parseSize(b.fileSize);
      }
      // Default: 'popular'
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;
      return b.rating - a.rating;
    });
  }, [searchQuery, filters]);

  const handleSelectCategory = (cat: GameCategory) => {
    setFilters((prev) => ({ ...prev, category: cat }));
  };

  const handleUpdateFilters = (updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({
      category: 'All Games',
      searchQuery: '',
      sortBy: 'popular',
      offlineOnly: false,
      editorsChoiceOnly: false,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-main)] selection:bg-[var(--accent-primary)] selection:text-white transition-colors duration-200">
      {/* Header */}
      <Header
        currentCategory={filters.category}
        onSelectCategory={handleSelectCategory}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenSearch={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          const input = document.querySelector('input[type="text"]') as HTMLInputElement;
          input?.focus();
        }}
        onScrollToGames={scrollToGames}
        onResetHome={handleResetHome}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Compact Hero Section */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={() => setSearchQuery('')}
          games={GAMES_DATA}
          onSelectGame={openGameDetails}
          onQuickDownload={handleQuickDownload}
          totalGamesCount={GAMES_DATA.length}
        />

        {/* Central Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
          {/* Category Filters Bar */}
          <CategoryFilters
            filters={filters}
            onSelectCategory={(cat) => {
              handleSelectCategory(cat);
              scrollToGames();
            }}
            onUpdateFilters={handleUpdateFilters}
            categoryCounts={categoryCounts}
          />

          {/* Game List Section (Most Important Section) */}
          <GameList
            games={filteredGames}
            totalAvailableGames={GAMES_DATA.length}
            onSelectGame={openGameDetails}
            onDownloadGame={handleQuickDownload}
            onResetFilters={handleResetFilters}
            currentCategoryTitle={
              searchQuery.trim()
                ? `Results for "${searchQuery}"`
                : filters.category === 'All Games'
                ? 'All Available Games'
                : filters.category === 'Popular Games'
                ? 'Popular Games'
                : filters.category === 'New Release'
                ? 'New Release Games'
                : 'Rummy Games'
            }
          />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenPrivacy={() => setLegalType('privacy')}
        onOpenTerms={() => setLegalType('terms')}
        onSelectCategory={(cat) => {
          handleSelectCategory(cat);
          scrollToGames();
        }}
      />

      {/* Game Details Modal / Dedicated View */}
      <GameDetailsModal
        game={selectedGame}
        onClose={closeGameDetails}
        onDownload={handleQuickDownload}
        allGames={GAMES_DATA}
        onSelectGame={openGameDetails}
        onShowToast={showToast}
      />

      {/* Download Progress / Verification Modal */}
      <DownloadProgressModal
        game={downloadingGame}
        onClose={() => setDownloadingGame(null)}
        onShowToast={showToast}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Contact Us Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onShowToast={showToast}
      />

      {/* Legal (Privacy & Terms) Modal */}
      <LegalModal
        type={legalType}
        onClose={() => setLegalType(null)}
      />

      {/* Floating Telegram Community Button */}
      <FloatingTelegram url="https://t.me/+jIIGcRbh3Hc3MmU1" />

      {/* Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}

export default App;
