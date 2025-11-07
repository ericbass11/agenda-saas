import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useEstabelecimento } from './useEstabelecimento';
import { toast } from '@/components/ui/sonner';

export interface Agendamento {
  id: string;
  estabelecimento_id: string;
  cliente_id: string;
  profissional_id: string;
  servico_id: string;
  data_agendamento: string;
  hora_inicio: string;
  hora_fim: string;
  status: 'confirmado' | 'cancelado' | 'concluido' | 'faltou';
  observacoes?: string;
  valor?: number;
  lembrete_enviado: boolean;
  confirmacao_enviada: boolean;
  created_at: string;
  updated_at: string;
  cliente?: {
    nome: string;
    telefone: string;
    email?: string;
  };
  profissional?: {
    nome: string;
  };
  servico?: {
    nome: string;
    duracao_minutos: number;
    preco: number;
  };
}

export interface AgendamentoInput {
  cliente_id: string;
  profissional_id: string;
  servico_id: string;
  data_agendamento: string;
  hora_inicio: string;
  hora_fim: string;
  observacoes?: string;
  valor?: number;
}

export function useAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const { estabelecimento } = useEstabelecimento();

  const fetchAgendamentos = async (startDate?: string, endDate?: string) => {
    if (!estabelecimento) return;
    
    try {
      let query = supabase
        .from('agendamentos')
        .select(`
          *,
          cliente:clientes(nome, telefone, email),
          profissional:profissionais(nome),
          servico:servicos(nome, duracao_minutos, preco)
        `)
        .eq('estabelecimento_id', estabelecimento.id);

      if (startDate) {
        query = query.gte('data_agendamento', startDate);
      }
      if (endDate) {
        query = query.lte('data_agendamento', endDate);
      }

      const { data, error } = await query.order('data_agendamento', { ascending: true });

      if (error) {
        console.error('Error fetching agendamentos:', error);
        toast.error('Erro ao carregar agendamentos');
        return;
      }

      setAgendamentos(data as Agendamento[] || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao carregar agendamentos');
    } finally {
      setLoading(false);
    }
  };

  const createAgendamento = async (data: AgendamentoInput) => {
    if (!estabelecimento) return null;

    try {
      const { data: newAgendamento, error } = await supabase
        .from('agendamentos')
        .insert([{
          ...data,
          estabelecimento_id: estabelecimento.id
        }])
        .select(`
          *,
          cliente:clientes(nome, telefone, email),
          profissional:profissionais(nome),
          servico:servicos(nome, duracao_minutos, preco)
        `)
        .single();

      if (error) {
        console.error('Error creating agendamento:', error);
        toast.error('Erro ao criar agendamento');
        return null;
      }

      setAgendamentos(prev => [...prev, newAgendamento as Agendamento]);
      toast.success('Agendamento criado com sucesso!');
      return newAgendamento;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao criar agendamento');
      return null;
    }
  };

  const updateAgendamento = async (id: string, data: Partial<AgendamentoInput>) => {
    try {
      const { data: updatedAgendamento, error } = await supabase
        .from('agendamentos')
        .update(data)
        .eq('id', id)
        .select(`
          *,
          cliente:clientes(nome, telefone, email),
          profissional:profissionais(nome),
          servico:servicos(nome, duracao_minutos, preco)
        `)
        .single();

      if (error) {
        console.error('Error updating agendamento:', error);
        toast.error('Erro ao atualizar agendamento');
        return null;
      }

      setAgendamentos(prev => 
        prev.map(a => a.id === id ? updatedAgendamento as Agendamento : a)
      );
      toast.success('Agendamento atualizado com sucesso!');
      return updatedAgendamento;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao atualizar agendamento');
      return null;
    }
  };

  const updateStatus = async (id: string, status: Agendamento['status']) => {
    return updateAgendamento(id, { status } as any);
  };

  const deleteAgendamento = async (id: string) => {
    try {
      const { error } = await supabase
        .from('agendamentos')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting agendamento:', error);
        toast.error('Erro ao excluir agendamento');
        return false;
      }

      setAgendamentos(prev => prev.filter(a => a.id !== id));
      toast.success('Agendamento excluído com sucesso!');
      return true;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao excluir agendamento');
      return false;
    }
  };

  const checkDisponibilidade = async (
    profissionalId: string,
    dataAgendamento: string,
    horaInicio: string,
    horaFim: string,
    agendamentoId?: string
  ) => {
    if (!estabelecimento) return false;

    try {
      const { data, error } = await supabase.rpc('check_horario_disponivel', {
        p_profissional_id: profissionalId,
        p_data_agendamento: dataAgendamento,
        p_hora_inicio: horaInicio,
        p_hora_fim: horaFim,
        p_agendamento_id: agendamentoId || null
      });

      if (error) {
        console.error('Error checking availability:', error);
        return false;
      }

      return data;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  const getHorariosDisponiveis = async (
    profissionalId: string,
    dataAgendamento: string,
    duracaoMinutos: number
  ) => {
    if (!estabelecimento) return [];

    try {
      const { data, error } = await supabase.rpc('get_horarios_disponiveis', {
        p_profissional_id: profissionalId,
        p_data_agendamento: dataAgendamento,
        p_duracao_minutos: duracaoMinutos
      });

      if (error) {
        console.error('Error getting available times:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };

  useEffect(() => {
    if (estabelecimento) {
      fetchAgendamentos();
    }
  }, [estabelecimento]);

  return {
    agendamentos,
    loading,
    createAgendamento,
    updateAgendamento,
    updateStatus,
    deleteAgendamento,
    checkDisponibilidade,
    getHorariosDisponiveis,
    refetch: fetchAgendamentos
  };
}