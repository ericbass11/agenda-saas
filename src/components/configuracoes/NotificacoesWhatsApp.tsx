
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function NotificacoesWhatsApp() {
  const [configuracoes, setConfiguracoes] = useState({
    ativarNotificacoes: false,
    confirmarAgendamento: true,
    lembrete: true,
    tempoLembrete: '24',
    cancelamento: true,
    reagendamento: true,
    numeroWhatsApp: ''
  });
  
  const { toast } = useToast();

  const handleToggle = (campo: string) => {
    setConfiguracoes(prev => ({
      ...prev,
      [campo]: !prev[campo]
    }));
  };

  const handleChange = (campo: string, valor: string) => {
    setConfiguracoes(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleSalvar = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações de notificações WhatsApp foram atualizadas."
    });
  };

  const handleTestar = () => {
    toast({
      title: "Teste enviado",
      description: "Uma mensagem de teste foi enviada para o WhatsApp configurado."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notificações WhatsApp</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 border rounded">
          <Label htmlFor="ativar-notificacoes" className="font-medium">
            Ativar Notificações WhatsApp
          </Label>
          <Switch
            id="ativar-notificacoes"
            checked={configuracoes.ativarNotificacoes}
            onCheckedChange={() => handleToggle('ativarNotificacoes')}
          />
        </div>

        {configuracoes.ativarNotificacoes && (
          <>
            <div>
              <Label htmlFor="numero-whatsapp">Número do WhatsApp Business</Label>
              <Input
                id="numero-whatsapp"
                value={configuracoes.numeroWhatsApp}
                onChange={(e) => handleChange('numeroWhatsApp', e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Tipos de Notificação</Label>
              
              <div className="flex items-center justify-between p-2 border-l-4 border-blue-500 bg-blue-50">
                <span className="text-sm">Confirmação de Agendamento</span>
                <Switch
                  checked={configuracoes.confirmarAgendamento}
                  onCheckedChange={() => handleToggle('confirmarAgendamento')}
                />
              </div>

              <div className="flex items-center justify-between p-2 border-l-4 border-green-500 bg-green-50">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Lembrete antes do agendamento</span>
                  <Select value={configuracoes.tempoLembrete} onValueChange={(value) => handleChange('tempoLembrete', value)}>
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1h</SelectItem>
                      <SelectItem value="2">2h</SelectItem>
                      <SelectItem value="6">6h</SelectItem>
                      <SelectItem value="24">24h</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Switch
                  checked={configuracoes.lembrete}
                  onCheckedChange={() => handleToggle('lembrete')}
                />
              </div>

              <div className="flex items-center justify-between p-2 border-l-4 border-red-500 bg-red-50">
                <span className="text-sm">Cancelamento de Agendamento</span>
                <Switch
                  checked={configuracoes.cancelamento}
                  onCheckedChange={() => handleToggle('cancelamento')}
                />
              </div>

              <div className="flex items-center justify-between p-2 border-l-4 border-yellow-500 bg-yellow-50">
                <span className="text-sm">Reagendamento</span>
                <Switch
                  checked={configuracoes.reagendamento}
                  onCheckedChange={() => handleToggle('reagendamento')}
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSalvar} className="flex-1">
                Salvar Configurações
              </Button>
              <Button onClick={handleTestar} variant="outline">
                Testar WhatsApp
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
