import { motion } from "framer-motion";

export default function InterspersedPhoto({ src, delay = 0.2 }: { src: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl overflow-hidden"
      style={{ boxShadow: "0 8px 32px -8px hsl(var(--foreground) / 0.1)" }}
    >
      <img src={src} alt="Profile photo" className="w-full aspect-[4/5] object-cover" loading="lazy" width={800} height={1000} />
    </motion.div>
  );
}
