import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useChatThread } from "@/hooks/useChatStore";
import { addMessage, removeThread, updateMessageInviteStatus, addVirtualDateInvite, ChatThread } from "@/lib/chatStore";
import { toast } from "sonner";
import ReportDialog from "@/components/discover/ReportDialog";
import BlockDialog from "@/components/discover/BlockDialog";
import VirtualDateInvite from "./VirtualDateInvite";
import VirtualDateRoom from "./VirtualDateRoom";
import VirtualDateInviteBubble from "./VirtualDateInviteBubble";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

export default function ChatDetail({
  thread,
  onBack,
}: {
  thread: ChatThread;
  onBack: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [dateInviteOpen, setDateInviteOpen] = useState(false);
  const [dateRoomOpen, setDateRoomOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fresh = useChatThread(thread.id);
  const messages = fresh?.messages || thread.messages;

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

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

  const handleSend = (text: string, image?: string) => {
    addMessage(thread.id, text, "me", image);
  };

  const handleVirtualDateConfirm = () => {
    setDateInviteOpen(false);
    // Add a special invite message from "me"
    const inviteId = `vd-invite-${Date.now()}`;
    addMessage(thread.id, "📹 Virtual Date Invite", "me");
    // Replace the last message with the invite type
    const updatedThread = fresh || thread;
    const lastMsg = updatedThread.messages[updatedThread.messages.length - 1];
    if (lastMsg) {
      lastMsg.type = "virtual-date-invite";
      lastMsg.dateInviteStatus = "pending";
    }

    // Simulate partner receiving and sending back an invite bubble after delay
    setTimeout(() => {
      addMessage(thread.id, "📹 Virtual Date Invite", "them");
      // Mark the partner's message as invite type
      const currentThread = fresh || thread;
      const msgs = currentThread.messages;
      const partnerMsg = msgs[msgs.length - 1];
      if (partnerMsg) {
        partnerMsg.type = "virtual-date-invite";
        partnerMsg.dateInviteStatus = "pending";
      }
      toast(`${thread.name} received your Virtual Date invite! 🎥`, {
        duration: 3000,
      });
    }, 1500);
  };

  const handleInviteJoin = (msgId: string) => {
    updateMessageInviteStatus(thread.id, msgId, "accepted");
    setDateRoomOpen(true);
  };

  const handleInviteDecline = (msgId: string) => {
    updateMessageInviteStatus(thread.id, msgId, "declined");
    addMessage(thread.id, "Maybe next time! 😊", "them");
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader
        thread={thread}
        onBack={onBack}
        onDateRoom={() => setDateInviteOpen(true)}
        onMenuAction={handleMenuAction}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Messages area with subtle pattern */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-2.5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.02) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, hsl(var(--accent) / 0.02) 0%, transparent 50%)`,
        }}
      >
        {/* Date separator */}
        <div className="flex items-center justify-center py-2">
          <span className="px-3 py-1 rounded-full bg-muted/50 text-[10px] font-medium text-muted-foreground/70 backdrop-blur-sm">
            Today
          </span>
        </div>

        {messages.map((msg, i) => {
          const prevMsg = messages[i - 1];
          const showAvatar = !prevMsg || prevMsg.sender !== msg.sender;

          // Render special Virtual Date invite bubble
          if (msg.type === "virtual-date-invite") {
            return (
              <VirtualDateInviteBubble
                key={msg.id}
                msg={msg}
                isMe={msg.sender === "me"}
                partnerName={thread.name}
                showAvatar={showAvatar}
                partnerPhoto={thread.photo}
                onJoin={() => handleInviteJoin(msg.id)}
                onDecline={() => handleInviteDecline(msg.id)}
              />
            );
          }

          return (
            <MessageBubble
              key={msg.id}
              msg={msg}
              isLast={i === messages.length - 1}
              showAvatar={showAvatar}
              partnerPhoto={thread.photo}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border/20 bg-card/50 backdrop-blur-sm">
        <ChatInput onSend={handleSend} />
      </div>

      <ReportDialog open={reportOpen} onClose={() => setReportOpen(false)} profileName={thread.name} />
      <BlockDialog open={blockOpen} onClose={() => setBlockOpen(false)} profileName={thread.name} />

      <VirtualDateInvite
        open={dateInviteOpen}
        partnerName={thread.name}
        onCancel={() => setDateInviteOpen(false)}
        onConfirm={handleVirtualDateConfirm}
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
