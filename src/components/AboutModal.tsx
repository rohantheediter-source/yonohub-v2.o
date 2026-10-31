import React from 'react';
import { X, ShieldCheck, Gamepad2, Award, Zap, CheckCircle2 } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#191E27] border border-[#303946] rounded-2xl shadow-2xl p-5 sm:p-7 z-10 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#303946]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#202733] border border-[#303946] flex items-center justify-center text-[#00D6B5]">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">About NexusPlay</h2>
              <p className="text-xs text-[#A7B0BE]">Premium Mobile Gaming Hub</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#202733] border border-[#303946] text-[#A7B0BE] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Vision & Mission */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-[#00D6B5]">
            Our Mission
          </h3>
          <p className="text-sm text-[#A7B0BE] leading-relaxed">
            NexusPlay was designed from the ground up to provide mobile gamers with an
            uncluttered, ultra-fast, and trustworthy portal to discover and download the
            finest Android games. We cut through the noise of bloated app stores to offer a
            streamlined, horizontal browsing experience focused on speed and safety.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-[#202733] border border-[#303946] space-y-1.5">
            <ShieldCheck className="w-5 h-5 text-[#00D6B5]" />
            <h4 className="text-xs font-bold text-white">100% Safe & Tested</h4>
            <p className="text-[11px] text-[#A7B0BE] leading-relaxed">
              Every package is verified with VirusTotal and multi-engine scanners before listing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#202733] border border-[#303946] space-y-1.5">
            <Zap className="w-5 h-5 text-[#8B5CF6]" />
            <h4 className="text-xs font-bold text-white">High-Speed Mirrors</h4>
            <p className="text-[11px] text-[#A7B0BE] leading-relaxed">
              Global content delivery network provides rapid, unthrottled direct downloads.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#202733] border border-[#303946] space-y-1.5">
            <Award className="w-5 h-5 text-amber-400" />
            <h4 className="text-xs font-bold text-white">Strict Editorial Pick</h4>
            <p className="text-[11px] text-[#A7B0BE] leading-relaxed">
              Handpicked games curated by seasoned mobile gaming enthusiasts.
            </p>
          </div>
        </div>

        {/* Developer & DMCA Commitment */}
        <div className="p-4 rounded-xl bg-[#111318] border border-[#303946] space-y-2 text-xs text-[#A7B0BE]">
          <div className="font-semibold text-white flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#00D6B5]" />
            <span>Developer Support & Legitimate Distribution</span>
          </div>
          <p className="leading-relaxed">
            We respect developer intellectual property. All trademarks, game logos, and digital
            assets belong to their respective developers and publishers. We provide authorized
            store links to Google Play alongside safe direct package mirrors.
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#00D6B5] hover:bg-[#00D6B5]/90 text-[#111318] text-xs font-bold uppercase tracking-wider"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
