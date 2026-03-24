import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, User, Mail, CheckCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const ONBOARDING_STEPS = [
  { label: "Phone", icon: Phone },
  { label: "Profile", icon: User },
  { label: "Email", icon: Mail },
  { label: "Done", icon: CheckCircle },
];

const ProfileName = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const currentStep = 1;

  const isValid = firstName.trim().length >= 2;

  const handleContinue = () => {
    navigate("/email");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-10">
      {/* Stepper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xs mx-auto mb-14"
      >
        <div className="flex items-start justify-between relative">
          <div className="absolute top-[18px] left-[12%] right-[12%] h-[2px] bg-border/50 rounded-full" />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "33%" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-[18px] left-[12%] h-[2px] rounded-full"
            style={{ background: "var(--gradient-warm)" }}
          />
          {ONBOARDING_STEPS.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === currentStep;
            const isCompleted = i < currentStep;
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
                className="flex flex-col items-center z-10 gap-2"
              >
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive || isCompleted
                      ? "text-primary-foreground shadow-md"
                      : "bg-secondary text-muted-foreground"
                  }`}
                  style={
                    isActive || isCompleted
                      ? {
                          background: "var(--gradient-warm)",
                          boxShadow: "0 4px 14px -3px hsl(12 76% 61% / 0.35)",
                        }
                      : undefined
                  }
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span
                  className={`font-body text-[10px] text-center leading-tight ${
                    isActive ? "text-foreground font-semibold" : "text-muted-foreground/70"
                  }`}
                >
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <h1 className="font-display text-[24px] sm:text-[28px] font-bold text-foreground leading-[1.2]">
            Your name is your first
            <br />
            charm
          </h1>
        </motion.div>

        {/* Name inputs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="space-y-3 mb-3"
        >
          <Input
            type="text"
            placeholder="First name (Minimum 2 characters)"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="rounded-xl border-border/60 bg-card/80 font-body text-[14px] h-12 px-4 placeholder:text-muted-foreground/40"
          />
          <Input
            type="text"
            placeholder="Last name (Optional)"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="rounded-xl border-border/60 bg-card/80 font-body text-[14px] h-12 px-4 placeholder:text-muted-foreground/40"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="font-body text-[12px] text-muted-foreground/60"
        >
          This name will be visible on your Elyxer profile.
        </motion.p>
      </div>

      {/* Bottom section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="w-full max-w-sm mx-auto space-y-4 mt-8"
      >
        {/* Info card */}
        <div
          className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3"
        >
          <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 bg-primary/10">
            <Info className="h-4 w-4 text-primary" />
          </div>
          <p className="font-body text-[12px] text-foreground/80 leading-relaxed">
            Genuine name builds trust and spark real connection
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="font-body text-[13px] font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Can i change my name later?
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
            disabled={!isValid}
            className="h-12 w-12 rounded-xl flex items-center justify-center text-primary-foreground disabled:opacity-40 transition-opacity"
            style={{
              background: isValid ? "var(--gradient-warm)" : "hsl(var(--secondary))",
              boxShadow: isValid
                ? "0 6px 20px -4px hsl(12 76% 61% / 0.35)"
                : undefined,
            }}
          >
            <ArrowRight className={`h-5 w-5 ${!isValid ? "text-muted-foreground" : ""}`} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileName;
