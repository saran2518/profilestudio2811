import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, UtensilsCrossed, Film, Video, Footprints, MoreHorizontal, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const INVITE_TYPES = [
  { label: "Coffee", icon: Coffee },
  { label: "Dinner", icon: UtensilsCrossed },
  { label: "Movie", icon: Film },
  { label: "Virtual Date", icon: Video },
  { label: "A Long Walk", icon: Footprints },
  { label: "Other", icon: MoreHorizontal },
] as const;

interface InviteDialogProps {
  open: boolean;
  onClose: () => void;
  profileName?: string;
}

export default function InviteDialog({ open, onClose, profileName }: InviteDialogProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleInvite = () => {
    // TODO: handle invite logic
    setSelected(null);
    setMessage("");
    onClose();
  };

  const handleCancel = () => {
    setSelected(null);
    setMessage("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={handleCancel}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-24 z-50 rounded-2xl border border-border/50 bg-card p-5"
            style={{ boxShadow: "0 -8px 40px -8px hsl(var(--foreground) / 0.15)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-card-foreground">
                Send an Invite{profileName ? ` to ${profileName}` : ""}
              </h3>
              <button onClick={handleCancel} className="p-1 rounded-full hover:bg-muted transition-colors">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Invite type chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {INVITE_TYPES.map(({ label, icon: Icon }) => {
                const isActive = selected === label;
                return (
                  <motion.button
                    key={label}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelected(isActive ? null : label)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-colors border ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted/50 text-muted-foreground border-border/50 hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </motion.button>
                );
              })}
            </div>

            {/* Message */}
            <Textarea
              placeholder="Add a note to your invite..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mb-4 resize-none rounded-xl border-border/50 bg-muted/30 text-sm min-h-[72px]"
              maxLength={200}
            />

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleInvite}
                disabled={!selected}
                className="flex-1 rounded-xl"
                style={{ background: selected ? "var(--gradient-warm)" : undefined }}
              >
                Invite
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
