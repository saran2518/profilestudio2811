import { motion } from "framer-motion";
import { BookOpen, Quote } from "lucide-react";

export default function NarrativesSection({ narratives }: { narratives: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5 relative overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Side accent strip */}
      <div className="absolute top-5 bottom-5 left-0 w-1 rounded-r-full bg-primary/20" />

      <div className="flex items-center gap-2.5 mb-5 ml-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: "hsl(var(--primary) / 0.08)" }}>
          <BookOpen className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-display text-base font-semibold text-card-foreground">Narratives</h3>
      </div>
      <div className="space-y-5 ml-2">
        {narratives.map((narrative, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + idx * 0.12, duration: 0.45 }}
            className="relative pl-5"
          >
            <Quote className="absolute -left-0.5 top-0 h-4 w-4 text-primary/25 rotate-180" />
            <p className="font-body text-card-foreground/75 leading-relaxed text-[15px] italic">{narrative}</p>
            <div className="mt-2 h-px w-12" style={{ background: "var(--gradient-warm)", opacity: 0.3 }} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
