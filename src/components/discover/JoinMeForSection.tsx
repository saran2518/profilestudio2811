import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function JoinMeForSection({ items }: { items: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10">
          <MapPin className="h-4 w-4 text-accent" />
        </div>
        <h3 className="font-display text-base font-semibold text-card-foreground">Join Me For</h3>
      </div>
      <div className="space-y-3">
        {items.map((idea, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 0.08, duration: 0.35 }}
            className="flex items-start gap-3"
          >
            <span
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl font-display text-xs font-bold text-accent"
              style={{ background: "hsl(var(--accent) / 0.08)" }}
            >
              {idx + 1}
            </span>
            <p className="font-body text-card-foreground/75 text-[15px] leading-relaxed pt-0.5">{idea}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
