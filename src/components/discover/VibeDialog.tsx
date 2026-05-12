import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartPulse, Sparkles, Send, X, Check } from "lucide-react";

interface VibeDialogProps {
  open: boolean;
  sectionName: string;
  joinMeForItems?: string[];
  onSendVibe: (selectedItem?: string) => void;
  onCancel: () => void;
  onSendInvite: () => void;
}

export default function VibeDialog({ open, sectionName, joinMeForItems, onSendVibe, onCancel, onSendInvite }: VibeDialogProps) {
  const isJoinMeFor = sectionName === "Join Me For" && joinMeForItems && joinMeForItems.length > 0;
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    if (open) setSelectedIdx(isJoinMeFor ? 0 : null);
  }, [open, isJoinMeFor]);

  const handleSend = () => {
    if (isJoinMeFor && selectedIdx !== null) {
      onSendVibe(joinMeForItems![selectedIdx]);
    } else {
      onSendVibe();
    }
  };

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
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-24 z-50 rounded-[28px] border border-border/20 bg-card/95 backdrop-blur-2xl overflow-hidden"
            style={{
              boxShadow: "0 -8px 50px -10px hsl(var(--primary) / 0.18), 0 0 0 1px hsl(var(--primary) / 0.04)",
            }}
          >
            {/* Warm gradient top accent */}
            <div className="h-[3px] w-full" style={{ background: "var(--gradient-warm)" }} />

            <div className="px-6 pt-5 pb-6 flex flex-col items-center text-center">
              {/* Close */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={onCancel}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </motion.button>

              {/* Animated icon */}
              <div
                className="h-16 w-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.12), hsl(var(--accent) / 0.18))" }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <HeartPulse className="h-8 w-8 text-primary" />
                </motion.div>
              </div>

              {/* Title & subtitle */}
              <h3 className="font-display text-lg font-bold text-card-foreground mb-1">Send a Vibe</h3>
              <p className="font-body text-sm text-muted-foreground mb-5">
                {isJoinMeFor ? (
                  <>Pick which <span className="text-foreground font-semibold">Join Me For</span> you vibe with</>
                ) : (
                  <>Let them know you vibe with their{" "}
                    <span className="text-foreground font-semibold">{sectionName}</span></>
                )}
              </p>

              {/* Join Me For selection */}
              {isJoinMeFor && (
                <div className="w-full mb-5 space-y-2">
                  {joinMeForItems!.map((item, idx) => {
                    const selected = selectedIdx === idx;
                    return (
                      <motion.button
                        key={idx}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedIdx(idx)}
                        className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-2xl border transition-all font-body ${
                          selected
                            ? "border-primary/50 bg-primary/5"
                            : "border-border/40 bg-muted/20 hover:bg-muted/40"
                        }`}
                      >
                        <span
                          className={`h-5 w-5 shrink-0 rounded-full flex items-center justify-center border ${
                            selected ? "border-primary bg-primary" : "border-border/60 bg-card"
                          }`}
                        >
                          {selected && <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />}
                        </span>
                        <span className={`text-sm leading-snug ${selected ? "text-foreground" : "text-muted-foreground"}`}>
                          {item}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* Primary actions */}
              <div className="flex gap-3 w-full mb-3">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={onCancel}
                  className="flex-1 py-3.5 rounded-2xl border border-border/50 bg-muted/30 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors font-body"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSend}
                  disabled={isJoinMeFor && selectedIdx === null}
                  className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2 font-body disabled:opacity-50"
                  style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-warm)" }}
                >
                  <HeartPulse className="h-4 w-4" />
                  Send Vibe
                </motion.button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 w-full mb-3">
                <div className="flex-1 h-px bg-border/40" />
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 font-body">or</span>
                <div className="flex-1 h-px bg-border/40" />
              </div>

              {/* Invite upsell */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onSendInvite}
                className="w-full py-3.5 rounded-2xl border border-primary/15 text-sm font-medium flex items-center justify-center gap-2 transition-all hover:border-primary/30 font-body"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.05), hsl(var(--accent) / 0.07))" }}
              >
                <Send className="h-3.5 w-3.5 text-primary" />
                <span className="text-foreground/80">Send an Invite</span>
                <span className="text-[10px] text-primary flex items-center gap-0.5 font-semibold">
                  <Sparkles className="h-3 w-3" /> Stand out more!
                </span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
