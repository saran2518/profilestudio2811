import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { NarrativeItem } from "@/lib/profileGenerator";

export default function NarrativesSection({ narratives }: { narratives: NarrativeItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5 relative overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="absolute top-0 left-0 w-1 h-full rounded-r-full" style={{ background: "var(--gradient-warm)" }} />

      <div className="flex items-start gap-3 ml-2">
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
