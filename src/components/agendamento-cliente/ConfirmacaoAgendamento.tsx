
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Calendar, Clock, User, Phone, MapPin } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AgendamentoData, Estabelecimento } from "@/hooks/useAgendamentoCliente";

interface ConfirmacaoAgendamentoProps {
  agendamento: Partial<AgendamentoData>;
  estabelecimento: Estabelecimento;
  servicoNome: string;
  profissionalNome?: string;
  onConfirmar: () => void;
  onVoltar: () => void;
  isLoading: boolean;
}

export function ConfirmacaoAgendamento({
  agendamento,
  estabelecimento,
  servicoNome,
  profissionalNome,
  onConfirmar,
  onVoltar,
  isLoading
}: ConfirmacaoAgendamentoProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirme seu Agendamento</h2>
        <p className="text-gray-600">Revise os dados antes de finalizar</p>
      </div>

      {/* Dados do Estabelecimento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {estabelecimento.nome}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-2">{estabelecimento.endereco}</p>
          <p className="text-gray-600 flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {estabelecimento.telefone}
          </p>
        </CardContent>
      </Card>

      {/* Dados do Agendamento */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Agendamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium">Data</p>
              <p className="text-gray-600">
                {agendamento.data && format(agendamento.data, "EEEE, dd 'de' MMMM 'de' yyyy", { 
                  locale: ptBR 
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium">Horário</p>
              <p className="text-gray-600">{agendamento.hora}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium">Serviço</p>
              <p className="text-gray-600">{servicoNome}</p>
            </div>
          </div>

          {profissionalNome && (
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Profissional</p>
                <p className="text-gray-600">{profissionalNome}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium">Cliente</p>
              <p className="text-gray-600">{agendamento.cliente?.nome}</p>
              <p className="text-gray-600 text-sm">{agendamento.cliente?.telefone}</p>
            </div>
          </div>

          {agendamento.observacoes && (
            <div>
              <p className="font-medium mb-1">Observações</p>
              <p className="text-gray-600">{agendamento.observacoes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex gap-3">
        <Button onClick={onVoltar} variant="outline" className="flex-1">
          Voltar
        </Button>
        <Button 
          onClick={onConfirmar} 
          className="flex-1" 
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? "Confirmando..." : "Confirmar Agendamento"}
        </Button>
      </div>

      {/* Informações sobre confirmação */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-blue-800 text-sm text-center">
            Após a confirmação, você receberá uma mensagem no WhatsApp com todos os detalhes do agendamento
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
