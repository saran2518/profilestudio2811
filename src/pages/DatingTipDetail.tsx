import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Eye, MessageSquare, Heart, Sparkles, Star } from "lucide-react";
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

const DatingTipDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const topic = datingTopics.find((t) => t.slug === slug);

  if (!topic) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Topic not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pb-8">
      <header className="sticky top-0 z-30 px-4 pt-3 pb-2">
        <div className="flex items-center gap-3 rounded-full border border-border/30 bg-card/80 backdrop-blur-xl px-4 py-2.5">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="font-display text-base font-semibold text-foreground tracking-tight truncate">
            {topic.title}
          </span>
        </div>
      </header>

      {/* Hero */}
      <div className="px-4 mt-2 mb-4">
        <div className="rounded-2xl border border-border/30 bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              {iconMap[topic.icon]}
            </div>
            <div>
              <h1 className="text-[16px] font-display font-semibold text-foreground leading-tight">{topic.title}</h1>
              <p className="text-[12px] text-muted-foreground mt-0.5">{topic.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 px-4 space-y-3">
        {topic.tips.map((tip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            className="rounded-2xl border border-border/30 bg-card p-4"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <p className="text-[14px] font-semibold text-foreground leading-tight">{tip.title}</p>
            <p className="text-[12px] text-muted-foreground mt-1.5 leading-relaxed">{tip.description}</p>
          </motion.div>
        ))}
      </main>
    </div>
  );
};

export default DatingTipDetail;
