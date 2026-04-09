import { motion } from "framer-motion";
import { Quote, HeartPulse, Feather } from "lucide-react";
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
      className="rounded-[20px] border border-border/40 bg-card relative overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Left accent */}
      <div className="absolute top-3 bottom-3 left-0 w-[3px] rounded-r-full" style={{ background: "var(--gradient-warm)" }} />
      
      {/* Background shimmer */}
      <div className="absolute inset-0 opacity-25" style={{ background: "var(--gradient-accent-soft)" }} />

      <div className="relative p-5">
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

        <div className="flex items-start gap-3 ml-2 pr-10">
          <div className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: "hsl(var(--primary) / 0.1)" }}>
            <Feather className="h-4 w-4 text-primary/70" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-sm font-bold text-card-foreground tracking-tight mb-3">Narratives</h3>
            <div className="space-y-0">
              {narratives.map((narrative, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.4 }}
                >
                  {idx > 0 && (
                    <div className="my-4 flex items-center gap-2">
                      <div className="flex-1 h-px bg-border/40" />
                      <div className="h-1 w-1 rounded-full bg-primary/30" />
                      <div className="flex-1 h-px bg-border/40" />
                    </div>
                  )}
                  <h4 className="font-display text-[13px] font-semibold text-foreground/65 mb-1.5 tracking-tight">
                    {narrative.title}
                  </h4>
                  <p className="font-body text-card-foreground/75 leading-[1.7] text-[14px] italic">
                    {narrative.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
