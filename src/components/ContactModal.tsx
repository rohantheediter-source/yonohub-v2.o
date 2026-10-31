import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Game Suggestion');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      onShowToast('Please fill in all required fields.');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      onShowToast('Message received! Our team will respond within 24 hours.');
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setMessage('');
        onClose();
      }, 2000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#191E27] border border-[#303946] rounded-2xl shadow-2xl p-5 sm:p-6 z-10 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#303946]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#202733] border border-[#303946] text-[#00D6B5]">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Contact Us</h3>
              <p className="text-xs text-[#A7B0BE]">Support, Game Requests & Feedback</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#202733] border border-[#303946] text-[#A7B0BE] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-3 bg-[#202733] rounded-xl border border-[#00D6B5]/30">
            <div className="w-12 h-12 rounded-full bg-[#00D6B5]/20 text-[#00D6B5] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-white">Message Sent!</h4>
            <p className="text-xs text-[#A7B0BE] leading-relaxed">
              Thank you for reaching out to NexusPlay. We will review your inquiry and follow up shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#A7B0BE]">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Gamer tag or full name"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#202733] border border-[#303946] text-white focus:outline-none focus:border-[#00D6B5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#A7B0BE]">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#202733] border border-[#303946] text-white focus:outline-none focus:border-[#00D6B5]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A7B0BE]">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#202733] border border-[#303946] text-white focus:outline-none focus:border-[#00D6B5]"
              >
                <option value="Game Suggestion">Request a Game</option>
                <option value="Broken Link">Report Broken Download</option>
                <option value="Developer Submission">Developer Submission</option>
                <option value="General Support">General Support</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A7B0BE]">Your Message</label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Let us know what you think, report an issue, or suggest games..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#202733] border border-[#303946] text-white focus:outline-none focus:border-[#00D6B5] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#00D6B5] hover:bg-[#00D6B5]/90 text-[#111318] text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#00D6B5]/15"
            >
              {isSending ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
