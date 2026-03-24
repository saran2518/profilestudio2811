import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, User, Mail, CheckCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const ONBOARDING_STEPS = [
  { label: "Phone", icon: Phone },
  { label: "Profile", icon: User },
  { label: "Email", icon: Mail },
  { label: "Done", icon: CheckCircle },
];

const EmailEntry = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [stayUpdated, setStayUpdated] = useState(false);
  const currentStep = 2;

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleContinue = () => {
    navigate("/verify-email", { state: { email } });
  };

  const handleSkip = () => {
    navigate("/onboarding");
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
            animate={{ width: "66%" }}
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
          className="mb-6"
        >
          <h1 className="font-display text-[24px] sm:text-[28px] font-bold text-foreground leading-[1.2]">
            Your Email keeps you
            <br />
            connected
          </h1>
        </motion.div>

        {/* Email input */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="space-y-3 mb-6"
        >
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border-border/60 bg-card/80 font-body text-[14px] h-12 px-4 placeholder:text-muted-foreground/40"
          />
          <p className="font-body text-[12px] text-muted-foreground/60 leading-relaxed">
            We'll send you a verification code to confirm your email address.
          </p>
        </motion.div>

        {/* Stay updated checkbox */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-3">
            <Checkbox
              id="stay-updated"
              checked={stayUpdated}
              onCheckedChange={(checked) => setStayUpdated(checked === true)}
              className="h-5 w-5 rounded border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label
              htmlFor="stay-updated"
              className="font-body text-[14px] font-semibold text-foreground cursor-pointer"
            >
              Stay updated
            </label>
          </div>
          <p className="font-body text-[12px] text-muted-foreground/60 leading-relaxed pl-8">
            Receive important notifications and updates about your account
          </p>
        </motion.div>
      </div>

      {/* Bottom section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="w-full max-w-sm mx-auto space-y-4 mt-8"
      >
        {/* Info card */}
        <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
          <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 bg-primary/10">
            <Info className="h-4 w-4 text-primary" />
          </div>
          <p className="font-body text-[12px] text-foreground/80 leading-relaxed">
            Secure, private and used for verification and account recovery
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleSkip}
            className="font-body text-[13px] font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Skip for now
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

export default EmailEntry;
