import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const RELATIONSHIP_OPTIONS = ["Long-term", "Short-term", "Casual", "Friendship"];
const EDUCATION_OPTIONS = ["High School", "Bachelors", "Masters", "PhD"];
const GENDER_OPTIONS = ["Women", "Men", "Non-binary", "Everyone"];

interface MagicSearchFilterProps {
  children: React.ReactNode;
}

const MagicSearchFilter = ({ children }: MagicSearchFilterProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTags, setSearchTags] = useState<string[]>(["Photography", "Architecture"]);
  const [ageRange, setAgeRange] = useState([25, 35]);
  const [distance, setDistance] = useState([45]);
  const [heightRange, setHeightRange] = useState([160, 185]);
  const [relationship, setRelationship] = useState("Long-term");
  const [education, setEducation] = useState("Masters");
  const [gender, setGender] = useState("Women");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() && !searchTags.includes(searchQuery.trim())) {
      setSearchTags([...searchTags, searchQuery.trim()]);
      setSearchQuery("");
    }
  };

  const removeTag = (tag: string) => {
    setSearchTags(searchTags.filter((t) => t !== tag));
  };

  const handleReset = () => {
    setSearchTags([]);
    setSearchQuery("");
    setAgeRange([18, 50]);
    setDistance([50]);
    setHeightRange([150, 200]);
    setRelationship("Long-term");
    setEducation("Masters");
    setGender("Women");
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="contents">
        {children}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-0 z-50 bg-background flex flex-col"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-2">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-semibold text-primary">
                  Magic Search
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="h-8 w-8 rounded-full border border-border/60 flex items-center justify-center"
                >
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-6">
              {/* Search input */}
              <div className="rounded-2xl border border-border/60 bg-card px-4 py-3 flex items-center gap-3">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Interests, professions, hobbies"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
                />
              </div>

              {/* Tags */}
              {searchTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {searchTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1.5 text-sm font-body font-medium text-primary"
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:scale-110 transition-transform">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* REFINE section */}
              <SectionLabel label="REFINE" />

              {/* Age Range */}
              <SliderField
                label="Age Range"
                valueLabel={`${ageRange[0]} – ${ageRange[1]}`}
                value={ageRange}
                onChange={setAgeRange}
                min={18}
                max={60}
                step={1}
              />

              {/* Distance */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-body font-semibold text-foreground">Distance</span>
                  <span className="font-body text-sm font-medium text-primary">{distance[0]} km</span>
                </div>
                <Slider
                  value={distance}
                  onValueChange={setDistance}
                  min={1}
                  max={200}
                  step={1}
                />
                <p className="text-xs font-body text-muted-foreground">Expand your discovery radius</p>
              </div>

              {/* ADVANCED PREFERENCES */}
              <SectionLabel label="ADVANCED PREFERENCES" />

              {/* Height */}
              <SliderField
                label="Height"
                valueLabel={`${heightRange[0]} – ${heightRange[1]} cm`}
                value={heightRange}
                onChange={setHeightRange}
                min={140}
                max={220}
                step={1}
              />

              {/* Selectable rows */}
              <SelectableRow label="Relationship Intent" value={relationship} options={RELATIONSHIP_OPTIONS} onChange={setRelationship} />
              <SelectableRow label="Education" value={education} options={EDUCATION_OPTIONS} onChange={setEducation} />
              <SelectableRow label="Gender" value={gender} options={GENDER_OPTIONS} onChange={setGender} />
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border/30 flex items-center justify-between bg-background">
              <button
                onClick={handleReset}
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full px-8 py-3 font-body text-sm font-semibold text-primary-foreground"
                style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-warm)" }}
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-body font-semibold tracking-widest text-muted-foreground uppercase">
        {label}
      </span>
      <div className="flex-1 h-px bg-border/60" />
    </div>
  );
}

function SliderField({
  label,
  valueLabel,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  valueLabel: string;
  value: number[];
  onChange: (v: number[]) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-body font-semibold text-foreground">{label}</span>
        <span className="font-body text-sm font-medium text-primary">{valueLabel}</span>
      </div>
      <Slider
        value={value}
        onValueChange={onChange}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
}

interface SelectableRowProps {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}

const SelectableRow = forwardRef<HTMLDivElement, SelectableRowProps>(({ label, value, options, onChange }, ref) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div ref={ref} className="space-y-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between py-2"
      >
        <span className="font-body font-semibold text-foreground">{label}</span>
        <span className="flex items-center gap-1 font-body text-sm font-medium text-primary">
          {value}
          <ChevronRight className={`h-4 w-4 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </span>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 pb-2">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { onChange(opt); setExpanded(false); }}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-body font-medium border transition-colors ${
                    value === opt
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/60 text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

SelectableRow.displayName = "SelectableRow";

export default MagicSearchFilter;