import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Quote,
} from "lucide-react";
import profileImage from "@/assets/profile-placeholder.jpg";
import profilePhoto2 from "@/assets/profile-photo-2.jpg";
import profilePhoto3 from "@/assets/profile-photo-3.jpg";
import profilePhoto4 from "@/assets/profile-photo-4.jpg";
import profilePhoto5 from "@/assets/profile-photo-5.jpg";
import profilePhoto6 from "@/assets/profile-photo-6.jpg";

import ProfilePhotoCard from "@/components/discover/ProfilePhotoCard";
import InterspersedPhoto from "@/components/discover/InterspersedPhoto";
import AboutSection from "@/components/discover/AboutSection";
import BioSection from "@/components/discover/BioSection";
import InterestsSection from "@/components/discover/InterestsSection";
import NarrativesSection from "@/components/discover/NarrativesSection";
import JoinMeForSection from "@/components/discover/JoinMeForSection";
import RelationshipIntentSection from "@/components/discover/RelationshipIntentSection";
import MagicSearchFilter from "@/components/discover/MagicSearchFilter";

export const PROFILE = {
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
  photos: [profileImage, profilePhoto2, profilePhoto3, profilePhoto4, profilePhoto5, profilePhoto6],
};

const Discover = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Frosted top bar */}
      <header className="px-4 pt-3 pb-2 sticky top-0 z-30">
        <div className="flex items-center justify-between rounded-full border border-border/40 bg-card/70 backdrop-blur-xl px-4 py-2.5" style={{ boxShadow: "0 4px 24px -4px hsl(var(--foreground) / 0.06)" }}>
          <MagicSearchFilter>
            <span className="p-1 hover:scale-110 transition-transform inline-flex cursor-pointer">
              <SlidersHorizontal className="h-5 w-5 text-foreground" />
            </span>
          </MagicSearchFilter>
          <MagicSearchFilter>
            <span className="font-body text-sm text-muted-foreground flex items-center gap-1.5 cursor-pointer">
              Powered by AI <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
            </span>
          </MagicSearchFilter>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:rotate-180 transition-transform duration-500">
              <RefreshCw className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto px-4 pb-28 space-y-5">
        {(() => {
          const sections = [
            <ProfilePhotoCard key="hero" src={PROFILE.photos[0]} liked={liked} setLiked={setLiked} profile={PROFILE} />,
            <AboutSection key="about" profile={PROFILE} />,
            <BioSection key="bio" bio={PROFILE.bio} />,
            <RelationshipIntentSection key="intent" intent={PROFILE.relationshipIntent} />,
            <InterestsSection key="interests" interests={PROFILE.interests} />,
            <NarrativesSection key="narratives" narratives={PROFILE.narratives} />,
            <JoinMeForSection key="joinmefor" items={PROFILE.joinMeFor} />,
          ];

          const extraPhotos = PROFILE.photos.slice(1);
          const contentSections = sections.slice(1);
          const result: React.ReactNode[] = [sections[0]];

          if (extraPhotos.length === 0) {
            result.push(...contentSections);
          } else {
            const gap = Math.max(1, Math.floor(contentSections.length / (extraPhotos.length + 1)));
            let photoIdx = 0;

            contentSections.forEach((section, i) => {
              result.push(section);
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
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          className="pointer-events-auto h-14 w-14 rounded-full border border-border/60 bg-card/90 backdrop-blur-sm flex items-center justify-center"
          style={{ boxShadow: "0 8px 32px -6px hsl(var(--foreground) / 0.12)" }}
        >
          <X className="h-6 w-6 text-muted-foreground" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          className="pointer-events-auto h-14 w-14 rounded-full flex items-center justify-center"
          style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-warm)" }}
        >
          <Plus className="h-6 w-6 text-primary-foreground" />
        </motion.button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/30 z-30">
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

function NavItem({ icon, active }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={`relative p-2.5 rounded-xl transition-all duration-200 ${
        active ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      {active && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary"
        />
      )}
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
