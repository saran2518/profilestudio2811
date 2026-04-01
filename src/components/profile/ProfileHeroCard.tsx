import { motion } from "framer-motion";
import { Camera, Eye, Verified } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileHeroCardProps {
  name: string;
  age: number;
  profession: string;
  location: string;
  photoUrl: string;
  onViewProfile: () => void;
}

const ProfileHeroCard = ({ name, age, profession, location, photoUrl, onViewProfile }: ProfileHeroCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative rounded-3xl overflow-hidden bg-card border border-border/30"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Gradient Banner */}
      <div className="h-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-accent/15 to-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--primary)/0.2),transparent_60%)]" />
        <motion.div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-primary/10 blur-2xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Avatar */}
      <div className="px-5 pb-5 -mt-14">
        <div className="relative w-[88px] h-[88px] mx-auto">
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="w-full h-full rounded-full border-[3px] border-card overflow-hidden shadow-lg"
          >
            <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-md"
          >
            <Camera className="h-3.5 w-3.5 text-primary-foreground" />
          </motion.button>
        </div>

        {/* Info */}
        <div className="text-center mt-3 space-y-0.5">
          <h2 className="text-lg font-display font-semibold text-foreground tracking-tight">
            {name}, {age}
          </h2>
          <p className="text-[13px] text-muted-foreground">
            {profession} · {location}
          </p>
        </div>

        {/* View Profile Button */}
        <Button
          onClick={onViewProfile}
          variant="outline"
          className="w-full mt-4 rounded-2xl gap-2 h-11 text-[13px] font-medium border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
        >
          <Eye className="h-4 w-4 text-primary" />
          View My Profile
        </Button>
      </div>
    </motion.div>
  );
};

export default ProfileHeroCard;
