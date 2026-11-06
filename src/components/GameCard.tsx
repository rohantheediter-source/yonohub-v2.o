import React from 'react';
import { Download, Star, Sparkles, HardDrive, Cpu } from 'lucide-react';
import type { Game } from '../types/game';
import { GameImage } from './GameImage';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
  onDownload: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onSelect,
  onDownload,
}) => {
  const isDiwa = game.category === 'Diwa' || game.isDiwa;
  const isRummy = (game.isRummy || game.category === 'Rummy') && !isDiwa;

  return (
    <article
      data-testid="game-card"
      aria-label={game.title}
      onClick={() => onSelect(game)}
      className="game-card-transition group relative flex flex-row items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-teal-500/60 hover:bg-[var(--bg-card-hover)] cursor-pointer shadow-sm"
    >
      {/* LEFT SIDE: Square game icon */}
      <div className="relative flex-shrink-0 w-13 h-13 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-[var(--border-color)] group-hover:border-teal-500/40 bg-[var(--bg-subtle)] shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
        <GameImage
          src={game.icon}
          alt={game.title}
          category={game.category}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {game.isEditorsChoice && (
          <div
            title="Editors' Choice"
            className="absolute top-0 right-0 bg-gradient-to-bl from-amber-500 to-orange-500 text-white p-0.5 rounded-bl-md shadow-sm"
          >
            <Sparkles className="w-2.5 h-2.5" />
          </div>
        )}
      </div>

      {/* MIDDLE SECTION: Title, short description, category, size & version */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {/* Title row */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
          <h3 className="text-sm sm:text-base font-bold text-[var(--text-main)] group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors truncate">
            {game.title}
          </h3>

          {/* Star rating pill */}
          <div className="flex-shrink-0 flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/25 text-[10px] font-bold text-amber-600 dark:text-amber-400">
            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
            <span>{game.rating.toFixed(1)}</span>
          </div>

          {game.isPopular && (
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Hot
            </span>
          )}

          {game.isNew && (
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/30 text-[9px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              New
            </span>
          )}
        </div>

        {/* Short description */}
        <p className="text-xs text-[var(--text-secondary)] line-clamp-1 sm:line-clamp-1 mb-1.5 leading-snug">
          {game.shortDescription}
        </p>

        {/* Meta badges: Category, Size, Version */}
        <div className="flex items-center flex-wrap gap-1.5 text-[10px] sm:text-[11px] text-[var(--text-secondary)]">
          <span
            className={`px-2 py-0.5 rounded-md border font-semibold ${
              isDiwa
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                : isRummy
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30'
            }`}
          >
            {isDiwa ? 'Diwa' : isRummy ? 'Rummy' : 'Games'}
          </span>

          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] border border-[var(--border-color)]/70">
            <HardDrive className="w-2.5 h-2.5 text-[var(--text-secondary)]" />
            <span>{game.fileSize}</span>
          </span>

          <span className="hidden xs:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] border border-[var(--border-color)]/70">
            <Cpu className="w-2.5 h-2.5 text-[var(--text-secondary)]" />
            <span>{game.version}</span>
          </span>

          <span className="hidden md:inline-block text-[var(--text-muted)]">
            • {game.downloads} dl
          </span>
        </div>
      </div>

      {/* RIGHT SIDE: Clear DOWNLOAD button */}
      <div className="flex-shrink-0 pl-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDownload(game);
          }}
          aria-label={`Download ${game.title}`}
          className="btn-gaming-gradient flex items-center justify-center gap-1 sm:gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-white text-xs sm:text-sm font-bold tracking-wide shadow-sm hover:shadow-lg transition-all duration-200 active:scale-95 group/btn"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5] group-hover/btn:translate-y-0.5 transition-transform duration-200" />
          <span className="uppercase">Download</span>
        </button>
      </div>
    </article>
  );
};
