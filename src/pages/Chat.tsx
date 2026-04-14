import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Heart,
  HeartPulse,
  MessageCircle,
  Users,
  Sparkles,
  Coffee,
  Search,
} from "lucide-react";
import { useChatThreads } from "@/hooks/useChatStore";
import { ChatThread } from "@/lib/chatStore";
import ChatDetail from "@/components/chat/ChatDetail";

/* ─── Chat List ──────────────────────────────────────── */

function ChatList({
  threads,
  onOpenThread,
}: {
  threads: ChatThread[];
  onOpenThread: (id: string) => void;
}) {
  return (
    <div className="space-y-0.5 px-4">
      {threads.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div
            className="h-16 w-16 rounded-full flex items-center justify-center mb-4"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))" }}
          >
            <MessageCircle className="h-7 w-7 text-primary/50" />
          </div>
          <p className="font-display text-base font-semibold text-foreground/70">
            No conversations yet
          </p>
          <p className="font-body text-[13px] text-muted-foreground mt-1 max-w-[240px]">
            Vibe back or accept invites to spark your first conversation ✨
          </p>
        </motion.div>
      )}
      {threads.map((thread, i) => (
        <motion.button
          key={thread.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.3 }}
          onClick={() => onOpenThread(thread.id)}
          className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-muted/50 active:scale-[0.98] transition-all duration-200 group"
        >
          <div className="relative shrink-0">
            <img
              src={thread.photo}
              alt={thread.name}
              className={`h-13 w-13 rounded-full object-cover border-2 ${
                thread.unread ? "border-primary/40" : "border-border/20"
              }`}
              style={{ width: 52, height: 52 }}
            />
            {/* Online indicator */}
            <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-400" />
            {thread.unread && (
              <div
                className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background"
                style={{ background: "var(--gradient-warm)" }}
              />
            )}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <p className={`font-display text-[15px] truncate ${
                  thread.unread ? "font-bold text-foreground" : "font-semibold text-foreground/90"
                }`}>
                  {thread.name}
                </p>
                <span
                  className="shrink-0 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider text-primary-foreground"
                  style={{ background: "var(--gradient-warm)" }}
                >
                  {thread.source === "vibe" ? (
                    <HeartPulse className="h-2 w-2" />
                  ) : (
                    <Coffee className="h-2 w-2" />
                  )}
                  {thread.source}
                </span>
              </div>
              <span className="font-body text-[11px] text-muted-foreground shrink-0 ml-2">
                {thread.time}
              </span>
            </div>
            <p className={`font-body text-[13px] truncate mt-0.5 ${
              thread.unread ? "text-foreground/80 font-medium" : "text-muted-foreground"
            }`}>
              {thread.lastMessage}
            </p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

/* ─── Main Chat Page ─────────────────────────────────── */

export default function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  const threads = useChatThreads();
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const activeThread = threads.find((t) => t.id === activeThreadId);

  useEffect(() => {
    const openId = (location.state as any)?.openThreadId;
    if (openId) {
      setActiveThreadId(openId);
      navigate("/chat", { replace: true, state: {} });
    }
  }, [location.state]);

  const connections = threads.filter(
    (t) => !t.messages.some((m) => m.sender === "me")
  );
  const conversations = threads.filter(
    (t) => t.messages.some((m) => m.sender === "me")
  );

  const filteredConversations = searchQuery.trim()
    ? conversations.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        {activeThread ? (
          <motion.div
            key="detail"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <ChatDetail
              thread={activeThread}
              onBack={() => setActiveThreadId(null)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <header className="pt-12 pb-2 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-display text-2xl font-bold text-foreground">
                    Chat
                  </h1>
                  <p className="font-body text-[13px] text-muted-foreground mt-0.5">
                    {threads.length} {threads.length === 1 ? "connection" : "connections"}
                  </p>
                </div>
              </div>

              {/* Search bar */}
              {conversations.length > 0 && (
                <div className="mt-3 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border/20 font-body text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/20 transition-all"
                  />
                </div>
              )}
            </header>

            <div className="flex-1 overflow-y-auto pb-24">
              {/* Connections Row */}
              {connections.length > 0 && (
                <div className="px-5 pb-3 pt-2">
                  <h2 className="font-display text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 mb-3">
                    New Connections
                  </h2>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {connections.map((thread, i) => (
                      <motion.button
                        key={thread.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        onClick={() => setActiveThreadId(thread.id)}
                        className="flex flex-col items-center gap-1.5 shrink-0 group"
                      >
                        <div
                          className="relative rounded-full p-[2px] group-active:scale-95 transition-transform"
                          style={{ background: "var(--gradient-warm)" }}
                        >
                          <img
                            src={thread.photo}
                            alt={thread.name}
                            className="h-14 w-14 rounded-full object-cover border-2 border-background"
                          />
                          <div
                            className="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full border-2 border-background flex items-center justify-center"
                            style={{ background: "var(--gradient-warm)" }}
                          >
                            {thread.source === "vibe" ? (
                              <HeartPulse className="h-2.5 w-2.5 text-primary-foreground" />
                            ) : (
                              <Coffee className="h-2.5 w-2.5 text-primary-foreground" />
                            )}
                          </div>
                        </div>
                        <span className="font-body text-[11px] text-muted-foreground max-w-[56px] truncate group-hover:text-foreground transition-colors">
                          {thread.name.split(" ")[0]}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                  <div className="h-px bg-border/20 mt-2" />
                </div>
              )}

              {/* Conversations Section */}
              {filteredConversations.length > 0 && (
                <div className="px-5 pt-1 pb-1">
                  <h2 className="font-display text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 mb-1">
                    Messages
                  </h2>
                </div>
              )}
              <ChatList
                threads={filteredConversations}
                onOpenThread={(id) => setActiveThreadId(id)}
              />

              {searchQuery && filteredConversations.length === 0 && (
                <div className="flex flex-col items-center py-16 text-center px-8">
                  <Search className="h-8 w-8 text-muted-foreground/30 mb-3" />
                  <p className="font-body text-sm text-muted-foreground">
                    No results for "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      {!activeThread && (
        <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/30 z-30">
          <div className="flex items-center justify-around py-3 px-2">
            <NavItem icon={<Users className="h-5 w-5" />} label="Profile" onClick={() => navigate("/profile")} />
            <NavItem icon={<Sparkles className="h-5 w-5" />} label="Moments" onClick={() => navigate("/moments")} />
            <NavItem
              icon={<InfinityIcon />}
              label="Discover"
              onClick={() => navigate("/discover")}
            />
            <NavItem
              icon={<Heart className="h-5 w-5" />}
              label="Interests"
              onClick={() => navigate("/interests")}
            />
            <NavItem icon={<MessageCircle className="h-5 w-5" />} label="Chat" active />
          </div>
        </nav>
      )}
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
