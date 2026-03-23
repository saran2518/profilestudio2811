import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function InterestsSection({ interests }: { interests: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10">
          <Sparkles className="h-4 w-4 text-accent" />
        </div>
        <h3 className="font-display text-base font-semibold text-card-foreground">Interests</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + idx * 0.05, duration: 0.3 }}
            className="inline-block rounded-full border border-primary/12 px-3.5 py-1.5 font-body text-[13px] text-primary font-medium"
            style={{ background: "hsl(var(--primary) / 0.06)" }}
          >
            {interest}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
