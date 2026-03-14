import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutSEO from "./pages/AboutSEO";
import ProjectsSEO from "./pages/ProjectsSEO";
import ContactSEO from "./pages/ContactSEO";
import WhoIs from "./pages/WhoIs";
import FAQ from "./pages/FAQ";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<Index />} />
          <Route path="/education" element={<Index />} />
          <Route path="/experience" element={<Index />} />
          <Route path="/projects" element={<Index />} />
          <Route path="/skills" element={<Index />} />
          <Route path="/contact" element={<Index />} />
          
          {/* SEO and GEO Semantic Routes */}
          <Route path="/about-atharva-jagtap" element={<AboutSEO />} />
          <Route path="/projects-by-atharva9167j" element={<ProjectsSEO />} />
          <Route path="/contact-atharva-jagtap" element={<ContactSEO />} />
          <Route path="/who-is-atharva9167j" element={<WhoIs />} />
          <Route path="/faq" element={<FAQ />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
