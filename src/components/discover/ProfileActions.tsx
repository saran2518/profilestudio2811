import { Flag, ShieldBan } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Props {
  profileName: string;
}

export default function ProfileActions({ profileName }: Props) {
  const handleReport = () => {
    toast.success(`${profileName} has been reported. We'll review this shortly.`);
  };

  const handleBlock = () => {
    toast.success(`${profileName} has been blocked. You won't see their profile anymore.`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="flex items-center justify-center gap-6 py-6"
    >
      <button
        onClick={handleReport}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-destructive/50 bg-card/60 backdrop-blur-sm text-destructive hover:bg-destructive/10 transition-colors text-sm font-medium"
      >
        <Flag className="h-4 w-4" />
        Report
      </button>
      <button
        onClick={handleBlock}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/50 bg-card/60 backdrop-blur-sm text-primary hover:bg-primary/10 transition-colors text-sm font-medium"
      >
        <ShieldBan className="h-4 w-4" />
        Block
      </button>
    </motion.div>
  );
}
