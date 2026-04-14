import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, HeartPulse, Coffee, Send, Paperclip, X, MoreHorizontal, ShieldBan, Flag, Video } from "lucide-react";
import { useChatThread } from "@/hooks/useChatStore";
import { addMessage, removeThread, ChatThread } from "@/lib/chatStore";
import EmojiPicker from "./EmojiPicker";
import { toast } from "sonner";
import ReportDialog from "@/components/discover/ReportDialog";
import BlockDialog from "@/components/discover/BlockDialog";
import VirtualDateInvite from "./VirtualDateInvite";
import VirtualDateRoom from "./VirtualDateRoom";

export default function ChatDetail({
  thread,
  onBack,
}: {
  thread: ChatThread;
  onBack: () => void;
}) {
  const [input, setInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [dateInviteOpen, setDateInviteOpen] = useState(false);
  const [dateRoomOpen, setDateRoomOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fresh = useChatThread(thread.id);
  const messages = fresh?.messages || thread.messages;

  const handleSend = () => {
    if (!input.trim() && !imagePreview) return;
    addMessage(thread.id, input.trim(), "me", imagePreview || undefined);
    setInput("");
    setImagePreview(null);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleEmojiSelect = (emoji: string) => {
    setInput((prev) => prev + emoji);
  };

  const handleMenuAction = (action: "disconnect" | "block" | "report") => {
    setMenuOpen(false);
    switch (action) {
      case "disconnect":
        removeThread(thread.id);
        toast.success(`Connection with ${thread.name} has been closed.`);
        onBack();
        break;
      case "block":
        setBlockOpen(true);
        break;
      case "report":
        setReportOpen(true);
        break;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-3 border-b border-border/30">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-xl hover:bg-muted/40 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <img
          src={thread.photo}
          alt={thread.name}
          className="h-9 w-9 rounded-full object-cover ring-2 ring-primary/10 ring-offset-1 ring-offset-background"
        />
        <p className="font-display text-base font-bold text-foreground">
          {thread.name}
        </p>
        <span
          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-primary-foreground"
          style={{ background: "var(--gradient-warm)" }}
        >
          {thread.source === "vibe" ? (
            <HeartPulse className="h-2.5 w-2.5" />
          ) : (
            <Coffee className="h-2.5 w-2.5" />
          )}
          {thread.source}
        </span>

        {/* Virtual date button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setDateInviteOpen(true)}
          className="ml-auto p-2 rounded-xl hover:bg-muted/40 transition-colors"
        >
          <Video className="h-5 w-5 text-primary" />
        </motion.button>

        {/* 3-dot menu */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 rounded-xl hover:bg-muted/40 transition-colors"
          >
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
          </motion.button>

          <AnimatePresence>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1 z-50 w-48 rounded-xl border border-border bg-card shadow-xl overflow-hidden"
                >
                  <button
                    onClick={() => handleMenuAction("disconnect")}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                    Close connection
                  </button>
                  <button
                    onClick={() => handleMenuAction("block")}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                  >
                    <ShieldBan className="h-4 w-4" />
                    Block
                  </button>
                  <button
                    onClick={() => handleMenuAction("report")}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors"
                  >
                    <Flag className="h-4 w-4" />
                    Report
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl font-body text-[14px] leading-relaxed overflow-hidden ${
                msg.sender === "me"
                  ? "text-primary-foreground rounded-br-md"
                  : "bg-muted/50 text-foreground border border-border/30 rounded-bl-md"
              }`}
              style={
                msg.sender === "me"
                  ? {
                      background: "var(--gradient-warm)",
                      boxShadow: "var(--shadow-warm)",
                    }
                  : undefined
              }
            >
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Shared"
                  className="w-full max-h-[200px] object-cover"
                />
              )}
              {msg.text && (
                <div className="px-4 py-2.5">{msg.text}</div>
              )}
              {!msg.text && msg.image && (
                <div className="px-4 py-1.5 text-[12px] opacity-70">📷 Photo</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Image preview */}
      {imagePreview && (
        <div className="px-4 py-2 border-t border-border/20">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-16 w-16 rounded-xl object-cover border border-border/30"
            />
            <button
              onClick={() => setImagePreview(null)}
              className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-24 pt-2 border-t border-border/30">
        <div className="flex items-center gap-1.5">
          <EmojiPicker onSelect={handleEmojiSelect} />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-xl hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-2xl bg-muted/40 border border-border/30 font-body text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleSend}
            className="h-11 w-11 rounded-2xl flex items-center justify-center text-primary-foreground shrink-0"
            style={{
              background: "var(--gradient-warm)",
              boxShadow: "var(--shadow-warm)",
            }}
          >
            <Send className="h-4.5 w-4.5" />
          </motion.button>
        </div>
      </div>

      <ReportDialog open={reportOpen} onClose={() => setReportOpen(false)} profileName={thread.name} />
      <BlockDialog open={blockOpen} onClose={() => setBlockOpen(false)} profileName={thread.name} />

      <VirtualDateInvite
        open={dateInviteOpen}
        partnerName={thread.name}
        onCancel={() => setDateInviteOpen(false)}
        onConfirm={() => {
          setDateInviteOpen(false);
          setDateRoomOpen(true);
          addMessage(thread.id, "📹 Started a Virtual Date", "me");
        }}
      />

      <AnimatePresence>
        {dateRoomOpen && (
          <VirtualDateRoom
            partnerName={thread.name}
            partnerPhoto={thread.photo}
            onEnd={() => {
              setDateRoomOpen(false);
              addMessage(thread.id, "Virtual date ended. Hope you had fun! 💫", "me");
              toast.success("Virtual date ended");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
