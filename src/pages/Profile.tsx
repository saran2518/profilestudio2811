import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Sparkles,
  Heart,
  MessageCircle,
  Crown,
  Settings,
} from "lucide-react";
import { PROFILES } from "@/lib/profilesData";
import ProfileHeroCard from "@/components/profile/ProfileHeroCard";
import ProfileCompleteness from "@/components/profile/ProfileCompleteness";
import QuickActions from "@/components/profile/QuickActions";
import SubscriptionsSection from "@/components/profile/SubscriptionsSection";
import SettingsSection from "@/components/profile/SettingsSection";

const userProfile = PROFILES[0];

type SectionKey = "profile" | "subscriptions" | "settings";

const sections: { key: SectionKey; label: string; icon: React.ReactNode }[] = [
  { key: "profile", label: "Profile", icon: <Users className="h-4 w-4" /> },
  { key: "subscriptions", label: "Subscriptions", icon: <Crown className="h-4 w-4" /> },
  { key: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
];

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
      <div className="px-4 mt-2 mb-4">
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
      <main className="flex-1 px-4 space-y-4">
        {activeSection === "profile" && (
          <div className="space-y-4">
            <ProfileHeroCard
              name={userProfile.name}
              age={userProfile.age}
              profession={userProfile.profession}
              location={userProfile.location}
              photoUrl={userProfile.photos[0]}
              onViewProfile={() => navigate("/preview")}
            />
            <QuickActions onEditProfile={() => navigate("/profile-studio-intro")} />
            <ProfileCompleteness
              percentage={75}
              message="Add more photos and complete your narratives to boost visibility"
            />
          </div>
        )}
        {activeSection === "subscriptions" && <SubscriptionsSection />}
        {activeSection === "settings" && (
          <SettingsSection />
        )}
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
