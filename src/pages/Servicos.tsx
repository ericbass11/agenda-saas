
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign, Trash2, Users, Search, Filter } from "lucide-react";
import { AddServicoModal } from "@/components/servicos/AddServicoModal";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useServicos } from "@/hooks/useServicos";

export default function Servicos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("todas");
  const { servicos, getServicosPorCategoria } = useServicos();

  // Lista de profissionais mockada (em um app real, viria do contexto ou backend)
  const profissionaisDisponiveis = [
    "Maria Silva", "João Santos", "Ana Costa", "Pedro Lima", "Carla Ferreira"
  ];

  // Associação temporária de profissionais a serviços (em um app real, seria dinâmica)
  const servicosComProfissionais = servicos.map(servico => ({
    ...servico,
    profissionais: profissionaisDisponiveis.slice(0, Math.floor(Math.random() * 3) + 1)
  }));

  const handleAddServico = (data: any) => {
    console.log("Novo serviço:", data);
    // Aqui você adicionaria o serviço ao estado/banco de dados
  };

  const handleEditServico = (data: any) => {
    console.log("Editando serviço:", data);
    // Aqui você atualizaria o serviço no estado/banco de dados
  };

  const handleDeleteServico = (servicoId: number) => {
    console.log("Deletando serviço:", servicoId);
    // Aqui você removeria o serviço do estado/banco de dados
  };

  const filteredServicos = () => {
    return servicosComProfissionais.filter(servico => {
      const matchesSearch = servico.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "todas" || servico.categoria === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  };

  const groupedFilteredServicos = () => {
    const filtered = filteredServicos();
    const grouped: { [key: string]: any[] } = {};
    
    filtered.forEach(servico => {
      if (!grouped[servico.categoria]) {
        grouped[servico.categoria] = [];
      }
      grouped[servico.categoria].push(servico);
    });
    
    return Object.entries(grouped).map(([categoria, servicos]) => ({
      categoria,
      servicos
    }));
  };

  const categorias = ["todas", ...Array.from(new Set(servicos.map(s => s.categoria)))];

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
                            duracao: servico.duracao,
                            preco: servico.preco,
                            profissionais: servico.profissionais,
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
                        {servico.duracao}
                      </div>
                      <div className="flex items-center font-medium text-green-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {servico.preco}
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <Users className="h-3 w-3 mr-1" />
                      {servico.profissionais.length} profissional(is)
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
