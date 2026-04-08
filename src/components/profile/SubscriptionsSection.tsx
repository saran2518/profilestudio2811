import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Star, CreditCard, Check, X, Gem, Zap, Send, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const plans: PlanData[] = [
  {
    icon: <Star className="h-5 w-5" />,
    title: "Free",
    price: "₹0",
    period: "",
    ctaLabel: "Current Plan",
    ctaDisabled: true,
    iconBg: "bg-muted/70",
    iconColor: "text-muted-foreground",
    topFeatures: [
      { included: true, label: "15 discovers/day" },
      { included: true, label: "5 vibes/day" },
      { included: true, label: "1 invite/week" },
    ],
    moreFeatures: [
      { included: true, label: "1 magic search/wk" },
      { included: false, label: "Extended filters" },
      { included: false, label: "See who vibed you" },
      { included: false, label: "See who invited you" },
      { included: false, label: "Moments interact" },
      { included: false, label: "Profile unlock" },
      { included: false, label: "Enhanced visibility" },
    ],
  },
  {
    icon: <Crown className="h-5 w-5" />,
    title: "Elyxer Plus",
    price: "₹199",
    period: "/wk",
    altPrice: "₹699/mo",
    badge: "POPULAR",
    ctaLabel: "Upgrade",
    ctaStyle: { background: "var(--gradient-warm)" },
    borderClass: "border-primary/40",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    shadowStyle: { boxShadow: "var(--shadow-warm)" },
    topFeatures: [
      { included: true, label: "Unlimited discover" },
      { included: true, label: "15 vibes/day" },
      { included: true, label: "5 invites/week" },
    ],
    moreFeatures: [
      { included: true, label: "5 magic search/wk" },
      { included: true, label: "Extended filters" },
      { included: true, label: "See who vibed you" },
      { included: true, label: "See who invited you" },
      { included: true, label: "Moments interact" },
      { included: true, label: "2 posts/week" },
      { included: true, label: "Enhanced visibility" },
    ],
  },
  {
    icon: <Gem className="h-5 w-5" />,
    title: "Elyxer Infinity",
    price: "₹299",
    period: "/wk",
    altPrice: "₹999/mo",
    badge: "BEST VALUE",
    ctaLabel: "Go Infinity",
    ctaClass: "bg-accent text-accent-foreground hover:bg-accent/90",
    borderClass: "border-accent/40",
    iconBg: "bg-accent/10",
    iconColor: "text-accent-foreground",
    badgeClass: "bg-accent text-accent-foreground",
    shadowStyle: { boxShadow: "0 4px 24px -4px hsl(var(--accent) / 0.15)" },
    topFeatures: [
      { included: true, label: "Priority discover" },
      { included: true, label: "30 vibes/day" },
      { included: true, label: "10 invites/week" },
    ],
    moreFeatures: [
      { included: true, label: "Unlimited search" },
      { included: true, label: "Advanced filters" },
      { included: true, label: "See who vibed you" },
      { included: true, label: "See who invited you" },
      { included: true, label: "Full moments access" },
      { included: true, label: "4 posts/week" },
      { included: true, label: "Profile unlock" },
      { included: true, label: "Profile control" },
      { included: true, label: "Priority visibility" },
    ],
  },
];

interface Feature {
  included: boolean;
  label: string;
}

interface PlanData {
  icon: React.ReactNode;
  title: string;
  price: string;
  altPrice?: string;
  period: string;
  badge?: string;
  ctaLabel: string;
  ctaDisabled?: boolean;
  ctaStyle?: React.CSSProperties;
  ctaClass?: string;
  borderClass?: string;
  iconBg: string;
  iconColor: string;
  shadowStyle?: React.CSSProperties;
  badgeClass?: string;
  topFeatures: Feature[];
  moreFeatures: Feature[];
}

const SubscriptionsSection = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Buy Extras */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Buy Extras</h3>
        <div className="grid grid-cols-3 gap-2">
          <PurchaseItem icon={<Zap className="h-5 w-5" />} label="Vibes" price="₹49" color="primary" />
          <PurchaseItem icon={<Send className="h-5 w-5" />} label="Invites" price="₹79" color="accent" />
          <PurchaseItem icon={<Search className="h-5 w-5" />} label="Magic Search" price="₹29" color="secondary" />
        </div>
      </div>

      <Separator className="bg-border/30" />

      {/* Plans - Horizontal scroll */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Plans</h3>
        <div className="-mx-4">
          <div className="flex gap-3 overflow-x-auto px-4 pb-3 snap-x snap-mandatory scrollbar-hide" style={{ WebkitOverflowScrolling: "touch" }}>
            {plans.map((plan, i) => (
              <PlanCard key={i} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function PlanCard({ plan }: { plan: PlanData }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-2xl border-2 ${plan.borderClass || "border-border/30"} bg-card flex flex-col snap-center shrink-0`}
      style={{ width: "72vw", maxWidth: 280, ...(plan.shadowStyle || { boxShadow: "var(--shadow-card)" }) }}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="flex justify-end px-3 pt-2">
          <span
            className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full ${plan.badgeClass || ""}`}
            style={!plan.badgeClass ? { background: "var(--gradient-warm)", color: "hsl(var(--primary-foreground))" } : undefined}
          >
            {plan.badge}
          </span>
        </div>
      )}

      <div className={`px-4 ${plan.badge ? "pt-1.5" : "pt-4"} pb-4 flex flex-col flex-1`}>
        {/* Icon + Title */}
        <div className="flex flex-col items-center text-center mb-3">
          <div className={`h-11 w-11 rounded-xl ${plan.iconBg} flex items-center justify-center mb-2`}>
            <span className={plan.iconColor}>{plan.icon}</span>
          </div>
          <h3 className="text-base font-bold text-foreground leading-tight">{plan.title}</h3>
          <div className="mt-1">
            <span className="text-2xl font-bold text-foreground">{plan.price}</span>
            <span className="text-xs text-muted-foreground">{plan.period}</span>
          </div>
          {plan.altPrice && (
            <span className="text-[11px] text-muted-foreground mt-0.5">or {plan.altPrice}</span>
          )}
        </div>

        {/* CTA */}
        <div className="mb-3">
          {plan.ctaDisabled ? (
            <div className="w-full rounded-2xl h-9 flex items-center justify-center text-[13px] font-medium text-muted-foreground bg-muted/50 border border-border/30">
              {plan.ctaLabel}
            </div>
          ) : (
            <Button
              className={`w-full rounded-2xl gap-1.5 h-9 text-[13px] font-medium ${plan.ctaClass || ""}`}
              style={plan.ctaStyle}
            >
              <CreditCard className="h-3.5 w-3.5" />
              {plan.ctaLabel}
            </Button>
          )}
        </div>

        <Separator className="bg-border/20 mb-3" />

        {/* Top features - always visible */}
        <div className="space-y-1.5">
          {plan.topFeatures.map((f, i) => (
            <PlanFeature key={i} included={f.included} label={f.label} />
          ))}
        </div>

        {/* View all toggle */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-1.5 mt-1.5">
                {plan.moreFeatures.map((f, i) => (
                  <PlanFeature key={i} included={f.included} label={f.label} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 flex items-center justify-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {expanded ? "Show less" : `View all (${plan.topFeatures.length + plan.moreFeatures.length})`}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-3 w-3" />
          </motion.span>
        </button>
      </div>
    </div>
  );
}

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
