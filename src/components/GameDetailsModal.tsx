import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Star,
  ExternalLink,
  Calendar,
  HardDrive,
  Cpu,
  Smartphone,
  Share2,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Maximize2,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import type { Game } from '../types/game';
import { GameImage } from './GameImage';
import { GameCard } from './GameCard';

interface GameDetailsModalProps {
  game: Game | null;
  onClose: () => void;
  onDownload: (game: Game) => void;
  allGames: Game[];
  onSelectGame: (game: Game) => void;
  onShowToast: (message: string) => void;
}

export const GameDetailsModal: React.FC<GameDetailsModalProps> = ({
  game,
  onClose,
  onDownload,
  allGames,
  onSelectGame,
  onShowToast,
}) => {
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'features' | 'changelog'>('about');

  useEffect(() => {
    if (game) {
      try {
        const saved = localStorage.getItem(`bookmark_${game.id}`);
        setIsBookmarked(saved === 'true');
      } catch {
        // ignore
      }
      setSelectedScreenshot(null);
      setActiveTab('about');
      document.title = `${game.title} - Free Download | NexusPlay`;
    } else {
      document.title = 'NexusPlay - Modern Mobile Game Download Platform';
    }
  }, [game]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedScreenshot) {
          setSelectedScreenshot(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedScreenshot, onClose]);

  if (!game) return null;

  const toggleBookmark = () => {
    const newState = !isBookmarked;
    setIsBookmarked(newState);
    try {
      localStorage.setItem(`bookmark_${game.id}`, String(newState));
    } catch {
      // ignore
    }
    onShowToast(newState ? `Added ${game.title} to Saved Games` : `Removed from Saved Games`);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      onShowToast('Game link copied to clipboard!');
    }
  };

  // Related games from same category or popular, excluding current
  const relatedGames = allGames
    .filter((g) => g.id !== game.id && (g.category === game.category || g.isPopular))
    .slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-[var(--modal-overlay)] backdrop-blur-md animate-in fade-in duration-200">
      {/* Click outside to close overlay */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div
        data-testid="game-details-modal"
        className="relative w-full max-w-4xl bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]"
      >
        {/* Top Sticky Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[var(--header-bg)] border-b border-[var(--border-color)] backdrop-blur-md flex-shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Games</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleBookmark}
              title={isBookmarked ? 'Bookmarked' : 'Save Game'}
              className={`p-2 rounded-xl border transition-colors shadow-sm ${
                isBookmarked
                  ? 'bg-[var(--accent-primary)]/15 border-[var(--accent-primary)] text-[var(--accent-primary)] font-bold'
                  : 'bg-[var(--bg-subtle)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-main)]'
              }`}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={handleShare}
              title="Share Game"
              className="p-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors shadow-sm"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Main Game Info Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-start sm:items-center gap-4">
              {/* Game Icon */}
              <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-subtle)] shadow-sm flex-shrink-0">
                <GameImage
                  src={game.icon}
                  alt={game.title}
                  category={game.category}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title, Developer, Badges */}
              <div className="space-y-1.5">
                <div className="flex items-center flex-wrap gap-2">
                  <h1 data-testid="modal-game-title" className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)]">
                    {game.title}
                  </h1>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/40 text-[var(--accent-primary)] text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Safe
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <span className="font-semibold text-[var(--text-main)]">{game.developer}</span>
                  <span>•</span>
                  <span className="text-[var(--accent-primary)] font-semibold">{game.category}</span>
                  {game.subCategory && (
                    <>
                      <span>•</span>
                      <span>{game.subCategory}</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-1 text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-bold bg-[var(--bg-subtle)] px-2 py-0.5 rounded-md border border-[var(--border-color)]">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{game.rating.toFixed(1)}</span>
                    <span className="text-[var(--text-secondary)] text-[10px] font-normal">
                      ({game.reviewCount})
                    </span>
                  </div>

                  <div className="text-[var(--text-secondary)] bg-[var(--bg-subtle)] px-2 py-0.5 rounded-md border border-[var(--border-color)]">
                    <span className="text-[var(--text-main)] font-semibold">{game.downloads}</span> downloads
                  </div>
                </div>
              </div>
            </div>

            {/* Clear Download Actions */}
            <div className="w-full sm:w-auto flex flex-col gap-2 flex-shrink-0">
              <button
                onClick={() => onDownload(game)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-primary-text)] text-sm font-extrabold uppercase tracking-wide shadow-md active:scale-95 transition-all"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Download APK ({game.fileSize})</span>
              </button>

              <a
                href={game.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--border-color)] border border-[var(--border-color)] text-[var(--text-main)] text-xs font-semibold transition-colors shadow-sm"
              >
                <span>Official App Portal</span>
                <ExternalLink className="w-3 h-3 text-[var(--accent-secondary)]" />
              </a>
            </div>
          </div>

          {/* Quick Technical Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center gap-3 shadow-sm">
              <div className="p-2 rounded-lg bg-[var(--bg-subtle)] text-[var(--accent-primary)]">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-bold text-[var(--text-secondary)]">Version</div>
                <div className="text-xs font-extrabold text-[var(--text-main)] truncate">{game.version}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center gap-3 shadow-sm">
              <div className="p-2 rounded-lg bg-[var(--bg-subtle)] text-[var(--accent-secondary)]">
                <HardDrive className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-bold text-[var(--text-secondary)]">File Size</div>
                <div className="text-xs font-extrabold text-[var(--text-main)] truncate">{game.fileSize}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center gap-3 shadow-sm">
              <div className="p-2 rounded-lg bg-[var(--bg-subtle)] text-[var(--accent-primary)]">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-bold text-[var(--text-secondary)]">Requires OS</div>
                <div className="text-xs font-extrabold text-[var(--text-main)] truncate">{game.minAndroid}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center gap-3 shadow-sm">
              <div className="p-2 rounded-lg bg-[var(--bg-subtle)] text-amber-500">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-bold text-[var(--text-secondary)]">Last Updated</div>
                <div className="text-xs font-extrabold text-[var(--text-main)] truncate">{game.updatedDate}</div>
              </div>
            </div>
          </div>

          {/* Game Screenshots Gallery */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-main)] flex items-center gap-1.5">
                <span>In-Game Screenshots</span>
                <span className="text-[11px] text-[var(--text-secondary)] font-normal">
                  ({game.screenshots.length} previews)
                </span>
              </h2>
              <span className="text-[11px] text-[var(--text-secondary)]">Click image to expand</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {game.screenshots.map((shot, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedScreenshot(shot)}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-subtle)] cursor-pointer hover:border-[var(--accent-primary)] transition-all shadow-sm"
                >
                  <img
                    src={shot}
                    alt={`${game.title} preview ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-2 rounded-full bg-[var(--bg-secondary)] text-[var(--accent-primary)] border border-[var(--border-color)] shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description & Features Tabs */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[var(--border-color)]">
              <button
                onClick={() => setActiveTab('about')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-bold transition-colors border-b-2 ${
                  activeTab === 'about'
                    ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-main)]'
                }`}
              >
                About Game
              </button>

              <button
                onClick={() => setActiveTab('features')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-bold transition-colors border-b-2 ${
                  activeTab === 'features'
                    ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-main)]'
                }`}
              >
                Key Features ({game.features.length})
              </button>

              {game.whatsNew && (
                <button
                  onClick={() => setActiveTab('changelog')}
                  className={`pb-2.5 px-3 text-xs sm:text-sm font-bold transition-colors border-b-2 ${
                    activeTab === 'changelog'
                      ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
                      : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-main)]'
                  }`}
                >
                  What&apos;s New
                </button>
              )}
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm">
              {activeTab === 'about' && (
                <div className="space-y-3">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {game.fullDescription}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {game.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {game.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-main)] font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'changelog' && (
                <div className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                  <div className="font-bold text-[var(--text-main)] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>Recent Update ({game.version})</span>
                  </div>
                  <p>{game.whatsNew}</p>
                </div>
              )}
            </div>
          </div>

          {/* Safe & Authorized Download Guarantee */}
          <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] flex items-center justify-between flex-wrap gap-2 text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>
                Package:{' '}
                <code className="text-[var(--text-main)] font-semibold bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-color)]">
                  {game.packageName}
                </code>
              </span>
            </div>
            <div className="text-[11px] text-[var(--text-secondary)]">
              Verified by Google Play Protect & VirusTotal Scan
            </div>
          </div>

          {/* Related Games Section (Compact horizontal cards!) */}
          {relatedGames.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-main)]">
                  Related & Similar Games
                </h2>
                <span className="text-xs text-[var(--text-secondary)]">
                  More in {game.category}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {relatedGames.map((relGame) => (
                  <GameCard
                    key={relGame.id}
                    game={relGame}
                    onSelect={(g) => {
                      onSelectGame(g);
                    }}
                    onDownload={(g) => {
                      onDownload(g);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox for screenshots */}
      {selectedScreenshot && (
        <div
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedScreenshot(null)}
        >
          <button
            onClick={() => setSelectedScreenshot(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedScreenshot}
            alt="Fullscreen preview"
            className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
