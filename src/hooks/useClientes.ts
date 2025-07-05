import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useEstabelecimento } from './useEstabelecimento';
import { toast } from '@/components/ui/sonner';

export interface Cliente {
  id: string;
  estabelecimento_id: string;
  nome: string;
  telefone: string;
  email?: string;
  data_nascimento?: string;
  observacoes?: string;
  created_at: string;
  updated_at: string;
}

export interface ClienteInput {
  nome: string;
  telefone: string;
  email?: string;
  data_nascimento?: string;
  observacoes?: string;
}

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const { estabelecimento } = useEstabelecimento();

  const fetchClientes = async () => {
    if (!estabelecimento) return;
    
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('estabelecimento_id', estabelecimento.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching clientes:', error);
        toast.error('Erro ao carregar clientes');
        return;
      }

      setClientes(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao carregar clientes');
    } finally {
      setLoading(false);
    }
  };

  const createCliente = async (data: ClienteInput) => {
    if (!estabelecimento) return null;

    try {
      const { data: newCliente, error } = await supabase
        .from('clientes')
        .insert([{
          ...data,
          estabelecimento_id: estabelecimento.id
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating cliente:', error);
        toast.error('Erro ao criar cliente');
        return null;
      }

      setClientes(prev => [newCliente, ...prev]);
      toast.success('Cliente criado com sucesso!');
      return newCliente;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao criar cliente');
      return null;
    }
  };

  const updateCliente = async (id: string, data: Partial<ClienteInput>) => {
    try {
      const { data: updatedCliente, error } = await supabase
        .from('clientes')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating cliente:', error);
        toast.error('Erro ao atualizar cliente');
        return null;
      }

      setClientes(prev => 
        prev.map(c => c.id === id ? updatedCliente : c)
      );
      toast.success('Cliente atualizado com sucesso!');
      return updatedCliente;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao atualizar cliente');
      return null;
    }
  };

  const deleteCliente = async (id: string) => {
    try {
      const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting cliente:', error);
        toast.error('Erro ao excluir cliente');
        return false;
      }

      setClientes(prev => prev.filter(c => c.id !== id));
      toast.success('Cliente excluído com sucesso!');
      return true;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao excluir cliente');
      return false;
    }
  };

  const findClienteByTelefone = async (telefone: string) => {
    if (!estabelecimento) return null;

    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('estabelecimento_id', estabelecimento.id)
        .eq('telefone', telefone)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error finding cliente:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  useEffect(() => {
    if (estabelecimento) {
      fetchClientes();
    }
  }, [estabelecimento]);

  return {
    clientes,
    loading,
    createCliente,
    updateCliente,
    deleteCliente,
    findClienteByTelefone,
    refetch: fetchClientes
  };
}