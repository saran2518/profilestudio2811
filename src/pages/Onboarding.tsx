import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    num: 1,
    title: "Write About You",
    subtitle: "Interests • Work • Weekends • Passions",
    emoji: "✍️",
  },
  {
    num: 2,
    title: "Structured Profile",
    subtitle: "Inputs organized clearly",
    emoji: "📋",
  },
  {
    num: 3,
    title: "Smart Curation",
    subtitle: "Profiles matched based on depth",
    emoji: "✨",
  },
];

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-3 mb-10"
      >
        <p className="font-body text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground/60">
          Profile Studio
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-tight">
          Craft the story{" "}
          <span className="text-primary italic">that represents you</span>
        </h1>
        <p className="font-body text-sm text-muted-foreground max-w-xs mx-auto">
          Go beyond the bio. Build a profile worth reading.
        </p>
      </motion.div>

      {/* Progress stepper */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full max-w-sm mb-10"
      >
        <div className="flex items-center justify-between relative">
          {/* Connecting line */}
          <div className="absolute top-5 left-[15%] right-[15%] h-[2px] bg-border/60" />
          <div className="absolute top-5 left-[15%] h-[2px] bg-primary/70" style={{ width: "22%" }} />

          {STEPS.map((step, i) => (
            <div key={step.num} className="flex flex-col items-center z-10">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center font-display text-sm font-bold ${
                  i === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/20 text-primary"
                }`}
              >
                {step.num}
              </div>
              <span className="font-body text-[11px] text-muted-foreground mt-2 text-center max-w-[90px]">
                {i === 0
                  ? "Write About You"
                  : i === 1
                  ? "We Structure It"
                  : "Thoughtful Curation"}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Feature cards */}
      <div className="w-full max-w-sm space-y-3 mb-10 flex-1">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
            className="flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-5"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <span className="text-2xl shrink-0">{step.emoji}</span>
            <div>
              <p className="font-display text-[15px] font-semibold text-foreground">
                {step.title}
              </p>
              <p className="font-body text-xs text-muted-foreground mt-0.5">
                {step.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="w-full max-w-sm space-y-3"
      >
        <Button
          onClick={() => navigate("/create")}
          size="lg"
          className="w-full font-body font-medium rounded-xl text-[15px] h-12"
          style={{
            background: "var(--gradient-warm)",
            boxShadow: "var(--shadow-warm)",
          }}
        >
          <span className="flex items-center gap-2">
            Create My Profile
            <ArrowRight className="h-4 w-4" />
          </span>
        </Button>
        <p className="font-body text-xs text-muted-foreground/50 text-center">
          Takes about 3 minutes
        </p>
      </motion.div>
    </div>
  );
};

export default Onboarding;
