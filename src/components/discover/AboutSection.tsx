import { motion } from "framer-motion";
import { User, MessageSquare, GraduationCap, Ruler } from "lucide-react";

interface Props {
  profile: {
    about: { gender: string; pronouns: string; education: string; height: string };
  };
}

export default function AboutSection({ profile }: Props) {
  const items = [
    { icon: <User className="h-5 w-5" />, label: "Gender", value: profile.about.gender },
    { icon: <MessageSquare className="h-5 w-5" />, label: "Pronouns", value: profile.about.pronouns },
    { icon: <GraduationCap className="h-5 w-5" />, label: "Education", value: profile.about.education },
    { icon: <Ruler className="h-5 w-5" />, label: "Height", value: profile.about.height },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-5">About</h3>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + idx * 0.07, duration: 0.35 }}
            className="flex flex-col items-center text-center gap-2 py-3"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-primary"
              style={{ background: "hsl(var(--primary) / 0.08)" }}
            >
              {item.icon}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-body text-[15px] text-foreground font-semibold leading-tight">{item.value}</span>
              <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
