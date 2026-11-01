import React from 'react';
import { X, ShieldCheck, Award, Zap, CheckCircle2 } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[var(--modal-overlay)] backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-5 sm:p-7 z-10 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-emerald-500 to-teal-400 shadow-md flex-shrink-0">
              <img
                src="/yono-hub-logo.jpg"
                alt="Yono Hub Logo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--text-main)]">About Yono Hub</h2>
              <p className="text-xs text-[var(--text-secondary)]">Explore • Play • Grow</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-main)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Vision & Mission */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--accent-primary)]">
            Our Mission
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Yono Hub was designed from the ground up to provide mobile gamers with an
            uncluttered, ultra-fast, and trustworthy portal to discover and download the
            finest Android games. We cut through the noise of bloated app stores to offer a
            streamlined, horizontal browsing experience focused on speed and safety.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-1.5 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-[var(--accent-primary)]" />
            <h4 className="text-xs font-bold text-[var(--text-main)]">100% Safe & Tested</h4>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Every package is verified with VirusTotal and multi-engine scanners before listing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-1.5 shadow-sm">
            <Zap className="w-5 h-5 text-[var(--accent-secondary)]" />
            <h4 className="text-xs font-bold text-[var(--text-main)]">High-Speed Mirrors</h4>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Global content delivery network provides rapid, unthrottled direct downloads.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-1.5 shadow-sm">
            <Award className="w-5 h-5 text-amber-500" />
            <h4 className="text-xs font-bold text-[var(--text-main)]">Strict Editorial Pick</h4>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Handpicked games curated by seasoned mobile gaming enthusiasts.
            </p>
          </div>
        </div>

        {/* Developer & DMCA Commitment */}
        <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-2 text-xs text-[var(--text-secondary)]">
          <div className="font-semibold text-[var(--text-main)] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)]" />
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
            className="px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-primary-text)] text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
