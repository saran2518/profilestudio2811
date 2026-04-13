import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Sparkles, Camera, MessageSquare, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const tips = [
  { icon: <Camera className="h-4 w-4 text-primary" />, title: "First Impressions Matter", desc: "Choose a clear, smiling photo as your main picture. Natural lighting and genuine expressions attract more interest." },
  { icon: <Sparkles className="h-4 w-4 text-primary" />, title: "Be Authentic", desc: "Share genuine interests and hobbies to attract the right matches. Authenticity builds stronger connections." },
  { icon: <MessageSquare className="h-4 w-4 text-primary" />, title: "Start Conversations", desc: "Reference something specific from their profile. Personalized openers get 3x more responses than generic greetings." },
  { icon: <Star className="h-4 w-4 text-primary" />, title: "Show Your Personality", desc: "Use narratives and prompts to reveal your unique character. Profiles with completed narratives get 40% more engagement." },
  { icon: <Shield className="h-4 w-4 text-primary" />, title: "Stay Safe", desc: "Always meet in public places for the first few dates. Trust your instincts and take your time getting to know someone." },
  { icon: <Heart className="h-4 w-4 text-primary" />, title: "Be Open-Minded", desc: "Don't limit yourself to a narrow checklist. Some of the best connections happen when you least expect them." },
];

const DatingTips = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col pb-8">
      <header className="sticky top-0 z-30 px-4 pt-3 pb-2">
        <div className="flex items-center gap-3 rounded-full border border-border/30 bg-card/80 backdrop-blur-xl px-4 py-2.5">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="font-display text-base font-semibold text-foreground tracking-tight">Dating Tips</span>
        </div>
      </header>

      <main className="flex-1 px-4 mt-2 space-y-3">
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            className="rounded-2xl border border-border/30 bg-card p-4"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                {tip.icon}
              </div>
              <div>
                <p className="text-[14px] font-medium text-foreground leading-tight">{tip.title}</p>
                <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </main>
    </div>
  );
};

export default DatingTips;
