import { Flag, ShieldBan } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import ReportDialog from "./ReportDialog";

const BLOCK_REASONS = [
  { label: "I'm not interested", emoji: "👋" },
  { label: "Inappropriate behavior", emoji: "⚠️" },
  { label: "Making me uncomfortable", emoji: "😟" },
  { label: "Spam or fake account", emoji: "🚫" },
  { label: "Other", emoji: "💬" },
];

interface Props {
  profileName: string;
}

export default function ProfileActions({ profileName }: Props) {
  const [reportOpen, setReportOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [blockReason, setBlockReason] = useState<string | null>(null);

  const handleBlock = () => {
    toast.success(`${profileName} has been blocked. You won't see their profile anymore.`);
    setBlockReason(null);
    setBlockOpen(false);
  };

  const handleBlockCancel = () => {
    setBlockReason(null);
    setBlockOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="py-8 px-6"
      >
        <p className="text-xs text-center text-muted-foreground mb-4 tracking-wide uppercase">
          Something wrong?
        </p>
        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setReportOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-destructive/30 text-destructive text-sm font-semibold hover:bg-destructive/5 active:bg-destructive/10 transition-all duration-200"
          >
            <Flag className="h-4 w-4" />
            Report
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setBlockOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-primary/30 text-primary text-sm font-semibold hover:bg-primary/5 active:bg-primary/10 transition-all duration-200"
          >
            <ShieldBan className="h-4 w-4" />
            Block
          </motion.button>
        </div>
      </motion.div>

      {/* Block Dialog */}
      <AnimatePresence>
        {blockOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleBlockCancel}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative z-10 w-full max-w-sm max-h-[85vh] flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
            >
              <div className="p-5 overflow-y-auto flex-1">
                {/* Header */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <ShieldBan className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Block {profileName}</h3>
                  </div>
                  <button
                    onClick={handleBlockCancel}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                  >
                    <span className="text-sm font-bold">✕</span>
                  </button>
                </div>

                <p className="text-sm text-muted-foreground mb-4 ml-[42px]">
                  They won't see your profile or contact you
                </p>

                {/* Reasons */}
                <div className="flex flex-col gap-1.5 mb-4">
                  {BLOCK_REASONS.map(({ label, emoji }) => (
                    <button
                      key={label}
                      onClick={() => setBlockReason(label)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                        blockReason === label
                          ? "border-primary bg-primary/8 text-primary shadow-sm"
                          : "border-border/60 bg-background text-foreground hover:border-primary/30 hover:bg-primary/3"
                      }`}
                    >
                      <span className="text-base">{emoji}</span>
                      <span className="flex-1 text-left">{label}</span>
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={handleBlockCancel}
                    className="flex-1 py-3 rounded-full border border-border text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBlock}
                    disabled={!blockReason}
                    className="flex-1 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-30 hover:bg-primary/90 transition-all duration-200"
                  >
                    Block
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ReportDialog open={reportOpen} onClose={() => setReportOpen(false)} profileName={profileName} />
    </>
  );
}
