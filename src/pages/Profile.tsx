import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Sparkles,
  Heart,
  MessageCircle,
  ChevronRight,
  Camera,
  Edit3,
  Crown,
  CreditCard,
  Star,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Moon,
  Globe,
  Lock,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { PROFILES } from "@/lib/profilesData";

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
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 px-4 pt-3 pb-2">
        <div
          className="flex items-center gap-3 rounded-full border border-border/40 bg-card/70 backdrop-blur-xl px-4 py-2.5"
          style={{ boxShadow: "0 4px 24px -4px hsl(var(--foreground) / 0.06)" }}
        >
          <span className="font-display text-base font-semibold text-foreground">My Profile</span>
        </div>
      </header>

      {/* Section Tabs */}
      <div className="px-4 mt-3 mb-4">
        <div className="flex gap-2 p-1 rounded-2xl bg-muted/50">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={`relative flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === s.key
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeSection === s.key && (
                <motion.div
                  layoutId="profile-tab"
                  className="absolute inset-0 rounded-xl bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
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
        {activeSection === "profile" && <ProfileSection navigate={navigate} />}
        {activeSection === "subscriptions" && <SubscriptionsSection />}
        {activeSection === "settings" && (
          <SettingsSection
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/30 z-30">
        <div className="flex items-center justify-around py-3 px-2">
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

/* ── Profile Section ── */
function ProfileSection({ navigate }: { navigate: (path: string) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Profile Card */}
      <div className="relative rounded-2xl overflow-hidden bg-card border border-border/40">
        <div className="h-28 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30" />
        <div className="px-4 pb-4 -mt-12">
          <div className="relative w-24 h-24 rounded-full border-4 border-card overflow-hidden mx-auto">
            <img src={userProfile.photos[0]} alt={userProfile.name} className="w-full h-full object-cover" />
            <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <Camera className="h-4 w-4 text-primary-foreground" />
            </button>
          </div>
          <div className="text-center mt-3">
            <h2 className="text-lg font-display font-semibold text-foreground">{userProfile.name}, {userProfile.age}</h2>
            <p className="text-sm text-muted-foreground">{userProfile.profession} · {userProfile.location}</p>
          </div>
          <Button
            onClick={() => navigate("/preview")}
            variant="outline"
            className="w-full mt-4 rounded-xl gap-2"
          >
            <Eye className="h-4 w-4" />
            View My Profile
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <ActionCard
          icon={<Edit3 className="h-5 w-5 text-primary" />}
          title="Edit Profile"
          subtitle="Update your info"
          onClick={() => navigate("/create")}
        />
        <ActionCard
          icon={<Camera className="h-5 w-5 text-primary" />}
          title="Photos"
          subtitle="Manage photos"
        />
      </div>

      {/* Profile Completeness */}
      <div className="rounded-2xl border border-border/40 bg-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Profile Completeness</span>
          <span className="text-sm font-semibold text-primary">75%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "75%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-primary"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">Add more photos and complete your narratives to boost visibility</p>
      </div>

    </motion.div>
  );
}

/* ── Subscriptions Section ── */
function SubscriptionsSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Current Plan */}
      <div className="rounded-2xl border border-border/40 bg-card p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
            <Star className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Free Plan</h3>
            <p className="text-xs text-muted-foreground">Basic features included</p>
          </div>
        </div>
        <Separator className="my-3" />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2"><span className="text-primary">✓</span> 5 vibes per day</li>
          <li className="flex items-center gap-2"><span className="text-primary">✓</span> Basic profile</li>
          <li className="flex items-center gap-2"><span className="text-muted-foreground/50">✗</span> Unlimited vibes</li>
          <li className="flex items-center gap-2"><span className="text-muted-foreground/50">✗</span> See who viewed you</li>
        </ul>
      </div>

      {/* Premium Plan */}
      <div className="rounded-2xl border-2 border-primary/40 bg-card p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl">
          POPULAR
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Crown className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Premium</h3>
            <p className="text-xs text-muted-foreground">$9.99/month</p>
          </div>
        </div>
        <Separator className="my-3" />
        <ul className="space-y-2 text-sm text-muted-foreground mb-4">
          <li className="flex items-center gap-2"><span className="text-primary">✓</span> Unlimited vibes</li>
          <li className="flex items-center gap-2"><span className="text-primary">✓</span> See who viewed you</li>
          <li className="flex items-center gap-2"><span className="text-primary">✓</span> Priority in discover</li>
          <li className="flex items-center gap-2"><span className="text-primary">✓</span> Advanced filters</li>
        </ul>
        <Button className="w-full rounded-xl gap-2">
          <CreditCard className="h-4 w-4" />
          Upgrade Now
        </Button>
      </div>
    </motion.div>
  );
}

/* ── Settings Section ── */
function SettingsSection({
  darkMode,
  setDarkMode,
  notifications,
  setNotifications,
}: {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  notifications: boolean;
  setNotifications: (v: boolean) => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Preferences */}
      <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border/30">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Preferences</span>
        </div>
        <SettingRow icon={<Bell className="h-4 w-4" />} label="Notifications" action={<Switch checked={notifications} onCheckedChange={setNotifications} />} />
        <SettingRow icon={<Moon className="h-4 w-4" />} label="Dark Mode" action={<Switch checked={darkMode} onCheckedChange={setDarkMode} />} />
        <SettingRow icon={<Globe className="h-4 w-4" />} label="Language" value="English" />
      </div>

      {/* Privacy */}
      <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border/30">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Privacy & Security</span>
        </div>
        <SettingRow icon={<Lock className="h-4 w-4" />} label="Privacy Settings" />
        <SettingRow icon={<Shield className="h-4 w-4" />} label="Blocked Users" />
        <SettingRow icon={<Eye className="h-4 w-4" />} label="Profile Visibility" value="Everyone" />
      </div>

      {/* Support */}
      <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border/30">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Support</span>
        </div>
        <SettingRow icon={<HelpCircle className="h-4 w-4" />} label="Help & FAQ" />
        <SettingRow icon={<Shield className="h-4 w-4" />} label="Terms & Privacy Policy" />
      </div>

      {/* Logout */}
      <Button variant="outline" className="w-full rounded-xl gap-2 text-destructive border-destructive/30 hover:bg-destructive/10">
        <LogOut className="h-4 w-4" />
        Log Out
      </Button>
    </motion.div>
  );
}

/* ── Reusable pieces ── */
function ActionCard({ icon, title, subtitle, onClick }: { icon: React.ReactNode; title: string; subtitle: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="rounded-2xl border border-border/40 bg-card p-4 text-left hover:border-primary/30 transition-colors">
      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-2">{icon}</div>
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </button>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-card p-3 text-center">
      <p className="text-lg font-semibold text-foreground">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

function SettingRow({ icon, label, value, action }: { icon: React.ReactNode; label: string; value?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border/10 last:border-b-0">
      <div className="text-muted-foreground">{icon}</div>
      <span className="flex-1 text-sm text-foreground">{label}</span>
      {action || (
        <div className="flex items-center gap-1 text-muted-foreground">
          {value && <span className="text-xs">{value}</span>}
          <ChevronRight className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all duration-200 ${
        active ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"
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
