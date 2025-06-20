
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, User, Phone, Edit, Trash2 } from "lucide-react";

interface Agendamento {
  id: number;
  cliente: string;
  servico: string;
  data: Date;
  hora: string;
  profissional: string;
  status: 'confirmado' | 'pendente' | 'cancelado';
  telefone?: string;
  observacoes?: string;
}

interface AgendamentoCardProps {
  agendamento: Agendamento;
}

export function AgendamentoCard({ agendamento }: AgendamentoCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'bg-green-100 text-green-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'Confirmado';
      case 'pendente':
        return 'Pendente';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <Clock className="h-5 w-5 text-gray-400 mx-auto" />
              <span className="text-sm font-medium">{agendamento.hora}</span>
            </div>
            
            <div className="flex-1">
              <p className="font-medium text-lg">{agendamento.cliente}</p>
              <p className="text-sm text-gray-600">{agendamento.servico}</p>
              
              <div className="flex items-center mt-1 space-x-4">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-1" />
                  {agendamento.profissional}
                </div>
                
                {agendamento.telefone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-1" />
                    {agendamento.telefone}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agendamento.status)}`}>
              {getStatusText(agendamento.status)}
            </span>
            
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {agendamento.observacoes && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-sm text-gray-600">
              <strong>Observações:</strong> {agendamento.observacoes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
