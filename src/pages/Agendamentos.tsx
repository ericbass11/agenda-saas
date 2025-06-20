
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Calendar, Clock, User } from "lucide-react";

export default function Agendamentos() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Agendamentos</h2>
          <p className="text-gray-600 mt-2">Gerencie todos os agendamentos do seu salão</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agenda do Dia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 1, cliente: "Maria Silva", servico: "Corte + Escova", hora: "09:00", profissional: "Ana Costa", status: "confirmado" },
              { id: 2, cliente: "João Santos", servico: "Corte Masculino", hora: "10:30", profissional: "Carlos Lima", status: "confirmado" },
              { id: 3, cliente: "Paula Costa", servico: "Manicure", hora: "14:00", profissional: "Beatriz Silva", status: "pendente" },
              { id: 4, cliente: "Pedro Oliveira", servico: "Barba", hora: "15:30", profissional: "Carlos Lima", status: "confirmado" },
            ].map((agendamento) => (
              <div key={agendamento.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <Clock className="h-5 w-5 text-gray-400 mx-auto" />
                    <span className="text-sm font-medium">{agendamento.hora}</span>
                  </div>
                  <div>
                    <p className="font-medium">{agendamento.cliente}</p>
                    <p className="text-sm text-gray-600">{agendamento.servico}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-1" />
                    {agendamento.profissional}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    agendamento.status === 'confirmado' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {agendamento.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                  </span>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
