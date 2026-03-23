import { motion } from "framer-motion";

interface Props {
  profile: {
    about: { gender: string; pronouns: string; education: string; height: string };
  };
}

export default function AboutSection({ profile }: Props) {
  const items = [
    { label: "Gender", value: profile.about.gender },
    { label: "Pronouns", value: profile.about.pronouns },
    { label: "Education", value: profile.about.education },
    { label: "Height", value: profile.about.height },
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
          <div key={idx} className="flex flex-col gap-0.5">
            <span className="font-body text-[11px] text-muted-foreground">{item.label}</span>
            <span className="font-body text-sm text-foreground font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
