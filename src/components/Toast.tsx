import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-60 animate-in fade-in slide-in-from-bottom-3 duration-200 pointer-events-none">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent-primary)] text-[var(--text-main)] text-xs font-semibold shadow-2xl">
        <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] flex-shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
};
