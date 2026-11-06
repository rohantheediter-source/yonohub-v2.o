import React, { useState } from 'react';
import { Gamepad2, Trophy, Crown } from 'lucide-react';
import type { GameCategory } from '../types/game';

interface GameImageProps {
  src: string;
  alt: string;
  category?: string | GameCategory;
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
      case 'Diwa':
        return 'from-amber-500/20 to-rose-600/30 text-amber-500';
      case 'Rummy':
        return 'from-emerald-500/20 to-teal-600/30 text-emerald-500';
      default:
        return 'from-[#8B5CF6]/20 to-[#00D6B5]/20 text-[#00D6B5]';
    }
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'Diwa':
        return <Crown className="w-1/2 h-1/2" />;
      case 'Rummy':
        return <Trophy className="w-1/2 h-1/2" />;
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
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${isIcon ? 'rounded-xl' : ''}`}
      />
    </div>
  );
};
