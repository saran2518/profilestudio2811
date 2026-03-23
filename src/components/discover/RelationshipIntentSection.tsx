import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function RelationshipIntentSection({ intent }: { intent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5 relative overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Subtle warm gradient bg */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ background: "var(--gradient-warm)" }} />

      <div className="relative flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
          <Heart className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-1">Intent</h3>
          <p className="font-body text-[15px] text-card-foreground/80">{intent}</p>
        </div>
      </div>
    </motion.div>
  );
}
