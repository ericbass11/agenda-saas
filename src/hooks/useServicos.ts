
import { useState } from 'react';

export interface Servico {
  id: number;
  nome: string;
  categoria: string;
  duracao: string;
  preco: string;
  descricao?: string;
}

// Dados iniciais dos serviços (em um app real, viria do backend)
const servicosIniciais = [
  { id: 1, nome: "Corte Feminino", categoria: "Cabelo", duracao: "60 min", preco: "R$ 80,00", descricao: "Corte personalizado para cabelos femininos" },
  { id: 2, nome: "Corte Masculino", categoria: "Cabelo", duracao: "40 min", preco: "R$ 50,00", descricao: "Corte clássico masculino" },
  { id: 3, nome: "Escova", categoria: "Cabelo", duracao: "45 min", preco: "R$ 60,00" },
  { id: 4, nome: "Coloração", categoria: "Cabelo", duracao: "120 min", preco: "R$ 180,00" },
  { id: 5, nome: "Manicure", categoria: "Unhas", duracao: "45 min", preco: "R$ 35,00" },
  { id: 6, nome: "Pedicure", categoria: "Unhas", duracao: "60 min", preco: "R$ 45,00" },
  { id: 7, nome: "Nail Art", categoria: "Unhas", duracao: "30 min", preco: "R$ 25,00" },
  { id: 8, nome: "Barba Simples", categoria: "Barba", duracao: "30 min", preco: "R$ 30,00" },
  { id: 9, nome: "Barba + Bigode", categoria: "Barba", duracao: "45 min", preco: "R$ 40,00" },
];

export function useServicos() {
  const [servicos] = useState<Servico[]>(servicosIniciais);

  const getServicosAsEspecialidades = () => {
    return servicos.map(servico => servico.nome);
  };

  const getServicosPorCategoria = () => {
    const categorias: { [key: string]: Servico[] } = {};
    servicos.forEach(servico => {
      if (!categorias[servico.categoria]) {
        categorias[servico.categoria] = [];
      }
      categorias[servico.categoria].push(servico);
    });
    return categorias;
  };

  return {
    servicos,
    getServicosAsEspecialidades,
    getServicosPorCategoria
  };
}
