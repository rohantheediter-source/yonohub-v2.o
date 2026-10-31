import React from 'react';
import {
  Gamepad2,
  ShieldCheck,
  ChevronUp,
  Lock,
} from 'lucide-react';
import type { GameCategory } from '../types/game';

interface FooterProps {
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onSelectCategory: (category: GameCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAbout,
  onOpenContact,
  onOpenPrivacy,
  onOpenTerms,
  onSelectCategory,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#111318] border-t border-[#303946] mt-16 text-xs text-[#A7B0BE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Description */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#8B5CF6] to-[#00D6B5] p-[1.5px]">
                <div className="w-full h-full bg-[#111318] rounded-[6px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-[#00D6B5]" />
                </div>
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                NEXUS<span className="text-[#00D6B5]">PLAY</span>
              </span>
            </div>
            <p className="text-xs text-[#A7B0BE] leading-relaxed">
              A modern, independent mobile gaming download platform. Discover verified, safe,
              and high-performance Android games in one unified interface.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-[#00D6B5]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Virus-Free & Safe Downloads</span>
            </div>
          </div>

          {/* Col 2: Popular Genres */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Explore Genres
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onSelectCategory('Action')}
                  className="hover:text-[#00D6B5] transition-colors"
                >
                  Action Games
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Adventure')}
                  className="hover:text-[#00D6B5] transition-colors"
                >
                  Adventure & RPG
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Racing')}
                  className="hover:text-[#00D6B5] transition-colors"
                >
                  High-Speed Racing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Strategy')}
                  className="hover:text-[#00D6B5] transition-colors"
                >
                  Strategy & Tactical
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Puzzle')}
                  className="hover:text-[#00D6B5] transition-colors"
                >
                  Mind & Puzzle
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Information */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Platform & Legal
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-[#00D6B5] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#00D6B5] transition-colors"
                >
                  Contact Us & Feedback
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-[#00D6B5] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-[#00D6B5] transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Community & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Connect & Community
            </h4>
            <p className="text-xs text-[#A7B0BE] leading-relaxed">
              Join fellow mobile gamers, submit requests, and stay updated on the latest releases.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Discord"
                className="w-8 h-8 rounded-lg bg-[#191E27] border border-[#303946] flex items-center justify-center text-[#A7B0BE] hover:text-[#00D6B5] hover:border-[#00D6B5] transition-colors"
              >
                <span className="font-bold text-xs">DC</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                title="X / Twitter"
                className="w-8 h-8 rounded-lg bg-[#191E27] border border-[#303946] flex items-center justify-center text-[#A7B0BE] hover:text-[#00D6B5] hover:border-[#00D6B5] transition-colors"
              >
                <span className="font-bold text-xs">X</span>
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram"
                className="w-8 h-8 rounded-lg bg-[#191E27] border border-[#303946] flex items-center justify-center text-[#A7B0BE] hover:text-[#00D6B5] hover:border-[#00D6B5] transition-colors"
              >
                <span className="font-bold text-xs">TG</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="w-8 h-8 rounded-lg bg-[#191E27] border border-[#303946] flex items-center justify-center text-[#A7B0BE] hover:text-[#00D6B5] hover:border-[#00D6B5] transition-colors"
              >
                <span className="font-bold text-xs">YT</span>
              </a>
            </div>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-[#A7B0BE]">
              <Lock className="w-3.5 h-3.5 text-[#00D6B5]" />
              <span>SSL 256-Bit Encrypted Data Transfer</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 border-t border-[#303946]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left text-[11px] text-[#A7B0BE] leading-relaxed">
            <p>© {new Date().getFullYear()} NexusPlay. All rights reserved.</p>
            <p className="text-[#A7B0BE]/70 mt-0.5">
              All mobile game titles, developer trademarks, and assets are property of their respective copyright holders.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#191E27] hover:bg-[#202733] border border-[#303946] text-[#A7B0BE] hover:text-white transition-colors text-xs flex-shrink-0"
          >
            <span>Back to Top</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
