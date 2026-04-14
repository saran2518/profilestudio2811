import { motion } from "framer-motion";
import { Send, Paperclip, X } from "lucide-react";
import EmojiPicker from "./EmojiPicker";

interface ChatInputBarProps {
  input: string;
  setInput: (v: string) => void;
  imagePreview: string | null;
  setImagePreview: (v: string | null) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onSend: () => void;
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmojiSelect: (emoji: string) => void;
}

export default function ChatInputBar({
  input,
  setInput,
  imagePreview,
  setImagePreview,
  fileInputRef,
  onSend,
  onImageSelect,
  onEmojiSelect,
}: ChatInputBarProps) {
  return (
    <div className="bg-card/80 backdrop-blur-xl border-t border-border/20">
      {/* Image preview */}
      {imagePreview && (
        <div className="px-4 pt-3 pb-1">
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

      <div className="px-3 pb-8 pt-2">
        <div className="flex items-end gap-1.5">
          <div className="flex items-center">
            <EmojiPicker onSelect={onEmojiSelect} />
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
              onChange={onImageSelect}
            />
          </div>

          <div className="flex-1 relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              placeholder="Type a message..."
              className="w-full px-4 py-3 rounded-2xl bg-muted/40 border border-border/20 font-body text-[14px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={onSend}
            className="h-11 w-11 rounded-2xl flex items-center justify-center text-primary-foreground shrink-0"
            style={{
              background: "var(--gradient-warm)",
              boxShadow: "var(--shadow-warm)",
            }}
          >
            <Send className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
