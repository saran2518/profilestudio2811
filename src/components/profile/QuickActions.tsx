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
      className="grid grid-cols-2 gap-2.5"
    >
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onEditProfile}
        className="rounded-xl border border-border/30 bg-card px-3 py-2.5 text-left group hover:border-primary/20 transition-all flex items-center gap-2.5"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="h-8 w-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/12 transition-colors">
          <Edit3 className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-foreground leading-tight">Edit Profile</p>
          <p className="text-[10px] text-muted-foreground">Update info</p>
        </div>
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onManagePhotos}
        className="rounded-xl border border-border/30 bg-card px-3 py-2.5 text-left group hover:border-primary/20 transition-all flex items-center gap-2.5"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="h-8 w-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/12 transition-colors">
          <Camera className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-foreground leading-tight">Photos</p>
          <p className="text-[10px] text-muted-foreground">Manage photos</p>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default QuickActions;
