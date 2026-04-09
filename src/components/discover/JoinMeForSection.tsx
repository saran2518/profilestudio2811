import { motion } from "framer-motion";
import { MapPin, HeartPulse } from "lucide-react";

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
      className="rounded-2xl border border-border/30 bg-card p-5 relative"
    >
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={onVibe}
        className="absolute top-4 right-4 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: vibed ? "hsl(var(--primary))" : "hsl(var(--muted))",
        }}
      >
        <motion.div animate={vibed ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
          <HeartPulse className={`h-4 w-4 ${vibed ? "text-primary-foreground" : "text-muted-foreground"}`} strokeWidth={2} />
        </motion.div>
      </motion.button>

      <div className="flex items-center gap-2 mb-4 pr-10">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-display text-sm font-bold text-card-foreground tracking-tight">Join Me For</h3>
      </div>
      <div className="space-y-2">
        {items.map((idea, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 0.08, duration: 0.4 }}
            className="flex items-start gap-3 rounded-xl border border-border/20 px-4 py-3 bg-muted/20"
          >
            <span className="text-muted-foreground/40 mt-0.5 shrink-0">•</span>
            <p className="font-body text-card-foreground/80 text-[13.5px] leading-snug">{idea}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
