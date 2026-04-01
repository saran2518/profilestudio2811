import { motion } from "framer-motion";
import { Bell, Moon, Globe, Lock, Shield, Eye, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface SettingsSectionProps {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  notifications: boolean;
  setNotifications: (v: boolean) => void;
}

const SettingsSection = ({ darkMode, setDarkMode, notifications, setNotifications }: SettingsSectionProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Preferences */}
      <SettingsGroup title="Preferences">
        <SettingRow icon={<Bell className="h-4 w-4" />} label="Notifications" action={<Switch checked={notifications} onCheckedChange={setNotifications} />} />
        <SettingRow icon={<Moon className="h-4 w-4" />} label="Dark Mode" action={<Switch checked={darkMode} onCheckedChange={setDarkMode} />} />
        <SettingRow icon={<Globe className="h-4 w-4" />} label="Language" value="English" last />
      </SettingsGroup>

      {/* Privacy */}
      <SettingsGroup title="Privacy & Security">
        <SettingRow icon={<Lock className="h-4 w-4" />} label="Privacy Settings" />
        <SettingRow icon={<Shield className="h-4 w-4" />} label="Blocked Users" />
        <SettingRow icon={<Eye className="h-4 w-4" />} label="Profile Visibility" value="Everyone" last />
      </SettingsGroup>

      {/* Support */}
      <SettingsGroup title="Support">
        <SettingRow icon={<HelpCircle className="h-4 w-4" />} label="Help & FAQ" />
        <SettingRow icon={<Shield className="h-4 w-4" />} label="Terms & Privacy Policy" last />
      </SettingsGroup>

      {/* Logout */}
      <Button
        variant="outline"
        className="w-full rounded-2xl gap-2 h-11 text-destructive border-destructive/20 hover:bg-destructive/5 font-medium"
      >
        <LogOut className="h-4 w-4" />
        Log Out
      </Button>
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
  last,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  action?: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 ${last ? "" : "border-b border-border/15"}`}>
      <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground">
        {icon}
      </div>
      <span className="flex-1 text-[13px] text-foreground font-medium">{label}</span>
      {action || (
        <div className="flex items-center gap-1.5 text-muted-foreground">
          {value && <span className="text-[12px]">{value}</span>}
          <ChevronRight className="h-4 w-4 opacity-40" />
        </div>
      )}
    </div>
  );
}

export default SettingsSection;
