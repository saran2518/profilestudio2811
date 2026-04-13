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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative rounded-2xl overflow-hidden bg-card border border-border/30 p-4"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-14 h-14 rounded-full border-2 border-primary/20 overflow-hidden">
            <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
          </div>
          <button className="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary flex items-center justify-center shadow-sm">
            <Camera className="h-2.5 w-2.5 text-primary-foreground" />
          </button>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-[15px] font-display font-semibold text-foreground tracking-tight leading-tight">
            {name}, {age}
          </h2>
          <p className="text-[12px] text-muted-foreground truncate">
            {profession} · {location}
          </p>
        </div>

        {/* View Profile Button */}
        <Button
          onClick={onViewProfile}
          variant="outline"
          size="sm"
          className="rounded-xl gap-1.5 h-8 text-[12px] font-medium border-border/50 hover:bg-primary/5 hover:border-primary/30 shrink-0"
        >
          <Eye className="h-3.5 w-3.5 text-primary" />
          View
        </Button>
      </div>
    </motion.div>
  );
};

export default ProfileHeroCard;
