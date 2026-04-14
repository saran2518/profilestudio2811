import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, HeartPulse, Coffee, X, MoreHorizontal, ShieldBan, Flag, Video, Plus } from "lucide-react";
import { ChatThread } from "@/lib/chatStore";

interface ChatHeaderProps {
  thread: ChatThread;
  onBack: () => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  onMenuAction: (action: "disconnect" | "block" | "report") => void;
  onDateInvite: () => void;
}

export default function ChatHeader({
  thread,
  onBack,
  menuOpen,
  setMenuOpen,
  onMenuAction,
  onDateInvite,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-2.5 px-4 pt-12 pb-3 bg-card/80 backdrop-blur-xl border-b border-border/20 z-10">
      <button
        onClick={onBack}
        className="p-2 -ml-2 rounded-xl hover:bg-muted/40 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 text-foreground" />
      </button>

      <div className="relative">
        <img
          src={thread.photo}
          alt={thread.name}
          className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/10 ring-offset-1 ring-offset-background"
        />
        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-emerald-400" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-display text-[15px] font-bold text-foreground truncate">
            {thread.name}
          </p>
          <span
            className="shrink-0 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider text-primary-foreground"
            style={{ background: "var(--gradient-warm)" }}
          >
            {thread.source === "vibe" ? (
              <HeartPulse className="h-2 w-2" />
            ) : (
              <Coffee className="h-2 w-2" />
            )}
            {thread.source}
          </span>
        </div>
        <p className="text-[11px] text-emerald-500 font-medium leading-tight">Online</p>
      </div>

      {/* Virtual date button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onDateInvite}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl hover:bg-muted/40 transition-colors border border-primary/20"
      >
        <div className="relative">
          <Video className="h-4 w-4 text-primary" />
          <Plus className="h-2.5 w-2.5 text-primary-foreground bg-primary rounded-full absolute -top-1 -right-1.5" />
        </div>
        <span className="text-[9px] font-semibold text-primary leading-none whitespace-nowrap">Date Room</span>
      </motion.button>

      {/* 3-dot menu */}
      <div className="relative">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen((v: boolean) => !v)}
          className="p-2 rounded-xl hover:bg-muted/40 transition-colors"
        >
          <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
        </motion.button>

        <AnimatePresence>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-1 z-50 w-48 rounded-xl border border-border bg-card shadow-xl overflow-hidden"
              >
                <button
                  onClick={() => onMenuAction("disconnect")}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                  Close connection
                </button>
                <button
                  onClick={() => onMenuAction("block")}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                >
                  <ShieldBan className="h-4 w-4" />
                  Block
                </button>
                <button
                  onClick={() => onMenuAction("report")}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors"
                >
                  <Flag className="h-4 w-4" />
                  Report
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
