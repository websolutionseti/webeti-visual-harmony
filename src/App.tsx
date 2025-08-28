import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import A11yDemo from "./pages/A11yDemo";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TeamManagement from "./pages/TeamManagement";
import DatabaseConfig from "./pages/DatabaseConfig";
import AuditLogs from "./pages/AuditLogs";
import ApiDocs from "./pages/ApiDocs";
import 'antd/dist/reset.css';

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('user');
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/a11y" element={<A11yDemo />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/equipe" element={<ProtectedRoute><TeamManagement /></ProtectedRoute>} />
          <Route path="/admin/configuracoes" element={<ProtectedRoute><DatabaseConfig /></ProtectedRoute>} />
          <Route path="/admin/logs" element={<ProtectedRoute><AuditLogs /></ProtectedRoute>} />
          <Route path="/admin/api-docs" element={<ProtectedRoute><ApiDocs /></ProtectedRoute>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
