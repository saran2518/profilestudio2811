import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface PhoneOTPStepProps {
  phoneNumber: string;
  onNext: () => void;
  onBack: () => void;
}

const PhoneOTPStep = ({ phoneNumber, onNext, onBack }: PhoneOTPStepProps) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <h1 className="font-display text-[24px] sm:text-[28px] font-bold text-foreground leading-[1.2] mb-2">
            Enter verification code
          </h1>
          <p className="font-body text-[13px] text-muted-foreground/70 leading-relaxed">
            We've sent a 6-digit code to
          </p>
          <p className="font-body text-[14px] font-semibold text-foreground mt-0.5">
            {phoneNumber}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-6"
        >
          <InputOTP maxLength={6} value={otp} onChange={setOtp} containerClassName="gap-3 justify-start">
            <InputOTPGroup className="gap-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="h-14 w-12 rounded-xl border-border/60 bg-card/80 text-lg font-display font-semibold text-foreground first:rounded-xl first:border-l last:rounded-xl"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </motion.div>

        <p className="font-body text-[12px] text-muted-foreground/60 mb-4">
          For your security, don't share this code.
        </p>

        <div className="text-center space-y-3 mb-4">
          <p className="font-body text-[13px] text-muted-foreground/70">
            Code expires in <span className="font-semibold text-foreground">{formatTime(timeLeft)}</span>
          </p>
          <p className="font-body text-[13px] text-muted-foreground/60">Didn't receive the code?</p>
          <button
            type="button"
            onClick={() => { setTimeLeft(120); setOtp(""); }}
            className="font-body text-[13px] font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Resend code
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full max-w-sm mx-auto flex items-center justify-between mt-8"
      >
        <button
          type="button"
          onClick={onBack}
          className="font-body text-[13px] font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Change phone number
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          disabled={otp.length < 6}
          className="h-12 w-12 rounded-xl flex items-center justify-center text-primary-foreground disabled:opacity-40 transition-opacity"
          style={{
            background: otp.length >= 6 ? "var(--gradient-warm)" : "hsl(var(--secondary))",
            boxShadow: otp.length >= 6 ? "0 6px 20px -4px hsl(12 76% 61% / 0.35)" : undefined,
          }}
        >
          <ArrowRight className={`h-5 w-5 ${otp.length < 6 ? "text-muted-foreground" : ""}`} />
        </motion.button>
      </motion.div>
    </>
  );
};

export default PhoneOTPStep;
