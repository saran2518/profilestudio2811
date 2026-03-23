import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function BioSection({ bio }: { bio: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5 relative overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-1 h-full rounded-r-full" style={{ background: "var(--gradient-warm)" }} />

      <div className="flex items-start gap-3 ml-2">
        <Quote className="h-5 w-5 text-primary/40 mt-0.5 shrink-0 rotate-180" />
        <div>
          <h3 className="font-display text-base font-semibold text-card-foreground mb-2">Bio</h3>
          <p className="font-body text-card-foreground/80 leading-relaxed text-[15px] italic">{bio}</p>
        </div>
      </div>
    </motion.div>
  );
}
