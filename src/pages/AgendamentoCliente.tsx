
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ClienteLayout } from "@/layouts/ClienteLayout";
import { useAgendamentoCliente } from "@/hooks/useAgendamentoCliente";
import { ClienteAuthModal } from "@/components/agendamento-cliente/ClienteAuthModal";
import { SelecaoServico } from "@/components/agendamento-cliente/SelecaoServico";
import { SelecaoProfissional } from "@/components/agendamento-cliente/SelecaoProfissional";
import { SelecaoDataHora } from "@/components/agendamento-cliente/SelecaoDataHora";
import { ConfirmacaoAgendamento } from "@/components/agendamento-cliente/ConfirmacaoAgendamento";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone } from "lucide-react";

export default function AgendamentoCliente() {
  const { estabelecimentoId } = useParams<{ estabelecimentoId: string }>();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { toast } = useToast();
  
  const {
    etapaAtual,
    agendamento,
    clienteLogado,
    estabelecimento,
    servicos,
    profissionais,
    isLoading,
    setClienteLogado,
    atualizarAgendamento,
    proximaEtapa,
    etapaAnterior,
    finalizarAgendamento,
  } = useAgendamentoCliente(estabelecimentoId || "1");

  const etapas = [
    "Serviço",
    "Profissional", 
    "Data e Hora",
    "Confirmação"
  ];

  const handleContinuarParaProximo = () => {
    if (!clienteLogado) {
      setShowAuthModal(true);
      return;
    }
    proximaEtapa();
  };

  const handleFinalizarAgendamento = async () => {
    const sucesso = await finalizarAgendamento();
    if (sucesso) {
      toast({
        title: "Agendamento realizado com sucesso!",
        description: "Você receberá uma confirmação no WhatsApp em instantes.",
      });
      // Aqui poderia redirecionar para uma página de sucesso
    } else {
      toast({
        title: "Erro ao finalizar agendamento",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const servicoSelecionado = servicos.find(s => s.id === agendamento.servicoId);
  const profissionalSelecionado = profissionais.find(p => p.id === agendamento.profissionalId);

  return (
    <ClienteLayout>
      <div className="space-y-6">
        {/* Informações do Estabelecimento */}
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

        {/* Progresso */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Etapa {etapaAtual + 1} de {etapas.length}</span>
            <span>{etapas[etapaAtual]}</span>
          </div>
          <Progress value={((etapaAtual + 1) / etapas.length) * 100} className="h-2" />
        </div>

        {/* Status do Cliente */}
        {clienteLogado && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <p className="text-green-800 text-sm">
                Logado como: <strong>{clienteLogado.nome}</strong>
              </p>
            </CardContent>
          </Card>
        )}

        {/* Etapas do Agendamento */}
        {etapaAtual === 0 && (
          <SelecaoServico
            servicos={servicos}
            servicoSelecionado={agendamento.servicoId}
            onServicoSelecionado={(servicoId) => atualizarAgendamento({ servicoId })}
            onProximo={handleContinuarParaProximo}
          />
        )}

        {etapaAtual === 1 && (
          <SelecaoProfissional
            profissionais={profissionais}
            profissionalSelecionado={agendamento.profissionalId}
            onProfissionalSelecionado={(profissionalId) => atualizarAgendamento({ profissionalId })}
            onProximo={proximaEtapa}
            onVoltar={etapaAnterior}
          />
        )}

        {etapaAtual === 2 && (
          <SelecaoDataHora
            dataSelecionada={agendamento.data}
            horaSelecionada={agendamento.hora}
            onDataSelecionada={(data) => atualizarAgendamento({ data })}
            onHoraSelecionada={(hora) => atualizarAgendamento({ hora })}
            onProximo={proximaEtapa}
            onVoltar={etapaAnterior}
          />
        )}

        {etapaAtual === 3 && (
          <ConfirmacaoAgendamento
            agendamento={agendamento}
            estabelecimento={estabelecimento}
            servicoNome={servicoSelecionado?.nome || ""}
            profissionalNome={profissionalSelecionado?.nome}
            onConfirmar={handleFinalizarAgendamento}
            onVoltar={etapaAnterior}
            isLoading={isLoading}
          />
        )}

        {/* Botão de Login/Cadastro */}
        {!clienteLogado && etapaAtual > 0 && (
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6 text-center">
              <p className="text-yellow-800 mb-4">
                Você precisa fazer login ou se cadastrar para continuar
              </p>
              <Button onClick={() => setShowAuthModal(true)}>
                Fazer Login / Cadastro
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal de Autenticação */}
      <ClienteAuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        onClienteLogado={(cliente) => {
          setClienteLogado(cliente);
          atualizarAgendamento({ cliente });
        }}
      />
    </ClienteLayout>
  );
}
