
import { useState } from 'react';

export interface Categoria {
  id: number;
  nome: string;
}

const categoriasIniciais = [
  { id: 1, nome: "Cabelo" },
  { id: 2, nome: "Unhas" },
  { id: 3, nome: "Barba" },
  { id: 4, nome: "Tratamentos Faciais" },
  { id: 5, nome: "Massagens" },
  { id: 6, nome: "Depilação" },
  { id: 7, nome: "Sobrancelhas" },
  { id: 8, nome: "Outros" }
];

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>(categoriasIniciais);

  const addCategoria = (nome: string) => {
    const novaCategoria: Categoria = {
      id: Date.now(),
      nome
    };
    setCategorias(prev => [...prev, novaCategoria]);
  };

  const updateCategoria = (id: number, nome: string) => {
    setCategorias(prev => 
      prev.map(cat => cat.id === id ? { ...cat, nome } : cat)
    );
  };

  const deleteCategoria = (id: number) => {
    setCategorias(prev => prev.filter(cat => cat.id !== id));
  };

  const getCategoriaNomes = () => {
    return categorias.map(cat => cat.nome);
  };

  return {
    categorias,
    addCategoria,
    updateCategoria,
    deleteCategoria,
    getCategoriaNomes
  };
}
