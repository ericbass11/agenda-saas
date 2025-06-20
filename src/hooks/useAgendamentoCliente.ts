
import { useState } from "react";

export interface Cliente {
  nome: string;
  email: string;
  telefone: string;
  whatsapp: string;
}

export interface AgendamentoData {
  cliente: Cliente;
  servicoId: number;
  profissionalId?: number;
  data: Date;
  hora: string;
  observacoes?: string;
}

export interface Estabelecimento {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  whatsapp: string;
}

export const useAgendamentoCliente = (estabelecimentoId: string) => {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [agendamento, setAgendamento] = useState<Partial<AgendamentoData>>({});
  const [clienteLogado, setClienteLogado] = useState<Cliente | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - em um app real, viria do backend
  const estabelecimento: Estabelecimento = {
    id: estabelecimentoId,
    nome: "Salão Beleza Total",
    endereco: "Rua das Flores, 123 - Centro",
    telefone: "(11) 3333-4444",
    whatsapp: "(11) 99999-8888"
  };

  const servicos = [
    { id: 1, nome: "Corte Feminino", categoria: "Cabelo", preco: "R$ 50,00", duracao: "45 min" },
    { id: 2, nome: "Escova", categoria: "Cabelo", preco: "R$ 30,00", duracao: "30 min" },
    { id: 3, nome: "Manicure", categoria: "Unhas", preco: "R$ 25,00", duracao: "30 min" },
    { id: 4, nome: "Pedicure", categoria: "Unhas", preco: "R$ 30,00", duracao: "45 min" },
  ];

  const profissionais = [
    { id: 1, nome: "Ana Costa", especialidades: ["Cabelo"] },
    { id: 2, nome: "Maria Silva", especialidades: ["Cabelo", "Unhas"] },
    { id: 3, nome: "João Santos", especialidades: ["Unhas"] },
  ];

  const atualizarAgendamento = (dados: Partial<AgendamentoData>) => {
    setAgendamento(prev => ({ ...prev, ...dados }));
  };

  const proximaEtapa = () => {
    setEtapaAtual(prev => Math.min(prev + 1, 4));
  };

  const etapaAnterior = () => {
    setEtapaAtual(prev => Math.max(prev - 1, 0));
  };

  const finalizarAgendamento = async () => {
    setIsLoading(true);
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Agendamento finalizado:", agendamento);
      
      // Aqui enviaria a confirmação via WhatsApp
      return true;
    } catch (error) {
      console.error("Erro ao finalizar agendamento:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    etapaAtual,
    agendamento,
    clienteLogado,
    estabelecimento,
    servicos,
    profissionais,
    isLoading,
    setClienteLogado,
    atualizarAgendamento,
    proximaEtapa,
    etapaAnterior,
    finalizarAgendamento,
  };
};
