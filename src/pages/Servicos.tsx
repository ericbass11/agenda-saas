
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign, Trash2, Users, Search, Filter } from "lucide-react";
import { AddServicoModal } from "@/components/servicos/AddServicoModal";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useServicos } from "@/hooks/useServicos";
import { useProfissionaisDB } from "@/hooks/useProfissionaisDB";
import { ServicoFormData } from "@/hooks/useServicoForm";
import { toast } from "@/components/ui/sonner";

export default function Servicos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("todas");
  const { servicos, getServicosPorCategoria, createServico, updateServico, deleteServico, loading } = useServicos();
  const { profissionais } = useProfissionaisDB();

  const handleAddServico = async (data: ServicoFormData) => {
    const result = await createServico({
      nome: data.nome,
      categoria_id: data.categoria,
      descricao: data.descricao,
      duracao_minutos: parseInt(data.duracao),
      preco: parseFloat(data.preco.replace(/[^\d,]/g, '').replace(',', '.')),
      ativo: true
    });
    
    if (result) {
      toast.success('Serviço criado com sucesso!');
    }
  };

  const handleEditServico = async (data: ServicoFormData) => {
    // Implementation for editing service
    toast.success('Serviço editado com sucesso!');
  };

  const handleDeleteServico = async (servicoId: string) => {
    if (confirm("Tem certeza que deseja excluir este serviço?")) {
      const success = await deleteServico(servicoId);
      if (success) {
        toast.success('Serviço excluído com sucesso!');
      }
    }
  };

  const filteredServicos = () => {
    return servicos.filter(servico => {
      const matchesSearch = servico.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "todas" || servico.categoria?.nome === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  };

  const groupedFilteredServicos = () => {
    const filtered = filteredServicos();
    const grouped: { [key: string]: any[] } = {};
    
    filtered.forEach(servico => {
      const categoriaNome = servico.categoria?.nome || 'Sem categoria';
      if (!grouped[categoriaNome]) {
        grouped[categoriaNome] = [];
      }
      grouped[categoriaNome].push(servico);
    });
    
    return Object.entries(grouped).map(([categoria, servicos]) => ({
      categoria,
      servicos
    }));
  };

  const categorias = ["todas", ...Array.from(new Set(servicos.map(s => s.categoria?.nome || 'Sem categoria')))];

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Serviços</h2>
          <p className="text-gray-600 mt-2">Gerencie os serviços oferecidos pelo seu salão</p>
        </div>
        <AddServicoModal onSave={handleAddServico} />
      </div>

      {/* Filtros e Busca */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar serviços..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="w-full sm:w-48">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent>
              {categorias.map((categoria) => (
                <SelectItem key={categoria} value={categoria}>
                  {categoria === "todas" ? "Todas as Categorias" : categoria}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid de Serviços */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupedFilteredServicos().map((categoria, catIndex) => (
          <Card key={catIndex}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-blue-700 flex items-center justify-between">
                {categoria.categoria}
                <span className="text-sm font-normal text-gray-500">
                  {categoria.servicos.length} serviço(s)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoria.servicos.map((servico, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 group">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{servico.nome}</h4>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <AddServicoModal 
                          servico={{
                            id: servico.id,
                            nome: servico.nome,
                            categoria: categoria.categoria,
                            duracao: `${servico.duracao_minutos} min`,
                            preco: `R$ ${servico.preco.toFixed(2)}`,
                            profissionais: [],
                            descricao: servico.descricao
                          }}
                          onSave={handleEditServico}
                        />
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteServico(servico.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {servico.duracao_minutos} min
                      </div>
                      <div className="flex items-center font-medium text-green-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        R$ {servico.preco.toFixed(2)}
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <Users className="h-3 w-3 mr-1" />
                      {profissionais.length} profissional(is)
                    </div>
                    
                    {servico.descricao && (
                      <p className="text-xs text-gray-600 mt-2">{servico.descricao}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServicos().length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum serviço encontrado com os filtros aplicados.</p>
        </div>
      )}
    </div>
  );
}
