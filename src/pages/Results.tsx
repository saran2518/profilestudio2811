import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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

  const [input, setInput] = useState(initialInput);
  const [profile, setProfile] = useState<GeneratedProfile | undefined>(initialProfile);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerate = async () => {
    if (!input.trim()) return;
    setIsRegenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-profile", {
        body: { input: input.trim() },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setProfile(data.profile);
    } catch (e: any) {
      toast({
        title: "Generation failed",
        description: e.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Sparkles className="h-12 w-12 text-muted-foreground mx-auto" />
          <p className="font-body text-muted-foreground">No profile generated yet.</p>
          <Button onClick={() => navigate("/")} className="font-body">Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 py-6">
        <div className="container max-w-3xl flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
              Your <span className="text-primary italic">Profile</span>
            </h1>
            <p className="mt-1 font-body text-muted-foreground text-sm">
              Edit your input or tweak each section below
            </p>
          </div>
        </div>
      </header>

      <main className="container max-w-3xl py-10 space-y-8">
        {/* Profile sections */}
        {isRegenerating ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 rounded-xl bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer" />
            ))}
          </motion.div>
        ) : (
          <ProfileOutput profile={profile} onProfileChange={setProfile} />
        )}

        {/* Buttons at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="pt-2"
        >
          <Button
            onClick={() => navigate("/")}
            className="font-body font-medium"
            style={{
              background: "var(--gradient-warm)",
              boxShadow: "var(--shadow-warm)",
            }}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Create Profile
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Results;
