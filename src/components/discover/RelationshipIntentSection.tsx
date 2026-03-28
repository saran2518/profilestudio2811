import { motion } from "framer-motion";
import { Heart, Feather, Plane, Users, Compass, Sparkles } from "lucide-react";

const intentIcons: Record<string, React.ReactNode> = {
  "Meaningful Connection": <Heart className="h-4 w-4 text-primary/60 inline-block align-middle mr-1.5" />,
  "Keeping it Light": <Feather className="h-4 w-4 text-primary/60 inline-block align-middle mr-1.5" />,
  "Travel Buddy": <Plane className="h-4 w-4 text-primary/60 inline-block align-middle mr-1.5" />,
  "Shared Experiences": <Users className="h-4 w-4 text-primary/60 inline-block align-middle mr-1.5" />,
  "Discovery Mode": <Compass className="h-4 w-4 text-primary/60 inline-block align-middle mr-1.5" />,
};

export default function RelationshipIntentSection({ intent }: { intent: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">Intent</h3>
      <p className="font-body text-[15px] leading-relaxed text-foreground/80 font-medium">
        {intent.map((item, idx, arr) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 + idx * 0.08, duration: 0.4 }}
          >
            {intentIcons[item] || <Sparkles className="h-4 w-4 text-primary/60 inline-block align-middle mr-1.5" />}
            {item}
            {idx < arr.length - 1 && (
              <span className="mx-2 inline-block h-[5px] w-[5px] rounded-full bg-primary/50 align-middle" />
            )}
          </motion.span>
        ))}
      </p>
    </motion.div>
  );
}
