
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Clock, DollarSign } from "lucide-react";

export default function Servicos() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Serviços</h2>
          <p className="text-gray-600 mt-2">Gerencie os serviços oferecidos pelo seu salão</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Serviço
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { categoria: "Cabelo", servicos: [
            { nome: "Corte Feminino", duracao: "60 min", preco: "R$ 80,00" },
            { nome: "Corte Masculino", duracao: "40 min", preco: "R$ 50,00" },
            { nome: "Escova", duracao: "45 min", preco: "R$ 60,00" },
            { nome: "Coloração", duracao: "120 min", preco: "R$ 180,00" },
          ]},
          { categoria: "Unhas", servicos: [
            { nome: "Manicure", duracao: "45 min", preco: "R$ 35,00" },
            { nome: "Pedicure", duracao: "60 min", preco: "R$ 45,00" },
            { nome: "Nail Art", duracao: "30 min", preco: "R$ 25,00" },
          ]},
          { categoria: "Barba", servicos: [
            { nome: "Barba Simples", duracao: "30 min", preco: "R$ 30,00" },
            { nome: "Barba + Bigode", duracao: "45 min", preco: "R$ 40,00" },
          ]},
        ].map((categoria, catIndex) => (
          <Card key={catIndex}>
            <CardHeader>
              <CardTitle className="text-lg text-blue-700">{categoria.categoria}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoria.servicos.map((servico, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-gray-50">
                    <h4 className="font-medium">{servico.nome}</h4>
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
