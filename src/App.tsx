import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PhoneVerification from "./pages/PhoneVerification";
import OTPVerification from "./pages/OTPVerification";
import ProfileName from "./pages/ProfileName";
import EmailEntry from "./pages/EmailEntry";
import EmailOTPVerification from "./pages/EmailOTPVerification";
import ProfileStudioIntro from "./pages/ProfileStudioIntro";
import Index from "./pages/Index";
import Results from "./pages/Results";
import Discover from "./pages/Discover";
import Preview from "./pages/Preview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PhoneVerification />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          <Route path="/profile-name" element={<ProfileName />} />
          <Route path="/email" element={<EmailEntry />} />
          <Route path="/verify-email" element={<EmailOTPVerification />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/create" element={<Index />} />
          <Route path="/results" element={<Results />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/preview" element={<Preview />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
