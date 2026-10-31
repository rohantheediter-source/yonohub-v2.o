import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[var(--modal-overlay)] backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-5 sm:p-6 z-10 space-y-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--accent-primary)] shadow-sm">
              {isPrivacy ? <Shield className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--text-main)]">
                {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">Effective Date: October 2026</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-main)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs text-[var(--text-secondary)] leading-relaxed">
          {isPrivacy ? (
            <>
              <h4 className="text-sm font-bold text-[var(--text-main)]">1. Information We Collect</h4>
              <p>
                NexusPlay does not require account creation to browse or download games. We do
                not collect personal identifiers like your address or phone number. We may collect
                anonymized telemetry such as browser type and search queries to optimize server
                performance.
              </p>

              <h4 className="text-sm font-bold text-[var(--text-main)]">2. Local Storage</h4>
              <p>
                We use client-side local storage solely to retain your saved favorites and UI
                preferences locally on your device without transmitting them to external trackers.
              </p>

              <h4 className="text-sm font-bold text-[var(--text-main)]">3. Third-Party Links</h4>
              <p>
                Our platform contains outbound links to authorized platforms such as the Google
                Play Store. We encourage you to review their respective privacy practices.
              </p>
            </>
          ) : (
            <>
              <h4 className="text-sm font-bold text-[var(--text-main)]">1. Acceptance of Terms</h4>
              <p>
                By accessing and utilizing NexusPlay, you acknowledge and agree to comply with
                these Terms of Service. If you disagree with any portion, please discontinue
                use immediately.
              </p>

              <h4 className="text-sm font-bold text-[var(--text-main)]">2. Permitted Use & Safety</h4>
              <p>
                NexusPlay provides an index of mobile applications for informational and download
                purposes. Users agree not to reverse engineer, disrupt network connectivity, or
                attempt unauthorized scraping of our services.
              </p>

              <h4 className="text-sm font-bold text-[var(--text-main)]">3. Intellectual Property</h4>
              <p>
                All trademarks, copyrights, game titles, and digital assets belong to their
                respective owners. NexusPlay operates as an independent discovery directory.
              </p>
            </>
          )}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--border-color)] text-[var(--text-main)] text-xs font-semibold shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
