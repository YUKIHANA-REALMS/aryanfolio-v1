import { useAdminSettings } from "@/context/AdminSettings";
import { useState } from "react";
import { MessageCircle, Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface DiscordModalProps {
  open: boolean;
  onClose: () => void;
}

export const DiscordModal = ({ open, onClose }: DiscordModalProps) => {
  const { settings } = useAdminSettings();
  const [copied, setCopied] = useState(false);

  const copyUsername = () => {
    navigator.clipboard.writeText(settings.discordUsername);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-black border-white/10 sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#5865F2]/20 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-[#5865F2]" />
          </div>
          <DialogTitle className="text-xl text-white text-center">Connect on Discord</DialogTitle>
          <DialogDescription className="text-white/50 text-sm text-center">
            {settings.discordMessage}
          </DialogDescription>
        </DialogHeader>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
          <p className="text-white/40 text-xs mb-2 text-center">Discord Username</p>
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

        <div className="flex gap-3 mt-4">
          <a
            href={settings.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl font-medium text-sm transition-colors text-center"
          >
            Join Server
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};
