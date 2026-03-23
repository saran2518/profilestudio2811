import { motion } from "framer-motion";
import { User, MessageSquare, GraduationCap, Ruler } from "lucide-react";

interface Props {
  profile: {
    about: { gender: string; pronouns: string; education: string; height: string };
  };
}

export default function AboutSection({ profile }: Props) {
  const items = [
    { icon: <User className="h-4 w-4" />, label: "Gender", value: profile.about.gender },
    { icon: <MessageSquare className="h-4 w-4" />, label: "Pronouns", value: profile.about.pronouns },
    { icon: <GraduationCap className="h-4 w-4" />, label: "Education", value: profile.about.education },
    { icon: <Ruler className="h-4 w-4" />, label: "Height", value: profile.about.height },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-4">About</h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.06, duration: 0.35 }}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5"
            style={{ background: "hsl(var(--muted) / 0.45)" }}
          >
            <div className="text-primary/60">{item.icon}</div>
            <div className="flex flex-col">
              <span className="font-body text-[10px] text-muted-foreground leading-tight">{item.label}</span>
              <span className="font-body text-[13px] text-foreground font-medium leading-snug">{item.value}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
