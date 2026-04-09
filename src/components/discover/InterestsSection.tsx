import { motion } from "framer-motion";
import { HeartPulse, Palette } from "lucide-react";

interface Props {
  interests: string[];
  vibed: boolean;
  onVibe: () => void;
}

export default function InterestsSection({ interests, vibed, onVibe }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/30 bg-card p-5 relative"
    >
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={onVibe}
        className="absolute top-4 right-4 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: vibed ? "hsl(var(--primary))" : "hsl(var(--muted))",
        }}
      >
        <motion.div animate={vibed ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
          <HeartPulse className={`h-4 w-4 ${vibed ? "text-primary-foreground" : "text-muted-foreground"}`} strokeWidth={2} />
        </motion.div>
      </motion.button>

      <div className="flex items-center gap-2 mb-3 pr-10">
        <Palette className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-body text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Interests</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {interests.slice(0, 6).map((interest, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + idx * 0.06, duration: 0.35 }}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-[13px] font-medium text-foreground/80 border border-border/30 bg-muted/30"
          >
            {interest}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
