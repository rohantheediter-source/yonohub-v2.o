import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-60 animate-in fade-in slide-in-from-bottom-3 duration-200 pointer-events-none">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#191E27] border border-[#00D6B5] text-white text-xs font-medium shadow-2xl shadow-[#00D6B5]/10">
        <CheckCircle2 className="w-4 h-4 text-[#00D6B5] flex-shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
};
