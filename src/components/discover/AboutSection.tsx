import { motion } from "framer-motion";
import { User, MessageSquare, GraduationCap, Ruler } from "lucide-react";

interface Props {
  profile: {
    about: { gender: string; pronouns: string; education: string; height: string };
  };
}

export default function AboutSection({ profile }: Props) {
  const items = [
    { icon: <User className="h-3.5 w-3.5" />, value: profile.about.gender },
    { icon: <MessageSquare className="h-3.5 w-3.5" />, value: profile.about.pronouns },
    { icon: <GraduationCap className="h-3.5 w-3.5" />, value: profile.about.education },
    { icon: <Ruler className="h-3.5 w-3.5" />, value: profile.about.height },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card px-5 py-3.5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center justify-between">
        {items.map((item, idx, arr) => (
          <div key={idx} className="flex items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-primary/60">{item.icon}</span>
              <span className="font-body text-[13px] text-foreground font-medium">{item.value}</span>
            </div>
            {idx < arr.length - 1 && (
              <span className="mx-3 inline-block h-[5px] w-[5px] rounded-full bg-primary/30" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
