import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function RelationshipIntentSection({ intent }: { intent: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">Intent</h3>
      <div className="flex flex-wrap gap-2">
        {intent.map((item, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + idx * 0.07, duration: 0.35 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-muted/50 px-3.5 py-1.5 font-body text-[13px] font-medium text-foreground"
          >
            <Heart className="h-3.5 w-3.5 text-primary/60" />
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
