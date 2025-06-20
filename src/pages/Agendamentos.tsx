
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Plus, Calendar as CalendarIcon, Clock, User, Filter } from "lucide-react";
import { format, isSameDay, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AddAgendamentoModal } from "@/components/agendamentos/AddAgendamentoModal";
import { AgendamentoCard } from "@/components/agendamentos/AgendamentoCard";
import { ViewToggle } from "@/components/agendamentos/ViewToggle";

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

const agendamentosMock: Agendamento[] = [
  { 
    id: 1, 
    cliente: "Maria Silva", 
    servico: "Corte + Escova", 
    data: new Date(), 
    hora: "09:00", 
    profissional: "Ana Costa", 
    status: "confirmado",
    telefone: "(11) 99999-1111"
  },
  { 
    id: 2, 
    cliente: "João Santos", 
    servico: "Corte Masculino", 
    data: new Date(), 
    hora: "10:30", 
    profissional: "Carlos Lima", 
    status: "confirmado",
    telefone: "(11) 99999-2222"
  },
  { 
    id: 3, 
    cliente: "Paula Costa", 
    servico: "Manicure", 
    data: new Date(), 
    hora: "14:00", 
    profissional: "Beatriz Silva", 
    status: "pendente",
    telefone: "(11) 99999-3333"
  },
];

type ViewMode = 'dia' | 'semana' | 'mes';

export default function Agendamentos() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('dia');
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(agendamentosMock);

  const handleAddAgendamento = (novoAgendamento: Omit<Agendamento, 'id'>) => {
    const agendamento: Agendamento = {
      ...novoAgendamento,
      id: Date.now(),
    };
    setAgendamentos(prev => [...prev, agendamento]);
  };

  const getAgendamentosForDate = (date: Date) => {
    return agendamentos.filter(ag => isSameDay(ag.data, date));
  };

  const getAgendamentosForWeek = (date: Date) => {
    const start = startOfWeek(date, { locale: ptBR });
    const end = endOfWeek(date, { locale: ptBR });
    return agendamentos.filter(ag => ag.data >= start && ag.data <= end);
  };

  const renderDayView = () => {
    const agendamentosHoje = getAgendamentosForDate(selectedDate);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Agenda de {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </h3>
          <span className="text-sm text-gray-500">
            {agendamentosHoje.length} agendamento(s)
          </span>
        </div>
        
        <div className="space-y-3">
          {agendamentosHoje.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500">Nenhum agendamento para este dia</p>
            </Card>
          ) : (
            agendamentosHoje
              .sort((a, b) => a.hora.localeCompare(b.hora))
              .map((agendamento) => (
                <AgendamentoCard key={agendamento.id} agendamento={agendamento} />
              ))
          )}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = eachDayOfInterval({
      start: startOfWeek(selectedDate, { locale: ptBR }),
      end: endOfWeek(selectedDate, { locale: ptBR })
    });

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Semana de {format(weekDays[0], "dd/MM", { locale: ptBR })} a {format(weekDays[6], "dd/MM", { locale: ptBR })}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {weekDays.map((day) => {
            const agendamentosDay = getAgendamentosForDate(day);
            const isToday = isSameDay(day, new Date());
            const isSelected = isSameDay(day, selectedDate);
            
            return (
              <Card 
                key={day.toISOString()} 
                className={`cursor-pointer transition-colors ${
                  isSelected ? 'ring-2 ring-blue-500' : ''
                } ${isToday ? 'bg-blue-50' : ''}`}
                onClick={() => setSelectedDate(day)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    {format(day, "EEE dd", { locale: ptBR })}
                    {isToday && <span className="text-blue-600 ml-1">(Hoje)</span>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    {agendamentosDay.slice(0, 3).map((ag) => (
                      <div key={ag.id} className="text-xs p-1 bg-gray-100 rounded">
                        {ag.hora} - {ag.cliente}
                      </div>
                    ))}
                    {agendamentosDay.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{agendamentosDay.length - 3} mais
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    return (
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
            modifiers={{
              hasAgendamento: (date) => getAgendamentosForDate(date).length > 0
            }}
            modifiersStyles={{
              hasAgendamento: { fontWeight: 'bold', color: '#2563eb' }
            }}
          />
        </div>
        
        <div className="flex-1">
          {renderDayView()}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Agendamentos</h2>
          <p className="text-gray-600 mt-2">Gerencie todos os agendamentos do seu salão</p>
        </div>
        
        <div className="flex items-center gap-2">
          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          <AddAgendamentoModal onAddAgendamento={handleAddAgendamento} />
        </div>
      </div>

      {viewMode === 'dia' && renderDayView()}
      {viewMode === 'semana' && renderWeekView()}
      {viewMode === 'mes' && renderMonthView()}
    </div>
  );
}
