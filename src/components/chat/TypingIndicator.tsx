import { motion } from "framer-motion";

export default function TypingIndicator({ partnerPhoto }: { partnerPhoto?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="flex items-end gap-2 justify-start"
    >
      <div className="w-7 shrink-0">
        {partnerPhoto && (
          <img src={partnerPhoto} alt="" className="h-7 w-7 rounded-full object-cover" />
        )}
      </div>
      <div className="rounded-2xl rounded-bl-sm bg-card border border-border/30 shadow-sm px-3.5 py-2.5 flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
            animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
    </motion.div>
  );
}
