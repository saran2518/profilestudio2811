import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Sparkles,
  Heart,
  MessageCircle,
  Crown,
  Settings,
  ChevronRight,
  Edit3,
  Camera,
  Eye,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { PROFILES } from "@/lib/profilesData";
import SubscriptionsSection from "@/components/profile/SubscriptionsSection";
import SettingsSection from "@/components/profile/SettingsSection";
import { Button } from "@/components/ui/button";

const userProfile = PROFILES[0];

type SectionKey = "profile" | "subscriptions" | "settings";

const sections: { key: SectionKey; label: string; icon: React.ReactNode }[] = [
  { key: "profile", label: "Profile", icon: <Users className="h-4 w-4" /> },
  { key: "subscriptions", label: "Subscriptions", icon: <Crown className="h-4 w-4" /> },
  { key: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
];

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.07 } } },
  item: { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } } },
};

const Profile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<SectionKey>("profile");

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 px-4 pt-3 pb-2">
        <div
          className="flex items-center gap-3 rounded-full border border-border/30 bg-card/80 backdrop-blur-xl px-5 py-3"
          style={{ boxShadow: "0 4px 24px -4px hsl(var(--foreground) / 0.04)" }}
        >
          <span className="font-display text-base font-semibold text-foreground tracking-tight">Elyxer</span>
        </div>
      </header>

      {/* Section Tabs */}
      <div className="px-4 mt-2 mb-5">
        <div className="flex gap-1.5 p-1 rounded-2xl bg-muted/40">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={`relative flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                activeSection === s.key
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeSection === s.key && (
                <motion.div
                  layoutId="profile-tab"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: "var(--gradient-warm)" }}
                  transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {s.icon}
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 px-4">
        <AnimatePresence mode="wait">
          {activeSection === "profile" && (
            <motion.div
              key="profile"
              variants={stagger.container}
              initial="initial"
              animate="animate"
              className="flex flex-col gap-4 flex-1"
              style={{ minHeight: "calc(100vh - 180px - env(safe-area-inset-bottom, 0px))" }}
            >
              {/* Hero Card - Photo + Name + View */}
              <motion.div
                variants={stagger.item}
                className="relative rounded-[20px] overflow-hidden border border-border/30"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                {/* Gradient banner */}
                <div className="h-24 relative overflow-hidden">
                  <div className="absolute inset-0" style={{ background: "var(--gradient-warm)", opacity: 0.15 }} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,hsl(var(--primary)/0.18),transparent_65%)]" />
                  <motion.div
                    className="absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl"
                    style={{ background: "hsl(var(--primary) / 0.12)" }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.65, 0.4] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                <div className="px-5 pb-5 -mt-10 flex items-end gap-4">
                  <div className="relative shrink-0">
                    <div className="w-[72px] h-[72px] rounded-full border-[3px] border-card overflow-hidden shadow-lg">
                      <img src={userProfile.photos[0]} alt={userProfile.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-sm border-2 border-card">
                      <Camera className="h-3 w-3 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 pb-0.5">
                    <h2 className="text-[17px] font-display font-semibold text-foreground tracking-tight leading-tight truncate">
                      {userProfile.name}, {userProfile.age}
                    </h2>
                    <p className="text-[12px] text-muted-foreground truncate mt-0.5">
                      {userProfile.profession} · {userProfile.location}
                    </p>
                  </div>
                  <Button
                    onClick={() => navigate("/preview", { state: { selfView: true } })}
                    size="sm"
                    variant="outline"
                    className="rounded-xl gap-1.5 h-8 text-[12px] font-medium border-border/50 hover:bg-primary/5 hover:border-primary/30 shrink-0 mb-0.5"
                  >
                    <Eye className="h-3.5 w-3.5 text-primary" />
                    View
                  </Button>
                </div>
              </motion.div>

              {/* Quick Actions Grid - expanded */}
              <motion.div variants={stagger.item} className="flex-1 flex flex-col">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 px-1">Quick Actions</p>
                <div className="grid grid-cols-2 gap-3 flex-1">
                  <QuickActionCard
                    icon={<Edit3 className="h-5 w-5 text-primary" />}
                    title="Edit Profile"
                    subtitle="Update your info & preferences"
                    onClick={() => navigate("/edit-profile")}
                  />
                  <QuickActionCard
                    icon={<Camera className="h-5 w-5 text-primary" />}
                    title="Photos"
                    subtitle="Manage your photo grid"
                    onClick={() => navigate("/manage-photos")}
                  />
                </div>
              </motion.div>

              {/* Resources - expanded */}
              <motion.div variants={stagger.item} className="flex-1 flex flex-col">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 px-1">Resources</p>
                <div className="rounded-[20px] border border-border/30 bg-card overflow-hidden flex-1 flex flex-col" style={{ boxShadow: "var(--shadow-card)" }}>
                  <ResourceRow
                    icon={<BookOpen className="h-5 w-5" />}
                    title="Dating Tips"
                    subtitle="Boost your profile and get more matches"
                    gradient="from-primary/12 to-accent/8"
                    onClick={() => navigate("/dating-tips")}
                  />
                  <div className="h-px bg-border/15 mx-4" />
                  <ResourceRow
                    icon={<HelpCircle className="h-5 w-5" />}
                    title="Help & FAQ"
                    subtitle="Find answers to common questions"
                    gradient="from-accent/12 to-primary/8"
                    onClick={() => navigate("/help-faq")}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {activeSection === "subscriptions" && <SubscriptionsSection />}
        {activeSection === "settings" && <SettingsSection />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/20 z-30">
        <div className="flex items-center justify-around py-2.5 px-2">
          <NavItem icon={<Users className="h-5 w-5" />} label="Profile" active />
          <NavItem icon={<Sparkles className="h-5 w-5" />} label="Moments" onClick={() => navigate("/moments")} />
          <NavItem icon={<InfinityIcon />} label="Discover" onClick={() => navigate("/discover")} />
          <NavItem icon={<Heart className="h-5 w-5" />} label="Interests" onClick={() => navigate("/interests")} />
          <NavItem icon={<MessageCircle className="h-5 w-5" />} label="Chat" onClick={() => navigate("/chat")} />
        </div>
      </nav>
    </div>
  );
};

/* ── Sub-components ── */

function QuickActionCard({ icon, title, subtitle, onClick }: { icon: React.ReactNode; title: string; subtitle: string; onClick: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="rounded-[16px] border border-border/30 bg-card px-3.5 py-3 text-left group hover:border-primary/20 transition-all flex items-center gap-3"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center shrink-0 group-hover:from-primary/15 group-hover:to-accent/10 transition-all">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-foreground leading-tight">{title}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
    </motion.button>
  );
}

function ResourceRow({ icon, title, subtitle, gradient, onClick }: { icon: React.ReactNode; title: string; subtitle: string; gradient: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 text-left group hover:bg-muted/20 transition-colors"
    >
      <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 text-primary`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">{title}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary/50 transition-colors shrink-0" />
    </button>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all duration-200 ${
        active ? "text-primary scale-105" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium leading-none">{label}</span>
      {active && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary"
        />
      )}
    </button>
  );
}

function InfinityIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
    </svg>
  );
}

export default Profile;
