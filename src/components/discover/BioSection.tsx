import { motion } from "framer-motion";
import { Quote, HeartPulse, BookOpen } from "lucide-react";

interface Props {
  bio: string;
  vibed: boolean;
  onVibe: () => void;
}

export default function BioSection({ bio, vibed, onVibe }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[20px] border border-border/40 bg-card relative overflow-hidden group"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Left accent bar with gradient */}
      <div className="absolute top-3 bottom-3 left-0 w-[3px] rounded-r-full" style={{ background: "var(--gradient-warm)" }} />

      {/* Subtle background shimmer */}
      <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-accent-soft)" }} />

      <div className="relative p-5 pl-5">
        {/* Vibe button */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={onVibe}
          className="absolute top-4 right-4 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 z-10"
          style={{
            backgroundColor: vibed ? "hsl(var(--primary))" : "hsl(var(--muted) / 0.8)",
            boxShadow: vibed ? "0 0 12px hsl(var(--primary) / 0.3)" : "none",
          }}
        >
          <motion.div animate={vibed ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
            <HeartPulse className={`h-4 w-4 ${vibed ? "text-primary-foreground" : "text-muted-foreground"}`} strokeWidth={2} />
          </motion.div>
        </motion.button>

        <div className="flex items-start gap-3 ml-2 pr-10">
          <div className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: "hsl(var(--primary) / 0.1)" }}>
            <BookOpen className="h-4 w-4 text-primary/70" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-card-foreground tracking-tight mb-2">My Story</h3>
            <p className="font-body text-card-foreground/75 leading-[1.7] text-[14px] italic">{bio}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
