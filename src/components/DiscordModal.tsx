import { useAdminSettings } from "@/context/AdminSettings";
import { X, MessageCircle, Copy, Check } from "lucide-react";
import { useState } from "react";

interface DiscordModalProps {
  open: boolean;
  onClose: () => void;
}

export const DiscordModal = ({ open, onClose }: DiscordModalProps) => {
  const { settings } = useAdminSettings();
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const copyUsername = () => {
    navigator.clipboard.writeText(settings.discordUsername);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ isolation: 'isolate' }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      <div
        className="relative w-full max-w-md mx-4 rounded-2xl p-8 shadow-2xl"
        style={{
          background: 'rgba(20, 20, 20, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          zIndex: 1,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ background: 'rgba(88, 101, 242, 0.2)' }}>
            <MessageCircle className="w-8 h-8" style={{ color: '#5865F2' }} />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Connect on Discord</h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{settings.discordMessage}</p>
          </div>

          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Discord Username</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-white font-mono text-lg">{settings.discordUsername}</span>
              <button
                onClick={copyUsername}
                className="text-white/40 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href={settings.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-3 text-white rounded-xl font-medium text-sm transition-colors text-center"
              style={{ background: '#5865F2' }}
            >
              Join Server
            </a>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 text-white/70 rounded-xl text-sm transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
