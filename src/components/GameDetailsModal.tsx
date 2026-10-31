import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Star,
  ExternalLink,
  ShieldCheck,
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
      // Check bookmark in localStorage
      try {
        const saved = localStorage.getItem(`bookmark_${game.id}`);
        setIsBookmarked(saved === 'true');
      } catch {
        // ignore
      }
      setSelectedScreenshot(null);
      setActiveTab('about');
      // Update document title
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Click outside to close overlay */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#191E27] border border-[#303946] rounded-2xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]">
        {/* Top Sticky Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#111318]/90 border-b border-[#303946] backdrop-blur-md flex-shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#A7B0BE] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Games</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleBookmark}
              title={isBookmarked ? 'Bookmarked' : 'Save Game'}
              className={`p-2 rounded-xl border transition-colors ${
                isBookmarked
                  ? 'bg-[#00D6B5]/20 border-[#00D6B5] text-[#00D6B5]'
                  : 'bg-[#202733] border-[#303946] text-[#A7B0BE] hover:text-white'
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
              className="p-2 rounded-xl bg-[#202733] border border-[#303946] text-[#A7B0BE] hover:text-white transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#202733] border border-[#303946] text-[#A7B0BE] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Main Game Info Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#202733] border border-[#303946] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              {/* Game Icon */}
              <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border border-[#303946] bg-[#111318] shadow-md flex-shrink-0">
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
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                    {game.title}
                  </h1>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00D6B5]/15 border border-[#00D6B5]/40 text-[#00D6B5] text-[10px] font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Safe
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#A7B0BE]">
                  <span className="font-medium text-white">{game.developer}</span>
                  <span>•</span>
                  <span className="text-[#00D6B5]">{game.category}</span>
                  {game.subCategory && (
                    <>
                      <span>•</span>
                      <span>{game.subCategory}</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-1 text-xs">
                  <div className="flex items-center gap-1 text-amber-400 font-bold bg-[#191E27] px-2 py-0.5 rounded-md border border-[#303946]">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{game.rating.toFixed(1)}</span>
                    <span className="text-[#A7B0BE] text-[10px] font-normal">
                      ({game.reviewCount})
                    </span>
                  </div>

                  <div className="text-[#A7B0BE] bg-[#191E27] px-2 py-0.5 rounded-md border border-[#303946]">
                    <span className="text-white font-semibold">{game.downloads}</span> downloads
                  </div>
                </div>
              </div>
            </div>

            {/* Clear Download Actions */}
            <div className="w-full sm:w-auto flex flex-col gap-2 flex-shrink-0">
              <button
                onClick={() => onDownload(game)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#00D6B5] hover:bg-[#00D6B5]/90 text-[#111318] text-sm font-extrabold uppercase tracking-wide shadow-lg shadow-[#00D6B5]/20 active:scale-95 transition-all"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Download APK ({game.fileSize})</span>
              </button>

              <a
                href={game.googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#191E27] hover:bg-[#202733] border border-[#303946] text-[#A7B0BE] hover:text-white text-xs font-semibold transition-colors"
              >
                <span>Google Play Store</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Technical Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-[#202733] border border-[#303946] flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#191E27] text-[#00D6B5]">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-semibold text-[#A7B0BE]">Version</div>
                <div className="text-xs font-bold text-white truncate">{game.version}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#202733] border border-[#303946] flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#191E27] text-[#8B5CF6]">
                <HardDrive className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-semibold text-[#A7B0BE]">File Size</div>
                <div className="text-xs font-bold text-white truncate">{game.fileSize}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#202733] border border-[#303946] flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#191E27] text-[#00D6B5]">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-semibold text-[#A7B0BE]">Requires OS</div>
                <div className="text-xs font-bold text-white truncate">{game.minAndroid}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#202733] border border-[#303946] flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#191E27] text-amber-400">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-semibold text-[#A7B0BE]">Last Updated</div>
                <div className="text-xs font-bold text-white truncate">{game.updatedDate}</div>
              </div>
            </div>
          </div>

          {/* Game Screenshots Gallery */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <span>In-Game Screenshots</span>
                <span className="text-[11px] text-[#A7B0BE] font-normal">
                  ({game.screenshots.length} previews)
                </span>
              </h2>
              <span className="text-[11px] text-[#A7B0BE]">Click image to expand</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {game.screenshots.map((shot, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedScreenshot(shot)}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-[#303946] bg-[#111318] cursor-pointer hover:border-[#00D6B5] transition-all shadow-sm"
                >
                  <img
                    src={shot}
                    alt={`${game.title} preview ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-2 rounded-full bg-[#111318]/80 text-[#00D6B5] border border-[#303946]">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description & Features Tabs */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#303946]">
              <button
                onClick={() => setActiveTab('about')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
                  activeTab === 'about'
                    ? 'border-[#00D6B5] text-[#00D6B5]'
                    : 'border-transparent text-[#A7B0BE] hover:text-white'
                }`}
              >
                About Game
              </button>

              <button
                onClick={() => setActiveTab('features')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
                  activeTab === 'features'
                    ? 'border-[#00D6B5] text-[#00D6B5]'
                    : 'border-transparent text-[#A7B0BE] hover:text-white'
                }`}
              >
                Key Features ({game.features.length})
              </button>

              {game.whatsNew && (
                <button
                  onClick={() => setActiveTab('changelog')}
                  className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
                    activeTab === 'changelog'
                      ? 'border-[#00D6B5] text-[#00D6B5]'
                      : 'border-transparent text-[#A7B0BE] hover:text-white'
                  }`}
                >
                  What&apos;s New
                </button>
              )}
            </div>

            <div className="p-4 rounded-xl bg-[#202733]/60 border border-[#303946]">
              {activeTab === 'about' && (
                <div className="space-y-3">
                  <p className="text-sm text-[#A7B0BE] leading-relaxed">
                    {game.fullDescription}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {game.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-[#191E27] border border-[#303946] text-xs text-[#A7B0BE]"
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
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-[#191E27] border border-[#303946] text-xs text-white"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00D6B5] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'changelog' && (
                <div className="space-y-2 text-xs text-[#A7B0BE] leading-relaxed">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00D6B5]" />
                    <span>Recent Update ({game.version})</span>
                  </div>
                  <p>{game.whatsNew}</p>
                </div>
              )}
            </div>
          </div>

          {/* Safe & Authorized Download Guarantee */}
          <div className="p-3.5 rounded-xl bg-[#111318] border border-[#303946] flex items-center justify-between flex-wrap gap-2 text-xs text-[#A7B0BE]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00D6B5]" />
              <span>
                Package:{' '}
                <code className="text-white bg-[#191E27] px-1.5 py-0.5 rounded border border-[#303946]">
                  {game.packageName}
                </code>
              </span>
            </div>
            <div className="text-[11px] text-[#A7B0BE]">
              Verified by Google Play Protect & VirusTotal Scan
            </div>
          </div>

          {/* Related Games Section (Compact horizontal cards!) */}
          {relatedGames.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                  Related & Similar Games
                </h2>
                <span className="text-xs text-[#A7B0BE]">
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
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedScreenshot(null)}
        >
          <button
            onClick={() => setSelectedScreenshot(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
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
