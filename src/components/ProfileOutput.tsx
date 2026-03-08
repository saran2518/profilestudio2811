import { motion } from "framer-motion";
import { Heart, Sparkles, MapPin, BookOpen } from "lucide-react";
import type { GeneratedProfile } from "@/lib/profileGenerator";

interface ProfileOutputProps {
  profile: GeneratedProfile;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const ProfileOutput = ({ profile }: ProfileOutputProps) => {
  return (
    <div className="space-y-6">
      {/* Bio */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="rounded-xl border border-border bg-card p-6"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Heart className="h-5 w-5 text-primary" />
          <h3 className="font-display text-lg font-semibold text-card-foreground">Bio</h3>
        </div>
        <p className="font-body text-card-foreground/80 leading-relaxed italic">
          "{profile.bio}"
        </p>
      </motion.div>

      {/* Interests */}
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="rounded-xl border border-border bg-card p-6"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-accent" />
          <h3 className="font-display text-lg font-semibold text-card-foreground">Interests</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest, idx) => (
            <motion.span
              key={interest}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.06 }}
              className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 font-body text-sm text-primary font-medium"
            >
              {interest}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Narratives */}
      <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="rounded-xl border border-border bg-card p-6"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="font-display text-lg font-semibold text-card-foreground">Narratives</h3>
        </div>
        <div className="space-y-3">
          {profile.narratives.map((narrative, idx) => (
            <p key={idx} className="font-body text-card-foreground/80 leading-relaxed pl-4 border-l-2 border-primary/30">
              {narrative}
            </p>
          ))}
        </div>
      </motion.div>

      {/* Join Me For */}
      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="rounded-xl border border-border bg-card p-6"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-accent" />
          <h3 className="font-display text-lg font-semibold text-card-foreground">Join Me For</h3>
        </div>
        <div className="space-y-3">
          {profile.joinMeFor.map((idea, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.12 }}
              className="flex items-start gap-3"
            >
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 font-display text-xs font-bold text-accent">
                {idx + 1}
              </span>
              <p className="font-body text-card-foreground/80">{idea}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileOutput;
