import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          <BrowserRouter>
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={ 
                                        <AuthProvider>
                                            <Index />
                                        </AuthProvider>
                                      } />
              <Route path="/login" element=
                                          {
                                            <AuthProvider>
                                              <LoginPage />
                                            </AuthProvider>
                                          }/>
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/register" element={<SelectPlanPage />} />
              <Route path="/register/company" element={<RegisterCompanyPage />} />
              <Route path="/register/user" element={<RegisterUserPage />} />

              {/* Rotas protegidas */}
              <Route
                path="/dashboard"
                element={
                  <AuthProvider>
                    <ProtectedRoute>
                      <DashboardLayout>
                        <ChatsPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  </AuthProvider>
                }
              />
              <Route
                path="/dashboard/documents"
                element={
                  <AuthProvider>
                    <ProtectedRoute>
                      <DashboardLayout>
                        <DocumentsPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  </AuthProvider>
                }
              />
              <Route
                path="/dashboard/segments"
                element={
                  <AuthProvider>
                    <ProtectedRoute>
                      <DashboardLayout>
                        <SegmentsPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  </AuthProvider>
                }
              />
              <Route
                path="/dashboard/plans"
                element={
                  <AuthProvider>
                    <ProtectedRoute>
                      <DashboardLayout>
                        <PlansPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  </AuthProvider>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
