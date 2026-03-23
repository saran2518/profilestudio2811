import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function RelationshipIntentSection({ intent }: { intent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center gap-3">
        <Heart className="h-5 w-5 text-primary/60 shrink-0" />
        <div>
          <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-1">Intent</h3>
          <p className="font-body text-[15px] text-card-foreground/85 font-medium">{intent}</p>
        </div>
      </div>
    </motion.div>
  );
}
