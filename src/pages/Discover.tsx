import { useState } from "react";
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
  BookOpen,
  Pencil,
} from "lucide-react";
import profileImage from "@/assets/profile-placeholder.jpg";
import profilePhoto2 from "@/assets/profile-photo-2.jpg";
import profilePhoto3 from "@/assets/profile-photo-3.jpg";

const PROFILE = {
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
  relationshipIntent: "Meaningful Connection • Shared Experiences",
  bio: "I'm an introverted soul who thrives in the quiet rhythm of the pottery wheel and the vast expanse of a mountain trail. I find my peace wandering through flower markets and exploring the world one trek at a time.",
  narratives: [
    "I find my center when my hands are covered in clay and the rest of the world fades away.",
    "There is nothing like the stillness of a summit after a long, challenging trek.",
  ],
  joinMeFor: [
    "Quiet pottery workshop afternoon",
    "High-altitude mountain trek",
    "Morning flower market stroll",
  ],
  // All photos — first one is the hero, rest are interspersed between sections
  photos: [profileImage, profilePhoto2, profilePhoto3],
};
/* ── Sub-components ── */

function ProfilePhotoCard({ src, liked, setLiked }: { src: string; liked: boolean; setLiked: (v: boolean) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative rounded-3xl overflow-hidden">
      <img src={src} alt="Profile" className="w-full aspect-[4/5] object-cover" width={800} height={1000} />
      <button onClick={() => setLiked(!liked)} className="absolute top-4 right-4 h-11 w-11 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: liked ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.4)" }}>
        <Heart className="h-5 w-5" fill={liked ? "white" : "none"} stroke="white" strokeWidth={2} />
      </button>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="rounded-2xl bg-card/80 backdrop-blur-md px-5 py-4 border border-border/30">
          <div className="flex items-center gap-2.5">
            <h2 className="font-display text-2xl font-bold text-foreground">{PROFILE.name}, {PROFILE.age}</h2>
            {PROFILE.verified && (<div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center"><Shield className="h-4 w-4 text-primary" /></div>)}
          </div>
          <p className="font-body text-sm text-foreground/80 mt-0.5">{PROFILE.profession} • {PROFILE.specialization}</p>
          <div className="flex items-center gap-1.5 mt-1"><MapPin className="h-3.5 w-3.5 text-muted-foreground" /><span className="font-body text-xs text-muted-foreground">{PROFILE.location}</span></div>
        </div>
      </div>
    </motion.div>
  );
}

function InterspersedPhoto({ src, delay = 0.2 }: { src: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }} className="rounded-3xl overflow-hidden">
      <img src={src} alt="Profile photo" className="w-full aspect-[4/5] object-cover" loading="lazy" width={800} height={1000} />
    </motion.div>
  );
}

function AboutSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }} className="rounded-2xl border border-border/60 bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-4">About</h3>
      <div className="grid grid-cols-2 gap-y-4 gap-x-6">
        <AboutItem icon={<User className="h-4 w-4 text-muted-foreground" />} label={PROFILE.about.gender} />
        <AboutItem icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />} label={PROFILE.about.pronouns} />
        <AboutItem icon={<GraduationCap className="h-4 w-4 text-muted-foreground" />} label={PROFILE.about.education} />
        <AboutItem icon={<Ruler className="h-4 w-4 text-muted-foreground" />} label={PROFILE.about.height} />
      </div>
    </motion.div>
  );
}

function BioSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="rounded-2xl border border-border/60 bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/60"><Heart className="h-4.5 w-4.5 text-primary" /></div>
        <h3 className="font-display text-base font-semibold text-card-foreground">Bio</h3>
      </div>
      <p className="font-body text-card-foreground/80 leading-relaxed text-[15px]">"{PROFILE.bio}"</p>
    </motion.div>
  );
}

function InterestsSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="rounded-2xl border border-border/60 bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/60"><Sparkles className="h-4.5 w-4.5 text-accent" /></div>
        <h3 className="font-display text-base font-semibold text-card-foreground">Interests</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {PROFILE.interests.map((interest, idx) => (
          <span key={idx} className="inline-block rounded-full border border-primary/15 bg-primary/8 px-3.5 py-1.5 font-body text-[13px] text-primary font-medium">{interest}</span>
        ))}
      </div>
    </motion.div>
  );
}

function NarrativesSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.4 }} className="rounded-2xl border border-border/60 bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/60"><BookOpen className="h-4.5 w-4.5 text-primary" /></div>
        <h3 className="font-display text-base font-semibold text-card-foreground">Narratives</h3>
      </div>
      <div className="space-y-4">
        {PROFILE.narratives.map((narrative, idx) => (
          <div key={idx} className="pl-4 border-l-2 border-primary/20">
            <p className="font-body text-card-foreground/75 leading-relaxed text-[15px]">{narrative}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function JoinMeForSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.4 }} className="rounded-2xl border border-border/60 bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/60"><MapPin className="h-4.5 w-4.5 text-accent" /></div>
        <h3 className="font-display text-base font-semibold text-card-foreground">Join Me For</h3>
      </div>
      <div className="space-y-3">
        {PROFILE.joinMeFor.map((idea, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-display text-xs font-bold text-accent">{idx + 1}</span>
            <p className="font-body text-card-foreground/75 text-[15px] leading-relaxed pt-0.5">{idea}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
function RelationshipIntentSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.4 }} className="rounded-2xl border border-border/60 bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-3">Intent</h3>
      <p className="font-body text-[15px] text-card-foreground/80">{PROFILE.relationshipIntent}</p>
    </motion.div>
  );
}


const Discover = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Top bar */}
      <header className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between rounded-full border border-border/60 bg-card px-4 py-2.5" style={{ boxShadow: "var(--shadow-card)" }}>
          <button className="p-1">
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
        {(() => {
          // Sections to render in order
          const sections = [
            <ProfilePhotoCard key="hero" src={PROFILE.photos[0]} liked={liked} setLiked={setLiked} />,
            <AboutSection key="about" />,
            <BioSection key="bio" />,
            <InterestsSection key="interests" />,
            <NarrativesSection key="narratives" />,
            <JoinMeForSection key="joinmefor" />,
          ];

          // Extra photos (after the hero) to intersperse between sections
          const extraPhotos = PROFILE.photos.slice(1);

          // Distribute photos evenly between content sections (after hero)
          // Content sections are indices 1..5 (About, Bio, Interests, Narratives, JoinMeFor)
          const contentSections = sections.slice(1);
          const result: React.ReactNode[] = [sections[0]]; // Start with hero

          if (extraPhotos.length === 0) {
            result.push(...contentSections);
          } else {
            // Calculate spacing: place photos evenly among content sections
            const gap = Math.max(1, Math.floor(contentSections.length / (extraPhotos.length + 1)));
            let photoIdx = 0;

            contentSections.forEach((section, i) => {
              result.push(section);
              // Insert a photo after every `gap` sections
              if (photoIdx < extraPhotos.length && (i + 1) % gap === 0) {
                result.push(
                  <InterspersedPhoto
                    key={`photo-${photoIdx}`}
                    src={extraPhotos[photoIdx]}
                    delay={0.2 + photoIdx * 0.05}
                  />
                );
                photoIdx++;
              }
            });

            // Append any remaining photos at the end
            while (photoIdx < extraPhotos.length) {
              result.push(
                <InterspersedPhoto
                  key={`photo-${photoIdx}`}
                  src={extraPhotos[photoIdx]}
                  delay={0.2 + photoIdx * 0.05}
                />
              );
              photoIdx++;
            }
          }

          return result;
        })()}
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
