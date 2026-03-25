import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  Undo2,
  X,
  Plus,
  Heart,
  Sparkles,
  Users,
  MessageCircle,
  Search,
} from "lucide-react";

import { PROFILES } from "@/lib/profilesData";
import ProfilePhotoCard from "@/components/discover/ProfilePhotoCard";
import InterspersedPhoto from "@/components/discover/InterspersedPhoto";
import AboutSection from "@/components/discover/AboutSection";
import BioSection from "@/components/discover/BioSection";
import InterestsSection from "@/components/discover/InterestsSection";
import NarrativesSection from "@/components/discover/NarrativesSection";
import JoinMeForSection from "@/components/discover/JoinMeForSection";
import RelationshipIntentSection from "@/components/discover/RelationshipIntentSection";
import MagicSearchFilter from "@/components/discover/MagicSearchFilter";
import InviteDialog from "@/components/discover/InviteDialog";
import VibeDialog from "@/components/discover/VibeDialog";

type VibeSection = "Photo" | "Bio" | "Interests" | "Narratives" | "Join Me For" | string;

const Discover = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [inviteOpen, setInviteOpen] = useState(false);

  // Vibe state
  const [vibedSections, setVibedSections] = useState<Set<string>>(new Set());
  const [vibeDialogOpen, setVibeDialogOpen] = useState(false);
  const [vibeDialogSection, setVibeDialogSection] = useState<VibeSection>("");

  const filteredProfiles = filterTags.length === 0
    ? PROFILES
    : PROFILES.filter((p) => {
        const searchable = [
          p.bio, p.profession, p.specialization, p.relationshipIntent,
          ...p.interests, ...p.narratives.map((n) => n.content), ...p.joinMeFor,
        ].join(" ").toLowerCase();
        return filterTags.some((tag) => searchable.includes(tag.toLowerCase()));
      });

  const profile = filteredProfiles[currentIndex] || filteredProfiles[0];

  const goNext = useCallback(() => {
    if (currentIndex < filteredProfiles.length - 1) {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
      setVibedSections(new Set());
    }
  }, [currentIndex, filteredProfiles.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((i) => i - 1);
      setVibedSections(new Set());
    }
  }, [currentIndex]);

  const openVibeDialog = (section: VibeSection) => {
    setVibeDialogSection(section);
    setVibeDialogOpen(true);
  };

  const handleSendVibe = () => {
    setVibedSections((prev) => new Set(prev).add(vibeDialogSection));
    setVibeDialogOpen(false);
    goNext();
  };

  const handleVibeToInvite = () => {
    setVibeDialogOpen(false);
    setInviteOpen(true);
  };

  const handlePass = () => goNext();
  const handleConnect = () => setInviteOpen(true);

  const isVibed = (section: string) => vibedSections.has(section);

  const buildSections = () => {
    const sections = [
      <ProfilePhotoCard key="hero" src={profile.photos[0]} liked={isVibed("Photo")} onVibe={() => openVibeDialog("Photo")} profile={profile} />,
      <AboutSection key="about" profile={profile} />,
      <BioSection key="bio" bio={profile.bio} vibed={isVibed("Bio")} onVibe={() => openVibeDialog("Bio")} />,
      <RelationshipIntentSection key="intent" intent={profile.relationshipIntent} />,
      <InterestsSection key="interests" interests={profile.interests} vibed={isVibed("Interests")} onVibe={() => openVibeDialog("Interests")} />,
      <NarrativesSection key="narratives" narratives={profile.narratives} vibed={isVibed("Narratives")} onVibe={() => openVibeDialog("Narratives")} />,
      <JoinMeForSection key="joinmefor" items={profile.joinMeFor} vibed={isVibed("Join Me For")} onVibe={() => openVibeDialog("Join Me For")} />,
    ];

    const extraPhotos = profile.photos.slice(1);
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
          const pIdx = photoIdx;
          const sectionKey = `Photo ${pIdx + 2}`;
          result.push(
            <InterspersedPhoto key={`photo-${pIdx}`} src={extraPhotos[pIdx]} delay={0.2 + pIdx * 0.05} vibed={isVibed(sectionKey)} onVibe={() => openVibeDialog(sectionKey)} />
          );
          photoIdx++;
        }
      });

      while (photoIdx < extraPhotos.length) {
        const pIdx = photoIdx;
        const sectionKey = `Photo ${pIdx + 2}`;
        result.push(
          <InterspersedPhoto key={`photo-${pIdx}`} src={extraPhotos[pIdx]} delay={0.2 + pIdx * 0.05} vibed={isVibed(sectionKey)} onVibe={() => openVibeDialog(sectionKey)} />
        );
        photoIdx++;
      }
    }

    return result;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Frosted top bar */}
      <header className="px-4 pt-3 pb-2 sticky top-0 z-30">
        <div className="flex items-center justify-between rounded-full border border-border/40 bg-card/70 backdrop-blur-xl px-4 py-2.5" style={{ boxShadow: "0 4px 24px -4px hsl(var(--foreground) / 0.06)" }}>
          <MagicSearchFilter onApply={(tags) => { setFilterTags(tags); setCurrentIndex(0); setVibedSections(new Set()); }}>
            <button className="p-1 hover:scale-110 transition-transform">
              <SlidersHorizontal className="h-5 w-5 text-foreground" />
            </button>
          </MagicSearchFilter>
          <span className="font-body text-sm text-muted-foreground flex items-center gap-1.5">
            Powered by AI <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
          </span>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:-translate-x-0.5 transition-transform duration-300" onClick={goPrev}>
              <Undo2 className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable content */}
      {filteredProfiles.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-3">
          <Search className="h-10 w-10 text-muted-foreground/50" />
          <p className="font-body text-lg font-semibold text-foreground">No profiles found</p>
          <p className="font-body text-sm text-muted-foreground">Try different keywords or reset your filters</p>
        </div>
      ) : (
        <AnimatePresence mode="wait" custom={direction}>
          <motion.main
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 overflow-y-auto px-4 pb-28 space-y-5"
          >
            {buildSections()}
          </motion.main>
        </AnimatePresence>
      )}

      {/* Floating action buttons */}
      <div className="fixed bottom-20 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          onClick={handlePass}
          className="pointer-events-auto h-14 w-14 rounded-full border border-border/60 bg-card/90 backdrop-blur-sm flex items-center justify-center"
          style={{ boxShadow: "0 8px 32px -6px hsl(var(--foreground) / 0.12)" }}
        >
          <X className="h-6 w-6 text-muted-foreground" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          onClick={handleConnect}
          className="pointer-events-auto h-14 w-14 rounded-full flex items-center justify-center"
          style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-warm)" }}
        >
          <Plus className="h-6 w-6 text-primary-foreground" />
        </motion.button>
      </div>

      {/* Vibe Dialog */}
      <VibeDialog
        open={vibeDialogOpen}
        sectionName={vibeDialogSection}
        onSendVibe={handleSendVibe}
        onCancel={() => setVibeDialogOpen(false)}
        onSendInvite={handleVibeToInvite}
      />

      {/* Invite Dialog */}
      <InviteDialog open={inviteOpen} onClose={() => { setInviteOpen(false); goNext(); }} profileName={profile?.name} />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/30 z-30">
        <div className="flex items-center justify-around py-3 px-2">
          <NavItem icon={<Users className="h-5 w-5" />} label="Profile" />
          <NavItem icon={<Sparkles className="h-5 w-5" />} label="Expressions" />
          <NavItem icon={<InfinityIcon />} label="Discover" active />
          <NavItem icon={<Heart className="h-5 w-5" />} label="Interests" />
          <NavItem icon={<MessageCircle className="h-5 w-5" />} label="Chat" />
        </div>
      </nav>
    </div>
  );
};

function NavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
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

export default Discover;
