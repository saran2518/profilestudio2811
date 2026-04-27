import { motion } from "framer-motion";
import { Check, Loader2, AlertCircle, RotateCw } from "lucide-react";
import { ChatMessage } from "@/lib/chatStore";

interface MessageBubbleProps {
  msg: ChatMessage;
  isLast: boolean;
  showAvatar?: boolean;
  partnerPhoto?: string;
  onRetry?: (msg: ChatMessage) => void;
}

export default function MessageBubble({ msg, isLast, showAvatar, partnerPhoto, onRetry }: MessageBubbleProps) {
  const isMe = msg.sender === "me";
  const status = msg.status;
  const failed = status === "failed";

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
          className={`rounded-2xl font-body text-[14px] leading-relaxed overflow-hidden transition-all ${
            isMe
              ? "rounded-br-sm text-primary-foreground shadow-md"
              : "rounded-bl-sm bg-card text-foreground border border-border/30 shadow-sm"
          } ${status === "sending" ? "opacity-70" : ""} ${failed ? "ring-1 ring-destructive/40" : ""}`}
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

        {/* Timestamp + status */}
        <div className={`flex items-center gap-1 mt-1 px-1 ${isMe ? "flex-row-reverse" : ""}`}>
          <span className="text-[10px] text-muted-foreground/60 font-medium">{msg.time}</span>
          {isMe && status && (
            <span className="flex items-center" aria-label={`Message ${status}`}>
              {status === "sending" && (
                <Loader2 className="h-3 w-3 text-muted-foreground/50 animate-spin" />
              )}
              {status === "sent" && <Check className="h-3 w-3 text-muted-foreground/60" />}
              {status === "failed" && (
                <AlertCircle className="h-3 w-3 text-destructive" />
              )}
            </span>
          )}
          {isMe && failed && onRetry && (
            <button
              onClick={() => onRetry(msg)}
              className="flex items-center gap-1 text-[10px] font-medium text-destructive hover:text-destructive/80"
            >
              <RotateCw className="h-2.5 w-2.5" />
              Retry
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
