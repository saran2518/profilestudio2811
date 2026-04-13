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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  { icon: <User className="h-5 w-5" />, label: "Profile &\nAccount" },
  { icon: <Compass className="h-5 w-5" />, label: "Discovery\nPreferences" },
  { icon: <Users className="h-5 w-5" />, label: "Invites &\nConnections" },
  { icon: <Shield className="h-5 w-5" />, label: "Safety &\nPrivacy" },
  { icon: <CreditCard className="h-5 w-5" />, label: "Payments" },
  { icon: <Sparkles className="h-5 w-5" />, label: "Profile\nStudio" },
];

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.06 } } },
  item: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
  },
};

const HelpFAQ = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = categories.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col pb-8">
      {/* Header */}
      <header className="sticky top-0 z-30 px-4 pt-3 pb-2">
        <div className="flex items-center gap-3 rounded-full border border-border/30 bg-card/80 backdrop-blur-xl px-4 py-2.5">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="font-display text-base font-semibold text-foreground tracking-tight">Help</span>
        </div>
      </header>

      <main className="flex-1 px-4 mt-4">
        <motion.div variants={stagger.container} initial="initial" animate="animate" className="flex flex-col gap-6">
          {/* Search */}
          <motion.div variants={stagger.item} className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="How can we help?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 rounded-xl border-border/30 bg-card text-[13px] placeholder:text-muted-foreground/60"
              style={{ boxShadow: "var(--shadow-card)" }}
            />
          </motion.div>

          {/* Category Grid */}
          <motion.div variants={stagger.item} className="grid grid-cols-2 gap-3">
            {filtered.map((cat, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.96 }}
                className="rounded-2xl border border-border/30 bg-card px-4 py-4 flex flex-col items-center gap-2.5 hover:border-primary/20 transition-all group"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center text-primary group-hover:from-primary/15 group-hover:to-accent/10 transition-all">
                  {cat.icon}
                </div>
                <span className="text-[12px] font-medium text-foreground leading-tight text-center whitespace-pre-line">
                  {cat.label}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Need help? */}
          <motion.div variants={stagger.item} className="flex flex-col gap-2.5">
            <p className="text-[15px] font-display font-semibold text-foreground px-1">Need help?</p>
            <button
              onClick={() => navigate("/contact-support")}
              className="w-full flex items-center justify-between rounded-2xl border border-border/30 bg-card px-5 py-4 hover:border-primary/20 transition-all group"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <span className="text-[14px] font-medium text-foreground">Contact Support</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary/50 transition-colors" />
            </button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default HelpFAQ;
