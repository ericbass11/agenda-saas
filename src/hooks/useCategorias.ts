
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useEstabelecimento } from './useEstabelecimento';
import { toast } from '@/components/ui/sonner';

export interface Categoria {
  id: string;
  estabelecimento_id: string;
  nome: string;
  created_at: string;
  updated_at: string;
}

export interface CategoriaInput {
  nome: string;
}

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const { estabelecimento } = useEstabelecimento();

  const fetchCategorias = async () => {
    if (!estabelecimento) return;
    
    try {
      const { data, error } = await supabase
        .from('categorias_servicos')
        .select('*')
        .eq('estabelecimento_id', estabelecimento.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching categorias:', error);
        toast.error('Erro ao carregar categorias');
        return;
      }

      setCategorias(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao carregar categorias');
    } finally {
      setLoading(false);
    }
  };

  const createCategoriasIniciais = async () => {
    if (!estabelecimento) return;

    const categoriasIniciais = [
      "Cabelo", "Unhas", "Barba", "Tratamentos Faciais", 
      "Massagens", "Depilação", "Sobrancelhas", "Outros"
    ];

    try {
      const { data, error } = await supabase
        .from('categorias_servicos')
        .insert(
          categoriasIniciais.map(nome => ({
            nome,
            estabelecimento_id: estabelecimento.id
          }))
        )
        .select();

      if (error) {
        console.error('Error creating initial categorias:', error);
        return;
      }

      setCategorias(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addCategoria = async (nome: string) => {
    if (!estabelecimento) return null;

    try {
      const { data: newCategoria, error } = await supabase
        .from('categorias_servicos')
        .insert([{
          nome,
          estabelecimento_id: estabelecimento.id
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating categoria:', error);
        toast.error('Erro ao criar categoria');
        return null;
      }

      setCategorias(prev => [newCategoria, ...prev]);
      toast.success('Categoria criada com sucesso!');
      return newCategoria;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao criar categoria');
      return null;
    }
  };

  const updateCategoria = async (id: string, nome: string) => {
    try {
      const { data: updatedCategoria, error } = await supabase
        .from('categorias_servicos')
        .update({ nome })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating categoria:', error);
        toast.error('Erro ao atualizar categoria');
        return null;
      }

      setCategorias(prev => 
        prev.map(cat => cat.id === id ? updatedCategoria : cat)
      );
      toast.success('Categoria atualizada com sucesso!');
      return updatedCategoria;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao atualizar categoria');
      return null;
    }
  };

  const deleteCategoria = async (id: string) => {
    try {
      const { error } = await supabase
        .from('categorias_servicos')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting categoria:', error);
        toast.error('Erro ao excluir categoria');
        return false;
      }

      setCategorias(prev => prev.filter(cat => cat.id !== id));
      toast.success('Categoria excluída com sucesso!');
      return true;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao excluir categoria');
      return false;
    }
  };

  const getCategoriaNomes = () => {
    return categorias.map(cat => cat.nome);
  };

  useEffect(() => {
    if (estabelecimento) {
      fetchCategorias();
    }
  }, [estabelecimento]);

  // Create initial categories if none exist
  useEffect(() => {
    if (estabelecimento && !loading && categorias.length === 0) {
      createCategoriasIniciais();
    }
  }, [estabelecimento, loading, categorias.length]);

  return {
    categorias,
    loading,
    addCategoria,
    updateCategoria,
    deleteCategoria,
    getCategoriaNomes,
    refetch: fetchCategorias
  };
}
