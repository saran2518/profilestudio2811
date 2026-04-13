import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const GENDER_OPTIONS = [
  { value: "Man", label: "Man" },
  { value: "Woman", label: "Woman" },
  { value: "Non-Binary", label: "Non-Binary" },
];

interface GenderIdentityEditorProps {
  selectedGender: string;
  customGender: string;
  displayOnProfile: string;
  onGenderChange: (gender: string) => void;
  onCustomGenderChange: (custom: string) => void;
  onDisplayOnProfileChange: (display: string) => void;
}

export default function GenderIdentityEditor({
  selectedGender,
  customGender,
  displayOnProfile,
  onGenderChange,
  onCustomGenderChange,
  onDisplayOnProfileChange,
}: GenderIdentityEditorProps) {
  const [showCustomInput, setShowCustomInput] = useState(!!customGender);

  const currentDisplay = displayOnProfile || selectedGender;

  const allOptions = [
    ...GENDER_OPTIONS.map((o) => o.value),
    ...(customGender ? [customGender] : []),
  ];

  return (
    <div className="space-y-4">
      {/* Gender options */}
      <div className="space-y-3">
        {GENDER_OPTIONS.map((option) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onGenderChange(option.value)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all text-left ${
              selectedGender === option.value
                ? "border-primary bg-primary/8 ring-1 ring-primary/20"
                : "border-border/40 bg-muted/20 hover:bg-muted/40"
            }`}
          >
            <span className="flex-1 text-sm font-medium text-foreground">{option.label}</span>
            {selectedGender === option.value && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="h-5 w-5 rounded-full bg-primary flex items-center justify-center"
              >
                <Check className="h-3 w-3 text-primary-foreground" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Add more about gender identity */}
      {!showCustomInput ? (
        <motion.button
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setShowCustomInput(true)}
          className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl border border-dashed border-primary/40 text-primary hover:bg-primary/5 transition-colors text-left"
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm font-medium">Add more about your gender identity</span>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <Label className="text-xs text-muted-foreground">Additional gender identity</Label>
          <Input
            value={customGender}
            onChange={(e) => onCustomGenderChange(e.target.value)}
            placeholder="e.g. Genderqueer, Agender, Two-Spirit"
            className="rounded-xl text-sm"
            autoFocus
          />
        </motion.div>
      )}

      {/* Display on profile selector */}
      {selectedGender && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-2 border-t border-border/30"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
            Display on profile
          </p>
          <div className="space-y-2">
            {allOptions.map((opt) => (
              <motion.button
                key={opt}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => onDisplayOnProfileChange(opt)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                  currentDisplay === opt
                    ? "border-primary bg-primary/8 ring-1 ring-primary/20"
                    : "border-border/40 bg-muted/20 hover:bg-muted/40"
                }`}
              >
                <span className="flex-1 text-sm font-medium text-foreground">{opt}</span>
                {currentDisplay === opt && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-5 w-5 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">
            Showing <span className="font-semibold text-foreground">{currentDisplay}</span> on your profile
          </p>
        </motion.div>
      )}
    </div>
  );
}
