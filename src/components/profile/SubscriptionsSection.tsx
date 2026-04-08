import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Star, CreditCard, Check, X, Gem, Zap, Send, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SubscriptionsSection = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Buy Extras */}
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
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Plans</h3>

        {/* Free */}
        <PlanCard
          icon={<Star className="h-4.5 w-4.5" />}
          title="Free"
          price="$0"
          period="/month"
          ctaLabel="Current Plan"
          ctaDisabled
          iconBg="bg-muted/70"
          iconColor="text-muted-foreground"
          features={[
            { included: true, label: "15 discovers/day" },
            { included: true, label: "5 vibes/day" },
            { included: true, label: "1 invite/week" },
            { included: true, label: "1 magic search/wk" },
            { included: false, label: "Extended filters" },
            { included: false, label: "See who vibed you" },
            { included: false, label: "See who invited you" },
            { included: false, label: "Moments interact" },
            { included: false, label: "Profile unlock" },
            { included: false, label: "Enhanced visibility" },
          ]}
        />

        {/* Elyxer Plus */}
        <PlanCard
          icon={<Crown className="h-4.5 w-4.5" />}
          title="Elyxer Plus"
          price="$9.99"
          period="/month"
          badge="POPULAR"
          ctaLabel="Upgrade to Plus"
          ctaStyle={{ background: "var(--gradient-warm)" }}
          borderClass="border-primary/30"
          iconBg="bg-primary/10"
          iconColor="text-primary"
          shadowStyle={{ boxShadow: "var(--shadow-warm)" }}
          features={[
            { included: true, label: "Unlimited discover" },
            { included: true, label: "15 vibes/day" },
            { included: true, label: "5 invites/week" },
            { included: true, label: "5 magic search/wk" },
            { included: true, label: "Extended filters" },
            { included: true, label: "See who vibed you" },
            { included: true, label: "See who invited you" },
            { included: true, label: "Moments interact" },
            { included: true, label: "2 posts/week" },
            { included: true, label: "Enhanced visibility" },
          ]}
        />

        {/* Elyxer Infinity */}
        <PlanCard
          icon={<Gem className="h-4.5 w-4.5" />}
          title="Elyxer Infinity"
          price="$19.99"
          period="/month"
          badge="BEST VALUE"
          ctaLabel="Go Infinity"
          ctaClass="bg-accent text-accent-foreground hover:bg-accent/90"
          borderClass="border-accent/40"
          iconBg="bg-accent/10"
          iconColor="text-accent-foreground"
          shadowStyle={{ boxShadow: "0 4px 24px -4px hsl(var(--accent) / 0.15)" }}
          badgeClass="bg-accent text-accent-foreground"
          features={[
            { included: true, label: "Priority discover" },
            { included: true, label: "30 vibes/day" },
            { included: true, label: "10 invites/week" },
            { included: true, label: "Unlimited search" },
            { included: true, label: "Advanced filters" },
            { included: true, label: "See who vibed you" },
            { included: true, label: "See who invited you" },
            { included: true, label: "Full moments access" },
            { included: true, label: "4 posts/week" },
            { included: true, label: "Profile unlock" },
            { included: true, label: "Profile control" },
            { included: true, label: "Priority visibility" },
          ]}
        />
      </div>
    </motion.div>
  );
};

interface PlanCardProps {
  icon: React.ReactNode;
  title: string;
  price: string;
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
  features: { included: boolean; label: string }[];
}

function PlanCard({
  icon, title, price, period, badge, ctaLabel, ctaDisabled, ctaStyle, ctaClass,
  borderClass, iconBg, iconColor, shadowStyle, badgeClass, features,
}: PlanCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-2xl border-2 ${borderClass || "border-border/30"} bg-card overflow-hidden transition-all`}
      style={shadowStyle || { boxShadow: "var(--shadow-card)" }}
    >
      {/* Header: always visible */}
      <div className="p-4 pb-3">
        {badge && (
          <div className="flex justify-end -mt-1 -mr-1 mb-1">
            <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full ${badgeClass || ""}`}
              style={!badgeClass ? { background: "var(--gradient-warm)", color: "hsl(var(--primary-foreground))" } : undefined}
            >{badge}</span>
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
            <span className={iconColor}>{icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-foreground leading-tight">{title}</h3>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xl font-bold text-foreground">{price}</span>
            <span className="text-xs text-muted-foreground">{period}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-3">
          {ctaDisabled ? (
            <div className="w-full rounded-2xl h-9 flex items-center justify-center text-[13px] font-medium text-muted-foreground bg-muted/50 border border-border/30">
              {ctaLabel}
            </div>
          ) : (
            <Button
              className={`w-full rounded-2xl gap-2 h-9 text-[13px] font-medium ${ctaClass || ""}`}
              style={ctaStyle}
            >
              <CreditCard className="h-3.5 w-3.5" />
              {ctaLabel}
            </Button>
          )}
        </div>
      </div>

      {/* Expandable features */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center gap-1.5 py-2 text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors border-t border-border/20 bg-muted/20"
      >
        {expanded ? "Hide" : "View"} features
        <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 px-4 pb-4 pt-2">
              {features.map((f, i) => (
                <PlanFeature key={i} included={f.included} label={f.label} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
