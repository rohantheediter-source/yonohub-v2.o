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
  return (
    <div
      data-testid="game-card"
      onClick={() => onSelect(game)}
      className="group relative flex flex-row items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--border-active)] hover:bg-[var(--bg-card-hover)] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
    >
      {/* LEFT SIDE: Square game icon */}
      <div className="relative flex-shrink-0 w-13 h-13 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-subtle)] shadow-sm group-hover:scale-105 transition-transform duration-200">
        <GameImage
          src={game.icon}
          alt={game.title}
          category={game.category}
          className="w-full h-full object-cover"
        />
        {game.isEditorsChoice && (
          <div
            title="Editors' Choice"
            className="absolute top-0 right-0 bg-[var(--accent-primary)] text-[var(--accent-primary-text)] p-0.5 rounded-bl-md"
          >
            <Sparkles className="w-2.5 h-2.5" />
          </div>
        )}
      </div>

      {/* MIDDLE SECTION: Title, short description, category, size & version */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {/* Title row */}
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-sm sm:text-base font-bold text-[var(--text-main)] group-hover:text-[var(--accent-primary)] transition-colors truncate">
            {game.title}
          </h3>

          {/* Star rating pill */}
          <div className="flex-shrink-0 flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[10px] font-bold text-amber-500">
            <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
            <span>{game.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Short description */}
        <p className="text-xs text-[var(--text-secondary)] line-clamp-1 sm:line-clamp-1 mb-1.5 leading-snug">
          {game.shortDescription}
        </p>

        {/* Meta badges: Category, Size, Version */}
        <div className="flex items-center flex-wrap gap-1.5 text-[10px] sm:text-[11px] text-[var(--text-secondary)]">
          <span className="px-2 py-0.5 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-color)] font-semibold text-[var(--accent-primary)]">
            {game.category}
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
          className="flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-primary-text)] text-xs sm:text-sm font-bold tracking-wide shadow-sm hover:shadow-md transition-all duration-150 active:scale-95"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="uppercase">Download</span>
        </button>
      </div>
    </div>
  );
};
