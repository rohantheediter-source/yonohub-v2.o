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
      onClick={() => onSelect(game)}
      className="group relative flex flex-row items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#202733] border border-[#303946] hover:border-[#00D6B5]/70 hover:bg-[#202733]/95 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-[#00D6B5]/5"
    >
      {/* LEFT SIDE: Square game icon */}
      <div className="relative flex-shrink-0 w-13 h-13 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-[#303946] bg-[#191E27] shadow-inner group-hover:scale-105 transition-transform duration-200">
        <GameImage
          src={game.icon}
          alt={game.title}
          category={game.category}
          className="w-full h-full object-cover"
        />
        {game.isEditorsChoice && (
          <div
            title="Editors' Choice"
            className="absolute top-0 right-0 bg-[#00D6B5] text-[#111318] p-0.5 rounded-bl-md"
          >
            <Sparkles className="w-2.5 h-2.5" />
          </div>
        )}
      </div>

      {/* MIDDLE SECTION: Title, short description, category, size & version */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {/* Title row */}
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00D6B5] transition-colors truncate">
            {game.title}
          </h3>

          {/* Star rating pill */}
          <div className="flex-shrink-0 flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[#191E27] border border-[#303946] text-[10px] font-semibold text-amber-400">
            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
            <span>{game.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Short description */}
        <p className="text-xs text-[#A7B0BE] line-clamp-1 sm:line-clamp-1 mb-1.5 leading-snug">
          {game.shortDescription}
        </p>

        {/* Meta badges: Category, Size, Version */}
        <div className="flex items-center flex-wrap gap-1.5 text-[10px] sm:text-[11px] text-[#A7B0BE]">
          <span className="px-2 py-0.5 rounded-md bg-[#191E27] border border-[#303946] font-medium text-[#00D6B5]">
            {game.category}
          </span>

          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#191E27]/70 border border-[#303946]/60">
            <HardDrive className="w-2.5 h-2.5 text-[#A7B0BE]" />
            <span>{game.fileSize}</span>
          </span>

          <span className="hidden xs:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#191E27]/70 border border-[#303946]/60">
            <Cpu className="w-2.5 h-2.5 text-[#A7B0BE]" />
            <span>{game.version}</span>
          </span>

          <span className="hidden md:inline-block text-[#A7B0BE]/70">
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
          className="flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-[#00D6B5] hover:bg-[#00D6B5]/90 text-[#111318] text-xs sm:text-sm font-bold tracking-wide shadow-md shadow-[#00D6B5]/15 transition-all duration-150 active:scale-95 group-hover:shadow-lg group-hover:shadow-[#00D6B5]/25"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden xs:inline uppercase">Download</span>
          <span className="xs:hidden uppercase">Get</span>
        </button>
      </div>
    </div>
  );
};
