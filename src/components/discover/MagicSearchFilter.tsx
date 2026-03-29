import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const RELATIONSHIP_OPTIONS = ["Long-term", "Short-term", "Casual", "Friendship"];
const EDUCATION_OPTIONS = ["High School", "Bachelors", "Masters", "PhD"];
const GENDER_OPTIONS = ["Women", "Men", "Non-binary", "Everyone"];
const COMMON_LANGUAGES = ["English", "Hindi", "Kannada", "Marathi", "Punjabi", "Bengali", "Tamil", "Telugu", "Gujarati", "Malayalam", "Urdu", "Odia", "Assamese", "Sanskrit", "French", "Spanish", "German", "Japanese", "Korean", "Mandarin", "Arabic", "Portuguese", "Russian", "Italian"];
const SUGGESTED_TAGS = ["Creative Thinker", "Fitness Enthusiast", "Startup Founder", "Bookworm", "Traveler", "Foodie", "Night Owl", "Morning Person"];

interface MagicSearchFilterProps {
  children: React.ReactNode;
  onApply?: (tags: string[]) => void;
}

const MagicSearchFilter = ({ children, onApply }: MagicSearchFilterProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTags, setSearchTags] = useState<string[]>(["Photography", "Architecture"]);
  const [ageRange, setAgeRange] = useState([25, 35]);
  const [distance, setDistance] = useState([45]);
  const [heightRange, setHeightRange] = useState([160, 185]);
  const [relationship, setRelationship] = useState<string[]>(["Long-term"]);
  const [education, setEducation] = useState<string[]>(["Masters"]);
  const [gender, setGender] = useState<string[]>(["Women"]);
  const [languages, setLanguages] = useState<string[]>([]);

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
    setRelationship(["Long-term"]);
    setEducation(["Masters"]);
    setGender(["Women"]);
    setLanguages([]);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col bg-background"
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-3 border-b border-border/30">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
            </button>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Magic Search
            </h2>
            <button
              onClick={handleReset}
              className="text-xs font-body font-medium text-destructive hover:underline"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 pb-4 pt-4 space-y-6">
          {/* Search input */}
          <div className="space-y-2">
            <div className="rounded-2xl border border-border/60 bg-card px-4 py-3 flex items-center gap-3">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="e.g. loves hiking, startup founder, bookworm…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleAddTag}
                className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                onClick={() => {
                  if (searchQuery.trim() && !searchTags.includes(searchQuery.trim())) {
                    setSearchTags([...searchTags, searchQuery.trim()]);
                    setSearchQuery("");
                  }
                }}
                className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity"
              >
                <span className="text-primary-foreground text-sm font-bold leading-none">+</span>
              </button>
            </div>
            <p className="text-xs font-body text-muted-foreground px-1">
              Search by mindset, interests, hobbies, or work habits
            </p>
          </div>

          {/* Quick suggestions */}
          {searchTags.length === 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-body font-semibold tracking-widest text-muted-foreground uppercase">
                Suggested
              </span>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchTags((prev) => prev.includes(tag) ? prev : [...prev, tag])}
                    className="rounded-full border border-border/60 px-3.5 py-1.5 text-sm font-body font-medium text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {searchTags.length > 0 && (
            <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-body font-medium text-muted-foreground">{searchTags.length} keyword{searchTags.length !== 1 ? "s" : ""}</span>
              <button
                onClick={() => setSearchTags([])}
                className="text-xs font-body font-medium text-destructive hover:underline transition-colors"
              >
                Clear all
              </button>
            </div>
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
              className="[&_[data-slot=track]]:bg-secondary [&_[data-slot=range]]:bg-primary [&_[data-slot=thumb]]:border-primary [&_[data-slot=thumb]]:bg-background"
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
          <LanguageFilterRow value={languages} onChange={setLanguages} />
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border/30 bg-background">
          <button
            onClick={() => {
              onApply?.(searchTags);
              setOpen(false);
            }}
            className="w-full rounded-full py-3 font-body text-sm font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-warm)" }}
          >
            Apply Filters
          </button>
        </div>
      </SheetContent>
    </Sheet>
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
        className="[&_[data-slot=track]]:bg-secondary [&_[data-slot=range]]:bg-primary [&_[data-slot=thumb]]:border-primary [&_[data-slot=thumb]]:bg-background"
      />
    </div>
  );
}

function SelectableRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string[];
  options: string[];
  onChange: (v: string[]) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const toggleOption = (opt: string) => {
    if (value.includes(opt)) {
      if (value.length > 1) onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between py-2"
      >
        <span className="font-body font-semibold text-foreground">{label}</span>
        <span className="flex items-center gap-1 font-body text-sm font-medium text-primary">
          {value.length <= 2 ? value.join(", ") : `${value.length} selected`}
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
                  onClick={() => toggleOption(opt)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-body font-medium border transition-colors ${
                    value.includes(opt)
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
}

function LanguageFilterRow({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? COMMON_LANGUAGES.filter(
        (l) => l.toLowerCase().includes(query.toLowerCase()) && !value.includes(l)
      )
    : COMMON_LANGUAGES.filter((l) => !value.includes(l));

  const addLanguage = (lang: string) => {
    if (!value.includes(lang)) onChange([...value, lang]);
    setQuery("");
  };

  const addCustom = () => {
    const trimmed = query.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setQuery("");
    }
  };

  const remove = (lang: string) => onChange(value.filter((v) => v !== lang));

  return (
    <>
      <button
        onClick={() => setSheetOpen(true)}
        className="w-full flex items-center justify-between py-2"
      >
        <span className="font-body font-semibold text-foreground">Languages</span>
        <span className="flex items-center gap-1 font-body text-sm font-medium text-primary">
          {value.length === 0 ? "Any" : value.length <= 2 ? value.join(", ") : `${value.length} selected`}
          <ChevronRight className="h-4 w-4" />
        </span>
      </button>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col bg-background">
          {/* Header */}
          <div className="px-5 pt-5 pb-3 border-b border-border/30">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setSheetOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <ChevronRight className="h-5 w-5 rotate-180" />
              </button>
              <h2 className="font-display text-lg font-semibold text-foreground">Languages</h2>
              <button
                onClick={() => { onChange([]); setQuery(""); }}
                className="text-xs font-body font-medium text-destructive hover:underline"
              >
                Clear
              </button>
            </div>

            {/* Search */}
            <div className="rounded-xl border border-border/60 bg-card px-3 py-2.5 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search languages…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (filtered.length > 0) addLanguage(filtered[0]);
                    else addCustom();
                  }
                }}
                className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
          </div>

          {/* Selected languages */}
          {value.length > 0 && (
            <div className="px-5 pt-3 pb-2">
              <span className="text-[11px] font-body font-semibold tracking-widest text-muted-foreground uppercase">
                Selected ({value.length})
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {value.map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-body font-medium text-primary"
                  >
                    {lang}
                    <button onClick={() => remove(lang)} className="hover:scale-110 transition-transform">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Language list */}
          <div className="flex-1 overflow-y-auto px-5 pb-4">
            <span className="text-[11px] font-body font-semibold tracking-widest text-muted-foreground uppercase block pt-3 pb-2">
              {query.trim() ? "Results" : "All Languages"}
            </span>
            <div className="space-y-0.5">
              {filtered.map((lang) => (
                <button
                  key={lang}
                  onClick={() => addLanguage(lang)}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-body text-foreground hover:bg-primary/5 transition-colors flex items-center justify-between"
                >
                  {lang}
                  <span className="text-primary text-xs font-medium">+ Add</span>
                </button>
              ))}
              {query.trim() && filtered.length === 0 && (
                <button
                  onClick={addCustom}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-body text-primary hover:bg-primary/5 transition-colors"
                >
                  + Add "{query.trim()}"
                </button>
              )}
            </div>
          </div>

          {/* Done button */}
          <div className="px-5 py-4 border-t border-border/30">
            <button
              onClick={() => setSheetOpen(false)}
              className="w-full rounded-full py-3 font-body text-sm font-semibold text-primary-foreground"
              style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-warm)" }}
            >
              Done
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default MagicSearchFilter;
