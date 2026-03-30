import { Flag, ShieldBan, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import ReportDialog from "./ReportDialog";

interface Props {
  profileName: string;
}

export default function ProfileActions({ profileName }: Props) {
  const [reportOpen, setReportOpen] = useState(false);
  const [blockConfirm, setBlockConfirm] = useState(false);

  const handleBlock = () => {
    toast.success(`${profileName} has been blocked. You won't see their profile anymore.`);
    setBlockConfirm(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="py-8 px-6"
      >
        <p className="text-xs text-center text-muted-foreground mb-4 tracking-wide uppercase">
          Something wrong?
        </p>
        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setReportOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-destructive/30 text-destructive text-sm font-semibold hover:bg-destructive/5 active:bg-destructive/10 transition-all duration-200"
          >
            <Flag className="h-4 w-4" />
            Report
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setBlockConfirm(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-primary/30 text-primary text-sm font-semibold hover:bg-primary/5 active:bg-primary/10 transition-all duration-200"
          >
            <ShieldBan className="h-4 w-4" />
            Block
          </motion.button>
        </div>
      </motion.div>

      {/* Block confirmation */}
      {blockConfirm && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setBlockConfirm(false)} />
          <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 mx-auto max-w-xs rounded-2xl border border-border bg-card p-6 shadow-xl animate-scale-in text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <ShieldBan className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">Block {profileName}?</h3>
            <p className="text-sm text-muted-foreground mb-5">
              They won't be able to see your profile or contact you.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setBlockConfirm(false)}
                className="flex-1 py-2.5 rounded-full border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBlock}
                className="flex-1 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold transition-colors"
              >
                Block
              </button>
            </div>
          </div>
        </div>
      )}

      <ReportDialog open={reportOpen} onClose={() => setReportOpen(false)} profileName={profileName} />
    </>
  );
}
