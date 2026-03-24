import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, MapPin, BookOpen, Pencil, Plus, X, Check } from "lucide-react";
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
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
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
    if (target.type === "bio") setDraft(current.bio);
    else if (target.type === "narrative") setDraft(current.narratives[target.index].content);
    else if (target.type === "joinMeFor") setDraft(current.joinMeFor[target.index]);
    else if (target.type === "interests") {
      setInterestsDraft([...current.interests]);
      setNewInterest("");
    }
    setEditTarget(target);
  };

  const saveEdit = () => {
    if (!editTarget) return;
    if (editTarget.type === "bio") update({ bio: draft });
    else if (editTarget.type === "narrative") {
      const next = [...current.narratives];
      next[editTarget.index] = { ...next[editTarget.index], content: draft };
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
      <div className="space-y-5">
        {/* Bio */}
        <SectionCard
          icon={<Heart className="h-4.5 w-4.5 text-primary" />}
          title="Bio"
          index={0}
          onEdit={() => openEdit({ type: "bio" })}
        >
          <p className="font-body text-card-foreground/80 leading-relaxed text-[15px]">
            "{current.bio}"
          </p>
        </SectionCard>

        {/* Interests */}
        <SectionCard
          icon={<Sparkles className="h-4.5 w-4.5 text-accent" />}
          title="Interests"
          index={1}
          onEdit={() => openEdit({ type: "interests" })}
        >
          <div className="flex flex-wrap gap-2">
            {current.interests.map((interest, idx) => (
              <motion.span
                key={interest + idx}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                className="inline-block rounded-full border border-primary/15 bg-primary/8 px-3.5 py-1.5 font-body text-[13px] text-primary font-medium"
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </SectionCard>

        {/* Narratives */}
        <SectionCard
          icon={<BookOpen className="h-4.5 w-4.5 text-primary" />}
          title="Narratives"
          index={2}
        >
          <div className="space-y-4">
            {current.narratives.map((narrative, idx) => (
              <div key={idx} className="group relative pl-4 border-l-2 border-primary/20 pr-10">
                <h4 className="font-display text-[13px] font-semibold text-foreground/70 mb-1">
                  {narrative.title}
                </h4>
                <p className="font-body text-card-foreground/75 leading-relaxed text-[15px]">
                  {narrative.content}
                </p>
                <button
                  onClick={() => openEdit({ type: "narrative", index: idx })}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-muted/60 hover:bg-muted transition-colors"
                  aria-label="Edit narrative"
                >
                  <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Join Me For */}
        <SectionCard
          icon={<MapPin className="h-4.5 w-4.5 text-accent" />}
          title="Join Me For"
          index={3}
        >
          <div className="space-y-3">
            {current.joinMeFor.map((idea, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="group relative flex items-start gap-3 pr-10"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-display text-xs font-bold text-accent">
                  {idx + 1}
                </span>
                <p className="font-body text-card-foreground/75 text-[15px] leading-relaxed pt-0.5">
                  {idea}
                </p>
                <button
                  onClick={() => openEdit({ type: "joinMeFor", index: idx })}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-muted/60 hover:bg-muted transition-colors"
                  aria-label="Edit date idea"
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
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display">{dialogTitle}</DialogTitle>
          </DialogHeader>

          {isTextEdit && (
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={5}
              className="font-body text-sm resize-none rounded-xl"
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
                  className="flex-1 text-sm rounded-lg"
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
                  className="rounded-lg"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setEditTarget(null)} className="font-body rounded-lg">
              Cancel
            </Button>
            <Button onClick={saveEdit} className="font-body rounded-lg">
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
      className="rounded-2xl border border-border/60 bg-card p-5 sm:p-6 relative"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/60">
            {icon}
          </div>
          <h3 className="font-display text-base font-semibold text-card-foreground">{title}</h3>
        </div>
        {onEdit && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onEdit}
            className="text-muted-foreground hover:text-foreground gap-1.5 h-8 px-2.5"
          >
            <Pencil className="h-3.5 w-3.5" />
            <span className="text-xs">Edit</span>
          </Button>
        )}
      </div>
      {children}
    </motion.div>
  );
}

export default ProfileOutput;