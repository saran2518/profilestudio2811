import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { faqCategories } from "@/lib/faqData";
import { useState } from "react";

const HelpQuestion = () => {
  const navigate = useNavigate();
  const { slug, questionIndex } = useParams<{ slug: string; questionIndex: string }>();
  const category = faqCategories.find((c) => c.slug === slug);
  const qIdx = Number(questionIndex);
  const faq = category?.questions[qIdx];
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);

  if (!category || !faq) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Question not found.</p>
      </div>
    );
  }

  // Get other questions in same category for "related" section
  const relatedQuestions = category.questions
    .map((q, i) => ({ ...q, idx: i }))
    .filter((_, i) => i !== qIdx)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background flex flex-col pb-8">
      {/* Header */}
      <header className="sticky top-0 z-30 px-4 pt-3 pb-2">
        <div className="flex items-center gap-2 px-2 py-2.5">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary font-medium gap-1 px-2 hover:bg-primary/5"
            onClick={() => navigate(`/help-faq/${slug}`)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <span className="font-display text-base font-semibold text-foreground tracking-tight">
            {category.title}
          </span>
        </div>
      </header>

      <main className="flex-1 px-5 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col gap-6"
        >
          {/* Question title */}
          <h2 className="text-[18px] font-display font-semibold text-foreground leading-snug">
            {faq.question}
          </h2>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-border/40 via-border/20 to-transparent" />

          {/* Answer */}
          <div className="rounded-2xl border border-border/15 bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
            <p className="text-[14px] text-muted-foreground leading-[1.7]">
              {faq.answer}
            </p>
          </div>

          {/* Feedback */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-3 py-2"
          >
            <p className="text-[12px] text-muted-foreground/70">Was this helpful?</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className={`rounded-xl gap-1.5 text-[12px] px-4 transition-all ${
                  feedback === "yes" ? "border-primary/40 bg-primary/5 text-primary" : "border-border/20"
                }`}
                onClick={() => setFeedback("yes")}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                Yes
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`rounded-xl gap-1.5 text-[12px] px-4 transition-all ${
                  feedback === "no" ? "border-destructive/40 bg-destructive/5 text-destructive" : "border-border/20"
                }`}
                onClick={() => setFeedback("no")}
              >
                <ThumbsDown className="h-3.5 w-3.5" />
                No
              </Button>
            </div>
            {feedback === "no" && (
              <motion.button
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[12px] text-primary font-medium mt-1"
                onClick={() => navigate("/contact-support")}
              >
                Contact support for more help →
              </motion.button>
            )}
          </motion.div>

          {/* Related questions */}
          {relatedQuestions.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-1">
                Related Questions
              </p>
              <div
                className="rounded-2xl border border-border/15 bg-card overflow-hidden"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                {relatedQuestions.map((rq, i) => (
                  <button
                    key={rq.idx}
                    onClick={() => navigate(`/help-faq/${slug}/${rq.idx}`)}
                    className={`w-full flex items-center justify-between py-3.5 px-5 hover:bg-accent/5 transition-colors group ${
                      i < relatedQuestions.length - 1 ? "border-b border-border/15" : ""
                    }`}
                  >
                    <span className="text-[13px] text-foreground text-left pr-4 leading-snug">{rq.question}</span>
                    <MessageCircle className="h-3.5 w-3.5 shrink-0 text-muted-foreground/25 group-hover:text-primary/40 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default HelpQuestion;
