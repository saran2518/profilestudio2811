import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";

interface Props {
  src: string;
  delay?: number;
  vibed: boolean;
  onVibe: () => void;
}

export default function InterspersedPhoto({ src, delay = 0.2, vibed, onVibe }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[24px] overflow-hidden relative"
      style={{ boxShadow: "0 8px 32px -8px hsl(var(--foreground) / 0.1)" }}
    >
      <img src={src} alt="Profile photo" className="w-full aspect-[4/5] object-cover" loading="lazy" width={800} height={1000} />

      <motion.button
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        onClick={onVibe}
        className="absolute top-4 right-4 h-11 w-11 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300"
        style={{
          backgroundColor: vibed ? "hsl(var(--primary))" : "hsl(0 0% 100% / 0.15)",
          borderColor: vibed ? "hsl(var(--primary))" : "hsl(0 0% 100% / 0.25)",
          boxShadow: vibed ? "0 0 16px hsl(var(--primary) / 0.35)" : "0 4px 12px hsl(0 0% 0% / 0.15)",
        }}
      >
        <motion.div animate={vibed ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
          <HeartPulse className="h-5 w-5 text-white" strokeWidth={2.5} />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
