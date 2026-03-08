import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke("generate-profile", {
        body: { input: input.trim() },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      navigate("/results", { state: { profile: data.profile, input: input.trim() } });
    } catch (e: any) {
      toast({
        title: "Generation failed",
        description: e.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
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
                Crafting with AI...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Generate Profile
              </span>
            )}
          </Button>
        </motion.div>

        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
      </main>
    </div>
  );
};

export default Index;
