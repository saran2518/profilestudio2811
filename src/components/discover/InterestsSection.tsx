import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const EMOJI_MAP: Record<string, string> = {
  "Mountain hikes": "🏔️",
  "Vinyl music": "🎵",
  "Slow Sundays": "☀️",
  "Architecture": "🏛️",
  "Travel": "✈️",
  "Photography": "📸",
};

export default function InterestsSection({ interests }: { interests: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5 relative overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Decorative dots */}
      <div className="absolute top-3 right-3 flex gap-1 opacity-20">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-1.5 w-1.5 rounded-full bg-accent" />
        ))}
      </div>

      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: "hsl(var(--accent) / 0.1)" }}>
          <Sparkles className="h-4 w-4 text-accent" />
        </div>
        <h3 className="font-display text-base font-semibold text-card-foreground">Interests</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + idx * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/12 px-3.5 py-2 font-body text-[13px] text-primary font-medium"
            style={{ background: "hsl(var(--primary) / 0.06)" }}
          >
            <span className="text-sm">{EMOJI_MAP[interest] || "✦"}</span>
            {interest}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
