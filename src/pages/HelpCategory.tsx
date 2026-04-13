import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { faqCategories } from "@/lib/faqData";

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.06 } } },
  item: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
  },
};

const HelpCategory = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const category = faqCategories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Category not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pb-8">
      <header className="sticky top-0 z-30 px-4 pt-3 pb-2">
        <div className="flex items-center gap-3 px-4 py-2.5">
          <Button variant="ghost" size="sm" className="text-primary font-medium gap-1 px-0" onClick={() => navigate("/help-faq")}>
            <ArrowLeft className="h-4 w-4" />
            Help
          </Button>
          <span className="font-display text-base font-semibold text-foreground tracking-tight">
            {category.title}
          </span>
        </div>
      </header>

      <main className="flex-1 px-4 mt-2">
        <motion.div variants={stagger.container} initial="initial" animate="animate" className="flex flex-col gap-4">
          <motion.p variants={stagger.item} className="text-[13px] text-muted-foreground px-1">
            {category.subtitle}
          </motion.p>

          <motion.div variants={stagger.item} className="flex flex-col">
            {category.questions.map((q, i) => (
              <button
                key={i}
                onClick={() => navigate(`/help-faq/${slug}/${i}`)}
                className="w-full flex items-center justify-between py-4 border-b border-border/20 hover:bg-accent/5 transition-colors group px-1"
              >
                <span className="text-[14px] text-foreground text-left pr-4 leading-snug">{q.question}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 group-hover:text-primary/50 transition-colors" />
              </button>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default HelpCategory;
