import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, HeartPulse } from "lucide-react";

export default function BioSection({ bio }: { bio: string }) {
  const [vibed, setVibed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5 relative overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="absolute top-0 left-0 w-1 h-full rounded-r-full" style={{ background: "var(--gradient-warm)" }} />

      {/* Vibe button */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => setVibed(!vibed)}
        className="absolute top-4 right-4 h-9 w-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-10"
        style={{ backgroundColor: vibed ? "hsl(var(--primary))" : "hsl(var(--muted))" }}
      >
        <motion.div animate={vibed ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
          <HeartPulse className={`h-4 w-4 ${vibed ? "text-primary-foreground" : "text-muted-foreground"}`} strokeWidth={2} />
        </motion.div>
      </motion.button>

      <div className="flex items-start gap-3 ml-2 pr-10">
        <Quote className="h-5 w-5 text-primary/40 mt-0.5 shrink-0 rotate-180" />
        <div>
          <h3 className="font-display text-base font-semibold text-card-foreground mb-2">Bio</h3>
          <p className="font-body text-card-foreground/80 leading-relaxed text-[15px] italic">{bio}</p>
        </div>
      </div>
    </motion.div>
  );
}
