import { useState } from "react";
import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";

export default function InterspersedPhoto({ src, delay = 0.2 }: { src: string; delay?: number }) {
  const [vibed, setVibed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl overflow-hidden relative"
      style={{ boxShadow: "0 8px 32px -8px hsl(var(--foreground) / 0.1)" }}
    >
      <img src={src} alt="Profile photo" className="w-full aspect-[4/5] object-cover" loading="lazy" width={800} height={1000} />

      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => setVibed(!vibed)}
        className="absolute top-4 right-4 h-10 w-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
        style={{ backgroundColor: vibed ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.25)" }}
      >
        <motion.div animate={vibed ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
          <HeartPulse className="h-5 w-5 text-white" strokeWidth={2} />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
