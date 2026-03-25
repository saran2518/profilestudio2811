import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { Input } from "@/components/ui/input";

interface NameStepProps {
  onNext: () => void;
}

const NameStep = ({ onNext }: NameStepProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const isValid = firstName.trim().length >= 2;

  return (
    <>
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

        <p className="font-body text-[12px] text-muted-foreground/60">
          This name will be visible on your Elyxer profile.
        </p>
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
            Genuine name builds trust and spark real connection
          </p>
        </div>

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
            onClick={onNext}
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

export default NameStep;
