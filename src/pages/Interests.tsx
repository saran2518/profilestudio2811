import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  HeartPulse,
  MessageCircle,
  Users,
  Sparkles,
  ChevronDown,
  Coffee,
  UtensilsCrossed,
  Film,
  Monitor,
  Footprints,
  Eye,
  X,
  MapPin,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PROFILES } from "@/lib/profilesData";
import { createThread } from "@/lib/chatStore";
import { toast } from "@/hooks/use-toast";
import { useSentInvites, } from "@/hooks/useInviteStore";
import { Send } from "lucide-react";

/* ─── Mock data ──────────────────────────────────────── */

interface VibeItem {
  id: string;
  name: string;
  photo: string;
  time: string;
  section: string;
  sectionEmoji: string;
  previewText?: string;
  previewImage?: string;
  isMutual?: boolean;
  profileIndex: number;
}

interface InviteItem {
  id: string;
  name: string;
  photo: string;
  time: string;
  category: string;
  categoryIcon: string;
  message: string;
  accepted?: boolean;
  profileIndex: number;
}

const MOCK_VIBES: VibeItem[] = [
  {
    id: "v1",
    name: "John",
    photo: PROFILES[0]?.photos[0] || "",
    time: "2 min ago",
    section: "photo",
    sectionEmoji: "📸",
    previewImage: PROFILES[0]?.photos[1] || PROFILES[0]?.photos[0] || "",
    profileIndex: 0,
  },
  {
    id: "v2",
    name: "Aanya",
    photo: PROFILES[2]?.photos[0] || "",
    time: "15 min ago",
    section: "narrative",
    sectionEmoji: "✍️",
    previewText:
      '"Sometimes the quietest moments speak the loudest volumes. Finding peace in the chaos..."',
    profileIndex: 2,
  },
];

const MOCK_INVITES: InviteItem[] = [
  {
    id: "i1",
    name: "David",
    photo: PROFILES[1]?.photos[0] || "",
    time: "12m ago",
    category: "dinner",
    categoryIcon: "🍽️",
    message:
      "It's been a while — dinner this weekend? There's a new spot downtown I've been dying to try.",
    profileIndex: 1,
  },
  {
    id: "i2",
    name: "Sara",
    photo: PROFILES[2]?.photos[0] || "",
    time: "2h ago",
    category: "travel",
    categoryIcon: "✈️",
    message:
      "Let's plan a short trip on Saturday. I was thinking we could drive up to the coast, grab some seafood, and maybe do a sunset walk.",
    profileIndex: 2,
  },
  {
    id: "i3",
    name: "Alex",
    photo: PROFILES[3]?.photos[0] || "",
    time: "3h ago",
    category: "movie",
    categoryIcon: "🎬",
    message:
      "Movie night over call tomorrow? I have a subscription we can share.",
    profileIndex: 3,
  },
  {
    id: "i4",
    name: "Priya",
    photo: PROFILES[4]?.photos[0] || "",
    time: "Yesterday",
    category: "virtual date",
    categoryIcon: "💻",
    message: "",
    accepted: true,
    profileIndex: 4,
  },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  dinner: <UtensilsCrossed className="h-3.5 w-3.5" />,
  travel: <Footprints className="h-3.5 w-3.5" />,
  movie: <Film className="h-3.5 w-3.5" />,
  "virtual date": <Monitor className="h-3.5 w-3.5" />,
  coffee: <Coffee className="h-3.5 w-3.5" />,
};

/* ─── Components ─────────────────────────────────────── */

function VibeCard({ vibe, index, onClick }: { vibe: VibeItem; index: number; onClick: (vibe: VibeItem) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      className="rounded-2xl border border-border/40 bg-card overflow-hidden relative group cursor-pointer active:scale-[0.98] transition-transform"
      style={{ boxShadow: "var(--shadow-card)" }}
      onClick={() => onClick(vibe)}
    >
      {/* Warm left accent for mutual vibes */}
      {vibe.isMutual && (
        <div
          className="absolute top-0 left-0 w-1 h-full rounded-r-full"
          style={{ background: "var(--gradient-warm)" }}
        />
      )}

      {/* Header row */}
      <div className="p-4 pb-2.5 flex items-center gap-3">
        <div className="relative">
          <img
            src={vibe.photo}
            alt={vibe.name}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/15 ring-offset-2 ring-offset-card"
          />
          <div
            className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full flex items-center justify-center border-2 border-card"
            style={{ background: "var(--gradient-warm)" }}
          >
            <HeartPulse className="h-2 w-2 text-primary-foreground" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-[15px] font-bold text-card-foreground leading-tight">
            {vibe.name}
          </p>
          <p className="font-body text-[11px] text-muted-foreground mt-0.5">
            {vibe.time}
          </p>
        </div>
        <span className="text-lg">{vibe.sectionEmoji}</span>
      </div>

      {/* Vibe description */}
      <div className="px-4 pb-3">
        <p className="font-body text-[13px] text-foreground/70 leading-relaxed">
          Vibed on your{" "}
          <span
            className="font-semibold text-transparent bg-clip-text"
            style={{ backgroundImage: "var(--gradient-warm)" }}
          >
            {vibe.section}
          </span>
        </p>
      </div>

      {/* Preview image */}
      {vibe.previewImage && (
        <div className="px-4 pb-3">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={vibe.previewImage}
              alt="content"
              className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
          </div>
        </div>
      )}

      {/* Preview text */}
      {vibe.previewText && (
        <div className="px-4 pb-3">
          <div className="rounded-xl bg-muted/40 p-3.5 relative overflow-hidden border border-border/30">
            <div
              className="absolute top-0 left-0 w-[3px] h-full rounded-r-full"
              style={{ background: "var(--gradient-warm)" }}
            />
            <p className="font-body text-[13px] text-foreground/65 italic leading-relaxed pl-3">
              {vibe.previewText}
            </p>
          </div>
        </div>
      )}

      {/* Mutual vibe indicator (no action buttons) */}
      {vibe.isMutual && (
        <div className="px-4 pb-4">
          <div
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--accent) / 0.08))" }}
          >
            <div
              className="h-7 w-7 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "var(--gradient-warm)" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <p className="font-body text-[13px] font-semibold text-primary">
              Mutual Vibe — Chat Created 💬
            </p>
          </div>
        </div>
      )}

      {/* Tap hint for non-mutual */}
      {!vibe.isMutual && (
        <div className="px-4 pb-4 flex items-center justify-center">
          <p className="font-body text-[11px] text-muted-foreground/50">
            Tap to view profile
          </p>
        </div>
      )}
    </motion.div>
  );
}

function InviteCard({ invite, index, onClick }: { invite: InviteItem; index: number; onClick: (invite: InviteItem) => void }) {
  const catIcon = CATEGORY_ICONS[invite.category];
  const [expanded, setExpanded] = useState(false);
  const isLong = invite.message.length > 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      className="rounded-2xl border border-border/40 bg-card overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
      style={{ boxShadow: "var(--shadow-card)" }}
      onClick={() => onClick(invite)}
    >
      {/* Category pill — compact, inline */}
      <div className="p-4 pb-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={invite.photo}
              alt={invite.name}
              className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/15 ring-offset-2 ring-offset-card"
            />
          </div>
          <div>
            <p className="font-display text-[15px] font-bold text-card-foreground leading-tight">
              {invite.name}
            </p>
            <p className="font-body text-[11px] text-muted-foreground mt-0.5">
              {invite.time}
            </p>
          </div>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-primary-foreground"
          style={{ background: "var(--gradient-warm)" }}
        >
          <span className="[&>svg]:h-3 [&>svg]:w-3">{catIcon}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider font-body">
            {invite.category}
          </span>
        </div>
      </div>

      {/* Message */}
      {invite.message && (
        <div className="px-4 pt-3 pb-3">
          <div className="rounded-xl bg-muted/30 p-3 border border-border/30">
            <p className="font-body text-[13px] text-foreground/75 leading-relaxed">
              {isLong && !expanded
                ? invite.message.slice(0, 100) + "…"
                : invite.message}
            </p>
            {isLong && (
              <button
                onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
                className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-primary/70 hover:text-primary transition-colors"
              >
                {expanded ? "Show less" : "Read more"}
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Accepted indicator */}
      {invite.accepted ? (
        <div className="px-4 pb-4 pt-1">
          <div
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--accent) / 0.08))" }}
          >
            <div
              className="h-7 w-7 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "var(--gradient-warm)" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <p className="font-body text-[13px] font-semibold text-primary">
              Accepted — Chat Created 💬
            </p>
          </div>
        </div>
      ) : (
        <div className="px-4 pb-4 flex items-center justify-center">
          <p className="font-body text-[11px] text-muted-foreground/50">
            Tap to view profile & respond
          </p>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────── */

export default function Interests() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("vibes");
  const [mutualVibeProfile, setMutualVibeProfile] = useState<VibeItem | null>(null);
  const [acceptedInviteProfile, setAcceptedInviteProfile] = useState<InviteItem | null>(null);
  const [selectedVibePreview, setSelectedVibePreview] = useState<VibeItem | null>(null);
  const sentInvites = useSentInvites();
  const [selectedInvitePreview, setSelectedInvitePreview] = useState<InviteItem | null>(null);

  const newInvites = MOCK_INVITES.filter((i) => !i.accepted);
  const acceptedInvites = MOCK_INVITES.filter((i) => i.accepted);

  const vibeCount = MOCK_VIBES.length;
  const inviteCount = newInvites.length + sentInvites.length;

  const handleVibeCardClick = (vibe: VibeItem) => {
    if (vibe.isMutual) {
      navigate("/chat");
    } else {
      setSelectedVibePreview(vibe);
    }
  };

  const handleVibeBack = (vibe: VibeItem) => {
    setSelectedVibePreview(null);
    createThread(vibe.name, vibe.photo, "vibe");
    setMutualVibeProfile(vibe);
  };

  const handlePass = () => {
    const name = selectedVibePreview?.name;
    setSelectedVibePreview(null);
    toast({
      title: "Passed",
      description: `You passed on ${name}`,
    });
  };

  const handleChatNow = () => {
    setMutualVibeProfile(null);
    navigate("/chat");
  };

  const handleLater = () => {
    setMutualVibeProfile(null);
    toast({
      title: "Connection saved! 💜",
      description: `You can chat with ${mutualVibeProfile?.name} anytime`,
    });
  };

  const handleAcceptInvite = (invite: InviteItem) => {
    setSelectedInvitePreview(null);
    createThread(invite.name, invite.photo, "invite");
    setAcceptedInviteProfile(invite);
  };

  const handleDeclineInvite = () => {
    const name = selectedInvitePreview?.name;
    setSelectedInvitePreview(null);
    toast({
      title: "Declined",
      description: `You declined ${name}'s invite`,
    });
  };

  const handleInviteChatNow = () => {
    setAcceptedInviteProfile(null);
    navigate("/chat");
  };

  const handleInviteLater = () => {
    setAcceptedInviteProfile(null);
    toast({
      title: "Connection saved! ☕",
      description: `You can chat with ${acceptedInviteProfile?.name} anytime`,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="pt-12 pb-4 px-5">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Interests
        </h1>
        <p className="font-body text-[13px] text-muted-foreground mt-1">
          People who connected with your profile
        </p>
      </header>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-5 pb-1">
          <TabsList className="bg-muted/50 w-full h-11 p-1 rounded-xl border border-border/30">
            <TabsTrigger
              value="vibes"
              className="flex-1 font-body text-[13px] font-semibold rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-foreground text-muted-foreground transition-all duration-200 gap-1.5 h-full"
            >
              <HeartPulse className="h-3.5 w-3.5" />
              Vibes
              {vibeCount > 0 && (
                <span
                  className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full text-primary-foreground leading-none"
                  style={{ background: "var(--gradient-warm)" }}
                >
                  {vibeCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="invites"
              className="flex-1 font-body text-[13px] font-semibold rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-foreground text-muted-foreground transition-all duration-200 gap-1.5 h-full"
            >
              <Coffee className="h-3.5 w-3.5" />
              Invites
              {inviteCount > 0 && (
                <span
                  className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full text-primary-foreground leading-none"
                  style={{ background: "var(--gradient-warm)" }}
                >
                  {inviteCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Vibes */}
        <TabsContent value="vibes" className="flex-1 overflow-y-auto px-4 pb-24 mt-3">
          <AnimatePresence mode="wait">
            <motion.div
              key="vibes-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3.5"
            >
              {MOCK_VIBES.map((vibe, i) => (
                <VibeCard key={vibe.id} vibe={vibe} index={i} onClick={handleVibeCardClick} />
              ))}
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* Invites */}
        <TabsContent value="invites" className="flex-1 overflow-y-auto px-4 pb-24 mt-3">
          <AnimatePresence mode="wait">
            <motion.div
              key="invites-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {newInvites.length > 0 && (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--gradient-warm)" }}
                    />
                    <p className="font-body text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      New
                    </p>
                  </div>
                  <div className="space-y-3.5 mb-6">
                    {newInvites.map((invite, i) => (
                      <InviteCard key={invite.id} invite={invite} index={i} onClick={(inv) => {
                        if (inv.accepted) { navigate("/chat"); } else { setSelectedInvitePreview(inv); }
                      }} />
                    ))}
                  </div>
                </>
              )}

              {acceptedInvites.length > 0 && (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-3 w-3 text-primary/50" />
                    <p className="font-body text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Accepted
                    </p>
                  </div>
                  <div className="space-y-3.5">
                    {acceptedInvites.map((invite, i) => (
                      <InviteCard key={invite.id} invite={invite} index={i + newInvites.length} onClick={(inv) => navigate("/chat")} />
                    ))}
                  </div>
                </>
              )}
              {sentInvites.length > 0 && (
                <>
                  <div className="flex items-center gap-2 mb-3 mt-2">
                    <Send className="h-3 w-3 text-primary/50" />
                    <p className="font-body text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Sent by you
                    </p>
                  </div>
                  <div className="space-y-3.5">
                    {sentInvites.map((invite, i) => (
                      <motion.div
                        key={invite.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        className="rounded-2xl border border-border/40 bg-card overflow-hidden"
                        style={{ boxShadow: "var(--shadow-card)" }}
                      >
                        <div className="p-4 flex items-center gap-3">
                          <div className="relative">
                            <img src={invite.photo} alt={invite.name} className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/10 ring-offset-2 ring-offset-card" />
                            <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full flex items-center justify-center border-2 border-card" style={{ background: "var(--gradient-warm)" }}>
                              <Send className="h-2 w-2 text-primary-foreground" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-display text-[15px] font-bold text-card-foreground leading-tight">{invite.name}</p>
                            <p className="font-body text-[11px] text-muted-foreground mt-0.5">{invite.time}</p>
                          </div>
                          <span className="text-lg">{invite.categoryIcon}</span>
                        </div>
                        <div className="px-4 pb-3">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold font-body" style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.12))", color: "hsl(var(--primary))" }}>
                            {invite.categoryIcon} {invite.category}
                          </div>
                          {invite.message && (
                            <p className="font-body text-[13px] text-foreground/70 leading-relaxed mt-2">{invite.message}</p>
                          )}
                          <p className="font-body text-[11px] text-muted-foreground/60 mt-2 italic">Waiting for response…</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>

      {/* Profile Preview Overlay */}
      <AnimatePresence>
        {selectedVibePreview && (() => {
          const profile = PROFILES[selectedVibePreview.profileIndex];
          if (!profile) return null;
          return (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                onClick={() => setSelectedVibePreview(null)}
              />
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-50 bg-background overflow-y-auto"
              >
                {/* Sticky header */}
                <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/30 px-4 py-3 flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedVibePreview(null)}
                    className="h-9 w-9 rounded-full bg-muted/50 flex items-center justify-center"
                  >
                    <ArrowLeft className="h-4 w-4 text-foreground" />
                  </motion.button>
                  <div className="flex-1">
                    <p className="font-display text-[15px] font-bold text-foreground">{profile.name}'s Profile</p>
                    <p className="font-body text-[11px] text-muted-foreground">
                      Vibed on your {selectedVibePreview.section} {selectedVibePreview.sectionEmoji}
                    </p>
                  </div>
                </div>

                {/* Profile content */}
                <div className="px-4 pt-4 pb-32 space-y-4">
                  {/* Hero photo */}
                  <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "0 12px 40px -12px hsl(var(--foreground) / 0.15)" }}>
                    <img src={profile.photos[0]} alt={profile.name} className="w-full aspect-[4/5] object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="rounded-2xl bg-card/75 backdrop-blur-lg px-5 py-4 border border-border/20">
                        <div className="flex items-center gap-2.5">
                          <h2 className="font-display text-2xl font-bold text-foreground">{profile.name}, {profile.age}</h2>
                          {profile.verified && (
                            <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
                              <Shield className="h-4 w-4 text-primary" />
                            </div>
                          )}
                        </div>
                        <p className="font-body text-sm text-foreground/80 mt-0.5">{profile.profession} • {profile.specialization}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="font-body text-xs text-muted-foreground">{profile.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="rounded-2xl border border-border/50 bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
                    <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">Bio</h3>
                    <p className="font-body text-[15px] leading-relaxed text-foreground/80">{profile.bio}</p>
                  </div>

                  {/* Interests */}
                  <div className="rounded-2xl border border-border/50 bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
                    <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">Interests</h3>
                    <p className="font-body text-[15px] leading-relaxed text-foreground/80 font-medium">
                      {profile.interests.slice(0, 6).map((interest, idx, arr) => (
                        <span key={idx}>
                          {interest}
                          {idx < arr.length - 1 && (
                            <span className="mx-2 inline-block h-[5px] w-[5px] rounded-full bg-primary/50 align-middle" />
                          )}
                        </span>
                      ))}
                    </p>
                  </div>

                  {/* Narratives */}
                  {profile.narratives.length > 0 && (
                    <div className="rounded-2xl border border-border/50 bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
                      <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">Narratives</h3>
                      {profile.narratives.map((n, idx) => (
                        <div key={idx} className={idx > 0 ? "mt-4 pt-4 border-t border-border/30" : ""}>
                          <p className="font-display text-[15px] font-bold text-foreground mb-1">{n.title}</p>
                          <p className="font-body text-[14px] leading-relaxed text-foreground/70">{n.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Join Me For */}
                  {profile.joinMeFor && profile.joinMeFor.length > 0 && (
                    <div className="rounded-2xl border border-border/50 bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
                      <div className="flex items-center gap-2.5 mb-4">
                        <MapPin className="h-5 w-5 text-primary/60 shrink-0" />
                        <h3 className="font-display text-base font-semibold text-card-foreground">Join Me For</h3>
                      </div>
                      <div className="space-y-2.5">
                        {profile.joinMeFor.map((idea, idx) => (
                          <div
                            key={idx}
                            className="rounded-xl border border-border/50 px-4 py-3"
                            style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.06), hsl(var(--accent) / 0.10))" }}
                          >
                            <p className="font-body text-card-foreground/80 text-[14px] leading-snug">{idea}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Second photo if available */}
                  {profile.photos[1] && (
                    <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
                      <img src={profile.photos[1]} alt="" className="w-full aspect-[3/2] object-cover" />
                    </div>
                  )}
                </div>

                {/* Fixed bottom CTAs */}
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border/30 px-5 py-4 pb-8">
                  <div className="flex gap-3">
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={handlePass}
                      className="flex-1 py-3.5 rounded-2xl border border-border/50 bg-muted/30 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors font-body"
                    >
                      Pass
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleVibeBack(selectedVibePreview)}
                      className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2 font-body"
                      style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-warm)" }}
                    >
                      <HeartPulse className="h-4 w-4" />
                      Vibe Back
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          );
        })()}
      </AnimatePresence>

      {/* Invite Profile Preview Overlay */}
      <AnimatePresence>
        {selectedInvitePreview && (() => {
          const profile = PROFILES[selectedInvitePreview.profileIndex];
          if (!profile) return null;
          return (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                onClick={() => setSelectedInvitePreview(null)}
              />
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-50 bg-background overflow-y-auto"
              >
                {/* Sticky header */}
                <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/30 px-4 py-3 flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedInvitePreview(null)}
                    className="h-9 w-9 rounded-full bg-muted/50 flex items-center justify-center"
                  >
                    <ArrowLeft className="h-4 w-4 text-foreground" />
                  </motion.button>
                  <div className="flex-1">
                    <p className="font-display text-[15px] font-bold text-foreground">{profile.name}'s Profile</p>
                    <p className="font-body text-[11px] text-muted-foreground">
                      Invited you for {selectedInvitePreview.category} {selectedInvitePreview.categoryIcon}
                    </p>
                  </div>
                </div>

                {/* Invite message banner */}
                {selectedInvitePreview.message && (
                  <div className="mx-4 mt-4 rounded-2xl border border-border/40 bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-primary-foreground text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: "var(--gradient-warm)" }}
                      >
                        {selectedInvitePreview.categoryIcon} {selectedInvitePreview.category}
                      </div>
                    </div>
                    <p className="font-body text-[13px] text-foreground/75 leading-relaxed italic">
                      "{selectedInvitePreview.message}"
                    </p>
                  </div>
                )}

                {/* Profile content */}
                <div className="px-4 pt-4 pb-32 space-y-4">
                  {/* Hero photo */}
                  <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "0 12px 40px -12px hsl(var(--foreground) / 0.15)" }}>
                    <img src={profile.photos[0]} alt={profile.name} className="w-full aspect-[4/5] object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="rounded-2xl bg-card/75 backdrop-blur-lg px-5 py-4 border border-border/20">
                        <div className="flex items-center gap-2.5">
                          <h2 className="font-display text-2xl font-bold text-foreground">{profile.name}, {profile.age}</h2>
                          {profile.verified && (
                            <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
                              <Shield className="h-4 w-4 text-primary" />
                            </div>
                          )}
                        </div>
                        <p className="font-body text-sm text-foreground/80 mt-0.5">{profile.profession} • {profile.specialization}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="font-body text-xs text-muted-foreground">{profile.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="rounded-2xl border border-border/50 bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
                    <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">Bio</h3>
                    <p className="font-body text-[15px] leading-relaxed text-foreground/80">{profile.bio}</p>
                  </div>

                  {/* Interests */}
                  <div className="rounded-2xl border border-border/50 bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
                    <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">Interests</h3>
                    <p className="font-body text-[15px] leading-relaxed text-foreground/80 font-medium">
                      {profile.interests.slice(0, 6).map((interest, idx, arr) => (
                        <span key={idx}>
                          {interest}
                          {idx < arr.length - 1 && (
                            <span className="mx-2 inline-block h-[5px] w-[5px] rounded-full bg-primary/50 align-middle" />
                          )}
                        </span>
                      ))}
                    </p>
                  </div>

                  {/* Narratives */}
                  {profile.narratives.length > 0 && (
                    <div className="rounded-2xl border border-border/50 bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
                      <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">Narratives</h3>
                      {profile.narratives.map((n, idx) => (
                        <div key={idx} className={idx > 0 ? "mt-4 pt-4 border-t border-border/30" : ""}>
                          <p className="font-display text-[15px] font-bold text-foreground mb-1">{n.title}</p>
                          <p className="font-body text-[14px] leading-relaxed text-foreground/70">{n.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Join Me For */}
                  {profile.joinMeFor && profile.joinMeFor.length > 0 && (
                    <div className="rounded-2xl border border-border/50 bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
                      <div className="flex items-center gap-2.5 mb-4">
                        <MapPin className="h-5 w-5 text-primary/60 shrink-0" />
                        <h3 className="font-display text-base font-semibold text-card-foreground">Join Me For</h3>
                      </div>
                      <div className="space-y-2.5">
                        {profile.joinMeFor.map((idea, idx) => (
                          <div
                            key={idx}
                            className="rounded-xl border border-border/50 px-4 py-3"
                            style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.06), hsl(var(--accent) / 0.10))" }}
                          >
                            <p className="font-body text-card-foreground/80 text-[14px] leading-snug">{idea}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Second photo if available */}
                  {profile.photos[1] && (
                    <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
                      <img src={profile.photos[1]} alt="" className="w-full aspect-[3/2] object-cover" />
                    </div>
                  )}
                </div>

                {/* Fixed bottom CTAs */}
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border/30 px-5 py-4 pb-8">
                  <div className="flex gap-3">
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={handleDeclineInvite}
                      className="flex-1 py-3.5 rounded-2xl border border-border/50 bg-muted/30 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors font-body"
                    >
                      Decline
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleAcceptInvite(selectedInvitePreview)}
                      className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2 font-body"
                      style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-warm)" }}
                    >
                      <Coffee className="h-4 w-4" />
                      Accept
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          );
        })()}
      </AnimatePresence>

      <AnimatePresence>
        {mutualVibeProfile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={handleLater}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-6 top-1/2 -translate-y-1/2 z-50 rounded-[28px] border border-border/20 bg-card/95 backdrop-blur-2xl overflow-hidden"
              style={{
                boxShadow: "0 20px 60px -15px hsl(var(--primary) / 0.25), 0 0 0 1px hsl(var(--primary) / 0.06)",
              }}
            >
              <div className="h-[3px] w-full" style={{ background: "var(--gradient-warm)" }} />

              <div className="px-6 pt-8 pb-7 flex flex-col items-center text-center">
                {/* Animated hearts */}
                <div className="relative mb-5">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="h-20 w-20 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.2))" }}
                  >
                    <HeartPulse className="h-10 w-10 text-primary" />
                  </motion.div>
                  {/* Profile photo overlay */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -bottom-1 -right-1 h-10 w-10 rounded-full border-[3px] border-card overflow-hidden"
                  >
                    <img src={mutualVibeProfile.photo} alt="" className="h-full w-full object-cover" />
                  </motion.div>
                </div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-display text-xl font-bold text-card-foreground mb-1.5"
                >
                  Mutual Vibe! 💜
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-body text-sm text-muted-foreground mb-6 leading-relaxed"
                >
                  You and <span className="text-foreground font-semibold">{mutualVibeProfile.name}</span> are now connected!
                  <br />
                  <span className="text-xs text-muted-foreground/70">Start a conversation or come back later</span>
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-3 w-full"
                >
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleLater}
                    className="flex-1 py-3.5 rounded-2xl border border-border/50 bg-muted/30 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors font-body"
                  >
                    Later
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleChatNow}
                    className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2 font-body"
                    style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-warm)" }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat Now
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Invite Accepted Dialog */}
      <AnimatePresence>
        {acceptedInviteProfile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={handleInviteLater}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-6 top-1/2 -translate-y-1/2 z-50 rounded-[28px] border border-border/20 bg-card/95 backdrop-blur-2xl overflow-hidden"
              style={{
                boxShadow: "0 20px 60px -15px hsl(var(--primary) / 0.25), 0 0 0 1px hsl(var(--primary) / 0.06)",
              }}
            >
              <div className="h-[3px] w-full" style={{ background: "var(--gradient-warm)" }} />

              <div className="px-6 pt-8 pb-7 flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="h-20 w-20 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.2))" }}
                  >
                    <Coffee className="h-10 w-10 text-primary" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -bottom-1 -right-1 h-10 w-10 rounded-full border-[3px] border-card overflow-hidden"
                  >
                    <img src={acceptedInviteProfile.photo} alt="" className="h-full w-full object-cover" />
                  </motion.div>
                </div>

                <motion.h3
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-display text-xl font-bold text-card-foreground mb-1.5"
                >
                  Invite Accepted! ☕
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-body text-sm text-muted-foreground mb-6 leading-relaxed"
                >
                  You and <span className="text-foreground font-semibold">{acceptedInviteProfile.name}</span> are now connected!
                  <br />
                  <span className="text-xs text-muted-foreground/70">Start a conversation or come back later</span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-3 w-full"
                >
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleInviteLater}
                    className="flex-1 py-3.5 rounded-2xl border border-border/50 bg-muted/30 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors font-body"
                  >
                    Later
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleInviteChatNow}
                    className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2 font-body"
                    style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-warm)" }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat Now
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/30 z-30">
        <div className="flex items-center justify-around py-3 px-2">
          <NavItem icon={<Users className="h-5 w-5" />} label="Profile" />
          <NavItem icon={<Sparkles className="h-5 w-5" />} label="Expressions" />
          <NavItem
            icon={<InfinityIcon />}
            label="Discover"
            onClick={() => navigate("/discover")}
          />
          <NavItem icon={<Heart className="h-5 w-5" />} label="Interests" active />
          <NavItem icon={<MessageCircle className="h-5 w-5" />} label="Chat" onClick={() => navigate("/chat")} />
        </div>
      </nav>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all duration-200 ${
        active
          ? "text-primary scale-110"
          : "text-muted-foreground hover:text-foreground"
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
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
    </svg>
  );
}
