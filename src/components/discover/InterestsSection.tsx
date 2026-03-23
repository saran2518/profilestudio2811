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
      <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">Interests</h3>
      <p className="font-body text-[15px] leading-relaxed text-foreground/80 font-medium">
        {interests.slice(0, 6).map((interest, idx, arr) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 + idx * 0.08, duration: 0.4 }}
          >
            {interest}
            {idx < arr.length - 1 && (
              <span className="mx-2 inline-block h-[5px] w-[5px] rounded-full bg-primary/50 align-middle" />
            )}
          </motion.span>
        ))}
      </p>
    </motion.div>
  );
}
