import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  MapPin,
  SlidersHorizontal,
  RefreshCw,
  X,
  Plus,
  User,
  MessageSquare,
  Shield,
  GraduationCap,
  Ruler,
  Compass,
  Sparkles,
  Users,
  MessageCircle,
  Coffee,
  Quote,
} from "lucide-react";
import profileImage from "@/assets/profile-placeholder.jpg";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import lifestyle3 from "@/assets/lifestyle-3.jpg";
import type { GeneratedProfile } from "@/lib/profileGenerator";

const DEFAULT_PROFILE = {
  name: "R",
  age: 30,
  verified: true,
  profession: "Architect",
  specialization: "Sustainable Design",
  location: "Bangalore",
  about: {
    gender: "Man",
    pronouns: "He / Him",
    education: "Masters",
    height: '6\'0"',
  },
  interests: ["Mountain hikes", "Vinyl music", "Slow Sundays", "Architecture", "Travel", "Photography"],
  bio: "",
  narratives: [] as string[],
  joinMeFor: [] as string[],
};

const Discover = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const generatedProfile = location.state?.profile as GeneratedProfile | undefined;

  const profile = {
    ...DEFAULT_PROFILE,
    ...(generatedProfile && {
      interests: generatedProfile.interests,
      bio: generatedProfile.bio,
      narratives: generatedProfile.narratives,
      joinMeFor: generatedProfile.joinMeFor,
    }),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Top bar */}
      <header className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between rounded-full border border-border/60 bg-card px-4 py-2.5" style={{ boxShadow: "var(--shadow-card)" }}>
          <button className="p-1" onClick={() => navigate("/")}>
            <SlidersHorizontal className="h-5 w-5 text-foreground" />
          </button>
          <span className="font-body text-sm text-muted-foreground flex items-center gap-1.5">
            Powered by AI <Sparkles className="h-3.5 w-3.5 text-primary" />
          </span>
          <div className="flex items-center gap-2">
            <button className="p-1">
              <SlidersHorizontal className="h-5 w-5 text-foreground rotate-90" />
            </button>
            <button className="p-1">
              <RefreshCw className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto px-4 pb-28 space-y-4">
        {/* Profile Photo Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <img
            src={profileImage}
            alt="Profile"
            className="w-full aspect-[4/5] object-cover"
            width={800}
            height={1000}
          />
          <button
            onClick={() => setLiked(!liked)}
            className="absolute top-4 right-4 h-11 w-11 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: liked ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.4)" }}
          >
            <Heart className="h-5 w-5" fill={liked ? "white" : "none"} stroke="white" strokeWidth={2} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="rounded-2xl bg-card/80 backdrop-blur-md px-5 py-4 border border-border/30">
              <div className="flex items-center gap-2.5">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {profile.name}, {profile.age}
                </h2>
                {profile.verified && (
                  <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                )}
              </div>
              <p className="font-body text-sm text-foreground/80 mt-0.5">
                {profile.profession} • {profile.specialization}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-body text-xs text-muted-foreground">{profile.location}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio Section */}
        {profile.bio && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="rounded-2xl border border-border/60 bg-card p-5"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Bio
            </h3>
            <p className="font-body text-sm text-foreground/80 leading-relaxed">{profile.bio}</p>
          </motion.div>
        )}

        {/* Photo 1 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="rounded-3xl overflow-hidden"
        >
          <img src={lifestyle1} alt="Lifestyle" className="w-full aspect-[4/3] object-cover" loading="lazy" width={800} height={600} />
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-2xl border border-border/60 bg-card p-5"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            About
          </h3>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            <AboutItem icon={<User className="h-4 w-4 text-muted-foreground" />} label={profile.about.gender} />
            <AboutItem icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />} label={profile.about.pronouns} />
            <AboutItem icon={<GraduationCap className="h-4 w-4 text-muted-foreground" />} label={profile.about.education} />
            <AboutItem icon={<Ruler className="h-4 w-4 text-muted-foreground" />} label={profile.about.height} />
          </div>
        </motion.div>

        {/* Photo 2 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="rounded-3xl overflow-hidden"
        >
          <img src={lifestyle2} alt="Lifestyle" className="w-full aspect-[4/3] object-cover" loading="lazy" width={800} height={600} />
        </motion.div>

        {/* Interests Section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="rounded-2xl border border-border/60 bg-card p-5"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-body text-xs font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Narratives Section */}
        {profile.narratives.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="rounded-2xl border border-border/60 bg-card p-5"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-3 flex items-center gap-1.5">
              <Quote className="h-3.5 w-3.5" /> Stories
            </h3>
            <div className="space-y-3">
              {profile.narratives.map((narrative, i) => (
                <p key={i} className="font-body text-sm text-foreground/80 leading-relaxed italic">
                  "{narrative}"
                </p>
              ))}
            </div>
          </motion.div>
        )}

        {/* Photo 3 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="rounded-3xl overflow-hidden"
        >
          <img src={lifestyle3} alt="Lifestyle" className="w-full aspect-[4/3] object-cover" loading="lazy" width={800} height={600} />
        </motion.div>

        {/* Join Me For Section */}
        {profile.joinMeFor.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="rounded-2xl border border-border/60 bg-card p-5"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-3 flex items-center gap-1.5">
              <Coffee className="h-3.5 w-3.5" /> Join Me For
            </h3>
            <div className="space-y-2">
              {profile.joinMeFor.map((idea, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <p className="font-body text-sm text-foreground/80">{idea}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      {/* Floating action buttons */}
      <div className="fixed bottom-20 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <button className="pointer-events-auto h-14 w-14 rounded-full border border-border/60 bg-card flex items-center justify-center shadow-lg">
          <X className="h-6 w-6 text-muted-foreground" />
        </button>
        <button
          className="pointer-events-auto h-14 w-14 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: "var(--gradient-warm)" }}
        >
          <Plus className="h-6 w-6 text-primary-foreground" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/40 z-30">
        <div className="flex items-center justify-around py-3 px-2">
          <NavItem icon={<Users className="h-5 w-5" />} />
          <NavItem icon={<Compass className="h-5 w-5" />} />
          <NavItem icon={<LinkIcon />} active />
          <NavItem icon={<Heart className="h-5 w-5" />} />
          <NavItem icon={<MessageCircle className="h-5 w-5" />} />
        </div>
      </nav>
    </div>
  );
};

function AboutItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      {icon}
      <span className="font-body text-sm text-foreground">{label}</span>
    </div>
  );
}

function NavItem({ icon, active }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={`p-2.5 rounded-xl transition-colors ${
        active ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {icon}
    </button>
  );
}

function LinkIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

export default Discover;
