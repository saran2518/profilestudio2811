import { motion } from "framer-motion";
import { Quote, HeartPulse } from "lucide-react";
import type { NarrativeItem } from "@/lib/profileGenerator";

interface Props {
  narratives: NarrativeItem[];
  vibed: boolean;
  onVibe: () => void;
}

export default function NarrativesSection({ narratives, vibed, onVibe }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5 relative overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="absolute top-0 left-0 w-1 h-full rounded-r-full" style={{ background: "var(--gradient-warm)" }} />

      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={onVibe}
        className="absolute top-4 right-4 h-9 w-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-10"
        style={{ backgroundColor: vibed ? "hsl(var(--primary))" : "hsl(var(--muted))" }}
      >
        <motion.div animate={vibed ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
          <HeartPulse className={`h-4 w-4 ${vibed ? "text-primary-foreground" : "text-muted-foreground"}`} strokeWidth={2} />
        </motion.div>
      </motion.button>

      <div className="flex items-start gap-3 ml-2 pr-10">
        <Quote className="h-5 w-5 text-primary/40 mt-0.5 shrink-0 rotate-180" />
        <div className="flex-1">
          <h3 className="font-display text-base font-semibold text-card-foreground mb-3">Narratives</h3>
          <div className="space-y-0">
            {narratives.map((narrative, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.12, duration: 0.45 }}
              >
                {idx > 0 && <div className="my-4 h-px bg-border/60" />}
                <h4 className="font-display text-[13px] font-semibold text-foreground/70 mb-1.5">
                  {narrative.title}
                </h4>
                <p className="font-body text-card-foreground/80 leading-relaxed text-[15px] italic">
                  {narrative.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
