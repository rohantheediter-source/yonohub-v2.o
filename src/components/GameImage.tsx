import React, { useState } from 'react';
import { Gamepad2, Swords, Compass, Car, ShieldAlert, Zap, Puzzle as PuzzleIcon } from 'lucide-react';
import type { GameCategory } from '../types/game';

interface GameImageProps {
  src: string;
  alt: string;
  category: GameCategory;
  className?: string;
  isIcon?: boolean;
}

export const GameImage: React.FC<GameImageProps> = ({
  src,
  alt,
  category,
  className = '',
  isIcon = true,
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Category based theme gradient for fallback
  const getCategoryColor = () => {
    switch (category) {
      case 'Action':
        return 'from-rose-500/20 to-red-600/30 text-rose-400';
      case 'Adventure':
        return 'from-emerald-500/20 to-teal-600/30 text-[#00D6B5]';
      case 'Racing':
        return 'from-amber-500/20 to-orange-600/30 text-amber-400';
      case 'Strategy':
        return 'from-purple-500/20 to-violet-600/30 text-[#8B5CF6]';
      case 'Arcade':
        return 'from-cyan-500/20 to-blue-600/30 text-cyan-400';
      case 'Puzzle':
        return 'from-pink-500/20 to-fuchsia-600/30 text-pink-400';
      case 'Rummy':
        return 'from-emerald-500/20 to-teal-600/30 text-emerald-500';
      case 'Slots':
        return 'from-amber-500/20 to-yellow-600/30 text-amber-500';
      default:
        return 'from-[#8B5CF6]/20 to-[#00D6B5]/20 text-[#00D6B5]';
    }
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'Action':
        return <Swords className="w-1/2 h-1/2" />;
      case 'Adventure':
        return <Compass className="w-1/2 h-1/2" />;
      case 'Racing':
        return <Car className="w-1/2 h-1/2" />;
      case 'Strategy':
        return <ShieldAlert className="w-1/2 h-1/2" />;
      case 'Arcade':
        return <Zap className="w-1/2 h-1/2" />;
      case 'Puzzle':
        return <PuzzleIcon className="w-1/2 h-1/2" />;
      default:
        return <Gamepad2 className="w-1/2 h-1/2" />;
    }
  };

  if (error || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br ${getCategoryColor()} border border-[#303946] overflow-hidden ${className}`}
        aria-label={alt}
      >
        {getCategoryIcon()}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#191E27] ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-[#191E27] animate-pulse flex items-center justify-center">
          <Gamepad2 className="w-5 h-5 text-[#303946]" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${isIcon ? 'rounded-xl' : ''}`}
      />
    </div>
  );
};
