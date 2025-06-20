
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Clock, CheckCircle, Settings, Send } from "lucide-react";
import { NotificationHistory } from "@/components/notificacoes/NotificationHistory";
import { TestMessageModal } from "@/components/notificacoes/TestMessageModal";

interface NotificationSettings {
  confirmacao: {
    ativo: boolean;
    template: string;
  };
  lembrete: {
    ativo: boolean;
    antecedencia: number;
    template: string;
  };
  cancelamento: {
    ativo: boolean;
    template: string;
  };
  reagendamento: {
    ativo: boolean;
    template: string;
  };
}

export default function Notificacoes() {
  const [settings, setSettings] = useState<NotificationSettings>({
    confirmacao: {
      ativo: true,
      template: "Olá {cliente}! Seu agendamento de {servico} com {profissional} foi confirmado para {data} às {hora}. Até lá! 😊"
    },
    lembrete: {
      ativo: true,
      antecedencia: 24,
      template: "Olá {cliente}! Lembrete: você tem um agendamento de {servico} amanhã ({data}) às {hora} com {profissional}. Nos vemos lá! 🌟"
    },
    cancelamento: {
      ativo: true,
      template: "Olá {cliente}! Seu agendamento de {servico} para {data} às {hora} foi cancelado. Entre em contato conosco para reagendar. 📞"
    },
    reagendamento: {
      ativo: true,
      template: "Olá {cliente}! Seu agendamento foi reagendado para {data} às {hora}. Serviço: {servico} com {profissional}. Confirme o recebimento! ✅"
    }
  });

  const [whatsappConfig, setWhatsappConfig] = useState({
    token: "",
    numeroInstancia: "",
    status: "Desconectado"
  });

  const handleSettingChange = (tipo: keyof NotificationSettings, campo: string, valor: any) => {
    setSettings(prev => ({
      ...prev,
      [tipo]: {
        ...prev[tipo],
        [campo]: valor
      }
    }));
  };

  const handleSaveSettings = () => {
    console.log("Salvando configurações:", settings);
    // Aqui integraria com a API para salvar as configurações
  };

  const estatisticas = {
    enviadas: 245,
    entregues: 238,
    falhas: 7,
    taxa: 97.1
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Notificações WhatsApp</h2>
          <p className="text-gray-600 mt-2">Configure mensagens automáticas para seus clientes</p>
        </div>
        <div className="flex gap-2">
          <TestMessageModal />
          <Button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-700">
            <Settings className="h-4 w-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </div>

      {/* Status da Conexão */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
            Status da Conexão WhatsApp
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${whatsappConfig.status === "Conectado" ? "bg-green-500" : "bg-red-500"}`}></div>
              <span className="text-sm font-medium">Status: {whatsappConfig.status}</span>
            </div>
            <div>
              <Label htmlFor="token">Token da API</Label>
              <Input
                id="token"
                type="password"
                value={whatsappConfig.token}
                onChange={(e) => setWhatsappConfig(prev => ({ ...prev, token: e.target.value }))}
                placeholder="Insira seu token"
              />
            </div>
            <div>
              <Label htmlFor="instancia">Número da Instância</Label>
              <Input
                id="instancia"
                value={whatsappConfig.numeroInstancia}
                onChange={(e) => setWhatsappConfig(prev => ({ ...prev, numeroInstancia: e.target.value }))}
                placeholder="Ex: +5511999999999"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Send className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Enviadas</p>
                <p className="text-2xl font-bold text-blue-600">{estatisticas.enviadas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Entregues</p>
                <p className="text-2xl font-bold text-green-600">{estatisticas.entregues}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Falhas</p>
                <p className="text-2xl font-bold text-red-600">{estatisticas.falhas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Taxa de Entrega</p>
                <p className="text-2xl font-bold text-purple-600">{estatisticas.taxa}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configurações de Mensagens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confirmação de Agendamento */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Confirmação de Agendamento</CardTitle>
              <Switch
                checked={settings.confirmacao.ativo}
                onCheckedChange={(checked) => handleSettingChange('confirmacao', 'ativo', checked)}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Template da Mensagem</Label>
              <Textarea
                value={settings.confirmacao.template}
                onChange={(e) => handleSettingChange('confirmacao', 'template', e.target.value)}
                rows={4}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Variáveis: {'{cliente}'}, {'{servico}'}, {'{profissional}'}, {'{data}'}, {'{hora}'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Lembrete */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Lembrete de Agendamento</CardTitle>
              <Switch
                checked={settings.lembrete.ativo}
                onCheckedChange={(checked) => handleSettingChange('lembrete', 'ativo', checked)}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Enviar com antecedência de:</Label>
              <Select
                value={settings.lembrete.antecedencia.toString()}
                onValueChange={(value) => handleSettingChange('lembrete', 'antecedencia', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hora</SelectItem>
                  <SelectItem value="2">2 horas</SelectItem>
                  <SelectItem value="4">4 horas</SelectItem>
                  <SelectItem value="24">24 horas (1 dia)</SelectItem>
                  <SelectItem value="48">48 horas (2 dias)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Template da Mensagem</Label>
              <Textarea
                value={settings.lembrete.template}
                onChange={(e) => handleSettingChange('lembrete', 'template', e.target.value)}
                rows={4}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Cancelamento */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Cancelamento</CardTitle>
              <Switch
                checked={settings.cancelamento.ativo}
                onCheckedChange={(checked) => handleSettingChange('cancelamento', 'ativo', checked)}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Template da Mensagem</Label>
              <Textarea
                value={settings.cancelamento.template}
                onChange={(e) => handleSettingChange('cancelamento', 'template', e.target.value)}
                rows={4}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Reagendamento */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Reagendamento</CardTitle>
              <Switch
                checked={settings.reagendamento.ativo}
                onCheckedChange={(checked) => handleSettingChange('reagendamento', 'ativo', checked)}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Template da Mensagem</Label>
              <Textarea
                value={settings.reagendamento.template}
                onChange={(e) => handleSettingChange('reagendamento', 'template', e.target.value)}
                rows={4}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Histórico de Mensagens */}
      <NotificationHistory />
    </div>
  );
}
