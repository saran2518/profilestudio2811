import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How do I improve my profile?", a: "Complete all sections of your profile including narratives, interests, and photos. Profiles that are 100% complete get significantly more visibility and matches." },
  { q: "How does matching work?", a: "Our algorithm considers your preferences, interests, and activity to suggest compatible profiles. The more you interact, the better your matches become." },
  { q: "How to manage my subscription?", a: "Go to your Profile page, tap the Subscriptions tab, and choose the plan that works best for you. You can upgrade, downgrade, or cancel anytime." },
  { q: "Safety & privacy tips", a: "Never share personal information like your address or financial details. Always meet in public places. Use the in-app chat to get to know someone before sharing contact info." },
  { q: "How do I report someone?", a: "Open the person's profile, tap the three-dot menu, and select 'Report'. Choose the reason and provide any additional details. Our team reviews all reports within 24 hours." },
  { q: "Can I hide my profile temporarily?", a: "Yes! Go to Settings > Profile & Presence and toggle 'Pause Profile'. Your profile will be hidden from discovery but your existing conversations will remain." },
  { q: "How do I delete my account?", a: "Go to Settings and scroll to the bottom. Tap 'Delete Account' and follow the prompts. Please note this action is permanent and cannot be undone." },
];

const HelpFAQ = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col pb-8">
      <header className="sticky top-0 z-30 px-4 pt-3 pb-2">
        <div className="flex items-center gap-3 rounded-full border border-border/30 bg-card/80 backdrop-blur-xl px-4 py-2.5">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="font-display text-base font-semibold text-foreground tracking-tight">Help & FAQ</span>
        </div>
      </header>

      <main className="flex-1 px-4 mt-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-border/30 bg-card overflow-hidden"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border/20 px-4">
                <AccordionTrigger className="text-[13px] font-medium text-foreground py-3.5 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[12px] text-muted-foreground leading-relaxed pb-3.5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </main>
    </div>
  );
};

export default HelpFAQ;
