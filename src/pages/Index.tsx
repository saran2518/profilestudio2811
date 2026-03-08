import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ProfileOutput from "@/components/ProfileOutput";
import { generateProfile, type GeneratedProfile } from "@/lib/profileGenerator";

const Index = () => {
  const [input, setInput] = useState("");
  const [profile, setProfile] = useState<GeneratedProfile | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    setProfile(null);
    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 1200));
    const result = generateProfile(input);
    setProfile(result);
    setIsGenerating(false);
  };

  const handleReset = () => {
    setProfile(null);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 py-6">
        <div className="container max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
            Profile <span className="text-primary italic">Studio</span>
          </h1>
          <p className="mt-1 font-body text-muted-foreground text-sm">
            Craft your perfect dating profile from a simple description
          </p>
        </div>
      </header>

      <main className="container max-w-3xl py-10 space-y-8">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <label className="font-display text-lg font-semibold text-foreground">
            Tell us about yourself
          </label>
          <Textarea
            placeholder="e.g. I'm a creative soul who loves music, cooking Italian food, and exploring hidden coffee shops. I'm looking for someone who enjoys deep conversations and spontaneous adventures..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[140px] resize-none font-body text-base bg-card border-border focus:ring-ring placeholder:text-muted-foreground/50"
          />

          <div className="flex gap-3">
            <Button
              onClick={handleGenerate}
              disabled={!input.trim() || isGenerating}
              className="font-body font-medium"
              style={{
                background: "var(--gradient-warm)",
                boxShadow: input.trim() ? "var(--shadow-warm)" : "none",
              }}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                  Crafting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate Profile
                </span>
              )}
            </Button>

            {profile && (
              <Button
                variant="outline"
                onClick={handleReset}
                className="font-body"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Start Over
              </Button>
            )}
          </div>
        </motion.div>

        {/* Loading shimmer */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-28 rounded-xl bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Output */}
        <AnimatePresence>
          {profile && !isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProfileOutput profile={profile} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
