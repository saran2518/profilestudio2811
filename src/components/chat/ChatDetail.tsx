import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, HeartPulse, Coffee, Send, Paperclip, X, MoreHorizontal, ShieldBan, Flag, Video, Plus, ChevronDown } from "lucide-react";
import { useChatThread } from "@/hooks/useChatStore";
import { addMessage, removeThread, ChatThread } from "@/lib/chatStore";
import EmojiPicker from "./EmojiPicker";
import { toast } from "sonner";
import ReportDialog from "@/components/discover/ReportDialog";
import BlockDialog from "@/components/discover/BlockDialog";
import VirtualDateInvite from "./VirtualDateInvite";
import VirtualDateRoom from "./VirtualDateRoom";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInputBar from "./ChatInputBar";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const fresh = useChatThread(thread.id);
  const messages = fresh?.messages || thread.messages;

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "instant",
    });
  };

  useEffect(() => {
    scrollToBottom(false);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const fromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    setShowScrollDown(fromBottom > 100);
  };

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
    <div className="flex flex-col h-full bg-background">
      <ChatHeader
        thread={thread}
        onBack={onBack}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onMenuAction={handleMenuAction}
        onDateInvite={() => setDateInviteOpen(true)}
      />

      {/* Messages */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-2"
        style={{
          background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted) / 0.3) 100%)",
        }}
      >
        <ChatMessages messages={messages} />
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom FAB */}
      <AnimatePresence>
        {showScrollDown && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollToBottom()}
            className="absolute bottom-28 right-4 z-20 h-9 w-9 rounded-full bg-card border border-border/40 shadow-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <ChatInputBar
        input={input}
        setInput={setInput}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        fileInputRef={fileInputRef}
        onSend={handleSend}
        onImageSelect={handleImageSelect}
        onEmojiSelect={handleEmojiSelect}
      />

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
