import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const DELETE_REASONS = [
  { label: "Found someone", emoji: "💑" },
  { label: "Taking a break", emoji: "☕" },
  { label: "Privacy concerns", emoji: "🔒" },
  { label: "Other", emoji: "✏️" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const DeleteAccountDialog = ({ open, onClose }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Account deletion requested",
      description: "We're sorry to see you go. Your request is being processed.",
    });
    setSelected(null);
    setDescription("");
    onClose();
  };

  const handleCancel = () => {
    setSelected(null);
    setDescription("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60" onClick={handleCancel} />
          <motion.div
            className="relative z-10 w-full max-w-md mx-4 mb-4 sm:mb-0 rounded-2xl bg-card border border-border/30 shadow-xl overflow-hidden"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-2">
              <div className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-destructive" />
                <h3 className="text-base font-semibold text-foreground">Delete Account</h3>
              </div>
              <button onClick={handleCancel} className="rounded-full p-1 hover:bg-muted/50 transition-colors">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <p className="px-5 text-[13px] text-muted-foreground mb-3">
              We're sad to see you go. Please let us know why you're leaving so we can improve.
            </p>

            <div className="px-5 space-y-1.5 max-h-[240px] overflow-y-auto">
              {DELETE_REASONS.map((reason) => (
                <button
                  key={reason.label}
                  onClick={() => setSelected(reason.label)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all text-[13px] font-medium ${
                    selected === reason.label
                      ? "bg-destructive/10 text-destructive border border-destructive/30"
                      : "bg-muted/30 text-foreground hover:bg-muted/50 border border-transparent"
                  }`}
                >
                  <span className="text-base">{reason.emoji}</span>
                  {reason.label}
                </button>
              ))}
            </div>

            <div className="px-5 mt-3">
              <Textarea
                placeholder="Tell us more (optional)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl border-border/30 bg-muted/20 text-[13px] min-h-[70px] resize-none"
              />
            </div>

            <div className="flex gap-2 px-5 py-4">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1 rounded-xl"
                disabled={!selected}
                onClick={handleSubmit}
              >
                Delete Account
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteAccountDialog;
