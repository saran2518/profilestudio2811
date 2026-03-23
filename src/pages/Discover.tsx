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
