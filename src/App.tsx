import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OnboardingModule1 from "./pages/OnboardingModule1";
import ProfileStudioIntro from "./pages/ProfileStudioIntro";
import Index from "./pages/Index";
import Results from "./pages/Results";
import Discover from "./pages/Discover";
import Interests from "./pages/Interests";
import Chat from "./pages/Chat";
import Expressions from "./pages/Expressions";
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
          <Route path="/" element={<OnboardingModule1 />} />
          <Route path="/onboarding-module-1" element={<OnboardingModule1 />} />
          <Route path="/profile-studio-intro" element={<ProfileStudioIntro />} />
          <Route path="/create" element={<Index />} />
          <Route path="/results" element={<Results />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/preview" element={<Preview />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
