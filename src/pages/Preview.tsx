import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import BioSection from "@/components/discover/BioSection";
import InterestsSection from "@/components/discover/InterestsSection";
import NarrativesSection from "@/components/discover/NarrativesSection";
import JoinMeForSection from "@/components/discover/JoinMeForSection";
import type { GeneratedProfile } from "@/lib/profileGenerator";

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const profile = location.state?.profile as GeneratedProfile | undefined;

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-5 p-8"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <Sparkles className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="font-display text-xl font-semibold text-foreground">No profile to preview</p>
          <Button onClick={() => navigate(-1)} className="font-body" size="lg">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Back button header */}
      <header className="sticky top-0 z-30 px-4 pt-3 pb-2">
        <div className="flex items-center gap-3 rounded-full border border-border/40 bg-card/70 backdrop-blur-xl px-4 py-2.5"
          style={{ boxShadow: "0 4px 24px -4px hsl(var(--foreground) / 0.06)" }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0 rounded-full h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="font-display text-base font-semibold text-foreground">Profile Preview</span>
        </div>
      </header>

      {/* Profile card sections */}
      <main className="flex-1 px-4 pb-8 space-y-5 mt-2">
        <BioSection bio={profile.bio} />
        <InterestsSection interests={profile.interests} />
        <NarrativesSection narratives={profile.narratives} />
        <JoinMeForSection items={profile.joinMeFor} />
      </main>
    </div>
  );
};

export default Preview;
