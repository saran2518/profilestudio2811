import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Phone, User, Mail, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ONBOARDING_STEPS = [
  { label: "Phone", icon: Phone },
  { label: "Profile", icon: User },
  { label: "Email", icon: Mail },
  { label: "Done", icon: CheckCircle },
];

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
];

const PhoneVerification = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const currentStep = 0;

  const handleContinue = () => {
    // UI only - navigate to next step
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-10">
      {/* Top section with branding */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-10"
      >
        <p className="font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-primary/70">
          Profile Studio
        </p>
      </motion.div>

      {/* Stepper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-xs mx-auto mb-14"
      >
        <div className="flex items-start justify-between relative">
          {/* Background line */}
          <div className="absolute top-[18px] left-[12%] right-[12%] h-[2px] bg-border/50 rounded-full" />
          {/* Active progress line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "0%" }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
                transition={{ duration: 0.3, delay: 0.15 + i * 0.08 }}
                className="flex flex-col items-center z-10 gap-2"
              >
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "text-primary-foreground shadow-md"
                      : isCompleted
                      ? "text-primary-foreground shadow-sm"
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
                    isActive
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground/70"
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
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-10"
        >
          <h1 className="font-display text-[24px] sm:text-[28px] font-bold text-foreground leading-[1.2] mb-3">
            What's your
            <br />
            <span className="text-primary italic">phone number?</span>
          </h1>
          <p className="font-body text-[13px] text-muted-foreground/70 max-w-[260px] mx-auto leading-relaxed">
            We'll send you a verification code to confirm your number
          </p>
        </motion.div>

        {/* Phone input */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full space-y-4"
        >
          <div className="relative">
            <div
              className="flex items-center rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              {/* Country code selector */}
              <button
                type="button"
                onClick={() => setShowCountryPicker(!showCountryPicker)}
                className="flex items-center gap-1.5 px-4 py-4 border-r border-border/40 hover:bg-secondary/50 transition-colors shrink-0"
              >
                <span className="text-lg">{selectedCountry.flag}</span>
                <span className="font-body text-[14px] font-medium text-foreground">
                  {selectedCountry.code}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>

              {/* Phone number input */}
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border-0 bg-transparent font-body text-[15px] h-auto py-4 px-4 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/40"
              />
            </div>

            {/* Country picker dropdown */}
            {showCountryPicker && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-full rounded-xl border border-border/60 bg-card shadow-lg z-20 overflow-hidden"
              >
                {COUNTRY_CODES.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      setSelectedCountry(country);
                      setShowCountryPicker(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/60 transition-colors font-body text-[13px] ${
                      selectedCountry.code === country.code
                        ? "bg-secondary/40 text-foreground font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span className="flex-1 text-left">{country.name}</span>
                    <span className="text-muted-foreground/60">{country.code}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full max-w-sm mx-auto space-y-4 mt-8"
      >
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleContinue}
            disabled={phoneNumber.length < 6}
            size="lg"
            className="w-full font-body font-semibold rounded-2xl text-[15px] h-[52px] border-0 disabled:opacity-40"
            style={{
              background: phoneNumber.length >= 6 ? "var(--gradient-warm)" : undefined,
              boxShadow:
                phoneNumber.length >= 6
                  ? "0 8px 28px -6px hsl(12 76% 61% / 0.3), 0 2px 8px -2px hsl(340 45% 55% / 0.15)"
                  : undefined,
            }}
          >
            <span className="flex items-center gap-2.5">
              Continue
              <ArrowRight className="h-4 w-4" />
            </span>
          </Button>
        </motion.div>

        <p className="font-body text-[11px] text-muted-foreground/40 text-center leading-relaxed px-4">
          By continuing, you agree to our{" "}
          <span className="text-primary/60 cursor-pointer">Terms of Service</span> and{" "}
          <span className="text-primary/60 cursor-pointer">Privacy Policy</span>
        </p>
      </motion.div>
    </div>
  );
};

export default PhoneVerification;
