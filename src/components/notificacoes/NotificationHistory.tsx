
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Phone, Calendar, Search, Filter } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Notification {
  id: number;
  cliente: string;
  telefone: string;
  tipo: 'confirmacao' | 'lembrete' | 'cancelamento' | 'reagendamento';
  status: 'enviado' | 'entregue' | 'lido' | 'falhou';
  mensagem: string;
  dataEnvio: Date;
  agendamento: {
    servico: string;
    profissional: string;
    data: Date;
  };
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    cliente: "Maria Silva",
    telefone: "(11) 99999-1111",
    tipo: "confirmacao",
    status: "entregue",
    mensagem: "Olá Maria! Seu agendamento de Corte + Escova com Ana Costa foi confirmado para 20/12/2024 às 14:00. Até lá! 😊",
    dataEnvio: new Date(),
    agendamento: {
      servico: "Corte + Escova",
      profissional: "Ana Costa",
      data: new Date("2024-12-20T14:00:00")
    }
  },
  {
    id: 2,
    cliente: "João Santos",
    telefone: "(11) 99999-2222",
    tipo: "lembrete",
    status: "lido",
    mensagem: "Olá João! Lembrete: você tem um agendamento de Corte Masculino amanhã (19/12/2024) às 10:30 com Carlos Lima. Nos vemos lá! 🌟",
    dataEnvio: new Date(Date.now() - 2 * 60 * 60 * 1000),
    agendamento: {
      servico: "Corte Masculino",
      profissional: "Carlos Lima",
      data: new Date("2024-12-19T10:30:00")
    }
  },
  {
    id: 3,
    cliente: "Paula Costa",
    telefone: "(11) 99999-3333",
    tipo: "cancelamento",
    status: "falhou",
    mensagem: "Olá Paula! Seu agendamento de Manicure para 18/12/2024 às 16:00 foi cancelado. Entre em contato conosco para reagendar. 📞",
    dataEnvio: new Date(Date.now() - 4 * 60 * 60 * 1000),
    agendamento: {
      servico: "Manicure",
      profissional: "Beatriz Silva",
      data: new Date("2024-12-18T16:00:00")
    }
  }
];

export function NotificationHistory() {
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [typeFilter, setTypeFilter] = useState("todos");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enviado':
        return 'bg-blue-100 text-blue-800';
      case 'entregue':
        return 'bg-green-100 text-green-800';
      case 'lido':
        return 'bg-purple-100 text-purple-800';
      case 'falhou':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'enviado':
        return 'Enviado';
      case 'entregue':
        return 'Entregue';
      case 'lido':
        return 'Lido';
      case 'falhou':
        return 'Falhou';
      default:
        return status;
    }
  };

  const getTypeColor = (tipo: string) => {
    switch (tipo) {
      case 'confirmacao':
        return 'bg-green-100 text-green-800';
      case 'lembrete':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelamento':
        return 'bg-red-100 text-red-800';
      case 'reagendamento':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (tipo: string) => {
    switch (tipo) {
      case 'confirmacao':
        return 'Confirmação';
      case 'lembrete':
        return 'Lembrete';
      case 'cancelamento':
        return 'Cancelamento';
      case 'reagendamento':
        return 'Reagendamento';
      default:
        return tipo;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.telefone.includes(searchTerm);
    const matchesStatus = statusFilter === "todos" || notification.status === statusFilter;
    const matchesType = typeFilter === "todos" || notification.tipo === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
          Histórico de Mensagens
        </CardTitle>
        
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por cliente ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="w-full sm:w-40">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="enviado">Enviado</SelectItem>
                <SelectItem value="entregue">Entregue</SelectItem>
                <SelectItem value="lido">Lido</SelectItem>
                <SelectItem value="falhou">Falhou</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-40">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="confirmacao">Confirmação</SelectItem>
                <SelectItem value="lembrete">Lembrete</SelectItem>
                <SelectItem value="cancelamento">Cancelamento</SelectItem>
                <SelectItem value="reagendamento">Reagendamento</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma mensagem encontrada.</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div key={notification.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium">{notification.cliente}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-3 w-3 mr-1" />
                        {notification.telefone}
                      </div>
                      <Badge className={getTypeColor(notification.tipo)}>
                        {getTypeText(notification.tipo)}
                      </Badge>
                      <Badge className={getStatusColor(notification.status)}>
                        {getStatusText(notification.status)}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">{notification.mensagem}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Agendamento: {notification.agendamento.servico} - {' '}
                        {format(notification.agendamento.data, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </div>
                      <div>
                        Enviado: {format(notification.dataEnvio, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
