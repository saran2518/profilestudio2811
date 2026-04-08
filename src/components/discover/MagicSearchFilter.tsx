import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  SlidersHorizontal,
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
  Lock,
  ArrowUpRight,
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
const SUGGESTION_CATEGORIES: { label: string; icon: string; keywords: string[] }[] = [
  { label: "Interests", icon: "🎨", keywords: ["Photography", "Hiking", "Cooking", "Music", "Fitness", "Reading", "Travel", "Art"] },
  { label: "Lifestyle", icon: "✨", keywords: ["Night Owl", "Morning Person", "Startup Founder", "Foodie", "Minimalist", "Adventure Seeker"] },
  { label: "Values", icon: "💎", keywords: ["Empathy", "Authenticity", "Growth Mindset", "Kindness", "Ambition", "Spirituality"] },
];

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
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);

  const toggleFilter = useCallback((key: string) => {
    setExpandedFilter((prev) => (prev === key ? null : key));
  }, []);

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
              className="p-1.5 rounded-full hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all active:scale-90"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
            </button>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Discover filters
            </h2>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-full border border-border/60 text-xs font-body font-semibold text-foreground hover:bg-muted/40 transition-all active:scale-95"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 pb-4 pt-4 space-y-5">

          {/* Magic Search Card */}
          <div
            className="rounded-3xl p-[1px] overflow-hidden"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.4), hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.3))" }}
          >
            <div className="rounded-3xl bg-card p-5 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-9 w-9 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))" }}
                  >
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <span className="font-display text-[15px] font-bold text-foreground block leading-tight">Magic Search</span>
                    <span className="text-[10px] font-body text-muted-foreground">Find your perfect match</span>
                  </div>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full text-[9px] font-bold font-body uppercase tracking-wider text-primary-foreground"
                  style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.75))" }}
                >
                  Pro
                </span>
              </div>

              {/* Search input */}
              <div
                className="rounded-2xl bg-muted/40 px-4 py-3 flex items-center gap-2.5 focus-within:bg-muted/60 transition-all duration-200"
                style={{ boxShadow: "inset 0 1px 3px hsl(var(--foreground) / 0.04)" }}
              >
                <Search className="h-4 w-4 text-muted-foreground/60 shrink-0" />
                <input
                  type="text"
                  placeholder="loves hiking, startup founder…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none"
                />
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => {
                    if (searchQuery.trim() && !searchTags.includes(searchQuery.trim())) {
                      setSearchTags([...searchTags, searchQuery.trim()]);
                      setSearchQuery("");
                    }
                  }}
                  className="h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-opacity"
                  style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.75))" }}
                >
                  <span className="text-primary-foreground text-sm font-bold leading-none">+</span>
                </motion.button>
              </div>

              {/* Active tags */}
              {searchTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {searchTags.map((tag) => (
                    <motion.span
                      key={tag}
                      layout
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-body font-semibold text-primary-foreground"
                      style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8))" }}
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)} className="opacity-70 hover:opacity-100 transition-opacity">
                        <X className="h-3 w-3" />
                      </button>
                    </motion.span>
                  ))}
                </div>
              )}

              {/* Collapsible Suggestions */}
              <div className="pt-1">
                <p className="text-[10px] font-body font-semibold text-muted-foreground/50 uppercase tracking-[0.15em] mb-3">Suggestions</p>
                <div className="space-y-1">
                  {SUGGESTION_CATEGORIES.map((cat) => {
                    const [catOpen, setCatOpen] = [
                      expandedSuggestion === cat.label,
                      () => setExpandedSuggestion((prev: string | null) => prev === cat.label ? null : cat.label),
                    ];
                    const activeInCat = cat.keywords.filter((kw) => searchTags.includes(kw)).length;
                    return (
                      <div key={cat.label} className="rounded-xl overflow-hidden">
                        <button
                          onClick={setCatOpen}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted/30 transition-colors rounded-xl"
                        >
                          <span className="text-base">{cat.icon}</span>
                          <span className="text-[13px] font-body font-semibold text-foreground flex-1 text-left">{cat.label}</span>
                          {activeInCat > 0 && (
                            <span className="h-5 min-w-[20px] px-1.5 rounded-full bg-primary/15 text-[10px] font-bold text-primary flex items-center justify-center">
                              {activeInCat}
                            </span>
                          )}
                          <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {catOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-wrap gap-1.5 px-3 pb-3 pt-1">
                                {cat.keywords.map((kw) => {
                                  const isActive = searchTags.includes(kw);
                                  return (
                                    <motion.button
                                      key={kw}
                                      whileTap={{ scale: 0.92 }}
                                      onClick={() => {
                                        if (isActive) removeTag(kw);
                                        else setSearchTags((prev) => [...prev, kw]);
                                      }}
                                      className={`px-3 py-1.5 rounded-full text-[12px] font-body font-medium border transition-all duration-200 ${
                                        isActive
                                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                          : "border-border/40 bg-muted/30 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                                      }`}
                                    >
                                      {isActive && <Check className="h-3 w-3 inline mr-1 -mt-0.5" />}
                                      {kw}
                                    </motion.button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Magic Search CTA */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  onApply?.(searchTags);
                  setOpen(false);
                }}
                disabled={searchTags.length === 0}
                className="w-full rounded-xl py-3 font-body text-[13px] font-semibold text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.75))" }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  Search{searchTags.length > 0 ? ` (${searchTags.length})` : ""}
                </span>
              </motion.button>
            </div>
          </div>

          {/* BASIC FILTERS - styled card like Magic Search */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-body font-semibold tracking-[0.15em] text-muted-foreground uppercase px-1">
              Basic Filters
            </span>
            <div className="rounded-3xl bg-card p-5 space-y-4">
              {/* Header */}
              <div className="flex items-center gap-2.5">
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent) / 0.7))" }}
                >
                  <SlidersHorizontal className="h-4 w-4 text-accent-foreground" />
                </div>
                <div>
                  <span className="font-display text-[15px] font-bold text-foreground block leading-tight">Refine Results</span>
                  <span className="text-[10px] font-body text-muted-foreground">Narrow down your preferences</span>
                </div>
              </div>

              {/* Filter rows */}
              <div className="rounded-2xl border border-border/30 overflow-hidden divide-y divide-border/20">
                <FilterRow
                  icon={<Calendar className="h-4.5 w-4.5" />}
                  iconBg="bg-amber-100"
                  iconColor="text-amber-600"
                  label="Age range"
                  summary={`${ageRange[0]} – ${ageRange[1]}`}
                  isModified={ageRange[0] !== DEFAULTS.ageRange[0] || ageRange[1] !== DEFAULTS.ageRange[1]}
                  expanded={expandedFilter === "age"}
                  onToggle={() => toggleFilter("age")}
                >
                  <SliderField label="Age Range" valueLabel={`${ageRange[0]} – ${ageRange[1]}`} value={ageRange} onChange={setAgeRange} min={18} max={60} step={1} />
                </FilterRow>

                <FilterRow
                  icon={<MapPin className="h-4.5 w-4.5" />}
                  iconBg="bg-rose-100"
                  iconColor="text-rose-500"
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
                </FilterRow>

                <FilterRow
                  icon={<Ruler className="h-4.5 w-4.5" />}
                  iconBg="bg-slate-100"
                  iconColor="text-slate-500"
                  label="Height"
                  summary={`${heightRange[0]} – ${heightRange[1]} cm`}
                  isModified={heightRange[0] !== DEFAULTS.heightRange[0] || heightRange[1] !== DEFAULTS.heightRange[1]}
                  expanded={expandedFilter === "height"}
                  onToggle={() => toggleFilter("height")}
                >
                  <SliderField label="Height" valueLabel={`${heightRange[0]} – ${heightRange[1]} cm`} value={heightRange} onChange={setHeightRange} min={140} max={220} step={1} />
                </FilterRow>

                <FilterRow
                  icon={<Users className="h-4.5 w-4.5" />}
                  iconBg="bg-violet-100"
                  iconColor="text-violet-600"
                  label="Gender"
                  summary={gender.length === 0 ? "Any" : gender.length <= 2 ? gender.join(", ") : `${gender.length} selected`}
                  isModified={JSON.stringify(gender) !== JSON.stringify(DEFAULTS.gender)}
                  expanded={expandedFilter === "gender"}
                  onToggle={() => toggleFilter("gender")}
                >
                  <InlineSelectableOptions value={gender} options={GENDER_OPTIONS} onChange={setGender} />
                </FilterRow>
              </div>

              {/* Apply Filters CTA */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  onApply?.(searchTags);
                  setOpen(false);
                }}
                className="w-full rounded-xl py-3 font-body text-[13px] font-semibold text-primary-foreground transition-opacity"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.75))" }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Search className="h-3.5 w-3.5" />
                  Apply Filters
                  {activeCount > 0 && (
                    <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-primary-foreground/20 text-[11px] font-bold text-primary-foreground">
                      {activeCount}
                    </span>
                  )}
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

/* ── Filter Row ─────────────────────────────────────────── */

function FilterRow({
  icon,
  iconBg,
  iconColor,
  label,
  summary,
  isModified,
  expanded,
  onToggle,
  locked,
  children,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  summary: string;
  isModified: boolean;
  expanded: boolean;
  onToggle: () => void;
  locked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/20 transition-colors"
      >
        <div className={`h-8 w-8 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
          <div className={iconColor}>{icon}</div>
        </div>
        <span className="font-body font-medium text-foreground text-[14px] flex-1 text-left">{label}</span>
        <span className="font-body text-xs font-medium text-muted-foreground max-w-[100px] truncate text-right">
          {summary}
        </span>
        {isModified && (
          <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
        )}
        {locked ? (
          <Lock className="h-3.5 w-3.5 text-amber-400 shrink-0" />
        ) : (
          <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
        )}
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
            <div className="px-4 pb-4 pt-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
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
        <span className="font-body text-sm text-muted-foreground">{label}</span>
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

/* ── Inline Selectable Options ──────────────────────────── */

function InlineSelectableOptions({
  value,
  options,
  onChange,
}: {
  value: string[];
  options: string[];
  onChange: (v: string[]) => void;
}) {
  const toggleOption = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  };

  return (
    <div className="space-y-1">
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
  );
}

/* ── Language Inline Row ────────────────────────────────── */

function LanguageInlineRow({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
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
      <div className="space-y-2">
        {value.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {value.map((lang) => (
              <span key={lang} className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-body font-medium text-primary">
                {lang}
                <button onClick={() => remove(lang)}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        <button
          onClick={() => setSheetOpen(true)}
          className="text-sm font-body font-medium text-primary hover:underline"
        >
          {value.length === 0 ? "Select languages" : "+ Add more"}
        </button>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col bg-background">
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
                    <motion.button whileTap={{ scale: 0.8 }} onClick={() => remove(lang)}>
                      <X className="h-3 w-3" />
                    </motion.button>
                  </motion.span>
                ))}
              </div>
            </div>
          )}

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
