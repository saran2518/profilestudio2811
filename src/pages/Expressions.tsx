import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  Sparkles,
  Plus,
  Heart,
  HeartPulse,
  MessageCircle,
  Users,
  X,
  Send,
  Image as ImageIcon,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MOMENTS, MOOD_TAGS, type MomentData } from "@/lib/expressionsData";
import InviteDialog from "@/components/discover/InviteDialog";
import VibeDialog from "@/components/discover/VibeDialog";

const Expressions = () => {
  const navigate = useNavigate();
  const [moments, setMoments] = useState<MomentData[]>(MOMENTS);
  const [showCompose, setShowCompose] = useState(false);
  const [composeDraft, setComposeDraft] = useState("");
  const [composeMood, setComposeMood] = useState<string | null>(null);
  const [vibed, setVibed] = useState<Set<string>>(new Set());

  // Vibe dialog state
  const [vibeDialogOpen, setVibeDialogOpen] = useState(false);
  const [vibeTarget, setVibeTarget] = useState<MomentData | null>(null);

  // Invite state
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteTarget, setInviteTarget] = useState<MomentData | null>(null);

  const handleVibeClick = (moment: MomentData) => {
    setVibeTarget(moment);
    setVibeDialogOpen(true);
  };

  const handleSendVibe = () => {
    if (vibeTarget) {
      setVibed((prev) => {
        const next = new Set(prev);
        next.add(vibeTarget.id);
        return next;
      });
    }
    setVibeDialogOpen(false);
    setVibeTarget(null);
  };

  const handleVibeCancel = () => {
    setVibeDialogOpen(false);
    setVibeTarget(null);
  };

  const handleVibeToInvite = () => {
    setVibeDialogOpen(false);
    if (vibeTarget) {
      setInviteTarget(vibeTarget);
      setInviteOpen(true);
    }
    setVibeTarget(null);
  };

  const handleInvite = (moment: MomentData) => {
    setInviteTarget(moment);
    setInviteOpen(true);
  };

  const handleShareMoment = () => {
    if (!composeDraft.trim() || !composeMood) return;
    const newMoment: MomentData = {
      id: `m-${Date.now()}`,
      name: "You",
      age: 25,
      profession: "Explorer",
      location: "Here",
      avatar: "",
      text: composeDraft.trim(),
      moodTag: composeMood,
      timestamp: "Just now",
    };
    setMoments([newMoment, ...moments]);
    setComposeDraft("");
    setComposeMood(null);
    setShowCompose(false);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="flex items-center justify-between px-5 py-4">
          <button className="h-9 w-9 flex items-center justify-center">
            <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
          </button>
          <div className="text-center">
            <h1 className="font-display text-lg font-semibold text-foreground">Expressions</h1>
            <p className="text-xs text-muted-foreground font-body mt-0.5">Moments people choose to share.</p>
          </div>
          <button className="h-9 w-9 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Share a moment CTA */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCompose(true)}
          className="w-full rounded-2xl border-2 border-dashed border-primary/30 bg-card/60 p-4 text-left transition-colors hover:border-primary/50"
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <Plus className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-primary">Share a moment</p>
              <p className="text-xs text-muted-foreground font-body">Something that feels present right now.</p>
            </div>
          </div>
        </motion.button>

        {/* Moments Feed */}
        {moments.map((moment, idx) => (
          <MomentCard
            key={moment.id}
            moment={moment}
            index={idx}
            isVibed={vibed.has(moment.id)}
            onVibe={() => handleVibeClick(moment)}
            onInvite={() => handleInvite(moment)}
          />
        ))}
      </div>

      {/* Compose Sheet */}
      <ComposeSheet
        open={showCompose}
        onClose={() => { setShowCompose(false); setComposeDraft(""); setComposeMood(null); }}
        draft={composeDraft}
        onDraftChange={setComposeDraft}
        mood={composeMood}
        onMoodChange={setComposeMood}
        onSubmit={handleShareMoment}
      />

      {/* Invite Dialog */}
      <InviteDialog
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onSent={() => setInviteOpen(false)}
        profileName={inviteTarget?.name}
        profilePhoto={inviteTarget?.avatar}
      />

      {/* Vibe Dialog */}
      <VibeDialog
        open={vibeDialogOpen}
        sectionName={vibeTarget?.moodTag || "moment"}
        onSendVibe={handleSendVibe}
        onCancel={handleVibeCancel}
        onSendInvite={handleVibeToInvite}
      />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/30 z-30">
        <div className="flex items-center justify-around py-3 px-2">
          <NavItem icon={<Users className="h-5 w-5" />} label="Profile" />
          <NavItem icon={<Sparkles className="h-5 w-5" />} label="Expressions" active />
          <NavItem icon={<InfinityIcon />} label="Discover" onClick={() => navigate("/discover")} />
          <NavItem icon={<Heart className="h-5 w-5" />} label="Interests" onClick={() => navigate("/interests")} />
          <NavItem icon={<MessageCircle className="h-5 w-5" />} label="Chat" onClick={() => navigate("/chat")} />
        </div>
      </nav>
    </div>
  );
};

/* ── Moment Card ── */
function MomentCard({
  moment,
  index,
  isVibed,
  onVibe,
  onInvite,
}: {
  moment: MomentData;
  index: number;
  isVibed: boolean;
  onVibe: () => void;
  onInvite: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="rounded-2xl border border-border/40 bg-card p-4"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* User info */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10 border border-border/50">
          <AvatarImage src={moment.avatar} alt={moment.name} />
          <AvatarFallback className="bg-muted text-muted-foreground font-display text-sm">
            {moment.name[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-display text-sm font-semibold text-foreground">
            {moment.name}, {moment.age}
          </p>
          <p className="text-xs text-muted-foreground font-body">
            {moment.profession} • {moment.location}
          </p>
        </div>
      </div>

      {/* Moment text */}
      <p className="text-sm text-foreground font-body leading-relaxed mb-3">
        {moment.text}
      </p>

      {/* Optional photo */}
      {moment.photo && (
        <div className="rounded-xl overflow-hidden mb-3">
          <img
            src={moment.photo}
            alt="Moment"
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      {/* Mood tag */}
      <div className="mb-3">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium border border-primary/30 text-primary bg-primary/5 font-body">
          {moment.moodTag}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={onVibe}
          className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isVibed
              ? "text-primary-foreground"
              : "bg-muted/50 text-muted-foreground"
          }`}
          style={isVibed ? { background: "var(--gradient-warm)" } : undefined}
        >
          <motion.div animate={isVibed ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
            <HeartPulse className="h-3.5 w-3.5" strokeWidth={2} />
          </motion.div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={onInvite}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-primary-foreground"
          style={{ background: "var(--gradient-warm)" }}
        >
          <Send className="h-3 w-3" />
          <span className="text-[10px] font-bold uppercase tracking-wider font-body">Invite</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ── Compose Sheet ── */
function ComposeSheet({
  open,
  onClose,
  draft,
  onDraftChange,
  mood,
  onMoodChange,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  draft: string;
  onDraftChange: (v: string) => void;
  mood: string | null;
  onMoodChange: (v: string | null) => void;
  onSubmit: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-card border-t border-border/30 max-h-[80vh] overflow-y-auto"
            style={{ boxShadow: "0 -12px 60px -12px hsl(var(--foreground) / 0.1)" }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            <div className="p-5 pt-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-semibold text-foreground">Share a moment</h3>
                <button onClick={onClose} className="h-8 w-8 rounded-full bg-muted/60 flex items-center justify-center">
                  <X className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </div>

              <Textarea
                value={draft}
                onChange={(e) => onDraftChange(e.target.value)}
                placeholder="What's on your mind right now?"
                className="resize-none rounded-2xl border-border/40 bg-muted/20 min-h-[100px] text-sm font-body focus:border-primary/40"
                maxLength={300}
              />

              <div className="flex items-center justify-between text-xs text-muted-foreground/60 font-body">
                <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <ImageIcon className="h-4 w-4" />
                  Add photo
                </button>
                <span>{draft.length}/300</span>
              </div>

              {/* Mood tags */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 font-body">Pick a mood</p>
                <div className="flex flex-wrap gap-2">
                  {MOOD_TAGS.slice(0, 10).map((tag) => (
                    <motion.button
                      key={tag}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => onMoodChange(mood === tag ? null : tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 font-body ${
                        mood === tag
                          ? "border-primary/50 text-primary bg-primary/10"
                          : "border-border/40 text-muted-foreground bg-muted/20 hover:border-border"
                      }`}
                    >
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={onSubmit}
                disabled={!draft.trim() || !mood}
                className="w-full py-3.5 rounded-2xl text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed font-body"
                style={{
                  background: draft.trim() && mood ? "var(--gradient-warm)" : "hsl(var(--muted))",
                  boxShadow: draft.trim() && mood ? "var(--shadow-warm)" : "none",
                  color: draft.trim() && mood ? undefined : "hsl(var(--muted-foreground))",
                }}
              >
                <Send className="h-4 w-4" />
                Share Moment
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Nav helpers ── */
function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
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

export default Expressions;
