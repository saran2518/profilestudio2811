import { motion, AnimatePresence } from "framer-motion";
import { HeartPulse, Sparkles, Send, X } from "lucide-react";

interface VibeDialogProps {
  open: boolean;
  sectionName: string;
  onSendVibe: () => void;
  onCancel: () => void;
  onSendInvite: () => void;
}

export default function VibeDialog({ open, sectionName, onSendVibe, onCancel, onSendInvite }: VibeDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onCancel}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-4 right-4 z-50 rounded-3xl border border-border/30 bg-card/95 backdrop-blur-xl overflow-hidden"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              boxShadow: "0 20px 60px -12px hsl(var(--primary) / 0.2), 0 0 0 1px hsl(var(--primary) / 0.05)",
            }}
          >
            {/* Top gradient */}
            <div className="h-1 w-full" style={{ background: "var(--gradient-warm)" }} />

            <div className="p-5 pt-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="h-9 w-9 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.2))" }}
                  >
                    <HeartPulse className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-card-foreground">Send a Vibe</h3>
                    <p className="text-xs text-muted-foreground font-body">on their <span className="text-foreground font-medium">{sectionName}</span></p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={onCancel}
                  className="h-8 w-8 rounded-full bg-muted/60 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <X className="h-3.5 w-3.5 text-muted-foreground" />
                </motion.button>
              </div>

              {/* Vibe preview */}
              <div
                className="rounded-2xl p-4 mb-4 text-center"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--accent) / 0.12))" }}
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <HeartPulse className="h-10 w-10 text-primary mx-auto mb-2" />
                </motion.div>
                <p className="font-body text-sm text-foreground/70">
                  Let them know you vibe with their <span className="font-medium text-foreground">{sectionName}</span>
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-3">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={onCancel}
                  className="flex-1 py-3 rounded-2xl border border-border/50 bg-muted/30 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors font-body"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={onSendVibe}
                  className="flex-1 py-3 rounded-2xl text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2 font-body"
                  style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-warm)" }}
                >
                  <HeartPulse className="h-4 w-4" />
                  Send Vibe
                </motion.button>
              </div>

              {/* Invite upsell */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onSendInvite}
                className="w-full py-3 rounded-2xl border border-primary/20 text-sm font-medium flex items-center justify-center gap-2 transition-all hover:border-primary/40 font-body"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.06), hsl(var(--accent) / 0.08))" }}
              >
                <Send className="h-3.5 w-3.5 text-primary" />
                <span className="text-foreground/80">Send an Invite instead</span>
                <span className="text-[10px] text-primary flex items-center gap-0.5 ml-1">
                  <Sparkles className="h-3 w-3" /> More chances to stand out!
                </span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
