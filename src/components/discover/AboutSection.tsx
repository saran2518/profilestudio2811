import { motion } from "framer-motion";
import { User, MessageSquare, GraduationCap, Ruler } from "lucide-react";

interface Props {
  profile: {
    about: { gender: string; pronouns: string; education: string; height: string };
  };
}

export default function AboutSection({ profile }: Props) {
  const items = [
    { icon: <User className="h-4 w-4" />, label: profile.about.gender },
    { icon: <MessageSquare className="h-4 w-4" />, label: profile.about.pronouns },
    { icon: <GraduationCap className="h-4 w-4" />, label: profile.about.education },
    { icon: <Ruler className="h-4 w-4" />, label: profile.about.height },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5 relative overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-5 right-5 h-[2px] rounded-full" style={{ background: "var(--gradient-warm)", opacity: 0.5 }} />

      <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-4 mt-1">About</h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.06, duration: 0.35 }}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
            style={{ background: "hsl(var(--muted) / 0.5)" }}
          >
            <div className="text-primary/70">{item.icon}</div>
            <span className="font-body text-sm text-foreground font-medium">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
