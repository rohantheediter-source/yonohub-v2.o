import React from 'react';

interface FloatingTelegramProps {
  url?: string;
}

export const FloatingTelegram: React.FC<FloatingTelegramProps> = ({
  url = 'https://t.me/+jIIGcRbh3Hc3MmU1',
}) => {
  return (
    <aside
      aria-label="Telegram Community"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center group select-none"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join our official Telegram channel"
        title="Join our official Telegram channel"
        className="relative flex items-center gap-2.5 px-4 py-2.5 sm:px-4.5 sm:py-3 rounded-full bg-gradient-to-r from-[#2AABEE] via-[#229ED9] to-[#0088cc] text-white font-bold text-xs sm:text-sm shadow-xl shadow-[#229ED9]/35 hover:shadow-2xl hover:shadow-[#229ED9]/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/25 cursor-pointer backdrop-blur-sm"
      >
        {/* Pulsing radar ring */}
        <span className="absolute -inset-1 rounded-full bg-[#2AABEE]/35 animate-ping pointer-events-none" />

        {/* Telegram Paper Plane Icon */}
        <span className="relative flex-shrink-0 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm">
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full fill-current"
            aria-hidden="true"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.196 1.006.128.832.946z" />
          </svg>
        </span>

        {/* Text Label */}
        <span className="relative flex flex-col leading-tight pr-0.5 text-left">
          <span className="text-[10px] text-white/85 font-medium uppercase tracking-wider hidden sm:block">
            Official Channel
          </span>
          <span className="font-extrabold tracking-tight drop-shadow-sm flex items-center gap-1.5">
            Join Telegram
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
          </span>
        </span>
      </a>
    </aside>
  );
};

