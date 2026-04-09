import { Flag, ShieldBan } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ReportDialog from "./ReportDialog";
import BlockDialog from "./BlockDialog";

interface Props {
  profileName: string;
}

export default function ProfileActions({ profileName }: Props) {
  const [reportOpen, setReportOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);

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
            onClick={() => setBlockOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-primary/30 text-primary text-sm font-semibold hover:bg-primary/5 active:bg-primary/10 transition-all duration-200"
          >
            <ShieldBan className="h-4 w-4" />
            Block
          </motion.button>
        </div>
      </motion.div>

      <ReportDialog open={reportOpen} onClose={() => setReportOpen(false)} profileName={profileName} />
      <BlockDialog open={blockOpen} onClose={() => setBlockOpen(false)} profileName={profileName} />
    </>
  );
}
