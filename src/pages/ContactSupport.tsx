import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const subjects = [
  "Account Issue",
  "Profile Help",
  "Billing & Payments",
  "Safety Concern",
  "Bug Report",
  "Feature Request",
  "Other",
];

const ContactSupport = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSend = () => {
    if (!subject || !message.trim()) {
      toast.error("Please fill in subject and message");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-8">
      {/* Header */}
      <header className="sticky top-0 z-30 px-4 pt-3 pb-2">
        <div className="flex items-center gap-3 rounded-full border border-border/30 bg-card/80 backdrop-blur-xl px-4 py-2.5">
          <button
            onClick={() => navigate(-1)}
            className="text-[13px] font-medium text-primary"
          >
            Close
          </button>
          <span className="flex-1 text-center font-display text-base font-semibold text-foreground tracking-tight">
            Contact Support
          </span>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 px-4 mt-4 flex flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-5"
        >
          {/* Subtitle */}
          <p className="text-[13px] text-muted-foreground text-center">
            We usually respond within 24 hours.
          </p>

          {/* Subject Select */}
          <div className="flex flex-col gap-1.5">
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="h-11 rounded-xl border-border/30 bg-card text-[13px]" style={{ boxShadow: "var(--shadow-card)" }}>
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s} value={s} className="text-[13px]">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <Textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px] rounded-xl border-border/30 bg-card text-[13px] placeholder:text-muted-foreground/50 resize-none"
            style={{ boxShadow: "var(--shadow-card)" }}
          />

          {/* Attachment */}
          <div className="flex flex-col gap-2">
            <p className="text-[12px] text-muted-foreground font-medium px-1">Attachment (optional)</p>
            <button className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-dashed border-border/40 bg-card/50 hover:border-primary/30 transition-colors">
              <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Plus className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-[12px] text-muted-foreground font-medium">Add a screenshot</span>
            </button>
          </div>

        </motion.div>
      </main>

      {/* Submit Button */}
      <div className="px-4 mt-auto pt-4 pb-8">
        <Button
          onClick={handleSend}
          disabled={submitted}
          className="w-full h-12 rounded-2xl text-[15px] font-semibold text-primary-foreground"
          style={{ background: "var(--gradient-warm)" }}
        >
          {submitted ? "Submitted" : "Submit"}
        </Button>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm px-8"
            onClick={() => navigate(-1)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              className="bg-card rounded-2xl border border-border/30 px-8 py-10 flex flex-col items-center gap-4 shadow-xl max-w-[280px] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-[18px] font-display font-semibold text-foreground">Submitted</h3>
              <p className="text-[12px] text-muted-foreground text-center leading-relaxed">
                We have received your message. We will get back to you shortly.
              </p>
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="mt-2 rounded-xl text-[13px] px-6"
              >
                Done
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactSupport;
