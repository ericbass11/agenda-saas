
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Agendamentos from "./pages/Agendamentos";
import Profissionais from "./pages/Profissionais";
import Servicos from "./pages/Servicos";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import AgendamentoCliente from "./pages/AgendamentoCliente";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/agendamento/:estabelecimentoId" element={<AgendamentoCliente />} />
          <Route path="/dashboard" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/agendamentos" element={<AppLayout />}>
            <Route index element={<Agendamentos />} />
          </Route>
          <Route path="/profissionais" element={<AppLayout />}>
            <Route index element={<Profissionais />} />
          </Route>
          <Route path="/servicos" element={<AppLayout />}>
            <Route index element={<Servicos />} />
          </Route>
          <Route path="/relatorios" element={<AppLayout />}>
            <Route index element={<Relatorios />} />
          </Route>
          <Route path="/configuracoes" element={<AppLayout />}>
            <Route index element={<Configuracoes />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
