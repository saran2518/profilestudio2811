import { motion } from "framer-motion";
import { Crown, Star, CreditCard, Check, X, Gem, Zap, Send, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SubscriptionsSection = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Single Purchase Items */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Buy Extras</h3>
        <div className="grid grid-cols-3 gap-2">
          <PurchaseItem icon={<Zap className="h-5 w-5" />} label="Vibes" price="$1.99" color="primary" />
          <PurchaseItem icon={<Send className="h-5 w-5" />} label="Invites" price="$2.99" color="accent" />
          <PurchaseItem icon={<Search className="h-5 w-5" />} label="Magic Search" price="$0.99" color="secondary" />
        </div>
      </div>

      <Separator className="bg-border/30" />

      {/* Plans */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Plans</h3>

        {/* Free Plan - Compact */}
        <div className="rounded-2xl border border-border/30 bg-card px-4 py-3 flex items-center gap-3" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="h-9 w-9 rounded-xl bg-muted/70 flex items-center justify-center shrink-0">
            <Star className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground">Free</h3>
            <p className="text-[11px] text-muted-foreground">5 vibes/day · Basic profile</p>
          </div>
          <span className="text-[11px] font-medium text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full">Current</span>
        </div>

        {/* Elyxer Plus */}
        <div
          className="rounded-2xl border-2 border-primary/30 bg-card p-4 relative overflow-hidden"
          style={{ boxShadow: "var(--shadow-warm)" }}
        >
          <div className="absolute top-0 right-0 text-[9px] font-bold px-2.5 py-1 rounded-bl-xl" style={{ background: "var(--gradient-warm)", color: "hsl(var(--primary-foreground))" }}>
            POPULAR
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,hsl(var(--primary)/0.05),transparent_50%)]" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Crown className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Elyxer Plus</h3>
                <p className="text-[11px] text-muted-foreground">$9.99/month</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-3">
              <PlanFeature included label="Unlimited vibes" />
              <PlanFeature included label="Who viewed you" />
              <PlanFeature included label="Priority discover" />
              <PlanFeature included label="Advanced filters" />
            </div>
            <Button className="w-full rounded-2xl gap-2 h-10 text-[13px] font-medium" style={{ background: "var(--gradient-warm)" }}>
              <CreditCard className="h-3.5 w-3.5" />
              Upgrade to Plus
            </Button>
          </div>
        </div>

        {/* Elyxer Premium */}
        <div
          className="rounded-2xl border-2 border-accent/40 bg-card p-4 relative overflow-hidden"
          style={{ boxShadow: "0 4px 24px -4px hsl(var(--accent) / 0.15)" }}
        >
          <div className="absolute top-0 right-0 text-[9px] font-bold px-2.5 py-1 rounded-bl-xl bg-accent text-accent-foreground">
            BEST VALUE
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,hsl(var(--accent)/0.06),transparent_50%)]" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="h-9 w-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Gem className="h-4 w-4 text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Elyxer Premium</h3>
                <p className="text-[11px] text-muted-foreground">$19.99/month</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-3">
              <PlanFeature included label="Everything in Plus" />
              <PlanFeature included label="Exclusive badges" />
              <PlanFeature included label="Weekly boost" />
              <PlanFeature included label="Read receipts" />
              <PlanFeature included label="Incognito mode" />
            </div>
            <Button className="w-full rounded-2xl gap-2 h-10 text-[13px] font-medium bg-accent text-accent-foreground hover:bg-accent/90">
              <Gem className="h-3.5 w-3.5" />
              Go Premium
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function PurchaseItem({ icon, label, price, color }: { icon: React.ReactNode; label: string; price: string; color: string }) {
  const bgClass = color === "primary" ? "bg-primary/10" : color === "accent" ? "bg-accent/10" : "bg-muted/60";
  const iconClass = color === "primary" ? "text-primary" : color === "accent" ? "text-accent-foreground" : "text-muted-foreground";

  return (
    <button className="rounded-2xl border border-border/30 bg-card p-3 flex flex-col items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className={`h-10 w-10 rounded-xl ${bgClass} flex items-center justify-center`}>
        <span className={iconClass}>{icon}</span>
      </div>
      <span className="text-[12px] font-semibold text-foreground">{label}</span>
      <span className="text-[11px] text-muted-foreground">{price}</span>
    </button>
  );
}

function PlanFeature({ included, label }: { included?: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[12px]">
      {included ? (
        <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Check className="h-2.5 w-2.5 text-primary" />
        </div>
      ) : (
        <div className="h-4 w-4 rounded-full bg-muted/60 flex items-center justify-center shrink-0">
          <X className="h-2.5 w-2.5 text-muted-foreground/40" />
        </div>
      )}
      <span className={included ? "text-foreground" : "text-muted-foreground/60"}>{label}</span>
    </div>
  );
}

export default SubscriptionsSection;
