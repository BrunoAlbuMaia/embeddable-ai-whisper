import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardLayout } from "./components/Layout/DashboardLayout";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import ChatPage from "./pages/ChatPage";
import SelectPlanPage from "./pages/SelectPlanPage";
import RegisterCompanyPage from "./pages/RegisterCompanyPage";
import RegisterUserPage from "./pages/RegisterUserPage";
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
        <ThemeProvider defaultTheme="system" storageKey="docs-ia-theme">
          <AuthProvider>
            <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/chat" element={<ChatPage />} />
              
              {/* Registration flow */}
              <Route path="/register" element={<SelectPlanPage />} />
              <Route path="/register/company" element={<RegisterCompanyPage />} />
              <Route path="/register/user" element={<RegisterUserPage />} />

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
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
