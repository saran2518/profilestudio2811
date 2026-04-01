import { motion } from "framer-motion";
import { Crown, Star, CreditCard, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SubscriptionsSection = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Current Plan */}
      <div className="rounded-2xl border border-border/30 bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-xl bg-muted/70 flex items-center justify-center">
            <Star className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Free Plan</h3>
            <p className="text-[11px] text-muted-foreground">Basic features included</p>
          </div>
        </div>
        <Separator className="my-3 bg-border/40" />
        <ul className="space-y-2.5">
          <PlanFeature included label="5 vibes per day" />
          <PlanFeature included label="Basic profile" />
          <PlanFeature label="Unlimited vibes" />
          <PlanFeature label="See who viewed you" />
        </ul>
      </div>

      {/* Premium Plan */}
      <div
        className="rounded-2xl border-2 border-primary/30 bg-card p-4 relative overflow-hidden"
        style={{ boxShadow: "var(--shadow-warm)" }}
      >
        <div className="absolute top-0 right-0 text-[10px] font-bold px-3 py-1.5 rounded-bl-xl" style={{ background: "var(--gradient-warm)", color: "hsl(var(--primary-foreground))" }}>
          POPULAR
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,hsl(var(--primary)/0.05),transparent_50%)]" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Crown className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Premium</h3>
              <p className="text-[11px] text-muted-foreground">$9.99/month</p>
            </div>
          </div>
          <Separator className="my-3 bg-border/40" />
          <ul className="space-y-2.5 mb-4">
            <PlanFeature included label="Unlimited vibes" />
            <PlanFeature included label="See who viewed you" />
            <PlanFeature included label="Priority in discover" />
            <PlanFeature included label="Advanced filters" />
          </ul>
          <Button className="w-full rounded-2xl gap-2 h-11 font-medium" style={{ background: "var(--gradient-warm)" }}>
            <CreditCard className="h-4 w-4" />
            Upgrade Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

function PlanFeature({ included, label }: { included?: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2.5 text-[13px]">
      {included ? (
        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
          <Check className="h-3 w-3 text-primary" />
        </div>
      ) : (
        <div className="h-5 w-5 rounded-full bg-muted/60 flex items-center justify-center">
          <X className="h-3 w-3 text-muted-foreground/40" />
        </div>
      )}
      <span className={included ? "text-foreground" : "text-muted-foreground/60"}>{label}</span>
    </li>
  );
}

export default SubscriptionsSection;
