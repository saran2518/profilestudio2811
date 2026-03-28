import { motion } from "framer-motion";
import { Languages } from "lucide-react";

interface Props {
  languages: string[];
}

export default function LanguagesSection({ languages }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card p-5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">
        Languages
      </h3>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang, idx) => (
          <motion.span
            key={lang}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.22 + idx * 0.06, duration: 0.3 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/40 px-3 py-1.5 text-[13px] font-medium text-foreground"
            style={{ background: "hsl(var(--primary) / 0.06)" }}
          >
            <Languages className="h-3.5 w-3.5 text-primary/70" />
            {lang}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
