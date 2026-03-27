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
  categoryColor: string;
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

const CATEGORY_MAP: Record<string, { icon: React.ReactNode; color: string }> = {
  dinner: {
    icon: <UtensilsCrossed className="h-3.5 w-3.5" />,
    color: "hsl(33, 90%, 55%)",
  },
  travel: {
    icon: <Footprints className="h-3.5 w-3.5" />,
    color: "hsl(145, 55%, 48%)",
  },
  movie: {
    icon: <Film className="h-3.5 w-3.5" />,
    color: "hsl(220, 70%, 55%)",
  },
  "virtual date": {
    icon: <Monitor className="h-3.5 w-3.5" />,
    color: "hsl(280, 55%, 55%)",
  },
  coffee: {
    icon: <Coffee className="h-3.5 w-3.5" />,
    color: "hsl(25, 65%, 50%)",
  },
};

const MOCK_INVITES: InviteItem[] = [
  {
    id: "i1",
    name: "David",
    photo: PROFILES[1]?.photos[0] || "",
    time: "12m ago",
    category: "dinner",
    categoryIcon: "🍽️",
    categoryColor: "hsl(33, 90%, 55%)",
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
    categoryColor: "hsl(145, 55%, 48%)",
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
    categoryColor: "hsl(220, 70%, 55%)",
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
    categoryColor: "hsl(280, 55%, 55%)",
    message: "",
    accepted: true,
  },
];

/* ─── Components ─────────────────────────────────────── */

function VibeCard({ vibe }: { vibe: VibeItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/50 bg-card overflow-hidden"
      style={{
        boxShadow: vibe.isMutual
          ? "inset 3px 0 0 hsl(145, 55%, 48%), 0 2px 12px -4px hsl(var(--foreground) / 0.06)"
          : "0 2px 12px -4px hsl(var(--foreground) / 0.06)",
      }}
    >
      <div className="p-4 pb-3 flex items-center gap-3">
        <img
          src={vibe.photo}
          alt={vibe.name}
          className="h-10 w-10 rounded-full object-cover border-2 border-border/30"
        />
        <div>
          <p className="font-display text-sm font-bold text-card-foreground">
            {vibe.name}
          </p>
          <p className="font-body text-[11px] text-muted-foreground">
            {vibe.time}
          </p>
        </div>
      </div>

      <div className="px-4 pb-3">
        <p className="font-body text-sm text-foreground/80">
          {vibe.name} vibed on your {vibe.section} {vibe.sectionEmoji}
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
          <div className="rounded-xl border border-border/40 bg-muted/30 p-3">
            <p className="font-body text-sm text-foreground/70 italic leading-relaxed">
              {vibe.previewText}
            </p>
          </div>
        </div>
      )}

      {vibe.isMutual ? (
        <div className="px-4 pb-4">
          <p className="font-body text-sm font-semibold" style={{ color: "hsl(145, 55%, 48%)" }}>
            Mutual Vibe — Chat Created 💬
          </p>
        </div>
      ) : (
        <div className="px-4 pb-4 flex gap-3">
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground font-body"
            style={{
              background: "var(--gradient-warm)",
              boxShadow: "var(--shadow-warm)",
            }}
          >
            Vibe Back
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="px-5 py-2.5 rounded-xl border border-border/60 text-sm font-medium text-foreground/70 bg-card hover:bg-muted/50 transition-colors font-body"
          >
            View Content
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

function InviteCard({ invite }: { invite: InviteItem }) {
  const cat = CATEGORY_MAP[invite.category];
  const [expanded, setExpanded] = useState(false);
  const isLong = invite.message.length > 120;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/50 bg-card overflow-hidden"
      style={{ boxShadow: "0 2px 12px -4px hsl(var(--foreground) / 0.06)" }}
    >
      {/* Category header */}
      <div
        className="px-4 py-2 flex items-center gap-2"
        style={{ background: cat?.color || "hsl(var(--primary))" }}
      >
        <span className="text-white">{cat?.icon}</span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-white font-body">
          {invite.category} invite
        </span>
      </div>

      <div className="p-4 pb-3 flex items-center gap-3">
        <img
          src={invite.photo}
          alt={invite.name}
          className="h-10 w-10 rounded-full object-cover border-2 border-border/30"
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
        <div className="px-4 pb-4">
          <p className="font-body text-sm font-semibold" style={{ color: "hsl(145, 55%, 48%)" }}>
            Invite Accepted — Chat Created 💬
          </p>
        </div>
      ) : (
        <div className="px-4 pb-4 flex gap-3">
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground font-body"
            style={{
              background: cat?.color || "var(--gradient-warm)",
              boxShadow: `0 4px 14px -4px ${cat?.color || "hsl(var(--primary) / 0.4)"}`,
            }}
          >
            Accept
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="px-5 py-2.5 rounded-xl border border-border/60 text-sm font-medium text-foreground/70 bg-card hover:bg-muted/50 transition-colors font-body"
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
              className="font-display text-base font-semibold bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground pb-2 px-0 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground"
            >
              Vibes
            </TabsTrigger>
            <TabsTrigger
              value="invites"
              className="font-display text-base font-semibold bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground pb-2 px-0 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground"
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
