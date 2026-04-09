import { motion } from "framer-motion";
import { HeartPulse, MapPin, Shield, Verified } from "lucide-react";

interface Props {
  src: string;
  liked: boolean;
  onVibe: () => void;
  profile: {
    name: string;
    age: number;
    verified: boolean;
    profession: string;
    specialization: string;
    location: string;
  };
}

export default function ProfilePhotoCard({ src, liked, onVibe, profile }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-[28px] overflow-hidden"
      style={{ boxShadow: "0 16px 48px -12px hsl(var(--foreground) / 0.18)" }}
    >
      <img src={src} alt="Profile" className="w-full aspect-[4/5] object-cover" width={800} height={1000} />
      
      {/* Richer gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10" />

      {/* Vibe button with glow */}
      <motion.button
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        onClick={onVibe}
        className="absolute top-4 right-4 h-12 w-12 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300"
        style={{
          backgroundColor: liked ? "hsl(var(--primary))" : "hsl(0 0% 100% / 0.15)",
          borderColor: liked ? "hsl(var(--primary))" : "hsl(0 0% 100% / 0.25)",
          boxShadow: liked ? "0 0 20px hsl(var(--primary) / 0.4)" : "0 4px 16px hsl(0 0% 0% / 0.2)",
        }}
      >
        <motion.div animate={liked ? { scale: [1, 1.4, 1], rotate: [0, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
          <HeartPulse className="h-5 w-5 text-white" strokeWidth={2.5} />
        </motion.div>
      </motion.button>

      {/* Info card at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-2xl bg-card/80 backdrop-blur-xl px-5 py-4 border border-border/15"
          style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.15)" }}
        >
          <div className="flex items-center gap-2">
            <h2 className="font-display text-[22px] font-bold text-foreground tracking-tight">{profile.name}, {profile.age}</h2>
            {profile.verified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 400 }}
                className="h-6 w-6 rounded-full flex items-center justify-center"
                style={{ background: "var(--gradient-warm)" }}
              >
                <Verified className="h-3.5 w-3.5 text-white" />
              </motion.div>
            )}
          </div>
          <p className="font-body text-[13px] text-foreground/75 mt-0.5 font-medium">{profile.profession} · {profile.specialization}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <MapPin className="h-3 w-3 text-primary/60" />
            <span className="font-body text-[11px] text-muted-foreground font-medium">{profile.location}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
