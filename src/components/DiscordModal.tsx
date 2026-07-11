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
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-black border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#5865F2]/20 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-[#5865F2]" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Connect on Discord</h3>
            <p className="text-white/50 text-sm">{settings.discordMessage}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-white/40 text-xs mb-2">Discord Username</p>
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
              className="flex-1 px-4 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl font-medium text-sm transition-colors text-center"
            >
              Join Server
            </a>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white/70 border border-white/10 rounded-xl text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
