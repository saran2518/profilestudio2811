import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flag, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const REPORT_REASONS = [
  "Inappropriate photos",
  "Fake profile / Catfishing",
  "Harassment or bullying",
  "Spam or scam",
  "Underage user",
  "Other",
];

interface Props {
  open: boolean;
  onClose: () => void;
  profileName: string;
}

export default function ReportDialog({ open, onClose, profileName }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    toast.success(`${profileName} has been reported. We'll review this shortly.`);
    setSelected(null);
    setDescription("");
    onClose();
  };

  const handleCancel = () => {
    setSelected(null);
    setDescription("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleCancel}
      />

      {/* Dialog */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 mx-auto max-w-sm max-h-[85vh] flex flex-col rounded-2xl border border-border bg-card shadow-xl animate-scale-in">
        <div className="p-5 overflow-y-auto flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-destructive">
              <Flag className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Report {profileName}</h3>
            </div>
            <button onClick={handleCancel} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="text-sm text-muted-foreground mb-4">Why are you reporting this profile?</p>

          {/* Reasons */}
          <div className="flex flex-col gap-2 mb-4">
            {REPORT_REASONS.map((reason) => (
              <button
                key={reason}
                onClick={() => setSelected(reason)}
                className={`text-left px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                  selected === reason
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border bg-background text-foreground hover:border-destructive/40"
                }`}
              >
                {reason}
              </button>
            ))}
          </div>

          {/* Description box */}
          <div className="mb-4">
            <Textarea
              placeholder="Add more details (optional)…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl border-border bg-background text-sm"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 py-2.5 rounded-full border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selected}
              className="flex-1 py-2.5 rounded-full bg-destructive text-destructive-foreground text-sm font-medium disabled:opacity-40 transition-colors"
            >
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
