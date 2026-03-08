import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileOutput from "@/components/ProfileOutput";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { GeneratedProfile } from "@/lib/profileGenerator";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const initialProfile = location.state?.profile as GeneratedProfile | undefined;
  const initialInput = (location.state?.input as string) || "";

  const [profile, setProfile] = useState<GeneratedProfile | undefined>(initialProfile);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyAll = async () => {
    if (!profile) return;
    const text = [
      `Bio: ${profile.bio}`,
      `\nInterests: ${profile.interests.join(", ")}`,
      `\nNarratives:\n${profile.narratives.map((n, i) => `${i + 1}. ${n}`).join("\n")}`,
      `\nJoin Me For:\n${profile.joinMeFor.map((j, i) => `${i + 1}. ${j}`).join("\n")}`,
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Copied to clipboard!", description: "Paste it into your dating app." });
    setTimeout(() => setCopied(false), 2000);
  };

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
          <div>
            <p className="font-display text-xl font-semibold text-foreground">No profile yet</p>
            <p className="mt-1 font-body text-sm text-muted-foreground">
              Head back and describe yourself to generate one.
            </p>
          </div>
          <Button onClick={() => navigate("/")} className="font-body" size="lg">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container max-w-2xl flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="shrink-0 rounded-xl h-9 w-9"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                Your <span className="text-primary italic">Profile</span>
              </h1>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyAll}
            className="font-body text-xs rounded-lg gap-1.5"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : "Copy All"}
          </Button>
        </div>
      </header>

      <main className="container max-w-2xl py-8 pb-16 space-y-8">
        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-body text-xs text-muted-foreground/60 text-center"
        >
          Tap the edit button on any section to customize it
        </motion.p>

        {/* Profile sections */}
        {isRegenerating ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 rounded-2xl bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer"
              />
            ))}
          </motion.div>
        ) : (
          <ProfileOutput profile={profile} onProfileChange={setProfile} />
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-3 pt-4"
        >
          <div className="h-px w-16 bg-border/50" />
          <p className="font-body text-xs text-muted-foreground/50">
            Want a fresh take?
          </p>
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="font-body font-medium rounded-xl px-8 text-[15px] h-12"
            style={{
              background: "var(--gradient-warm)",
              boxShadow: "var(--shadow-warm)",
            }}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Create New Profile
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Results;