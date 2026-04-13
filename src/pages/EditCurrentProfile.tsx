import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileOutput from "@/components/ProfileOutput";
import type { GeneratedProfile } from "@/lib/profileGenerator";
import { PROFILES } from "@/lib/profilesData";

const EditCurrentProfile = () => {
  const navigate = useNavigate();
  const template = PROFILES[0];

  const initialProfile: GeneratedProfile = {
    bio: template.bio,
    interests: template.interests,
    narratives: template.narratives,
    joinMeFor: template.joinMeFor,
  };

  const [profile, setProfile] = useState<GeneratedProfile>(initialProfile);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container max-w-2xl flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="shrink-0 rounded-xl h-9 w-9"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              Edit <span className="text-primary italic">Profile</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="container max-w-2xl py-6 pb-16 space-y-6">
        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="font-body text-xs text-muted-foreground/60 text-center"
        >
          Tap the edit button on any section to customize it
        </motion.p>

        {/* Profile sections */}
        <ProfileOutput profile={profile} onProfileChange={setProfile} />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-3 pt-4"
        >
          <div className="h-px w-16 bg-border/50" />
          <Button
            onClick={() => navigate("/preview", { state: { profile } })}
            variant="outline"
            size="lg"
            className="font-body font-medium rounded-xl px-8 text-[15px] h-12 w-full max-w-xs"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview Profile
          </Button>
          <Button
            onClick={() => navigate("/edit-profile")}
            size="lg"
            className="font-body font-medium rounded-xl px-8 text-[15px] h-12 w-full max-w-xs"
            style={{
              background: "var(--gradient-warm)",
              boxShadow: "var(--shadow-warm)",
            }}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default EditCurrentProfile;
