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

function VibeCard({ vibe }: { vibe: VibeItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/50 bg-card overflow-hidden relative"
      style={{
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Warm left accent for mutual vibes */}
      {vibe.isMutual && (
        <div
          className="absolute top-0 left-0 w-1 h-full rounded-r-full"
          style={{ background: "var(--gradient-warm)" }}
        />
      )}

      <div className="p-4 pb-3 flex items-center gap-3">
        <img
          src={vibe.photo}
          alt={vibe.name}
          className="h-10 w-10 rounded-full object-cover border-2 border-primary/20"
        />
        <div className="flex-1">
          <p className="font-display text-sm font-bold text-card-foreground">
            {vibe.name}
          </p>
          <p className="font-body text-[11px] text-muted-foreground">
            {vibe.time}
          </p>
        </div>
        <HeartPulse className="h-4 w-4 text-primary/60" />
      </div>

      <div className="px-4 pb-3">
        <p className="font-body text-sm text-foreground/80">
          {vibe.name} vibed on your{" "}
          <span className="font-semibold text-foreground">{vibe.section}</span>{" "}
          {vibe.sectionEmoji}
        </p>
      </div>

      {vibe.previewImage && (
        <div className="px-4 pb-3">
          <img
            src={vibe.previewImage}
            alt="content"
            className="w-full h-44 object-cover rounded-xl"
          />
        </div>
      )}

      {vibe.previewText && (
        <div className="px-4 pb-3">
          <div className="rounded-xl border border-border/40 bg-muted/30 p-3 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-0.5 h-full"
              style={{ background: "var(--gradient-warm)" }}
            />
            <p className="font-body text-sm text-foreground/70 italic leading-relaxed pl-2">
              {vibe.previewText}
            </p>
          </div>
        </div>
      )}

      {vibe.isMutual ? (
        <div className="px-4 pb-4 flex items-center gap-2">
          <div
            className="h-6 w-6 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.2))" }}
          >
            <Sparkles className="h-3 w-3 text-primary" />
          </div>
          <p className="font-body text-sm font-semibold text-primary">
            Mutual Vibe — Chat Created 💬
          </p>
        </div>
      ) : (
        <div className="px-4 pb-4 flex gap-3">
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-primary-foreground font-body flex items-center gap-2"
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
            className="px-5 py-2.5 rounded-2xl border border-border/50 text-sm font-medium text-muted-foreground bg-muted/30 hover:bg-muted/50 transition-colors font-body"
          >
            View Content
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

function InviteCard({ invite }: { invite: InviteItem }) {
  const catIcon = CATEGORY_ICONS[invite.category];
  const [expanded, setExpanded] = useState(false);
  const isLong = invite.message.length > 120;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/50 bg-card overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Category header — uses warm gradient */}
      <div
        className="px-4 py-2 flex items-center gap-2"
        style={{ background: "var(--gradient-warm)" }}
      >
        <span className="text-primary-foreground">{catIcon}</span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-primary-foreground font-body">
          {invite.category} invite
        </span>
      </div>

      <div className="p-4 pb-3 flex items-center gap-3">
        <img
          src={invite.photo}
          alt={invite.name}
          className="h-10 w-10 rounded-full object-cover border-2 border-primary/20"
        />
        <div>
          <p className="font-display text-sm font-bold text-card-foreground">
            {invite.name}
          </p>
          <p className="font-body text-[11px] text-muted-foreground">
            {invite.time}
          </p>
        </div>
      </div>

      {invite.message && (
        <div className="px-4 pb-3">
          <p className="font-body text-sm text-foreground/80 leading-relaxed">
            {isLong && !expanded
              ? invite.message.slice(0, 120) + "..."
              : invite.message}
          </p>
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1"
            >
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>
      )}

      {invite.accepted ? (
        <div className="px-4 pb-4 flex items-center gap-2">
          <div
            className="h-6 w-6 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.2))" }}
          >
            <Sparkles className="h-3 w-3 text-primary" />
          </div>
          <p className="font-body text-sm font-semibold text-primary">
            Invite Accepted — Chat Created 💬
          </p>
        </div>
      ) : (
        <div className="px-4 pb-4 flex gap-3">
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-primary-foreground font-body"
            style={{
              background: "var(--gradient-warm)",
              boxShadow: "var(--shadow-warm)",
            }}
          >
            Accept
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="px-5 py-2.5 rounded-2xl border border-border/50 text-sm font-medium text-muted-foreground bg-muted/30 hover:bg-muted/50 transition-colors font-body"
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

  const newInvites = MOCK_INVITES.filter((i) => !i.accepted);
  const acceptedInvites = MOCK_INVITES.filter((i) => i.accepted);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="pt-10 pb-2 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Interests
        </h1>
      </header>

      {/* Tabs */}
      <Tabs defaultValue="vibes" className="flex-1 flex flex-col">
        <div className="flex justify-center px-4 pb-2">
          <TabsList className="bg-transparent gap-6 h-auto p-0">
            <TabsTrigger
              value="vibes"
              className="font-display text-base font-semibold bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground pb-2 px-0 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Vibes
            </TabsTrigger>
            <TabsTrigger
              value="invites"
              className="font-display text-base font-semibold bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground pb-2 px-0 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Invites
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Vibes */}
        <TabsContent value="vibes" className="flex-1 overflow-y-auto px-4 pb-24 mt-4">
          <div className="space-y-4">
            {MOCK_VIBES.map((vibe) => (
              <VibeCard key={vibe.id} vibe={vibe} />
            ))}
          </div>
        </TabsContent>

        {/* Invites */}
        <TabsContent value="invites" className="flex-1 overflow-y-auto px-4 pb-24 mt-4">
          {newInvites.length > 0 && (
            <>
              <p className="font-body text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                New Invites
              </p>
              <div className="space-y-4 mb-6">
                {newInvites.map((invite) => (
                  <InviteCard key={invite.id} invite={invite} />
                ))}
              </div>
            </>
          )}

          {acceptedInvites.length > 0 && (
            <>
              <p className="font-body text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Accepted Invites
              </p>
              <div className="space-y-4">
                {acceptedInvites.map((invite) => (
                  <InviteCard key={invite.id} invite={invite} />
                ))}
              </div>
            </>
          )}
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
