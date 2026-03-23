import { motion } from "framer-motion";

const SIZE_MAP: Record<number, string> = {
  0: "text-[22px] font-bold",
  1: "text-[15px] font-semibold",
  2: "text-[19px] font-bold",
  3: "text-[13px] font-medium",
  4: "text-[17px] font-semibold",
  5: "text-[14px] font-medium",
};

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
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
        {interests.map((interest, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 + idx * 0.08, duration: 0.4 }}
            className={`font-display text-foreground/85 leading-relaxed ${SIZE_MAP[idx] || "text-[15px] font-medium"}`}
          >
            {interest}
            {idx < interests.length - 1 && (
              <span className="ml-3 text-primary/30 font-light">·</span>
            )}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
