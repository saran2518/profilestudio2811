import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Eye, MessageSquare, Heart, Sparkles, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { datingTopics } from "@/lib/datingTipsData";

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="h-5 w-5 text-primary" />,
  Eye: <Eye className="h-5 w-5 text-primary" />,
  MessageSquare: <MessageSquare className="h-5 w-5 text-primary" />,
  Heart: <Heart className="h-5 w-5 text-primary" />,
  Sparkles: <Sparkles className="h-5 w-5 text-primary" />,
  Star: <Star className="h-5 w-5 text-primary" />,
};

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
        {datingTopics.map((topic, i) => (
          <motion.button
            key={topic.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/dating-tips/${topic.slug}`)}
            className="w-full rounded-2xl border border-border/30 bg-card p-4 text-left group hover:border-primary/20 transition-all"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                {iconMap[topic.icon]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                  {topic.title}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{topic.subtitle}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary/50 transition-colors shrink-0" />
            </div>
          </motion.button>
        ))}
      </main>
    </div>
  );
};

export default DatingTips;
