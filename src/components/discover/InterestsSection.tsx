import { motion } from "framer-motion";

export default function InterestsSection({ interests }: { interests: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-4">Interests</h3>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + idx * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center rounded-full border border-border px-3.5 py-2 font-body text-[13px] text-foreground/80 font-medium"
          >
            {interest}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
