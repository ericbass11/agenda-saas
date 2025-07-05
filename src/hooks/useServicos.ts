
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useEstabelecimento } from './useEstabelecimento';
import { useCategorias } from './useCategorias';
import { toast } from '@/components/ui/sonner';

export interface Servico {
  id: string;
  estabelecimento_id: string;
  categoria_id?: string;
  nome: string;
  descricao?: string;
  duracao_minutos: number;
  preco: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
  categoria?: {
    nome: string;
  };
}

export interface ServicoInput {
  nome: string;
  categoria_id?: string;
  descricao?: string;
  duracao_minutos: number;
  preco: number;
  ativo?: boolean;
}

export function useServicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const { estabelecimento } = useEstabelecimento();
  const { categorias } = useCategorias();

  const fetchServicos = async () => {
    if (!estabelecimento) return;
    
    try {
      const { data, error } = await supabase
        .from('servicos')
        .select(`
          *,
          categoria:categorias_servicos(nome)
        `)
        .eq('estabelecimento_id', estabelecimento.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching servicos:', error);
        toast.error('Erro ao carregar serviços');
        return;
      }

      setServicos(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao carregar serviços');
    } finally {
      setLoading(false);
    }
  };

  const createServico = async (data: ServicoInput) => {
    if (!estabelecimento) return null;

    try {
      const { data: newServico, error } = await supabase
        .from('servicos')
        .insert([{
          ...data,
          estabelecimento_id: estabelecimento.id
        }])
        .select(`
          *,
          categoria:categorias_servicos(nome)
        `)
        .single();

      if (error) {
        console.error('Error creating servico:', error);
        toast.error('Erro ao criar serviço');
        return null;
      }

      setServicos(prev => [newServico, ...prev]);
      toast.success('Serviço criado com sucesso!');
      return newServico;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao criar serviço');
      return null;
    }
  };

  const updateServico = async (id: string, data: Partial<ServicoInput>) => {
    try {
      const { data: updatedServico, error } = await supabase
        .from('servicos')
        .update(data)
        .eq('id', id)
        .select(`
          *,
          categoria:categorias_servicos(nome)
        `)
        .single();

      if (error) {
        console.error('Error updating servico:', error);
        toast.error('Erro ao atualizar serviço');
        return null;
      }

      setServicos(prev => 
        prev.map(s => s.id === id ? updatedServico : s)
      );
      toast.success('Serviço atualizado com sucesso!');
      return updatedServico;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao atualizar serviço');
      return null;
    }
  };

  const deleteServico = async (id: string) => {
    try {
      const { error } = await supabase
        .from('servicos')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting servico:', error);
        toast.error('Erro ao excluir serviço');
        return false;
      }

      setServicos(prev => prev.filter(s => s.id !== id));
      toast.success('Serviço excluído com sucesso!');
      return true;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao excluir serviço');
      return false;
    }
  };

  const getServicosAsEspecialidades = () => {
    return servicos.map(servico => servico.nome);
  };

  const getServicosPorCategoria = () => {
    const categoriasPorNome: { [key: string]: Servico[] } = {};
    servicos.forEach(servico => {
      const nomeCategoria = servico.categoria?.nome || 'Sem categoria';
      if (!categoriasPorNome[nomeCategoria]) {
        categoriasPorNome[nomeCategoria] = [];
      }
      categoriasPorNome[nomeCategoria].push(servico);
    });
    return categoriasPorNome;
  };

  useEffect(() => {
    if (estabelecimento) {
      fetchServicos();
    }
  }, [estabelecimento]);

  return {
    servicos,
    loading,
    createServico,
    updateServico,
    deleteServico,
    getServicosAsEspecialidades,
    getServicosPorCategoria,
    refetch: fetchServicos
  };
}
