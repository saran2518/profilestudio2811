import React from "react";
import { motion } from "framer-motion";
import {
  User, MessageSquare, GraduationCap, Ruler, Heart,
  Feather, Plane, Users, Compass, Sparkles, Globe,
} from "lucide-react";

const intentIcons: Record<string, React.ReactNode> = {
  "Meaningful Connection": <Heart className="h-3.5 w-3.5" />,
  "Keeping it Light": <Feather className="h-3.5 w-3.5" />,
  "Travel Buddy": <Plane className="h-3.5 w-3.5" />,
  "Shared Experiences": <Users className="h-3.5 w-3.5" />,
  "Discovery Mode": <Compass className="h-3.5 w-3.5" />,
};

interface Props {
  profile: {
    about: { gender: string; pronouns: string; orientation: string; education: string; height: string };
    languages: string[];
    relationshipIntent: string[];
  };
}

export default function ProfileDetailsCard({ profile }: Props) {
  const aboutItems = [
    { icon: <User className="h-3.5 w-3.5" />, label: "Gender", value: profile.about.gender },
    { icon: <MessageSquare className="h-3.5 w-3.5" />, label: "Pronouns", value: profile.about.pronouns },
    { icon: <Heart className="h-3.5 w-3.5" />, label: "Orientation", value: profile.about.orientation },
    { icon: <GraduationCap className="h-3.5 w-3.5" />, label: "Education", value: profile.about.education },
    { icon: <Ruler className="h-3.5 w-3.5" />, label: "Height", value: profile.about.height },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex min-h-0">
        {/* Left column — About details */}
        <div className="flex-1 p-5 border-r border-border/30">
          <h3 className="font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">
            About
          </h3>
          <div className="space-y-3">
            {aboutItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.06, duration: 0.35 }}
                className="flex items-center gap-2.5"
              >
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-primary"
                  style={{ background: "hsl(var(--primary) / 0.08)" }}
                >
                  {item.icon}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body text-[12px] font-semibold text-foreground leading-tight truncate">
                    {item.value}
                  </span>
                  <span className="font-body text-[9px] text-muted-foreground uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right column — Languages + Intent */}
        <div className="flex-1 p-5 flex flex-col">
          {/* Languages */}
          <div className="mb-4">
            <h3 className="font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-2.5">
              Languages
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.languages.map((lang, idx) => (
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.22 + idx * 0.06, duration: 0.3 }}
                  className="inline-flex items-center gap-1 rounded-full border border-border/40 px-2.5 py-1 text-[11px] font-medium text-foreground"
                  style={{ background: "hsl(var(--primary) / 0.06)" }}
                >
                  <Globe className="h-3 w-3 text-primary/70" />
                  {lang}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border/40 mb-4" />

          {/* Intent */}
          <div>
            <h3 className="font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-2.5">
              Intent
            </h3>
            <div className="space-y-2">
              {profile.relationshipIntent.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + idx * 0.08, duration: 0.35 }}
                  className="flex items-center gap-2 text-foreground/80"
                >
                  <span className="text-primary/60">
                    {intentIcons[item] || <Sparkles className="h-3.5 w-3.5" />}
                  </span>
                  <span className="font-body text-[12px] font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
