import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, HeartPulse, Coffee, MoreHorizontal, X, ShieldBan, Flag, Video, Plus } from "lucide-react";
import { ChatThread } from "@/lib/chatStore";

interface ChatHeaderProps {
  thread: ChatThread;
  onBack: () => void;
  onDateRoom: () => void;
  onMenuAction: (action: "disconnect" | "block" | "report") => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}

export default function ChatHeader({
  thread,
  onBack,
  onDateRoom,
  onMenuAction,
  menuOpen,
  setMenuOpen,
}: ChatHeaderProps) {
  return (
    <div className="relative z-10">
      <div
        className="flex items-center gap-3 px-4 pt-12 pb-3"
        style={{
          background: "linear-gradient(180deg, hsl(var(--card)) 60%, transparent)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={onBack}
          className="p-2 -ml-2 rounded-2xl hover:bg-muted/50 transition-all active:bg-muted/70"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </motion.button>

        {/* Avatar with online indicator */}
        <div className="relative">
          <img
            src={thread.photo}
            alt={thread.name}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/15 ring-offset-2 ring-offset-background"
          />
          
        </div>

        <p className="font-display text-[15px] font-bold text-foreground truncate min-w-0">
          {thread.name}
        </p>

        <span
          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider text-primary-foreground shrink-0"
          style={{ background: "var(--gradient-warm)" }}
        >
          {thread.source === "vibe" ? (
            <HeartPulse className="h-2.5 w-2.5" />
          ) : (
            <Coffee className="h-2.5 w-2.5" />
          )}
          {thread.source}
        </span>

        {/* Virtual date button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.02 }}
          onClick={onDateRoom}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-2xl transition-all border border-primary/20 hover:border-primary/40 hover:bg-primary/5"
        >
          <div className="relative">
            <Video className="h-4 w-4 text-primary" />
            <Plus className="h-2.5 w-2.5 text-primary-foreground bg-primary rounded-full absolute -top-1 -right-1.5" />
          </div>
          <span className="text-[10px] font-semibold text-primary leading-none">Virtual Date Room</span>
        </motion.button>

        {/* 3-dot menu */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-2xl hover:bg-muted/50 transition-all"
          >
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
          </motion.button>

          <AnimatePresence>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -8 }}
                  transition={{ type: "spring", damping: 25, stiffness: 400 }}
                  className="absolute right-0 top-full mt-2 z-50 w-52 rounded-2xl border border-border/40 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                >
                  <button
                    onClick={() => onMenuAction("disconnect")}
                    className="flex items-center gap-3 w-full px-4 py-3.5 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                    Close connection
                  </button>
                  <div className="h-px bg-border/20 mx-3" />
                  <button
                    onClick={() => onMenuAction("block")}
                    className="flex items-center gap-3 w-full px-4 py-3.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                  >
                    <ShieldBan className="h-4 w-4" />
                    Block
                  </button>
                  <div className="h-px bg-border/20 mx-3" />
                  <button
                    onClick={() => onMenuAction("report")}
                    className="flex items-center gap-3 w-full px-4 py-3.5 text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors"
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
      {/* Bottom border glow */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
}
