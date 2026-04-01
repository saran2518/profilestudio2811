import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ProfileCompletenessProps {
  percentage: number;
  message: string;
}

const ProfileCompleteness = ({ percentage, message }: ProfileCompletenessProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="rounded-2xl border border-border/30 bg-card p-4"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground">Profile Completeness</span>
        </div>
        <span className="text-sm font-bold text-primary">{percentage}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-muted/70 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="h-full rounded-full"
          style={{ background: "var(--gradient-warm)" }}
        />
      </div>
      <p className="text-[11px] text-muted-foreground mt-2.5 leading-relaxed">{message}</p>
    </motion.div>
  );
};

export default ProfileCompleteness;
