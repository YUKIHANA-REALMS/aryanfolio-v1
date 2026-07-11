import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminSettingsProvider } from "./context/AdminSettings";
import { PageTransition } from "./components/PageTransition";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Converter from "./pages/Converter";
import Friends from "./pages/Friends";
import ContactEmail from "./pages/ContactEmail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminSettingsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageTransition>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/converter" element={<Converter />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/contact-email" element={<ContactEmail />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </BrowserRouter>
      </TooltipProvider>
    </AdminSettingsProvider>
  </QueryClientProvider>
);

export default App;
