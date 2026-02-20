import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import StudyMaterialSection from "./components/StudyMaterialSection";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

// 1. Layout logic ko alag component mein rakha
function LayoutContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Agar admin page nahi hai toh hi Navbar dikhao */}
      {!isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/study-material" element={<StudyMaterialSection />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

// 2. Main App component jo providers setup karta hai
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LayoutContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;