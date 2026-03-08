import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PROMPT_SUGGESTIONS = [
  "I'm a software engineer who loves hiking, board games, and trying new restaurants. Looking for someone witty and adventurous.",
  "Creative writer, yoga enthusiast, and dog mom. I spend weekends at farmers markets and live music shows. Want someone who values deep connection.",
  "Fitness lover and amateur chef who travels every chance I get. I'm fluent in sarcasm and always down for a spontaneous road trip.",
  "Introverted bookworm by day, karaoke star by night. I love cozy coffee shops, sci-fi movies, and meaningful conversations over wine.",
  "Outdoor adventurer — rock climbing, kayaking, camping. I also love cooking for friends and binge-watching documentaries on rainy days.",
  "Music producer and vinyl collector. I'm into street photography, spicy food, and finding the best hole-in-the-wall spots in the city.",
];

const Index = () => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -260 : 260, behavior: "smooth" });
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
        {/* Prompt suggestions slider */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-2"
        >
          <p className="font-body text-sm text-muted-foreground">
            Not sure what to write? Try one of these:
          </p>
          <div className="relative group">
            <button
              onClick={() => scroll("left")}
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-card border border-border shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
            >
              <ChevronLeft className="h-4 w-4 text-foreground" />
            </button>
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {PROMPT_SUGGESTIONS.map((prompt, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.06, duration: 0.3 }}
                  onClick={() => setInput(prompt)}
                  className="snap-start shrink-0 w-[240px] rounded-lg border border-border bg-card p-3 text-left font-body text-xs text-card-foreground/80 leading-relaxed hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-pointer"
                >
                  <span className="line-clamp-3">{prompt}</span>
                </motion.button>
              ))}
            </div>
            <button
              onClick={() => scroll("right")}
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-card border border-border shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
            >
              <ChevronRight className="h-4 w-4 text-foreground" />
            </button>
          </div>
        </motion.div>

        {/* Input area */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
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