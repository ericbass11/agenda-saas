
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function ConfiguracoesAgendamento() {
  const [configuracoes, setConfiguracoes] = useState({
    antecedenciaMinima: '2',
    antecedenciaMaxima: '30',
    intervaloEntreServicos: '15',
    permitirAgendamentoSimultaneo: false,
    confirmarAgendamento: true,
    cancelarAntecedencia: '24'
  });
  
  const { toast } = useToast();

  const handleChange = (campo: string, valor: string) => {
    setConfiguracoes(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleToggle = (campo: string) => {
    setConfiguracoes(prev => ({
      ...prev,
      [campo]: !prev[campo]
    }));
  };

  const handleSalvar = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações de agendamento foram atualizadas com sucesso."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Agendamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="antecedencia-minima">Antecedência Mínima (horas)</Label>
            <Select value={configuracoes.antecedenciaMinima} onValueChange={(value) => handleChange('antecedenciaMinima', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 hora</SelectItem>
                <SelectItem value="2">2 horas</SelectItem>
                <SelectItem value="4">4 horas</SelectItem>
                <SelectItem value="12">12 horas</SelectItem>
                <SelectItem value="24">24 horas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="antecedencia-maxima">Antecedência Máxima (dias)</Label>
            <Select value={configuracoes.antecedenciaMaxima} onValueChange={(value) => handleChange('antecedenciaMaxima', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 dias</SelectItem>
                <SelectItem value="15">15 dias</SelectItem>
                <SelectItem value="30">30 dias</SelectItem>
                <SelectItem value="60">60 dias</SelectItem>
                <SelectItem value="90">90 dias</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="intervalo-servicos">Intervalo entre Serviços (minutos)</Label>
          <Select value={configuracoes.intervaloEntreServicos} onValueChange={(value) => handleChange('intervaloEntreServicos', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Sem intervalo</SelectItem>
              <SelectItem value="5">5 minutos</SelectItem>
              <SelectItem value="10">10 minutos</SelectItem>
              <SelectItem value="15">15 minutos</SelectItem>
              <SelectItem value="30">30 minutos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="cancelar-antecedencia">Cancelar com antecedência mínima (horas)</Label>
          <Select value={configuracoes.cancelarAntecedencia} onValueChange={(value) => handleChange('cancelarAntecedencia', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 horas</SelectItem>
              <SelectItem value="4">4 horas</SelectItem>
              <SelectItem value="12">12 horas</SelectItem>
              <SelectItem value="24">24 horas</SelectItem>
              <SelectItem value="48">48 horas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded">
            <Label htmlFor="agendamento-simultaneo" className="font-medium">
              Permitir Agendamento Simultâneo
            </Label>
            <Switch
              id="agendamento-simultaneo"
              checked={configuracoes.permitirAgendamentoSimultaneo}
              onCheckedChange={() => handleToggle('permitirAgendamentoSimultaneo')}
            />
          </div>

          <div className="flex items-center justify-between p-3 border rounded">
            <Label htmlFor="confirmar-agendamento" className="font-medium">
              Exigir Confirmação de Agendamento
            </Label>
            <Switch
              id="confirmar-agendamento"
              checked={configuracoes.confirmarAgendamento}
              onCheckedChange={() => handleToggle('confirmarAgendamento')}
            />
          </div>
        </div>

        <Button onClick={handleSalvar} className="w-full">
          Salvar Configurações
        </Button>
      </CardContent>
    </Card>
  );
}
