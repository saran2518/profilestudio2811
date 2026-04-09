import { motion } from "framer-motion";
import { HeartPulse, BookOpen } from "lucide-react";

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

      <div className="flex items-start gap-3 pr-10">
        <BookOpen className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
        <div>
          <h3 className="font-display text-sm font-bold text-card-foreground tracking-tight mb-2">My Story</h3>
          <p className="font-body text-card-foreground/75 leading-relaxed text-[14px]">{bio}</p>
        </div>
      </div>
    </motion.div>
  );
}
