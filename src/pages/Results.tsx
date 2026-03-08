import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileOutput from "@/components/ProfileOutput";
import type { GeneratedProfile } from "@/lib/profileGenerator";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const profile = location.state?.profile as GeneratedProfile | undefined;

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Sparkles className="h-12 w-12 text-muted-foreground mx-auto" />
          <p className="font-body text-muted-foreground">No profile generated yet.</p>
          <Button onClick={() => navigate("/")} className="font-body">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 py-6">
        <div className="container max-w-3xl flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
              Your <span className="text-primary italic">Profile</span>
            </h1>
            <p className="mt-1 font-body text-muted-foreground text-sm">
              AI-crafted from your description
            </p>
          </div>
        </div>
      </header>

      <main className="container max-w-3xl py-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ProfileOutput profile={profile} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex gap-3"
        >
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="font-body"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Create Another
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Results;
