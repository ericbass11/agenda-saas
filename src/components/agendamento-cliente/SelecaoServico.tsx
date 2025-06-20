
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign } from "lucide-react";

interface Servico {
  id: number;
  nome: string;
  categoria: string;
  preco: string;
  duracao: string;
}

interface SelecaoServicoProps {
  servicos: Servico[];
  servicoSelecionado?: number;
  onServicoSelecionado: (servicoId: number) => void;
  onProximo: () => void;
}

export function SelecaoServico({ servicos, servicoSelecionado, onServicoSelecionado, onProximo }: SelecaoServicoProps) {
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todos");

  const categorias = Array.from(new Set(servicos.map(s => s.categoria)));
  
  const servicosFiltrados = filtroCategoria === "todos" 
    ? servicos 
    : servicos.filter(s => s.categoria === filtroCategoria);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Escolha o Serviço</h2>
        <p className="text-gray-600">Selecione o serviço que deseja agendar</p>
      </div>

      {/* Filtros de Categoria */}
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={filtroCategoria === "todos" ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setFiltroCategoria("todos")}
        >
          Todos
        </Badge>
        {categorias.map(categoria => (
          <Badge
            key={categoria}
            variant={filtroCategoria === categoria ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFiltroCategoria(categoria)}
          >
            {categoria}
          </Badge>
        ))}
      </div>

      {/* Lista de Serviços */}
      <div className="space-y-3">
        {servicosFiltrados.map(servico => (
          <Card 
            key={servico.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              servicoSelecionado === servico.id 
                ? "ring-2 ring-blue-500 bg-blue-50" 
                : ""
            }`}
            onClick={() => onServicoSelecionado(servico.id)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{servico.nome}</h3>
                  <p className="text-sm text-gray-500 mb-2">{servico.categoria}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {servico.duracao}
                    </div>
                    <div className="flex items-center font-medium text-green-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {servico.preco}
                    </div>
                  </div>
                </div>
                
                {servicoSelecionado === servico.id && (
                  <div className="ml-4">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Botão Próximo */}
      {servicoSelecionado && (
        <Button onClick={onProximo} className="w-full" size="lg">
          Continuar
        </Button>
      )}
    </div>
  );
}
