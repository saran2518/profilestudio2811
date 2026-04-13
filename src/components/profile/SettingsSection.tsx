import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Pause,
  EyeOff,
  ShieldCheck,
  HeartHandshake,
  Phone,
  Mail,
  Bell,
  MailOpen,
  Globe,
  Lock,
  DatabaseZap,
  FileText,
  Scale,
  LogOut,
  PauseCircle,
  Trash2,
  HelpCircle,
  Info,
  ChevronRight,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DeleteAccountDialog from "./DeleteAccountDialog";

const SettingsSection = () => {
  const navigate = useNavigate();
  const [pauseProfile, setPauseProfile] = useState(false);
  const [privateBrowsing, setPrivateBrowsing] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Profile & Presence */}
      <SettingsGroup title="Profile & Presence">
        <SettingRow
          icon={<Pause className="h-4 w-4" />}
          label="Pause Profile"
          action={<Switch checked={pauseProfile} onCheckedChange={setPauseProfile} />}
        />
        <SettingRow
          icon={<EyeOff className="h-4 w-4" />}
          label="Private Browsing"
          badge="Premium"
          action={<Switch checked={privateBrowsing} onCheckedChange={setPrivateBrowsing} />}
          last
        />
      </SettingsGroup>

      {/* Safety */}
      <SettingsGroup title="Safety">
        <SettingRow icon={<ShieldCheck className="h-4 w-4" />} label="Selfie Badge" />
        <SettingRow icon={<HeartHandshake className="h-4 w-4" />} label="Safe Dating Tips" onClick={() => navigate("/dating-tips")} last />
      </SettingsGroup>

      {/* Login & Security */}
      <SettingsGroup title="Login & Security">
        <SettingRow icon={<Phone className="h-4 w-4" />} label="Phone Number" />
        <SettingRow icon={<Mail className="h-4 w-4" />} label="Email Address" last />
      </SettingsGroup>

      {/* Notifications */}
      <SettingsGroup title="Notifications">
        <SettingRow
          icon={<Bell className="h-4 w-4" />}
          label="Push Notifications"
          action={<Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />}
        />
        <SettingRow
          icon={<MailOpen className="h-4 w-4" />}
          label="Email Notifications"
          action={<Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />}
          last
        />
      </SettingsGroup>

      {/* Language */}
      <SettingsGroup title="Language">
        <SettingRow icon={<Globe className="h-4 w-4" />} label="App Language" value="English" last />
      </SettingsGroup>

      {/* Privacy & Data */}
      <SettingsGroup title="Privacy & Data">
        <SettingRow icon={<Lock className="h-4 w-4" />} label="Privacy Preferences" />
        <SettingRow icon={<DatabaseZap className="h-4 w-4" />} label="Request Your Data" last />
      </SettingsGroup>

      {/* Legal */}
      <SettingsGroup title="Legal">
        <SettingRow icon={<FileText className="h-4 w-4" />} label="Privacy Policy" />
        <SettingRow icon={<Scale className="h-4 w-4" />} label="Terms of Service" last />
      </SettingsGroup>

      {/* Help & Support */}
      <SettingsGroup title="Help & Support">
        <SettingRow icon={<HelpCircle className="h-4 w-4" />} label="Help & FAQ" onClick={() => navigate("/help-faq")} last />
      </SettingsGroup>

      {/* Account */}
      <div className="space-y-2">
        <Button
          variant="outline"
          className="w-full rounded-2xl gap-2 h-11 text-foreground border-border/30 hover:bg-muted/50 font-medium"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
        <Button
          variant="outline"
          className="w-full rounded-2xl gap-2 h-11 text-destructive border-destructive/20 hover:bg-destructive/5 font-medium"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="h-4 w-4" />
          Delete Account
        </Button>
      </div>

      <DeleteAccountDialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} />

      {/* App Info */}
      <div className="flex items-center justify-center gap-2 py-3 text-muted-foreground/50">
        <Info className="h-3.5 w-3.5" />
        <span className="text-[11px] font-medium">Version 1.0.0</span>
      </div>
    </motion.div>
  );
};

function SettingsGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/30 bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="px-4 py-2.5">
        <span className="text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wider">{title}</span>
      </div>
      {children}
    </div>
  );
}

function SettingRow({
  icon,
  label,
  value,
  action,
  badge,
  last,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  action?: React.ReactNode;
  badge?: string;
  last?: boolean;
  onClick?: () => void;
}) {
  const Wrapper = onClick ? "button" : "div";
  return (
    <Wrapper onClick={onClick} className={`flex items-center gap-3 px-4 py-3 w-full text-left ${last ? "" : "border-b border-border/15"} ${onClick ? "hover:bg-muted/20 transition-colors" : ""}`}>
      <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground">
        {icon}
      </div>
      <span className="flex-1 text-[13px] text-foreground font-medium">{label}</span>
      {badge && (
        <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 font-semibold bg-primary/10 text-primary border-0">
          {badge}
        </Badge>
      )}
      {action || (
        <div className="flex items-center gap-1.5 text-muted-foreground">
          {value && <span className="text-[12px]">{value}</span>}
          <ChevronRight className="h-4 w-4 opacity-40" />
        </div>
      )}
    </Wrapper>
  );
}

export default SettingsSection;
