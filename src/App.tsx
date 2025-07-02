import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChatPage from "./pages/ChatPage";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
    useEffect(() => {
    const script = document.createElement("script");
    script.src = "http://localhost:8081/embed.js";
    script.setAttribute("data-client-id", "CLIENTE123");
    script.setAttribute("data-widget-url", "http://localhost:8081/chat");
    script.async = true;
    document.body.appendChild(script);

    // opcional: limpeza
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return(
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/chat" element={<ChatPage />} />   {/* Rota do chat */}
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      );
}
export default App;
