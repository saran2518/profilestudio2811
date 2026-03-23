import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

export default function JoinMeForSection({ items }: { items: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5 relative overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: "hsl(var(--accent) / 0.1)" }}>
          <MapPin className="h-4 w-4 text-accent" />
        </div>
        <h3 className="font-display text-base font-semibold text-card-foreground">Join Me For</h3>
      </div>
      <div className="space-y-2.5">
        {items.map((idea, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
            className="flex items-center gap-3 rounded-xl px-3.5 py-3 transition-colors"
            style={{ background: "hsl(var(--accent) / 0.04)", border: "1px solid hsl(var(--accent) / 0.08)" }}
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-display text-xs font-bold text-accent"
              style={{ background: "hsl(var(--accent) / 0.12)" }}
            >
              {idx + 1}
            </span>
            <p className="font-body text-card-foreground/80 text-[14px] leading-snug flex-1">{idea}</p>
            <ArrowRight className="h-3.5 w-3.5 text-accent/40 shrink-0" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
