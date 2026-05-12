import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, HeartPulse, Check } from "lucide-react";

interface Props {
  items: string[];
  vibed: boolean;
  /** Called when user picks a specific item to vibe on. */
  onVibeItem: (item: string) => void;
}

export default function JoinMeForSection({ items, vibed, onVibeItem }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [pickedIdx, setPickedIdx] = useState<number | null>(null);

  const toggleExpanded = () => {
    if (vibed) return;
    setExpanded((e) => !e);
  };

  const handlePick = (idx: number) => {
    if (vibed || pickedIdx !== null) return;
    setPickedIdx(idx);
    // Brief delay so user sees the fill animation before card collapses / advances
    setTimeout(() => {
      onVibeItem(items[idx]);
    }, 280);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      layout
      className="rounded-2xl border border-border/50 bg-card p-5 relative overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Master HeartPulse — toggles expand state */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={toggleExpanded}
        className="absolute top-4 right-4 h-9 w-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-10"
        style={{
          backgroundColor: vibed
            ? "hsl(var(--primary))"
            : expanded
              ? "hsl(var(--primary) / 0.15)"
              : "hsl(var(--muted))",
        }}
      >
        <motion.div animate={vibed ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
          <HeartPulse
            className={`h-4 w-4 ${
              vibed ? "text-primary-foreground" : expanded ? "text-primary" : "text-muted-foreground"
            }`}
            strokeWidth={2}
          />
        </motion.div>
      </motion.button>

      <div className="flex items-center gap-2.5 mb-1 pr-10">
        <MapPin className="h-5 w-5 text-primary/60 shrink-0" />
        <h3 className="font-display text-base font-semibold text-card-foreground">Join Me For</h3>
      </div>

      {/* Inline coach text when expanded */}
      <AnimatePresence initial={false}>
        {expanded && !vibed && (
          <motion.p
            key="coach"
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 12 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.25 }}
            className="font-body text-[12px] text-primary/80 mt-1"
          >
            Tap one to vibe on it
          </motion.p>
        )}
      </AnimatePresence>

      {!expanded && <div className="mb-4" />}

      <div className="space-y-2.5">
        {items.map((idea, idx) => {
          const isPicked = pickedIdx === idx;
          const isDimmed = pickedIdx !== null && !isPicked;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: isDimmed ? 0.4 : 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
              layout
              className={`rounded-xl border px-4 py-3 flex items-center gap-3 transition-all ${
                isPicked ? "border-primary/50" : "border-border/50"
              }`}
              style={{
                background: isPicked
                  ? "linear-gradient(135deg, hsl(var(--primary) / 0.14), hsl(var(--accent) / 0.20))"
                  : "linear-gradient(135deg, hsl(var(--primary) / 0.06), hsl(var(--accent) / 0.10))",
              }}
            >
              <p className="font-body text-card-foreground/80 text-[14px] leading-snug flex-1">{idea}</p>

              <AnimatePresence initial={false}>
                {expanded && !vibed && (
                  <motion.button
                    key="pick"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    whileTap={{ scale: 0.82 }}
                    onClick={() => handlePick(idx)}
                    disabled={pickedIdx !== null}
                    className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center"
                    style={{
                      background: isPicked
                        ? "var(--gradient-warm)"
                        : "hsl(var(--muted))",
                      boxShadow: isPicked ? "var(--shadow-warm)" : "none",
                    }}
                    aria-label={`Vibe on ${idea}`}
                  >
                    <motion.div
                      animate={isPicked ? { scale: [1, 1.4, 1] } : {}}
                      transition={{ duration: 0.35 }}
                    >
                      {isPicked ? (
                        <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3} />
                      ) : (
                        <HeartPulse className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2.2} />
                      )}
                    </motion.div>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
