import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PhoneVerification from "./pages/PhoneVerification";
import OTPVerification from "./pages/OTPVerification";
import ProfileName from "./pages/ProfileName";
import Onboarding from "./pages/Onboarding";
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
