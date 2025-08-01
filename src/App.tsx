import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardLayout } from "./components/Layout/DashboardLayout";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import ChatPage from "./pages/ChatPage";
import ChatsPage from "./pages/dashboard/ChatsPage";
import DocumentsPage from "./pages/dashboard/DocumentsPage";
import SegmentsPage from "./pages/dashboard/SegmentsPage";
import PlansPage from "./pages/dashboard/PlansPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/chat" element={<ChatPage />} />

              {/* Protected dashboard routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ChatsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard/documents" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DocumentsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard/segments" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <SegmentsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard/plans" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PlansPage />
                  </DashboardLayout>
                </ProtectedRoute>
              } />

              {/* Fallback routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
