import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Edit3,
  User,
  Heart,
  BookOpen,
  Coffee,
  Sparkles,
  Plus,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { PROFILES } from "@/lib/profilesData";
import type { ProfileData } from "@/lib/profilesData";

const WORD_LIMITS = {
  bio: 80,
  narrative: 60,
  joinMeFor: 10,
};

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function enforceWordLimit(text: string, max: number) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length > max ? words.slice(0, max).join(" ") : text;
}

type EditTarget =
  | "bio"
  | "interests"
  | "narrative-0"
  | "narrative-1"
  | "narrative-2"
  | "joinMeFor"
  | "about"
  | null;

const EditProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData>({ ...PROFILES[0] });
  const [editTarget, setEditTarget] = useState<EditTarget>(null);

  // Draft states for editing
  const [draftText, setDraftText] = useState("");
  const [draftInterests, setDraftInterests] = useState<string[]>([]);
  const [draftNewInterest, setDraftNewInterest] = useState("");
  const [draftJoinMeFor, setDraftJoinMeFor] = useState<string[]>([]);
  const [draftAbout, setDraftAbout] = useState(profile.about);

  const openEdit = (target: EditTarget) => {
    setEditTarget(target);
    if (target === "bio") {
      setDraftText(profile.bio);
    } else if (target === "interests") {
      setDraftInterests([...profile.interests]);
      setDraftNewInterest("");
    } else if (target?.startsWith("narrative-")) {
      const idx = parseInt(target.split("-")[1]);
      setDraftText(profile.narratives[idx]?.content ?? "");
    } else if (target === "joinMeFor") {
      setDraftJoinMeFor([...profile.joinMeFor, "", "", ""].slice(0, 3));
    } else if (target === "about") {
      setDraftAbout({ ...profile.about });
    }
  };

  const saveEdit = () => {
    if (editTarget === "bio") {
      setProfile((p) => ({ ...p, bio: enforceWordLimit(draftText, WORD_LIMITS.bio) }));
    } else if (editTarget === "interests") {
      setProfile((p) => ({ ...p, interests: draftInterests.slice(0, 6) }));
    } else if (editTarget?.startsWith("narrative-")) {
      const idx = parseInt(editTarget.split("-")[1]);
      setProfile((p) => {
        const narr = [...p.narratives];
        narr[idx] = { ...narr[idx], content: enforceWordLimit(draftText, WORD_LIMITS.narrative) };
        return { ...p, narratives: narr };
      });
    } else if (editTarget === "joinMeFor") {
      setProfile((p) => ({ ...p, joinMeFor: draftJoinMeFor.filter((s) => s.trim()) }));
    } else if (editTarget === "about") {
      setProfile((p) => ({ ...p, about: draftAbout }));
    }
    setEditTarget(null);
  };

  const getSheetTitle = () => {
    if (editTarget === "bio") return "Edit My Story";
    if (editTarget === "interests") return "Edit Interests";
    if (editTarget?.startsWith("narrative-")) {
      const idx = parseInt(editTarget.split("-")[1]);
      return `Edit: ${profile.narratives[idx]?.title ?? "Narrative"}`;
    }
    if (editTarget === "joinMeFor") return "Edit Experiences";
    if (editTarget === "about") return "Edit About";
    return "Edit";
  };

  const wordCount = editTarget === "bio" || editTarget?.startsWith("narrative-")
    ? countWords(draftText)
    : 0;
  const wordLimit = editTarget === "bio" ? WORD_LIMITS.bio : WORD_LIMITS.narrative;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 px-4 pt-3 pb-2">
        <div
          className="flex items-center gap-3 rounded-full border border-border/40 bg-card/70 backdrop-blur-xl px-4 py-2.5"
          style={{ boxShadow: "0 4px 24px -4px hsl(var(--foreground) / 0.06)" }}
        >
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="shrink-0 rounded-full h-9 w-9">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="font-display text-base font-semibold text-foreground">Edit Profile</span>
        </div>
      </header>

      <main className="flex-1 px-4 pb-8 space-y-4 mt-2">
        {/* About Section */}
        <SectionCard
          icon={<User className="h-4 w-4 text-primary" />}
          title="About"
          onEdit={() => openEdit("about")}
        >
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Gender", value: profile.about.gender },
              { label: "Pronouns", value: profile.about.pronouns },
              { label: "Orientation", value: profile.about.orientation },
              { label: "Education", value: profile.about.education },
              { label: "Height", value: profile.about.height },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-muted/40 px-3 py-2">
                <p className="text-[11px] text-muted-foreground">{item.label}</p>
                <p className="text-sm font-medium text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Bio Section */}
        <SectionCard
          icon={<BookOpen className="h-4 w-4 text-primary" />}
          title="My Story"
          onEdit={() => openEdit("bio")}
        >
          <p className="text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
        </SectionCard>

        {/* Interests Section */}
        <SectionCard
          icon={<Sparkles className="h-4 w-4 text-primary" />}
          title="Interests"
          badge={`${profile.interests.length}/6`}
          onEdit={() => openEdit("interests")}
        >
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, i) => (
              <span
                key={i}
                className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
              >
                {interest}
              </span>
            ))}
          </div>
        </SectionCard>

        {/* Narratives Section */}
        <SectionCard
          icon={<Heart className="h-4 w-4 text-primary" />}
          title="Narratives"
        >
          <div className="space-y-3">
            {profile.narratives.map((n, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.98 }}
                onClick={() => openEdit(`narrative-${i}` as EditTarget)}
                className="w-full text-left rounded-xl bg-muted/30 p-3 group hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-foreground">{n.title}</p>
                  <Edit3 className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{n.content}</p>
              </motion.button>
            ))}
          </div>
        </SectionCard>

        {/* Join Me For Section */}
        <SectionCard
          icon={<Coffee className="h-4 w-4 text-primary" />}
          title="Join Me For"
          onEdit={() => openEdit("joinMeFor")}
        >
          <div className="space-y-2">
            {profile.joinMeFor.map((item, i) => (
              <div key={i} className="rounded-xl bg-muted/30 px-3 py-2.5">
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </main>

      {/* Edit Sheet */}
      <Sheet open={!!editTarget} onOpenChange={(open) => !open && setEditTarget(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl min-h-[50vh]">
          <SheetHeader>
            <SheetTitle className="font-display text-lg">{getSheetTitle()}</SheetTitle>
          </SheetHeader>

          <div className="py-4 space-y-4 flex-1 overflow-y-auto">
            {/* Bio / Narrative editing */}
            {(editTarget === "bio" || editTarget?.startsWith("narrative-")) && (
              <div className="space-y-2">
                <Textarea
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  className="min-h-[160px] resize-none rounded-xl border-border/40 bg-muted/20 text-sm"
                  placeholder="Write something..."
                />
                <p className={`text-xs text-right ${wordCount >= wordLimit ? "text-destructive" : "text-muted-foreground"}`}>
                  {wordCount}/{wordLimit} words
                </p>
              </div>
            )}

            {/* Interests editing */}
            {editTarget === "interests" && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">You can add up to 6 interests</p>
                <div className="flex flex-wrap gap-2">
                  {draftInterests.map((interest, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 rounded-full bg-primary/10 pl-3 pr-1.5 py-1.5 text-xs font-medium text-primary"
                    >
                      {interest}
                      <button
                        onClick={() => setDraftInterests((prev) => prev.filter((_, idx) => idx !== i))}
                        className="rounded-full p-0.5 hover:bg-primary/20 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                {draftInterests.length < 6 && (
                  <div className="flex gap-2">
                    <Input
                      value={draftNewInterest}
                      onChange={(e) => setDraftNewInterest(e.target.value)}
                      placeholder="Add an interest..."
                      className="rounded-xl text-sm"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && draftNewInterest.trim()) {
                          setDraftInterests((prev) => [...prev, draftNewInterest.trim()]);
                          setDraftNewInterest("");
                        }
                      }}
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="shrink-0 rounded-xl"
                      disabled={!draftNewInterest.trim()}
                      onClick={() => {
                        setDraftInterests((prev) => [...prev, draftNewInterest.trim()]);
                        setDraftNewInterest("");
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Join Me For editing */}
            {editTarget === "joinMeFor" && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">Add up to 3 experiences you'd love to share</p>
                {draftJoinMeFor.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const updated = [...draftJoinMeFor];
                        updated[i] = e.target.value;
                        setDraftJoinMeFor(updated);
                      }}
                      placeholder={
                        i === 0 ? "A sunset hike..." : i === 1 ? "Coffee and deep talks..." : "Weekend road trip..."
                      }
                      className="rounded-xl text-sm"
                    />
                    <p className={`text-xs text-right ${countWords(item) >= WORD_LIMITS.joinMeFor ? "text-destructive" : "text-muted-foreground"}`}>
                      {countWords(item)}/{WORD_LIMITS.joinMeFor} words
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* About editing */}
            {editTarget === "about" && (
              <div className="space-y-3">
                {[
                  { key: "gender" as const, label: "Gender", placeholder: "e.g. Female" },
                  { key: "pronouns" as const, label: "Pronouns", placeholder: "e.g. She/Her" },
                  { key: "orientation" as const, label: "Orientation", placeholder: "e.g. Straight" },
                  { key: "education" as const, label: "Education", placeholder: "e.g. Master's" },
                  { key: "height" as const, label: "Height", placeholder: "e.g. 5'6\"" },
                ].map((field) => (
                  <div key={field.key} className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">{field.label}</label>
                    <Input
                      value={draftAbout[field.key]}
                      onChange={(e) => setDraftAbout((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="rounded-xl text-sm"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <SheetFooter className="flex-row gap-3 pt-2">
            <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setEditTarget(null)}>
              Cancel
            </Button>
            <Button className="flex-1 rounded-xl" onClick={saveEdit}>
              <Check className="h-4 w-4 mr-1.5" />
              Save
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

function SectionCard({
  icon,
  title,
  badge,
  onEdit,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  badge?: string;
  onEdit?: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/30 bg-card p-4"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {badge && (
            <span className="text-[11px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">{badge}</span>
          )}
        </div>
        {onEdit && (
          <button onClick={onEdit} className="text-primary text-xs font-medium hover:underline">
            Edit
          </button>
        )}
      </div>
      {children}
    </motion.div>
  );
}

export default EditProfile;
