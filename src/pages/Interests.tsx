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
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PROFILES } from "@/lib/profilesData";

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
  },
  {
    id: "v3",
    name: "Ravi",
    photo: PROFILES[3]?.photos[0] || "",
    time: "1 hr ago",
    section: "resonance post",
    sectionEmoji: "🌿",
    previewImage: PROFILES[3]?.photos[1] || PROFILES[3]?.photos[0] || "",
    isMutual: true,
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

function VibeCard({ vibe, index }: { vibe: VibeItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      className="rounded-2xl border border-border/40 bg-card overflow-hidden relative group"
      style={{ boxShadow: "var(--shadow-card)" }}
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

      {/* Actions */}
      {vibe.isMutual ? (
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
      ) : (
        <div className="px-4 pb-4 flex gap-2.5">
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold text-primary-foreground font-body flex items-center justify-center gap-2 transition-all"
            style={{
              background: "var(--gradient-warm)",
              boxShadow: "var(--shadow-warm)",
            }}
          >
            <HeartPulse className="h-3.5 w-3.5" />
            Vibe Back
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            className="px-4 py-2.5 rounded-xl border border-border/50 text-[13px] font-medium text-muted-foreground bg-card hover:bg-muted/40 transition-all font-body flex items-center gap-1.5"
          >
            <Eye className="h-3.5 w-3.5" />
            View
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

function InviteCard({ invite, index }: { invite: InviteItem; index: number }) {
  const catIcon = CATEGORY_ICONS[invite.category];
  const [expanded, setExpanded] = useState(false);
  const isLong = invite.message.length > 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      className="rounded-2xl border border-border/40 bg-card overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
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
                onClick={() => setExpanded(!expanded)}
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

      {/* Actions */}
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
        <div className="px-4 pb-4 pt-1 flex gap-2.5">
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold text-primary-foreground font-body transition-all"
            style={{
              background: "var(--gradient-warm)",
              boxShadow: "var(--shadow-warm)",
            }}
          >
            Accept
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            className="flex-1 py-2.5 rounded-xl border border-border/50 text-[13px] font-medium text-muted-foreground bg-card hover:bg-muted/40 transition-all font-body"
          >
            Decline
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────── */

export default function Interests() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("vibes");

  const newInvites = MOCK_INVITES.filter((i) => !i.accepted);
  const acceptedInvites = MOCK_INVITES.filter((i) => i.accepted);

  const vibeCount = MOCK_VIBES.length;
  const inviteCount = newInvites.length;

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
                <VibeCard key={vibe.id} vibe={vibe} index={i} />
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
                      <InviteCard key={invite.id} invite={invite} index={i} />
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
                      <InviteCard key={invite.id} invite={invite} index={i + newInvites.length} />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>

      {/* Bottom Navigation */}
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
          <NavItem icon={<MessageCircle className="h-5 w-5" />} label="Chat" />
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
