import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PROMPT_STARTERS = [
  "I'm someone who loves...",
  "People notice that I...",
  "My passions include...",
  "I geek out over...",
  "My friends would say I'm...",
  "The most spontaneous thing I've done is...",
  "A perfect date for me is...",
  "On weekends you'll find me...",
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleStarterClick = (starter: string) => {
    setInput((prev) => (prev ? prev.trimEnd() + " " + starter : starter));
    // Focus textarea after adding starter
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  // Track scroll position for dot indicators
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const itemWidth = 180;
      const idx = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(idx, PROMPT_STARTERS.length - 1));
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const totalDots = Math.min(5, PROMPT_STARTERS.length);
  const dotIndex = Math.min(
    Math.floor(activeIndex / (PROMPT_STARTERS.length / totalDots)),
    totalDots - 1
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="pt-10 pb-6">
        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Profile <span className="text-primary italic">Studio</span>
            </h1>
            <p className="mt-2 font-body text-muted-foreground text-sm">
              Describe yourself and let AI craft your perfect dating profile
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container max-w-2xl pb-16 flex-1 space-y-6">
        {/* Prompt starters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="space-y-3"
        >
          <p className="font-body text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
            Tap a prompt to get started
          </p>
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory -mx-2 px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {PROMPT_STARTERS.map((starter, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.03, duration: 0.3 }}
                onClick={() => handleStarterClick(starter)}
                className="snap-start shrink-0 rounded-full border border-border/80 bg-card px-4 py-2 font-body text-[13px] text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                {starter}
              </motion.button>
            ))}
          </div>
          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-1.5 pt-1">
            {Array.from({ length: totalDots }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === dotIndex
                    ? "w-5 bg-primary/70"
                    : "w-1.5 bg-muted-foreground/20"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Input card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 space-y-5"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <PenLine className="h-4 w-4 text-primary" />
            </div>
            <label className="font-display text-lg font-semibold text-foreground">
              Tell us about yourself
            </label>
          </div>

          <Textarea
            ref={textareaRef}
            placeholder="Start typing or tap a prompt above... Describe your personality, hobbies, what you're looking for, and your ideal date."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[200px] resize-none font-body text-[15px] leading-relaxed bg-background/50 border-border/50 rounded-xl focus:ring-primary/20 focus:border-primary/30 placeholder:text-muted-foreground/40 transition-colors"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="font-body text-xs text-muted-foreground/50">
              {input.length > 0
                ? `${input.trim().split(/\s+/).filter(Boolean).length} words`
                : "The more you share, the better your profile"}
            </span>
            <Button
              onClick={handleGenerate}
              disabled={!input.trim() || isGenerating}
              size="lg"
              className="font-body font-medium rounded-xl px-8 text-[15px] transition-all duration-300"
              style={{
                background: input.trim()
                  ? "var(--gradient-warm)"
                  : undefined,
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
          </div>
        </motion.div>

        {/* Loading skeleton */}
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