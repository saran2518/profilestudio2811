import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PROMPT_STARTERS = [
  // Bio-focused
  "I'm someone who loves...",
  "People notice that I...",
  // Interests-focused
  "My passions include...",
  "I geek out over...",
  // Narratives-focused
  "My friends would say I'm...",
  "The most spontaneous thing I've done is...",
  // Date ideas-focused
  "A perfect date for me is...",
  "On weekends you'll find me...",
  // Personality & partner
  "I value most in a partner...",
  "I can't stop talking about...",
];

const Index = () => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Track scroll position for dot indicators
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const itemWidth = 180; // approx chip width + gap
      const idx = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(idx, PROMPT_STARTERS.length - 1));
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const totalDots = Math.min(5, PROMPT_STARTERS.length);
  const dotIndex = Math.min(Math.floor(activeIndex / (PROMPT_STARTERS.length / totalDots)), totalDots - 1);

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
        {/* Prompt starters slider */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-3"
        >
          <p className="font-body text-sm text-muted-foreground">
            Not sure what to write? Tap a starter to begin:
          </p>
          <div
            ref={scrollRef}
            className="flex gap-2.5 overflow-x-auto pb-1 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {PROMPT_STARTERS.map((starter, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.04, duration: 0.25 }}
                onClick={() => setInput((prev) => prev ? prev.trimEnd() + " " + starter : starter)}
                className="snap-start shrink-0 rounded-full border border-border bg-card px-4 py-2 font-body text-sm text-card-foreground/80 hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-pointer whitespace-nowrap"
              >
                {starter}
              </motion.button>
            ))}
          </div>
          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-1.5">
            {Array.from({ length: totalDots }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === dotIndex ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/30"
                }`}
              />
            ))}
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