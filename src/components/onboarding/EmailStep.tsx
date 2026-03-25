import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface EmailStepProps {
  onNext: (email: string) => void;
  onSkip: () => void;
}

const EmailStep = ({ onNext, onSkip }: EmailStepProps) => {
  const [email, setEmail] = useState("");
  const [stayUpdated, setStayUpdated] = useState(false);
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <>
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
            <label htmlFor="stay-updated" className="font-body text-[14px] font-semibold text-foreground cursor-pointer">
              Stay updated
            </label>
          </div>
          <p className="font-body text-[12px] text-muted-foreground/60 leading-relaxed pl-8">
            Receive important notifications and updates about your account
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="w-full max-w-sm mx-auto space-y-4 mt-8"
      >
        <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
          <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 bg-primary/10">
            <Info className="h-4 w-4 text-primary" />
          </div>
          <p className="font-body text-[12px] text-foreground/80 leading-relaxed">
            Secure, private and used for verification and account recovery
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onSkip}
            className="font-body text-[13px] font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Skip for now
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNext(email)}
            disabled={!isValid}
            className="h-12 w-12 rounded-xl flex items-center justify-center text-primary-foreground disabled:opacity-40 transition-opacity"
            style={{
              background: isValid ? "var(--gradient-warm)" : "hsl(var(--secondary))",
              boxShadow: isValid ? "0 6px 20px -4px hsl(12 76% 61% / 0.35)" : undefined,
            }}
          >
            <ArrowRight className={`h-5 w-5 ${!isValid ? "text-muted-foreground" : ""}`} />
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default EmailStep;
