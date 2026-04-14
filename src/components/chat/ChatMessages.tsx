import { motion } from "framer-motion";
import { ChatMessage } from "@/lib/chatStore";

interface ChatMessagesProps {
  messages: ChatMessage[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <>
      {/* Date separator */}
      <div className="flex items-center justify-center py-2">
        <span className="px-3 py-1 rounded-full bg-muted/60 text-[11px] font-medium text-muted-foreground">
          Today
        </span>
      </div>

      {messages.map((msg, index) => {
        const isMe = msg.sender === "me";
        const isLast =
          index === messages.length - 1 ||
          messages[index + 1]?.sender !== msg.sender;
        const isFirst =
          index === 0 || messages[index - 1]?.sender !== msg.sender;

        return (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`flex ${isMe ? "justify-end" : "justify-start"} ${
              isFirst && index > 0 ? "mt-3" : "mt-0.5"
            }`}
          >
            <div className="flex flex-col">
              <div
                className={`max-w-[78%] font-body text-[14px] leading-relaxed overflow-hidden ${
                  isMe
                    ? `text-primary-foreground ${
                        isLast ? "rounded-2xl rounded-br-md" : "rounded-2xl"
                      }`
                    : `bg-card text-foreground border border-border/20 shadow-sm ${
                        isLast ? "rounded-2xl rounded-bl-md" : "rounded-2xl"
                      }`
                }`}
                style={
                  isMe
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
                  <div className="px-3.5 py-2.5">{msg.text}</div>
                )}
                {!msg.text && msg.image && (
                  <div className="px-3.5 py-1.5 text-[12px] opacity-70">
                    📷 Photo
                  </div>
                )}
              </div>
              {/* Timestamp on last bubble in group */}
              {isLast && (
                <span
                  className={`text-[10px] text-muted-foreground/60 mt-1 ${
                    isMe ? "text-right mr-1" : "ml-1"
                  }`}
                >
                  {msg.time}
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </>
  );
}
