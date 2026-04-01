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
      className="grid grid-cols-2 gap-3"
    >
      <ActionCard
        icon={<Edit3 className="h-[18px] w-[18px] text-primary" />}
        title="Edit Profile"
        subtitle="Update your info"
        onClick={onEditProfile}
      />
      <ActionCard
        icon={<Camera className="h-[18px] w-[18px] text-primary" />}
        title="Photos"
        subtitle="Manage photos"
        onClick={onManagePhotos}
      />
    </motion.div>
  );
};

function ActionCard({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="rounded-2xl border border-border/30 bg-card p-4 text-left transition-all duration-200 hover:border-primary/20 group"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center justify-between mb-2.5">
        <div className="h-10 w-10 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors">
          {icon}
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary/50 transition-colors" />
      </div>
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>
    </motion.button>
  );
}

export default QuickActions;
