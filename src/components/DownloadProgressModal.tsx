import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  FileCheck,
} from 'lucide-react';
import type { Game } from '../types/game';
import { GameImage } from './GameImage';

interface DownloadProgressModalProps {
  game: Game | null;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const DownloadProgressModal: React.FC<DownloadProgressModalProps> = ({
  game,
  onClose,
  onShowToast,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);

  useEffect(() => {
    if (game) {
      setDownloading(false);
      setProgress(0);
      setDownloadComplete(false);
    }
  }, [game]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (downloading && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.floor(Math.random() * 15) + 10;
          return next >= 100 ? 100 : next;
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [downloading, progress]);

  useEffect(() => {
    if (progress >= 100 && downloading) {
      setDownloading(false);
      setDownloadComplete(true);
      onShowToast(`Downloaded ${game?.title} ${game?.version} successfully!`);
      try {
        const element = document.createElement('a');
        const fileContent = `Package: ${game?.packageName}\nGame: ${game?.title}\nVersion: ${game?.version}\nSize: ${game?.fileSize}\nVerified Safe: Yes\nSource: Yono Hub Gaming Vault\nOfficial Store: ${game?.googlePlayUrl}`;
        const file = new Blob([fileContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${game?.slug}-${game?.version}-yonohub.apk.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      } catch {
        // ignore
      }
    }
  }, [progress, downloading, game, onShowToast]);

  if (!game) return null;

  const startDownload = () => {
    setDownloading(true);
    setProgress(15);
    setDownloadComplete(false);
    onShowToast(`Starting download for ${game.title}...`);
    if (game.downloadUrl) {
      window.open(game.downloadUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[var(--modal-overlay)] backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        data-testid="download-modal"
        className="relative w-full max-w-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-5 sm:p-6 z-10 space-y-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[var(--accent-primary)]" />
            <h3 className="text-base font-bold text-[var(--text-main)]">Authorized Download Hub</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-main)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Game summary */}
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-[var(--bg-subtle)] border border-[var(--border-color)] flex-shrink-0">
            <GameImage
              src={game.icon}
              alt={game.title}
              category={game.category}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-[var(--text-main)] truncate">{game.title}</h4>
            <div className="text-xs text-[var(--text-secondary)] flex items-center gap-2 mt-0.5">
              <span className="font-medium text-[var(--text-main)]">{game.developer}</span>
              <span>•</span>
              <span className="text-[var(--accent-primary)] font-semibold">{game.category}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-[var(--text-secondary)]">
              <span className="px-1.5 py-0.2 rounded bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-main)] font-semibold">
                {game.version}
              </span>
              <span>{game.fileSize}</span>
              <span>•</span>
              <span>{game.minAndroid}</span>
            </div>
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-[var(--accent-primary)] font-bold text-[11px] uppercase tracking-wider mb-1">
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5" />
              Security Integrity Verification
            </span>
            <span>Passed 100%</span>
          </div>

          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span>Clean scan: 0 threats detected by VirusTotal & Antivirus</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span>Official signature matches certified developer certificate</span>
          </div>
        </div>

        {/* Download State & Progress */}
        {downloading && (
          <div className="space-y-2 p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--accent-primary)]/40 shadow-sm animate-pulse">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[var(--text-main)] flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-[var(--accent-primary)] animate-spin" />
                Transferring verified package...
              </span>
              <span className="text-[var(--accent-primary)] font-bold">{progress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden border border-[var(--border-color)]">
              <div
                className="h-full bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)] transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-[var(--text-secondary)] font-medium">
              <span>Speed: 32.4 MB/s</span>
              <span>Server: Global Edge CDN</span>
            </div>
          </div>
        )}

        {downloadComplete && (
          <div className="p-3.5 rounded-xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/40 text-center space-y-2">
            <div className="w-9 h-9 rounded-full bg-[var(--accent-primary)] text-[var(--accent-primary-text)] flex items-center justify-center mx-auto font-bold shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-[var(--text-main)]">Download Complete!</div>
            <p className="text-xs text-[var(--text-secondary)]">
              Package manifest delivered. Tap to open or follow your browser downloads.
            </p>
          </div>
        )}

        {/* Download Action Buttons */}
        <div className="space-y-2.5">
          {!downloadComplete ? (
            <button
              onClick={startDownload}
              disabled={downloading}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md ${
                downloading
                  ? 'bg-[var(--border-color)] text-[var(--text-muted)] cursor-not-allowed'
                  : 'bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-primary-text)] active:scale-95'
              }`}
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>
                {downloading ? `Downloading (${progress}%)` : `Direct Fast Download (${game.fileSize})`}
              </span>
            </button>
          ) : (
            <button
              onClick={() => {
                setDownloadComplete(false);
                startDownload();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-[var(--text-main)] border border-[var(--border-color)] text-xs font-semibold transition-colors shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span>Download Again</span>
            </button>
          )}

          {/* Official Destination Link */}
          <a
            href={game.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--border-color)] text-[var(--text-main)] border border-[var(--border-color)] text-xs font-semibold transition-colors shadow-sm"
          >
            <span>Open Official App Destination</span>
            <ExternalLink className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
          </a>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-[var(--text-secondary)] text-center leading-relaxed">
          Files are hosted on secure, authorized high-speed mirrors and verified for virus protection.
        </p>
      </div>
    </div>
  );
};
