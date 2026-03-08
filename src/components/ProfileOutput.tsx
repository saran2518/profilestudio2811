import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, MapPin, BookOpen, Pencil, Plus, X, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { GeneratedProfile } from "@/lib/profileGenerator";

interface ProfileOutputProps {
  profile: GeneratedProfile;
  onProfileChange?: (profile: GeneratedProfile) => void;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

type EditTarget =
  | { type: "bio" }
  | { type: "narrative"; index: number }
  | { type: "joinMeFor"; index: number }
  | { type: "interests" }
  | null;

const ProfileOutput = ({ profile, onProfileChange }: ProfileOutputProps) => {
  const [current, setCurrent] = useState<GeneratedProfile>(profile);
  const [editTarget, setEditTarget] = useState<EditTarget>(null);
  const [draft, setDraft] = useState("");
  const [interestsDraft, setInterestsDraft] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState("");

  const update = (patch: Partial<GeneratedProfile>) => {
    const next = { ...current, ...patch };
    setCurrent(next);
    onProfileChange?.(next);
  };

  const openEdit = (target: EditTarget) => {
    if (!target) return;
    if (target.type === "bio") {
      setDraft(current.bio);
    } else if (target.type === "narrative") {
      setDraft(current.narratives[target.index]);
    } else if (target.type === "joinMeFor") {
      setDraft(current.joinMeFor[target.index]);
    } else if (target.type === "interests") {
      setInterestsDraft([...current.interests]);
      setNewInterest("");
    }
    setEditTarget(target);
  };

  const saveEdit = () => {
    if (!editTarget) return;
    if (editTarget.type === "bio") {
      update({ bio: draft });
    } else if (editTarget.type === "narrative") {
      const next = [...current.narratives];
      next[editTarget.index] = draft;
      update({ narratives: next });
    } else if (editTarget.type === "joinMeFor") {
      const next = [...current.joinMeFor];
      next[editTarget.index] = draft;
      update({ joinMeFor: next });
    } else if (editTarget.type === "interests") {
      update({ interests: interestsDraft });
    }
    setEditTarget(null);
  };

  const dialogTitle = editTarget
    ? editTarget.type === "bio" ? "Edit Bio"
    : editTarget.type === "narrative" ? "Edit Narrative"
    : editTarget.type === "joinMeFor" ? "Edit Date Idea"
    : "Edit Interests"
    : "";

  const isTextEdit = editTarget && editTarget.type !== "interests";

  return (
    <>
      <div className="space-y-6">
        {/* Bio */}
        <SectionCard icon={<Heart className="h-5 w-5 text-primary" />} title="Bio" index={0} onEdit={() => openEdit({ type: "bio" })}>
          <p className="font-body text-card-foreground/80 leading-relaxed italic">"{current.bio}"</p>
        </SectionCard>

        {/* Interests */}
        <SectionCard icon={<Sparkles className="h-5 w-5 text-accent" />} title="Interests" index={1} onEdit={() => openEdit({ type: "interests" })}>
          <div className="flex flex-wrap gap-2">
            {current.interests.map((interest, idx) => (
              <motion.span
                key={interest + idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.06 }}
                className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 font-body text-sm text-primary font-medium"
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </SectionCard>

        {/* Narratives */}
        <SectionCard icon={<BookOpen className="h-5 w-5 text-primary" />} title="Narratives" index={2}>
          <div className="space-y-3">
            {current.narratives.map((narrative, idx) => (
              <div key={idx} className="group relative pl-4 border-l-2 border-primary/30 pr-8">
                <p className="font-body text-card-foreground/80 leading-relaxed">{narrative}</p>
                <button
                  onClick={() => openEdit({ type: "narrative", index: idx })}
                  className="absolute right-0 top-0 p-1.5 rounded-full bg-muted/80 hover:bg-muted"
                >
                  <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Join Me For */}
        <SectionCard icon={<MapPin className="h-5 w-5 text-accent" />} title="Join Me For" index={3}>
          <div className="space-y-3">
            {current.joinMeFor.map((idea, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.12 }}
                className="group relative flex items-start gap-3 pr-8"
              >
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 font-display text-xs font-bold text-accent">
                  {idx + 1}
                </span>
                <p className="font-body text-card-foreground/80">{idea}</p>
                <button
                  onClick={() => openEdit({ type: "joinMeFor", index: idx })}
                  className="absolute right-0 top-0 p-1.5 rounded-full bg-muted/80 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                >
                  <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </motion.div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editTarget} onOpenChange={(open) => !open && setEditTarget(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">{dialogTitle}</DialogTitle>
          </DialogHeader>

          {isTextEdit && (
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={4}
              className="font-body text-sm resize-none"
              autoFocus
            />
          )}

          {editTarget?.type === "interests" && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 min-h-[40px]">
                {interestsDraft.map((interest, idx) => (
                  <span
                    key={interest + idx}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-body text-sm text-primary font-medium"
                  >
                    {interest}
                    <button
                      onClick={() => setInterestsDraft(interestsDraft.filter((_, i) => i !== idx))}
                      className="hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newInterest.trim()) {
                      setInterestsDraft([...interestsDraft, newInterest.trim()]);
                      setNewInterest("");
                    }
                  }}
                  placeholder="Type and press Enter..."
                  className="flex-1 text-sm"
                />
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!newInterest.trim()}
                  onClick={() => {
                    if (newInterest.trim()) {
                      setInterestsDraft([...interestsDraft, newInterest.trim()]);
                      setNewInterest("");
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setEditTarget(null)} className="font-body">
              Cancel
            </Button>
            <Button onClick={saveEdit} className="font-body">
              <Check className="h-4 w-4 mr-1" />
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

function SectionCard({
  icon,
  title,
  index,
  onEdit,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  index: number;
  onEdit?: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="group/card rounded-xl border border-border bg-card p-6 relative"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-display text-lg font-semibold text-card-foreground">{title}</h3>
        </div>
        {onEdit && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onEdit}
            className="text-muted-foreground hover:text-foreground"
          >
            <Pencil className="h-3.5 w-3.5 mr-1.5" />
            Edit
          </Button>
        )}
      </div>
      {children}
    </motion.div>
  );
}

export default ProfileOutput;
