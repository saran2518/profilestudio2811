import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Search,
  X,
  Calendar,
  Ruler,
  MapPin,
  Heart,
  GraduationCap,
  Users,
  Globe,
  Sparkles,
  Check,
  ChevronDown,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const RELATIONSHIP_OPTIONS = ["Meaningful Connection", "Keeping it Light", "Travel Buddy", "Shared Experiences", "Discovery Mode"];
const EDUCATION_OPTIONS = ["High School", "Bachelors", "Masters", "PhD"];
const GENDER_OPTIONS = ["Women", "Men", "Non-binary", "Everyone"];
const COMMON_LANGUAGES = ["English", "Hindi", "Kannada", "Marathi", "Punjabi", "Bengali", "Tamil", "Telugu", "Gujarati", "Malayalam", "Urdu", "Odia", "Assamese", "Sanskrit", "French", "Spanish", "German", "Japanese", "Korean", "Mandarin", "Arabic", "Portuguese", "Russian", "Italian"];
const SUGGESTED_TAGS = ["Creative Thinker", "Fitness Enthusiast", "Startup Founder", "Bookworm", "Traveler", "Foodie", "Night Owl", "Morning Person"];

const DEFAULTS = {
  ageRange: [18, 50],
  distance: [50],
  heightRange: [150, 200],
  relationship: ["Long-term"],
  education: ["Masters"],
  gender: ["Women"],
};

interface MagicSearchFilterProps {
  children: React.ReactNode;
  onApply?: (tags: string[]) => void;
}

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

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
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  const toggleFilter = useCallback((key: string) => {
    setExpandedFilter((prev) => (prev === key ? null : key));
  }, []);

  // Count active filters (non-default)
  const activeCount = useMemo(() => {
    let count = searchTags.length;
    if (ageRange[0] !== DEFAULTS.ageRange[0] || ageRange[1] !== DEFAULTS.ageRange[1]) count++;
    if (distance[0] !== DEFAULTS.distance[0]) count++;
    if (heightRange[0] !== DEFAULTS.heightRange[0] || heightRange[1] !== DEFAULTS.heightRange[1]) count++;
    if (JSON.stringify(relationship) !== JSON.stringify(DEFAULTS.relationship)) count++;
    if (JSON.stringify(education) !== JSON.stringify(DEFAULTS.education)) count++;
    if (JSON.stringify(gender) !== JSON.stringify(DEFAULTS.gender)) count++;
    if (languages.length > 0) count++;
    return count;
  }, [searchTags, ageRange, distance, heightRange, relationship, education, gender, languages]);

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
    setAgeRange([...DEFAULTS.ageRange]);
    setDistance([...DEFAULTS.distance]);
    setHeightRange([...DEFAULTS.heightRange]);
    setRelationship([...DEFAULTS.relationship]);
    setEducation([...DEFAULTS.education]);
    setGender([...DEFAULTS.gender]);
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
              className="p-1 rounded-full hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all active:scale-90"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
            </button>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="font-display text-lg font-semibold text-foreground">
                Magic Search
              </h2>
            </div>
            <button
              onClick={handleReset}
              className="text-xs font-body font-medium text-destructive hover:underline transition-colors active:scale-95"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <motion.div
          className="flex-1 overflow-y-auto px-5 pb-4 pt-4 space-y-5"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {/* Search input */}
          <motion.div variants={staggerItem} className="space-y-2">
            <div className="rounded-2xl border border-border/60 bg-card px-4 py-3 flex items-center gap-3 focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="e.g. loves hiking, startup founder…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleAddTag}
                className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
              />
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => {
                  if (searchQuery.trim() && !searchTags.includes(searchQuery.trim())) {
                    setSearchTags([...searchTags, searchQuery.trim()]);
                    setSearchQuery("");
                  }
                }}
                className="h-7 w-7 rounded-full bg-primary flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity"
              >
                <span className="text-primary-foreground text-sm font-bold leading-none">+</span>
              </motion.button>
            </div>
            <p className="text-xs font-body text-muted-foreground px-1">
              Search by mindset, interests, hobbies, or work habits
            </p>
          </motion.div>

          {/* Quick suggestions */}
          {searchTags.length === 0 && (
            <motion.div variants={staggerItem} className="space-y-2.5">
              <span className="text-[11px] font-body font-semibold tracking-widest text-muted-foreground uppercase">
                Suggested
              </span>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_TAGS.map((tag, i) => (
                  <motion.button
                    key={tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => setSearchTags((prev) => prev.includes(tag) ? prev : [...prev, tag])}
                    className="rounded-full border border-border/60 px-3.5 py-1.5 text-sm font-body font-medium text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all"
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tags */}
          {searchTags.length > 0 && (
            <motion.div variants={staggerItem} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-body font-medium text-muted-foreground">
                  {searchTags.length} keyword{searchTags.length !== 1 ? "s" : ""}
                </span>
                <button
                  onClick={() => setSearchTags([])}
                  className="text-xs font-body font-medium text-destructive hover:underline transition-colors"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchTags.map((tag) => (
                  <motion.span
                    key={tag}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1.5 text-sm font-body font-medium text-primary"
                  >
                    {tag}
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </motion.button>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Accordion filter items */}
          <motion.div variants={staggerItem} className="rounded-2xl border border-border/40 bg-card/60 overflow-hidden divide-y divide-border/30">
            <AccordionFilterItem
              icon={<Calendar className="h-4 w-4" />}
              label="Age Range"
              summary={`${ageRange[0]} – ${ageRange[1]}`}
              isModified={ageRange[0] !== DEFAULTS.ageRange[0] || ageRange[1] !== DEFAULTS.ageRange[1]}
              expanded={expandedFilter === "age"}
              onToggle={() => toggleFilter("age")}
            >
              <SliderField label="Age Range" valueLabel={`${ageRange[0]} – ${ageRange[1]}`} value={ageRange} onChange={setAgeRange} min={18} max={60} step={1} />
            </AccordionFilterItem>

            <AccordionFilterItem
              icon={<MapPin className="h-4 w-4" />}
              label="Distance"
              summary={`${distance[0]} km`}
              isModified={distance[0] !== DEFAULTS.distance[0]}
              expanded={expandedFilter === "distance"}
              onToggle={() => toggleFilter("distance")}
            >
              <div className="space-y-3">
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
            </AccordionFilterItem>

            <AccordionFilterItem
              icon={<Ruler className="h-4 w-4" />}
              label="Height"
              summary={`${heightRange[0]} – ${heightRange[1]} cm`}
              isModified={heightRange[0] !== DEFAULTS.heightRange[0] || heightRange[1] !== DEFAULTS.heightRange[1]}
              expanded={expandedFilter === "height"}
              onToggle={() => toggleFilter("height")}
            >
              <SliderField label="Height" valueLabel={`${heightRange[0]} – ${heightRange[1]} cm`} value={heightRange} onChange={setHeightRange} min={140} max={220} step={1} />
            </AccordionFilterItem>

            <AccordionFilterItem
              icon={<Users className="h-4 w-4" />}
              label="Gender"
              summary={gender.length === 0 ? "Any" : gender.length <= 2 ? gender.join(", ") : `${gender.length} selected`}
              isModified={JSON.stringify(gender) !== JSON.stringify(DEFAULTS.gender)}
              expanded={expandedFilter === "gender"}
              onToggle={() => toggleFilter("gender")}
            >
              <InlineSelectableOptions value={gender} options={GENDER_OPTIONS} onChange={setGender} />
            </AccordionFilterItem>

            <AccordionFilterItem
              icon={<Heart className="h-4 w-4" />}
              label="Relationship Intent"
              summary={relationship.length === 0 ? "Any" : relationship.length <= 2 ? relationship.join(", ") : `${relationship.length} selected`}
              isModified={JSON.stringify(relationship) !== JSON.stringify(DEFAULTS.relationship)}
              expanded={expandedFilter === "relationship"}
              onToggle={() => toggleFilter("relationship")}
            >
              <InlineSelectableOptions value={relationship} options={RELATIONSHIP_OPTIONS} onChange={setRelationship} />
            </AccordionFilterItem>

            <AccordionFilterItem
              icon={<GraduationCap className="h-4 w-4" />}
              label="Education"
              summary={education.length === 0 ? "Any" : education.length <= 2 ? education.join(", ") : `${education.length} selected`}
              isModified={JSON.stringify(education) !== JSON.stringify(DEFAULTS.education)}
              expanded={expandedFilter === "education"}
              onToggle={() => toggleFilter("education")}
            >
              <InlineSelectableOptions value={education} options={EDUCATION_OPTIONS} onChange={setEducation} />
            </AccordionFilterItem>

            <AccordionFilterItem
              icon={<Globe className="h-4 w-4" />}
              label="Languages"
              summary={languages.length === 0 ? "Any" : languages.length <= 2 ? languages.join(", ") : `${languages.length} selected`}
              isModified={languages.length > 0}
              expanded={expandedFilter === "languages"}
              onToggle={() => toggleFilter("languages")}
            >
              <LanguageInlineRow value={languages} onChange={setLanguages} />
            </AccordionFilterItem>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border/30 bg-background">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              onApply?.(searchTags);
              setOpen(false);
            }}
            className="w-full rounded-full py-3 font-body text-sm font-semibold text-primary-foreground relative overflow-hidden"
            style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-warm)" }}
          >
            <span className="flex items-center justify-center gap-2">
              Apply Filters
              {activeCount > 0 && (
                <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-primary-foreground/20 text-[11px] font-bold text-primary-foreground">
                  {activeCount}
                </span>
              )}
            </span>
          </motion.button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

/* ── Filter Card Container ─────────────────────────────── */

function FilterCard({
  icon,
  isModified,
  children,
}: {
  icon: React.ReactNode;
  isModified: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/60 p-4 relative transition-colors hover:border-border/60">
      <div className="flex gap-3">
        <div className={`mt-0.5 shrink-0 transition-colors ${isModified ? "text-primary" : "text-muted-foreground/60"}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
      {isModified && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full bg-primary flex items-center justify-center"
        >
          <Check className="h-2 w-2 text-primary-foreground" strokeWidth={3} />
        </motion.div>
      )}
    </div>
  );
}

/* ── Section Label ──────────────────────────────────────── */

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

/* ── Slider Field ───────────────────────────────────────── */

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

/* ── Selectable Row ─────────────────────────────────────── */

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
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
      >
        <span className="font-body font-semibold text-foreground">{label}</span>
        <span className="flex items-center gap-1 font-body text-sm font-medium text-primary">
          {value.length === 0 ? "Any" : value.length <= 2 ? value.join(", ") : `${value.length} selected`}
          <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-90" : ""}`} />
        </span>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-1 pb-1">
              {options.map((opt) => (
                <motion.button
                  key={opt}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleOption(opt)}
                  className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[13px] font-body font-medium transition-all duration-150 ${
                    value.includes(opt)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  }`}
                >
                  <span>{opt}</span>
                  <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
                    value.includes(opt)
                      ? "border-primary bg-primary"
                      : "border-border"
                  }`}>
                    {value.includes(opt) && <Check className="h-3 w-3 text-primary-foreground" />}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Language Filter Row ────────────────────────────────── */

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
        className="w-full flex items-center justify-between"
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
              <button
                onClick={() => setSheetOpen(false)}
                className="p-1 rounded-full hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all active:scale-90"
              >
                <ChevronRight className="h-5 w-5 rotate-180" />
              </button>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <h2 className="font-display text-lg font-semibold text-foreground">Languages</h2>
              </div>
              <button
                onClick={() => { onChange([]); setQuery(""); }}
                className="text-xs font-body font-medium text-destructive hover:underline"
              >
                Clear
              </button>
            </div>

            {/* Search */}
            <div className="rounded-xl border border-border/60 bg-card px-3 py-2.5 flex items-center gap-2 focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
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
                  <motion.span
                    key={lang}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-body font-medium text-primary"
                  >
                    {lang}
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => remove(lang)}
                    >
                      <X className="h-3 w-3" />
                    </motion.button>
                  </motion.span>
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
                <motion.button
                  key={lang}
                  whileTap={{ scale: 0.98, backgroundColor: "hsl(var(--primary) / 0.08)" }}
                  onClick={() => addLanguage(lang)}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-body text-foreground hover:bg-primary/5 transition-colors flex items-center justify-between"
                >
                  {lang}
                  <span className="text-primary text-xs font-medium">+ Add</span>
                </motion.button>
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
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setSheetOpen(false)}
              className="w-full rounded-full py-3 font-body text-sm font-semibold text-primary-foreground"
              style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-warm)" }}
            >
              Done{value.length > 0 ? ` (${value.length})` : ""}
            </motion.button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default MagicSearchFilter;
