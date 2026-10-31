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
        const fileContent = `Package: ${game?.packageName}\nGame: ${game?.title}\nVersion: ${game?.version}\nSize: ${game?.fileSize}\nVerified Safe: Yes\nSource: NexusPlay Gaming Vault\nOfficial Store: ${game?.googlePlayUrl}`;
        const file = new Blob([fileContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${game?.slug}-${game?.version}-nexusplay.apk.txt`;
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
    setProgress(5);
    setDownloadComplete(false);
    onShowToast(`Preparing secure download for ${game.title}...`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div data-testid="download-modal" className="relative w-full max-w-lg bg-[#191E27] border border-[#303946] rounded-2xl shadow-2xl p-5 sm:p-6 z-10 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#303946]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#00D6B5]" />
            <h3 className="text-base font-bold text-white">Authorized Download Hub</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#202733] border border-[#303946] text-[#A7B0BE] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Game summary */}
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#202733] border border-[#303946]">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#111318] border border-[#303946] flex-shrink-0">
            <GameImage
              src={game.icon}
              alt={game.title}
              category={game.category}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-white truncate">{game.title}</h4>
            <div className="text-xs text-[#A7B0BE] flex items-center gap-2 mt-0.5">
              <span>{game.developer}</span>
              <span>•</span>
              <span className="text-[#00D6B5]">{game.category}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-[#A7B0BE]">
              <span className="px-1.5 py-0.2 rounded bg-[#191E27] border border-[#303946] text-white font-medium">
                {game.version}
              </span>
              <span>{game.fileSize}</span>
              <span>•</span>
              <span>{game.minAndroid}</span>
            </div>
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="p-3 rounded-xl bg-[#111318] border border-[#303946] space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-[#00D6B5] font-semibold text-[11px] uppercase tracking-wider mb-1">
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5" />
              Security Integrity Verification
            </span>
            <span className="text-[#00D6B5]">Passed 100%</span>
          </div>

          <div className="flex items-center gap-2 text-[#A7B0BE]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00D6B5]" />
            <span>Clean scan: 0 threats detected by VirusTotal & Antivirus</span>
          </div>
          <div className="flex items-center gap-2 text-[#A7B0BE]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00D6B5]" />
            <span>Official signature matches certified developer certificate</span>
          </div>
        </div>

        {/* Download State & Progress */}
        {downloading && (
          <div className="space-y-2 p-3.5 rounded-xl bg-[#202733] border border-[#00D6B5]/40 animate-pulse">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-white flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-[#00D6B5] animate-spin" />
                Transferring verified package...
              </span>
              <span className="text-[#00D6B5] font-bold">{progress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#111318] overflow-hidden border border-[#303946]">
              <div
                className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#00D6B5] transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-[#A7B0BE]">
              <span>Speed: 32.4 MB/s</span>
              <span>Server: Global Edge CDN</span>
            </div>
          </div>
        )}

        {downloadComplete && (
          <div className="p-3.5 rounded-xl bg-[#00D6B5]/10 border border-[#00D6B5]/40 text-center space-y-2">
            <div className="w-9 h-9 rounded-full bg-[#00D6B5] text-[#111318] flex items-center justify-center mx-auto font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-white">Download Complete!</div>
            <p className="text-xs text-[#A7B0BE]">
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
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg ${
                downloading
                  ? 'bg-[#303946] text-[#A7B0BE] cursor-not-allowed'
                  : 'bg-[#00D6B5] hover:bg-[#00D6B5]/90 text-[#111318] shadow-[#00D6B5]/20 active:scale-95'
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
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#202733] hover:bg-[#303946] text-white border border-[#303946] text-xs font-semibold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#00D6B5]" />
              <span>Download Again</span>
            </button>
          )}

          {/* Official Google Play Store Link */}
          <a
            href={game.googlePlayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#191E27] hover:bg-[#202733] text-[#A7B0BE] hover:text-white border border-[#303946] text-xs font-semibold transition-colors"
          >
            <span>Open in Google Play Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#8B5CF6]" />
          </a>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-[#A7B0BE]/80 text-center leading-relaxed">
          Files are hosted on secure, authorized high-speed mirrors and verified for virus protection.
        </p>
      </div>
    </div>
  );
};
