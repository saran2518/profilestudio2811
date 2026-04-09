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
        className="py-6 px-4"
      >
        {/* Divider with dot */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-border/30" />
          <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/20" />
          <div className="flex-1 h-px bg-border/30" />
        </div>
        <p className="text-[10px] text-center text-muted-foreground/60 mb-3 tracking-[0.15em] uppercase font-medium">
          Something wrong?
        </p>
        <div className="flex items-center justify-center gap-3">
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => setReportOpen(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-destructive/20 text-destructive/70 text-[12px] font-semibold hover:bg-destructive/5 active:bg-destructive/10 transition-all duration-200"
          >
            <Flag className="h-3.5 w-3.5" />
            Report
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => setBlockOpen(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-muted-foreground/20 text-muted-foreground/70 text-[12px] font-semibold hover:bg-muted/40 active:bg-muted/60 transition-all duration-200"
          >
            <ShieldBan className="h-3.5 w-3.5" />
            Block
          </motion.button>
        </div>
      </motion.div>

      <ReportDialog open={reportOpen} onClose={() => setReportOpen(false)} profileName={profileName} />
      <BlockDialog open={blockOpen} onClose={() => setBlockOpen(false)} profileName={profileName} />
    </>
  );
}
