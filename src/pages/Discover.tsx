import { useState, useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  Wand2,
} from "lucide-react";

import { PROFILES } from "@/lib/profilesData";
import ProfilePhotoCard from "@/components/discover/ProfilePhotoCard";
import InterspersedPhoto from "@/components/discover/InterspersedPhoto";
import ProfileDetailsCard from "@/components/discover/ProfileDetailsCard";
import BioSection from "@/components/discover/BioSection";
import InterestsSection from "@/components/discover/InterestsSection";
import NarrativesSection from "@/components/discover/NarrativesSection";
import JoinMeForSection from "@/components/discover/JoinMeForSection";
import MagicSearchFilter from "@/components/discover/MagicSearchFilter";
import InviteDialog from "@/components/discover/InviteDialog";
import VibeDialog from "@/components/discover/VibeDialog";
import ProfileActions from "@/components/discover/ProfileActions";
import { addVibe } from "@/lib/vibeStore";

type VibeSection = "Photo" | "My Story" | "Interests" | "Narratives" | "Join Me For" | string;

const Discover = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialProfile = Number(searchParams.get("profile")) || 0;
  const [currentIndex, setCurrentIndex] = useState(initialProfile);
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
          p.bio, p.profession, p.specialization, ...p.relationshipIntent,
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

    // Add vibe to store so it appears in Interests page
    if (profile) {
      const originalIndex = PROFILES.indexOf(profile);
      addVibe(
        profile.name,
        profile.photos[0],
        vibeDialogSection === "Picture" ? "picture" : vibeDialogSection.toLowerCase(),
        originalIndex >= 0 ? originalIndex : currentIndex,
        vibeDialogSection === "Picture" ? profile.photos[0] : undefined,
        vibeDialogSection === "My Story" ? profile.bio?.slice(0, 80) : undefined,
      );
    }

    setShowVibeIndicator(true);
    setTimeout(() => setShowVibeIndicator(false), 800);
    goNext();
  };

  const handleVibeToInvite = () => {
    setVibeDialogOpen(false);
    setInviteOpen(true);
  };

  const [showPassIndicator, setShowPassIndicator] = useState(false);
  const [showVibeIndicator, setShowVibeIndicator] = useState(false);
  const [showInviteIndicator, setShowInviteIndicator] = useState(false);

  const handlePass = () => {
    setShowPassIndicator(true);
    setTimeout(() => setShowPassIndicator(false), 600);
    goNext();
  };
  const handleConnect = () => setInviteOpen(true);

  const isVibed = (section: string) => vibedSections.has(section);

  const buildSections = () => {
    // Group About + Languages + Intent together so photos don't split them
    const detailsCard = (
      <ProfileDetailsCard
        key="details"
        profile={{ about: profile.about, languages: profile.languages, relationshipIntent: profile.relationshipIntent }}
      />
    );

    const sections = [
      <ProfilePhotoCard key="hero" src={profile.photos[0]} liked={isVibed("Picture")} onVibe={() => openVibeDialog("Picture")} profile={profile} />,
      <BioSection key="bio" bio={profile.bio} vibed={isVibed("My Story")} onVibe={() => openVibeDialog("My Story")} />,
      detailsCard,
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
          const sectionKey = `Photo-${pIdx + 2}`;
          result.push(
            <InterspersedPhoto key={`photo-${pIdx}`} src={extraPhotos[pIdx]} delay={0.2 + pIdx * 0.05} vibed={isVibed(sectionKey)} onVibe={() => openVibeDialog("Picture")} />
          );
          photoIdx++;
        }
      });

      while (photoIdx < extraPhotos.length) {
        const pIdx = photoIdx;
        const sectionKey = `Photo-${pIdx + 2}`;
        result.push(
          <InterspersedPhoto key={`photo-${pIdx}`} src={extraPhotos[pIdx]} delay={0.2 + pIdx * 0.05} vibed={isVibed(sectionKey)} onVibe={() => openVibeDialog("Picture")} />
        );
        photoIdx++;
      }
    }

    // Add Report & Block at the very bottom
    result.push(<ProfileActions key="actions" profileName={profile.name} />);

    return result;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Frosted top bar */}
      <header className="px-4 pt-3 pb-2 sticky top-0 z-30">
        <div
          className="flex items-center justify-between rounded-2xl border border-border/30 bg-card/80 backdrop-blur-2xl px-4 py-2.5"
          style={{ boxShadow: "0 4px 32px -8px hsl(var(--foreground) / 0.06)" }}
        >
          <MagicSearchFilter onApply={(tags) => { setFilterTags(tags); setCurrentIndex(0); setVibedSections(new Set()); }}>
            <button className="p-1.5 rounded-xl hover:bg-muted/40 hover:scale-105 transition-all duration-200 relative active:scale-95">
              <SlidersHorizontal className="h-5 w-5 text-foreground" />
              {filterTags.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center"
                >
                  {filterTags.length}
                </motion.span>
              )}
            </button>
          </MagicSearchFilter>

          <MagicSearchFilter onApply={(tags) => { setFilterTags(tags); setCurrentIndex(0); setVibedSections(new Set()); }}>
            <button className="font-body text-sm font-medium text-muted-foreground flex items-center gap-1.5 hover:text-foreground transition-colors group">
              <Wand2 className="h-3.5 w-3.5 text-primary group-hover:rotate-12 transition-transform duration-300" />
              Magic Search
            </button>
          </MagicSearchFilter>

          <div className="flex items-center gap-1.5">
            <button className="p-1.5 rounded-xl hover:bg-muted/40 hover:scale-105 transition-all duration-200 active:scale-95" onClick={goPrev}>
              <Undo2 className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable content */}
      {filteredProfiles.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-16 w-16 rounded-2xl bg-muted/60 flex items-center justify-center"
          >
            <Search className="h-7 w-7 text-muted-foreground/40" />
          </motion.div>
          <div className="space-y-1">
            <p className="font-display text-lg font-semibold text-foreground">No profiles found</p>
            <p className="font-body text-sm text-muted-foreground">Try different keywords or reset your filters</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { setFilterTags([]); setCurrentIndex(0); }}
            className="px-5 py-2 rounded-full text-[13px] font-body font-medium text-primary border border-primary/30 hover:bg-primary/5 transition-colors"
          >
            Clear filters
          </motion.button>
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

      {/* Pass indicator */}
      <AnimatePresence>
        {showPassIndicator && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
          >
            <div className="h-24 w-24 rounded-full bg-destructive/15 backdrop-blur-sm flex items-center justify-center">
              <X className="h-12 w-12 text-destructive" strokeWidth={2.5} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating action buttons */}
      <div className="fixed bottom-20 left-0 right-0 flex items-center justify-between px-6 pointer-events-none z-20">
        {/* Pass */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.08 }}
          onClick={handlePass}
          className="pointer-events-auto h-14 w-14 rounded-full border border-border/50 bg-card/95 backdrop-blur-md flex items-center justify-center group"
          style={{ boxShadow: "0 8px 32px -6px hsl(var(--foreground) / 0.1)" }}
        >
          <X className="h-6 w-6 text-muted-foreground group-hover:text-destructive transition-colors duration-200" />
        </motion.button>

        {/* Connect */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.08 }}
          onClick={handleConnect}
          className="pointer-events-auto h-14 w-14 rounded-full flex items-center justify-center relative"
          style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-warm)" }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "var(--gradient-warm)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <Plus className="h-6 w-6 text-primary-foreground relative z-10" />
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
      <InviteDialog open={inviteOpen} onClose={() => setInviteOpen(false)} onSent={() => { setInviteOpen(false); setShowInviteIndicator(true); setTimeout(() => setShowInviteIndicator(false), 800); goNext(); }} profileName={profile?.name} profilePhoto={profile?.photos[0]} profileIndex={PROFILES.indexOf(profile)} />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/85 backdrop-blur-2xl border-t border-border/20 z-30">
        <div className="flex items-center justify-around py-2.5 px-4 max-w-md mx-auto">
          <NavItem icon={<Users className="h-5 w-5" />} label="Profile" onClick={() => navigate("/profile")} />
          <NavItem icon={<Sparkles className="h-5 w-5" />} label="Moments" onClick={() => navigate("/moments")} />
          <NavItem icon={<InfinityIcon />} label="Discover" active />
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
      className={`relative flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all duration-300 ${
        active ? "text-primary" : "text-muted-foreground/60 hover:text-foreground active:scale-90"
      }`}
    >
      <motion.div
        animate={active ? { scale: 1.1 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <span className={`text-[10px] font-medium leading-none ${active ? "font-semibold" : ""}`}>{label}</span>
      {active && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-5 rounded-full"
          style={{ background: "var(--gradient-warm)" }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
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
