import { motion } from "framer-motion";
import { Edit3, Camera, ChevronRight } from "lucide-react";

interface QuickActionsProps {
  onEditProfile: () => void;
  onManagePhotos?: () => void;
}

const QuickActions = ({ onEditProfile, onManagePhotos }: QuickActionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.4 }}
      className="rounded-2xl border border-border/30 bg-card overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <button
        onClick={onEditProfile}
        className="w-full flex items-center gap-3 px-4 py-3 text-left group hover:bg-muted/30 transition-colors"
      >
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Edit3 className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-foreground">Edit Profile</p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary/50 transition-colors shrink-0" />
      </button>
      <div className="h-px bg-border/20 mx-4" />
      <button
        onClick={onManagePhotos}
        className="w-full flex items-center gap-3 px-4 py-3 text-left group hover:bg-muted/30 transition-colors"
      >
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Camera className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-foreground">Photos</p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary/50 transition-colors shrink-0" />
      </button>
    </motion.div>
  );
};

export default QuickActions;
