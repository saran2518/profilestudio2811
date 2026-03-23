import { motion } from "framer-motion";
import { User, MessageSquare, GraduationCap, Ruler } from "lucide-react";

interface Props {
  profile: {
    about: { gender: string; pronouns: string; education: string; height: string };
  };
}

export default function AboutSection({ profile }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-4">About</h3>
      <div className="grid grid-cols-2 gap-y-4 gap-x-6">
        <AboutItem icon={<User className="h-4 w-4" />} label={profile.about.gender} />
        <AboutItem icon={<MessageSquare className="h-4 w-4" />} label={profile.about.pronouns} />
        <AboutItem icon={<GraduationCap className="h-4 w-4" />} label={profile.about.education} />
        <AboutItem icon={<Ruler className="h-4 w-4" />} label={profile.about.height} />
      </div>
    </motion.div>
  );
}

function AboutItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5 group">
      <div className="text-muted-foreground group-hover:text-primary transition-colors duration-200">{icon}</div>
      <span className="font-body text-sm text-foreground">{label}</span>
    </div>
  );
}
