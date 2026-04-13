import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  User,
  MessageCircle,
  Compass,
  GraduationCap,
  Briefcase,
  MapPin,
  Ruler,
  Languages,
  ChevronRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { PROFILES } from "@/lib/profilesData";

interface EditableField {
  key: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  placeholder: string;
}

const EditProfile = () => {
  const navigate = useNavigate();
  const template = PROFILES[0];

  const [fields, setFields] = useState({
    datingPreference: "Women",
    gender: template.about.gender,
    pronouns: template.about.pronouns,
    orientation: template.about.orientation,
    datingGoals: template.relationshipIntent?.[0] ?? "Long-term relationship",
    education: template.about.education,
    profession: template.profession,
    location: template.location,
    height: template.about.height,
    languages: template.languages?.join(", ") ?? "English",
  });

  const [editTarget, setEditTarget] = useState<string | null>(null);
  const [draftValue, setDraftValue] = useState("");

  const fieldConfig: EditableField[] = [
    { key: "datingPreference", label: "Dating Preference", icon: <Heart className="h-4.5 w-4.5 text-primary" />, value: fields.datingPreference, placeholder: "e.g. Women, Men, Everyone" },
    { key: "gender", label: "Gender & Identity", icon: <User className="h-4.5 w-4.5 text-primary" />, value: fields.gender, placeholder: "e.g. Female, Male, Non-binary" },
    { key: "pronouns", label: "Pronouns", icon: <MessageCircle className="h-4.5 w-4.5 text-primary" />, value: fields.pronouns, placeholder: "e.g. She/Her, He/Him, They/Them" },
    { key: "orientation", label: "Sexual Orientation", icon: <Compass className="h-4.5 w-4.5 text-primary" />, value: fields.orientation, placeholder: "e.g. Straight, Gay, Bisexual" },
    { key: "datingGoals", label: "Dating Goals", icon: <Heart className="h-4.5 w-4.5 text-primary" />, value: fields.datingGoals, placeholder: "e.g. Long-term, Casual, Figuring it out" },
    { key: "education", label: "Education", icon: <GraduationCap className="h-4.5 w-4.5 text-primary" />, value: fields.education, placeholder: "e.g. Master's, Bachelor's" },
    { key: "profession", label: "Profession", icon: <Briefcase className="h-4.5 w-4.5 text-primary" />, value: fields.profession, placeholder: "e.g. Software Engineer" },
    { key: "location", label: "Location", icon: <MapPin className="h-4.5 w-4.5 text-primary" />, value: fields.location, placeholder: "e.g. Mumbai, India" },
    { key: "height", label: "Height", icon: <Ruler className="h-4.5 w-4.5 text-primary" />, value: fields.height, placeholder: "e.g. 5'6\"" },
    { key: "languages", label: "Languages", icon: <Languages className="h-4.5 w-4.5 text-primary" />, value: fields.languages, placeholder: "e.g. English, Hindi, Tamil" },
  ];

  const openEdit = (key: string) => {
    setEditTarget(key);
    setDraftValue(fields[key as keyof typeof fields]);
  };

  const saveEdit = () => {
    if (editTarget) {
      setFields((prev) => ({ ...prev, [editTarget]: draftValue }));
    }
    setEditTarget(null);
  };

  const currentField = fieldConfig.find((f) => f.key === editTarget);

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

      <main className="flex-1 px-4 pb-8 mt-2">
        <div className="rounded-2xl border border-border/30 bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
          {fieldConfig.map((field, index) => (
            <motion.button
              key={field.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => openEdit(field.key)}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 text-left hover:bg-muted/30 active:bg-muted/50 transition-colors ${
                index < fieldConfig.length - 1 ? "border-b border-border/20" : ""
              }`}
            >
              <div className="shrink-0 w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center">
                {field.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">{field.label}</p>
                <p className="text-sm font-medium text-foreground truncate">{field.value || "Not set"}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
            </motion.button>
          ))}
        </div>
      </main>

      {/* Edit Sheet */}
      <Sheet open={!!editTarget} onOpenChange={(open) => !open && setEditTarget(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader>
            <SheetTitle className="font-display text-lg flex items-center gap-2">
              {currentField?.icon}
              {currentField?.label}
            </SheetTitle>
          </SheetHeader>

          <div className="py-4">
            <Input
              value={draftValue}
              onChange={(e) => setDraftValue(e.target.value)}
              placeholder={currentField?.placeholder}
              className="rounded-xl text-sm"
              autoFocus
            />
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

export default EditProfile;
