import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Eye, MessageSquare, Heart, Sparkles, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { datingTopics } from "@/lib/datingTipsData";

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="h-5 w-5" />,
  Eye: <Eye className="h-5 w-5" />,
  MessageSquare: <MessageSquare className="h-5 w-5" />,
  Heart: <Heart className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
  Star: <Star className="h-5 w-5" />,
};

const gradientAccents = [
  "from-[hsl(12,76%,61%)] to-[hsl(340,45%,55%)]",
  "from-[hsl(340,45%,55%)] to-[hsl(280,40%,55%)]",
  "from-[hsl(200,60%,55%)] to-[hsl(170,50%,45%)]",
  "from-[hsl(12,76%,61%)] to-[hsl(35,80%,55%)]",
  "from-[hsl(280,40%,55%)] to-[hsl(12,76%,61%)]",
  "from-[hsl(170,50%,45%)] to-[hsl(200,60%,55%)]",
];

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.08 } } },
  item: {
    initial: { opacity: 0, y: 18, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  },
};

const DatingTips = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col pb-8">
      {/* Header */}
      <header className="sticky top-0 z-30 px-4 pt-3 pb-2">
        <div className="flex items-center gap-3 rounded-full border border-border/30 bg-card/80 backdrop-blur-xl px-4 py-2.5">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="font-display text-base font-semibold text-foreground tracking-tight">Dating Tips</span>
        </div>
      </header>

      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="px-4 mt-2 mb-5"
      >
        <div
          className="relative rounded-[20px] overflow-hidden p-5"
          style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-warm)" }}
        >
          {/* Decorative blurs */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/8 blur-xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary-foreground/80" />
              <span className="text-[11px] font-medium text-primary-foreground/70 uppercase tracking-wider">Your Guide</span>
            </div>
            <h1 className="font-display text-[20px] font-bold text-primary-foreground leading-tight">
              Navigate Dating<br />with Confidence
            </h1>
            <p className="text-[12px] text-primary-foreground/70 mt-2 leading-relaxed max-w-[260px]">
              Thoughtful advice to help you build meaningful connections and present your best self.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Topic blocks */}
      <motion.main
        variants={stagger.container}
        initial="initial"
        animate="animate"
        className="flex-1 px-4 space-y-3"
      >
        {datingTopics.map((topic, i) => (
          <motion.button
            key={topic.slug}
            variants={stagger.item}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/dating-tips/${topic.slug}`)}
            className="w-full rounded-[20px] border border-border/30 bg-card p-4 text-left group hover:border-primary/25 transition-all duration-200"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex items-center gap-4">
              {/* Gradient icon circle */}
              <div
                className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${gradientAccents[i % gradientAccents.length]} flex items-center justify-center shrink-0 text-primary-foreground shadow-sm`}
              >
                {iconMap[topic.icon]}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-display font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                  {topic.title}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed font-body">
                  {topic.subtitle}
                </p>
              </div>

              <div className="h-7 w-7 rounded-full bg-muted/50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
              </div>
            </div>

            {/* Subtle bottom accent line */}
            <div className="mt-3 h-[2px] rounded-full bg-muted/40 overflow-hidden">
              <div
                className={`h-full w-1/3 rounded-full bg-gradient-to-r ${gradientAccents[i % gradientAccents.length]} opacity-40 group-hover:opacity-70 group-hover:w-2/3 transition-all duration-500`}
              />
            </div>
          </motion.button>
        ))}
      </motion.main>
    </div>
  );
};

export default DatingTips;
