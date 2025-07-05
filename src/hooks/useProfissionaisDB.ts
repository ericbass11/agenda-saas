import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useEstabelecimento } from './useEstabelecimento';
import { toast } from '@/components/ui/sonner';

export interface Profissional {
  id: string;
  estabelecimento_id: string;
  nome: string;
  email: string;
  telefone: string;
  biografia?: string;
  foto_url?: string;
  horarios_trabalho?: any;
  dias_folga?: string[];
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfissionalInput {
  nome: string;
  email: string;
  telefone: string;
  biografia?: string;
  foto_url?: string;
  horarios_trabalho?: any;
  dias_folga?: string[];
  ativo?: boolean;
}

export function useProfissionaisDB() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState(true);
  const { estabelecimento } = useEstabelecimento();

  const fetchProfissionais = async () => {
    if (!estabelecimento) return;
    
    try {
      const { data, error } = await supabase
        .from('profissionais')
        .select('*')
        .eq('estabelecimento_id', estabelecimento.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching profissionais:', error);
        toast.error('Erro ao carregar profissionais');
        return;
      }

      setProfissionais(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao carregar profissionais');
    } finally {
      setLoading(false);
    }
  };

  const createProfissional = async (data: ProfissionalInput) => {
    if (!estabelecimento) return null;

    try {
      const { data: newProfissional, error } = await supabase
        .from('profissionais')
        .insert([{
          ...data,
          estabelecimento_id: estabelecimento.id
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating profissional:', error);
        toast.error('Erro ao criar profissional');
        return null;
      }

      setProfissionais(prev => [newProfissional, ...prev]);
      toast.success('Profissional criado com sucesso!');
      return newProfissional;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao criar profissional');
      return null;
    }
  };

  const updateProfissional = async (id: string, data: Partial<ProfissionalInput>) => {
    try {
      const { data: updatedProfissional, error } = await supabase
        .from('profissionais')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating profissional:', error);
        toast.error('Erro ao atualizar profissional');
        return null;
      }

      setProfissionais(prev => 
        prev.map(p => p.id === id ? updatedProfissional : p)
      );
      toast.success('Profissional atualizado com sucesso!');
      return updatedProfissional;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao atualizar profissional');
      return null;
    }
  };

  const deleteProfissional = async (id: string) => {
    try {
      const { error } = await supabase
        .from('profissionais')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting profissional:', error);
        toast.error('Erro ao excluir profissional');
        return false;
      }

      setProfissionais(prev => prev.filter(p => p.id !== id));
      toast.success('Profissional excluído com sucesso!');
      return true;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao excluir profissional');
      return false;
    }
  };

  useEffect(() => {
    if (estabelecimento) {
      fetchProfissionais();
    }
  }, [estabelecimento]);

  return {
    profissionais,
    loading,
    createProfissional,
    updateProfissional,
    deleteProfissional,
    refetch: fetchProfissionais
  };
}