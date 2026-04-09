import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";
import type { NarrativeItem } from "@/lib/profileGenerator";

interface Props {
  narratives: NarrativeItem[];
  vibed: boolean;
  onVibe: () => void;
}

export default function NarrativesSection({ narratives, vibed, onVibe }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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

      <h3 className="font-display text-sm font-bold text-card-foreground tracking-tight mb-3 pr-10">Narratives</h3>
      <div className="space-y-4">
        {narratives.map((narrative, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + idx * 0.1, duration: 0.4 }}
          >
            {idx > 0 && <div className="mb-4 h-px bg-border/30" />}
            <h4 className="font-display text-[13px] font-semibold text-foreground/65 mb-1.5">{narrative.title}</h4>
            <p className="font-body text-card-foreground/75 leading-relaxed text-[14px]">{narrative.content}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
