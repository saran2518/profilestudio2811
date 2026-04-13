import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { faqCategories } from "@/lib/faqData";

const HelpQuestion = () => {
  const navigate = useNavigate();
  const { slug, questionIndex } = useParams<{ slug: string; questionIndex: string }>();
  const category = faqCategories.find((c) => c.slug === slug);
  const qIdx = Number(questionIndex);
  const faq = category?.questions[qIdx];

  if (!category || !faq) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Question not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pb-8">
      <header className="sticky top-0 z-30 px-4 pt-3 pb-2">
        <div className="flex items-center gap-3 px-4 py-2.5">
          <Button variant="ghost" size="sm" className="text-primary font-medium gap-1 px-0" onClick={() => navigate(`/help-faq/${slug}`)}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <span className="font-display text-base font-semibold text-foreground tracking-tight">
            {category.title}
          </span>
        </div>
      </header>

      <main className="flex-1 px-6 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-5"
        >
          <h2 className="text-[17px] font-semibold text-foreground leading-snug">
            {faq.question}
          </h2>
          <div className="h-px bg-border/30" />
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            {faq.answer}
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default HelpQuestion;
