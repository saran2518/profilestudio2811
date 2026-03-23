import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function RelationshipIntentSection({ intent }: { intent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 p-5 relative overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)", background: "hsl(var(--card))" }}
    >
      {/* Bottom gradient glow */}
      <div className="absolute bottom-0 left-0 right-0 h-12 opacity-[0.04]" style={{ background: "var(--gradient-warm)" }} />

      <div className="relative flex items-center gap-3">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: "hsl(var(--primary) / 0.1)" }}
        >
          <Heart className="h-4.5 w-4.5 text-primary" />
        </motion.div>
        <div>
          <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-1">Intent</h3>
          <p className="font-display text-[15px] text-card-foreground/85 font-medium">{intent}</p>
        </div>
      </div>
    </motion.div>
  );
}
