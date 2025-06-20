
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign, Trash2, Users, Search, Filter } from "lucide-react";
import { AddServicoModal } from "@/components/servicos/AddServicoModal";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Servicos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("todas");
  const [servicos, setServicos] = useState([
    { 
      id: 1,
      categoria: "Cabelo", 
      servicos: [
        { id: 1, nome: "Corte Feminino", duracao: "60 min", preco: "R$ 80,00", profissionais: ["Maria Silva", "Ana Costa"], descricao: "Corte personalizado para cabelos femininos" },
        { id: 2, nome: "Corte Masculino", duracao: "40 min", preco: "R$ 50,00", profissionais: ["João Santos", "Pedro Lima"], descricao: "Corte clássico masculino" },
        { id: 3, nome: "Escova", duracao: "45 min", preco: "R$ 60,00", profissionais: ["Maria Silva", "Carla Ferreira"] },
        { id: 4, nome: "Coloração", duracao: "120 min", preco: "R$ 180,00", profissionais: ["Maria Silva", "Ana Costa"] },
      ]
    },
    { 
      id: 2,
      categoria: "Unhas", 
      servicos: [
        { id: 5, nome: "Manicure", duracao: "45 min", preco: "R$ 35,00", profissionais: ["Ana Costa", "Carla Ferreira"] },
        { id: 6, nome: "Pedicure", duracao: "60 min", preco: "R$ 45,00", profissionais: ["Ana Costa", "Carla Ferreira"] },
        { id: 7, nome: "Nail Art", duracao: "30 min", preco: "R$ 25,00", profissionais: ["Ana Costa"] },
      ]
    },
    { 
      id: 3,
      categoria: "Barba", 
      servicos: [
        { id: 8, nome: "Barba Simples", duracao: "30 min", preco: "R$ 30,00", profissionais: ["João Santos", "Pedro Lima"] },
        { id: 9, nome: "Barba + Bigode", duracao: "45 min", preco: "R$ 40,00", profissionais: ["João Santos", "Pedro Lima"] },
      ]
    },
  ]);

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

  const getAllServicos = () => {
    return servicos.flatMap(categoria => 
      categoria.servicos.map(servico => ({
        ...servico,
        categoria: categoria.categoria
      }))
    );
  };

  const filteredServicos = () => {
    const allServicos = getAllServicos();
    
    return allServicos.filter(servico => {
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
