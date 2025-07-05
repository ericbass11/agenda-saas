import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

export interface Estabelecimento {
  id: string;
  user_id: string;
  nome: string;
  nome_responsavel: string;
  email: string;
  telefone: string;
  endereco?: string;
  logo_url?: string;
  fotos?: string[];
  horario_funcionamento?: any;
  created_at: string;
  updated_at: string;
}

export interface EstabelecimentoInput {
  nome: string;
  nome_responsavel: string;
  email: string;
  telefone: string;
  endereco?: string;
  logo_url?: string;
  fotos?: string[];
  horario_funcionamento?: any;
}

export function useEstabelecimento() {
  const [estabelecimento, setEstabelecimento] = useState<Estabelecimento | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchEstabelecimento = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('estabelecimentos')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching estabelecimento:', error);
        toast.error('Erro ao carregar estabelecimento');
        return;
      }

      setEstabelecimento(data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao carregar estabelecimento');
    } finally {
      setLoading(false);
    }
  };

  const createEstabelecimento = async (data: EstabelecimentoInput) => {
    if (!user) return null;

    try {
      const { data: newEstabelecimento, error } = await supabase
        .from('estabelecimentos')
        .insert([{
          ...data,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating estabelecimento:', error);
        toast.error('Erro ao criar estabelecimento');
        return null;
      }

      setEstabelecimento(newEstabelecimento);
      toast.success('Estabelecimento criado com sucesso!');
      return newEstabelecimento;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao criar estabelecimento');
      return null;
    }
  };

  const updateEstabelecimento = async (data: Partial<EstabelecimentoInput>) => {
    if (!estabelecimento) return null;

    try {
      const { data: updatedEstabelecimento, error } = await supabase
        .from('estabelecimentos')
        .update(data)
        .eq('id', estabelecimento.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating estabelecimento:', error);
        toast.error('Erro ao atualizar estabelecimento');
        return null;
      }

      setEstabelecimento(updatedEstabelecimento);
      toast.success('Estabelecimento atualizado com sucesso!');
      return updatedEstabelecimento;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao atualizar estabelecimento');
      return null;
    }
  };

  useEffect(() => {
    fetchEstabelecimento();
  }, [user]);

  return {
    estabelecimento,
    loading,
    createEstabelecimento,
    updateEstabelecimento,
    refetch: fetchEstabelecimento
  };
}