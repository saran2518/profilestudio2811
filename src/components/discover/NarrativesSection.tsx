import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function NarrativesSection({ narratives }: { narratives: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5 relative overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Side accent line matching Bio style */}
      <div className="absolute top-0 left-0 w-1 h-full rounded-r-full" style={{ background: "var(--gradient-warm)" }} />

      <div className="flex items-start gap-3 ml-2">
        <Quote className="h-5 w-5 text-primary/40 mt-0.5 shrink-0 rotate-180" />
        <div>
          <h3 className="font-display text-base font-semibold text-card-foreground mb-3">Narratives</h3>
          <div className="space-y-4">
            {narratives.map((narrative, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.12, duration: 0.45 }}
                className="font-body text-card-foreground/80 leading-relaxed text-[15px] italic"
              >
                {narrative}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
