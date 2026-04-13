import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Search,
  User,
  Compass,
  Users,
  Shield,
  Sparkles,
  CreditCard,
  ChevronRight,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { faqCategories } from "@/lib/faqData";

const categories = [
  { icon: <User className="h-5 w-5" />, label: "Profile &\nAccount", slug: "profile-account" },
  { icon: <Compass className="h-5 w-5" />, label: "Discovery\nPreferences", slug: "discovery-preferences" },
  { icon: <Users className="h-5 w-5" />, label: "Invites &\nConnections", slug: "invites-connections" },
  { icon: <Shield className="h-5 w-5" />, label: "Safety &\nPrivacy", slug: "safety-privacy" },
  { icon: <CreditCard className="h-5 w-5" />, label: "Payments", slug: "payments" },
  { icon: <Sparkles className="h-5 w-5" />, label: "Profile\nStudio", slug: "profile-studio" },
];

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.07 } } },
  item: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  },
};

const HelpFAQ = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Search across categories AND questions
  const searchLower = search.toLowerCase();
  const filtered = search
    ? categories.filter((c) => {
        const cat = faqCategories.find((fc) => fc.slug === c.slug);
        return (
          c.label.toLowerCase().includes(searchLower) ||
          cat?.questions.some((q) => q.question.toLowerCase().includes(searchLower))
        );
      })
    : categories;

  return (
    <div className="min-h-screen bg-background flex flex-col pb-8">
      {/* Header */}
      <header className="sticky top-0 z-30 px-4 pt-3 pb-2">
        <div className="flex items-center gap-3 rounded-full border border-border/30 bg-card/80 backdrop-blur-xl px-4 py-2.5">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate("/profile")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="font-display text-base font-semibold text-foreground tracking-tight">Help</span>
        </div>
      </header>

      <main className="flex-1 px-4 mt-4">
        <motion.div variants={stagger.container} initial="initial" animate="animate" className="flex flex-col gap-6">
          {/* Hero */}
          <motion.div variants={stagger.item} className="flex flex-col items-center gap-2 pt-2 pb-1">
            <div className="h-12 w-12 rounded-2xl flex items-center justify-center" style={{ background: "var(--gradient-warm)" }}>
              <HelpCircle className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="font-display text-xl font-semibold text-foreground tracking-tight">How can we help?</h1>
            <p className="text-[12px] text-muted-foreground">Browse topics or search for answers</p>
          </motion.div>

          {/* Search */}
          <motion.div variants={stagger.item} className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
            <Input
              placeholder="Search for help..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-12 rounded-2xl border-border/20 bg-card text-[13px] placeholder:text-muted-foreground/50 focus-visible:ring-primary/30"
              style={{ boxShadow: "var(--shadow-card)" }}
            />
          </motion.div>

          {/* Category Grid */}
          <motion.div variants={stagger.item}>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-1 mb-3">Browse Topics</p>
            <div className="grid grid-cols-3 gap-2.5">
              {filtered.map((cat, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ y: -2 }}
                  onClick={() => navigate(`/help-faq/${cat.slug}`)}
                  className="rounded-2xl border border-border/20 bg-card px-2 py-4 flex flex-col items-center gap-2.5 hover:border-primary/25 hover:shadow-md transition-all group"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center text-primary group-hover:from-primary/20 group-hover:to-accent/10 transition-all duration-300">
                    {cat.icon}
                  </div>
                  <span className="text-[11px] font-medium text-foreground leading-tight text-center whitespace-pre-line">
                    {cat.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* No results */}
          {filtered.length === 0 && search && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-2 py-8"
            >
              <Search className="h-6 w-6 text-muted-foreground/30" />
              <p className="text-[13px] text-muted-foreground">No topics match "{search}"</p>
            </motion.div>
          )}

          {/* Need help? */}
          <motion.div variants={stagger.item} className="flex flex-col gap-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-1">Need more help?</p>
            <button
              onClick={() => navigate("/contact-support")}
              className="w-full flex items-center gap-4 rounded-2xl border border-border/20 bg-card px-5 py-4 hover:border-primary/25 hover:shadow-md transition-all group"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--gradient-warm)" }}>
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col items-start gap-0.5 flex-1">
                <span className="text-[14px] font-semibold text-foreground">Contact Support</span>
                <span className="text-[11px] text-muted-foreground">We usually respond within 24 hours</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
            </button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default HelpFAQ;
