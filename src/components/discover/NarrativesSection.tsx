import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function NarrativesSection({ narratives }: { narratives: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/8">
          <BookOpen className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-display text-base font-semibold text-card-foreground">Narratives</h3>
      </div>
      <div className="space-y-4">
        {narratives.map((narrative, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + idx * 0.1, duration: 0.4 }}
            className="pl-4 border-l-2 border-primary/25"
          >
            <p className="font-body text-card-foreground/75 leading-relaxed text-[15px]">{narrative}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
