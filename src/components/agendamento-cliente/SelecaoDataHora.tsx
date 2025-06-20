
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, isBefore, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SelecaoDataHoraProps {
  dataSelecionada?: Date;
  horaSelecionada?: string;
  onDataSelecionada: (data: Date) => void;
  onHoraSelecionada: (hora: string) => void;
  onProximo: () => void;
  onVoltar: () => void;
}

export function SelecaoDataHora({ 
  dataSelecionada, 
  horaSelecionada, 
  onDataSelecionada, 
  onHoraSelecionada, 
  onProximo, 
  onVoltar 
}: SelecaoDataHoraProps) {
  // Horários disponíveis (mock - em um app real, viria do backend)
  const horariosDisponiveis = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Data e Horário</h2>
        <p className="text-gray-600">Escolha quando você gostaria de ser atendido</p>
      </div>

      {/* Seleção de Data */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Escolha a Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={dataSelecionada}
            onSelect={(date) => date && onDataSelecionada(date)}
            disabled={(date) => isBefore(date, startOfDay(new Date()))}
            className="rounded-md border w-full"
            locale={ptBR}
          />
        </CardContent>
      </Card>

      {/* Seleção de Horário */}
      {dataSelecionada && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Horários para {format(dataSelecionada, "dd 'de' MMMM", { locale: ptBR })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {horariosDisponiveis.map(horario => (
                <Button
                  key={horario}
                  variant={horaSelecionada === horario ? "default" : "outline"}
                  onClick={() => onHoraSelecionada(horario)}
                  className="h-12"
                >
                  {horario}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Botões de Navegação */}
      <div className="flex gap-3">
        <Button onClick={onVoltar} variant="outline" className="flex-1">
          Voltar
        </Button>
        {dataSelecionada && horaSelecionada && (
          <Button onClick={onProximo} className="flex-1" size="lg">
            Continuar
          </Button>
        )}
      </div>
    </div>
  );
}
