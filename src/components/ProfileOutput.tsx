import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, MapPin, BookOpen, Pencil, Check, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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

function EditableText({ value, onSave, multiline = false }: { value: string; onSave: (v: string) => void; multiline?: boolean }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  if (!editing) {
    return (
      <button onClick={() => { setDraft(value); setEditing(true); }} className="group relative text-left w-full cursor-text">
        <span className="opacity-0 group-hover:opacity-100 absolute -right-2 -top-2 p-1 rounded-full bg-muted transition-opacity">
          <Pencil className="h-3 w-3 text-muted-foreground" />
        </span>
        {multiline ? (
          <p className="font-body text-card-foreground/80 leading-relaxed">{value}</p>
        ) : (
          <span>{value}</span>
        )}
      </button>
    );
  }

  const Comp = multiline ? Textarea : Input;
  return (
    <div className="flex items-start gap-2 w-full">
      <Comp value={draft} onChange={(e) => setDraft(e.target.value)} className="flex-1 text-sm" autoFocus />
      <Button size="icon" variant="ghost" className="shrink-0 h-8 w-8" onClick={() => { onSave(draft); setEditing(false); }}>
        <Check className="h-4 w-4 text-primary" />
      </Button>
      <Button size="icon" variant="ghost" className="shrink-0 h-8 w-8" onClick={() => setEditing(false)}>
        <X className="h-4 w-4 text-muted-foreground" />
      </Button>
    </div>
  );
}

const ProfileOutput = ({ profile, onProfileChange }: ProfileOutputProps) => {
  const [current, setCurrent] = useState<GeneratedProfile>(profile);

  const update = (patch: Partial<GeneratedProfile>) => {
    const next = { ...current, ...patch };
    setCurrent(next);
    onProfileChange?.(next);
  };

  return (
    <div className="space-y-6">
      {/* Bio */}
      <motion.div custom={0} initial="hidden" animate="visible" variants={sectionVariants}
        className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-2 mb-3">
          <Heart className="h-5 w-5 text-primary" />
          <h3 className="font-display text-lg font-semibold text-card-foreground">Bio</h3>
        </div>
        <div className="italic">
          <EditableText value={current.bio} onSave={(v) => update({ bio: v })} multiline />
        </div>
      </motion.div>

      {/* Interests */}
      <motion.div custom={1} initial="hidden" animate="visible" variants={sectionVariants}
        className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-accent" />
          <h3 className="font-display text-lg font-semibold text-card-foreground">Interests</h3>
        </div>
        <InterestChips interests={current.interests} onChange={(interests) => update({ interests })} />
      </motion.div>

      {/* Narratives */}
      <motion.div custom={2} initial="hidden" animate="visible" variants={sectionVariants}
        className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="font-display text-lg font-semibold text-card-foreground">Narratives</h3>
        </div>
        <div className="space-y-3">
          {current.narratives.map((narrative, idx) => (
            <div key={idx} className="pl-4 border-l-2 border-primary/30">
              <EditableText
                value={narrative}
                multiline
                onSave={(v) => {
                  const next = [...current.narratives];
                  next[idx] = v;
                  update({ narratives: next });
                }}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Join Me For */}
      <motion.div custom={3} initial="hidden" animate="visible" variants={sectionVariants}
        className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-accent" />
          <h3 className="font-display text-lg font-semibold text-card-foreground">Join Me For</h3>
        </div>
        <div className="space-y-3">
          {current.joinMeFor.map((idea, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 font-display text-xs font-bold text-accent">
                {idx + 1}
              </span>
              <div className="flex-1">
                <EditableText
                  value={idea}
                  multiline
                  onSave={(v) => {
                    const next = [...current.joinMeFor];
                    next[idx] = v;
                    update({ joinMeFor: next });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

function InterestChips({ interests, onChange }: { interests: string[]; onChange: (v: string[]) => void }) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const remove = (idx: number) => onChange(interests.filter((_, i) => i !== idx));
  const add = () => {
    if (draft.trim()) {
      onChange([...interests, draft.trim()]);
      setDraft("");
      setAdding(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {interests.map((interest, idx) => (
        <motion.span
          key={interest + idx}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + idx * 0.06 }}
          className="group inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 font-body text-sm text-primary font-medium"
        >
          {interest}
          <button onClick={() => remove(idx)} className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">
            <X className="h-3 w-3" />
          </button>
        </motion.span>
      ))}
      {adding ? (
        <div className="flex items-center gap-1">
          <Input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="New interest" className="h-8 w-32 text-sm" autoFocus />
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={add}><Check className="h-3 w-3" /></Button>
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setAdding(false)}><X className="h-3 w-3" /></Button>
        </div>
      ) : (
        <button onClick={() => setAdding(true)} className="inline-flex items-center gap-1 rounded-full border border-dashed border-primary/30 px-3 py-1.5 text-sm text-primary/60 hover:text-primary hover:border-primary/50 transition-colors">
          <Plus className="h-3 w-3" /> Add
        </button>
      )}
    </div>
  );
}

export default ProfileOutput;
