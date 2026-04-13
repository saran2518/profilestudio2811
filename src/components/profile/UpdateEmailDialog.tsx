import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  currentEmail?: string;
}

const UpdateEmailDialog = ({ open, onClose, currentEmail }: Props) => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    if (!isValid) return;
    toast({
      title: "Verification email sent ✉️",
      description: `We've sent a verification link to ${email}`,
    });
    setEmail("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sheet */}
          <motion.div
            className="relative w-full max-w-md rounded-t-3xl bg-card border border-border/20 shadow-2xl overflow-hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/20" />
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground hover:bg-muted/60 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="px-6 pt-2 pb-8 space-y-5">
              {/* Header */}
              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-[16px] font-bold text-foreground">Update Email</h3>
                <p className="text-[12px] text-muted-foreground/70 text-center leading-relaxed">
                  {currentEmail
                    ? `Current email: ${currentEmail}`
                    : "Add an email to secure your account & receive updates"}
                </p>
              </motion.div>

              {/* Input */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Input
                  type="email"
                  placeholder="Enter your new email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-border/30 bg-muted/20 text-[14px] placeholder:text-muted-foreground/40 focus-visible:ring-primary/30"
                />
              </motion.div>

              {/* Info */}
              <motion.p
                className="text-[11px] text-muted-foreground/50 text-center leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                We'll send a verification link to confirm your new email
              </motion.p>

              {/* Actions */}
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <button
                  onClick={onClose}
                  className="flex-1 h-12 rounded-2xl border border-border/30 bg-card text-foreground font-semibold text-[13px] hover:bg-muted/40 active:scale-[0.98] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isValid}
                  className="flex-1 h-12 rounded-2xl bg-primary text-primary-foreground font-semibold text-[13px] flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none"
                >
                  Verify
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateEmailDialog;
