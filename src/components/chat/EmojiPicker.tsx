import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Smile } from "lucide-react";

const EMOJI_CATEGORIES = [
  {
    label: "Smileys",
    emojis: ["😀","😁","😂","🤣","😊","😇","🥰","😍","😘","😗","😋","😛","😜","🤪","😎","🤩","🥳","😏","😒","😞","😢","😭","😤","🤯","😱","🥺","😴"],
  },
  {
    label: "Hearts",
    emojis: ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","💕","💞","💓","💗","💖","💘","💝","💟","❣️","💔","🩷","🩵"],
  },
  {
    label: "Gestures",
    emojis: ["👋","🤚","✋","🖖","👌","🤌","🤏","✌️","🤞","🫰","🤟","🤘","🤙","👍","👎","✊","👊","🤛","🤜","👏","🙌","🫶","👐","🤲","🙏"],
  },
  {
    label: "Fun",
    emojis: ["🔥","✨","🎉","🎊","💯","⚡","💥","🌟","⭐","🍕","🍔","☕","🍷","🎵","🎶","🎸","🏆","🎯","🚀","💡","🦋","🌈","🌸","🍀"],
  },
];

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

export default function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="p-2 rounded-xl hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
        >
          <Smile className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        className="w-[280px] p-0 rounded-2xl border-border/30 bg-card shadow-lg"
        sideOffset={8}
      >
        {/* Category tabs */}
        <div className="flex gap-1 p-2 border-b border-border/20">
          {EMOJI_CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(i)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                i === activeCategory
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Emoji grid */}
        <div className="p-2 grid grid-cols-8 gap-0.5 max-h-[200px] overflow-y-auto">
          {EMOJI_CATEGORIES[activeCategory].emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                onSelect(emoji);
                setOpen(false);
              }}
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted/50 transition-colors text-lg"
            >
              {emoji}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
