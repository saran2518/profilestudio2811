import { motion } from "framer-motion";
import { Check, CheckCheck } from "lucide-react";
import { ChatMessage } from "@/lib/chatStore";

interface MessageBubbleProps {
  msg: ChatMessage;
  isLast: boolean;
  showAvatar?: boolean;
  partnerPhoto?: string;
}

export default function MessageBubble({ msg, isLast, showAvatar, partnerPhoto }: MessageBubbleProps) {
  const isMe = msg.sender === "me";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 350 }}
      className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}
    >
      {/* Partner avatar for grouped messages */}
      {!isMe && (
        <div className="w-7 shrink-0">
          {showAvatar && partnerPhoto ? (
            <img
              src={partnerPhoto}
              alt=""
              className="h-7 w-7 rounded-full object-cover"
            />
          ) : null}
        </div>
      )}

      <div className={`max-w-[75%] ${isMe ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`rounded-2xl font-body text-[14px] leading-relaxed overflow-hidden transition-shadow ${
            isMe
              ? "rounded-br-sm text-primary-foreground shadow-md"
              : "rounded-bl-sm bg-card text-foreground border border-border/30 shadow-sm"
          }`}
          style={
            isMe
              ? {
                  background: "var(--gradient-warm)",
                  boxShadow: "0 4px 16px -4px hsl(12 76% 61% / 0.25)",
                }
              : undefined
          }
        >
          {msg.image && (
            <motion.img
              layoutId={`img-${msg.id}`}
              src={msg.image}
              alt="Shared"
              className="w-full max-h-[220px] object-cover"
            />
          )}
          {msg.text && (
            <div className="px-3.5 py-2.5">{msg.text}</div>
          )}
          {!msg.text && msg.image && (
            <div className="px-3.5 py-1.5 text-[11px] opacity-70">📷 Photo</div>
          )}
        </div>

        {/* Timestamp + read receipt */}
        <div className={`flex items-center gap-1 mt-1 px-1 ${isMe ? "flex-row-reverse" : ""}`}>
          <span className="text-[10px] text-muted-foreground/60 font-medium">{msg.time}</span>
          {isMe && (
            <span className="text-primary/60">
              {isLast ? (
                <CheckCheck className="h-3 w-3" />
              ) : (
                <Check className="h-3 w-3" />
              )}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
