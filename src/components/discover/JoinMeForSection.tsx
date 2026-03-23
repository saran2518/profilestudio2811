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
        <MapPin className="h-5 w-5 text-primary/60 shrink-0" />
        <h3 className="font-display text-base font-semibold text-card-foreground">Join Me For</h3>
      </div>
      <div className="space-y-2.5">
        {items.map((idea, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
            className="rounded-xl border border-border/50 px-4 py-3"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.06), hsl(var(--accent) / 0.10))" }}
          >
            <p className="font-body text-card-foreground/80 text-[14px] leading-snug">{idea}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
