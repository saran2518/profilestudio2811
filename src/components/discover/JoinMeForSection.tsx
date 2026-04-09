import { motion } from "framer-motion";
import { MapPin, HeartPulse, Sparkles } from "lucide-react";

interface Props {
  items: string[];
  vibed: boolean;
  onVibe: () => void;
}

export default function JoinMeForSection({ items, vibed, onVibe }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[20px] border border-border/40 bg-card p-5 relative overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-20 opacity-30" style={{ background: "var(--gradient-accent-soft)" }} />

      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={onVibe}
        className="absolute top-4 right-4 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 z-10"
        style={{
          backgroundColor: vibed ? "hsl(var(--primary))" : "hsl(var(--muted) / 0.8)",
          boxShadow: vibed ? "0 0 12px hsl(var(--primary) / 0.3)" : "none",
        }}
      >
        <motion.div animate={vibed ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
          <HeartPulse className={`h-4 w-4 ${vibed ? "text-primary-foreground" : "text-muted-foreground"}`} strokeWidth={2} />
        </motion.div>
      </motion.button>

      <div className="relative">
        <div className="flex items-center gap-2 mb-4 pr-10">
          <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--primary) / 0.1)" }}>
            <MapPin className="h-3.5 w-3.5 text-primary/70" />
          </div>
          <h3 className="font-display text-sm font-bold text-card-foreground tracking-tight">Join Me For</h3>
        </div>
        <div className="space-y-2">
          {items.map((idea, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.08, duration: 0.4 }}
              className="flex items-start gap-3 rounded-xl border border-border/30 px-4 py-3 backdrop-blur-sm"
              style={{ background: "hsl(var(--primary) / 0.04)" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary/40 mt-0.5 shrink-0" />
              <p className="font-body text-card-foreground/80 text-[13.5px] leading-snug">{idea}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
